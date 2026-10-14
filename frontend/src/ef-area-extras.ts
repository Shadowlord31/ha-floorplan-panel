/**
 * Eigene Ergänzung zum easy-floorplan-Editor: Raumart (inkl. freier Bezeichnung) und die
 * Seitenleiste pro Raum. Meldet Änderungen als `area-patch` (Teilobjekt des Raums).
 */
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { defineElement } from "./define";
import "./card-list-editor";
import type { HomeAssistant } from "./ha";
import { axisRect } from "./geometry";
import { AREA_TYPES } from "./types";

type AreaLike = { points?: { x: number; y: number }[]; type?: string; typeLabel?: string; cards?: Record<string, unknown>[] };

@defineElement("fp-ef-area-extras")
export class FpEfAreaExtras extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) area!: AreaLike;

  private _patch(patch: Record<string, unknown>): void {
    this.dispatchEvent(new CustomEvent("area-patch", { detail: patch, bubbles: true, composed: true }));
  }

  private _resize(width: number, height: number): void {
    const pts = this.area.points;
    const r = pts && axisRect(pts);
    if (!pts || !r || !(width >= 1) || !(height >= 1)) return;
    this._patch({
      points: pts.map((p) => ({ x: p.x === r.x ? r.x : r.x + width, y: p.y === r.y ? r.y : r.y + height })),
    });
  }

  protected render() {
    const a = this.area;
    const rect = a.points && axisRect(a.points);
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
      ${rect
        ? html`<div class="dims">
            <label class="field"><span>Width</span>
              <input type="number" min="1" .value=${String(Math.round(rect.w))}
                @change=${(ev: Event) => this._resize(Number((ev.target as HTMLInputElement).value), rect.h)} /></label>
            <label class="field"><span>Height</span>
              <input type="number" min="1" .value=${String(Math.round(rect.h))}
                @change=${(ev: Event) => this._resize(rect.w, Number((ev.target as HTMLInputElement).value))} /></label>
          </div>`
        : nothing}
      <h4>Sidebar</h4>
      <fp-card-list-editor
        summary
        .hass=${this.hass}
        .cards=${a.cards}
        heading="Karten von ${(a as { name?: string }).name ?? "Raum"}"
        hint="Diese Karten erscheinen in der Seitenleiste, wenn der Raum angetippt wird."
        @cards-changed=${(ev: CustomEvent<{ cards: Record<string, unknown>[] }>) => {
          ev.stopPropagation();
          this._patch({ cards: ev.detail.cards.length ? ev.detail.cards : undefined });
        }}
      ></fp-card-list-editor>
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
    .dims {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    h4 {
      margin: 12px 0 4px;
    }
    .muted,
    small {
      color: var(--secondary-text-color);
      font-size: 12px;
    }
  `;
}
