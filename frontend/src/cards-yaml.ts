import { load } from "js-yaml";

export type CardConfig = Record<string, unknown>;

/** Kartenliste aus YAML: nackte Liste oder Ansichts-Objekt mit `cards:`. */
export function parseCardsYaml(text: string): CardConfig[] {
  const data = load(text);
  const list = Array.isArray(data) ? data : (data as { cards?: unknown } | null)?.cards;
  if (!Array.isArray(list)) throw new Error("Erwartet wird eine Kartenliste oder eine Ansichts-Konfiguration mit `cards:`.");
  list.forEach((c, i) => {
    if (!c || typeof c !== "object" || Array.isArray(c) || !(c as CardConfig).type)
      throw new Error(`Karte ${i + 1} hat kein \`type:\`.`);
  });
  return list as CardConfig[];
}
