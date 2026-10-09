"""Konstanten für Floorplan Panel."""

from __future__ import annotations

DOMAIN = "floorplan_panel"
VERSION = "0.11.0"

STORAGE_VERSION = 1
STORAGE_KEY_PLAN = f"{DOMAIN}.plan"
STORAGE_KEY_HISTORY = f"{DOMAIN}.history"
# ungültiger gespeicherter Stand wird hierhin gesichert, statt verloren zu gehen
STORAGE_KEY_INVALID = f"{DOMAIN}.plan_invalid"

# Anzahl der aufgehobenen Stände (Undo über Sitzungen hinweg)
HISTORY_LIMIT = 20

# Erfundener Beispiel-Grundriss, auf Wunsch im Panel ladbar
SAMPLE_FILE = "sample_plan.json"

# Signal an offene Panels (Dienste, gespeicherte Änderungen)
SIGNAL_EVENT = f"{DOMAIN}_event"

PANEL_URL_PATH = "grundriss"
PANEL_TITLE = "Grundriss"
PANEL_ICON = "mdi:floor-plan"
PANEL_COMPONENT = "floorplan-panel"
PANEL_FILE = "floorplan-panel.js"

STATIC_URL = f"/{DOMAIN}_static"
