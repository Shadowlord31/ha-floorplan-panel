/**
 * Ansichtsmodus: zeichnet eine Etage, zoomt auf den gewählten Raum und legt die
 * frei platzierten Icons als HTML-Schicht darüber.
 *
 * Zoom-Prinzip aus easy-floorplan (MIT): SVG und Icon-Schicht stecken in EINEM
 * transformierten Wrapper (`transform-origin: 0 0`), damit beide Schichten identisch
 * mitzoomen; die Icons skalieren sich über `--fp-inv-zoom` zurück.
 */
import { defineElement } from "./define";
import { LitElement, css, html, nothing, svg, unsafeCSS, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import {
  areaZoomTransform,
  contentBounds,
  IDENTITY_ZOOM,
  itemHiddenUntilZoomed,
  resolveAreaZoom,
  type Rect,
  type ZoomTransform,
} from "./geometry";
import {
  canRun,
  domainOf,
  entityIcon,
  fireMoreInfo,
  formatState,
  isActive,
  isUnavailable,
  runEntity,
  toggleEntity,
  type HomeAssistant,
} from "./ha";
import { renderGlows } from "./light";
import { planSvgStyles, renderArea, renderOpenings, renderWalls } from "./render";
import type { Floor, FloorItem, Plan } from "./types";

/** Domains, die bei `tapAction: auto` direkt geschaltet werden; alles andere öffnet more-info. */
const AUTO_TOGGLE = new Set(["light", "switch", "fan", "input_boolean", "siren"]);
/** Icons erscheinen gezoomt etwas größer als in der Gesamtansicht. */
const ZOOMED_ITEM_SCALE = 1.35;
const DEFAULT_ITEM_SIZE = 34;
/** Breite des Raum-Popups (siehe room-dialog.ts) und Schwelle für das Bottom-Sheet. */
export const POPUP_WIDTH_PX = 380;
export const POPUP_NARROW_PX = 700;
const POPUP_SHEET_FRAC = 0.55;

let instanceCounter = 0;

@defineElement("fp-plan-view")
export class FpPlanView extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) plan!: Plan;
  @property({ attribute: false }) floor!: Floor;
  @property({ attribute: false }) zoomedAreaId?: string;
  /** Ein Raum-Popup überdeckt einen Teil der Fläche: Zoom-Ziel dorthin verschieben, wo es sichtbar bleibt. */
  @property({ type: Boolean }) popupOpen = false;

  @state() private _box = { w: 0, h: 0 };

  private readonly _maskId = `fp-wall-mask-${++instanceCounter}`;
  private _ro?: ResizeObserver;

  connectedCallback(): void {
    super.connectedCallback();
    this._ro = new ResizeObserver(() => this._measure());
    this._ro.observe(this);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._ro?.disconnect();
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has("plan") || changed.has("floor")) this._measure();
  }

  /** Größte Box mit dem Seitenverhältnis des Sichtbereichs, die in das Element passt. */
  private _measure(): void {
    if (!this.plan || !this.floor) return;
    const { w: width, h: height } = contentBounds(this.floor, this.plan);
    // Innenabstand abziehen; die Box selbst liegt absolut und beeinflusst die Größe des Elements nicht
    const cs = getComputedStyle(this);
    const availW = this.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const availH = this.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    if (!availW || !availH) return;
    const scale = Math.min(availW / width, availH / height);
    const w = Math.floor(width * scale);
    const h = Math.floor(height * scale);
    if (w !== this._box.w || h !== this._box.h) this._box = { w, h };
  }

  private _emit(name: string, detail?: unknown): void {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private _onAreaClick(ev: Event, id: string): void {
    ev.stopPropagation();
    this._emit("area-click", { id });
  }

  private async _onItemClick(ev: Event, item: FloorItem): Promise<void> {
    ev.stopPropagation();
    const entity = item.entity;
    if (!entity) return;
    let action = item.tapAction ?? "auto";
    if (action === "auto") {
      if (canRun(entity)) action = "toggle";
      else action = AUTO_TOGGLE.has(domainOf(entity)) ? "toggle" : "more-info";
    }
    if (action === "none") return;
    if (action === "more-info") {
      fireMoreInfo(this, entity);
    } else if (canRun(entity)) {
      await runEntity(this.hass, entity);
    } else {
      await toggleEntity(this.hass, entity);
    }
  }

  private _onItemContext(ev: Event, item: FloorItem): void {
    if (!item.entity) return;
    ev.preventDefault();
    fireMoreInfo(this, item.entity);
  }

  protected render() {
    if (!this.plan || !this.floor) return nothing;
    const floor = this.floor;
    const view = contentBounds(floor, this.plan);
    const { w: width, h: height } = view;
    const zoomed = floor.areas.find((a) => a.id === this.zoomedAreaId);
    let zoom = zoomed
      ? areaZoomTransform(
          zoomed.points.map((p) => ({ x: p.x - view.x, y: p.y - view.y })),
          width,
          height,
          undefined,
          undefined,
          resolveAreaZoom(zoomed)
        )
      : IDENTITY_ZOOM;
    if (zoomed && this.popupOpen && zoom.scale > 1) zoom = this._shiftForPopup(zoom);
    const inv = zoom.scale > 1 ? ZOOMED_ITEM_SCALE / zoom.scale : 1;
    const labelSize = Math.max(width, height) / 45;
    return html`
      <div
        class="plan"
        style="width:${this._box.w}px;height:${this._box.h}px"
        @click=${() => this._emit("background-click")}
      >
        <div
          class="plan-zoom"
          style="transform:translate(${zoom.txPercent}%, ${zoom.tyPercent}%) scale(${zoom.scale});--fp-inv-zoom:${inv}"
        >
          <svg viewBox="${view.x} ${view.y} ${width} ${height}" preserveAspectRatio="xMidYMid meet">
            <g class="areas">
              ${floor.areas.map(
                (a) => svg`<g @click=${(ev: Event) => this._onAreaClick(ev, a.id)}>${renderArea(a, {
                  hass: this.hass,
                  selected: a.id === this.zoomedAreaId,
                  dimmed: !!zoomed && a.id !== zoomed.id,
                  labelSize,
                })}</g>`
              )}
            </g>
            ${renderGlows(floor, this.plan, this.hass, `${this._maskId}-glow`)}
            ${renderWalls(floor, this.plan, this._maskId)} ${renderOpenings(floor, this.plan, { hass: this.hass })}
          </svg>
          <div class="items">
            ${floor.items
              .filter((it) => !itemHiddenUntilZoomed(it, zoomed, floor.areas))
              .map((it) => this._renderItem(it, view))}
          </div>
        </div>
      </div>
    `;
  }

  /** Verschiebt den gezoomten Raum in den Bereich, den das Popup frei lässt (links bzw. oben). */
  private _shiftForPopup(zoom: ZoomTransform): ZoomTransform {
    if (!this._box.w || !this._box.h) return zoom;
    const narrow = this.clientWidth < POPUP_NARROW_PX;
    return narrow
      ? { ...zoom, tyPercent: zoom.tyPercent - ((this.clientHeight * POPUP_SHEET_FRAC) / 2 / this._box.h) * 100 }
      : { ...zoom, txPercent: zoom.txPercent - ((POPUP_WIDTH_PX + 32) / 2 / this._box.w) * 100 };
  }

  private _renderItem(item: FloorItem, view: Rect) {
    const width = view.w;
    const height = view.h;
    const stateObj = item.entity ? this.hass.states[item.entity] : undefined;
    const active = isActive(stateObj);
    const unavailable = !!item.entity && isUnavailable(stateObj);
    const icon = item.icon ?? (item.entity ? entityIcon(this.hass, item.entity) : "mdi:map-marker");
    const size = item.size ?? DEFAULT_ITEM_SIZE;
    const color = active ? item.activeColor ?? "var(--fp-active-color, #ffb300)" : item.color ?? "";
    const title = item.label ?? (stateObj?.attributes.friendly_name as string | undefined) ?? item.entity ?? "";
    return html`
      <div
        class="item ${active ? "active" : ""} ${unavailable ? "unavailable" : ""} ${item.entity ? "interactive" : ""}"
        style="left:${((item.x - view.x) / width) * 100}%;top:${((item.y - view.y) / height) * 100}%;--fp-item-size:${size}px;${color
          ? `--fp-item-color:${color}`
          : ""}"
        title=${title}
        @click=${(ev: Event) => this._onItemClick(ev, item)}
        @contextmenu=${(ev: Event) => this._onItemContext(ev, item)}
      >
        <div class="badge"><ha-icon .icon=${icon}></ha-icon></div>
        ${item.label ? html`<div class="label">${item.label}</div>` : nothing}
        ${item.showState && stateObj ? html`<div class="state">${formatState(this.hass, stateObj)}</div>` : nothing}
      </div>
    `;
  }

  static styles = [
    unsafeCSS(planSvgStyles),
    css`
      :host {
        display: block;
        position: relative;
        overflow: hidden;
        background: var(--fp-floor-color, var(--card-background-color, #fff));
        min-height: 0;
        min-width: 0;
      }
      .plan {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        /* Gezoomter Inhalt darf über die Box hinaus die ganze Fläche nutzen; :host schneidet ab */
        overflow: visible;
      }
      .plan-zoom {
        position: absolute;
        inset: 0;
        transform-origin: 0 0;
        transition: transform 0.45s ease;
      }
      @media (prefers-reduced-motion: reduce) {
        .plan-zoom {
          transition: none;
        }
      }
      svg {
        overflow: visible;
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      .area {
        cursor: pointer;
      }
      .area:hover polygon {
        fill-opacity: 0.28;
      }
      .area.dimmed polygon {
        fill-opacity: 0.04;
      }
      .area.selected polygon {
        fill-opacity: 0.22;
      }
      .items {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }
      .item {
        position: absolute;
        transform: translate(-50%, -50%) scale(var(--fp-inv-zoom, 1));
        transition: transform 0.45s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        pointer-events: auto;
        user-select: none;
      }
      .item.interactive {
        cursor: pointer;
      }
      .badge {
        width: var(--fp-item-size);
        height: var(--fp-item-size);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--card-background-color, #fff);
        color: var(--fp-item-color, var(--secondary-text-color));
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
        transition: color 0.2s, box-shadow 0.2s;
        --mdc-icon-size: calc(var(--fp-item-size) * 0.6);
      }
      .item.active .badge {
        box-shadow: 0 0 0 2px var(--fp-item-color), 0 0 14px 2px var(--fp-item-color);
      }
      .item.unavailable .badge {
        opacity: 0.45;
      }
      .label,
      .state {
        margin-top: 2px;
        padding: 0 6px;
        border-radius: 8px;
        font-size: 11px;
        line-height: 16px;
        white-space: nowrap;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
      }
      .state {
        color: var(--secondary-text-color);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "fp-plan-view": FpPlanView;
  }
}
