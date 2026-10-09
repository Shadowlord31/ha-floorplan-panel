"""Speicherung des Grundrisses in .storage mit Revisionszähler und Verlauf."""

from __future__ import annotations

import asyncio
import copy
import json
import logging
from pathlib import Path
from typing import Any

import voluptuous as vol

from homeassistant.core import HomeAssistant
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import (
    HISTORY_LIMIT,
    SAMPLE_FILE,
    SIGNAL_EVENT,
    STORAGE_KEY_HISTORY,
    STORAGE_KEY_INVALID,
    STORAGE_KEY_PLAN,
    STORAGE_VERSION,
)
from .schema import empty_plan, validate_plan

_LOGGER = logging.getLogger(__name__)


class RevisionConflict(Exception):
    """Der Stand wurde inzwischen von jemand anderem gespeichert."""


class FloorplanData:
    """Hält Grundriss, Revision und Verlauf und schreibt sie in .storage."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY_PLAN)
        self._history_store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY_HISTORY)
        self.plan: dict[str, Any] = empty_plan()
        self.revision = 0
        self.history: list[dict[str, Any]] = []
        self._next_history_id = 1
        # Revisionsprüfung und Schreiben dürfen sich nicht überholen
        self._lock = asyncio.Lock()

    async def async_load(self) -> None:
        """Lädt den gespeicherten Stand; beim ersten Start einen leeren Grundriss."""
        stored = await self._store.async_load()
        if stored and isinstance(stored.get("plan"), dict):
            try:
                self.plan = validate_plan(stored["plan"])
            except vol.Invalid as err:
                # nicht verwerfen: Rohstand sichern, bevor das nächste Speichern ihn überschreibt
                await Store(self.hass, STORAGE_VERSION, STORAGE_KEY_INVALID).async_save(stored)
                _LOGGER.error(
                    "Gespeicherter Grundriss ist ungültig und wurde nach .storage/%s gesichert; starte leer: %s",
                    STORAGE_KEY_INVALID,
                    err,
                )
                self.plan = empty_plan()
            self.revision = int(stored.get("revision", 0))
        else:
            self.plan = empty_plan()
            self.revision = 0

        history = await self._history_store.async_load()
        if history:
            self.history = list(history.get("items", []))[-HISTORY_LIMIT:]
            self._next_history_id = int(history.get("next_id", len(self.history) + 1))

    async def _async_save_plan(self) -> None:
        await self._store.async_save({"revision": self.revision, "plan": self.plan})
        async_dispatcher_send(self.hass, SIGNAL_EVENT, {"type": "plan_updated", "revision": self.revision})

    async def _async_save_history(self) -> None:
        await self._history_store.async_save({"next_id": self._next_history_id, "items": self.history})

    async def _async_snapshot(self, reason: str) -> None:
        self.history.append(
            {
                "id": self._next_history_id,
                "created": dt_util.utcnow().isoformat(),
                "reason": reason,
                "revision": self.revision,
                "plan": copy.deepcopy(self.plan),
            }
        )
        self._next_history_id += 1
        del self.history[:-HISTORY_LIMIT]
        await self._async_save_history()

    async def async_save(self, plan: dict[str, Any], expected_revision: int | None, reason: str = "save") -> int:
        """Speichert einen (bereits validierten) Grundriss; der alte Stand wandert in den Verlauf."""
        async with self._lock:
            if expected_revision is not None and expected_revision != self.revision:
                raise RevisionConflict
            await self._async_snapshot(reason)
            self.plan = plan
            self.revision += 1
            await self._async_save_plan()
            return self.revision

    async def async_restore(self, history_id: int) -> int:
        """Stellt einen Stand aus dem Verlauf wieder her (der aktuelle wird vorher gesichert)."""
        async with self._lock:
            item = next((h for h in self.history if h["id"] == history_id), None)
            if item is None:
                raise KeyError(history_id)
            plan = validate_plan(item["plan"])
            await self._async_snapshot("restore")
            self.plan = plan
            self.revision += 1
            await self._async_save_plan()
            return self.revision

    def history_summary(self) -> list[dict[str, Any]]:
        """Verlauf ohne Grundrissdaten, neueste zuerst."""
        return [{k: h[k] for k in ("id", "created", "reason", "revision")} for h in reversed(self.history)]


def load_sample() -> dict[str, Any]:
    """Liest den mitgelieferten, frei erfundenen Beispiel-Grundriss (im Executor aufrufen)."""
    path = Path(__file__).parent / SAMPLE_FILE
    return validate_plan(json.loads(path.read_text(encoding="utf-8")))
