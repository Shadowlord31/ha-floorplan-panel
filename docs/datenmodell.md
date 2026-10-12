# Datenmodell

Gespeichert in `.storage/floorplan_panel.plan` als `{ "revision": n, "plan": { … } }`.
Jedes Speichern legt den vorherigen Stand in `.storage/floorplan_panel.history` ab
(höchstens 20 Stände). Serverseitig geprüft wird in `custom_components/floorplan_panel/schema.py`
nur grob; die Struktur der Karten-Konfiguration kennt das Frontend (`frontend/src/ef/types.ts`).

```jsonc
{
  "version": 1,
  "ef": {                       // unveränderte Karten-Konfiguration des easy-floorplan-Ports, höchstens 2 MB
    "type": "custom:fp-ef-card",
    "width": 1000, "height": 700,
    "floors": [{ "id": "wohnung", "name": "Wohnung", "walls": [], "openings": [], "areas": [], "items": [] }]
  },
  "settings": { "wallThickness": 12, "grid": 10, "sidebarCards": [ { "type": "entities", "entities": ["light.x"] } ] }
}
```

Fehlt `ef`, ist der Grundriss leer: das Panel bietet Editor und Beispiel-Grundriss an. Felder des früheren
eigenen Formats (`canvas`, `floors`, `furniture`, `settings.templates`) werden seit v0.20.0 beim Laden und Speichern verworfen.

## WebSocket-API

| Befehl | Recht | Zweck |
| --- | --- | --- |
| `floorplan_panel/plan/get` | alle | Plan + Revision |
| `floorplan_panel/plan/save` | Admin | Speichern (`revision` erkennt Konflikte) |
| `floorplan_panel/plan/load_sample` | Admin | Beispiel-Grundriss laden |
| `floorplan_panel/history/list` / `restore` | Admin | Verlauf |
| `floorplan_panel/subscribe` | alle | Ereignisse: `plan_updated`, `show_room`, `reset_view` |

## Karten-Konfiguration (`plan.ef`)

Das Format ist das von easy-floorplan (siehe `NOTICE.md`). Eigene Ergänzungen, jeweils mit `floorplan-panel` im Quelltext markiert:

- Räume: `type` (`room`, `balcony`, `hallway`, `staircase`, `bathroom`, `custom`) und `typeLabel` bei `custom`; Balkone werden gestrichelt gezeichnet. `sidebar`: Liste `{entity, name?, icon?}`; ein Tipp auf den Raum öffnet sie im Popup. Rechteck-Werkzeug im Raum-Modus des Editors.
- Öffnungen mit bis zu vier Flügeln: `sash` (`single`, `double`, `triple`, `quad`), Sensoren in `entity` (Flügel 1), `secondaryEntity` (2) und `extraEntities` (3, 4). Anschlag je Flügel in `leafHinges` (`left`/`right`/`""`; Standard: alle links, der letzte rechts). Ein Flügel ohne Sensor folgt Flügel 1.
- Panel-Modus des Editors (Vollbild, „Fertig“) und einmaliger Import einer vorhandenen `custom:easy-floorplan-card` (YAML/JSON, auch als Dashboard-Ausschnitt): `type` wird auf `custom:fp-ef-card` gesetzt, der Rest 1:1 übernommen. Ergebnis ist nur ein Entwurf; gespeichert wird erst mit „Apply“/„Fertig“.

## Seitenleiste

Gruppiert nach Domain: `scene.*` → *Szenen*, `script.*` → *Skripte*, alles andere → *Geräte*.
Schaltbar sind u. a. `light`, `switch`, `fan`, `input_boolean`, `media_player`, `climate`,
`lock`; `cover` bekommt Auf/Stopp/Ab; `scene`, `script`, `button` werden ausgeführt. Ein Tipp
auf eine Zeile öffnet den HA-Detaildialog (more-info).
