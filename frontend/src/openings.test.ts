import { describe, expect, it } from "vitest";
import type { HassEntity, HomeAssistant } from "./ha";
import { doorState, entityOpenState, leafSegments, lockStatus, setLeafCount, setLeafWidth, windowMissingSensor } from "./openings";
import { migrateOpening, normalizePlan, type Opening } from "./types";

const win = (extra: Partial<Opening> = {}): Opening => ({ id: "f", type: "window", x: 0, y: 0, length: 120, angle: 0, ...extra });

function hassWith(states: Record<string, string>): HomeAssistant {
  const out: Record<string, unknown> = {};
  for (const [id, state] of Object.entries(states)) out[id] = { entity_id: id, state, attributes: {} };
  return { states: out } as unknown as HomeAssistant;
}

describe("leafSegments", () => {
  it("teilt die Länge nach den relativen Breiten auf", () => {
    const segs = leafSegments(win({ leaves: [{ w: 1 }, { w: 2 }, { w: 1 }] }));
    expect(segs.map((s) => Math.round(s.x1 - s.x0))).toEqual([30, 60, 30]);
    expect(segs[0].x0).toBeCloseTo(-60);
    expect(segs[2].x1).toBeCloseTo(60);
  });

  it("schlägt außen an, außer ein Flügel legt es fest", () => {
    const segs = leafSegments(win({ leaves: [{ w: 1 }, { w: 1 }, { w: 1, hinge: "right" }] }));
    expect(segs.map((s) => s.hinge)).toEqual(["left", "left", "right"]);
    expect(leafSegments(win({ hinge: "right" }))[0].hinge).toBe("right");
  });

  it("nimmt je Flügel den eigenen Sensor, sonst den Gesamtkontakt", () => {
    const segs = leafSegments(win({ entity: "binary_sensor.alle", leaves: [{ w: 1, entity: "binary_sensor.links" }, { w: 1 }] }));
    expect(segs.map((s) => s.entity)).toEqual(["binary_sensor.links", "binary_sensor.alle"]);
  });
});

describe("Zustand", () => {
  it("meldet pro Sensor offen und unbekannt", () => {
    const hass = hassWith({ "binary_sensor.a": "on", "binary_sensor.b": "off", "binary_sensor.c": "unavailable" });
    expect(entityOpenState("binary_sensor.a", hass)).toEqual({ open: true, unknown: false });
    expect(entityOpenState("binary_sensor.b", hass)).toEqual({ open: false, unknown: false });
    expect(entityOpenState("binary_sensor.c", hass).unknown).toBe(true);
    expect(entityOpenState("binary_sensor.fehlt", hass).unknown).toBe(true);
    expect(entityOpenState(undefined, hass)).toEqual({ open: false, unknown: false });
  });

  it("zeigt eine Tür über ihren Kontakt", () => {
    const door: Opening = { id: "t", type: "door", x: 0, y: 0, length: 90, angle: 0, entity: "binary_sensor.tuer" };
    expect(doorState(door, hassWith({ "binary_sensor.tuer": "on" })).open).toBe(true);
    expect(doorState(door, hassWith({ "binary_sensor.tuer": "off" })).open).toBe(false);
  });

  it("liest das Schloss getrennt vom Kontakt", () => {
    const state = (s: string) => ({ entity_id: "lock.x", state: s, attributes: {} }) as unknown as HassEntity;
    expect(lockStatus(state("locked"))).toBe("locked");
    expect(lockStatus(state("unlocked"))).toBe("unlocked");
    expect(lockStatus(state("unavailable"))).toBe("unknown");
    expect(lockStatus(undefined)).toBe("unknown");
  });

  it("warnt nur, wenn weder Fenster noch ein Flügel einen Sensor hat", () => {
    expect(windowMissingSensor(win())).toBe(true);
    expect(windowMissingSensor(win({ entity: "binary_sensor.a" }))).toBe(false);
    expect(windowMissingSensor(win({ leaves: [{ w: 1 }, { w: 1, entity: "binary_sensor.b" }] }))).toBe(false);
    expect(windowMissingSensor({ ...win(), type: "door" })).toBe(false);
  });
});

describe("Flügel bearbeiten", () => {
  it("begrenzt die Anzahl auf 1 bis 4 und ergänzt gleich breite Flügel", () => {
    expect(setLeafCount([{ w: 2 }], 3)).toEqual([{ w: 2 }, { w: 2 }, { w: 2 }]);
    expect(setLeafCount([{ w: 1 }], 9)).toHaveLength(4);
    expect(setLeafCount([{ w: 1 }, { w: 1 }], 0)).toHaveLength(1);
  });

  it("verteilt beim Ändern einer Breite den Rest auf die anderen", () => {
    const leaves = setLeafWidth([{ w: 1 }, { w: 1 }, { w: 2 }], 0, 60, 120);
    const o = win({ leaves });
    const widths = leafSegments(o).map((s) => Math.round(s.x1 - s.x0));
    expect(widths).toEqual([60, 20, 40]);
    expect(widths.reduce((a, b) => a + b, 0)).toBe(120);
  });

  it("lässt jedem Flügel mindestens 10", () => {
    const widths = leafSegments(win({ leaves: setLeafWidth([{ w: 1 }, { w: 1 }], 0, 500, 120) })).map((s) => Math.round(s.x1 - s.x0));
    expect(widths).toEqual([110, 10]);
  });
});

describe("Migration", () => {
  it("wandelt sashes und shutterEntity um", () => {
    const old = { ...win(), sashes: 2, shutterEntity: "cover.r", shutterColor: "#111111" } as unknown as Opening;
    const o = migrateOpening(old);
    expect(o.leaves).toEqual([{ w: 1, hinge: "left" }, { w: 1, hinge: "right" }]);
    expect(o.shutters).toEqual([{ entity: "cover.r", side: "out", color: "#111111" }]);
    expect("sashes" in o || "shutterEntity" in o).toBe(false);
  });

  it("verschiebt ein Schloss aus entity nach lockEntity", () => {
    const o = migrateOpening({ id: "t", type: "door", x: 0, y: 0, length: 90, angle: 0, entity: "lock.tuer" });
    expect(o.lockEntity).toBe("lock.tuer");
    expect(o.entity).toBeUndefined();
  });

  it("läuft über normalizePlan", () => {
    const plan = normalizePlan({
      floors: [{ id: "eg", name: "", walls: [], areas: [], items: [], openings: [{ ...win(), sashes: 1 } as unknown as Opening] }],
    });
    expect(plan.floors[0].openings[0].leaves).toEqual([{ w: 1 }]);
  });
});
