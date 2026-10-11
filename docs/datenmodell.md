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
  "settings": { "wallThickness": 12, "grid": 10,   // grid: 1, 5, 10, 25 oder 50 im Editor
                "templates": [{ "id": "v1", "name": "Kinderzimmer", "walls": [], "openings": [], "areas": [], "items": [] }] },  // optional, max. 30 Vorlagen
  "floors": [
    {
      "id": "wohnung", "name": "Wohnung",
      "walls":    [{ "id": "w1", "x1": 50, "y1": 50, "x2": 950, "y2": 50, "thickness": 20 }],
      "openings": [
        { "id": "t1", "type": "door", "x": 650, "y": 650, "length": 90, "angle": 0,
          "hinge": "left", "swing": "out",
          "entity": "binary_sensor.tuer",         // Kontakt (optional): offen/zu
          "lockEntity": "lock.tuer" },            // Schloss (optional), getrennt vom Kontakt
        { "id": "f1", "type": "window", "x": 300, "y": 50, "length": 180, "angle": 0,
          "entity": "binary_sensor.fenster_wz",   // Gesamtkontakt für Flügel ohne eigenen Sensor
          "leaves": [                             // 1 bis 4 Flügel nebeneinander
            { "w": 1, "entity": "binary_sensor.fenster_wz_links", "hinge": "left" },
            { "w": 2 },                           // w = relative Breite
            { "w": 1, "hinge": "right" } ],
          "swing": "in",                          // Öffnungsrichtung
          "openColor": "#ef6c00",                 // Farbe, solange offen
          "shutters": [                           // Rollos (nur Fenster), je Seite eines
            { "entity": "cover.rollo_aussen", "side": "out", "color": "#8d6e63" },
            { "entity": "cover.raffrollo_innen", "side": "in" } ] }
      ],
      "areas": [{
        "id": "wohnzimmer", "name": "Wohnzimmer",
        "points": [{ "x": 50, "y": 50 }, { "x": 550, "y": 50 }, { "x": 550, "y": 400 }, { "x": 50, "y": 400 }],
        "type": "room",                  // room, balcony (gestrichelte Kontur), hallway, staircase, bathroom, custom (+ "typeLabel")
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
        "showOnlyWhenZoomed": false, "area": null,
        "glow": null,                     // Lichtschein: null = automatisch (an bei light.*)
        "glowRadius": 150,                // Reichweite bei voller Helligkeit
        "glowColor": "#ffd9a0"            // Farbe für Lampen ohne rgb_color
      }]
    }
  ]
}
```

## Möbel-Bibliothek

Planweit gibt es `plan.furniture`, eine Liste eigener Vorlagen (leer ab Werk, es wird nichts mitgeliefert):

```jsonc
"furniture": [
  {
    "id": "m_ab12",
    "name": "Stehlampe",
    "parts": [                         // Teile um den Ursprung (0/0), Einheit cm
      { "id": "p1", "shape": "circle", "x": 0, "y": 0, "r": 15, "fill": "#444", "opacity": 1, "icon": "mdi:floor-lamp" },
      { "id": "p2", "shape": "rect", "x": 0, "y": 0, "w": 40, "h": 10 },
      { "id": "p3", "shape": "polygon", "x": 0, "y": 0, "points": [{"x": -10, "y": 0}, {"x": 10, "y": 0}, {"x": 0, "y": 10}] },
      { "id": "p4", "shape": "path", "x": 0, "y": 0, "w": 50, "h": 50, "d": "M0 0L10 0L10 10Z", "vb": [0, 0, 10, 10] }
    ],
    "lights": [{ "x": 0, "y": -20 }]   // optionale Leuchtpunkte
  }
]
```

`shape: "path"` entsteht beim SVG-Import. Die Pfaddaten werden beim Import und im Schema streng geprüft (nur Zeichnungsbefehle und Zahlen, höchstens 20000 Zeichen). Abweichung von der Spezifikation: Importierte SVGs liegen als Pfaddaten inline im Plan statt als statische Dateien, damit sie mit dem Plan versioniert werden und ohne zusätzliche Dateizugriffe funktionieren.

Ein platziertes Möbelstück ist ein normales Item mit `furnitureType` (Verweis auf die Vorlage), `rotation` (Grad), `scale` und optional `fillColor`. Optional `entity`, `icon`, `label`. Hat die Vorlage Leuchtpunkte und ist die Entität ein `light.*`, scheint das Licht an genau diesen Punkten (mit Drehung/Skalierung umgerechnet) nach den bekannten Regeln für Wände und Öffnungen. Ohne Leuchtpunkte färbt eine Entität nur das Möbelstück. Wird eine Vorlage gelöscht, zeigt das Exemplar nur noch sein Icon.

## Unterschiede zu easy-floorplan

| easy-floorplan | Floorplan Panel |
| --- | --- |
| Konfiguration im Dashboard-YAML | `.storage`, Bearbeitung nur im Panel-Editor |
| `items[].entity` Pflicht | `items[].entity` optional, Icon frei wählbar |
| `furniture` (Formkatalog) | bewusst nicht vorhanden |
| keine Raum-Übersicht | `areas[].sidebar`: Geräte/Szenen/Skripte je Raum |
| `area.haArea` filtert den Picker | `area.haArea` liefert nur abschaltbare Vorschläge |

## Fenster, Rollos, Türen, Lichtschein

- **Fenster** haben 1 bis 4 Flügel (`leaves`). Die Breite `w` ist relativ, ein Flügel belegt
  `w / Summe(w)` der Fensterlänge. Jeder Flügel kann einen eigenen `binary_sensor` haben, sonst
  gilt der Gesamtkontakt `entity`. Fehlt beides überall, warnt der Editor (Chip in der
  Werkzeugleiste, rot markiertes Fenster), Speichern bleibt möglich. Offene Flügel werden mit
  Öffnungsbogen in `openColor` gezeichnet; `unavailable` dimmt nur den betroffenen Flügel.
- **Rollos** gibt es nur an Fenstern: `shutters` mit je einem Eintrag für `out` (außen) und `in`
  (innen). Die Tiefe zeigt den geschlossenen Anteil aus `current_position` (100 = offen),
  sonst aus `open`/`closed`.
- **Türen** zeigen offen/zu über den Kontakt `entity` (ohne Kontakt immer offen gezeichnet); `lockEntity` ist ein eigenes Schloss und
  erscheint als Symbol (grün verriegelt, orange offen, grau unbekannt).
- **Migration**: `sashes: n` → n gleich breite `leaves`; `shutterEntity`/`shutterColor` →
  `shutters[0]` (außen); `lock.*` in `entity` einer Tür → `lockEntity`. Alte Felder werden beim
  nächsten Speichern entfernt.
- **Lichtschein**: radialer Verlauf, Farbe aus `rgb_color` oder `glowColor`, Helligkeit skaliert
  Stärke und Reichweite. Begrenzt durch ein Sichtbarkeits-Polygon gegen die Wände. Licht fällt
  durch offene Türen und durch Türen ohne Kontakt, nicht durch Fenster.

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

## Port-Modus (`plan.ef`)

Seit v0.13.0 gibt es im Panel einen zweiten Modus auf Basis des Quellcodes von easy-floorplan (siehe `NOTICE.md`). Seine Konfiguration liegt unverändert als Objekt unter `plan.ef` (höchstens 2 MB). Eigene Ergänzungen an den Räumen der Konfiguration:

- `type` (`room`, `balcony`, `hallway`, `staircase`, `bathroom`, `custom`) und `typeLabel` bei `custom`; Balkone werden gestrichelt gezeichnet.
- `sidebar`: Liste `{entity, name?, icon?}`; ein Tipp auf den Raum öffnet sie im Popup.
- Rechteck-Werkzeug im Raum-Modus des Editors.
