# Datenmodell

Gespeichert in `.storage/floorplan_panel.plan` als `{ "revision": n, "plan": { … } }`.
Jedes Speichern legt den vorherigen Stand in `.storage/floorplan_panel.history` ab
(höchstens 20 Stände, im Editor unter *Verlauf* wiederherstellbar).
Geprüft wird serverseitig in `custom_components/floorplan_panel/schema.py`; das Frontend
spiegelt die Typen in `frontend/src/types.ts`.

```jsonc
{
  "version": 1,
  "canvas": { "width": 1000, "height": 700 },     // virtuelle Einheiten, z. B. cm
  "settings": { "wallThickness": 12, "grid": 10 },
  "floors": [
    {
      "id": "wohnung", "name": "Wohnung",
      "walls":    [{ "id": "w1", "x1": 50, "y1": 50, "x2": 950, "y2": 50, "thickness": 20 }],
      "openings": [{ "id": "t1", "type": "door", "x": 650, "y": 650, "length": 90, "angle": 0,
                     "hinge": "left", "swing": "in", "entity": "binary_sensor.tuer" }],
      "areas": [{
        "id": "wohnzimmer", "name": "Wohnzimmer",
        "points": [{ "x": 50, "y": 50 }, { "x": 550, "y": 50 }, { "x": 550, "y": 400 }, { "x": 50, "y": 400 }],
        "color": "#4f8bd6", "opacity": 0.12, "zoom": null,
        "haArea": "wohnzimmer",          // nur Bezug/Vorschläge – keine Automatik
        "entity": "binary_sensor.praesenz_wz", "activeColor": "#ffc107",
        "sidebar": [                     // explizit gewählter Inhalt der Seitenleiste
          { "entity": "light.wz_decke", "name": "Deckenlicht" },
          { "entity": "scene.filmabend" },
          { "entity": "script.alles_aus", "icon": "mdi:power" }
        ]
      }],
      "items": [{
        "id": "i1", "x": 300, "y": 225, "icon": "mdi:ceiling-light",
        "entity": "light.wz_decke",       // optional
        "label": "Decke", "showState": false, "size": 34,
        "tapAction": "auto",              // auto | toggle | more-info | none
        "showOnlyWhenZoomed": false, "area": null
      }]
    }
  ]
}
```

## Unterschiede zu easy-floorplan

| easy-floorplan | Floorplan Panel |
| --- | --- |
| Konfiguration im Dashboard-YAML | `.storage`, Bearbeitung nur im Panel-Editor |
| `items[].entity` Pflicht | `items[].entity` optional, Icon frei wählbar |
| `furniture` (Formkatalog) | bewusst nicht vorhanden |
| keine Raum-Übersicht | `areas[].sidebar`: Geräte/Szenen/Skripte je Raum |
| `area.haArea` filtert den Picker | `area.haArea` liefert nur abschaltbare Vorschläge |

## Seitenleiste

Gruppiert nach Domain: `scene.*` → *Szenen*, `script.*` → *Skripte*, alles andere → *Geräte*.
Schaltbar sind u. a. `light`, `switch`, `fan`, `input_boolean`, `media_player`, `climate`,
`lock`; `cover` bekommt Auf/Stopp/Ab; `scene`, `script`, `button` werden ausgeführt. Ein Tipp
auf eine Zeile öffnet den HA-Detaildialog (more-info).

## WebSocket-API

| Befehl | Recht | Zweck |
| --- | --- | --- |
| `floorplan_panel/plan/get` | alle | Plan + Revision |
| `floorplan_panel/plan/save` | Admin | Speichern (`revision` erkennt Konflikte) |
| `floorplan_panel/plan/load_sample` | Admin | Beispiel-Grundriss laden |
| `floorplan_panel/history/list` / `restore` | Admin | Verlauf |
| `floorplan_panel/subscribe` | alle | Ereignisse: `plan_updated`, `show_room`, `reset_view` |
