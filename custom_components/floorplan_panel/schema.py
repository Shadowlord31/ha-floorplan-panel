"""Datenmodell des Grundrisses und seine Prüfung.

Angelehnt an easy-floorplan (`types.ts`): Etagen mit Wänden, Öffnungen (Türen/Fenster),
Räumen (Polygone) und frei platzierten Icons. Neu ist die Seitenleiste pro Raum
(`sidebar`): eine explizit gewählte Liste von Entitäten, Szenen und Skripten – es gibt
bewusst keine automatische Übernahme aller Entitäten einer HA-Area.

Koordinaten sind virtuelle Einheiten (empfohlen: Zentimeter) auf der Leinwand
`canvas.width` × `canvas.height`.
"""

from __future__ import annotations

from typing import Any

import voluptuous as vol

PLAN_FORMAT_VERSION = 1

_ID = vol.All(str, vol.Length(min=1, max=64))
_NAME = vol.All(str, vol.Length(max=100))
_COORD = vol.All(vol.Coerce(float), vol.Range(min=-100_000, max=100_000))
_POSITIVE = vol.All(vol.Coerce(float), vol.Range(min=0.1, max=100_000))
_OPACITY = vol.All(vol.Coerce(float), vol.Range(min=0, max=1))
_ENTITY_ID = vol.All(str, vol.Match(r"^[a-z0-9_]+\.[a-z0-9_]+$"))
_OPT_ENTITY = vol.Any(None, "", _ENTITY_ID)
_ICON = vol.All(str, vol.Length(max=100))
# Farben werden im Frontend nur als Werte in SVG-Attributen gesetzt; hier nur grob begrenzt
_COLOR = vol.All(str, vol.Length(max=64), vol.Match(r"^[#a-zA-Z0-9(),.%\s-]*$"))
_TAP_ACTION = vol.In(["auto", "toggle", "more-info", "none"])

WALL_SCHEMA = vol.Schema(
    {
        vol.Required("id"): _ID,
        vol.Required("x1"): _COORD,
        vol.Required("y1"): _COORD,
        vol.Required("x2"): _COORD,
        vol.Required("y2"): _COORD,
        vol.Optional("thickness"): vol.All(vol.Coerce(float), vol.Range(min=1, max=100)),
    },
    extra=vol.REMOVE_EXTRA,
)

_BINARY_SENSOR = vol.Any(None, "", vol.All(str, vol.Match(r"^binary_sensor\.[a-z0-9_]+$")))
_LOCK = vol.Any(None, "", vol.All(str, vol.Match(r"^lock\.[a-z0-9_]+$")))
_COVER = vol.All(str, vol.Match(r"^cover\.[a-z0-9_]+$"))
MAX_LEAVES = 4

LEAF_SCHEMA = vol.Schema(
    {
        # relative Breite; Anteil an der Fensterlänge = w / Summe aller w
        vol.Required("w"): _POSITIVE,
        # eigener Sensor dieses Flügels (optional)
        vol.Optional("entity"): _BINARY_SENSOR,
        vol.Optional("hinge"): vol.In(["left", "right"]),
    },
    extra=vol.REMOVE_EXTRA,
)

SHUTTER_SCHEMA = vol.Schema(
    {
        vol.Required("entity"): _COVER,
        vol.Required("side"): vol.In(["in", "out"]),
        vol.Optional("color"): _COLOR,
    },
    extra=vol.REMOVE_EXTRA,
)


def _shutters(value: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Höchstens ein Rollo je Seite."""
    sides = [s["side"] for s in value]
    if len(sides) != len(set(sides)):
        raise vol.Invalid("Je Seite (innen/außen) ist nur ein Rollo möglich")
    return value


def migrate_opening(raw: Any) -> Any:
    """Wandelt das Format bis v0.2 (sashes, shutterEntity, Schloss in entity) um."""
    if not isinstance(raw, dict):
        return raw
    o = dict(raw)
    sashes = o.pop("sashes", None)
    if o.get("type") == "window" and "leaves" not in o and sashes in (1, 2, "1", "2"):
        o["leaves"] = [{"w": 1} for _ in range(int(sashes))]
        if int(sashes) == 2:
            o["leaves"][0]["hinge"] = "left"
            o["leaves"][1]["hinge"] = "right"
    shutter = o.pop("shutterEntity", None)
    shutter_color = o.pop("shutterColor", None)
    if o.get("type") == "window" and shutter and "shutters" not in o:
        item: dict[str, Any] = {"entity": shutter, "side": "out"}
        if shutter_color:
            item["color"] = shutter_color
        o["shutters"] = [item]
    if o.get("type") == "door" and isinstance(o.get("entity"), str) and o["entity"].startswith("lock."):
        o.setdefault("lockEntity", o["entity"])
        o.pop("entity")
    return o


_OPENING_FIELDS = vol.Schema(
    {
        vol.Required("id"): _ID,
        vol.Required("type"): vol.In(["door", "window"]),
        vol.Required("x"): _COORD,
        vol.Required("y"): _COORD,
        vol.Required("length"): _POSITIVE,
        vol.Optional("angle", default=0): vol.All(vol.Coerce(float), vol.Range(min=-360, max=360)),
        # Anschlag: Seite des Scharniers und Aufschlagrichtung (relativ zur Wandrichtung)
        vol.Optional("hinge", default="left"): vol.In(["left", "right"]),
        vol.Optional("swing", default="in"): vol.In(["in", "out"]),
        # Fenster: Gesamtkontakt für Flügel ohne eigenen Sensor; Tür: Kontakt (binary_sensor)
        vol.Optional("entity"): _BINARY_SENSOR,
        # Fenster: 1 bis 4 Flügel mit eigener Breite und optionalem Sensor
        vol.Optional("leaves"): vol.All([LEAF_SCHEMA], vol.Length(min=1, max=MAX_LEAVES)),
        # Tür: Schloss (optional)
        vol.Optional("lockEntity"): _LOCK,
        # Farbe, solange die Öffnung offen ist
        vol.Optional("openColor"): _COLOR,
        # Fenster: Rollo innen und/oder außen
        vol.Optional("shutters"): vol.All([SHUTTER_SCHEMA], vol.Length(max=2), _shutters),
    },
    extra=vol.REMOVE_EXTRA,
)

OPENING_SCHEMA = vol.All(migrate_opening, _OPENING_FIELDS)

SIDEBAR_ENTRY_SCHEMA = vol.Schema(
    {
        vol.Required("entity"): _ENTITY_ID,
        vol.Optional("name"): _NAME,
        vol.Optional("icon"): _ICON,
    },
    extra=vol.REMOVE_EXTRA,
)

AREA_SCHEMA = vol.Schema(
    {
        vol.Required("id"): _ID,
        vol.Required("points"): vol.All(
            [vol.Schema({vol.Required("x"): _COORD, vol.Required("y"): _COORD}, extra=vol.REMOVE_EXTRA)],
            vol.Length(min=3, max=200),
        ),
        vol.Optional("name", default=""): _NAME,
        vol.Optional("showName", default=True): bool,
        vol.Optional("color"): _COLOR,
        vol.Optional("opacity"): _OPACITY,
        # nur als Bezug/Namensvorschlag – es werden KEINE Entitäten automatisch übernommen
        vol.Optional("haArea"): vol.Any(None, str),
        # Entität, die den Raum einfärbt (z. B. Präsenz)
        vol.Optional("entity"): _OPT_ENTITY,
        vol.Optional("activeColor"): _COLOR,
        # Zoomstufe beim Antippen; ohne Wert wird der Raum eingepasst
        vol.Optional("zoom"): vol.Any(None, vol.All(vol.Coerce(float), vol.Range(min=1, max=10))),
        # Inhalt der Seitenleiste – explizit vom Nutzer gewählt
        vol.Optional("sidebar", default=list): vol.All([SIDEBAR_ENTRY_SCHEMA], vol.Length(max=200)),
    },
    extra=vol.REMOVE_EXTRA,
)

ITEM_SCHEMA = vol.Schema(
    {
        vol.Required("id"): _ID,
        vol.Required("x"): _COORD,
        vol.Required("y"): _COORD,
        # frei wählbares mdi-Icon, keine Formvorgabe; Entität ist optional
        vol.Optional("icon"): _ICON,
        vol.Optional("entity"): _OPT_ENTITY,
        vol.Optional("label"): _NAME,
        vol.Optional("showState", default=False): bool,
        vol.Optional("size"): vol.All(vol.Coerce(float), vol.Range(min=8, max=200)),
        vol.Optional("color"): _COLOR,
        vol.Optional("activeColor"): _COLOR,
        vol.Optional("tapAction", default="auto"): _TAP_ACTION,
        # nur anzeigen, solange der (eigene) Raum gezoomt ist
        vol.Optional("showOnlyWhenZoomed", default=False): bool,
        # Raum-ID, falls das Icon außerhalb seines Raum-Polygons sitzt
        vol.Optional("area"): vol.Any(None, str),
        # Lichtschein: ohne Wert automatisch an bei light.*
        vol.Optional("glow"): vol.Any(None, bool),
        vol.Optional("glowRadius"): vol.All(vol.Coerce(float), vol.Range(min=10, max=5000)),
        vol.Optional("glowColor"): _COLOR,
    },
    extra=vol.REMOVE_EXTRA,
)

FLOOR_SCHEMA = vol.Schema(
    {
        vol.Required("id"): _ID,
        vol.Optional("name", default=""): _NAME,
        vol.Optional("haFloor"): vol.Any(None, str),
        vol.Optional("walls", default=list): vol.All([WALL_SCHEMA], vol.Length(max=2000)),
        vol.Optional("openings", default=list): vol.All([OPENING_SCHEMA], vol.Length(max=1000)),
        vol.Optional("areas", default=list): vol.All([AREA_SCHEMA], vol.Length(max=200)),
        vol.Optional("items", default=list): vol.All([ITEM_SCHEMA], vol.Length(max=1000)),
    },
    extra=vol.REMOVE_EXTRA,
)

PLAN_SCHEMA = vol.Schema(
    {
        vol.Optional("version", default=PLAN_FORMAT_VERSION): vol.All(int, vol.Range(min=1, max=PLAN_FORMAT_VERSION)),
        vol.Optional("canvas", default=lambda: {"width": 1000, "height": 700}): vol.Schema(
            {
                vol.Required("width"): vol.All(vol.Coerce(float), vol.Range(min=50, max=100_000)),
                vol.Required("height"): vol.All(vol.Coerce(float), vol.Range(min=50, max=100_000)),
            },
            extra=vol.REMOVE_EXTRA,
        ),
        vol.Optional("floors", default=list): vol.All([FLOOR_SCHEMA], vol.Length(max=20)),
        vol.Optional("settings", default=dict): vol.Schema(
            {
                # Wanddicke in Einheiten, Standard für neue Wände
                vol.Optional("wallThickness", default=12): vol.All(vol.Coerce(float), vol.Range(min=1, max=100)),
                # Rasterweite des Editors
                vol.Optional("grid", default=10): vol.All(vol.Coerce(float), vol.Range(min=1, max=500)),
            },
            extra=vol.REMOVE_EXTRA,
        ),
    },
    extra=vol.REMOVE_EXTRA,
)


def _check_unique_ids(plan: dict[str, Any]) -> None:
    """IDs müssen je Etage und Elementart eindeutig sein, Etagen-IDs global."""
    floor_ids = [f["id"] for f in plan["floors"]]
    if len(floor_ids) != len(set(floor_ids)):
        raise vol.Invalid("Etagen-IDs sind nicht eindeutig")
    for floor in plan["floors"]:
        for key in ("walls", "openings", "areas", "items"):
            ids = [e["id"] for e in floor[key]]
            if len(ids) != len(set(ids)):
                raise vol.Invalid(f"IDs in {floor['id']}.{key} sind nicht eindeutig")


def validate_plan(raw: Any) -> dict[str, Any]:
    """Prüft und normalisiert einen Grundriss; wirft vol.Invalid bei Fehlern."""
    plan = PLAN_SCHEMA(raw)
    _check_unique_ids(plan)
    return plan


def empty_plan() -> dict[str, Any]:
    """Ein leerer Grundriss mit einer Etage."""
    return validate_plan({"floors": [{"id": "eg", "name": "Wohnung"}]})
