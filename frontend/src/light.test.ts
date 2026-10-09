import { describe, expect, it } from "vitest";
import type { HassEntity, HomeAssistant } from "./ha";
import {
  GLOW_MAX_OPACITY,
  GLOW_MIN_OPACITY,
  glowEnabled,
  glowPaint,
  glowReach,
  openingPassesLight,
  shutterClosedFraction,
  wallsLightPassesThrough,
} from "./light";
import { pointInPolygon } from "./geometry";
import type { Opening, Wall } from "./types";

const st = (entity_id: string, state: string, attributes: Record<string, unknown> = {}): HassEntity => ({
  entity_id,
  state,
  attributes,
  last_changed: "",
});
const hass = (...states: HassEntity[]) => ({ states: Object.fromEntries(states.map((s) => [s.entity_id, s])) }) as unknown as HomeAssistant;

describe("glowPaint", () => {
  it("scheint nur, wenn das Licht an ist", () => {
    expect(glowPaint({}, undefined)).toBeUndefined();
    expect(glowPaint({}, st("light.a", "off"))).toBeUndefined();
    expect(glowPaint({}, st("light.a", "unavailable"))).toBeUndefined();
  });

  it("nutzt volle Stärke und Reichweite ohne Helligkeitsangabe", () => {
    expect(glowPaint({ glowRadius: 200 }, st("light.a", "on"))).toEqual({ color: "#ffd9a0", opacity: GLOW_MAX_OPACITY, radius: 200 });
  });

  it("dimmt Stärke und Reichweite mit der Helligkeit", () => {
    const p = glowPaint({ glowRadius: 200 }, st("light.a", "on", { brightness: 0 }))!;
    expect(p.opacity).toBeCloseTo(GLOW_MIN_OPACITY);
    expect(p.radius).toBeCloseTo(100);
  });

  it("übernimmt rgb_color", () => {
    expect(glowPaint({ glowColor: "#fff" }, st("light.a", "on", { rgb_color: [255, 0, 12.4] }))!.color).toBe("rgb(255, 0, 12)");
  });

  it("ist bei Lichtern automatisch an", () => {
    expect(glowEnabled({ entity: "light.a" })).toBe(true);
    expect(glowEnabled({ entity: "switch.a" })).toBe(false);
    expect(glowEnabled({ entity: "switch.a", glow: true })).toBe(true);
    expect(glowEnabled({ entity: "light.a", glow: false })).toBe(false);
  });
});

describe("glowReach", () => {
  // Raum 0..200 mit Trennwand bei x = 100
  const wall: Wall = { id: "w", x1: 100, y1: -500, x2: 100, y2: 500 };

  it("liefert ohne Wand in Reichweite keinen Zuschnitt", () => {
    expect(glowReach(0, 0, 50, [wall])).toBeUndefined();
  });

  it("endet an einer Wand", () => {
    const poly = glowReach(50, 0, 150, [wall])!;
    expect(poly).toBeDefined();
    expect(pointInPolygon(poly, 90, 0)).toBe(true);
    expect(pointInPolygon(poly, 120, 0)).toBe(false);
    expect(Math.max(...poly.map((p) => p.x))).toBeLessThanOrEqual(100.01);
  });

  it("wird von der Wand, an der die Lampe hängt, nicht abgeschattet", () => {
    expect(glowReach(100, 0, 80, [wall], () => 12)).toBeUndefined();
  });
});

describe("Licht durch Türen", () => {
  const wall: Wall = { id: "w", x1: 100, y1: -500, x2: 100, y2: 500 };
  const door = (entity?: string): Opening => ({ id: "t", type: "door", x: 100, y: 0, length: 80, angle: 90, entity });
  const window: Opening = { id: "f", type: "window", x: 100, y: 0, length: 80, angle: 90, entity: "binary_sensor.f" };

  it("Tür ohne Kontakt gilt als offen, Fenster nie", () => {
    expect(openingPassesLight(door())).toBe(true);
    expect(openingPassesLight(window, hass(st("binary_sensor.f", "on")))).toBe(false);
  });

  it("Tür mit Kontakt nur, wenn offen", () => {
    expect(openingPassesLight(door("binary_sensor.t"), hass(st("binary_sensor.t", "off")))).toBe(false);
    expect(openingPassesLight(door("binary_sensor.t"), hass(st("binary_sensor.t", "on")))).toBe(true);
  });

  it("schneidet eine Lücke in die Wand und lässt Licht durch", () => {
    const cut = wallsLightPassesThrough([wall], [door()], () => true);
    expect(cut).toHaveLength(2);
    const poly = glowReach(50, 0, 150, cut)!;
    expect(pointInPolygon(poly, 150, 0)).toBe(true); // durch die Tür
    expect(pointInPolygon(poly, 150, 120)).toBe(false); // hinter der Wand
  });

  it("lässt Wände ohne offene Öffnung unverändert", () => {
    const walls = [wall];
    expect(wallsLightPassesThrough(walls, [door("binary_sensor.t")], () => false)).toBe(walls);
  });
});

describe("shutterClosedFraction", () => {
  it("liest die Position (100 = offen)", () => {
    expect(shutterClosedFraction(st("cover.r", "open", { current_position: 100 }))).toBe(0);
    expect(shutterClosedFraction(st("cover.r", "open", { current_position: 30 }))).toBeCloseTo(0.7);
    expect(shutterClosedFraction(st("cover.r", "closed", { current_position: 0 }))).toBe(1);
  });

  it("fällt auf den Zustand zurück", () => {
    expect(shutterClosedFraction(st("cover.r", "closed"))).toBe(1);
    expect(shutterClosedFraction(st("cover.r", "open"))).toBe(0);
    expect(shutterClosedFraction(st("cover.r", "unavailable"))).toBeUndefined();
    expect(shutterClosedFraction(undefined)).toBeUndefined();
  });
});
