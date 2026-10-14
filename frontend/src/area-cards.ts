/**
 * Einmalige Migration: Räume mit altem `sidebar` (Entitätsliste) und ohne `cards` bekommen eine
 * `entities`-Karte mit denselben Entitäten in derselben Reihenfolge, Titel = Raumname.
 */
type Raw = Record<string, any>;

export function migrateArea<T extends Raw>(area: T): T {
  if (!area || !("sidebar" in area)) return area;
  const { sidebar, ...rest } = area;
  if (Array.isArray(rest.cards)) return rest as T;
  const entities = (Array.isArray(sidebar) ? sidebar : [])
    .filter((e: Raw) => e && typeof e.entity === "string")
    .map((e: Raw) => {
      const o: Raw = { entity: e.entity };
      if (e.name) o.name = e.name;
      if (e.icon) o.icon = e.icon;
      return o;
    });
  if (!entities.length) return rest as T;
  return { ...rest, cards: [{ type: "entities", title: rest.name ?? rest.id, entities }] } as unknown as T;
}

export function migrateEfCards<T extends Raw>(ef: T): T {
  if (!ef || typeof ef !== "object") return ef;
  const out: Raw = { ...ef };
  if (Array.isArray(ef.areas)) out.areas = ef.areas.map(migrateArea);
  if (Array.isArray(ef.floors))
    out.floors = ef.floors.map((f: Raw) => (Array.isArray(f?.areas) ? { ...f, areas: f.areas.map(migrateArea) } : f));
  return out as T;
}
