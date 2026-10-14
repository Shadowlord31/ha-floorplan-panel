/**
 * Seitenleiste eines Raums: zeigt die im Editor dem Raum zugeordneten Lovelace-Karten.
 */
import { defineElement } from "./define";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import type { HomeAssistant } from "./ha";
import type { Area } from "./types";

@defineElement("fp-room-sidebar")
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
    const cards = this.area.cards ?? [];
    return html`
      <header>
        <div class="title">
          <h2>${this.area.name || "Raum"}</h2>
        </div>
        ${this.canEdit
          ? html`<button class="icon-btn" title="Karten bearbeiten" @click=${this._edit}>
              <ha-icon icon="mdi:pencil"></ha-icon>
            </button>`
          : nothing}
        <button class="icon-btn" title="Schließen" @click=${this._close}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </header>
      <div class="content">
        ${cards.length === 0
          ? html`<p class="empty">Diesem Raum sind noch keine Karten zugeordnet.</p>`
          : cards.map((c) => html`<hui-card .hass=${this.hass} .config=${c}></hui-card>`)}
      </div>
    `;
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
    .content {
      overflow-y: auto;
      padding: 8px 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .empty {
      color: var(--secondary-text-color);
      padding: 8px 4px;
    }
    .icon-btn {
      font: inherit;
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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "fp-room-sidebar": FpRoomSidebar;
  }
}
