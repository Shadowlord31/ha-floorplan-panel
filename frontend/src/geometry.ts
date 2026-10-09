/**
 * Geometrie-Helfer: Zoom auf einen Raum, Punkt-in-Polygon, Fang auf Wände und Raster.
 *
 * `areaZoomTransform`, `resolveAreaZoom`, `polygonCentroid` und `pointInPolygon` sind
 * aus easy-floorplan (src/render.ts, MIT, Copyright (c) 2026 Nicolas Sandller) portiert –
 * ohne die dortige Plan-Drehung, die dieses Projekt nicht braucht.
 */
import type { Area, Floor, FloorItem, Plan, Point, Wall } from "./types";

/** Höchster Einpass-Zoom, wenn ein Raum keinen eigenen Wert hat. */
export const MAX_AREA_ZOOM_FIT = 4;
/** Obergrenze für einen pro Raum gesetzten Zoom. */
export const MAX_AREA_ZOOM = 10;

export interface ZoomTransform {
  /** Gleichmäßige Skalierung des ganzen Plans. */
  scale: number;
  /** Verschiebung in Prozent der eigenen Box (auflösungsunabhängig, `transform-origin: 0 0`). */
  txPercent: number;
  tyPercent: number;
}

export const IDENTITY_ZOOM: ZoomTransform = { scale: 1, txPercent: 0, tyPercent: 0 };

/**
 * CSS-`translate(%) scale()`, das die Bounding-Box eines Raums in die `w`×`h`-Leinwand
 * einpasst. Die Verschiebung wird so begrenzt, dass der Planrand nie ins Bild rückt;
 * bei `scale === 1` gibt es daher auch keine Verschiebung.
 */
export function areaZoomTransform(
  points: readonly Point[],
  w: number,
  h: number,
  padFrac = 0.15,
  maxScale = MAX_AREA_ZOOM_FIT,
  explicitScale?: number
): ZoomTransform {
  if (!points.length) return IDENTITY_ZOOM;
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const pad = Math.max(maxX - minX, maxY - minY) * padFrac;
  const bw = Math.max(maxX - minX + pad * 2, 1);
  const bh = Math.max(maxY - minY + pad * 2, 1);
  const fitted = Math.max(1, Math.min(maxScale, Math.min(w / bw, h / bh)));
  const scale = explicitScale ?? fitted;
  if (!Number.isFinite(scale)) return IDENTITY_ZOOM;
  const cxFrac = (minX + maxX) / 2 / w;
  const cyFrac = (minY + maxY) / 2 / h;
  const clamp = (t: number) => Math.min(0, Math.max(100 * (1 - scale), t));
  return {
    scale,
    txPercent: clamp(50 - scale * cxFrac * 100),
    tyPercent: clamp(50 - scale * cyFrac * 100),
  };
}

/** Der pro Raum gesetzte Zoom, begrenzt auf 1..MAX_AREA_ZOOM, oder `undefined` für „einpassen“. */
export function resolveAreaZoom(a: Pick<Area, "zoom">): number | undefined {
  const raw = a.zoom;
  if (typeof raw !== "number" || !Number.isFinite(raw)) return undefined;
  return Math.max(1, Math.min(MAX_AREA_ZOOM, raw));
}

/** Arithmetisches Mittel der Eckpunkte – reicht für die Platzierung von Beschriftungen. */
export function polygonCentroid(points: readonly Point[]): Point {
  if (!points.length) return { x: 0, y: 0 };
  const sum = points.reduce((s, p) => ({ x: s.x + p.x, y: s.y + p.y }), { x: 0, y: 0 });
  return { x: sum.x / points.length, y: sum.y / points.length };
}

/** Ray-Casting-Test: liegt (x, y) im Polygon? */
export function pointInPolygon(points: readonly Point[], x: number, y: number): boolean {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const a = points[i];
    const b = points[j];
    if (a.y > y !== b.y > y && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

/** Fläche eines Polygons (Shoelace), immer positiv. */
export function polygonArea(points: readonly Point[]): number {
  let sum = 0;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    sum += (points[j].x + points[i].x) * (points[j].y - points[i].y);
  }
  return Math.abs(sum / 2);
}

/** Raum eines Icons: explizit über `area`, sonst der (kleinste) Raum, in dessen Polygon es liegt. */
export function itemRoom(item: Pick<FloorItem, "area" | "x" | "y">, areas: readonly Area[]): Area | undefined {
  if (item.area) return areas.find((a) => a.id === item.area || a.name === item.area);
  const hits = areas.filter((a) => pointInPolygon(a.points, item.x, item.y));
  return hits.sort((a, b) => polygonArea(a.points) - polygonArea(b.points))[0];
}

/** Icon mit `showOnlyWhenZoomed` ist nur sichtbar, solange sein Raum gezoomt ist. */
export function itemHiddenUntilZoomed(item: FloorItem, zoomedArea: Area | undefined, areas: readonly Area[]): boolean {
  if (!item.showOnlyWhenZoomed) return false;
  if (!zoomedArea) return true;
  return itemRoom(item, areas)?.id !== zoomedArea.id;
}

export function snapToGrid(v: number, grid: number): number {
  return grid > 0 ? Math.round(v / grid) * grid : v;
}

export function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export interface WallHit {
  wall: Wall;
  /** Lotfußpunkt auf der Wand. */
  point: Point;
  /** Position entlang der Wand, 0..1. */
  t: number;
  distance: number;
  /** Wandrichtung in Grad. */
  angle: number;
}

/** Nächster Punkt auf einer Strecke. */
export function projectOnSegment(p: Point, a: Point, b: Point): { point: Point; t: number } {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2));
  return { point: { x: a.x + t * dx, y: a.y + t * dy }, t };
}

/** Die Wand, die `p` am nächsten liegt (innerhalb `maxDist`). */
export function nearestWall(p: Point, walls: readonly Wall[], maxDist: number): WallHit | undefined {
  let best: WallHit | undefined;
  for (const wall of walls) {
    const { point, t } = projectOnSegment(p, { x: wall.x1, y: wall.y1 }, { x: wall.x2, y: wall.y2 });
    const d = distance(p, point);
    if (d <= maxDist && (!best || d < best.distance)) {
      best = {
        wall,
        point,
        t,
        distance: d,
        angle: (Math.atan2(wall.y2 - wall.y1, wall.x2 - wall.x1) * 180) / Math.PI,
      };
    }
  }
  return best;
}

/** Fängt `p` auf einen vorhandenen Wand-Endpunkt innerhalb `maxDist`. */
export function snapToEndpoint(
  p: Point,
  walls: readonly Wall[],
  maxDist: number,
  ignore: readonly Wall[] = []
): Point | undefined {
  let best: Point | undefined;
  let bestD = maxDist;
  for (const w of walls) {
    if (ignore.includes(w)) continue;
    for (const q of [
      { x: w.x1, y: w.y1 },
      { x: w.x2, y: w.y2 },
    ]) {
      const d = distance(p, q);
      if (d <= bestD) {
        best = q;
        bestD = d;
      }
    }
  }
  return best;
}

/** Fängt `p` auf eine Ecke eines Raums innerhalb `maxDist`; `ignore` sind Eckpunkt-Objekte, die übersprungen werden. */
export function snapToAreaCorner(
  p: Point,
  areas: readonly Area[],
  maxDist: number,
  ignore: readonly Point[] = []
): Point | undefined {
  let best: Point | undefined;
  let bestD = maxDist;
  for (const a of areas) {
    for (const q of a.points) {
      if (ignore.includes(q)) continue;
      const d = distance(p, q);
      if (d <= bestD) {
        best = q;
        bestD = d;
      }
    }
  }
  return best && { x: best.x, y: best.y };
}

/** Hält eine Linie von `from` nach `to` waagrecht/senkrecht, wenn sie fast so verläuft. */
export function orthoSnap(from: Point, to: Point, toleranceDeg = 8): Point {
  const angle = Math.abs((Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI);
  if (angle < toleranceDeg || angle > 180 - toleranceDeg) return { x: to.x, y: from.y };
  if (Math.abs(angle - 90) < toleranceDeg) return { x: from.x, y: to.y };
  return to;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Sichtbereich einer Etage: alles, was gezeichnet ist (Wandstärke, Türschwung, Rollos, Icons)
 * plus ein kleiner Rand. Eine leere Etage zeigt die Leinwand.
 */
export function contentBounds(floor: Floor, plan: Plan): Rect {
  const { width, height } = plan.canvas;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const add = (x: number, y: number, m = 0) => {
    minX = Math.min(minX, x - m);
    minY = Math.min(minY, y - m);
    maxX = Math.max(maxX, x + m);
    maxY = Math.max(maxY, y + m);
  };
  const long = Math.max(width, height);
  const defaultThickness = plan.settings?.wallThickness ?? 12;
  for (const w of floor.walls) {
    const m = (w.thickness ?? defaultThickness) / 2;
    add(w.x1, w.y1, m);
    add(w.x2, w.y2, m);
  }
  for (const a of floor.areas) for (const p of a.points) add(p.x, p.y);
  for (const o of floor.openings) {
    const rad = (o.angle * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const s = o.swing === "out" ? -1 : 1;
    // Lokale Box: x entlang der Wand, y = Normale; Schwung auf der Swing-Seite, Rollos/Wand auf beiden
    const side = 30;
    const yMin = s > 0 ? -side : -(o.length + side);
    const yMax = s > 0 ? o.length + side : side;
    for (const lx of [-o.length / 2, o.length / 2])
      for (const ly of [yMin, yMax]) add(o.x + lx * cos - ly * sin, o.y + lx * sin + ly * cos);
  }
  const itemMargin = long * 0.04;
  for (const it of floor.items) add(it.x, it.y, itemMargin);
  if (minX === Infinity) {
    const pad = long * 0.03;
    return { x: -pad, y: -pad, w: width + 2 * pad, h: height + 2 * pad };
  }
  const pad = Math.max(maxX - minX, maxY - minY) * 0.03;
  return { x: minX - pad, y: minY - pad, w: maxX - minX + 2 * pad, h: maxY - minY + 2 * pad };
}

export interface Guide {
  axis: "x" | "y";
  value: number;
  ref: Point;
}

/** Richtet p an X-/Y-Koordinaten anderer Punkte aus (pro Achse unabhängig). */
export function alignSnap(p: Point, refs: readonly Point[], maxDist: number): { x?: number; y?: number; guides: Guide[] } {
  let bx: Point | undefined;
  let by: Point | undefined;
  let dx = maxDist;
  let dy = maxDist;
  for (const r of refs) {
    const ax = Math.abs(r.x - p.x);
    if (ax <= dx) {
      dx = ax;
      bx = r;
    }
    const ay = Math.abs(r.y - p.y);
    if (ay <= dy) {
      dy = ay;
      by = r;
    }
  }
  const guides: Guide[] = [];
  if (bx) guides.push({ axis: "x", value: bx.x, ref: bx });
  if (by) guides.push({ axis: "y", value: by.y, ref: by });
  return { x: bx?.x, y: by?.y, guides };
}

/** Achsparalleles Rechteck aus genau 4 Punkten, sonst undefined. */
export function axisRect(points: readonly Point[]): Rect | undefined {
  if (points.length !== 4) return undefined;
  const xs = [...new Set(points.map((p) => p.x))];
  const ys = [...new Set(points.map((p) => p.y))];
  if (xs.length !== 2 || ys.length !== 2) return undefined;
  return { x: Math.min(...xs), y: Math.min(...ys), w: Math.abs(xs[0] - xs[1]), h: Math.abs(ys[0] - ys[1]) };
}

function distToPolygonEdge(poly: readonly Point[], p: Point): number {
  let best = Infinity;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    best = Math.min(best, distance(p, projectOnSegment(p, a, b).point));
  }
  return best;
}

export interface PlaceRequest {
  light: boolean;
}

/**
 * Verteilt Icons deterministisch im Polygon: Lichter Richtung Mitte, andere Geräte Richtung Wand,
 * mit Mindestabstand zueinander, zu `existing` und zur Raumbeschriftung `label`.
 */
export function autoPlace(
  poly: readonly Point[],
  requests: readonly PlaceRequest[],
  existing: readonly Point[] = [],
  label?: Point,
  minGap = 40,
  edgeMargin = 20
): Point[] {
  if (poly.length < 3) return requests.map(() => ({ x: 0, y: 0 }));
  const center = polygonCentroid(poly);
  const xs = poly.map((p) => p.x);
  const ys = poly.map((p) => p.y);
  const x0 = Math.min(...xs);
  const x1 = Math.max(...xs);
  const y0 = Math.min(...ys);
  const y1 = Math.max(...ys);
  const step = Math.max(5, Math.min(x1 - x0, y1 - y0) / 40);
  const cands: Point[] = [];
  for (let y = y0 + step / 2; y < y1; y += step) {
    for (let x = x0 + step / 2; x < x1; x += step) {
      const c = { x: Math.round(x), y: Math.round(y) };
      if (pointInPolygon(poly, c.x, c.y)) cands.push(c);
    }
  }
  const placed: Point[] = [...existing];
  const out: Point[] = [];
  for (const req of requests) {
    let found: Point | undefined;
    for (const factor of [1, 0.6, 0.3]) {
      let bestScore = Infinity;
      for (const c of cands) {
        const edge = distToPolygonEdge(poly, c);
        if (edge < edgeMargin * factor) continue;
        if (placed.some((q) => distance(c, q) < minGap * factor)) continue;
        if (label && distance(c, label) < minGap * 1.5 * factor) continue;
        const score = req.light ? distance(c, center) : edge;
        if (score < bestScore) {
          bestScore = score;
          found = c;
        }
      }
      if (found) break;
    }
    const pt = found ?? center;
    placed.push(pt);
    out.push({ x: pt.x, y: pt.y });
  }
  return out;
}

/** Fängt `p` auf den nächsten Punkt einer vorhandenen Wand (auch mitten auf der Wand). */
export function snapToWallLine(p: Point, walls: readonly Wall[], maxDist: number, ignore: readonly Wall[] = []): Point | undefined {
  let best: Point | undefined;
  let bestD = maxDist;
  for (const w of walls) {
    if (ignore.includes(w)) continue;
    const hit = projectOnSegment(p, { x: w.x1, y: w.y1 }, { x: w.x2, y: w.y2 });
    const d = distance(p, hit.point);
    if (d <= bestD) {
      best = hit.point;
      bestD = d;
    }
  }
  return best && { x: Math.round(best.x * 100) / 100, y: Math.round(best.y * 100) / 100 };
}

/** Teilstücke der Strecke a–b, die noch von keiner kollinearen Wand abgedeckt sind. */
export function uncoveredParts(a: Point, b: Point, walls: readonly Wall[], tol = 0.5): [Point, Point][] {
  const len = distance(a, b);
  if (len < 1) return [];
  const spans: [number, number][] = [];
  for (const w of walls) {
    const p1 = { x: w.x1, y: w.y1 };
    const p2 = { x: w.x2, y: w.y2 };
    const r1 = projectOnSegment(p1, a, b);
    const r2 = projectOnSegment(p2, a, b);
    if (distance(p1, r1.point) > tol || distance(p2, r2.point) > tol) continue;
    const t1 = Math.min(r1.t, r2.t);
    const t2 = Math.max(r1.t, r2.t);
    if (t2 > t1) spans.push([t1, t2]);
  }
  spans.sort((x, y) => x[0] - y[0]);
  const out: [Point, Point][] = [];
  let cur = 0;
  const at = (t: number): Point => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
  for (const [s, e] of spans) {
    if (s > cur && (s - cur) * len > 1) out.push([at(cur), at(s)]);
    cur = Math.max(cur, e);
  }
  if (cur < 1 && (1 - cur) * len > 1) out.push([at(cur), at(1)]);
  return out;
}
