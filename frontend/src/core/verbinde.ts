import { collectWatchedEntities } from "../ef/render";
import type { Adapter } from "./adapter";
import { erzeugeHass, type KernHass } from "./hass";
import { normalisiereOptionen, type KernOptionen } from "./optionen";

type Obj = Record<string, unknown>;

export interface KernAnsicht {
  karte: HTMLElement;
  /** Liest den Plan neu aus dem Adapter (oder aus dem übergebenen Plan) und zeichnet neu. */
  neuLaden(plan?: unknown): Promise<void>;
  setzeOptionen(optionen?: KernOptionen): void;
  trennen(): void;
}

/** Akzeptiert die Exportdatei, `{ ef }` oder die Karten-Konfiguration selbst. */
export function efAusPlan(plan: unknown): Obj {
  const p = (plan ?? {}) as Obj;
  const ef = (p.format === "fp-export" ? (p.plan as Obj | undefined)?.ef : p.ef ?? p) as Obj | undefined;
  // Verlaufs-Wiedergabe gehört nicht in den Kern.
  return { type: "custom:fp-ef-card", ...ef, historyReplay: undefined };
}

/** Hängt die Plan-Karte in `container` und hält sie über den Adapter aktuell. */
export async function zeigePlan(container: HTMLElement, adapter: Adapter, optionen?: KernOptionen, plan?: unknown): Promise<KernAnsicht> {
  const karte = document.createElement("fp-ef-card") as HTMLElement & { hass?: KernHass; optionen?: KernOptionen; setConfig(c: unknown): void };
  let opt = normalisiereOptionen(optionen);
  let hass: KernHass | undefined;
  let abmelden: (() => void) | undefined;
  let geaendert = new Set<string>();
  let timer: ReturnType<typeof setTimeout> | undefined;

  const zeichnen = (): void => {
    timer = undefined;
    if (!hass) return;
    hass = erzeugeHass(adapter, [], hass, geaendert);
    geaendert = new Set();
    karte.hass = hass;
  };
  const gemeldet = (id: string): void => {
    geaendert.add(id);
    if (opt.buendeln_ms <= 0) return zeichnen();
    timer ??= setTimeout(zeichnen, opt.buendeln_ms);
  };

  const neuLaden = async (neuerPlan?: unknown): Promise<void> => {
    abmelden?.();
    clearTimeout(timer);
    timer = undefined;
    geaendert = new Set();
    const rohplan = neuerPlan ?? (await adapter.plan_laden());
    const ef = efAusPlan(rohplan);
    const ids = new Set<string>(collectWatchedEntities(ef as never));
    for (const id of ((rohplan as Obj)?.entities as string[] | undefined) ?? []) ids.add(id);
    karte.setConfig(ef);
    hass = erzeugeHass(adapter, ids);
    karte.hass = hass;
    abmelden = adapter.abonnieren([...ids], gemeldet);
  };

  karte.optionen = opt;
  container.append(karte);
  await neuLaden(plan);
  return {
    karte,
    neuLaden,
    setzeOptionen(o) {
      opt = normalisiereOptionen(o);
      karte.optionen = opt;
    },
    trennen() {
      abmelden?.();
      clearTimeout(timer);
      karte.remove();
    },
  };
}
