export type Aktion = "toggle" | "an" | "aus";

export interface Zustand {
  state: string;
  attributes?: Record<string, unknown>;
}

/** Vertrag zwischen Kern und Hülle (siehe docs/core-adapter.md). */
export interface Adapter {
  zustand(entity_id: string): Zustand | undefined;
  /** Meldet Änderungen per `rueckruf(entity_id)`; liefert die Abmeldefunktion. */
  abonnieren(entity_ids: string[], rueckruf: (entity_id: string) => void): () => void;
  aktion(entity_id: string, aktion: Aktion): void | Promise<void>;
  plan_laden(): unknown | Promise<unknown>;
  /** Im Kern-Betrieb unbenutzt. */
  plan_speichern(plan: unknown): void | Promise<void>;
  /** SVG-Pfad (`d`) eines Symbols wie `mdi:lightbulb`. */
  icon(name: string): string | undefined;
  name(entity_id: string): string | undefined;
}
