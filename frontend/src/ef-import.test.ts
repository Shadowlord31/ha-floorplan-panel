import { describe, expect, it } from "vitest";
import { parseEfImport } from "./ef-import";

describe("parseEfImport", () => {
  it("übernimmt Etagen und zählt Elemente", () => {
    const r = parseEfImport(`type: custom:easy-floorplan-card
width: 800
height: 600
floors:
  - id: eg
    name: EG
    walls: [{id: w1, x1: 0, y1: 0, x2: 100, y2: 0}]
    openings: [{id: o1, type: door}]
    items: []
`);
    expect(r.config.type).toBe("custom:fp-ef-card");
    expect(r.config.width).toBe(800);
    expect(r.summary).toEqual({ floors: 1, walls: 1, openings: 1, items: 0, texts: 0 });
  });
  it("findet die Karte in einem Dashboard-Ausschnitt und liest JSON", () => {
    const r = parseEfImport(JSON.stringify({ views: [{ cards: [{ type: "custom:easy-floorplan-card", walls: [{}, {}] }] }] }));
    expect(r.summary.walls).toBe(2);
  });
  it("lehnt Fremdes ab", () => {
    expect(() => parseEfImport("foo: bar")).toThrow(/Keine easy-floorplan/);
    expect(() => parseEfImport("a: [")).toThrow(/YAML/);
  });
});
