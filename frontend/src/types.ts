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
  /** Seite des Scharniers. */
  hinge?: "left" | "right";
  /** Aufschlagrichtung: auf die positive (`in`) oder negative (`out`) Normalenseite. */
  swing?: "in" | "out";
  /** Fenster: Gesamtkontakt (binary_sensor) für Flügel ohne eigenen Sensor. Tür: Kontakt. */
  entity?: string;
  /** Fenster: 1 bis 4 Flügel nebeneinander; ohne Angabe ein Flügel. */
  leaves?: Leaf[];
  /** Tür: Schloss (lock), optional. */
  lockEntity?: string;
  /** Farbe, solange die Öffnung offen ist. */
  openColor?: string;
  /** Fenster: Rollo innen und/oder außen, höchstens eines je Seite. */
  shutters?: Shutter[];
}

/** Ein Fensterflügel. Breite relativ: Anteil = `w` / Summe aller `w` des Fensters. */
export interface Leaf {
  w: number;
  /** Eigener Sensor (binary_sensor); ohne Wert gilt der Gesamtkontakt des Fensters. */
  entity?: string;
  hinge?: "left" | "right";
}

export type ShutterSide = "in" | "out";

export interface Shutter {
  entity: string;
  side: ShutterSide;
  color?: string;
}

export const MAX_LEAVES = 4;
export const DEFAULT_OPEN_COLOR = "#ef6c00";
export const DEFAULT_SHUTTER_COLOR = "#8d6e63";

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
  /** Lichtschein; ohne Wert automatisch an bei light.*. */
  glow?: boolean | null;
  /** Reichweite des Scheins bei voller Helligkeit, in Planeinheiten. */
  glowRadius?: number;
  /** Farbe des Scheins für Lampen ohne rgb_color. */
  glowColor?: string;
}

export const DEFAULT_GLOW_RADIUS = 150;
export const DEFAULT_GLOW_COLOR = "#ffd9a0";

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

/** Wandelt das Format bis v0.2 (sashes, shutterEntity, Schloss in entity) um. */
export function migrateOpening(raw: Opening): Opening {
  const { sashes, shutterEntity, shutterColor, ...o } = raw as Opening & {
    sashes?: number;
    shutterEntity?: string;
    shutterColor?: string;
  };
  if (o.type === "window" && !o.leaves && (sashes === 1 || sashes === 2)) {
    o.leaves = sashes === 2 ? [{ w: 1, hinge: "left" }, { w: 1, hinge: "right" }] : [{ w: 1 }];
  }
  if (o.type === "window" && shutterEntity && !o.shutters) {
    o.shutters = [{ entity: shutterEntity, side: "out", ...(shutterColor ? { color: shutterColor } : {}) }];
  }
  if (o.type === "door" && o.entity?.startsWith("lock.")) {
    o.lockEntity ??= o.entity;
    delete o.entity;
  }
  return o;
}

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
      openings: (f.openings ?? []).map(migrateOpening),
      areas: (f.areas ?? []).map((a) => ({ ...a, name: a.name ?? "", sidebar: a.sidebar ?? [] })),
      items: f.items ?? [],
    })),
  };
}

/** Kurze, ausreichend eindeutige ID mit lesbarem Präfix. */
export function newId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}
