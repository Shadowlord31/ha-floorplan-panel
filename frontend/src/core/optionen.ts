/** Kiosk-Optionen des Kerns. Ohne Angabe gilt das bisherige Verhalten. */
export interface KernOptionen {
  /** Lichtschein wird von Wänden begrenzt (clipPath). Standard: true. */
  wandverdeckung?: boolean;
  /** `voll` = wie bisher, `einfach` = ein Verlauf ohne Mischmodus, `aus` = nur Symbolfarbe. */
  schein?: "voll" | "einfach" | "aus";
  /** Änderungen mehrerer Entitäten in einem Zeichenvorgang bündeln. Standard 0 = sofort. */
  buendeln_ms?: number;
}

export function normalisiereOptionen(o?: KernOptionen): Required<KernOptionen> {
  const schein = o?.schein === "einfach" || o?.schein === "aus" ? o.schein : "voll";
  const ms = Number(o?.buendeln_ms);
  return {
    wandverdeckung: o?.wandverdeckung !== false,
    schein,
    buendeln_ms: Number.isFinite(ms) && ms > 0 ? ms : 0,
  };
}
