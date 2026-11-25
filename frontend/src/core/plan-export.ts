import { planEntitaeten, planIcons } from "./planinfo";

export const EXPORT_FORMAT = "fp-export";
export const MAX_IMPORT_BYTES = 2 * 1024 * 1024;

type Obj = Record<string, unknown>;
export type IconLeser = (name: string) => Promise<string | undefined>;

export interface PlanExport {
  format: typeof EXPORT_FORMAT;
  version: 1;
  erstellt: string;
  plan: { version: number; ef: Obj; settings: Obj };
  icons: Record<string, string>;
  entities: string[];
}

/** Liest den SVG-Pfad eines Symbols aus dem `ha-icon` der laufenden Home-Assistant-Oberfläche. */
export const haIconLeser: IconLeser = async (name) => {
  const el = document.createElement("ha-icon") as HTMLElement & { icon: string };
  el.style.cssText = "position:fixed;left:-9999px;width:24px;height:24px;visibility:hidden";
  el.icon = name;
  document.body.append(el);
  try {
    for (let i = 0; i < 20; i++) {
      const d = tiefenSuche(el);
      if (d) return d;
      await new Promise((r) => setTimeout(r, 100));
    }
    return undefined;
  } finally {
    el.remove();
  }
};

function tiefenSuche(wurzel: Element): string | undefined {
  const p = wurzel.shadowRoot?.querySelector("path[d]") ?? wurzel.querySelector("path[d]");
  if (p) return p.getAttribute("d") ?? undefined;
  for (const kind of [...(wurzel.shadowRoot?.children ?? []), ...wurzel.children]) {
    const d = tiefenSuche(kind);
    if (d) return d;
  }
  return undefined;
}

/** Der Plan wird unverändert exportiert; dazu kommen Pfad-Tabelle der verwendeten Symbole und Entitätsliste. */
export async function baueExport(plan: Obj, leser: IconLeser = haIconLeser, jetzt: Date = new Date()): Promise<PlanExport> {
  const ef = (plan.ef ?? {}) as Obj;
  const icons: Record<string, string> = {};
  for (const name of planIcons(ef)) {
    const d = await leser(name);
    if (d) icons[name] = d;
  }
  return {
    format: EXPORT_FORMAT,
    version: 1,
    erstellt: jetzt.toISOString(),
    plan: { version: typeof plan.version === "number" ? plan.version : 1, ef, settings: (plan.settings ?? {}) as Obj },
    icons,
    entities: planEntitaeten(ef),
  };
}

/** Prüft eine Exportdatei; wirft eine lesbare Meldung. */
export function parseExport(text: string, bytes: number = new TextEncoder().encode(text).length): PlanExport {
  if (bytes > MAX_IMPORT_BYTES) throw new Error(`Die Datei ist zu groß (${(bytes / 1048576).toFixed(1)} MB, erlaubt sind 2 MB).`);
  let doc: unknown;
  try {
    doc = JSON.parse(text);
  } catch {
    throw new Error("Keine gültige JSON-Datei.");
  }
  const d = doc as Partial<PlanExport> | null;
  if (!d || d.format !== EXPORT_FORMAT) throw new Error("Das ist keine Plan-Exportdatei (format „fp-export“ erwartet).");
  if (d.version !== 1) throw new Error(`Exportversion ${String(d.version)} wird nicht unterstützt.`);
  if (!d.plan || typeof d.plan !== "object" || !d.plan.ef || typeof d.plan.ef !== "object") throw new Error("Die Exportdatei enthält keinen Plan.");
  return d as PlanExport;
}
