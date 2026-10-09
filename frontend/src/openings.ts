/**
 * Zustand und Aufteilung von Fenstern und Türen: Flügel nebeneinander, Sensor je Flügel,
 * Tür-Kontakt und Schloss. Reine Logik ohne Rendering, damit sie testbar bleibt.
 */
import { isActive, type HassEntity, type HomeAssistant } from "./ha";
import { MAX_LEAVES, type Leaf, type Opening } from "./types";

export const MIN_LEAF_CM = 10;

export interface LeafSegment {
  index: number;
  /** Grenzen in lokalen Koordinaten (Mitte der Öffnung = 0). */
  x0: number;
  x1: number;
  hinge: "left" | "right";
  /** Sensor dieses Flügels, sonst der Gesamtkontakt des Fensters. */
  entity?: string;
}

export interface OpenState {
  open: boolean;
  /** Sensor fehlt in HA oder ist nicht erreichbar. */
  unknown: boolean;
}

export function windowLeaves(o: Opening): Leaf[] {
  return o.leaves?.length ? o.leaves : [{ w: 1 }];
}

/** Flügel mit Position entlang der Öffnung; erster Flügel schlägt links an, letzter rechts. */
export function leafSegments(o: Opening): LeafSegment[] {
  const leaves = windowLeaves(o);
  const total = leaves.reduce((sum, l) => sum + Math.max(l.w, 0.0001), 0);
  let x = -o.length / 2;
  return leaves.map((leaf, index) => {
    const width = (Math.max(leaf.w, 0.0001) / total) * o.length;
    const seg: LeafSegment = {
      index,
      x0: x,
      x1: x + width,
      hinge: leaf.hinge ?? defaultHinge(o, index, leaves.length),
      entity: leaf.entity || o.entity || undefined,
    };
    x += width;
    return seg;
  });
}

function defaultHinge(o: Opening, index: number, count: number): "left" | "right" {
  if (count === 1) return o.hinge ?? "left";
  return index === count - 1 ? "right" : "left";
}

export function entityOpenState(entity: string | undefined, hass?: HomeAssistant): OpenState {
  if (!entity || !hass) return { open: false, unknown: false };
  const state = hass.states[entity];
  const unknown = !state || state.state === "unavailable" || state.state === "unknown";
  return { open: !unknown && isActive(state), unknown };
}

/** Zustand der Tür über ihren Kontakt. */
export function doorState(o: Opening, hass?: HomeAssistant): OpenState {
  return entityOpenState(o.entity, hass);
}

export type LockStatus = "locked" | "unlocked" | "unknown";

export function lockStatus(state: HassEntity | undefined): LockStatus {
  if (!state || state.state === "unavailable" || state.state === "unknown") return "unknown";
  return state.state === "locked" ? "locked" : "unlocked";
}

/** Fenster ohne jeden Sensor (weder Gesamtkontakt noch Flügelsensor). */
export function windowMissingSensor(o: Opening): boolean {
  return o.type === "window" && !o.entity && !o.leaves?.some((l) => l.entity);
}

/** Ändert die Anzahl der Flügel; neue Flügel teilen sich die Breite gleichmäßig. */
export function setLeafCount(leaves: readonly Leaf[], count: number): Leaf[] {
  const n = Math.max(1, Math.min(MAX_LEAVES, Math.round(count)));
  const base = leaves.length ? leaves.map((l) => ({ ...l })) : [{ w: 1 }];
  if (n <= base.length) return base.slice(0, n);
  const avg = base.reduce((s, l) => s + l.w, 0) / base.length;
  while (base.length < n) base.push({ w: avg });
  return base;
}

/**
 * Setzt die Breite eines Flügels in Planeinheiten; die übrigen teilen sich den Rest im
 * bisherigen Verhältnis. Jeder Flügel behält mindestens `MIN_LEAF_CM`.
 */
export function setLeafWidth(leaves: readonly Leaf[], index: number, width: number, length: number): Leaf[] {
  if (leaves.length === 1) return leaves.map((l) => ({ ...l }));
  const others = leaves.length - 1;
  const clamped = Math.max(MIN_LEAF_CM, Math.min(length - MIN_LEAF_CM * others, width));
  const restTotal = leaves.reduce((s, l, i) => (i === index ? s : s + l.w), 0);
  const rest = length - clamped;
  const total = leaves.reduce((s, l) => s + l.w, 0);
  const unit = length / total;
  return leaves.map((l, i) => {
    if (i === index) return { ...l, w: clamped / unit };
    const share = restTotal > 0 ? l.w / restTotal : 1 / others;
    return { ...l, w: (rest * share) / unit };
  });
}

/** Breite eines Flügels in Planeinheiten. */
export function leafWidth(o: Opening, index: number): number {
  const seg = leafSegments(o)[index];
  return seg ? seg.x1 - seg.x0 : 0;
}
