/**
 * Datenmodell des Grundrisses – Spiegel von `custom_components/floorplan_panel/schema.py`.
 *
 * Angelehnt an easy-floorplan (`types.ts`, MIT), aber bewusst schlanker: keine Möbel,
 * keine Tracker, dafür pro Raum eine explizit gepflegte Seitenleiste (`sidebar`).
 * Koordinaten sind virtuelle Einheiten (empfohlen: Zentimeter).
 */

export interface Point {
  x: number;
  y: number;
}

export interface Wall {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** Stärke in Einheiten; ohne Wert gilt `settings.wallThickness`. */
  thickness?: number;
}

export type OpeningType = "door" | "window";

/** Tür oder Fenster, über Mittelpunkt, Länge und Drehung platziert (meist auf einer Wand). */
export interface Opening {
  id: string;
  type: OpeningType;
  x: number;
  y: number;
  length: number;
  /** Drehung in Grad; 0 = parallel zur x-Achse. */
  angle: number;
  /** Seite des Scharniers (nur Türen). */
  hinge?: "left" | "right";
  /** Aufschlagrichtung: auf die positive (`in`) oder negative (`out`) Normalenseite. */
  swing?: "in" | "out";
  /** Optional: Kontakt (binary_sensor) oder Rollo (cover); „offen“ wird hervorgehoben. */
  entity?: string;
}

/** Ein Eintrag der Raum-Seitenleiste: Entität, Szene oder Skript. */
export interface SidebarEntry {
  entity: string;
  /** Anzeigename; ohne Wert der friendly_name der Entität. */
  name?: string;
  /** Icon-Überschreibung; ohne Wert das Icon der Entität. */
  icon?: string;
}

/** Ein Raum: geschlossenes Polygon mit eigener Seitenleiste. */
export interface Area {
  id: string;
  name: string;
  points: Point[];
  showName?: boolean;
  color?: string;
  opacity?: number;
  /** Nur Bezug/Namensvorschlag – es werden keine Entitäten automatisch übernommen. */
  haArea?: string | null;
  /** Entität, die den Raum einfärbt, solange sie aktiv ist (z. B. Präsenz). */
  entity?: string;
  activeColor?: string;
  /** Zoomfaktor beim Antippen (1–10); ohne Wert wird der Raum eingepasst. */
  zoom?: number | null;
  sidebar: SidebarEntry[];
}

export type TapAction = "auto" | "toggle" | "more-info" | "none";

/** Frei platziertes Icon – beliebiges mdi-Icon, Entität optional, keine Formvorgabe. */
export interface FloorItem {
  id: string;
  x: number;
  y: number;
  icon?: string;
  entity?: string;
  label?: string;
  showState?: boolean;
  /** Durchmesser in Pixeln (bei ungezoomter Ansicht). */
  size?: number;
  color?: string;
  activeColor?: string;
  tapAction?: TapAction;
  /** Nur zeigen, solange der eigene Raum gezoomt ist. */
  showOnlyWhenZoomed?: boolean;
  /** Raum-ID, falls das Icon außerhalb seines Raum-Polygons liegt. */
  area?: string | null;
}

export interface Floor {
  id: string;
  name: string;
  haFloor?: string | null;
  walls: Wall[];
  openings: Opening[];
  areas: Area[];
  items: FloorItem[];
}

export interface PlanSettings {
  wallThickness: number;
  grid: number;
}

export interface Plan {
  version: number;
  canvas: { width: number; height: number };
  settings: PlanSettings;
  floors: Floor[];
}

export const DEFAULT_SETTINGS: PlanSettings = { wallThickness: 12, grid: 10 };

/** Ergänzt fehlende Felder, damit Frontend-Code nicht überall prüfen muss. */
export function normalizePlan(raw: Partial<Plan> | undefined): Plan {
  const plan = raw ?? {};
  return {
    version: plan.version ?? 1,
    canvas: plan.canvas ?? { width: 1000, height: 700 },
    settings: { ...DEFAULT_SETTINGS, ...(plan.settings ?? {}) },
    floors: (plan.floors ?? []).map((f) => ({
      ...f,
      name: f.name ?? "",
      walls: f.walls ?? [],
      openings: f.openings ?? [],
      areas: (f.areas ?? []).map((a) => ({ ...a, name: a.name ?? "", sidebar: a.sidebar ?? [] })),
      items: f.items ?? [],
    })),
  };
}

/** Kurze, ausreichend eindeutige ID mit lesbarem Präfix. */
export function newId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}
