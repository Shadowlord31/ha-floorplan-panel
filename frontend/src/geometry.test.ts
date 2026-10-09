import { describe, expect, it } from "vitest";
import {
  IDENTITY_ZOOM,
  areaZoomTransform,
  itemHiddenUntilZoomed,
  itemRoom,
  nearestWall,
  orthoSnap,
  pointInPolygon,
  resolveAreaZoom,
  snapToEndpoint,
} from "./geometry";
import type { Area, FloorItem, Wall } from "./types";

const rect = (x1: number, y1: number, x2: number, y2: number) => [
  { x: x1, y: y1 },
  { x: x2, y: y1 },
  { x: x2, y: y2 },
  { x: x1, y: y2 },
];
const area = (id: string, points = rect(0, 0, 100, 100)): Area => ({ id, name: id, points, sidebar: [] });

describe("areaZoomTransform", () => {
  it("liefert die Identität ohne Punkte", () => {
    expect(areaZoomTransform([], 1000, 700)).toEqual(IDENTITY_ZOOM);
  });

  it("zentriert einen kleinen Raum und begrenzt den Zoom", () => {
    const z = areaZoomTransform(rect(450, 300, 550, 400), 1000, 700);
    expect(z.scale).toBe(4);
    // Mitte des Raums (500/350) landet in der Bildmitte
    expect(z.txPercent).toBeCloseTo(50 - 4 * 50);
    expect(z.tyPercent).toBeCloseTo(50 - 4 * 50);
  });

  it("verschiebt nie über den Planrand hinaus", () => {
    const z = areaZoomTransform(rect(0, 0, 200, 150), 1000, 700);
    expect(z.txPercent).toBeLessThanOrEqual(0);
    expect(z.tyPercent).toBeLessThanOrEqual(0);
    expect(z.txPercent).toBeGreaterThanOrEqual(100 * (1 - z.scale));
  });

  it("zoomt einen Raum, der die Leinwand füllt, nicht", () => {
    expect(areaZoomTransform(rect(0, 0, 1000, 700), 1000, 700)).toEqual({ scale: 1, txPercent: 0, tyPercent: 0 });
  });

  it("nutzt einen expliziten Zoom", () => {
    expect(areaZoomTransform(rect(450, 300, 550, 400), 1000, 700, undefined, undefined, 2).scale).toBe(2);
  });
});

describe("resolveAreaZoom", () => {
  it("begrenzt und ignoriert Unsinn", () => {
    expect(resolveAreaZoom({ zoom: 0.5 })).toBe(1);
    expect(resolveAreaZoom({ zoom: 50 })).toBe(10);
    expect(resolveAreaZoom({ zoom: NaN })).toBeUndefined();
    expect(resolveAreaZoom({ zoom: null })).toBeUndefined();
  });
});

describe("Räume und Icons", () => {
  it("erkennt Punkte im Polygon", () => {
    expect(pointInPolygon(rect(0, 0, 10, 10), 5, 5)).toBe(true);
    expect(pointInPolygon(rect(0, 0, 10, 10), 15, 5)).toBe(false);
  });

  it("ordnet ein Icon dem kleinsten umgebenden Raum zu", () => {
    const big = area("gross", rect(0, 0, 500, 500));
    const small = area("klein", rect(100, 100, 200, 200));
    expect(itemRoom({ x: 150, y: 150 }, [big, small])?.id).toBe("klein");
    expect(itemRoom({ x: 400, y: 400 }, [big, small])?.id).toBe("gross");
    expect(itemRoom({ x: 150, y: 150, area: "gross" }, [big, small])?.id).toBe("gross");
  });

  it("blendet Icons nur bis zum Zoom ihres Raums aus", () => {
    const a = area("a");
    const b = area("b", rect(200, 0, 300, 100));
    const item: FloorItem = { id: "i", x: 50, y: 50, showOnlyWhenZoomed: true };
    expect(itemHiddenUntilZoomed(item, undefined, [a, b])).toBe(true);
    expect(itemHiddenUntilZoomed(item, a, [a, b])).toBe(false);
    expect(itemHiddenUntilZoomed(item, b, [a, b])).toBe(true);
    expect(itemHiddenUntilZoomed({ ...item, showOnlyWhenZoomed: false }, undefined, [a, b])).toBe(false);
  });
});

describe("Fang", () => {
  const walls: Wall[] = [
    { id: "w1", x1: 0, y1: 0, x2: 100, y2: 0 },
    { id: "w2", x1: 100, y1: 0, x2: 100, y2: 100 },
  ];

  it("findet die nächste Wand mit Winkel", () => {
    const hit = nearestWall({ x: 50, y: 4 }, walls, 10);
    expect(hit?.wall.id).toBe("w1");
    expect(hit?.point).toEqual({ x: 50, y: 0 });
    expect(hit?.angle).toBe(0);
    expect(nearestWall({ x: 50, y: 50 }, walls, 10)).toBeUndefined();
  });

  it("fängt Endpunkte und ignoriert die gezogene Wand", () => {
    expect(snapToEndpoint({ x: 98, y: 3 }, walls, 5)).toEqual({ x: 100, y: 0 });
    expect(snapToEndpoint({ x: 98, y: 3 }, walls, 5, walls)).toBeUndefined();
  });

  it("richtet fast waagrechte Linien aus", () => {
    expect(orthoSnap({ x: 0, y: 0 }, { x: 100, y: 5 })).toEqual({ x: 100, y: 0 });
    expect(orthoSnap({ x: 0, y: 0 }, { x: 4, y: 100 })).toEqual({ x: 0, y: 100 });
    expect(orthoSnap({ x: 0, y: 0 }, { x: 100, y: 100 })).toEqual({ x: 100, y: 100 });
  });
});

import { contentBounds } from "./geometry";
import { normalizePlan } from "./types";

describe("contentBounds", () => {
  const base = () =>
    normalizePlan({
      canvas: { width: 1000, height: 800 },
      floors: [{ id: "eg", name: "", walls: [], areas: [], items: [], openings: [] }],
    } as never);

  it("entspricht bei leerem Plan der Leinwand plus Rand", () => {
    const plan = base();
    const b = contentBounds(plan.floors[0], plan);
    expect(b.x).toBeCloseTo(-30);
    expect(b.w).toBeCloseTo(1060);
    expect(b.h).toBeCloseTo(860);
  });

  it("wächst, wenn ein Türschwung über den unteren Rand ragt", () => {
    const plan = base();
    plan.floors[0].openings.push({ id: "t", type: "door", x: 500, y: 790, length: 90, angle: 0, swing: "in" });
    const b = contentBounds(plan.floors[0], plan);
    expect(b.y + b.h).toBeGreaterThan(790 + 90 + 30);
  });

  it("beachtet die Drehung und die Schwungseite", () => {
    const plan = base();
    plan.floors[0].openings.push({ id: "t", type: "door", x: 10, y: 400, length: 100, angle: 90, swing: "out" });
    const b = contentBounds(plan.floors[0], plan);
    // angle 90: Normale zeigt nach -x, "out" schwingt nach +x; links ragt nur der Rollo-Rand (30) über
    expect(b.x).toBeCloseTo(-50, 0);
  });
});
