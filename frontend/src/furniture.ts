/**
 * Möbel-Vorlagen: Geometrie, SVG-Darstellung und SVG-Import.
 *
 * Eine Vorlage besteht aus Teilen (Rechteck, Kreis, Polygon, SVG-Pfad) um den Mittelpunkt (0/0).
 * Ein platziertes Exemplar ist ein `FloorItem` mit `furnitureType`, `rotation` und `scale`.
 */
import { svg, nothing, type SVGTemplateResult } from "lit";
import { domainOf } from "./ha";
import { DEFAULT_FURNITURE_FILL, MAX_FURNITURE_PARTS, newId, type FloorItem, type FurniturePart, type FurnitureType, type Point } from "./types";

/** Zeichen, die in Pfaddaten vorkommen dürfen. */
const PATH_RE = /^[MmLlHhVvCcSsQqTtAaZz0-9eE.,\s+-]+$/;
const COLOR_RE = /^(#[0-9a-fA-F]{3,8}|[a-zA-Z]{3,20}|rgba?\([0-9.,\s%]+\)|var\(--[a-zA-Z0-9-]+\))$/;
export const MAX_PATH_LENGTH = 20000;

export function isSafePath(d: unknown): d is string {
  return typeof d === "string" && d.length > 0 && d.length <= MAX_PATH_LENGTH && PATH_RE.test(d);
}

export function isSafeColor(c: unknown): c is string {
  return typeof c === "string" && COLOR_RE.test(c.trim());
}

export function findFurniture(types: readonly FurnitureType[] | undefined, id: string | undefined): FurnitureType | undefined {
  return id ? types?.find((t) => t.id === id) : undefined;
}

/** Lokaler Punkt (Möbel-Koordinaten) in Plankoordinaten. */
export function placePoint(item: Pick<FloorItem, "x" | "y" | "rotation" | "scale">, p: Point): Point {
  const rad = ((item.rotation ?? 0) * Math.PI) / 180;
  const s = item.scale ?? 1;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return { x: item.x + s * (p.x * cos - p.y * sin), y: item.y + s * (p.x * sin + p.y * cos) };
}

/** Plankoordinaten zurück in Möbel-Koordinaten. */
export function unplacePoint(item: Pick<FloorItem, "x" | "y" | "rotation" | "scale">, p: Point): Point {
  const rad = (-(item.rotation ?? 0) * Math.PI) / 180;
  const s = item.scale || 1;
  const dx = (p.x - item.x) / s;
  const dy = (p.y - item.y) / s;
  return { x: dx * Math.cos(rad) - dy * Math.sin(rad), y: dx * Math.sin(rad) + dy * Math.cos(rad) };
}

/** Umgebende Box eines Teils in Möbel-Koordinaten. */
export function partBox(p: FurniturePart): { x0: number; y0: number; x1: number; y1: number } {
  if (p.shape === "circle") {
    const r = p.r ?? 0;
    return { x0: p.x - r, y0: p.y - r, x1: p.x + r, y1: p.y + r };
  }
  if (p.shape === "polygon") {
    const pts = p.points ?? [];
    if (!pts.length) return { x0: p.x, y0: p.y, x1: p.x, y1: p.y };
    return {
      x0: p.x + Math.min(...pts.map((q) => q.x)),
      y0: p.y + Math.min(...pts.map((q) => q.y)),
      x1: p.x + Math.max(...pts.map((q) => q.x)),
      y1: p.y + Math.max(...pts.map((q) => q.y)),
    };
  }
  const w = p.w ?? 0;
  const h = p.h ?? 0;
  return { x0: p.x - w / 2, y0: p.y - h / 2, x1: p.x + w / 2, y1: p.y + h / 2 };
}

/** Umgebende Box der ganzen Vorlage; leere Vorlage = kleine Box um den Mittelpunkt. */
export function furnitureBox(t: FurnitureType): { x0: number; y0: number; x1: number; y1: number } {
  const boxes = t.parts.map(partBox);
  for (const l of t.lights ?? []) boxes.push({ x0: l.x, y0: l.y, x1: l.x, y1: l.y });
  if (!boxes.length) return { x0: -15, y0: -15, x1: 15, y1: 15 };
  return {
    x0: Math.min(...boxes.map((b) => b.x0)),
    y0: Math.min(...boxes.map((b) => b.y0)),
    x1: Math.max(...boxes.map((b) => b.x1)),
    y1: Math.max(...boxes.map((b) => b.y1)),
  };
}

/** Ecken der umgebenden Box eines platzierten Exemplars in Plankoordinaten. */
export function furnitureCorners(item: FloorItem, t: FurnitureType): Point[] {
  const b = furnitureBox(t);
  return [
    { x: b.x0, y: b.y0 },
    { x: b.x1, y: b.y0 },
    { x: b.x1, y: b.y1 },
    { x: b.x0, y: b.y1 },
  ].map((p) => placePoint(item, p));
}

/** Plan-Positionen, an denen ein Exemplar leuchtet: Leuchtpunkte der Vorlage oder der Mittelpunkt. */
export function glowPoints(item: FloorItem, types: readonly FurnitureType[] | undefined): Point[] {
  const t = findFurniture(types, item.furnitureType);
  if (t?.lights?.length) return t.lights.map((l) => placePoint(item, l));
  return [{ x: item.x, y: item.y }];
}

/**
 * Scheint dieses Exemplar? Ausdrücklich gesetzt gilt immer; sonst nur bei Lichtern, und bei
 * Möbeln nur, wenn die Vorlage Leuchtpunkte hat.
 */
export function itemGlows(item: FloorItem, types: readonly FurnitureType[] | undefined): boolean {
  if (typeof item.glow === "boolean") return item.glow;
  if (!item.entity || domainOf(item.entity) !== "light") return false;
  const t = findFurniture(types, item.furnitureType);
  return !item.furnitureType || !t || !!t.lights?.length;
}

/** Hat das Exemplar etwas, das als Icon-Plakette darübergelegt wird? */
export function hasBadge(item: FloorItem, types: readonly FurnitureType[] | undefined): boolean {
  if (!item.furnitureType || !findFurniture(types, item.furnitureType)) return true;
  return !!(item.entity || item.icon || item.label);
}

function partTransform(p: FurniturePart): string | undefined {
  if (p.shape === "path" && p.d && p.vb) {
    const [vx, vy, vw, vh] = p.vb;
    const w = p.w ?? vw;
    const h = p.h ?? vh;
    return `translate(${p.x - w / 2} ${p.y - h / 2}) scale(${vw ? w / vw : 1} ${vh ? h / vh : 1}) translate(${-vx} ${-vy})`;
  }
  return undefined;
}

/** Ein Teil als SVG; `fill` überschreibt die Füllung der Vorlage. */
export function renderPart(p: FurniturePart, opts: { fill?: string; cls?: string; iconSize?: number } = {}): SVGTemplateResult {
  const unfilled = p.fill === "none";
  const fill = unfilled ? "none" : opts.fill ?? (isSafeColor(p.fill) ? p.fill : DEFAULT_FURNITURE_FILL);
  const own = isSafeColor(p.stroke) && p.stroke !== "none";
  const sx = p.shape === "path" && p.vb && p.vb[2] ? (p.w ?? p.vb[2]) / p.vb[2] : 1;
  const sw = (p.strokeWidth ?? 1) / (sx || 1);
  const strokeStyle = own ? `stroke:${p.stroke};stroke-width:${sw};stroke-opacity:1;vector-effect:none` : nothing;
  const op = p.opacity ?? 1;
  const cls = `fpart ${opts.cls ?? ""}`;
  let shape: SVGTemplateResult | typeof nothing = nothing;
  if (p.shape === "rect") {
    const w = p.w ?? 0;
    const h = p.h ?? 0;
    shape = svg`<rect class=${cls} x=${p.x - w / 2} y=${p.y - h / 2} width=${w} height=${h} fill=${fill} fill-opacity=${op} style=${strokeStyle}></rect>`;
  } else if (p.shape === "circle") {
    shape = svg`<circle class=${cls} cx=${p.x} cy=${p.y} r=${p.r ?? 0} fill=${fill} fill-opacity=${op} style=${strokeStyle}></circle>`;
  } else if (p.shape === "polygon") {
    const pts = (p.points ?? []).map((q) => `${p.x + q.x},${p.y + q.y}`).join(" ");
    shape = svg`<polygon class=${cls} points=${pts} fill=${fill} fill-opacity=${op} style=${strokeStyle}></polygon>`;
  } else if (p.shape === "path" && isSafePath(p.d)) {
    shape = svg`<path class=${cls} d=${p.d} transform=${partTransform(p) ?? nothing} fill=${fill} fill-opacity=${op}
      style=${strokeStyle}></path>`;
  }
  const box = partBox(p);
  const size = opts.iconSize ?? Math.max(8, Math.min(box.x1 - box.x0, box.y1 - box.y0) * 0.7);
  const cx = (box.x0 + box.x1) / 2;
  const cy = (box.y0 + box.y1) / 2;
  return svg`${shape}${
    p.icon
      ? svg`<foreignObject class="fpart-icon" x=${cx - size / 2} y=${cy - size / 2} width=${size} height=${size} pointer-events="none">
          <div class="fo-icon" style="--mdc-icon-size:${size}px;width:${size}px;height:${size}px"><ha-icon .icon=${p.icon}></ha-icon></div>
        </foreignObject>`
      : nothing
  }`;
}

/** Ein platziertes Möbelstück. */
export function renderFurnitureItem(
  item: FloorItem,
  t: FurnitureType,
  opts: { fill?: string; selected?: boolean; hit?: boolean } = {}
): SVGTemplateResult {
  const rot = item.rotation ?? 0;
  const s = item.scale ?? 1;
  return svg`<g class="furniture ${opts.selected ? "selected" : ""}" data-furniture=${item.id}
      transform="translate(${item.x} ${item.y}) rotate(${rot}) scale(${s})">
    ${t.parts.map((p) => renderPart(p, { fill: opts.fill, cls: opts.hit ? "hit" : "" }))}
  </g>`;
}

/** Füllfarbe eines Exemplars: Überschreibung, bei aktiver Entität deren Farbe. */
export function itemFill(item: FloorItem, active: boolean): string | undefined {
  if (active && isSafeColor(item.activeColor)) return item.activeColor;
  return isSafeColor(item.fillColor) ? item.fillColor : undefined;
}

export const furnitureStyles = `
  .furniture { pointer-events: none; }
  .furniture .fpart { stroke: var(--fp-wall-color, var(--primary-text-color)); stroke-width: 1; stroke-opacity: .55; vector-effect: non-scaling-stroke; }
  .furniture.selected .fpart { stroke: var(--primary-color) !important; stroke-width: 2 !important; stroke-opacity: 1 !important; vector-effect: non-scaling-stroke !important; }
  .furniture .fpart-icon { color: var(--primary-text-color); opacity: .75; }
  .furniture .fo-icon { display: flex; align-items: center; justify-content: center; }
`;

/* ------------------------------------------------------------------ SVG-Import */

export interface ImportResult {
  parts: FurniturePart[];
  skipped: number;
}

const num = (el: Element, name: string, def = 0): number => {
  const v = parseFloat(el.getAttribute(name) ?? "");
  return Number.isFinite(v) ? v : def;
};

/** Liest ein Präsentationsattribut/-style samt Vererbung bis zur Wurzel. */
function inherited(el: Element, name: string): string | undefined {
  for (let n: Element | null = el; n; n = n.parentElement) {
    const v = n.getAttribute(name)?.trim() || new RegExp(`(?:^|;)\\s*${name}\\s*:\\s*([^;]+)`).exec(n.getAttribute("style") ?? "")?.[1]?.trim();
    if (v && v !== "inherit") return v;
  }
  return undefined;
}

function colorOf(el: Element, name: "fill" | "stroke"): string | undefined {
  let v = inherited(el, name);
  if (v?.toLowerCase() === "currentcolor") v = inherited(el, "color");
  if (!v) return undefined;
  if (v === "none") return "none";
  return isSafeColor(v) && !v.toLowerCase().startsWith("url") ? v : undefined;
}

function styleOf(el: Element, k: number): Partial<FurniturePart> {
  const out: Partial<FurniturePart> = {};
  const fill = colorOf(el, "fill");
  const stroke = colorOf(el, "stroke");
  if (fill) out.fill = fill;
  if (stroke && stroke !== "none") {
    out.stroke = stroke;
    const w = parseFloat(inherited(el, "stroke-width") ?? "");
    out.strokeWidth = Math.max(0.2, Math.round((Number.isFinite(w) && w > 0 ? w : 1) * k * 100) / 100);
    if (!fill) out.fill = out.fill ?? "none";
  } else if (fill === "none") {
    out.stroke = "#444";
    out.strokeWidth = 1;
  }
  return out;
}

/**
 * Liest eine einfache 2D-SVG (path, rect, circle, ellipse, polygon) in Vorlagen-Teile.
 * Die Längste Seite wird auf `fit` Einheiten skaliert und um den Mittelpunkt zentriert.
 * Transformationen, Gruppen-Stile, Skripte und Fremdinhalte werden ignoriert.
 */
export function importSvg(text: string, fit = 100): ImportResult {
  const doc = new DOMParser().parseFromString(text, "image/svg+xml");
  const root = doc.documentElement;
  if (!root || root.nodeName.toLowerCase() !== "svg" || doc.querySelector("parsererror")) throw new Error("Keine gültige SVG-Datei");
  const vbAttr = (root.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number);
  const hasVb = vbAttr.length === 4 && vbAttr.every(Number.isFinite) && vbAttr[2] > 0 && vbAttr[3] > 0;
  const vb: [number, number, number, number] = hasVb
    ? (vbAttr as [number, number, number, number])
    : [0, 0, num(root, "width", 100) || 100, num(root, "height", 100) || 100];
  const k = fit / Math.max(vb[2], vb[3]);
  const cx = vb[0] + vb[2] / 2;
  const cy = vb[1] + vb[3] / 2;
  const parts: FurniturePart[] = [];
  let skipped = 0;
  const add = (p: Omit<FurniturePart, "id">) => {
    if (parts.length >= MAX_FURNITURE_PARTS) {
      skipped++;
      return;
    }
    parts.push({ id: newId("p"), ...p });
  };
  const round = (v: number) => Math.round(v * 100) / 100;
  for (const el of Array.from(root.querySelectorAll("*"))) {
    const tag = el.localName.toLowerCase();
    const common = styleOf(el, k);
    if (tag === "rect") {
      const w = num(el, "width");
      const h = num(el, "height");
      if (w > 0 && h > 0)
        add({ shape: "rect", x: round((num(el, "x") + w / 2 - cx) * k), y: round((num(el, "y") + h / 2 - cy) * k), w: round(w * k), h: round(h * k), ...common });
    } else if (tag === "circle") {
      const r = num(el, "r");
      if (r > 0) add({ shape: "circle", x: round((num(el, "cx") - cx) * k), y: round((num(el, "cy") - cy) * k), r: round(r * k), ...common });
    } else if (tag === "ellipse") {
      const rx = num(el, "rx");
      const ry = num(el, "ry");
      if (rx > 0 && ry > 0) {
        const x = num(el, "cx");
        const y = num(el, "cy");
        add({
          shape: "path",
          d: `M ${x - rx} ${y} a ${rx} ${ry} 0 1 0 ${2 * rx} 0 a ${rx} ${ry} 0 1 0 ${-2 * rx} 0 Z`,
          vb: [x - rx, y - ry, 2 * rx, 2 * ry],
          x: round((x - cx) * k),
          y: round((y - cy) * k),
          w: round(2 * rx * k),
          h: round(2 * ry * k),
          ...common,
        });
      }
    } else if (tag === "polygon") {
      const nums = (el.getAttribute("points") ?? "").split(/[\s,]+/).map(Number).filter(Number.isFinite);
      const pts: Point[] = [];
      for (let i = 0; i + 1 < nums.length; i += 2) pts.push({ x: round((nums[i] - cx) * k), y: round((nums[i + 1] - cy) * k) });
      if (pts.length >= 3) add({ shape: "polygon", x: 0, y: 0, points: pts, ...common });
    } else if (tag === "path") {
      const d = (el.getAttribute("d") ?? "").trim();
      if (!isSafePath(d)) {
        skipped++;
        continue;
      }
      add({ shape: "path", d, vb, x: 0, y: 0, w: round(vb[2] * k), h: round(vb[3] * k), ...common });
    } else if (tag === "line" || tag === "polyline") {
      const nums =
        tag === "line"
          ? [num(el, "x1"), num(el, "y1"), num(el, "x2"), num(el, "y2")]
          : (el.getAttribute("points") ?? "").split(/[\s,]+/).map(Number).filter(Number.isFinite);
      if (nums.length >= 4) {
        let d = `M ${nums[0]} ${nums[1]}`;
        for (let i = 2; i + 1 < nums.length; i += 2) d += ` L ${nums[i]} ${nums[i + 1]}`;
        const st = { ...common, fill: "none" };
        if (!st.stroke) Object.assign(st, { stroke: "#444", strokeWidth: 1 });
        add({ shape: "path", d, vb, x: 0, y: 0, w: round(vb[2] * k), h: round(vb[3] * k), ...st });
      } else skipped++;
    } else if (["image", "use", "text"].includes(tag)) {
      skipped++;
    }
  }
  if (!parts.length) throw new Error("Die SVG enthält keine unterstützten Formen (path, rect, circle, ellipse, polygon)");
  return { parts, skipped };
}
