/**
 * Möbel-Editor: baut wiederverwendbare Vorlagen für die planweite Möbel-Bibliothek.
 *
 * Eigene Zeichenfläche mit eigenem Zoom, unabhängig vom Grundriss. Das Raster und der
 * Ausrichtungsfang kommen aus `geometry.ts`; Änderungen gehen als `furniture-change`
 * an den Grundriss-Editor, der sie in seine Undo-Historie und den Entwurf übernimmt.
 */
import { LitElement, css, html, nothing, svg, unsafeCSS, type PropertyValues, type TemplateResult } from "lit";
import { property, query, state } from "lit/decorators.js";
import { defineElement } from "./define";
import { findFurniture, furnitureBox, furnitureStyles, importSvg, partBox, renderPart } from "./furniture";
import { alignSnap, snapToGrid, type Guide } from "./geometry";
import type { HomeAssistant } from "./ha";
import {
  DEFAULT_FURNITURE_FILL,
  MAX_FURNITURE,
  MAX_FURNITURE_PARTS,
  newId,
  type FurniturePart,
  type FurnitureType,
  type Plan,
  type Point,
} from "./types";

type FTool = "select" | "rect" | "circle" | "polygon" | "light";

const TOOLS: { id: FTool; icon: string; label: string; hint: string }[] = [
  { id: "select", icon: "mdi:cursor-default", label: "Auswahl", hint: "Teile und Leuchtpunkte anklicken und ziehen. Griffe ändern die Größe. Alt hält den Fang aus." },
  { id: "rect", icon: "mdi:rectangle-outline", label: "Rechteck", hint: "Von Ecke zu Ecke ziehen." },
  { id: "circle", icon: "mdi:circle-outline", label: "Kreis", hint: "Vom Mittelpunkt zum Rand ziehen." },
  { id: "polygon", icon: "mdi:vector-polygon", label: "Polygon", hint: "Eckpunkte anklicken; Doppelklick, Enter oder Klick auf den ersten Punkt schließt die Form." },
  { id: "light", icon: "mdi:lightbulb-on-outline", label: "Leuchtpunkt", hint: "Klick setzt einen Leuchtpunkt – dort scheint das Licht, wenn dem Möbelstück ein Licht zugewiesen ist." },
];

const GRID_CHOICES = [1, 2, 5, 10, 25];
const UNDO_LIMIT = 50;
const VIEW_UNITS = 300;
const HANDLE_PX = 7;
const ICONS = ["mdi:sofa", "mdi:bed", "mdi:desk-lamp", "mdi:floor-lamp", "mdi:television", "mdi:table-furniture", "mdi:chair-rolling", "mdi:flower"];

type Sel = { kind: "part"; id: string } | { kind: "light"; index: number };

interface Drag {
  mode: "move" | "resize" | "vertex" | "shape" | "light";
  pointerId: number;
  start: Point;
  orig: FurniturePart;
  origLight?: Point;
  index?: number;
  handle?: string;
  moved: boolean;
  snapshot: string;
}

const round = (v: number) => Math.round(v * 100) / 100;
const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));

@defineElement("fp-furniture-editor")
export class FpFurnitureEditor extends LitElement {
  @property({ attribute: false }) plan!: Plan;
  @property({ attribute: false }) hass!: HomeAssistant;
  /** Vorlage, die direkt zum Bearbeiten geöffnet wird (z. B. aus dem Grundriss). */
  @property() openId?: string;

  @state() private _editing?: FurnitureType;
  @state() private _isNew = false;
  @state() private _dirty = false;
  @state() private _sel?: Sel;
  @state() private _tool: FTool = "select";
  @state() private _grid = 5;
  @state() private _zoom = 1;
  @state() private _poly: Point[] = [];
  @state() private _cursor?: Point;
  @state() private _rubber?: { a: Point; b: Point };
  @state() private _guides: Guide[] = [];
  @state() private _notice?: string;
  private _undo: string[] = [];
  private _redo: string[] = [];
  private _drag?: Drag;
  @query("svg.canvas") private _svg!: SVGSVGElement;

  protected willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("openId") && this.openId) {
      const t = findFurniture(this.plan?.furniture, this.openId);
      if (t) this._edit(t, false);
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("keydown", this._onKey);
  }

  disconnectedCallback(): void {
    window.removeEventListener("keydown", this._onKey);
    super.disconnectedCallback();
  }

  private get _list(): FurnitureType[] {
    return this.plan?.furniture ?? [];
  }

  private get _upp(): number {
    const r = this._svg?.getBoundingClientRect();
    const size = r && r.width && r.height ? Math.min(r.width, r.height) : 600;
    return VIEW_UNITS / this._zoom / size;
  }

  // ---------------------------------------------------------------- Bibliothek

  private _emit(furniture: FurnitureType[]): void {
    this.dispatchEvent(new CustomEvent("furniture-change", { detail: { furniture }, bubbles: true, composed: true }));
  }

  private _close(): void {
    if (this._editing) return this._leaveEdit();
    this.dispatchEvent(new CustomEvent("close-furniture", { bubbles: true, composed: true }));
  }

  private _new(): void {
    if (this._list.length >= MAX_FURNITURE) return void (this._notice = `Höchstens ${MAX_FURNITURE} Vorlagen`);
    this._edit({ id: newId("m"), name: "", parts: [] }, true);
  }

  private _edit(t: FurnitureType, isNew: boolean): void {
    this._editing = clone(t);
    this._isNew = isNew;
    this._dirty = false;
    this._sel = undefined;
    this._tool = "select";
    this._poly = [];
    this._undo = [];
    this._redo = [];
    this._notice = undefined;
    this._zoom = 1;
  }

  private _leaveEdit(): void {
    if (this._dirty && !confirm("Änderungen an dieser Vorlage verwerfen?")) return;
    this._editing = undefined;
    this.openId = undefined;
    this.dispatchEvent(new CustomEvent("edit-left", { bubbles: true, composed: true }));
  }

  private _apply(): void {
    const t = this._editing;
    if (!t) return;
    const name = t.name.trim();
    if (!name) return void (this._notice = "Bitte einen Namen eingeben");
    if (!t.parts.length) return void (this._notice = "Die Vorlage braucht mindestens ein Teil");
    const next = { ...t, name };
    const list = this._list.some((x) => x.id === t.id) ? this._list.map((x) => (x.id === t.id ? next : x)) : [...this._list, next];
    this._emit(list);
    this._editing = undefined;
    this._dirty = false;
    this.openId = undefined;
    this.dispatchEvent(new CustomEvent("edit-left", { bubbles: true, composed: true }));
  }

  private _rename(t: FurnitureType): void {
    const name = prompt("Neuer Name", t.name)?.trim();
    if (name) this._emit(this._list.map((x) => (x.id === t.id ? { ...x, name } : x)));
  }

  private _duplicate(t: FurnitureType): void {
    if (this._list.length >= MAX_FURNITURE) return void (this._notice = `Höchstens ${MAX_FURNITURE} Vorlagen`);
    const copy = clone(t);
    copy.id = newId("m");
    copy.name = `${t.name} Kopie`.slice(0, 100);
    copy.parts.forEach((p) => (p.id = newId("p")));
    this._emit([...this._list, copy]);
  }

  private _usage(t: FurnitureType): number {
    return this.plan.floors.reduce((n, f) => n + f.items.filter((i) => i.furnitureType === t.id).length, 0);
  }

  private _delete(t: FurnitureType): void {
    const n = this._usage(t);
    const msg = n
      ? `„${t.name}“ löschen? ${n} platzierte${n === 1 ? "s Exemplar zeigt" : " Exemplare zeigen"} dann nur noch ein Icon.`
      : `„${t.name}“ löschen?`;
    if (confirm(msg)) this._emit(this._list.filter((x) => x.id !== t.id));
  }

  private async _importFile(ev: Event, intoNew: boolean): Promise<void> {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;
    try {
      if (file.size > 500_000) throw new Error("Die Datei ist zu groß (höchstens 500 kB)");
      const { parts, skipped } = importSvg(await file.text());
      if (intoNew) {
        if (this._list.length >= MAX_FURNITURE) throw new Error(`Höchstens ${MAX_FURNITURE} Vorlagen`);
        this._edit({ id: newId("m"), name: file.name.replace(/\.svg$/i, ""), parts }, true);
        this._dirty = true;
      } else if (this._editing) {
        if (this._editing.parts.length + parts.length > MAX_FURNITURE_PARTS) throw new Error(`Höchstens ${MAX_FURNITURE_PARTS} Teile je Vorlage`);
        this._pushUndo();
        this._editing = { ...this._editing, parts: [...this._editing.parts, ...parts] };
        this._sel = { kind: "part", id: parts[0].id };
      }
      this._notice = skipped ? `${skipped} nicht unterstützte Elemente wurden übersprungen` : undefined;
    } catch (e) {
      this._notice = e instanceof Error ? e.message : "Import fehlgeschlagen";
    }
  }

  // ---------------------------------------------------------------- Bearbeiten

  private _pushUndo(): void {
    if (!this._editing) return;
    this._undo.push(JSON.stringify(this._editing));
    if (this._undo.length > UNDO_LIMIT) this._undo.shift();
    this._redo = [];
    this._dirty = true;
  }

  private _doUndo(): void {
    const prev = this._undo.pop();
    if (!prev || !this._editing) return;
    this._redo.push(JSON.stringify(this._editing));
    this._editing = JSON.parse(prev);
    this._fixSel();
    this._dirty = true;
  }

  private _doRedo(): void {
    const next = this._redo.pop();
    if (!next || !this._editing) return;
    this._undo.push(JSON.stringify(this._editing));
    this._editing = JSON.parse(next);
    this._fixSel();
  }

  private _fixSel(): void {
    const t = this._editing;
    if (!t || !this._sel) return;
    if (this._sel.kind === "part" && !t.parts.some((p) => p.id === (this._sel as { id: string }).id)) this._sel = undefined;
    if (this._sel?.kind === "light" && !(t.lights ?? [])[this._sel.index]) this._sel = undefined;
  }

  /** Ändert das Modell mit Undo-Schritt. */
  private _mutate(fn: (t: FurnitureType) => void): void {
    if (!this._editing) return;
    this._pushUndo();
    fn(this._editing);
    this._editing = { ...this._editing };
  }

  private get _part(): FurniturePart | undefined {
    return this._sel?.kind === "part" ? this._editing?.parts.find((p) => p.id === (this._sel as { id: string }).id) : undefined;
  }

  private _setPart(key: keyof FurniturePart, value: unknown): void {
    const id = this._part?.id;
    if (!id) return;
    this._mutate((t) => {
      const p = t.parts.find((x) => x.id === id) as unknown as Record<string, unknown>;
      if (value === undefined || value === "" || (typeof value === "number" && Number.isNaN(value))) delete p[key];
      else p[key] = value;
    });
  }

  private _deleteSel(): void {
    const sel = this._sel;
    if (!sel) return;
    this._mutate((t) => {
      if (sel.kind === "part") t.parts = t.parts.filter((p) => p.id !== sel.id);
      else t.lights = (t.lights ?? []).filter((_, i) => i !== sel.index);
    });
    this._sel = undefined;
  }

  private _duplicatePart(): void {
    const p = this._part;
    if (!p || (this._editing?.parts.length ?? 0) >= MAX_FURNITURE_PARTS) return;
    const copy = clone(p);
    copy.id = newId("p");
    copy.x += 10;
    copy.y += 10;
    this._mutate((t) => t.parts.push(copy));
    this._sel = { kind: "part", id: copy.id };
  }

  private _order(dir: 1 | -1): void {
    const id = this._part?.id;
    if (!id) return;
    this._mutate((t) => {
      const i = t.parts.findIndex((p) => p.id === id);
      const j = i + dir;
      if (j < 0 || j >= t.parts.length) return;
      [t.parts[i], t.parts[j]] = [t.parts[j], t.parts[i]];
    });
  }

  private _addPart(part: Omit<FurniturePart, "id">): void {
    if ((this._editing?.parts.length ?? 0) >= MAX_FURNITURE_PARTS) return void (this._notice = `Höchstens ${MAX_FURNITURE_PARTS} Teile je Vorlage`);
    const id = newId("p");
    this._mutate((t) => t.parts.push({ id, fill: DEFAULT_FURNITURE_FILL, ...part }));
    this._sel = { kind: "part", id };
  }

  // ---------------------------------------------------------------- Zeiger

  private _toLocal(ev: { clientX: number; clientY: number }): Point {
    const m = this._svg.getScreenCTM();
    if (!m) return { x: 0, y: 0 };
    const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(m.inverse());
    return { x: p.x, y: p.y };
  }

  private _refs(skipId?: string): Point[] {
    const refs: Point[] = [{ x: 0, y: 0 }];
    for (const p of this._editing?.parts ?? []) {
      if (p.id === skipId) continue;
      const b = partBox(p);
      refs.push({ x: b.x0, y: b.y0 }, { x: b.x1, y: b.y1 }, { x: (b.x0 + b.x1) / 2, y: (b.y0 + b.y1) / 2 });
    }
    for (const l of this._editing?.lights ?? []) refs.push(l);
    return refs;
  }

  private _snap(p: Point, ev: { altKey: boolean }, skipId?: string): Point {
    if (ev.altKey) {
      this._guides = [];
      return p;
    }
    const al = alignSnap(p, this._refs(skipId), 6 * this._upp);
    this._guides = al.guides;
    return { x: al.x ?? snapToGrid(p.x, this._grid), y: al.y ?? snapToGrid(p.y, this._grid) };
  }

  private _hitOf(ev: Event): { part?: string; light?: number; handle?: string } {
    for (const el of ev.composedPath()) {
      if (!(el instanceof Element)) continue;
      if (el === this._svg) break;
      const h = el.getAttribute("data-handle");
      if (h) return { handle: h };
      const part = el.getAttribute("data-part");
      if (part) return { part };
      const light = el.getAttribute("data-light");
      if (light !== null) return { light: Number(light) };
    }
    return {};
  }

  private _onPointerDown(ev: PointerEvent): void {
    if (ev.button !== 0 || !this._editing) return;
    const p = this._toLocal(ev);
    const hit = this._hitOf(ev);
    const snapshot = JSON.stringify(this._editing);
    const base = { pointerId: ev.pointerId, start: p, moved: false, snapshot };
    if (this._tool === "select") {
      const part = this._part;
      if (hit.handle && part) {
        this._drag = { ...base, mode: hit.handle.startsWith("v") ? "vertex" : "resize", orig: clone(part), handle: hit.handle, index: Number(hit.handle.slice(1)) };
      } else if (hit.light !== undefined) {
        this._sel = { kind: "light", index: hit.light };
        this._drag = { ...base, mode: "light", orig: undefined as never, origLight: { ...(this._editing.lights ?? [])[hit.light] }, index: hit.light };
      } else if (hit.part) {
        this._sel = { kind: "part", id: hit.part };
        this._drag = { ...base, mode: "move", orig: clone(this._editing.parts.find((x) => x.id === hit.part)!) };
      } else {
        this._sel = undefined;
        return;
      }
      this._svg.setPointerCapture(ev.pointerId);
      return;
    }
    if (this._tool === "rect" || this._tool === "circle") {
      const a = this._snap(p, ev);
      this._rubber = { a, b: a };
      this._drag = { ...base, mode: "shape", orig: undefined as never };
      this._svg.setPointerCapture(ev.pointerId);
      return;
    }
    if (this._tool === "polygon") {
      const sp = this._snap(p, ev);
      if (this._poly.length >= 3 && Math.hypot(sp.x - this._poly[0].x, sp.y - this._poly[0].y) <= HANDLE_PX * this._upp) return this._finishPolygon();
      this._poly = [...this._poly, sp];
      return;
    }
    if (this._tool === "light") {
      const sp = this._snap(p, ev);
      if ((this._editing.lights ?? []).length >= 10) return void (this._notice = "Höchstens 10 Leuchtpunkte");
      this._mutate((t) => (t.lights = [...(t.lights ?? []), { x: sp.x, y: sp.y }]));
      this._sel = { kind: "light", index: (this._editing.lights ?? []).length - 1 };
      this._tool = "select";
    }
  }

  private _onPointerMove(ev: PointerEvent): void {
    const p = this._toLocal(ev);
    this._cursor = p;
    const d = this._drag;
    if (!d || d.pointerId !== ev.pointerId || !this._editing) {
      if (this._tool === "polygon" || this._tool === "light") this._snap(p, ev);
      return;
    }
    const t = this._editing;
    if (d.mode === "shape") {
      this._rubber = { a: this._rubber!.a, b: this._snap(p, ev) };
      d.moved = true;
      return;
    }
    if (!d.moved && Math.hypot(p.x - d.start.x, p.y - d.start.y) < 3 * this._upp) return;
    if (!d.moved) {
      this._undo.push(d.snapshot);
      if (this._undo.length > UNDO_LIMIT) this._undo.shift();
      this._redo = [];
      this._dirty = true;
      d.moved = true;
    }
    if (d.mode === "light") {
      const sp = this._snap(p, ev);
      const lights = [...(t.lights ?? [])];
      lights[d.index!] = sp;
      this._editing = { ...t, lights };
      return;
    }
    const part = t.parts.find((x) => x.id === d.orig.id)!;
    if (d.mode === "move") {
      const dx = p.x - d.start.x;
      const dy = p.y - d.start.y;
      const target = this._snap({ x: d.orig.x + dx, y: d.orig.y + dy }, ev, part.id);
      part.x = round(target.x);
      part.y = round(target.y);
    } else if (d.mode === "resize") {
      const sp = this._snap(p, ev, part.id);
      if (part.shape === "circle") part.r = round(Math.max(1, Math.hypot(sp.x - part.x, sp.y - part.y)));
      else {
        part.w = round(Math.max(2, Math.abs(sp.x - part.x) * 2));
        part.h = round(Math.max(2, Math.abs(sp.y - part.y) * 2));
      }
    } else if (d.mode === "vertex") {
      const sp = this._snap({ x: p.x, y: p.y }, ev, part.id);
      part.points = (part.points ?? []).map((q, i) => (i === d.index ? { x: round(sp.x - part.x), y: round(sp.y - part.y) } : q));
    }
    this._editing = { ...t };
  }

  private _onPointerUp(ev: PointerEvent): void {
    const d = this._drag;
    if (!d || d.pointerId !== ev.pointerId) return;
    this._drag = undefined;
    this._guides = [];
    if (d.mode === "shape" && this._rubber) {
      const { a, b } = this._rubber;
      this._rubber = undefined;
      if (this._tool === "rect") {
        const w = Math.abs(b.x - a.x);
        const h = Math.abs(b.y - a.y);
        if (w >= 2 && h >= 2) this._addPart({ shape: "rect", x: round((a.x + b.x) / 2), y: round((a.y + b.y) / 2), w: round(w), h: round(h) });
      } else {
        const r = Math.hypot(b.x - a.x, b.y - a.y);
        if (r >= 1) this._addPart({ shape: "circle", x: a.x, y: a.y, r: round(r) });
      }
      this._tool = "select";
    }
  }

  private _finishPolygon(): void {
    if (this._poly.length < 3) return;
    const pts = this._poly;
    const cx = round(pts.reduce((s, q) => s + q.x, 0) / pts.length);
    const cy = round(pts.reduce((s, q) => s + q.y, 0) / pts.length);
    this._poly = [];
    this._addPart({ shape: "polygon", x: cx, y: cy, points: pts.map((q) => ({ x: round(q.x - cx), y: round(q.y - cy) })) });
    this._tool = "select";
  }

  private _onKey = (ev: KeyboardEvent): void => {
    if (!this._editing) return;
    const tag = (ev.composedPath()[0] as HTMLElement | undefined)?.tagName;
    if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
    const mod = ev.ctrlKey || ev.metaKey;
    if (ev.key === "Escape") {
      if (this._poly.length) this._poly = [];
      else if (this._tool !== "select") this._tool = "select";
      else this._sel = undefined;
    } else if (ev.key === "Enter" && this._poly.length >= 3) this._finishPolygon();
    else if ((ev.key === "Delete" || ev.key === "Backspace") && this._sel) {
      ev.preventDefault();
      this._deleteSel();
    } else if (mod && ev.key.toLowerCase() === "z") {
      ev.preventDefault();
      ev.shiftKey ? this._doRedo() : this._doUndo();
    } else if (mod && ev.key.toLowerCase() === "y") {
      ev.preventDefault();
      this._doRedo();
    } else if (mod && ev.key.toLowerCase() === "d" && this._part) {
      ev.preventDefault();
      this._duplicatePart();
    }
  };

  private _onWheel(ev: WheelEvent): void {
    ev.preventDefault();
    this._zoom = Math.max(0.25, Math.min(8, this._zoom * (ev.deltaY < 0 ? 1.15 : 1 / 1.15)));
  }

  // ---------------------------------------------------------------- Darstellung

  protected render() {
    return this._editing ? this._renderEdit(this._editing) : this._renderList();
  }

  private _thumb(t: FurnitureType) {
    const b = furnitureBox(t);
    const pad = Math.max(b.x1 - b.x0, b.y1 - b.y0) * 0.1 + 2;
    return html`<svg class="thumb" viewBox="${b.x0 - pad} ${b.y0 - pad} ${b.x1 - b.x0 + 2 * pad} ${b.y1 - b.y0 + 2 * pad}">
      <g class="furniture">${t.parts.map((p) => renderPart(p))}</g>
      ${(t.lights ?? []).map((l) => svg`<circle class="light-dot" cx=${l.x} cy=${l.y} r=${Math.max(b.x1 - b.x0, b.y1 - b.y0) * 0.04}></circle>`)}
    </svg>`;
  }

  private _renderList(): TemplateResult {
    return html`
      <div class="toolbar">
        <button class="icon-btn" title="Zurück zum Grundriss" @click=${this._close}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <div class="main-title">Möbel-Bibliothek</div>
        <label class="chip-btn" title="SVG als neue Vorlage importieren">
          <ha-icon icon="mdi:file-import-outline"></ha-icon>SVG importieren
          <input type="file" accept=".svg,image/svg+xml" hidden @change=${(e: Event) => this._importFile(e, true)} />
        </label>
        <button class="save" @click=${this._new}>Neue Vorlage</button>
      </div>
      ${this._noticeBar()}
      <div class="list">
        ${this._list.length
          ? this._list.map((t) => {
              const n = this._usage(t);
              return html`<div class="card">
                ${this._thumb(t)}
                <div class="card-name">${t.name}</div>
                <div class="muted">${t.parts.length} Teile${t.lights?.length ? ` · ${t.lights.length} Leuchtpunkt${t.lights.length > 1 ? "e" : ""}` : ""} · ${n}× platziert</div>
                <div class="card-actions">
                  <button class="icon-btn" title="Bearbeiten" @click=${() => this._edit(t, false)}><ha-icon icon="mdi:pencil-outline"></ha-icon></button>
                  <button class="icon-btn" title="Umbenennen" @click=${() => this._rename(t)}><ha-icon icon="mdi:rename-outline"></ha-icon></button>
                  <button class="icon-btn" title="Duplizieren" @click=${() => this._duplicate(t)}><ha-icon icon="mdi:content-duplicate"></ha-icon></button>
                  <button class="icon-btn" title="Löschen" @click=${() => this._delete(t)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
                </div>
              </div>`;
            })
          : html`<div class="empty">
              <ha-icon icon="mdi:sofa-outline"></ha-icon>
              <p>Die Bibliothek ist leer. Baue eigene Möbelstücke aus Rechtecken, Kreisen und Polygonen oder importiere eine einfache SVG-Draufsicht.</p>
            </div>`}
      </div>
    `;
  }

  private _noticeBar() {
    return this._notice
      ? html`<div class="notice">${this._notice}<button @click=${() => (this._notice = undefined)}>OK</button></div>`
      : nothing;
  }

  private _renderEdit(t: FurnitureType): TemplateResult {
    const tool = TOOLS.find((x) => x.id === this._tool)!;
    const S = VIEW_UNITS / this._zoom / 2;
    return html`
      <div class="toolbar">
        <button class="icon-btn" title="Zur Bibliothek" @click=${this._leaveEdit}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <div class="main-title">${this._isNew ? "Neue Vorlage" : "Vorlage bearbeiten"}${this._dirty ? html`<span class="dirty"> • ungespeichert</span>` : nothing}</div>
        <button class="icon-btn" title="Rückgängig (Strg+Z)" ?disabled=${!this._undo.length} @click=${this._doUndo}><ha-icon icon="mdi:undo"></ha-icon></button>
        <button class="icon-btn" title="Wiederholen (Strg+Y)" ?disabled=${!this._redo.length} @click=${this._doRedo}><ha-icon icon="mdi:redo"></ha-icon></button>
        <button class="save" @click=${this._apply}>Übernehmen</button>
      </div>
      ${this._noticeBar()}
      <div class="body">
        <div class="tools">
          ${TOOLS.map(
            (x) => html`<button class="tool ${x.id === this._tool ? "active" : ""}" title=${x.label} @click=${() => ((this._tool = x.id), (this._poly = []))}>
              <ha-icon .icon=${x.icon}></ha-icon><span>${x.label}</span>
            </button>`
          )}
          <div class="sep"></div>
          <label class="tool" title="SVG-Formen zu dieser Vorlage hinzufügen">
            <ha-icon icon="mdi:file-import-outline"></ha-icon><span>SVG</span>
            <input type="file" accept=".svg,image/svg+xml" hidden @change=${(e: Event) => this._importFile(e, false)} />
          </label>
          <button class="tool" title="Zoom +" @click=${() => (this._zoom = Math.min(8, this._zoom * 1.4))}><ha-icon icon="mdi:magnify-plus-outline"></ha-icon><span>Zoom +</span></button>
          <button class="tool" title="Zoom −" @click=${() => (this._zoom = Math.max(0.25, this._zoom / 1.4))}><ha-icon icon="mdi:magnify-minus-outline"></ha-icon><span>Zoom −</span></button>
        </div>
        <div class="canvas-wrap">
          <svg
            class="canvas tool-${this._tool}"
            viewBox="${-S} ${-S} ${2 * S} ${2 * S}"
            preserveAspectRatio="xMidYMid meet"
            @pointerdown=${this._onPointerDown}
            @pointermove=${this._onPointerMove}
            @pointerup=${this._onPointerUp}
            @pointercancel=${this._onPointerUp}
            @pointerleave=${() => (this._cursor = undefined)}
            @dblclick=${() => this._finishPolygon()}
            @wheel=${this._onWheel}
          >
            ${this._renderCanvas(t, S)}
          </svg>
          <div class="hint">${tool.hint}</div>
        </div>
        <div class="props">${this._renderProps(t)}</div>
      </div>
    `;
  }

  private _renderCanvas(t: FurnitureType, S: number) {
    const upp = this._upp;
    const g = this._grid;
    const minor = g * 1;
    const major = g * 10;
    const sel = this._sel;
    const part = this._part;
    return svg`
      <defs>
        <pattern id="fg-minor" width=${minor} height=${minor} patternUnits="userSpaceOnUse">
          <path d="M ${minor} 0 L 0 0 0 ${minor}" class="grid-minor"></path>
        </pattern>
        <pattern id="fg-major" width=${major} height=${major} patternUnits="userSpaceOnUse">
          ${minor / upp >= 4 ? svg`<rect width=${major} height=${major} fill="url(#fg-minor)"></rect>` : nothing}
          <path d="M ${major} 0 L 0 0 0 ${major}" class="grid-major"></path>
        </pattern>
      </defs>
      <rect class="sheet" x=${-S} y=${-S} width=${2 * S} height=${2 * S}></rect>
      <rect x=${-S} y=${-S} width=${2 * S} height=${2 * S} fill="url(#fg-major)" pointer-events="none"></rect>
      <line class="axis" x1=${-S} x2=${S} y1="0" y2="0" stroke-width=${upp}></line>
      <line class="axis" y1=${-S} y2=${S} x1="0" x2="0" stroke-width=${upp}></line>
      <g class="furniture editing">
        ${t.parts.map(
          (p) => svg`<g data-part=${p.id} class="part ${sel?.kind === "part" && sel.id === p.id ? "selected" : ""}">${renderPart(p, { cls: "hit" })}</g>`
        )}
      </g>
      ${(t.lights ?? []).map(
        (l, i) => svg`<g data-light=${i} class="light-mark ${sel?.kind === "light" && sel.index === i ? "selected" : ""}">
          <circle cx=${l.x} cy=${l.y} r=${9 * upp} class="light-hit"></circle>
          <circle cx=${l.x} cy=${l.y} r=${4 * upp} class="light-dot"></circle>
          <circle cx=${l.x} cy=${l.y} r=${8 * upp} class="light-ring" stroke-width=${upp * 1.5}></circle>
        </g>`
      )}
      ${part ? this._renderHandles(part, upp) : nothing}
      ${this._renderPreview(upp)}
      ${this._guides.map((gd) =>
        gd.axis === "x"
          ? svg`<line class="guide" x1=${gd.value} x2=${gd.value} y1=${-S} y2=${S} stroke-width=${upp}></line>`
          : svg`<line class="guide" y1=${gd.value} y2=${gd.value} x1=${-S} x2=${S} stroke-width=${upp}></line>`
      )}
    `;
  }

  private _renderHandles(p: FurniturePart, upp: number) {
    const r = HANDLE_PX * upp;
    if (p.shape === "polygon")
      return svg`${(p.points ?? []).map((q, i) => svg`<circle class="handle" data-handle="v${i}" cx=${p.x + q.x} cy=${p.y + q.y} r=${r} stroke-width=${2 * upp}></circle>`)}`;
    const b = partBox(p);
    const hx = p.shape === "circle" ? p.x + (p.r ?? 0) : b.x1;
    const hy = p.shape === "circle" ? p.y : b.y1;
    return svg`<rect class="sel-box" x=${b.x0} y=${b.y0} width=${b.x1 - b.x0} height=${b.y1 - b.y0} stroke-width=${upp * 1.5}></rect>
      <circle class="handle" data-handle="s0" cx=${hx} cy=${hy} r=${r} stroke-width=${2 * upp}></circle>`;
  }

  private _renderPreview(upp: number) {
    if (this._rubber) {
      const { a, b } = this._rubber;
      return this._tool === "rect"
        ? svg`<rect class="preview" x=${Math.min(a.x, b.x)} y=${Math.min(a.y, b.y)} width=${Math.abs(b.x - a.x)} height=${Math.abs(b.y - a.y)} stroke-width=${2 * upp}></rect>`
        : svg`<circle class="preview" cx=${a.x} cy=${a.y} r=${Math.hypot(b.x - a.x, b.y - a.y)} stroke-width=${2 * upp}></circle>`;
    }
    if (this._tool === "polygon" && this._poly.length) {
      const cur = this._cursor ? this._snap(this._cursor, { altKey: false }) : undefined;
      const pts = [...this._poly, ...(cur ? [cur] : [])];
      return svg`<polyline class="preview" points=${pts.map((q) => `${q.x},${q.y}`).join(" ")} stroke-width=${2 * upp}></polyline>
        ${this._poly.map((q, i) => svg`<circle class="handle ${i === 0 ? "first" : ""}" cx=${q.x} cy=${q.y} r=${(i === 0 ? 6 : 4) * upp}></circle>`)}`;
    }
    return nothing;
  }

  private _num(label: string, key: keyof FurniturePart, value: number | undefined, min = 1) {
    return html`<label class="field"><span>${label}</span>
      <input type="number" step="1" min=${min} .value=${value === undefined ? "" : String(round(value))}
        @change=${(ev: Event) => this._setPartNum(key, (ev.target as HTMLInputElement).value, min)} /></label>`;
  }

  private _setPartNum(key: keyof FurniturePart, raw: string, min: number): void {
    if (raw === "") return;
    const v = Number(raw);
    if (Number.isFinite(v)) this._setPart(key, key === "x" || key === "y" ? v : Math.max(min, v));
  }

  private _renderProps(t: FurnitureType): TemplateResult {
    const p = this._part;
    const sel = this._sel;
    const b = furnitureBox(t);
    return html`
      <h3>Vorlage</h3>
      <label class="field"><span>Name</span>
        <input type="text" maxlength="100" .value=${t.name} placeholder="z. B. Stehlampe"
          @input=${(ev: Event) => { this._editing = { ...t, name: (ev.target as HTMLInputElement).value }; this._dirty = true; }} /></label>
      <label class="field"><span>Raster (cm)</span>
        <select @change=${(ev: Event) => (this._grid = Number((ev.target as HTMLSelectElement).value))}>
          ${GRID_CHOICES.map((g) => html`<option value=${g} ?selected=${g === this._grid}>${g}</option>`)}
        </select></label>
      <p class="muted">${t.parts.length} Teile · ${round(b.x1 - b.x0)} × ${round(b.y1 - b.y0)} cm · ${(t.lights ?? []).length} Leuchtpunkt${(t.lights ?? []).length === 1 ? "" : "e"}</p>
      ${sel?.kind === "light"
        ? html`<h3>Leuchtpunkt</h3>
            <p class="muted">Ziehen verschiebt den Punkt. Hier scheint das Licht eines platzierten Exemplars.</p>
            <div class="row-btns"><button class="chip" @click=${this._deleteSel}><ha-icon icon="mdi:delete-outline"></ha-icon>Löschen</button></div>`
        : p
        ? html`
            <h3>${{ rect: "Rechteck", circle: "Kreis", polygon: "Polygon", path: "SVG-Form" }[p.shape]}</h3>
            <div class="row-btns">
              <button class="icon-btn" title="Nach vorn" @click=${() => this._order(1)}><ha-icon icon="mdi:arrange-bring-forward"></ha-icon></button>
              <button class="icon-btn" title="Nach hinten" @click=${() => this._order(-1)}><ha-icon icon="mdi:arrange-send-backward"></ha-icon></button>
              <button class="icon-btn" title="Duplizieren (Strg+D)" @click=${this._duplicatePart}><ha-icon icon="mdi:content-duplicate"></ha-icon></button>
              <button class="icon-btn" title="Löschen (Entf)" @click=${this._deleteSel}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
            </div>
            <div class="grid2">${this._num("Mitte x", "x", p.x, -100000)} ${this._num("Mitte y", "y", p.y, -100000)}</div>
            ${p.shape === "rect" || p.shape === "path" ? html`<div class="grid2">${this._num("Breite", "w", p.w)} ${this._num("Höhe", "h", p.h)}</div>` : nothing}
            ${p.shape === "circle" ? this._num("Radius", "r", p.r) : nothing}
            <label class="field color"><span>Farbe</span>
              <input type="color" .value=${p.fill?.startsWith("#") && p.fill.length === 7 ? p.fill : DEFAULT_FURNITURE_FILL}
                @change=${(ev: Event) => this._setPart("fill", (ev.target as HTMLInputElement).value)} /></label>
            <label class="field"><span>Deckkraft ${Math.round((p.opacity ?? 1) * 100)} %</span>
              <input type="range" min="0.05" max="1" step="0.05" .value=${String(p.opacity ?? 1)}
                @change=${(ev: Event) => this._setPart("opacity", Number((ev.target as HTMLInputElement).value))} /></label>
            <div class="field"><span>Icon als Symbol (optional)</span>
              <div class="icon-input"><ha-icon .icon=${p.icon ?? "mdi:help-circle-outline"}></ha-icon>
                <input type="text" .value=${p.icon ?? ""} placeholder="mdi:…" @change=${(ev: Event) => this._setPart("icon", (ev.target as HTMLInputElement).value.trim())} /></div>
              <div class="icon-grid">${ICONS.map((i) => html`<button class="icon-pick ${p.icon === i ? "active" : ""}" title=${i} @click=${() => this._setPart("icon", i)}><ha-icon .icon=${i}></ha-icon></button>`)}</div>
            </div>`
        : html`<p class="muted">Teil oder Leuchtpunkt anklicken, oder links ein Werkzeug wählen und zeichnen. Mehrere Teile ergeben zusammen ein Möbelstück; der Mittelpunkt (0/0) ist der Ankerpunkt beim Platzieren und Drehen.</p>`}
    `;
  }

  static styles = [
    unsafeCSS(furnitureStyles),
    css`
      :host { display: flex; flex-direction: column; background: var(--primary-background-color); color: var(--primary-text-color); }
      button { font: inherit; color: inherit; }
      .toolbar { display: flex; align-items: center; gap: 4px; height: var(--header-height, 56px); padding: 0 12px 0 4px; box-sizing: border-box; flex: none;
        background: var(--app-header-background-color, var(--primary-color)); color: var(--app-header-text-color, #fff); }
      .main-title { flex: 1; font-size: 20px; margin-left: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .dirty { font-size: 14px; opacity: .8; }
      .icon-btn { border: none; background: none; cursor: pointer; padding: 8px; border-radius: 50%; line-height: 0; }
      .icon-btn:disabled { opacity: .35; cursor: default; }
      .toolbar .icon-btn:not(:disabled):hover { background: rgba(255,255,255,.15); }
      .save, .chip-btn { border: none; border-radius: 18px; padding: 8px 18px; margin-left: 8px; cursor: pointer; background: var(--card-background-color, #fff); color: var(--primary-color) !important; font-weight: 500; }
      .chip-btn { display: inline-flex; align-items: center; gap: 6px; --mdc-icon-size: 18px; }
      .notice { display: flex; gap: 8px; align-items: center; padding: 8px 16px; background: var(--warning-color, #ffa600); color: #000; }
      .notice button { border: 1px solid #000; background: none; border-radius: 12px; padding: 2px 10px; cursor: pointer; }
      .list { flex: 1; overflow: auto; padding: 16px; display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 12px; align-content: start; }
      .card { background: var(--card-background-color, #fff); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 4px; box-shadow: var(--ha-card-box-shadow, 0 1px 3px rgba(0,0,0,.2)); }
      .thumb { width: 100%; height: 110px; background: var(--secondary-background-color); border-radius: 8px; }
      .card-name { font-weight: 500; }
      .card-actions { display: flex; justify-content: flex-end; }
      .empty { grid-column: 1 / -1; text-align: center; color: var(--secondary-text-color); padding: 48px 16px; --mdc-icon-size: 48px; }
      .muted { color: var(--secondary-text-color); font-size: 12px; margin: 2px 0; }
      .body { flex: 1; min-height: 0; display: flex; }
      .tools { flex: none; display: flex; flex-direction: column; gap: 2px; padding: 8px 4px; background: var(--card-background-color); border-right: 1px solid var(--divider-color); overflow-y: auto; }
      .tool { display: flex; flex-direction: column; align-items: center; gap: 2px; width: 64px; padding: 8px 2px; border: none; border-radius: 10px; background: none; cursor: pointer; font-size: 11px; color: var(--secondary-text-color); }
      .tool.active { background: var(--primary-color); color: #fff; }
      .sep { height: 1px; background: var(--divider-color); margin: 6px 4px; }
      .canvas-wrap { position: relative; flex: 1; min-width: 0; }
      svg.canvas { width: 100%; height: 100%; touch-action: none; display: block; user-select: none; }
      .canvas.tool-select { cursor: default; }
      .canvas:not(.tool-select) { cursor: crosshair; }
      .sheet { fill: var(--fp-floor-color, var(--card-background-color, #fff)); }
      .grid-minor { fill: none; stroke: var(--divider-color); stroke-width: .3; opacity: .5; }
      .grid-major { fill: none; stroke: var(--divider-color); stroke-width: .6; }
      .axis { stroke: var(--secondary-text-color); stroke-dasharray: 4 3; opacity: .6; }
      .part .fpart.hit { pointer-events: all; cursor: move; }
      .furniture.editing .part.selected .fpart { stroke: var(--primary-color); stroke-width: 2; stroke-opacity: 1; }
      .light-hit { fill: transparent; cursor: move; }
      .light-dot { fill: #ffb300; pointer-events: none; }
      .light-ring { fill: none; stroke: #ffb300; pointer-events: none; }
      .light-mark.selected .light-ring { stroke: var(--primary-color); }
      .handle { fill: #fff; stroke: var(--primary-color); cursor: pointer; }
      .handle.first { fill: var(--primary-color); }
      .sel-box { fill: none; stroke: var(--primary-color); stroke-dasharray: 5 3; pointer-events: none; }
      .preview { fill: var(--primary-color); fill-opacity: .12; stroke: var(--primary-color); stroke-dasharray: 5 3; pointer-events: none; }
      polyline.preview { fill: none; }
      .guide { stroke: #e91e63; stroke-dasharray: 4 3; pointer-events: none; }
      .hint { position: absolute; left: 12px; bottom: 12px; right: 12px; padding: 6px 12px; border-radius: 8px; font-size: 12px; background: var(--card-background-color); color: var(--secondary-text-color); box-shadow: 0 1px 4px rgba(0,0,0,.2); pointer-events: none; }
      .props { flex: none; width: 280px; overflow-y: auto; padding: 12px; box-sizing: border-box; background: var(--card-background-color); border-left: 1px solid var(--divider-color); }
      .props h3 { margin: 8px 0 4px; font-size: 15px; }
      .field { display: flex; flex-direction: column; gap: 2px; margin: 8px 0; font-size: 12px; color: var(--secondary-text-color); }
      .field input[type="text"], .field input[type="number"], .field select { font: inherit; padding: 6px 8px; border-radius: 6px; border: 1px solid var(--divider-color); background: var(--primary-background-color); color: var(--primary-text-color); min-width: 0; }
      .field.color { flex-direction: row; align-items: center; gap: 8px; }
      .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
      .row-btns { display: flex; gap: 4px; flex-wrap: wrap; }
      .chip { display: inline-flex; align-items: center; gap: 4px; border: 1px solid var(--divider-color); border-radius: 16px; background: none; padding: 4px 12px; cursor: pointer; --mdc-icon-size: 18px; }
      .icon-input { display: flex; align-items: center; gap: 6px; }
      .icon-input input { flex: 1; }
      .icon-grid { display: flex; flex-wrap: wrap; gap: 2px; margin-top: 4px; }
      .icon-pick { border: none; background: none; cursor: pointer; padding: 4px; border-radius: 6px; line-height: 0; }
      .icon-pick.active { background: var(--primary-color); color: #fff; }
      @media (max-width: 760px) { .props { width: 200px; } .tool { width: 52px; } }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "fp-furniture-editor": FpFurnitureEditor;
  }
}
