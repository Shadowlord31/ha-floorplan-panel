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
import "./room-sidebar";
import type { HomeAssistant } from "./ha";
import type { Area as PanelArea } from "./types";
import "./card-list-editor";
import { migrateEfCards } from "./area-cards";
import { parseEfImport, type EfImport } from "./ef-import";

const DOMAIN = "floorplan_panel";
const SAVE_DELAY_MS = 800;
const NARROW_PX = 700;
type CardConfig = Record<string, unknown>;
const AUTO_RESET_MS = 5 * 60 * 1000;
export const EF_TYPE = "custom:fp-ef-card";

type EfConfig = Record<string, unknown>;
type RawPlan = Record<string, unknown> & { ef?: EfConfig };

interface FpCard extends HTMLElement {
  showRoom(room: string, floor?: string | null): boolean;
  resetView(): void;
}

interface CardLike extends HTMLElement {
  setConfig(config: EfConfig): void;
}

export function efConfigOf(plan: RawPlan | undefined): EfConfig {
  return plan?.ef ? (structuredClone(migrateEfCards(plan.ef)) as EfConfig) : { type: EF_TYPE };
}

@defineElement("fp-ef-host")
export class EfHost extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) plan?: RawPlan;
  @property({ type: Number }) revision = 0;
  @property({ type: Boolean }) edit = false;
  @property({ type: Boolean }) kiosk = false;
  @property({ attribute: false }) narrow = false;

  @state() private _status: "" | "saving" | "saved" | "error" = "";
  @state() private _error = "";
  @state() private _room?: PanelArea;
  @state() private _narrow = false;
  // Beide Seitenleisten-Zweige bleiben im DOM (nur per hidden umgeschaltet): kein Mount/Unmount während der Zoom-Animation.
  private _lastRoom?: PanelArea;
  private _resetTimer?: ReturnType<typeof setTimeout>;
  private _ro?: ResizeObserver;
  @state() private _importText = "";
  @state() private _importError = "";

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

  connectedCallback(): void {
    super.connectedCallback();
    this._ro = new ResizeObserver(() => (this._narrow = this.clientWidth < NARROW_PX));
    this._ro.observe(this);
    void (window as unknown as { loadCardHelpers?: () => Promise<unknown> }).loadCardHelpers?.();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._ro?.disconnect();
    clearTimeout(this._resetTimer);
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
    const a = zoomed ? this._allAreas().find((x) => x.id === areaId) : undefined;
    this._room = a && a.cards?.length ? a : undefined;
    this._armResetTimer();
  };

  /** Auto-Reset: ohne Bedienung der Seitenleiste springt die Ansicht nach 5 Minuten zur Übersicht (derselbe Weg wie der Dienst reset_view). */
  private _armResetTimer = (): void => {
    clearTimeout(this._resetTimer);
    if (!this._room) return;
    const ms = Number(localStorage.getItem("fp-reset-ms")) || AUTO_RESET_MS;
    this._resetTimer = setTimeout(() => this.resetView(), ms);
  };

  private _allAreas(): PanelArea[] {
    const ef = this.plan?.ef ? (migrateEfCards(this.plan.ef) as { floors?: { areas?: any[] }[]; areas?: any[] }) : undefined;
    return [...(ef?.floors ?? []).flatMap((f) => f.areas ?? []), ...(ef?.areas ?? [])]
      .filter((a) => a?.id)
      .map((a) => ({ ...a, name: a.name ?? a.id, cards: Array.isArray(a.cards) ? a.cards : [] }));
  }

  private _rooms(): PanelArea[] {
    return this._allAreas().filter((a) => a.cards.length);
  }

  private _closeRoom = (): void => {
    this.resetView();
    this._room = undefined;
    clearTimeout(this._resetTimer);
  };

  /** Dienst floorplan_panel.show_room: nur in der Ansicht, nicht im Editor. */
  public showRoom(room: string, floor?: string | null): boolean {
    if (this.edit) return false;
    return this.renderRoot.querySelector<FpCard>("fp-ef-card")?.showRoom(room, floor) ?? false;
  }

  /** Dienst floorplan_panel.reset_view. */
  public resetView(): void {
    if (this.edit) return;
    this.renderRoot.querySelector<FpCard>("fp-ef-card")?.resetView();
    this._room = undefined;
    clearTimeout(this._resetTimer);
  }

  private _fire(name: string): void {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  private async _loadSample(): Promise<void> {
    try {
      const res = await this.hass.callWS<{ plan: RawPlan; revision: number }>({ type: `${DOMAIN}/plan/load_sample` });
      this._plan = res.plan;
      this._rev = res.revision;
      this.dispatchEvent(
        new CustomEvent("ef-saved", { detail: { plan: res.plan, revision: res.revision }, bubbles: true, composed: true })
      );
    } catch (err: any) {
      this._status = "error";
      this._error = err?.message ?? String(err);
    }
  }

  private _dialog(): HTMLDialogElement | null {
    return this.renderRoot.querySelector<HTMLDialogElement>("dialog.import");
  }

  private _openImport = (): void => {
    this._importText = "";
    this._importError = "";
    this._dialog()?.showModal();
  };

  private async _onImportFile(ev: Event): Promise<void> {
    const file = (ev.target as HTMLInputElement).files?.[0];
    if (file) this._importText = await file.text();
  }

  private _applyImport(): void {
    let res: EfImport;
    try {
      res = parseEfImport(this._importText);
    } catch (err: any) {
      this._importError = err.message;
      return;
    }
    const editor = this.renderRoot.querySelector<CardLike>("fp-ef-editor");
    editor?.setConfig(res.config);
    // Nur ein Entwurf: gespeichert wird erst mit „Apply“ oder „Fertig“.
    this._pending = res.config;
    this._dialog()?.close();
  }

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

  private _sidebarCards(): Record<string, unknown>[] {
    const c = (this.plan?.settings as { sidebarCards?: unknown } | undefined)?.sidebarCards;
    return Array.isArray(c) ? (c as Record<string, unknown>[]) : [];
  }

  private _cardsEditor(): { open(): void } | null {
    return this.renderRoot.querySelector("fp-card-list-editor");
  }

  private _openCards = (): void => this._cardsEditor()?.open();

  private _saveCards = async (cards: CardConfig[]): Promise<void> => {
    const settings = { ...((this._plan?.settings as object) ?? {}), sidebarCards: cards };
    const res = await this.hass.callWS<{ plan: RawPlan; revision: number }>({
      type: `${DOMAIN}/plan/save`,
      plan: { ...(this._plan ?? this.plan ?? {}), settings },
      revision: this._rev,
    });
    this._plan = res.plan;
    this._rev = res.revision;
    this.dispatchEvent(
      new CustomEvent("ef-saved", { detail: { plan: res.plan, revision: res.revision }, bubbles: true, composed: true })
    );
  };

  private _renderIdle() {
    const rooms = this._rooms();
    const cards = this._sidebarCards();
    const admin = !!this.hass?.user?.is_admin && !this.kiosk;
    const edit = admin
      ? html`<button class="cards-edit" title="Karten der Übersicht bearbeiten" @click=${this._openCards}>
          <ha-icon icon="mdi:pencil"></ha-icon>Übersicht-Karten
        </button>`
      : nothing;
    if (cards.length)
      return html`<div class="idle">
        ${cards.map((c) => html`<hui-card .hass=${this.hass} .config=${c}></hui-card>`)} ${edit}
      </div>`;
    return html`<div class="idle">
      <h3>Übersicht</h3>
      <p>Raum im Plan antippen, um seine Geräte, Szenen und Skripte zu sehen.</p>
      ${rooms.map(
        (r) => html`<button @click=${() => this.showRoom(r.id)}><ha-icon icon="mdi:floor-plan"></ha-icon>${r.name}</button>`
      )}
      ${edit}
    </div>`;
  }

  protected render() {
    if (!this.edit && !this.plan?.ef) {
      const admin = !!this.hass?.user?.is_admin;
      return html`<div class="empty">
        <ha-icon icon="mdi:floor-plan"></ha-icon>
        <p>Noch kein Grundriss gezeichnet.</p>
        ${this._status === "error" ? html`<p class="err">${this._error}</p>` : nothing}
        ${admin
          ? html`<div class="row">
              <button class="primary" @click=${() => this._fire("ef-edit-request")}>Editor öffnen</button>
              <button @click=${this._loadSample}>Beispiel-Grundriss laden</button>
            </div>`
          : html`<p>Ein Administrator kann ihn im Editor anlegen oder importieren.</p>`}
      </div>`;
    }
    this._lastRoom = this._room ?? this._lastRoom ?? this._rooms()[0];
    if (!this.edit)
      return html`<div class="layout ${this._narrow ? "narrow" : ""}">
        <fp-ef-card @fp-area-tap=${this._onAreaTap}></fp-ef-card>
        <fp-card-list-editor
          .hass=${this.hass}
          .cards=${this._sidebarCards()}
          .save=${this._saveCards}
          heading="Karten der Übersicht"
          hint="Karten, die in der Seitenleiste angezeigt werden, solange kein Raum aktiv ist. Ohne Karten erscheint die Raumliste."
        ></fp-card-list-editor>
        <aside class="side" @pointerdown=${this._armResetTimer} @keydown=${this._armResetTimer} @change=${this._armResetTimer}>
          <div class="idle-wrap" ?hidden=${!!this._room}>${this._renderIdle()}</div>
          ${this._lastRoom
            ? html`<fp-room-sidebar
                ?hidden=${!this._room}
                .hass=${this.hass}
                .area=${this._lastRoom}
                .canEdit=${false}
                @close=${this._closeRoom}
              ></fp-room-sidebar>`
            : nothing}
        </aside>
      </div>`;
    return html`
      <fp-ef-editor
        .panelMode=${true}
        .panelError=${this._status === "error" ? this._error : ""}
        @config-changed=${this._onConfigChanged}
        @ef-done=${this._close}
        @ef-import-request=${this._openImport}
      ></fp-ef-editor>
      <dialog class="import">
        <h3>easy-floorplan-Konfiguration importieren</h3>
        <p>
          YAML oder JSON einer bestehenden <code>custom:easy-floorplan-card</code> einfügen oder als Datei wählen.
          Das Ergebnis ersetzt den aktuellen Entwurf im Editor und wird erst mit „Apply“ oder „Fertig“ gespeichert.
          Die alte Karte wird nicht verändert.
        </p>
        <input type="file" accept=".yaml,.yml,.json,.txt" @change=${this._onImportFile} />
        <textarea
          rows="12"
          placeholder="type: custom:easy-floorplan-card …"
          .value=${this._importText}
          @input=${(e: Event) => (this._importText = (e.target as HTMLTextAreaElement).value)}
        ></textarea>
        ${this._importError ? html`<div class="err">${this._importError}</div>` : nothing}
        <div class="row">
          <button @click=${() => this._dialog()?.close()}>Abbrechen</button>
          <button class="primary" ?disabled=${!this._importText.trim()} @click=${this._applyImport}>Als Entwurf laden</button>
        </div>
      </dialog>
    `;
  }

  static styles = css`
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .layout {
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: row;
    }
    .layout.narrow {
      flex-direction: column;
    }
    .layout fp-ef-card {
      flex: 1;
      min-width: 0;
      min-height: 0;
    }
    .side {
      flex: none;
      width: 380px;
      display: flex;
      flex-direction: column;
      min-height: 0;
      overflow: auto;
      border-left: 1px solid var(--divider-color);
      background: var(--card-background-color, #fff);
    }
    .layout.narrow .side {
      width: auto;
      height: 40%;
      border-left: none;
      border-top: 1px solid var(--divider-color);
    }
    .idle-wrap[hidden],
    .side fp-room-sidebar[hidden] {
      display: none;
    }
    .side fp-room-sidebar {
      flex: 1;
      min-height: 0;
    }
    .idle {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .idle .cards-edit {
      align-self: flex-start;
      font-size: 12px;
      padding: 4px 10px;
      color: var(--secondary-text-color);
    }
    .idle h3 {
      margin: 0;
    }
    .idle p {
      margin: 0 0 8px;
      color: var(--secondary-text-color);
    }
    .idle button {
      font: inherit;
      display: flex;
      align-items: center;
      gap: 8px;
      border: 1px solid var(--divider-color);
      background: none;
      color: var(--primary-text-color);
      border-radius: 12px;
      padding: 10px 12px;
      cursor: pointer;
      text-align: left;
    }
    fp-ef-card,
    fp-ef-editor {
      flex: 1;
      display: block;
      overflow: auto;
    }
    dialog.import {
      width: min(640px, 92vw);
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
    }
    dialog.import textarea {
      width: 100%;
      box-sizing: border-box;
      font: 12px monospace;
      margin-top: 8px;
    }
    dialog.import .row {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 8px;
    }
    dialog.import button {
      font: inherit;
      border: 1px solid var(--primary-color);
      background: transparent;
      color: var(--primary-color);
      border-radius: 16px;
      padding: 4px 16px;
      cursor: pointer;
    }
    dialog.import button.primary {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    dialog.import button:disabled {
      opacity: 0.5;
    }
    dialog.import .err {
      color: var(--error-color, #db4437);
      margin-top: 8px;
    }
    .empty {
      margin: auto;
      text-align: center;
      color: var(--secondary-text-color);
      padding: 24px;
    }
    .empty ha-icon {
      --mdc-icon-size: 64px;
      opacity: 0.5;
    }
    .empty .err {
      color: var(--error-color, #db4437);
    }
    .empty .row {
      display: flex;
      gap: 8px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .empty button {
      font: inherit;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border-radius: 18px;
      padding: 8px 16px;
      cursor: pointer;
    }
    .empty button.primary {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "fp-ef-host": EfHost;
  }
}
