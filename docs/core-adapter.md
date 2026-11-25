# floorplan-core: Kern ohne Home Assistant

`floorplan-core.js` ist ein zweiter Build des Panels: ein einziges ES-Modul (Karte, Renderer, Möbel), ohne Editor und ohne Nachladen. Die Hülle (z. B. der Jarvis-Hub) liefert Zustände und Aktionen über einen **Adapter**.

## Version und Release

Schema `core-v<MAJOR>.<MINOR>.<PATCH>`, z. B. `core-v1.0.0`. Die Version steht in `frontend/src/core/version.ts` (`KERN_VERSION`).
Ein Tag `core-v*` löst den Workflow `core-release.yml` aus. Das Release enthält `floorplan-core.js`, `floorplan-core.js.sha256` und `LICENSES.txt`.
Die gebauten Dateien liegen zusätzlich eingecheckt in `core-dist/`.
Der Workflow-Text liegt als Kopie in `docs/workflows/core-release.yml` und gehört nach `.github/workflows/core-release.yml`.

## Adapter-Vertrag

```ts
interface Adapter {
  zustand(entity_id: string): { state: string; attributes?: Record<string, unknown> } | undefined;
  abonnieren(entity_ids: string[], rueckruf: (entity_id: string) => void): () => void; // gibt "abmelden" zurück
  aktion(entity_id: string, aktion: "toggle" | "an" | "aus"): void | Promise<void>;
  plan_laden(): unknown | Promise<unknown>;   // Exportdatei, {ef} oder die Karten-Konfiguration
  plan_speichern(plan: unknown): void | Promise<void>; // im Kern-Betrieb ungenutzt
  icon(name: string): string | undefined;      // SVG-Pfad (24x24) zu "mdi:…", sonst undefined → neutraler Kreis
  name(entity_id: string): string;
}
```

Einstieg des Moduls:

- `erzeugeHass(adapter, entity_ids)` liefert das hass-kompatible Objekt (`states`, `callService`, `localize`, Themenwerte).
- `zeigePlan(container, adapter, optionen?, plan?)` baut die Karte in `container` auf und liefert `{ karte, neuLaden, setzeOptionen, trennen }`.
- Das Modul registriert `fp-ef-card` sowie `ha-card` und `ha-icon`, **nur wenn der Name noch frei ist** (`customElements.get`).

`callService` im Kern-Hass ruft ausschließlich `adapter.aktion` auf: `toggle`, `turn_on` und `turn_off` werden zu `toggle`, `an` und `aus`. Jeder andere Service wird ignoriert und einmal in der Konsole gemeldet. Der Kern macht keine Netzwerkzugriffe.

## Icons

Die Exportdatei enthält `icons: { "mdi:lightbulb": "<SVG-Pfad>" }` für alle im Plan verwendeten Symbole. Die Hülle gibt sie über `adapter.icon` zurück. Fehlt ein Pfad, zeichnet `ha-icon` einen neutralen Kreis. Die Pfade stammen aus Material Design Icons (Apache-2.0).

## Optionen (`optionen`)

| Option | Werte | Standard | Wirkung |
|---|---|---|---|
| `wandverdeckung` | `true` / `false` | `true` | `false`: Lichtschein wird nicht von Wänden begrenzt (keine `clipPath`) |
| `schein` | `"voll"` / `"einfach"` / `"aus"` | `"voll"` | `einfach`: Verlauf ohne Mischmodus, `aus`: nur Symbolfarbe |
| `buendeln_ms` | Zahl ≥ 0 | `0` | Änderungen mehrerer Entitäten in einem Zeichenvorgang bündeln |

Ohne Angabe gilt das Verhalten des HA-Panels. Mit `ansicht.setzeOptionen(...)` lassen sich Optionen ohne Neuaufbau ändern.

## Exportformat (`fp-export`)

```json
{ "format": "fp-export", "version": 1, "erstellt": "2026-11-25T10:00:00.000Z",
  "plan": { "version": 1, "ef": {}, "settings": {} },
  "icons": { "mdi:lightbulb": "M12,2A7,7…" },
  "entities": ["light.beispiel"] }
```

Der Plan wird unverändert exportiert, auch Aktionen. Die Hülle bereinigt selbst. Das Panel lehnt beim Import Dateien über 2 MB ab.

## CSS-Variablen (Hülle setzt, Rückfallwerte sind vorhanden)

| Variable | Standardwert |
|---|---|
| `--primary-text-color` | `#212121` |
| `--card-background-color` | `#fff` |
| `--ha-card-background` | `var(--card-background-color, #fff)` |
| `--ha-card-border-radius` | `12px` |
| `--ha-card-header-color` | `var(--primary-text-color)` |
| `--primary-color` | `#03a9f4` |
| `--divider-color` | `#ccc` |
| `--text-primary-color` | `#212121` (Schrift auf Akzent) |
| `--error-color` | `#db4437` |
| `--state-light-active-color` | `var(--state-active-color, #fdd835)` |
| `--mdc-icon-size` | `24px` |
| `--fp-skin-accent` | `var(--primary-color, #03a9f4)` |
| `--fp-skin-accent-ink` | `var(--text-primary-color, #fff)` |
| `--fp-skin-active-ink` | `var(--text-primary-color, #212121)` |
| `--fp-skin-text` | `var(--primary-text-color)` |
| `--fp-skin-bg` | `var(--card-background-color, #fff)` |
| `--fp-skin-paper` | `var(--card-background-color, #fff)` |
| `--fp-skin-wall` | `var(--primary-text-color, #212121)` |
| `--fp-skin-wall-width` | `8` |
| `--fp-skin-wall-filter` | `none` |
| `--fp-skin-badge-bg` | `var(--card-background-color, #fff)` |
| `--fp-skin-badge-border` | `var(--divider-color, #ccc)` |
| `--fp-skin-badge-border-width` | `1.5px` |
| `--fp-skin-badge-radius` | `50%` |
| `--fp-skin-badge-shadow` | `0 1px 3px rgba(0, 0, 0, 0.2)` |
| `--fp-skin-sunlight` | `#ffd9a0` |
| `--fp-skin-sunshade` | `#000` |
| `--fp-offline-mark` | `var(--error-color, #db4437)` |
| `--fp-tracker-ring-max` | `60px` |
| `--fp-ink` | `var(--text-primary-color, #212121)` |

Variablen ohne Rückfallwert (`--fp-u`, `--fp-inv-zoom`, `--fp-plan-w`, `--fp-ripple-*`, `--fp-state`, `--fp-inactive`) setzt die Karte selbst.

## Bauanleitung

```bash
cd frontend
npm ci
npm run build:core   # schreibt ../core-dist/floorplan-core.js, .sha256 und LICENSES.txt
npm run test:core    # baut und prüft im headless Chromium (Playwright nötig, Screenshot nach docs/core/core-test.png)
```

Der Build bricht ab, wenn `floorplan-core.js` größer als 300 KB wird, wenn mehr als eine Datei entsteht oder wenn Editor-Code im Bundle landet.
`test:core` braucht `playwright-core` und einen Chromium (Umgebungsvariablen `PW_MODULE`, `CHROMIUM_PATH`).
