# Drittanbieter-Hinweise

Dieses Projekt übernimmt Ideen und einzelne Code-Teile aus zwei MIT-lizenzierten Projekten:

- **easy-floorplan** – Copyright (c) 2026 Nicolas Sandller, MIT-Lizenz
  https://github.com/Vombato/easy-floorplan
  Übernommen/portiert: Zoom-auf-Raum-Berechnung (`areaZoomTransform`, `resolveAreaZoom`),
  Punkt-in-Polygon-Test, Grundidee des Datenmodells (`areas`, `walls`, `openings`, `items`).

- **Haus3d-HomeAssistant** – Copyright (c) 2026 tollzockt, MIT-Lizenz
  https://github.com/tollzockt/Haus3d-HomeAssistant
  Übernommen: Aufbau der Integration (Panel-Registrierung, versionierter statischer Pfad,
  Speicherung in `.storage` mit Revisionszähler und Verlauf, WebSocket-API).

Der vollständige Lizenztext beider Projekte entspricht der MIT-Lizenz in `LICENSE`.
