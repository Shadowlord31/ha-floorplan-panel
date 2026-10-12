/**
 * Raum-Datenmodell für Raum-Popup und Seitenleiste (`room-dialog.ts`, `room-sidebar.ts`).
 * Der Grundriss selbst liegt als Karten-Konfiguration des Ports unter `plan.ef`.
 */

export interface Point {
  x: number;
  y: number;
}

/** Ein Eintrag der Raum-Seitenleiste: Entität, Szene oder Skript. */
export interface SidebarEntry {
  entity: string;
  /** Anzeigename; ohne Wert der friendly_name der Entität. */
  name?: string;
  /** Icon-Überschreibung; ohne Wert das Icon der Entität. */
  icon?: string;
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
  sidebar: SidebarEntry[];
}
