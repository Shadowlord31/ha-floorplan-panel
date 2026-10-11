/**
 * Eigene Ergänzung zum easy-floorplan-Editor: Raumart (inkl. freier Bezeichnung) und die
 * Seitenleiste pro Raum. Meldet Änderungen als `area-patch` (Teilobjekt des Raums).
 */
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { defineElement } from "./define";
import "./entity-picker";
import { entityIcon, entityKind, friendlyName, type HomeAssistant } from "./ha";
import { AREA_TYPES } from "./types";

type Entry = { entity: string; name?: string; icon?: string };
type AreaLike = { type?: string; typeLabel?: string; sidebar?: Entry[] };

@defineElement("fp-ef-area-extras")
export class FpEfAreaExtras extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) area!: AreaLike;

  private get _list(): Entry[] {
    return this.area.sidebar ?? [];
  }

  private _patch(patch: Record<string, unknown>): void {
    this.dispatchEvent(new CustomEvent("area-patch", { detail: patch, bubbles: true, composed: true }));
  }

  private _setSidebar(list: Entry[]): void {
    this._patch({ sidebar: list.length ? list : undefined });
  }

  private _move(i: number, dir: -1 | 1): void {
    const list = this._list.map((e) => ({ ...e }));
    const [e] = list.splice(i, 1);
    list.splice(i + dir, 0, e!);
    this._setSidebar(list);
  }

  private _rename(i: number, name: string): void {
    const list = this._list.map((e) => ({ ...e }));
    if (name) list[i]!.name = name;
    else delete list[i]!.name;
    this._setSidebar(list);
  }

  protected render() {
    const a = this.area;
    const list = this._list;
    return html`
      <label class="field">
        <span>Type</span>
        <select @change=${(ev: Event) => this._patch({ type: (ev.target as HTMLSelectElement).value })}>
          ${AREA_TYPES.map(([v, l]) => html`<option value=${v} ?selected=${(a.type ?? "room") === v}>${l}</option>`)}
        </select>
      </label>
      ${a.type === "custom"
        ? html`<label class="field">
            <span>Label</span>
            <input
              type="text"
              .value=${a.typeLabel ?? ""}
              @change=${(ev: Event) => this._patch({ typeLabel: (ev.target as HTMLInputElement).value.trim() || undefined })}
            />
          </label>`
        : nothing}
      <h4>Sidebar</h4>
      <p class="muted">Only what is listed here appears when the room is tapped: devices, scenes and scripts.</p>
      ${list.map(
        (e, i) => html`<div class="row">
          <ha-icon .icon=${entityIcon(this.hass, e.entity, e.icon)}></ha-icon>
          <div class="main">
            <input
              type="text"
              .value=${e.name ?? ""}
              placeholder=${friendlyName(this.hass, e.entity)}
              @change=${(ev: Event) => this._rename(i, (ev.target as HTMLInputElement).value.trim())}
            />
            <small>${e.entity} · ${{ device: "device", scene: "scene", script: "script" }[entityKind(e.entity)]}${this.hass.states[e.entity] ? "" : " · not found"}</small>
          </div>
          <button title="Up" ?disabled=${i === 0} @click=${() => this._move(i, -1)}><ha-icon icon="mdi:chevron-up"></ha-icon></button>
          <button title="Down" ?disabled=${i === list.length - 1} @click=${() => this._move(i, 1)}><ha-icon icon="mdi:chevron-down"></ha-icon></button>
          <button title="Remove" @click=${() => this._setSidebar(list.filter((_, j) => j !== i))}><ha-icon icon="mdi:close"></ha-icon></button>
        </div>`
      )}
      <fp-entity-picker
        .hass=${this.hass}
        .exclude=${list.map((e) => e.entity)}
        clearOnSelect
        placeholder="Add device, scene or script …"
        @value-changed=${(ev: CustomEvent<{ value: string }>) => {
          ev.stopPropagation();
          if (ev.detail.value) this._setSidebar([...list, { entity: ev.detail.value }]);
        }}
      ></fp-entity-picker>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-bottom: 8px;
      font-size: 13px;
    }
    select,
    input {
      font: inherit;
      padding: 6px;
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      box-sizing: border-box;
      width: 100%;
    }
    h4 {
      margin: 12px 0 4px;
    }
    .muted,
    small {
      color: var(--secondary-text-color);
      font-size: 12px;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 6px;
    }
    .main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }
    button {
      border: none;
      background: none;
      color: inherit;
      cursor: pointer;
      padding: 4px;
      line-height: 0;
    }
    button:disabled {
      opacity: 0.3;
      cursor: default;
    }
  `;
}
