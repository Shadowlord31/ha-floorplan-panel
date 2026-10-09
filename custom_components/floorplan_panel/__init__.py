"""Floorplan Panel: 2D-Grundriss der Wohnung als eigenes Sidebar-Panel."""

from __future__ import annotations

import hashlib
import logging
from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import (
    DOMAIN,
    PANEL_COMPONENT,
    PANEL_FILE,
    PANEL_ICON,
    PANEL_TITLE,
    PANEL_URL_PATH,
    STATIC_URL,
    VERSION,
)
from .services import async_register_services, async_remove_services
from .storage import FloorplanData
from .websocket import async_register_commands

_LOGGER = logging.getLogger(__name__)

FRONTEND_DIR = Path(__file__).parent / "frontend"

# Statische Pfade und WebSocket-Befehle lassen sich nicht wieder abmelden und
# dürfen daher nur einmal pro HA-Lauf registriert werden (überlebt Reloads).
_STATIC_REGISTERED = f"{DOMAIN}_static_versions"
_WS_REGISTERED = f"{DOMAIN}_ws_registered"


def _frontend_hash() -> str:
    """Kurzer Hash über das Frontend, damit der Browser nach Updates neu lädt."""
    digest = hashlib.sha1(VERSION.encode())
    for path in sorted(FRONTEND_DIR.rglob("*.js")):
        digest.update(path.read_bytes())
    return digest.hexdigest()[:10]


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Lädt den Grundriss, liefert das Frontend aus und registriert das Panel."""
    data = FloorplanData(hass)
    await data.async_load()
    hass.data[DOMAIN] = data

    if not hass.data.get(_WS_REGISTERED):
        async_register_commands(hass)
        hass.data[_WS_REGISTERED] = True
    async_register_services(hass)

    version = await hass.async_add_executor_job(_frontend_hash)
    registered: set[str] = hass.data.setdefault(_STATIC_REGISTERED, set())
    if version not in registered:
        await hass.http.async_register_static_paths(
            [StaticPathConfig(f"{STATIC_URL}/{version}", str(FRONTEND_DIR), cache_headers=True)]
        )
        registered.add(version)

    _async_remove_panel(hass)
    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_URL_PATH,
        webcomponent_name=PANEL_COMPONENT,
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        module_url=f"{STATIC_URL}/{version}/{PANEL_FILE}",
        embed_iframe=False,
        require_admin=False,
        config={"version": VERSION},
    )
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Entfernt Panel und Dienste; der Grundriss bleibt in .storage erhalten."""
    _async_remove_panel(hass)
    async_remove_services(hass)
    hass.data.pop(DOMAIN, None)
    return True


def _async_remove_panel(hass: HomeAssistant) -> None:
    """Entfernt das Panel, falls es (z. B. nach einem Reload) noch registriert ist."""
    if PANEL_URL_PATH in hass.data.get(frontend.DATA_PANELS, {}):
        frontend.async_remove_panel(hass, PANEL_URL_PATH)
