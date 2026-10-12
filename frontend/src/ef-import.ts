import { load } from "js-yaml";

export const EF_CARD_TYPE = "custom:fp-ef-card";

export interface EfImport {
  config: Record<string, unknown>;
  summary: { floors: number; walls: number; openings: number; items: number; texts: number };
}

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => !!v && typeof v === "object" && !Array.isArray(v);
const looksLikePlan = (o: Obj): boolean =>
  Array.isArray(o.floors) || ["walls", "openings", "items", "texts"].some((k) => Array.isArray(o[k]));

function findCard(node: unknown, depth = 0): Obj | undefined {
  if (depth > 6) return undefined;
  if (isObj(node)) {
    if (typeof node.type === "string" && /easy-floorplan/.test(node.type) && looksLikePlan(node)) return node;
    for (const v of Object.values(node)) {
      const hit = findCard(v, depth + 1);
      if (hit) return hit;
    }
  } else if (Array.isArray(node)) {
    for (const v of node) {
      const hit = findCard(v, depth + 1);
      if (hit) return hit;
    }
  }
  return undefined;
}

const count = (v: unknown): number => (Array.isArray(v) ? v.length : 0);

/** Einmaliger Import: YAML/JSON einer easy-floorplan-Karte -> `plan.ef`-Konfiguration (nur lesend). */
export function parseEfImport(text: string): EfImport {
  let doc: unknown;
  try {
    doc = load(text);
  } catch (err) {
    throw new Error(`Kein gültiges YAML/JSON: ${(err as Error).message.split("\n")[0]}`);
  }
  const src = isObj(doc) && looksLikePlan(doc) ? doc : findCard(doc);
  if (!src) throw new Error("Keine easy-floorplan-Konfiguration gefunden (erwartet: floors, walls, openings …).");
  const config = structuredClone({ ...src, type: EF_CARD_TYPE }) as Obj;
  const floors = Array.isArray(config.floors) ? (config.floors as Obj[]) : [];
  const sum = (key: string) => count(config[key]) + floors.reduce((n, f) => n + count(isObj(f) ? f[key] : 0), 0);
  return {
    config,
    summary: {
      floors: floors.length || 1,
      walls: sum("walls"),
      openings: sum("openings"),
      items: sum("items"),
      texts: sum("texts"),
    },
  };
}
