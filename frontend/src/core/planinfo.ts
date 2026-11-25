import { collectWatchedEntities, resolveItemIcon } from "../ef/render";

type Obj = Record<string, unknown>;
const ENTITY_ID = /^[a-z_]+\.[a-z0-9_]+$/;
const ICON_NAME = /^mdi:[a-z0-9-]+$/;
const ENTITY_KEY = /entit(y|ies|y_id)$/i;

// Symbole, die die Karte für Öffnungen und Bedienelemente selbst wählt.
const OEFFNUNGS_ICONS = [
  "mdi:door-open", "mdi:door-closed", "mdi:window-open", "mdi:window-closed",
  "mdi:window-shutter", "mdi:window-shutter-open", "mdi:lock", "mdi:lock-open",
];

function walk(node: unknown, besuche: (key: string, v: unknown) => void, tiefe = 0): void {
  if (tiefe > 24 || !node || typeof node !== "object") return;
  if (Array.isArray(node)) return node.forEach((v) => walk(v, besuche, tiefe + 1));
  for (const [k, v] of Object.entries(node as Obj)) {
    besuche(k, v);
    walk(v, besuche, tiefe + 1);
  }
}

/** Alle im Plan referenzierten Entitäts-IDs (sortiert, ohne Doppelte). */
export function planEntitaeten(ef: Obj): string[] {
  const ids = new Set<string>(collectWatchedEntities(ef as never));
  walk(ef, (k, v) => {
    if (!ENTITY_KEY.test(k)) return;
    for (const x of ([] as unknown[]).concat(v)) if (typeof x === "string" && ENTITY_ID.test(x)) ids.add(x);
  });
  return [...ids].sort();
}

/** Alle Symbole, die der Plan zeichnen kann: feste Angaben im Plan plus die Standardwahl der Karte je Gerät. */
export function planIcons(ef: Obj): string[] {
  const namen = new Set<string>();
  walk(ef, (_k, v) => {
    if (typeof v === "string" && ICON_NAME.test(v)) namen.add(v);
  });
  const floors = (Array.isArray(ef.floors) ? ef.floors : [ef]) as Obj[];
  for (const f of floors) {
    for (const item of (Array.isArray(f.items) ? f.items : []) as Obj[]) {
      for (const st of [undefined, { state: "on", attributes: {} }, { state: "off", attributes: {} }]) {
        namen.add(resolveItemIcon(item as never, st));
      }
    }
    if (Array.isArray(f.openings) && f.openings.length) OEFFNUNGS_ICONS.forEach((n) => namen.add(n));
  }
  return [...namen].filter((n) => ICON_NAME.test(n)).sort();
}
