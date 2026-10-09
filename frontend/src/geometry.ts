/**
 * Geometrie-Helfer: Zoom auf einen Raum, Punkt-in-Polygon, Fang auf Wände und Raster.
 *
 * `areaZoomTransform`, `resolveAreaZoom`, `polygonCentroid` und `pointInPolygon` sind
 * aus easy-floorplan (src/render.ts, MIT, Copyright (c) 2026 Nicolas Sandller) portiert –
 * ohne die dortige Plan-Drehung, die dieses Projekt nicht braucht.
 */
import type { Area, FloorItem, Point, Wall } from "./types";

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

/** Hält eine Linie von `from` nach `to` waagrecht/senkrecht, wenn sie fast so verläuft. */
export function orthoSnap(from: Point, to: Point, toleranceDeg = 8): Point {
  const angle = Math.abs((Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI);
  if (angle < toleranceDeg || angle > 180 - toleranceDeg) return { x: to.x, y: from.y };
  if (Math.abs(angle - 90) < toleranceDeg) return { x: from.x, y: to.y };
  return to;
}
