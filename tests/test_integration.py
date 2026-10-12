"""Tests für Einrichtung, Speicherung, WebSocket-API und Dienste."""

from __future__ import annotations

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


def _ef_areas(plan: dict) -> list[dict]:
    return plan["ef"]["floors"][0]["areas"]


def test_sample_plan_is_valid() -> None:
    plan = load_sample()
    areas = _ef_areas(plan)
    assert len(areas) == 5
    assert all(area["sidebar"] for area in areas)


def test_schema_rejects_oversized_ef() -> None:
    with pytest.raises(vol.Invalid):
        validate_plan({"ef": {"type": "x", "blob": "a" * 2_100_000}})
    with pytest.raises(vol.Invalid):
        validate_plan({"ef": "kaputt"})


def test_schema_drops_old_format_fields() -> None:
    plan = validate_plan({"canvas": {"width": 5}, "floors": [{"id": "eg"}], "furniture": [], "ef": {"type": "x"}})
    assert set(plan) == {"version", "ef", "settings"}
    assert "templates" not in validate_plan({"settings": {"templates": []}})["settings"]


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
    assert "ef" not in msg["result"]["plan"]

    await ws.send_json({"id": 2, "type": f"{DOMAIN}/plan/load_sample"})
    msg = await ws.receive_json()
    assert msg["success"]
    assert msg["result"]["revision"] == 1
    plan = msg["result"]["plan"]

    _ef_areas(plan)[0]["sidebar"].append({"entity": "light.neu", "name": "Neu"})
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
    await ws.send_json({"id": 5, "type": f"{DOMAIN}/plan/save", "plan": {"ef": "kaputt"}, "revision": 2})
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
    assert "ef" not in msg["result"]["plan"]
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
    assert _ef_areas(data.plan)[0]["name"] == "Wohnzimmer"


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
