/**
 * Popup für die Raumdetails: schwebende Karte am rechten Rand (schmal: Bottom-Sheet) über dem
 * Plan. Der Inhalt ist `fp-room-sidebar`; Schließen per Button, Esc oder Klick auf den Hintergrund.
 */
import { defineElement } from "./define";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import type { HomeAssistant } from "./ha";
import { POPUP_NARROW_PX, POPUP_WIDTH_PX } from "./plan-view";
import "./room-sidebar";
import type { Area } from "./types";

@defineElement("fp-room-dialog")
export class FpRoomDialog extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) area?: Area;
  @property({ type: Boolean }) canEdit = false;
  /** Schmale Fläche (wie in plan-view): Bottom-Sheet statt Karte am Rand. */
  @property({ type: Boolean, reflect: true }) sheet = false;

  private _ro?: ResizeObserver;

  private readonly _onKey = (ev: KeyboardEvent): void => {
    if (ev.key === "Escape") this._close();
  };

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("keydown", this._onKey);
    this._ro = new ResizeObserver(() => (this.sheet = this.clientWidth < POPUP_NARROW_PX));
    this._ro.observe(this);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("keydown", this._onKey);
    this._ro?.disconnect();
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("area") && this.area) this.renderRoot.querySelector<HTMLElement>(".card")?.focus({ preventScroll: true });
  }

  private _close(): void {
    this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
  }

  protected render() {
    if (!this.area) return nothing;
    return html`
      <div class="scrim" @click=${this._close}></div>
      <div class="card" role="dialog" aria-label=${this.area.name || "Raum"} tabindex="-1">
        <fp-room-sidebar .hass=${this.hass} .area=${this.area} .canEdit=${this.canEdit}></fp-room-sidebar>
      </div>
    `;
  }

  static styles = css`
    :host {
      position: absolute;
      inset: 0;
      z-index: 5;
      pointer-events: none;
    }
    .scrim {
      position: absolute;
      inset: 0;
      pointer-events: auto;
      background: rgba(0, 0, 0, 0.08);
      animation: fade 0.25s ease;
    }
    .card {
      position: absolute;
      top: 16px;
      right: 16px;
      bottom: 16px;
      width: ${POPUP_WIDTH_PX}px;
      max-width: calc(100% - 32px);
      display: flex;
      pointer-events: auto;
      border-radius: 16px;
      overflow: hidden;
      background: var(--card-background-color, #fff);
      box-shadow: 0 8px 28px rgba(0, 0, 0, 0.3);
      outline: none;
      animation: slide-in 0.28s ease;
    }
    fp-room-sidebar {
      flex: 1;
      min-width: 0;
    }
    @keyframes fade {
      from {
        opacity: 0;
      }
    }
    @keyframes slide-in {
      from {
        transform: translateX(40px);
        opacity: 0;
      }
    }
    :host([sheet]) .card {
      top: auto;
      left: 0;
      right: 0;
      bottom: 0;
      width: auto;
      max-width: none;
      max-height: 55%;
      border-radius: 16px 16px 0 0;
      animation-name: slide-up;
    }
    @keyframes slide-up {
      from {
        transform: translateY(40px);
        opacity: 0;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .scrim,
      .card {
        animation: none;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "fp-room-dialog": FpRoomDialog;
  }
}
