import { describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { normalisiereOptionen } from "./optionen";
import { planEntitaeten, planIcons } from "./planinfo";
import { baueExport, parseExport, MAX_IMPORT_BYTES } from "./plan-export";
import { erzeugeHass } from "./hass";
import type { Adapter } from "./adapter";

const beispiel = JSON.parse(readFileSync(new URL("../../../custom_components/floorplan_panel/sample_plan.json", import.meta.url), "utf8"));

describe("Optionen", () => {
  it("Standard entspricht dem bisherigen Verhalten", () => {
    expect(normalisiereOptionen()).toEqual({ wandverdeckung: true, schein: "voll", buendeln_ms: 0 });
  });
  it("übernimmt gültige Werte, verwirft ungültige", () => {
    expect(normalisiereOptionen({ wandverdeckung: false, schein: "aus", buendeln_ms: 50 })).toEqual({ wandverdeckung: false, schein: "aus", buendeln_ms: 50 });
    expect(normalisiereOptionen({ schein: "x" as never, buendeln_ms: -3 })).toEqual({ wandverdeckung: true, schein: "voll", buendeln_ms: 0 });
  });
});

describe("Planinfo und Export", () => {
  it("findet Entitäten und Symbole im Beispielplan", () => {
    const ef = beispiel.ef;
    const ents = planEntitaeten(ef);
    expect(ents.length).toBeGreaterThan(3);
    expect(ents).toEqual([...new Set(ents)].sort());
    expect(planIcons(ef)).toContain("mdi:ceiling-light");
  });

  it("Export ist gültig, enthält Pfad-Tabelle und Entitätsliste, Plan unverändert", async () => {
    const vorher = JSON.stringify(beispiel);
    const ex = await baueExport(beispiel, async (n) => (n === "mdi:ceiling-light" ? "M1,1Z" : undefined), new Date("2026-11-25T10:00:00Z"));
    expect(JSON.stringify(beispiel)).toBe(vorher);
    expect(ex).toMatchObject({ format: "fp-export", version: 1, erstellt: "2026-11-25T10:00:00.000Z" });
    expect(ex.plan.ef).toEqual(beispiel.ef);
    expect(ex.icons).toEqual({ "mdi:ceiling-light": "M1,1Z" });
    expect(ex.entities).toEqual(planEntitaeten(beispiel.ef));
  });

  it("Import akzeptiert den eigenen Export", async () => {
    const ex = await baueExport(beispiel, async () => "M0,0Z");
    expect(parseExport(JSON.stringify(ex)).plan.ef).toEqual(beispiel.ef);
  });

  it("Import lehnt Unpassendes mit lesbarer Meldung ab", () => {
    expect(() => parseExport("x".repeat(10), MAX_IMPORT_BYTES + 1)).toThrow(/zu groß/);
    expect(() => parseExport("{nope")).toThrow(/JSON/);
    expect(() => parseExport("{}")).toThrow(/Exportdatei/);
    expect(() => parseExport(JSON.stringify({ format: "fp-export", version: 2 }))).toThrow(/Version/i);
    expect(() => parseExport(JSON.stringify({ format: "fp-export", version: 1 }))).toThrow(/keinen Plan/);
  });
});

describe("erzeugeHass", () => {
  const zustaende: Record<string, { state: string; attributes?: Record<string, unknown> }> = {
    "light.a": { state: "on", attributes: { brightness: 200 } },
    "light.b": { state: "off" },
  };
  const aktionen: [string, string][] = [];
  const adapter: Adapter = {
    zustand: (id) => zustaende[id],
    abonnieren: () => () => {},
    aktion: (id, a) => void aktionen.push([id, a]),
    plan_laden: () => ({}),
    plan_speichern: () => {},
    icon: () => undefined,
    name: (id) => `Name ${id}`,
  };

  it("liefert Zustände mit Namen", () => {
    const h = erzeugeHass(adapter, ["light.a", "light.b", "light.fehlt"]);
    expect(h.states["light.a"].state).toBe("on");
    expect(h.states["light.a"].attributes.friendly_name).toBe("Name light.a");
    expect(h.states["light.fehlt"].state).toBe("unavailable");
  });

  it("callService ruft nur adapter.aktion, Fremdes wird einmal gemeldet", async () => {
    aktionen.length = 0;
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const h = erzeugeHass(adapter, ["light.a"]);
    await h.callService("light", "toggle", { entity_id: "light.a" });
    await h.callService("light", "turn_on", { entity_id: "light.a" });
    await h.callService("light", "turn_off", { entity_id: "light.a" });
    await h.callService("notify", "send", { entity_id: "x.y" });
    await h.callService("notify", "send", { entity_id: "x.y" });
    expect(aktionen).toEqual([["light.a", "toggle"], ["light.a", "an"], ["light.a", "aus"]]);
    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });

  it("unveränderte Zustände behalten ihre Identität", () => {
    const h1 = erzeugeHass(adapter, ["light.a", "light.b"]);
    zustaende["light.b"] = { state: "on" };
    const h2 = erzeugeHass(adapter, ["light.a", "light.b"], h1, ["light.b"]);
    expect(h2.states["light.a"]).toBe(h1.states["light.a"]);
    expect(h2.states["light.b"]).not.toBe(h1.states["light.b"]);
    expect(h2.formatEntityState).toBe(h1.formatEntityState);
  });
});
