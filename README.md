# Floorplan Panel für Home Assistant

Eigene Home-Assistant-Integration, die einen **2D-Grundriss** der Wohnung als **eigenes
Sidebar-Panel** anzeigt – kein Dashboard, keine Lovelace-Card.

- Tippen auf einen Raum zoomt auf den Raum und öffnet ein **Popup** mit den
  Geräten, Szenen und Skripten, die diesem Raum **explizit zugeordnet** sind
  (keine automatische Übernahme aller Area-Entitäten).
- Steuerung direkt aus dem Popup (Schalten, Szene/Skript starten, Detaildialog).
- Freie Icon-Platzierung auf dem Grundriss: beliebiges `mdi:`-Icon, Entität optional,
  kein Möbel-/Formkatalog.
- Fenster mit bis zu 4 Flügeln (Breite und optionaler Sensor je Flügel), offen mit
  Öffnungsbogen; Rollos innen und/oder außen (Stellung sichtbar), Farben einstellbar.
- Türen zeigen offen/zu über einen Kontakt; ein Schloss ist separat und optional.
- Lichtschein für Lampen, der an Wänden endet und durch offene Türen fällt; Farbe aus RGB,
  Reichweite und Stärke aus der Helligkeit.
- Visueller Editor im Panel: Wände, Türen, Fenster, Räume, Icons und die Seitenleiste je Raum.
- Speicherung in `.storage/floorplan_panel.plan` (mit Revisionen und Verlauf in
  `.storage/floorplan_panel.history`).
- Mehrere Etagen möglich, aber nicht vorausgesetzt. Keine Annahmen über Haus/Garten/Terrasse.

Struktur und Backend orientieren sich an
[Haus3d-HomeAssistant](https://github.com/tollzockt/Haus3d-HomeAssistant), Optik, Datenmodell
und Zoom-Logik an [easy-floorplan](https://github.com/Vombato/easy-floorplan) – siehe
[NOTICE.md](NOTICE.md).

## Installation

**HACS (benutzerdefiniertes Repository):** HACS → Benutzerdefinierte Repositories →
`https://github.com/Shadowlord31/ha-floorplan-panel`, Typ *Integration* → installieren →
Home Assistant neu starten → *Einstellungen → Geräte & Dienste → Integration hinzufügen →
Floorplan Panel*.

**Manuell:** `custom_components/floorplan_panel` nach `config/custom_components/` kopieren,
neu starten, Integration hinzufügen.

Danach erscheint in der Seitenleiste der Eintrag **Grundriss**. Ist noch nichts gezeichnet,
kann im Panel ein frei erfundener Beispiel-Grundriss geladen werden.

## Dienste

| Dienst | Wirkung |
| --- | --- |
| `floorplan_panel.show_room` | Zoomt im offenen Panel auf einen Raum (`room`: ID oder Name, optional `floor`) und öffnet das Popup |
| `floorplan_panel.reset_view` | Zoomt zurück auf die ganze Etage |

## Entwicklung

Das Frontend liegt als TypeScript/Lit-Quelltext in `frontend/` und wird nach
`custom_components/floorplan_panel/frontend/floorplan-panel.js` gebaut (die gebaute Datei ist
eingecheckt, damit HACS sie direkt ausliefern kann):

```bash
cd frontend
npm install
npm run build      # einmalig
npm run watch      # beim Entwickeln
npm test           # Unit-Tests (Geometrie, Zoom)
```

Backend-Tests (Python 3.14):

```bash
pip install -r requirements_test.txt
pytest -q
```

Datenmodell: siehe [docs/datenmodell.md](docs/datenmodell.md).
