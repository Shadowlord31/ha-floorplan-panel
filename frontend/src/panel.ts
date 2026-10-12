/**
 * Das Sidebar-Panel `floorplan-panel`: lädt den Grundriss über die WebSocket-API und zeigt
 * ihn mit dem easy-floorplan-Port (`fp-ef-host`) an – in der Ansicht und im Editor.
 */
import { defineElement } from "./define";
import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import "./ef-adapter";
import type { EfHost } from "./ef-adapter";
import type { HomeAssistant } from "./ha";

const DOMAIN = "floorplan_panel";

type RawPlan = Record<string, unknown>;

type PanelEvent =
  | { type: "plan_updated"; revision: number }
  | { type: "show_room"; room: string; floor?: string | null }
  | { type: "reset_view" };

@defineElement("floorplan-panel")
export class FloorplanPanel extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Boolean, reflect: true }) narrow = false;
  @property({ type: Boolean, reflect: true }) kiosk = false;
  @property({ attribute: false }) panel?: { config?: { version?: string } };

  @state() private _plan?: RawPlan;
  @state() private _edit = false;
  @state() private _revision = 0;
  @state() private _error?: string;

  private _unsub?: () => Promise<void>;
  private _loading = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.kiosk = new URLSearchParams(location.search).has("kiosk");
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
      const res = await this.hass.callWS<{ plan: RawPlan; revision: number }>({ type: `${DOMAIN}/plan/get` });
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

  private _setPlan(plan: RawPlan, revision: number): void {
    this._plan = plan;
    this._revision = revision;
  }

  private async _onEvent(ev: PanelEvent): Promise<void> {
    if (ev.type === "plan_updated") {
      // Im Editor nicht dazwischenfunken – der erkennt den Konflikt beim Speichern
      if (ev.revision !== this._revision && !this._edit) await this._load();
    } else if (ev.type === "show_room") {
      this._host()?.showRoom(ev.room, ev.floor);
    } else if (ev.type === "reset_view") {
      this._host()?.resetView();
    }
  }

  private _host(): EfHost | null {
    return this.renderRoot.querySelector<EfHost>("fp-ef-host");
  }

  private get _isAdmin(): boolean {
    return !!this.hass?.user?.is_admin;
  }

  /** Öffnet/schließt die HA-Seitenleiste (auf schmalen Bildschirmen). */
  private _toggleMenu(): void {
    this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: true, composed: true }));
  }

  private _onEfSaved(ev: CustomEvent<{ plan: RawPlan; revision: number }>): void {
    this._setPlan(ev.detail.plan, ev.detail.revision);
  }

  protected render() {
    return html`
      <div class="toolbar">
        ${this.narrow
          ? html`<button class="icon-btn" title="Menü" @click=${this._toggleMenu}><ha-icon icon="mdi:menu"></ha-icon></button>`
          : html`<span class="spacer"></span>`}
        <div class="main-title">Grundriss</div>
        ${this._isAdmin && this._plan && !this._edit
          ? html`<button class="icon-btn" title="Grundriss bearbeiten" @click=${() => (this._edit = true)}>
              <ha-icon icon="mdi:pencil-ruler"></ha-icon>
            </button>`
          : nothing}
      </div>
      ${this._error
        ? html`<div class="message error">Grundriss konnte nicht geladen werden: ${this._error}</div>`
        : !this._plan
        ? html`<div class="message">Lade …</div>`
        : html`<fp-ef-host
            .hass=${this.hass}
            .plan=${this._plan}
            .revision=${this._revision}
            .edit=${this._edit}
            .kiosk=${this.kiosk}
            @ef-saved=${this._onEfSaved}
            @ef-edit-request=${() => (this._edit = true)}
            @ef-close=${() => (this._edit = false)}
          ></fp-ef-host>`}
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
    :host([kiosk]) .toolbar {
      display: none;
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
    fp-ef-host {
      flex: 1;
    }
    .main-title {
      flex: 1;
      font-size: 20px;
      margin-left: 8px;
    }
    button {
      font: inherit;
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
    .message {
      margin: auto;
      text-align: center;
      color: var(--secondary-text-color);
      padding: 24px;
    }
    .message.error {
      color: var(--error-color, #db4437);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "floorplan-panel": FloorplanPanel;
  }
}
