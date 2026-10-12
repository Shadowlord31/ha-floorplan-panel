import { describe, expect, it } from "vitest";
import { axisRect } from "./geometry";

const rect = (x1: number, y1: number, x2: number, y2: number) => [
  { x: x1, y: y1 },
  { x: x2, y: y1 },
  { x: x2, y: y2 },
  { x: x1, y: y2 },
];

describe("axisRect", () => {
  it("erkennt achsparallele Rechtecke", () => {
    expect(axisRect(rect(10, 20, 110, 70))).toEqual({ x: 10, y: 20, w: 100, h: 50 });
    expect(axisRect([{ x: 0, y: 0 }, { x: 100, y: 10 }, { x: 100, y: 100 }, { x: 0, y: 100 }])).toBeUndefined();
    expect(axisRect([{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 0, y: 10 }])).toBeUndefined();
  });
});
