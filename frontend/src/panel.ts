/**
 * Das Sidebar-Panel `floorplan-panel`: lädt den Grundriss über die WebSocket-API,
 * zeigt Etagen, Zoom und das Raum-Popup und schaltet in den Editor um.
 */
import { defineElement } from "./define";
import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import "./editor";
import type { HomeAssistant } from "./ha";
import "./plan-view";
import "./room-dialog";
import { normalizePlan, type Plan } from "./types";

const DOMAIN = "floorplan_panel";

type PanelEvent =
  | { type: "plan_updated"; revision: number }
  | { type: "show_room"; room: string; floor?: string | null }
  | { type: "reset_view" };

@defineElement("floorplan-panel")
export class FloorplanPanel extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Boolean, reflect: true }) narrow = false;
  @property({ attribute: false }) panel?: { config?: { version?: string } };

  @state() private _plan?: Plan;
  @state() private _revision = 0;
  @state() private _floorId?: string;
  @state() private _zoomedAreaId?: string;
  @state() private _editing = false;
  @state() private _editRoomId?: string;
  @state() private _error?: string;

  private _unsub?: () => Promise<void>;
  private _loading = false;

  connectedCallback(): void {
    super.connectedCallback();
    if (this.hass && !this._plan) this._load();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unsub?.();
    this._unsub = undefined;
  }

  protected willUpdate(): void {
    if (this.hass && !this._plan && !this._loading && !this._error) this._load();
  }

  private async _load(): Promise<void> {
    this._loading = true;
    try {
      const res = await this.hass.callWS<{ plan: Plan; revision: number }>({ type: `${DOMAIN}/plan/get` });
      this._setPlan(res.plan, res.revision);
      if (!this._unsub) {
        this._unsub = await this.hass.connection.subscribeMessage<PanelEvent>((ev) => this._onEvent(ev), {
          type: `${DOMAIN}/subscribe`,
        });
      }
    } catch (err: any) {
      this._error = err?.message ?? String(err);
    } finally {
      this._loading = false;
    }
  }

  private _setPlan(raw: Plan, revision: number): void {
    const plan = normalizePlan(raw);
    this._plan = plan;
    this._revision = revision;
    if (!plan.floors.some((f) => f.id === this._floorId)) this._floorId = plan.floors[0]?.id;
    const floor = plan.floors.find((f) => f.id === this._floorId);
    if (!floor?.areas.some((a) => a.id === this._zoomedAreaId)) this._zoomedAreaId = undefined;
  }

  private async _onEvent(ev: PanelEvent): Promise<void> {
    if (ev.type === "plan_updated") {
      // Im Editor nicht dazwischenfunken – der erkennt den Konflikt beim Speichern
      if (ev.revision !== this._revision && !this._editing) await this._load();
    } else if (ev.type === "show_room") {
      this._showRoom(ev.room, ev.floor ?? undefined);
    } else if (ev.type === "reset_view") {
      this._zoomedAreaId = undefined;
    }
  }

  private _showRoom(room: string, floorId?: string): void {
    if (!this._plan || this._editing) return;
    const needle = room.toLowerCase();
    for (const floor of this._plan.floors) {
      if (floorId && floor.id !== floorId) continue;
      const area = floor.areas.find((a) => a.id === room || a.name.toLowerCase() === needle);
      if (area) {
        this._floorId = floor.id;
        this._zoomedAreaId = area.id;
        return;
      }
    }
  }

  private get _isAdmin(): boolean {
    return !!this.hass?.user?.is_admin;
  }

  private _onAreaClick(ev: CustomEvent<{ id: string }>): void {
    this._zoomedAreaId = this._zoomedAreaId === ev.detail.id ? undefined : ev.detail.id;
  }

  /** Öffnet/schließt die HA-Seitenleiste (auf schmalen Bildschirmen). */
  private _toggleMenu(): void {
    this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: true, composed: true }));
  }

  private _openEditor(roomId?: string): void {
    this._editRoomId = roomId;
    this._editing = true;
  }

  private _onEditorDone(ev: CustomEvent<{ plan?: Plan; revision?: number }>): void {
    if (ev.detail?.plan && ev.detail.revision !== undefined) this._setPlan(ev.detail.plan, ev.detail.revision);
    this._editing = false;
    this._editRoomId = undefined;
  }

  private async _loadSample(): Promise<void> {
    try {
      const res = await this.hass.callWS<{ plan: Plan; revision: number }>({ type: `${DOMAIN}/plan/load_sample` });
      this._setPlan(res.plan, res.revision);
    } catch (err: any) {
      this._error = err?.message ?? String(err);
    }
  }

  protected render() {
    if (this._editing && this._plan) {
      return html`<fp-editor
        .hass=${this.hass}
        .plan=${this._plan}
        .revision=${this._revision}
        .floorId=${this._floorId}
        .initialAreaId=${this._editRoomId}
        .narrow=${this.narrow}
        @editor-done=${this._onEditorDone}
      ></fp-editor>`;
    }
    const plan = this._plan;
    const floor = plan?.floors.find((f) => f.id === this._floorId);
    const zoomed = floor?.areas.find((a) => a.id === this._zoomedAreaId);
    const isEmpty = !!floor && !floor.walls.length && !floor.areas.length && !floor.items.length;
    return html`
      <div class="toolbar">
        ${this.narrow
          ? html`<button class="icon-btn" title="Menü" @click=${this._toggleMenu}><ha-icon icon="mdi:menu"></ha-icon></button>`
          : html`<span class="spacer"></span>`}
        <div class="main-title">Grundriss</div>
        ${plan && plan.floors.length > 1
          ? html`<div class="floors">
              ${plan.floors.map(
                (f) => html`<button
                  class="floor-btn ${f.id === this._floorId ? "active" : ""}"
                  @click=${() => {
                    this._floorId = f.id;
                    this._zoomedAreaId = undefined;
                  }}
                >
                  ${f.name || f.id}
                </button>`
              )}
            </div>`
          : nothing}
        ${this._isAdmin && plan
          ? html`<button class="icon-btn" title="Grundriss bearbeiten" @click=${() => this._openEditor()}>
              <ha-icon icon="mdi:pencil-ruler"></ha-icon>
            </button>`
          : nothing}
      </div>
      ${this._error
        ? html`<div class="message error">Grundriss konnte nicht geladen werden: ${this._error}</div>`
        : !plan
        ? html`<div class="message">Lade …</div>`
        : !floor || isEmpty
        ? html`<div class="message">
            <ha-icon icon="mdi:floor-plan" class="big"></ha-icon>
            <p>Noch kein Grundriss gezeichnet.</p>
            ${this._isAdmin
              ? html`<div class="actions">
                  <button class="primary" @click=${() => this._openEditor()}>Editor öffnen</button>
                  <button @click=${this._loadSample}>Beispiel-Grundriss laden</button>
                </div>`
              : html`<p>Ein Administrator kann ihn im Editor anlegen.</p>`}
          </div>`
        : html`<div class="body">
            <fp-plan-view
              .hass=${this.hass}
              .plan=${plan}
              .floor=${floor}
              .zoomedAreaId=${this._zoomedAreaId}
              .popupOpen=${!!zoomed}
              @area-click=${this._onAreaClick}
              @background-click=${() => (this._zoomedAreaId = undefined)}
            ></fp-plan-view>
            ${zoomed
              ? html`<fp-room-dialog
                  .hass=${this.hass}
                  .area=${zoomed}
                  .canEdit=${this._isAdmin}
                  @close=${() => (this._zoomedAreaId = undefined)}
                  @edit-room=${(ev: CustomEvent<{ id: string }>) => this._openEditor(ev.detail.id)}
                ></fp-room-dialog>`
              : nothing}
          </div>`}
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      /* HA gibt dem Panel-Container keine Höhe vor: volle Fensterhöhe (dvh: mobile Adressleiste) */
      height: 100vh;
      height: 100dvh;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
    }
    .toolbar {
      display: flex;
      align-items: center;
      gap: 8px;
      height: var(--header-height, 56px);
      padding: 0 12px 0 4px;
      box-sizing: border-box;
      background: var(--app-header-background-color, var(--primary-color));
      color: var(--app-header-text-color, #fff);
      border-bottom: var(--app-header-border-bottom, none);
      flex: none;
    }
    .spacer {
      width: 8px;
    }
    fp-editor {
      flex: 1;
      min-height: 0;
    }
    .main-title {
      flex: 1;
      font-size: 20px;
      margin-left: 8px;
    }
    .floors {
      display: flex;
      gap: 4px;
    }
    button {
      font: inherit;
    }
    .floor-btn {
      border: 1px solid rgba(255, 255, 255, 0.5);
      background: none;
      color: inherit;
      border-radius: 16px;
      padding: 4px 12px;
      cursor: pointer;
    }
    .floor-btn.active {
      background: rgba(255, 255, 255, 0.25);
    }
    .icon-btn {
      border: none;
      background: none;
      color: inherit;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      line-height: 0;
    }
    .icon-btn:hover {
      background: rgba(255, 255, 255, 0.15);
    }
    .body {
      flex: 1;
      min-height: 0;
      display: flex;
      position: relative;
    }
    fp-plan-view {
      flex: 1;
    }
    .message {
      margin: auto;
      text-align: center;
      color: var(--secondary-text-color);
      padding: 24px;
    }
    .message.error {
      color: var(--error-color, #db4437);
    }
    .big {
      --mdc-icon-size: 64px;
      opacity: 0.5;
    }
    .actions {
      display: flex;
      gap: 8px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .actions button {
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border-radius: 18px;
      padding: 8px 16px;
      cursor: pointer;
    }
    .actions button.primary {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "floorplan-panel": FloorplanPanel;
  }
}
