import { describe, expect, it } from "vitest";
import { migrateEfCards } from "./area-cards";

describe("migrateEfCards", () => {
  it("wandelt sidebar in eine entities-Karte um", () => {
    const ef = {
      floors: [{ areas: [{ id: "a", name: "Finnick", sidebar: [{ entity: "light.x", name: "Licht" }, { entity: "scene.y" }] }] }],
    };
    const a = migrateEfCards(ef).floors[0]!.areas[0] as any;
    expect(a.sidebar).toBeUndefined();
    expect(a.cards).toEqual([
      { type: "entities", title: "Finnick", entities: [{ entity: "light.x", name: "Licht" }, { entity: "scene.y" }] },
    ]);
  });
  it("lässt vorhandene cards unberührt", () => {
    const ef = { areas: [{ id: "a", cards: [{ type: "glance" }], sidebar: [{ entity: "light.x" }] }] };
    const a = migrateEfCards(ef).areas[0] as any;
    expect(a.cards).toEqual([{ type: "glance" }]);
    expect(a.sidebar).toBeUndefined();
  });
});
