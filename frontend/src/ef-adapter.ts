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
import { dump, load } from "js-yaml";
import { parseCardsYaml } from "./cards-yaml";
import { parseEfImport, type EfImport } from "./ef-import";

const DOMAIN = "floorplan_panel";
const SAVE_DELAY_MS = 800;
const NARROW_PX = 700;
const CARD_TYPES: [string, string][] = [
  ["entities", "Entities"],
  ["glance", "Glance"],
  ["weather-forecast", "Wettervorhersage"],
  ["sensor", "Sensor"],
  ["light", "Licht"],
  ["markdown", "Markdown"],
  ["button", "Button"],
  ["vertical-stack", "Stapel (vertikal)"],
  ["horizontal-stack", "Stapel (horizontal)"],
];

type CardConfig = Record<string, unknown>;
interface CardEdit {
  index: number;
  yaml: boolean;
  yamlText: string;
  error: string;
}
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
  return plan?.ef ? (structuredClone(plan.ef) as EfConfig) : { type: EF_TYPE };
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
  @state() private _cardsDraft: CardConfig[] = [];
  @state() private _cardsError = "";
  @state() private _cardEdit?: CardEdit;
  @state() private _cardsPaste?: { text: string; error: string };
  @state() private _addType = "entities";
  @state() private _customType = "";

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
    const cfg = this.plan?.ef as { floors?: { areas?: any[] }[]; areas?: any[] } | undefined;
    const lists = [...(cfg?.floors ?? []).map((f) => f.areas ?? []), cfg?.areas ?? []];
    const a = zoomed ? lists.flat().find((x) => x?.id === areaId) : undefined;
    this._room = a && a.sidebar?.length ? { ...a, name: a.name ?? "", sidebar: a.sidebar } : undefined;
    this._armResetTimer();
  };

  /** Auto-Reset: ohne Bedienung der Seitenleiste springt die Ansicht nach 5 Minuten zur Übersicht (derselbe Weg wie der Dienst reset_view). */
  private _armResetTimer = (): void => {
    clearTimeout(this._resetTimer);
    if (!this._room) return;
    const ms = Number(localStorage.getItem("fp-reset-ms")) || AUTO_RESET_MS;
    this._resetTimer = setTimeout(() => this.resetView(), ms);
  };

  private _rooms(): PanelArea[] {
    const cfg = this.plan?.ef as { floors?: { areas?: any[] }[]; areas?: any[] } | undefined;
    return [...(cfg?.floors ?? []).flatMap((f) => f.areas ?? []), ...(cfg?.areas ?? [])]
      .filter((a) => a?.sidebar?.length)
      .map((a) => ({ ...a, name: a.name ?? a.id, sidebar: a.sidebar }));
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

  private _cardsDialog(): HTMLDialogElement | null {
    return this.renderRoot.querySelector<HTMLDialogElement>("dialog.cards");
  }

  private _openCards = (): void => {
    this._cardsDraft = structuredClone(this._sidebarCards());
    this._cardsError = "";
    this._cardEdit = undefined;
    this._cardsPaste = undefined;
    this._cardsDialog()?.showModal();
  };

  private _moveCard(i: number, d: number): void {
    const list = [...this._cardsDraft];
    const j = i + d;
    if (j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j], list[i]];
    this._cardsDraft = list;
  }

  private _removeCard(i: number): void {
    this._cardsDraft = this._cardsDraft.filter((_, k) => k !== i);
  }

  private _cardLabel(c: CardConfig): string {
    const t = String(c.type ?? "?").replace(/^custom:/, "");
    const title = c.title ?? c.name;
    return title ? `${t} – ${title}` : t;
  }

  /** Karten-Klasse über die öffentliche loadCardHelpers-Schnittstelle laden (lädt eingebaute Karten lazy nach). */
  private async _cardCtor(type: string): Promise<any> {
    const tag = type.startsWith("custom:") ? type.slice(7) : `hui-${type}-card`;
    try {
      const helpers = await (window as unknown as { loadCardHelpers?: () => Promise<any> }).loadCardHelpers?.();
      helpers?.createCardElement({ type, entities: [] });
    } catch {
      /* Typ unbekannt – unten greift der YAML-Fallback */
    }
    await Promise.race([customElements.whenDefined(tag), new Promise((r) => setTimeout(r, 3000))]);
    return customElements.get(tag);
  }

  private async _addCard(): Promise<void> {
    if (this._addType === "__yaml") {
      this._cardsDraft = [...this._cardsDraft, { type: "" }];
      this._cardEdit = { index: this._cardsDraft.length - 1, yaml: true, yamlText: "type: ", error: "" };
      return;
    }
    const type = this._addType === "__custom" ? this._customType.trim() : this._addType;
    if (!type) return;
    const full = this._addType === "__custom" && !type.startsWith("custom:") ? `custom:${type}` : type;
    const ctor = await this._cardCtor(full);
    let config: CardConfig = { type: full };
    try {
      const stub = await ctor?.getStubConfig?.(this.hass, Object.keys(this.hass.states ?? {}), []);
      if (stub && typeof stub === "object") config = { ...stub, type: full };
    } catch {
      /* Stub optional */
    }
    this._cardsDraft = [...this._cardsDraft, config];
    await this._editCard(this._cardsDraft.length - 1);
  }

  private async _editCard(i: number): Promise<void> {
    const config = this._cardsDraft[i];
    const ctor = await this._cardCtor(String(config.type ?? ""));
    const hasEditor = typeof ctor?.getConfigElement === "function";
    this._cardEdit = { index: i, yaml: !hasEditor, yamlText: dump(config, { lineWidth: 100 }), error: "" };
    if (!hasEditor) return;
    await this.updateComplete;
    const host = this.renderRoot.querySelector<HTMLElement>(".card-editor-host");
    if (!host) return;
    try {
      const el: any = await ctor.getConfigElement();
      el.hass = this.hass;
      el.lovelace = { views: [] }; // hui-card-picker (Stack-Editor) rendert ohne lovelace nichts
      el.setConfig(config);
      el.addEventListener("config-changed", (ev: Event) => {
        ev.stopPropagation();
        const c = (ev as CustomEvent<{ config?: CardConfig }>).detail?.config;
        if (c) this._cardsDraft = this._cardsDraft.map((x, k) => (k === i ? c : x));
      });
      host.replaceChildren(el);
    } catch {
      this._cardEdit = { index: i, yaml: true, yamlText: dump(config, { lineWidth: 100 }), error: "" };
    }
  }

  private _applyPaste(append: boolean): void {
    const p = this._cardsPaste;
    if (!p) return;
    try {
      const cards = parseCardsYaml(p.text);
      this._cardsDraft = append ? [...this._cardsDraft, ...cards] : cards;
      this._cardsPaste = undefined;
    } catch (err: any) {
      this._cardsPaste = { ...p, error: err?.message ?? String(err) };
    }
  }

  private _finishCardEdit(): void {
    const e = this._cardEdit;
    if (!e) return;
    if (e.yaml) {
      try {
        const c = load(e.yamlText) as CardConfig;
        if (!c || typeof c !== "object" || Array.isArray(c) || !c.type) throw new Error("Eine Karte braucht `type:`.");
        this._cardsDraft = this._cardsDraft.map((x, k) => (k === e.index ? c : x));
      } catch (err: any) {
        this._cardEdit = { ...e, error: err?.message ?? String(err) };
        return;
      }
    }
    this._cardEdit = undefined;
  }

  private async _saveCards(): Promise<void> {
    const cards = this._cardsDraft.filter((c) => c && c.type);
    try {
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
      this._cardsDialog()?.close();
    } catch (err: any) {
      this._cardsError = err?.message ?? String(err);
    }
  }

  private _renderCardsDialog() {
    const e = this._cardEdit;
    const p = this._cardsPaste;
    return html`<dialog class="import cards">
      <h3>Karten der Übersicht</h3>
      ${p
        ? html`<p>
              Kartenliste (<code>- type: …</code>) oder YAML einer Ansicht mit <code>cards:</code> einfügen. Titel, Pfad
              und Badges werden ignoriert.
            </p>
            <textarea
              rows="14"
              .value=${p.text}
              @input=${(ev: Event) => (this._cardsPaste = { ...p, text: (ev.target as HTMLTextAreaElement).value })}
            ></textarea>
            ${p.error ? html`<div class="err">${p.error}</div>` : nothing}
            <div class="row">
              <button @click=${() => (this._cardsPaste = undefined)}>Zurück</button>
              <button ?disabled=${!p.text.trim()} @click=${() => this._applyPaste(true)}>Anhängen</button>
              <button class="primary" ?disabled=${!p.text.trim()} @click=${() => this._applyPaste(false)}>Ersetzen</button>
            </div>`
      : e
        ? html`<p>${this._cardLabel(this._cardsDraft[e.index] ?? {})}</p>
            ${e.yaml
              ? html`<p>Für diesen Kartentyp gibt es keinen Editor – Konfiguration als YAML:</p>
                  <textarea
                    rows="12"
                    .value=${e.yamlText}
                    @input=${(ev: Event) => (this._cardEdit = { ...e, yamlText: (ev.target as HTMLTextAreaElement).value })}
                  ></textarea>`
              : html`<div class="card-editor-host"></div>`}
            ${e.error ? html`<div class="err">${e.error}</div>` : nothing}
            <div class="row"><button class="primary" @click=${() => this._finishCardEdit()}>Fertig</button></div>`
        : html`<p>
              Karten, die in der Seitenleiste angezeigt werden, solange kein Raum aktiv ist. Ohne Karten erscheint die
              Raumliste.
            </p>
            <ul class="card-list">
              ${this._cardsDraft.map(
                (c, i) => html`<li>
                  <span>${this._cardLabel(c)}</span>
                  <button title="Nach oben" ?disabled=${i === 0} @click=${() => this._moveCard(i, -1)}>↑</button>
                  <button title="Nach unten" ?disabled=${i === this._cardsDraft.length - 1} @click=${() => this._moveCard(i, 1)}>↓</button>
                  <button @click=${() => void this._editCard(i)}>Bearbeiten</button>
                  <button @click=${() => this._removeCard(i)}>Entfernen</button>
                </li>`
              )}
            </ul>
            <div class="row add">
              <select @change=${(ev: Event) => (this._addType = (ev.target as HTMLSelectElement).value)}>
                ${CARD_TYPES.map(([v, l]) => html`<option value=${v} ?selected=${this._addType === v}>${l}</option>`)}
                <option value="__custom" ?selected=${this._addType === "__custom"}>Custom Card (Typ eingeben)</option>
                <option value="__yaml" ?selected=${this._addType === "__yaml"}>Anderer Typ (YAML)</option>
              </select>
              ${this._addType === "__custom"
                ? html`<input
                    placeholder="z. B. mushroom-entity-card"
                    .value=${this._customType}
                    @input=${(ev: Event) => (this._customType = (ev.target as HTMLInputElement).value)}
                  />`
                : nothing}
              <button @click=${() => void this._addCard()}>Karte hinzufügen</button>
              <button @click=${() => (this._cardsPaste = { text: "", error: "" })}>Liste per YAML einfügen</button>
            </div>
            ${this._cardsError ? html`<div class="err">${this._cardsError}</div>` : nothing}
            <div class="row">
              <button @click=${() => this._cardsDialog()?.close()}>Abbrechen</button>
              <button class="primary" @click=${() => void this._saveCards()}>Speichern</button>
            </div>`}
    </dialog>`;
  }

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
        ${this._renderCardsDialog()}
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
    dialog.cards .card-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    dialog.cards .card-list li {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    dialog.cards .card-list li span {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    dialog.cards .row.add {
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
    }
    dialog.cards select,
    dialog.cards input {
      font: inherit;
      padding: 4px 8px;
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
