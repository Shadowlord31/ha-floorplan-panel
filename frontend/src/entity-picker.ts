/**
 * Schlanker Entitäten-Picker mit Suche über Name und entity_id. HAs eigener
 * `ha-entity-picker` wird nur bei Bedarf nachgeladen und steht in einem
 * Custom-Panel nicht verlässlich zur Verfügung – daher ein eigener.
 */
import { defineElement } from "./define";
import { LitElement, css, html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { domainOf, entityIcon, type HomeAssistant } from "./ha";

const MAX_RESULTS = 60;

@defineElement("fp-entity-picker")
export class FpEntityPicker extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  /** Aktuelle entity_id (leer = keine). */
  @property() value = "";
  /** Nur diese Domains anbieten (leer = alle). */
  @property({ attribute: false }) domains: string[] = [];
  /** Diese entity_ids ausblenden (z. B. bereits in der Seitenleiste). */
  @property({ attribute: false }) exclude: string[] = [];
  @property() placeholder = "Entität suchen …";
  /** Nach der Auswahl das Feld leeren (zum Hinzufügen mehrerer Einträge). */
  @property({ type: Boolean }) clearOnSelect = false;

  @state() private _open = false;
  @state() private _filter = "";
  @state() private _highlight = 0;

  @query("input") private _input!: HTMLInputElement;

  private _results(): { id: string; name: string }[] {
    const needle = this._filter.trim().toLowerCase();
    const excluded = new Set(this.exclude);
    const out: { id: string; name: string }[] = [];
    for (const id of Object.keys(this.hass.states).sort()) {
      if (excluded.has(id)) continue;
      if (this.domains.length && !this.domains.includes(domainOf(id))) continue;
      const name = (this.hass.states[id].attributes.friendly_name as string | undefined) ?? id;
      if (needle && !id.toLowerCase().includes(needle) && !name.toLowerCase().includes(needle)) continue;
      out.push({ id, name });
      if (out.length >= MAX_RESULTS) break;
    }
    return out;
  }

  private _select(id: string): void {
    this._open = false;
    this._filter = "";
    if (this.clearOnSelect && this._input) this._input.value = "";
    this.dispatchEvent(new CustomEvent("value-changed", { detail: { value: id }, bubbles: true, composed: true }));
  }

  private _onKey(ev: KeyboardEvent): void {
    const results = this._results();
    if (ev.key === "ArrowDown") {
      this._open = true;
      this._highlight = Math.min(results.length - 1, this._highlight + 1);
      ev.preventDefault();
    } else if (ev.key === "ArrowUp") {
      this._highlight = Math.max(0, this._highlight - 1);
      ev.preventDefault();
    } else if (ev.key === "Enter") {
      const hit = results[this._highlight];
      if (hit) this._select(hit.id);
      ev.preventDefault();
    } else if (ev.key === "Escape") {
      this._open = false;
    }
    ev.stopPropagation();
  }

  protected render() {
    const results = this._open ? this._results() : [];
    const current = this.value ? this.hass.states[this.value] : undefined;
    const shown = this.clearOnSelect
      ? this._filter
      : this._open
      ? this._filter
      : this.value
      ? `${current?.attributes.friendly_name ?? this.value}`
      : "";
    return html`
      <div class="field">
        ${this.value && !this.clearOnSelect
          ? html`<ha-icon class="lead" .icon=${entityIcon(this.hass, this.value)}></ha-icon>`
          : html`<ha-icon class="lead" icon="mdi:magnify"></ha-icon>`}
        <input
          .value=${shown}
          placeholder=${this.placeholder}
          @focus=${() => {
            this._open = true;
            this._filter = "";
            this._highlight = 0;
          }}
          @blur=${() => setTimeout(() => (this._open = false), 150)}
          @input=${(ev: Event) => {
            this._filter = (ev.target as HTMLInputElement).value;
            this._highlight = 0;
            this._open = true;
          }}
          @keydown=${this._onKey}
        />
        ${this.value && !this.clearOnSelect
          ? html`<button class="clear" title="Entfernen" @mousedown=${(ev: Event) => ev.preventDefault()} @click=${() => this._select("")}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>`
          : nothing}
      </div>
      ${this.value && !this.clearOnSelect ? html`<div class="id">${this.value}</div>` : nothing}
      ${this._open
        ? html`<div class="list">
            ${results.length === 0
              ? html`<div class="none">Keine Treffer</div>`
              : results.map(
                  (r, i) => html`<div
                    class="opt ${i === this._highlight ? "hl" : ""}"
                    @mousedown=${(ev: Event) => {
                      ev.preventDefault();
                      this._select(r.id);
                    }}
                  >
                    <ha-icon .icon=${entityIcon(this.hass, r.id)}></ha-icon>
                    <span class="txt"><span>${r.name}</span><small>${r.id}</small></span>
                  </div>`
                )}
          </div>`
        : nothing}
    `;
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
    }
    .field {
      display: flex;
      align-items: center;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--card-background-color);
      padding: 0 4px 0 8px;
      --mdc-icon-size: 18px;
    }
    .field:focus-within {
      border-color: var(--primary-color);
    }
    .lead {
      color: var(--secondary-text-color);
    }
    input {
      flex: 1;
      min-width: 0;
      border: none;
      outline: none;
      background: none;
      color: var(--primary-text-color);
      font: inherit;
      padding: 8px;
    }
    .clear {
      border: none;
      background: none;
      cursor: pointer;
      color: var(--secondary-text-color);
      line-height: 0;
      padding: 4px;
    }
    .id {
      font-size: 11px;
      color: var(--secondary-text-color);
      margin: 2px 0 0 4px;
    }
    .list {
      position: absolute;
      z-index: 10;
      left: 0;
      right: 0;
      max-height: 260px;
      overflow-y: auto;
      margin-top: 2px;
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    .opt {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 10px;
      cursor: pointer;
      --mdc-icon-size: 20px;
    }
    .opt.hl,
    .opt:hover {
      background: var(--secondary-background-color);
    }
    .txt {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .txt span,
    .txt small {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    small {
      color: var(--secondary-text-color);
    }
    .none {
      padding: 8px 10px;
      color: var(--secondary-text-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "fp-entity-picker": FpEntityPicker;
  }
}
