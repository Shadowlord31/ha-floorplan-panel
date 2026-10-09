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
import { shutterClosedFraction } from "./light";
import { doorState, entityOpenState, leafSegments, lockStatus } from "./openings";
import { DEFAULT_OPEN_COLOR, DEFAULT_SHUTTER_COLOR, type Area, type Floor, type Opening, type Plan, type Shutter, type Wall } from "./types";

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

/**
 * Ein Flügel mit Öffnungsbogen in lokalen Koordinaten (x entlang der Wand, y = Normale):
 * Scharnier bei (hingeX, 0), Blatt der Länge `len` senkrecht zur Wand auf die Seite `s`,
 * Bogen zurück bis zur geschlossenen Lage auf der Gegenseite des Scharniers (`h`).
 */
function renderLeaf(hingeX: number, h: -1 | 1, len: number, s: -1 | 1): SVGTemplateResult {
  const sweep = h * s < 0 ? 0 : 1;
  return svg`
    <path class="swing" d="M ${hingeX} ${s * len} A ${len} ${len} 0 0 ${sweep} ${hingeX - h * len} 0"></path>
    <line class="leaf" x1=${hingeX} y1="0" x2=${hingeX} y2=${s * len}></line>`;
}

/**
 * Rollo als Band an einer Seite der Öffnung: außen = negative Normalenseite, innen = positive
 * (wie `swing`). Die Tiefe zeigt, wie weit es zu ist.
 */
function renderShutter(shutter: Shutter, length: number, cut: number, hass?: HomeAssistant): SVGTemplateResult {
  const L = length;
  const state = hass?.states[shutter.entity];
  const closed = shutterClosedFraction(state);
  const moving = state?.state === "opening" || state?.state === "closing";
  const dir = shutter.side === "in" ? 1 : -1;
  const depth = Math.max(cut * 0.8, 8);
  const face = (dir * cut) / 2;
  const y0 = dir > 0 ? face : face - depth;
  const fill = (closed ?? 0) * depth;
  const fy = dir > 0 ? face : face - fill;
  const slats: number[] = [];
  for (let d = 3; d < fill; d += 3) slats.push(face + dir * d);
  return svg`
    <g class="shutter ${shutter.side} ${moving ? "moving" : ""} ${closed === undefined ? "unknown" : ""}" style="--fp-shutter:${shutter.color || DEFAULT_SHUTTER_COLOR}">
      <rect class="shutter-track" x=${-L / 2} y=${y0} width=${L} height=${depth}></rect>
      ${fill > 0 ? svg`<rect class="shutter-fill" x=${-L / 2} y=${fy} width=${L} height=${fill}></rect>` : nothing}
      ${slats.map((y) => svg`<line class="shutter-slat" x1=${-L / 2} y1=${y} x2=${L / 2} y2=${y}></line>`)}
    </g>`;
}

/** Kleines Schloss am Türblatt: zu = Bügel geschlossen, offen = Bügel angehoben. */
function renderLock(o: Opening, hass?: HomeAssistant): SVGTemplateResult | typeof nothing {
  if (!o.lockEntity) return nothing;
  const status = lockStatus(hass?.states[o.lockEntity]);
  const h = o.hinge === "right" ? 1 : -1;
  const x = -h * (o.length / 2 - 9);
  const shackle = status === "locked" ? "M -2.4 -1 V -3 a 2.4 2.4 0 0 1 4.8 0 V -1" : "M -2.4 -1 V -3 a 2.4 2.4 0 0 1 4.8 0 V -2.4";
  return svg`
    <g class="lock ${status}" transform="translate(${x} 0)">
      <circle r="6.5"></circle>
      <path class="shackle" d=${shackle}></path>
      <rect x="-3.4" y="-1" width="6.8" height="5" rx="1"></rect>
    </g>`;
}

export function renderOpening(
  o: Opening,
  cut: number,
  opts: { hass?: HomeAssistant; selected?: boolean; warn?: boolean; forceOpen?: boolean; leafIndex?: number } = {}
): SVGTemplateResult {
  const L = o.length;
  const style = `--fp-open:${o.openColor || DEFAULT_OPEN_COLOR}`;
  const h: -1 | 1 = o.hinge === "right" ? 1 : -1;
  const s: -1 | 1 = o.swing === "out" ? -1 : 1;
  if (o.type === "window") {
    const fh = cut - 2;
    const segs = leafSegments(o).map((seg) => {
      // Editor: die ausgewählte Öffnung offen zeigen, damit Flügel und Anschlag sichtbar sind
      const st = entityOpenState(seg.entity, opts.hass);
      return { seg, open: !!opts.forceOpen || st.open, unknown: st.unknown };
    });
    const reach = Math.max(...segs.filter((x) => x.open).map((x) => x.seg.x1 - x.seg.x0), 0);
    const cls = `opening window ${opts.selected ? "selected" : ""} ${opts.warn ? "warn" : ""}`;
    return svg`
      <g class=${cls} data-id=${o.id} transform="translate(${o.x} ${o.y}) rotate(${o.angle})" style=${style}>
        <rect class="hit" x=${-L / 2} y=${s < 0 ? -reach : -fh / 2} width=${L} height=${reach + fh}></rect>
        ${(o.shutters ?? []).map((sh) => renderShutter(sh, L, cut, opts.hass))}
        ${segs.map(({ seg, open, unknown }) => {
          const w = seg.x1 - seg.x0;
          const hingeX = seg.hinge === "right" ? seg.x1 : seg.x0;
          const hs: -1 | 1 = seg.hinge === "right" ? 1 : -1;
          return svg`
            <g class="seg ${open ? "open" : ""} ${unknown ? "unknown" : ""} ${opts.leafIndex === seg.index ? "sel" : ""}">
              <rect class="frame" x=${seg.x0} y=${-fh / 2} width=${w} height=${fh}></rect>
              ${open
                ? renderLeaf(hingeX, hs, w, s)
                : svg`<line class="glass" x1=${seg.x0} y1=${-fh / 6} x2=${seg.x1} y2=${-fh / 6}></line>
                      <line class="glass" x1=${seg.x0} y1=${fh / 6} x2=${seg.x1} y2=${fh / 6}></line>`}
            </g>`;
        })}
      </g>`;
  }
  // Tür: Blatt im rechten Winkel zur Wand plus Viertelkreis bis zur geschlossenen Lage
  const st = doorState(o, opts.hass);
  const open = !!opts.forceOpen || st.open;
  const cls = `opening door ${open ? "open" : ""} ${st.unknown ? "unknown" : ""} ${opts.selected ? "selected" : ""}`;
  return svg`
    <g class=${cls} data-id=${o.id} transform="translate(${o.x} ${o.y}) rotate(${o.angle})" style=${style}>
      <rect class="hit" x=${-L / 2} y=${s > 0 ? -cut / 2 : -L} width=${L} height=${L + cut / 2}></rect>
      ${renderLeaf((h * L) / 2, h, L, s)}
      ${renderLock(o, opts.hass)}
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
  .opening.open .leaf, .seg.open .leaf { stroke: var(--fp-open, #ef6c00); }
  .opening.open .swing, .seg.open .swing { stroke: var(--fp-open, #ef6c00); stroke-width: 1.6; }
  .opening.window .leaf { stroke-width: 2.5; }
  .seg.open .frame { stroke: var(--fp-open, #ef6c00); fill: color-mix(in srgb, var(--fp-open, #ef6c00) 15%, var(--fp-floor-color, var(--card-background-color, #fff))); }
  .opening.unknown, .seg.unknown { opacity: .5; }
  .seg.sel .frame { stroke: var(--primary-color); stroke-width: 3; }
  .lock circle { fill: var(--fp-floor-color, var(--card-background-color, #fff)); stroke-width: 1.5; }
  .lock rect { stroke: none; }
  .lock .shackle { fill: none; stroke-width: 1.6; stroke-linecap: round; }
  .lock.locked circle, .lock.locked .shackle { stroke: #43a047; }
  .lock.locked rect { fill: #43a047; }
  .lock.unlocked circle, .lock.unlocked .shackle { stroke: #fb8c00; }
  .lock.unlocked rect { fill: #fb8c00; }
  .lock.unknown circle, .lock.unknown .shackle { stroke: var(--disabled-color, #9e9e9e); }
  .lock.unknown rect { fill: var(--disabled-color, #9e9e9e); }
  .opening.warn .frame { stroke: var(--error-color, #db4437); stroke-width: 3; stroke-dasharray: 4 3; }
  .shutter-track { fill: none; stroke: var(--fp-shutter); stroke-width: 1; opacity: .7; }
  .shutter.unknown .shutter-track { stroke-dasharray: 3 3; }
  .shutter-fill { fill: var(--fp-shutter); opacity: .85; transition: height .4s ease, y .4s ease; }
  .shutter-slat { stroke: var(--fp-floor-color, var(--card-background-color, #fff)); stroke-width: .8; opacity: .7; }
  .shutter.moving .shutter-track { stroke-width: 2; opacity: 1; }
  .fp-glows { isolation: isolate; pointer-events: none; }
  .fp-glow { mix-blend-mode: screen; }
`;
