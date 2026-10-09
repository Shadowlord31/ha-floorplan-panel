/**
 * Seitenleiste eines Raums: zeigt die im Editor explizit zugeordneten Geräte, Szenen und
 * Skripte und erlaubt die direkte Bedienung (Schalten, Ausführen, Detaildialog).
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  canRun,
  canToggle,
  domainOf,
  entityIcon,
  entityKind,
  fireMoreInfo,
  formatState,
  friendlyName,
  isActive,
  isUnavailable,
  runEntity,
  toggleEntity,
  type EntityKind,
  type HomeAssistant,
} from "./ha";
import type { Area, SidebarEntry } from "./types";

const GROUPS: { kind: EntityKind; title: string }[] = [
  { kind: "device", title: "Geräte" },
  { kind: "scene", title: "Szenen" },
  { kind: "script", title: "Skripte" },
];

@customElement("fp-room-sidebar")
export class FpRoomSidebar extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) area!: Area;
  @property({ type: Boolean }) canEdit = false;

  private _close(): void {
    this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
  }

  private _edit(): void {
    this.dispatchEvent(new CustomEvent("edit-room", { detail: { id: this.area.id }, bubbles: true, composed: true }));
  }

  protected render() {
    if (!this.area) return nothing;
    const entries = this.area.sidebar ?? [];
    const activeCount = entries.filter((e) => entityKind(e.entity) === "device" && isActive(this.hass.states[e.entity])).length;
    return html`
      <header>
        <div class="title">
          <h2>${this.area.name || "Raum"}</h2>
          <span class="sub">${entries.length ? `${activeCount} aktiv` : ""}</span>
        </div>
        ${this.canEdit
          ? html`<button class="icon-btn" title="Seitenleiste bearbeiten" @click=${this._edit}>
              <ha-icon icon="mdi:pencil"></ha-icon>
            </button>`
          : nothing}
        <button class="icon-btn" title="Schließen" @click=${this._close}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </header>
      <div class="content">
        ${entries.length === 0
          ? html`<p class="empty">
              Diesem Raum ist noch nichts zugeordnet.${this.canEdit
                ? html` Im Editor lassen sich Geräte, Szenen und Skripte für die Seitenleiste auswählen.`
                : nothing}
            </p>`
          : GROUPS.map(({ kind, title }) => {
              const group = entries.filter((e) => entityKind(e.entity) === kind);
              if (!group.length) return nothing;
              return html`<section>
                <h3>${title}</h3>
                ${kind === "device"
                  ? group.map((e) => this._renderRow(e))
                  : html`<div class="chips">${group.map((e) => this._renderChip(e))}</div>`}
              </section>`;
            })}
      </div>
    `;
  }

  private _renderRow(entry: SidebarEntry) {
    const stateObj = this.hass.states[entry.entity];
    const active = isActive(stateObj);
    const unavailable = isUnavailable(stateObj);
    const name = entry.name || friendlyName(this.hass, entry.entity);
    const domain = domainOf(entry.entity);
    return html`
      <div class="row ${active ? "active" : ""} ${unavailable ? "unavailable" : ""}">
        <button class="row-main" @click=${() => fireMoreInfo(this, entry.entity)} title="Details">
          <span class="row-icon"><ha-icon .icon=${entityIcon(this.hass, entry.entity, entry.icon)}></ha-icon></span>
          <span class="row-text">
            <span class="name">${name}</span>
            <span class="state">${formatState(this.hass, stateObj)}</span>
          </span>
        </button>
        ${unavailable
          ? nothing
          : domain === "cover"
          ? html`<span class="cover-btns">
              <button class="icon-btn" title="Öffnen" @click=${() => this._call("cover", "open_cover", entry.entity)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button class="icon-btn" title="Stopp" @click=${() => this._call("cover", "stop_cover", entry.entity)}>
                <ha-icon icon="mdi:stop"></ha-icon>
              </button>
              <button class="icon-btn" title="Schließen" @click=${() => this._call("cover", "close_cover", entry.entity)}>
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
            </span>`
          : canRun(entry.entity)
          ? html`<button class="run" @click=${() => runEntity(this.hass, entry.entity)}>Ausführen</button>`
          : canToggle(entry.entity)
          ? html`<button
              class="switch ${active ? "on" : ""}"
              role="switch"
              aria-checked=${active ? "true" : "false"}
              title=${active ? "Ausschalten" : "Einschalten"}
              @click=${() => toggleEntity(this.hass, entry.entity)}
            >
              <span class="knob"></span>
            </button>`
          : nothing}
      </div>
    `;
  }

  private _renderChip(entry: SidebarEntry) {
    const stateObj = this.hass.states[entry.entity];
    const name = entry.name || friendlyName(this.hass, entry.entity);
    const running = domainOf(entry.entity) === "script" && stateObj?.state === "on";
    return html`
      <button
        class="chip ${running ? "running" : ""}"
        ?disabled=${isUnavailable(stateObj)}
        title=${entry.entity}
        @click=${() => runEntity(this.hass, entry.entity)}
        @contextmenu=${(ev: Event) => {
          ev.preventDefault();
          fireMoreInfo(this, entry.entity);
        }}
      >
        <ha-icon .icon=${entityIcon(this.hass, entry.entity, entry.icon)}></ha-icon>
        <span>${name}</span>
      </button>
    `;
  }

  private _call(domain: string, service: string, entityId: string): void {
    this.hass.callService(domain, service, { entity_id: entityId });
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      min-height: 0;
    }
    header {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 12px 8px 8px 16px;
      border-bottom: 1px solid var(--divider-color);
    }
    .title {
      flex: 1;
      min-width: 0;
    }
    h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .sub {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .content {
      overflow-y: auto;
      padding: 8px 12px 16px;
    }
    h3 {
      margin: 12px 4px 6px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--secondary-text-color);
    }
    .empty {
      color: var(--secondary-text-color);
      padding: 8px 4px;
    }
    button {
      font: inherit;
      color: inherit;
    }
    .icon-btn {
      border: none;
      background: none;
      cursor: pointer;
      padding: 6px;
      border-radius: 50%;
      line-height: 0;
      color: var(--secondary-text-color);
    }
    .icon-btn:hover {
      background: var(--secondary-background-color);
    }
    .row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 4px 4px 0;
      border-radius: 12px;
    }
    .row:hover {
      background: var(--secondary-background-color);
    }
    .row-main {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 8px;
      border: none;
      background: none;
      cursor: pointer;
      text-align: left;
    }
    .row-icon {
      width: 40px;
      height: 40px;
      flex: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
      transition: background 0.2s, color 0.2s;
    }
    .row.active .row-icon {
      background: rgba(255, 179, 0, 0.2);
      color: var(--fp-active-color, #ffb300);
    }
    .row.unavailable {
      opacity: 0.5;
    }
    .row-text {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .name,
    .state {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .state {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .switch {
      flex: none;
      width: 44px;
      height: 24px;
      border-radius: 12px;
      border: none;
      padding: 0;
      cursor: pointer;
      position: relative;
      background: var(--disabled-color, #bdbdbd);
      transition: background 0.2s;
      margin-right: 8px;
    }
    .switch.on {
      background: var(--primary-color);
    }
    .knob {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #fff;
      transition: transform 0.2s;
    }
    .switch.on .knob {
      transform: translateX(20px);
    }
    .run {
      flex: none;
      border: 1px solid var(--divider-color);
      background: none;
      border-radius: 16px;
      padding: 4px 12px;
      cursor: pointer;
      margin-right: 8px;
    }
    .cover-btns {
      display: flex;
      flex: none;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 0 4px;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border: 1px solid var(--divider-color);
      background: var(--secondary-background-color);
      border-radius: 18px;
      padding: 6px 14px 6px 10px;
      cursor: pointer;
      --mdc-icon-size: 18px;
    }
    .chip:hover {
      border-color: var(--primary-color);
    }
    .chip.running {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
    .chip:disabled {
      opacity: 0.5;
      cursor: default;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "fp-room-sidebar": FpRoomSidebar;
  }
}
