var Ic = Object.defineProperty;
var Pc = (e, t, i) => t in e ? Ic(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var $e = (e, t, i) => Pc(e, typeof t != "symbol" ? t + "" : t, i);
function Ge(e) {
  return (t) => {
    customElements.get(e) || customElements.define(e, t);
  };
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ci = globalThis, Fo = Ci.ShadowRoot && (Ci.ShadyCSS === void 0 || Ci.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ro = Symbol(), Cr = /* @__PURE__ */ new WeakMap();
let ua = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Ro) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Fo && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Cr.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Cr.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Be = (e) => new ua(typeof e == "string" ? e : e + "", void 0, Ro), fe = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, o, r) => n + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[r + 1], e[0]);
  return new ua(i, e, Ro);
}, Oc = (e, t) => {
  if (Fo) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), o = Ci.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, e.appendChild(n);
  }
}, Mr = Fo ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return Be(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Lc, defineProperty: Fc, getOwnPropertyDescriptor: Rc, getOwnPropertyNames: zc, getOwnPropertySymbols: Nc, getPrototypeOf: Dc } = Object, dn = globalThis, Ir = dn.trustedTypes, Hc = Ir ? Ir.emptyScript : "", Uc = dn.reactiveElementPolyfillSupport, ni = (e, t) => e, Ni = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Hc : null;
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
} }, zo = (e, t) => !Lc(e, t), Pr = { attribute: !0, type: String, converter: Ni, reflect: !1, useDefault: !1, hasChanged: zo };
Symbol.metadata ??= Symbol("metadata"), dn.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let wt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Pr) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(t, n, i);
      o !== void 0 && Fc(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: o, set: r } = Rc(this.prototype, t) ?? { get() {
      return this[i];
    }, set(s) {
      this[i] = s;
    } };
    return { get: o, set(s) {
      const a = o?.call(this);
      r?.call(this, s), this.requestUpdate(t, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Pr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ni("elementProperties"))) return;
    const t = Dc(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ni("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ni("properties"))) {
      const i = this.properties, n = [...zc(i), ...Nc(i)];
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
      for (const o of n) i.unshift(Mr(o));
    } else t !== void 0 && i.push(Mr(t));
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
    return Oc(t, this.constructor.elementStyles), t;
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
      const r = (n.converter?.toAttribute !== void 0 ? n.converter : Ni).toAttribute(i, n.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const r = n.getPropertyOptions(o), s = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : Ni;
      this._$Em = o;
      const a = s.fromAttribute(i, r.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, o = !1, r) {
    if (t !== void 0) {
      const s = this.constructor;
      if (o === !1 && (r = this[t]), n ??= s.getPropertyOptions(t), !((n.hasChanged ?? zo)(r, i) || n.useDefault && n.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: o, wrapped: r }, s) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, s ?? i ?? this[t]), r !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, r] of n) {
        const { wrapped: s } = r, a = this[o];
        s !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, r, a);
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
wt.elementStyles = [], wt.shadowRootOptions = { mode: "open" }, wt[ni("elementProperties")] = /* @__PURE__ */ new Map(), wt[ni("finalized")] = /* @__PURE__ */ new Map(), Uc?.({ ReactiveElement: wt }), (dn.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const No = globalThis, Or = (e) => e, Di = No.trustedTypes, Lr = Di ? Di.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, fa = "$lit$", Ye = `lit$${Math.random().toFixed(9).slice(2)}$`, ma = "?" + Ye, Bc = `<${ma}>`, ct = document, hi = () => ct.createComment(""), pi = (e) => e === null || typeof e != "object" && typeof e != "function", Do = Array.isArray, jc = (e) => Do(e) || typeof e?.[Symbol.iterator] == "function", Ln = `[ 	
\f\r]`, qt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Fr = /-->/g, Rr = />/g, it = RegExp(`>|${Ln}(?:([^\\s"'>=/]+)(${Ln}*=${Ln}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), zr = /'/g, Nr = /"/g, ga = /^(?:script|style|textarea|title)$/i, ya = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), u = ya(1), _ = ya(2), Le = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), Dr = /* @__PURE__ */ new WeakMap(), st = ct.createTreeWalker(ct, 129);
function ba(e, t) {
  if (!Do(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Lr !== void 0 ? Lr.createHTML(t) : t;
}
const Wc = (e, t) => {
  const i = e.length - 1, n = [];
  let o, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = qt;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let c, h, d = -1, p = 0;
    for (; p < l.length && (s.lastIndex = p, h = s.exec(l), h !== null); ) p = s.lastIndex, s === qt ? h[1] === "!--" ? s = Fr : h[1] !== void 0 ? s = Rr : h[2] !== void 0 ? (ga.test(h[2]) && (o = RegExp("</" + h[2], "g")), s = it) : h[3] !== void 0 && (s = it) : s === it ? h[0] === ">" ? (s = o ?? qt, d = -1) : h[1] === void 0 ? d = -2 : (d = s.lastIndex - h[2].length, c = h[1], s = h[3] === void 0 ? it : h[3] === '"' ? Nr : zr) : s === Nr || s === zr ? s = it : s === Fr || s === Rr ? s = qt : (s = it, o = void 0);
    const f = s === it && e[a + 1].startsWith("/>") ? " " : "";
    r += s === qt ? l + Bc : d >= 0 ? (n.push(c), l.slice(0, d) + fa + l.slice(d) + Ye + f) : l + Ye + (d === -2 ? a : f);
  }
  return [ba(e, r + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class ui {
  constructor({ strings: t, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let r = 0, s = 0;
    const a = t.length - 1, l = this.parts, [c, h] = Wc(t, i);
    if (this.el = ui.createElement(c, n), st.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = st.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(fa)) {
          const p = h[s++], f = o.getAttribute(d).split(Ye), m = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: r, name: m[2], strings: f, ctor: m[1] === "." ? Kc : m[1] === "?" ? qc : m[1] === "@" ? Vc : hn }), o.removeAttribute(d);
        } else d.startsWith(Ye) && (l.push({ type: 6, index: r }), o.removeAttribute(d));
        if (ga.test(o.tagName)) {
          const d = o.textContent.split(Ye), p = d.length - 1;
          if (p > 0) {
            o.textContent = Di ? Di.emptyScript : "";
            for (let f = 0; f < p; f++) o.append(d[f], hi()), st.nextNode(), l.push({ type: 2, index: ++r });
            o.append(d[p], hi());
          }
        }
      } else if (o.nodeType === 8) if (o.data === ma) l.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(Ye, d + 1)) !== -1; ) l.push({ type: 7, index: r }), d += Ye.length - 1;
      }
      r++;
    }
  }
  static createElement(t, i) {
    const n = ct.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Lt(e, t, i = e, n) {
  if (t === Le) return t;
  let o = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const r = pi(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== r && (o?._$AO?.(!1), r === void 0 ? o = void 0 : (o = new r(e), o._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = o : i._$Cl = o), o !== void 0 && (t = Lt(e, o._$AS(e, t.values), o, n)), t;
}
class Gc {
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
    const { el: { content: i }, parts: n } = this._$AD, o = (t?.creationScope ?? ct).importNode(i, !0);
    st.currentNode = o;
    let r = st.nextNode(), s = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let c;
        l.type === 2 ? c = new Ut(r, r.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (c = new Yc(r, this, t)), this._$AV.push(c), l = n[++a];
      }
      s !== l?.index && (r = st.nextNode(), s++);
    }
    return st.currentNode = ct, o;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class Ut {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, n, o) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = Lt(this, t, i), pi(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== Le && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : jc(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && pi(this._$AH) ? this._$AA.nextSibling.data = t : this.T(ct.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = ui.createElement(ba(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const r = new Gc(o, this), s = r.u(this.options);
      r.p(i), this.T(s), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = Dr.get(t.strings);
    return i === void 0 && Dr.set(t.strings, i = new ui(t)), i;
  }
  k(t) {
    Do(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const r of t) o === i.length ? i.push(n = new Ut(this.O(hi()), this.O(hi()), this, this.options)) : n = i[o], n._$AI(r), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Or(t).nextSibling;
      Or(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class hn {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, o, r) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = g;
  }
  _$AI(t, i = this, n, o) {
    const r = this.strings;
    let s = !1;
    if (r === void 0) t = Lt(this, t, i, 0), s = !pi(t) || t !== this._$AH && t !== Le, s && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = r[0], l = 0; l < r.length - 1; l++) c = Lt(this, a[n + l], i, l), c === Le && (c = this._$AH[l]), s ||= !pi(c) || c !== this._$AH[l], c === g ? t = g : t !== g && (t += (c ?? "") + r[l + 1]), this._$AH[l] = c;
    }
    s && !o && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Kc extends hn {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class qc extends hn {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class Vc extends hn {
  constructor(t, i, n, o, r) {
    super(t, i, n, o, r), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Lt(this, t, i, 0) ?? g) === Le) return;
    const n = this._$AH, o = t === g && n !== g || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, r = t !== g && (n === g || o);
    o && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Yc {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Lt(this, t);
  }
}
const Zc = { I: Ut }, Xc = No.litHtmlPolyfillSupport;
Xc?.(ui, Ut), (No.litHtmlVersions ??= []).push("3.3.3");
const Qc = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const r = i?.renderBefore ?? null;
    n._$litPart$ = o = new Ut(t.insertBefore(hi(), r), r, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ho = globalThis;
let le = class extends wt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Qc(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Le;
  }
};
le._$litElement$ = !0, le.finalized = !0, Ho.litElementHydrateSupport?.({ LitElement: le });
const Jc = Ho.litElementPolyfillSupport;
Jc?.({ LitElement: le });
(Ho.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pn = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ed = { attribute: !0, type: String, converter: Ni, reflect: !1, hasChanged: zo }, td = (e = ed, t, i) => {
  const { kind: n, metadata: o } = i;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(i.name, e), n === "accessor") {
    const { name: s } = i;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(s, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(s, void 0, e, a), a;
    } };
  }
  if (n === "setter") {
    const { name: s } = i;
    return function(a) {
      const l = this[s];
      t.call(this, a), this.requestUpdate(s, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function A(e) {
  return (t, i) => typeof i == "object" ? td(e, t, i) : ((n, o, r) => {
    const s = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, n), s ? Object.getOwnPropertyDescriptor(o, r) : void 0;
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
const id = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Bt(e, t) {
  return (i, n, o) => {
    const r = (s) => s.renderRoot?.querySelector(e) ?? null;
    return id(i, n, { get() {
      return r(this);
    } });
  };
}
const ye = (e) => e.split(".")[0], nd = /* @__PURE__ */ new Set([
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
]), od = /* @__PURE__ */ new Set(["scene", "script", "button", "input_button"]);
function Hi(e) {
  const t = ye(e);
  return t === "scene" ? "scene" : t === "script" ? "script" : "device";
}
function rd(e) {
  return nd.has(ye(e));
}
function eo(e) {
  return od.has(ye(e));
}
function dt(e) {
  if (!e) return !1;
  const t = e.state;
  if (t === "unavailable" || t === "unknown") return !1;
  switch (ye(e.entity_id)) {
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
function to(e) {
  return !e || e.state === "unavailable";
}
function fi(e, t) {
  return e.states[t]?.attributes.friendly_name ?? t;
}
function _a(e, t) {
  if (!t) return "nicht gefunden";
  if (e.formatEntityState)
    try {
      return e.formatEntityState(t);
    } catch {
    }
  const i = t.attributes.unit_of_measurement;
  return i ? `${t.state} ${i}` : t.state;
}
const sd = {
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
function Ae(e, t, i) {
  if (i) return i;
  const n = e.states[t]?.attributes.icon;
  return n || (sd[ye(t)] ?? "mdi:help-circle-outline");
}
async function va(e, t) {
  const i = ye(t), n = e.states[t];
  i === "lock" ? await e.callService("lock", n?.state === "locked" ? "unlock" : "lock", { entity_id: t }) : i === "cover" ? await e.callService("cover", "toggle", { entity_id: t }) : await e.callService("homeassistant", "toggle", { entity_id: t });
}
async function io(e, t) {
  const i = ye(t);
  i === "scene" ? await e.callService("scene", "turn_on", { entity_id: t }) : i === "script" ? await e.callService("script", "turn_on", { entity_id: t }) : (i === "button" || i === "input_button") && await e.callService(i, "press", { entity_id: t });
}
function Ui(e, t) {
  e.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: t }, bubbles: !0, composed: !0 }));
}
var ad = Object.defineProperty, ld = Object.getOwnPropertyDescriptor, Me = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? ld(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && ad(t, i, o), o;
};
const cd = 60;
let _e = class extends le {
  constructor() {
    super(...arguments), this.value = "", this.domains = [], this.exclude = [], this.placeholder = "Entität suchen …", this.clearOnSelect = !1, this._open = !1, this._filter = "", this._highlight = 0;
  }
  _results() {
    const e = this._filter.trim().toLowerCase(), t = new Set(this.exclude), i = [];
    for (const n of Object.keys(this.hass.states).sort()) {
      if (t.has(n) || this.domains.length && !this.domains.includes(ye(n))) continue;
      const o = this.hass.states[n].attributes.friendly_name ?? n;
      if (!(e && !n.toLowerCase().includes(e) && !o.toLowerCase().includes(e)) && (i.push({ id: n, name: o }), i.length >= cd))
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
        ${this.value && !this.clearOnSelect ? u`<ha-icon class="lead" .icon=${Ae(this.hass, this.value)}></ha-icon>` : u`<ha-icon class="lead" icon="mdi:magnify"></ha-icon>`}
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
            </button>` : g}
      </div>
      ${this.value && !this.clearOnSelect ? u`<div class="id">${this.value}</div>` : g}
      ${this._open ? u`<div class="list">
            ${e.length === 0 ? u`<div class="none">Keine Treffer</div>` : e.map(
      (n, o) => u`<div
                    class="opt ${o === this._highlight ? "hl" : ""}"
                    @mousedown=${(r) => {
        r.preventDefault(), this._select(n.id);
      }}
                  >
                    <ha-icon .icon=${Ae(this.hass, n.id)}></ha-icon>
                    <span class="txt"><span>${n.name}</span><small>${n.id}</small></span>
                  </div>`
    )}
          </div>` : g}
    `;
  }
};
_e.styles = fe`
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
Me([
  A({ attribute: !1 })
], _e.prototype, "hass", 2);
Me([
  A()
], _e.prototype, "value", 2);
Me([
  A({ attribute: !1 })
], _e.prototype, "domains", 2);
Me([
  A({ attribute: !1 })
], _e.prototype, "exclude", 2);
Me([
  A()
], _e.prototype, "placeholder", 2);
Me([
  A({ type: Boolean })
], _e.prototype, "clearOnSelect", 2);
Me([
  k()
], _e.prototype, "_open", 2);
Me([
  k()
], _e.prototype, "_filter", 2);
Me([
  k()
], _e.prototype, "_highlight", 2);
Me([
  Bt("input")
], _e.prototype, "_input", 2);
_e = Me([
  Ge("fp-entity-picker")
], _e);
const no = 4, xa = "#ef6c00", wa = "#8d6e63", $a = [
  ["room", "Zimmer"],
  ["balcony", "Balkon"],
  ["hallway", "Flur"],
  ["staircase", "Treppenhaus"],
  ["bathroom", "Bad"],
  ["custom", "Eigene Bezeichnung"]
], bt = 100, $t = 60, oo = "#9e9e9e", ro = 150, ka = "#ffd9a0", Hr = 30, dd = { wallThickness: 12, grid: 10 };
function hd(e) {
  const { sashes: t, shutterEntity: i, shutterColor: n, ...o } = e;
  return o.type === "window" && !o.leaves && (t === 1 || t === 2) && (o.leaves = t === 2 ? [{ w: 1, hinge: "left" }, { w: 1, hinge: "right" }] : [{ w: 1 }]), o.type === "window" && i && !o.shutters && (o.shutters = [{ entity: i, side: "out", ...n ? { color: n } : {} }]), o.type === "door" && o.entity?.startsWith("lock.") && (o.lockEntity ??= o.entity, delete o.entity), o;
}
function so(e) {
  const t = e ?? {};
  return {
    version: t.version ?? 1,
    canvas: t.canvas ?? { width: 1e3, height: 700 },
    settings: { ...dd, ...t.settings ?? {} },
    furniture: t.furniture ?? [],
    floors: (t.floors ?? []).map((i) => ({
      ...i,
      name: i.name ?? "",
      walls: i.walls ?? [],
      openings: (i.openings ?? []).map(hd),
      areas: (i.areas ?? []).map((n) => ({ ...n, name: n.name ?? "", sidebar: n.sidebar ?? [] })),
      items: i.items ?? []
    }))
  };
}
function q(e) {
  return `${e}-${Math.random().toString(36).slice(2, 8)}`;
}
const pd = /^[MmLlHhVvCcSsQqTtAaZz0-9eE.,\s+-]+$/, ud = /^(#[0-9a-fA-F]{3,8}|[a-zA-Z]{3,20}|rgba?\([0-9.,\s%]+\)|var\(--[a-zA-Z0-9-]+\))$/, fd = 2e4;
function Sa(e) {
  return typeof e == "string" && e.length > 0 && e.length <= fd && pd.test(e);
}
function mi(e) {
  return typeof e == "string" && ud.test(e.trim());
}
function Ne(e, t) {
  return t ? e?.find((i) => i.id === t) : void 0;
}
function Ea(e, t) {
  const i = (e.rotation ?? 0) * Math.PI / 180, n = e.scale ?? 1, o = Math.cos(i), r = Math.sin(i);
  return { x: e.x + n * (t.x * o - t.y * r), y: e.y + n * (t.x * r + t.y * o) };
}
function Bi(e) {
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
function ji(e) {
  const t = e.parts.map(Bi);
  for (const i of e.lights ?? []) t.push({ x0: i.x, y0: i.y, x1: i.x, y1: i.y });
  return t.length ? {
    x0: Math.min(...t.map((i) => i.x0)),
    y0: Math.min(...t.map((i) => i.y0)),
    x1: Math.max(...t.map((i) => i.x1)),
    y1: Math.max(...t.map((i) => i.y1))
  } : { x0: -15, y0: -15, x1: 15, y1: 15 };
}
function Aa(e, t) {
  const i = ji(t);
  return [
    { x: i.x0, y: i.y0 },
    { x: i.x1, y: i.y0 },
    { x: i.x1, y: i.y1 },
    { x: i.x0, y: i.y1 }
  ].map((n) => Ea(e, n));
}
function Ta(e, t) {
  const i = Ne(t, e.furnitureType);
  return i?.lights?.length ? i.lights.map((n) => Ea(e, n)) : [{ x: e.x, y: e.y }];
}
function Mi(e, t) {
  if (typeof e.glow == "boolean") return e.glow;
  if (!e.entity || ye(e.entity) !== "light") return !1;
  const i = Ne(t, e.furnitureType);
  return !e.furnitureType || !i || !!i.lights?.length;
}
function Ca(e, t) {
  return !e.furnitureType || !Ne(t, e.furnitureType) ? !0 : !!(e.entity || e.icon || e.label);
}
function md(e) {
  if (e.shape === "path" && e.d && e.vb) {
    const [t, i, n, o] = e.vb, r = e.w ?? n, s = e.h ?? o;
    return `translate(${e.x - r / 2} ${e.y - s / 2}) scale(${n ? r / n : 1} ${o ? s / o : 1}) translate(${-t} ${-i})`;
  }
}
function Wi(e, t = {}) {
  const n = e.fill === "none" ? "none" : t.fill ?? (mi(e.fill) ? e.fill : oo), o = mi(e.stroke) && e.stroke !== "none", r = e.shape === "path" && e.vb && e.vb[2] ? (e.w ?? e.vb[2]) / e.vb[2] : 1, s = (e.strokeWidth ?? 1) / (r || 1), a = o ? `stroke:${e.stroke};stroke-width:${s};stroke-opacity:1;vector-effect:none` : g, l = e.opacity ?? 1, c = `fpart ${t.cls ?? ""}`;
  let h = g;
  if (e.shape === "rect") {
    const b = e.w ?? 0, v = e.h ?? 0;
    h = _`<rect class=${c} x=${e.x - b / 2} y=${e.y - v / 2} width=${b} height=${v} fill=${n} fill-opacity=${l} style=${a}></rect>`;
  } else if (e.shape === "circle")
    h = _`<circle class=${c} cx=${e.x} cy=${e.y} r=${e.r ?? 0} fill=${n} fill-opacity=${l} style=${a}></circle>`;
  else if (e.shape === "polygon") {
    const b = (e.points ?? []).map((v) => `${e.x + v.x},${e.y + v.y}`).join(" ");
    h = _`<polygon class=${c} points=${b} fill=${n} fill-opacity=${l} style=${a}></polygon>`;
  } else e.shape === "path" && Sa(e.d) && (h = _`<path class=${c} d=${e.d} transform=${md(e) ?? g} fill=${n} fill-opacity=${l}
      style=${a}></path>`);
  const d = Bi(e), p = t.iconSize ?? Math.max(8, Math.min(d.x1 - d.x0, d.y1 - d.y0) * 0.7), f = (d.x0 + d.x1) / 2, m = (d.y0 + d.y1) / 2;
  return _`${h}${e.icon ? _`<foreignObject class="fpart-icon" x=${f - p / 2} y=${m - p / 2} width=${p} height=${p} pointer-events="none">
          <div class="fo-icon" style="--mdc-icon-size:${p}px;width:${p}px;height:${p}px"><ha-icon .icon=${e.icon}></ha-icon></div>
        </foreignObject>` : g}`;
}
function ao(e, t, i = {}) {
  const n = e.rotation ?? 0, o = e.scale ?? 1;
  return _`<g class="furniture ${i.selected ? "selected" : ""}" data-furniture=${e.id}
      transform="translate(${e.x} ${e.y}) rotate(${n}) scale(${o})">
    ${t.parts.map((r) => Wi(r, { fill: i.fill, cls: i.hit ? "hit" : "" }))}
  </g>`;
}
function Ma(e, t) {
  return t && mi(e.activeColor) ? e.activeColor : mi(e.fillColor) ? e.fillColor : void 0;
}
const Uo = `
  .furniture { pointer-events: none; }
  .furniture .fpart { stroke: var(--fp-wall-color, var(--primary-text-color)); stroke-width: 1; stroke-opacity: .55; vector-effect: non-scaling-stroke; }
  .furniture.selected .fpart { stroke: var(--primary-color) !important; stroke-width: 2 !important; stroke-opacity: 1 !important; vector-effect: non-scaling-stroke !important; }
  .furniture .fpart-icon { color: var(--primary-text-color); opacity: .75; }
  .furniture .fo-icon { display: flex; align-items: center; justify-content: center; }
`, re = (e, t, i = 0) => {
  const n = parseFloat(e.getAttribute(t) ?? "");
  return Number.isFinite(n) ? n : i;
};
function lo(e, t) {
  for (let i = e; i; i = i.parentElement) {
    const n = i.getAttribute(t)?.trim() || new RegExp(`(?:^|;)\\s*${t}\\s*:\\s*([^;]+)`).exec(i.getAttribute("style") ?? "")?.[1]?.trim();
    if (n && n !== "inherit") return n;
  }
}
function Ur(e, t) {
  let i = lo(e, t);
  if (i?.toLowerCase() === "currentcolor" && (i = lo(e, "color")), !!i)
    return i === "none" ? "none" : mi(i) && !i.toLowerCase().startsWith("url") ? i : void 0;
}
function gd(e, t) {
  const i = {}, n = Ur(e, "fill"), o = Ur(e, "stroke");
  if (n && (i.fill = n), o && o !== "none") {
    i.stroke = o;
    const r = parseFloat(lo(e, "stroke-width") ?? "");
    i.strokeWidth = Math.max(0.2, Math.round((Number.isFinite(r) && r > 0 ? r : 1) * t * 100) / 100), n || (i.fill = i.fill ?? "none");
  } else n === "none" && (i.stroke = "#444", i.strokeWidth = 1);
  return i;
}
function yd(e, t = 100) {
  const i = new DOMParser().parseFromString(e, "image/svg+xml"), n = i.documentElement;
  if (!n || n.nodeName.toLowerCase() !== "svg" || i.querySelector("parsererror")) throw new Error("Keine gültige SVG-Datei");
  const o = (n.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), s = o.length === 4 && o.every(Number.isFinite) && o[2] > 0 && o[3] > 0 ? o : [0, 0, re(n, "width", 100) || 100, re(n, "height", 100) || 100], a = t / Math.max(s[2], s[3]), l = s[0] + s[2] / 2, c = s[1] + s[3] / 2, h = [];
  let d = 0;
  const p = (m) => {
    if (h.length >= $t) {
      d++;
      return;
    }
    h.push({ id: q("p"), ...m });
  }, f = (m) => Math.round(m * 100) / 100;
  for (const m of Array.from(n.querySelectorAll("*"))) {
    const b = m.localName.toLowerCase(), v = gd(m, a);
    if (b === "rect") {
      const x = re(m, "width"), $ = re(m, "height");
      x > 0 && $ > 0 && p({ shape: "rect", x: f((re(m, "x") + x / 2 - l) * a), y: f((re(m, "y") + $ / 2 - c) * a), w: f(x * a), h: f($ * a), ...v });
    } else if (b === "circle") {
      const x = re(m, "r");
      x > 0 && p({ shape: "circle", x: f((re(m, "cx") - l) * a), y: f((re(m, "cy") - c) * a), r: f(x * a), ...v });
    } else if (b === "ellipse") {
      const x = re(m, "rx"), $ = re(m, "ry");
      if (x > 0 && $ > 0) {
        const y = re(m, "cx"), w = re(m, "cy");
        p({
          shape: "path",
          d: `M ${y - x} ${w} a ${x} ${$} 0 1 0 ${2 * x} 0 a ${x} ${$} 0 1 0 ${-2 * x} 0 Z`,
          vb: [y - x, w - $, 2 * x, 2 * $],
          x: f((y - l) * a),
          y: f((w - c) * a),
          w: f(2 * x * a),
          h: f(2 * $ * a),
          ...v
        });
      }
    } else if (b === "polygon") {
      const x = (m.getAttribute("points") ?? "").split(/[\s,]+/).map(Number).filter(Number.isFinite), $ = [];
      for (let y = 0; y + 1 < x.length; y += 2) $.push({ x: f((x[y] - l) * a), y: f((x[y + 1] - c) * a) });
      $.length >= 3 && p({ shape: "polygon", x: 0, y: 0, points: $, ...v });
    } else if (b === "path") {
      const x = (m.getAttribute("d") ?? "").trim();
      if (!Sa(x)) {
        d++;
        continue;
      }
      p({ shape: "path", d: x, vb: s, x: 0, y: 0, w: f(s[2] * a), h: f(s[3] * a), ...v });
    } else if (b === "line" || b === "polyline") {
      const x = b === "line" ? [re(m, "x1"), re(m, "y1"), re(m, "x2"), re(m, "y2")] : (m.getAttribute("points") ?? "").split(/[\s,]+/).map(Number).filter(Number.isFinite);
      if (x.length >= 4) {
        let $ = `M ${x[0]} ${x[1]}`;
        for (let w = 2; w + 1 < x.length; w += 2) $ += ` L ${x[w]} ${x[w + 1]}`;
        const y = { ...v, fill: "none" };
        y.stroke || Object.assign(y, { stroke: "#444", strokeWidth: 1 }), p({ shape: "path", d: $, vb: s, x: 0, y: 0, w: f(s[2] * a), h: f(s[3] * a), ...y });
      } else d++;
    } else ["image", "use", "text"].includes(b) && d++;
  }
  if (!h.length) throw new Error("Die SVG enthält keine unterstützten Formen (path, rect, circle, ellipse, polygon)");
  return { parts: h, skipped: d };
}
const bd = 4, _d = 10, co = { scale: 1, txPercent: 0, tyPercent: 0 };
function vd(e, t, i, n = 0.15, o = bd, r) {
  if (!e.length) return co;
  const s = e.map((w) => w.x), a = e.map((w) => w.y), l = Math.min(...s), c = Math.max(...s), h = Math.min(...a), d = Math.max(...a), p = Math.max(c - l, d - h) * n, f = Math.max(c - l + p * 2, 1), m = Math.max(d - h + p * 2, 1), b = Math.max(1, Math.min(o, Math.min(t / f, i / m))), v = r ?? b;
  if (!Number.isFinite(v)) return co;
  const x = (l + c) / 2 / t, $ = (h + d) / 2 / i, y = (w) => Math.min(0, Math.max(100 * (1 - v), w));
  return {
    scale: v,
    txPercent: y(50 - v * x * 100),
    tyPercent: y(50 - v * $ * 100)
  };
}
function xd(e) {
  const t = e.zoom;
  if (!(typeof t != "number" || !Number.isFinite(t)))
    return Math.max(1, Math.min(_d, t));
}
function Bo(e) {
  if (!e.length) return { x: 0, y: 0 };
  const t = e.reduce((i, n) => ({ x: i.x + n.x, y: i.y + n.y }), { x: 0, y: 0 });
  return { x: t.x / e.length, y: t.y / e.length };
}
function Xe(e, t, i) {
  let n = !1;
  for (let o = 0, r = e.length - 1; o < e.length; r = o++) {
    const s = e[o], a = e[r];
    s.y > i != a.y > i && t < (a.x - s.x) * (i - s.y) / (a.y - s.y) + s.x && (n = !n);
  }
  return n;
}
function Br(e) {
  let t = 0;
  for (let i = 0, n = e.length - 1; i < e.length; n = i++)
    t += (e[n].x + e[i].x) * (e[n].y - e[i].y);
  return Math.abs(t / 2);
}
function wd(e, t) {
  return e.area ? t.find((n) => n.id === e.area || n.name === e.area) : t.filter((n) => Xe(n.points, e.x, e.y)).sort((n, o) => Br(n.points) - Br(o.points))[0];
}
function $d(e, t, i) {
  return e.showOnlyWhenZoomed ? t ? wd(e, i)?.id !== t.id : !0 : !1;
}
function ke(e, t) {
  return t > 0 ? Math.round(e / t) * t : e;
}
function j(e, t) {
  return Math.hypot(e.x - t.x, e.y - t.y);
}
function et(e, t, i) {
  const n = i.x - t.x, o = i.y - t.y, r = n * n + o * o, s = r === 0 ? 0 : Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * o) / r));
  return { point: { x: t.x + s * n, y: t.y + s * o }, t: s };
}
function Fn(e, t, i) {
  let n;
  for (const o of t) {
    const { point: r, t: s } = et(e, { x: o.x1, y: o.y1 }, { x: o.x2, y: o.y2 }), a = j(e, r);
    a <= i && (!n || a < n.distance) && (n = {
      wall: o,
      point: r,
      t: s,
      distance: a,
      angle: Math.atan2(o.y2 - o.y1, o.x2 - o.x1) * 180 / Math.PI
    });
  }
  return n;
}
function kd(e, t, i, n = []) {
  let o, r = i;
  for (const s of t)
    if (!n.includes(s))
      for (const a of [
        { x: s.x1, y: s.y1 },
        { x: s.x2, y: s.y2 }
      ]) {
        const l = j(e, a);
        l <= r && (o = a, r = l);
      }
  return o;
}
function Sd(e, t, i, n = []) {
  let o, r = i;
  for (const s of t)
    for (const a of s.points) {
      if (n.includes(a)) continue;
      const l = j(e, a);
      l <= r && (o = a, r = l);
    }
  return o && { x: o.x, y: o.y };
}
function Rn(e, t, i = 8) {
  const n = Math.abs(Math.atan2(t.y - e.y, t.x - e.x) * 180 / Math.PI);
  return n < i || n > 180 - i ? { x: t.x, y: e.y } : Math.abs(n - 90) < i ? { x: e.x, y: t.y } : t;
}
function ho(e, t) {
  const { width: i, height: n } = t.canvas;
  let o = 1 / 0, r = 1 / 0, s = -1 / 0, a = -1 / 0;
  const l = (f, m, b = 0) => {
    o = Math.min(o, f - b), r = Math.min(r, m - b), s = Math.max(s, f + b), a = Math.max(a, m + b);
  }, c = Math.max(i, n), h = t.settings?.wallThickness ?? 12;
  for (const f of e.walls) {
    const m = (f.thickness ?? h) / 2;
    l(f.x1, f.y1, m), l(f.x2, f.y2, m);
  }
  for (const f of e.areas) for (const m of f.points) l(m.x, m.y);
  for (const f of e.openings) {
    const m = f.angle * Math.PI / 180, b = Math.cos(m), v = Math.sin(m), x = f.swing === "out" ? -1 : 1, $ = 30, y = x > 0 ? -$ : -(f.length + $), w = x > 0 ? f.length + $ : $;
    for (const E of [-f.length / 2, f.length / 2])
      for (const I of [y, w]) l(f.x + E * b - I * v, f.y + E * v + I * b);
  }
  const d = c * 0.04;
  for (const f of e.items) {
    const m = f.furnitureType ? t.furniture?.find((b) => b.id === f.furnitureType) : void 0;
    if (m) for (const b of Aa(f, m)) l(b.x, b.y);
    else l(f.x, f.y, d);
  }
  if (o === 1 / 0) {
    const f = c * 0.03;
    return { x: -f, y: -f, w: i + 2 * f, h: n + 2 * f };
  }
  const p = Math.max(s - o, a - r) * 0.03;
  return { x: o - p, y: r - p, w: s - o + 2 * p, h: a - r + 2 * p };
}
function Ia(e, t, i) {
  let n, o, r = i, s = i;
  for (const l of t) {
    const c = Math.abs(l.x - e.x);
    c <= r && (r = c, n = l);
    const h = Math.abs(l.y - e.y);
    h <= s && (s = h, o = l);
  }
  const a = [];
  return n && a.push({ axis: "x", value: n.x, ref: n }), o && a.push({ axis: "y", value: o.y, ref: o }), { x: n?.x, y: o?.y, guides: a };
}
function oi(e) {
  if (e.length !== 4) return;
  const t = [...new Set(e.map((n) => n.x))], i = [...new Set(e.map((n) => n.y))];
  if (!(t.length !== 2 || i.length !== 2))
    return { x: Math.min(...t), y: Math.min(...i), w: Math.abs(t[0] - t[1]), h: Math.abs(i[0] - i[1]) };
}
function Ed(e, t) {
  let i = 1 / 0;
  for (let n = 0; n < e.length; n++) {
    const o = e[n], r = e[(n + 1) % e.length];
    i = Math.min(i, j(t, et(t, o, r).point));
  }
  return i;
}
function Ad(e, t, i = [], n, o = 40, r = 20) {
  if (e.length < 3) return t.map(() => ({ x: 0, y: 0 }));
  const s = Bo(e), a = e.map((x) => x.x), l = e.map((x) => x.y), c = Math.min(...a), h = Math.max(...a), d = Math.min(...l), p = Math.max(...l), f = Math.max(5, Math.min(h - c, p - d) / 40), m = [];
  for (let x = d + f / 2; x < p; x += f)
    for (let $ = c + f / 2; $ < h; $ += f) {
      const y = { x: Math.round($), y: Math.round(x) };
      Xe(e, y.x, y.y) && m.push(y);
    }
  const b = [...i], v = [];
  for (const x of t) {
    let $;
    for (const w of [1, 0.6, 0.3]) {
      let E = 1 / 0;
      for (const I of m) {
        const C = Ed(e, I);
        if (C < r * w || b.some((V) => j(I, V) < o * w) || n && j(I, n) < o * 1.5 * w) continue;
        const B = x.light ? j(I, s) : C;
        B < E && (E = B, $ = I);
      }
      if ($) break;
    }
    const y = $ ?? s;
    b.push(y), v.push({ x: y.x, y: y.y });
  }
  return v;
}
function Td(e, t, i, n = []) {
  let o, r = i;
  for (const s of t) {
    if (n.includes(s)) continue;
    const a = et(e, { x: s.x1, y: s.y1 }, { x: s.x2, y: s.y2 }), l = j(e, a.point);
    l <= r && (o = a.point, r = l);
  }
  return o && { x: Math.round(o.x * 100) / 100, y: Math.round(o.y * 100) / 100 };
}
function Cd(e, t, i, n = 0.5) {
  const o = j(e, t);
  if (o < 1) return [];
  const r = [];
  for (const c of i) {
    const h = { x: c.x1, y: c.y1 }, d = { x: c.x2, y: c.y2 }, p = et(h, e, t), f = et(d, e, t);
    if (j(h, p.point) > n || j(d, f.point) > n) continue;
    const m = Math.min(p.t, f.t), b = Math.max(p.t, f.t);
    b > m && r.push([m, b]);
  }
  r.sort((c, h) => c[0] - h[0]);
  const s = [];
  let a = 0;
  const l = (c) => ({ x: e.x + (t.x - e.x) * c, y: e.y + (t.y - e.y) * c });
  for (const [c, h] of r)
    c > a && (c - a) * o > 1 && s.push([l(a), l(c)]), a = Math.max(a, h);
  return a < 1 && (1 - a) * o > 1 && s.push([l(a), l(1)]), s;
}
function ri(e, t, i, n = 0.5) {
  return j(e, et(e, t, i).point) <= n;
}
function Pa(e, t, i = 0.5) {
  const n = e.points;
  return t.filter((o) => {
    const r = { x: o.x1, y: o.y1 }, s = { x: o.x2, y: o.y2 };
    return n.some((a, l) => {
      const c = n[(l + 1) % n.length];
      return ri(r, a, c, i) && ri(s, a, c, i);
    });
  });
}
function jr(e, t) {
  return t.filter((i) => Pa(i, [e]).length > 0);
}
var Md = Object.defineProperty, Id = Object.getOwnPropertyDescriptor, ce = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Id(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Md(t, i, o), o;
};
const Wr = [
  { id: "select", icon: "mdi:cursor-default", label: "Auswahl", hint: "Teile und Leuchtpunkte anklicken und ziehen. Griffe ändern die Größe. Alt hält den Fang aus." },
  { id: "rect", icon: "mdi:rectangle-outline", label: "Rechteck", hint: "Von Ecke zu Ecke ziehen." },
  { id: "circle", icon: "mdi:circle-outline", label: "Kreis", hint: "Vom Mittelpunkt zum Rand ziehen." },
  { id: "polygon", icon: "mdi:vector-polygon", label: "Polygon", hint: "Eckpunkte anklicken; Doppelklick, Enter oder Klick auf den ersten Punkt schließt die Form." },
  { id: "light", icon: "mdi:lightbulb-on-outline", label: "Leuchtpunkt", hint: "Klick setzt einen Leuchtpunkt – dort scheint das Licht, wenn dem Möbelstück ein Licht zugewiesen ist." }
], Pd = [1, 2, 5, 10, 25], Gr = 50, Kr = 300, qr = 7, Od = ["mdi:sofa", "mdi:bed", "mdi:desk-lamp", "mdi:floor-lamp", "mdi:television", "mdi:table-furniture", "mdi:chair-rolling", "mdi:flower"], J = (e) => Math.round(e * 100) / 100, Vt = (e) => JSON.parse(JSON.stringify(e));
let ie = class extends le {
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
      const t = Ne(this.plan?.furniture, this.openId);
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
    return Kr / this._zoom / t;
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
    if (this._list.length >= bt) return void (this._notice = `Höchstens ${bt} Vorlagen`);
    this._edit({ id: q("m"), name: "", parts: [] }, !0);
  }
  _edit(e, t) {
    this._editing = Vt(e), this._isNew = t, this._dirty = !1, this._sel = void 0, this._tool = "select", this._poly = [], this._undo = [], this._redo = [], this._notice = void 0, this._zoom = 1;
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
    if (this._list.length >= bt) return void (this._notice = `Höchstens ${bt} Vorlagen`);
    const t = Vt(e);
    t.id = q("m"), t.name = `${e.name} Kopie`.slice(0, 100), t.parts.forEach((i) => i.id = q("p")), this._emit([...this._list, t]);
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
        const { parts: o, skipped: r } = yd(await n.text());
        if (t) {
          if (this._list.length >= bt) throw new Error(`Höchstens ${bt} Vorlagen`);
          this._edit({ id: q("m"), name: n.name.replace(/\.svg$/i, ""), parts: o }, !0), this._dirty = !0;
        } else if (this._editing) {
          if (this._editing.parts.length + o.length > $t) throw new Error(`Höchstens ${$t} Teile je Vorlage`);
          this._pushUndo(), this._editing = { ...this._editing, parts: [...this._editing.parts, ...o] }, this._sel = { kind: "part", id: o[0].id };
        }
        this._notice = r ? `${r} nicht unterstützte Elemente wurden übersprungen` : void 0;
      } catch (o) {
        this._notice = o instanceof Error ? o.message : "Import fehlgeschlagen";
      }
  }
  // ---------------------------------------------------------------- Bearbeiten
  _pushUndo() {
    this._editing && (this._undo.push(JSON.stringify(this._editing)), this._undo.length > Gr && this._undo.shift(), this._redo = [], this._dirty = !0);
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
      const o = n.parts.find((r) => r.id === i);
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
    if (!e || (this._editing?.parts.length ?? 0) >= $t) return;
    const t = Vt(e);
    t.id = q("p"), t.x += 10, t.y += 10, this._mutate((i) => i.parts.push(t)), this._sel = { kind: "part", id: t.id };
  }
  _order(e) {
    const t = this._part?.id;
    t && this._mutate((i) => {
      const n = i.parts.findIndex((r) => r.id === t), o = n + e;
      o < 0 || o >= i.parts.length || ([i.parts[n], i.parts[o]] = [i.parts[o], i.parts[n]]);
    });
  }
  _addPart(e) {
    if ((this._editing?.parts.length ?? 0) >= $t) return void (this._notice = `Höchstens ${$t} Teile je Vorlage`);
    const t = q("p");
    this._mutate((i) => i.parts.push({ id: t, fill: oo, ...e })), this._sel = { kind: "part", id: t };
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
      const n = Bi(i);
      t.push({ x: n.x0, y: n.y0 }, { x: n.x1, y: n.y1 }, { x: (n.x0 + n.x1) / 2, y: (n.y0 + n.y1) / 2 });
    }
    for (const i of this._editing?.lights ?? []) t.push(i);
    return t;
  }
  _snap(e, t, i) {
    if (t.altKey)
      return this._guides = [], e;
    const n = Ia(e, this._refs(i), 6 * this._upp);
    return this._guides = n.guides, { x: n.x ?? ke(e.x, this._grid), y: n.y ?? ke(e.y, this._grid) };
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
      const r = this._part;
      if (i.handle && r)
        this._drag = { ...o, mode: i.handle.startsWith("v") ? "vertex" : "resize", orig: Vt(r), handle: i.handle, index: Number(i.handle.slice(1)) };
      else if (i.light !== void 0)
        this._sel = { kind: "light", index: i.light }, this._drag = { ...o, mode: "light", orig: void 0, origLight: { ...(this._editing.lights ?? [])[i.light] }, index: i.light };
      else if (i.part)
        this._sel = { kind: "part", id: i.part }, this._drag = { ...o, mode: "move", orig: Vt(this._editing.parts.find((s) => s.id === i.part)) };
      else {
        this._sel = void 0;
        return;
      }
      this._svg.setPointerCapture(e.pointerId);
      return;
    }
    if (this._tool === "rect" || this._tool === "circle") {
      const r = this._snap(t, e);
      this._rubber = { a: r, b: r }, this._drag = { ...o, mode: "shape", orig: void 0 }, this._svg.setPointerCapture(e.pointerId);
      return;
    }
    if (this._tool === "polygon") {
      const r = this._snap(t, e);
      if (this._poly.length >= 3 && Math.hypot(r.x - this._poly[0].x, r.y - this._poly[0].y) <= qr * this._upp) return this._finishPolygon();
      this._poly = [...this._poly, r];
      return;
    }
    if (this._tool === "light") {
      const r = this._snap(t, e);
      if ((this._editing.lights ?? []).length >= 10) return void (this._notice = "Höchstens 10 Leuchtpunkte");
      this._mutate((s) => s.lights = [...s.lights ?? [], { x: r.x, y: r.y }]), this._sel = { kind: "light", index: (this._editing.lights ?? []).length - 1 }, this._tool = "select";
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
    if (i.moved || (this._undo.push(i.snapshot), this._undo.length > Gr && this._undo.shift(), this._redo = [], this._dirty = !0, i.moved = !0), i.mode === "light") {
      const r = this._snap(t, e), s = [...n.lights ?? []];
      s[i.index] = r, this._editing = { ...n, lights: s };
      return;
    }
    const o = n.parts.find((r) => r.id === i.orig.id);
    if (i.mode === "move") {
      const r = t.x - i.start.x, s = t.y - i.start.y, a = this._snap({ x: i.orig.x + r, y: i.orig.y + s }, e, o.id);
      o.x = J(a.x), o.y = J(a.y);
    } else if (i.mode === "resize") {
      const r = this._snap(t, e, o.id);
      o.shape === "circle" ? o.r = J(Math.max(1, Math.hypot(r.x - o.x, r.y - o.y))) : (o.w = J(Math.max(2, Math.abs(r.x - o.x) * 2)), o.h = J(Math.max(2, Math.abs(r.y - o.y) * 2)));
    } else if (i.mode === "vertex") {
      const r = this._snap({ x: t.x, y: t.y }, e, o.id);
      o.points = (o.points ?? []).map((s, a) => a === i.index ? { x: J(r.x - o.x), y: J(r.y - o.y) } : s);
    }
    this._editing = { ...n };
  }
  _onPointerUp(e) {
    const t = this._drag;
    if (!(!t || t.pointerId !== e.pointerId) && (this._drag = void 0, this._guides = [], t.mode === "shape" && this._rubber)) {
      const { a: i, b: n } = this._rubber;
      if (this._rubber = void 0, this._tool === "rect") {
        const o = Math.abs(n.x - i.x), r = Math.abs(n.y - i.y);
        o >= 2 && r >= 2 && this._addPart({ shape: "rect", x: J((i.x + n.x) / 2), y: J((i.y + n.y) / 2), w: J(o), h: J(r) });
      } else {
        const o = Math.hypot(n.x - i.x, n.y - i.y);
        o >= 1 && this._addPart({ shape: "circle", x: i.x, y: i.y, r: J(o) });
      }
      this._tool = "select";
    }
  }
  _finishPolygon() {
    if (this._poly.length < 3) return;
    const e = this._poly, t = J(e.reduce((n, o) => n + o.x, 0) / e.length), i = J(e.reduce((n, o) => n + o.y, 0) / e.length);
    this._poly = [], this._addPart({ shape: "polygon", x: t, y: i, points: e.map((n) => ({ x: J(n.x - t), y: J(n.y - i) })) }), this._tool = "select";
  }
  _onWheel(e) {
    e.preventDefault(), this._zoom = Math.max(0.25, Math.min(8, this._zoom * (e.deltaY < 0 ? 1.15 : 1 / 1.15)));
  }
  // ---------------------------------------------------------------- Darstellung
  render() {
    return this._editing ? this._renderEdit(this._editing) : this._renderList();
  }
  _thumb(e) {
    const t = ji(e), i = Math.max(t.x1 - t.x0, t.y1 - t.y0) * 0.1 + 2;
    return u`<svg class="thumb" viewBox="${t.x0 - i} ${t.y0 - i} ${t.x1 - t.x0 + 2 * i} ${t.y1 - t.y0 + 2 * i}">
      <g class="furniture">${e.parts.map((n) => Wi(n))}</g>
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
    return this._notice ? u`<div class="notice">${this._notice}<button @click=${() => this._notice = void 0}>OK</button></div>` : g;
  }
  _renderEdit(e) {
    const t = Wr.find((n) => n.id === this._tool), i = Kr / this._zoom / 2;
    return u`
      <div class="toolbar">
        <button class="icon-btn" title="Zur Bibliothek" @click=${this._leaveEdit}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <div class="main-title">${this._isNew ? "Neue Vorlage" : "Vorlage bearbeiten"}${this._dirty ? u`<span class="dirty"> • ungespeichert</span>` : g}</div>
        <button class="icon-btn" title="Rückgängig (Strg+Z)" ?disabled=${!this._undo.length} @click=${this._doUndo}><ha-icon icon="mdi:undo"></ha-icon></button>
        <button class="icon-btn" title="Wiederholen (Strg+Y)" ?disabled=${!this._redo.length} @click=${this._doRedo}><ha-icon icon="mdi:redo"></ha-icon></button>
        <button class="save" @click=${this._apply}>Übernehmen</button>
      </div>
      ${this._noticeBar()}
      <div class="body">
        <div class="tools">
          ${Wr.map(
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
    const i = this._upp, n = this._grid, o = n * 1, r = n * 10, s = this._sel, a = this._part;
    return _`
      <defs>
        <pattern id="fg-minor" width=${o} height=${o} patternUnits="userSpaceOnUse">
          <path d="M ${o} 0 L 0 0 0 ${o}" class="grid-minor"></path>
        </pattern>
        <pattern id="fg-major" width=${r} height=${r} patternUnits="userSpaceOnUse">
          ${o / i >= 4 ? _`<rect width=${r} height=${r} fill="url(#fg-minor)"></rect>` : g}
          <path d="M ${r} 0 L 0 0 0 ${r}" class="grid-major"></path>
        </pattern>
      </defs>
      <rect class="sheet" x=${-t} y=${-t} width=${2 * t} height=${2 * t}></rect>
      <rect x=${-t} y=${-t} width=${2 * t} height=${2 * t} fill="url(#fg-major)" pointer-events="none"></rect>
      <line class="axis" x1=${-t} x2=${t} y1="0" y2="0" stroke-width=${i}></line>
      <line class="axis" y1=${-t} y2=${t} x1="0" x2="0" stroke-width=${i}></line>
      <g class="furniture editing">
        ${e.parts.map(
      (l) => _`<g data-part=${l.id} class="part ${s?.kind === "part" && s.id === l.id ? "selected" : ""}">${Wi(l, { cls: "hit" })}</g>`
    )}
      </g>
      ${(e.lights ?? []).map(
      (l, c) => _`<g data-light=${c} class="light-mark ${s?.kind === "light" && s.index === c ? "selected" : ""}">
          <circle cx=${l.x} cy=${l.y} r=${9 * i} class="light-hit"></circle>
          <circle cx=${l.x} cy=${l.y} r=${4 * i} class="light-dot"></circle>
          <circle cx=${l.x} cy=${l.y} r=${8 * i} class="light-ring" stroke-width=${i * 1.5}></circle>
        </g>`
    )}
      ${a ? this._renderHandles(a, i) : g}
      ${this._renderPreview(i)}
      ${this._guides.map(
      (l) => l.axis === "x" ? _`<line class="guide" x1=${l.value} x2=${l.value} y1=${-t} y2=${t} stroke-width=${i}></line>` : _`<line class="guide" y1=${l.value} y2=${l.value} x1=${-t} x2=${t} stroke-width=${i}></line>`
    )}
    `;
  }
  _renderHandles(e, t) {
    const i = qr * t;
    if (e.shape === "polygon")
      return _`${(e.points ?? []).map((s, a) => _`<circle class="handle" data-handle="v${a}" cx=${e.x + s.x} cy=${e.y + s.y} r=${i} stroke-width=${2 * t}></circle>`)}`;
    const n = Bi(e), o = e.shape === "circle" ? e.x + (e.r ?? 0) : n.x1, r = e.shape === "circle" ? e.y : n.y1;
    return _`<rect class="sel-box" x=${n.x0} y=${n.y0} width=${n.x1 - n.x0} height=${n.y1 - n.y0} stroke-width=${t * 1.5}></rect>
      <circle class="handle" data-handle="s0" cx=${o} cy=${r} r=${i} stroke-width=${2 * t}></circle>`;
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
    return g;
  }
  _num(e, t, i, n = 1) {
    return u`<label class="field"><span>${e}</span>
      <input type="number" step="1" min=${n} .value=${i === void 0 ? "" : String(J(i))}
        @change=${(o) => this._setPartNum(t, o.target.value, n)} /></label>`;
  }
  _setPartNum(e, t, i) {
    if (t === "") return;
    const n = Number(t);
    Number.isFinite(n) && this._setPart(e, e === "x" || e === "y" ? n : Math.max(i, n));
  }
  _renderProps(e) {
    const t = this._part, i = this._sel, n = ji(e);
    return u`
      <h3>Vorlage</h3>
      <label class="field"><span>Name</span>
        <input type="text" maxlength="100" .value=${e.name} placeholder="z. B. Stehlampe"
          @input=${(o) => {
      this._editing = { ...e, name: o.target.value }, this._dirty = !0;
    }} /></label>
      <label class="field"><span>Raster (cm)</span>
        <select @change=${(o) => this._grid = Number(o.target.value)}>
          ${Pd.map((o) => u`<option value=${o} ?selected=${o === this._grid}>${o}</option>`)}
        </select></label>
      <p class="muted">${e.parts.length} Teile · ${J(n.x1 - n.x0)} × ${J(n.y1 - n.y0)} cm · ${(e.lights ?? []).length} Leuchtpunkt${(e.lights ?? []).length === 1 ? "" : "e"}</p>
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
            ${t.shape === "rect" || t.shape === "path" ? u`<div class="grid2">${this._num("Breite", "w", t.w)} ${this._num("Höhe", "h", t.h)}</div>` : g}
            ${t.shape === "circle" ? this._num("Radius", "r", t.r) : g}
            <label class="field color"><span>Farbe</span>
              <input type="color" .value=${t.fill?.startsWith("#") && t.fill.length === 7 ? t.fill : oo}
                @change=${(o) => this._setPart("fill", o.target.value)} /></label>
            <label class="field"><span>Deckkraft ${Math.round((t.opacity ?? 1) * 100)} %</span>
              <input type="range" min="0.05" max="1" step="0.05" .value=${String(t.opacity ?? 1)}
                @change=${(o) => this._setPart("opacity", Number(o.target.value))} /></label>
            <div class="field"><span>Icon als Symbol (optional)</span>
              <div class="icon-input"><ha-icon .icon=${t.icon ?? "mdi:help-circle-outline"}></ha-icon>
                <input type="text" .value=${t.icon ?? ""} placeholder="mdi:…" @change=${(o) => this._setPart("icon", o.target.value.trim())} /></div>
              <div class="icon-grid">${Od.map((o) => u`<button class="icon-pick ${t.icon === o ? "active" : ""}" title=${o} @click=${() => this._setPart("icon", o)}><ha-icon .icon=${o}></ha-icon></button>`)}</div>
            </div>` : u`<p class="muted">Teil oder Leuchtpunkt anklicken, oder links ein Werkzeug wählen und zeichnen. Mehrere Teile ergeben zusammen ein Möbelstück; der Mittelpunkt (0/0) ist der Ankerpunkt beim Platzieren und Drehen.</p>`}
    `;
  }
};
ie.styles = [
  Be(Uo),
  fe`
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
ce([
  A({ attribute: !1 })
], ie.prototype, "plan", 2);
ce([
  A({ attribute: !1 })
], ie.prototype, "hass", 2);
ce([
  A()
], ie.prototype, "openId", 2);
ce([
  k()
], ie.prototype, "_editing", 2);
ce([
  k()
], ie.prototype, "_isNew", 2);
ce([
  k()
], ie.prototype, "_dirty", 2);
ce([
  k()
], ie.prototype, "_sel", 2);
ce([
  k()
], ie.prototype, "_tool", 2);
ce([
  k()
], ie.prototype, "_grid", 2);
ce([
  k()
], ie.prototype, "_zoom", 2);
ce([
  k()
], ie.prototype, "_poly", 2);
ce([
  k()
], ie.prototype, "_cursor", 2);
ce([
  k()
], ie.prototype, "_rubber", 2);
ce([
  k()
], ie.prototype, "_guides", 2);
ce([
  k()
], ie.prototype, "_notice", 2);
ce([
  Bt("svg.canvas")
], ie.prototype, "_svg", 2);
ie = ce([
  Ge("fp-furniture-editor")
], ie);
const Vr = 0.18, Yr = 0.6, Zr = 0.5;
function Ld(e, t) {
  if (!t || t.state !== "on") return;
  const i = t.attributes ?? {}, n = i.brightness, o = typeof n == "number" && Number.isFinite(n) ? Math.max(0, Math.min(255, n)) / 255 : void 0, r = o === void 0 ? Yr : Vr + (Yr - Vr) * o, a = (typeof e.glowRadius == "number" && e.glowRadius > 0 ? e.glowRadius : ro) * (o === void 0 ? 1 : Zr + (1 - Zr) * o), l = i.rgb_color;
  if (Array.isArray(l) && l.length >= 3 && l.slice(0, 3).every((c) => typeof c == "number" && Number.isFinite(c))) {
    const c = (h) => Math.max(0, Math.min(255, Math.round(h)));
    return { color: `rgb(${c(l[0])}, ${c(l[1])}, ${c(l[2])})`, opacity: r, radius: a };
  }
  return { color: e.glowColor || ka, opacity: r, radius: a };
}
function Oa(e, t, i) {
  const n = i.x2 - i.x1, o = i.y2 - i.y1, r = n * n + o * o, s = r === 0 ? 0 : Math.max(0, Math.min(1, ((e - i.x1) * n + (t - i.y1) * o) / r));
  return Math.hypot(e - (i.x1 + s * n), t - (i.y1 + s * o));
}
function Fd(e, t, i, n, o) {
  const r = o.x2 - o.x1, s = o.y2 - o.y1, a = i * s - n * r;
  if (Math.abs(a) < 1e-12) return;
  const l = o.x1 - e, c = o.y1 - t, h = (l * s - c * r) / a, d = (l * n - c * i) / a;
  if (!(h <= 1e-9 || d < 0 || d > 1))
    return h;
}
function Rd(e, t, i, n, o) {
  const r = e.x2 - e.x1, s = e.y2 - e.y1, a = [-r, r, -s, s], l = [e.x1 - t, n - e.x1, e.y1 - i, o - e.y1];
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
  return { ...e, x1: e.x1 + c * r, y1: e.y1 + c * s, x2: e.x1 + h * r, y2: e.y1 + h * s };
}
function La(e, t, i, n, o = () => 12) {
  const r = n.filter((p) => {
    const f = Oa(e, t, p);
    return f < i && f > o(p) / 2 + 1;
  });
  if (!r.length) return;
  const s = i * 1.01, a = [
    { id: "b1", x1: e - s, y1: t - s, x2: e + s, y2: t - s },
    { id: "b2", x1: e + s, y1: t - s, x2: e + s, y2: t + s },
    { id: "b3", x1: e + s, y1: t + s, x2: e - s, y2: t + s },
    { id: "b4", x1: e - s, y1: t + s, x2: e - s, y2: t - s }
  ], l = r.map((p) => Rd(p, e - s, t - s, e + s, t + s)).filter((p) => !!p);
  if (!l.length) return;
  const c = [...l, ...a], h = [];
  for (const p of c)
    for (const [f, m] of [
      [p.x1, p.y1],
      [p.x2, p.y2]
    ]) {
      const b = Math.atan2(m - t, f - e);
      for (const v of [b - 1e-4, b, b + 1e-4]) {
        const x = Math.cos(v), $ = Math.sin(v);
        let y = 1 / 0;
        for (const w of c) {
          const E = Fd(e, t, x, $, w);
          E !== void 0 && E < y && (y = E);
        }
        y < 1 / 0 && h.push({ x: e + x * y, y: t + $ * y, a: v });
      }
    }
  h.sort((p, f) => p.a - f.a);
  const d = (p) => Math.round(p * 100) / 100;
  return h.map(({ x: p, y: f }) => ({ x: d(p), y: d(f) }));
}
function Fa(e, t) {
  return e.type !== "door" ? !1 : e.entity ? dt(t?.states[e.entity]) : !0;
}
function Ra(e, t, i, n = () => 12) {
  const o = t.filter(i);
  if (!o.length) return e;
  const r = [];
  for (const s of e) {
    const a = s.x2 - s.x1, l = s.y2 - s.y1, c = a * a + l * l;
    if (c === 0) {
      r.push(s);
      continue;
    }
    const h = Math.sqrt(c), d = [];
    for (const m of o) {
      if (Oa(m.x, m.y, s) > n(s) / 2 + 1) continue;
      const b = ((m.x - s.x1) * a + (m.y - s.y1) * l) / c, v = m.length / 2 / h, x = Math.max(0, b - v), $ = Math.min(1, b + v);
      $ > x && d.push([x, $]);
    }
    if (!d.length) {
      r.push(s);
      continue;
    }
    d.sort((m, b) => m[0] - b[0]);
    let p = 0;
    const f = (m, b) => {
      b - m > 1e-6 && r.push({ ...s, x1: s.x1 + a * m, y1: s.y1 + l * m, x2: s.x1 + a * b, y2: s.y1 + l * b });
    };
    for (const [m, b] of d)
      f(p, m), p = Math.max(p, b);
    f(p, 1);
  }
  return r;
}
function zd(e) {
  if (!e || e.state === "unavailable" || e.state === "unknown") return;
  const t = e.attributes?.current_position;
  if (typeof t == "number" && Number.isFinite(t)) return 1 - Math.max(0, Math.min(100, t)) / 100;
  if (e.state === "closed") return 1;
  if (e.state === "open") return 0;
  if (e.state === "opening" || e.state === "closing") return 0.5;
}
function Nd(e, t, i, n) {
  const o = e.items.filter((a) => a.entity && Mi(a, t.furniture)).flatMap((a) => {
    const l = Ld(a, i.states[a.entity]);
    return l ? Ta(a, t.furniture).map((c) => ({ it: { ...a, x: c.x, y: c.y }, paint: l })) : [];
  });
  if (!o.length) return g;
  const r = (a) => a.thickness ?? t.settings.wallThickness, s = Ra(e.walls, e.openings, (a) => Fa(a, i), r);
  return _`<g class="fp-glows">
    ${o.map(({ it: a, paint: l }, c) => {
    const h = `${n}-${c}`, d = La(a.x, a.y, l.radius, s, r);
    return _`
        ${d ? _`<clipPath id="${h}-clip"><polygon points=${d.map((p) => `${p.x},${p.y}`).join(" ")}></polygon></clipPath>` : g}
        <radialGradient id=${h} gradientUnits="userSpaceOnUse" cx=${a.x} cy=${a.y} r=${l.radius}>
          <stop offset="0" stop-color=${l.color} stop-opacity=${l.opacity}></stop>
          <stop offset="1" stop-color=${l.color} stop-opacity="0"></stop>
        </radialGradient>
        <circle class="fp-glow" cx=${a.x} cy=${a.y} r=${l.radius} fill="url(#${h})"
                clip-path=${d ? `url(#${h}-clip)` : g}></circle>`;
  })}
  </g>`;
}
const Xr = 10;
function po(e) {
  return e.leaves?.length ? e.leaves : [{ w: 1 }];
}
function uo(e) {
  const t = po(e), i = t.reduce((o, r) => o + Math.max(r.w, 1e-4), 0);
  let n = -e.length / 2;
  return t.map((o, r) => {
    const s = Math.max(o.w, 1e-4) / i * e.length, a = {
      index: r,
      x0: n,
      x1: n + s,
      hinge: o.hinge ?? Dd(e, r, t.length),
      entity: o.entity || e.entity || void 0
    };
    return n += s, a;
  });
}
function Dd(e, t, i) {
  return i === 1 ? e.hinge ?? "left" : t === i - 1 ? "right" : "left";
}
function za(e, t) {
  if (!e || !t) return { open: !1, unknown: !1 };
  const i = t.states[e], n = !i || i.state === "unavailable" || i.state === "unknown";
  return { open: !n && dt(i), unknown: n };
}
function Hd(e, t) {
  return za(e.entity, t);
}
function Ud(e) {
  return !e || e.state === "unavailable" || e.state === "unknown" ? "unknown" : e.state === "locked" ? "locked" : "unlocked";
}
function zn(e) {
  return e.type === "window" && !e.entity && !e.leaves?.some((t) => t.entity);
}
function Bd(e, t) {
  const i = Math.max(1, Math.min(no, Math.round(t))), n = e.length ? e.map((r) => ({ ...r })) : [{ w: 1 }];
  if (i <= n.length) return n.slice(0, i);
  const o = n.reduce((r, s) => r + s.w, 0) / n.length;
  for (; n.length < i; ) n.push({ w: o });
  return n;
}
function jd(e, t, i, n) {
  if (e.length === 1) return e.map((h) => ({ ...h }));
  const o = e.length - 1, r = Math.max(Xr, Math.min(n - Xr * o, i)), s = e.reduce((h, d, p) => p === t ? h : h + d.w, 0), a = n - r, l = e.reduce((h, d) => h + d.w, 0), c = n / l;
  return e.map((h, d) => {
    if (d === t) return { ...h, w: r / c };
    const p = s > 0 ? h.w / s : 1 / o;
    return { ...h, w: a * p / c };
  });
}
const Wd = 0.12;
function Gi(e, t) {
  return e.thickness ?? t.settings.wallThickness;
}
function At(e, t) {
  return e.walls.reduce((i, n) => Math.max(i, Gi(n, t)), t.settings.wallThickness);
}
function Gd(e, t) {
  const i = e.color ?? "var(--primary-color)", n = e.opacity ?? Wd;
  return t && e.entity && dt(t.states[e.entity]) ? { color: e.activeColor ?? "#ffc107", opacity: Math.min(1, n + 0.2) } : { color: i, opacity: n };
}
function Na(e, t) {
  const { color: i, opacity: n } = Gd(e, t.hass), o = e.points.map((c) => `${c.x},${c.y}`).join(" "), r = Math.min(...e.points.map((c) => c.x)), s = Math.min(...e.points.map((c) => c.y));
  let a = { x: r + t.labelSize * 0.8, y: s + t.labelSize * 1.5 };
  Xe(e.points, a.x, a.y) || (a = Bo(e.points));
  const l = Xe(e.points, r + t.labelSize * 0.8, s + t.labelSize * 1.5) ? "start" : "middle";
  return _`
    <g class="area ${t.selected ? "selected" : ""} ${t.dimmed ? "dimmed" : ""}" data-id=${e.id}>
      <polygon points=${o} fill=${i} fill-opacity=${n}
        style=${e.type === "balcony" ? `stroke:${i};stroke-width:3;stroke-dasharray:10 6;stroke-linejoin:round` : g}></polygon>
      ${e.showName !== !1 && e.name ? _`<text class="area-label" x=${a.x} y=${a.y} font-size=${t.labelSize}
                  text-anchor=${l} dominant-baseline="middle">${e.name}</text>` : g}
    </g>`;
}
function Da(e, t, i, n = {}) {
  const { width: o, height: r } = t.canvas, s = Math.max(o, r), a = At(e, t) + 2;
  return _`
    <defs>
      <mask id=${i} maskUnits="userSpaceOnUse" x=${-s} y=${-s} width=${o + 2 * s} height=${r + 2 * s}>
        <rect x=${-s} y=${-s} width=${o + 2 * s} height=${r + 2 * s} fill="white"></rect>
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
                         stroke-width=${Gi(l, t)}></line>`
  )}
    </g>`;
}
function Qr(e, t, i, n) {
  const o = t * n < 0 ? 0 : 1;
  return _`
    <path class="swing" d="M ${e} ${n * i} A ${i} ${i} 0 0 ${o} ${e - t * i} 0"></path>
    <line class="leaf" x1=${e} y1="0" x2=${e} y2=${n * i}></line>`;
}
function Kd(e, t, i, n) {
  const o = t, r = n?.states[e.entity], s = zd(r), a = r?.state === "opening" || r?.state === "closing", l = e.side === "in" ? 1 : -1, c = Math.max(i * 0.8, 8), h = l * i / 2, d = l > 0 ? h : h - c, p = (s ?? 0) * c, f = l > 0 ? h : h - p, m = [];
  for (let b = 3; b < p; b += 3) m.push(h + l * b);
  return _`
    <g class="shutter ${e.side} ${a ? "moving" : ""} ${s === void 0 ? "unknown" : ""}" style="--fp-shutter:${e.color || wa}">
      <rect class="shutter-track" x=${-o / 2} y=${d} width=${o} height=${c}></rect>
      ${p > 0 ? _`<rect class="shutter-fill" x=${-o / 2} y=${f} width=${o} height=${p}></rect>` : g}
      ${m.map((b) => _`<line class="shutter-slat" x1=${-o / 2} y1=${b} x2=${o / 2} y2=${b}></line>`)}
    </g>`;
}
function qd(e, t) {
  if (!e.lockEntity) return g;
  const i = Ud(t?.states[e.lockEntity]), o = -(e.hinge === "right" ? 1 : -1) * (e.length / 2 - 9);
  return _`
    <g class="lock ${i}" transform="translate(${o} 0)">
      <circle r="6.5"></circle>
      <path class="shackle" d=${i === "locked" ? "M -2.4 -1 V -3 a 2.4 2.4 0 0 1 4.8 0 V -1" : "M -2.4 -1 V -3 a 2.4 2.4 0 0 1 4.8 0 V -2.4"}></path>
      <rect x="-3.4" y="-1" width="6.8" height="5" rx="1"></rect>
    </g>`;
}
function Ha(e, t, i = {}) {
  const n = e.length, o = `--fp-open:${e.openColor || xa}`, r = e.hinge === "right" ? 1 : -1, s = e.swing === "out" ? -1 : 1;
  if (e.type === "window") {
    const h = t - 2, d = uo(e).map((m) => {
      const b = za(m.entity, i.hass);
      return { seg: m, open: !!i.forceOpen || b.open, unknown: b.unknown };
    }), p = Math.max(...d.filter((m) => m.open).map((m) => m.seg.x1 - m.seg.x0), 0), f = `opening window ${i.selected ? "selected" : ""} ${i.warn ? "warn" : ""}`;
    return _`
      <g class=${f} data-id=${e.id} transform="translate(${e.x} ${e.y}) rotate(${e.angle})" style=${o}>
        <rect class="hit" x=${-n / 2} y=${s < 0 ? -p : -h / 2} width=${n} height=${p + h}></rect>
        ${(e.shutters ?? []).map((m) => Kd(m, n, t, i.hass))}
        ${d.map(({ seg: m, open: b, unknown: v }) => {
      const x = m.x1 - m.x0, $ = m.hinge === "right" ? m.x1 : m.x0, y = m.hinge === "right" ? 1 : -1;
      return _`
            <g class="seg ${b ? "open" : ""} ${v ? "unknown" : ""} ${i.leafIndex === m.index ? "sel" : ""}">
              <rect class="frame" x=${m.x0} y=${-h / 2} width=${x} height=${h}></rect>
              ${b ? Qr($, y, x, s) : _`<line class="glass" x1=${m.x0} y1=${-h / 6} x2=${m.x1} y2=${-h / 6}></line>
                      <line class="glass" x1=${m.x0} y1=${h / 6} x2=${m.x1} y2=${h / 6}></line>`}
            </g>`;
    })}
      </g>`;
  }
  const a = Hd(e, i.hass), l = !!i.forceOpen || !e.entity || a.open, c = `opening door ${l ? "open" : ""} ${a.unknown ? "unknown" : ""} ${i.selected ? "selected" : ""}`;
  return _`
    <g class=${c} data-id=${e.id} transform="translate(${e.x} ${e.y}) rotate(${e.angle})" style=${o}>
      <rect class="hit" x=${-n / 2} y=${s > 0 ? -t / 2 : -n} width=${n} height=${n + t / 2}></rect>
      ${l ? Qr(r * n / 2, r, n, s) : _`<rect class="frame" x=${-n / 2} y=${-(t - 2) / 2} width=${n} height=${t - 2}></rect>
              <line class="leaf closed" x1=${-n / 2} y1="0" x2=${n / 2} y2="0"></line>`}
      ${qd(e, i.hass)}
    </g>`;
}
function Vd(e, t, i = {}) {
  const n = At(e, t) + 2;
  return _`<g class="openings">${e.openings.map(
    (o) => Ha(o, n, { hass: i.hass, selected: i.selectedId === o.id })
  )}</g>`;
}
const Ua = `
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
var Yd = Object.defineProperty, Zd = Object.getOwnPropertyDescriptor, U = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Zd(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Yd(t, i, o), o;
};
const ki = "floorplan_panel", Xd = 100, Nn = [1, 5, 10, 25, 50], Fe = 12, Dn = 14, Jr = 7, qe = { wall: "walls", opening: "openings", area: "areas", item: "items" };
let Yt, Si = 0;
const es = [
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
], Qd = [
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
], _t = ["#4f8bd6", "#e0a030", "#3fb5a8", "#8e6cc9", "#d65f5f", "#6aa84f", "#9e9e9e"];
let R = class extends le {
  constructor() {
    super(...arguments), this.revision = 0, this.narrow = !1, this._tool = "select", this._furnMode = !1, this._multi = [], this._guides = [], this._lastGuides = [], this._view = { x: 0, y: 0, w: 1e3, h: 700 }, this._roomPoints = [], this._dirty = !1, this._saving = !1, this._conflict = !1, this._svgSize = { w: 1, h: 1 }, this._undo = [], this._redo = [], this._baseRevision = 0, this._keyHandler = (e) => this._onKey(e);
  }
  // ---------------------------------------------------------------- Lebenszyklus
  willUpdate(e) {
    e.has("_sel") && this._multi.length && !this._multi.some((t) => t.kind === this._sel?.kind && t.id === this._sel?.id) && (this._multi = []), e.has("plan") && !this._draft && (this._draft = so(structuredClone(this.plan)), this._baseRevision = this.revision, this._floorId = this.floorId && this._draft.floors.some((t) => t.id === this.floorId) ? this.floorId : this._draft.floors[0]?.id, this._floorId || (this._draft.floors.push({ id: "eg", name: "Wohnung", walls: [], openings: [], areas: [], items: [] }), this._floorId = "eg"), this._fitView(), this.initialAreaId && this._floor.areas.some((t) => t.id === this.initialAreaId) && (this._sel = { kind: "area", id: this.initialAreaId }));
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
    const e = ho(this._floor, this._draft), t = Math.max(e.w, e.h) * 0.1;
    this._view = { x: e.x - t, y: e.y - t, w: e.w + 2 * t, h: e.h + 2 * t };
  }
  // ---------------------------------------------------------------- Änderungen & Undo
  _snapshot() {
    return JSON.stringify({ plan: this._draft, floorId: this._floorId });
  }
  _pushUndo(e) {
    this._undo.push(e), this._undo.length > Xd && this._undo.shift(), this._redo = [], this._dirty = !0;
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
      (e) => e.openings.filter(zn).map((t) => ({ floorId: e.id, opening: t }))
    );
  }
  _selectOpening(e, t) {
    this._floorId = e, this._sel = { kind: "opening", id: t }, this._tool = "select";
  }
  _deleteSelected() {
    const e = this._group;
    e.length && (this._mutate((t) => {
      for (const i of Object.keys(qe)) {
        const n = new Set(e.filter((o) => o.kind === i).map((o) => o.id));
        n.size && (t[qe[i]] = t[qe[i]].filter((o) => !n.has(o.id)));
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
      i = t.points.map((s) => s.x), n = t.points.map((s) => s.y);
    else {
      const s = e.kind === "opening" ? t.length / 2 : Dn * this._upp;
      i = [t.x - s, t.x + s], n = [t.y - s, t.y + s];
    }
    const o = Math.min(...i), r = Math.min(...n);
    return { x: o, y: r, w: Math.max(...i) - o, h: Math.max(...n) - r };
  }
  _selectInRect(e, t, i) {
    const n = Math.min(e.x, t.x), o = Math.max(e.x, t.x), r = Math.min(e.y, t.y), s = Math.max(e.y, t.y), a = i ? [...this._group] : [];
    for (const l of Object.keys(qe))
      for (const c of this._collection(l)) {
        const h = this._bbox({ kind: l, id: c.id });
        !h || h.x > o || h.x + h.w < n || h.y > s || h.y + h.h < r || a.some((d) => d.kind === l && d.id === c.id) || a.push({ kind: l, id: c.id });
      }
    this._setGroup(a);
  }
  _shiftElement(e, t, i, n, o) {
    e === "wall" ? Object.assign(t, { x1: i.x1 + n, y1: i.y1 + o, x2: i.x2 + n, y2: i.y2 + o }) : e === "area" ? t.points = i.points.map((r) => ({ x: r.x + n, y: r.y + o })) : Object.assign(t, { x: i.x + n, y: i.y + o });
  }
  get _gap() {
    return Math.max(this._draft.settings.grid, 10) * 2;
  }
  _groupClip() {
    const e = { walls: [], openings: [], areas: [], items: [] };
    for (const t of this._group) {
      const i = this._elementOf(t);
      i && e[qe[t.kind]].push(structuredClone(i));
    }
    return e;
  }
  _clipBounds(e) {
    const t = [], i = [];
    for (const r of e.walls) t.push(r.x1, r.x2), i.push(r.y1, r.y2);
    for (const r of e.openings) t.push(r.x), i.push(r.y);
    for (const r of e.areas) for (const s of r.points) t.push(s.x), i.push(s.y);
    for (const r of e.items) t.push(r.x), i.push(r.y);
    if (!t.length) return;
    const n = Math.min(...t), o = Math.min(...i);
    return { x: n, y: o, w: Math.max(...t) - n, h: Math.max(...i) - o };
  }
  /** Fügt eine Kopie des Inhalts mit neuen IDs um (dx, dy) verschoben auf der aktuellen Etage ein. */
  _insertClip(e, t, i, n) {
    const o = [], r = /* @__PURE__ */ new Map();
    return this._mutate((s) => {
      for (const a of e.walls) {
        const l = structuredClone(a);
        Object.assign(l, { id: q("w"), x1: a.x1 + t, y1: a.y1 + i, x2: a.x2 + t, y2: a.y2 + i }), s.walls.push(l), o.push({ kind: "wall", id: l.id });
      }
      for (const a of e.openings) {
        const l = structuredClone(a);
        Object.assign(l, { id: q(a.type === "door" ? "t" : "f"), x: a.x + t, y: a.y + i }), s.openings.push(l), o.push({ kind: "opening", id: l.id });
      }
      for (const a of e.areas) {
        const l = structuredClone(a);
        l.id = q("r"), l.points = a.points.map((c) => ({ x: c.x + t, y: c.y + i })), n && l.name && (l.name = `${l.name} (Kopie)`), r.set(a.id, l.id), s.areas.push(l), o.push({ kind: "area", id: l.id });
      }
      for (const a of e.items) {
        const l = structuredClone(a);
        Object.assign(l, { id: q("i"), x: a.x + t, y: a.y + i }), l.area && r.has(l.area) && (l.area = r.get(l.area)), s.items.push(l), o.push({ kind: "item", id: l.id });
      }
    }), o;
  }
  _duplicate() {
    const e = this._groupClip();
    this._clipBounds(e) && (this._setGroup(this._insertClip(e, this._gap, this._gap, !0)), this._menu = void 0);
  }
  _copy() {
    const e = this._groupClip();
    this._clipBounds(e) && (Yt = e, Si = 0, this._menu = void 0);
  }
  _paste() {
    Yt && (Si++, this._setGroup(this._insertClip(Yt, this._gap * Si, this._gap * Si, !0)), this._menu = void 0);
  }
  _saveTemplate() {
    const e = this._groupClip();
    if (!this._clipBounds(e)) return;
    if ((this._draft.settings.templates?.length ?? 0) >= Hr) {
      this._error = `Es sind höchstens ${Hr} Vorlagen möglich.`;
      return;
    }
    const t = prompt("Name der Vorlage", "Vorlage " + ((this._draft.settings.templates?.length ?? 0) + 1))?.trim();
    t && this._mutate((i, n) => {
      (n.settings.templates ??= []).push({ id: q("v"), name: t, ...e });
    });
  }
  _insertTemplate(e) {
    const t = this._clipBounds(e);
    if (!t) return;
    const i = this._draft.settings.grid, n = ke(this._view.x + this._view.w / 2 - (t.x + t.w / 2), i), o = ke(this._view.y + this._view.h / 2 - (t.y + t.h / 2), i);
    this._setGroup(this._insertClip(e, n, o, !1));
  }
  _deleteTemplate(e) {
    this._mutate((t, i) => {
      i.settings.templates = (i.settings.templates ?? []).filter((n) => n.id !== e), i.settings.templates.length || delete i.settings.templates;
    });
  }
  _openMenu(e, t, i) {
    if (this._tool !== "select" || (i && i.kind !== "handle" && !this._inGroup(i.kind, i.id) && this._setGroup([{ kind: i.kind, id: i.id }]), !this._group.length && !Yt)) return;
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
        type: `${ki}/plan/save`,
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
        const e = await this.hass.callWS({ type: `${ki}/plan/load_sample` });
        this._acceptServerPlan(e.plan, e.revision);
      } catch (e) {
        this._error = e?.message ?? String(e);
      }
  }
  _acceptServerPlan(e, t) {
    this._draft = so(e), this._baseRevision = t, this._floorId = this._draft.floors[0].id, this._undo = [], this._redo = [], this._dirty = !1, this._sel = void 0, this._history = void 0, this._fitView();
  }
  async _loadHistory() {
    const e = await this.hass.callWS({ type: `${ki}/history/list` });
    this._history = e.items;
  }
  async _restoreHistory(e) {
    if (!confirm("Diesen Stand wiederherstellen? Der aktuelle gespeicherte Stand bleibt im Verlauf.")) return;
    const t = await this.hass.callWS({ type: `${ki}/history/restore`, history_id: e });
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
    const o = kd(e, this._floor.walls, Fe * this._upp, i);
    if (o) return { ...o };
    const r = Sd(e, this._floor.areas, Fe * this._upp, n);
    if (r) return r;
    if (this._tool !== "item") {
      const c = Td(e, this._floor.walls, Fe * this._upp, i);
      if (c) return c;
    }
    const s = [];
    for (const c of this._floor.walls)
      i.includes(c) || s.push({ x: c.x1, y: c.y1 }, { x: c.x2, y: c.y2 });
    for (const c of this._floor.areas) for (const h of c.points) n.includes(h) || s.push(h);
    const a = Ia(e, s, Fe * this._upp);
    this._lastGuides = a.guides;
    const l = this._draft.settings.grid;
    return { x: a.x ?? ke(e.x, l), y: a.y ?? ke(e.y, l) };
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
        const r = e.shiftKey || e.ctrlKey || e.metaKey, s = this._wallRoomPts();
        if (o?.kind === "handle" && s && !this._sel) {
          const a = Number(o.handle.slice(1)), l = s.length;
          this._drag = { ...n, mode: "handle", wr: !0, handle: o.handle }, this._drag.edge = o.handle.startsWith("e") ? this._edgeSetup(s[a], s[(a + 1) % l]) : { n: { x: 0, y: 0 }, pts: this._movers((c) => j(c, s[a]) < 0.5) }, this._svg.setPointerCapture(e.pointerId);
          break;
        }
        if (o?.kind === "wall" && !r) {
          const a = this._floor.walls.find((h) => h.id === o.id), l = this._wallRoom?.walls.some((h) => h.id === o.id), c = a && !l && !jr(a, this._floor.areas).length ? this._findLoop(a) : void 0;
          if (c) {
            this._wallRoom = { walls: c }, this._sel = void 0, this._setGroup([]);
            const h = this._wallRoomPts();
            this._drag = { ...n, mode: "group", origs: this._wallRoomGroup(h).map((d) => ({ sel: d, orig: structuredClone(this._elementOf(d)) })) }, this._svg.setPointerCapture(e.pointerId);
            break;
          }
        }
        if (this._wallRoom = void 0, o && o.kind !== "handle" && r) {
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
          const r = e.shiftKey ? o : Rn(this._chainStart, o);
          if (j(r, this._chainStart) > 1) {
            const s = this._chainStart;
            this._mutate((a) => this._addWalls(a, s, r)), this._chainStart = r;
          }
        }
        break;
      }
      case "area": {
        const o = this._snap(t, e);
        this._roomPoints.length >= 3 && j(o, this._roomPoints[0]) <= Fe * this._upp ? this._finishRoom() : this._roomPoints = [...this._roomPoints, o];
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
        const o = Ne(this._draft.furniture, this._placeType);
        if (!o) break;
        const r = this._snap(t, e), s = q("i");
        this._mutate((a) => a.items.push({ id: s, x: r.x, y: r.y, furnitureType: o.id, tapAction: "auto" })), this._sel = { kind: "item", id: s }, this._tool = "select";
        break;
      }
      case "item": {
        const o = this._snap(t, e), r = q("i");
        this._mutate((s) => s.items.push({ id: r, x: o.x, y: o.y, icon: "mdi:lightbulb", tapAction: "auto" })), this._sel = { kind: "item", id: r }, this._tool = "select";
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
      const h = e.altKey ? 0 : this._draft.settings.grid, d = ke(t.x - i.start.x, h), p = ke(t.y - i.start.y, h);
      for (const { sel: f, orig: m } of i.origs) {
        const b = this._elementOf(f);
        b && this._shiftElement(f.kind, b, m, d, p);
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
        const p = e.altKey ? 0 : this._draft.settings.grid, f = ke((t.x - i.start.x) * h.x + (t.y - i.start.y) * h.y, p);
        for (const m of d) m.set(m.x + h.x * f, m.y + h.y * f);
      } else {
        const p = this._snap(t, e, d.flatMap((f) => f.wall ? [f.wall] : []), d.flatMap((f) => f.vert ? [f.vert] : []));
        for (const f of d) f.set(p.x, p.y);
      }
      this._draft = { ...this._draft };
      return;
    }
    const r = this._findSelected();
    if (!r || !i.sel) return;
    const s = e.altKey ? 0 : this._draft.settings.grid, a = ke(t.x - i.start.x, s), l = ke(t.y - i.start.y, s), c = i.orig;
    if (i.mode === "move")
      switch (i.sel.kind) {
        case "wall":
          Object.assign(r, { x1: c.x1 + a, y1: c.y1 + l, x2: c.x2 + a, y2: c.y2 + l });
          for (const h of i.links ?? []) this._applyLink(h, h.end === 1 ? { x: c.x1 + a, y: c.y1 + l } : { x: c.x2 + a, y: c.y2 + l });
          break;
        case "area":
          r.points = c.points.map((h) => ({ x: h.x + a, y: h.y + l }));
          break;
        case "item":
          Object.assign(r, { x: c.x + a, y: c.y + l });
          break;
        case "opening": {
          const h = { x: c.x + (t.x - i.start.x), y: c.y + (t.y - i.start.y) }, d = Fn(h, this._floor.walls, At(this._floor, this._draft) * 2 + Fe * this._upp);
          d && !e.altKey ? Object.assign(r, { x: Ee(d.point.x), y: Ee(d.point.y), angle: is(c.angle, d.angle) }) : Object.assign(r, { x: c.x + a, y: c.y + l });
          break;
        }
      }
    else if (i.mode === "handle" && i.handle) {
      if (i.sel.kind === "wall") {
        const h = i.handle === "p1" ? 1 : 2, d = h === 1 ? { x: c.x2, y: c.y2 } : { x: c.x1, y: c.y1 }, p = i.links?.[0];
        let f = this._snap(t, e, [r, ...(p?.walls ?? []).map((m) => m.wall)], p?.verts ?? []);
        !e.shiftKey && !e.altKey && (f = Rn(d, f)), r[`x${h}`] = f.x, r[`y${h}`] = f.y, p && this._applyLink(p, f);
      } else if (i.sel.kind === "area" && i.handle.startsWith("e") && i.edge) {
        const { n: h, pts: d } = i.edge, p = e.altKey ? 0 : this._draft.settings.grid, f = ke((t.x - i.start.x) * h.x + (t.y - i.start.y) * h.y, p);
        for (const m of d) m.set(m.x + h.x * f, m.y + h.y * f);
      } else if (i.sel.kind === "area" && i.handle.startsWith("v")) {
        const h = r.points[Number(i.handle.slice(1))], d = i.links?.[0], p = this._snap(t, e, d?.walls.map((f) => f.wall) ?? [], [h, ...d?.verts ?? []]);
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
      const r = Number(i.handle.slice(1));
      this._mutate(() => t.points.splice(r, 1));
      return;
    }
    const n = this._toPlan(e);
    let o = { i: -1, d: Fe * this._upp, pt: n };
    if (t.points.forEach((r, s) => {
      const a = t.points[(s + 1) % t.points.length], { point: l } = et(n, r, a), c = j(n, l);
      c < o.d && (o = { i: s, d: c, pt: l });
    }), o.i >= 0) {
      const r = this._snap(o.pt, e);
      this._mutate(() => t.points.splice(o.i + 1, 0, r));
    }
  }
  _onWheel(e) {
    e.preventDefault();
    const t = this._toPlan(e), i = Math.exp(e.deltaY * 15e-4), { width: n, height: o } = this._draft.canvas, r = Math.max(n, o) * 8, s = Math.min(r, Math.max(50, this._view.w * i)), a = s / this._view.w;
    this._view = {
      x: t.x - (t.x - this._view.x) * a,
      y: t.y - (t.y - this._view.y) * a,
      w: s,
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
    const o = i ?? (t === 1 ? { x: e.x1, y: e.y1 } : { x: e.x2, y: e.y2 }), r = [];
    for (const a of this._floor.walls)
      a !== e && (j(o, { x: a.x1, y: a.y1 }) < 0.5 && r.push({ wall: a, end: 1 }), j(o, { x: a.x2, y: a.y2 }) < 0.5 && r.push({ wall: a, end: 2 }));
    const s = [];
    for (const a of this._floor.areas)
      for (const l of a.points) l !== i && a !== n && j(o, l) < 0.5 && s.push(l);
    return { end: t, walls: r, verts: s };
  }
  _applyLink(e, t) {
    for (const i of e.walls)
      i.wall[`x${i.end}`] = t.x, i.wall[`y${i.end}`] = t.y;
    for (const i of e.verts) Object.assign(i, t);
  }
  _placeOpening(e, t, i) {
    const n = Fn(t, this._floor.walls, At(this._floor, this._draft) + Fe * 2 * this._upp), o = e === "door" ? 80 : 120, r = n ? { x: Ee(n.point.x), y: Ee(n.point.y) } : this._snap(t, i), s = q(e === "door" ? "t" : "f"), a = { id: s, type: e, x: r.x, y: r.y, length: o, angle: n ? is(0, n.angle) : 0 };
    e === "door" && Object.assign(a, { hinge: "left", swing: "in" }), this._mutate((l) => l.openings.push(a)), this._sel = { kind: "opening", id: s };
  }
  _finishRoom() {
    const e = this._roomPoints;
    if (e.length < 3) return;
    const t = q("r"), i = this._floor.areas.length;
    this._mutate(
      (n) => n.areas.push({ id: t, name: `Raum ${i + 1}`, points: e, color: _t[i % _t.length], sidebar: [] })
    ), this._roomPoints = [], this._sel = { kind: "area", id: t }, this._tool = "select";
  }
  /** Teilt vorhandene Wände an a/b, legt nur noch nicht abgedeckte Wandstücke an. */
  _addWalls(e, t, i) {
    for (const n of [t, i])
      for (const o of [...e.walls]) {
        const r = et(n, { x: o.x1, y: o.y1 }, { x: o.x2, y: o.y2 });
        if (j(n, r.point) > 0.5 || j(n, { x: o.x1, y: o.y1 }) < 0.5 || j(n, { x: o.x2, y: o.y2 }) < 0.5) continue;
        const s = { ...o, id: q("w"), x1: n.x, y1: n.y };
        o.x2 = n.x, o.y2 = n.y, e.walls.push(s);
      }
    for (const [n, o] of Cd(t, i, e.walls)) e.walls.push({ id: q("w"), x1: n.x, y1: n.y, x2: o.x, y2: o.y });
  }
  _finishRect(e, t) {
    const i = Math.min(e.x, t.x), n = Math.max(e.x, t.x), o = Math.min(e.y, t.y), r = Math.max(e.y, t.y);
    if (n - i < 1 || r - o < 1) return;
    const s = [
      { x: i, y: o },
      { x: n, y: o },
      { x: n, y: r },
      { x: i, y: r }
    ], a = q("r"), l = this._floor.areas.length, c = this._tool === "wallrect";
    if (this._mutate((h) => {
      s.forEach((d, p) => this._addWalls(h, d, s[(p + 1) % 4])), c || h.areas.push({ id: a, name: `Raum ${l + 1}`, points: s, color: _t[l % _t.length], sidebar: [] });
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
    if (!this._draft) return g;
    const e = es.find((t) => t.id === this._tool);
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
        <div class="main-title">Grundriss bearbeiten${this._dirty ? u`<span class="dirty"> • ungespeichert</span>` : g}</div>
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
            </button>` : g}
        <button class="save" ?disabled=${!this._dirty || this._saving} @click=${() => this._save()}>
          ${this._saving ? "Speichert …" : "Speichern"}
        </button>
      </div>
      ${this._error ? u`<div class="error-bar">
            ${this._conflict ? "Der Grundriss wurde inzwischen an anderer Stelle gespeichert." : this._error}
            ${this._conflict ? u`<button @click=${() => this._save(!0)}>Trotzdem überschreiben</button>` : g}
            <button @click=${() => this._error = void 0}>OK</button>
          </div>` : g}
      <div class="body">
        <div class="tools">
          ${es.map(
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
                      <button @click=${this._copy}><ha-icon icon="mdi:content-copy"></ha-icon>Kopieren</button>` : g}
                ${Yt ? u`<button @click=${this._paste}><ha-icon icon="mdi:content-paste"></ha-icon>Einfügen</button>` : g}
                ${this._group.length ? u`<button @click=${() => (this._menu = void 0, this._deleteSelected())}><ha-icon icon="mdi:delete-outline"></ha-icon>Löschen</button>` : g}
              </div>` : g}
          <div class="hint">${e.hint}</div>
        </div>
        <div class="props">${this._renderProps()}</div>
      </div>
    `;
  }
  _renderCanvas() {
    const e = this._draft, t = this._floor, { width: i, height: n } = e.canvas, o = this._upp, r = e.settings.grid, s = r * 10, a = At(t, e) + 2, l = this._sel, c = this._view, [h, d, p, f] = [c.x - c.w, c.y - c.h, c.w * 3, c.h * 3];
    return _`
      <defs>
        <pattern id="grid-minor" width=${r} height=${r} patternUnits="userSpaceOnUse">
          <path d="M ${r} 0 L 0 0 0 ${r}" class="grid-minor"></path>
        </pattern>
        <pattern id="grid-major" width=${s} height=${s} patternUnits="userSpaceOnUse">
          <rect width=${s} height=${s} fill="url(#grid-minor)"></rect>
          <path d="M ${s} 0 L 0 0 0 ${s}" class="grid-major"></path>
        </pattern>
      </defs>
      <rect class="sheet" x=${h} y=${d} width=${p} height=${f}></rect>
      ${r * (1 / o) >= 4 ? _`<rect x=${h} y=${d} width=${p} height=${f} fill="url(#grid-major)" pointer-events="none"></rect>` : g}
      <g class="areas">
        ${t.areas.map(
      (m) => _`<g data-kind="area" data-id=${m.id}>${Na(m, {
        selected: l?.kind === "area" && l.id === m.id,
        labelSize: Math.max(i, n) / 45
      })}</g>`
    )}
      </g>
      ${Da(t, e, "fp-editor-wall-mask", { selectedId: l?.kind === "wall" ? l.id : void 0 })}
      <g class="wall-hits">
        ${t.walls.map(
      (m) => _`<line data-kind="wall" data-id=${m.id} x1=${m.x1} y1=${m.y1} x2=${m.x2} y2=${m.y2}
                           stroke-width=${Math.max(Gi(m, e), 10 * o)}></line>`
    )}
      </g>
      <g class="openings">
        ${t.openings.map(
      (m) => _`<g data-kind="opening" data-id=${m.id}>${Ha(m, a, { selected: l?.kind === "opening" && l.id === m.id, forceOpen: l?.kind === "opening" && l.id === m.id, warn: zn(m), leafIndex: l?.kind === "opening" && l.id === m.id ? this._leafSel ?? void 0 : void 0 })}</g>`
    )}
      </g>
      <g class="furniture-layer">${t.items.map((m) => this._renderFurniture(m))}</g>
      <g class="items">${t.items.map((m) => this._renderItem(m, o))}</g>
      ${this._renderSelectionOverlay(o)}
      ${this._renderDrawPreview(o)}
      ${this._renderGuides(o)}
    `;
  }
  _renderFurniture(e) {
    const t = Ne(this._draft.furniture, e.furnitureType);
    if (!t) return g;
    const i = this._sel?.kind === "item" && this._sel.id === e.id || this._multi.some((r) => r.kind === "item" && r.id === e.id), n = !!e.entity && !!e.activeColor && ["on", "open", "home"].includes(this.hass?.states?.[e.entity]?.state ?? ""), o = Aa(e, t).map((r) => `${r.x},${r.y}`).join(" ");
    return _`<g>
      ${ao(e, t, { selected: i, fill: Ma(e, n) })}
      <polygon class="furn-hit" data-kind="item" data-id=${e.id} points=${o}></polygon>
    </g>`;
  }
  _renderItem(e, t) {
    if (!Ca(e, this._draft.furniture)) return g;
    const i = (e.size ?? 34) / 34 * Dn * t, n = this._sel?.kind === "item" && this._sel.id === e.id, o = e.icon ?? (e.entity ? Ae(this.hass, e.entity) : "mdi:map-marker");
    return _`
      <g class="item ${n ? "selected" : ""}" data-kind="item" data-id=${e.id}>
        <circle cx=${e.x} cy=${e.y} r=${i}></circle>
        <foreignObject x=${e.x - i} y=${e.y - i} width=${2 * i} height=${2 * i}>
          <div class="fo-icon" style="--mdc-icon-size:${i * 1.2}px;width:${2 * i}px;height:${2 * i}px">
            <ha-icon .icon=${o}></ha-icon>
          </div>
        </foreignObject>
        ${e.label ? _`<text x=${e.x} y=${e.y + i + 12 * t} font-size=${11 * t} text-anchor="middle" class="item-label">${e.label}</text>` : g}
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
      const { a: o, b: r } = this._marquee;
      return _`<rect class="marquee" x=${Math.min(o.x, r.x)} y=${Math.min(o.y, r.y)} width=${Math.abs(o.x - r.x)} height=${Math.abs(o.y - r.y)} stroke-width=${e}></rect>`;
    }
    if (this._multi.length > 1) {
      const o = 4 * e;
      return _`${this._multi.map((r) => {
        const s = this._bbox(r);
        return s ? _`<rect class="sel-outline" x=${s.x - o} y=${s.y - o} width=${s.w + 2 * o} height=${s.h + 2 * o} stroke-width=${2 * e}></rect>` : g;
      })}`;
    }
    const t = this._sel ? void 0 : this._wallRoomPts();
    if (t) {
      const o = Jr * e;
      return _`
        <polygon class="sel-outline" points=${t.map((r) => `${r.x},${r.y}`).join(" ")} stroke-width=${2 * e}></polygon>
        ${t.map((r, s) => _`<circle class="handle" data-handle="v${s}" cx=${r.x} cy=${r.y} r=${o} stroke-width=${2 * e}></circle>`)}
        ${t.map((r, s) => {
        const a = t[(s + 1) % t.length];
        return _`<rect class="handle" data-handle="e${s}" x=${(r.x + a.x) / 2 - o} y=${(r.y + a.y) / 2 - o} width=${2 * o} height=${2 * o} rx=${o / 3} stroke-width=${2 * e}></rect>`;
      })}`;
    }
    const i = this._findSelected();
    if (!i || !this._sel) return g;
    if (this._sel.kind === "item" && Mi(i, this._draft.furniture)) {
      const o = i, r = o.glowRadius ?? ro, s = (l) => Gi(l, this._draft), a = Ra(this._floor.walls, this._floor.openings, (l) => Fa(l), s);
      return _`${Ta(o, this._draft.furniture).map((l) => {
        const c = La(l.x, l.y, r, a, s);
        return c ? _`<polygon class="glow-reach" points=${c.map((h) => `${h.x},${h.y}`).join(" ")} stroke-width=${1.5 * e}></polygon>` : _`<circle class="glow-reach" cx=${l.x} cy=${l.y} r=${r} stroke-width=${1.5 * e}></circle>`;
      })}`;
    }
    const n = Jr * e;
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
        <polygon class="sel-outline" points=${o.points.map((r) => `${r.x},${r.y}`).join(" ")} stroke-width=${2 * e}></polygon>
        ${o.points.map(
        (r, s) => _`<circle class="handle" data-handle="v${s}" cx=${r.x} cy=${r.y} r=${n} stroke-width=${2 * e}></circle>`
      )}
        ${o.points.map((r, s) => {
        const a = o.points[(s + 1) % o.points.length];
        return _`<rect class="handle" data-handle="e${s}" x=${(r.x + a.x) / 2 - n} y=${(r.y + a.y) / 2 - n} width=${2 * n} height=${2 * n} rx=${n / 3} stroke-width=${2 * e}></rect>`;
      })}`;
    }
    return g;
  }
  _lengthLabel(e, t, i) {
    const n = j(e, t);
    return n < 1 ? g : _`<text class="measure" x=${(e.x + t.x) / 2} y=${(e.y + t.y) / 2 - 10 * i} font-size=${12 * i}
                     text-anchor="middle">${Hn(n)}</text>`;
  }
  _renderDrawPreview(e) {
    const t = this._cursor;
    if (!t) return g;
    const i = { altKey: !1 };
    if (this._tool === "wall") {
      const n = this._snap(t, i);
      if (!this._chainStart) return _`<circle class="cursor-dot" cx=${n.x} cy=${n.y} r=${4 * e}></circle>`;
      const o = Rn(this._chainStart, n);
      return _`
        <line class="preview-wall" x1=${this._chainStart.x} y1=${this._chainStart.y} x2=${o.x} y2=${o.y}
              stroke-width=${this._draft.settings.wallThickness}></line>
        ${this._lengthLabel(this._chainStart, o, e)}`;
    }
    if (this._tool === "rect" || this._tool === "wallrect") {
      const n = this._snap(t, i), o = this._drag;
      if (o?.mode !== "rect") return _`<circle class="cursor-dot" cx=${n.x} cy=${n.y} r=${4 * e}></circle>`;
      const r = Math.min(o.start.x, n.x), s = Math.min(o.start.y, n.y), a = Math.abs(n.x - o.start.x), l = Math.abs(n.y - o.start.y);
      return _`
        <rect class="preview-area" x=${r} y=${s} width=${a} height=${l} stroke-width=${2 * e}></rect>
        ${a > 1 ? this._lengthLabel({ x: r, y: s }, { x: r + a, y: s }, e) : g}
        ${l > 1 ? this._lengthLabel({ x: r + a, y: s }, { x: r + a, y: s + l }, e) : g}`;
    }
    if (this._tool === "area") {
      const n = this._snap(t, i), o = [...this._roomPoints, n];
      return _`
        <polyline class="preview-area" points=${o.map((r) => `${r.x},${r.y}`).join(" ")} stroke-width=${2 * e}></polyline>
        ${this._roomPoints.map((r, s) => _`<circle class="cursor-dot ${s === 0 ? "first" : ""}" cx=${r.x} cy=${r.y} r=${(s === 0 ? 6 : 4) * e}></circle>`)}
        <circle class="cursor-dot" cx=${n.x} cy=${n.y} r=${4 * e}></circle>`;
    }
    if (this._tool === "door" || this._tool === "window") {
      const n = Fn(t, this._floor.walls, At(this._floor, this._draft) + Fe * 2 * e);
      return n ? _`<circle class="cursor-dot" cx=${n.point.x} cy=${n.point.y} r=${5 * e}></circle>` : g;
    }
    if (this._tool === "furniture") {
      const n = Ne(this._draft.furniture, this._placeType);
      if (!n) return g;
      const o = this._snap(t, i);
      return _`<g opacity=".6">${ao({ id: "", x: o.x, y: o.y }, n, {})}</g>`;
    }
    if (this._tool === "item") {
      const n = this._snap(t, i);
      return _`<circle class="preview-item" cx=${n.x} cy=${n.y} r=${Dn * e}></circle>`;
    }
    return g;
  }
  // ---------------------------------------------------------------- Eigenschaften
  _renderPicker() {
    const e = this._draft.furniture ?? [];
    return u`
      <div class="props-head"><h3>Möbel platzieren</h3></div>
      ${e.length ? u`<div class="furn-picker">${e.map((t) => {
      const i = ji(t), n = Math.max(i.x1 - i.x0, i.y1 - i.y0) * 0.1 + 2;
      return u`<button class="furn-pick ${this._placeType === t.id ? "active" : ""}" title=${t.name} @click=${() => this._placeType = t.id}>
              <svg viewBox="${i.x0 - n} ${i.y0 - n} ${i.x1 - i.x0 + 2 * n} ${i.y1 - i.y0 + 2 * n}"><g class="furniture">${t.parts.map((o) => Wi(o))}</g></svg>
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
      const i = oi(this._wallRoomPts());
      return u`
        <div class="props-head"><h3>Raum aus Wänden</h3></div>
        ${i ? u`<p class="muted">${Hn(i.w)} × ${Hn(i.h)}</p>` : g}
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
        .value=${i == null ? "" : String(Ee(i))}
        min=${n.min ?? ""}
        max=${n.max ?? ""}
        step=${n.step ?? 1}
        placeholder=${n.placeholder ?? ""}
        @change=${(o) => {
      const r = o.target.value;
      this._setProp(t, r === "" ? void 0 : Number(r));
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
      ${i ? u`<button class="link" @click=${() => this._setProp(t, void 0)}>Standard</button>` : g}
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
        <input type="number" min="1" step="1" .value=${String(Ee(j({ x: e.x1, y: e.y1 }, { x: e.x2, y: e.y2 })))}
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
    const i = jr(t, this._floor.areas), n = this._sel;
    if (!(!i.length || n?.kind === "wall" && n.id === t.id))
      return i.find((o) => n?.kind === "area" && n.id === o.id) ? void 0 : i[0];
  }
  _roomGroup(e) {
    const t = this._floor, i = Pa(e, t.walls), n = [{ kind: "area", id: e.id }, ...i.map((o) => ({ kind: "wall", id: o.id }))];
    for (const o of t.openings)
      i.some((r) => ri({ x: o.x, y: o.y }, { x: r.x1, y: r.y1 }, { x: r.x2, y: r.y2 }, 3)) && n.push({ kind: "opening", id: o.id });
    for (const o of t.items) Xe(e.points, o.x, o.y) && n.push({ kind: "item", id: o.id });
    return n;
  }
  _movers(e) {
    const t = [];
    for (const i of this._floor.areas)
      for (const n of i.points) e(n) && t.push({ x: n.x, y: n.y, vert: n, set: (o, r) => Object.assign(n, { x: o, y: r }) });
    for (const i of this._floor.walls)
      e({ x: i.x1, y: i.y1 }) && t.push({ x: i.x1, y: i.y1, wall: i, set: (n, o) => Object.assign(i, { x1: n, y1: o }) }), e({ x: i.x2, y: i.y2 }) && t.push({ x: i.x2, y: i.y2, wall: i, set: (n, o) => Object.assign(i, { x2: n, y2: o }) });
    return t;
  }
  _edgeSetup(e, t) {
    const i = j(e, t) || 1;
    return { n: { x: -(t.y - e.y) / i, y: (t.x - e.x) / i }, pts: this._movers((o) => ri(o, e, t)) };
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
    const r = /* @__PURE__ */ new Map(), s = [n], a = /* @__PURE__ */ new Set([n]);
    for (; s.length && !a.has(o); ) {
      const h = s.shift();
      for (const d of i.get(h) ?? [])
        d.w === e || a.has(d.to) || (a.add(d.to), r.set(d.to, { from: h, w: d.w, flip: d.flip }), s.push(d.to));
    }
    if (!a.has(o)) return;
    const l = [];
    for (let h = o; h !== n; ) {
      const d = r.get(h);
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
    const t = this._floor, i = new Set(this._wallRoom.walls.map((r) => r.id)), n = t.walls.filter((r) => i.has(r.id)), o = n.map((r) => ({ kind: "wall", id: r.id }));
    for (const r of t.openings)
      n.some((s) => ri({ x: r.x, y: r.y }, { x: s.x1, y: s.y1 }, { x: s.x2, y: s.y2 }, 3)) && o.push({ kind: "opening", id: r.id });
    for (const r of t.items) Xe(e, r.x, r.y) && o.push({ kind: "item", id: r.id });
    return o;
  }
  _wallRoomToArea() {
    const e = this._wallRoomPts();
    if (!e) return;
    const t = q("r"), i = this._floor.areas.length;
    this._mutate((n) => n.areas.push({ id: t, name: `Raum ${i + 1}`, points: e, color: _t[i % _t.length], sidebar: [] })), this._wallRoom = void 0, this._sel = { kind: "area", id: t };
  }
  _deleteWallRoom() {
    const e = this._wallRoomPts();
    if (!e) return;
    const t = this._wallRoomGroup(e);
    this._mutate((i) => {
      for (const n of Object.keys(qe)) {
        const o = new Set(t.filter((r) => r.kind === n).map((r) => r.id));
        o.size && (i[qe[n]] = i[qe[n]].filter((r) => !o.has(r.id)));
      }
    }), this._wallRoom = void 0;
  }
  _setWallLength(e) {
    const t = this._findSelected();
    if (!t || !Number.isFinite(e) || e < 1) return;
    const i = j({ x: t.x1, y: t.y1 }, { x: t.x2, y: t.y2 });
    i < 0.01 || this._mutate(() => {
      const n = this._linksAt(t, 2), o = e / i, r = { x: Ee(t.x1 + (t.x2 - t.x1) * o), y: Ee(t.y1 + (t.y2 - t.y1) * o) };
      t.x2 = r.x, t.y2 = r.y, this._applyLink(n, r);
    });
  }
  _setRectSize(e, t, i) {
    const n = oi(e.points);
    !n || !(t >= 1) || !(i >= 1) || this._mutate(() => {
      const o = e.points.map((r) => this._linksAt(void 0, 0, r, e));
      e.points.forEach((r, s) => {
        const a = { x: r.x === n.x ? n.x : n.x + t, y: r.y === n.y ? n.y : n.y + i };
        Object.assign(r, a), this._applyLink(o[s], a);
      });
    });
  }
  _autoPlaceIcons(e) {
    const t = new Set(this._floor.items.map((r) => r.entity).filter(Boolean)), i = e.sidebar.map((r) => r.entity).filter((r) => !t.has(r));
    if (!i.length) return;
    const n = this._floor.items.filter((r) => Xe(e.points, r.x, r.y)).map((r) => ({ x: r.x, y: r.y })), o = Ad(e.points, i.map((r) => ({ light: ye(r) === "light" })), n, Bo(e.points));
    this._mutate((r) => {
      i.forEach((s, a) => r.items.push({ id: q("i"), x: o[a].x, y: o[a].y, entity: s, icon: Ae(this.hass, s), tapAction: "auto" }));
    });
  }
  _renderOpeningProps(e) {
    const t = e.type === "window", i = zn(e), n = po(e), o = uo(e), r = (s) => e.shutters?.find((a) => a.side === s);
    return u`
      <label class="field">
        <span>Art</span>
        <select @change=${(s) => this._setProp("type", s.target.value)}>
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
                @value-changed=${(s) => this._setProp("entity", s.detail.value)}
              ></fp-entity-picker>
              ${i ? u`<span class="warn">Ohne Sensor kann der Öffnungszustand nicht angezeigt werden.</span>` : g}
            </div>
            <h4>Flügel (${n.length} von ${no})</h4>
            ${n.map(
      (s, a) => u`<div class="leaf-row ${this._leafSel === a ? "active" : ""}" @click=${() => this._leafSel = a}>
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
                  .value=${s.entity ?? ""}
                  .domains=${["binary_sensor"]}
                  placeholder="Eigener Sensor (optional)"
                  @value-changed=${(l) => this._setLeaf(a, { entity: l.detail.value || void 0 })}
                ></fp-entity-picker>
              </div>`
    )}
            <div class="btn-row">
              <button ?disabled=${n.length >= no} @click=${() => this._setLeafCount(n.length + 1)}>
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
      ${this._color("Farbe wenn offen", "openColor", e.openColor, xa)}
      <p class="muted">Im Editor wird die ausgewählte Öffnung geöffnet gezeigt. Ziehen schiebt sie entlang der Wände.</p>
      ${t ? u`<h4>Rollo</h4>
            ${["out", "in"].map((s) => {
      const a = r(s);
      return u`<div class="shutter-row">
                <div class="field">
                  <span>${s === "out" ? "Außen" : "Innen"} (optional)</span>
                  <fp-entity-picker
                    .hass=${this.hass}
                    .value=${a?.entity ?? ""}
                    .domains=${["cover"]}
                    @value-changed=${(l) => this._setShutter(s, { entity: l.detail.value })}
                  ></fp-entity-picker>
                </div>
                ${a ? u`<label class="field color">
                      <span>Farbe</span>
                      <input
                        type="color"
                        .value=${a.color && a.color.startsWith("#") ? a.color : wa}
                        @change=${(l) => this._setShutter(s, { color: l.target.value })}
                      />
                    </label>` : g}
              </div>`;
    })}
            <p class="muted">Außen liegt auf der Seite gegen den Aufschlag „innen“; die Tiefe des Bands zeigt, wie weit das Rollo zu ist.</p>` : g}
    `;
  }
  /** Ändert die Flügelliste des ausgewählten Fensters. */
  _editLeaves(e) {
    this._mutate(() => {
      const t = this._findSelected();
      t && (t.leaves = e(po(t).map((i) => ({ ...i })), t));
    });
  }
  _setLeaf(e, t) {
    this._leafSel = e, this._editLeaves((i, n) => {
      if (t.hinge === void 0) return i.map((r, s) => s === e ? ts({ ...r, ...t }) : r);
      const o = uo(n);
      return i.map((r, s) => s === e ? ts({ ...r, ...t }) : { ...r, hinge: r.hinge ?? o[s].hinge });
    });
  }
  _setLeafCount(e) {
    this._editLeaves((t) => Bd(t, e)), this._leafSel = Math.min(this._leafSel ?? 0, e - 1);
  }
  _setLeafWidth(e, t) {
    Number.isFinite(t) && this._editLeaves((i, n) => jd(i, e, t, n.length));
  }
  _setShutter(e, t) {
    this._mutate(() => {
      const i = this._findSelected();
      if (!i) return;
      const n = (i.shutters ?? []).filter((s) => s.side !== e), r = { ...i.shutters?.find((s) => s.side === e) ?? { entity: "", side: e }, ...t };
      r.entity && n.push(r), n.length ? i.shutters = n : delete i.shutters;
    });
  }
  _renderAreaProps(e) {
    const t = Object.values(this.hass.areas ?? {}).sort((n, o) => n.name.localeCompare(o.name)), i = this._areaSuggestions(e);
    return u`
      ${this._text("Name", "name", e.name)}
      <label class="field">
        <span>Art</span>
        <select @change=${(n) => this._setProp("type", n.target.value)}>
          ${$a.map(([n, o]) => u`<option value=${n} ?selected=${(e.type ?? "room") === n}>${o}</option>`)}
        </select>
      </label>
      ${e.type === "custom" ? this._text("Bezeichnung", "typeLabel", e.typeLabel) : g}
      <div class="grid2">
        ${this._color("Farbe", "color", e.color, "#4f8bd6")}
        <label class="field">
          <span>Deckkraft</span>
          <input type="range" min="0" max="0.6" step="0.02" .value=${String(e.opacity ?? 0.12)}
                 @change=${(n) => this._setProp("opacity", Number(n.target.value))} />
        </label>
      </div>
      ${(() => {
      const n = oi(e.points);
      return n ? u`<div class="grid2">
              <label class="field"><span>Breite</span><input type="number" min="1" .value=${String(Ee(n.w))} @change=${(o) => this._setRectSize(e, Number(o.target.value), n.h)} /></label>
              <label class="field"><span>Höhe</span><input type="number" min="1" .value=${String(Ee(n.h))} @change=${(o) => this._setRectSize(e, n.w, Number(o.target.value))} /></label>
            </div>` : g;
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
        const r = this._findSelected();
        o ? r.haArea = o : delete r.haArea, o && (!r.name || /^Raum \d+$/.test(r.name)) && (r.name = this.hass.areas[o].name);
      });
    }}
              >
                <option value="">– keiner –</option>
                ${t.map((n) => u`<option value=${n.area_id} ?selected=${e.haArea === n.area_id}>${n.name}</option>`)}
              </select>
            </label>` : g}
        ${this._entity("Raum einfärben, wenn aktiv", "entity", e.entity, ["binary_sensor", "input_boolean", "light", "switch", "person"])}
        ${e.entity ? this._color("Farbe wenn aktiv", "activeColor", e.activeColor, "#ffc107") : g}
      </details>

      <h4>Seitenleiste</h4>
      <p class="muted">Nur was hier steht, erscheint beim Antippen des Raums – Geräte, Szenen und Skripte.</p>
      <div class="sidebar-list">
        ${e.sidebar.map(
      (n, o) => u`<div class="sb-row">
            <ha-icon .icon=${Ae(this.hass, n.entity, n.icon)}></ha-icon>
            <div class="sb-main">
              <input
                type="text"
                .value=${n.name ?? ""}
                placeholder=${fi(this.hass, n.entity)}
                @change=${(r) => this._editSidebar(o, "name", r.target.value.trim())}
              />
              <small>${n.entity} · ${{ device: "Gerät", scene: "Szene", script: "Skript" }[Hi(n.entity)]}${this.hass.states[n.entity] ? "" : " · nicht gefunden"}</small>
            </div>
            <button class="icon-btn" title="Nach oben" ?disabled=${o === 0} @click=${() => this._moveSidebar(o, -1)}><ha-icon icon="mdi:chevron-up"></ha-icon></button>
            <button class="icon-btn" title="Nach unten" ?disabled=${o === e.sidebar.length - 1} @click=${() => this._moveSidebar(o, 1)}><ha-icon icon="mdi:chevron-down"></ha-icon></button>
            <button class="icon-btn" title="Entfernen" @click=${() => this._removeSidebar(o)}><ha-icon icon="mdi:close"></ha-icon></button>
          </div>`
    )}
      </div>
      ${e.sidebar.length ? u`<button class="chip" title="Fehlende Icons für die Seitenleisten-Geräte im Raum verteilen" @click=${() => this._autoPlaceIcons(e)}>
            <ha-icon icon="mdi:auto-fix"></ha-icon>Icons automatisch platzieren
          </button>` : g}
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
                  <ha-icon .icon=${Ae(this.hass, n)}></ha-icon>${fi(this.hass, n)}
                </button>`
    )}
            </div>
          </div>` : g}
    `;
  }
  /** Entitäten des verknüpften HA-Bereichs, die noch nicht in der Seitenleiste sind (nur Vorschlag). */
  _areaSuggestions(e) {
    if (!e.haArea || !this.hass.entities) return [];
    const t = new Set(e.sidebar.map((o) => o.entity)), i = this.hass.devices, n = /* @__PURE__ */ new Set(["light", "switch", "fan", "cover", "climate", "media_player", "lock", "scene", "script", "vacuum", "input_boolean", "sensor", "binary_sensor", "humidifier", "valve", "button"]);
    return Object.values(this.hass.entities).filter((o) => !o.hidden && !t.has(o.entity_id) && n.has(ye(o.entity_id))).filter((o) => (o.area_id ?? (o.device_id ? i?.[o.device_id]?.area_id : void 0)) === e.haArea).map((o) => o.entity_id).slice(0, 30);
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
    const t = this._draft.furniture ?? [], i = Ne(t, e.furnitureType), n = (o) => this._setProp("rotation", (((e.rotation ?? 0) + o) % 360 + 360) % 360);
    return u`
      <label class="field">
        <span>Vorlage</span>
        <select @change=${(o) => this._setProp("furnitureType", o.target.value)}>
          ${i ? g : u`<option value="" selected>${e.furnitureType ? "(gelöscht)" : "keine"}</option>`}
          ${t.map((o) => u`<option value=${o.id} ?selected=${o.id === e.furnitureType}>${o.name}</option>`)}
        </select>
      </label>
      ${i ? u`<button class="chip" @click=${() => this._editTemplate(i.id)}><ha-icon icon="mdi:pencil-outline"></ha-icon>Vorlage bearbeiten</button>` : g}
      <div class="grid2">
        ${this._num("Drehung (°)", "rotation", e.rotation, { min: -720, max: 720, step: 5, placeholder: "0" })}
        ${this._num("Skalierung", "scale", e.scale, { min: 0.05, max: 20, step: 0.1, placeholder: "1" })}
      </div>
      <div class="row-btns">
        <button class="chip" @click=${() => n(-90)}><ha-icon icon="mdi:rotate-left"></ha-icon>−90°</button>
        <button class="chip" @click=${() => n(90)}><ha-icon icon="mdi:rotate-right"></ha-icon>+90°</button>
      </div>
      ${this._color("Farbe (überschreibt Vorlage)", "fillColor", e.fillColor, "#9e9e9e")}
      ${i?.lights?.length ? u`<p class="muted">Die Vorlage hat ${i.lights.length} Leuchtpunkt${i.lights.length > 1 ? "e" : ""}. Mit einer Licht-Entität scheint das Licht genau dort.</p>` : g}
      <h4>Icon / Entität</h4>
    `;
  }
  _renderItemProps(e) {
    return u`
      ${e.furnitureType ? this._renderFurnitureProps(e) : g}
      <div class="field">
        <span>Icon</span>
        <div class="icon-input">
          <ha-icon .icon=${e.icon ?? (e.entity ? Ae(this.hass, e.entity) : "mdi:map-marker")}></ha-icon>
          <input type="text" .value=${e.icon ?? ""} placeholder=${e.entity ? "vom Gerät" : "mdi:…"}
                 @change=${(t) => this._setProp("icon", t.target.value.trim())} />
        </div>
        <div class="icon-grid">
          ${Qd.map(
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
        <input type="checkbox" .checked=${Mi(e, this._draft.furniture)} @change=${(t) => this._setProp("glow", t.target.checked)} />
        <span>Lichtschein anzeigen${e.glow === void 0 || e.glow === null ? " (automatisch)" : ""}</span>
      </label>
      ${Mi(e, this._draft.furniture) ? u`<div class="grid2">
              ${this._num("Radius", "glowRadius", e.glowRadius, { min: 10, max: 5e3, step: 10, placeholder: String(ro) })}
              ${this._color("Farbe ohne RGB", "glowColor", e.glowColor, ka)}
            </div>
            <p class="muted">Bei voller Helligkeit; gedimmt schrumpft der Schein. RGB-Lampen leuchten in ihrer eigenen Farbe. Die gestrichelte Kontur zeigt, wo Wände das Licht begrenzen.</p>` : g}
      <h4>Sichtbarkeit</h4>
      ${this._check("Nur zeigen, wenn der Raum gezoomt ist", "showOnlyWhenZoomed", e.showOnlyWhenZoomed)}
      ${e.showOnlyWhenZoomed ? u`<label class="field">
            <span>Gehört zu Raum</span>
            <select @change=${(t) => this._setProp("area", t.target.value)}>
              <option value="">automatisch (Lage im Raum)</option>
              ${this._floor.areas.map((t) => u`<option value=${t.id} ?selected=${e.area === t.id}>${t.name || t.id}</option>`)}
            </select>
          </label>` : g}
      ${!e.area && !this._floor.areas.some((t) => Xe(t.points, e.x, e.y)) && e.showOnlyWhenZoomed ? u`<p class="warn">Das Icon liegt in keinem Raum und wird deshalb nie angezeigt.</p>` : g}
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
            ${(Nn.includes(e.settings.grid) ? Nn : [...Nn, e.settings.grid].sort((i, n) => i - n)).map(
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
            </div>` : g}
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
      const r = Number(o.target.value);
      Number.isFinite(r) && r >= n && this._mutate(() => i(r));
    }}
      />
    </label>`;
  }
  _addFloor() {
    const e = prompt("Name der neuen Etage", "Etage " + (this._draft.floors.length + 1));
    if (!e) return;
    const t = q("etage");
    this._mutate((i, n) => n.floors.push({ id: t, name: e, walls: [], openings: [], areas: [], items: [] })), this._floorId = t, this._sel = void 0;
  }
  _deleteFloor() {
    if (this._draft.floors.length < 2 || !confirm(`Etage „${this._floor.name || this._floorId}“ mit allem Inhalt löschen?`)) return;
    const e = this._floorId;
    this._mutate((t, i) => i.floors = i.floors.filter((n) => n.id !== e)), this._floorId = this._draft.floors[0].id, this._sel = void 0;
  }
};
R.styles = [
  Be(Ua),
  Be(Uo),
  fe`
      .furn-hit { fill: transparent; pointer-events: all; cursor: move; }
      .furn-picker { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin: 8px 0; }
      .furn-pick { display: flex; flex-direction: column; align-items: center; gap: 2px; border: 1px solid var(--divider-color); border-radius: 8px; background: none; padding: 6px; cursor: pointer; font-size: 11px; color: var(--primary-text-color); }
      .furn-pick.active { border-color: var(--primary-color); outline: 2px solid var(--primary-color); }
      .furn-pick svg { width: 100%; height: 56px; }
      .chip-top { display: inline-flex; align-items: center; gap: 4px; border: 1px solid rgba(255,255,255,.6); border-radius: 16px; background: none; color: inherit; padding: 4px 12px; cursor: pointer; font: inherit; font-size: 13px; --mdc-icon-size: 18px; }
    `,
  fe`
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
U([
  A({ attribute: !1 })
], R.prototype, "hass", 2);
U([
  A({ attribute: !1 })
], R.prototype, "plan", 2);
U([
  A({ attribute: !1 })
], R.prototype, "revision", 2);
U([
  A({ attribute: !1 })
], R.prototype, "floorId", 2);
U([
  A({ attribute: !1 })
], R.prototype, "initialAreaId", 2);
U([
  A({ type: Boolean, reflect: !0 })
], R.prototype, "narrow", 2);
U([
  k()
], R.prototype, "_draft", 2);
U([
  k()
], R.prototype, "_floorId", 2);
U([
  k()
], R.prototype, "_tool", 2);
U([
  k()
], R.prototype, "_furnMode", 2);
U([
  k()
], R.prototype, "_furnOpen", 2);
U([
  k()
], R.prototype, "_placeType", 2);
U([
  k()
], R.prototype, "_sel", 2);
U([
  k()
], R.prototype, "_multi", 2);
U([
  k()
], R.prototype, "_marquee", 2);
U([
  k()
], R.prototype, "_guides", 2);
U([
  k()
], R.prototype, "_wallRoom", 2);
U([
  k()
], R.prototype, "_menu", 2);
U([
  k()
], R.prototype, "_leafSel", 2);
U([
  k()
], R.prototype, "_view", 2);
U([
  k()
], R.prototype, "_cursor", 2);
U([
  k()
], R.prototype, "_chainStart", 2);
U([
  k()
], R.prototype, "_roomPoints", 2);
U([
  k()
], R.prototype, "_dirty", 2);
U([
  k()
], R.prototype, "_saving", 2);
U([
  k()
], R.prototype, "_error", 2);
U([
  k()
], R.prototype, "_conflict", 2);
U([
  k()
], R.prototype, "_history", 2);
U([
  k()
], R.prototype, "_svgSize", 2);
U([
  Bt("svg.canvas")
], R.prototype, "_svg", 2);
R = U([
  Ge("fp-editor")
], R);
function ts(e) {
  const t = { w: e.w };
  return e.entity && (t.entity = e.entity), e.hinge && (t.hinge = e.hinge), t;
}
function Ee(e) {
  return Math.round(e * 10) / 10;
}
function is(e, t) {
  const i = (t % 360 + 360) % 360, n = (i + 180) % 360, o = (e % 360 + 360) % 360, r = (s) => Math.min(Math.abs(s - o), 360 - Math.abs(s - o));
  return Ee(r(i) <= r(n) ? i : n);
}
function Hn(e) {
  return e >= 100 ? `${(e / 100).toFixed(2).replace(".", ",")} m` : `${Math.round(e)} cm`;
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Jd = { CHILD: 2 }, un = (e) => (...t) => ({ _$litDirective$: e, values: t });
let fn = class {
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
const { I: eh } = Zc, ns = (e) => e, os = () => document.createComment(""), Zt = (e, t, i) => {
  const n = e._$AA.parentNode, o = t === void 0 ? e._$AB : t._$AA;
  if (i === void 0) {
    const r = n.insertBefore(os(), o), s = n.insertBefore(os(), o);
    i = new eh(r, s, e, e.options);
  } else {
    const r = i._$AB.nextSibling, s = i._$AM, a = s !== e;
    if (a) {
      let l;
      i._$AQ?.(e), i._$AM = e, i._$AP !== void 0 && (l = e._$AU) !== s._$AU && i._$AP(l);
    }
    if (r !== o || a) {
      let l = i._$AA;
      for (; l !== r; ) {
        const c = ns(l).nextSibling;
        ns(n).insertBefore(l, o), l = c;
      }
    }
  }
  return i;
}, nt = (e, t, i = e) => (e._$AI(t, i), e), th = {}, Ba = (e, t = th) => e._$AH = t, ih = (e) => e._$AH, Un = (e) => {
  e._$AR(), e._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rs = (e, t, i) => {
  const n = /* @__PURE__ */ new Map();
  for (let o = t; o <= i; o++) n.set(e[o], o);
  return n;
}, ze = un(class extends fn {
  constructor(e) {
    if (super(e), e.type !== Jd.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e, t, i) {
    let n;
    i === void 0 ? i = t : t !== void 0 && (n = t);
    const o = [], r = [];
    let s = 0;
    for (const a of e) o[s] = n ? n(a, s) : s, r[s] = i(a, s), s++;
    return { values: r, keys: o };
  }
  render(e, t, i) {
    return this.dt(e, t, i).values;
  }
  update(e, [t, i, n]) {
    const o = ih(e), { values: r, keys: s } = this.dt(t, i, n);
    if (!Array.isArray(o)) return this.ut = s, r;
    const a = this.ut ??= [], l = [];
    let c, h, d = 0, p = o.length - 1, f = 0, m = r.length - 1;
    for (; d <= p && f <= m; ) if (o[d] === null) d++;
    else if (o[p] === null) p--;
    else if (a[d] === s[f]) l[f] = nt(o[d], r[f]), d++, f++;
    else if (a[p] === s[m]) l[m] = nt(o[p], r[m]), p--, m--;
    else if (a[d] === s[m]) l[m] = nt(o[d], r[m]), Zt(e, l[m + 1], o[d]), d++, m--;
    else if (a[p] === s[f]) l[f] = nt(o[p], r[f]), Zt(e, o[d], o[p]), p--, f++;
    else if (c === void 0 && (c = rs(s, f, m), h = rs(a, d, p)), c.has(a[d])) if (c.has(a[p])) {
      const b = h.get(s[f]), v = b !== void 0 ? o[b] : null;
      if (v === null) {
        const x = Zt(e, o[d]);
        nt(x, r[f]), l[f] = x;
      } else l[f] = nt(v, r[f]), Zt(e, o[d], v), o[b] = null;
      f++;
    } else Un(o[p]), p--;
    else Un(o[d]), d++;
    for (; f <= m; ) {
      const b = Zt(e, l[m + 1]);
      nt(b, r[f]), l[f++] = b;
    }
    for (; d <= p; ) {
      const b = o[d++];
      b !== null && Un(b);
    }
    return this.ut = s, Ba(e, l), Le;
  }
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ja = un(class extends fn {
  constructor() {
    super(...arguments), this.key = g;
  }
  render(e, t) {
    return this.key = e, t;
  }
  update(e, [t, i]) {
    return t !== this.key && (Ba(e), this.key = t), i;
  }
});
class ss {
  constructor(t) {
    this._hass = t;
  }
  getEntityState(t) {
    return this._hass.states[t];
  }
}
class nh {
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
function oh(e, t, i, n) {
  return e ? i ? new nh(t, new ss(e), n) : new ss(e) : { getEntityState: () => {
  } };
}
function rh(e, t, i, n, o) {
  if (!e) return;
  const r = oh(e, i, n, o), s = {};
  for (const a of t)
    s[a] = r.getEntityState(a);
  return {
    states: s,
    formatEntityState: (a) => e.formatEntityState(a),
    formatEntityAttributeValue: e.formatEntityAttributeValue ? (a, l) => e.formatEntityAttributeValue(a, l) : void 0
  };
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const sh = {}, as = un(class extends fn {
  constructor() {
    super(...arguments), this.ot = sh;
  }
  render(e, t) {
    return t();
  }
  update(e, [t, i]) {
    if (Array.isArray(t)) {
      if (Array.isArray(this.ot) && this.ot.length === t.length && t.every((n, o) => n === this.ot[o])) return Le;
    } else if (this.ot === t) return Le;
    return this.ot = Array.isArray(t) ? Array.from(t) : t, this.render(t, i);
  }
}), ah = /* @__PURE__ */ new Set([
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
]), lh = /^[a-z0-9#%.,/_() +*-]+$/i, ch = /([a-z][a-z0-9-]*)\s*\(/gi;
function G(e) {
  if (typeof e != "string") return;
  const t = e.trim();
  if (!t || !lh.test(t) || t.includes("/*") || t.includes("*/") || !/^[a-z#]/i.test(t)) return;
  let i = 0;
  for (let o = 0; o < t.length; o++) {
    const r = t[o];
    if (r === "(") i++;
    else if (r === ")" && --i < 0) return;
  }
  if (i !== 0) return;
  const n = new RegExp(ch.source, "gi");
  for (let o; o = n.exec(t); )
    if (!ah.has(o[1].toLowerCase())) return;
  return t;
}
function ve(e, t) {
  return G(e) ?? t;
}
function H(e, t) {
  if (e == null || typeof e == "string" && e.trim() === "") return t;
  const i = typeof e == "number" ? e : Number(e);
  return Number.isFinite(i) ? i : t;
}
function be(e) {
  if (typeof e != "string") return;
  const t = e.trim().replace(/[^a-zA-Z0-9_-]/g, "");
  return t === "" ? void 0 : t;
}
const dh = {
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
function hh(e) {
  const t = e.trim().toLowerCase(), i = dh[t];
  if (i) return i;
  const n = /^#([0-9a-f]{3,8})$/i.exec(t);
  if (n) {
    const r = n[1];
    return r.length === 3 || r.length === 4 ? [0, 1, 2].map((s) => parseInt(r[s] + r[s], 16)) : r.length === 6 || r.length === 8 ? [0, 2, 4].map((s) => parseInt(r.slice(s, s + 2), 16)) : void 0;
  }
  const o = /^rgba?\(([^)]*)\)$/.exec(t);
  if (o) {
    const r = o[1].split(/[\s,/]+/).filter((a) => a !== "");
    if (r.length < 3) return;
    const s = r.slice(0, 3).map((a) => {
      if (a.endsWith("%")) {
        const l = Number(a.slice(0, -1));
        return Number.isFinite(l) ? l / 100 * 255 : NaN;
      }
      return Number(a);
    });
    return s.some((a) => !Number.isFinite(a)) ? void 0 : s.map((a) => Math.max(0, Math.min(255, a)));
  }
}
function jo([e, t, i]) {
  const n = (o) => {
    const r = o / 255;
    return r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * n(e) + 0.7152 * n(t) + 0.0722 * n(i);
}
const ph = "#212121", uh = "#ffffff", fh = jo([33, 33, 33]), mh = jo([255, 255, 255]);
function Wa(e) {
  if (typeof e != "string") return;
  const t = hh(e);
  if (!t) return;
  const i = jo(t), n = (o) => (Math.max(i, o) + 0.05) / (Math.min(i, o) + 0.05);
  return n(fh) >= n(mh) ? ph : uh;
}
const gh = /^[a-z0-9]+(?:-[a-z0-9]+)*:[a-z0-9]+(?:-[a-z0-9]+)*$/i;
function si(e) {
  if (typeof e != "string") return;
  const t = e.trim();
  return gh.test(t) ? t : void 0;
}
function Je(e) {
  if (typeof e != "string") return;
  const t = e.trim().replace(/[^a-zA-Z0-9_.-]/g, "");
  return t === "" ? void 0 : t;
}
const mn = "default", Ga = 10, Ki = [
  {
    id: mn,
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
], gn = "var(--fp-skin-bg, var(--card-background-color, #fff))", Wo = "var(--fp-skin-wall, var(--primary-text-color))", Ka = "var(--fp-skin-text, var(--primary-text-color))", Y = "var(--fp-skin-accent, var(--primary-color, #03a9f4))", Bn = "var(--fp-skin-active, var(--state-light-active-color, var(--state-active-color, #fdd835)))", ot = "var(--fp-skin-badge-bg, var(--card-background-color, #fff))";
function Go(e) {
  if (typeof e == "string")
    return Ki.find((t) => t.id === e);
}
function yh(e) {
  const t = Go(e);
  return t ? Object.entries(t.vars).map(([i, n]) => `${i}:${n};`).join("") : "";
}
function bh(e) {
  const t = Go(e);
  return t && t.id !== mn ? t.id : void 0;
}
const _h = Be(
  Ki.filter((e) => e.id !== mn).map(
    (e) => `:host([data-skin="${e.id}"]){` + Object.entries(e.vars).map(([t, i]) => `${t}:${i};`).join("") + "}"
  ).join(`
`)
), qa = fe`
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
`, vh = 6e4, xh = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
function Va(e) {
  return xh.has(e);
}
function Ko(e) {
  if (e === "") return;
  const t = Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function Ya(e) {
  let t = 0;
  for (const i of e)
    if (!Va(i.newState)) {
      if (Ko(i.newState) === void 0) return !1;
      t++;
    }
  return t > 0;
}
function wh(e, t, i) {
  const n = e.map((c) => Ko(c.newState)), o = n.filter((c) => c !== void 0);
  if (!o.length) return e;
  const r = (Math.max(...o) - Math.min(...o)) / t;
  if (!(r > 0) && !e.some((c) => Va(c.newState)))
    return e.length ? [e[0], e[e.length - 1]] : [];
  const s = [e[0]];
  let a = n[0], l = e[0].timestamp;
  for (let c = 1; c < e.length - 1; c++) {
    const h = n[c];
    if (h === void 0) {
      s.push(e[c]), a = void 0, l = e[c].timestamp;
      continue;
    }
    if (a === void 0) {
      s.push(e[c]), a = h, l = e[c].timestamp;
      continue;
    }
    const d = n[c - 1], p = n[c + 1], f = d !== void 0 && p !== void 0 && (h > d && h >= p || h < d && h <= p);
    (Math.abs(h - a) >= r || f && Math.abs(h - a) >= r / 2 || e[c].timestamp - l >= i) && (s.push(e[c]), a = h, l = e[c].timestamp);
  }
  return e.length > 1 && s.push(e[e.length - 1]), s;
}
function $h(e, t = {}) {
  const i = t.numericSteps ?? 0;
  return !(i > 0) || e.length < 3 || !Ya(e) ? e : wh(e, i, t.maxGapMs ?? vh);
}
function kh(e, t = {}) {
  if (!(t.numericSteps ?? 0) || e.length === 0) return e;
  const i = /* @__PURE__ */ new Map();
  for (const o of e) {
    const r = i.get(o.entityId);
    r ? r.push(o) : i.set(o.entityId, [o]);
  }
  const n = /* @__PURE__ */ new Set();
  for (const o of i.values())
    for (const r of $h(o, t)) n.add(r);
  return e.filter((o) => n.has(o));
}
function Sh(e, t) {
  if (!(t > 2) || e.length <= t || !Ya(e)) return e;
  const i = e.map((s) => Ko(s.newState)), n = /* @__PURE__ */ new Set([0, e.length - 1]);
  for (let s = 0; s < e.length; s++)
    i[s] === void 0 && n.add(s);
  const o = [];
  let r;
  for (let s = 0; s < e.length; s++) {
    const a = i[s];
    if (a === void 0) {
      r = void 0;
      continue;
    }
    s > 0 && s < e.length - 1 && r !== void 0 && o.push({ i: s, delta: Math.abs(a - r) }), r = a;
  }
  o.sort((s, a) => a.delta - s.delta);
  for (const { i: s } of o) {
    if (n.size >= t) break;
    n.add(s);
  }
  return e.filter((s, a) => n.has(a));
}
function gi(e) {
  const t = typeof e.color == "string" ? G(e.color) : void 0;
  if (t) return t;
  const i = e.attributes?.color, n = typeof i == "string" ? G(i) : void 0;
  if (n) return n;
  const o = String(e.newState ?? "").trim().toLowerCase();
  return e.entityId.startsWith("light.") ? o === "off" ? ot : Bn : e.entityId.startsWith("cover.") ? o === "closed" ? ot : Y : e.entityId.startsWith("sensor.") || e.entityId.startsWith("binary_sensor.") ? o === "off" ? ot : Y : e.entityId.startsWith("fan.") ? o === "off" ? ot : Bn : e.entityId.startsWith("media_player.") ? o === "idle" ? ot : Bn : o === "on" || o === "open" || o === "playing" || o === "home" || o === "locked" || o === "unlocked" ? Y : ot;
}
class Eh {
  constructor(t = {}) {
    this._cache = /* @__PURE__ */ new Map(), this._events = [], this._eventsByEntity = /* @__PURE__ */ new Map(), this._maxCacheEntries = 8, this._loadCommitId = 0, this._loader = t.loader ?? (async () => []);
  }
  configure(t = {}) {
    this._context = t;
  }
  async loadHistory(t, i, n = {}) {
    const o = ++this._loadCommitId, r = n.scopeKey ?? "all", s = `${t}:${i}:${r}:${n.numericSteps ?? 0}`;
    if (this._cache.has(s)) {
      if (o === this._loadCommitId) {
        const p = this._cache.get(s);
        this._events = p, this._eventsByEntity = this._groupEventsByEntity(p);
      }
      return;
    }
    const a = n.hass ?? this._context?.hass, l = n.watched ?? this._context?.watched, h = (a && Array.isArray(l) ? await this._loadFromHass(a, t, i, l) : await this._loader(t, i, { ...this._context, ...n, hass: a, watched: l })).slice().sort((p, f) => p.timestamp - f.timestamp).map((p) => ({
      ...p,
      attributes: p.attributes ?? {}
    })), d = kh(h, { numericSteps: n.numericSteps });
    if (o === this._loadCommitId) {
      if (this._cache.set(s, d), this._cache.size > this._maxCacheEntries) {
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
    const r = t.callWS, s = t.callApi, a = new Date(i * 1e3).toISOString(), l = new Date(n * 1e3).toISOString(), c = new Set(o), h = {
      type: "history/history_during_period",
      start_time: a,
      end_time: l,
      minimal_response: !1,
      no_attributes: !1,
      significant_changes_only: !1,
      entity_ids: o
    };
    let d;
    if (typeof r == "function")
      try {
        d = await r(h);
      } catch (p) {
        console.warn("[easy-floorplan] Replay WS history query failed", { startTime: a, endTime: l, watchedCount: o.length, error: p });
      }
    if (!d && typeof s == "function")
      try {
        d = await s("GET", `history/period/${encodeURIComponent(a)}`, {
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
      throw new Error(`Unable to load history via websocket or REST API (ws:${typeof r == "function" ? "yes" : "no"}, api:${typeof s == "function" ? "yes" : "no"}).`);
    return this._normalizeHistoryPayload(d, i, n, c);
  }
  _normalizeHistoryPayload(t, i, n, o) {
    const r = /* @__PURE__ */ new Map(), s = (p, f) => {
      if (typeof p == "number")
        return Number.isFinite(p) ? p > 1e12 ? p / 1e3 : p : Number.NaN;
      if (typeof p == "string") {
        const m = Number(p);
        if (Number.isFinite(m)) return m > 1e12 ? m / 1e3 : m;
        const b = Date.parse(p) / 1e3;
        return Number.isFinite(b) ? b : Number.NaN;
      }
      return Date.parse(f) / 1e3;
    }, a = (p, f) => {
      for (const m of f) {
        const b = p[m];
        if (b !== void 0) return b;
      }
    }, l = (p, f) => {
      const m = f.filter((b) => !!b && typeof b == "object");
      m.length && r.set(p, m.map((b) => {
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
        const f = p, m = typeof f.entity_id == "string" ? f.entity_id : void 0, b = Array.isArray(f.states) ? f.states : Array.isArray(f.history) ? f.history : [];
        m && b.length && l(m, b);
      }
    else if (t && typeof t == "object")
      for (const [p, f] of Object.entries(t)) {
        if (Array.isArray(f) && f.length) {
          l(p, f);
          continue;
        }
        if (f && typeof f == "object") {
          const m = f;
          Array.isArray(m.states) && m.states.length && l(p, m.states);
        }
      }
    if (!r.size)
      throw new Error("History payload contained no parseable state rows.");
    const c = [], h = new Date(n * 1e3).toISOString();
    for (const [p, f] of r.entries())
      if (f.length && o.has(p)) {
        if (f.length === 1) {
          const m = f[0], b = s(m.last_updated ?? m.last_changed, h);
          if (!Number.isFinite(b) || b < i || b > n)
            continue;
          c.push({
            timestamp: b,
            entityId: p,
            oldState: m.state ?? "unknown",
            newState: m.state ?? "unknown",
            attributes: m.attributes ?? {}
          });
          continue;
        }
        for (let m = 1; m < f.length; m += 1) {
          const b = f[m - 1], v = f[m], x = s(b.last_updated ?? b.last_changed, h), $ = s(v.last_updated ?? v.last_changed, h);
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
    return c.sort((p, f) => p.timestamp - f.timestamp);
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
    const n = t, o = i, r = Object.keys(n), s = Object.keys(o);
    if (r.length !== s.length) return !1;
    for (const a of r)
      if (!(a in o) || !this._attributesEqual(n[a], o[a])) return !1;
    return !0;
  }
  clearCache() {
    this._loadCommitId += 1, this._cache.clear(), this._events = [], this._eventsByEntity.clear();
  }
  getStateAt(t) {
    const i = /* @__PURE__ */ new Map();
    for (const [n, o] of this._eventsByEntity.entries()) {
      const r = this._findLastEventAtOrBefore(o, t);
      if (r) {
        i.set(n, this._toHassEntity(n, r.newState, r.attributes, r.timestamp));
        continue;
      }
      const s = o[0];
      s && i.set(n, this._toHassEntity(n, s.oldState, s.attributes, 0));
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
      n.sort((o, r) => o.timestamp - r.timestamp);
    return i;
  }
  _findLastEventAtOrBefore(t, i) {
    let n = 0, o = t.length - 1, r;
    for (; n <= o; ) {
      const s = n + o >> 1, a = t[s];
      a.timestamp <= i ? (r = a, n = s + 1) : o = s - 1;
    }
    return r;
  }
  _toHassEntity(t, i, n, o) {
    const r = Number.isFinite(o) ? o : Date.now() / 1e3;
    return {
      entity_id: t,
      state: i,
      attributes: n ?? {},
      last_changed: new Date(r * 1e3).toISOString(),
      last_updated: new Date(r * 1e3).toISOString(),
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
      const r = i + n >> 1;
      this._events[r].timestamp <= t ? (o = r, i = r + 1) : n = r - 1;
    }
    return o >= 0 ? this._events[o] : void 0;
  }
  getEventAfter(t) {
    if (!this._events.length) return;
    let i = 0, n = this._events.length - 1, o = this._events.length;
    for (; i <= n; ) {
      const r = i + n >> 1;
      this._events[r].timestamp >= t ? (o = r, n = r - 1) : i = r + 1;
    }
    return o < this._events.length ? this._events[o] : void 0;
  }
}
var Ah = Object.defineProperty, Th = Object.getOwnPropertyDescriptor, ft = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Th(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Ah(t, i, o), o;
};
let Te = class extends le {
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
    const i = gi(e), n = `left:${this._getMarkerLeftClamped(e.timestamp, 7)};--stack-offset:${t};--marker-pct:${this._pct(e.timestamp)};`;
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
      e.set(t, Sh(i, Te.MAX_MARKERS_PER_LANE));
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
    const n = Math.max(1, this.endTime - this.startTime), o = Math.min(1, Math.max(0, (e - i.left) / i.width)), r = Math.round(this.startTime + o * n);
    this._seek(r);
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
    if (!this._hidden.size) return g;
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
        ${as([this.events, this.startTime, this.endTime, this._hidden], () => i.map((o, r) => {
      const s = t.get(o) ?? [], a = r + 1, l = this._getEntityLabel(s[0]), c = this._hidden.has(o);
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
              ${(c ? [] : s).map((h) => {
        const d = gi(h), p = this._getMarkerLeftClamped(h.timestamp, 4);
        return u`
                  <button
                    class="marker"
                    style=${`left:${p};--marker-pct:${this._pct(h.timestamp)};${d ? `background:${d};box-shadow:0 0 0 2px ${d}22;` : ""}`}
                    title=${this._formatEventTitle(h)}
                    @click=${(f) => {
          f.stopPropagation(), this._seek(h.timestamp);
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
        ${as([this.events, this.startTime, this.endTime], () => this._groupEventsByTimestamp().map((t) => u`
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
                  @click=${(r) => {
        r.stopPropagation(), this._seek(i.timestamp);
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
Te.MAX_MARKERS_PER_LANE = 150;
Te.styles = fe`
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
    .playhead { position: absolute; top: -2px; width: 2px; height: calc(100% + 4px); background: ${Be(Y)}; }
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
      background: ${Be(Y)};
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
ft([
  A({ attribute: !1 })
], Te.prototype, "events", 2);
ft([
  A({ type: Number })
], Te.prototype, "startTime", 2);
ft([
  A({ type: Number })
], Te.prototype, "endTime", 2);
ft([
  A({ type: Number })
], Te.prototype, "currentTime", 2);
ft([
  A({ type: Boolean })
], Te.prototype, "expanded", 2);
ft([
  k()
], Te.prototype, "_hidden", 2);
Te = ft([
  pn("easy-floorplan-history-timeline")
], Te);
function ls(e) {
  return !!e?.haArea && (e.filterEntities ?? !0);
}
const cs = -6, Ch = 6, qo = 0.45, qi = 1, Za = "scale", Xa = "dim", ds = 0.92, hs = 80, ps = 260, fo = 0.25, mo = 4, Qa = 10, go = 1, Vo = 14, Mh = 3, yn = 140, Ja = "var(--fp-skin-glow, #ffd9a0)", us = 0.18, Vi = 0.6, fs = 0.5, ms = 0.45, Ih = 0.5, Yo = 14, at = 34, Yi = 34, ai = 16, bn = 80, _n = 0, vn = 360, Ph = "var(--fp-skin-furniture, #9e9e9e)", Tt = 1e3, yi = 600, Zo = 20, gs = 50;
function Oh(e, t) {
  return e ?? t;
}
function ys(e, t) {
  return t <= 0 ? 100 : Math.round(e / t * 100);
}
function jn(e, t) {
  return Math.max(1, Math.round(t * e / 100));
}
function bs(e) {
  const t = e?.floors;
  return !t || typeof t != "object" ? [] : Object.values(t).filter((i) => !!i && typeof i.floor_id == "string" && typeof i.name == "string").sort((i, n) => (i.level ?? 0) - (n.level ?? 0) || i.name.localeCompare(n.name));
}
function Lh(e) {
  const t = e?.areas;
  return !t || typeof t != "object" ? [] : Object.values(t).filter((i) => !!i && typeof i.area_id == "string" && typeof i.name == "string").sort((i, n) => i.name.localeCompare(n.name));
}
function Fh(e, t) {
  if (!("name" in e)) return e;
  const i = (e.name ?? "").toString().trim(), n = Rh(t, i);
  return { ...e, name: n ? n.name : i || void 0, haArea: n?.area_id };
}
function Rh(e, t) {
  const i = (t ?? "").trim();
  if (!i) return;
  const n = e.find((a) => a.name === i);
  if (n) return n;
  const o = i.toLowerCase(), r = e.find((a) => a.name.toLowerCase() === o);
  if (r) return r;
  const s = o.replace(/\s+/g, " ");
  return e.find((a) => a.name.trim().toLowerCase().replace(/\s+/g, " ") === s);
}
function zh(e, t) {
  const i = e, n = i?.entities?.[t];
  return n ? n.area_id ? n.area_id : (n.device_id ? i?.devices?.[n.device_id] : void 0)?.area_id ?? void 0 : void 0;
}
function Wn(e, t) {
  const n = e?.entities;
  return !n || typeof n != "object" ? [] : Object.keys(n).filter((o) => zh(e, o) === t);
}
function Nh(e) {
  return {
    type: e,
    width: Tt,
    height: yi,
    grid: Zo,
    walls: [],
    openings: [],
    items: [],
    texts: [],
    furniture: [],
    trackers: [],
    areas: []
  };
}
function Dh() {
  return { overlayScale: "plan" };
}
function ee(e) {
  return `${e}_${Math.random().toString(36).slice(2, 9)}`;
}
function yo(e, t) {
  if (e === t) return !0;
  if (Array.isArray(e) || Array.isArray(t))
    return !Array.isArray(e) || !Array.isArray(t) || e.length !== t.length ? !1 : e.every((o, r) => yo(o, t[r]));
  if (typeof e != "object" || typeof t != "object" || e === null || t === null) return !1;
  const i = e, n = t;
  for (const o of /* @__PURE__ */ new Set([...Object.keys(i), ...Object.keys(n)]))
    if (!yo(i[o], n[o])) return !1;
  return !0;
}
function Hh(e, t = []) {
  return {
    id: ee("floor"),
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
function Uh(e) {
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
function Bh(e) {
  const t = /* @__PURE__ */ new Set();
  return e.map((i, n) => {
    let o = i.id || `floor_${n + 1}`;
    for (; t.has(o); ) o = `${o}_${n + 1}`;
    return t.add(o), o === i.id ? i : { ...i, id: o };
  });
}
function jh(e, t, i) {
  const n = e.findIndex((a) => a.id === t), o = n + i;
  if (n < 0 || o < 0 || o >= e.length) return null;
  const r = [...e], [s] = r.splice(n, 1);
  return r.splice(o, 0, s), r;
}
function Ft(e) {
  return e.floors && e.floors.length ? Bh(e.floors.map(Uh)) : [
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
function Zi(e, t) {
  if (!t) return null;
  const i = e?.[t.entity]?.state;
  if (i == null || i === "unavailable" || i === "unknown") return !1;
  const n = i === "on" || i === "open" || i === "home" || i === "detected";
  return t.invert ? !n : n;
}
function _s(e, t) {
  if (!e || t == null || !Number.isFinite(t)) return null;
  const i = e.max - e.min;
  if (i === 0) return null;
  const n = (t - e.min) / i, o = Math.max(0, Math.min(1, n));
  return e.invert ? 1 - o : o;
}
const Wh = "airHandler", Gh = "air handler", Kh = "utility", qh = [
  "hvac",
  "ahu",
  "furnace",
  "ventilation"
], Vh = {
  w: 60,
  h: 56
}, Yh = [
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
], Zh = {
  id: Wh,
  name: Gh,
  category: Kh,
  keywords: qh,
  size: Vh,
  parts: Yh
}, Xh = "bathtub", Qh = "bathtub", Jh = "bath", ep = [
  "bath",
  "tub"
], tp = {
  w: 150,
  h: 76
}, ip = [
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
], np = {
  id: Xh,
  name: Qh,
  category: Jh,
  keywords: ep,
  size: tp,
  parts: ip
}, op = "bed", rp = "bed", sp = "bedroom", ap = [
  "double",
  "mattress",
  "sleep"
], lp = {
  w: 150,
  h: 200
}, cp = [
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
], dp = {
  id: op,
  name: rp,
  category: sp,
  keywords: ap,
  size: lp,
  parts: cp
}, hp = "chair", pp = "chair", up = "living", fp = [
  "seat"
], mp = {
  w: 44,
  h: 44
}, gp = [
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
], yp = {
  id: hp,
  name: pp,
  category: up,
  keywords: fp,
  size: mp,
  parts: gp
}, bp = "cornerShowerCurved", _p = "curved corner shower", vp = "bath", xp = [
  "shower",
  "corner",
  "cubicle",
  "stall",
  "dusche"
], wp = {
  w: 100,
  h: 100
}, $p = [
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
], kp = {
  id: bp,
  name: _p,
  category: vp,
  keywords: xp,
  size: wp,
  parts: $p
}, Sp = "desk", Ep = "desk", Ap = "living", Tp = [
  "office",
  "workstation"
], Cp = {
  w: 120,
  h: 60
}, Mp = [
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
], Ip = {
  id: Sp,
  name: Ep,
  category: Ap,
  keywords: Tp,
  size: Cp,
  parts: Mp
}, Pp = "dishwasher", Op = "dishwasher", Lp = "kitchen", Fp = [
  "dishes"
], Rp = {
  w: 60,
  h: 60
}, zp = [
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
], Np = {
  id: Pp,
  name: Op,
  category: Lp,
  keywords: Fp,
  size: Rp,
  parts: zp
}, Dp = "dryer", Hp = "dryer", Up = "utility", Bp = [
  "tumble dryer",
  "laundry"
], jp = {
  w: 60,
  h: 62
}, Wp = [
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
], Gp = {
  id: Dp,
  name: Hp,
  category: Up,
  keywords: Bp,
  size: jp,
  parts: Wp
}, Kp = "fishTank", qp = "fish tank", Vp = "living", Yp = [
  "aquarium",
  "fish",
  "water"
], Zp = {
  w: 100,
  h: 40
}, Xp = [
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
], Qp = {
  id: Kp,
  name: qp,
  category: Vp,
  keywords: Yp,
  size: Zp,
  parts: Xp
}, Jp = "fridge", eu = "fridge", tu = "kitchen", iu = [
  "refrigerator",
  "freezer"
], nu = {
  w: 60,
  h: 64
}, ou = [
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
], ru = {
  id: Jp,
  name: eu,
  category: tu,
  keywords: iu,
  size: nu,
  parts: ou
}, su = "hotTub", au = "hot tub", lu = "bath", cu = [
  "jacuzzi",
  "spa",
  "whirlpool"
], du = {
  w: 120,
  h: 120
}, hu = [
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
], pu = {
  id: su,
  name: au,
  category: lu,
  keywords: cu,
  size: du,
  parts: hu
}, uu = "piano", fu = "piano", mu = "living", gu = [
  "upright",
  "keyboard",
  "music"
], yu = {
  w: 140,
  h: 60
}, bu = [
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
], _u = {
  id: uu,
  name: fu,
  category: mu,
  keywords: gu,
  size: yu,
  parts: bu
}, vu = "plant", xu = "plant", wu = "living", $u = [
  "pot",
  "tree",
  "greenery"
], ku = {
  w: 44,
  h: 44
}, Su = "ellipse", Eu = [
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
], Au = {
  id: vu,
  name: xu,
  category: wu,
  keywords: $u,
  size: ku,
  footprint: Su,
  parts: Eu
}, Tu = "quarterTub", Cu = "corner hot tub", Mu = "bath", Iu = [
  "hottub",
  "jacuzzi",
  "corner",
  "quarter",
  "spa",
  "whirlpool"
], Pu = {
  w: 140,
  h: 140
}, Ou = [
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
], Lu = {
  id: Tu,
  name: Cu,
  category: Mu,
  keywords: Iu,
  size: Pu,
  parts: Ou
}, Fu = "roundTable", Ru = "round table", zu = "living", Nu = [
  "dining",
  "circular"
], Du = {
  w: 100,
  h: 100
}, Hu = "ellipse", Uu = [
  {
    ellipse: [
      50,
      50,
      50,
      50
    ],
    role: "body"
  }
], Bu = {
  id: Fu,
  name: Ru,
  category: zu,
  keywords: Nu,
  size: Du,
  footprint: Hu,
  parts: Uu
}, ju = "rug", Wu = "rug", Gu = "living", Ku = [
  "carpet",
  "mat"
], qu = {
  w: 180,
  h: 120
}, Vu = [
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
], Yu = {
  id: ju,
  name: Wu,
  category: Gu,
  keywords: Ku,
  size: qu,
  parts: Vu
}, Zu = "sectional", Xu = "sectional (L)", Qu = "living", Ju = [
  "couch",
  "sofa",
  "corner",
  "chaise"
], ef = {
  w: 230,
  h: 180
}, tf = [
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
], nf = {
  id: Zu,
  name: Xu,
  category: Qu,
  keywords: Ju,
  size: ef,
  parts: tf
}, of = "sink", rf = "sink", sf = "kitchen", af = [
  "basin",
  "tap",
  "faucet"
], lf = {
  w: 64,
  h: 48
}, cf = [
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
], df = {
  id: of,
  name: rf,
  category: sf,
  keywords: af,
  size: lf,
  parts: cf
}, hf = "sofa", pf = "sofa", uf = "living", ff = [
  "couch",
  "settee",
  "seat"
], mf = {
  w: 170,
  h: 72
}, gf = [
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
], yf = {
  id: hf,
  name: pf,
  category: uf,
  keywords: ff,
  size: mf,
  parts: gf
}, bf = "stairs", _f = "stairs", vf = "utility", xf = [
  "steps",
  "staircase"
], wf = {
  w: 90,
  h: 170
}, $f = [
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
], kf = {
  id: bf,
  name: _f,
  category: vf,
  keywords: xf,
  size: wf,
  parts: $f
}, Sf = "stove", Ef = "stove", Af = "kitchen", Tf = [
  "cooker",
  "hob",
  "oven",
  "range"
], Cf = {
  w: 64,
  h: 64
}, Mf = [
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
], If = {
  id: Sf,
  name: Ef,
  category: Af,
  keywords: Tf,
  size: Cf,
  parts: Mf
}, Pf = "table", Of = "table", Lf = "living", Ff = [
  "dining"
], Rf = {
  w: 120,
  h: 80
}, zf = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 5
  }
], Nf = {
  id: Pf,
  name: Of,
  category: Lf,
  keywords: Ff,
  size: Rf,
  parts: zf
}, Df = "toilet", Hf = "toilet", Uf = "bath", Bf = [
  "wc",
  "loo",
  "lavatory"
], jf = {
  w: 48,
  h: 68
}, Wf = [
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
], Gf = {
  id: Df,
  name: Hf,
  category: Uf,
  keywords: Bf,
  size: jf,
  parts: Wf
}, Kf = "tv", qf = "tv", Vf = "living", Yf = [
  "television",
  "screen",
  "media"
], Zf = {
  w: 110,
  h: 18
}, Xf = [
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
], Qf = {
  id: Kf,
  name: qf,
  category: Vf,
  keywords: Yf,
  size: Zf,
  parts: Xf
}, Jf = "vanity", em = "vanity", tm = "bath", im = [
  "washbasin",
  "sink",
  "bathroom"
], nm = {
  w: 110,
  h: 55
}, om = [
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
], rm = {
  id: Jf,
  name: em,
  category: tm,
  keywords: im,
  size: nm,
  parts: om
}, sm = "wardrobe", am = "wardrobe", lm = "bedroom", cm = [
  "closet",
  "armoire",
  "cupboard"
], dm = {
  w: 120,
  h: 55
}, hm = [
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
], pm = {
  id: sm,
  name: am,
  category: lm,
  keywords: cm,
  size: dm,
  parts: hm
}, um = "washer", fm = "washer", mm = "utility", gm = [
  "washing machine",
  "laundry"
], ym = {
  w: 60,
  h: 62
}, bm = [
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
], _m = {
  id: um,
  name: fm,
  category: mm,
  keywords: gm,
  size: ym,
  parts: bm
}, vm = "waterHeater", xm = "water heater", wm = "utility", $m = [
  "boiler",
  "cylinder",
  "tank"
], km = {
  w: 52,
  h: 52
}, Sm = "ellipse", Em = [
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
], Am = {
  id: vm,
  name: xm,
  category: wm,
  keywords: $m,
  size: km,
  footprint: Sm,
  parts: Em
}, bo = [
  "living",
  "bedroom",
  "kitchen",
  "bath",
  "utility",
  "other"
], xn = (e) => Object.assign(/* @__PURE__ */ Object.create(null), e), Xo = (e, t) => typeof t == "string" && Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0, vs = xn({
  body: { width: 2, opacity: 1, fillOpacity: 0.12 },
  line: { width: 2, opacity: 1, fillOpacity: 0 },
  thin: { width: 1.5, opacity: 1, fillOpacity: 0 },
  detail: { width: 1.5, opacity: 0.7, fillOpacity: 0 },
  hint: { width: 1, opacity: 0.6, fillOpacity: 0 },
  solid: { width: 0, opacity: 0.7, fillOpacity: 1 }
}), Tm = [0, 0, 100, 100], Cm = 64, el = 256, Mm = 256, Im = 0.25, xs = 8, De = (e) => typeof e == "number" && Number.isFinite(e) ? e : null, kt = (e, t, i) => Math.min(i, Math.max(t, e));
function Qe(e, t) {
  if (!Array.isArray(e) || e.length !== t) return null;
  const i = [];
  for (const n of e) {
    const o = De(n);
    if (o === null) return null;
    i.push(o);
  }
  return i;
}
function Pm(e) {
  if (!Array.isArray(e) || e.length < 2 || e.length > el) return null;
  const t = [];
  for (const i of e) {
    const n = Qe(i, 2);
    if (!n) return null;
    t.push([n[0], n[1]]);
  }
  return t;
}
const Om = xn({ M: 2, L: 2, Q: 4, C: 6, Z: 0 });
function Lm(e) {
  if (!Array.isArray(e) || !e.length || e.length > Mm) return null;
  const t = [];
  for (const i of e) {
    if (!Array.isArray(i) || typeof i[0] != "string") return null;
    const n = i[0].toUpperCase(), o = Xo(Om, n);
    if (o === void 0) return null;
    const r = Qe(i.slice(1), o);
    if (!r) return null;
    t.push([n, ...r]);
  }
  return t[0]?.[0] !== "M" ? null : t;
}
function vt(e, t) {
  const i = Xo(vs, e.role) ? e.role : t, n = vs[i], o = De(e.width), r = De(e.opacity), s = De(e.fillOpacity), a = Array.isArray(e.dash) ? e.dash.map(De) : null, l = a && a.length && a.length <= 8 && a.every((c) => c !== null) ? a.map((c) => kt(c, 0, 100)) : void 0;
  return {
    role: i,
    width: o === null ? n.width : i === "solid" ? kt(o, 0, xs) : kt(o, Im, xs),
    opacity: r === null ? n.opacity : kt(r, 0, 1),
    fillOpacity: s === null ? n.fillOpacity : kt(s, 0, 1),
    dash: l
  };
}
function ws(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return null;
  const t = e, i = t.space === "square" ? "square" : "box";
  if ("line" in t) {
    const n = Qe(t.line, 4);
    return n ? { kind: "line", a: [n[0], n[1]], b: [n[2], n[3]], space: i, style: vt(t, "line") } : null;
  }
  if ("rect" in t) {
    const n = Qe(t.rect, 4);
    return !n || n[2] < 0 || n[3] < 0 ? null : {
      kind: "rect",
      x: n[0],
      y: n[1],
      w: n[2],
      h: n[3],
      rx: Math.max(0, De(t.rx) ?? 0),
      space: i,
      style: vt(t, "body")
    };
  }
  if ("circle" in t) {
    const n = Qe(t.circle, 3);
    return !n || n[2] < 0 ? null : { kind: "circle", cx: n[0], cy: n[1], r: n[2], space: i, style: vt(t, "line") };
  }
  if ("ellipse" in t) {
    const n = Qe(t.ellipse, 4);
    return !n || n[2] < 0 || n[3] < 0 ? null : {
      kind: "ellipse",
      cx: n[0],
      cy: n[1],
      rx: n[2],
      ry: n[3],
      space: i,
      style: vt(t, "line")
    };
  }
  if ("polygon" in t || "polyline" in t) {
    const n = "polygon" in t, o = Pm(n ? t.polygon : t.polyline);
    return o ? { kind: "poly", closed: n, pts: o, space: i, style: vt(t, n ? "body" : "line") } : null;
  }
  if ("path" in t) {
    const n = Lm(t.path);
    return n ? { kind: "path", cmds: n, space: i, style: vt(t, "line") } : null;
  }
  return null;
}
function Fm(e, t, i) {
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
          const o = n.slice(1).map((r, s) => r + (s % 2 === 0 ? t : i));
          return [n[0], ...o];
        })
      };
  }
}
function Rm(e) {
  if (e && typeof e == "object" && "repeat" in e) {
    const i = e, n = De(i.repeat), o = Qe(i.step, 2), r = ws(i.part);
    if (n === null || !o || !r) return [];
    const s = kt(Math.round(n), 1, Cm);
    return Array.from({ length: s }, (a, l) => Fm(r, o[0] * l, o[1] * l));
  }
  const t = ws(e);
  return t ? [t] : [];
}
function wn(e, t, i) {
  const n = (p) => (i?.push(p), null);
  if (!e || typeof e != "object" || Array.isArray(e))
    return n("A symbol has to be a JSON object.");
  const o = e, r = typeof o.id == "string" && o.id.trim() ? o.id.trim() : t, s = be(r);
  if (!s || s !== r)
    return n('`id` is missing, or uses characters a CSS class cannot: letters, digits, "-" and "_" only.');
  if (!Array.isArray(o.parts)) return n("`parts` has to be an array of shapes.");
  const a = [];
  for (const p of o.parts)
    for (const f of Rm(p)) {
      if (a.length >= el) break;
      a.push(f);
    }
  if (!a.length)
    return n(
      "No drawable parts. Each one needs a known shape (line, rect, circle, ellipse, polygon, polyline, path) with the right number of finite numbers."
    );
  const l = o.size && typeof o.size == "object" ? o.size : {}, c = De(l.w), h = De(l.h), d = Qe(o.viewBox, 4);
  return {
    id: s,
    name: typeof o.name == "string" && o.name.trim() ? o.name.trim().slice(0, 60) : s,
    category: typeof o.category == "string" && bo.includes(o.category) ? o.category : "other",
    keywords: Array.isArray(o.keywords) ? o.keywords.filter((p) => typeof p == "string").slice(0, 12) : [],
    size: { w: c && c > 0 ? c : 60, h: h && h > 0 ? h : 60 },
    viewBox: d && d[2] > 0 && d[3] > 0 ? d : Tm,
    footprint: o.footprint === "ellipse" ? "ellipse" : "rect",
    parts: a
  };
}
const zm = wn({
  id: "unknown",
  name: "unknown",
  size: { w: 60, h: 60 },
  parts: [{ rect: [0, 0, 100, 100], rx: 6.666667 }]
}), je = (() => {
  const e = /* @__PURE__ */ Object.assign({ "../ef-furniture/airHandler.json": Zh, "../ef-furniture/bathtub.json": np, "../ef-furniture/bed.json": dp, "../ef-furniture/chair.json": yp, "../ef-furniture/cornerShowerCurved.json": kp, "../ef-furniture/desk.json": Ip, "../ef-furniture/dishwasher.json": Np, "../ef-furniture/dryer.json": Gp, "../ef-furniture/fishTank.json": Qp, "../ef-furniture/fridge.json": ru, "../ef-furniture/hotTub.json": pu, "../ef-furniture/piano.json": _u, "../ef-furniture/plant.json": Au, "../ef-furniture/quarterTub.json": Lu, "../ef-furniture/roundTable.json": Bu, "../ef-furniture/rug.json": Yu, "../ef-furniture/sectional.json": nf, "../ef-furniture/sink.json": df, "../ef-furniture/sofa.json": yf, "../ef-furniture/stairs.json": kf, "../ef-furniture/stove.json": If, "../ef-furniture/table.json": Nf, "../ef-furniture/toilet.json": Gf, "../ef-furniture/tv.json": Qf, "../ef-furniture/vanity.json": rm, "../ef-furniture/wardrobe.json": pm, "../ef-furniture/washer.json": _m, "../ef-furniture/waterHeater.json": Am }), t = xn({});
  for (const [i, n] of Object.entries(e)) {
    const o = wn(n, i.split("/").pop()?.replace(/\.json$/, ""));
    o && (t[o.id] = o);
  }
  return t;
})();
function $n(e, t) {
  return Xo(e, t);
}
let $s, ks = je;
function _o(e) {
  if (!e || typeof e != "object") return je;
  if (e === $s) return ks;
  const t = xn({});
  Object.assign(t, je);
  for (const [i, n] of Object.entries(e)) {
    const o = wn(n, i);
    o && (t[o.id] = o);
  }
  return $s = e, ks = t, t;
}
function Nm(e) {
  const t = (i) => {
    const n = bo.indexOf(i);
    return n < 0 ? bo.length : n;
  };
  return Object.values(e).sort(
    (i, n) => t(i.category) - t(n.category) || i.name.localeCompare(n.name)
  );
}
function Dm(e, t) {
  const i = t.trim().toLowerCase();
  return i ? e.id.toLowerCase().includes(i) || e.name.toLowerCase().includes(i) || e.category.includes(i) || e.keywords.some((n) => n.toLowerCase().includes(i)) : !0;
}
function Hm(e, t = je) {
  return $n(t, e)?.size ?? { w: 60, h: 60 };
}
function Ss(e, t, i, n) {
  const [o, r, s, a] = e.viewBox, l = n === "square" ? Math.min(t, i) : t, c = n === "square" ? Math.min(t, i) : i, h = l / s, d = c / a;
  return {
    x: (p) => (p - o) * h - l / 2,
    y: (p) => (p - r) * d - c / 2,
    len: (p) => p * Math.min(h, d),
    sx: (p) => p * h,
    sy: (p) => p * d
  };
}
const X = (e) => Number.isFinite(e) ? e : 0;
function Um(e, t) {
  const i = e.fillOpacity > 0 ? t : "none", n = e.role === "solid" ? "none" : t;
  return { fill: i, stroke: n, style: e };
}
function Bm(e, t, i) {
  const { fill: n, stroke: o, style: r } = Um(e.style, i), s = r.opacity < 1 ? r.opacity : g, a = r.dash?.length ? r.dash.join(" ") : g, l = r.fillOpacity > 0 && r.fillOpacity < 1 ? r.fillOpacity : g, c = r.role === "solid" ? g : r.width;
  switch (e.kind) {
    case "line":
      return _`<line x1=${X(t.x(e.a[0]))} y1=${X(t.y(e.a[1]))}
                       x2=${X(t.x(e.b[0]))} y2=${X(t.y(e.b[1]))}
                       fill="none" stroke=${o} stroke-width=${c}
                       stroke-dasharray=${a} opacity=${s} />`;
    case "rect":
      return _`<rect x=${X(t.x(e.x))} y=${X(t.y(e.y))}
                       width=${X(t.sx(e.w))} height=${X(t.sy(e.h))}
                       rx=${e.rx > 0 ? X(t.len(e.rx)) : g}
                       fill=${n} fill-opacity=${l}
                       stroke=${o} stroke-width=${c}
                       stroke-dasharray=${a} opacity=${s} />`;
    case "circle":
      return _`<circle cx=${X(t.x(e.cx))} cy=${X(t.y(e.cy))} r=${X(t.len(e.r))}
                         fill=${n} fill-opacity=${l}
                         stroke=${o} stroke-width=${c} opacity=${s} />`;
    case "ellipse":
      return _`<ellipse cx=${X(t.x(e.cx))} cy=${X(t.y(e.cy))}
                          rx=${X(t.sx(e.rx))} ry=${X(t.sy(e.ry))}
                          fill=${n} fill-opacity=${l}
                          stroke=${o} stroke-width=${c} opacity=${s} />`;
    case "poly": {
      const h = e.pts.map(([d, p]) => `${X(t.x(d))},${X(t.y(p))}`).join(" ");
      return e.closed ? _`<polygon points=${h}
                       fill=${n} fill-opacity=${l}
                       stroke=${o} stroke-width=${c}
                       stroke-linejoin="round" opacity=${s} />` : _`<polyline points=${h} fill="none"
                        stroke=${o} stroke-width=${c}
                        stroke-linejoin="round" opacity=${s} />`;
    }
    case "path": {
      const h = e.cmds.map(
        (d) => d[0] === "Z" ? "Z" : `${d[0]} ${d.slice(1).map((p, f) => f % 2 === 0 ? X(t.x(p)) : X(t.y(p))).join(" ")}`
      ).join(" ");
      return _`<path d=${h}
                       fill=${n} fill-opacity=${l}
                       stroke=${o} stroke-width=${c}
                       stroke-linejoin="round" opacity=${s} />`;
    }
  }
}
function jm(e, t, i, n) {
  const o = Ss(e, t, i, "box"), r = Ss(e, t, i, "square");
  return e.parts.map((s) => Bm(s, s.space === "square" ? r : o, n));
}
const Wm = /* @__PURE__ */ new Set(["light", "switch", "fan", "input_boolean"]);
function tl(e) {
  const t = e?.split(".")[0] ?? "";
  return Wm.has(t) ? { action: "toggle" } : { action: "more-info" };
}
function Ve(e) {
  return e !== void 0 && e.action !== "none";
}
function il(e, t) {
  return t === "tap" ? e.tap_action ?? tl(e.entity) : t === "hold" ? e.hold_action : e.double_tap_action;
}
function Gm(e, t) {
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
      return nl(t) !== null;
    case "fire-dom-event":
      return !0;
    default:
      return !1;
  }
}
function Km(e) {
  return ["tap", "hold", "double_tap"].some(
    (t) => Gm(e, il(e, t))
  );
}
function nl(e) {
  const t = e.perform_action ?? e.service;
  if (!t || !t.includes(".")) return null;
  const [i, n] = t.split(".", 2);
  return { domain: i, service: n, data: e.data ?? e.service_data, target: e.target };
}
function Xt(e, t, i, n) {
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
        const o = nl(n);
        o && t.callService(o.domain, o.service, o.data, o.target);
        break;
      }
      case "fire-dom-event":
        e.dispatchEvent(new CustomEvent("ll-custom", { detail: n, bubbles: !0, composed: !0 }));
        break;
    }
  }
}
const qm = 0.75, Xi = 8, Vm = 400;
function Gn(e, t) {
  return typeof e == "number" && Number.isFinite(e) && e > 0 ? e : t;
}
function Ym(e) {
  let t = 0;
  for (let i = 0, n = e.length - 1; i < e.length; n = i++)
    t += e[n].x * e[i].y - e[i].x * e[n].y;
  return t / 2;
}
function Zm(e, t, i, n) {
  const o = n.x - i.x, r = n.y - i.y, s = o * o + r * r;
  if (s === 0) return Math.hypot(e - i.x, t - i.y);
  let a = ((e - i.x) * o + (t - i.y) * r) / s;
  return a = Math.max(0, Math.min(1, a)), Math.hypot(e - (i.x + a * o), t - (i.y + a * r));
}
function Xm(e, t) {
  const i = [];
  for (let n = 0; n < e.length; n++) {
    const o = e[n], r = o.b.x - o.a.x, s = o.b.y - o.a.y, a = Math.hypot(r, s);
    if (a <= t) continue;
    const l = [0, 1], c = t / a;
    for (let h = 0; h < e.length; h++) {
      if (h === n) continue;
      const d = e[h], p = d.b.x - d.a.x, f = d.b.y - d.a.y, m = r * f - s * p;
      if (Math.abs(m) > 1e-9) {
        const b = ((d.a.x - o.a.x) * f - (d.a.y - o.a.y) * p) / m, v = ((d.a.x - o.a.x) * s - (d.a.y - o.a.y) * r) / m, x = t / Math.max(Math.hypot(p, f), 1e-9);
        b > c && b < 1 - c && v >= -x && v <= 1 + x && l.push(b);
        continue;
      }
      for (const b of [d.a, d.b]) {
        const v = ((b.x - o.a.x) * r + (b.y - o.a.y) * s) / (a * a);
        if (v <= c || v >= 1 - c) continue;
        const x = o.a.x + v * r, $ = o.a.y + v * s;
        Math.hypot(b.x - x, b.y - $) <= t && l.push(v);
      }
    }
    l.sort((h, d) => h - d);
    for (let h = 1; h < l.length; h++) {
      const d = l[h - 1], p = l[h];
      p - d <= c || i.push({
        a: { x: o.a.x + d * r, y: o.a.y + d * s },
        b: { x: o.a.x + p * r, y: o.a.y + p * s }
      });
    }
  }
  return i;
}
function Qm(e, t) {
  const i = [], n = /* @__PURE__ */ new Map(), o = (c) => Math.floor(c / t), r = (c) => {
    const h = o(c.x), d = o(c.y);
    for (let b = -1; b <= 1; b++)
      for (let v = -1; v <= 1; v++)
        for (const x of n.get(`${h + b}:${d + v}`) ?? [])
          if (Math.hypot(i[x].x - c.x, i[x].y - c.y) <= t) return x;
    const p = i.push({ x: c.x, y: c.y }) - 1, f = `${h}:${d}`, m = n.get(f);
    return m ? m.push(p) : n.set(f, [p]), p;
  }, s = /* @__PURE__ */ new Map(), a = (c) => {
    let h = s.get(c);
    return h || s.set(c, h = /* @__PURE__ */ new Set()), h;
  };
  for (const c of e) {
    const h = r(c.a), d = r(c.b);
    h !== d && (a(h).add(d), a(d).add(h));
  }
  const l = i.map(
    (c, h) => [...s.get(h) ?? []].sort(
      (d, p) => Math.atan2(i[d].y - c.y, i[d].x - c.x) - Math.atan2(i[p].y - c.y, i[p].x - c.x)
    )
  );
  return { points: i, neighbors: l };
}
function Jm(e, t) {
  const { points: i, neighbors: n } = Qm(e, t), o = /* @__PURE__ */ new Set(), r = [];
  for (let s = 0; s < i.length; s++)
    for (const a of n[s]) {
      if (o.has(`${s}>${a}`)) continue;
      const l = [];
      let c = s, h = a, d = !1;
      for (let p = 0; p <= i.length * i.length + 4; p++) {
        o.add(`${c}>${h}`), l.push(c);
        const f = n[h], m = f.indexOf(c), b = f[(m - 1 + f.length) % f.length];
        if (c = h, h = b, c === s && h === a) {
          d = !0;
          break;
        }
      }
      d && l.length >= 3 && r.push(l.map((p) => ({ x: i[p].x, y: i[p].y })));
    }
  return r;
}
function eg(e, t, i) {
  for (let n = 0, o = e.length - 1; n < e.length; o = n++)
    for (const r of t)
      if (Zm(r.x, r.y, e[o], e[n]) <= i) return !0;
  return !1;
}
function tg(e, t, i = {}) {
  const n = Gn(i.weldEps, qm), o = Gn(i.openingEps, Xi), r = Gn(i.minArea, Vm);
  if (e.length < 3) return [];
  const s = Xm(
    e.map((l) => ({ a: { x: l.x1, y: l.y1 }, b: { x: l.x2, y: l.y2 } })),
    n
  );
  return Jm(s, n).map((l) => ({ ring: l, area: Ym(l) })).filter((l) => l.area >= r && !eg(l.ring, t, o)).sort((l, c) => c.area - l.area).map((l) => l.ring);
}
const Es = /* @__PURE__ */ new WeakMap();
function ol(e, t) {
  const i = Es.get(e);
  if (i && i.openings === t) return i.out;
  const n = tg(e, t);
  return Es.set(e, { openings: t, out: n }), n;
}
const Q = 8, rl = 0.05, li = "—";
function bi(e, t) {
  if (!t || !e) return li;
  const i = e.states[t];
  return i ? e.formatEntityState(i) : li;
}
function sl(e, t, i) {
  if (e.formatEntityState !== t.formatEntityState || e.formatEntityAttributeValue !== t.formatEntityAttributeValue) return !0;
  for (const n of i)
    if (e.states[n] !== t.states[n]) return !0;
  return !1;
}
function ii(e) {
  const t = /* @__PURE__ */ new Set();
  (e.sunDimming || e.sunlight && !En(e)) && t.add("sun.sun");
  for (const i of Ft(e)) {
    for (const n of i.openings) {
      n.entity && t.add(n.entity), n.shutterEntity && t.add(n.shutterEntity), n.secondaryEntity && t.add(n.secondaryEntity);
      for (const o of n.extraEntities ?? []) o && t.add(o);
      n.shutterSecondaryEntity && t.add(n.shutterSecondaryEntity);
    }
    for (const n of i.items) {
      n.entity && t.add(n.entity), n.hideEntity && t.add(n.hideEntity), n.hideStateEntity && t.add(n.hideStateEntity), n.hideBadgeEntity && t.add(n.hideBadgeEntity);
      for (const o of tt(n)) o.entity && t.add(o.entity);
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
function Qo(e, t, i) {
  if (!t || !e) return li;
  const n = e.states[t];
  if (!n) return li;
  const o = e.formatEntityAttributeValue;
  if (typeof o == "function") return o(n, i);
  const r = n.attributes?.[i];
  return r == null || r === "" ? li : String(r);
}
function ig(e, t, i) {
  const n = i.entity || (i.attribute ? t.entity : void 0);
  return n ? i.attribute ? Qo(e, n, i.attribute) : bi(e, n) : "";
}
function tt(e) {
  return [...e.secondaryEntity || e.secondaryAttribute ? [{ entity: e.secondaryEntity, attribute: e.secondaryAttribute }] : [], ...e.readings ?? []];
}
function ng(e, t) {
  return t.attribute ? Qo(e, t.entity, t.attribute) : bi(e, t.entity);
}
function Jo(e, t) {
  if (!t.entity) return t.text ?? "";
  const i = t.attribute ? Qo(e, t.entity, t.attribute) : bi(e, t.entity);
  return t.text ? `${t.text} ${i}` : i;
}
function kn(e, t) {
  return al(e, t)?.color;
}
function al(e, t) {
  if (!e?.length) return;
  const i = typeof t == "number" ? t : Number(t), n = typeof t != "boolean" && t !== "" && t != null && Number.isFinite(i), o = t == null ? "" : String(t).trim().toLowerCase();
  let r, s, a;
  for (const l of e)
    !l || typeof l != "object" || typeof l.color != "string" || (typeof l.state == "string" && l.state !== "" ? r === void 0 && o !== "" && l.state.trim().toLowerCase() === o && (r = l) : typeof l.above == "number" ? n && i > l.above && (!s || l.above > (s.above ?? -1 / 0)) && (s = l) : a === void 0 && (a = l));
  return r ?? s ?? a;
}
function og(e, t) {
  if (!e.entity) return;
  const i = kn(e.stateColor, t);
  if (i) return G(i);
  if (e.activeColor && Ke(e.entity, t)) return G(e.activeColor);
}
function As(e, t) {
  if (!e.entity) return;
  const i = kn(e.stateColor, t);
  if (i) return G(i);
  if (e.activeColor && Ke(e.entity, t)) return G(e.activeColor);
}
function er(e, t) {
  if (!t || t.state !== "on") return;
  const i = t.attributes ?? {}, n = i.brightness, o = typeof n == "number" && Number.isFinite(n) ? Math.max(0, Math.min(255, n)) : void 0, r = o === void 0 ? Vi : us + (Vi - us) * (o / 255), s = H(e.glowRadius, yn) * (o === void 0 ? 1 : fs + (1 - fs) * (o / 255)), a = i.rgb_color;
  if (Array.isArray(a) && a.length >= 3) {
    const [l, c, h] = a;
    if ([l, c, h].every((d) => typeof d == "number" && Number.isFinite(d))) {
      const d = (f) => Math.max(0, Math.min(255, Math.round(f))), p = G(`rgb(${d(l)}, ${d(c)}, ${d(h)})`);
      if (p) return { color: p, opacity: r, radius: s };
    }
  }
  return { color: ve(e.glowColor, Ja), opacity: r, radius: s };
}
function ll(e) {
  if (!e || e.state !== "on") return;
  const t = e.attributes ?? {}, i = t.rgb_color;
  if (!Array.isArray(i) || i.length < 3) return;
  const [n, o, r] = i;
  if (![n, o, r].every((h) => typeof h == "number" && Number.isFinite(h))) return;
  const s = t.brightness, a = typeof s == "number" && Number.isFinite(s) ? Math.max(0, Math.min(255, s)) : void 0, l = a === void 0 ? 1 : ms + (1 - ms) * (a / 255), c = (h) => Math.max(0, Math.min(255, Math.round(h * l)));
  return G(`rgb(${c(n)}, ${c(o)}, ${c(r)})`);
}
function rg(e, t) {
  return t ? er(e, t) : {
    color: ve(e.glowColor, Ja),
    opacity: Vi,
    radius: H(e.glowRadius, yn)
  };
}
function tr(e, t, i) {
  const n = i.x2 - i.x1, o = i.y2 - i.y1, r = n * n + o * o, s = r === 0 ? 0 : Math.max(0, Math.min(1, ((e - i.x1) * n + (t - i.y1) * o) / r)), a = i.x1 + s * n, l = i.y1 + s * o;
  return Math.hypot(e - a, t - l);
}
function ir(e, t, i, n, o) {
  const r = o.x2 - o.x1, s = o.y2 - o.y1, a = i * s - n * r;
  if (Math.abs(a) < 1e-12) return;
  const l = o.x1 - e, c = o.y1 - t, h = (l * s - c * r) / a, d = (l * n - c * i) / a;
  if (!(h <= 1e-9 || d < 0 || d > 1))
    return h;
}
function sg(e, t, i, n, o) {
  const r = e.x2 - e.x1, s = e.y2 - e.y1, a = [-r, r, -s, s], l = [e.x1 - t, n - e.x1, e.y1 - i, o - e.y1];
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
    x1: e.x1 + c * r,
    y1: e.y1 + c * s,
    x2: e.x1 + h * r,
    y2: e.y1 + h * s
  };
}
function cl(e, t, i, n) {
  if (te(e) === "fixed") return 0;
  const o = Math.max(0, Math.min(1, t)), r = Math.max(0, Math.min(1, i ?? t));
  if (te(e) === "swing") {
    const s = Ue(e);
    if (s > 2) {
      let a = o + r;
      for (let l = 2; l < s; l++) a += Math.max(0, Math.min(1, n?.[l - 2] ?? t));
      return a / s;
    }
    return s === 2 ? (o + r) / 2 : o * lr(e);
  }
  if (te(e) === "awning") return o;
  switch (Sn(e)) {
    case "biparting":
      return (o + r) / 2;
    case "biparting-bypass":
    case "converging":
      return (o + r) / 4;
    default:
      return o;
  }
}
function dl(e, t, i, n, o) {
  return n !== void 0 && n <= 0 ? [0, 0] : mr(e) && te(e) !== "roll" ? [0, 1] : ag(e, t, i, o);
}
function ag(e, t, i, n) {
  const o = cl(e, t, i, n), r = [(1 - o) / 2, (1 + o) / 2];
  if (lr(e) < 1) {
    const c = [0, o];
    return e.flipH ? [1 - c[1], 1 - c[0]] : c;
  }
  if (te(e) !== "swing" || Ue(e) !== 2) return r;
  const s = Math.max(0, Math.min(1, t)), a = Math.max(0, Math.min(1, i ?? t)), l = [0.5 - s / 2, 0.5 + a / 2];
  return e.flipH ? [1 - l[1], 1 - l[0]] : l;
}
function nr(e, t, i) {
  const n = [];
  for (const r of t) {
    const s = i(r), a = (c) => Math.max(0, Math.min(1, c)), l = typeof s == "number" ? [(1 - a(s)) / 2, (1 + a(s)) / 2] : [a(Math.min(s[0], s[1])), a(Math.max(s[0], s[1]))];
    l[1] > l[0] && n.push({ o: r, span: l });
  }
  if (!n.length) return e;
  const o = [];
  for (const r of e) {
    const s = r.x2 - r.x1, a = r.y2 - r.y1, l = s * s + a * a;
    if (l === 0) {
      o.push(r);
      continue;
    }
    const c = Math.sqrt(l), h = [];
    for (const { o: v, span: x } of n) {
      if (tr(v.x, v.y, r) > Xi) continue;
      const $ = ((v.x - r.x1) * s + (v.y - r.y1) * a) / l, y = Math.cos(v.angle * Math.PI / 180) * s + Math.sin(v.angle * Math.PI / 180) * a >= 0 ? 1 : -1, w = (V) => y * (V - 0.5) * v.length / c, E = $ + w(x[0]), I = $ + w(x[1]), C = Math.max(0, Math.min(E, I)), B = Math.min(1, Math.max(E, I));
      B > C && h.push([C, B]);
    }
    if (!h.length) {
      o.push(r);
      continue;
    }
    h.sort((v, x) => v[0] - x[0]);
    const d = [h[0]];
    for (const v of h.slice(1)) {
      const x = d[d.length - 1];
      v[0] <= x[1] ? x[1] = Math.max(x[1], v[1]) : d.push(v);
    }
    const p = (v) => ({ x: r.x1 + s * v, y: r.y1 + a * v });
    let f = 0, m = 0;
    const b = (v, x) => {
      if ((x - v) * c < Q / 2) return;
      const $ = p(v), y = p(x);
      o.push({ id: `${r.id}#${m++}`, x1: $.x, y1: $.y, x2: y.x, y2: y.y });
    };
    for (const [v, x] of d)
      b(f, v), f = x;
    b(f, 1);
  }
  return o;
}
function hl(e, t, i, n) {
  const o = n.filter((d) => {
    const p = tr(e, t, d);
    return p < i && p > Q;
  });
  if (!o.length) return;
  const r = i * 1.01, s = [
    { id: "b1", x1: e - r, y1: t - r, x2: e + r, y2: t - r },
    { id: "b2", x1: e + r, y1: t - r, x2: e + r, y2: t + r },
    { id: "b3", x1: e + r, y1: t + r, x2: e - r, y2: t + r },
    { id: "b4", x1: e - r, y1: t + r, x2: e - r, y2: t - r }
  ], a = o.map((d) => sg(d, e - r, t - r, e + r, t + r)).filter((d) => d !== void 0);
  if (!a.length) return;
  const l = [...a, ...s], c = [];
  for (const d of l)
    for (const [p, f] of [
      [d.x1, d.y1],
      [d.x2, d.y2]
    ]) {
      const m = Math.atan2(f - t, p - e);
      for (const b of [m - 1e-4, m, m + 1e-4]) {
        const v = Math.cos(b), x = Math.sin(b);
        let $ = 1 / 0;
        for (const y of l) {
          const w = ir(e, t, v, x, y);
          w !== void 0 && w < $ && ($ = w);
        }
        $ < 1 / 0 && c.push({ x: e + v * $, y: t + x * $, a: b });
      }
    }
  c.sort((d, p) => d.a - p.a);
  const h = (d) => Math.round(d * 100) / 100;
  return c.map(({ x: d, y: p }) => ({ x: h(d), y: h(p) }));
}
function pl(e, t, i, n) {
  const o = t.radius, r = n?.length ? hl(e.x, e.y, o, n) : void 0, s = `${i}-clip`;
  return _`
    ${r ? _`<clipPath id=${s}>
                <polygon points=${r.map((a) => `${a.x},${a.y}`).join(" ")} />
              </clipPath>` : g}
    <radialGradient id=${i} gradientUnits="userSpaceOnUse"
                    cx=${e.x} cy=${e.y} r=${o}>
      <stop offset="0" stop-color=${t.color} stop-opacity=${t.opacity} />
      <stop offset="1" stop-color=${t.color} stop-opacity="0" />
    </radialGradient>
    <circle class="fp-glow" cx=${e.x} cy=${e.y} r=${o}
            fill=${`url(#${i})`}
            clip-path=${r ? `url(#${s})` : g} />`;
}
function lg(e, t, i, n, o, r) {
  const s = e.map((l) => {
    if (!l.glow) return;
    const c = er(l, t?.[l.entity]);
    if (c)
      return {
        // Normalized against the glow's own ceiling, so a full-brightness lamp
        // clears the dim entirely and a dim one clears proportionally.
        strength: Math.max(0, Math.min(1, c.opacity / Vi)),
        // Straight off the paint, so the clearing tracks the pool as it shrinks
        // with brightness (issue #123) instead of staying at the configured size.
        radius: c.radius
      };
  });
  if (!s.some((l) => l !== void 0)) return g;
  const a = Q;
  return _`
    <defs>
      <mask id=${o} maskUnits="userSpaceOnUse"
            x=${-a} y=${-a} width=${i + a * 2} height=${n + a * 2}>
        <rect x=${-a} y=${-a} width=${i + a * 2} height=${n + a * 2}
              fill="white" />
        ${e.map((l, c) => {
    const h = s[c];
    if (h === void 0) return g;
    const { strength: d, radius: p } = h, f = `${o}-${c}`, m = r?.length ? hl(l.x, l.y, p, r) : void 0, b = `${f}-clip`;
    return _`
            ${m ? _`<clipPath id=${b}>
                        <polygon points=${m.map((v) => `${v.x},${v.y}`).join(" ")} />
                      </clipPath>` : g}
            <radialGradient id=${f} gradientUnits="userSpaceOnUse"
                            cx=${l.x} cy=${l.y} r=${p}>
              <stop offset="0" stop-color="#000" stop-opacity=${d} />
              <stop offset="1" stop-color="#000" stop-opacity="0" />
            </radialGradient>
            <circle cx=${l.x} cy=${l.y} r=${p} fill=${`url(#${f})`}
                    clip-path=${m ? `url(#${b})` : g} />`;
  })}
      </mask>
    </defs>`;
}
function ul(e, t, i, n, o = je) {
  const r = Q;
  return _`
    <defs>
      <mask id=${n} maskUnits="userSpaceOnUse"
            x=${-r} y=${-r} width=${t + r * 2} height=${i + r * 2}>
        <rect x=${-r} y=${-r} width=${t + r * 2} height=${i + r * 2}
              fill="white" />
        ${e.map((s) => {
    const a = s.angle ? `rotate(${s.angle} ${s.x} ${s.y})` : void 0, l = $n(o, s.type)?.footprint === "ellipse", c = 1 - Ih;
    return l ? _`<ellipse cx=${s.x} cy=${s.y} rx=${s.w / 2} ry=${s.h / 2}
                           fill="#000" fill-opacity=${c} transform=${a ?? g} />` : _`<rect x=${s.x - s.w / 2} y=${s.y - s.h / 2} width=${s.w} height=${s.h}
                        fill="#000" fill-opacity=${c} transform=${a ?? g} />`;
  })}
      </mask>
    </defs>`;
}
function fl(e, t, i) {
  if (e.enableHideByEntity) {
    const n = e.hideEntity || e.entity;
    let o = t;
    return n && i && i.states[n] && (o = e.hideAttribute ? i.states[n].attributes[e.hideAttribute] : i.states[n].state), or(
      o,
      e.hideMode,
      e.hideState,
      e.hideOperator,
      e.hideThreshold,
      e.hideInvert
    );
  }
  return e.hideWhenInactive ? e.entity ? !Ke(e.entity, t) : !0 : !1;
}
function cg(e, t) {
  return e.showOnlyWhenZoomed ? t ? e.area ? e.area !== t.id && e.area !== t.name : !An(t.points ?? [], e.x, e.y) : !0 : !1;
}
function dg(e, t, i) {
  if (!e.enableHideBadgeByEntity) return !1;
  let n = t;
  if (i) {
    const o = e.hideBadgeEntity || e.entity;
    o && i.states[o] && (n = e.hideBadgeAttribute && i.states[o].attributes ? String(i.states[o].attributes[e.hideBadgeAttribute]) : i.states[o].state);
  }
  return or(
    n,
    e.hideBadgeMode,
    e.hideBadgeMatch,
    // Ensure this property is correctly mapped in your types, or use hideBadgeState
    e.hideBadgeOperator,
    e.hideBadgeThreshold,
    e.hideBadgeInvert
  );
}
const ml = 12;
function gl(e, t) {
  const i = [];
  if (t.showName) {
    const o = t.entity ? e?.states[t.entity]?.attributes?.friendly_name : void 0, r = t.name || o || t.entity;
    r && i.push(r);
  }
  let n = !1;
  if (t.enableHideStateByEntity && e) {
    const o = t.hideStateEntity || t.entity;
    let r;
    o && e.states[o] && (r = t.hideStateAttribute && e.states[o].attributes ? e.states[o].attributes[t.hideStateAttribute] : e.states[o].state), n = or(
      r,
      t.hideStateMode,
      t.hideStateMatch,
      t.hideStateOperator,
      t.hideStateThreshold,
      t.hideStateInvert
    );
  }
  if (t.entity && (t.showState ?? t.kind === "sensor") && !n && i.push(ng(e, t)), !n)
    for (const o of tt(t)) {
      if (o.showState === !1) continue;
      const r = ig(e, t, o);
      r && i.push(r);
    }
  return i.join(" · ");
}
const Ts = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
function or(e, t = "state", i, n = "==", o, r = !1) {
  if (e == null || e === "") return !1;
  let s = !1;
  if (t === "threshold") {
    if (o == null) return !1;
    const a = Number(e);
    if (!Number.isFinite(a)) return !1;
    switch (n) {
      case "<":
        s = a < o;
        break;
      case "<=":
        s = a <= o;
        break;
      case "==":
        s = a === o;
        break;
      case "!=":
        s = a !== o;
        break;
      case ">=":
        s = a >= o;
        break;
      case ">":
        s = a > o;
        break;
      default:
        return !1;
    }
  } else {
    if (i == null || String(i).trim() === "") return !1;
    const a = String(e).trim().toLowerCase(), l = String(i).trim().toLowerCase();
    if (Ts.has(a) && !Ts.has(l))
      return !1;
    s = n === "!=" ? a !== l : a === l;
  }
  return r ? !s : s;
}
function hg(e) {
  return e.showName || (e.showState ?? e.kind === "sensor") ? !0 : tt(e).some((t) => t.showState !== !1 && (t.entity || t.attribute));
}
function rr(e) {
  const t = e.labelPosition;
  return t === "left" || t === "right" ? t : "below";
}
function pg(e, t) {
  const i = gl(e, t);
  return i ? { text: i, live: !0 } : { text: t.name || t.entity || t.kind, live: !1 };
}
function yl(e) {
  return Math.min(40, Math.max(8, H(e, ml)));
}
function bl(e, t) {
  if (!e.disableLabelColor) return t;
  if (e.useCustomLabelColor)
    return G(e.labelCustomColor) ?? void 0;
}
function ug(e) {
  return Math.min(40, Math.max(8, H(e, Vo)));
}
function fg(e) {
  return Math.min(Ga, Math.max(2, H(e, Q)));
}
function _l(e) {
  return e === void 0 ? "" : `stroke-width:${fg(e)};`;
}
function sr(e) {
  return e === "plan" ? "plan" : "fixed";
}
function K(e, t) {
  return t === "plan" ? `calc(${e} * var(--fp-u, 1px))` : `${e}px`;
}
function mg(e, t) {
  return t !== "plan" && e === void 0 ? "" : `font-size:${K(ug(e), t)};`;
}
function Cs(e) {
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
const gg = {
  media_player: { on: "mdi:television-play", off: "mdi:television-off" },
  fan: { on: "mdi:fan", off: "mdi:fan-off" },
  lock: { on: "mdi:lock-open-variant", off: "mdi:lock" },
  camera: { on: "mdi:cctv", off: "mdi:cctv-off" },
  humidifier: { on: "mdi:air-humidifier", off: "mdi:air-humidifier-off" },
  vacuum: { on: "mdi:robot-vacuum", off: "mdi:robot-vacuum-variant" }
}, yg = {
  paused: "mdi:television-pause",
  idle: "mdi:television"
}, bg = {
  off: "mdi:power",
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan"
}, _g = {
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
}, vg = {
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
}, xg = {
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
}, wg = {
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
function $g(e) {
  return e === "on" || e === "open" || e === "home" || e === "playing";
}
const kg = {
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
function Ke(e, t) {
  if (!t || t === "unavailable" || t === "unknown") return !1;
  const i = e?.split(".")[0] ?? "", n = kg[i];
  return n ? n.has(t) : $g(t);
}
const Sg = {
  fan: "spin",
  media_player: "pulse",
  vacuum: "pulse"
};
function vl(e) {
  return Sg[e?.split(".")[0] ?? ""];
}
const Eg = /* @__PURE__ */ new Set(["idle", "off"]);
function Ag(e) {
  const t = e?.hvac_action;
  return typeof t != "string" ? !0 : !Eg.has(t);
}
function xl(e, t, i) {
  const n = e.iconAnimation ?? "auto";
  if (n !== "none" && Ke(e.entity, t)) {
    if (e.entity?.split(".")[0] === "climate") {
      if (!Ag(i)) return;
      if (t === "fan_only") return "spin";
    }
    return n === "spin" || n === "pulse" ? n : vl(e.entity);
  }
}
const Tg = /* @__PURE__ */ new Set(["motion", "occupancy", "presence", "vibration"]);
function wl(e, t) {
  const i = e?.split(".")[0];
  return i === "device_tracker" || i === "person" ? !0 : i === "binary_sensor" && !!t && Tg.has(t);
}
function $l(e, t, i, n) {
  const o = e.split(".")[0];
  if (o === "climate")
    return bg[n ?? ""] ?? (i ? "mdi:thermostat" : "mdi:power");
  if (o === "weather") return _g[n ?? ""] ?? "mdi:weather-cloudy";
  if (o === "media_player" && n) {
    const s = yg[n];
    if (s) return s;
  }
  const r = gg[o];
  if (r) return i ? r.on : r.off;
  if (t) {
    if (o === "binary_sensor") {
      const s = vg[t];
      return s ? i ? s.on : s.off : void 0;
    }
    if (o === "sensor") return xg[t];
    if (o === "cover") {
      const s = wg[t];
      return s ? i ? s.on : s.off : void 0;
    }
  }
}
function ar(e, t) {
  if (t)
    return e.attribute ? t.attributes?.[e.attribute] : t.state;
}
function vo(e, t, i) {
  const n = si(al(e.stateColor, ar(e, t))?.icon);
  if (n) return n;
  const o = si(e.icon);
  if (o) return o;
  if (!e.entity) return Cs(e.kind);
  if (i) return i;
  const r = t?.attributes?.icon;
  return r || ($l(
    e.entity,
    t?.attributes?.device_class,
    Ke(e.entity, t?.state),
    t?.state
  ) ?? Cs(e.kind));
}
function kl(e) {
  const t = Math.round(e);
  let i = Math.round(t * 0.62);
  return i % 2 !== t % 2 && (i += 1), Math.max(2, i);
}
function _i(e) {
  return e.badgeContent === "icon" || e.badgeContent === "value" || e.badgeContent === "none" ? e.badgeContent : e.showIcon === !1 ? "none" : "icon";
}
function Ii(e) {
  const t = e.pressEffect;
  return t === "scale" || t === "ripple" || t === "flash" || t === "none" ? t : Za;
}
function Cg(e, t, i) {
  if (e.goToFloor !== "up" && e.goToFloor !== "down") return;
  const n = t.findIndex((r) => r.id === i);
  return n < 0 ? void 0 : t[n + (e.goToFloor === "up" ? 1 : -1)]?.id;
}
function Sl(e) {
  const t = e.offlineStyle;
  return t === "dim" || t === "strike" || t === "none" ? t : Xa;
}
function xo(e, t) {
  return e.entity ? t === void 0 || jt(t) : !1;
}
const Mg = {
  climate: { attribute: "current_temperature", unit: "°" },
  water_heater: { attribute: "current_temperature", unit: "°" },
  humidifier: { attribute: "current_humidity", unit: "%" }
};
function Qt(e) {
  if (e == null || typeof e == "boolean" || typeof e == "string" && e.trim() === "") return;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function Ig(e) {
  if (typeof e != "string") return "";
  const t = e.trim();
  return t === "°C" || t === "°F" || t === "K" ? "°" : t === "ppm" || t === "ppb" ? "" : t.length <= 3 ? t : "";
}
function Pi(e) {
  return Math.abs(e) < 10 && !Number.isInteger(e) ? e.toFixed(1) : String(Math.round(e));
}
function Pg(e, t) {
  return t === "W" && Math.abs(e) >= 1e3 ? { n: e / 1e3, unit: "kW" } : { n: e, unit: t };
}
function Ms(e, t) {
  const i = Pg(e, Ig(t));
  return Pi(i.n) + i.unit;
}
function El(e, t) {
  return Tl(e, t)?.text;
}
function Al(e) {
  return e === "primary" ? "primary" : e === "secondary" ? 0 : typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : void 0;
}
function Tl(e, t) {
  if (!e || !t.entity) return;
  const i = tt(t), n = () => {
    const a = e.states[t.entity], l = a?.attributes, c = Mg[t.entity.split(".")[0]];
    if (t.attribute) {
      const d = Qt(l?.[t.attribute]);
      if (d !== void 0)
        return Pi(d) + (t.attribute === c?.attribute ? c.unit : "");
    }
    if (c) {
      const d = Qt(l?.[c.attribute]);
      if (d !== void 0) return Pi(d) + c.unit;
    }
    const h = Qt(a?.state);
    return h === void 0 ? void 0 : Ms(h, l?.unit_of_measurement);
  }, o = (a) => {
    const l = i[a];
    if (!l) return;
    const c = l.entity || (l.attribute ? t.entity : void 0);
    if (!c) return;
    const h = e.states[c], d = h?.attributes;
    if (l.attribute) {
      const f = Qt(d?.[l.attribute]);
      return f === void 0 ? void 0 : Pi(f);
    }
    const p = Qt(h?.state);
    return p === void 0 ? void 0 : Ms(p, d?.unit_of_measurement);
  }, r = Al(t.badgeEntity);
  if (r === "primary") {
    const a = n();
    return a === void 0 ? void 0 : { text: a, source: "primary" };
  }
  if (typeof r == "number") {
    const a = o(r);
    return a === void 0 ? void 0 : { text: a, source: r };
  }
  const s = n();
  if (s !== void 0) return { text: s, source: "primary" };
  for (let a = 0; a < i.length; a++) {
    const l = o(a);
    if (l !== void 0) return { text: l, source: a };
  }
}
const Og = { ".": 0.28, "-": 0.38, "°": 0.45, "%": 1, k: 0.58 }, Lg = 0.7, Fg = 0.85;
function Is(e) {
  let t = 0;
  for (const i of e)
    t += Og[i] ?? (i >= "0" && i <= "9" ? Lg : Fg);
  return t;
}
function Cl(e, t) {
  const i = Math.round(H(e, at)), n = Math.max(0, i - 6), o = Is(t) > 0 ? n / Is(t) : i;
  let r = Math.round(Math.min(i * 0.46, o));
  return r % 2 !== i % 2 && (r -= 1), Math.max(6, r);
}
function Ps(e) {
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
function te(e) {
  return e.motion ?? "swing";
}
function lr(e) {
  if (te(e) !== "swing" || ci(e) !== "single") return 1;
  const t = e.sashSpan;
  return typeof t != "number" || !Number.isFinite(t) ? 1 : Math.max(rl, Math.min(1, t));
}
function cr(e) {
  const t = e.type === "door" && te(e) === "swing";
  return e.invert ? !t : t;
}
function Rg(e) {
  return { sx: e.flipH ? -1 : 1, sy: e.flipV ? -1 : 1 };
}
function Sn(e) {
  return te(e) === "slide" ? e.sliderStyle ?? "single" : "single";
}
function Ml(e) {
  return e === "biparting" || e === "biparting-bypass" || e === "converging";
}
function Qi(e) {
  return te(e) === "swing" ? Ue(e) >= 2 : Ml(Sn(e));
}
function Ue(e) {
  if (te(e) !== "swing") return 1;
  switch (ci(e)) {
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
function zg(e, t) {
  return t === 0 ? e : t === 1 ? dr(e) : { ...e, entity: e.extraEntities?.[t - 2] };
}
function dr(e) {
  return { ...e, entity: e.secondaryEntity };
}
function wo(e) {
  return e === "window" ? "double" : "single";
}
function ci(e) {
  return te(e) === "swing" ? e.sash ?? wo(e.type) : wo(e.type);
}
function Ct(e) {
  return e.shutterStyle === "roll" || e.shutterStyle === "swing" ? e.shutterStyle : e.shutterEntity?.split(".")[0] === "binary_sensor" ? "swing" : "roll";
}
function Ze(e, t = !1) {
  if (!e || jt(e.state)) return 0;
  const i = e.attributes?.current_position;
  if (typeof i == "number" && Number.isFinite(i)) {
    const o = Math.max(0, Math.min(1, i / 100));
    return t ? 1 - o : o;
  }
  const n = e.state === "open" || e.state === "opening" || e.state === "closing" || e.state === "on";
  return (t ? !n : n) ? 1 : 0;
}
function Oi(e, t = !1) {
  return !e || jt(e.state) ? !1 : Ze(e, t) > 0 || e.state === "opening" || e.state === "closing";
}
const Ng = /* @__PURE__ */ new Set(["window", "blind", "shade", "shutter", "curtain", "awning"]), Dg = /* @__PURE__ */ new Set(["blind", "shade", "curtain"]), Hg = /* @__PURE__ */ new Set(["garage", "garage_door", "shutter"]);
function Ug(e) {
  const t = e ?? "";
  return {
    type: Ng.has(t) ? "window" : "door",
    motion: Hg.has(t) ? "roll" : Dg.has(t) ? "slide" : void 0
  };
}
const Bg = 3;
function jg(e, t) {
  return e.split(".")[0] === "cover" && t & Bg ? "cover-toggle" : "more-info";
}
function hr(e, t, i) {
  const n = e.entity || void 0, o = e.shutterEntity || void 0, r = !!(n && o && e.tapTarget === "shutter"), s = r ? o : n ?? o, a = n && o ? r ? n : o : void 0, l = t === "tap" ? e.tap_action : t === "hold" ? e.hold_action : e.double_tap_action;
  if (l) return { entity: l.entity ?? s, config: l };
  if (t === "tap")
    return s ? {
      entity: s,
      config: {
        action: (
          // Pointing the tap at the shutter opens its dialog; it does not
          // drive the motor. Choosing *which* entity answers is not the same
          // as choosing to move hardware on a tap, and that second decision
          // stays where it is explicit — `tap_action: toggle` (issue #47).
          !r && jg(s, i(s)) === "cover-toggle" ? "toggle" : "more-info"
        )
      }
    } : void 0;
  if (t === "hold" && a) return { entity: a, config: { action: "more-info" } };
}
function Li(e, t) {
  const i = t === "tap" ? e.tap_action : t === "hold" ? e.hold_action : e.double_tap_action;
  if (i)
    return { entity: i.entity ?? e.entity, config: i };
}
function Wg(e) {
  return ["tap", "hold", "double_tap"].some(
    (t) => Ve(Li(e, t)?.config)
  );
}
function Gg(e, t) {
  return ["tap", "hold", "double_tap"].some(
    (i) => Ve(hr(e, i, t)?.config)
  );
}
function jt(e) {
  return e === "unavailable" || e === "unknown";
}
function Kg(e, t) {
  if (!e.entity || t === void 0) return cr(e);
  if (qg(e.entity, t)) return !1;
  const i = Vg(e.entity, t);
  return e.invert ? !i : i;
}
function qg(e, t) {
  return jt(t) ? !0 : e.split(".")[0] === "lock" && t === "jammed";
}
function Vg(e, t) {
  return e.split(".")[0] === "lock" ? Ke(e, t) : t === "on" || t === "open" || t === "opening" || t === "closing";
}
function Yg(e) {
  return e === "opening" || e === "closing";
}
function lt(e, t) {
  if (!e.entity || !t) return cr(e) ? 1 : 0;
  if (jt(t.state)) return 0;
  const i = t.attributes?.current_position;
  if (typeof i == "number" && Number.isFinite(i)) {
    const n = Math.max(0, Math.min(1, i / 100));
    return e.invert ? 1 - n : n;
  }
  return Kg(e, t.state) ? 1 : 0;
}
function Fi(e, t) {
  return !e.entity || !t || jt(t.state) ? !1 : Yg(t.state) || lt(e, t) > 0;
}
function Os(e, t, i) {
  const n = e / 2, o = 5, r = Math.max(3, Math.round(e / 12)), s = [];
  for (let a = 1; a < r; a++) {
    const l = -n + e * a / r;
    s.push(
      _`<line x1=${l} y1=${-o / 2} x2=${l} y2=${o / 2}
            stroke=${gn} stroke-width="0.75" />`
    );
  }
  return _`<g class="fp-roll-curtain" style="transform:scaleY(${1 - i});">
      <rect x=${-n} y=${-o / 2} width=${e} height=${o}
            style="fill:${t};" />
      ${s}
    </g>`;
}
function Zg(e, t, i, n, o = 1, r = i, s = n) {
  const a = e / 2, l = 3, c = o * (t / 2 + l / 2), h = (d, p) => {
    const f = [], m = Math.max(2, Math.round(p / 14));
    for (let b = 1; b < m; b++) {
      const v = d + p * b / m;
      f.push(
        _`<line x1=${v} y1=${-l / 2} x2=${v} y2=${l / 2}
              stroke=${gn} stroke-width="0.75" />`
      );
    }
    return f;
  };
  return _`
      <g transform="translate(${-a} ${c})">
        <g class="fp-door-leaf" style="transform:rotate(${o * 90 * n}deg);">
          <rect x="0" y=${-l / 2} width=${a} height=${l} style="fill:${i};" />
          ${h(0, a)}
        </g>
      </g>
      <g transform="translate(${a} ${c})">
        <g class="fp-leaf-r" style="transform:rotate(${-o * 90 * s}deg);">
          <rect x=${-a} y=${-l / 2} width=${a} height=${l} style="fill:${r};" />
          ${h(-a, a)}
        </g>
      </g>`;
}
const Il = 22, Ji = 14, en = 22, tn = 15;
function pr(e, t = 0) {
  const i = e.flipV ? -1 : 1, n = e.angle * Math.PI / 180, o = { x: -Math.sin(n) * i, y: Math.cos(n) * i };
  return t === 90 ? { x: -o.y, y: o.x } : t === 180 ? { x: -o.x, y: -o.y } : t === 270 ? { x: o.y, y: -o.x } : o;
}
function ur(e, t = Il) {
  const i = (e.flipV ? -1 : 1) * t, n = e.angle * Math.PI / 180;
  return { x: e.x - Math.sin(n) * i, y: e.y + Math.cos(n) * i };
}
function Pl(e) {
  return !!(e.entity && e.shutterEntity) && (e.showShutterIcon ?? !0);
}
const Xg = { on: "mdi:window-shutter-open", off: "mdi:window-shutter" }, Ls = {
  door: { on: "mdi:door-open", off: "mdi:door-closed" },
  window: { on: "mdi:window-open", off: "mdi:window-closed" }
};
function Ol(e, t, i, n, o, r) {
  const s = si(t);
  if (s) return s;
  const a = si(r);
  if (a) return a;
  const l = si(i?.attributes?.icon);
  return l || ($l(e, i?.attributes?.device_class, n) ?? (n ? o.on : o.off));
}
function Ll(e, t, i, n) {
  return Ol(
    e.shutterEntity ?? "",
    e.shutterIcon,
    t,
    i,
    Xg,
    n
  );
}
function Fl(e) {
  return !!e.entity && (e.showIcon ?? !1);
}
function Rl(e, t, i, n) {
  return Ol(
    e.entity ?? "",
    e.icon,
    t,
    i,
    Ls[e.type] ?? Ls.door,
    n
  );
}
function zl(e) {
  return ur(e, -Il);
}
function Nl(e, t = 0) {
  const i = pr(e, t);
  return { x: -i.x, y: -i.y };
}
function Dl(e, t) {
  const { color: i, open: n = !0, active: o = !1, accent: r = Y } = t, s = e.length / 2, a = Q + 4, l = G(t.inactive) ?? i, c = Math.max(0, Math.min(1, t.amount ?? (n ? 1 : 0))), h = t.second ? Math.max(0, Math.min(1, t.second.amount)) : c, d = (y, w) => ve(y ? r : w === 0 ? l : i, Y), p = d(o, c), f = t.second ? d(!!t.second.active, h) : p, m = (t.more ?? []).map((y) => Math.max(0, Math.min(1, y.amount))), b = (t.more ?? []).map((y, w) => d(!!y.active, m[w]));
  let v;
  if (te(e) === "swing") {
    const y = Ue(e), w = lr(e), E = y > 1 ? e.length / y : e.length * w, I = Math.PI / 2 * E, C = Array.from({ length: y }, (D, L) => {
      const T = L === 0 ? c : L === 1 ? h : m[L - 2] ?? c, ge = L === 0 ? p : L === 1 ? f : b[L - 2] ?? p;
      return { index: L, amt: T, tone: ge, hingeRight: y > 1 && (e.leafHinges?.[L] ? e.leafHinges[L] === "right" : L === y - 1) };
    }), B = (D, L, T) => _`<path class="fp-door-arc" d=${D}
              fill="none" stroke-width="1.5" stroke-dasharray=${I}
              style="stroke:${L};stroke-dashoffset:${I * (1 - T)};" />`, V = e.type === "window" ? _`
        <line x1=${-s} y1=${-a / 2} x2=${-s} y2=${a / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${s} y1=${-a / 2} x2=${s} y2=${a / 2}
              stroke=${i} stroke-width="2" />` : g;
    v = _`
        ${V}
        ${y > 1 ? (
      // Equal leaves side by side (floorplan-panel: 2..4). All hang on
      // their left edge but the last, which hangs on the right; for two
      // that is the classic pair meeting in the middle, each tracing
      // its own quarter circle outward.
      _`${C.map((D) => {
        const L = -s + D.index * E, T = L + E;
        return D.hingeRight ? B(`M ${L} 0 A ${E} ${E} 0 0 1 ${T} ${-E}`, D.tone, D.amt) : B(`M ${T} 0 A ${E} ${E} 0 0 0 ${L} ${-E}`, D.tone, D.amt);
      })}`
    ) : (
      // Hinged at the −x jamb, so the tip starts `leafW` along the wall
      // and ends `leafW` out from it. At full span that is exactly the
      // arc this drew before `sashSpan` existed.
      B(`M ${-s + E} 0 A ${E} ${E} 0 0 0 ${-s} ${-E}`, p, c)
    )}
        ${// The pane the sash does not cover: fixed glass, drawn in the base
    // colour because it never opens and so is never the active part.
    // Nothing at full span, which is every opening that predates this.
    w < 1 ? _`<line x1=${-s + E} y1="0" x2=${s} y2="0"
              stroke=${i} stroke-width=${e.type === "window" ? 1.5 : 2.5} />` : g}
        <!-- leaves hinged at their left edge, the last at its right (flipH mirrors them) -->
        ${C.map((D) => {
      const L = -s + D.index * E;
      return D.hingeRight ? _`<g transform="translate(${L + E} 0)">
          <g class="fp-leaf-r" style="transform:rotate(${90 * D.amt}deg);">
            <rect x=${-E} y="-1.25" width=${E} height="2.5" style="fill:${D.tone};" />
          </g>
        </g>` : _`<g transform="translate(${L} 0)">
          <g class="fp-door-leaf" style="transform:rotate(${-90 * D.amt}deg);">
            <rect x="0" y="-1.25" width=${E} height="2.5" style="fill:${D.tone};" />
          </g>
        </g>`;
    })}
      `;
  } else if (te(e) === "fixed") {
    const y = e.type === "window" ? 1.5 : 2.5;
    v = _`
        ${e.type === "window" ? _`
        <line x1=${-s} y1=${-a / 2} x2=${-s} y2=${a / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${s} y1=${-a / 2} x2=${s} y2=${a / 2}
              stroke=${i} stroke-width="2" />` : g}
        <line x1=${-s} y1="0" x2=${s} y2="0"
              stroke=${i} stroke-width=${y} />`;
  } else if (te(e) === "awning") {
    const y = Math.min(12, e.length * 0.16), w = 5, E = s - y / 2 - 1, I = Math.max(0, E - y / 2), C = Math.min(s * 0.62, 34) * c, B = Math.min(C * 0.16, I * 0.4), V = c > 0.02;
    v = _`
        <!-- jambs, as any window -->
        <line x1=${-s} y1=${-a / 2} x2=${-s} y2=${a / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${s} y1=${-a / 2} x2=${s} y2=${a / 2}
              stroke=${i} stroke-width="2" />
        <!-- The glass line: solid while the sash is shut and sitting in it,
             broken once the sash has swung out and left the gap behind. -->
        <line x1=${-s} y1="0" x2=${s} y2="0"
              stroke=${p} stroke-width="1.5"
              stroke-dasharray=${V ? "6 4" : g} />
        ${V ? (
      // A polyline, not a polygon, and that is the whole point of the
      // broken line above it. A closed shape strokes its own base back
      // along y=0 — straight over the dashes, solid — and the only
      // glass left uncovered would be the sliver outside `bx`, which
      // is exactly where the knuckles sit. The line would have been
      // dashed in the markup and solid on the screen at every size.
      _`<polyline
                    points="${-I},0 ${-I + B},${-C} ${I - B},${-C} ${I},0"
                    fill="none" stroke=${p} stroke-width="1.5"
                    stroke-linejoin="round" />`
    ) : g}
        <!-- Hinge knuckles, drawn whether or not it is open: they are what says
             this window is top-hung rather than fixed when it happens to be
             shut, and the request asked for them by name. -->
        ${[-E, E].map(
      (D) => _`
          <rect x=${D - y / 2} y=${-w / 2} width=${y} height=${w}
                fill="none" stroke=${p} stroke-width="1.25" />
          <line x1=${D} y1=${-w / 2} x2=${D} y2=${w / 2}
                stroke=${p} stroke-width="1.25" />`
    )}`;
  } else if (te(e) === "roll")
    v = _`
        <!-- jambs -->
        <line x1=${-s} y1=${-a / 2} x2=${-s} y2=${a / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${s} y1=${-a / 2} x2=${s} y2=${a / 2}
              stroke=${i} stroke-width="2" />
        <!-- Track: stays when the curtain is up so the gap still reads as an
             opening — and wears the accent while the cover is open or moving
             (issue #154). Wide open the curtain has scaled away to nothing, so
             this line is the *only* mark left: drawn in the base colour it read
             exactly like a shut garage, which is the one thing it must not do.
             Full strength when accented, since a 0.6 tint of the accent reads
             as neither colour. -->
        <line x1=${-s} y1="0" x2=${s} y2="0"
              stroke=${p} stroke-width="0.75" opacity=${o ? 1 : 0.6} />
        ${Os(e.length, p, c)}`;
  else {
    const y = e.type === "window" ? 1.5 : 2.5, w = _`
        <line x1=${-s} y1=${-a / 2} x2=${-s} y2=${a / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${s} y1=${-a / 2} x2=${s} y2=${a / 2}
              stroke=${i} stroke-width="2" />`, E = Sn(e);
    if (E === "bypass") {
      const C = -s * c;
      v = _`
        ${w}
        <!-- tracks -->
        <line x1=${-s} y1=${-1.75} x2=${s} y2=${-1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <line x1=${-s} y1=${1.75} x2=${s} y2=${1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <!-- fixed panel: left half, front track -->
        <rect x=${-s} y=${1.75 - y / 2} width=${s} height=${y} style="fill:${p};" />
        <!-- moving panel: right half, back track -->
        <g class="fp-slide-panel" style="transform:translateX(${C}px);">
          <rect x="0" y=${-1.75 - y / 2} width=${s} height=${y} style="fill:${p};" />
        </g>`;
    } else if (E === "biparting")
      v = _`
        ${w}
        <!-- track -->
        <line x1=${-s} y1="0" x2=${s} y2="0"
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <g class="fp-slide-panel" style="transform:translateX(${-s * c}px);">
          <rect x=${-s} y=${-y / 2} width=${s} height=${y} style="fill:${p};" />
        </g>
        <g class="fp-slide-panel" style="transform:translateX(${s * h}px);">
          <rect x="0" y=${-y / 2} width=${s} height=${y} style="fill:${f};" />
        </g>`;
    else if (E === "biparting-bypass") {
      const C = s / 2;
      v = _`
        ${w}
        <!-- tracks -->
        <line x1=${-s} y1=${-1.75} x2=${s} y2=${-1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <line x1=${-s} y1=${1.75} x2=${s} y2=${1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <!-- fixed panels: outer quarters, front track. Never accented, even
             wide open — the accent marks what has moved, and lighting these
             would accent exactly the half that is still glazed shut. -->
        <rect x=${-s} y=${1.75 - y / 2} width=${C} height=${y} fill=${i} />
        <rect x=${s - C} y=${1.75 - y / 2} width=${C} height=${y} fill=${i} />
        <!-- moving panels: inner quarters, back track -->
        <g class="fp-slide-panel" style="transform:translateX(${-C * c}px);">
          <rect x=${-C} y=${-1.75 - y / 2} width=${C} height=${y} style="fill:${p};" />
        </g>
        <g class="fp-slide-panel" style="transform:translateX(${C * h}px);">
          <rect x="0" y=${-1.75 - y / 2} width=${C} height=${y} style="fill:${f};" />
        </g>`;
    } else if (E === "converging") {
      const C = s / 2;
      v = _`
        ${w}
        <!-- tracks -->
        <line x1=${-s} y1=${-1.75} x2=${s} y2=${-1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <line x1=${-s} y1=${1.75} x2=${s} y2=${1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <!-- both panels move, so both take the accent on their own state:
             front track travels right, back track left, and they meet. -->
        <g class="fp-slide-panel" style="transform:translateX(${C * c}px);">
          <rect x=${-s} y=${1.75 - y / 2} width=${s} height=${y} style="fill:${p};" />
        </g>
        <g class="fp-slide-panel" style="transform:translateX(${-C * h}px);">
          <rect x="0" y=${-1.75 - y / 2} width=${s} height=${y} style="fill:${f};" />
        </g>`;
    } else {
      const I = e.length * c;
      v = _`
        ${w}
        <!-- track -->
        <line x1=${-s} y1="0" x2=${s} y2="0"
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <g class="fp-slide-panel" style="transform:translateX(${I}px);">
          <rect x=${-s} y=${-y / 2} width=${e.length} height=${y} style="fill:${p};" />
        </g>`;
    }
  }
  if (t.shutter) {
    const y = Math.max(0, Math.min(1, t.shutter.amount)), w = (V, D) => ve(V ? t.shutter.accent ?? r : D === 0 ? l : i, Y), E = w(t.shutter.active, y), I = t.shutter.second, C = I ? Math.max(0, Math.min(1, I.amount)) : y, B = I ? w(I.active, C) : E;
    v = _`${v}${t.shutter.style === "swing" ? Zg(
      e.length,
      a,
      E,
      y,
      t.shutter.flip ? -1 : 1,
      B,
      C
    ) : Os(e.length, E, y)}`;
  }
  const { sx: x, sy: $ } = Rg(e);
  return _`<g class=${`fp-opening fp-opening-${be(e.type) ?? "unknown"}`}
                data-id=${be(e.id) ?? g}
                data-entity=${Je(e.entity) ?? g}
                transform="translate(${e.x} ${e.y}) rotate(${e.angle})">
      <g transform="scale(${x} ${$})">${v}</g>
    </g>`;
}
function di(e) {
  if (typeof e != "number" || !Number.isFinite(e)) return 0;
  const t = (e % 360 + 360) % 360;
  return t === 90 || t === 180 || t === 270 ? t : 0;
}
function Qg(e, t) {
  const i = di(e.rotation);
  if (t === void 0) return i;
  const n = t ? e.rotationPortrait : e.rotationLandscape;
  return n == null ? i : di(n);
}
function Jg(e, t) {
  return typeof e.addEventListener == "function" ? (e.addEventListener("change", t), () => e.removeEventListener?.("change", t)) : typeof e.addListener == "function" ? (e.addListener(t), () => e.removeListener?.(t)) : () => {
  };
}
function rt(e, t, i) {
  return i === 90 || i === 270 ? { w: t, h: e } : { w: e, h: t };
}
function St(e, t, i, n, o) {
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
function ey(e, t, i) {
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
function ty(e, t = qo, i = qi) {
  const n = Math.min(t, i), o = Math.max(t, i);
  if (!(typeof e == "number" || typeof e == "string" && e.trim() !== "")) return o;
  const s = typeof e == "number" ? e : Number(e);
  if (!Number.isFinite(s)) return o;
  const a = Ch - cs, l = Math.max(0, Math.min(1, (s - cs) / a)), c = l * l * (3 - 2 * l);
  return n + (o - n) * c;
}
const $o = 135, Fs = 12;
function fr(e) {
  if (!(typeof e == "number" || typeof e == "string" && e.trim() !== "")) return;
  const i = typeof e == "number" ? e : Number(e);
  return Number.isFinite(i) ? i : void 0;
}
function iy(e) {
  const t = fr(e);
  if (t === void 0) return 1;
  if (t <= 0) return 0;
  if (t >= Fs) return 1;
  const i = t / Fs;
  return i * i * (3 - 2 * i);
}
function ny(e, t = 0) {
  const i = (e + t) * Math.PI / 180;
  return { x: Math.sin(i), y: -Math.cos(i) };
}
function oy(e, t) {
  return En(e) ? e.sunBearing : fr(t) ?? $o;
}
function En(e) {
  return typeof e.sunBearing == "number" && Number.isFinite(e.sunBearing);
}
function ry(e, t) {
  return En(e) ? 1 : iy(t);
}
const nn = 0.34, sy = 30, ay = 0.95, ly = 0.16, cy = 0.37, ko = "var(--fp-skin-sunlight, #ffd9a0)", So = "var(--fp-skin-sunshade, #000)";
function dy(e) {
  return Math.max(0.02, Math.min(1.5, H(e, nn)));
}
function hy(e, t, i, n) {
  let o = n;
  for (const r of i) {
    const s = ir(e.x, e.y, t.x, t.y, r);
    s !== void 0 && s > 1 && s < o && (o = s);
  }
  return o;
}
function py(e) {
  const t = fr(e);
  if (t === void 0) return 1;
  const i = (o) => o * Math.PI / 180, n = Math.tan(i(sy)) / Math.tan(i(Math.max(1, Math.min(89, t))));
  return Math.max(0.45, Math.min(1.9, n));
}
function uy(e, t, i) {
  return e.sunlight === !1 || i !== void 0 && i <= 0 ? 0 : mr(e) ? 1 : Math.max(0, Math.min(1, t));
}
function mr(e) {
  return e.glazed ?? e.type === "window";
}
function Hl(e) {
  const t = e.angle * Math.PI / 180, i = Math.cos(t) * e.length / 2, n = Math.sin(t) * e.length / 2;
  return [
    { x: e.x - i, y: e.y - n },
    { x: e.x + i, y: e.y + n }
  ];
}
function An(e, t, i) {
  let n = !1;
  for (let o = 0, r = e.length - 1; o < e.length; r = o++) {
    const s = e[o], a = e[r];
    s.y > i != a.y > i && t < (a.x - s.x) * (i - s.y) / (a.y - s.y) + s.x && (n = !n);
  }
  return n;
}
function fy(e, t, i) {
  for (const n of t) {
    const o = ir(e.x, e.y, -i.x, -i.y, n);
    if (o === void 0) continue;
    if (!(o <= Xi && tr(e.x, e.y, n) <= Xi)) return !1;
  }
  return !0;
}
function my(e, t) {
  return ny(oy(e, t) + 180, e.north ?? 0);
}
function Ul(e, t, i, n) {
  return [
    e,
    t,
    { x: t.x + i.x * n, y: t.y + i.y * n },
    { x: e.x + i.x * n, y: e.y + i.y * n }
  ];
}
function gy(e, t, i, n = 1) {
  const [o, r] = Hl(e), s = Math.max(0, Math.min(1, n)), a = (o.x + r.x) / 2, l = (o.y + r.y) / 2, c = (h) => ({ x: a + (h.x - a) * s, y: l + (h.y - l) * s });
  return Ul(c(o), c(r), t, i);
}
function yy(e, t, i) {
  return Ul({ x: e.x1, y: e.y1 }, { x: e.x2, y: e.y2 }, t, i);
}
function Rs(e) {
  return e.map((t) => `${t.x},${t.y}`).join(" ");
}
function by(e, t, i, n, o, r) {
  const { dir: s, openAmount: a, shutterOpen: l, strength: c = 1 } = r, h = {
    light: r.light ?? ko,
    // `?? ` would swallow the explicit null that means "no shade at all".
    shade: r.shade === void 0 ? So : r.shade
  };
  if (c <= 0) return g;
  const d = Math.min(i, n) * dy(r.reach), p = (T) => uy(T, a(T), l(T)), f = nr(e, t, p), m = f.map((T) => yy(T, s, d)), b = t.map((T, ge) => {
    if (!(p(T) > 0 && fy(T, e, s))) return;
    const yt = hy(T, s, f, d), [Ar, Tr] = Hl(T), Tc = Tr.x - Ar.x, Cc = Tr.y - Ar.y, Mc = Math.abs(Tc * s.y - Cc * s.x) * p(T) / 2;
    return {
      // The outline runs past the falloff, so the ellipse is what bounds the
      // patch and never the polygon's flat far edge.
      points: Rs(gy(T, s, yt + T.length, p(T))),
      cx: T.x,
      cy: T.y,
      along: yt,
      across: Math.max(1, Mc * ay),
      angle: Math.atan2(s.y, s.x) * 180 / Math.PI,
      lightId: `${o}-b${ge}`,
      shadeId: `${o}-s${ge}`,
      fadeId: `${o}-f${ge}`
    };
  });
  if (!b.some((T) => T !== void 0)) return g;
  const v = m.map(Rs), x = Q, $ = `${o}-shade`, y = `${o}-shadow`, w = -x, E = -x, I = i + x * 2, C = n + x * 2, B = (T, ge = g) => _`<rect x=${w} y=${E} width=${I} height=${C} fill=${T}>${ge}</rect>`, V = (T, ge) => _`<polygon points=${T} fill=${ge} stroke=${ge} stroke-width=${Q} />`, D = (T, ge, yt) => _`<radialGradient id=${ge} gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1"
              gradientTransform=${`translate(${T.cx} ${T.cy}) rotate(${T.angle}) scale(${T.along} ${T.across})`}>
          <stop offset="0" stop-color=${yt} stop-opacity="1" />
          <stop offset="0.45" stop-color=${yt} stop-opacity="0.55" />
          <stop offset="1" stop-color=${yt} stop-opacity="0" />
        </radialGradient>`, L = h.shade === null ? g : _`
      <!-- Where the shade shows: everywhere, minus the patches of light, plus
           back wherever a wall stands in one. The order is the whole logic. -->
      <mask id=${$} maskUnits="userSpaceOnUse" x=${w} y=${E} width=${I} height=${C}>
        ${B("#fff")}
        ${b.map((T) => T ? D(T, T.shadeId, "#000") : g)}
        ${b.map(
    (T) => T ? _`<polygon points=${T.points} fill=${`url(#${T.shadeId})`} />` : g
  )}
        ${v.map((T) => V(T, "#fff"))}
      </mask>`;
  return _`
    <defs>
      ${L}
      <!-- The wall shadows again, for the warm patches themselves. -->
      <mask id=${y} maskUnits="userSpaceOnUse" x=${w} y=${E} width=${I} height=${C}>
        ${B("#fff")}
        ${v.map((T) => V(T, "#000"))}
      </mask>
    </defs>
    <g class="fp-sunlight">
      ${h.shade === null ? g : _`<rect x=${w} y=${E} width=${I} height=${C}
            style=${`fill:${ve(h.shade, So)};`}
            opacity=${ly * c} mask=${`url(#${$})`} />`}
      <g mask=${`url(#${y})`} opacity=${cy * c}>
        ${b.map(
    (T) => T ? D(T, T.lightId, ve(h.light, ko)) : g
  )}
        ${b.map(
    (T) => T ? _`<polygon class="fp-sunbeam" points=${T.points}
                            fill=${`url(#${T.lightId})`} />` : g
  )}
      </g>
    </g>`;
}
function Bl(e) {
  switch (e) {
    case "contain":
      return "xMidYMid meet";
    case "cover":
      return "xMidYMid slice";
    default:
      return "none";
  }
}
function jl(e, t, i, n) {
  const o = Q + 4, r = Q;
  return _`
    <defs>
      <mask id=${n} maskUnits="userSpaceOnUse"
            x=${-r} y=${-r} width=${t + r * 2} height=${i + r * 2}>
        <rect x=${-r} y=${-r} width=${t + r * 2} height=${i + r * 2}
              fill="white" />
        ${e.map((s) => {
    const a = s.length / 2;
    return _`<rect x=${s.x - a} y=${s.y - o / 2}
                           width=${s.length} height=${o} fill="black"
                           transform="rotate(${s.angle} ${s.x} ${s.y})" />`;
  })}
      </mask>
    </defs>`;
}
function gr(e) {
  if (!e.length) return { x: 0, y: 0 };
  const t = e.reduce((i, n) => ({ x: i.x + n.x, y: i.y + n.y }), { x: 0, y: 0 });
  return { x: t.x / e.length, y: t.y / e.length };
}
const Eo = { scale: 1, txPercent: 0, tyPercent: 0 };
function _y(e, t, i, n, o = 0.15, r = mo, s) {
  if (!e.length) return Eo;
  const a = e.map((C) => St(C.x, C.y, t, i, n)), l = rt(t, i, n), c = a.map((C) => C.x), h = a.map((C) => C.y), d = Math.min(...c), p = Math.max(...c), f = Math.min(...h), m = Math.max(...h), b = Math.max(p - d, m - f) * o, v = Math.max(p - d + b * 2, 1), x = Math.max(m - f + b * 2, 1), $ = Math.max(1, Math.min(r, Math.min(l.w / v, l.h / x))), y = s ?? $;
  if (!Number.isFinite(y)) return Eo;
  const w = (d + p) / 2 / l.w, E = (f + m) / 2 / l.h, I = (C) => Math.min(0, Math.max(100 * (1 - y), C));
  return {
    scale: y,
    txPercent: I(50 - y * w * 100),
    tyPercent: I(50 - y * E * 100)
  };
}
function vy(e) {
  const t = e.zoom;
  if (!(typeof t != "number" || !Number.isFinite(t)))
    return Math.max(1, Math.min(Qa, t));
}
function xy(e, t) {
  if (!Number.isFinite(e) || e <= 1) return 1;
  const i = typeof t == "number" && Number.isFinite(t) && t > 0 ? t : go;
  return 1 / e * i;
}
const Kn = 12, wy = 1.5, $y = 0.4;
function Wl(e) {
  return _`
    <defs>
      <pattern id=${e} width=${Kn} height=${Kn}
               patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line class="fp-dead-space-line" x1="0" y1="0" x2="0" y2=${Kn}
              stroke=${Wo} stroke-width=${wy} />
      </pattern>
    </defs>`;
}
function Gl(e, t) {
  const i = e.map((n) => `${n.x},${n.y}`).join(" ");
  return _`<polygon class="fp-dead-space" points=${i}
                      fill=${`url(#${t})`} fill-rule="nonzero"
                      fill-opacity=${$y} stroke="none" />`;
}
function Kl(e, t) {
  const i = e.points.map((r) => `${r.x},${r.y}`).join(" "), n = t !== void 0 && (e.highlight ?? "fill") !== "border", o = n ? e.activeOpacity ?? e.opacity : e.opacity;
  return _`<polygon class="fp-area" data-id=${be(e.id) ?? g}
                       data-entity=${Je(e.entity) ?? g}
                       points=${i}
                       fill=${n ? t : ve(e.color, Y)}
                       fill-opacity=${H(o, fo)}
                       stroke=${e.type === "balcony" ? ve(e.color, Y) : "none"}
                       stroke-width=${e.type === "balcony" ? 3 : 0}
                       stroke-dasharray=${e.type === "balcony" ? "10 6" : g} />`;
}
function ql(e, t, i) {
  const n = t !== void 0 && (e.highlight ?? "fill") !== "fill", o = n ? t : e.borderColor ? ve(e.borderColor, "none") : void 0;
  if (o === void 0 || o === "none") return g;
  const r = e.points.map((a) => `${a.x},${a.y}`).join(" "), s = H(
    e.borderWidth,
    n ? Q / 2 : Mh
  );
  return !n || i === void 0 ? _`<polygon class="fp-area-border" data-id=${be(e.id) ?? g}
                        data-entity=${Je(e.entity) ?? g}
                        points=${r} fill="none"
                        stroke=${o} stroke-width=${s} />` : _`
    <clipPath id=${i}><polygon points=${r} /></clipPath>
    <polygon class="fp-area-border" data-id=${be(e.id) ?? g}
             data-entity=${Je(e.entity) ?? g}
             points=${r} fill="none" clip-path=${`url(#${i})`}
             stroke=${o} stroke-width=${s * 2} />`;
}
function Ao(e, t, i = je) {
  const n = t ?? e.color ?? Ph, o = jm($n(i, e.type) ?? zm, e.w, e.h, n), r = e.hand === "left" ? " scale(-1 1)" : "";
  return _`<g class=${`fp-furniture fp-furniture-${be(e.type) ?? "unknown"}`}
                data-id=${be(e.id) ?? g}
                data-entity=${Je(e.entity) ?? g}
                transform="translate(${e.x} ${e.y}) rotate(${e.angle ?? 0})${r}">${o}</g>`;
}
function on(e, t, i, n, o, r = 3, s = "fixed") {
  function a(p) {
    return (p % 360 + 360) % 360;
  }
  function l(p, f, m) {
    return Math.max(Math.min(p, m), f);
  }
  const c = K(H(i, bn), s), h = a(H(n, _n)), d = l(H(o, vn), 0, 360);
  return u`
    <div
      class="ripple ${e ? "active" : ""}"
      style="width:${c};height:${c};--fp-ripple-color:${ve(t, Y)};--fp-ripple-direction:${h};--fp-ripple-width:${d}"
    >
      <span class="dot"></span>
      ${Array.from(
    { length: r },
    (p, f) => u`<span class="ring" style="animation-delay:${(f * 0.6).toFixed(2)}s;"></span>`
  )}
    </div>
  `;
}
function rn(e, t) {
  if (!t || !e) return null;
  const i = e[t]?.state;
  if (i == null || i === "unavailable" || i === "unknown") return null;
  const n = Number(i);
  return Number.isFinite(n) ? n : null;
}
function Vl(e, t) {
  const i = e.color ?? Y, n = (e.dotSize ?? Yo) / 2, o = e.x + e.w / 2, r = e.y + e.h / 2, s = e.angle ?? 0, a = _s(e.xSensor, t.xReading), l = _s(e.ySensor, t.yReading), c = a != null, h = l != null, d = t.xPresent === !1 || t.yPresent === !1, p = e.w / 2, f = e.h / 2, m = t.editing ? _`<rect class="tracker-zone ${d ? "presence-gated" : ""}"
                x=${-p} y=${-f} width=${e.w} height=${e.h}
                fill=${i} fill-opacity="0.08" stroke=${i} stroke-width="1.5"
                stroke-dasharray="6 4" rx="4" pointer-events="none" />` : _``;
  let b;
  if (d)
    b = _``;
  else if (c && h) {
    const v = -p + a * e.w, x = -f + l * e.h, $ = `0,${-n} ${n * 0.9},${n * 0.7} ${-n * 0.9},${n * 0.7}`, y = Math.max(n * 3.5, Math.min(e.w, e.h) * 0.45);
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
          <line class="tracker-line-stroke" x1="0" y1=${-f} x2="0" y2=${f}
                stroke=${i} stroke-width="1.5" />
          <line class="tracker-band" x1="0" y1=${-f} x2="0" y2=${f}
                stroke=${i} stroke-width="3" stroke-linecap="round" />
          <line class="tracker-band" x1="0" y1=${-f} x2="0" y2=${f}
                stroke=${i} stroke-width="3" stroke-linecap="round"
                style="animation-delay:0.8s;" />
        </g>`;
    } else {
      const v = -f + l * e.h;
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
       data-id=${be(e.id) ?? g}
       transform="translate(${o} ${r}) rotate(${s})">
      ${m}${b}
    </g>`;
}
function zs(e, t, i, n) {
  let o = null, r = n;
  for (const s of i) {
    const a = s.x2 - s.x1, l = s.y2 - s.y1, c = a * a + l * l;
    if (c === 0) continue;
    let h = ((e - s.x1) * a + (t - s.y1) * l) / c;
    h = Math.max(0, Math.min(1, h));
    const d = s.x1 + h * a, p = s.y1 + h * l, f = Math.hypot(e - d, t - p);
    f < r && (r = f, o = { x: d, y: p, angle: Math.atan2(l, a) * 180 / Math.PI });
  }
  return o;
}
class Tn {
  static currentFloorEntityIds(t, i) {
    const n = t ? Ft(t) : [], o = n.find((s) => s.id === i) ?? n[0];
    if (!o) return [];
    const r = /* @__PURE__ */ new Set();
    for (const s of o.openings)
      s.entity && r.add(s.entity), s.secondaryEntity && r.add(s.secondaryEntity), s.shutterEntity && r.add(s.shutterEntity), s.shutterSecondaryEntity && r.add(s.shutterSecondaryEntity);
    for (const s of o.items) {
      s.entity && r.add(s.entity);
      for (const a of tt(s))
        a.entity && r.add(a.entity);
    }
    for (const s of o.furniture)
      s.entity && r.add(s.entity);
    for (const s of o.areas)
      s.entity && r.add(s.entity);
    for (const s of o.trackers)
      for (const a of [s.xSensor, s.ySensor])
        a?.entity && r.add(a.entity), a?.presence?.entity && r.add(a.presence.entity);
    return Array.from(r).sort();
  }
  static scopeKey(t, i) {
    const n = Tn.currentFloorEntityIds(t, i);
    return n.length ? n.join("|") : "none";
  }
}
function ky(e) {
  const t = Date.now() / 1e3, i = e?.historyReplay?.lookbackSeconds, n = typeof i == "number" && Number.isFinite(i) && i > 0 ? i : 3600;
  return { start: Math.max(0, t - n), end: t };
}
function Ns(e, t) {
  const i = Math.max(0, Math.min(e, t)), n = Math.max(0, Math.max(e, t));
  return {
    start: i,
    end: Math.max(i, n)
  };
}
function Sy(e, t) {
  return Tn.currentFloorEntityIds(e, t);
}
function Ey(e, t) {
  return Tn.scopeKey(e, t);
}
function Ay(e, t, i) {
  const o = Math.max(1, i - t) / 30, r = e?.historyReplay?.defaultSpeed;
  return Math.max(0.25, r ?? o);
}
function Ty(e) {
  const t = Date.parse(e);
  return Number.isNaN(t) ? Date.now() / 1e3 : t / 1e3;
}
function Ds(e) {
  if (!Number.isFinite(e) || e <= 0) return "";
  const t = new Date(e * 1e3), i = t.getFullYear(), n = `${t.getMonth() + 1}`.padStart(2, "0"), o = `${t.getDate()}`.padStart(2, "0"), r = `${t.getHours()}`.padStart(2, "0"), s = `${t.getMinutes()}`.padStart(2, "0");
  return `${i}-${n}-${o}T${r}:${s}`;
}
function Cy(e) {
  const t = Math.min(3, Math.max(-2, e));
  return Number((10 ** t).toPrecision(4));
}
function My(e, t, i) {
  if (!e) return;
  if (i.has(t))
    return i.get(t);
  const n = Ft(e);
  let o;
  for (const r of n) {
    for (const s of r.items ?? [])
      if (s.entity === t)
        return o = s.activeColor ?? s.rippleColor, i.set(t, o), o;
    for (const s of r.openings ?? [])
      if (s.entity === t)
        return o = s.activeColor, i.set(t, o), o;
    for (const s of r.furniture ?? [])
      if (s.entity === t)
        return o = s.activeColor, i.set(t, o), o;
  }
  i.set(t, void 0);
}
function Iy(e, t, i, n, o) {
  if (!t) return gi(e);
  const r = G(My(t, e.entityId, n)), s = Ke(e.entityId, e.newState);
  if (o && r) return s ? r : "#ffffff";
  const a = gi(e);
  return s ? a : "#ffffff";
}
function Py(e, t) {
  if (!Number.isFinite(e)) return "—";
  try {
    return t.format(new Date(e * 1e3));
  } catch {
    return new Date(e * 1e3).toISOString();
  }
}
var Oy = Object.defineProperty, Ly = Object.getOwnPropertyDescriptor, ne = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ly(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Oy(t, i, o), o;
};
function Fy(e) {
  const t = e.state.playbackController, i = e.state, o = i.enabled || i.startTime > 0 ? void 0 : e.getDefaultWindow(), r = o ? o.start : i.startTime, s = o ? o.end : i.endTime, a = e.formatReplayTime(
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
    startInputValue: Ds(r),
    endInputValue: Ds(s),
    onToggleVisible: (l) => e.toggleHistoryVisible(l),
    onRangeChange: (l, c) => {
      e.handleRangeChange(l, { target: { value: c } });
    },
    onZoom: (l) => e.zoomWindow(l),
    onJump: (l) => e.jumpReplay(l),
    onStep: (l) => e.stepReplay(l),
    onPlayToggle: () => t.playing ? e.pauseReplay() : e.playReplay(),
    onToggleSpeedPanel: () => e.toggleSpeedPanel(),
    onSpeedSliderInput: (l) => e.setReplaySpeed(Cy(l)),
    onSpeedChange: (l) => e.setReplaySpeed(l),
    onToggleTimeline: () => e.toggleTimeline(),
    onToggleLog: () => e.toggleLog(),
    onSeek: (l) => e.seekReplay(l)
  };
}
function Ry(e) {
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
let Z = class extends le {
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
    const i = e.timestamp <= this.currentTime, n = (typeof e.color == "string" ? e.color : void 0) ?? (typeof e.attributes?.color == "string" ? e.attributes.color : void 0) ?? gi(e), o = G(n), r = o ? `background:${o}; box-shadow:0 0 0 2px ${o}22;` : g;
    return u`
      <li class="replay-event-item ${i ? "replay-event-passed" : ""} ${t ? "replay-event-current" : ""}" data-timestamp=${e.timestamp}>
        <span class="replay-event-dot" style=${r}></span>
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
            ${this.error ? u`<span class="replay-error">${this.error}</span>` : g}
            ${this.rangeWarning ? u`<span class="replay-loading">${this.rangeWarning}</span>` : g}
            ${!this.ready && this.enabled && !this.error ? u`<span class="replay-loading">Loading history…</span>` : g}
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
            </div>` : g}
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
              >${ze(this.events, (t, i) => `${t.timestamp}-${t.entityId}-${t.newState}-${i}`, (t) => this._renderEventItem(t, e?.timestamp === t.timestamp))}</ul>` : g}
          ${!this.logExpanded && !this.events.length ? u`<div class="replay-empty">No history events yet.</div>` : g}
        </div>
      </div>
    `;
  }
};
Z.styles = fe`
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
ne([
  A({ attribute: !1 })
], Z.prototype, "events", 2);
ne([
  A({ type: Number })
], Z.prototype, "startTime", 2);
ne([
  A({ type: Number })
], Z.prototype, "endTime", 2);
ne([
  A({ type: Number })
], Z.prototype, "currentTime", 2);
ne([
  A({ type: Boolean })
], Z.prototype, "visible", 2);
ne([
  A({ type: Boolean })
], Z.prototype, "enabled", 2);
ne([
  A({ type: Boolean })
], Z.prototype, "ready", 2);
ne([
  A({ type: Boolean })
], Z.prototype, "playing", 2);
ne([
  A({ type: Boolean })
], Z.prototype, "timelineExpanded", 2);
ne([
  A({ type: Boolean })
], Z.prototype, "logExpanded", 2);
ne([
  A({ type: Boolean })
], Z.prototype, "speedExpanded", 2);
ne([
  A({ type: String })
], Z.prototype, "error", 2);
ne([
  A({ type: String })
], Z.prototype, "rangeWarning", 2);
ne([
  A({ type: String })
], Z.prototype, "panelId", 2);
ne([
  A({ type: Number })
], Z.prototype, "replaySpeed", 2);
ne([
  A({ type: String })
], Z.prototype, "currentTimeLabel", 2);
ne([
  A({ type: String })
], Z.prototype, "startInputValue", 2);
ne([
  A({ type: String })
], Z.prototype, "endInputValue", 2);
Z = ne([
  pn("easy-floorplan-replay-panel")
], Z);
const Yl = "--fp-color-", Zl = 24;
function de(e) {
  return typeof e != "string" ? "" : e.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
}
function Xl(e) {
  return Yl + de(e);
}
function Hs(e) {
  return `var(${Xl(e)})`;
}
function vi(e) {
  if (!Array.isArray(e)) return [];
  const t = /* @__PURE__ */ new Set(), i = [];
  for (const n of e) {
    if (!n || typeof n != "object") continue;
    const { name: o, color: r } = n, s = de(o), a = G(r);
    if (!(!s || !a || t.has(s)) && (t.add(s), i.push({ name: o.trim(), color: a }), i.length >= Zl))
      break;
  }
  return i;
}
function Ql(e) {
  return vi(e).map((t) => `${Xl(t.name)}:${t.color};`).join("");
}
function Jl(e) {
  return vi(e).map((t) => `${de(t.name)}=${t.color}`).join(",");
}
const zy = /^[Vv][Aa][Rr]\(\s*--fp-color-([\p{L}\p{N}-]+)\s*(?:,((?:[^()]|\([^()]*\))*))?\)$/u;
function ec(e) {
  return To(e)?.slug;
}
function To(e) {
  if (typeof e != "string") return;
  const t = zy.exec(e.trim());
  if (!t) return;
  const i = t[2]?.trim();
  return { slug: t[1], fallback: i || void 0 };
}
function Ri(e, t) {
  const i = ec(e);
  if (!i) return e;
  const n = vi(t).find((o) => de(o.name) === i);
  return n ? n.color : e;
}
function Us(e, t, i) {
  if (!t) return e;
  const n = (o) => {
    if (typeof o == "string") {
      const r = To(o);
      if (r?.slug !== t) return o;
      const s = To(i);
      return r.fallback && s && !s.fallback ? `var(${Yl}${s.slug}, ${r.fallback})` : i;
    }
    return Array.isArray(o) ? o.map(n) : o && typeof o == "object" ? Object.fromEntries(Object.entries(o).map(([r, s]) => [r, n(s)])) : o;
  };
  return n(e);
}
const Ny = 500, Dy = 250;
class Hy extends HTMLElement {
  constructor() {
    super(...arguments), this.holdTime = Ny, this.held = !1, this.cancelled = !1;
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
    t.actionHandler && Uy(i, t.actionHandler.options) || (t.actionHandler ? (t.removeEventListener("touchstart", t.actionHandler.start), t.removeEventListener("touchend", t.actionHandler.end), t.removeEventListener("touchcancel", t.actionHandler.end), t.removeEventListener("mousedown", t.actionHandler.start), t.removeEventListener("click", t.actionHandler.end), t.removeEventListener("keydown", t.actionHandler.handleKeyDown)) : t.addEventListener("contextmenu", (n) => {
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
      i.hasHold && this.timer && (clearTimeout(this.timer), this.timer = void 0), i.hasHold && this.held ? Ei(o, "hold") : i.hasDoubleClick ? n.type === "click" && n.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, Ei(o, "tap");
      }, Dy) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, Ei(o, "double_tap")) : Ei(o, "tap");
    }, t.actionHandler.handleKeyDown = (n) => {
      ["Enter", " "].includes(n.key) && (n.preventDefault(), n.currentTarget.actionHandler.end(n));
    }, t.addEventListener("touchstart", t.actionHandler.start, { passive: !0 }), t.addEventListener("touchend", t.actionHandler.end), t.addEventListener("touchcancel", t.actionHandler.end), t.addEventListener("mousedown", t.actionHandler.start, { passive: !0 }), t.addEventListener("click", t.actionHandler.end), t.addEventListener("keydown", t.actionHandler.handleKeyDown)));
  }
}
function Uy(e, t) {
  return e.hasHold === t.hasHold && e.hasDoubleClick === t.hasDoubleClick && e.disabled === t.disabled;
}
function Ei(e, t) {
  e.dispatchEvent(
    new CustomEvent("action", { detail: { action: t }, bubbles: !0, composed: !0 })
  );
}
function By() {
  const e = document.body, t = e.querySelector("action-handler-fp-ef");
  if (t) return t;
  const i = document.createElement("action-handler-fp-ef");
  return e.appendChild(i), i;
}
customElements.get("action-handler-fp-ef") || customElements.define("action-handler-fp-ef", Hy);
const jy = (e, t) => {
  By().bind(e, t);
}, xt = un(
  class extends fn {
    update(e, [t]) {
      return jy(e.element, t), Le;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render(e) {
    }
  }
), Re = class Re {
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
    return Number.isFinite(t) ? Math.min(Re._MAX_SPEED, Math.max(Re._MIN_SPEED, t)) : Number.isNaN(t) ? 1 : Re._MAX_SPEED;
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
    Number.isFinite(t) && (this.speed = Math.min(Re._MAX_SPEED, Math.max(Re._MIN_SPEED, t)));
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
Re._MIN_SPEED = 0.01, Re._MAX_SPEED = 1e3;
let sn = Re, Wy = 0;
class Gy {
  constructor(t) {
    this._card = t, this._historyService = new Eh(), this.state = {
      playbackController: new sn(),
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
      panelId: `fp-replay-panel-${Wy++}`
    };
  }
  logReplay(t, i) {
    this._card.getConfig()?.historyReplay?.debug && console.log(t, i ?? {});
  }
  getDefaultWindow() {
    return ky(this._card.getConfig());
  }
  normalizeWindow(t, i) {
    return Ns(t, i);
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
    return Sy(this._card.getConfig(), this._card.getActiveFloorId());
  }
  scopeKey() {
    return Ey(this._card.getConfig(), this._card.getActiveFloorId());
  }
  speedForRange(t, i) {
    return Ay(this._card.getConfig(), t, i);
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
    return Py(t, new Intl.DateTimeFormat(void 0, {
      dateStyle: "short",
      timeStyle: "medium"
    }));
  }
  handleRangeChange(t, i) {
    const n = i.target, o = Ty(n.value);
    t === "start" ? this.state.startTime = o : this.state.endTime = o, this.updateWindow(this.state.startTime, this.state.endTime);
  }
  updateWindow(t, i) {
    const { start: n, end: o } = Ns(t, i), r = o - n;
    this.state.rangeWarning = r < 60 ? "Very small replay window may hide expected transitions." : void 0;
    const s = this.state.playbackController.playing;
    this.state.startTime = n, this.state.endTime = o, this.clearHistoryCache(), this.state.playbackController.pause(), this.stopReplayLoop(), this._card.requestUpdate(), !(!this._card.getHass() || !this.state.historyVisible) && this.startReplay({ preserveCurrentTime: !0, keepPlaying: s });
  }
  resetForFloorChange() {
    this.state.historyEvents = [], this.state.enabled = !1, this.state.ready = !1, this.state.error = void 0, this.state.loadRequested = !1, this.state.loadToken += 1, this.clearHistoryCache(), this.stopReplayLoop(), this._card.requestUpdate(), this._card.getHass() && this.state.historyVisible && this.startReplay({ preserveCurrentTime: !0, keepPlaying: this.state.playbackController.playing });
  }
  zoomWindow(t) {
    const i = Math.max(60, this.state.endTime - this.state.startTime), n = this.state.playbackController.currentTime, o = t > 0 ? Math.max(60, i * 0.8) : i * 1.25, r = o / 2, s = Math.max(0, n - r), a = s + o;
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
    const i = this.state.startTime || this.getDefaultWindow().start, n = this.state.endTime || this.getDefaultWindow().end, { start: o, end: r } = this.normalizeWindow(i, n);
    this.state.startTime = o, this.state.endTime = r, this.state.enabled = !0, this.state.loadRequested = !0, this.state.error = void 0, this.state.ready = !1;
    const s = t.preserveCurrentTime ? Math.min(r, Math.max(o, this.state.playbackController.currentTime)) : o;
    this.state.playbackController = new sn({
      startTime: o,
      endTime: r,
      initialSpeed: this.speedForRange(o, r)
    }), this.state.playbackController.seek(s), t.keepPlaying && this.state.playbackController.play();
    const a = ++this.state.loadToken;
    this.logReplay("[easy-floorplan] Starting replay", { start: o, end: r, lookback: r - o }), await this.loadReplayRange(o, r, a), t.keepPlaying && this.state.enabled && this.state.playbackController.playing && this.startReplayLoop(), this._card.requestUpdate();
  }
  async loadReplayRange(t, i, n) {
    try {
      const o = this.scopeKey();
      if (await this._historyService.loadHistory(t, i, { scopeKey: o, hass: this._card.getHass(), watched: this.watchedEntities(), numericSteps: this._card.getConfig()?.historyReplay?.numericSteps }), n !== this.state.loadToken) return;
      const r = new Set(this.watchedEntities()), s = this._historyService.getEvents();
      this.state.historyEvents = s.filter((a) => r.has(a.entityId)).map((a) => ({
        ...a,
        color: Iy(a, this._card.getConfig(), this._card.getHass(), this.state.configuredColorCache, this.state.configured)
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
var Ky = Object.defineProperty, qy = Object.getOwnPropertyDescriptor, Wt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? qy(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Ky(t, i, o), o;
};
const Bs = /* @__PURE__ */ new Map();
function js(e) {
  return e.map((t) => t.id).join("|");
}
let Se = class extends le {
  constructor() {
    super(...arguments), this._wallMaskId = `fp-wall-mask-${Se._nextWallMaskId++}`, this._glowIdBase = `fp-glow-${Se._nextGlowId++}`, this._watchedEntities = /* @__PURE__ */ new Set(), this._replayController = new Gy({
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
    this._onOrientation(e), this._unsubscribeOrientation = Jg(e, this._onOrientation);
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
      width: e.width ?? Tt,
      height: e.height ?? yi,
      walls: e.walls ?? [],
      openings: e.openings ?? [],
      items: e.items ?? [],
      texts: e.texts ?? [],
      furniture: e.furniture ?? []
    }, this._watchedEntities = ii(this._config), this._syncHistoryServiceContext(), this._replayController.clearConfigColorCache();
    const i = this._replayCacheKey();
    if (i !== this._lastReplayCacheKey && (this._lastReplayCacheKey = i, this._replayController.historyService().clearCache()), this._replayController.syncToConfig(), !this._activeFloorId) {
      const n = Ft(this._config), o = Bs.get(js(n));
      o && n.some((r) => r.id === o) && (this._activeFloorId = o);
    }
  }
  /**
   * HA pushes a fresh `hass` on every state change anywhere in the instance —
   * for most updates nothing on this plan moved. Skip those renders entirely.
   */
  shouldUpdate(e) {
    if (!(e.size === 1 && e.has("hass"))) return !0;
    const t = e.get("hass");
    return !t || !this.hass ? !0 : sl(t, this.hass, this._watchedEntities);
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
    const t = bh(this._config?.skin);
    t ? this.setAttribute("data-skin", t) : this.removeAttribute("data-skin");
  }
  updated(e) {
    super.updated(e), (e.has("hass") || e.has("_activeFloorId")) && this._syncHistoryServiceContext();
  }
  getCardSize() {
    return 6;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Vb), document.createElement("fp-ef-editor");
  }
  static getStubConfig() {
    return Dh();
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
    return Ke(e.entity, t?.states[e.entity]?.state);
  }
  /** How far open an opening should be drawn (0..1), from its entity (or default). */
  _openingAmount(e, t) {
    const i = e.entity ? t?.states[e.entity] : void 0;
    return lt(e, i);
  }
  /** Whether an opening wears its accent: drawn open, or a cover still in transit. */
  _openingActive(e, t) {
    const i = e.entity ? t?.states[e.entity] : void 0;
    return Fi(e, i);
  }
  /**
   * The second leaf's own state for an opening with a sensor on each — a
   * two-panel slider (issue #145) or a hinged double (issue #159).
   * `undefined` — no second sensor, or a shape with only one leaf — leaves both
   * on the first entity, so nothing about a single-sensor opening changes.
   */
  _openingSecond(e, t) {
    if (!e.secondaryEntity || !Qi(e)) return;
    const i = dr(e), n = t?.states[e.secondaryEntity];
    return { amount: lt(i, n), active: Fi(i, n) };
  }
  /** floorplan-panel: states of leaves 3 and 4; a leaf without a sensor follows the first. */
  _openingMore(e, t) {
    const i = Ue(e);
    if (i < 3 || !e.extraEntities?.some(Boolean)) return;
    const n = [];
    for (let o = 2; o < i; o++) {
      const r = e.extraEntities[o - 2];
      if (!r) {
        n.push({ amount: this._openingAmount(e, t), active: this._openingActive(e, t) });
        continue;
      }
      const s = zg(e, o), a = t?.states[r];
      n.push({ amount: lt(s, a), active: Fi(s, a) });
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
    if (!e.shutterSecondaryEntity || Ct(e) !== "swing") return;
    const i = t?.states[e.shutterSecondaryEntity];
    return {
      amount: Ze(i, e.shutterInvert),
      active: Oi(i, e.shutterInvert)
    };
  }
  _itemIcon(e, t) {
    return vo(
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
    this.hass && Xt(this, this.hass, t, il(t, e.detail.action));
  }
  /** What a gesture on this opening would do, if anything. */
  _openingPress(e, t) {
    return hr(e, t, this._featuresOf);
  }
  /**
   * Pressing an opening (issue #74 follow-up). Which entity answers — the
   * window/door or its shutter — is {@link openingActionForGesture}'s call;
   * from here it is the same Lovelace dispatch every device uses.
   */
  _onOpeningAction(e, t) {
    if (!this.hass) return;
    const i = this._openingPress(t, e.detail.action);
    i && Xt(this, this.hass, { entity: i.entity }, i.config);
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
    const r = e.shutterEntity, s = o?.states[r], a = Ze(s, e.shutterInvert) > 0, l = Oi(s, e.shutterInvert), c = Ll(e, s, a, this.hass?.entities?.[r]?.icon), h = G(e.shutterActiveColor ?? e.activeColor) ?? Y, d = ur(e), p = St(d.x, d.y, t.width, t.height, i), f = rt(t.width, t.height, i), m = pr(e, i), b = K(Ji, n), v = `translate(calc(${m.x} * ${b}), calc(${m.y} * ${b}))`, x = K(en, n), $ = o?.states[r]?.attributes?.friendly_name ?? r;
    return u`
      <div
        class="shutter-mark ${l ? "on" : "off"}"
        data-entity=${Je(r) ?? g}
        style="left:${p.x / f.w * 100}%; top:${p.y / f.h * 100}%;
               width:${x};height:${x};
               transform:translate(-50%,-50%) ${v};--fp-active:${h};"
        title="${$} · ${bi(o, r)}"
        role="button"
        tabindex="0"
        @action=${() => {
      this.hass && Xt(this, this.hass, { entity: r }, { action: "more-info" });
    }}
        .actionHandler=${xt({})}
      >
        <ha-icon
          icon=${c}
          style="--mdc-icon-size:${K(tn, n)};"
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
    const r = e.entity, s = o?.states[r], a = this._openingAmount(e, o) > 0, l = this._openingActive(e, o), c = Rl(e, s, a, this.hass?.entities?.[r]?.icon), h = G(e.activeColor) ?? Y, d = zl(e), p = St(d.x, d.y, t.width, t.height, i), f = rt(t.width, t.height, i), m = Nl(e, i), b = K(Ji, n), v = `translate(calc(${m.x} * ${b}), calc(${m.y} * ${b}))`, x = K(en, n), $ = o?.states[r]?.attributes?.friendly_name ?? r;
    return u`
      <div
        class="shutter-mark ${l ? "on" : "off"}"
        data-entity=${Je(r) ?? g}
        style="left:${p.x / f.w * 100}%; top:${p.y / f.h * 100}%;
               width:${x};height:${x};
               transform:translate(-50%,-50%) ${v};--fp-active:${h};"
        title="${$} · ${bi(o, r)}"
        role="button"
        tabindex="0"
        @action=${() => {
      this.hass && Xt(this, this.hass, { entity: r }, { action: "more-info" });
    }}
        .actionHandler=${xt({})}
      >
        <ha-icon
          icon=${c}
          style="--mdc-icon-size:${K(tn, n)};"
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
    this._activeFloorId = t, Bs.set(js(e), t), this._zoomedAreaId = void 0, !(i || !this.hass || !this._config?.historyReplay?.enabled) && this._replayController.resetForFloorChange();
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
    const i = Li(t, e.detail.action);
    if (!i) {
      e.detail.action === "tap" && this._onAreaClick(t);
      return;
    }
    this.hass && Xt(this, this.hass, { entity: i.entity }, i.config);
  }
  _renderBadge(e, t, i) {
    const n = H(e.size, at), o = K(n, t), r = e.entity ? i?.states[e.entity] : void 0, s = xl(e, r?.state, r?.attributes), a = _i(e) === "value" ? El(i, e) : void 0;
    return u`
      <div
        class="badge"
        style="width:${o};height:${o};transform:rotate(${H(e.angle, 0)}deg);"
      >
        ${a ? u`<span
              class="badge-value"
              style="font-size:${K(Cl(n, a), t)};"
              >${a}</span
            >` : u`<ha-icon
              class=${s ? `anim-${s}` : ""}
              icon=${this._itemIcon(e, i)}
              style="--mdc-icon-size:${K(kl(n), t)};"
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
    const r = this._isOn(e, o), s = gl(o, e), a = e.entity ? o?.states[e.entity] : void 0, l = ar(e, a), c = G(kn(e.stateColor, l)), h = bl(e, c), d = !!this.hass && xo(e, a?.state), p = dg(e, a?.state, o), f = _i(e) !== "none", m = e.display ?? "badge", b = ll(a), v = G(e.activeColor) ?? b, x = r || d ? void 0 : G(e.inactiveColor), $ = e.rippleColor ?? c ?? e.activeColor ?? b ?? Y, y = Wa(
      Ri(
        c ?? (r ? v : x),
        this._config?.palette
      )
    ), w = e.rippleSize ?? bn, E = e.rippleDirection ?? _n, I = e.rippleWidth ?? vn, C = p ? "visibility: hidden; pointer-events: none;" : "";
    let B = g;
    m === "ripple" ? B = u`<span style="${C}">
        ${on(r, $, w, E, I, 3, n)}
      </span>` : m === "iconRipple" ? B = u`<div class="stack" style="${C}">
        ${on(r, $, w, E, I, 3, n)}
        ${f ? u`<div class="stack-icon">${this._renderBadge(e, n, o)}</div>` : g}
      </div>` : f && (B = u`<span style="${C}">
        ${this._renderBadge(e, n, o)}
      </span>`);
    const V = St(e.x, e.y, t.width, t.height, i), D = rt(t.width, t.height, i), L = Km(e);
    return u`
      <div
        class="item fp-item ${r ? "on" : "off"} ${d ? "offline" : ""} ${c ? "state-colored" : ""} ${x ? "inactive-colored" : ""} ${L ? "interactive" : ""}"
        data-id=${be(e.id) ?? g}
        data-entity=${Je(e.entity) ?? g}
        data-kind=${be(e.kind) ?? g}
        style="left:${V.x / D.w * 100}%; top:${V.y / D.h * 100}%;${c ? `--fp-state:${c};` : ""}${v ? `--fp-active:${v};` : ""}${x ? `--fp-inactive:${x};` : ""}${y ? `--fp-ink:${y};` : ""}"
        title=${this._label(e, o)}
        role=${L ? "button" : g}
        tabindex=${L ? "0" : g}
        @action=${(T) => this._handleItemAction(T, e)}
        .actionHandler=${xt({
      hasHold: Ve(e.hold_action),
      hasDoubleClick: Ve(e.double_tap_action),
      // Unbinds the gesture listeners outright, so keyboard activation
      // cannot reach an action that would do nothing.
      disabled: !L
    })}
        @pointerdown=${L && Ii(t) === "ripple" ? (T) => this._startInk(T) : g}
      >
        ${B}
        ${L && Ii(t) === "ripple" ? u`<span class="press-ink" aria-hidden="true"></span>` : g}
        ${s ? u`<span
              class="label ${B === g ? "inflow" : ""} label-${rr(e)}"
              style="font-size:${K(yl(e.labelSize), n)};${h ? `color:${h};` : ""}"
              >${s}</span
            >` : g}
      </div>
    `;
  }
  _renderAreaLabel(e, t, i, n) {
    if (!e.name || (e.showName ?? !0) === !1) return g;
    const o = gr(e.points), r = St(o.x, o.y, t.width, t.height, i), s = rt(t.width, t.height, i), a = mg(e.labelSize, n);
    return u`
      <div
        class="area-label"
        style="left:${r.x / s.w * 100}%; top:${r.y / s.h * 100}%;${a}"
      >
        ${e.name}
      </div>
    `;
  }
  _renderText(e, t, i, n) {
    const o = St(e.x, e.y, t.width, t.height, i), r = rt(t.width, t.height, i);
    return u`
      <div
        class="text fp-text"
        data-id=${be(e.id) ?? g}
        style="left:${o.x / r.w * 100}%; top:${o.y / r.h * 100}%;
               font-size:${K(H(e.size, ai), n)};
               color:${ve(e.color, Ka)};
               transform:translate(-50%,-50%) scale(var(--fp-inv-zoom,1)) rotate(${H(e.angle, 0)}deg);"
      >
        ${Jo(this.hass, e)}
      </div>
    `;
  }
  render() {
    if (!this._config) return u`${g}`;
    const e = this._config, t = this._replayController.getRenderState(), i = rh(this.hass, this._watchedEntities, this._replayController.historyService(), t.enabled, t.currentTime), n = Ft(e), o = n.find((y) => y.id === this._activeFloorId) ?? n.find((y) => y.id === e.defaultFloor) ?? n[0], r = Qg(e, this._portrait), s = rt(H(e.width, Tt), H(e.height, yi), r), a = ey(e.width, e.height, r), l = sr(e.overlayScale), c = e.sunDimming ? ty(
      i?.states["sun.sun"]?.attributes?.elevation,
      H(e.sunBrightnessMin, qo),
      H(e.sunBrightnessMax, qi)
    ) : qi, h = e.showDeadSpaces ? ol(o.walls, o.openings) : [], p = e.sunDimming || o.items.some((y) => y.glow) ? nr(
      o.walls,
      o.openings,
      (y) => (
        // Both leaves, and the travel each style actually has (issue #145):
        // asking `entity` alone left a door whose *second* panel was open
        // still blocking light outright. Glass admits it whole regardless
        // of sash — a closed window is not a hole, but light still gets
        // through it. A shutter rolled down overrides that, same as it
        // does for sunlight.
        dl(
          y,
          this._openingAmount(y, i),
          this._openingSecond(y, i)?.amount,
          y.shutterEntity ? Ze(i?.states[y.shutterEntity], y.shutterInvert) : void 0,
          this._openingMore(y, i)?.map((w) => w.amount)
        )
      )
    ) : o.walls, f = `${this._glowIdBase}-sundim`, m = e.sunDimming ? lg(
      o.items,
      i?.states,
      e.width,
      e.height,
      f,
      p
    ) : g, b = o.areas?.find((y) => y.id === this._zoomedAreaId), v = b ? _y(
      b.points,
      e.width,
      e.height,
      r,
      void 0,
      void 0,
      // A room may say how close to go; without one the fit decides,
      // exactly as it always has (issue #222).
      vy(b)
    ) : Eo, x = e.compactHeader === !0, $ = x && !!e.title;
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
        .header=${x ? g : e.title ?? g}
        style=${Ql(e.palette) || g}
      >
        <div class="card-shell ${this._replayController.isHistoryVisible() ? "replay-visible" : ""}">
          ${this._config.historyReplay?.enabled ? this._renderReplayPanel() : g}
          <div
            class="stage press-${Ii(e)} offline-${Sl(e)} ${$ ? "compact-title" : ""}"
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
                   background:${ve(e.background, gn)};"
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
          ${ja(
      `${e.skin ?? ""}|${Jl(e.palette)}`,
      _`<svg viewBox="0 0 ${s.w} ${s.h}" preserveAspectRatio="none">
            <g transform=${a || g}>
            ${o.image ? _`<image href=${o.image} x="0" y="0" width=${e.width} height=${e.height}
                          preserveAspectRatio=${Bl(o.imageFit)}
                          opacity=${o.imageOpacity ?? 1} />` : g}
            ${o.areas?.map((y) => {
        const w = Wg(y);
        return _`<g class="area-tap-target"
                    role=${w ? "button" : g}
                    tabindex=${w ? "0" : g}
                    @action=${(E) => this._onAreaAction(E, y)}
                    .actionHandler=${xt({
          // Only wait out the timers when a gesture can resolve:
          // otherwise every tap on an ordinary room would sit for
          // 500ms before zooming.
          hasHold: Ve(Li(y, "hold")?.config),
          hasDoubleClick: Ve(Li(y, "double_tap")?.config)
        })}>
                  ${Kl(y, As(y, y.entity ? i?.states[y.entity]?.state : void 0))}
                </g>`;
      })}
            <!-- Dead spaces (issue #88): the regions the walls seal off that no
                 door or window reaches, hatched. Above the room fills, so a
                 region someone has also drawn an area over still reads as
                 unreachable; below everything else, because it describes the
                 floor rather than anything standing on it. -->
            ${h.length ? _`${Wl(`${this._wallMaskId}-dead`)}
                    ${h.map(
        (y) => Gl(y, `${this._wallMaskId}-dead`)
      )}` : g}
            <!-- Light pools (issue #6). Above the room fills but below the
                 furniture and walls, so light reads as cast onto the floor
                 rather than painted over the plan. Isolated as one layer: the
                 pools screen-blend with each other (two lamps brighten where
                 they meet) without screening against the plan beneath, which
                 would wash out on a light theme. -->
            ${ul(
        o.furniture,
        e.width,
        e.height,
        `${this._glowIdBase}-mask`,
        _o(e.symbols)
      )}
            <g class="fp-glows"
               mask=${o.furniture.length ? `url(#${this._glowIdBase}-mask)` : g}>
              ${o.items.map((y, w) => {
        if (!y.glow) return g;
        const E = er(y, i?.states[y.entity]);
        return E ? pl(y, E, `${this._glowIdBase}-${w}`, p) : g;
      })}
            </g>
            ${o.furniture.map((y) => {
        const w = Ao(
          y,
          og(y, y.entity ? i?.states[y.entity]?.state : void 0),
          _o(e.symbols)
        ), E = Cg(y, n, o.id);
        if (!E) return w;
        const I = n.find((C) => C.id === E)?.name;
        return _`<g class="fp-furniture-link" role="button" tabindex="0"
                    @action=${() => this._goToFloor(n, E)}
                    .actionHandler=${xt({
          // A staircase has one gesture. Saying so keeps a tap from
          // sitting out the hold and double-tap timers before it
          // does anything.
          hasHold: !1,
          hasDoubleClick: !1
        })}>
                  <!-- An SVG tooltip is a <title> child, not a title=
                       attribute: the attribute does nothing here. -->
                  <title>${I ? `Go to ${I}` : "Go to the next floor"}</title>
                  ${w}
                </g>`;
      })}
            <!-- Sunlight through the openings. Under the walls on purpose:
                 light lands on the floor, and the walls stay crisp lines over
                 it rather than being tinted by the patches they let in. The
                 sun dimming further down is the whole-sky reading and still
                 has the last word — at night there is nothing to let in. -->
            ${e.sunlight ? by(
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
          dir: my(
            e,
            i?.states["sun.sun"]?.attributes?.azimuth
          ),
          strength: ry(
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
          reach: H(e.sunReach, nn) * (En(e) ? 1 : py(i?.states["sun.sun"]?.attributes?.elevation)),
          // The gap each style actually clears, both leaves
          // included — the same reading the lamps get above, and
          // for the same reason (#145): `entity` alone leaves a
          // door whose *second* panel is open reading as shut,
          // and a converging pair reading as twice as clear as it
          // draws. Glazing and shutters are applied on top of
          // this, inside openingSunFraction.
          openAmount: (y) => cl(
            y,
            this._openingAmount(y, i),
            this._openingSecond(y, i)?.amount,
            this._openingMore(y, i)?.map((w) => w.amount)
          ),
          // A shutter that is all the way down stops the light, as
          // one does. Undefined where none is bound, so an opening
          // without a shutter is judged on itself alone.
          shutterOpen: (y) => y.shutterEntity ? Ze(i?.states[y.shutterEntity], y.shutterInvert) : void 0,
          light: e.sunlightColor ?? ko,
          shade: e.sunShade === !1 ? null : e.sunShadeColor ?? So
        }
      ) : g}
            ${jl(o.openings, e.width, e.height, this._wallMaskId)}
            ${o.walls.map(
        (y) => _`
                <g class="fp-wall-neon"><line x1=${y.x1} y1=${y.y1} x2=${y.x2} y2=${y.y2}
                      class="wall fp-wall" data-id=${be(y.id) ?? g}
                      mask=${`url(#${this._wallMaskId})`}
                      style=${_l(y.thickness)} stroke-linecap="round" /></g>`
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
        (y, w) => ql(
          y,
          As(y, y.entity ? i?.states[y.entity]?.state : void 0),
          `${this._wallMaskId}-area-${w}`
        )
      )}
            </g>
            ${ze(
        // Keyed by id: switching floors must create fresh DOM nodes.
        // Unkeyed, Lit morphs floor A's openings into floor B's, and the
        // 0.5s leaf/panel transitions animate the leftover state — a
        // window briefly plays a door swing (issue #50).
        o.openings,
        (y, w) => y.id || w,
        (y) => {
          const w = this._openingAmount(y, i), E = y.shutterEntity ? i?.states[y.shutterEntity] : void 0, I = Dl(y, {
            color: Wo,
            // The closed tone (issue #228). Absent, the moving parts stay
            // the wall colour, which is what a closed opening always was —
            // and that is also what an opening whose contact has dropped
            // out falls back to, so a dead sensor does not draw the same
            // emphatic "shut" as a door that really is (issue #162).
            // Guarded on `hass` for the same reason the device path is:
            // before the first states arrive every opening would read as
            // offline and the closed colour would flash off on load.
            inactive: this.hass && xo(y, y.entity ? i?.states[y.entity]?.state : void 0) ? void 0 : y.inactiveColor,
            open: w > 0,
            amount: w,
            active: this._openingActive(y, i),
            accent: y.activeColor ?? Y,
            // Per-leaf state for a two-sensor biparting slider (issue #145).
            second: this._openingSecond(y, i),
            more: this._openingMore(y, i),
            // External roller shutter layer (issue #74). No entity bound
            // yet → previewed shut, like a static plan.
            shutter: y.shutterEntity ? {
              amount: Ze(E, y.shutterInvert),
              active: Oi(E, y.shutterInvert),
              style: Ct(y),
              // The shutter's own accent, falling back to the
              // opening's and then to the skin's.
              accent: y.shutterActiveColor ?? y.activeColor ?? Y,
              flip: y.shutterFlipV,
              // Per-panel state for a two-contact hinged shutter
              // (issue #159).
              second: this._shutterSecond(y, i)
            } : void 0
          });
          if (!Gg(y, this._featuresOf)) return I;
          const C = y.length / 2, B = Q + 4;
          return _`<g class="fp-opening" role="button" tabindex="0"
                    @action=${(V) => this._onOpeningAction(V, y)}
                    .actionHandler=${xt({
            // Only wait out the hold/double-tap timers when a gesture
            // actually resolves: otherwise every tap on a plain
            // contact sensor would sit for 500ms before answering.
            hasHold: Ve(this._openingPress(y, "hold")?.config),
            hasDoubleClick: Ve(this._openingPress(y, "double_tap")?.config)
          })}>
                  ${I}
                  <rect class="fp-opening-hit" x=${y.x - C} y=${y.y - B / 2}
                        width=${y.length} height=${B}
                        transform="rotate(${y.angle} ${y.x} ${y.y})" />
                </g>`;
        }
      )}
            ${ze(
        o.trackers ?? [],
        (y, w) => y.id || w,
        (y) => Vl(y, {
          editing: !1,
          xReading: rn(i?.states, y.xSensor?.entity),
          yReading: rn(i?.states, y.ySensor?.entity),
          xPresent: Zi(i?.states, y.xSensor?.presence),
          yPresent: Zi(i?.states, y.ySensor?.presence)
        })
      )}
            <!-- Sun dimming (issue #113). Last inside the rotated group, so it
                 covers the whole plan; the device overlay below is HTML and
                 stays at full brightness, keeping icons and state readable at
                 night. pointer-events:none is not optional — this rect spans
                 the canvas, and without it every tappable opening underneath
                 stops responding (the lesson from #108). -->
            ${e.sunDimming ? _`${m}<rect class="fp-sun-dim"
                            x=${-Q} y=${-Q}
                            width=${e.width + Q * 2}
                            height=${e.height + Q * 2}
                            fill="#000"
                            mask=${m === g ? g : `url(#${f})`}
                            opacity=${1 - c} />` : g}
            </g>
          </svg>`
    )}
          <div
            class="items"
            style="--fp-inv-zoom:${xy(v.scale, e.zoomedOverlayScale)};"
          >
            ${o.areas?.map((y) => this._renderAreaLabel(y, e, r, l))}
            ${o.texts.map((y) => this._renderText(y, e, r, l))}
            ${ze(
      // Keyed like the openings above: a floor switch must build fresh
      // nodes rather than morph one floor's badges into another's.
      o.openings.filter((y) => Pl(y)),
      (y, w) => `${y.id || w}-shutter`,
      (y) => this._renderShutterMark(y, e, r, l, i)
    )}
            ${ze(
      o.openings.filter((y) => Fl(y)),
      (y, w) => `${y.id || w}-opening`,
      (y) => this._renderOpeningMark(y, e, r, l, i)
    )}
            ${ze(
      // No entity filter: devices that exist physically but have no HA
      // entity still deserve their badge (issue #39). Keyed by id so a
      // floor switch builds fresh DOM (see the openings comment).
      // "Only when active" devices drop out here (issue #55), and so do
      // the ones that only show inside their own room (#222) — the
      // editor still draws them, dimmed, so they stay editable.
      o.items.filter(
        (y) => !fl(
          y,
          y.entity ? i?.states[y.entity]?.state : void 0
        ) && !cg(y, b)
      ),
      (y, w) => y.id || w,
      (y) => this._renderItem(y, e, r, l, i)
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
              </button>` : g}
          ${$ ? u`<div class="plan-title">${e.title}</div>` : g}
          ${n.length > 1 ? this._renderFloorSwitcher(n, o, x) : g}
        </div>
        </div>
      </ha-card>
    `;
  }
  _renderReplayPanel() {
    return Ry(Fy(this._replayController));
  }
  _renderFloorSwitcher(e, t, i = !1) {
    return u`
      <div class="floor-switcher ${i ? "row" : ""}">
        ${e.map((n) => {
      const o = n.id === t.id ? G(n.color) : void 0;
      return u`
            <button
              class=${n.id === t.id ? "active" : ""}
              title=${n.name}
              style=${o ? `background:${o};border-color:${o};` : g}
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
Se._nextWallMaskId = 0;
Se._nextGlowId = 0;
Se.styles = [
  qa,
  _h,
  fe`
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
      width: ${Yi}px;
      height: ${Yi}px;
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
       replace it — restating scale(${ds}) alone would drop the
       counter-scale along with the translate, and a badge held down at 4x
       zoom would balloon to roughly 4x its resting size instead of shrinking. */
    .press-scale .item.interactive {
      transition: transform ${ps}ms cubic-bezier(0.2, 0.8, 0.3, 1);
    }
    .press-scale .item.interactive:active {
      transform: translate(-50%, -50%) scale(calc(var(--fp-inv-zoom, 1) * ${ds}));
      transition-duration: ${hs}ms;
    }

    /* Flash: drop-shadow rather than a box-shadow or a background, so the halo
       follows whatever the device actually draws — the badge's circle, a bare
       ripple ring, the label — instead of a rectangle around it. */
    .press-flash .item.interactive {
      transition: filter ${ps}ms ease-out;
    }
    .press-flash .item.interactive:active {
      filter: drop-shadow(0 0 5px var(--fp-skin-accent, var(--primary-color, #03a9f4)));
      transition-duration: ${hs}ms;
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
      font-size: ${Vo}px;
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
Wt([
  A({ attribute: !1 })
], Se.prototype, "hass", 2);
Wt([
  k()
], Se.prototype, "_config", 2);
Wt([
  k()
], Se.prototype, "_activeFloorId", 2);
Wt([
  k()
], Se.prototype, "_zoomedAreaId", 2);
Wt([
  k()
], Se.prototype, "_portrait", 2);
Se = Wt([
  pn("fp-ef-card")
], Se);
const Et = 26, Vy = 0.75;
function Yy(e, t, i, n = Vy) {
  const o = e.find((a) => a.id === t);
  if (!o) return;
  const r = [];
  i !== 2 && r.push({ x: o.x1, y: o.y1, which: 1 }), i !== 1 && r.push({ x: o.x2, y: o.y2, which: 2 });
  const s = [];
  for (const a of e)
    if (a.id !== o.id)
      for (const l of [1, 2]) {
        const c = l === 1 ? a.x1 : a.x2, h = l === 1 ? a.y1 : a.y2, d = r.find((p) => Math.hypot(c - p.x, h - p.y) <= n);
        d && s.push({ id: a.id, end: l, which: d.which, x0: c, y0: h });
      }
  return s.length ? s : void 0;
}
function tc(e, t, i, n) {
  let o = null, r = n;
  for (const s of e) {
    const a = Math.hypot(t - s.x, i - s.y);
    a < r && (r = a, o = { x: s.x, y: s.y });
  }
  return o;
}
function ic(e, t, i, n) {
  const o = e.flatMap((r) => [
    { x: r.x1, y: r.y1 },
    { x: r.x2, y: r.y2 }
  ]);
  return tc(o, t, i, n);
}
function Zy(e, t, i, n, o) {
  const r = e.walls.flatMap((a) => [
    { x: a.x1, y: a.y1 },
    { x: a.x2, y: a.y2 }
  ]), s = (e.areas ?? []).flatMap(
    (a) => a.points.filter((l, c) => !(o && o.areaId === a.id && o.vertexIndex === c)).map((l) => ({ x: l.x, y: l.y }))
  );
  return tc([...r, ...s], t, i, n);
}
function Ws(e, t, i) {
  const n = e.areas ?? [];
  for (let o = n.length - 1; o >= 0; o--)
    if (An(n[o].points, t, i)) return n[o];
}
function Xy(e, t) {
  if (t <= 0) return [];
  const i = gr(e);
  if (t === 1) return [i];
  const n = e.map((d) => d.x), o = e.map((d) => d.y), r = Math.min(...n), s = Math.max(...n), a = Math.min(...o), l = Math.max(...o), c = Math.max(s - r, 1), h = Math.max(l - a, 1);
  for (let d = 1; d <= 8; d++) {
    const p = t * d, f = Math.max(1, Math.round(Math.sqrt(p * c / h))), m = Math.max(1, Math.ceil(p / f)), b = c / (f + 1), v = h / (m + 1), x = [];
    for (let $ = 1; $ <= m; $++)
      for (let y = 1; y <= f; y++) {
        const w = r + y * b, E = a + $ * v;
        An(e, w, E) && x.push({ x: w, y: E });
      }
    if (x.length >= t)
      return Array.from(
        { length: t },
        ($, y) => x[Math.floor(y * x.length / t)]
      );
  }
  return Array.from({ length: t }, (d, p) => {
    const f = p / t * Math.PI * 2, m = Math.min(c, h) * 0.15 * (1 + Math.floor(p / 6));
    return { x: i.x + Math.cos(f) * m, y: i.y + Math.sin(f) * m };
  });
}
function Qy(e, t, i, n, o, r, s, a, l = Et) {
  if (s) return { x: r(n), y: r(o) };
  const c = ic(e, n, o, l);
  if (c) return c;
  const h = n - t, d = o - i, p = Math.tan(a * Math.PI / 180);
  return Math.abs(d) <= Math.abs(h) * p ? { x: r(n), y: i } : Math.abs(h) <= Math.abs(d) * p ? { x: t, y: r(o) } : { x: r(n), y: r(o) };
}
function Jy(e, t) {
  const i = Math.min(t.x0, t.x1), n = Math.max(t.x0, t.x1), o = Math.min(t.y0, t.y1), r = Math.max(t.y0, t.y1), s = (l, c) => l >= i && l <= n && c >= o && c <= r, a = [];
  for (const l of e.walls)
    s((l.x1 + l.x2) / 2, (l.y1 + l.y2) / 2) && a.push({ kind: "wall", id: l.id });
  for (const l of e.openings) s(l.x, l.y) && a.push({ kind: "opening", id: l.id });
  for (const l of e.items) s(l.x, l.y) && a.push({ kind: "item", id: l.id });
  for (const l of e.texts) s(l.x, l.y) && a.push({ kind: "text", id: l.id });
  for (const l of e.furniture) s(l.x, l.y) && a.push({ kind: "furniture", id: l.id });
  for (const l of e.trackers ?? [])
    s(l.x + l.w / 2, l.y + l.h / 2) && a.push({ kind: "tracker", id: l.id });
  for (const l of e.areas ?? []) {
    const c = gr(l.points);
    s(c.x, c.y) && a.push({ kind: "area", id: l.id });
  }
  return a;
}
function eb(e, t, i, n) {
  return {
    walls: e.walls.map((o) => {
      const r = n.get(`wall:${o.id}`);
      return r && r.kind === "wall" ? { ...o, x1: r.x1 + t, y1: r.y1 + i, x2: r.x2 + t, y2: r.y2 + i } : o;
    }),
    openings: e.openings.map((o) => {
      const r = n.get(`opening:${o.id}`);
      return r && r.kind === "pt" ? { ...o, x: r.x + t, y: r.y + i } : o;
    }),
    items: e.items.map((o) => {
      const r = n.get(`item:${o.id}`);
      return r && r.kind === "pt" ? { ...o, x: r.x + t, y: r.y + i } : o;
    }),
    texts: e.texts.map((o) => {
      const r = n.get(`text:${o.id}`);
      return r && r.kind === "pt" ? { ...o, x: r.x + t, y: r.y + i } : o;
    }),
    furniture: e.furniture.map((o) => {
      const r = n.get(`furniture:${o.id}`);
      return r && r.kind === "pt" ? { ...o, x: r.x + t, y: r.y + i } : o;
    }),
    trackers: (e.trackers ?? []).map((o) => {
      const r = n.get(`tracker:${o.id}`);
      return r && r.kind === "pt" ? { ...o, x: r.x + t, y: r.y + i } : o;
    }),
    areas: (e.areas ?? []).map((o) => {
      const r = n.get(`area:${o.id}`);
      return r && r.kind === "polygon" ? { ...o, points: r.points.map((s) => ({ x: s.x + t, y: s.y + i })) } : o;
    })
  };
}
const tb = [
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
], Jt = {
  wall: 11,
  /** Padding around an item badge / text box so small glyphs stay grabbable. */
  pad: 4
};
function Ai(e, t, i, n, o) {
  const r = -(o || 0) * Math.PI / 180, s = e - i, a = t - n;
  return { x: s * Math.cos(r) - a * Math.sin(r), y: s * Math.sin(r) + a * Math.cos(r) };
}
function ib(e, t, i) {
  const n = i.x2 - i.x1, o = i.y2 - i.y1, r = n * n + o * o;
  if (r === 0) return Math.hypot(e - i.x1, t - i.y1);
  let s = ((e - i.x1) * n + (t - i.y1) * o) / r;
  return s = Math.max(0, Math.min(1, s)), Math.hypot(e - (i.x1 + s * n), t - (i.y1 + s * o));
}
function nb(e, t, i, n) {
  const o = [], r = (s, a, l, c) => o.push({ sel: { kind: s, id: a }, rank: tb.indexOf(s), order: l, locked: !!c });
  return e.items.forEach((s, a) => {
    const l = (s.size ?? n.itemSize) / 2 + Jt.pad;
    Math.abs(t - s.x) <= l && Math.abs(i - s.y) <= l && r("item", s.id, a, s.locked);
  }), e.texts.forEach((s, a) => {
    const l = s.size ?? n.textSize, c = l * 0.6 * Math.max(1, Jo(n.hass, s).length) / 2 + Jt.pad, h = l / 2 + Jt.pad, d = Ai(t, i, s.x, s.y, s.angle ?? 0);
    Math.abs(d.x) <= c && Math.abs(d.y) <= h && r("text", s.id, a, s.locked);
  }), e.openings.forEach((s, a) => {
    const l = Ai(t, i, s.x, s.y, s.angle ?? 0);
    Math.abs(l.x) <= s.length / 2 && Math.abs(l.y) <= n.wallThickness / 2 + Jt.pad && r("opening", s.id, a, s.locked);
  }), e.furniture.forEach((s, a) => {
    const l = Ai(t, i, s.x, s.y, s.angle ?? 0);
    Math.abs(l.x) <= s.w / 2 && Math.abs(l.y) <= s.h / 2 && r("furniture", s.id, a, s.locked);
  }), e.walls.forEach((s, a) => {
    ib(t, i, s) <= Jt.wall && r("wall", s.id, a, s.locked);
  }), (e.trackers ?? []).forEach((s, a) => {
    const l = Ai(t, i, s.x + s.w / 2, s.y + s.h / 2, s.angle ?? 0);
    Math.abs(l.x) <= s.w / 2 && Math.abs(l.y) <= s.h / 2 && r("tracker", s.id, a, s.locked);
  }), (e.areas ?? []).forEach((s, a) => {
    An(s.points, t, i) && r("area", s.id, a, s.locked);
  }), o.sort((s, a) => Number(s.locked) - Number(a.locked) || s.rank - a.rank || a.order - s.order).map((s) => s.sel);
}
function nc(e, t) {
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
function ei(e, t) {
  return !!nc(e, t)?.locked;
}
function ob(e, t) {
  return t.filter((i) => {
    const n = nc(e, i);
    return !!n && !n.locked;
  });
}
function rb(e, t, i) {
  if (!e.length) return null;
  if (!i || t.length !== 1) return e[0];
  const n = e.findIndex((o) => o.kind === t[0].kind && o.id === t[0].id);
  return n < 0 ? e[0] : e[(n + 1) % e.length];
}
const sb = {
  request: (e) => requestAnimationFrame(e),
  cancel: (e) => cancelAnimationFrame(e)
};
class ab {
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
const Gs = "Apply needs Home Assistant's card editor — use Save instead.", lb = "Save this card once first — it isn't on the dashboard yet.", cb = 200;
function db(e) {
  let t = e;
  for (let i = 0; t && i < cb; i++) {
    const n = t;
    if (typeof n._params?.saveCardConfig == "function") return n;
    t = t.parentNode ?? t.host ?? null;
  }
  return null;
}
async function hb(e) {
  const t = db(e);
  if (!t) return { ok: !1, error: Gs };
  if (t._params?.isNew) return { ok: !1, error: lb };
  const i = t._cardConfig;
  if (!i || typeof i != "object")
    return { ok: !1, error: Gs };
  try {
    await t._params.saveCardConfig(i);
  } catch (n) {
    return { ok: !1, error: `Could not save — ${n instanceof Error ? n.message : String(n)}` };
  }
  return typeof t._markDirtyStateClean == "function" ? t._markDirtyStateClean() : typeof t._dirty == "boolean" && (t._dirty = !1), { ok: !0 };
}
var pb = Object.defineProperty, ub = Object.getOwnPropertyDescriptor, yr = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? ub(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && pb(t, i, o), o;
};
let xi = class extends le {
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
    const i = this.area.points, n = i && oi(i);
    !i || !n || !(e >= 1) || !(t >= 1) || this._patch({
      points: i.map((o) => ({ x: o.x === n.x ? n.x : n.x + e, y: o.y === n.y ? n.y : n.y + t }))
    });
  }
  render() {
    const e = this.area, t = e.points && oi(e.points), i = this._list;
    return u`
      <label class="field">
        <span>Type</span>
        <select @change=${(n) => this._patch({ type: n.target.value })}>
          ${$a.map(([n, o]) => u`<option value=${n} ?selected=${(e.type ?? "room") === n}>${o}</option>`)}
        </select>
      </label>
      ${e.type === "custom" ? u`<label class="field">
            <span>Label</span>
            <input
              type="text"
              .value=${e.typeLabel ?? ""}
              @change=${(n) => this._patch({ typeLabel: n.target.value.trim() || void 0 })}
            />
          </label>` : g}
      ${t ? u`<div class="dims">
            <label class="field"><span>Width</span>
              <input type="number" min="1" .value=${String(Math.round(t.w))}
                @change=${(n) => this._resize(Number(n.target.value), t.h)} /></label>
            <label class="field"><span>Height</span>
              <input type="number" min="1" .value=${String(Math.round(t.h))}
                @change=${(n) => this._resize(t.w, Number(n.target.value))} /></label>
          </div>` : g}
      <h4>Sidebar</h4>
      <p class="muted">Only what is listed here appears when the room is tapped: devices, scenes and scripts.</p>
      ${i.map(
      (n, o) => u`<div class="row">
          <ha-icon .icon=${Ae(this.hass, n.entity, n.icon)}></ha-icon>
          <div class="main">
            <input
              type="text"
              .value=${n.name ?? ""}
              placeholder=${fi(this.hass, n.entity)}
              @change=${(r) => this._rename(o, r.target.value.trim())}
            />
            <small>${n.entity} · ${{ device: "device", scene: "scene", script: "script" }[Hi(n.entity)]}${this.hass.states[n.entity] ? "" : " · not found"}</small>
          </div>
          <button title="Up" ?disabled=${o === 0} @click=${() => this._move(o, -1)}><ha-icon icon="mdi:chevron-up"></ha-icon></button>
          <button title="Down" ?disabled=${o === i.length - 1} @click=${() => this._move(o, 1)}><ha-icon icon="mdi:chevron-down"></ha-icon></button>
          <button title="Remove" @click=${() => this._setSidebar(i.filter((r, s) => s !== o))}><ha-icon icon="mdi:close"></ha-icon></button>
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
xi.styles = fe`
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
yr([
  A({ attribute: !1 })
], xi.prototype, "hass", 2);
yr([
  A({ attribute: !1 })
], xi.prototype, "area", 2);
xi = yr([
  Ge("fp-ef-area-extras")
], xi);
function Ks(e) {
  return "text" in e.selector || "number" in e.selector;
}
function fb(e, t, i) {
  const n = {};
  for (const o of i)
    t[o.name] !== e[o.name] && (n[o.name] = t[o.name]);
  return n;
}
function qs(e, t) {
  const i = {};
  for (const n of t) {
    if (!(n.name in e)) continue;
    let o = e[n.name];
    if ("text" in n.selector || "icon" in n.selector || "entity" in n.selector || "attribute" in n.selector)
      (o === "" || o == null) && (o = n.required ? "" : void 0);
    else if ("number" in n.selector) {
      const r = typeof o == "string" && o !== "" ? Number(o) : o;
      if (typeof r != "number" || !Number.isFinite(r)) {
        if (n.required) continue;
        o = void 0;
      } else {
        const s = n.selector.number;
        let a = n.name === "angle" ? (r % 360 + 360) % 360 : r;
        s.min !== void 0 && a < s.min && (a = s.min), s.max !== void 0 && a > s.max && (a = s.max), o = a;
      }
    } else "boolean" in n.selector && (o = !!o);
    i[n.name] = o;
  }
  return i;
}
const mt = (e) => e, Ti = ["binary_sensor", "cover", "lock"];
function Pe(e, t) {
  return { fields: t.map((n) => e.fields.find((o) => o.name === n)).filter((n) => !!n), data: e.data, toPatch: e.toPatch };
}
const wi = () => ({
  name: "angle",
  label: "Angle",
  selector: { number: { min: 0, max: 360, step: 1, mode: "slider", unit_of_measurement: "°" } }
}), S = (e, t) => ({ value: e, label: t }), W = (...e) => ({
  select: { mode: "dropdown", options: e }
});
function oc(e = je) {
  return Nm(e);
}
function mb(e, t = je) {
  return $n(t, e)?.name ?? e;
}
function gb(e, t = () => 0) {
  const i = te(e), n = Sn(e), o = Qi(e), r = [
    { name: "type", label: "Type", selector: W(S("door", "Door"), S("window", "Window")) },
    {
      name: "motion",
      label: "Motion",
      selector: W(
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
    const s = e.type === "door";
    r.push({
      name: "sash",
      label: s ? "Leaves" : "Sashes",
      helper: s ? "Double = two leaves meeting in the middle, hinged at each jamb. Three or four: equal leaves side by side" : "Single = one full-width sash (issue #73). Three or four: equal sashes side by side",
      selector: s ? W(
        S("single", "Single (one leaf)"),
        S("double", "Double (two leaves)"),
        S("triple", "Triple (three leaves)"),
        S("quad", "Quad (four leaves)")
      ) : W(
        S("double", "Double (two leaves)"),
        S("single", "Single sash"),
        S("triple", "Triple (three sashes)"),
        S("quad", "Quad (four sashes)")
      )
    });
  }
  if (i === "swing" && ci(e) === "single" && r.push({
    name: "sashSpan",
    label: e.type === "door" ? "Leaf width" : "Sash width",
    helper: e.type === "door" ? "Share of the opening that actually swings — the rest is a fixed panel" : "Share of the opening that actually opens — the rest is fixed glass",
    selector: { number: { min: rl, max: 1, step: 0.05, mode: "slider" } }
  }), e.type === "door" && r.push({
    name: "glazed",
    label: "Glazed",
    helper: "Lets sunlight through even when shut — a patio or French door",
    selector: { boolean: {} }
  }), r.push({
    name: "sunlight",
    label: "Lets sunlight in",
    helper: "Off makes it wall to the sun — for a solid door the plan draws open",
    selector: { boolean: {} }
  }), i === "swing" && ci(e) === "single" && r.push({
    name: "hinge",
    label: "Hinge",
    selector: W(S("left", "Left"), S("right", "Right"))
  }), i === "swing") {
    const s = Ue(e);
    for (let a = 0; s > 1 && a < s; a++)
      r.push({
        name: `leafHinge${a + 1}`,
        label: `Hinge leaf ${a + 1}`,
        selector: W(S("", "Default"), S("left", "Left"), S("right", "Right"))
      });
  }
  if (i === "swing" && r.push({
    name: "opens",
    label: "Opens",
    selector: W(S("this", "This side"), S("other", "Other side"))
  }), i === "slide" && (o || r.push({
    name: "slide",
    label: "Slide",
    selector: W(S("left", "To left"), S("right", "To right"))
  }), r.push({
    name: "style",
    label: "Style",
    selector: W(
      S("single", "Single"),
      S("bypass", "Bypass (stack)"),
      S("biparting", "Biparting (into the walls)"),
      S("biparting-bypass", "Biparting (over fixed panels)"),
      S("converging", "Converging (both panels stack in the middle)")
    )
  })), r.push({
    name: "entity",
    label: "Entity",
    // Says locks are usable, because nothing else would: a lock is neither a
    // contact nor a cover, and its states are `locked` / `unlocked` rather
    // than anything that looks like open/closed (issue #176).
    helper: o ? "Contact, cover or lock. Drives the first leaf; type and motion follow its device class" : "Contact, cover or lock — a lock reads unlocked as open. Type and motion follow its device class",
    selector: { entity: { filter: [{ domain: Ti }] } }
  }), o && e.entity && r.push({
    name: "secondaryEntity",
    label: "Second leaf",
    helper: "Its own sensor for the other leaf — leave empty to move both together",
    selector: { entity: { filter: [{ domain: Ti }] } }
  }), i === "swing" && e.entity) {
    const s = Ue(e);
    s >= 3 && r.push({
      name: "leaf3Entity",
      label: "Third leaf",
      helper: "Its own sensor — leave empty to follow the first leaf",
      selector: { entity: { filter: [{ domain: Ti }] } }
    }), s >= 4 && r.push({
      name: "leaf4Entity",
      label: "Fourth leaf",
      helper: "Its own sensor — leave empty to follow the first leaf",
      selector: { entity: { filter: [{ domain: Ti }] } }
    });
  }
  return r.push({
    name: "shutterEntity",
    label: "Shutter",
    helper: "External shutter over this opening — a cover, or a contact sensor",
    selector: { entity: { filter: [{ domain: ["cover", "binary_sensor"] }] } }
  }), e.shutterEntity && (r.push({
    name: "shutterStyle",
    label: "Shutter type",
    helper: "Hinged panels fold back against the wall; roll-up slats disappear upward",
    selector: W(S("swing", "Hinged (louvered panels)"), S("roll", "Roll-up (slats)"))
  }), Ct(e) === "swing" && r.push({
    name: "shutterSide",
    label: "Shutter side",
    helper: "Which side of the wall the panels hang on",
    selector: W(S("far", "Away from the sash"), S("near", "Same side as the sash"))
  }), Ct(e) === "swing" && r.push({
    name: "shutterSecondaryEntity",
    label: "Second shutter panel",
    helper: "Its own contact for the other panel — leave empty to fold both together",
    selector: { entity: { filter: [{ domain: ["binary_sensor", "cover"] }] } }
  }), r.push({
    name: "shutterInvert",
    label: "Invert shutter animation",
    selector: { boolean: {} }
  })), r.push({
    name: "invert",
    label: e.type === "door" ? "Invert door animation" : "Invert window animation",
    helper: e.entity ? void 0 : (
      // Only a swing door draws open with no sensor to ask
      // (openingDefaultOpen) — everything else, door or window, draws shut.
      e.type === "door" && te(e) === "swing" ? "No sensor bound — draws shut instead of open" : "No sensor bound — draws open instead of shut"
    ),
    selector: { boolean: {} }
  }), r.push(wi()), e.entity && (r.push({
    name: "showIcon",
    label: "Show icon",
    helper: te(e) === "roll" ? "A raised roll-up leaves only a line — this puts its state beside it, and opens its dialog when tapped" : "Shows this opening's state beside it, and opens its dialog when tapped",
    selector: { boolean: {} }
  }), e.showIcon && r.push({
    name: "icon",
    label: "Icon",
    helper: "Overrides the entity's own icon, which changes with its state",
    selector: { icon: {} }
  })), e.entity && e.shutterEntity && (r.push({
    name: "showShutterIcon",
    label: "Shutter icon",
    helper: "Shows the shutter's state beside the opening, and opens it when tapped",
    selector: { boolean: {} }
  }), (e.showShutterIcon ?? !0) && r.push({
    name: "shutterIcon",
    label: "Icon",
    helper: "Overrides the shutter entity's own icon, which changes with its state",
    selector: { icon: {} }
  }), r.push({
    name: "tapTarget",
    label: "Tap opens",
    helper: "The other one moves to press-and-hold. Opens the dialog; use Tap action below to move the shutter itself",
    selector: W(
      S("opening", e.type === "door" ? "The door" : "The window"),
      S("shutter", "The shutter")
    )
  })), (e.entity || e.shutterEntity) && r.push(
    {
      name: "tap_action",
      label: "Tap action",
      selector: {
        ui_action: {
          default_action: hr(e, "tap", t)?.config.action ?? "none"
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
    fields: r,
    data: {
      type: e.type,
      motion: i,
      length: e.length,
      hinge: e.flipH ? "right" : "left",
      opens: e.flipV ? "other" : "this",
      slide: e.flipH ? "right" : "left",
      style: n,
      sash: ci(e),
      entity: e.entity ?? "",
      secondaryEntity: e.secondaryEntity ?? "",
      leafHinge1: e.leafHinges?.[0] ?? "",
      leafHinge2: e.leafHinges?.[1] ?? "",
      leafHinge3: e.leafHinges?.[2] ?? "",
      leafHinge4: e.leafHinges?.[3] ?? "",
      leaf3Entity: e.extraEntities?.[0] ?? "",
      leaf4Entity: e.extraEntities?.[1] ?? "",
      glazed: mr(e),
      sunlight: e.sunlight ?? !0,
      shutterEntity: e.shutterEntity ?? "",
      shutterSecondaryEntity: e.shutterSecondaryEntity ?? "",
      shutterStyle: Ct(e),
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
    toPatch(s) {
      const a = {};
      for (const [l, c] of Object.entries(s))
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
          a.motion = h, c !== "slide" && (a.sliderStyle = void 0), c !== "swing" && (a.sashSpan = void 0), c !== "swing" && (a.extraEntities = void 0), c !== "swing" && (a.leafHinges = void 0), Qi({
            ...e,
            motion: h,
            sliderStyle: c === "slide" ? e.sliderStyle : void 0
          }) || (a.secondaryEntity = void 0);
        } else if (l === "sashSpan")
          a.sashSpan = typeof c == "number" && c < 1 ? c : void 0;
        else if (l === "sash") {
          a.sash = c === wo(e.type) ? void 0 : c;
          const h = Ue({ ...e, sash: c, motion: "swing" });
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
        } else l === "shutterStyle" ? (a.shutterStyle = c, c !== "swing" && (a.shutterSecondaryEntity = void 0)) : l === "hinge" || l === "slide" ? a.flipH = c === "right" || void 0 : l === "opens" ? a.flipV = c === "other" || void 0 : l === "style" ? (a.sliderStyle = c === "single" ? void 0 : c, Ml(c) || (a.secondaryEntity = void 0)) : l === "invert" ? a.invert = c || void 0 : a[l] = c;
      return a;
    }
  };
}
function br(e, t) {
  return e?.entities.length ? { entity: { include_entities: t && !e.entities.includes(t) ? [...e.entities, t] : e.entities } } : { entity: {} };
}
function _r(e, t) {
  if (!e?.entities.length) return t;
  const n = `Only entities in ${e.name ? `the ${e.name} area` : "this area"} — turn off “Filter entities” on the area to see all`;
  return t ? `${t}. ${n}` : n;
}
function zi(e) {
  if ((e.display ?? "badge") === "ripple") return "none";
  const t = _i(e);
  if (t !== "icon") return t;
  const i = e.iconAnimation ?? "auto";
  return i === "spin" || i === "pulse" ? i : i === "auto" ? vl(e.entity) ?? "icon" : "icon";
}
function vr(e) {
  return (e.display ?? "badge") !== "badge";
}
function rc(e, t) {
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
function yb(e, t) {
  return {
    fields: [
      {
        name: "entity",
        label: "Entity",
        required: !0,
        helper: _r(t),
        selector: br(t, e.entity)
      },
      {
        name: "attribute",
        label: "Attribute",
        helper: "Show this attribute instead of the state (e.g. current_temperature)",
        selector: { attribute: { entity_id: e.entity } }
      }
    ],
    data: { entity: e.entity ?? "", attribute: e.attribute ?? "" },
    toPatch: mt
  };
}
function bb(e) {
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
    toPatch: mt
  };
}
function _b(e) {
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
    toPatch: mt
  };
}
function vb(e) {
  const t = [
    {
      name: "labelPosition",
      label: "Label position",
      helper: "Beside the badge instead of under it — a long reading then grows one way only",
      selector: W(S("below", "Below"), S("left", "Left"), S("right", "Right"))
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
      labelPosition: rr(e),
      labelSize: e.labelSize ?? ml,
      disableLabelColor: e.disableLabelColor ?? !1,
      useCustomLabelColor: e.useCustomLabelColor ?? !1,
      labelCustomColor: e.labelCustomColor ?? ""
    },
    toPatch: (i) => {
      const n = { ...i }, o = n.disableLabelColor ?? e.disableLabelColor ?? !1, r = n.useCustomLabelColor ?? e.useCustomLabelColor ?? !1;
      return n.labelPosition === "below" && (n.labelPosition = void 0), n.disableLabelColor === !1 && (n.disableLabelColor = void 0), n.useCustomLabelColor === !1 && (n.useCustomLabelColor = void 0), o ? r || (n.labelCustomColor = void 0) : (n.useCustomLabelColor = void 0, n.labelCustomColor = void 0), n.labelCustomColor === "" && (n.labelCustomColor = void 0), n;
    }
  };
}
function xb(e, t) {
  const i = [
    {
      name: "badgeMode",
      label: "Badge shows",
      helper: "Animations play only while the entity is active. Value puts the reading in the badge, falling back to the icon when there is no number",
      selector: W(
        S("icon", "Icon, still"),
        S("spin", "Icon, spinning"),
        S("pulse", "Icon, pulsing"),
        S("value", "Value"),
        S("none", "Nothing")
      )
    }
  ], n = tt(e);
  return zi(e) === "value" && n.length && i.push({
    name: "badgeEntity",
    label: "Badge reads",
    helper: "Which of this device's readings the badge shows",
    selector: W(
      S("primary", t?.primaryLabel || e.entity || "Main entity"),
      ...n.map(
        (o, r) => S(
          String(r),
          t?.readingLabels?.[r] || o.entity || (o.attribute ? `${e.entity || "this device"} · ${o.attribute}` : `Reading ${r + 1}`)
        )
      )
    )
  }), i.push(
    {
      name: "size",
      label: "Size",
      selector: { number: { min: 16, max: 160, step: 2, mode: "slider", unit_of_measurement: "px" } }
    },
    wi()
  ), {
    fields: i,
    data: {
      badgeMode: zi(e),
      // The dropdown's values are strings, so the stored index (or the legacy
      // "secondary") is spelled the same way here; toPatch turns it back into
      // a number. Opens on what the badge is *actually* reading when nothing
      // is chosen, which is the whole point of badgeSource (issue #136).
      badgeEntity: String(Al(e.badgeEntity) ?? t?.source ?? "primary"),
      size: e.size ?? at,
      angle: e.angle ?? 0
    },
    // "Badge shows" is the editor's spelling of three config keys (issue
    // #127) — expand it back, carrying the ripple state off the item since
    // that control lives in another group now.
    toPatch: (o) => {
      let r = o;
      if ("badgeEntity" in r && typeof r.badgeEntity == "string" && r.badgeEntity !== "primary" && (r = { ...r, badgeEntity: Number(r.badgeEntity) }), !("badgeMode" in r)) return r;
      const { badgeMode: s, ...a } = r;
      return {
        ...a,
        ...rc(s ?? zi(e), vr(e))
      };
    }
  };
}
function wb(e, t) {
  const i = vr(e), n = wl(e.entity, t), o = e.kind === "light" || e.entity?.startsWith("light.");
  if (!n && !o) return;
  const r = [];
  return n && (r.push({
    name: "ripple",
    label: "Ripple",
    // "Detected" rather than "the sensor is on": this is offered to a
    // device_tracker and a person too, and neither of those is a sensor.
    // It stays vague about *what* is detected because a vibration sensor
    // rings for a knock, not for presence (issue #202).
    helper: "Draws a pulsing ring while this device detects something",
    selector: { boolean: {} }
  }), i && (r.push({
    name: "rippleSize",
    label: "Ripple size",
    selector: {
      number: { min: 40, max: 400, step: 4, mode: "slider", unit_of_measurement: "px" }
    }
  }), r.push({
    name: "rippleDirection",
    label: "Ripple direction",
    selector: {
      number: { min: 0, max: 360, step: 1, mode: "slider", unit_of_measurement: "°" }
    }
  }), r.push({
    name: "rippleWidth",
    label: "Ripple width",
    selector: {
      number: { min: 0, max: 360, step: 1, mode: "slider", unit_of_measurement: "°" }
    }
  }))), o && (r.push({
    name: "glow",
    label: "Cast light",
    helper: "Pools the light's own color onto the plan; overlapping lights mix",
    selector: { boolean: {} }
  }), e.glow && r.push(
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
    fields: r,
    data: {
      ripple: i,
      rippleSize: e.rippleSize ?? bn,
      rippleDirection: e.rippleDirection ?? _n,
      rippleWidth: e.rippleWidth ?? vn,
      glow: e.glow ?? !1,
      glowRadius: e.glowRadius ?? yn,
      glowColor: e.glowColor ?? ""
    },
    // "Ripple" is the other half of #127's three-key spelling — same expansion
    // as the badge group's, with the badge mode read off the item.
    toPatch: (s) => {
      if (!("ripple" in s)) return s;
      const { ripple: a, ...l } = s;
      return { ...l, ...rc(zi(e), !!a) };
    }
  };
}
function $b(e) {
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
function kb(e) {
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
        selector: { ui_action: { default_action: tl(e.entity).action } }
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
    toPatch: mt
  };
}
function Sb(e, t) {
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
      helper: _r(t, "Shows this entity's value, formatted as HA formats it"),
      selector: br(t, e.entity)
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
    wi()
  ), {
    fields: i,
    data: {
      text: e.text ?? "",
      entity: e.entity ?? "",
      attribute: e.attribute ?? "",
      size: e.size ?? ai,
      angle: e.angle ?? 0
    },
    toPatch: (n) => "entity" in n && !n.entity ? { ...n, attribute: void 0 } : n
  };
}
function Eb(e, t, i = je) {
  const n = oc(i);
  return {
    fields: [
      {
        name: "type",
        label: "Type",
        selector: { select: { mode: "dropdown", options: n.some((r) => r.id === e.type) ? n.map((r) => ({ value: r.id, label: r.name })) : [{ value: e.type, label: `${e.type} (missing)` }, ...n.map((r) => ({ value: r.id, label: r.name }))] } }
      },
      // L-shaped sectional only (#40): which side the chaise extends on,
      // facing the sofa from the front. Conditional, in the same shape
      // openingForm uses for its hinge / slide fields.
      ...e.type === "sectional" ? [
        {
          name: "hand",
          label: "Chaise side",
          helper: "Facing the sofa from the front",
          selector: W(S("right", "right"), S("left", "left"))
        }
      ] : [],
      { name: "w", label: "Width", required: !0, selector: { number: { min: 10, mode: "box" } } },
      { name: "h", label: "Height", required: !0, selector: { number: { min: 10, mode: "box" } } },
      wi(),
      // Optional entity that makes the drawing live (issue #82) — a soil
      // sensor on a plant, a contact sensor on a cabinet. Last, because most
      // furniture is decoration and never binds anything.
      {
        name: "entity",
        label: "Entity",
        helper: _r(t, "Optional — lets the drawing change color with a sensor"),
        selector: br(t, e.entity)
      },
      // Clicking it changes floor (issue #121). Offered on any piece rather
      // than only on the built-in `stairs`, because a plan can draw its own
      // staircase and a rule keyed on one symbol id would leave those out.
      // Empty on everything by default, so it is a row and not a nag.
      {
        name: "goToFloor",
        label: "Go to floor",
        helper: "Clicking this piece changes floor — for a staircase",
        selector: W(S("", "Nothing"), S("up", "Up one floor"), S("down", "Down one floor"))
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
    toPatch: (r) => "goToFloor" in r && !r.goToFloor ? { ...r, goToFloor: void 0 } : r
  };
}
function Ab(e) {
  return {
    fields: [
      { name: "w", label: "Width", required: !0, selector: { number: { min: 10, mode: "box" } } },
      { name: "h", label: "Height", required: !0, selector: { number: { min: 10, mode: "box" } } },
      { name: "x", label: "X", required: !0, selector: { number: { mode: "box" } } },
      { name: "y", label: "Y", required: !0, selector: { number: { mode: "box" } } },
      wi(),
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
      dotSize: e.dotSize ?? Yo
    },
    toPatch: mt
  };
}
function Tb(e, t = []) {
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
    toPatch: mt
  };
}
function Cb(e) {
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
                max: Qa,
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
          selector: W(
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
      labelSize: e.labelSize ?? Vo,
      opacity: e.opacity ?? fo,
      entity: e.entity ?? "",
      activeOpacity: e.activeOpacity ?? e.opacity ?? fo,
      highlight: e.highlight ?? "fill",
      // "Fit" is the absence of a number, so it gets its own boolean; the
      // slider only appears once that is off, and then always shows a real
      // stored value.
      fitZoom: e.zoom === void 0,
      zoom: e.zoom ?? mo,
      tap_action: e.tap_action,
      hold_action: e.hold_action,
      double_tap_action: e.double_tap_action
    },
    toPatch: (t) => {
      let i = t;
      if ("highlight" in i && i.highlight === "fill" && (i = { ...i, highlight: void 0 }), "fitZoom" in i) {
        const { fitZoom: n, ...o } = i;
        i = { ...o, zoom: n ? void 0 : mo };
      }
      return i;
    }
  };
}
function Mb(e) {
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
          number: { min: 2, max: Ga, step: 1, mode: "slider", unit_of_measurement: "px" }
        }
      }
    ],
    data: {
      x1: Math.round(e.x1),
      y1: Math.round(e.y1),
      x2: Math.round(e.x2),
      y2: Math.round(e.y2),
      thickness: e.thickness ?? Q
    },
    // Keep the default out of the YAML so untouched walls stay terse.
    toPatch: (i) => "thickness" in i && i.thickness === Q ? { ...i, thickness: void 0 } : i
  };
}
function Ib(e) {
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
    data: { title: e.title ?? "", width: e.width, height: e.height, grid: e.grid ?? Zo },
    toPatch: mt
  };
}
function Pb(e) {
  return {
    fields: [
      {
        name: "pressEffect",
        label: "Press effect",
        helper: "Feedback when a device is pressed. Only devices that do something respond",
        selector: W(
          S("scale", "Press in"),
          S("ripple", "Ink ripple"),
          S("flash", "Flash"),
          S("none", "None")
        )
      }
    ],
    data: { pressEffect: Ii(e) },
    // The default stays out of the YAML, as the skin's does.
    toPatch: (t) => "pressEffect" in t && t.pressEffect === Za ? { ...t, pressEffect: void 0 } : t
  };
}
function Ob(e) {
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
function Lb(e) {
  const t = Go(e.skin) ?? Ki[0];
  return {
    fields: [
      {
        name: "skin",
        label: "Skin",
        helper: t.description,
        selector: W(...Ki.map((i) => S(i.id, i.label)))
      }
    ],
    // An id we don't ship reads back as Default, matching what it renders as.
    data: { skin: t.id },
    toPatch: (i) => (
      // Default is the absence of a skin, so it stays out of the YAML.
      "skin" in i && i.skin === mn ? { ...i, skin: void 0 } : i
    )
  };
}
function Fb(e) {
  return {
    fields: [
      {
        name: "rotation",
        label: "Rotate display",
        helper: "Rotates the live card only — editing stays as drawn",
        selector: W(S("0", "0°"), S("90", "90°"), S("180", "180°"), S("270", "270°"))
      },
      // Per-orientation overrides (issue #237). Two dropdowns with a "same as
      // above" default rather than a switch plus two angles: the switch would
      // be a third control whose only job is to say whether the other two
      // count, and "same as above" says that per orientation and for free.
      {
        name: "rotationPortrait",
        label: "…on a portrait screen",
        helper: "Overrides the angle above while the screen is taller than it is wide",
        selector: W(
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
        selector: W(
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
        selector: W(S("plan", "Canvas units"), S("fixed", "Fixed pixels"))
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
        selector: W(
          S("dim", "Dimmed"),
          S("strike", "Dimmed and crossed out"),
          S("none", "No different")
        )
      }
    ],
    data: {
      rotation: String(di(e.rotation)),
      // "" is "same as above" — the absence of an override, not an angle.
      // `== null` for the same reason resolvePlanRotation uses it: a key
      // written with no value (`rotationPortrait:`) parses to `null`, and
      // reading that as an angle would show 0° here — then write it into the
      // YAML as a real override the moment this panel is saved, turning a
      // stray empty key into an instruction the plan never had.
      rotationPortrait: e.rotationPortrait == null ? "" : String(di(e.rotationPortrait)),
      rotationLandscape: e.rotationLandscape == null ? "" : String(di(e.rotationLandscape)),
      overlayScale: sr(e.overlayScale),
      compactHeader: e.compactHeader ?? !1,
      zoomedOverlayScale: e.zoomedOverlayScale ?? go,
      offlineStyle: Sl(e)
    },
    toPatch: (t) => {
      let i = t;
      "rotation" in i && (i = { ...i, rotation: i.rotation === "0" ? void 0 : Number(i.rotation) });
      for (const n of ["rotationPortrait", "rotationLandscape"])
        n in i && (i = { ...i, [n]: i[n] === "" ? void 0 : Number(i[n]) });
      return "compactHeader" in i && !i.compactHeader && (i = { ...i, compactHeader: void 0 }), "offlineStyle" in i && i.offlineStyle === Xa && (i = { ...i, offlineStyle: void 0 }), "zoomedOverlayScale" in i && i.zoomedOverlayScale === go && (i = { ...i, zoomedOverlayScale: void 0 }), i;
    }
  };
}
function Rb(e) {
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
function zb(e) {
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
      sunBrightnessMin: e.sunBrightnessMin ?? qo,
      sunBrightnessMax: e.sunBrightnessMax ?? qi
    },
    // Off is the default, so keep the whole feature out of the YAML until it
    // is switched on — including the two sliders it drags along with it.
    toPatch: (i) => "sunDimming" in i && !i.sunDimming ? { ...i, sunDimming: void 0, sunBrightnessMin: void 0, sunBrightnessMax: void 0 } : i
  };
}
function Nb(e) {
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
      sunReach: e.sunReach ?? nn,
      sunFollows: typeof e.sunBearing != "number",
      sunBearing: e.sunBearing ?? $o
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
      } : ("sunFollows" in n && (n.sunBearing = n.sunFollows ? void 0 : e.sunBearing ?? $o, delete n.sunFollows), "north" in n && !n.north && (n.north = void 0), "sunReach" in n && n.sunReach === nn && (n.sunReach = void 0), "sunShade" in n && n.sunShade && (n.sunShade = void 0), n);
    }
  };
}
function Db(e) {
  const t = [
    { name: "image", label: "Bg image", helper: "/local/floorplan.png or URL", selector: { text: {} } }
  ];
  return e.image && (t.push({
    name: "imageFit",
    label: "Image fit",
    helper: "Per floor, so scans of different resolutions can each fit properly",
    selector: W(
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
var Hb = Object.defineProperty, Ub = Object.getOwnPropertyDescriptor, O = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ub(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Hb(t, i, o), o;
};
const Bb = (e) => e.label, jb = (e) => e.helper, qn = {
  select: { icon: "mdi:cursor-default", label: "Select" },
  wall: { icon: "mdi:wall", label: "Wall" },
  door: { icon: "mdi:door", label: "Door" },
  window: { icon: "mdi:window-closed-variant", label: "Window" },
  tracker: { icon: "mdi:crosshairs-gps", label: "Tracker" },
  area: { icon: "mdi:vector-polygon", label: "Area" }
}, Wb = {
  wall: "mdi:wall",
  opening: "mdi:door",
  item: "mdi:lightbulb-outline",
  text: "mdi:format-text",
  furniture: "mdi:sofa-outline",
  tracker: "mdi:crosshairs-gps",
  area: "mdi:floor-plan"
}, Vs = 35, Ys = 12, Gb = 8, Kb = 2e3, qb = 10;
function Zs(e) {
  return e.some((t) => {
    const i = t, n = i.tagName?.toLowerCase();
    return n === "input" || n === "textarea" || n === "select" || n === "ha-form" || n === "ha-entity-picker" || n === "ha-icon-picker" || i.isContentEditable === !0;
  });
}
let P = class extends le {
  constructor() {
    super(...arguments), this._wallMaskId = `fp-edit-wall-mask-${P._nextWallMaskId++}`, this.panelMode = !1, this.panelError = "", this._watchedEntities = /* @__PURE__ */ new Set(), this._tool = "select", this._selection = [], this._draft = null, this._draftTracker = null, this._areaShape = "polygon", this._draftArea = null, this._areaHover = null, this._freeWalls = !1, this._defaultOpeningLength = 60, this._marquee = null, this._history = [], this._future = [], this._zoom = 1, this._floorMenuOpen = !1, this._addMenuOpen = !1, this._addQuery = "", this._symbolDraft = "", this._symbolError = "", this._paletteError = "", this._projectOpen = !1, this._openGroups = /* @__PURE__ */ new Set(), this._fullscreen = !1, this._applyState = "idle", this._applyError = "", this._applyResetTimer = null, this._drag = null, this._dragMoves = new ab(sb, (e) => {
      this._drag && this._applyDrag(e);
    }), this._dragDirty = !1, this._pickAnchor = null, this._hideLabels = !1, this._pinchPts = /* @__PURE__ */ new Map(), this._pinch = null, this._gesturePointer = null, this._marqueeAdd = !1, this._clipboard = null, this._onKeyDown = (e) => this._handleKeyDown(e), this._onHostKeyDown = (e) => {
      e.key !== "Escape" || !this._fullscreen || Zs(e.composedPath()) && (e.preventDefault(), e.stopPropagation(), this._canvasWrap?.focus({ preventScroll: !0 }));
    }, this._onFocusIn = (e) => {
      this._fullscreen && !this.panelMode && !e.composedPath().includes(this) && (this._fullscreen = !1);
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
        const r = o.getBoundingClientRect(), s = this._zoom / n.z0;
        o.scrollLeft = n.cx * s - ((t.x + i.x) / 2 - r.left), o.scrollTop = n.cy * s - ((t.y + i.y) / 2 - r.top);
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
      const e = await hb(this);
      if (!e.ok) {
        this._applyState = "idle", this._applyError = e.error;
        return;
      }
      this._applyState = "saved", this._applyResetTimer = setTimeout(() => {
        this._applyResetTimer = null, this._applyState = "idle";
      }, Kb);
    }, this._addSymbol = () => {
      let e;
      try {
        e = JSON.parse(this._symbolDraft);
      } catch (n) {
        this._symbolError = `Not valid JSON — ${n.message}`;
        return;
      }
      const t = [], i = wn(e, void 0, t);
      if (!i) {
        this._symbolError = t[0] ?? "Not a usable symbol.";
        return;
      }
      this._patchConfig({ symbols: { ...this._config.symbols ?? {}, [i.id]: e } }), this._symbolDraft = "", this._symbolError = "";
    };
  }
  willUpdate() {
    this.panelMode && !this._fullscreen && (this._fullscreen = !0);
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._onKeyDown, !0), this.addEventListener("keydown", this._onHostKeyDown), window.addEventListener("focusin", this._onFocusIn);
  }
  disconnectedCallback() {
    window.removeEventListener("keydown", this._onKeyDown, !0), this.removeEventListener("keydown", this._onHostKeyDown), window.removeEventListener("focusin", this._onFocusIn), this._applyResetTimer !== null && clearTimeout(this._applyResetTimer), this._dragMoves.cancel(), this._flushDrag(), this._drag = null, this._gesturePointer = null, this._resetPinch(), super.disconnectedCallback();
  }
  setConfig(e) {
    const t = { ...Nh(e.type || "custom:easy-floorplan-card"), ...e }, i = Ft(t).map((n) => structuredClone(n));
    this._config = {
      ...t,
      floors: i,
      walls: [],
      openings: [],
      items: [],
      texts: [],
      furniture: [],
      trackers: []
    }, (!this._activeFloorId || !i.some((n) => n.id === this._activeFloorId)) && (this._activeFloorId = t.defaultFloor && i.some((n) => n.id === t.defaultFloor) ? t.defaultFloor : i[0].id), this._lastEmitted && e !== this._lastEmitted && !yo(e, this._lastEmitted) && (this._history = [], this._future = [], this._liveEditKey = null), this._watchedEntities = ii(this._config);
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
    return i(t) !== i(this.hass) ? !0 : sl(t, this.hass, this._watchedEntities);
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
    return _o(this._config.symbols);
  }
  /** Discrete change to the active floor's elements (snapshots for undo). */
  _commitFloor(e) {
    this._commit({ ...this._config, floors: this._patchFloors(e) });
  }
  /** Live change to the active floor's elements (no history snapshot — for dragging). */
  _emitFloor(e) {
    const t = { ...this._config, floors: this._patchFloors(e) };
    if (this._drag) {
      this._config = t, this._watchedEntities = ii(t), this._dragDirty = !0;
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
    return this._config.grid ?? Zo;
  }
  /**
   * Resolved placement snap step. `snap` is tri-state in the config: unset
   * means "follow the grid" (the default behaviour), `0` is free placement,
   * any other number is a custom step. See {@link resolveSnap}.
   */
  get _resolvedSnap() {
    return Oh(this._config.snap, this.grid);
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
        snap: t && t > 0 ? t : jn(gs, this.grid)
      });
    }
  }
  /** Grid update plus a custom-snap rescale so its percentage of the grid is preserved. */
  _gridPatch(e) {
    const t = { grid: e };
    if (this._snapMode === "custom") {
      const i = ys(this._config.snap, this.grid);
      t.snap = jn(i, e);
    }
    return t;
  }
  _setGuides(e) {
    JSON.stringify(e) !== JSON.stringify(this._guides) && (this._guides = e);
  }
  /** Snap to the step, but pull onto the x/y of a nearby wall end or room corner and remember the guide lines. */
  _alignedSnap(e, t, i) {
    const n = this._floor();
    let o = this._snap(e), r = this._snap(t);
    if (this._resolvedSnap <= 0)
      return this._setGuides([]), { x: o, y: r };
    const s = [];
    for (const h of n.walls) s.push({ x: h.x1, y: h.y1 }, { x: h.x2, y: h.y2 });
    for (const h of n.areas ?? []) for (const d of h.points) s.push(d);
    const a = [];
    let l = Ys, c = Ys;
    for (const h of s)
      i?.(h) || (Math.abs(h.x - e) <= l && (l = Math.abs(h.x - e), o = h.x, a[0] = { axis: "x", value: h.x }), Math.abs(h.y - t) <= c && (c = Math.abs(h.y - t), r = h.y, a[1] = { axis: "y", value: h.y }));
    return this._setGuides(a.filter(Boolean)), { x: o, y: r };
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
    return ic(this._floor().walls, e, t, Et);
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
    return Zy(this._floor(), e, t, Et, i) ?? this._alignedSnap(e, t, (n) => {
      const o = i ? this._floor().areas?.find((r) => r.id === i.areaId)?.points : void 0;
      return !!o && o[i.vertexIndex] === n;
    });
  }
  /**
   * Like {@link _snapWallPoint}, but ignores endpoints in `moving` (keys
   * `${wallId}:${end}`) — the corner cluster being dragged must not attract
   * itself.
   */
  _snapWallPointExcluding(e, t, i) {
    let n = null, o = Et;
    for (const r of this._floor().walls)
      for (const s of [1, 2]) {
        if (i.has(`${r.id}:${s}`)) continue;
        const a = s === 1 ? r.x1 : r.x2, l = s === 1 ? r.y1 : r.y2, c = Math.hypot(e - a, t - l);
        c < o && (o = c, n = { x: a, y: l });
      }
    return n ?? this._alignedSnap(
      e,
      t,
      (r) => this._floor().walls.some(
        (s) => i.has(`${s.id}:1`) && s.x1 === r.x && s.y1 === r.y || i.has(`${s.id}:2`) && s.x2 === r.x && s.y2 === r.y
      )
    );
  }
  /** See {@link snapWallEnd}: corners win, then axis gravity, then the snap step. */
  _snapWallEnd(e, t, i, n) {
    const o = Qy(
      this._floor().walls,
      e,
      t,
      i,
      n,
      (a) => this._snap(a),
      this._freeWalls,
      qb,
      Et
    );
    if (this._nearestCorner(i, n))
      return this._setGuides([]), o;
    const r = this._alignedSnap(i, n), s = this._guides.filter((a) => a.axis === "x" ? o.x !== e : o.y !== t);
    return this._setGuides(s), {
      x: s.some((a) => a.axis === "x") ? r.x : o.x,
      y: s.some((a) => a.axis === "y") ? r.y : o.y
    };
  }
  _emit(e) {
    this._drag && (this._drag.emitted = !0), this._config = e, this._watchedEntities = ii(e);
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
      this._fullscreen && !this.panelMode && e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), this._fullscreen = !1);
      return;
    }
    if (Zs(i)) return;
    const n = e.ctrlKey || e.metaKey, o = e.key.toLowerCase(), r = !!(this._drag || this._draft || this._draftTracker || this._draftArea || this._marquee);
    if (e.key === "Backspace" && this._draftArea?.points.length) {
      e.preventDefault();
      const c = this._draftArea.points.slice(0, -1);
      this._draftArea = c.length ? { points: c } : null;
      return;
    }
    if (r && e.key !== "Escape" && !(n && o === "c")) return;
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
      this._draft || this._draftTracker || this._draftArea || this._marquee || this._drag ? (e.preventDefault(), e.stopPropagation(), this._cancelGesture()) : this._selection.length ? (e.preventDefault(), e.stopPropagation(), this._clearSel()) : this._fullscreen && !this.panelMode && (e.preventDefault(), e.stopPropagation(), this._fullscreen = !1);
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
    if (!ob(i, this._selection).length) return;
    const n = (d) => {
      const p = this._idsOfKind(d);
      for (const f of p) ei(i, { kind: d, id: f }) && p.delete(f);
      return p;
    }, o = n("wall"), r = n("opening"), s = n("item"), a = n("text"), l = n("furniture"), c = n("tracker"), h = n("area");
    this._commitFloor({
      walls: i.walls.map(
        (d) => o.has(d.id) ? { ...d, x1: d.x1 + e, y1: d.y1 + t, x2: d.x2 + e, y2: d.y2 + t } : d
      ),
      openings: i.openings.map((d) => r.has(d.id) ? { ...d, x: d.x + e, y: d.y + t } : d),
      items: i.items.map((d) => s.has(d.id) ? { ...d, x: d.x + e, y: d.y + t } : d),
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
    if (!e) return g;
    const t = this._selection.length > 0, i = this._floor(), n = t && this._selection.every((r) => ei(i, r)), o = (r, s, a, l = !1) => u`<button
      class=${l ? "danger" : ""}
      @click=${() => {
      this._ctx = null, a();
    }}
    ><ha-icon icon=${r}></ha-icon>${s}</button>`;
    return u`<div class="fp-ctx" style="left:${e.x}px;top:${e.y}px" @pointerdown=${(r) => r.stopPropagation()}>
      ${t ? u`${o("mdi:content-duplicate", "Duplizieren", () => this._duplicate())}
            ${o("mdi:content-copy", "Kopieren", () => this._copy())}
            ${o("mdi:content-save-outline", "Als Vorlage speichern", () => this._saveTemplate())}
            ${o(n ? "mdi:lock-open-variant-outline" : "mdi:lock", n ? "Entsperren" : "Fixieren", () => this._setLocked(!n))}` : g}
      ${this._clipboard ? o("mdi:content-paste", "Einfügen", () => this._paste()) : g}
      ${t ? o("mdi:delete-outline", "Löschen", () => this._deleteSelected(), !0) : g}
      ${!t && !this._clipboard ? u`<span class="fp-ctx-empty">Nichts ausgewählt</span>` : g}
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
      if (n.length >= 3 && Math.hypot(i.x - o.x, i.y - o.y) <= Et) {
        this._finishArea();
        return;
      }
      const r = n[n.length - 1];
      (i.x !== r.x || i.y !== r.y) && (this._draftArea = { points: [...n, i] });
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
    this._drag = null, e?.moved && e.snapshot && (this._history = this._history.filter((t) => t !== e.snapshot), e.emitted ? this._emit(e.snapshot) : (this._config = e.snapshot, this._watchedEntities = ii(e.snapshot)), this._future = e.priorFuture ?? []);
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
          const i = { id: ee("wall"), ...t };
          this._commitFloor({ walls: [...this._floor().walls, i] }), this._selection = [{ kind: "wall", id: i.id }];
        }
        return;
      }
      if ((this._tool === "tracker" || this._tool === "area") && this._draftTracker) {
        const t = this._draftTracker;
        this._draftTracker = null, this._releasePointer(e);
        const i = Math.min(t.x0, t.x1), n = Math.min(t.y0, t.y1), o = Math.abs(t.x1 - t.x0), r = Math.abs(t.y1 - t.y0);
        o >= this.grid / 2 && r >= this.grid / 2 && (this._tool === "area" ? this._addRectArea(i, n, o, r) : this._addTracker(i, n, o, r));
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
    return Jy(this._floor(), e);
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
    const i = this._toVirtual(e, !1), n = nb(this._floor(), i.x, i.y, {
      itemSize: at,
      textSize: ai,
      wallThickness: Q,
      hass: this.hass
    }), o = !!this._pickAnchor && Math.hypot(e.clientX - this._pickAnchor.clientX, e.clientY - this._pickAnchor.clientY) <= Gb;
    return this._pickAnchor = { clientX: e.clientX, clientY: e.clientY }, rb(n, this._selection, o) ?? t;
  }
  _startDrag(e, t, i, n) {
    if (this._tool !== "select") return;
    if (e.stopPropagation(), this._ctx = null, e.button === 2) {
      this._isSel(t.kind, t.id) || this._selectOne(t);
      return;
    }
    if (this._gesturePointer !== null) return;
    this._canvasWrap?.focus({ preventScroll: !0 });
    const o = i != null || n != null, r = o ? t : this._resolvePick(e, t);
    o ? this._selectOne(r) : this._selectForPointer(e, r), !ei(this._floor(), r) && (this._drag = {
      primary: r,
      start: this._toVirtual(e, !1),
      orig: this._snapshotSelection(),
      endpoint: i,
      areaVertex: n
    }, r.kind === "wall" && (this._drag.attached = this._attachedCorners(r.id, i)), this._gesturePointer = e.pointerId, this._capturePointer(e));
  }
  /** See {@link attachedCorners}: shared room corners that stretch with this wall. */
  _attachedCorners(e, t) {
    return Yy(this._floor().walls, e, t);
  }
  /** Capture the start positions of every selected element on the active floor. */
  _snapshotSelection() {
    const e = this._floor(), t = /* @__PURE__ */ new Map();
    for (const i of this._selection)
      if (!ei(e, i))
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
        ...c.map((f) => `${f.id}:${f.end}`)
      ]), d = this._snapWallPointExcluding(e.x, e.y, h), p = i.walls.map((f) => {
        let m = f;
        f.id === t.primary.id && (m = t.endpoint === 1 ? { ...m, x1: d.x, y1: d.y } : { ...m, x2: d.x, y2: d.y });
        for (const b of c)
          b.id === f.id && (m = b.end === 1 ? { ...m, x1: d.x, y1: d.y } : { ...m, x2: d.x, y2: d.y });
        return m;
      });
      this._emitFloor({ walls: p });
      return;
    }
    if (t.primary.kind === "area" && t.areaVertex != null) {
      const c = t.areaVertex, h = this._snapAreaPoint(e.x, e.y, { areaId: t.primary.id, vertexIndex: c }), d = (i.areas ?? []).map(
        (p) => p.id === t.primary.id ? { ...p, points: p.points.map((f, m) => m === c ? h : f) } : p
      );
      this._emitFloor({ areas: d });
      return;
    }
    if (this._selection.length === 1 && t.primary.kind === "opening") {
      const c = t.orig.get(`opening:${t.primary.id}`);
      if (c && c.kind === "pt") {
        const h = c.x + (e.x - t.start.x), d = c.y + (e.y - t.start.y), p = zs(h, d, i.walls, Vs), f = i.openings.map(
          (m) => m.id === t.primary.id ? p ? { ...m, x: p.x, y: p.y, angle: p.angle } : { ...m, x: this._snap(h), y: this._snap(d) } : m
        );
        this._emitFloor({ openings: f });
        return;
      }
    }
    const n = t.orig.get(`${t.primary.kind}:${t.primary.id}`);
    if (!n) return;
    const o = n.kind === "wall" ? n.x1 : n.kind === "polygon" ? n.points[0].x : n.x, r = n.kind === "wall" ? n.y1 : n.kind === "polygon" ? n.points[0].y : n.y, s = this._snap(o + (e.x - t.start.x)) - o, a = this._snap(r + (e.y - t.start.y)) - r;
    let l = this._applyDelta(s, a, t.orig);
    if (t.attached?.length && !e.altKey) {
      const c = (l.walls ?? i.walls).map((h) => {
        let d = h;
        for (const p of t.attached)
          p.id !== h.id || t.orig.has(`wall:${p.id}`) || (d = p.end === 1 ? { ...d, x1: p.x0 + s, y1: p.y0 + a } : { ...d, x2: p.x0 + s, y2: p.y0 + a });
        return d;
      });
      l = { ...l, walls: c };
    }
    this._emitFloor(l);
  }
  /** Translate every snapshotted element by (dx, dy). */
  _applyDelta(e, t, i) {
    return eb(this._floor(), e, t, i);
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
    const n = this._floor(), o = zs(t, i, n.walls, Vs), r = {
      id: ee(e),
      type: e,
      x: o?.x ?? t,
      y: o?.y ?? i,
      // User-editable from the door/window context bar so opening size can be
      // set BEFORE placing (the previous hardcoded 60 forced place-then-resize).
      length: this._defaultOpeningLength,
      angle: o?.angle ?? 0
    };
    this._commitFloor({ openings: [...n.openings, r] }), this._selection = [{ kind: "opening", id: r.id }], this._tool = "select";
  }
  _addItem(e) {
    const t = {
      id: ee("item"),
      entity: "",
      x: this._snap(this._config.width / 2),
      y: this._snap(this._config.height / 2),
      kind: e,
      showState: e === "sensor",
      showIcon: !0,
      size: at
    };
    this._commitFloor({ items: [...this._floor().items, t] }), this._selection = [{ kind: "item", id: t.id }], this._tool = "select";
  }
  _addFurniture(e) {
    const t = Hm(e, this._symbols()), i = {
      id: ee("furn"),
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
      id: ee("tracker"),
      x: e,
      y: t,
      w: i,
      h: n,
      angle: 0,
      dotSize: Yo
    };
    this._commitFloor({ trackers: [...this._floor().trackers ?? [], o] }), this._selection = [{ kind: "tracker", id: o.id }], this._tool = "select";
  }
  /** floorplan-panel: a rectangular room from a dragged box. */
  _addRectArea(e, t, i, n) {
    const o = {
      id: ee("area"),
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
    const e = { id: ee("area"), points: this._draftArea.points, showName: !0 };
    this._commitFloor({ areas: [...this._floor().areas ?? [], e] }), this._selection = [{ kind: "area", id: e.id }], this._draftArea = null, this._areaHover = null, this._tool = "select";
  }
  _addText() {
    const e = {
      id: ee("text"),
      x: this._snap(this._config.width / 2),
      y: this._snap(this._config.height / 2),
      text: "Label",
      size: ai
    };
    this._commitFloor({ texts: [...this._floor().texts, e] }), this._selection = [{ kind: "text", id: e.id }], this._tool = "select";
  }
  _deleteSelected() {
    if (!this._selection.length) return;
    const e = this._floor(), t = this._idsOfKind("wall"), i = this._idsOfKind("opening"), n = this._idsOfKind("item"), o = this._idsOfKind("text"), r = this._idsOfKind("furniture"), s = this._idsOfKind("tracker"), a = this._idsOfKind("area");
    this._commitFloor({
      walls: e.walls.filter((l) => !t.has(l.id)),
      openings: e.openings.filter((l) => !i.has(l.id)),
      items: e.items.filter((l) => !n.has(l.id)),
      texts: e.texts.filter((l) => !o.has(l.id)),
      furniture: e.furniture.filter((l) => !r.has(l.id)),
      trackers: (e.trackers ?? []).filter((l) => !s.has(l.id)),
      areas: (e.areas ?? []).filter((l) => !a.has(l.id))
    }), this._clearSel();
  }
  // ---- clipboard (copy / paste / duplicate) ------------------------------
  _copy() {
    if (!this._selection.length) return;
    const e = this._floor(), t = this._idsOfKind("wall"), i = this._idsOfKind("opening"), n = this._idsOfKind("item"), o = this._idsOfKind("text"), r = this._idsOfKind("furniture"), s = this._idsOfKind("tracker"), a = this._idsOfKind("area");
    this._clipboard = structuredClone({
      walls: e.walls.filter((l) => t.has(l.id)),
      openings: e.openings.filter((l) => i.has(l.id)),
      items: e.items.filter((l) => n.has(l.id)),
      texts: e.texts.filter((l) => o.has(l.id)),
      furniture: e.furniture.filter((l) => r.has(l.id)),
      trackers: (e.trackers ?? []).filter((l) => s.has(l.id)),
      areas: (e.areas ?? []).filter((l) => a.has(l.id))
    });
  }
  /** Paste the clipboard onto the active floor, offset by one snap step, with fresh ids. */
  _paste() {
    if (!this._clipboard) return;
    const e = structuredClone(this._clipboard), t = this._resolvedSnap || this.grid, i = this._floor(), n = { locked: void 0 }, o = e.walls.map((d) => ({
      ...d,
      ...n,
      id: ee("wall"),
      x1: d.x1 + t,
      y1: d.y1 + t,
      x2: d.x2 + t,
      y2: d.y2 + t
    })), r = e.openings.map((d) => ({
      ...d,
      ...n,
      id: ee(d.type),
      x: d.x + t,
      y: d.y + t
    })), s = e.items.map((d) => ({
      ...d,
      ...n,
      id: ee("item"),
      x: d.x + t,
      y: d.y + t
    })), a = e.texts.map((d) => ({
      ...d,
      ...n,
      id: ee("text"),
      x: d.x + t,
      y: d.y + t
    })), l = e.furniture.map((d) => ({
      ...d,
      ...n,
      id: ee("furn"),
      x: d.x + t,
      y: d.y + t
    })), c = (e.trackers ?? []).map((d) => ({
      ...d,
      ...n,
      id: ee("tracker"),
      x: d.x + t,
      y: d.y + t
    })), h = (e.areas ?? []).map((d) => ({
      ...d,
      ...n,
      id: ee("area"),
      points: d.points.map((p) => ({ x: p.x + t, y: p.y + t }))
    }));
    this._commitFloor({
      walls: [...i.walls, ...o],
      openings: [...i.openings, ...r],
      items: [...i.items, ...s],
      texts: [...i.texts, ...a],
      furniture: [...i.furniture, ...l],
      trackers: [...i.trackers ?? [], ...c],
      areas: [...i.areas ?? [], ...h]
    }), this._selection = [
      ...o.map((d) => ({ kind: "wall", id: d.id })),
      ...r.map((d) => ({ kind: "opening", id: d.id })),
      ...s.map((d) => ({ kind: "item", id: d.id })),
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
      templates: [...t, { id: ee("tpl"), name: i, data: structuredClone(e) }]
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
    const t = this._floor(), i = e || void 0, n = (o, r) => {
      const s = this._idsOfKind(r);
      return o.map((a) => s.has(a.id) ? { ...a, locked: i } : a);
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
    const e = this._floor().walls.map((o) => ({ ...o, id: ee("wall") })), t = (this._config.floors?.length ?? 1) + 1, i = Hh(`Floor ${t}`, e), n = [...this._config.floors ?? [], i];
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
    const t = jh(this._config.floors ?? [], this._activeFloorId, e);
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
    const t = bs(this.hass).find((i) => i.floor_id === e);
    this._commit({
      ...this._config,
      floors: (this._config.floors ?? []).map(
        (i) => i.id === this._activeFloorId ? { ...i, haFloor: t?.floor_id, ...t ? { name: t.name } : {} } : i
      )
    });
  }
  /** HA-floor link row for the floor gear popover; hidden when HA exposes no floors. */
  _renderHaFloorRow(e) {
    const t = bs(this.hass);
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
    ` : u`${g}`;
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
    return vi(this._config?.palette);
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
    if (!i.length) return g;
    const n = ec(e), o = n && i.some((r) => de(r.name) === n) ? n : void 0;
    return u`
      <select
        class="palette-pick"
        title="Use one of the plan's named colours"
        .value=${o ?? ""}
        @change=${(r) => {
      const s = r.target.value;
      if (!s) {
        o && t(Ri(e, i));
        return;
      }
      const a = i.find((l) => de(l.name) === s);
      a && t(Hs(a.name));
    }}
      >
        <option value="" ?selected=${!o}>Custom…</option>
        ${i.map(
      (r) => u`<option
            value=${de(r.name)}
            ?selected=${de(r.name) === o}
          >
            ${r.name}
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
    const i = Ri(e, this._config?.palette);
    return typeof i == "string" && i ? i : t;
  }
  _renderColorRow(e) {
    return u`
      <div class="row">
        <label title=${e.title ?? g}>${e.label}</label>
        <input
          type="color"
          title=${e.title ?? g}
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
    return vo(
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
      ${e.stateColor?.length ? u`<p class="hint rule-note">Shown while no rule below names an icon of its own.</p>` : g}
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
        ${i ? t : g}
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
    const t = tt(e), i = (o) => this._updateItem(e.id, {
      readings: o.length ? o : void 0,
      secondaryEntity: void 0,
      secondaryAttribute: void 0,
      // `badgeEntity: "secondary"` meant index 0, which is where the legacy
      // pair still is — restate it as the index so the old spelling does not
      // outlive the keys it referred to.
      ...e.badgeEntity === "secondary" ? { badgeEntity: 0 } : {}
    }), n = (o, r) => i(t.map((s, a) => a === o ? { ...s, ...r } : s));
    return u`
      <div class="row wide">
        <label title="Further entities and attributes whose readings join this device's label line"
          >Other entities</label
        >
      </div>
      ${t.map(
      (o, r) => u`
          <div class="row wide item-reading">
            ${this._renderEntityPicker(
        o.entity ?? "",
        (s) => n(r, { entity: s || void 0 }),
        void 0,
        // Scoped to the room the device sits in, exactly as its own
        // entity picker is — an extra reading is as likely to come from
        // the same room as the first one.
        this._areaEntitiesAt(e.x, e.y)?.entities
      )}
            ${this._renderAttributePicker(
        o.entity || e.entity,
        o.attribute ?? "",
        (s) => n(r, { attribute: s || void 0 }),
        "Read this attribute instead of the state — with no entity beside it, from this device's own entity"
      )}
            <button
              class="rule-remove"
              aria-label="Remove entity"
              title="Remove this entity"
              @click=${() => i(t.filter((s, a) => a !== r))}
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
                @change=${(s) => n(r, {
        // `true` is the default, so it stays out of the YAML.
        showState: s.target.checked ? void 0 : !1
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
          </p>` : g}
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
    const n = e ?? [], o = (r, s) => {
      const a = n.map((l, c) => c === r ? { ...l, ...s } : l);
      t(a);
    };
    return u`
      <div class="row wide state-colors">
        <label
          title=${i?.icons ? "Color the badge — and optionally swap its icon — by what the entity reads" : "Color the element by what its entity reads"}
          >${i?.icons ? "Color & icon by state" : "Color by state"}</label
        >
      </div>
      ${n.map((r, s) => {
      const a = typeof r.state == "string" ? "state" : typeof r.above == "number" ? "above" : "else";
      return u`
          <div class="row wide state-color-rule">
            <select
              .value=${a}
              title="When this rule applies"
              @change=${(l) => {
        const c = l.target.value;
        o(s, {
          above: c === "above" ? r.above ?? 0 : void 0,
          state: c === "state" ? r.state ?? "" : void 0
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
                  .value=${String(r.above ?? 0)}
                  @change=${(l) => o(s, { above: Number(l.target.value) || 0 })}
                />` : a === "state" ? u`<input
                    type="text"
                    class="cond"
                    placeholder="on"
                    .value=${r.state ?? ""}
                    @change=${(l) => o(s, { state: l.target.value })}
                  />` : u`<span class="cond hint">any other value</span>`}
            <input
              type="color"
              .value=${this._swatchValue(r.color, "#ff0000")}
              @input=${(l) => o(s, { color: l.target.value })}
            />
            <input
              type="text"
              class="rule-color-text"
              placeholder="red"
              .value=${r.color ?? ""}
              @change=${(l) => o(s, { color: l.target.value })}
            />
            ${this._renderPalettePicker(r.color, (l) => o(s, { color: l ?? "" }))}
            ${i?.icons ? (
        // Empty means "keep the device's icon", so the device's icon is
        // the placeholder — the rule shows what leaving it blank gives
        // you, and colour-only rules need no icon at all (issue #127).
        this._renderIconPicker(r.icon ?? "", (l) => o(s, { icon: l || void 0 }), {
          placeholder: i.iconPlaceholder,
          title: "Icon while this rule matches — empty keeps the device's own"
        })
      ) : g}
            <button
              class="rule-remove"
              aria-label="Remove rule"
              title="Remove this rule"
              @click=${() => {
        const l = n.filter((c, h) => h !== s);
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
    const n = Ws(t, i.x, i.y);
    if (ls(n))
      return Wn(this.hass, n.haArea).length ? n.id : void 0;
  }
  _areaEntitiesAt(e, t) {
    const i = Ws(this._floor(), e, t);
    return ls(i) ? { entities: Wn(this.hass, i.haArea), name: i.name } : void 0;
  }
  /** Every entity in `area`'s linked HA area not already placed as an item on this floor. */
  _pendingAreaEntities(e) {
    if (!e.haArea) return [];
    const t = new Set(this._floor().items.map((i) => i.entity));
    return Wn(this.hass, e.haArea).filter((i) => !t.has(i));
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
    const i = Xy(e.points, t.length), n = t.map((o, r) => {
      const s = Ps(o);
      return {
        id: ee("item"),
        entity: o,
        x: Math.round(i[r].x),
        y: Math.round(i[r].y),
        kind: s,
        showState: s === "sensor",
        showIcon: !0,
        size: at
      };
    });
    this._commitFloor({ items: [...this._floor().items, ...n] }), this._selection = n.map((o) => ({ kind: "item", id: o.id }));
  }
  /** Patch a single field on one of a tracker's sensor sub-objects (X / Y axis). */
  _updateTrackerSensor(e, t, i) {
    const n = (this._floor().trackers ?? []).find((r) => r.id === e);
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
        const n = mb(i.type, this._symbols());
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
    for (let r = 0; r <= e; r += i)
      o.push(_`<line x1=${r} y1="0" x2=${r} y2=${t} class="grid" />`);
    for (let r = 0; r <= t; r += i)
      o.push(_`<line x1="0" y1=${r} x2=${e} y2=${r} class="grid" />`);
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
    const e = this._snapMode, t = ys(this._config.snap, this.grid), i = [
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
      const r = Math.max(
        1,
        Number(o.target.value) || gs
      );
      this._patchConfig({ snap: jn(r, this.grid) });
    }}
            /><span class="ctx-field-label">%</span>` : g}
      <span class="ctx-hint">${n}</span>
    `;
  }
  render() {
    if (!this._config) return u`${g}`;
    const e = this._config, t = this._floor(), i = e.floors ?? [], n = sr(e.overlayScale), o = this._scopingAreaId(), r = e.showDeadSpaces ? ol(t.walls, t.openings) : [], s = t.items.some((l) => l.glow) ? nr(t.walls, t.openings, (l) => {
      const c = (h) => lt(l, h ? this.hass?.states[h] : void 0);
      return dl(
        l,
        c(l.entity),
        l.secondaryEntity && Qi(l) ? lt(
          dr(l),
          this.hass?.states[l.secondaryEntity]
        ) : void 0,
        l.shutterEntity ? Ze(this.hass?.states[l.shutterEntity], l.shutterInvert) : void 0,
        Ue(l) > 2 && l.extraEntities ? l.extraEntities.map((h) => c(h || l.entity)) : void 0
      );
    }) : t.walls, a = !t.walls.length && !t.openings.length && !t.items.length && !t.texts.length && !t.furniture.length && !(t.trackers ?? []).length && !(t.areas ?? []).length;
    return u`
      <div
        class="editor ${this._fullscreen ? "fullscreen" : ""}"
        popover=${this._fullscreen ? "manual" : g}
        @pointerdown=${this._onEditorPointerDown}
      >
        ${this._floorMenuOpen || this._addMenuOpen ? u`<div
              class="pop-backdrop"
              @click=${() => {
      this._floorMenuOpen = !1, this._addMenuOpen = !1, this._addQuery = "";
    }}
            ></div>` : g}
        <div class="toolbar">
          <!-- Tools — modes; exactly one is active at a time -->
          <div class="seg" role="group" aria-label="Tool">
            ${["select", "wall", "door", "window", "tracker", "area"].map(
      (l) => u`
                <button
                  class=${this._tool === l ? "active" : ""}
                  aria-pressed=${this._tool === l}
                  title=${qn[l].label}
                  @click=${() => {
        this._tool = l, this._draft = null, this._draftTracker = null, this._draftArea = null, this._areaHover = null;
      }}
                >
                  <ha-icon icon=${qn[l].icon}></ha-icon>${qn[l].label}
                </button>`
    )}
          </div>

          <span class="divider"></span>

          <!-- Expand: break out of HA's narrow config dialog into a full-screen
               workspace. Kept next to the tools so it's reachable even when the
               toolbar wraps at dialog width. -->
          ${this.panelMode ? u`<button
                class="apply-btn done-btn"
                title="Änderungen speichern und zurück zur Ansicht"
                @click=${() => this.dispatchEvent(new CustomEvent("ef-done", { bubbles: !0, composed: !0 }))}
              >
                <ha-icon icon="mdi:check-bold"></ha-icon> Fertig
              </button>
              <button
                class="apply-btn"
                title="Bestehende easy-floorplan-Konfiguration einmalig importieren"
                @click=${() => this.dispatchEvent(new CustomEvent("ef-import-request", { bubbles: !0, composed: !0 }))}
              >
                <ha-icon icon="mdi:file-import-outline"></ha-icon> Import
              </button>${this.panelError ? u`<span class="apply-error">${this.panelError}</span>` : g}` : u`<button
            class=${this._fullscreen ? "active expand-toggle" : "expand-toggle"}
            aria-pressed=${this._fullscreen}
            title=${this._fullscreen ? "Exit full screen (Esc)" : "Edit full screen — more room for the canvas"}
            @click=${() => this._toggleFullscreen()}
          >
            <ha-icon icon=${this._fullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"}></ha-icon>
            ${this._fullscreen ? "Exit" : "Expand"}
          </button>`}

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
          ${this._applyError ? u`<span class="apply-error">${this._applyError}</span>` : g}

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
            ${this._addMenuOpen ? this._renderAddMenu() : g}
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
                </div>` : g}
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
          style=${this._fullscreen ? g : `aspect-ratio:${H(e.width, Tt)} / ${H(e.height, yi)};`}
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
               style="aspect-ratio: ${H(e.width, Tt)} / ${H(
      e.height,
      yi
    )}; width:${this._zoom * 100}%;
                   --fp-plan-w: ${H(e.width, Tt)};${yh(
      e.skin
    )}${Ql(e.palette)}">
            <!-- Keyed on the skin and the palette, for the repaint reason
                 documented on the card's SVG (issue #122): a var() inside a
                 presentation attribute does not repaint when the custom
                 property changes, so without this the canvas kept the previous
                 skin's doors and room fills — and, since issue #265, would show
                 a palette colour's old value while you were editing it. -->
            ${ja(
      `${e.skin ?? ""}|${Jl(e.palette)}`,
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
                fill=${e.background ?? gn}
              />
              ${t.image ? _`<image href=${t.image} x="0" y="0" width=${e.width} height=${e.height}
                            preserveAspectRatio=${Bl(t.imageFit)}
                            opacity=${t.imageOpacity ?? 1} />` : g}
              ${this._renderGrid()}
              ${ze(
        t.areas ?? [],
        (l, c) => l.id || c,
        (l) => this._renderAreaSel(l, o)
      )}
              <!-- Dead spaces (issue #88), same layer position as the card so
                   what you draw is what you get. Live while you draw: closing
                   the last wall of a shaft hatches it, and dropping a door into
                   it clears the hatching again — which is the fastest way to
                   see that the card agrees with you about what is sealed. -->
              ${r.length ? _`${Wl(`${this._wallMaskId}-dead`)}
                      ${r.map(
        (l) => Gl(l, `${this._wallMaskId}-dead`)
      )}` : g}
              <!-- Light pools (issue #6), same layer position as the card so
                   what you place is what you get. Previewed at full strength
                   with no hass in the editor, so the radius is adjustable
                   without having to turn the real light on. -->
              ${ul(
        t.furniture,
        e.width,
        e.height,
        `${this._wallMaskId}-glowmask`,
        this._symbols()
      )}
              <g class="fp-glows"
                 mask=${t.furniture.length ? `url(#${this._wallMaskId}-glowmask)` : g}>
                ${t.items.map((l, c) => {
        if (!l.glow) return g;
        const h = rg(l, this.hass?.states[l.entity]);
        return h ? pl(l, h, `${this._wallMaskId}-glow-${c}`, s) : g;
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
                                  r=${H(l.glowRadius, yn)} />` : g
      )}
              ${t.furniture.map((l) => this._renderFurnitureSel(l))}
              ${jl(t.openings, e.width, e.height, this._wallMaskId)}
              ${t.walls.map((l) => this._renderWall(l))}
              <!-- Room outlines, same layer position as the card so what you
                   place is what you get. Only a static borderColor draws here,
                   there being no hass to resolve a live color from — but the
                   clip ids are passed anyway, so wiring a live preview in later
                   cannot silently land on the unclipped path. -->
              <g mask=${`url(#${this._wallMaskId})`}>
                ${(t.areas ?? []).map(
        (l, c) => ql(l, void 0, `${this._wallMaskId}-area-${c}`)
      )}
              </g>
              ${ze(
        // Keyed by id: switching floors must create fresh DOM. Reused
        // nodes would CSS-transition from the previous floor's opening
        // state — a window briefly plays a door swing (issue #50).
        t.openings,
        (l, c) => l.id || c,
        (l) => this._renderOpeningSel(l)
      )}
              ${ze(
        t.trackers ?? [],
        (l, c) => l.id || c,
        (l) => this._renderTrackerSel(l)
      )}
              ${this._draftTracker ? _`<rect class="tracker-draft"
                              x=${Math.min(this._draftTracker.x0, this._draftTracker.x1)}
                              y=${Math.min(this._draftTracker.y0, this._draftTracker.y1)}
                              width=${Math.abs(this._draftTracker.x1 - this._draftTracker.x0)}
                              height=${Math.abs(this._draftTracker.y1 - this._draftTracker.y0)}
                              rx="4" />` : g}
              ${this._draft ? _`<g class="fp-wall-neon"><line x1=${this._draft.x1} y1=${this._draft.y1}
                              x2=${this._draft.x2} y2=${this._draft.y2}
                              class="wall draft" mask=${`url(#${this._wallMaskId})`}
                              stroke-width=${Q} /></g>` : g}
              ${this._renderAreaDraft()}
              ${this._guides.map(
        (l) => l.axis === "x" ? _`<line class="fp-guide" x1=${l.value} x2=${l.value} y1="0" y2=${e.height} />` : _`<line class="fp-guide" y1=${l.value} y2=${l.value} x1="0" x2=${e.width} />`
      )}
              ${this._marquee ? _`<rect x=${Math.min(this._marquee.x0, this._marquee.x1)}
                              y=${Math.min(this._marquee.y0, this._marquee.y1)}
                              width=${Math.abs(this._marquee.x1 - this._marquee.x0)}
                              height=${Math.abs(this._marquee.y1 - this._marquee.y0)}
                              class="marquee" />` : g}
            </svg>`
    )}
            <div class="items">
              ${t.texts.map((l) => this._renderTextOverlay(l, e, n))}
              ${t.openings.filter((l) => Pl(l)).map((l) => this._renderShutterMarkOverlay(l, e, n))}
              ${t.openings.filter((l) => Fl(l)).map((l) => this._renderOpeningMarkOverlay(l, e, n))}
              ${t.items.map((l) => this._renderItemOverlay(l, e, n))}
            </div>
          </div>
        </div>
        ${a && !this._draft && !this._draftTracker && !this._draftArea ? u`<div class="empty-hint">
              <div>
                <b>Draw your first room:</b> pick the <b>Wall</b> tool and drag on the canvas.<br />
                Then drop doors, windows and devices onto it.
              </div>
            </div>` : g}
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
        .computeLabel=${Bb}
        .computeHelper=${jb}
        @value-changed=${(i) => {
      i.stopPropagation();
      const n = fb(e.data, i.detail.value, e.fields), o = qs(n, e.fields), r = Object.keys(o);
      if (!r.length) return;
      const s = r.length === 1 && Ks(e.fields.find((a) => a.name === r[0]));
      t(e.toPatch(o), s);
    }}
      ></ha-form>` : u`${e.fields.map((i) => this._renderFallbackField(e, i, t))}`;
  }
  _applyFallback(e, t, i, n, o) {
    const r = qs({ [t.name]: i }, e.fields);
    t.name in r && o(e.toPatch(r), n && Ks(t));
  }
  /** One plain-input row per schema field — the outside-HA / load-failure path. */
  _renderFallbackField(e, t, i) {
    const n = e.data[t.name], o = t.selector;
    if ("select" in o) {
      const r = o.select, s = r.options;
      if (r.custom_value) {
        const a = `sel-${t.name}-${s.length}`;
        return u`<div class="row wide">
          <label>${t.label}</label>
          <input
            type="text"
            list=${a}
            .value=${String(n ?? "")}
            @change=${(l) => this._applyFallback(e, t, l.target.value, !1, i)}
          />
          <datalist id=${a}>
            ${s.map((l) => u`<option value=${l.value}></option>`)}
          </datalist>
        </div>`;
      }
      return u`<div class="row">
        <label>${t.label}</label>
        <select
          .value=${String(n ?? "")}
          @change=${(a) => this._applyFallback(e, t, a.target.value, !1, i)}
        >
          ${s.map(
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
          @change=${(r) => this._applyFallback(e, t, r.target.checked, !1, i)}
        />
      </div>`;
    if ("number" in o) {
      const r = o.number, s = r.mode === "slider";
      return u`<div class="row">
        <label>${t.label}</label>
        ${s ? u`<input
              type="range"
              min=${r.min ?? 0}
              max=${r.max ?? 100}
              step=${r.step ?? 1}
              .value=${String(n ?? r.min ?? 0)}
              @input=${(a) => this._applyFallback(e, t, Number(a.target.value), !0, i)}
            />` : g}
        <input
          class="num"
          type="number"
          min=${r.min ?? g}
          max=${r.max ?? g}
          step=${r.step ?? g}
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
      const r = o.entity;
      return u`<div class="row wide">
        <label>${t.label}</label>
        ${this._renderEntityPicker(
        String(n ?? ""),
        (s) => this._applyFallback(e, t, s, !1, i),
        r.filter?.[0]?.domain,
        r.include_entities
      )}
      </div>`;
    }
    return "icon" in o ? u`<div class="row wide">
        <label>${t.label}</label>
        <input
          type="text"
          placeholder=${o.icon.placeholder ?? "mdi:…"}
          .value=${String(n ?? "")}
          @change=${(r) => this._applyFallback(e, t, r.target.value, !1, i)}
        />
      </div>` : "ui_action" in o ? u`${g}` : u`<div class="row">
      <label>${t.label}</label>
      <input
        type="text"
        .value=${String(n ?? "")}
        @input=${(r) => this._applyFallback(e, t, r.target.value, !0, i)}
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
        title=${n ?? g}
        @value-changed=${(o) => i(o.detail.value ?? "")}
      ></ha-entity-attribute-picker>` : u`<input
      type="text"
      class="reading-attr"
      placeholder="attribute"
      title=${n ?? g}
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
        title=${i?.title ?? g}
        @value-changed=${(n) => t(n.detail.value ?? "")}
      ></ha-icon-picker>` : u`<input
      type="text"
      class="rule-icon"
      placeholder=${i?.placeholder ?? "mdi:blinds"}
      title=${i?.title ?? g}
      .value=${e}
      @change=${(n) => t(n.target.value)}
    />`;
  }
  /** Toggle the full-screen workspace. */
  _toggleFullscreen() {
    this.panelMode || (this._fullscreen = !this._fullscreen, this._fullscreen && this._canvasWrap && (this._canvasWrap.style.width = "", this._canvasWrap.style.height = ""), this._floorMenuOpen = !1, this._addMenuOpen = !1, this._addQuery = "");
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
    }, t = this._symbols(), i = oc(t).filter((r) => Dm(r, this._addQuery)), n = !this._addQuery.trim();
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
            @input=${(r) => {
      this._addQuery = r.target.value;
    }}
            @keydown=${(r) => {
      r.key === "Escape" && this._addQuery && (r.stopPropagation(), this._addQuery = "");
    }}
          />
        </div>
        <div class="add-furn-scroll">
          ${i.length ? i.map((r) => {
      const s = n && r.category !== o ? r.category : "";
      return o = r.category, u`${s ? u`<div class="furn-group">${s}</div>` : g}
                  ${this._renderFurnCell(r, e)}`;
    }) : u`<div class="furn-empty">No symbol matches “${this._addQuery}”</div>`}
        </div>
      </div>
    `;
  }
  /** One picker cell: the symbol drawn at its own default size, plus its name. */
  _renderFurnCell(e, t) {
    const { w: i, h: n } = e.size, o = Math.max(i, n) * 0.25 + 6, r = `${-i / 2 - o} ${-n / 2 - o} ${i + o * 2} ${n + o * 2}`;
    return u`
      <button
        class="furn-cell"
        title=${e.name}
        @click=${() => {
      this._addFurniture(e.id), t();
    }}
      >
        <svg viewBox=${r}>
          ${Ao(
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
    const i = e > 1 ? `${e} elements selected` : this._selectionSummary(t), n = e > 1 ? "mdi:select-group" : Wb[t.kind];
    return u`
      <section class="edit-area">
        <div class="edit-head">
          <ha-icon icon=${n}></ha-icon>
          <span class="edit-title" title=${i}>${i}</span>
          <span class="head-spacer"></span>
          ${(() => {
      const o = this._floor(), r = this._selection.every((s) => ei(o, s));
      return u`<button
              class=${r ? "on" : ""}
              aria-label=${r ? "Unlock" : "Lock in place"}
              aria-pressed=${r ? "true" : "false"}
              title=${r ? "Unlock — let it be dragged again" : "Lock in place — it can still be selected and edited, just not moved"}
              @click=${() => this._setLocked(!r)}
            >
              <ha-icon icon=${r ? "mdi:lock" : "mdi:lock-open-variant-outline"}></ha-icon>
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
              style=${_l(e.thickness)} stroke-linecap="round" /></g>
        ${i ? _`
                <circle cx=${e.x1} cy=${e.y1} r="9" class="handle"
                        @pointerdown=${(n) => this._startDrag(n, { kind: "wall", id: e.id }, 1)} />
                <circle cx=${e.x2} cy=${e.y2} r="9" class="handle"
                        @pointerdown=${(n) => this._startDrag(n, { kind: "wall", id: e.id }, 2)} />` : g}
      </g>`;
  }
  _renderOpeningSel(e) {
    const t = this._isSel("opening", e.id);
    return _`
      <g class="opening-hit"
         @pointerdown=${(i) => this._startDrag(i, { kind: "opening", id: e.id })}>
        ${Dl(e, {
      color: t ? "var(--primary-color, #03a9f4)" : Wo,
      // The closed colour previews here too (issue #228) — unless this is
      // the selected opening, whose whole symbol goes blue to show that.
      inactive: t ? void 0 : e.inactiveColor,
      open: cr(e),
      // Draw sliding / rolling openings partly open in the editor so the
      // motion is visible — closed, both look like a plain band, which
      // would make the Motion / Slide / Style controls appear inert.
      amount: te(e) !== "swing" ? 0.55 : void 0,
      // Shutter previewed half-rolled so the layer is visible while
      // configuring, whatever the live state.
      shutter: e.shutterEntity ? { amount: 0.55, style: Ct(e), flip: e.shutterFlipV } : void 0
    })}
      </g>`;
  }
  /**
   * Render a Tracker in the editor SVG with its zone outline visible (so the
   * user can grab/resize it) plus a hit overlay for drag-to-move and a dashed
   * selection rectangle when active.
   */
  _renderTrackerSel(e) {
    const t = this._isSel("tracker", e.id), i = rn(this.hass?.states, e.xSensor?.entity), n = rn(this.hass?.states, e.ySensor?.entity), o = Zi(this.hass?.states, e.xSensor?.presence), r = Zi(this.hass?.states, e.ySensor?.presence);
    return _`
      <g class="tracker-hit ${t ? "selected" : ""}"
         @pointerdown=${(s) => this._startDrag(s, { kind: "tracker", id: e.id })}>
        ${Vl(e, {
      editing: !0,
      xReading: i,
      yReading: n,
      xPresent: o,
      yPresent: r
    })}
        <rect x=${e.x} y=${e.y} width=${e.w} height=${e.h}
              transform="rotate(${e.angle ?? 0} ${e.x + e.w / 2} ${e.y + e.h / 2})"
              class="tracker-hit-rect" />
        ${t ? _`<rect x=${e.x - 4} y=${e.y - 4}
                        width=${e.w + 8} height=${e.h + 8}
                        transform="rotate(${e.angle ?? 0} ${e.x + e.w / 2} ${e.y + e.h / 2})"
                        class="tracker-outline" />` : g}
      </g>`;
  }
  _renderFurnitureSel(e) {
    const t = this._isSel("furniture", e.id);
    return _`
      <g class="furn-hit ${t ? "selected" : ""}"
         @pointerdown=${(i) => this._startDrag(i, { kind: "furniture", id: e.id })}>
        ${Ao(e, void 0, this._symbols())}
        ${t ? _`<rect x=${e.x - e.w / 2 - 4} y=${e.y - e.h / 2 - 4}
                        width=${e.w + 8} height=${e.h + 8}
                        transform="rotate(${e.angle ?? 0} ${e.x} ${e.y})"
                        class="furn-outline" />` : g}
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
    if (!e) return g;
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
    const i = this._isSel("area", e.id), n = e.id === t, o = e.points.map((r) => `${r.x},${r.y}`).join(" ");
    return _`
      <g class="area-hit ${i ? "selected" : ""} ${n ? "scoping" : ""}">
        ${n ? _`<polygon points=${o} class="area-scoping" />` : g}
        ${Kl(e)}
        <polygon points=${o} class="area-hit-shape"
                 @pointerdown=${(r) => this._startDrag(r, { kind: "area", id: e.id })} />
        ${i ? _`<polygon points=${o} class="area-outline" />` : g}
        ${// Outline yes, vertex handles no, for a pinned room — same reasoning
    // as the wall's endpoints (issue #191): still visibly selected, with
    // nothing on it that pretends to be draggable.
    i && !e.locked ? e.points.map(
      (r, s) => _`
                  <circle cx=${r.x} cy=${r.y} r="7" class="handle"
                          @pointerdown=${(a) => this._startDrag(a, { kind: "area", id: e.id }, void 0, s)} />`
    ) : g}
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
    if (!e) return g;
    const t = e.points, i = t.map((s) => `${s.x},${s.y}`).join(" "), n = t[t.length - 1], o = t.length >= 3, r = this._areaHover;
    return _`
      <g class="area-draft">
        ${t.length > 1 ? _`<polyline points=${i} class="area-draft-line" />` : g}
        ${r ? _`<line x1=${n.x} y1=${n.y} x2=${r.x} y2=${r.y}
                        class="area-draft-hover" />` : g}
        ${t.map(
      (s, a) => a === 0 && o ? _`<circle cx=${s.x} cy=${s.y} r="9" class="area-draft-start" />` : _`<circle cx=${s.x} cy=${s.y} r="5" class="area-draft-point" />`
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
    const n = e.shutterEntity, o = this.hass?.states[n], r = Ze(o, e.shutterInvert) > 0, s = Ll(e, o, r, this.hass?.entities?.[n]?.icon), a = G(e.shutterActiveColor ?? e.activeColor) ?? Y, l = ur(e), c = pr(e), h = K(en, i), d = K(Ji, i);
    return u`<div
      class="shutter-mark ${Oi(o, e.shutterInvert) ? "on" : "off"}"
      style="left:${l.x / t.width * 100}%; top:${l.y / t.height * 100}%;
             width:${h};height:${h};
             transform:translate(-50%,-50%)
                       translate(calc(${c.x} * ${d}), calc(${c.y} * ${d}));
             --fp-active:${a};"
      title=${`${o?.attributes?.friendly_name ?? n} — shown on the card, tap it there to open the shutter`}
    >
      <ha-icon icon=${s} style="--mdc-icon-size:${K(
      tn,
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
    const n = e.entity, o = this.hass?.states[n], r = lt(e, o) > 0, s = Rl(e, o, r, this.hass?.entities?.[n]?.icon), a = G(e.activeColor) ?? Y, l = zl(e), c = Nl(e), h = K(en, i), d = K(Ji, i);
    return u`<div
      class="shutter-mark ${Fi(e, o) ? "on" : "off"}"
      style="left:${l.x / t.width * 100}%; top:${l.y / t.height * 100}%;
             width:${h};height:${h};
             transform:translate(-50%,-50%)
                       translate(calc(${c.x} * ${d}), calc(${c.y} * ${d}));
             --fp-active:${a};"
      title=${`${o?.attributes?.friendly_name ?? n} — shown on the card, tap it there to open its dialog`}
    >
      <ha-icon icon=${s} style="--mdc-icon-size:${K(
      tn,
      i
    )};"></ha-icon>
    </div>`;
  }
  _renderItemOverlay(e, t, i) {
    const n = this._isSel("item", e.id), o = e.entity ? this.hass?.states[e.entity] : void 0, r = vo(e, o, e.entity ? this.hass?.entities?.[e.entity]?.icon : void 0), { text: s, live: a } = pg(this.hass, e), l = H(e.size, at), c = _i(e) !== "none", h = e.display ?? "badge", d = ar(e, o), p = G(kn(e.stateColor, d)), f = bl(e, p), m = _i(e) === "value" ? El(this.hass, e) : void 0, b = Ke(e.entity, o?.state), v = b ? G(e.activeColor) ?? ll(o) : void 0, x = !!this.hass && xo(e, o?.state), $ = b || x ? void 0 : G(e.inactiveColor), y = Wa(
      Ri(p ?? v ?? $, this._config?.palette)
    ), w = e.rippleColor ?? p ?? v ?? Y, E = e.rippleSize ?? bn, I = e.rippleDirection ?? _n, C = e.rippleWidth ?? vn, B = xl(e, o?.state, o?.attributes), V = K(l, i), D = u`<div
      class="badge ${c ? "" : "ghost"} ${p ? "state-colored" : b ? "active-colored" : $ ? "inactive-colored" : ""}"
      style="width:${V};height:${V};transform:rotate(${H(e.angle, 0)}deg);${p ? `--fp-state:${p};` : ""}${v ? `--fp-active:${v};` : ""}${$ ? `--fp-inactive:${$};` : ""}${y ? `--fp-ink:${y};` : ""}"
    >
      ${m ? u`<span
            class="badge-value"
            style="font-size:${K(Cl(l, m), i)};"
            >${m}</span
          >` : u`<ha-icon
            class=${B ? `anim-${B}` : ""}
            icon=${r}
            style="--mdc-icon-size:${K(kl(l), i)};"
          ></ha-icon>`}
    </div>`;
    let L;
    h === "ripple" ? L = on(!0, w, E, I, C, 3, i) : h === "iconRipple" ? L = u`<div class="stack">
        ${on(!0, w, E, I, C, 3, i)}
        <div class="stack-icon">${D}</div>
      </div>` : L = D;
    const T = fl(e, o?.state);
    return u`
      <div
        class="edit-item ${n ? "selected" : ""} ${T ? "card-hidden" : ""}"
        style="left:${e.x / t.width * 100}%; top:${e.y / t.height * 100}%;"
        @pointerdown=${(ge) => this._onOverlayDown(ge, { kind: "item", id: e.id })}
        @pointermove=${this._onOverlayMove}
        @pointerup=${this._onOverlayUp}
        @pointercancel=${this._onPointerCancel}
      >
        ${L}
        <!-- The card's own label line when there is one (issue #135), so
             turning Show state on is visible here rather than only after
             leaving the editor; otherwise the dim identification fallback.
             The Labels toolbar toggle hides either on dense plans (issue
             #52), and the size previews the card's labelSize (issue #59). -->
        ${this._hideLabels ? g : u`<span
            class="ilabel ${a ? "live" : ""} ilabel-${rr(e)}"
            style="font-size:${K(
      a || e.labelSize != null ? yl(e.labelSize) : 11,
      i
    )};${a && f ? `color:${f};` : ""}"
            >${s}</span
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
               font-size:${K(H(e.size, ai), i)};
               color:${ve(e.color, Ka)};
               transform:translate(-50%,-50%) rotate(${H(e.angle, 0)}deg);"
        @pointerdown=${(o) => this._onOverlayDown(o, { kind: "text", id: e.id })}
        @pointermove=${this._onOverlayMove}
        @pointerup=${this._onOverlayUp}
        @pointercancel=${this._onPointerCancel}
      >
        ${Jo(this.hass, e) || "…"}
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
          ${this._projectOpen ? g : u`<span class="section-summary"
                >${this._config.title || "Untitled"} · ${this._config.width}×${this._config.height}</span
              >`}
        </button>
        ${this._projectOpen ? this._renderPanelBody() : g}
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
    const e = this._config, t = (n) => this._patchConfig(n), i = Fb(e);
    return u`
      <div class="rows panel-body">
        ${this._renderGroup(
      "Project",
      this._renderForm(Ib(e), (n, o) => {
        "grid" in n && typeof n.grid == "number" && (n = { ...n, ...this._gridPatch(n.grid) }), o ? this._patchConfigLive(n) : this._patchConfig(n);
      })
    )}
        ${this._renderGroup(
      // The plan's own look: its palette, its paper, and the one drawing
      // convention that is a plan-wide choice rather than an element's.
      "Look",
      this._renderForm(Lb(e), t),
      this._renderColorRow({
        label: "Background",
        value: e.background,
        swatch: "#ffffff",
        placeholder: "#ffffff or empty",
        onLive: (n) => this._patchConfigLive({ background: n }),
        onCommit: (n) => this._patchConfig({ background: n })
      }),
      this._renderForm(Rb(e), t)
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
      this._renderForm(Db(this._floor()), (n, o) => {
        o ? this._patchFloorLive(n) : this._commitFloor(n);
      })
    )}
        ${this._renderGroup(
      // How the card is framed on the dashboard, as opposed to what is
      // drawn inside it. Set once for a surface and rarely touched again.
      "Display",
      this._renderForm(
        Pe(i, [
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
      this._renderForm(Nb(e), t),
      e.sunlight ? u`${this._renderColorRow({
        label: "Sun color",
        title: "Color of the light the openings let in",
        value: e.sunlightColor,
        swatch: "#ffd9a0",
        placeholder: "(warm white)",
        onLive: (n) => this._patchConfigLive({ sunlightColor: n }),
        onCommit: (n) => this._patchConfig({ sunlightColor: n })
      })}
              ${e.sunShade === !1 ? g : this._renderColorRow({
        label: "Shade color",
        title: "Color of everywhere the light does not reach",
        value: e.sunShadeColor,
        swatch: "#000000",
        placeholder: "(black)",
        onLive: (n) => this._patchConfigLive({ sunShadeColor: n }),
        onCommit: (n) => this._patchConfig({ sunShadeColor: n })
      })}` : g
    )}
        ${this._renderGroup(
      // The other half of following the sun, and a separate switch: this
      // one dims the whole plan after dark rather than casting anything.
      "Night dimming",
      this._renderForm(zb(e), t)
    )}
        ${this._renderGroup(
      // How devices look and answer, plan-wide. "Offline devices" lived
      // under display, beside the card's rotation, which is not what it is
      // about.
      "Devices",
      this._renderForm(Ob(e), t),
      this._renderForm(Pe(i, ["offlineStyle"]), t),
      this._renderForm(Pb(e), t)
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
    const e = this._config.palette ?? [], t = (n) => this._patchConfig({ palette: n.length ? n : void 0 }), i = (n, o, r = !1) => {
      const s = e.map((a, l) => l === n ? { ...a, ...o } : a);
      r ? this._patchConfigLive({ palette: s }) : this._patchConfig({ palette: s });
    };
    return u`
      <div class="row col palette-panel">
        <label>Named colors</label>
        ${e.length ? g : u`<span class="hint"
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
                @change=${(r) => this._renamePaletteColor(o, r.target)}
              />
              <input
                type="color"
                .value=${this._swatchValue(n.color, "#ff8800")}
                @input=${(r) => i(o, { color: r.target.value }, !0)}
              />
              <input
                type="text"
                class="palette-color"
                placeholder="#ff8800"
                .value=${n.color ?? ""}
                @change=${(r) => this._recolorPaletteColor(o, r.target)}
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
        ${this._paletteError ? u`<div class="symbol-error">${this._paletteError}</div>` : g}
        ${e.length >= Zl ? g : u`<div class="row wide state-color-add">
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
    const t = new Set(e.map((i) => de(i.name)));
    for (let i = 1; ; i++) {
      const n = `Color ${i}`;
      if (!t.has(de(n))) return n;
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
    const o = t.value.trim(), r = de(n.name), s = de(o);
    if (r === s) {
      if (this._paletteError = "", o === (n.name ?? "")) {
        t.value = o;
        return;
      }
      this._patchConfig({ palette: i.map((c, h) => h === e ? { ...c, name: o } : c) });
      return;
    }
    if (s && i.some((c, h) => h !== e && de(c.name) === s)) {
      this._paletteError = `Another color is already called “${o}”.`, t.value = n.name ?? "";
      return;
    }
    this._paletteError = "";
    const a = i.map((c, h) => h === e ? { ...c, name: o } : c), l = { ...this._config, palette: a };
    this._patchConfig(
      // Same shadowing caveat as delete: if another entry still declares the old
      // slug, its references are none of this rename's business.
      this._slugStillResolves(r, l) ? l : (
        // An empty new name leaves the entry unusable, so its references have
        // nothing to point at — freeze them at the colour, as a delete does.
        Us(l, r, s ? Hs(o) : n.color)
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
    if (!G(o)) {
      this._paletteError = o ? `“${o}” is not a color the card can use.` : "A named color needs a color. Use the remove button to take the name away.", t.value = n.color ?? "";
      return;
    }
    this._paletteError = "", this._patchConfig({ palette: i.map((r, s) => s === e ? { ...r, color: o } : r) });
  }
  _removePaletteColor(e) {
    const t = this._config.palette ?? [], i = t[e];
    if (!i) return;
    this._paletteError = "";
    const n = t.filter((r, s) => s !== e), o = { ...this._config, palette: n.length ? n : void 0 };
    this._patchConfig(
      this._slugStillResolves(de(i.name), o) ? o : Us(o, de(i.name), i.color)
    );
  }
  /** Whether a slug is still declared by the palette in `config`. */
  _slugStillResolves(e, t) {
    return e ? vi(t.palette).some((i) => de(i.name) === e) : !1;
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
            </div>` : g}
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
        ${this._symbolError ? u`<div class="symbol-error">${this._symbolError}</div>` : g}
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
    if (!e || this._selection.length !== 1) return u`${g}`;
    if (e.kind === "opening") {
      const t = this._floor().openings.find((r) => r.id === e.id);
      if (!t) return u`${g}`;
      const i = gb(t, (r) => this._supportedFeatures(r)), n = (r, s) => {
        if ("entity" in r) {
          const a = r.entity, l = a ? this.hass?.states[a]?.attributes?.device_class : void 0;
          r = { ...r, ...l ? Ug(l) : {} };
        }
        this._applyElementPatch("opening", t.id, r, s);
      }, o = (r, s, ...a) => {
        const l = Pe(i, s);
        return !l.fields.length && !a.some((c) => c && c !== g) ? g : this._renderGroup(r, this._renderForm(l, n), ...a);
      };
      return u`
        ${P.OPENING_GROUPS.map(
        ([r, s]) => r === "Color" ? o(
          r,
          s,
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
          })}` : g
        ) : r === "Shutter" ? o(
          r,
          s,
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
          }) : g
        ) : o(r, s)
      )}
      `;
    }
    if (e.kind === "item") {
      const t = this._floor().items.find((l) => l.id === e.id);
      if (!t) return u`${g}`;
      const i = this._areaEntitiesAt(t.x, t.y), n = t.entity ? this.hass?.states[t.entity]?.attributes?.device_class : void 0, o = (l) => (l ? this.hass?.states[l]?.attributes?.friendly_name : void 0) ?? l, r = {
        source: Tl(this.hass, t)?.source ?? "primary",
        primaryLabel: o(t.entity),
        // One label per reading, positionally — the dropdown names each rather
        // than numbering them, and a reading with no entity of its own is read
        // off this device, so that is the name to show for it (issue #180).
        readingLabels: tt(t).map((l) => o(l.entity || t.entity))
      }, s = (l, c) => {
        "entity" in l && typeof l.entity == "string" && (l = { ...l, kind: Ps(l.entity) }), this._applyElementPatch("item", t.id, l, c);
      }, a = wb(t, n);
      return u`
        ${this._renderGroup("Identity", this._renderForm(bb(t), s))}
        ${this._renderGroup(
        "What it reads",
        // Entity, its attribute, whether its own state shows, then every
        // other entity — the order the label prints them in (issue #180).
        this._renderForm(yb(t, i), s),
        this._renderForm(_b(t), s),
        this._renderItemReadings(t)
      )}
        ${hg(t) ? this._renderGroup(
        "Label",
        this._renderForm(vb(t), s),
        t.disableLabelColor && t.useCustomLabelColor ? this._renderColorRow({
          label: "Custom color",
          value: t.labelCustomColor,
          swatch: "#ffffff",
          placeholder: "e.g. #ff0000 or red",
          onLive: (l) => this._updateItemLive(t.id, { labelCustomColor: l }),
          onCommit: (l) => this._updateItem(t.id, { labelCustomColor: l })
        }) : g
      ) : g}
        ${this._renderGroup(
        "Badge",
        this._renderForm(xb(t, r), s),
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
        this._renderForm(a, s),
        // The ring's colour belongs with the ring, not with the badge's.
        wl(t.entity, n) && vr(t) ? this._renderColorRow({
          label: "Ripple color",
          value: t.rippleColor,
          swatch: t.activeColor ?? "#03a9f4",
          placeholder: t.activeColor ? "(active color)" : "(primary)",
          onLive: (l) => this._updateItemLive(t.id, { rippleColor: l }),
          onCommit: (l) => this._updateItem(t.id, { rippleColor: l })
        }) : g
      ) : g}
        ${this._renderGroup("Behaviour", this._renderForm(kb(t), s))}
        ${this._renderGroup("Visibility", this._renderForm($b(t), s))}
      `;
    }
    if (e.kind === "text") {
      const t = this._floor().texts.find((i) => i.id === e.id);
      return t ? u`
        ${this._renderForm(
        Sb(t, this._areaEntitiesAt(t.x, t.y)),
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
      ` : u`${g}`;
    }
    if (e.kind === "furniture") {
      const t = this._floor().furniture.find((o) => o.id === e.id);
      if (!t) return u`${g}`;
      const i = Eb(t, this._areaEntitiesAt(t.x, t.y), this._symbols()), n = (o, r) => this._applyElementPatch("furniture", t.id, o, r);
      return u`
        ${P.FURNITURE_GROUPS.map(
        ([o, r]) => this._renderGroup(o, this._renderForm(Pe(i, r), n))
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
              ` : g
      )}
      `;
    }
    if (e.kind === "area") {
      const t = (this._floor().areas ?? []).find((s) => s.id === e.id);
      if (!t) return u`${g}`;
      const i = Lh(this.hass), n = t.haArea ? this._pendingAreaEntities(t) : [], o = Cb(t), r = (s, a) => this._applyElementPatch("area", t.id, s, a);
      return u`
        ${this._renderGroup(
        // The name doubles as the HA-area link, so the link status line and
        // the name-related toggles belong with it.
        "Identity",
        this._renderForm(
          Tb(t, i.map((s) => s.name)),
          (s, a) => (
            // A name change also decides `haArea` (see areaNamePatch).
            this._applyElementPatch("area", t.id, Fh(s, i), a)
          )
        ),
        this._renderAreaLinkRow(t, i),
        this._renderForm(Pe(o, ["showName", "labelSize"]), r)
      )}
        ${this._renderGroup(
        "Room type & sidebar",
        u`<fp-ef-area-extras
            .hass=${this.hass}
            .area=${t}
            @area-patch=${(s) => r(s.detail, !1)}
          ></fp-ef-area-extras>`
      )}
        ${this._renderGroup(
        "What it reads",
        this._renderForm(Pe(o, ["entity"]), r)
      )}
        ${this._renderGroup(
        "Color",
        this._renderForm(Pe(o, ["highlight", "opacity", "activeOpacity"]), r),
        this._renderColorRow({
          label: "Color",
          value: t.color,
          swatch: "#03a9f4",
          placeholder: "(primary)",
          onLive: (s) => this._updateAreaLive(t.id, { color: s }),
          onCommit: (s) => this._updateArea(t.id, { color: s })
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
          onLive: (s) => this._updateAreaLive(t.id, { activeColor: s }),
          onCommit: (s) => this._updateArea(t.id, { activeColor: s })
        })}
                ${this._renderStateColorRules(
          t.stateColor,
          (s) => this._updateArea(t.id, { stateColor: s })
        )}
              ` : g
      )}
        ${this._renderGroup(
        // What tapping the room does (issue #181). Last, as it is on every
        // other element: the thing it *does*, after everything it *is*.
        "Behavior",
        this._renderForm(
          Pe(o, [
            "fitZoom",
            "zoom",
            "tap_action",
            "hold_action",
            "double_tap_action"
          ]),
          r
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
                  @change=${(s) => this._updateArea(t.id, {
          filterEntities: s.target.checked
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
      ) : g}
        <p class="hint">
          Drag inside the fill to move the whole room; drag a vertex handle to reshape it.
        </p>
      `;
    }
    if (e.kind === "tracker") {
      const t = (this._floor().trackers ?? []).find((o) => o.id === e.id);
      if (!t) return u`${g}`;
      const i = Ab(t), n = (o, r) => this._applyElementPatch("tracker", t.id, o, r);
      return u`
        ${this._renderGroup(
        "Zone",
        this._renderForm(Pe(i, P.TRACKER_GROUPS[0][1]), n)
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
        this._renderForm(Pe(i, P.TRACKER_GROUPS[1][1]), n),
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
      if (!t) return u`${g}`;
      const i = Math.round(Math.hypot(t.x2 - t.x1, t.y2 - t.y1));
      return u`
        ${this._renderForm(
        Mb(t),
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
        const o = n.target, r = Number(o.value);
        if (o.value === "" || !(r >= 1)) {
          o.value = String(i);
          return;
        }
        const s = t.x2 - t.x1, a = t.y2 - t.y1, l = Math.hypot(s, a), c = l > 0 ? s / l : 1, h = l > 0 ? a / l : 0;
        this._updateWall(t.id, {
          x2: Math.round(t.x1 + c * r),
          y2: Math.round(t.y1 + h * r)
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
    return u`${g}`;
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
      const r = o.target, s = Number(r.value);
      r.value !== "" && Number.isFinite(s) ? this._updateTrackerSensor(e.id, t, { min: s }) : r.value = String(n.min);
    }}
            />
            <input
              class="num"
              type="number"
              step="0.01"
              title="Reading at the far edge"
              .value=${String(n.max)}
              @change=${(o) => {
      const r = o.target, s = Number(r.value);
      r.value !== "" && Number.isFinite(s) ? this._updateTrackerSensor(e.id, t, { max: s }) : r.value = String(n.max);
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
                </label>` : g}
          </div>` : g}
    `;
  }
};
P._nextWallMaskId = 0;
P.OPENING_GROUPS = [
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
P.FURNITURE_GROUPS = [
  ["Shape", ["type", "hand", "w", "h", "angle"]],
  ["What it reads", ["entity"]],
  // What clicking it does — a staircase that changes floor (issue #121).
  ["Behavior", ["goToFloor"]]
];
P.TRACKER_GROUPS = [
  ["Zone", ["w", "h", "x", "y", "angle"]],
  ["Marker", ["dotSize"]]
];
P.styles = [
  qa,
  fe`
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
      width: ${Yi}px;
      height: ${Yi}px;
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
O([
  A({ attribute: !1 })
], P.prototype, "hass", 2);
O([
  A({ type: Boolean })
], P.prototype, "panelMode", 2);
O([
  A({ attribute: !1 })
], P.prototype, "panelError", 2);
O([
  k()
], P.prototype, "_config", 2);
O([
  k()
], P.prototype, "_tool", 2);
O([
  k()
], P.prototype, "_selection", 2);
O([
  k()
], P.prototype, "_activeFloorId", 2);
O([
  k()
], P.prototype, "_draft", 2);
O([
  k()
], P.prototype, "_draftTracker", 2);
O([
  k()
], P.prototype, "_areaShape", 2);
O([
  k()
], P.prototype, "_draftArea", 2);
O([
  k()
], P.prototype, "_areaHover", 2);
O([
  k()
], P.prototype, "_freeWalls", 2);
O([
  k()
], P.prototype, "_defaultOpeningLength", 2);
O([
  k()
], P.prototype, "_marquee", 2);
O([
  k()
], P.prototype, "_history", 2);
O([
  k()
], P.prototype, "_future", 2);
O([
  k()
], P.prototype, "_zoom", 2);
O([
  k()
], P.prototype, "_floorMenuOpen", 2);
O([
  k()
], P.prototype, "_addMenuOpen", 2);
O([
  k()
], P.prototype, "_addQuery", 2);
O([
  k()
], P.prototype, "_symbolDraft", 2);
O([
  k()
], P.prototype, "_symbolError", 2);
O([
  k()
], P.prototype, "_paletteError", 2);
O([
  k()
], P.prototype, "_projectOpen", 2);
O([
  k()
], P.prototype, "_openGroups", 2);
O([
  k()
], P.prototype, "_fullscreen", 2);
O([
  k()
], P.prototype, "_applyState", 2);
O([
  k()
], P.prototype, "_applyError", 2);
O([
  Bt(".editor")
], P.prototype, "_editorEl", 2);
O([
  Bt("svg")
], P.prototype, "_svg", 2);
O([
  Bt(".canvas-wrap")
], P.prototype, "_canvasWrap", 2);
O([
  k()
], P.prototype, "_hideLabels", 2);
O([
  k()
], P.prototype, "_guides", 2);
O([
  k()
], P.prototype, "_ctx", 2);
P = O([
  pn("fp-ef-editor")
], P);
const Vb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get FloorplanCardEditor() {
    return P;
  }
}, Symbol.toStringTag, { value: "Module" }));
var Yb = Object.defineProperty, Zb = Object.getOwnPropertyDescriptor, gt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Zb(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Yb(t, i, o), o;
};
const Xb = /* @__PURE__ */ new Set(["light", "switch", "fan", "input_boolean", "siren"]), Qb = 1.35, Jb = 34, sc = 380, ac = 700, e_ = 0.55;
let t_ = 0, We = class extends le {
  constructor() {
    super(...arguments), this.popupOpen = !1, this._box = { w: 0, h: 0 }, this._maskId = `fp-wall-mask-${++t_}`;
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
    const { w: e, h: t } = ho(this.floor, this.plan), i = getComputedStyle(this), n = this.clientWidth - parseFloat(i.paddingLeft) - parseFloat(i.paddingRight), o = this.clientHeight - parseFloat(i.paddingTop) - parseFloat(i.paddingBottom);
    if (!n || !o) return;
    const r = Math.min(n / e, o / t), s = Math.floor(e * r), a = Math.floor(t * r);
    (s !== this._box.w || a !== this._box.h) && (this._box = { w: s, h: a });
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
    n === "auto" && (eo(i) ? n = "toggle" : n = Xb.has(ye(i)) ? "toggle" : "more-info"), n !== "none" && (n === "more-info" ? Ui(this, i) : eo(i) ? await io(this.hass, i) : await va(this.hass, i));
  }
  _onItemContext(e, t) {
    t.entity && (e.preventDefault(), Ui(this, t.entity));
  }
  render() {
    if (!this.plan || !this.floor) return g;
    const e = this.floor, t = ho(e, this.plan), { w: i, h: n } = t, o = e.areas.find((l) => l.id === this.zoomedAreaId);
    let r = o ? vd(
      o.points.map((l) => ({ x: l.x - t.x, y: l.y - t.y })),
      i,
      n,
      void 0,
      void 0,
      xd(o)
    ) : co;
    o && this.popupOpen && r.scale > 1 && (r = this._shiftForPopup(r));
    const s = r.scale > 1 ? Qb / r.scale : 1, a = Math.max(this.plan.canvas.width, this.plan.canvas.height) / 45;
    return u`
      <div
        class="plan"
        style="width:${this._box.w}px;height:${this._box.h}px"
        @click=${() => this._emit("background-click")}
      >
        <div
          class="plan-zoom"
          style="transform:translate(${r.txPercent}%, ${r.tyPercent}%) scale(${r.scale});--fp-inv-zoom:${s}"
        >
          <svg viewBox="${t.x} ${t.y} ${i} ${n}" preserveAspectRatio="xMidYMid meet">
            <g class="areas">
              ${e.areas.map(
      (l) => _`<g @click=${(c) => this._onAreaClick(c, l.id)}>${Na(l, {
        hass: this.hass,
        selected: l.id === this.zoomedAreaId,
        dimmed: !!o && l.id !== o.id,
        labelSize: a
      })}</g>`
    )}
            </g>
            <g class="furniture-layer">${e.items.map((l) => this._renderFurniture(l))}</g>
            ${Nd(e, this.plan, this.hass, `${this._maskId}-glow`)}
            ${Da(e, this.plan, this._maskId)} ${Vd(e, this.plan, { hass: this.hass })}
          </svg>
          <div class="items">
            ${e.items.filter((l) => !$d(l, o, e.areas)).map((l) => this._renderItem(l, t))}
          </div>
        </div>
      </div>
    `;
  }
  /** Verschiebt den gezoomten Raum in den Bereich, den das Popup frei lässt (links bzw. oben). */
  _shiftForPopup(e) {
    return !this._box.w || !this._box.h ? e : this.clientWidth < ac ? { ...e, tyPercent: e.tyPercent - this.clientHeight * e_ / 2 / this._box.h * 100 } : { ...e, txPercent: e.txPercent - (sc + 32) / 2 / this._box.w * 100 };
  }
  _renderFurniture(e) {
    const t = Ne(this.plan?.furniture, e.furnitureType);
    return t ? ao(e, t, { fill: Ma(e, dt(e.entity ? this.hass.states[e.entity] : void 0)) }) : g;
  }
  _renderItem(e, t) {
    if (!Ca(e, this.plan?.furniture)) return g;
    const i = t.w, n = t.h, o = e.entity ? this.hass.states[e.entity] : void 0, r = dt(o), s = !!e.entity && to(o), a = e.icon ?? (e.entity ? Ae(this.hass, e.entity) : "mdi:map-marker"), l = e.size ?? Jb, c = r ? e.activeColor ?? "var(--fp-active-color, #ffb300)" : e.color ?? "", h = e.label ?? o?.attributes.friendly_name ?? e.entity ?? "";
    return u`
      <div
        class="item ${r ? "active" : ""} ${s ? "unavailable" : ""} ${e.entity ? "interactive" : ""}"
        style="left:${(e.x - t.x) / i * 100}%;top:${(e.y - t.y) / n * 100}%;--fp-item-size:${l}px;${c ? `--fp-item-color:${c}` : ""}"
        title=${h}
        @click=${(d) => this._onItemClick(d, e)}
        @contextmenu=${(d) => this._onItemContext(d, e)}
      >
        <div class="badge"><ha-icon .icon=${a}></ha-icon></div>
        ${e.label ? u`<div class="label">${e.label}</div>` : g}
        ${e.showState && o ? u`<div class="state">${_a(this.hass, o)}</div>` : g}
      </div>
    `;
  }
};
We.styles = [
  Be(Ua),
  Be(Uo),
  fe`
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
gt([
  A({ attribute: !1 })
], We.prototype, "hass", 2);
gt([
  A({ attribute: !1 })
], We.prototype, "plan", 2);
gt([
  A({ attribute: !1 })
], We.prototype, "floor", 2);
gt([
  A({ attribute: !1 })
], We.prototype, "zoomedAreaId", 2);
gt([
  A({ type: Boolean })
], We.prototype, "popupOpen", 2);
gt([
  k()
], We.prototype, "_box", 2);
We = gt([
  Ge("fp-plan-view")
], We);
var i_ = Object.defineProperty, n_ = Object.getOwnPropertyDescriptor, Cn = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? n_(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && i_(t, i, o), o;
};
const o_ = [
  { kind: "device", title: "Geräte" },
  { kind: "scene", title: "Szenen" },
  { kind: "script", title: "Skripte" }
];
let Rt = class extends le {
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
    if (!this.area) return g;
    const e = this.area.sidebar ?? [], t = e.filter((i) => Hi(i.entity) === "device" && dt(this.hass.states[i.entity])).length;
    return u`
      <header>
        <div class="title">
          <h2>${this.area.name || "Raum"}</h2>
          <span class="sub">${e.length ? `${t} aktiv` : ""}</span>
        </div>
        ${this.canEdit ? u`<button class="icon-btn" title="Seitenleiste bearbeiten" @click=${this._edit}>
              <ha-icon icon="mdi:pencil"></ha-icon>
            </button>` : g}
        <button class="icon-btn" title="Schließen" @click=${this._close}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </header>
      <div class="content">
        ${e.length === 0 ? u`<p class="empty">
              Diesem Raum ist noch nichts zugeordnet.${this.canEdit ? u` Im Editor lassen sich Geräte, Szenen und Skripte für die Seitenleiste auswählen.` : g}
            </p>` : o_.map(({ kind: i, title: n }) => {
      const o = e.filter((r) => Hi(r.entity) === i);
      return o.length ? u`<section>
                <h3>${n}</h3>
                ${i === "device" ? o.map((r) => this._renderRow(r)) : u`<div class="chips">${o.map((r) => this._renderChip(r))}</div>`}
              </section>` : g;
    })}
      </div>
    `;
  }
  _renderRow(e) {
    const t = this.hass.states[e.entity], i = dt(t), n = to(t), o = e.name || fi(this.hass, e.entity), r = ye(e.entity);
    return u`
      <div class="row ${i ? "active" : ""} ${n ? "unavailable" : ""}">
        <button class="row-main" @click=${() => Ui(this, e.entity)} title="Details">
          <span class="row-icon"><ha-icon .icon=${Ae(this.hass, e.entity, e.icon)}></ha-icon></span>
          <span class="row-text">
            <span class="name">${o}</span>
            <span class="state">${_a(this.hass, t)}</span>
          </span>
        </button>
        ${n ? g : r === "cover" ? u`<span class="cover-btns">
              <button class="icon-btn" title="Öffnen" @click=${() => this._call("cover", "open_cover", e.entity)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button class="icon-btn" title="Stopp" @click=${() => this._call("cover", "stop_cover", e.entity)}>
                <ha-icon icon="mdi:stop"></ha-icon>
              </button>
              <button class="icon-btn" title="Schließen" @click=${() => this._call("cover", "close_cover", e.entity)}>
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
            </span>` : eo(e.entity) ? u`<button class="run" @click=${() => io(this.hass, e.entity)}>Ausführen</button>` : rd(e.entity) ? u`<button
              class="switch ${i ? "on" : ""}"
              role="switch"
              aria-checked=${i ? "true" : "false"}
              title=${i ? "Ausschalten" : "Einschalten"}
              @click=${() => va(this.hass, e.entity)}
            >
              <span class="knob"></span>
            </button>` : g}
      </div>
    `;
  }
  _renderChip(e) {
    const t = this.hass.states[e.entity], i = e.name || fi(this.hass, e.entity), n = ye(e.entity) === "script" && t?.state === "on";
    return u`
      <button
        class="chip ${n ? "running" : ""}"
        ?disabled=${to(t)}
        title=${e.entity}
        @click=${() => io(this.hass, e.entity)}
        @contextmenu=${(o) => {
      o.preventDefault(), Ui(this, e.entity);
    }}
      >
        <ha-icon .icon=${Ae(this.hass, e.entity, e.icon)}></ha-icon>
        <span>${i}</span>
      </button>
    `;
  }
  _call(e, t, i) {
    this.hass.callService(e, t, { entity_id: i });
  }
};
Rt.styles = fe`
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
Cn([
  A({ attribute: !1 })
], Rt.prototype, "hass", 2);
Cn([
  A({ attribute: !1 })
], Rt.prototype, "area", 2);
Cn([
  A({ type: Boolean })
], Rt.prototype, "canEdit", 2);
Rt = Cn([
  Ge("fp-room-sidebar")
], Rt);
var r_ = Object.defineProperty, s_ = Object.getOwnPropertyDescriptor, $i = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? s_(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && r_(t, i, o), o;
};
let ht = class extends le {
  constructor() {
    super(...arguments), this.canEdit = !1, this.sheet = !1, this._onKey = (e) => {
      e.key === "Escape" && this._close();
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._onKey), this._ro = new ResizeObserver(() => this.sheet = this.clientWidth < ac), this._ro.observe(this);
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
    ` : g;
  }
};
ht.styles = fe`
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
      width: ${sc}px;
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
$i([
  A({ attribute: !1 })
], ht.prototype, "hass", 2);
$i([
  A({ attribute: !1 })
], ht.prototype, "area", 2);
$i([
  A({ type: Boolean })
], ht.prototype, "canEdit", 2);
$i([
  A({ type: Boolean, reflect: !0 })
], ht.prototype, "sheet", 2);
ht = $i([
  Ge("fp-room-dialog")
], ht);
/*! js-yaml 5.4.3 https://github.com/nodeca/js-yaml @license MIT */
var F = Symbol("NOT_RESOLVED");
function pe(e, t) {
  return {
    tagName: e,
    nodeKind: "scalar",
    implicit: t.implicit ?? !1,
    matchByTagPrefix: t.matchByTagPrefix ?? !1,
    implicitFirstChars: t.implicitFirstChars ?? null,
    resolve: t.resolve,
    identify: t.identify,
    represent: t.represent ?? ((i) => String(i)),
    representTagName: t.representTagName ?? (() => e)
  };
}
function xr(e, t) {
  const i = t.finalize === void 0;
  return {
    tagName: e,
    nodeKind: "sequence",
    implicit: !1,
    matchByTagPrefix: t.matchByTagPrefix ?? !1,
    create: t.create,
    addItem: t.addItem,
    finalize: t.finalize ?? ((n) => n),
    carrierIsResult: i,
    identify: t.identify,
    represent: t.represent ?? ((n) => n),
    representTagName: t.representTagName ?? (() => e)
  };
}
function Mn(e, t) {
  const i = t.finalize === void 0;
  return {
    tagName: e,
    nodeKind: "mapping",
    implicit: !1,
    matchByTagPrefix: t.matchByTagPrefix ?? !1,
    create: t.create,
    addPair: t.addPair,
    has: t.has,
    keys: t.keys,
    get: t.get,
    finalize: t.finalize ?? ((n) => n),
    carrierIsResult: i,
    identify: t.identify,
    represent: t.represent ?? ((n) => n),
    representTagName: t.representTagName ?? (() => e)
  };
}
var a_ = pe("tag:yaml.org,2002:str", {
  resolve: (e) => e,
  identify: (e) => typeof e == "string"
}), l_ = [
  "",
  "~",
  "null",
  "Null",
  "NULL"
], c_ = pe("tag:yaml.org,2002:null", {
  implicit: !0,
  implicitFirstChars: [
    "",
    "~",
    "n",
    "N"
  ],
  resolve: (e) => l_.indexOf(e) !== -1 ? null : F,
  identify: (e) => e === null,
  represent: () => "null"
}), d_ = pe("tag:yaml.org,2002:null", {
  implicit: !0,
  implicitFirstChars: ["n"],
  resolve: (e, t) => e === "null" || t && e === "" ? null : F,
  identify: (e) => e === null,
  represent: () => "null"
}), h_ = [
  "",
  "~",
  "null",
  "Null",
  "NULL"
], p_ = pe("tag:yaml.org,2002:null", {
  implicit: !0,
  implicitFirstChars: [
    "",
    "~",
    "n",
    "N"
  ],
  resolve: (e) => h_.indexOf(e) !== -1 ? null : F,
  identify: (e) => e === null,
  represent: () => "null"
}), u_ = [
  "true",
  "True",
  "TRUE"
], f_ = [
  "false",
  "False",
  "FALSE"
], m_ = pe("tag:yaml.org,2002:bool", {
  implicit: !0,
  implicitFirstChars: [
    "t",
    "T",
    "f",
    "F"
  ],
  resolve: (e) => u_.indexOf(e) !== -1 ? !0 : f_.indexOf(e) !== -1 ? !1 : F,
  identify: (e) => Object.prototype.toString.call(e) === "[object Boolean]",
  represent: (e) => e ? "true" : "false"
}), g_ = ["true"], y_ = ["false"], b_ = pe("tag:yaml.org,2002:bool", {
  implicit: !0,
  implicitFirstChars: ["t", "f"],
  resolve: (e) => g_.indexOf(e) !== -1 ? !0 : y_.indexOf(e) !== -1 ? !1 : F,
  identify: (e) => Object.prototype.toString.call(e) === "[object Boolean]",
  represent: (e) => e ? "true" : "false"
}), __ = [
  "true",
  "True",
  "TRUE",
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON"
], v_ = [
  "false",
  "False",
  "FALSE",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], x_ = pe("tag:yaml.org,2002:bool", {
  implicit: !0,
  implicitFirstChars: [
    "y",
    "Y",
    "n",
    "N",
    "t",
    "T",
    "f",
    "F",
    "o",
    "O"
  ],
  resolve: (e) => __.indexOf(e) !== -1 ? !0 : v_.indexOf(e) !== -1 ? !1 : F,
  identify: (e) => Object.prototype.toString.call(e) === "[object Boolean]",
  represent: (e) => e ? "true" : "false"
}), w_ = /* @__PURE__ */ new RegExp("^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$"), $_ = /* @__PURE__ */ new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");
function k_(e) {
  let t = e, i = 1;
  return (t[0] === "-" || t[0] === "+") && (t[0] === "-" && (i = -1), t = t.slice(1)), t.startsWith("0b") ? i * parseInt(t.slice(2), 2) : t.startsWith("0o") ? i * parseInt(t.slice(2), 8) : t.startsWith("0x") ? i * parseInt(t.slice(2), 16) : i * parseInt(t, 10);
}
function S_(e, t) {
  if (t) {
    if (!$_.test(e)) return F;
  } else if (!w_.test(e)) return F;
  const i = k_(e);
  return Number.isFinite(i) ? i : F;
}
var lc = pe("tag:yaml.org,2002:int", {
  implicit: !0,
  implicitFirstChars: [
    "-",
    "+",
    ..."0123456789"
  ],
  resolve: S_,
  identify: (e) => Number.isInteger(e) && !Object.is(e, -0) && e.toString(10).indexOf("e") < 0,
  represent: (e) => e.toString(10)
}), E_ = /* @__PURE__ */ new RegExp("^-?(?:0|[1-9][0-9]*)$"), A_ = /* @__PURE__ */ new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");
function T_(e) {
  let t = e, i = 1;
  return (t[0] === "-" || t[0] === "+") && (t[0] === "-" && (i = -1), t = t.slice(1)), t.startsWith("0b") ? i * parseInt(t.slice(2), 2) : t.startsWith("0o") ? i * parseInt(t.slice(2), 8) : t.startsWith("0x") ? i * parseInt(t.slice(2), 16) : i * parseInt(t, 10);
}
function C_(e, t) {
  if (t) {
    if (!A_.test(e)) return F;
  } else if (!E_.test(e)) return F;
  const i = T_(e);
  return Number.isFinite(i) ? i : F;
}
var M_ = pe("tag:yaml.org,2002:int", {
  implicit: !0,
  implicitFirstChars: ["-", ..."0123456789"],
  resolve: C_,
  identify: (e) => Number.isInteger(e) && !Object.is(e, -0) && e.toString(10).indexOf("e") < 0,
  represent: (e) => e.toString(10)
}), I_ = /* @__PURE__ */ new RegExp("^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$");
function P_(e) {
  let t = e.replace(/_/g, ""), i = 1;
  if ((t[0] === "-" || t[0] === "+") && (t[0] === "-" && (i = -1), t = t.slice(1)), t.startsWith("0b")) return i * parseInt(t.slice(2), 2);
  if (t.startsWith("0x")) return i * parseInt(t.slice(2), 16);
  if (t.includes(":")) {
    let n = 0;
    for (const o of t.split(":")) n = n * 60 + Number(o);
    return i * n;
  }
  return t !== "0" && t[0] === "0" ? i * parseInt(t, 8) : i * parseInt(t, 10);
}
function O_(e) {
  if (!I_.test(e)) return F;
  const t = P_(e);
  return Number.isFinite(t) ? t : F;
}
var Co = pe("tag:yaml.org,2002:int", {
  implicit: !0,
  implicitFirstChars: [
    "-",
    "+",
    ..."0123456789"
  ],
  resolve: O_,
  identify: (e) => Number.isInteger(e) && !Object.is(e, -0) && e.toString(10).indexOf("e") < 0,
  represent: (e) => e.toString(10)
}), L_ = /* @__PURE__ */ new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"), F_ = /* @__PURE__ */ new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
function R_(e) {
  if (!L_.test(e)) return F;
  let t = e.toLowerCase();
  const i = t[0] === "-" ? -1 : 1;
  if ("+-".includes(t[0]) && (t = t.slice(1)), t === ".inf") return i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  if (t === ".nan") return NaN;
  const n = i * parseFloat(t);
  return Number.isFinite(n) || F_.test(e) ? n : F;
}
function z_(e) {
  if (isNaN(e)) return ".nan";
  if (e === Number.POSITIVE_INFINITY) return ".inf";
  if (e === Number.NEGATIVE_INFINITY) return "-.inf";
  if (Object.is(e, -0)) return "-0.0";
  const t = e.toString(10);
  return /^[-+]?[0-9]+e/.test(t) ? t.replace("e", ".e") : t;
}
var cc = pe("tag:yaml.org,2002:float", {
  implicit: !0,
  implicitFirstChars: [
    "-",
    "+",
    ".",
    ..."0123456789"
  ],
  resolve: R_,
  identify: (e) => typeof e == "number" && (!Number.isInteger(e) || Object.is(e, -0) || e.toString(10).indexOf("e") >= 0),
  represent: z_
}), N_ = /* @__PURE__ */ new RegExp("^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$"), D_ = /* @__PURE__ */ new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
function H_(e, t) {
  if (t) {
    if (!D_.test(e)) return F;
    let n = e.toLowerCase();
    const o = n[0] === "-" ? -1 : 1;
    if ("+-".includes(n[0]) && (n = n.slice(1)), n === ".inf") return o === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    if (n === ".nan") return NaN;
    const r = o * parseFloat(n);
    return Number.isFinite(r) ? r : F;
  }
  if (!N_.test(e)) return F;
  const i = Number(e);
  return Number.isFinite(i) ? i : F;
}
function U_(e) {
  if (isNaN(e)) return ".nan";
  if (e === Number.POSITIVE_INFINITY) return ".inf";
  if (e === Number.NEGATIVE_INFINITY) return "-.inf";
  if (Object.is(e, -0)) return "-0.0";
  const t = e.toString(10);
  return /^[-+]?[0-9]+e/.test(t) ? t.replace("e", ".e") : t;
}
var B_ = pe("tag:yaml.org,2002:float", {
  implicit: !0,
  implicitFirstChars: ["-", ..."0123456789"],
  resolve: H_,
  identify: (e) => typeof e == "number" && (!Number.isInteger(e) || Object.is(e, -0) || e.toString(10).indexOf("e") >= 0),
  represent: U_
}), j_ = /* @__PURE__ */ new RegExp("^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"), W_ = /* @__PURE__ */ new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
function G_(e) {
  if (!j_.test(e)) return F;
  let t = e.toLowerCase().replace(/_/g, "");
  const i = t[0] === "-" ? -1 : 1;
  if ("+-".includes(t[0]) && (t = t.slice(1)), t === ".inf") return i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  if (t === ".nan") return NaN;
  let n = 0;
  if (t.includes(":")) {
    for (const o of t.split(":")) n = n * 60 + Number(o);
    n *= i;
  } else n = i * parseFloat(t);
  return Number.isFinite(n) || W_.test(e) ? n : F;
}
function K_(e) {
  if (isNaN(e)) return ".nan";
  if (e === Number.POSITIVE_INFINITY) return ".inf";
  if (e === Number.NEGATIVE_INFINITY) return "-.inf";
  if (Object.is(e, -0)) return "-0.0";
  const t = e.toString(10);
  return /^[-+]?[0-9]+e/.test(t) ? t.replace("e", ".e") : t;
}
var Mo = pe("tag:yaml.org,2002:float", {
  implicit: !0,
  implicitFirstChars: [
    "-",
    "+",
    ".",
    ..."0123456789"
  ],
  resolve: G_,
  identify: (e) => typeof e == "number" && (!Number.isInteger(e) || Object.is(e, -0) || e.toString(10).indexOf("e") >= 0),
  represent: K_
}), q_ = pe("tag:yaml.org,2002:merge", {
  implicit: !0,
  implicitFirstChars: ["<"],
  resolve: (e, t) => e === "<<" || t && e === "" ? "<<" : F,
  identify: () => !1
}), V_ = /^[A-Za-z0-9+/]*={0,2}$/;
function Y_(e) {
  const t = e.replace(/\s/g, "");
  if (t.length % 4 !== 0 || !V_.test(t)) return F;
  const i = atob(t), n = new Uint8Array(i.length);
  for (let o = 0; o < i.length; o++) n[o] = i.charCodeAt(o);
  return n;
}
function Z_(e) {
  let t = "";
  for (let i = 0; i < e.length; i++) t += String.fromCharCode(e[i]);
  return btoa(t);
}
var X_ = pe("tag:yaml.org,2002:binary", {
  resolve: Y_,
  identify: (e) => Object.prototype.toString.call(e) === "[object Uint8Array]",
  represent: Z_
}), Q_ = /* @__PURE__ */ new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"), J_ = /* @__PURE__ */ new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");
function Xs(e, t, i, n = 0, o = 0, r = 0, s = 0) {
  const a = new Date(Date.UTC(e, t, i, n, o, r, s));
  return a.setUTCFullYear(e, t, i), a;
}
function ev(e) {
  let t = Q_.exec(e);
  if (t === null && (t = J_.exec(e)), t === null) return F;
  const i = +t[1], n = +t[2] - 1, o = +t[3];
  if (!t[4]) {
    const h = Xs(i, n, o);
    return h.getUTCFullYear() !== i || h.getUTCMonth() !== n || h.getUTCDate() !== o ? F : h;
  }
  const r = +t[4], s = +t[5], a = +t[6];
  let l = 0;
  if (r > 23 || s > 59 || a > 59) return F;
  if (t[7]) {
    let h = t[7].slice(0, 3);
    for (; h.length < 3; ) h += "0";
    l = +h;
  }
  const c = Xs(i, n, o, r, s, a, l);
  if (c.getUTCFullYear() !== i || c.getUTCMonth() !== n || c.getUTCDate() !== o) return F;
  if (t[9]) {
    const h = +t[10], d = +(t[11] || 0);
    if (h > 23 || d > 59) return F;
    const p = (h * 60 + d) * 6e4;
    c.setTime(c.getTime() - (t[9] === "-" ? -p : p));
  }
  return c;
}
var tv = pe("tag:yaml.org,2002:timestamp", {
  implicit: !0,
  implicitFirstChars: [..."0123456789"],
  resolve: ev,
  identify: (e) => e instanceof Date,
  represent: (e) => e.toISOString()
}), iv = xr("tag:yaml.org,2002:seq", {
  create: () => [],
  addItem: (e, t) => {
    e.push(t);
  },
  identify: Array.isArray
});
function In(e) {
  if (e === null || typeof e != "object" || Array.isArray(e)) return !1;
  const t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
function Qs(e, t) {
  const i = {};
  for (const n of t) e[n] !== void 0 && (i[n] = e[n]);
  return i;
}
var nv = xr("tag:yaml.org,2002:omap", {
  create: () => ({
    list: [],
    seen: /* @__PURE__ */ new Set()
  }),
  addItem: (e, t) => {
    let i;
    if (t instanceof Map) {
      if (t.size !== 1) return "cannot resolve an ordered map item";
      i = t.keys().next().value;
    } else if (In(t)) {
      const n = Object.keys(t);
      if (n.length !== 1) return "cannot resolve an ordered map item";
      i = n[0];
    } else return "cannot resolve an ordered map item";
    return e.seen.has(i) ? "duplicate key in ordered map" : (e.seen.add(i), e.list.push(t), "");
  },
  finalize: (e) => e.list,
  identify: () => !1
}), ov = xr("tag:yaml.org,2002:pairs", {
  create: () => [],
  addItem: (e, t) => {
    if (t instanceof Map)
      return t.size !== 1 ? "cannot resolve a pairs item" : (e.push(t.entries().next().value), "");
    if (Object.prototype.toString.call(t) !== "[object Object]") return "cannot resolve a pairs item";
    const i = t, n = Object.keys(i);
    return n.length !== 1 ? "cannot resolve a pairs item" : (e.push([n[0], i[n[0]]]), "");
  },
  identify: () => !1
}), rv = Mn("tag:yaml.org,2002:map", {
  create: () => ({}),
  identify: In,
  represent: (e) => {
    const t = /* @__PURE__ */ new Map();
    for (const i of Object.keys(e)) t.set(i, e[i]);
    return t;
  },
  addPair: (e, t, i) => {
    if (t !== null && typeof t == "object") return "object-based map does not support complex keys";
    const n = String(t);
    return n === "__proto__" ? Object.defineProperty(e, n, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[n] = i, "";
  },
  has: (e, t) => t !== null && typeof t == "object" ? !1 : Object.prototype.hasOwnProperty.call(e, String(t)),
  keys: (e) => Object.keys(e),
  get: (e, t) => {
    const i = String(t);
    return Object.prototype.hasOwnProperty.call(e, i) ? e[i] : null;
  }
}), sv = Mn("tag:yaml.org,2002:set", {
  create: () => /* @__PURE__ */ new Set(),
  identify: (e) => e instanceof Set,
  represent: (e) => {
    const t = /* @__PURE__ */ new Map();
    for (const i of e) t.set(i, null);
    return t;
  },
  addPair: (e, t, i) => i !== null ? "cannot resolve a set item" : (e.add(t), ""),
  has: (e, t) => e.has(t),
  keys: (e) => e.keys(),
  get: () => null
});
function av() {
  return {
    scalar: /* @__PURE__ */ Object.create(null),
    sequence: /* @__PURE__ */ Object.create(null),
    mapping: /* @__PURE__ */ Object.create(null)
  };
}
function lv() {
  return {
    scalar: [],
    sequence: [],
    mapping: []
  };
}
function cv(e) {
  const t = [];
  for (const i of e) {
    let n = t.length;
    for (let o = 0; o < t.length; o++) {
      const r = t[o];
      if (r.nodeKind === i.nodeKind && r.tagName === i.tagName && r.matchByTagPrefix === i.matchByTagPrefix) {
        n = o;
        break;
      }
    }
    t[n] = i;
  }
  return t;
}
var Pn = class dc {
  constructor(t) {
    $e(this, "tags");
    /** @internal */
    $e(this, "implicitScalarTags");
    /**
    * Dispatch implicit scalar resolvers by `source.charAt(0)`. Each bucket holds
    * the resolvers that may match that key, in schema order; a key absent from
    * the map uses
    * {@link Schema.implicitScalarAnyFirstChar}
    * (resolvers that declared no first-char constraint, so they apply to any
    * first character).
    */
    $e(this, "implicitScalarByFirstChar");
    $e(this, "implicitScalarAnyFirstChar");
    /**
    * The default scalar tag (`!!str`), resolved once so the composer's fallback
    * for unresolved plain scalars avoids a keyed lookup per scalar.
    *
    * @internal
    */
    $e(this, "defaultScalarTag");
    /**
    * The default container tags (`!!seq` / `!!map`), used by the dumper: when a
    * value is identified by its default tag, the tag is implicit and not
    * printed. Undefined if the schema does not define them (then such values
    * can't be dumped).
    *
    * @internal
    */
    $e(this, "defaultSequenceTag");
    /** @internal */
    $e(this, "defaultMappingTag");
    $e(this, "exact");
    $e(this, "prefix");
    const i = cv(t), n = [], o = av(), r = lv();
    for (const h of i) {
      if (h.nodeKind === "scalar" && h.implicit) {
        if (h.matchByTagPrefix) throw new Error("Implicit scalar tags cannot match by tag prefix");
        n.push(h);
      }
      switch (h.nodeKind) {
        case "scalar":
          h.matchByTagPrefix ? r.scalar.push(h) : o.scalar[h.tagName] = h;
          break;
        case "sequence":
          h.matchByTagPrefix ? r.sequence.push(h) : o.sequence[h.tagName] = h;
          break;
        case "mapping":
          h.matchByTagPrefix ? r.mapping.push(h) : o.mapping[h.tagName] = h;
          break;
      }
    }
    const s = n.filter((h) => h.implicitFirstChars === null), a = /* @__PURE__ */ new Set();
    for (const h of n) if (h.implicitFirstChars !== null) for (const d of h.implicitFirstChars) a.add(d);
    const l = /* @__PURE__ */ new Map();
    for (const h of a) l.set(h, n.filter((d) => d.implicitFirstChars === null || d.implicitFirstChars.indexOf(h) !== -1));
    const c = o.scalar["tag:yaml.org,2002:str"];
    if (!c) throw new Error("schema does not define the default scalar tag (tag:yaml.org,2002:str)");
    this.tags = i, this.implicitScalarTags = n, this.implicitScalarByFirstChar = l, this.implicitScalarAnyFirstChar = s, this.defaultScalarTag = c, this.defaultSequenceTag = o.sequence["tag:yaml.org,2002:seq"], this.defaultMappingTag = o.mapping["tag:yaml.org,2002:map"], this.exact = o, this.prefix = r;
  }
  /** @internal */
  lookupScalarTag(t) {
    const i = this.exact.scalar[t];
    if (i) return i;
    for (const n of this.prefix.scalar) if (t.startsWith(n.tagName)) return n;
  }
  /** @internal */
  lookupSequenceTag(t) {
    const i = this.exact.sequence[t];
    if (i) return i;
    for (const n of this.prefix.sequence) if (t.startsWith(n.tagName)) return n;
  }
  /** @internal */
  lookupMappingTag(t) {
    const i = this.exact.mapping[t];
    if (i) return i;
    for (const n of this.prefix.mapping) if (t.startsWith(n.tagName)) return n;
  }
  /** @internal */
  resolveImplicitScalarTag(t) {
    const i = this.implicitScalarByFirstChar.get(t.charAt(0)) ?? this.implicitScalarAnyFirstChar;
    for (const o of i) {
      const r = o.resolve(t, !1, o.tagName);
      if (r !== F) return {
        value: r,
        tag: o
      };
    }
    const n = this.defaultScalarTag;
    return {
      value: n.resolve(t, !1, n.tagName),
      tag: n
    };
  }
  /**
  * Creates a new schema with the specified tags added. If a tag already
  * exists, it is replaced by the specified tag.
  *
  * @example
  *
  * ```javascript
  * import { CORE_SCHEMA, mergeTag, realMapTag } from 'js-yaml'
  *
  * const schema = CORE_SCHEMA.withTags(mergeTag, realMapTag)
  * ```
  */
  withTags(...t) {
    let i = [];
    for (const n of t) i = i.concat(n);
    return new dc([...this.tags, ...i]);
  }
}, wr = new Pn([
  a_,
  iv,
  rv
]);
new Pn([
  ...wr.tags,
  d_,
  b_,
  M_,
  B_
]);
var dv = new Pn([
  ...wr.tags,
  c_,
  m_,
  lc,
  cc
]), hv = new Pn([
  ...wr.tags,
  p_,
  x_,
  Co,
  Mo,
  tv,
  q_,
  X_,
  nv,
  ov,
  sv
]);
hv.withTags({
  ...Co,
  resolve: (e, t, i) => {
    const n = Co.resolve(e, t, i);
    return n === F ? lc.resolve(e, t, i) : n;
  }
}, {
  ...Mo,
  resolve: (e, t, i) => {
    const n = Mo.resolve(e, t, i);
    return n === F ? cc.resolve(e, t, i) : n;
  }
});
Mn("tag:yaml.org,2002:map", {
  create: () => /* @__PURE__ */ new Map(),
  addPair: (e, t, i) => (e.set(t, i), ""),
  has: (e, t) => e.has(t),
  keys: (e) => e.keys(),
  get: (e, t) => e.get(t),
  identify: (e) => e instanceof Map || In(e),
  represent: (e) => {
    if (e instanceof Map) return e;
    const t = /* @__PURE__ */ new Map(), i = e;
    for (const n of Object.keys(i)) t.set(n, i[n]);
    return t;
  }
});
function Js(e) {
  if (Array.isArray(e)) {
    const t = Array.prototype.slice.call(e);
    for (let i = 0; i < t.length; i++) {
      if (Array.isArray(t[i])) return null;
      typeof t[i] == "object" && Object.prototype.toString.call(t[i]) === "[object Object]" && (t[i] = "[object Object]");
    }
    return String(t);
  }
  return typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" ? "[object Object]" : String(e);
}
Mn("tag:yaml.org,2002:map", {
  create: () => ({}),
  identify: In,
  represent: (e) => {
    const t = /* @__PURE__ */ new Map();
    for (const i of Object.keys(e)) t.set(i, e[i]);
    return t;
  },
  addPair: (e, t, i) => {
    const n = Js(t);
    return n === null ? "nested arrays are not supported inside keys" : (n === "__proto__" ? Object.defineProperty(e, n, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[n] = i, "");
  },
  has: (e, t) => {
    const i = Js(t);
    return i !== null && Object.prototype.hasOwnProperty.call(e, i);
  },
  keys: (e) => Object.keys(e),
  get: (e, t) => {
    const i = String(t);
    return Object.prototype.hasOwnProperty.call(e, i) ? e[i] : null;
  }
});
var pv = {
  maxLength: 79,
  indent: 1,
  linesBefore: 3,
  linesAfter: 2
};
function Vn(e, t, i, n, o) {
  let r = "", s = "";
  const a = Math.floor(o / 2) - 1;
  return n - t > a && (r = " ... ", t = n - a + r.length), i - n > a && (s = " ...", i = n + a - s.length), {
    str: r + e.slice(t, i).replace(/\t/g, "→") + s,
    pos: n - t + r.length
  };
}
function Yn(e, t) {
  return " ".repeat(Math.max(t - e.length, 0)) + e;
}
function uv(e, t) {
  if (!e.buffer) return null;
  const i = {
    ...pv,
    ...t
  }, n = /\r?\n|\r|\0/g, o = [0], r = [];
  let s, a = -1;
  for (; s = n.exec(e.buffer); )
    r.push(s.index), o.push(s.index + s[0].length), e.position <= s.index && a < 0 && (a = o.length - 2);
  a < 0 && (a = o.length - 1);
  let l = "";
  const c = Math.min(e.line + i.linesAfter, r.length).toString().length, h = i.maxLength - (i.indent + c + 3);
  for (let p = 1; p <= i.linesBefore && !(a - p < 0); p++) {
    const f = Vn(e.buffer, o[a - p], r[a - p], e.position - (o[a] - o[a - p]), h);
    l = `${" ".repeat(i.indent)}${Yn((e.line - p + 1).toString(), c)} | ${f.str}
${l}`;
  }
  const d = Vn(e.buffer, o[a], r[a], e.position, h);
  l += `${" ".repeat(i.indent)}${Yn((e.line + 1).toString(), c)} | ${d.str}
`, l += `${"-".repeat(i.indent + c + 3 + d.pos)}^
`;
  for (let p = 1; p <= i.linesAfter && !(a + p >= r.length); p++) {
    const f = Vn(e.buffer, o[a + p], r[a + p], e.position - (o[a] - o[a + p]), h);
    l += `${" ".repeat(i.indent)}${Yn((e.line + p + 1).toString(), c)} | ${f.str}
`;
  }
  return l.replace(/\n$/, "");
}
function ea(e, t) {
  let i = "";
  return e.mark ? (e.mark.name && (i += `in "${e.mark.name}" `), i += `(${e.mark.line + 1}:${e.mark.column + 1})`, !t && e.mark.snippet && (i += `

${e.mark.snippet}`), `${e.reason} ${i}`) : e.reason;
}
var pt = class hc extends Error {
  /**
  * Optional `mark` contains source snippet data. Usually, use
  * {@link YAMLException.throwAt} instead of passing it directly.
  */
  constructor(i, n) {
    super();
    $e(this, "reason");
    $e(this, "mark");
    this.name = "YAMLException", this.reason = i, this.mark = n, this.message = ea(this, !1), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  }
  /**
  * Returns the formatted error, omitting the source snippet in compact mode.
  */
  toString(i) {
    return `${this.name}: ${ea(this, i)}`;
  }
  /**
  * Builds a YAMLException with a source snippet and throws it. `source` is
  * the raw input text; `position` is an offset into it.
  */
  static throwAt(i, n, o, r = "") {
    let s = 0, a = 0;
    for (let c = 0; c < n; c++) {
      const h = i.charCodeAt(c);
      h === 10 ? (s++, a = c + 1) : h === 13 && (s++, i.charCodeAt(c + 1) === 10 && c++, a = c + 1);
    }
    const l = {
      name: r,
      buffer: i,
      position: n,
      line: s,
      column: n - a
    };
    throw l.snippet = uv(l), new hc(o, l);
  }
}, se = {
  DOCUMENT: 1,
  SEQUENCE: 2,
  MAPPING: 3,
  SCALAR: 4,
  ALIAS: 5,
  POP: 6
}, N = {
  PLAIN: 1,
  SINGLE_QUOTED: 2,
  DOUBLE_QUOTED: 3,
  LITERAL_BLOCK: 4,
  FOLDED_BLOCK: 5
}, zt = {
  BLOCK: 1,
  FLOW: 2
}, Oe = {
  CLIP: 1,
  STRIP: 2,
  KEEP: 3
}, fv = -1;
function ta(e) {
  switch (e) {
    case 48:
      return "\0";
    case 97:
      return "\x07";
    case 98:
      return "\b";
    case 116:
      return "	";
    case 9:
      return "	";
    case 110:
      return `
`;
    case 118:
      return "\v";
    case 102:
      return "\f";
    case 114:
      return "\r";
    case 101:
      return "\x1B";
    case 32:
      return " ";
    case 34:
      return '"';
    case 47:
      return "/";
    case 92:
      return "\\";
    case 78:
      return "";
    case 95:
      return " ";
    case 76:
      return "\u2028";
    case 80:
      return "\u2029";
    default:
      return "";
  }
}
var pc = new Array(256), uc = new Array(256);
for (let e = 0; e < 256; e++)
  pc[e] = ta(e) ? 1 : 0, uc[e] = ta(e);
function mv(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode((e - 65536 >> 10) + 55296, (e - 65536 & 1023) + 56320);
}
function gv(e) {
  return e >= 48 && e <= 57 ? e - 48 : (e | 32) - 97 + 10;
}
function yv(e) {
  return e === 120 ? 2 : e === 117 ? 4 : 8;
}
function an(e, t, i) {
  let n = 0;
  for (; t < i; ) {
    const o = e.charCodeAt(t);
    if (o === 10)
      n++, t++;
    else if (o === 13)
      n++, t++, e.charCodeAt(t) === 10 && t++;
    else if (o === 32 || o === 9) t++;
    else break;
  }
  return {
    position: t,
    breaks: n
  };
}
function $r(e) {
  return e === 1 ? " " : `
`.repeat(e - 1);
}
function bv(e, t, i) {
  let n = "", o = t, r = t, s = t;
  for (; o < i; ) {
    const a = e.charCodeAt(o);
    if (a === 10 || a === 13) {
      n += e.slice(r, s);
      const l = an(e, o, i);
      n += $r(l.breaks), o = r = s = l.position;
    } else
      o++, a !== 32 && a !== 9 && (s = o);
  }
  return n + e.slice(r, s);
}
function _v(e, t, i) {
  let n = "", o = t, r = t, s = t;
  for (; o < i; ) {
    const a = e.charCodeAt(o);
    if (a === 39)
      n += e.slice(r, o) + "'", o += 2, r = s = o;
    else if (a === 10 || a === 13) {
      n += e.slice(r, s);
      const l = an(e, o, i);
      n += $r(l.breaks), o = r = s = l.position;
    } else
      o++, a !== 32 && a !== 9 && (s = o);
  }
  return n + e.slice(r, i);
}
function vv(e, t, i) {
  let n = "", o = t, r = t, s = t;
  for (; o < i; ) {
    const a = e.charCodeAt(o);
    if (a === 92) {
      n += e.slice(r, o), o++;
      const l = e.charCodeAt(o);
      if (l === 10 || l === 13) o = an(e, o, i).position;
      else if (l < 256 && pc[l])
        n += uc[l], o++;
      else {
        let c = yv(l), h = 0;
        for (; c > 0; c--) {
          o++;
          const d = gv(e.charCodeAt(o));
          h = (h << 4) + d;
        }
        n += mv(h), o++;
      }
      r = s = o;
    } else if (a === 10 || a === 13) {
      n += e.slice(r, s);
      const l = an(e, o, i);
      n += $r(l.breaks), o = r = s = l.position;
    } else
      o++, a !== 32 && a !== 9 && (s = o);
  }
  return n + e.slice(r, i);
}
function ia(e, t, i, n, o, r) {
  const s = n < 0 ? 0 : n, a = e.slice(t, i).replace(/\r\n?/g, `
`), l = a === "" ? [] : (a.endsWith(`
`) ? a.slice(0, -1) : a).split(`
`);
  let c = "", h = !1, d = 0, p = !1;
  for (const f of l) {
    let m = 0;
    for (; m < s && f.charCodeAt(m) === 32; ) m++;
    if (n < 0 || m >= f.length) {
      d++;
      continue;
    }
    const b = f.slice(s), v = b.charCodeAt(0);
    r ? v === 32 || v === 9 ? (p = !0, c += `
`.repeat(h ? 1 + d : d)) : p ? (p = !1, c += `
`.repeat(d + 1)) : d === 0 ? h && (c += " ") : c += `
`.repeat(d) : c += `
`.repeat(h ? 1 + d : d), c += b, h = !0, d = 0;
  }
  return o === Oe.KEEP ? c += `
`.repeat(h ? 1 + d : d) : o !== Oe.STRIP && h && (c += `
`), c;
}
function xv(e, t) {
  if (t.valueStart === fv) return "";
  const { valueStart: i, valueEnd: n } = t;
  if (t.fast) return e.slice(i, n);
  switch (t.style) {
    case N.SINGLE_QUOTED:
      return _v(e, i, n);
    case N.DOUBLE_QUOTED:
      return vv(e, i, n);
    case N.LITERAL_BLOCK:
      return ia(e, i, n, t.indent, t.chomping, !1);
    case N.FOLDED_BLOCK:
      return ia(e, i, n, t.indent, t.chomping, !0);
    default:
      return bv(e, i, n);
  }
}
var wv = Object.assign(/* @__PURE__ */ Object.create(null), {
  "!": "!",
  "!!": "tag:yaml.org,2002:"
});
function fc(e, t) {
  if (e.startsWith("!<") && e.endsWith(">")) return decodeURIComponent(e.slice(2, -1));
  const i = e.indexOf("!", 1), n = i === -1 ? "!" : e.slice(0, i + 1), o = t?.[n] ?? wv[n] ?? n;
  return decodeURIComponent(o) + decodeURIComponent(e.slice(n.length));
}
var Mt = -1, $v = "tag:yaml.org,2002:merge", kr = {
  filename: "",
  schema: dv,
  json: !1,
  maxTotalMergeKeys: 1e4,
  maxAliases: -1
};
function kv(e) {
  return "tagStart" in e && e.tagStart !== Mt ? e.tagStart : "anchorStart" in e && e.anchorStart !== Mt ? e.anchorStart : "valueStart" in e && e.valueStart !== Mt ? e.valueStart : "start" in e ? e.start : 0;
}
function ae(e, t) {
  pt.throwAt(e.source, e.position, t, e.filename);
}
function mc(e, t, i, n) {
  try {
    return i.finalize(n);
  } catch (o) {
    if (o instanceof pt) throw o;
    pt.throwAt(e.source, t, o instanceof Error ? o.message : String(o), e.filename);
  }
}
function Sv(e, t) {
  const i = xv(e.source, t), n = t.tagStart === Mt ? "" : e.source.slice(t.tagStart, t.tagEnd), o = e.schema.defaultScalarTag;
  if (n !== "") {
    if (n === "!") return {
      value: i,
      tag: o
    };
    const r = fc(n, e.tagHandlers), s = e.schema.lookupScalarTag(r);
    if (s) {
      const l = s.resolve(i, !0, r);
      return l === F && ae(e, `cannot resolve a node with !<${r}> explicit tag`), {
        value: l,
        tag: s
      };
    }
    const a = e.schema.lookupMappingTag(r) ?? e.schema.lookupSequenceTag(r);
    if (a) {
      i !== "" && ae(e, `cannot resolve a node with !<${r}> explicit tag`);
      const l = a.create(r);
      return {
        value: a.carrierIsResult ? l : mc(e, e.position, a, l),
        tag: a
      };
    }
    ae(e, `unknown scalar tag !<${r}>`);
  }
  return t.style === N.PLAIN ? e.schema.resolveImplicitScalarTag(i) : {
    value: o.resolve(i, !1, o.tagName),
    tag: o
  };
}
function na(e, t, i) {
  const n = t.tagStart === Mt ? "" : e.source.slice(t.tagStart, t.tagEnd);
  return n === "" || n === "!" ? i : fc(n, e.tagHandlers);
}
function gc(e) {
  return e.nodeKind === "mapping";
}
function oa(e) {
  e.totalMergeKeys++, e.maxTotalMergeKeys !== -1 && e.totalMergeKeys > e.maxTotalMergeKeys && ae(e, `merge keys exceeded maxTotalMergeKeys (${e.maxTotalMergeKeys})`);
}
function ra(e, t, i, n) {
  oa(e);
  for (const o of n.keys(i)) {
    if (oa(e), t.tag.has(t.value, o)) continue;
    const r = t.tag.addPair(t.value, o, n.get(i, o));
    r && ae(e, r), t.overridable ??= /* @__PURE__ */ new Set(), t.overridable.add(o);
  }
}
function Ev(e, t, i, n) {
  if (e.position = t.keyPosition, gc(n)) ra(e, t, i, n);
  else if (n.nodeKind === "sequence" && Array.isArray(i)) {
    i.length > 100 && ae(e, "abnormal merge sequence size");
    for (const o of i) {
      const r = e.nodeTags.get(o);
      r || ae(e, "cannot merge mappings; the provided source object is unacceptable"), ra(e, t, o, r);
    }
  } else ae(e, "cannot merge mappings; the provided source object is unacceptable");
}
function Av(e, t, i, n, o) {
  if (e.position = t.keyPosition, t.keyIsMerge) {
    Ev(e, t, n, o);
    return;
  }
  !e.json && t.tag.has(t.value, i) && !t.overridable?.has(i) && ae(e, "duplicated mapping key");
  const r = t.tag.addPair(t.value, i, n);
  r && ae(e, r), t.overridable?.delete(i);
}
function Zn(e, t, i) {
  const n = e.frames[e.frames.length - 1];
  if (n.kind === "document")
    n.value = t, n.hasValue = !0;
  else if (n.kind === "sequence") {
    gc(i) && e.nodeTags.set(t, i);
    const o = n.tag.addItem(n.value, t, n.index++);
    o && ae(e, o);
  } else if (n.hasKey) {
    const o = n.key;
    n.key = void 0, n.hasKey = !1, Av(e, n, o, t, i);
  } else
    n.key = t, n.keyPosition = e.position, n.hasKey = !0, n.keyIsMerge = i.tagName === $v;
}
function Xn(e, t, i, n, o) {
  if (t.anchorStart !== Mt) {
    const r = {
      value: i,
      tag: n,
      isValueFinal: o
    };
    return e.anchors.set(e.source.slice(t.anchorStart, t.anchorEnd), r), r;
  }
  return null;
}
function Tv(e, t) {
  const i = {
    ...kr,
    ...t,
    events: e,
    documents: [],
    eventIndex: 0,
    position: 0,
    frames: [],
    anchors: /* @__PURE__ */ new Map(),
    nodeTags: /* @__PURE__ */ new Map(),
    tagHandlers: /* @__PURE__ */ Object.create(null),
    totalMergeKeys: 0,
    aliasCount: 0
  };
  for (; i.eventIndex < i.events.length; ) {
    const n = i.events[i.eventIndex++];
    switch (i.position = kv(n), n.type) {
      case se.DOCUMENT:
        i.anchors = /* @__PURE__ */ new Map(), i.nodeTags = /* @__PURE__ */ new Map(), i.aliasCount = 0, i.tagHandlers = /* @__PURE__ */ Object.create(null);
        for (const o of n.directives) o.kind === "tag" && (i.tagHandlers[o.handle] = o.prefix);
        i.frames.push({
          kind: "document",
          position: i.position,
          value: void 0,
          hasValue: !1
        });
        break;
      case se.SCALAR: {
        const { value: o, tag: r } = Sv(i, n);
        Xn(i, n, o, r, !0), Zn(i, o, r);
        break;
      }
      case se.SEQUENCE: {
        const o = na(i, n, "tag:yaml.org,2002:seq"), r = i.schema.lookupSequenceTag(o);
        r || ae(i, `unknown sequence tag !<${o}>`);
        const s = r.create(o), a = Xn(i, n, s, r, r.carrierIsResult);
        i.frames.push({
          kind: "sequence",
          position: i.position,
          value: s,
          tag: r,
          anchor: a,
          index: 0
        });
        break;
      }
      case se.MAPPING: {
        const o = na(i, n, "tag:yaml.org,2002:map"), r = i.schema.lookupMappingTag(o);
        r || ae(i, `unknown mapping tag !<${o}>`);
        const s = r.create(o), a = Xn(i, n, s, r, r.carrierIsResult);
        i.frames.push({
          kind: "mapping",
          position: i.position,
          value: s,
          tag: r,
          anchor: a,
          key: void 0,
          keyPosition: i.position,
          hasKey: !1,
          keyIsMerge: !1,
          overridable: null
        });
        break;
      }
      case se.ALIAS: {
        i.maxAliases !== -1 && ++i.aliasCount > i.maxAliases && ae(i, `aliases exceeded maxAliases (${i.maxAliases})`);
        const o = i.source.slice(n.anchorStart, n.anchorEnd), r = i.anchors.get(o);
        r || ae(i, `unidentified alias "${o}"`), r.isValueFinal || ae(i, `recursive alias "${o}" is not supported for tag ${r.tag.tagName} because it uses finalize()`), Zn(i, r.value, r.tag);
        break;
      }
      case se.POP: {
        const o = i.frames.pop();
        if (o.kind === "mapping" && o.hasKey && (i.position = o.keyPosition, ae(i, "incomplete mapping pair in event stream")), o.kind === "document") i.documents.push(o.value);
        else {
          const r = o.tag.carrierIsResult ? o.value : mc(i, o.position, o.tag, o.value);
          o.anchor && (o.anchor.value = r, o.anchor.isValueFinal = !0), Zn(i, r, o.tag);
        }
        break;
      }
    }
  }
  return i.documents;
}
var z = -1, yc = Object.prototype.hasOwnProperty, Nt = 1, bc = 2, _c = 3, ln = 4, Cv = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Mv = /[,\[\]{}]/, vc = /^(?:!|!!|![0-9A-Za-z-]+!)$/, Io = String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`, xc = String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`, Iv = new RegExp(`^(?:${Io})*$`), Pv = new RegExp(`^(?:${xc})+$`), Ov = new RegExp(`^(?:!(?:${Io})*|${xc}(?:${Io})*)$`), Sr = {
  filename: "",
  maxDepth: 100
};
function Lv(e, t, i) {
  e.events.push({
    type: se.DOCUMENT,
    explicitStart: t,
    explicitEnd: i,
    directives: e.directives
  });
}
function wc(e, t, i, n, o, r, s) {
  e.events.push({
    type: se.SEQUENCE,
    start: t,
    anchorStart: i,
    anchorEnd: n,
    tagStart: o,
    tagEnd: r,
    style: s
  });
}
function $c(e, t, i, n, o, r, s) {
  e.events.push({
    type: se.MAPPING,
    start: t,
    anchorStart: i,
    anchorEnd: n,
    tagStart: o,
    tagEnd: r,
    style: s
  });
}
function sa(e, t) {
  e.events.splice(t.eventsLength, 0, {
    type: se.MAPPING,
    start: t.position,
    anchorStart: z,
    anchorEnd: z,
    tagStart: z,
    tagEnd: z,
    style: zt.FLOW
  });
}
function Gt(e, t, i, n, o, r, s, a, l = Oe.CLIP, c = -1, h = !1) {
  e.events.push({
    type: se.SCALAR,
    valueStart: t,
    valueEnd: i,
    anchorStart: n,
    anchorEnd: o,
    tagStart: r,
    tagEnd: s,
    style: a,
    chomping: l,
    indent: c,
    fast: h
  });
}
function Fv(e, t, i) {
  e.events.push({
    type: se.ALIAS,
    anchorStart: t,
    anchorEnd: i
  });
}
function It(e) {
  e.events.push({ type: se.POP });
}
function ue(e) {
  Gt(e, z, z, z, z, z, z, N.PLAIN);
}
function aa() {
  return {
    anchorStart: z,
    anchorEnd: z,
    tagStart: z,
    tagEnd: z
  };
}
function Pt(e) {
  return {
    position: e.position,
    line: e.line,
    lineStart: e.lineStart,
    lineIndent: e.lineIndent,
    firstTabInLine: e.firstTabInLine,
    eventsLength: e.events.length
  };
}
function Ot(e, t) {
  e.position = t.position, e.line = t.line, e.lineStart = t.lineStart, e.lineIndent = t.lineIndent, e.firstTabInLine = t.firstTabInLine, e.events.length = t.eventsLength;
}
function M(e, t) {
  pt.throwAt(e.input.slice(0, e.length), e.position, t, e.filename);
}
function oe(e) {
  return e === 10 || e === 13;
}
function Kt(e) {
  return e === 9 || e === 32;
}
function Ce(e) {
  return Kt(e) || oe(e);
}
function He(e) {
  return e === 0 || Ce(e);
}
function ut(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function Rv(e) {
  return e >= 48 && e <= 57 ? e - 48 : -1;
}
function zv(e) {
  if (e >= 48 && e <= 57) return e - 48;
  const t = e | 32;
  return t >= 97 && t <= 102 ? t - 97 + 10 : -1;
}
function Nv(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function Dv(e) {
  return e === 48 || e === 97 || e === 98 || e === 116 || e === 9 || e === 110 || e === 118 || e === 102 || e === 114 || e === 101 || e === 32 || e === 34 || e === 47 || e === 92 || e === 78 || e === 95 || e === 76 || e === 80;
}
function cn(e) {
  e.input.charCodeAt(e.position) === 10 ? e.position++ : (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++), e.line++, e.lineStart = e.position, e.lineIndent = 0, e.firstTabInLine = -1;
}
function he(e, t) {
  let i = 0, n = e.input.charCodeAt(e.position), o = e.position === e.lineStart || Ce(e.input.charCodeAt(e.position - 1));
  for (; n !== 0; ) {
    for (; Kt(n); )
      o = !0, n === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), n = e.input.charCodeAt(++e.position);
    if (t && o && n === 35) do
      n = e.input.charCodeAt(++e.position);
    while (!oe(n) && n !== 0);
    if (!oe(n)) break;
    for (cn(e), i++, o = !0, n = e.input.charCodeAt(e.position); n === 32; )
      e.lineIndent++, n = e.input.charCodeAt(++e.position);
  }
  return i;
}
function Dt(e, t = e.position) {
  const i = e.input.charCodeAt(t);
  if ((i === 45 || i === 46) && i === e.input.charCodeAt(t + 1) && i === e.input.charCodeAt(t + 2)) {
    const n = e.input.charCodeAt(t + 3);
    return n === 0 || Ce(n);
  }
  return !1;
}
function kc(e) {
  e.position === e.lineStart && e.input.charCodeAt(e.position) === 65279 && (e.position++, e.lineStart = e.position);
}
function Er(e) {
  if (e.position !== e.lineStart) return !1;
  if (Dt(e)) return !0;
  if (e.input.charCodeAt(e.position) !== 65279) return !1;
  const t = Pt(e);
  kc(e), he(e, !0);
  const i = e.input.charCodeAt(e.position), n = e.position === e.lineStart && (i === 37 || i === 45 && Dt(e));
  return Ot(e, t), n;
}
function la(e) {
  let t = e.input.charCodeAt(e.position);
  for (; t !== 0 && !oe(t); ) t = e.input.charCodeAt(++e.position);
}
function Sc(e, t, i) {
  Cv.test(e.input.slice(t, i)) && M(e, "the stream contains non-printable characters");
}
function Hv(e, t, i) {
  if (e.input.charCodeAt(e.position) !== 33) return !1;
  t.tagStart !== z && M(e, "duplication of a tag property");
  const n = e.position;
  let o = !1, r = !1, s = "!", a = e.input.charCodeAt(++e.position);
  a === 60 ? (o = !0, a = e.input.charCodeAt(++e.position)) : a === 33 && (r = !0, s = "!!", a = e.input.charCodeAt(++e.position));
  let l = e.position, c;
  if (o) {
    for (; a !== 0 && a !== 62; ) a = e.input.charCodeAt(++e.position);
    a !== 62 && M(e, "unexpected end of the stream within a verbatim tag"), c = e.input.slice(l, e.position), e.position++;
  } else {
    for (; a !== 0 && !Ce(a) && !(i && ut(a)); )
      a === 33 && (r ? M(e, "tag suffix cannot contain exclamation marks") : (s = e.input.slice(l - 1, e.position + 1), vc.test(s) || M(e, "named tag handle cannot contain such characters"), r = !0, l = e.position + 1)), a = e.input.charCodeAt(++e.position);
    c = e.input.slice(l, e.position), Mv.test(c) && M(e, "tag suffix cannot contain flow indicator characters");
  }
  return c && !(o ? Iv.test(c) : Pv.test(c)) && M(e, `tag name cannot contain such characters: ${c}`), !o && s !== "!" && s !== "!!" && !yc.call(e.tagHandlers, s) && M(e, `undeclared tag handle "${s}"`), t.tagStart = n, t.tagEnd = e.position, !0;
}
function Uv(e, t) {
  if (e.input.charCodeAt(e.position) !== 38) return !1;
  t.anchorStart !== z && M(e, "duplication of an anchor property"), e.position++;
  const i = e.position;
  for (; e.input.charCodeAt(e.position) !== 0 && !Ce(e.input.charCodeAt(e.position)) && !ut(e.input.charCodeAt(e.position)); ) e.position++;
  return e.position === i && M(e, "name of an anchor node must contain at least one character"), t.anchorStart = i, t.anchorEnd = e.position, !0;
}
function Bv(e, t) {
  if (e.input.charCodeAt(e.position) !== 42) return !1;
  (t.anchorStart !== z || t.tagStart !== z) && M(e, "alias node should not have any properties"), e.position++;
  const i = e.position;
  for (; e.input.charCodeAt(e.position) !== 0 && !Ce(e.input.charCodeAt(e.position)) && !ut(e.input.charCodeAt(e.position)); ) e.position++;
  return e.position === i && M(e, "name of an alias node must contain at least one character"), Fv(e, i, e.position), !0;
}
function Po(e, t) {
  he(e, !1), e.lineIndent < t && M(e, "deficient indentation");
}
function jv(e, t, i) {
  if (e.input.charCodeAt(e.position) !== 39) return !1;
  e.position++;
  const n = e.position;
  let o = !0;
  for (; e.input.charCodeAt(e.position) !== 0; ) {
    const r = e.input.charCodeAt(e.position);
    if (r === 39) {
      if (e.input.charCodeAt(e.position + 1) === 39) {
        o = !1, e.position += 2;
        continue;
      }
      const s = e.position;
      return e.position++, Gt(e, n, s, i.anchorStart, i.anchorEnd, i.tagStart, i.tagEnd, N.SINGLE_QUOTED, Oe.CLIP, -1, o), !0;
    }
    oe(r) ? (o = !1, Po(e, t)) : e.position === e.lineStart && Dt(e) ? M(e, "unexpected end of the document within a single quoted scalar") : r !== 9 && r < 32 ? M(e, "expected valid JSON character") : e.position++;
  }
  M(e, "unexpected end of the stream within a single quoted scalar");
}
function Wv(e, t, i) {
  if (e.input.charCodeAt(e.position) !== 34) return !1;
  e.position++;
  const n = e.position;
  let o = !0;
  for (; e.input.charCodeAt(e.position) !== 0; ) {
    const r = e.input.charCodeAt(e.position);
    if (r === 34) {
      const s = e.position;
      return e.position++, Gt(e, n, s, i.anchorStart, i.anchorEnd, i.tagStart, i.tagEnd, N.DOUBLE_QUOTED, Oe.CLIP, -1, o), !0;
    }
    if (r === 92) {
      o = !1;
      const s = e.input.charCodeAt(++e.position);
      if (oe(s)) Po(e, t);
      else if (Dv(s)) e.position++;
      else {
        let a = Nv(s);
        for (a === 0 && M(e, "unknown escape sequence"); a-- > 0; )
          e.position++, zv(e.input.charCodeAt(e.position)) < 0 && M(e, "expected hexadecimal character");
        e.position++;
      }
    } else oe(r) ? (o = !1, Po(e, t)) : e.position === e.lineStart && Dt(e) ? M(e, "unexpected end of the document within a double quoted scalar") : r !== 9 && r < 32 ? M(e, "expected valid JSON character") : e.position++;
  }
  M(e, "unexpected end of the stream within a double quoted scalar");
}
function Gv(e, t, i) {
  const n = e.input.charCodeAt(e.position);
  let o = Oe.CLIP, r = -1, s = !1;
  if (n !== 124 && n !== 62) return !1;
  const a = n === 124 ? N.LITERAL_BLOCK : N.FOLDED_BLOCK;
  for (e.position++; e.input.charCodeAt(e.position) !== 0; ) {
    const f = e.input.charCodeAt(e.position), m = Rv(f);
    if (f === 43 || f === 45)
      o !== Oe.CLIP && M(e, "repeat of a chomping mode identifier"), o = f === 43 ? Oe.KEEP : Oe.STRIP, e.position++;
    else if (m >= 0)
      m === 0 && M(e, "bad explicit indentation width of a block scalar; it cannot be less than one"), s && M(e, "repeat of an indentation width identifier"), r = t + m - 1, s = !0, e.position++;
    else break;
  }
  let l = !1;
  for (; Kt(e.input.charCodeAt(e.position)); )
    l = !0, e.position++;
  l && e.input.charCodeAt(e.position) === 35 && la(e), oe(e.input.charCodeAt(e.position)) ? cn(e) : e.input.charCodeAt(e.position) !== 0 && M(e, "a line break is expected");
  let c = s ? r : -1, h = 0;
  const d = e.position;
  let p = e.position;
  for (; e.input.charCodeAt(e.position) !== 0; ) {
    const f = e.position;
    let m = 0;
    for (; e.input.charCodeAt(f + m) === 32; ) m++;
    const b = e.input.charCodeAt(f + m);
    if (b === 0) {
      c >= 0 ? m > c && (p = f + m) : m > 0 && (p = f + m);
      break;
    }
    if (Er(e)) break;
    if (!s && c === -1 && oe(b) && (h = Math.max(h, m)), !s && c === -1 && !oe(b) && (b === 9 && m < t && (e.position = f + m, M(e, "tab characters must not be used in indentation")), m >= t && m < h && (e.position = f + m, M(e, "bad indentation of a mapping entry"))), c === -1 && b !== 0 && !oe(b) && m < t) {
      e.lineIndent = m, e.position = f + m;
      break;
    }
    !s && b !== 0 && !oe(b) && c === -1 && (c = m);
    const v = c === -1 ? t + 1 : c;
    if (b !== 0 && !oe(b) && m < v) {
      e.lineIndent = m, e.position = f + m;
      break;
    }
    la(e), p = e.position, oe(e.input.charCodeAt(e.position)) && (cn(e), p = e.position);
  }
  return Sc(e, d, p), Gt(e, d, p, i.anchorStart, i.anchorEnd, i.tagStart, i.tagEnd, a, o, c), !0;
}
function Kv(e, t) {
  const i = e.input.charCodeAt(e.position), n = t === Nt;
  if (i === 0 || Ce(i) || i === 35 || i === 38 || i === 42 || i === 33 || i === 124 || i === 62 || i === 39 || i === 34 || i === 37 || i === 64 || i === 96 || n && ut(i)) return !1;
  if (i === 63 || i === 45) {
    const o = e.input.charCodeAt(e.position + 1);
    if (He(o) || n && ut(o)) return !1;
  }
  return !0;
}
function qv(e, t, i, n) {
  if (!Kv(e, i)) return !1;
  const o = e.position;
  let r = e.position, s = e.input.charCodeAt(e.position);
  const a = i === Nt;
  let l = !1;
  for (; s !== 0 && !Er(e); ) {
    if (s === 58) {
      const c = e.input.charCodeAt(e.position + 1);
      if (He(c) || a && ut(c)) break;
    } else if (s === 35) {
      if (Ce(e.input.charCodeAt(e.position - 1))) break;
    } else {
      if (a && ut(s)) break;
      if (oe(s)) {
        const c = e.position, h = e.line, d = e.lineStart, p = e.lineIndent;
        if (he(e, !1), e.lineIndent >= t) {
          l = !0, s = e.input.charCodeAt(e.position);
          continue;
        }
        e.position = c, e.line = h, e.lineStart = d, e.lineIndent = p;
        break;
      }
    }
    Kt(s) || (r = e.position + 1), s = e.input.charCodeAt(++e.position);
  }
  return r === o ? !1 : (Sc(e, o, r), Gt(e, o, r, n.anchorStart, n.anchorEnd, n.tagStart, n.tagEnd, N.PLAIN, Oe.CLIP, -1, !l), !0);
}
function ti(e, t) {
  const i = e.line;
  he(e, !0), (e.line > i && e.lineIndent < t || e.firstTabInLine !== -1 && e.lineIndent < t) && M(e, "deficient indentation");
}
function Vv(e, t, i) {
  const n = e.input.charCodeAt(e.position), o = n === 123, r = e.position;
  let s = !0;
  if (n !== 91 && n !== 123) return !1;
  const a = o ? 125 : 93;
  for (o ? $c(e, r, i.anchorStart, i.anchorEnd, i.tagStart, i.tagEnd, zt.FLOW) : wc(e, r, i.anchorStart, i.anchorEnd, i.tagStart, i.tagEnd, zt.FLOW), e.position++; e.input.charCodeAt(e.position) !== 0; ) {
    ti(e, t);
    let l = e.input.charCodeAt(e.position);
    if (l === a)
      return e.position++, It(e), !0;
    s ? l === 44 && M(e, "expected the node content, but found ','") : M(e, "missed comma between flow collection entries");
    let c = !1, h = !1;
    l === 63 && Ce(e.input.charCodeAt(e.position + 1)) && (c = h = !0, e.position += 1, ti(e, t));
    const d = e.line, p = Pt(e), f = Ht(e, t, Nt, !1, !0);
    ti(e, t), l = e.input.charCodeAt(e.position), (o || h || e.line === d) && l === 58 ? (c = !0, e.position++, ti(e, t), o || sa(e, p), f || ue(e), Ht(e, t, Nt, !1, !0) || ue(e), ti(e, t), o || It(e)) : o && c ? (f || ue(e), ue(e)) : o ? ue(e) : c && (sa(e, p), f || ue(e), ue(e), It(e)), l = e.input.charCodeAt(e.position), l === 44 ? (s = !0, e.position++) : s = !1;
  }
  M(e, "unexpected end of the stream within a flow collection");
}
function ca(e, t, i) {
  if (e.firstTabInLine !== -1 || e.input.charCodeAt(e.position) !== 45 || !He(e.input.charCodeAt(e.position + 1))) return !1;
  for (wc(e, e.position, i.anchorStart, i.anchorEnd, i.tagStart, i.tagEnd, zt.BLOCK); e.input.charCodeAt(e.position) === 45 && He(e.input.charCodeAt(e.position + 1)); ) {
    e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, M(e, "tab characters must not be used in indentation"));
    const n = e.line;
    e.position++;
    const o = he(e, !0) > 0;
    if (e.firstTabInLine !== -1 && e.input.charCodeAt(e.position) === 45 && He(e.input.charCodeAt(e.position + 1)) && M(e, "bad indentation of a sequence entry"), o && e.lineIndent <= t ? ue(e) : Ht(e, t, _c, !1, !0), he(e, !0), e.lineIndent < t || e.position >= e.length) break;
    e.lineIndent > t && M(e, "bad indentation of a sequence entry"), e.line === n && e.input.charCodeAt(e.position) === 45 && He(e.input.charCodeAt(e.position + 1)) && M(e, "bad indentation of a sequence entry");
  }
  return It(e), !0;
}
function Qn(e, t, i, n) {
  let o = !1, r = !1, s = !1, a = !1;
  if (e.firstTabInLine !== -1) return !1;
  let l = e.input.charCodeAt(e.position);
  for (; l !== 0; ) {
    !o && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, M(e, "tab characters must not be used in indentation"));
    const c = e.input.charCodeAt(e.position + 1), h = e.line;
    if ((l === 63 || l === 58) && He(c))
      s || ($c(e, e.position, n.anchorStart, n.anchorEnd, n.tagStart, n.tagEnd, zt.BLOCK), s = !0), l === 63 ? (o && ue(e), r = !0, o = !0) : (o || (ue(e), r = !0), o = !1), e.position += 1, a = !0;
    else {
      o && (ue(e), o = !1);
      const d = Pt(e);
      if (!Ht(e, i, bc, !1, !0)) break;
      if (e.line === h) {
        for (l = e.input.charCodeAt(e.position); Kt(l); ) l = e.input.charCodeAt(++e.position);
        if (l === 58)
          l = e.input.charCodeAt(++e.position), He(l) || M(e, "a whitespace character is expected after the key-value separator within a block mapping"), s || (e.events.splice(d.eventsLength, 0, {
            type: se.MAPPING,
            start: d.position,
            anchorStart: n.anchorStart,
            anchorEnd: n.anchorEnd,
            tagStart: n.tagStart,
            tagEnd: n.tagEnd,
            style: zt.BLOCK
          }), s = !0), r = !0, o = !1, a = !1;
        else if (r) M(e, "expected ':' after a mapping key");
        else
          return n.anchorStart !== z || n.tagStart !== z ? (Ot(e, d), !1) : !0;
      } else if (r) M(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return n.anchorStart !== z || n.tagStart !== z ? (Ot(e, d), !1) : !0;
    }
    if (Ht(e, t, ln, !0, a) && (a = !1), o || a && (ue(e), a = !1), he(e, !0), l = e.input.charCodeAt(e.position), (e.line === h || e.lineIndent > t) && l !== 0) M(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t) break;
  }
  return r ? (o && ue(e), s && It(e), !0) : !1;
}
function Ht(e, t, i, n, o, r = !0) {
  e.depth >= e.maxDepth && M(e, `nesting exceeded maxDepth (${e.maxDepth})`), e.depth++;
  let s = 1, a = !1, l = !1, c = null;
  const h = aa();
  let d = i === ln || i === _c, p = d;
  const f = d;
  if (n && he(e, !0) && (a = !0, e.lineIndent > t ? s = 1 : e.lineIndent === t ? s = 0 : s = -1), s === 1) for (; ; ) {
    const m = e.input.charCodeAt(e.position), b = Pt(e);
    if (a && s !== 1 && (m === 33 || m === 38)) break;
    if (a && f && (h.tagStart !== z || h.anchorStart !== z) && (m === 33 || m === 38)) {
      const v = Pt(e), x = t + 1;
      if (Qn(e, e.position - e.lineStart, x, h) && e.events[v.eventsLength]?.type === se.MAPPING)
        return e.depth--, !0;
      Ot(e, v);
    }
    if (a && (m === 33 && h.tagStart !== z || m === 38 && h.anchorStart !== z) || !Hv(e, h, i === Nt) && !Uv(e, h)) break;
    c === null && (c = b), he(e, !0) ? (a = !0, p = f, e.lineIndent > t ? s = 1 : e.lineIndent === t ? s = 0 : s = -1) : p = !1;
  }
  if (p && (p = a || o), s === 1 || i === ln) {
    const m = i === Nt || i === bc ? t : t + 1, b = e.position - e.lineStart;
    if (s === 1) if (p && (ca(e, b, h) || Qn(e, b, m, h)) || Vv(e, m, h)) l = !0;
    else {
      const v = e.input.charCodeAt(e.position);
      if (c !== null && r && f && !p && v !== 124 && v !== 62) {
        const x = Pt(e), $ = c.position - c.lineStart;
        Ot(e, c), Qn(e, $, m, aa()) && e.events[x.eventsLength]?.type === se.MAPPING ? l = !0 : Ot(e, x);
      }
      !l && (d && Gv(e, m, h) || jv(e, m, h) || Wv(e, m, h) || Bv(e, h) || qv(e, m, i, h)) && (l = !0);
    }
    else s === 0 && (l = p && ca(e, b, h));
  }
  return d = d && !l, !l && (h.anchorStart !== z || h.tagStart !== z || d) && (Gt(e, z, z, h.anchorStart, h.anchorEnd, h.tagStart, h.tagEnd, N.PLAIN), l = !0), e.depth--, l || h.anchorStart !== z || h.tagStart !== z;
}
function Yv(e) {
  if (e.lineIndent > 0 || e.input.charCodeAt(e.position) !== 37) return !1;
  e.position++;
  const t = e.position;
  for (; e.input.charCodeAt(e.position) !== 0 && !Ce(e.input.charCodeAt(e.position)); ) e.position++;
  const i = e.input.slice(t, e.position), n = [];
  for (i.length === 0 && M(e, "directive name must not be less than one character in length"); e.input.charCodeAt(e.position) !== 0 && !oe(e.input.charCodeAt(e.position)); ) {
    for (; Kt(e.input.charCodeAt(e.position)); ) e.position++;
    if (e.input.charCodeAt(e.position) === 35 || oe(e.input.charCodeAt(e.position)) || e.input.charCodeAt(e.position) === 0) break;
    const o = e.position;
    for (; e.input.charCodeAt(e.position) !== 0 && !Ce(e.input.charCodeAt(e.position)); ) e.position++;
    n.push(e.input.slice(o, e.position));
  }
  if (oe(e.input.charCodeAt(e.position)) && cn(e), i === "YAML") {
    e.directives.some((r) => r.kind === "yaml") && M(e, "duplication of %YAML directive"), n.length !== 1 && M(e, "YAML directive accepts exactly one argument");
    const o = /^([0-9]+)\.([0-9]+)$/.exec(n[0]);
    o === null && M(e, "ill-formed argument of the YAML directive"), parseInt(o[1], 10) !== 1 && M(e, "unacceptable YAML version of the document"), e.directives.push({
      kind: "yaml",
      version: n[0]
    });
  } else if (i === "TAG") {
    n.length !== 2 && M(e, "TAG directive accepts exactly two arguments");
    const [o, r] = n;
    vc.test(o) || M(e, "ill-formed tag handle (first argument) of the TAG directive"), yc.call(e.tagHandlers, o) && M(e, `there is a previously declared suffix for "${o}" tag handle`), Ov.test(r) || M(e, "ill-formed tag prefix (second argument) of the TAG directive"), e.tagHandlers[o] = r, e.directives.push({
      kind: "tag",
      handle: o,
      prefix: r
    });
  }
  return !0;
}
function Zv(e) {
  e.directives = [], e.tagHandlers = /* @__PURE__ */ Object.create(null);
  let t = !1;
  for (he(e, !0); Yv(e); )
    t = !0, he(e, !0);
  let i = !1, n = !1, o = !0;
  if (e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 && He(e.input.charCodeAt(e.position + 3))) {
    i = !0;
    const a = e.line;
    e.position += 3, he(e, !0), o = e.line > a;
  } else t && M(e, "directives end mark is expected");
  const r = e.events.length;
  if (!i && e.position === e.lineStart && e.input.charCodeAt(e.position) === 46 && Dt(e)) {
    e.position += 3, he(e, !0);
    return;
  }
  if (Lv(e, i, !1), Ht(e, e.lineIndent - 1, ln, !1, o, o) || ue(e), he(e, !0), e.position === e.lineStart && Dt(e) && (n = e.input.charCodeAt(e.position) === 46, n)) {
    const a = e.line;
    e.position += 3, he(e, !0), e.line === a && e.position < e.length && M(e, "end of the stream or a document separator is expected");
  }
  const s = e.events[r];
  s?.type === se.DOCUMENT && (s.explicitEnd = n), It(e), !n && e.position < e.length && !Er(e) && M(e, "end of the stream or a document separator is expected");
}
function Xv(e, t) {
  const i = e.length, n = {
    ...Sr,
    ...t,
    input: `${e}\0`,
    length: i,
    position: 0,
    line: 0,
    lineStart: 0,
    lineIndent: 0,
    firstTabInLine: -1,
    depth: 0,
    directives: [],
    tagHandlers: /* @__PURE__ */ Object.create(null),
    events: []
  }, o = e.indexOf("\0");
  for (o !== -1 && pt.throwAt(e, o, "null byte is not allowed in input", n.filename); n.position < n.length && (kc(n), he(n, !0), !(n.position >= n.length)); ) {
    const r = n.position;
    Zv(n), n.position === r && M(n, "can not read a document");
  }
  return n.events;
}
var Qv = {
  ...Sr,
  ...kr
};
function Jv(e, t = {}) {
  const i = {
    ...Qv,
    ...t
  }, n = String(e), o = Object.keys(Sr), r = Object.keys(kr);
  return Tv(Xv(n, Qs(i, o)), {
    ...Qs(i, r),
    source: n
  });
}
function ex(e, t) {
  const i = Jv(e, t);
  if (i.length === 0) throw new pt("expected a document, but the input is empty");
  if (i.length === 1) return i[0];
  throw new pt("expected a single document in the stream, but found more");
}
function On(e, t) {
  return (e & 1 << t) !== 0;
}
var da = {
  applyQuoteFlowKeysOption: tx,
  doubleQuoteForInvisibles: ix,
  doubleQuoteWhitespaceOnly: nx,
  applyForceQuotesOption: ox,
  tryLongOrMultilineAsBlock: rx,
  quoteInvalidPlain: sx,
  fallbackToDoubleQuoted: ax
};
function Ec(e) {
  return e.presenterOptions.quoteStyle === "single" && On(e.allowedStylesMask, N.SINGLE_QUOTED) ? N.SINGLE_QUOTED : N.DOUBLE_QUOTED;
}
function tx(e) {
  e.presenterOptions.quoteFlowKeys && (!e.isKey || !e.flowOnly || e.style !== N.PLAIN || (e.style = N.DOUBLE_QUOTED));
}
function ix(e) {
  e.style === N.PLAIN && /[\t\x7F-\xA0\u2028\u2029\uFEFF\uFFFE\uFFFF]/.test(e.node.value) && (e.style = N.DOUBLE_QUOTED);
}
function nx(e) {
  e.style === N.PLAIN && /^\s+$/.test(e.node.value) && (e.style = N.DOUBLE_QUOTED);
}
function ox(e) {
  e.presenterOptions.forceQuotes && (e.isKey || e.style !== N.PLAIN || e.node.tag === e.presenterOptions.schema.defaultScalarTag.tagName && (e.style = e.node.value.includes(`
`) ? N.DOUBLE_QUOTED : Ec(e)));
}
function rx(e) {
  if (e.style !== N.PLAIN || e.isKey) return;
  const t = e.node.value, i = t.indexOf(`
`) !== -1;
  if (!On(e.allowedStylesMask, N.LITERAL_BLOCK)) {
    i && (e.style = N.DOUBLE_QUOTED);
    return;
  }
  const n = e.presenterOptions.lineWidth;
  if (n === -1) {
    i && (e.style = N.LITERAL_BLOCK);
    return;
  }
  const o = Math.max(Math.min(n, 40), n - e.shiftOfContent);
  let r = 0, s = !1;
  for (; r <= t.length; ) {
    let a = t.length;
    const l = t.indexOf(`
`, r);
    l !== -1 && (a = l);
    const c = t.slice(r, a);
    if (c.length > o && c[0] !== " " && / [^ \t]/.test(c) && (s = !0), l === -1) break;
    r = l + 1;
  }
  s ? e.style = N.FOLDED_BLOCK : i && (e.style = N.LITERAL_BLOCK);
}
function sx(e) {
  e.style === N.PLAIN && !On(e.allowedStylesMask, N.PLAIN) && (e.style = Ec(e));
}
function ax(e) {
  On(e.allowedStylesMask, e.style) || (e.style = N.DOUBLE_QUOTED);
}
Object.keys(da).map((e) => Reflect.get(da, e));
const lx = "custom:fp-ef-card", Oo = (e) => !!e && typeof e == "object" && !Array.isArray(e), Ac = (e) => Array.isArray(e.floors) || ["walls", "openings", "items", "texts"].some((t) => Array.isArray(e[t]));
function Lo(e, t = 0) {
  if (!(t > 6)) {
    if (Oo(e)) {
      if (typeof e.type == "string" && /easy-floorplan/.test(e.type) && Ac(e)) return e;
      for (const i of Object.values(e)) {
        const n = Lo(i, t + 1);
        if (n) return n;
      }
    } else if (Array.isArray(e))
      for (const i of e) {
        const n = Lo(i, t + 1);
        if (n) return n;
      }
  }
}
const ha = (e) => Array.isArray(e) ? e.length : 0;
function cx(e) {
  let t;
  try {
    t = ex(e);
  } catch (s) {
    throw new Error(`Kein gültiges YAML/JSON: ${s.message.split(`
`)[0]}`);
  }
  const i = Oo(t) && Ac(t) ? t : Lo(t);
  if (!i) throw new Error("Keine easy-floorplan-Konfiguration gefunden (erwartet: floors, walls, openings …).");
  const n = structuredClone({ ...i, type: lx }), o = Array.isArray(n.floors) ? n.floors : [], r = (s) => ha(n[s]) + o.reduce((a, l) => a + ha(Oo(l) ? l[s] : 0), 0);
  return {
    config: n,
    summary: {
      floors: o.length || 1,
      walls: r("walls"),
      openings: r("openings"),
      items: r("items"),
      texts: r("texts")
    }
  };
}
var dx = Object.defineProperty, hx = Object.getOwnPropertyDescriptor, Ie = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? hx(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && dx(t, i, o), o;
};
const px = "floorplan_panel", pa = 800, ux = "custom:fp-ef-card";
function fx(e) {
  return e?.ef ? structuredClone(e.ef) : { type: ux };
}
let xe = class extends le {
  constructor() {
    super(...arguments), this.revision = 0, this.edit = !1, this.narrow = !1, this._status = "", this._error = "", this._importText = "", this._importError = "", this._saving = !1, this._rev = 0, this._onConfigChanged = (e) => {
      const t = e.detail?.config;
      t && (e.stopPropagation(), this._pending = t, clearTimeout(this._timer), this._timer = setTimeout(() => void this._flush(), pa));
    }, this._onAreaTap = (e) => {
      const { areaId: t, zoomed: i } = e.detail, n = this.plan?.ef, o = [...(n?.floors ?? []).map((s) => s.areas ?? []), n?.areas ?? []], r = i ? o.flat().find((s) => s?.id === t) : void 0;
      this._room = r && r.sidebar?.length ? { ...r, name: r.name ?? "", sidebar: r.sidebar } : void 0;
    }, this._openImport = () => {
      this._importText = "", this._importError = "", this._dialog()?.showModal();
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
    t && (t.hass = this.hass, (this._loadedEl !== t || !this.edit && e.has("plan")) && (this._loadedEl = t, t.setConfig(fx(this.plan))));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._pending && this._flush();
  }
  async _flush() {
    if (clearTimeout(this._timer), !this._pending || this._saving) {
      this._pending && (this._timer = setTimeout(() => void this._flush(), pa));
      return;
    }
    const e = this._pending;
    this._pending = void 0, await this._saveNow(e);
  }
  async _saveNow(e) {
    this._saving = !0, this._status = "saving", this._error = "";
    try {
      const t = await this.hass.callWS({
        type: `${px}/plan/save`,
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
  _dialog() {
    return this.renderRoot.querySelector("dialog.import");
  }
  async _onImportFile(e) {
    const t = e.target.files?.[0];
    t && (this._importText = await t.text());
  }
  _applyImport() {
    let e;
    try {
      e = cx(this._importText);
    } catch (i) {
      this._importError = i.message;
      return;
    }
    this.renderRoot.querySelector("fp-ef-editor")?.setConfig(e.config), this._pending = e.config, this._dialog()?.close();
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
      <fp-ef-editor
        .panelMode=${!0}
        .panelError=${this._status === "error" ? this._error : ""}
        @config-changed=${this._onConfigChanged}
        @ef-done=${this._close}
        @ef-import-request=${this._openImport}
      ></fp-ef-editor>
      <dialog class="import">
        <h3>easy-floorplan-Konfiguration importieren</h3>
        <p>
          YAML oder JSON einer bestehenden <code>custom:easy-floorplan-card</code> einfügen oder als Datei wählen.
          Das Ergebnis ersetzt den aktuellen Entwurf im Editor und wird erst mit „Apply“ oder „Fertig“ gespeichert.
          Die alte Karte wird nicht verändert.
        </p>
        <input type="file" accept=".yaml,.yml,.json,.txt" @change=${this._onImportFile} />
        <textarea
          rows="12"
          placeholder="type: custom:easy-floorplan-card …"
          .value=${this._importText}
          @input=${(e) => this._importText = e.target.value}
        ></textarea>
        ${this._importError ? u`<div class="err">${this._importError}</div>` : g}
        <div class="row">
          <button @click=${() => this._dialog()?.close()}>Abbrechen</button>
          <button class="primary" ?disabled=${!this._importText.trim()} @click=${this._applyImport}>Als Entwurf laden</button>
        </div>
      </dialog>
    ` : u`<fp-ef-card @fp-area-tap=${this._onAreaTap}></fp-ef-card>
        ${this._room ? u`<fp-room-dialog .hass=${this.hass} .area=${this._room} @close=${() => this._room = void 0}></fp-room-dialog>` : g}`;
  }
};
xe.styles = fe`
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
    dialog.import {
      width: min(640px, 92vw);
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
    }
    dialog.import textarea {
      width: 100%;
      box-sizing: border-box;
      font: 12px monospace;
      margin-top: 8px;
    }
    dialog.import .row {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 8px;
    }
    dialog.import button {
      font: inherit;
      border: 1px solid var(--primary-color);
      background: transparent;
      color: var(--primary-color);
      border-radius: 16px;
      padding: 4px 16px;
      cursor: pointer;
    }
    dialog.import button.primary {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    dialog.import button:disabled {
      opacity: 0.5;
    }
    dialog.import .err {
      color: var(--error-color, #db4437);
      margin-top: 8px;
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
Ie([
  A({ attribute: !1 })
], xe.prototype, "hass", 2);
Ie([
  A({ attribute: !1 })
], xe.prototype, "plan", 2);
Ie([
  A({ type: Number })
], xe.prototype, "revision", 2);
Ie([
  A({ type: Boolean })
], xe.prototype, "edit", 2);
Ie([
  A({ attribute: !1 })
], xe.prototype, "narrow", 2);
Ie([
  k()
], xe.prototype, "_status", 2);
Ie([
  k()
], xe.prototype, "_error", 2);
Ie([
  k()
], xe.prototype, "_room", 2);
Ie([
  k()
], xe.prototype, "_importText", 2);
Ie([
  k()
], xe.prototype, "_importError", 2);
xe = Ie([
  Ge("fp-ef-host")
], xe);
var mx = Object.defineProperty, gx = Object.getOwnPropertyDescriptor, we = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? gx(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && mx(t, i, o), o;
};
const Jn = "floorplan_panel";
let me = class extends le {
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
      const e = await this.hass.callWS({ type: `${Jn}/plan/get` });
      this._setPlan(e.plan, e.revision), this._unsub || (this._unsub = await this.hass.connection.subscribeMessage((t) => this._onEvent(t), {
        type: `${Jn}/subscribe`
      }));
    } catch (e) {
      this._error = e?.message ?? String(e);
    } finally {
      this._loading = !1;
    }
  }
  _setPlan(e, t) {
    const i = so(e);
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
      const o = n.areas.find((r) => r.id === e || r.name.toLowerCase() === i);
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
      const e = await this.hass.callWS({ type: `${Jn}/plan/load_sample` });
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
              </button>` : g}
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
            </div>` : g}
        <button class="icon-btn" title="Zum easy-floorplan-Port wechseln" @click=${this._toggleEf}>
          <ha-icon icon="mdi:swap-horizontal"></ha-icon>
        </button>
        ${this._isAdmin && e ? u`<button class="icon-btn" title="Grundriss bearbeiten" @click=${() => this._openEditor()}>
              <ha-icon icon="mdi:pencil-ruler"></ha-icon>
            </button>` : g}
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
                ></fp-room-dialog>` : g}
          </div>` : u`<div class="message">Lade …</div>`}
    `;
  }
};
me.styles = fe`
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
we([
  A({ attribute: !1 })
], me.prototype, "hass", 2);
we([
  A({ type: Boolean, reflect: !0 })
], me.prototype, "narrow", 2);
we([
  A({ attribute: !1 })
], me.prototype, "panel", 2);
we([
  k()
], me.prototype, "_plan", 2);
we([
  k()
], me.prototype, "_raw", 2);
we([
  k()
], me.prototype, "_ef", 2);
we([
  k()
], me.prototype, "_revision", 2);
we([
  k()
], me.prototype, "_floorId", 2);
we([
  k()
], me.prototype, "_zoomedAreaId", 2);
we([
  k()
], me.prototype, "_editing", 2);
we([
  k()
], me.prototype, "_editRoomId", 2);
we([
  k()
], me.prototype, "_error", 2);
me = we([
  Ge("floorplan-panel")
], me);
