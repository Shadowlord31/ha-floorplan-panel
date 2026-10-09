/**
 * Schmale Typen für das `hass`-Objekt, das HA jedem Panel übergibt, und Helfer
 * für Zustände und Bedienung.
 */

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
}

export interface HassEntityRegistryDisplayEntry {
  entity_id: string;
  area_id?: string;
  device_id?: string;
  hidden?: boolean;
}

export interface HassArea {
  area_id: string;
  name: string;
  floor_id?: string | null;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  entities?: Record<string, HassEntityRegistryDisplayEntry>;
  areas?: Record<string, HassArea>;
  user?: { is_admin: boolean; name: string };
  language?: string;
  themes?: { darkMode?: boolean };
  callService(domain: string, service: string, data?: Record<string, unknown>): Promise<unknown>;
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
  connection: {
    subscribeMessage<T>(callback: (msg: T) => void, msg: Record<string, unknown>): Promise<() => Promise<void>>;
  };
  formatEntityState?(stateObj: HassEntity, state?: string): string;
}

export const domainOf = (entityId: string): string => entityId.split(".")[0];

/** Domains, die sich mit `homeassistant.toggle` sinnvoll schalten lassen. */
const TOGGLE_DOMAINS = new Set([
  "light",
  "switch",
  "fan",
  "input_boolean",
  "automation",
  "siren",
  "humidifier",
  "media_player",
  "climate",
  "cover",
  "lock",
  "valve",
  "group",
]);

/** Domains, die ausgeführt statt geschaltet werden. */
const RUN_DOMAINS = new Set(["scene", "script", "button", "input_button"]);

export type EntityKind = "device" | "scene" | "script";

/** Gruppe in der Seitenleiste. */
export function entityKind(entityId: string): EntityKind {
  const d = domainOf(entityId);
  if (d === "scene") return "scene";
  if (d === "script") return "script";
  return "device";
}

export function canToggle(entityId: string): boolean {
  return TOGGLE_DOMAINS.has(domainOf(entityId));
}

export function canRun(entityId: string): boolean {
  return RUN_DOMAINS.has(domainOf(entityId));
}

/** Zustand „an/aktiv/offen“ für Einfärbung und Schalter. */
export function isActive(stateObj: HassEntity | undefined): boolean {
  if (!stateObj) return false;
  const s = stateObj.state;
  if (s === "unavailable" || s === "unknown") return false;
  switch (domainOf(stateObj.entity_id)) {
    case "cover":
    case "valve":
      return s === "open" || s === "opening";
    case "lock":
      return s === "unlocked" || s === "open" || s === "opening";
    case "climate":
      return s !== "off";
    case "media_player":
      return s !== "off" && s !== "standby" && s !== "idle";
    case "binary_sensor":
    case "light":
    case "switch":
    case "fan":
    case "input_boolean":
    case "automation":
    case "siren":
    case "humidifier":
    case "person":
    case "device_tracker":
      return s === "on" || s === "home";
    default:
      return s === "on";
  }
}

export function isUnavailable(stateObj: HassEntity | undefined): boolean {
  return !stateObj || stateObj.state === "unavailable";
}

export function friendlyName(hass: HomeAssistant, entityId: string): string {
  return hass.states[entityId]?.attributes.friendly_name ?? entityId;
}

/** Formatierter Zustand (HA-eigene Übersetzung, wenn verfügbar). */
export function formatState(hass: HomeAssistant, stateObj: HassEntity | undefined): string {
  if (!stateObj) return "nicht gefunden";
  if (hass.formatEntityState) {
    try {
      return hass.formatEntityState(stateObj);
    } catch {
      /* ältere HA-Versionen */
    }
  }
  const unit = stateObj.attributes.unit_of_measurement;
  return unit ? `${stateObj.state} ${unit}` : stateObj.state;
}

const DOMAIN_ICONS: Record<string, string> = {
  light: "mdi:lightbulb",
  switch: "mdi:toggle-switch-variant",
  fan: "mdi:fan",
  cover: "mdi:window-shutter",
  climate: "mdi:thermostat",
  lock: "mdi:lock",
  media_player: "mdi:television",
  scene: "mdi:palette",
  script: "mdi:script-text",
  sensor: "mdi:eye",
  binary_sensor: "mdi:checkbox-blank-circle-outline",
  camera: "mdi:video",
  vacuum: "mdi:robot-vacuum",
  input_boolean: "mdi:toggle-switch-outline",
  automation: "mdi:robot",
  button: "mdi:gesture-tap-button",
  person: "mdi:account",
};

/** Icon: explizit gesetzt > Attribut der Entität > Domain-Standard. */
export function entityIcon(hass: HomeAssistant, entityId: string, override?: string): string {
  if (override) return override;
  const attr = hass.states[entityId]?.attributes.icon;
  if (attr) return attr;
  return DOMAIN_ICONS[domainOf(entityId)] ?? "mdi:help-circle-outline";
}

export async function toggleEntity(hass: HomeAssistant, entityId: string): Promise<void> {
  const domain = domainOf(entityId);
  const stateObj = hass.states[entityId];
  if (domain === "lock") {
    await hass.callService("lock", stateObj?.state === "locked" ? "unlock" : "lock", { entity_id: entityId });
  } else if (domain === "cover") {
    await hass.callService("cover", "toggle", { entity_id: entityId });
  } else {
    await hass.callService("homeassistant", "toggle", { entity_id: entityId });
  }
}

export async function runEntity(hass: HomeAssistant, entityId: string): Promise<void> {
  const domain = domainOf(entityId);
  if (domain === "scene") await hass.callService("scene", "turn_on", { entity_id: entityId });
  else if (domain === "script") await hass.callService("script", "turn_on", { entity_id: entityId });
  else if (domain === "button" || domain === "input_button")
    await hass.callService(domain, "press", { entity_id: entityId });
}

/** Öffnet den HA-eigenen Detaildialog (more-info). */
export function fireMoreInfo(node: HTMLElement, entityId: string): void {
  node.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true }));
}
