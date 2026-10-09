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

Voraussetzung: Home Assistant 2024.7 oder neuer.

### Über HACS (empfohlen)

1. In Home Assistant **HACS** öffnen → Menü (drei Punkte oben rechts) → **Benutzerdefinierte Repositories**.
2. Repository `https://github.com/Shadowlord31/ha-floorplan-panel` eintragen, Typ **Integration**, hinzufügen.
3. **Floorplan Panel** in HACS suchen und **Herunterladen** (neueste Version).
4. Home Assistant **neu starten** (*Einstellungen → System → Neu starten*).
5. *Einstellungen → Geräte & Dienste → Integration hinzufügen → Floorplan Panel* wählen und bestätigen.
6. In der Seitenleiste erscheint der Eintrag **Grundriss**.

### Manuell

1. Den Ordner `custom_components/floorplan_panel` aus diesem Repository nach
   `config/custom_components/floorplan_panel` kopieren.
2. Home Assistant neu starten.
3. Integration wie oben unter Punkt 5 hinzufügen.

### Aktualisieren

In HACS die neue Version herunterladen, Home Assistant **neu starten** und die Seite im
Browser hart neu laden (Strg+F5), damit das neue Panel geladen wird. Der gespeicherte
Grundriss bleibt erhalten.

### Erste Schritte

- Ist noch nichts gezeichnet, bietet das Panel an, einen **Beispiel-Grundriss** zu laden
  (frei erfunden, zum Ausprobieren).
- Mit dem Stift-Symbol oben rechts öffnet sich der **Editor** (nur für Administratoren):
  Wände, Räume, Türen, Fenster und Icons zeichnen, Entitäten zuordnen, speichern.
  Die Zeichenfläche ist unbegrenzt; „Einpassen“ zeigt den ganzen Plan.
- Pro Raum legen Sie fest, welche Geräte, Szenen und Skripte im Popup erscheinen.
- Der Plan wird in `.storage/floorplan_panel.plan` gespeichert und ist Teil Ihres
  Home-Assistant-Backups.

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
