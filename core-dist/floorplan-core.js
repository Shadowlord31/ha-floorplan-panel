/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ft = globalThis, ve = Ft.ShadowRoot && (Ft.ShadyCSS === void 0 || Ft.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, we = Symbol(), Be = /* @__PURE__ */ new WeakMap();
let Jn = class {
  constructor(e, n, r) {
    if (this._$cssResult$ = !0, r !== we) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (ve && e === void 0) {
      const r = n !== void 0 && n.length === 1;
      r && (e = Be.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Be.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Wt = (t) => new Jn(typeof t == "string" ? t : t + "", void 0, we), vt = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((r, i, o) => r + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[o + 1], t[0]);
  return new Jn(n, t, we);
}, Bi = (t, e) => {
  if (ve) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const r = document.createElement("style"), i = Ft.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = n.cssText, t.appendChild(r);
  }
}, We = ve ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const r of e.cssRules) n += r.cssText;
  return Wt(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Wi, defineProperty: qi, getOwnPropertyDescriptor: Vi, getOwnPropertyNames: Ki, getOwnPropertySymbols: Gi, getPrototypeOf: Xi } = Object, Yt = globalThis, qe = Yt.trustedTypes, Zi = qe ? qe.emptyScript : "", Yi = Yt.reactiveElementPolyfillSupport, At = (t, e) => t, qt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Zi : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let n = t;
  switch (e) {
    case Boolean:
      n = t !== null;
      break;
    case Number:
      n = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(t);
      } catch {
        n = null;
      }
  }
  return n;
} }, xe = (t, e) => !Wi(t, e), Ve = { attribute: !0, type: String, converter: qt, reflect: !1, useDefault: !1, hasChanged: xe };
Symbol.metadata ??= Symbol("metadata"), Yt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ut = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = Ve) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, n);
      i !== void 0 && qi(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, n, r) {
    const { get: i, set: o } = Vi(this.prototype, e) ?? { get() {
      return this[n];
    }, set(s) {
      this[n] = s;
    } };
    return { get: i, set(s) {
      const a = i?.call(this);
      o?.call(this, s), this.requestUpdate(e, a, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ve;
  }
  static _$Ei() {
    if (this.hasOwnProperty(At("elementProperties"))) return;
    const e = Xi(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(At("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(At("properties"))) {
      const n = this.properties, r = [...Ki(n), ...Gi(n)];
      for (const i of r) this.createProperty(i, n[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const n = litPropertyMetadata.get(e);
      if (n !== void 0) for (const [r, i] of n) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, r] of this.elementProperties) {
      const i = this._$Eu(n, r);
      i !== void 0 && this._$Eh.set(i, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const n = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const i of r) n.unshift(We(i));
    } else e !== void 0 && n.push(We(e));
    return n;
  }
  static _$Eu(e, n) {
    const r = n.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const r of n.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Bi(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, n, r) {
    this._$AK(e, r);
  }
  _$ET(e, n) {
    const r = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, r);
    if (i !== void 0 && r.reflect === !0) {
      const o = (r.converter?.toAttribute !== void 0 ? r.converter : qt).toAttribute(n, r.type);
      this._$Em = e, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(e, n) {
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const o = r.getPropertyOptions(i), s = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : qt;
      this._$Em = i;
      const a = s.fromAttribute(n, o.type);
      this[i] = a ?? this._$Ej?.get(i) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, n, r, i = !1, o) {
    if (e !== void 0) {
      const s = this.constructor;
      if (i === !1 && (o = this[e]), r ??= s.getPropertyOptions(e), !((r.hasChanged ?? xe)(o, n) || r.useDefault && r.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(s._$Eu(e, r)))) return;
      this.C(e, n, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: r, reflect: i, wrapped: o }, s) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, s ?? n ?? this[e]), o !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (n = void 0), this._$AL.set(e, n)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, o] of this._$Ep) this[i] = o;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [i, o] of r) {
        const { wrapped: s } = o, a = this[i];
        s !== !0 || this._$AL.has(i) || a === void 0 || this.C(i, void 0, o, a);
      }
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(n)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(n);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((n) => n.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((n) => this._$ET(n, this[n])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
ut.elementStyles = [], ut.shadowRootOptions = { mode: "open" }, ut[At("elementProperties")] = /* @__PURE__ */ new Map(), ut[At("finalized")] = /* @__PURE__ */ new Map(), Yi?.({ ReactiveElement: ut }), (Yt.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _e = globalThis, Ke = (t) => t, Vt = _e.trustedTypes, Ge = Vt ? Vt.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Qn = "$lit$", J = `lit$${Math.random().toFixed(9).slice(2)}$`, ti = "?" + J, Ji = `<${ti}>`, at = document, Ct = () => at.createComment(""), It = (t) => t === null || typeof t != "object" && typeof t != "function", ke = Array.isArray, Qi = (t) => ke(t) || typeof t?.[Symbol.iterator] == "function", ae = `[ 	
\f\r]`, _t = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Xe = /-->/g, Ze = />/g, nt = RegExp(`>|${ae}(?:([^\\s"'>=/]+)(${ae}*=${ae}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ye = /'/g, Je = /"/g, ei = /^(?:script|style|textarea|title)$/i, ni = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), S = ni(1), $ = ni(2), K = Symbol.for("lit-noChange"), y = Symbol.for("lit-nothing"), Qe = /* @__PURE__ */ new WeakMap(), ot = at.createTreeWalker(at, 129);
function ii(t, e) {
  if (!ke(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ge !== void 0 ? Ge.createHTML(e) : e;
}
const tr = (t, e) => {
  const n = t.length - 1, r = [];
  let i, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = _t;
  for (let a = 0; a < n; a++) {
    const l = t[a];
    let c, u, p = -1, d = 0;
    for (; d < l.length && (s.lastIndex = d, u = s.exec(l), u !== null); ) d = s.lastIndex, s === _t ? u[1] === "!--" ? s = Xe : u[1] !== void 0 ? s = Ze : u[2] !== void 0 ? (ei.test(u[2]) && (i = RegExp("</" + u[2], "g")), s = nt) : u[3] !== void 0 && (s = nt) : s === nt ? u[0] === ">" ? (s = i ?? _t, p = -1) : u[1] === void 0 ? p = -2 : (p = s.lastIndex - u[2].length, c = u[1], s = u[3] === void 0 ? nt : u[3] === '"' ? Je : Ye) : s === Je || s === Ye ? s = nt : s === Xe || s === Ze ? s = _t : (s = nt, i = void 0);
    const f = s === nt && t[a + 1].startsWith("/>") ? " " : "";
    o += s === _t ? l + Ji : p >= 0 ? (r.push(c), l.slice(0, p) + Qn + l.slice(p) + J + f) : l + J + (p === -2 ? a : f);
  }
  return [ii(t, o + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class Rt {
  constructor({ strings: e, _$litType$: n }, r) {
    let i;
    this.parts = [];
    let o = 0, s = 0;
    const a = e.length - 1, l = this.parts, [c, u] = tr(e, n);
    if (this.el = Rt.createElement(c, r), ot.currentNode = this.el.content, n === 2 || n === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = ot.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(Qn)) {
          const d = u[s++], f = i.getAttribute(p).split(J), b = /([.?@])?(.*)/.exec(d);
          l.push({ type: 1, index: o, name: b[2], strings: f, ctor: b[1] === "." ? nr : b[1] === "?" ? ir : b[1] === "@" ? rr : Jt }), i.removeAttribute(p);
        } else p.startsWith(J) && (l.push({ type: 6, index: o }), i.removeAttribute(p));
        if (ei.test(i.tagName)) {
          const p = i.textContent.split(J), d = p.length - 1;
          if (d > 0) {
            i.textContent = Vt ? Vt.emptyScript : "";
            for (let f = 0; f < d; f++) i.append(p[f], Ct()), ot.nextNode(), l.push({ type: 2, index: ++o });
            i.append(p[d], Ct());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ti) l.push({ type: 2, index: o });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(J, p + 1)) !== -1; ) l.push({ type: 7, index: o }), p += J.length - 1;
      }
      o++;
    }
  }
  static createElement(e, n) {
    const r = at.createElement("template");
    return r.innerHTML = e, r;
  }
}
function $t(t, e, n = t, r) {
  if (e === K) return e;
  let i = r !== void 0 ? n._$Co?.[r] : n._$Cl;
  const o = It(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== o && (i?._$AO?.(!1), o === void 0 ? i = void 0 : (i = new o(t), i._$AT(t, n, r)), r !== void 0 ? (n._$Co ??= [])[r] = i : n._$Cl = i), i !== void 0 && (e = $t(t, i._$AS(t, e.values), i, r)), e;
}
class er {
  constructor(e, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: n }, parts: r } = this._$AD, i = (e?.creationScope ?? at).importNode(n, !0);
    ot.currentNode = i;
    let o = ot.nextNode(), s = 0, a = 0, l = r[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let c;
        l.type === 2 ? c = new wt(o, o.nextSibling, this, e) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, e) : l.type === 6 && (c = new sr(o, this, e)), this._$AV.push(c), l = r[++a];
      }
      s !== l?.index && (o = ot.nextNode(), s++);
    }
    return ot.currentNode = at, i;
  }
  p(e) {
    let n = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, n), n += r.strings.length - 2) : r._$AI(e[n])), n++;
  }
}
class wt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, n, r, i) {
    this.type = 2, this._$AH = y, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = r, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && e?.nodeType === 11 && (e = n.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, n = this) {
    e = $t(this, e, n), It(e) ? e === y || e == null || e === "" ? (this._$AH !== y && this._$AR(), this._$AH = y) : e !== this._$AH && e !== K && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Qi(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== y && It(this._$AH) ? this._$AA.nextSibling.data = e : this.T(at.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: n, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = Rt.createElement(ii(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === i) this._$AH.p(n);
    else {
      const o = new er(i, this), s = o.u(this.options);
      o.p(n), this.T(s), this._$AH = o;
    }
  }
  _$AC(e) {
    let n = Qe.get(e.strings);
    return n === void 0 && Qe.set(e.strings, n = new Rt(e)), n;
  }
  k(e) {
    ke(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let r, i = 0;
    for (const o of e) i === n.length ? n.push(r = new wt(this.O(Ct()), this.O(Ct()), this, this.options)) : r = n[i], r._$AI(o), i++;
    i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); e !== this._$AB; ) {
      const r = Ke(e).nextSibling;
      Ke(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Jt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, r, i, o) {
    this.type = 1, this._$AH = y, this._$AN = void 0, this.element = e, this.name = n, this._$AM = i, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = y;
  }
  _$AI(e, n = this, r, i) {
    const o = this.strings;
    let s = !1;
    if (o === void 0) e = $t(this, e, n, 0), s = !It(e) || e !== this._$AH && e !== K, s && (this._$AH = e);
    else {
      const a = e;
      let l, c;
      for (e = o[0], l = 0; l < o.length - 1; l++) c = $t(this, a[r + l], n, l), c === K && (c = this._$AH[l]), s ||= !It(c) || c !== this._$AH[l], c === y ? e = y : e !== y && (e += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    s && !i && this.j(e);
  }
  j(e) {
    e === y ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class nr extends Jt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === y ? void 0 : e;
  }
}
class ir extends Jt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== y);
  }
}
class rr extends Jt {
  constructor(e, n, r, i, o) {
    super(e, n, r, i, o), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = $t(this, e, n, 0) ?? y) === K) return;
    const r = this._$AH, i = e === y && r !== y || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, o = e !== y && (r === y || i);
    i && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class sr {
  constructor(e, n, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    $t(this, e);
  }
}
const or = { I: wt }, ar = _e.litHtmlPolyfillSupport;
ar?.(Rt, wt), (_e.litHtmlVersions ??= []).push("3.3.3");
const lr = (t, e, n) => {
  const r = n?.renderBefore ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const o = n?.renderBefore ?? null;
    r._$litPart$ = i = new wt(e.insertBefore(Ct(), o), o, void 0, n ?? {});
  }
  return i._$AI(t), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Se = globalThis;
let Z = class extends ut {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = lr(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return K;
  }
};
Z._$litElement$ = !0, Z.finalized = !0, Se.litElementHydrateSupport?.({ LitElement: Z });
const cr = Se.litElementPolyfillSupport;
cr?.({ LitElement: Z });
(Se.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dr = { attribute: !0, type: String, converter: qt, reflect: !1, hasChanged: xe }, hr = (t = dr, e, n) => {
  const { kind: r, metadata: i } = n;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), o.set(n.name, t), r === "accessor") {
    const { name: s } = n;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(s, l, t, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(s, void 0, t, a), a;
    } };
  }
  if (r === "setter") {
    const { name: s } = n;
    return function(a) {
      const l = this[s];
      e.call(this, a), this.requestUpdate(s, l, t, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function C(t) {
  return (e, n) => typeof n == "object" ? hr(t, e, n) : ((r, i, o) => {
    const s = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, r), s ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(t, e, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Nt(t) {
  return C({ ...t, state: !0, attribute: !1 });
}
function Pt(t) {
  return (e) => {
    customElements.get(t) || customElements.define(t, e);
  };
}
const pr = {
  on: "An",
  off: "Aus",
  unavailable: "Nicht verfügbar",
  unknown: "Unbekannt",
  open: "Offen",
  closed: "Geschlossen",
  locked: "Verriegelt",
  unlocked: "Entriegelt",
  home: "Zuhause",
  not_home: "Abwesend",
  playing: "Wiedergabe",
  paused: "Pause",
  idle: "Bereit"
};
function ur(t) {
  const e = t.attributes?.unit_of_measurement;
  return pr[t.state] ?? (typeof e == "string" && e ? `${t.state} ${e}` : t.state);
}
function fr(t, e) {
  const n = t.attributes?.[e];
  return n == null ? "" : String(n);
}
const yr = (t) => t;
let ri = () => {
};
const mr = (t) => ri(t), tn = /* @__PURE__ */ new Set();
function gr(t) {
  tn.has(t) || (tn.add(t), console.warn(`[floorplan-core] ${t}`));
}
const br = { toggle: "toggle", turn_on: "an", turn_off: "aus" };
function $r(t, e, n) {
  const r = t.zustand(e), i = r?.state ?? "unavailable", o = { ...r?.attributes };
  return o.friendly_name === void 0 && (o.friendly_name = t.name(e) ?? e), n && n.state === i && vr(n.attributes, o) ? n : { entity_id: e, state: i, attributes: o, last_changed: "", last_updated: "", context: { id: "", parent_id: null, user_id: null } };
}
function vr(t, e) {
  const n = Object.keys(t);
  return n.length !== Object.keys(e).length ? !1 : n.every((r) => r in e && JSON.stringify(t[r]) === JSON.stringify(e[r]));
}
function en(t, e = [], n, r) {
  ri = (s) => t.icon(s);
  const i = { ...n?.states ?? {} }, o = r && n ? r : e;
  for (const s of o) i[s] = $r(t, s, i[s]);
  return {
    states: i,
    entities: n?.entities ?? {},
    language: "de",
    locale: { language: "de", number_format: "language", time_format: "24" },
    themes: { darkMode: !1 },
    user: void 0,
    connection: {},
    localize: yr,
    formatEntityState: ur,
    formatEntityAttributeValue: fr,
    async callService(s, a, l, c) {
      const u = br[a];
      if (!u) return gr(`Dienst ${s}.${a} wird im Kern ignoriert.`);
      const p = [].concat(l?.entity_id ?? c?.entity_id ?? []);
      for (const d of p) await t.aktion(d, u);
    },
    callWS: () => Promise.reject(new Error("Im Kern nicht verfügbar"))
  };
}
var wr = Object.defineProperty, xr = Object.getOwnPropertyDescriptor, Qt = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? xr(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && wr(e, n, i), i;
};
let Kt = class extends Z {
  render() {
    return S`${this.header ? S`<div class="header">${this.header}</div>` : ""}<slot></slot>`;
  }
};
Kt.styles = vt`
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
Qt([
  C()
], Kt.prototype, "header", 2);
Kt = Qt([
  Pt("ha-card")
], Kt);
let Gt = class extends Z {
  render() {
    const t = this.icon ? mr(this.icon) : void 0;
    return S`<svg viewBox="0 0 24 24" aria-hidden="true">${t ? $`<path d=${t}></path>` : $`<circle cx="12" cy="12" r="6"></circle>`}</svg>`;
  }
};
Gt.styles = vt`
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
Qt([
  C()
], Gt.prototype, "icon", 2);
Gt = Qt([
  Pt("ha-icon")
], Gt);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _r = { CHILD: 2 }, te = (t) => (...e) => ({ _$litDirective$: t, values: e });
let ee = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, n, r) {
    this._$Ct = e, this._$AM = n, this._$Ci = r;
  }
  _$AS(e, n) {
    return this.update(e, n);
  }
  update(e, n) {
    return this.render(...n);
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: kr } = or, nn = (t) => t, rn = () => document.createComment(""), kt = (t, e, n) => {
  const r = t._$AA.parentNode, i = e === void 0 ? t._$AB : e._$AA;
  if (n === void 0) {
    const o = r.insertBefore(rn(), i), s = r.insertBefore(rn(), i);
    n = new kr(o, s, t, t.options);
  } else {
    const o = n._$AB.nextSibling, s = n._$AM, a = s !== t;
    if (a) {
      let l;
      n._$AQ?.(t), n._$AM = t, n._$AP !== void 0 && (l = t._$AU) !== s._$AU && n._$AP(l);
    }
    if (o !== i || a) {
      let l = n._$AA;
      for (; l !== o; ) {
        const c = nn(l).nextSibling;
        nn(r).insertBefore(l, i), l = c;
      }
    }
  }
  return n;
}, it = (t, e, n = t) => (t._$AI(e, n), t), Sr = {}, si = (t, e = Sr) => t._$AH = e, Er = (t) => t._$AH, le = (t) => {
  t._$AR(), t._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const sn = (t, e, n) => {
  const r = /* @__PURE__ */ new Map();
  for (let i = e; i <= n; i++) r.set(t[i], i);
  return r;
}, ft = te(class extends ee {
  constructor(t) {
    if (super(t), t.type !== _r.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(t, e, n) {
    let r;
    n === void 0 ? n = e : e !== void 0 && (r = e);
    const i = [], o = [];
    let s = 0;
    for (const a of t) i[s] = r ? r(a, s) : s, o[s] = n(a, s), s++;
    return { values: o, keys: i };
  }
  render(t, e, n) {
    return this.dt(t, e, n).values;
  }
  update(t, [e, n, r]) {
    const i = Er(t), { values: o, keys: s } = this.dt(e, n, r);
    if (!Array.isArray(i)) return this.ut = s, o;
    const a = this.ut ??= [], l = [];
    let c, u, p = 0, d = i.length - 1, f = 0, b = o.length - 1;
    for (; p <= d && f <= b; ) if (i[p] === null) p++;
    else if (i[d] === null) d--;
    else if (a[p] === s[f]) l[f] = it(i[p], o[f]), p++, f++;
    else if (a[d] === s[b]) l[b] = it(i[d], o[b]), d--, b--;
    else if (a[p] === s[b]) l[b] = it(i[p], o[b]), kt(t, l[b + 1], i[p]), p++, b--;
    else if (a[d] === s[f]) l[f] = it(i[d], o[f]), kt(t, i[p], i[d]), d--, f++;
    else if (c === void 0 && (c = sn(s, f, b), u = sn(a, p, d)), c.has(a[p])) if (c.has(a[d])) {
      const m = u.get(s[f]), g = m !== void 0 ? i[m] : null;
      if (g === null) {
        const w = kt(t, i[p]);
        it(w, o[f]), l[f] = w;
      } else l[f] = it(g, o[f]), kt(t, i[p], g), i[m] = null;
      f++;
    } else le(i[d]), d--;
    else le(i[p]), p++;
    for (; f <= b; ) {
      const m = kt(t, l[b + 1]);
      it(m, o[f]), l[f++] = m;
    }
    for (; p <= d; ) {
      const m = i[p++];
      m !== null && le(m);
    }
    return this.ut = s, si(t, l), K;
  }
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ar = te(class extends ee {
  constructor() {
    super(...arguments), this.key = y;
  }
  render(t, e) {
    return this.key = t, e;
  }
  update(t, [e, n]) {
    return e !== this.key && (si(t), this.key = e), n;
  }
});
class on {
  constructor(e) {
    this._hass = e;
  }
  getEntityState(e) {
    return this._hass.states[e];
  }
}
class Tr {
  constructor(e, n, r) {
    this._historyService = e, this._fallback = n, this._timestamp = r, this._historicalStates = this._historyService.getStateAt(this._timestamp);
  }
  getEntityState(e) {
    const n = this._historicalStates.get(e);
    if (n) return n;
    const r = this._fallback.getEntityState(e);
    return r ? { ...r, attributes: { ...r.attributes ?? {} } } : void 0;
  }
}
function Mr(t, e, n, r) {
  return t ? n ? new Tr(e, new on(t), r) : new on(t) : { getEntityState: () => {
  } };
}
function Cr(t, e, n, r, i) {
  if (!t) return;
  const o = Mr(t, n, r, i), s = {};
  for (const a of e)
    s[a] = o.getEntityState(a);
  return {
    states: s,
    formatEntityState: (a) => t.formatEntityState(a),
    formatEntityAttributeValue: t.formatEntityAttributeValue ? (a, l) => t.formatEntityAttributeValue(a, l) : void 0
  };
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ir = {}, an = te(class extends ee {
  constructor() {
    super(...arguments), this.ot = Ir;
  }
  render(t, e) {
    return e();
  }
  update(t, [e, n]) {
    if (Array.isArray(e)) {
      if (Array.isArray(this.ot) && this.ot.length === e.length && e.every((r, i) => r === this.ot[i])) return K;
    } else if (this.ot === e) return K;
    return this.ot = Array.isArray(e) ? Array.from(e) : e, this.render(e, n);
  }
}), Rr = /* @__PURE__ */ new Set([
  // colour
  "rgb",
  "rgba",
  "hsl",
  "hsla",
  "hwb",
  "lab",
  "lch",
  "oklab",
  "oklch",
  "color",
  "color-mix",
  "light-dark",
  // custom properties / environment
  "var",
  "env",
  // maths (calc & friends can appear inside colour components)
  "calc",
  "clamp",
  "min",
  "max",
  "abs",
  "round",
  "mod",
  "rem",
  "sin",
  "cos",
  "tan",
  "asin",
  "acos",
  "atan",
  "atan2",
  "pow",
  "sqrt",
  "hypot",
  "log",
  "exp",
  // gradients (valid for the stage `background`)
  "linear-gradient",
  "radial-gradient",
  "conic-gradient",
  "repeating-linear-gradient",
  "repeating-radial-gradient",
  "repeating-conic-gradient"
]), Or = /^[a-z0-9#%.,/_() +*-]+$/i, Lr = /([a-z][a-z0-9-]*)\s*\(/gi;
function z(t) {
  if (typeof t != "string") return;
  const e = t.trim();
  if (!e || !Or.test(e) || e.includes("/*") || e.includes("*/") || !/^[a-z#]/i.test(e)) return;
  let n = 0;
  for (let i = 0; i < e.length; i++) {
    const o = e[i];
    if (o === "(") n++;
    else if (o === ")" && --n < 0) return;
  }
  if (n !== 0) return;
  const r = new RegExp(Lr.source, "gi");
  for (let i; i = r.exec(e); )
    if (!Rr.has(i[1].toLowerCase())) return;
  return e;
}
function q(t, e) {
  return z(t) ?? e;
}
function L(t, e) {
  if (t == null || typeof t == "string" && t.trim() === "") return e;
  const n = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) ? n : e;
}
function j(t) {
  if (typeof t != "string") return;
  const e = t.trim().replace(/[^a-zA-Z0-9_-]/g, "");
  return e === "" ? void 0 : e;
}
const zr = {
  white: [255, 255, 255],
  black: [0, 0, 0],
  red: [255, 0, 0],
  green: [0, 128, 0],
  lime: [0, 255, 0],
  blue: [0, 0, 255],
  navy: [0, 0, 128],
  yellow: [255, 255, 0],
  orange: [255, 165, 0],
  gold: [255, 215, 0],
  purple: [128, 0, 128],
  pink: [255, 192, 203],
  brown: [165, 42, 42],
  maroon: [128, 0, 0],
  olive: [128, 128, 0],
  teal: [0, 128, 128],
  cyan: [0, 255, 255],
  aqua: [0, 255, 255],
  magenta: [255, 0, 255],
  fuchsia: [255, 0, 255],
  silver: [192, 192, 192],
  gray: [128, 128, 128],
  grey: [128, 128, 128],
  lightgray: [211, 211, 211],
  lightgrey: [211, 211, 211],
  darkgray: [169, 169, 169],
  darkgrey: [169, 169, 169],
  transparent: [255, 255, 255]
};
function Nr(t) {
  const e = t.trim().toLowerCase(), n = zr[e];
  if (n) return n;
  const r = /^#([0-9a-f]{3,8})$/i.exec(e);
  if (r) {
    const o = r[1];
    return o.length === 3 || o.length === 4 ? [0, 1, 2].map((s) => parseInt(o[s] + o[s], 16)) : o.length === 6 || o.length === 8 ? [0, 2, 4].map((s) => parseInt(o.slice(s, s + 2), 16)) : void 0;
  }
  const i = /^rgba?\(([^)]*)\)$/.exec(e);
  if (i) {
    const o = i[1].split(/[\s,/]+/).filter((a) => a !== "");
    if (o.length < 3) return;
    const s = o.slice(0, 3).map((a) => {
      if (a.endsWith("%")) {
        const l = Number(a.slice(0, -1));
        return Number.isFinite(l) ? l / 100 * 255 : NaN;
      }
      return Number(a);
    });
    return s.some((a) => !Number.isFinite(a)) ? void 0 : s.map((a) => Math.max(0, Math.min(255, a)));
  }
}
function Ee([t, e, n]) {
  const r = (i) => {
    const o = i / 255;
    return o <= 0.03928 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * r(t) + 0.7152 * r(e) + 0.0722 * r(n);
}
const Pr = "#212121", Hr = "#ffffff", Dr = Ee([33, 33, 33]), Fr = Ee([255, 255, 255]);
function Ur(t) {
  if (typeof t != "string") return;
  const e = Nr(t);
  if (!e) return;
  const n = Ee(e), r = (i) => (Math.max(n, i) + 0.05) / (Math.min(n, i) + 0.05);
  return r(Dr) >= r(Fr) ? Pr : Hr;
}
const jr = /^[a-z0-9]+(?:-[a-z0-9]+)*:[a-z0-9]+(?:-[a-z0-9]+)*$/i;
function Tt(t) {
  if (typeof t != "string") return;
  const e = t.trim();
  return jr.test(e) ? e : void 0;
}
function tt(t) {
  if (typeof t != "string") return;
  const e = t.trim().replace(/[^a-zA-Z0-9_.-]/g, "");
  return e === "" ? void 0 : e;
}
const Ae = "default", Br = 10, oi = [
  {
    id: Ae,
    label: "Default",
    description: "Follows your Home Assistant theme",
    vars: {}
  },
  {
    id: "odnetnin",
    label: "Odnetnin",
    description: "Playful and chunky — thick outlines on warm paper",
    vars: {
      "--fp-skin-bg": "#fffdf7",
      "--fp-skin-card-bg": "#fffdf7",
      "--fp-skin-wall": "#3b3b3b",
      "--fp-skin-wall-width": "10",
      "--fp-skin-wall-filter": "none",
      "--fp-skin-accent": "#e4444c",
      // White, not the charcoal ink: on this red it reads at 4.0 where the
      // charcoal manages 2.8. The skin whose accent is dark enough to want
      // dark ink is the one that would get this wrong by reusing active-ink.
      "--fp-skin-accent-ink": "#ffffff",
      "--fp-skin-active": "#ffcb05",
      "--fp-skin-active-ink": "#3b3b3b",
      "--fp-skin-text": "#3b3b3b",
      "--fp-skin-badge-bg": "#ffffff",
      "--fp-skin-badge-border": "#3b3b3b",
      "--fp-skin-badge-border-width": "2px",
      // Rounded square rather than a circle, and a hard offset shadow instead
      // of a blur — the two together are what read as "printed sticker".
      "--fp-skin-badge-radius": "30%",
      "--fp-skin-badge-shadow": "0 2px 0 #3b3b3b",
      "--fp-skin-furniture": "#b9b3a7",
      "--fp-skin-glow": "#ffe9a8"
    }
  },
  {
    id: "pastel",
    label: "Pastel",
    description: "Soft and low-contrast — muted mauve on blush",
    vars: {
      "--fp-skin-bg": "#fdf7f9",
      "--fp-skin-card-bg": "#fdf7f9",
      "--fp-skin-wall": "#8b8296",
      "--fp-skin-wall-width": "7",
      "--fp-skin-wall-filter": "none",
      "--fp-skin-accent": "#a8c8ec",
      "--fp-skin-accent-ink": "#4a4453",
      "--fp-skin-active": "#ffd6a5",
      "--fp-skin-active-ink": "#4a4453",
      "--fp-skin-text": "#4a4453",
      "--fp-skin-badge-bg": "#ffffff",
      "--fp-skin-badge-border": "#e6dced",
      "--fp-skin-badge-border-width": "1.5px",
      "--fp-skin-badge-radius": "50%",
      "--fp-skin-badge-shadow": "0 1px 4px rgba(120, 100, 130, 0.18)",
      "--fp-skin-furniture": "#d8cfe0",
      "--fp-skin-glow": "#ffe8d6"
    }
  },
  {
    id: "tron",
    label: "Tron",
    description: "Neon lines on near-black — thin walls that glow",
    vars: {
      "--fp-skin-bg": "#05080c",
      "--fp-skin-card-bg": "#05080c",
      "--fp-skin-wall": "#7de3ff",
      // Thin, because a neon line is the light rather than the mass. The glow
      // does the work the width would have done.
      "--fp-skin-wall-width": "5",
      "--fp-skin-wall-filter": "drop-shadow(0 0 4px #22d3ee)",
      "--fp-skin-accent": "#22d3ee",
      "--fp-skin-accent-ink": "#05080c",
      "--fp-skin-active": "#ff9f1c",
      "--fp-skin-active-ink": "#05080c",
      "--fp-skin-text": "#cdf6ff",
      "--fp-skin-badge-bg": "#0b1220",
      "--fp-skin-badge-border": "#22d3ee",
      "--fp-skin-badge-border-width": "1.5px",
      "--fp-skin-badge-radius": "50%",
      "--fp-skin-badge-shadow": "0 0 8px rgba(34, 211, 238, 0.5)",
      "--fp-skin-furniture": "#1e4b57",
      "--fp-skin-glow": "#7de3ff"
    }
  }
], Te = "var(--fp-skin-bg, var(--card-background-color, #fff))", ai = "var(--fp-skin-wall, var(--primary-text-color))", Wr = "var(--fp-skin-text, var(--primary-text-color))", P = "var(--fp-skin-accent, var(--primary-color, #03a9f4))", ce = "var(--fp-skin-active, var(--state-light-active-color, var(--state-active-color, #fdd835)))", rt = "var(--fp-skin-badge-bg, var(--card-background-color, #fff))";
function qr(t) {
  if (typeof t == "string")
    return oi.find((e) => e.id === t);
}
function Vr(t) {
  const e = qr(t);
  return e && e.id !== Ae ? e.id : void 0;
}
const Kr = Wt(
  oi.filter((t) => t.id !== Ae).map(
    (t) => `:host([data-skin="${t.id}"]){` + Object.entries(t.vars).map(([e, n]) => `${e}:${n};`).join("") + "}"
  ).join(`
`)
), Gr = vt`
  :host {
    --fp-skin-bg: var(--card-background-color, #fff);
    --fp-skin-card-bg: var(--ha-card-background, var(--card-background-color, #fff));
    --fp-skin-wall: var(--primary-text-color);
    --fp-skin-wall-width: 8;
    --fp-skin-wall-filter: none;
    --fp-skin-accent: var(--primary-color, #03a9f4);
    --fp-skin-accent-ink: var(--text-primary-color, #fff);
    --fp-skin-active: var(--state-light-active-color, var(--state-active-color, #fdd835));
    --fp-skin-active-ink: var(--text-primary-color, #212121);
    --fp-skin-text: var(--primary-text-color);
    --fp-skin-badge-bg: var(--card-background-color, #fff);
    --fp-skin-badge-border: var(--divider-color, #ccc);
    --fp-skin-badge-border-width: 1.5px;
    --fp-skin-badge-radius: 50%;
    --fp-skin-badge-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    --fp-skin-furniture: #9e9e9e;
    --fp-skin-glow: #ffd9a0;
  }
`, Xr = 6e4, Zr = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
function li(t) {
  return Zr.has(t);
}
function Me(t) {
  if (t === "") return;
  const e = Number(t);
  return Number.isFinite(e) ? e : void 0;
}
function ci(t) {
  let e = 0;
  for (const n of t)
    if (!li(n.newState)) {
      if (Me(n.newState) === void 0) return !1;
      e++;
    }
  return e > 0;
}
function Yr(t, e, n) {
  const r = t.map((c) => Me(c.newState)), i = r.filter((c) => c !== void 0);
  if (!i.length) return t;
  const o = (Math.max(...i) - Math.min(...i)) / e;
  if (!(o > 0) && !t.some((c) => li(c.newState)))
    return t.length ? [t[0], t[t.length - 1]] : [];
  const s = [t[0]];
  let a = r[0], l = t[0].timestamp;
  for (let c = 1; c < t.length - 1; c++) {
    const u = r[c];
    if (u === void 0) {
      s.push(t[c]), a = void 0, l = t[c].timestamp;
      continue;
    }
    if (a === void 0) {
      s.push(t[c]), a = u, l = t[c].timestamp;
      continue;
    }
    const p = r[c - 1], d = r[c + 1], f = p !== void 0 && d !== void 0 && (u > p && u >= d || u < p && u <= d);
    (Math.abs(u - a) >= o || f && Math.abs(u - a) >= o / 2 || t[c].timestamp - l >= n) && (s.push(t[c]), a = u, l = t[c].timestamp);
  }
  return t.length > 1 && s.push(t[t.length - 1]), s;
}
function Jr(t, e = {}) {
  const n = e.numericSteps ?? 0;
  return !(n > 0) || t.length < 3 || !ci(t) ? t : Yr(t, n, e.maxGapMs ?? Xr);
}
function Qr(t, e = {}) {
  if (!(e.numericSteps ?? 0) || t.length === 0) return t;
  const n = /* @__PURE__ */ new Map();
  for (const i of t) {
    const o = n.get(i.entityId);
    o ? o.push(i) : n.set(i.entityId, [i]);
  }
  const r = /* @__PURE__ */ new Set();
  for (const i of n.values())
    for (const o of Jr(i, e)) r.add(o);
  return t.filter((i) => r.has(i));
}
function ts(t, e) {
  if (!(e > 2) || t.length <= e || !ci(t)) return t;
  const n = t.map((s) => Me(s.newState)), r = /* @__PURE__ */ new Set([0, t.length - 1]);
  for (let s = 0; s < t.length; s++)
    n[s] === void 0 && r.add(s);
  const i = [];
  let o;
  for (let s = 0; s < t.length; s++) {
    const a = n[s];
    if (a === void 0) {
      o = void 0;
      continue;
    }
    s > 0 && s < t.length - 1 && o !== void 0 && i.push({ i: s, delta: Math.abs(a - o) }), o = a;
  }
  i.sort((s, a) => a.delta - s.delta);
  for (const { i: s } of i) {
    if (r.size >= e) break;
    r.add(s);
  }
  return t.filter((s, a) => r.has(a));
}
function Ot(t) {
  const e = typeof t.color == "string" ? z(t.color) : void 0;
  if (e) return e;
  const n = t.attributes?.color, r = typeof n == "string" ? z(n) : void 0;
  if (r) return r;
  const i = String(t.newState ?? "").trim().toLowerCase();
  return t.entityId.startsWith("light.") ? i === "off" ? rt : ce : t.entityId.startsWith("cover.") ? i === "closed" ? rt : P : t.entityId.startsWith("sensor.") || t.entityId.startsWith("binary_sensor.") ? i === "off" ? rt : P : t.entityId.startsWith("fan.") ? i === "off" ? rt : ce : t.entityId.startsWith("media_player.") ? i === "idle" ? rt : ce : i === "on" || i === "open" || i === "playing" || i === "home" || i === "locked" || i === "unlocked" ? P : rt;
}
class es {
  constructor(e = {}) {
    this._cache = /* @__PURE__ */ new Map(), this._events = [], this._eventsByEntity = /* @__PURE__ */ new Map(), this._maxCacheEntries = 8, this._loadCommitId = 0, this._loader = e.loader ?? (async () => []);
  }
  configure(e = {}) {
    this._context = e;
  }
  async loadHistory(e, n, r = {}) {
    const i = ++this._loadCommitId, o = r.scopeKey ?? "all", s = `${e}:${n}:${o}:${r.numericSteps ?? 0}`;
    if (this._cache.has(s)) {
      if (i === this._loadCommitId) {
        const d = this._cache.get(s);
        this._events = d, this._eventsByEntity = this._groupEventsByEntity(d);
      }
      return;
    }
    const a = r.hass ?? this._context?.hass, l = r.watched ?? this._context?.watched, u = (a && Array.isArray(l) ? await this._loadFromHass(a, e, n, l) : await this._loader(e, n, { ...this._context, ...r, hass: a, watched: l })).slice().sort((d, f) => d.timestamp - f.timestamp).map((d) => ({
      ...d,
      attributes: d.attributes ?? {}
    })), p = Qr(u, { numericSteps: r.numericSteps });
    if (i === this._loadCommitId) {
      if (this._cache.set(s, p), this._cache.size > this._maxCacheEntries) {
        const d = this._cache.keys().next().value;
        d && this._cache.delete(d);
      }
      this._events = p, this._eventsByEntity = this._groupEventsByEntity(p);
    }
  }
  async loadFromHass(e, n, r, i) {
    return this._loadFromHass(e, n, r, i);
  }
  async _loadFromHass(e, n, r, i) {
    if (!i.length) return [];
    const o = e.callWS, s = e.callApi, a = new Date(n * 1e3).toISOString(), l = new Date(r * 1e3).toISOString(), c = new Set(i), u = {
      type: "history/history_during_period",
      start_time: a,
      end_time: l,
      minimal_response: !1,
      no_attributes: !1,
      significant_changes_only: !1,
      entity_ids: i
    };
    let p;
    if (typeof o == "function")
      try {
        p = await o(u);
      } catch (d) {
        console.warn("[easy-floorplan] Replay WS history query failed", { startTime: a, endTime: l, watchedCount: i.length, error: d });
      }
    if (!p && typeof s == "function")
      try {
        p = await s("GET", `history/period/${encodeURIComponent(a)}`, {
          end_time: l,
          filter_entity_id: i.join(","),
          minimal_response: !1,
          no_attributes: !1,
          significant_changes_only: !1
        });
      } catch (d) {
        console.warn("[easy-floorplan] Replay REST history query failed", { startTime: a, endTime: l, watchedCount: i.length, error: d });
      }
    if (!p)
      throw new Error(`Unable to load history via websocket or REST API (ws:${typeof o == "function" ? "yes" : "no"}, api:${typeof s == "function" ? "yes" : "no"}).`);
    return this._normalizeHistoryPayload(p, n, r, c);
  }
  _normalizeHistoryPayload(e, n, r, i) {
    const o = /* @__PURE__ */ new Map(), s = (d, f) => {
      if (typeof d == "number")
        return Number.isFinite(d) ? d > 1e12 ? d / 1e3 : d : Number.NaN;
      if (typeof d == "string") {
        const b = Number(d);
        if (Number.isFinite(b)) return b > 1e12 ? b / 1e3 : b;
        const m = Date.parse(d) / 1e3;
        return Number.isFinite(m) ? m : Number.NaN;
      }
      return Date.parse(f) / 1e3;
    }, a = (d, f) => {
      for (const b of f) {
        const m = d[b];
        if (m !== void 0) return m;
      }
    }, l = (d, f) => {
      const b = f.filter((m) => !!m && typeof m == "object");
      b.length && o.set(d, b.map((m) => {
        const g = a(m, ["state", "s"]), w = a(m, ["attributes", "a"]), E = a(m, ["last_updated", "lu"]), h = a(m, ["last_changed", "lc"]);
        return {
          state: typeof g == "string" || typeof g == "number" || typeof g == "boolean" ? String(g) : void 0,
          attributes: w && typeof w == "object" ? w : void 0,
          last_updated: typeof E == "string" || typeof E == "number" ? E : void 0,
          last_changed: typeof h == "string" || typeof h == "number" ? h : void 0
        };
      }));
    };
    if (Array.isArray(e))
      for (const d of e) {
        if (!d || typeof d != "object") continue;
        const f = d, b = typeof f.entity_id == "string" ? f.entity_id : void 0, m = Array.isArray(f.states) ? f.states : Array.isArray(f.history) ? f.history : [];
        b && m.length && l(b, m);
      }
    else if (e && typeof e == "object")
      for (const [d, f] of Object.entries(e)) {
        if (Array.isArray(f) && f.length) {
          l(d, f);
          continue;
        }
        if (f && typeof f == "object") {
          const b = f;
          Array.isArray(b.states) && b.states.length && l(d, b.states);
        }
      }
    if (!o.size)
      throw new Error("History payload contained no parseable state rows.");
    const c = [], u = new Date(r * 1e3).toISOString();
    for (const [d, f] of o.entries())
      if (f.length && i.has(d)) {
        if (f.length === 1) {
          const b = f[0], m = s(b.last_updated ?? b.last_changed, u);
          if (!Number.isFinite(m) || m < n || m > r)
            continue;
          c.push({
            timestamp: m,
            entityId: d,
            oldState: b.state ?? "unknown",
            newState: b.state ?? "unknown",
            attributes: b.attributes ?? {}
          });
          continue;
        }
        for (let b = 1; b < f.length; b += 1) {
          const m = f[b - 1], g = f[b], w = s(m.last_updated ?? m.last_changed, u), E = s(g.last_updated ?? g.last_changed, u);
          if (!Number.isFinite(w) || !Number.isFinite(E) || E < n || w > r)
            continue;
          const h = m.state !== g.state, v = !this._attributesEqual(m.attributes ?? {}, g.attributes ?? {});
          !h && !v || c.push({
            timestamp: E,
            entityId: d,
            oldState: m.state ?? "unknown",
            newState: g.state ?? "unknown",
            attributes: {
              ...m.attributes ?? {},
              ...g.attributes ?? {}
            }
          });
        }
      }
    return c.sort((d, f) => d.timestamp - f.timestamp);
  }
  _attributesEqual(e, n) {
    if (e === n) return !0;
    if (!e || !n) return !e && !n;
    if (typeof e != typeof n) return !1;
    if (Array.isArray(e) || Array.isArray(n)) {
      if (!Array.isArray(e) || !Array.isArray(n) || e.length !== n.length) return !1;
      for (let a = 0; a < e.length; a += 1)
        if (!this._attributesEqual(e[a], n[a])) return !1;
      return !0;
    }
    if (typeof e != "object") return !1;
    const r = e, i = n, o = Object.keys(r), s = Object.keys(i);
    if (o.length !== s.length) return !1;
    for (const a of o)
      if (!(a in i) || !this._attributesEqual(r[a], i[a])) return !1;
    return !0;
  }
  clearCache() {
    this._loadCommitId += 1, this._cache.clear(), this._events = [], this._eventsByEntity.clear();
  }
  getStateAt(e) {
    const n = /* @__PURE__ */ new Map();
    for (const [r, i] of this._eventsByEntity.entries()) {
      const o = this._findLastEventAtOrBefore(i, e);
      if (o) {
        n.set(r, this._toHassEntity(r, o.newState, o.attributes, o.timestamp));
        continue;
      }
      const s = i[0];
      s && n.set(r, this._toHassEntity(r, s.oldState, s.attributes, 0));
    }
    return n;
  }
  _groupEventsByEntity(e) {
    const n = /* @__PURE__ */ new Map();
    for (const r of e) {
      const i = n.get(r.entityId) ?? [];
      i.push(r), n.set(r.entityId, i);
    }
    for (const r of n.values())
      r.sort((i, o) => i.timestamp - o.timestamp);
    return n;
  }
  _findLastEventAtOrBefore(e, n) {
    let r = 0, i = e.length - 1, o;
    for (; r <= i; ) {
      const s = r + i >> 1, a = e[s];
      a.timestamp <= n ? (o = a, r = s + 1) : i = s - 1;
    }
    return o;
  }
  _toHassEntity(e, n, r, i) {
    const o = Number.isFinite(i) ? i : Date.now() / 1e3;
    return {
      entity_id: e,
      state: n,
      attributes: r ?? {},
      last_changed: new Date(o * 1e3).toISOString(),
      last_updated: new Date(o * 1e3).toISOString(),
      context: { id: "history", parent_id: null, user_id: null }
    };
  }
  getEvents() {
    return this._events.slice();
  }
  getEventBefore(e) {
    if (!this._events.length) return;
    let n = 0, r = this._events.length - 1, i = -1;
    for (; n <= r; ) {
      const o = n + r >> 1;
      this._events[o].timestamp <= e ? (i = o, n = o + 1) : r = o - 1;
    }
    return i >= 0 ? this._events[i] : void 0;
  }
  getEventAfter(e) {
    if (!this._events.length) return;
    let n = 0, r = this._events.length - 1, i = this._events.length;
    for (; n <= r; ) {
      const o = n + r >> 1;
      this._events[o].timestamp >= e ? (i = o, r = o - 1) : n = o + 1;
    }
    return i < this._events.length ? this._events[i] : void 0;
  }
}
var ns = Object.defineProperty, is = Object.getOwnPropertyDescriptor, lt = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? is(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && ns(e, n, i), i;
};
let V = class extends Z {
  constructor() {
    super(...arguments), this.events = [], this.startTime = 0, this.endTime = 0, this.currentTime = 0, this.expanded = !1, this._dragging = !1, this._hidden = /* @__PURE__ */ new Set();
  }
  _toggleLane(t) {
    const e = new Set(this._hidden);
    e.delete(t) || e.add(t), this._hidden = e;
  }
  _showAllLanes() {
    this._hidden = /* @__PURE__ */ new Set();
  }
  _seek(t) {
    this.dispatchEvent(new CustomEvent("seek", { detail: { timestamp: t }, bubbles: !0, composed: !0 }));
  }
  _formatTimestamp(t) {
    return Number.isFinite(t) ? new Intl.DateTimeFormat(void 0, {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit"
    }).format(new Date(t * 1e3)) : "—";
  }
  _getMarkerLeft(t) {
    return `${(t - this.startTime) / Math.max(1, this.endTime - this.startTime) * 100}%`;
  }
  /**
   * Keep markers visually centered while preventing edge overflow that can
   * trigger horizontal scrollbars in tight containers.
   */
  _getMarkerLeftClamped(t, e) {
    const n = this._getMarkerLeft(t);
    return `clamp(${e}px, ${n}, calc(100% - ${e}px))`;
  }
  /** This timestamp as a 0-100 position in the window, unitless for calc(). */
  _pct(t) {
    return (t - this.startTime) / Math.max(1, this.endTime - this.startTime) * 100;
  }
  _markerStyle(t, e = "0px") {
    const n = Ot(t), r = `left:${this._getMarkerLeftClamped(t.timestamp, 7)};--stack-offset:${e};--marker-pct:${this._pct(t.timestamp)};`;
    return n ? `${r}background:${n};box-shadow:0 0 0 2px ${n}22;` : r;
  }
  _formatEventTitle(t) {
    return `${this._formatTimestamp(t.timestamp)} · ${t.entityId}: ${t.oldState} → ${t.newState}`;
  }
  _formatClusterTitle(t) {
    return t.map((e) => this._formatEventTitle(e)).join(`
`);
  }
  _visibleEvents() {
    if (!this.events.length) return [];
    const t = this.startTime, e = this.endTime;
    return this.events.filter((n) => n.timestamp >= t && n.timestamp <= e);
  }
  /**
   * The events this timeline draws — every discrete state change, and the
   * largest moves of each numeric sensor up to what a lane can show. Replay
   * itself still reads the full series; this only decides what gets a marker.
   */
  /** Each entity's lane, display-thinned. Hidden lanes are still in here, so
   *  the expanded view can keep their label on screen to switch back on. */
  _laneSeries() {
    const t = /* @__PURE__ */ new Map();
    for (const e of this._visibleEvents()) {
      const n = t.get(e.entityId);
      n ? n.push(e) : t.set(e.entityId, [e]);
    }
    for (const [e, n] of t)
      t.set(e, ts(n, V.MAX_MARKERS_PER_LANE));
    return t;
  }
  /**
   * What the summary bar draws: every lane that is switched on. Hiding a lane
   * takes its events out of here too, which is the point — a summary that
   * still counted a lane you had switched off would not be a summary of what
   * you are looking at.
   */
  _drawnEvents() {
    const t = [];
    for (const [e, n] of this._laneSeries())
      this._hidden.has(e) || t.push(...n);
    return t.sort((e, n) => e.timestamp - n.timestamp);
  }
  _groupEventsByTimestamp() {
    const t = this._drawnEvents(), e = /* @__PURE__ */ new Map();
    for (const n of t) {
      const r = e.get(n.timestamp);
      r ? r.push(n) : e.set(n.timestamp, [n]);
    }
    return Array.from(e.entries()).map(([n, r]) => ({
      timestamp: n,
      events: r,
      left: this._getMarkerLeft(n)
    }));
  }
  _getEntityLabel(t) {
    const e = t.attributes ?? {};
    return ((typeof e.friendly_name == "string" ? e.friendly_name : void 0)?.trim() || t.entityId).replace(/^./, (i) => i.toUpperCase());
  }
  _seekFromClientX(t) {
    const e = this.expanded ? ".timeline-track-overlay" : ".timeline", n = this.shadowRoot?.querySelector(e)?.getBoundingClientRect();
    if (!n) return;
    const r = Math.max(1, this.endTime - this.startTime), i = Math.min(1, Math.max(0, (t - n.left) / n.width)), o = Math.round(this.startTime + i * r);
    this._seek(o);
  }
  _handleTimelineClick(t) {
    this._seekFromClientX(t.clientX);
  }
  _handleKeyDown(t) {
    const e = Math.max(1, this.endTime - this.startTime), n = Math.max(1, Math.round(e / 100));
    switch (t.key) {
      case "ArrowLeft":
      case "ArrowDown":
        this._seek(Math.max(this.startTime, this.currentTime - n)), t.preventDefault();
        break;
      case "ArrowRight":
      case "ArrowUp":
        this._seek(Math.min(this.endTime, this.currentTime + n)), t.preventDefault();
        break;
      case "Home":
        this._seek(this.startTime), t.preventDefault();
        break;
      case "End":
        this._seek(this.endTime), t.preventDefault();
        break;
    }
  }
  /**
   * The way back. Switching a lane off in the expanded view and then
   * collapsing would otherwise strand it: the summary bar has no labels to
   * click, so nothing on screen would say anything was missing.
   */
  _renderHiddenNotice() {
    if (!this._hidden.size) return y;
    const t = this._hidden.size;
    return S`
      <div class="lanes-hidden">
        <span>${t} lane${t === 1 ? "" : "s"} hidden</span>
        <button class="lanes-hidden-show" @click=${() => this._showAllLanes()}>Show all</button>
      </div>
    `;
  }
  _renderExpandedTimeline(t) {
    const e = this._laneSeries(), n = Array.from(e.keys()), r = (this.currentTime - this.startTime) / t * 100;
    return S`
      <div
        class="timeline-expanded timeline-interactive"
        style="--playhead-pct:${this._pct(this.currentTime)}"
        role="slider"
        tabindex="0"
        aria-label="Replay timeline"
        aria-valuemin=${this.startTime}
        aria-valuemax=${this.endTime}
        aria-valuenow=${this.currentTime}
        aria-valuetext=${this._formatTimestamp(this.currentTime)}
        @click=${(i) => this._handleTimelineClick(i)}
        @pointerdown=${(i) => this._handlePointerDown(i)}
        @pointermove=${(i) => this._handlePointerMove(i)}
        @pointerup=${(i) => this._handlePointerUp(i)}
        @pointerleave=${(i) => this._handlePointerUp(i)}
        @keydown=${this._handleKeyDown}
      >
        <div class="timeline-track-overlay" style="grid-row:1 / span ${n.length};" aria-hidden="true">
          <div class="playhead playhead-expanded" style="left:${r}%">
            <span class="playhead-time">${this._formatTimestamp(this.currentTime)}</span>
          </div>
        </div>
        ${an([this.events, this.startTime, this.endTime, this._hidden], () => n.map((i, o) => {
      const s = e.get(i) ?? [], a = o + 1, l = this._getEntityLabel(s[0]), c = this._hidden.has(i);
      return S`
            <button
              class="lane-label ${c ? "lane-off" : ""}"
              style="grid-row:${a};"
              aria-pressed=${c ? "false" : "true"}
              title=${c ? `Show ${l} on the timeline` : `Hide ${l} from the timeline`}
              @click=${(u) => {
        u.stopPropagation(), this._toggleLane(i);
      }}
            ><span class="lane-dot" aria-hidden="true"></span><span class="lane-name">${l}</span></button>
            <div class="lane lane-track ${c ? "lane-off" : ""}" style="grid-row:${a};">
              ${(c ? [] : s).map((u) => {
        const p = Ot(u), d = this._getMarkerLeftClamped(u.timestamp, 4);
        return S`
                  <button
                    class="marker"
                    style=${`left:${d};--marker-pct:${this._pct(u.timestamp)};${p ? `background:${p};box-shadow:0 0 0 2px ${p}22;` : ""}`}
                    title=${this._formatEventTitle(u)}
                    @click=${(f) => {
          f.stopPropagation(), this._seek(u.timestamp);
        }}
                  ></button>
                `;
      })}
            </div>
          `;
    }))}
      </div>
    `;
  }
  _handlePointerDown(t) {
    this._dragging = !0, this._updateFromPointer(t);
  }
  _handlePointerMove(t) {
    this._dragging && this._updateFromPointer(t);
  }
  _handlePointerUp(t) {
    this._dragging && (this._dragging = !1, this._updateFromPointer(t));
  }
  _updateFromPointer(t) {
    this._seekFromClientX(t.clientX);
  }
  render() {
    if (!this.events.length)
      return S`<div class="timeline-empty">No history available.</div>`;
    const t = Math.max(1, this.endTime - this.startTime);
    return this.expanded ? S`${this._renderHiddenNotice()}${this._renderExpandedTimeline(t)}` : S`
      ${this._renderHiddenNotice()}
      <div
        class="timeline timeline-interactive"
        style="--playhead-pct:${this._pct(this.currentTime)}"
        role="slider"
        tabindex="0"
        aria-label="Replay timeline"
        aria-valuemin=${this.startTime}
        aria-valuemax=${this.endTime}
        aria-valuenow=${this.currentTime}
        aria-valuetext=${this._formatTimestamp(this.currentTime)}
        @click=${(e) => this._handleTimelineClick(e)}
        @pointerdown=${(e) => this._handlePointerDown(e)}
        @pointermove=${(e) => this._handlePointerMove(e)}
        @pointerup=${(e) => this._handlePointerUp(e)}
        @pointerleave=${(e) => this._handlePointerUp(e)}
        @keydown=${this._handleKeyDown}
      >
        <div class="track"></div>
        <div class="playhead" style="left:${this._pct(this.currentTime)}%">
          <span class="playhead-time">${this._formatTimestamp(this.currentTime)}</span>
        </div>
        ${an([this.events, this.startTime, this.endTime], () => this._groupEventsByTimestamp().map((e) => S`
          <div
            class="marker-cluster"
            style="left:${this._getMarkerLeftClamped(e.timestamp, 7)};--marker-pct:${this._pct(e.timestamp)};"
            title=${this._formatClusterTitle(e.events)}
            @click=${(n) => {
      n.stopPropagation(), this._seek(e.timestamp);
    }}
          >
            ${e.events.map((n, r) => {
      const i = r === 0 ? "-2px" : r === 1 ? "2px" : r === 2 ? "-4px" : "4px";
      return S`
                <button
                  class="marker"
                  style=${this._markerStyle(n, i)}
                  title=${this._formatEventTitle(n)}
                  @click=${(o) => {
        o.stopPropagation(), this._seek(n.timestamp);
      }}
                ></button>
              `;
    })}
          </div>
        `))}
      </div>
    `;
  }
};
V.MAX_MARKERS_PER_LANE = 150;
V.styles = vt`
    :host { display: block; }
    .timeline { position: relative; height: 24px; margin: 8px 0; cursor: pointer; }
    .timeline-expanded {
      position: relative;
      display: grid;
      grid-template-columns: minmax(90px, 140px) 1fr;
      column-gap: 8px;
      row-gap: 6px;
      margin: 8px 0;
      cursor: pointer;
      align-items: center;
    }
    .timeline-track-overlay {
      grid-column: 2;
      grid-row: 1 / -1;
      position: relative;
      align-self: stretch;
      pointer-events: none;
      z-index: 0;
    }
    .timeline-interactive { touch-action: none; }
    .lane {
      position: relative;
      z-index: 1;
      grid-column: 2;
      width: 100%;
      min-width: 0;
    }
    /*
     * The lane label is the switch for its lane, so it has to look like one
     * before it is hovered: a button box, a pointer cursor, and a dot standing
     * in for the lane's markers that fills when the lane is on and hollows out
     * when it is off. Discoverability is the whole point — a bare text label
     * that happens to be clickable is not discoverable.
     */
    .lane-label {
      grid-column: 1;
      display: flex;
      align-items: center;
      gap: 6px;
      font: inherit;
      font-size: 11px;
      text-align: left;
      color: var(--secondary-text-color, #666);
      background: none;
      border: 1px solid transparent;
      border-radius: 4px;
      padding: 1px 4px;
      margin: 0;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      min-width: 0;
    }
    .lane-name {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .lane-dot {
      flex: none;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      border: 1px solid currentColor;
      background: currentColor;
    }
    .lane-label:hover,
    .lane-label:focus-visible {
      color: var(--primary-text-color);
      border-color: var(--divider-color, #ccc);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    }
    /* Switched off: the row stays, so there is something to click to get it
       back, but it reads as absent rather than empty. */
    .lane-label.lane-off {
      opacity: 0.55;
      text-decoration: line-through;
    }
    .lane-label.lane-off .lane-dot {
      background: transparent;
    }
    .lane-track.lane-off {
      opacity: 0.35;
    }
    .lanes-hidden {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
      font-size: 11px;
      color: var(--secondary-text-color, #666);
    }
    .lanes-hidden-show {
      font: inherit;
      cursor: pointer;
      padding: 1px 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
    }
    .lane-track {
      position: relative;
      height: 14px;
      border-radius: 999px;
      background: var(--divider-color, #ddd);
    }
    .track { position: absolute; inset: 0; border-radius: 999px; background: var(--divider-color, #ddd); }
    .playhead { position: absolute; top: -2px; width: 2px; height: calc(100% + 4px); background: ${Wt(P)}; }
    .playhead-expanded { top: 0; bottom: 0; height: auto; transform: translateX(-50%); }
    /*
     * The clock rides the playhead rather than sitting in the header: while a
     * replay runs this is the only part of the card the eye is on, and a time
     * three inches away from it does not read as "where we are now".
     */
    .playhead-time {
      position: absolute;
      bottom: calc(100% + 4px);
      left: 50%;
      transform: translateX(-50%);
      padding: 1px 5px;
      border-radius: 4px;
      font-size: 11px;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      pointer-events: none;
      background: ${Wt(P)};
      color: var(--fp-skin-accent-ink, var(--text-primary-color, #fff));
    }
    .marker-cluster {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 14px;
      height: 20px;
      cursor: pointer;
      pointer-events: auto;
    }
    .marker {
      position: absolute;
      left: 50%;
      top: calc(50% + var(--stack-offset, 0px));
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: none;
      background: var(--divider-color, #bbb);
      padding: 0;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
    }
    /*
     * "Passed" — a marker the playhead has already crossed — used to be a class
     * written per marker, which meant every one of them re-rendered on every
     * frame of playback: 8,000 nodes rebuilt 20 times a second. Both numbers
     * are now plain custom properties, so the whole effect is one variable
     * written on the container and the markers themselves never change.
     *
     * clamp() is doing the comparison: the difference is scaled far past 1, so
     * it saturates to exactly 1 when the playhead is ahead of the marker and 0
     * when it is behind — a step function built out of arithmetic, because CSS
     * has no way to ask whether one length is greater than another.
     */
    .marker,
    .marker-cluster {
      --passed: clamp(0, (var(--playhead-pct, 0) - var(--marker-pct, 0) + 0.000001) * 1000000, 1);
    }
    .marker {
      transform: translate(-50%, -50%) scale(calc(1 + 0.2 * var(--passed)));
    }
    .timeline-empty { font-size: 12px; color: var(--secondary-text-color, #666); }
  `;
lt([
  C({ attribute: !1 })
], V.prototype, "events", 2);
lt([
  C({ type: Number })
], V.prototype, "startTime", 2);
lt([
  C({ type: Number })
], V.prototype, "endTime", 2);
lt([
  C({ type: Number })
], V.prototype, "currentTime", 2);
lt([
  C({ type: Boolean })
], V.prototype, "expanded", 2);
lt([
  Nt()
], V.prototype, "_hidden", 2);
V = lt([
  Pt("easy-floorplan-history-timeline")
], V);
const ln = -6, rs = 6, di = 0.45, ye = 1, ss = "scale", os = "dim", cn = 0.92, dn = 80, hn = 260, as = 0.25, ls = 4, cs = 10, ds = 1, hi = 14, hs = 3, ps = 140, us = "var(--fp-skin-glow, #ffd9a0)", pn = 0.18, me = 0.6, un = 0.5, fn = 0.45, fs = 0.5, ys = 14, pi = 34, yn = 34, ms = 16, ui = 80, fi = 0, yi = 360, gs = "var(--fp-skin-furniture, #9e9e9e)", mn = 1e3, gn = 600;
function bs() {
  return { overlayScale: "plan" };
}
function $s(t) {
  return {
    ...t,
    walls: t.walls ?? [],
    openings: t.openings ?? [],
    items: t.items ?? [],
    texts: t.texts ?? [],
    furniture: t.furniture ?? [],
    trackers: t.trackers ?? [],
    areas: t.areas ?? []
  };
}
function vs(t) {
  const e = /* @__PURE__ */ new Set();
  return t.map((n, r) => {
    let i = n.id || `floor_${r + 1}`;
    for (; e.has(i); ) i = `${i}_${r + 1}`;
    return e.add(i), i === n.id ? n : { ...n, id: i };
  });
}
function bt(t) {
  return t.floors && t.floors.length ? vs(t.floors.map($s)) : [
    {
      id: "floor_main",
      name: "Floor 1",
      walls: t.walls ?? [],
      openings: t.openings ?? [],
      items: t.items ?? [],
      texts: t.texts ?? [],
      furniture: t.furniture ?? [],
      trackers: t.trackers ?? [],
      areas: t.areas ?? []
    }
  ];
}
function bn(t, e) {
  if (!e) return null;
  const n = t?.[e.entity]?.state;
  if (n == null || n === "unavailable" || n === "unknown") return !1;
  const r = n === "on" || n === "open" || n === "home" || n === "detected";
  return e.invert ? !r : r;
}
function $n(t, e) {
  if (!t || e == null || !Number.isFinite(e)) return null;
  const n = t.max - t.min;
  if (n === 0) return null;
  const r = (e - t.min) / n, i = Math.max(0, Math.min(1, r));
  return t.invert ? 1 - i : i;
}
const ws = "airHandler", xs = "air handler", _s = "utility", ks = [
  "hvac",
  "ahu",
  "furnace",
  "ventilation"
], Ss = {
  w: 60,
  h: 56
}, Es = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 7.142857
  },
  {
    line: [
      8,
      8,
      92,
      92
    ],
    role: "detail",
    opacity: 0.8
  },
  {
    line: [
      8,
      92,
      92,
      8
    ],
    role: "detail",
    opacity: 0.8
  }
], As = {
  id: ws,
  name: xs,
  category: _s,
  keywords: ks,
  size: Ss,
  parts: Es
}, Ts = "bathtub", Ms = "bathtub", Cs = "bath", Is = [
  "bath",
  "tub"
], Rs = {
  w: 150,
  h: 76
}, Os = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 5.263158
  },
  {
    rect: [
      6,
      12,
      88,
      76
    ],
    rx: 12,
    role: "line"
  },
  {
    circle: [
      14,
      50,
      5.5
    ],
    role: "thin"
  }
], Ls = {
  id: Ts,
  name: Ms,
  category: Cs,
  keywords: Is,
  size: Rs,
  parts: Os
}, zs = "bed", Ns = "bed", Ps = "bedroom", Hs = [
  "double",
  "mattress",
  "sleep"
], Ds = {
  w: 150,
  h: 200
}, Fs = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 2.666667
  },
  {
    line: [
      0,
      26,
      100,
      26
    ],
    role: "line"
  },
  {
    rect: [
      10,
      6,
      34,
      14
    ],
    rx: 2,
    role: "thin"
  },
  {
    rect: [
      56,
      6,
      34,
      14
    ],
    rx: 2,
    role: "thin"
  }
], Us = {
  id: zs,
  name: Ns,
  category: Ps,
  keywords: Hs,
  size: Ds,
  parts: Fs
}, js = "chair", Bs = "chair", Ws = "living", qs = [
  "seat"
], Vs = {
  w: 44,
  h: 44
}, Ks = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 9.090909
  },
  {
    line: [
      0,
      22,
      100,
      22
    ],
    role: "line"
  }
], Gs = {
  id: js,
  name: Bs,
  category: Ws,
  keywords: qs,
  size: Vs,
  parts: Ks
}, Xs = "cornerShowerCurved", Zs = "curved corner shower", Ys = "bath", Js = [
  "shower",
  "corner",
  "cubicle",
  "stall",
  "dusche"
], Qs = {
  w: 100,
  h: 100
}, to = [
  {
    path: [
      [
        "M",
        100,
        0
      ],
      [
        "L",
        100,
        100
      ],
      [
        "L",
        94,
        100
      ],
      [
        "C",
        47,
        105,
        -5,
        53,
        0,
        6
      ],
      [
        "L",
        0,
        0
      ],
      [
        "Z"
      ]
    ],
    role: "body"
  }
], eo = {
  id: Xs,
  name: Zs,
  category: Ys,
  keywords: Js,
  size: Qs,
  parts: to
}, no = "desk", io = "desk", ro = "living", so = [
  "office",
  "workstation"
], oo = {
  w: 120,
  h: 60
}, ao = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 6.666667
  },
  {
    line: [
      0,
      55,
      100,
      55
    ],
    role: "detail"
  }
], lo = {
  id: no,
  name: io,
  category: ro,
  keywords: so,
  size: oo,
  parts: ao
}, co = "dishwasher", ho = "dishwasher", po = "kitchen", uo = [
  "dishes"
], fo = {
  w: 60,
  h: 60
}, yo = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 6.666667
  },
  {
    rect: [
      10,
      24,
      80,
      62
    ],
    rx: 5,
    role: "detail",
    opacity: 0.8
  },
  {
    line: [
      6,
      88,
      94,
      88
    ],
    role: "line"
  }
], mo = {
  id: co,
  name: ho,
  category: po,
  keywords: uo,
  size: fo,
  parts: yo
}, go = "dryer", bo = "dryer", $o = "utility", vo = [
  "tumble dryer",
  "laundry"
], wo = {
  w: 60,
  h: 62
}, xo = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 6.666667
  },
  {
    line: [
      6,
      18,
      94,
      18
    ],
    role: "detail"
  },
  {
    circle: [
      50,
      56,
      30
    ],
    role: "line"
  },
  {
    circle: [
      50,
      56,
      13.5
    ],
    role: "detail"
  }
], _o = {
  id: go,
  name: bo,
  category: $o,
  keywords: vo,
  size: wo,
  parts: xo
}, ko = "fishTank", So = "fish tank", Eo = "living", Ao = [
  "aquarium",
  "fish",
  "water"
], To = {
  w: 100,
  h: 40
}, Mo = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 10
  },
  {
    rect: [
      5,
      12,
      90,
      76
    ],
    role: "hint"
  },
  {
    ellipse: [
      32,
      40,
      7,
      9
    ],
    role: "thin"
  },
  {
    path: [
      [
        "M",
        39,
        40
      ],
      [
        "L",
        44,
        32
      ],
      [
        "L",
        44,
        48
      ],
      [
        "Z"
      ]
    ],
    role: "solid"
  },
  {
    ellipse: [
      68,
      60,
      7,
      9
    ],
    role: "thin"
  },
  {
    path: [
      [
        "M",
        61,
        60
      ],
      [
        "L",
        56,
        52
      ],
      [
        "L",
        56,
        68
      ],
      [
        "Z"
      ]
    ],
    role: "solid"
  },
  {
    circle: [
      82,
      32,
      4
    ],
    role: "hint"
  }
], Co = {
  id: ko,
  name: So,
  category: Eo,
  keywords: Ao,
  size: To,
  parts: Mo
}, Io = "fridge", Ro = "fridge", Oo = "kitchen", Lo = [
  "refrigerator",
  "freezer"
], zo = {
  w: 60,
  h: 64
}, No = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 6.666667
  },
  {
    line: [
      0,
      40,
      100,
      40
    ],
    role: "line"
  },
  {
    line: [
      84,
      12,
      84,
      30
    ],
    role: "line"
  },
  {
    line: [
      84,
      50,
      84,
      84
    ],
    role: "line"
  }
], Po = {
  id: Io,
  name: Ro,
  category: Oo,
  keywords: Lo,
  size: zo,
  parts: No
}, Ho = "hotTub", Do = "hot tub", Fo = "bath", Uo = [
  "jacuzzi",
  "spa",
  "whirlpool"
], jo = {
  w: 120,
  h: 120
}, Bo = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 3.333333
  },
  {
    circle: [
      50,
      50,
      36
    ],
    role: "line"
  },
  {
    circle: [
      27.68,
      27.68,
      5
    ],
    role: "hint",
    space: "square"
  },
  {
    circle: [
      72.32,
      27.68,
      5
    ],
    role: "hint",
    space: "square"
  },
  {
    circle: [
      27.68,
      72.32,
      5
    ],
    role: "hint",
    space: "square"
  },
  {
    circle: [
      72.32,
      72.32,
      5
    ],
    role: "hint",
    space: "square"
  }
], Wo = {
  id: Ho,
  name: Do,
  category: Fo,
  keywords: Uo,
  size: jo,
  parts: Bo
}, qo = "piano", Vo = "piano", Ko = "living", Go = [
  "upright",
  "keyboard",
  "music"
], Xo = {
  w: 140,
  h: 60
}, Zo = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 6.666667
  },
  {
    line: [
      4,
      70,
      96,
      70
    ],
    role: "thin"
  },
  {
    repeat: 7,
    step: [
      12.5,
      0
    ],
    part: {
      line: [
        12.5,
        70,
        12.5,
        94
      ],
      role: "hint"
    }
  },
  {
    line: [
      4,
      22,
      96,
      22
    ],
    role: "hint",
    opacity: 0.5
  }
], Yo = {
  id: qo,
  name: Vo,
  category: Ko,
  keywords: Go,
  size: Xo,
  parts: Zo
}, Jo = "plant", Qo = "plant", ta = "living", ea = [
  "pot",
  "tree",
  "greenery"
], na = {
  w: 44,
  h: 44
}, ia = "ellipse", ra = [
  {
    ellipse: [
      50,
      50,
      50,
      50
    ],
    role: "body"
  },
  {
    circle: [
      50,
      38,
      18
    ],
    role: "thin"
  },
  {
    circle: [
      34,
      58,
      18
    ],
    role: "thin"
  },
  {
    circle: [
      66,
      58,
      18
    ],
    role: "thin"
  }
], sa = {
  id: Jo,
  name: Qo,
  category: ta,
  keywords: ea,
  size: na,
  footprint: ia,
  parts: ra
}, oa = "quarterTub", aa = "corner hot tub", la = "bath", ca = [
  "hottub",
  "jacuzzi",
  "corner",
  "quarter",
  "spa",
  "whirlpool"
], da = {
  w: 140,
  h: 140
}, ha = [
  {
    path: [
      [
        "M",
        100,
        0
      ],
      [
        "L",
        100,
        100
      ],
      [
        "C",
        50,
        100,
        0,
        50,
        0,
        0
      ],
      [
        "Z"
      ]
    ],
    role: "body"
  },
  {
    path: [
      [
        "M",
        85,
        5
      ],
      [
        "C",
        90,
        5,
        95,
        10,
        95,
        15
      ],
      [
        "L",
        95,
        95
      ],
      [
        "C",
        55,
        95,
        5,
        45,
        5,
        5
      ],
      [
        "Z"
      ]
    ],
    role: "line"
  },
  {
    path: [
      [
        "M",
        20,
        5
      ],
      [
        "C",
        75,
        10,
        90,
        25,
        95,
        80
      ]
    ],
    role: "detail"
  }
], pa = {
  id: oa,
  name: aa,
  category: la,
  keywords: ca,
  size: da,
  parts: ha
}, ua = "roundTable", fa = "round table", ya = "living", ma = [
  "dining",
  "circular"
], ga = {
  w: 100,
  h: 100
}, ba = "ellipse", $a = [
  {
    ellipse: [
      50,
      50,
      50,
      50
    ],
    role: "body"
  }
], va = {
  id: ua,
  name: fa,
  category: ya,
  keywords: ma,
  size: ga,
  footprint: ba,
  parts: $a
}, wa = "rug", xa = "rug", _a = "living", ka = [
  "carpet",
  "mat"
], Sa = {
  w: 180,
  h: 120
}, Ea = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 12,
    role: "body",
    fillOpacity: 0.08,
    dash: [
      8,
      5
    ]
  },
  {
    rect: [
      10,
      10,
      80,
      80
    ],
    rx: 8,
    role: "detail",
    opacity: 0.6
  }
], Aa = {
  id: wa,
  name: xa,
  category: _a,
  keywords: ka,
  size: Sa,
  parts: Ea
}, Ta = "sectional", Ma = "sectional (L)", Ca = "living", Ia = [
  "couch",
  "sofa",
  "corner",
  "chaise"
], Ra = {
  w: 230,
  h: 180
}, Oa = [
  {
    polygon: [
      [
        0,
        0
      ],
      [
        100,
        0
      ],
      [
        100,
        100
      ],
      [
        58,
        100
      ],
      [
        58,
        55
      ],
      [
        0,
        55
      ]
    ],
    role: "body"
  },
  {
    line: [
      0,
      16,
      100,
      16
    ],
    role: "line"
  },
  {
    line: [
      9,
      16,
      9,
      55
    ],
    role: "line"
  },
  {
    line: [
      58,
      16,
      58,
      100
    ],
    role: "line"
  }
], La = {
  id: Ta,
  name: Ma,
  category: Ca,
  keywords: Ia,
  size: Ra,
  parts: Oa
}, za = "sink", Na = "sink", Pa = "kitchen", Ha = [
  "basin",
  "tap",
  "faucet"
], Da = {
  w: 64,
  h: 48
}, Fa = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 8.333333
  },
  {
    rect: [
      12,
      18,
      76,
      50
    ],
    rx: 8.333333,
    role: "line"
  },
  {
    circle: [
      50,
      10,
      5
    ],
    role: "line"
  }
], Ua = {
  id: za,
  name: Na,
  category: Pa,
  keywords: Ha,
  size: Da,
  parts: Fa
}, ja = "sofa", Ba = "sofa", Wa = "living", qa = [
  "couch",
  "settee",
  "seat"
], Va = {
  w: 170,
  h: 72
}, Ka = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 5.555556
  },
  {
    line: [
      0,
      30,
      100,
      30
    ],
    role: "line"
  },
  {
    line: [
      12,
      30,
      12,
      100
    ],
    role: "line"
  },
  {
    line: [
      88,
      30,
      88,
      100
    ],
    role: "line"
  }
], Ga = {
  id: ja,
  name: Ba,
  category: Wa,
  keywords: qa,
  size: Va,
  parts: Ka
}, Xa = "stairs", Za = "stairs", Ya = "utility", Ja = [
  "steps",
  "staircase"
], Qa = {
  w: 90,
  h: 170
}, tl = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 4.444444
  },
  {
    repeat: 6,
    step: [
      0,
      14.285714
    ],
    part: {
      line: [
        0,
        14.285714,
        100,
        14.285714
      ],
      role: "thin"
    }
  },
  {
    line: [
      50,
      96.470588,
      50,
      3.529412
    ],
    role: "thin"
  },
  {
    path: [
      [
        "M",
        38,
        16
      ],
      [
        "L",
        50,
        2.352941
      ],
      [
        "L",
        62,
        16
      ]
    ],
    role: "thin"
  }
], el = {
  id: Xa,
  name: Za,
  category: Ya,
  keywords: Ja,
  size: Qa,
  parts: tl
}, nl = "stove", il = "stove", rl = "kitchen", sl = [
  "cooker",
  "hob",
  "oven",
  "range"
], ol = {
  w: 64,
  h: 64
}, al = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 6.25
  },
  {
    circle: [
      28,
      28,
      16
    ],
    role: "line"
  },
  {
    circle: [
      72,
      28,
      16
    ],
    role: "line"
  },
  {
    circle: [
      28,
      72,
      16
    ],
    role: "line"
  },
  {
    circle: [
      72,
      72,
      16
    ],
    role: "line"
  }
], ll = {
  id: nl,
  name: il,
  category: rl,
  keywords: sl,
  size: ol,
  parts: al
}, cl = "table", dl = "table", hl = "living", pl = [
  "dining"
], ul = {
  w: 120,
  h: 80
}, fl = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 5
  }
], yl = {
  id: cl,
  name: dl,
  category: hl,
  keywords: pl,
  size: ul,
  parts: fl
}, ml = "toilet", gl = "toilet", bl = "bath", $l = [
  "wc",
  "loo",
  "lavatory"
], vl = {
  w: 48,
  h: 68
}, wl = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 8.333333
  },
  {
    rect: [
      10,
      0,
      80,
      22
    ],
    rx: 6.25,
    role: "line"
  },
  {
    ellipse: [
      50,
      68,
      34,
      30
    ],
    role: "line"
  }
], xl = {
  id: ml,
  name: gl,
  category: bl,
  keywords: $l,
  size: vl,
  parts: wl
}, _l = "tv", kl = "tv", Sl = "living", El = [
  "television",
  "screen",
  "media"
], Al = {
  w: 110,
  h: 18
}, Tl = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 22.222222
  },
  {
    line: [
      32,
      100,
      68,
      200
    ],
    role: "line"
  }
], Ml = {
  id: _l,
  name: kl,
  category: Sl,
  keywords: El,
  size: Al,
  parts: Tl
}, Cl = "vanity", Il = "vanity", Rl = "bath", Ol = [
  "washbasin",
  "sink",
  "bathroom"
], Ll = {
  w: 110,
  h: 55
}, zl = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 7.272727
  },
  {
    ellipse: [
      50,
      56,
      20,
      26
    ],
    role: "line"
  },
  {
    circle: [
      50,
      14,
      5
    ],
    role: "thin"
  }
], Nl = {
  id: Cl,
  name: Il,
  category: Rl,
  keywords: Ol,
  size: Ll,
  parts: zl
}, Pl = "wardrobe", Hl = "wardrobe", Dl = "bedroom", Fl = [
  "closet",
  "armoire",
  "cupboard"
], Ul = {
  w: 120,
  h: 55
}, jl = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 7.272727
  },
  {
    line: [
      50,
      0,
      50,
      100
    ],
    role: "line"
  },
  {
    line: [
      44,
      40,
      44,
      60
    ],
    role: "line"
  },
  {
    line: [
      56,
      40,
      56,
      60
    ],
    role: "line"
  }
], Bl = {
  id: Pl,
  name: Hl,
  category: Dl,
  keywords: Fl,
  size: Ul,
  parts: jl
}, Wl = "washer", ql = "washer", Vl = "utility", Kl = [
  "washing machine",
  "laundry"
], Gl = {
  w: 60,
  h: 62
}, Xl = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 6.666667
  },
  {
    line: [
      6,
      18,
      94,
      18
    ],
    role: "detail"
  },
  {
    circle: [
      50,
      56,
      30
    ],
    role: "line"
  },
  {
    circle: [
      16,
      9,
      4.5
    ],
    role: "thin"
  }
], Zl = {
  id: Wl,
  name: ql,
  category: Vl,
  keywords: Kl,
  size: Gl,
  parts: Xl
}, Yl = "waterHeater", Jl = "water heater", Ql = "utility", tc = [
  "boiler",
  "cylinder",
  "tank"
], ec = {
  w: 52,
  h: 52
}, nc = "ellipse", ic = [
  {
    ellipse: [
      50,
      50,
      50,
      50
    ],
    role: "body"
  },
  {
    circle: [
      50,
      50,
      17
    ],
    role: "thin"
  }
], rc = {
  id: Yl,
  name: Jl,
  category: Ql,
  keywords: tc,
  size: ec,
  footprint: nc,
  parts: ic
}, sc = [
  "living",
  "bedroom",
  "kitchen",
  "bath",
  "utility",
  "other"
], ne = (t) => Object.assign(/* @__PURE__ */ Object.create(null), t), Ce = (t, e) => typeof e == "string" && Object.prototype.hasOwnProperty.call(t, e) ? t[e] : void 0, vn = ne({
  body: { width: 2, opacity: 1, fillOpacity: 0.12 },
  line: { width: 2, opacity: 1, fillOpacity: 0 },
  thin: { width: 1.5, opacity: 1, fillOpacity: 0 },
  detail: { width: 1.5, opacity: 0.7, fillOpacity: 0 },
  hint: { width: 1, opacity: 0.6, fillOpacity: 0 },
  solid: { width: 0, opacity: 0.7, fillOpacity: 1 }
}), oc = [0, 0, 100, 100], ac = 64, mi = 256, lc = 256, cc = 0.25, wn = 8, X = (t) => typeof t == "number" && Number.isFinite(t) ? t : null, yt = (t, e, n) => Math.min(n, Math.max(e, t));
function Q(t, e) {
  if (!Array.isArray(t) || t.length !== e) return null;
  const n = [];
  for (const r of t) {
    const i = X(r);
    if (i === null) return null;
    n.push(i);
  }
  return n;
}
function dc(t) {
  if (!Array.isArray(t) || t.length < 2 || t.length > mi) return null;
  const e = [];
  for (const n of t) {
    const r = Q(n, 2);
    if (!r) return null;
    e.push([r[0], r[1]]);
  }
  return e;
}
const hc = ne({ M: 2, L: 2, Q: 4, C: 6, Z: 0 });
function pc(t) {
  if (!Array.isArray(t) || !t.length || t.length > lc) return null;
  const e = [];
  for (const n of t) {
    if (!Array.isArray(n) || typeof n[0] != "string") return null;
    const r = n[0].toUpperCase(), i = Ce(hc, r);
    if (i === void 0) return null;
    const o = Q(n.slice(1), i);
    if (!o) return null;
    e.push([r, ...o]);
  }
  return e[0]?.[0] !== "M" ? null : e;
}
function ht(t, e) {
  const n = Ce(vn, t.role) ? t.role : e, r = vn[n], i = X(t.width), o = X(t.opacity), s = X(t.fillOpacity), a = Array.isArray(t.dash) ? t.dash.map(X) : null, l = a && a.length && a.length <= 8 && a.every((c) => c !== null) ? a.map((c) => yt(c, 0, 100)) : void 0;
  return {
    role: n,
    width: i === null ? r.width : n === "solid" ? yt(i, 0, wn) : yt(i, cc, wn),
    opacity: o === null ? r.opacity : yt(o, 0, 1),
    fillOpacity: s === null ? r.fillOpacity : yt(s, 0, 1),
    dash: l
  };
}
function xn(t) {
  if (!t || typeof t != "object" || Array.isArray(t)) return null;
  const e = t, n = e.space === "square" ? "square" : "box";
  if ("line" in e) {
    const r = Q(e.line, 4);
    return r ? { kind: "line", a: [r[0], r[1]], b: [r[2], r[3]], space: n, style: ht(e, "line") } : null;
  }
  if ("rect" in e) {
    const r = Q(e.rect, 4);
    return !r || r[2] < 0 || r[3] < 0 ? null : {
      kind: "rect",
      x: r[0],
      y: r[1],
      w: r[2],
      h: r[3],
      rx: Math.max(0, X(e.rx) ?? 0),
      space: n,
      style: ht(e, "body")
    };
  }
  if ("circle" in e) {
    const r = Q(e.circle, 3);
    return !r || r[2] < 0 ? null : { kind: "circle", cx: r[0], cy: r[1], r: r[2], space: n, style: ht(e, "line") };
  }
  if ("ellipse" in e) {
    const r = Q(e.ellipse, 4);
    return !r || r[2] < 0 || r[3] < 0 ? null : {
      kind: "ellipse",
      cx: r[0],
      cy: r[1],
      rx: r[2],
      ry: r[3],
      space: n,
      style: ht(e, "line")
    };
  }
  if ("polygon" in e || "polyline" in e) {
    const r = "polygon" in e, i = dc(r ? e.polygon : e.polyline);
    return i ? { kind: "poly", closed: r, pts: i, space: n, style: ht(e, r ? "body" : "line") } : null;
  }
  if ("path" in e) {
    const r = pc(e.path);
    return r ? { kind: "path", cmds: r, space: n, style: ht(e, "line") } : null;
  }
  return null;
}
function uc(t, e, n) {
  switch (t.kind) {
    case "line":
      return { ...t, a: [t.a[0] + e, t.a[1] + n], b: [t.b[0] + e, t.b[1] + n] };
    case "rect":
      return { ...t, x: t.x + e, y: t.y + n };
    case "circle":
      return { ...t, cx: t.cx + e, cy: t.cy + n };
    case "ellipse":
      return { ...t, cx: t.cx + e, cy: t.cy + n };
    case "poly":
      return { ...t, pts: t.pts.map(([r, i]) => [r + e, i + n]) };
    case "path":
      return {
        ...t,
        cmds: t.cmds.map((r) => {
          if (r[0] === "Z") return r;
          const i = r.slice(1).map((o, s) => o + (s % 2 === 0 ? e : n));
          return [r[0], ...i];
        })
      };
  }
}
function fc(t) {
  if (t && typeof t == "object" && "repeat" in t) {
    const n = t, r = X(n.repeat), i = Q(n.step, 2), o = xn(n.part);
    if (r === null || !i || !o) return [];
    const s = yt(Math.round(r), 1, ac);
    return Array.from({ length: s }, (a, l) => uc(o, i[0] * l, i[1] * l));
  }
  const e = xn(t);
  return e ? [e] : [];
}
function Ie(t, e, n) {
  const r = (d) => null;
  if (!t || typeof t != "object" || Array.isArray(t))
    return r();
  const i = t, o = typeof i.id == "string" && i.id.trim() ? i.id.trim() : e, s = j(o);
  if (!s || s !== o || !Array.isArray(i.parts)) return r();
  const a = [];
  for (const d of i.parts)
    for (const f of fc(d)) {
      if (a.length >= mi) break;
      a.push(f);
    }
  if (!a.length)
    return r();
  const l = i.size && typeof i.size == "object" ? i.size : {}, c = X(l.w), u = X(l.h), p = Q(i.viewBox, 4);
  return {
    id: s,
    name: typeof i.name == "string" && i.name.trim() ? i.name.trim().slice(0, 60) : s,
    category: typeof i.category == "string" && sc.includes(i.category) ? i.category : "other",
    keywords: Array.isArray(i.keywords) ? i.keywords.filter((d) => typeof d == "string").slice(0, 12) : [],
    size: { w: c && c > 0 ? c : 60, h: u && u > 0 ? u : 60 },
    viewBox: p && p[2] > 0 && p[3] > 0 ? p : oc,
    footprint: i.footprint === "ellipse" ? "ellipse" : "rect",
    parts: a
  };
}
const yc = Ie({
  id: "unknown",
  name: "unknown",
  size: { w: 60, h: 60 },
  parts: [{ rect: [0, 0, 100, 100], rx: 6.666667 }]
}), Lt = (() => {
  const t = /* @__PURE__ */ Object.assign({ "../ef-furniture/airHandler.json": As, "../ef-furniture/bathtub.json": Ls, "../ef-furniture/bed.json": Us, "../ef-furniture/chair.json": Gs, "../ef-furniture/cornerShowerCurved.json": eo, "../ef-furniture/desk.json": lo, "../ef-furniture/dishwasher.json": mo, "../ef-furniture/dryer.json": _o, "../ef-furniture/fishTank.json": Co, "../ef-furniture/fridge.json": Po, "../ef-furniture/hotTub.json": Wo, "../ef-furniture/piano.json": Yo, "../ef-furniture/plant.json": sa, "../ef-furniture/quarterTub.json": pa, "../ef-furniture/roundTable.json": va, "../ef-furniture/rug.json": Aa, "../ef-furniture/sectional.json": La, "../ef-furniture/sink.json": Ua, "../ef-furniture/sofa.json": Ga, "../ef-furniture/stairs.json": el, "../ef-furniture/stove.json": ll, "../ef-furniture/table.json": yl, "../ef-furniture/toilet.json": xl, "../ef-furniture/tv.json": Ml, "../ef-furniture/vanity.json": Nl, "../ef-furniture/wardrobe.json": Bl, "../ef-furniture/washer.json": Zl, "../ef-furniture/waterHeater.json": rc }), e = ne({});
  for (const [n, r] of Object.entries(t)) {
    const i = Ie(r, n.split("/").pop()?.replace(/\.json$/, ""));
    i && (e[i.id] = i);
  }
  return e;
})();
function gi(t, e) {
  return Ce(t, e);
}
let _n, kn = Lt;
function Sn(t) {
  if (!t || typeof t != "object") return Lt;
  if (t === _n) return kn;
  const e = ne({});
  Object.assign(e, Lt);
  for (const [n, r] of Object.entries(t)) {
    const i = Ie(r, n);
    i && (e[i.id] = i);
  }
  return _n = t, kn = e, e;
}
function En(t, e, n, r) {
  const [i, o, s, a] = t.viewBox, l = r === "square" ? Math.min(e, n) : e, c = r === "square" ? Math.min(e, n) : n, u = l / s, p = c / a;
  return {
    x: (d) => (d - i) * u - l / 2,
    y: (d) => (d - o) * p - c / 2,
    len: (d) => d * Math.min(u, p),
    sx: (d) => d * u,
    sy: (d) => d * p
  };
}
const O = (t) => Number.isFinite(t) ? t : 0;
function mc(t, e) {
  const n = t.fillOpacity > 0 ? e : "none", r = t.role === "solid" ? "none" : e;
  return { fill: n, stroke: r, style: t };
}
function gc(t, e, n) {
  const { fill: r, stroke: i, style: o } = mc(t.style, n), s = o.opacity < 1 ? o.opacity : y, a = o.dash?.length ? o.dash.join(" ") : y, l = o.fillOpacity > 0 && o.fillOpacity < 1 ? o.fillOpacity : y, c = o.role === "solid" ? y : o.width;
  switch (t.kind) {
    case "line":
      return $`<line x1=${O(e.x(t.a[0]))} y1=${O(e.y(t.a[1]))}
                       x2=${O(e.x(t.b[0]))} y2=${O(e.y(t.b[1]))}
                       fill="none" stroke=${i} stroke-width=${c}
                       stroke-dasharray=${a} opacity=${s} />`;
    case "rect":
      return $`<rect x=${O(e.x(t.x))} y=${O(e.y(t.y))}
                       width=${O(e.sx(t.w))} height=${O(e.sy(t.h))}
                       rx=${t.rx > 0 ? O(e.len(t.rx)) : y}
                       fill=${r} fill-opacity=${l}
                       stroke=${i} stroke-width=${c}
                       stroke-dasharray=${a} opacity=${s} />`;
    case "circle":
      return $`<circle cx=${O(e.x(t.cx))} cy=${O(e.y(t.cy))} r=${O(e.len(t.r))}
                         fill=${r} fill-opacity=${l}
                         stroke=${i} stroke-width=${c} opacity=${s} />`;
    case "ellipse":
      return $`<ellipse cx=${O(e.x(t.cx))} cy=${O(e.y(t.cy))}
                          rx=${O(e.sx(t.rx))} ry=${O(e.sy(t.ry))}
                          fill=${r} fill-opacity=${l}
                          stroke=${i} stroke-width=${c} opacity=${s} />`;
    case "poly": {
      const u = t.pts.map(([p, d]) => `${O(e.x(p))},${O(e.y(d))}`).join(" ");
      return t.closed ? $`<polygon points=${u}
                       fill=${r} fill-opacity=${l}
                       stroke=${i} stroke-width=${c}
                       stroke-linejoin="round" opacity=${s} />` : $`<polyline points=${u} fill="none"
                        stroke=${i} stroke-width=${c}
                        stroke-linejoin="round" opacity=${s} />`;
    }
    case "path": {
      const u = t.cmds.map(
        (p) => p[0] === "Z" ? "Z" : `${p[0]} ${p.slice(1).map((d, f) => f % 2 === 0 ? O(e.x(d)) : O(e.y(d))).join(" ")}`
      ).join(" ");
      return $`<path d=${u}
                       fill=${r} fill-opacity=${l}
                       stroke=${i} stroke-width=${c}
                       stroke-linejoin="round" opacity=${s} />`;
    }
  }
}
function bc(t, e, n, r) {
  const i = En(t, e, n, "box"), o = En(t, e, n, "square");
  return t.parts.map((s) => gc(s, s.space === "square" ? o : i, r));
}
const $c = /* @__PURE__ */ new Set(["light", "switch", "fan", "input_boolean"]);
function vc(t) {
  const e = t?.split(".")[0] ?? "";
  return $c.has(e) ? { action: "toggle" } : { action: "more-info" };
}
function Y(t) {
  return t !== void 0 && t.action !== "none";
}
function bi(t, e) {
  return e === "tap" ? t.tap_action ?? vc(t.entity) : e === "hold" ? t.hold_action : t.double_tap_action;
}
function wc(t, e) {
  if (!e || e.action === "none") return !1;
  switch (e.action) {
    case "toggle":
      return !!t.entity;
    case "more-info":
      return !!(e.entity ?? t.entity);
    case "navigate":
      return !!e.navigation_path;
    case "url":
      return !!e.url_path;
    case "perform-action":
    case "call-service":
      return $i(e) !== null;
    case "fire-dom-event":
      return !0;
    default:
      return !1;
  }
}
function xc(t) {
  return ["tap", "hold", "double_tap"].some(
    (e) => wc(t, bi(t, e))
  );
}
function $i(t) {
  const e = t.perform_action ?? t.service;
  if (!e || !e.includes(".")) return null;
  const [n, r] = e.split(".", 2);
  return { domain: n, service: r, data: t.data ?? t.service_data, target: t.target };
}
function St(t, e, n, r) {
  if (!(!r || r.action === "none")) {
    if (r.confirmation) {
      const i = typeof r.confirmation == "object" && r.confirmation.text || `Are you sure you want to ${r.action}?`;
      if (!globalThis.confirm?.(i)) return;
    }
    switch (r.action) {
      case "toggle":
        n.entity && e.callService("homeassistant", "toggle", { entity_id: n.entity });
        break;
      case "more-info": {
        const i = r.entity ?? n.entity;
        i && t.dispatchEvent(
          new CustomEvent("hass-more-info", { detail: { entityId: i }, bubbles: !0, composed: !0 })
        );
        break;
      }
      case "navigate":
        if (r.navigation_path) {
          history.pushState(null, "", r.navigation_path);
          const i = new Event("location-changed");
          i.detail = { replace: !1 }, window.dispatchEvent(i);
        }
        break;
      case "url":
        r.url_path && window.open(r.url_path);
        break;
      case "perform-action":
      case "call-service": {
        const i = $i(r);
        i && e.callService(i.domain, i.service, i.data, i.target);
        break;
      }
      case "fire-dom-event":
        t.dispatchEvent(new CustomEvent("ll-custom", { detail: r, bubbles: !0, composed: !0 }));
        break;
    }
  }
}
const _c = 0.75, Xt = 8, kc = 400;
function de(t, e) {
  return typeof t == "number" && Number.isFinite(t) && t > 0 ? t : e;
}
function Sc(t) {
  let e = 0;
  for (let n = 0, r = t.length - 1; n < t.length; r = n++)
    e += t[r].x * t[n].y - t[n].x * t[r].y;
  return e / 2;
}
function Ec(t, e, n, r) {
  const i = r.x - n.x, o = r.y - n.y, s = i * i + o * o;
  if (s === 0) return Math.hypot(t - n.x, e - n.y);
  let a = ((t - n.x) * i + (e - n.y) * o) / s;
  return a = Math.max(0, Math.min(1, a)), Math.hypot(t - (n.x + a * i), e - (n.y + a * o));
}
function Ac(t, e) {
  const n = [];
  for (let r = 0; r < t.length; r++) {
    const i = t[r], o = i.b.x - i.a.x, s = i.b.y - i.a.y, a = Math.hypot(o, s);
    if (a <= e) continue;
    const l = [0, 1], c = e / a;
    for (let u = 0; u < t.length; u++) {
      if (u === r) continue;
      const p = t[u], d = p.b.x - p.a.x, f = p.b.y - p.a.y, b = o * f - s * d;
      if (Math.abs(b) > 1e-9) {
        const m = ((p.a.x - i.a.x) * f - (p.a.y - i.a.y) * d) / b, g = ((p.a.x - i.a.x) * s - (p.a.y - i.a.y) * o) / b, w = e / Math.max(Math.hypot(d, f), 1e-9);
        m > c && m < 1 - c && g >= -w && g <= 1 + w && l.push(m);
        continue;
      }
      for (const m of [p.a, p.b]) {
        const g = ((m.x - i.a.x) * o + (m.y - i.a.y) * s) / (a * a);
        if (g <= c || g >= 1 - c) continue;
        const w = i.a.x + g * o, E = i.a.y + g * s;
        Math.hypot(m.x - w, m.y - E) <= e && l.push(g);
      }
    }
    l.sort((u, p) => u - p);
    for (let u = 1; u < l.length; u++) {
      const p = l[u - 1], d = l[u];
      d - p <= c || n.push({
        a: { x: i.a.x + p * o, y: i.a.y + p * s },
        b: { x: i.a.x + d * o, y: i.a.y + d * s }
      });
    }
  }
  return n;
}
function Tc(t, e) {
  const n = [], r = /* @__PURE__ */ new Map(), i = (c) => Math.floor(c / e), o = (c) => {
    const u = i(c.x), p = i(c.y);
    for (let m = -1; m <= 1; m++)
      for (let g = -1; g <= 1; g++)
        for (const w of r.get(`${u + m}:${p + g}`) ?? [])
          if (Math.hypot(n[w].x - c.x, n[w].y - c.y) <= e) return w;
    const d = n.push({ x: c.x, y: c.y }) - 1, f = `${u}:${p}`, b = r.get(f);
    return b ? b.push(d) : r.set(f, [d]), d;
  }, s = /* @__PURE__ */ new Map(), a = (c) => {
    let u = s.get(c);
    return u || s.set(c, u = /* @__PURE__ */ new Set()), u;
  };
  for (const c of t) {
    const u = o(c.a), p = o(c.b);
    u !== p && (a(u).add(p), a(p).add(u));
  }
  const l = n.map(
    (c, u) => [...s.get(u) ?? []].sort(
      (p, d) => Math.atan2(n[p].y - c.y, n[p].x - c.x) - Math.atan2(n[d].y - c.y, n[d].x - c.x)
    )
  );
  return { points: n, neighbors: l };
}
function Mc(t, e) {
  const { points: n, neighbors: r } = Tc(t, e), i = /* @__PURE__ */ new Set(), o = [];
  for (let s = 0; s < n.length; s++)
    for (const a of r[s]) {
      if (i.has(`${s}>${a}`)) continue;
      const l = [];
      let c = s, u = a, p = !1;
      for (let d = 0; d <= n.length * n.length + 4; d++) {
        i.add(`${c}>${u}`), l.push(c);
        const f = r[u], b = f.indexOf(c), m = f[(b - 1 + f.length) % f.length];
        if (c = u, u = m, c === s && u === a) {
          p = !0;
          break;
        }
      }
      p && l.length >= 3 && o.push(l.map((d) => ({ x: n[d].x, y: n[d].y })));
    }
  return o;
}
function Cc(t, e, n) {
  for (let r = 0, i = t.length - 1; r < t.length; i = r++)
    for (const o of e)
      if (Ec(o.x, o.y, t[i], t[r]) <= n) return !0;
  return !1;
}
function Ic(t, e, n = {}) {
  const r = de(n.weldEps, _c), i = de(n.openingEps, Xt), o = de(n.minArea, kc);
  if (t.length < 3) return [];
  const s = Ac(
    t.map((l) => ({ a: { x: l.x1, y: l.y1 }, b: { x: l.x2, y: l.y2 } })),
    r
  );
  return Mc(s, r).map((l) => ({ ring: l, area: Sc(l) })).filter((l) => l.area >= o && !Cc(l.ring, e, i)).sort((l, c) => c.area - l.area).map((l) => l.ring);
}
const An = /* @__PURE__ */ new WeakMap();
function Rc(t, e) {
  const n = An.get(t);
  if (n && n.openings === e) return n.out;
  const r = Ic(t, e);
  return An.set(t, { openings: e, out: r }), r;
}
const D = 8, Oc = 0.05, Mt = "—";
function zt(t, e) {
  if (!e || !t) return Mt;
  const n = t.states[e];
  return n ? t.formatEntityState(n) : Mt;
}
function Lc(t, e, n) {
  if (t.formatEntityState !== e.formatEntityState || t.formatEntityAttributeValue !== e.formatEntityAttributeValue) return !0;
  for (const r of n)
    if (t.states[r] !== e.states[r]) return !0;
  return !1;
}
function vi(t) {
  const e = /* @__PURE__ */ new Set();
  (t.sunDimming || t.sunlight && !re(t)) && e.add("sun.sun");
  for (const n of bt(t)) {
    for (const r of n.openings) {
      r.entity && e.add(r.entity), r.shutterEntity && e.add(r.shutterEntity), r.secondaryEntity && e.add(r.secondaryEntity);
      for (const i of r.extraEntities ?? []) i && e.add(i);
      r.shutterSecondaryEntity && e.add(r.shutterSecondaryEntity);
    }
    for (const r of n.items) {
      r.entity && e.add(r.entity), r.hideEntity && e.add(r.hideEntity), r.hideStateEntity && e.add(r.hideStateEntity), r.hideBadgeEntity && e.add(r.hideBadgeEntity);
      for (const i of ie(r)) i.entity && e.add(i.entity);
    }
    for (const r of n.texts)
      r.entity && e.add(r.entity);
    for (const r of n.furniture)
      r.entity && e.add(r.entity);
    for (const r of n.areas)
      r.entity && e.add(r.entity);
    for (const r of n.trackers)
      for (const i of [r.xSensor, r.ySensor])
        i?.entity && e.add(i.entity), i?.presence?.entity && e.add(i.presence.entity);
  }
  return e;
}
function Re(t, e, n) {
  if (!e || !t) return Mt;
  const r = t.states[e];
  if (!r) return Mt;
  const i = t.formatEntityAttributeValue;
  if (typeof i == "function") return i(r, n);
  const o = r.attributes?.[n];
  return o == null || o === "" ? Mt : String(o);
}
function zc(t, e, n) {
  const r = n.entity || (n.attribute ? e.entity : void 0);
  return r ? n.attribute ? Re(t, r, n.attribute) : zt(t, r) : "";
}
function ie(t) {
  return [...t.secondaryEntity || t.secondaryAttribute ? [{ entity: t.secondaryEntity, attribute: t.secondaryAttribute }] : [], ...t.readings ?? []];
}
function Nc(t, e) {
  return e.attribute ? Re(t, e.entity, e.attribute) : zt(t, e.entity);
}
function Pc(t, e) {
  if (!e.entity) return e.text ?? "";
  const n = e.attribute ? Re(t, e.entity, e.attribute) : zt(t, e.entity);
  return e.text ? `${e.text} ${n}` : n;
}
function Oe(t, e) {
  return wi(t, e)?.color;
}
function wi(t, e) {
  if (!t?.length) return;
  const n = typeof e == "number" ? e : Number(e), r = typeof e != "boolean" && e !== "" && e != null && Number.isFinite(n), i = e == null ? "" : String(e).trim().toLowerCase();
  let o, s, a;
  for (const l of t)
    !l || typeof l != "object" || typeof l.color != "string" || (typeof l.state == "string" && l.state !== "" ? o === void 0 && i !== "" && l.state.trim().toLowerCase() === i && (o = l) : typeof l.above == "number" ? r && n > l.above && (!s || l.above > (s.above ?? -1 / 0)) && (s = l) : a === void 0 && (a = l));
  return o ?? s ?? a;
}
function Hc(t, e) {
  if (!t.entity) return;
  const n = Oe(t.stateColor, e);
  if (n) return z(n);
  if (t.activeColor && et(t.entity, e)) return z(t.activeColor);
}
function Tn(t, e) {
  if (!t.entity) return;
  const n = Oe(t.stateColor, e);
  if (n) return z(n);
  if (t.activeColor && et(t.entity, e)) return z(t.activeColor);
}
function xi(t, e) {
  if (!e || e.state !== "on") return;
  const n = e.attributes ?? {}, r = n.brightness, i = typeof r == "number" && Number.isFinite(r) ? Math.max(0, Math.min(255, r)) : void 0, o = i === void 0 ? me : pn + (me - pn) * (i / 255), s = L(t.glowRadius, ps) * (i === void 0 ? 1 : un + (1 - un) * (i / 255)), a = n.rgb_color;
  if (Array.isArray(a) && a.length >= 3) {
    const [l, c, u] = a;
    if ([l, c, u].every((p) => typeof p == "number" && Number.isFinite(p))) {
      const p = (f) => Math.max(0, Math.min(255, Math.round(f))), d = z(`rgb(${p(l)}, ${p(c)}, ${p(u)})`);
      if (d) return { color: d, opacity: o, radius: s };
    }
  }
  return { color: q(t.glowColor, us), opacity: o, radius: s };
}
function Dc(t) {
  if (!t || t.state !== "on") return;
  const e = t.attributes ?? {}, n = e.rgb_color;
  if (!Array.isArray(n) || n.length < 3) return;
  const [r, i, o] = n;
  if (![r, i, o].every((u) => typeof u == "number" && Number.isFinite(u))) return;
  const s = e.brightness, a = typeof s == "number" && Number.isFinite(s) ? Math.max(0, Math.min(255, s)) : void 0, l = a === void 0 ? 1 : fn + (1 - fn) * (a / 255), c = (u) => Math.max(0, Math.min(255, Math.round(u * l)));
  return z(`rgb(${c(r)}, ${c(i)}, ${c(o)})`);
}
function Le(t, e, n) {
  const r = n.x2 - n.x1, i = n.y2 - n.y1, o = r * r + i * i, s = o === 0 ? 0 : Math.max(0, Math.min(1, ((t - n.x1) * r + (e - n.y1) * i) / o)), a = n.x1 + s * r, l = n.y1 + s * i;
  return Math.hypot(t - a, e - l);
}
function ze(t, e, n, r, i) {
  const o = i.x2 - i.x1, s = i.y2 - i.y1, a = n * s - r * o;
  if (Math.abs(a) < 1e-12) return;
  const l = i.x1 - t, c = i.y1 - e, u = (l * s - c * o) / a, p = (l * r - c * n) / a;
  if (!(u <= 1e-9 || p < 0 || p > 1))
    return u;
}
function Fc(t, e, n, r, i) {
  const o = t.x2 - t.x1, s = t.y2 - t.y1, a = [-o, o, -s, s], l = [t.x1 - e, r - t.x1, t.y1 - n, i - t.y1];
  let c = 0, u = 1;
  for (let p = 0; p < 4; p++) {
    if (a[p] === 0) {
      if (l[p] < 0) return;
      continue;
    }
    const d = l[p] / a[p];
    if (a[p] < 0) {
      if (d > u) return;
      d > c && (c = d);
    } else {
      if (d < c) return;
      d < u && (u = d);
    }
  }
  return {
    ...t,
    x1: t.x1 + c * o,
    y1: t.y1 + c * s,
    x2: t.x1 + u * o,
    y2: t.y1 + u * s
  };
}
function _i(t, e, n, r) {
  if (F(t) === "fixed") return 0;
  const i = Math.max(0, Math.min(1, e)), o = Math.max(0, Math.min(1, n ?? e));
  if (F(t) === "swing") {
    const s = Ht(t);
    if (s > 2) {
      let a = i + o;
      for (let l = 2; l < s; l++) a += Math.max(0, Math.min(1, r?.[l - 2] ?? e));
      return a / s;
    }
    return s === 2 ? (i + o) / 2 : i * Pe(t);
  }
  if (F(t) === "awning") return i;
  switch (He(t)) {
    case "biparting":
      return (i + o) / 2;
    case "biparting-bypass":
    case "converging":
      return (i + o) / 4;
    default:
      return i;
  }
}
function Uc(t, e, n, r, i) {
  return r !== void 0 && r <= 0 ? [0, 0] : Pi(t) && F(t) !== "roll" ? [0, 1] : jc(t, e, n, i);
}
function jc(t, e, n, r) {
  const i = _i(t, e, n, r), o = [(1 - i) / 2, (1 + i) / 2];
  if (Pe(t) < 1) {
    const c = [0, i];
    return t.flipH ? [1 - c[1], 1 - c[0]] : c;
  }
  if (F(t) !== "swing" || Ht(t) !== 2) return o;
  const s = Math.max(0, Math.min(1, e)), a = Math.max(0, Math.min(1, n ?? e)), l = [0.5 - s / 2, 0.5 + a / 2];
  return t.flipH ? [1 - l[1], 1 - l[0]] : l;
}
function ki(t, e, n) {
  const r = [];
  for (const o of e) {
    const s = n(o), a = (c) => Math.max(0, Math.min(1, c)), l = typeof s == "number" ? [(1 - a(s)) / 2, (1 + a(s)) / 2] : [a(Math.min(s[0], s[1])), a(Math.max(s[0], s[1]))];
    l[1] > l[0] && r.push({ o, span: l });
  }
  if (!r.length) return t;
  const i = [];
  for (const o of t) {
    const s = o.x2 - o.x1, a = o.y2 - o.y1, l = s * s + a * a;
    if (l === 0) {
      i.push(o);
      continue;
    }
    const c = Math.sqrt(l), u = [];
    for (const { o: g, span: w } of r) {
      if (Le(g.x, g.y, o) > Xt) continue;
      const E = ((g.x - o.x1) * s + (g.y - o.y1) * a) / l, h = Math.cos(g.angle * Math.PI / 180) * s + Math.sin(g.angle * Math.PI / 180) * a >= 0 ? 1 : -1, v = (H) => h * (H - 0.5) * g.length / c, _ = E + v(w[0]), A = E + v(w[1]), k = Math.max(0, Math.min(_, A)), I = Math.min(1, Math.max(_, A));
      I > k && u.push([k, I]);
    }
    if (!u.length) {
      i.push(o);
      continue;
    }
    u.sort((g, w) => g[0] - w[0]);
    const p = [u[0]];
    for (const g of u.slice(1)) {
      const w = p[p.length - 1];
      g[0] <= w[1] ? w[1] = Math.max(w[1], g[1]) : p.push(g);
    }
    const d = (g) => ({ x: o.x1 + s * g, y: o.y1 + a * g });
    let f = 0, b = 0;
    const m = (g, w) => {
      if ((w - g) * c < D / 2) return;
      const E = d(g), h = d(w);
      i.push({ id: `${o.id}#${b++}`, x1: E.x, y1: E.y, x2: h.x, y2: h.y });
    };
    for (const [g, w] of p)
      m(f, g), f = w;
    m(f, 1);
  }
  return i;
}
function Si(t, e, n, r) {
  const i = r.filter((p) => {
    const d = Le(t, e, p);
    return d < n && d > D;
  });
  if (!i.length) return;
  const o = n * 1.01, s = [
    { id: "b1", x1: t - o, y1: e - o, x2: t + o, y2: e - o },
    { id: "b2", x1: t + o, y1: e - o, x2: t + o, y2: e + o },
    { id: "b3", x1: t + o, y1: e + o, x2: t - o, y2: e + o },
    { id: "b4", x1: t - o, y1: e + o, x2: t - o, y2: e - o }
  ], a = i.map((p) => Fc(p, t - o, e - o, t + o, e + o)).filter((p) => p !== void 0);
  if (!a.length) return;
  const l = [...a, ...s], c = [];
  for (const p of l)
    for (const [d, f] of [
      [p.x1, p.y1],
      [p.x2, p.y2]
    ]) {
      const b = Math.atan2(f - e, d - t);
      for (const m of [b - 1e-4, b, b + 1e-4]) {
        const g = Math.cos(m), w = Math.sin(m);
        let E = 1 / 0;
        for (const h of l) {
          const v = ze(t, e, g, w, h);
          v !== void 0 && v < E && (E = v);
        }
        E < 1 / 0 && c.push({ x: t + g * E, y: e + w * E, a: m });
      }
    }
  c.sort((p, d) => p.a - d.a);
  const u = (p) => Math.round(p * 100) / 100;
  return c.map(({ x: p, y: d }) => ({ x: u(p), y: u(d) }));
}
function Bc(t, e, n, r) {
  const i = e.radius, o = r?.length ? Si(t.x, t.y, i, r) : void 0, s = `${n}-clip`;
  return $`
    ${o ? $`<clipPath id=${s}>
                <polygon points=${o.map((a) => `${a.x},${a.y}`).join(" ")} />
              </clipPath>` : y}
    <radialGradient id=${n} gradientUnits="userSpaceOnUse"
                    cx=${t.x} cy=${t.y} r=${i}>
      <stop offset="0" stop-color=${e.color} stop-opacity=${e.opacity} />
      <stop offset="1" stop-color=${e.color} stop-opacity="0" />
    </radialGradient>
    <circle class="fp-glow" cx=${t.x} cy=${t.y} r=${i}
            fill=${`url(#${n})`}
            clip-path=${o ? `url(#${s})` : y} />`;
}
function Wc(t, e, n, r, i, o) {
  const s = t.map((l) => {
    if (!l.glow) return;
    const c = xi(l, e?.[l.entity]);
    if (c)
      return {
        // Normalized against the glow's own ceiling, so a full-brightness lamp
        // clears the dim entirely and a dim one clears proportionally.
        strength: Math.max(0, Math.min(1, c.opacity / me)),
        // Straight off the paint, so the clearing tracks the pool as it shrinks
        // with brightness (issue #123) instead of staying at the configured size.
        radius: c.radius
      };
  });
  if (!s.some((l) => l !== void 0)) return y;
  const a = D;
  return $`
    <defs>
      <mask id=${i} maskUnits="userSpaceOnUse"
            x=${-a} y=${-a} width=${n + a * 2} height=${r + a * 2}>
        <rect x=${-a} y=${-a} width=${n + a * 2} height=${r + a * 2}
              fill="white" />
        ${t.map((l, c) => {
    const u = s[c];
    if (u === void 0) return y;
    const { strength: p, radius: d } = u, f = `${i}-${c}`, b = o?.length ? Si(l.x, l.y, d, o) : void 0, m = `${f}-clip`;
    return $`
            ${b ? $`<clipPath id=${m}>
                        <polygon points=${b.map((g) => `${g.x},${g.y}`).join(" ")} />
                      </clipPath>` : y}
            <radialGradient id=${f} gradientUnits="userSpaceOnUse"
                            cx=${l.x} cy=${l.y} r=${d}>
              <stop offset="0" stop-color="#000" stop-opacity=${p} />
              <stop offset="1" stop-color="#000" stop-opacity="0" />
            </radialGradient>
            <circle cx=${l.x} cy=${l.y} r=${d} fill=${`url(#${f})`}
                    clip-path=${b ? `url(#${m})` : y} />`;
  })}
      </mask>
    </defs>`;
}
function qc(t, e, n, r, i = Lt) {
  const o = D;
  return $`
    <defs>
      <mask id=${r} maskUnits="userSpaceOnUse"
            x=${-o} y=${-o} width=${e + o * 2} height=${n + o * 2}>
        <rect x=${-o} y=${-o} width=${e + o * 2} height=${n + o * 2}
              fill="white" />
        ${t.map((s) => {
    const a = s.angle ? `rotate(${s.angle} ${s.x} ${s.y})` : void 0, l = gi(i, s.type)?.footprint === "ellipse", c = 1 - fs;
    return l ? $`<ellipse cx=${s.x} cy=${s.y} rx=${s.w / 2} ry=${s.h / 2}
                           fill="#000" fill-opacity=${c} transform=${a ?? y} />` : $`<rect x=${s.x - s.w / 2} y=${s.y - s.h / 2} width=${s.w} height=${s.h}
                        fill="#000" fill-opacity=${c} transform=${a ?? y} />`;
  })}
      </mask>
    </defs>`;
}
function Vc(t, e, n) {
  return t.enableHideByEntity ? (t.hideEntity || t.entity, Ne(
    e,
    t.hideMode,
    t.hideState,
    t.hideOperator,
    t.hideThreshold,
    t.hideInvert
  )) : t.hideWhenInactive ? t.entity ? !et(t.entity, e) : !0 : !1;
}
function Kc(t, e) {
  return t.showOnlyWhenZoomed ? e ? t.area ? t.area !== e.id && t.area !== e.name : !gh(e.points ?? [], t.x, t.y) : !0 : !1;
}
function Gc(t, e, n) {
  if (!t.enableHideBadgeByEntity) return !1;
  let r = e;
  if (n) {
    const i = t.hideBadgeEntity || t.entity;
    i && n.states[i] && (r = t.hideBadgeAttribute && n.states[i].attributes ? String(n.states[i].attributes[t.hideBadgeAttribute]) : n.states[i].state);
  }
  return Ne(
    r,
    t.hideBadgeMode,
    t.hideBadgeMatch,
    // Ensure this property is correctly mapped in your types, or use hideBadgeState
    t.hideBadgeOperator,
    t.hideBadgeThreshold,
    t.hideBadgeInvert
  );
}
const Xc = 12;
function Zc(t, e) {
  const n = [];
  if (e.showName) {
    const i = e.entity ? t?.states[e.entity]?.attributes?.friendly_name : void 0, o = e.name || i || e.entity;
    o && n.push(o);
  }
  let r = !1;
  if (e.enableHideStateByEntity && t) {
    const i = e.hideStateEntity || e.entity;
    let o;
    i && t.states[i] && (o = e.hideStateAttribute && t.states[i].attributes ? t.states[i].attributes[e.hideStateAttribute] : t.states[i].state), r = Ne(
      o,
      e.hideStateMode,
      e.hideStateMatch,
      e.hideStateOperator,
      e.hideStateThreshold,
      e.hideStateInvert
    );
  }
  if (e.entity && (e.showState ?? e.kind === "sensor") && !r && n.push(Nc(t, e)), !r)
    for (const i of ie(e)) {
      if (i.showState === !1) continue;
      const o = zc(t, e, i);
      o && n.push(o);
    }
  return n.join(" · ");
}
const Mn = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
function Ne(t, e = "state", n, r = "==", i, o = !1) {
  if (t == null || t === "") return !1;
  let s = !1;
  if (e === "threshold") {
    if (i == null) return !1;
    const a = Number(t);
    if (!Number.isFinite(a)) return !1;
    switch (r) {
      case "<":
        s = a < i;
        break;
      case "<=":
        s = a <= i;
        break;
      case "==":
        s = a === i;
        break;
      case "!=":
        s = a !== i;
        break;
      case ">=":
        s = a >= i;
        break;
      case ">":
        s = a > i;
        break;
      default:
        return !1;
    }
  } else {
    if (n == null || String(n).trim() === "") return !1;
    const a = String(t).trim().toLowerCase(), l = String(n).trim().toLowerCase();
    if (Mn.has(a) && !Mn.has(l))
      return !1;
    s = r === "!=" ? a !== l : a === l;
  }
  return o ? !s : s;
}
function Yc(t) {
  const e = t.labelPosition;
  return e === "left" || e === "right" ? e : "below";
}
function Jc(t) {
  return Math.min(40, Math.max(8, L(t, Xc)));
}
function Qc(t, e) {
  if (!t.disableLabelColor) return e;
  if (t.useCustomLabelColor)
    return z(t.labelCustomColor) ?? void 0;
}
function td(t) {
  return Math.min(40, Math.max(8, L(t, hi)));
}
function ed(t) {
  return Math.min(Br, Math.max(2, L(t, D)));
}
function nd(t) {
  return t === void 0 ? "" : `stroke-width:${ed(t)};`;
}
function id(t) {
  return t === "plan" ? "plan" : "fixed";
}
function U(t, e) {
  return e === "plan" ? `calc(${t} * var(--fp-u, 1px))` : `${t}px`;
}
function rd(t, e) {
  return e !== "plan" && t === void 0 ? "" : `font-size:${U(td(t), e)};`;
}
function Cn(t) {
  switch (t) {
    case "light":
      return "mdi:lightbulb";
    case "switch":
      return "mdi:toggle-switch";
    case "sensor":
      return "mdi:gauge";
    case "binary_sensor":
      return "mdi:radiobox-marked";
    case "climate":
      return "mdi:thermostat";
    case "cover":
      return "mdi:window-shutter";
    case "media_player":
      return "mdi:television";
    case "fan":
      return "mdi:fan";
    case "camera":
      return "mdi:cctv";
    case "lock":
      return "mdi:lock";
    case "humidifier":
      return "mdi:air-humidifier";
    case "vacuum":
      return "mdi:robot-vacuum";
    default:
      return "mdi:circle";
  }
}
const sd = {
  media_player: { on: "mdi:television-play", off: "mdi:television-off" },
  fan: { on: "mdi:fan", off: "mdi:fan-off" },
  lock: { on: "mdi:lock-open-variant", off: "mdi:lock" },
  camera: { on: "mdi:cctv", off: "mdi:cctv-off" },
  humidifier: { on: "mdi:air-humidifier", off: "mdi:air-humidifier-off" },
  vacuum: { on: "mdi:robot-vacuum", off: "mdi:robot-vacuum-variant" }
}, od = {
  paused: "mdi:television-pause",
  idle: "mdi:television"
}, ad = {
  off: "mdi:power",
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan"
}, ld = {
  "clear-night": "mdi:weather-night",
  cloudy: "mdi:weather-cloudy",
  exceptional: "mdi:alert-circle-outline",
  fog: "mdi:weather-fog",
  hail: "mdi:weather-hail",
  lightning: "mdi:weather-lightning",
  "lightning-rainy": "mdi:weather-lightning-rainy",
  partlycloudy: "mdi:weather-partly-cloudy",
  pouring: "mdi:weather-pouring",
  rainy: "mdi:weather-rainy",
  snowy: "mdi:weather-snowy",
  "snowy-rainy": "mdi:weather-snowy-rainy",
  sunny: "mdi:weather-sunny",
  windy: "mdi:weather-windy",
  "windy-variant": "mdi:weather-windy-variant"
}, cd = {
  battery: { on: "mdi:battery-alert", off: "mdi:battery" },
  battery_charging: { on: "mdi:battery-charging", off: "mdi:battery" },
  carbon_monoxide: { on: "mdi:smoke-detector-alert", off: "mdi:smoke-detector" },
  cold: { on: "mdi:snowflake", off: "mdi:thermometer" },
  connectivity: { on: "mdi:check-network-outline", off: "mdi:close-network-outline" },
  door: { on: "mdi:door-open", off: "mdi:door-closed" },
  garage_door: { on: "mdi:garage-open", off: "mdi:garage" },
  gas: { on: "mdi:alert-circle", off: "mdi:check-circle" },
  heat: { on: "mdi:fire", off: "mdi:thermometer" },
  light: { on: "mdi:brightness-7", off: "mdi:brightness-5" },
  lock: { on: "mdi:lock-open", off: "mdi:lock" },
  moisture: { on: "mdi:water", off: "mdi:water-off" },
  motion: { on: "mdi:motion-sensor", off: "mdi:motion-sensor-off" },
  occupancy: { on: "mdi:home", off: "mdi:home-outline" },
  opening: { on: "mdi:square-outline", off: "mdi:square" },
  plug: { on: "mdi:power-plug", off: "mdi:power-plug-off" },
  power: { on: "mdi:power-plug", off: "mdi:power-plug-off" },
  presence: { on: "mdi:home", off: "mdi:home-outline" },
  problem: { on: "mdi:alert-circle", off: "mdi:check-circle" },
  running: { on: "mdi:play", off: "mdi:stop" },
  safety: { on: "mdi:alert-circle", off: "mdi:check-circle" },
  smoke: { on: "mdi:smoke-detector-variant-alert", off: "mdi:smoke-detector-variant" },
  sound: { on: "mdi:music-note", off: "mdi:music-note-off" },
  tamper: { on: "mdi:vibrate", off: "mdi:check-circle" },
  vibration: { on: "mdi:vibrate", off: "mdi:crop-portrait" },
  window: { on: "mdi:window-open", off: "mdi:window-closed" }
}, dd = {
  temperature: "mdi:thermometer",
  humidity: "mdi:water-percent",
  battery: "mdi:battery",
  power: "mdi:flash",
  energy: "mdi:lightning-bolt",
  illuminance: "mdi:brightness-5",
  pressure: "mdi:gauge",
  carbon_dioxide: "mdi:molecule-co2",
  pm25: "mdi:air-filter",
  signal_strength: "mdi:wifi",
  voltage: "mdi:sine-wave",
  current: "mdi:current-ac"
}, hd = {
  garage: { on: "mdi:garage-open", off: "mdi:garage" },
  garage_door: { on: "mdi:garage-open", off: "mdi:garage" },
  door: { on: "mdi:door-open", off: "mdi:door-closed" },
  gate: { on: "mdi:gate-open", off: "mdi:gate" },
  window: { on: "mdi:window-open", off: "mdi:window-closed" },
  blind: { on: "mdi:blinds-open", off: "mdi:blinds" },
  shade: { on: "mdi:roller-shade", off: "mdi:roller-shade-closed" },
  shutter: { on: "mdi:window-shutter-open", off: "mdi:window-shutter" },
  curtain: { on: "mdi:curtains", off: "mdi:curtains-closed" },
  awning: { on: "mdi:awning-outline", off: "mdi:awning-outline" }
};
function pd(t) {
  return t === "on" || t === "open" || t === "home" || t === "playing";
}
const ud = {
  lock: /* @__PURE__ */ new Set(["unlocked", "unlocking", "open", "opening"]),
  vacuum: /* @__PURE__ */ new Set(["cleaning", "returning"]),
  camera: /* @__PURE__ */ new Set(["recording", "streaming"]),
  // A climate entity's state *is* its HVAC mode (issue #206) — "cool",
  // "heat", "dry"… never the generic "on" the fallback test looks for, so
  // every mode but the literal "off" read as off forever: the active
  // highlight never lit, and a configured iconAnimation never played on a
  // unit that was very much running. Every mode HA's own climate.HVACMode
  // enum defines, off excluded.
  climate: /* @__PURE__ */ new Set(["auto", "cool", "dry", "fan_only", "heat", "heat_cool"]),
  // Same trap, one domain over: a paused or idle player is still switched
  // on, just not mid-playback, and "playing" alone left everything else
  // reading as off. "standby" is the one state that means the device itself
  // dropped to low power, so it stays out.
  media_player: /* @__PURE__ */ new Set(["on", "idle", "playing", "paused", "buffering"])
};
function et(t, e) {
  if (!e || e === "unavailable" || e === "unknown") return !1;
  const n = t?.split(".")[0] ?? "", r = ud[n];
  return r ? r.has(e) : pd(e);
}
const fd = {
  fan: "spin",
  media_player: "pulse",
  vacuum: "pulse"
};
function yd(t) {
  return fd[t?.split(".")[0] ?? ""];
}
const md = /* @__PURE__ */ new Set(["idle", "off"]);
function gd(t) {
  const e = t?.hvac_action;
  return typeof e != "string" ? !0 : !md.has(e);
}
function bd(t, e, n) {
  const r = t.iconAnimation ?? "auto";
  if (r !== "none" && et(t.entity, e)) {
    if (t.entity?.split(".")[0] === "climate") {
      if (!gd(n)) return;
      if (e === "fan_only") return "spin";
    }
    return r === "spin" || r === "pulse" ? r : yd(t.entity);
  }
}
function Ei(t, e, n, r) {
  const i = t.split(".")[0];
  if (i === "climate")
    return ad[r ?? ""] ?? (n ? "mdi:thermostat" : "mdi:power");
  if (i === "weather") return ld[r ?? ""] ?? "mdi:weather-cloudy";
  if (i === "media_player" && r) {
    const s = od[r];
    if (s) return s;
  }
  const o = sd[i];
  if (o) return n ? o.on : o.off;
  if (e) {
    if (i === "binary_sensor") {
      const s = cd[e];
      return s ? n ? s.on : s.off : void 0;
    }
    if (i === "sensor") return dd[e];
    if (i === "cover") {
      const s = hd[e];
      return s ? n ? s.on : s.off : void 0;
    }
  }
}
function Ai(t, e) {
  if (e)
    return t.attribute ? e.attributes?.[t.attribute] : e.state;
}
function $d(t, e, n) {
  const r = Tt(wi(t.stateColor, Ai(t, e))?.icon);
  if (r) return r;
  const i = Tt(t.icon);
  if (i) return i;
  if (!t.entity) return Cn(t.kind);
  if (n) return n;
  const o = e?.attributes?.icon;
  return o || (Ei(
    t.entity,
    e?.attributes?.device_class,
    et(t.entity, e?.state),
    e?.state
  ) ?? Cn(t.kind));
}
function vd(t) {
  const e = Math.round(t);
  let n = Math.round(e * 0.62);
  return n % 2 !== e % 2 && (n += 1), Math.max(2, n);
}
function In(t) {
  return t.badgeContent === "icon" || t.badgeContent === "value" || t.badgeContent === "none" ? t.badgeContent : t.showIcon === !1 ? "none" : "icon";
}
function he(t) {
  const e = t.pressEffect;
  return e === "scale" || e === "ripple" || e === "flash" || e === "none" ? e : ss;
}
function wd(t, e, n) {
  if (t.goToFloor !== "up" && t.goToFloor !== "down") return;
  const r = e.findIndex((o) => o.id === n);
  return r < 0 ? void 0 : e[r + (t.goToFloor === "up" ? 1 : -1)]?.id;
}
function xd(t) {
  const e = t.offlineStyle;
  return e === "dim" || e === "strike" || e === "none" ? e : os;
}
function Rn(t, e) {
  return t.entity ? e === void 0 || xt(e) : !1;
}
const _d = {
  climate: { attribute: "current_temperature", unit: "°" },
  water_heater: { attribute: "current_temperature", unit: "°" },
  humidifier: { attribute: "current_humidity", unit: "%" }
};
function Et(t) {
  if (t == null || typeof t == "boolean" || typeof t == "string" && t.trim() === "") return;
  const e = typeof t == "number" ? t : Number(t);
  return Number.isFinite(e) ? e : void 0;
}
function kd(t) {
  if (typeof t != "string") return "";
  const e = t.trim();
  return e === "°C" || e === "°F" || e === "K" ? "°" : e === "ppm" || e === "ppb" ? "" : e.length <= 3 ? e : "";
}
function Ut(t) {
  return Math.abs(t) < 10 && !Number.isInteger(t) ? t.toFixed(1) : String(Math.round(t));
}
function Sd(t, e) {
  return e === "W" && Math.abs(t) >= 1e3 ? { n: t / 1e3, unit: "kW" } : { n: t, unit: e };
}
function On(t, e) {
  const n = Sd(t, kd(e));
  return Ut(n.n) + n.unit;
}
function Ed(t, e) {
  return Td(t, e)?.text;
}
function Ad(t) {
  return t === "primary" ? "primary" : t === "secondary" ? 0 : typeof t == "number" && Number.isInteger(t) && t >= 0 ? t : void 0;
}
function Td(t, e) {
  if (!t || !e.entity) return;
  const n = ie(e), r = () => {
    const a = t.states[e.entity], l = a?.attributes, c = _d[e.entity.split(".")[0]];
    if (e.attribute) {
      const p = Et(l?.[e.attribute]);
      if (p !== void 0)
        return Ut(p) + (e.attribute === c?.attribute ? c.unit : "");
    }
    if (c) {
      const p = Et(l?.[c.attribute]);
      if (p !== void 0) return Ut(p) + c.unit;
    }
    const u = Et(a?.state);
    return u === void 0 ? void 0 : On(u, l?.unit_of_measurement);
  }, i = (a) => {
    const l = n[a];
    if (!l) return;
    const c = l.entity || (l.attribute ? e.entity : void 0);
    if (!c) return;
    const u = t.states[c], p = u?.attributes;
    if (l.attribute) {
      const f = Et(p?.[l.attribute]);
      return f === void 0 ? void 0 : Ut(f);
    }
    const d = Et(u?.state);
    return d === void 0 ? void 0 : On(d, p?.unit_of_measurement);
  }, o = Ad(e.badgeEntity);
  if (o === "primary") {
    const a = r();
    return a === void 0 ? void 0 : { text: a, source: "primary" };
  }
  if (typeof o == "number") {
    const a = i(o);
    return a === void 0 ? void 0 : { text: a, source: o };
  }
  const s = r();
  if (s !== void 0) return { text: s, source: "primary" };
  for (let a = 0; a < n.length; a++) {
    const l = i(a);
    if (l !== void 0) return { text: l, source: a };
  }
}
const Md = { ".": 0.28, "-": 0.38, "°": 0.45, "%": 1, k: 0.58 }, Cd = 0.7, Id = 0.85;
function Ln(t) {
  let e = 0;
  for (const n of t)
    e += Md[n] ?? (n >= "0" && n <= "9" ? Cd : Id);
  return e;
}
function Rd(t, e) {
  const n = Math.round(L(t, pi)), r = Math.max(0, n - 6), i = Ln(e) > 0 ? r / Ln(e) : n;
  let o = Math.round(Math.min(n * 0.46, i));
  return o % 2 !== n % 2 && (o -= 1), Math.max(6, o);
}
function F(t) {
  return t.motion ?? "swing";
}
function Pe(t) {
  if (F(t) !== "swing" || Ci(t) !== "single") return 1;
  const e = t.sashSpan;
  return typeof e != "number" || !Number.isFinite(e) ? 1 : Math.max(Oc, Math.min(1, e));
}
function Ti(t) {
  const e = t.type === "door" && F(t) === "swing";
  return t.invert ? !e : e;
}
function Od(t) {
  return { sx: t.flipH ? -1 : 1, sy: t.flipV ? -1 : 1 };
}
function He(t) {
  return F(t) === "slide" ? t.sliderStyle ?? "single" : "single";
}
function Ld(t) {
  return t === "biparting" || t === "biparting-bypass" || t === "converging";
}
function zd(t) {
  return F(t) === "swing" ? Ht(t) >= 2 : Ld(He(t));
}
function Ht(t) {
  if (F(t) !== "swing") return 1;
  switch (Ci(t)) {
    case "double":
      return 2;
    case "triple":
      return 3;
    case "quad":
      return 4;
    default:
      return 1;
  }
}
function Nd(t, e) {
  return e === 0 ? t : e === 1 ? Mi(t) : { ...t, entity: t.extraEntities?.[e - 2] };
}
function Mi(t) {
  return { ...t, entity: t.secondaryEntity };
}
function zn(t) {
  return t === "window" ? "double" : "single";
}
function Ci(t) {
  return F(t) === "swing" ? t.sash ?? zn(t.type) : zn(t.type);
}
function Nn(t) {
  return t.shutterStyle === "roll" || t.shutterStyle === "swing" ? t.shutterStyle : t.shutterEntity?.split(".")[0] === "binary_sensor" ? "swing" : "roll";
}
function mt(t, e = !1) {
  if (!t || xt(t.state)) return 0;
  const n = t.attributes?.current_position;
  if (typeof n == "number" && Number.isFinite(n)) {
    const i = Math.max(0, Math.min(1, n / 100));
    return e ? 1 - i : i;
  }
  const r = t.state === "open" || t.state === "opening" || t.state === "closing" || t.state === "on";
  return (e ? !r : r) ? 1 : 0;
}
function pe(t, e = !1) {
  return !t || xt(t.state) ? !1 : mt(t, e) > 0 || t.state === "opening" || t.state === "closing";
}
const Pd = 3;
function Hd(t, e) {
  return t.split(".")[0] === "cover" && e & Pd ? "cover-toggle" : "more-info";
}
function Ii(t, e, n) {
  const r = t.entity || void 0, i = t.shutterEntity || void 0, o = !!(r && i && t.tapTarget === "shutter"), s = o ? i : r ?? i, a = r && i ? o ? r : i : void 0, l = e === "tap" ? t.tap_action : e === "hold" ? t.hold_action : t.double_tap_action;
  if (l) return { entity: l.entity ?? s, config: l };
  if (e === "tap")
    return s ? {
      entity: s,
      config: {
        action: (
          // Pointing the tap at the shutter opens its dialog; it does not
          // drive the motor. Choosing *which* entity answers is not the same
          // as choosing to move hardware on a tap, and that second decision
          // stays where it is explicit — `tap_action: toggle` (issue #47).
          !o && Hd(s, n(s)) === "cover-toggle" ? "toggle" : "more-info"
        )
      }
    } : void 0;
  if (e === "hold" && a) return { entity: a, config: { action: "more-info" } };
}
function jt(t, e) {
  const n = e === "tap" ? t.tap_action : e === "hold" ? t.hold_action : t.double_tap_action;
  if (n)
    return { entity: n.entity ?? t.entity, config: n };
}
function Dd(t) {
  return ["tap", "hold", "double_tap"].some(
    (e) => Y(jt(t, e)?.config)
  );
}
function Fd(t, e) {
  return ["tap", "hold", "double_tap"].some(
    (n) => Y(Ii(t, n, e)?.config)
  );
}
function xt(t) {
  return t === "unavailable" || t === "unknown";
}
function Ud(t, e) {
  if (!t.entity || e === void 0) return Ti(t);
  if (jd(t.entity, e)) return !1;
  const n = Bd(t.entity, e);
  return t.invert ? !n : n;
}
function jd(t, e) {
  return xt(e) ? !0 : t.split(".")[0] === "lock" && e === "jammed";
}
function Bd(t, e) {
  return t.split(".")[0] === "lock" ? et(t, e) : e === "on" || e === "open" || e === "opening" || e === "closing";
}
function Wd(t) {
  return t === "opening" || t === "closing";
}
function Bt(t, e) {
  if (!t.entity || !e) return Ti(t) ? 1 : 0;
  if (xt(e.state)) return 0;
  const n = e.attributes?.current_position;
  if (typeof n == "number" && Number.isFinite(n)) {
    const r = Math.max(0, Math.min(1, n / 100));
    return t.invert ? 1 - r : r;
  }
  return Ud(t, e.state) ? 1 : 0;
}
function ue(t, e) {
  return !t.entity || !e || xt(e.state) ? !1 : Wd(e.state) || Bt(t, e) > 0;
}
function Pn(t, e, n) {
  const r = t / 2, i = 5, o = Math.max(3, Math.round(t / 12)), s = [];
  for (let a = 1; a < o; a++) {
    const l = -r + t * a / o;
    s.push(
      $`<line x1=${l} y1=${-i / 2} x2=${l} y2=${i / 2}
            stroke=${Te} stroke-width="0.75" />`
    );
  }
  return $`<g class="fp-roll-curtain" style="transform:scaleY(${1 - n});">
      <rect x=${-r} y=${-i / 2} width=${t} height=${i}
            style="fill:${e};" />
      ${s}
    </g>`;
}
function qd(t, e, n, r, i = 1, o = n, s = r) {
  const a = t / 2, l = 3, c = i * (e / 2 + l / 2), u = (p, d) => {
    const f = [], b = Math.max(2, Math.round(d / 14));
    for (let m = 1; m < b; m++) {
      const g = p + d * m / b;
      f.push(
        $`<line x1=${g} y1=${-l / 2} x2=${g} y2=${l / 2}
              stroke=${Te} stroke-width="0.75" />`
      );
    }
    return f;
  };
  return $`
      <g transform="translate(${-a} ${c})">
        <g class="fp-door-leaf" style="transform:rotate(${i * 90 * r}deg);">
          <rect x="0" y=${-l / 2} width=${a} height=${l} style="fill:${n};" />
          ${u(0, a)}
        </g>
      </g>
      <g transform="translate(${a} ${c})">
        <g class="fp-leaf-r" style="transform:rotate(${-i * 90 * s}deg);">
          <rect x=${-a} y=${-l / 2} width=${a} height=${l} style="fill:${o};" />
          ${u(-a, a)}
        </g>
      </g>`;
}
const Ri = 22, Hn = 14, Dn = 22, Fn = 15;
function Oi(t, e = 0) {
  const n = t.flipV ? -1 : 1, r = t.angle * Math.PI / 180, i = { x: -Math.sin(r) * n, y: Math.cos(r) * n };
  return e === 90 ? { x: -i.y, y: i.x } : e === 180 ? { x: -i.x, y: -i.y } : e === 270 ? { x: i.y, y: -i.x } : i;
}
function Li(t, e = Ri) {
  const n = (t.flipV ? -1 : 1) * e, r = t.angle * Math.PI / 180;
  return { x: t.x - Math.sin(r) * n, y: t.y + Math.cos(r) * n };
}
function Vd(t) {
  return !!(t.entity && t.shutterEntity) && (t.showShutterIcon ?? !0);
}
const Kd = { on: "mdi:window-shutter-open", off: "mdi:window-shutter" }, Un = {
  door: { on: "mdi:door-open", off: "mdi:door-closed" },
  window: { on: "mdi:window-open", off: "mdi:window-closed" }
};
function zi(t, e, n, r, i, o) {
  const s = Tt(e);
  if (s) return s;
  const a = Tt(o);
  if (a) return a;
  const l = Tt(n?.attributes?.icon);
  return l || (Ei(t, n?.attributes?.device_class, r) ?? (r ? i.on : i.off));
}
function Gd(t, e, n, r) {
  return zi(
    t.shutterEntity ?? "",
    t.shutterIcon,
    e,
    n,
    Kd,
    r
  );
}
function Xd(t) {
  return !!t.entity && (t.showIcon ?? !1);
}
function Zd(t, e, n, r) {
  return zi(
    t.entity ?? "",
    t.icon,
    e,
    n,
    Un[t.type] ?? Un.door,
    r
  );
}
function Yd(t) {
  return Li(t, -Ri);
}
function Jd(t, e = 0) {
  const n = Oi(t, e);
  return { x: -n.x, y: -n.y };
}
function Qd(t, e) {
  const { color: n, open: r = !0, active: i = !1, accent: o = P } = e, s = t.length / 2, a = D + 4, l = z(e.inactive) ?? n, c = Math.max(0, Math.min(1, e.amount ?? (r ? 1 : 0))), u = e.second ? Math.max(0, Math.min(1, e.second.amount)) : c, p = (h, v) => q(h ? o : v === 0 ? l : n, P), d = p(i, c), f = e.second ? p(!!e.second.active, u) : d, b = (e.more ?? []).map((h) => Math.max(0, Math.min(1, h.amount))), m = (e.more ?? []).map((h, v) => p(!!h.active, b[v]));
  let g;
  if (F(t) === "swing") {
    const h = Ht(t), v = Pe(t), _ = h > 1 ? t.length / h : t.length * v, A = Math.PI / 2 * _, k = Array.from({ length: h }, (T, M) => {
      const x = M === 0 ? c : M === 1 ? u : b[M - 2] ?? c, W = M === 0 ? d : M === 1 ? f : m[M - 2] ?? d;
      return { index: M, amt: x, tone: W, hingeRight: h > 1 && (t.leafHinges?.[M] ? t.leafHinges[M] === "right" : M === h - 1) };
    }), I = (T, M, x) => $`<path class="fp-door-arc" d=${T}
              fill="none" stroke-width="1.5" stroke-dasharray=${A}
              style="stroke:${M};stroke-dashoffset:${A * (1 - x)};" />`, H = t.type === "window" ? $`
        <line x1=${-s} y1=${-a / 2} x2=${-s} y2=${a / 2}
              stroke=${n} stroke-width="2" />
        <line x1=${s} y1=${-a / 2} x2=${s} y2=${a / 2}
              stroke=${n} stroke-width="2" />` : y;
    g = $`
        ${H}
        ${h > 1 ? (
      // Equal leaves side by side (floorplan-panel: 2..4). All hang on
      // their left edge but the last, which hangs on the right; for two
      // that is the classic pair meeting in the middle, each tracing
      // its own quarter circle outward.
      $`${k.map((T) => {
        const M = -s + T.index * _, x = M + _;
        return T.hingeRight ? I(`M ${M} 0 A ${_} ${_} 0 0 1 ${x} ${-_}`, T.tone, T.amt) : I(`M ${x} 0 A ${_} ${_} 0 0 0 ${M} ${-_}`, T.tone, T.amt);
      })}`
    ) : (
      // Hinged at the −x jamb, so the tip starts `leafW` along the wall
      // and ends `leafW` out from it. At full span that is exactly the
      // arc this drew before `sashSpan` existed.
      I(`M ${-s + _} 0 A ${_} ${_} 0 0 0 ${-s} ${-_}`, d, c)
    )}
        ${// The pane the sash does not cover: fixed glass, drawn in the base
    // colour because it never opens and so is never the active part.
    // Nothing at full span, which is every opening that predates this.
    v < 1 ? $`<line x1=${-s + _} y1="0" x2=${s} y2="0"
              stroke=${n} stroke-width=${t.type === "window" ? 1.5 : 2.5} />` : y}
        <!-- leaves hinged at their left edge, the last at its right (flipH mirrors them) -->
        ${k.map((T) => {
      const M = -s + T.index * _;
      return T.hingeRight ? $`<g transform="translate(${M + _} 0)">
          <g class="fp-leaf-r" style="transform:rotate(${90 * T.amt}deg);">
            <rect x=${-_} y="-1.25" width=${_} height="2.5" style="fill:${T.tone};" />
          </g>
        </g>` : $`<g transform="translate(${M} 0)">
          <g class="fp-door-leaf" style="transform:rotate(${-90 * T.amt}deg);">
            <rect x="0" y="-1.25" width=${_} height="2.5" style="fill:${T.tone};" />
          </g>
        </g>`;
    })}
      `;
  } else if (F(t) === "fixed") {
    const h = t.type === "window" ? 1.5 : 2.5;
    g = $`
        ${t.type === "window" ? $`
        <line x1=${-s} y1=${-a / 2} x2=${-s} y2=${a / 2}
              stroke=${n} stroke-width="2" />
        <line x1=${s} y1=${-a / 2} x2=${s} y2=${a / 2}
              stroke=${n} stroke-width="2" />` : y}
        <line x1=${-s} y1="0" x2=${s} y2="0"
              stroke=${n} stroke-width=${h} />`;
  } else if (F(t) === "awning") {
    const h = Math.min(12, t.length * 0.16), v = 5, _ = s - h / 2 - 1, A = Math.max(0, _ - h / 2), k = Math.min(s * 0.62, 34) * c, I = Math.min(k * 0.16, A * 0.4), H = c > 0.02;
    g = $`
        <!-- jambs, as any window -->
        <line x1=${-s} y1=${-a / 2} x2=${-s} y2=${a / 2}
              stroke=${n} stroke-width="2" />
        <line x1=${s} y1=${-a / 2} x2=${s} y2=${a / 2}
              stroke=${n} stroke-width="2" />
        <!-- The glass line: solid while the sash is shut and sitting in it,
             broken once the sash has swung out and left the gap behind. -->
        <line x1=${-s} y1="0" x2=${s} y2="0"
              stroke=${d} stroke-width="1.5"
              stroke-dasharray=${H ? "6 4" : y} />
        ${H ? (
      // A polyline, not a polygon, and that is the whole point of the
      // broken line above it. A closed shape strokes its own base back
      // along y=0 — straight over the dashes, solid — and the only
      // glass left uncovered would be the sliver outside `bx`, which
      // is exactly where the knuckles sit. The line would have been
      // dashed in the markup and solid on the screen at every size.
      $`<polyline
                    points="${-A},0 ${-A + I},${-k} ${A - I},${-k} ${A},0"
                    fill="none" stroke=${d} stroke-width="1.5"
                    stroke-linejoin="round" />`
    ) : y}
        <!-- Hinge knuckles, drawn whether or not it is open: they are what says
             this window is top-hung rather than fixed when it happens to be
             shut, and the request asked for them by name. -->
        ${[-_, _].map(
      (T) => $`
          <rect x=${T - h / 2} y=${-v / 2} width=${h} height=${v}
                fill="none" stroke=${d} stroke-width="1.25" />
          <line x1=${T} y1=${-v / 2} x2=${T} y2=${v / 2}
                stroke=${d} stroke-width="1.25" />`
    )}`;
  } else if (F(t) === "roll")
    g = $`
        <!-- jambs -->
        <line x1=${-s} y1=${-a / 2} x2=${-s} y2=${a / 2}
              stroke=${n} stroke-width="2" />
        <line x1=${s} y1=${-a / 2} x2=${s} y2=${a / 2}
              stroke=${n} stroke-width="2" />
        <!-- Track: stays when the curtain is up so the gap still reads as an
             opening — and wears the accent while the cover is open or moving
             (issue #154). Wide open the curtain has scaled away to nothing, so
             this line is the *only* mark left: drawn in the base colour it read
             exactly like a shut garage, which is the one thing it must not do.
             Full strength when accented, since a 0.6 tint of the accent reads
             as neither colour. -->
        <line x1=${-s} y1="0" x2=${s} y2="0"
              stroke=${d} stroke-width="0.75" opacity=${i ? 1 : 0.6} />
        ${Pn(t.length, d, c)}`;
  else {
    const h = t.type === "window" ? 1.5 : 2.5, v = $`
        <line x1=${-s} y1=${-a / 2} x2=${-s} y2=${a / 2}
              stroke=${n} stroke-width="2" />
        <line x1=${s} y1=${-a / 2} x2=${s} y2=${a / 2}
              stroke=${n} stroke-width="2" />`, _ = He(t);
    if (_ === "bypass") {
      const k = -s * c;
      g = $`
        ${v}
        <!-- tracks -->
        <line x1=${-s} y1=${-1.75} x2=${s} y2=${-1.75}
              stroke=${n} stroke-width="0.75" opacity="0.6" />
        <line x1=${-s} y1=${1.75} x2=${s} y2=${1.75}
              stroke=${n} stroke-width="0.75" opacity="0.6" />
        <!-- fixed panel: left half, front track -->
        <rect x=${-s} y=${1.75 - h / 2} width=${s} height=${h} style="fill:${d};" />
        <!-- moving panel: right half, back track -->
        <g class="fp-slide-panel" style="transform:translateX(${k}px);">
          <rect x="0" y=${-1.75 - h / 2} width=${s} height=${h} style="fill:${d};" />
        </g>`;
    } else if (_ === "biparting")
      g = $`
        ${v}
        <!-- track -->
        <line x1=${-s} y1="0" x2=${s} y2="0"
              stroke=${n} stroke-width="0.75" opacity="0.6" />
        <g class="fp-slide-panel" style="transform:translateX(${-s * c}px);">
          <rect x=${-s} y=${-h / 2} width=${s} height=${h} style="fill:${d};" />
        </g>
        <g class="fp-slide-panel" style="transform:translateX(${s * u}px);">
          <rect x="0" y=${-h / 2} width=${s} height=${h} style="fill:${f};" />
        </g>`;
    else if (_ === "biparting-bypass") {
      const k = s / 2;
      g = $`
        ${v}
        <!-- tracks -->
        <line x1=${-s} y1=${-1.75} x2=${s} y2=${-1.75}
              stroke=${n} stroke-width="0.75" opacity="0.6" />
        <line x1=${-s} y1=${1.75} x2=${s} y2=${1.75}
              stroke=${n} stroke-width="0.75" opacity="0.6" />
        <!-- fixed panels: outer quarters, front track. Never accented, even
             wide open — the accent marks what has moved, and lighting these
             would accent exactly the half that is still glazed shut. -->
        <rect x=${-s} y=${1.75 - h / 2} width=${k} height=${h} fill=${n} />
        <rect x=${s - k} y=${1.75 - h / 2} width=${k} height=${h} fill=${n} />
        <!-- moving panels: inner quarters, back track -->
        <g class="fp-slide-panel" style="transform:translateX(${-k * c}px);">
          <rect x=${-k} y=${-1.75 - h / 2} width=${k} height=${h} style="fill:${d};" />
        </g>
        <g class="fp-slide-panel" style="transform:translateX(${k * u}px);">
          <rect x="0" y=${-1.75 - h / 2} width=${k} height=${h} style="fill:${f};" />
        </g>`;
    } else if (_ === "converging") {
      const k = s / 2;
      g = $`
        ${v}
        <!-- tracks -->
        <line x1=${-s} y1=${-1.75} x2=${s} y2=${-1.75}
              stroke=${n} stroke-width="0.75" opacity="0.6" />
        <line x1=${-s} y1=${1.75} x2=${s} y2=${1.75}
              stroke=${n} stroke-width="0.75" opacity="0.6" />
        <!-- both panels move, so both take the accent on their own state:
             front track travels right, back track left, and they meet. -->
        <g class="fp-slide-panel" style="transform:translateX(${k * c}px);">
          <rect x=${-s} y=${1.75 - h / 2} width=${s} height=${h} style="fill:${d};" />
        </g>
        <g class="fp-slide-panel" style="transform:translateX(${-k * u}px);">
          <rect x="0" y=${-1.75 - h / 2} width=${s} height=${h} style="fill:${f};" />
        </g>`;
    } else {
      const A = t.length * c;
      g = $`
        ${v}
        <!-- track -->
        <line x1=${-s} y1="0" x2=${s} y2="0"
              stroke=${n} stroke-width="0.75" opacity="0.6" />
        <g class="fp-slide-panel" style="transform:translateX(${A}px);">
          <rect x=${-s} y=${-h / 2} width=${t.length} height=${h} style="fill:${d};" />
        </g>`;
    }
  }
  if (e.shutter) {
    const h = Math.max(0, Math.min(1, e.shutter.amount)), v = (H, T) => q(H ? e.shutter.accent ?? o : T === 0 ? l : n, P), _ = v(e.shutter.active, h), A = e.shutter.second, k = A ? Math.max(0, Math.min(1, A.amount)) : h, I = A ? v(A.active, k) : _;
    g = $`${g}${e.shutter.style === "swing" ? qd(
      t.length,
      a,
      _,
      h,
      e.shutter.flip ? -1 : 1,
      I,
      k
    ) : Pn(t.length, _, h)}`;
  }
  const { sx: w, sy: E } = Od(t);
  return $`<g class=${`fp-opening fp-opening-${j(t.type) ?? "unknown"}`}
                data-id=${j(t.id) ?? y}
                data-entity=${tt(t.entity) ?? y}
                transform="translate(${t.x} ${t.y}) rotate(${t.angle})">
      <g transform="scale(${w} ${E})">${g}</g>
    </g>`;
}
function jn(t) {
  if (typeof t != "number" || !Number.isFinite(t)) return 0;
  const e = (t % 360 + 360) % 360;
  return e === 90 || e === 180 || e === 270 ? e : 0;
}
function th(t, e) {
  const n = jn(t.rotation);
  if (e === void 0) return n;
  const r = e ? t.rotationPortrait : t.rotationLandscape;
  return r == null ? n : jn(r);
}
function eh(t, e) {
  return typeof t.addEventListener == "function" ? (t.addEventListener("change", e), () => t.removeEventListener?.("change", e)) : typeof t.addListener == "function" ? (t.addListener(e), () => t.removeListener?.(e)) : () => {
  };
}
function st(t, e, n) {
  return n === 90 || n === 270 ? { w: e, h: t } : { w: t, h: e };
}
function gt(t, e, n, r, i) {
  switch (i) {
    case 90:
      return { x: r - e, y: t };
    case 180:
      return { x: n - t, y: r - e };
    case 270:
      return { x: e, y: n - t };
    default:
      return { x: t, y: e };
  }
}
function nh(t, e, n) {
  switch (n) {
    case 90:
      return `translate(${e} 0) rotate(90)`;
    case 180:
      return `translate(${t} ${e}) rotate(180)`;
    case 270:
      return `translate(0 ${t}) rotate(-90)`;
    default:
      return "";
  }
}
function ih(t, e = di, n = ye) {
  const r = Math.min(e, n), i = Math.max(e, n);
  if (!(typeof t == "number" || typeof t == "string" && t.trim() !== "")) return i;
  const s = typeof t == "number" ? t : Number(t);
  if (!Number.isFinite(s)) return i;
  const a = rs - ln, l = Math.max(0, Math.min(1, (s - ln) / a)), c = l * l * (3 - 2 * l);
  return r + (i - r) * c;
}
const rh = 135, Bn = 12;
function De(t) {
  if (!(typeof t == "number" || typeof t == "string" && t.trim() !== "")) return;
  const n = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) ? n : void 0;
}
function sh(t) {
  const e = De(t);
  if (e === void 0) return 1;
  if (e <= 0) return 0;
  if (e >= Bn) return 1;
  const n = e / Bn;
  return n * n * (3 - 2 * n);
}
function oh(t, e = 0) {
  const n = (t + e) * Math.PI / 180;
  return { x: Math.sin(n), y: -Math.cos(n) };
}
function ah(t, e) {
  return re(t) ? t.sunBearing : De(e) ?? rh;
}
function re(t) {
  return typeof t.sunBearing == "number" && Number.isFinite(t.sunBearing);
}
function lh(t, e) {
  return re(t) ? 1 : sh(e);
}
const Ni = 0.34, ch = 30, dh = 0.95, hh = 0.16, ph = 0.37, ge = "var(--fp-skin-sunlight, #ffd9a0)", be = "var(--fp-skin-sunshade, #000)";
function uh(t) {
  return Math.max(0.02, Math.min(1.5, L(t, Ni)));
}
function fh(t, e, n, r) {
  let i = r;
  for (const o of n) {
    const s = ze(t.x, t.y, e.x, e.y, o);
    s !== void 0 && s > 1 && s < i && (i = s);
  }
  return i;
}
function yh(t) {
  const e = De(t);
  if (e === void 0) return 1;
  const n = (i) => i * Math.PI / 180, r = Math.tan(n(ch)) / Math.tan(n(Math.max(1, Math.min(89, e))));
  return Math.max(0.45, Math.min(1.9, r));
}
function mh(t, e, n) {
  return t.sunlight === !1 || n !== void 0 && n <= 0 ? 0 : Pi(t) ? 1 : Math.max(0, Math.min(1, e));
}
function Pi(t) {
  return t.glazed ?? t.type === "window";
}
function Hi(t) {
  const e = t.angle * Math.PI / 180, n = Math.cos(e) * t.length / 2, r = Math.sin(e) * t.length / 2;
  return [
    { x: t.x - n, y: t.y - r },
    { x: t.x + n, y: t.y + r }
  ];
}
function gh(t, e, n) {
  let r = !1;
  for (let i = 0, o = t.length - 1; i < t.length; o = i++) {
    const s = t[i], a = t[o];
    s.y > n != a.y > n && e < (a.x - s.x) * (n - s.y) / (a.y - s.y) + s.x && (r = !r);
  }
  return r;
}
function bh(t, e, n) {
  for (const r of e) {
    const i = ze(t.x, t.y, -n.x, -n.y, r);
    if (i === void 0) continue;
    if (!(i <= Xt && Le(t.x, t.y, r) <= Xt)) return !1;
  }
  return !0;
}
function $h(t, e) {
  return oh(ah(t, e) + 180, t.north ?? 0);
}
function Di(t, e, n, r) {
  return [
    t,
    e,
    { x: e.x + n.x * r, y: e.y + n.y * r },
    { x: t.x + n.x * r, y: t.y + n.y * r }
  ];
}
function vh(t, e, n, r = 1) {
  const [i, o] = Hi(t), s = Math.max(0, Math.min(1, r)), a = (i.x + o.x) / 2, l = (i.y + o.y) / 2, c = (u) => ({ x: a + (u.x - a) * s, y: l + (u.y - l) * s });
  return Di(c(i), c(o), e, n);
}
function wh(t, e, n) {
  return Di({ x: t.x1, y: t.y1 }, { x: t.x2, y: t.y2 }, e, n);
}
function Wn(t) {
  return t.map((e) => `${e.x},${e.y}`).join(" ");
}
function xh(t, e, n, r, i, o) {
  const { dir: s, openAmount: a, shutterOpen: l, strength: c = 1 } = o, u = {
    light: o.light ?? ge,
    // `?? ` would swallow the explicit null that means "no shade at all".
    shade: o.shade === void 0 ? be : o.shade
  };
  if (c <= 0) return y;
  const p = Math.min(n, r) * uh(o.reach), d = (x) => mh(x, a(x), l(x)), f = ki(t, e, d), b = f.map((x) => wh(x, s, p)), m = e.map((x, W) => {
    if (!(d(x) > 0 && bh(x, t, s))) return;
    const dt = fh(x, s, f, p), [Ue, je] = Hi(x), Fi = je.x - Ue.x, Ui = je.y - Ue.y, ji = Math.abs(Fi * s.y - Ui * s.x) * d(x) / 2;
    return {
      // The outline runs past the falloff, so the ellipse is what bounds the
      // patch and never the polygon's flat far edge.
      points: Wn(vh(x, s, dt + x.length, d(x))),
      cx: x.x,
      cy: x.y,
      along: dt,
      across: Math.max(1, ji * dh),
      angle: Math.atan2(s.y, s.x) * 180 / Math.PI,
      lightId: `${i}-b${W}`,
      shadeId: `${i}-s${W}`,
      fadeId: `${i}-f${W}`
    };
  });
  if (!m.some((x) => x !== void 0)) return y;
  const g = b.map(Wn), w = D, E = `${i}-shade`, h = `${i}-shadow`, v = -w, _ = -w, A = n + w * 2, k = r + w * 2, I = (x, W = y) => $`<rect x=${v} y=${_} width=${A} height=${k} fill=${x}>${W}</rect>`, H = (x, W) => $`<polygon points=${x} fill=${W} stroke=${W} stroke-width=${D} />`, T = (x, W, dt) => $`<radialGradient id=${W} gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1"
              gradientTransform=${`translate(${x.cx} ${x.cy}) rotate(${x.angle}) scale(${x.along} ${x.across})`}>
          <stop offset="0" stop-color=${dt} stop-opacity="1" />
          <stop offset="0.45" stop-color=${dt} stop-opacity="0.55" />
          <stop offset="1" stop-color=${dt} stop-opacity="0" />
        </radialGradient>`, M = u.shade === null ? y : $`
      <!-- Where the shade shows: everywhere, minus the patches of light, plus
           back wherever a wall stands in one. The order is the whole logic. -->
      <mask id=${E} maskUnits="userSpaceOnUse" x=${v} y=${_} width=${A} height=${k}>
        ${I("#fff")}
        ${m.map((x) => x ? T(x, x.shadeId, "#000") : y)}
        ${m.map(
    (x) => x ? $`<polygon points=${x.points} fill=${`url(#${x.shadeId})`} />` : y
  )}
        ${g.map((x) => H(x, "#fff"))}
      </mask>`;
  return $`
    <defs>
      ${M}
      <!-- The wall shadows again, for the warm patches themselves. -->
      <mask id=${h} maskUnits="userSpaceOnUse" x=${v} y=${_} width=${A} height=${k}>
        ${I("#fff")}
        ${g.map((x) => H(x, "#000"))}
      </mask>
    </defs>
    <g class="fp-sunlight">
      ${u.shade === null ? y : $`<rect x=${v} y=${_} width=${A} height=${k}
            style=${`fill:${q(u.shade, be)};`}
            opacity=${hh * c} mask=${`url(#${E})`} />`}
      <g mask=${`url(#${h})`} opacity=${ph * c}>
        ${m.map(
    (x) => x ? T(x, x.lightId, q(u.light, ge)) : y
  )}
        ${m.map(
    (x) => x ? $`<polygon class="fp-sunbeam" points=${x.points}
                            fill=${`url(#${x.lightId})`} />` : y
  )}
      </g>
    </g>`;
}
function _h(t) {
  switch (t) {
    case "contain":
      return "xMidYMid meet";
    case "cover":
      return "xMidYMid slice";
    default:
      return "none";
  }
}
function kh(t, e, n, r) {
  const i = D + 4, o = D;
  return $`
    <defs>
      <mask id=${r} maskUnits="userSpaceOnUse"
            x=${-o} y=${-o} width=${e + o * 2} height=${n + o * 2}>
        <rect x=${-o} y=${-o} width=${e + o * 2} height=${n + o * 2}
              fill="white" />
        ${t.map((s) => {
    const a = s.length / 2;
    return $`<rect x=${s.x - a} y=${s.y - i / 2}
                           width=${s.length} height=${i} fill="black"
                           transform="rotate(${s.angle} ${s.x} ${s.y})" />`;
  })}
      </mask>
    </defs>`;
}
function Sh(t) {
  if (!t.length) return { x: 0, y: 0 };
  const e = t.reduce((n, r) => ({ x: n.x + r.x, y: n.y + r.y }), { x: 0, y: 0 });
  return { x: e.x / t.length, y: e.y / t.length };
}
const $e = { scale: 1, txPercent: 0, tyPercent: 0 };
function Eh(t, e, n, r, i = 0.15, o = ls, s) {
  if (!t.length) return $e;
  const a = t.map((k) => gt(k.x, k.y, e, n, r)), l = st(e, n, r), c = a.map((k) => k.x), u = a.map((k) => k.y), p = Math.min(...c), d = Math.max(...c), f = Math.min(...u), b = Math.max(...u), m = Math.max(d - p, b - f) * i, g = Math.max(d - p + m * 2, 1), w = Math.max(b - f + m * 2, 1), E = Math.max(1, Math.min(o, Math.min(l.w / g, l.h / w))), h = s ?? E;
  if (!Number.isFinite(h)) return $e;
  const v = (p + d) / 2 / l.w, _ = (f + b) / 2 / l.h, A = (k) => Math.min(0, Math.max(100 * (1 - h), k));
  return {
    scale: h,
    txPercent: A(50 - h * v * 100),
    tyPercent: A(50 - h * _ * 100)
  };
}
function Ah(t) {
  const e = t.zoom;
  if (!(typeof e != "number" || !Number.isFinite(e)))
    return Math.max(1, Math.min(cs, e));
}
function Th(t, e) {
  if (!Number.isFinite(t) || t <= 1) return 1;
  const n = typeof e == "number" && Number.isFinite(e) && e > 0 ? e : ds;
  return 1 / t * n;
}
const fe = 12, Mh = 1.5, Ch = 0.4;
function Ih(t) {
  return $`
    <defs>
      <pattern id=${t} width=${fe} height=${fe}
               patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line class="fp-dead-space-line" x1="0" y1="0" x2="0" y2=${fe}
              stroke=${ai} stroke-width=${Mh} />
      </pattern>
    </defs>`;
}
function Rh(t, e) {
  const n = t.map((r) => `${r.x},${r.y}`).join(" ");
  return $`<polygon class="fp-dead-space" points=${n}
                      fill=${`url(#${e})`} fill-rule="nonzero"
                      fill-opacity=${Ch} stroke="none" />`;
}
function Oh(t, e) {
  const n = t.points.map((o) => `${o.x},${o.y}`).join(" "), r = e !== void 0 && (t.highlight ?? "fill") !== "border", i = r ? t.activeOpacity ?? t.opacity : t.opacity;
  return $`<polygon class="fp-area" data-id=${j(t.id) ?? y}
                       data-entity=${tt(t.entity) ?? y}
                       points=${n}
                       fill=${r ? e : q(t.color, P)}
                       fill-opacity=${L(i, as)}
                       stroke=${t.type === "balcony" ? q(t.color, P) : "none"}
                       stroke-width=${t.type === "balcony" ? 3 : 0}
                       stroke-dasharray=${t.type === "balcony" ? "10 6" : y} />`;
}
function Lh(t, e, n) {
  const r = e !== void 0 && (t.highlight ?? "fill") !== "fill", i = r ? e : t.borderColor ? q(t.borderColor, "none") : void 0;
  if (i === void 0 || i === "none") return y;
  const o = t.points.map((a) => `${a.x},${a.y}`).join(" "), s = L(
    t.borderWidth,
    r ? D / 2 : hs
  );
  return !r || n === void 0 ? $`<polygon class="fp-area-border" data-id=${j(t.id) ?? y}
                        data-entity=${tt(t.entity) ?? y}
                        points=${o} fill="none"
                        stroke=${i} stroke-width=${s} />` : $`
    <clipPath id=${n}><polygon points=${o} /></clipPath>
    <polygon class="fp-area-border" data-id=${j(t.id) ?? y}
             data-entity=${tt(t.entity) ?? y}
             points=${o} fill="none" clip-path=${`url(#${n})`}
             stroke=${i} stroke-width=${s * 2} />`;
}
function zh(t, e, n = Lt) {
  const r = e ?? t.color ?? gs, i = bc(gi(n, t.type) ?? yc, t.w, t.h, r), o = t.hand === "left" ? " scale(-1 1)" : "";
  return $`<g class=${`fp-furniture fp-furniture-${j(t.type) ?? "unknown"}`}
                data-id=${j(t.id) ?? y}
                data-entity=${tt(t.entity) ?? y}
                transform="translate(${t.x} ${t.y}) rotate(${t.angle ?? 0})${o}">${i}</g>`;
}
function qn(t, e, n, r, i, o = 3, s = "fixed") {
  function a(d) {
    return (d % 360 + 360) % 360;
  }
  function l(d, f, b) {
    return Math.max(Math.min(d, b), f);
  }
  const c = U(L(n, ui), s), u = a(L(r, fi)), p = l(L(i, yi), 0, 360);
  return S`
    <div
      class="ripple ${t ? "active" : ""}"
      style="width:${c};height:${c};--fp-ripple-color:${q(e, P)};--fp-ripple-direction:${u};--fp-ripple-width:${p}"
    >
      <span class="dot"></span>
      ${Array.from(
    { length: o },
    (d, f) => S`<span class="ring" style="animation-delay:${(f * 0.6).toFixed(2)}s;"></span>`
  )}
    </div>
  `;
}
function Vn(t, e) {
  if (!e || !t) return null;
  const n = t[e]?.state;
  if (n == null || n === "unavailable" || n === "unknown") return null;
  const r = Number(n);
  return Number.isFinite(r) ? r : null;
}
function Nh(t, e) {
  const n = t.color ?? P, r = (t.dotSize ?? ys) / 2, i = t.x + t.w / 2, o = t.y + t.h / 2, s = t.angle ?? 0, a = $n(t.xSensor, e.xReading), l = $n(t.ySensor, e.yReading), c = a != null, u = l != null, p = e.xPresent === !1 || e.yPresent === !1, d = t.w / 2, f = t.h / 2, b = $``;
  let m;
  if (p)
    m = $``;
  else if (c && u) {
    const g = -d + a * t.w, w = -f + l * t.h, E = `0,${-r} ${r * 0.9},${r * 0.7} ${-r * 0.9},${r * 0.7}`, h = Math.max(r * 3.5, Math.min(t.w, t.h) * 0.45);
    m = $`
      <g class="tracker-marker" style="transform:translate(${g}px, ${w}px);">
        <circle class="tracker-ring" cx="0" cy="0" r="0"
                fill="none" stroke=${n} stroke-width="1.5"
                style="--fp-tracker-ring-max:${h}px;" />
        <circle class="tracker-ring" cx="0" cy="0" r="0"
                fill="none" stroke=${n} stroke-width="1.5"
                style="--fp-tracker-ring-max:${h}px; animation-delay:0.7s;" />
        <polygon class="tracker-dot" points=${E} fill=${n} />
      </g>`;
  } else if (c || u)
    if (c) {
      const g = -d + a * t.w;
      m = $`
        <g class="tracker-line" style="transform:translate(${g}px, 0);">
          <line class="tracker-line-stroke" x1="0" y1=${-f} x2="0" y2=${f}
                stroke=${n} stroke-width="1.5" />
          <line class="tracker-band" x1="0" y1=${-f} x2="0" y2=${f}
                stroke=${n} stroke-width="3" stroke-linecap="round" />
          <line class="tracker-band" x1="0" y1=${-f} x2="0" y2=${f}
                stroke=${n} stroke-width="3" stroke-linecap="round"
                style="animation-delay:0.8s;" />
        </g>`;
    } else {
      const g = -f + l * t.h;
      m = $`
        <g class="tracker-line tracker-line-h" style="transform:translate(0, ${g}px);">
          <line class="tracker-line-stroke" x1=${-d} y1="0" x2=${d} y2="0"
                stroke=${n} stroke-width="1.5" />
          <line class="tracker-band" x1=${-d} y1="0" x2=${d} y2="0"
                stroke=${n} stroke-width="3" stroke-linecap="round" />
          <line class="tracker-band" x1=${-d} y1="0" x2=${d} y2="0"
                stroke=${n} stroke-width="3" stroke-linecap="round"
                style="animation-delay:0.8s;" />
        </g>`;
    }
  else
    m = $``;
  return $`
    <g class="tracker fp-tracker ${""}"
       data-id=${j(t.id) ?? y}
       transform="translate(${i} ${o}) rotate(${s})">
      ${b}${m}
    </g>`;
}
class se {
  static currentFloorEntityIds(e, n) {
    const r = e ? bt(e) : [], i = r.find((s) => s.id === n) ?? r[0];
    if (!i) return [];
    const o = /* @__PURE__ */ new Set();
    for (const s of i.openings)
      s.entity && o.add(s.entity), s.secondaryEntity && o.add(s.secondaryEntity), s.shutterEntity && o.add(s.shutterEntity), s.shutterSecondaryEntity && o.add(s.shutterSecondaryEntity);
    for (const s of i.items) {
      s.entity && o.add(s.entity);
      for (const a of ie(s))
        a.entity && o.add(a.entity);
    }
    for (const s of i.furniture)
      s.entity && o.add(s.entity);
    for (const s of i.areas)
      s.entity && o.add(s.entity);
    for (const s of i.trackers)
      for (const a of [s.xSensor, s.ySensor])
        a?.entity && o.add(a.entity), a?.presence?.entity && o.add(a.presence.entity);
    return Array.from(o).sort();
  }
  static scopeKey(e, n) {
    const r = se.currentFloorEntityIds(e, n);
    return r.length ? r.join("|") : "none";
  }
}
function Ph(t) {
  const e = Date.now() / 1e3, n = t?.historyReplay?.lookbackSeconds, r = typeof n == "number" && Number.isFinite(n) && n > 0 ? n : 3600;
  return { start: Math.max(0, e - r), end: e };
}
function Kn(t, e) {
  const n = Math.max(0, Math.min(t, e)), r = Math.max(0, Math.max(t, e));
  return {
    start: n,
    end: Math.max(n, r)
  };
}
function Hh(t, e) {
  return se.currentFloorEntityIds(t, e);
}
function Dh(t, e) {
  return se.scopeKey(t, e);
}
function Fh(t, e, n) {
  const i = Math.max(1, n - e) / 30, o = t?.historyReplay?.defaultSpeed;
  return Math.max(0.25, o ?? i);
}
function Uh(t) {
  const e = Date.parse(t);
  return Number.isNaN(e) ? Date.now() / 1e3 : e / 1e3;
}
function Gn(t) {
  if (!Number.isFinite(t) || t <= 0) return "";
  const e = new Date(t * 1e3), n = e.getFullYear(), r = `${e.getMonth() + 1}`.padStart(2, "0"), i = `${e.getDate()}`.padStart(2, "0"), o = `${e.getHours()}`.padStart(2, "0"), s = `${e.getMinutes()}`.padStart(2, "0");
  return `${n}-${r}-${i}T${o}:${s}`;
}
function jh(t) {
  const e = Math.min(3, Math.max(-2, t));
  return Number((10 ** e).toPrecision(4));
}
function Bh(t, e, n) {
  if (!t) return;
  if (n.has(e))
    return n.get(e);
  const r = bt(t);
  let i;
  for (const o of r) {
    for (const s of o.items ?? [])
      if (s.entity === e)
        return i = s.activeColor ?? s.rippleColor, n.set(e, i), i;
    for (const s of o.openings ?? [])
      if (s.entity === e)
        return i = s.activeColor, n.set(e, i), i;
    for (const s of o.furniture ?? [])
      if (s.entity === e)
        return i = s.activeColor, n.set(e, i), i;
  }
  n.set(e, void 0);
}
function Wh(t, e, n, r, i) {
  if (!e) return Ot(t);
  const o = z(Bh(e, t.entityId, r)), s = et(t.entityId, t.newState);
  if (i && o) return s ? o : "#ffffff";
  const a = Ot(t);
  return s ? a : "#ffffff";
}
function qh(t, e) {
  if (!Number.isFinite(t)) return "—";
  try {
    return e.format(new Date(t * 1e3));
  } catch {
    return new Date(t * 1e3).toISOString();
  }
}
var Vh = Object.defineProperty, Kh = Object.getOwnPropertyDescriptor, N = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? Kh(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && Vh(e, n, i), i;
};
function Gh(t) {
  const e = t.state.playbackController, n = t.state, i = n.enabled || n.startTime > 0 ? void 0 : t.getDefaultWindow(), o = i ? i.start : n.startTime, s = i ? i.end : n.endTime, a = t.formatReplayTime(
    i ? i.end : e.currentTime
  );
  return {
    events: n.historyEvents,
    startTime: i ? i.start : e.startTime,
    endTime: i ? i.end : e.endTime,
    currentTime: i ? i.end : e.currentTime,
    visible: n.historyVisible,
    enabled: n.enabled,
    ready: n.ready,
    playing: e.playing,
    timelineExpanded: n.timelineExpanded,
    logExpanded: n.logExpanded,
    speedExpanded: n.speedExpanded,
    error: n.error,
    rangeWarning: n.rangeWarning,
    panelId: n.panelId,
    replaySpeed: e.speed,
    currentTimeLabel: a,
    startInputValue: Gn(o),
    endInputValue: Gn(s),
    onToggleVisible: (l) => t.toggleHistoryVisible(l),
    onRangeChange: (l, c) => {
      t.handleRangeChange(l, { target: { value: c } });
    },
    onZoom: (l) => t.zoomWindow(l),
    onJump: (l) => t.jumpReplay(l),
    onStep: (l) => t.stepReplay(l),
    onPlayToggle: () => e.playing ? t.pauseReplay() : t.playReplay(),
    onToggleSpeedPanel: () => t.toggleSpeedPanel(),
    onSpeedSliderInput: (l) => t.setReplaySpeed(jh(l)),
    onSpeedChange: (l) => t.setReplaySpeed(l),
    onToggleTimeline: () => t.toggleTimeline(),
    onToggleLog: () => t.toggleLog(),
    onSeek: (l) => t.seekReplay(l)
  };
}
function Xh(t) {
  return S`
    <easy-floorplan-replay-panel
      .events=${t.events}
      .startTime=${t.startTime}
      .endTime=${t.endTime}
      .currentTime=${t.currentTime}
      .visible=${t.visible}
      .enabled=${t.enabled}
      .ready=${t.ready}
      .playing=${t.playing}
      .timelineExpanded=${t.timelineExpanded}
      .logExpanded=${t.logExpanded}
      .speedExpanded=${t.speedExpanded}
      .error=${t.error}
      .rangeWarning=${t.rangeWarning}
      .panelId=${t.panelId}
      .replaySpeed=${t.replaySpeed}
      .currentTimeLabel=${t.currentTimeLabel}
      .startInputValue=${t.startInputValue}
      .endInputValue=${t.endInputValue}
      @toggle-visible=${(e) => t.onToggleVisible(!!(e.detail?.visible ?? !0))}
      @range-change=${(e) => {
    const n = e.detail?.kind ?? "start";
    e.detail?.value && t.onRangeChange(n, e.detail.value);
  }}
      @zoom=${(e) => t.onZoom(e.detail?.direction ?? 1)}
      @jump=${(e) => t.onJump(e.detail?.delta ?? 0)}
      @step=${(e) => t.onStep(e.detail?.direction ?? 1)}
      @play-toggle=${() => t.onPlayToggle()}
      @toggle-speed-panel=${() => t.onToggleSpeedPanel()}
      @speed-slider-input=${(e) => {
    const n = Number(e.detail?.value ?? 0);
    Number.isFinite(n) && t.onSpeedSliderInput(n);
  }}
      @speed-change=${(e) => {
    const n = Number(e.detail?.value ?? 1);
    Number.isFinite(n) && t.onSpeedChange(n);
  }}
      @toggle-timeline=${() => t.onToggleTimeline()}
      @toggle-log=${() => t.onToggleLog()}
      @seek=${(e) => t.onSeek(e.detail?.timestamp ?? t.currentTime)}
    ></easy-floorplan-replay-panel>
  `;
}
let R = class extends Z {
  constructor() {
    super(...arguments), this.events = [], this.startTime = 0, this.endTime = 0, this.currentTime = 0, this.visible = !1, this.enabled = !1, this.ready = !1, this.playing = !1, this.timelineExpanded = !1, this.logExpanded = !1, this.speedExpanded = !1, this.panelId = "replay-panel", this.replaySpeed = 1, this.currentTimeLabel = "—", this.startInputValue = "", this.endInputValue = "";
  }
  updated(t) {
    super.updated(t), (t.has("events") || t.has("currentTime") || t.has("logExpanded")) && this._logRef && this._syncLogToCurrentEvent();
  }
  _dispatch(t, e) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  _getCurrentEvent() {
    if (!this.events.length) return;
    const t = this.currentTime;
    let e = 0, n = this.events.length - 1, r = -1;
    for (; e <= n; ) {
      const i = e + n >> 1;
      this.events[i].timestamp <= t ? (r = i, e = i + 1) : n = i - 1;
    }
    return r >= 0 ? this.events[r] : void 0;
  }
  _renderEventItem(t, e) {
    const n = t.timestamp <= this.currentTime, r = (typeof t.color == "string" ? t.color : void 0) ?? (typeof t.attributes?.color == "string" ? t.attributes.color : void 0) ?? Ot(t), i = z(r), o = i ? `background:${i}; box-shadow:0 0 0 2px ${i}22;` : y;
    return S`
      <li class="replay-event-item ${n ? "replay-event-passed" : ""} ${e ? "replay-event-current" : ""}" data-timestamp=${t.timestamp}>
        <span class="replay-event-dot" style=${o}></span>
        <span class="replay-event-time">${new Date(t.timestamp * 1e3).toLocaleTimeString([], { hour: "numeric", minute: "2-digit", second: "2-digit" })}</span>
        <span class="replay-event-icon"><ha-icon icon="mdi:swap-horizontal"></ha-icon></span>
        <span class="replay-event-entity">${t.entityId}</span>
        <span class="replay-event-change">${t.oldState} → ${t.newState}</span>
      </li>
    `;
  }
  _syncLogToCurrentEvent() {
    if (!this._logRef) return;
    const t = this._logRef.querySelector(".replay-event-item.replay-event-current");
    t && t.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
  render() {
    if (!this.visible)
      return S`
        <div class="replay-panel-toggle">
          <button
            class="replay-show-toggle"
            aria-expanded="false"
            aria-label="Show replay history"
            aria-controls=${this.panelId}
            @click=${() => this._dispatch("toggle-visible", { visible: !0 })}
          >
            Replay
          </button>
        </div>
      `;
    const t = this._getCurrentEvent();
    return S`
      <div class="replay-panel" id=${this.panelId}>
        <!-- Closing the panel is how you get back to now, so the button says
             so. It used to say "hide", next to a separate Live button that did
             the returning; one control does both because they were never two
             things (see ReplayController.toggleHistoryVisible). -->
        <button
          class="replay-hide-toggle"
          aria-label="Close replay and return to live"
          aria-controls=${this.panelId}
          @click=${() => this._dispatch("toggle-visible", { visible: !1 })}
        >
          live
        </button>
        <div class="replay-header">
          <div class="replay-meta">
            <span class="replay-time">${this.currentTimeLabel}</span>
          </div>
          <div class="replay-status">
            ${this.error ? S`<span class="replay-error">${this.error}</span>` : y}
            ${this.rangeWarning ? S`<span class="replay-loading">${this.rangeWarning}</span>` : y}
            ${!this.ready && this.enabled && !this.error ? S`<span class="replay-loading">Loading history…</span>` : y}
          </div>
        </div>
        <div class="replay-range">
          <label class="replay-range-field">
            <span>Start</span>
            <input
              type="datetime-local"
              .value=${this.startInputValue}
              @change=${(e) => this._dispatch("range-change", { kind: "start", value: e.target.value })}
            />
          </label>
          <label class="replay-range-field">
            <span>End</span>
            <input
              type="datetime-local"
              .value=${this.endInputValue}
              @change=${(e) => this._dispatch("range-change", { kind: "end", value: e.target.value })}
            />
          </label>
          <div class="replay-range-tools">
            <button class="replay-icon-button" aria-label="Zoom out range" title="Zoom out range" @click=${() => this._dispatch("zoom", { direction: -1 })}>
              <ha-icon icon="mdi:magnify-minus-outline"></ha-icon>
            </button>
            <button class="replay-icon-button" aria-label="Zoom in range" title="Zoom in range" @click=${() => this._dispatch("zoom", { direction: 1 })}>
              <ha-icon icon="mdi:magnify-plus-outline"></ha-icon>
            </button>
          </div>
        </div>
        <div class="replay-toolbar">
          <div class="replay-transport" role="group" aria-label="Replay transport controls">
            <button class="replay-icon-button" aria-label="Jump back 30 seconds" title="Jump back 30 seconds" @click=${() => this._dispatch("jump", { delta: -30 })}>
              <ha-icon icon="mdi:rewind-30"></ha-icon>
            </button>
            <button class="replay-icon-button" aria-label="Step back one event" title="Step back" @click=${() => this._dispatch("step", { direction: -1 })}>
              <ha-icon icon="mdi:skip-previous"></ha-icon>
            </button>
            <button class="replay-run-button" title=${this.playing ? "Pause replay" : "Run replay"} @click=${() => this._dispatch("play-toggle")}>
              <ha-icon icon=${this.playing ? "mdi:pause" : "mdi:play"}></ha-icon>
              <span>${this.playing ? "Pause" : "Run"}</span>
            </button>
            <button class="replay-icon-button" aria-label="Step forward one event" title="Step forward" @click=${() => this._dispatch("step", { direction: 1 })}>
              <ha-icon icon="mdi:skip-next"></ha-icon>
            </button>
            <button class="replay-icon-button" aria-label="Jump forward 30 seconds" title="Jump forward 30 seconds" @click=${() => this._dispatch("jump", { delta: 30 })}>
              <ha-icon icon="mdi:fast-forward-30"></ha-icon>
            </button>
          </div>
          <div class="replay-toolbar-toggles">
            <button
              class="replay-speed-toggle"
              aria-expanded=${this.speedExpanded}
              @click=${() => this._dispatch("toggle-speed-panel")}
            >
              Speed ${this.replaySpeed.toFixed(2)}x
              <ha-icon icon=${this.speedExpanded ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
            </button>
          </div>
        </div>
        ${this.speedExpanded ? S`<div class="replay-speed-panel">
              <label class="replay-speed-field replay-speed-group">
                <span>Playback speed</span>
                <input
                  class="replay-speed-slider"
                  type="range"
                  min="-2"
                  max="3"
                  step="0.01"
                  .value=${String(Math.log10(this.replaySpeed || 1))}
                  @input=${(e) => this._dispatch("speed-slider-input", { value: Number(e.target.value) })}
                />
                <input
                  class="replay-speed"
                  type="number"
                  min="0.01"
                  max="1000"
                  step="0.01"
                  .value=${this.replaySpeed.toString()}
                  @change=${(e) => this._dispatch("speed-change", { value: Number(e.target.value || 1) })}
                />
              </label>
            </div>` : y}
        <div class="replay-lanes">
          <div class="replay-view-tools">
            <button class="replay-timeline-toggle" @click=${() => this._dispatch("toggle-timeline")}>
              ${this.timelineExpanded ? "Collapse lanes" : "Expand lanes"}
            </button>
          </div>
          <div class="replay-timeline-wrap">
            <easy-floorplan-history-timeline
              .events=${this.events}
              .startTime=${this.startTime}
              .endTime=${this.endTime}
              .currentTime=${this.currentTime}
              .expanded=${this.timelineExpanded}
              @seek=${(e) => this._dispatch("seek", { timestamp: e.detail.timestamp })}
            ></easy-floorplan-history-timeline>
          </div>
        </div>
        <div class=${`replay-event-log ${this.logExpanded ? "expanded" : "collapsed"}`} role="log" aria-label="Replay event log">
          <button class="replay-log-toggle" @click=${() => this._dispatch("toggle-log")}>
            ${this.logExpanded ? "Hide log" : "Show log"}
          </button>
          ${this.logExpanded ? S`<ul
                class="replay-event-list"
                ${(e) => {
      this._logRef = e instanceof HTMLUListElement ? e : void 0, this._logRef && this.events.length && this._syncLogToCurrentEvent();
    }}
              >${ft(this.events, (e, n) => `${e.timestamp}-${e.entityId}-${e.newState}-${n}`, (e) => this._renderEventItem(e, t?.timestamp === e.timestamp))}</ul>` : y}
          ${!this.logExpanded && !this.events.length ? S`<div class="replay-empty">No history events yet.</div>` : y}
        </div>
      </div>
    `;
  }
};
R.styles = vt`
    .replay-panel {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 12px 12px 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 12px;
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.03));
      overflow-x: hidden;
    }
    .replay-panel-toggle {
      display: flex;
      justify-content: flex-start;
      margin: 0 0 4px;
    }
    /* Shaped like the floor buttons, and carrying the same skin tokens, so the
       card's two bits of chrome read as one set rather than two. */
    .replay-hide-toggle,
    .replay-show-toggle {
      border: 1px solid var(--fp-skin-badge-border, var(--divider-color, #ccc));
      border-radius: 6px;
      background: var(--fp-skin-badge-bg, var(--card-background-color, #fff));
      color: var(--fp-skin-text, var(--primary-text-color));
      padding: 4px 8px;
      font-size: 12px;
      line-height: 1;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      white-space: nowrap;
    }
    .replay-hide-toggle {
      position: absolute;
      top: 6px;
      right: 6px;
      z-index: 1;
      padding: 2px 8px;
      font-size: 11px;
      text-transform: lowercase;
    }
    .replay-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      padding-right: 52px;
    }
    .replay-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    /*
     * The moment being drawn, painted as its own thing rather than set in a
     * line of grey text. This is the one fact the panel exists to report --
     * with the panel open the plan is always showing the past, so "where in
     * time am I" is the only question left -- and a plain timestamp beside a
     * row of controls does not read as an answer to it. Matches the clock
     * riding the timeline playhead, which wears the same accent.
     */
    .replay-time {
      font-size: 12px;
      font-variant-numeric: tabular-nums;
      padding: 3px 9px;
      border-radius: 999px;
      background: var(--fp-skin-accent, var(--primary-color, #03a9f4));
      color: var(--fp-skin-accent-ink, var(--text-primary-color, #fff));
      font-weight: 600;
    }
    .replay-status {
      font-size: 12px;
      color: var(--secondary-text-color, #666);
    }
    .replay-toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: end;
      justify-content: space-between;
    }
    .replay-toolbar-toggles {
      display: flex;
      gap: 6px;
      align-items: center;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    .replay-lanes {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }
    .replay-transport {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
    }
    .replay-speed-toggle {
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 999px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      padding: 4px 10px;
      font-size: 12px;
      line-height: 1.2;
      cursor: pointer;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .replay-icon-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 30px;
      height: 28px;
      padding: 2px 6px;
    }
    .replay-icon-button ha-icon,
    .replay-speed-toggle ha-icon,
    .replay-run-button ha-icon {
      --mdc-icon-size: 16px;
    }
    .replay-speed-panel {
      border: 1px solid var(--divider-color, #ddd);
      border-radius: 8px;
      background: var(--card-background-color, #fff);
      padding: 8px 10px;
      min-width: 0;
    }
    .replay-range {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: end;
    }
    .replay-range-tools {
      display: flex;
      gap: 4px;
    }
    .replay-view-tools {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .replay-timeline-wrap {
      max-height: 220px;
      overflow-y: auto;
      overflow-x: hidden;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 8px;
      background: var(--card-background-color, #fff);
      min-width: 0;
    }
    .replay-range-field,
    .replay-speed-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
      color: var(--secondary-text-color, #666);
    }
    .replay-range-field {
      flex: 1 1 210px;
      min-width: 180px;
    }
    .replay-speed-group {
      flex: 1 1 auto;
      min-width: 0;
      max-width: 100%;
      margin-left: 0;
    }
    .replay-range input,
    .replay-speed-slider,
    .replay-speed-field input {
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 6px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      padding: 4px 8px;
      font-size: 12px;
      min-width: 150px;
    }
    .replay-toolbar button,
    .replay-range-tools button,
    .replay-toolbar select,
    .replay-speed-field input {
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 6px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      padding: 4px 8px;
      font-size: 12px;
      line-height: 1;
    }
    .replay-speed-slider {
      padding: 0;
      width: 100%;
      min-width: 0;
      max-width: 100%;
    }
    .replay-speed {
      width: 92px;
      min-width: 0;
      align-self: flex-start;
    }
    .replay-run-button {
      min-width: 82px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .replay-toolbar button,
    .replay-range-tools button {
      cursor: pointer;
    }
    @media (max-width: 720px) {
      .replay-toolbar {
        align-items: stretch;
      }
      .replay-speed-group {
        margin-left: 0;
        max-width: 100%;
      }
    }
    .replay-event-log {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      background: var(--card-background-color, #fff);
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .replay-event-log.collapsed {
      padding-bottom: 8px;
    }
    .replay-timeline-toggle,
    .replay-log-toggle {
      align-self: flex-start;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 999px;
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.03));
      color: var(--primary-text-color);
      padding: 4px 8px;
      font-size: 11px;
      cursor: pointer;
    }
    .replay-event-log ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
      max-height: 180px;
      overflow: auto;
      overscroll-behavior: contain;
    }
    .replay-event-item {
      display: grid;
      grid-template-columns: auto auto auto minmax(0, 1fr) auto;
      gap: 8px;
      align-items: center;
      font-size: 12px;
      color: var(--secondary-text-color, #666);
      user-select: text;
      cursor: text;
      padding: 2px 0;
    }
    .replay-event-passed {
      color: var(--primary-text-color);
    }
    .replay-event-current {
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.03));
      border-radius: 6px;
      padding: 4px 6px;
      margin: -4px -6px;
    }
    .replay-event-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--divider-color, #ccc);
      flex-shrink: 0;
    }
    .replay-event-time {
      color: var(--secondary-text-color, #666);
      white-space: nowrap;
    }
    .replay-event-entity {
      color: var(--primary-text-color);
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .replay-event-icon {
      display: inline-flex;
      align-items: center;
      color: var(--secondary-text-color, #666);
    }
    .replay-event-icon ha-icon {
      --mdc-icon-size: 16px;
    }
    .replay-event-change {
      color: var(--secondary-text-color, #666);
      white-space: nowrap;
      text-align: right;
    }
    .replay-panel-hidden {
      border: 1px dashed var(--divider-color, #ccc);
      border-radius: 8px;
      background: var(--card-background-color, #fff);
      padding: 8px 10px;
    }
    .replay-toolbar-hidden {
      justify-content: flex-end;
      margin: 0;
    }
    .replay-empty {
      font-size: 12px;
      color: var(--secondary-text-color, #666);
    }
  `;
N([
  C({ attribute: !1 })
], R.prototype, "events", 2);
N([
  C({ type: Number })
], R.prototype, "startTime", 2);
N([
  C({ type: Number })
], R.prototype, "endTime", 2);
N([
  C({ type: Number })
], R.prototype, "currentTime", 2);
N([
  C({ type: Boolean })
], R.prototype, "visible", 2);
N([
  C({ type: Boolean })
], R.prototype, "enabled", 2);
N([
  C({ type: Boolean })
], R.prototype, "ready", 2);
N([
  C({ type: Boolean })
], R.prototype, "playing", 2);
N([
  C({ type: Boolean })
], R.prototype, "timelineExpanded", 2);
N([
  C({ type: Boolean })
], R.prototype, "logExpanded", 2);
N([
  C({ type: Boolean })
], R.prototype, "speedExpanded", 2);
N([
  C({ type: String })
], R.prototype, "error", 2);
N([
  C({ type: String })
], R.prototype, "rangeWarning", 2);
N([
  C({ type: String })
], R.prototype, "panelId", 2);
N([
  C({ type: Number })
], R.prototype, "replaySpeed", 2);
N([
  C({ type: String })
], R.prototype, "currentTimeLabel", 2);
N([
  C({ type: String })
], R.prototype, "startInputValue", 2);
N([
  C({ type: String })
], R.prototype, "endInputValue", 2);
R = N([
  Pt("easy-floorplan-replay-panel")
], R);
const Zh = "--fp-color-", Yh = 24;
function oe(t) {
  return typeof t != "string" ? "" : t.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
}
function Jh(t) {
  return Zh + oe(t);
}
function Fe(t) {
  if (!Array.isArray(t)) return [];
  const e = /* @__PURE__ */ new Set(), n = [];
  for (const r of t) {
    if (!r || typeof r != "object") continue;
    const { name: i, color: o } = r, s = oe(i), a = z(o);
    if (!(!s || !a || e.has(s)) && (e.add(s), n.push({ name: i.trim(), color: a }), n.length >= Yh))
      break;
  }
  return n;
}
function Qh(t) {
  return Fe(t).map((e) => `${Jh(e.name)}:${e.color};`).join("");
}
function tp(t) {
  return Fe(t).map((e) => `${oe(e.name)}=${e.color}`).join(",");
}
const ep = /^[Vv][Aa][Rr]\(\s*--fp-color-([\p{L}\p{N}-]+)\s*(?:,((?:[^()]|\([^()]*\))*))?\)$/u;
function np(t) {
  return ip(t)?.slug;
}
function ip(t) {
  if (typeof t != "string") return;
  const e = ep.exec(t.trim());
  if (!e) return;
  const n = e[2]?.trim();
  return { slug: e[1], fallback: n || void 0 };
}
function rp(t, e) {
  const n = np(t);
  if (!n) return t;
  const r = Fe(e).find((i) => oe(i.name) === n);
  return r ? r.color : t;
}
const sp = 500, op = 250;
class ap extends HTMLElement {
  constructor() {
    super(...arguments), this.holdTime = sp, this.held = !1, this.cancelled = !1;
  }
  connectedCallback() {
    Object.assign(this.style, {
      position: "fixed",
      width: "0",
      height: "0"
    }), ["touchcancel", "mouseout", "mouseup", "touchmove", "mousewheel", "wheel", "scroll"].forEach(
      (e) => {
        document.addEventListener(
          e,
          () => {
            this.cancelled = !0, this.timer && (clearTimeout(this.timer), this.timer = void 0);
          },
          { passive: !0 }
        );
      }
    );
  }
  bind(e, n = {}) {
    e.actionHandler && lp(n, e.actionHandler.options) || (e.actionHandler ? (e.removeEventListener("touchstart", e.actionHandler.start), e.removeEventListener("touchend", e.actionHandler.end), e.removeEventListener("touchcancel", e.actionHandler.end), e.removeEventListener("mousedown", e.actionHandler.start), e.removeEventListener("click", e.actionHandler.end), e.removeEventListener("keydown", e.actionHandler.handleKeyDown)) : e.addEventListener("contextmenu", (r) => {
      r.preventDefault(), r.stopPropagation();
    }), e.actionHandler = { options: n }, !n.disabled && (e.actionHandler.start = () => {
      this.cancelled = !1, this.held = !1, n.hasHold && (this.timer = window.setTimeout(() => {
        this.held = !0;
      }, this.holdTime));
    }, e.actionHandler.end = (r) => {
      if (["touchend", "touchcancel"].includes(r.type) && this.cancelled) {
        this.timer && clearTimeout(this.timer), this.timer = void 0;
        return;
      }
      if ((r.type === "touchend" || r.type === "touchcancel") && (r.cancelable && r.preventDefault(), r.type === "touchcancel")) {
        this.timer && clearTimeout(this.timer), this.timer = void 0;
        return;
      }
      const i = r.target;
      n.hasHold && this.timer && (clearTimeout(this.timer), this.timer = void 0), n.hasHold && this.held ? Dt(i, "hold") : n.hasDoubleClick ? r.type === "click" && r.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, Dt(i, "tap");
      }, op) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, Dt(i, "double_tap")) : Dt(i, "tap");
    }, e.actionHandler.handleKeyDown = (r) => {
      ["Enter", " "].includes(r.key) && (r.preventDefault(), r.currentTarget.actionHandler.end(r));
    }, e.addEventListener("touchstart", e.actionHandler.start, { passive: !0 }), e.addEventListener("touchend", e.actionHandler.end), e.addEventListener("touchcancel", e.actionHandler.end), e.addEventListener("mousedown", e.actionHandler.start, { passive: !0 }), e.addEventListener("click", e.actionHandler.end), e.addEventListener("keydown", e.actionHandler.handleKeyDown)));
  }
}
function lp(t, e) {
  return t.hasHold === e.hasHold && t.hasDoubleClick === e.hasDoubleClick && t.disabled === e.disabled;
}
function Dt(t, e) {
  t.dispatchEvent(
    new CustomEvent("action", { detail: { action: e }, bubbles: !0, composed: !0 })
  );
}
function cp() {
  const t = document.body, e = t.querySelector("action-handler-fp-ef");
  if (e) return e;
  const n = document.createElement("action-handler-fp-ef");
  return t.appendChild(n), n;
}
customElements.get("action-handler-fp-ef") || customElements.define("action-handler-fp-ef", ap);
const dp = (t, e) => {
  cp().bind(t, e);
}, pt = te(
  class extends ee {
    update(t, [e]) {
      return dp(t.element, e), K;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render(t) {
    }
  }
), G = class G {
  constructor(e = {}) {
    this.playing = !1, this._startTime = e.startTime ?? 0, this._endTime = e.endTime ?? Number.MAX_SAFE_INTEGER, this.currentTime = this._startTime, this.speed = this._normalizeSpeed(e.initialSpeed ?? 1);
  }
  get startTime() {
    return this._startTime;
  }
  get endTime() {
    return this._endTime;
  }
  _normalizeSpeed(e) {
    return Number.isFinite(e) ? Math.min(G._MAX_SPEED, Math.max(G._MIN_SPEED, e)) : Number.isNaN(e) ? 1 : G._MAX_SPEED;
  }
  play() {
    this.playing = !0;
  }
  pause() {
    this.playing = !1;
  }
  seek(e) {
    this.currentTime = this._clamp(e);
  }
  rewind(e) {
    this.seek(this.currentTime - e);
  }
  fastForward(e) {
    this.seek(this.currentTime + e);
  }
  setPlaybackSpeed(e) {
    Number.isFinite(e) && (this.speed = Math.min(G._MAX_SPEED, Math.max(G._MIN_SPEED, e)));
  }
  tick(e) {
    if (!this.playing) return;
    const n = e / 1e3;
    this.currentTime = this._clamp(this.currentTime + n * this.speed);
  }
  _clamp(e) {
    return Math.min(this._endTime, Math.max(this._startTime, e));
  }
};
G._MIN_SPEED = 0.01, G._MAX_SPEED = 1e3;
let Zt = G, hp = 0;
class pp {
  constructor(e) {
    this._card = e, this._historyService = new es(), this.state = {
      playbackController: new Zt(),
      configured: !1,
      enabled: !1,
      ready: !1,
      error: void 0,
      historyEvents: [],
      configuredColorCache: /* @__PURE__ */ new Map(),
      loadRequested: !1,
      startTime: 0,
      endTime: 0,
      logExpanded: !1,
      timelineExpanded: !1,
      speedExpanded: !1,
      historyVisible: !1,
      rangeWarning: void 0,
      loadToken: 0,
      uiLastUpdateFrameMs: 0,
      loopId: void 0,
      lastReplayFrame: void 0,
      panelId: `fp-replay-panel-${hp++}`
    };
  }
  logReplay(e, n) {
    this._card.getConfig()?.historyReplay?.debug && console.log(e, n ?? {});
  }
  getDefaultWindow() {
    return Ph(this._card.getConfig());
  }
  normalizeWindow(e, n) {
    return Kn(e, n);
  }
  historyService() {
    return this._historyService;
  }
  clearHistoryCache() {
    this._historyService.clearCache();
  }
  syncHistoryServiceContext() {
    this._historyService.configure({
      hass: this._card.getHass(),
      watched: this.watchedEntities()
    });
  }
  watchedEntities() {
    return Hh(this._card.getConfig(), this._card.getActiveFloorId());
  }
  scopeKey() {
    return Dh(this._card.getConfig(), this._card.getActiveFloorId());
  }
  speedForRange(e, n) {
    return Fh(this._card.getConfig(), e, n);
  }
  currentTime() {
    return this.state.playbackController.currentTime;
  }
  isHistoryVisible() {
    return this.state.historyVisible;
  }
  isReplayReady() {
    return this.state.ready;
  }
  isReplayEnabled() {
    return this.state.enabled;
  }
  /**
   * Whether the replay panel is on screen: the config offers it, and it is
   * open. Both halves, because a panel that is not rendered can neither be
   * read nor closed -- so nothing behind it may draw on the plan or keep a
   * clock running.
   */
  isReplayShowing() {
    return this._replayOffered() && this.state.historyVisible;
  }
  /** Whether the config puts a replay control on the card at all. */
  _replayOffered() {
    return !!this._card.getConfig()?.historyReplay?.enabled;
  }
  /**
   * Bring replay back in line with a config that no longer offers it.
   *
   * Switching `historyReplay.enabled` off takes the panel off screen but not,
   * on its own, the state behind it: the plan went on rendering history with
   * no control left anywhere to leave it. Called from setConfig, so it also
   * covers the ordinary case of a shut panel, where it just makes sure no
   * clock is ticking against a plan nobody is replaying.
   */
  syncToConfig() {
    this.isReplayShowing() || (this.state.historyVisible = !1, this.state.playbackController.pause(), this.stopReplayLoop());
  }
  /**
   * What the plan should draw from: history at `currentTime`, or the live
   * states Home Assistant is pushing.
   *
   * The panel being open is the whole answer. Closed, replay is not a mode the
   * plan is quietly in -- it is off, whatever the controller has loaded and
   * wherever the head happens to sit, so a plan nobody has asked to rewind is
   * indistinguishable from one with the feature switched off entirely.
   *
   * "Open" means on screen, which takes the config as well as the panel --
   * see {@link isReplayShowing}.
   *
   * Deliberately blunt, because the subtle version kept failing. Replay leaked
   * into a live plan through any path that started it without anyone opening
   * the panel -- switching floors was enough, and that path parked the head at
   * the *start* of the window rather than the end -- and the symptom was
   * silent: every watched entity with a recorded state drew from an hour ago,
   * so lights that were on drew off and a presence sensor that was tripping
   * drew still, while a light toggled from the plan really did switch, because
   * the service call is live either way. Nothing on a closed panel said why
   * (issue #256).
   */
  getRenderState() {
    return {
      enabled: this.isReplayShowing() && this.state.enabled,
      currentTime: this.state.playbackController.currentTime,
      historyVisible: this.state.historyVisible
    };
  }
  clearConfigColorCache() {
    this.state.configuredColorCache.clear();
  }
  pausePlayback() {
    this.state.playbackController.pause();
  }
  formatReplayTime(e) {
    return qh(e, new Intl.DateTimeFormat(void 0, {
      dateStyle: "short",
      timeStyle: "medium"
    }));
  }
  handleRangeChange(e, n) {
    const r = n.target, i = Uh(r.value);
    e === "start" ? this.state.startTime = i : this.state.endTime = i, this.updateWindow(this.state.startTime, this.state.endTime);
  }
  updateWindow(e, n) {
    const { start: r, end: i } = Kn(e, n), o = i - r;
    this.state.rangeWarning = o < 60 ? "Very small replay window may hide expected transitions." : void 0;
    const s = this.state.playbackController.playing;
    this.state.startTime = r, this.state.endTime = i, this.clearHistoryCache(), this.state.playbackController.pause(), this.stopReplayLoop(), this._card.requestUpdate(), !(!this._card.getHass() || !this.state.historyVisible) && this.startReplay({ preserveCurrentTime: !0, keepPlaying: s });
  }
  resetForFloorChange() {
    this.state.historyEvents = [], this.state.enabled = !1, this.state.ready = !1, this.state.error = void 0, this.state.loadRequested = !1, this.state.loadToken += 1, this.clearHistoryCache(), this.stopReplayLoop(), this._card.requestUpdate(), this._card.getHass() && this.state.historyVisible && this.startReplay({ preserveCurrentTime: !0, keepPlaying: this.state.playbackController.playing });
  }
  zoomWindow(e) {
    const n = Math.max(60, this.state.endTime - this.state.startTime), r = this.state.playbackController.currentTime, i = e > 0 ? Math.max(60, n * 0.8) : n * 1.25, o = i / 2, s = Math.max(0, r - o), a = s + i;
    this.updateWindow(s, a);
  }
  /**
   * Opening and closing the panel is the whole of turning replay on and off.
   *
   * There is no separate enable switch and no button back to now, because
   * those used to be separate questions whose answers could disagree: the plan
   * could be showing an hour ago with nothing on screen saying so. Opening
   * loads the window and parks the head at its start, so replay begins where
   * the calendar says it does; closing stops the clock and hands the plan back
   * to Home Assistant.
   *
   * Closing is not a teardown. The window and its events stay loaded, so
   * reopening on the same range costs no second history fetch -- it just
   * cannot reach the plan while the panel is shut (see {@link getRenderState}).
   */
  toggleHistoryVisible(e) {
    const n = e && this._replayOffered();
    if (this.state.historyVisible = n, !n) {
      this.state.playbackController.pause(), this.stopReplayLoop(), this.logReplay("[easy-floorplan] Replay closed, plan is live"), this._card.requestUpdate();
      return;
    }
    this._card.requestUpdate(), this._card.getHass() && this.startReplay();
  }
  toggleSpeedPanel() {
    this.state.speedExpanded = !this.state.speedExpanded, this._card.requestUpdate();
  }
  toggleTimeline() {
    this.state.timelineExpanded = !this.state.timelineExpanded, this._card.requestUpdate();
  }
  toggleLog() {
    this.state.logExpanded = !this.state.logExpanded, this._card.requestUpdate();
  }
  async startReplay(e = {}) {
    if (!this._card.getHass() || !this._card.getConfig()?.historyReplay) return;
    const n = this.state.startTime || this.getDefaultWindow().start, r = this.state.endTime || this.getDefaultWindow().end, { start: i, end: o } = this.normalizeWindow(n, r);
    this.state.startTime = i, this.state.endTime = o, this.state.enabled = !0, this.state.loadRequested = !0, this.state.error = void 0, this.state.ready = !1;
    const s = e.preserveCurrentTime ? Math.min(o, Math.max(i, this.state.playbackController.currentTime)) : i;
    this.state.playbackController = new Zt({
      startTime: i,
      endTime: o,
      initialSpeed: this.speedForRange(i, o)
    }), this.state.playbackController.seek(s), e.keepPlaying && this.state.playbackController.play();
    const a = ++this.state.loadToken;
    this.logReplay("[easy-floorplan] Starting replay", { start: i, end: o, lookback: o - i }), await this.loadReplayRange(i, o, a), e.keepPlaying && this.state.enabled && this.state.playbackController.playing && this.startReplayLoop(), this._card.requestUpdate();
  }
  async loadReplayRange(e, n, r) {
    try {
      const i = this.scopeKey();
      if (await this._historyService.loadHistory(e, n, { scopeKey: i, hass: this._card.getHass(), watched: this.watchedEntities(), numericSteps: this._card.getConfig()?.historyReplay?.numericSteps }), r !== this.state.loadToken) return;
      const o = new Set(this.watchedEntities()), s = this._historyService.getEvents();
      this.state.historyEvents = s.filter((a) => o.has(a.entityId)).map((a) => ({
        ...a,
        color: Wh(a, this._card.getConfig(), this._card.getHass(), this.state.configuredColorCache, this.state.configured)
      })), this.state.ready = !0, this.state.loadRequested = !1, this.state.error = void 0, this.logReplay("[easy-floorplan] Replay history loaded", { eventCount: this.state.historyEvents.length }), this._card.requestUpdate();
    } catch (i) {
      if (r !== this.state.loadToken) return;
      this.state.ready = !1, this.state.loadRequested = !1, this.state.error = i instanceof Error ? i.message : "Unable to load history.", console.error("[easy-floorplan] Replay history loading failed", i);
    }
  }
  seekReplay(e) {
    this.state.playbackController.seek(e), this.logReplay("[easy-floorplan] Replay seek", { timestamp: e }), this._card.requestUpdate();
  }
  jumpReplay(e) {
    this.state.playbackController.seek(this.state.playbackController.currentTime + e), this.logReplay("[easy-floorplan] Replay jump", { seconds: e }), this._card.requestUpdate();
  }
  stepReplay(e) {
    if (!this.state.historyEvents.length) return;
    const n = this.state.playbackController.currentTime, r = 1e-4, i = e > 0 ? this._historyService.getEventAfter(n + r) : this._historyService.getEventBefore(n - r);
    i ? this.state.playbackController.seek(i.timestamp) : this.state.playbackController.seek(e > 0 ? this.state.playbackController.endTime : this.state.playbackController.startTime), this._card.requestUpdate();
  }
  setReplaySpeed(e) {
    this.state.playbackController.setPlaybackSpeed(e), this.logReplay("[easy-floorplan] Replay speed", { speed: e }), this._card.requestUpdate();
  }
  playReplay() {
    if (!this.state.enabled) {
      this.startReplay({ preserveCurrentTime: !0, keepPlaying: !0 });
      return;
    }
    if (!this.state.ready) {
      const e = this.state.startTime || this.state.playbackController.startTime, n = this.state.endTime || this.state.playbackController.endTime;
      this.loadReplayRange(e, n, ++this.state.loadToken);
    }
    this.state.playbackController.currentTime >= this.state.playbackController.endTime && this.state.playbackController.seek(this.state.playbackController.startTime), this.state.playbackController.play(), this.startReplayLoop(), this.logReplay("[easy-floorplan] Replay play", { currentTime: this.state.playbackController.currentTime }), this._card.requestUpdate();
  }
  pauseReplay() {
    this.state.playbackController.pause(), this.stopReplayLoop(), this.logReplay("[easy-floorplan] Replay pause", { currentTime: this.state.playbackController.currentTime }), this._card.requestUpdate();
  }
  startReplayLoop() {
    if (this.state.loopId) return;
    this.state.lastReplayFrame = void 0, this.state.uiLastUpdateFrameMs = 0;
    const e = (n) => {
      if (this.state.playbackController.playing && (this.state.lastReplayFrame === void 0 ? this.state.lastReplayFrame = n : (this.state.playbackController.tick(n - this.state.lastReplayFrame), this.state.lastReplayFrame = n, (this.state.uiLastUpdateFrameMs === 0 || n - this.state.uiLastUpdateFrameMs >= 50) && (this.state.uiLastUpdateFrameMs = n, this._card.requestUpdate())), this.state.playbackController.currentTime >= this.state.playbackController.endTime)) {
        this.pauseReplay();
        return;
      }
      this.state.loopId = window.requestAnimationFrame(e);
    };
    this.state.loopId = window.requestAnimationFrame(e);
  }
  stopReplayLoop() {
    this.state.loopId && (window.cancelAnimationFrame(this.state.loopId), this.state.loopId = void 0), this.state.lastReplayFrame = void 0;
  }
  requestUpdate() {
    this._card.requestUpdate();
  }
}
var up = Object.defineProperty, fp = Object.getOwnPropertyDescriptor, ct = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? fp(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && up(e, n, i), i;
};
const Xn = /* @__PURE__ */ new Map();
function Zn(t) {
  return t.map((e) => e.id).join("|");
}
let B = class extends Z {
  constructor() {
    super(...arguments), this._wallMaskId = `fp-wall-mask-${B._nextWallMaskId++}`, this._glowIdBase = `fp-glow-${B._nextGlowId++}`, this._watchedEntities = /* @__PURE__ */ new Set(), this._replayController = new pp({
      getConfig: () => this._config,
      getHass: () => this.hass,
      getActiveFloorId: () => this._activeFloorId,
      requestUpdate: () => this.requestUpdate()
    }), this._onOrientation = (t) => {
      this._portrait = t.matches;
    }, this._featuresOf = (t) => this.hass?.states[t]?.attributes?.supported_features ?? 0, this._lastAreaTapAt = 0;
  }
  _syncHistoryServiceContext() {
    this._replayController.syncHistoryServiceContext();
  }
  _replayCacheKey() {
    const t = this._config?.historyReplay;
    return JSON.stringify([
      t?.enabled ?? !1,
      t?.lookbackSeconds ?? null,
      t?.defaultSpeed ?? null,
      [...this._watchedEntities].sort()
    ]);
  }
  connectedCallback() {
    if (super.connectedCallback(), typeof window > "u" || !window.matchMedia) return;
    const t = window.matchMedia("(orientation: portrait)");
    this._onOrientation(t), this._unsubscribeOrientation = eh(t, this._onOrientation);
  }
  setConfig(t) {
    if (!t || typeof t != "object") throw new Error("Invalid configuration");
    const e = t;
    for (const r of ["walls", "openings", "items", "texts", "furniture", "trackers", "areas", "floors"])
      if (e[r] != null && !Array.isArray(e[r]))
        throw new Error(`Invalid configuration: "${r}" must be a list`);
    for (const r of ["width", "height", "grid", "rotation", "rotationPortrait", "rotationLandscape"])
      if (e[r] != null && typeof e[r] != "number")
        throw new Error(`Invalid configuration: "${r}" must be a number`);
    this._config = {
      ...t,
      width: t.width ?? mn,
      height: t.height ?? gn,
      walls: t.walls ?? [],
      openings: t.openings ?? [],
      items: t.items ?? [],
      texts: t.texts ?? [],
      furniture: t.furniture ?? []
    }, this._watchedEntities = vi(this._config), this._syncHistoryServiceContext(), this._replayController.clearConfigColorCache();
    const n = this._replayCacheKey();
    if (n !== this._lastReplayCacheKey && (this._lastReplayCacheKey = n, this._replayController.historyService().clearCache()), this._replayController.syncToConfig(), !this._activeFloorId) {
      const r = bt(this._config), i = Xn.get(Zn(r));
      i && r.some((o) => o.id === i) && (this._activeFloorId = i);
    }
  }
  /**
   * HA pushes a fresh `hass` on every state change anywhere in the instance —
   * for most updates nothing on this plan moved. Skip those renders entirely.
   */
  shouldUpdate(t) {
    if (!(t.size === 1 && t.has("hass"))) return !0;
    const e = t.get("hass");
    return !e || !this.hass ? !0 : Lc(e, this.hass, this._watchedEntities);
  }
  /**
   * Carry the skin as an attribute on the host, where `skinPalettes` picks it
   * up (issue #155). It has to be the host and not the template, because the
   * point is to sit *above* the `<ha-card>` a card-mod rule targets — see
   * skins.ts. Only ever a `findSkin` match, so an unrecognised `skin:` puts no
   * attribute on the element at all.
   */
  willUpdate(t) {
    if (!t.has("_config")) return;
    const e = Vr(this._config?.skin);
    e ? this.setAttribute("data-skin", e) : this.removeAttribute("data-skin");
  }
  updated(t) {
    super.updated(t), (t.has("hass") || t.has("_activeFloorId")) && this._syncHistoryServiceContext();
  }
  getCardSize() {
    return 6;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => mp), document.createElement("fp-ef-editor");
  }
  static getStubConfig() {
    return bs();
  }
  /**
   * Sections-view sizing (grid rows ≈ 56px): room for the 5:3 default canvas.
   * An instance method — HA calls it on the card element (getConfigElement /
   * getStubConfig are the static ones, called before any instance exists).
   */
  getGridOptions() {
    return { columns: 12, rows: 8, min_columns: 6, min_rows: 4 };
  }
  _isOn(t, e) {
    return et(t.entity, e?.states[t.entity]?.state);
  }
  /** How far open an opening should be drawn (0..1), from its entity (or default). */
  _openingAmount(t, e) {
    const n = t.entity ? e?.states[t.entity] : void 0;
    return Bt(t, n);
  }
  /** Whether an opening wears its accent: drawn open, or a cover still in transit. */
  _openingActive(t, e) {
    const n = t.entity ? e?.states[t.entity] : void 0;
    return ue(t, n);
  }
  /**
   * The second leaf's own state for an opening with a sensor on each — a
   * two-panel slider (issue #145) or a hinged double (issue #159).
   * `undefined` — no second sensor, or a shape with only one leaf — leaves both
   * on the first entity, so nothing about a single-sensor opening changes.
   */
  _openingSecond(t, e) {
    if (!t.secondaryEntity || !zd(t)) return;
    const n = Mi(t), r = e?.states[t.secondaryEntity];
    return { amount: Bt(n, r), active: ue(n, r) };
  }
  /** floorplan-panel: states of leaves 3 and 4; a leaf without a sensor follows the first. */
  _openingMore(t, e) {
    const n = Ht(t);
    if (n < 3 || !t.extraEntities?.some(Boolean)) return;
    const r = [];
    for (let i = 2; i < n; i++) {
      const o = t.extraEntities[i - 2];
      if (!o) {
        r.push({ amount: this._openingAmount(t, e), active: this._openingActive(t, e) });
        continue;
      }
      const s = Nd(t, i), a = e?.states[o];
      r.push({ amount: Bt(s, a), active: ue(s, a) });
    }
    return r;
  }
  /**
   * The same for a hinged shutter's other panel (issue #159). Read from its
   * own key and its own resolvers — the shutter answers to `shutterInvert` and
   * is drawn from `shutterAmount` / `shutterActive`, not the sash's — and only
   * for a `swing` shutter, since a roll curtain has no second panel to drive.
   */
  _shutterSecond(t, e) {
    if (!t.shutterSecondaryEntity || Nn(t) !== "swing") return;
    const n = e?.states[t.shutterSecondaryEntity];
    return {
      amount: mt(n, t.shutterInvert),
      active: pe(n, t.shutterInvert)
    };
  }
  _itemIcon(t, e) {
    return $d(
      t,
      e?.states[t.entity],
      this.hass?.entities?.[t.entity]?.icon
    );
  }
  _label(t, e) {
    return t.name ?? e?.states[t.entity]?.attributes?.friendly_name ?? t.entity ?? "";
  }
  disconnectedCallback() {
    this._replayController.stopReplayLoop(), this._unsubscribeOrientation?.(), this._unsubscribeOrientation = void 0, super.disconnectedCallback();
  }
  _handleItemAction(t, e) {
    this.hass && St(this, this.hass, e, bi(e, t.detail.action));
  }
  /** What a gesture on this opening would do, if anything. */
  _openingPress(t, e) {
    return Ii(t, e, this._featuresOf);
  }
  /**
   * Pressing an opening (issue #74 follow-up). Which entity answers — the
   * window/door or its shutter — is {@link openingActionForGesture}'s call;
   * from here it is the same Lovelace dispatch every device uses.
   */
  _onOpeningAction(t, e) {
    if (!this.hass) return;
    const n = this._openingPress(e, t.detail.action);
    n && St(this, this.hass, { entity: n.entity }, n.config);
  }
  /**
   * The shutter badge (issue #74 follow-up): the shutter entity's own icon,
   * beside an opening that binds both a window/door and a shutter.
   *
   * HTML rather than SVG, like the device badges: it holds a real `ha-icon`.
   * And like them it follows `overlayScale` (#148) — fixed pixels by default,
   * so it stays legible whatever canvas units the author chose, or canvas
   * units under `plan`, so it shrinks with the drawing instead of towering
   * over a scaled-down one. Both offsets follow the same choice, or the badge
   * would drift off the opening at one scale and sit on it at another.
   *
   * The glyph carries the open/closed reading on its own — HA's shutter icons
   * come in pairs — and the accent says the same thing again in colour.
   *
   * Tapping it opens the shutter, whatever the opening's own tap does. That is
   * the point of drawing it: the entity the opening symbol does not lead with
   * gets a control of its own, instead of living behind a press-and-hold
   * nobody can see.
   */
  _renderShutterMark(t, e, n, r, i) {
    const o = t.shutterEntity, s = i?.states[o], a = mt(s, t.shutterInvert) > 0, l = pe(s, t.shutterInvert), c = Gd(t, s, a, this.hass?.entities?.[o]?.icon), u = z(t.shutterActiveColor ?? t.activeColor) ?? P, p = Li(t), d = gt(p.x, p.y, e.width, e.height, n), f = st(e.width, e.height, n), b = Oi(t, n), m = U(Hn, r), g = `translate(calc(${b.x} * ${m}), calc(${b.y} * ${m}))`, w = U(Dn, r), E = i?.states[o]?.attributes?.friendly_name ?? o;
    return S`
      <div
        class="shutter-mark ${l ? "on" : "off"}"
        data-entity=${tt(o) ?? y}
        style="left:${d.x / f.w * 100}%; top:${d.y / f.h * 100}%;
               width:${w};height:${w};
               transform:translate(-50%,-50%) ${g};--fp-active:${u};"
        title="${E} · ${zt(i, o)}"
        role="button"
        tabindex="0"
        @action=${() => {
      this.hass && St(this, this.hass, { entity: o }, { action: "more-info" });
    }}
        .actionHandler=${pt({})}
      >
        <ha-icon
          icon=${c}
          style="--mdc-icon-size:${U(Fn, r)};"
        ></ha-icon>
      </div>
    `;
  }
  /**
   * The opening's own badge (issue #154 follow-up) — the same circle as the
   * shutter's, for the entity the opening symbol itself draws.
   *
   * Opt-in, because most symbols need no help: a leaf that has swung and a
   * panel that has slid are both still on screen, in the accent, saying so. A
   * roll-up is the one that isn't — its curtain leaves the floor plane, and
   * wide open the gap holds a single coloured line. That line is honest and
   * easy to miss, so this puts the entity's own open/closed glyph beside it.
   *
   * It sits on the far side of the wall from the shutter's badge, which is
   * what keeps the two from stacking on an opening that draws both.
   */
  _renderOpeningMark(t, e, n, r, i) {
    const o = t.entity, s = i?.states[o], a = this._openingAmount(t, i) > 0, l = this._openingActive(t, i), c = Zd(t, s, a, this.hass?.entities?.[o]?.icon), u = z(t.activeColor) ?? P, p = Yd(t), d = gt(p.x, p.y, e.width, e.height, n), f = st(e.width, e.height, n), b = Jd(t, n), m = U(Hn, r), g = `translate(calc(${b.x} * ${m}), calc(${b.y} * ${m}))`, w = U(Dn, r), E = i?.states[o]?.attributes?.friendly_name ?? o;
    return S`
      <div
        class="shutter-mark ${l ? "on" : "off"}"
        data-entity=${tt(o) ?? y}
        style="left:${d.x / f.w * 100}%; top:${d.y / f.h * 100}%;
               width:${w};height:${w};
               transform:translate(-50%,-50%) ${g};--fp-active:${u};"
        title="${E} · ${zt(i, o)}"
        role="button"
        tabindex="0"
        @action=${() => {
      this.hass && St(this, this.hass, { entity: o }, { action: "more-info" });
    }}
        .actionHandler=${pt({})}
      >
        <ha-icon
          icon=${c}
          style="--mdc-icon-size:${U(Fn, r)};"
        ></ha-icon>
      </div>
    `;
  }
  /**
   * Switch to a floor, from the switcher or from a staircase (issue #121).
   *
   * Shared so the two cannot drift apart on the things that are easy to
   * forget: remembering the choice for the next preview the editor builds, and
   * dropping a zoom that belonged to the floor being left.
   */
  _goToFloor(t, e) {
    const n = this._activeFloorId === e;
    this._activeFloorId = e, Xn.set(Zn(t), e), this._zoomedAreaId && this._emitAreaTap(this._zoomedAreaId, !1), this._zoomedAreaId = void 0, !(n || !this.hass || !this._config?.historyReplay?.enabled) && this._replayController.resetForFloorChange();
  }
  /** floorplan-panel: service floorplan_panel.show_room — jump to a room (id or name) and zoom in. */
  showRoom(t, e) {
    if (!this._config) return !1;
    const n = bt(this._config), r = t.toLowerCase();
    for (const i of n) {
      if (e && i.id !== e) continue;
      const o = i.areas.find((s) => s.id === t || (s.name ?? "").toLowerCase() === r);
      if (o)
        return this._goToFloor(n, i.id), this._zoomedAreaId = o.id, this._emitAreaTap(o.id, !0), !0;
    }
    return !1;
  }
  /** floorplan-panel: service floorplan_panel.reset_view — zoom back out. */
  resetView() {
    if (!this._zoomedAreaId) return;
    const t = this._zoomedAreaId;
    this._zoomedAreaId = void 0, this._emitAreaTap(t, !1);
  }
  _emitAreaTap(t, e) {
    this.dispatchEvent(
      new CustomEvent("fp-area-tap", {
        detail: { areaId: t, floorId: this._activeFloorId, zoomed: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _onAreaClick(t) {
    const e = Date.now();
    t.id === this._lastAreaTapId && e - this._lastAreaTapAt < 350 || (this._lastAreaTapAt = e, this._lastAreaTapId = t.id, this._zoomedAreaId = this._zoomedAreaId === t.id ? void 0 : t.id, this.dispatchEvent(
      new CustomEvent("fp-area-tap", {
        detail: { areaId: t.id, floorId: this._activeFloorId, zoomed: this._zoomedAreaId === t.id },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  /**
   * A gesture on a room (issue #181): its configured action, or — for a tap
   * with nothing configured — the zoom the room has always done.
   *
   * The fallback is what keeps this backwards compatible. Every plan drawn
   * before areas had actions has three unset gestures, so every tap still
   * zooms and hold and double-tap still do nothing.
   */
  _onAreaAction(t, e) {
    const n = jt(e, t.detail.action);
    if (!n) {
      t.detail.action === "tap" && this._onAreaClick(e);
      return;
    }
    this.hass && St(this, this.hass, { entity: n.entity }, n.config);
  }
  _renderBadge(t, e, n) {
    const r = L(t.size, pi), i = U(r, e), o = t.entity ? n?.states[t.entity] : void 0, s = bd(t, o?.state, o?.attributes), a = In(t) === "value" ? Ed(n, t) : void 0;
    return S`
      <div
        class="badge"
        style="width:${i};height:${i};transform:rotate(${L(t.angle, 0)}deg);"
      >
        ${a ? S`<span
              class="badge-value"
              style="font-size:${U(Rd(r, a), e)};"
              >${a}</span
            >` : S`<ha-icon
              class=${s ? `anim-${s}` : ""}
              icon=${this._itemIcon(t, n)}
              style="--mdc-icon-size:${U(vd(r), e)};"
            ></ha-icon>`}
      </div>
    `;
  }
  /**
   * Start the ink ripple at the point that was actually touched (issue #134).
   * Positions are real screen pixels off the event, so they are unaffected by
   * overlayScale — the ink lands where the finger did at any plan scale.
   *
   * The position cannot come from CSS — only the event knows where the finger
   * landed — so it is handed over as two custom properties and the animation
   * itself stays in the stylesheet.
   *
   * Restarting needs the reflow: re-adding a class whose animation is still
   * running is a no-op, so a quick second tap would draw nothing at all.
   * Listeners are passive and only write style, so the gesture detection in
   * `actionHandler` is untouched.
   */
  _startInk(t) {
    const e = t.currentTarget, n = e?.querySelector(".press-ink");
    if (!n) return;
    const r = e.getBoundingClientRect();
    n.style.setProperty("--fp-ink-x", `${t.clientX - r.left}px`), n.style.setProperty("--fp-ink-y", `${t.clientY - r.top}px`), n.classList.remove("inking"), n.offsetWidth, n.classList.add("inking");
  }
  _renderItem(t, e, n, r, i) {
    const o = this._isOn(t, i), s = Zc(i, t), a = t.entity ? i?.states[t.entity] : void 0, l = Ai(t, a), c = z(Oe(t.stateColor, l)), u = Qc(t, c), p = !!this.hass && Rn(t, a?.state), d = Gc(t, a?.state, i), f = In(t) !== "none", b = t.display ?? "badge", m = Dc(a), g = z(t.activeColor) ?? m, w = o || p ? void 0 : z(t.inactiveColor), E = t.rippleColor ?? c ?? t.activeColor ?? m ?? P, h = Ur(
      rp(
        c ?? (o ? g : w),
        this._config?.palette
      )
    ), v = t.rippleSize ?? ui, _ = t.rippleDirection ?? fi, A = t.rippleWidth ?? yi, k = d ? "visibility: hidden; pointer-events: none;" : "";
    let I = y;
    b === "ripple" ? I = S`<span style="${k}">
        ${qn(o, E, v, _, A, 3, r)}
      </span>` : b === "iconRipple" ? I = S`<div class="stack" style="${k}">
        ${qn(o, E, v, _, A, 3, r)}
        ${f ? S`<div class="stack-icon">${this._renderBadge(t, r, i)}</div>` : y}
      </div>` : f && (I = S`<span style="${k}">
        ${this._renderBadge(t, r, i)}
      </span>`);
    const H = gt(t.x, t.y, e.width, e.height, n), T = st(e.width, e.height, n), M = xc(t);
    return S`
      <div
        class="item fp-item ${o ? "on" : "off"} ${p ? "offline" : ""} ${c ? "state-colored" : ""} ${w ? "inactive-colored" : ""} ${M ? "interactive" : ""}"
        data-id=${j(t.id) ?? y}
        data-entity=${tt(t.entity) ?? y}
        data-kind=${j(t.kind) ?? y}
        style="left:${H.x / T.w * 100}%; top:${H.y / T.h * 100}%;${c ? `--fp-state:${c};` : ""}${g ? `--fp-active:${g};` : ""}${w ? `--fp-inactive:${w};` : ""}${h ? `--fp-ink:${h};` : ""}"
        title=${this._label(t, i)}
        role=${M ? "button" : y}
        tabindex=${M ? "0" : y}
        @action=${(x) => this._handleItemAction(x, t)}
        .actionHandler=${pt({
      hasHold: Y(t.hold_action),
      hasDoubleClick: Y(t.double_tap_action),
      // Unbinds the gesture listeners outright, so keyboard activation
      // cannot reach an action that would do nothing.
      disabled: !M
    })}
        @pointerdown=${M && he(e) === "ripple" ? (x) => this._startInk(x) : y}
      >
        ${I}
        ${M && he(e) === "ripple" ? S`<span class="press-ink" aria-hidden="true"></span>` : y}
        ${s ? S`<span
              class="label ${I === y ? "inflow" : ""} label-${Yc(t)}"
              style="font-size:${U(Jc(t.labelSize), r)};${u ? `color:${u};` : ""}"
              >${s}</span
            >` : y}
      </div>
    `;
  }
  _renderAreaLabel(t, e, n, r) {
    if (!t.name || (t.showName ?? !0) === !1) return y;
    const i = Sh(t.points), o = gt(i.x, i.y, e.width, e.height, n), s = st(e.width, e.height, n), a = rd(t.labelSize, r);
    return S`
      <div
        class="area-label"
        style="left:${o.x / s.w * 100}%; top:${o.y / s.h * 100}%;${a}"
      >
        ${t.name}
      </div>
    `;
  }
  _renderText(t, e, n, r) {
    const i = gt(t.x, t.y, e.width, e.height, n), o = st(e.width, e.height, n);
    return S`
      <div
        class="text fp-text"
        data-id=${j(t.id) ?? y}
        style="left:${i.x / o.w * 100}%; top:${i.y / o.h * 100}%;
               font-size:${U(L(t.size, ms), r)};
               color:${q(t.color, Wr)};
               transform:translate(-50%,-50%) scale(var(--fp-inv-zoom,1)) rotate(${L(t.angle, 0)}deg);"
      >
        ${Pc(this.hass, t)}
      </div>
    `;
  }
  render() {
    if (!this._config) return S`${y}`;
    const t = this._config, e = this._replayController.getRenderState(), n = Cr(this.hass, this._watchedEntities, this._replayController.historyService(), e.enabled, e.currentTime), r = bt(t), i = r.find((h) => h.id === this._activeFloorId) ?? r.find((h) => h.id === t.defaultFloor) ?? r[0], o = th(t, this._portrait), s = st(L(t.width, mn), L(t.height, gn), o), a = nh(t.width, t.height, o), l = id(t.overlayScale), c = t.sunDimming ? ih(
      n?.states["sun.sun"]?.attributes?.elevation,
      L(t.sunBrightnessMin, di),
      L(t.sunBrightnessMax, ye)
    ) : ye, u = t.showDeadSpaces ? Rc(i.walls, i.openings) : [], d = (t.sunDimming || i.items.some((h) => h.glow)) && this.optionen?.wandverdeckung !== !1 ? ki(
      i.walls,
      i.openings,
      (h) => (
        // Both leaves, and the travel each style actually has (issue #145):
        // asking `entity` alone left a door whose *second* panel was open
        // still blocking light outright. Glass admits it whole regardless
        // of sash — a closed window is not a hole, but light still gets
        // through it. A shutter rolled down overrides that, same as it
        // does for sunlight.
        Uc(
          h,
          this._openingAmount(h, n),
          this._openingSecond(h, n)?.amount,
          h.shutterEntity ? mt(n?.states[h.shutterEntity], h.shutterInvert) : void 0,
          this._openingMore(h, n)?.map((v) => v.amount)
        )
      )
    ) : this.optionen?.wandverdeckung === !1 ? void 0 : i.walls, f = `${this._glowIdBase}-sundim`, b = t.sunDimming ? Wc(
      i.items,
      n?.states,
      t.width,
      t.height,
      f,
      d
    ) : y, m = i.areas?.find((h) => h.id === this._zoomedAreaId), g = m ? Eh(
      m.points,
      t.width,
      t.height,
      o,
      void 0,
      void 0,
      // A room may say how close to go; without one the fit decides,
      // exactly as it always has (issue #222).
      Ah(m)
    ) : $e, w = t.compactHeader === !0, E = w && !!t.title;
    return S`
      <!-- The skin (issue #122) rides on the card rather than on .plan, so the
           floor switcher and the card's own background follow it too — a Tron
           plan floating on a white card would read as a bug. Every token the
           card draws with is declared on :host, so this only ever overrides. -->
      <!-- No skin style here: the palette comes from data-skin on the host, so
           a card-mod rule on this element still wins (issue #155). -->
      <!-- The card header is a fixed ~76px whether the title is "U8" or a
           sentence, and every part of it lives inside ha-card's shadow root
           where no rule of ours reaches. compactHeader therefore does not
           shrink it — it declines it, and draws the title inside the stage
           instead, where it costs no layout height at all (issue #152). -->
      <!-- The palette (issue #265) rides here, above everything that could
           name one of its colours — the floor switcher and the card background
           as well as the plan. Inline rather than on :host like the skin
           tokens, because unlike a skin it is per-config data and there is no
           fixed set of rules to write ahead of time. It declares only
           --fp-color-* names, so a card-mod rule on this element still owns
           every --fp-skin-* token exactly as issue #155 left it. -->
      <ha-card
        .header=${w ? y : t.title ?? y}
        style=${Qh(t.palette) || y}
      >
        <div class="card-shell ${this._replayController.isHistoryVisible() ? "replay-visible" : ""}">
          ${this._config.historyReplay?.enabled ? this._renderReplayPanel() : y}
          <div
            class="stage press-${he(t)} offline-${xd(t)} ${E ? "compact-title" : ""}"
            style="aspect-ratio: ${s.w} / ${s.h};"
          >
          <!-- The plan box: exactly the canvas ratio, fitted inside whatever
               height the card was actually given, and centred there (closes
               #115). Sized off the container's height so it shrinks when the
               height is the binding axis — clamping a full-width box with
               max-height instead would break the ratio rather than the box.

               The stage carries the same aspect-ratio so it still has a
               definite height in a content-sized (masonry) card; without it,
               size containment leaves 100cqh with nothing to resolve against
               and the plan collapses to nothing. -->
          <div
            class="plan ${l === "plan" ? "scale-plan" : ""}"
            style="aspect-ratio: ${s.w} / ${s.h};
                   width: min(100%, calc(100cqh * ${s.w} / ${s.h}));
                   --fp-plan-w: ${s.w};
                   background:${q(t.background, Te)};"
          >
          <!-- preserveAspectRatio="none" is correct here, and it took a wrong
               fix to see why. Fitting the plan into a card that is the wrong
               shape for it is .plan's job, not this line's (#115): .plan
               carries the canvas ratio, so the SVG's box always matches its
               viewBox, and "none" and "meet" are equivalent while that holds.

               "none" is still the deliberate choice, because it is the one
               that fails safely. The .items overlay is HTML, positioned with
               raw left/top percentages of .plan, and it does not letterbox. So
               if anything ever overrides .plan's ratio (card-mod, a grid row
               count), "meet" letterboxes the SVG away from the overlay and
               every icon drifts off the wall it was placed on, while "none"
               stretches both layers identically: distorted, but aligned. -->
          <!-- Zoom-to-room (tap an area). One wrapper around both the SVG and
               the HTML overlay so a CSS transform here reframes both layers
               identically — see areaZoomTransform. Wraps the keyed() skin
               block below rather than sitting inside it, so a skin change
               (which rebuilds that subtree) never disturbs this transform. -->
          <div
            class="plan-zoom"
            style="transform: translate(${g.txPercent}%, ${g.tyPercent}%) scale(${g.scale});"
          >
          <!-- Keyed on the skin (issue #122). A skin changes custom properties on
               an ancestor, and Chromium does not repaint an SVG element whose
               colour comes from a var() inside a presentation attribute or an
               inline style unless something else about it changes — Lit writes
               the same attribute string either way, so switching skins left
               every door, window and room fill painted in the previous skin's
               colours while the computed values were already correct. Keying
               rebuilds the subtree instead, which repaints by construction.
               Only on a skin change; ordinary state updates are untouched.

               Recolouring a palette entry (issue #265) is the same change seen
               from the other end — a custom property moving under a var() in a
               presentation attribute — so it is in this key too. -->
          ${Ar(
      `${t.skin ?? ""}|${tp(t.palette)}`,
      $`<svg viewBox="0 0 ${s.w} ${s.h}" preserveAspectRatio="none">
            <g transform=${a || y}>
            ${i.image ? $`<image href=${i.image} x="0" y="0" width=${t.width} height=${t.height}
                          preserveAspectRatio=${_h(i.imageFit)}
                          opacity=${i.imageOpacity ?? 1} />` : y}
            ${i.areas?.map((h) => {
        const v = Dd(h);
        return $`<g class="area-tap-target"
                    role=${v ? "button" : y}
                    tabindex=${v ? "0" : y}
                    @action=${(_) => this._onAreaAction(_, h)}
                    .actionHandler=${pt({
          // Only wait out the timers when a gesture can resolve:
          // otherwise every tap on an ordinary room would sit for
          // 500ms before zooming.
          hasHold: Y(jt(h, "hold")?.config),
          hasDoubleClick: Y(jt(h, "double_tap")?.config)
        })}>
                  ${Oh(h, Tn(h, h.entity ? n?.states[h.entity]?.state : void 0))}
                </g>`;
      })}
            <!-- Dead spaces (issue #88): the regions the walls seal off that no
                 door or window reaches, hatched. Above the room fills, so a
                 region someone has also drawn an area over still reads as
                 unreachable; below everything else, because it describes the
                 floor rather than anything standing on it. -->
            ${u.length ? $`${Ih(`${this._wallMaskId}-dead`)}
                    ${u.map(
        (h) => Rh(h, `${this._wallMaskId}-dead`)
      )}` : y}
            <!-- Light pools (issue #6). Above the room fills but below the
                 furniture and walls, so light reads as cast onto the floor
                 rather than painted over the plan. Isolated as one layer: the
                 pools screen-blend with each other (two lamps brighten where
                 they meet) without screening against the plan beneath, which
                 would wash out on a light theme. -->
            ${qc(
        i.furniture,
        t.width,
        t.height,
        `${this._glowIdBase}-mask`,
        Sn(t.symbols)
      )}
            <g class="fp-glows${this.optionen?.schein === "einfach" ? " schein-einfach" : ""}"
               mask=${i.furniture.length ? `url(#${this._glowIdBase}-mask)` : y}>
              ${i.items.map((h, v) => {
        if (!h.glow || this.optionen?.schein === "aus") return y;
        const _ = xi(h, n?.states[h.entity]);
        return _ ? Bc(h, _, `${this._glowIdBase}-${v}`, d) : y;
      })}
            </g>
            ${i.furniture.map((h) => {
        const v = zh(
          h,
          Hc(h, h.entity ? n?.states[h.entity]?.state : void 0),
          Sn(t.symbols)
        ), _ = wd(h, r, i.id);
        if (!_) return v;
        const A = r.find((k) => k.id === _)?.name;
        return $`<g class="fp-furniture-link" role="button" tabindex="0"
                    @action=${() => this._goToFloor(r, _)}
                    .actionHandler=${pt({
          // A staircase has one gesture. Saying so keeps a tap from
          // sitting out the hold and double-tap timers before it
          // does anything.
          hasHold: !1,
          hasDoubleClick: !1
        })}>
                  <!-- An SVG tooltip is a <title> child, not a title=
                       attribute: the attribute does nothing here. -->
                  <title>${A ? `Go to ${A}` : "Go to the next floor"}</title>
                  ${v}
                </g>`;
      })}
            <!-- Sunlight through the openings. Under the walls on purpose:
                 light lands on the floor, and the walls stay crisp lines over
                 it rather than being tinted by the patches they let in. The
                 sun dimming further down is the whole-sky reading and still
                 has the last word — at night there is nothing to let in. -->
            ${t.sunlight ? xh(
        i.walls,
        i.openings,
        t.width,
        t.height,
        `${this._wallMaskId}-sun`,
        {
          // Both halves of the sun come from the same entity while
          // the plan follows it: the azimuth says where the light
          // comes from, the elevation whether there is any at all.
          // A plan that pins its own angle keeps its light on —
          // see sunlightStrengthOf.
          dir: $h(
            t,
            n?.states["sun.sun"]?.attributes?.azimuth
          ),
          strength: lh(
            t,
            n?.states["sun.sun"]?.attributes?.elevation
          ),
          // How far a patch carries, shortened as the sun climbs
          // (issue #185): a midday sun drops its light almost
          // straight down and lays a short patch, an evening one
          // rakes it across the room. A pinned bearing states a
          // picture rather than reading the sky, so it keeps the
          // plain reach — same rule as the strength above.
          // Coerced here so the elevation still scales a sane
          // base — cssNumber is what the sun brightness above
          // already uses on its own hand-edited numbers. The
          // bounds live at the sink, in sunReachFraction.
          reach: L(t.sunReach, Ni) * (re(t) ? 1 : yh(n?.states["sun.sun"]?.attributes?.elevation)),
          // The gap each style actually clears, both leaves
          // included — the same reading the lamps get above, and
          // for the same reason (#145): `entity` alone leaves a
          // door whose *second* panel is open reading as shut,
          // and a converging pair reading as twice as clear as it
          // draws. Glazing and shutters are applied on top of
          // this, inside openingSunFraction.
          openAmount: (h) => _i(
            h,
            this._openingAmount(h, n),
            this._openingSecond(h, n)?.amount,
            this._openingMore(h, n)?.map((v) => v.amount)
          ),
          // A shutter that is all the way down stops the light, as
          // one does. Undefined where none is bound, so an opening
          // without a shutter is judged on itself alone.
          shutterOpen: (h) => h.shutterEntity ? mt(n?.states[h.shutterEntity], h.shutterInvert) : void 0,
          light: t.sunlightColor ?? ge,
          shade: t.sunShade === !1 ? null : t.sunShadeColor ?? be
        }
      ) : y}
            ${kh(i.openings, t.width, t.height, this._wallMaskId)}
            ${i.walls.map(
        (h) => $`
                <g class="fp-wall-neon"><line x1=${h.x1} y1=${h.y1} x2=${h.x2} y2=${h.y2}
                      class="wall fp-wall" data-id=${j(h.id) ?? y}
                      mask=${`url(#${this._wallMaskId})`}
                      style=${nd(h.thickness)} stroke-linecap="round" /></g>`
      )}
            <!-- Room outlines, above the walls they trace. An area polygon runs
                 down the centerline of the room's walls, so an outline drawn
                 with the fill is buried under the wall and never seen. Drawn
                 here it colors the wall instead. Same mask as the walls above,
                 so a doorway is a gap in the outline exactly as it is a gap in
                 the wall. Each live outline is clipped to its own room, so a
                 shared wall splits down the middle rather than going to
                 whichever area happens to sit later in the config. -->
            <g mask=${`url(#${this._wallMaskId})`}>
              ${i.areas?.map(
        (h, v) => Lh(
          h,
          Tn(h, h.entity ? n?.states[h.entity]?.state : void 0),
          `${this._wallMaskId}-area-${v}`
        )
      )}
            </g>
            ${ft(
        // Keyed by id: switching floors must create fresh DOM nodes.
        // Unkeyed, Lit morphs floor A's openings into floor B's, and the
        // 0.5s leaf/panel transitions animate the leftover state — a
        // window briefly plays a door swing (issue #50).
        i.openings,
        (h, v) => h.id || v,
        (h) => {
          const v = this._openingAmount(h, n), _ = h.shutterEntity ? n?.states[h.shutterEntity] : void 0, A = Qd(h, {
            color: ai,
            // The closed tone (issue #228). Absent, the moving parts stay
            // the wall colour, which is what a closed opening always was —
            // and that is also what an opening whose contact has dropped
            // out falls back to, so a dead sensor does not draw the same
            // emphatic "shut" as a door that really is (issue #162).
            // Guarded on `hass` for the same reason the device path is:
            // before the first states arrive every opening would read as
            // offline and the closed colour would flash off on load.
            inactive: this.hass && Rn(h, h.entity ? n?.states[h.entity]?.state : void 0) ? void 0 : h.inactiveColor,
            open: v > 0,
            amount: v,
            active: this._openingActive(h, n),
            accent: h.activeColor ?? P,
            // Per-leaf state for a two-sensor biparting slider (issue #145).
            second: this._openingSecond(h, n),
            more: this._openingMore(h, n),
            // External roller shutter layer (issue #74). No entity bound
            // yet → previewed shut, like a static plan.
            shutter: h.shutterEntity ? {
              amount: mt(_, h.shutterInvert),
              active: pe(_, h.shutterInvert),
              style: Nn(h),
              // The shutter's own accent, falling back to the
              // opening's and then to the skin's.
              accent: h.shutterActiveColor ?? h.activeColor ?? P,
              flip: h.shutterFlipV,
              // Per-panel state for a two-contact hinged shutter
              // (issue #159).
              second: this._shutterSecond(h, n)
            } : void 0
          });
          if (!Fd(h, this._featuresOf)) return A;
          const k = h.length / 2, I = D + 4;
          return $`<g class="fp-opening" role="button" tabindex="0"
                    @action=${(H) => this._onOpeningAction(H, h)}
                    .actionHandler=${pt({
            // Only wait out the hold/double-tap timers when a gesture
            // actually resolves: otherwise every tap on a plain
            // contact sensor would sit for 500ms before answering.
            hasHold: Y(this._openingPress(h, "hold")?.config),
            hasDoubleClick: Y(this._openingPress(h, "double_tap")?.config)
          })}>
                  ${A}
                  <rect class="fp-opening-hit" x=${h.x - k} y=${h.y - I / 2}
                        width=${h.length} height=${I}
                        transform="rotate(${h.angle} ${h.x} ${h.y})" />
                </g>`;
        }
      )}
            ${ft(
        i.trackers ?? [],
        (h, v) => h.id || v,
        (h) => Nh(h, {
          xReading: Vn(n?.states, h.xSensor?.entity),
          yReading: Vn(n?.states, h.ySensor?.entity),
          xPresent: bn(n?.states, h.xSensor?.presence),
          yPresent: bn(n?.states, h.ySensor?.presence)
        })
      )}
            <!-- Sun dimming (issue #113). Last inside the rotated group, so it
                 covers the whole plan; the device overlay below is HTML and
                 stays at full brightness, keeping icons and state readable at
                 night. pointer-events:none is not optional — this rect spans
                 the canvas, and without it every tappable opening underneath
                 stops responding (the lesson from #108). -->
            ${t.sunDimming ? $`${b}<rect class="fp-sun-dim"
                            x=${-D} y=${-D}
                            width=${t.width + D * 2}
                            height=${t.height + D * 2}
                            fill="#000"
                            mask=${b === y ? y : `url(#${f})`}
                            opacity=${1 - c} />` : y}
            </g>
          </svg>`
    )}
          <div
            class="items"
            style="--fp-inv-zoom:${Th(g.scale, t.zoomedOverlayScale)};"
          >
            ${i.areas?.map((h) => this._renderAreaLabel(h, t, o, l))}
            ${i.texts.map((h) => this._renderText(h, t, o, l))}
            ${ft(
      // Keyed like the openings above: a floor switch must build fresh
      // nodes rather than morph one floor's badges into another's.
      i.openings.filter((h) => Vd(h)),
      (h, v) => `${h.id || v}-shutter`,
      (h) => this._renderShutterMark(h, t, o, l, n)
    )}
            ${ft(
      i.openings.filter((h) => Xd(h)),
      (h, v) => `${h.id || v}-opening`,
      (h) => this._renderOpeningMark(h, t, o, l, n)
    )}
            ${ft(
      // No entity filter: devices that exist physically but have no HA
      // entity still deserve their badge (issue #39). Keyed by id so a
      // floor switch builds fresh DOM (see the openings comment).
      // "Only when active" devices drop out here (issue #55), and so do
      // the ones that only show inside their own room (#222) — the
      // editor still draws them, dimmed, so they stay editable.
      i.items.filter(
        (h) => !Vc(
          h,
          h.entity ? n?.states[h.entity]?.state : void 0
        ) && !Kc(h, m)
      ),
      (h, v) => h.id || v,
      (h) => this._renderItem(h, t, o, l, n)
    )}
          </div>
          </div>
          ${g.scale > 1 ? S`<button
                class="zoom-out"
                title="Zoom out"
                aria-label="Zoom out"
                @click=${() => this._zoomedAreaId = void 0}
              >
                <ha-icon icon="mdi:magnify-minus-outline"></ha-icon>
              </button>` : y}
          ${E ? S`<div class="plan-title">${t.title}</div>` : y}
          ${r.length > 1 ? this._renderFloorSwitcher(r, i, w) : y}
        </div>
        </div>
      </ha-card>
    `;
  }
  _renderReplayPanel() {
    return Xh(Gh(this._replayController));
  }
  _renderFloorSwitcher(t, e, n = !1) {
    return S`
      <div class="floor-switcher ${n ? "row" : ""}">
        ${t.map((r) => {
      const i = r.id === e.id ? z(r.color) : void 0;
      return S`
            <button
              class=${r.id === e.id ? "active" : ""}
              title=${r.name}
              style=${i ? `background:${i};border-color:${i};` : y}
              @click=${() => this._goToFloor(t, r.id)}
            >
              ${r.short || r.name}
            </button>
          `;
    })}
      </div>
    `;
  }
};
B._nextWallMaskId = 0;
B._nextGlowId = 0;
B.styles = [
  Gr,
  Kr,
  vt`
    ha-card {
      height: 100%;
      box-sizing: border-box;
      overflow: hidden;
      /* The skin paints the card, not just the plan: .plan is only the canvas
         box, and on a card that isn't the canvas's shape the rest would stay
         the Home Assistant theme's colour. Unskinned this is ha-card's own
         default chain, so nothing changes. */
      background: var(--fp-skin-card-bg, var(--ha-card-background, var(--card-background-color, #fff)));
      /* The title sits on that background, and ha-card colours it from this
         variable rather than inheriting — so a dark skin under a light Home
         Assistant theme would print a dark title on near-black. The default is
         ha-card's own. */
      --ha-card-header-color: var(--fp-skin-text, var(--primary-text-color));
      /* A column, so the stage takes the height left over after the card's
         own header rather than the card's whole height. With a title set, a
         full-height stage measures past the bottom of the card by exactly the
         header, and the plan is cut off by that much. */
      display: flex;
      flex-direction: column;
    }
    .card-shell {
      display: flex;
      flex-direction: column;
      gap: 12px;
      /* In fixed-height dashboards (e.g. Sections rows), replay controls can
         extend past the visible card area. Keep content reachable by letting
         this inner shell scroll inside the card instead of clipping. */
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .card-shell.replay-visible {
      display: grid;
      grid-template-rows: auto minmax(0, 1fr);
    }
    .card-shell.replay-visible .stage {
      min-height: 0;
    }
    .stage {
      position: relative;
      width: 100%;
      /* Takes the space the header leaves, and may shrink below its content:
         without min-height a flex item floors at its content size and the
         plan pushes the stage past the card again. */
      flex: 1 1 auto;
      min-height: 0;
      padding: 0;
      /* Centres the plan box in whatever the card was given, and makes the
         stage's own height queryable so the plan can size against it. */
      display: flex;
      align-items: center;
      justify-content: center;
      container-type: size;
    }
    .plan {
      position: relative;
      height: auto;
    }
    /*
     * overlayScale: plan. The container is .plan, not .stage: since #115 the
     * stage is only the box the plan is *centred in*, and it is wider than the
     * plan on any card that isn't the canvas's ratio. Measuring the stage would
     * oversize every label by exactly the letterboxing.
     *
     * --fp-u -- one canvas unit as a length -- is declared on the overlay
     * *inside* .plan rather than on .plan itself. Both work today: --fp-u is an
     * unregistered custom property, so its value is substituted as a token
     * stream and the cqw resolves wherever it is finally used -- always a
     * descendant of .plan. Declaring it here is what stays correct if --fp-u is
     * ever registered with @property, which would resolve the cqw at the
     * declaring element instead. (.plan's own width reads 100cqh against
     * .stage, since container units look at an element's *ancestor* container;
     * adding inline-size containment to .plan doesn't disturb it.)
     *
     * inline-size containment is enough for cqw and is cheaper than the size
     * containment .stage needs; .plan's height comes from its inline
     * aspect-ratio, so nothing here depends on the overlay's own size.
     */
    .plan.scale-plan {
      container-type: inline-size;
    }
    /*
     * The unit itself, declared twice on purpose.
     *
     * The fallback in var(--fp-u, 1px) is not the safety net it looks like: it
     * fires when the property is *unset*, never when its value fails to
     * resolve. A browser with no container queries parses the calc quite
     * happily -- a custom property takes almost any token stream -- and then
     * every property using it is invalid at computed-value time, so each falls
     * back to its own initial value. Width becomes auto, and a badge collapses
     * to its borders: about 3px, with its label landing on top of it because
     * the item's box collapsed with it.
     *
     * So the plain value is declared first, and the container-query one only
     * where it can actually be computed. One pixel per canvas unit is exactly
     * what overlayScale fixed draws, which is the right thing to degrade to: a
     * plan that looks like it did before canvas units existed, rather than one
     * with 3px badges.
     *
     * The guard tests the unit as well as the property, because they are two
     * features and only one of them is what the declaration is made of. A
     * browser with container-type but no cqw would pass a check for the
     * property and then fail on the value, which is the exact collapse this is
     * here to stop. Test what is actually used; it costs one more clause.
     */
    .plan.scale-plan .items {
      --fp-u: 1px;
    }
    @supports (container-type: inline-size) and (width: 1cqw) {
      .plan.scale-plan .items {
        --fp-u: calc(100cqw / var(--fp-plan-w));
      }
    }
    /* The measures that aren't config-driven, so they never reach an inline
       style. Label padding goes to em rather than canvas units because it
       should track the label's own size either way.
       Hairlines are deliberately left alone: a badge border and the label's
       drop shadow are 1px-ish either way, and scaling them with the plan puts
       them below a pixel on exactly the small cards this mode is for. Skins
       own those tokens now in any case. */
    .plan.scale-plan .label {
      padding: 0.08em 0.33em;
      border-radius: 0.33em;
    }
    .plan.scale-plan .item > .label {
      top: calc(100% + 0.17em);
    }
    /* The side positions measure their gap in em too, so it tracks the label
       with the plan exactly as the below position's does. Restating top
       because the rule above sets it for every label. */
    .plan.scale-plan .item > .label.label-left,
    .plan.scale-plan .item > .label.label-right {
      top: 50%;
    }
    .plan.scale-plan .item > .label.label-left {
      right: calc(100% + 0.33em);
    }
    .plan.scale-plan .item > .label.label-right {
      left: calc(100% + 0.33em);
    }
    .floor-switcher {
      position: absolute;
      top: 8px;
      right: 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      pointer-events: auto;
      z-index: 1;
    }
    /* Compact chrome (issue #152): the buttons run across the top strip
       instead of down the side, so they share it with the title chip rather
       than each claiming their own band. Wrapped, because a plan with eight
       floors is exactly the case a row is worst at — better a second short
       row than buttons off the edge of the card. Right-aligned so the row
       grows back toward the title rather than through it. */
    .floor-switcher.row {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    /* Room for the title chip on the left, so a long floor name and a long
       title don't meet in the middle — the chip's own max-width leaves the
       same margin from the other side. Only when there *is* a chip: a compact
       card with no title has the whole strip, and reserving 44% of it would
       wrap the buttons for nothing. */
    .stage.compact-title .floor-switcher.row {
      left: 44%;
    }
    .floor-switcher button {
      cursor: pointer;
      border: 1px solid var(--fp-skin-badge-border, var(--divider-color, #ccc));
      background: var(--fp-skin-badge-bg, var(--card-background-color, #fff));
      color: var(--fp-skin-text, var(--primary-text-color));
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 12px;
      line-height: 1;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .floor-switcher button.active {
      background: var(--fp-skin-accent, var(--primary-color, #03a9f4));
      /* Its own ink, not the badge's: this sits on --fp-skin-accent, and the
         skin whose accent wants dark ink is not necessarily the one whose
         active badge does. Left at the theme's text-on-primary, Pastel and
         Tron print near-white on a pale blue and a bright cyan. */
      color: var(--fp-skin-accent-ink, var(--text-primary-color, #fff));
      border-color: var(--fp-skin-accent, var(--primary-color, #03a9f4));
    }
    /* The title, drawn inside the plan (issue #152). Styled as a chip rather
       than as a heading: it is sitting *on* the drawing, and 24px of bare text
       over a wall reads as part of the plan. Same tokens as the floor buttons
       beside it, so a skin carries both. */
    .plan-title {
      position: absolute;
      top: 8px;
      left: 8px;
      z-index: 1;
      /* Stops short of the floor row's own edge, so a long title ellipsises
         rather than running under the buttons. */
      max-width: 40%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border: 1px solid var(--fp-skin-badge-border, var(--divider-color, #ccc));
      background: var(--fp-skin-badge-bg, var(--card-background-color, #fff));
      color: var(--fp-skin-text, var(--primary-text-color));
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 13px;
      font-weight: 500;
      line-height: 1;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
    /* Zoom-to-room (tap an area). One wrapper around both the SVG and the
       HTML overlay so a transform here reframes both layers identically —
       transform-origin:0 0 matches the translate-percent math in
       areaZoomTransform(). Setting a transform (even the identity) makes this
       div establish the containing block for its absolutely-positioned
       svg/.items children, so it needs the same inset:0 they'd otherwise use. */
    .plan-zoom {
      position: absolute;
      inset: 0;
      transform-origin: 0 0;
      transition: transform 0.4s ease;
    }
    @media (prefers-reduced-motion: reduce) {
      .plan-zoom {
        transition: none;
      }
    }
    .zoom-out {
      position: absolute;
      top: 8px;
      left: 8px;
      z-index: 1;
      cursor: pointer;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      border-radius: 6px;
      padding: 4px;
      line-height: 0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
    /* The compact title has that corner. The zoom-out button is the transient
       one — it exists only while a room is zoomed — so it is the one that
       moves, dropping below the chip rather than landing on top of it. */
    .stage.compact-title .zoom-out {
      top: 38px;
    }
    .area-tap-target {
      cursor: pointer;
    }
    /* A staircase that changes floor (issue #121). The pointer is the whole
       affordance — the symbol already draws an arrow saying which way it
       goes — and it only exists on a piece that has somewhere to lead. */
    .fp-furniture-link {
      cursor: pointer;
    }
    .fp-furniture-link:focus-visible {
      outline: 2px solid var(--fp-skin-accent, var(--primary-color, #03a9f4));
      outline-offset: 2px;
    }
    svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
    }
    /* Sunlight through the openings. Paint only — the plan underneath stays
       pressable, which is what pointer-events:none is here for (#108). */
    .fp-sunlight {
      pointer-events: none;
    }
    /* No fill declaration here, deliberately. CSS beats the presentation attribute — the same rule the
       wall below relies on — and a patch of sunlight is filled with a
       *gradient* the renderer builds per opening. A flat colour declared here
       silently discards it: the markup keeps saying url(#…), the computed
       style says rgb(…), and the light comes out as a hard slab no matter
       what shape the falloff is given. That is issue #185, and it survived
       four rewrites of the falloff because every one of them was correct and
       none of them was ever used.

       The skin still applies: --fp-skin-sunlight is read by SUN_LIGHT_COLOR
       and lands on the gradient's own stops. */
    .wall {
      stroke: var(--fp-skin-wall, var(--primary-text-color));
      /* CSS beats the presentation attribute, so the skin sets the wall's
         weight while WALL_THICKNESS keeps owning the geometry the doorway
         mask and the opening symbols are cut from. Capped at 10 for that
         reason — see MAX_SKIN_WALL_WIDTH. */
      stroke-width: var(--fp-skin-wall-width, 8);
    }
    /* Neon, for the skins that want it. Everyone else gets none, which costs
       nothing.

       Two things about where this sits, and both matter.

       It is *outside* the doorway mask. CSS applies filter before mask, so a
       filter on the wall itself is computed from the uncut wall: the mask then
       removes the wall body but not the outer halo, and the leftover fringe
       runs straight through every opening. The doorway cut clears
       WALL_THICKNESS + 4 (12 units, so +-6 from the centreline) while a
       drop-shadow of blur 4 reaches about +-8.5, and that difference is
       exactly what leaked. Measured on a Tron render: 35.6 luminance inside an
       opening against a 7.8 background, versus 7.8 with the filter out here.

       It is also *per wall*, not one group around the whole collection.
       Wrapping them all together would composite the strokes before filtering,
       so two walls meeting at a corner glow once instead of twice and every
       joint quietly dims. Per-wall keeps the accumulation the card has always
       had, and keeps the editor honest, since _renderWall wraps each wall the
       same way. See issue #203. */
    .fp-wall-neon {
      filter: var(--fp-skin-wall-filter, none);
    }
    /* Dead-space hatching (issue #88). It spans whole regions of the plan, so
       without this it swallows every tap inside one — and a sealed region is
       exactly where a tappable door might sit on the boundary. Same lesson as
       the light pools below (#108). */
    .fp-dead-space {
      pointer-events: none;
    }
    /* Sun dimming (issue #113): decoration, never a pointer target. The
       transition matters — HA steps the sun elevation every ~30s, and without
       it dusk arrives as a series of visible jumps rather than a fade. */
    .fp-sun-dim {
      pointer-events: none;
      transition: opacity 2s linear;
    }
    @media (prefers-reduced-motion: reduce) {
      .fp-sun-dim { transition: none; }
    }
    /* Light pools (issue #6). "isolation" gives the layer its own compositing
       group, so the pools blend with each other but not with the plan beneath
       — screening against a light theme's white background would wash them
       out entirely. Inside that group "screen" makes overlapping lights add,
       so two lamps brighten where they meet instead of the topmost winning. */
    .fp-glows {
      isolation: isolate;
      /* Light is decoration and must never take a click: these are filled
         circles drawn over the plan, so without this they swallow every tap
         inside the pool — devices stop responding under a lit lamp, and in
         the editor whole rooms become unselectable (issue #108). */
      pointer-events: none;
    }
    .schein-einfach .fp-glow {
      mix-blend-mode: normal;
    }
    .fp-glow {
      mix-blend-mode: screen;
      /* Follow the light rather than snapping: a dimmer ramp reads as a ramp. */
      transition: opacity 0.4s ease;
    }
    @media (prefers-reduced-motion: reduce) {
      .fp-glow {
        transition: none;
      }
    }
    .fp-door-leaf,
    .fp-leaf-r {
      transform-box: fill-box;
      transition: transform 0.5s ease;
    }
    .fp-door-leaf {
      transform-origin: left center;
    }
    .fp-leaf-r {
      transform-origin: right center;
    }
    .fp-door-leaf rect,
    .fp-leaf-r rect {
      transition: fill 0.5s ease;
    }
    .fp-door-arc {
      transition: stroke-dashoffset 0.5s ease, stroke 0.5s ease;
    }
    .fp-opening {
      cursor: pointer;
    }
    .fp-opening-hit {
      fill: transparent;
      pointer-events: all;
    }
    /* Shutter badge (issue #74 follow-up): screen-sized, so it stays legible
       whatever canvas units the plan is drawn in — the same reason device
       badges are sized in pixels. Sits in the .items overlay, which is
       pointer-events:none, so it takes its own back. */
    .shutter-mark {
      position: absolute;
      /* transform is set inline: the pixel push along the wall normal. */
      pointer-events: auto;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      /* width/height are inline: they follow overlayScale (#148). */
      border-radius: 50%;
      background: var(--fp-skin-paper, var(--card-background-color, #fff));
      border: 1px solid var(--fp-skin-wall, var(--primary-text-color, #212121));
      color: var(--fp-skin-wall, var(--primary-text-color, #212121));
      opacity: 0.75;
      transition: color 0.3s ease, opacity 0.3s ease, border-color 0.3s ease;
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      user-select: none;
    }
    /* Open: the accent, said twice — the glyph is already the "open" half of
       HA's icon pair, and the colour repeats it for a glance across the room. */
    .shutter-mark.on {
      color: var(--fp-active, var(--fp-skin-accent, var(--primary-color, #03a9f4)));
      border-color: var(--fp-active, var(--fp-skin-accent, var(--primary-color, #03a9f4)));
      opacity: 1;
    }
    .shutter-mark ha-icon {
      /* --mdc-icon-size is inline, for the same reason. */
      display: flex;
    }
    .fp-slide-panel {
      transform-box: fill-box;
      transition: transform 0.5s ease;
    }
    .fp-slide-panel rect {
      transition: fill 0.5s ease;
    }
    /* Roll-up curtain (garage / roller shutter): thins onto the track line. */
    .fp-roll-curtain {
      transform-box: fill-box;
      transform-origin: center;
      transition: transform 0.5s ease;
    }
    .fp-roll-curtain rect {
      transition: fill 0.5s ease;
    }
    .items {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    /* A device's hit area is what you can *see* of it — the badge and its
       label — not the box its decoration happens to fill.

       A presence ripple is 80–110px of mostly empty air, and the anchor grew
       to hold it: a 30px motion icon behaved like a 110px square button, which
       also swallowed taps meant for the plan underneath it. The ring is
       decoration; it says "presence here", it is not a control. So the anchor
       stops taking pointer events and the parts that are the device take them
       back. */
    .item {
      position: absolute;
      /* Counter-scaled against the zoom-to-room transform (--fp-inv-zoom,
         set on .items) so a badge stays a constant, legible screen size
         instead of ballooning with the room it's tapped into. Same duration
         and easing as .plan-zoom's own transition, so the zoom and its
         counter-scale animate in lockstep — without this the custom property
         changes in a single frame while the plan takes 0.4s to catch up, and
         every badge is briefly the wrong size mid-transition. */
      transform: translate(-50%, -50%) scale(var(--fp-inv-zoom, 1));
      transition: transform 0.4s ease;
      pointer-events: none;
      /* Not a hand: a device with nothing bound, or tap_action set to none,
         is not a button (issue #134). Only .interactive gets the pointer. */
      cursor: default;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .item .badge,
    .item .label {
      pointer-events: auto;
    }
    /* .stack-icon spans the whole ripple (inset: 0), so it has to stay out of
       the way too — the badge inside it is the target, not its wrapper. */
    .stack-icon,
    .ripple,
    .press-ink {
      pointer-events: none;
    }
    /* A ripple-only device draws no badge, so its centre has to answer for it,
       or switching the badge off would leave the device unclickable. The dot
       is 8px across; this gives it a real touch target without drawing one.
       Deliberately a fixed size, and not scaled by overlayScale (#148): a
       minimum touch target is about fingers, which do not shrink with the
       plan. */
    .item.interactive .ripple .dot {
      pointer-events: auto;
      position: relative;
    }
    .item.interactive .ripple .dot::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: ${yn}px;
      height: ${yn}px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
    }
    .item.interactive {
      cursor: pointer;
      /* Stops the long-press magnifier / text selection on touch from firing
         over a device you are only trying to press. */
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      user-select: none;
    }

    /* ---- Press feedback (issue #134) -------------------------------------
       Chosen plan-wide; the stage carries press-scale / press-ripple /
       press-flash / press-none and each rule below is scoped to its own.
       Only .interactive devices respond, so nothing animates that would not
       then do something. */

    /* Scale: the transform has to repeat the translate, since .item is
       centred on its own anchor and a bare scale() would drop that and jump
       the device down-right by half its size. Also has to repeat the
       zoom-to-room counter-scale (--fp-inv-zoom) and multiply rather than
       replace it — restating scale(${cn}) alone would drop the
       counter-scale along with the translate, and a badge held down at 4x
       zoom would balloon to roughly 4x its resting size instead of shrinking. */
    .press-scale .item.interactive {
      transition: transform ${hn}ms cubic-bezier(0.2, 0.8, 0.3, 1);
    }
    .press-scale .item.interactive:active {
      transform: translate(-50%, -50%) scale(calc(var(--fp-inv-zoom, 1) * ${cn}));
      transition-duration: ${dn}ms;
    }

    /* Flash: drop-shadow rather than a box-shadow or a background, so the halo
       follows whatever the device actually draws — the badge's circle, a bare
       ripple ring, the label — instead of a rectangle around it. */
    .press-flash .item.interactive {
      transition: filter ${hn}ms ease-out;
    }
    .press-flash .item.interactive:active {
      filter: drop-shadow(0 0 5px var(--fp-skin-accent, var(--primary-color, #03a9f4)));
      transition-duration: ${dn}ms;
    }

    /* Ink: a circle spreading from the touch point. Positioned by
       _startInk, which is the only thing that knows where the finger landed. */
    .press-ink {
      position: absolute;
      left: var(--fp-ink-x, 50%);
      top: var(--fp-ink-y, 50%);
      width: 0;
      height: 0;
      border-radius: 50%;
      /* Decoration: it must never swallow the tap it is reporting. */
      pointer-events: none;
      opacity: 0;
      background: currentColor;
    }
    .press-ink.inking {
      animation: fp-press-ink 520ms ease-out;
    }
    @keyframes fp-press-ink {
      from {
        width: 0;
        height: 0;
        margin: 0;
        opacity: 0.32;
      }
      to {
        width: 120px;
        height: 120px;
        margin: -60px 0 0 -60px;
        opacity: 0;
      }
    }

    /* Reduced motion keeps the feedback and drops the movement: the halo, with
       no transition. Removing the effect outright would answer an
       accessibility preference by taking the affordance away. */
    @media (prefers-reduced-motion: reduce) {
      .press-scale .item.interactive,
      .press-flash .item.interactive,
      .press-ripple .item.interactive {
        transition: none;
      }
      .press-scale .item.interactive:active {
        transform: translate(-50%, -50%) scale(var(--fp-inv-zoom, 1));
      }
      .press-scale .item.interactive:active,
      .press-ripple .item.interactive:active,
      .press-flash .item.interactive:active {
        filter: drop-shadow(0 0 5px var(--fp-skin-accent, var(--primary-color, #03a9f4)));
      }
      .press-ink.inking {
        animation: none;
      }
    }
    /*
     * The item's x/y anchors its icon, not its icon-plus-label. Were the label
     * in flow, it would make the column taller and the translate would
     * push the icon up by half the label's height -- so an item showing state
     * would sit higher than a bare one beside it, at the same y. The label hangs
     * below instead, out of flow, and every icon lands on its own y.
     */
    .item > .label {
      position: absolute;
      top: calc(100% + 2px);
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
    }
    /* Label beside the badge instead of under it (issue #180). A reading under
       a badge grows in both directions at once and meets whatever is next to
       it; hung off one side it grows one way, which is what a row of devices
       along a wall needs.

       Vertically centred on the badge rather than baseline-aligned with it:
       the label is one line and the badge is a circle, so centres are what the
       eye actually pairs up. .inflow (a label-only device) ignores all of
       this — with no badge there is no side to sit on. */
    .item > .label.label-left,
    .item > .label.label-right {
      top: 50%;
      transform: translateY(-50%);
    }
    .item > .label.label-left {
      left: auto;
      right: calc(100% + 4px);
    }
    .item > .label.label-right {
      left: calc(100% + 4px);
    }
    /* Label-only items (showIcon: false) have no badge to hang under, so the
       absolute label would drop to y + 2px on a zero-height item. Put it back
       in flow so it becomes the item's box and centers on (x, y) as before. */
    .label.inflow {
      position: static;
      transform: none;
    }
    .badge {
      position: relative; /* anchors the offline mark (issue #162) */
      width: 34px;
      height: 34px;
      border-radius: var(--fp-skin-badge-radius, 50%);
      background: var(--fp-skin-badge-bg, var(--card-background-color, #fff));
      border: var(--fp-skin-badge-border-width, 1.5px) solid
        var(--fp-skin-badge-border, var(--divider-color, #ccc));
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--fp-skin-text, var(--primary-text-color));
      box-shadow: var(--fp-skin-badge-shadow, 0 1px 3px rgba(0, 0, 0, 0.2));
    }
    /* The reading standing in for the icon (issue #106). Inherits the badge's
       text color, so every rule that recolours a badge — active, --fp-state —
       carries the number with it and needs no counterpart here. The negative
       tracking buys back the width a 4-glyph reading like 1.2kW needs. */
    .badge-value {
      font-weight: 600;
      line-height: 1;
      letter-spacing: -0.02em;
      white-space: nowrap;
    }
    /*
     * --fp-active is the item's own activeColor (issue #79) when it sets one;
     * otherwise this falls through to the theme's active color, which is
     * exactly what every badge used before the option existed.
     */
    .item.on .badge {
      background: var(--fp-active, var(--fp-skin-active, var(--state-light-active-color, var(--state-active-color, #fdd835))));
      border-color: var(--fp-active, var(--fp-skin-active, var(--state-light-active-color, var(--state-active-color, #fdd835))));
      /* --fp-ink is contrastText's answer for a colour we could read; when the
         active colour came from the skin there is no per-item colour to read,
         so the skin states its own ink. A pastel badge under a dark Home
         Assistant theme would otherwise take that theme's near-white text. */
      color: var(--fp-ink, var(--fp-skin-active-ink, var(--text-primary-color, #212121)));
    }
    /* The off colour (issue #228). Its own class rather than a var() fallback
       on the base .badge rule, so a plan that never sets one emits nothing new
       and looks exactly as it did. Declared before .state-colored, which still
       wins — a threshold rule is the more specific statement. */
    .item.inactive-colored .badge {
      background: var(--fp-inactive);
      border-color: var(--fp-inactive);
      color: var(--fp-ink, var(--text-primary-color, #212121));
    }
    /* A resolved state colour paints the badge whatever the on/off state —
       thresholds exist for sensors, which are never "on". Declared *after* the
       .on rule (equal specificity) so state rules win over the active colour. */
    .item.state-colored .badge {
      background: var(--fp-state);
      border-color: var(--fp-state);
      color: var(--fp-ink, var(--text-primary-color, #212121));
    }

    /* ---- Offline devices (issue #162) ------------------------------------
       Until now a device whose entity had dropped out was drawn exactly like
       one that is simply switched off — a dead bulb and a bulb someone turned
       off were the same picture, and the plan gave that answer confidently.
       Chosen plan-wide, so the stage carries offline-dim / offline-strike /
       offline-none, exactly as it carries the press effect.

       Nothing here recolours the badge, and nothing needs to: an offline
       entity is never entityIsActive, so it has already fallen back to the
       resting badge. What is added is the *fading*, which says "we have no
       reading" rather than "the reading is off".

       That "already fallen back" is load-bearing, and issue #228 is the first
       thing that could have broken it: inactiveColor paints on exactly the
       not-active test an offline entity also fails. It is gated on this one
       too, in _renderItem — otherwise a dead device would be drawn in the
       loudest colour on the plan, and offline-none would make it identical to
       a device that really is shut.

       offline-none declares nothing at all, which is the point of it. */
    .offline-dim .item.offline {
      opacity: 0.45;
    }
    /* Strike sits a little brighter than a plain dim, so that the mark drawn
       across it still reads as red rather than as pink: the whole device is
       one composited group, so the mark fades with everything else. */
    .offline-strike .item.offline {
      opacity: 0.6;
    }
    /* The diagonal, drawn across the badge itself rather than the item, so it
       crosses out the icon and not the label hanging underneath. A little
       wider than the badge at each end, the way the "no" symbol overhangs. A
       device drawn as a bare ripple, or as a label with no badge at all, has
       nothing to cross and keeps the fade alone. */
    .offline-strike .item.offline .badge::after {
      content: "";
      position: absolute;
      left: -12%;
      right: -12%;
      top: 50%;
      height: 2px;
      margin-top: -1px;
      border-radius: 1px;
      /* Down to the right, the way every mdi "-off" glyph and the reporter's
         own mock-up draw it. */
      transform: rotate(45deg);
      background: var(--fp-offline-mark, var(--error-color, #db4437));
    }
    ha-icon {
      --mdc-icon-size: 22px;
    }
    /* Icon motion while the entity is active (issue #48). */
    ha-icon.anim-spin {
      animation: fp-icon-spin 2s linear infinite;
    }
    ha-icon.anim-pulse {
      animation: fp-icon-pulse 1.6s ease-in-out infinite;
    }
    @keyframes fp-icon-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    @keyframes fp-icon-pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      ha-icon.anim-spin,
      ha-icon.anim-pulse {
        animation: none;
      }
    }
    .label {
      /* Positioning (out-of-flow anchor + inflow fallback) lives in the
         .item > .label rules above, from #41. */
      font-size: 12px;
      line-height: 1;
      padding: 1px 4px;
      border-radius: 4px;
      background: var(--fp-skin-badge-bg, var(--card-background-color, #fff));
      color: var(--fp-skin-text, var(--primary-text-color));
      white-space: nowrap;
    }
    .text {
      position: absolute;
      pointer-events: none;
      white-space: nowrap;
      font-weight: 500;
      line-height: 1;
      /* Keeps its own counter-scale (inline, see _renderText) in step with
         .plan-zoom's transition — same reasoning as .item's transform. */
      transition: transform 0.4s ease;
    }
    .area-label {
      position: absolute;
      pointer-events: none;
      white-space: nowrap;
      transform: translate(-50%, -50%) scale(var(--fp-inv-zoom, 1));
      /* Same lockstep-with-.plan-zoom reasoning as .item and .text above. */
      transition: transform 0.4s ease;
      font-weight: 600;
      /* The default size stays a normal rule so card-mod can still override it
         — room names had no config option before overlayScale landed, and this
         selector was the only way to change them. An area's own labelSize, and
         overlayScale: plan, come through as an inline style that wins over
         this. Keep in step with DEFAULT_AREA_LABEL_SIZE. */
      font-size: ${hi}px;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      line-height: 1;
      color: var(--fp-skin-text, var(--primary-text-color));
      opacity: 0.7;
      text-shadow:
        0 1px 2px var(--fp-skin-bg, var(--card-background-color, #fff)),
        0 -1px 2px var(--fp-skin-bg, var(--card-background-color, #fff));
    }
    .stack {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .stack-icon {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ripple {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ripple .ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid var(--fp-ripple-color);
      opacity: 0;

      /* Keep only the angular slice the ring should travel along */
      -webkit-mask: conic-gradient(
        from calc(var(--fp-ripple-direction) * 1deg - var(--fp-ripple-width) * 1deg / 2),
        #000 0deg,
        #000 calc(var(--fp-ripple-width) * 1deg),
        transparent calc(var(--fp-ripple-width) * 1deg)
      );
      mask: conic-gradient(
        from calc(var(--fp-ripple-direction) * 1deg - var(--fp-ripple-width) * 1deg / 2),
        #000 0deg,
        #000 calc(var(--fp-ripple-width) * 1deg),
        transparent calc(var(--fp-ripple-width) * 1deg)
      );
    }
    .ripple.active .ring {
      animation: fp-ripple 1.8s ease-out infinite;
    }
    .ripple .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--fp-ripple-color);
      opacity: 0.4;
    }
    .ripple.active .dot {
      opacity: 0.9;
    }
    @keyframes fp-ripple {
      0% {
        transform: scale(0.15);
        opacity: 0.7;
      }
      100% {
        transform: scale(1);
        opacity: 0;
      }
    }
    /* === Tracker animations (live card). The zone outline is editor-only —
       renderTracker is called with editing:false here, so only the marker /
       line and ripples render. Movement transitions on the group's transform
       so the dot/triangle glides between sensor updates rather than jumping. === */
    .tracker-marker {
      transition: transform 0.4s ease-out;
    }
    .tracker-dot {
      animation: fp-tracker-pulse 1.4s ease-in-out infinite;
      transform-box: fill-box;
      transform-origin: center;
    }
    .tracker-ring {
      animation: fp-tracker-ring 2.2s ease-out infinite;
      opacity: 0;
    }
    .tracker-line {
      transition: transform 0.4s ease-out;
    }
    .tracker-line-stroke {
      opacity: 0.45;
      animation: fp-tracker-pulse 1.6s ease-in-out infinite;
    }
    .tracker-band {
      opacity: 0;
      animation: fp-tracker-band 2.2s ease-out infinite;
    }
    @keyframes fp-tracker-pulse {
      0%,
      100% {
        transform: scale(0.9);
        opacity: 0.7;
      }
      50% {
        transform: scale(1.1);
        opacity: 1;
      }
    }
    @keyframes fp-tracker-ring {
      0% {
        r: 0;
        opacity: 0.7;
      }
      100% {
        r: var(--fp-tracker-ring-max, 60px);
        opacity: 0;
      }
    }
    @keyframes fp-tracker-band {
      0% {
        opacity: 0.5;
        stroke-width: 1.5;
      }
      100% {
        opacity: 0;
        stroke-width: 14;
      }
    }
  `
];
ct([
  C({ attribute: !1 })
], B.prototype, "hass", 2);
ct([
  C({ attribute: !1 })
], B.prototype, "optionen", 2);
ct([
  Nt()
], B.prototype, "_config", 2);
ct([
  Nt()
], B.prototype, "_activeFloorId", 2);
ct([
  Nt()
], B.prototype, "_zoomedAreaId", 2);
ct([
  Nt()
], B.prototype, "_portrait", 2);
B = ct([
  Pt("fp-ef-card")
], B);
function Yn(t) {
  const e = t?.schein === "einfach" || t?.schein === "aus" ? t.schein : "voll", n = Number(t?.buendeln_ms);
  return {
    wandverdeckung: t?.wandverdeckung !== !1,
    schein: e,
    buendeln_ms: Number.isFinite(n) && n > 0 ? n : 0
  };
}
function yp(t) {
  const e = t ?? {};
  return { type: "custom:fp-ef-card", ...e.format === "fp-export" ? e.plan?.ef : e.ef ?? e, historyReplay: void 0 };
}
async function xp(t, e, n, r) {
  const i = document.createElement("fp-ef-card");
  let o = Yn(n), s, a, l = /* @__PURE__ */ new Set(), c;
  const u = () => {
    c = void 0, s && (s = en(e, [], s, l), l = /* @__PURE__ */ new Set(), i.hass = s);
  }, p = (f) => {
    if (l.add(f), o.buendeln_ms <= 0) return u();
    c ??= setTimeout(u, o.buendeln_ms);
  }, d = async (f) => {
    a?.(), clearTimeout(c), c = void 0, l = /* @__PURE__ */ new Set();
    const b = f ?? await e.plan_laden(), m = yp(b), g = new Set(vi(m));
    for (const w of b?.entities ?? []) g.add(w);
    i.setConfig(m), s = en(e, g), i.hass = s, a = e.abonnieren([...g], p);
  };
  return i.optionen = o, t.append(i), await d(r), {
    karte: i,
    neuLaden: d,
    setzeOptionen(f) {
      o = Yn(f), i.optionen = o;
    },
    trennen() {
      a?.(), clearTimeout(c), i.remove();
    }
  };
}
const _p = "1.0.0", mp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
export {
  _p as KERN_VERSION,
  yp as efAusPlan,
  en as erzeugeHass,
  xp as zeigePlan
};
