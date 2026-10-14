/**
 * Bearbeiten einer Liste von Lovelace-Karten (Hinzufügen über HA-Karteneditoren, Bearbeiten,
 * Entfernen, Umsortieren, YAML-Fallback, ganze Liste per YAML einfügen). Wird für die
 * Übersicht-Karten und für die Karten je Raum verwendet.
 */
import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { dump, load } from "js-yaml";
import { defineElement } from "./define";
import { parseCardsYaml } from "./cards-yaml";
import type { HomeAssistant } from "./ha";

export const MAX_CARDS = 20;

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

@defineElement("fp-card-list-editor")
export class FpCardListEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) cards: CardConfig[] | undefined;
  @property() heading = "Karten";
  @property() hint = "";
  /** Zeigt eine Zusammenfassung mit Bearbeiten-Knopf; ohne wird der Dialog per open() geöffnet. */
  @property({ type: Boolean }) summary = false;
  /** Optionaler asynchroner Speicher-Callback; Fehler erscheinen im Dialog. */
  @property({ attribute: false }) save?: (cards: CardConfig[]) => Promise<void>;

  @state() private _draft: CardConfig[] = [];
  @state() private _error = "";
  @state() private _edit?: CardEdit;
  @state() private _paste?: { text: string; error: string };
  @state() private _addType = "entities";
  @state() private _customType = "";

  connectedCallback(): void {
    super.connectedCallback();
    void (window as unknown as { loadCardHelpers?: () => Promise<unknown> }).loadCardHelpers?.();
  }

  private _dialog(): HTMLDialogElement | null {
    return this.renderRoot.querySelector<HTMLDialogElement>("dialog");
  }

  public open = (): void => {
    this._draft = structuredClone(this.cards ?? []);
    this._error = "";
    this._edit = undefined;
    this._paste = undefined;
    this._dialog()?.showModal();
  };

  private _move(i: number, d: number): void {
    const list = [...this._draft];
    const j = i + d;
    if (j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j]!, list[i]!];
    this._draft = list;
  }

  private _remove(i: number): void {
    this._draft = this._draft.filter((_, k) => k !== i);
  }

  private _label(c: CardConfig): string {
    const t = String(c.type ?? "?").replace(/^custom:/, "");
    const title = c.title ?? c.name;
    return title ? `${t} – ${title}` : t;
  }

  /** Karten-Klasse über die öffentliche loadCardHelpers-Schnittstelle laden (lädt eingebaute Karten lazy nach). */
  private async _ctor(type: string): Promise<any> {
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

  private async _add(): Promise<void> {
    if (this._draft.length >= MAX_CARDS) {
      this._error = `Höchstens ${MAX_CARDS} Karten.`;
      return;
    }
    this._error = "";
    if (this._addType === "__yaml") {
      this._draft = [...this._draft, { type: "" }];
      this._edit = { index: this._draft.length - 1, yaml: true, yamlText: "type: ", error: "" };
      return;
    }
    const type = this._addType === "__custom" ? this._customType.trim() : this._addType;
    if (!type) return;
    const full = this._addType === "__custom" && !type.startsWith("custom:") ? `custom:${type}` : type;
    const ctor = await this._ctor(full);
    let config: CardConfig = { type: full };
    try {
      const stub = await ctor?.getStubConfig?.(this.hass, Object.keys(this.hass.states ?? {}), []);
      if (stub && typeof stub === "object") config = { ...stub, type: full };
    } catch {
      /* Stub optional */
    }
    this._draft = [...this._draft, config];
    await this._editCard(this._draft.length - 1);
  }

  private async _editCard(i: number): Promise<void> {
    const config = this._draft[i]!;
    const ctor = await this._ctor(String(config.type ?? ""));
    const hasEditor = typeof ctor?.getConfigElement === "function";
    this._edit = { index: i, yaml: !hasEditor, yamlText: dump(config, { lineWidth: 100 }), error: "" };
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
        if (c) this._draft = this._draft.map((x, k) => (k === i ? c : x));
      });
      host.replaceChildren(el);
    } catch {
      this._edit = { index: i, yaml: true, yamlText: dump(config, { lineWidth: 100 }), error: "" };
    }
  }

  private _applyPaste(append: boolean): void {
    const p = this._paste;
    if (!p) return;
    try {
      const cards = parseCardsYaml(p.text);
      const next = append ? [...this._draft, ...cards] : cards;
      if (next.length > MAX_CARDS) throw new Error(`Höchstens ${MAX_CARDS} Karten (wären ${next.length}).`);
      this._draft = next;
      this._paste = undefined;
    } catch (err: any) {
      this._paste = { ...p, error: err?.message ?? String(err) };
    }
  }

  private _finishEdit(): void {
    const e = this._edit;
    if (!e) return;
    if (e.yaml) {
      try {
        const c = load(e.yamlText) as CardConfig;
        if (!c || typeof c !== "object" || Array.isArray(c) || !c.type) throw new Error("Eine Karte braucht `type:`.");
        this._draft = this._draft.map((x, k) => (k === e.index ? c : x));
      } catch (err: any) {
        this._edit = { ...e, error: err?.message ?? String(err) };
        return;
      }
    }
    this._edit = undefined;
  }

  private async _save(): Promise<void> {
    const cards = this._draft.filter((c) => c && c.type);
    try {
      await this.save?.(cards);
      this.dispatchEvent(new CustomEvent("cards-changed", { detail: { cards }, bubbles: true, composed: true }));
      this._dialog()?.close();
    } catch (err: any) {
      this._error = err?.message ?? String(err);
    }
  }

  private _renderBody() {
    const e = this._edit;
    const p = this._paste;
    if (p)
      return html`<p>
          Kartenliste (<code>- type: …</code>) oder YAML einer Ansicht mit <code>cards:</code> einfügen. Titel, Pfad und
          Badges werden ignoriert.
        </p>
        <textarea
          rows="14"
          .value=${p.text}
          @input=${(ev: Event) => (this._paste = { ...p, text: (ev.target as HTMLTextAreaElement).value })}
        ></textarea>
        ${p.error ? html`<div class="err">${p.error}</div>` : nothing}
        <div class="row">
          <button @click=${() => (this._paste = undefined)}>Zurück</button>
          <button ?disabled=${!p.text.trim()} @click=${() => this._applyPaste(true)}>Anhängen</button>
          <button class="primary" ?disabled=${!p.text.trim()} @click=${() => this._applyPaste(false)}>Ersetzen</button>
        </div>`;
    if (e)
      return html`<p>${this._label(this._draft[e.index] ?? {})}</p>
        ${e.yaml
          ? html`<p>Für diesen Kartentyp gibt es keinen Editor – Konfiguration als YAML:</p>
              <textarea
                rows="12"
                .value=${e.yamlText}
                @input=${(ev: Event) => (this._edit = { ...e, yamlText: (ev.target as HTMLTextAreaElement).value })}
              ></textarea>`
          : html`<div class="card-editor-host"></div>`}
        ${e.error ? html`<div class="err">${e.error}</div>` : nothing}
        <div class="row"><button class="primary" @click=${() => this._finishEdit()}>Fertig</button></div>`;
    return html`${this.hint ? html`<p>${this.hint}</p>` : nothing}
      <ul class="card-list">
        ${this._draft.map(
          (c, i) => html`<li>
            <span>${this._label(c)}</span>
            <button title="Nach oben" ?disabled=${i === 0} @click=${() => this._move(i, -1)}>↑</button>
            <button title="Nach unten" ?disabled=${i === this._draft.length - 1} @click=${() => this._move(i, 1)}>↓</button>
            <button @click=${() => void this._editCard(i)}>Bearbeiten</button>
            <button @click=${() => this._remove(i)}>Entfernen</button>
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
        <button ?disabled=${this._draft.length >= MAX_CARDS} @click=${() => void this._add()}>Karte hinzufügen</button>
        <button @click=${() => (this._paste = { text: "", error: "" })}>Liste per YAML einfügen</button>
      </div>
      ${this._error ? html`<div class="err">${this._error}</div>` : nothing}
      <div class="row">
        <button @click=${() => this._dialog()?.close()}>Abbrechen</button>
        <button class="primary" @click=${() => void this._save()}>Speichern</button>
      </div>`;
  }

  protected render() {
    const n = this.cards?.length ?? 0;
    return html`${this.summary
        ? html`<div class="summary">
            <small>${n ? `${n} ${n === 1 ? "Karte" : "Karten"}` : "Keine Karten"}</small>
            <button @click=${this.open}>Karten bearbeiten …</button>
          </div>`
        : nothing}
      <dialog>
        <h3>${this.heading}</h3>
        ${this._renderBody()}
      </dialog>`;
  }

  static styles = css`
    :host {
      display: block;
    }
    .summary {
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: space-between;
    }
    small {
      color: var(--secondary-text-color);
      font-size: 12px;
    }
    dialog {
      width: min(640px, 92vw);
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
    }
    textarea {
      width: 100%;
      box-sizing: border-box;
      font: 12px monospace;
      margin-top: 8px;
    }
    .row {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 8px;
    }
    .row.add {
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
    }
    button {
      font: inherit;
      border: 1px solid var(--primary-color);
      background: transparent;
      color: var(--primary-color);
      border-radius: 16px;
      padding: 4px 16px;
      cursor: pointer;
    }
    button.primary {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    button:disabled {
      opacity: 0.5;
      cursor: default;
    }
    .err {
      color: var(--error-color, #db4437);
      margin-top: 8px;
    }
    .card-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .card-list li {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .card-list li span {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    select,
    input {
      font: inherit;
      padding: 4px 8px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "fp-card-list-editor": FpCardListEditor;
  }
}
