/**
 * Lichtschein mit Wandbrechung und Rollo-Stellung.
 *
 * `glowPaint`, `glowReach` (Sichtbarkeits-Polygon per Winkel-Sweep inkl. Zuschnitt der
 * Wände auf die Lichtbox) und das Ausschneiden offener Türen aus den Wänden sind aus
 * easy-floorplan (src/render.ts, MIT, Copyright (c) 2026 Nicolas Sandller) portiert und
 * vereinfacht.
 */
import { svg, nothing, type SVGTemplateResult } from "lit";
import { domainOf, isActive, type HassEntity, type HomeAssistant } from "./ha";
import { DEFAULT_GLOW_COLOR, DEFAULT_GLOW_RADIUS, type Floor, type FloorItem, type Opening, type Plan, type Point, type Wall } from "./types";

/** Deckkraft in der Mitte des Scheins bei minimaler bzw. voller Helligkeit. */
export const GLOW_MIN_OPACITY = 0.18;
export const GLOW_MAX_OPACITY = 0.6;
/** Ein gedimmtes Licht reicht mindestens so weit (Anteil von `glowRadius`). */
export const GLOW_MIN_RADIUS = 0.5;

export interface GlowPaint {
  color: string;
  /** Deckkraft in der Mitte, zum Rand hin 0. */
  opacity: number;
  /** Reichweite in Planeinheiten, mit der Helligkeit skaliert. */
  radius: number;
}

/** Scheint dieses Icon? Ohne Einstellung: ja bei Lichtern. */
export function glowEnabled(item: Pick<FloorItem, "glow" | "entity">): boolean {
  if (typeof item.glow === "boolean") return item.glow;
  return !!item.entity && domainOf(item.entity) === "light";
}

/**
 * Farbe, Stärke und Reichweite des Scheins – oder `undefined`, wenn das Licht aus,
 * nicht erreichbar oder unbekannt ist. Farbe aus `rgb_color`, sonst `glowColor`;
 * die Helligkeit steuert Deckkraft und Reichweite (Dimmen zieht das Licht zusammen).
 */
export function glowPaint(item: Pick<FloorItem, "glowColor" | "glowRadius">, light: HassEntity | undefined): GlowPaint | undefined {
  if (!light || light.state !== "on") return undefined;
  const attrs = light.attributes ?? {};
  const raw = attrs.brightness;
  const bright = typeof raw === "number" && Number.isFinite(raw) ? Math.max(0, Math.min(255, raw)) / 255 : undefined;
  const opacity = bright === undefined ? GLOW_MAX_OPACITY : GLOW_MIN_OPACITY + (GLOW_MAX_OPACITY - GLOW_MIN_OPACITY) * bright;
  const base = typeof item.glowRadius === "number" && item.glowRadius > 0 ? item.glowRadius : DEFAULT_GLOW_RADIUS;
  const radius = base * (bright === undefined ? 1 : GLOW_MIN_RADIUS + (1 - GLOW_MIN_RADIUS) * bright);
  const rgb = attrs.rgb_color;
  if (Array.isArray(rgb) && rgb.length >= 3 && rgb.slice(0, 3).every((c) => typeof c === "number" && Number.isFinite(c))) {
    const ch = (c: number) => Math.max(0, Math.min(255, Math.round(c)));
    return { color: `rgb(${ch(rgb[0])}, ${ch(rgb[1])}, ${ch(rgb[2])})`, opacity, radius };
  }
  return { color: item.glowColor || DEFAULT_GLOW_COLOR, opacity, radius };
}

/** Senkrechter Abstand eines Punkts zu einer Wand. */
export function pointWallDist(x: number, y: number, w: Wall): number {
  const dx = w.x2 - w.x1;
  const dy = w.y2 - w.y1;
  const len2 = dx * dx + dy * dy;
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((x - w.x1) * dx + (y - w.y1) * dy) / len2));
  return Math.hypot(x - (w.x1 + t * dx), y - (w.y1 + t * dy));
}

/** Abstand entlang eines Strahls bis zu einer Strecke, oder `undefined`. */
function rayWallHit(cx: number, cy: number, dx: number, dy: number, w: Wall): number | undefined {
  const sx = w.x2 - w.x1;
  const sy = w.y2 - w.y1;
  const denom = dx * sy - dy * sx;
  if (Math.abs(denom) < 1e-12) return undefined;
  const qx = w.x1 - cx;
  const qy = w.y1 - cy;
  const t = (qx * sy - qy * sx) / denom;
  const u = (qx * dy - qy * dx) / denom;
  if (t <= 1e-9 || u < 0 || u > 1) return undefined;
  return t;
}

/** Strecke auf ein achsenparalleles Rechteck zuschneiden (Liang–Barsky). */
function clipWallToBox(w: Wall, minX: number, minY: number, maxX: number, maxY: number): Wall | undefined {
  const dx = w.x2 - w.x1;
  const dy = w.y2 - w.y1;
  const p = [-dx, dx, -dy, dy];
  const q = [w.x1 - minX, maxX - w.x1, w.y1 - minY, maxY - w.y1];
  let t0 = 0;
  let t1 = 1;
  for (let i = 0; i < 4; i++) {
    if (p[i] === 0) {
      if (q[i] < 0) return undefined;
      continue;
    }
    const t = q[i] / p[i];
    if (p[i] < 0) {
      if (t > t1) return undefined;
      if (t > t0) t0 = t;
    } else {
      if (t < t0) return undefined;
      if (t < t1) t1 = t;
    }
  }
  return { ...w, x1: w.x1 + t0 * dx, y1: w.y1 + t0 * dy, x2: w.x1 + t1 * dx, y2: w.y1 + t1 * dy };
}

/**
 * Wie weit ein Licht bei (cx, cy) tatsächlich reicht: das Sichtbarkeits-Polygon der
 * Wände im Radius. Strahlen zu jedem Wandendpunkt (und knapp daneben, damit Licht um
 * Ecken streift) enden an der nächsten Wand. Wände werden vorher auf die Box um den
 * Radius zugeschnitten, damit lange Wände an der richtigen Stelle abgetastet werden.
 *
 * Wände, die näher als ihre halbe Stärke liegen, blockieren nicht – eine Wandlampe soll
 * sich nicht selbst abschatten. `undefined`, wenn keine Wand in Reichweite ist.
 */
export function glowReach(cx: number, cy: number, r: number, walls: readonly Wall[], thickness: (w: Wall) => number = () => 12): Point[] | undefined {
  const blocking = walls.filter((w) => {
    const d = pointWallDist(cx, cy, w);
    return d < r && d > thickness(w) / 2 + 1;
  });
  if (!blocking.length) return undefined;
  const m = r * 1.01;
  const bounds: Wall[] = [
    { id: "b1", x1: cx - m, y1: cy - m, x2: cx + m, y2: cy - m },
    { id: "b2", x1: cx + m, y1: cy - m, x2: cx + m, y2: cy + m },
    { id: "b3", x1: cx + m, y1: cy + m, x2: cx - m, y2: cy + m },
    { id: "b4", x1: cx - m, y1: cy + m, x2: cx - m, y2: cy - m },
  ];
  const clipped = blocking.map((w) => clipWallToBox(w, cx - m, cy - m, cx + m, cy + m)).filter((w): w is Wall => !!w);
  if (!clipped.length) return undefined;
  const all = [...clipped, ...bounds];
  const pts: { x: number; y: number; a: number }[] = [];
  for (const s of all) {
    for (const [ex, ey] of [
      [s.x1, s.y1],
      [s.x2, s.y2],
    ]) {
      const base = Math.atan2(ey - cy, ex - cx);
      for (const a of [base - 1e-4, base, base + 1e-4]) {
        const dx = Math.cos(a);
        const dy = Math.sin(a);
        let best = Infinity;
        for (const seg of all) {
          const t = rayWallHit(cx, cy, dx, dy, seg);
          if (t !== undefined && t < best) best = t;
        }
        if (best < Infinity) pts.push({ x: cx + dx * best, y: cy + dy * best, a });
      }
    }
  }
  pts.sort((p, q) => p.a - q.a);
  const round = (v: number) => Math.round(v * 100) / 100;
  return pts.map(({ x, y }) => ({ x: round(x), y: round(y) }));
}

/** Lässt eine Öffnung Licht durch? Türen ohne Kontakt gelten als offen, Fenster nie. */
export function openingPassesLight(o: Opening, hass?: HomeAssistant): boolean {
  if (o.type !== "door") return false;
  if (!o.entity) return true;
  return isActive(hass?.states[o.entity]);
}

/**
 * Wände mit ausgeschnittenen Lücken für Öffnungen, durch die Licht fällt. Eine Öffnung
 * gehört zu einer Wand, wenn ihr Mittelpunkt auf ihr liegt (innerhalb der Wandstärke).
 */
export function wallsLightPassesThrough(
  walls: readonly Wall[],
  openings: readonly Opening[],
  passes: (o: Opening) => boolean,
  thickness: (w: Wall) => number = () => 12
): Wall[] {
  const open = openings.filter(passes);
  if (!open.length) return walls as Wall[];
  const out: Wall[] = [];
  for (const w of walls) {
    const dx = w.x2 - w.x1;
    const dy = w.y2 - w.y1;
    const len2 = dx * dx + dy * dy;
    if (len2 === 0) {
      out.push(w);
      continue;
    }
    const len = Math.sqrt(len2);
    const gaps: [number, number][] = [];
    for (const o of open) {
      if (pointWallDist(o.x, o.y, w) > thickness(w) / 2 + 1) continue;
      const tc = ((o.x - w.x1) * dx + (o.y - w.y1) * dy) / len2;
      const half = o.length / 2 / len;
      const a = Math.max(0, tc - half);
      const b = Math.min(1, tc + half);
      if (b > a) gaps.push([a, b]);
    }
    if (!gaps.length) {
      out.push(w);
      continue;
    }
    gaps.sort((p, q) => p[0] - q[0]);
    let cursor = 0;
    const emit = (t0: number, t1: number) => {
      if (t1 - t0 > 1e-6) out.push({ ...w, x1: w.x1 + dx * t0, y1: w.y1 + dy * t0, x2: w.x1 + dx * t1, y2: w.y1 + dy * t1 });
    };
    for (const [a, b] of gaps) {
      emit(cursor, a);
      cursor = Math.max(cursor, b);
    }
    emit(cursor, 1);
  }
  return out;
}

/**
 * Geschlossener Anteil eines Rollos, 0 (offen) bis 1 (zu), oder `undefined` ohne
 * verwertbaren Zustand. `current_position` (100 = offen) hat Vorrang vor dem Zustand.
 */
export function shutterClosedFraction(state: HassEntity | undefined): number | undefined {
  if (!state || state.state === "unavailable" || state.state === "unknown") return undefined;
  const pos = state.attributes?.current_position;
  if (typeof pos === "number" && Number.isFinite(pos)) return 1 - Math.max(0, Math.min(100, pos)) / 100;
  if (state.state === "closed") return 1;
  if (state.state === "open") return 0;
  if (state.state === "opening" || state.state === "closing") return 0.5;
  return undefined;
}

/** Lichtschein aller leuchtenden Icons einer Etage, an Wänden gebrochen. */
export function renderGlows(floor: Floor, plan: Plan, hass: HomeAssistant, idPrefix: string): SVGTemplateResult | typeof nothing {
  const lit = floor.items
    .filter((it) => it.entity && glowEnabled(it))
    .map((it) => ({ it, paint: glowPaint(it, hass.states[it.entity!]) }))
    .filter((x): x is { it: FloorItem; paint: GlowPaint } => !!x.paint);
  if (!lit.length) return nothing;
  const thickness = (w: Wall) => w.thickness ?? plan.settings.wallThickness;
  const walls = wallsLightPassesThrough(floor.walls, floor.openings, (o) => openingPassesLight(o, hass), thickness);
  return svg`<g class="fp-glows">
    ${lit.map(({ it, paint }, i) => {
      const id = `${idPrefix}-${i}`;
      const reach = glowReach(it.x, it.y, paint.radius, walls, thickness);
      return svg`
        ${reach ? svg`<clipPath id="${id}-clip"><polygon points=${reach.map((p) => `${p.x},${p.y}`).join(" ")}></polygon></clipPath>` : nothing}
        <radialGradient id=${id} gradientUnits="userSpaceOnUse" cx=${it.x} cy=${it.y} r=${paint.radius}>
          <stop offset="0" stop-color=${paint.color} stop-opacity=${paint.opacity}></stop>
          <stop offset="1" stop-color=${paint.color} stop-opacity="0"></stop>
        </radialGradient>
        <circle class="fp-glow" cx=${it.x} cy=${it.y} r=${paint.radius} fill="url(#${id})"
                clip-path=${reach ? `url(#${id}-clip)` : nothing}></circle>`;
    })}
  </g>`;
}
