/**
 * Visueller Editor im Panel: Wände, Türen, Fenster, Räume und frei platzierte Icons
 * zeichnen und verschieben, pro Raum die Seitenleiste zusammenstellen, speichern.
 *
 * Bedienkonzept angelehnt an den Editor von easy-floorplan (MIT): Werkzeugleiste,
 * Raster- und Endpunktfang, Ziehgriffe, Eigenschaften der Auswahl in einer Leiste.
 */
import { defineElement } from "./define";
import { LitElement, css, html, nothing, svg, unsafeCSS, type PropertyValues, type TemplateResult } from "lit";
import { property, query, state } from "lit/decorators.js";
import "./entity-picker";
import {
  contentBounds,
  distance,
  nearestWall,
  orthoSnap,
  pointInPolygon,
  projectOnSegment,
  snapToAreaCorner,
  snapToEndpoint,
  snapToGrid,
} from "./geometry";
import { domainOf, entityIcon, entityKind, friendlyName, type HomeAssistant } from "./ha";
import { glowEnabled, glowReach, openingPassesLight, wallsLightPassesThrough } from "./light";
import { maxWallThickness, planSvgStyles, renderArea, renderOpening, renderWalls, wallThickness } from "./render";
import { DEFAULT_GLOW_COLOR, DEFAULT_GLOW_RADIUS, DEFAULT_OPEN_COLOR, DEFAULT_SHUTTER_COLOR, newId, normalizePlan, AREA_TYPES, type Area, type Floor, type FloorItem, type Leaf, type Opening, type Plan, type Point, type Shutter, type ShutterSide, type Wall, MAX_LEAVES } from "./types";
import { leafSegments, setLeafCount, setLeafWidth, windowLeaves, windowMissingSensor } from "./openings";

const DOMAIN = "floorplan_panel";
const UNDO_LIMIT = 100;
/** Fangradius in Bildschirmpixeln. */
const SNAP_PX = 12;
const samePoint = (x: number, y: number, p: Point) => Math.abs(x - p.x) < 0.5 && Math.abs(y - p.y) < 0.5;
const ITEM_RADIUS_PX = 14;
const HANDLE_RADIUS_PX = 7;

type Tool = "select" | "wall" | "area" | "rect" | "door" | "window" | "item";
type Kind = "wall" | "opening" | "area" | "item";
interface Selection {
  kind: Kind;
  id: string;
}

interface DragState {
  mode: "move" | "handle" | "pan" | "rect";
  pointerId: number;
  start: Point;
  screenStart: Point;
  /** Stand vor dem Ziehen (für Undo, nur wenn tatsächlich bewegt). */
  before: string;
  moved: boolean;
  sel?: Selection;
  handle?: string;
  orig?: any;
  /** Beim Ziehen mitbewegte Wand-Endpunkte und Raumecken, die auf dem gezogenen Punkt liegen. */
  links?: Link[];
  viewStart?: View;
}

interface Link {
  /** Welcher Endpunkt der gezogenen Wand gemeint ist (0: Raumecke). */
  end: 0 | 1 | 2;
  walls: { wall: Wall; end: 1 | 2 }[];
  verts: Point[];
}

interface View {
  x: number;
  y: number;
  w: number;
  h: number;
}

const TOOLS: { id: Tool; icon: string; label: string; hint: string }[] = [
  { id: "select", icon: "mdi:cursor-default-outline", label: "Auswahl", hint: "Element anklicken zum Bearbeiten, ziehen zum Verschieben. Leere Fläche ziehen verschiebt die Ansicht, Mausrad zoomt." },
  { id: "wall", icon: "mdi:wall", label: "Wand", hint: "Klick setzt Anfang, weitere Klicks setzen Wandstücke. Esc oder Doppelklick beendet. Umschalt: freier Winkel, Alt: ohne Raster." },
  { id: "area", icon: "mdi:vector-polygon", label: "Raum", hint: "Ecken nacheinander anklicken, zum Schließen den ersten Punkt anklicken oder Enter drücken. Esc bricht ab." },
  { id: "rect", icon: "mdi:vector-rectangle", label: "Raum (Rechteck)", hint: "Von Ecke zu Ecke ziehen: legt Raumfläche und die vier Wände in einem Zug an. Alt: ohne Raster/Fang, Esc bricht ab." },
  { id: "door", icon: "mdi:door", label: "Tür", hint: "Auf eine Wand klicken, um dort eine Tür einzusetzen." },
  { id: "window", icon: "mdi:window-closed-variant", label: "Fenster", hint: "Auf eine Wand klicken, um dort ein Fenster einzusetzen." },
  { id: "item", icon: "mdi:map-marker-plus", label: "Icon", hint: "Klick platziert ein freies Icon – Icon und Entität danach rechts wählen." },
];

const QUICK_ICONS = [
  "mdi:ceiling-light",
  "mdi:lightbulb",
  "mdi:floor-lamp",
  "mdi:lamp",
  "mdi:led-strip-variant",
  "mdi:power-socket-de",
  "mdi:television",
  "mdi:speaker",
  "mdi:thermometer",
  "mdi:radiator",
  "mdi:fan",
  "mdi:window-shutter",
  "mdi:door",
  "mdi:lock",
  "mdi:motion-sensor",
  "mdi:smoke-detector",
  "mdi:water",
  "mdi:washing-machine",
  "mdi:dishwasher",
  "mdi:fridge",
  "mdi:coffee-maker",
  "mdi:robot-vacuum",
  "mdi:cctv",
  "mdi:router-wireless",
  "mdi:flower",
  "mdi:information",
];

const ROOM_COLORS = ["#4f8bd6", "#e0a030", "#3fb5a8", "#8e6cc9", "#d65f5f", "#6aa84f", "#9e9e9e"];

@defineElement("fp-editor")
export class FpEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) plan!: Plan;
  @property({ attribute: false }) revision = 0;
  @property({ attribute: false }) floorId?: string;
  @property({ attribute: false }) initialAreaId?: string;
  @property({ type: Boolean, reflect: true }) narrow = false;

  @state() private _draft!: Plan;
  @state() private _floorId!: string;
  @state() private _tool: Tool = "select";
  @state() private _sel?: Selection;
  @state() private _leafSel?: number;
  @state() private _view: View = { x: 0, y: 0, w: 1000, h: 700 };
  @state() private _cursor?: Point;
  @state() private _chainStart?: Point;
  @state() private _roomPoints: Point[] = [];
  @state() private _dirty = false;
  @state() private _saving = false;
  @state() private _error?: string;
  @state() private _conflict = false;
  @state() private _history?: { id: number; created: string; reason: string; revision: number }[];
  @state() private _svgSize = { w: 1, h: 1 };

  @query("svg.canvas") private _svg!: SVGSVGElement;

  private _undo: string[] = [];
  private _redo: string[] = [];
  private _drag?: DragState;
  private _ro?: ResizeObserver;
  private _baseRevision = 0;
  private readonly _keyHandler = (ev: KeyboardEvent) => this._onKey(ev);

  // ---------------------------------------------------------------- Lebenszyklus

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("plan") && !this._draft) {
      this._draft = normalizePlan(structuredClone(this.plan));
      this._baseRevision = this.revision;
      this._floorId = this.floorId && this._draft.floors.some((f) => f.id === this.floorId) ? this.floorId : this._draft.floors[0]?.id;
      if (!this._floorId) {
        this._draft.floors.push({ id: "eg", name: "Wohnung", walls: [], openings: [], areas: [], items: [] });
        this._floorId = "eg";
      }
      this._fitView();
      if (this.initialAreaId && this._floor.areas.some((a) => a.id === this.initialAreaId)) {
        this._sel = { kind: "area", id: this.initialAreaId };
      }
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("keydown", this._keyHandler);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("keydown", this._keyHandler);
    this._ro?.disconnect();
  }

  protected firstUpdated(): void {
    this._ro = new ResizeObserver(() => {
      const r = this._svg?.getBoundingClientRect();
      if (r && r.width && r.height) this._svgSize = { w: r.width, h: r.height };
    });
    if (this._svg) this._ro.observe(this._svg);
  }

  private get _floor(): Floor {
    return this._draft.floors.find((f) => f.id === this._floorId)!;
  }

  /** Planeinheiten pro Bildschirmpixel (für Griffe, Fangradius, Icons). */
  private get _upp(): number {
    return Math.max(this._view.w / this._svgSize.w, this._view.h / this._svgSize.h);
  }

  private _fitView(): void {
    const b = contentBounds(this._floor, this._draft);
    // Etwas Luft, damit nach außen weitergezeichnet werden kann
    const pad = Math.max(b.w, b.h) * 0.1;
    this._view = { x: b.x - pad, y: b.y - pad, w: b.w + 2 * pad, h: b.h + 2 * pad };
  }

  // ---------------------------------------------------------------- Änderungen & Undo

  private _snapshot(): string {
    return JSON.stringify({ plan: this._draft, floorId: this._floorId });
  }

  private _pushUndo(snapshot: string): void {
    this._undo.push(snapshot);
    if (this._undo.length > UNDO_LIMIT) this._undo.shift();
    this._redo = [];
    this._dirty = true;
  }

  /** Führt eine Änderung am Entwurf aus und legt vorher einen Undo-Schritt an. */
  private _mutate(fn: (floor: Floor, plan: Plan) => void): void {
    this._pushUndo(this._snapshot());
    fn(this._floor, this._draft);
    this._draft = { ...this._draft };
  }

  private _restore(snapshot: string): void {
    const { plan, floorId } = JSON.parse(snapshot);
    this._draft = plan;
    this._floorId = floorId;
    if (this._sel && !this._findSelected()) this._sel = undefined;
  }

  private _doUndo(): void {
    const prev = this._undo.pop();
    if (!prev) return;
    this._redo.push(this._snapshot());
    this._restore(prev);
    this._dirty = true;
  }

  private _doRedo(): void {
    const next = this._redo.pop();
    if (!next) return;
    this._undo.push(this._snapshot());
    this._restore(next);
    this._dirty = true;
  }

  private _findSelected(): Wall | Opening | Area | FloorItem | undefined {
    if (!this._sel) return undefined;
    return this._collection(this._sel.kind).find((e) => e.id === this._sel!.id);
  }

  private _collection(kind: Kind): (Wall | Opening | Area | FloorItem)[] {
    const f = this._floor;
    return kind === "wall" ? f.walls : kind === "opening" ? f.openings : kind === "area" ? f.areas : f.items;
  }

  /** Fenster ohne Fensterkontakt auf allen Etagen (Pflichtfeld, nur Warnung). */
  private get _windowsWithoutContact(): { floorId: string; opening: Opening }[] {
    return this._draft.floors.flatMap((f) =>
      f.openings.filter(windowMissingSensor).map((opening) => ({ floorId: f.id, opening }))
    );
  }

  private _selectOpening(floorId: string, id: string): void {
    this._floorId = floorId;
    this._sel = { kind: "opening", id };
    this._tool = "select";
  }

  private _deleteSelected(): void {
    const sel = this._sel;
    if (!sel) return;
    this._mutate((f) => {
      const key = sel.kind === "wall" ? "walls" : sel.kind === "opening" ? "openings" : sel.kind === "area" ? "areas" : "items";
      (f as any)[key] = (f as any)[key].filter((e: { id: string }) => e.id !== sel.id);
    });
    this._sel = undefined;
  }

  /** Ändert ein Feld der Auswahl; leere Werte entfernen das Feld. */
  private _setProp(key: string, value: unknown): void {
    const sel = this._sel;
    if (!sel) return;
    this._mutate(() => {
      const el = this._findSelected() as any;
      if (!el) return;
      if (value === "" || value === undefined || value === null || (typeof value === "number" && Number.isNaN(value))) delete el[key];
      else el[key] = value;
    });
  }

  // ---------------------------------------------------------------- Speichern

  private async _save(force = false): Promise<void> {
    this._saving = true;
    this._error = undefined;
    try {
      const res = await this.hass.callWS<{ plan: Plan; revision: number }>({
        type: `${DOMAIN}/plan/save`,
        plan: this._draft,
        revision: force ? null : this._baseRevision,
      });
      this._conflict = false;
      this._dirty = false;
      this._baseRevision = res.revision;
      this.dispatchEvent(new CustomEvent("editor-done", { detail: { plan: res.plan, revision: res.revision } }));
    } catch (err: any) {
      if (err?.code === "conflict") this._conflict = true;
      this._error = err?.message ?? String(err);
    } finally {
      this._saving = false;
    }
  }

  private _close(): void {
    if (this._dirty && !confirm("Ungespeicherte Änderungen verwerfen?")) return;
    this.dispatchEvent(new CustomEvent("editor-done", { detail: {} }));
  }

  private async _loadSample(): Promise<void> {
    if (!confirm("Den aktuellen Grundriss durch den Beispiel-Grundriss ersetzen? Der bisherige Stand bleibt im Verlauf.")) return;
    try {
      const res = await this.hass.callWS<{ plan: Plan; revision: number }>({ type: `${DOMAIN}/plan/load_sample` });
      this._acceptServerPlan(res.plan, res.revision);
    } catch (err: any) {
      this._error = err?.message ?? String(err);
    }
  }

  private _acceptServerPlan(plan: Plan, revision: number): void {
    this._draft = normalizePlan(plan);
    this._baseRevision = revision;
    this._floorId = this._draft.floors[0].id;
    this._undo = [];
    this._redo = [];
    this._dirty = false;
    this._sel = undefined;
    this._history = undefined;
    this._fitView();
  }

  private async _loadHistory(): Promise<void> {
    const res = await this.hass.callWS<{ items: FpEditor["_history"] }>({ type: `${DOMAIN}/history/list` });
    this._history = res.items;
  }

  private async _restoreHistory(id: number): Promise<void> {
    if (!confirm("Diesen Stand wiederherstellen? Der aktuelle gespeicherte Stand bleibt im Verlauf.")) return;
    const res = await this.hass.callWS<{ plan: Plan; revision: number }>({ type: `${DOMAIN}/history/restore`, history_id: id });
    this._acceptServerPlan(res.plan, res.revision);
  }

  // ---------------------------------------------------------------- Zeiger

  private _toPlan(ev: { clientX: number; clientY: number }): Point {
    const ctm = this._svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  }

  /** Raster + Endpunktfang (Alt schaltet beides ab). */
  private _snap(p: Point, ev: { altKey: boolean }, ignore: readonly Wall[] = [], ignorePts: readonly Point[] = []): Point {
    if (ev.altKey) return p;
    const ep = snapToEndpoint(p, this._floor.walls, SNAP_PX * this._upp, ignore);
    if (ep) return { ...ep };
    const corner = snapToAreaCorner(p, this._floor.areas, SNAP_PX * this._upp, ignorePts);
    if (corner) return corner;
    const g = this._draft.settings.grid;
    return { x: snapToGrid(p.x, g), y: snapToGrid(p.y, g) };
  }

  private _hit(ev: Event): { kind: Kind | "handle"; id: string; handle?: string } | undefined {
    for (const el of ev.composedPath()) {
      if (!(el instanceof Element)) continue;
      if (el === this._svg) break;
      const handle = el.getAttribute("data-handle");
      if (handle) return { kind: "handle", id: el.getAttribute("data-owner") ?? "", handle };
      const kind = el.getAttribute("data-kind") as Kind | null;
      const id = el.getAttribute("data-id");
      if (kind && id) return { kind, id };
    }
    return undefined;
  }

  private _onPointerDown(ev: PointerEvent): void {
    if (ev.button === 2) return;
    const p = this._toPlan(ev);
    const before = this._snapshot();
    const base = { pointerId: ev.pointerId, start: p, screenStart: { x: ev.clientX, y: ev.clientY }, before, moved: false };

    // mittlere Maustaste verschiebt immer die Ansicht
    if (ev.button === 1) {
      this._drag = { ...base, mode: "pan", viewStart: { ...this._view } };
      this._svg.setPointerCapture(ev.pointerId);
      ev.preventDefault();
      return;
    }

    switch (this._tool) {
      case "select": {
        const hit = this._hit(ev);
        if (hit?.kind === "handle" && this._sel) {
          const el = this._findSelected();
          this._drag = { ...base, mode: "handle", sel: this._sel, handle: hit.handle, orig: structuredClone(el) };
          if (this._sel.kind === "wall" && el) {
            const end = hit.handle === "p1" ? 1 : 2;
            this._drag.links = [this._linksAt(el as Wall, end)];
          } else if (this._sel.kind === "area" && el && hit.handle?.startsWith("v")) {
            const pt = (el as Area).points[Number(hit.handle!.slice(1))];
            this._drag.links = [this._linksAt(undefined, 0, pt, el as Area)];
          }
        } else if (hit && hit.kind !== "handle") {
          this._sel = { kind: hit.kind, id: hit.id };
          this._drag = { ...base, mode: "move", sel: this._sel, orig: structuredClone(this._findSelected()) };
          if (hit.kind === "wall") {
            const w = this._findSelected() as Wall;
            this._drag.links = [this._linksAt(w, 1), this._linksAt(w, 2)];
          }
        } else {
          this._sel = undefined;
          this._drag = { ...base, mode: "pan", viewStart: { ...this._view } };
        }
        this._svg.setPointerCapture(ev.pointerId);
        break;
      }
      case "wall": {
        const sp = this._snap(p, ev);
        if (!this._chainStart) {
          this._chainStart = sp;
        } else {
          const end = ev.shiftKey ? sp : orthoSnap(this._chainStart, sp);
          if (distance(end, this._chainStart) > 1) {
            const start = this._chainStart;
            this._mutate((f) => f.walls.push({ id: newId("w"), x1: start.x, y1: start.y, x2: end.x, y2: end.y }));
            this._chainStart = end;
          }
        }
        break;
      }
      case "area": {
        const sp = this._snap(p, ev);
        if (this._roomPoints.length >= 3 && distance(sp, this._roomPoints[0]) <= SNAP_PX * this._upp) {
          this._finishRoom();
        } else {
          this._roomPoints = [...this._roomPoints, sp];
        }
        break;
      }
      case "rect": {
        this._drag = { ...base, mode: "rect", start: this._snap(p, ev) };
        this._svg.setPointerCapture(ev.pointerId);
        break;
      }
      case "door":
      case "window":
        this._placeOpening(this._tool, p, ev);
        break;
      case "item": {
        const sp = this._snap(p, ev);
        const id = newId("i");
        this._mutate((f) => f.items.push({ id, x: sp.x, y: sp.y, icon: "mdi:lightbulb", tapAction: "auto" }));
        this._sel = { kind: "item", id };
        this._tool = "select";
        break;
      }
    }
  }

  private _onPointerMove(ev: PointerEvent): void {
    const p = this._toPlan(ev);
    this._cursor = p;
    const d = this._drag;
    if (!d || d.pointerId !== ev.pointerId) return;
    const dxScreen = ev.clientX - d.screenStart.x;
    const dyScreen = ev.clientY - d.screenStart.y;
    if (!d.moved && Math.hypot(dxScreen, dyScreen) < 3) return;
    d.moved = true;

    if (d.mode === "pan" && d.viewStart) {
      const upp = this._upp;
      this._view = { ...d.viewStart, x: d.viewStart.x - dxScreen * upp, y: d.viewStart.y - dyScreen * upp };
      return;
    }
    const el = this._findSelected() as any;
    if (!el || !d.sel) return;
    const g = ev.altKey ? 0 : this._draft.settings.grid;
    const dx = snapToGrid(p.x - d.start.x, g);
    const dy = snapToGrid(p.y - d.start.y, g);
    const o = d.orig;

    if (d.mode === "move") {
      switch (d.sel.kind) {
        case "wall":
          Object.assign(el, { x1: o.x1 + dx, y1: o.y1 + dy, x2: o.x2 + dx, y2: o.y2 + dy });
          for (const l of d.links ?? []) this._applyLink(l, l.end === 1 ? { x: o.x1 + dx, y: o.y1 + dy } : { x: o.x2 + dx, y: o.y2 + dy });
          break;
        case "area":
          el.points = o.points.map((q: Point) => ({ x: q.x + dx, y: q.y + dy }));
          break;
        case "item":
          Object.assign(el, { x: o.x + dx, y: o.y + dy });
          break;
        case "opening": {
          const target = { x: o.x + (p.x - d.start.x), y: o.y + (p.y - d.start.y) };
          const hit = nearestWall(target, this._floor.walls, maxWallThickness(this._floor, this._draft) * 2 + SNAP_PX * this._upp);
          if (hit && !ev.altKey) {
            Object.assign(el, { x: round(hit.point.x), y: round(hit.point.y), angle: alignAngle(o.angle, hit.angle) });
          } else {
            Object.assign(el, { x: o.x + dx, y: o.y + dy });
          }
          break;
        }
      }
    } else if (d.mode === "handle" && d.handle) {
      if (d.sel.kind === "wall") {
        const end = d.handle === "p1" ? 1 : 2;
        const other = end === 1 ? { x: o.x2, y: o.y2 } : { x: o.x1, y: o.y1 };
        const link = d.links?.[0];
        let np = this._snap(p, ev, [el, ...(link?.walls ?? []).map((l) => l.wall)], link?.verts ?? []);
        if (!ev.shiftKey && !ev.altKey) np = orthoSnap(other, np);
        el[`x${end}`] = np.x;
        el[`y${end}`] = np.y;
        if (link) this._applyLink(link, np);
      } else if (d.sel.kind === "area" && d.handle.startsWith("v")) {
        const pt = el.points[Number(d.handle.slice(1))] as Point;
        const link = d.links?.[0];
        const np = this._snap(p, ev, link?.walls.map((l) => l.wall) ?? [], [pt, ...(link?.verts ?? [])]);
        Object.assign(pt, np);
        if (link) this._applyLink(link, np);
      }
    }
    this._draft = { ...this._draft };
  }

  private _onPointerUp(ev: PointerEvent): void {
    const d = this._drag;
    if (!d || d.pointerId !== ev.pointerId) return;
    this._drag = undefined;
    if (this._svg.hasPointerCapture(ev.pointerId)) this._svg.releasePointerCapture(ev.pointerId);
    if (d.mode === "rect") {
      this._finishRect(d.start, this._snap(this._toPlan(ev), ev));
      return;
    }
    if (d.moved && d.mode !== "pan") this._pushUndo(d.before);
  }

  private _onDblClick(ev: MouseEvent): void {
    if (this._tool === "wall") {
      this._chainStart = undefined;
      return;
    }
    if (this._tool === "area" && this._roomPoints.length >= 3) {
      this._finishRoom();
      return;
    }
    if (this._tool !== "select" || this._sel?.kind !== "area") return;
    const area = this._findSelected() as Area;
    const hit = this._hit(ev);
    // Doppelklick auf einen Eckpunkt entfernt ihn, auf eine Kante fügt er einen ein
    if (hit?.kind === "handle" && hit.handle?.startsWith("v")) {
      if (area.points.length <= 3) return;
      const i = Number(hit.handle.slice(1));
      this._mutate(() => area.points.splice(i, 1));
      return;
    }
    const p = this._toPlan(ev);
    let best = { i: -1, d: SNAP_PX * this._upp, pt: p };
    area.points.forEach((a, i) => {
      const b = area.points[(i + 1) % area.points.length];
      const { point } = projectOnSegment(p, a, b);
      const dd = distance(p, point);
      if (dd < best.d) best = { i, d: dd, pt: point };
    });
    if (best.i >= 0) {
      const pt = this._snap(best.pt, ev);
      this._mutate(() => area.points.splice(best.i + 1, 0, pt));
    }
  }

  private _onWheel(ev: WheelEvent): void {
    ev.preventDefault();
    const p = this._toPlan(ev);
    const f = Math.exp(ev.deltaY * 0.0015);
    const { width, height } = this._draft.canvas;
    const maxW = Math.max(width, height) * 8;
    const w = Math.min(maxW, Math.max(50, this._view.w * f));
    const k = w / this._view.w;
    this._view = {
      x: p.x - (p.x - this._view.x) * k,
      y: p.y - (p.y - this._view.y) * k,
      w,
      h: this._view.h * k,
    };
  }

  private _onKey(ev: KeyboardEvent): void {
    const target = ev.composedPath()[0] as HTMLElement | undefined;
    const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT");
    if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === "z" && !typing) {
      ev.preventDefault();
      if (ev.shiftKey) this._doRedo();
      else this._doUndo();
      return;
    }
    if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === "y" && !typing) {
      ev.preventDefault();
      this._doRedo();
      return;
    }
    if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === "s") {
      ev.preventDefault();
      if (this._dirty && !this._saving) this._save();
      return;
    }
    if (typing) return;
    if (ev.key === "Escape") {
      if (this._drag?.mode === "rect") {
        if (this._svg.hasPointerCapture(this._drag.pointerId)) this._svg.releasePointerCapture(this._drag.pointerId);
        this._drag = undefined;
      } else if (this._chainStart) this._chainStart = undefined;
      else if (this._roomPoints.length) this._roomPoints = [];
      else if (this._tool !== "select") this._tool = "select";
      else this._sel = undefined;
    } else if (ev.key === "Enter" && this._tool === "area" && this._roomPoints.length >= 3) {
      this._finishRoom();
    } else if ((ev.key === "Delete" || ev.key === "Backspace") && this._sel) {
      ev.preventDefault();
      this._deleteSelected();
    }
  }

  /** Wand-Endpunkte und Raumecken, die genau auf dem Punkt liegen (Endpunkt `end` von `wall` bzw. `pt` einer Raumecke). */
  private _linksAt(wall: Wall | undefined, end: 0 | 1 | 2, pt?: Point, area?: Area): Link {
    const p = pt ?? (end === 1 ? { x: wall!.x1, y: wall!.y1 } : { x: wall!.x2, y: wall!.y2 });
    const walls: Link["walls"] = [];
    for (const w of this._floor.walls) {
      if (w === wall) continue;
      if (distance(p, { x: w.x1, y: w.y1 }) < 0.5) walls.push({ wall: w, end: 1 });
      if (distance(p, { x: w.x2, y: w.y2 }) < 0.5) walls.push({ wall: w, end: 2 });
    }
    const verts: Point[] = [];
    for (const a of this._floor.areas) {
      for (const q of a.points) if (q !== pt && a !== area && distance(p, q) < 0.5) verts.push(q);
    }
    return { end, walls, verts };
  }

  private _applyLink(l: Link, np: Point): void {
    for (const w of l.walls) {
      (w.wall as any)[`x${w.end}`] = np.x;
      (w.wall as any)[`y${w.end}`] = np.y;
    }
    for (const q of l.verts) Object.assign(q, np);
  }

  private _placeOpening(type: "door" | "window", p: Point, ev: PointerEvent): void {
    const hit = nearestWall(p, this._floor.walls, maxWallThickness(this._floor, this._draft) + SNAP_PX * 2 * this._upp);
    const length = type === "door" ? 80 : 120;
    const pos = hit ? { x: round(hit.point.x), y: round(hit.point.y) } : this._snap(p, ev);
    const id = newId(type === "door" ? "t" : "f");
    const opening: Opening = { id, type, x: pos.x, y: pos.y, length, angle: hit ? alignAngle(0, hit.angle) : 0 };
    if (type === "door") Object.assign(opening, { hinge: "left", swing: "in" });
    this._mutate((f) => f.openings.push(opening));
    this._sel = { kind: "opening", id };
  }

  private _finishRoom(): void {
    const points = this._roomPoints;
    if (points.length < 3) return;
    const id = newId("r");
    const n = this._floor.areas.length;
    this._mutate((f) =>
      f.areas.push({ id, name: `Raum ${n + 1}`, points, color: ROOM_COLORS[n % ROOM_COLORS.length], sidebar: [] })
    );
    this._roomPoints = [];
    this._sel = { kind: "area", id };
    this._tool = "select";
  }

  private _finishRect(a: Point, b: Point): void {
    const x1 = Math.min(a.x, b.x);
    const x2 = Math.max(a.x, b.x);
    const y1 = Math.min(a.y, b.y);
    const y2 = Math.max(a.y, b.y);
    if (x2 - x1 < 1 || y2 - y1 < 1) return;
    const corners: Point[] = [
      { x: x1, y: y1 },
      { x: x2, y: y1 },
      { x: x2, y: y2 },
      { x: x1, y: y2 },
    ];
    const id = newId("r");
    const n = this._floor.areas.length;
    this._mutate((f) => {
      corners.forEach((c, i) => {
        const d = corners[(i + 1) % 4];
        const exists = f.walls.some(
          (w) => (samePoint(w.x1, w.y1, c) && samePoint(w.x2, w.y2, d)) || (samePoint(w.x1, w.y1, d) && samePoint(w.x2, w.y2, c))
        );
        if (!exists) f.walls.push({ id: newId("w"), x1: c.x, y1: c.y, x2: d.x, y2: d.y });
      });
      f.areas.push({ id, name: `Raum ${n + 1}`, points: corners, color: ROOM_COLORS[n % ROOM_COLORS.length], sidebar: [] });
    });
    this._sel = { kind: "area", id };
    this._tool = "select";
  }

  private _setTool(tool: Tool): void {
    this._tool = tool;
    this._chainStart = undefined;
    this._roomPoints = [];
  }

  // ---------------------------------------------------------------- Darstellung

  protected render() {
    if (!this._draft) return nothing;
    const tool = TOOLS.find((t) => t.id === this._tool)!;
    return html`
      <div class="toolbar">
        <button class="icon-btn" title="Schließen" @click=${this._close}><ha-icon icon="mdi:close"></ha-icon></button>
        <div class="main-title">Grundriss bearbeiten${this._dirty ? html`<span class="dirty"> • ungespeichert</span>` : nothing}</div>
        <button class="icon-btn" title="Rückgängig (Strg+Z)" ?disabled=${!this._undo.length} @click=${this._doUndo}>
          <ha-icon icon="mdi:undo"></ha-icon>
        </button>
        <button class="icon-btn" title="Wiederholen (Strg+Y)" ?disabled=${!this._redo.length} @click=${this._doRedo}>
          <ha-icon icon="mdi:redo"></ha-icon>
        </button>
        ${this._windowsWithoutContact.length
          ? html`<button
              class="warn-chip"
              title="Fenster ohne Fensterkontakt – zum ersten springen"
              @click=${() => {
                const w = this._windowsWithoutContact[0];
                this._selectOpening(w.floorId, w.opening.id);
              }}
            >
              <ha-icon icon="mdi:alert"></ha-icon>${this._windowsWithoutContact.length} Fenster ohne Kontakt
            </button>`
          : nothing}
        <button class="save" ?disabled=${!this._dirty || this._saving} @click=${() => this._save()}>
          ${this._saving ? "Speichert …" : "Speichern"}
        </button>
      </div>
      ${this._error
        ? html`<div class="error-bar">
            ${this._conflict ? "Der Grundriss wurde inzwischen an anderer Stelle gespeichert." : this._error}
            ${this._conflict ? html`<button @click=${() => this._save(true)}>Trotzdem überschreiben</button>` : nothing}
            <button @click=${() => (this._error = undefined)}>OK</button>
          </div>`
        : nothing}
      <div class="body">
        <div class="tools">
          ${TOOLS.map(
            (t) => html`<button class="tool ${t.id === this._tool ? "active" : ""}" title=${t.label} @click=${() => this._setTool(t.id)}>
              <ha-icon .icon=${t.icon}></ha-icon><span>${t.label}</span>
            </button>`
          )}
          <div class="sep"></div>
          <button class="tool" title="Ganze Etage zeigen" @click=${this._fitView}>
            <ha-icon icon="mdi:fit-to-screen-outline"></ha-icon><span>Einpassen</span>
          </button>
        </div>
        <div class="canvas-wrap">
          <svg
            class="canvas tool-${this._tool}"
            viewBox="${this._view.x} ${this._view.y} ${this._view.w} ${this._view.h}"
            preserveAspectRatio="xMidYMid meet"
            @pointerdown=${this._onPointerDown}
            @pointermove=${this._onPointerMove}
            @pointerup=${this._onPointerUp}
            @pointercancel=${this._onPointerUp}
            @pointerleave=${() => (this._cursor = undefined)}
            @dblclick=${this._onDblClick}
            @wheel=${this._onWheel}
            @contextmenu=${(ev: Event) => {
              ev.preventDefault();
              this._chainStart = undefined;
            }}
          >
            ${this._renderCanvas()}
          </svg>
          <div class="hint">${tool.hint}</div>
        </div>
        <div class="props">${this._renderProps()}</div>
      </div>
    `;
  }

  private _renderCanvas() {
    const plan = this._draft;
    const floor = this._floor;
    const { width, height } = plan.canvas;
    const upp = this._upp;
    const grid = plan.settings.grid;
    const majorGrid = grid * 10;
    const cut = maxWallThickness(floor, plan) + 2;
    const sel = this._sel;
    // Zeichenfläche ohne Rand: Hintergrund und Raster decken immer den ganzen sichtbaren Bereich ab
    const v = this._view;
    const [gx, gy, gw, gh] = [v.x - v.w, v.y - v.h, v.w * 3, v.h * 3];
    return svg`
      <defs>
        <pattern id="grid-minor" width=${grid} height=${grid} patternUnits="userSpaceOnUse">
          <path d="M ${grid} 0 L 0 0 0 ${grid}" class="grid-minor"></path>
        </pattern>
        <pattern id="grid-major" width=${majorGrid} height=${majorGrid} patternUnits="userSpaceOnUse">
          <rect width=${majorGrid} height=${majorGrid} fill="url(#grid-minor)"></rect>
          <path d="M ${majorGrid} 0 L 0 0 0 ${majorGrid}" class="grid-major"></path>
        </pattern>
      </defs>
      <rect class="sheet" x=${gx} y=${gy} width=${gw} height=${gh}></rect>
      ${grid * (1 / upp) >= 4 ? svg`<rect x=${gx} y=${gy} width=${gw} height=${gh} fill="url(#grid-major)" pointer-events="none"></rect>` : nothing}
      <g class="areas">
        ${floor.areas.map(
          (a) => svg`<g data-kind="area" data-id=${a.id}>${renderArea(a, {
            selected: sel?.kind === "area" && sel.id === a.id,
            labelSize: Math.max(width, height) / 45,
          })}</g>`
        )}
      </g>
      ${renderWalls(floor, plan, "fp-editor-wall-mask", { selectedId: sel?.kind === "wall" ? sel.id : undefined })}
      <g class="wall-hits">
        ${floor.walls.map(
          (w) => svg`<line data-kind="wall" data-id=${w.id} x1=${w.x1} y1=${w.y1} x2=${w.x2} y2=${w.y2}
                           stroke-width=${Math.max(wallThickness(w, plan), 10 * upp)}></line>`
        )}
      </g>
      <g class="openings">
        ${floor.openings.map(
          (o) => svg`<g data-kind="opening" data-id=${o.id}>${renderOpening(o, cut, { selected: sel?.kind === "opening" && sel.id === o.id, forceOpen: sel?.kind === "opening" && sel.id === o.id, warn: windowMissingSensor(o), leafIndex: sel?.kind === "opening" && sel.id === o.id ? (this._leafSel ?? undefined) : undefined })}</g>`
        )}
      </g>
      <g class="items">${floor.items.map((it) => this._renderItem(it, upp))}</g>
      ${this._renderSelectionOverlay(upp)}
      ${this._renderDrawPreview(upp)}
    `;
  }

  private _renderItem(it: FloorItem, upp: number) {
    const r = ((it.size ?? 34) / 34) * ITEM_RADIUS_PX * upp;
    const selected = this._sel?.kind === "item" && this._sel.id === it.id;
    const icon = it.icon ?? (it.entity ? entityIcon(this.hass, it.entity) : "mdi:map-marker");
    return svg`
      <g class="item ${selected ? "selected" : ""}" data-kind="item" data-id=${it.id}>
        <circle cx=${it.x} cy=${it.y} r=${r}></circle>
        <foreignObject x=${it.x - r} y=${it.y - r} width=${2 * r} height=${2 * r}>
          <div class="fo-icon" style="--mdc-icon-size:${r * 1.2}px;width:${2 * r}px;height:${2 * r}px">
            <ha-icon .icon=${icon}></ha-icon>
          </div>
        </foreignObject>
        ${it.label ? svg`<text x=${it.x} y=${it.y + r + 12 * upp} font-size=${11 * upp} text-anchor="middle" class="item-label">${it.label}</text>` : nothing}
      </g>`;
  }

  private _renderSelectionOverlay(upp: number) {
    const el = this._findSelected();
    if (!el || !this._sel) return nothing;
    if (this._sel.kind === "item" && glowEnabled(el as FloorItem)) {
      const it = el as FloorItem;
      const r = it.glowRadius ?? DEFAULT_GLOW_RADIUS;
      const thickness = (w: Wall) => wallThickness(w, this._draft);
      const walls = wallsLightPassesThrough(this._floor.walls, this._floor.openings, (o) => openingPassesLight(o), thickness);
      const reach = glowReach(it.x, it.y, r, walls, thickness);
      return reach
        ? svg`<polygon class="glow-reach" points=${reach.map((p) => `${p.x},${p.y}`).join(" ")} stroke-width=${1.5 * upp}></polygon>`
        : svg`<circle class="glow-reach" cx=${it.x} cy=${it.y} r=${r} stroke-width=${1.5 * upp}></circle>`;
    }
    const hr = HANDLE_RADIUS_PX * upp;
    if (this._sel.kind === "wall") {
      const w = el as Wall;
      return svg`
        <line class="sel-line" x1=${w.x1} y1=${w.y1} x2=${w.x2} y2=${w.y2} stroke-width=${2 * upp}></line>
        <circle class="handle" data-handle="p1" cx=${w.x1} cy=${w.y1} r=${hr} stroke-width=${2 * upp}></circle>
        <circle class="handle" data-handle="p2" cx=${w.x2} cy=${w.y2} r=${hr} stroke-width=${2 * upp}></circle>
        ${this._lengthLabel({ x: w.x1, y: w.y1 }, { x: w.x2, y: w.y2 }, upp)}`;
    }
    if (this._sel.kind === "area") {
      const a = el as Area;
      return svg`
        <polygon class="sel-outline" points=${a.points.map((p) => `${p.x},${p.y}`).join(" ")} stroke-width=${2 * upp}></polygon>
        ${a.points.map(
          (p, i) => svg`<circle class="handle" data-handle="v${i}" cx=${p.x} cy=${p.y} r=${hr} stroke-width=${2 * upp}></circle>`
        )}`;
    }
    return nothing;
  }

  private _lengthLabel(a: Point, b: Point, upp: number) {
    const len = distance(a, b);
    if (len < 1) return nothing;
    return svg`<text class="measure" x=${(a.x + b.x) / 2} y=${(a.y + b.y) / 2 - 10 * upp} font-size=${12 * upp}
                     text-anchor="middle">${formatLength(len)}</text>`;
  }

  private _renderDrawPreview(upp: number) {
    const c = this._cursor;
    if (!c) return nothing;
    const fake = { altKey: false };
    if (this._tool === "wall") {
      const sp = this._snap(c, fake);
      if (!this._chainStart) return svg`<circle class="cursor-dot" cx=${sp.x} cy=${sp.y} r=${4 * upp}></circle>`;
      const end = orthoSnap(this._chainStart, sp);
      return svg`
        <line class="preview-wall" x1=${this._chainStart.x} y1=${this._chainStart.y} x2=${end.x} y2=${end.y}
              stroke-width=${this._draft.settings.wallThickness}></line>
        ${this._lengthLabel(this._chainStart, end, upp)}`;
    }
    if (this._tool === "rect") {
      const sp = this._snap(c, fake);
      const d = this._drag;
      if (d?.mode !== "rect") return svg`<circle class="cursor-dot" cx=${sp.x} cy=${sp.y} r=${4 * upp}></circle>`;
      const x = Math.min(d.start.x, sp.x);
      const y = Math.min(d.start.y, sp.y);
      const w = Math.abs(sp.x - d.start.x);
      const h = Math.abs(sp.y - d.start.y);
      return svg`
        <rect class="preview-area" x=${x} y=${y} width=${w} height=${h} stroke-width=${2 * upp}></rect>
        ${w > 1 ? this._lengthLabel({ x, y }, { x: x + w, y }, upp) : nothing}
        ${h > 1 ? this._lengthLabel({ x: x + w, y }, { x: x + w, y: y + h }, upp) : nothing}`;
    }
    if (this._tool === "area") {
      const sp = this._snap(c, fake);
      const pts = [...this._roomPoints, sp];
      return svg`
        <polyline class="preview-area" points=${pts.map((p) => `${p.x},${p.y}`).join(" ")} stroke-width=${2 * upp}></polyline>
        ${this._roomPoints.map((p, i) => svg`<circle class="cursor-dot ${i === 0 ? "first" : ""}" cx=${p.x} cy=${p.y} r=${(i === 0 ? 6 : 4) * upp}></circle>`)}
        <circle class="cursor-dot" cx=${sp.x} cy=${sp.y} r=${4 * upp}></circle>`;
    }
    if (this._tool === "door" || this._tool === "window") {
      const hit = nearestWall(c, this._floor.walls, maxWallThickness(this._floor, this._draft) + SNAP_PX * 2 * upp);
      if (!hit) return nothing;
      return svg`<circle class="cursor-dot" cx=${hit.point.x} cy=${hit.point.y} r=${5 * upp}></circle>`;
    }
    if (this._tool === "item") {
      const sp = this._snap(c, fake);
      return svg`<circle class="preview-item" cx=${sp.x} cy=${sp.y} r=${ITEM_RADIUS_PX * upp}></circle>`;
    }
    return nothing;
  }

  // ---------------------------------------------------------------- Eigenschaften

  private _renderProps(): TemplateResult {
    const el = this._findSelected();
    if (!el || !this._sel) return this._renderPlanProps();
    const kindLabel = { wall: "Wand", opening: (el as Opening).type === "window" ? "Fenster" : "Tür", area: "Raum", item: "Icon" }[this._sel.kind];
    return html`
      <div class="props-head">
        <h3>${kindLabel}</h3>
        <button class="icon-btn" title="Löschen (Entf)" @click=${this._deleteSelected}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
        <button class="icon-btn" title="Auswahl aufheben" @click=${() => (this._sel = undefined)}><ha-icon icon="mdi:close"></ha-icon></button>
      </div>
      ${this._sel.kind === "wall"
        ? this._renderWallProps(el as Wall)
        : this._sel.kind === "opening"
        ? this._renderOpeningProps(el as Opening)
        : this._sel.kind === "area"
        ? this._renderAreaProps(el as Area)
        : this._renderItemProps(el as FloorItem)}
    `;
  }

  private _num(label: string, key: string, value: number | undefined, opts: { min?: number; max?: number; step?: number; placeholder?: string } = {}) {
    return html`<label class="field">
      <span>${label}</span>
      <input
        type="number"
        .value=${value === undefined || value === null ? "" : String(round(value))}
        min=${opts.min ?? ""}
        max=${opts.max ?? ""}
        step=${opts.step ?? 1}
        placeholder=${opts.placeholder ?? ""}
        @change=${(ev: Event) => {
          const raw = (ev.target as HTMLInputElement).value;
          this._setProp(key, raw === "" ? undefined : Number(raw));
        }}
      />
    </label>`;
  }

  private _text(label: string, key: string, value: string | undefined, placeholder = "") {
    return html`<label class="field">
      <span>${label}</span>
      <input
        type="text"
        .value=${value ?? ""}
        placeholder=${placeholder}
        @change=${(ev: Event) => this._setProp(key, (ev.target as HTMLInputElement).value.trim())}
      />
    </label>`;
  }

  private _check(label: string, key: string, value: boolean | undefined) {
    return html`<label class="check">
      <input type="checkbox" .checked=${!!value} @change=${(ev: Event) => this._setProp(key, (ev.target as HTMLInputElement).checked)} />
      <span>${label}</span>
    </label>`;
  }

  private _color(label: string, key: string, value: string | undefined, fallback: string) {
    return html`<label class="field color">
      <span>${label}</span>
      <input type="color" .value=${value && value.startsWith("#") ? value : fallback} @change=${(ev: Event) => this._setProp(key, (ev.target as HTMLInputElement).value)} />
      ${value ? html`<button class="link" @click=${() => this._setProp(key, undefined)}>Standard</button>` : nothing}
    </label>`;
  }

  private _entity(label: string, key: string, value: string | undefined, domains: string[] = []) {
    return html`<div class="field">
      <span>${label}</span>
      <fp-entity-picker
        .hass=${this.hass}
        .value=${value ?? ""}
        .domains=${domains}
        @value-changed=${(ev: CustomEvent<{ value: string }>) => this._setProp(key, ev.detail.value)}
      ></fp-entity-picker>
    </div>`;
  }

  private _renderWallProps(w: Wall) {
    return html`
      <div class="grid2">
        ${this._num("x1", "x1", w.x1)} ${this._num("y1", "y1", w.y1)} ${this._num("x2", "x2", w.x2)} ${this._num("y2", "y2", w.y2)}
      </div>
      ${this._num("Stärke", "thickness", w.thickness, { min: 1, max: 100, placeholder: `Standard (${this._draft.settings.wallThickness})` })}
      <p class="muted">Länge: ${formatLength(distance({ x: w.x1, y: w.y1 }, { x: w.x2, y: w.y2 }))}. Endpunkte ziehen ändert die Wand; verbundene Wände ziehen mit.</p>
    `;
  }

  private _renderOpeningProps(o: Opening) {
    const isWindow = o.type === "window";
    const missing = windowMissingSensor(o);
    const leaves = windowLeaves(o);
    const segs = leafSegments(o);
    const shutterOf = (side: ShutterSide) => o.shutters?.find((s) => s.side === side);
    return html`
      <label class="field">
        <span>Art</span>
        <select @change=${(ev: Event) => this._setProp("type", (ev.target as HTMLSelectElement).value)}>
          <option value="door" ?selected=${o.type === "door"}>Tür</option>
          <option value="window" ?selected=${isWindow}>Fenster</option>
        </select>
      </label>
      <div class="grid2">
        ${this._num("Breite", "length", o.length, { min: 10, max: 1000 })} ${this._num("Winkel", "angle", o.angle, { min: -360, max: 360, step: 15 })}
      </div>
      ${isWindow
        ? html`
            <div class="field ${missing ? "required-missing" : ""}">
              <span>Gesamtkontakt (für Flügel ohne eigenen Sensor)</span>
              <fp-entity-picker
                .hass=${this.hass}
                .value=${o.entity ?? ""}
                .domains=${["binary_sensor"]}
                placeholder="Fensterkontakt wählen …"
                @value-changed=${(ev: CustomEvent<{ value: string }>) => this._setProp("entity", ev.detail.value)}
              ></fp-entity-picker>
              ${missing ? html`<span class="warn">Ohne Sensor kann der Öffnungszustand nicht angezeigt werden.</span>` : nothing}
            </div>
            <h4>Flügel (${leaves.length} von ${MAX_LEAVES})</h4>
            ${leaves.map(
              (leaf, i) => html`<div class="leaf-row ${this._leafSel === i ? "active" : ""}" @click=${() => (this._leafSel = i)}>
                <div class="leaf-head">
                  <b>${i + 1}</b>
                  <label>
                    Breite
                    <input
                      type="number"
                      min="10"
                      step="1"
                      .value=${String(Math.round(segs[i].x1 - segs[i].x0))}
                      ?disabled=${leaves.length === 1}
                      @change=${(ev: Event) => this._setLeafWidth(i, Number((ev.target as HTMLInputElement).value))}
                    />
                  </label>
                  <button
                    title="Anschlag wechseln"
                    @click=${() => this._setLeaf(i, { hinge: segs[i].hinge === "right" ? "left" : "right" })}
                  >
                    <ha-icon icon="mdi:swap-horizontal"></ha-icon> ${segs[i].hinge === "right" ? "rechts" : "links"}
                  </button>
                </div>
                <fp-entity-picker
                  .hass=${this.hass}
                  .value=${leaf.entity ?? ""}
                  .domains=${["binary_sensor"]}
                  placeholder="Eigener Sensor (optional)"
                  @value-changed=${(ev: CustomEvent<{ value: string }>) => this._setLeaf(i, { entity: ev.detail.value || undefined })}
                ></fp-entity-picker>
              </div>`
            )}
            <div class="btn-row">
              <button ?disabled=${leaves.length >= MAX_LEAVES} @click=${() => this._setLeafCount(leaves.length + 1)}>
                <ha-icon icon="mdi:plus"></ha-icon> Flügel
              </button>
              <button ?disabled=${leaves.length <= 1} @click=${() => this._setLeafCount(leaves.length - 1)}>
                <ha-icon icon="mdi:minus"></ha-icon> Flügel
              </button>
              <button @click=${() => this._setProp("swing", o.swing === "out" ? "in" : "out")}>
                <ha-icon icon="mdi:swap-vertical"></ha-icon> Richtung
              </button>
            </div>`
        : html`
            <div class="btn-row">
              <button @click=${() => this._setProp("hinge", o.hinge === "right" ? "left" : "right")}>
                <ha-icon icon="mdi:swap-horizontal"></ha-icon> Anschlag
              </button>
              <button @click=${() => this._setProp("swing", o.swing === "out" ? "in" : "out")}>
                <ha-icon icon="mdi:swap-vertical"></ha-icon> Richtung
              </button>
            </div>
            ${this._entity("Kontakt (optional)", "entity", o.entity, ["binary_sensor"])}
            ${this._entity("Schloss (optional)", "lockEntity", o.lockEntity, ["lock"])}
            <p class="muted">Ohne Kontakt gilt die Tür beim Lichtschein als offen.</p>`}
      ${this._color("Farbe wenn offen", "openColor", o.openColor, DEFAULT_OPEN_COLOR)}
      <p class="muted">Im Editor wird die ausgewählte Öffnung geöffnet gezeigt. Ziehen schiebt sie entlang der Wände.</p>
      ${isWindow
        ? html`<h4>Rollo</h4>
            ${(["out", "in"] as const).map((side) => {
              const sh = shutterOf(side);
              return html`<div class="shutter-row">
                <div class="field">
                  <span>${side === "out" ? "Außen" : "Innen"} (optional)</span>
                  <fp-entity-picker
                    .hass=${this.hass}
                    .value=${sh?.entity ?? ""}
                    .domains=${["cover"]}
                    @value-changed=${(ev: CustomEvent<{ value: string }>) => this._setShutter(side, { entity: ev.detail.value })}
                  ></fp-entity-picker>
                </div>
                ${sh
                  ? html`<label class="field color">
                      <span>Farbe</span>
                      <input
                        type="color"
                        .value=${sh.color && sh.color.startsWith("#") ? sh.color : DEFAULT_SHUTTER_COLOR}
                        @change=${(ev: Event) => this._setShutter(side, { color: (ev.target as HTMLInputElement).value })}
                      />
                    </label>`
                  : nothing}
              </div>`;
            })}
            <p class="muted">Außen liegt auf der Seite gegen den Aufschlag „innen“; die Tiefe des Bands zeigt, wie weit das Rollo zu ist.</p>`
        : nothing}
    `;
  }

  /** Ändert die Flügelliste des ausgewählten Fensters. */
  private _editLeaves(fn: (leaves: Leaf[], o: Opening) => Leaf[]): void {
    this._mutate(() => {
      const o = this._findSelected() as Opening | undefined;
      if (o) o.leaves = fn(windowLeaves(o).map((l) => ({ ...l })), o);
    });
  }

  private _setLeaf(index: number, patch: Partial<Leaf>): void {
    this._leafSel = index;
    this._editLeaves((leaves, o) => {
      // feste Anschläge speichern wir erst, wenn der Nutzer sie ändert
      if (patch.hinge === undefined) return leaves.map((l, i) => (i === index ? cleanLeaf({ ...l, ...patch }) : l));
      const segs = leafSegments(o);
      return leaves.map((l, i) => (i === index ? cleanLeaf({ ...l, ...patch }) : { ...l, hinge: l.hinge ?? segs[i].hinge }));
    });
  }

  private _setLeafCount(count: number): void {
    this._editLeaves((leaves) => setLeafCount(leaves, count));
    this._leafSel = Math.min(this._leafSel ?? 0, count - 1);
  }

  private _setLeafWidth(index: number, width: number): void {
    if (!Number.isFinite(width)) return;
    this._editLeaves((leaves, o) => setLeafWidth(leaves, index, width, o.length));
  }

  private _setShutter(side: ShutterSide, patch: Partial<Shutter>): void {
    this._mutate(() => {
      const o = this._findSelected() as Opening | undefined;
      if (!o) return;
      const list = (o.shutters ?? []).filter((s) => s.side !== side);
      const current = o.shutters?.find((s) => s.side === side);
      const next = { ...(current ?? { entity: "", side }), ...patch };
      if (next.entity) list.push(next);
      if (list.length) o.shutters = list;
      else delete o.shutters;
    });
  }

  private _renderAreaProps(a: Area) {
    const haAreas = Object.values(this.hass.areas ?? {}).sort((x, y) => x.name.localeCompare(y.name));
    const suggestions = this._areaSuggestions(a);
    return html`
      ${this._text("Name", "name", a.name)}
      <label class="field">
        <span>Art</span>
        <select @change=${(ev: Event) => this._setProp("type", (ev.target as HTMLSelectElement).value)}>
          ${AREA_TYPES.map(([v, l]) => html`<option value=${v} ?selected=${(a.type ?? "room") === v}>${l}</option>`)}
        </select>
      </label>
      ${a.type === "custom" ? this._text("Bezeichnung", "typeLabel", a.typeLabel) : nothing}
      <div class="grid2">
        ${this._color("Farbe", "color", a.color, "#4f8bd6")}
        <label class="field">
          <span>Deckkraft</span>
          <input type="range" min="0" max="0.6" step="0.02" .value=${String(a.opacity ?? 0.12)}
                 @change=${(ev: Event) => this._setProp("opacity", Number((ev.target as HTMLInputElement).value))} />
        </label>
      </div>
      ${this._check("Name im Plan anzeigen", "showName", a.showName !== false)}
      ${this._num("Zoom beim Antippen", "zoom", a.zoom ?? undefined, { min: 1, max: 10, step: 0.25, placeholder: "automatisch einpassen" })}
      <details>
        <summary>Mehr</summary>
        ${haAreas.length
          ? html`<label class="field">
              <span>HA-Bereich (nur Bezug, keine Automatik)</span>
              <select
                @change=${(ev: Event) => {
                  const id = (ev.target as HTMLSelectElement).value;
                  this._mutate(() => {
                    const area = this._findSelected() as Area;
                    if (id) area.haArea = id;
                    else delete area.haArea;
                    if (id && (!area.name || /^Raum \d+$/.test(area.name))) area.name = this.hass.areas![id].name;
                  });
                }}
              >
                <option value="">– keiner –</option>
                ${haAreas.map((h) => html`<option value=${h.area_id} ?selected=${a.haArea === h.area_id}>${h.name}</option>`)}
              </select>
            </label>`
          : nothing}
        ${this._entity("Raum einfärben, wenn aktiv", "entity", a.entity, ["binary_sensor", "input_boolean", "light", "switch", "person"])}
        ${a.entity ? this._color("Farbe wenn aktiv", "activeColor", a.activeColor, "#ffc107") : nothing}
      </details>

      <h4>Seitenleiste</h4>
      <p class="muted">Nur was hier steht, erscheint beim Antippen des Raums – Geräte, Szenen und Skripte.</p>
      <div class="sidebar-list">
        ${a.sidebar.map(
          (e, i) => html`<div class="sb-row">
            <ha-icon .icon=${entityIcon(this.hass, e.entity, e.icon)}></ha-icon>
            <div class="sb-main">
              <input
                type="text"
                .value=${e.name ?? ""}
                placeholder=${friendlyName(this.hass, e.entity)}
                @change=${(ev: Event) => this._editSidebar(i, "name", (ev.target as HTMLInputElement).value.trim())}
              />
              <small>${e.entity} · ${{ device: "Gerät", scene: "Szene", script: "Skript" }[entityKind(e.entity)]}${this.hass.states[e.entity] ? "" : " · nicht gefunden"}</small>
            </div>
            <button class="icon-btn" title="Nach oben" ?disabled=${i === 0} @click=${() => this._moveSidebar(i, -1)}><ha-icon icon="mdi:chevron-up"></ha-icon></button>
            <button class="icon-btn" title="Nach unten" ?disabled=${i === a.sidebar.length - 1} @click=${() => this._moveSidebar(i, 1)}><ha-icon icon="mdi:chevron-down"></ha-icon></button>
            <button class="icon-btn" title="Entfernen" @click=${() => this._removeSidebar(i)}><ha-icon icon="mdi:close"></ha-icon></button>
          </div>`
        )}
      </div>
      <fp-entity-picker
        .hass=${this.hass}
        .exclude=${a.sidebar.map((e) => e.entity)}
        clearOnSelect
        placeholder="Gerät, Szene oder Skript hinzufügen …"
        @value-changed=${(ev: CustomEvent<{ value: string }>) => ev.detail.value && this._addSidebar(ev.detail.value)}
      ></fp-entity-picker>
      ${suggestions.length
        ? html`<div class="suggest">
            <span class="muted">Vorschläge aus dem HA-Bereich – zum Übernehmen antippen:</span>
            <div class="chips">
              ${suggestions.map(
                (id) => html`<button class="chip" title=${id} @click=${() => this._addSidebar(id)}>
                  <ha-icon .icon=${entityIcon(this.hass, id)}></ha-icon>${friendlyName(this.hass, id)}
                </button>`
              )}
            </div>
          </div>`
        : nothing}
    `;
  }

  /** Entitäten des verknüpften HA-Bereichs, die noch nicht in der Seitenleiste sind (nur Vorschlag). */
  private _areaSuggestions(a: Area): string[] {
    if (!a.haArea || !this.hass.entities) return [];
    const present = new Set(a.sidebar.map((e) => e.entity));
    const devices = (this.hass as any).devices as Record<string, { area_id?: string }> | undefined;
    const useful = new Set(["light", "switch", "fan", "cover", "climate", "media_player", "lock", "scene", "script", "vacuum", "input_boolean", "sensor", "binary_sensor", "humidifier", "valve", "button"]);
    return Object.values(this.hass.entities)
      .filter((e) => !e.hidden && !present.has(e.entity_id) && useful.has(domainOf(e.entity_id)))
      .filter((e) => (e.area_id ?? (e.device_id ? devices?.[e.device_id]?.area_id : undefined)) === a.haArea)
      .map((e) => e.entity_id)
      .slice(0, 30);
  }

  private _addSidebar(entity: string): void {
    this._mutate(() => (this._findSelected() as Area).sidebar.push({ entity }));
  }

  private _removeSidebar(i: number): void {
    this._mutate(() => (this._findSelected() as Area).sidebar.splice(i, 1));
  }

  private _moveSidebar(i: number, dir: -1 | 1): void {
    this._mutate(() => {
      const list = (this._findSelected() as Area).sidebar;
      const [e] = list.splice(i, 1);
      list.splice(i + dir, 0, e);
    });
  }

  private _editSidebar(i: number, key: "name" | "icon", value: string): void {
    this._mutate(() => {
      const entry = (this._findSelected() as Area).sidebar[i] as any;
      if (value) entry[key] = value;
      else delete entry[key];
    });
  }

  private _renderItemProps(it: FloorItem) {
    return html`
      <div class="field">
        <span>Icon</span>
        <div class="icon-input">
          <ha-icon .icon=${it.icon ?? (it.entity ? entityIcon(this.hass, it.entity) : "mdi:map-marker")}></ha-icon>
          <input type="text" .value=${it.icon ?? ""} placeholder=${it.entity ? "vom Gerät" : "mdi:…"}
                 @change=${(ev: Event) => this._setProp("icon", (ev.target as HTMLInputElement).value.trim())} />
        </div>
        <div class="icon-grid">
          ${QUICK_ICONS.map(
            (icon) => html`<button class="icon-pick ${it.icon === icon ? "active" : ""}" title=${icon} @click=${() => this._setProp("icon", icon)}>
              <ha-icon .icon=${icon}></ha-icon>
            </button>`
          )}
        </div>
      </div>
      ${this._entity("Entität (optional)", "entity", it.entity)}
      ${this._text("Beschriftung", "label", it.label)}
      <label class="field">
        <span>Beim Antippen</span>
        <select @change=${(ev: Event) => this._setProp("tapAction", (ev.target as HTMLSelectElement).value)}>
          ${[
            ["auto", "Automatisch (Licht/Schalter schalten, sonst Details)"],
            ["toggle", "Schalten / Ausführen"],
            ["more-info", "Details öffnen"],
            ["none", "Nichts"],
          ].map(([v, l]) => html`<option value=${v} ?selected=${(it.tapAction ?? "auto") === v}>${l}</option>`)}
        </select>
      </label>
      <div class="grid2">
        ${this._num("Größe (px)", "size", it.size, { min: 8, max: 200, placeholder: "34" })}
        ${this._color("Farbe wenn an", "activeColor", it.activeColor, "#ffb300")}
      </div>
      ${this._check("Zustand anzeigen", "showState", it.showState)}
      <h4>Lichtschein</h4>
      <label class="check">
        <input type="checkbox" .checked=${glowEnabled(it)} @change=${(ev: Event) => this._setProp("glow", (ev.target as HTMLInputElement).checked)} />
        <span>Lichtschein anzeigen${it.glow === undefined || it.glow === null ? " (automatisch)" : ""}</span>
      </label>
      ${glowEnabled(it)
        ? html`<div class="grid2">
              ${this._num("Radius", "glowRadius", it.glowRadius, { min: 10, max: 5000, step: 10, placeholder: String(DEFAULT_GLOW_RADIUS) })}
              ${this._color("Farbe ohne RGB", "glowColor", it.glowColor, DEFAULT_GLOW_COLOR)}
            </div>
            <p class="muted">Bei voller Helligkeit; gedimmt schrumpft der Schein. RGB-Lampen leuchten in ihrer eigenen Farbe. Die gestrichelte Kontur zeigt, wo Wände das Licht begrenzen.</p>`
        : nothing}
      <h4>Sichtbarkeit</h4>
      ${this._check("Nur zeigen, wenn der Raum gezoomt ist", "showOnlyWhenZoomed", it.showOnlyWhenZoomed)}
      ${it.showOnlyWhenZoomed
        ? html`<label class="field">
            <span>Gehört zu Raum</span>
            <select @change=${(ev: Event) => this._setProp("area", (ev.target as HTMLSelectElement).value)}>
              <option value="">automatisch (Lage im Raum)</option>
              ${this._floor.areas.map((a) => html`<option value=${a.id} ?selected=${it.area === a.id}>${a.name || a.id}</option>`)}
            </select>
          </label>`
        : nothing}
      ${!it.area && !this._floor.areas.some((a) => pointInPolygon(a.points, it.x, it.y)) && it.showOnlyWhenZoomed
        ? html`<p class="warn">Das Icon liegt in keinem Raum und wird deshalb nie angezeigt.</p>`
        : nothing}
    `;
  }

  private _renderPlanProps() {
    const plan = this._draft;
    const floor = this._floor;
    return html`
      <div class="props-head"><h3>Etage &amp; Plan</h3></div>
      <label class="field">
        <span>Etage</span>
        <div class="row">
          <select
            @change=${(ev: Event) => {
              this._floorId = (ev.target as HTMLSelectElement).value;
              this._sel = undefined;
            }}
          >
            ${plan.floors.map((f) => html`<option value=${f.id} ?selected=${f.id === this._floorId}>${f.name || f.id}</option>`)}
          </select>
          <button class="icon-btn" title="Etage hinzufügen" @click=${this._addFloor}><ha-icon icon="mdi:plus"></ha-icon></button>
          <button class="icon-btn" title="Etage löschen" ?disabled=${plan.floors.length < 2} @click=${this._deleteFloor}>
            <ha-icon icon="mdi:delete-outline"></ha-icon>
          </button>
        </div>
      </label>
      <label class="field">
        <span>Name der Etage</span>
        <input type="text" .value=${floor.name} @change=${(ev: Event) => this._mutate((f) => (f.name = (ev.target as HTMLInputElement).value.trim()))} />
      </label>
      <div class="grid2">
        ${this._planNum("Wandstärke", plan.settings.wallThickness, (v) => (plan.settings.wallThickness = v), 1)}
        ${this._planNum("Raster", plan.settings.grid, (v) => (plan.settings.grid = v), 1)}
      </div>
      <p class="muted">Die Zeichenfläche ist unbegrenzt. Einheiten frei wählbar – Zentimeter bieten sich an (1000 = 10 m).</p>
      <p class="muted">
        ${floor.walls.length} Wände · ${floor.openings.length} Türen/Fenster · ${floor.areas.length} Räume · ${floor.items.length} Icons
      </p>
      ${this._windowsWithoutContact.length
        ? html`<h4>Fenster ohne Kontakt</h4>
            <div class="room-list">
              ${this._windowsWithoutContact.map(
                ({ floorId, opening }) => html`<button class="room-btn warn-row" @click=${() => this._selectOpening(floorId, opening.id)}>
                  <ha-icon icon="mdi:window-closed-variant"></ha-icon>${opening.id}
                  <small>${this._draft.floors.find((f) => f.id === floorId)?.name || floorId}</small>
                </button>`
              )}
            </div>`
        : nothing}
      <h4>Räume</h4>
      <div class="room-list">
        ${floor.areas.length
          ? floor.areas.map(
              (a) => html`<button class="room-btn" @click=${() => (this._sel = { kind: "area", id: a.id })}>
                <span class="swatch" style="background:${a.color ?? "var(--primary-color)"}"></span>
                ${a.name || a.id}<small>${a.sidebar.length} in Seitenleiste</small>
              </button>`
            )
          : html`<p class="muted">Noch keine Räume – mit dem Werkzeug „Raum“ zeichnen.</p>`}
      </div>
      <h4>Verlauf</h4>
      ${this._history
        ? this._history.length
          ? html`<div class="history">
              ${this._history.map(
                (h) => html`<div class="hist-row">
                  <span>${new Date(h.created).toLocaleString()}<small> · Rev. ${h.revision} · ${h.reason}</small></span>
                  <button class="link" @click=${() => this._restoreHistory(h.id)}>Wiederherstellen</button>
                </div>`
              )}
            </div>`
          : html`<p class="muted">Noch keine früheren Stände.</p>`
        : html`<button class="link" @click=${this._loadHistory}>Frühere Stände anzeigen</button>`}
      <h4>Beispiel</h4>
      <button class="link" @click=${this._loadSample}>Beispiel-Grundriss laden</button>
    `;
  }

  private _planNum(label: string, value: number, set: (v: number) => void, min: number) {
    return html`<label class="field">
      <span>${label}</span>
      <input
        type="number"
        min=${min}
        .value=${String(value)}
        @change=${(ev: Event) => {
          const v = Number((ev.target as HTMLInputElement).value);
          if (Number.isFinite(v) && v >= min) this._mutate(() => set(v));
        }}
      />
    </label>`;
  }

  private _addFloor(): void {
    const name = prompt("Name der neuen Etage", "Etage " + (this._draft.floors.length + 1));
    if (!name) return;
    const id = newId("etage");
    this._mutate((_, plan) => plan.floors.push({ id, name, walls: [], openings: [], areas: [], items: [] }));
    this._floorId = id;
    this._sel = undefined;
  }

  private _deleteFloor(): void {
    if (this._draft.floors.length < 2) return;
    if (!confirm(`Etage „${this._floor.name || this._floorId}“ mit allem Inhalt löschen?`)) return;
    const id = this._floorId;
    this._mutate((_, plan) => (plan.floors = plan.floors.filter((f) => f.id !== id)));
    this._floorId = this._draft.floors[0].id;
    this._sel = undefined;
  }

  static styles = [
    unsafeCSS(planSvgStyles),
    css`
      :host {
        display: flex;
        flex-direction: column;
        background: var(--primary-background-color);
        color: var(--primary-text-color);
      }
      button {
        font: inherit;
        color: inherit;
      }
      .toolbar {
        display: flex;
        align-items: center;
        gap: 4px;
        height: var(--header-height, 56px);
        padding: 0 12px 0 4px;
        box-sizing: border-box;
        background: var(--app-header-background-color, var(--primary-color));
        color: var(--app-header-text-color, #fff);
        flex: none;
      }
      .main-title {
        flex: 1;
        font-size: 20px;
        margin-left: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .dirty {
        font-size: 14px;
        opacity: 0.8;
      }
      .icon-btn {
        border: none;
        background: none;
        cursor: pointer;
        padding: 8px;
        border-radius: 50%;
        line-height: 0;
      }
      .icon-btn:disabled {
        opacity: 0.35;
        cursor: default;
      }
      .toolbar .icon-btn:not(:disabled):hover {
        background: rgba(255, 255, 255, 0.15);
      }
      .warn-chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        border: none;
        border-radius: 16px;
        padding: 6px 12px;
        cursor: pointer;
        background: var(--warning-color, #ffa600);
        color: #000 !important;
        font-size: 13px;
        --mdc-icon-size: 18px;
      }
      .required-missing fp-entity-picker {
        outline: 2px solid var(--error-color, #db4437);
        border-radius: 8px;
      }
      .required-missing > span:first-child {
        color: var(--error-color, #db4437);
        font-weight: 500;
      }
      .warn-row ha-icon {
        color: var(--warning-color, #ffa600);
        --mdc-icon-size: 18px;
      }
      .glow-reach {
        fill: #ffd54f;
        fill-opacity: 0.12;
        stroke: #ffb300;
        stroke-dasharray: 6 4;
        pointer-events: none;
      }
      .save {
        border: none;
        border-radius: 18px;
        padding: 8px 18px;
        margin-left: 8px;
        cursor: pointer;
        background: var(--card-background-color, #fff);
        color: var(--primary-color) !important;
        font-weight: 500;
      }
      .save:disabled {
        opacity: 0.5;
        cursor: default;
      }
      .error-bar {
        display: flex;
        gap: 8px;
        align-items: center;
        padding: 8px 16px;
        background: var(--error-color, #db4437);
        color: #fff;
      }
      .error-bar button {
        border: 1px solid #fff;
        background: none;
        border-radius: 12px;
        padding: 2px 10px;
        cursor: pointer;
      }
      .body {
        flex: 1;
        min-height: 0;
        display: flex;
      }
      .tools {
        flex: none;
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 8px 4px;
        background: var(--card-background-color);
        border-right: 1px solid var(--divider-color);
        overflow-y: auto;
      }
      .tool {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        width: 64px;
        padding: 8px 2px;
        border: none;
        border-radius: 10px;
        background: none;
        cursor: pointer;
        font-size: 11px;
        color: var(--secondary-text-color);
      }
      .tool:hover {
        background: var(--secondary-background-color);
      }
      .tool.active {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .sep {
        height: 1px;
        background: var(--divider-color);
        margin: 6px 4px;
      }
      .canvas-wrap {
        flex: 1;
        min-width: 0;
        position: relative;
        display: flex;
      }
      svg.canvas {
        flex: 1;
        width: 100%;
        height: 100%;
        touch-action: none;
        user-select: none;
        background: var(--secondary-background-color);
      }
      svg.canvas.tool-wall,
      svg.canvas.tool-area,
      svg.canvas.tool-door,
      svg.canvas.tool-window,
      svg.canvas.tool-item {
        cursor: crosshair;
      }
      .sheet {
        fill: var(--fp-floor-color, var(--card-background-color, #fff));
      }
      .grid-minor {
        fill: none;
        stroke: var(--divider-color);
        stroke-width: 0.5;
        opacity: 0.6;
      }
      .grid-major {
        fill: none;
        stroke: var(--divider-color);
        stroke-width: 1.2;
      }
      .wall-hits line {
        stroke: transparent;
        cursor: move;
      }
      .tool-select .area polygon,
      .tool-select .opening,
      .tool-select .item {
        cursor: move;
      }
      .wall.selected {
        stroke: var(--primary-color);
      }
      .area.selected polygon {
        fill-opacity: 0.3;
      }
      .opening.selected .frame,
      .opening.selected .leaf {
        stroke: var(--primary-color);
      }
      .item circle {
        fill: var(--card-background-color, #fff);
        stroke: var(--secondary-text-color);
        stroke-width: 1;
      }
      .item.selected circle {
        stroke: var(--primary-color);
        stroke-width: 3;
      }
      .fo-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--secondary-text-color);
        pointer-events: none;
      }
      .item-label {
        fill: var(--primary-text-color);
        pointer-events: none;
      }
      .sel-line,
      .sel-outline {
        fill: none;
        stroke: var(--primary-color);
        stroke-dasharray: 6 4;
        pointer-events: none;
      }
      .handle {
        fill: #fff;
        stroke: var(--primary-color);
        cursor: grab;
      }
      .measure {
        fill: var(--primary-color);
        font-weight: 600;
        pointer-events: none;
        paint-order: stroke;
        stroke: var(--card-background-color, #fff);
        stroke-width: 3px;
      }
      .preview-wall {
        stroke: var(--primary-color);
        opacity: 0.6;
        stroke-linecap: square;
        pointer-events: none;
      }
      .preview-area {
        fill: var(--primary-color);
        fill-opacity: 0.1;
        stroke: var(--primary-color);
        pointer-events: none;
      }
      .preview-item {
        fill: none;
        stroke: var(--primary-color);
        stroke-dasharray: 4 3;
        pointer-events: none;
      }
      .cursor-dot {
        fill: var(--primary-color);
        pointer-events: none;
      }
      .cursor-dot.first {
        fill: #fff;
        stroke: var(--primary-color);
        stroke-width: 2;
      }
      .hint {
        position: absolute;
        left: 12px;
        right: 12px;
        bottom: 12px;
        font-size: 12px;
        padding: 6px 10px;
        border-radius: 8px;
        background: var(--card-background-color);
        color: var(--secondary-text-color);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
        pointer-events: none;
        max-width: 640px;
      }
      .props {
        flex: none;
        width: 340px;
        overflow-y: auto;
        padding: 8px 16px 24px;
        box-sizing: border-box;
        background: var(--card-background-color);
        border-left: 1px solid var(--divider-color);
      }
      :host([narrow]) .body {
        flex-direction: column;
      }
      :host([narrow]) .tools {
        flex-direction: row;
        border-right: none;
        border-bottom: 1px solid var(--divider-color);
        overflow-x: auto;
      }
      :host([narrow]) .tool {
        width: 56px;
      }
      :host([narrow]) .sep {
        width: 1px;
        height: auto;
        margin: 4px 6px;
      }
      :host([narrow]) .canvas-wrap {
        min-height: 45vh;
      }
      :host([narrow]) .props {
        width: auto;
        max-height: 40vh;
        border-left: none;
        border-top: 1px solid var(--divider-color);
      }
      .props-head {
        display: flex;
        align-items: center;
      }
      .props-head h3 {
        flex: 1;
        margin: 8px 0;
        font-size: 18px;
        font-weight: 500;
      }
      h4 {
        margin: 20px 0 4px;
        font-size: 13px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--secondary-text-color);
      }
      .field {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin: 10px 0;
        font-size: 13px;
      }
      .field > span {
        color: var(--secondary-text-color);
      }
      .field input[type="text"],
      .field input[type="number"],
      .field select,
      .sb-main input {
        font: inherit;
        padding: 7px 8px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
        min-width: 0;
      }
      .field.color {
        flex-direction: column;
      }
      .field input[type="color"] {
        width: 100%;
        height: 32px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        padding: 2px;
        background: none;
      }
      .grid2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 10px;
      }
      .grid2 .field {
        margin: 6px 0;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .row select {
        flex: 1;
      }
      .check {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 8px 0;
        font-size: 14px;
      }
      .muted {
        color: var(--secondary-text-color);
        font-size: 12px;
        margin: 4px 0;
      }
      .warn {
        color: var(--warning-color, #ffa600);
        font-size: 12px;
      }
      .link {
        border: none;
        background: none;
        color: var(--primary-color);
        cursor: pointer;
        padding: 4px 0;
        text-align: left;
      }
      .leaf-row {
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        padding: 6px 8px;
        margin-bottom: 6px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .leaf-row.active {
        border-color: var(--primary-color);
      }
      .leaf-head {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .leaf-head label {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .leaf-head input {
        width: 70px;
      }
      .shutter-row {
        margin-bottom: 4px;
      }
      .btn-row {
        display: flex;
        gap: 8px;
        margin: 8px 0;
      }
      .btn-row button {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        border: 1px solid var(--divider-color);
        background: none;
        border-radius: 16px;
        padding: 4px 12px;
        cursor: pointer;
        --mdc-icon-size: 18px;
      }
      details {
        margin: 8px 0;
        font-size: 13px;
      }
      summary {
        cursor: pointer;
        color: var(--primary-color);
      }
      .sidebar-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 8px;
      }
      .sb-row {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px;
        border-radius: 8px;
        background: var(--secondary-background-color);
        --mdc-icon-size: 20px;
      }
      .sb-row > ha-icon {
        color: var(--secondary-text-color);
        margin: 0 4px;
      }
      .sb-main {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
      }
      .sb-main input {
        padding: 4px 6px;
      }
      .sb-main small {
        font-size: 11px;
        color: var(--secondary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .sb-row .icon-btn {
        padding: 4px;
      }
      .suggest {
        margin-top: 12px;
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 6px;
      }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        border: 1px dashed var(--divider-color);
        background: none;
        border-radius: 14px;
        padding: 3px 10px 3px 6px;
        cursor: pointer;
        font-size: 12px;
        --mdc-icon-size: 16px;
      }
      .chip:hover {
        border-color: var(--primary-color);
      }
      .icon-input {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .icon-input input {
        flex: 1;
      }
      .icon-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(34px, 1fr));
        gap: 4px;
        margin-top: 6px;
      }
      .icon-pick {
        border: 1px solid transparent;
        background: var(--secondary-background-color);
        border-radius: 8px;
        padding: 5px 0;
        cursor: pointer;
        --mdc-icon-size: 20px;
      }
      .icon-pick.active {
        border-color: var(--primary-color);
        color: var(--primary-color);
      }
      .room-list {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .room-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        border: none;
        background: none;
        border-radius: 8px;
        padding: 6px 8px;
        cursor: pointer;
        text-align: left;
      }
      .room-btn:hover {
        background: var(--secondary-background-color);
      }
      .room-btn small {
        margin-left: auto;
        color: var(--secondary-text-color);
      }
      .swatch {
        width: 12px;
        height: 12px;
        border-radius: 3px;
      }
      .history {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 12px;
      }
      .hist-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
      }
      .hist-row small {
        color: var(--secondary-text-color);
      }
    `,
  ];
}

function cleanLeaf(l: Leaf): Leaf {
  const out: Leaf = { w: l.w };
  if (l.entity) out.entity = l.entity;
  if (l.hinge) out.hinge = l.hinge;
  return out;
}

function round(v: number): number {
  return Math.round(v * 10) / 10;
}

/** Richtet einen Öffnungswinkel an der Wand aus und behält dabei die bisherige Orientierung möglichst bei. */
function alignAngle(current: number, wallAngle: number): number {
  const a = ((wallAngle % 360) + 360) % 360;
  const b = (a + 180) % 360;
  const c = ((current % 360) + 360) % 360;
  const diff = (x: number) => Math.min(Math.abs(x - c), 360 - Math.abs(x - c));
  return round(diff(a) <= diff(b) ? a : b);
}

function formatLength(len: number): string {
  return len >= 100 ? `${(len / 100).toFixed(2).replace(".", ",")} m` : `${Math.round(len)} cm`;
}

declare global {
  interface HTMLElementTagNameMap {
    "fp-editor": FpEditor;
  }
}
