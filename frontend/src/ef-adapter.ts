/**
 * Adapter zwischen dem Panel und dem easy-floorplan-Port (`./ef`):
 * - die Karten-Konfiguration liegt unverändert unter `plan.ef` (Speicherung in storage.py),
 * - Änderungen des Editors (`config-changed`) gehen per WebSocket an `floorplan_panel/plan/save`
 *   statt in eine Lovelace-Ansicht,
 * - der Host stellt `_params.saveCardConfig` bereit, damit der "Apply"-Knopf des Editors
 *   (editor-save.ts) ohne Änderung funktioniert,
 * - der Raum-Klick der Karte kommt als `fp-area-tap` beim Panel an.
 */
import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { defineElement } from "./define";
import "./ef/floorplan-card";
import "./ef/editor";
import "./room-dialog";
import type { HomeAssistant } from "./ha";
import type { Area as PanelArea } from "./types";

const DOMAIN = "floorplan_panel";
const SAVE_DELAY_MS = 800;
export const EF_TYPE = "custom:fp-ef-card";

type EfConfig = Record<string, unknown>;
type RawPlan = Record<string, unknown> & { ef?: EfConfig };

interface CardLike extends HTMLElement {
  setConfig(config: EfConfig): void;
}

export function efConfigOf(plan: RawPlan | undefined): EfConfig {
  return plan?.ef ? (structuredClone(plan.ef) as EfConfig) : { type: EF_TYPE };
}

@defineElement("fp-ef-host")
export class EfHost extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) plan?: RawPlan;
  @property({ type: Number }) revision = 0;
  @property({ type: Boolean }) edit = false;
  @property({ attribute: false }) narrow = false;

  @state() private _status: "" | "saving" | "saved" | "error" = "";
  @state() private _error = "";
  @state() private _room?: PanelArea;

  private _pending?: EfConfig;
  private _timer?: ReturnType<typeof setTimeout>;
  private _saving = false;
  private _plan?: RawPlan;
  private _rev = 0;
  private _loadedEl?: Element;

  // Aussehen eines hui-dialog-edit-card für editor-save.ts
  get _params() {
    return { saveCardConfig: (config: unknown) => this._saveNow(config as EfConfig), isNew: false };
  }
  get _cardConfig(): unknown {
    return this._pending ?? this._plan?.ef;
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("plan") || changed.has("revision")) {
      this._plan = this.plan;
      this._rev = this.revision;
    }
  }

  protected updated(changed: PropertyValues): void {
    const el = this.renderRoot.querySelector<CardLike>("fp-ef-card, fp-ef-editor");
    if (!el) return;
    (el as unknown as { hass: HomeAssistant }).hass = this.hass;
    // Konfiguration nur beim Laden/Planwechsel setzen, im Editor nie nach dem Speichern
    if (this._loadedEl !== el || (!this.edit && changed.has("plan"))) {
      this._loadedEl = el;
      el.setConfig(efConfigOf(this.plan));
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._pending) void this._flush();
  }

  private _onConfigChanged = (ev: Event): void => {
    const config = (ev as CustomEvent<{ config: EfConfig }>).detail?.config;
    if (!config) return;
    ev.stopPropagation();
    this._pending = config;
    clearTimeout(this._timer);
    this._timer = setTimeout(() => void this._flush(), SAVE_DELAY_MS);
  };

  private async _flush(): Promise<void> {
    clearTimeout(this._timer);
    if (!this._pending || this._saving) {
      if (this._pending) this._timer = setTimeout(() => void this._flush(), SAVE_DELAY_MS);
      return;
    }
    const config = this._pending;
    this._pending = undefined;
    await this._saveNow(config);
  }

  private async _saveNow(config: EfConfig): Promise<void> {
    this._saving = true;
    this._status = "saving";
    this._error = "";
    try {
      const res = await this.hass.callWS<{ plan: RawPlan; revision: number }>({
        type: `${DOMAIN}/plan/save`,
        plan: { ...(this._plan ?? {}), ef: config },
        revision: this._rev,
      });
      this._plan = res.plan;
      this._rev = res.revision;
      this._status = "saved";
      this.dispatchEvent(
        new CustomEvent("ef-saved", { detail: { plan: res.plan, revision: res.revision }, bubbles: true, composed: true })
      );
    } catch (err: any) {
      this._status = "error";
      this._error = err?.code === "conflict" ? "Der Grundriss wurde inzwischen woanders geändert – bitte neu laden." : err?.message ?? String(err);
      throw err;
    } finally {
      this._saving = false;
    }
  }

  private _onAreaTap = (ev: Event): void => {
    const { areaId, zoomed } = (ev as CustomEvent<{ areaId: string; zoomed: boolean }>).detail;
    const cfg = this.plan?.ef as { floors?: { areas?: any[] }[]; areas?: any[] } | undefined;
    const lists = [...(cfg?.floors ?? []).map((f) => f.areas ?? []), cfg?.areas ?? []];
    const a = zoomed ? lists.flat().find((x) => x?.id === areaId) : undefined;
    this._room = a && a.sidebar?.length ? { ...a, name: a.name ?? "", sidebar: a.sidebar } : undefined;
  };

  private async _close(): Promise<void> {
    if (this._pending) {
      try {
        await this._flush();
      } catch {
        return;
      }
    }
    this.dispatchEvent(new CustomEvent("ef-close", { bubbles: true, composed: true }));
  }

  protected render() {
    if (!this.edit)
      return html`<fp-ef-card @fp-area-tap=${this._onAreaTap}></fp-ef-card>
        ${this._room
          ? html`<fp-room-dialog .hass=${this.hass} .area=${this._room} @close=${() => (this._room = undefined)}></fp-room-dialog>`
          : nothing}`;
    return html`
      <div class="bar">
        <button @click=${this._close}>Fertig</button>
        <span class="status ${this._status}">
          ${this._status === "saving" ? "Speichert …" : this._status === "saved" ? "Gespeichert" : this._error}
        </span>
      </div>
      <fp-ef-editor @config-changed=${this._onConfigChanged}></fp-ef-editor>
      ${nothing}
    `;
  }

  static styles = css`
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    fp-ef-card,
    fp-ef-editor {
      flex: 1;
      display: block;
      overflow: auto;
    }
    .bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 12px;
      border-bottom: 1px solid var(--divider-color);
    }
    .bar button {
      font: inherit;
      border: 1px solid var(--primary-color);
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      border-radius: 16px;
      padding: 4px 16px;
      cursor: pointer;
    }
    .status {
      color: var(--secondary-text-color);
      font-size: 13px;
    }
    .status.error {
      color: var(--error-color, #db4437);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "fp-ef-host": EfHost;
  }
}
