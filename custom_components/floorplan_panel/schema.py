"""Datenmodell des Grundrisses und seine Prüfung.

Der Grundriss ist die unveränderte Karten-Konfiguration des easy-floorplan-Ports (Feld
`ef`, siehe NOTICE.md). Sie wird hier nur grob geprüft (Größe); die Struktur kennt und
validiert das Frontend. Stände im früheren eigenen Format (`floors`, `furniture`, `canvas`)
werden beim Laden stillschweigend verworfen und erscheinen als leerer Grundriss.
"""

from __future__ import annotations

import json
from typing import Any

import voluptuous as vol

PLAN_FORMAT_VERSION = 1

EF_MAX_BYTES = 2_000_000


def _ef_size(value: dict[str, Any]) -> dict[str, Any]:
    """Begrenzt die Größe der Port-Konfiguration."""
    if len(json.dumps(value, default=str)) > EF_MAX_BYTES:
        raise vol.Invalid("Die Konfiguration des Editors ist zu groß")
    return value


PLAN_SCHEMA = vol.Schema(
    {
        vol.Optional("version", default=PLAN_FORMAT_VERSION): vol.All(int, vol.Range(min=1, max=PLAN_FORMAT_VERSION)),
        # unveränderte Karten-Konfiguration des easy-floorplan-Ports
        vol.Optional("ef"): vol.All(dict, _ef_size),
        vol.Optional("settings", default=dict): vol.Schema(
            {
                vol.Optional("wallThickness", default=12): vol.All(vol.Coerce(float), vol.Range(min=1, max=100)),
                vol.Optional("grid", default=10): vol.All(vol.Coerce(float), vol.Range(min=1, max=500)),
            },
            extra=vol.REMOVE_EXTRA,
        ),
    },
    extra=vol.REMOVE_EXTRA,
)


def validate_plan(raw: Any) -> dict[str, Any]:
    """Prüft und normalisiert einen Grundriss; wirft vol.Invalid bei Fehlern."""
    return PLAN_SCHEMA(raw)


def empty_plan() -> dict[str, Any]:
    """Ein leerer Grundriss ohne Port-Konfiguration."""
    return validate_plan({})
