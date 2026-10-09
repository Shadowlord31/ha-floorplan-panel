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
  snapToAreaCorner,
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

  it("fängt Raumecken und überspringt ignorierte Punkte", () => {
    const area = { id: "r", name: "", sidebar: [], points: [{ x: 0, y: 0 }, { x: 200, y: 0 }, { x: 200, y: 100 }] };
    expect(snapToAreaCorner({ x: 197, y: 2 }, [area], 5)).toEqual({ x: 200, y: 0 });
    expect(snapToAreaCorner({ x: 197, y: 2 }, [area], 5, [area.points[1]])).toBeUndefined();
    expect(snapToAreaCorner({ x: 150, y: 50 }, [area], 5)).toBeUndefined();
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
  const wall = { id: "w", x1: 100, y1: 100, x2: 500, y2: 100, thickness: 20 };

  it("zeigt bei leerer Etage die Leinwand plus Rand", () => {
    const plan = base();
    const b = contentBounds(plan.floors[0], plan);
    expect(b.x).toBeCloseTo(-30);
    expect(b.w).toBeCloseTo(1060);
    expect(b.h).toBeCloseTo(860);
  });

  it("richtet sich nach dem Inhalt, nicht nach der Leinwand, auch außerhalb davon", () => {
    const plan = base();
    plan.floors[0].walls.push({ ...wall, x1: -300, x2: 1500 });
    const b = contentBounds(plan.floors[0], plan);
    expect(b.x).toBeLessThan(-300);
    expect(b.x + b.w).toBeGreaterThan(1500);
    expect(b.h).toBeLessThan(200);
  });

  it("wächst, wenn ein Türschwung über die Wand ragt", () => {
    const plan = base();
    plan.floors[0].walls.push(wall);
    plan.floors[0].openings.push({ id: "t", type: "door", x: 300, y: 100, length: 90, angle: 0, swing: "in" });
    const b = contentBounds(plan.floors[0], plan);
    expect(b.y + b.h).toBeGreaterThan(100 + 90 + 30);
  });

  it("beachtet Drehung und Schwungseite", () => {
    const plan = base();
    plan.floors[0].openings.push({ id: "t", type: "door", x: 10, y: 400, length: 100, angle: 90, swing: "out" });
    const b = contentBounds(plan.floors[0], plan);
    // angle 90: Normale zeigt nach -x, "out" schwingt nach +x; links ragt nur der Rollo-Rand (30) über x=10
    expect(b.x).toBeGreaterThan(-60);
    expect(b.x + b.w).toBeGreaterThan(10 + 100);
  });
});

import { alignSnap, autoPlace, axisRect } from "./geometry";

describe("Ausrichtung und Platzierung", () => {
  it("richtet pro Achse an Referenzpunkten aus", () => {
    const r = alignSnap({ x: 103, y: 50 }, [{ x: 100, y: 0 }, { x: 300, y: 48 }], 5);
    expect(r.x).toBe(100);
    expect(r.y).toBe(48);
    expect(r.guides).toHaveLength(2);
    expect(alignSnap({ x: 150, y: 150 }, [{ x: 100, y: 0 }], 5)).toEqual({ x: undefined, y: undefined, guides: [] });
  });

  it("erkennt achsparallele Rechtecke", () => {
    expect(axisRect(rect(10, 20, 110, 70))).toEqual({ x: 10, y: 20, w: 100, h: 50 });
    expect(axisRect([{ x: 0, y: 0 }, { x: 100, y: 10 }, { x: 100, y: 100 }, { x: 0, y: 100 }])).toBeUndefined();
    expect(axisRect([{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 0, y: 10 }])).toBeUndefined();
  });

  it("platziert deterministisch, im Raum und mit Abstand", () => {
    const poly = rect(0, 0, 400, 300);
    const reqs = [{ light: true }, { light: false }, { light: false }, { light: true }];
    const a = autoPlace(poly, reqs, [], { x: 200, y: 150 });
    expect(autoPlace(poly, reqs, [], { x: 200, y: 150 })).toEqual(a);
    for (const p of a) expect(pointInPolygon(poly, p.x, p.y)).toBe(true);
    for (let i = 0; i < a.length; i++)
      for (let j = i + 1; j < a.length; j++) expect(Math.hypot(a[i].x - a[j].x, a[i].y - a[j].y)).toBeGreaterThanOrEqual(40);
    expect(Math.hypot(a[0].x - 200, a[0].y - 150)).toBeGreaterThanOrEqual(60);
    expect(Math.min(a[1].x, 400 - a[1].x, a[1].y, 300 - a[1].y)).toBeLessThan(60);
  });
});

import { snapToWallLine, uncoveredParts } from "./geometry";

describe("Andocken", () => {
  const walls: Wall[] = [{ id: "w", x1: 0, y1: 0, x2: 100, y2: 0 }];
  it("fängt mitten auf der Wand", () => {
    expect(snapToWallLine({ x: 40, y: 6 }, walls, 10)).toEqual({ x: 40, y: 0 });
    expect(snapToWallLine({ x: 40, y: 30 }, walls, 10)).toBeUndefined();
  });
  it("liefert nur nicht abgedeckte Teile", () => {
    expect(uncoveredParts({ x: 0, y: 0 }, { x: 100, y: 0 }, walls)).toEqual([]);
    expect(uncoveredParts({ x: 0, y: 0 }, { x: 200, y: 0 }, walls)).toEqual([[{ x: 100, y: 0 }, { x: 200, y: 0 }]]);
    expect(uncoveredParts({ x: 0, y: 10 }, { x: 100, y: 10 }, walls)).toHaveLength(1);
  });
});

import { roomWalls, wallRooms } from "./geometry";

describe("Raum-Wände", () => {
  const a = area("r", rect(0, 0, 100, 100));
  const on: Wall = { id: "a", x1: 0, y1: 0, x2: 100, y2: 0 };
  const part: Wall = { id: "b", x1: 100, y1: 20, x2: 100, y2: 60 };
  const off: Wall = { id: "c", x1: 0, y1: 50, x2: 100, y2: 50 };
  it("findet Wände auf den Raumkanten, auch Teilstücke", () => {
    expect(roomWalls(a, [on, part, off]).map((w) => w.id)).toEqual(["a", "b"]);
    expect(wallRooms(on, [a, area("x", rect(200, 0, 300, 100))]).map((r) => r.id)).toEqual(["r"]);
    expect(wallRooms(off, [a])).toEqual([]);
  });
});
