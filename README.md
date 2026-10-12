# Floorplan Panel für Home Assistant

Eigene Home-Assistant-Integration, die einen **2D-Grundriss** der Wohnung als **eigenes
Sidebar-Panel** anzeigt – kein Dashboard, keine Lovelace-Card.

Der Grundriss wird vom Quellcode-Port von
[easy-floorplan](https://github.com/Vombato/easy-floorplan) gezeichnet und bearbeitet
(Wände, Türen, Fenster mit bis zu 4 Flügeln und Anschlag je Flügel, Rollos, Räume,
Geräte-Icons, Möbelsymbole, Lichtschein, mehrere Etagen, Zoom auf den Raum). Ergänzt um:

- Tippen auf einen Raum zoomt auf den Raum und öffnet ein **Popup** mit den
  Geräten, Szenen und Skripten, die diesem Raum **explizit zugeordnet** sind
  (keine automatische Übernahme aller Area-Entitäten); Steuerung direkt aus dem Popup.
- Raumarten (Zimmer, Balkon, Flur, Treppenhaus, Bad, eigene Bezeichnung).
- Editor im Panel (nur Administratoren): öffnet im Vollbild, „Fertig“ speichert und kehrt zur Ansicht zurück.
- Einmaliger **Import** einer bestehenden `custom:easy-floorplan-card`-Konfiguration (YAML/JSON) als Entwurf.
- Speicherung in `.storage/floorplan_panel.plan` (mit Revisionen und Verlauf in
  `.storage/floorplan_panel.history`).

Struktur und Backend orientieren sich an
[Haus3d-HomeAssistant](https://github.com/tollzockt/Haus3d-HomeAssistant), Optik, Datenmodell
und Zoom-Logik von [easy-floorplan](https://github.com/Vombato/easy-floorplan) – siehe
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

- Ist noch nichts gezeichnet, bietet das Panel an, den **Editor** zu öffnen oder einen
  **Beispiel-Grundriss** zu laden (frei erfunden, zum Ausprobieren). Nur Administratoren sehen diese Knöpfe.
- Mit dem Stift-Symbol oben rechts öffnet sich der **Editor**: zeichnen, Entitäten zuordnen, pro Raum die
  Seitenleiste pflegen; „Import“ übernimmt die Konfiguration einer vorhandenen easy-floorplan-Karte als Entwurf.
- Pro Raum legen Sie fest, welche Geräte, Szenen und Skripte im Popup erscheinen.
- Der Plan wird in `.storage/floorplan_panel.plan` gespeichert und ist Teil Ihres
  Home-Assistant-Backups.
- Grundrisse im früheren eigenen Format (bis v0.19) werden seit v0.20.0 nicht mehr gelesen; sie erscheinen als
  leerer Grundriss. Über den Import (oder aus dem Verlauf der Konfiguration) lässt sich neu aufbauen.

## Dienste

| Dienst | Wirkung |
| --- | --- |
| `floorplan_panel.show_room` | Zoomt im offenen Panel (Ansicht, nicht im Editor) auf einen Raum (`room`: ID oder Name, optional `floor`) und öffnet das Popup |
| `floorplan_panel.reset_view` | Zoomt zurück auf die ganze Etage und schließt das Popup |

## Entwicklung

Das Frontend liegt als TypeScript/Lit-Quelltext in `frontend/` und wird nach
`custom_components/floorplan_panel/frontend/floorplan-panel.js` gebaut (die gebaute Datei ist
eingecheckt, damit HACS sie direkt ausliefern kann):

```bash
cd frontend
npm install
npm run build      # einmalig
npm run watch      # beim Entwickeln
npm test           # Unit-Tests
```

Backend-Tests (Python 3.14):

```bash
pip install -r requirements_test.txt
pytest -q
```

Datenmodell: siehe [docs/datenmodell.md](docs/datenmodell.md).
