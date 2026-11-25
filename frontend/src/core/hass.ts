import type { Adapter, Aktion } from "./adapter";

export interface KernState {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
  context: { id: string; parent_id: null; user_id: null };
}

export interface KernHass {
  states: Record<string, KernState>;
  entities: Record<string, { icon?: string }>;
  language: string;
  locale: { language: string; number_format: string; time_format: string };
  themes: { darkMode: boolean };
  user: undefined;
  connection: Record<string, never>;
  localize(key: string): string;
  formatEntityState(s: { state: string; attributes?: Record<string, unknown> }): string;
  formatEntityAttributeValue(s: { attributes?: Record<string, unknown> }, attribute: string): string;
  callService(domain: string, service: string, data?: { entity_id?: string | string[] }, target?: { entity_id?: string | string[] }): Promise<void>;
  callWS(): Promise<never>;
}

const WORTE: Record<string, string> = {
  on: "An", off: "Aus", unavailable: "Nicht verfügbar", unknown: "Unbekannt",
  open: "Offen", closed: "Geschlossen", locked: "Verriegelt", unlocked: "Entriegelt",
  home: "Zuhause", not_home: "Abwesend", playing: "Wiedergabe", paused: "Pause", idle: "Bereit",
};

// Stabile Funktionsidentität: die Karte rendert neu, sobald sich eine Formatfunktion ändert.
function formatEntityState(s: { state: string; attributes?: Record<string, unknown> }): string {
  const einheit = s.attributes?.unit_of_measurement;
  return WORTE[s.state] ?? (typeof einheit === "string" && einheit ? `${s.state} ${einheit}` : s.state);
}

function formatEntityAttributeValue(s: { attributes?: Record<string, unknown> }, attribute: string): string {
  const v = s.attributes?.[attribute];
  return v === undefined || v === null ? "" : String(v);
}

const localize = (key: string): string => key;

let iconQuelle: (name: string) => string | undefined = () => undefined;
export const icon = (name: string): string | undefined => iconQuelle(name);

const MELDUNGEN = new Set<string>();
function einmalMelden(text: string): void {
  if (MELDUNGEN.has(text)) return;
  MELDUNGEN.add(text);
  console.warn(`[floorplan-core] ${text}`);
}

const AKTIONEN: Record<string, Aktion> = { toggle: "toggle", turn_on: "an", turn_off: "aus" };

function zustandsObjekt(adapter: Adapter, id: string, vorher?: KernState): KernState {
  const z = adapter.zustand(id);
  const state = z?.state ?? "unavailable";
  const attributes: Record<string, unknown> = { ...z?.attributes };
  if (attributes.friendly_name === undefined) attributes.friendly_name = adapter.name(id) ?? id;
  if (vorher && vorher.state === state && sameAttributes(vorher.attributes, attributes)) return vorher;
  return { entity_id: id, state, attributes, last_changed: "", last_updated: "", context: { id: "", parent_id: null, user_id: null } };
}

function sameAttributes(a: Record<string, unknown>, b: Record<string, unknown>): boolean {
  const ka = Object.keys(a);
  if (ka.length !== Object.keys(b).length) return false;
  return ka.every((k) => k in b && JSON.stringify(a[k]) === JSON.stringify(b[k]));
}

/**
 * Baut das hass-kompatible Objekt aus dem Adapter. Mit `vorher` und `geaendert` werden nur die
 * geänderten Entitäten neu gelesen; unveränderte Zustände behalten ihre Objektidentität.
 */
export function erzeugeHass(adapter: Adapter, entity_ids: Iterable<string> = [], vorher?: KernHass, geaendert?: Iterable<string>): KernHass {
  iconQuelle = (name) => adapter.icon(name);
  const states: Record<string, KernState> = { ...(vorher?.states ?? {}) };
  const ids = geaendert && vorher ? geaendert : entity_ids;
  for (const id of ids) states[id] = zustandsObjekt(adapter, id, states[id]);
  return {
    states,
    entities: vorher?.entities ?? {},
    language: "de",
    locale: { language: "de", number_format: "language", time_format: "24" },
    themes: { darkMode: false },
    user: undefined,
    connection: {},
    localize,
    formatEntityState,
    formatEntityAttributeValue,
    async callService(domain, service, data, target) {
      const aktion = AKTIONEN[service];
      if (!aktion) return einmalMelden(`Dienst ${domain}.${service} wird im Kern ignoriert.`);
      const ids = ([] as string[]).concat(data?.entity_id ?? target?.entity_id ?? []);
      for (const id of ids) await adapter.aktion(id, aktion);
    },
    callWS: () => Promise.reject(new Error("Im Kern nicht verfügbar")),
  };
}
