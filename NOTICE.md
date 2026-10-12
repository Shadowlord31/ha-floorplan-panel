# Drittanbieter-Hinweise

## easy-floorplan (Quellcode-Port)

Teile der Frontend-Quellen stammen aus **easy-floorplan**
(https://github.com/Vombato/easy-floorplan, Paket `easy-floorplan-card`),
Copyright (c) 2026 Nicolas Sandller, MIT-Lizenz.

- Ursprung: Version 0.7.2, Commit `e9178c9401a359410efcc7d88f9fee81615db149`
- Übernommen nach `frontend/src/ef/` (ohne Tests):
  `floorplan-card.ts`, `editor.ts`, `editor-forms.ts`, `editor-geometry.ts`, `editor-save.ts`,
  `render.ts`, `symbols.ts`, `types.ts`, `palette.ts`, `skins.ts`, `css-safe.ts`, `dead-space.ts`,
  `actions.ts`, `action-handler.ts`, `frame-coalescer.ts` und `replay-history/*`.
- Übernommen nach `frontend/src/ef-furniture/`: die komplette Symbolbibliothek `*.json` samt README.
- Anpassungen gegenüber dem Original (Stand der Übernahme): die Custom Elements heißen
  `fp-ef-card` / `fp-ef-editor` / `action-handler-fp-ef` (kein Konflikt mit einer installierten
  Original-Karte); der Glob-Pfad der Symbole in `symbols.ts` zeigt auf `../ef-furniture/*.json`.
  Weitere Anpassungen (Adapter zum Panel, Speichern über WebSocket) sind im jeweiligen
  Dateikopf bzw. in `frontend/src/ef-adapter.ts` vermerkt.

## Haus3d-HomeAssistant

Copyright (c) 2026 tollzockt, MIT-Lizenz, https://github.com/tollzockt/Haus3d-HomeAssistant
Übernommen: Aufbau der Integration (Panel-Registrierung, versionierter statischer Pfad,
Speicherung in `.storage` mit Revisionszähler und Verlauf, WebSocket-API).

## MIT-Lizenztext (easy-floorplan)

MIT License

Copyright (c) 2026 Nicolas Sandller

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Eigene Erweiterungen in den übernommenen Dateien (v0.15.0)

In `frontend/src/ef/editor.ts` und `types.ts` sind folgende Zusätze mit dem Kommentar `floorplan-panel` markiert: Vorlagen (`config.templates`), Ausrichtungslinien (`_alignedSnap`) und Kontextmenü (`_renderContextMenu`).

## Eigene Erweiterungen (v0.16.0)

Drei und vier Flügel für Fenster/Türen (`sash: "triple" | "quad"`, `extraEntities`) in `frontend/src/ef/types.ts`, `render.ts`, `floorplan-card.ts`, `editor-forms.ts` und `editor.ts`, jeweils mit dem Kommentar `floorplan-panel` markiert.

Ab v0.17.0 zusätzlich: Anschlag je Flügel (`leafHinges`) in `types.ts`, `render.ts`, `editor-forms.ts`, `editor.ts` (markiert mit `floorplan-panel`).

Ab v0.18.0 zusätzlich: Panel-Modus des Editors (`panelMode`, `panelError`, Ereignis `ef-done`; immer Vollbild, "Fertig" statt "Expand") in `frontend/src/ef/editor.ts` (markiert mit `floorplan-panel`).

Ab v0.19.0 zusätzlich: einmaliger Import einer bestehenden easy-floorplan-Konfiguration (`frontend/src/ef-import.ts`, Dialog in `ef-adapter.ts`, Knopf „Import“ im Panel-Modus des Editors). Neue Abhängigkeit: js-yaml (MIT).

Ab v0.20.0 zusätzlich: Dienste `show_room`/`reset_view` als `showRoom()`/`resetView()` an `fp-ef-card` (`frontend/src/ef/floorplan-card.ts`, markiert mit `floorplan-panel`). Der frühere eigene Editor/Renderer (Möbel-Bibliothek, SVG-Import, eigene Öffnungs-/Lichtlogik) wurde entfernt; `ef-furniture/*` und `ef/symbols.ts` ersetzen ihn.
