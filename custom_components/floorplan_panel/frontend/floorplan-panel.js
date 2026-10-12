function Te(e) {
  return (t) => {
    customElements.get(e) || customElements.define(e, t);
  };
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ii = globalThis, Un = ii.ShadowRoot && (ii.ShadyCSS === void 0 || ii.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Bn = Symbol(), Po = /* @__PURE__ */ new WeakMap();
let tr = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Bn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Un && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Po.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Po.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ae = (e) => new tr(typeof e == "string" ? e : e + "", void 0, Bn), oe = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, o, s) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new tr(i, e, Bn);
}, Qa = (e, t) => {
  if (Un) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), o = ii.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, e.appendChild(n);
  }
}, Oo = Un ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return Ae(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: el, defineProperty: tl, getOwnPropertyDescriptor: il, getOwnPropertyNames: nl, getOwnPropertySymbols: ol, getPrototypeOf: sl } = Object, Oi = globalThis, zo = Oi.trustedTypes, rl = zo ? zo.emptyScript : "", al = Oi.reactiveElementPolyfillSupport, Tt = (e, t) => e, hi = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? rl : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, Gn = (e, t) => !el(e, t), Lo = { attribute: !0, type: String, converter: hi, reflect: !1, useDefault: !1, hasChanged: Gn };
Symbol.metadata ??= Symbol("metadata"), Oi.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let rt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Lo) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(t, n, i);
      o !== void 0 && tl(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: o, set: s } = il(this.prototype, t) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: o, set(r) {
      const a = o?.call(this);
      s?.call(this, r), this.requestUpdate(t, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Lo;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Tt("elementProperties"))) return;
    const t = sl(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Tt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Tt("properties"))) {
      const i = this.properties, n = [...nl(i), ...ol(i)];
      for (const o of n) this.createProperty(o, i[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [n, o] of i) this.elementProperties.set(n, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const o = this._$Eu(i, n);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const o of n) i.unshift(Oo(o));
    } else t !== void 0 && i.push(Oo(t));
    return i;
  }
  static _$Eu(t, i) {
    const n = i.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const n of i.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Qa(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, i, n) {
    this._$AK(t, n);
  }
  _$ET(t, i) {
    const n = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, n);
    if (o !== void 0 && n.reflect === !0) {
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : hi).toAttribute(i, n.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = n.getPropertyOptions(o), r = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : hi;
      this._$Em = o;
      const a = r.fromAttribute(i, s.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, o = !1, s) {
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (s = this[t]), n ??= r.getPropertyOptions(t), !((n.hasChanged ?? Gn)(s, i) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: o, wrapped: s }, r) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? i ?? this[t]), s !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, s] of n) {
        const { wrapped: r } = s, a = this[o];
        r !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, s, a);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
rt.elementStyles = [], rt.shadowRootOptions = { mode: "open" }, rt[Tt("elementProperties")] = /* @__PURE__ */ new Map(), rt[Tt("finalized")] = /* @__PURE__ */ new Map(), al?.({ ReactiveElement: rt }), (Oi.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qn = globalThis, Ro = (e) => e, pi = qn.trustedTypes, Fo = pi ? pi.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ir = "$lit$", Le = `lit$${Math.random().toFixed(9).slice(2)}$`, nr = "?" + Le, ll = `<${nr}>`, Ze = document, Dt = () => Ze.createComment(""), Nt = (e) => e === null || typeof e != "object" && typeof e != "function", Kn = Array.isArray, cl = (e) => Kn(e) || typeof e?.[Symbol.iterator] == "function", Qi = `[ 	
\f\r]`, xt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Do = /-->/g, No = />/g, We = RegExp(`>|${Qi}(?:([^\\s"'>=/]+)(${Qi}*=${Qi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ho = /'/g, jo = /"/g, or = /^(?:script|style|textarea|title)$/i, sr = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), u = sr(1), _ = sr(2), ve = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), Wo = /* @__PURE__ */ new WeakMap(), qe = Ze.createTreeWalker(Ze, 129);
function rr(e, t) {
  if (!Kn(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Fo !== void 0 ? Fo.createHTML(t) : t;
}
const dl = (e, t) => {
  const i = e.length - 1, n = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = xt;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let c, h, d = -1, p = 0;
    for (; p < l.length && (r.lastIndex = p, h = r.exec(l), h !== null); ) p = r.lastIndex, r === xt ? h[1] === "!--" ? r = Do : h[1] !== void 0 ? r = No : h[2] !== void 0 ? (or.test(h[2]) && (o = RegExp("</" + h[2], "g")), r = We) : h[3] !== void 0 && (r = We) : r === We ? h[0] === ">" ? (r = o ?? xt, d = -1) : h[1] === void 0 ? d = -2 : (d = r.lastIndex - h[2].length, c = h[1], r = h[3] === void 0 ? We : h[3] === '"' ? jo : Ho) : r === jo || r === Ho ? r = We : r === Do || r === No ? r = xt : (r = We, o = void 0);
    const m = r === We && e[a + 1].startsWith("/>") ? " " : "";
    s += r === xt ? l + ll : d >= 0 ? (n.push(c), l.slice(0, d) + ir + l.slice(d) + Le + m) : l + Le + (d === -2 ? a : m);
  }
  return [rr(e, s + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Ht {
  constructor({ strings: t, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let s = 0, r = 0;
    const a = t.length - 1, l = this.parts, [c, h] = dl(t, i);
    if (this.el = Ht.createElement(c, n), qe.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = qe.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(ir)) {
          const p = h[r++], m = o.getAttribute(d).split(Le), g = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: s, name: g[2], strings: m, ctor: g[1] === "." ? pl : g[1] === "?" ? ul : g[1] === "@" ? fl : zi }), o.removeAttribute(d);
        } else d.startsWith(Le) && (l.push({ type: 6, index: s }), o.removeAttribute(d));
        if (or.test(o.tagName)) {
          const d = o.textContent.split(Le), p = d.length - 1;
          if (p > 0) {
            o.textContent = pi ? pi.emptyScript : "";
            for (let m = 0; m < p; m++) o.append(d[m], Dt()), qe.nextNode(), l.push({ type: 2, index: ++s });
            o.append(d[p], Dt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === nr) l.push({ type: 2, index: s });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(Le, d + 1)) !== -1; ) l.push({ type: 7, index: s }), d += Le.length - 1;
      }
      s++;
    }
  }
  static createElement(t, i) {
    const n = Ze.createElement("template");
    return n.innerHTML = t, n;
  }
}
function ft(e, t, i = e, n) {
  if (t === ve) return t;
  let o = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = Nt(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = o : i._$Cl = o), o !== void 0 && (t = ft(e, o._$AS(e, t.values), o, n)), t;
}
class hl {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: n } = this._$AD, o = (t?.creationScope ?? Ze).importNode(i, !0);
    qe.currentNode = o;
    let s = qe.nextNode(), r = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new yt(s, s.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (c = new ml(s, this, t)), this._$AV.push(c), l = n[++a];
      }
      r !== l?.index && (s = qe.nextNode(), r++);
    }
    return qe.currentNode = Ze, o;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class yt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, n, o) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = ft(this, t, i), Nt(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== ve && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : cl(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && Nt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Ze.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Ht.createElement(rr(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const s = new hl(o, this), r = s.u(this.options);
      s.p(i), this.T(r), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = Wo.get(t.strings);
    return i === void 0 && Wo.set(t.strings, i = new Ht(t)), i;
  }
  k(t) {
    Kn(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const s of t) o === i.length ? i.push(n = new yt(this.O(Dt()), this.O(Dt()), this, this.options)) : n = i[o], n._$AI(s), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Ro(t).nextSibling;
      Ro(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class zi {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, o, s) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = f;
  }
  _$AI(t, i = this, n, o) {
    const s = this.strings;
    let r = !1;
    if (s === void 0) t = ft(this, t, i, 0), r = !Nt(t) || t !== this._$AH && t !== ve, r && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = s[0], l = 0; l < s.length - 1; l++) c = ft(this, a[n + l], i, l), c === ve && (c = this._$AH[l]), r ||= !Nt(c) || c !== this._$AH[l], c === f ? t = f : t !== f && (t += (c ?? "") + s[l + 1]), this._$AH[l] = c;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class pl extends zi {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class ul extends zi {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class fl extends zi {
  constructor(t, i, n, o, s) {
    super(t, i, n, o, s), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = ft(this, t, i, 0) ?? f) === ve) return;
    const n = this._$AH, o = t === f && n !== f || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== f && (n === f || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ml {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ft(this, t);
  }
}
const gl = { I: yt }, yl = qn.litHtmlPolyfillSupport;
yl?.(Ht, yt), (qn.litHtmlVersions ??= []).push("3.3.3");
const bl = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = o = new yt(t.insertBefore(Dt(), s), s, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Vn = globalThis;
let te = class extends rt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = bl(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ve;
  }
};
te._$litElement$ = !0, te.finalized = !0, Vn.litElementHydrateSupport?.({ LitElement: te });
const _l = Vn.litElementPolyfillSupport;
_l?.({ LitElement: te });
(Vn.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Li = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vl = { attribute: !0, type: String, converter: hi, reflect: !1, hasChanged: Gn }, xl = (e = vl, t, i) => {
  const { kind: n, metadata: o } = i;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(i.name, e), n === "accessor") {
    const { name: r } = i;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, e, a), a;
    } };
  }
  if (n === "setter") {
    const { name: r } = i;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function A(e) {
  return (t, i) => typeof i == "object" ? xl(e, t, i) : ((n, o, s) => {
    const r = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, n), r ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function k(e) {
  return A({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wl = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function bt(e, t) {
  return (i, n, o) => {
    const s = (r) => r.renderRoot?.querySelector(e) ?? null;
    return wl(i, n, { get() {
      return s(this);
    } });
  };
}
const ae = (e) => e.split(".")[0], $l = /* @__PURE__ */ new Set([
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
]), kl = /* @__PURE__ */ new Set(["scene", "script", "button", "input_button"]);
function ui(e) {
  const t = ae(e);
  return t === "scene" ? "scene" : t === "script" ? "script" : "device";
}
function Sl(e) {
  return $l.has(ae(e));
}
function mn(e) {
  return kl.has(ae(e));
}
function Xe(e) {
  if (!e) return !1;
  const t = e.state;
  if (t === "unavailable" || t === "unknown") return !1;
  switch (ae(e.entity_id)) {
    case "cover":
    case "valve":
      return t === "open" || t === "opening";
    case "lock":
      return t === "unlocked" || t === "open" || t === "opening";
    case "climate":
      return t !== "off";
    case "media_player":
      return t !== "off" && t !== "standby" && t !== "idle";
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
      return t === "on" || t === "home";
    default:
      return t === "on";
  }
}
function gn(e) {
  return !e || e.state === "unavailable";
}
function jt(e, t) {
  return e.states[t]?.attributes.friendly_name ?? t;
}
function ar(e, t) {
  if (!t) return "nicht gefunden";
  if (e.formatEntityState)
    try {
      return e.formatEntityState(t);
    } catch {
    }
  const i = t.attributes.unit_of_measurement;
  return i ? `${t.state} ${i}` : t.state;
}
const El = {
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
function me(e, t, i) {
  if (i) return i;
  const n = e.states[t]?.attributes.icon;
  return n || (El[ae(t)] ?? "mdi:help-circle-outline");
}
async function lr(e, t) {
  const i = ae(t), n = e.states[t];
  i === "lock" ? await e.callService("lock", n?.state === "locked" ? "unlock" : "lock", { entity_id: t }) : i === "cover" ? await e.callService("cover", "toggle", { entity_id: t }) : await e.callService("homeassistant", "toggle", { entity_id: t });
}
async function yn(e, t) {
  const i = ae(t);
  i === "scene" ? await e.callService("scene", "turn_on", { entity_id: t }) : i === "script" ? await e.callService("script", "turn_on", { entity_id: t }) : (i === "button" || i === "input_button") && await e.callService(i, "press", { entity_id: t });
}
function fi(e, t) {
  e.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: t }, bubbles: !0, composed: !0 }));
}
var Al = Object.defineProperty, Ml = Object.getOwnPropertyDescriptor, be = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ml(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Al(t, i, o), o;
};
const Cl = 60;
let ce = class extends te {
  constructor() {
    super(...arguments), this.value = "", this.domains = [], this.exclude = [], this.placeholder = "Entität suchen …", this.clearOnSelect = !1, this._open = !1, this._filter = "", this._highlight = 0;
  }
  _results() {
    const e = this._filter.trim().toLowerCase(), t = new Set(this.exclude), i = [];
    for (const n of Object.keys(this.hass.states).sort()) {
      if (t.has(n) || this.domains.length && !this.domains.includes(ae(n))) continue;
      const o = this.hass.states[n].attributes.friendly_name ?? n;
      if (!(e && !n.toLowerCase().includes(e) && !o.toLowerCase().includes(e)) && (i.push({ id: n, name: o }), i.length >= Cl))
        break;
    }
    return i;
  }
  _select(e) {
    this._open = !1, this._filter = "", this.clearOnSelect && this._input && (this._input.value = ""), this.dispatchEvent(new CustomEvent("value-changed", { detail: { value: e }, bubbles: !0, composed: !0 }));
  }
  _onKey(e) {
    const t = this._results();
    if (e.key === "ArrowDown")
      this._open = !0, this._highlight = Math.min(t.length - 1, this._highlight + 1), e.preventDefault();
    else if (e.key === "ArrowUp")
      this._highlight = Math.max(0, this._highlight - 1), e.preventDefault();
    else if (e.key === "Enter") {
      const i = t[this._highlight];
      i && this._select(i.id), e.preventDefault();
    } else e.key === "Escape" && (this._open = !1);
    e.stopPropagation();
  }
  render() {
    const e = this._open ? this._results() : [], t = this.value ? this.hass.states[this.value] : void 0, i = this.clearOnSelect ? this._filter : this._open ? this._filter : this.value ? `${t?.attributes.friendly_name ?? this.value}` : "";
    return u`
      <div class="field">
        ${this.value && !this.clearOnSelect ? u`<ha-icon class="lead" .icon=${me(this.hass, this.value)}></ha-icon>` : u`<ha-icon class="lead" icon="mdi:magnify"></ha-icon>`}
        <input
          .value=${i}
          placeholder=${this.placeholder}
          @focus=${() => {
      this._open = !0, this._filter = "", this._highlight = 0;
    }}
          @blur=${() => setTimeout(() => this._open = !1, 150)}
          @input=${(n) => {
      this._filter = n.target.value, this._highlight = 0, this._open = !0;
    }}
          @keydown=${this._onKey}
        />
        ${this.value && !this.clearOnSelect ? u`<button class="clear" title="Entfernen" @mousedown=${(n) => n.preventDefault()} @click=${() => this._select("")}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>` : f}
      </div>
      ${this.value && !this.clearOnSelect ? u`<div class="id">${this.value}</div>` : f}
      ${this._open ? u`<div class="list">
            ${e.length === 0 ? u`<div class="none">Keine Treffer</div>` : e.map(
      (n, o) => u`<div
                    class="opt ${o === this._highlight ? "hl" : ""}"
                    @mousedown=${(s) => {
        s.preventDefault(), this._select(n.id);
      }}
                  >
                    <ha-icon .icon=${me(this.hass, n.id)}></ha-icon>
                    <span class="txt"><span>${n.name}</span><small>${n.id}</small></span>
                  </div>`
    )}
          </div>` : f}
    `;
  }
};
ce.styles = oe`
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
be([
  A({ attribute: !1 })
], ce.prototype, "hass", 2);
be([
  A()
], ce.prototype, "value", 2);
be([
  A({ attribute: !1 })
], ce.prototype, "domains", 2);
be([
  A({ attribute: !1 })
], ce.prototype, "exclude", 2);
be([
  A()
], ce.prototype, "placeholder", 2);
be([
  A({ type: Boolean })
], ce.prototype, "clearOnSelect", 2);
be([
  k()
], ce.prototype, "_open", 2);
be([
  k()
], ce.prototype, "_filter", 2);
be([
  k()
], ce.prototype, "_highlight", 2);
be([
  bt("input")
], ce.prototype, "_input", 2);
ce = be([
  Te("fp-entity-picker")
], ce);
const bn = 4, cr = "#ef6c00", dr = "#8d6e63", hr = [
  ["room", "Zimmer"],
  ["balcony", "Balkon"],
  ["hallway", "Flur"],
  ["staircase", "Treppenhaus"],
  ["bathroom", "Bad"],
  ["custom", "Eigene Bezeichnung"]
], it = 100, at = 60, _n = "#9e9e9e", vn = 150, pr = "#ffd9a0", Uo = 30, Tl = { wallThickness: 12, grid: 10 };
function Il(e) {
  const { sashes: t, shutterEntity: i, shutterColor: n, ...o } = e;
  return o.type === "window" && !o.leaves && (t === 1 || t === 2) && (o.leaves = t === 2 ? [{ w: 1, hinge: "left" }, { w: 1, hinge: "right" }] : [{ w: 1 }]), o.type === "window" && i && !o.shutters && (o.shutters = [{ entity: i, side: "out", ...n ? { color: n } : {} }]), o.type === "door" && o.entity?.startsWith("lock.") && (o.lockEntity ??= o.entity, delete o.entity), o;
}
function xn(e) {
  const t = e ?? {};
  return {
    version: t.version ?? 1,
    canvas: t.canvas ?? { width: 1e3, height: 700 },
    settings: { ...Tl, ...t.settings ?? {} },
    furniture: t.furniture ?? [],
    floors: (t.floors ?? []).map((i) => ({
      ...i,
      name: i.name ?? "",
      walls: i.walls ?? [],
      openings: (i.openings ?? []).map(Il),
      areas: (i.areas ?? []).map((n) => ({ ...n, name: n.name ?? "", sidebar: n.sidebar ?? [] })),
      items: i.items ?? []
    }))
  };
}
function U(e) {
  return `${e}-${Math.random().toString(36).slice(2, 8)}`;
}
const Pl = /^[MmLlHhVvCcSsQqTtAaZz0-9eE.,\s+-]+$/, Ol = /^(#[0-9a-fA-F]{3,8}|[a-zA-Z]{3,20}|rgba?\([0-9.,\s%]+\)|var\(--[a-zA-Z0-9-]+\))$/, zl = 2e4;
function ur(e) {
  return typeof e == "string" && e.length > 0 && e.length <= zl && Pl.test(e);
}
function Wt(e) {
  return typeof e == "string" && Ol.test(e.trim());
}
function ke(e, t) {
  return t ? e?.find((i) => i.id === t) : void 0;
}
function fr(e, t) {
  const i = (e.rotation ?? 0) * Math.PI / 180, n = e.scale ?? 1, o = Math.cos(i), s = Math.sin(i);
  return { x: e.x + n * (t.x * o - t.y * s), y: e.y + n * (t.x * s + t.y * o) };
}
function mi(e) {
  if (e.shape === "circle") {
    const n = e.r ?? 0;
    return { x0: e.x - n, y0: e.y - n, x1: e.x + n, y1: e.y + n };
  }
  if (e.shape === "polygon") {
    const n = e.points ?? [];
    return n.length ? {
      x0: e.x + Math.min(...n.map((o) => o.x)),
      y0: e.y + Math.min(...n.map((o) => o.y)),
      x1: e.x + Math.max(...n.map((o) => o.x)),
      y1: e.y + Math.max(...n.map((o) => o.y))
    } : { x0: e.x, y0: e.y, x1: e.x, y1: e.y };
  }
  const t = e.w ?? 0, i = e.h ?? 0;
  return { x0: e.x - t / 2, y0: e.y - i / 2, x1: e.x + t / 2, y1: e.y + i / 2 };
}
function gi(e) {
  const t = e.parts.map(mi);
  for (const i of e.lights ?? []) t.push({ x0: i.x, y0: i.y, x1: i.x, y1: i.y });
  return t.length ? {
    x0: Math.min(...t.map((i) => i.x0)),
    y0: Math.min(...t.map((i) => i.y0)),
    x1: Math.max(...t.map((i) => i.x1)),
    y1: Math.max(...t.map((i) => i.y1))
  } : { x0: -15, y0: -15, x1: 15, y1: 15 };
}
function mr(e, t) {
  const i = gi(t);
  return [
    { x: i.x0, y: i.y0 },
    { x: i.x1, y: i.y0 },
    { x: i.x1, y: i.y1 },
    { x: i.x0, y: i.y1 }
  ].map((n) => fr(e, n));
}
function gr(e, t) {
  const i = ke(t, e.furnitureType);
  return i?.lights?.length ? i.lights.map((n) => fr(e, n)) : [{ x: e.x, y: e.y }];
}
function ni(e, t) {
  if (typeof e.glow == "boolean") return e.glow;
  if (!e.entity || ae(e.entity) !== "light") return !1;
  const i = ke(t, e.furnitureType);
  return !e.furnitureType || !i || !!i.lights?.length;
}
function yr(e, t) {
  return !e.furnitureType || !ke(t, e.furnitureType) ? !0 : !!(e.entity || e.icon || e.label);
}
function Ll(e) {
  if (e.shape === "path" && e.d && e.vb) {
    const [t, i, n, o] = e.vb, s = e.w ?? n, r = e.h ?? o;
    return `translate(${e.x - s / 2} ${e.y - r / 2}) scale(${n ? s / n : 1} ${o ? r / o : 1}) translate(${-t} ${-i})`;
  }
}
function yi(e, t = {}) {
  const n = e.fill === "none" ? "none" : t.fill ?? (Wt(e.fill) ? e.fill : _n), o = Wt(e.stroke) && e.stroke !== "none", s = e.shape === "path" && e.vb && e.vb[2] ? (e.w ?? e.vb[2]) / e.vb[2] : 1, r = (e.strokeWidth ?? 1) / (s || 1), a = o ? `stroke:${e.stroke};stroke-width:${r};stroke-opacity:1;vector-effect:none` : f, l = e.opacity ?? 1, c = `fpart ${t.cls ?? ""}`;
  let h = f;
  if (e.shape === "rect") {
    const b = e.w ?? 0, v = e.h ?? 0;
    h = _`<rect class=${c} x=${e.x - b / 2} y=${e.y - v / 2} width=${b} height=${v} fill=${n} fill-opacity=${l} style=${a}></rect>`;
  } else if (e.shape === "circle")
    h = _`<circle class=${c} cx=${e.x} cy=${e.y} r=${e.r ?? 0} fill=${n} fill-opacity=${l} style=${a}></circle>`;
  else if (e.shape === "polygon") {
    const b = (e.points ?? []).map((v) => `${e.x + v.x},${e.y + v.y}`).join(" ");
    h = _`<polygon class=${c} points=${b} fill=${n} fill-opacity=${l} style=${a}></polygon>`;
  } else e.shape === "path" && ur(e.d) && (h = _`<path class=${c} d=${e.d} transform=${Ll(e) ?? f} fill=${n} fill-opacity=${l}
      style=${a}></path>`);
  const d = mi(e), p = t.iconSize ?? Math.max(8, Math.min(d.x1 - d.x0, d.y1 - d.y0) * 0.7), m = (d.x0 + d.x1) / 2, g = (d.y0 + d.y1) / 2;
  return _`${h}${e.icon ? _`<foreignObject class="fpart-icon" x=${m - p / 2} y=${g - p / 2} width=${p} height=${p} pointer-events="none">
          <div class="fo-icon" style="--mdc-icon-size:${p}px;width:${p}px;height:${p}px"><ha-icon .icon=${e.icon}></ha-icon></div>
        </foreignObject>` : f}`;
}
function wn(e, t, i = {}) {
  const n = e.rotation ?? 0, o = e.scale ?? 1;
  return _`<g class="furniture ${i.selected ? "selected" : ""}" data-furniture=${e.id}
      transform="translate(${e.x} ${e.y}) rotate(${n}) scale(${o})">
    ${t.parts.map((s) => yi(s, { fill: i.fill, cls: i.hit ? "hit" : "" }))}
  </g>`;
}
function br(e, t) {
  return t && Wt(e.activeColor) ? e.activeColor : Wt(e.fillColor) ? e.fillColor : void 0;
}
const Zn = `
  .furniture { pointer-events: none; }
  .furniture .fpart { stroke: var(--fp-wall-color, var(--primary-text-color)); stroke-width: 1; stroke-opacity: .55; vector-effect: non-scaling-stroke; }
  .furniture.selected .fpart { stroke: var(--primary-color) !important; stroke-width: 2 !important; stroke-opacity: 1 !important; vector-effect: non-scaling-stroke !important; }
  .furniture .fpart-icon { color: var(--primary-text-color); opacity: .75; }
  .furniture .fo-icon { display: flex; align-items: center; justify-content: center; }
`, ee = (e, t, i = 0) => {
  const n = parseFloat(e.getAttribute(t) ?? "");
  return Number.isFinite(n) ? n : i;
};
function $n(e, t) {
  for (let i = e; i; i = i.parentElement) {
    const n = i.getAttribute(t)?.trim() || new RegExp(`(?:^|;)\\s*${t}\\s*:\\s*([^;]+)`).exec(i.getAttribute("style") ?? "")?.[1]?.trim();
    if (n && n !== "inherit") return n;
  }
}
function Bo(e, t) {
  let i = $n(e, t);
  if (i?.toLowerCase() === "currentcolor" && (i = $n(e, "color")), !!i)
    return i === "none" ? "none" : Wt(i) && !i.toLowerCase().startsWith("url") ? i : void 0;
}
function Rl(e, t) {
  const i = {}, n = Bo(e, "fill"), o = Bo(e, "stroke");
  if (n && (i.fill = n), o && o !== "none") {
    i.stroke = o;
    const s = parseFloat($n(e, "stroke-width") ?? "");
    i.strokeWidth = Math.max(0.2, Math.round((Number.isFinite(s) && s > 0 ? s : 1) * t * 100) / 100), n || (i.fill = i.fill ?? "none");
  } else n === "none" && (i.stroke = "#444", i.strokeWidth = 1);
  return i;
}
function Fl(e, t = 100) {
  const i = new DOMParser().parseFromString(e, "image/svg+xml"), n = i.documentElement;
  if (!n || n.nodeName.toLowerCase() !== "svg" || i.querySelector("parsererror")) throw new Error("Keine gültige SVG-Datei");
  const o = (n.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), r = o.length === 4 && o.every(Number.isFinite) && o[2] > 0 && o[3] > 0 ? o : [0, 0, ee(n, "width", 100) || 100, ee(n, "height", 100) || 100], a = t / Math.max(r[2], r[3]), l = r[0] + r[2] / 2, c = r[1] + r[3] / 2, h = [];
  let d = 0;
  const p = (g) => {
    if (h.length >= at) {
      d++;
      return;
    }
    h.push({ id: U("p"), ...g });
  }, m = (g) => Math.round(g * 100) / 100;
  for (const g of Array.from(n.querySelectorAll("*"))) {
    const b = g.localName.toLowerCase(), v = Rl(g, a);
    if (b === "rect") {
      const x = ee(g, "width"), $ = ee(g, "height");
      x > 0 && $ > 0 && p({ shape: "rect", x: m((ee(g, "x") + x / 2 - l) * a), y: m((ee(g, "y") + $ / 2 - c) * a), w: m(x * a), h: m($ * a), ...v });
    } else if (b === "circle") {
      const x = ee(g, "r");
      x > 0 && p({ shape: "circle", x: m((ee(g, "cx") - l) * a), y: m((ee(g, "cy") - c) * a), r: m(x * a), ...v });
    } else if (b === "ellipse") {
      const x = ee(g, "rx"), $ = ee(g, "ry");
      if (x > 0 && $ > 0) {
        const y = ee(g, "cx"), w = ee(g, "cy");
        p({
          shape: "path",
          d: `M ${y - x} ${w} a ${x} ${$} 0 1 0 ${2 * x} 0 a ${x} ${$} 0 1 0 ${-2 * x} 0 Z`,
          vb: [y - x, w - $, 2 * x, 2 * $],
          x: m((y - l) * a),
          y: m((w - c) * a),
          w: m(2 * x * a),
          h: m(2 * $ * a),
          ...v
        });
      }
    } else if (b === "polygon") {
      const x = (g.getAttribute("points") ?? "").split(/[\s,]+/).map(Number).filter(Number.isFinite), $ = [];
      for (let y = 0; y + 1 < x.length; y += 2) $.push({ x: m((x[y] - l) * a), y: m((x[y + 1] - c) * a) });
      $.length >= 3 && p({ shape: "polygon", x: 0, y: 0, points: $, ...v });
    } else if (b === "path") {
      const x = (g.getAttribute("d") ?? "").trim();
      if (!ur(x)) {
        d++;
        continue;
      }
      p({ shape: "path", d: x, vb: r, x: 0, y: 0, w: m(r[2] * a), h: m(r[3] * a), ...v });
    } else if (b === "line" || b === "polyline") {
      const x = b === "line" ? [ee(g, "x1"), ee(g, "y1"), ee(g, "x2"), ee(g, "y2")] : (g.getAttribute("points") ?? "").split(/[\s,]+/).map(Number).filter(Number.isFinite);
      if (x.length >= 4) {
        let $ = `M ${x[0]} ${x[1]}`;
        for (let w = 2; w + 1 < x.length; w += 2) $ += ` L ${x[w]} ${x[w + 1]}`;
        const y = { ...v, fill: "none" };
        y.stroke || Object.assign(y, { stroke: "#444", strokeWidth: 1 }), p({ shape: "path", d: $, vb: r, x: 0, y: 0, w: m(r[2] * a), h: m(r[3] * a), ...y });
      } else d++;
    } else ["image", "use", "text"].includes(b) && d++;
  }
  if (!h.length) throw new Error("Die SVG enthält keine unterstützten Formen (path, rect, circle, ellipse, polygon)");
  return { parts: h, skipped: d };
}
const Dl = 4, Nl = 10, kn = { scale: 1, txPercent: 0, tyPercent: 0 };
function Hl(e, t, i, n = 0.15, o = Dl, s) {
  if (!e.length) return kn;
  const r = e.map((w) => w.x), a = e.map((w) => w.y), l = Math.min(...r), c = Math.max(...r), h = Math.min(...a), d = Math.max(...a), p = Math.max(c - l, d - h) * n, m = Math.max(c - l + p * 2, 1), g = Math.max(d - h + p * 2, 1), b = Math.max(1, Math.min(o, Math.min(t / m, i / g))), v = s ?? b;
  if (!Number.isFinite(v)) return kn;
  const x = (l + c) / 2 / t, $ = (h + d) / 2 / i, y = (w) => Math.min(0, Math.max(100 * (1 - v), w));
  return {
    scale: v,
    txPercent: y(50 - v * x * 100),
    tyPercent: y(50 - v * $ * 100)
  };
}
function jl(e) {
  const t = e.zoom;
  if (!(typeof t != "number" || !Number.isFinite(t)))
    return Math.max(1, Math.min(Nl, t));
}
function Xn(e) {
  if (!e.length) return { x: 0, y: 0 };
  const t = e.reduce((i, n) => ({ x: i.x + n.x, y: i.y + n.y }), { x: 0, y: 0 });
  return { x: t.x / e.length, y: t.y / e.length };
}
function Fe(e, t, i) {
  let n = !1;
  for (let o = 0, s = e.length - 1; o < e.length; s = o++) {
    const r = e[o], a = e[s];
    r.y > i != a.y > i && t < (a.x - r.x) * (i - r.y) / (a.y - r.y) + r.x && (n = !n);
  }
  return n;
}
function Go(e) {
  let t = 0;
  for (let i = 0, n = e.length - 1; i < e.length; n = i++)
    t += (e[n].x + e[i].x) * (e[n].y - e[i].y);
  return Math.abs(t / 2);
}
function Wl(e, t) {
  return e.area ? t.find((n) => n.id === e.area || n.name === e.area) : t.filter((n) => Fe(n.points, e.x, e.y)).sort((n, o) => Go(n.points) - Go(o.points))[0];
}
function Ul(e, t, i) {
  return e.showOnlyWhenZoomed ? t ? Wl(e, i)?.id !== t.id : !0 : !1;
}
function pe(e, t) {
  return t > 0 ? Math.round(e / t) * t : e;
}
function N(e, t) {
  return Math.hypot(e.x - t.x, e.y - t.y);
}
function He(e, t, i) {
  const n = i.x - t.x, o = i.y - t.y, s = n * n + o * o, r = s === 0 ? 0 : Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * o) / s));
  return { point: { x: t.x + r * n, y: t.y + r * o }, t: r };
}
function en(e, t, i) {
  let n;
  for (const o of t) {
    const { point: s, t: r } = He(e, { x: o.x1, y: o.y1 }, { x: o.x2, y: o.y2 }), a = N(e, s);
    a <= i && (!n || a < n.distance) && (n = {
      wall: o,
      point: s,
      t: r,
      distance: a,
      angle: Math.atan2(o.y2 - o.y1, o.x2 - o.x1) * 180 / Math.PI
    });
  }
  return n;
}
function Bl(e, t, i, n = []) {
  let o, s = i;
  for (const r of t)
    if (!n.includes(r))
      for (const a of [
        { x: r.x1, y: r.y1 },
        { x: r.x2, y: r.y2 }
      ]) {
        const l = N(e, a);
        l <= s && (o = a, s = l);
      }
  return o;
}
function Gl(e, t, i, n = []) {
  let o, s = i;
  for (const r of t)
    for (const a of r.points) {
      if (n.includes(a)) continue;
      const l = N(e, a);
      l <= s && (o = a, s = l);
    }
  return o && { x: o.x, y: o.y };
}
function tn(e, t, i = 8) {
  const n = Math.abs(Math.atan2(t.y - e.y, t.x - e.x) * 180 / Math.PI);
  return n < i || n > 180 - i ? { x: t.x, y: e.y } : Math.abs(n - 90) < i ? { x: e.x, y: t.y } : t;
}
function Sn(e, t) {
  const { width: i, height: n } = t.canvas;
  let o = 1 / 0, s = 1 / 0, r = -1 / 0, a = -1 / 0;
  const l = (m, g, b = 0) => {
    o = Math.min(o, m - b), s = Math.min(s, g - b), r = Math.max(r, m + b), a = Math.max(a, g + b);
  }, c = Math.max(i, n), h = t.settings?.wallThickness ?? 12;
  for (const m of e.walls) {
    const g = (m.thickness ?? h) / 2;
    l(m.x1, m.y1, g), l(m.x2, m.y2, g);
  }
  for (const m of e.areas) for (const g of m.points) l(g.x, g.y);
  for (const m of e.openings) {
    const g = m.angle * Math.PI / 180, b = Math.cos(g), v = Math.sin(g), x = m.swing === "out" ? -1 : 1, $ = 30, y = x > 0 ? -$ : -(m.length + $), w = x > 0 ? m.length + $ : $;
    for (const E of [-m.length / 2, m.length / 2])
      for (const T of [y, w]) l(m.x + E * b - T * v, m.y + E * v + T * b);
  }
  const d = c * 0.04;
  for (const m of e.items) {
    const g = m.furnitureType ? t.furniture?.find((b) => b.id === m.furnitureType) : void 0;
    if (g) for (const b of mr(m, g)) l(b.x, b.y);
    else l(m.x, m.y, d);
  }
  if (o === 1 / 0) {
    const m = c * 0.03;
    return { x: -m, y: -m, w: i + 2 * m, h: n + 2 * m };
  }
  const p = Math.max(r - o, a - s) * 0.03;
  return { x: o - p, y: s - p, w: r - o + 2 * p, h: a - s + 2 * p };
}
function _r(e, t, i) {
  let n, o, s = i, r = i;
  for (const l of t) {
    const c = Math.abs(l.x - e.x);
    c <= s && (s = c, n = l);
    const h = Math.abs(l.y - e.y);
    h <= r && (r = h, o = l);
  }
  const a = [];
  return n && a.push({ axis: "x", value: n.x, ref: n }), o && a.push({ axis: "y", value: o.y, ref: o }), { x: n?.x, y: o?.y, guides: a };
}
function It(e) {
  if (e.length !== 4) return;
  const t = [...new Set(e.map((n) => n.x))], i = [...new Set(e.map((n) => n.y))];
  if (!(t.length !== 2 || i.length !== 2))
    return { x: Math.min(...t), y: Math.min(...i), w: Math.abs(t[0] - t[1]), h: Math.abs(i[0] - i[1]) };
}
function ql(e, t) {
  let i = 1 / 0;
  for (let n = 0; n < e.length; n++) {
    const o = e[n], s = e[(n + 1) % e.length];
    i = Math.min(i, N(t, He(t, o, s).point));
  }
  return i;
}
function Kl(e, t, i = [], n, o = 40, s = 20) {
  if (e.length < 3) return t.map(() => ({ x: 0, y: 0 }));
  const r = Xn(e), a = e.map((x) => x.x), l = e.map((x) => x.y), c = Math.min(...a), h = Math.max(...a), d = Math.min(...l), p = Math.max(...l), m = Math.max(5, Math.min(h - c, p - d) / 40), g = [];
  for (let x = d + m / 2; x < p; x += m)
    for (let $ = c + m / 2; $ < h; $ += m) {
      const y = { x: Math.round($), y: Math.round(x) };
      Fe(e, y.x, y.y) && g.push(y);
    }
  const b = [...i], v = [];
  for (const x of t) {
    let $;
    for (const w of [1, 0.6, 0.3]) {
      let E = 1 / 0;
      for (const T of g) {
        const C = ql(e, T);
        if (C < s * w || b.some((B) => N(T, B) < o * w) || n && N(T, n) < o * 1.5 * w) continue;
        const D = x.light ? N(T, r) : C;
        D < E && (E = D, $ = T);
      }
      if ($) break;
    }
    const y = $ ?? r;
    b.push(y), v.push({ x: y.x, y: y.y });
  }
  return v;
}
function Vl(e, t, i, n = []) {
  let o, s = i;
  for (const r of t) {
    if (n.includes(r)) continue;
    const a = He(e, { x: r.x1, y: r.y1 }, { x: r.x2, y: r.y2 }), l = N(e, a.point);
    l <= s && (o = a.point, s = l);
  }
  return o && { x: Math.round(o.x * 100) / 100, y: Math.round(o.y * 100) / 100 };
}
function Zl(e, t, i, n = 0.5) {
  const o = N(e, t);
  if (o < 1) return [];
  const s = [];
  for (const c of i) {
    const h = { x: c.x1, y: c.y1 }, d = { x: c.x2, y: c.y2 }, p = He(h, e, t), m = He(d, e, t);
    if (N(h, p.point) > n || N(d, m.point) > n) continue;
    const g = Math.min(p.t, m.t), b = Math.max(p.t, m.t);
    b > g && s.push([g, b]);
  }
  s.sort((c, h) => c[0] - h[0]);
  const r = [];
  let a = 0;
  const l = (c) => ({ x: e.x + (t.x - e.x) * c, y: e.y + (t.y - e.y) * c });
  for (const [c, h] of s)
    c > a && (c - a) * o > 1 && r.push([l(a), l(c)]), a = Math.max(a, h);
  return a < 1 && (1 - a) * o > 1 && r.push([l(a), l(1)]), r;
}
function Pt(e, t, i, n = 0.5) {
  return N(e, He(e, t, i).point) <= n;
}
function vr(e, t, i = 0.5) {
  const n = e.points;
  return t.filter((o) => {
    const s = { x: o.x1, y: o.y1 }, r = { x: o.x2, y: o.y2 };
    return n.some((a, l) => {
      const c = n[(l + 1) % n.length];
      return Pt(s, a, c, i) && Pt(r, a, c, i);
    });
  });
}
function qo(e, t) {
  return t.filter((i) => vr(i, [e]).length > 0);
}
var Xl = Object.defineProperty, Yl = Object.getOwnPropertyDescriptor, ie = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Yl(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Xl(t, i, o), o;
};
const Ko = [
  { id: "select", icon: "mdi:cursor-default", label: "Auswahl", hint: "Teile und Leuchtpunkte anklicken und ziehen. Griffe ändern die Größe. Alt hält den Fang aus." },
  { id: "rect", icon: "mdi:rectangle-outline", label: "Rechteck", hint: "Von Ecke zu Ecke ziehen." },
  { id: "circle", icon: "mdi:circle-outline", label: "Kreis", hint: "Vom Mittelpunkt zum Rand ziehen." },
  { id: "polygon", icon: "mdi:vector-polygon", label: "Polygon", hint: "Eckpunkte anklicken; Doppelklick, Enter oder Klick auf den ersten Punkt schließt die Form." },
  { id: "light", icon: "mdi:lightbulb-on-outline", label: "Leuchtpunkt", hint: "Klick setzt einen Leuchtpunkt – dort scheint das Licht, wenn dem Möbelstück ein Licht zugewiesen ist." }
], Jl = [1, 2, 5, 10, 25], Vo = 50, Zo = 300, Xo = 7, Ql = ["mdi:sofa", "mdi:bed", "mdi:desk-lamp", "mdi:floor-lamp", "mdi:television", "mdi:table-furniture", "mdi:chair-rolling", "mdi:flower"], Z = (e) => Math.round(e * 100) / 100, wt = (e) => JSON.parse(JSON.stringify(e));
let J = class extends te {
  constructor() {
    super(...arguments), this._isNew = !1, this._dirty = !1, this._tool = "select", this._grid = 5, this._zoom = 1, this._poly = [], this._guides = [], this._undo = [], this._redo = [], this._onKey = (e) => {
      if (!this._editing) return;
      const t = e.composedPath()[0]?.tagName;
      if (t === "INPUT" || t === "SELECT" || t === "TEXTAREA") return;
      const i = e.ctrlKey || e.metaKey;
      e.key === "Escape" ? this._poly.length ? this._poly = [] : this._tool !== "select" ? this._tool = "select" : this._sel = void 0 : e.key === "Enter" && this._poly.length >= 3 ? this._finishPolygon() : (e.key === "Delete" || e.key === "Backspace") && this._sel ? (e.preventDefault(), this._deleteSel()) : i && e.key.toLowerCase() === "z" ? (e.preventDefault(), e.shiftKey ? this._doRedo() : this._doUndo()) : i && e.key.toLowerCase() === "y" ? (e.preventDefault(), this._doRedo()) : i && e.key.toLowerCase() === "d" && this._part && (e.preventDefault(), this._duplicatePart());
    };
  }
  willUpdate(e) {
    if (e.has("openId") && this.openId) {
      const t = ke(this.plan?.furniture, this.openId);
      t && this._edit(t, !1);
    }
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._onKey);
  }
  disconnectedCallback() {
    window.removeEventListener("keydown", this._onKey), super.disconnectedCallback();
  }
  get _list() {
    return this.plan?.furniture ?? [];
  }
  get _upp() {
    const e = this._svg?.getBoundingClientRect(), t = e && e.width && e.height ? Math.min(e.width, e.height) : 600;
    return Zo / this._zoom / t;
  }
  // ---------------------------------------------------------------- Bibliothek
  _emit(e) {
    this.dispatchEvent(new CustomEvent("furniture-change", { detail: { furniture: e }, bubbles: !0, composed: !0 }));
  }
  _close() {
    if (this._editing) return this._leaveEdit();
    this.dispatchEvent(new CustomEvent("close-furniture", { bubbles: !0, composed: !0 }));
  }
  _new() {
    if (this._list.length >= it) return void (this._notice = `Höchstens ${it} Vorlagen`);
    this._edit({ id: U("m"), name: "", parts: [] }, !0);
  }
  _edit(e, t) {
    this._editing = wt(e), this._isNew = t, this._dirty = !1, this._sel = void 0, this._tool = "select", this._poly = [], this._undo = [], this._redo = [], this._notice = void 0, this._zoom = 1;
  }
  _leaveEdit() {
    this._dirty && !confirm("Änderungen an dieser Vorlage verwerfen?") || (this._editing = void 0, this.openId = void 0, this.dispatchEvent(new CustomEvent("edit-left", { bubbles: !0, composed: !0 })));
  }
  _apply() {
    const e = this._editing;
    if (!e) return;
    const t = e.name.trim();
    if (!t) return void (this._notice = "Bitte einen Namen eingeben");
    if (!e.parts.length) return void (this._notice = "Die Vorlage braucht mindestens ein Teil");
    const i = { ...e, name: t }, n = this._list.some((o) => o.id === e.id) ? this._list.map((o) => o.id === e.id ? i : o) : [...this._list, i];
    this._emit(n), this._editing = void 0, this._dirty = !1, this.openId = void 0, this.dispatchEvent(new CustomEvent("edit-left", { bubbles: !0, composed: !0 }));
  }
  _rename(e) {
    const t = prompt("Neuer Name", e.name)?.trim();
    t && this._emit(this._list.map((i) => i.id === e.id ? { ...i, name: t } : i));
  }
  _duplicate(e) {
    if (this._list.length >= it) return void (this._notice = `Höchstens ${it} Vorlagen`);
    const t = wt(e);
    t.id = U("m"), t.name = `${e.name} Kopie`.slice(0, 100), t.parts.forEach((i) => i.id = U("p")), this._emit([...this._list, t]);
  }
  _usage(e) {
    return this.plan.floors.reduce((t, i) => t + i.items.filter((n) => n.furnitureType === e.id).length, 0);
  }
  _delete(e) {
    const t = this._usage(e), i = t ? `„${e.name}“ löschen? ${t} platzierte${t === 1 ? "s Exemplar zeigt" : " Exemplare zeigen"} dann nur noch ein Icon.` : `„${e.name}“ löschen?`;
    confirm(i) && this._emit(this._list.filter((n) => n.id !== e.id));
  }
  async _importFile(e, t) {
    const i = e.target, n = i.files?.[0];
    if (i.value = "", !!n)
      try {
        if (n.size > 5e5) throw new Error("Die Datei ist zu groß (höchstens 500 kB)");
        const { parts: o, skipped: s } = Fl(await n.text());
        if (t) {
          if (this._list.length >= it) throw new Error(`Höchstens ${it} Vorlagen`);
          this._edit({ id: U("m"), name: n.name.replace(/\.svg$/i, ""), parts: o }, !0), this._dirty = !0;
        } else if (this._editing) {
          if (this._editing.parts.length + o.length > at) throw new Error(`Höchstens ${at} Teile je Vorlage`);
          this._pushUndo(), this._editing = { ...this._editing, parts: [...this._editing.parts, ...o] }, this._sel = { kind: "part", id: o[0].id };
        }
        this._notice = s ? `${s} nicht unterstützte Elemente wurden übersprungen` : void 0;
      } catch (o) {
        this._notice = o instanceof Error ? o.message : "Import fehlgeschlagen";
      }
  }
  // ---------------------------------------------------------------- Bearbeiten
  _pushUndo() {
    this._editing && (this._undo.push(JSON.stringify(this._editing)), this._undo.length > Vo && this._undo.shift(), this._redo = [], this._dirty = !0);
  }
  _doUndo() {
    const e = this._undo.pop();
    !e || !this._editing || (this._redo.push(JSON.stringify(this._editing)), this._editing = JSON.parse(e), this._fixSel(), this._dirty = !0);
  }
  _doRedo() {
    const e = this._redo.pop();
    !e || !this._editing || (this._undo.push(JSON.stringify(this._editing)), this._editing = JSON.parse(e), this._fixSel());
  }
  _fixSel() {
    const e = this._editing;
    !e || !this._sel || (this._sel.kind === "part" && !e.parts.some((t) => t.id === this._sel.id) && (this._sel = void 0), this._sel?.kind === "light" && !(e.lights ?? [])[this._sel.index] && (this._sel = void 0));
  }
  /** Ändert das Modell mit Undo-Schritt. */
  _mutate(e) {
    this._editing && (this._pushUndo(), e(this._editing), this._editing = { ...this._editing });
  }
  get _part() {
    return this._sel?.kind === "part" ? this._editing?.parts.find((e) => e.id === this._sel.id) : void 0;
  }
  _setPart(e, t) {
    const i = this._part?.id;
    i && this._mutate((n) => {
      const o = n.parts.find((s) => s.id === i);
      t === void 0 || t === "" || typeof t == "number" && Number.isNaN(t) ? delete o[e] : o[e] = t;
    });
  }
  _deleteSel() {
    const e = this._sel;
    e && (this._mutate((t) => {
      e.kind === "part" ? t.parts = t.parts.filter((i) => i.id !== e.id) : t.lights = (t.lights ?? []).filter((i, n) => n !== e.index);
    }), this._sel = void 0);
  }
  _duplicatePart() {
    const e = this._part;
    if (!e || (this._editing?.parts.length ?? 0) >= at) return;
    const t = wt(e);
    t.id = U("p"), t.x += 10, t.y += 10, this._mutate((i) => i.parts.push(t)), this._sel = { kind: "part", id: t.id };
  }
  _order(e) {
    const t = this._part?.id;
    t && this._mutate((i) => {
      const n = i.parts.findIndex((s) => s.id === t), o = n + e;
      o < 0 || o >= i.parts.length || ([i.parts[n], i.parts[o]] = [i.parts[o], i.parts[n]]);
    });
  }
  _addPart(e) {
    if ((this._editing?.parts.length ?? 0) >= at) return void (this._notice = `Höchstens ${at} Teile je Vorlage`);
    const t = U("p");
    this._mutate((i) => i.parts.push({ id: t, fill: _n, ...e })), this._sel = { kind: "part", id: t };
  }
  // ---------------------------------------------------------------- Zeiger
  _toLocal(e) {
    const t = this._svg.getScreenCTM();
    if (!t) return { x: 0, y: 0 };
    const i = new DOMPoint(e.clientX, e.clientY).matrixTransform(t.inverse());
    return { x: i.x, y: i.y };
  }
  _refs(e) {
    const t = [{ x: 0, y: 0 }];
    for (const i of this._editing?.parts ?? []) {
      if (i.id === e) continue;
      const n = mi(i);
      t.push({ x: n.x0, y: n.y0 }, { x: n.x1, y: n.y1 }, { x: (n.x0 + n.x1) / 2, y: (n.y0 + n.y1) / 2 });
    }
    for (const i of this._editing?.lights ?? []) t.push(i);
    return t;
  }
  _snap(e, t, i) {
    if (t.altKey)
      return this._guides = [], e;
    const n = _r(e, this._refs(i), 6 * this._upp);
    return this._guides = n.guides, { x: n.x ?? pe(e.x, this._grid), y: n.y ?? pe(e.y, this._grid) };
  }
  _hitOf(e) {
    for (const t of e.composedPath()) {
      if (!(t instanceof Element)) continue;
      if (t === this._svg) break;
      const i = t.getAttribute("data-handle");
      if (i) return { handle: i };
      const n = t.getAttribute("data-part");
      if (n) return { part: n };
      const o = t.getAttribute("data-light");
      if (o !== null) return { light: Number(o) };
    }
    return {};
  }
  _onPointerDown(e) {
    if (e.button !== 0 || !this._editing) return;
    const t = this._toLocal(e), i = this._hitOf(e), n = JSON.stringify(this._editing), o = { pointerId: e.pointerId, start: t, moved: !1, snapshot: n };
    if (this._tool === "select") {
      const s = this._part;
      if (i.handle && s)
        this._drag = { ...o, mode: i.handle.startsWith("v") ? "vertex" : "resize", orig: wt(s), handle: i.handle, index: Number(i.handle.slice(1)) };
      else if (i.light !== void 0)
        this._sel = { kind: "light", index: i.light }, this._drag = { ...o, mode: "light", orig: void 0, origLight: { ...(this._editing.lights ?? [])[i.light] }, index: i.light };
      else if (i.part)
        this._sel = { kind: "part", id: i.part }, this._drag = { ...o, mode: "move", orig: wt(this._editing.parts.find((r) => r.id === i.part)) };
      else {
        this._sel = void 0;
        return;
      }
      this._svg.setPointerCapture(e.pointerId);
      return;
    }
    if (this._tool === "rect" || this._tool === "circle") {
      const s = this._snap(t, e);
      this._rubber = { a: s, b: s }, this._drag = { ...o, mode: "shape", orig: void 0 }, this._svg.setPointerCapture(e.pointerId);
      return;
    }
    if (this._tool === "polygon") {
      const s = this._snap(t, e);
      if (this._poly.length >= 3 && Math.hypot(s.x - this._poly[0].x, s.y - this._poly[0].y) <= Xo * this._upp) return this._finishPolygon();
      this._poly = [...this._poly, s];
      return;
    }
    if (this._tool === "light") {
      const s = this._snap(t, e);
      if ((this._editing.lights ?? []).length >= 10) return void (this._notice = "Höchstens 10 Leuchtpunkte");
      this._mutate((r) => r.lights = [...r.lights ?? [], { x: s.x, y: s.y }]), this._sel = { kind: "light", index: (this._editing.lights ?? []).length - 1 }, this._tool = "select";
    }
  }
  _onPointerMove(e) {
    const t = this._toLocal(e);
    this._cursor = t;
    const i = this._drag;
    if (!i || i.pointerId !== e.pointerId || !this._editing) {
      (this._tool === "polygon" || this._tool === "light") && this._snap(t, e);
      return;
    }
    const n = this._editing;
    if (i.mode === "shape") {
      this._rubber = { a: this._rubber.a, b: this._snap(t, e) }, i.moved = !0;
      return;
    }
    if (!i.moved && Math.hypot(t.x - i.start.x, t.y - i.start.y) < 3 * this._upp) return;
    if (i.moved || (this._undo.push(i.snapshot), this._undo.length > Vo && this._undo.shift(), this._redo = [], this._dirty = !0, i.moved = !0), i.mode === "light") {
      const s = this._snap(t, e), r = [...n.lights ?? []];
      r[i.index] = s, this._editing = { ...n, lights: r };
      return;
    }
    const o = n.parts.find((s) => s.id === i.orig.id);
    if (i.mode === "move") {
      const s = t.x - i.start.x, r = t.y - i.start.y, a = this._snap({ x: i.orig.x + s, y: i.orig.y + r }, e, o.id);
      o.x = Z(a.x), o.y = Z(a.y);
    } else if (i.mode === "resize") {
      const s = this._snap(t, e, o.id);
      o.shape === "circle" ? o.r = Z(Math.max(1, Math.hypot(s.x - o.x, s.y - o.y))) : (o.w = Z(Math.max(2, Math.abs(s.x - o.x) * 2)), o.h = Z(Math.max(2, Math.abs(s.y - o.y) * 2)));
    } else if (i.mode === "vertex") {
      const s = this._snap({ x: t.x, y: t.y }, e, o.id);
      o.points = (o.points ?? []).map((r, a) => a === i.index ? { x: Z(s.x - o.x), y: Z(s.y - o.y) } : r);
    }
    this._editing = { ...n };
  }
  _onPointerUp(e) {
    const t = this._drag;
    if (!(!t || t.pointerId !== e.pointerId) && (this._drag = void 0, this._guides = [], t.mode === "shape" && this._rubber)) {
      const { a: i, b: n } = this._rubber;
      if (this._rubber = void 0, this._tool === "rect") {
        const o = Math.abs(n.x - i.x), s = Math.abs(n.y - i.y);
        o >= 2 && s >= 2 && this._addPart({ shape: "rect", x: Z((i.x + n.x) / 2), y: Z((i.y + n.y) / 2), w: Z(o), h: Z(s) });
      } else {
        const o = Math.hypot(n.x - i.x, n.y - i.y);
        o >= 1 && this._addPart({ shape: "circle", x: i.x, y: i.y, r: Z(o) });
      }
      this._tool = "select";
    }
  }
  _finishPolygon() {
    if (this._poly.length < 3) return;
    const e = this._poly, t = Z(e.reduce((n, o) => n + o.x, 0) / e.length), i = Z(e.reduce((n, o) => n + o.y, 0) / e.length);
    this._poly = [], this._addPart({ shape: "polygon", x: t, y: i, points: e.map((n) => ({ x: Z(n.x - t), y: Z(n.y - i) })) }), this._tool = "select";
  }
  _onWheel(e) {
    e.preventDefault(), this._zoom = Math.max(0.25, Math.min(8, this._zoom * (e.deltaY < 0 ? 1.15 : 1 / 1.15)));
  }
  // ---------------------------------------------------------------- Darstellung
  render() {
    return this._editing ? this._renderEdit(this._editing) : this._renderList();
  }
  _thumb(e) {
    const t = gi(e), i = Math.max(t.x1 - t.x0, t.y1 - t.y0) * 0.1 + 2;
    return u`<svg class="thumb" viewBox="${t.x0 - i} ${t.y0 - i} ${t.x1 - t.x0 + 2 * i} ${t.y1 - t.y0 + 2 * i}">
      <g class="furniture">${e.parts.map((n) => yi(n))}</g>
      ${(e.lights ?? []).map((n) => _`<circle class="light-dot" cx=${n.x} cy=${n.y} r=${Math.max(t.x1 - t.x0, t.y1 - t.y0) * 0.04}></circle>`)}
    </svg>`;
  }
  _renderList() {
    return u`
      <div class="toolbar">
        <button class="icon-btn" title="Zurück zum Grundriss" @click=${this._close}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <div class="main-title">Möbel-Bibliothek</div>
        <label class="chip-btn" title="SVG als neue Vorlage importieren">
          <ha-icon icon="mdi:file-import-outline"></ha-icon>SVG importieren
          <input type="file" accept=".svg,image/svg+xml" hidden @change=${(e) => this._importFile(e, !0)} />
        </label>
        <button class="save" @click=${this._new}>Neue Vorlage</button>
      </div>
      ${this._noticeBar()}
      <div class="list">
        ${this._list.length ? this._list.map((e) => {
      const t = this._usage(e);
      return u`<div class="card">
                ${this._thumb(e)}
                <div class="card-name">${e.name}</div>
                <div class="muted">${e.parts.length} Teile${e.lights?.length ? ` · ${e.lights.length} Leuchtpunkt${e.lights.length > 1 ? "e" : ""}` : ""} · ${t}× platziert</div>
                <div class="card-actions">
                  <button class="icon-btn" title="Bearbeiten" @click=${() => this._edit(e, !1)}><ha-icon icon="mdi:pencil-outline"></ha-icon></button>
                  <button class="icon-btn" title="Umbenennen" @click=${() => this._rename(e)}><ha-icon icon="mdi:rename-outline"></ha-icon></button>
                  <button class="icon-btn" title="Duplizieren" @click=${() => this._duplicate(e)}><ha-icon icon="mdi:content-duplicate"></ha-icon></button>
                  <button class="icon-btn" title="Löschen" @click=${() => this._delete(e)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
                </div>
              </div>`;
    }) : u`<div class="empty">
              <ha-icon icon="mdi:sofa-outline"></ha-icon>
              <p>Die Bibliothek ist leer. Baue eigene Möbelstücke aus Rechtecken, Kreisen und Polygonen oder importiere eine einfache SVG-Draufsicht.</p>
            </div>`}
      </div>
    `;
  }
  _noticeBar() {
    return this._notice ? u`<div class="notice">${this._notice}<button @click=${() => this._notice = void 0}>OK</button></div>` : f;
  }
  _renderEdit(e) {
    const t = Ko.find((n) => n.id === this._tool), i = Zo / this._zoom / 2;
    return u`
      <div class="toolbar">
        <button class="icon-btn" title="Zur Bibliothek" @click=${this._leaveEdit}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <div class="main-title">${this._isNew ? "Neue Vorlage" : "Vorlage bearbeiten"}${this._dirty ? u`<span class="dirty"> • ungespeichert</span>` : f}</div>
        <button class="icon-btn" title="Rückgängig (Strg+Z)" ?disabled=${!this._undo.length} @click=${this._doUndo}><ha-icon icon="mdi:undo"></ha-icon></button>
        <button class="icon-btn" title="Wiederholen (Strg+Y)" ?disabled=${!this._redo.length} @click=${this._doRedo}><ha-icon icon="mdi:redo"></ha-icon></button>
        <button class="save" @click=${this._apply}>Übernehmen</button>
      </div>
      ${this._noticeBar()}
      <div class="body">
        <div class="tools">
          ${Ko.map(
      (n) => u`<button class="tool ${n.id === this._tool ? "active" : ""}" title=${n.label} @click=${() => (this._tool = n.id, this._poly = [])}>
              <ha-icon .icon=${n.icon}></ha-icon><span>${n.label}</span>
            </button>`
    )}
          <div class="sep"></div>
          <label class="tool" title="SVG-Formen zu dieser Vorlage hinzufügen">
            <ha-icon icon="mdi:file-import-outline"></ha-icon><span>SVG</span>
            <input type="file" accept=".svg,image/svg+xml" hidden @change=${(n) => this._importFile(n, !1)} />
          </label>
          <button class="tool" title="Zoom +" @click=${() => this._zoom = Math.min(8, this._zoom * 1.4)}><ha-icon icon="mdi:magnify-plus-outline"></ha-icon><span>Zoom +</span></button>
          <button class="tool" title="Zoom −" @click=${() => this._zoom = Math.max(0.25, this._zoom / 1.4)}><ha-icon icon="mdi:magnify-minus-outline"></ha-icon><span>Zoom −</span></button>
        </div>
        <div class="canvas-wrap">
          <svg
            class="canvas tool-${this._tool}"
            viewBox="${-i} ${-i} ${2 * i} ${2 * i}"
            preserveAspectRatio="xMidYMid meet"
            @pointerdown=${this._onPointerDown}
            @pointermove=${this._onPointerMove}
            @pointerup=${this._onPointerUp}
            @pointercancel=${this._onPointerUp}
            @pointerleave=${() => this._cursor = void 0}
            @dblclick=${() => this._finishPolygon()}
            @wheel=${this._onWheel}
          >
            ${this._renderCanvas(e, i)}
          </svg>
          <div class="hint">${t.hint}</div>
        </div>
        <div class="props">${this._renderProps(e)}</div>
      </div>
    `;
  }
  _renderCanvas(e, t) {
    const i = this._upp, n = this._grid, o = n * 1, s = n * 10, r = this._sel, a = this._part;
    return _`
      <defs>
        <pattern id="fg-minor" width=${o} height=${o} patternUnits="userSpaceOnUse">
          <path d="M ${o} 0 L 0 0 0 ${o}" class="grid-minor"></path>
        </pattern>
        <pattern id="fg-major" width=${s} height=${s} patternUnits="userSpaceOnUse">
          ${o / i >= 4 ? _`<rect width=${s} height=${s} fill="url(#fg-minor)"></rect>` : f}
          <path d="M ${s} 0 L 0 0 0 ${s}" class="grid-major"></path>
        </pattern>
      </defs>
      <rect class="sheet" x=${-t} y=${-t} width=${2 * t} height=${2 * t}></rect>
      <rect x=${-t} y=${-t} width=${2 * t} height=${2 * t} fill="url(#fg-major)" pointer-events="none"></rect>
      <line class="axis" x1=${-t} x2=${t} y1="0" y2="0" stroke-width=${i}></line>
      <line class="axis" y1=${-t} y2=${t} x1="0" x2="0" stroke-width=${i}></line>
      <g class="furniture editing">
        ${e.parts.map(
      (l) => _`<g data-part=${l.id} class="part ${r?.kind === "part" && r.id === l.id ? "selected" : ""}">${yi(l, { cls: "hit" })}</g>`
    )}
      </g>
      ${(e.lights ?? []).map(
      (l, c) => _`<g data-light=${c} class="light-mark ${r?.kind === "light" && r.index === c ? "selected" : ""}">
          <circle cx=${l.x} cy=${l.y} r=${9 * i} class="light-hit"></circle>
          <circle cx=${l.x} cy=${l.y} r=${4 * i} class="light-dot"></circle>
          <circle cx=${l.x} cy=${l.y} r=${8 * i} class="light-ring" stroke-width=${i * 1.5}></circle>
        </g>`
    )}
      ${a ? this._renderHandles(a, i) : f}
      ${this._renderPreview(i)}
      ${this._guides.map(
      (l) => l.axis === "x" ? _`<line class="guide" x1=${l.value} x2=${l.value} y1=${-t} y2=${t} stroke-width=${i}></line>` : _`<line class="guide" y1=${l.value} y2=${l.value} x1=${-t} x2=${t} stroke-width=${i}></line>`
    )}
    `;
  }
  _renderHandles(e, t) {
    const i = Xo * t;
    if (e.shape === "polygon")
      return _`${(e.points ?? []).map((r, a) => _`<circle class="handle" data-handle="v${a}" cx=${e.x + r.x} cy=${e.y + r.y} r=${i} stroke-width=${2 * t}></circle>`)}`;
    const n = mi(e), o = e.shape === "circle" ? e.x + (e.r ?? 0) : n.x1, s = e.shape === "circle" ? e.y : n.y1;
    return _`<rect class="sel-box" x=${n.x0} y=${n.y0} width=${n.x1 - n.x0} height=${n.y1 - n.y0} stroke-width=${t * 1.5}></rect>
      <circle class="handle" data-handle="s0" cx=${o} cy=${s} r=${i} stroke-width=${2 * t}></circle>`;
  }
  _renderPreview(e) {
    if (this._rubber) {
      const { a: t, b: i } = this._rubber;
      return this._tool === "rect" ? _`<rect class="preview" x=${Math.min(t.x, i.x)} y=${Math.min(t.y, i.y)} width=${Math.abs(i.x - t.x)} height=${Math.abs(i.y - t.y)} stroke-width=${2 * e}></rect>` : _`<circle class="preview" cx=${t.x} cy=${t.y} r=${Math.hypot(i.x - t.x, i.y - t.y)} stroke-width=${2 * e}></circle>`;
    }
    if (this._tool === "polygon" && this._poly.length) {
      const t = this._cursor ? this._snap(this._cursor, { altKey: !1 }) : void 0, i = [...this._poly, ...t ? [t] : []];
      return _`<polyline class="preview" points=${i.map((n) => `${n.x},${n.y}`).join(" ")} stroke-width=${2 * e}></polyline>
        ${this._poly.map((n, o) => _`<circle class="handle ${o === 0 ? "first" : ""}" cx=${n.x} cy=${n.y} r=${(o === 0 ? 6 : 4) * e}></circle>`)}`;
    }
    return f;
  }
  _num(e, t, i, n = 1) {
    return u`<label class="field"><span>${e}</span>
      <input type="number" step="1" min=${n} .value=${i === void 0 ? "" : String(Z(i))}
        @change=${(o) => this._setPartNum(t, o.target.value, n)} /></label>`;
  }
  _setPartNum(e, t, i) {
    if (t === "") return;
    const n = Number(t);
    Number.isFinite(n) && this._setPart(e, e === "x" || e === "y" ? n : Math.max(i, n));
  }
  _renderProps(e) {
    const t = this._part, i = this._sel, n = gi(e);
    return u`
      <h3>Vorlage</h3>
      <label class="field"><span>Name</span>
        <input type="text" maxlength="100" .value=${e.name} placeholder="z. B. Stehlampe"
          @input=${(o) => {
      this._editing = { ...e, name: o.target.value }, this._dirty = !0;
    }} /></label>
      <label class="field"><span>Raster (cm)</span>
        <select @change=${(o) => this._grid = Number(o.target.value)}>
          ${Jl.map((o) => u`<option value=${o} ?selected=${o === this._grid}>${o}</option>`)}
        </select></label>
      <p class="muted">${e.parts.length} Teile · ${Z(n.x1 - n.x0)} × ${Z(n.y1 - n.y0)} cm · ${(e.lights ?? []).length} Leuchtpunkt${(e.lights ?? []).length === 1 ? "" : "e"}</p>
      ${i?.kind === "light" ? u`<h3>Leuchtpunkt</h3>
            <p class="muted">Ziehen verschiebt den Punkt. Hier scheint das Licht eines platzierten Exemplars.</p>
            <div class="row-btns"><button class="chip" @click=${this._deleteSel}><ha-icon icon="mdi:delete-outline"></ha-icon>Löschen</button></div>` : t ? u`
            <h3>${{ rect: "Rechteck", circle: "Kreis", polygon: "Polygon", path: "SVG-Form" }[t.shape]}</h3>
            <div class="row-btns">
              <button class="icon-btn" title="Nach vorn" @click=${() => this._order(1)}><ha-icon icon="mdi:arrange-bring-forward"></ha-icon></button>
              <button class="icon-btn" title="Nach hinten" @click=${() => this._order(-1)}><ha-icon icon="mdi:arrange-send-backward"></ha-icon></button>
              <button class="icon-btn" title="Duplizieren (Strg+D)" @click=${this._duplicatePart}><ha-icon icon="mdi:content-duplicate"></ha-icon></button>
              <button class="icon-btn" title="Löschen (Entf)" @click=${this._deleteSel}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
            </div>
            <div class="grid2">${this._num("Mitte x", "x", t.x, -1e5)} ${this._num("Mitte y", "y", t.y, -1e5)}</div>
            ${t.shape === "rect" || t.shape === "path" ? u`<div class="grid2">${this._num("Breite", "w", t.w)} ${this._num("Höhe", "h", t.h)}</div>` : f}
            ${t.shape === "circle" ? this._num("Radius", "r", t.r) : f}
            <label class="field color"><span>Farbe</span>
              <input type="color" .value=${t.fill?.startsWith("#") && t.fill.length === 7 ? t.fill : _n}
                @change=${(o) => this._setPart("fill", o.target.value)} /></label>
            <label class="field"><span>Deckkraft ${Math.round((t.opacity ?? 1) * 100)} %</span>
              <input type="range" min="0.05" max="1" step="0.05" .value=${String(t.opacity ?? 1)}
                @change=${(o) => this._setPart("opacity", Number(o.target.value))} /></label>
            <div class="field"><span>Icon als Symbol (optional)</span>
              <div class="icon-input"><ha-icon .icon=${t.icon ?? "mdi:help-circle-outline"}></ha-icon>
                <input type="text" .value=${t.icon ?? ""} placeholder="mdi:…" @change=${(o) => this._setPart("icon", o.target.value.trim())} /></div>
              <div class="icon-grid">${Ql.map((o) => u`<button class="icon-pick ${t.icon === o ? "active" : ""}" title=${o} @click=${() => this._setPart("icon", o)}><ha-icon .icon=${o}></ha-icon></button>`)}</div>
            </div>` : u`<p class="muted">Teil oder Leuchtpunkt anklicken, oder links ein Werkzeug wählen und zeichnen. Mehrere Teile ergeben zusammen ein Möbelstück; der Mittelpunkt (0/0) ist der Ankerpunkt beim Platzieren und Drehen.</p>`}
    `;
  }
};
J.styles = [
  Ae(Zn),
  oe`
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
    `
];
ie([
  A({ attribute: !1 })
], J.prototype, "plan", 2);
ie([
  A({ attribute: !1 })
], J.prototype, "hass", 2);
ie([
  A()
], J.prototype, "openId", 2);
ie([
  k()
], J.prototype, "_editing", 2);
ie([
  k()
], J.prototype, "_isNew", 2);
ie([
  k()
], J.prototype, "_dirty", 2);
ie([
  k()
], J.prototype, "_sel", 2);
ie([
  k()
], J.prototype, "_tool", 2);
ie([
  k()
], J.prototype, "_grid", 2);
ie([
  k()
], J.prototype, "_zoom", 2);
ie([
  k()
], J.prototype, "_poly", 2);
ie([
  k()
], J.prototype, "_cursor", 2);
ie([
  k()
], J.prototype, "_rubber", 2);
ie([
  k()
], J.prototype, "_guides", 2);
ie([
  k()
], J.prototype, "_notice", 2);
ie([
  bt("svg.canvas")
], J.prototype, "_svg", 2);
J = ie([
  Te("fp-furniture-editor")
], J);
const Yo = 0.18, Jo = 0.6, Qo = 0.5;
function ec(e, t) {
  if (!t || t.state !== "on") return;
  const i = t.attributes ?? {}, n = i.brightness, o = typeof n == "number" && Number.isFinite(n) ? Math.max(0, Math.min(255, n)) / 255 : void 0, s = o === void 0 ? Jo : Yo + (Jo - Yo) * o, a = (typeof e.glowRadius == "number" && e.glowRadius > 0 ? e.glowRadius : vn) * (o === void 0 ? 1 : Qo + (1 - Qo) * o), l = i.rgb_color;
  if (Array.isArray(l) && l.length >= 3 && l.slice(0, 3).every((c) => typeof c == "number" && Number.isFinite(c))) {
    const c = (h) => Math.max(0, Math.min(255, Math.round(h)));
    return { color: `rgb(${c(l[0])}, ${c(l[1])}, ${c(l[2])})`, opacity: s, radius: a };
  }
  return { color: e.glowColor || pr, opacity: s, radius: a };
}
function xr(e, t, i) {
  const n = i.x2 - i.x1, o = i.y2 - i.y1, s = n * n + o * o, r = s === 0 ? 0 : Math.max(0, Math.min(1, ((e - i.x1) * n + (t - i.y1) * o) / s));
  return Math.hypot(e - (i.x1 + r * n), t - (i.y1 + r * o));
}
function tc(e, t, i, n, o) {
  const s = o.x2 - o.x1, r = o.y2 - o.y1, a = i * r - n * s;
  if (Math.abs(a) < 1e-12) return;
  const l = o.x1 - e, c = o.y1 - t, h = (l * r - c * s) / a, d = (l * n - c * i) / a;
  if (!(h <= 1e-9 || d < 0 || d > 1))
    return h;
}
function ic(e, t, i, n, o) {
  const s = e.x2 - e.x1, r = e.y2 - e.y1, a = [-s, s, -r, r], l = [e.x1 - t, n - e.x1, e.y1 - i, o - e.y1];
  let c = 0, h = 1;
  for (let d = 0; d < 4; d++) {
    if (a[d] === 0) {
      if (l[d] < 0) return;
      continue;
    }
    const p = l[d] / a[d];
    if (a[d] < 0) {
      if (p > h) return;
      p > c && (c = p);
    } else {
      if (p < c) return;
      p < h && (h = p);
    }
  }
  return { ...e, x1: e.x1 + c * s, y1: e.y1 + c * r, x2: e.x1 + h * s, y2: e.y1 + h * r };
}
function wr(e, t, i, n, o = () => 12) {
  const s = n.filter((p) => {
    const m = xr(e, t, p);
    return m < i && m > o(p) / 2 + 1;
  });
  if (!s.length) return;
  const r = i * 1.01, a = [
    { id: "b1", x1: e - r, y1: t - r, x2: e + r, y2: t - r },
    { id: "b2", x1: e + r, y1: t - r, x2: e + r, y2: t + r },
    { id: "b3", x1: e + r, y1: t + r, x2: e - r, y2: t + r },
    { id: "b4", x1: e - r, y1: t + r, x2: e - r, y2: t - r }
  ], l = s.map((p) => ic(p, e - r, t - r, e + r, t + r)).filter((p) => !!p);
  if (!l.length) return;
  const c = [...l, ...a], h = [];
  for (const p of c)
    for (const [m, g] of [
      [p.x1, p.y1],
      [p.x2, p.y2]
    ]) {
      const b = Math.atan2(g - t, m - e);
      for (const v of [b - 1e-4, b, b + 1e-4]) {
        const x = Math.cos(v), $ = Math.sin(v);
        let y = 1 / 0;
        for (const w of c) {
          const E = tc(e, t, x, $, w);
          E !== void 0 && E < y && (y = E);
        }
        y < 1 / 0 && h.push({ x: e + x * y, y: t + $ * y, a: v });
      }
    }
  h.sort((p, m) => p.a - m.a);
  const d = (p) => Math.round(p * 100) / 100;
  return h.map(({ x: p, y: m }) => ({ x: d(p), y: d(m) }));
}
function $r(e, t) {
  return e.type !== "door" ? !1 : e.entity ? Xe(t?.states[e.entity]) : !0;
}
function kr(e, t, i, n = () => 12) {
  const o = t.filter(i);
  if (!o.length) return e;
  const s = [];
  for (const r of e) {
    const a = r.x2 - r.x1, l = r.y2 - r.y1, c = a * a + l * l;
    if (c === 0) {
      s.push(r);
      continue;
    }
    const h = Math.sqrt(c), d = [];
    for (const g of o) {
      if (xr(g.x, g.y, r) > n(r) / 2 + 1) continue;
      const b = ((g.x - r.x1) * a + (g.y - r.y1) * l) / c, v = g.length / 2 / h, x = Math.max(0, b - v), $ = Math.min(1, b + v);
      $ > x && d.push([x, $]);
    }
    if (!d.length) {
      s.push(r);
      continue;
    }
    d.sort((g, b) => g[0] - b[0]);
    let p = 0;
    const m = (g, b) => {
      b - g > 1e-6 && s.push({ ...r, x1: r.x1 + a * g, y1: r.y1 + l * g, x2: r.x1 + a * b, y2: r.y1 + l * b });
    };
    for (const [g, b] of d)
      m(p, g), p = Math.max(p, b);
    m(p, 1);
  }
  return s;
}
function nc(e) {
  if (!e || e.state === "unavailable" || e.state === "unknown") return;
  const t = e.attributes?.current_position;
  if (typeof t == "number" && Number.isFinite(t)) return 1 - Math.max(0, Math.min(100, t)) / 100;
  if (e.state === "closed") return 1;
  if (e.state === "open") return 0;
  if (e.state === "opening" || e.state === "closing") return 0.5;
}
function oc(e, t, i, n) {
  const o = e.items.filter((a) => a.entity && ni(a, t.furniture)).flatMap((a) => {
    const l = ec(a, i.states[a.entity]);
    return l ? gr(a, t.furniture).map((c) => ({ it: { ...a, x: c.x, y: c.y }, paint: l })) : [];
  });
  if (!o.length) return f;
  const s = (a) => a.thickness ?? t.settings.wallThickness, r = kr(e.walls, e.openings, (a) => $r(a, i), s);
  return _`<g class="fp-glows">
    ${o.map(({ it: a, paint: l }, c) => {
    const h = `${n}-${c}`, d = wr(a.x, a.y, l.radius, r, s);
    return _`
        ${d ? _`<clipPath id="${h}-clip"><polygon points=${d.map((p) => `${p.x},${p.y}`).join(" ")}></polygon></clipPath>` : f}
        <radialGradient id=${h} gradientUnits="userSpaceOnUse" cx=${a.x} cy=${a.y} r=${l.radius}>
          <stop offset="0" stop-color=${l.color} stop-opacity=${l.opacity}></stop>
          <stop offset="1" stop-color=${l.color} stop-opacity="0"></stop>
        </radialGradient>
        <circle class="fp-glow" cx=${a.x} cy=${a.y} r=${l.radius} fill="url(#${h})"
                clip-path=${d ? `url(#${h}-clip)` : f}></circle>`;
  })}
  </g>`;
}
const es = 10;
function En(e) {
  return e.leaves?.length ? e.leaves : [{ w: 1 }];
}
function An(e) {
  const t = En(e), i = t.reduce((o, s) => o + Math.max(s.w, 1e-4), 0);
  let n = -e.length / 2;
  return t.map((o, s) => {
    const r = Math.max(o.w, 1e-4) / i * e.length, a = {
      index: s,
      x0: n,
      x1: n + r,
      hinge: o.hinge ?? sc(e, s, t.length),
      entity: o.entity || e.entity || void 0
    };
    return n += r, a;
  });
}
function sc(e, t, i) {
  return i === 1 ? e.hinge ?? "left" : t === i - 1 ? "right" : "left";
}
function Sr(e, t) {
  if (!e || !t) return { open: !1, unknown: !1 };
  const i = t.states[e], n = !i || i.state === "unavailable" || i.state === "unknown";
  return { open: !n && Xe(i), unknown: n };
}
function rc(e, t) {
  return Sr(e.entity, t);
}
function ac(e) {
  return !e || e.state === "unavailable" || e.state === "unknown" ? "unknown" : e.state === "locked" ? "locked" : "unlocked";
}
function nn(e) {
  return e.type === "window" && !e.entity && !e.leaves?.some((t) => t.entity);
}
function lc(e, t) {
  const i = Math.max(1, Math.min(bn, Math.round(t))), n = e.length ? e.map((s) => ({ ...s })) : [{ w: 1 }];
  if (i <= n.length) return n.slice(0, i);
  const o = n.reduce((s, r) => s + r.w, 0) / n.length;
  for (; n.length < i; ) n.push({ w: o });
  return n;
}
function cc(e, t, i, n) {
  if (e.length === 1) return e.map((h) => ({ ...h }));
  const o = e.length - 1, s = Math.max(es, Math.min(n - es * o, i)), r = e.reduce((h, d, p) => p === t ? h : h + d.w, 0), a = n - s, l = e.reduce((h, d) => h + d.w, 0), c = n / l;
  return e.map((h, d) => {
    if (d === t) return { ...h, w: s / c };
    const p = r > 0 ? h.w / r : 1 / o;
    return { ...h, w: a * p / c };
  });
}
const dc = 0.12;
function bi(e, t) {
  return e.thickness ?? t.settings.wallThickness;
}
function ht(e, t) {
  return e.walls.reduce((i, n) => Math.max(i, bi(n, t)), t.settings.wallThickness);
}
function hc(e, t) {
  const i = e.color ?? "var(--primary-color)", n = e.opacity ?? dc;
  return t && e.entity && Xe(t.states[e.entity]) ? { color: e.activeColor ?? "#ffc107", opacity: Math.min(1, n + 0.2) } : { color: i, opacity: n };
}
function Er(e, t) {
  const { color: i, opacity: n } = hc(e, t.hass), o = e.points.map((c) => `${c.x},${c.y}`).join(" "), s = Math.min(...e.points.map((c) => c.x)), r = Math.min(...e.points.map((c) => c.y));
  let a = { x: s + t.labelSize * 0.8, y: r + t.labelSize * 1.5 };
  Fe(e.points, a.x, a.y) || (a = Xn(e.points));
  const l = Fe(e.points, s + t.labelSize * 0.8, r + t.labelSize * 1.5) ? "start" : "middle";
  return _`
    <g class="area ${t.selected ? "selected" : ""} ${t.dimmed ? "dimmed" : ""}" data-id=${e.id}>
      <polygon points=${o} fill=${i} fill-opacity=${n}
        style=${e.type === "balcony" ? `stroke:${i};stroke-width:3;stroke-dasharray:10 6;stroke-linejoin:round` : f}></polygon>
      ${e.showName !== !1 && e.name ? _`<text class="area-label" x=${a.x} y=${a.y} font-size=${t.labelSize}
                  text-anchor=${l} dominant-baseline="middle">${e.name}</text>` : f}
    </g>`;
}
function Ar(e, t, i, n = {}) {
  const { width: o, height: s } = t.canvas, r = Math.max(o, s), a = ht(e, t) + 2;
  return _`
    <defs>
      <mask id=${i} maskUnits="userSpaceOnUse" x=${-r} y=${-r} width=${o + 2 * r} height=${s + 2 * r}>
        <rect x=${-r} y=${-r} width=${o + 2 * r} height=${s + 2 * r} fill="white"></rect>
        ${e.openings.map(
    (l) => _`<rect x=${l.x - l.length / 2} y=${l.y - a / 2} width=${l.length} height=${a}
                           fill="black" transform="rotate(${l.angle} ${l.x} ${l.y})"></rect>`
  )}
      </mask>
    </defs>
    <g class="walls" mask="url(#${i})">
      ${e.walls.map(
    (l) => _`<line class="wall ${n.selectedId === l.id ? "selected" : ""}" data-id=${l.id}
                         x1=${l.x1} y1=${l.y1} x2=${l.x2} y2=${l.y2}
                         stroke-width=${bi(l, t)}></line>`
  )}
    </g>`;
}
function ts(e, t, i, n) {
  const o = t * n < 0 ? 0 : 1;
  return _`
    <path class="swing" d="M ${e} ${n * i} A ${i} ${i} 0 0 ${o} ${e - t * i} 0"></path>
    <line class="leaf" x1=${e} y1="0" x2=${e} y2=${n * i}></line>`;
}
function pc(e, t, i, n) {
  const o = t, s = n?.states[e.entity], r = nc(s), a = s?.state === "opening" || s?.state === "closing", l = e.side === "in" ? 1 : -1, c = Math.max(i * 0.8, 8), h = l * i / 2, d = l > 0 ? h : h - c, p = (r ?? 0) * c, m = l > 0 ? h : h - p, g = [];
  for (let b = 3; b < p; b += 3) g.push(h + l * b);
  return _`
    <g class="shutter ${e.side} ${a ? "moving" : ""} ${r === void 0 ? "unknown" : ""}" style="--fp-shutter:${e.color || dr}">
      <rect class="shutter-track" x=${-o / 2} y=${d} width=${o} height=${c}></rect>
      ${p > 0 ? _`<rect class="shutter-fill" x=${-o / 2} y=${m} width=${o} height=${p}></rect>` : f}
      ${g.map((b) => _`<line class="shutter-slat" x1=${-o / 2} y1=${b} x2=${o / 2} y2=${b}></line>`)}
    </g>`;
}
function uc(e, t) {
  if (!e.lockEntity) return f;
  const i = ac(t?.states[e.lockEntity]), o = -(e.hinge === "right" ? 1 : -1) * (e.length / 2 - 9);
  return _`
    <g class="lock ${i}" transform="translate(${o} 0)">
      <circle r="6.5"></circle>
      <path class="shackle" d=${i === "locked" ? "M -2.4 -1 V -3 a 2.4 2.4 0 0 1 4.8 0 V -1" : "M -2.4 -1 V -3 a 2.4 2.4 0 0 1 4.8 0 V -2.4"}></path>
      <rect x="-3.4" y="-1" width="6.8" height="5" rx="1"></rect>
    </g>`;
}
function Mr(e, t, i = {}) {
  const n = e.length, o = `--fp-open:${e.openColor || cr}`, s = e.hinge === "right" ? 1 : -1, r = e.swing === "out" ? -1 : 1;
  if (e.type === "window") {
    const h = t - 2, d = An(e).map((g) => {
      const b = Sr(g.entity, i.hass);
      return { seg: g, open: !!i.forceOpen || b.open, unknown: b.unknown };
    }), p = Math.max(...d.filter((g) => g.open).map((g) => g.seg.x1 - g.seg.x0), 0), m = `opening window ${i.selected ? "selected" : ""} ${i.warn ? "warn" : ""}`;
    return _`
      <g class=${m} data-id=${e.id} transform="translate(${e.x} ${e.y}) rotate(${e.angle})" style=${o}>
        <rect class="hit" x=${-n / 2} y=${r < 0 ? -p : -h / 2} width=${n} height=${p + h}></rect>
        ${(e.shutters ?? []).map((g) => pc(g, n, t, i.hass))}
        ${d.map(({ seg: g, open: b, unknown: v }) => {
      const x = g.x1 - g.x0, $ = g.hinge === "right" ? g.x1 : g.x0, y = g.hinge === "right" ? 1 : -1;
      return _`
            <g class="seg ${b ? "open" : ""} ${v ? "unknown" : ""} ${i.leafIndex === g.index ? "sel" : ""}">
              <rect class="frame" x=${g.x0} y=${-h / 2} width=${x} height=${h}></rect>
              ${b ? ts($, y, x, r) : _`<line class="glass" x1=${g.x0} y1=${-h / 6} x2=${g.x1} y2=${-h / 6}></line>
                      <line class="glass" x1=${g.x0} y1=${h / 6} x2=${g.x1} y2=${h / 6}></line>`}
            </g>`;
    })}
      </g>`;
  }
  const a = rc(e, i.hass), l = !!i.forceOpen || !e.entity || a.open, c = `opening door ${l ? "open" : ""} ${a.unknown ? "unknown" : ""} ${i.selected ? "selected" : ""}`;
  return _`
    <g class=${c} data-id=${e.id} transform="translate(${e.x} ${e.y}) rotate(${e.angle})" style=${o}>
      <rect class="hit" x=${-n / 2} y=${r > 0 ? -t / 2 : -n} width=${n} height=${n + t / 2}></rect>
      ${l ? ts(s * n / 2, s, n, r) : _`<rect class="frame" x=${-n / 2} y=${-(t - 2) / 2} width=${n} height=${t - 2}></rect>
              <line class="leaf closed" x1=${-n / 2} y1="0" x2=${n / 2} y2="0"></line>`}
      ${uc(e, i.hass)}
    </g>`;
}
function fc(e, t, i = {}) {
  const n = ht(e, t) + 2;
  return _`<g class="openings">${e.openings.map(
    (o) => Mr(o, n, { hass: i.hass, selected: i.selectedId === o.id })
  )}</g>`;
}
const Cr = `
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
var mc = Object.defineProperty, gc = Object.getOwnPropertyDescriptor, F = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? gc(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && mc(t, i, o), o;
};
const Yt = "floorplan_panel", yc = 100, on = [1, 5, 10, 25, 50], xe = 12, sn = 14, is = 7, Oe = { wall: "walls", opening: "openings", area: "areas", item: "items" };
let $t, Jt = 0;
const ns = [
  { id: "select", icon: "mdi:cursor-default-outline", label: "Auswahl", hint: "Raum oder Wand anklicken: der erste Klick wählt den ganzen Raum (ziehen verschiebt ihn samt Wänden, Griffe an Ecken und Kanten ändern die Größe), ein weiterer Klick auf eine Wand wählt nur die Wand. Leere Fläche ziehen verschiebt die Ansicht, Mausrad zoomt. Umschalt-/Strg-Klick wählt mehrere, Rechtsklick oder langes Drücken öffnet das Menü." },
  { id: "marquee", icon: "mdi:select-drag", label: "Mehrfachauswahl", hint: "Rahmen aufziehen, um mehrere Elemente zu wählen (Umschalt: zur Auswahl hinzufügen). Danach ziehen, duplizieren, kopieren oder als Vorlage speichern." },
  { id: "wall", icon: "mdi:wall", label: "Wand", hint: "Klick setzt Anfang, weitere Klicks setzen Wandstücke. Esc oder Doppelklick beendet. Umschalt: freier Winkel, Alt: ohne Raster." },
  { id: "wallrect", icon: "mdi:square-outline", label: "Wände (Rechteck)", hint: "Von Ecke zu Ecke ziehen: legt nur die vier Wände an, ohne Raumfläche. Bestehende Wände werden mitgenutzt, nicht doppelt gezeichnet. Alt: ohne Fang, Esc bricht ab." },
  { id: "area", icon: "mdi:vector-polygon", label: "Raum", hint: "Ecken nacheinander anklicken, zum Schließen den ersten Punkt anklicken oder Enter drücken. Esc bricht ab." },
  { id: "rect", icon: "mdi:vector-rectangle", label: "Raum (Rechteck)", hint: "Von Ecke zu Ecke ziehen: legt Raumfläche und die vier Wände in einem Zug an. Alt: ohne Raster/Fang, Esc bricht ab." },
  { id: "door", icon: "mdi:door", label: "Tür", hint: "Auf eine Wand klicken, um dort eine Tür einzusetzen." },
  { id: "window", icon: "mdi:window-closed-variant", label: "Fenster", hint: "Auf eine Wand klicken, um dort ein Fenster einzusetzen." },
  { id: "furniture", icon: "mdi:sofa-outline", label: "Möbel", hint: "Vorlage rechts aus der Bibliothek wählen, dann auf den Plan klicken. Danach verschieben, drehen und skalieren. Neue Vorlagen baust du über „Möbel-Bibliothek“ oben." },
  { id: "item", icon: "mdi:map-marker-plus", label: "Icon", hint: "Klick platziert ein freies Icon – Icon und Entität danach rechts wählen." }
], bc = [
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
], nt = ["#4f8bd6", "#e0a030", "#3fb5a8", "#8e6cc9", "#d65f5f", "#6aa84f", "#9e9e9e"];
let z = class extends te {
  constructor() {
    super(...arguments), this.revision = 0, this.narrow = !1, this._tool = "select", this._furnMode = !1, this._multi = [], this._guides = [], this._lastGuides = [], this._view = { x: 0, y: 0, w: 1e3, h: 700 }, this._roomPoints = [], this._dirty = !1, this._saving = !1, this._conflict = !1, this._svgSize = { w: 1, h: 1 }, this._undo = [], this._redo = [], this._baseRevision = 0, this._keyHandler = (e) => this._onKey(e);
  }
  // ---------------------------------------------------------------- Lebenszyklus
  willUpdate(e) {
    e.has("_sel") && this._multi.length && !this._multi.some((t) => t.kind === this._sel?.kind && t.id === this._sel?.id) && (this._multi = []), e.has("plan") && !this._draft && (this._draft = xn(structuredClone(this.plan)), this._baseRevision = this.revision, this._floorId = this.floorId && this._draft.floors.some((t) => t.id === this.floorId) ? this.floorId : this._draft.floors[0]?.id, this._floorId || (this._draft.floors.push({ id: "eg", name: "Wohnung", walls: [], openings: [], areas: [], items: [] }), this._floorId = "eg"), this._fitView(), this.initialAreaId && this._floor.areas.some((t) => t.id === this.initialAreaId) && (this._sel = { kind: "area", id: this.initialAreaId }));
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._keyHandler);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("keydown", this._keyHandler), this._ro?.disconnect();
  }
  firstUpdated() {
    this._ro = new ResizeObserver(() => {
      const e = this._svg?.getBoundingClientRect();
      e && e.width && e.height && (this._svgSize = { w: e.width, h: e.height });
    }), this._svg && this._ro.observe(this._svg);
  }
  get _floor() {
    return this._draft.floors.find((e) => e.id === this._floorId);
  }
  /** Planeinheiten pro Bildschirmpixel (für Griffe, Fangradius, Icons). */
  get _upp() {
    return Math.max(this._view.w / this._svgSize.w, this._view.h / this._svgSize.h);
  }
  _fitView() {
    const e = Sn(this._floor, this._draft), t = Math.max(e.w, e.h) * 0.1;
    this._view = { x: e.x - t, y: e.y - t, w: e.w + 2 * t, h: e.h + 2 * t };
  }
  // ---------------------------------------------------------------- Änderungen & Undo
  _snapshot() {
    return JSON.stringify({ plan: this._draft, floorId: this._floorId });
  }
  _pushUndo(e) {
    this._undo.push(e), this._undo.length > yc && this._undo.shift(), this._redo = [], this._dirty = !0;
  }
  /** Führt eine Änderung am Entwurf aus und legt vorher einen Undo-Schritt an. */
  _mutate(e) {
    this._pushUndo(this._snapshot()), e(this._floor, this._draft), this._draft = { ...this._draft };
  }
  _restore(e) {
    const { plan: t, floorId: i } = JSON.parse(e);
    if (this._draft = t, this._floorId = i, this._sel && !this._findSelected() && (this._sel = void 0), this._multi.length) {
      const n = this._multi.filter((o) => this._elementOf(o));
      this._setGroup(n);
    }
  }
  _doUndo() {
    const e = this._undo.pop();
    e && (this._redo.push(this._snapshot()), this._restore(e), this._dirty = !0);
  }
  _doRedo() {
    const e = this._redo.pop();
    e && (this._undo.push(this._snapshot()), this._restore(e), this._dirty = !0);
  }
  _findSelected() {
    if (this._sel)
      return this._collection(this._sel.kind).find((e) => e.id === this._sel.id);
  }
  _collection(e) {
    const t = this._floor;
    return e === "wall" ? t.walls : e === "opening" ? t.openings : e === "area" ? t.areas : t.items;
  }
  /** Fenster ohne Fensterkontakt auf allen Etagen (Pflichtfeld, nur Warnung). */
  get _windowsWithoutContact() {
    return this._draft.floors.flatMap(
      (e) => e.openings.filter(nn).map((t) => ({ floorId: e.id, opening: t }))
    );
  }
  _selectOpening(e, t) {
    this._floorId = e, this._sel = { kind: "opening", id: t }, this._tool = "select";
  }
  _deleteSelected() {
    const e = this._group;
    e.length && (this._mutate((t) => {
      for (const i of Object.keys(Oe)) {
        const n = new Set(e.filter((o) => o.kind === i).map((o) => o.id));
        n.size && (t[Oe[i]] = t[Oe[i]].filter((o) => !n.has(o.id)));
      }
    }), this._sel = void 0);
  }
  // ---------------------------------------------------------------- Mehrfachauswahl, Kopieren, Vorlagen
  get _group() {
    return this._multi.length > 1 ? this._multi : this._sel ? [this._sel] : [];
  }
  _elementOf(e) {
    return this._collection(e.kind).find((t) => t.id === e.id);
  }
  _inGroup(e, t) {
    return this._group.some((i) => i.kind === e && i.id === t);
  }
  _setGroup(e) {
    e.length > 1 ? (this._multi = e, this._sel = e[e.length - 1]) : (this._multi = [], this._sel = e[0]);
  }
  _toggleMulti(e, t) {
    const i = this._group, n = this._inGroup(e, t) ? i.filter((o) => !(o.kind === e && o.id === t)) : [...i, { kind: e, id: t }];
    this._setGroup(n);
  }
  _bbox(e) {
    const t = this._elementOf(e);
    if (!t) return;
    let i, n;
    if (e.kind === "wall")
      i = [t.x1, t.x2], n = [t.y1, t.y2];
    else if (e.kind === "area")
      i = t.points.map((r) => r.x), n = t.points.map((r) => r.y);
    else {
      const r = e.kind === "opening" ? t.length / 2 : sn * this._upp;
      i = [t.x - r, t.x + r], n = [t.y - r, t.y + r];
    }
    const o = Math.min(...i), s = Math.min(...n);
    return { x: o, y: s, w: Math.max(...i) - o, h: Math.max(...n) - s };
  }
  _selectInRect(e, t, i) {
    const n = Math.min(e.x, t.x), o = Math.max(e.x, t.x), s = Math.min(e.y, t.y), r = Math.max(e.y, t.y), a = i ? [...this._group] : [];
    for (const l of Object.keys(Oe))
      for (const c of this._collection(l)) {
        const h = this._bbox({ kind: l, id: c.id });
        !h || h.x > o || h.x + h.w < n || h.y > r || h.y + h.h < s || a.some((d) => d.kind === l && d.id === c.id) || a.push({ kind: l, id: c.id });
      }
    this._setGroup(a);
  }
  _shiftElement(e, t, i, n, o) {
    e === "wall" ? Object.assign(t, { x1: i.x1 + n, y1: i.y1 + o, x2: i.x2 + n, y2: i.y2 + o }) : e === "area" ? t.points = i.points.map((s) => ({ x: s.x + n, y: s.y + o })) : Object.assign(t, { x: i.x + n, y: i.y + o });
  }
  get _gap() {
    return Math.max(this._draft.settings.grid, 10) * 2;
  }
  _groupClip() {
    const e = { walls: [], openings: [], areas: [], items: [] };
    for (const t of this._group) {
      const i = this._elementOf(t);
      i && e[Oe[t.kind]].push(structuredClone(i));
    }
    return e;
  }
  _clipBounds(e) {
    const t = [], i = [];
    for (const s of e.walls) t.push(s.x1, s.x2), i.push(s.y1, s.y2);
    for (const s of e.openings) t.push(s.x), i.push(s.y);
    for (const s of e.areas) for (const r of s.points) t.push(r.x), i.push(r.y);
    for (const s of e.items) t.push(s.x), i.push(s.y);
    if (!t.length) return;
    const n = Math.min(...t), o = Math.min(...i);
    return { x: n, y: o, w: Math.max(...t) - n, h: Math.max(...i) - o };
  }
  /** Fügt eine Kopie des Inhalts mit neuen IDs um (dx, dy) verschoben auf der aktuellen Etage ein. */
  _insertClip(e, t, i, n) {
    const o = [], s = /* @__PURE__ */ new Map();
    return this._mutate((r) => {
      for (const a of e.walls) {
        const l = structuredClone(a);
        Object.assign(l, { id: U("w"), x1: a.x1 + t, y1: a.y1 + i, x2: a.x2 + t, y2: a.y2 + i }), r.walls.push(l), o.push({ kind: "wall", id: l.id });
      }
      for (const a of e.openings) {
        const l = structuredClone(a);
        Object.assign(l, { id: U(a.type === "door" ? "t" : "f"), x: a.x + t, y: a.y + i }), r.openings.push(l), o.push({ kind: "opening", id: l.id });
      }
      for (const a of e.areas) {
        const l = structuredClone(a);
        l.id = U("r"), l.points = a.points.map((c) => ({ x: c.x + t, y: c.y + i })), n && l.name && (l.name = `${l.name} (Kopie)`), s.set(a.id, l.id), r.areas.push(l), o.push({ kind: "area", id: l.id });
      }
      for (const a of e.items) {
        const l = structuredClone(a);
        Object.assign(l, { id: U("i"), x: a.x + t, y: a.y + i }), l.area && s.has(l.area) && (l.area = s.get(l.area)), r.items.push(l), o.push({ kind: "item", id: l.id });
      }
    }), o;
  }
  _duplicate() {
    const e = this._groupClip();
    this._clipBounds(e) && (this._setGroup(this._insertClip(e, this._gap, this._gap, !0)), this._menu = void 0);
  }
  _copy() {
    const e = this._groupClip();
    this._clipBounds(e) && ($t = e, Jt = 0, this._menu = void 0);
  }
  _paste() {
    $t && (Jt++, this._setGroup(this._insertClip($t, this._gap * Jt, this._gap * Jt, !0)), this._menu = void 0);
  }
  _saveTemplate() {
    const e = this._groupClip();
    if (!this._clipBounds(e)) return;
    if ((this._draft.settings.templates?.length ?? 0) >= Uo) {
      this._error = `Es sind höchstens ${Uo} Vorlagen möglich.`;
      return;
    }
    const t = prompt("Name der Vorlage", "Vorlage " + ((this._draft.settings.templates?.length ?? 0) + 1))?.trim();
    t && this._mutate((i, n) => {
      (n.settings.templates ??= []).push({ id: U("v"), name: t, ...e });
    });
  }
  _insertTemplate(e) {
    const t = this._clipBounds(e);
    if (!t) return;
    const i = this._draft.settings.grid, n = pe(this._view.x + this._view.w / 2 - (t.x + t.w / 2), i), o = pe(this._view.y + this._view.h / 2 - (t.y + t.h / 2), i);
    this._setGroup(this._insertClip(e, n, o, !1));
  }
  _deleteTemplate(e) {
    this._mutate((t, i) => {
      i.settings.templates = (i.settings.templates ?? []).filter((n) => n.id !== e), i.settings.templates.length || delete i.settings.templates;
    });
  }
  _openMenu(e, t, i) {
    if (this._tool !== "select" || (i && i.kind !== "handle" && !this._inGroup(i.kind, i.id) && this._setGroup([{ kind: i.kind, id: i.id }]), !this._group.length && !$t)) return;
    const n = this.renderRoot.querySelector(".canvas-wrap")?.getBoundingClientRect();
    n && (this._menu = { x: e - n.left, y: t - n.top });
  }
  /** Ändert ein Feld der Auswahl; leere Werte entfernen das Feld. */
  _setProp(e, t) {
    this._sel && this._mutate(() => {
      const n = this._findSelected();
      n && (t === "" || t === void 0 || t === null || typeof t == "number" && Number.isNaN(t) ? delete n[e] : n[e] = t);
    });
  }
  // ---------------------------------------------------------------- Speichern
  async _save(e = !1) {
    this._saving = !0, this._error = void 0;
    try {
      const t = await this.hass.callWS({
        type: `${Yt}/plan/save`,
        plan: this._draft,
        revision: e ? null : this._baseRevision
      });
      this._conflict = !1, this._dirty = !1, this._baseRevision = t.revision, this.dispatchEvent(new CustomEvent("editor-done", { detail: { plan: t.plan, revision: t.revision } }));
    } catch (t) {
      t?.code === "conflict" && (this._conflict = !0), this._error = t?.message ?? String(t);
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
        const e = await this.hass.callWS({ type: `${Yt}/plan/load_sample` });
        this._acceptServerPlan(e.plan, e.revision);
      } catch (e) {
        this._error = e?.message ?? String(e);
      }
  }
  _acceptServerPlan(e, t) {
    this._draft = xn(e), this._baseRevision = t, this._floorId = this._draft.floors[0].id, this._undo = [], this._redo = [], this._dirty = !1, this._sel = void 0, this._history = void 0, this._fitView();
  }
  async _loadHistory() {
    const e = await this.hass.callWS({ type: `${Yt}/history/list` });
    this._history = e.items;
  }
  async _restoreHistory(e) {
    if (!confirm("Diesen Stand wiederherstellen? Der aktuelle gespeicherte Stand bleibt im Verlauf.")) return;
    const t = await this.hass.callWS({ type: `${Yt}/history/restore`, history_id: e });
    this._acceptServerPlan(t.plan, t.revision);
  }
  // ---------------------------------------------------------------- Zeiger
  _toPlan(e) {
    const t = this._svg.getScreenCTM();
    if (!t) return { x: 0, y: 0 };
    const i = new DOMPoint(e.clientX, e.clientY).matrixTransform(t.inverse());
    return { x: i.x, y: i.y };
  }
  /** Raster + Endpunktfang (Alt schaltet beides ab). */
  _snap(e, t, i = [], n = []) {
    if (t.altKey) return e;
    const o = Bl(e, this._floor.walls, xe * this._upp, i);
    if (o) return { ...o };
    const s = Gl(e, this._floor.areas, xe * this._upp, n);
    if (s) return s;
    if (this._tool !== "item") {
      const c = Vl(e, this._floor.walls, xe * this._upp, i);
      if (c) return c;
    }
    const r = [];
    for (const c of this._floor.walls)
      i.includes(c) || r.push({ x: c.x1, y: c.y1 }, { x: c.x2, y: c.y2 });
    for (const c of this._floor.areas) for (const h of c.points) n.includes(h) || r.push(h);
    const a = _r(e, r, xe * this._upp);
    this._lastGuides = a.guides;
    const l = this._draft.settings.grid;
    return { x: a.x ?? pe(e.x, l), y: a.y ?? pe(e.y, l) };
  }
  _setGuides(e) {
    JSON.stringify(e) !== JSON.stringify(this._guides) && (this._guides = e);
  }
  _hit(e) {
    for (const t of e.composedPath()) {
      if (!(t instanceof Element)) continue;
      if (t === this._svg) break;
      const i = t.getAttribute("data-handle");
      if (i) return { kind: "handle", id: t.getAttribute("data-owner") ?? "", handle: i };
      const n = t.getAttribute("data-kind"), o = t.getAttribute("data-id");
      if (n && o) return { kind: n, id: o };
    }
  }
  _onPointerDown(e) {
    if (e.button === 2) return;
    this._menu = void 0;
    const t = this._toPlan(e), i = this._snapshot(), n = { pointerId: e.pointerId, start: t, screenStart: { x: e.clientX, y: e.clientY }, before: i, moved: !1 };
    if (e.button === 1) {
      this._drag = { ...n, mode: "pan", viewStart: { ...this._view } }, this._svg.setPointerCapture(e.pointerId), e.preventDefault();
      return;
    }
    switch (this._tool) {
      case "marquee": {
        this._drag = { ...n, mode: "marquee", add: e.shiftKey }, this._marquee = { a: t, b: t }, this._svg.setPointerCapture(e.pointerId);
        break;
      }
      case "select": {
        const o = this._hit(e);
        if (e.pointerType !== "mouse") {
          const a = e.clientX, l = e.clientY;
          window.clearTimeout(this._lpTimer), this._lpTimer = window.setTimeout(() => {
            this._lpTimer = void 0;
            const c = this._drag;
            !c || c.moved || (this._svg.hasPointerCapture(c.pointerId) && this._svg.releasePointerCapture(c.pointerId), this._drag = void 0, this._openMenu(a, l, o));
          }, 550);
        }
        const s = e.shiftKey || e.ctrlKey || e.metaKey, r = this._wallRoomPts();
        if (o?.kind === "handle" && r && !this._sel) {
          const a = Number(o.handle.slice(1)), l = r.length;
          this._drag = { ...n, mode: "handle", wr: !0, handle: o.handle }, this._drag.edge = o.handle.startsWith("e") ? this._edgeSetup(r[a], r[(a + 1) % l]) : { n: { x: 0, y: 0 }, pts: this._movers((c) => N(c, r[a]) < 0.5) }, this._svg.setPointerCapture(e.pointerId);
          break;
        }
        if (o?.kind === "wall" && !s) {
          const a = this._floor.walls.find((h) => h.id === o.id), l = this._wallRoom?.walls.some((h) => h.id === o.id), c = a && !l && !qo(a, this._floor.areas).length ? this._findLoop(a) : void 0;
          if (c) {
            this._wallRoom = { walls: c }, this._sel = void 0, this._setGroup([]);
            const h = this._wallRoomPts();
            this._drag = { ...n, mode: "group", origs: this._wallRoomGroup(h).map((d) => ({ sel: d, orig: structuredClone(this._elementOf(d)) })) }, this._svg.setPointerCapture(e.pointerId);
            break;
          }
        }
        if (this._wallRoom = void 0, o && o.kind !== "handle" && s) {
          this._toggleMulti(o.kind, o.id);
          break;
        }
        if (!o && e.shiftKey) {
          this._drag = { ...n, mode: "marquee", add: !0 }, this._marquee = { a: t, b: t }, this._svg.setPointerCapture(e.pointerId);
          break;
        }
        if (o && o.kind !== "handle" && this._multi.length > 1 && this._inGroup(o.kind, o.id)) {
          this._drag = { ...n, mode: "group", origs: this._multi.map((a) => ({ sel: a, orig: structuredClone(this._elementOf(a)) })) }, this._svg.setPointerCapture(e.pointerId);
          break;
        }
        if (o?.kind === "handle" && this._sel) {
          const a = this._findSelected();
          if (this._drag = { ...n, mode: "handle", sel: this._sel, handle: o.handle, orig: structuredClone(a) }, this._sel.kind === "wall" && a) {
            const l = o.handle === "p1" ? 1 : 2;
            this._drag.links = [this._linksAt(a, l)];
          } else if (this._sel.kind === "area" && a && o.handle?.startsWith("e"))
            this._drag.edge = this._edgeSetup(a.points[Number(o.handle.slice(1))], a.points[(Number(o.handle.slice(1)) + 1) % a.points.length]);
          else if (this._sel.kind === "area" && a && o.handle?.startsWith("v")) {
            const l = a.points[Number(o.handle.slice(1))];
            this._drag.links = [this._linksAt(void 0, 0, l, a)];
          }
        } else if (o && o.kind !== "handle" && this._roomTarget(o)) {
          const a = this._roomTarget(o);
          this._sel = { kind: "area", id: a.id }, this._drag = { ...n, mode: "group", origs: this._roomGroup(a).map((l) => ({ sel: l, orig: structuredClone(this._elementOf(l)) })) };
        } else if (o && o.kind !== "handle") {
          if (this._sel = { kind: o.kind, id: o.id }, this._drag = { ...n, mode: "move", sel: this._sel, orig: structuredClone(this._findSelected()) }, o.kind === "wall") {
            const a = this._findSelected();
            this._drag.links = [this._linksAt(a, 1), this._linksAt(a, 2)];
          }
        } else
          this._sel = void 0, this._drag = { ...n, mode: "pan", viewStart: { ...this._view } };
        this._svg.setPointerCapture(e.pointerId);
        break;
      }
      case "wall": {
        const o = this._snap(t, e);
        if (!this._chainStart)
          this._chainStart = o;
        else {
          const s = e.shiftKey ? o : tn(this._chainStart, o);
          if (N(s, this._chainStart) > 1) {
            const r = this._chainStart;
            this._mutate((a) => this._addWalls(a, r, s)), this._chainStart = s;
          }
        }
        break;
      }
      case "area": {
        const o = this._snap(t, e);
        this._roomPoints.length >= 3 && N(o, this._roomPoints[0]) <= xe * this._upp ? this._finishRoom() : this._roomPoints = [...this._roomPoints, o];
        break;
      }
      case "wallrect":
      case "rect": {
        this._drag = { ...n, mode: "rect", start: this._snap(t, e) }, this._svg.setPointerCapture(e.pointerId);
        break;
      }
      case "door":
      case "window":
        this._placeOpening(this._tool, t, e);
        break;
      case "furniture": {
        const o = ke(this._draft.furniture, this._placeType);
        if (!o) break;
        const s = this._snap(t, e), r = U("i");
        this._mutate((a) => a.items.push({ id: r, x: s.x, y: s.y, furnitureType: o.id, tapAction: "auto" })), this._sel = { kind: "item", id: r }, this._tool = "select";
        break;
      }
      case "item": {
        const o = this._snap(t, e), s = U("i");
        this._mutate((r) => r.items.push({ id: s, x: o.x, y: o.y, icon: "mdi:lightbulb", tapAction: "auto" })), this._sel = { kind: "item", id: s }, this._tool = "select";
        break;
      }
    }
  }
  _onPointerMove(e) {
    this._lastGuides = [], this._onPointerMoveInner(e), !this._drag && this._cursor && ["wall", "rect", "wallrect", "area", "item", "furniture"].includes(this._tool) && this._snap(this._cursor, e), this._setGuides(this._lastGuides);
  }
  _onPointerMoveInner(e) {
    const t = this._toPlan(e);
    this._cursor = t;
    const i = this._drag;
    if (!i || i.pointerId !== e.pointerId) return;
    const n = e.clientX - i.screenStart.x, o = e.clientY - i.screenStart.y;
    if (!i.moved && Math.hypot(n, o) < 3) return;
    if (i.moved = !0, window.clearTimeout(this._lpTimer), i.mode === "marquee") {
      this._marquee = { a: i.start, b: t };
      return;
    }
    if (i.mode === "group" && i.origs) {
      const h = e.altKey ? 0 : this._draft.settings.grid, d = pe(t.x - i.start.x, h), p = pe(t.y - i.start.y, h);
      for (const { sel: m, orig: g } of i.origs) {
        const b = this._elementOf(m);
        b && this._shiftElement(m.kind, b, g, d, p);
      }
      this._draft = { ...this._draft };
      return;
    }
    if (i.mode === "pan" && i.viewStart) {
      const h = this._upp;
      this._view = { ...i.viewStart, x: i.viewStart.x - n * h, y: i.viewStart.y - o * h };
      return;
    }
    if (i.mode === "handle" && i.wr && i.handle && i.edge) {
      const { n: h, pts: d } = i.edge;
      if (i.handle.startsWith("e")) {
        const p = e.altKey ? 0 : this._draft.settings.grid, m = pe((t.x - i.start.x) * h.x + (t.y - i.start.y) * h.y, p);
        for (const g of d) g.set(g.x + h.x * m, g.y + h.y * m);
      } else {
        const p = this._snap(t, e, d.flatMap((m) => m.wall ? [m.wall] : []), d.flatMap((m) => m.vert ? [m.vert] : []));
        for (const m of d) m.set(p.x, p.y);
      }
      this._draft = { ...this._draft };
      return;
    }
    const s = this._findSelected();
    if (!s || !i.sel) return;
    const r = e.altKey ? 0 : this._draft.settings.grid, a = pe(t.x - i.start.x, r), l = pe(t.y - i.start.y, r), c = i.orig;
    if (i.mode === "move")
      switch (i.sel.kind) {
        case "wall":
          Object.assign(s, { x1: c.x1 + a, y1: c.y1 + l, x2: c.x2 + a, y2: c.y2 + l });
          for (const h of i.links ?? []) this._applyLink(h, h.end === 1 ? { x: c.x1 + a, y: c.y1 + l } : { x: c.x2 + a, y: c.y2 + l });
          break;
        case "area":
          s.points = c.points.map((h) => ({ x: h.x + a, y: h.y + l }));
          break;
        case "item":
          Object.assign(s, { x: c.x + a, y: c.y + l });
          break;
        case "opening": {
          const h = { x: c.x + (t.x - i.start.x), y: c.y + (t.y - i.start.y) }, d = en(h, this._floor.walls, ht(this._floor, this._draft) * 2 + xe * this._upp);
          d && !e.altKey ? Object.assign(s, { x: fe(d.point.x), y: fe(d.point.y), angle: ss(c.angle, d.angle) }) : Object.assign(s, { x: c.x + a, y: c.y + l });
          break;
        }
      }
    else if (i.mode === "handle" && i.handle) {
      if (i.sel.kind === "wall") {
        const h = i.handle === "p1" ? 1 : 2, d = h === 1 ? { x: c.x2, y: c.y2 } : { x: c.x1, y: c.y1 }, p = i.links?.[0];
        let m = this._snap(t, e, [s, ...(p?.walls ?? []).map((g) => g.wall)], p?.verts ?? []);
        !e.shiftKey && !e.altKey && (m = tn(d, m)), s[`x${h}`] = m.x, s[`y${h}`] = m.y, p && this._applyLink(p, m);
      } else if (i.sel.kind === "area" && i.handle.startsWith("e") && i.edge) {
        const { n: h, pts: d } = i.edge, p = e.altKey ? 0 : this._draft.settings.grid, m = pe((t.x - i.start.x) * h.x + (t.y - i.start.y) * h.y, p);
        for (const g of d) g.set(g.x + h.x * m, g.y + h.y * m);
      } else if (i.sel.kind === "area" && i.handle.startsWith("v")) {
        const h = s.points[Number(i.handle.slice(1))], d = i.links?.[0], p = this._snap(t, e, d?.walls.map((m) => m.wall) ?? [], [h, ...d?.verts ?? []]);
        Object.assign(h, p), d && this._applyLink(d, p);
      }
    }
    this._draft = { ...this._draft };
  }
  _onPointerUp(e) {
    window.clearTimeout(this._lpTimer), this._setGuides([]);
    const t = this._drag;
    if (!(!t || t.pointerId !== e.pointerId)) {
      if (this._drag = void 0, this._svg.hasPointerCapture(e.pointerId) && this._svg.releasePointerCapture(e.pointerId), t.mode === "marquee") {
        const i = this._marquee;
        this._marquee = void 0, i && t.moved && (this._selectInRect(i.a, i.b, !!t.add), this._tool = "select");
        return;
      }
      if (t.mode === "rect") {
        this._finishRect(t.start, this._snap(this._toPlan(e), e));
        return;
      }
      t.moved && t.mode !== "pan" && this._pushUndo(t.before);
    }
  }
  _onDblClick(e) {
    if (this._tool === "wall") {
      this._chainStart = void 0;
      return;
    }
    if (this._tool === "area" && this._roomPoints.length >= 3) {
      this._finishRoom();
      return;
    }
    if (this._tool !== "select" || this._sel?.kind !== "area") return;
    const t = this._findSelected(), i = this._hit(e);
    if (i?.kind === "handle" && i.handle?.startsWith("v")) {
      if (t.points.length <= 3) return;
      const s = Number(i.handle.slice(1));
      this._mutate(() => t.points.splice(s, 1));
      return;
    }
    const n = this._toPlan(e);
    let o = { i: -1, d: xe * this._upp, pt: n };
    if (t.points.forEach((s, r) => {
      const a = t.points[(r + 1) % t.points.length], { point: l } = He(n, s, a), c = N(n, l);
      c < o.d && (o = { i: r, d: c, pt: l });
    }), o.i >= 0) {
      const s = this._snap(o.pt, e);
      this._mutate(() => t.points.splice(o.i + 1, 0, s));
    }
  }
  _onWheel(e) {
    e.preventDefault();
    const t = this._toPlan(e), i = Math.exp(e.deltaY * 15e-4), { width: n, height: o } = this._draft.canvas, s = Math.max(n, o) * 8, r = Math.min(s, Math.max(50, this._view.w * i)), a = r / this._view.w;
    this._view = {
      x: t.x - (t.x - this._view.x) * a,
      y: t.y - (t.y - this._view.y) * a,
      w: r,
      h: this._view.h * a
    };
  }
  _onKey(e) {
    const t = e.composedPath()[0], i = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT");
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" && !i) {
      e.preventDefault(), e.shiftKey ? this._doRedo() : this._doUndo();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y" && !i) {
      e.preventDefault(), this._doRedo();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && !i && ["c", "v", "d"].includes(e.key.toLowerCase())) {
      e.preventDefault();
      const n = e.key.toLowerCase();
      n === "c" ? this._copy() : n === "v" ? this._paste() : this._duplicate();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
      e.preventDefault(), this._dirty && !this._saving && this._save();
      return;
    }
    i || (e.key === "Escape" ? this._drag?.mode === "rect" ? (this._svg.hasPointerCapture(this._drag.pointerId) && this._svg.releasePointerCapture(this._drag.pointerId), this._drag = void 0) : this._chainStart ? this._chainStart = void 0 : this._roomPoints.length ? this._roomPoints = [] : this._menu ? this._menu = void 0 : this._tool !== "select" ? this._tool = "select" : this._sel = void 0 : e.key === "Enter" && this._tool === "area" && this._roomPoints.length >= 3 ? this._finishRoom() : (e.key === "Delete" || e.key === "Backspace") && !this._sel && this._wallRoomPts() ? (e.preventDefault(), this._deleteWallRoom()) : (e.key === "Delete" || e.key === "Backspace") && this._group.length && (e.preventDefault(), this._deleteSelected()));
  }
  /** Wand-Endpunkte und Raumecken, die genau auf dem Punkt liegen (Endpunkt `end` von `wall` bzw. `pt` einer Raumecke). */
  _linksAt(e, t, i, n) {
    const o = i ?? (t === 1 ? { x: e.x1, y: e.y1 } : { x: e.x2, y: e.y2 }), s = [];
    for (const a of this._floor.walls)
      a !== e && (N(o, { x: a.x1, y: a.y1 }) < 0.5 && s.push({ wall: a, end: 1 }), N(o, { x: a.x2, y: a.y2 }) < 0.5 && s.push({ wall: a, end: 2 }));
    const r = [];
    for (const a of this._floor.areas)
      for (const l of a.points) l !== i && a !== n && N(o, l) < 0.5 && r.push(l);
    return { end: t, walls: s, verts: r };
  }
  _applyLink(e, t) {
    for (const i of e.walls)
      i.wall[`x${i.end}`] = t.x, i.wall[`y${i.end}`] = t.y;
    for (const i of e.verts) Object.assign(i, t);
  }
  _placeOpening(e, t, i) {
    const n = en(t, this._floor.walls, ht(this._floor, this._draft) + xe * 2 * this._upp), o = e === "door" ? 80 : 120, s = n ? { x: fe(n.point.x), y: fe(n.point.y) } : this._snap(t, i), r = U(e === "door" ? "t" : "f"), a = { id: r, type: e, x: s.x, y: s.y, length: o, angle: n ? ss(0, n.angle) : 0 };
    e === "door" && Object.assign(a, { hinge: "left", swing: "in" }), this._mutate((l) => l.openings.push(a)), this._sel = { kind: "opening", id: r };
  }
  _finishRoom() {
    const e = this._roomPoints;
    if (e.length < 3) return;
    const t = U("r"), i = this._floor.areas.length;
    this._mutate(
      (n) => n.areas.push({ id: t, name: `Raum ${i + 1}`, points: e, color: nt[i % nt.length], sidebar: [] })
    ), this._roomPoints = [], this._sel = { kind: "area", id: t }, this._tool = "select";
  }
  /** Teilt vorhandene Wände an a/b, legt nur noch nicht abgedeckte Wandstücke an. */
  _addWalls(e, t, i) {
    for (const n of [t, i])
      for (const o of [...e.walls]) {
        const s = He(n, { x: o.x1, y: o.y1 }, { x: o.x2, y: o.y2 });
        if (N(n, s.point) > 0.5 || N(n, { x: o.x1, y: o.y1 }) < 0.5 || N(n, { x: o.x2, y: o.y2 }) < 0.5) continue;
        const r = { ...o, id: U("w"), x1: n.x, y1: n.y };
        o.x2 = n.x, o.y2 = n.y, e.walls.push(r);
      }
    for (const [n, o] of Zl(t, i, e.walls)) e.walls.push({ id: U("w"), x1: n.x, y1: n.y, x2: o.x, y2: o.y });
  }
  _finishRect(e, t) {
    const i = Math.min(e.x, t.x), n = Math.max(e.x, t.x), o = Math.min(e.y, t.y), s = Math.max(e.y, t.y);
    if (n - i < 1 || s - o < 1) return;
    const r = [
      { x: i, y: o },
      { x: n, y: o },
      { x: n, y: s },
      { x: i, y: s }
    ], a = U("r"), l = this._floor.areas.length, c = this._tool === "wallrect";
    if (this._mutate((h) => {
      r.forEach((d, p) => this._addWalls(h, d, r[(p + 1) % 4])), c || h.areas.push({ id: a, name: `Raum ${l + 1}`, points: r, color: nt[l % nt.length], sidebar: [] });
    }), c) {
      this._tool = "select";
      return;
    }
    this._sel = { kind: "area", id: a }, this._tool = "select";
  }
  _onFurnitureChange(e) {
    e.stopPropagation(), this._pushUndo(this._snapshot()), this._draft = { ...this._draft, furniture: e.detail.furniture };
  }
  _closeFurniture() {
    this._furnMode = !1, this._furnOpen = void 0;
  }
  _editTemplate(e) {
    this._furnOpen = e, this._furnMode = !0;
  }
  _setTool(e) {
    this._tool = e, this._chainStart = void 0, this._roomPoints = [];
  }
  // ---------------------------------------------------------------- Darstellung
  render() {
    if (!this._draft) return f;
    const e = ns.find((t) => t.id === this._tool);
    return this._furnMode ? u`<fp-furniture-editor
        style="height:100%"
        .plan=${this._draft}
        .hass=${this.hass}
        .openId=${this._furnOpen}
        @furniture-change=${this._onFurnitureChange}
        @close-furniture=${this._closeFurniture}
        @edit-left=${() => this._furnOpen = void 0}
      ></fp-furniture-editor>` : u`
      <div class="toolbar">
        <button class="icon-btn" title="Schließen" @click=${this._close}><ha-icon icon="mdi:close"></ha-icon></button>
        <div class="main-title">Grundriss bearbeiten${this._dirty ? u`<span class="dirty"> • ungespeichert</span>` : f}</div>
        <button class="chip-top" title="Eigene Möbel-Vorlagen bauen und verwalten" @click=${() => (this._furnOpen = void 0, this._furnMode = !0)}>
          <ha-icon icon="mdi:sofa-outline"></ha-icon>Möbel-Bibliothek
        </button>
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
      const t = this._windowsWithoutContact[0];
      this._selectOpening(t.floorId, t.opening.id);
    }}
            >
              <ha-icon icon="mdi:alert"></ha-icon>${this._windowsWithoutContact.length} Fenster ohne Kontakt
            </button>` : f}
        <button class="save" ?disabled=${!this._dirty || this._saving} @click=${() => this._save()}>
          ${this._saving ? "Speichert …" : "Speichern"}
        </button>
      </div>
      ${this._error ? u`<div class="error-bar">
            ${this._conflict ? "Der Grundriss wurde inzwischen an anderer Stelle gespeichert." : this._error}
            ${this._conflict ? u`<button @click=${() => this._save(!0)}>Trotzdem überschreiben</button>` : f}
            <button @click=${() => this._error = void 0}>OK</button>
          </div>` : f}
      <div class="body">
        <div class="tools">
          ${ns.map(
      (t) => u`<button class="tool ${t.id === this._tool ? "active" : ""}" title=${t.label} @click=${() => this._setTool(t.id)}>
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
            @pointerleave=${() => this._cursor = void 0}
            @dblclick=${this._onDblClick}
            @wheel=${this._onWheel}
            @contextmenu=${(t) => {
      t.preventDefault(), this._chainStart = void 0, this._openMenu(t.clientX, t.clientY, this._hit(t));
    }}
          >
            ${this._renderCanvas()}
          </svg>
          ${this._menu ? u`<div class="ctx-menu" style="left:${this._menu.x}px;top:${this._menu.y}px">
                ${this._group.length ? u`<button @click=${this._duplicate}><ha-icon icon="mdi:content-duplicate"></ha-icon>Duplizieren</button>
                      <button @click=${this._copy}><ha-icon icon="mdi:content-copy"></ha-icon>Kopieren</button>` : f}
                ${$t ? u`<button @click=${this._paste}><ha-icon icon="mdi:content-paste"></ha-icon>Einfügen</button>` : f}
                ${this._group.length ? u`<button @click=${() => (this._menu = void 0, this._deleteSelected())}><ha-icon icon="mdi:delete-outline"></ha-icon>Löschen</button>` : f}
              </div>` : f}
          <div class="hint">${e.hint}</div>
        </div>
        <div class="props">${this._renderProps()}</div>
      </div>
    `;
  }
  _renderCanvas() {
    const e = this._draft, t = this._floor, { width: i, height: n } = e.canvas, o = this._upp, s = e.settings.grid, r = s * 10, a = ht(t, e) + 2, l = this._sel, c = this._view, [h, d, p, m] = [c.x - c.w, c.y - c.h, c.w * 3, c.h * 3];
    return _`
      <defs>
        <pattern id="grid-minor" width=${s} height=${s} patternUnits="userSpaceOnUse">
          <path d="M ${s} 0 L 0 0 0 ${s}" class="grid-minor"></path>
        </pattern>
        <pattern id="grid-major" width=${r} height=${r} patternUnits="userSpaceOnUse">
          <rect width=${r} height=${r} fill="url(#grid-minor)"></rect>
          <path d="M ${r} 0 L 0 0 0 ${r}" class="grid-major"></path>
        </pattern>
      </defs>
      <rect class="sheet" x=${h} y=${d} width=${p} height=${m}></rect>
      ${s * (1 / o) >= 4 ? _`<rect x=${h} y=${d} width=${p} height=${m} fill="url(#grid-major)" pointer-events="none"></rect>` : f}
      <g class="areas">
        ${t.areas.map(
      (g) => _`<g data-kind="area" data-id=${g.id}>${Er(g, {
        selected: l?.kind === "area" && l.id === g.id,
        labelSize: Math.max(i, n) / 45
      })}</g>`
    )}
      </g>
      ${Ar(t, e, "fp-editor-wall-mask", { selectedId: l?.kind === "wall" ? l.id : void 0 })}
      <g class="wall-hits">
        ${t.walls.map(
      (g) => _`<line data-kind="wall" data-id=${g.id} x1=${g.x1} y1=${g.y1} x2=${g.x2} y2=${g.y2}
                           stroke-width=${Math.max(bi(g, e), 10 * o)}></line>`
    )}
      </g>
      <g class="openings">
        ${t.openings.map(
      (g) => _`<g data-kind="opening" data-id=${g.id}>${Mr(g, a, { selected: l?.kind === "opening" && l.id === g.id, forceOpen: l?.kind === "opening" && l.id === g.id, warn: nn(g), leafIndex: l?.kind === "opening" && l.id === g.id ? this._leafSel ?? void 0 : void 0 })}</g>`
    )}
      </g>
      <g class="furniture-layer">${t.items.map((g) => this._renderFurniture(g))}</g>
      <g class="items">${t.items.map((g) => this._renderItem(g, o))}</g>
      ${this._renderSelectionOverlay(o)}
      ${this._renderDrawPreview(o)}
      ${this._renderGuides(o)}
    `;
  }
  _renderFurniture(e) {
    const t = ke(this._draft.furniture, e.furnitureType);
    if (!t) return f;
    const i = this._sel?.kind === "item" && this._sel.id === e.id || this._multi.some((s) => s.kind === "item" && s.id === e.id), n = !!e.entity && !!e.activeColor && ["on", "open", "home"].includes(this.hass?.states?.[e.entity]?.state ?? ""), o = mr(e, t).map((s) => `${s.x},${s.y}`).join(" ");
    return _`<g>
      ${wn(e, t, { selected: i, fill: br(e, n) })}
      <polygon class="furn-hit" data-kind="item" data-id=${e.id} points=${o}></polygon>
    </g>`;
  }
  _renderItem(e, t) {
    if (!yr(e, this._draft.furniture)) return f;
    const i = (e.size ?? 34) / 34 * sn * t, n = this._sel?.kind === "item" && this._sel.id === e.id, o = e.icon ?? (e.entity ? me(this.hass, e.entity) : "mdi:map-marker");
    return _`
      <g class="item ${n ? "selected" : ""}" data-kind="item" data-id=${e.id}>
        <circle cx=${e.x} cy=${e.y} r=${i}></circle>
        <foreignObject x=${e.x - i} y=${e.y - i} width=${2 * i} height=${2 * i}>
          <div class="fo-icon" style="--mdc-icon-size:${i * 1.2}px;width:${2 * i}px;height:${2 * i}px">
            <ha-icon .icon=${o}></ha-icon>
          </div>
        </foreignObject>
        ${e.label ? _`<text x=${e.x} y=${e.y + i + 12 * t} font-size=${11 * t} text-anchor="middle" class="item-label">${e.label}</text>` : f}
      </g>`;
  }
  _renderGuides(e) {
    const t = this._view;
    return _`${this._guides.map(
      (i) => i.axis === "x" ? _`<line class="guide" x1=${i.value} x2=${i.value} y1=${t.y} y2=${t.y + t.h} stroke-width=${e}></line><circle class="guide-dot" cx=${i.ref.x} cy=${i.ref.y} r=${5 * e}></circle>` : _`<line class="guide" y1=${i.value} y2=${i.value} x1=${t.x} x2=${t.x + t.w} stroke-width=${e}></line><circle class="guide-dot" cx=${i.ref.x} cy=${i.ref.y} r=${5 * e}></circle>`
    )}`;
  }
  _renderSelectionOverlay(e) {
    if (this._marquee) {
      const { a: o, b: s } = this._marquee;
      return _`<rect class="marquee" x=${Math.min(o.x, s.x)} y=${Math.min(o.y, s.y)} width=${Math.abs(o.x - s.x)} height=${Math.abs(o.y - s.y)} stroke-width=${e}></rect>`;
    }
    if (this._multi.length > 1) {
      const o = 4 * e;
      return _`${this._multi.map((s) => {
        const r = this._bbox(s);
        return r ? _`<rect class="sel-outline" x=${r.x - o} y=${r.y - o} width=${r.w + 2 * o} height=${r.h + 2 * o} stroke-width=${2 * e}></rect>` : f;
      })}`;
    }
    const t = this._sel ? void 0 : this._wallRoomPts();
    if (t) {
      const o = is * e;
      return _`
        <polygon class="sel-outline" points=${t.map((s) => `${s.x},${s.y}`).join(" ")} stroke-width=${2 * e}></polygon>
        ${t.map((s, r) => _`<circle class="handle" data-handle="v${r}" cx=${s.x} cy=${s.y} r=${o} stroke-width=${2 * e}></circle>`)}
        ${t.map((s, r) => {
        const a = t[(r + 1) % t.length];
        return _`<rect class="handle" data-handle="e${r}" x=${(s.x + a.x) / 2 - o} y=${(s.y + a.y) / 2 - o} width=${2 * o} height=${2 * o} rx=${o / 3} stroke-width=${2 * e}></rect>`;
      })}`;
    }
    const i = this._findSelected();
    if (!i || !this._sel) return f;
    if (this._sel.kind === "item" && ni(i, this._draft.furniture)) {
      const o = i, s = o.glowRadius ?? vn, r = (l) => bi(l, this._draft), a = kr(this._floor.walls, this._floor.openings, (l) => $r(l), r);
      return _`${gr(o, this._draft.furniture).map((l) => {
        const c = wr(l.x, l.y, s, a, r);
        return c ? _`<polygon class="glow-reach" points=${c.map((h) => `${h.x},${h.y}`).join(" ")} stroke-width=${1.5 * e}></polygon>` : _`<circle class="glow-reach" cx=${l.x} cy=${l.y} r=${s} stroke-width=${1.5 * e}></circle>`;
      })}`;
    }
    const n = is * e;
    if (this._sel.kind === "wall") {
      const o = i;
      return _`
        <line class="sel-line" x1=${o.x1} y1=${o.y1} x2=${o.x2} y2=${o.y2} stroke-width=${2 * e}></line>
        <circle class="handle" data-handle="p1" cx=${o.x1} cy=${o.y1} r=${n} stroke-width=${2 * e}></circle>
        <circle class="handle" data-handle="p2" cx=${o.x2} cy=${o.y2} r=${n} stroke-width=${2 * e}></circle>
        ${this._lengthLabel({ x: o.x1, y: o.y1 }, { x: o.x2, y: o.y2 }, e)}`;
    }
    if (this._sel.kind === "area") {
      const o = i;
      return _`
        <polygon class="sel-outline" points=${o.points.map((s) => `${s.x},${s.y}`).join(" ")} stroke-width=${2 * e}></polygon>
        ${o.points.map(
        (s, r) => _`<circle class="handle" data-handle="v${r}" cx=${s.x} cy=${s.y} r=${n} stroke-width=${2 * e}></circle>`
      )}
        ${o.points.map((s, r) => {
        const a = o.points[(r + 1) % o.points.length];
        return _`<rect class="handle" data-handle="e${r}" x=${(s.x + a.x) / 2 - n} y=${(s.y + a.y) / 2 - n} width=${2 * n} height=${2 * n} rx=${n / 3} stroke-width=${2 * e}></rect>`;
      })}`;
    }
    return f;
  }
  _lengthLabel(e, t, i) {
    const n = N(e, t);
    return n < 1 ? f : _`<text class="measure" x=${(e.x + t.x) / 2} y=${(e.y + t.y) / 2 - 10 * i} font-size=${12 * i}
                     text-anchor="middle">${rn(n)}</text>`;
  }
  _renderDrawPreview(e) {
    const t = this._cursor;
    if (!t) return f;
    const i = { altKey: !1 };
    if (this._tool === "wall") {
      const n = this._snap(t, i);
      if (!this._chainStart) return _`<circle class="cursor-dot" cx=${n.x} cy=${n.y} r=${4 * e}></circle>`;
      const o = tn(this._chainStart, n);
      return _`
        <line class="preview-wall" x1=${this._chainStart.x} y1=${this._chainStart.y} x2=${o.x} y2=${o.y}
              stroke-width=${this._draft.settings.wallThickness}></line>
        ${this._lengthLabel(this._chainStart, o, e)}`;
    }
    if (this._tool === "rect" || this._tool === "wallrect") {
      const n = this._snap(t, i), o = this._drag;
      if (o?.mode !== "rect") return _`<circle class="cursor-dot" cx=${n.x} cy=${n.y} r=${4 * e}></circle>`;
      const s = Math.min(o.start.x, n.x), r = Math.min(o.start.y, n.y), a = Math.abs(n.x - o.start.x), l = Math.abs(n.y - o.start.y);
      return _`
        <rect class="preview-area" x=${s} y=${r} width=${a} height=${l} stroke-width=${2 * e}></rect>
        ${a > 1 ? this._lengthLabel({ x: s, y: r }, { x: s + a, y: r }, e) : f}
        ${l > 1 ? this._lengthLabel({ x: s + a, y: r }, { x: s + a, y: r + l }, e) : f}`;
    }
    if (this._tool === "area") {
      const n = this._snap(t, i), o = [...this._roomPoints, n];
      return _`
        <polyline class="preview-area" points=${o.map((s) => `${s.x},${s.y}`).join(" ")} stroke-width=${2 * e}></polyline>
        ${this._roomPoints.map((s, r) => _`<circle class="cursor-dot ${r === 0 ? "first" : ""}" cx=${s.x} cy=${s.y} r=${(r === 0 ? 6 : 4) * e}></circle>`)}
        <circle class="cursor-dot" cx=${n.x} cy=${n.y} r=${4 * e}></circle>`;
    }
    if (this._tool === "door" || this._tool === "window") {
      const n = en(t, this._floor.walls, ht(this._floor, this._draft) + xe * 2 * e);
      return n ? _`<circle class="cursor-dot" cx=${n.point.x} cy=${n.point.y} r=${5 * e}></circle>` : f;
    }
    if (this._tool === "furniture") {
      const n = ke(this._draft.furniture, this._placeType);
      if (!n) return f;
      const o = this._snap(t, i);
      return _`<g opacity=".6">${wn({ id: "", x: o.x, y: o.y }, n, {})}</g>`;
    }
    if (this._tool === "item") {
      const n = this._snap(t, i);
      return _`<circle class="preview-item" cx=${n.x} cy=${n.y} r=${sn * e}></circle>`;
    }
    return f;
  }
  // ---------------------------------------------------------------- Eigenschaften
  _renderPicker() {
    const e = this._draft.furniture ?? [];
    return u`
      <div class="props-head"><h3>Möbel platzieren</h3></div>
      ${e.length ? u`<div class="furn-picker">${e.map((t) => {
      const i = gi(t), n = Math.max(i.x1 - i.x0, i.y1 - i.y0) * 0.1 + 2;
      return u`<button class="furn-pick ${this._placeType === t.id ? "active" : ""}" title=${t.name} @click=${() => this._placeType = t.id}>
              <svg viewBox="${i.x0 - n} ${i.y0 - n} ${i.x1 - i.x0 + 2 * n} ${i.y1 - i.y0 + 2 * n}"><g class="furniture">${t.parts.map((o) => yi(o))}</g></svg>
              <span>${t.name}</span>
            </button>`;
    })}</div>` : u`<p class="muted">Die Bibliothek ist leer. Über „Möbel-Bibliothek“ oben baust du eigene Vorlagen.</p>`}
      <button class="chip" @click=${() => (this._furnOpen = void 0, this._furnMode = !0)}><ha-icon icon="mdi:sofa-outline"></ha-icon>Möbel-Bibliothek öffnen</button>
    `;
  }
  _renderProps() {
    if (this._tool === "furniture") return this._renderPicker();
    if (this._multi.length > 1) return this._renderMultiProps();
    if (!this._sel && this._wallRoomPts()) {
      const i = It(this._wallRoomPts());
      return u`
        <div class="props-head"><h3>Raum aus Wänden</h3></div>
        ${i ? u`<p class="muted">${rn(i.w)} × ${rn(i.h)}</p>` : f}
        <div class="row-btns">
          <button class="chip" @click=${this._wallRoomToArea}><ha-icon icon="mdi:vector-polygon"></ha-icon>Raumfläche anlegen</button>
          <button class="chip" @click=${this._deleteWallRoom}><ha-icon icon="mdi:delete-outline"></ha-icon>Löschen</button>
        </div>
        <p class="muted">Ziehen verschiebt den Raum samt Wänden. Griffe an Ecken und Kanten ändern die Größe. Ein weiterer Klick auf eine Wand wählt nur die Wand. Mit „Raumfläche anlegen“ wird daraus ein Raum mit Seitenleiste und Icons.</p>
      `;
    }
    const e = this._findSelected();
    if (!e || !this._sel) return this._renderPlanProps();
    const t = { wall: "Wand", opening: e.type === "window" ? "Fenster" : "Tür", area: "Raum", item: "Icon" }[this._sel.kind];
    return u`
      <div class="props-head">
        <h3>${t}</h3>
        <button class="icon-btn" title="Duplizieren (Strg+D)" @click=${this._duplicate}><ha-icon icon="mdi:content-duplicate"></ha-icon></button>
        <button class="icon-btn" title="Löschen (Entf)" @click=${this._deleteSelected}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
        <button class="icon-btn" title="Auswahl aufheben" @click=${() => this._sel = void 0}><ha-icon icon="mdi:close"></ha-icon></button>
      </div>
      ${this._sel.kind === "wall" ? this._renderWallProps(e) : this._sel.kind === "opening" ? this._renderOpeningProps(e) : this._sel.kind === "area" ? this._renderAreaProps(e) : this._renderItemProps(e)}
    `;
  }
  _renderMultiProps() {
    const e = (t) => this._multi.filter((i) => i.kind === t).length;
    return u`
      <div class="props-head">
        <h3>${this._multi.length} Elemente</h3>
        <button class="icon-btn" title="Löschen (Entf)" @click=${this._deleteSelected}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
        <button class="icon-btn" title="Auswahl aufheben" @click=${() => this._sel = void 0}><ha-icon icon="mdi:close"></ha-icon></button>
      </div>
      <p class="muted">${e("wall")} Wände · ${e("opening")} Türen/Fenster · ${e("area")} Räume · ${e("item")} Icons</p>
      <div class="row-btns">
        <button class="chip" @click=${this._duplicate}><ha-icon icon="mdi:content-duplicate"></ha-icon>Duplizieren</button>
        <button class="chip" @click=${this._copy}><ha-icon icon="mdi:content-copy"></ha-icon>Kopieren</button>
        <button class="chip" @click=${this._saveTemplate}><ha-icon icon="mdi:content-save-outline"></ha-icon>Als Vorlage</button>
      </div>
      <p class="muted">Ziehen verschiebt alle gemeinsam. Strg+C / Strg+V kopieren und einfügen, auch auf andere Etagen.</p>
    `;
  }
  _num(e, t, i, n = {}) {
    return u`<label class="field">
      <span>${e}</span>
      <input
        type="number"
        .value=${i == null ? "" : String(fe(i))}
        min=${n.min ?? ""}
        max=${n.max ?? ""}
        step=${n.step ?? 1}
        placeholder=${n.placeholder ?? ""}
        @change=${(o) => {
      const s = o.target.value;
      this._setProp(t, s === "" ? void 0 : Number(s));
    }}
      />
    </label>`;
  }
  _text(e, t, i, n = "") {
    return u`<label class="field">
      <span>${e}</span>
      <input
        type="text"
        .value=${i ?? ""}
        placeholder=${n}
        @change=${(o) => this._setProp(t, o.target.value.trim())}
      />
    </label>`;
  }
  _check(e, t, i) {
    return u`<label class="check">
      <input type="checkbox" .checked=${!!i} @change=${(n) => this._setProp(t, n.target.checked)} />
      <span>${e}</span>
    </label>`;
  }
  _color(e, t, i, n) {
    return u`<label class="field color">
      <span>${e}</span>
      <input type="color" .value=${i && i.startsWith("#") ? i : n} @change=${(o) => this._setProp(t, o.target.value)} />
      ${i ? u`<button class="link" @click=${() => this._setProp(t, void 0)}>Standard</button>` : f}
    </label>`;
  }
  _entity(e, t, i, n = []) {
    return u`<div class="field">
      <span>${e}</span>
      <fp-entity-picker
        .hass=${this.hass}
        .value=${i ?? ""}
        .domains=${n}
        @value-changed=${(o) => this._setProp(t, o.detail.value)}
      ></fp-entity-picker>
    </div>`;
  }
  _renderWallProps(e) {
    return u`
      <div class="grid2">
        ${this._num("x1", "x1", e.x1)} ${this._num("y1", "y1", e.y1)} ${this._num("x2", "x2", e.x2)} ${this._num("y2", "y2", e.y2)}
      </div>
      ${this._num("Stärke", "thickness", e.thickness, { min: 1, max: 100, placeholder: `Standard (${this._draft.settings.wallThickness})` })}
      <label class="field">
        <span>Länge</span>
        <input type="number" min="1" step="1" .value=${String(fe(N({ x: e.x1, y: e.y1 }, { x: e.x2, y: e.y2 })))}
               @change=${(t) => this._setWallLength(Number(t.target.value))} />
      </label>
      <p class="muted">Länge ändern verschiebt den zweiten Endpunkt; verbundene Wände ziehen mit.</p>
    `;
  }
  /** Raum, der bei diesem Treffer als Ganzes gewählt wird (undefined: Element direkt wählen). */
  _roomTarget(e) {
    if (e.kind === "area") return this._floor.areas.find((o) => o.id === e.id);
    if (e.kind !== "wall") return;
    const t = this._floor.walls.find((o) => o.id === e.id);
    if (!t) return;
    const i = qo(t, this._floor.areas), n = this._sel;
    if (!(!i.length || n?.kind === "wall" && n.id === t.id))
      return i.find((o) => n?.kind === "area" && n.id === o.id) ? void 0 : i[0];
  }
  _roomGroup(e) {
    const t = this._floor, i = vr(e, t.walls), n = [{ kind: "area", id: e.id }, ...i.map((o) => ({ kind: "wall", id: o.id }))];
    for (const o of t.openings)
      i.some((s) => Pt({ x: o.x, y: o.y }, { x: s.x1, y: s.y1 }, { x: s.x2, y: s.y2 }, 3)) && n.push({ kind: "opening", id: o.id });
    for (const o of t.items) Fe(e.points, o.x, o.y) && n.push({ kind: "item", id: o.id });
    return n;
  }
  _movers(e) {
    const t = [];
    for (const i of this._floor.areas)
      for (const n of i.points) e(n) && t.push({ x: n.x, y: n.y, vert: n, set: (o, s) => Object.assign(n, { x: o, y: s }) });
    for (const i of this._floor.walls)
      e({ x: i.x1, y: i.y1 }) && t.push({ x: i.x1, y: i.y1, wall: i, set: (n, o) => Object.assign(i, { x1: n, y1: o }) }), e({ x: i.x2, y: i.y2 }) && t.push({ x: i.x2, y: i.y2, wall: i, set: (n, o) => Object.assign(i, { x2: n, y2: o }) });
    return t;
  }
  _edgeSetup(e, t) {
    const i = N(e, t) || 1;
    return { n: { x: -(t.y - e.y) / i, y: (t.x - e.x) / i }, pts: this._movers((o) => Pt(o, e, t)) };
  }
  /** Kürzester geschlossener Wandzug durch die Wand (Raum ohne Fläche). */
  _findLoop(e) {
    const t = (h, d) => `${Math.round(h)},${Math.round(d)}`, i = /* @__PURE__ */ new Map();
    for (const h of this._floor.walls) {
      const d = t(h.x1, h.y1), p = t(h.x2, h.y2);
      d !== p && ((i.get(d) ?? i.set(d, []).get(d)).push({ w: h, to: p, flip: !1 }), (i.get(p) ?? i.set(p, []).get(p)).push({ w: h, to: d, flip: !0 }));
    }
    const n = t(e.x2, e.y2), o = t(e.x1, e.y1);
    if (n === o) return;
    const s = /* @__PURE__ */ new Map(), r = [n], a = /* @__PURE__ */ new Set([n]);
    for (; r.length && !a.has(o); ) {
      const h = r.shift();
      for (const d of i.get(h) ?? [])
        d.w === e || a.has(d.to) || (a.add(d.to), s.set(d.to, { from: h, w: d.w, flip: d.flip }), r.push(d.to));
    }
    if (!a.has(o)) return;
    const l = [];
    for (let h = o; h !== n; ) {
      const d = s.get(h);
      l.unshift({ id: d.w.id, flip: d.flip }), h = d.from;
    }
    const c = [{ id: e.id, flip: !1 }, ...l];
    return c.length >= 3 ? c : void 0;
  }
  _wallRoomPts() {
    if (!this._wallRoom) return;
    const e = [];
    for (const { id: t, flip: i } of this._wallRoom.walls) {
      const n = this._floor.walls.find((o) => o.id === t);
      if (!n) return;
      e.push(i ? { x: n.x2, y: n.y2 } : { x: n.x1, y: n.y1 });
    }
    return e;
  }
  _wallRoomGroup(e) {
    const t = this._floor, i = new Set(this._wallRoom.walls.map((s) => s.id)), n = t.walls.filter((s) => i.has(s.id)), o = n.map((s) => ({ kind: "wall", id: s.id }));
    for (const s of t.openings)
      n.some((r) => Pt({ x: s.x, y: s.y }, { x: r.x1, y: r.y1 }, { x: r.x2, y: r.y2 }, 3)) && o.push({ kind: "opening", id: s.id });
    for (const s of t.items) Fe(e, s.x, s.y) && o.push({ kind: "item", id: s.id });
    return o;
  }
  _wallRoomToArea() {
    const e = this._wallRoomPts();
    if (!e) return;
    const t = U("r"), i = this._floor.areas.length;
    this._mutate((n) => n.areas.push({ id: t, name: `Raum ${i + 1}`, points: e, color: nt[i % nt.length], sidebar: [] })), this._wallRoom = void 0, this._sel = { kind: "area", id: t };
  }
  _deleteWallRoom() {
    const e = this._wallRoomPts();
    if (!e) return;
    const t = this._wallRoomGroup(e);
    this._mutate((i) => {
      for (const n of Object.keys(Oe)) {
        const o = new Set(t.filter((s) => s.kind === n).map((s) => s.id));
        o.size && (i[Oe[n]] = i[Oe[n]].filter((s) => !o.has(s.id)));
      }
    }), this._wallRoom = void 0;
  }
  _setWallLength(e) {
    const t = this._findSelected();
    if (!t || !Number.isFinite(e) || e < 1) return;
    const i = N({ x: t.x1, y: t.y1 }, { x: t.x2, y: t.y2 });
    i < 0.01 || this._mutate(() => {
      const n = this._linksAt(t, 2), o = e / i, s = { x: fe(t.x1 + (t.x2 - t.x1) * o), y: fe(t.y1 + (t.y2 - t.y1) * o) };
      t.x2 = s.x, t.y2 = s.y, this._applyLink(n, s);
    });
  }
  _setRectSize(e, t, i) {
    const n = It(e.points);
    !n || !(t >= 1) || !(i >= 1) || this._mutate(() => {
      const o = e.points.map((s) => this._linksAt(void 0, 0, s, e));
      e.points.forEach((s, r) => {
        const a = { x: s.x === n.x ? n.x : n.x + t, y: s.y === n.y ? n.y : n.y + i };
        Object.assign(s, a), this._applyLink(o[r], a);
      });
    });
  }
  _autoPlaceIcons(e) {
    const t = new Set(this._floor.items.map((s) => s.entity).filter(Boolean)), i = e.sidebar.map((s) => s.entity).filter((s) => !t.has(s));
    if (!i.length) return;
    const n = this._floor.items.filter((s) => Fe(e.points, s.x, s.y)).map((s) => ({ x: s.x, y: s.y })), o = Kl(e.points, i.map((s) => ({ light: ae(s) === "light" })), n, Xn(e.points));
    this._mutate((s) => {
      i.forEach((r, a) => s.items.push({ id: U("i"), x: o[a].x, y: o[a].y, entity: r, icon: me(this.hass, r), tapAction: "auto" }));
    });
  }
  _renderOpeningProps(e) {
    const t = e.type === "window", i = nn(e), n = En(e), o = An(e), s = (r) => e.shutters?.find((a) => a.side === r);
    return u`
      <label class="field">
        <span>Art</span>
        <select @change=${(r) => this._setProp("type", r.target.value)}>
          <option value="door" ?selected=${e.type === "door"}>Tür</option>
          <option value="window" ?selected=${t}>Fenster</option>
        </select>
      </label>
      <div class="grid2">
        ${this._num("Breite", "length", e.length, { min: 10, max: 1e3 })} ${this._num("Winkel", "angle", e.angle, { min: -360, max: 360, step: 15 })}
      </div>
      ${t ? u`
            <div class="field ${i ? "required-missing" : ""}">
              <span>Gesamtkontakt (für Flügel ohne eigenen Sensor)</span>
              <fp-entity-picker
                .hass=${this.hass}
                .value=${e.entity ?? ""}
                .domains=${["binary_sensor"]}
                placeholder="Fensterkontakt wählen …"
                @value-changed=${(r) => this._setProp("entity", r.detail.value)}
              ></fp-entity-picker>
              ${i ? u`<span class="warn">Ohne Sensor kann der Öffnungszustand nicht angezeigt werden.</span>` : f}
            </div>
            <h4>Flügel (${n.length} von ${bn})</h4>
            ${n.map(
      (r, a) => u`<div class="leaf-row ${this._leafSel === a ? "active" : ""}" @click=${() => this._leafSel = a}>
                <div class="leaf-head">
                  <b>${a + 1}</b>
                  <label>
                    Breite
                    <input
                      type="number"
                      min="10"
                      step="1"
                      .value=${String(Math.round(o[a].x1 - o[a].x0))}
                      ?disabled=${n.length === 1}
                      @change=${(l) => this._setLeafWidth(a, Number(l.target.value))}
                    />
                  </label>
                  <button
                    title="Anschlag wechseln"
                    @click=${() => this._setLeaf(a, { hinge: o[a].hinge === "right" ? "left" : "right" })}
                  >
                    <ha-icon icon="mdi:swap-horizontal"></ha-icon> ${o[a].hinge === "right" ? "rechts" : "links"}
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
              <button ?disabled=${n.length >= bn} @click=${() => this._setLeafCount(n.length + 1)}>
                <ha-icon icon="mdi:plus"></ha-icon> Flügel
              </button>
              <button ?disabled=${n.length <= 1} @click=${() => this._setLeafCount(n.length - 1)}>
                <ha-icon icon="mdi:minus"></ha-icon> Flügel
              </button>
              <button @click=${() => this._setProp("swing", e.swing === "out" ? "in" : "out")}>
                <ha-icon icon="mdi:swap-vertical"></ha-icon> Richtung
              </button>
            </div>` : u`
            <div class="btn-row">
              <button @click=${() => this._setProp("hinge", e.hinge === "right" ? "left" : "right")}>
                <ha-icon icon="mdi:swap-horizontal"></ha-icon> Anschlag
              </button>
              <button @click=${() => this._setProp("swing", e.swing === "out" ? "in" : "out")}>
                <ha-icon icon="mdi:swap-vertical"></ha-icon> Richtung
              </button>
            </div>
            ${this._entity("Kontakt (optional)", "entity", e.entity, ["binary_sensor"])}
            ${this._entity("Schloss (optional)", "lockEntity", e.lockEntity, ["lock"])}
            <p class="muted">Ohne Kontakt gilt die Tür beim Lichtschein als offen.</p>`}
      ${this._color("Farbe wenn offen", "openColor", e.openColor, cr)}
      <p class="muted">Im Editor wird die ausgewählte Öffnung geöffnet gezeigt. Ziehen schiebt sie entlang der Wände.</p>
      ${t ? u`<h4>Rollo</h4>
            ${["out", "in"].map((r) => {
      const a = s(r);
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
                        .value=${a.color && a.color.startsWith("#") ? a.color : dr}
                        @change=${(l) => this._setShutter(r, { color: l.target.value })}
                      />
                    </label>` : f}
              </div>`;
    })}
            <p class="muted">Außen liegt auf der Seite gegen den Aufschlag „innen“; die Tiefe des Bands zeigt, wie weit das Rollo zu ist.</p>` : f}
    `;
  }
  /** Ändert die Flügelliste des ausgewählten Fensters. */
  _editLeaves(e) {
    this._mutate(() => {
      const t = this._findSelected();
      t && (t.leaves = e(En(t).map((i) => ({ ...i })), t));
    });
  }
  _setLeaf(e, t) {
    this._leafSel = e, this._editLeaves((i, n) => {
      if (t.hinge === void 0) return i.map((s, r) => r === e ? os({ ...s, ...t }) : s);
      const o = An(n);
      return i.map((s, r) => r === e ? os({ ...s, ...t }) : { ...s, hinge: s.hinge ?? o[r].hinge });
    });
  }
  _setLeafCount(e) {
    this._editLeaves((t) => lc(t, e)), this._leafSel = Math.min(this._leafSel ?? 0, e - 1);
  }
  _setLeafWidth(e, t) {
    Number.isFinite(t) && this._editLeaves((i, n) => cc(i, e, t, n.length));
  }
  _setShutter(e, t) {
    this._mutate(() => {
      const i = this._findSelected();
      if (!i) return;
      const n = (i.shutters ?? []).filter((r) => r.side !== e), s = { ...i.shutters?.find((r) => r.side === e) ?? { entity: "", side: e }, ...t };
      s.entity && n.push(s), n.length ? i.shutters = n : delete i.shutters;
    });
  }
  _renderAreaProps(e) {
    const t = Object.values(this.hass.areas ?? {}).sort((n, o) => n.name.localeCompare(o.name)), i = this._areaSuggestions(e);
    return u`
      ${this._text("Name", "name", e.name)}
      <label class="field">
        <span>Art</span>
        <select @change=${(n) => this._setProp("type", n.target.value)}>
          ${hr.map(([n, o]) => u`<option value=${n} ?selected=${(e.type ?? "room") === n}>${o}</option>`)}
        </select>
      </label>
      ${e.type === "custom" ? this._text("Bezeichnung", "typeLabel", e.typeLabel) : f}
      <div class="grid2">
        ${this._color("Farbe", "color", e.color, "#4f8bd6")}
        <label class="field">
          <span>Deckkraft</span>
          <input type="range" min="0" max="0.6" step="0.02" .value=${String(e.opacity ?? 0.12)}
                 @change=${(n) => this._setProp("opacity", Number(n.target.value))} />
        </label>
      </div>
      ${(() => {
      const n = It(e.points);
      return n ? u`<div class="grid2">
              <label class="field"><span>Breite</span><input type="number" min="1" .value=${String(fe(n.w))} @change=${(o) => this._setRectSize(e, Number(o.target.value), n.h)} /></label>
              <label class="field"><span>Höhe</span><input type="number" min="1" .value=${String(fe(n.h))} @change=${(o) => this._setRectSize(e, n.w, Number(o.target.value))} /></label>
            </div>` : f;
    })()}
      ${this._check("Name im Plan anzeigen", "showName", e.showName !== !1)}
      ${this._num("Zoom beim Antippen", "zoom", e.zoom ?? void 0, { min: 1, max: 10, step: 0.25, placeholder: "automatisch einpassen" })}
      <details>
        <summary>Mehr</summary>
        ${t.length ? u`<label class="field">
              <span>HA-Bereich (nur Bezug, keine Automatik)</span>
              <select
                @change=${(n) => {
      const o = n.target.value;
      this._mutate(() => {
        const s = this._findSelected();
        o ? s.haArea = o : delete s.haArea, o && (!s.name || /^Raum \d+$/.test(s.name)) && (s.name = this.hass.areas[o].name);
      });
    }}
              >
                <option value="">– keiner –</option>
                ${t.map((n) => u`<option value=${n.area_id} ?selected=${e.haArea === n.area_id}>${n.name}</option>`)}
              </select>
            </label>` : f}
        ${this._entity("Raum einfärben, wenn aktiv", "entity", e.entity, ["binary_sensor", "input_boolean", "light", "switch", "person"])}
        ${e.entity ? this._color("Farbe wenn aktiv", "activeColor", e.activeColor, "#ffc107") : f}
      </details>

      <h4>Seitenleiste</h4>
      <p class="muted">Nur was hier steht, erscheint beim Antippen des Raums – Geräte, Szenen und Skripte.</p>
      <div class="sidebar-list">
        ${e.sidebar.map(
      (n, o) => u`<div class="sb-row">
            <ha-icon .icon=${me(this.hass, n.entity, n.icon)}></ha-icon>
            <div class="sb-main">
              <input
                type="text"
                .value=${n.name ?? ""}
                placeholder=${jt(this.hass, n.entity)}
                @change=${(s) => this._editSidebar(o, "name", s.target.value.trim())}
              />
              <small>${n.entity} · ${{ device: "Gerät", scene: "Szene", script: "Skript" }[ui(n.entity)]}${this.hass.states[n.entity] ? "" : " · nicht gefunden"}</small>
            </div>
            <button class="icon-btn" title="Nach oben" ?disabled=${o === 0} @click=${() => this._moveSidebar(o, -1)}><ha-icon icon="mdi:chevron-up"></ha-icon></button>
            <button class="icon-btn" title="Nach unten" ?disabled=${o === e.sidebar.length - 1} @click=${() => this._moveSidebar(o, 1)}><ha-icon icon="mdi:chevron-down"></ha-icon></button>
            <button class="icon-btn" title="Entfernen" @click=${() => this._removeSidebar(o)}><ha-icon icon="mdi:close"></ha-icon></button>
          </div>`
    )}
      </div>
      ${e.sidebar.length ? u`<button class="chip" title="Fehlende Icons für die Seitenleisten-Geräte im Raum verteilen" @click=${() => this._autoPlaceIcons(e)}>
            <ha-icon icon="mdi:auto-fix"></ha-icon>Icons automatisch platzieren
          </button>` : f}
      <fp-entity-picker
        .hass=${this.hass}
        .exclude=${e.sidebar.map((n) => n.entity)}
        clearOnSelect
        placeholder="Gerät, Szene oder Skript hinzufügen …"
        @value-changed=${(n) => n.detail.value && this._addSidebar(n.detail.value)}
      ></fp-entity-picker>
      ${i.length ? u`<div class="suggest">
            <span class="muted">Vorschläge aus dem HA-Bereich – zum Übernehmen antippen:</span>
            <div class="chips">
              ${i.map(
      (n) => u`<button class="chip" title=${n} @click=${() => this._addSidebar(n)}>
                  <ha-icon .icon=${me(this.hass, n)}></ha-icon>${jt(this.hass, n)}
                </button>`
    )}
            </div>
          </div>` : f}
    `;
  }
  /** Entitäten des verknüpften HA-Bereichs, die noch nicht in der Seitenleiste sind (nur Vorschlag). */
  _areaSuggestions(e) {
    if (!e.haArea || !this.hass.entities) return [];
    const t = new Set(e.sidebar.map((o) => o.entity)), i = this.hass.devices, n = /* @__PURE__ */ new Set(["light", "switch", "fan", "cover", "climate", "media_player", "lock", "scene", "script", "vacuum", "input_boolean", "sensor", "binary_sensor", "humidifier", "valve", "button"]);
    return Object.values(this.hass.entities).filter((o) => !o.hidden && !t.has(o.entity_id) && n.has(ae(o.entity_id))).filter((o) => (o.area_id ?? (o.device_id ? i?.[o.device_id]?.area_id : void 0)) === e.haArea).map((o) => o.entity_id).slice(0, 30);
  }
  _addSidebar(e) {
    this._mutate(() => this._findSelected().sidebar.push({ entity: e }));
  }
  _removeSidebar(e) {
    this._mutate(() => this._findSelected().sidebar.splice(e, 1));
  }
  _moveSidebar(e, t) {
    this._mutate(() => {
      const i = this._findSelected().sidebar, [n] = i.splice(e, 1);
      i.splice(e + t, 0, n);
    });
  }
  _editSidebar(e, t, i) {
    this._mutate(() => {
      const n = this._findSelected().sidebar[e];
      i ? n[t] = i : delete n[t];
    });
  }
  _renderFurnitureProps(e) {
    const t = this._draft.furniture ?? [], i = ke(t, e.furnitureType), n = (o) => this._setProp("rotation", (((e.rotation ?? 0) + o) % 360 + 360) % 360);
    return u`
      <label class="field">
        <span>Vorlage</span>
        <select @change=${(o) => this._setProp("furnitureType", o.target.value)}>
          ${i ? f : u`<option value="" selected>${e.furnitureType ? "(gelöscht)" : "keine"}</option>`}
          ${t.map((o) => u`<option value=${o.id} ?selected=${o.id === e.furnitureType}>${o.name}</option>`)}
        </select>
      </label>
      ${i ? u`<button class="chip" @click=${() => this._editTemplate(i.id)}><ha-icon icon="mdi:pencil-outline"></ha-icon>Vorlage bearbeiten</button>` : f}
      <div class="grid2">
        ${this._num("Drehung (°)", "rotation", e.rotation, { min: -720, max: 720, step: 5, placeholder: "0" })}
        ${this._num("Skalierung", "scale", e.scale, { min: 0.05, max: 20, step: 0.1, placeholder: "1" })}
      </div>
      <div class="row-btns">
        <button class="chip" @click=${() => n(-90)}><ha-icon icon="mdi:rotate-left"></ha-icon>−90°</button>
        <button class="chip" @click=${() => n(90)}><ha-icon icon="mdi:rotate-right"></ha-icon>+90°</button>
      </div>
      ${this._color("Farbe (überschreibt Vorlage)", "fillColor", e.fillColor, "#9e9e9e")}
      ${i?.lights?.length ? u`<p class="muted">Die Vorlage hat ${i.lights.length} Leuchtpunkt${i.lights.length > 1 ? "e" : ""}. Mit einer Licht-Entität scheint das Licht genau dort.</p>` : f}
      <h4>Icon / Entität</h4>
    `;
  }
  _renderItemProps(e) {
    return u`
      ${e.furnitureType ? this._renderFurnitureProps(e) : f}
      <div class="field">
        <span>Icon</span>
        <div class="icon-input">
          <ha-icon .icon=${e.icon ?? (e.entity ? me(this.hass, e.entity) : "mdi:map-marker")}></ha-icon>
          <input type="text" .value=${e.icon ?? ""} placeholder=${e.entity ? "vom Gerät" : "mdi:…"}
                 @change=${(t) => this._setProp("icon", t.target.value.trim())} />
        </div>
        <div class="icon-grid">
          ${bc.map(
      (t) => u`<button class="icon-pick ${e.icon === t ? "active" : ""}" title=${t} @click=${() => this._setProp("icon", t)}>
              <ha-icon .icon=${t}></ha-icon>
            </button>`
    )}
        </div>
      </div>
      ${this._entity("Entität (optional)", "entity", e.entity)}
      ${this._text("Beschriftung", "label", e.label)}
      <label class="field">
        <span>Beim Antippen</span>
        <select @change=${(t) => this._setProp("tapAction", t.target.value)}>
          ${[
      ["auto", "Automatisch (Licht/Schalter schalten, sonst Details)"],
      ["toggle", "Schalten / Ausführen"],
      ["more-info", "Details öffnen"],
      ["none", "Nichts"]
    ].map(([t, i]) => u`<option value=${t} ?selected=${(e.tapAction ?? "auto") === t}>${i}</option>`)}
        </select>
      </label>
      <div class="grid2">
        ${this._num("Größe (px)", "size", e.size, { min: 8, max: 200, placeholder: "34" })}
        ${this._color("Farbe wenn an", "activeColor", e.activeColor, "#ffb300")}
      </div>
      ${this._check("Zustand anzeigen", "showState", e.showState)}
      <h4>Lichtschein</h4>
      <label class="check">
        <input type="checkbox" .checked=${ni(e, this._draft.furniture)} @change=${(t) => this._setProp("glow", t.target.checked)} />
        <span>Lichtschein anzeigen${e.glow === void 0 || e.glow === null ? " (automatisch)" : ""}</span>
      </label>
      ${ni(e, this._draft.furniture) ? u`<div class="grid2">
              ${this._num("Radius", "glowRadius", e.glowRadius, { min: 10, max: 5e3, step: 10, placeholder: String(vn) })}
              ${this._color("Farbe ohne RGB", "glowColor", e.glowColor, pr)}
            </div>
            <p class="muted">Bei voller Helligkeit; gedimmt schrumpft der Schein. RGB-Lampen leuchten in ihrer eigenen Farbe. Die gestrichelte Kontur zeigt, wo Wände das Licht begrenzen.</p>` : f}
      <h4>Sichtbarkeit</h4>
      ${this._check("Nur zeigen, wenn der Raum gezoomt ist", "showOnlyWhenZoomed", e.showOnlyWhenZoomed)}
      ${e.showOnlyWhenZoomed ? u`<label class="field">
            <span>Gehört zu Raum</span>
            <select @change=${(t) => this._setProp("area", t.target.value)}>
              <option value="">automatisch (Lage im Raum)</option>
              ${this._floor.areas.map((t) => u`<option value=${t.id} ?selected=${e.area === t.id}>${t.name || t.id}</option>`)}
            </select>
          </label>` : f}
      ${!e.area && !this._floor.areas.some((t) => Fe(t.points, e.x, e.y)) && e.showOnlyWhenZoomed ? u`<p class="warn">Das Icon liegt in keinem Raum und wird deshalb nie angezeigt.</p>` : f}
    `;
  }
  _renderPlanProps() {
    const e = this._draft, t = this._floor;
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
            ${e.floors.map((i) => u`<option value=${i.id} ?selected=${i.id === this._floorId}>${i.name || i.id}</option>`)}
          </select>
          <button class="icon-btn" title="Etage hinzufügen" @click=${this._addFloor}><ha-icon icon="mdi:plus"></ha-icon></button>
          <button class="icon-btn" title="Etage löschen" ?disabled=${e.floors.length < 2} @click=${this._deleteFloor}>
            <ha-icon icon="mdi:delete-outline"></ha-icon>
          </button>
        </div>
      </label>
      <label class="field">
        <span>Name der Etage</span>
        <input type="text" .value=${t.name} @change=${(i) => this._mutate((n) => n.name = i.target.value.trim())} />
      </label>
      <div class="grid2">
        ${this._planNum("Wandstärke", e.settings.wallThickness, (i) => e.settings.wallThickness = i, 1)}
        <label class="field">
          <span>Raster</span>
          <select @change=${(i) => this._mutate(() => e.settings.grid = Number(i.target.value))}>
            ${(on.includes(e.settings.grid) ? on : [...on, e.settings.grid].sort((i, n) => i - n)).map(
      (i) => u`<option value=${i} ?selected=${i === e.settings.grid}>${i}</option>`
    )}
          </select>
        </label>
      </div>
      <p class="muted">Die Zeichenfläche ist unbegrenzt. Einheiten frei wählbar – Zentimeter bieten sich an (1000 = 10 m).</p>
      <p class="muted">
        ${t.walls.length} Wände · ${t.openings.length} Türen/Fenster · ${t.areas.length} Räume · ${t.items.length} Icons
      </p>
      ${this._windowsWithoutContact.length ? u`<h4>Fenster ohne Kontakt</h4>
            <div class="room-list">
              ${this._windowsWithoutContact.map(
      ({ floorId: i, opening: n }) => u`<button class="room-btn warn-row" @click=${() => this._selectOpening(i, n.id)}>
                  <ha-icon icon="mdi:window-closed-variant"></ha-icon>${n.id}
                  <small>${this._draft.floors.find((o) => o.id === i)?.name || i}</small>
                </button>`
    )}
            </div>` : f}
      <h4>Vorlagen</h4>
      ${e.settings.templates?.length ? u`<div class="room-list">
            ${e.settings.templates.map(
      (i) => u`<div class="row">
                <button class="room-btn" title="In die Mitte der Ansicht einfügen" @click=${() => this._insertTemplate(i)}>
                  <ha-icon icon="mdi:shape-plus-outline"></ha-icon>${i.name}
                  <small>${i.walls.length + i.openings.length + i.areas.length + i.items.length} Elemente</small>
                </button>
                <button class="icon-btn" title="Vorlage löschen" @click=${() => this._deleteTemplate(i.id)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
              </div>`
    )}
          </div>` : u`<p class="muted">Mehrere Elemente auswählen und als Vorlage speichern, um sie später wieder einzufügen.</p>`}
      <h4>Räume</h4>
      <div class="room-list">
        ${t.areas.length ? t.areas.map(
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
  _planNum(e, t, i, n) {
    return u`<label class="field">
      <span>${e}</span>
      <input
        type="number"
        min=${n}
        .value=${String(t)}
        @change=${(o) => {
      const s = Number(o.target.value);
      Number.isFinite(s) && s >= n && this._mutate(() => i(s));
    }}
      />
    </label>`;
  }
  _addFloor() {
    const e = prompt("Name der neuen Etage", "Etage " + (this._draft.floors.length + 1));
    if (!e) return;
    const t = U("etage");
    this._mutate((i, n) => n.floors.push({ id: t, name: e, walls: [], openings: [], areas: [], items: [] })), this._floorId = t, this._sel = void 0;
  }
  _deleteFloor() {
    if (this._draft.floors.length < 2 || !confirm(`Etage „${this._floor.name || this._floorId}“ mit allem Inhalt löschen?`)) return;
    const e = this._floorId;
    this._mutate((t, i) => i.floors = i.floors.filter((n) => n.id !== e)), this._floorId = this._draft.floors[0].id, this._sel = void 0;
  }
};
z.styles = [
  Ae(Cr),
  Ae(Zn),
  oe`
      .furn-hit { fill: transparent; pointer-events: all; cursor: move; }
      .furn-picker { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin: 8px 0; }
      .furn-pick { display: flex; flex-direction: column; align-items: center; gap: 2px; border: 1px solid var(--divider-color); border-radius: 8px; background: none; padding: 6px; cursor: pointer; font-size: 11px; color: var(--primary-text-color); }
      .furn-pick.active { border-color: var(--primary-color); outline: 2px solid var(--primary-color); }
      .furn-pick svg { width: 100%; height: 56px; }
      .chip-top { display: inline-flex; align-items: center; gap: 4px; border: 1px solid rgba(255,255,255,.6); border-radius: 16px; background: none; color: inherit; padding: 4px 12px; cursor: pointer; font: inherit; font-size: 13px; --mdc-icon-size: 18px; }
    `,
  oe`
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
      svg.canvas.tool-marquee,
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
      .guide {
        stroke: #e91e63;
        stroke-dasharray: 8 5;
        pointer-events: none;
      }
      .guide-dot {
        fill: none;
        stroke: #e91e63;
        stroke-width: 2;
        vector-effect: non-scaling-stroke;
        pointer-events: none;
      }
      .marquee {
        fill: var(--primary-color);
        fill-opacity: 0.08;
        stroke: var(--primary-color);
        stroke-dasharray: 6 4;
        pointer-events: none;
      }
      .ctx-menu {
        position: absolute;
        z-index: 5;
        display: flex;
        flex-direction: column;
        padding: 4px;
        border-radius: 8px;
        background: var(--card-background-color, #fff);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      }
      .ctx-menu button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        border: none;
        border-radius: 6px;
        background: none;
        color: var(--primary-text-color);
        font: inherit;
        cursor: pointer;
        text-align: left;
      }
      .ctx-menu button:hover {
        background: var(--secondary-background-color);
      }
      .row-btns {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
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
F([
  A({ attribute: !1 })
], z.prototype, "hass", 2);
F([
  A({ attribute: !1 })
], z.prototype, "plan", 2);
F([
  A({ attribute: !1 })
], z.prototype, "revision", 2);
F([
  A({ attribute: !1 })
], z.prototype, "floorId", 2);
F([
  A({ attribute: !1 })
], z.prototype, "initialAreaId", 2);
F([
  A({ type: Boolean, reflect: !0 })
], z.prototype, "narrow", 2);
F([
  k()
], z.prototype, "_draft", 2);
F([
  k()
], z.prototype, "_floorId", 2);
F([
  k()
], z.prototype, "_tool", 2);
F([
  k()
], z.prototype, "_furnMode", 2);
F([
  k()
], z.prototype, "_furnOpen", 2);
F([
  k()
], z.prototype, "_placeType", 2);
F([
  k()
], z.prototype, "_sel", 2);
F([
  k()
], z.prototype, "_multi", 2);
F([
  k()
], z.prototype, "_marquee", 2);
F([
  k()
], z.prototype, "_guides", 2);
F([
  k()
], z.prototype, "_wallRoom", 2);
F([
  k()
], z.prototype, "_menu", 2);
F([
  k()
], z.prototype, "_leafSel", 2);
F([
  k()
], z.prototype, "_view", 2);
F([
  k()
], z.prototype, "_cursor", 2);
F([
  k()
], z.prototype, "_chainStart", 2);
F([
  k()
], z.prototype, "_roomPoints", 2);
F([
  k()
], z.prototype, "_dirty", 2);
F([
  k()
], z.prototype, "_saving", 2);
F([
  k()
], z.prototype, "_error", 2);
F([
  k()
], z.prototype, "_conflict", 2);
F([
  k()
], z.prototype, "_history", 2);
F([
  k()
], z.prototype, "_svgSize", 2);
F([
  bt("svg.canvas")
], z.prototype, "_svg", 2);
z = F([
  Te("fp-editor")
], z);
function os(e) {
  const t = { w: e.w };
  return e.entity && (t.entity = e.entity), e.hinge && (t.hinge = e.hinge), t;
}
function fe(e) {
  return Math.round(e * 10) / 10;
}
function ss(e, t) {
  const i = (t % 360 + 360) % 360, n = (i + 180) % 360, o = (e % 360 + 360) % 360, s = (r) => Math.min(Math.abs(r - o), 360 - Math.abs(r - o));
  return fe(s(i) <= s(n) ? i : n);
}
function rn(e) {
  return e >= 100 ? `${(e / 100).toFixed(2).replace(".", ",")} m` : `${Math.round(e)} cm`;
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _c = { CHILD: 2 }, Ri = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Fi = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, i, n) {
    this._$Ct = t, this._$AM = i, this._$Ci = n;
  }
  _$AS(t, i) {
    return this.update(t, i);
  }
  update(t, i) {
    return this.render(...i);
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: vc } = gl, rs = (e) => e, as = () => document.createComment(""), kt = (e, t, i) => {
  const n = e._$AA.parentNode, o = t === void 0 ? e._$AB : t._$AA;
  if (i === void 0) {
    const s = n.insertBefore(as(), o), r = n.insertBefore(as(), o);
    i = new vc(s, r, e, e.options);
  } else {
    const s = i._$AB.nextSibling, r = i._$AM, a = r !== e;
    if (a) {
      let l;
      i._$AQ?.(e), i._$AM = e, i._$AP !== void 0 && (l = e._$AU) !== r._$AU && i._$AP(l);
    }
    if (s !== o || a) {
      let l = i._$AA;
      for (; l !== s; ) {
        const c = rs(l).nextSibling;
        rs(n).insertBefore(l, o), l = c;
      }
    }
  }
  return i;
}, Ue = (e, t, i = e) => (e._$AI(t, i), e), xc = {}, Tr = (e, t = xc) => e._$AH = t, wc = (e) => e._$AH, an = (e) => {
  e._$AR(), e._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ls = (e, t, i) => {
  const n = /* @__PURE__ */ new Map();
  for (let o = t; o <= i; o++) n.set(e[o], o);
  return n;
}, $e = Ri(class extends Fi {
  constructor(e) {
    if (super(e), e.type !== _c.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e, t, i) {
    let n;
    i === void 0 ? i = t : t !== void 0 && (n = t);
    const o = [], s = [];
    let r = 0;
    for (const a of e) o[r] = n ? n(a, r) : r, s[r] = i(a, r), r++;
    return { values: s, keys: o };
  }
  render(e, t, i) {
    return this.dt(e, t, i).values;
  }
  update(e, [t, i, n]) {
    const o = wc(e), { values: s, keys: r } = this.dt(t, i, n);
    if (!Array.isArray(o)) return this.ut = r, s;
    const a = this.ut ??= [], l = [];
    let c, h, d = 0, p = o.length - 1, m = 0, g = s.length - 1;
    for (; d <= p && m <= g; ) if (o[d] === null) d++;
    else if (o[p] === null) p--;
    else if (a[d] === r[m]) l[m] = Ue(o[d], s[m]), d++, m++;
    else if (a[p] === r[g]) l[g] = Ue(o[p], s[g]), p--, g--;
    else if (a[d] === r[g]) l[g] = Ue(o[d], s[g]), kt(e, l[g + 1], o[d]), d++, g--;
    else if (a[p] === r[m]) l[m] = Ue(o[p], s[m]), kt(e, o[d], o[p]), p--, m++;
    else if (c === void 0 && (c = ls(r, m, g), h = ls(a, d, p)), c.has(a[d])) if (c.has(a[p])) {
      const b = h.get(r[m]), v = b !== void 0 ? o[b] : null;
      if (v === null) {
        const x = kt(e, o[d]);
        Ue(x, s[m]), l[m] = x;
      } else l[m] = Ue(v, s[m]), kt(e, o[d], v), o[b] = null;
      m++;
    } else an(o[p]), p--;
    else an(o[d]), d++;
    for (; m <= g; ) {
      const b = kt(e, l[g + 1]);
      Ue(b, s[m]), l[m++] = b;
    }
    for (; d <= p; ) {
      const b = o[d++];
      b !== null && an(b);
    }
    return this.ut = r, Tr(e, l), ve;
  }
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ir = Ri(class extends Fi {
  constructor() {
    super(...arguments), this.key = f;
  }
  render(e, t) {
    return this.key = e, t;
  }
  update(e, [t, i]) {
    return t !== this.key && (Tr(e), this.key = t), i;
  }
});
class cs {
  constructor(t) {
    this._hass = t;
  }
  getEntityState(t) {
    return this._hass.states[t];
  }
}
class $c {
  constructor(t, i, n) {
    this._historyService = t, this._fallback = i, this._timestamp = n, this._historicalStates = this._historyService.getStateAt(this._timestamp);
  }
  getEntityState(t) {
    const i = this._historicalStates.get(t);
    if (i) return i;
    const n = this._fallback.getEntityState(t);
    return n ? { ...n, attributes: { ...n.attributes ?? {} } } : void 0;
  }
}
function kc(e, t, i, n) {
  return e ? i ? new $c(t, new cs(e), n) : new cs(e) : { getEntityState: () => {
  } };
}
function Sc(e, t, i, n, o) {
  if (!e) return;
  const s = kc(e, i, n, o), r = {};
  for (const a of t)
    r[a] = s.getEntityState(a);
  return {
    states: r,
    formatEntityState: (a) => e.formatEntityState(a),
    formatEntityAttributeValue: e.formatEntityAttributeValue ? (a, l) => e.formatEntityAttributeValue(a, l) : void 0
  };
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ec = {}, ds = Ri(class extends Fi {
  constructor() {
    super(...arguments), this.ot = Ec;
  }
  render(e, t) {
    return t();
  }
  update(e, [t, i]) {
    if (Array.isArray(t)) {
      if (Array.isArray(this.ot) && this.ot.length === t.length && t.every((n, o) => n === this.ot[o])) return ve;
    } else if (this.ot === t) return ve;
    return this.ot = Array.isArray(t) ? Array.from(t) : t, this.render(t, i);
  }
}), Ac = /* @__PURE__ */ new Set([
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
]), Mc = /^[a-z0-9#%.,/_() +*-]+$/i, Cc = /([a-z][a-z0-9-]*)\s*\(/gi;
function j(e) {
  if (typeof e != "string") return;
  const t = e.trim();
  if (!t || !Mc.test(t) || t.includes("/*") || t.includes("*/") || !/^[a-z#]/i.test(t)) return;
  let i = 0;
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    if (s === "(") i++;
    else if (s === ")" && --i < 0) return;
  }
  if (i !== 0) return;
  const n = new RegExp(Cc.source, "gi");
  for (let o; o = n.exec(t); )
    if (!Ac.has(o[1].toLowerCase())) return;
  return t;
}
function de(e, t) {
  return j(e) ?? t;
}
function R(e, t) {
  if (e == null || typeof e == "string" && e.trim() === "") return t;
  const i = typeof e == "number" ? e : Number(e);
  return Number.isFinite(i) ? i : t;
}
function le(e) {
  if (typeof e != "string") return;
  const t = e.trim().replace(/[^a-zA-Z0-9_-]/g, "");
  return t === "" ? void 0 : t;
}
const Tc = {
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
function Ic(e) {
  const t = e.trim().toLowerCase(), i = Tc[t];
  if (i) return i;
  const n = /^#([0-9a-f]{3,8})$/i.exec(t);
  if (n) {
    const s = n[1];
    return s.length === 3 || s.length === 4 ? [0, 1, 2].map((r) => parseInt(s[r] + s[r], 16)) : s.length === 6 || s.length === 8 ? [0, 2, 4].map((r) => parseInt(s.slice(r, r + 2), 16)) : void 0;
  }
  const o = /^rgba?\(([^)]*)\)$/.exec(t);
  if (o) {
    const s = o[1].split(/[\s,/]+/).filter((a) => a !== "");
    if (s.length < 3) return;
    const r = s.slice(0, 3).map((a) => {
      if (a.endsWith("%")) {
        const l = Number(a.slice(0, -1));
        return Number.isFinite(l) ? l / 100 * 255 : NaN;
      }
      return Number(a);
    });
    return r.some((a) => !Number.isFinite(a)) ? void 0 : r.map((a) => Math.max(0, Math.min(255, a)));
  }
}
function Yn([e, t, i]) {
  const n = (o) => {
    const s = o / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * n(e) + 0.7152 * n(t) + 0.0722 * n(i);
}
const Pc = "#212121", Oc = "#ffffff", zc = Yn([33, 33, 33]), Lc = Yn([255, 255, 255]);
function Pr(e) {
  if (typeof e != "string") return;
  const t = Ic(e);
  if (!t) return;
  const i = Yn(t), n = (o) => (Math.max(i, o) + 0.05) / (Math.min(i, o) + 0.05);
  return n(zc) >= n(Lc) ? Pc : Oc;
}
const Rc = /^[a-z0-9]+(?:-[a-z0-9]+)*:[a-z0-9]+(?:-[a-z0-9]+)*$/i;
function Ot(e) {
  if (typeof e != "string") return;
  const t = e.trim();
  return Rc.test(t) ? t : void 0;
}
function Ne(e) {
  if (typeof e != "string") return;
  const t = e.trim().replace(/[^a-zA-Z0-9_.-]/g, "");
  return t === "" ? void 0 : t;
}
const Di = "default", Or = 10, _i = [
  {
    id: Di,
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
], Ni = "var(--fp-skin-bg, var(--card-background-color, #fff))", Jn = "var(--fp-skin-wall, var(--primary-text-color))", zr = "var(--fp-skin-text, var(--primary-text-color))", G = "var(--fp-skin-accent, var(--primary-color, #03a9f4))", ln = "var(--fp-skin-active, var(--state-light-active-color, var(--state-active-color, #fdd835)))", Be = "var(--fp-skin-badge-bg, var(--card-background-color, #fff))";
function Qn(e) {
  if (typeof e == "string")
    return _i.find((t) => t.id === e);
}
function Fc(e) {
  const t = Qn(e);
  return t ? Object.entries(t.vars).map(([i, n]) => `${i}:${n};`).join("") : "";
}
function Dc(e) {
  const t = Qn(e);
  return t && t.id !== Di ? t.id : void 0;
}
const Nc = Ae(
  _i.filter((e) => e.id !== Di).map(
    (e) => `:host([data-skin="${e.id}"]){` + Object.entries(e.vars).map(([t, i]) => `${t}:${i};`).join("") + "}"
  ).join(`
`)
), Lr = oe`
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
`, Hc = 6e4, jc = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
function Rr(e) {
  return jc.has(e);
}
function eo(e) {
  if (e === "") return;
  const t = Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function Fr(e) {
  let t = 0;
  for (const i of e)
    if (!Rr(i.newState)) {
      if (eo(i.newState) === void 0) return !1;
      t++;
    }
  return t > 0;
}
function Wc(e, t, i) {
  const n = e.map((c) => eo(c.newState)), o = n.filter((c) => c !== void 0);
  if (!o.length) return e;
  const s = (Math.max(...o) - Math.min(...o)) / t;
  if (!(s > 0) && !e.some((c) => Rr(c.newState)))
    return e.length ? [e[0], e[e.length - 1]] : [];
  const r = [e[0]];
  let a = n[0], l = e[0].timestamp;
  for (let c = 1; c < e.length - 1; c++) {
    const h = n[c];
    if (h === void 0) {
      r.push(e[c]), a = void 0, l = e[c].timestamp;
      continue;
    }
    if (a === void 0) {
      r.push(e[c]), a = h, l = e[c].timestamp;
      continue;
    }
    const d = n[c - 1], p = n[c + 1], m = d !== void 0 && p !== void 0 && (h > d && h >= p || h < d && h <= p);
    (Math.abs(h - a) >= s || m && Math.abs(h - a) >= s / 2 || e[c].timestamp - l >= i) && (r.push(e[c]), a = h, l = e[c].timestamp);
  }
  return e.length > 1 && r.push(e[e.length - 1]), r;
}
function Uc(e, t = {}) {
  const i = t.numericSteps ?? 0;
  return !(i > 0) || e.length < 3 || !Fr(e) ? e : Wc(e, i, t.maxGapMs ?? Hc);
}
function Bc(e, t = {}) {
  if (!(t.numericSteps ?? 0) || e.length === 0) return e;
  const i = /* @__PURE__ */ new Map();
  for (const o of e) {
    const s = i.get(o.entityId);
    s ? s.push(o) : i.set(o.entityId, [o]);
  }
  const n = /* @__PURE__ */ new Set();
  for (const o of i.values())
    for (const s of Uc(o, t)) n.add(s);
  return e.filter((o) => n.has(o));
}
function Gc(e, t) {
  if (!(t > 2) || e.length <= t || !Fr(e)) return e;
  const i = e.map((r) => eo(r.newState)), n = /* @__PURE__ */ new Set([0, e.length - 1]);
  for (let r = 0; r < e.length; r++)
    i[r] === void 0 && n.add(r);
  const o = [];
  let s;
  for (let r = 0; r < e.length; r++) {
    const a = i[r];
    if (a === void 0) {
      s = void 0;
      continue;
    }
    r > 0 && r < e.length - 1 && s !== void 0 && o.push({ i: r, delta: Math.abs(a - s) }), s = a;
  }
  o.sort((r, a) => a.delta - r.delta);
  for (const { i: r } of o) {
    if (n.size >= t) break;
    n.add(r);
  }
  return e.filter((r, a) => n.has(a));
}
function Ut(e) {
  const t = typeof e.color == "string" ? j(e.color) : void 0;
  if (t) return t;
  const i = e.attributes?.color, n = typeof i == "string" ? j(i) : void 0;
  if (n) return n;
  const o = String(e.newState ?? "").trim().toLowerCase();
  return e.entityId.startsWith("light.") ? o === "off" ? Be : ln : e.entityId.startsWith("cover.") ? o === "closed" ? Be : G : e.entityId.startsWith("sensor.") || e.entityId.startsWith("binary_sensor.") ? o === "off" ? Be : G : e.entityId.startsWith("fan.") ? o === "off" ? Be : ln : e.entityId.startsWith("media_player.") ? o === "idle" ? Be : ln : o === "on" || o === "open" || o === "playing" || o === "home" || o === "locked" || o === "unlocked" ? G : Be;
}
class qc {
  constructor(t = {}) {
    this._cache = /* @__PURE__ */ new Map(), this._events = [], this._eventsByEntity = /* @__PURE__ */ new Map(), this._maxCacheEntries = 8, this._loadCommitId = 0, this._loader = t.loader ?? (async () => []);
  }
  configure(t = {}) {
    this._context = t;
  }
  async loadHistory(t, i, n = {}) {
    const o = ++this._loadCommitId, s = n.scopeKey ?? "all", r = `${t}:${i}:${s}:${n.numericSteps ?? 0}`;
    if (this._cache.has(r)) {
      if (o === this._loadCommitId) {
        const p = this._cache.get(r);
        this._events = p, this._eventsByEntity = this._groupEventsByEntity(p);
      }
      return;
    }
    const a = n.hass ?? this._context?.hass, l = n.watched ?? this._context?.watched, h = (a && Array.isArray(l) ? await this._loadFromHass(a, t, i, l) : await this._loader(t, i, { ...this._context, ...n, hass: a, watched: l })).slice().sort((p, m) => p.timestamp - m.timestamp).map((p) => ({
      ...p,
      attributes: p.attributes ?? {}
    })), d = Bc(h, { numericSteps: n.numericSteps });
    if (o === this._loadCommitId) {
      if (this._cache.set(r, d), this._cache.size > this._maxCacheEntries) {
        const p = this._cache.keys().next().value;
        p && this._cache.delete(p);
      }
      this._events = d, this._eventsByEntity = this._groupEventsByEntity(d);
    }
  }
  async loadFromHass(t, i, n, o) {
    return this._loadFromHass(t, i, n, o);
  }
  async _loadFromHass(t, i, n, o) {
    if (!o.length) return [];
    const s = t.callWS, r = t.callApi, a = new Date(i * 1e3).toISOString(), l = new Date(n * 1e3).toISOString(), c = new Set(o), h = {
      type: "history/history_during_period",
      start_time: a,
      end_time: l,
      minimal_response: !1,
      no_attributes: !1,
      significant_changes_only: !1,
      entity_ids: o
    };
    let d;
    if (typeof s == "function")
      try {
        d = await s(h);
      } catch (p) {
        console.warn("[easy-floorplan] Replay WS history query failed", { startTime: a, endTime: l, watchedCount: o.length, error: p });
      }
    if (!d && typeof r == "function")
      try {
        d = await r("GET", `history/period/${encodeURIComponent(a)}`, {
          end_time: l,
          filter_entity_id: o.join(","),
          minimal_response: !1,
          no_attributes: !1,
          significant_changes_only: !1
        });
      } catch (p) {
        console.warn("[easy-floorplan] Replay REST history query failed", { startTime: a, endTime: l, watchedCount: o.length, error: p });
      }
    if (!d)
      throw new Error(`Unable to load history via websocket or REST API (ws:${typeof s == "function" ? "yes" : "no"}, api:${typeof r == "function" ? "yes" : "no"}).`);
    return this._normalizeHistoryPayload(d, i, n, c);
  }
  _normalizeHistoryPayload(t, i, n, o) {
    const s = /* @__PURE__ */ new Map(), r = (p, m) => {
      if (typeof p == "number")
        return Number.isFinite(p) ? p > 1e12 ? p / 1e3 : p : Number.NaN;
      if (typeof p == "string") {
        const g = Number(p);
        if (Number.isFinite(g)) return g > 1e12 ? g / 1e3 : g;
        const b = Date.parse(p) / 1e3;
        return Number.isFinite(b) ? b : Number.NaN;
      }
      return Date.parse(m) / 1e3;
    }, a = (p, m) => {
      for (const g of m) {
        const b = p[g];
        if (b !== void 0) return b;
      }
    }, l = (p, m) => {
      const g = m.filter((b) => !!b && typeof b == "object");
      g.length && s.set(p, g.map((b) => {
        const v = a(b, ["state", "s"]), x = a(b, ["attributes", "a"]), $ = a(b, ["last_updated", "lu"]), y = a(b, ["last_changed", "lc"]);
        return {
          state: typeof v == "string" || typeof v == "number" || typeof v == "boolean" ? String(v) : void 0,
          attributes: x && typeof x == "object" ? x : void 0,
          last_updated: typeof $ == "string" || typeof $ == "number" ? $ : void 0,
          last_changed: typeof y == "string" || typeof y == "number" ? y : void 0
        };
      }));
    };
    if (Array.isArray(t))
      for (const p of t) {
        if (!p || typeof p != "object") continue;
        const m = p, g = typeof m.entity_id == "string" ? m.entity_id : void 0, b = Array.isArray(m.states) ? m.states : Array.isArray(m.history) ? m.history : [];
        g && b.length && l(g, b);
      }
    else if (t && typeof t == "object")
      for (const [p, m] of Object.entries(t)) {
        if (Array.isArray(m) && m.length) {
          l(p, m);
          continue;
        }
        if (m && typeof m == "object") {
          const g = m;
          Array.isArray(g.states) && g.states.length && l(p, g.states);
        }
      }
    if (!s.size)
      throw new Error("History payload contained no parseable state rows.");
    const c = [], h = new Date(n * 1e3).toISOString();
    for (const [p, m] of s.entries())
      if (m.length && o.has(p)) {
        if (m.length === 1) {
          const g = m[0], b = r(g.last_updated ?? g.last_changed, h);
          if (!Number.isFinite(b) || b < i || b > n)
            continue;
          c.push({
            timestamp: b,
            entityId: p,
            oldState: g.state ?? "unknown",
            newState: g.state ?? "unknown",
            attributes: g.attributes ?? {}
          });
          continue;
        }
        for (let g = 1; g < m.length; g += 1) {
          const b = m[g - 1], v = m[g], x = r(b.last_updated ?? b.last_changed, h), $ = r(v.last_updated ?? v.last_changed, h);
          if (!Number.isFinite(x) || !Number.isFinite($) || $ < i || x > n)
            continue;
          const y = b.state !== v.state, w = !this._attributesEqual(b.attributes ?? {}, v.attributes ?? {});
          !y && !w || c.push({
            timestamp: $,
            entityId: p,
            oldState: b.state ?? "unknown",
            newState: v.state ?? "unknown",
            attributes: {
              ...b.attributes ?? {},
              ...v.attributes ?? {}
            }
          });
        }
      }
    return c.sort((p, m) => p.timestamp - m.timestamp);
  }
  _attributesEqual(t, i) {
    if (t === i) return !0;
    if (!t || !i) return !t && !i;
    if (typeof t != typeof i) return !1;
    if (Array.isArray(t) || Array.isArray(i)) {
      if (!Array.isArray(t) || !Array.isArray(i) || t.length !== i.length) return !1;
      for (let a = 0; a < t.length; a += 1)
        if (!this._attributesEqual(t[a], i[a])) return !1;
      return !0;
    }
    if (typeof t != "object") return !1;
    const n = t, o = i, s = Object.keys(n), r = Object.keys(o);
    if (s.length !== r.length) return !1;
    for (const a of s)
      if (!(a in o) || !this._attributesEqual(n[a], o[a])) return !1;
    return !0;
  }
  clearCache() {
    this._loadCommitId += 1, this._cache.clear(), this._events = [], this._eventsByEntity.clear();
  }
  getStateAt(t) {
    const i = /* @__PURE__ */ new Map();
    for (const [n, o] of this._eventsByEntity.entries()) {
      const s = this._findLastEventAtOrBefore(o, t);
      if (s) {
        i.set(n, this._toHassEntity(n, s.newState, s.attributes, s.timestamp));
        continue;
      }
      const r = o[0];
      r && i.set(n, this._toHassEntity(n, r.oldState, r.attributes, 0));
    }
    return i;
  }
  _groupEventsByEntity(t) {
    const i = /* @__PURE__ */ new Map();
    for (const n of t) {
      const o = i.get(n.entityId) ?? [];
      o.push(n), i.set(n.entityId, o);
    }
    for (const n of i.values())
      n.sort((o, s) => o.timestamp - s.timestamp);
    return i;
  }
  _findLastEventAtOrBefore(t, i) {
    let n = 0, o = t.length - 1, s;
    for (; n <= o; ) {
      const r = n + o >> 1, a = t[r];
      a.timestamp <= i ? (s = a, n = r + 1) : o = r - 1;
    }
    return s;
  }
  _toHassEntity(t, i, n, o) {
    const s = Number.isFinite(o) ? o : Date.now() / 1e3;
    return {
      entity_id: t,
      state: i,
      attributes: n ?? {},
      last_changed: new Date(s * 1e3).toISOString(),
      last_updated: new Date(s * 1e3).toISOString(),
      context: { id: "history", parent_id: null, user_id: null }
    };
  }
  getEvents() {
    return this._events.slice();
  }
  getEventBefore(t) {
    if (!this._events.length) return;
    let i = 0, n = this._events.length - 1, o = -1;
    for (; i <= n; ) {
      const s = i + n >> 1;
      this._events[s].timestamp <= t ? (o = s, i = s + 1) : n = s - 1;
    }
    return o >= 0 ? this._events[o] : void 0;
  }
  getEventAfter(t) {
    if (!this._events.length) return;
    let i = 0, n = this._events.length - 1, o = this._events.length;
    for (; i <= n; ) {
      const s = i + n >> 1;
      this._events[s].timestamp >= t ? (o = s, n = s - 1) : i = s + 1;
    }
    return o < this._events.length ? this._events[o] : void 0;
  }
}
var Kc = Object.defineProperty, Vc = Object.getOwnPropertyDescriptor, Je = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Vc(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Kc(t, i, o), o;
};
let ge = class extends te {
  constructor() {
    super(...arguments), this.events = [], this.startTime = 0, this.endTime = 0, this.currentTime = 0, this.expanded = !1, this._dragging = !1, this._hidden = /* @__PURE__ */ new Set();
  }
  _toggleLane(e) {
    const t = new Set(this._hidden);
    t.delete(e) || t.add(e), this._hidden = t;
  }
  _showAllLanes() {
    this._hidden = /* @__PURE__ */ new Set();
  }
  _seek(e) {
    this.dispatchEvent(new CustomEvent("seek", { detail: { timestamp: e }, bubbles: !0, composed: !0 }));
  }
  _formatTimestamp(e) {
    return Number.isFinite(e) ? new Intl.DateTimeFormat(void 0, {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit"
    }).format(new Date(e * 1e3)) : "—";
  }
  _getMarkerLeft(e) {
    return `${(e - this.startTime) / Math.max(1, this.endTime - this.startTime) * 100}%`;
  }
  /**
   * Keep markers visually centered while preventing edge overflow that can
   * trigger horizontal scrollbars in tight containers.
   */
  _getMarkerLeftClamped(e, t) {
    const i = this._getMarkerLeft(e);
    return `clamp(${t}px, ${i}, calc(100% - ${t}px))`;
  }
  /** This timestamp as a 0-100 position in the window, unitless for calc(). */
  _pct(e) {
    return (e - this.startTime) / Math.max(1, this.endTime - this.startTime) * 100;
  }
  _markerStyle(e, t = "0px") {
    const i = Ut(e), n = `left:${this._getMarkerLeftClamped(e.timestamp, 7)};--stack-offset:${t};--marker-pct:${this._pct(e.timestamp)};`;
    return i ? `${n}background:${i};box-shadow:0 0 0 2px ${i}22;` : n;
  }
  _formatEventTitle(e) {
    return `${this._formatTimestamp(e.timestamp)} · ${e.entityId}: ${e.oldState} → ${e.newState}`;
  }
  _formatClusterTitle(e) {
    return e.map((t) => this._formatEventTitle(t)).join(`
`);
  }
  _visibleEvents() {
    if (!this.events.length) return [];
    const e = this.startTime, t = this.endTime;
    return this.events.filter((i) => i.timestamp >= e && i.timestamp <= t);
  }
  /**
   * The events this timeline draws — every discrete state change, and the
   * largest moves of each numeric sensor up to what a lane can show. Replay
   * itself still reads the full series; this only decides what gets a marker.
   */
  /** Each entity's lane, display-thinned. Hidden lanes are still in here, so
   *  the expanded view can keep their label on screen to switch back on. */
  _laneSeries() {
    const e = /* @__PURE__ */ new Map();
    for (const t of this._visibleEvents()) {
      const i = e.get(t.entityId);
      i ? i.push(t) : e.set(t.entityId, [t]);
    }
    for (const [t, i] of e)
      e.set(t, Gc(i, ge.MAX_MARKERS_PER_LANE));
    return e;
  }
  /**
   * What the summary bar draws: every lane that is switched on. Hiding a lane
   * takes its events out of here too, which is the point — a summary that
   * still counted a lane you had switched off would not be a summary of what
   * you are looking at.
   */
  _drawnEvents() {
    const e = [];
    for (const [t, i] of this._laneSeries())
      this._hidden.has(t) || e.push(...i);
    return e.sort((t, i) => t.timestamp - i.timestamp);
  }
  _groupEventsByTimestamp() {
    const e = this._drawnEvents(), t = /* @__PURE__ */ new Map();
    for (const i of e) {
      const n = t.get(i.timestamp);
      n ? n.push(i) : t.set(i.timestamp, [i]);
    }
    return Array.from(t.entries()).map(([i, n]) => ({
      timestamp: i,
      events: n,
      left: this._getMarkerLeft(i)
    }));
  }
  _getEntityLabel(e) {
    const t = e.attributes ?? {};
    return ((typeof t.friendly_name == "string" ? t.friendly_name : void 0)?.trim() || e.entityId).replace(/^./, (o) => o.toUpperCase());
  }
  _seekFromClientX(e) {
    const t = this.expanded ? ".timeline-track-overlay" : ".timeline", i = this.shadowRoot?.querySelector(t)?.getBoundingClientRect();
    if (!i) return;
    const n = Math.max(1, this.endTime - this.startTime), o = Math.min(1, Math.max(0, (e - i.left) / i.width)), s = Math.round(this.startTime + o * n);
    this._seek(s);
  }
  _handleTimelineClick(e) {
    this._seekFromClientX(e.clientX);
  }
  _handleKeyDown(e) {
    const t = Math.max(1, this.endTime - this.startTime), i = Math.max(1, Math.round(t / 100));
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        this._seek(Math.max(this.startTime, this.currentTime - i)), e.preventDefault();
        break;
      case "ArrowRight":
      case "ArrowUp":
        this._seek(Math.min(this.endTime, this.currentTime + i)), e.preventDefault();
        break;
      case "Home":
        this._seek(this.startTime), e.preventDefault();
        break;
      case "End":
        this._seek(this.endTime), e.preventDefault();
        break;
    }
  }
  /**
   * The way back. Switching a lane off in the expanded view and then
   * collapsing would otherwise strand it: the summary bar has no labels to
   * click, so nothing on screen would say anything was missing.
   */
  _renderHiddenNotice() {
    if (!this._hidden.size) return f;
    const e = this._hidden.size;
    return u`
      <div class="lanes-hidden">
        <span>${e} lane${e === 1 ? "" : "s"} hidden</span>
        <button class="lanes-hidden-show" @click=${() => this._showAllLanes()}>Show all</button>
      </div>
    `;
  }
  _renderExpandedTimeline(e) {
    const t = this._laneSeries(), i = Array.from(t.keys()), n = (this.currentTime - this.startTime) / e * 100;
    return u`
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
        @click=${(o) => this._handleTimelineClick(o)}
        @pointerdown=${(o) => this._handlePointerDown(o)}
        @pointermove=${(o) => this._handlePointerMove(o)}
        @pointerup=${(o) => this._handlePointerUp(o)}
        @pointerleave=${(o) => this._handlePointerUp(o)}
        @keydown=${this._handleKeyDown}
      >
        <div class="timeline-track-overlay" style="grid-row:1 / span ${i.length};" aria-hidden="true">
          <div class="playhead playhead-expanded" style="left:${n}%">
            <span class="playhead-time">${this._formatTimestamp(this.currentTime)}</span>
          </div>
        </div>
        ${ds([this.events, this.startTime, this.endTime, this._hidden], () => i.map((o, s) => {
      const r = t.get(o) ?? [], a = s + 1, l = this._getEntityLabel(r[0]), c = this._hidden.has(o);
      return u`
            <button
              class="lane-label ${c ? "lane-off" : ""}"
              style="grid-row:${a};"
              aria-pressed=${c ? "false" : "true"}
              title=${c ? `Show ${l} on the timeline` : `Hide ${l} from the timeline`}
              @click=${(h) => {
        h.stopPropagation(), this._toggleLane(o);
      }}
            ><span class="lane-dot" aria-hidden="true"></span><span class="lane-name">${l}</span></button>
            <div class="lane lane-track ${c ? "lane-off" : ""}" style="grid-row:${a};">
              ${(c ? [] : r).map((h) => {
        const d = Ut(h), p = this._getMarkerLeftClamped(h.timestamp, 4);
        return u`
                  <button
                    class="marker"
                    style=${`left:${p};--marker-pct:${this._pct(h.timestamp)};${d ? `background:${d};box-shadow:0 0 0 2px ${d}22;` : ""}`}
                    title=${this._formatEventTitle(h)}
                    @click=${(m) => {
          m.stopPropagation(), this._seek(h.timestamp);
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
  _handlePointerDown(e) {
    this._dragging = !0, this._updateFromPointer(e);
  }
  _handlePointerMove(e) {
    this._dragging && this._updateFromPointer(e);
  }
  _handlePointerUp(e) {
    this._dragging && (this._dragging = !1, this._updateFromPointer(e));
  }
  _updateFromPointer(e) {
    this._seekFromClientX(e.clientX);
  }
  render() {
    if (!this.events.length)
      return u`<div class="timeline-empty">No history available.</div>`;
    const e = Math.max(1, this.endTime - this.startTime);
    return this.expanded ? u`${this._renderHiddenNotice()}${this._renderExpandedTimeline(e)}` : u`
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
        @click=${(t) => this._handleTimelineClick(t)}
        @pointerdown=${(t) => this._handlePointerDown(t)}
        @pointermove=${(t) => this._handlePointerMove(t)}
        @pointerup=${(t) => this._handlePointerUp(t)}
        @pointerleave=${(t) => this._handlePointerUp(t)}
        @keydown=${this._handleKeyDown}
      >
        <div class="track"></div>
        <div class="playhead" style="left:${this._pct(this.currentTime)}%">
          <span class="playhead-time">${this._formatTimestamp(this.currentTime)}</span>
        </div>
        ${ds([this.events, this.startTime, this.endTime], () => this._groupEventsByTimestamp().map((t) => u`
          <div
            class="marker-cluster"
            style="left:${this._getMarkerLeftClamped(t.timestamp, 7)};--marker-pct:${this._pct(t.timestamp)};"
            title=${this._formatClusterTitle(t.events)}
            @click=${(i) => {
      i.stopPropagation(), this._seek(t.timestamp);
    }}
          >
            ${t.events.map((i, n) => {
      const o = n === 0 ? "-2px" : n === 1 ? "2px" : n === 2 ? "-4px" : "4px";
      return u`
                <button
                  class="marker"
                  style=${this._markerStyle(i, o)}
                  title=${this._formatEventTitle(i)}
                  @click=${(s) => {
        s.stopPropagation(), this._seek(i.timestamp);
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
ge.MAX_MARKERS_PER_LANE = 150;
ge.styles = oe`
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
    .playhead { position: absolute; top: -2px; width: 2px; height: calc(100% + 4px); background: ${Ae(G)}; }
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
      background: ${Ae(G)};
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
Je([
  A({ attribute: !1 })
], ge.prototype, "events", 2);
Je([
  A({ type: Number })
], ge.prototype, "startTime", 2);
Je([
  A({ type: Number })
], ge.prototype, "endTime", 2);
Je([
  A({ type: Number })
], ge.prototype, "currentTime", 2);
Je([
  A({ type: Boolean })
], ge.prototype, "expanded", 2);
Je([
  k()
], ge.prototype, "_hidden", 2);
ge = Je([
  Li("easy-floorplan-history-timeline")
], ge);
function hs(e) {
  return !!e?.haArea && (e.filterEntities ?? !0);
}
const ps = -6, Zc = 6, to = 0.45, vi = 1, Dr = "scale", Nr = "dim", us = 0.92, fs = 80, ms = 260, Mn = 0.25, Cn = 4, Hr = 10, Tn = 1, io = 14, Xc = 3, Hi = 140, jr = "var(--fp-skin-glow, #ffd9a0)", gs = 0.18, xi = 0.6, ys = 0.5, bs = 0.45, Yc = 0.5, no = 14, Ke = 34, wi = 34, zt = 16, ji = 80, Wi = 0, Ui = 360, Jc = "var(--fp-skin-furniture, #9e9e9e)", pt = 1e3, Bt = 600, oo = 20, _s = 50;
function Qc(e, t) {
  return e ?? t;
}
function vs(e, t) {
  return t <= 0 ? 100 : Math.round(e / t * 100);
}
function cn(e, t) {
  return Math.max(1, Math.round(t * e / 100));
}
function xs(e) {
  const t = e?.floors;
  return !t || typeof t != "object" ? [] : Object.values(t).filter((i) => !!i && typeof i.floor_id == "string" && typeof i.name == "string").sort((i, n) => (i.level ?? 0) - (n.level ?? 0) || i.name.localeCompare(n.name));
}
function ed(e) {
  const t = e?.areas;
  return !t || typeof t != "object" ? [] : Object.values(t).filter((i) => !!i && typeof i.area_id == "string" && typeof i.name == "string").sort((i, n) => i.name.localeCompare(n.name));
}
function td(e, t) {
  if (!("name" in e)) return e;
  const i = (e.name ?? "").toString().trim(), n = id(t, i);
  return { ...e, name: n ? n.name : i || void 0, haArea: n?.area_id };
}
function id(e, t) {
  const i = (t ?? "").trim();
  if (!i) return;
  const n = e.find((a) => a.name === i);
  if (n) return n;
  const o = i.toLowerCase(), s = e.find((a) => a.name.toLowerCase() === o);
  if (s) return s;
  const r = o.replace(/\s+/g, " ");
  return e.find((a) => a.name.trim().toLowerCase().replace(/\s+/g, " ") === r);
}
function nd(e, t) {
  const i = e, n = i?.entities?.[t];
  return n ? n.area_id ? n.area_id : (n.device_id ? i?.devices?.[n.device_id] : void 0)?.area_id ?? void 0 : void 0;
}
function dn(e, t) {
  const n = e?.entities;
  return !n || typeof n != "object" ? [] : Object.keys(n).filter((o) => nd(e, o) === t);
}
function od(e) {
  return {
    type: e,
    width: pt,
    height: Bt,
    grid: oo,
    walls: [],
    openings: [],
    items: [],
    texts: [],
    furniture: [],
    trackers: [],
    areas: []
  };
}
function sd() {
  return { overlayScale: "plan" };
}
function X(e) {
  return `${e}_${Math.random().toString(36).slice(2, 9)}`;
}
function In(e, t) {
  if (e === t) return !0;
  if (Array.isArray(e) || Array.isArray(t))
    return !Array.isArray(e) || !Array.isArray(t) || e.length !== t.length ? !1 : e.every((o, s) => In(o, t[s]));
  if (typeof e != "object" || typeof t != "object" || e === null || t === null) return !1;
  const i = e, n = t;
  for (const o of /* @__PURE__ */ new Set([...Object.keys(i), ...Object.keys(n)]))
    if (!In(i[o], n[o])) return !1;
  return !0;
}
function rd(e, t = []) {
  return {
    id: X("floor"),
    name: e,
    walls: t,
    openings: [],
    items: [],
    texts: [],
    furniture: [],
    trackers: [],
    areas: []
  };
}
function ad(e) {
  return {
    ...e,
    walls: e.walls ?? [],
    openings: e.openings ?? [],
    items: e.items ?? [],
    texts: e.texts ?? [],
    furniture: e.furniture ?? [],
    trackers: e.trackers ?? [],
    areas: e.areas ?? []
  };
}
function ld(e) {
  const t = /* @__PURE__ */ new Set();
  return e.map((i, n) => {
    let o = i.id || `floor_${n + 1}`;
    for (; t.has(o); ) o = `${o}_${n + 1}`;
    return t.add(o), o === i.id ? i : { ...i, id: o };
  });
}
function cd(e, t, i) {
  const n = e.findIndex((a) => a.id === t), o = n + i;
  if (n < 0 || o < 0 || o >= e.length) return null;
  const s = [...e], [r] = s.splice(n, 1);
  return s.splice(o, 0, r), s;
}
function mt(e) {
  return e.floors && e.floors.length ? ld(e.floors.map(ad)) : [
    {
      id: "floor_main",
      name: "Floor 1",
      walls: e.walls ?? [],
      openings: e.openings ?? [],
      items: e.items ?? [],
      texts: e.texts ?? [],
      furniture: e.furniture ?? [],
      trackers: e.trackers ?? [],
      areas: e.areas ?? []
    }
  ];
}
function $i(e, t) {
  if (!t) return null;
  const i = e?.[t.entity]?.state;
  if (i == null || i === "unavailable" || i === "unknown") return !1;
  const n = i === "on" || i === "open" || i === "home" || i === "detected";
  return t.invert ? !n : n;
}
function ws(e, t) {
  if (!e || t == null || !Number.isFinite(t)) return null;
  const i = e.max - e.min;
  if (i === 0) return null;
  const n = (t - e.min) / i, o = Math.max(0, Math.min(1, n));
  return e.invert ? 1 - o : o;
}
const dd = "airHandler", hd = "air handler", pd = "utility", ud = [
  "hvac",
  "ahu",
  "furnace",
  "ventilation"
], fd = {
  w: 60,
  h: 56
}, md = [
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
], gd = {
  id: dd,
  name: hd,
  category: pd,
  keywords: ud,
  size: fd,
  parts: md
}, yd = "bathtub", bd = "bathtub", _d = "bath", vd = [
  "bath",
  "tub"
], xd = {
  w: 150,
  h: 76
}, wd = [
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
], $d = {
  id: yd,
  name: bd,
  category: _d,
  keywords: vd,
  size: xd,
  parts: wd
}, kd = "bed", Sd = "bed", Ed = "bedroom", Ad = [
  "double",
  "mattress",
  "sleep"
], Md = {
  w: 150,
  h: 200
}, Cd = [
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
], Td = {
  id: kd,
  name: Sd,
  category: Ed,
  keywords: Ad,
  size: Md,
  parts: Cd
}, Id = "chair", Pd = "chair", Od = "living", zd = [
  "seat"
], Ld = {
  w: 44,
  h: 44
}, Rd = [
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
], Fd = {
  id: Id,
  name: Pd,
  category: Od,
  keywords: zd,
  size: Ld,
  parts: Rd
}, Dd = "cornerShowerCurved", Nd = "curved corner shower", Hd = "bath", jd = [
  "shower",
  "corner",
  "cubicle",
  "stall",
  "dusche"
], Wd = {
  w: 100,
  h: 100
}, Ud = [
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
], Bd = {
  id: Dd,
  name: Nd,
  category: Hd,
  keywords: jd,
  size: Wd,
  parts: Ud
}, Gd = "desk", qd = "desk", Kd = "living", Vd = [
  "office",
  "workstation"
], Zd = {
  w: 120,
  h: 60
}, Xd = [
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
], Yd = {
  id: Gd,
  name: qd,
  category: Kd,
  keywords: Vd,
  size: Zd,
  parts: Xd
}, Jd = "dishwasher", Qd = "dishwasher", eh = "kitchen", th = [
  "dishes"
], ih = {
  w: 60,
  h: 60
}, nh = [
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
], oh = {
  id: Jd,
  name: Qd,
  category: eh,
  keywords: th,
  size: ih,
  parts: nh
}, sh = "dryer", rh = "dryer", ah = "utility", lh = [
  "tumble dryer",
  "laundry"
], ch = {
  w: 60,
  h: 62
}, dh = [
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
], hh = {
  id: sh,
  name: rh,
  category: ah,
  keywords: lh,
  size: ch,
  parts: dh
}, ph = "fishTank", uh = "fish tank", fh = "living", mh = [
  "aquarium",
  "fish",
  "water"
], gh = {
  w: 100,
  h: 40
}, yh = [
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
], bh = {
  id: ph,
  name: uh,
  category: fh,
  keywords: mh,
  size: gh,
  parts: yh
}, _h = "fridge", vh = "fridge", xh = "kitchen", wh = [
  "refrigerator",
  "freezer"
], $h = {
  w: 60,
  h: 64
}, kh = [
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
], Sh = {
  id: _h,
  name: vh,
  category: xh,
  keywords: wh,
  size: $h,
  parts: kh
}, Eh = "hotTub", Ah = "hot tub", Mh = "bath", Ch = [
  "jacuzzi",
  "spa",
  "whirlpool"
], Th = {
  w: 120,
  h: 120
}, Ih = [
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
], Ph = {
  id: Eh,
  name: Ah,
  category: Mh,
  keywords: Ch,
  size: Th,
  parts: Ih
}, Oh = "piano", zh = "piano", Lh = "living", Rh = [
  "upright",
  "keyboard",
  "music"
], Fh = {
  w: 140,
  h: 60
}, Dh = [
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
], Nh = {
  id: Oh,
  name: zh,
  category: Lh,
  keywords: Rh,
  size: Fh,
  parts: Dh
}, Hh = "plant", jh = "plant", Wh = "living", Uh = [
  "pot",
  "tree",
  "greenery"
], Bh = {
  w: 44,
  h: 44
}, Gh = "ellipse", qh = [
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
], Kh = {
  id: Hh,
  name: jh,
  category: Wh,
  keywords: Uh,
  size: Bh,
  footprint: Gh,
  parts: qh
}, Vh = "quarterTub", Zh = "corner hot tub", Xh = "bath", Yh = [
  "hottub",
  "jacuzzi",
  "corner",
  "quarter",
  "spa",
  "whirlpool"
], Jh = {
  w: 140,
  h: 140
}, Qh = [
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
], ep = {
  id: Vh,
  name: Zh,
  category: Xh,
  keywords: Yh,
  size: Jh,
  parts: Qh
}, tp = "roundTable", ip = "round table", np = "living", op = [
  "dining",
  "circular"
], sp = {
  w: 100,
  h: 100
}, rp = "ellipse", ap = [
  {
    ellipse: [
      50,
      50,
      50,
      50
    ],
    role: "body"
  }
], lp = {
  id: tp,
  name: ip,
  category: np,
  keywords: op,
  size: sp,
  footprint: rp,
  parts: ap
}, cp = "rug", dp = "rug", hp = "living", pp = [
  "carpet",
  "mat"
], up = {
  w: 180,
  h: 120
}, fp = [
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
], mp = {
  id: cp,
  name: dp,
  category: hp,
  keywords: pp,
  size: up,
  parts: fp
}, gp = "sectional", yp = "sectional (L)", bp = "living", _p = [
  "couch",
  "sofa",
  "corner",
  "chaise"
], vp = {
  w: 230,
  h: 180
}, xp = [
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
], wp = {
  id: gp,
  name: yp,
  category: bp,
  keywords: _p,
  size: vp,
  parts: xp
}, $p = "sink", kp = "sink", Sp = "kitchen", Ep = [
  "basin",
  "tap",
  "faucet"
], Ap = {
  w: 64,
  h: 48
}, Mp = [
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
], Cp = {
  id: $p,
  name: kp,
  category: Sp,
  keywords: Ep,
  size: Ap,
  parts: Mp
}, Tp = "sofa", Ip = "sofa", Pp = "living", Op = [
  "couch",
  "settee",
  "seat"
], zp = {
  w: 170,
  h: 72
}, Lp = [
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
], Rp = {
  id: Tp,
  name: Ip,
  category: Pp,
  keywords: Op,
  size: zp,
  parts: Lp
}, Fp = "stairs", Dp = "stairs", Np = "utility", Hp = [
  "steps",
  "staircase"
], jp = {
  w: 90,
  h: 170
}, Wp = [
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
], Up = {
  id: Fp,
  name: Dp,
  category: Np,
  keywords: Hp,
  size: jp,
  parts: Wp
}, Bp = "stove", Gp = "stove", qp = "kitchen", Kp = [
  "cooker",
  "hob",
  "oven",
  "range"
], Vp = {
  w: 64,
  h: 64
}, Zp = [
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
], Xp = {
  id: Bp,
  name: Gp,
  category: qp,
  keywords: Kp,
  size: Vp,
  parts: Zp
}, Yp = "table", Jp = "table", Qp = "living", eu = [
  "dining"
], tu = {
  w: 120,
  h: 80
}, iu = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 5
  }
], nu = {
  id: Yp,
  name: Jp,
  category: Qp,
  keywords: eu,
  size: tu,
  parts: iu
}, ou = "toilet", su = "toilet", ru = "bath", au = [
  "wc",
  "loo",
  "lavatory"
], lu = {
  w: 48,
  h: 68
}, cu = [
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
], du = {
  id: ou,
  name: su,
  category: ru,
  keywords: au,
  size: lu,
  parts: cu
}, hu = "tv", pu = "tv", uu = "living", fu = [
  "television",
  "screen",
  "media"
], mu = {
  w: 110,
  h: 18
}, gu = [
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
], yu = {
  id: hu,
  name: pu,
  category: uu,
  keywords: fu,
  size: mu,
  parts: gu
}, bu = "vanity", _u = "vanity", vu = "bath", xu = [
  "washbasin",
  "sink",
  "bathroom"
], wu = {
  w: 110,
  h: 55
}, $u = [
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
], ku = {
  id: bu,
  name: _u,
  category: vu,
  keywords: xu,
  size: wu,
  parts: $u
}, Su = "wardrobe", Eu = "wardrobe", Au = "bedroom", Mu = [
  "closet",
  "armoire",
  "cupboard"
], Cu = {
  w: 120,
  h: 55
}, Tu = [
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
], Iu = {
  id: Su,
  name: Eu,
  category: Au,
  keywords: Mu,
  size: Cu,
  parts: Tu
}, Pu = "washer", Ou = "washer", zu = "utility", Lu = [
  "washing machine",
  "laundry"
], Ru = {
  w: 60,
  h: 62
}, Fu = [
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
], Du = {
  id: Pu,
  name: Ou,
  category: zu,
  keywords: Lu,
  size: Ru,
  parts: Fu
}, Nu = "waterHeater", Hu = "water heater", ju = "utility", Wu = [
  "boiler",
  "cylinder",
  "tank"
], Uu = {
  w: 52,
  h: 52
}, Bu = "ellipse", Gu = [
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
], qu = {
  id: Nu,
  name: Hu,
  category: ju,
  keywords: Wu,
  size: Uu,
  footprint: Bu,
  parts: Gu
}, Pn = [
  "living",
  "bedroom",
  "kitchen",
  "bath",
  "utility",
  "other"
], Bi = (e) => Object.assign(/* @__PURE__ */ Object.create(null), e), so = (e, t) => typeof t == "string" && Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0, $s = Bi({
  body: { width: 2, opacity: 1, fillOpacity: 0.12 },
  line: { width: 2, opacity: 1, fillOpacity: 0 },
  thin: { width: 1.5, opacity: 1, fillOpacity: 0 },
  detail: { width: 1.5, opacity: 0.7, fillOpacity: 0 },
  hint: { width: 1, opacity: 0.6, fillOpacity: 0 },
  solid: { width: 0, opacity: 0.7, fillOpacity: 1 }
}), Ku = [0, 0, 100, 100], Vu = 64, Wr = 256, Zu = 256, Xu = 0.25, ks = 8, Se = (e) => typeof e == "number" && Number.isFinite(e) ? e : null, lt = (e, t, i) => Math.min(i, Math.max(t, e));
function De(e, t) {
  if (!Array.isArray(e) || e.length !== t) return null;
  const i = [];
  for (const n of e) {
    const o = Se(n);
    if (o === null) return null;
    i.push(o);
  }
  return i;
}
function Yu(e) {
  if (!Array.isArray(e) || e.length < 2 || e.length > Wr) return null;
  const t = [];
  for (const i of e) {
    const n = De(i, 2);
    if (!n) return null;
    t.push([n[0], n[1]]);
  }
  return t;
}
const Ju = Bi({ M: 2, L: 2, Q: 4, C: 6, Z: 0 });
function Qu(e) {
  if (!Array.isArray(e) || !e.length || e.length > Zu) return null;
  const t = [];
  for (const i of e) {
    if (!Array.isArray(i) || typeof i[0] != "string") return null;
    const n = i[0].toUpperCase(), o = so(Ju, n);
    if (o === void 0) return null;
    const s = De(i.slice(1), o);
    if (!s) return null;
    t.push([n, ...s]);
  }
  return t[0]?.[0] !== "M" ? null : t;
}
function ot(e, t) {
  const i = so($s, e.role) ? e.role : t, n = $s[i], o = Se(e.width), s = Se(e.opacity), r = Se(e.fillOpacity), a = Array.isArray(e.dash) ? e.dash.map(Se) : null, l = a && a.length && a.length <= 8 && a.every((c) => c !== null) ? a.map((c) => lt(c, 0, 100)) : void 0;
  return {
    role: i,
    width: o === null ? n.width : i === "solid" ? lt(o, 0, ks) : lt(o, Xu, ks),
    opacity: s === null ? n.opacity : lt(s, 0, 1),
    fillOpacity: r === null ? n.fillOpacity : lt(r, 0, 1),
    dash: l
  };
}
function Ss(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return null;
  const t = e, i = t.space === "square" ? "square" : "box";
  if ("line" in t) {
    const n = De(t.line, 4);
    return n ? { kind: "line", a: [n[0], n[1]], b: [n[2], n[3]], space: i, style: ot(t, "line") } : null;
  }
  if ("rect" in t) {
    const n = De(t.rect, 4);
    return !n || n[2] < 0 || n[3] < 0 ? null : {
      kind: "rect",
      x: n[0],
      y: n[1],
      w: n[2],
      h: n[3],
      rx: Math.max(0, Se(t.rx) ?? 0),
      space: i,
      style: ot(t, "body")
    };
  }
  if ("circle" in t) {
    const n = De(t.circle, 3);
    return !n || n[2] < 0 ? null : { kind: "circle", cx: n[0], cy: n[1], r: n[2], space: i, style: ot(t, "line") };
  }
  if ("ellipse" in t) {
    const n = De(t.ellipse, 4);
    return !n || n[2] < 0 || n[3] < 0 ? null : {
      kind: "ellipse",
      cx: n[0],
      cy: n[1],
      rx: n[2],
      ry: n[3],
      space: i,
      style: ot(t, "line")
    };
  }
  if ("polygon" in t || "polyline" in t) {
    const n = "polygon" in t, o = Yu(n ? t.polygon : t.polyline);
    return o ? { kind: "poly", closed: n, pts: o, space: i, style: ot(t, n ? "body" : "line") } : null;
  }
  if ("path" in t) {
    const n = Qu(t.path);
    return n ? { kind: "path", cmds: n, space: i, style: ot(t, "line") } : null;
  }
  return null;
}
function ef(e, t, i) {
  switch (e.kind) {
    case "line":
      return { ...e, a: [e.a[0] + t, e.a[1] + i], b: [e.b[0] + t, e.b[1] + i] };
    case "rect":
      return { ...e, x: e.x + t, y: e.y + i };
    case "circle":
      return { ...e, cx: e.cx + t, cy: e.cy + i };
    case "ellipse":
      return { ...e, cx: e.cx + t, cy: e.cy + i };
    case "poly":
      return { ...e, pts: e.pts.map(([n, o]) => [n + t, o + i]) };
    case "path":
      return {
        ...e,
        cmds: e.cmds.map((n) => {
          if (n[0] === "Z") return n;
          const o = n.slice(1).map((s, r) => s + (r % 2 === 0 ? t : i));
          return [n[0], ...o];
        })
      };
  }
}
function tf(e) {
  if (e && typeof e == "object" && "repeat" in e) {
    const i = e, n = Se(i.repeat), o = De(i.step, 2), s = Ss(i.part);
    if (n === null || !o || !s) return [];
    const r = lt(Math.round(n), 1, Vu);
    return Array.from({ length: r }, (a, l) => ef(s, o[0] * l, o[1] * l));
  }
  const t = Ss(e);
  return t ? [t] : [];
}
function Gi(e, t, i) {
  const n = (p) => (i?.push(p), null);
  if (!e || typeof e != "object" || Array.isArray(e))
    return n("A symbol has to be a JSON object.");
  const o = e, s = typeof o.id == "string" && o.id.trim() ? o.id.trim() : t, r = le(s);
  if (!r || r !== s)
    return n('`id` is missing, or uses characters a CSS class cannot: letters, digits, "-" and "_" only.');
  if (!Array.isArray(o.parts)) return n("`parts` has to be an array of shapes.");
  const a = [];
  for (const p of o.parts)
    for (const m of tf(p)) {
      if (a.length >= Wr) break;
      a.push(m);
    }
  if (!a.length)
    return n(
      "No drawable parts. Each one needs a known shape (line, rect, circle, ellipse, polygon, polyline, path) with the right number of finite numbers."
    );
  const l = o.size && typeof o.size == "object" ? o.size : {}, c = Se(l.w), h = Se(l.h), d = De(o.viewBox, 4);
  return {
    id: r,
    name: typeof o.name == "string" && o.name.trim() ? o.name.trim().slice(0, 60) : r,
    category: typeof o.category == "string" && Pn.includes(o.category) ? o.category : "other",
    keywords: Array.isArray(o.keywords) ? o.keywords.filter((p) => typeof p == "string").slice(0, 12) : [],
    size: { w: c && c > 0 ? c : 60, h: h && h > 0 ? h : 60 },
    viewBox: d && d[2] > 0 && d[3] > 0 ? d : Ku,
    footprint: o.footprint === "ellipse" ? "ellipse" : "rect",
    parts: a
  };
}
const nf = Gi({
  id: "unknown",
  name: "unknown",
  size: { w: 60, h: 60 },
  parts: [{ rect: [0, 0, 100, 100], rx: 6.666667 }]
}), Me = (() => {
  const e = /* @__PURE__ */ Object.assign({ "../ef-furniture/airHandler.json": gd, "../ef-furniture/bathtub.json": $d, "../ef-furniture/bed.json": Td, "../ef-furniture/chair.json": Fd, "../ef-furniture/cornerShowerCurved.json": Bd, "../ef-furniture/desk.json": Yd, "../ef-furniture/dishwasher.json": oh, "../ef-furniture/dryer.json": hh, "../ef-furniture/fishTank.json": bh, "../ef-furniture/fridge.json": Sh, "../ef-furniture/hotTub.json": Ph, "../ef-furniture/piano.json": Nh, "../ef-furniture/plant.json": Kh, "../ef-furniture/quarterTub.json": ep, "../ef-furniture/roundTable.json": lp, "../ef-furniture/rug.json": mp, "../ef-furniture/sectional.json": wp, "../ef-furniture/sink.json": Cp, "../ef-furniture/sofa.json": Rp, "../ef-furniture/stairs.json": Up, "../ef-furniture/stove.json": Xp, "../ef-furniture/table.json": nu, "../ef-furniture/toilet.json": du, "../ef-furniture/tv.json": yu, "../ef-furniture/vanity.json": ku, "../ef-furniture/wardrobe.json": Iu, "../ef-furniture/washer.json": Du, "../ef-furniture/waterHeater.json": qu }), t = Bi({});
  for (const [i, n] of Object.entries(e)) {
    const o = Gi(n, i.split("/").pop()?.replace(/\.json$/, ""));
    o && (t[o.id] = o);
  }
  return t;
})();
function qi(e, t) {
  return so(e, t);
}
let Es, As = Me;
function On(e) {
  if (!e || typeof e != "object") return Me;
  if (e === Es) return As;
  const t = Bi({});
  Object.assign(t, Me);
  for (const [i, n] of Object.entries(e)) {
    const o = Gi(n, i);
    o && (t[o.id] = o);
  }
  return Es = e, As = t, t;
}
function of(e) {
  const t = (i) => {
    const n = Pn.indexOf(i);
    return n < 0 ? Pn.length : n;
  };
  return Object.values(e).sort(
    (i, n) => t(i.category) - t(n.category) || i.name.localeCompare(n.name)
  );
}
function sf(e, t) {
  const i = t.trim().toLowerCase();
  return i ? e.id.toLowerCase().includes(i) || e.name.toLowerCase().includes(i) || e.category.includes(i) || e.keywords.some((n) => n.toLowerCase().includes(i)) : !0;
}
function rf(e, t = Me) {
  return qi(t, e)?.size ?? { w: 60, h: 60 };
}
function Ms(e, t, i, n) {
  const [o, s, r, a] = e.viewBox, l = n === "square" ? Math.min(t, i) : t, c = n === "square" ? Math.min(t, i) : i, h = l / r, d = c / a;
  return {
    x: (p) => (p - o) * h - l / 2,
    y: (p) => (p - s) * d - c / 2,
    len: (p) => p * Math.min(h, d),
    sx: (p) => p * h,
    sy: (p) => p * d
  };
}
const K = (e) => Number.isFinite(e) ? e : 0;
function af(e, t) {
  const i = e.fillOpacity > 0 ? t : "none", n = e.role === "solid" ? "none" : t;
  return { fill: i, stroke: n, style: e };
}
function lf(e, t, i) {
  const { fill: n, stroke: o, style: s } = af(e.style, i), r = s.opacity < 1 ? s.opacity : f, a = s.dash?.length ? s.dash.join(" ") : f, l = s.fillOpacity > 0 && s.fillOpacity < 1 ? s.fillOpacity : f, c = s.role === "solid" ? f : s.width;
  switch (e.kind) {
    case "line":
      return _`<line x1=${K(t.x(e.a[0]))} y1=${K(t.y(e.a[1]))}
                       x2=${K(t.x(e.b[0]))} y2=${K(t.y(e.b[1]))}
                       fill="none" stroke=${o} stroke-width=${c}
                       stroke-dasharray=${a} opacity=${r} />`;
    case "rect":
      return _`<rect x=${K(t.x(e.x))} y=${K(t.y(e.y))}
                       width=${K(t.sx(e.w))} height=${K(t.sy(e.h))}
                       rx=${e.rx > 0 ? K(t.len(e.rx)) : f}
                       fill=${n} fill-opacity=${l}
                       stroke=${o} stroke-width=${c}
                       stroke-dasharray=${a} opacity=${r} />`;
    case "circle":
      return _`<circle cx=${K(t.x(e.cx))} cy=${K(t.y(e.cy))} r=${K(t.len(e.r))}
                         fill=${n} fill-opacity=${l}
                         stroke=${o} stroke-width=${c} opacity=${r} />`;
    case "ellipse":
      return _`<ellipse cx=${K(t.x(e.cx))} cy=${K(t.y(e.cy))}
                          rx=${K(t.sx(e.rx))} ry=${K(t.sy(e.ry))}
                          fill=${n} fill-opacity=${l}
                          stroke=${o} stroke-width=${c} opacity=${r} />`;
    case "poly": {
      const h = e.pts.map(([d, p]) => `${K(t.x(d))},${K(t.y(p))}`).join(" ");
      return e.closed ? _`<polygon points=${h}
                       fill=${n} fill-opacity=${l}
                       stroke=${o} stroke-width=${c}
                       stroke-linejoin="round" opacity=${r} />` : _`<polyline points=${h} fill="none"
                        stroke=${o} stroke-width=${c}
                        stroke-linejoin="round" opacity=${r} />`;
    }
    case "path": {
      const h = e.cmds.map(
        (d) => d[0] === "Z" ? "Z" : `${d[0]} ${d.slice(1).map((p, m) => m % 2 === 0 ? K(t.x(p)) : K(t.y(p))).join(" ")}`
      ).join(" ");
      return _`<path d=${h}
                       fill=${n} fill-opacity=${l}
                       stroke=${o} stroke-width=${c}
                       stroke-linejoin="round" opacity=${r} />`;
    }
  }
}
function cf(e, t, i, n) {
  const o = Ms(e, t, i, "box"), s = Ms(e, t, i, "square");
  return e.parts.map((r) => lf(r, r.space === "square" ? s : o, n));
}
const df = /* @__PURE__ */ new Set(["light", "switch", "fan", "input_boolean"]);
function Ur(e) {
  const t = e?.split(".")[0] ?? "";
  return df.has(t) ? { action: "toggle" } : { action: "more-info" };
}
function ze(e) {
  return e !== void 0 && e.action !== "none";
}
function Br(e, t) {
  return t === "tap" ? e.tap_action ?? Ur(e.entity) : t === "hold" ? e.hold_action : e.double_tap_action;
}
function hf(e, t) {
  if (!t || t.action === "none") return !1;
  switch (t.action) {
    case "toggle":
      return !!e.entity;
    case "more-info":
      return !!(t.entity ?? e.entity);
    case "navigate":
      return !!t.navigation_path;
    case "url":
      return !!t.url_path;
    case "perform-action":
    case "call-service":
      return Gr(t) !== null;
    case "fire-dom-event":
      return !0;
    default:
      return !1;
  }
}
function pf(e) {
  return ["tap", "hold", "double_tap"].some(
    (t) => hf(e, Br(e, t))
  );
}
function Gr(e) {
  const t = e.perform_action ?? e.service;
  if (!t || !t.includes(".")) return null;
  const [i, n] = t.split(".", 2);
  return { domain: i, service: n, data: e.data ?? e.service_data, target: e.target };
}
function St(e, t, i, n) {
  if (!(!n || n.action === "none")) {
    if (n.confirmation) {
      const o = typeof n.confirmation == "object" && n.confirmation.text || `Are you sure you want to ${n.action}?`;
      if (!globalThis.confirm?.(o)) return;
    }
    switch (n.action) {
      case "toggle":
        i.entity && t.callService("homeassistant", "toggle", { entity_id: i.entity });
        break;
      case "more-info": {
        const o = n.entity ?? i.entity;
        o && e.dispatchEvent(
          new CustomEvent("hass-more-info", { detail: { entityId: o }, bubbles: !0, composed: !0 })
        );
        break;
      }
      case "navigate":
        if (n.navigation_path) {
          history.pushState(null, "", n.navigation_path);
          const o = new Event("location-changed");
          o.detail = { replace: !1 }, window.dispatchEvent(o);
        }
        break;
      case "url":
        n.url_path && window.open(n.url_path);
        break;
      case "perform-action":
      case "call-service": {
        const o = Gr(n);
        o && t.callService(o.domain, o.service, o.data, o.target);
        break;
      }
      case "fire-dom-event":
        e.dispatchEvent(new CustomEvent("ll-custom", { detail: n, bubbles: !0, composed: !0 }));
        break;
    }
  }
}
const uf = 0.75, ki = 8, ff = 400;
function hn(e, t) {
  return typeof e == "number" && Number.isFinite(e) && e > 0 ? e : t;
}
function mf(e) {
  let t = 0;
  for (let i = 0, n = e.length - 1; i < e.length; n = i++)
    t += e[n].x * e[i].y - e[i].x * e[n].y;
  return t / 2;
}
function gf(e, t, i, n) {
  const o = n.x - i.x, s = n.y - i.y, r = o * o + s * s;
  if (r === 0) return Math.hypot(e - i.x, t - i.y);
  let a = ((e - i.x) * o + (t - i.y) * s) / r;
  return a = Math.max(0, Math.min(1, a)), Math.hypot(e - (i.x + a * o), t - (i.y + a * s));
}
function yf(e, t) {
  const i = [];
  for (let n = 0; n < e.length; n++) {
    const o = e[n], s = o.b.x - o.a.x, r = o.b.y - o.a.y, a = Math.hypot(s, r);
    if (a <= t) continue;
    const l = [0, 1], c = t / a;
    for (let h = 0; h < e.length; h++) {
      if (h === n) continue;
      const d = e[h], p = d.b.x - d.a.x, m = d.b.y - d.a.y, g = s * m - r * p;
      if (Math.abs(g) > 1e-9) {
        const b = ((d.a.x - o.a.x) * m - (d.a.y - o.a.y) * p) / g, v = ((d.a.x - o.a.x) * r - (d.a.y - o.a.y) * s) / g, x = t / Math.max(Math.hypot(p, m), 1e-9);
        b > c && b < 1 - c && v >= -x && v <= 1 + x && l.push(b);
        continue;
      }
      for (const b of [d.a, d.b]) {
        const v = ((b.x - o.a.x) * s + (b.y - o.a.y) * r) / (a * a);
        if (v <= c || v >= 1 - c) continue;
        const x = o.a.x + v * s, $ = o.a.y + v * r;
        Math.hypot(b.x - x, b.y - $) <= t && l.push(v);
      }
    }
    l.sort((h, d) => h - d);
    for (let h = 1; h < l.length; h++) {
      const d = l[h - 1], p = l[h];
      p - d <= c || i.push({
        a: { x: o.a.x + d * s, y: o.a.y + d * r },
        b: { x: o.a.x + p * s, y: o.a.y + p * r }
      });
    }
  }
  return i;
}
function bf(e, t) {
  const i = [], n = /* @__PURE__ */ new Map(), o = (c) => Math.floor(c / t), s = (c) => {
    const h = o(c.x), d = o(c.y);
    for (let b = -1; b <= 1; b++)
      for (let v = -1; v <= 1; v++)
        for (const x of n.get(`${h + b}:${d + v}`) ?? [])
          if (Math.hypot(i[x].x - c.x, i[x].y - c.y) <= t) return x;
    const p = i.push({ x: c.x, y: c.y }) - 1, m = `${h}:${d}`, g = n.get(m);
    return g ? g.push(p) : n.set(m, [p]), p;
  }, r = /* @__PURE__ */ new Map(), a = (c) => {
    let h = r.get(c);
    return h || r.set(c, h = /* @__PURE__ */ new Set()), h;
  };
  for (const c of e) {
    const h = s(c.a), d = s(c.b);
    h !== d && (a(h).add(d), a(d).add(h));
  }
  const l = i.map(
    (c, h) => [...r.get(h) ?? []].sort(
      (d, p) => Math.atan2(i[d].y - c.y, i[d].x - c.x) - Math.atan2(i[p].y - c.y, i[p].x - c.x)
    )
  );
  return { points: i, neighbors: l };
}
function _f(e, t) {
  const { points: i, neighbors: n } = bf(e, t), o = /* @__PURE__ */ new Set(), s = [];
  for (let r = 0; r < i.length; r++)
    for (const a of n[r]) {
      if (o.has(`${r}>${a}`)) continue;
      const l = [];
      let c = r, h = a, d = !1;
      for (let p = 0; p <= i.length * i.length + 4; p++) {
        o.add(`${c}>${h}`), l.push(c);
        const m = n[h], g = m.indexOf(c), b = m[(g - 1 + m.length) % m.length];
        if (c = h, h = b, c === r && h === a) {
          d = !0;
          break;
        }
      }
      d && l.length >= 3 && s.push(l.map((p) => ({ x: i[p].x, y: i[p].y })));
    }
  return s;
}
function vf(e, t, i) {
  for (let n = 0, o = e.length - 1; n < e.length; o = n++)
    for (const s of t)
      if (gf(s.x, s.y, e[o], e[n]) <= i) return !0;
  return !1;
}
function xf(e, t, i = {}) {
  const n = hn(i.weldEps, uf), o = hn(i.openingEps, ki), s = hn(i.minArea, ff);
  if (e.length < 3) return [];
  const r = yf(
    e.map((l) => ({ a: { x: l.x1, y: l.y1 }, b: { x: l.x2, y: l.y2 } })),
    n
  );
  return _f(r, n).map((l) => ({ ring: l, area: mf(l) })).filter((l) => l.area >= s && !vf(l.ring, t, o)).sort((l, c) => c.area - l.area).map((l) => l.ring);
}
const Cs = /* @__PURE__ */ new WeakMap();
function qr(e, t) {
  const i = Cs.get(e);
  if (i && i.openings === t) return i.out;
  const n = xf(e, t);
  return Cs.set(e, { openings: t, out: n }), n;
}
const V = 8, Kr = 0.05, Lt = "—";
function Gt(e, t) {
  if (!t || !e) return Lt;
  const i = e.states[t];
  return i ? e.formatEntityState(i) : Lt;
}
function Vr(e, t, i) {
  if (e.formatEntityState !== t.formatEntityState || e.formatEntityAttributeValue !== t.formatEntityAttributeValue) return !0;
  for (const n of i)
    if (e.states[n] !== t.states[n]) return !0;
  return !1;
}
function Ct(e) {
  const t = /* @__PURE__ */ new Set();
  (e.sunDimming || e.sunlight && !Zi(e)) && t.add("sun.sun");
  for (const i of mt(e)) {
    for (const n of i.openings) {
      n.entity && t.add(n.entity), n.shutterEntity && t.add(n.shutterEntity), n.secondaryEntity && t.add(n.secondaryEntity);
      for (const o of n.extraEntities ?? []) o && t.add(o);
      n.shutterSecondaryEntity && t.add(n.shutterSecondaryEntity);
    }
    for (const n of i.items) {
      n.entity && t.add(n.entity), n.hideEntity && t.add(n.hideEntity), n.hideStateEntity && t.add(n.hideStateEntity), n.hideBadgeEntity && t.add(n.hideBadgeEntity);
      for (const o of je(n)) o.entity && t.add(o.entity);
    }
    for (const n of i.texts)
      n.entity && t.add(n.entity);
    for (const n of i.furniture)
      n.entity && t.add(n.entity);
    for (const n of i.areas)
      n.entity && t.add(n.entity);
    for (const n of i.trackers)
      for (const o of [n.xSensor, n.ySensor])
        o?.entity && t.add(o.entity), o?.presence?.entity && t.add(o.presence.entity);
  }
  return t;
}
function ro(e, t, i) {
  if (!t || !e) return Lt;
  const n = e.states[t];
  if (!n) return Lt;
  const o = e.formatEntityAttributeValue;
  if (typeof o == "function") return o(n, i);
  const s = n.attributes?.[i];
  return s == null || s === "" ? Lt : String(s);
}
function wf(e, t, i) {
  const n = i.entity || (i.attribute ? t.entity : void 0);
  return n ? i.attribute ? ro(e, n, i.attribute) : Gt(e, n) : "";
}
function je(e) {
  return [...e.secondaryEntity || e.secondaryAttribute ? [{ entity: e.secondaryEntity, attribute: e.secondaryAttribute }] : [], ...e.readings ?? []];
}
function $f(e, t) {
  return t.attribute ? ro(e, t.entity, t.attribute) : Gt(e, t.entity);
}
function ao(e, t) {
  if (!t.entity) return t.text ?? "";
  const i = t.attribute ? ro(e, t.entity, t.attribute) : Gt(e, t.entity);
  return t.text ? `${t.text} ${i}` : i;
}
function Ki(e, t) {
  return Zr(e, t)?.color;
}
function Zr(e, t) {
  if (!e?.length) return;
  const i = typeof t == "number" ? t : Number(t), n = typeof t != "boolean" && t !== "" && t != null && Number.isFinite(i), o = t == null ? "" : String(t).trim().toLowerCase();
  let s, r, a;
  for (const l of e)
    !l || typeof l != "object" || typeof l.color != "string" || (typeof l.state == "string" && l.state !== "" ? s === void 0 && o !== "" && l.state.trim().toLowerCase() === o && (s = l) : typeof l.above == "number" ? n && i > l.above && (!r || l.above > (r.above ?? -1 / 0)) && (r = l) : a === void 0 && (a = l));
  return s ?? r ?? a;
}
function kf(e, t) {
  if (!e.entity) return;
  const i = Ki(e.stateColor, t);
  if (i) return j(i);
  if (e.activeColor && Ie(e.entity, t)) return j(e.activeColor);
}
function Ts(e, t) {
  if (!e.entity) return;
  const i = Ki(e.stateColor, t);
  if (i) return j(i);
  if (e.activeColor && Ie(e.entity, t)) return j(e.activeColor);
}
function lo(e, t) {
  if (!t || t.state !== "on") return;
  const i = t.attributes ?? {}, n = i.brightness, o = typeof n == "number" && Number.isFinite(n) ? Math.max(0, Math.min(255, n)) : void 0, s = o === void 0 ? xi : gs + (xi - gs) * (o / 255), r = R(e.glowRadius, Hi) * (o === void 0 ? 1 : ys + (1 - ys) * (o / 255)), a = i.rgb_color;
  if (Array.isArray(a) && a.length >= 3) {
    const [l, c, h] = a;
    if ([l, c, h].every((d) => typeof d == "number" && Number.isFinite(d))) {
      const d = (m) => Math.max(0, Math.min(255, Math.round(m))), p = j(`rgb(${d(l)}, ${d(c)}, ${d(h)})`);
      if (p) return { color: p, opacity: s, radius: r };
    }
  }
  return { color: de(e.glowColor, jr), opacity: s, radius: r };
}
function Xr(e) {
  if (!e || e.state !== "on") return;
  const t = e.attributes ?? {}, i = t.rgb_color;
  if (!Array.isArray(i) || i.length < 3) return;
  const [n, o, s] = i;
  if (![n, o, s].every((h) => typeof h == "number" && Number.isFinite(h))) return;
  const r = t.brightness, a = typeof r == "number" && Number.isFinite(r) ? Math.max(0, Math.min(255, r)) : void 0, l = a === void 0 ? 1 : bs + (1 - bs) * (a / 255), c = (h) => Math.max(0, Math.min(255, Math.round(h * l)));
  return j(`rgb(${c(n)}, ${c(o)}, ${c(s)})`);
}
function Sf(e, t) {
  return t ? lo(e, t) : {
    color: de(e.glowColor, jr),
    opacity: xi,
    radius: R(e.glowRadius, Hi)
  };
}
function co(e, t, i) {
  const n = i.x2 - i.x1, o = i.y2 - i.y1, s = n * n + o * o, r = s === 0 ? 0 : Math.max(0, Math.min(1, ((e - i.x1) * n + (t - i.y1) * o) / s)), a = i.x1 + r * n, l = i.y1 + r * o;
  return Math.hypot(e - a, t - l);
}
function ho(e, t, i, n, o) {
  const s = o.x2 - o.x1, r = o.y2 - o.y1, a = i * r - n * s;
  if (Math.abs(a) < 1e-12) return;
  const l = o.x1 - e, c = o.y1 - t, h = (l * r - c * s) / a, d = (l * n - c * i) / a;
  if (!(h <= 1e-9 || d < 0 || d > 1))
    return h;
}
function Ef(e, t, i, n, o) {
  const s = e.x2 - e.x1, r = e.y2 - e.y1, a = [-s, s, -r, r], l = [e.x1 - t, n - e.x1, e.y1 - i, o - e.y1];
  let c = 0, h = 1;
  for (let d = 0; d < 4; d++) {
    if (a[d] === 0) {
      if (l[d] < 0) return;
      continue;
    }
    const p = l[d] / a[d];
    if (a[d] < 0) {
      if (p > h) return;
      p > c && (c = p);
    } else {
      if (p < c) return;
      p < h && (h = p);
    }
  }
  return {
    ...e,
    x1: e.x1 + c * s,
    y1: e.y1 + c * r,
    x2: e.x1 + h * s,
    y2: e.y1 + h * r
  };
}
function Yr(e, t, i, n) {
  if (Y(e) === "fixed") return 0;
  const o = Math.max(0, Math.min(1, t)), s = Math.max(0, Math.min(1, i ?? t));
  if (Y(e) === "swing") {
    const r = Ee(e);
    if (r > 2) {
      let a = o + s;
      for (let l = 2; l < r; l++) a += Math.max(0, Math.min(1, n?.[l - 2] ?? t));
      return a / r;
    }
    return r === 2 ? (o + s) / 2 : o * yo(e);
  }
  if (Y(e) === "awning") return o;
  switch (Vi(e)) {
    case "biparting":
      return (o + s) / 2;
    case "biparting-bypass":
    case "converging":
      return (o + s) / 4;
    default:
      return o;
  }
}
function Jr(e, t, i, n, o) {
  return n !== void 0 && n <= 0 ? [0, 0] : ko(e) && Y(e) !== "roll" ? [0, 1] : Af(e, t, i, o);
}
function Af(e, t, i, n) {
  const o = Yr(e, t, i, n), s = [(1 - o) / 2, (1 + o) / 2];
  if (yo(e) < 1) {
    const c = [0, o];
    return e.flipH ? [1 - c[1], 1 - c[0]] : c;
  }
  if (Y(e) !== "swing" || Ee(e) !== 2) return s;
  const r = Math.max(0, Math.min(1, t)), a = Math.max(0, Math.min(1, i ?? t)), l = [0.5 - r / 2, 0.5 + a / 2];
  return e.flipH ? [1 - l[1], 1 - l[0]] : l;
}
function po(e, t, i) {
  const n = [];
  for (const s of t) {
    const r = i(s), a = (c) => Math.max(0, Math.min(1, c)), l = typeof r == "number" ? [(1 - a(r)) / 2, (1 + a(r)) / 2] : [a(Math.min(r[0], r[1])), a(Math.max(r[0], r[1]))];
    l[1] > l[0] && n.push({ o: s, span: l });
  }
  if (!n.length) return e;
  const o = [];
  for (const s of e) {
    const r = s.x2 - s.x1, a = s.y2 - s.y1, l = r * r + a * a;
    if (l === 0) {
      o.push(s);
      continue;
    }
    const c = Math.sqrt(l), h = [];
    for (const { o: v, span: x } of n) {
      if (co(v.x, v.y, s) > ki) continue;
      const $ = ((v.x - s.x1) * r + (v.y - s.y1) * a) / l, y = Math.cos(v.angle * Math.PI / 180) * r + Math.sin(v.angle * Math.PI / 180) * a >= 0 ? 1 : -1, w = (B) => y * (B - 0.5) * v.length / c, E = $ + w(x[0]), T = $ + w(x[1]), C = Math.max(0, Math.min(E, T)), D = Math.min(1, Math.max(E, T));
      D > C && h.push([C, D]);
    }
    if (!h.length) {
      o.push(s);
      continue;
    }
    h.sort((v, x) => v[0] - x[0]);
    const d = [h[0]];
    for (const v of h.slice(1)) {
      const x = d[d.length - 1];
      v[0] <= x[1] ? x[1] = Math.max(x[1], v[1]) : d.push(v);
    }
    const p = (v) => ({ x: s.x1 + r * v, y: s.y1 + a * v });
    let m = 0, g = 0;
    const b = (v, x) => {
      if ((x - v) * c < V / 2) return;
      const $ = p(v), y = p(x);
      o.push({ id: `${s.id}#${g++}`, x1: $.x, y1: $.y, x2: y.x, y2: y.y });
    };
    for (const [v, x] of d)
      b(m, v), m = x;
    b(m, 1);
  }
  return o;
}
function Qr(e, t, i, n) {
  const o = n.filter((d) => {
    const p = co(e, t, d);
    return p < i && p > V;
  });
  if (!o.length) return;
  const s = i * 1.01, r = [
    { id: "b1", x1: e - s, y1: t - s, x2: e + s, y2: t - s },
    { id: "b2", x1: e + s, y1: t - s, x2: e + s, y2: t + s },
    { id: "b3", x1: e + s, y1: t + s, x2: e - s, y2: t + s },
    { id: "b4", x1: e - s, y1: t + s, x2: e - s, y2: t - s }
  ], a = o.map((d) => Ef(d, e - s, t - s, e + s, t + s)).filter((d) => d !== void 0);
  if (!a.length) return;
  const l = [...a, ...r], c = [];
  for (const d of l)
    for (const [p, m] of [
      [d.x1, d.y1],
      [d.x2, d.y2]
    ]) {
      const g = Math.atan2(m - t, p - e);
      for (const b of [g - 1e-4, g, g + 1e-4]) {
        const v = Math.cos(b), x = Math.sin(b);
        let $ = 1 / 0;
        for (const y of l) {
          const w = ho(e, t, v, x, y);
          w !== void 0 && w < $ && ($ = w);
        }
        $ < 1 / 0 && c.push({ x: e + v * $, y: t + x * $, a: b });
      }
    }
  c.sort((d, p) => d.a - p.a);
  const h = (d) => Math.round(d * 100) / 100;
  return c.map(({ x: d, y: p }) => ({ x: h(d), y: h(p) }));
}
function ea(e, t, i, n) {
  const o = t.radius, s = n?.length ? Qr(e.x, e.y, o, n) : void 0, r = `${i}-clip`;
  return _`
    ${s ? _`<clipPath id=${r}>
                <polygon points=${s.map((a) => `${a.x},${a.y}`).join(" ")} />
              </clipPath>` : f}
    <radialGradient id=${i} gradientUnits="userSpaceOnUse"
                    cx=${e.x} cy=${e.y} r=${o}>
      <stop offset="0" stop-color=${t.color} stop-opacity=${t.opacity} />
      <stop offset="1" stop-color=${t.color} stop-opacity="0" />
    </radialGradient>
    <circle class="fp-glow" cx=${e.x} cy=${e.y} r=${o}
            fill=${`url(#${i})`}
            clip-path=${s ? `url(#${r})` : f} />`;
}
function Mf(e, t, i, n, o, s) {
  const r = e.map((l) => {
    if (!l.glow) return;
    const c = lo(l, t?.[l.entity]);
    if (c)
      return {
        // Normalized against the glow's own ceiling, so a full-brightness lamp
        // clears the dim entirely and a dim one clears proportionally.
        strength: Math.max(0, Math.min(1, c.opacity / xi)),
        // Straight off the paint, so the clearing tracks the pool as it shrinks
        // with brightness (issue #123) instead of staying at the configured size.
        radius: c.radius
      };
  });
  if (!r.some((l) => l !== void 0)) return f;
  const a = V;
  return _`
    <defs>
      <mask id=${o} maskUnits="userSpaceOnUse"
            x=${-a} y=${-a} width=${i + a * 2} height=${n + a * 2}>
        <rect x=${-a} y=${-a} width=${i + a * 2} height=${n + a * 2}
              fill="white" />
        ${e.map((l, c) => {
    const h = r[c];
    if (h === void 0) return f;
    const { strength: d, radius: p } = h, m = `${o}-${c}`, g = s?.length ? Qr(l.x, l.y, p, s) : void 0, b = `${m}-clip`;
    return _`
            ${g ? _`<clipPath id=${b}>
                        <polygon points=${g.map((v) => `${v.x},${v.y}`).join(" ")} />
                      </clipPath>` : f}
            <radialGradient id=${m} gradientUnits="userSpaceOnUse"
                            cx=${l.x} cy=${l.y} r=${p}>
              <stop offset="0" stop-color="#000" stop-opacity=${d} />
              <stop offset="1" stop-color="#000" stop-opacity="0" />
            </radialGradient>
            <circle cx=${l.x} cy=${l.y} r=${p} fill=${`url(#${m})`}
                    clip-path=${g ? `url(#${b})` : f} />`;
  })}
      </mask>
    </defs>`;
}
function ta(e, t, i, n, o = Me) {
  const s = V;
  return _`
    <defs>
      <mask id=${n} maskUnits="userSpaceOnUse"
            x=${-s} y=${-s} width=${t + s * 2} height=${i + s * 2}>
        <rect x=${-s} y=${-s} width=${t + s * 2} height=${i + s * 2}
              fill="white" />
        ${e.map((r) => {
    const a = r.angle ? `rotate(${r.angle} ${r.x} ${r.y})` : void 0, l = qi(o, r.type)?.footprint === "ellipse", c = 1 - Yc;
    return l ? _`<ellipse cx=${r.x} cy=${r.y} rx=${r.w / 2} ry=${r.h / 2}
                           fill="#000" fill-opacity=${c} transform=${a ?? f} />` : _`<rect x=${r.x - r.w / 2} y=${r.y - r.h / 2} width=${r.w} height=${r.h}
                        fill="#000" fill-opacity=${c} transform=${a ?? f} />`;
  })}
      </mask>
    </defs>`;
}
function ia(e, t, i) {
  if (e.enableHideByEntity) {
    const n = e.hideEntity || e.entity;
    let o = t;
    return n && i && i.states[n] && (o = e.hideAttribute ? i.states[n].attributes[e.hideAttribute] : i.states[n].state), uo(
      o,
      e.hideMode,
      e.hideState,
      e.hideOperator,
      e.hideThreshold,
      e.hideInvert
    );
  }
  return e.hideWhenInactive ? e.entity ? !Ie(e.entity, t) : !0 : !1;
}
function Cf(e, t) {
  return e.showOnlyWhenZoomed ? t ? e.area ? e.area !== t.id && e.area !== t.name : !Xi(t.points ?? [], e.x, e.y) : !0 : !1;
}
function Tf(e, t, i) {
  if (!e.enableHideBadgeByEntity) return !1;
  let n = t;
  if (i) {
    const o = e.hideBadgeEntity || e.entity;
    o && i.states[o] && (n = e.hideBadgeAttribute && i.states[o].attributes ? String(i.states[o].attributes[e.hideBadgeAttribute]) : i.states[o].state);
  }
  return uo(
    n,
    e.hideBadgeMode,
    e.hideBadgeMatch,
    // Ensure this property is correctly mapped in your types, or use hideBadgeState
    e.hideBadgeOperator,
    e.hideBadgeThreshold,
    e.hideBadgeInvert
  );
}
const na = 12;
function oa(e, t) {
  const i = [];
  if (t.showName) {
    const o = t.entity ? e?.states[t.entity]?.attributes?.friendly_name : void 0, s = t.name || o || t.entity;
    s && i.push(s);
  }
  let n = !1;
  if (t.enableHideStateByEntity && e) {
    const o = t.hideStateEntity || t.entity;
    let s;
    o && e.states[o] && (s = t.hideStateAttribute && e.states[o].attributes ? e.states[o].attributes[t.hideStateAttribute] : e.states[o].state), n = uo(
      s,
      t.hideStateMode,
      t.hideStateMatch,
      t.hideStateOperator,
      t.hideStateThreshold,
      t.hideStateInvert
    );
  }
  if (t.entity && (t.showState ?? t.kind === "sensor") && !n && i.push($f(e, t)), !n)
    for (const o of je(t)) {
      if (o.showState === !1) continue;
      const s = wf(e, t, o);
      s && i.push(s);
    }
  return i.join(" · ");
}
const Is = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
function uo(e, t = "state", i, n = "==", o, s = !1) {
  if (e == null || e === "") return !1;
  let r = !1;
  if (t === "threshold") {
    if (o == null) return !1;
    const a = Number(e);
    if (!Number.isFinite(a)) return !1;
    switch (n) {
      case "<":
        r = a < o;
        break;
      case "<=":
        r = a <= o;
        break;
      case "==":
        r = a === o;
        break;
      case "!=":
        r = a !== o;
        break;
      case ">=":
        r = a >= o;
        break;
      case ">":
        r = a > o;
        break;
      default:
        return !1;
    }
  } else {
    if (i == null || String(i).trim() === "") return !1;
    const a = String(e).trim().toLowerCase(), l = String(i).trim().toLowerCase();
    if (Is.has(a) && !Is.has(l))
      return !1;
    r = n === "!=" ? a !== l : a === l;
  }
  return s ? !r : r;
}
function If(e) {
  return e.showName || (e.showState ?? e.kind === "sensor") ? !0 : je(e).some((t) => t.showState !== !1 && (t.entity || t.attribute));
}
function fo(e) {
  const t = e.labelPosition;
  return t === "left" || t === "right" ? t : "below";
}
function Pf(e, t) {
  const i = oa(e, t);
  return i ? { text: i, live: !0 } : { text: t.name || t.entity || t.kind, live: !1 };
}
function sa(e) {
  return Math.min(40, Math.max(8, R(e, na)));
}
function ra(e, t) {
  if (!e.disableLabelColor) return t;
  if (e.useCustomLabelColor)
    return j(e.labelCustomColor) ?? void 0;
}
function Of(e) {
  return Math.min(40, Math.max(8, R(e, io)));
}
function zf(e) {
  return Math.min(Or, Math.max(2, R(e, V)));
}
function aa(e) {
  return e === void 0 ? "" : `stroke-width:${zf(e)};`;
}
function mo(e) {
  return e === "plan" ? "plan" : "fixed";
}
function W(e, t) {
  return t === "plan" ? `calc(${e} * var(--fp-u, 1px))` : `${e}px`;
}
function Lf(e, t) {
  return t !== "plan" && e === void 0 ? "" : `font-size:${W(Of(e), t)};`;
}
function Ps(e) {
  switch (e) {
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
const Rf = {
  media_player: { on: "mdi:television-play", off: "mdi:television-off" },
  fan: { on: "mdi:fan", off: "mdi:fan-off" },
  lock: { on: "mdi:lock-open-variant", off: "mdi:lock" },
  camera: { on: "mdi:cctv", off: "mdi:cctv-off" },
  humidifier: { on: "mdi:air-humidifier", off: "mdi:air-humidifier-off" },
  vacuum: { on: "mdi:robot-vacuum", off: "mdi:robot-vacuum-variant" }
}, Ff = {
  paused: "mdi:television-pause",
  idle: "mdi:television"
}, Df = {
  off: "mdi:power",
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan"
}, Nf = {
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
}, Hf = {
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
}, jf = {
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
}, Wf = {
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
function Uf(e) {
  return e === "on" || e === "open" || e === "home" || e === "playing";
}
const Bf = {
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
function Ie(e, t) {
  if (!t || t === "unavailable" || t === "unknown") return !1;
  const i = e?.split(".")[0] ?? "", n = Bf[i];
  return n ? n.has(t) : Uf(t);
}
const Gf = {
  fan: "spin",
  media_player: "pulse",
  vacuum: "pulse"
};
function la(e) {
  return Gf[e?.split(".")[0] ?? ""];
}
const qf = /* @__PURE__ */ new Set(["idle", "off"]);
function Kf(e) {
  const t = e?.hvac_action;
  return typeof t != "string" ? !0 : !qf.has(t);
}
function ca(e, t, i) {
  const n = e.iconAnimation ?? "auto";
  if (n !== "none" && Ie(e.entity, t)) {
    if (e.entity?.split(".")[0] === "climate") {
      if (!Kf(i)) return;
      if (t === "fan_only") return "spin";
    }
    return n === "spin" || n === "pulse" ? n : la(e.entity);
  }
}
const Vf = /* @__PURE__ */ new Set(["motion", "occupancy", "presence", "vibration"]);
function da(e, t) {
  const i = e?.split(".")[0];
  return i === "device_tracker" || i === "person" ? !0 : i === "binary_sensor" && !!t && Vf.has(t);
}
function ha(e, t, i, n) {
  const o = e.split(".")[0];
  if (o === "climate")
    return Df[n ?? ""] ?? (i ? "mdi:thermostat" : "mdi:power");
  if (o === "weather") return Nf[n ?? ""] ?? "mdi:weather-cloudy";
  if (o === "media_player" && n) {
    const r = Ff[n];
    if (r) return r;
  }
  const s = Rf[o];
  if (s) return i ? s.on : s.off;
  if (t) {
    if (o === "binary_sensor") {
      const r = Hf[t];
      return r ? i ? r.on : r.off : void 0;
    }
    if (o === "sensor") return jf[t];
    if (o === "cover") {
      const r = Wf[t];
      return r ? i ? r.on : r.off : void 0;
    }
  }
}
function go(e, t) {
  if (t)
    return e.attribute ? t.attributes?.[e.attribute] : t.state;
}
function zn(e, t, i) {
  const n = Ot(Zr(e.stateColor, go(e, t))?.icon);
  if (n) return n;
  const o = Ot(e.icon);
  if (o) return o;
  if (!e.entity) return Ps(e.kind);
  if (i) return i;
  const s = t?.attributes?.icon;
  return s || (ha(
    e.entity,
    t?.attributes?.device_class,
    Ie(e.entity, t?.state),
    t?.state
  ) ?? Ps(e.kind));
}
function pa(e) {
  const t = Math.round(e);
  let i = Math.round(t * 0.62);
  return i % 2 !== t % 2 && (i += 1), Math.max(2, i);
}
function qt(e) {
  return e.badgeContent === "icon" || e.badgeContent === "value" || e.badgeContent === "none" ? e.badgeContent : e.showIcon === !1 ? "none" : "icon";
}
function oi(e) {
  const t = e.pressEffect;
  return t === "scale" || t === "ripple" || t === "flash" || t === "none" ? t : Dr;
}
function Zf(e, t, i) {
  if (e.goToFloor !== "up" && e.goToFloor !== "down") return;
  const n = t.findIndex((s) => s.id === i);
  return n < 0 ? void 0 : t[n + (e.goToFloor === "up" ? 1 : -1)]?.id;
}
function ua(e) {
  const t = e.offlineStyle;
  return t === "dim" || t === "strike" || t === "none" ? t : Nr;
}
function Ln(e, t) {
  return e.entity ? t === void 0 || _t(t) : !1;
}
const Xf = {
  climate: { attribute: "current_temperature", unit: "°" },
  water_heater: { attribute: "current_temperature", unit: "°" },
  humidifier: { attribute: "current_humidity", unit: "%" }
};
function Et(e) {
  if (e == null || typeof e == "boolean" || typeof e == "string" && e.trim() === "") return;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function Yf(e) {
  if (typeof e != "string") return "";
  const t = e.trim();
  return t === "°C" || t === "°F" || t === "K" ? "°" : t === "ppm" || t === "ppb" ? "" : t.length <= 3 ? t : "";
}
function si(e) {
  return Math.abs(e) < 10 && !Number.isInteger(e) ? e.toFixed(1) : String(Math.round(e));
}
function Jf(e, t) {
  return t === "W" && Math.abs(e) >= 1e3 ? { n: e / 1e3, unit: "kW" } : { n: e, unit: t };
}
function Os(e, t) {
  const i = Jf(e, Yf(t));
  return si(i.n) + i.unit;
}
function fa(e, t) {
  return ga(e, t)?.text;
}
function ma(e) {
  return e === "primary" ? "primary" : e === "secondary" ? 0 : typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : void 0;
}
function ga(e, t) {
  if (!e || !t.entity) return;
  const i = je(t), n = () => {
    const a = e.states[t.entity], l = a?.attributes, c = Xf[t.entity.split(".")[0]];
    if (t.attribute) {
      const d = Et(l?.[t.attribute]);
      if (d !== void 0)
        return si(d) + (t.attribute === c?.attribute ? c.unit : "");
    }
    if (c) {
      const d = Et(l?.[c.attribute]);
      if (d !== void 0) return si(d) + c.unit;
    }
    const h = Et(a?.state);
    return h === void 0 ? void 0 : Os(h, l?.unit_of_measurement);
  }, o = (a) => {
    const l = i[a];
    if (!l) return;
    const c = l.entity || (l.attribute ? t.entity : void 0);
    if (!c) return;
    const h = e.states[c], d = h?.attributes;
    if (l.attribute) {
      const m = Et(d?.[l.attribute]);
      return m === void 0 ? void 0 : si(m);
    }
    const p = Et(h?.state);
    return p === void 0 ? void 0 : Os(p, d?.unit_of_measurement);
  }, s = ma(t.badgeEntity);
  if (s === "primary") {
    const a = n();
    return a === void 0 ? void 0 : { text: a, source: "primary" };
  }
  if (typeof s == "number") {
    const a = o(s);
    return a === void 0 ? void 0 : { text: a, source: s };
  }
  const r = n();
  if (r !== void 0) return { text: r, source: "primary" };
  for (let a = 0; a < i.length; a++) {
    const l = o(a);
    if (l !== void 0) return { text: l, source: a };
  }
}
const Qf = { ".": 0.28, "-": 0.38, "°": 0.45, "%": 1, k: 0.58 }, em = 0.7, tm = 0.85;
function zs(e) {
  let t = 0;
  for (const i of e)
    t += Qf[i] ?? (i >= "0" && i <= "9" ? em : tm);
  return t;
}
function ya(e, t) {
  const i = Math.round(R(e, Ke)), n = Math.max(0, i - 6), o = zs(t) > 0 ? n / zs(t) : i;
  let s = Math.round(Math.min(i * 0.46, o));
  return s % 2 !== i % 2 && (s -= 1), Math.max(6, s);
}
function Ls(e) {
  const t = e.split(".")[0];
  switch (t) {
    case "light":
    case "switch":
    case "sensor":
    case "binary_sensor":
    case "climate":
    case "cover":
    case "media_player":
    case "fan":
    case "camera":
    case "lock":
    case "humidifier":
    case "vacuum":
      return t;
    default:
      return "generic";
  }
}
function Y(e) {
  return e.motion ?? "swing";
}
function yo(e) {
  if (Y(e) !== "swing" || Rt(e) !== "single") return 1;
  const t = e.sashSpan;
  return typeof t != "number" || !Number.isFinite(t) ? 1 : Math.max(Kr, Math.min(1, t));
}
function bo(e) {
  const t = e.type === "door" && Y(e) === "swing";
  return e.invert ? !t : t;
}
function im(e) {
  return { sx: e.flipH ? -1 : 1, sy: e.flipV ? -1 : 1 };
}
function Vi(e) {
  return Y(e) === "slide" ? e.sliderStyle ?? "single" : "single";
}
function ba(e) {
  return e === "biparting" || e === "biparting-bypass" || e === "converging";
}
function Si(e) {
  return Y(e) === "swing" ? Ee(e) >= 2 : ba(Vi(e));
}
function Ee(e) {
  if (Y(e) !== "swing") return 1;
  switch (Rt(e)) {
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
function nm(e, t) {
  return t === 0 ? e : t === 1 ? _o(e) : { ...e, entity: e.extraEntities?.[t - 2] };
}
function _o(e) {
  return { ...e, entity: e.secondaryEntity };
}
function Rn(e) {
  return e === "window" ? "double" : "single";
}
function Rt(e) {
  return Y(e) === "swing" ? e.sash ?? Rn(e.type) : Rn(e.type);
}
function ut(e) {
  return e.shutterStyle === "roll" || e.shutterStyle === "swing" ? e.shutterStyle : e.shutterEntity?.split(".")[0] === "binary_sensor" ? "swing" : "roll";
}
function Re(e, t = !1) {
  if (!e || _t(e.state)) return 0;
  const i = e.attributes?.current_position;
  if (typeof i == "number" && Number.isFinite(i)) {
    const o = Math.max(0, Math.min(1, i / 100));
    return t ? 1 - o : o;
  }
  const n = e.state === "open" || e.state === "opening" || e.state === "closing" || e.state === "on";
  return (t ? !n : n) ? 1 : 0;
}
function ri(e, t = !1) {
  return !e || _t(e.state) ? !1 : Re(e, t) > 0 || e.state === "opening" || e.state === "closing";
}
const om = /* @__PURE__ */ new Set(["window", "blind", "shade", "shutter", "curtain", "awning"]), sm = /* @__PURE__ */ new Set(["blind", "shade", "curtain"]), rm = /* @__PURE__ */ new Set(["garage", "garage_door", "shutter"]);
function am(e) {
  const t = e ?? "";
  return {
    type: om.has(t) ? "window" : "door",
    motion: rm.has(t) ? "roll" : sm.has(t) ? "slide" : void 0
  };
}
const lm = 3;
function cm(e, t) {
  return e.split(".")[0] === "cover" && t & lm ? "cover-toggle" : "more-info";
}
function vo(e, t, i) {
  const n = e.entity || void 0, o = e.shutterEntity || void 0, s = !!(n && o && e.tapTarget === "shutter"), r = s ? o : n ?? o, a = n && o ? s ? n : o : void 0, l = t === "tap" ? e.tap_action : t === "hold" ? e.hold_action : e.double_tap_action;
  if (l) return { entity: l.entity ?? r, config: l };
  if (t === "tap")
    return r ? {
      entity: r,
      config: {
        action: (
          // Pointing the tap at the shutter opens its dialog; it does not
          // drive the motor. Choosing *which* entity answers is not the same
          // as choosing to move hardware on a tap, and that second decision
          // stays where it is explicit — `tap_action: toggle` (issue #47).
          !s && cm(r, i(r)) === "cover-toggle" ? "toggle" : "more-info"
        )
      }
    } : void 0;
  if (t === "hold" && a) return { entity: a, config: { action: "more-info" } };
}
function ai(e, t) {
  const i = t === "tap" ? e.tap_action : t === "hold" ? e.hold_action : e.double_tap_action;
  if (i)
    return { entity: i.entity ?? e.entity, config: i };
}
function dm(e) {
  return ["tap", "hold", "double_tap"].some(
    (t) => ze(ai(e, t)?.config)
  );
}
function hm(e, t) {
  return ["tap", "hold", "double_tap"].some(
    (i) => ze(vo(e, i, t)?.config)
  );
}
function _t(e) {
  return e === "unavailable" || e === "unknown";
}
function pm(e, t) {
  if (!e.entity || t === void 0) return bo(e);
  if (um(e.entity, t)) return !1;
  const i = fm(e.entity, t);
  return e.invert ? !i : i;
}
function um(e, t) {
  return _t(t) ? !0 : e.split(".")[0] === "lock" && t === "jammed";
}
function fm(e, t) {
  return e.split(".")[0] === "lock" ? Ie(e, t) : t === "on" || t === "open" || t === "opening" || t === "closing";
}
function mm(e) {
  return e === "opening" || e === "closing";
}
function Ve(e, t) {
  if (!e.entity || !t) return bo(e) ? 1 : 0;
  if (_t(t.state)) return 0;
  const i = t.attributes?.current_position;
  if (typeof i == "number" && Number.isFinite(i)) {
    const n = Math.max(0, Math.min(1, i / 100));
    return e.invert ? 1 - n : n;
  }
  return pm(e, t.state) ? 1 : 0;
}
function li(e, t) {
  return !e.entity || !t || _t(t.state) ? !1 : mm(t.state) || Ve(e, t) > 0;
}
function Rs(e, t, i) {
  const n = e / 2, o = 5, s = Math.max(3, Math.round(e / 12)), r = [];
  for (let a = 1; a < s; a++) {
    const l = -n + e * a / s;
    r.push(
      _`<line x1=${l} y1=${-o / 2} x2=${l} y2=${o / 2}
            stroke=${Ni} stroke-width="0.75" />`
    );
  }
  return _`<g class="fp-roll-curtain" style="transform:scaleY(${1 - i});">
      <rect x=${-n} y=${-o / 2} width=${e} height=${o}
            style="fill:${t};" />
      ${r}
    </g>`;
}
function gm(e, t, i, n, o = 1, s = i, r = n) {
  const a = e / 2, l = 3, c = o * (t / 2 + l / 2), h = (d, p) => {
    const m = [], g = Math.max(2, Math.round(p / 14));
    for (let b = 1; b < g; b++) {
      const v = d + p * b / g;
      m.push(
        _`<line x1=${v} y1=${-l / 2} x2=${v} y2=${l / 2}
              stroke=${Ni} stroke-width="0.75" />`
      );
    }
    return m;
  };
  return _`
      <g transform="translate(${-a} ${c})">
        <g class="fp-door-leaf" style="transform:rotate(${o * 90 * n}deg);">
          <rect x="0" y=${-l / 2} width=${a} height=${l} style="fill:${i};" />
          ${h(0, a)}
        </g>
      </g>
      <g transform="translate(${a} ${c})">
        <g class="fp-leaf-r" style="transform:rotate(${-o * 90 * r}deg);">
          <rect x=${-a} y=${-l / 2} width=${a} height=${l} style="fill:${s};" />
          ${h(-a, a)}
        </g>
      </g>`;
}
const _a = 22, Ei = 14, Ai = 22, Mi = 15;
function xo(e, t = 0) {
  const i = e.flipV ? -1 : 1, n = e.angle * Math.PI / 180, o = { x: -Math.sin(n) * i, y: Math.cos(n) * i };
  return t === 90 ? { x: -o.y, y: o.x } : t === 180 ? { x: -o.x, y: -o.y } : t === 270 ? { x: o.y, y: -o.x } : o;
}
function wo(e, t = _a) {
  const i = (e.flipV ? -1 : 1) * t, n = e.angle * Math.PI / 180;
  return { x: e.x - Math.sin(n) * i, y: e.y + Math.cos(n) * i };
}
function va(e) {
  return !!(e.entity && e.shutterEntity) && (e.showShutterIcon ?? !0);
}
const ym = { on: "mdi:window-shutter-open", off: "mdi:window-shutter" }, Fs = {
  door: { on: "mdi:door-open", off: "mdi:door-closed" },
  window: { on: "mdi:window-open", off: "mdi:window-closed" }
};
function xa(e, t, i, n, o, s) {
  const r = Ot(t);
  if (r) return r;
  const a = Ot(s);
  if (a) return a;
  const l = Ot(i?.attributes?.icon);
  return l || (ha(e, i?.attributes?.device_class, n) ?? (n ? o.on : o.off));
}
function wa(e, t, i, n) {
  return xa(
    e.shutterEntity ?? "",
    e.shutterIcon,
    t,
    i,
    ym,
    n
  );
}
function $a(e) {
  return !!e.entity && (e.showIcon ?? !1);
}
function ka(e, t, i, n) {
  return xa(
    e.entity ?? "",
    e.icon,
    t,
    i,
    Fs[e.type] ?? Fs.door,
    n
  );
}
function Sa(e) {
  return wo(e, -_a);
}
function Ea(e, t = 0) {
  const i = xo(e, t);
  return { x: -i.x, y: -i.y };
}
function Aa(e, t) {
  const { color: i, open: n = !0, active: o = !1, accent: s = G } = t, r = e.length / 2, a = V + 4, l = j(t.inactive) ?? i, c = Math.max(0, Math.min(1, t.amount ?? (n ? 1 : 0))), h = t.second ? Math.max(0, Math.min(1, t.second.amount)) : c, d = (y, w) => de(y ? s : w === 0 ? l : i, G), p = d(o, c), m = t.second ? d(!!t.second.active, h) : p, g = (t.more ?? []).map((y) => Math.max(0, Math.min(1, y.amount))), b = (t.more ?? []).map((y, w) => d(!!y.active, g[w]));
  let v;
  if (Y(e) === "swing") {
    const y = Ee(e), w = yo(e), E = y > 1 ? e.length / y : e.length * w, T = Math.PI / 2 * E, C = Array.from({ length: y }, (L, O) => {
      const M = O === 0 ? c : O === 1 ? h : g[O - 2] ?? c, re = O === 0 ? p : O === 1 ? m : b[O - 2] ?? p;
      return { index: O, amt: M, tone: re, hingeRight: y > 1 && (e.leafHinges?.[O] ? e.leafHinges[O] === "right" : O === y - 1) };
    }), D = (L, O, M) => _`<path class="fp-door-arc" d=${L}
              fill="none" stroke-width="1.5" stroke-dasharray=${T}
              style="stroke:${O};stroke-dashoffset:${T * (1 - M)};" />`, B = e.type === "window" ? _`
        <line x1=${-r} y1=${-a / 2} x2=${-r} y2=${a / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${r} y1=${-a / 2} x2=${r} y2=${a / 2}
              stroke=${i} stroke-width="2" />` : f;
    v = _`
        ${B}
        ${y > 1 ? (
      // Equal leaves side by side (floorplan-panel: 2..4). All hang on
      // their left edge but the last, which hangs on the right; for two
      // that is the classic pair meeting in the middle, each tracing
      // its own quarter circle outward.
      _`${C.map((L) => {
        const O = -r + L.index * E, M = O + E;
        return L.hingeRight ? D(`M ${O} 0 A ${E} ${E} 0 0 1 ${M} ${-E}`, L.tone, L.amt) : D(`M ${M} 0 A ${E} ${E} 0 0 0 ${O} ${-E}`, L.tone, L.amt);
      })}`
    ) : (
      // Hinged at the −x jamb, so the tip starts `leafW` along the wall
      // and ends `leafW` out from it. At full span that is exactly the
      // arc this drew before `sashSpan` existed.
      D(`M ${-r + E} 0 A ${E} ${E} 0 0 0 ${-r} ${-E}`, p, c)
    )}
        ${// The pane the sash does not cover: fixed glass, drawn in the base
    // colour because it never opens and so is never the active part.
    // Nothing at full span, which is every opening that predates this.
    w < 1 ? _`<line x1=${-r + E} y1="0" x2=${r} y2="0"
              stroke=${i} stroke-width=${e.type === "window" ? 1.5 : 2.5} />` : f}
        <!-- leaves hinged at their left edge, the last at its right (flipH mirrors them) -->
        ${C.map((L) => {
      const O = -r + L.index * E;
      return L.hingeRight ? _`<g transform="translate(${O + E} 0)">
          <g class="fp-leaf-r" style="transform:rotate(${90 * L.amt}deg);">
            <rect x=${-E} y="-1.25" width=${E} height="2.5" style="fill:${L.tone};" />
          </g>
        </g>` : _`<g transform="translate(${O} 0)">
          <g class="fp-door-leaf" style="transform:rotate(${-90 * L.amt}deg);">
            <rect x="0" y="-1.25" width=${E} height="2.5" style="fill:${L.tone};" />
          </g>
        </g>`;
    })}
      `;
  } else if (Y(e) === "fixed") {
    const y = e.type === "window" ? 1.5 : 2.5;
    v = _`
        ${e.type === "window" ? _`
        <line x1=${-r} y1=${-a / 2} x2=${-r} y2=${a / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${r} y1=${-a / 2} x2=${r} y2=${a / 2}
              stroke=${i} stroke-width="2" />` : f}
        <line x1=${-r} y1="0" x2=${r} y2="0"
              stroke=${i} stroke-width=${y} />`;
  } else if (Y(e) === "awning") {
    const y = Math.min(12, e.length * 0.16), w = 5, E = r - y / 2 - 1, T = Math.max(0, E - y / 2), C = Math.min(r * 0.62, 34) * c, D = Math.min(C * 0.16, T * 0.4), B = c > 0.02;
    v = _`
        <!-- jambs, as any window -->
        <line x1=${-r} y1=${-a / 2} x2=${-r} y2=${a / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${r} y1=${-a / 2} x2=${r} y2=${a / 2}
              stroke=${i} stroke-width="2" />
        <!-- The glass line: solid while the sash is shut and sitting in it,
             broken once the sash has swung out and left the gap behind. -->
        <line x1=${-r} y1="0" x2=${r} y2="0"
              stroke=${p} stroke-width="1.5"
              stroke-dasharray=${B ? "6 4" : f} />
        ${B ? (
      // A polyline, not a polygon, and that is the whole point of the
      // broken line above it. A closed shape strokes its own base back
      // along y=0 — straight over the dashes, solid — and the only
      // glass left uncovered would be the sliver outside `bx`, which
      // is exactly where the knuckles sit. The line would have been
      // dashed in the markup and solid on the screen at every size.
      _`<polyline
                    points="${-T},0 ${-T + D},${-C} ${T - D},${-C} ${T},0"
                    fill="none" stroke=${p} stroke-width="1.5"
                    stroke-linejoin="round" />`
    ) : f}
        <!-- Hinge knuckles, drawn whether or not it is open: they are what says
             this window is top-hung rather than fixed when it happens to be
             shut, and the request asked for them by name. -->
        ${[-E, E].map(
      (L) => _`
          <rect x=${L - y / 2} y=${-w / 2} width=${y} height=${w}
                fill="none" stroke=${p} stroke-width="1.25" />
          <line x1=${L} y1=${-w / 2} x2=${L} y2=${w / 2}
                stroke=${p} stroke-width="1.25" />`
    )}`;
  } else if (Y(e) === "roll")
    v = _`
        <!-- jambs -->
        <line x1=${-r} y1=${-a / 2} x2=${-r} y2=${a / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${r} y1=${-a / 2} x2=${r} y2=${a / 2}
              stroke=${i} stroke-width="2" />
        <!-- Track: stays when the curtain is up so the gap still reads as an
             opening — and wears the accent while the cover is open or moving
             (issue #154). Wide open the curtain has scaled away to nothing, so
             this line is the *only* mark left: drawn in the base colour it read
             exactly like a shut garage, which is the one thing it must not do.
             Full strength when accented, since a 0.6 tint of the accent reads
             as neither colour. -->
        <line x1=${-r} y1="0" x2=${r} y2="0"
              stroke=${p} stroke-width="0.75" opacity=${o ? 1 : 0.6} />
        ${Rs(e.length, p, c)}`;
  else {
    const y = e.type === "window" ? 1.5 : 2.5, w = _`
        <line x1=${-r} y1=${-a / 2} x2=${-r} y2=${a / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${r} y1=${-a / 2} x2=${r} y2=${a / 2}
              stroke=${i} stroke-width="2" />`, E = Vi(e);
    if (E === "bypass") {
      const C = -r * c;
      v = _`
        ${w}
        <!-- tracks -->
        <line x1=${-r} y1=${-1.75} x2=${r} y2=${-1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <line x1=${-r} y1=${1.75} x2=${r} y2=${1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <!-- fixed panel: left half, front track -->
        <rect x=${-r} y=${1.75 - y / 2} width=${r} height=${y} style="fill:${p};" />
        <!-- moving panel: right half, back track -->
        <g class="fp-slide-panel" style="transform:translateX(${C}px);">
          <rect x="0" y=${-1.75 - y / 2} width=${r} height=${y} style="fill:${p};" />
        </g>`;
    } else if (E === "biparting")
      v = _`
        ${w}
        <!-- track -->
        <line x1=${-r} y1="0" x2=${r} y2="0"
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <g class="fp-slide-panel" style="transform:translateX(${-r * c}px);">
          <rect x=${-r} y=${-y / 2} width=${r} height=${y} style="fill:${p};" />
        </g>
        <g class="fp-slide-panel" style="transform:translateX(${r * h}px);">
          <rect x="0" y=${-y / 2} width=${r} height=${y} style="fill:${m};" />
        </g>`;
    else if (E === "biparting-bypass") {
      const C = r / 2;
      v = _`
        ${w}
        <!-- tracks -->
        <line x1=${-r} y1=${-1.75} x2=${r} y2=${-1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <line x1=${-r} y1=${1.75} x2=${r} y2=${1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <!-- fixed panels: outer quarters, front track. Never accented, even
             wide open — the accent marks what has moved, and lighting these
             would accent exactly the half that is still glazed shut. -->
        <rect x=${-r} y=${1.75 - y / 2} width=${C} height=${y} fill=${i} />
        <rect x=${r - C} y=${1.75 - y / 2} width=${C} height=${y} fill=${i} />
        <!-- moving panels: inner quarters, back track -->
        <g class="fp-slide-panel" style="transform:translateX(${-C * c}px);">
          <rect x=${-C} y=${-1.75 - y / 2} width=${C} height=${y} style="fill:${p};" />
        </g>
        <g class="fp-slide-panel" style="transform:translateX(${C * h}px);">
          <rect x="0" y=${-1.75 - y / 2} width=${C} height=${y} style="fill:${m};" />
        </g>`;
    } else if (E === "converging") {
      const C = r / 2;
      v = _`
        ${w}
        <!-- tracks -->
        <line x1=${-r} y1=${-1.75} x2=${r} y2=${-1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <line x1=${-r} y1=${1.75} x2=${r} y2=${1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <!-- both panels move, so both take the accent on their own state:
             front track travels right, back track left, and they meet. -->
        <g class="fp-slide-panel" style="transform:translateX(${C * c}px);">
          <rect x=${-r} y=${1.75 - y / 2} width=${r} height=${y} style="fill:${p};" />
        </g>
        <g class="fp-slide-panel" style="transform:translateX(${-C * h}px);">
          <rect x="0" y=${-1.75 - y / 2} width=${r} height=${y} style="fill:${m};" />
        </g>`;
    } else {
      const T = e.length * c;
      v = _`
        ${w}
        <!-- track -->
        <line x1=${-r} y1="0" x2=${r} y2="0"
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <g class="fp-slide-panel" style="transform:translateX(${T}px);">
          <rect x=${-r} y=${-y / 2} width=${e.length} height=${y} style="fill:${p};" />
        </g>`;
    }
  }
  if (t.shutter) {
    const y = Math.max(0, Math.min(1, t.shutter.amount)), w = (B, L) => de(B ? t.shutter.accent ?? s : L === 0 ? l : i, G), E = w(t.shutter.active, y), T = t.shutter.second, C = T ? Math.max(0, Math.min(1, T.amount)) : y, D = T ? w(T.active, C) : E;
    v = _`${v}${t.shutter.style === "swing" ? gm(
      e.length,
      a,
      E,
      y,
      t.shutter.flip ? -1 : 1,
      D,
      C
    ) : Rs(e.length, E, y)}`;
  }
  const { sx: x, sy: $ } = im(e);
  return _`<g class=${`fp-opening fp-opening-${le(e.type) ?? "unknown"}`}
                data-id=${le(e.id) ?? f}
                data-entity=${Ne(e.entity) ?? f}
                transform="translate(${e.x} ${e.y}) rotate(${e.angle})">
      <g transform="scale(${x} ${$})">${v}</g>
    </g>`;
}
function Ft(e) {
  if (typeof e != "number" || !Number.isFinite(e)) return 0;
  const t = (e % 360 + 360) % 360;
  return t === 90 || t === 180 || t === 270 ? t : 0;
}
function bm(e, t) {
  const i = Ft(e.rotation);
  if (t === void 0) return i;
  const n = t ? e.rotationPortrait : e.rotationLandscape;
  return n == null ? i : Ft(n);
}
function _m(e, t) {
  return typeof e.addEventListener == "function" ? (e.addEventListener("change", t), () => e.removeEventListener?.("change", t)) : typeof e.addListener == "function" ? (e.addListener(t), () => e.removeListener?.(t)) : () => {
  };
}
function Ge(e, t, i) {
  return i === 90 || i === 270 ? { w: t, h: e } : { w: e, h: t };
}
function ct(e, t, i, n, o) {
  switch (o) {
    case 90:
      return { x: n - t, y: e };
    case 180:
      return { x: i - e, y: n - t };
    case 270:
      return { x: t, y: i - e };
    default:
      return { x: e, y: t };
  }
}
function vm(e, t, i) {
  switch (i) {
    case 90:
      return `translate(${t} 0) rotate(90)`;
    case 180:
      return `translate(${e} ${t}) rotate(180)`;
    case 270:
      return `translate(0 ${e}) rotate(-90)`;
    default:
      return "";
  }
}
function xm(e, t = to, i = vi) {
  const n = Math.min(t, i), o = Math.max(t, i);
  if (!(typeof e == "number" || typeof e == "string" && e.trim() !== "")) return o;
  const r = typeof e == "number" ? e : Number(e);
  if (!Number.isFinite(r)) return o;
  const a = Zc - ps, l = Math.max(0, Math.min(1, (r - ps) / a)), c = l * l * (3 - 2 * l);
  return n + (o - n) * c;
}
const Fn = 135, Ds = 12;
function $o(e) {
  if (!(typeof e == "number" || typeof e == "string" && e.trim() !== "")) return;
  const i = typeof e == "number" ? e : Number(e);
  return Number.isFinite(i) ? i : void 0;
}
function wm(e) {
  const t = $o(e);
  if (t === void 0) return 1;
  if (t <= 0) return 0;
  if (t >= Ds) return 1;
  const i = t / Ds;
  return i * i * (3 - 2 * i);
}
function $m(e, t = 0) {
  const i = (e + t) * Math.PI / 180;
  return { x: Math.sin(i), y: -Math.cos(i) };
}
function km(e, t) {
  return Zi(e) ? e.sunBearing : $o(t) ?? Fn;
}
function Zi(e) {
  return typeof e.sunBearing == "number" && Number.isFinite(e.sunBearing);
}
function Sm(e, t) {
  return Zi(e) ? 1 : wm(t);
}
const Ci = 0.34, Em = 30, Am = 0.95, Mm = 0.16, Cm = 0.37, Dn = "var(--fp-skin-sunlight, #ffd9a0)", Nn = "var(--fp-skin-sunshade, #000)";
function Tm(e) {
  return Math.max(0.02, Math.min(1.5, R(e, Ci)));
}
function Im(e, t, i, n) {
  let o = n;
  for (const s of i) {
    const r = ho(e.x, e.y, t.x, t.y, s);
    r !== void 0 && r > 1 && r < o && (o = r);
  }
  return o;
}
function Pm(e) {
  const t = $o(e);
  if (t === void 0) return 1;
  const i = (o) => o * Math.PI / 180, n = Math.tan(i(Em)) / Math.tan(i(Math.max(1, Math.min(89, t))));
  return Math.max(0.45, Math.min(1.9, n));
}
function Om(e, t, i) {
  return e.sunlight === !1 || i !== void 0 && i <= 0 ? 0 : ko(e) ? 1 : Math.max(0, Math.min(1, t));
}
function ko(e) {
  return e.glazed ?? e.type === "window";
}
function Ma(e) {
  const t = e.angle * Math.PI / 180, i = Math.cos(t) * e.length / 2, n = Math.sin(t) * e.length / 2;
  return [
    { x: e.x - i, y: e.y - n },
    { x: e.x + i, y: e.y + n }
  ];
}
function Xi(e, t, i) {
  let n = !1;
  for (let o = 0, s = e.length - 1; o < e.length; s = o++) {
    const r = e[o], a = e[s];
    r.y > i != a.y > i && t < (a.x - r.x) * (i - r.y) / (a.y - r.y) + r.x && (n = !n);
  }
  return n;
}
function zm(e, t, i) {
  for (const n of t) {
    const o = ho(e.x, e.y, -i.x, -i.y, n);
    if (o === void 0) continue;
    if (!(o <= ki && co(e.x, e.y, n) <= ki)) return !1;
  }
  return !0;
}
function Lm(e, t) {
  return $m(km(e, t) + 180, e.north ?? 0);
}
function Ca(e, t, i, n) {
  return [
    e,
    t,
    { x: t.x + i.x * n, y: t.y + i.y * n },
    { x: e.x + i.x * n, y: e.y + i.y * n }
  ];
}
function Rm(e, t, i, n = 1) {
  const [o, s] = Ma(e), r = Math.max(0, Math.min(1, n)), a = (o.x + s.x) / 2, l = (o.y + s.y) / 2, c = (h) => ({ x: a + (h.x - a) * r, y: l + (h.y - l) * r });
  return Ca(c(o), c(s), t, i);
}
function Fm(e, t, i) {
  return Ca({ x: e.x1, y: e.y1 }, { x: e.x2, y: e.y2 }, t, i);
}
function Ns(e) {
  return e.map((t) => `${t.x},${t.y}`).join(" ");
}
function Dm(e, t, i, n, o, s) {
  const { dir: r, openAmount: a, shutterOpen: l, strength: c = 1 } = s, h = {
    light: s.light ?? Dn,
    // `?? ` would swallow the explicit null that means "no shade at all".
    shade: s.shade === void 0 ? Nn : s.shade
  };
  if (c <= 0) return f;
  const d = Math.min(i, n) * Tm(s.reach), p = (M) => Om(M, a(M), l(M)), m = po(e, t, p), g = m.map((M) => Fm(M, r, d)), b = t.map((M, re) => {
    if (!(p(M) > 0 && zm(M, e, r))) return;
    const tt = Im(M, r, m, d), [To, Io] = Ma(M), Xa = Io.x - To.x, Ya = Io.y - To.y, Ja = Math.abs(Xa * r.y - Ya * r.x) * p(M) / 2;
    return {
      // The outline runs past the falloff, so the ellipse is what bounds the
      // patch and never the polygon's flat far edge.
      points: Ns(Rm(M, r, tt + M.length, p(M))),
      cx: M.x,
      cy: M.y,
      along: tt,
      across: Math.max(1, Ja * Am),
      angle: Math.atan2(r.y, r.x) * 180 / Math.PI,
      lightId: `${o}-b${re}`,
      shadeId: `${o}-s${re}`,
      fadeId: `${o}-f${re}`
    };
  });
  if (!b.some((M) => M !== void 0)) return f;
  const v = g.map(Ns), x = V, $ = `${o}-shade`, y = `${o}-shadow`, w = -x, E = -x, T = i + x * 2, C = n + x * 2, D = (M, re = f) => _`<rect x=${w} y=${E} width=${T} height=${C} fill=${M}>${re}</rect>`, B = (M, re) => _`<polygon points=${M} fill=${re} stroke=${re} stroke-width=${V} />`, L = (M, re, tt) => _`<radialGradient id=${re} gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1"
              gradientTransform=${`translate(${M.cx} ${M.cy}) rotate(${M.angle}) scale(${M.along} ${M.across})`}>
          <stop offset="0" stop-color=${tt} stop-opacity="1" />
          <stop offset="0.45" stop-color=${tt} stop-opacity="0.55" />
          <stop offset="1" stop-color=${tt} stop-opacity="0" />
        </radialGradient>`, O = h.shade === null ? f : _`
      <!-- Where the shade shows: everywhere, minus the patches of light, plus
           back wherever a wall stands in one. The order is the whole logic. -->
      <mask id=${$} maskUnits="userSpaceOnUse" x=${w} y=${E} width=${T} height=${C}>
        ${D("#fff")}
        ${b.map((M) => M ? L(M, M.shadeId, "#000") : f)}
        ${b.map(
    (M) => M ? _`<polygon points=${M.points} fill=${`url(#${M.shadeId})`} />` : f
  )}
        ${v.map((M) => B(M, "#fff"))}
      </mask>`;
  return _`
    <defs>
      ${O}
      <!-- The wall shadows again, for the warm patches themselves. -->
      <mask id=${y} maskUnits="userSpaceOnUse" x=${w} y=${E} width=${T} height=${C}>
        ${D("#fff")}
        ${v.map((M) => B(M, "#000"))}
      </mask>
    </defs>
    <g class="fp-sunlight">
      ${h.shade === null ? f : _`<rect x=${w} y=${E} width=${T} height=${C}
            style=${`fill:${de(h.shade, Nn)};`}
            opacity=${Mm * c} mask=${`url(#${$})`} />`}
      <g mask=${`url(#${y})`} opacity=${Cm * c}>
        ${b.map(
    (M) => M ? L(M, M.lightId, de(h.light, Dn)) : f
  )}
        ${b.map(
    (M) => M ? _`<polygon class="fp-sunbeam" points=${M.points}
                            fill=${`url(#${M.lightId})`} />` : f
  )}
      </g>
    </g>`;
}
function Ta(e) {
  switch (e) {
    case "contain":
      return "xMidYMid meet";
    case "cover":
      return "xMidYMid slice";
    default:
      return "none";
  }
}
function Ia(e, t, i, n) {
  const o = V + 4, s = V;
  return _`
    <defs>
      <mask id=${n} maskUnits="userSpaceOnUse"
            x=${-s} y=${-s} width=${t + s * 2} height=${i + s * 2}>
        <rect x=${-s} y=${-s} width=${t + s * 2} height=${i + s * 2}
              fill="white" />
        ${e.map((r) => {
    const a = r.length / 2;
    return _`<rect x=${r.x - a} y=${r.y - o / 2}
                           width=${r.length} height=${o} fill="black"
                           transform="rotate(${r.angle} ${r.x} ${r.y})" />`;
  })}
      </mask>
    </defs>`;
}
function So(e) {
  if (!e.length) return { x: 0, y: 0 };
  const t = e.reduce((i, n) => ({ x: i.x + n.x, y: i.y + n.y }), { x: 0, y: 0 });
  return { x: t.x / e.length, y: t.y / e.length };
}
const Hn = { scale: 1, txPercent: 0, tyPercent: 0 };
function Nm(e, t, i, n, o = 0.15, s = Cn, r) {
  if (!e.length) return Hn;
  const a = e.map((C) => ct(C.x, C.y, t, i, n)), l = Ge(t, i, n), c = a.map((C) => C.x), h = a.map((C) => C.y), d = Math.min(...c), p = Math.max(...c), m = Math.min(...h), g = Math.max(...h), b = Math.max(p - d, g - m) * o, v = Math.max(p - d + b * 2, 1), x = Math.max(g - m + b * 2, 1), $ = Math.max(1, Math.min(s, Math.min(l.w / v, l.h / x))), y = r ?? $;
  if (!Number.isFinite(y)) return Hn;
  const w = (d + p) / 2 / l.w, E = (m + g) / 2 / l.h, T = (C) => Math.min(0, Math.max(100 * (1 - y), C));
  return {
    scale: y,
    txPercent: T(50 - y * w * 100),
    tyPercent: T(50 - y * E * 100)
  };
}
function Hm(e) {
  const t = e.zoom;
  if (!(typeof t != "number" || !Number.isFinite(t)))
    return Math.max(1, Math.min(Hr, t));
}
function jm(e, t) {
  if (!Number.isFinite(e) || e <= 1) return 1;
  const i = typeof t == "number" && Number.isFinite(t) && t > 0 ? t : Tn;
  return 1 / e * i;
}
const pn = 12, Wm = 1.5, Um = 0.4;
function Pa(e) {
  return _`
    <defs>
      <pattern id=${e} width=${pn} height=${pn}
               patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line class="fp-dead-space-line" x1="0" y1="0" x2="0" y2=${pn}
              stroke=${Jn} stroke-width=${Wm} />
      </pattern>
    </defs>`;
}
function Oa(e, t) {
  const i = e.map((n) => `${n.x},${n.y}`).join(" ");
  return _`<polygon class="fp-dead-space" points=${i}
                      fill=${`url(#${t})`} fill-rule="nonzero"
                      fill-opacity=${Um} stroke="none" />`;
}
function za(e, t) {
  const i = e.points.map((s) => `${s.x},${s.y}`).join(" "), n = t !== void 0 && (e.highlight ?? "fill") !== "border", o = n ? e.activeOpacity ?? e.opacity : e.opacity;
  return _`<polygon class="fp-area" data-id=${le(e.id) ?? f}
                       data-entity=${Ne(e.entity) ?? f}
                       points=${i}
                       fill=${n ? t : de(e.color, G)}
                       fill-opacity=${R(o, Mn)}
                       stroke=${e.type === "balcony" ? de(e.color, G) : "none"}
                       stroke-width=${e.type === "balcony" ? 3 : 0}
                       stroke-dasharray=${e.type === "balcony" ? "10 6" : f} />`;
}
function La(e, t, i) {
  const n = t !== void 0 && (e.highlight ?? "fill") !== "fill", o = n ? t : e.borderColor ? de(e.borderColor, "none") : void 0;
  if (o === void 0 || o === "none") return f;
  const s = e.points.map((a) => `${a.x},${a.y}`).join(" "), r = R(
    e.borderWidth,
    n ? V / 2 : Xc
  );
  return !n || i === void 0 ? _`<polygon class="fp-area-border" data-id=${le(e.id) ?? f}
                        data-entity=${Ne(e.entity) ?? f}
                        points=${s} fill="none"
                        stroke=${o} stroke-width=${r} />` : _`
    <clipPath id=${i}><polygon points=${s} /></clipPath>
    <polygon class="fp-area-border" data-id=${le(e.id) ?? f}
             data-entity=${Ne(e.entity) ?? f}
             points=${s} fill="none" clip-path=${`url(#${i})`}
             stroke=${o} stroke-width=${r * 2} />`;
}
function jn(e, t, i = Me) {
  const n = t ?? e.color ?? Jc, o = cf(qi(i, e.type) ?? nf, e.w, e.h, n), s = e.hand === "left" ? " scale(-1 1)" : "";
  return _`<g class=${`fp-furniture fp-furniture-${le(e.type) ?? "unknown"}`}
                data-id=${le(e.id) ?? f}
                data-entity=${Ne(e.entity) ?? f}
                transform="translate(${e.x} ${e.y}) rotate(${e.angle ?? 0})${s}">${o}</g>`;
}
function Ti(e, t, i, n, o, s = 3, r = "fixed") {
  function a(p) {
    return (p % 360 + 360) % 360;
  }
  function l(p, m, g) {
    return Math.max(Math.min(p, g), m);
  }
  const c = W(R(i, ji), r), h = a(R(n, Wi)), d = l(R(o, Ui), 0, 360);
  return u`
    <div
      class="ripple ${e ? "active" : ""}"
      style="width:${c};height:${c};--fp-ripple-color:${de(t, G)};--fp-ripple-direction:${h};--fp-ripple-width:${d}"
    >
      <span class="dot"></span>
      ${Array.from(
    { length: s },
    (p, m) => u`<span class="ring" style="animation-delay:${(m * 0.6).toFixed(2)}s;"></span>`
  )}
    </div>
  `;
}
function Ii(e, t) {
  if (!t || !e) return null;
  const i = e[t]?.state;
  if (i == null || i === "unavailable" || i === "unknown") return null;
  const n = Number(i);
  return Number.isFinite(n) ? n : null;
}
function Ra(e, t) {
  const i = e.color ?? G, n = (e.dotSize ?? no) / 2, o = e.x + e.w / 2, s = e.y + e.h / 2, r = e.angle ?? 0, a = ws(e.xSensor, t.xReading), l = ws(e.ySensor, t.yReading), c = a != null, h = l != null, d = t.xPresent === !1 || t.yPresent === !1, p = e.w / 2, m = e.h / 2, g = t.editing ? _`<rect class="tracker-zone ${d ? "presence-gated" : ""}"
                x=${-p} y=${-m} width=${e.w} height=${e.h}
                fill=${i} fill-opacity="0.08" stroke=${i} stroke-width="1.5"
                stroke-dasharray="6 4" rx="4" pointer-events="none" />` : _``;
  let b;
  if (d)
    b = _``;
  else if (c && h) {
    const v = -p + a * e.w, x = -m + l * e.h, $ = `0,${-n} ${n * 0.9},${n * 0.7} ${-n * 0.9},${n * 0.7}`, y = Math.max(n * 3.5, Math.min(e.w, e.h) * 0.45);
    b = _`
      <g class="tracker-marker" style="transform:translate(${v}px, ${x}px);">
        <circle class="tracker-ring" cx="0" cy="0" r="0"
                fill="none" stroke=${i} stroke-width="1.5"
                style="--fp-tracker-ring-max:${y}px;" />
        <circle class="tracker-ring" cx="0" cy="0" r="0"
                fill="none" stroke=${i} stroke-width="1.5"
                style="--fp-tracker-ring-max:${y}px; animation-delay:0.7s;" />
        <polygon class="tracker-dot" points=${$} fill=${i} />
      </g>`;
  } else if (c || h)
    if (c) {
      const v = -p + a * e.w;
      b = _`
        <g class="tracker-line" style="transform:translate(${v}px, 0);">
          <line class="tracker-line-stroke" x1="0" y1=${-m} x2="0" y2=${m}
                stroke=${i} stroke-width="1.5" />
          <line class="tracker-band" x1="0" y1=${-m} x2="0" y2=${m}
                stroke=${i} stroke-width="3" stroke-linecap="round" />
          <line class="tracker-band" x1="0" y1=${-m} x2="0" y2=${m}
                stroke=${i} stroke-width="3" stroke-linecap="round"
                style="animation-delay:0.8s;" />
        </g>`;
    } else {
      const v = -m + l * e.h;
      b = _`
        <g class="tracker-line tracker-line-h" style="transform:translate(0, ${v}px);">
          <line class="tracker-line-stroke" x1=${-p} y1="0" x2=${p} y2="0"
                stroke=${i} stroke-width="1.5" />
          <line class="tracker-band" x1=${-p} y1="0" x2=${p} y2="0"
                stroke=${i} stroke-width="3" stroke-linecap="round" />
          <line class="tracker-band" x1=${-p} y1="0" x2=${p} y2="0"
                stroke=${i} stroke-width="3" stroke-linecap="round"
                style="animation-delay:0.8s;" />
        </g>`;
    }
  else t.editing ? b = _`<circle class="tracker-placeholder" cx="0" cy="0" r=${n}
                          fill=${i} fill-opacity="0.25" />` : b = _``;
  return _`
    <g class="tracker fp-tracker ${t.editing ? "editing" : ""}"
       data-id=${le(e.id) ?? f}
       transform="translate(${o} ${s}) rotate(${r})">
      ${g}${b}
    </g>`;
}
function Hs(e, t, i, n) {
  let o = null, s = n;
  for (const r of i) {
    const a = r.x2 - r.x1, l = r.y2 - r.y1, c = a * a + l * l;
    if (c === 0) continue;
    let h = ((e - r.x1) * a + (t - r.y1) * l) / c;
    h = Math.max(0, Math.min(1, h));
    const d = r.x1 + h * a, p = r.y1 + h * l, m = Math.hypot(e - d, t - p);
    m < s && (s = m, o = { x: d, y: p, angle: Math.atan2(l, a) * 180 / Math.PI });
  }
  return o;
}
class Yi {
  static currentFloorEntityIds(t, i) {
    const n = t ? mt(t) : [], o = n.find((r) => r.id === i) ?? n[0];
    if (!o) return [];
    const s = /* @__PURE__ */ new Set();
    for (const r of o.openings)
      r.entity && s.add(r.entity), r.secondaryEntity && s.add(r.secondaryEntity), r.shutterEntity && s.add(r.shutterEntity), r.shutterSecondaryEntity && s.add(r.shutterSecondaryEntity);
    for (const r of o.items) {
      r.entity && s.add(r.entity);
      for (const a of je(r))
        a.entity && s.add(a.entity);
    }
    for (const r of o.furniture)
      r.entity && s.add(r.entity);
    for (const r of o.areas)
      r.entity && s.add(r.entity);
    for (const r of o.trackers)
      for (const a of [r.xSensor, r.ySensor])
        a?.entity && s.add(a.entity), a?.presence?.entity && s.add(a.presence.entity);
    return Array.from(s).sort();
  }
  static scopeKey(t, i) {
    const n = Yi.currentFloorEntityIds(t, i);
    return n.length ? n.join("|") : "none";
  }
}
function Bm(e) {
  const t = Date.now() / 1e3, i = e?.historyReplay?.lookbackSeconds, n = typeof i == "number" && Number.isFinite(i) && i > 0 ? i : 3600;
  return { start: Math.max(0, t - n), end: t };
}
function js(e, t) {
  const i = Math.max(0, Math.min(e, t)), n = Math.max(0, Math.max(e, t));
  return {
    start: i,
    end: Math.max(i, n)
  };
}
function Gm(e, t) {
  return Yi.currentFloorEntityIds(e, t);
}
function qm(e, t) {
  return Yi.scopeKey(e, t);
}
function Km(e, t, i) {
  const o = Math.max(1, i - t) / 30, s = e?.historyReplay?.defaultSpeed;
  return Math.max(0.25, s ?? o);
}
function Vm(e) {
  const t = Date.parse(e);
  return Number.isNaN(t) ? Date.now() / 1e3 : t / 1e3;
}
function Ws(e) {
  if (!Number.isFinite(e) || e <= 0) return "";
  const t = new Date(e * 1e3), i = t.getFullYear(), n = `${t.getMonth() + 1}`.padStart(2, "0"), o = `${t.getDate()}`.padStart(2, "0"), s = `${t.getHours()}`.padStart(2, "0"), r = `${t.getMinutes()}`.padStart(2, "0");
  return `${i}-${n}-${o}T${s}:${r}`;
}
function Zm(e) {
  const t = Math.min(3, Math.max(-2, e));
  return Number((10 ** t).toPrecision(4));
}
function Xm(e, t, i) {
  if (!e) return;
  if (i.has(t))
    return i.get(t);
  const n = mt(e);
  let o;
  for (const s of n) {
    for (const r of s.items ?? [])
      if (r.entity === t)
        return o = r.activeColor ?? r.rippleColor, i.set(t, o), o;
    for (const r of s.openings ?? [])
      if (r.entity === t)
        return o = r.activeColor, i.set(t, o), o;
    for (const r of s.furniture ?? [])
      if (r.entity === t)
        return o = r.activeColor, i.set(t, o), o;
  }
  i.set(t, void 0);
}
function Ym(e, t, i, n, o) {
  if (!t) return Ut(e);
  const s = j(Xm(t, e.entityId, n)), r = Ie(e.entityId, e.newState);
  if (o && s) return r ? s : "#ffffff";
  const a = Ut(e);
  return r ? a : "#ffffff";
}
function Jm(e, t) {
  if (!Number.isFinite(e)) return "—";
  try {
    return t.format(new Date(e * 1e3));
  } catch {
    return new Date(e * 1e3).toISOString();
  }
}
var Qm = Object.defineProperty, eg = Object.getOwnPropertyDescriptor, Q = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? eg(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Qm(t, i, o), o;
};
function tg(e) {
  const t = e.state.playbackController, i = e.state, o = i.enabled || i.startTime > 0 ? void 0 : e.getDefaultWindow(), s = o ? o.start : i.startTime, r = o ? o.end : i.endTime, a = e.formatReplayTime(
    o ? o.end : t.currentTime
  );
  return {
    events: i.historyEvents,
    startTime: o ? o.start : t.startTime,
    endTime: o ? o.end : t.endTime,
    currentTime: o ? o.end : t.currentTime,
    visible: i.historyVisible,
    enabled: i.enabled,
    ready: i.ready,
    playing: t.playing,
    timelineExpanded: i.timelineExpanded,
    logExpanded: i.logExpanded,
    speedExpanded: i.speedExpanded,
    error: i.error,
    rangeWarning: i.rangeWarning,
    panelId: i.panelId,
    replaySpeed: t.speed,
    currentTimeLabel: a,
    startInputValue: Ws(s),
    endInputValue: Ws(r),
    onToggleVisible: (l) => e.toggleHistoryVisible(l),
    onRangeChange: (l, c) => {
      e.handleRangeChange(l, { target: { value: c } });
    },
    onZoom: (l) => e.zoomWindow(l),
    onJump: (l) => e.jumpReplay(l),
    onStep: (l) => e.stepReplay(l),
    onPlayToggle: () => t.playing ? e.pauseReplay() : e.playReplay(),
    onToggleSpeedPanel: () => e.toggleSpeedPanel(),
    onSpeedSliderInput: (l) => e.setReplaySpeed(Zm(l)),
    onSpeedChange: (l) => e.setReplaySpeed(l),
    onToggleTimeline: () => e.toggleTimeline(),
    onToggleLog: () => e.toggleLog(),
    onSeek: (l) => e.seekReplay(l)
  };
}
function ig(e) {
  return u`
    <easy-floorplan-replay-panel
      .events=${e.events}
      .startTime=${e.startTime}
      .endTime=${e.endTime}
      .currentTime=${e.currentTime}
      .visible=${e.visible}
      .enabled=${e.enabled}
      .ready=${e.ready}
      .playing=${e.playing}
      .timelineExpanded=${e.timelineExpanded}
      .logExpanded=${e.logExpanded}
      .speedExpanded=${e.speedExpanded}
      .error=${e.error}
      .rangeWarning=${e.rangeWarning}
      .panelId=${e.panelId}
      .replaySpeed=${e.replaySpeed}
      .currentTimeLabel=${e.currentTimeLabel}
      .startInputValue=${e.startInputValue}
      .endInputValue=${e.endInputValue}
      @toggle-visible=${(t) => e.onToggleVisible(!!(t.detail?.visible ?? !0))}
      @range-change=${(t) => {
    const i = t.detail?.kind ?? "start";
    t.detail?.value && e.onRangeChange(i, t.detail.value);
  }}
      @zoom=${(t) => e.onZoom(t.detail?.direction ?? 1)}
      @jump=${(t) => e.onJump(t.detail?.delta ?? 0)}
      @step=${(t) => e.onStep(t.detail?.direction ?? 1)}
      @play-toggle=${() => e.onPlayToggle()}
      @toggle-speed-panel=${() => e.onToggleSpeedPanel()}
      @speed-slider-input=${(t) => {
    const i = Number(t.detail?.value ?? 0);
    Number.isFinite(i) && e.onSpeedSliderInput(i);
  }}
      @speed-change=${(t) => {
    const i = Number(t.detail?.value ?? 1);
    Number.isFinite(i) && e.onSpeedChange(i);
  }}
      @toggle-timeline=${() => e.onToggleTimeline()}
      @toggle-log=${() => e.onToggleLog()}
      @seek=${(t) => e.onSeek(t.detail?.timestamp ?? e.currentTime)}
    ></easy-floorplan-replay-panel>
  `;
}
let q = class extends te {
  constructor() {
    super(...arguments), this.events = [], this.startTime = 0, this.endTime = 0, this.currentTime = 0, this.visible = !1, this.enabled = !1, this.ready = !1, this.playing = !1, this.timelineExpanded = !1, this.logExpanded = !1, this.speedExpanded = !1, this.panelId = "replay-panel", this.replaySpeed = 1, this.currentTimeLabel = "—", this.startInputValue = "", this.endInputValue = "";
  }
  updated(e) {
    super.updated(e), (e.has("events") || e.has("currentTime") || e.has("logExpanded")) && this._logRef && this._syncLogToCurrentEvent();
  }
  _dispatch(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  _getCurrentEvent() {
    if (!this.events.length) return;
    const e = this.currentTime;
    let t = 0, i = this.events.length - 1, n = -1;
    for (; t <= i; ) {
      const o = t + i >> 1;
      this.events[o].timestamp <= e ? (n = o, t = o + 1) : i = o - 1;
    }
    return n >= 0 ? this.events[n] : void 0;
  }
  _renderEventItem(e, t) {
    const i = e.timestamp <= this.currentTime, n = (typeof e.color == "string" ? e.color : void 0) ?? (typeof e.attributes?.color == "string" ? e.attributes.color : void 0) ?? Ut(e), o = j(n), s = o ? `background:${o}; box-shadow:0 0 0 2px ${o}22;` : f;
    return u`
      <li class="replay-event-item ${i ? "replay-event-passed" : ""} ${t ? "replay-event-current" : ""}" data-timestamp=${e.timestamp}>
        <span class="replay-event-dot" style=${s}></span>
        <span class="replay-event-time">${new Date(e.timestamp * 1e3).toLocaleTimeString([], { hour: "numeric", minute: "2-digit", second: "2-digit" })}</span>
        <span class="replay-event-icon"><ha-icon icon="mdi:swap-horizontal"></ha-icon></span>
        <span class="replay-event-entity">${e.entityId}</span>
        <span class="replay-event-change">${e.oldState} → ${e.newState}</span>
      </li>
    `;
  }
  _syncLogToCurrentEvent() {
    if (!this._logRef) return;
    const e = this._logRef.querySelector(".replay-event-item.replay-event-current");
    e && e.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
  render() {
    if (!this.visible)
      return u`
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
    const e = this._getCurrentEvent();
    return u`
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
            ${this.error ? u`<span class="replay-error">${this.error}</span>` : f}
            ${this.rangeWarning ? u`<span class="replay-loading">${this.rangeWarning}</span>` : f}
            ${!this.ready && this.enabled && !this.error ? u`<span class="replay-loading">Loading history…</span>` : f}
          </div>
        </div>
        <div class="replay-range">
          <label class="replay-range-field">
            <span>Start</span>
            <input
              type="datetime-local"
              .value=${this.startInputValue}
              @change=${(t) => this._dispatch("range-change", { kind: "start", value: t.target.value })}
            />
          </label>
          <label class="replay-range-field">
            <span>End</span>
            <input
              type="datetime-local"
              .value=${this.endInputValue}
              @change=${(t) => this._dispatch("range-change", { kind: "end", value: t.target.value })}
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
        ${this.speedExpanded ? u`<div class="replay-speed-panel">
              <label class="replay-speed-field replay-speed-group">
                <span>Playback speed</span>
                <input
                  class="replay-speed-slider"
                  type="range"
                  min="-2"
                  max="3"
                  step="0.01"
                  .value=${String(Math.log10(this.replaySpeed || 1))}
                  @input=${(t) => this._dispatch("speed-slider-input", { value: Number(t.target.value) })}
                />
                <input
                  class="replay-speed"
                  type="number"
                  min="0.01"
                  max="1000"
                  step="0.01"
                  .value=${this.replaySpeed.toString()}
                  @change=${(t) => this._dispatch("speed-change", { value: Number(t.target.value || 1) })}
                />
              </label>
            </div>` : f}
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
              @seek=${(t) => this._dispatch("seek", { timestamp: t.detail.timestamp })}
            ></easy-floorplan-history-timeline>
          </div>
        </div>
        <div class=${`replay-event-log ${this.logExpanded ? "expanded" : "collapsed"}`} role="log" aria-label="Replay event log">
          <button class="replay-log-toggle" @click=${() => this._dispatch("toggle-log")}>
            ${this.logExpanded ? "Hide log" : "Show log"}
          </button>
          ${this.logExpanded ? u`<ul
                class="replay-event-list"
                ${(t) => {
      this._logRef = t instanceof HTMLUListElement ? t : void 0, this._logRef && this.events.length && this._syncLogToCurrentEvent();
    }}
              >${$e(this.events, (t, i) => `${t.timestamp}-${t.entityId}-${t.newState}-${i}`, (t) => this._renderEventItem(t, e?.timestamp === t.timestamp))}</ul>` : f}
          ${!this.logExpanded && !this.events.length ? u`<div class="replay-empty">No history events yet.</div>` : f}
        </div>
      </div>
    `;
  }
};
q.styles = oe`
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
Q([
  A({ attribute: !1 })
], q.prototype, "events", 2);
Q([
  A({ type: Number })
], q.prototype, "startTime", 2);
Q([
  A({ type: Number })
], q.prototype, "endTime", 2);
Q([
  A({ type: Number })
], q.prototype, "currentTime", 2);
Q([
  A({ type: Boolean })
], q.prototype, "visible", 2);
Q([
  A({ type: Boolean })
], q.prototype, "enabled", 2);
Q([
  A({ type: Boolean })
], q.prototype, "ready", 2);
Q([
  A({ type: Boolean })
], q.prototype, "playing", 2);
Q([
  A({ type: Boolean })
], q.prototype, "timelineExpanded", 2);
Q([
  A({ type: Boolean })
], q.prototype, "logExpanded", 2);
Q([
  A({ type: Boolean })
], q.prototype, "speedExpanded", 2);
Q([
  A({ type: String })
], q.prototype, "error", 2);
Q([
  A({ type: String })
], q.prototype, "rangeWarning", 2);
Q([
  A({ type: String })
], q.prototype, "panelId", 2);
Q([
  A({ type: Number })
], q.prototype, "replaySpeed", 2);
Q([
  A({ type: String })
], q.prototype, "currentTimeLabel", 2);
Q([
  A({ type: String })
], q.prototype, "startInputValue", 2);
Q([
  A({ type: String })
], q.prototype, "endInputValue", 2);
q = Q([
  Li("easy-floorplan-replay-panel")
], q);
const Fa = "--fp-color-", Da = 24;
function ne(e) {
  return typeof e != "string" ? "" : e.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
}
function Na(e) {
  return Fa + ne(e);
}
function Us(e) {
  return `var(${Na(e)})`;
}
function Kt(e) {
  if (!Array.isArray(e)) return [];
  const t = /* @__PURE__ */ new Set(), i = [];
  for (const n of e) {
    if (!n || typeof n != "object") continue;
    const { name: o, color: s } = n, r = ne(o), a = j(s);
    if (!(!r || !a || t.has(r)) && (t.add(r), i.push({ name: o.trim(), color: a }), i.length >= Da))
      break;
  }
  return i;
}
function Ha(e) {
  return Kt(e).map((t) => `${Na(t.name)}:${t.color};`).join("");
}
function ja(e) {
  return Kt(e).map((t) => `${ne(t.name)}=${t.color}`).join(",");
}
const ng = /^[Vv][Aa][Rr]\(\s*--fp-color-([\p{L}\p{N}-]+)\s*(?:,((?:[^()]|\([^()]*\))*))?\)$/u;
function Wa(e) {
  return Wn(e)?.slug;
}
function Wn(e) {
  if (typeof e != "string") return;
  const t = ng.exec(e.trim());
  if (!t) return;
  const i = t[2]?.trim();
  return { slug: t[1], fallback: i || void 0 };
}
function ci(e, t) {
  const i = Wa(e);
  if (!i) return e;
  const n = Kt(t).find((o) => ne(o.name) === i);
  return n ? n.color : e;
}
function Bs(e, t, i) {
  if (!t) return e;
  const n = (o) => {
    if (typeof o == "string") {
      const s = Wn(o);
      if (s?.slug !== t) return o;
      const r = Wn(i);
      return s.fallback && r && !r.fallback ? `var(${Fa}${r.slug}, ${s.fallback})` : i;
    }
    return Array.isArray(o) ? o.map(n) : o && typeof o == "object" ? Object.fromEntries(Object.entries(o).map(([s, r]) => [s, n(r)])) : o;
  };
  return n(e);
}
const og = 500, sg = 250;
class rg extends HTMLElement {
  constructor() {
    super(...arguments), this.holdTime = og, this.held = !1, this.cancelled = !1;
  }
  connectedCallback() {
    Object.assign(this.style, {
      position: "fixed",
      width: "0",
      height: "0"
    }), ["touchcancel", "mouseout", "mouseup", "touchmove", "mousewheel", "wheel", "scroll"].forEach(
      (t) => {
        document.addEventListener(
          t,
          () => {
            this.cancelled = !0, this.timer && (clearTimeout(this.timer), this.timer = void 0);
          },
          { passive: !0 }
        );
      }
    );
  }
  bind(t, i = {}) {
    t.actionHandler && ag(i, t.actionHandler.options) || (t.actionHandler ? (t.removeEventListener("touchstart", t.actionHandler.start), t.removeEventListener("touchend", t.actionHandler.end), t.removeEventListener("touchcancel", t.actionHandler.end), t.removeEventListener("mousedown", t.actionHandler.start), t.removeEventListener("click", t.actionHandler.end), t.removeEventListener("keydown", t.actionHandler.handleKeyDown)) : t.addEventListener("contextmenu", (n) => {
      n.preventDefault(), n.stopPropagation();
    }), t.actionHandler = { options: i }, !i.disabled && (t.actionHandler.start = () => {
      this.cancelled = !1, this.held = !1, i.hasHold && (this.timer = window.setTimeout(() => {
        this.held = !0;
      }, this.holdTime));
    }, t.actionHandler.end = (n) => {
      if (["touchend", "touchcancel"].includes(n.type) && this.cancelled) {
        this.timer && clearTimeout(this.timer), this.timer = void 0;
        return;
      }
      if ((n.type === "touchend" || n.type === "touchcancel") && (n.cancelable && n.preventDefault(), n.type === "touchcancel")) {
        this.timer && clearTimeout(this.timer), this.timer = void 0;
        return;
      }
      const o = n.target;
      i.hasHold && this.timer && (clearTimeout(this.timer), this.timer = void 0), i.hasHold && this.held ? Qt(o, "hold") : i.hasDoubleClick ? n.type === "click" && n.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, Qt(o, "tap");
      }, sg) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, Qt(o, "double_tap")) : Qt(o, "tap");
    }, t.actionHandler.handleKeyDown = (n) => {
      ["Enter", " "].includes(n.key) && (n.preventDefault(), n.currentTarget.actionHandler.end(n));
    }, t.addEventListener("touchstart", t.actionHandler.start, { passive: !0 }), t.addEventListener("touchend", t.actionHandler.end), t.addEventListener("touchcancel", t.actionHandler.end), t.addEventListener("mousedown", t.actionHandler.start, { passive: !0 }), t.addEventListener("click", t.actionHandler.end), t.addEventListener("keydown", t.actionHandler.handleKeyDown)));
  }
}
function ag(e, t) {
  return e.hasHold === t.hasHold && e.hasDoubleClick === t.hasDoubleClick && e.disabled === t.disabled;
}
function Qt(e, t) {
  e.dispatchEvent(
    new CustomEvent("action", { detail: { action: t }, bubbles: !0, composed: !0 })
  );
}
function lg() {
  const e = document.body, t = e.querySelector("action-handler-fp-ef");
  if (t) return t;
  const i = document.createElement("action-handler-fp-ef");
  return e.appendChild(i), i;
}
customElements.get("action-handler-fp-ef") || customElements.define("action-handler-fp-ef", rg);
const cg = (e, t) => {
  lg().bind(e, t);
}, st = Ri(
  class extends Fi {
    update(e, [t]) {
      return cg(e.element, t), ve;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render(e) {
    }
  }
), we = class we {
  constructor(t = {}) {
    this.playing = !1, this._startTime = t.startTime ?? 0, this._endTime = t.endTime ?? Number.MAX_SAFE_INTEGER, this.currentTime = this._startTime, this.speed = this._normalizeSpeed(t.initialSpeed ?? 1);
  }
  get startTime() {
    return this._startTime;
  }
  get endTime() {
    return this._endTime;
  }
  _normalizeSpeed(t) {
    return Number.isFinite(t) ? Math.min(we._MAX_SPEED, Math.max(we._MIN_SPEED, t)) : Number.isNaN(t) ? 1 : we._MAX_SPEED;
  }
  play() {
    this.playing = !0;
  }
  pause() {
    this.playing = !1;
  }
  seek(t) {
    this.currentTime = this._clamp(t);
  }
  rewind(t) {
    this.seek(this.currentTime - t);
  }
  fastForward(t) {
    this.seek(this.currentTime + t);
  }
  setPlaybackSpeed(t) {
    Number.isFinite(t) && (this.speed = Math.min(we._MAX_SPEED, Math.max(we._MIN_SPEED, t)));
  }
  tick(t) {
    if (!this.playing) return;
    const i = t / 1e3;
    this.currentTime = this._clamp(this.currentTime + i * this.speed);
  }
  _clamp(t) {
    return Math.min(this._endTime, Math.max(this._startTime, t));
  }
};
we._MIN_SPEED = 0.01, we._MAX_SPEED = 1e3;
let Pi = we, dg = 0;
class hg {
  constructor(t) {
    this._card = t, this._historyService = new qc(), this.state = {
      playbackController: new Pi(),
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
      panelId: `fp-replay-panel-${dg++}`
    };
  }
  logReplay(t, i) {
    this._card.getConfig()?.historyReplay?.debug && console.log(t, i ?? {});
  }
  getDefaultWindow() {
    return Bm(this._card.getConfig());
  }
  normalizeWindow(t, i) {
    return js(t, i);
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
    return Gm(this._card.getConfig(), this._card.getActiveFloorId());
  }
  scopeKey() {
    return qm(this._card.getConfig(), this._card.getActiveFloorId());
  }
  speedForRange(t, i) {
    return Km(this._card.getConfig(), t, i);
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
  formatReplayTime(t) {
    return Jm(t, new Intl.DateTimeFormat(void 0, {
      dateStyle: "short",
      timeStyle: "medium"
    }));
  }
  handleRangeChange(t, i) {
    const n = i.target, o = Vm(n.value);
    t === "start" ? this.state.startTime = o : this.state.endTime = o, this.updateWindow(this.state.startTime, this.state.endTime);
  }
  updateWindow(t, i) {
    const { start: n, end: o } = js(t, i), s = o - n;
    this.state.rangeWarning = s < 60 ? "Very small replay window may hide expected transitions." : void 0;
    const r = this.state.playbackController.playing;
    this.state.startTime = n, this.state.endTime = o, this.clearHistoryCache(), this.state.playbackController.pause(), this.stopReplayLoop(), this._card.requestUpdate(), !(!this._card.getHass() || !this.state.historyVisible) && this.startReplay({ preserveCurrentTime: !0, keepPlaying: r });
  }
  resetForFloorChange() {
    this.state.historyEvents = [], this.state.enabled = !1, this.state.ready = !1, this.state.error = void 0, this.state.loadRequested = !1, this.state.loadToken += 1, this.clearHistoryCache(), this.stopReplayLoop(), this._card.requestUpdate(), this._card.getHass() && this.state.historyVisible && this.startReplay({ preserveCurrentTime: !0, keepPlaying: this.state.playbackController.playing });
  }
  zoomWindow(t) {
    const i = Math.max(60, this.state.endTime - this.state.startTime), n = this.state.playbackController.currentTime, o = t > 0 ? Math.max(60, i * 0.8) : i * 1.25, s = o / 2, r = Math.max(0, n - s), a = r + o;
    this.updateWindow(r, a);
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
  toggleHistoryVisible(t) {
    const i = t && this._replayOffered();
    if (this.state.historyVisible = i, !i) {
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
  async startReplay(t = {}) {
    if (!this._card.getHass() || !this._card.getConfig()?.historyReplay) return;
    const i = this.state.startTime || this.getDefaultWindow().start, n = this.state.endTime || this.getDefaultWindow().end, { start: o, end: s } = this.normalizeWindow(i, n);
    this.state.startTime = o, this.state.endTime = s, this.state.enabled = !0, this.state.loadRequested = !0, this.state.error = void 0, this.state.ready = !1;
    const r = t.preserveCurrentTime ? Math.min(s, Math.max(o, this.state.playbackController.currentTime)) : o;
    this.state.playbackController = new Pi({
      startTime: o,
      endTime: s,
      initialSpeed: this.speedForRange(o, s)
    }), this.state.playbackController.seek(r), t.keepPlaying && this.state.playbackController.play();
    const a = ++this.state.loadToken;
    this.logReplay("[easy-floorplan] Starting replay", { start: o, end: s, lookback: s - o }), await this.loadReplayRange(o, s, a), t.keepPlaying && this.state.enabled && this.state.playbackController.playing && this.startReplayLoop(), this._card.requestUpdate();
  }
  async loadReplayRange(t, i, n) {
    try {
      const o = this.scopeKey();
      if (await this._historyService.loadHistory(t, i, { scopeKey: o, hass: this._card.getHass(), watched: this.watchedEntities(), numericSteps: this._card.getConfig()?.historyReplay?.numericSteps }), n !== this.state.loadToken) return;
      const s = new Set(this.watchedEntities()), r = this._historyService.getEvents();
      this.state.historyEvents = r.filter((a) => s.has(a.entityId)).map((a) => ({
        ...a,
        color: Ym(a, this._card.getConfig(), this._card.getHass(), this.state.configuredColorCache, this.state.configured)
      })), this.state.ready = !0, this.state.loadRequested = !1, this.state.error = void 0, this.logReplay("[easy-floorplan] Replay history loaded", { eventCount: this.state.historyEvents.length }), this._card.requestUpdate();
    } catch (o) {
      if (n !== this.state.loadToken) return;
      this.state.ready = !1, this.state.loadRequested = !1, this.state.error = o instanceof Error ? o.message : "Unable to load history.", console.error("[easy-floorplan] Replay history loading failed", o);
    }
  }
  seekReplay(t) {
    this.state.playbackController.seek(t), this.logReplay("[easy-floorplan] Replay seek", { timestamp: t }), this._card.requestUpdate();
  }
  jumpReplay(t) {
    this.state.playbackController.seek(this.state.playbackController.currentTime + t), this.logReplay("[easy-floorplan] Replay jump", { seconds: t }), this._card.requestUpdate();
  }
  stepReplay(t) {
    if (!this.state.historyEvents.length) return;
    const i = this.state.playbackController.currentTime, n = 1e-4, o = t > 0 ? this._historyService.getEventAfter(i + n) : this._historyService.getEventBefore(i - n);
    o ? this.state.playbackController.seek(o.timestamp) : this.state.playbackController.seek(t > 0 ? this.state.playbackController.endTime : this.state.playbackController.startTime), this._card.requestUpdate();
  }
  setReplaySpeed(t) {
    this.state.playbackController.setPlaybackSpeed(t), this.logReplay("[easy-floorplan] Replay speed", { speed: t }), this._card.requestUpdate();
  }
  playReplay() {
    if (!this.state.enabled) {
      this.startReplay({ preserveCurrentTime: !0, keepPlaying: !0 });
      return;
    }
    if (!this.state.ready) {
      const t = this.state.startTime || this.state.playbackController.startTime, i = this.state.endTime || this.state.playbackController.endTime;
      this.loadReplayRange(t, i, ++this.state.loadToken);
    }
    this.state.playbackController.currentTime >= this.state.playbackController.endTime && this.state.playbackController.seek(this.state.playbackController.startTime), this.state.playbackController.play(), this.startReplayLoop(), this.logReplay("[easy-floorplan] Replay play", { currentTime: this.state.playbackController.currentTime }), this._card.requestUpdate();
  }
  pauseReplay() {
    this.state.playbackController.pause(), this.stopReplayLoop(), this.logReplay("[easy-floorplan] Replay pause", { currentTime: this.state.playbackController.currentTime }), this._card.requestUpdate();
  }
  startReplayLoop() {
    if (this.state.loopId) return;
    this.state.lastReplayFrame = void 0, this.state.uiLastUpdateFrameMs = 0;
    const t = (i) => {
      if (this.state.playbackController.playing && (this.state.lastReplayFrame === void 0 ? this.state.lastReplayFrame = i : (this.state.playbackController.tick(i - this.state.lastReplayFrame), this.state.lastReplayFrame = i, (this.state.uiLastUpdateFrameMs === 0 || i - this.state.uiLastUpdateFrameMs >= 50) && (this.state.uiLastUpdateFrameMs = i, this._card.requestUpdate())), this.state.playbackController.currentTime >= this.state.playbackController.endTime)) {
        this.pauseReplay();
        return;
      }
      this.state.loopId = window.requestAnimationFrame(t);
    };
    this.state.loopId = window.requestAnimationFrame(t);
  }
  stopReplayLoop() {
    this.state.loopId && (window.cancelAnimationFrame(this.state.loopId), this.state.loopId = void 0), this.state.lastReplayFrame = void 0;
  }
  requestUpdate() {
    this._card.requestUpdate();
  }
}
var pg = Object.defineProperty, ug = Object.getOwnPropertyDescriptor, vt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? ug(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && pg(t, i, o), o;
};
const Gs = /* @__PURE__ */ new Map();
function qs(e) {
  return e.map((t) => t.id).join("|");
}
let ue = class extends te {
  constructor() {
    super(...arguments), this._wallMaskId = `fp-wall-mask-${ue._nextWallMaskId++}`, this._glowIdBase = `fp-glow-${ue._nextGlowId++}`, this._watchedEntities = /* @__PURE__ */ new Set(), this._replayController = new hg({
      getConfig: () => this._config,
      getHass: () => this.hass,
      getActiveFloorId: () => this._activeFloorId,
      requestUpdate: () => this.requestUpdate()
    }), this._onOrientation = (e) => {
      this._portrait = e.matches;
    }, this._featuresOf = (e) => this.hass?.states[e]?.attributes?.supported_features ?? 0;
  }
  _syncHistoryServiceContext() {
    this._replayController.syncHistoryServiceContext();
  }
  _replayCacheKey() {
    const e = this._config?.historyReplay;
    return JSON.stringify([
      e?.enabled ?? !1,
      e?.lookbackSeconds ?? null,
      e?.defaultSpeed ?? null,
      [...this._watchedEntities].sort()
    ]);
  }
  connectedCallback() {
    if (super.connectedCallback(), typeof window > "u" || !window.matchMedia) return;
    const e = window.matchMedia("(orientation: portrait)");
    this._onOrientation(e), this._unsubscribeOrientation = _m(e, this._onOrientation);
  }
  setConfig(e) {
    if (!e || typeof e != "object") throw new Error("Invalid configuration");
    const t = e;
    for (const n of ["walls", "openings", "items", "texts", "furniture", "trackers", "areas", "floors"])
      if (t[n] != null && !Array.isArray(t[n]))
        throw new Error(`Invalid configuration: "${n}" must be a list`);
    for (const n of ["width", "height", "grid", "rotation", "rotationPortrait", "rotationLandscape"])
      if (t[n] != null && typeof t[n] != "number")
        throw new Error(`Invalid configuration: "${n}" must be a number`);
    this._config = {
      ...e,
      width: e.width ?? pt,
      height: e.height ?? Bt,
      walls: e.walls ?? [],
      openings: e.openings ?? [],
      items: e.items ?? [],
      texts: e.texts ?? [],
      furniture: e.furniture ?? []
    }, this._watchedEntities = Ct(this._config), this._syncHistoryServiceContext(), this._replayController.clearConfigColorCache();
    const i = this._replayCacheKey();
    if (i !== this._lastReplayCacheKey && (this._lastReplayCacheKey = i, this._replayController.historyService().clearCache()), this._replayController.syncToConfig(), !this._activeFloorId) {
      const n = mt(this._config), o = Gs.get(qs(n));
      o && n.some((s) => s.id === o) && (this._activeFloorId = o);
    }
  }
  /**
   * HA pushes a fresh `hass` on every state change anywhere in the instance —
   * for most updates nothing on this plan moved. Skip those renders entirely.
   */
  shouldUpdate(e) {
    if (!(e.size === 1 && e.has("hass"))) return !0;
    const t = e.get("hass");
    return !t || !this.hass ? !0 : Vr(t, this.hass, this._watchedEntities);
  }
  /**
   * Carry the skin as an attribute on the host, where `skinPalettes` picks it
   * up (issue #155). It has to be the host and not the template, because the
   * point is to sit *above* the `<ha-card>` a card-mod rule targets — see
   * skins.ts. Only ever a `findSkin` match, so an unrecognised `skin:` puts no
   * attribute on the element at all.
   */
  willUpdate(e) {
    if (!e.has("_config")) return;
    const t = Dc(this._config?.skin);
    t ? this.setAttribute("data-skin", t) : this.removeAttribute("data-skin");
  }
  updated(e) {
    super.updated(e), (e.has("hass") || e.has("_activeFloorId")) && this._syncHistoryServiceContext();
  }
  getCardSize() {
    return 6;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => fy), document.createElement("fp-ef-editor");
  }
  static getStubConfig() {
    return sd();
  }
  /**
   * Sections-view sizing (grid rows ≈ 56px): room for the 5:3 default canvas.
   * An instance method — HA calls it on the card element (getConfigElement /
   * getStubConfig are the static ones, called before any instance exists).
   */
  getGridOptions() {
    return { columns: 12, rows: 8, min_columns: 6, min_rows: 4 };
  }
  _isOn(e, t) {
    return Ie(e.entity, t?.states[e.entity]?.state);
  }
  /** How far open an opening should be drawn (0..1), from its entity (or default). */
  _openingAmount(e, t) {
    const i = e.entity ? t?.states[e.entity] : void 0;
    return Ve(e, i);
  }
  /** Whether an opening wears its accent: drawn open, or a cover still in transit. */
  _openingActive(e, t) {
    const i = e.entity ? t?.states[e.entity] : void 0;
    return li(e, i);
  }
  /**
   * The second leaf's own state for an opening with a sensor on each — a
   * two-panel slider (issue #145) or a hinged double (issue #159).
   * `undefined` — no second sensor, or a shape with only one leaf — leaves both
   * on the first entity, so nothing about a single-sensor opening changes.
   */
  _openingSecond(e, t) {
    if (!e.secondaryEntity || !Si(e)) return;
    const i = _o(e), n = t?.states[e.secondaryEntity];
    return { amount: Ve(i, n), active: li(i, n) };
  }
  /** floorplan-panel: states of leaves 3 and 4; a leaf without a sensor follows the first. */
  _openingMore(e, t) {
    const i = Ee(e);
    if (i < 3 || !e.extraEntities?.some(Boolean)) return;
    const n = [];
    for (let o = 2; o < i; o++) {
      const s = e.extraEntities[o - 2];
      if (!s) {
        n.push({ amount: this._openingAmount(e, t), active: this._openingActive(e, t) });
        continue;
      }
      const r = nm(e, o), a = t?.states[s];
      n.push({ amount: Ve(r, a), active: li(r, a) });
    }
    return n;
  }
  /**
   * The same for a hinged shutter's other panel (issue #159). Read from its
   * own key and its own resolvers — the shutter answers to `shutterInvert` and
   * is drawn from `shutterAmount` / `shutterActive`, not the sash's — and only
   * for a `swing` shutter, since a roll curtain has no second panel to drive.
   */
  _shutterSecond(e, t) {
    if (!e.shutterSecondaryEntity || ut(e) !== "swing") return;
    const i = t?.states[e.shutterSecondaryEntity];
    return {
      amount: Re(i, e.shutterInvert),
      active: ri(i, e.shutterInvert)
    };
  }
  _itemIcon(e, t) {
    return zn(
      e,
      t?.states[e.entity],
      this.hass?.entities?.[e.entity]?.icon
    );
  }
  _label(e, t) {
    return e.name ?? t?.states[e.entity]?.attributes?.friendly_name ?? e.entity ?? "";
  }
  disconnectedCallback() {
    this._replayController.stopReplayLoop(), this._unsubscribeOrientation?.(), this._unsubscribeOrientation = void 0, super.disconnectedCallback();
  }
  _handleItemAction(e, t) {
    this.hass && St(this, this.hass, t, Br(t, e.detail.action));
  }
  /** What a gesture on this opening would do, if anything. */
  _openingPress(e, t) {
    return vo(e, t, this._featuresOf);
  }
  /**
   * Pressing an opening (issue #74 follow-up). Which entity answers — the
   * window/door or its shutter — is {@link openingActionForGesture}'s call;
   * from here it is the same Lovelace dispatch every device uses.
   */
  _onOpeningAction(e, t) {
    if (!this.hass) return;
    const i = this._openingPress(t, e.detail.action);
    i && St(this, this.hass, { entity: i.entity }, i.config);
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
  _renderShutterMark(e, t, i, n, o) {
    const s = e.shutterEntity, r = o?.states[s], a = Re(r, e.shutterInvert) > 0, l = ri(r, e.shutterInvert), c = wa(e, r, a, this.hass?.entities?.[s]?.icon), h = j(e.shutterActiveColor ?? e.activeColor) ?? G, d = wo(e), p = ct(d.x, d.y, t.width, t.height, i), m = Ge(t.width, t.height, i), g = xo(e, i), b = W(Ei, n), v = `translate(calc(${g.x} * ${b}), calc(${g.y} * ${b}))`, x = W(Ai, n), $ = o?.states[s]?.attributes?.friendly_name ?? s;
    return u`
      <div
        class="shutter-mark ${l ? "on" : "off"}"
        data-entity=${Ne(s) ?? f}
        style="left:${p.x / m.w * 100}%; top:${p.y / m.h * 100}%;
               width:${x};height:${x};
               transform:translate(-50%,-50%) ${v};--fp-active:${h};"
        title="${$} · ${Gt(o, s)}"
        role="button"
        tabindex="0"
        @action=${() => {
      this.hass && St(this, this.hass, { entity: s }, { action: "more-info" });
    }}
        .actionHandler=${st({})}
      >
        <ha-icon
          icon=${c}
          style="--mdc-icon-size:${W(Mi, n)};"
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
  _renderOpeningMark(e, t, i, n, o) {
    const s = e.entity, r = o?.states[s], a = this._openingAmount(e, o) > 0, l = this._openingActive(e, o), c = ka(e, r, a, this.hass?.entities?.[s]?.icon), h = j(e.activeColor) ?? G, d = Sa(e), p = ct(d.x, d.y, t.width, t.height, i), m = Ge(t.width, t.height, i), g = Ea(e, i), b = W(Ei, n), v = `translate(calc(${g.x} * ${b}), calc(${g.y} * ${b}))`, x = W(Ai, n), $ = o?.states[s]?.attributes?.friendly_name ?? s;
    return u`
      <div
        class="shutter-mark ${l ? "on" : "off"}"
        data-entity=${Ne(s) ?? f}
        style="left:${p.x / m.w * 100}%; top:${p.y / m.h * 100}%;
               width:${x};height:${x};
               transform:translate(-50%,-50%) ${v};--fp-active:${h};"
        title="${$} · ${Gt(o, s)}"
        role="button"
        tabindex="0"
        @action=${() => {
      this.hass && St(this, this.hass, { entity: s }, { action: "more-info" });
    }}
        .actionHandler=${st({})}
      >
        <ha-icon
          icon=${c}
          style="--mdc-icon-size:${W(Mi, n)};"
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
  _goToFloor(e, t) {
    const i = this._activeFloorId === t;
    this._activeFloorId = t, Gs.set(qs(e), t), this._zoomedAreaId = void 0, !(i || !this.hass || !this._config?.historyReplay?.enabled) && this._replayController.resetForFloorChange();
  }
  /** Tapping a room zooms the plan in to it; tapping the same room again zooms back out. */
  _onAreaClick(e) {
    this._zoomedAreaId = this._zoomedAreaId === e.id ? void 0 : e.id, this.dispatchEvent(
      new CustomEvent("fp-area-tap", {
        detail: { areaId: e.id, floorId: this._activeFloorId, zoomed: this._zoomedAreaId === e.id },
        bubbles: !0,
        composed: !0
      })
    );
  }
  /**
   * A gesture on a room (issue #181): its configured action, or — for a tap
   * with nothing configured — the zoom the room has always done.
   *
   * The fallback is what keeps this backwards compatible. Every plan drawn
   * before areas had actions has three unset gestures, so every tap still
   * zooms and hold and double-tap still do nothing.
   */
  _onAreaAction(e, t) {
    const i = ai(t, e.detail.action);
    if (!i) {
      e.detail.action === "tap" && this._onAreaClick(t);
      return;
    }
    this.hass && St(this, this.hass, { entity: i.entity }, i.config);
  }
  _renderBadge(e, t, i) {
    const n = R(e.size, Ke), o = W(n, t), s = e.entity ? i?.states[e.entity] : void 0, r = ca(e, s?.state, s?.attributes), a = qt(e) === "value" ? fa(i, e) : void 0;
    return u`
      <div
        class="badge"
        style="width:${o};height:${o};transform:rotate(${R(e.angle, 0)}deg);"
      >
        ${a ? u`<span
              class="badge-value"
              style="font-size:${W(ya(n, a), t)};"
              >${a}</span
            >` : u`<ha-icon
              class=${r ? `anim-${r}` : ""}
              icon=${this._itemIcon(e, i)}
              style="--mdc-icon-size:${W(pa(n), t)};"
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
  _startInk(e) {
    const t = e.currentTarget, i = t?.querySelector(".press-ink");
    if (!i) return;
    const n = t.getBoundingClientRect();
    i.style.setProperty("--fp-ink-x", `${e.clientX - n.left}px`), i.style.setProperty("--fp-ink-y", `${e.clientY - n.top}px`), i.classList.remove("inking"), i.offsetWidth, i.classList.add("inking");
  }
  _renderItem(e, t, i, n, o) {
    const s = this._isOn(e, o), r = oa(o, e), a = e.entity ? o?.states[e.entity] : void 0, l = go(e, a), c = j(Ki(e.stateColor, l)), h = ra(e, c), d = !!this.hass && Ln(e, a?.state), p = Tf(e, a?.state, o), m = qt(e) !== "none", g = e.display ?? "badge", b = Xr(a), v = j(e.activeColor) ?? b, x = s || d ? void 0 : j(e.inactiveColor), $ = e.rippleColor ?? c ?? e.activeColor ?? b ?? G, y = Pr(
      ci(
        c ?? (s ? v : x),
        this._config?.palette
      )
    ), w = e.rippleSize ?? ji, E = e.rippleDirection ?? Wi, T = e.rippleWidth ?? Ui, C = p ? "visibility: hidden; pointer-events: none;" : "";
    let D = f;
    g === "ripple" ? D = u`<span style="${C}">
        ${Ti(s, $, w, E, T, 3, n)}
      </span>` : g === "iconRipple" ? D = u`<div class="stack" style="${C}">
        ${Ti(s, $, w, E, T, 3, n)}
        ${m ? u`<div class="stack-icon">${this._renderBadge(e, n, o)}</div>` : f}
      </div>` : m && (D = u`<span style="${C}">
        ${this._renderBadge(e, n, o)}
      </span>`);
    const B = ct(e.x, e.y, t.width, t.height, i), L = Ge(t.width, t.height, i), O = pf(e);
    return u`
      <div
        class="item fp-item ${s ? "on" : "off"} ${d ? "offline" : ""} ${c ? "state-colored" : ""} ${x ? "inactive-colored" : ""} ${O ? "interactive" : ""}"
        data-id=${le(e.id) ?? f}
        data-entity=${Ne(e.entity) ?? f}
        data-kind=${le(e.kind) ?? f}
        style="left:${B.x / L.w * 100}%; top:${B.y / L.h * 100}%;${c ? `--fp-state:${c};` : ""}${v ? `--fp-active:${v};` : ""}${x ? `--fp-inactive:${x};` : ""}${y ? `--fp-ink:${y};` : ""}"
        title=${this._label(e, o)}
        role=${O ? "button" : f}
        tabindex=${O ? "0" : f}
        @action=${(M) => this._handleItemAction(M, e)}
        .actionHandler=${st({
      hasHold: ze(e.hold_action),
      hasDoubleClick: ze(e.double_tap_action),
      // Unbinds the gesture listeners outright, so keyboard activation
      // cannot reach an action that would do nothing.
      disabled: !O
    })}
        @pointerdown=${O && oi(t) === "ripple" ? (M) => this._startInk(M) : f}
      >
        ${D}
        ${O && oi(t) === "ripple" ? u`<span class="press-ink" aria-hidden="true"></span>` : f}
        ${r ? u`<span
              class="label ${D === f ? "inflow" : ""} label-${fo(e)}"
              style="font-size:${W(sa(e.labelSize), n)};${h ? `color:${h};` : ""}"
              >${r}</span
            >` : f}
      </div>
    `;
  }
  _renderAreaLabel(e, t, i, n) {
    if (!e.name || (e.showName ?? !0) === !1) return f;
    const o = So(e.points), s = ct(o.x, o.y, t.width, t.height, i), r = Ge(t.width, t.height, i), a = Lf(e.labelSize, n);
    return u`
      <div
        class="area-label"
        style="left:${s.x / r.w * 100}%; top:${s.y / r.h * 100}%;${a}"
      >
        ${e.name}
      </div>
    `;
  }
  _renderText(e, t, i, n) {
    const o = ct(e.x, e.y, t.width, t.height, i), s = Ge(t.width, t.height, i);
    return u`
      <div
        class="text fp-text"
        data-id=${le(e.id) ?? f}
        style="left:${o.x / s.w * 100}%; top:${o.y / s.h * 100}%;
               font-size:${W(R(e.size, zt), n)};
               color:${de(e.color, zr)};
               transform:translate(-50%,-50%) scale(var(--fp-inv-zoom,1)) rotate(${R(e.angle, 0)}deg);"
      >
        ${ao(this.hass, e)}
      </div>
    `;
  }
  render() {
    if (!this._config) return u`${f}`;
    const e = this._config, t = this._replayController.getRenderState(), i = Sc(this.hass, this._watchedEntities, this._replayController.historyService(), t.enabled, t.currentTime), n = mt(e), o = n.find((y) => y.id === this._activeFloorId) ?? n.find((y) => y.id === e.defaultFloor) ?? n[0], s = bm(e, this._portrait), r = Ge(R(e.width, pt), R(e.height, Bt), s), a = vm(e.width, e.height, s), l = mo(e.overlayScale), c = e.sunDimming ? xm(
      i?.states["sun.sun"]?.attributes?.elevation,
      R(e.sunBrightnessMin, to),
      R(e.sunBrightnessMax, vi)
    ) : vi, h = e.showDeadSpaces ? qr(o.walls, o.openings) : [], p = e.sunDimming || o.items.some((y) => y.glow) ? po(
      o.walls,
      o.openings,
      (y) => (
        // Both leaves, and the travel each style actually has (issue #145):
        // asking `entity` alone left a door whose *second* panel was open
        // still blocking light outright. Glass admits it whole regardless
        // of sash — a closed window is not a hole, but light still gets
        // through it. A shutter rolled down overrides that, same as it
        // does for sunlight.
        Jr(
          y,
          this._openingAmount(y, i),
          this._openingSecond(y, i)?.amount,
          y.shutterEntity ? Re(i?.states[y.shutterEntity], y.shutterInvert) : void 0,
          this._openingMore(y, i)?.map((w) => w.amount)
        )
      )
    ) : o.walls, m = `${this._glowIdBase}-sundim`, g = e.sunDimming ? Mf(
      o.items,
      i?.states,
      e.width,
      e.height,
      m,
      p
    ) : f, b = o.areas?.find((y) => y.id === this._zoomedAreaId), v = b ? Nm(
      b.points,
      e.width,
      e.height,
      s,
      void 0,
      void 0,
      // A room may say how close to go; without one the fit decides,
      // exactly as it always has (issue #222).
      Hm(b)
    ) : Hn, x = e.compactHeader === !0, $ = x && !!e.title;
    return u`
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
        .header=${x ? f : e.title ?? f}
        style=${Ha(e.palette) || f}
      >
        <div class="card-shell ${this._replayController.isHistoryVisible() ? "replay-visible" : ""}">
          ${this._config.historyReplay?.enabled ? this._renderReplayPanel() : f}
          <div
            class="stage press-${oi(e)} offline-${ua(e)} ${$ ? "compact-title" : ""}"
            style="aspect-ratio: ${r.w} / ${r.h};"
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
            style="aspect-ratio: ${r.w} / ${r.h};
                   width: min(100%, calc(100cqh * ${r.w} / ${r.h}));
                   --fp-plan-w: ${r.w};
                   background:${de(e.background, Ni)};"
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
            style="transform: translate(${v.txPercent}%, ${v.tyPercent}%) scale(${v.scale});"
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
          ${Ir(
      `${e.skin ?? ""}|${ja(e.palette)}`,
      _`<svg viewBox="0 0 ${r.w} ${r.h}" preserveAspectRatio="none">
            <g transform=${a || f}>
            ${o.image ? _`<image href=${o.image} x="0" y="0" width=${e.width} height=${e.height}
                          preserveAspectRatio=${Ta(o.imageFit)}
                          opacity=${o.imageOpacity ?? 1} />` : f}
            ${o.areas?.map((y) => {
        const w = dm(y);
        return _`<g class="area-tap-target"
                    role=${w ? "button" : f}
                    tabindex=${w ? "0" : f}
                    @action=${(E) => this._onAreaAction(E, y)}
                    .actionHandler=${st({
          // Only wait out the timers when a gesture can resolve:
          // otherwise every tap on an ordinary room would sit for
          // 500ms before zooming.
          hasHold: ze(ai(y, "hold")?.config),
          hasDoubleClick: ze(ai(y, "double_tap")?.config)
        })}>
                  ${za(y, Ts(y, y.entity ? i?.states[y.entity]?.state : void 0))}
                </g>`;
      })}
            <!-- Dead spaces (issue #88): the regions the walls seal off that no
                 door or window reaches, hatched. Above the room fills, so a
                 region someone has also drawn an area over still reads as
                 unreachable; below everything else, because it describes the
                 floor rather than anything standing on it. -->
            ${h.length ? _`${Pa(`${this._wallMaskId}-dead`)}
                    ${h.map(
        (y) => Oa(y, `${this._wallMaskId}-dead`)
      )}` : f}
            <!-- Light pools (issue #6). Above the room fills but below the
                 furniture and walls, so light reads as cast onto the floor
                 rather than painted over the plan. Isolated as one layer: the
                 pools screen-blend with each other (two lamps brighten where
                 they meet) without screening against the plan beneath, which
                 would wash out on a light theme. -->
            ${ta(
        o.furniture,
        e.width,
        e.height,
        `${this._glowIdBase}-mask`,
        On(e.symbols)
      )}
            <g class="fp-glows"
               mask=${o.furniture.length ? `url(#${this._glowIdBase}-mask)` : f}>
              ${o.items.map((y, w) => {
        if (!y.glow) return f;
        const E = lo(y, i?.states[y.entity]);
        return E ? ea(y, E, `${this._glowIdBase}-${w}`, p) : f;
      })}
            </g>
            ${o.furniture.map((y) => {
        const w = jn(
          y,
          kf(y, y.entity ? i?.states[y.entity]?.state : void 0),
          On(e.symbols)
        ), E = Zf(y, n, o.id);
        if (!E) return w;
        const T = n.find((C) => C.id === E)?.name;
        return _`<g class="fp-furniture-link" role="button" tabindex="0"
                    @action=${() => this._goToFloor(n, E)}
                    .actionHandler=${st({
          // A staircase has one gesture. Saying so keeps a tap from
          // sitting out the hold and double-tap timers before it
          // does anything.
          hasHold: !1,
          hasDoubleClick: !1
        })}>
                  <!-- An SVG tooltip is a <title> child, not a title=
                       attribute: the attribute does nothing here. -->
                  <title>${T ? `Go to ${T}` : "Go to the next floor"}</title>
                  ${w}
                </g>`;
      })}
            <!-- Sunlight through the openings. Under the walls on purpose:
                 light lands on the floor, and the walls stay crisp lines over
                 it rather than being tinted by the patches they let in. The
                 sun dimming further down is the whole-sky reading and still
                 has the last word — at night there is nothing to let in. -->
            ${e.sunlight ? Dm(
        o.walls,
        o.openings,
        e.width,
        e.height,
        `${this._wallMaskId}-sun`,
        {
          // Both halves of the sun come from the same entity while
          // the plan follows it: the azimuth says where the light
          // comes from, the elevation whether there is any at all.
          // A plan that pins its own angle keeps its light on —
          // see sunlightStrengthOf.
          dir: Lm(
            e,
            i?.states["sun.sun"]?.attributes?.azimuth
          ),
          strength: Sm(
            e,
            i?.states["sun.sun"]?.attributes?.elevation
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
          reach: R(e.sunReach, Ci) * (Zi(e) ? 1 : Pm(i?.states["sun.sun"]?.attributes?.elevation)),
          // The gap each style actually clears, both leaves
          // included — the same reading the lamps get above, and
          // for the same reason (#145): `entity` alone leaves a
          // door whose *second* panel is open reading as shut,
          // and a converging pair reading as twice as clear as it
          // draws. Glazing and shutters are applied on top of
          // this, inside openingSunFraction.
          openAmount: (y) => Yr(
            y,
            this._openingAmount(y, i),
            this._openingSecond(y, i)?.amount,
            this._openingMore(y, i)?.map((w) => w.amount)
          ),
          // A shutter that is all the way down stops the light, as
          // one does. Undefined where none is bound, so an opening
          // without a shutter is judged on itself alone.
          shutterOpen: (y) => y.shutterEntity ? Re(i?.states[y.shutterEntity], y.shutterInvert) : void 0,
          light: e.sunlightColor ?? Dn,
          shade: e.sunShade === !1 ? null : e.sunShadeColor ?? Nn
        }
      ) : f}
            ${Ia(o.openings, e.width, e.height, this._wallMaskId)}
            ${o.walls.map(
        (y) => _`
                <g class="fp-wall-neon"><line x1=${y.x1} y1=${y.y1} x2=${y.x2} y2=${y.y2}
                      class="wall fp-wall" data-id=${le(y.id) ?? f}
                      mask=${`url(#${this._wallMaskId})`}
                      style=${aa(y.thickness)} stroke-linecap="round" /></g>`
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
              ${o.areas?.map(
        (y, w) => La(
          y,
          Ts(y, y.entity ? i?.states[y.entity]?.state : void 0),
          `${this._wallMaskId}-area-${w}`
        )
      )}
            </g>
            ${$e(
        // Keyed by id: switching floors must create fresh DOM nodes.
        // Unkeyed, Lit morphs floor A's openings into floor B's, and the
        // 0.5s leaf/panel transitions animate the leftover state — a
        // window briefly plays a door swing (issue #50).
        o.openings,
        (y, w) => y.id || w,
        (y) => {
          const w = this._openingAmount(y, i), E = y.shutterEntity ? i?.states[y.shutterEntity] : void 0, T = Aa(y, {
            color: Jn,
            // The closed tone (issue #228). Absent, the moving parts stay
            // the wall colour, which is what a closed opening always was —
            // and that is also what an opening whose contact has dropped
            // out falls back to, so a dead sensor does not draw the same
            // emphatic "shut" as a door that really is (issue #162).
            // Guarded on `hass` for the same reason the device path is:
            // before the first states arrive every opening would read as
            // offline and the closed colour would flash off on load.
            inactive: this.hass && Ln(y, y.entity ? i?.states[y.entity]?.state : void 0) ? void 0 : y.inactiveColor,
            open: w > 0,
            amount: w,
            active: this._openingActive(y, i),
            accent: y.activeColor ?? G,
            // Per-leaf state for a two-sensor biparting slider (issue #145).
            second: this._openingSecond(y, i),
            more: this._openingMore(y, i),
            // External roller shutter layer (issue #74). No entity bound
            // yet → previewed shut, like a static plan.
            shutter: y.shutterEntity ? {
              amount: Re(E, y.shutterInvert),
              active: ri(E, y.shutterInvert),
              style: ut(y),
              // The shutter's own accent, falling back to the
              // opening's and then to the skin's.
              accent: y.shutterActiveColor ?? y.activeColor ?? G,
              flip: y.shutterFlipV,
              // Per-panel state for a two-contact hinged shutter
              // (issue #159).
              second: this._shutterSecond(y, i)
            } : void 0
          });
          if (!hm(y, this._featuresOf)) return T;
          const C = y.length / 2, D = V + 4;
          return _`<g class="fp-opening" role="button" tabindex="0"
                    @action=${(B) => this._onOpeningAction(B, y)}
                    .actionHandler=${st({
            // Only wait out the hold/double-tap timers when a gesture
            // actually resolves: otherwise every tap on a plain
            // contact sensor would sit for 500ms before answering.
            hasHold: ze(this._openingPress(y, "hold")?.config),
            hasDoubleClick: ze(this._openingPress(y, "double_tap")?.config)
          })}>
                  ${T}
                  <rect class="fp-opening-hit" x=${y.x - C} y=${y.y - D / 2}
                        width=${y.length} height=${D}
                        transform="rotate(${y.angle} ${y.x} ${y.y})" />
                </g>`;
        }
      )}
            ${$e(
        o.trackers ?? [],
        (y, w) => y.id || w,
        (y) => Ra(y, {
          editing: !1,
          xReading: Ii(i?.states, y.xSensor?.entity),
          yReading: Ii(i?.states, y.ySensor?.entity),
          xPresent: $i(i?.states, y.xSensor?.presence),
          yPresent: $i(i?.states, y.ySensor?.presence)
        })
      )}
            <!-- Sun dimming (issue #113). Last inside the rotated group, so it
                 covers the whole plan; the device overlay below is HTML and
                 stays at full brightness, keeping icons and state readable at
                 night. pointer-events:none is not optional — this rect spans
                 the canvas, and without it every tappable opening underneath
                 stops responding (the lesson from #108). -->
            ${e.sunDimming ? _`${g}<rect class="fp-sun-dim"
                            x=${-V} y=${-V}
                            width=${e.width + V * 2}
                            height=${e.height + V * 2}
                            fill="#000"
                            mask=${g === f ? f : `url(#${m})`}
                            opacity=${1 - c} />` : f}
            </g>
          </svg>`
    )}
          <div
            class="items"
            style="--fp-inv-zoom:${jm(v.scale, e.zoomedOverlayScale)};"
          >
            ${o.areas?.map((y) => this._renderAreaLabel(y, e, s, l))}
            ${o.texts.map((y) => this._renderText(y, e, s, l))}
            ${$e(
      // Keyed like the openings above: a floor switch must build fresh
      // nodes rather than morph one floor's badges into another's.
      o.openings.filter((y) => va(y)),
      (y, w) => `${y.id || w}-shutter`,
      (y) => this._renderShutterMark(y, e, s, l, i)
    )}
            ${$e(
      o.openings.filter((y) => $a(y)),
      (y, w) => `${y.id || w}-opening`,
      (y) => this._renderOpeningMark(y, e, s, l, i)
    )}
            ${$e(
      // No entity filter: devices that exist physically but have no HA
      // entity still deserve their badge (issue #39). Keyed by id so a
      // floor switch builds fresh DOM (see the openings comment).
      // "Only when active" devices drop out here (issue #55), and so do
      // the ones that only show inside their own room (#222) — the
      // editor still draws them, dimmed, so they stay editable.
      o.items.filter(
        (y) => !ia(
          y,
          y.entity ? i?.states[y.entity]?.state : void 0
        ) && !Cf(y, b)
      ),
      (y, w) => y.id || w,
      (y) => this._renderItem(y, e, s, l, i)
    )}
          </div>
          </div>
          ${v.scale > 1 ? u`<button
                class="zoom-out"
                title="Zoom out"
                aria-label="Zoom out"
                @click=${() => this._zoomedAreaId = void 0}
              >
                <ha-icon icon="mdi:magnify-minus-outline"></ha-icon>
              </button>` : f}
          ${$ ? u`<div class="plan-title">${e.title}</div>` : f}
          ${n.length > 1 ? this._renderFloorSwitcher(n, o, x) : f}
        </div>
        </div>
      </ha-card>
    `;
  }
  _renderReplayPanel() {
    return ig(tg(this._replayController));
  }
  _renderFloorSwitcher(e, t, i = !1) {
    return u`
      <div class="floor-switcher ${i ? "row" : ""}">
        ${e.map((n) => {
      const o = n.id === t.id ? j(n.color) : void 0;
      return u`
            <button
              class=${n.id === t.id ? "active" : ""}
              title=${n.name}
              style=${o ? `background:${o};border-color:${o};` : f}
              @click=${() => this._goToFloor(e, n.id)}
            >
              ${n.short || n.name}
            </button>
          `;
    })}
      </div>
    `;
  }
};
ue._nextWallMaskId = 0;
ue._nextGlowId = 0;
ue.styles = [
  Lr,
  Nc,
  oe`
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
      width: ${wi}px;
      height: ${wi}px;
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
       replace it — restating scale(${us}) alone would drop the
       counter-scale along with the translate, and a badge held down at 4x
       zoom would balloon to roughly 4x its resting size instead of shrinking. */
    .press-scale .item.interactive {
      transition: transform ${ms}ms cubic-bezier(0.2, 0.8, 0.3, 1);
    }
    .press-scale .item.interactive:active {
      transform: translate(-50%, -50%) scale(calc(var(--fp-inv-zoom, 1) * ${us}));
      transition-duration: ${fs}ms;
    }

    /* Flash: drop-shadow rather than a box-shadow or a background, so the halo
       follows whatever the device actually draws — the badge's circle, a bare
       ripple ring, the label — instead of a rectangle around it. */
    .press-flash .item.interactive {
      transition: filter ${ms}ms ease-out;
    }
    .press-flash .item.interactive:active {
      filter: drop-shadow(0 0 5px var(--fp-skin-accent, var(--primary-color, #03a9f4)));
      transition-duration: ${fs}ms;
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
      font-size: ${io}px;
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
vt([
  A({ attribute: !1 })
], ue.prototype, "hass", 2);
vt([
  k()
], ue.prototype, "_config", 2);
vt([
  k()
], ue.prototype, "_activeFloorId", 2);
vt([
  k()
], ue.prototype, "_zoomedAreaId", 2);
vt([
  k()
], ue.prototype, "_portrait", 2);
ue = vt([
  Li("fp-ef-card")
], ue);
const dt = 26, fg = 0.75;
function mg(e, t, i, n = fg) {
  const o = e.find((a) => a.id === t);
  if (!o) return;
  const s = [];
  i !== 2 && s.push({ x: o.x1, y: o.y1, which: 1 }), i !== 1 && s.push({ x: o.x2, y: o.y2, which: 2 });
  const r = [];
  for (const a of e)
    if (a.id !== o.id)
      for (const l of [1, 2]) {
        const c = l === 1 ? a.x1 : a.x2, h = l === 1 ? a.y1 : a.y2, d = s.find((p) => Math.hypot(c - p.x, h - p.y) <= n);
        d && r.push({ id: a.id, end: l, which: d.which, x0: c, y0: h });
      }
  return r.length ? r : void 0;
}
function Ua(e, t, i, n) {
  let o = null, s = n;
  for (const r of e) {
    const a = Math.hypot(t - r.x, i - r.y);
    a < s && (s = a, o = { x: r.x, y: r.y });
  }
  return o;
}
function Ba(e, t, i, n) {
  const o = e.flatMap((s) => [
    { x: s.x1, y: s.y1 },
    { x: s.x2, y: s.y2 }
  ]);
  return Ua(o, t, i, n);
}
function gg(e, t, i, n, o) {
  const s = e.walls.flatMap((a) => [
    { x: a.x1, y: a.y1 },
    { x: a.x2, y: a.y2 }
  ]), r = (e.areas ?? []).flatMap(
    (a) => a.points.filter((l, c) => !(o && o.areaId === a.id && o.vertexIndex === c)).map((l) => ({ x: l.x, y: l.y }))
  );
  return Ua([...s, ...r], t, i, n);
}
function Ks(e, t, i) {
  const n = e.areas ?? [];
  for (let o = n.length - 1; o >= 0; o--)
    if (Xi(n[o].points, t, i)) return n[o];
}
function yg(e, t) {
  if (t <= 0) return [];
  const i = So(e);
  if (t === 1) return [i];
  const n = e.map((d) => d.x), o = e.map((d) => d.y), s = Math.min(...n), r = Math.max(...n), a = Math.min(...o), l = Math.max(...o), c = Math.max(r - s, 1), h = Math.max(l - a, 1);
  for (let d = 1; d <= 8; d++) {
    const p = t * d, m = Math.max(1, Math.round(Math.sqrt(p * c / h))), g = Math.max(1, Math.ceil(p / m)), b = c / (m + 1), v = h / (g + 1), x = [];
    for (let $ = 1; $ <= g; $++)
      for (let y = 1; y <= m; y++) {
        const w = s + y * b, E = a + $ * v;
        Xi(e, w, E) && x.push({ x: w, y: E });
      }
    if (x.length >= t)
      return Array.from(
        { length: t },
        ($, y) => x[Math.floor(y * x.length / t)]
      );
  }
  return Array.from({ length: t }, (d, p) => {
    const m = p / t * Math.PI * 2, g = Math.min(c, h) * 0.15 * (1 + Math.floor(p / 6));
    return { x: i.x + Math.cos(m) * g, y: i.y + Math.sin(m) * g };
  });
}
function bg(e, t, i, n, o, s, r, a, l = dt) {
  if (r) return { x: s(n), y: s(o) };
  const c = Ba(e, n, o, l);
  if (c) return c;
  const h = n - t, d = o - i, p = Math.tan(a * Math.PI / 180);
  return Math.abs(d) <= Math.abs(h) * p ? { x: s(n), y: i } : Math.abs(h) <= Math.abs(d) * p ? { x: t, y: s(o) } : { x: s(n), y: s(o) };
}
function _g(e, t) {
  const i = Math.min(t.x0, t.x1), n = Math.max(t.x0, t.x1), o = Math.min(t.y0, t.y1), s = Math.max(t.y0, t.y1), r = (l, c) => l >= i && l <= n && c >= o && c <= s, a = [];
  for (const l of e.walls)
    r((l.x1 + l.x2) / 2, (l.y1 + l.y2) / 2) && a.push({ kind: "wall", id: l.id });
  for (const l of e.openings) r(l.x, l.y) && a.push({ kind: "opening", id: l.id });
  for (const l of e.items) r(l.x, l.y) && a.push({ kind: "item", id: l.id });
  for (const l of e.texts) r(l.x, l.y) && a.push({ kind: "text", id: l.id });
  for (const l of e.furniture) r(l.x, l.y) && a.push({ kind: "furniture", id: l.id });
  for (const l of e.trackers ?? [])
    r(l.x + l.w / 2, l.y + l.h / 2) && a.push({ kind: "tracker", id: l.id });
  for (const l of e.areas ?? []) {
    const c = So(l.points);
    r(c.x, c.y) && a.push({ kind: "area", id: l.id });
  }
  return a;
}
function vg(e, t, i, n) {
  return {
    walls: e.walls.map((o) => {
      const s = n.get(`wall:${o.id}`);
      return s && s.kind === "wall" ? { ...o, x1: s.x1 + t, y1: s.y1 + i, x2: s.x2 + t, y2: s.y2 + i } : o;
    }),
    openings: e.openings.map((o) => {
      const s = n.get(`opening:${o.id}`);
      return s && s.kind === "pt" ? { ...o, x: s.x + t, y: s.y + i } : o;
    }),
    items: e.items.map((o) => {
      const s = n.get(`item:${o.id}`);
      return s && s.kind === "pt" ? { ...o, x: s.x + t, y: s.y + i } : o;
    }),
    texts: e.texts.map((o) => {
      const s = n.get(`text:${o.id}`);
      return s && s.kind === "pt" ? { ...o, x: s.x + t, y: s.y + i } : o;
    }),
    furniture: e.furniture.map((o) => {
      const s = n.get(`furniture:${o.id}`);
      return s && s.kind === "pt" ? { ...o, x: s.x + t, y: s.y + i } : o;
    }),
    trackers: (e.trackers ?? []).map((o) => {
      const s = n.get(`tracker:${o.id}`);
      return s && s.kind === "pt" ? { ...o, x: s.x + t, y: s.y + i } : o;
    }),
    areas: (e.areas ?? []).map((o) => {
      const s = n.get(`area:${o.id}`);
      return s && s.kind === "polygon" ? { ...o, points: s.points.map((r) => ({ x: r.x + t, y: r.y + i })) } : o;
    })
  };
}
const xg = [
  "item",
  "text",
  "opening",
  "furniture",
  "wall",
  "tracker",
  // Room polygons are the largest thing on the plan and usually cover
  // everything else in the room, so they pick last — but they *are* in the
  // list, so cycling can still reach them.
  "area"
], At = {
  wall: 11,
  /** Padding around an item badge / text box so small glyphs stay grabbable. */
  pad: 4
};
function ei(e, t, i, n, o) {
  const s = -(o || 0) * Math.PI / 180, r = e - i, a = t - n;
  return { x: r * Math.cos(s) - a * Math.sin(s), y: r * Math.sin(s) + a * Math.cos(s) };
}
function wg(e, t, i) {
  const n = i.x2 - i.x1, o = i.y2 - i.y1, s = n * n + o * o;
  if (s === 0) return Math.hypot(e - i.x1, t - i.y1);
  let r = ((e - i.x1) * n + (t - i.y1) * o) / s;
  return r = Math.max(0, Math.min(1, r)), Math.hypot(e - (i.x1 + r * n), t - (i.y1 + r * o));
}
function $g(e, t, i, n) {
  const o = [], s = (r, a, l, c) => o.push({ sel: { kind: r, id: a }, rank: xg.indexOf(r), order: l, locked: !!c });
  return e.items.forEach((r, a) => {
    const l = (r.size ?? n.itemSize) / 2 + At.pad;
    Math.abs(t - r.x) <= l && Math.abs(i - r.y) <= l && s("item", r.id, a, r.locked);
  }), e.texts.forEach((r, a) => {
    const l = r.size ?? n.textSize, c = l * 0.6 * Math.max(1, ao(n.hass, r).length) / 2 + At.pad, h = l / 2 + At.pad, d = ei(t, i, r.x, r.y, r.angle ?? 0);
    Math.abs(d.x) <= c && Math.abs(d.y) <= h && s("text", r.id, a, r.locked);
  }), e.openings.forEach((r, a) => {
    const l = ei(t, i, r.x, r.y, r.angle ?? 0);
    Math.abs(l.x) <= r.length / 2 && Math.abs(l.y) <= n.wallThickness / 2 + At.pad && s("opening", r.id, a, r.locked);
  }), e.furniture.forEach((r, a) => {
    const l = ei(t, i, r.x, r.y, r.angle ?? 0);
    Math.abs(l.x) <= r.w / 2 && Math.abs(l.y) <= r.h / 2 && s("furniture", r.id, a, r.locked);
  }), e.walls.forEach((r, a) => {
    wg(t, i, r) <= At.wall && s("wall", r.id, a, r.locked);
  }), (e.trackers ?? []).forEach((r, a) => {
    const l = ei(t, i, r.x + r.w / 2, r.y + r.h / 2, r.angle ?? 0);
    Math.abs(l.x) <= r.w / 2 && Math.abs(l.y) <= r.h / 2 && s("tracker", r.id, a, r.locked);
  }), (e.areas ?? []).forEach((r, a) => {
    Xi(r.points, t, i) && s("area", r.id, a, r.locked);
  }), o.sort((r, a) => Number(r.locked) - Number(a.locked) || r.rank - a.rank || a.order - r.order).map((r) => r.sel);
}
function Ga(e, t) {
  switch (t.kind) {
    case "wall":
      return e.walls.find((i) => i.id === t.id);
    case "opening":
      return e.openings.find((i) => i.id === t.id);
    case "item":
      return e.items.find((i) => i.id === t.id);
    case "text":
      return e.texts.find((i) => i.id === t.id);
    case "furniture":
      return e.furniture.find((i) => i.id === t.id);
    case "tracker":
      return (e.trackers ?? []).find((i) => i.id === t.id);
    case "area":
      return (e.areas ?? []).find((i) => i.id === t.id);
  }
}
function Mt(e, t) {
  return !!Ga(e, t)?.locked;
}
function kg(e, t) {
  return t.filter((i) => {
    const n = Ga(e, i);
    return !!n && !n.locked;
  });
}
function Sg(e, t, i) {
  if (!e.length) return null;
  if (!i || t.length !== 1) return e[0];
  const n = e.findIndex((o) => o.kind === t[0].kind && o.id === t[0].id);
  return n < 0 ? e[0] : e[(n + 1) % e.length];
}
const Eg = {
  request: (e) => requestAnimationFrame(e),
  cancel: (e) => cancelAnimationFrame(e)
};
class Ag {
  constructor(t, i) {
    this.frames = t, this.deliver = i, this._pending = null, this._hasPending = !1, this._handle = null;
  }
  /** True while a value is queued for delivery. */
  get pending() {
    return this._hasPending;
  }
  /** Queue a value, replacing any still waiting for this frame. */
  push(t) {
    this._pending = t, this._hasPending = !0, this._handle === null && (this._handle = this.frames.request(() => {
      this._handle = null, this._deliverPending();
    }));
  }
  /**
   * Deliver the newest queued value now. For the end of a gesture: pointerup
   * must land on the last position the pointer actually reported, not on
   * whatever the previous frame happened to catch.
   */
  settle() {
    this._cancelFrame(), this._deliverPending();
  }
  /** Drop anything queued without delivering it (the gesture was canceled). */
  cancel() {
    this._cancelFrame(), this._pending = null, this._hasPending = !1;
  }
  _cancelFrame() {
    this._handle !== null && (this.frames.cancel(this._handle), this._handle = null);
  }
  _deliverPending() {
    if (!this._hasPending) return;
    const t = this._pending;
    this._pending = null, this._hasPending = !1, this.deliver(t);
  }
}
const Vs = "Apply needs Home Assistant's card editor — use Save instead.", Mg = "Save this card once first — it isn't on the dashboard yet.", Cg = 200;
function Tg(e) {
  let t = e;
  for (let i = 0; t && i < Cg; i++) {
    const n = t;
    if (typeof n._params?.saveCardConfig == "function") return n;
    t = t.parentNode ?? t.host ?? null;
  }
  return null;
}
async function Ig(e) {
  const t = Tg(e);
  if (!t) return { ok: !1, error: Vs };
  if (t._params?.isNew) return { ok: !1, error: Mg };
  const i = t._cardConfig;
  if (!i || typeof i != "object")
    return { ok: !1, error: Vs };
  try {
    await t._params.saveCardConfig(i);
  } catch (n) {
    return { ok: !1, error: `Could not save — ${n instanceof Error ? n.message : String(n)}` };
  }
  return typeof t._markDirtyStateClean == "function" ? t._markDirtyStateClean() : typeof t._dirty == "boolean" && (t._dirty = !1), { ok: !0 };
}
var Pg = Object.defineProperty, Og = Object.getOwnPropertyDescriptor, Eo = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Og(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Pg(t, i, o), o;
};
let Vt = class extends te {
  get _list() {
    return this.area.sidebar ?? [];
  }
  _patch(e) {
    this.dispatchEvent(new CustomEvent("area-patch", { detail: e, bubbles: !0, composed: !0 }));
  }
  _setSidebar(e) {
    this._patch({ sidebar: e.length ? e : void 0 });
  }
  _move(e, t) {
    const i = this._list.map((o) => ({ ...o })), [n] = i.splice(e, 1);
    i.splice(e + t, 0, n), this._setSidebar(i);
  }
  _rename(e, t) {
    const i = this._list.map((n) => ({ ...n }));
    t ? i[e].name = t : delete i[e].name, this._setSidebar(i);
  }
  _resize(e, t) {
    const i = this.area.points, n = i && It(i);
    !i || !n || !(e >= 1) || !(t >= 1) || this._patch({
      points: i.map((o) => ({ x: o.x === n.x ? n.x : n.x + e, y: o.y === n.y ? n.y : n.y + t }))
    });
  }
  render() {
    const e = this.area, t = e.points && It(e.points), i = this._list;
    return u`
      <label class="field">
        <span>Type</span>
        <select @change=${(n) => this._patch({ type: n.target.value })}>
          ${hr.map(([n, o]) => u`<option value=${n} ?selected=${(e.type ?? "room") === n}>${o}</option>`)}
        </select>
      </label>
      ${e.type === "custom" ? u`<label class="field">
            <span>Label</span>
            <input
              type="text"
              .value=${e.typeLabel ?? ""}
              @change=${(n) => this._patch({ typeLabel: n.target.value.trim() || void 0 })}
            />
          </label>` : f}
      ${t ? u`<div class="dims">
            <label class="field"><span>Width</span>
              <input type="number" min="1" .value=${String(Math.round(t.w))}
                @change=${(n) => this._resize(Number(n.target.value), t.h)} /></label>
            <label class="field"><span>Height</span>
              <input type="number" min="1" .value=${String(Math.round(t.h))}
                @change=${(n) => this._resize(t.w, Number(n.target.value))} /></label>
          </div>` : f}
      <h4>Sidebar</h4>
      <p class="muted">Only what is listed here appears when the room is tapped: devices, scenes and scripts.</p>
      ${i.map(
      (n, o) => u`<div class="row">
          <ha-icon .icon=${me(this.hass, n.entity, n.icon)}></ha-icon>
          <div class="main">
            <input
              type="text"
              .value=${n.name ?? ""}
              placeholder=${jt(this.hass, n.entity)}
              @change=${(s) => this._rename(o, s.target.value.trim())}
            />
            <small>${n.entity} · ${{ device: "device", scene: "scene", script: "script" }[ui(n.entity)]}${this.hass.states[n.entity] ? "" : " · not found"}</small>
          </div>
          <button title="Up" ?disabled=${o === 0} @click=${() => this._move(o, -1)}><ha-icon icon="mdi:chevron-up"></ha-icon></button>
          <button title="Down" ?disabled=${o === i.length - 1} @click=${() => this._move(o, 1)}><ha-icon icon="mdi:chevron-down"></ha-icon></button>
          <button title="Remove" @click=${() => this._setSidebar(i.filter((s, r) => r !== o))}><ha-icon icon="mdi:close"></ha-icon></button>
        </div>`
    )}
      <fp-entity-picker
        .hass=${this.hass}
        .exclude=${i.map((n) => n.entity)}
        clearOnSelect
        placeholder="Add device, scene or script …"
        @value-changed=${(n) => {
      n.stopPropagation(), n.detail.value && this._setSidebar([...i, { entity: n.detail.value }]);
    }}
      ></fp-entity-picker>
    `;
  }
};
Vt.styles = oe`
    :host {
      display: block;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-bottom: 8px;
      font-size: 13px;
    }
    select,
    input {
      font: inherit;
      padding: 6px;
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      box-sizing: border-box;
      width: 100%;
    }
    .dims {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    h4 {
      margin: 12px 0 4px;
    }
    .muted,
    small {
      color: var(--secondary-text-color);
      font-size: 12px;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 6px;
    }
    .main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }
    button {
      border: none;
      background: none;
      color: inherit;
      cursor: pointer;
      padding: 4px;
      line-height: 0;
    }
    button:disabled {
      opacity: 0.3;
      cursor: default;
    }
  `;
Eo([
  A({ attribute: !1 })
], Vt.prototype, "hass", 2);
Eo([
  A({ attribute: !1 })
], Vt.prototype, "area", 2);
Vt = Eo([
  Te("fp-ef-area-extras")
], Vt);
function Zs(e) {
  return "text" in e.selector || "number" in e.selector;
}
function zg(e, t, i) {
  const n = {};
  for (const o of i)
    t[o.name] !== e[o.name] && (n[o.name] = t[o.name]);
  return n;
}
function Xs(e, t) {
  const i = {};
  for (const n of t) {
    if (!(n.name in e)) continue;
    let o = e[n.name];
    if ("text" in n.selector || "icon" in n.selector || "entity" in n.selector || "attribute" in n.selector)
      (o === "" || o == null) && (o = n.required ? "" : void 0);
    else if ("number" in n.selector) {
      const s = typeof o == "string" && o !== "" ? Number(o) : o;
      if (typeof s != "number" || !Number.isFinite(s)) {
        if (n.required) continue;
        o = void 0;
      } else {
        const r = n.selector.number;
        let a = n.name === "angle" ? (s % 360 + 360) % 360 : s;
        r.min !== void 0 && a < r.min && (a = r.min), r.max !== void 0 && a > r.max && (a = r.max), o = a;
      }
    } else "boolean" in n.selector && (o = !!o);
    i[n.name] = o;
  }
  return i;
}
const Qe = (e) => e, ti = ["binary_sensor", "cover", "lock"];
function _e(e, t) {
  return { fields: t.map((n) => e.fields.find((o) => o.name === n)).filter((n) => !!n), data: e.data, toPatch: e.toPatch };
}
const Zt = () => ({
  name: "angle",
  label: "Angle",
  selector: { number: { min: 0, max: 360, step: 1, mode: "slider", unit_of_measurement: "°" } }
}), S = (e, t) => ({ value: e, label: t }), H = (...e) => ({
  select: { mode: "dropdown", options: e }
});
function qa(e = Me) {
  return of(e);
}
function Lg(e, t = Me) {
  return qi(t, e)?.name ?? e;
}
function Rg(e, t = () => 0) {
  const i = Y(e), n = Vi(e), o = Si(e), s = [
    { name: "type", label: "Type", selector: H(S("door", "Door"), S("window", "Window")) },
    {
      name: "motion",
      label: "Motion",
      selector: H(
        S("swing", "Swing"),
        S("slide", "Slide"),
        // Not "garage / shutter": an external shutter is the Shutter field
        // below, a layer over any opening, and naming it here read as the
        // place to set one up.
        S("roll", "Roll up (garage)"),
        ...e.type === "window" ? [S("fixed", "Fixed (does not open)"), S("awning", "Top-hinged (awning)")] : []
      )
    },
    { name: "length", label: "Length", required: !0, selector: { number: { min: 1, mode: "box" } } }
  ];
  if (i === "swing") {
    const r = e.type === "door";
    s.push({
      name: "sash",
      label: r ? "Leaves" : "Sashes",
      helper: r ? "Double = two leaves meeting in the middle, hinged at each jamb. Three or four: equal leaves side by side" : "Single = one full-width sash (issue #73). Three or four: equal sashes side by side",
      selector: r ? H(
        S("single", "Single (one leaf)"),
        S("double", "Double (two leaves)"),
        S("triple", "Triple (three leaves)"),
        S("quad", "Quad (four leaves)")
      ) : H(
        S("double", "Double (two leaves)"),
        S("single", "Single sash"),
        S("triple", "Triple (three sashes)"),
        S("quad", "Quad (four sashes)")
      )
    });
  }
  if (i === "swing" && Rt(e) === "single" && s.push({
    name: "sashSpan",
    label: e.type === "door" ? "Leaf width" : "Sash width",
    helper: e.type === "door" ? "Share of the opening that actually swings — the rest is a fixed panel" : "Share of the opening that actually opens — the rest is fixed glass",
    selector: { number: { min: Kr, max: 1, step: 0.05, mode: "slider" } }
  }), e.type === "door" && s.push({
    name: "glazed",
    label: "Glazed",
    helper: "Lets sunlight through even when shut — a patio or French door",
    selector: { boolean: {} }
  }), s.push({
    name: "sunlight",
    label: "Lets sunlight in",
    helper: "Off makes it wall to the sun — for a solid door the plan draws open",
    selector: { boolean: {} }
  }), i === "swing" && Rt(e) === "single" && s.push({
    name: "hinge",
    label: "Hinge",
    selector: H(S("left", "Left"), S("right", "Right"))
  }), i === "swing") {
    const r = Ee(e);
    for (let a = 0; r > 1 && a < r; a++)
      s.push({
        name: `leafHinge${a + 1}`,
        label: `Hinge leaf ${a + 1}`,
        selector: H(S("", "Default"), S("left", "Left"), S("right", "Right"))
      });
  }
  if (i === "swing" && s.push({
    name: "opens",
    label: "Opens",
    selector: H(S("this", "This side"), S("other", "Other side"))
  }), i === "slide" && (o || s.push({
    name: "slide",
    label: "Slide",
    selector: H(S("left", "To left"), S("right", "To right"))
  }), s.push({
    name: "style",
    label: "Style",
    selector: H(
      S("single", "Single"),
      S("bypass", "Bypass (stack)"),
      S("biparting", "Biparting (into the walls)"),
      S("biparting-bypass", "Biparting (over fixed panels)"),
      S("converging", "Converging (both panels stack in the middle)")
    )
  })), s.push({
    name: "entity",
    label: "Entity",
    // Says locks are usable, because nothing else would: a lock is neither a
    // contact nor a cover, and its states are `locked` / `unlocked` rather
    // than anything that looks like open/closed (issue #176).
    helper: o ? "Contact, cover or lock. Drives the first leaf; type and motion follow its device class" : "Contact, cover or lock — a lock reads unlocked as open. Type and motion follow its device class",
    selector: { entity: { filter: [{ domain: ti }] } }
  }), o && e.entity && s.push({
    name: "secondaryEntity",
    label: "Second leaf",
    helper: "Its own sensor for the other leaf — leave empty to move both together",
    selector: { entity: { filter: [{ domain: ti }] } }
  }), i === "swing" && e.entity) {
    const r = Ee(e);
    r >= 3 && s.push({
      name: "leaf3Entity",
      label: "Third leaf",
      helper: "Its own sensor — leave empty to follow the first leaf",
      selector: { entity: { filter: [{ domain: ti }] } }
    }), r >= 4 && s.push({
      name: "leaf4Entity",
      label: "Fourth leaf",
      helper: "Its own sensor — leave empty to follow the first leaf",
      selector: { entity: { filter: [{ domain: ti }] } }
    });
  }
  return s.push({
    name: "shutterEntity",
    label: "Shutter",
    helper: "External shutter over this opening — a cover, or a contact sensor",
    selector: { entity: { filter: [{ domain: ["cover", "binary_sensor"] }] } }
  }), e.shutterEntity && (s.push({
    name: "shutterStyle",
    label: "Shutter type",
    helper: "Hinged panels fold back against the wall; roll-up slats disappear upward",
    selector: H(S("swing", "Hinged (louvered panels)"), S("roll", "Roll-up (slats)"))
  }), ut(e) === "swing" && s.push({
    name: "shutterSide",
    label: "Shutter side",
    helper: "Which side of the wall the panels hang on",
    selector: H(S("far", "Away from the sash"), S("near", "Same side as the sash"))
  }), ut(e) === "swing" && s.push({
    name: "shutterSecondaryEntity",
    label: "Second shutter panel",
    helper: "Its own contact for the other panel — leave empty to fold both together",
    selector: { entity: { filter: [{ domain: ["binary_sensor", "cover"] }] } }
  }), s.push({
    name: "shutterInvert",
    label: "Invert shutter animation",
    selector: { boolean: {} }
  })), s.push({
    name: "invert",
    label: e.type === "door" ? "Invert door animation" : "Invert window animation",
    helper: e.entity ? void 0 : (
      // Only a swing door draws open with no sensor to ask
      // (openingDefaultOpen) — everything else, door or window, draws shut.
      e.type === "door" && Y(e) === "swing" ? "No sensor bound — draws shut instead of open" : "No sensor bound — draws open instead of shut"
    ),
    selector: { boolean: {} }
  }), s.push(Zt()), e.entity && (s.push({
    name: "showIcon",
    label: "Show icon",
    helper: Y(e) === "roll" ? "A raised roll-up leaves only a line — this puts its state beside it, and opens its dialog when tapped" : "Shows this opening's state beside it, and opens its dialog when tapped",
    selector: { boolean: {} }
  }), e.showIcon && s.push({
    name: "icon",
    label: "Icon",
    helper: "Overrides the entity's own icon, which changes with its state",
    selector: { icon: {} }
  })), e.entity && e.shutterEntity && (s.push({
    name: "showShutterIcon",
    label: "Shutter icon",
    helper: "Shows the shutter's state beside the opening, and opens it when tapped",
    selector: { boolean: {} }
  }), (e.showShutterIcon ?? !0) && s.push({
    name: "shutterIcon",
    label: "Icon",
    helper: "Overrides the shutter entity's own icon, which changes with its state",
    selector: { icon: {} }
  }), s.push({
    name: "tapTarget",
    label: "Tap opens",
    helper: "The other one moves to press-and-hold. Opens the dialog; use Tap action below to move the shutter itself",
    selector: H(
      S("opening", e.type === "door" ? "The door" : "The window"),
      S("shutter", "The shutter")
    )
  })), (e.entity || e.shutterEntity) && s.push(
    {
      name: "tap_action",
      label: "Tap action",
      selector: {
        ui_action: {
          default_action: vo(e, "tap", t)?.config.action ?? "none"
        }
      }
    },
    {
      name: "hold_action",
      label: "Hold action",
      // With both bound, holding reaches whichever entity the tap does not.
      // With only one, there is nothing left for hold to open.
      helper: e.entity && e.shutterEntity ? "Opens the entity the tap doesn't" : void 0,
      selector: {
        ui_action: {
          default_action: e.entity && e.shutterEntity ? "more-info" : "none"
        }
      }
    },
    {
      name: "double_tap_action",
      label: "Double-tap action",
      selector: { ui_action: { default_action: "none" } }
    }
  ), {
    fields: s,
    data: {
      type: e.type,
      motion: i,
      length: e.length,
      hinge: e.flipH ? "right" : "left",
      opens: e.flipV ? "other" : "this",
      slide: e.flipH ? "right" : "left",
      style: n,
      sash: Rt(e),
      entity: e.entity ?? "",
      secondaryEntity: e.secondaryEntity ?? "",
      leafHinge1: e.leafHinges?.[0] ?? "",
      leafHinge2: e.leafHinges?.[1] ?? "",
      leafHinge3: e.leafHinges?.[2] ?? "",
      leafHinge4: e.leafHinges?.[3] ?? "",
      leaf3Entity: e.extraEntities?.[0] ?? "",
      leaf4Entity: e.extraEntities?.[1] ?? "",
      glazed: ko(e),
      sunlight: e.sunlight ?? !0,
      shutterEntity: e.shutterEntity ?? "",
      shutterSecondaryEntity: e.shutterSecondaryEntity ?? "",
      shutterStyle: ut(e),
      shutterSide: e.shutterFlipV ? "near" : "far",
      shutterInvert: e.shutterInvert ?? !1,
      showShutterIcon: e.showShutterIcon ?? !0,
      shutterIcon: e.shutterIcon ?? "",
      showIcon: e.showIcon ?? !1,
      icon: e.icon ?? "",
      tapTarget: e.tapTarget ?? "opening",
      invert: e.invert ?? !1,
      angle: e.angle,
      tap_action: e.tap_action,
      hold_action: e.hold_action,
      double_tap_action: e.double_tap_action
    },
    toPatch(r) {
      const a = {};
      for (const [l, c] of Object.entries(r))
        if (l === "shutterEntity")
          a.shutterEntity = c, c || (a.shutterStyle = void 0, a.shutterFlipV = void 0, a.shutterInvert = void 0, a.shutterActiveColor = void 0, a.shutterSecondaryEntity = void 0, a.tapTarget = void 0, a.showShutterIcon = void 0, a.shutterIcon = void 0);
        else if (l === "sunlight")
          a.sunlight = c ? void 0 : !1;
        else if (l === "glazed")
          a.glazed = e.type === "door" && c ? !0 : void 0;
        else if (l === "entity")
          a.entity = c, c || (a.showIcon = void 0, a.icon = void 0);
        else if (l === "shutterSide") a.shutterFlipV = c === "near" || void 0;
        else if (l === "shutterInvert") a.shutterInvert = c || void 0;
        else if (l === "tapTarget") a.tapTarget = c === "shutter" ? "shutter" : void 0;
        else if (l === "showShutterIcon") a.showShutterIcon = c ? void 0 : !1;
        else if (l === "showIcon")
          a.showIcon = c ? !0 : void 0, c || (a.icon = void 0);
        else if (l === "motion") {
          const h = c === "slide" || c === "roll" || c === "fixed" || c === "awning" ? c : void 0;
          a.motion = h, c !== "slide" && (a.sliderStyle = void 0), c !== "swing" && (a.sashSpan = void 0), c !== "swing" && (a.extraEntities = void 0), c !== "swing" && (a.leafHinges = void 0), Si({
            ...e,
            motion: h,
            sliderStyle: c === "slide" ? e.sliderStyle : void 0
          }) || (a.secondaryEntity = void 0);
        } else if (l === "sashSpan")
          a.sashSpan = typeof c == "number" && c < 1 ? c : void 0;
        else if (l === "sash") {
          a.sash = c === Rn(e.type) ? void 0 : c;
          const h = Ee({ ...e, sash: c, motion: "swing" });
          if (h < 2 && (a.secondaryEntity = void 0), h < 2 && (a.leafHinges = void 0), h < 3) a.extraEntities = void 0;
          else if (e.extraEntities && e.extraEntities.length > h - 2) {
            const d = e.extraEntities.slice(0, h - 2);
            a.extraEntities = d.some(Boolean) ? d : void 0;
          }
          h > 1 && (a.sashSpan = void 0);
        } else if (/^leafHinge[1-4]$/.test(l)) {
          const h = a.leafHinges ?? e.leafHinges, d = [0, 1, 2, 3].map((p) => h?.[p] ?? "");
          for (d[Number(l.slice(-1)) - 1] = c || ""; d.length && !d[d.length - 1]; ) d.pop();
          a.leafHinges = d.length ? d : void 0;
        } else if (l === "leaf3Entity" || l === "leaf4Entity") {
          const h = a.extraEntities ?? e.extraEntities, d = [0, 1].map((p) => h?.[p] ?? "");
          for (d[l === "leaf3Entity" ? 0 : 1] = c || ""; d.length && !d[d.length - 1]; ) d.pop();
          a.extraEntities = d.length ? d : void 0;
        } else l === "shutterStyle" ? (a.shutterStyle = c, c !== "swing" && (a.shutterSecondaryEntity = void 0)) : l === "hinge" || l === "slide" ? a.flipH = c === "right" || void 0 : l === "opens" ? a.flipV = c === "other" || void 0 : l === "style" ? (a.sliderStyle = c === "single" ? void 0 : c, ba(c) || (a.secondaryEntity = void 0)) : l === "invert" ? a.invert = c || void 0 : a[l] = c;
      return a;
    }
  };
}
function Ao(e, t) {
  return e?.entities.length ? { entity: { include_entities: t && !e.entities.includes(t) ? [...e.entities, t] : e.entities } } : { entity: {} };
}
function Mo(e, t) {
  if (!e?.entities.length) return t;
  const n = `Only entities in ${e.name ? `the ${e.name} area` : "this area"} — turn off “Filter entities” on the area to see all`;
  return t ? `${t}. ${n}` : n;
}
function di(e) {
  if ((e.display ?? "badge") === "ripple") return "none";
  const t = qt(e);
  if (t !== "icon") return t;
  const i = e.iconAnimation ?? "auto";
  return i === "spin" || i === "pulse" ? i : i === "auto" ? la(e.entity) ?? "icon" : "icon";
}
function Co(e) {
  return (e.display ?? "badge") !== "badge";
}
function Ka(e, t) {
  const i = {
    badgeContent: e === "value" ? "value" : e === "none" ? "none" : "icon",
    // Touching the badge retires the `showIcon` boolean it replaced (issue
    // #106), so a migrated config carries one setting rather than two that
    // could later be edited into disagreeing. Configs nobody touches keep
    // working through badgeContentOf's fallback.
    showIcon: void 0,
    display: t ? e === "none" ? "ripple" : "iconRipple" : "badge"
  };
  return e !== "value" && e !== "none" && (i.iconAnimation = e === "icon" ? "none" : e), i;
}
function Fg(e, t) {
  return {
    fields: [
      {
        name: "entity",
        label: "Entity",
        required: !0,
        helper: Mo(t),
        selector: Ao(t, e.entity)
      },
      {
        name: "attribute",
        label: "Attribute",
        helper: "Show this attribute instead of the state (e.g. current_temperature)",
        selector: { attribute: { entity_id: e.entity } }
      }
    ],
    data: { entity: e.entity ?? "", attribute: e.attribute ?? "" },
    toPatch: Qe
  };
}
function Dg(e) {
  return {
    fields: [
      { name: "name", label: "Name", selector: { text: {} } },
      {
        name: "showName",
        label: "Show name",
        helper: "Adds the name to the label line",
        selector: { boolean: {} }
      }
    ],
    data: { name: e.name ?? "", showName: e.showName ?? !1 },
    toPatch: Qe
  };
}
function Ng(e) {
  return {
    fields: [
      {
        name: "showState",
        label: "Show state",
        helper: "Adds this entity's own state to the label line",
        selector: { boolean: {} }
      }
    ],
    data: { showState: e.showState ?? e.kind === "sensor" },
    toPatch: Qe
  };
}
function Hg(e) {
  const t = [
    {
      name: "labelPosition",
      label: "Label position",
      helper: "Beside the badge instead of under it — a long reading then grows one way only",
      selector: H(S("below", "Below"), S("left", "Left"), S("right", "Right"))
    },
    {
      name: "labelSize",
      label: "Label size",
      selector: { number: { min: 8, max: 40, step: 1, mode: "slider", unit_of_measurement: "px" } }
    },
    {
      name: "disableLabelColor",
      label: "Disable label color",
      helper: "Keeps the text in its default color even if the icon changes color",
      selector: { boolean: {} }
    }
  ];
  return e.disableLabelColor && t.push({
    name: "useCustomLabelColor",
    label: "Own color",
    helper: "Override the theme default with a fixed custom color",
    selector: { boolean: {} }
  }), {
    fields: t,
    data: {
      labelPosition: fo(e),
      labelSize: e.labelSize ?? na,
      disableLabelColor: e.disableLabelColor ?? !1,
      useCustomLabelColor: e.useCustomLabelColor ?? !1,
      labelCustomColor: e.labelCustomColor ?? ""
    },
    toPatch: (i) => {
      const n = { ...i }, o = n.disableLabelColor ?? e.disableLabelColor ?? !1, s = n.useCustomLabelColor ?? e.useCustomLabelColor ?? !1;
      return n.labelPosition === "below" && (n.labelPosition = void 0), n.disableLabelColor === !1 && (n.disableLabelColor = void 0), n.useCustomLabelColor === !1 && (n.useCustomLabelColor = void 0), o ? s || (n.labelCustomColor = void 0) : (n.useCustomLabelColor = void 0, n.labelCustomColor = void 0), n.labelCustomColor === "" && (n.labelCustomColor = void 0), n;
    }
  };
}
function jg(e, t) {
  const i = [
    {
      name: "badgeMode",
      label: "Badge shows",
      helper: "Animations play only while the entity is active. Value puts the reading in the badge, falling back to the icon when there is no number",
      selector: H(
        S("icon", "Icon, still"),
        S("spin", "Icon, spinning"),
        S("pulse", "Icon, pulsing"),
        S("value", "Value"),
        S("none", "Nothing")
      )
    }
  ], n = je(e);
  return di(e) === "value" && n.length && i.push({
    name: "badgeEntity",
    label: "Badge reads",
    helper: "Which of this device's readings the badge shows",
    selector: H(
      S("primary", t?.primaryLabel || e.entity || "Main entity"),
      ...n.map(
        (o, s) => S(
          String(s),
          t?.readingLabels?.[s] || o.entity || (o.attribute ? `${e.entity || "this device"} · ${o.attribute}` : `Reading ${s + 1}`)
        )
      )
    )
  }), i.push(
    {
      name: "size",
      label: "Size",
      selector: { number: { min: 16, max: 160, step: 2, mode: "slider", unit_of_measurement: "px" } }
    },
    Zt()
  ), {
    fields: i,
    data: {
      badgeMode: di(e),
      // The dropdown's values are strings, so the stored index (or the legacy
      // "secondary") is spelled the same way here; toPatch turns it back into
      // a number. Opens on what the badge is *actually* reading when nothing
      // is chosen, which is the whole point of badgeSource (issue #136).
      badgeEntity: String(ma(e.badgeEntity) ?? t?.source ?? "primary"),
      size: e.size ?? Ke,
      angle: e.angle ?? 0
    },
    // "Badge shows" is the editor's spelling of three config keys (issue
    // #127) — expand it back, carrying the ripple state off the item since
    // that control lives in another group now.
    toPatch: (o) => {
      let s = o;
      if ("badgeEntity" in s && typeof s.badgeEntity == "string" && s.badgeEntity !== "primary" && (s = { ...s, badgeEntity: Number(s.badgeEntity) }), !("badgeMode" in s)) return s;
      const { badgeMode: r, ...a } = s;
      return {
        ...a,
        ...Ka(r ?? di(e), Co(e))
      };
    }
  };
}
function Wg(e, t) {
  const i = Co(e), n = da(e.entity, t), o = e.kind === "light" || e.entity?.startsWith("light.");
  if (!n && !o) return;
  const s = [];
  return n && (s.push({
    name: "ripple",
    label: "Ripple",
    // "Detected" rather than "the sensor is on": this is offered to a
    // device_tracker and a person too, and neither of those is a sensor.
    // It stays vague about *what* is detected because a vibration sensor
    // rings for a knock, not for presence (issue #202).
    helper: "Draws a pulsing ring while this device detects something",
    selector: { boolean: {} }
  }), i && (s.push({
    name: "rippleSize",
    label: "Ripple size",
    selector: {
      number: { min: 40, max: 400, step: 4, mode: "slider", unit_of_measurement: "px" }
    }
  }), s.push({
    name: "rippleDirection",
    label: "Ripple direction",
    selector: {
      number: { min: 0, max: 360, step: 1, mode: "slider", unit_of_measurement: "°" }
    }
  }), s.push({
    name: "rippleWidth",
    label: "Ripple width",
    selector: {
      number: { min: 0, max: 360, step: 1, mode: "slider", unit_of_measurement: "°" }
    }
  }))), o && (s.push({
    name: "glow",
    label: "Cast light",
    helper: "Pools the light's own color onto the plan; overlapping lights mix",
    selector: { boolean: {} }
  }), e.glow && s.push(
    {
      name: "glowRadius",
      label: "Light radius",
      selector: { number: { min: 20, max: 600, step: 10, mode: "slider" } }
    },
    {
      name: "glowColor",
      label: "Light color",
      helper: "Only for bulbs that can't report a color; others use their own",
      selector: { text: {} }
    }
  )), {
    fields: s,
    data: {
      ripple: i,
      rippleSize: e.rippleSize ?? ji,
      rippleDirection: e.rippleDirection ?? Wi,
      rippleWidth: e.rippleWidth ?? Ui,
      glow: e.glow ?? !1,
      glowRadius: e.glowRadius ?? Hi,
      glowColor: e.glowColor ?? ""
    },
    // "Ripple" is the other half of #127's three-key spelling — same expansion
    // as the badge group's, with the badge mode read off the item.
    toPatch: (r) => {
      if (!("ripple" in r)) return r;
      const { ripple: a, ...l } = r;
      return { ...l, ...Ka(di(e), !!a) };
    }
  };
}
function Ug(e) {
  const t = [
    {
      name: "showOnlyWhenZoomed",
      label: "Only show when zoomed into area",
      helper: "Hidden on the full plan, and shown once the room it sits in is zoomed into",
      selector: { boolean: {} }
    },
    {
      name: "enableHideByEntity",
      label: "Hide by condition (Entire Object)",
      selector: { boolean: {} }
    }
  ];
  if (e.enableHideByEntity) {
    const i = e.hideEntity || e.entity;
    t.push(
      {
        name: "hideEntity",
        label: "Evaluation Entity (Optional)",
        helper: "Leave empty to use the main object entity",
        selector: { entity: {} }
      },
      {
        name: "hideAttribute",
        label: "Evaluation Attribute (Optional)",
        helper: "Leave empty to use the entity's state instead of an attribute",
        selector: { attribute: { entity_id: i } }
      },
      {
        name: "hideMode",
        label: "Condition Type",
        selector: { select: { mode: "dropdown", options: [{ value: "state", label: "State Match" }, { value: "threshold", label: "Numeric Threshold" }] } }
      },
      {
        name: "hideOperator",
        label: "Operator",
        selector: {
          select: {
            mode: "dropdown",
            options: e.hideMode === "threshold" ? [{ value: "<", label: "<" }, { value: "<=", label: "<=" }, { value: "==", label: "==" }, { value: "!=", label: "!=" }, { value: ">=", label: ">=" }, { value: ">", label: ">" }] : [{ value: "==", label: "==" }, { value: "!=", label: "!=" }]
          }
        }
      }
    ), e.hideMode === "threshold" ? t.push({
      name: "hideThreshold",
      label: "Threshold Value",
      selector: { number: { mode: "box", step: "any" } }
    }) : t.push({
      name: "hideState",
      label: "Hide State",
      helper: e.hideAttribute ? "Enter the exact attribute value that triggers the hide action" : "Select the state that triggers the hide action",
      selector: e.hideAttribute || !i ? { text: {} } : { state: { entity_id: i } }
    }), t.push({
      name: "hideInvert",
      label: "Invert condition",
      helper: "Hide when condition is NOT met",
      selector: { boolean: {} }
    });
  }
  if (t.push({
    name: "enableHideStateByEntity",
    label: "Hide State by condition",
    helper: "Hides only the state text below the icon based on a condition",
    selector: { boolean: {} }
  }), e.enableHideStateByEntity) {
    const i = e.hideStateEntity || e.entity;
    t.push(
      {
        name: "hideStateEntity",
        label: "State Eval. Entity (Optional)",
        helper: "Leave empty to use the main object entity",
        selector: { entity: {} }
      },
      {
        name: "hideStateAttribute",
        label: "State Eval. Attribute (Optional)",
        helper: "Leave empty to use the entity's state instead of an attribute",
        selector: { attribute: { entity_id: i } }
      },
      {
        name: "hideStateMode",
        label: "Condition Type",
        selector: { select: { mode: "dropdown", options: [{ value: "state", label: "State Match" }, { value: "threshold", label: "Numeric Threshold" }] } }
      },
      {
        name: "hideStateOperator",
        label: "Operator",
        selector: {
          select: {
            mode: "dropdown",
            options: e.hideStateMode === "threshold" ? [{ value: "<", label: "<" }, { value: "<=", label: "<=" }, { value: "==", label: "==" }, { value: "!=", label: "!=" }, { value: ">=", label: ">=" }, { value: ">", label: ">" }] : [{ value: "==", label: "==" }, { value: "!=", label: "!=" }]
          }
        }
      }
    ), e.hideStateMode === "threshold" ? t.push({
      name: "hideStateThreshold",
      label: "Threshold Value",
      selector: { number: { mode: "box", step: "any" } }
    }) : t.push({
      name: "hideStateMatch",
      label: "Hide State Match",
      helper: e.hideStateAttribute ? "Enter the exact attribute value that triggers hiding the text" : "Select the state that triggers hiding the text",
      selector: e.hideStateAttribute || !i ? { text: {} } : { state: { entity_id: i } }
    }), t.push({
      name: "hideStateInvert",
      label: "Invert condition",
      helper: "Hide text when condition is NOT met",
      selector: { boolean: {} }
    });
  }
  if (t.push({
    name: "enableHideBadgeByEntity",
    label: "Hide Badge by condition",
    helper: "Hides only the badge (icon/bubble) based on a condition",
    selector: { boolean: {} }
  }), e.enableHideBadgeByEntity) {
    const i = e.hideBadgeEntity || e.entity;
    t.push(
      {
        name: "hideBadgeEntity",
        label: "Badge Eval. Entity (Optional)",
        helper: "Leave empty to use the main object entity",
        selector: { entity: {} }
      },
      {
        name: "hideBadgeAttribute",
        label: "Badge Eval. Attribute (Optional)",
        helper: "Leave empty to use the entity's state instead of an attribute",
        selector: { attribute: { entity_id: i } }
      },
      {
        name: "hideBadgeMode",
        label: "Condition Type",
        selector: { select: { mode: "dropdown", options: [{ value: "state", label: "State Match" }, { value: "threshold", label: "Numeric Threshold" }] } }
      },
      {
        name: "hideBadgeOperator",
        label: "Operator",
        selector: {
          select: {
            mode: "dropdown",
            options: e.hideBadgeMode === "threshold" ? [{ value: "<", label: "<" }, { value: "<=", label: "<=" }, { value: "==", label: "==" }, { value: "!=", label: "!=" }, { value: ">=", label: ">=" }, { value: ">", label: ">" }] : [{ value: "==", label: "==" }, { value: "!=", label: "!=" }]
          }
        }
      }
    ), e.hideBadgeMode === "threshold" ? t.push({
      name: "hideBadgeThreshold",
      label: "Threshold Value",
      selector: { number: { mode: "box", step: "any" } }
    }) : t.push({
      name: "hideBadgeMatch",
      label: "Hide Badge Match",
      helper: e.hideBadgeAttribute ? "Enter the exact attribute value that triggers hiding the badge" : "Select the state that triggers hiding the badge",
      selector: e.hideBadgeAttribute || !i ? { text: {} } : { state: { entity_id: i } }
    }), t.push({
      name: "hideBadgeInvert",
      label: "Invert condition",
      helper: "Hide badge when condition is NOT met",
      selector: { boolean: {} }
    });
  }
  return {
    fields: t,
    data: {
      showOnlyWhenZoomed: e.showOnlyWhenZoomed ?? !1,
      enableHideByEntity: e.enableHideByEntity ?? !1,
      hideEntity: e.hideEntity ?? "",
      hideAttribute: e.hideAttribute ?? "",
      hideMode: e.hideMode ?? "state",
      hideState: e.hideState ?? "",
      hideOperator: e.hideOperator ?? "==",
      hideThreshold: e.hideThreshold ?? 0,
      hideInvert: e.hideInvert ?? !1,
      enableHideStateByEntity: e.enableHideStateByEntity ?? !1,
      hideStateEntity: e.hideStateEntity ?? "",
      hideStateAttribute: e.hideStateAttribute ?? "",
      hideStateMode: e.hideStateMode ?? "state",
      hideStateMatch: e.hideStateMatch ?? "",
      hideStateOperator: e.hideStateOperator ?? "==",
      hideStateThreshold: e.hideStateThreshold ?? 0,
      hideStateInvert: e.hideStateInvert ?? !1,
      enableHideBadgeByEntity: e.enableHideBadgeByEntity ?? !1,
      hideBadgeEntity: e.hideBadgeEntity ?? "",
      hideBadgeAttribute: e.hideBadgeAttribute ?? "",
      hideBadgeMode: e.hideBadgeMode ?? "state",
      hideBadgeMatch: e.hideBadgeMatch ?? "",
      hideBadgeOperator: e.hideBadgeOperator ?? "==",
      hideBadgeThreshold: e.hideBadgeThreshold ?? 0,
      hideBadgeInvert: e.hideBadgeInvert ?? !1
    },
    // Off is the default, so it leaves no key behind — an untouched device's
    // YAML stays as short as it was before this switch existed.
    //
    // Only when the user actually touched it, though. `_renderForm` diffs the
    // form against the event and passes on just the keys that changed, and
    // `_updateItem` merges with a spread — so a key that is merely *present*
    // and undefined overwrites what the config had. Writing it unconditionally
    // meant every one of this group's two dozen other fields silently switched
    // this one off. The sibling forms all prune inside a walk of
    // `Object.entries(patch)`, which has the same guard built in.
    toPatch: (i) => "showOnlyWhenZoomed" in i ? { ...i, showOnlyWhenZoomed: i.showOnlyWhenZoomed || void 0 } : i
  };
}
function Bg(e) {
  return {
    fields: [
      {
        name: "hideWhenInactive",
        label: "Only when active",
        helper: "Hide on the card while the entity is off/idle (still editable here)",
        selector: { boolean: {} }
      },
      {
        name: "tap_action",
        label: "Tap action",
        selector: { ui_action: { default_action: Ur(e.entity).action } }
      },
      { name: "hold_action", label: "Hold action", selector: { ui_action: { default_action: "none" } } },
      {
        name: "double_tap_action",
        label: "Double-tap action",
        selector: { ui_action: { default_action: "none" } }
      }
    ],
    data: {
      hideWhenInactive: e.hideWhenInactive ?? !1,
      tap_action: e.tap_action,
      hold_action: e.hold_action,
      double_tap_action: e.double_tap_action
    },
    toPatch: Qe
  };
}
function Gg(e, t) {
  const i = [
    {
      name: "text",
      label: "Text",
      // Required only while nothing else fills the label. A text with no words
      // and no entity is an invisible element, which is what this guarded
      // against; with a reading bound the words are optional, and demanding
      // them for a label that is only ever a number would be asking for a
      // placeholder to delete.
      required: !e.entity,
      helper: e.entity ? "Shown in front of the reading — leave empty for the value alone" : void 0,
      selector: { text: {} }
    },
    {
      name: "entity",
      label: "Entity",
      helper: Mo(t, "Shows this entity's value, formatted as HA formats it"),
      selector: Ao(t, e.entity)
    }
  ];
  return e.entity && i.push({
    name: "attribute",
    label: "Attribute",
    helper: "Show this attribute instead of the state (e.g. current_temperature)",
    selector: { attribute: { entity_id: e.entity } }
  }), i.push(
    {
      name: "size",
      label: "Size",
      selector: { number: { min: 8, max: 200, mode: "slider", unit_of_measurement: "px" } }
    },
    Zt()
  ), {
    fields: i,
    data: {
      text: e.text ?? "",
      entity: e.entity ?? "",
      attribute: e.attribute ?? "",
      size: e.size ?? zt,
      angle: e.angle ?? 0
    },
    toPatch: (n) => "entity" in n && !n.entity ? { ...n, attribute: void 0 } : n
  };
}
function qg(e, t, i = Me) {
  const n = qa(i);
  return {
    fields: [
      {
        name: "type",
        label: "Type",
        selector: { select: { mode: "dropdown", options: n.some((s) => s.id === e.type) ? n.map((s) => ({ value: s.id, label: s.name })) : [{ value: e.type, label: `${e.type} (missing)` }, ...n.map((s) => ({ value: s.id, label: s.name }))] } }
      },
      // L-shaped sectional only (#40): which side the chaise extends on,
      // facing the sofa from the front. Conditional, in the same shape
      // openingForm uses for its hinge / slide fields.
      ...e.type === "sectional" ? [
        {
          name: "hand",
          label: "Chaise side",
          helper: "Facing the sofa from the front",
          selector: H(S("right", "right"), S("left", "left"))
        }
      ] : [],
      { name: "w", label: "Width", required: !0, selector: { number: { min: 10, mode: "box" } } },
      { name: "h", label: "Height", required: !0, selector: { number: { min: 10, mode: "box" } } },
      Zt(),
      // Optional entity that makes the drawing live (issue #82) — a soil
      // sensor on a plant, a contact sensor on a cabinet. Last, because most
      // furniture is decoration and never binds anything.
      {
        name: "entity",
        label: "Entity",
        helper: Mo(t, "Optional — lets the drawing change color with a sensor"),
        selector: Ao(t, e.entity)
      },
      // Clicking it changes floor (issue #121). Offered on any piece rather
      // than only on the built-in `stairs`, because a plan can draw its own
      // staircase and a rule keyed on one symbol id would leave those out.
      // Empty on everything by default, so it is a row and not a nag.
      {
        name: "goToFloor",
        label: "Go to floor",
        helper: "Clicking this piece changes floor — for a staircase",
        selector: H(S("", "Nothing"), S("up", "Up one floor"), S("down", "Down one floor"))
      }
    ],
    data: {
      type: e.type,
      ...e.type === "sectional" ? { hand: e.hand ?? "right" } : {},
      w: e.w,
      h: e.h,
      angle: e.angle ?? 0,
      entity: e.entity ?? "",
      goToFloor: e.goToFloor ?? ""
    },
    // "" is the empty option, and means the piece is ordinary furniture.
    toPatch: (s) => "goToFloor" in s && !s.goToFloor ? { ...s, goToFloor: void 0 } : s
  };
}
function Kg(e) {
  return {
    fields: [
      { name: "w", label: "Width", required: !0, selector: { number: { min: 10, mode: "box" } } },
      { name: "h", label: "Height", required: !0, selector: { number: { min: 10, mode: "box" } } },
      { name: "x", label: "X", required: !0, selector: { number: { mode: "box" } } },
      { name: "y", label: "Y", required: !0, selector: { number: { mode: "box" } } },
      Zt(),
      {
        name: "dotSize",
        label: "Dot size",
        selector: { number: { min: 6, max: 80, mode: "slider", unit_of_measurement: "px" } }
      }
    ],
    data: {
      w: e.w,
      h: e.h,
      x: Math.round(e.x),
      y: Math.round(e.y),
      angle: e.angle ?? 0,
      dotSize: e.dotSize ?? no
    },
    toPatch: Qe
  };
}
function Vg(e, t = []) {
  return {
    fields: [{ name: "name", label: "Name", selector: t.length ? {
      select: {
        options: t.map((n) => ({ value: n, label: n })),
        custom_value: !0,
        mode: "dropdown",
        sort: !1
      }
    } : { text: {} } }],
    data: { name: e.name ?? "" },
    toPatch: Qe
  };
}
function Zg(e) {
  return {
    fields: [
      { name: "showName", label: "Show name", selector: { boolean: {} } },
      // Only while the name renders — same rule the item form uses for its
      // label size.
      ...e.showName ?? !0 ? [
        {
          name: "labelSize",
          label: "Name size",
          selector: {
            number: { min: 8, max: 40, step: 1, mode: "slider", unit_of_measurement: "px" }
          }
        }
      ] : [],
      {
        name: "opacity",
        label: "Fill opacity",
        selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } }
      },
      // How close tapping the room goes (issue #222). Only worth asking while
      // a tap still zooms: an area with its own `tap_action` has replaced the
      // zoom outright, and a number that does nothing is worse than no number.
      //
      // A toggle *and* a slider, rather than the slider alone resting at the
      // fit's ceiling. That earlier shape made "fit" and an explicit 4 the
      // same position, so a room whose fit is 1.15 — the ordinary case, and
      // the one this feature exists for — could not be told to zoom to 4 at
      // all. "Fit" is not a number on this scale; it is the absence of one,
      // and it needs its own control to say so.
      ...e.tap_action ? [] : [
        {
          name: "fitZoom",
          label: "Fit the room to the card",
          helper: "Off lets you set how close a tap goes",
          selector: { boolean: {} }
        },
        ...e.zoom === void 0 ? [] : [
          {
            name: "zoom",
            label: "Zoom level",
            helper: "How close a tap goes",
            selector: {
              number: {
                min: 1,
                max: Hr,
                step: 0.5,
                mode: "slider"
              }
            }
          }
        ]
      ],
      // Optional entity that makes the room itself live (issue #6) — a presence
      // sensor that lights the room while it is occupied. Last, because most
      // areas are just outlines and never bind anything.
      {
        name: "entity",
        label: "Entity",
        helper: "Optional — lets the room fill change color with a sensor",
        selector: { entity: {} }
      },
      // Only meaningful once something drives the colour. Offered here rather
      // than in the editor's colour rows because both are plain selectors, and
      // "Active opacity" belongs beside "Fill opacity".
      ...e.entity ? [
        {
          name: "activeOpacity",
          label: "Active opacity",
          helper: "Fill opacity while the entity resolves a color",
          selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } }
        },
        {
          name: "highlight",
          label: "Highlight",
          helper: "Border only outlines the room without tinting what's inside",
          selector: H(
            S("fill", "Fill"),
            S("border", "Border only"),
            S("both", "Fill and border")
          )
        }
      ] : [],
      // Actions on the room itself (issue #181). Tap already does something —
      // it zooms — so its default is named here rather than left blank: the
      // dropdown says "Zoom to room", which is what leaving it alone gives
      // you, on the same principle as the opening's "Tap opens".
      {
        name: "tap_action",
        label: "Tap action",
        helper: "Replaces the zoom. Put an action on hold or double-tap to keep both",
        selector: { ui_action: { default_action: "none" } }
      },
      { name: "hold_action", label: "Hold action", selector: { ui_action: { default_action: "none" } } },
      {
        name: "double_tap_action",
        label: "Double-tap action",
        selector: { ui_action: { default_action: "none" } }
      }
    ],
    data: {
      showName: e.showName ?? !0,
      labelSize: e.labelSize ?? io,
      opacity: e.opacity ?? Mn,
      entity: e.entity ?? "",
      activeOpacity: e.activeOpacity ?? e.opacity ?? Mn,
      highlight: e.highlight ?? "fill",
      // "Fit" is the absence of a number, so it gets its own boolean; the
      // slider only appears once that is off, and then always shows a real
      // stored value.
      fitZoom: e.zoom === void 0,
      zoom: e.zoom ?? Cn,
      tap_action: e.tap_action,
      hold_action: e.hold_action,
      double_tap_action: e.double_tap_action
    },
    toPatch: (t) => {
      let i = t;
      if ("highlight" in i && i.highlight === "fill" && (i = { ...i, highlight: void 0 }), "fitZoom" in i) {
        const { fitZoom: n, ...o } = i;
        i = { ...o, zoom: n ? void 0 : Cn };
      }
      return i;
    }
  };
}
function Xg(e) {
  const t = (i, n) => ({
    name: i,
    label: n,
    required: !0,
    selector: { number: { mode: "box" } }
  });
  return {
    fields: [
      t("x1", "Start X"),
      t("y1", "Start Y"),
      t("x2", "End X"),
      t("y2", "End Y"),
      {
        name: "thickness",
        label: "Thickness",
        // Capped at MAX_SKIN_WALL_WIDTH, not a rounder number: past that a
        // wall stops being fully cleared by its own door or window (the
        // doorway mask's cut is sized off the shared WALL_THICKNESS
        // constant, not per-wall — see render.ts's wallThickness).
        selector: {
          number: { min: 2, max: Or, step: 1, mode: "slider", unit_of_measurement: "px" }
        }
      }
    ],
    data: {
      x1: Math.round(e.x1),
      y1: Math.round(e.y1),
      x2: Math.round(e.x2),
      y2: Math.round(e.y2),
      thickness: e.thickness ?? V
    },
    // Keep the default out of the YAML so untouched walls stay terse.
    toPatch: (i) => "thickness" in i && i.thickness === V ? { ...i, thickness: void 0 } : i
  };
}
function Yg(e) {
  return {
    fields: [
      { name: "title", label: "Title", selector: { text: {} } },
      { name: "width", label: "Canvas width", required: !0, selector: { number: { min: 1, mode: "box" } } },
      { name: "height", label: "Canvas height", required: !0, selector: { number: { min: 1, mode: "box" } } },
      {
        name: "grid",
        label: "Grid size",
        required: !0,
        helper: `Gap between grid lines, in canvas units (canvas is ${e.width}×${e.height}). Smaller = finer grid.`,
        selector: { number: { min: 1, mode: "box" } }
      }
    ],
    data: { title: e.title ?? "", width: e.width, height: e.height, grid: e.grid ?? oo },
    toPatch: Qe
  };
}
function Jg(e) {
  return {
    fields: [
      {
        name: "pressEffect",
        label: "Press effect",
        helper: "Feedback when a device is pressed. Only devices that do something respond",
        selector: H(
          S("scale", "Press in"),
          S("ripple", "Ink ripple"),
          S("flash", "Flash"),
          S("none", "None")
        )
      }
    ],
    data: { pressEffect: oi(e) },
    // The default stays out of the YAML, as the skin's does.
    toPatch: (t) => "pressEffect" in t && t.pressEffect === Dr ? { ...t, pressEffect: void 0 } : t
  };
}
function Qg(e) {
  const t = e.historyReplay?.enabled ?? !1;
  return {
    fields: [
      {
        name: "historyReplayEnabled",
        label: "Enable history replay",
        helper: "Shows replay controls and loads mapped-entity history from Home Assistant",
        selector: { boolean: {} }
      }
    ],
    data: { historyReplayEnabled: t },
    toPatch: (i) => "historyReplayEnabled" in i ? i.historyReplayEnabled ? {
      historyReplay: {
        enabled: !0,
        lookbackSeconds: e.historyReplay?.lookbackSeconds,
        defaultSpeed: e.historyReplay?.defaultSpeed
      }
    } : { historyReplay: void 0 } : {}
  };
}
function ey(e) {
  const t = Qn(e.skin) ?? _i[0];
  return {
    fields: [
      {
        name: "skin",
        label: "Skin",
        helper: t.description,
        selector: H(..._i.map((i) => S(i.id, i.label)))
      }
    ],
    // An id we don't ship reads back as Default, matching what it renders as.
    data: { skin: t.id },
    toPatch: (i) => (
      // Default is the absence of a skin, so it stays out of the YAML.
      "skin" in i && i.skin === Di ? { ...i, skin: void 0 } : i
    )
  };
}
function ty(e) {
  return {
    fields: [
      {
        name: "rotation",
        label: "Rotate display",
        helper: "Rotates the live card only — editing stays as drawn",
        selector: H(S("0", "0°"), S("90", "90°"), S("180", "180°"), S("270", "270°"))
      },
      // Per-orientation overrides (issue #237). Two dropdowns with a "same as
      // above" default rather than a switch plus two angles: the switch would
      // be a third control whose only job is to say whether the other two
      // count, and "same as above" says that per orientation and for free.
      {
        name: "rotationPortrait",
        label: "…on a portrait screen",
        helper: "Overrides the angle above while the screen is taller than it is wide",
        selector: H(
          S("", "Same as above"),
          S("0", "0°"),
          S("90", "90°"),
          S("180", "180°"),
          S("270", "270°")
        )
      },
      {
        name: "rotationLandscape",
        label: "…on a landscape screen",
        helper: "Overrides the angle above while the screen is wider than it is tall",
        selector: H(
          S("", "Same as above"),
          S("0", "0°"),
          S("90", "90°"),
          S("180", "180°"),
          S("270", "270°")
        )
      },
      {
        name: "overlayScale",
        label: "Badge & label size",
        // Canvas units lead because they are what a plan wants and what a new
        // plan is created with; fixed pixels are what an older plan is still
        // laid out in, and the right answer for a card shown bigger than its
        // canvas or a wall tablet that wants a px floor under its text.
        helper: `Canvas units scale badges and labels with the drawing. Fixed pixels keep their size whatever width the card gets — suits a card rendered larger than its ${e.width}-wide canvas, or a wall tablet`,
        selector: H(S("plan", "Canvas units"), S("fixed", "Fixed pixels"))
      },
      {
        name: "compactHeader",
        label: "Compact header",
        // Says what it costs as well as what it saves — the title lands on the
        // drawing, and on a plan that fills the card that is a real trade.
        helper: "Draws the title inside the plan and the floor buttons in a row, instead of spending a header row on them",
        selector: { boolean: {} }
      },
      {
        name: "zoomedOverlayScale",
        label: "Zoomed badge size",
        helper: "Badges, labels and text while zoomed in to a room, as a multiple of their size at full plan. 1 keeps them the same",
        selector: { number: { min: 0.5, max: 3, step: 0.1, mode: "slider" } }
      },
      {
        name: "offlineStyle",
        label: "Offline devices",
        helper: "How a device is drawn when its entity is unavailable or missing",
        selector: H(
          S("dim", "Dimmed"),
          S("strike", "Dimmed and crossed out"),
          S("none", "No different")
        )
      }
    ],
    data: {
      rotation: String(Ft(e.rotation)),
      // "" is "same as above" — the absence of an override, not an angle.
      // `== null` for the same reason resolvePlanRotation uses it: a key
      // written with no value (`rotationPortrait:`) parses to `null`, and
      // reading that as an angle would show 0° here — then write it into the
      // YAML as a real override the moment this panel is saved, turning a
      // stray empty key into an instruction the plan never had.
      rotationPortrait: e.rotationPortrait == null ? "" : String(Ft(e.rotationPortrait)),
      rotationLandscape: e.rotationLandscape == null ? "" : String(Ft(e.rotationLandscape)),
      overlayScale: mo(e.overlayScale),
      compactHeader: e.compactHeader ?? !1,
      zoomedOverlayScale: e.zoomedOverlayScale ?? Tn,
      offlineStyle: ua(e)
    },
    toPatch: (t) => {
      let i = t;
      "rotation" in i && (i = { ...i, rotation: i.rotation === "0" ? void 0 : Number(i.rotation) });
      for (const n of ["rotationPortrait", "rotationLandscape"])
        n in i && (i = { ...i, [n]: i[n] === "" ? void 0 : Number(i[n]) });
      return "compactHeader" in i && !i.compactHeader && (i = { ...i, compactHeader: void 0 }), "offlineStyle" in i && i.offlineStyle === Nr && (i = { ...i, offlineStyle: void 0 }), "zoomedOverlayScale" in i && i.zoomedOverlayScale === Tn && (i = { ...i, zoomedOverlayScale: void 0 }), i;
    }
  };
}
function iy(e) {
  return {
    fields: [
      {
        name: "showDeadSpaces",
        label: "Mark dead spaces",
        helper: "Hatches any space the walls close off that no door or window opens onto",
        selector: { boolean: {} }
      }
    ],
    data: { showDeadSpaces: e.showDeadSpaces ?? !1 },
    // Off is the default, so it stays out of the YAML until switched on.
    toPatch: (t) => "showDeadSpaces" in t && !t.showDeadSpaces ? { ...t, showDeadSpaces: void 0 } : t
  };
}
function ny(e) {
  const t = [
    {
      name: "sunDimming",
      label: "Follow the sun",
      helper: "Dims the plan at night, using your Home Assistant's own sunrise and sunset",
      selector: { boolean: {} }
    }
  ];
  return e.sunDimming && t.push(
    {
      name: "sunBrightnessMin",
      label: "Night brightness",
      selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } }
    },
    {
      name: "sunBrightnessMax",
      label: "Day brightness",
      selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } }
    }
  ), {
    fields: t,
    data: {
      sunDimming: e.sunDimming ?? !1,
      sunBrightnessMin: e.sunBrightnessMin ?? to,
      sunBrightnessMax: e.sunBrightnessMax ?? vi
    },
    // Off is the default, so keep the whole feature out of the YAML until it
    // is switched on — including the two sliders it drags along with it.
    toPatch: (i) => "sunDimming" in i && !i.sunDimming ? { ...i, sunDimming: void 0, sunBrightnessMin: void 0, sunBrightnessMax: void 0 } : i
  };
}
function oy(e) {
  const t = [
    {
      name: "sunlight",
      label: "Let the sun in",
      helper: "Light through every window and open door; the rooms it never reaches go a shade darker",
      selector: { boolean: {} }
    }
  ];
  return e.sunlight && (t.push(
    {
      name: "north",
      label: "North",
      helper: "Which way north points on this plan, so the sun angle describes the house",
      selector: {
        number: { min: 0, max: 359, step: 1, mode: "slider", unit_of_measurement: "°" }
      }
    },
    {
      name: "sunShade",
      label: "Shade the rest",
      helper: "Darkens everywhere the light does not reach. Off shows the patches alone",
      selector: { boolean: {} }
    },
    {
      name: "sunReach",
      label: "Reach",
      helper: "How far a patch carries before it fades out, as a share of the plan's shorter side",
      selector: {
        number: { min: 0.05, max: 1, step: 0.01, mode: "slider" }
      }
    },
    {
      name: "sunFollows",
      label: "Follow the real sun",
      helper: "Swings through the day and goes out at night. Off keeps the light where you put it, always on",
      selector: { boolean: {} }
    }
  ), typeof e.sunBearing == "number" && t.push({
    name: "sunBearing",
    label: "Sun from",
    helper: "Compass bearing of the light: 0 = north, 90 = east, 180 = south",
    selector: {
      number: { min: 0, max: 359, step: 5, mode: "slider", unit_of_measurement: "°" }
    }
  })), {
    fields: t,
    data: {
      sunlight: e.sunlight ?? !1,
      sunShade: e.sunShade ?? !0,
      north: e.north ?? 0,
      sunReach: e.sunReach ?? Ci,
      sunFollows: typeof e.sunBearing != "number",
      sunBearing: e.sunBearing ?? Fn
    },
    toPatch: (i) => {
      const n = { ...i };
      return "sunlight" in n && !n.sunlight ? {
        ...n,
        sunlight: void 0,
        north: void 0,
        sunBearing: void 0,
        sunReach: void 0,
        sunShade: void 0,
        sunlightColor: void 0,
        sunShadeColor: void 0
      } : ("sunFollows" in n && (n.sunBearing = n.sunFollows ? void 0 : e.sunBearing ?? Fn, delete n.sunFollows), "north" in n && !n.north && (n.north = void 0), "sunReach" in n && n.sunReach === Ci && (n.sunReach = void 0), "sunShade" in n && n.sunShade && (n.sunShade = void 0), n);
    }
  };
}
function sy(e) {
  const t = [
    { name: "image", label: "Bg image", helper: "/local/floorplan.png or URL", selector: { text: {} } }
  ];
  return e.image && (t.push({
    name: "imageFit",
    label: "Image fit",
    helper: "Per floor, so scans of different resolutions can each fit properly",
    selector: H(
      S("stretch", "Stretch to canvas (may distort)"),
      S("contain", "Fit inside (keep proportions)"),
      S("cover", "Fill canvas (keep proportions, crop)")
    )
  }), t.push({
    name: "imageOpacity",
    label: "Image opacity",
    selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } }
  })), {
    fields: t,
    data: {
      image: e.image ?? "",
      imageFit: e.imageFit ?? "stretch",
      imageOpacity: e.imageOpacity ?? 1
    },
    // "stretch" is the default, so keep it out of the YAML.
    toPatch: (i) => "imageFit" in i && i.imageFit === "stretch" ? { ...i, imageFit: void 0 } : i
  };
}
var ry = Object.defineProperty, ay = Object.getOwnPropertyDescriptor, P = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? ay(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && ry(t, i, o), o;
};
const ly = (e) => e.label, cy = (e) => e.helper, un = {
  select: { icon: "mdi:cursor-default", label: "Select" },
  wall: { icon: "mdi:wall", label: "Wall" },
  door: { icon: "mdi:door", label: "Door" },
  window: { icon: "mdi:window-closed-variant", label: "Window" },
  tracker: { icon: "mdi:crosshairs-gps", label: "Tracker" },
  area: { icon: "mdi:vector-polygon", label: "Area" }
}, dy = {
  wall: "mdi:wall",
  opening: "mdi:door",
  item: "mdi:lightbulb-outline",
  text: "mdi:format-text",
  furniture: "mdi:sofa-outline",
  tracker: "mdi:crosshairs-gps",
  area: "mdi:floor-plan"
}, Ys = 35, Js = 12, hy = 8, py = 2e3, uy = 10;
function Qs(e) {
  return e.some((t) => {
    const i = t, n = i.tagName?.toLowerCase();
    return n === "input" || n === "textarea" || n === "select" || n === "ha-form" || n === "ha-entity-picker" || n === "ha-icon-picker" || i.isContentEditable === !0;
  });
}
let I = class extends te {
  constructor() {
    super(...arguments), this._wallMaskId = `fp-edit-wall-mask-${I._nextWallMaskId++}`, this._watchedEntities = /* @__PURE__ */ new Set(), this._tool = "select", this._selection = [], this._draft = null, this._draftTracker = null, this._areaShape = "polygon", this._draftArea = null, this._areaHover = null, this._freeWalls = !1, this._defaultOpeningLength = 60, this._marquee = null, this._history = [], this._future = [], this._zoom = 1, this._floorMenuOpen = !1, this._addMenuOpen = !1, this._addQuery = "", this._symbolDraft = "", this._symbolError = "", this._paletteError = "", this._projectOpen = !1, this._openGroups = /* @__PURE__ */ new Set(), this._fullscreen = !1, this._applyState = "idle", this._applyError = "", this._applyResetTimer = null, this._drag = null, this._dragMoves = new Ag(Eg, (e) => {
      this._drag && this._applyDrag(e);
    }), this._dragDirty = !1, this._pickAnchor = null, this._hideLabels = !1, this._pinchPts = /* @__PURE__ */ new Map(), this._pinch = null, this._gesturePointer = null, this._marqueeAdd = !1, this._clipboard = null, this._onKeyDown = (e) => this._handleKeyDown(e), this._onHostKeyDown = (e) => {
      e.key !== "Escape" || !this._fullscreen || Qs(e.composedPath()) && (e.preventDefault(), e.stopPropagation(), this._canvasWrap?.focus({ preventScroll: !0 }));
    }, this._onFocusIn = (e) => {
      this._fullscreen && !e.composedPath().includes(this) && (this._fullscreen = !1);
    }, this._preventGesture = (e) => e.preventDefault(), this._onWrapPointerDown = (e) => {
      if (e.pointerType !== "touch" || (this._pinchPts.set(e.pointerId, { x: e.clientX, y: e.clientY }), this._pinchPts.size !== 2)) return;
      this._cancelGesture();
      const t = this._canvasWrap, i = t?.getBoundingClientRect(), [n, o] = [...this._pinchPts.values()];
      this._pinch = {
        d0: Math.max(Math.hypot(o.x - n.x, o.y - n.y), 1),
        z0: this._zoom,
        cx: (n.x + o.x) / 2 - (i?.left ?? 0) + (t?.scrollLeft ?? 0),
        cy: (n.y + o.y) / 2 - (i?.top ?? 0) + (t?.scrollTop ?? 0)
      }, e.stopPropagation();
    }, this._onWrapPointerMove = (e) => {
      if (!this._pinch || !this._pinchPts.has(e.pointerId) || (this._pinchPts.set(e.pointerId, { x: e.clientX, y: e.clientY }), this._pinchPts.size < 2)) return;
      e.preventDefault(), e.stopPropagation();
      const [t, i] = [...this._pinchPts.values()], n = this._pinch;
      this._setZoom(n.z0 * (Math.hypot(i.x - t.x, i.y - t.y) / n.d0)), this.updateComplete.then(() => {
        const o = this._canvasWrap;
        if (!o || this._pinch !== n) return;
        const s = o.getBoundingClientRect(), r = this._zoom / n.z0;
        o.scrollLeft = n.cx * r - ((t.x + i.x) / 2 - s.left), o.scrollTop = n.cy * r - ((t.y + i.y) / 2 - s.top);
      });
    }, this._onWrapPointerEnd = (e) => {
      e.pointerType === "touch" && (this._pinchPts.delete(e.pointerId), this._pinchPts.size < 2 && (this._pinch = null));
    }, this._guides = [], this._liveEditKey = null, this._ctx = null, this._onContextMenu = (e) => {
      e.preventDefault(), this._tool === "select" && (this._ctx = { x: e.clientX, y: e.clientY });
    }, this._onEditorPointerDown = () => {
      this._liveEditKey = null;
    }, this._gridCache = null, this._apply = async () => {
      if (this._applyState === "saving") return;
      this._applyResetTimer !== null && clearTimeout(this._applyResetTimer), this._applyState = "saving", this._applyError = "", await this.updateComplete, await new Promise((t) => setTimeout(t, 0));
      const e = await Ig(this);
      if (!e.ok) {
        this._applyState = "idle", this._applyError = e.error;
        return;
      }
      this._applyState = "saved", this._applyResetTimer = setTimeout(() => {
        this._applyResetTimer = null, this._applyState = "idle";
      }, py);
    }, this._addSymbol = () => {
      let e;
      try {
        e = JSON.parse(this._symbolDraft);
      } catch (n) {
        this._symbolError = `Not valid JSON — ${n.message}`;
        return;
      }
      const t = [], i = Gi(e, void 0, t);
      if (!i) {
        this._symbolError = t[0] ?? "Not a usable symbol.";
        return;
      }
      this._patchConfig({ symbols: { ...this._config.symbols ?? {}, [i.id]: e } }), this._symbolDraft = "", this._symbolError = "";
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._onKeyDown, !0), this.addEventListener("keydown", this._onHostKeyDown), window.addEventListener("focusin", this._onFocusIn);
  }
  disconnectedCallback() {
    window.removeEventListener("keydown", this._onKeyDown, !0), this.removeEventListener("keydown", this._onHostKeyDown), window.removeEventListener("focusin", this._onFocusIn), this._applyResetTimer !== null && clearTimeout(this._applyResetTimer), this._dragMoves.cancel(), this._flushDrag(), this._drag = null, this._gesturePointer = null, this._resetPinch(), super.disconnectedCallback();
  }
  setConfig(e) {
    const t = { ...od(e.type || "custom:easy-floorplan-card"), ...e }, i = mt(t).map((n) => structuredClone(n));
    this._config = {
      ...t,
      floors: i,
      walls: [],
      openings: [],
      items: [],
      texts: [],
      furniture: [],
      trackers: []
    }, (!this._activeFloorId || !i.some((n) => n.id === this._activeFloorId)) && (this._activeFloorId = t.defaultFloor && i.some((n) => n.id === t.defaultFloor) ? t.defaultFloor : i[0].id), this._lastEmitted && e !== this._lastEmitted && !In(e, this._lastEmitted) && (this._history = [], this._future = [], this._liveEditKey = null), this._watchedEntities = Ct(this._config);
  }
  /**
   * HA replaces `hass` on every state change in the instance; the editor's
   * render is expensive (full SVG + panels). Skip ticks that can't change
   * anything we draw. Entity pickers keep the `hass` they last rendered with —
   * acceptable, the registry data they browse changes rarely.
   */
  shouldUpdate(e) {
    if (!(e.size === 1 && e.has("hass"))) return !0;
    const t = e.get("hass");
    if (!t || !this.hass) return !0;
    const i = (n) => n.floors;
    return i(t) !== i(this.hass) ? !0 : Vr(t, this.hass, this._watchedEntities);
  }
  // ---- active floor access -----------------------------------------------
  _floor() {
    const e = this._config.floors ?? [];
    return e.find((t) => t.id === this._activeFloorId) ?? e[0];
  }
  /**
   * The shipped symbol library with this config's own `symbols:` merged over
   * it (issue #90). Memoized on the config's identity inside `symbolCatalog`,
   * so calling it per cell in the picker costs one lookup.
   */
  _symbols() {
    return On(this._config.symbols);
  }
  /** Discrete change to the active floor's elements (snapshots for undo). */
  _commitFloor(e) {
    this._commit({ ...this._config, floors: this._patchFloors(e) });
  }
  /** Live change to the active floor's elements (no history snapshot — for dragging). */
  _emitFloor(e) {
    const t = { ...this._config, floors: this._patchFloors(e) };
    if (this._drag) {
      this._config = t, this._watchedEntities = Ct(t), this._dragDirty = !0;
      return;
    }
    this._emit(t);
  }
  /** Hand the host what a drag accumulated — once, on release. */
  _flushDrag() {
    this._dragDirty && (this._dragDirty = !1, this._emit(this._config));
  }
  _patchFloors(e) {
    const t = this._config.floors ?? [], i = t.find((n) => n.id === this._activeFloorId) ?? t[0];
    return t.map((n) => i && n.id === i.id ? { ...n, ...e } : n);
  }
  firstUpdated() {
    this._ensureHaComponents();
    for (const t of [
      "ha-form",
      "ha-entity-picker",
      "ha-entity-attribute-picker",
      "ha-icon-picker",
      "ha-combo-box"
    ])
      customElements.get(t) || customElements.whenDefined(t).then(() => this.requestUpdate());
    const e = this._canvasWrap;
    if (e) {
      e.addEventListener("pointerdown", this._onWrapPointerDown, { capture: !0 }), e.addEventListener("pointermove", this._onWrapPointerMove, { capture: !0 }), e.addEventListener("pointerup", this._onWrapPointerEnd, { capture: !0 }), e.addEventListener("pointercancel", this._onWrapPointerEnd, { capture: !0 });
      for (const t of ["gesturestart", "gesturechange", "gestureend"])
        e.addEventListener(t, this._preventGesture);
    }
  }
  /**
   * Defensive pinch-state reset (review feedback on #57). The listeners
   * themselves stay attached on purpose: they live on an element inside our
   * own shadow root (no leak — they die with the instance), and HA's dialog
   * reparents the editor, which fires disconnected/connected without a second
   * firstUpdated — removing them here would permanently kill pinch after a
   * reparent. Clearing the *points* is what matters: a pointerup lost to the
   * reparent would leave a stale entry behind, and the next single tap would
   * read as a phantom second finger.
   */
  _resetPinch() {
    this._pinchPts.clear(), this._pinch = null;
  }
  /**
   * Promote the expanded editor into the top layer. `position: fixed` alone is
   * not enough: HA's edit dialog puts a `transform` on its surface to offset
   * the safe areas, and any transform makes that surface the containing block
   * for fixed descendants — so a "full-viewport" overlay would fill the narrow
   * dialog instead. A popover escapes it. Collapsing drops the attribute, which
   * hides the popover on its own. Browsers without the API keep the fixed
   * fallback, which is already correct on the mobile dialog (transform: none).
   */
  updated() {
    if (!this._fullscreen) return;
    const e = this._editorEl;
    if (!(!e?.isConnected || typeof e.showPopover != "function") && !e.matches(":popover-open"))
      try {
        e.showPopover();
      } catch {
      }
  }
  /**
   * `ha-form` and the pickers are only defined once HA loads an editor that
   * imports them. The button-card editor statically imports ha-form (and the
   * ui_action selector chain); the entities editor defines ha-entity-picker
   * for the custom tracker rows. Every selector rendered by ha-form
   * lazy-loads its own picker after that.
   */
  async _ensureHaComponents() {
    if (customElements.get("ha-form") && customElements.get("ha-entity-picker")) return;
    const e = await window.loadCardHelpers?.();
    if (e) {
      for (const t of [{ type: "button" }, { type: "entities", entities: [] }])
        try {
          await (await e.createCardElement(t))?.constructor?.getConfigElement?.();
        } catch {
        }
      this.requestUpdate();
    }
  }
  get grid() {
    return this._config.grid ?? oo;
  }
  /**
   * Resolved placement snap step. `snap` is tri-state in the config: unset
   * means "follow the grid" (the default behaviour), `0` is free placement,
   * any other number is a custom step. See {@link resolveSnap}.
   */
  get _resolvedSnap() {
    return Qc(this._config.snap, this.grid);
  }
  /** Which radio option the panel's "Snap to" control shows as active. */
  get _snapMode() {
    const e = this._config.snap;
    return e == null ? "grid" : e === 0 ? "off" : "custom";
  }
  _setSnapMode(e) {
    if (e === "grid")
      this._patchConfig({ snap: void 0 });
    else if (e === "off")
      this._patchConfig({ snap: 0 });
    else {
      const t = this._config.snap;
      this._patchConfig({
        snap: t && t > 0 ? t : cn(_s, this.grid)
      });
    }
  }
  /** Grid update plus a custom-snap rescale so its percentage of the grid is preserved. */
  _gridPatch(e) {
    const t = { grid: e };
    if (this._snapMode === "custom") {
      const i = vs(this._config.snap, this.grid);
      t.snap = cn(i, e);
    }
    return t;
  }
  _setGuides(e) {
    JSON.stringify(e) !== JSON.stringify(this._guides) && (this._guides = e);
  }
  /** Snap to the step, but pull onto the x/y of a nearby wall end or room corner and remember the guide lines. */
  _alignedSnap(e, t, i) {
    const n = this._floor();
    let o = this._snap(e), s = this._snap(t);
    if (this._resolvedSnap <= 0)
      return this._setGuides([]), { x: o, y: s };
    const r = [];
    for (const h of n.walls) r.push({ x: h.x1, y: h.y1 }, { x: h.x2, y: h.y2 });
    for (const h of n.areas ?? []) for (const d of h.points) r.push(d);
    const a = [];
    let l = Js, c = Js;
    for (const h of r)
      i?.(h) || (Math.abs(h.x - e) <= l && (l = Math.abs(h.x - e), o = h.x, a[0] = { axis: "x", value: h.x }), Math.abs(h.y - t) <= c && (c = Math.abs(h.y - t), s = h.y, a[1] = { axis: "y", value: h.y }));
    return this._setGuides(a.filter(Boolean)), { x: o, y: s };
  }
  _snap(e) {
    const t = this._resolvedSnap;
    return t > 0 ? Math.round(e / t) * t : e;
  }
  _toVirtual(e, t = !0) {
    const n = this._svg.getScreenCTM();
    if (!n) return { x: 0, y: 0 };
    const o = new DOMPoint(e.clientX, e.clientY).matrixTransform(n.inverse());
    return t ? { x: this._snap(o.x), y: this._snap(o.y) } : { x: o.x, y: o.y };
  }
  /** Nearest existing wall endpoint within ENDPOINT_SNAP, or null. */
  _nearestCorner(e, t) {
    return Ba(this._floor().walls, e, t, dt);
  }
  /** Snap a raw point to a nearby existing wall endpoint, else to the snap step. */
  _snapWallPoint(e, t) {
    return this._nearestCorner(e, t) ?? this._alignedSnap(e, t);
  }
  /**
   * Snap a raw point for Area drawing/editing: nearby wall corner or another
   * Area's vertex wins (so adjacent rooms can share an exact boundary point),
   * else the grid/snap step. `exclude` drops one vertex from the candidate
   * set — the one currently being dragged, so it can't snap to itself.
   */
  _snapAreaPoint(e, t, i) {
    return gg(this._floor(), e, t, dt, i) ?? this._alignedSnap(e, t, (n) => {
      const o = i ? this._floor().areas?.find((s) => s.id === i.areaId)?.points : void 0;
      return !!o && o[i.vertexIndex] === n;
    });
  }
  /**
   * Like {@link _snapWallPoint}, but ignores endpoints in `moving` (keys
   * `${wallId}:${end}`) — the corner cluster being dragged must not attract
   * itself.
   */
  _snapWallPointExcluding(e, t, i) {
    let n = null, o = dt;
    for (const s of this._floor().walls)
      for (const r of [1, 2]) {
        if (i.has(`${s.id}:${r}`)) continue;
        const a = r === 1 ? s.x1 : s.x2, l = r === 1 ? s.y1 : s.y2, c = Math.hypot(e - a, t - l);
        c < o && (o = c, n = { x: a, y: l });
      }
    return n ?? this._alignedSnap(
      e,
      t,
      (s) => this._floor().walls.some(
        (r) => i.has(`${r.id}:1`) && r.x1 === s.x && r.y1 === s.y || i.has(`${r.id}:2`) && r.x2 === s.x && r.y2 === s.y
      )
    );
  }
  /** See {@link snapWallEnd}: corners win, then axis gravity, then the snap step. */
  _snapWallEnd(e, t, i, n) {
    const o = bg(
      this._floor().walls,
      e,
      t,
      i,
      n,
      (a) => this._snap(a),
      this._freeWalls,
      uy,
      dt
    );
    if (this._nearestCorner(i, n))
      return this._setGuides([]), o;
    const s = this._alignedSnap(i, n), r = this._guides.filter((a) => a.axis === "x" ? o.x !== e : o.y !== t);
    return this._setGuides(r), {
      x: r.some((a) => a.axis === "x") ? s.x : o.x,
      y: r.some((a) => a.axis === "y") ? s.y : o.y
    };
  }
  _emit(e) {
    this._drag && (this._drag.emitted = !0), this._config = e, this._watchedEntities = Ct(e);
    const t = { ...e };
    for (const i of ["walls", "openings", "items", "texts", "furniture", "trackers", "areas"])
      t[i]?.length || delete t[i];
    this._lastEmitted = structuredClone(t), this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: t }, bubbles: !0, composed: !0 })
    );
  }
  _pushHistory(e = null) {
    this._history = [...this._history, structuredClone(this._config)].slice(-60), this._future = [], this._liveEditKey = e;
  }
  /** Discrete change: snapshot for undo, then emit. */
  _commit(e) {
    this._pushHistory(), this._emit(e);
  }
  _undo() {
    if (this._liveEditKey = null, !this._history.length) return;
    this._future = [structuredClone(this._config), ...this._future];
    const e = this._history[this._history.length - 1];
    this._history = this._history.slice(0, -1), this._selection = [], this._emit(e);
  }
  _redo() {
    if (this._liveEditKey = null, !this._future.length) return;
    this._history = [...this._history, structuredClone(this._config)];
    const e = this._future[0];
    this._future = this._future.slice(1), this._selection = [], this._emit(e);
  }
  // ---- selection ----------------------------------------------------------
  /** The element whose properties show in the panel (the most recent selection). */
  _primary() {
    return this._selection[this._selection.length - 1] ?? null;
  }
  _selectOne(e) {
    this._selection = [e], this._liveEditKey = null;
  }
  _toggleSel(e) {
    this._selection = this._isSel(e.kind, e.id) ? this._selection.filter((t) => !(t.kind === e.kind && t.id === e.id)) : [...this._selection, e], this._liveEditKey = null;
  }
  _clearSel() {
    this._selection = [], this._liveEditKey = null;
  }
  /** Pointer-driven selection: modifier toggles; plain click selects unless already in the set. */
  _selectForPointer(e, t) {
    if (e.shiftKey || e.ctrlKey || e.metaKey) {
      this._toggleSel(t);
      return;
    }
    this._isSel(t.kind, t.id) || this._selectOne(t);
  }
  _idsOfKind(e) {
    return new Set(this._selection.filter((t) => t.kind === e).map((t) => t.id));
  }
  _mergeSel(e, t) {
    const i = [...e];
    for (const n of t) i.some((o) => o.kind === n.kind && o.id === n.id) || i.push(n);
    return i;
  }
  // ---- keyboard nudging ---------------------------------------------------
  _handleKeyDown(e) {
    const t = this.checkVisibility;
    if (t && !t.call(this)) return;
    const i = e.composedPath();
    if (!i.includes(this)) {
      this._fullscreen && e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), this._fullscreen = !1);
      return;
    }
    if (Qs(i)) return;
    const n = e.ctrlKey || e.metaKey, o = e.key.toLowerCase(), s = !!(this._drag || this._draft || this._draftTracker || this._draftArea || this._marquee);
    if (e.key === "Backspace" && this._draftArea?.points.length) {
      e.preventDefault();
      const c = this._draftArea.points.slice(0, -1);
      this._draftArea = c.length ? { points: c } : null;
      return;
    }
    if (s && e.key !== "Escape" && !(n && o === "c")) return;
    if (n && o === "c") {
      this._selection.length && (e.preventDefault(), this._copy());
      return;
    }
    if (n && o === "v") {
      this._clipboard && (e.preventDefault(), this._paste());
      return;
    }
    if (n && o === "d") {
      this._selection.length && (e.preventDefault(), this._duplicate());
      return;
    }
    if (n && o === "z") {
      e.preventDefault(), e.shiftKey ? this._redo() : this._undo();
      return;
    }
    if (n && o === "y") {
      e.preventDefault(), this._redo();
      return;
    }
    if (e.key === "Escape") {
      if (this._floorMenuOpen || this._addMenuOpen) {
        e.preventDefault(), e.stopPropagation(), this._floorMenuOpen = !1, this._addMenuOpen = !1, this._addQuery = "";
        return;
      }
      this._draft || this._draftTracker || this._draftArea || this._marquee || this._drag ? (e.preventDefault(), e.stopPropagation(), this._cancelGesture()) : this._selection.length ? (e.preventDefault(), e.stopPropagation(), this._clearSel()) : this._fullscreen && (e.preventDefault(), e.stopPropagation(), this._fullscreen = !1);
      return;
    }
    if ((e.key === "Delete" || e.key === "Backspace") && this._selection.length) {
      e.preventDefault(), this._deleteSelected();
      return;
    }
    if (!this._selection.length) return;
    const a = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1]
    }[e.key];
    if (!a) return;
    e.preventDefault();
    const l = e.shiftKey ? this.grid : this._resolvedSnap || 1;
    this._nudge(a[0] * l, a[1] * l);
  }
  _nudge(e, t) {
    if (!this._selection.length) return;
    const i = this._floor();
    if (!kg(i, this._selection).length) return;
    const n = (d) => {
      const p = this._idsOfKind(d);
      for (const m of p) Mt(i, { kind: d, id: m }) && p.delete(m);
      return p;
    }, o = n("wall"), s = n("opening"), r = n("item"), a = n("text"), l = n("furniture"), c = n("tracker"), h = n("area");
    this._commitFloor({
      walls: i.walls.map(
        (d) => o.has(d.id) ? { ...d, x1: d.x1 + e, y1: d.y1 + t, x2: d.x2 + e, y2: d.y2 + t } : d
      ),
      openings: i.openings.map((d) => s.has(d.id) ? { ...d, x: d.x + e, y: d.y + t } : d),
      items: i.items.map((d) => r.has(d.id) ? { ...d, x: d.x + e, y: d.y + t } : d),
      texts: i.texts.map((d) => a.has(d.id) ? { ...d, x: d.x + e, y: d.y + t } : d),
      furniture: i.furniture.map(
        (d) => l.has(d.id) ? { ...d, x: d.x + e, y: d.y + t } : d
      ),
      trackers: (i.trackers ?? []).map(
        (d) => c.has(d.id) ? { ...d, x: d.x + e, y: d.y + t } : d
      ),
      areas: (i.areas ?? []).map(
        (d) => h.has(d.id) ? { ...d, points: d.points.map((p) => ({ x: p.x + e, y: p.y + t })) } : d
      )
    });
  }
  // ---- canvas (SVG) pointer handling: drawing walls/openings -------------
  /**
   * Best-effort pointer capture. `setPointerCapture` throws NotFoundError when
   * the pointer id isn't active (synthetic events, or HA's dialog re-targeting
   * the pointer), which would abort the rest of the calling handler — we hit
   * exactly that with the tracker tool's drag-to-draw. Capture is an
   * enhancement (smooth dragging past the canvas edge), never a requirement,
   * so failures are safe to swallow.
   */
  _capturePointer(e, t = e.target) {
    try {
      t?.setPointerCapture?.(e.pointerId);
    } catch {
    }
  }
  /** Best-effort release; pointerup releases capture implicitly anyway. */
  _releasePointer(e, t = e.target) {
    try {
      t?.releasePointerCapture?.(e.pointerId);
    } catch {
    }
  }
  _renderContextMenu() {
    const e = this._ctx;
    if (!e) return f;
    const t = this._selection.length > 0, i = this._floor(), n = t && this._selection.every((s) => Mt(i, s)), o = (s, r, a, l = !1) => u`<button
      class=${l ? "danger" : ""}
      @click=${() => {
      this._ctx = null, a();
    }}
    ><ha-icon icon=${s}></ha-icon>${r}</button>`;
    return u`<div class="fp-ctx" style="left:${e.x}px;top:${e.y}px" @pointerdown=${(s) => s.stopPropagation()}>
      ${t ? u`${o("mdi:content-duplicate", "Duplizieren", () => this._duplicate())}
            ${o("mdi:content-copy", "Kopieren", () => this._copy())}
            ${o("mdi:content-save-outline", "Als Vorlage speichern", () => this._saveTemplate())}
            ${o(n ? "mdi:lock-open-variant-outline" : "mdi:lock", n ? "Entsperren" : "Fixieren", () => this._setLocked(!n))}` : f}
      ${this._clipboard ? o("mdi:content-paste", "Einfügen", () => this._paste()) : f}
      ${t ? o("mdi:delete-outline", "Löschen", () => this._deleteSelected(), !0) : f}
      ${!t && !this._clipboard ? u`<span class="fp-ctx-empty">Nichts ausgewählt</span>` : f}
    </div>`;
  }
  _onCanvasDown(e) {
    if (this._ctx = null, e.button !== 0 || this._gesturePointer !== null) return;
    this._canvasWrap?.focus({ preventScroll: !0 });
    const t = this._toVirtual(e, !1);
    if (this._tool === "wall") {
      const i = this._freeWalls ? { x: this._snap(t.x), y: this._snap(t.y) } : this._snapWallPoint(t.x, t.y);
      this._draft = { x1: i.x, y1: i.y, x2: i.x, y2: i.y }, this._gesturePointer = e.pointerId, this._capturePointer(e);
      return;
    }
    if (this._tool === "door" || this._tool === "window") {
      this._addOpening(this._tool, this._snap(t.x), this._snap(t.y));
      return;
    }
    if (this._tool === "tracker") {
      const i = this._snap(t.x), n = this._snap(t.y);
      this._draftTracker = { x0: i, y0: n, x1: i, y1: n }, this._gesturePointer = e.pointerId, this._capturePointer(e);
      return;
    }
    if (this._tool === "area" && this._areaShape === "rect") {
      const i = this._snap(t.x), n = this._snap(t.y);
      this._draftTracker = { x0: i, y0: n, x1: i, y1: n }, this._gesturePointer = e.pointerId, this._capturePointer(e);
      return;
    }
    if (this._tool === "area") {
      const i = this._snapAreaPoint(t.x, t.y);
      if (!this._draftArea) {
        this._draftArea = { points: [i] };
        return;
      }
      const n = this._draftArea.points, o = n[0];
      if (n.length >= 3 && Math.hypot(i.x - o.x, i.y - o.y) <= dt) {
        this._finishArea();
        return;
      }
      const s = n[n.length - 1];
      (i.x !== s.x || i.y !== s.y) && (this._draftArea = { points: [...n, i] });
      return;
    }
    this._pickAnchor = null, this._marqueeAdd = e.shiftKey || e.ctrlKey || e.metaKey, this._marquee = { x0: t.x, y0: t.y, x1: t.x, y1: t.y }, this._gesturePointer = e.pointerId, this._capturePointer(e);
  }
  /**
   * Abort any in-progress gesture. A moved drag is rolled back to the exact
   * pre-drag config (restoring wall-snap angle changes too) and its own
   * history snapshot — matched by identity, in case something else pushed in
   * between — is dropped, so a canceled drag leaves no trace in undo.
   */
  _cancelGesture() {
    this._guides = [], this._dragMoves.cancel(), this._dragDirty = !1, this._gesturePointer = null, this._draft = null, this._draftTracker = null, this._draftArea = null, this._areaHover = null, this._marquee = null;
    const e = this._drag;
    this._drag = null, e?.moved && e.snapshot && (this._history = this._history.filter((t) => t !== e.snapshot), e.emitted ? this._emit(e.snapshot) : (this._config = e.snapshot, this._watchedEntities = Ct(e.snapshot)), this._future = e.priorFuture ?? []);
  }
  _onPointerCancel(e) {
    this._gesturePointer !== null && e.pointerId !== this._gesturePointer || this._cancelGesture();
  }
  /** True when this event belongs to a pointer other than the gesture's. */
  _foreignPointer(e) {
    return this._gesturePointer !== null && e.pointerId !== this._gesturePointer;
  }
  _onCanvasMove(e) {
    if (!this._foreignPointer(e)) {
      if (e.buttons === 0 && (this._drag || this._draft || this._draftTracker || this._marquee)) {
        this._cancelGesture();
        return;
      }
      if (this._tool === "wall" && this._draft) {
        const t = this._toVirtual(e, !1), i = this._snapWallEnd(this._draft.x1, this._draft.y1, t.x, t.y);
        this._draft = { ...this._draft, x2: i.x, y2: i.y };
        return;
      }
      if ((this._tool === "tracker" || this._tool === "area") && this._draftTracker) {
        const t = this._toVirtual(e, !1);
        this._draftTracker = {
          ...this._draftTracker,
          x1: this._snap(t.x),
          y1: this._snap(t.y)
        };
        return;
      }
      if (this._tool === "area" && this._draftArea) {
        const t = this._toVirtual(e, !1);
        this._areaHover = this._snapAreaPoint(t.x, t.y);
        return;
      }
      if (this._marquee) {
        const t = this._toVirtual(e, !1);
        this._marquee = { ...this._marquee, x1: t.x, y1: t.y };
        return;
      }
      this._drag && this._dragMoves.push({ ...this._toVirtual(e, !1), altKey: e.altKey });
    }
  }
  _onCanvasUp(e) {
    if (!this._foreignPointer(e)) {
      if (this._guides.length && (this._guides = []), this._dragMoves.settle(), this._gesturePointer = null, this._tool === "wall" && this._draft) {
        const t = this._draft;
        if (this._draft = null, t.x1 !== t.x2 || t.y1 !== t.y2) {
          const i = { id: X("wall"), ...t };
          this._commitFloor({ walls: [...this._floor().walls, i] }), this._selection = [{ kind: "wall", id: i.id }];
        }
        return;
      }
      if ((this._tool === "tracker" || this._tool === "area") && this._draftTracker) {
        const t = this._draftTracker;
        this._draftTracker = null, this._releasePointer(e);
        const i = Math.min(t.x0, t.x1), n = Math.min(t.y0, t.y1), o = Math.abs(t.x1 - t.x0), s = Math.abs(t.y1 - t.y0);
        o >= this.grid / 2 && s >= this.grid / 2 && (this._tool === "area" ? this._addRectArea(i, n, o, s) : this._addTracker(i, n, o, s));
        return;
      }
      if (this._marquee) {
        const t = this._marquee;
        if (this._marquee = null, this._releasePointer(e), !(Math.hypot(t.x1 - t.x0, t.y1 - t.y0) > 4)) {
          this._marqueeAdd || this._clearSel();
          return;
        }
        const n = this._elementsInRect(t);
        this._selection = this._marqueeAdd ? this._mergeSel(this._selection, n) : n, this._liveEditKey = null;
        return;
      }
      this._drag && (this._drag = null, this._releasePointer(e), this._flushDrag());
    }
  }
  /** All active-floor elements whose center lies inside the marquee rect. */
  _elementsInRect(e) {
    return _g(this._floor(), e);
  }
  // ---- dragging existing elements ----------------------------------------
  /**
   * Which element a plain click should actually select (issue #52). The
   * element whose hit area received the event is only a starting point: a big
   * tracker zone or an Area polygon can sit over a device, so we hit-test the
   * point geometrically and take the most *specific* candidate. Clicking again
   * without moving steps to the next candidate underneath and wraps, which is
   * what makes buried elements reachable at all.
   *
   * Modifier-clicks (multi-select) and explicit handles keep their old
   * behavior — they address one element on purpose.
   */
  _resolvePick(e, t) {
    if (e.shiftKey || e.ctrlKey || e.metaKey) return t;
    const i = this._toVirtual(e, !1), n = $g(this._floor(), i.x, i.y, {
      itemSize: Ke,
      textSize: zt,
      wallThickness: V,
      hass: this.hass
    }), o = !!this._pickAnchor && Math.hypot(e.clientX - this._pickAnchor.clientX, e.clientY - this._pickAnchor.clientY) <= hy;
    return this._pickAnchor = { clientX: e.clientX, clientY: e.clientY }, Sg(n, this._selection, o) ?? t;
  }
  _startDrag(e, t, i, n) {
    if (this._tool !== "select") return;
    if (e.stopPropagation(), this._ctx = null, e.button === 2) {
      this._isSel(t.kind, t.id) || this._selectOne(t);
      return;
    }
    if (this._gesturePointer !== null) return;
    this._canvasWrap?.focus({ preventScroll: !0 });
    const o = i != null || n != null, s = o ? t : this._resolvePick(e, t);
    o ? this._selectOne(s) : this._selectForPointer(e, s), !Mt(this._floor(), s) && (this._drag = {
      primary: s,
      start: this._toVirtual(e, !1),
      orig: this._snapshotSelection(),
      endpoint: i,
      areaVertex: n
    }, s.kind === "wall" && (this._drag.attached = this._attachedCorners(s.id, i)), this._gesturePointer = e.pointerId, this._capturePointer(e));
  }
  /** See {@link attachedCorners}: shared room corners that stretch with this wall. */
  _attachedCorners(e, t) {
    return mg(this._floor().walls, e, t);
  }
  /** Capture the start positions of every selected element on the active floor. */
  _snapshotSelection() {
    const e = this._floor(), t = /* @__PURE__ */ new Map();
    for (const i of this._selection)
      if (!Mt(e, i))
        if (i.kind === "wall") {
          const n = e.walls.find((o) => o.id === i.id);
          n && t.set(`wall:${n.id}`, { kind: "wall", x1: n.x1, y1: n.y1, x2: n.x2, y2: n.y2 });
        } else if (i.kind === "opening") {
          const n = e.openings.find((o) => o.id === i.id);
          n && t.set(`opening:${n.id}`, { kind: "pt", x: n.x, y: n.y });
        } else if (i.kind === "item") {
          const n = e.items.find((o) => o.id === i.id);
          n && t.set(`item:${n.id}`, { kind: "pt", x: n.x, y: n.y });
        } else if (i.kind === "text") {
          const n = e.texts.find((o) => o.id === i.id);
          n && t.set(`text:${n.id}`, { kind: "pt", x: n.x, y: n.y });
        } else if (i.kind === "furniture") {
          const n = e.furniture.find((o) => o.id === i.id);
          n && t.set(`furniture:${n.id}`, { kind: "pt", x: n.x, y: n.y });
        } else if (i.kind === "area") {
          const n = (e.areas ?? []).find((o) => o.id === i.id);
          n && t.set(`area:${n.id}`, { kind: "polygon", points: n.points.map((o) => ({ ...o })) });
        } else {
          const n = (e.trackers ?? []).find((o) => o.id === i.id);
          n && t.set(`tracker:${n.id}`, { kind: "pt", x: n.x, y: n.y });
        }
    return t;
  }
  _applyDrag(e) {
    const t = this._drag;
    if (!t.moved) {
      if (Math.hypot(e.x - t.start.x, e.y - t.start.y) <= 4) return;
      t.moved = !0, t.priorFuture = this._future, this._pushHistory(), t.snapshot = this._history[this._history.length - 1];
    }
    const i = this._floor();
    if (t.endpoint) {
      const c = e.altKey ? [] : t.attached ?? [], h = /* @__PURE__ */ new Set([
        `${t.primary.id}:${t.endpoint}`,
        ...c.map((m) => `${m.id}:${m.end}`)
      ]), d = this._snapWallPointExcluding(e.x, e.y, h), p = i.walls.map((m) => {
        let g = m;
        m.id === t.primary.id && (g = t.endpoint === 1 ? { ...g, x1: d.x, y1: d.y } : { ...g, x2: d.x, y2: d.y });
        for (const b of c)
          b.id === m.id && (g = b.end === 1 ? { ...g, x1: d.x, y1: d.y } : { ...g, x2: d.x, y2: d.y });
        return g;
      });
      this._emitFloor({ walls: p });
      return;
    }
    if (t.primary.kind === "area" && t.areaVertex != null) {
      const c = t.areaVertex, h = this._snapAreaPoint(e.x, e.y, { areaId: t.primary.id, vertexIndex: c }), d = (i.areas ?? []).map(
        (p) => p.id === t.primary.id ? { ...p, points: p.points.map((m, g) => g === c ? h : m) } : p
      );
      this._emitFloor({ areas: d });
      return;
    }
    if (this._selection.length === 1 && t.primary.kind === "opening") {
      const c = t.orig.get(`opening:${t.primary.id}`);
      if (c && c.kind === "pt") {
        const h = c.x + (e.x - t.start.x), d = c.y + (e.y - t.start.y), p = Hs(h, d, i.walls, Ys), m = i.openings.map(
          (g) => g.id === t.primary.id ? p ? { ...g, x: p.x, y: p.y, angle: p.angle } : { ...g, x: this._snap(h), y: this._snap(d) } : g
        );
        this._emitFloor({ openings: m });
        return;
      }
    }
    const n = t.orig.get(`${t.primary.kind}:${t.primary.id}`);
    if (!n) return;
    const o = n.kind === "wall" ? n.x1 : n.kind === "polygon" ? n.points[0].x : n.x, s = n.kind === "wall" ? n.y1 : n.kind === "polygon" ? n.points[0].y : n.y, r = this._snap(o + (e.x - t.start.x)) - o, a = this._snap(s + (e.y - t.start.y)) - s;
    let l = this._applyDelta(r, a, t.orig);
    if (t.attached?.length && !e.altKey) {
      const c = (l.walls ?? i.walls).map((h) => {
        let d = h;
        for (const p of t.attached)
          p.id !== h.id || t.orig.has(`wall:${p.id}`) || (d = p.end === 1 ? { ...d, x1: p.x0 + r, y1: p.y0 + a } : { ...d, x2: p.x0 + r, y2: p.y0 + a });
        return d;
      });
      l = { ...l, walls: c };
    }
    this._emitFloor(l);
  }
  /** Translate every snapshotted element by (dx, dy). */
  _applyDelta(e, t, i) {
    return vg(this._floor(), e, t, i);
  }
  // ---- overlay drag for items & texts (HTML, not SVG) --------------------
  _onOverlayDown(e, t) {
    if (this._tool !== "select" || (e.stopPropagation(), e.preventDefault(), this._gesturePointer !== null)) return;
    this._canvasWrap?.focus({ preventScroll: !0 });
    const i = this._resolvePick(e, t);
    this._selectForPointer(e, i), this._drag = {
      primary: i,
      start: this._toVirtual(e, !1),
      orig: this._snapshotSelection()
    }, this._gesturePointer = e.pointerId, this._capturePointer(e, e.currentTarget);
  }
  _onOverlayMove(e) {
    if (!this._foreignPointer(e)) {
      if (e.buttons === 0 && this._drag) {
        this._cancelGesture();
        return;
      }
      this._drag && this._dragMoves.push({ ...this._toVirtual(e, !1), altKey: e.altKey });
    }
  }
  _onOverlayUp(e) {
    this._foreignPointer(e) || (this._dragMoves.settle(), this._gesturePointer = null, this._drag && (this._drag = null, this._releasePointer(e, e.currentTarget), this._flushDrag()));
  }
  // ---- element creation / mutation ---------------------------------------
  _addOpening(e, t, i) {
    const n = this._floor(), o = Hs(t, i, n.walls, Ys), s = {
      id: X(e),
      type: e,
      x: o?.x ?? t,
      y: o?.y ?? i,
      // User-editable from the door/window context bar so opening size can be
      // set BEFORE placing (the previous hardcoded 60 forced place-then-resize).
      length: this._defaultOpeningLength,
      angle: o?.angle ?? 0
    };
    this._commitFloor({ openings: [...n.openings, s] }), this._selection = [{ kind: "opening", id: s.id }], this._tool = "select";
  }
  _addItem(e) {
    const t = {
      id: X("item"),
      entity: "",
      x: this._snap(this._config.width / 2),
      y: this._snap(this._config.height / 2),
      kind: e,
      showState: e === "sensor",
      showIcon: !0,
      size: Ke
    };
    this._commitFloor({ items: [...this._floor().items, t] }), this._selection = [{ kind: "item", id: t.id }], this._tool = "select";
  }
  _addFurniture(e) {
    const t = rf(e, this._symbols()), i = {
      id: X("furn"),
      type: e,
      x: this._snap(this._config.width / 2),
      y: this._snap(this._config.height / 2),
      w: t.w,
      h: t.h,
      angle: 0
    };
    this._commitFloor({ furniture: [...this._floor().furniture, i] }), this._selection = [{ kind: "furniture", id: i.id }], this._tool = "select";
  }
  /**
   * Drop a new Tracker on the active floor sized to the user's drag and
   * select it so the per-element editor (entity pickers + sensor ranges) is
   * immediately reachable. Tool switches back to Select so the user can
   * configure / move the new tracker without re-dragging.
   */
  _addTracker(e, t, i, n) {
    const o = {
      id: X("tracker"),
      x: e,
      y: t,
      w: i,
      h: n,
      angle: 0,
      dotSize: no
    };
    this._commitFloor({ trackers: [...this._floor().trackers ?? [], o] }), this._selection = [{ kind: "tracker", id: o.id }], this._tool = "select";
  }
  /** floorplan-panel: a rectangular room from a dragged box. */
  _addRectArea(e, t, i, n) {
    const o = {
      id: X("area"),
      points: [
        { x: e, y: t },
        { x: e + i, y: t },
        { x: e + i, y: t + n },
        { x: e, y: t + n }
      ],
      showName: !0
    };
    this._commitFloor({ areas: [...this._floor().areas ?? [], o] }), this._selection = [{ kind: "area", id: o.id }], this._tool = "select";
  }
  /** Close the in-progress Area draft into a committed polygon and select it. */
  _finishArea() {
    if (!this._draftArea || this._draftArea.points.length < 3) return;
    const e = { id: X("area"), points: this._draftArea.points, showName: !0 };
    this._commitFloor({ areas: [...this._floor().areas ?? [], e] }), this._selection = [{ kind: "area", id: e.id }], this._draftArea = null, this._areaHover = null, this._tool = "select";
  }
  _addText() {
    const e = {
      id: X("text"),
      x: this._snap(this._config.width / 2),
      y: this._snap(this._config.height / 2),
      text: "Label",
      size: zt
    };
    this._commitFloor({ texts: [...this._floor().texts, e] }), this._selection = [{ kind: "text", id: e.id }], this._tool = "select";
  }
  _deleteSelected() {
    if (!this._selection.length) return;
    const e = this._floor(), t = this._idsOfKind("wall"), i = this._idsOfKind("opening"), n = this._idsOfKind("item"), o = this._idsOfKind("text"), s = this._idsOfKind("furniture"), r = this._idsOfKind("tracker"), a = this._idsOfKind("area");
    this._commitFloor({
      walls: e.walls.filter((l) => !t.has(l.id)),
      openings: e.openings.filter((l) => !i.has(l.id)),
      items: e.items.filter((l) => !n.has(l.id)),
      texts: e.texts.filter((l) => !o.has(l.id)),
      furniture: e.furniture.filter((l) => !s.has(l.id)),
      trackers: (e.trackers ?? []).filter((l) => !r.has(l.id)),
      areas: (e.areas ?? []).filter((l) => !a.has(l.id))
    }), this._clearSel();
  }
  // ---- clipboard (copy / paste / duplicate) ------------------------------
  _copy() {
    if (!this._selection.length) return;
    const e = this._floor(), t = this._idsOfKind("wall"), i = this._idsOfKind("opening"), n = this._idsOfKind("item"), o = this._idsOfKind("text"), s = this._idsOfKind("furniture"), r = this._idsOfKind("tracker"), a = this._idsOfKind("area");
    this._clipboard = structuredClone({
      walls: e.walls.filter((l) => t.has(l.id)),
      openings: e.openings.filter((l) => i.has(l.id)),
      items: e.items.filter((l) => n.has(l.id)),
      texts: e.texts.filter((l) => o.has(l.id)),
      furniture: e.furniture.filter((l) => s.has(l.id)),
      trackers: (e.trackers ?? []).filter((l) => r.has(l.id)),
      areas: (e.areas ?? []).filter((l) => a.has(l.id))
    });
  }
  /** Paste the clipboard onto the active floor, offset by one snap step, with fresh ids. */
  _paste() {
    if (!this._clipboard) return;
    const e = structuredClone(this._clipboard), t = this._resolvedSnap || this.grid, i = this._floor(), n = { locked: void 0 }, o = e.walls.map((d) => ({
      ...d,
      ...n,
      id: X("wall"),
      x1: d.x1 + t,
      y1: d.y1 + t,
      x2: d.x2 + t,
      y2: d.y2 + t
    })), s = e.openings.map((d) => ({
      ...d,
      ...n,
      id: X(d.type),
      x: d.x + t,
      y: d.y + t
    })), r = e.items.map((d) => ({
      ...d,
      ...n,
      id: X("item"),
      x: d.x + t,
      y: d.y + t
    })), a = e.texts.map((d) => ({
      ...d,
      ...n,
      id: X("text"),
      x: d.x + t,
      y: d.y + t
    })), l = e.furniture.map((d) => ({
      ...d,
      ...n,
      id: X("furn"),
      x: d.x + t,
      y: d.y + t
    })), c = (e.trackers ?? []).map((d) => ({
      ...d,
      ...n,
      id: X("tracker"),
      x: d.x + t,
      y: d.y + t
    })), h = (e.areas ?? []).map((d) => ({
      ...d,
      ...n,
      id: X("area"),
      points: d.points.map((p) => ({ x: p.x + t, y: p.y + t }))
    }));
    this._commitFloor({
      walls: [...i.walls, ...o],
      openings: [...i.openings, ...s],
      items: [...i.items, ...r],
      texts: [...i.texts, ...a],
      furniture: [...i.furniture, ...l],
      trackers: [...i.trackers ?? [], ...c],
      areas: [...i.areas ?? [], ...h]
    }), this._selection = [
      ...o.map((d) => ({ kind: "wall", id: d.id })),
      ...s.map((d) => ({ kind: "opening", id: d.id })),
      ...r.map((d) => ({ kind: "item", id: d.id })),
      ...a.map((d) => ({ kind: "text", id: d.id })),
      ...l.map((d) => ({ kind: "furniture", id: d.id })),
      ...c.map((d) => ({ kind: "tracker", id: d.id })),
      ...h.map((d) => ({ kind: "area", id: d.id }))
    ], this._tool = "select";
  }
  // floorplan-panel: Vorlagen (saved selections, stored in config.templates)
  _saveTemplate() {
    this._copy();
    const e = this._clipboard;
    if (!e) return;
    const t = this._config.templates ?? [];
    if (t.length >= 30) {
      alert("Es sind höchstens 30 Vorlagen möglich.");
      return;
    }
    const i = prompt("Name der Vorlage", "Vorlage " + (t.length + 1))?.trim();
    i && this._commit({
      ...this._config,
      templates: [...t, { id: X("tpl"), name: i, data: structuredClone(e) }]
    });
  }
  _insertTemplate(e) {
    const t = this._config.templates?.find((n) => n.id === e);
    if (!t) return;
    const i = this._clipboard;
    this._clipboard = structuredClone(t.data), this._paste(), this._clipboard = i;
  }
  _deleteTemplate(e) {
    const t = (this._config.templates ?? []).filter((n) => n.id !== e), i = { ...this._config, templates: t.length ? t : void 0 };
    t.length || delete i.templates, this._commit(i);
  }
  _renderTemplates() {
    const e = this._config.templates ?? [];
    return u`<div class="fp-templates">
      <h3 class="section-title">Vorlagen</h3>
      ${e.length ? e.map(
      (t) => u`<div class="fp-tpl">
              <button title="Auf dieser Etage einfügen" @click=${() => this._insertTemplate(t.id)}>
                <ha-icon icon="mdi:shape-plus-outline"></ha-icon> ${t.name}
              </button>
              <button class="danger" aria-label="Delete template" @click=${() => this._deleteTemplate(t.id)}>
                <ha-icon icon="mdi:delete-outline"></ha-icon>
              </button>
            </div>`
    ) : u`<p class="hint">Mehrere Elemente auswählen und mit dem Vorlagen-Knopf speichern, um sie später wieder einzufügen.</p>`}
    </div>`;
  }
  _duplicate() {
    this._copy(), this._paste();
  }
  /**
   * Pin (or release) every selected element (issue #191). One history entry
   * for the whole selection, since it is one press.
   *
   * `undefined` rather than `false` when releasing: unlocked is the default,
   * so a released element goes back to saying nothing about it rather than
   * leaving `locked: false` behind in the YAML.
   */
  _setLocked(e) {
    if (!this._selection.length) return;
    const t = this._floor(), i = e || void 0, n = (o, s) => {
      const r = this._idsOfKind(s);
      return o.map((a) => r.has(a.id) ? { ...a, locked: i } : a);
    };
    this._commitFloor({
      walls: n(t.walls, "wall"),
      openings: n(t.openings, "opening"),
      items: n(t.items, "item"),
      texts: n(t.texts, "text"),
      furniture: n(t.furniture, "furniture"),
      trackers: n(t.trackers ?? [], "tracker"),
      areas: n(t.areas ?? [], "area")
    });
  }
  // ---- floors -------------------------------------------------------------
  /** Add a floor that reuses the current floor's walls (fresh ids) and nothing else. */
  _addFloor() {
    const e = this._floor().walls.map((o) => ({ ...o, id: X("wall") })), t = (this._config.floors?.length ?? 1) + 1, i = rd(`Floor ${t}`, e), n = [...this._config.floors ?? [], i];
    this._activeFloorId = i.id, this._clearSel(), this._commit({ ...this._config, floors: n });
  }
  _switchFloor(e) {
    e !== this._activeFloorId && (this._activeFloorId = e, this._clearSel());
  }
  /**
   * Move the active floor one step up/down the list (issue #66) — the safe
   * alternative to reordering floor blocks by hand in YAML. Commits through
   * history, so a mis-move is one Ctrl+Z away.
   */
  _moveFloor(e) {
    const t = cd(this._config.floors ?? [], this._activeFloorId, e);
    t && this._commit({ ...this._config, floors: t });
  }
  _renameFloor(e, t) {
    this._commit({
      ...this._config,
      floors: (this._config.floors ?? []).map((i) => i.id === e ? { ...i, name: t } : i)
    });
  }
  /**
   * Link the active floor to a Home Assistant floor (issue #24). Linking also
   * names the floor after the HA floor — the point of the association — while
   * a later manual rename sticks (we never re-sync silently). Unlinking keeps
   * the current name.
   */
  _linkHaFloor(e) {
    const t = xs(this.hass).find((i) => i.floor_id === e);
    this._commit({
      ...this._config,
      floors: (this._config.floors ?? []).map(
        (i) => i.id === this._activeFloorId ? { ...i, haFloor: t?.floor_id, ...t ? { name: t.name } : {} } : i
      )
    });
  }
  /** HA-floor link row for the floor gear popover; hidden when HA exposes no floors. */
  _renderHaFloorRow(e) {
    const t = xs(this.hass);
    return t.length ? u`
      <div class="pop-row">
        <label>HA floor</label>
        <select
          .value=${e?.haFloor ?? ""}
          @change=${(i) => this._linkHaFloor(i.target.value)}
        >
          <option value="" ?selected=${!e?.haFloor}>(not linked)</option>
          ${t.map(
      (i) => u`<option value=${i.floor_id} ?selected=${e?.haFloor === i.floor_id}>
                ${i.name}
              </option>`
    )}
        </select>
      </div>
    ` : u`${f}`;
  }
  _deleteFloor() {
    const e = this._config.floors ?? [];
    if (e.length <= 1) return;
    const t = e.findIndex((n) => n.id === this._activeFloorId), i = e.filter((n) => n.id !== this._activeFloorId);
    this._commit({ ...this._config, floors: i }), this._activeFloorId = i[Math.max(0, t - 1)].id, this._clearSel();
  }
  _updateWall(e, t) {
    this._commitFloor({
      walls: this._floor().walls.map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _updateOpening(e, t) {
    this._commitFloor({
      openings: this._floor().openings.map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _updateItem(e, t) {
    this._commitFloor({
      items: this._floor().items.map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _updateText(e, t) {
    this._commitFloor({
      texts: this._floor().texts.map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _updateFurniture(e, t) {
    this._commitFloor({
      furniture: this._floor().furniture.map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _updateTracker(e, t) {
    this._commitFloor({
      trackers: (this._floor().trackers ?? []).map(
        (i) => i.id === e ? { ...i, ...t } : i
      )
    });
  }
  _updateArea(e, t) {
    this._commitFloor({
      areas: (this._floor().areas ?? []).map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  /** Drop the HA-area link but keep the name the user sees on the plan. */
  _unlinkHaArea(e) {
    this._updateArea(e, { haArea: void 0 });
  }
  /**
   * Status line under the Area's name field. The name doubles as the HA-area
   * link (see {@link areaNamePatch}), so the resulting association would
   * otherwise be invisible: this shows a "Linked" chip whenever `haArea` is
   * set, with an unlink button for the one intent the merged field can't
   * express — keeping the name while dropping the link.
   */
  _renderAreaLinkRow(e, t) {
    const i = e.haArea ? t.find((n) => n.area_id === e.haArea) : void 0;
    return u`
      <div class="row wide area-name-status">
        <label></label>
        ${e.haArea ? u`<span
              class="ha-link-chip"
              title=${`Linked to the Home Assistant area "${i?.name ?? e.haArea}"`}
            >
              <ha-icon icon="mdi:link-variant"></ha-icon>Linked
              <button
                class="unlink"
                title="Keep this name but unlink the Home Assistant area"
                @click=${() => this._unlinkHaArea(e.id)}
              >
                <ha-icon icon="mdi:close"></ha-icon>
              </button>
            </span>` : u`<span class="hint"
              >${t.length ? "Name this room after a Home Assistant area to link it." : "No Home Assistant areas available."}</span
            >`}
      </div>
    `;
  }
  /**
   * The editor's colour control: a swatch that edits live as you drag, plus a
   * text box for theme variables and named colours, committed on change.
   * Emptying the text box clears the override.
   *
   * Every colour in this editor is one of these. It lived as eight copies of
   * the same markup before the colour rules below needed a ninth.
   */
  /**
   * The plan's named colours (issue #265), usable and deduped.
   */
  _palette() {
    return Kt(this._config?.palette);
  }
  /**
   * The dropdown that puts a named colour into a colour field, or `nothing`
   * when the plan has no palette.
   *
   * Rendering nothing is the point of the empty case: a plan that never names a
   * colour should see the editor it saw before this feature existed, not a
   * dropdown with one greyed-out entry in it. The control appears the moment
   * the first name is added under Project and disappears with the last.
   *
   * Choosing a name stores a `var()` reference rather than the colour itself,
   * which is what makes the link live — see `src/palette.ts`. Choosing "Custom"
   * writes back the colour the name currently resolves to, so leaving the
   * palette breaks the link without changing what is on screen.
   */
  _renderPalettePicker(e, t) {
    const i = this._palette();
    if (!i.length) return f;
    const n = Wa(e), o = n && i.some((s) => ne(s.name) === n) ? n : void 0;
    return u`
      <select
        class="palette-pick"
        title="Use one of the plan's named colours"
        .value=${o ?? ""}
        @change=${(s) => {
      const r = s.target.value;
      if (!r) {
        o && t(ci(e, i));
        return;
      }
      const a = i.find((l) => ne(l.name) === r);
      a && t(Us(a.name));
    }}
      >
        <option value="" ?selected=${!o}>Custom…</option>
        ${i.map(
      (s) => u`<option
            value=${ne(s.name)}
            ?selected=${ne(s.name) === o}
          >
            ${s.name}
          </option>`
    )}
      </select>
    `;
  }
  /**
   * What an `<input type="color">` should show for a stored value: the literal
   * colour a palette reference names, since the swatch cannot resolve a var()
   * and would sit on black instead.
   */
  _swatchValue(e, t) {
    const i = ci(e, this._config?.palette);
    return typeof i == "string" && i ? i : t;
  }
  _renderColorRow(e) {
    return u`
      <div class="row">
        <label title=${e.title ?? f}>${e.label}</label>
        <input
          type="color"
          title=${e.title ?? f}
          .value=${this._swatchValue(e.value, e.swatch)}
          @input=${(t) => e.onLive(t.target.value)}
        />
        <input
          type="text"
          placeholder=${e.placeholder}
          .value=${e.value ?? ""}
          @change=${(t) => e.onCommit(t.target.value || void 0)}
        />
        ${this._renderPalettePicker(e.value, e.onCommit)}
      </div>
    `;
  }
  /**
   * An entity's `supported_features` bitmask, or 0 when it isn't in `hass`.
   * Handed to {@link openingForm} so its Tap field can name the default the
   * live card would take — which for a `cover` depends on whether it can
   * actually open and close.
   */
  _supportedFeatures(e) {
    return this.hass?.states[e]?.attributes?.supported_features ?? 0;
  }
  /**
   * The glyph a device shows when no state rule names one — what a rule's
   * empty icon box falls back to. Resolved exactly as the card resolves it,
   * with the rules removed so a currently-matching rule cannot report itself
   * as the default.
   */
  _itemDefaultIcon(e) {
    const t = e.entity ? this.hass?.states[e.entity] : void 0;
    return zn(
      { ...e, stateColor: void 0 },
      t,
      e.entity ? this.hass?.entities?.[e.entity]?.icon : void 0
    );
  }
  /**
   * The device's icon, rendered here rather than up in the form (issue #127):
   * it is the same setting the state rules below override, so it belongs
   * beside them — like "Active color" beside the colours those rules replace.
   *
   * Unlike the colour it stays on screen once rules exist, because rules do
   * *not* replace it: a rule with no icon of its own falls through to this
   * one, which is what lets someone colour by state without naming the same
   * glyph in every row. Hiding it would strand a setting that is still
   * drawing.
   */
  _renderItemIconRow(e) {
    const t = "Icon for this device; a state rule below can swap it";
    return u`
      <div class="row wide">
        <label title=${t}>Icon</label>
        ${this._renderIconPicker(e.icon ?? "", (i) => this._updateItem(e.id, { icon: i || void 0 }), {
      // The entity's own glyph, so leaving the box empty is visibly a
      // choice rather than a blank.
      placeholder: this._itemDefaultIcon(e),
      title: t
    })}
      </div>
      ${e.stateColor?.length ? u`<p class="hint rule-note">Shown while no rule below names an icon of its own.</p>` : f}
    `;
  }
  /**
   * One titled group of the element panel, with a rule above it.
   *
   * The device panel had grown to two dozen controls in one flat run, in the
   * order they had been added rather than any order you would look for them
   * in. Grouping them costs a heading and a hairline each; what it buys is
   * that "where do I set the label position" has an answer you can guess.
   *
   * The heading is a disclosure button and the group starts collapsed (issue
   * #205): headings you can skim beat controls you have to scroll past, and
   * the panel now opens as a table of contents for the element. See
   * `_openGroups` for why the open set is keyed by title.
   *
   * Collapsed means *not rendered*, not hidden — so a closed group's `ha-form`
   * costs nothing, and reopening it rebuilds from `data` the same way a
   * selection change does.
   *
   * Takes the content rather than a field list because a group is rarely all
   * `ha-form` — the readings list, the icon row and the colour pickers are
   * hand-rolled, and they belong *inside* the group whose subject they share.
   */
  _renderGroup(e, ...t) {
    const i = this._openGroups.has(e);
    return u`
      <div class="cfg-group ${i ? "open" : ""}">
        <button
          class="cfg-group-title"
          type="button"
          aria-expanded=${i}
          @click=${() => this._toggleGroup(e)}
        >
          <ha-icon icon=${i ? "mdi:chevron-down" : "mdi:chevron-right"}></ha-icon>
          <span>${e}</span>
        </button>
        ${i ? t : f}
      </div>
    `;
  }
  /** Open a collapsed config group, or collapse an open one. */
  _toggleGroup(e) {
    const t = new Set(this._openGroups);
    t.delete(e) || t.add(e), this._openGroups = t;
  }
  /**
   * A device's other entities (issue #180): every reading beyond its own
   * state, added one at a time with "+ Add entity" rather than by putting four
   * entity dropdowns on every device that will never use them.
   *
   * Plain rows rather than `ha-form` fields for the same reason the state
   * rules are: the list is repeatable and `ha-form` has no selector for that.
   *
   * The attribute box is offered on every row, not only once an entity is
   * picked, because a row with an attribute and *no* entity is a real and
   * useful configuration — it reads that attribute off the device's own
   * entity, which is how one climate shows four of its own numbers. It is HA's
   * own attribute picker, so it lists what that entity actually has.
   */
  _renderItemReadings(e) {
    const t = je(e), i = (o) => this._updateItem(e.id, {
      readings: o.length ? o : void 0,
      secondaryEntity: void 0,
      secondaryAttribute: void 0,
      // `badgeEntity: "secondary"` meant index 0, which is where the legacy
      // pair still is — restate it as the index so the old spelling does not
      // outlive the keys it referred to.
      ...e.badgeEntity === "secondary" ? { badgeEntity: 0 } : {}
    }), n = (o, s) => i(t.map((r, a) => a === o ? { ...r, ...s } : r));
    return u`
      <div class="row wide">
        <label title="Further entities and attributes whose readings join this device's label line"
          >Other entities</label
        >
      </div>
      ${t.map(
      (o, s) => u`
          <div class="row wide item-reading">
            ${this._renderEntityPicker(
        o.entity ?? "",
        (r) => n(s, { entity: r || void 0 }),
        void 0,
        // Scoped to the room the device sits in, exactly as its own
        // entity picker is — an extra reading is as likely to come from
        // the same room as the first one.
        this._areaEntitiesAt(e.x, e.y)?.entities
      )}
            ${this._renderAttributePicker(
        o.entity || e.entity,
        o.attribute ?? "",
        (r) => n(s, { attribute: r || void 0 }),
        "Read this attribute instead of the state — with no entity beside it, from this device's own entity"
      )}
            <button
              class="rule-remove"
              aria-label="Remove entity"
              title="Remove this entity"
              @click=${() => i(t.filter((r, a) => a !== s))}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <!-- Under its own entity, because it is about that entity and not
               about the device: an entity can be bound for the badge to read
               and kept out of the label text. -->
          <div class="row wide reading-show">
            <!-- The input is *inside* its label rather than paired to it by
                 id: the only id available here is the element's own, which
                 comes from config and can be anything, so a generated "for"
                 would be invalid or duplicated exactly when someone
                 hand-writes their YAML. Wrapping needs no id, and clicking
                 the words toggles the box either way. -->
            <label>
              <input
                type="checkbox"
                title="Off keeps this entity bound — the badge can still read it — without printing it in the label"
                .checked=${o.showState !== !1}
                @change=${(r) => n(s, {
        // `true` is the default, so it stays out of the YAML.
        showState: r.target.checked ? void 0 : !1
      })}
              />
              Show on label
            </label>
            <span class="hint"
              >${o.showState === !1 ? "Bound but not printed — the badge can still read it." : "Its value joins the label line."}</span
            >
          </div>
        `
    )}
      <div class="row wide state-color-add">
        <button @click=${() => i([...t, {}])}>
          <ha-icon icon="mdi:plus"></ha-icon>Add entity
        </button>
      </div>
      ${t.length ? u`<p class="hint rule-note">
            These show whether or not the device's own "Show state" above is on
            — that toggle is about the device's entity, not about these. Use
            each row's own "Show on label" to keep one bound without printing it.
          </p>` : f}
    `;
  }
  /**
   * The "Color by state" block (issues #68, #79, #82): a list of rules, each
   * one a condition and a colour, plus an "Add rule" button.
   *
   * A rule's condition is either a numeric threshold or an exact state, chosen
   * per row — the two ways an entity's value comes back. A rule with neither is
   * the fallback, and reads as "otherwise" in the UI.
   *
   * These are plain rows rather than `ha-form` fields: the list is repeatable
   * and ha-form has no selector for that (its `object` selector is a raw YAML
   * box). Colours are the one part of this editor that was always hand-rolled,
   * so the block still matches its neighbours.
   */
  _renderStateColorRules(e, t, i) {
    const n = e ?? [], o = (s, r) => {
      const a = n.map((l, c) => c === s ? { ...l, ...r } : l);
      t(a);
    };
    return u`
      <div class="row wide state-colors">
        <label
          title=${i?.icons ? "Color the badge — and optionally swap its icon — by what the entity reads" : "Color the element by what its entity reads"}
          >${i?.icons ? "Color & icon by state" : "Color by state"}</label
        >
      </div>
      ${n.map((s, r) => {
      const a = typeof s.state == "string" ? "state" : typeof s.above == "number" ? "above" : "else";
      return u`
          <div class="row wide state-color-rule">
            <select
              .value=${a}
              title="When this rule applies"
              @change=${(l) => {
        const c = l.target.value;
        o(r, {
          above: c === "above" ? s.above ?? 0 : void 0,
          state: c === "state" ? s.state ?? "" : void 0
        });
      }}
            >
              <option value="above">above</option>
              <option value="state">state is</option>
              <option value="else">otherwise</option>
            </select>
            ${a === "above" ? u`<input
                  type="number"
                  class="cond"
                  .value=${String(s.above ?? 0)}
                  @change=${(l) => o(r, { above: Number(l.target.value) || 0 })}
                />` : a === "state" ? u`<input
                    type="text"
                    class="cond"
                    placeholder="on"
                    .value=${s.state ?? ""}
                    @change=${(l) => o(r, { state: l.target.value })}
                  />` : u`<span class="cond hint">any other value</span>`}
            <input
              type="color"
              .value=${this._swatchValue(s.color, "#ff0000")}
              @input=${(l) => o(r, { color: l.target.value })}
            />
            <input
              type="text"
              class="rule-color-text"
              placeholder="red"
              .value=${s.color ?? ""}
              @change=${(l) => o(r, { color: l.target.value })}
            />
            ${this._renderPalettePicker(s.color, (l) => o(r, { color: l ?? "" }))}
            ${i?.icons ? (
        // Empty means "keep the device's icon", so the device's icon is
        // the placeholder — the rule shows what leaving it blank gives
        // you, and colour-only rules need no icon at all (issue #127).
        this._renderIconPicker(s.icon ?? "", (l) => o(r, { icon: l || void 0 }), {
          placeholder: i.iconPlaceholder,
          title: "Icon while this rule matches — empty keeps the device's own"
        })
      ) : f}
            <button
              class="rule-remove"
              aria-label="Remove rule"
              title="Remove this rule"
              @click=${() => {
        const l = n.filter((c, h) => h !== r);
        t(l.length ? l : void 0);
      }}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
        `;
    })}
      <div class="row wide state-color-add">
        <button
          @click=${() => t([
      ...n,
      // A fresh rule defaults to a threshold: the numeric case is what
      // both #68 and #82 ask for, and it's the one that needs no typing.
      { above: 0, color: "#ff0000" }
    ])}
        >
          <ha-icon icon="mdi:plus"></ha-icon>Add rule
        </button>
      </div>
    `;
  }
  /**
   * Entity ids to scope a picker to for something sitting at (x, y), or
   * undefined for "offer everything".
   *
   * An element inside an Area linked to a Home Assistant area gets its pickers
   * scoped to that area, unless the area's own "Filter entities" toggle turns
   * that off. Recomputed on every render from the live coordinates, so it
   * tracks the element as it's dragged in/out of the polygon, even before the
   * form reopens.
   */
  /**
   * The Area actively scoping the selected element's entity picker, if any —
   * i.e. the element is a device/furniture, it sits inside an Area, and that
   * Area is linked to an HA area with filtering on. The canvas animates this
   * one so it is obvious *which room you are working in* and why the picker
   * is short; nothing else in the editor communicated that.
   */
  _scopingAreaId() {
    if (this._selection.length !== 1) return;
    const e = this._selection[0], t = this._floor(), i = e.kind === "item" ? t.items.find((o) => o.id === e.id) : e.kind === "furniture" ? t.furniture.find((o) => o.id === e.id) : void 0;
    if (!i) return;
    const n = Ks(t, i.x, i.y);
    if (hs(n))
      return dn(this.hass, n.haArea).length ? n.id : void 0;
  }
  _areaEntitiesAt(e, t) {
    const i = Ks(this._floor(), e, t);
    return hs(i) ? { entities: dn(this.hass, i.haArea), name: i.name } : void 0;
  }
  /** Every entity in `area`'s linked HA area not already placed as an item on this floor. */
  _pendingAreaEntities(e) {
    if (!e.haArea) return [];
    const t = new Set(this._floor().items.map((i) => i.entity));
    return dn(this.hass, e.haArea).filter((i) => !t.has(i));
  }
  /**
   * Add a device for every entity registered to `area`'s linked HA area that
   * isn't already placed as an item on this floor, laid out across the
   * polygon's interior (`layoutPointsInPolygon`) so the new icons spread out
   * instead of stacking on top of each other.
   */
  _addAreaEntities(e) {
    const t = this._pendingAreaEntities(e);
    if (!t.length) return;
    const i = yg(e.points, t.length), n = t.map((o, s) => {
      const r = Ls(o);
      return {
        id: X("item"),
        entity: o,
        x: Math.round(i[s].x),
        y: Math.round(i[s].y),
        kind: r,
        showState: r === "sensor",
        showIcon: !0,
        size: Ke
      };
    });
    this._commitFloor({ items: [...this._floor().items, ...n] }), this._selection = n.map((o) => ({ kind: "item", id: o.id }));
  }
  /** Patch a single field on one of a tracker's sensor sub-objects (X / Y axis). */
  _updateTrackerSensor(e, t, i) {
    const n = (this._floor().trackers ?? []).find((s) => s.id === e);
    if (!n) return;
    if (i === null) {
      this._updateTracker(e, { [t]: void 0 });
      return;
    }
    const o = n[t] ?? { entity: "", min: 0, max: 5 };
    this._updateTracker(e, { [t]: { ...o, ...i } });
  }
  _patchConfig(e) {
    this._commit({ ...this._config, ...e });
  }
  /**
   * Live variants for continuous controls (sliders, color pickers, typing):
   * one undo snapshot per edit burst — keyed by element and fields — then
   * plain emits, instead of a full-config clone per input event.
   */
  _beginLive(e, t, i) {
    const n = `${e}:${t}:${Object.keys(i).sort().join(",")}`;
    this._liveEditKey !== n && this._pushHistory(n);
  }
  _updateOpeningLive(e, t) {
    this._beginLive("opening", e, t), this._emitFloor({
      openings: this._floor().openings.map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _updateItemLive(e, t) {
    this._beginLive("item", e, t), this._emitFloor({
      items: this._floor().items.map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _updateTextLive(e, t) {
    this._beginLive("text", e, t), this._emitFloor({
      texts: this._floor().texts.map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _updateFurnitureLive(e, t) {
    this._beginLive("furniture", e, t), this._emitFloor({
      furniture: this._floor().furniture.map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _updateTrackerLive(e, t) {
    this._beginLive("tracker", e, t), this._emitFloor({
      trackers: (this._floor().trackers ?? []).map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _updateAreaLive(e, t) {
    this._beginLive("area", e, t), this._emitFloor({
      areas: (this._floor().areas ?? []).map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _patchConfigLive(e) {
    this._beginLive("config", "", e), this._emit({ ...this._config, ...e });
  }
  _updateWallLive(e, t) {
    this._beginLive("wall", e, t), this._emitFloor({
      walls: this._floor().walls.map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _patchFloorLive(e) {
    this._beginLive("floor", this._activeFloorId, e), this._emitFloor(e);
  }
  /** Route a form patch to the right per-kind update helper (commit or burst). */
  _applyElementPatch(e, t, i, n) {
    switch (e) {
      case "opening":
        n ? this._updateOpeningLive(t, i) : this._updateOpening(t, i);
        break;
      case "item":
        n ? this._updateItemLive(t, i) : this._updateItem(t, i);
        break;
      case "text":
        n ? this._updateTextLive(t, i) : this._updateText(t, i);
        break;
      case "furniture":
        n ? this._updateFurnitureLive(t, i) : this._updateFurniture(t, i);
        break;
      case "tracker":
        n ? this._updateTrackerLive(t, i) : this._updateTracker(t, i);
        break;
      case "wall":
        n ? this._updateWallLive(t, i) : this._updateWall(t, i);
        break;
      case "area":
        n ? this._updateAreaLive(t, i) : this._updateArea(t, i);
        break;
    }
  }
  // ---- rendering ----------------------------------------------------------
  // ---- zoom ----------------------------------------------------------------
  _setZoom(e) {
    this._zoom = Math.min(3, Math.max(0.5, Math.round(e * 100) / 100));
  }
  /** Ctrl/Cmd + wheel zooms the canvas (also catches trackpad pinch); plain wheel scrolls. */
  _onCanvasWheel(e) {
    !e.ctrlKey && !e.metaKey || (e.preventDefault(), this._setZoom(this._zoom - Math.sign(e.deltaY) * 0.1));
  }
  /** Reset to 100% (where the stage fits the wrap width) and scroll home. */
  _fitView() {
    this._setZoom(1), this._canvasWrap?.scrollTo({ top: 0, left: 0 });
  }
  /** One-line description of the selected element for the Element header. */
  _selectionSummary(e) {
    const t = this._floor();
    switch (e.kind) {
      case "wall": {
        const i = t.walls.find((n) => n.id === e.id);
        return i ? `Wall · ${Math.round(Math.hypot(i.x2 - i.x1, i.y2 - i.y1))} units` : "Wall";
      }
      case "opening": {
        const i = t.openings.find((n) => n.id === e.id);
        return i ? `${i.type === "door" ? "Door" : "Window"} · ${Math.round(i.length)} units` : "Opening";
      }
      case "item": {
        const i = t.items.find((n) => n.id === e.id);
        return i?.entity ? `Device · ${i.entity}` : "Device";
      }
      case "text": {
        const n = t.texts.find((o) => o.id === e.id)?.text ?? "";
        return n ? `Text · “${n.length > 24 ? `${n.slice(0, 24)}…` : n}”` : "Text";
      }
      case "furniture": {
        const i = t.furniture.find((o) => o.id === e.id);
        if (!i) return "Furniture";
        const n = Lg(i.type, this._symbols());
        return `${n.charAt(0).toUpperCase()}${n.slice(1)} · ${Math.round(i.w)}×${Math.round(i.h)}`;
      }
      case "area": {
        const i = (t.areas ?? []).find((n) => n.id === e.id);
        return i ? `Area · ${i.name || `${i.points.length}-point`}` : "Area";
      }
      default: {
        const i = (t.trackers ?? []).find((n) => n.id === e.id);
        return i ? `Tracker · ${Math.round(i.w)}×${Math.round(i.h)}` : "Tracker";
      }
    }
  }
  _renderGrid() {
    const { width: e, height: t } = this._config, i = this.grid, n = `${e}x${t}x${i}`;
    if (this._gridCache?.key === n) return this._gridCache.lines;
    const o = [];
    for (let s = 0; s <= e; s += i)
      o.push(_`<line x1=${s} y1="0" x2=${s} y2=${t} class="grid" />`);
    for (let s = 0; s <= t; s += i)
      o.push(_`<line x1="0" y1=${s} x2=${e} y2=${s} class="grid" />`);
    return this._gridCache = { key: n, lines: o }, o;
  }
  _isSel(e, t) {
    return this._selection.some((i) => i.kind === e && i.id === t);
  }
  /**
   * The second toolbar row: shows controls and hints for whatever you're
   * currently doing — options for the active drawing tool, or actions for the
   * current selection. This keeps contextual controls (which come and go) out
   * of the always-present top row.
   */
  _renderContextBar() {
    const e = this._tool;
    let t, i;
    if (e === "wall")
      t = "Wall", i = u`
        <button
          class=${this._freeWalls ? "" : "active"}
          aria-pressed=${!this._freeWalls}
          title="Snap walls to horizontal/vertical and existing corners (off = draw freely)"
          @click=${() => {
        this._freeWalls = !this._freeWalls;
      }}
        >
          straighten
        </button>
        <span class="ctx-hint">Drag to draw. Endpoints snap to nearby corners to close rooms.</span>
      `;
    else if (e === "tracker")
      t = "Tracker", i = u`
        <span class="ctx-hint"
          >Drag on the canvas to draw the tracked area; bind one or two
          distance sensors in the Element editor.</span
        >
      `;
    else if (e === "area") {
      t = "Area";
      const n = this._draftArea?.points.length ?? 0;
      i = u`
        <span class="shape-toggle">
          <button class=${this._areaShape === "polygon" ? "on" : ""} @click=${() => {
        this._areaShape = "polygon", this._draftTracker = null;
      }}>Polygon</button>
          <button class=${this._areaShape === "rect" ? "on" : ""} @click=${() => {
        this._areaShape = "rect", this._draftArea = null, this._areaHover = null;
      }}>Rectangle</button>
        </span>
        <span class="ctx-hint">
          ${this._areaShape === "rect" ? "Drag on the canvas to draw a rectangular room." : n === 0 ? "Click to start a room outline; points snap to nearby corners." : n < 3 ? `${n} point${n === 1 ? "" : "s"} placed — click to add more (3+ to close).` : `${n} points placed — click the first point to close the room, or keep adding.`}
        </span>
      `;
    } else if (e === "door" || e === "window")
      t = e === "door" ? "Door" : "Window", i = u`
        <label class="ctx-field">
          Length
          <input
            class="num"
            type="number"
            min="1"
            .value=${String(this._defaultOpeningLength)}
            title="Default length applied to the next ${e} you place"
            @change=${(n) => {
        this._defaultOpeningLength = Math.max(
          1,
          Number(n.target.value) || this._defaultOpeningLength
        );
      }}
          />
        </label>
        <span class="ctx-hint">Click on a wall to drop a ${e}; it snaps onto the wall.</span>
      `;
    else {
      t = "Select";
      const n = this._selection.length;
      i = n === 0 ? u`<span class="ctx-hint"
              >Click an element to select it, or drag a box to select several.</span
            >` : u`
              <span class="ctx-count">${n} selected</span>
              <span class="ctx-hint">Properties and actions are in the Element section below.</span>
            `;
    }
    return u`
      <div class="context-bar">
        <span class="ctx-label">${t}</span>
        ${i}
        <span class="ctx-divider"></span>
        ${this._renderSnapControl()}
      </div>
    `;
  }
  /**
   * Snap control rendered at the end of the context bar for every tool. The
   * setting governs placement / drag / wall drawing across all tools, so the
   * control needs to be reachable regardless of which tool is active.
   */
  _renderSnapControl() {
    const e = this._snapMode, t = vs(this._config.snap, this.grid), i = [
      { id: "grid", label: "On" },
      { id: "off", label: "Off" },
      { id: "custom", label: "Custom" }
    ], n = e === "grid" ? `Snapping to the ${this.grid}-unit grid.` : e === "off" ? "No snapping — free placement." : `Snap = ${t}% of grid (${this._resolvedSnap} units).`;
    return u`
      <span class="ctx-field-label">Snap</span>
      <div class="seg" role="group" aria-label="Snap mode">
        ${i.map(
      (o) => u`
            <button
              class=${e === o.id ? "active" : ""}
              aria-pressed=${e === o.id}
              title=${o.id === "grid" ? "Snap to the grid" : o.id === "off" ? "Free placement" : "Custom step (% of grid)"}
              @click=${() => this._setSnapMode(o.id)}
            >
              ${o.label}
            </button>
          `
    )}
      </div>
      ${e === "custom" ? u`<input
              class="num"
              type="number"
              min="1"
              step="5"
              .value=${String(t)}
              title="Custom snap step, as a percentage of the grid"
              @change=${(o) => {
      const s = Math.max(
        1,
        Number(o.target.value) || _s
      );
      this._patchConfig({ snap: cn(s, this.grid) });
    }}
            /><span class="ctx-field-label">%</span>` : f}
      <span class="ctx-hint">${n}</span>
    `;
  }
  render() {
    if (!this._config) return u`${f}`;
    const e = this._config, t = this._floor(), i = e.floors ?? [], n = mo(e.overlayScale), o = this._scopingAreaId(), s = e.showDeadSpaces ? qr(t.walls, t.openings) : [], r = t.items.some((l) => l.glow) ? po(t.walls, t.openings, (l) => {
      const c = (h) => Ve(l, h ? this.hass?.states[h] : void 0);
      return Jr(
        l,
        c(l.entity),
        l.secondaryEntity && Si(l) ? Ve(
          _o(l),
          this.hass?.states[l.secondaryEntity]
        ) : void 0,
        l.shutterEntity ? Re(this.hass?.states[l.shutterEntity], l.shutterInvert) : void 0,
        Ee(l) > 2 && l.extraEntities ? l.extraEntities.map((h) => c(h || l.entity)) : void 0
      );
    }) : t.walls, a = !t.walls.length && !t.openings.length && !t.items.length && !t.texts.length && !t.furniture.length && !(t.trackers ?? []).length && !(t.areas ?? []).length;
    return u`
      <div
        class="editor ${this._fullscreen ? "fullscreen" : ""}"
        popover=${this._fullscreen ? "manual" : f}
        @pointerdown=${this._onEditorPointerDown}
      >
        ${this._floorMenuOpen || this._addMenuOpen ? u`<div
              class="pop-backdrop"
              @click=${() => {
      this._floorMenuOpen = !1, this._addMenuOpen = !1, this._addQuery = "";
    }}
            ></div>` : f}
        <div class="toolbar">
          <!-- Tools — modes; exactly one is active at a time -->
          <div class="seg" role="group" aria-label="Tool">
            ${["select", "wall", "door", "window", "tracker", "area"].map(
      (l) => u`
                <button
                  class=${this._tool === l ? "active" : ""}
                  aria-pressed=${this._tool === l}
                  title=${un[l].label}
                  @click=${() => {
        this._tool = l, this._draft = null, this._draftTracker = null, this._draftArea = null, this._areaHover = null;
      }}
                >
                  <ha-icon icon=${un[l].icon}></ha-icon>${un[l].label}
                </button>`
    )}
          </div>

          <span class="divider"></span>

          <!-- Expand: break out of HA's narrow config dialog into a full-screen
               workspace. Kept next to the tools so it's reachable even when the
               toolbar wraps at dialog width. -->
          <button
            class=${this._fullscreen ? "active expand-toggle" : "expand-toggle"}
            aria-pressed=${this._fullscreen}
            title=${this._fullscreen ? "Exit full screen (Esc)" : "Edit full screen — more room for the canvas"}
            @click=${() => this._toggleFullscreen()}
          >
            <ha-icon icon=${this._fullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"}></ha-icon>
            ${this._fullscreen ? "Exit" : "Expand"}
          </button>

          <!-- Apply: save the plan to the dashboard and keep editing (issue
               #198). HA's own Save closes the dialog, and the preview beside
               the editor is too small to judge where an icon really lands, so
               checking one nudge cost a save, a close, a look, then reopening
               and re-expanding the editor. Next to Expand because that is
               where the need bites hardest: the fullscreen workspace covers
               HA's footer, Save included. -->
          <button
            class="apply-btn"
            ?disabled=${this._applyState === "saving"}
            title="Save to the dashboard without closing the editor — the card behind updates"
            @click=${this._apply}
          >
            <ha-icon
              icon=${this._applyState === "saved" ? "mdi:check" : "mdi:content-save-outline"}
            ></ha-icon>
            ${this._applyState === "saved" ? "Saved" : this._applyState === "saving" ? "Saving…" : "Apply"}
          </button>
          ${this._applyError ? u`<span class="apply-error">${this._applyError}</span>` : f}

          <!-- Labels: declutter a dense plan while editing (issue #52). -->
          <button
            class="icon-btn"
            aria-pressed=${this._hideLabels}
            title=${this._hideLabels ? "Show element labels on the canvas" : "Hide element labels — easier to aim on a dense plan"}
            @click=${() => {
      this._hideLabels = !this._hideLabels;
    }}
          >
            <ha-icon
              icon=${this._hideLabels ? "mdi:label-off-outline" : "mdi:label-outline"}
            ></ha-icon>
            Labels
          </button>

          <span class="divider"></span>

          <!-- Insert — one popover for everything droppable on the floor -->
          <span class="pop-wrap">
            <button
              aria-haspopup="true"
              aria-expanded=${this._addMenuOpen}
              @click=${() => {
      this._addMenuOpen = !this._addMenuOpen, this._floorMenuOpen = !1;
    }}
            >
              + Add
            </button>
            ${this._addMenuOpen ? this._renderAddMenu() : f}
          </span>

          <span class="spacer"></span>

          <!-- History -->
          <div class="group">
            <button aria-label="Undo" title="Undo (Ctrl/Cmd+Z)" ?disabled=${!this._history.length} @click=${this._undo}>
              <ha-icon icon="mdi:undo"></ha-icon>
            </button>
            <button aria-label="Redo" title="Redo (Ctrl/Cmd+Shift+Z)" ?disabled=${!this._future.length} @click=${this._redo}>
              <ha-icon icon="mdi:redo"></ha-icon>
            </button>
          </div>

          <span class="divider"></span>

          <!-- Floor — switch + add inline; rename/delete behind the gear -->
          <span class="floors pop-wrap">
            <label>floor</label>
            <select
              @change=${(l) => {
      this._switchFloor(l.target.value), this._canvasWrap?.focus({ preventScroll: !0 });
    }}
            >
              ${i.map(
      (l) => u`<option value=${l.id} .selected=${l.id === this._activeFloorId}>${l.name}</option>`
    )}
            </select>
            <button
              aria-label="Add floor"
              title="Add a floor (copies the current walls)"
              @click=${this._addFloor}
            >
              +
            </button>
            <button
              aria-label="Floor settings"
              title="Rename or delete this floor"
              aria-haspopup="true"
              aria-expanded=${this._floorMenuOpen}
              @click=${() => {
      this._floorMenuOpen = !this._floorMenuOpen, this._addMenuOpen = !1, this._addQuery = "";
    }}
            >
              <ha-icon icon="mdi:cog-outline"></ha-icon>
            </button>
            ${this._floorMenuOpen ? u`<div class="pop">
                  ${this._renderHaFloorRow(t)}
                  <!-- Reorder (issue #66): the safe alternative to cut-and-
                       pasting floor blocks in YAML, which drops/duplicates
                       ids. Position in this list is the switcher order. -->
                  <div class="pop-row">
                    <label>Order</label>
                    <button
                      aria-label="Move floor up"
                      title="Move this floor up the list"
                      ?disabled=${i.length < 2 || i[0]?.id === this._activeFloorId}
                      @click=${() => this._moveFloor(-1)}
                    >
                      <ha-icon icon="mdi:arrow-up"></ha-icon>
                    </button>
                    <button
                      aria-label="Move floor down"
                      title="Move this floor down the list"
                      ?disabled=${i.length < 2 || i[i.length - 1]?.id === this._activeFloorId}
                      @click=${() => this._moveFloor(1)}
                    >
                      <ha-icon icon="mdi:arrow-down"></ha-icon>
                    </button>
                  </div>
                  <div class="pop-row">
                    <label>Rename</label>
                    <input
                      class="floor-name"
                      type="text"
                      .value=${t?.name ?? ""}
                      @change=${(l) => this._renameFloor(this._activeFloorId, l.target.value)}
                    />
                  </div>
                  <!-- Issue #67: switcher-button label, per-floor accent, and
                       which floor the live card opens on. -->
                  <div class="pop-row">
                    <label>Short</label>
                    <input
                      type="text"
                      maxlength="8"
                      placeholder="e.g. GF"
                      title="Short label for the card's floor-switcher button"
                      .value=${t?.short ?? ""}
                      @change=${(l) => this._commitFloor({
      short: l.target.value.trim() || void 0
    })}
                    />
                  </div>
                  <div class="pop-row">
                    <label>Color</label>
                    <input
                      type="color"
                      title="Accent for this floor's switcher button while active"
                      .value=${t?.color ?? "#03a9f4"}
                      @input=${(l) => this._commitFloor({ color: l.target.value })}
                    />
                    <button
                      aria-label="Clear floor color"
                      title="Back to the theme color"
                      ?disabled=${!t?.color}
                      @click=${() => this._commitFloor({ color: void 0 })}
                    >
                      <ha-icon icon="mdi:water-off-outline"></ha-icon>
                    </button>
                  </div>
                  <div class="pop-row">
                    <label>Default</label>
                    <input
                      type="checkbox"
                      title="Open the live card on this floor"
                      .checked=${this._config.defaultFloor === this._activeFloorId}
                      @change=${(l) => this._commit({
      ...this._config,
      defaultFloor: l.target.checked ? this._activeFloorId : void 0
    })}
                    />
                  </div>
                  <button
                    class="danger pop-action"
                    ?disabled=${i.length <= 1}
                    @click=${() => {
      this._deleteFloor(), this._floorMenuOpen = !1;
    }}
                  >
                    <ha-icon icon="mdi:delete-outline"></ha-icon> Delete this floor
                  </button>
                </div>` : f}
          </span>
        </div>

        ${this._renderContextBar()}

        <div class="workspace">
        <div class="canvas-outer">
        <!-- The viewport keeps the canvas's aspect ratio so its height does not
             grow with the zoom level. Otherwise zooming in made this box taller,
             which pushed the zoom buttons (anchored to its bottom-right) down the
             page — you had to chase the + button between clicks. Fullscreen sizes
             the viewport from the available space instead, which is why it never
             had the problem. -->
        <div
          class="canvas-wrap"
          tabindex="0"
          style=${this._fullscreen ? f : `aspect-ratio:${R(e.width, pt)} / ${R(e.height, Bt)};`}
          @wheel=${this._onCanvasWheel}
          @contextmenu=${this._onContextMenu}
        >
          ${this._renderContextMenu()}
          <!-- The stage doubles as the card's .plan box for overlay sizing: same
               container query, same --fp-u, so a badge measured in canvas units
               previews here at the size a card of this width would draw it
               (issue #192). The editor never rotates the plan, so the canvas
               width is what 100cqw measures against. -->
          <div class="stage ${n === "plan" ? "scale-plan" : ""}"
               style="aspect-ratio: ${R(e.width, pt)} / ${R(
      e.height,
      Bt
    )}; width:${this._zoom * 100}%;
                   --fp-plan-w: ${R(e.width, pt)};${Fc(
      e.skin
    )}${Ha(e.palette)}">
            <!-- Keyed on the skin and the palette, for the repaint reason
                 documented on the card's SVG (issue #122): a var() inside a
                 presentation attribute does not repaint when the custom
                 property changes, so without this the canvas kept the previous
                 skin's doors and room fills — and, since issue #265, would show
                 a palette colour's old value while you were editing it. -->
            ${Ir(
      `${e.skin ?? ""}|${ja(e.palette)}`,
      _`<svg
              viewBox="0 0 ${e.width} ${e.height}"
              preserveAspectRatio="none"
              class=${this._tool}
              @pointerdown=${this._onCanvasDown}
              @pointermove=${this._onCanvasMove}
              @pointerup=${this._onCanvasUp}
              @pointercancel=${this._onPointerCancel}
            >
              <rect
                x="0"
                y="0"
                width=${e.width}
                height=${e.height}
                fill=${e.background ?? Ni}
              />
              ${t.image ? _`<image href=${t.image} x="0" y="0" width=${e.width} height=${e.height}
                            preserveAspectRatio=${Ta(t.imageFit)}
                            opacity=${t.imageOpacity ?? 1} />` : f}
              ${this._renderGrid()}
              ${$e(
        t.areas ?? [],
        (l, c) => l.id || c,
        (l) => this._renderAreaSel(l, o)
      )}
              <!-- Dead spaces (issue #88), same layer position as the card so
                   what you draw is what you get. Live while you draw: closing
                   the last wall of a shaft hatches it, and dropping a door into
                   it clears the hatching again — which is the fastest way to
                   see that the card agrees with you about what is sealed. -->
              ${s.length ? _`${Pa(`${this._wallMaskId}-dead`)}
                      ${s.map(
        (l) => Oa(l, `${this._wallMaskId}-dead`)
      )}` : f}
              <!-- Light pools (issue #6), same layer position as the card so
                   what you place is what you get. Previewed at full strength
                   with no hass in the editor, so the radius is adjustable
                   without having to turn the real light on. -->
              ${ta(
        t.furniture,
        e.width,
        e.height,
        `${this._wallMaskId}-glowmask`,
        this._symbols()
      )}
              <g class="fp-glows"
                 mask=${t.furniture.length ? `url(#${this._wallMaskId}-glowmask)` : f}>
                ${t.items.map((l, c) => {
        if (!l.glow) return f;
        const h = Sf(l, this.hass?.states[l.entity]);
        return h ? ea(l, h, `${this._wallMaskId}-glow-${c}`, r) : f;
      })}
              </g>
              ${// Radius guide for the selected glow (issue #108). Sizing an
      // unlit light would otherwise be blind, now that an off light
      // correctly draws nothing. Editor-only chrome, like the
      // tracker zone outline.
      //
      // Deliberately the *configured* radius, not the brightness-
      // scaled one (issue #123): this is the handle for the value you
      // are setting, which is the pool's size at full brightness. A
      // guide that shrank as the bulb dimmed would move while you
      // dragged it, and would never show the size you actually typed.
      t.items.map(
        (l) => l.glow && this._isSel("item", l.id) ? _`<circle class="glow-guide" cx=${l.x} cy=${l.y}
                                  r=${R(l.glowRadius, Hi)} />` : f
      )}
              ${t.furniture.map((l) => this._renderFurnitureSel(l))}
              ${Ia(t.openings, e.width, e.height, this._wallMaskId)}
              ${t.walls.map((l) => this._renderWall(l))}
              <!-- Room outlines, same layer position as the card so what you
                   place is what you get. Only a static borderColor draws here,
                   there being no hass to resolve a live color from — but the
                   clip ids are passed anyway, so wiring a live preview in later
                   cannot silently land on the unclipped path. -->
              <g mask=${`url(#${this._wallMaskId})`}>
                ${(t.areas ?? []).map(
        (l, c) => La(l, void 0, `${this._wallMaskId}-area-${c}`)
      )}
              </g>
              ${$e(
        // Keyed by id: switching floors must create fresh DOM. Reused
        // nodes would CSS-transition from the previous floor's opening
        // state — a window briefly plays a door swing (issue #50).
        t.openings,
        (l, c) => l.id || c,
        (l) => this._renderOpeningSel(l)
      )}
              ${$e(
        t.trackers ?? [],
        (l, c) => l.id || c,
        (l) => this._renderTrackerSel(l)
      )}
              ${this._draftTracker ? _`<rect class="tracker-draft"
                              x=${Math.min(this._draftTracker.x0, this._draftTracker.x1)}
                              y=${Math.min(this._draftTracker.y0, this._draftTracker.y1)}
                              width=${Math.abs(this._draftTracker.x1 - this._draftTracker.x0)}
                              height=${Math.abs(this._draftTracker.y1 - this._draftTracker.y0)}
                              rx="4" />` : f}
              ${this._draft ? _`<g class="fp-wall-neon"><line x1=${this._draft.x1} y1=${this._draft.y1}
                              x2=${this._draft.x2} y2=${this._draft.y2}
                              class="wall draft" mask=${`url(#${this._wallMaskId})`}
                              stroke-width=${V} /></g>` : f}
              ${this._renderAreaDraft()}
              ${this._guides.map(
        (l) => l.axis === "x" ? _`<line class="fp-guide" x1=${l.value} x2=${l.value} y1="0" y2=${e.height} />` : _`<line class="fp-guide" y1=${l.value} y2=${l.value} x1="0" x2=${e.width} />`
      )}
              ${this._marquee ? _`<rect x=${Math.min(this._marquee.x0, this._marquee.x1)}
                              y=${Math.min(this._marquee.y0, this._marquee.y1)}
                              width=${Math.abs(this._marquee.x1 - this._marquee.x0)}
                              height=${Math.abs(this._marquee.y1 - this._marquee.y0)}
                              class="marquee" />` : f}
            </svg>`
    )}
            <div class="items">
              ${t.texts.map((l) => this._renderTextOverlay(l, e, n))}
              ${t.openings.filter((l) => va(l)).map((l) => this._renderShutterMarkOverlay(l, e, n))}
              ${t.openings.filter((l) => $a(l)).map((l) => this._renderOpeningMarkOverlay(l, e, n))}
              ${t.items.map((l) => this._renderItemOverlay(l, e, n))}
            </div>
          </div>
        </div>
        ${a && !this._draft && !this._draftTracker && !this._draftArea ? u`<div class="empty-hint">
              <div>
                <b>Draw your first room:</b> pick the <b>Wall</b> tool and drag on the canvas.<br />
                Then drop doors, windows and devices onto it.
              </div>
            </div>` : f}
        <div class="zoom-overlay">
          <button aria-label="Zoom out" title="Zoom out" @click=${() => this._setZoom(this._zoom - 0.25)}>
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <button class="zoom-val-btn" title="Reset zoom to 100%" @click=${() => this._setZoom(1)}>
            ${Math.round(this._zoom * 100)}%
          </button>
          <button aria-label="Zoom in" title="Zoom in" @click=${() => this._setZoom(this._zoom + 0.25)}>
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
          <button aria-label="Fit to view" title="Fit to view" @click=${this._fitView}>
            <ha-icon icon="mdi:fit-to-screen-outline"></ha-icon>
          </button>
        </div>
        </div>

        <div class="side">
          ${this._renderElementEdit()}
          ${this._renderPanel()}
        </div>
        </div>
      </div>
    `;
  }
  /**
   * `ha-entity-picker` when defined, else a plain entity-id input — mirrors
   * the icon-picker fallback so entity binding never silently dead-ends when
   * the helper load fails or the editor runs outside HA.
   */
  /**
   * Render a FormSpec: real `<ha-form>` (native HA selectors) when the
   * element is defined, otherwise the same schema through plain inputs.
   * Patches route through `apply(patch, live)` — `live` marks continuous
   * fields (typing, sliders) for the burst-history path.
   */
  _renderForm(e, t) {
    return customElements.get("ha-form") ? u`<ha-form
        .hass=${this.hass}
        .data=${e.data}
        .schema=${e.fields}
        .computeLabel=${ly}
        .computeHelper=${cy}
        @value-changed=${(i) => {
      i.stopPropagation();
      const n = zg(e.data, i.detail.value, e.fields), o = Xs(n, e.fields), s = Object.keys(o);
      if (!s.length) return;
      const r = s.length === 1 && Zs(e.fields.find((a) => a.name === s[0]));
      t(e.toPatch(o), r);
    }}
      ></ha-form>` : u`${e.fields.map((i) => this._renderFallbackField(e, i, t))}`;
  }
  _applyFallback(e, t, i, n, o) {
    const s = Xs({ [t.name]: i }, e.fields);
    t.name in s && o(e.toPatch(s), n && Zs(t));
  }
  /** One plain-input row per schema field — the outside-HA / load-failure path. */
  _renderFallbackField(e, t, i) {
    const n = e.data[t.name], o = t.selector;
    if ("select" in o) {
      const s = o.select, r = s.options;
      if (s.custom_value) {
        const a = `sel-${t.name}-${r.length}`;
        return u`<div class="row wide">
          <label>${t.label}</label>
          <input
            type="text"
            list=${a}
            .value=${String(n ?? "")}
            @change=${(l) => this._applyFallback(e, t, l.target.value, !1, i)}
          />
          <datalist id=${a}>
            ${r.map((l) => u`<option value=${l.value}></option>`)}
          </datalist>
        </div>`;
      }
      return u`<div class="row">
        <label>${t.label}</label>
        <select
          .value=${String(n ?? "")}
          @change=${(a) => this._applyFallback(e, t, a.target.value, !1, i)}
        >
          ${r.map(
        (a) => u`<option value=${a.value} ?selected=${a.value === n}>${a.label}</option>`
      )}
        </select>
      </div>`;
    }
    if ("boolean" in o)
      return u`<div class="row">
        <label>${t.label}</label>
        <input
          type="checkbox"
          .checked=${!!n}
          @change=${(s) => this._applyFallback(e, t, s.target.checked, !1, i)}
        />
      </div>`;
    if ("number" in o) {
      const s = o.number, r = s.mode === "slider";
      return u`<div class="row">
        <label>${t.label}</label>
        ${r ? u`<input
              type="range"
              min=${s.min ?? 0}
              max=${s.max ?? 100}
              step=${s.step ?? 1}
              .value=${String(n ?? s.min ?? 0)}
              @input=${(a) => this._applyFallback(e, t, Number(a.target.value), !0, i)}
            />` : f}
        <input
          class="num"
          type="number"
          min=${s.min ?? f}
          max=${s.max ?? f}
          step=${s.step ?? f}
          .value=${String(n ?? "")}
          @change=${(a) => {
        const l = a.target;
        this._applyFallback(
          e,
          t,
          l.value === "" ? void 0 : Number(l.value),
          !1,
          i
        ), l.value = String(e.data[t.name] ?? "");
      }}
        />
      </div>`;
    }
    if ("entity" in o) {
      const s = o.entity;
      return u`<div class="row wide">
        <label>${t.label}</label>
        ${this._renderEntityPicker(
        String(n ?? ""),
        (r) => this._applyFallback(e, t, r, !1, i),
        s.filter?.[0]?.domain,
        s.include_entities
      )}
      </div>`;
    }
    return "icon" in o ? u`<div class="row wide">
        <label>${t.label}</label>
        <input
          type="text"
          placeholder=${o.icon.placeholder ?? "mdi:…"}
          .value=${String(n ?? "")}
          @change=${(s) => this._applyFallback(e, t, s.target.value, !1, i)}
        />
      </div>` : "ui_action" in o ? u`${f}` : u`<div class="row">
      <label>${t.label}</label>
      <input
        type="text"
        .value=${String(n ?? "")}
        @input=${(s) => this._applyFallback(e, t, s.target.value, !0, i)}
      />
    </div>`;
  }
  _renderEntityPicker(e, t, i, n) {
    return customElements.get("ha-entity-picker") ? u`<ha-entity-picker
        .hass=${this.hass}
        .value=${e}
        .includeDomains=${i}
        .includeEntities=${n}
        allow-custom-entity
        @value-changed=${(o) => t(o.detail.value ?? "")}
      ></ha-entity-picker>` : u`<input
      type="text"
      placeholder="sensor.example"
      .value=${e}
      @change=${(o) => t(o.target.value)}
    />`;
  }
  /**
   * Attribute field for the hand-rolled rows, mirroring
   * {@link _renderEntityPicker}: HA's own attribute dropdown when the frontend
   * has registered it, a plain text input otherwise.
   *
   * The dropdown is the whole point — it lists the attributes the entity
   * *actually has*, which is what `ha-form`'s `attribute` selector gives the
   * device's own Attribute field. A repeatable row cannot go through `ha-form`,
   * but that is no reason for it to be a worse control: typing `curent_temp`
   * into a free-text box fails silently at render time, which is exactly the
   * bug a picker cannot have.
   *
   * `entityId` is what the attributes are listed from — the row's own entity
   * when it names one, else the device's, which is the same fallback the
   * reading itself resolves through.
   */
  _renderAttributePicker(e, t, i, n) {
    return customElements.get("ha-entity-attribute-picker") && e ? u`<ha-entity-attribute-picker
        class="reading-attr"
        .hass=${this.hass}
        .entityId=${e}
        .value=${t}
        allow-custom-value
        title=${n ?? f}
        @value-changed=${(o) => i(o.detail.value ?? "")}
      ></ha-entity-attribute-picker>` : u`<input
      type="text"
      class="reading-attr"
      placeholder="attribute"
      title=${n ?? f}
      .value=${t}
      @change=${(o) => i(o.target.value)}
    />`;
  }
  /**
   * Icon field for the hand-rolled rows (issue #106), mirroring
   * {@link _renderEntityPicker}: HA's searchable picker when the frontend has
   * registered it, a plain text input otherwise. Used by the state-rule list,
   * which cannot go through `ha-form` because it is repeatable, and by the
   * device's own icon row that sits beside it (issue #127).
   */
  _renderIconPicker(e, t, i) {
    return customElements.get("ha-icon-picker") ? u`<ha-icon-picker
        class="rule-icon"
        .hass=${this.hass}
        .value=${e}
        placeholder=${i?.placeholder ?? "Icon"}
        title=${i?.title ?? f}
        @value-changed=${(n) => t(n.detail.value ?? "")}
      ></ha-icon-picker>` : u`<input
      type="text"
      class="rule-icon"
      placeholder=${i?.placeholder ?? "mdi:blinds"}
      title=${i?.title ?? f}
      .value=${e}
      @change=${(n) => t(n.target.value)}
    />`;
  }
  /** Toggle the full-screen workspace. */
  _toggleFullscreen() {
    this._fullscreen = !this._fullscreen, this._fullscreen && this._canvasWrap && (this._canvasWrap.style.width = "", this._canvasWrap.style.height = ""), this._floorMenuOpen = !1, this._addMenuOpen = !1, this._addQuery = "";
  }
  /**
   * The "+ Add" popover: device, text, then every symbol as its real glyph.
   *
   * The grid is searchable and grouped (issue #90). It was 26 fixed cells over
   * six rows, which was already the tallest thing in the editor; with a
   * community library behind it the list only grows, so the query filters on id,
   * name, category and the symbol's own keywords — "couch" finds the sofa.
   */
  _renderAddMenu() {
    const e = () => {
      this._addMenuOpen = !1, this._addQuery = "";
    }, t = this._symbols(), i = qa(t).filter((s) => sf(s, this._addQuery)), n = !this._addQuery.trim();
    let o = "";
    return u`
      <div class="pop left add-pop">
        <button
          class="add-entry"
          @click=${() => {
      this._addItem("generic"), e();
    }}
        >
          <ha-icon icon="mdi:lightbulb-outline"></ha-icon> Device
        </button>
        <button
          class="add-entry"
          @click=${() => {
      this._addText(), e();
    }}
        >
          <ha-icon icon="mdi:format-text"></ha-icon> Text
        </button>
        <div class="furn-search">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input
            type="search"
            placeholder="Search furniture"
            .value=${this._addQuery}
            @input=${(s) => {
      this._addQuery = s.target.value;
    }}
            @keydown=${(s) => {
      s.key === "Escape" && this._addQuery && (s.stopPropagation(), this._addQuery = "");
    }}
          />
        </div>
        <div class="add-furn-scroll">
          ${i.length ? i.map((s) => {
      const r = n && s.category !== o ? s.category : "";
      return o = s.category, u`${r ? u`<div class="furn-group">${r}</div>` : f}
                  ${this._renderFurnCell(s, e)}`;
    }) : u`<div class="furn-empty">No symbol matches “${this._addQuery}”</div>`}
        </div>
      </div>
    `;
  }
  /** One picker cell: the symbol drawn at its own default size, plus its name. */
  _renderFurnCell(e, t) {
    const { w: i, h: n } = e.size, o = Math.max(i, n) * 0.25 + 6, s = `${-i / 2 - o} ${-n / 2 - o} ${i + o * 2} ${n + o * 2}`;
    return u`
      <button
        class="furn-cell"
        title=${e.name}
        @click=${() => {
      this._addFurniture(e.id), t();
    }}
      >
        <svg viewBox=${s}>
          ${jn(
      { id: "preview", type: e.id, x: 0, y: 0, w: i, h: n },
      void 0,
      this._symbols()
    )}
        </svg>
        <span>${e.name}</span>
      </button>
    `;
  }
  /**
   * Per-element editor area, rendered BELOW the canvas with a small title.
   * Kept separate from the project panel so users can tell the two apart, and
   * separate from the context bar so the bar's height stays stable across
   * selection changes (the canvas no longer jumps when you click around).
   */
  _renderElementEdit() {
    const e = this._selection.length, t = this._primary();
    if (e === 0 || !t)
      return u`
        <section class="edit-area">
          <h3 class="section-title">Element</h3>
          <p class="hint">Select an element on the canvas to edit its properties here.</p>
        </section>
        ${this._renderTemplates()}
      `;
    const i = e > 1 ? `${e} elements selected` : this._selectionSummary(t), n = e > 1 ? "mdi:select-group" : dy[t.kind];
    return u`
      <section class="edit-area">
        <div class="edit-head">
          <ha-icon icon=${n}></ha-icon>
          <span class="edit-title" title=${i}>${i}</span>
          <span class="head-spacer"></span>
          ${(() => {
      const o = this._floor(), s = this._selection.every((r) => Mt(o, r));
      return u`<button
              class=${s ? "on" : ""}
              aria-label=${s ? "Unlock" : "Lock in place"}
              aria-pressed=${s ? "true" : "false"}
              title=${s ? "Unlock — let it be dragged again" : "Lock in place — it can still be selected and edited, just not moved"}
              @click=${() => this._setLocked(!s)}
            >
              <ha-icon icon=${s ? "mdi:lock" : "mdi:lock-open-variant-outline"}></ha-icon>
            </button>`;
    })()}
          <button aria-label="Save as template" title="Als Vorlage speichern" @click=${this._saveTemplate}>
            <ha-icon icon="mdi:content-save-outline"></ha-icon>
          </button>
          <button aria-label="Duplicate" title="Duplicate (Ctrl/Cmd+D)" @click=${this._duplicate}>
            <ha-icon icon="mdi:content-duplicate"></ha-icon>
          </button>
          <button class="danger" aria-label="Delete" title="Delete (Del)" @click=${this._deleteSelected}>
            <ha-icon icon="mdi:delete-outline"></ha-icon>
          </button>
        </div>
        ${e > 1 ? u`<p class="hint">
              Edit elements one at a time. Drag any selected element to move the whole group.
            </p>` : u`${this._renderAreaScopeHint()}
              <div class="rows">${this._renderSelectionEditor()}</div>`}
      </section>
    `;
  }
  _renderWall(e) {
    const t = this._isSel("wall", e.id), i = t && !e.locked;
    return _`
      <g>
        <line x1=${e.x1} y1=${e.y1} x2=${e.x2} y2=${e.y2}
              class="wall-hit"
              @pointerdown=${(n) => this._startDrag(n, { kind: "wall", id: e.id })} />
        <g class="fp-wall-neon"><line x1=${e.x1} y1=${e.y1} x2=${e.x2} y2=${e.y2}
              class="wall ${t ? "selected" : ""}"
              mask=${`url(#${this._wallMaskId})`}
              style=${aa(e.thickness)} stroke-linecap="round" /></g>
        ${i ? _`
                <circle cx=${e.x1} cy=${e.y1} r="9" class="handle"
                        @pointerdown=${(n) => this._startDrag(n, { kind: "wall", id: e.id }, 1)} />
                <circle cx=${e.x2} cy=${e.y2} r="9" class="handle"
                        @pointerdown=${(n) => this._startDrag(n, { kind: "wall", id: e.id }, 2)} />` : f}
      </g>`;
  }
  _renderOpeningSel(e) {
    const t = this._isSel("opening", e.id);
    return _`
      <g class="opening-hit"
         @pointerdown=${(i) => this._startDrag(i, { kind: "opening", id: e.id })}>
        ${Aa(e, {
      color: t ? "var(--primary-color, #03a9f4)" : Jn,
      // The closed colour previews here too (issue #228) — unless this is
      // the selected opening, whose whole symbol goes blue to show that.
      inactive: t ? void 0 : e.inactiveColor,
      open: bo(e),
      // Draw sliding / rolling openings partly open in the editor so the
      // motion is visible — closed, both look like a plain band, which
      // would make the Motion / Slide / Style controls appear inert.
      amount: Y(e) !== "swing" ? 0.55 : void 0,
      // Shutter previewed half-rolled so the layer is visible while
      // configuring, whatever the live state.
      shutter: e.shutterEntity ? { amount: 0.55, style: ut(e), flip: e.shutterFlipV } : void 0
    })}
      </g>`;
  }
  /**
   * Render a Tracker in the editor SVG with its zone outline visible (so the
   * user can grab/resize it) plus a hit overlay for drag-to-move and a dashed
   * selection rectangle when active.
   */
  _renderTrackerSel(e) {
    const t = this._isSel("tracker", e.id), i = Ii(this.hass?.states, e.xSensor?.entity), n = Ii(this.hass?.states, e.ySensor?.entity), o = $i(this.hass?.states, e.xSensor?.presence), s = $i(this.hass?.states, e.ySensor?.presence);
    return _`
      <g class="tracker-hit ${t ? "selected" : ""}"
         @pointerdown=${(r) => this._startDrag(r, { kind: "tracker", id: e.id })}>
        ${Ra(e, {
      editing: !0,
      xReading: i,
      yReading: n,
      xPresent: o,
      yPresent: s
    })}
        <rect x=${e.x} y=${e.y} width=${e.w} height=${e.h}
              transform="rotate(${e.angle ?? 0} ${e.x + e.w / 2} ${e.y + e.h / 2})"
              class="tracker-hit-rect" />
        ${t ? _`<rect x=${e.x - 4} y=${e.y - 4}
                        width=${e.w + 8} height=${e.h + 8}
                        transform="rotate(${e.angle ?? 0} ${e.x + e.w / 2} ${e.y + e.h / 2})"
                        class="tracker-outline" />` : f}
      </g>`;
  }
  _renderFurnitureSel(e) {
    const t = this._isSel("furniture", e.id);
    return _`
      <g class="furn-hit ${t ? "selected" : ""}"
         @pointerdown=${(i) => this._startDrag(i, { kind: "furniture", id: e.id })}>
        ${jn(e, void 0, this._symbols())}
        ${t ? _`<rect x=${e.x - e.w / 2 - 4} y=${e.y - e.h / 2 - 4}
                        width=${e.w + 8} height=${e.h + 8}
                        transform="rotate(${e.angle ?? 0} ${e.x} ${e.y})"
                        class="furn-outline" />` : f}
      </g>`;
  }
  /**
   * A committed Area: the translucent fill (shared with the live card),
   * a transparent hit-polygon for click-to-select and whole-shape drag, and
   * — while selected — a heavier outline plus one draggable handle per
   * vertex (decision #1 in areas.md: vertices reshape independently, with
   * no cross-element corner-stretch).
   */
  /**
   * States in words what the canvas animation shows: this element sits in a
   * linked room, so its entity picker only lists that room's entities. Colour
   * alone can't carry that, and the off-switch lives on the Area element.
   */
  _renderAreaScopeHint() {
    const e = this._scopingAreaId();
    if (!e) return f;
    const t = (this._floor().areas ?? []).find((n) => n.id === e), i = t?.name ? t.name : "this area";
    return u`<p class="hint area-scope-hint">
      <ha-icon icon="mdi:vector-polygon"></ha-icon>
      <span>Only entities in <strong>${i}</strong> are listed.</span>
      <button
        class="link-btn"
        title="Turn off Filter entities for this area — every entity becomes selectable"
        @click=${() => this._updateArea(e, { filterEntities: !1 })}
      >
        Show all
      </button>
    </p>`;
  }
  _renderAreaSel(e, t) {
    const i = this._isSel("area", e.id), n = e.id === t, o = e.points.map((s) => `${s.x},${s.y}`).join(" ");
    return _`
      <g class="area-hit ${i ? "selected" : ""} ${n ? "scoping" : ""}">
        ${n ? _`<polygon points=${o} class="area-scoping" />` : f}
        ${za(e)}
        <polygon points=${o} class="area-hit-shape"
                 @pointerdown=${(s) => this._startDrag(s, { kind: "area", id: e.id })} />
        ${i ? _`<polygon points=${o} class="area-outline" />` : f}
        ${// Outline yes, vertex handles no, for a pinned room — same reasoning
    // as the wall's endpoints (issue #191): still visibly selected, with
    // nothing on it that pretends to be draggable.
    i && !e.locked ? e.points.map(
      (s, r) => _`
                  <circle cx=${s.x} cy=${s.y} r="7" class="handle"
                          @pointerdown=${(a) => this._startDrag(a, { kind: "area", id: e.id }, void 0, r)} />`
    ) : f}
      </g>`;
  }
  /**
   * The in-progress Area draft: committed vertices as dots, straight segments
   * between them, and — while a live pointer position is known — a dashed
   * "rubber band" segment from the last vertex to the cursor. Once 3+ points
   * are down the starting vertex is drawn larger/hollow so it's visually
   * obvious that clicking it closes the polygon (see `_onCanvasDown`).
   */
  _renderAreaDraft() {
    const e = this._draftArea;
    if (!e) return f;
    const t = e.points, i = t.map((r) => `${r.x},${r.y}`).join(" "), n = t[t.length - 1], o = t.length >= 3, s = this._areaHover;
    return _`
      <g class="area-draft">
        ${t.length > 1 ? _`<polyline points=${i} class="area-draft-line" />` : f}
        ${s ? _`<line x1=${n.x} y1=${n.y} x2=${s.x} y2=${s.y}
                        class="area-draft-hover" />` : f}
        ${t.map(
      (r, a) => a === 0 && o ? _`<circle cx=${r.x} cy=${r.y} r="9" class="area-draft-start" />` : _`<circle cx=${r.x} cy=${r.y} r="5" class="area-draft-point" />`
    )}
      </g>`;
  }
  /**
   * The card's shutter badge, previewed (issue #74 follow-up) — an opening
   * with both entities bound shows the shutter's own icon beside it, and the
   * editor is where you find out whether it lands somewhere sensible.
   *
   * Inert here: the canvas selects and drags openings by clicking them, and a
   * badge that swallowed those clicks would make the opening under it awkward
   * to grab. On the card it is a control; here it is a picture of one.
   */
  _renderShutterMarkOverlay(e, t, i) {
    const n = e.shutterEntity, o = this.hass?.states[n], s = Re(o, e.shutterInvert) > 0, r = wa(e, o, s, this.hass?.entities?.[n]?.icon), a = j(e.shutterActiveColor ?? e.activeColor) ?? G, l = wo(e), c = xo(e), h = W(Ai, i), d = W(Ei, i);
    return u`<div
      class="shutter-mark ${ri(o, e.shutterInvert) ? "on" : "off"}"
      style="left:${l.x / t.width * 100}%; top:${l.y / t.height * 100}%;
             width:${h};height:${h};
             transform:translate(-50%,-50%)
                       translate(calc(${c.x} * ${d}), calc(${c.y} * ${d}));
             --fp-active:${a};"
      title=${`${o?.attributes?.friendly_name ?? n} — shown on the card, tap it there to open the shutter`}
    >
      <ha-icon icon=${r} style="--mdc-icon-size:${W(
      Mi,
      i
    )};"></ha-icon>
    </div>`;
  }
  /**
   * The card's opening badge, previewed (issue #154 follow-up). Same reason as
   * the shutter's preview above: turning **Show icon** on and finding out where
   * the badge lands is the whole point of having a canvas. Inert here too.
   */
  _renderOpeningMarkOverlay(e, t, i) {
    const n = e.entity, o = this.hass?.states[n], s = Ve(e, o) > 0, r = ka(e, o, s, this.hass?.entities?.[n]?.icon), a = j(e.activeColor) ?? G, l = Sa(e), c = Ea(e), h = W(Ai, i), d = W(Ei, i);
    return u`<div
      class="shutter-mark ${li(e, o) ? "on" : "off"}"
      style="left:${l.x / t.width * 100}%; top:${l.y / t.height * 100}%;
             width:${h};height:${h};
             transform:translate(-50%,-50%)
                       translate(calc(${c.x} * ${d}), calc(${c.y} * ${d}));
             --fp-active:${a};"
      title=${`${o?.attributes?.friendly_name ?? n} — shown on the card, tap it there to open its dialog`}
    >
      <ha-icon icon=${r} style="--mdc-icon-size:${W(
      Mi,
      i
    )};"></ha-icon>
    </div>`;
  }
  _renderItemOverlay(e, t, i) {
    const n = this._isSel("item", e.id), o = e.entity ? this.hass?.states[e.entity] : void 0, s = zn(e, o, e.entity ? this.hass?.entities?.[e.entity]?.icon : void 0), { text: r, live: a } = Pf(this.hass, e), l = R(e.size, Ke), c = qt(e) !== "none", h = e.display ?? "badge", d = go(e, o), p = j(Ki(e.stateColor, d)), m = ra(e, p), g = qt(e) === "value" ? fa(this.hass, e) : void 0, b = Ie(e.entity, o?.state), v = b ? j(e.activeColor) ?? Xr(o) : void 0, x = !!this.hass && Ln(e, o?.state), $ = b || x ? void 0 : j(e.inactiveColor), y = Pr(
      ci(p ?? v ?? $, this._config?.palette)
    ), w = e.rippleColor ?? p ?? v ?? G, E = e.rippleSize ?? ji, T = e.rippleDirection ?? Wi, C = e.rippleWidth ?? Ui, D = ca(e, o?.state, o?.attributes), B = W(l, i), L = u`<div
      class="badge ${c ? "" : "ghost"} ${p ? "state-colored" : b ? "active-colored" : $ ? "inactive-colored" : ""}"
      style="width:${B};height:${B};transform:rotate(${R(e.angle, 0)}deg);${p ? `--fp-state:${p};` : ""}${v ? `--fp-active:${v};` : ""}${$ ? `--fp-inactive:${$};` : ""}${y ? `--fp-ink:${y};` : ""}"
    >
      ${g ? u`<span
            class="badge-value"
            style="font-size:${W(ya(l, g), i)};"
            >${g}</span
          >` : u`<ha-icon
            class=${D ? `anim-${D}` : ""}
            icon=${s}
            style="--mdc-icon-size:${W(pa(l), i)};"
          ></ha-icon>`}
    </div>`;
    let O;
    h === "ripple" ? O = Ti(!0, w, E, T, C, 3, i) : h === "iconRipple" ? O = u`<div class="stack">
        ${Ti(!0, w, E, T, C, 3, i)}
        <div class="stack-icon">${L}</div>
      </div>` : O = L;
    const M = ia(e, o?.state);
    return u`
      <div
        class="edit-item ${n ? "selected" : ""} ${M ? "card-hidden" : ""}"
        style="left:${e.x / t.width * 100}%; top:${e.y / t.height * 100}%;"
        @pointerdown=${(re) => this._onOverlayDown(re, { kind: "item", id: e.id })}
        @pointermove=${this._onOverlayMove}
        @pointerup=${this._onOverlayUp}
        @pointercancel=${this._onPointerCancel}
      >
        ${O}
        <!-- The card's own label line when there is one (issue #135), so
             turning Show state on is visible here rather than only after
             leaving the editor; otherwise the dim identification fallback.
             The Labels toolbar toggle hides either on dense plans (issue
             #52), and the size previews the card's labelSize (issue #59). -->
        ${this._hideLabels ? f : u`<span
            class="ilabel ${a ? "live" : ""} ilabel-${fo(e)}"
            style="font-size:${W(
      a || e.labelSize != null ? sa(e.labelSize) : 11,
      i
    )};${a && m ? `color:${m};` : ""}"
            >${r}</span
          >`}
      </div>
    `;
  }
  _renderTextOverlay(e, t, i) {
    const n = this._isSel("text", e.id);
    return u`
      <div
        class="edit-text ${n ? "selected" : ""}"
        style="left:${e.x / t.width * 100}%; top:${e.y / t.height * 100}%;
               font-size:${W(R(e.size, zt), i)};
               color:${de(e.color, zr)};
               transform:translate(-50%,-50%) rotate(${R(e.angle, 0)}deg);"
        @pointerdown=${(o) => this._onOverlayDown(o, { kind: "text", id: e.id })}
        @pointermove=${this._onOverlayMove}
        @pointerup=${this._onOverlayUp}
        @pointercancel=${this._onPointerCancel}
      >
        ${ao(this.hass, e) || "…"}
      </div>
    `;
  }
  _renderPanel() {
    return u`
      <section class="panel">
        <button
          class="section-toggle"
          aria-expanded=${this._projectOpen}
          @click=${() => {
      this._projectOpen = !this._projectOpen;
    }}
        >
          <ha-icon icon=${this._projectOpen ? "mdi:chevron-down" : "mdi:chevron-right"}></ha-icon>
          <span class="section-title-inline">Project</span>
          ${this._projectOpen ? f : u`<span class="section-summary"
                >${this._config.title || "Untitled"} · ${this._config.width}×${this._config.height}</span
              >`}
        </button>
        ${this._projectOpen ? this._renderPanelBody() : f}
      </section>
    `;
  }
  /**
   * The Project panel, grouped on the same criteria as the element panels:
   * what the plan *is*, then how it *looks*, then what it *does*.
   *
   * It had the same problem the device panel had — nineteen controls in one
   * run, with the sun's five aiming fields separated from the two brightness
   * sliders by a press-effect dropdown, and "Offline devices" filed under
   * display next to the card's rotation.
   *
   * `offlineStyle` moves out of the display slice and joins the press effect:
   * both are statements about how *devices* look and answer, not about how the
   * card is framed. It stays in `projectDisplayForm` as a field — one form, one
   * `toPatch` — and is sliced into the group it belongs to (see `formSlice`).
   */
  _renderPanelBody() {
    const e = this._config, t = (n) => this._patchConfig(n), i = ty(e);
    return u`
      <div class="rows panel-body">
        ${this._renderGroup(
      "Project",
      this._renderForm(Yg(e), (n, o) => {
        "grid" in n && typeof n.grid == "number" && (n = { ...n, ...this._gridPatch(n.grid) }), o ? this._patchConfigLive(n) : this._patchConfig(n);
      })
    )}
        ${this._renderGroup(
      // The plan's own look: its palette, its paper, and the one drawing
      // convention that is a plan-wide choice rather than an element's.
      "Look",
      this._renderForm(ey(e), t),
      this._renderColorRow({
        label: "Background",
        value: e.background,
        swatch: "#ffffff",
        placeholder: "#ffffff or empty",
        onLive: (n) => this._patchConfigLive({ background: n }),
        onCommit: (n) => this._patchConfig({ background: n })
      }),
      this._renderForm(iy(e), t)
    )}
        ${this._renderGroup(
      // Named colours (issue #265). Its own group rather than a row inside
      // Look: it is a list that grows, and it is the one thing here that
      // other panels reach back into.
      "Named colors",
      this._renderPalettePanel()
    )}
        ${this._renderGroup(
      // Per floor, not per project — but it is the floor's paper, so it
      // belongs beside the plan's own.
      "Floor image",
      this._renderForm(sy(this._floor()), (n, o) => {
        o ? this._patchFloorLive(n) : this._commitFloor(n);
      })
    )}
        ${this._renderGroup(
      // How the card is framed on the dashboard, as opposed to what is
      // drawn inside it. Set once for a surface and rarely touched again.
      "Display",
      this._renderForm(
        _e(i, [
          "rotation",
          "rotationPortrait",
          "rotationLandscape",
          "overlayScale",
          "compactHeader",
          "zoomedOverlayScale"
        ]),
        t
      )
    )}
        ${this._renderGroup(
      // Light through the openings (issue #177) — where it comes from and
      // what it looks like where it lands.
      "Sunlight",
      this._renderForm(oy(e), t),
      e.sunlight ? u`${this._renderColorRow({
        label: "Sun color",
        title: "Color of the light the openings let in",
        value: e.sunlightColor,
        swatch: "#ffd9a0",
        placeholder: "(warm white)",
        onLive: (n) => this._patchConfigLive({ sunlightColor: n }),
        onCommit: (n) => this._patchConfig({ sunlightColor: n })
      })}
              ${e.sunShade === !1 ? f : this._renderColorRow({
        label: "Shade color",
        title: "Color of everywhere the light does not reach",
        value: e.sunShadeColor,
        swatch: "#000000",
        placeholder: "(black)",
        onLive: (n) => this._patchConfigLive({ sunShadeColor: n }),
        onCommit: (n) => this._patchConfig({ sunShadeColor: n })
      })}` : f
    )}
        ${this._renderGroup(
      // The other half of following the sun, and a separate switch: this
      // one dims the whole plan after dark rather than casting anything.
      "Night dimming",
      this._renderForm(ny(e), t)
    )}
        ${this._renderGroup(
      // How devices look and answer, plan-wide. "Offline devices" lived
      // under display, beside the card's rotation, which is not what it is
      // about.
      "Devices",
      this._renderForm(Qg(e), t),
      this._renderForm(_e(i, ["offlineStyle"]), t),
      this._renderForm(Jg(e), t)
    )}
        ${this._renderGroup("Symbols", this._renderSymbolsPanel())}
      </div>
    `;
  }
  /**
   * Paste a furniture symbol into this plan (issue #90).
   *
   * The point is that you don't need a pull request to draw something the
   * library hasn't got: paste the geometry here, it lands in the config's
   * `symbols:` block, and it appears in the picker beside the built-ins. If it
   * turns out to be generally useful, the same JSON is what you contribute to
   * `furniture/`.
   *
   * It is validated through `normalizeSymbol` — the same function the shipped
   * library goes through — so a malformed paste is reported here rather than
   * becoming a broken glyph on the plan. Nothing pasted is ever parsed as
   * markup; see `symbols.ts`.
   */
  /**
   * The plan's named colours (issue #265): *"I hate copying color hex codes
   * across so many entities."*
   *
   * Names are stored, but what elements store is a `var()` built from the name
   * (see `src/palette.ts`), so the two edits that could strand a reference are
   * the ones this panel has to be careful about — and both are handled by
   * rewriting the plan rather than by warning about it:
   *
   * - **Rename** rewrites every reference to the new name, so the link
   *   survives. Blocked when the new name would collide with another entry,
   *   since two entries sharing a slug means one of them silently stops
   *   resolving.
   * - **Delete** rewrites every reference to the literal colour the entry held.
   *   A dangling `var()` is not a colour at all, so the alternative is elements
   *   turning black the moment a name is removed. This way the plan looks
   *   exactly the same afterwards and has simply lost the link.
   */
  _renderPalettePanel() {
    const e = this._config.palette ?? [], t = (n) => this._patchConfig({ palette: n.length ? n : void 0 }), i = (n, o, s = !1) => {
      const r = e.map((a, l) => l === n ? { ...a, ...o } : a);
      s ? this._patchConfigLive({ palette: r }) : this._patchConfig({ palette: r });
    };
    return u`
      <div class="row col palette-panel">
        <label>Named colors</label>
        ${e.length ? f : u`<span class="hint"
              >Name a color here and every color field on the plan can point at it.</span
            >`}
        ${e.map(
      (n, o) => u`
            <div class="row wide palette-row">
              <input
                type="text"
                class="palette-name"
                placeholder="Warm"
                .value=${n.name ?? ""}
                @change=${(s) => this._renamePaletteColor(o, s.target)}
              />
              <input
                type="color"
                .value=${this._swatchValue(n.color, "#ff8800")}
                @input=${(s) => i(o, { color: s.target.value }, !0)}
              />
              <input
                type="text"
                class="palette-color"
                placeholder="#ff8800"
                .value=${n.color ?? ""}
                @change=${(s) => this._recolorPaletteColor(o, s.target)}
              />
              <button
                class="rule-remove"
                aria-label="Remove color"
                title="Remove this color; anything using it keeps the color it has now"
                @click=${() => this._removePaletteColor(o)}
              >
                <ha-icon icon="mdi:close"></ha-icon>
              </button>
            </div>
          `
    )}
        ${this._paletteError ? u`<div class="symbol-error">${this._paletteError}</div>` : f}
        ${e.length >= Da ? f : u`<div class="row wide state-color-add">
              <button
                @click=${() => {
      this._paletteError = "", t([...e, { name: this._nextPaletteName(e), color: "#ff8800" }]);
    }}
              >
                <ha-icon icon="mdi:plus"></ha-icon>Add color
              </button>
            </div>`}
      </div>
    `;
  }
  /** "Color 1", "Color 2", … — the first number no entry is already using. */
  _nextPaletteName(e) {
    const t = new Set(e.map((i) => ne(i.name)));
    for (let i = 1; ; i++) {
      const n = `Color ${i}`;
      if (!t.has(ne(n))) return n;
    }
  }
  /**
   * Takes the input rather than its value so a refused rename can put the old
   * name back. Lit will not do it: the config is unchanged, so the binding sees
   * the same value it last wrote and skips the DOM, leaving the box showing a
   * name the plan does not have.
   */
  _renamePaletteColor(e, t) {
    const i = this._config.palette ?? [], n = i[e];
    if (!n) return;
    const o = t.value.trim(), s = ne(n.name), r = ne(o);
    if (s === r) {
      if (this._paletteError = "", o === (n.name ?? "")) {
        t.value = o;
        return;
      }
      this._patchConfig({ palette: i.map((c, h) => h === e ? { ...c, name: o } : c) });
      return;
    }
    if (r && i.some((c, h) => h !== e && ne(c.name) === r)) {
      this._paletteError = `Another color is already called “${o}”.`, t.value = n.name ?? "";
      return;
    }
    this._paletteError = "";
    const a = i.map((c, h) => h === e ? { ...c, name: o } : c), l = { ...this._config, palette: a };
    this._patchConfig(
      // Same shadowing caveat as delete: if another entry still declares the old
      // slug, its references are none of this rename's business.
      this._slugStillResolves(s, l) ? l : (
        // An empty new name leaves the entry unusable, so its references have
        // nothing to point at — freeze them at the colour, as a delete does.
        Bs(l, s, r ? Us(o) : n.color)
      )
    );
  }
  /**
   * The colour half of a palette row.
   *
   * Guarded like the name half, and for the same reason. An empty or invalid
   * colour drops the entry from `paletteEntries`, so `paletteStyle` stops
   * declaring its property and every reference to it dangles — which is not a
   * fallback, it is black. That is the same damage deleting the entry does, but
   * reached without a rewrite, without an error, and with the row still sitting
   * there looking live. Refuse it and put the field back instead; the way out
   * is the remove button, which freezes the references properly.
   */
  _recolorPaletteColor(e, t) {
    const i = this._config.palette ?? [], n = i[e];
    if (!n) return;
    const o = t.value.trim();
    if (!j(o)) {
      this._paletteError = o ? `“${o}” is not a color the card can use.` : "A named color needs a color. Use the remove button to take the name away.", t.value = n.color ?? "";
      return;
    }
    this._paletteError = "", this._patchConfig({ palette: i.map((s, r) => r === e ? { ...s, color: o } : s) });
  }
  _removePaletteColor(e) {
    const t = this._config.palette ?? [], i = t[e];
    if (!i) return;
    this._paletteError = "";
    const n = t.filter((s, r) => r !== e), o = { ...this._config, palette: n.length ? n : void 0 };
    this._patchConfig(
      this._slugStillResolves(ne(i.name), o) ? o : Bs(o, ne(i.name), i.color)
    );
  }
  /** Whether a slug is still declared by the palette in `config`. */
  _slugStillResolves(e, t) {
    return e ? Kt(t.palette).some((i) => ne(i.name) === e) : !1;
  }
  _renderSymbolsPanel() {
    const e = Object.keys(this._config.symbols ?? {});
    return u`
      <div class="row col symbols-panel">
        ${e.length ? u`<div class="symbol-list">
              ${e.map(
      (t) => u`
                  <span class="symbol-chip">
                    ${t}
                    <button
                      class="chip-x"
                      title=${`Remove ${t}`}
                      @click=${() => this._removeSymbol(t)}
                    >
                      ✕
                    </button>
                  </span>
                `
    )}
            </div>` : f}
        <textarea
          class="symbol-input"
          rows="4"
          spellcheck="false"
          placeholder=${'{ "id": "my-desk", "size": { "w": 120, "h": 60 }, "parts": [ … ] }'}
          .value=${this._symbolDraft}
          @input=${(t) => {
      this._symbolDraft = t.target.value, this._symbolError = "";
    }}
        ></textarea>
        ${this._symbolError ? u`<div class="symbol-error">${this._symbolError}</div>` : f}
        <div class="symbol-actions">
          <button ?disabled=${!this._symbolDraft.trim()} @click=${this._addSymbol}>
            Add symbol
          </button>
          <a
            href="https://github.com/nicosandller/easy-floorplan/blob/main/furniture/README.md"
            target="_blank"
            rel="noreferrer"
            >How to draw one</a
          >
        </div>
      </div>
    `;
  }
  _removeSymbol(e) {
    const t = { ...this._config.symbols ?? {} };
    delete t[e], this._patchConfig({ symbols: Object.keys(t).length ? t : void 0 });
  }
  /**
   * Editor fields for the currently-selected element, rendered in the Element
   * section below the canvas (docked beside it in fullscreen). Returns nothing
   * when the selection isn't exactly one element — multi-select and
   * empty-select states are handled by the Element header itself.
   */
  _renderSelectionEditor() {
    const e = this._primary();
    if (!e || this._selection.length !== 1) return u`${f}`;
    if (e.kind === "opening") {
      const t = this._floor().openings.find((s) => s.id === e.id);
      if (!t) return u`${f}`;
      const i = Rg(t, (s) => this._supportedFeatures(s)), n = (s, r) => {
        if ("entity" in s) {
          const a = s.entity, l = a ? this.hass?.states[a]?.attributes?.device_class : void 0;
          s = { ...s, ...l ? am(l) : {} };
        }
        this._applyElementPatch("opening", t.id, s, r);
      }, o = (s, r, ...a) => {
        const l = _e(i, r);
        return !l.fields.length && !a.some((c) => c && c !== f) ? f : this._renderGroup(s, this._renderForm(l, n), ...a);
      };
      return u`
        ${I.OPENING_GROUPS.map(
        ([s, r]) => s === "Color" ? o(
          s,
          r,
          t.entity ? u`${this._renderColorRow({
            label: "Open color",
            title: "Leaf, sash and swing arc while this opening is open",
            value: t.activeColor,
            swatch: "#03a9f4",
            placeholder: "(primary)",
            onLive: (a) => this._updateOpeningLive(t.id, { activeColor: a }),
            onCommit: (a) => this._updateOpening(t.id, { activeColor: a })
          })}
                    ${this._renderColorRow({
            label: "Closed color",
            title: "Leaf, sash and swing arc while it is closed — the jambs stay the wall's color",
            value: t.inactiveColor,
            swatch: "#c62828",
            placeholder: "(wall)",
            onLive: (a) => this._updateOpeningLive(t.id, { inactiveColor: a }),
            onCommit: (a) => this._updateOpening(t.id, { inactiveColor: a })
          })}` : f
        ) : s === "Shutter" ? o(
          s,
          r,
          // The shutter's own accent, so an open shutter over a shut
          // window can read as a separate thing from the sash it
          // covers. Falls back to the opening's, hence the placeholder.
          t.shutterEntity ? this._renderColorRow({
            label: "Shutter color",
            title: "Shutter color while it is open",
            value: t.shutterActiveColor,
            swatch: t.activeColor ?? "#03a9f4",
            placeholder: t.activeColor ? "(active color)" : "(primary)",
            onLive: (a) => this._updateOpeningLive(t.id, { shutterActiveColor: a }),
            onCommit: (a) => this._updateOpening(t.id, { shutterActiveColor: a })
          }) : f
        ) : o(s, r)
      )}
      `;
    }
    if (e.kind === "item") {
      const t = this._floor().items.find((l) => l.id === e.id);
      if (!t) return u`${f}`;
      const i = this._areaEntitiesAt(t.x, t.y), n = t.entity ? this.hass?.states[t.entity]?.attributes?.device_class : void 0, o = (l) => (l ? this.hass?.states[l]?.attributes?.friendly_name : void 0) ?? l, s = {
        source: ga(this.hass, t)?.source ?? "primary",
        primaryLabel: o(t.entity),
        // One label per reading, positionally — the dropdown names each rather
        // than numbering them, and a reading with no entity of its own is read
        // off this device, so that is the name to show for it (issue #180).
        readingLabels: je(t).map((l) => o(l.entity || t.entity))
      }, r = (l, c) => {
        "entity" in l && typeof l.entity == "string" && (l = { ...l, kind: Ls(l.entity) }), this._applyElementPatch("item", t.id, l, c);
      }, a = Wg(t, n);
      return u`
        ${this._renderGroup("Identity", this._renderForm(Dg(t), r))}
        ${this._renderGroup(
        "What it reads",
        // Entity, its attribute, whether its own state shows, then every
        // other entity — the order the label prints them in (issue #180).
        this._renderForm(Fg(t, i), r),
        this._renderForm(Ng(t), r),
        this._renderItemReadings(t)
      )}
        ${If(t) ? this._renderGroup(
        "Label",
        this._renderForm(Hg(t), r),
        t.disableLabelColor && t.useCustomLabelColor ? this._renderColorRow({
          label: "Custom color",
          value: t.labelCustomColor,
          swatch: "#ffffff",
          placeholder: "e.g. #ff0000 or red",
          onLive: (l) => this._updateItemLive(t.id, { labelCustomColor: l }),
          onCommit: (l) => this._updateItem(t.id, { labelCustomColor: l })
        }) : f
      ) : f}
        ${this._renderGroup(
        "Badge",
        this._renderForm(jg(t, s), r),
        this._renderItemIconRow(t)
      )}
        ${this._renderGroup(
        "Color",
        t.stateColor?.length ? (
          // Colour by state supersedes the fixed active colour, so showing
          // both invites setting one and seeing the other. Say which one is
          // in charge instead of leaving a dead control on screen.
          u`<p class="hint rule-note">
                Colored by the state rules below — they replace the active and inactive colors.
              </p>`
        ) : u`${this._renderColorRow({
          label: "Active color",
          title: "Badge color while this device is on (issue #79)",
          value: t.activeColor,
          swatch: "#fdd835",
          placeholder: "(theme)",
          onLive: (l) => this._updateItemLive(t.id, { activeColor: l }),
          onCommit: (l) => this._updateItem(t.id, { activeColor: l })
        })}
              ${this._renderColorRow({
          label: "Inactive color",
          title: "Badge color while this device is off — closed, locked or docked, whichever this entity says (issue #228)",
          value: t.inactiveColor,
          swatch: "#c62828",
          placeholder: "(theme)",
          onLive: (l) => this._updateItemLive(t.id, { inactiveColor: l }),
          onCommit: (l) => this._updateItem(t.id, { inactiveColor: l })
        })}`,
        this._renderStateColorRules(
          t.stateColor,
          (l) => this._updateItem(t.id, { stateColor: l }),
          // Only a device draws a glyph, so only a device's rules offer an
          // icon — furniture and areas share this rule shape but paint
          // polygons (issue #106).
          { icons: !0, iconPlaceholder: this._itemDefaultIcon(t) }
        )
      )}
        ${a ? this._renderGroup(
        "Effects",
        this._renderForm(a, r),
        // The ring's colour belongs with the ring, not with the badge's.
        da(t.entity, n) && Co(t) ? this._renderColorRow({
          label: "Ripple color",
          value: t.rippleColor,
          swatch: t.activeColor ?? "#03a9f4",
          placeholder: t.activeColor ? "(active color)" : "(primary)",
          onLive: (l) => this._updateItemLive(t.id, { rippleColor: l }),
          onCommit: (l) => this._updateItem(t.id, { rippleColor: l })
        }) : f
      ) : f}
        ${this._renderGroup("Behaviour", this._renderForm(Bg(t), r))}
        ${this._renderGroup("Visibility", this._renderForm(Ug(t), r))}
      `;
    }
    if (e.kind === "text") {
      const t = this._floor().texts.find((i) => i.id === e.id);
      return t ? u`
        ${this._renderForm(
        Gg(t, this._areaEntitiesAt(t.x, t.y)),
        (i, n) => this._applyElementPatch("text", t.id, i, n)
      )}
        ${this._renderColorRow({
        label: "Color",
        value: t.color,
        swatch: "#000000",
        placeholder: "(theme default)",
        onLive: (i) => this._updateTextLive(t.id, { color: i }),
        onCommit: (i) => this._updateText(t.id, { color: i })
      })}
      ` : u`${f}`;
    }
    if (e.kind === "furniture") {
      const t = this._floor().furniture.find((o) => o.id === e.id);
      if (!t) return u`${f}`;
      const i = qg(t, this._areaEntitiesAt(t.x, t.y), this._symbols()), n = (o, s) => this._applyElementPatch("furniture", t.id, o, s);
      return u`
        ${I.FURNITURE_GROUPS.map(
        ([o, s]) => this._renderGroup(o, this._renderForm(_e(i, s), n))
      )}
        ${this._renderGroup(
        "Color",
        this._renderColorRow({
          label: "Color",
          value: t.color,
          swatch: "#9e9e9e",
          placeholder: "(gray)",
          onLive: (o) => this._updateFurnitureLive(t.id, { color: o }),
          onCommit: (o) => this._updateFurniture(t.id, { color: o })
        }),
        // Without an entity there is nothing to condition a colour on.
        t.entity ? u`
                ${this._renderColorRow({
          label: "Active color",
          title: "Color while the entity is on",
          value: t.activeColor,
          swatch: "#03a9f4",
          placeholder: "(no change)",
          onLive: (o) => this._updateFurnitureLive(t.id, { activeColor: o }),
          onCommit: (o) => this._updateFurniture(t.id, { activeColor: o })
        })}
                ${this._renderStateColorRules(
          t.stateColor,
          (o) => this._updateFurniture(t.id, { stateColor: o })
        )}
              ` : f
      )}
      `;
    }
    if (e.kind === "area") {
      const t = (this._floor().areas ?? []).find((r) => r.id === e.id);
      if (!t) return u`${f}`;
      const i = ed(this.hass), n = t.haArea ? this._pendingAreaEntities(t) : [], o = Zg(t), s = (r, a) => this._applyElementPatch("area", t.id, r, a);
      return u`
        ${this._renderGroup(
        // The name doubles as the HA-area link, so the link status line and
        // the name-related toggles belong with it.
        "Identity",
        this._renderForm(
          Vg(t, i.map((r) => r.name)),
          (r, a) => (
            // A name change also decides `haArea` (see areaNamePatch).
            this._applyElementPatch("area", t.id, td(r, i), a)
          )
        ),
        this._renderAreaLinkRow(t, i),
        this._renderForm(_e(o, ["showName", "labelSize"]), s)
      )}
        ${this._renderGroup(
        "Room type & sidebar",
        u`<fp-ef-area-extras
            .hass=${this.hass}
            .area=${t}
            @area-patch=${(r) => s(r.detail, !1)}
          ></fp-ef-area-extras>`
      )}
        ${this._renderGroup(
        "What it reads",
        this._renderForm(_e(o, ["entity"]), s)
      )}
        ${this._renderGroup(
        "Color",
        this._renderForm(_e(o, ["highlight", "opacity", "activeOpacity"]), s),
        this._renderColorRow({
          label: "Color",
          value: t.color,
          swatch: "#03a9f4",
          placeholder: "(primary)",
          onLive: (r) => this._updateAreaLive(t.id, { color: r }),
          onCommit: (r) => this._updateArea(t.id, { color: r })
        }),
        // The colours the bound entity drives. Same shape furniture and
        // devices already use, and gated the same way — without an entity
        // there is nothing to condition on. Until this existed the Entity
        // picker above was inert on its own: areaColor() resolves nothing
        // without an activeColor or a matching rule, so binding an entity
        // in the editor changed nothing and the feature looked unbuilt.
        t.entity ? u`
                ${this._renderColorRow({
          label: "Active color",
          title: "Color while the entity is on",
          value: t.activeColor,
          swatch: "#03a9f4",
          placeholder: "(no change)",
          onLive: (r) => this._updateAreaLive(t.id, { activeColor: r }),
          onCommit: (r) => this._updateArea(t.id, { activeColor: r })
        })}
                ${this._renderStateColorRules(
          t.stateColor,
          (r) => this._updateArea(t.id, { stateColor: r })
        )}
              ` : f
      )}
        ${this._renderGroup(
        // What tapping the room does (issue #181). Last, as it is on every
        // other element: the thing it *does*, after everything it *is*.
        "Behavior",
        this._renderForm(
          _e(o, [
            "fitZoom",
            "zoom",
            "tap_action",
            "hold_action",
            "double_tap_action"
          ]),
          s
        )
      )}
        ${t.haArea ? this._renderGroup(
        // Everything that only exists because this room is linked to a
        // Home Assistant area.
        "Home Assistant area",
        u`<div class="row wide">
                <label>Filter entities</label>
                <input
                  type="checkbox"
                  .checked=${t.filterEntities ?? !0}
                  @change=${(r) => this._updateArea(t.id, {
          filterEntities: r.target.checked
        })}
                />
                <span class="hint"
                  >Scope the entity picker, for devices placed inside this room, to this HA
                  area's entities.</span
                >
              </div>`,
        u`<div class="row wide">
                <button
                  ?disabled=${!n.length}
                  title=${n.length ? `Add ${n.length} device${n.length === 1 ? "" : "s"} from this HA area, spread out across the room` : "Every entity in this HA area is already placed on this floor"}
                  @click=${() => this._addAreaEntities(t)}
                >
                  <ha-icon icon="mdi:shape-square-plus"></ha-icon>
                  Add all devices in this HA area${n.length ? ` (${n.length})` : ""}
                </button>
              </div>`
      ) : f}
        <p class="hint">
          Drag inside the fill to move the whole room; drag a vertex handle to reshape it.
        </p>
      `;
    }
    if (e.kind === "tracker") {
      const t = (this._floor().trackers ?? []).find((o) => o.id === e.id);
      if (!t) return u`${f}`;
      const i = Kg(t), n = (o, s) => this._applyElementPatch("tracker", t.id, o, s);
      return u`
        ${this._renderGroup(
        "Zone",
        this._renderForm(_e(i, I.TRACKER_GROUPS[0][1]), n)
      )}
        ${this._renderGroup(
        // The two distance sensors that place the marker inside the zone —
        // the thing a tracker actually is, so it gets its own group rather
        // than two unlabelled blocks above the box.
        "Sensors",
        this._renderTrackerSensorRows(t, "xSensor", "X sensor"),
        this._renderTrackerSensorRows(t, "ySensor", "Y sensor")
      )}
        ${this._renderGroup(
        "Marker",
        this._renderForm(_e(i, I.TRACKER_GROUPS[1][1]), n),
        this._renderColorRow({
          label: "Color",
          value: t.color,
          swatch: "#03a9f4",
          placeholder: "(primary)",
          onLive: (o) => this._updateTrackerLive(t.id, { color: o }),
          onCommit: (o) => this._updateTracker(t.id, { color: o })
        })
      )}
      `;
    }
    if (e.kind === "wall") {
      const t = this._floor().walls.find((n) => n.id === e.id);
      if (!t) return u`${f}`;
      const i = Math.round(Math.hypot(t.x2 - t.x1, t.y2 - t.y1));
      return u`
        ${this._renderForm(
        Xg(t),
        (n, o) => this._applyElementPatch("wall", t.id, n, o)
      )}
        <div class="row">
          <label>Length</label>
          <input
            class="num"
            type="number"
            min="1"
            .value=${String(i)}
            @change=${(n) => {
        const o = n.target, s = Number(o.value);
        if (o.value === "" || !(s >= 1)) {
          o.value = String(i);
          return;
        }
        const r = t.x2 - t.x1, a = t.y2 - t.y1, l = Math.hypot(r, a), c = l > 0 ? r / l : 1, h = l > 0 ? a / l : 0;
        this._updateWall(t.id, {
          x2: Math.round(t.x1 + c * s),
          y2: Math.round(t.y1 + h * s)
        });
      }}
          />
          <span class="hint">Resizes from the start point, keeping the direction.</span>
        </div>
        <p class="hint">
          Or drag the line on the canvas to move it, and the round handles to move an endpoint.
        </p>
      `;
    }
    return u`${f}`;
  }
  /**
   * Editor rows for one of a tracker's two sensor mappings (X or Y). Entity
   * picker is always shown; min / max / invert appear once a sensor entity is
   * set so the panel stays compact while empty.
   */
  _renderTrackerSensorRows(e, t, i) {
    const n = e[t];
    return u`
      <div class="row wide">
        <label>${i}</label>
        ${this._renderEntityPicker(
      n?.entity ?? "",
      (o) => {
        o ? this._updateTrackerSensor(e.id, t, { entity: o }) : this._updateTrackerSensor(e.id, t, null);
      },
      ["sensor", "input_number", "number"]
    )}
      </div>
      ${n ? u`<div class="row">
            <label>${i} range</label>
            <input
              class="num"
              type="number"
              step="0.01"
              title="Reading at the near edge"
              .value=${String(n.min)}
              @change=${(o) => {
      const s = o.target, r = Number(s.value);
      s.value !== "" && Number.isFinite(r) ? this._updateTrackerSensor(e.id, t, { min: r }) : s.value = String(n.min);
    }}
            />
            <input
              class="num"
              type="number"
              step="0.01"
              title="Reading at the far edge"
              .value=${String(n.max)}
              @change=${(o) => {
      const s = o.target, r = Number(s.value);
      s.value !== "" && Number.isFinite(r) ? this._updateTrackerSensor(e.id, t, { max: r }) : s.value = String(n.max);
    }}
            />
            <label class="inline-check">
              <input
                type="checkbox"
                .checked=${n.invert ?? !1}
                @change=${(o) => this._updateTrackerSensor(e.id, t, {
      invert: o.target.checked || void 0
    })}
              />
              invert
            </label>
          </div>
          <div class="row wide">
            <label>${i} presence</label>
            ${this._renderEntityPicker(
      n.presence?.entity ?? "",
      (o) => this._updateTrackerSensor(e.id, t, {
        presence: o ? { entity: o, invert: n.presence?.invert } : void 0
      }),
      ["binary_sensor", "input_boolean", "device_tracker"]
    )}
            ${n.presence ? u`<label class="inline-check" title="Treat 'off' as detected">
                  <input
                    type="checkbox"
                    .checked=${n.presence.invert ?? !1}
                    @change=${(o) => this._updateTrackerSensor(e.id, t, {
      presence: {
        entity: n.presence.entity,
        invert: o.target.checked || void 0
      }
    })}
                  />
                  invert
                </label>` : f}
          </div>` : f}
    `;
  }
};
I._nextWallMaskId = 0;
I.OPENING_GROUPS = [
  // What it is, and how it is drawn.
  ["Shape", ["type", "motion", "length", "sash", "sashSpan", "hinge", "leafHinge1", "leafHinge2", "leafHinge3", "leafHinge4", "opens", "slide", "style", "angle"]],
  // Which contacts drive it — the opening's own, before the shutter's.
  ["What it reads", ["entity", "secondaryEntity", "leaf3Entity", "leaf4Entity", "invert"]],
  // How it behaves toward the sun (issue #177), which is neither shape nor
  // state but gets asked about as its own thing.
  ["Sunlight", ["glazed", "sunlight"]],
  // The shutter is a layer over the opening with its own entity, style,
  // side, second contact, badge and colour — so it gets its own group
  // rather than being scattered through the others.
  ["Shutter", [
    "shutterEntity",
    "shutterStyle",
    "shutterSide",
    "shutterSecondaryEntity",
    "shutterInvert",
    "showShutterIcon",
    "shutterIcon"
  ]],
  ["Badge", ["showIcon", "icon"]],
  // No fields of its own — the opening's accent is a colour row, not an
  // ha-form field. It is listed here so it lands in the same place in the
  // order as every other panel's Color group, rather than after Behavior.
  ["Color", []],
  ["Behavior", ["tapTarget", "tap_action", "hold_action", "double_tap_action"]]
];
I.FURNITURE_GROUPS = [
  ["Shape", ["type", "hand", "w", "h", "angle"]],
  ["What it reads", ["entity"]],
  // What clicking it does — a staircase that changes floor (issue #121).
  ["Behavior", ["goToFloor"]]
];
I.TRACKER_GROUPS = [
  ["Zone", ["w", "h", "x", "y", "angle"]],
  ["Marker", ["dotSize"]]
];
I.styles = [
  Lr,
  oe`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    /* Full-screen workspace, shown as a popover so the top layer lifts it clear
       of HA's edit dialog (whose surface is transformed — see updated()). The
       resets undo the UA popover defaults: fit-content size, auto margins, a
       solid border and padding. The fixed position only matters to the
       non-popover fallback, where the transformed dialog surface is the
       containing block — there "fullscreen" fills the dialog, not the page. */
    .editor.fullscreen {
      position: fixed;
      inset: 0;
      z-index: 100;
      width: auto;
      height: auto;
      max-width: none;
      max-height: none;
      margin: 0;
      border: none;
      padding: 12px;
      box-sizing: border-box;
      color: inherit;
      background: var(--card-background-color, #fff);
      overflow: hidden;
    }
    /* Toolbar-icon buttons (Expand/Exit, Apply) — match the gear button's
       icon+label alignment so they read as part of the toolbar. */
    .expand-toggle,
    .apply-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    /* Apply writes to the dashboard, unlike everything else in the toolbar —
       accented so it reads as the one committing action. */
    .apply-btn {
      color: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
    }
    /* Why the last Apply didn't go through; sits in the toolbar so it is
       visible in the fullscreen workspace too, where nothing else is. */
    .apply-error {
      font-size: 12px;
      color: var(--error-color, #c62828);
    }
    /* Below the two toolbars: the canvas and the element/project sections.
       Stacked at dialog width; split into canvas + docked side panel when
       expanded so the extra width isn't wasted. */
    .workspace {
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
    }
    .side {
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
    }
    .editor.fullscreen .workspace {
      flex-direction: row;
      align-items: stretch;
      flex: 1 1 auto;
      min-height: 0;
    }
    .editor.fullscreen .canvas-outer {
      flex: 1 1 auto;
      min-width: 0;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }
    .editor.fullscreen .canvas-wrap {
      flex: 1 1 auto;
      min-height: 0;
      height: auto;
      resize: none;
    }
    /* Docked inspector — fixed, scrollable column beside the canvas. */
    .editor.fullscreen .side {
      flex: 0 0 340px;
      overflow-y: auto;
      overflow-x: hidden;
      padding-right: 2px;
    }
    /* At real dialog width the side panel can drop below instead of squeezing
       the canvas to nothing. */
    @media (max-width: 900px) {
      .editor.fullscreen .workspace {
        flex-direction: column;
        /* Stacked panels can exceed a short viewport (phone landscape) — the
           root clips, so the workspace itself must scroll. */
        overflow-y: auto;
      }
      .editor.fullscreen .side {
        flex: 0 0 auto;
        max-height: 40vh;
      }
    }
    .toolbar {
      display: flex;
      gap: 4px;
      align-items: center;
      flex-wrap: wrap;
    }
    .toolbar .spacer {
      flex: 1;
    }
    /* generic inline cluster of related controls */
    .group {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    /* vertical rule between toolbar groups */
    .divider {
      align-self: stretch;
      width: 1px;
      min-height: 26px;
      margin: 0 4px;
      background: var(--divider-color, #e0e0e0);
    }
    /* tools rendered as a connected segmented control (one active) */
    .seg {
      display: inline-flex;
    }
    .seg button {
      border-radius: 0;
      border-left-width: 0;
    }
    .seg button:first-child {
      border-left-width: 1px;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
    .seg button:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
    /* contextual second row: options/actions for the current tool or selection */
    .context-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 6px;
      padding: 5px 10px;
      min-height: 36px;
      box-sizing: border-box;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      background: var(--secondary-background-color, #f5f5f5);
    }
    .context-bar .ctx-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--primary-color, #03a9f4);
      padding-right: 8px;
      margin-right: 2px;
      border-right: 1px solid var(--divider-color, #e0e0e0);
    }
    .shape-toggle button {
      font: inherit;
      border: 1px solid var(--divider-color);
      background: none;
      color: inherit;
      padding: 2px 10px;
      cursor: pointer;
    }
    .shape-toggle button.on {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .context-bar .ctx-hint {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .context-bar .ctx-count {
      font-size: 12px;
      color: var(--primary-text-color);
    }
    .context-bar button {
      padding: 4px 10px;
      font-size: 13px;
    }
    /* A label + input pair inline in the context bar (e.g. default Length for
       the Door/Window tools). The <label> wraps both so clicking the text
       focuses the input. */
    .context-bar .ctx-field {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .context-bar .ctx-field input.num {
      width: 60px;
    }
    /* Inline label for a control rendered loose in the context bar (e.g. the
       "Snap" word next to the segmented control). */
    .context-bar .ctx-field-label {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .context-bar input.num {
      width: 60px;
    }
    /* Thin vertical rule separating the tool-specific contents from the
       always-on Snap control on the right side of the context bar. */
    .ctx-divider {
      flex: 0 0 1px;
      align-self: stretch;
      min-height: 22px;
      margin: 0 4px;
      background: var(--divider-color, #e0e0e0);
    }
    button {
      cursor: pointer;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      border-radius: 6px;
      padding: 6px 10px;
      text-transform: capitalize;
    }
    button.active {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      border-color: var(--primary-color, #03a9f4);
    }
    button.danger {
      color: var(--error-color, #db4437);
    }
    button[disabled] {
      opacity: 0.4;
      cursor: not-allowed;
    }
    /* The canvas is focusable so keyboard shortcuts only fire while working in
       the editor; only show the ring for keyboard focus, not pointer clicks. */
    .canvas-wrap:focus {
      outline: none;
    }
    .canvas-wrap:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: -2px;
    }
    .canvas-wrap {
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 8px;
      overflow: auto;
      resize: both;
      /* Size to the canvas's own aspect ratio rather than forcing a fixed
         viewport-relative height. This avoids the empty band above and below
         the grid that used to appear with the default 1000×600 canvas, and
         leaves room for the Element / Project sections below. The user can
         still drag-resize via the corner handle (resize: both). */
      min-height: 200px;
      background: var(--secondary-background-color, #f5f5f5);
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
    }
    .stage {
      position: relative;
      width: 100%;
      flex: 0 0 auto;
      margin: auto;
      touch-action: none;
    }
    svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
    }
    svg.wall,
    svg.door,
    svg.window,
    svg.tracker,
    svg.area {
      cursor: crosshair;
    }
    .grid {
      /* Theme text colour at low opacity so the grid stays visible over a
         background image (and on both light and dark themes); non-scaling-stroke
         keeps the lines a crisp ~1px at any canvas size / zoom. Editor-only —
         the live card never draws a grid. */
      stroke: var(--fp-skin-text, var(--primary-text-color, #212121));
      stroke-opacity: 0.25;
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
      /* Purely decorative — must never intercept pointers, or a press that lands
         on a grid line would capture the pointer there and break wall drawing. */
      pointer-events: none;
    }
    /* Scoped to <line> so the rule doesn't accidentally match the <svg>,
       which carries the active-tool class (e.g. "wall") on the canvas. A
       bare ".wall" selector matched the SVG too, and because pointer-events
       is inherited in SVG, setting it to none disabled the entire canvas
       — so no pointerdown reached the wall-draw handler. */
    line.wall {
      stroke: var(--fp-skin-wall, var(--primary-text-color));
      /* Same skin hooks as the card's .wall, so the canvas draws the weight
         and glow the plan will actually have. The glow itself is on
         .fp-wall-neon, outside the doorway mask — see the note there. */
      stroke-width: var(--fp-skin-wall-width, 8);
      /* The wide transparent .wall-hit line beneath handles selection/drag.
         Without this, the visible line (painted on top) swallows clicks on the
         wall body, so you could only grab it just *outside* the body. */
      pointer-events: none;
    }
    /* Neon, matching the card. Must stay on a group *outside* the doorway
       mask: CSS applies filter before mask, so a filter on the wall itself is
       computed from the uncut wall and its halo then survives the cut,
       leaving a fringe that runs through every opening (#203). */
    .fp-wall-neon {
      filter: var(--fp-skin-wall-filter, none);
    }
    line.wall.selected {
      stroke: var(--primary-color, #03a9f4);
    }
    line.wall.draft {
      opacity: 0.5;
      pointer-events: none;
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
    /* Roll-up curtain: scaleY must shrink onto the band's own centerline
       (the track), not the SVG origin. */
    .fp-roll-curtain {
      transform-box: fill-box;
      transform-origin: center;
    }
    .wall-hit {
      stroke: transparent;
      stroke-width: 22;
      cursor: move;
    }
    .opening-hit {
      cursor: move;
    }
    .furn-hit {
      cursor: move;
    }
    .furn-outline {
      fill: none;
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 1.5;
      stroke-dasharray: 6 4;
      pointer-events: none;
    }
    /* Toolbar icons sit inline with their labels; smaller than content icons. */
    .toolbar ha-icon {
      --mdc-icon-size: 16px;
    }
    .seg button {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    /* === Popovers (floor gear, + Add). The backdrop is a fixed transparent
       layer below the popover that closes it on any outside click. === */
    .pop-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .pop {
      position: absolute;
      top: calc(100% + 6px);
      right: 0;
      z-index: 20;
      min-width: 220px;
      padding: 8px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
    }
    .pop.left {
      left: 0;
      right: auto;
    }
    .pop-backdrop {
      position: fixed;
      inset: 0;
      z-index: 19;
    }
    .pop-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 8px;
    }
    .pop-row label {
      flex: 0 0 60px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .pop-row input,
    .pop-row select {
      flex: 1;
      min-width: 0;
      padding: 4px 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
    }
    .pop-action {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      width: 100%;
      justify-content: center;
      font-size: 13px;
    }
    .add-pop {
      min-width: 300px;
    }
    .add-entry {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      border: none;
      background: none;
      padding: 6px 8px;
      border-radius: 6px;
      text-align: left;
      font-size: 13px;
    }
    .add-entry:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
    /* Search row above the grid (issue #90): the library grows with every
       contributed symbol, so the list has to be findable, not just scrollable. */
    .furn-search {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 8px;
      padding: 4px 6px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
    }
    .furn-search ha-icon {
      --mdc-icon-size: 16px;
      color: var(--secondary-text-color);
      flex: none;
    }
    .furn-search input {
      flex: 1;
      min-width: 0;
      border: none;
      outline: none;
      background: none;
      font: inherit;
      font-size: 12px;
      color: var(--primary-text-color);
    }
    .add-furn-scroll {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 4px;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid var(--divider-color, #eee);
      /* 26 built-ins already filled six rows; a community library is unbounded. */
      max-height: 46vh;
      overflow-y: auto;
    }
    .furn-group {
      grid-column: 1 / -1;
      font-size: 10px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      opacity: 0.8;
      padding: 4px 2px 0;
    }
    .furn-empty {
      grid-column: 1 / -1;
      padding: 10px 2px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .furn-cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      border: none;
      background: none;
      padding: 6px 2px;
      border-radius: 6px;
      font-size: 11px;
      color: var(--secondary-text-color);
      text-transform: none;
    }
    .furn-cell:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .furn-cell svg {
      position: static;
      width: 38px;
      height: 30px;
      display: block;
    }
    /* === Canvas chrome: the zoom overlay and first-run hint live on a
       relative wrapper OUTSIDE the scroll container so they don't scroll
       away with the stage. === */
    .canvas-outer {
      position: relative;
    }
    .zoom-overlay {
      position: absolute;
      right: 26px;
      bottom: 12px;
      z-index: 2;
      display: flex;
      gap: 4px;
    }
    .zoom-overlay button {
      display: inline-flex;
      align-items: center;
      padding: 3px 7px;
      font-size: 12px;
      background: var(--card-background-color, #fff);
    }
    .zoom-overlay ha-icon {
      --mdc-icon-size: 15px;
    }
    .zoom-val-btn {
      min-width: 46px;
      justify-content: center;
    }
    .empty-hint {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 16px;
      font-size: 14px;
      line-height: 1.6;
      color: var(--secondary-text-color);
      /* Never block the first wall being drawn straight through the hint. */
      pointer-events: none;
    }
    .floors {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .floors label {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .floors select,
    .floors .floor-name {
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      border-radius: 6px;
      padding: 6px 8px;
    }
    .floors .floor-name {
      width: 90px;
    }
    .marquee {
      fill: var(--primary-color, #03a9f4);
      fill-opacity: 0.1;
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 1;
      stroke-dasharray: 4 3;
      pointer-events: none;
    }
    .handle {
      fill: var(--primary-color, #03a9f4);
      stroke: var(--card-background-color, #fff);
      stroke-width: 1.5;
      cursor: grab;
    }
    .items {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    /*
     * overlayScale: plan, previewed (issue #192). The same two lines the card
     * uses, on the box that plays the same part: the stage carries the canvas
     * ratio, so 100cqw is the plan's own width on screen and --fp-u is one
     * canvas unit. Declared on .items rather than .stage for the reason the
     * card documents — an unregistered custom property substitutes as a token
     * stream, so the cqw resolves where it is used, which stays correct if
     * --fp-u is ever registered with @property.
     *
     * Zoom falls out of it rather than needing a term of its own: the stage's
     * width is a percentage of the zoom, so zooming in widens the container and
     * every canvas-unit measure grows with the drawing — which is the mode.
     */
    .stage.scale-plan {
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
    .stage.scale-plan .items {
      --fp-u: 1px;
    }
    @supports (container-type: inline-size) and (width: 1cqw) {
      .stage.scale-plan .items {
        --fp-u: calc(100cqw / var(--fp-plan-w));
      }
    }
    /* Label padding and offsets go to em so they track the text with the plan,
       exactly as the card's own scale-plan rules do. Hairlines stay px on
       purpose there and here: below a pixel they disappear on the small cards
       this mode is for. */
    .stage.scale-plan .ilabel {
      padding: 0.08em 0.33em;
      border-radius: 0.33em;
      top: calc(100% + 0.17em);
      max-width: none;
    }
    .stage.scale-plan .ilabel-left,
    .stage.scale-plan .ilabel-right {
      top: 50%;
    }
    .stage.scale-plan .ilabel-left {
      right: calc(100% + 0.33em);
    }
    .stage.scale-plan .ilabel-right {
      left: calc(100% + 0.33em);
    }
    /* Preview of the card's shutter badge. Inherits .items' pointer-events:
       none — the opening underneath stays clickable for selection and drag. */
    .shutter-mark {
      position: absolute;
      /* transform and size are set inline, matching the card. */
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: var(--fp-skin-paper, var(--card-background-color, #fff));
      border: 1px solid var(--fp-skin-wall, var(--primary-text-color, #212121));
      color: var(--fp-skin-wall, var(--primary-text-color, #212121));
      opacity: 0.75;
    }
    .shutter-mark.on {
      color: var(--fp-active, var(--fp-skin-accent, var(--primary-color, #03a9f4)));
      border-color: var(--fp-active, var(--fp-skin-accent, var(--primary-color, #03a9f4)));
      opacity: 1;
    }
    .shutter-mark ha-icon {
      --mdc-icon-size: 15px;
      display: flex;
    }
    /* Grab area = the visible device, matching the card's hit area. A presence
       ripple is mostly empty air, and while the anchor took pointer events for
       all of it, a 110px square sat over the plan: the wall or door underneath
       could not be clicked at all, and neither could a device standing inside
       the ring. The badge and label answer instead — enough to grab and drag,
       and it puts back what was buried. */
    .edit-item {
      position: absolute;
      transform: translate(-50%, -50%);
      pointer-events: none;
      cursor: move;
      display: flex;
      flex-direction: column;
      align-items: center;
      touch-action: none;
    }
    .edit-item .badge,
    .edit-item .ilabel {
      pointer-events: auto;
    }
    .stack-icon,
    .ripple {
      pointer-events: none;
    }
    /* A ripple-only device has no badge to grab, so its centre answers. */
    .edit-item .ripple .dot {
      pointer-events: auto;
      position: relative;
    }
    .edit-item .ripple .dot::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: ${wi}px;
      height: ${wi}px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
    }
    .badge {
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
      box-shadow: var(--fp-skin-badge-shadow, 0 1px 3px rgba(0, 0, 0, 0.25));
    }
    /* Mirrors the card's .badge-value (issue #106) — the canvas must show the
       reading exactly as the plan will draw it. */
    .badge-value {
      font-weight: 600;
      line-height: 1;
      letter-spacing: -0.02em;
      white-space: nowrap;
    }
    /* Hidden on the live card right now (issue #55): faded and dashed here so
       it reads as deliberately absent from the card, while staying selectable. */
    .edit-item.card-hidden {
      opacity: 0.4;
    }
    .edit-item.card-hidden .badge {
      border-style: dashed;
    }
    .edit-item.selected .badge {
      border-color: var(--primary-color, #03a9f4);
      border-width: 2.5px;
    }
    .badge.ghost {
      opacity: 0.35;
      border-style: dashed;
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
    /* === Tracker (editor + card share the same animation classes). The zone
       outline is editor-only and added by renderTracker when editing:true; in
       the live card only the marker / line shows. Movement transitions are
       applied to the marker group's transform so the dot/triangle glides
       between sensor updates rather than jumping. === */
    /* Scoped to <g> so the rule doesn't also match the <svg>, which carries
       the active-tool class (e.g. "tracker") for cursor styling. A bare
       ".tracker" matched the SVG too, and pointer-events is inherited in
       SVG — so toggling the tracker tool silently killed every pointerdown
       on the canvas, breaking drag-to-draw. Same trap as line.wall above. */
    g.tracker {
      pointer-events: none;
    }
    .tracker-zone {
      transition: opacity 0.2s ease;
    }
    /* Dim the zone when a configured presence sensor reports "clear" so the
       editor visibly confirms the marker is being gated off — without this,
       a user toggling the mock presence sensor would just see the triangle
       vanish with no other feedback. */
    .tracker-zone.presence-gated {
      opacity: 0.35;
    }
    .tracker-hit {
      cursor: move;
    }
    .tracker-hit-rect {
      /* Transparent fill turns the entire zone into a pointer target for drag,
         without obscuring the dashed outline drawn by the renderer. */
      fill: transparent;
      pointer-events: all;
    }
    .tracker-outline {
      fill: none;
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 1.5;
      stroke-dasharray: 6 4;
      pointer-events: none;
    }
    .area-hit {
      cursor: move;
    }
    /* Dead-space hatching (issue #88): a whole region of the canvas, so it must
       never take a pointer event — it sits over the very walls and doors you
       would click next, and over empty floor you need to be able to drag on. */
    .fp-dead-space {
      pointer-events: none;
    }
    .area-hit-shape {
      /* Transparent fill turns the whole polygon into a pointer target for
         the whole-shape drag, without covering the translucent room fill
         drawn underneath by renderArea. */
      fill: transparent;
      stroke: none;
      pointer-events: all;
    }
    .area-scope-hint {
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 0 0 6px;
      color: var(--primary-color, #03a9f4);
    }
    .area-scope-hint .link-btn {
      border: none;
      background: none;
      padding: 0 2px;
      font: inherit;
      color: var(--primary-color, #03a9f4);
      text-decoration: underline;
      cursor: pointer;
      flex: 0 0 auto;
    }
    .area-scope-hint ha-icon {
      --mdc-icon-size: 16px;
      flex: 0 0 auto;
    }
    .area-outline {
      fill: none;
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 2;
      pointer-events: none;
    }
    /* The room currently scoping the selected element's entity picker: a
       breathing tint plus marching-ants border, so "you are working inside
       the Kitchen — that's why the picker is short" reads at a glance. */
    .area-scoping {
      fill: var(--primary-color, #03a9f4);
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 2.5;
      stroke-dasharray: 10 6;
      pointer-events: none;
      animation: fp-area-breathe 2.2s ease-in-out infinite,
        fp-area-ants 1.4s linear infinite;
    }
    @keyframes fp-area-breathe {
      0%,
      100% {
        fill-opacity: 0.1;
      }
      50% {
        fill-opacity: 0.28;
      }
    }
    @keyframes fp-area-ants {
      to {
        stroke-dashoffset: -16;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .area-scoping {
        animation: none;
        fill-opacity: 0.2;
      }
    }
    .area-draft-line {
      fill: none;
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 2;
      stroke-dasharray: 6 4;
      pointer-events: none;
    }
    .area-draft-hover {
      fill: none;
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 1.5;
      stroke-dasharray: 3 4;
      opacity: 0.7;
      pointer-events: none;
    }
    .area-draft-point {
      fill: var(--primary-color, #03a9f4);
      stroke: var(--card-background-color, #fff);
      stroke-width: 1.5;
      pointer-events: none;
    }
    .area-draft-start {
      fill: var(--card-background-color, #fff);
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 2;
      pointer-events: none;
    }
    /* Light pools are decoration: they must never intercept a pointer. These
       are filled circles drawn above the areas, so without this they swallow
       pointerdown and areas under a lit lamp cannot be selected (issue #108).
       The blend rules mirror the card's, so the editor previews the same
       picture it will render — overlapping lamps add rather than stack. */
    .fp-glows {
      isolation: isolate;
      pointer-events: none;
    }
    .fp-glow {
      mix-blend-mode: screen;
    }
    /* Radius guide for the selected cast-light device (issue #108). Outline
       only — it shows how far the light reaches without pretending it is on. */
    .glow-guide {
      fill: none;
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 1.5;
      stroke-dasharray: 6 5;
      opacity: 0.7;
      pointer-events: none;
    }
    .tracker-draft {
      fill: var(--primary-color, #03a9f4);
      fill-opacity: 0.08;
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 1.5;
      stroke-dasharray: 6 4;
      pointer-events: none;
    }
    .tracker-marker {
      transition: transform 0.4s ease-out;
      transform-box: fill-box;
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
    .tracker-placeholder {
      opacity: 0.6;
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
    .edit-text {
      position: absolute;
      pointer-events: auto;
      cursor: move;
      white-space: nowrap;
      font-weight: 500;
      line-height: 1;
      padding: 2px;
      touch-action: none;
    }
    .edit-text.selected {
      outline: 1.5px dashed var(--primary-color, #03a9f4);
      outline-offset: 2px;
    }
    ha-icon {
      --mdc-icon-size: 22px;
    }
    /* Icon motion while the entity is active (issue #48) — matches the card. */
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
    .ilabel {
      /* Out of flow, hanging below the badge: the label must not change the
         element's box, so badges anchor on (x, y) whether or not a label
         renders — icons stay aligned (issue #34) and match the card. */
      position: absolute;
      top: calc(100% + 2px);
      left: 50%;
      transform: translateX(-50%);
      font-size: 11px;
      line-height: 1;
      padding: 1px 4px;
      border-radius: 4px;
      background: var(--fp-skin-badge-bg, var(--card-background-color, #fff));
      color: var(--secondary-text-color);
      white-space: nowrap;
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    /* Label beside the badge (issue #180), mirroring the card's own rule so
       moving it here shows what the card will do rather than only what the
       config now says. */
    .ilabel-left,
    .ilabel-right {
      top: 50%;
      transform: translateY(-50%);
    }
    .ilabel-left {
      left: auto;
      right: calc(100% + 4px);
    }
    .ilabel-right {
      left: calc(100% + 4px);
    }
    /* The card's own label line, drawn as the card draws it (issue #135):
       full-strength ink, and no width clamp — the card has none, and clipping
       is exactly what would make a long label look right here and wrong live.
       The unclamped variant is the one you are checking; the dim fallback
       above stays clamped, being editor chrome rather than a preview. */
    .ilabel.live {
      color: var(--fp-skin-text, var(--primary-text-color));
      max-width: none;
      overflow: visible;
    }
    /* An extra-reading row (issue #180): the entity picker takes the space and
       the attribute box stays narrow beside it, the same proportions the
       state-rule rows use for their condition and colour. */
    .item-reading ha-entity-picker,
    .item-reading input[type="text"]:not(.reading-attr) {
      flex: 1 1 auto;
      min-width: 0;
    }
    .item-reading .reading-attr {
      flex: 0 0 130px;
      min-width: 0;
    }
    /* The visibility toggle belongs to the entity row above it, so it sits
       tight under it and the gap goes after the pair instead. */
    .reading-show {
      margin-top: -4px;
      margin-bottom: 12px;
      padding-left: 4px;
    }
    .reading-show label {
      flex: 0 0 auto;
      font-size: 12px;
      /* Holds the checkbox it wraps, so the pair reads as one control and the
         whole thing is a click target. */
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }
    /* The panel ("Project" config) and the new element-edit area share the
       same boxed look so the two sections below the canvas read as siblings. */
    .panel,
    .edit-area {
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 8px;
      padding: 10px;
    }
    .section-title {
      margin: 0 0 8px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--secondary-text-color);
    }
    /* Element header: kind icon + summary + the selection's actions.
       The actions are the fixed part and the summary is the elastic one: a
       device named after a long entity id used to push Duplicate and Delete
       off the panel entirely (issue #163), which is unreachable rather than
       merely ugly. So everything but the title refuses to shrink, and the
       title truncates instead — its full text stays available on hover. */
    .fp-guide {
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 1;
      stroke-dasharray: 6 4;
      vector-effect: non-scaling-stroke;
      pointer-events: none;
    }
    .fp-ctx {
      position: fixed;
      z-index: 20;
      display: flex;
      flex-direction: column;
      min-width: 180px;
      padding: 4px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    }
    .fp-ctx button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 10px;
      border: 0;
      background: none;
      color: var(--primary-text-color);
      font: inherit;
      text-align: left;
      cursor: pointer;
      border-radius: 4px;
    }
    .fp-ctx button:hover {
      background: var(--secondary-background-color);
    }
    .fp-ctx button.danger {
      color: var(--error-color, #db4437);
    }
    .fp-ctx ha-icon {
      --mdc-icon-size: 18px;
    }
    .fp-ctx-empty {
      padding: 6px 10px;
      color: var(--secondary-text-color);
    }
    .fp-tpl {
      display: flex;
      gap: 6px;
      margin: 4px 0;
    }
    .fp-tpl button:first-child {
      flex: 1;
      text-align: left;
    }
    .edit-head {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
    }
    .edit-head ha-icon {
      --mdc-icon-size: 18px;
      color: var(--secondary-text-color);
      flex: none;
    }
    .edit-head .edit-title {
      font-size: 13px;
      font-weight: 600;
      /* min-width:0 is what lets a flex item shrink below its content. */
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .edit-head .head-spacer {
      /* Grows to push the actions right, but never shrinks the title away
         while there is still slack of its own to give back. */
      flex: 1 1 0;
      min-width: 0;
    }
    .edit-head button {
      display: inline-flex;
      align-items: center;
      padding: 4px 8px;
      flex: none;
    }
    .edit-head button ha-icon {
      --mdc-icon-size: 16px;
      color: inherit;
    }
    /* Lock in place (issue #191). The pressed state has to read at a glance:
       it is the only one of these buttons that describes a state rather than
       performing an action, and "why won't this drag" is the question it
       exists to answer. */
    .edit-head button.on {
      color: var(--primary-color);
    }
    /* Collapsible Project section header. */
    .section-toggle {
      display: flex;
      align-items: center;
      gap: 6px;
      width: 100%;
      border: none;
      background: none;
      padding: 2px 0;
      margin: 0;
      cursor: pointer;
      color: var(--secondary-text-color);
      text-align: left;
    }
    .section-toggle ha-icon {
      --mdc-icon-size: 16px;
    }
    .section-toggle .section-title-inline {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .section-toggle .section-summary {
      font-size: 12px;
      color: var(--secondary-text-color);
      opacity: 0.8;
      text-transform: none;
    }
    .panel-body {
      margin-top: 10px;
    }
    /* Field rows flow into responsive columns so the below-canvas sections
       stay short at HA-dialog width (~700px fits two columns). Rows that
       need the full width (entity pickers, long hints) opt out via .wide. */
    .rows {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      column-gap: 16px;
      align-items: start;
    }
    .rows .row.wide,
    .rows > .hint,
    .rows > p {
      grid-column: 1 / -1;
    }
    /* ---- Element panel groups --------------------------------------------
       The device panel is two dozen controls; ungrouped, finding one meant
       reading all of them. Each group is a heading and a hairline above it,
       with real space between groups so the eye can skip a whole section it
       does not want.

       The rule is on the group rather than between them, and the first group
       drops it: a line above the very first heading would read as a border
       around the panel rather than as a separator inside it. */
    .cfg-group {
      border-top: 1px solid var(--divider-color, #e0e0e0);
      padding-top: 14px;
      margin-top: 18px;
    }
    /* A collapsed group is one line, and a column of one-line headings wants
       to read as a list rather than as eight things with a gap each. */
    .cfg-group:not(.open) {
      padding-top: 8px;
      margin-top: 8px;
    }
    /* Ties with the rule above on specificity, so it has to stay below it:
       the first group leads the panel and takes no space above it whether it
       is open or shut. */
    .cfg-group:first-of-type {
      border-top: none;
      padding-top: 0;
      margin-top: 0;
    }
    /* The heading names the group without competing with the field labels
       beneath it: same size, but the primary ink and a little letter-spacing,
       so it reads as a heading rather than as one more row label.

       It is also the group's disclosure control, so it undoes the panel's
       generic button look (border, chip padding, capitalize — which would
       print "What it reads" as "What It Reads") and keeps the heading's own
       type. Full width so the whole line is the hit target, not just the
       glyph. */
    .cfg-group-title {
      display: flex;
      align-items: center;
      gap: 4px;
      width: 100%;
      margin: 0 0 10px;
      padding: 2px 0;
      border: none;
      border-radius: 0;
      background: none;
      cursor: pointer;
      text-align: left;
      text-transform: none;
      font: inherit;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.02em;
      color: var(--primary-text-color);
    }
    /* The chevron is the affordance, so it stays quieter than the title it
       points at. */
    .cfg-group-title ha-icon {
      --mdc-icon-size: 18px;
      flex: none;
      color: var(--secondary-text-color);
    }
    /* ha-form packs its own fields tightly; the last one in a group should not
       sit flush against the next group's rule. */
    .cfg-group > *:last-child {
      margin-bottom: 0;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 8px;
    }
    .row label {
      flex: 0 0 90px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .row input[type="text"],
    .row input[type="number"],
    .row select {
      flex: 1;
      min-width: 0;
      padding: 4px 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
    }
    ha-entity-picker,
    ha-icon-picker,
    ha-combo-box {
      flex: 1;
      min-width: 0;
    }
    .row input.num {
      flex: 0 0 64px;
    }
    /* Paste-a-symbol block (issue #90): a stacked row, since a JSON blob does
       not fit the label-then-control shape the rest of the panel uses. */
    .row.col {
      flex-direction: column;
      align-items: stretch;
    }
    .row.col > label {
      flex: none;
      margin-bottom: 2px;
    }
    .symbol-input {
      width: 100%;
      box-sizing: border-box;
      padding: 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-family: var(--code-font-family, ui-monospace, monospace);
      font-size: 11px;
      resize: vertical;
    }
    .symbol-list {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-bottom: 6px;
    }
    .symbol-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 6px;
      border-radius: 10px;
      font-size: 11px;
      background: var(--secondary-background-color, #f2f2f2);
      color: var(--primary-text-color);
    }
    .symbol-chip button.chip-x {
      border: none;
      background: none;
      padding: 0;
      font-size: 11px;
      line-height: 1;
      color: var(--secondary-text-color);
    }
    .symbol-actions button[disabled] {
      opacity: 0.5;
      cursor: default;
    }
    .symbol-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-top: 6px;
      font-size: 12px;
    }
    .symbol-actions a {
      color: var(--secondary-text-color);
    }
    .symbol-error {
      margin-top: 4px;
      font-size: 11px;
      color: var(--error-color, #c62828);
    }
    /* Compact inline checkbox+label used inside a .row that already has its
       primary <label> on the left (e.g. the Tracker sensor "invert" toggle). */
    .row .inline-check {
      flex: 0 0 auto;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .hint {
      font-size: 13px;
      color: var(--secondary-text-color);
      line-height: 1.5;
    }
    /* The Area name's status line (Linked chip / hint). It sits on its own row
       under the field rather than beside it: the docked inspector is only
       340px wide in full screen, and a chip + hint sharing that row squeezed
       the name box down to a sliver. The empty label keeps it aligned with the
       field above, and -4px claws back the row's own bottom margin so the pair
       still reads as one control. */
    .area-name-status {
      margin-top: -4px;
    }
    /* "Color by state" rules (issues #68, #79, #82). The rules are a list, so
       they read as one group indented under the heading row rather than as
       more loose fields; the rail is what says "these belong together" in a
       340px panel where indentation alone is too expensive. */
    .state-colors {
      margin-bottom: 4px;
    }
    .state-colors label {
      flex: 1 1 auto;
      font-weight: 500;
    }
    .state-color-rule,
    .state-color-add {
      padding-left: 8px;
      border-left: 2px solid var(--divider-color, #ccc);
      margin-bottom: 6px;
    }
    /* The docked inspector is only 340px wide, so a rule's condition and its
       colour cannot share a line without crushing both. Wrap onto two lines
       instead of squeezing — the fullscreen visibility complaint. */
    .row.state-color-rule {
      flex-wrap: wrap;
      row-gap: 4px;
    }
    .rule-note {
      margin: 0 0 6px;
      font-style: italic;
    }
    /* The canvas preview mirrors the card: a resolved state colour paints the
       badge whether or not the entity reads "on". */
    .edit-item .badge.state-colored {
      background: var(--fp-state);
      border-color: var(--fp-state);
      color: var(--fp-ink, var(--text-primary-color, #212121));
    }
    /* An active device, painted exactly as the card paints it (issue #106):
       the device's active colour, else a colour-capable bulb's own, else the
       theme's active yellow — the same fallback chain as .item.on .badge.
       The canvas previewed none of this before, so setting "Active color"
       changed nothing here and a coloured lamp looked plain. Below
       .state-colored, which is the more specific statement. */
    .edit-item .badge.active-colored {
      background: var(--fp-active, var(--fp-skin-active, var(--state-light-active-color, var(--state-active-color, #fdd835))));
      border-color: var(--fp-active, var(--fp-skin-active, var(--state-light-active-color, var(--state-active-color, #fdd835))));
      color: var(--fp-ink, var(--fp-skin-active-ink, var(--text-primary-color, #212121)));
    }
    /* The off colour, previewed as the card paints it (issue #228). Below
       .active-colored and .state-colored in the same order the card uses. */
    .edit-item .badge.inactive-colored {
      background: var(--fp-inactive);
      border-color: var(--fp-inactive);
      color: var(--fp-ink, var(--text-primary-color, #212121));
    }
    .state-color-rule select {
      flex: 0 0 96px;
    }
    /* Higher specificity than the generic .row input rule above, which would
       otherwise stretch a two-digit threshold across half the panel. */
    .row.state-color-rule input.cond {
      flex: 0 0 90px;
    }
    .row.state-color-rule span.cond {
      flex: 0 0 auto;
      font-size: 12px;
      white-space: nowrap;
    }
    /* The color text box gives up width first — the condition and the swatch
       are what you read, and the swatch already shows the colour. */
    .row.state-color-rule input.rule-color-text {
      flex: 1 1 60px;
      min-width: 60px;
    }
    /* The optional icon (issue #106) takes the rule's second line rather than
       competing for the first: the condition and the colour are what you scan,
       and an icon picker needs room for its name to be readable. */
    .row.state-color-rule .rule-icon {
      flex: 1 1 100%;
      min-width: 0;
    }
    /* Named colours (issue #265). The dropdown is the narrowest control in
       the row and never grows: it holds short names, and the swatch beside it
       is what you actually read the colour off. It is absent entirely on a
       plan with no palette, so these rules cost an unpalettised editor
       nothing. */
    .row select.palette-pick {
      flex: 0 1 96px;
      min-width: 0;
    }
    .palette-panel {
      gap: 6px;
    }
    /* The name leads — it is what the dropdowns elsewhere will show — and the
       colour text box gives up width first, exactly as a state rule's does. */
    .row.palette-row input.palette-name {
      flex: 1 1 90px;
      min-width: 60px;
    }
    .row.palette-row input.palette-color {
      flex: 1 1 60px;
      min-width: 60px;
    }
    .palette-row .rule-remove,
    .state-color-rule .rule-remove,
    .state-color-add button {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 4px;
      background: var(--card-background-color, #fff);
      color: var(--secondary-text-color);
      cursor: pointer;
      padding: 3px 6px;
    }
    .state-color-rule .rule-remove {
      flex: 0 0 auto;
    }
    .state-color-rule .rule-remove ha-icon,
    .state-color-add button ha-icon {
      --mdc-icon-size: 16px;
    }
    .area-name-status label {
      /* Alignment spacer only — nothing to announce. */
      flex: 0 0 90px;
    }
    /* "Linked" badge on the Area name row: the HA-area association is implied
       by the name matching, so it needs to be visible somewhere. */
    .ha-link-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 4px 2px 8px;
      border-radius: 999px;
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
    }
    .ha-link-chip ha-icon {
      --mdc-icon-size: 14px;
    }
    .ha-link-chip .unlink {
      display: inline-flex;
      align-items: center;
      padding: 0;
      border: none;
      background: none;
      color: inherit;
      cursor: pointer;
      opacity: 0.85;
    }
    .ha-link-chip .unlink:hover {
      opacity: 1;
    }
  `
];
P([
  A({ attribute: !1 })
], I.prototype, "hass", 2);
P([
  k()
], I.prototype, "_config", 2);
P([
  k()
], I.prototype, "_tool", 2);
P([
  k()
], I.prototype, "_selection", 2);
P([
  k()
], I.prototype, "_activeFloorId", 2);
P([
  k()
], I.prototype, "_draft", 2);
P([
  k()
], I.prototype, "_draftTracker", 2);
P([
  k()
], I.prototype, "_areaShape", 2);
P([
  k()
], I.prototype, "_draftArea", 2);
P([
  k()
], I.prototype, "_areaHover", 2);
P([
  k()
], I.prototype, "_freeWalls", 2);
P([
  k()
], I.prototype, "_defaultOpeningLength", 2);
P([
  k()
], I.prototype, "_marquee", 2);
P([
  k()
], I.prototype, "_history", 2);
P([
  k()
], I.prototype, "_future", 2);
P([
  k()
], I.prototype, "_zoom", 2);
P([
  k()
], I.prototype, "_floorMenuOpen", 2);
P([
  k()
], I.prototype, "_addMenuOpen", 2);
P([
  k()
], I.prototype, "_addQuery", 2);
P([
  k()
], I.prototype, "_symbolDraft", 2);
P([
  k()
], I.prototype, "_symbolError", 2);
P([
  k()
], I.prototype, "_paletteError", 2);
P([
  k()
], I.prototype, "_projectOpen", 2);
P([
  k()
], I.prototype, "_openGroups", 2);
P([
  k()
], I.prototype, "_fullscreen", 2);
P([
  k()
], I.prototype, "_applyState", 2);
P([
  k()
], I.prototype, "_applyError", 2);
P([
  bt(".editor")
], I.prototype, "_editorEl", 2);
P([
  bt("svg")
], I.prototype, "_svg", 2);
P([
  bt(".canvas-wrap")
], I.prototype, "_canvasWrap", 2);
P([
  k()
], I.prototype, "_hideLabels", 2);
P([
  k()
], I.prototype, "_guides", 2);
P([
  k()
], I.prototype, "_ctx", 2);
I = P([
  Li("fp-ef-editor")
], I);
const fy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get FloorplanCardEditor() {
    return I;
  }
}, Symbol.toStringTag, { value: "Module" }));
var my = Object.defineProperty, gy = Object.getOwnPropertyDescriptor, et = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? gy(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && my(t, i, o), o;
};
const yy = /* @__PURE__ */ new Set(["light", "switch", "fan", "input_boolean", "siren"]), by = 1.35, _y = 34, Va = 380, Za = 700, vy = 0.55;
let xy = 0, Ce = class extends te {
  constructor() {
    super(...arguments), this.popupOpen = !1, this._box = { w: 0, h: 0 }, this._maskId = `fp-wall-mask-${++xy}`;
  }
  connectedCallback() {
    super.connectedCallback(), this._ro = new ResizeObserver(() => this._measure()), this._ro.observe(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._ro?.disconnect();
  }
  updated(e) {
    (e.has("plan") || e.has("floor")) && this._measure();
  }
  /** Größte Box mit dem Seitenverhältnis des Sichtbereichs, die in das Element passt. */
  _measure() {
    if (!this.plan || !this.floor) return;
    const { w: e, h: t } = Sn(this.floor, this.plan), i = getComputedStyle(this), n = this.clientWidth - parseFloat(i.paddingLeft) - parseFloat(i.paddingRight), o = this.clientHeight - parseFloat(i.paddingTop) - parseFloat(i.paddingBottom);
    if (!n || !o) return;
    const s = Math.min(n / e, o / t), r = Math.floor(e * s), a = Math.floor(t * s);
    (r !== this._box.w || a !== this._box.h) && (this._box = { w: r, h: a });
  }
  _emit(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  _onAreaClick(e, t) {
    e.stopPropagation(), this._emit("area-click", { id: t });
  }
  async _onItemClick(e, t) {
    e.stopPropagation();
    const i = t.entity;
    if (!i) return;
    let n = t.tapAction ?? "auto";
    n === "auto" && (mn(i) ? n = "toggle" : n = yy.has(ae(i)) ? "toggle" : "more-info"), n !== "none" && (n === "more-info" ? fi(this, i) : mn(i) ? await yn(this.hass, i) : await lr(this.hass, i));
  }
  _onItemContext(e, t) {
    t.entity && (e.preventDefault(), fi(this, t.entity));
  }
  render() {
    if (!this.plan || !this.floor) return f;
    const e = this.floor, t = Sn(e, this.plan), { w: i, h: n } = t, o = e.areas.find((l) => l.id === this.zoomedAreaId);
    let s = o ? Hl(
      o.points.map((l) => ({ x: l.x - t.x, y: l.y - t.y })),
      i,
      n,
      void 0,
      void 0,
      jl(o)
    ) : kn;
    o && this.popupOpen && s.scale > 1 && (s = this._shiftForPopup(s));
    const r = s.scale > 1 ? by / s.scale : 1, a = Math.max(this.plan.canvas.width, this.plan.canvas.height) / 45;
    return u`
      <div
        class="plan"
        style="width:${this._box.w}px;height:${this._box.h}px"
        @click=${() => this._emit("background-click")}
      >
        <div
          class="plan-zoom"
          style="transform:translate(${s.txPercent}%, ${s.tyPercent}%) scale(${s.scale});--fp-inv-zoom:${r}"
        >
          <svg viewBox="${t.x} ${t.y} ${i} ${n}" preserveAspectRatio="xMidYMid meet">
            <g class="areas">
              ${e.areas.map(
      (l) => _`<g @click=${(c) => this._onAreaClick(c, l.id)}>${Er(l, {
        hass: this.hass,
        selected: l.id === this.zoomedAreaId,
        dimmed: !!o && l.id !== o.id,
        labelSize: a
      })}</g>`
    )}
            </g>
            <g class="furniture-layer">${e.items.map((l) => this._renderFurniture(l))}</g>
            ${oc(e, this.plan, this.hass, `${this._maskId}-glow`)}
            ${Ar(e, this.plan, this._maskId)} ${fc(e, this.plan, { hass: this.hass })}
          </svg>
          <div class="items">
            ${e.items.filter((l) => !Ul(l, o, e.areas)).map((l) => this._renderItem(l, t))}
          </div>
        </div>
      </div>
    `;
  }
  /** Verschiebt den gezoomten Raum in den Bereich, den das Popup frei lässt (links bzw. oben). */
  _shiftForPopup(e) {
    return !this._box.w || !this._box.h ? e : this.clientWidth < Za ? { ...e, tyPercent: e.tyPercent - this.clientHeight * vy / 2 / this._box.h * 100 } : { ...e, txPercent: e.txPercent - (Va + 32) / 2 / this._box.w * 100 };
  }
  _renderFurniture(e) {
    const t = ke(this.plan?.furniture, e.furnitureType);
    return t ? wn(e, t, { fill: br(e, Xe(e.entity ? this.hass.states[e.entity] : void 0)) }) : f;
  }
  _renderItem(e, t) {
    if (!yr(e, this.plan?.furniture)) return f;
    const i = t.w, n = t.h, o = e.entity ? this.hass.states[e.entity] : void 0, s = Xe(o), r = !!e.entity && gn(o), a = e.icon ?? (e.entity ? me(this.hass, e.entity) : "mdi:map-marker"), l = e.size ?? _y, c = s ? e.activeColor ?? "var(--fp-active-color, #ffb300)" : e.color ?? "", h = e.label ?? o?.attributes.friendly_name ?? e.entity ?? "";
    return u`
      <div
        class="item ${s ? "active" : ""} ${r ? "unavailable" : ""} ${e.entity ? "interactive" : ""}"
        style="left:${(e.x - t.x) / i * 100}%;top:${(e.y - t.y) / n * 100}%;--fp-item-size:${l}px;${c ? `--fp-item-color:${c}` : ""}"
        title=${h}
        @click=${(d) => this._onItemClick(d, e)}
        @contextmenu=${(d) => this._onItemContext(d, e)}
      >
        <div class="badge"><ha-icon .icon=${a}></ha-icon></div>
        ${e.label ? u`<div class="label">${e.label}</div>` : f}
        ${e.showState && o ? u`<div class="state">${ar(this.hass, o)}</div>` : f}
      </div>
    `;
  }
};
Ce.styles = [
  Ae(Cr),
  Ae(Zn),
  oe`
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
et([
  A({ attribute: !1 })
], Ce.prototype, "hass", 2);
et([
  A({ attribute: !1 })
], Ce.prototype, "plan", 2);
et([
  A({ attribute: !1 })
], Ce.prototype, "floor", 2);
et([
  A({ attribute: !1 })
], Ce.prototype, "zoomedAreaId", 2);
et([
  A({ type: Boolean })
], Ce.prototype, "popupOpen", 2);
et([
  k()
], Ce.prototype, "_box", 2);
Ce = et([
  Te("fp-plan-view")
], Ce);
var wy = Object.defineProperty, $y = Object.getOwnPropertyDescriptor, Ji = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? $y(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && wy(t, i, o), o;
};
const ky = [
  { kind: "device", title: "Geräte" },
  { kind: "scene", title: "Szenen" },
  { kind: "script", title: "Skripte" }
];
let gt = class extends te {
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
    if (!this.area) return f;
    const e = this.area.sidebar ?? [], t = e.filter((i) => ui(i.entity) === "device" && Xe(this.hass.states[i.entity])).length;
    return u`
      <header>
        <div class="title">
          <h2>${this.area.name || "Raum"}</h2>
          <span class="sub">${e.length ? `${t} aktiv` : ""}</span>
        </div>
        ${this.canEdit ? u`<button class="icon-btn" title="Seitenleiste bearbeiten" @click=${this._edit}>
              <ha-icon icon="mdi:pencil"></ha-icon>
            </button>` : f}
        <button class="icon-btn" title="Schließen" @click=${this._close}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </header>
      <div class="content">
        ${e.length === 0 ? u`<p class="empty">
              Diesem Raum ist noch nichts zugeordnet.${this.canEdit ? u` Im Editor lassen sich Geräte, Szenen und Skripte für die Seitenleiste auswählen.` : f}
            </p>` : ky.map(({ kind: i, title: n }) => {
      const o = e.filter((s) => ui(s.entity) === i);
      return o.length ? u`<section>
                <h3>${n}</h3>
                ${i === "device" ? o.map((s) => this._renderRow(s)) : u`<div class="chips">${o.map((s) => this._renderChip(s))}</div>`}
              </section>` : f;
    })}
      </div>
    `;
  }
  _renderRow(e) {
    const t = this.hass.states[e.entity], i = Xe(t), n = gn(t), o = e.name || jt(this.hass, e.entity), s = ae(e.entity);
    return u`
      <div class="row ${i ? "active" : ""} ${n ? "unavailable" : ""}">
        <button class="row-main" @click=${() => fi(this, e.entity)} title="Details">
          <span class="row-icon"><ha-icon .icon=${me(this.hass, e.entity, e.icon)}></ha-icon></span>
          <span class="row-text">
            <span class="name">${o}</span>
            <span class="state">${ar(this.hass, t)}</span>
          </span>
        </button>
        ${n ? f : s === "cover" ? u`<span class="cover-btns">
              <button class="icon-btn" title="Öffnen" @click=${() => this._call("cover", "open_cover", e.entity)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button class="icon-btn" title="Stopp" @click=${() => this._call("cover", "stop_cover", e.entity)}>
                <ha-icon icon="mdi:stop"></ha-icon>
              </button>
              <button class="icon-btn" title="Schließen" @click=${() => this._call("cover", "close_cover", e.entity)}>
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
            </span>` : mn(e.entity) ? u`<button class="run" @click=${() => yn(this.hass, e.entity)}>Ausführen</button>` : Sl(e.entity) ? u`<button
              class="switch ${i ? "on" : ""}"
              role="switch"
              aria-checked=${i ? "true" : "false"}
              title=${i ? "Ausschalten" : "Einschalten"}
              @click=${() => lr(this.hass, e.entity)}
            >
              <span class="knob"></span>
            </button>` : f}
      </div>
    `;
  }
  _renderChip(e) {
    const t = this.hass.states[e.entity], i = e.name || jt(this.hass, e.entity), n = ae(e.entity) === "script" && t?.state === "on";
    return u`
      <button
        class="chip ${n ? "running" : ""}"
        ?disabled=${gn(t)}
        title=${e.entity}
        @click=${() => yn(this.hass, e.entity)}
        @contextmenu=${(o) => {
      o.preventDefault(), fi(this, e.entity);
    }}
      >
        <ha-icon .icon=${me(this.hass, e.entity, e.icon)}></ha-icon>
        <span>${i}</span>
      </button>
    `;
  }
  _call(e, t, i) {
    this.hass.callService(e, t, { entity_id: i });
  }
};
gt.styles = oe`
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
Ji([
  A({ attribute: !1 })
], gt.prototype, "hass", 2);
Ji([
  A({ attribute: !1 })
], gt.prototype, "area", 2);
Ji([
  A({ type: Boolean })
], gt.prototype, "canEdit", 2);
gt = Ji([
  Te("fp-room-sidebar")
], gt);
var Sy = Object.defineProperty, Ey = Object.getOwnPropertyDescriptor, Xt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ey(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Sy(t, i, o), o;
};
let Ye = class extends te {
  constructor() {
    super(...arguments), this.canEdit = !1, this.sheet = !1, this._onKey = (e) => {
      e.key === "Escape" && this._close();
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._onKey), this._ro = new ResizeObserver(() => this.sheet = this.clientWidth < Za), this._ro.observe(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("keydown", this._onKey), this._ro?.disconnect();
  }
  updated(e) {
    e.has("area") && this.area && this.renderRoot.querySelector(".card")?.focus({ preventScroll: !0 });
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
    ` : f;
  }
};
Ye.styles = oe`
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
      width: ${Va}px;
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
Xt([
  A({ attribute: !1 })
], Ye.prototype, "hass", 2);
Xt([
  A({ attribute: !1 })
], Ye.prototype, "area", 2);
Xt([
  A({ type: Boolean })
], Ye.prototype, "canEdit", 2);
Xt([
  A({ type: Boolean, reflect: !0 })
], Ye.prototype, "sheet", 2);
Ye = Xt([
  Te("fp-room-dialog")
], Ye);
var Ay = Object.defineProperty, My = Object.getOwnPropertyDescriptor, Pe = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? My(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Ay(t, i, o), o;
};
const Cy = "floorplan_panel", er = 800, Ty = "custom:fp-ef-card";
function Iy(e) {
  return e?.ef ? structuredClone(e.ef) : { type: Ty };
}
let ye = class extends te {
  constructor() {
    super(...arguments), this.revision = 0, this.edit = !1, this.narrow = !1, this._status = "", this._error = "", this._saving = !1, this._rev = 0, this._onConfigChanged = (e) => {
      const t = e.detail?.config;
      t && (e.stopPropagation(), this._pending = t, clearTimeout(this._timer), this._timer = setTimeout(() => void this._flush(), er));
    }, this._onAreaTap = (e) => {
      const { areaId: t, zoomed: i } = e.detail, n = this.plan?.ef, o = [...(n?.floors ?? []).map((r) => r.areas ?? []), n?.areas ?? []], s = i ? o.flat().find((r) => r?.id === t) : void 0;
      this._room = s && s.sidebar?.length ? { ...s, name: s.name ?? "", sidebar: s.sidebar } : void 0;
    };
  }
  // Aussehen eines hui-dialog-edit-card für editor-save.ts
  get _params() {
    return { saveCardConfig: (e) => this._saveNow(e), isNew: !1 };
  }
  get _cardConfig() {
    return this._pending ?? this._plan?.ef;
  }
  willUpdate(e) {
    (e.has("plan") || e.has("revision")) && (this._plan = this.plan, this._rev = this.revision);
  }
  updated(e) {
    const t = this.renderRoot.querySelector("fp-ef-card, fp-ef-editor");
    t && (t.hass = this.hass, (this._loadedEl !== t || !this.edit && e.has("plan")) && (this._loadedEl = t, t.setConfig(Iy(this.plan))));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._pending && this._flush();
  }
  async _flush() {
    if (clearTimeout(this._timer), !this._pending || this._saving) {
      this._pending && (this._timer = setTimeout(() => void this._flush(), er));
      return;
    }
    const e = this._pending;
    this._pending = void 0, await this._saveNow(e);
  }
  async _saveNow(e) {
    this._saving = !0, this._status = "saving", this._error = "";
    try {
      const t = await this.hass.callWS({
        type: `${Cy}/plan/save`,
        plan: { ...this._plan ?? {}, ef: e },
        revision: this._rev
      });
      this._plan = t.plan, this._rev = t.revision, this._status = "saved", this.dispatchEvent(
        new CustomEvent("ef-saved", { detail: { plan: t.plan, revision: t.revision }, bubbles: !0, composed: !0 })
      );
    } catch (t) {
      throw this._status = "error", this._error = t?.code === "conflict" ? "Der Grundriss wurde inzwischen woanders geändert – bitte neu laden." : t?.message ?? String(t), t;
    } finally {
      this._saving = !1;
    }
  }
  async _close() {
    if (this._pending)
      try {
        await this._flush();
      } catch {
        return;
      }
    this.dispatchEvent(new CustomEvent("ef-close", { bubbles: !0, composed: !0 }));
  }
  render() {
    return this.edit ? u`
      <div class="bar">
        <button @click=${this._close}>Fertig</button>
        <span class="status ${this._status}">
          ${this._status === "saving" ? "Speichert …" : this._status === "saved" ? "Gespeichert" : this._error}
        </span>
      </div>
      <fp-ef-editor @config-changed=${this._onConfigChanged}></fp-ef-editor>
      ${f}
    ` : u`<fp-ef-card @fp-area-tap=${this._onAreaTap}></fp-ef-card>
        ${this._room ? u`<fp-room-dialog .hass=${this.hass} .area=${this._room} @close=${() => this._room = void 0}></fp-room-dialog>` : f}`;
  }
};
ye.styles = oe`
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    fp-ef-card,
    fp-ef-editor {
      flex: 1;
      display: block;
      overflow: auto;
    }
    .bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 12px;
      border-bottom: 1px solid var(--divider-color);
    }
    .bar button {
      font: inherit;
      border: 1px solid var(--primary-color);
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      border-radius: 16px;
      padding: 4px 16px;
      cursor: pointer;
    }
    .status {
      color: var(--secondary-text-color);
      font-size: 13px;
    }
    .status.error {
      color: var(--error-color, #db4437);
    }
  `;
Pe([
  A({ attribute: !1 })
], ye.prototype, "hass", 2);
Pe([
  A({ attribute: !1 })
], ye.prototype, "plan", 2);
Pe([
  A({ type: Number })
], ye.prototype, "revision", 2);
Pe([
  A({ type: Boolean })
], ye.prototype, "edit", 2);
Pe([
  A({ attribute: !1 })
], ye.prototype, "narrow", 2);
Pe([
  k()
], ye.prototype, "_status", 2);
Pe([
  k()
], ye.prototype, "_error", 2);
Pe([
  k()
], ye.prototype, "_room", 2);
ye = Pe([
  Te("fp-ef-host")
], ye);
var Py = Object.defineProperty, Oy = Object.getOwnPropertyDescriptor, he = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Oy(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Py(t, i, o), o;
};
const fn = "floorplan_panel";
let se = class extends te {
  constructor() {
    super(...arguments), this.narrow = !1, this._ef = localStorage.getItem("fp-ef") === "1" ? "view" : "", this._revision = 0, this._editing = !1, this._loading = !1;
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
      const e = await this.hass.callWS({ type: `${fn}/plan/get` });
      this._setPlan(e.plan, e.revision), this._unsub || (this._unsub = await this.hass.connection.subscribeMessage((t) => this._onEvent(t), {
        type: `${fn}/subscribe`
      }));
    } catch (e) {
      this._error = e?.message ?? String(e);
    } finally {
      this._loading = !1;
    }
  }
  _setPlan(e, t) {
    const i = xn(e);
    this._raw = e, this._plan = i, this._revision = t, i.floors.some((o) => o.id === this._floorId) || (this._floorId = i.floors[0]?.id), i.floors.find((o) => o.id === this._floorId)?.areas.some((o) => o.id === this._zoomedAreaId) || (this._zoomedAreaId = void 0);
  }
  async _onEvent(e) {
    e.type === "plan_updated" ? e.revision !== this._revision && !this._editing && await this._load() : e.type === "show_room" ? this._showRoom(e.room, e.floor ?? void 0) : e.type === "reset_view" && (this._zoomedAreaId = void 0);
  }
  _showRoom(e, t) {
    if (!this._plan || this._editing) return;
    const i = e.toLowerCase();
    for (const n of this._plan.floors) {
      if (t && n.id !== t) continue;
      const o = n.areas.find((s) => s.id === e || s.name.toLowerCase() === i);
      if (o) {
        this._floorId = n.id, this._zoomedAreaId = o.id;
        return;
      }
    }
  }
  get _isAdmin() {
    return !!this.hass?.user?.is_admin;
  }
  _onAreaClick(e) {
    this._zoomedAreaId = this._zoomedAreaId === e.detail.id ? void 0 : e.detail.id;
  }
  /** Öffnet/schließt die HA-Seitenleiste (auf schmalen Bildschirmen). */
  _toggleMenu() {
    this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: !0, composed: !0 }));
  }
  _openEditor(e) {
    this._editRoomId = e, this._editing = !0;
  }
  _onEditorDone(e) {
    e.detail?.plan && e.detail.revision !== void 0 && this._setPlan(e.detail.plan, e.detail.revision), this._editing = !1, this._editRoomId = void 0;
  }
  async _loadSample() {
    try {
      const e = await this.hass.callWS({ type: `${fn}/plan/load_sample` });
      this._setPlan(e.plan, e.revision);
    } catch (e) {
      this._error = e?.message ?? String(e);
    }
  }
  _toggleEf() {
    this._ef = this._ef ? "" : "view", localStorage.setItem("fp-ef", this._ef ? "1" : "0");
  }
  _onEfSaved(e) {
    this._setPlan(e.detail.plan, e.detail.revision);
  }
  render() {
    if (this._ef && this._raw)
      return u`
        <div class="toolbar">
          ${this.narrow ? u`<button class="icon-btn" title="Menü" @click=${this._toggleMenu}><ha-icon icon="mdi:menu"></ha-icon></button>` : u`<span class="spacer"></span>`}
          <div class="main-title">Grundriss (easy-floorplan-Port)</div>
          ${this._isAdmin && this._ef === "view" ? u`<button class="icon-btn" title="Bearbeiten" @click=${() => this._ef = "edit"}>
                <ha-icon icon="mdi:pencil-ruler"></ha-icon>
              </button>` : f}
          <button class="icon-btn" title="Zum bisherigen Grundriss wechseln" @click=${this._toggleEf}>
            <ha-icon icon="mdi:swap-horizontal"></ha-icon>
          </button>
        </div>
        <fp-ef-host
          .hass=${this.hass}
          .plan=${this._raw}
          .revision=${this._revision}
          .edit=${this._ef === "edit"}
          @ef-saved=${this._onEfSaved}
          @ef-close=${() => this._ef = "view"}
        ></fp-ef-host>
      `;
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
    const e = this._plan, t = e?.floors.find((o) => o.id === this._floorId), i = t?.areas.find((o) => o.id === this._zoomedAreaId), n = !!t && !t.walls.length && !t.areas.length && !t.items.length;
    return u`
      <div class="toolbar">
        ${this.narrow ? u`<button class="icon-btn" title="Menü" @click=${this._toggleMenu}><ha-icon icon="mdi:menu"></ha-icon></button>` : u`<span class="spacer"></span>`}
        <div class="main-title">Grundriss</div>
        ${e && e.floors.length > 1 ? u`<div class="floors">
              ${e.floors.map(
      (o) => u`<button
                  class="floor-btn ${o.id === this._floorId ? "active" : ""}"
                  @click=${() => {
        this._floorId = o.id, this._zoomedAreaId = void 0;
      }}
                >
                  ${o.name || o.id}
                </button>`
    )}
            </div>` : f}
        <button class="icon-btn" title="Zum easy-floorplan-Port wechseln" @click=${this._toggleEf}>
          <ha-icon icon="mdi:swap-horizontal"></ha-icon>
        </button>
        ${this._isAdmin && e ? u`<button class="icon-btn" title="Grundriss bearbeiten" @click=${() => this._openEditor()}>
              <ha-icon icon="mdi:pencil-ruler"></ha-icon>
            </button>` : f}
      </div>
      ${this._error ? u`<div class="message error">Grundriss konnte nicht geladen werden: ${this._error}</div>` : e ? !t || n ? u`<div class="message">
            <ha-icon icon="mdi:floor-plan" class="big"></ha-icon>
            <p>Noch kein Grundriss gezeichnet.</p>
            ${this._isAdmin ? u`<div class="actions">
                  <button class="primary" @click=${() => this._openEditor()}>Editor öffnen</button>
                  <button @click=${this._loadSample}>Beispiel-Grundriss laden</button>
                </div>` : u`<p>Ein Administrator kann ihn im Editor anlegen.</p>`}
          </div>` : u`<div class="body">
            <fp-plan-view
              .hass=${this.hass}
              .plan=${e}
              .floor=${t}
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
                  @edit-room=${(o) => this._openEditor(o.detail.id)}
                ></fp-room-dialog>` : f}
          </div>` : u`<div class="message">Lade …</div>`}
    `;
  }
};
se.styles = oe`
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
    fp-ef-host {
      flex: 1;
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
he([
  A({ attribute: !1 })
], se.prototype, "hass", 2);
he([
  A({ type: Boolean, reflect: !0 })
], se.prototype, "narrow", 2);
he([
  A({ attribute: !1 })
], se.prototype, "panel", 2);
he([
  k()
], se.prototype, "_plan", 2);
he([
  k()
], se.prototype, "_raw", 2);
he([
  k()
], se.prototype, "_ef", 2);
he([
  k()
], se.prototype, "_revision", 2);
he([
  k()
], se.prototype, "_floorId", 2);
he([
  k()
], se.prototype, "_zoomedAreaId", 2);
he([
  k()
], se.prototype, "_editing", 2);
he([
  k()
], se.prototype, "_editRoomId", 2);
he([
  k()
], se.prototype, "_error", 2);
se = he([
  Te("floorplan-panel")
], se);
