"""Dienste für Automationen: Raum im offenen Panel zeigen, Ansicht zurücksetzen."""

from __future__ import annotations

import voluptuous as vol

from homeassistant.core import HomeAssistant, ServiceCall, callback
from homeassistant.helpers.dispatcher import async_dispatcher_send

from .const import DOMAIN, SIGNAL_EVENT

SERVICE_SHOW_ROOM = "show_room"
SERVICE_RESET_VIEW = "reset_view"

SHOW_ROOM_SCHEMA = vol.Schema({vol.Required("room"): str, vol.Optional("floor"): str})


@callback
def async_register_services(hass: HomeAssistant) -> None:
    """Registriert die Dienste (idempotent)."""

    @callback
    def show_room(call: ServiceCall) -> None:
        async_dispatcher_send(
            hass, SIGNAL_EVENT, {"type": "show_room", "room": call.data["room"], "floor": call.data.get("floor")}
        )

    @callback
    def reset_view(call: ServiceCall) -> None:
        async_dispatcher_send(hass, SIGNAL_EVENT, {"type": "reset_view"})

    if not hass.services.has_service(DOMAIN, SERVICE_SHOW_ROOM):
        hass.services.async_register(DOMAIN, SERVICE_SHOW_ROOM, show_room, schema=SHOW_ROOM_SCHEMA)
    if not hass.services.has_service(DOMAIN, SERVICE_RESET_VIEW):
        hass.services.async_register(DOMAIN, SERVICE_RESET_VIEW, reset_view)


@callback
def async_remove_services(hass: HomeAssistant) -> None:
    """Entfernt die Dienste beim Entladen."""
    for service in (SERVICE_SHOW_ROOM, SERVICE_RESET_VIEW):
        hass.services.async_remove(DOMAIN, service)
