/**
 * SVG-Darstellung von Räumen, Wänden, Türen und Fenstern. Wird vom Ansichtsmodus und
 * vom Editor gemeinsam benutzt; Icons (Items) zeichnet jede Ansicht selbst.
 *
 * Optik angelehnt an easy-floorplan (MIT): kräftige Wände, Türen mit Aufschlagbogen,
 * Fenster als Doppellinie, Öffnungen schneiden per Maske aus der Wand aus.
 */
import { svg, nothing, type SVGTemplateResult } from "lit";
import { pointInPolygon, polygonCentroid } from "./geometry";
import { isActive, type HomeAssistant } from "./ha";
import type { Area, Floor, Opening, Plan, Wall } from "./types";

export const DEFAULT_AREA_OPACITY = 0.12;

export function wallThickness(w: Wall, plan: Plan): number {
  return w.thickness ?? plan.settings.wallThickness;
}

/** Größte Wandstärke der Etage – so tief schneiden Öffnungen aus. */
export function maxWallThickness(floor: Floor, plan: Plan): number {
  return floor.walls.reduce((m, w) => Math.max(m, wallThickness(w, plan)), plan.settings.wallThickness);
}

export function areaFill(area: Area, hass?: HomeAssistant): { color: string; opacity: number } {
  const base = area.color ?? "var(--primary-color)";
  const opacity = area.opacity ?? DEFAULT_AREA_OPACITY;
  if (hass && area.entity && isActive(hass.states[area.entity])) {
    return { color: area.activeColor ?? "#ffc107", opacity: Math.min(1, opacity + 0.2) };
  }
  return { color: base, opacity };
}

export function renderArea(
  area: Area,
  opts: { hass?: HomeAssistant; selected?: boolean; dimmed?: boolean; labelSize: number }
): SVGTemplateResult {
  const { color, opacity } = areaFill(area, opts.hass);
  const pts = area.points.map((p) => `${p.x},${p.y}`).join(" ");
  // Name oben links in den Raum statt in die Mitte – dort sitzt meist das Deckenlicht
  const minX = Math.min(...area.points.map((p) => p.x));
  const minY = Math.min(...area.points.map((p) => p.y));
  let label = { x: minX + opts.labelSize * 0.8, y: minY + opts.labelSize * 1.5 };
  if (!pointInPolygon(area.points, label.x, label.y)) label = polygonCentroid(area.points);
  const anchor = pointInPolygon(area.points, minX + opts.labelSize * 0.8, minY + opts.labelSize * 1.5) ? "start" : "middle";
  return svg`
    <g class="area ${opts.selected ? "selected" : ""} ${opts.dimmed ? "dimmed" : ""}" data-id=${area.id}>
      <polygon points=${pts} fill=${color} fill-opacity=${opacity}></polygon>
      ${
        area.showName !== false && area.name
          ? svg`<text class="area-label" x=${label.x} y=${label.y} font-size=${opts.labelSize}
                  text-anchor=${anchor} dominant-baseline="middle">${area.name}</text>`
          : nothing
      }
    </g>`;
}

/** Wände mit ausgeschnittenen Öffnungen. `maskId` muss pro Dokument eindeutig sein. */
export function renderWalls(
  floor: Floor,
  plan: Plan,
  maskId: string,
  opts: { selectedId?: string } = {}
): SVGTemplateResult {
  const { width, height } = plan.canvas;
  const pad = Math.max(width, height);
  const cut = maxWallThickness(floor, plan) + 2;
  return svg`
    <defs>
      <mask id=${maskId} maskUnits="userSpaceOnUse" x=${-pad} y=${-pad} width=${width + 2 * pad} height=${height + 2 * pad}>
        <rect x=${-pad} y=${-pad} width=${width + 2 * pad} height=${height + 2 * pad} fill="white"></rect>
        ${floor.openings.map(
          (o) => svg`<rect x=${o.x - o.length / 2} y=${o.y - cut / 2} width=${o.length} height=${cut}
                           fill="black" transform="rotate(${o.angle} ${o.x} ${o.y})"></rect>`
        )}
      </mask>
    </defs>
    <g class="walls" mask="url(#${maskId})">
      ${floor.walls.map(
        (w) => svg`<line class="wall ${opts.selectedId === w.id ? "selected" : ""}" data-id=${w.id}
                         x1=${w.x1} y1=${w.y1} x2=${w.x2} y2=${w.y2}
                         stroke-width=${wallThickness(w, plan)}></line>`
      )}
    </g>`;
}

export function renderOpening(
  o: Opening,
  cut: number,
  opts: { hass?: HomeAssistant; selected?: boolean } = {}
): SVGTemplateResult {
  const L = o.length;
  const open = !!(opts.hass && o.entity && isActive(opts.hass.states[o.entity]));
  const cls = `opening ${o.type} ${open ? "open" : ""} ${opts.selected ? "selected" : ""}`;
  if (o.type === "window") {
    const h = cut - 2;
    return svg`
      <g class=${cls} data-id=${o.id} transform="translate(${o.x} ${o.y}) rotate(${o.angle})">
        <rect class="hit" x=${-L / 2} y=${-h / 2} width=${L} height=${h}></rect>
        <rect class="frame" x=${-L / 2} y=${-h / 2} width=${L} height=${h}></rect>
        <line class="glass" x1=${-L / 2} y1=${-h / 6} x2=${L / 2} y2=${-h / 6}></line>
        <line class="glass" x1=${-L / 2} y1=${h / 6} x2=${L / 2} y2=${h / 6}></line>
      </g>`;
  }
  // Tür: Blatt im rechten Winkel zur Wand plus Viertelkreis bis zur geschlossenen Lage
  const h = o.hinge === "right" ? 1 : -1;
  const s = o.swing === "out" ? -1 : 1;
  const hx = (h * L) / 2;
  const sweep = h * s < 0 ? 0 : 1;
  return svg`
    <g class=${cls} data-id=${o.id} transform="translate(${o.x} ${o.y}) rotate(${o.angle})">
      <rect class="hit" x=${-L / 2} y=${s > 0 ? -cut / 2 : -L} width=${L} height=${L + cut / 2}></rect>
      <path class="swing" d="M ${hx} ${s * L} A ${L} ${L} 0 0 ${sweep} ${-hx} 0"></path>
      <line class="leaf" x1=${hx} y1="0" x2=${hx} y2=${s * L}></line>
    </g>`;
}

export function renderOpenings(
  floor: Floor,
  plan: Plan,
  opts: { hass?: HomeAssistant; selectedId?: string } = {}
): SVGTemplateResult {
  const cut = maxWallThickness(floor, plan) + 2;
  return svg`<g class="openings">${floor.openings.map((o) =>
    renderOpening(o, cut, { hass: opts.hass, selected: opts.selectedId === o.id })
  )}</g>`;
}

/** Gemeinsame SVG-Styles für Ansicht und Editor. */
export const planSvgStyles = `
  .area polygon { stroke: none; transition: fill-opacity .25s ease; }
  .area-label { fill: var(--primary-text-color); opacity: .7; font-weight: 500; pointer-events: none; user-select: none; }
  .wall { stroke: var(--fp-wall-color, var(--primary-text-color)); stroke-linecap: square; }
  .opening .hit { fill: transparent; stroke: none; }
  .opening .frame { fill: var(--fp-floor-color, var(--card-background-color, #fff)); stroke: var(--fp-wall-color, var(--primary-text-color)); stroke-width: 1.5; }
  .opening .glass { stroke: var(--fp-window-color, #64b5f6); stroke-width: 2; }
  .opening .leaf { stroke: var(--fp-wall-color, var(--primary-text-color)); stroke-width: 3; stroke-linecap: round; }
  .opening .swing { fill: none; stroke: var(--secondary-text-color); stroke-width: 1.2; stroke-dasharray: 5 4; }
  .opening.open .glass, .opening.open .leaf { stroke: var(--fp-open-color, #ef6c00); }
  .opening.open .frame { stroke: var(--fp-open-color, #ef6c00); }
`;
