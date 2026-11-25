// Schlanke Ersatz-Elemente für ha-card und ha-icon. Registriert nur, wenn der Name noch frei ist.
import { LitElement, css, html, svg } from "lit";
import { property } from "lit/decorators.js";
import { defineElement } from "../define";
import { icon } from "./hass";

@defineElement("ha-card")
export class KernCard extends LitElement {
  @property() header?: string;
  static styles = css`
    :host {
      display: block;
      position: relative;
      box-sizing: border-box;
      background: var(--ha-card-background, var(--card-background-color, #fff));
      color: var(--primary-text-color, #212121);
      border-radius: var(--ha-card-border-radius, 12px);
      overflow: hidden;
    }
    .header {
      padding: 12px 16px;
      font-size: 1.2em;
      color: var(--ha-card-header-color, var(--primary-text-color));
    }
  `;
  protected render() {
    return html`${this.header ? html`<div class="header">${this.header}</div>` : ""}<slot></slot>`;
  }
}

@defineElement("ha-icon")
export class KernIcon extends LitElement {
  @property() icon?: string;
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      width: var(--mdc-icon-size, 24px);
      height: var(--mdc-icon-size, 24px);
    }
    svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
  `;
  protected render() {
    const d = this.icon ? icon(this.icon) : undefined;
    return html`<svg viewBox="0 0 24 24" aria-hidden="true">${d ? svg`<path d=${d}></path>` : svg`<circle cx="12" cy="12" r="6"></circle>`}</svg>`;
  }
}
