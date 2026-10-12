/** Geometrie-Helfer, die der Port (`ef-area-extras.ts`) braucht. */
import type { Point } from "./types";

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Achsparalleles Rechteck aus genau 4 Punkten, sonst undefined. */
export function axisRect(points: readonly Point[]): Rect | undefined {
  if (points.length !== 4) return undefined;
  const xs = [...new Set(points.map((p) => p.x))];
  const ys = [...new Set(points.map((p) => p.y))];
  if (xs.length !== 2 || ys.length !== 2) return undefined;
  return { x: Math.min(...xs), y: Math.min(...ys), w: Math.abs(xs[0] - xs[1]), h: Math.abs(ys[0] - ys[1]) };
}
