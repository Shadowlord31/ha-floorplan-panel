"""WebSocket-Befehle von Floorplan Panel."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from .const import DOMAIN, SIGNAL_EVENT
from .schema import validate_plan
from .storage import FloorplanData, RevisionConflict, load_sample


@callback
def async_register_commands(hass: HomeAssistant) -> None:
    """Registriert die Befehle (nur einmal pro HA-Lauf, siehe __init__.py)."""
    for command in (ws_get, ws_save, ws_load_sample, ws_history_list, ws_history_restore, ws_subscribe):
        websocket_api.async_register_command(hass, command)


def _data(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> FloorplanData | None:
    data: FloorplanData | None = hass.data.get(DOMAIN)
    if data is None:
        connection.send_error(msg["id"], "not_loaded", "Floorplan Panel ist nicht geladen")
    return data


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/plan/get"})
@callback
def ws_get(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Liefert Grundriss und Revision."""
    if (data := _data(hass, connection, msg)) is None:
        return
    connection.send_result(msg["id"], {"plan": data.plan, "revision": data.revision})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/plan/save",
        vol.Required("plan"): dict,
        vol.Optional("revision"): vol.Any(None, int),
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_save(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Prüft und speichert einen Grundriss. Mit `revision` wird ein zwischenzeitlicher Stand erkannt."""
    if (data := _data(hass, connection, msg)) is None:
        return
    try:
        plan = validate_plan(msg["plan"])
    except vol.Invalid as err:
        connection.send_error(msg["id"], "invalid_format", str(err))
        return
    try:
        revision = await data.async_save(plan, msg.get("revision"))
    except RevisionConflict:
        connection.send_error(msg["id"], "conflict", "Der Grundriss wurde inzwischen geändert")
        return
    connection.send_result(msg["id"], {"revision": revision, "plan": data.plan})


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/plan/load_sample"})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_load_sample(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Ersetzt den Grundriss durch das mitgelieferte Beispiel (alter Stand bleibt im Verlauf)."""
    if (data := _data(hass, connection, msg)) is None:
        return
    plan = await hass.async_add_executor_job(load_sample)
    revision = await data.async_save(plan, None, reason="sample")
    connection.send_result(msg["id"], {"revision": revision, "plan": data.plan})


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/history/list"})
@websocket_api.require_admin
@callback
def ws_history_list(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Listet die aufgehobenen Stände."""
    if (data := _data(hass, connection, msg)) is None:
        return
    connection.send_result(msg["id"], {"items": data.history_summary()})


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/history/restore", vol.Required("history_id"): int})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_history_restore(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Stellt einen aufgehobenen Stand wieder her."""
    if (data := _data(hass, connection, msg)) is None:
        return
    try:
        revision = await data.async_restore(msg["history_id"])
    except KeyError:
        connection.send_error(msg["id"], "not_found", "Diesen Stand gibt es nicht")
        return
    except vol.Invalid as err:
        connection.send_error(msg["id"], "invalid_format", str(err))
        return
    connection.send_result(msg["id"], {"revision": revision, "plan": data.plan})


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/subscribe"})
@callback
def ws_subscribe(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Meldet Ereignisse an offene Panels: gespeicherte Änderungen und Dienstaufrufe."""

    @callback
    def forward(event: dict[str, Any]) -> None:
        connection.send_message(websocket_api.event_message(msg["id"], event))

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(hass, SIGNAL_EVENT, forward)
    connection.send_result(msg["id"])
