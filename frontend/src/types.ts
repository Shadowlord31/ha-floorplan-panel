/**
 * Raum-Datenmodell für Seitenleiste mit freien Karten (`room-sidebar.ts`).
 * Der Grundriss selbst liegt als Karten-Konfiguration des Ports unter `plan.ef`.
 */

export interface Point {
  x: number;
  y: number;
}

export const AREA_TYPES = [
  ["room", "Zimmer"],
  ["balcony", "Balkon"],
  ["hallway", "Flur"],
  ["staircase", "Treppenhaus"],
  ["bathroom", "Bad"],
  ["custom", "Eigene Bezeichnung"],
] as const;
export type AreaType = (typeof AREA_TYPES)[number][0];

/** Ein Raum: geschlossenes Polygon mit eigener Seitenleiste. */
export interface Area {
  id: string;
  name: string;
  points: Point[];
  type?: AreaType;
  typeLabel?: string;
  /** Lovelace-Karten der Raum-Seitenleiste. */
  cards: Record<string, unknown>[];
}
