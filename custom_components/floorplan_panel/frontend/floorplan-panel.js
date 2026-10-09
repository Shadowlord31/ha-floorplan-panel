function Q(t) {
  return (e) => {
    customElements.get(t) || customElements.define(t, e);
  };
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = globalThis, Ut = pt.ShadowRoot && (pt.ShadyCSS === void 0 || pt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Wt = Symbol(), Vt = /* @__PURE__ */ new WeakMap();
let me = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== Wt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Ut && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = Vt.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Vt.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ft = (t) => new me(typeof t == "string" ? t : t + "", void 0, Wt), tt = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((s, n, o) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[o + 1], t[0]);
  return new me(i, t, Wt);
}, Ue = (t, e) => {
  if (Ut) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const s = document.createElement("style"), n = pt.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, t.appendChild(s);
  }
}, Zt = Ut ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return Ft(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: We, defineProperty: Fe, getOwnPropertyDescriptor: je, getOwnPropertyNames: He, getOwnPropertySymbols: Be, getPrototypeOf: Ge } = Object, bt = globalThis, qt = bt.trustedTypes, Ke = qt ? qt.emptyScript : "", Ve = bt.reactiveElementPolyfillSupport, it = (t, e) => t, ft = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Ke : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, jt = (t, e) => !We(t, e), Xt = { attribute: !0, type: String, converter: ft, reflect: !1, useDefault: !1, hasChanged: jt };
Symbol.metadata ??= Symbol("metadata"), bt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let K = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Xt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(e, s, i);
      n !== void 0 && Fe(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: n, set: o } = je(this.prototype, e) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: n, set(r) {
      const a = n?.call(this);
      o?.call(this, r), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Xt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(it("elementProperties"))) return;
    const e = Ge(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(it("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(it("properties"))) {
      const i = this.properties, s = [...He(i), ...Be(i)];
      for (const n of s) this.createProperty(n, i[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [s, n] of i) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const n = this._$Eu(i, s);
      n !== void 0 && this._$Eh.set(n, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const n of s) i.unshift(Zt(n));
    } else e !== void 0 && i.push(Zt(e));
    return i;
  }
  static _$Eu(e, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
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
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const s of i.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ue(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, i, s) {
    this._$AK(e, s);
  }
  _$ET(e, i) {
    const s = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, s);
    if (n !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : ft).toAttribute(i, s.type);
      this._$Em = e, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const s = this.constructor, n = s._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : ft;
      this._$Em = n;
      const a = r.fromAttribute(i, o.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, i, s, n = !1, o) {
    if (e !== void 0) {
      const r = this.constructor;
      if (n === !1 && (o = this[e]), s ??= r.getPropertyOptions(e), !((s.hasChanged ?? jt)(o, i) || s.useDefault && s.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, s)))) return;
      this.C(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: s, reflect: n, wrapped: o }, r) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, r ?? i ?? this[e]), o !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (i = void 0), this._$AL.set(e, i)), n === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
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
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, o] of s) {
        const { wrapped: r } = o, a = this[n];
        r !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, o, a);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
K.elementStyles = [], K.shadowRootOptions = { mode: "open" }, K[it("elementProperties")] = /* @__PURE__ */ new Map(), K[it("finalized")] = /* @__PURE__ */ new Map(), Ve?.({ ReactiveElement: K }), (bt.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht = globalThis, Yt = (t) => t, mt = Ht.trustedTypes, Jt = mt ? mt.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, ge = "$lit$", D = `lit$${Math.random().toFixed(9).slice(2)}$`, _e = "?" + D, Ze = `<${_e}>`, j = document, st = () => j.createComment(""), nt = (t) => t === null || typeof t != "object" && typeof t != "function", Bt = Array.isArray, qe = (t) => Bt(t) || typeof t?.[Symbol.iterator] == "function", wt = `[ 	
\f\r]`, et = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Qt = /-->/g, te = />/g, N = RegExp(`>|${wt}(?:([^\\s"'>=/]+)(${wt}*=${wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ee = /'/g, ie = /"/g, ye = /^(?:script|style|textarea|title)$/i, xe = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), u = xe(1), _ = xe(2), q = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), se = /* @__PURE__ */ new WeakMap(), F = j.createTreeWalker(j, 129);
function be(t, e) {
  if (!Bt(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Jt !== void 0 ? Jt.createHTML(e) : e;
}
const Xe = (t, e) => {
  const i = t.length - 1, s = [];
  let n, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = et;
  for (let a = 0; a < i; a++) {
    const l = t[a];
    let c, h, p = -1, f = 0;
    for (; f < l.length && (r.lastIndex = f, h = r.exec(l), h !== null); ) f = r.lastIndex, r === et ? h[1] === "!--" ? r = Qt : h[1] !== void 0 ? r = te : h[2] !== void 0 ? (ye.test(h[2]) && (n = RegExp("</" + h[2], "g")), r = N) : h[3] !== void 0 && (r = N) : r === N ? h[0] === ">" ? (r = n ?? et, p = -1) : h[1] === void 0 ? p = -2 : (p = r.lastIndex - h[2].length, c = h[1], r = h[3] === void 0 ? N : h[3] === '"' ? ie : ee) : r === ie || r === ee ? r = N : r === Qt || r === te ? r = et : (r = N, n = void 0);
    const g = r === N && t[a + 1].startsWith("/>") ? " " : "";
    o += r === et ? l + Ze : p >= 0 ? (s.push(c), l.slice(0, p) + ge + l.slice(p) + D + g) : l + D + (p === -2 ? a : g);
  }
  return [be(t, o + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class ot {
  constructor({ strings: e, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const a = e.length - 1, l = this.parts, [c, h] = Xe(e, i);
    if (this.el = ot.createElement(c, s), F.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (n = F.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const p of n.getAttributeNames()) if (p.endsWith(ge)) {
          const f = h[r++], g = n.getAttribute(p).split(D), d = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: o, name: d[2], strings: g, ctor: d[1] === "." ? Je : d[1] === "?" ? Qe : d[1] === "@" ? ti : vt }), n.removeAttribute(p);
        } else p.startsWith(D) && (l.push({ type: 6, index: o }), n.removeAttribute(p));
        if (ye.test(n.tagName)) {
          const p = n.textContent.split(D), f = p.length - 1;
          if (f > 0) {
            n.textContent = mt ? mt.emptyScript : "";
            for (let g = 0; g < f; g++) n.append(p[g], st()), F.nextNode(), l.push({ type: 2, index: ++o });
            n.append(p[f], st());
          }
        }
      } else if (n.nodeType === 8) if (n.data === _e) l.push({ type: 2, index: o });
      else {
        let p = -1;
        for (; (p = n.data.indexOf(D, p + 1)) !== -1; ) l.push({ type: 7, index: o }), p += D.length - 1;
      }
      o++;
    }
  }
  static createElement(e, i) {
    const s = j.createElement("template");
    return s.innerHTML = e, s;
  }
}
function X(t, e, i = t, s) {
  if (e === q) return e;
  let n = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const o = nt(e) ? void 0 : e._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(t), n._$AT(t, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = n : i._$Cl = n), n !== void 0 && (e = X(t, n._$AS(t, e.values), n, s)), e;
}
class Ye {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: s } = this._$AD, n = (e?.creationScope ?? j).importNode(i, !0);
    F.currentNode = n;
    let o = F.nextNode(), r = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new rt(o, o.nextSibling, this, e) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, e) : l.type === 6 && (c = new ei(o, this, e)), this._$AV.push(c), l = s[++a];
      }
      r !== l?.index && (o = F.nextNode(), r++);
    }
    return F.currentNode = j, n;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
}
class rt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, s, n) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && e?.nodeType === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = X(this, e, i), nt(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== q && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : qe(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== m && nt(this._$AH) ? this._$AA.nextSibling.data = e : this.T(j.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: s } = e, n = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = ot.createElement(be(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const o = new Ye(n, this), r = o.u(this.options);
      o.p(i), this.T(r), this._$AH = o;
    }
  }
  _$AC(e) {
    let i = se.get(e.strings);
    return i === void 0 && se.set(e.strings, i = new ot(e)), i;
  }
  k(e) {
    Bt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const o of e) n === i.length ? i.push(s = new rt(this.O(st()), this.O(st()), this, this.options)) : s = i[n], s._$AI(o), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const s = Yt(e).nextSibling;
      Yt(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class vt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, n, o) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = i, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = m;
  }
  _$AI(e, i = this, s, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) e = X(this, e, i, 0), r = !nt(e) || e !== this._$AH && e !== q, r && (this._$AH = e);
    else {
      const a = e;
      let l, c;
      for (e = o[0], l = 0; l < o.length - 1; l++) c = X(this, a[s + l], i, l), c === q && (c = this._$AH[l]), r ||= !nt(c) || c !== this._$AH[l], c === m ? e = m : e !== m && (e += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    r && !n && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Je extends vt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
class Qe extends vt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
}
class ti extends vt {
  constructor(e, i, s, n, o) {
    super(e, i, s, n, o), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = X(this, e, i, 0) ?? m) === q) return;
    const s = this._$AH, n = e === m && s !== m || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, o = e !== m && (s === m || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ei {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    X(this, e);
  }
}
const ii = Ht.litHtmlPolyfillSupport;
ii?.(ot, rt), (Ht.litHtmlVersions ??= []).push("3.3.3");
const si = (t, e, i) => {
  const s = i?.renderBefore ?? e;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = i?.renderBefore ?? null;
    s._$litPart$ = n = new rt(e.insertBefore(st(), o), o, void 0, i ?? {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Gt = globalThis;
class I extends K {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = si(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return q;
  }
}
I._$litElement$ = !0, I.finalized = !0, Gt.litElementHydrateSupport?.({ LitElement: I });
const ni = Gt.litElementPolyfillSupport;
ni?.({ LitElement: I });
(Gt.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const oi = { attribute: !0, type: String, converter: ft, reflect: !1, hasChanged: jt }, ri = (t = oi, e, i) => {
  const { kind: s, metadata: n } = i;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), o.set(i.name, t), s === "accessor") {
    const { name: r } = i;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(r, l, t, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, t, a), a;
    } };
  }
  if (s === "setter") {
    const { name: r } = i;
    return function(a) {
      const l = this[r];
      e.call(this, a), this.requestUpdate(r, l, t, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function x(t) {
  return (e, i) => typeof i == "object" ? ri(t, e, i) : ((s, n, o) => {
    const r = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), r ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function b(t) {
  return x({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ai = (t, e, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, i), i);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ve(t, e) {
  return (i, s, n) => {
    const o = (r) => r.renderRoot?.querySelector(t) ?? null;
    return ai(i, s, { get() {
      return o(this);
    } });
  };
}
const A = (t) => t.split(".")[0], li = /* @__PURE__ */ new Set([
  "light",
  "switch",
  "fan",
  "input_boolean",
  "automation",
  "siren",
  "humidifier",
  "media_player",
  "climate",
  "cover",
  "lock",
  "valve",
  "group"
]), ci = /* @__PURE__ */ new Set(["scene", "script", "button", "input_button"]);
function Pt(t) {
  const e = A(t);
  return e === "scene" ? "scene" : e === "script" ? "script" : "device";
}
function hi(t) {
  return li.has(A(t));
}
function Mt(t) {
  return ci.has(A(t));
}
function Y(t) {
  if (!t) return !1;
  const e = t.state;
  if (e === "unavailable" || e === "unknown") return !1;
  switch (A(t.entity_id)) {
    case "cover":
    case "valve":
      return e === "open" || e === "opening";
    case "lock":
      return e === "unlocked" || e === "open" || e === "opening";
    case "climate":
      return e !== "off";
    case "media_player":
      return e !== "off" && e !== "standby" && e !== "idle";
    case "binary_sensor":
    case "light":
    case "switch":
    case "fan":
    case "input_boolean":
    case "automation":
    case "siren":
    case "humidifier":
    case "person":
    case "device_tracker":
      return e === "on" || e === "home";
    default:
      return e === "on";
  }
}
function Ot(t) {
  return !t || t.state === "unavailable";
}
function gt(t, e) {
  return t.states[e]?.attributes.friendly_name ?? e;
}
function $e(t, e) {
  if (!e) return "nicht gefunden";
  if (t.formatEntityState)
    try {
      return t.formatEntityState(e);
    } catch {
    }
  const i = e.attributes.unit_of_measurement;
  return i ? `${e.state} ${i}` : e.state;
}
const di = {
  light: "mdi:lightbulb",
  switch: "mdi:toggle-switch-variant",
  fan: "mdi:fan",
  cover: "mdi:window-shutter",
  climate: "mdi:thermostat",
  lock: "mdi:lock",
  media_player: "mdi:television",
  scene: "mdi:palette",
  script: "mdi:script-text",
  sensor: "mdi:eye",
  binary_sensor: "mdi:checkbox-blank-circle-outline",
  camera: "mdi:video",
  vacuum: "mdi:robot-vacuum",
  input_boolean: "mdi:toggle-switch-outline",
  automation: "mdi:robot",
  button: "mdi:gesture-tap-button",
  person: "mdi:account"
};
function L(t, e, i) {
  if (i) return i;
  const s = t.states[e]?.attributes.icon;
  return s || (di[A(e)] ?? "mdi:help-circle-outline");
}
async function we(t, e) {
  const i = A(e), s = t.states[e];
  i === "lock" ? await t.callService("lock", s?.state === "locked" ? "unlock" : "lock", { entity_id: e }) : i === "cover" ? await t.callService("cover", "toggle", { entity_id: e }) : await t.callService("homeassistant", "toggle", { entity_id: e });
}
async function Ct(t, e) {
  const i = A(e);
  i === "scene" ? await t.callService("scene", "turn_on", { entity_id: e }) : i === "script" ? await t.callService("script", "turn_on", { entity_id: e }) : (i === "button" || i === "input_button") && await t.callService(i, "press", { entity_id: e });
}
function _t(t, e) {
  t.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: e }, bubbles: !0, composed: !0 }));
}
var pi = Object.defineProperty, ui = Object.getOwnPropertyDescriptor, C = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? ui(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (n = (s ? r(e, i, n) : r(n)) || n);
  return s && n && pi(e, i, n), n;
};
const fi = 60;
let E = class extends I {
  constructor() {
    super(...arguments), this.value = "", this.domains = [], this.exclude = [], this.placeholder = "Entität suchen …", this.clearOnSelect = !1, this._open = !1, this._filter = "", this._highlight = 0;
  }
  _results() {
    const t = this._filter.trim().toLowerCase(), e = new Set(this.exclude), i = [];
    for (const s of Object.keys(this.hass.states).sort()) {
      if (e.has(s) || this.domains.length && !this.domains.includes(A(s))) continue;
      const n = this.hass.states[s].attributes.friendly_name ?? s;
      if (!(t && !s.toLowerCase().includes(t) && !n.toLowerCase().includes(t)) && (i.push({ id: s, name: n }), i.length >= fi))
        break;
    }
    return i;
  }
  _select(t) {
    this._open = !1, this._filter = "", this.clearOnSelect && this._input && (this._input.value = ""), this.dispatchEvent(new CustomEvent("value-changed", { detail: { value: t }, bubbles: !0, composed: !0 }));
  }
  _onKey(t) {
    const e = this._results();
    if (t.key === "ArrowDown")
      this._open = !0, this._highlight = Math.min(e.length - 1, this._highlight + 1), t.preventDefault();
    else if (t.key === "ArrowUp")
      this._highlight = Math.max(0, this._highlight - 1), t.preventDefault();
    else if (t.key === "Enter") {
      const i = e[this._highlight];
      i && this._select(i.id), t.preventDefault();
    } else t.key === "Escape" && (this._open = !1);
    t.stopPropagation();
  }
  render() {
    const t = this._open ? this._results() : [], e = this.value ? this.hass.states[this.value] : void 0, i = this.clearOnSelect ? this._filter : this._open ? this._filter : this.value ? `${e?.attributes.friendly_name ?? this.value}` : "";
    return u`
      <div class="field">
        ${this.value && !this.clearOnSelect ? u`<ha-icon class="lead" .icon=${L(this.hass, this.value)}></ha-icon>` : u`<ha-icon class="lead" icon="mdi:magnify"></ha-icon>`}
        <input
          .value=${i}
          placeholder=${this.placeholder}
          @focus=${() => {
      this._open = !0, this._filter = "", this._highlight = 0;
    }}
          @blur=${() => setTimeout(() => this._open = !1, 150)}
          @input=${(s) => {
      this._filter = s.target.value, this._highlight = 0, this._open = !0;
    }}
          @keydown=${this._onKey}
        />
        ${this.value && !this.clearOnSelect ? u`<button class="clear" title="Entfernen" @mousedown=${(s) => s.preventDefault()} @click=${() => this._select("")}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>` : m}
      </div>
      ${this.value && !this.clearOnSelect ? u`<div class="id">${this.value}</div>` : m}
      ${this._open ? u`<div class="list">
            ${t.length === 0 ? u`<div class="none">Keine Treffer</div>` : t.map(
      (s, n) => u`<div
                    class="opt ${n === this._highlight ? "hl" : ""}"
                    @mousedown=${(o) => {
        o.preventDefault(), this._select(s.id);
      }}
                  >
                    <ha-icon .icon=${L(this.hass, s.id)}></ha-icon>
                    <span class="txt"><span>${s.name}</span><small>${s.id}</small></span>
                  </div>`
    )}
          </div>` : m}
    `;
  }
};
E.styles = tt`
    :host {
      display: block;
      position: relative;
    }
    .field {
      display: flex;
      align-items: center;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--card-background-color);
      padding: 0 4px 0 8px;
      --mdc-icon-size: 18px;
    }
    .field:focus-within {
      border-color: var(--primary-color);
    }
    .lead {
      color: var(--secondary-text-color);
    }
    input {
      flex: 1;
      min-width: 0;
      border: none;
      outline: none;
      background: none;
      color: var(--primary-text-color);
      font: inherit;
      padding: 8px;
    }
    .clear {
      border: none;
      background: none;
      cursor: pointer;
      color: var(--secondary-text-color);
      line-height: 0;
      padding: 4px;
    }
    .id {
      font-size: 11px;
      color: var(--secondary-text-color);
      margin: 2px 0 0 4px;
    }
    .list {
      position: absolute;
      z-index: 10;
      left: 0;
      right: 0;
      max-height: 260px;
      overflow-y: auto;
      margin-top: 2px;
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    .opt {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 10px;
      cursor: pointer;
      --mdc-icon-size: 20px;
    }
    .opt.hl,
    .opt:hover {
      background: var(--secondary-background-color);
    }
    .txt {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .txt span,
    .txt small {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    small {
      color: var(--secondary-text-color);
    }
    .none {
      padding: 8px 10px;
      color: var(--secondary-text-color);
    }
  `;
C([
  x({ attribute: !1 })
], E.prototype, "hass", 2);
C([
  x()
], E.prototype, "value", 2);
C([
  x({ attribute: !1 })
], E.prototype, "domains", 2);
C([
  x({ attribute: !1 })
], E.prototype, "exclude", 2);
C([
  x()
], E.prototype, "placeholder", 2);
C([
  x({ type: Boolean })
], E.prototype, "clearOnSelect", 2);
C([
  b()
], E.prototype, "_open", 2);
C([
  b()
], E.prototype, "_filter", 2);
C([
  b()
], E.prototype, "_highlight", 2);
C([
  ve("input")
], E.prototype, "_input", 2);
E = C([
  Q("fp-entity-picker")
], E);
const mi = 4, gi = 10, zt = { scale: 1, txPercent: 0, tyPercent: 0 };
function _i(t, e, i, s = 0.15, n = mi, o) {
  if (!t.length) return zt;
  const r = t.map((R) => R.x), a = t.map((R) => R.y), l = Math.min(...r), c = Math.max(...r), h = Math.min(...a), p = Math.max(...a), f = Math.max(c - l, p - h) * s, g = Math.max(c - l + f * 2, 1), d = Math.max(p - h + f * 2, 1), y = Math.max(1, Math.min(n, Math.min(e / g, i / d))), w = o ?? y;
  if (!Number.isFinite(w)) return zt;
  const S = (l + c) / 2 / e, k = (h + p) / 2 / i, M = (R) => Math.min(0, Math.max(100 * (1 - w), R));
  return {
    scale: w,
    txPercent: M(50 - w * S * 100),
    tyPercent: M(50 - w * k * 100)
  };
}
function yi(t) {
  const e = t.zoom;
  if (!(typeof e != "number" || !Number.isFinite(e)))
    return Math.max(1, Math.min(gi, e));
}
function xi(t) {
  if (!t.length) return { x: 0, y: 0 };
  const e = t.reduce((i, s) => ({ x: i.x + s.x, y: i.y + s.y }), { x: 0, y: 0 });
  return { x: e.x / t.length, y: e.y / t.length };
}
function yt(t, e, i) {
  let s = !1;
  for (let n = 0, o = t.length - 1; n < t.length; o = n++) {
    const r = t[n], a = t[o];
    r.y > i != a.y > i && e < (a.x - r.x) * (i - r.y) / (a.y - r.y) + r.x && (s = !s);
  }
  return s;
}
function ne(t) {
  let e = 0;
  for (let i = 0, s = t.length - 1; i < t.length; s = i++)
    e += (t[s].x + t[i].x) * (t[s].y - t[i].y);
  return Math.abs(e / 2);
}
function bi(t, e) {
  return t.area ? e.find((s) => s.id === t.area || s.name === t.area) : e.filter((s) => yt(s.points, t.x, t.y)).sort((s, n) => ne(s.points) - ne(n.points))[0];
}
function vi(t, e, i) {
  return t.showOnlyWhenZoomed ? e ? bi(t, i)?.id !== e.id : !0 : !1;
}
function lt(t, e) {
  return e > 0 ? Math.round(t / e) * e : t;
}
function O(t, e) {
  return Math.hypot(t.x - e.x, t.y - e.y);
}
function ke(t, e, i) {
  const s = i.x - e.x, n = i.y - e.y, o = s * s + n * n, r = o === 0 ? 0 : Math.max(0, Math.min(1, ((t.x - e.x) * s + (t.y - e.y) * n) / o));
  return { point: { x: e.x + r * s, y: e.y + r * n }, t: r };
}
function kt(t, e, i) {
  let s;
  for (const n of e) {
    const { point: o, t: r } = ke(t, { x: n.x1, y: n.y1 }, { x: n.x2, y: n.y2 }), a = O(t, o);
    a <= i && (!s || a < s.distance) && (s = {
      wall: n,
      point: o,
      t: r,
      distance: a,
      angle: Math.atan2(n.y2 - n.y1, n.x2 - n.x1) * 180 / Math.PI
    });
  }
  return s;
}
function $i(t, e, i, s = []) {
  let n, o = i;
  for (const r of e)
    if (!s.includes(r))
      for (const a of [
        { x: r.x1, y: r.y1 },
        { x: r.x2, y: r.y2 }
      ]) {
        const l = O(t, a);
        l <= o && (n = a, o = l);
      }
  return n;
}
function wi(t, e, i, s = []) {
  let n, o = i;
  for (const r of e)
    for (const a of r.points) {
      if (s.includes(a)) continue;
      const l = O(t, a);
      l <= o && (n = a, o = l);
    }
  return n && { x: n.x, y: n.y };
}
function St(t, e, i = 8) {
  const s = Math.abs(Math.atan2(e.y - t.y, e.x - t.x) * 180 / Math.PI);
  return s < i || s > 180 - i ? { x: e.x, y: t.y } : Math.abs(s - 90) < i ? { x: t.x, y: e.y } : e;
}
function It(t, e) {
  const { width: i, height: s } = e.canvas;
  let n = 1 / 0, o = 1 / 0, r = -1 / 0, a = -1 / 0;
  const l = (g, d, y = 0) => {
    n = Math.min(n, g - y), o = Math.min(o, d - y), r = Math.max(r, g + y), a = Math.max(a, d + y);
  }, c = Math.max(i, s), h = e.settings?.wallThickness ?? 12;
  for (const g of t.walls) {
    const d = (g.thickness ?? h) / 2;
    l(g.x1, g.y1, d), l(g.x2, g.y2, d);
  }
  for (const g of t.areas) for (const d of g.points) l(d.x, d.y);
  for (const g of t.openings) {
    const d = g.angle * Math.PI / 180, y = Math.cos(d), w = Math.sin(d), S = g.swing === "out" ? -1 : 1, k = 30, M = S > 0 ? -k : -(g.length + k), R = S > 0 ? g.length + k : k;
    for (const G of [-g.length / 2, g.length / 2])
      for (const Kt of [M, R]) l(g.x + G * y - Kt * w, g.y + G * w + Kt * y);
  }
  const p = c * 0.04;
  for (const g of t.items) l(g.x, g.y, p);
  if (n === 1 / 0) {
    const g = c * 0.03;
    return { x: -g, y: -g, w: i + 2 * g, h: s + 2 * g };
  }
  const f = Math.max(r - n, a - o) * 0.03;
  return { x: n - f, y: o - f, w: r - n + 2 * f, h: a - o + 2 * f };
}
const Rt = 4, Se = "#ef6c00", Ae = "#8d6e63", ki = [
  ["room", "Zimmer"],
  ["balcony", "Balkon"],
  ["hallway", "Flur"],
  ["staircase", "Treppenhaus"],
  ["bathroom", "Bad"],
  ["custom", "Eigene Bezeichnung"]
], Lt = 150, Ee = "#ffd9a0", Si = { wallThickness: 12, grid: 10 };
function Ai(t) {
  const { sashes: e, shutterEntity: i, shutterColor: s, ...n } = t;
  return n.type === "window" && !n.leaves && (e === 1 || e === 2) && (n.leaves = e === 2 ? [{ w: 1, hinge: "left" }, { w: 1, hinge: "right" }] : [{ w: 1 }]), n.type === "window" && i && !n.shutters && (n.shutters = [{ entity: i, side: "out", ...s ? { color: s } : {} }]), n.type === "door" && n.entity?.startsWith("lock.") && (n.lockEntity ??= n.entity, delete n.entity), n;
}
function Tt(t) {
  const e = t ?? {};
  return {
    version: e.version ?? 1,
    canvas: e.canvas ?? { width: 1e3, height: 700 },
    settings: { ...Si, ...e.settings ?? {} },
    floors: (e.floors ?? []).map((i) => ({
      ...i,
      name: i.name ?? "",
      walls: i.walls ?? [],
      openings: (i.openings ?? []).map(Ai),
      areas: (i.areas ?? []).map((s) => ({ ...s, name: s.name ?? "", sidebar: s.sidebar ?? [] })),
      items: i.items ?? []
    }))
  };
}
function U(t) {
  return `${t}-${Math.random().toString(36).slice(2, 8)}`;
}
const oe = 0.18, re = 0.6, ae = 0.5;
function ut(t) {
  return typeof t.glow == "boolean" ? t.glow : !!t.entity && A(t.entity) === "light";
}
function Ei(t, e) {
  if (!e || e.state !== "on") return;
  const i = e.attributes ?? {}, s = i.brightness, n = typeof s == "number" && Number.isFinite(s) ? Math.max(0, Math.min(255, s)) / 255 : void 0, o = n === void 0 ? re : oe + (re - oe) * n, a = (typeof t.glowRadius == "number" && t.glowRadius > 0 ? t.glowRadius : Lt) * (n === void 0 ? 1 : ae + (1 - ae) * n), l = i.rgb_color;
  if (Array.isArray(l) && l.length >= 3 && l.slice(0, 3).every((c) => typeof c == "number" && Number.isFinite(c))) {
    const c = (h) => Math.max(0, Math.min(255, Math.round(h)));
    return { color: `rgb(${c(l[0])}, ${c(l[1])}, ${c(l[2])})`, opacity: o, radius: a };
  }
  return { color: t.glowColor || Ee, opacity: o, radius: a };
}
function Pe(t, e, i) {
  const s = i.x2 - i.x1, n = i.y2 - i.y1, o = s * s + n * n, r = o === 0 ? 0 : Math.max(0, Math.min(1, ((t - i.x1) * s + (e - i.y1) * n) / o));
  return Math.hypot(t - (i.x1 + r * s), e - (i.y1 + r * n));
}
function Pi(t, e, i, s, n) {
  const o = n.x2 - n.x1, r = n.y2 - n.y1, a = i * r - s * o;
  if (Math.abs(a) < 1e-12) return;
  const l = n.x1 - t, c = n.y1 - e, h = (l * r - c * o) / a, p = (l * s - c * i) / a;
  if (!(h <= 1e-9 || p < 0 || p > 1))
    return h;
}
function Mi(t, e, i, s, n) {
  const o = t.x2 - t.x1, r = t.y2 - t.y1, a = [-o, o, -r, r], l = [t.x1 - e, s - t.x1, t.y1 - i, n - t.y1];
  let c = 0, h = 1;
  for (let p = 0; p < 4; p++) {
    if (a[p] === 0) {
      if (l[p] < 0) return;
      continue;
    }
    const f = l[p] / a[p];
    if (a[p] < 0) {
      if (f > h) return;
      f > c && (c = f);
    } else {
      if (f < c) return;
      f < h && (h = f);
    }
  }
  return { ...t, x1: t.x1 + c * o, y1: t.y1 + c * r, x2: t.x1 + h * o, y2: t.y1 + h * r };
}
function Me(t, e, i, s, n = () => 12) {
  const o = s.filter((f) => {
    const g = Pe(t, e, f);
    return g < i && g > n(f) / 2 + 1;
  });
  if (!o.length) return;
  const r = i * 1.01, a = [
    { id: "b1", x1: t - r, y1: e - r, x2: t + r, y2: e - r },
    { id: "b2", x1: t + r, y1: e - r, x2: t + r, y2: e + r },
    { id: "b3", x1: t + r, y1: e + r, x2: t - r, y2: e + r },
    { id: "b4", x1: t - r, y1: e + r, x2: t - r, y2: e - r }
  ], l = o.map((f) => Mi(f, t - r, e - r, t + r, e + r)).filter((f) => !!f);
  if (!l.length) return;
  const c = [...l, ...a], h = [];
  for (const f of c)
    for (const [g, d] of [
      [f.x1, f.y1],
      [f.x2, f.y2]
    ]) {
      const y = Math.atan2(d - e, g - t);
      for (const w of [y - 1e-4, y, y + 1e-4]) {
        const S = Math.cos(w), k = Math.sin(w);
        let M = 1 / 0;
        for (const R of c) {
          const G = Pi(t, e, S, k, R);
          G !== void 0 && G < M && (M = G);
        }
        M < 1 / 0 && h.push({ x: t + S * M, y: e + k * M, a: w });
      }
    }
  h.sort((f, g) => f.a - g.a);
  const p = (f) => Math.round(f * 100) / 100;
  return h.map(({ x: f, y: g }) => ({ x: p(f), y: p(g) }));
}
function Oe(t, e) {
  return t.type !== "door" ? !1 : t.entity ? Y(e?.states[t.entity]) : !0;
}
function Ce(t, e, i, s = () => 12) {
  const n = e.filter(i);
  if (!n.length) return t;
  const o = [];
  for (const r of t) {
    const a = r.x2 - r.x1, l = r.y2 - r.y1, c = a * a + l * l;
    if (c === 0) {
      o.push(r);
      continue;
    }
    const h = Math.sqrt(c), p = [];
    for (const d of n) {
      if (Pe(d.x, d.y, r) > s(r) / 2 + 1) continue;
      const y = ((d.x - r.x1) * a + (d.y - r.y1) * l) / c, w = d.length / 2 / h, S = Math.max(0, y - w), k = Math.min(1, y + w);
      k > S && p.push([S, k]);
    }
    if (!p.length) {
      o.push(r);
      continue;
    }
    p.sort((d, y) => d[0] - y[0]);
    let f = 0;
    const g = (d, y) => {
      y - d > 1e-6 && o.push({ ...r, x1: r.x1 + a * d, y1: r.y1 + l * d, x2: r.x1 + a * y, y2: r.y1 + l * y });
    };
    for (const [d, y] of p)
      g(f, d), f = Math.max(f, y);
    g(f, 1);
  }
  return o;
}
function Oi(t) {
  if (!t || t.state === "unavailable" || t.state === "unknown") return;
  const e = t.attributes?.current_position;
  if (typeof e == "number" && Number.isFinite(e)) return 1 - Math.max(0, Math.min(100, e)) / 100;
  if (t.state === "closed") return 1;
  if (t.state === "open") return 0;
  if (t.state === "opening" || t.state === "closing") return 0.5;
}
function Ci(t, e, i, s) {
  const n = t.items.filter((a) => a.entity && ut(a)).map((a) => ({ it: a, paint: Ei(a, i.states[a.entity]) })).filter((a) => !!a.paint);
  if (!n.length) return m;
  const o = (a) => a.thickness ?? e.settings.wallThickness, r = Ce(t.walls, t.openings, (a) => Oe(a, i), o);
  return _`<g class="fp-glows">
    ${n.map(({ it: a, paint: l }, c) => {
    const h = `${s}-${c}`, p = Me(a.x, a.y, l.radius, r, o);
    return _`
        ${p ? _`<clipPath id="${h}-clip"><polygon points=${p.map((f) => `${f.x},${f.y}`).join(" ")}></polygon></clipPath>` : m}
        <radialGradient id=${h} gradientUnits="userSpaceOnUse" cx=${a.x} cy=${a.y} r=${l.radius}>
          <stop offset="0" stop-color=${l.color} stop-opacity=${l.opacity}></stop>
          <stop offset="1" stop-color=${l.color} stop-opacity="0"></stop>
        </radialGradient>
        <circle class="fp-glow" cx=${a.x} cy=${a.y} r=${l.radius} fill="url(#${h})"
                clip-path=${p ? `url(#${h}-clip)` : m}></circle>`;
  })}
  </g>`;
}
const le = 10;
function Dt(t) {
  return t.leaves?.length ? t.leaves : [{ w: 1 }];
}
function Nt(t) {
  const e = Dt(t), i = e.reduce((n, o) => n + Math.max(o.w, 1e-4), 0);
  let s = -t.length / 2;
  return e.map((n, o) => {
    const r = Math.max(n.w, 1e-4) / i * t.length, a = {
      index: o,
      x0: s,
      x1: s + r,
      hinge: n.hinge ?? zi(t, o, e.length),
      entity: n.entity || t.entity || void 0
    };
    return s += r, a;
  });
}
function zi(t, e, i) {
  return i === 1 ? t.hinge ?? "left" : e === i - 1 ? "right" : "left";
}
function ze(t, e) {
  if (!t || !e) return { open: !1, unknown: !1 };
  const i = e.states[t], s = !i || i.state === "unavailable" || i.state === "unknown";
  return { open: !s && Y(i), unknown: s };
}
function Ii(t, e) {
  return ze(t.entity, e);
}
function Ri(t) {
  return !t || t.state === "unavailable" || t.state === "unknown" ? "unknown" : t.state === "locked" ? "locked" : "unlocked";
}
function At(t) {
  return t.type === "window" && !t.entity && !t.leaves?.some((e) => e.entity);
}
function Li(t, e) {
  const i = Math.max(1, Math.min(Rt, Math.round(e))), s = t.length ? t.map((o) => ({ ...o })) : [{ w: 1 }];
  if (i <= s.length) return s.slice(0, i);
  const n = s.reduce((o, r) => o + r.w, 0) / s.length;
  for (; s.length < i; ) s.push({ w: n });
  return s;
}
function Ti(t, e, i, s) {
  if (t.length === 1) return t.map((h) => ({ ...h }));
  const n = t.length - 1, o = Math.max(le, Math.min(s - le * n, i)), r = t.reduce((h, p, f) => f === e ? h : h + p.w, 0), a = s - o, l = t.reduce((h, p) => h + p.w, 0), c = s / l;
  return t.map((h, p) => {
    if (p === e) return { ...h, w: o / c };
    const f = r > 0 ? h.w / r : 1 / n;
    return { ...h, w: a * f / c };
  });
}
const Di = 0.12;
function xt(t, e) {
  return t.thickness ?? e.settings.wallThickness;
}
function Z(t, e) {
  return t.walls.reduce((i, s) => Math.max(i, xt(s, e)), e.settings.wallThickness);
}
function Ni(t, e) {
  const i = t.color ?? "var(--primary-color)", s = t.opacity ?? Di;
  return e && t.entity && Y(e.states[t.entity]) ? { color: t.activeColor ?? "#ffc107", opacity: Math.min(1, s + 0.2) } : { color: i, opacity: s };
}
function Ie(t, e) {
  const { color: i, opacity: s } = Ni(t, e.hass), n = t.points.map((c) => `${c.x},${c.y}`).join(" "), o = Math.min(...t.points.map((c) => c.x)), r = Math.min(...t.points.map((c) => c.y));
  let a = { x: o + e.labelSize * 0.8, y: r + e.labelSize * 1.5 };
  yt(t.points, a.x, a.y) || (a = xi(t.points));
  const l = yt(t.points, o + e.labelSize * 0.8, r + e.labelSize * 1.5) ? "start" : "middle";
  return _`
    <g class="area ${e.selected ? "selected" : ""} ${e.dimmed ? "dimmed" : ""}" data-id=${t.id}>
      <polygon points=${n} fill=${i} fill-opacity=${s}
        style=${t.type === "balcony" ? `stroke:${i};stroke-width:3;stroke-dasharray:10 6;stroke-linejoin:round` : m}></polygon>
      ${t.showName !== !1 && t.name ? _`<text class="area-label" x=${a.x} y=${a.y} font-size=${e.labelSize}
                  text-anchor=${l} dominant-baseline="middle">${t.name}</text>` : m}
    </g>`;
}
function Re(t, e, i, s = {}) {
  const { width: n, height: o } = e.canvas, r = Math.max(n, o), a = Z(t, e) + 2;
  return _`
    <defs>
      <mask id=${i} maskUnits="userSpaceOnUse" x=${-r} y=${-r} width=${n + 2 * r} height=${o + 2 * r}>
        <rect x=${-r} y=${-r} width=${n + 2 * r} height=${o + 2 * r} fill="white"></rect>
        ${t.openings.map(
    (l) => _`<rect x=${l.x - l.length / 2} y=${l.y - a / 2} width=${l.length} height=${a}
                           fill="black" transform="rotate(${l.angle} ${l.x} ${l.y})"></rect>`
  )}
      </mask>
    </defs>
    <g class="walls" mask="url(#${i})">
      ${t.walls.map(
    (l) => _`<line class="wall ${s.selectedId === l.id ? "selected" : ""}" data-id=${l.id}
                         x1=${l.x1} y1=${l.y1} x2=${l.x2} y2=${l.y2}
                         stroke-width=${xt(l, e)}></line>`
  )}
    </g>`;
}
function ce(t, e, i, s) {
  const n = e * s < 0 ? 0 : 1;
  return _`
    <path class="swing" d="M ${t} ${s * i} A ${i} ${i} 0 0 ${n} ${t - e * i} 0"></path>
    <line class="leaf" x1=${t} y1="0" x2=${t} y2=${s * i}></line>`;
}
function Ui(t, e, i, s) {
  const n = e, o = s?.states[t.entity], r = Oi(o), a = o?.state === "opening" || o?.state === "closing", l = t.side === "in" ? 1 : -1, c = Math.max(i * 0.8, 8), h = l * i / 2, p = l > 0 ? h : h - c, f = (r ?? 0) * c, g = l > 0 ? h : h - f, d = [];
  for (let y = 3; y < f; y += 3) d.push(h + l * y);
  return _`
    <g class="shutter ${t.side} ${a ? "moving" : ""} ${r === void 0 ? "unknown" : ""}" style="--fp-shutter:${t.color || Ae}">
      <rect class="shutter-track" x=${-n / 2} y=${p} width=${n} height=${c}></rect>
      ${f > 0 ? _`<rect class="shutter-fill" x=${-n / 2} y=${g} width=${n} height=${f}></rect>` : m}
      ${d.map((y) => _`<line class="shutter-slat" x1=${-n / 2} y1=${y} x2=${n / 2} y2=${y}></line>`)}
    </g>`;
}
function Wi(t, e) {
  if (!t.lockEntity) return m;
  const i = Ri(e?.states[t.lockEntity]), n = -(t.hinge === "right" ? 1 : -1) * (t.length / 2 - 9);
  return _`
    <g class="lock ${i}" transform="translate(${n} 0)">
      <circle r="6.5"></circle>
      <path class="shackle" d=${i === "locked" ? "M -2.4 -1 V -3 a 2.4 2.4 0 0 1 4.8 0 V -1" : "M -2.4 -1 V -3 a 2.4 2.4 0 0 1 4.8 0 V -2.4"}></path>
      <rect x="-3.4" y="-1" width="6.8" height="5" rx="1"></rect>
    </g>`;
}
function Le(t, e, i = {}) {
  const s = t.length, n = `--fp-open:${t.openColor || Se}`, o = t.hinge === "right" ? 1 : -1, r = t.swing === "out" ? -1 : 1;
  if (t.type === "window") {
    const h = e - 2, p = Nt(t).map((d) => {
      const y = ze(d.entity, i.hass);
      return { seg: d, open: !!i.forceOpen || y.open, unknown: y.unknown };
    }), f = Math.max(...p.filter((d) => d.open).map((d) => d.seg.x1 - d.seg.x0), 0), g = `opening window ${i.selected ? "selected" : ""} ${i.warn ? "warn" : ""}`;
    return _`
      <g class=${g} data-id=${t.id} transform="translate(${t.x} ${t.y}) rotate(${t.angle})" style=${n}>
        <rect class="hit" x=${-s / 2} y=${r < 0 ? -f : -h / 2} width=${s} height=${f + h}></rect>
        ${(t.shutters ?? []).map((d) => Ui(d, s, e, i.hass))}
        ${p.map(({ seg: d, open: y, unknown: w }) => {
      const S = d.x1 - d.x0, k = d.hinge === "right" ? d.x1 : d.x0, M = d.hinge === "right" ? 1 : -1;
      return _`
            <g class="seg ${y ? "open" : ""} ${w ? "unknown" : ""} ${i.leafIndex === d.index ? "sel" : ""}">
              <rect class="frame" x=${d.x0} y=${-h / 2} width=${S} height=${h}></rect>
              ${y ? ce(k, M, S, r) : _`<line class="glass" x1=${d.x0} y1=${-h / 6} x2=${d.x1} y2=${-h / 6}></line>
                      <line class="glass" x1=${d.x0} y1=${h / 6} x2=${d.x1} y2=${h / 6}></line>`}
            </g>`;
    })}
      </g>`;
  }
  const a = Ii(t, i.hass), l = !!i.forceOpen || !t.entity || a.open, c = `opening door ${l ? "open" : ""} ${a.unknown ? "unknown" : ""} ${i.selected ? "selected" : ""}`;
  return _`
    <g class=${c} data-id=${t.id} transform="translate(${t.x} ${t.y}) rotate(${t.angle})" style=${n}>
      <rect class="hit" x=${-s / 2} y=${r > 0 ? -e / 2 : -s} width=${s} height=${s + e / 2}></rect>
      ${l ? ce(o * s / 2, o, s, r) : _`<rect class="frame" x=${-s / 2} y=${-(e - 2) / 2} width=${s} height=${e - 2}></rect>
              <line class="leaf closed" x1=${-s / 2} y1="0" x2=${s / 2} y2="0"></line>`}
      ${Wi(t, i.hass)}
    </g>`;
}
function Fi(t, e, i = {}) {
  const s = Z(t, e) + 2;
  return _`<g class="openings">${t.openings.map(
    (n) => Le(n, s, { hass: i.hass, selected: i.selectedId === n.id })
  )}</g>`;
}
const Te = `
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
  .opening.door .leaf.closed { stroke-width: 2.5; }
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
var ji = Object.defineProperty, Hi = Object.getOwnPropertyDescriptor, $ = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Hi(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (n = (s ? r(e, i, n) : r(n)) || n);
  return s && n && ji(e, i, n), n;
};
const ct = "floorplan_panel", Bi = 100, W = 12, ht = (t, e, i) => Math.abs(t - i.x) < 0.5 && Math.abs(e - i.y) < 0.5, he = 14, Gi = 7, de = [
  { id: "select", icon: "mdi:cursor-default-outline", label: "Auswahl", hint: "Element anklicken zum Bearbeiten, ziehen zum Verschieben. Leere Fläche ziehen verschiebt die Ansicht, Mausrad zoomt." },
  { id: "wall", icon: "mdi:wall", label: "Wand", hint: "Klick setzt Anfang, weitere Klicks setzen Wandstücke. Esc oder Doppelklick beendet. Umschalt: freier Winkel, Alt: ohne Raster." },
  { id: "area", icon: "mdi:vector-polygon", label: "Raum", hint: "Ecken nacheinander anklicken, zum Schließen den ersten Punkt anklicken oder Enter drücken. Esc bricht ab." },
  { id: "rect", icon: "mdi:vector-rectangle", label: "Raum (Rechteck)", hint: "Von Ecke zu Ecke ziehen: legt Raumfläche und die vier Wände in einem Zug an. Alt: ohne Raster/Fang, Esc bricht ab." },
  { id: "door", icon: "mdi:door", label: "Tür", hint: "Auf eine Wand klicken, um dort eine Tür einzusetzen." },
  { id: "window", icon: "mdi:window-closed-variant", label: "Fenster", hint: "Auf eine Wand klicken, um dort ein Fenster einzusetzen." },
  { id: "item", icon: "mdi:map-marker-plus", label: "Icon", hint: "Klick platziert ein freies Icon – Icon und Entität danach rechts wählen." }
], Ki = [
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
  "mdi:information"
], dt = ["#4f8bd6", "#e0a030", "#3fb5a8", "#8e6cc9", "#d65f5f", "#6aa84f", "#9e9e9e"];
let v = class extends I {
  constructor() {
    super(...arguments), this.revision = 0, this.narrow = !1, this._tool = "select", this._view = { x: 0, y: 0, w: 1e3, h: 700 }, this._roomPoints = [], this._dirty = !1, this._saving = !1, this._conflict = !1, this._svgSize = { w: 1, h: 1 }, this._undo = [], this._redo = [], this._baseRevision = 0, this._keyHandler = (t) => this._onKey(t);
  }
  // ---------------------------------------------------------------- Lebenszyklus
  willUpdate(t) {
    t.has("plan") && !this._draft && (this._draft = Tt(structuredClone(this.plan)), this._baseRevision = this.revision, this._floorId = this.floorId && this._draft.floors.some((e) => e.id === this.floorId) ? this.floorId : this._draft.floors[0]?.id, this._floorId || (this._draft.floors.push({ id: "eg", name: "Wohnung", walls: [], openings: [], areas: [], items: [] }), this._floorId = "eg"), this._fitView(), this.initialAreaId && this._floor.areas.some((e) => e.id === this.initialAreaId) && (this._sel = { kind: "area", id: this.initialAreaId }));
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._keyHandler);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("keydown", this._keyHandler), this._ro?.disconnect();
  }
  firstUpdated() {
    this._ro = new ResizeObserver(() => {
      const t = this._svg?.getBoundingClientRect();
      t && t.width && t.height && (this._svgSize = { w: t.width, h: t.height });
    }), this._svg && this._ro.observe(this._svg);
  }
  get _floor() {
    return this._draft.floors.find((t) => t.id === this._floorId);
  }
  /** Planeinheiten pro Bildschirmpixel (für Griffe, Fangradius, Icons). */
  get _upp() {
    return Math.max(this._view.w / this._svgSize.w, this._view.h / this._svgSize.h);
  }
  _fitView() {
    const t = It(this._floor, this._draft), e = Math.max(t.w, t.h) * 0.1;
    this._view = { x: t.x - e, y: t.y - e, w: t.w + 2 * e, h: t.h + 2 * e };
  }
  // ---------------------------------------------------------------- Änderungen & Undo
  _snapshot() {
    return JSON.stringify({ plan: this._draft, floorId: this._floorId });
  }
  _pushUndo(t) {
    this._undo.push(t), this._undo.length > Bi && this._undo.shift(), this._redo = [], this._dirty = !0;
  }
  /** Führt eine Änderung am Entwurf aus und legt vorher einen Undo-Schritt an. */
  _mutate(t) {
    this._pushUndo(this._snapshot()), t(this._floor, this._draft), this._draft = { ...this._draft };
  }
  _restore(t) {
    const { plan: e, floorId: i } = JSON.parse(t);
    this._draft = e, this._floorId = i, this._sel && !this._findSelected() && (this._sel = void 0);
  }
  _doUndo() {
    const t = this._undo.pop();
    t && (this._redo.push(this._snapshot()), this._restore(t), this._dirty = !0);
  }
  _doRedo() {
    const t = this._redo.pop();
    t && (this._undo.push(this._snapshot()), this._restore(t), this._dirty = !0);
  }
  _findSelected() {
    if (this._sel)
      return this._collection(this._sel.kind).find((t) => t.id === this._sel.id);
  }
  _collection(t) {
    const e = this._floor;
    return t === "wall" ? e.walls : t === "opening" ? e.openings : t === "area" ? e.areas : e.items;
  }
  /** Fenster ohne Fensterkontakt auf allen Etagen (Pflichtfeld, nur Warnung). */
  get _windowsWithoutContact() {
    return this._draft.floors.flatMap(
      (t) => t.openings.filter(At).map((e) => ({ floorId: t.id, opening: e }))
    );
  }
  _selectOpening(t, e) {
    this._floorId = t, this._sel = { kind: "opening", id: e }, this._tool = "select";
  }
  _deleteSelected() {
    const t = this._sel;
    t && (this._mutate((e) => {
      const i = t.kind === "wall" ? "walls" : t.kind === "opening" ? "openings" : t.kind === "area" ? "areas" : "items";
      e[i] = e[i].filter((s) => s.id !== t.id);
    }), this._sel = void 0);
  }
  /** Ändert ein Feld der Auswahl; leere Werte entfernen das Feld. */
  _setProp(t, e) {
    this._sel && this._mutate(() => {
      const s = this._findSelected();
      s && (e === "" || e === void 0 || e === null || typeof e == "number" && Number.isNaN(e) ? delete s[t] : s[t] = e);
    });
  }
  // ---------------------------------------------------------------- Speichern
  async _save(t = !1) {
    this._saving = !0, this._error = void 0;
    try {
      const e = await this.hass.callWS({
        type: `${ct}/plan/save`,
        plan: this._draft,
        revision: t ? null : this._baseRevision
      });
      this._conflict = !1, this._dirty = !1, this._baseRevision = e.revision, this.dispatchEvent(new CustomEvent("editor-done", { detail: { plan: e.plan, revision: e.revision } }));
    } catch (e) {
      e?.code === "conflict" && (this._conflict = !0), this._error = e?.message ?? String(e);
    } finally {
      this._saving = !1;
    }
  }
  _close() {
    this._dirty && !confirm("Ungespeicherte Änderungen verwerfen?") || this.dispatchEvent(new CustomEvent("editor-done", { detail: {} }));
  }
  async _loadSample() {
    if (confirm("Den aktuellen Grundriss durch den Beispiel-Grundriss ersetzen? Der bisherige Stand bleibt im Verlauf."))
      try {
        const t = await this.hass.callWS({ type: `${ct}/plan/load_sample` });
        this._acceptServerPlan(t.plan, t.revision);
      } catch (t) {
        this._error = t?.message ?? String(t);
      }
  }
  _acceptServerPlan(t, e) {
    this._draft = Tt(t), this._baseRevision = e, this._floorId = this._draft.floors[0].id, this._undo = [], this._redo = [], this._dirty = !1, this._sel = void 0, this._history = void 0, this._fitView();
  }
  async _loadHistory() {
    const t = await this.hass.callWS({ type: `${ct}/history/list` });
    this._history = t.items;
  }
  async _restoreHistory(t) {
    if (!confirm("Diesen Stand wiederherstellen? Der aktuelle gespeicherte Stand bleibt im Verlauf.")) return;
    const e = await this.hass.callWS({ type: `${ct}/history/restore`, history_id: t });
    this._acceptServerPlan(e.plan, e.revision);
  }
  // ---------------------------------------------------------------- Zeiger
  _toPlan(t) {
    const e = this._svg.getScreenCTM();
    if (!e) return { x: 0, y: 0 };
    const i = new DOMPoint(t.clientX, t.clientY).matrixTransform(e.inverse());
    return { x: i.x, y: i.y };
  }
  /** Raster + Endpunktfang (Alt schaltet beides ab). */
  _snap(t, e, i = [], s = []) {
    if (e.altKey) return t;
    const n = $i(t, this._floor.walls, W * this._upp, i);
    if (n) return { ...n };
    const o = wi(t, this._floor.areas, W * this._upp, s);
    if (o) return o;
    const r = this._draft.settings.grid;
    return { x: lt(t.x, r), y: lt(t.y, r) };
  }
  _hit(t) {
    for (const e of t.composedPath()) {
      if (!(e instanceof Element)) continue;
      if (e === this._svg) break;
      const i = e.getAttribute("data-handle");
      if (i) return { kind: "handle", id: e.getAttribute("data-owner") ?? "", handle: i };
      const s = e.getAttribute("data-kind"), n = e.getAttribute("data-id");
      if (s && n) return { kind: s, id: n };
    }
  }
  _onPointerDown(t) {
    if (t.button === 2) return;
    const e = this._toPlan(t), i = this._snapshot(), s = { pointerId: t.pointerId, start: e, screenStart: { x: t.clientX, y: t.clientY }, before: i, moved: !1 };
    if (t.button === 1) {
      this._drag = { ...s, mode: "pan", viewStart: { ...this._view } }, this._svg.setPointerCapture(t.pointerId), t.preventDefault();
      return;
    }
    switch (this._tool) {
      case "select": {
        const n = this._hit(t);
        if (n?.kind === "handle" && this._sel) {
          const o = this._findSelected();
          if (this._drag = { ...s, mode: "handle", sel: this._sel, handle: n.handle, orig: structuredClone(o) }, this._sel.kind === "wall" && o) {
            const r = n.handle === "p1" ? 1 : 2;
            this._drag.links = [this._linksAt(o, r)];
          } else if (this._sel.kind === "area" && o && n.handle?.startsWith("v")) {
            const r = o.points[Number(n.handle.slice(1))];
            this._drag.links = [this._linksAt(void 0, 0, r, o)];
          }
        } else if (n && n.kind !== "handle") {
          if (this._sel = { kind: n.kind, id: n.id }, this._drag = { ...s, mode: "move", sel: this._sel, orig: structuredClone(this._findSelected()) }, n.kind === "wall") {
            const o = this._findSelected();
            this._drag.links = [this._linksAt(o, 1), this._linksAt(o, 2)];
          }
        } else
          this._sel = void 0, this._drag = { ...s, mode: "pan", viewStart: { ...this._view } };
        this._svg.setPointerCapture(t.pointerId);
        break;
      }
      case "wall": {
        const n = this._snap(e, t);
        if (!this._chainStart)
          this._chainStart = n;
        else {
          const o = t.shiftKey ? n : St(this._chainStart, n);
          if (O(o, this._chainStart) > 1) {
            const r = this._chainStart;
            this._mutate((a) => a.walls.push({ id: U("w"), x1: r.x, y1: r.y, x2: o.x, y2: o.y })), this._chainStart = o;
          }
        }
        break;
      }
      case "area": {
        const n = this._snap(e, t);
        this._roomPoints.length >= 3 && O(n, this._roomPoints[0]) <= W * this._upp ? this._finishRoom() : this._roomPoints = [...this._roomPoints, n];
        break;
      }
      case "rect": {
        this._drag = { ...s, mode: "rect", start: this._snap(e, t) }, this._svg.setPointerCapture(t.pointerId);
        break;
      }
      case "door":
      case "window":
        this._placeOpening(this._tool, e, t);
        break;
      case "item": {
        const n = this._snap(e, t), o = U("i");
        this._mutate((r) => r.items.push({ id: o, x: n.x, y: n.y, icon: "mdi:lightbulb", tapAction: "auto" })), this._sel = { kind: "item", id: o }, this._tool = "select";
        break;
      }
    }
  }
  _onPointerMove(t) {
    const e = this._toPlan(t);
    this._cursor = e;
    const i = this._drag;
    if (!i || i.pointerId !== t.pointerId) return;
    const s = t.clientX - i.screenStart.x, n = t.clientY - i.screenStart.y;
    if (!i.moved && Math.hypot(s, n) < 3) return;
    if (i.moved = !0, i.mode === "pan" && i.viewStart) {
      const h = this._upp;
      this._view = { ...i.viewStart, x: i.viewStart.x - s * h, y: i.viewStart.y - n * h };
      return;
    }
    const o = this._findSelected();
    if (!o || !i.sel) return;
    const r = t.altKey ? 0 : this._draft.settings.grid, a = lt(e.x - i.start.x, r), l = lt(e.y - i.start.y, r), c = i.orig;
    if (i.mode === "move")
      switch (i.sel.kind) {
        case "wall":
          Object.assign(o, { x1: c.x1 + a, y1: c.y1 + l, x2: c.x2 + a, y2: c.y2 + l });
          for (const h of i.links ?? []) this._applyLink(h, h.end === 1 ? { x: c.x1 + a, y: c.y1 + l } : { x: c.x2 + a, y: c.y2 + l });
          break;
        case "area":
          o.points = c.points.map((h) => ({ x: h.x + a, y: h.y + l }));
          break;
        case "item":
          Object.assign(o, { x: c.x + a, y: c.y + l });
          break;
        case "opening": {
          const h = { x: c.x + (e.x - i.start.x), y: c.y + (e.y - i.start.y) }, p = kt(h, this._floor.walls, Z(this._floor, this._draft) * 2 + W * this._upp);
          p && !t.altKey ? Object.assign(o, { x: V(p.point.x), y: V(p.point.y), angle: ue(c.angle, p.angle) }) : Object.assign(o, { x: c.x + a, y: c.y + l });
          break;
        }
      }
    else if (i.mode === "handle" && i.handle) {
      if (i.sel.kind === "wall") {
        const h = i.handle === "p1" ? 1 : 2, p = h === 1 ? { x: c.x2, y: c.y2 } : { x: c.x1, y: c.y1 }, f = i.links?.[0];
        let g = this._snap(e, t, [o, ...(f?.walls ?? []).map((d) => d.wall)], f?.verts ?? []);
        !t.shiftKey && !t.altKey && (g = St(p, g)), o[`x${h}`] = g.x, o[`y${h}`] = g.y, f && this._applyLink(f, g);
      } else if (i.sel.kind === "area" && i.handle.startsWith("v")) {
        const h = o.points[Number(i.handle.slice(1))], p = i.links?.[0], f = this._snap(e, t, p?.walls.map((g) => g.wall) ?? [], [h, ...p?.verts ?? []]);
        Object.assign(h, f), p && this._applyLink(p, f);
      }
    }
    this._draft = { ...this._draft };
  }
  _onPointerUp(t) {
    const e = this._drag;
    if (!(!e || e.pointerId !== t.pointerId)) {
      if (this._drag = void 0, this._svg.hasPointerCapture(t.pointerId) && this._svg.releasePointerCapture(t.pointerId), e.mode === "rect") {
        this._finishRect(e.start, this._snap(this._toPlan(t), t));
        return;
      }
      e.moved && e.mode !== "pan" && this._pushUndo(e.before);
    }
  }
  _onDblClick(t) {
    if (this._tool === "wall") {
      this._chainStart = void 0;
      return;
    }
    if (this._tool === "area" && this._roomPoints.length >= 3) {
      this._finishRoom();
      return;
    }
    if (this._tool !== "select" || this._sel?.kind !== "area") return;
    const e = this._findSelected(), i = this._hit(t);
    if (i?.kind === "handle" && i.handle?.startsWith("v")) {
      if (e.points.length <= 3) return;
      const o = Number(i.handle.slice(1));
      this._mutate(() => e.points.splice(o, 1));
      return;
    }
    const s = this._toPlan(t);
    let n = { i: -1, d: W * this._upp, pt: s };
    if (e.points.forEach((o, r) => {
      const a = e.points[(r + 1) % e.points.length], { point: l } = ke(s, o, a), c = O(s, l);
      c < n.d && (n = { i: r, d: c, pt: l });
    }), n.i >= 0) {
      const o = this._snap(n.pt, t);
      this._mutate(() => e.points.splice(n.i + 1, 0, o));
    }
  }
  _onWheel(t) {
    t.preventDefault();
    const e = this._toPlan(t), i = Math.exp(t.deltaY * 15e-4), { width: s, height: n } = this._draft.canvas, o = Math.max(s, n) * 8, r = Math.min(o, Math.max(50, this._view.w * i)), a = r / this._view.w;
    this._view = {
      x: e.x - (e.x - this._view.x) * a,
      y: e.y - (e.y - this._view.y) * a,
      w: r,
      h: this._view.h * a
    };
  }
  _onKey(t) {
    const e = t.composedPath()[0], i = e && (e.tagName === "INPUT" || e.tagName === "TEXTAREA" || e.tagName === "SELECT");
    if ((t.ctrlKey || t.metaKey) && t.key.toLowerCase() === "z" && !i) {
      t.preventDefault(), t.shiftKey ? this._doRedo() : this._doUndo();
      return;
    }
    if ((t.ctrlKey || t.metaKey) && t.key.toLowerCase() === "y" && !i) {
      t.preventDefault(), this._doRedo();
      return;
    }
    if ((t.ctrlKey || t.metaKey) && t.key.toLowerCase() === "s") {
      t.preventDefault(), this._dirty && !this._saving && this._save();
      return;
    }
    i || (t.key === "Escape" ? this._drag?.mode === "rect" ? (this._svg.hasPointerCapture(this._drag.pointerId) && this._svg.releasePointerCapture(this._drag.pointerId), this._drag = void 0) : this._chainStart ? this._chainStart = void 0 : this._roomPoints.length ? this._roomPoints = [] : this._tool !== "select" ? this._tool = "select" : this._sel = void 0 : t.key === "Enter" && this._tool === "area" && this._roomPoints.length >= 3 ? this._finishRoom() : (t.key === "Delete" || t.key === "Backspace") && this._sel && (t.preventDefault(), this._deleteSelected()));
  }
  /** Wand-Endpunkte und Raumecken, die genau auf dem Punkt liegen (Endpunkt `end` von `wall` bzw. `pt` einer Raumecke). */
  _linksAt(t, e, i, s) {
    const n = i ?? (e === 1 ? { x: t.x1, y: t.y1 } : { x: t.x2, y: t.y2 }), o = [];
    for (const a of this._floor.walls)
      a !== t && (O(n, { x: a.x1, y: a.y1 }) < 0.5 && o.push({ wall: a, end: 1 }), O(n, { x: a.x2, y: a.y2 }) < 0.5 && o.push({ wall: a, end: 2 }));
    const r = [];
    for (const a of this._floor.areas)
      for (const l of a.points) l !== i && a !== s && O(n, l) < 0.5 && r.push(l);
    return { end: e, walls: o, verts: r };
  }
  _applyLink(t, e) {
    for (const i of t.walls)
      i.wall[`x${i.end}`] = e.x, i.wall[`y${i.end}`] = e.y;
    for (const i of t.verts) Object.assign(i, e);
  }
  _placeOpening(t, e, i) {
    const s = kt(e, this._floor.walls, Z(this._floor, this._draft) + W * 2 * this._upp), n = t === "door" ? 80 : 120, o = s ? { x: V(s.point.x), y: V(s.point.y) } : this._snap(e, i), r = U(t === "door" ? "t" : "f"), a = { id: r, type: t, x: o.x, y: o.y, length: n, angle: s ? ue(0, s.angle) : 0 };
    t === "door" && Object.assign(a, { hinge: "left", swing: "in" }), this._mutate((l) => l.openings.push(a)), this._sel = { kind: "opening", id: r };
  }
  _finishRoom() {
    const t = this._roomPoints;
    if (t.length < 3) return;
    const e = U("r"), i = this._floor.areas.length;
    this._mutate(
      (s) => s.areas.push({ id: e, name: `Raum ${i + 1}`, points: t, color: dt[i % dt.length], sidebar: [] })
    ), this._roomPoints = [], this._sel = { kind: "area", id: e }, this._tool = "select";
  }
  _finishRect(t, e) {
    const i = Math.min(t.x, e.x), s = Math.max(t.x, e.x), n = Math.min(t.y, e.y), o = Math.max(t.y, e.y);
    if (s - i < 1 || o - n < 1) return;
    const r = [
      { x: i, y: n },
      { x: s, y: n },
      { x: s, y: o },
      { x: i, y: o }
    ], a = U("r"), l = this._floor.areas.length;
    this._mutate((c) => {
      r.forEach((h, p) => {
        const f = r[(p + 1) % 4];
        c.walls.some(
          (d) => ht(d.x1, d.y1, h) && ht(d.x2, d.y2, f) || ht(d.x1, d.y1, f) && ht(d.x2, d.y2, h)
        ) || c.walls.push({ id: U("w"), x1: h.x, y1: h.y, x2: f.x, y2: f.y });
      }), c.areas.push({ id: a, name: `Raum ${l + 1}`, points: r, color: dt[l % dt.length], sidebar: [] });
    }), this._sel = { kind: "area", id: a }, this._tool = "select";
  }
  _setTool(t) {
    this._tool = t, this._chainStart = void 0, this._roomPoints = [];
  }
  // ---------------------------------------------------------------- Darstellung
  render() {
    if (!this._draft) return m;
    const t = de.find((e) => e.id === this._tool);
    return u`
      <div class="toolbar">
        <button class="icon-btn" title="Schließen" @click=${this._close}><ha-icon icon="mdi:close"></ha-icon></button>
        <div class="main-title">Grundriss bearbeiten${this._dirty ? u`<span class="dirty"> • ungespeichert</span>` : m}</div>
        <button class="icon-btn" title="Rückgängig (Strg+Z)" ?disabled=${!this._undo.length} @click=${this._doUndo}>
          <ha-icon icon="mdi:undo"></ha-icon>
        </button>
        <button class="icon-btn" title="Wiederholen (Strg+Y)" ?disabled=${!this._redo.length} @click=${this._doRedo}>
          <ha-icon icon="mdi:redo"></ha-icon>
        </button>
        ${this._windowsWithoutContact.length ? u`<button
              class="warn-chip"
              title="Fenster ohne Fensterkontakt – zum ersten springen"
              @click=${() => {
      const e = this._windowsWithoutContact[0];
      this._selectOpening(e.floorId, e.opening.id);
    }}
            >
              <ha-icon icon="mdi:alert"></ha-icon>${this._windowsWithoutContact.length} Fenster ohne Kontakt
            </button>` : m}
        <button class="save" ?disabled=${!this._dirty || this._saving} @click=${() => this._save()}>
          ${this._saving ? "Speichert …" : "Speichern"}
        </button>
      </div>
      ${this._error ? u`<div class="error-bar">
            ${this._conflict ? "Der Grundriss wurde inzwischen an anderer Stelle gespeichert." : this._error}
            ${this._conflict ? u`<button @click=${() => this._save(!0)}>Trotzdem überschreiben</button>` : m}
            <button @click=${() => this._error = void 0}>OK</button>
          </div>` : m}
      <div class="body">
        <div class="tools">
          ${de.map(
      (e) => u`<button class="tool ${e.id === this._tool ? "active" : ""}" title=${e.label} @click=${() => this._setTool(e.id)}>
              <ha-icon .icon=${e.icon}></ha-icon><span>${e.label}</span>
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
            @pointerleave=${() => this._cursor = void 0}
            @dblclick=${this._onDblClick}
            @wheel=${this._onWheel}
            @contextmenu=${(e) => {
      e.preventDefault(), this._chainStart = void 0;
    }}
          >
            ${this._renderCanvas()}
          </svg>
          <div class="hint">${t.hint}</div>
        </div>
        <div class="props">${this._renderProps()}</div>
      </div>
    `;
  }
  _renderCanvas() {
    const t = this._draft, e = this._floor, { width: i, height: s } = t.canvas, n = this._upp, o = t.settings.grid, r = o * 10, a = Z(e, t) + 2, l = this._sel, c = this._view, [h, p, f, g] = [c.x - c.w, c.y - c.h, c.w * 3, c.h * 3];
    return _`
      <defs>
        <pattern id="grid-minor" width=${o} height=${o} patternUnits="userSpaceOnUse">
          <path d="M ${o} 0 L 0 0 0 ${o}" class="grid-minor"></path>
        </pattern>
        <pattern id="grid-major" width=${r} height=${r} patternUnits="userSpaceOnUse">
          <rect width=${r} height=${r} fill="url(#grid-minor)"></rect>
          <path d="M ${r} 0 L 0 0 0 ${r}" class="grid-major"></path>
        </pattern>
      </defs>
      <rect class="sheet" x=${h} y=${p} width=${f} height=${g}></rect>
      ${o * (1 / n) >= 4 ? _`<rect x=${h} y=${p} width=${f} height=${g} fill="url(#grid-major)" pointer-events="none"></rect>` : m}
      <g class="areas">
        ${e.areas.map(
      (d) => _`<g data-kind="area" data-id=${d.id}>${Ie(d, {
        selected: l?.kind === "area" && l.id === d.id,
        labelSize: Math.max(i, s) / 45
      })}</g>`
    )}
      </g>
      ${Re(e, t, "fp-editor-wall-mask", { selectedId: l?.kind === "wall" ? l.id : void 0 })}
      <g class="wall-hits">
        ${e.walls.map(
      (d) => _`<line data-kind="wall" data-id=${d.id} x1=${d.x1} y1=${d.y1} x2=${d.x2} y2=${d.y2}
                           stroke-width=${Math.max(xt(d, t), 10 * n)}></line>`
    )}
      </g>
      <g class="openings">
        ${e.openings.map(
      (d) => _`<g data-kind="opening" data-id=${d.id}>${Le(d, a, { selected: l?.kind === "opening" && l.id === d.id, forceOpen: l?.kind === "opening" && l.id === d.id, warn: At(d), leafIndex: l?.kind === "opening" && l.id === d.id ? this._leafSel ?? void 0 : void 0 })}</g>`
    )}
      </g>
      <g class="items">${e.items.map((d) => this._renderItem(d, n))}</g>
      ${this._renderSelectionOverlay(n)}
      ${this._renderDrawPreview(n)}
    `;
  }
  _renderItem(t, e) {
    const i = (t.size ?? 34) / 34 * he * e, s = this._sel?.kind === "item" && this._sel.id === t.id, n = t.icon ?? (t.entity ? L(this.hass, t.entity) : "mdi:map-marker");
    return _`
      <g class="item ${s ? "selected" : ""}" data-kind="item" data-id=${t.id}>
        <circle cx=${t.x} cy=${t.y} r=${i}></circle>
        <foreignObject x=${t.x - i} y=${t.y - i} width=${2 * i} height=${2 * i}>
          <div class="fo-icon" style="--mdc-icon-size:${i * 1.2}px;width:${2 * i}px;height:${2 * i}px">
            <ha-icon .icon=${n}></ha-icon>
          </div>
        </foreignObject>
        ${t.label ? _`<text x=${t.x} y=${t.y + i + 12 * e} font-size=${11 * e} text-anchor="middle" class="item-label">${t.label}</text>` : m}
      </g>`;
  }
  _renderSelectionOverlay(t) {
    const e = this._findSelected();
    if (!e || !this._sel) return m;
    if (this._sel.kind === "item" && ut(e)) {
      const s = e, n = s.glowRadius ?? Lt, o = (l) => xt(l, this._draft), r = Ce(this._floor.walls, this._floor.openings, (l) => Oe(l), o), a = Me(s.x, s.y, n, r, o);
      return a ? _`<polygon class="glow-reach" points=${a.map((l) => `${l.x},${l.y}`).join(" ")} stroke-width=${1.5 * t}></polygon>` : _`<circle class="glow-reach" cx=${s.x} cy=${s.y} r=${n} stroke-width=${1.5 * t}></circle>`;
    }
    const i = Gi * t;
    if (this._sel.kind === "wall") {
      const s = e;
      return _`
        <line class="sel-line" x1=${s.x1} y1=${s.y1} x2=${s.x2} y2=${s.y2} stroke-width=${2 * t}></line>
        <circle class="handle" data-handle="p1" cx=${s.x1} cy=${s.y1} r=${i} stroke-width=${2 * t}></circle>
        <circle class="handle" data-handle="p2" cx=${s.x2} cy=${s.y2} r=${i} stroke-width=${2 * t}></circle>
        ${this._lengthLabel({ x: s.x1, y: s.y1 }, { x: s.x2, y: s.y2 }, t)}`;
    }
    if (this._sel.kind === "area") {
      const s = e;
      return _`
        <polygon class="sel-outline" points=${s.points.map((n) => `${n.x},${n.y}`).join(" ")} stroke-width=${2 * t}></polygon>
        ${s.points.map(
        (n, o) => _`<circle class="handle" data-handle="v${o}" cx=${n.x} cy=${n.y} r=${i} stroke-width=${2 * t}></circle>`
      )}`;
    }
    return m;
  }
  _lengthLabel(t, e, i) {
    const s = O(t, e);
    return s < 1 ? m : _`<text class="measure" x=${(t.x + e.x) / 2} y=${(t.y + e.y) / 2 - 10 * i} font-size=${12 * i}
                     text-anchor="middle">${fe(s)}</text>`;
  }
  _renderDrawPreview(t) {
    const e = this._cursor;
    if (!e) return m;
    const i = { altKey: !1 };
    if (this._tool === "wall") {
      const s = this._snap(e, i);
      if (!this._chainStart) return _`<circle class="cursor-dot" cx=${s.x} cy=${s.y} r=${4 * t}></circle>`;
      const n = St(this._chainStart, s);
      return _`
        <line class="preview-wall" x1=${this._chainStart.x} y1=${this._chainStart.y} x2=${n.x} y2=${n.y}
              stroke-width=${this._draft.settings.wallThickness}></line>
        ${this._lengthLabel(this._chainStart, n, t)}`;
    }
    if (this._tool === "rect") {
      const s = this._snap(e, i), n = this._drag;
      if (n?.mode !== "rect") return _`<circle class="cursor-dot" cx=${s.x} cy=${s.y} r=${4 * t}></circle>`;
      const o = Math.min(n.start.x, s.x), r = Math.min(n.start.y, s.y), a = Math.abs(s.x - n.start.x), l = Math.abs(s.y - n.start.y);
      return _`
        <rect class="preview-area" x=${o} y=${r} width=${a} height=${l} stroke-width=${2 * t}></rect>
        ${a > 1 ? this._lengthLabel({ x: o, y: r }, { x: o + a, y: r }, t) : m}
        ${l > 1 ? this._lengthLabel({ x: o + a, y: r }, { x: o + a, y: r + l }, t) : m}`;
    }
    if (this._tool === "area") {
      const s = this._snap(e, i), n = [...this._roomPoints, s];
      return _`
        <polyline class="preview-area" points=${n.map((o) => `${o.x},${o.y}`).join(" ")} stroke-width=${2 * t}></polyline>
        ${this._roomPoints.map((o, r) => _`<circle class="cursor-dot ${r === 0 ? "first" : ""}" cx=${o.x} cy=${o.y} r=${(r === 0 ? 6 : 4) * t}></circle>`)}
        <circle class="cursor-dot" cx=${s.x} cy=${s.y} r=${4 * t}></circle>`;
    }
    if (this._tool === "door" || this._tool === "window") {
      const s = kt(e, this._floor.walls, Z(this._floor, this._draft) + W * 2 * t);
      return s ? _`<circle class="cursor-dot" cx=${s.point.x} cy=${s.point.y} r=${5 * t}></circle>` : m;
    }
    if (this._tool === "item") {
      const s = this._snap(e, i);
      return _`<circle class="preview-item" cx=${s.x} cy=${s.y} r=${he * t}></circle>`;
    }
    return m;
  }
  // ---------------------------------------------------------------- Eigenschaften
  _renderProps() {
    const t = this._findSelected();
    if (!t || !this._sel) return this._renderPlanProps();
    const e = { wall: "Wand", opening: t.type === "window" ? "Fenster" : "Tür", area: "Raum", item: "Icon" }[this._sel.kind];
    return u`
      <div class="props-head">
        <h3>${e}</h3>
        <button class="icon-btn" title="Löschen (Entf)" @click=${this._deleteSelected}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
        <button class="icon-btn" title="Auswahl aufheben" @click=${() => this._sel = void 0}><ha-icon icon="mdi:close"></ha-icon></button>
      </div>
      ${this._sel.kind === "wall" ? this._renderWallProps(t) : this._sel.kind === "opening" ? this._renderOpeningProps(t) : this._sel.kind === "area" ? this._renderAreaProps(t) : this._renderItemProps(t)}
    `;
  }
  _num(t, e, i, s = {}) {
    return u`<label class="field">
      <span>${t}</span>
      <input
        type="number"
        .value=${i == null ? "" : String(V(i))}
        min=${s.min ?? ""}
        max=${s.max ?? ""}
        step=${s.step ?? 1}
        placeholder=${s.placeholder ?? ""}
        @change=${(n) => {
      const o = n.target.value;
      this._setProp(e, o === "" ? void 0 : Number(o));
    }}
      />
    </label>`;
  }
  _text(t, e, i, s = "") {
    return u`<label class="field">
      <span>${t}</span>
      <input
        type="text"
        .value=${i ?? ""}
        placeholder=${s}
        @change=${(n) => this._setProp(e, n.target.value.trim())}
      />
    </label>`;
  }
  _check(t, e, i) {
    return u`<label class="check">
      <input type="checkbox" .checked=${!!i} @change=${(s) => this._setProp(e, s.target.checked)} />
      <span>${t}</span>
    </label>`;
  }
  _color(t, e, i, s) {
    return u`<label class="field color">
      <span>${t}</span>
      <input type="color" .value=${i && i.startsWith("#") ? i : s} @change=${(n) => this._setProp(e, n.target.value)} />
      ${i ? u`<button class="link" @click=${() => this._setProp(e, void 0)}>Standard</button>` : m}
    </label>`;
  }
  _entity(t, e, i, s = []) {
    return u`<div class="field">
      <span>${t}</span>
      <fp-entity-picker
        .hass=${this.hass}
        .value=${i ?? ""}
        .domains=${s}
        @value-changed=${(n) => this._setProp(e, n.detail.value)}
      ></fp-entity-picker>
    </div>`;
  }
  _renderWallProps(t) {
    return u`
      <div class="grid2">
        ${this._num("x1", "x1", t.x1)} ${this._num("y1", "y1", t.y1)} ${this._num("x2", "x2", t.x2)} ${this._num("y2", "y2", t.y2)}
      </div>
      ${this._num("Stärke", "thickness", t.thickness, { min: 1, max: 100, placeholder: `Standard (${this._draft.settings.wallThickness})` })}
      <p class="muted">Länge: ${fe(O({ x: t.x1, y: t.y1 }, { x: t.x2, y: t.y2 }))}. Endpunkte ziehen ändert die Wand; verbundene Wände ziehen mit.</p>
    `;
  }
  _renderOpeningProps(t) {
    const e = t.type === "window", i = At(t), s = Dt(t), n = Nt(t), o = (r) => t.shutters?.find((a) => a.side === r);
    return u`
      <label class="field">
        <span>Art</span>
        <select @change=${(r) => this._setProp("type", r.target.value)}>
          <option value="door" ?selected=${t.type === "door"}>Tür</option>
          <option value="window" ?selected=${e}>Fenster</option>
        </select>
      </label>
      <div class="grid2">
        ${this._num("Breite", "length", t.length, { min: 10, max: 1e3 })} ${this._num("Winkel", "angle", t.angle, { min: -360, max: 360, step: 15 })}
      </div>
      ${e ? u`
            <div class="field ${i ? "required-missing" : ""}">
              <span>Gesamtkontakt (für Flügel ohne eigenen Sensor)</span>
              <fp-entity-picker
                .hass=${this.hass}
                .value=${t.entity ?? ""}
                .domains=${["binary_sensor"]}
                placeholder="Fensterkontakt wählen …"
                @value-changed=${(r) => this._setProp("entity", r.detail.value)}
              ></fp-entity-picker>
              ${i ? u`<span class="warn">Ohne Sensor kann der Öffnungszustand nicht angezeigt werden.</span>` : m}
            </div>
            <h4>Flügel (${s.length} von ${Rt})</h4>
            ${s.map(
      (r, a) => u`<div class="leaf-row ${this._leafSel === a ? "active" : ""}" @click=${() => this._leafSel = a}>
                <div class="leaf-head">
                  <b>${a + 1}</b>
                  <label>
                    Breite
                    <input
                      type="number"
                      min="10"
                      step="1"
                      .value=${String(Math.round(n[a].x1 - n[a].x0))}
                      ?disabled=${s.length === 1}
                      @change=${(l) => this._setLeafWidth(a, Number(l.target.value))}
                    />
                  </label>
                  <button
                    title="Anschlag wechseln"
                    @click=${() => this._setLeaf(a, { hinge: n[a].hinge === "right" ? "left" : "right" })}
                  >
                    <ha-icon icon="mdi:swap-horizontal"></ha-icon> ${n[a].hinge === "right" ? "rechts" : "links"}
                  </button>
                </div>
                <fp-entity-picker
                  .hass=${this.hass}
                  .value=${r.entity ?? ""}
                  .domains=${["binary_sensor"]}
                  placeholder="Eigener Sensor (optional)"
                  @value-changed=${(l) => this._setLeaf(a, { entity: l.detail.value || void 0 })}
                ></fp-entity-picker>
              </div>`
    )}
            <div class="btn-row">
              <button ?disabled=${s.length >= Rt} @click=${() => this._setLeafCount(s.length + 1)}>
                <ha-icon icon="mdi:plus"></ha-icon> Flügel
              </button>
              <button ?disabled=${s.length <= 1} @click=${() => this._setLeafCount(s.length - 1)}>
                <ha-icon icon="mdi:minus"></ha-icon> Flügel
              </button>
              <button @click=${() => this._setProp("swing", t.swing === "out" ? "in" : "out")}>
                <ha-icon icon="mdi:swap-vertical"></ha-icon> Richtung
              </button>
            </div>` : u`
            <div class="btn-row">
              <button @click=${() => this._setProp("hinge", t.hinge === "right" ? "left" : "right")}>
                <ha-icon icon="mdi:swap-horizontal"></ha-icon> Anschlag
              </button>
              <button @click=${() => this._setProp("swing", t.swing === "out" ? "in" : "out")}>
                <ha-icon icon="mdi:swap-vertical"></ha-icon> Richtung
              </button>
            </div>
            ${this._entity("Kontakt (optional)", "entity", t.entity, ["binary_sensor"])}
            ${this._entity("Schloss (optional)", "lockEntity", t.lockEntity, ["lock"])}
            <p class="muted">Ohne Kontakt gilt die Tür beim Lichtschein als offen.</p>`}
      ${this._color("Farbe wenn offen", "openColor", t.openColor, Se)}
      <p class="muted">Im Editor wird die ausgewählte Öffnung geöffnet gezeigt. Ziehen schiebt sie entlang der Wände.</p>
      ${e ? u`<h4>Rollo</h4>
            ${["out", "in"].map((r) => {
      const a = o(r);
      return u`<div class="shutter-row">
                <div class="field">
                  <span>${r === "out" ? "Außen" : "Innen"} (optional)</span>
                  <fp-entity-picker
                    .hass=${this.hass}
                    .value=${a?.entity ?? ""}
                    .domains=${["cover"]}
                    @value-changed=${(l) => this._setShutter(r, { entity: l.detail.value })}
                  ></fp-entity-picker>
                </div>
                ${a ? u`<label class="field color">
                      <span>Farbe</span>
                      <input
                        type="color"
                        .value=${a.color && a.color.startsWith("#") ? a.color : Ae}
                        @change=${(l) => this._setShutter(r, { color: l.target.value })}
                      />
                    </label>` : m}
              </div>`;
    })}
            <p class="muted">Außen liegt auf der Seite gegen den Aufschlag „innen“; die Tiefe des Bands zeigt, wie weit das Rollo zu ist.</p>` : m}
    `;
  }
  /** Ändert die Flügelliste des ausgewählten Fensters. */
  _editLeaves(t) {
    this._mutate(() => {
      const e = this._findSelected();
      e && (e.leaves = t(Dt(e).map((i) => ({ ...i })), e));
    });
  }
  _setLeaf(t, e) {
    this._leafSel = t, this._editLeaves((i, s) => {
      if (e.hinge === void 0) return i.map((o, r) => r === t ? pe({ ...o, ...e }) : o);
      const n = Nt(s);
      return i.map((o, r) => r === t ? pe({ ...o, ...e }) : { ...o, hinge: o.hinge ?? n[r].hinge });
    });
  }
  _setLeafCount(t) {
    this._editLeaves((e) => Li(e, t)), this._leafSel = Math.min(this._leafSel ?? 0, t - 1);
  }
  _setLeafWidth(t, e) {
    Number.isFinite(e) && this._editLeaves((i, s) => Ti(i, t, e, s.length));
  }
  _setShutter(t, e) {
    this._mutate(() => {
      const i = this._findSelected();
      if (!i) return;
      const s = (i.shutters ?? []).filter((r) => r.side !== t), o = { ...i.shutters?.find((r) => r.side === t) ?? { entity: "", side: t }, ...e };
      o.entity && s.push(o), s.length ? i.shutters = s : delete i.shutters;
    });
  }
  _renderAreaProps(t) {
    const e = Object.values(this.hass.areas ?? {}).sort((s, n) => s.name.localeCompare(n.name)), i = this._areaSuggestions(t);
    return u`
      ${this._text("Name", "name", t.name)}
      <label class="field">
        <span>Art</span>
        <select @change=${(s) => this._setProp("type", s.target.value)}>
          ${ki.map(([s, n]) => u`<option value=${s} ?selected=${(t.type ?? "room") === s}>${n}</option>`)}
        </select>
      </label>
      ${t.type === "custom" ? this._text("Bezeichnung", "typeLabel", t.typeLabel) : m}
      <div class="grid2">
        ${this._color("Farbe", "color", t.color, "#4f8bd6")}
        <label class="field">
          <span>Deckkraft</span>
          <input type="range" min="0" max="0.6" step="0.02" .value=${String(t.opacity ?? 0.12)}
                 @change=${(s) => this._setProp("opacity", Number(s.target.value))} />
        </label>
      </div>
      ${this._check("Name im Plan anzeigen", "showName", t.showName !== !1)}
      ${this._num("Zoom beim Antippen", "zoom", t.zoom ?? void 0, { min: 1, max: 10, step: 0.25, placeholder: "automatisch einpassen" })}
      <details>
        <summary>Mehr</summary>
        ${e.length ? u`<label class="field">
              <span>HA-Bereich (nur Bezug, keine Automatik)</span>
              <select
                @change=${(s) => {
      const n = s.target.value;
      this._mutate(() => {
        const o = this._findSelected();
        n ? o.haArea = n : delete o.haArea, n && (!o.name || /^Raum \d+$/.test(o.name)) && (o.name = this.hass.areas[n].name);
      });
    }}
              >
                <option value="">– keiner –</option>
                ${e.map((s) => u`<option value=${s.area_id} ?selected=${t.haArea === s.area_id}>${s.name}</option>`)}
              </select>
            </label>` : m}
        ${this._entity("Raum einfärben, wenn aktiv", "entity", t.entity, ["binary_sensor", "input_boolean", "light", "switch", "person"])}
        ${t.entity ? this._color("Farbe wenn aktiv", "activeColor", t.activeColor, "#ffc107") : m}
      </details>

      <h4>Seitenleiste</h4>
      <p class="muted">Nur was hier steht, erscheint beim Antippen des Raums – Geräte, Szenen und Skripte.</p>
      <div class="sidebar-list">
        ${t.sidebar.map(
      (s, n) => u`<div class="sb-row">
            <ha-icon .icon=${L(this.hass, s.entity, s.icon)}></ha-icon>
            <div class="sb-main">
              <input
                type="text"
                .value=${s.name ?? ""}
                placeholder=${gt(this.hass, s.entity)}
                @change=${(o) => this._editSidebar(n, "name", o.target.value.trim())}
              />
              <small>${s.entity} · ${{ device: "Gerät", scene: "Szene", script: "Skript" }[Pt(s.entity)]}${this.hass.states[s.entity] ? "" : " · nicht gefunden"}</small>
            </div>
            <button class="icon-btn" title="Nach oben" ?disabled=${n === 0} @click=${() => this._moveSidebar(n, -1)}><ha-icon icon="mdi:chevron-up"></ha-icon></button>
            <button class="icon-btn" title="Nach unten" ?disabled=${n === t.sidebar.length - 1} @click=${() => this._moveSidebar(n, 1)}><ha-icon icon="mdi:chevron-down"></ha-icon></button>
            <button class="icon-btn" title="Entfernen" @click=${() => this._removeSidebar(n)}><ha-icon icon="mdi:close"></ha-icon></button>
          </div>`
    )}
      </div>
      <fp-entity-picker
        .hass=${this.hass}
        .exclude=${t.sidebar.map((s) => s.entity)}
        clearOnSelect
        placeholder="Gerät, Szene oder Skript hinzufügen …"
        @value-changed=${(s) => s.detail.value && this._addSidebar(s.detail.value)}
      ></fp-entity-picker>
      ${i.length ? u`<div class="suggest">
            <span class="muted">Vorschläge aus dem HA-Bereich – zum Übernehmen antippen:</span>
            <div class="chips">
              ${i.map(
      (s) => u`<button class="chip" title=${s} @click=${() => this._addSidebar(s)}>
                  <ha-icon .icon=${L(this.hass, s)}></ha-icon>${gt(this.hass, s)}
                </button>`
    )}
            </div>
          </div>` : m}
    `;
  }
  /** Entitäten des verknüpften HA-Bereichs, die noch nicht in der Seitenleiste sind (nur Vorschlag). */
  _areaSuggestions(t) {
    if (!t.haArea || !this.hass.entities) return [];
    const e = new Set(t.sidebar.map((n) => n.entity)), i = this.hass.devices, s = /* @__PURE__ */ new Set(["light", "switch", "fan", "cover", "climate", "media_player", "lock", "scene", "script", "vacuum", "input_boolean", "sensor", "binary_sensor", "humidifier", "valve", "button"]);
    return Object.values(this.hass.entities).filter((n) => !n.hidden && !e.has(n.entity_id) && s.has(A(n.entity_id))).filter((n) => (n.area_id ?? (n.device_id ? i?.[n.device_id]?.area_id : void 0)) === t.haArea).map((n) => n.entity_id).slice(0, 30);
  }
  _addSidebar(t) {
    this._mutate(() => this._findSelected().sidebar.push({ entity: t }));
  }
  _removeSidebar(t) {
    this._mutate(() => this._findSelected().sidebar.splice(t, 1));
  }
  _moveSidebar(t, e) {
    this._mutate(() => {
      const i = this._findSelected().sidebar, [s] = i.splice(t, 1);
      i.splice(t + e, 0, s);
    });
  }
  _editSidebar(t, e, i) {
    this._mutate(() => {
      const s = this._findSelected().sidebar[t];
      i ? s[e] = i : delete s[e];
    });
  }
  _renderItemProps(t) {
    return u`
      <div class="field">
        <span>Icon</span>
        <div class="icon-input">
          <ha-icon .icon=${t.icon ?? (t.entity ? L(this.hass, t.entity) : "mdi:map-marker")}></ha-icon>
          <input type="text" .value=${t.icon ?? ""} placeholder=${t.entity ? "vom Gerät" : "mdi:…"}
                 @change=${(e) => this._setProp("icon", e.target.value.trim())} />
        </div>
        <div class="icon-grid">
          ${Ki.map(
      (e) => u`<button class="icon-pick ${t.icon === e ? "active" : ""}" title=${e} @click=${() => this._setProp("icon", e)}>
              <ha-icon .icon=${e}></ha-icon>
            </button>`
    )}
        </div>
      </div>
      ${this._entity("Entität (optional)", "entity", t.entity)}
      ${this._text("Beschriftung", "label", t.label)}
      <label class="field">
        <span>Beim Antippen</span>
        <select @change=${(e) => this._setProp("tapAction", e.target.value)}>
          ${[
      ["auto", "Automatisch (Licht/Schalter schalten, sonst Details)"],
      ["toggle", "Schalten / Ausführen"],
      ["more-info", "Details öffnen"],
      ["none", "Nichts"]
    ].map(([e, i]) => u`<option value=${e} ?selected=${(t.tapAction ?? "auto") === e}>${i}</option>`)}
        </select>
      </label>
      <div class="grid2">
        ${this._num("Größe (px)", "size", t.size, { min: 8, max: 200, placeholder: "34" })}
        ${this._color("Farbe wenn an", "activeColor", t.activeColor, "#ffb300")}
      </div>
      ${this._check("Zustand anzeigen", "showState", t.showState)}
      <h4>Lichtschein</h4>
      <label class="check">
        <input type="checkbox" .checked=${ut(t)} @change=${(e) => this._setProp("glow", e.target.checked)} />
        <span>Lichtschein anzeigen${t.glow === void 0 || t.glow === null ? " (automatisch)" : ""}</span>
      </label>
      ${ut(t) ? u`<div class="grid2">
              ${this._num("Radius", "glowRadius", t.glowRadius, { min: 10, max: 5e3, step: 10, placeholder: String(Lt) })}
              ${this._color("Farbe ohne RGB", "glowColor", t.glowColor, Ee)}
            </div>
            <p class="muted">Bei voller Helligkeit; gedimmt schrumpft der Schein. RGB-Lampen leuchten in ihrer eigenen Farbe. Die gestrichelte Kontur zeigt, wo Wände das Licht begrenzen.</p>` : m}
      <h4>Sichtbarkeit</h4>
      ${this._check("Nur zeigen, wenn der Raum gezoomt ist", "showOnlyWhenZoomed", t.showOnlyWhenZoomed)}
      ${t.showOnlyWhenZoomed ? u`<label class="field">
            <span>Gehört zu Raum</span>
            <select @change=${(e) => this._setProp("area", e.target.value)}>
              <option value="">automatisch (Lage im Raum)</option>
              ${this._floor.areas.map((e) => u`<option value=${e.id} ?selected=${t.area === e.id}>${e.name || e.id}</option>`)}
            </select>
          </label>` : m}
      ${!t.area && !this._floor.areas.some((e) => yt(e.points, t.x, t.y)) && t.showOnlyWhenZoomed ? u`<p class="warn">Das Icon liegt in keinem Raum und wird deshalb nie angezeigt.</p>` : m}
    `;
  }
  _renderPlanProps() {
    const t = this._draft, e = this._floor;
    return u`
      <div class="props-head"><h3>Etage &amp; Plan</h3></div>
      <label class="field">
        <span>Etage</span>
        <div class="row">
          <select
            @change=${(i) => {
      this._floorId = i.target.value, this._sel = void 0;
    }}
          >
            ${t.floors.map((i) => u`<option value=${i.id} ?selected=${i.id === this._floorId}>${i.name || i.id}</option>`)}
          </select>
          <button class="icon-btn" title="Etage hinzufügen" @click=${this._addFloor}><ha-icon icon="mdi:plus"></ha-icon></button>
          <button class="icon-btn" title="Etage löschen" ?disabled=${t.floors.length < 2} @click=${this._deleteFloor}>
            <ha-icon icon="mdi:delete-outline"></ha-icon>
          </button>
        </div>
      </label>
      <label class="field">
        <span>Name der Etage</span>
        <input type="text" .value=${e.name} @change=${(i) => this._mutate((s) => s.name = i.target.value.trim())} />
      </label>
      <div class="grid2">
        ${this._planNum("Wandstärke", t.settings.wallThickness, (i) => t.settings.wallThickness = i, 1)}
        ${this._planNum("Raster", t.settings.grid, (i) => t.settings.grid = i, 1)}
      </div>
      <p class="muted">Die Zeichenfläche ist unbegrenzt. Einheiten frei wählbar – Zentimeter bieten sich an (1000 = 10 m).</p>
      <p class="muted">
        ${e.walls.length} Wände · ${e.openings.length} Türen/Fenster · ${e.areas.length} Räume · ${e.items.length} Icons
      </p>
      ${this._windowsWithoutContact.length ? u`<h4>Fenster ohne Kontakt</h4>
            <div class="room-list">
              ${this._windowsWithoutContact.map(
      ({ floorId: i, opening: s }) => u`<button class="room-btn warn-row" @click=${() => this._selectOpening(i, s.id)}>
                  <ha-icon icon="mdi:window-closed-variant"></ha-icon>${s.id}
                  <small>${this._draft.floors.find((n) => n.id === i)?.name || i}</small>
                </button>`
    )}
            </div>` : m}
      <h4>Räume</h4>
      <div class="room-list">
        ${e.areas.length ? e.areas.map(
      (i) => u`<button class="room-btn" @click=${() => this._sel = { kind: "area", id: i.id }}>
                <span class="swatch" style="background:${i.color ?? "var(--primary-color)"}"></span>
                ${i.name || i.id}<small>${i.sidebar.length} in Seitenleiste</small>
              </button>`
    ) : u`<p class="muted">Noch keine Räume – mit dem Werkzeug „Raum“ zeichnen.</p>`}
      </div>
      <h4>Verlauf</h4>
      ${this._history ? this._history.length ? u`<div class="history">
              ${this._history.map(
      (i) => u`<div class="hist-row">
                  <span>${new Date(i.created).toLocaleString()}<small> · Rev. ${i.revision} · ${i.reason}</small></span>
                  <button class="link" @click=${() => this._restoreHistory(i.id)}>Wiederherstellen</button>
                </div>`
    )}
            </div>` : u`<p class="muted">Noch keine früheren Stände.</p>` : u`<button class="link" @click=${this._loadHistory}>Frühere Stände anzeigen</button>`}
      <h4>Beispiel</h4>
      <button class="link" @click=${this._loadSample}>Beispiel-Grundriss laden</button>
    `;
  }
  _planNum(t, e, i, s) {
    return u`<label class="field">
      <span>${t}</span>
      <input
        type="number"
        min=${s}
        .value=${String(e)}
        @change=${(n) => {
      const o = Number(n.target.value);
      Number.isFinite(o) && o >= s && this._mutate(() => i(o));
    }}
      />
    </label>`;
  }
  _addFloor() {
    const t = prompt("Name der neuen Etage", "Etage " + (this._draft.floors.length + 1));
    if (!t) return;
    const e = U("etage");
    this._mutate((i, s) => s.floors.push({ id: e, name: t, walls: [], openings: [], areas: [], items: [] })), this._floorId = e, this._sel = void 0;
  }
  _deleteFloor() {
    if (this._draft.floors.length < 2 || !confirm(`Etage „${this._floor.name || this._floorId}“ mit allem Inhalt löschen?`)) return;
    const t = this._floorId;
    this._mutate((e, i) => i.floors = i.floors.filter((s) => s.id !== t)), this._floorId = this._draft.floors[0].id, this._sel = void 0;
  }
};
v.styles = [
  Ft(Te),
  tt`
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
    `
];
$([
  x({ attribute: !1 })
], v.prototype, "hass", 2);
$([
  x({ attribute: !1 })
], v.prototype, "plan", 2);
$([
  x({ attribute: !1 })
], v.prototype, "revision", 2);
$([
  x({ attribute: !1 })
], v.prototype, "floorId", 2);
$([
  x({ attribute: !1 })
], v.prototype, "initialAreaId", 2);
$([
  x({ type: Boolean, reflect: !0 })
], v.prototype, "narrow", 2);
$([
  b()
], v.prototype, "_draft", 2);
$([
  b()
], v.prototype, "_floorId", 2);
$([
  b()
], v.prototype, "_tool", 2);
$([
  b()
], v.prototype, "_sel", 2);
$([
  b()
], v.prototype, "_leafSel", 2);
$([
  b()
], v.prototype, "_view", 2);
$([
  b()
], v.prototype, "_cursor", 2);
$([
  b()
], v.prototype, "_chainStart", 2);
$([
  b()
], v.prototype, "_roomPoints", 2);
$([
  b()
], v.prototype, "_dirty", 2);
$([
  b()
], v.prototype, "_saving", 2);
$([
  b()
], v.prototype, "_error", 2);
$([
  b()
], v.prototype, "_conflict", 2);
$([
  b()
], v.prototype, "_history", 2);
$([
  b()
], v.prototype, "_svgSize", 2);
$([
  ve("svg.canvas")
], v.prototype, "_svg", 2);
v = $([
  Q("fp-editor")
], v);
function pe(t) {
  const e = { w: t.w };
  return t.entity && (e.entity = t.entity), t.hinge && (e.hinge = t.hinge), e;
}
function V(t) {
  return Math.round(t * 10) / 10;
}
function ue(t, e) {
  const i = (e % 360 + 360) % 360, s = (i + 180) % 360, n = (t % 360 + 360) % 360, o = (r) => Math.min(Math.abs(r - n), 360 - Math.abs(r - n));
  return V(o(i) <= o(s) ? i : s);
}
function fe(t) {
  return t >= 100 ? `${(t / 100).toFixed(2).replace(".", ",")} m` : `${Math.round(t)} cm`;
}
var Vi = Object.defineProperty, Zi = Object.getOwnPropertyDescriptor, B = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Zi(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (n = (s ? r(e, i, n) : r(n)) || n);
  return s && n && Vi(e, i, n), n;
};
const qi = /* @__PURE__ */ new Set(["light", "switch", "fan", "input_boolean", "siren"]), Xi = 1.35, Yi = 34, De = 380, Ne = 700, Ji = 0.55;
let Qi = 0, T = class extends I {
  constructor() {
    super(...arguments), this.popupOpen = !1, this._box = { w: 0, h: 0 }, this._maskId = `fp-wall-mask-${++Qi}`;
  }
  connectedCallback() {
    super.connectedCallback(), this._ro = new ResizeObserver(() => this._measure()), this._ro.observe(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._ro?.disconnect();
  }
  updated(t) {
    (t.has("plan") || t.has("floor")) && this._measure();
  }
  /** Größte Box mit dem Seitenverhältnis des Sichtbereichs, die in das Element passt. */
  _measure() {
    if (!this.plan || !this.floor) return;
    const { w: t, h: e } = It(this.floor, this.plan), i = getComputedStyle(this), s = this.clientWidth - parseFloat(i.paddingLeft) - parseFloat(i.paddingRight), n = this.clientHeight - parseFloat(i.paddingTop) - parseFloat(i.paddingBottom);
    if (!s || !n) return;
    const o = Math.min(s / t, n / e), r = Math.floor(t * o), a = Math.floor(e * o);
    (r !== this._box.w || a !== this._box.h) && (this._box = { w: r, h: a });
  }
  _emit(t, e) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  _onAreaClick(t, e) {
    t.stopPropagation(), this._emit("area-click", { id: e });
  }
  async _onItemClick(t, e) {
    t.stopPropagation();
    const i = e.entity;
    if (!i) return;
    let s = e.tapAction ?? "auto";
    s === "auto" && (Mt(i) ? s = "toggle" : s = qi.has(A(i)) ? "toggle" : "more-info"), s !== "none" && (s === "more-info" ? _t(this, i) : Mt(i) ? await Ct(this.hass, i) : await we(this.hass, i));
  }
  _onItemContext(t, e) {
    e.entity && (t.preventDefault(), _t(this, e.entity));
  }
  render() {
    if (!this.plan || !this.floor) return m;
    const t = this.floor, e = It(t, this.plan), { w: i, h: s } = e, n = t.areas.find((l) => l.id === this.zoomedAreaId);
    let o = n ? _i(
      n.points.map((l) => ({ x: l.x - e.x, y: l.y - e.y })),
      i,
      s,
      void 0,
      void 0,
      yi(n)
    ) : zt;
    n && this.popupOpen && o.scale > 1 && (o = this._shiftForPopup(o));
    const r = o.scale > 1 ? Xi / o.scale : 1, a = Math.max(this.plan.canvas.width, this.plan.canvas.height) / 45;
    return u`
      <div
        class="plan"
        style="width:${this._box.w}px;height:${this._box.h}px"
        @click=${() => this._emit("background-click")}
      >
        <div
          class="plan-zoom"
          style="transform:translate(${o.txPercent}%, ${o.tyPercent}%) scale(${o.scale});--fp-inv-zoom:${r}"
        >
          <svg viewBox="${e.x} ${e.y} ${i} ${s}" preserveAspectRatio="xMidYMid meet">
            <g class="areas">
              ${t.areas.map(
      (l) => _`<g @click=${(c) => this._onAreaClick(c, l.id)}>${Ie(l, {
        hass: this.hass,
        selected: l.id === this.zoomedAreaId,
        dimmed: !!n && l.id !== n.id,
        labelSize: a
      })}</g>`
    )}
            </g>
            ${Ci(t, this.plan, this.hass, `${this._maskId}-glow`)}
            ${Re(t, this.plan, this._maskId)} ${Fi(t, this.plan, { hass: this.hass })}
          </svg>
          <div class="items">
            ${t.items.filter((l) => !vi(l, n, t.areas)).map((l) => this._renderItem(l, e))}
          </div>
        </div>
      </div>
    `;
  }
  /** Verschiebt den gezoomten Raum in den Bereich, den das Popup frei lässt (links bzw. oben). */
  _shiftForPopup(t) {
    return !this._box.w || !this._box.h ? t : this.clientWidth < Ne ? { ...t, tyPercent: t.tyPercent - this.clientHeight * Ji / 2 / this._box.h * 100 } : { ...t, txPercent: t.txPercent - (De + 32) / 2 / this._box.w * 100 };
  }
  _renderItem(t, e) {
    const i = e.w, s = e.h, n = t.entity ? this.hass.states[t.entity] : void 0, o = Y(n), r = !!t.entity && Ot(n), a = t.icon ?? (t.entity ? L(this.hass, t.entity) : "mdi:map-marker"), l = t.size ?? Yi, c = o ? t.activeColor ?? "var(--fp-active-color, #ffb300)" : t.color ?? "", h = t.label ?? n?.attributes.friendly_name ?? t.entity ?? "";
    return u`
      <div
        class="item ${o ? "active" : ""} ${r ? "unavailable" : ""} ${t.entity ? "interactive" : ""}"
        style="left:${(t.x - e.x) / i * 100}%;top:${(t.y - e.y) / s * 100}%;--fp-item-size:${l}px;${c ? `--fp-item-color:${c}` : ""}"
        title=${h}
        @click=${(p) => this._onItemClick(p, t)}
        @contextmenu=${(p) => this._onItemContext(p, t)}
      >
        <div class="badge"><ha-icon .icon=${a}></ha-icon></div>
        ${t.label ? u`<div class="label">${t.label}</div>` : m}
        ${t.showState && n ? u`<div class="state">${$e(this.hass, n)}</div>` : m}
      </div>
    `;
  }
};
T.styles = [
  Ft(Te),
  tt`
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
    `
];
B([
  x({ attribute: !1 })
], T.prototype, "hass", 2);
B([
  x({ attribute: !1 })
], T.prototype, "plan", 2);
B([
  x({ attribute: !1 })
], T.prototype, "floor", 2);
B([
  x({ attribute: !1 })
], T.prototype, "zoomedAreaId", 2);
B([
  x({ type: Boolean })
], T.prototype, "popupOpen", 2);
B([
  b()
], T.prototype, "_box", 2);
T = B([
  Q("fp-plan-view")
], T);
var ts = Object.defineProperty, es = Object.getOwnPropertyDescriptor, $t = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? es(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (n = (s ? r(e, i, n) : r(n)) || n);
  return s && n && ts(e, i, n), n;
};
const is = [
  { kind: "device", title: "Geräte" },
  { kind: "scene", title: "Szenen" },
  { kind: "script", title: "Skripte" }
];
let J = class extends I {
  constructor() {
    super(...arguments), this.canEdit = !1;
  }
  _close() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  _edit() {
    this.dispatchEvent(new CustomEvent("edit-room", { detail: { id: this.area.id }, bubbles: !0, composed: !0 }));
  }
  render() {
    if (!this.area) return m;
    const t = this.area.sidebar ?? [], e = t.filter((i) => Pt(i.entity) === "device" && Y(this.hass.states[i.entity])).length;
    return u`
      <header>
        <div class="title">
          <h2>${this.area.name || "Raum"}</h2>
          <span class="sub">${t.length ? `${e} aktiv` : ""}</span>
        </div>
        ${this.canEdit ? u`<button class="icon-btn" title="Seitenleiste bearbeiten" @click=${this._edit}>
              <ha-icon icon="mdi:pencil"></ha-icon>
            </button>` : m}
        <button class="icon-btn" title="Schließen" @click=${this._close}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </header>
      <div class="content">
        ${t.length === 0 ? u`<p class="empty">
              Diesem Raum ist noch nichts zugeordnet.${this.canEdit ? u` Im Editor lassen sich Geräte, Szenen und Skripte für die Seitenleiste auswählen.` : m}
            </p>` : is.map(({ kind: i, title: s }) => {
      const n = t.filter((o) => Pt(o.entity) === i);
      return n.length ? u`<section>
                <h3>${s}</h3>
                ${i === "device" ? n.map((o) => this._renderRow(o)) : u`<div class="chips">${n.map((o) => this._renderChip(o))}</div>`}
              </section>` : m;
    })}
      </div>
    `;
  }
  _renderRow(t) {
    const e = this.hass.states[t.entity], i = Y(e), s = Ot(e), n = t.name || gt(this.hass, t.entity), o = A(t.entity);
    return u`
      <div class="row ${i ? "active" : ""} ${s ? "unavailable" : ""}">
        <button class="row-main" @click=${() => _t(this, t.entity)} title="Details">
          <span class="row-icon"><ha-icon .icon=${L(this.hass, t.entity, t.icon)}></ha-icon></span>
          <span class="row-text">
            <span class="name">${n}</span>
            <span class="state">${$e(this.hass, e)}</span>
          </span>
        </button>
        ${s ? m : o === "cover" ? u`<span class="cover-btns">
              <button class="icon-btn" title="Öffnen" @click=${() => this._call("cover", "open_cover", t.entity)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button class="icon-btn" title="Stopp" @click=${() => this._call("cover", "stop_cover", t.entity)}>
                <ha-icon icon="mdi:stop"></ha-icon>
              </button>
              <button class="icon-btn" title="Schließen" @click=${() => this._call("cover", "close_cover", t.entity)}>
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
            </span>` : Mt(t.entity) ? u`<button class="run" @click=${() => Ct(this.hass, t.entity)}>Ausführen</button>` : hi(t.entity) ? u`<button
              class="switch ${i ? "on" : ""}"
              role="switch"
              aria-checked=${i ? "true" : "false"}
              title=${i ? "Ausschalten" : "Einschalten"}
              @click=${() => we(this.hass, t.entity)}
            >
              <span class="knob"></span>
            </button>` : m}
      </div>
    `;
  }
  _renderChip(t) {
    const e = this.hass.states[t.entity], i = t.name || gt(this.hass, t.entity), s = A(t.entity) === "script" && e?.state === "on";
    return u`
      <button
        class="chip ${s ? "running" : ""}"
        ?disabled=${Ot(e)}
        title=${t.entity}
        @click=${() => Ct(this.hass, t.entity)}
        @contextmenu=${(n) => {
      n.preventDefault(), _t(this, t.entity);
    }}
      >
        <ha-icon .icon=${L(this.hass, t.entity, t.icon)}></ha-icon>
        <span>${i}</span>
      </button>
    `;
  }
  _call(t, e, i) {
    this.hass.callService(t, e, { entity_id: i });
  }
};
J.styles = tt`
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
    .sub {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .content {
      overflow-y: auto;
      padding: 8px 12px 16px;
    }
    h3 {
      margin: 12px 4px 6px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--secondary-text-color);
    }
    .empty {
      color: var(--secondary-text-color);
      padding: 8px 4px;
    }
    button {
      font: inherit;
      color: inherit;
    }
    .icon-btn {
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
    .row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 4px 4px 0;
      border-radius: 12px;
    }
    .row:hover {
      background: var(--secondary-background-color);
    }
    .row-main {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 8px;
      border: none;
      background: none;
      cursor: pointer;
      text-align: left;
    }
    .row-icon {
      width: 40px;
      height: 40px;
      flex: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
      transition: background 0.2s, color 0.2s;
    }
    .row.active .row-icon {
      background: rgba(255, 179, 0, 0.2);
      color: var(--fp-active-color, #ffb300);
    }
    .row.unavailable {
      opacity: 0.5;
    }
    .row-text {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .name,
    .state {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .state {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .switch {
      flex: none;
      width: 44px;
      height: 24px;
      border-radius: 12px;
      border: none;
      padding: 0;
      cursor: pointer;
      position: relative;
      background: var(--disabled-color, #bdbdbd);
      transition: background 0.2s;
      margin-right: 8px;
    }
    .switch.on {
      background: var(--primary-color);
    }
    .knob {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #fff;
      transition: transform 0.2s;
    }
    .switch.on .knob {
      transform: translateX(20px);
    }
    .run {
      flex: none;
      border: 1px solid var(--divider-color);
      background: none;
      border-radius: 16px;
      padding: 4px 12px;
      cursor: pointer;
      margin-right: 8px;
    }
    .cover-btns {
      display: flex;
      flex: none;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 0 4px;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border: 1px solid var(--divider-color);
      background: var(--secondary-background-color);
      border-radius: 18px;
      padding: 6px 14px 6px 10px;
      cursor: pointer;
      --mdc-icon-size: 18px;
    }
    .chip:hover {
      border-color: var(--primary-color);
    }
    .chip.running {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
    .chip:disabled {
      opacity: 0.5;
      cursor: default;
    }
  `;
$t([
  x({ attribute: !1 })
], J.prototype, "hass", 2);
$t([
  x({ attribute: !1 })
], J.prototype, "area", 2);
$t([
  x({ type: Boolean })
], J.prototype, "canEdit", 2);
J = $t([
  Q("fp-room-sidebar")
], J);
var ss = Object.defineProperty, ns = Object.getOwnPropertyDescriptor, at = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? ns(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (n = (s ? r(e, i, n) : r(n)) || n);
  return s && n && ss(e, i, n), n;
};
let H = class extends I {
  constructor() {
    super(...arguments), this.canEdit = !1, this.sheet = !1, this._onKey = (t) => {
      t.key === "Escape" && this._close();
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._onKey), this._ro = new ResizeObserver(() => this.sheet = this.clientWidth < Ne), this._ro.observe(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("keydown", this._onKey), this._ro?.disconnect();
  }
  updated(t) {
    t.has("area") && this.area && this.renderRoot.querySelector(".card")?.focus({ preventScroll: !0 });
  }
  _close() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  render() {
    return this.area ? u`
      <div class="scrim" @click=${this._close}></div>
      <div class="card" role="dialog" aria-label=${this.area.name || "Raum"} tabindex="-1">
        <fp-room-sidebar .hass=${this.hass} .area=${this.area} .canEdit=${this.canEdit}></fp-room-sidebar>
      </div>
    ` : m;
  }
};
H.styles = tt`
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
      width: ${De}px;
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
at([
  x({ attribute: !1 })
], H.prototype, "hass", 2);
at([
  x({ attribute: !1 })
], H.prototype, "area", 2);
at([
  x({ type: Boolean })
], H.prototype, "canEdit", 2);
at([
  x({ type: Boolean, reflect: !0 })
], H.prototype, "sheet", 2);
H = at([
  Q("fp-room-dialog")
], H);
var os = Object.defineProperty, rs = Object.getOwnPropertyDescriptor, z = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? rs(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (n = (s ? r(e, i, n) : r(n)) || n);
  return s && n && os(e, i, n), n;
};
const Et = "floorplan_panel";
let P = class extends I {
  constructor() {
    super(...arguments), this.narrow = !1, this._revision = 0, this._editing = !1, this._loading = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.hass && !this._plan && this._load();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.(), this._unsub = void 0;
  }
  willUpdate() {
    this.hass && !this._plan && !this._loading && !this._error && this._load();
  }
  async _load() {
    this._loading = !0;
    try {
      const t = await this.hass.callWS({ type: `${Et}/plan/get` });
      this._setPlan(t.plan, t.revision), this._unsub || (this._unsub = await this.hass.connection.subscribeMessage((e) => this._onEvent(e), {
        type: `${Et}/subscribe`
      }));
    } catch (t) {
      this._error = t?.message ?? String(t);
    } finally {
      this._loading = !1;
    }
  }
  _setPlan(t, e) {
    const i = Tt(t);
    this._plan = i, this._revision = e, i.floors.some((n) => n.id === this._floorId) || (this._floorId = i.floors[0]?.id), i.floors.find((n) => n.id === this._floorId)?.areas.some((n) => n.id === this._zoomedAreaId) || (this._zoomedAreaId = void 0);
  }
  async _onEvent(t) {
    t.type === "plan_updated" ? t.revision !== this._revision && !this._editing && await this._load() : t.type === "show_room" ? this._showRoom(t.room, t.floor ?? void 0) : t.type === "reset_view" && (this._zoomedAreaId = void 0);
  }
  _showRoom(t, e) {
    if (!this._plan || this._editing) return;
    const i = t.toLowerCase();
    for (const s of this._plan.floors) {
      if (e && s.id !== e) continue;
      const n = s.areas.find((o) => o.id === t || o.name.toLowerCase() === i);
      if (n) {
        this._floorId = s.id, this._zoomedAreaId = n.id;
        return;
      }
    }
  }
  get _isAdmin() {
    return !!this.hass?.user?.is_admin;
  }
  _onAreaClick(t) {
    this._zoomedAreaId = this._zoomedAreaId === t.detail.id ? void 0 : t.detail.id;
  }
  /** Öffnet/schließt die HA-Seitenleiste (auf schmalen Bildschirmen). */
  _toggleMenu() {
    this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: !0, composed: !0 }));
  }
  _openEditor(t) {
    this._editRoomId = t, this._editing = !0;
  }
  _onEditorDone(t) {
    t.detail?.plan && t.detail.revision !== void 0 && this._setPlan(t.detail.plan, t.detail.revision), this._editing = !1, this._editRoomId = void 0;
  }
  async _loadSample() {
    try {
      const t = await this.hass.callWS({ type: `${Et}/plan/load_sample` });
      this._setPlan(t.plan, t.revision);
    } catch (t) {
      this._error = t?.message ?? String(t);
    }
  }
  render() {
    if (this._editing && this._plan)
      return u`<fp-editor
        .hass=${this.hass}
        .plan=${this._plan}
        .revision=${this._revision}
        .floorId=${this._floorId}
        .initialAreaId=${this._editRoomId}
        .narrow=${this.narrow}
        @editor-done=${this._onEditorDone}
      ></fp-editor>`;
    const t = this._plan, e = t?.floors.find((n) => n.id === this._floorId), i = e?.areas.find((n) => n.id === this._zoomedAreaId), s = !!e && !e.walls.length && !e.areas.length && !e.items.length;
    return u`
      <div class="toolbar">
        ${this.narrow ? u`<button class="icon-btn" title="Menü" @click=${this._toggleMenu}><ha-icon icon="mdi:menu"></ha-icon></button>` : u`<span class="spacer"></span>`}
        <div class="main-title">Grundriss</div>
        ${t && t.floors.length > 1 ? u`<div class="floors">
              ${t.floors.map(
      (n) => u`<button
                  class="floor-btn ${n.id === this._floorId ? "active" : ""}"
                  @click=${() => {
        this._floorId = n.id, this._zoomedAreaId = void 0;
      }}
                >
                  ${n.name || n.id}
                </button>`
    )}
            </div>` : m}
        ${this._isAdmin && t ? u`<button class="icon-btn" title="Grundriss bearbeiten" @click=${() => this._openEditor()}>
              <ha-icon icon="mdi:pencil-ruler"></ha-icon>
            </button>` : m}
      </div>
      ${this._error ? u`<div class="message error">Grundriss konnte nicht geladen werden: ${this._error}</div>` : t ? !e || s ? u`<div class="message">
            <ha-icon icon="mdi:floor-plan" class="big"></ha-icon>
            <p>Noch kein Grundriss gezeichnet.</p>
            ${this._isAdmin ? u`<div class="actions">
                  <button class="primary" @click=${() => this._openEditor()}>Editor öffnen</button>
                  <button @click=${this._loadSample}>Beispiel-Grundriss laden</button>
                </div>` : u`<p>Ein Administrator kann ihn im Editor anlegen.</p>`}
          </div>` : u`<div class="body">
            <fp-plan-view
              .hass=${this.hass}
              .plan=${t}
              .floor=${e}
              .zoomedAreaId=${this._zoomedAreaId}
              .popupOpen=${!!i}
              @area-click=${this._onAreaClick}
              @background-click=${() => this._zoomedAreaId = void 0}
            ></fp-plan-view>
            ${i ? u`<fp-room-dialog
                  .hass=${this.hass}
                  .area=${i}
                  .canEdit=${this._isAdmin}
                  @close=${() => this._zoomedAreaId = void 0}
                  @edit-room=${(n) => this._openEditor(n.detail.id)}
                ></fp-room-dialog>` : m}
          </div>` : u`<div class="message">Lade …</div>`}
    `;
  }
};
P.styles = tt`
    :host {
      display: flex;
      flex-direction: column;
      /* HA gibt dem Panel-Container keine Höhe vor: volle Fensterhöhe (dvh: mobile Adressleiste) */
      height: 100vh;
      height: 100dvh;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
    }
    .toolbar {
      display: flex;
      align-items: center;
      gap: 8px;
      height: var(--header-height, 56px);
      padding: 0 12px 0 4px;
      box-sizing: border-box;
      background: var(--app-header-background-color, var(--primary-color));
      color: var(--app-header-text-color, #fff);
      border-bottom: var(--app-header-border-bottom, none);
      flex: none;
    }
    .spacer {
      width: 8px;
    }
    fp-editor {
      flex: 1;
      min-height: 0;
    }
    .main-title {
      flex: 1;
      font-size: 20px;
      margin-left: 8px;
    }
    .floors {
      display: flex;
      gap: 4px;
    }
    button {
      font: inherit;
    }
    .floor-btn {
      border: 1px solid rgba(255, 255, 255, 0.5);
      background: none;
      color: inherit;
      border-radius: 16px;
      padding: 4px 12px;
      cursor: pointer;
    }
    .floor-btn.active {
      background: rgba(255, 255, 255, 0.25);
    }
    .icon-btn {
      border: none;
      background: none;
      color: inherit;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      line-height: 0;
    }
    .icon-btn:hover {
      background: rgba(255, 255, 255, 0.15);
    }
    .body {
      flex: 1;
      min-height: 0;
      display: flex;
      position: relative;
    }
    fp-plan-view {
      flex: 1;
    }
    .message {
      margin: auto;
      text-align: center;
      color: var(--secondary-text-color);
      padding: 24px;
    }
    .message.error {
      color: var(--error-color, #db4437);
    }
    .big {
      --mdc-icon-size: 64px;
      opacity: 0.5;
    }
    .actions {
      display: flex;
      gap: 8px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .actions button {
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border-radius: 18px;
      padding: 8px 16px;
      cursor: pointer;
    }
    .actions button.primary {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
  `;
z([
  x({ attribute: !1 })
], P.prototype, "hass", 2);
z([
  x({ type: Boolean, reflect: !0 })
], P.prototype, "narrow", 2);
z([
  x({ attribute: !1 })
], P.prototype, "panel", 2);
z([
  b()
], P.prototype, "_plan", 2);
z([
  b()
], P.prototype, "_revision", 2);
z([
  b()
], P.prototype, "_floorId", 2);
z([
  b()
], P.prototype, "_zoomedAreaId", 2);
z([
  b()
], P.prototype, "_editing", 2);
z([
  b()
], P.prototype, "_editRoomId", 2);
z([
  b()
], P.prototype, "_error", 2);
P = z([
  Q("floorplan-panel")
], P);
