"""Tests für Einrichtung, Speicherung, WebSocket-API und Dienste."""

from __future__ import annotations

import copy

import pytest
import voluptuous as vol

from homeassistant.components import frontend
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.floorplan_panel.const import DOMAIN, PANEL_URL_PATH, STORAGE_KEY_PLAN
from custom_components.floorplan_panel.schema import validate_plan
from custom_components.floorplan_panel.storage import load_sample


async def _setup(hass: HomeAssistant) -> MockConfigEntry:
    entry = MockConfigEntry(domain=DOMAIN, title="Grundriss", data={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


def test_sample_plan_is_valid() -> None:
    plan = load_sample()
    floor = plan["floors"][0]
    assert len(floor["areas"]) == 5
    assert all(area["sidebar"] for area in floor["areas"])


def test_schema_rejects_duplicates_and_bad_entities() -> None:
    plan = load_sample()
    broken = copy.deepcopy(plan)
    broken["floors"][0]["walls"].append(copy.deepcopy(broken["floors"][0]["walls"][0]))
    with pytest.raises(vol.Invalid):
        validate_plan(broken)
    broken = copy.deepcopy(plan)
    broken["floors"][0]["areas"][0]["sidebar"].append({"entity": "kein entity"})
    with pytest.raises(vol.Invalid):
        validate_plan(broken)


def test_schema_drops_unknown_fields() -> None:
    plan = validate_plan({"floors": [{"id": "eg", "items": [{"id": "i", "x": 1, "y": 2, "furniture": "sofa"}]}]})
    assert "furniture" not in plan["floors"][0]["items"][0]
    assert plan["floors"][0]["items"][0]["tapAction"] == "auto"


async def test_config_flow_single_instance(hass: HomeAssistant) -> None:
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": "user"})
    assert result["type"] == "form"
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {})
    assert result["type"] == "create_entry"
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": "user"})
    assert result["type"] == "abort"


async def test_setup_registers_panel_and_unload_removes_it(hass: HomeAssistant) -> None:
    entry = await _setup(hass)
    panels = hass.data[frontend.DATA_PANELS]
    assert PANEL_URL_PATH in panels
    assert panels[PANEL_URL_PATH].config["_panel_custom"]["name"] == "floorplan-panel"
    assert hass.services.has_service(DOMAIN, "show_room")

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
    assert PANEL_URL_PATH not in hass.data[frontend.DATA_PANELS]
    assert not hass.services.has_service(DOMAIN, "show_room")

    # Reload darf nicht an doppelt registrierten Pfaden/Befehlen scheitern
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    assert PANEL_URL_PATH in hass.data[frontend.DATA_PANELS]


async def test_websocket_roundtrip(hass: HomeAssistant, hass_ws_client, hass_storage) -> None:
    await _setup(hass)
    ws = await hass_ws_client(hass)

    await ws.send_json({"id": 1, "type": f"{DOMAIN}/plan/get"})
    msg = await ws.receive_json()
    assert msg["success"]
    assert msg["result"]["revision"] == 0
    assert msg["result"]["plan"]["floors"][0]["walls"] == []

    await ws.send_json({"id": 2, "type": f"{DOMAIN}/plan/load_sample"})
    msg = await ws.receive_json()
    assert msg["success"]
    assert msg["result"]["revision"] == 1
    plan = msg["result"]["plan"]

    plan["floors"][0]["areas"][0]["sidebar"].append({"entity": "light.neu", "name": "Neu"})
    await ws.send_json({"id": 3, "type": f"{DOMAIN}/plan/save", "plan": plan, "revision": 1})
    msg = await ws.receive_json()
    assert msg["success"]
    assert msg["result"]["revision"] == 2
    await hass.async_block_till_done()

    # veraltete Revision → Konflikt
    await ws.send_json({"id": 4, "type": f"{DOMAIN}/plan/save", "plan": plan, "revision": 1})
    msg = await ws.receive_json()
    assert not msg["success"]
    assert msg["error"]["code"] == "conflict"

    # ungültig → abgelehnt
    await ws.send_json({"id": 5, "type": f"{DOMAIN}/plan/save", "plan": {"floors": "kaputt"}, "revision": 2})
    msg = await ws.receive_json()
    assert msg["error"]["code"] == "invalid_format"

    await ws.send_json({"id": 6, "type": f"{DOMAIN}/history/list"})
    msg = await ws.receive_json()
    items = msg["result"]["items"]
    assert [i["reason"] for i in items] == ["save", "sample"]

    # Stand vor dem Beispiel wiederherstellen
    await ws.send_json({"id": 7, "type": f"{DOMAIN}/history/restore", "history_id": items[-1]["id"]})
    msg = await ws.receive_json()
    assert msg["success"]
    assert msg["result"]["plan"]["floors"][0]["walls"] == []
    await hass.async_block_till_done()

    assert hass_storage[STORAGE_KEY_PLAN]["data"]["revision"] == 3


async def test_stored_plan_survives_restart(hass: HomeAssistant, hass_storage) -> None:
    hass_storage[STORAGE_KEY_PLAN] = {
        "version": 1,
        "key": STORAGE_KEY_PLAN,
        "data": {"revision": 7, "plan": load_sample()},
    }
    await _setup(hass)
    data = hass.data[DOMAIN]
    assert data.revision == 7
    assert data.plan["floors"][0]["areas"][0]["name"] == "Wohnzimmer"


async def test_save_requires_admin(hass: HomeAssistant, hass_ws_client, hass_read_only_access_token) -> None:
    await _setup(hass)
    ws = await hass_ws_client(hass, hass_read_only_access_token)
    await ws.send_json({"id": 1, "type": f"{DOMAIN}/plan/save", "plan": {}, "revision": 0})
    msg = await ws.receive_json()
    assert not msg["success"]
    assert msg["error"]["code"] == "unauthorized"


async def test_show_room_service_reaches_subscribers(hass: HomeAssistant, hass_ws_client) -> None:
    await _setup(hass)
    ws = await hass_ws_client(hass)
    await ws.send_json({"id": 1, "type": f"{DOMAIN}/subscribe"})
    assert (await ws.receive_json())["success"]

    await hass.services.async_call(DOMAIN, "show_room", {"room": "Küche"}, blocking=True)
    msg = await ws.receive_json()
    assert msg["type"] == "event"
    assert msg["event"] == {"type": "show_room", "room": "Küche", "floor": None}


def test_schema_window_shutter_and_glow_fields() -> None:
    plan = validate_plan(
        {
            "floors": [
                {
                    "id": "eg",
                    "openings": [
                        {
                            "id": "f",
                            "type": "window",
                            "x": 0,
                            "y": 0,
                            "length": 100,
                            "entity": "binary_sensor.fenster",
                            "sashes": 2,
                            "openColor": "#ff0000",
                            "shutterEntity": "cover.rollo",
                            "shutterColor": "#8d6e63",
                        },
                        # Fenster ohne Kontakt bleibt gültig (nur Warnung im Editor)
                        {"id": "f2", "type": "window", "x": 0, "y": 0, "length": 100},
                    ],
                    "items": [{"id": "l", "x": 1, "y": 1, "entity": "light.a", "glow": True, "glowRadius": 200, "glowColor": "#ffd9a0"}],
                }
            ]
        }
    )
    window = plan["floors"][0]["openings"][0]
    assert window["sashes"] == 2
    assert window["shutterEntity"] == "cover.rollo"
    assert plan["floors"][0]["items"][0]["glowRadius"] == 200


@pytest.mark.parametrize(
    "opening",
    [
        {"sashes": 3},
        {"shutterEntity": "light.kein_rollo"},
        {"shutterEntity": "cover rollo"},
        {"openColor": "red;background:url(x)"},
    ],
)
def test_schema_rejects_bad_window_fields(opening: dict) -> None:
    with pytest.raises(vol.Invalid):
        validate_plan(
            {"floors": [{"id": "eg", "openings": [{"id": "f", "type": "window", "x": 0, "y": 0, "length": 100, **opening}]}]}
        )
