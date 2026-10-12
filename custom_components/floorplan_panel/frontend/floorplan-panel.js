var Gs = Object.defineProperty;
var Vs = (e, t, i) => t in e ? Gs(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var he = (e, t, i) => Vs(e, typeof t != "symbol" ? t + "" : t, i);
function gt(e) {
  return (t) => {
    customElements.get(e) || customElements.define(e, t);
  };
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xt = globalThis, Ln = Xt.ShadowRoot && (Xt.ShadyCSS === void 0 || Xt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Pn = Symbol(), Sr = /* @__PURE__ */ new WeakMap();
let ea = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Pn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Ln && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Sr.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Sr.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const oi = (e) => new ea(typeof e == "string" ? e : e + "", void 0, Pn), me = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, r, o) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[o + 1], e[0]);
  return new ea(i, e, Pn);
}, Ys = (e, t) => {
  if (Ln) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), r = Xt.litNonce;
    r !== void 0 && n.setAttribute("nonce", r), n.textContent = i.cssText, e.appendChild(n);
  }
}, Er = Ln ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return oi(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Zs, defineProperty: Xs, getOwnPropertyDescriptor: Qs, getOwnPropertyNames: Js, getOwnPropertySymbols: el, getPrototypeOf: tl } = Object, Si = globalThis, Ar = Si.trustedTypes, il = Ar ? Ar.emptyScript : "", nl = Si.reactiveElementPolyfillSupport, It = (e, t) => e, ai = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? il : null;
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
} }, Fn = (e, t) => !Zs(e, t), Tr = { attribute: !0, type: String, converter: ai, reflect: !1, useDefault: !1, hasChanged: Fn };
Symbol.metadata ??= Symbol("metadata"), Si.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let et = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Tr) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), r = this.getPropertyDescriptor(t, n, i);
      r !== void 0 && Xs(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: r, set: o } = Qs(this.prototype, t) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: r, set(a) {
      const s = r?.call(this);
      o?.call(this, a), this.requestUpdate(t, s, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Tr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(It("elementProperties"))) return;
    const t = tl(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(It("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(It("properties"))) {
      const i = this.properties, n = [...Js(i), ...el(i)];
      for (const r of n) this.createProperty(r, i[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [n, r] of i) this.elementProperties.set(n, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const r = this._$Eu(i, n);
      r !== void 0 && this._$Eh.set(r, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const r of n) i.unshift(Er(r));
    } else t !== void 0 && i.push(Er(t));
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
    return Ys(t, this.constructor.elementStyles), t;
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
    const n = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, n);
    if (r !== void 0 && n.reflect === !0) {
      const o = (n.converter?.toAttribute !== void 0 ? n.converter : ai).toAttribute(i, n.type);
      this._$Em = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, r = n._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const o = n.getPropertyOptions(r), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : ai;
      this._$Em = r;
      const s = a.fromAttribute(i, o.type);
      this[r] = s ?? this._$Ej?.get(r) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, r = !1, o) {
    if (t !== void 0) {
      const a = this.constructor;
      if (r === !1 && (o = this[t]), n ??= a.getPropertyOptions(t), !((n.hasChanged ?? Fn)(o, i) || n.useDefault && n.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: r, wrapped: o }, a) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? i ?? this[t]), o !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [r, o] of n) {
        const { wrapped: a } = o, s = this[r];
        a !== !0 || this._$AL.has(r) || s === void 0 || this.C(r, void 0, o, s);
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
et.elementStyles = [], et.shadowRootOptions = { mode: "open" }, et[It("elementProperties")] = /* @__PURE__ */ new Map(), et[It("finalized")] = /* @__PURE__ */ new Map(), nl?.({ ReactiveElement: et }), (Si.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Nn = globalThis, Cr = (e) => e, si = Nn.trustedTypes, Ir = si ? si.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ta = "$lit$", Me = `lit$${Math.random().toFixed(9).slice(2)}$`, ia = "?" + Me, rl = `<${ia}>`, qe = document, Nt = () => qe.createComment(""), Rt = (e) => e === null || typeof e != "object" && typeof e != "function", Rn = Array.isArray, ol = (e) => Rn(e) || typeof e?.[Symbol.iterator] == "function", Zi = `[ 	
\f\r]`, xt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Mr = /-->/g, Or = />/g, Re = RegExp(`>|${Zi}(?:([^\\s"'>=/]+)(${Zi}*=${Zi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Lr = /'/g, Pr = /"/g, na = /^(?:script|style|textarea|title)$/i, ra = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), f = ra(1), _ = ra(2), _e = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), Fr = /* @__PURE__ */ new WeakMap(), Ue = qe.createTreeWalker(qe, 129);
function oa(e, t) {
  if (!Rn(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ir !== void 0 ? Ir.createHTML(t) : t;
}
const al = (e, t) => {
  const i = e.length - 1, n = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = xt;
  for (let s = 0; s < i; s++) {
    const l = e[s];
    let c, h, d = -1, p = 0;
    for (; p < l.length && (a.lastIndex = p, h = a.exec(l), h !== null); ) p = a.lastIndex, a === xt ? h[1] === "!--" ? a = Mr : h[1] !== void 0 ? a = Or : h[2] !== void 0 ? (na.test(h[2]) && (r = RegExp("</" + h[2], "g")), a = Re) : h[3] !== void 0 && (a = Re) : a === Re ? h[0] === ">" ? (a = r ?? xt, d = -1) : h[1] === void 0 ? d = -2 : (d = a.lastIndex - h[2].length, c = h[1], a = h[3] === void 0 ? Re : h[3] === '"' ? Pr : Lr) : a === Pr || a === Lr ? a = Re : a === Mr || a === Or ? a = xt : (a = Re, r = void 0);
    const g = a === Re && e[s + 1].startsWith("/>") ? " " : "";
    o += a === xt ? l + rl : d >= 0 ? (n.push(c), l.slice(0, d) + ta + l.slice(d) + Me + g) : l + Me + (d === -2 ? s : g);
  }
  return [oa(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class zt {
  constructor({ strings: t, _$litType$: i }, n) {
    let r;
    this.parts = [];
    let o = 0, a = 0;
    const s = t.length - 1, l = this.parts, [c, h] = al(t, i);
    if (this.el = zt.createElement(c, n), Ue.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = Ue.nextNode()) !== null && l.length < s; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(ta)) {
          const p = h[a++], g = r.getAttribute(d).split(Me), y = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: o, name: y[2], strings: g, ctor: y[1] === "." ? ll : y[1] === "?" ? cl : y[1] === "@" ? dl : Ei }), r.removeAttribute(d);
        } else d.startsWith(Me) && (l.push({ type: 6, index: o }), r.removeAttribute(d));
        if (na.test(r.tagName)) {
          const d = r.textContent.split(Me), p = d.length - 1;
          if (p > 0) {
            r.textContent = si ? si.emptyScript : "";
            for (let g = 0; g < p; g++) r.append(d[g], Nt()), Ue.nextNode(), l.push({ type: 2, index: ++o });
            r.append(d[p], Nt());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ia) l.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(Me, d + 1)) !== -1; ) l.push({ type: 7, index: o }), d += Me.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const n = qe.createElement("template");
    return n.innerHTML = t, n;
  }
}
function dt(e, t, i = e, n) {
  if (t === _e) return t;
  let r = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const o = Rt(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(!1), o === void 0 ? r = void 0 : (r = new o(e), r._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = r : i._$Cl = r), r !== void 0 && (t = dt(e, r._$AS(e, t.values), r, n)), t;
}
class sl {
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
    const { el: { content: i }, parts: n } = this._$AD, r = (t?.creationScope ?? qe).importNode(i, !0);
    Ue.currentNode = r;
    let o = Ue.nextNode(), a = 0, s = 0, l = n[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let c;
        l.type === 2 ? c = new yt(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new hl(o, this, t)), this._$AV.push(c), l = n[++s];
      }
      a !== l?.index && (o = Ue.nextNode(), a++);
    }
    return Ue.currentNode = qe, r;
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
  constructor(t, i, n, r) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = dt(this, t, i), Rt(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== _e && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ol(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && Rt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(qe.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, r = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = zt.createElement(oa(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const o = new sl(r, this), a = o.u(this.options);
      o.p(i), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = Fr.get(t.strings);
    return i === void 0 && Fr.set(t.strings, i = new zt(t)), i;
  }
  k(t) {
    Rn(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, r = 0;
    for (const o of t) r === i.length ? i.push(n = new yt(this.O(Nt()), this.O(Nt()), this, this.options)) : n = i[r], n._$AI(o), r++;
    r < i.length && (this._$AR(n && n._$AB.nextSibling, r), i.length = r);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Cr(t).nextSibling;
      Cr(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Ei {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, r, o) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = i, this._$AM = r, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = m;
  }
  _$AI(t, i = this, n, r) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = dt(this, t, i, 0), a = !Rt(t) || t !== this._$AH && t !== _e, a && (this._$AH = t);
    else {
      const s = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = dt(this, s[n + l], i, l), c === _e && (c = this._$AH[l]), a ||= !Rt(c) || c !== this._$AH[l], c === m ? t = m : t !== m && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    a && !r && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ll extends Ei {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class cl extends Ei {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class dl extends Ei {
  constructor(t, i, n, r, o) {
    super(t, i, n, r, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = dt(this, t, i, 0) ?? m) === _e) return;
    const n = this._$AH, r = t === m && n !== m || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== m && (n === m || r);
    r && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class hl {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    dt(this, t);
  }
}
const pl = { I: yt }, ul = Nn.litHtmlPolyfillSupport;
ul?.(zt, yt), (Nn.litHtmlVersions ??= []).push("3.3.3");
const fl = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let r = n._$litPart$;
  if (r === void 0) {
    const o = i?.renderBefore ?? null;
    n._$litPart$ = r = new yt(t.insertBefore(Nt(), o), o, void 0, i ?? {});
  }
  return r._$AI(e), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zn = globalThis;
let ae = class extends et {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = fl(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return _e;
  }
};
ae._$litElement$ = !0, ae.finalized = !0, zn.litElementHydrateSupport?.({ LitElement: ae });
const ml = zn.litElementPolyfillSupport;
ml?.({ LitElement: ae });
(zn.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ai = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gl = { attribute: !0, type: String, converter: ai, reflect: !1, hasChanged: Fn }, yl = (e = gl, t, i) => {
  const { kind: n, metadata: r } = i;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), n === "accessor") {
    const { name: a } = i;
    return { set(s) {
      const l = t.get.call(this);
      t.set.call(this, s), this.requestUpdate(a, l, e, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(a, void 0, e, s), s;
    } };
  }
  if (n === "setter") {
    const { name: a } = i;
    return function(s) {
      const l = this[a];
      t.call(this, s), this.requestUpdate(a, l, e, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function C(e) {
  return (t, i) => typeof i == "object" ? yl(e, t, i) : ((n, r, o) => {
    const a = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, n), a ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function M(e) {
  return C({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bl = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ti(e, t) {
  return (i, n, r) => {
    const o = (a) => a.renderRoot?.querySelector(e) ?? null;
    return bl(i, n, { get() {
      return o(this);
    } });
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vl = { CHILD: 2 }, Ci = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Ii = class {
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
const { I: _l } = pl, Nr = (e) => e, Rr = () => document.createComment(""), $t = (e, t, i) => {
  const n = e._$AA.parentNode, r = t === void 0 ? e._$AB : t._$AA;
  if (i === void 0) {
    const o = n.insertBefore(Rr(), r), a = n.insertBefore(Rr(), r);
    i = new _l(o, a, e, e.options);
  } else {
    const o = i._$AB.nextSibling, a = i._$AM, s = a !== e;
    if (s) {
      let l;
      i._$AQ?.(e), i._$AM = e, i._$AP !== void 0 && (l = e._$AU) !== a._$AU && i._$AP(l);
    }
    if (o !== r || s) {
      let l = i._$AA;
      for (; l !== o; ) {
        const c = Nr(l).nextSibling;
        Nr(n).insertBefore(l, r), l = c;
      }
    }
  }
  return i;
}, ze = (e, t, i = e) => (e._$AI(t, i), e), wl = {}, aa = (e, t = wl) => e._$AH = t, xl = (e) => e._$AH, Xi = (e) => {
  e._$AR(), e._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zr = (e, t, i) => {
  const n = /* @__PURE__ */ new Map();
  for (let r = t; r <= i; r++) n.set(e[r], r);
  return n;
}, ke = Ci(class extends Ii {
  constructor(e) {
    if (super(e), e.type !== vl.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e, t, i) {
    let n;
    i === void 0 ? i = t : t !== void 0 && (n = t);
    const r = [], o = [];
    let a = 0;
    for (const s of e) r[a] = n ? n(s, a) : a, o[a] = i(s, a), a++;
    return { values: o, keys: r };
  }
  render(e, t, i) {
    return this.dt(e, t, i).values;
  }
  update(e, [t, i, n]) {
    const r = xl(e), { values: o, keys: a } = this.dt(t, i, n);
    if (!Array.isArray(r)) return this.ut = a, o;
    const s = this.ut ??= [], l = [];
    let c, h, d = 0, p = r.length - 1, g = 0, y = o.length - 1;
    for (; d <= p && g <= y; ) if (r[d] === null) d++;
    else if (r[p] === null) p--;
    else if (s[d] === a[g]) l[g] = ze(r[d], o[g]), d++, g++;
    else if (s[p] === a[y]) l[y] = ze(r[p], o[y]), p--, y--;
    else if (s[d] === a[y]) l[y] = ze(r[d], o[y]), $t(e, l[y + 1], r[d]), d++, y--;
    else if (s[p] === a[g]) l[g] = ze(r[p], o[g]), $t(e, r[d], r[p]), p--, g++;
    else if (c === void 0 && (c = zr(a, g, y), h = zr(s, d, p)), c.has(s[d])) if (c.has(s[p])) {
      const b = h.get(a[g]), v = b !== void 0 ? r[b] : null;
      if (v === null) {
        const x = $t(e, r[d]);
        ze(x, o[g]), l[g] = x;
      } else l[g] = ze(v, o[g]), $t(e, r[d], v), r[b] = null;
      g++;
    } else Xi(r[p]), p--;
    else Xi(r[d]), d++;
    for (; g <= y; ) {
      const b = $t(e, l[y + 1]);
      ze(b, o[g]), l[g++] = b;
    }
    for (; d <= p; ) {
      const b = r[d++];
      b !== null && Xi(b);
    }
    return this.ut = a, aa(e, l), _e;
  }
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const sa = Ci(class extends Ii {
  constructor() {
    super(...arguments), this.key = m;
  }
  render(e, t) {
    return this.key = e, t;
  }
  update(e, [t, i]) {
    return t !== this.key && (aa(e), this.key = t), i;
  }
});
class Dr {
  constructor(t) {
    this._hass = t;
  }
  getEntityState(t) {
    return this._hass.states[t];
  }
}
class $l {
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
function kl(e, t, i, n) {
  return e ? i ? new $l(t, new Dr(e), n) : new Dr(e) : { getEntityState: () => {
  } };
}
function Sl(e, t, i, n, r) {
  if (!e) return;
  const o = kl(e, i, n, r), a = {};
  for (const s of t)
    a[s] = o.getEntityState(s);
  return {
    states: a,
    formatEntityState: (s) => e.formatEntityState(s),
    formatEntityAttributeValue: e.formatEntityAttributeValue ? (s, l) => e.formatEntityAttributeValue(s, l) : void 0
  };
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const El = {}, Hr = Ci(class extends Ii {
  constructor() {
    super(...arguments), this.ot = El;
  }
  render(e, t) {
    return t();
  }
  update(e, [t, i]) {
    if (Array.isArray(t)) {
      if (Array.isArray(this.ot) && this.ot.length === t.length && t.every((n, r) => n === this.ot[r])) return _e;
    } else if (this.ot === t) return _e;
    return this.ot = Array.isArray(t) ? Array.from(t) : t, this.render(t, i);
  }
}), Al = /* @__PURE__ */ new Set([
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
]), Tl = /^[a-z0-9#%.,/_() +*-]+$/i, Cl = /([a-z][a-z0-9-]*)\s*\(/gi;
function B(e) {
  if (typeof e != "string") return;
  const t = e.trim();
  if (!t || !Tl.test(t) || t.includes("/*") || t.includes("*/") || !/^[a-z#]/i.test(t)) return;
  let i = 0;
  for (let r = 0; r < t.length; r++) {
    const o = t[r];
    if (o === "(") i++;
    else if (o === ")" && --i < 0) return;
  }
  if (i !== 0) return;
  const n = new RegExp(Cl.source, "gi");
  for (let r; r = n.exec(t); )
    if (!Al.has(r[1].toLowerCase())) return;
  return t;
}
function le(e, t) {
  return B(e) ?? t;
}
function D(e, t) {
  if (e == null || typeof e == "string" && e.trim() === "") return t;
  const i = typeof e == "number" ? e : Number(e);
  return Number.isFinite(i) ? i : t;
}
function se(e) {
  if (typeof e != "string") return;
  const t = e.trim().replace(/[^a-zA-Z0-9_-]/g, "");
  return t === "" ? void 0 : t;
}
const Il = {
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
function Ml(e) {
  const t = e.trim().toLowerCase(), i = Il[t];
  if (i) return i;
  const n = /^#([0-9a-f]{3,8})$/i.exec(t);
  if (n) {
    const o = n[1];
    return o.length === 3 || o.length === 4 ? [0, 1, 2].map((a) => parseInt(o[a] + o[a], 16)) : o.length === 6 || o.length === 8 ? [0, 2, 4].map((a) => parseInt(o.slice(a, a + 2), 16)) : void 0;
  }
  const r = /^rgba?\(([^)]*)\)$/.exec(t);
  if (r) {
    const o = r[1].split(/[\s,/]+/).filter((s) => s !== "");
    if (o.length < 3) return;
    const a = o.slice(0, 3).map((s) => {
      if (s.endsWith("%")) {
        const l = Number(s.slice(0, -1));
        return Number.isFinite(l) ? l / 100 * 255 : NaN;
      }
      return Number(s);
    });
    return a.some((s) => !Number.isFinite(s)) ? void 0 : a.map((s) => Math.max(0, Math.min(255, s)));
  }
}
function Dn([e, t, i]) {
  const n = (r) => {
    const o = r / 255;
    return o <= 0.03928 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * n(e) + 0.7152 * n(t) + 0.0722 * n(i);
}
const Ol = "#212121", Ll = "#ffffff", Pl = Dn([33, 33, 33]), Fl = Dn([255, 255, 255]);
function la(e) {
  if (typeof e != "string") return;
  const t = Ml(e);
  if (!t) return;
  const i = Dn(t), n = (r) => (Math.max(i, r) + 0.05) / (Math.min(i, r) + 0.05);
  return n(Pl) >= n(Fl) ? Ol : Ll;
}
const Nl = /^[a-z0-9]+(?:-[a-z0-9]+)*:[a-z0-9]+(?:-[a-z0-9]+)*$/i;
function Mt(e) {
  if (typeof e != "string") return;
  const t = e.trim();
  return Nl.test(t) ? t : void 0;
}
function Pe(e) {
  if (typeof e != "string") return;
  const t = e.trim().replace(/[^a-zA-Z0-9_.-]/g, "");
  return t === "" ? void 0 : t;
}
const Mi = "default", ca = 10, li = [
  {
    id: Mi,
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
], Oi = "var(--fp-skin-bg, var(--card-background-color, #fff))", Hn = "var(--fp-skin-wall, var(--primary-text-color))", da = "var(--fp-skin-text, var(--primary-text-color))", W = "var(--fp-skin-accent, var(--primary-color, #03a9f4))", Qi = "var(--fp-skin-active, var(--state-light-active-color, var(--state-active-color, #fdd835)))", De = "var(--fp-skin-badge-bg, var(--card-background-color, #fff))";
function Un(e) {
  if (typeof e == "string")
    return li.find((t) => t.id === e);
}
function Rl(e) {
  const t = Un(e);
  return t ? Object.entries(t.vars).map(([i, n]) => `${i}:${n};`).join("") : "";
}
function zl(e) {
  const t = Un(e);
  return t && t.id !== Mi ? t.id : void 0;
}
const Dl = oi(
  li.filter((e) => e.id !== Mi).map(
    (e) => `:host([data-skin="${e.id}"]){` + Object.entries(e.vars).map(([t, i]) => `${t}:${i};`).join("") + "}"
  ).join(`
`)
), ha = me`
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
`, Hl = 6e4, Ul = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
function pa(e) {
  return Ul.has(e);
}
function Bn(e) {
  if (e === "") return;
  const t = Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function ua(e) {
  let t = 0;
  for (const i of e)
    if (!pa(i.newState)) {
      if (Bn(i.newState) === void 0) return !1;
      t++;
    }
  return t > 0;
}
function Bl(e, t, i) {
  const n = e.map((c) => Bn(c.newState)), r = n.filter((c) => c !== void 0);
  if (!r.length) return e;
  const o = (Math.max(...r) - Math.min(...r)) / t;
  if (!(o > 0) && !e.some((c) => pa(c.newState)))
    return e.length ? [e[0], e[e.length - 1]] : [];
  const a = [e[0]];
  let s = n[0], l = e[0].timestamp;
  for (let c = 1; c < e.length - 1; c++) {
    const h = n[c];
    if (h === void 0) {
      a.push(e[c]), s = void 0, l = e[c].timestamp;
      continue;
    }
    if (s === void 0) {
      a.push(e[c]), s = h, l = e[c].timestamp;
      continue;
    }
    const d = n[c - 1], p = n[c + 1], g = d !== void 0 && p !== void 0 && (h > d && h >= p || h < d && h <= p);
    (Math.abs(h - s) >= o || g && Math.abs(h - s) >= o / 2 || e[c].timestamp - l >= i) && (a.push(e[c]), s = h, l = e[c].timestamp);
  }
  return e.length > 1 && a.push(e[e.length - 1]), a;
}
function jl(e, t = {}) {
  const i = t.numericSteps ?? 0;
  return !(i > 0) || e.length < 3 || !ua(e) ? e : Bl(e, i, t.maxGapMs ?? Hl);
}
function Wl(e, t = {}) {
  if (!(t.numericSteps ?? 0) || e.length === 0) return e;
  const i = /* @__PURE__ */ new Map();
  for (const r of e) {
    const o = i.get(r.entityId);
    o ? o.push(r) : i.set(r.entityId, [r]);
  }
  const n = /* @__PURE__ */ new Set();
  for (const r of i.values())
    for (const o of jl(r, t)) n.add(o);
  return e.filter((r) => n.has(r));
}
function ql(e, t) {
  if (!(t > 2) || e.length <= t || !ua(e)) return e;
  const i = e.map((a) => Bn(a.newState)), n = /* @__PURE__ */ new Set([0, e.length - 1]);
  for (let a = 0; a < e.length; a++)
    i[a] === void 0 && n.add(a);
  const r = [];
  let o;
  for (let a = 0; a < e.length; a++) {
    const s = i[a];
    if (s === void 0) {
      o = void 0;
      continue;
    }
    a > 0 && a < e.length - 1 && o !== void 0 && r.push({ i: a, delta: Math.abs(s - o) }), o = s;
  }
  r.sort((a, s) => s.delta - a.delta);
  for (const { i: a } of r) {
    if (n.size >= t) break;
    n.add(a);
  }
  return e.filter((a, s) => n.has(s));
}
function Dt(e) {
  const t = typeof e.color == "string" ? B(e.color) : void 0;
  if (t) return t;
  const i = e.attributes?.color, n = typeof i == "string" ? B(i) : void 0;
  if (n) return n;
  const r = String(e.newState ?? "").trim().toLowerCase();
  return e.entityId.startsWith("light.") ? r === "off" ? De : Qi : e.entityId.startsWith("cover.") ? r === "closed" ? De : W : e.entityId.startsWith("sensor.") || e.entityId.startsWith("binary_sensor.") ? r === "off" ? De : W : e.entityId.startsWith("fan.") ? r === "off" ? De : Qi : e.entityId.startsWith("media_player.") ? r === "idle" ? De : Qi : r === "on" || r === "open" || r === "playing" || r === "home" || r === "locked" || r === "unlocked" ? W : De;
}
class Kl {
  constructor(t = {}) {
    this._cache = /* @__PURE__ */ new Map(), this._events = [], this._eventsByEntity = /* @__PURE__ */ new Map(), this._maxCacheEntries = 8, this._loadCommitId = 0, this._loader = t.loader ?? (async () => []);
  }
  configure(t = {}) {
    this._context = t;
  }
  async loadHistory(t, i, n = {}) {
    const r = ++this._loadCommitId, o = n.scopeKey ?? "all", a = `${t}:${i}:${o}:${n.numericSteps ?? 0}`;
    if (this._cache.has(a)) {
      if (r === this._loadCommitId) {
        const p = this._cache.get(a);
        this._events = p, this._eventsByEntity = this._groupEventsByEntity(p);
      }
      return;
    }
    const s = n.hass ?? this._context?.hass, l = n.watched ?? this._context?.watched, h = (s && Array.isArray(l) ? await this._loadFromHass(s, t, i, l) : await this._loader(t, i, { ...this._context, ...n, hass: s, watched: l })).slice().sort((p, g) => p.timestamp - g.timestamp).map((p) => ({
      ...p,
      attributes: p.attributes ?? {}
    })), d = Wl(h, { numericSteps: n.numericSteps });
    if (r === this._loadCommitId) {
      if (this._cache.set(a, d), this._cache.size > this._maxCacheEntries) {
        const p = this._cache.keys().next().value;
        p && this._cache.delete(p);
      }
      this._events = d, this._eventsByEntity = this._groupEventsByEntity(d);
    }
  }
  async loadFromHass(t, i, n, r) {
    return this._loadFromHass(t, i, n, r);
  }
  async _loadFromHass(t, i, n, r) {
    if (!r.length) return [];
    const o = t.callWS, a = t.callApi, s = new Date(i * 1e3).toISOString(), l = new Date(n * 1e3).toISOString(), c = new Set(r), h = {
      type: "history/history_during_period",
      start_time: s,
      end_time: l,
      minimal_response: !1,
      no_attributes: !1,
      significant_changes_only: !1,
      entity_ids: r
    };
    let d;
    if (typeof o == "function")
      try {
        d = await o(h);
      } catch (p) {
        console.warn("[easy-floorplan] Replay WS history query failed", { startTime: s, endTime: l, watchedCount: r.length, error: p });
      }
    if (!d && typeof a == "function")
      try {
        d = await a("GET", `history/period/${encodeURIComponent(s)}`, {
          end_time: l,
          filter_entity_id: r.join(","),
          minimal_response: !1,
          no_attributes: !1,
          significant_changes_only: !1
        });
      } catch (p) {
        console.warn("[easy-floorplan] Replay REST history query failed", { startTime: s, endTime: l, watchedCount: r.length, error: p });
      }
    if (!d)
      throw new Error(`Unable to load history via websocket or REST API (ws:${typeof o == "function" ? "yes" : "no"}, api:${typeof a == "function" ? "yes" : "no"}).`);
    return this._normalizeHistoryPayload(d, i, n, c);
  }
  _normalizeHistoryPayload(t, i, n, r) {
    const o = /* @__PURE__ */ new Map(), a = (p, g) => {
      if (typeof p == "number")
        return Number.isFinite(p) ? p > 1e12 ? p / 1e3 : p : Number.NaN;
      if (typeof p == "string") {
        const y = Number(p);
        if (Number.isFinite(y)) return y > 1e12 ? y / 1e3 : y;
        const b = Date.parse(p) / 1e3;
        return Number.isFinite(b) ? b : Number.NaN;
      }
      return Date.parse(g) / 1e3;
    }, s = (p, g) => {
      for (const y of g) {
        const b = p[y];
        if (b !== void 0) return b;
      }
    }, l = (p, g) => {
      const y = g.filter((b) => !!b && typeof b == "object");
      y.length && o.set(p, y.map((b) => {
        const v = s(b, ["state", "s"]), x = s(b, ["attributes", "a"]), A = s(b, ["last_updated", "lu"]), u = s(b, ["last_changed", "lc"]);
        return {
          state: typeof v == "string" || typeof v == "number" || typeof v == "boolean" ? String(v) : void 0,
          attributes: x && typeof x == "object" ? x : void 0,
          last_updated: typeof A == "string" || typeof A == "number" ? A : void 0,
          last_changed: typeof u == "string" || typeof u == "number" ? u : void 0
        };
      }));
    };
    if (Array.isArray(t))
      for (const p of t) {
        if (!p || typeof p != "object") continue;
        const g = p, y = typeof g.entity_id == "string" ? g.entity_id : void 0, b = Array.isArray(g.states) ? g.states : Array.isArray(g.history) ? g.history : [];
        y && b.length && l(y, b);
      }
    else if (t && typeof t == "object")
      for (const [p, g] of Object.entries(t)) {
        if (Array.isArray(g) && g.length) {
          l(p, g);
          continue;
        }
        if (g && typeof g == "object") {
          const y = g;
          Array.isArray(y.states) && y.states.length && l(p, y.states);
        }
      }
    if (!o.size)
      throw new Error("History payload contained no parseable state rows.");
    const c = [], h = new Date(n * 1e3).toISOString();
    for (const [p, g] of o.entries())
      if (g.length && r.has(p)) {
        if (g.length === 1) {
          const y = g[0], b = a(y.last_updated ?? y.last_changed, h);
          if (!Number.isFinite(b) || b < i || b > n)
            continue;
          c.push({
            timestamp: b,
            entityId: p,
            oldState: y.state ?? "unknown",
            newState: y.state ?? "unknown",
            attributes: y.attributes ?? {}
          });
          continue;
        }
        for (let y = 1; y < g.length; y += 1) {
          const b = g[y - 1], v = g[y], x = a(b.last_updated ?? b.last_changed, h), A = a(v.last_updated ?? v.last_changed, h);
          if (!Number.isFinite(x) || !Number.isFinite(A) || A < i || x > n)
            continue;
          const u = b.state !== v.state, $ = !this._attributesEqual(b.attributes ?? {}, v.attributes ?? {});
          !u && !$ || c.push({
            timestamp: A,
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
    return c.sort((p, g) => p.timestamp - g.timestamp);
  }
  _attributesEqual(t, i) {
    if (t === i) return !0;
    if (!t || !i) return !t && !i;
    if (typeof t != typeof i) return !1;
    if (Array.isArray(t) || Array.isArray(i)) {
      if (!Array.isArray(t) || !Array.isArray(i) || t.length !== i.length) return !1;
      for (let s = 0; s < t.length; s += 1)
        if (!this._attributesEqual(t[s], i[s])) return !1;
      return !0;
    }
    if (typeof t != "object") return !1;
    const n = t, r = i, o = Object.keys(n), a = Object.keys(r);
    if (o.length !== a.length) return !1;
    for (const s of o)
      if (!(s in r) || !this._attributesEqual(n[s], r[s])) return !1;
    return !0;
  }
  clearCache() {
    this._loadCommitId += 1, this._cache.clear(), this._events = [], this._eventsByEntity.clear();
  }
  getStateAt(t) {
    const i = /* @__PURE__ */ new Map();
    for (const [n, r] of this._eventsByEntity.entries()) {
      const o = this._findLastEventAtOrBefore(r, t);
      if (o) {
        i.set(n, this._toHassEntity(n, o.newState, o.attributes, o.timestamp));
        continue;
      }
      const a = r[0];
      a && i.set(n, this._toHassEntity(n, a.oldState, a.attributes, 0));
    }
    return i;
  }
  _groupEventsByEntity(t) {
    const i = /* @__PURE__ */ new Map();
    for (const n of t) {
      const r = i.get(n.entityId) ?? [];
      r.push(n), i.set(n.entityId, r);
    }
    for (const n of i.values())
      n.sort((r, o) => r.timestamp - o.timestamp);
    return i;
  }
  _findLastEventAtOrBefore(t, i) {
    let n = 0, r = t.length - 1, o;
    for (; n <= r; ) {
      const a = n + r >> 1, s = t[a];
      s.timestamp <= i ? (o = s, n = a + 1) : r = a - 1;
    }
    return o;
  }
  _toHassEntity(t, i, n, r) {
    const o = Number.isFinite(r) ? r : Date.now() / 1e3;
    return {
      entity_id: t,
      state: i,
      attributes: n ?? {},
      last_changed: new Date(o * 1e3).toISOString(),
      last_updated: new Date(o * 1e3).toISOString(),
      context: { id: "history", parent_id: null, user_id: null }
    };
  }
  getEvents() {
    return this._events.slice();
  }
  getEventBefore(t) {
    if (!this._events.length) return;
    let i = 0, n = this._events.length - 1, r = -1;
    for (; i <= n; ) {
      const o = i + n >> 1;
      this._events[o].timestamp <= t ? (r = o, i = o + 1) : n = o - 1;
    }
    return r >= 0 ? this._events[r] : void 0;
  }
  getEventAfter(t) {
    if (!this._events.length) return;
    let i = 0, n = this._events.length - 1, r = this._events.length;
    for (; i <= n; ) {
      const o = i + n >> 1;
      this._events[o].timestamp >= t ? (r = o, n = o - 1) : i = o + 1;
    }
    return r < this._events.length ? this._events[r] : void 0;
  }
}
var Gl = Object.defineProperty, Vl = Object.getOwnPropertyDescriptor, Ye = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Vl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (r = (n ? a(t, i, r) : a(r)) || r);
  return n && r && Gl(t, i, r), r;
};
let ue = class extends ae {
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
    const i = Dt(e), n = `left:${this._getMarkerLeftClamped(e.timestamp, 7)};--stack-offset:${t};--marker-pct:${this._pct(e.timestamp)};`;
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
      e.set(t, ql(i, ue.MAX_MARKERS_PER_LANE));
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
    return ((typeof t.friendly_name == "string" ? t.friendly_name : void 0)?.trim() || e.entityId).replace(/^./, (r) => r.toUpperCase());
  }
  _seekFromClientX(e) {
    const t = this.expanded ? ".timeline-track-overlay" : ".timeline", i = this.shadowRoot?.querySelector(t)?.getBoundingClientRect();
    if (!i) return;
    const n = Math.max(1, this.endTime - this.startTime), r = Math.min(1, Math.max(0, (e - i.left) / i.width)), o = Math.round(this.startTime + r * n);
    this._seek(o);
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
    if (!this._hidden.size) return m;
    const e = this._hidden.size;
    return f`
      <div class="lanes-hidden">
        <span>${e} lane${e === 1 ? "" : "s"} hidden</span>
        <button class="lanes-hidden-show" @click=${() => this._showAllLanes()}>Show all</button>
      </div>
    `;
  }
  _renderExpandedTimeline(e) {
    const t = this._laneSeries(), i = Array.from(t.keys()), n = (this.currentTime - this.startTime) / e * 100;
    return f`
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
        @click=${(r) => this._handleTimelineClick(r)}
        @pointerdown=${(r) => this._handlePointerDown(r)}
        @pointermove=${(r) => this._handlePointerMove(r)}
        @pointerup=${(r) => this._handlePointerUp(r)}
        @pointerleave=${(r) => this._handlePointerUp(r)}
        @keydown=${this._handleKeyDown}
      >
        <div class="timeline-track-overlay" style="grid-row:1 / span ${i.length};" aria-hidden="true">
          <div class="playhead playhead-expanded" style="left:${n}%">
            <span class="playhead-time">${this._formatTimestamp(this.currentTime)}</span>
          </div>
        </div>
        ${Hr([this.events, this.startTime, this.endTime, this._hidden], () => i.map((r, o) => {
      const a = t.get(r) ?? [], s = o + 1, l = this._getEntityLabel(a[0]), c = this._hidden.has(r);
      return f`
            <button
              class="lane-label ${c ? "lane-off" : ""}"
              style="grid-row:${s};"
              aria-pressed=${c ? "false" : "true"}
              title=${c ? `Show ${l} on the timeline` : `Hide ${l} from the timeline`}
              @click=${(h) => {
        h.stopPropagation(), this._toggleLane(r);
      }}
            ><span class="lane-dot" aria-hidden="true"></span><span class="lane-name">${l}</span></button>
            <div class="lane lane-track ${c ? "lane-off" : ""}" style="grid-row:${s};">
              ${(c ? [] : a).map((h) => {
        const d = Dt(h), p = this._getMarkerLeftClamped(h.timestamp, 4);
        return f`
                  <button
                    class="marker"
                    style=${`left:${p};--marker-pct:${this._pct(h.timestamp)};${d ? `background:${d};box-shadow:0 0 0 2px ${d}22;` : ""}`}
                    title=${this._formatEventTitle(h)}
                    @click=${(g) => {
          g.stopPropagation(), this._seek(h.timestamp);
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
      return f`<div class="timeline-empty">No history available.</div>`;
    const e = Math.max(1, this.endTime - this.startTime);
    return this.expanded ? f`${this._renderHiddenNotice()}${this._renderExpandedTimeline(e)}` : f`
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
        ${Hr([this.events, this.startTime, this.endTime], () => this._groupEventsByTimestamp().map((t) => f`
          <div
            class="marker-cluster"
            style="left:${this._getMarkerLeftClamped(t.timestamp, 7)};--marker-pct:${this._pct(t.timestamp)};"
            title=${this._formatClusterTitle(t.events)}
            @click=${(i) => {
      i.stopPropagation(), this._seek(t.timestamp);
    }}
          >
            ${t.events.map((i, n) => {
      const r = n === 0 ? "-2px" : n === 1 ? "2px" : n === 2 ? "-4px" : "4px";
      return f`
                <button
                  class="marker"
                  style=${this._markerStyle(i, r)}
                  title=${this._formatEventTitle(i)}
                  @click=${(o) => {
        o.stopPropagation(), this._seek(i.timestamp);
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
ue.MAX_MARKERS_PER_LANE = 150;
ue.styles = me`
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
    .playhead { position: absolute; top: -2px; width: 2px; height: calc(100% + 4px); background: ${oi(W)}; }
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
      background: ${oi(W)};
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
Ye([
  C({ attribute: !1 })
], ue.prototype, "events", 2);
Ye([
  C({ type: Number })
], ue.prototype, "startTime", 2);
Ye([
  C({ type: Number })
], ue.prototype, "endTime", 2);
Ye([
  C({ type: Number })
], ue.prototype, "currentTime", 2);
Ye([
  C({ type: Boolean })
], ue.prototype, "expanded", 2);
Ye([
  M()
], ue.prototype, "_hidden", 2);
ue = Ye([
  Ai("easy-floorplan-history-timeline")
], ue);
function Ur(e) {
  return !!e?.haArea && (e.filterEntities ?? !0);
}
const Br = -6, Yl = 6, jn = 0.45, ci = 1, fa = "scale", ma = "dim", jr = 0.92, Wr = 80, qr = 260, dn = 0.25, hn = 4, ga = 10, pn = 1, Wn = 14, Zl = 3, Li = 140, ya = "var(--fp-skin-glow, #ffd9a0)", Kr = 0.18, di = 0.6, Gr = 0.5, Vr = 0.45, Xl = 0.5, qn = 14, Be = 34, hi = 34, Ot = 16, Pi = 80, Fi = 0, Ni = 360, Ql = "var(--fp-skin-furniture, #9e9e9e)", rt = 1e3, Ht = 600, Kn = 20, Yr = 50;
function Jl(e, t) {
  return e ?? t;
}
function Zr(e, t) {
  return t <= 0 ? 100 : Math.round(e / t * 100);
}
function Ji(e, t) {
  return Math.max(1, Math.round(t * e / 100));
}
function Xr(e) {
  const t = e?.floors;
  return !t || typeof t != "object" ? [] : Object.values(t).filter((i) => !!i && typeof i.floor_id == "string" && typeof i.name == "string").sort((i, n) => (i.level ?? 0) - (n.level ?? 0) || i.name.localeCompare(n.name));
}
function ec(e) {
  const t = e?.areas;
  return !t || typeof t != "object" ? [] : Object.values(t).filter((i) => !!i && typeof i.area_id == "string" && typeof i.name == "string").sort((i, n) => i.name.localeCompare(n.name));
}
function tc(e, t) {
  if (!("name" in e)) return e;
  const i = (e.name ?? "").toString().trim(), n = ic(t, i);
  return { ...e, name: n ? n.name : i || void 0, haArea: n?.area_id };
}
function ic(e, t) {
  const i = (t ?? "").trim();
  if (!i) return;
  const n = e.find((s) => s.name === i);
  if (n) return n;
  const r = i.toLowerCase(), o = e.find((s) => s.name.toLowerCase() === r);
  if (o) return o;
  const a = r.replace(/\s+/g, " ");
  return e.find((s) => s.name.trim().toLowerCase().replace(/\s+/g, " ") === a);
}
function nc(e, t) {
  const i = e, n = i?.entities?.[t];
  return n ? n.area_id ? n.area_id : (n.device_id ? i?.devices?.[n.device_id] : void 0)?.area_id ?? void 0 : void 0;
}
function en(e, t) {
  const n = e?.entities;
  return !n || typeof n != "object" ? [] : Object.keys(n).filter((r) => nc(e, r) === t);
}
function rc(e) {
  return {
    type: e,
    width: rt,
    height: Ht,
    grid: Kn,
    walls: [],
    openings: [],
    items: [],
    texts: [],
    furniture: [],
    trackers: [],
    areas: []
  };
}
function oc() {
  return { overlayScale: "plan" };
}
function Y(e) {
  return `${e}_${Math.random().toString(36).slice(2, 9)}`;
}
function un(e, t) {
  if (e === t) return !0;
  if (Array.isArray(e) || Array.isArray(t))
    return !Array.isArray(e) || !Array.isArray(t) || e.length !== t.length ? !1 : e.every((r, o) => un(r, t[o]));
  if (typeof e != "object" || typeof t != "object" || e === null || t === null) return !1;
  const i = e, n = t;
  for (const r of /* @__PURE__ */ new Set([...Object.keys(i), ...Object.keys(n)]))
    if (!un(i[r], n[r])) return !1;
  return !0;
}
function ac(e, t = []) {
  return {
    id: Y("floor"),
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
function sc(e) {
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
function lc(e) {
  const t = /* @__PURE__ */ new Set();
  return e.map((i, n) => {
    let r = i.id || `floor_${n + 1}`;
    for (; t.has(r); ) r = `${r}_${n + 1}`;
    return t.add(r), r === i.id ? i : { ...i, id: r };
  });
}
function cc(e, t, i) {
  const n = e.findIndex((s) => s.id === t), r = n + i;
  if (n < 0 || r < 0 || r >= e.length) return null;
  const o = [...e], [a] = o.splice(n, 1);
  return o.splice(r, 0, a), o;
}
function je(e) {
  return e.floors && e.floors.length ? lc(e.floors.map(sc)) : [
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
function pi(e, t) {
  if (!t) return null;
  const i = e?.[t.entity]?.state;
  if (i == null || i === "unavailable" || i === "unknown") return !1;
  const n = i === "on" || i === "open" || i === "home" || i === "detected";
  return t.invert ? !n : n;
}
function Qr(e, t) {
  if (!e || t == null || !Number.isFinite(t)) return null;
  const i = e.max - e.min;
  if (i === 0) return null;
  const n = (t - e.min) / i, r = Math.max(0, Math.min(1, n));
  return e.invert ? 1 - r : r;
}
const dc = "airHandler", hc = "air handler", pc = "utility", uc = [
  "hvac",
  "ahu",
  "furnace",
  "ventilation"
], fc = {
  w: 60,
  h: 56
}, mc = [
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
], gc = {
  id: dc,
  name: hc,
  category: pc,
  keywords: uc,
  size: fc,
  parts: mc
}, yc = "bathtub", bc = "bathtub", vc = "bath", _c = [
  "bath",
  "tub"
], wc = {
  w: 150,
  h: 76
}, xc = [
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
], $c = {
  id: yc,
  name: bc,
  category: vc,
  keywords: _c,
  size: wc,
  parts: xc
}, kc = "bed", Sc = "bed", Ec = "bedroom", Ac = [
  "double",
  "mattress",
  "sleep"
], Tc = {
  w: 150,
  h: 200
}, Cc = [
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
], Ic = {
  id: kc,
  name: Sc,
  category: Ec,
  keywords: Ac,
  size: Tc,
  parts: Cc
}, Mc = "chair", Oc = "chair", Lc = "living", Pc = [
  "seat"
], Fc = {
  w: 44,
  h: 44
}, Nc = [
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
], Rc = {
  id: Mc,
  name: Oc,
  category: Lc,
  keywords: Pc,
  size: Fc,
  parts: Nc
}, zc = "cornerShowerCurved", Dc = "curved corner shower", Hc = "bath", Uc = [
  "shower",
  "corner",
  "cubicle",
  "stall",
  "dusche"
], Bc = {
  w: 100,
  h: 100
}, jc = [
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
], Wc = {
  id: zc,
  name: Dc,
  category: Hc,
  keywords: Uc,
  size: Bc,
  parts: jc
}, qc = "desk", Kc = "desk", Gc = "living", Vc = [
  "office",
  "workstation"
], Yc = {
  w: 120,
  h: 60
}, Zc = [
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
], Xc = {
  id: qc,
  name: Kc,
  category: Gc,
  keywords: Vc,
  size: Yc,
  parts: Zc
}, Qc = "dishwasher", Jc = "dishwasher", ed = "kitchen", td = [
  "dishes"
], id = {
  w: 60,
  h: 60
}, nd = [
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
], rd = {
  id: Qc,
  name: Jc,
  category: ed,
  keywords: td,
  size: id,
  parts: nd
}, od = "dryer", ad = "dryer", sd = "utility", ld = [
  "tumble dryer",
  "laundry"
], cd = {
  w: 60,
  h: 62
}, dd = [
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
], hd = {
  id: od,
  name: ad,
  category: sd,
  keywords: ld,
  size: cd,
  parts: dd
}, pd = "fishTank", ud = "fish tank", fd = "living", md = [
  "aquarium",
  "fish",
  "water"
], gd = {
  w: 100,
  h: 40
}, yd = [
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
], bd = {
  id: pd,
  name: ud,
  category: fd,
  keywords: md,
  size: gd,
  parts: yd
}, vd = "fridge", _d = "fridge", wd = "kitchen", xd = [
  "refrigerator",
  "freezer"
], $d = {
  w: 60,
  h: 64
}, kd = [
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
], Sd = {
  id: vd,
  name: _d,
  category: wd,
  keywords: xd,
  size: $d,
  parts: kd
}, Ed = "hotTub", Ad = "hot tub", Td = "bath", Cd = [
  "jacuzzi",
  "spa",
  "whirlpool"
], Id = {
  w: 120,
  h: 120
}, Md = [
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
], Od = {
  id: Ed,
  name: Ad,
  category: Td,
  keywords: Cd,
  size: Id,
  parts: Md
}, Ld = "piano", Pd = "piano", Fd = "living", Nd = [
  "upright",
  "keyboard",
  "music"
], Rd = {
  w: 140,
  h: 60
}, zd = [
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
], Dd = {
  id: Ld,
  name: Pd,
  category: Fd,
  keywords: Nd,
  size: Rd,
  parts: zd
}, Hd = "plant", Ud = "plant", Bd = "living", jd = [
  "pot",
  "tree",
  "greenery"
], Wd = {
  w: 44,
  h: 44
}, qd = "ellipse", Kd = [
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
], Gd = {
  id: Hd,
  name: Ud,
  category: Bd,
  keywords: jd,
  size: Wd,
  footprint: qd,
  parts: Kd
}, Vd = "quarterTub", Yd = "corner hot tub", Zd = "bath", Xd = [
  "hottub",
  "jacuzzi",
  "corner",
  "quarter",
  "spa",
  "whirlpool"
], Qd = {
  w: 140,
  h: 140
}, Jd = [
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
], eh = {
  id: Vd,
  name: Yd,
  category: Zd,
  keywords: Xd,
  size: Qd,
  parts: Jd
}, th = "roundTable", ih = "round table", nh = "living", rh = [
  "dining",
  "circular"
], oh = {
  w: 100,
  h: 100
}, ah = "ellipse", sh = [
  {
    ellipse: [
      50,
      50,
      50,
      50
    ],
    role: "body"
  }
], lh = {
  id: th,
  name: ih,
  category: nh,
  keywords: rh,
  size: oh,
  footprint: ah,
  parts: sh
}, ch = "rug", dh = "rug", hh = "living", ph = [
  "carpet",
  "mat"
], uh = {
  w: 180,
  h: 120
}, fh = [
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
], mh = {
  id: ch,
  name: dh,
  category: hh,
  keywords: ph,
  size: uh,
  parts: fh
}, gh = "sectional", yh = "sectional (L)", bh = "living", vh = [
  "couch",
  "sofa",
  "corner",
  "chaise"
], _h = {
  w: 230,
  h: 180
}, wh = [
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
], xh = {
  id: gh,
  name: yh,
  category: bh,
  keywords: vh,
  size: _h,
  parts: wh
}, $h = "sink", kh = "sink", Sh = "kitchen", Eh = [
  "basin",
  "tap",
  "faucet"
], Ah = {
  w: 64,
  h: 48
}, Th = [
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
], Ch = {
  id: $h,
  name: kh,
  category: Sh,
  keywords: Eh,
  size: Ah,
  parts: Th
}, Ih = "sofa", Mh = "sofa", Oh = "living", Lh = [
  "couch",
  "settee",
  "seat"
], Ph = {
  w: 170,
  h: 72
}, Fh = [
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
], Nh = {
  id: Ih,
  name: Mh,
  category: Oh,
  keywords: Lh,
  size: Ph,
  parts: Fh
}, Rh = "stairs", zh = "stairs", Dh = "utility", Hh = [
  "steps",
  "staircase"
], Uh = {
  w: 90,
  h: 170
}, Bh = [
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
], jh = {
  id: Rh,
  name: zh,
  category: Dh,
  keywords: Hh,
  size: Uh,
  parts: Bh
}, Wh = "stove", qh = "stove", Kh = "kitchen", Gh = [
  "cooker",
  "hob",
  "oven",
  "range"
], Vh = {
  w: 64,
  h: 64
}, Yh = [
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
], Zh = {
  id: Wh,
  name: qh,
  category: Kh,
  keywords: Gh,
  size: Vh,
  parts: Yh
}, Xh = "table", Qh = "table", Jh = "living", ep = [
  "dining"
], tp = {
  w: 120,
  h: 80
}, ip = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 5
  }
], np = {
  id: Xh,
  name: Qh,
  category: Jh,
  keywords: ep,
  size: tp,
  parts: ip
}, rp = "toilet", op = "toilet", ap = "bath", sp = [
  "wc",
  "loo",
  "lavatory"
], lp = {
  w: 48,
  h: 68
}, cp = [
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
], dp = {
  id: rp,
  name: op,
  category: ap,
  keywords: sp,
  size: lp,
  parts: cp
}, hp = "tv", pp = "tv", up = "living", fp = [
  "television",
  "screen",
  "media"
], mp = {
  w: 110,
  h: 18
}, gp = [
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
], yp = {
  id: hp,
  name: pp,
  category: up,
  keywords: fp,
  size: mp,
  parts: gp
}, bp = "vanity", vp = "vanity", _p = "bath", wp = [
  "washbasin",
  "sink",
  "bathroom"
], xp = {
  w: 110,
  h: 55
}, $p = [
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
], kp = {
  id: bp,
  name: vp,
  category: _p,
  keywords: wp,
  size: xp,
  parts: $p
}, Sp = "wardrobe", Ep = "wardrobe", Ap = "bedroom", Tp = [
  "closet",
  "armoire",
  "cupboard"
], Cp = {
  w: 120,
  h: 55
}, Ip = [
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
], Mp = {
  id: Sp,
  name: Ep,
  category: Ap,
  keywords: Tp,
  size: Cp,
  parts: Ip
}, Op = "washer", Lp = "washer", Pp = "utility", Fp = [
  "washing machine",
  "laundry"
], Np = {
  w: 60,
  h: 62
}, Rp = [
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
], zp = {
  id: Op,
  name: Lp,
  category: Pp,
  keywords: Fp,
  size: Np,
  parts: Rp
}, Dp = "waterHeater", Hp = "water heater", Up = "utility", Bp = [
  "boiler",
  "cylinder",
  "tank"
], jp = {
  w: 52,
  h: 52
}, Wp = "ellipse", qp = [
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
], Kp = {
  id: Dp,
  name: Hp,
  category: Up,
  keywords: Bp,
  size: jp,
  footprint: Wp,
  parts: qp
}, fn = [
  "living",
  "bedroom",
  "kitchen",
  "bath",
  "utility",
  "other"
], Ri = (e) => Object.assign(/* @__PURE__ */ Object.create(null), e), Gn = (e, t) => typeof t == "string" && Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0, Jr = Ri({
  body: { width: 2, opacity: 1, fillOpacity: 0.12 },
  line: { width: 2, opacity: 1, fillOpacity: 0 },
  thin: { width: 1.5, opacity: 1, fillOpacity: 0 },
  detail: { width: 1.5, opacity: 0.7, fillOpacity: 0 },
  hint: { width: 1, opacity: 0.6, fillOpacity: 0 },
  solid: { width: 0, opacity: 0.7, fillOpacity: 1 }
}), Gp = [0, 0, 100, 100], Vp = 64, ba = 256, Yp = 256, Zp = 0.25, eo = 8, Se = (e) => typeof e == "number" && Number.isFinite(e) ? e : null, tt = (e, t, i) => Math.min(i, Math.max(t, e));
function Le(e, t) {
  if (!Array.isArray(e) || e.length !== t) return null;
  const i = [];
  for (const n of e) {
    const r = Se(n);
    if (r === null) return null;
    i.push(r);
  }
  return i;
}
function Xp(e) {
  if (!Array.isArray(e) || e.length < 2 || e.length > ba) return null;
  const t = [];
  for (const i of e) {
    const n = Le(i, 2);
    if (!n) return null;
    t.push([n[0], n[1]]);
  }
  return t;
}
const Qp = Ri({ M: 2, L: 2, Q: 4, C: 6, Z: 0 });
function Jp(e) {
  if (!Array.isArray(e) || !e.length || e.length > Yp) return null;
  const t = [];
  for (const i of e) {
    if (!Array.isArray(i) || typeof i[0] != "string") return null;
    const n = i[0].toUpperCase(), r = Gn(Qp, n);
    if (r === void 0) return null;
    const o = Le(i.slice(1), r);
    if (!o) return null;
    t.push([n, ...o]);
  }
  return t[0]?.[0] !== "M" ? null : t;
}
function Qe(e, t) {
  const i = Gn(Jr, e.role) ? e.role : t, n = Jr[i], r = Se(e.width), o = Se(e.opacity), a = Se(e.fillOpacity), s = Array.isArray(e.dash) ? e.dash.map(Se) : null, l = s && s.length && s.length <= 8 && s.every((c) => c !== null) ? s.map((c) => tt(c, 0, 100)) : void 0;
  return {
    role: i,
    width: r === null ? n.width : i === "solid" ? tt(r, 0, eo) : tt(r, Zp, eo),
    opacity: o === null ? n.opacity : tt(o, 0, 1),
    fillOpacity: a === null ? n.fillOpacity : tt(a, 0, 1),
    dash: l
  };
}
function to(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return null;
  const t = e, i = t.space === "square" ? "square" : "box";
  if ("line" in t) {
    const n = Le(t.line, 4);
    return n ? { kind: "line", a: [n[0], n[1]], b: [n[2], n[3]], space: i, style: Qe(t, "line") } : null;
  }
  if ("rect" in t) {
    const n = Le(t.rect, 4);
    return !n || n[2] < 0 || n[3] < 0 ? null : {
      kind: "rect",
      x: n[0],
      y: n[1],
      w: n[2],
      h: n[3],
      rx: Math.max(0, Se(t.rx) ?? 0),
      space: i,
      style: Qe(t, "body")
    };
  }
  if ("circle" in t) {
    const n = Le(t.circle, 3);
    return !n || n[2] < 0 ? null : { kind: "circle", cx: n[0], cy: n[1], r: n[2], space: i, style: Qe(t, "line") };
  }
  if ("ellipse" in t) {
    const n = Le(t.ellipse, 4);
    return !n || n[2] < 0 || n[3] < 0 ? null : {
      kind: "ellipse",
      cx: n[0],
      cy: n[1],
      rx: n[2],
      ry: n[3],
      space: i,
      style: Qe(t, "line")
    };
  }
  if ("polygon" in t || "polyline" in t) {
    const n = "polygon" in t, r = Xp(n ? t.polygon : t.polyline);
    return r ? { kind: "poly", closed: n, pts: r, space: i, style: Qe(t, n ? "body" : "line") } : null;
  }
  if ("path" in t) {
    const n = Jp(t.path);
    return n ? { kind: "path", cmds: n, space: i, style: Qe(t, "line") } : null;
  }
  return null;
}
function eu(e, t, i) {
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
      return { ...e, pts: e.pts.map(([n, r]) => [n + t, r + i]) };
    case "path":
      return {
        ...e,
        cmds: e.cmds.map((n) => {
          if (n[0] === "Z") return n;
          const r = n.slice(1).map((o, a) => o + (a % 2 === 0 ? t : i));
          return [n[0], ...r];
        })
      };
  }
}
function tu(e) {
  if (e && typeof e == "object" && "repeat" in e) {
    const i = e, n = Se(i.repeat), r = Le(i.step, 2), o = to(i.part);
    if (n === null || !r || !o) return [];
    const a = tt(Math.round(n), 1, Vp);
    return Array.from({ length: a }, (s, l) => eu(o, r[0] * l, r[1] * l));
  }
  const t = to(e);
  return t ? [t] : [];
}
function zi(e, t, i) {
  const n = (p) => (i?.push(p), null);
  if (!e || typeof e != "object" || Array.isArray(e))
    return n("A symbol has to be a JSON object.");
  const r = e, o = typeof r.id == "string" && r.id.trim() ? r.id.trim() : t, a = se(o);
  if (!a || a !== o)
    return n('`id` is missing, or uses characters a CSS class cannot: letters, digits, "-" and "_" only.');
  if (!Array.isArray(r.parts)) return n("`parts` has to be an array of shapes.");
  const s = [];
  for (const p of r.parts)
    for (const g of tu(p)) {
      if (s.length >= ba) break;
      s.push(g);
    }
  if (!s.length)
    return n(
      "No drawable parts. Each one needs a known shape (line, rect, circle, ellipse, polygon, polyline, path) with the right number of finite numbers."
    );
  const l = r.size && typeof r.size == "object" ? r.size : {}, c = Se(l.w), h = Se(l.h), d = Le(r.viewBox, 4);
  return {
    id: a,
    name: typeof r.name == "string" && r.name.trim() ? r.name.trim().slice(0, 60) : a,
    category: typeof r.category == "string" && fn.includes(r.category) ? r.category : "other",
    keywords: Array.isArray(r.keywords) ? r.keywords.filter((p) => typeof p == "string").slice(0, 12) : [],
    size: { w: c && c > 0 ? c : 60, h: h && h > 0 ? h : 60 },
    viewBox: d && d[2] > 0 && d[3] > 0 ? d : Gp,
    footprint: r.footprint === "ellipse" ? "ellipse" : "rect",
    parts: s
  };
}
const iu = zi({
  id: "unknown",
  name: "unknown",
  size: { w: 60, h: 60 },
  parts: [{ rect: [0, 0, 100, 100], rx: 6.666667 }]
}), Te = (() => {
  const e = /* @__PURE__ */ Object.assign({ "../ef-furniture/airHandler.json": gc, "../ef-furniture/bathtub.json": $c, "../ef-furniture/bed.json": Ic, "../ef-furniture/chair.json": Rc, "../ef-furniture/cornerShowerCurved.json": Wc, "../ef-furniture/desk.json": Xc, "../ef-furniture/dishwasher.json": rd, "../ef-furniture/dryer.json": hd, "../ef-furniture/fishTank.json": bd, "../ef-furniture/fridge.json": Sd, "../ef-furniture/hotTub.json": Od, "../ef-furniture/piano.json": Dd, "../ef-furniture/plant.json": Gd, "../ef-furniture/quarterTub.json": eh, "../ef-furniture/roundTable.json": lh, "../ef-furniture/rug.json": mh, "../ef-furniture/sectional.json": xh, "../ef-furniture/sink.json": Ch, "../ef-furniture/sofa.json": Nh, "../ef-furniture/stairs.json": jh, "../ef-furniture/stove.json": Zh, "../ef-furniture/table.json": np, "../ef-furniture/toilet.json": dp, "../ef-furniture/tv.json": yp, "../ef-furniture/vanity.json": kp, "../ef-furniture/wardrobe.json": Mp, "../ef-furniture/washer.json": zp, "../ef-furniture/waterHeater.json": Kp }), t = Ri({});
  for (const [i, n] of Object.entries(e)) {
    const r = zi(n, i.split("/").pop()?.replace(/\.json$/, ""));
    r && (t[r.id] = r);
  }
  return t;
})();
function Di(e, t) {
  return Gn(e, t);
}
let io, no = Te;
function mn(e) {
  if (!e || typeof e != "object") return Te;
  if (e === io) return no;
  const t = Ri({});
  Object.assign(t, Te);
  for (const [i, n] of Object.entries(e)) {
    const r = zi(n, i);
    r && (t[r.id] = r);
  }
  return io = e, no = t, t;
}
function nu(e) {
  const t = (i) => {
    const n = fn.indexOf(i);
    return n < 0 ? fn.length : n;
  };
  return Object.values(e).sort(
    (i, n) => t(i.category) - t(n.category) || i.name.localeCompare(n.name)
  );
}
function ru(e, t) {
  const i = t.trim().toLowerCase();
  return i ? e.id.toLowerCase().includes(i) || e.name.toLowerCase().includes(i) || e.category.includes(i) || e.keywords.some((n) => n.toLowerCase().includes(i)) : !0;
}
function ou(e, t = Te) {
  return Di(t, e)?.size ?? { w: 60, h: 60 };
}
function ro(e, t, i, n) {
  const [r, o, a, s] = e.viewBox, l = n === "square" ? Math.min(t, i) : t, c = n === "square" ? Math.min(t, i) : i, h = l / a, d = c / s;
  return {
    x: (p) => (p - r) * h - l / 2,
    y: (p) => (p - o) * d - c / 2,
    len: (p) => p * Math.min(h, d),
    sx: (p) => p * h,
    sy: (p) => p * d
  };
}
const K = (e) => Number.isFinite(e) ? e : 0;
function au(e, t) {
  const i = e.fillOpacity > 0 ? t : "none", n = e.role === "solid" ? "none" : t;
  return { fill: i, stroke: n, style: e };
}
function su(e, t, i) {
  const { fill: n, stroke: r, style: o } = au(e.style, i), a = o.opacity < 1 ? o.opacity : m, s = o.dash?.length ? o.dash.join(" ") : m, l = o.fillOpacity > 0 && o.fillOpacity < 1 ? o.fillOpacity : m, c = o.role === "solid" ? m : o.width;
  switch (e.kind) {
    case "line":
      return _`<line x1=${K(t.x(e.a[0]))} y1=${K(t.y(e.a[1]))}
                       x2=${K(t.x(e.b[0]))} y2=${K(t.y(e.b[1]))}
                       fill="none" stroke=${r} stroke-width=${c}
                       stroke-dasharray=${s} opacity=${a} />`;
    case "rect":
      return _`<rect x=${K(t.x(e.x))} y=${K(t.y(e.y))}
                       width=${K(t.sx(e.w))} height=${K(t.sy(e.h))}
                       rx=${e.rx > 0 ? K(t.len(e.rx)) : m}
                       fill=${n} fill-opacity=${l}
                       stroke=${r} stroke-width=${c}
                       stroke-dasharray=${s} opacity=${a} />`;
    case "circle":
      return _`<circle cx=${K(t.x(e.cx))} cy=${K(t.y(e.cy))} r=${K(t.len(e.r))}
                         fill=${n} fill-opacity=${l}
                         stroke=${r} stroke-width=${c} opacity=${a} />`;
    case "ellipse":
      return _`<ellipse cx=${K(t.x(e.cx))} cy=${K(t.y(e.cy))}
                          rx=${K(t.sx(e.rx))} ry=${K(t.sy(e.ry))}
                          fill=${n} fill-opacity=${l}
                          stroke=${r} stroke-width=${c} opacity=${a} />`;
    case "poly": {
      const h = e.pts.map(([d, p]) => `${K(t.x(d))},${K(t.y(p))}`).join(" ");
      return e.closed ? _`<polygon points=${h}
                       fill=${n} fill-opacity=${l}
                       stroke=${r} stroke-width=${c}
                       stroke-linejoin="round" opacity=${a} />` : _`<polyline points=${h} fill="none"
                        stroke=${r} stroke-width=${c}
                        stroke-linejoin="round" opacity=${a} />`;
    }
    case "path": {
      const h = e.cmds.map(
        (d) => d[0] === "Z" ? "Z" : `${d[0]} ${d.slice(1).map((p, g) => g % 2 === 0 ? K(t.x(p)) : K(t.y(p))).join(" ")}`
      ).join(" ");
      return _`<path d=${h}
                       fill=${n} fill-opacity=${l}
                       stroke=${r} stroke-width=${c}
                       stroke-linejoin="round" opacity=${a} />`;
    }
  }
}
function lu(e, t, i, n) {
  const r = ro(e, t, i, "box"), o = ro(e, t, i, "square");
  return e.parts.map((a) => su(a, a.space === "square" ? o : r, n));
}
const cu = /* @__PURE__ */ new Set(["light", "switch", "fan", "input_boolean"]);
function va(e) {
  const t = e?.split(".")[0] ?? "";
  return cu.has(t) ? { action: "toggle" } : { action: "more-info" };
}
function Ie(e) {
  return e !== void 0 && e.action !== "none";
}
function _a(e, t) {
  return t === "tap" ? e.tap_action ?? va(e.entity) : t === "hold" ? e.hold_action : e.double_tap_action;
}
function du(e, t) {
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
      return wa(t) !== null;
    case "fire-dom-event":
      return !0;
    default:
      return !1;
  }
}
function hu(e) {
  return ["tap", "hold", "double_tap"].some(
    (t) => du(e, _a(e, t))
  );
}
function wa(e) {
  const t = e.perform_action ?? e.service;
  if (!t || !t.includes(".")) return null;
  const [i, n] = t.split(".", 2);
  return { domain: i, service: n, data: e.data ?? e.service_data, target: e.target };
}
function kt(e, t, i, n) {
  if (!(!n || n.action === "none")) {
    if (n.confirmation) {
      const r = typeof n.confirmation == "object" && n.confirmation.text || `Are you sure you want to ${n.action}?`;
      if (!globalThis.confirm?.(r)) return;
    }
    switch (n.action) {
      case "toggle":
        i.entity && t.callService("homeassistant", "toggle", { entity_id: i.entity });
        break;
      case "more-info": {
        const r = n.entity ?? i.entity;
        r && e.dispatchEvent(
          new CustomEvent("hass-more-info", { detail: { entityId: r }, bubbles: !0, composed: !0 })
        );
        break;
      }
      case "navigate":
        if (n.navigation_path) {
          history.pushState(null, "", n.navigation_path);
          const r = new Event("location-changed");
          r.detail = { replace: !1 }, window.dispatchEvent(r);
        }
        break;
      case "url":
        n.url_path && window.open(n.url_path);
        break;
      case "perform-action":
      case "call-service": {
        const r = wa(n);
        r && t.callService(r.domain, r.service, r.data, r.target);
        break;
      }
      case "fire-dom-event":
        e.dispatchEvent(new CustomEvent("ll-custom", { detail: n, bubbles: !0, composed: !0 }));
        break;
    }
  }
}
const pu = 0.75, ui = 8, uu = 400;
function tn(e, t) {
  return typeof e == "number" && Number.isFinite(e) && e > 0 ? e : t;
}
function fu(e) {
  let t = 0;
  for (let i = 0, n = e.length - 1; i < e.length; n = i++)
    t += e[n].x * e[i].y - e[i].x * e[n].y;
  return t / 2;
}
function mu(e, t, i, n) {
  const r = n.x - i.x, o = n.y - i.y, a = r * r + o * o;
  if (a === 0) return Math.hypot(e - i.x, t - i.y);
  let s = ((e - i.x) * r + (t - i.y) * o) / a;
  return s = Math.max(0, Math.min(1, s)), Math.hypot(e - (i.x + s * r), t - (i.y + s * o));
}
function gu(e, t) {
  const i = [];
  for (let n = 0; n < e.length; n++) {
    const r = e[n], o = r.b.x - r.a.x, a = r.b.y - r.a.y, s = Math.hypot(o, a);
    if (s <= t) continue;
    const l = [0, 1], c = t / s;
    for (let h = 0; h < e.length; h++) {
      if (h === n) continue;
      const d = e[h], p = d.b.x - d.a.x, g = d.b.y - d.a.y, y = o * g - a * p;
      if (Math.abs(y) > 1e-9) {
        const b = ((d.a.x - r.a.x) * g - (d.a.y - r.a.y) * p) / y, v = ((d.a.x - r.a.x) * a - (d.a.y - r.a.y) * o) / y, x = t / Math.max(Math.hypot(p, g), 1e-9);
        b > c && b < 1 - c && v >= -x && v <= 1 + x && l.push(b);
        continue;
      }
      for (const b of [d.a, d.b]) {
        const v = ((b.x - r.a.x) * o + (b.y - r.a.y) * a) / (s * s);
        if (v <= c || v >= 1 - c) continue;
        const x = r.a.x + v * o, A = r.a.y + v * a;
        Math.hypot(b.x - x, b.y - A) <= t && l.push(v);
      }
    }
    l.sort((h, d) => h - d);
    for (let h = 1; h < l.length; h++) {
      const d = l[h - 1], p = l[h];
      p - d <= c || i.push({
        a: { x: r.a.x + d * o, y: r.a.y + d * a },
        b: { x: r.a.x + p * o, y: r.a.y + p * a }
      });
    }
  }
  return i;
}
function yu(e, t) {
  const i = [], n = /* @__PURE__ */ new Map(), r = (c) => Math.floor(c / t), o = (c) => {
    const h = r(c.x), d = r(c.y);
    for (let b = -1; b <= 1; b++)
      for (let v = -1; v <= 1; v++)
        for (const x of n.get(`${h + b}:${d + v}`) ?? [])
          if (Math.hypot(i[x].x - c.x, i[x].y - c.y) <= t) return x;
    const p = i.push({ x: c.x, y: c.y }) - 1, g = `${h}:${d}`, y = n.get(g);
    return y ? y.push(p) : n.set(g, [p]), p;
  }, a = /* @__PURE__ */ new Map(), s = (c) => {
    let h = a.get(c);
    return h || a.set(c, h = /* @__PURE__ */ new Set()), h;
  };
  for (const c of e) {
    const h = o(c.a), d = o(c.b);
    h !== d && (s(h).add(d), s(d).add(h));
  }
  const l = i.map(
    (c, h) => [...a.get(h) ?? []].sort(
      (d, p) => Math.atan2(i[d].y - c.y, i[d].x - c.x) - Math.atan2(i[p].y - c.y, i[p].x - c.x)
    )
  );
  return { points: i, neighbors: l };
}
function bu(e, t) {
  const { points: i, neighbors: n } = yu(e, t), r = /* @__PURE__ */ new Set(), o = [];
  for (let a = 0; a < i.length; a++)
    for (const s of n[a]) {
      if (r.has(`${a}>${s}`)) continue;
      const l = [];
      let c = a, h = s, d = !1;
      for (let p = 0; p <= i.length * i.length + 4; p++) {
        r.add(`${c}>${h}`), l.push(c);
        const g = n[h], y = g.indexOf(c), b = g[(y - 1 + g.length) % g.length];
        if (c = h, h = b, c === a && h === s) {
          d = !0;
          break;
        }
      }
      d && l.length >= 3 && o.push(l.map((p) => ({ x: i[p].x, y: i[p].y })));
    }
  return o;
}
function vu(e, t, i) {
  for (let n = 0, r = e.length - 1; n < e.length; r = n++)
    for (const o of t)
      if (mu(o.x, o.y, e[r], e[n]) <= i) return !0;
  return !1;
}
function _u(e, t, i = {}) {
  const n = tn(i.weldEps, pu), r = tn(i.openingEps, ui), o = tn(i.minArea, uu);
  if (e.length < 3) return [];
  const a = gu(
    e.map((l) => ({ a: { x: l.x1, y: l.y1 }, b: { x: l.x2, y: l.y2 } })),
    n
  );
  return bu(a, n).map((l) => ({ ring: l, area: fu(l) })).filter((l) => l.area >= o && !vu(l.ring, t, r)).sort((l, c) => c.area - l.area).map((l) => l.ring);
}
const oo = /* @__PURE__ */ new WeakMap();
function xa(e, t) {
  const i = oo.get(e);
  if (i && i.openings === t) return i.out;
  const n = _u(e, t);
  return oo.set(e, { openings: t, out: n }), n;
}
const G = 8, $a = 0.05, Lt = "—";
function Ut(e, t) {
  if (!t || !e) return Lt;
  const i = e.states[t];
  return i ? e.formatEntityState(i) : Lt;
}
function ka(e, t, i) {
  if (e.formatEntityState !== t.formatEntityState || e.formatEntityAttributeValue !== t.formatEntityAttributeValue) return !0;
  for (const n of i)
    if (e.states[n] !== t.states[n]) return !0;
  return !1;
}
function Ct(e) {
  const t = /* @__PURE__ */ new Set();
  (e.sunDimming || e.sunlight && !Bi(e)) && t.add("sun.sun");
  for (const i of je(e)) {
    for (const n of i.openings) {
      n.entity && t.add(n.entity), n.shutterEntity && t.add(n.shutterEntity), n.secondaryEntity && t.add(n.secondaryEntity);
      for (const r of n.extraEntities ?? []) r && t.add(r);
      n.shutterSecondaryEntity && t.add(n.shutterSecondaryEntity);
    }
    for (const n of i.items) {
      n.entity && t.add(n.entity), n.hideEntity && t.add(n.hideEntity), n.hideStateEntity && t.add(n.hideStateEntity), n.hideBadgeEntity && t.add(n.hideBadgeEntity);
      for (const r of Fe(n)) r.entity && t.add(r.entity);
    }
    for (const n of i.texts)
      n.entity && t.add(n.entity);
    for (const n of i.furniture)
      n.entity && t.add(n.entity);
    for (const n of i.areas)
      n.entity && t.add(n.entity);
    for (const n of i.trackers)
      for (const r of [n.xSensor, n.ySensor])
        r?.entity && t.add(r.entity), r?.presence?.entity && t.add(r.presence.entity);
  }
  return t;
}
function Vn(e, t, i) {
  if (!t || !e) return Lt;
  const n = e.states[t];
  if (!n) return Lt;
  const r = e.formatEntityAttributeValue;
  if (typeof r == "function") return r(n, i);
  const o = n.attributes?.[i];
  return o == null || o === "" ? Lt : String(o);
}
function wu(e, t, i) {
  const n = i.entity || (i.attribute ? t.entity : void 0);
  return n ? i.attribute ? Vn(e, n, i.attribute) : Ut(e, n) : "";
}
function Fe(e) {
  return [...e.secondaryEntity || e.secondaryAttribute ? [{ entity: e.secondaryEntity, attribute: e.secondaryAttribute }] : [], ...e.readings ?? []];
}
function xu(e, t) {
  return t.attribute ? Vn(e, t.entity, t.attribute) : Ut(e, t.entity);
}
function Yn(e, t) {
  if (!t.entity) return t.text ?? "";
  const i = t.attribute ? Vn(e, t.entity, t.attribute) : Ut(e, t.entity);
  return t.text ? `${t.text} ${i}` : i;
}
function Hi(e, t) {
  return Sa(e, t)?.color;
}
function Sa(e, t) {
  if (!e?.length) return;
  const i = typeof t == "number" ? t : Number(t), n = typeof t != "boolean" && t !== "" && t != null && Number.isFinite(i), r = t == null ? "" : String(t).trim().toLowerCase();
  let o, a, s;
  for (const l of e)
    !l || typeof l != "object" || typeof l.color != "string" || (typeof l.state == "string" && l.state !== "" ? o === void 0 && r !== "" && l.state.trim().toLowerCase() === r && (o = l) : typeof l.above == "number" ? n && i > l.above && (!a || l.above > (a.above ?? -1 / 0)) && (a = l) : s === void 0 && (s = l));
  return o ?? a ?? s;
}
function $u(e, t) {
  if (!e.entity) return;
  const i = Hi(e.stateColor, t);
  if (i) return B(i);
  if (e.activeColor && Ce(e.entity, t)) return B(e.activeColor);
}
function ao(e, t) {
  if (!e.entity) return;
  const i = Hi(e.stateColor, t);
  if (i) return B(i);
  if (e.activeColor && Ce(e.entity, t)) return B(e.activeColor);
}
function Zn(e, t) {
  if (!t || t.state !== "on") return;
  const i = t.attributes ?? {}, n = i.brightness, r = typeof n == "number" && Number.isFinite(n) ? Math.max(0, Math.min(255, n)) : void 0, o = r === void 0 ? di : Kr + (di - Kr) * (r / 255), a = D(e.glowRadius, Li) * (r === void 0 ? 1 : Gr + (1 - Gr) * (r / 255)), s = i.rgb_color;
  if (Array.isArray(s) && s.length >= 3) {
    const [l, c, h] = s;
    if ([l, c, h].every((d) => typeof d == "number" && Number.isFinite(d))) {
      const d = (g) => Math.max(0, Math.min(255, Math.round(g))), p = B(`rgb(${d(l)}, ${d(c)}, ${d(h)})`);
      if (p) return { color: p, opacity: o, radius: a };
    }
  }
  return { color: le(e.glowColor, ya), opacity: o, radius: a };
}
function Ea(e) {
  if (!e || e.state !== "on") return;
  const t = e.attributes ?? {}, i = t.rgb_color;
  if (!Array.isArray(i) || i.length < 3) return;
  const [n, r, o] = i;
  if (![n, r, o].every((h) => typeof h == "number" && Number.isFinite(h))) return;
  const a = t.brightness, s = typeof a == "number" && Number.isFinite(a) ? Math.max(0, Math.min(255, a)) : void 0, l = s === void 0 ? 1 : Vr + (1 - Vr) * (s / 255), c = (h) => Math.max(0, Math.min(255, Math.round(h * l)));
  return B(`rgb(${c(n)}, ${c(r)}, ${c(o)})`);
}
function ku(e, t) {
  return t ? Zn(e, t) : {
    color: le(e.glowColor, ya),
    opacity: di,
    radius: D(e.glowRadius, Li)
  };
}
function Xn(e, t, i) {
  const n = i.x2 - i.x1, r = i.y2 - i.y1, o = n * n + r * r, a = o === 0 ? 0 : Math.max(0, Math.min(1, ((e - i.x1) * n + (t - i.y1) * r) / o)), s = i.x1 + a * n, l = i.y1 + a * r;
  return Math.hypot(e - s, t - l);
}
function Qn(e, t, i, n, r) {
  const o = r.x2 - r.x1, a = r.y2 - r.y1, s = i * a - n * o;
  if (Math.abs(s) < 1e-12) return;
  const l = r.x1 - e, c = r.y1 - t, h = (l * a - c * o) / s, d = (l * n - c * i) / s;
  if (!(h <= 1e-9 || d < 0 || d > 1))
    return h;
}
function Su(e, t, i, n, r) {
  const o = e.x2 - e.x1, a = e.y2 - e.y1, s = [-o, o, -a, a], l = [e.x1 - t, n - e.x1, e.y1 - i, r - e.y1];
  let c = 0, h = 1;
  for (let d = 0; d < 4; d++) {
    if (s[d] === 0) {
      if (l[d] < 0) return;
      continue;
    }
    const p = l[d] / s[d];
    if (s[d] < 0) {
      if (p > h) return;
      p > c && (c = p);
    } else {
      if (p < c) return;
      p < h && (h = p);
    }
  }
  return {
    ...e,
    x1: e.x1 + c * o,
    y1: e.y1 + c * a,
    x2: e.x1 + h * o,
    y2: e.y1 + h * a
  };
}
function Aa(e, t, i, n) {
  if (Z(e) === "fixed") return 0;
  const r = Math.max(0, Math.min(1, t)), o = Math.max(0, Math.min(1, i ?? t));
  if (Z(e) === "swing") {
    const a = Ae(e);
    if (a > 2) {
      let s = r + o;
      for (let l = 2; l < a; l++) s += Math.max(0, Math.min(1, n?.[l - 2] ?? t));
      return s / a;
    }
    return a === 2 ? (r + o) / 2 : r * rr(e);
  }
  if (Z(e) === "awning") return r;
  switch (Ui(e)) {
    case "biparting":
      return (r + o) / 2;
    case "biparting-bypass":
    case "converging":
      return (r + o) / 4;
    default:
      return r;
  }
}
function Ta(e, t, i, n, r) {
  return n !== void 0 && n <= 0 ? [0, 0] : hr(e) && Z(e) !== "roll" ? [0, 1] : Eu(e, t, i, r);
}
function Eu(e, t, i, n) {
  const r = Aa(e, t, i, n), o = [(1 - r) / 2, (1 + r) / 2];
  if (rr(e) < 1) {
    const c = [0, r];
    return e.flipH ? [1 - c[1], 1 - c[0]] : c;
  }
  if (Z(e) !== "swing" || Ae(e) !== 2) return o;
  const a = Math.max(0, Math.min(1, t)), s = Math.max(0, Math.min(1, i ?? t)), l = [0.5 - a / 2, 0.5 + s / 2];
  return e.flipH ? [1 - l[1], 1 - l[0]] : l;
}
function Jn(e, t, i) {
  const n = [];
  for (const o of t) {
    const a = i(o), s = (c) => Math.max(0, Math.min(1, c)), l = typeof a == "number" ? [(1 - s(a)) / 2, (1 + s(a)) / 2] : [s(Math.min(a[0], a[1])), s(Math.max(a[0], a[1]))];
    l[1] > l[0] && n.push({ o, span: l });
  }
  if (!n.length) return e;
  const r = [];
  for (const o of e) {
    const a = o.x2 - o.x1, s = o.y2 - o.y1, l = a * a + s * s;
    if (l === 0) {
      r.push(o);
      continue;
    }
    const c = Math.sqrt(l), h = [];
    for (const { o: v, span: x } of n) {
      if (Xn(v.x, v.y, o) > ui) continue;
      const A = ((v.x - o.x1) * a + (v.y - o.y1) * s) / l, u = Math.cos(v.angle * Math.PI / 180) * a + Math.sin(v.angle * Math.PI / 180) * s >= 0 ? 1 : -1, $ = (V) => u * (V - 0.5) * v.length / c, k = A + $(x[0]), O = A + $(x[1]), T = Math.max(0, Math.min(k, O)), H = Math.min(1, Math.max(k, O));
      H > T && h.push([T, H]);
    }
    if (!h.length) {
      r.push(o);
      continue;
    }
    h.sort((v, x) => v[0] - x[0]);
    const d = [h[0]];
    for (const v of h.slice(1)) {
      const x = d[d.length - 1];
      v[0] <= x[1] ? x[1] = Math.max(x[1], v[1]) : d.push(v);
    }
    const p = (v) => ({ x: o.x1 + a * v, y: o.y1 + s * v });
    let g = 0, y = 0;
    const b = (v, x) => {
      if ((x - v) * c < G / 2) return;
      const A = p(v), u = p(x);
      r.push({ id: `${o.id}#${y++}`, x1: A.x, y1: A.y, x2: u.x, y2: u.y });
    };
    for (const [v, x] of d)
      b(g, v), g = x;
    b(g, 1);
  }
  return r;
}
function Ca(e, t, i, n) {
  const r = n.filter((d) => {
    const p = Xn(e, t, d);
    return p < i && p > G;
  });
  if (!r.length) return;
  const o = i * 1.01, a = [
    { id: "b1", x1: e - o, y1: t - o, x2: e + o, y2: t - o },
    { id: "b2", x1: e + o, y1: t - o, x2: e + o, y2: t + o },
    { id: "b3", x1: e + o, y1: t + o, x2: e - o, y2: t + o },
    { id: "b4", x1: e - o, y1: t + o, x2: e - o, y2: t - o }
  ], s = r.map((d) => Su(d, e - o, t - o, e + o, t + o)).filter((d) => d !== void 0);
  if (!s.length) return;
  const l = [...s, ...a], c = [];
  for (const d of l)
    for (const [p, g] of [
      [d.x1, d.y1],
      [d.x2, d.y2]
    ]) {
      const y = Math.atan2(g - t, p - e);
      for (const b of [y - 1e-4, y, y + 1e-4]) {
        const v = Math.cos(b), x = Math.sin(b);
        let A = 1 / 0;
        for (const u of l) {
          const $ = Qn(e, t, v, x, u);
          $ !== void 0 && $ < A && (A = $);
        }
        A < 1 / 0 && c.push({ x: e + v * A, y: t + x * A, a: b });
      }
    }
  c.sort((d, p) => d.a - p.a);
  const h = (d) => Math.round(d * 100) / 100;
  return c.map(({ x: d, y: p }) => ({ x: h(d), y: h(p) }));
}
function Ia(e, t, i, n) {
  const r = t.radius, o = n?.length ? Ca(e.x, e.y, r, n) : void 0, a = `${i}-clip`;
  return _`
    ${o ? _`<clipPath id=${a}>
                <polygon points=${o.map((s) => `${s.x},${s.y}`).join(" ")} />
              </clipPath>` : m}
    <radialGradient id=${i} gradientUnits="userSpaceOnUse"
                    cx=${e.x} cy=${e.y} r=${r}>
      <stop offset="0" stop-color=${t.color} stop-opacity=${t.opacity} />
      <stop offset="1" stop-color=${t.color} stop-opacity="0" />
    </radialGradient>
    <circle class="fp-glow" cx=${e.x} cy=${e.y} r=${r}
            fill=${`url(#${i})`}
            clip-path=${o ? `url(#${a})` : m} />`;
}
function Au(e, t, i, n, r, o) {
  const a = e.map((l) => {
    if (!l.glow) return;
    const c = Zn(l, t?.[l.entity]);
    if (c)
      return {
        // Normalized against the glow's own ceiling, so a full-brightness lamp
        // clears the dim entirely and a dim one clears proportionally.
        strength: Math.max(0, Math.min(1, c.opacity / di)),
        // Straight off the paint, so the clearing tracks the pool as it shrinks
        // with brightness (issue #123) instead of staying at the configured size.
        radius: c.radius
      };
  });
  if (!a.some((l) => l !== void 0)) return m;
  const s = G;
  return _`
    <defs>
      <mask id=${r} maskUnits="userSpaceOnUse"
            x=${-s} y=${-s} width=${i + s * 2} height=${n + s * 2}>
        <rect x=${-s} y=${-s} width=${i + s * 2} height=${n + s * 2}
              fill="white" />
        ${e.map((l, c) => {
    const h = a[c];
    if (h === void 0) return m;
    const { strength: d, radius: p } = h, g = `${r}-${c}`, y = o?.length ? Ca(l.x, l.y, p, o) : void 0, b = `${g}-clip`;
    return _`
            ${y ? _`<clipPath id=${b}>
                        <polygon points=${y.map((v) => `${v.x},${v.y}`).join(" ")} />
                      </clipPath>` : m}
            <radialGradient id=${g} gradientUnits="userSpaceOnUse"
                            cx=${l.x} cy=${l.y} r=${p}>
              <stop offset="0" stop-color="#000" stop-opacity=${d} />
              <stop offset="1" stop-color="#000" stop-opacity="0" />
            </radialGradient>
            <circle cx=${l.x} cy=${l.y} r=${p} fill=${`url(#${g})`}
                    clip-path=${y ? `url(#${b})` : m} />`;
  })}
      </mask>
    </defs>`;
}
function Ma(e, t, i, n, r = Te) {
  const o = G;
  return _`
    <defs>
      <mask id=${n} maskUnits="userSpaceOnUse"
            x=${-o} y=${-o} width=${t + o * 2} height=${i + o * 2}>
        <rect x=${-o} y=${-o} width=${t + o * 2} height=${i + o * 2}
              fill="white" />
        ${e.map((a) => {
    const s = a.angle ? `rotate(${a.angle} ${a.x} ${a.y})` : void 0, l = Di(r, a.type)?.footprint === "ellipse", c = 1 - Xl;
    return l ? _`<ellipse cx=${a.x} cy=${a.y} rx=${a.w / 2} ry=${a.h / 2}
                           fill="#000" fill-opacity=${c} transform=${s ?? m} />` : _`<rect x=${a.x - a.w / 2} y=${a.y - a.h / 2} width=${a.w} height=${a.h}
                        fill="#000" fill-opacity=${c} transform=${s ?? m} />`;
  })}
      </mask>
    </defs>`;
}
function Oa(e, t, i) {
  if (e.enableHideByEntity) {
    const n = e.hideEntity || e.entity;
    let r = t;
    return n && i && i.states[n] && (r = e.hideAttribute ? i.states[n].attributes[e.hideAttribute] : i.states[n].state), er(
      r,
      e.hideMode,
      e.hideState,
      e.hideOperator,
      e.hideThreshold,
      e.hideInvert
    );
  }
  return e.hideWhenInactive ? e.entity ? !Ce(e.entity, t) : !0 : !1;
}
function Tu(e, t) {
  return e.showOnlyWhenZoomed ? t ? e.area ? e.area !== t.id && e.area !== t.name : !ji(t.points ?? [], e.x, e.y) : !0 : !1;
}
function Cu(e, t, i) {
  if (!e.enableHideBadgeByEntity) return !1;
  let n = t;
  if (i) {
    const r = e.hideBadgeEntity || e.entity;
    r && i.states[r] && (n = e.hideBadgeAttribute && i.states[r].attributes ? String(i.states[r].attributes[e.hideBadgeAttribute]) : i.states[r].state);
  }
  return er(
    n,
    e.hideBadgeMode,
    e.hideBadgeMatch,
    // Ensure this property is correctly mapped in your types, or use hideBadgeState
    e.hideBadgeOperator,
    e.hideBadgeThreshold,
    e.hideBadgeInvert
  );
}
const La = 12;
function Pa(e, t) {
  const i = [];
  if (t.showName) {
    const r = t.entity ? e?.states[t.entity]?.attributes?.friendly_name : void 0, o = t.name || r || t.entity;
    o && i.push(o);
  }
  let n = !1;
  if (t.enableHideStateByEntity && e) {
    const r = t.hideStateEntity || t.entity;
    let o;
    r && e.states[r] && (o = t.hideStateAttribute && e.states[r].attributes ? e.states[r].attributes[t.hideStateAttribute] : e.states[r].state), n = er(
      o,
      t.hideStateMode,
      t.hideStateMatch,
      t.hideStateOperator,
      t.hideStateThreshold,
      t.hideStateInvert
    );
  }
  if (t.entity && (t.showState ?? t.kind === "sensor") && !n && i.push(xu(e, t)), !n)
    for (const r of Fe(t)) {
      if (r.showState === !1) continue;
      const o = wu(e, t, r);
      o && i.push(o);
    }
  return i.join(" · ");
}
const so = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
function er(e, t = "state", i, n = "==", r, o = !1) {
  if (e == null || e === "") return !1;
  let a = !1;
  if (t === "threshold") {
    if (r == null) return !1;
    const s = Number(e);
    if (!Number.isFinite(s)) return !1;
    switch (n) {
      case "<":
        a = s < r;
        break;
      case "<=":
        a = s <= r;
        break;
      case "==":
        a = s === r;
        break;
      case "!=":
        a = s !== r;
        break;
      case ">=":
        a = s >= r;
        break;
      case ">":
        a = s > r;
        break;
      default:
        return !1;
    }
  } else {
    if (i == null || String(i).trim() === "") return !1;
    const s = String(e).trim().toLowerCase(), l = String(i).trim().toLowerCase();
    if (so.has(s) && !so.has(l))
      return !1;
    a = n === "!=" ? s !== l : s === l;
  }
  return o ? !a : a;
}
function Iu(e) {
  return e.showName || (e.showState ?? e.kind === "sensor") ? !0 : Fe(e).some((t) => t.showState !== !1 && (t.entity || t.attribute));
}
function tr(e) {
  const t = e.labelPosition;
  return t === "left" || t === "right" ? t : "below";
}
function Mu(e, t) {
  const i = Pa(e, t);
  return i ? { text: i, live: !0 } : { text: t.name || t.entity || t.kind, live: !1 };
}
function Fa(e) {
  return Math.min(40, Math.max(8, D(e, La)));
}
function Na(e, t) {
  if (!e.disableLabelColor) return t;
  if (e.useCustomLabelColor)
    return B(e.labelCustomColor) ?? void 0;
}
function Ou(e) {
  return Math.min(40, Math.max(8, D(e, Wn)));
}
function Lu(e) {
  return Math.min(ca, Math.max(2, D(e, G)));
}
function Ra(e) {
  return e === void 0 ? "" : `stroke-width:${Lu(e)};`;
}
function ir(e) {
  return e === "plan" ? "plan" : "fixed";
}
function j(e, t) {
  return t === "plan" ? `calc(${e} * var(--fp-u, 1px))` : `${e}px`;
}
function Pu(e, t) {
  return t !== "plan" && e === void 0 ? "" : `font-size:${j(Ou(e), t)};`;
}
function lo(e) {
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
const Fu = {
  media_player: { on: "mdi:television-play", off: "mdi:television-off" },
  fan: { on: "mdi:fan", off: "mdi:fan-off" },
  lock: { on: "mdi:lock-open-variant", off: "mdi:lock" },
  camera: { on: "mdi:cctv", off: "mdi:cctv-off" },
  humidifier: { on: "mdi:air-humidifier", off: "mdi:air-humidifier-off" },
  vacuum: { on: "mdi:robot-vacuum", off: "mdi:robot-vacuum-variant" }
}, Nu = {
  paused: "mdi:television-pause",
  idle: "mdi:television"
}, Ru = {
  off: "mdi:power",
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan"
}, zu = {
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
}, Du = {
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
}, Hu = {
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
}, Uu = {
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
function Bu(e) {
  return e === "on" || e === "open" || e === "home" || e === "playing";
}
const ju = {
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
function Ce(e, t) {
  if (!t || t === "unavailable" || t === "unknown") return !1;
  const i = e?.split(".")[0] ?? "", n = ju[i];
  return n ? n.has(t) : Bu(t);
}
const Wu = {
  fan: "spin",
  media_player: "pulse",
  vacuum: "pulse"
};
function za(e) {
  return Wu[e?.split(".")[0] ?? ""];
}
const qu = /* @__PURE__ */ new Set(["idle", "off"]);
function Ku(e) {
  const t = e?.hvac_action;
  return typeof t != "string" ? !0 : !qu.has(t);
}
function Da(e, t, i) {
  const n = e.iconAnimation ?? "auto";
  if (n !== "none" && Ce(e.entity, t)) {
    if (e.entity?.split(".")[0] === "climate") {
      if (!Ku(i)) return;
      if (t === "fan_only") return "spin";
    }
    return n === "spin" || n === "pulse" ? n : za(e.entity);
  }
}
const Gu = /* @__PURE__ */ new Set(["motion", "occupancy", "presence", "vibration"]);
function Ha(e, t) {
  const i = e?.split(".")[0];
  return i === "device_tracker" || i === "person" ? !0 : i === "binary_sensor" && !!t && Gu.has(t);
}
function Ua(e, t, i, n) {
  const r = e.split(".")[0];
  if (r === "climate")
    return Ru[n ?? ""] ?? (i ? "mdi:thermostat" : "mdi:power");
  if (r === "weather") return zu[n ?? ""] ?? "mdi:weather-cloudy";
  if (r === "media_player" && n) {
    const a = Nu[n];
    if (a) return a;
  }
  const o = Fu[r];
  if (o) return i ? o.on : o.off;
  if (t) {
    if (r === "binary_sensor") {
      const a = Du[t];
      return a ? i ? a.on : a.off : void 0;
    }
    if (r === "sensor") return Hu[t];
    if (r === "cover") {
      const a = Uu[t];
      return a ? i ? a.on : a.off : void 0;
    }
  }
}
function nr(e, t) {
  if (t)
    return e.attribute ? t.attributes?.[e.attribute] : t.state;
}
function gn(e, t, i) {
  const n = Mt(Sa(e.stateColor, nr(e, t))?.icon);
  if (n) return n;
  const r = Mt(e.icon);
  if (r) return r;
  if (!e.entity) return lo(e.kind);
  if (i) return i;
  const o = t?.attributes?.icon;
  return o || (Ua(
    e.entity,
    t?.attributes?.device_class,
    Ce(e.entity, t?.state),
    t?.state
  ) ?? lo(e.kind));
}
function Ba(e) {
  const t = Math.round(e);
  let i = Math.round(t * 0.62);
  return i % 2 !== t % 2 && (i += 1), Math.max(2, i);
}
function Bt(e) {
  return e.badgeContent === "icon" || e.badgeContent === "value" || e.badgeContent === "none" ? e.badgeContent : e.showIcon === !1 ? "none" : "icon";
}
function Qt(e) {
  const t = e.pressEffect;
  return t === "scale" || t === "ripple" || t === "flash" || t === "none" ? t : fa;
}
function Vu(e, t, i) {
  if (e.goToFloor !== "up" && e.goToFloor !== "down") return;
  const n = t.findIndex((o) => o.id === i);
  return n < 0 ? void 0 : t[n + (e.goToFloor === "up" ? 1 : -1)]?.id;
}
function ja(e) {
  const t = e.offlineStyle;
  return t === "dim" || t === "strike" || t === "none" ? t : ma;
}
function yn(e, t) {
  return e.entity ? t === void 0 || bt(t) : !1;
}
const Yu = {
  climate: { attribute: "current_temperature", unit: "°" },
  water_heater: { attribute: "current_temperature", unit: "°" },
  humidifier: { attribute: "current_humidity", unit: "%" }
};
function St(e) {
  if (e == null || typeof e == "boolean" || typeof e == "string" && e.trim() === "") return;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function Zu(e) {
  if (typeof e != "string") return "";
  const t = e.trim();
  return t === "°C" || t === "°F" || t === "K" ? "°" : t === "ppm" || t === "ppb" ? "" : t.length <= 3 ? t : "";
}
function Jt(e) {
  return Math.abs(e) < 10 && !Number.isInteger(e) ? e.toFixed(1) : String(Math.round(e));
}
function Xu(e, t) {
  return t === "W" && Math.abs(e) >= 1e3 ? { n: e / 1e3, unit: "kW" } : { n: e, unit: t };
}
function co(e, t) {
  const i = Xu(e, Zu(t));
  return Jt(i.n) + i.unit;
}
function Wa(e, t) {
  return Ka(e, t)?.text;
}
function qa(e) {
  return e === "primary" ? "primary" : e === "secondary" ? 0 : typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : void 0;
}
function Ka(e, t) {
  if (!e || !t.entity) return;
  const i = Fe(t), n = () => {
    const s = e.states[t.entity], l = s?.attributes, c = Yu[t.entity.split(".")[0]];
    if (t.attribute) {
      const d = St(l?.[t.attribute]);
      if (d !== void 0)
        return Jt(d) + (t.attribute === c?.attribute ? c.unit : "");
    }
    if (c) {
      const d = St(l?.[c.attribute]);
      if (d !== void 0) return Jt(d) + c.unit;
    }
    const h = St(s?.state);
    return h === void 0 ? void 0 : co(h, l?.unit_of_measurement);
  }, r = (s) => {
    const l = i[s];
    if (!l) return;
    const c = l.entity || (l.attribute ? t.entity : void 0);
    if (!c) return;
    const h = e.states[c], d = h?.attributes;
    if (l.attribute) {
      const g = St(d?.[l.attribute]);
      return g === void 0 ? void 0 : Jt(g);
    }
    const p = St(h?.state);
    return p === void 0 ? void 0 : co(p, d?.unit_of_measurement);
  }, o = qa(t.badgeEntity);
  if (o === "primary") {
    const s = n();
    return s === void 0 ? void 0 : { text: s, source: "primary" };
  }
  if (typeof o == "number") {
    const s = r(o);
    return s === void 0 ? void 0 : { text: s, source: o };
  }
  const a = n();
  if (a !== void 0) return { text: a, source: "primary" };
  for (let s = 0; s < i.length; s++) {
    const l = r(s);
    if (l !== void 0) return { text: l, source: s };
  }
}
const Qu = { ".": 0.28, "-": 0.38, "°": 0.45, "%": 1, k: 0.58 }, Ju = 0.7, ef = 0.85;
function ho(e) {
  let t = 0;
  for (const i of e)
    t += Qu[i] ?? (i >= "0" && i <= "9" ? Ju : ef);
  return t;
}
function Ga(e, t) {
  const i = Math.round(D(e, Be)), n = Math.max(0, i - 6), r = ho(t) > 0 ? n / ho(t) : i;
  let o = Math.round(Math.min(i * 0.46, r));
  return o % 2 !== i % 2 && (o -= 1), Math.max(6, o);
}
function po(e) {
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
function Z(e) {
  return e.motion ?? "swing";
}
function rr(e) {
  if (Z(e) !== "swing" || Pt(e) !== "single") return 1;
  const t = e.sashSpan;
  return typeof t != "number" || !Number.isFinite(t) ? 1 : Math.max($a, Math.min(1, t));
}
function or(e) {
  const t = e.type === "door" && Z(e) === "swing";
  return e.invert ? !t : t;
}
function tf(e) {
  return { sx: e.flipH ? -1 : 1, sy: e.flipV ? -1 : 1 };
}
function Ui(e) {
  return Z(e) === "slide" ? e.sliderStyle ?? "single" : "single";
}
function Va(e) {
  return e === "biparting" || e === "biparting-bypass" || e === "converging";
}
function fi(e) {
  return Z(e) === "swing" ? Ae(e) >= 2 : Va(Ui(e));
}
function Ae(e) {
  if (Z(e) !== "swing") return 1;
  switch (Pt(e)) {
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
function nf(e, t) {
  return t === 0 ? e : t === 1 ? ar(e) : { ...e, entity: e.extraEntities?.[t - 2] };
}
function ar(e) {
  return { ...e, entity: e.secondaryEntity };
}
function bn(e) {
  return e === "window" ? "double" : "single";
}
function Pt(e) {
  return Z(e) === "swing" ? e.sash ?? bn(e.type) : bn(e.type);
}
function ot(e) {
  return e.shutterStyle === "roll" || e.shutterStyle === "swing" ? e.shutterStyle : e.shutterEntity?.split(".")[0] === "binary_sensor" ? "swing" : "roll";
}
function Oe(e, t = !1) {
  if (!e || bt(e.state)) return 0;
  const i = e.attributes?.current_position;
  if (typeof i == "number" && Number.isFinite(i)) {
    const r = Math.max(0, Math.min(1, i / 100));
    return t ? 1 - r : r;
  }
  const n = e.state === "open" || e.state === "opening" || e.state === "closing" || e.state === "on";
  return (t ? !n : n) ? 1 : 0;
}
function ei(e, t = !1) {
  return !e || bt(e.state) ? !1 : Oe(e, t) > 0 || e.state === "opening" || e.state === "closing";
}
const rf = /* @__PURE__ */ new Set(["window", "blind", "shade", "shutter", "curtain", "awning"]), of = /* @__PURE__ */ new Set(["blind", "shade", "curtain"]), af = /* @__PURE__ */ new Set(["garage", "garage_door", "shutter"]);
function sf(e) {
  const t = e ?? "";
  return {
    type: rf.has(t) ? "window" : "door",
    motion: af.has(t) ? "roll" : of.has(t) ? "slide" : void 0
  };
}
const lf = 3;
function cf(e, t) {
  return e.split(".")[0] === "cover" && t & lf ? "cover-toggle" : "more-info";
}
function sr(e, t, i) {
  const n = e.entity || void 0, r = e.shutterEntity || void 0, o = !!(n && r && e.tapTarget === "shutter"), a = o ? r : n ?? r, s = n && r ? o ? n : r : void 0, l = t === "tap" ? e.tap_action : t === "hold" ? e.hold_action : e.double_tap_action;
  if (l) return { entity: l.entity ?? a, config: l };
  if (t === "tap")
    return a ? {
      entity: a,
      config: {
        action: (
          // Pointing the tap at the shutter opens its dialog; it does not
          // drive the motor. Choosing *which* entity answers is not the same
          // as choosing to move hardware on a tap, and that second decision
          // stays where it is explicit — `tap_action: toggle` (issue #47).
          !o && cf(a, i(a)) === "cover-toggle" ? "toggle" : "more-info"
        )
      }
    } : void 0;
  if (t === "hold" && s) return { entity: s, config: { action: "more-info" } };
}
function ti(e, t) {
  const i = t === "tap" ? e.tap_action : t === "hold" ? e.hold_action : e.double_tap_action;
  if (i)
    return { entity: i.entity ?? e.entity, config: i };
}
function df(e) {
  return ["tap", "hold", "double_tap"].some(
    (t) => Ie(ti(e, t)?.config)
  );
}
function hf(e, t) {
  return ["tap", "hold", "double_tap"].some(
    (i) => Ie(sr(e, i, t)?.config)
  );
}
function bt(e) {
  return e === "unavailable" || e === "unknown";
}
function pf(e, t) {
  if (!e.entity || t === void 0) return or(e);
  if (uf(e.entity, t)) return !1;
  const i = ff(e.entity, t);
  return e.invert ? !i : i;
}
function uf(e, t) {
  return bt(t) ? !0 : e.split(".")[0] === "lock" && t === "jammed";
}
function ff(e, t) {
  return e.split(".")[0] === "lock" ? Ce(e, t) : t === "on" || t === "open" || t === "opening" || t === "closing";
}
function mf(e) {
  return e === "opening" || e === "closing";
}
function We(e, t) {
  if (!e.entity || !t) return or(e) ? 1 : 0;
  if (bt(t.state)) return 0;
  const i = t.attributes?.current_position;
  if (typeof i == "number" && Number.isFinite(i)) {
    const n = Math.max(0, Math.min(1, i / 100));
    return e.invert ? 1 - n : n;
  }
  return pf(e, t.state) ? 1 : 0;
}
function ii(e, t) {
  return !e.entity || !t || bt(t.state) ? !1 : mf(t.state) || We(e, t) > 0;
}
function uo(e, t, i) {
  const n = e / 2, r = 5, o = Math.max(3, Math.round(e / 12)), a = [];
  for (let s = 1; s < o; s++) {
    const l = -n + e * s / o;
    a.push(
      _`<line x1=${l} y1=${-r / 2} x2=${l} y2=${r / 2}
            stroke=${Oi} stroke-width="0.75" />`
    );
  }
  return _`<g class="fp-roll-curtain" style="transform:scaleY(${1 - i});">
      <rect x=${-n} y=${-r / 2} width=${e} height=${r}
            style="fill:${t};" />
      ${a}
    </g>`;
}
function gf(e, t, i, n, r = 1, o = i, a = n) {
  const s = e / 2, l = 3, c = r * (t / 2 + l / 2), h = (d, p) => {
    const g = [], y = Math.max(2, Math.round(p / 14));
    for (let b = 1; b < y; b++) {
      const v = d + p * b / y;
      g.push(
        _`<line x1=${v} y1=${-l / 2} x2=${v} y2=${l / 2}
              stroke=${Oi} stroke-width="0.75" />`
      );
    }
    return g;
  };
  return _`
      <g transform="translate(${-s} ${c})">
        <g class="fp-door-leaf" style="transform:rotate(${r * 90 * n}deg);">
          <rect x="0" y=${-l / 2} width=${s} height=${l} style="fill:${i};" />
          ${h(0, s)}
        </g>
      </g>
      <g transform="translate(${s} ${c})">
        <g class="fp-leaf-r" style="transform:rotate(${-r * 90 * a}deg);">
          <rect x=${-s} y=${-l / 2} width=${s} height=${l} style="fill:${o};" />
          ${h(-s, s)}
        </g>
      </g>`;
}
const Ya = 22, mi = 14, gi = 22, yi = 15;
function lr(e, t = 0) {
  const i = e.flipV ? -1 : 1, n = e.angle * Math.PI / 180, r = { x: -Math.sin(n) * i, y: Math.cos(n) * i };
  return t === 90 ? { x: -r.y, y: r.x } : t === 180 ? { x: -r.x, y: -r.y } : t === 270 ? { x: r.y, y: -r.x } : r;
}
function cr(e, t = Ya) {
  const i = (e.flipV ? -1 : 1) * t, n = e.angle * Math.PI / 180;
  return { x: e.x - Math.sin(n) * i, y: e.y + Math.cos(n) * i };
}
function Za(e) {
  return !!(e.entity && e.shutterEntity) && (e.showShutterIcon ?? !0);
}
const yf = { on: "mdi:window-shutter-open", off: "mdi:window-shutter" }, fo = {
  door: { on: "mdi:door-open", off: "mdi:door-closed" },
  window: { on: "mdi:window-open", off: "mdi:window-closed" }
};
function Xa(e, t, i, n, r, o) {
  const a = Mt(t);
  if (a) return a;
  const s = Mt(o);
  if (s) return s;
  const l = Mt(i?.attributes?.icon);
  return l || (Ua(e, i?.attributes?.device_class, n) ?? (n ? r.on : r.off));
}
function Qa(e, t, i, n) {
  return Xa(
    e.shutterEntity ?? "",
    e.shutterIcon,
    t,
    i,
    yf,
    n
  );
}
function Ja(e) {
  return !!e.entity && (e.showIcon ?? !1);
}
function es(e, t, i, n) {
  return Xa(
    e.entity ?? "",
    e.icon,
    t,
    i,
    fo[e.type] ?? fo.door,
    n
  );
}
function ts(e) {
  return cr(e, -Ya);
}
function is(e, t = 0) {
  const i = lr(e, t);
  return { x: -i.x, y: -i.y };
}
function ns(e, t) {
  const { color: i, open: n = !0, active: r = !1, accent: o = W } = t, a = e.length / 2, s = G + 4, l = B(t.inactive) ?? i, c = Math.max(0, Math.min(1, t.amount ?? (n ? 1 : 0))), h = t.second ? Math.max(0, Math.min(1, t.second.amount)) : c, d = (u, $) => le(u ? o : $ === 0 ? l : i, W), p = d(r, c), g = t.second ? d(!!t.second.active, h) : p, y = (t.more ?? []).map((u) => Math.max(0, Math.min(1, u.amount))), b = (t.more ?? []).map((u, $) => d(!!u.active, y[$]));
  let v;
  if (Z(e) === "swing") {
    const u = Ae(e), $ = rr(e), k = u > 1 ? e.length / u : e.length * $, O = Math.PI / 2 * k, T = Array.from({ length: u }, (z, P) => {
      const S = P === 0 ? c : P === 1 ? h : y[P - 2] ?? c, oe = P === 0 ? p : P === 1 ? g : b[P - 2] ?? p;
      return { index: P, amt: S, tone: oe, hingeRight: u > 1 && (e.leafHinges?.[P] ? e.leafHinges[P] === "right" : P === u - 1) };
    }), H = (z, P, S) => _`<path class="fp-door-arc" d=${z}
              fill="none" stroke-width="1.5" stroke-dasharray=${O}
              style="stroke:${P};stroke-dashoffset:${O * (1 - S)};" />`, V = e.type === "window" ? _`
        <line x1=${-a} y1=${-s / 2} x2=${-a} y2=${s / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${a} y1=${-s / 2} x2=${a} y2=${s / 2}
              stroke=${i} stroke-width="2" />` : m;
    v = _`
        ${V}
        ${u > 1 ? (
      // Equal leaves side by side (floorplan-panel: 2..4). All hang on
      // their left edge but the last, which hangs on the right; for two
      // that is the classic pair meeting in the middle, each tracing
      // its own quarter circle outward.
      _`${T.map((z) => {
        const P = -a + z.index * k, S = P + k;
        return z.hingeRight ? H(`M ${P} 0 A ${k} ${k} 0 0 1 ${S} ${-k}`, z.tone, z.amt) : H(`M ${S} 0 A ${k} ${k} 0 0 0 ${P} ${-k}`, z.tone, z.amt);
      })}`
    ) : (
      // Hinged at the −x jamb, so the tip starts `leafW` along the wall
      // and ends `leafW` out from it. At full span that is exactly the
      // arc this drew before `sashSpan` existed.
      H(`M ${-a + k} 0 A ${k} ${k} 0 0 0 ${-a} ${-k}`, p, c)
    )}
        ${// The pane the sash does not cover: fixed glass, drawn in the base
    // colour because it never opens and so is never the active part.
    // Nothing at full span, which is every opening that predates this.
    $ < 1 ? _`<line x1=${-a + k} y1="0" x2=${a} y2="0"
              stroke=${i} stroke-width=${e.type === "window" ? 1.5 : 2.5} />` : m}
        <!-- leaves hinged at their left edge, the last at its right (flipH mirrors them) -->
        ${T.map((z) => {
      const P = -a + z.index * k;
      return z.hingeRight ? _`<g transform="translate(${P + k} 0)">
          <g class="fp-leaf-r" style="transform:rotate(${90 * z.amt}deg);">
            <rect x=${-k} y="-1.25" width=${k} height="2.5" style="fill:${z.tone};" />
          </g>
        </g>` : _`<g transform="translate(${P} 0)">
          <g class="fp-door-leaf" style="transform:rotate(${-90 * z.amt}deg);">
            <rect x="0" y="-1.25" width=${k} height="2.5" style="fill:${z.tone};" />
          </g>
        </g>`;
    })}
      `;
  } else if (Z(e) === "fixed") {
    const u = e.type === "window" ? 1.5 : 2.5;
    v = _`
        ${e.type === "window" ? _`
        <line x1=${-a} y1=${-s / 2} x2=${-a} y2=${s / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${a} y1=${-s / 2} x2=${a} y2=${s / 2}
              stroke=${i} stroke-width="2" />` : m}
        <line x1=${-a} y1="0" x2=${a} y2="0"
              stroke=${i} stroke-width=${u} />`;
  } else if (Z(e) === "awning") {
    const u = Math.min(12, e.length * 0.16), $ = 5, k = a - u / 2 - 1, O = Math.max(0, k - u / 2), T = Math.min(a * 0.62, 34) * c, H = Math.min(T * 0.16, O * 0.4), V = c > 0.02;
    v = _`
        <!-- jambs, as any window -->
        <line x1=${-a} y1=${-s / 2} x2=${-a} y2=${s / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${a} y1=${-s / 2} x2=${a} y2=${s / 2}
              stroke=${i} stroke-width="2" />
        <!-- The glass line: solid while the sash is shut and sitting in it,
             broken once the sash has swung out and left the gap behind. -->
        <line x1=${-a} y1="0" x2=${a} y2="0"
              stroke=${p} stroke-width="1.5"
              stroke-dasharray=${V ? "6 4" : m} />
        ${V ? (
      // A polyline, not a polygon, and that is the whole point of the
      // broken line above it. A closed shape strokes its own base back
      // along y=0 — straight over the dashes, solid — and the only
      // glass left uncovered would be the sliver outside `bx`, which
      // is exactly where the knuckles sit. The line would have been
      // dashed in the markup and solid on the screen at every size.
      _`<polyline
                    points="${-O},0 ${-O + H},${-T} ${O - H},${-T} ${O},0"
                    fill="none" stroke=${p} stroke-width="1.5"
                    stroke-linejoin="round" />`
    ) : m}
        <!-- Hinge knuckles, drawn whether or not it is open: they are what says
             this window is top-hung rather than fixed when it happens to be
             shut, and the request asked for them by name. -->
        ${[-k, k].map(
      (z) => _`
          <rect x=${z - u / 2} y=${-$ / 2} width=${u} height=${$}
                fill="none" stroke=${p} stroke-width="1.25" />
          <line x1=${z} y1=${-$ / 2} x2=${z} y2=${$ / 2}
                stroke=${p} stroke-width="1.25" />`
    )}`;
  } else if (Z(e) === "roll")
    v = _`
        <!-- jambs -->
        <line x1=${-a} y1=${-s / 2} x2=${-a} y2=${s / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${a} y1=${-s / 2} x2=${a} y2=${s / 2}
              stroke=${i} stroke-width="2" />
        <!-- Track: stays when the curtain is up so the gap still reads as an
             opening — and wears the accent while the cover is open or moving
             (issue #154). Wide open the curtain has scaled away to nothing, so
             this line is the *only* mark left: drawn in the base colour it read
             exactly like a shut garage, which is the one thing it must not do.
             Full strength when accented, since a 0.6 tint of the accent reads
             as neither colour. -->
        <line x1=${-a} y1="0" x2=${a} y2="0"
              stroke=${p} stroke-width="0.75" opacity=${r ? 1 : 0.6} />
        ${uo(e.length, p, c)}`;
  else {
    const u = e.type === "window" ? 1.5 : 2.5, $ = _`
        <line x1=${-a} y1=${-s / 2} x2=${-a} y2=${s / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${a} y1=${-s / 2} x2=${a} y2=${s / 2}
              stroke=${i} stroke-width="2" />`, k = Ui(e);
    if (k === "bypass") {
      const T = -a * c;
      v = _`
        ${$}
        <!-- tracks -->
        <line x1=${-a} y1=${-1.75} x2=${a} y2=${-1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <line x1=${-a} y1=${1.75} x2=${a} y2=${1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <!-- fixed panel: left half, front track -->
        <rect x=${-a} y=${1.75 - u / 2} width=${a} height=${u} style="fill:${p};" />
        <!-- moving panel: right half, back track -->
        <g class="fp-slide-panel" style="transform:translateX(${T}px);">
          <rect x="0" y=${-1.75 - u / 2} width=${a} height=${u} style="fill:${p};" />
        </g>`;
    } else if (k === "biparting")
      v = _`
        ${$}
        <!-- track -->
        <line x1=${-a} y1="0" x2=${a} y2="0"
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <g class="fp-slide-panel" style="transform:translateX(${-a * c}px);">
          <rect x=${-a} y=${-u / 2} width=${a} height=${u} style="fill:${p};" />
        </g>
        <g class="fp-slide-panel" style="transform:translateX(${a * h}px);">
          <rect x="0" y=${-u / 2} width=${a} height=${u} style="fill:${g};" />
        </g>`;
    else if (k === "biparting-bypass") {
      const T = a / 2;
      v = _`
        ${$}
        <!-- tracks -->
        <line x1=${-a} y1=${-1.75} x2=${a} y2=${-1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <line x1=${-a} y1=${1.75} x2=${a} y2=${1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <!-- fixed panels: outer quarters, front track. Never accented, even
             wide open — the accent marks what has moved, and lighting these
             would accent exactly the half that is still glazed shut. -->
        <rect x=${-a} y=${1.75 - u / 2} width=${T} height=${u} fill=${i} />
        <rect x=${a - T} y=${1.75 - u / 2} width=${T} height=${u} fill=${i} />
        <!-- moving panels: inner quarters, back track -->
        <g class="fp-slide-panel" style="transform:translateX(${-T * c}px);">
          <rect x=${-T} y=${-1.75 - u / 2} width=${T} height=${u} style="fill:${p};" />
        </g>
        <g class="fp-slide-panel" style="transform:translateX(${T * h}px);">
          <rect x="0" y=${-1.75 - u / 2} width=${T} height=${u} style="fill:${g};" />
        </g>`;
    } else if (k === "converging") {
      const T = a / 2;
      v = _`
        ${$}
        <!-- tracks -->
        <line x1=${-a} y1=${-1.75} x2=${a} y2=${-1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <line x1=${-a} y1=${1.75} x2=${a} y2=${1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <!-- both panels move, so both take the accent on their own state:
             front track travels right, back track left, and they meet. -->
        <g class="fp-slide-panel" style="transform:translateX(${T * c}px);">
          <rect x=${-a} y=${1.75 - u / 2} width=${a} height=${u} style="fill:${p};" />
        </g>
        <g class="fp-slide-panel" style="transform:translateX(${-T * h}px);">
          <rect x="0" y=${-1.75 - u / 2} width=${a} height=${u} style="fill:${g};" />
        </g>`;
    } else {
      const O = e.length * c;
      v = _`
        ${$}
        <!-- track -->
        <line x1=${-a} y1="0" x2=${a} y2="0"
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <g class="fp-slide-panel" style="transform:translateX(${O}px);">
          <rect x=${-a} y=${-u / 2} width=${e.length} height=${u} style="fill:${p};" />
        </g>`;
    }
  }
  if (t.shutter) {
    const u = Math.max(0, Math.min(1, t.shutter.amount)), $ = (V, z) => le(V ? t.shutter.accent ?? o : z === 0 ? l : i, W), k = $(t.shutter.active, u), O = t.shutter.second, T = O ? Math.max(0, Math.min(1, O.amount)) : u, H = O ? $(O.active, T) : k;
    v = _`${v}${t.shutter.style === "swing" ? gf(
      e.length,
      s,
      k,
      u,
      t.shutter.flip ? -1 : 1,
      H,
      T
    ) : uo(e.length, k, u)}`;
  }
  const { sx: x, sy: A } = tf(e);
  return _`<g class=${`fp-opening fp-opening-${se(e.type) ?? "unknown"}`}
                data-id=${se(e.id) ?? m}
                data-entity=${Pe(e.entity) ?? m}
                transform="translate(${e.x} ${e.y}) rotate(${e.angle})">
      <g transform="scale(${x} ${A})">${v}</g>
    </g>`;
}
function Ft(e) {
  if (typeof e != "number" || !Number.isFinite(e)) return 0;
  const t = (e % 360 + 360) % 360;
  return t === 90 || t === 180 || t === 270 ? t : 0;
}
function bf(e, t) {
  const i = Ft(e.rotation);
  if (t === void 0) return i;
  const n = t ? e.rotationPortrait : e.rotationLandscape;
  return n == null ? i : Ft(n);
}
function vf(e, t) {
  return typeof e.addEventListener == "function" ? (e.addEventListener("change", t), () => e.removeEventListener?.("change", t)) : typeof e.addListener == "function" ? (e.addListener(t), () => e.removeListener?.(t)) : () => {
  };
}
function He(e, t, i) {
  return i === 90 || i === 270 ? { w: t, h: e } : { w: e, h: t };
}
function it(e, t, i, n, r) {
  switch (r) {
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
function _f(e, t, i) {
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
function wf(e, t = jn, i = ci) {
  const n = Math.min(t, i), r = Math.max(t, i);
  if (!(typeof e == "number" || typeof e == "string" && e.trim() !== "")) return r;
  const a = typeof e == "number" ? e : Number(e);
  if (!Number.isFinite(a)) return r;
  const s = Yl - Br, l = Math.max(0, Math.min(1, (a - Br) / s)), c = l * l * (3 - 2 * l);
  return n + (r - n) * c;
}
const vn = 135, mo = 12;
function dr(e) {
  if (!(typeof e == "number" || typeof e == "string" && e.trim() !== "")) return;
  const i = typeof e == "number" ? e : Number(e);
  return Number.isFinite(i) ? i : void 0;
}
function xf(e) {
  const t = dr(e);
  if (t === void 0) return 1;
  if (t <= 0) return 0;
  if (t >= mo) return 1;
  const i = t / mo;
  return i * i * (3 - 2 * i);
}
function $f(e, t = 0) {
  const i = (e + t) * Math.PI / 180;
  return { x: Math.sin(i), y: -Math.cos(i) };
}
function kf(e, t) {
  return Bi(e) ? e.sunBearing : dr(t) ?? vn;
}
function Bi(e) {
  return typeof e.sunBearing == "number" && Number.isFinite(e.sunBearing);
}
function Sf(e, t) {
  return Bi(e) ? 1 : xf(t);
}
const bi = 0.34, Ef = 30, Af = 0.95, Tf = 0.16, Cf = 0.37, _n = "var(--fp-skin-sunlight, #ffd9a0)", wn = "var(--fp-skin-sunshade, #000)";
function If(e) {
  return Math.max(0.02, Math.min(1.5, D(e, bi)));
}
function Mf(e, t, i, n) {
  let r = n;
  for (const o of i) {
    const a = Qn(e.x, e.y, t.x, t.y, o);
    a !== void 0 && a > 1 && a < r && (r = a);
  }
  return r;
}
function Of(e) {
  const t = dr(e);
  if (t === void 0) return 1;
  const i = (r) => r * Math.PI / 180, n = Math.tan(i(Ef)) / Math.tan(i(Math.max(1, Math.min(89, t))));
  return Math.max(0.45, Math.min(1.9, n));
}
function Lf(e, t, i) {
  return e.sunlight === !1 || i !== void 0 && i <= 0 ? 0 : hr(e) ? 1 : Math.max(0, Math.min(1, t));
}
function hr(e) {
  return e.glazed ?? e.type === "window";
}
function rs(e) {
  const t = e.angle * Math.PI / 180, i = Math.cos(t) * e.length / 2, n = Math.sin(t) * e.length / 2;
  return [
    { x: e.x - i, y: e.y - n },
    { x: e.x + i, y: e.y + n }
  ];
}
function ji(e, t, i) {
  let n = !1;
  for (let r = 0, o = e.length - 1; r < e.length; o = r++) {
    const a = e[r], s = e[o];
    a.y > i != s.y > i && t < (s.x - a.x) * (i - a.y) / (s.y - a.y) + a.x && (n = !n);
  }
  return n;
}
function Pf(e, t, i) {
  for (const n of t) {
    const r = Qn(e.x, e.y, -i.x, -i.y, n);
    if (r === void 0) continue;
    if (!(r <= ui && Xn(e.x, e.y, n) <= ui)) return !1;
  }
  return !0;
}
function Ff(e, t) {
  return $f(kf(e, t) + 180, e.north ?? 0);
}
function os(e, t, i, n) {
  return [
    e,
    t,
    { x: t.x + i.x * n, y: t.y + i.y * n },
    { x: e.x + i.x * n, y: e.y + i.y * n }
  ];
}
function Nf(e, t, i, n = 1) {
  const [r, o] = rs(e), a = Math.max(0, Math.min(1, n)), s = (r.x + o.x) / 2, l = (r.y + o.y) / 2, c = (h) => ({ x: s + (h.x - s) * a, y: l + (h.y - l) * a });
  return os(c(r), c(o), t, i);
}
function Rf(e, t, i) {
  return os({ x: e.x1, y: e.y1 }, { x: e.x2, y: e.y2 }, t, i);
}
function go(e) {
  return e.map((t) => `${t.x},${t.y}`).join(" ");
}
function zf(e, t, i, n, r, o) {
  const { dir: a, openAmount: s, shutterOpen: l, strength: c = 1 } = o, h = {
    light: o.light ?? _n,
    // `?? ` would swallow the explicit null that means "no shade at all".
    shade: o.shade === void 0 ? wn : o.shade
  };
  if (c <= 0) return m;
  const d = Math.min(i, n) * If(o.reach), p = (S) => Lf(S, s(S), l(S)), g = Jn(e, t, p), y = g.map((S) => Rf(S, a, d)), b = t.map((S, oe) => {
    if (!(p(S) > 0 && Pf(S, e, a))) return;
    const Xe = Mf(S, a, g, d), [$r, kr] = rs(S), Ws = kr.x - $r.x, qs = kr.y - $r.y, Ks = Math.abs(Ws * a.y - qs * a.x) * p(S) / 2;
    return {
      // The outline runs past the falloff, so the ellipse is what bounds the
      // patch and never the polygon's flat far edge.
      points: go(Nf(S, a, Xe + S.length, p(S))),
      cx: S.x,
      cy: S.y,
      along: Xe,
      across: Math.max(1, Ks * Af),
      angle: Math.atan2(a.y, a.x) * 180 / Math.PI,
      lightId: `${r}-b${oe}`,
      shadeId: `${r}-s${oe}`,
      fadeId: `${r}-f${oe}`
    };
  });
  if (!b.some((S) => S !== void 0)) return m;
  const v = y.map(go), x = G, A = `${r}-shade`, u = `${r}-shadow`, $ = -x, k = -x, O = i + x * 2, T = n + x * 2, H = (S, oe = m) => _`<rect x=${$} y=${k} width=${O} height=${T} fill=${S}>${oe}</rect>`, V = (S, oe) => _`<polygon points=${S} fill=${oe} stroke=${oe} stroke-width=${G} />`, z = (S, oe, Xe) => _`<radialGradient id=${oe} gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1"
              gradientTransform=${`translate(${S.cx} ${S.cy}) rotate(${S.angle}) scale(${S.along} ${S.across})`}>
          <stop offset="0" stop-color=${Xe} stop-opacity="1" />
          <stop offset="0.45" stop-color=${Xe} stop-opacity="0.55" />
          <stop offset="1" stop-color=${Xe} stop-opacity="0" />
        </radialGradient>`, P = h.shade === null ? m : _`
      <!-- Where the shade shows: everywhere, minus the patches of light, plus
           back wherever a wall stands in one. The order is the whole logic. -->
      <mask id=${A} maskUnits="userSpaceOnUse" x=${$} y=${k} width=${O} height=${T}>
        ${H("#fff")}
        ${b.map((S) => S ? z(S, S.shadeId, "#000") : m)}
        ${b.map(
    (S) => S ? _`<polygon points=${S.points} fill=${`url(#${S.shadeId})`} />` : m
  )}
        ${v.map((S) => V(S, "#fff"))}
      </mask>`;
  return _`
    <defs>
      ${P}
      <!-- The wall shadows again, for the warm patches themselves. -->
      <mask id=${u} maskUnits="userSpaceOnUse" x=${$} y=${k} width=${O} height=${T}>
        ${H("#fff")}
        ${v.map((S) => V(S, "#000"))}
      </mask>
    </defs>
    <g class="fp-sunlight">
      ${h.shade === null ? m : _`<rect x=${$} y=${k} width=${O} height=${T}
            style=${`fill:${le(h.shade, wn)};`}
            opacity=${Tf * c} mask=${`url(#${A})`} />`}
      <g mask=${`url(#${u})`} opacity=${Cf * c}>
        ${b.map(
    (S) => S ? z(S, S.lightId, le(h.light, _n)) : m
  )}
        ${b.map(
    (S) => S ? _`<polygon class="fp-sunbeam" points=${S.points}
                            fill=${`url(#${S.lightId})`} />` : m
  )}
      </g>
    </g>`;
}
function as(e) {
  switch (e) {
    case "contain":
      return "xMidYMid meet";
    case "cover":
      return "xMidYMid slice";
    default:
      return "none";
  }
}
function ss(e, t, i, n) {
  const r = G + 4, o = G;
  return _`
    <defs>
      <mask id=${n} maskUnits="userSpaceOnUse"
            x=${-o} y=${-o} width=${t + o * 2} height=${i + o * 2}>
        <rect x=${-o} y=${-o} width=${t + o * 2} height=${i + o * 2}
              fill="white" />
        ${e.map((a) => {
    const s = a.length / 2;
    return _`<rect x=${a.x - s} y=${a.y - r / 2}
                           width=${a.length} height=${r} fill="black"
                           transform="rotate(${a.angle} ${a.x} ${a.y})" />`;
  })}
      </mask>
    </defs>`;
}
function pr(e) {
  if (!e.length) return { x: 0, y: 0 };
  const t = e.reduce((i, n) => ({ x: i.x + n.x, y: i.y + n.y }), { x: 0, y: 0 });
  return { x: t.x / e.length, y: t.y / e.length };
}
const xn = { scale: 1, txPercent: 0, tyPercent: 0 };
function Df(e, t, i, n, r = 0.15, o = hn, a) {
  if (!e.length) return xn;
  const s = e.map((T) => it(T.x, T.y, t, i, n)), l = He(t, i, n), c = s.map((T) => T.x), h = s.map((T) => T.y), d = Math.min(...c), p = Math.max(...c), g = Math.min(...h), y = Math.max(...h), b = Math.max(p - d, y - g) * r, v = Math.max(p - d + b * 2, 1), x = Math.max(y - g + b * 2, 1), A = Math.max(1, Math.min(o, Math.min(l.w / v, l.h / x))), u = a ?? A;
  if (!Number.isFinite(u)) return xn;
  const $ = (d + p) / 2 / l.w, k = (g + y) / 2 / l.h, O = (T) => Math.min(0, Math.max(100 * (1 - u), T));
  return {
    scale: u,
    txPercent: O(50 - u * $ * 100),
    tyPercent: O(50 - u * k * 100)
  };
}
function Hf(e) {
  const t = e.zoom;
  if (!(typeof t != "number" || !Number.isFinite(t)))
    return Math.max(1, Math.min(ga, t));
}
function Uf(e, t) {
  if (!Number.isFinite(e) || e <= 1) return 1;
  const i = typeof t == "number" && Number.isFinite(t) && t > 0 ? t : pn;
  return 1 / e * i;
}
const nn = 12, Bf = 1.5, jf = 0.4;
function ls(e) {
  return _`
    <defs>
      <pattern id=${e} width=${nn} height=${nn}
               patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line class="fp-dead-space-line" x1="0" y1="0" x2="0" y2=${nn}
              stroke=${Hn} stroke-width=${Bf} />
      </pattern>
    </defs>`;
}
function cs(e, t) {
  const i = e.map((n) => `${n.x},${n.y}`).join(" ");
  return _`<polygon class="fp-dead-space" points=${i}
                      fill=${`url(#${t})`} fill-rule="nonzero"
                      fill-opacity=${jf} stroke="none" />`;
}
function ds(e, t) {
  const i = e.points.map((o) => `${o.x},${o.y}`).join(" "), n = t !== void 0 && (e.highlight ?? "fill") !== "border", r = n ? e.activeOpacity ?? e.opacity : e.opacity;
  return _`<polygon class="fp-area" data-id=${se(e.id) ?? m}
                       data-entity=${Pe(e.entity) ?? m}
                       points=${i}
                       fill=${n ? t : le(e.color, W)}
                       fill-opacity=${D(r, dn)}
                       stroke=${e.type === "balcony" ? le(e.color, W) : "none"}
                       stroke-width=${e.type === "balcony" ? 3 : 0}
                       stroke-dasharray=${e.type === "balcony" ? "10 6" : m} />`;
}
function hs(e, t, i) {
  const n = t !== void 0 && (e.highlight ?? "fill") !== "fill", r = n ? t : e.borderColor ? le(e.borderColor, "none") : void 0;
  if (r === void 0 || r === "none") return m;
  const o = e.points.map((s) => `${s.x},${s.y}`).join(" "), a = D(
    e.borderWidth,
    n ? G / 2 : Zl
  );
  return !n || i === void 0 ? _`<polygon class="fp-area-border" data-id=${se(e.id) ?? m}
                        data-entity=${Pe(e.entity) ?? m}
                        points=${o} fill="none"
                        stroke=${r} stroke-width=${a} />` : _`
    <clipPath id=${i}><polygon points=${o} /></clipPath>
    <polygon class="fp-area-border" data-id=${se(e.id) ?? m}
             data-entity=${Pe(e.entity) ?? m}
             points=${o} fill="none" clip-path=${`url(#${i})`}
             stroke=${r} stroke-width=${a * 2} />`;
}
function $n(e, t, i = Te) {
  const n = t ?? e.color ?? Ql, r = lu(Di(i, e.type) ?? iu, e.w, e.h, n), o = e.hand === "left" ? " scale(-1 1)" : "";
  return _`<g class=${`fp-furniture fp-furniture-${se(e.type) ?? "unknown"}`}
                data-id=${se(e.id) ?? m}
                data-entity=${Pe(e.entity) ?? m}
                transform="translate(${e.x} ${e.y}) rotate(${e.angle ?? 0})${o}">${r}</g>`;
}
function vi(e, t, i, n, r, o = 3, a = "fixed") {
  function s(p) {
    return (p % 360 + 360) % 360;
  }
  function l(p, g, y) {
    return Math.max(Math.min(p, y), g);
  }
  const c = j(D(i, Pi), a), h = s(D(n, Fi)), d = l(D(r, Ni), 0, 360);
  return f`
    <div
      class="ripple ${e ? "active" : ""}"
      style="width:${c};height:${c};--fp-ripple-color:${le(t, W)};--fp-ripple-direction:${h};--fp-ripple-width:${d}"
    >
      <span class="dot"></span>
      ${Array.from(
    { length: o },
    (p, g) => f`<span class="ring" style="animation-delay:${(g * 0.6).toFixed(2)}s;"></span>`
  )}
    </div>
  `;
}
function _i(e, t) {
  if (!t || !e) return null;
  const i = e[t]?.state;
  if (i == null || i === "unavailable" || i === "unknown") return null;
  const n = Number(i);
  return Number.isFinite(n) ? n : null;
}
function ps(e, t) {
  const i = e.color ?? W, n = (e.dotSize ?? qn) / 2, r = e.x + e.w / 2, o = e.y + e.h / 2, a = e.angle ?? 0, s = Qr(e.xSensor, t.xReading), l = Qr(e.ySensor, t.yReading), c = s != null, h = l != null, d = t.xPresent === !1 || t.yPresent === !1, p = e.w / 2, g = e.h / 2, y = t.editing ? _`<rect class="tracker-zone ${d ? "presence-gated" : ""}"
                x=${-p} y=${-g} width=${e.w} height=${e.h}
                fill=${i} fill-opacity="0.08" stroke=${i} stroke-width="1.5"
                stroke-dasharray="6 4" rx="4" pointer-events="none" />` : _``;
  let b;
  if (d)
    b = _``;
  else if (c && h) {
    const v = -p + s * e.w, x = -g + l * e.h, A = `0,${-n} ${n * 0.9},${n * 0.7} ${-n * 0.9},${n * 0.7}`, u = Math.max(n * 3.5, Math.min(e.w, e.h) * 0.45);
    b = _`
      <g class="tracker-marker" style="transform:translate(${v}px, ${x}px);">
        <circle class="tracker-ring" cx="0" cy="0" r="0"
                fill="none" stroke=${i} stroke-width="1.5"
                style="--fp-tracker-ring-max:${u}px;" />
        <circle class="tracker-ring" cx="0" cy="0" r="0"
                fill="none" stroke=${i} stroke-width="1.5"
                style="--fp-tracker-ring-max:${u}px; animation-delay:0.7s;" />
        <polygon class="tracker-dot" points=${A} fill=${i} />
      </g>`;
  } else if (c || h)
    if (c) {
      const v = -p + s * e.w;
      b = _`
        <g class="tracker-line" style="transform:translate(${v}px, 0);">
          <line class="tracker-line-stroke" x1="0" y1=${-g} x2="0" y2=${g}
                stroke=${i} stroke-width="1.5" />
          <line class="tracker-band" x1="0" y1=${-g} x2="0" y2=${g}
                stroke=${i} stroke-width="3" stroke-linecap="round" />
          <line class="tracker-band" x1="0" y1=${-g} x2="0" y2=${g}
                stroke=${i} stroke-width="3" stroke-linecap="round"
                style="animation-delay:0.8s;" />
        </g>`;
    } else {
      const v = -g + l * e.h;
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
       data-id=${se(e.id) ?? m}
       transform="translate(${r} ${o}) rotate(${a})">
      ${y}${b}
    </g>`;
}
function yo(e, t, i, n) {
  let r = null, o = n;
  for (const a of i) {
    const s = a.x2 - a.x1, l = a.y2 - a.y1, c = s * s + l * l;
    if (c === 0) continue;
    let h = ((e - a.x1) * s + (t - a.y1) * l) / c;
    h = Math.max(0, Math.min(1, h));
    const d = a.x1 + h * s, p = a.y1 + h * l, g = Math.hypot(e - d, t - p);
    g < o && (o = g, r = { x: d, y: p, angle: Math.atan2(l, s) * 180 / Math.PI });
  }
  return r;
}
class Wi {
  static currentFloorEntityIds(t, i) {
    const n = t ? je(t) : [], r = n.find((a) => a.id === i) ?? n[0];
    if (!r) return [];
    const o = /* @__PURE__ */ new Set();
    for (const a of r.openings)
      a.entity && o.add(a.entity), a.secondaryEntity && o.add(a.secondaryEntity), a.shutterEntity && o.add(a.shutterEntity), a.shutterSecondaryEntity && o.add(a.shutterSecondaryEntity);
    for (const a of r.items) {
      a.entity && o.add(a.entity);
      for (const s of Fe(a))
        s.entity && o.add(s.entity);
    }
    for (const a of r.furniture)
      a.entity && o.add(a.entity);
    for (const a of r.areas)
      a.entity && o.add(a.entity);
    for (const a of r.trackers)
      for (const s of [a.xSensor, a.ySensor])
        s?.entity && o.add(s.entity), s?.presence?.entity && o.add(s.presence.entity);
    return Array.from(o).sort();
  }
  static scopeKey(t, i) {
    const n = Wi.currentFloorEntityIds(t, i);
    return n.length ? n.join("|") : "none";
  }
}
function Wf(e) {
  const t = Date.now() / 1e3, i = e?.historyReplay?.lookbackSeconds, n = typeof i == "number" && Number.isFinite(i) && i > 0 ? i : 3600;
  return { start: Math.max(0, t - n), end: t };
}
function bo(e, t) {
  const i = Math.max(0, Math.min(e, t)), n = Math.max(0, Math.max(e, t));
  return {
    start: i,
    end: Math.max(i, n)
  };
}
function qf(e, t) {
  return Wi.currentFloorEntityIds(e, t);
}
function Kf(e, t) {
  return Wi.scopeKey(e, t);
}
function Gf(e, t, i) {
  const r = Math.max(1, i - t) / 30, o = e?.historyReplay?.defaultSpeed;
  return Math.max(0.25, o ?? r);
}
function Vf(e) {
  const t = Date.parse(e);
  return Number.isNaN(t) ? Date.now() / 1e3 : t / 1e3;
}
function vo(e) {
  if (!Number.isFinite(e) || e <= 0) return "";
  const t = new Date(e * 1e3), i = t.getFullYear(), n = `${t.getMonth() + 1}`.padStart(2, "0"), r = `${t.getDate()}`.padStart(2, "0"), o = `${t.getHours()}`.padStart(2, "0"), a = `${t.getMinutes()}`.padStart(2, "0");
  return `${i}-${n}-${r}T${o}:${a}`;
}
function Yf(e) {
  const t = Math.min(3, Math.max(-2, e));
  return Number((10 ** t).toPrecision(4));
}
function Zf(e, t, i) {
  if (!e) return;
  if (i.has(t))
    return i.get(t);
  const n = je(e);
  let r;
  for (const o of n) {
    for (const a of o.items ?? [])
      if (a.entity === t)
        return r = a.activeColor ?? a.rippleColor, i.set(t, r), r;
    for (const a of o.openings ?? [])
      if (a.entity === t)
        return r = a.activeColor, i.set(t, r), r;
    for (const a of o.furniture ?? [])
      if (a.entity === t)
        return r = a.activeColor, i.set(t, r), r;
  }
  i.set(t, void 0);
}
function Xf(e, t, i, n, r) {
  if (!t) return Dt(e);
  const o = B(Zf(t, e.entityId, n)), a = Ce(e.entityId, e.newState);
  if (r && o) return a ? o : "#ffffff";
  const s = Dt(e);
  return a ? s : "#ffffff";
}
function Qf(e, t) {
  if (!Number.isFinite(e)) return "—";
  try {
    return t.format(new Date(e * 1e3));
  } catch {
    return new Date(e * 1e3).toISOString();
  }
}
var Jf = Object.defineProperty, em = Object.getOwnPropertyDescriptor, X = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? em(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (r = (n ? a(t, i, r) : a(r)) || r);
  return n && r && Jf(t, i, r), r;
};
function tm(e) {
  const t = e.state.playbackController, i = e.state, r = i.enabled || i.startTime > 0 ? void 0 : e.getDefaultWindow(), o = r ? r.start : i.startTime, a = r ? r.end : i.endTime, s = e.formatReplayTime(
    r ? r.end : t.currentTime
  );
  return {
    events: i.historyEvents,
    startTime: r ? r.start : t.startTime,
    endTime: r ? r.end : t.endTime,
    currentTime: r ? r.end : t.currentTime,
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
    currentTimeLabel: s,
    startInputValue: vo(o),
    endInputValue: vo(a),
    onToggleVisible: (l) => e.toggleHistoryVisible(l),
    onRangeChange: (l, c) => {
      e.handleRangeChange(l, { target: { value: c } });
    },
    onZoom: (l) => e.zoomWindow(l),
    onJump: (l) => e.jumpReplay(l),
    onStep: (l) => e.stepReplay(l),
    onPlayToggle: () => t.playing ? e.pauseReplay() : e.playReplay(),
    onToggleSpeedPanel: () => e.toggleSpeedPanel(),
    onSpeedSliderInput: (l) => e.setReplaySpeed(Yf(l)),
    onSpeedChange: (l) => e.setReplaySpeed(l),
    onToggleTimeline: () => e.toggleTimeline(),
    onToggleLog: () => e.toggleLog(),
    onSeek: (l) => e.seekReplay(l)
  };
}
function im(e) {
  return f`
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
let q = class extends ae {
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
      const r = t + i >> 1;
      this.events[r].timestamp <= e ? (n = r, t = r + 1) : i = r - 1;
    }
    return n >= 0 ? this.events[n] : void 0;
  }
  _renderEventItem(e, t) {
    const i = e.timestamp <= this.currentTime, n = (typeof e.color == "string" ? e.color : void 0) ?? (typeof e.attributes?.color == "string" ? e.attributes.color : void 0) ?? Dt(e), r = B(n), o = r ? `background:${r}; box-shadow:0 0 0 2px ${r}22;` : m;
    return f`
      <li class="replay-event-item ${i ? "replay-event-passed" : ""} ${t ? "replay-event-current" : ""}" data-timestamp=${e.timestamp}>
        <span class="replay-event-dot" style=${o}></span>
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
      return f`
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
    return f`
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
            ${this.error ? f`<span class="replay-error">${this.error}</span>` : m}
            ${this.rangeWarning ? f`<span class="replay-loading">${this.rangeWarning}</span>` : m}
            ${!this.ready && this.enabled && !this.error ? f`<span class="replay-loading">Loading history…</span>` : m}
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
        ${this.speedExpanded ? f`<div class="replay-speed-panel">
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
            </div>` : m}
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
          ${this.logExpanded ? f`<ul
                class="replay-event-list"
                ${(t) => {
      this._logRef = t instanceof HTMLUListElement ? t : void 0, this._logRef && this.events.length && this._syncLogToCurrentEvent();
    }}
              >${ke(this.events, (t, i) => `${t.timestamp}-${t.entityId}-${t.newState}-${i}`, (t) => this._renderEventItem(t, e?.timestamp === t.timestamp))}</ul>` : m}
          ${!this.logExpanded && !this.events.length ? f`<div class="replay-empty">No history events yet.</div>` : m}
        </div>
      </div>
    `;
  }
};
q.styles = me`
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
X([
  C({ attribute: !1 })
], q.prototype, "events", 2);
X([
  C({ type: Number })
], q.prototype, "startTime", 2);
X([
  C({ type: Number })
], q.prototype, "endTime", 2);
X([
  C({ type: Number })
], q.prototype, "currentTime", 2);
X([
  C({ type: Boolean })
], q.prototype, "visible", 2);
X([
  C({ type: Boolean })
], q.prototype, "enabled", 2);
X([
  C({ type: Boolean })
], q.prototype, "ready", 2);
X([
  C({ type: Boolean })
], q.prototype, "playing", 2);
X([
  C({ type: Boolean })
], q.prototype, "timelineExpanded", 2);
X([
  C({ type: Boolean })
], q.prototype, "logExpanded", 2);
X([
  C({ type: Boolean })
], q.prototype, "speedExpanded", 2);
X([
  C({ type: String })
], q.prototype, "error", 2);
X([
  C({ type: String })
], q.prototype, "rangeWarning", 2);
X([
  C({ type: String })
], q.prototype, "panelId", 2);
X([
  C({ type: Number })
], q.prototype, "replaySpeed", 2);
X([
  C({ type: String })
], q.prototype, "currentTimeLabel", 2);
X([
  C({ type: String })
], q.prototype, "startInputValue", 2);
X([
  C({ type: String })
], q.prototype, "endInputValue", 2);
q = X([
  Ai("easy-floorplan-replay-panel")
], q);
const us = "--fp-color-", fs = 24;
function te(e) {
  return typeof e != "string" ? "" : e.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
}
function ms(e) {
  return us + te(e);
}
function _o(e) {
  return `var(${ms(e)})`;
}
function jt(e) {
  if (!Array.isArray(e)) return [];
  const t = /* @__PURE__ */ new Set(), i = [];
  for (const n of e) {
    if (!n || typeof n != "object") continue;
    const { name: r, color: o } = n, a = te(r), s = B(o);
    if (!(!a || !s || t.has(a)) && (t.add(a), i.push({ name: r.trim(), color: s }), i.length >= fs))
      break;
  }
  return i;
}
function gs(e) {
  return jt(e).map((t) => `${ms(t.name)}:${t.color};`).join("");
}
function ys(e) {
  return jt(e).map((t) => `${te(t.name)}=${t.color}`).join(",");
}
const nm = /^[Vv][Aa][Rr]\(\s*--fp-color-([\p{L}\p{N}-]+)\s*(?:,((?:[^()]|\([^()]*\))*))?\)$/u;
function bs(e) {
  return kn(e)?.slug;
}
function kn(e) {
  if (typeof e != "string") return;
  const t = nm.exec(e.trim());
  if (!t) return;
  const i = t[2]?.trim();
  return { slug: t[1], fallback: i || void 0 };
}
function ni(e, t) {
  const i = bs(e);
  if (!i) return e;
  const n = jt(t).find((r) => te(r.name) === i);
  return n ? n.color : e;
}
function wo(e, t, i) {
  if (!t) return e;
  const n = (r) => {
    if (typeof r == "string") {
      const o = kn(r);
      if (o?.slug !== t) return r;
      const a = kn(i);
      return o.fallback && a && !a.fallback ? `var(${us}${a.slug}, ${o.fallback})` : i;
    }
    return Array.isArray(r) ? r.map(n) : r && typeof r == "object" ? Object.fromEntries(Object.entries(r).map(([o, a]) => [o, n(a)])) : r;
  };
  return n(e);
}
const rm = 500, om = 250;
class am extends HTMLElement {
  constructor() {
    super(...arguments), this.holdTime = rm, this.held = !1, this.cancelled = !1;
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
    t.actionHandler && sm(i, t.actionHandler.options) || (t.actionHandler ? (t.removeEventListener("touchstart", t.actionHandler.start), t.removeEventListener("touchend", t.actionHandler.end), t.removeEventListener("touchcancel", t.actionHandler.end), t.removeEventListener("mousedown", t.actionHandler.start), t.removeEventListener("click", t.actionHandler.end), t.removeEventListener("keydown", t.actionHandler.handleKeyDown)) : t.addEventListener("contextmenu", (n) => {
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
      const r = n.target;
      i.hasHold && this.timer && (clearTimeout(this.timer), this.timer = void 0), i.hasHold && this.held ? Vt(r, "hold") : i.hasDoubleClick ? n.type === "click" && n.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, Vt(r, "tap");
      }, om) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, Vt(r, "double_tap")) : Vt(r, "tap");
    }, t.actionHandler.handleKeyDown = (n) => {
      ["Enter", " "].includes(n.key) && (n.preventDefault(), n.currentTarget.actionHandler.end(n));
    }, t.addEventListener("touchstart", t.actionHandler.start, { passive: !0 }), t.addEventListener("touchend", t.actionHandler.end), t.addEventListener("touchcancel", t.actionHandler.end), t.addEventListener("mousedown", t.actionHandler.start, { passive: !0 }), t.addEventListener("click", t.actionHandler.end), t.addEventListener("keydown", t.actionHandler.handleKeyDown)));
  }
}
function sm(e, t) {
  return e.hasHold === t.hasHold && e.hasDoubleClick === t.hasDoubleClick && e.disabled === t.disabled;
}
function Vt(e, t) {
  e.dispatchEvent(
    new CustomEvent("action", { detail: { action: t }, bubbles: !0, composed: !0 })
  );
}
function lm() {
  const e = document.body, t = e.querySelector("action-handler-fp-ef");
  if (t) return t;
  const i = document.createElement("action-handler-fp-ef");
  return e.appendChild(i), i;
}
customElements.get("action-handler-fp-ef") || customElements.define("action-handler-fp-ef", am);
const cm = (e, t) => {
  lm().bind(e, t);
}, Je = Ci(
  class extends Ii {
    update(e, [t]) {
      return cm(e.element, t), _e;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render(e) {
    }
  }
), $e = class $e {
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
    return Number.isFinite(t) ? Math.min($e._MAX_SPEED, Math.max($e._MIN_SPEED, t)) : Number.isNaN(t) ? 1 : $e._MAX_SPEED;
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
    Number.isFinite(t) && (this.speed = Math.min($e._MAX_SPEED, Math.max($e._MIN_SPEED, t)));
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
$e._MIN_SPEED = 0.01, $e._MAX_SPEED = 1e3;
let wi = $e, dm = 0;
class hm {
  constructor(t) {
    this._card = t, this._historyService = new Kl(), this.state = {
      playbackController: new wi(),
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
      panelId: `fp-replay-panel-${dm++}`
    };
  }
  logReplay(t, i) {
    this._card.getConfig()?.historyReplay?.debug && console.log(t, i ?? {});
  }
  getDefaultWindow() {
    return Wf(this._card.getConfig());
  }
  normalizeWindow(t, i) {
    return bo(t, i);
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
    return qf(this._card.getConfig(), this._card.getActiveFloorId());
  }
  scopeKey() {
    return Kf(this._card.getConfig(), this._card.getActiveFloorId());
  }
  speedForRange(t, i) {
    return Gf(this._card.getConfig(), t, i);
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
    return Qf(t, new Intl.DateTimeFormat(void 0, {
      dateStyle: "short",
      timeStyle: "medium"
    }));
  }
  handleRangeChange(t, i) {
    const n = i.target, r = Vf(n.value);
    t === "start" ? this.state.startTime = r : this.state.endTime = r, this.updateWindow(this.state.startTime, this.state.endTime);
  }
  updateWindow(t, i) {
    const { start: n, end: r } = bo(t, i), o = r - n;
    this.state.rangeWarning = o < 60 ? "Very small replay window may hide expected transitions." : void 0;
    const a = this.state.playbackController.playing;
    this.state.startTime = n, this.state.endTime = r, this.clearHistoryCache(), this.state.playbackController.pause(), this.stopReplayLoop(), this._card.requestUpdate(), !(!this._card.getHass() || !this.state.historyVisible) && this.startReplay({ preserveCurrentTime: !0, keepPlaying: a });
  }
  resetForFloorChange() {
    this.state.historyEvents = [], this.state.enabled = !1, this.state.ready = !1, this.state.error = void 0, this.state.loadRequested = !1, this.state.loadToken += 1, this.clearHistoryCache(), this.stopReplayLoop(), this._card.requestUpdate(), this._card.getHass() && this.state.historyVisible && this.startReplay({ preserveCurrentTime: !0, keepPlaying: this.state.playbackController.playing });
  }
  zoomWindow(t) {
    const i = Math.max(60, this.state.endTime - this.state.startTime), n = this.state.playbackController.currentTime, r = t > 0 ? Math.max(60, i * 0.8) : i * 1.25, o = r / 2, a = Math.max(0, n - o), s = a + r;
    this.updateWindow(a, s);
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
    const i = this.state.startTime || this.getDefaultWindow().start, n = this.state.endTime || this.getDefaultWindow().end, { start: r, end: o } = this.normalizeWindow(i, n);
    this.state.startTime = r, this.state.endTime = o, this.state.enabled = !0, this.state.loadRequested = !0, this.state.error = void 0, this.state.ready = !1;
    const a = t.preserveCurrentTime ? Math.min(o, Math.max(r, this.state.playbackController.currentTime)) : r;
    this.state.playbackController = new wi({
      startTime: r,
      endTime: o,
      initialSpeed: this.speedForRange(r, o)
    }), this.state.playbackController.seek(a), t.keepPlaying && this.state.playbackController.play();
    const s = ++this.state.loadToken;
    this.logReplay("[easy-floorplan] Starting replay", { start: r, end: o, lookback: o - r }), await this.loadReplayRange(r, o, s), t.keepPlaying && this.state.enabled && this.state.playbackController.playing && this.startReplayLoop(), this._card.requestUpdate();
  }
  async loadReplayRange(t, i, n) {
    try {
      const r = this.scopeKey();
      if (await this._historyService.loadHistory(t, i, { scopeKey: r, hass: this._card.getHass(), watched: this.watchedEntities(), numericSteps: this._card.getConfig()?.historyReplay?.numericSteps }), n !== this.state.loadToken) return;
      const o = new Set(this.watchedEntities()), a = this._historyService.getEvents();
      this.state.historyEvents = a.filter((s) => o.has(s.entityId)).map((s) => ({
        ...s,
        color: Xf(s, this._card.getConfig(), this._card.getHass(), this.state.configuredColorCache, this.state.configured)
      })), this.state.ready = !0, this.state.loadRequested = !1, this.state.error = void 0, this.logReplay("[easy-floorplan] Replay history loaded", { eventCount: this.state.historyEvents.length }), this._card.requestUpdate();
    } catch (r) {
      if (n !== this.state.loadToken) return;
      this.state.ready = !1, this.state.loadRequested = !1, this.state.error = r instanceof Error ? r.message : "Unable to load history.", console.error("[easy-floorplan] Replay history loading failed", r);
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
    const i = this.state.playbackController.currentTime, n = 1e-4, r = t > 0 ? this._historyService.getEventAfter(i + n) : this._historyService.getEventBefore(i - n);
    r ? this.state.playbackController.seek(r.timestamp) : this.state.playbackController.seek(t > 0 ? this.state.playbackController.endTime : this.state.playbackController.startTime), this._card.requestUpdate();
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
var pm = Object.defineProperty, um = Object.getOwnPropertyDescriptor, vt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? um(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (r = (n ? a(t, i, r) : a(r)) || r);
  return n && r && pm(t, i, r), r;
};
const xo = /* @__PURE__ */ new Map();
function $o(e) {
  return e.map((t) => t.id).join("|");
}
let pe = class extends ae {
  constructor() {
    super(...arguments), this._wallMaskId = `fp-wall-mask-${pe._nextWallMaskId++}`, this._glowIdBase = `fp-glow-${pe._nextGlowId++}`, this._watchedEntities = /* @__PURE__ */ new Set(), this._replayController = new hm({
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
    this._onOrientation(e), this._unsubscribeOrientation = vf(e, this._onOrientation);
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
      width: e.width ?? rt,
      height: e.height ?? Ht,
      walls: e.walls ?? [],
      openings: e.openings ?? [],
      items: e.items ?? [],
      texts: e.texts ?? [],
      furniture: e.furniture ?? []
    }, this._watchedEntities = Ct(this._config), this._syncHistoryServiceContext(), this._replayController.clearConfigColorCache();
    const i = this._replayCacheKey();
    if (i !== this._lastReplayCacheKey && (this._lastReplayCacheKey = i, this._replayController.historyService().clearCache()), this._replayController.syncToConfig(), !this._activeFloorId) {
      const n = je(this._config), r = xo.get($o(n));
      r && n.some((o) => o.id === r) && (this._activeFloorId = r);
    }
  }
  /**
   * HA pushes a fresh `hass` on every state change anywhere in the instance —
   * for most updates nothing on this plan moved. Skip those renders entirely.
   */
  shouldUpdate(e) {
    if (!(e.size === 1 && e.has("hass"))) return !0;
    const t = e.get("hass");
    return !t || !this.hass ? !0 : ka(t, this.hass, this._watchedEntities);
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
    const t = zl(this._config?.skin);
    t ? this.setAttribute("data-skin", t) : this.removeAttribute("data-skin");
  }
  updated(e) {
    super.updated(e), (e.has("hass") || e.has("_activeFloorId")) && this._syncHistoryServiceContext();
  }
  getCardSize() {
    return 6;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Sg), document.createElement("fp-ef-editor");
  }
  static getStubConfig() {
    return oc();
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
    return Ce(e.entity, t?.states[e.entity]?.state);
  }
  /** How far open an opening should be drawn (0..1), from its entity (or default). */
  _openingAmount(e, t) {
    const i = e.entity ? t?.states[e.entity] : void 0;
    return We(e, i);
  }
  /** Whether an opening wears its accent: drawn open, or a cover still in transit. */
  _openingActive(e, t) {
    const i = e.entity ? t?.states[e.entity] : void 0;
    return ii(e, i);
  }
  /**
   * The second leaf's own state for an opening with a sensor on each — a
   * two-panel slider (issue #145) or a hinged double (issue #159).
   * `undefined` — no second sensor, or a shape with only one leaf — leaves both
   * on the first entity, so nothing about a single-sensor opening changes.
   */
  _openingSecond(e, t) {
    if (!e.secondaryEntity || !fi(e)) return;
    const i = ar(e), n = t?.states[e.secondaryEntity];
    return { amount: We(i, n), active: ii(i, n) };
  }
  /** floorplan-panel: states of leaves 3 and 4; a leaf without a sensor follows the first. */
  _openingMore(e, t) {
    const i = Ae(e);
    if (i < 3 || !e.extraEntities?.some(Boolean)) return;
    const n = [];
    for (let r = 2; r < i; r++) {
      const o = e.extraEntities[r - 2];
      if (!o) {
        n.push({ amount: this._openingAmount(e, t), active: this._openingActive(e, t) });
        continue;
      }
      const a = nf(e, r), s = t?.states[o];
      n.push({ amount: We(a, s), active: ii(a, s) });
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
    if (!e.shutterSecondaryEntity || ot(e) !== "swing") return;
    const i = t?.states[e.shutterSecondaryEntity];
    return {
      amount: Oe(i, e.shutterInvert),
      active: ei(i, e.shutterInvert)
    };
  }
  _itemIcon(e, t) {
    return gn(
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
    this.hass && kt(this, this.hass, t, _a(t, e.detail.action));
  }
  /** What a gesture on this opening would do, if anything. */
  _openingPress(e, t) {
    return sr(e, t, this._featuresOf);
  }
  /**
   * Pressing an opening (issue #74 follow-up). Which entity answers — the
   * window/door or its shutter — is {@link openingActionForGesture}'s call;
   * from here it is the same Lovelace dispatch every device uses.
   */
  _onOpeningAction(e, t) {
    if (!this.hass) return;
    const i = this._openingPress(t, e.detail.action);
    i && kt(this, this.hass, { entity: i.entity }, i.config);
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
  _renderShutterMark(e, t, i, n, r) {
    const o = e.shutterEntity, a = r?.states[o], s = Oe(a, e.shutterInvert) > 0, l = ei(a, e.shutterInvert), c = Qa(e, a, s, this.hass?.entities?.[o]?.icon), h = B(e.shutterActiveColor ?? e.activeColor) ?? W, d = cr(e), p = it(d.x, d.y, t.width, t.height, i), g = He(t.width, t.height, i), y = lr(e, i), b = j(mi, n), v = `translate(calc(${y.x} * ${b}), calc(${y.y} * ${b}))`, x = j(gi, n), A = r?.states[o]?.attributes?.friendly_name ?? o;
    return f`
      <div
        class="shutter-mark ${l ? "on" : "off"}"
        data-entity=${Pe(o) ?? m}
        style="left:${p.x / g.w * 100}%; top:${p.y / g.h * 100}%;
               width:${x};height:${x};
               transform:translate(-50%,-50%) ${v};--fp-active:${h};"
        title="${A} · ${Ut(r, o)}"
        role="button"
        tabindex="0"
        @action=${() => {
      this.hass && kt(this, this.hass, { entity: o }, { action: "more-info" });
    }}
        .actionHandler=${Je({})}
      >
        <ha-icon
          icon=${c}
          style="--mdc-icon-size:${j(yi, n)};"
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
  _renderOpeningMark(e, t, i, n, r) {
    const o = e.entity, a = r?.states[o], s = this._openingAmount(e, r) > 0, l = this._openingActive(e, r), c = es(e, a, s, this.hass?.entities?.[o]?.icon), h = B(e.activeColor) ?? W, d = ts(e), p = it(d.x, d.y, t.width, t.height, i), g = He(t.width, t.height, i), y = is(e, i), b = j(mi, n), v = `translate(calc(${y.x} * ${b}), calc(${y.y} * ${b}))`, x = j(gi, n), A = r?.states[o]?.attributes?.friendly_name ?? o;
    return f`
      <div
        class="shutter-mark ${l ? "on" : "off"}"
        data-entity=${Pe(o) ?? m}
        style="left:${p.x / g.w * 100}%; top:${p.y / g.h * 100}%;
               width:${x};height:${x};
               transform:translate(-50%,-50%) ${v};--fp-active:${h};"
        title="${A} · ${Ut(r, o)}"
        role="button"
        tabindex="0"
        @action=${() => {
      this.hass && kt(this, this.hass, { entity: o }, { action: "more-info" });
    }}
        .actionHandler=${Je({})}
      >
        <ha-icon
          icon=${c}
          style="--mdc-icon-size:${j(yi, n)};"
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
    this._activeFloorId = t, xo.set($o(e), t), this._zoomedAreaId = void 0, !(i || !this.hass || !this._config?.historyReplay?.enabled) && this._replayController.resetForFloorChange();
  }
  /** floorplan-panel: service floorplan_panel.show_room — jump to a room (id or name) and zoom in. */
  showRoom(e, t) {
    if (!this._config) return !1;
    const i = je(this._config), n = e.toLowerCase();
    for (const r of i) {
      if (t && r.id !== t) continue;
      const o = r.areas.find((a) => a.id === e || (a.name ?? "").toLowerCase() === n);
      if (o)
        return this._goToFloor(i, r.id), this._zoomedAreaId = o.id, this._emitAreaTap(o.id, !0), !0;
    }
    return !1;
  }
  /** floorplan-panel: service floorplan_panel.reset_view — zoom back out. */
  resetView() {
    if (!this._zoomedAreaId) return;
    const e = this._zoomedAreaId;
    this._zoomedAreaId = void 0, this._emitAreaTap(e, !1);
  }
  _emitAreaTap(e, t) {
    this.dispatchEvent(
      new CustomEvent("fp-area-tap", {
        detail: { areaId: e, floorId: this._activeFloorId, zoomed: t },
        bubbles: !0,
        composed: !0
      })
    );
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
    const i = ti(t, e.detail.action);
    if (!i) {
      e.detail.action === "tap" && this._onAreaClick(t);
      return;
    }
    this.hass && kt(this, this.hass, { entity: i.entity }, i.config);
  }
  _renderBadge(e, t, i) {
    const n = D(e.size, Be), r = j(n, t), o = e.entity ? i?.states[e.entity] : void 0, a = Da(e, o?.state, o?.attributes), s = Bt(e) === "value" ? Wa(i, e) : void 0;
    return f`
      <div
        class="badge"
        style="width:${r};height:${r};transform:rotate(${D(e.angle, 0)}deg);"
      >
        ${s ? f`<span
              class="badge-value"
              style="font-size:${j(Ga(n, s), t)};"
              >${s}</span
            >` : f`<ha-icon
              class=${a ? `anim-${a}` : ""}
              icon=${this._itemIcon(e, i)}
              style="--mdc-icon-size:${j(Ba(n), t)};"
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
  _renderItem(e, t, i, n, r) {
    const o = this._isOn(e, r), a = Pa(r, e), s = e.entity ? r?.states[e.entity] : void 0, l = nr(e, s), c = B(Hi(e.stateColor, l)), h = Na(e, c), d = !!this.hass && yn(e, s?.state), p = Cu(e, s?.state, r), g = Bt(e) !== "none", y = e.display ?? "badge", b = Ea(s), v = B(e.activeColor) ?? b, x = o || d ? void 0 : B(e.inactiveColor), A = e.rippleColor ?? c ?? e.activeColor ?? b ?? W, u = la(
      ni(
        c ?? (o ? v : x),
        this._config?.palette
      )
    ), $ = e.rippleSize ?? Pi, k = e.rippleDirection ?? Fi, O = e.rippleWidth ?? Ni, T = p ? "visibility: hidden; pointer-events: none;" : "";
    let H = m;
    y === "ripple" ? H = f`<span style="${T}">
        ${vi(o, A, $, k, O, 3, n)}
      </span>` : y === "iconRipple" ? H = f`<div class="stack" style="${T}">
        ${vi(o, A, $, k, O, 3, n)}
        ${g ? f`<div class="stack-icon">${this._renderBadge(e, n, r)}</div>` : m}
      </div>` : g && (H = f`<span style="${T}">
        ${this._renderBadge(e, n, r)}
      </span>`);
    const V = it(e.x, e.y, t.width, t.height, i), z = He(t.width, t.height, i), P = hu(e);
    return f`
      <div
        class="item fp-item ${o ? "on" : "off"} ${d ? "offline" : ""} ${c ? "state-colored" : ""} ${x ? "inactive-colored" : ""} ${P ? "interactive" : ""}"
        data-id=${se(e.id) ?? m}
        data-entity=${Pe(e.entity) ?? m}
        data-kind=${se(e.kind) ?? m}
        style="left:${V.x / z.w * 100}%; top:${V.y / z.h * 100}%;${c ? `--fp-state:${c};` : ""}${v ? `--fp-active:${v};` : ""}${x ? `--fp-inactive:${x};` : ""}${u ? `--fp-ink:${u};` : ""}"
        title=${this._label(e, r)}
        role=${P ? "button" : m}
        tabindex=${P ? "0" : m}
        @action=${(S) => this._handleItemAction(S, e)}
        .actionHandler=${Je({
      hasHold: Ie(e.hold_action),
      hasDoubleClick: Ie(e.double_tap_action),
      // Unbinds the gesture listeners outright, so keyboard activation
      // cannot reach an action that would do nothing.
      disabled: !P
    })}
        @pointerdown=${P && Qt(t) === "ripple" ? (S) => this._startInk(S) : m}
      >
        ${H}
        ${P && Qt(t) === "ripple" ? f`<span class="press-ink" aria-hidden="true"></span>` : m}
        ${a ? f`<span
              class="label ${H === m ? "inflow" : ""} label-${tr(e)}"
              style="font-size:${j(Fa(e.labelSize), n)};${h ? `color:${h};` : ""}"
              >${a}</span
            >` : m}
      </div>
    `;
  }
  _renderAreaLabel(e, t, i, n) {
    if (!e.name || (e.showName ?? !0) === !1) return m;
    const r = pr(e.points), o = it(r.x, r.y, t.width, t.height, i), a = He(t.width, t.height, i), s = Pu(e.labelSize, n);
    return f`
      <div
        class="area-label"
        style="left:${o.x / a.w * 100}%; top:${o.y / a.h * 100}%;${s}"
      >
        ${e.name}
      </div>
    `;
  }
  _renderText(e, t, i, n) {
    const r = it(e.x, e.y, t.width, t.height, i), o = He(t.width, t.height, i);
    return f`
      <div
        class="text fp-text"
        data-id=${se(e.id) ?? m}
        style="left:${r.x / o.w * 100}%; top:${r.y / o.h * 100}%;
               font-size:${j(D(e.size, Ot), n)};
               color:${le(e.color, da)};
               transform:translate(-50%,-50%) scale(var(--fp-inv-zoom,1)) rotate(${D(e.angle, 0)}deg);"
      >
        ${Yn(this.hass, e)}
      </div>
    `;
  }
  render() {
    if (!this._config) return f`${m}`;
    const e = this._config, t = this._replayController.getRenderState(), i = Sl(this.hass, this._watchedEntities, this._replayController.historyService(), t.enabled, t.currentTime), n = je(e), r = n.find((u) => u.id === this._activeFloorId) ?? n.find((u) => u.id === e.defaultFloor) ?? n[0], o = bf(e, this._portrait), a = He(D(e.width, rt), D(e.height, Ht), o), s = _f(e.width, e.height, o), l = ir(e.overlayScale), c = e.sunDimming ? wf(
      i?.states["sun.sun"]?.attributes?.elevation,
      D(e.sunBrightnessMin, jn),
      D(e.sunBrightnessMax, ci)
    ) : ci, h = e.showDeadSpaces ? xa(r.walls, r.openings) : [], p = e.sunDimming || r.items.some((u) => u.glow) ? Jn(
      r.walls,
      r.openings,
      (u) => (
        // Both leaves, and the travel each style actually has (issue #145):
        // asking `entity` alone left a door whose *second* panel was open
        // still blocking light outright. Glass admits it whole regardless
        // of sash — a closed window is not a hole, but light still gets
        // through it. A shutter rolled down overrides that, same as it
        // does for sunlight.
        Ta(
          u,
          this._openingAmount(u, i),
          this._openingSecond(u, i)?.amount,
          u.shutterEntity ? Oe(i?.states[u.shutterEntity], u.shutterInvert) : void 0,
          this._openingMore(u, i)?.map(($) => $.amount)
        )
      )
    ) : r.walls, g = `${this._glowIdBase}-sundim`, y = e.sunDimming ? Au(
      r.items,
      i?.states,
      e.width,
      e.height,
      g,
      p
    ) : m, b = r.areas?.find((u) => u.id === this._zoomedAreaId), v = b ? Df(
      b.points,
      e.width,
      e.height,
      o,
      void 0,
      void 0,
      // A room may say how close to go; without one the fit decides,
      // exactly as it always has (issue #222).
      Hf(b)
    ) : xn, x = e.compactHeader === !0, A = x && !!e.title;
    return f`
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
        .header=${x ? m : e.title ?? m}
        style=${gs(e.palette) || m}
      >
        <div class="card-shell ${this._replayController.isHistoryVisible() ? "replay-visible" : ""}">
          ${this._config.historyReplay?.enabled ? this._renderReplayPanel() : m}
          <div
            class="stage press-${Qt(e)} offline-${ja(e)} ${A ? "compact-title" : ""}"
            style="aspect-ratio: ${a.w} / ${a.h};"
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
            style="aspect-ratio: ${a.w} / ${a.h};
                   width: min(100%, calc(100cqh * ${a.w} / ${a.h}));
                   --fp-plan-w: ${a.w};
                   background:${le(e.background, Oi)};"
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
          ${sa(
      `${e.skin ?? ""}|${ys(e.palette)}`,
      _`<svg viewBox="0 0 ${a.w} ${a.h}" preserveAspectRatio="none">
            <g transform=${s || m}>
            ${r.image ? _`<image href=${r.image} x="0" y="0" width=${e.width} height=${e.height}
                          preserveAspectRatio=${as(r.imageFit)}
                          opacity=${r.imageOpacity ?? 1} />` : m}
            ${r.areas?.map((u) => {
        const $ = df(u);
        return _`<g class="area-tap-target"
                    role=${$ ? "button" : m}
                    tabindex=${$ ? "0" : m}
                    @action=${(k) => this._onAreaAction(k, u)}
                    .actionHandler=${Je({
          // Only wait out the timers when a gesture can resolve:
          // otherwise every tap on an ordinary room would sit for
          // 500ms before zooming.
          hasHold: Ie(ti(u, "hold")?.config),
          hasDoubleClick: Ie(ti(u, "double_tap")?.config)
        })}>
                  ${ds(u, ao(u, u.entity ? i?.states[u.entity]?.state : void 0))}
                </g>`;
      })}
            <!-- Dead spaces (issue #88): the regions the walls seal off that no
                 door or window reaches, hatched. Above the room fills, so a
                 region someone has also drawn an area over still reads as
                 unreachable; below everything else, because it describes the
                 floor rather than anything standing on it. -->
            ${h.length ? _`${ls(`${this._wallMaskId}-dead`)}
                    ${h.map(
        (u) => cs(u, `${this._wallMaskId}-dead`)
      )}` : m}
            <!-- Light pools (issue #6). Above the room fills but below the
                 furniture and walls, so light reads as cast onto the floor
                 rather than painted over the plan. Isolated as one layer: the
                 pools screen-blend with each other (two lamps brighten where
                 they meet) without screening against the plan beneath, which
                 would wash out on a light theme. -->
            ${Ma(
        r.furniture,
        e.width,
        e.height,
        `${this._glowIdBase}-mask`,
        mn(e.symbols)
      )}
            <g class="fp-glows"
               mask=${r.furniture.length ? `url(#${this._glowIdBase}-mask)` : m}>
              ${r.items.map((u, $) => {
        if (!u.glow) return m;
        const k = Zn(u, i?.states[u.entity]);
        return k ? Ia(u, k, `${this._glowIdBase}-${$}`, p) : m;
      })}
            </g>
            ${r.furniture.map((u) => {
        const $ = $n(
          u,
          $u(u, u.entity ? i?.states[u.entity]?.state : void 0),
          mn(e.symbols)
        ), k = Vu(u, n, r.id);
        if (!k) return $;
        const O = n.find((T) => T.id === k)?.name;
        return _`<g class="fp-furniture-link" role="button" tabindex="0"
                    @action=${() => this._goToFloor(n, k)}
                    .actionHandler=${Je({
          // A staircase has one gesture. Saying so keeps a tap from
          // sitting out the hold and double-tap timers before it
          // does anything.
          hasHold: !1,
          hasDoubleClick: !1
        })}>
                  <!-- An SVG tooltip is a <title> child, not a title=
                       attribute: the attribute does nothing here. -->
                  <title>${O ? `Go to ${O}` : "Go to the next floor"}</title>
                  ${$}
                </g>`;
      })}
            <!-- Sunlight through the openings. Under the walls on purpose:
                 light lands on the floor, and the walls stay crisp lines over
                 it rather than being tinted by the patches they let in. The
                 sun dimming further down is the whole-sky reading and still
                 has the last word — at night there is nothing to let in. -->
            ${e.sunlight ? zf(
        r.walls,
        r.openings,
        e.width,
        e.height,
        `${this._wallMaskId}-sun`,
        {
          // Both halves of the sun come from the same entity while
          // the plan follows it: the azimuth says where the light
          // comes from, the elevation whether there is any at all.
          // A plan that pins its own angle keeps its light on —
          // see sunlightStrengthOf.
          dir: Ff(
            e,
            i?.states["sun.sun"]?.attributes?.azimuth
          ),
          strength: Sf(
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
          reach: D(e.sunReach, bi) * (Bi(e) ? 1 : Of(i?.states["sun.sun"]?.attributes?.elevation)),
          // The gap each style actually clears, both leaves
          // included — the same reading the lamps get above, and
          // for the same reason (#145): `entity` alone leaves a
          // door whose *second* panel is open reading as shut,
          // and a converging pair reading as twice as clear as it
          // draws. Glazing and shutters are applied on top of
          // this, inside openingSunFraction.
          openAmount: (u) => Aa(
            u,
            this._openingAmount(u, i),
            this._openingSecond(u, i)?.amount,
            this._openingMore(u, i)?.map(($) => $.amount)
          ),
          // A shutter that is all the way down stops the light, as
          // one does. Undefined where none is bound, so an opening
          // without a shutter is judged on itself alone.
          shutterOpen: (u) => u.shutterEntity ? Oe(i?.states[u.shutterEntity], u.shutterInvert) : void 0,
          light: e.sunlightColor ?? _n,
          shade: e.sunShade === !1 ? null : e.sunShadeColor ?? wn
        }
      ) : m}
            ${ss(r.openings, e.width, e.height, this._wallMaskId)}
            ${r.walls.map(
        (u) => _`
                <g class="fp-wall-neon"><line x1=${u.x1} y1=${u.y1} x2=${u.x2} y2=${u.y2}
                      class="wall fp-wall" data-id=${se(u.id) ?? m}
                      mask=${`url(#${this._wallMaskId})`}
                      style=${Ra(u.thickness)} stroke-linecap="round" /></g>`
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
              ${r.areas?.map(
        (u, $) => hs(
          u,
          ao(u, u.entity ? i?.states[u.entity]?.state : void 0),
          `${this._wallMaskId}-area-${$}`
        )
      )}
            </g>
            ${ke(
        // Keyed by id: switching floors must create fresh DOM nodes.
        // Unkeyed, Lit morphs floor A's openings into floor B's, and the
        // 0.5s leaf/panel transitions animate the leftover state — a
        // window briefly plays a door swing (issue #50).
        r.openings,
        (u, $) => u.id || $,
        (u) => {
          const $ = this._openingAmount(u, i), k = u.shutterEntity ? i?.states[u.shutterEntity] : void 0, O = ns(u, {
            color: Hn,
            // The closed tone (issue #228). Absent, the moving parts stay
            // the wall colour, which is what a closed opening always was —
            // and that is also what an opening whose contact has dropped
            // out falls back to, so a dead sensor does not draw the same
            // emphatic "shut" as a door that really is (issue #162).
            // Guarded on `hass` for the same reason the device path is:
            // before the first states arrive every opening would read as
            // offline and the closed colour would flash off on load.
            inactive: this.hass && yn(u, u.entity ? i?.states[u.entity]?.state : void 0) ? void 0 : u.inactiveColor,
            open: $ > 0,
            amount: $,
            active: this._openingActive(u, i),
            accent: u.activeColor ?? W,
            // Per-leaf state for a two-sensor biparting slider (issue #145).
            second: this._openingSecond(u, i),
            more: this._openingMore(u, i),
            // External roller shutter layer (issue #74). No entity bound
            // yet → previewed shut, like a static plan.
            shutter: u.shutterEntity ? {
              amount: Oe(k, u.shutterInvert),
              active: ei(k, u.shutterInvert),
              style: ot(u),
              // The shutter's own accent, falling back to the
              // opening's and then to the skin's.
              accent: u.shutterActiveColor ?? u.activeColor ?? W,
              flip: u.shutterFlipV,
              // Per-panel state for a two-contact hinged shutter
              // (issue #159).
              second: this._shutterSecond(u, i)
            } : void 0
          });
          if (!hf(u, this._featuresOf)) return O;
          const T = u.length / 2, H = G + 4;
          return _`<g class="fp-opening" role="button" tabindex="0"
                    @action=${(V) => this._onOpeningAction(V, u)}
                    .actionHandler=${Je({
            // Only wait out the hold/double-tap timers when a gesture
            // actually resolves: otherwise every tap on a plain
            // contact sensor would sit for 500ms before answering.
            hasHold: Ie(this._openingPress(u, "hold")?.config),
            hasDoubleClick: Ie(this._openingPress(u, "double_tap")?.config)
          })}>
                  ${O}
                  <rect class="fp-opening-hit" x=${u.x - T} y=${u.y - H / 2}
                        width=${u.length} height=${H}
                        transform="rotate(${u.angle} ${u.x} ${u.y})" />
                </g>`;
        }
      )}
            ${ke(
        r.trackers ?? [],
        (u, $) => u.id || $,
        (u) => ps(u, {
          editing: !1,
          xReading: _i(i?.states, u.xSensor?.entity),
          yReading: _i(i?.states, u.ySensor?.entity),
          xPresent: pi(i?.states, u.xSensor?.presence),
          yPresent: pi(i?.states, u.ySensor?.presence)
        })
      )}
            <!-- Sun dimming (issue #113). Last inside the rotated group, so it
                 covers the whole plan; the device overlay below is HTML and
                 stays at full brightness, keeping icons and state readable at
                 night. pointer-events:none is not optional — this rect spans
                 the canvas, and without it every tappable opening underneath
                 stops responding (the lesson from #108). -->
            ${e.sunDimming ? _`${y}<rect class="fp-sun-dim"
                            x=${-G} y=${-G}
                            width=${e.width + G * 2}
                            height=${e.height + G * 2}
                            fill="#000"
                            mask=${y === m ? m : `url(#${g})`}
                            opacity=${1 - c} />` : m}
            </g>
          </svg>`
    )}
          <div
            class="items"
            style="--fp-inv-zoom:${Uf(v.scale, e.zoomedOverlayScale)};"
          >
            ${r.areas?.map((u) => this._renderAreaLabel(u, e, o, l))}
            ${r.texts.map((u) => this._renderText(u, e, o, l))}
            ${ke(
      // Keyed like the openings above: a floor switch must build fresh
      // nodes rather than morph one floor's badges into another's.
      r.openings.filter((u) => Za(u)),
      (u, $) => `${u.id || $}-shutter`,
      (u) => this._renderShutterMark(u, e, o, l, i)
    )}
            ${ke(
      r.openings.filter((u) => Ja(u)),
      (u, $) => `${u.id || $}-opening`,
      (u) => this._renderOpeningMark(u, e, o, l, i)
    )}
            ${ke(
      // No entity filter: devices that exist physically but have no HA
      // entity still deserve their badge (issue #39). Keyed by id so a
      // floor switch builds fresh DOM (see the openings comment).
      // "Only when active" devices drop out here (issue #55), and so do
      // the ones that only show inside their own room (#222) — the
      // editor still draws them, dimmed, so they stay editable.
      r.items.filter(
        (u) => !Oa(
          u,
          u.entity ? i?.states[u.entity]?.state : void 0
        ) && !Tu(u, b)
      ),
      (u, $) => u.id || $,
      (u) => this._renderItem(u, e, o, l, i)
    )}
          </div>
          </div>
          ${v.scale > 1 ? f`<button
                class="zoom-out"
                title="Zoom out"
                aria-label="Zoom out"
                @click=${() => this._zoomedAreaId = void 0}
              >
                <ha-icon icon="mdi:magnify-minus-outline"></ha-icon>
              </button>` : m}
          ${A ? f`<div class="plan-title">${e.title}</div>` : m}
          ${n.length > 1 ? this._renderFloorSwitcher(n, r, x) : m}
        </div>
        </div>
      </ha-card>
    `;
  }
  _renderReplayPanel() {
    return im(tm(this._replayController));
  }
  _renderFloorSwitcher(e, t, i = !1) {
    return f`
      <div class="floor-switcher ${i ? "row" : ""}">
        ${e.map((n) => {
      const r = n.id === t.id ? B(n.color) : void 0;
      return f`
            <button
              class=${n.id === t.id ? "active" : ""}
              title=${n.name}
              style=${r ? `background:${r};border-color:${r};` : m}
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
pe._nextWallMaskId = 0;
pe._nextGlowId = 0;
pe.styles = [
  ha,
  Dl,
  me`
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
      width: ${hi}px;
      height: ${hi}px;
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
       replace it — restating scale(${jr}) alone would drop the
       counter-scale along with the translate, and a badge held down at 4x
       zoom would balloon to roughly 4x its resting size instead of shrinking. */
    .press-scale .item.interactive {
      transition: transform ${qr}ms cubic-bezier(0.2, 0.8, 0.3, 1);
    }
    .press-scale .item.interactive:active {
      transform: translate(-50%, -50%) scale(calc(var(--fp-inv-zoom, 1) * ${jr}));
      transition-duration: ${Wr}ms;
    }

    /* Flash: drop-shadow rather than a box-shadow or a background, so the halo
       follows whatever the device actually draws — the badge's circle, a bare
       ripple ring, the label — instead of a rectangle around it. */
    .press-flash .item.interactive {
      transition: filter ${qr}ms ease-out;
    }
    .press-flash .item.interactive:active {
      filter: drop-shadow(0 0 5px var(--fp-skin-accent, var(--primary-color, #03a9f4)));
      transition-duration: ${Wr}ms;
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
      font-size: ${Wn}px;
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
  C({ attribute: !1 })
], pe.prototype, "hass", 2);
vt([
  M()
], pe.prototype, "_config", 2);
vt([
  M()
], pe.prototype, "_activeFloorId", 2);
vt([
  M()
], pe.prototype, "_zoomedAreaId", 2);
vt([
  M()
], pe.prototype, "_portrait", 2);
pe = vt([
  Ai("fp-ef-card")
], pe);
const nt = 26, fm = 0.75;
function mm(e, t, i, n = fm) {
  const r = e.find((s) => s.id === t);
  if (!r) return;
  const o = [];
  i !== 2 && o.push({ x: r.x1, y: r.y1, which: 1 }), i !== 1 && o.push({ x: r.x2, y: r.y2, which: 2 });
  const a = [];
  for (const s of e)
    if (s.id !== r.id)
      for (const l of [1, 2]) {
        const c = l === 1 ? s.x1 : s.x2, h = l === 1 ? s.y1 : s.y2, d = o.find((p) => Math.hypot(c - p.x, h - p.y) <= n);
        d && a.push({ id: s.id, end: l, which: d.which, x0: c, y0: h });
      }
  return a.length ? a : void 0;
}
function vs(e, t, i, n) {
  let r = null, o = n;
  for (const a of e) {
    const s = Math.hypot(t - a.x, i - a.y);
    s < o && (o = s, r = { x: a.x, y: a.y });
  }
  return r;
}
function _s(e, t, i, n) {
  const r = e.flatMap((o) => [
    { x: o.x1, y: o.y1 },
    { x: o.x2, y: o.y2 }
  ]);
  return vs(r, t, i, n);
}
function gm(e, t, i, n, r) {
  const o = e.walls.flatMap((s) => [
    { x: s.x1, y: s.y1 },
    { x: s.x2, y: s.y2 }
  ]), a = (e.areas ?? []).flatMap(
    (s) => s.points.filter((l, c) => !(r && r.areaId === s.id && r.vertexIndex === c)).map((l) => ({ x: l.x, y: l.y }))
  );
  return vs([...o, ...a], t, i, n);
}
function ko(e, t, i) {
  const n = e.areas ?? [];
  for (let r = n.length - 1; r >= 0; r--)
    if (ji(n[r].points, t, i)) return n[r];
}
function ym(e, t) {
  if (t <= 0) return [];
  const i = pr(e);
  if (t === 1) return [i];
  const n = e.map((d) => d.x), r = e.map((d) => d.y), o = Math.min(...n), a = Math.max(...n), s = Math.min(...r), l = Math.max(...r), c = Math.max(a - o, 1), h = Math.max(l - s, 1);
  for (let d = 1; d <= 8; d++) {
    const p = t * d, g = Math.max(1, Math.round(Math.sqrt(p * c / h))), y = Math.max(1, Math.ceil(p / g)), b = c / (g + 1), v = h / (y + 1), x = [];
    for (let A = 1; A <= y; A++)
      for (let u = 1; u <= g; u++) {
        const $ = o + u * b, k = s + A * v;
        ji(e, $, k) && x.push({ x: $, y: k });
      }
    if (x.length >= t)
      return Array.from(
        { length: t },
        (A, u) => x[Math.floor(u * x.length / t)]
      );
  }
  return Array.from({ length: t }, (d, p) => {
    const g = p / t * Math.PI * 2, y = Math.min(c, h) * 0.15 * (1 + Math.floor(p / 6));
    return { x: i.x + Math.cos(g) * y, y: i.y + Math.sin(g) * y };
  });
}
function bm(e, t, i, n, r, o, a, s, l = nt) {
  if (a) return { x: o(n), y: o(r) };
  const c = _s(e, n, r, l);
  if (c) return c;
  const h = n - t, d = r - i, p = Math.tan(s * Math.PI / 180);
  return Math.abs(d) <= Math.abs(h) * p ? { x: o(n), y: i } : Math.abs(h) <= Math.abs(d) * p ? { x: t, y: o(r) } : { x: o(n), y: o(r) };
}
function vm(e, t) {
  const i = Math.min(t.x0, t.x1), n = Math.max(t.x0, t.x1), r = Math.min(t.y0, t.y1), o = Math.max(t.y0, t.y1), a = (l, c) => l >= i && l <= n && c >= r && c <= o, s = [];
  for (const l of e.walls)
    a((l.x1 + l.x2) / 2, (l.y1 + l.y2) / 2) && s.push({ kind: "wall", id: l.id });
  for (const l of e.openings) a(l.x, l.y) && s.push({ kind: "opening", id: l.id });
  for (const l of e.items) a(l.x, l.y) && s.push({ kind: "item", id: l.id });
  for (const l of e.texts) a(l.x, l.y) && s.push({ kind: "text", id: l.id });
  for (const l of e.furniture) a(l.x, l.y) && s.push({ kind: "furniture", id: l.id });
  for (const l of e.trackers ?? [])
    a(l.x + l.w / 2, l.y + l.h / 2) && s.push({ kind: "tracker", id: l.id });
  for (const l of e.areas ?? []) {
    const c = pr(l.points);
    a(c.x, c.y) && s.push({ kind: "area", id: l.id });
  }
  return s;
}
function _m(e, t, i, n) {
  return {
    walls: e.walls.map((r) => {
      const o = n.get(`wall:${r.id}`);
      return o && o.kind === "wall" ? { ...r, x1: o.x1 + t, y1: o.y1 + i, x2: o.x2 + t, y2: o.y2 + i } : r;
    }),
    openings: e.openings.map((r) => {
      const o = n.get(`opening:${r.id}`);
      return o && o.kind === "pt" ? { ...r, x: o.x + t, y: o.y + i } : r;
    }),
    items: e.items.map((r) => {
      const o = n.get(`item:${r.id}`);
      return o && o.kind === "pt" ? { ...r, x: o.x + t, y: o.y + i } : r;
    }),
    texts: e.texts.map((r) => {
      const o = n.get(`text:${r.id}`);
      return o && o.kind === "pt" ? { ...r, x: o.x + t, y: o.y + i } : r;
    }),
    furniture: e.furniture.map((r) => {
      const o = n.get(`furniture:${r.id}`);
      return o && o.kind === "pt" ? { ...r, x: o.x + t, y: o.y + i } : r;
    }),
    trackers: (e.trackers ?? []).map((r) => {
      const o = n.get(`tracker:${r.id}`);
      return o && o.kind === "pt" ? { ...r, x: o.x + t, y: o.y + i } : r;
    }),
    areas: (e.areas ?? []).map((r) => {
      const o = n.get(`area:${r.id}`);
      return o && o.kind === "polygon" ? { ...r, points: o.points.map((a) => ({ x: a.x + t, y: a.y + i })) } : r;
    })
  };
}
const wm = [
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
], Et = {
  wall: 11,
  /** Padding around an item badge / text box so small glyphs stay grabbable. */
  pad: 4
};
function Yt(e, t, i, n, r) {
  const o = -(r || 0) * Math.PI / 180, a = e - i, s = t - n;
  return { x: a * Math.cos(o) - s * Math.sin(o), y: a * Math.sin(o) + s * Math.cos(o) };
}
function xm(e, t, i) {
  const n = i.x2 - i.x1, r = i.y2 - i.y1, o = n * n + r * r;
  if (o === 0) return Math.hypot(e - i.x1, t - i.y1);
  let a = ((e - i.x1) * n + (t - i.y1) * r) / o;
  return a = Math.max(0, Math.min(1, a)), Math.hypot(e - (i.x1 + a * n), t - (i.y1 + a * r));
}
function $m(e, t, i, n) {
  const r = [], o = (a, s, l, c) => r.push({ sel: { kind: a, id: s }, rank: wm.indexOf(a), order: l, locked: !!c });
  return e.items.forEach((a, s) => {
    const l = (a.size ?? n.itemSize) / 2 + Et.pad;
    Math.abs(t - a.x) <= l && Math.abs(i - a.y) <= l && o("item", a.id, s, a.locked);
  }), e.texts.forEach((a, s) => {
    const l = a.size ?? n.textSize, c = l * 0.6 * Math.max(1, Yn(n.hass, a).length) / 2 + Et.pad, h = l / 2 + Et.pad, d = Yt(t, i, a.x, a.y, a.angle ?? 0);
    Math.abs(d.x) <= c && Math.abs(d.y) <= h && o("text", a.id, s, a.locked);
  }), e.openings.forEach((a, s) => {
    const l = Yt(t, i, a.x, a.y, a.angle ?? 0);
    Math.abs(l.x) <= a.length / 2 && Math.abs(l.y) <= n.wallThickness / 2 + Et.pad && o("opening", a.id, s, a.locked);
  }), e.furniture.forEach((a, s) => {
    const l = Yt(t, i, a.x, a.y, a.angle ?? 0);
    Math.abs(l.x) <= a.w / 2 && Math.abs(l.y) <= a.h / 2 && o("furniture", a.id, s, a.locked);
  }), e.walls.forEach((a, s) => {
    xm(t, i, a) <= Et.wall && o("wall", a.id, s, a.locked);
  }), (e.trackers ?? []).forEach((a, s) => {
    const l = Yt(t, i, a.x + a.w / 2, a.y + a.h / 2, a.angle ?? 0);
    Math.abs(l.x) <= a.w / 2 && Math.abs(l.y) <= a.h / 2 && o("tracker", a.id, s, a.locked);
  }), (e.areas ?? []).forEach((a, s) => {
    ji(a.points, t, i) && o("area", a.id, s, a.locked);
  }), r.sort((a, s) => Number(a.locked) - Number(s.locked) || a.rank - s.rank || s.order - a.order).map((a) => a.sel);
}
function ws(e, t) {
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
function At(e, t) {
  return !!ws(e, t)?.locked;
}
function km(e, t) {
  return t.filter((i) => {
    const n = ws(e, i);
    return !!n && !n.locked;
  });
}
function Sm(e, t, i) {
  if (!e.length) return null;
  if (!i || t.length !== 1) return e[0];
  const n = e.findIndex((r) => r.kind === t[0].kind && r.id === t[0].id);
  return n < 0 ? e[0] : e[(n + 1) % e.length];
}
const Em = {
  request: (e) => requestAnimationFrame(e),
  cancel: (e) => cancelAnimationFrame(e)
};
class Am {
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
const So = "Apply needs Home Assistant's card editor — use Save instead.", Tm = "Save this card once first — it isn't on the dashboard yet.", Cm = 200;
function Im(e) {
  let t = e;
  for (let i = 0; t && i < Cm; i++) {
    const n = t;
    if (typeof n._params?.saveCardConfig == "function") return n;
    t = t.parentNode ?? t.host ?? null;
  }
  return null;
}
async function Mm(e) {
  const t = Im(e);
  if (!t) return { ok: !1, error: So };
  if (t._params?.isNew) return { ok: !1, error: Tm };
  const i = t._cardConfig;
  if (!i || typeof i != "object")
    return { ok: !1, error: So };
  try {
    await t._params.saveCardConfig(i);
  } catch (n) {
    return { ok: !1, error: `Could not save — ${n instanceof Error ? n.message : String(n)}` };
  }
  return typeof t._markDirtyStateClean == "function" ? t._markDirtyStateClean() : typeof t._dirty == "boolean" && (t._dirty = !1), { ok: !0 };
}
const we = (e) => e.split(".")[0], Om = /* @__PURE__ */ new Set([
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
]), Lm = /* @__PURE__ */ new Set(["scene", "script", "button", "input_button"]);
function Sn(e) {
  const t = we(e);
  return t === "scene" ? "scene" : t === "script" ? "script" : "device";
}
function Pm(e) {
  return Om.has(we(e));
}
function Fm(e) {
  return Lm.has(we(e));
}
function Eo(e) {
  if (!e) return !1;
  const t = e.state;
  if (t === "unavailable" || t === "unknown") return !1;
  switch (we(e.entity_id)) {
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
function Ao(e) {
  return !e || e.state === "unavailable";
}
function En(e, t) {
  return e.states[t]?.attributes.friendly_name ?? t;
}
function Nm(e, t) {
  if (!t) return "nicht gefunden";
  if (e.formatEntityState)
    try {
      return e.formatEntityState(t);
    } catch {
    }
  const i = t.attributes.unit_of_measurement;
  return i ? `${t.state} ${i}` : t.state;
}
const Rm = {
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
function Wt(e, t, i) {
  if (i) return i;
  const n = e.states[t]?.attributes.icon;
  return n || (Rm[we(t)] ?? "mdi:help-circle-outline");
}
async function zm(e, t) {
  const i = we(t), n = e.states[t];
  i === "lock" ? await e.callService("lock", n?.state === "locked" ? "unlock" : "lock", { entity_id: t }) : i === "cover" ? await e.callService("cover", "toggle", { entity_id: t }) : await e.callService("homeassistant", "toggle", { entity_id: t });
}
async function To(e, t) {
  const i = we(t);
  i === "scene" ? await e.callService("scene", "turn_on", { entity_id: t }) : i === "script" ? await e.callService("script", "turn_on", { entity_id: t }) : (i === "button" || i === "input_button") && await e.callService(i, "press", { entity_id: t });
}
function Co(e, t) {
  e.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: t }, bubbles: !0, composed: !0 }));
}
var Dm = Object.defineProperty, Hm = Object.getOwnPropertyDescriptor, ge = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Hm(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (r = (n ? a(t, i, r) : a(r)) || r);
  return n && r && Dm(t, i, r), r;
};
const Um = 60;
let ce = class extends ae {
  constructor() {
    super(...arguments), this.value = "", this.domains = [], this.exclude = [], this.placeholder = "Entität suchen …", this.clearOnSelect = !1, this._open = !1, this._filter = "", this._highlight = 0;
  }
  _results() {
    const e = this._filter.trim().toLowerCase(), t = new Set(this.exclude), i = [];
    for (const n of Object.keys(this.hass.states).sort()) {
      if (t.has(n) || this.domains.length && !this.domains.includes(we(n))) continue;
      const r = this.hass.states[n].attributes.friendly_name ?? n;
      if (!(e && !n.toLowerCase().includes(e) && !r.toLowerCase().includes(e)) && (i.push({ id: n, name: r }), i.length >= Um))
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
    return f`
      <div class="field">
        ${this.value && !this.clearOnSelect ? f`<ha-icon class="lead" .icon=${Wt(this.hass, this.value)}></ha-icon>` : f`<ha-icon class="lead" icon="mdi:magnify"></ha-icon>`}
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
        ${this.value && !this.clearOnSelect ? f`<button class="clear" title="Entfernen" @mousedown=${(n) => n.preventDefault()} @click=${() => this._select("")}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>` : m}
      </div>
      ${this.value && !this.clearOnSelect ? f`<div class="id">${this.value}</div>` : m}
      ${this._open ? f`<div class="list">
            ${e.length === 0 ? f`<div class="none">Keine Treffer</div>` : e.map(
      (n, r) => f`<div
                    class="opt ${r === this._highlight ? "hl" : ""}"
                    @mousedown=${(o) => {
        o.preventDefault(), this._select(n.id);
      }}
                  >
                    <ha-icon .icon=${Wt(this.hass, n.id)}></ha-icon>
                    <span class="txt"><span>${n.name}</span><small>${n.id}</small></span>
                  </div>`
    )}
          </div>` : m}
    `;
  }
};
ce.styles = me`
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
ge([
  C({ attribute: !1 })
], ce.prototype, "hass", 2);
ge([
  C()
], ce.prototype, "value", 2);
ge([
  C({ attribute: !1 })
], ce.prototype, "domains", 2);
ge([
  C({ attribute: !1 })
], ce.prototype, "exclude", 2);
ge([
  C()
], ce.prototype, "placeholder", 2);
ge([
  C({ type: Boolean })
], ce.prototype, "clearOnSelect", 2);
ge([
  M()
], ce.prototype, "_open", 2);
ge([
  M()
], ce.prototype, "_filter", 2);
ge([
  M()
], ce.prototype, "_highlight", 2);
ge([
  Ti("input")
], ce.prototype, "_input", 2);
ce = ge([
  gt("fp-entity-picker")
], ce);
function Io(e) {
  if (e.length !== 4) return;
  const t = [...new Set(e.map((n) => n.x))], i = [...new Set(e.map((n) => n.y))];
  if (!(t.length !== 2 || i.length !== 2))
    return { x: Math.min(...t), y: Math.min(...i), w: Math.abs(t[0] - t[1]), h: Math.abs(i[0] - i[1]) };
}
const Bm = [
  ["room", "Zimmer"],
  ["balcony", "Balkon"],
  ["hallway", "Flur"],
  ["staircase", "Treppenhaus"],
  ["bathroom", "Bad"],
  ["custom", "Eigene Bezeichnung"]
];
var jm = Object.defineProperty, Wm = Object.getOwnPropertyDescriptor, ur = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Wm(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (r = (n ? a(t, i, r) : a(r)) || r);
  return n && r && jm(t, i, r), r;
};
let qt = class extends ae {
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
    const i = this._list.map((r) => ({ ...r })), [n] = i.splice(e, 1);
    i.splice(e + t, 0, n), this._setSidebar(i);
  }
  _rename(e, t) {
    const i = this._list.map((n) => ({ ...n }));
    t ? i[e].name = t : delete i[e].name, this._setSidebar(i);
  }
  _resize(e, t) {
    const i = this.area.points, n = i && Io(i);
    !i || !n || !(e >= 1) || !(t >= 1) || this._patch({
      points: i.map((r) => ({ x: r.x === n.x ? n.x : n.x + e, y: r.y === n.y ? n.y : n.y + t }))
    });
  }
  render() {
    const e = this.area, t = e.points && Io(e.points), i = this._list;
    return f`
      <label class="field">
        <span>Type</span>
        <select @change=${(n) => this._patch({ type: n.target.value })}>
          ${Bm.map(([n, r]) => f`<option value=${n} ?selected=${(e.type ?? "room") === n}>${r}</option>`)}
        </select>
      </label>
      ${e.type === "custom" ? f`<label class="field">
            <span>Label</span>
            <input
              type="text"
              .value=${e.typeLabel ?? ""}
              @change=${(n) => this._patch({ typeLabel: n.target.value.trim() || void 0 })}
            />
          </label>` : m}
      ${t ? f`<div class="dims">
            <label class="field"><span>Width</span>
              <input type="number" min="1" .value=${String(Math.round(t.w))}
                @change=${(n) => this._resize(Number(n.target.value), t.h)} /></label>
            <label class="field"><span>Height</span>
              <input type="number" min="1" .value=${String(Math.round(t.h))}
                @change=${(n) => this._resize(t.w, Number(n.target.value))} /></label>
          </div>` : m}
      <h4>Sidebar</h4>
      <p class="muted">Only what is listed here appears when the room is tapped: devices, scenes and scripts.</p>
      ${i.map(
      (n, r) => f`<div class="row">
          <ha-icon .icon=${Wt(this.hass, n.entity, n.icon)}></ha-icon>
          <div class="main">
            <input
              type="text"
              .value=${n.name ?? ""}
              placeholder=${En(this.hass, n.entity)}
              @change=${(o) => this._rename(r, o.target.value.trim())}
            />
            <small>${n.entity} · ${{ device: "device", scene: "scene", script: "script" }[Sn(n.entity)]}${this.hass.states[n.entity] ? "" : " · not found"}</small>
          </div>
          <button title="Up" ?disabled=${r === 0} @click=${() => this._move(r, -1)}><ha-icon icon="mdi:chevron-up"></ha-icon></button>
          <button title="Down" ?disabled=${r === i.length - 1} @click=${() => this._move(r, 1)}><ha-icon icon="mdi:chevron-down"></ha-icon></button>
          <button title="Remove" @click=${() => this._setSidebar(i.filter((o, a) => a !== r))}><ha-icon icon="mdi:close"></ha-icon></button>
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
qt.styles = me`
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
ur([
  C({ attribute: !1 })
], qt.prototype, "hass", 2);
ur([
  C({ attribute: !1 })
], qt.prototype, "area", 2);
qt = ur([
  gt("fp-ef-area-extras")
], qt);
function Mo(e) {
  return "text" in e.selector || "number" in e.selector;
}
function qm(e, t, i) {
  const n = {};
  for (const r of i)
    t[r.name] !== e[r.name] && (n[r.name] = t[r.name]);
  return n;
}
function Oo(e, t) {
  const i = {};
  for (const n of t) {
    if (!(n.name in e)) continue;
    let r = e[n.name];
    if ("text" in n.selector || "icon" in n.selector || "entity" in n.selector || "attribute" in n.selector)
      (r === "" || r == null) && (r = n.required ? "" : void 0);
    else if ("number" in n.selector) {
      const o = typeof r == "string" && r !== "" ? Number(r) : r;
      if (typeof o != "number" || !Number.isFinite(o)) {
        if (n.required) continue;
        r = void 0;
      } else {
        const a = n.selector.number;
        let s = n.name === "angle" ? (o % 360 + 360) % 360 : o;
        a.min !== void 0 && s < a.min && (s = a.min), a.max !== void 0 && s > a.max && (s = a.max), r = s;
      }
    } else "boolean" in n.selector && (r = !!r);
    i[n.name] = r;
  }
  return i;
}
const Ze = (e) => e, Zt = ["binary_sensor", "cover", "lock"];
function be(e, t) {
  return { fields: t.map((n) => e.fields.find((r) => r.name === n)).filter((n) => !!n), data: e.data, toPatch: e.toPatch };
}
const Kt = () => ({
  name: "angle",
  label: "Angle",
  selector: { number: { min: 0, max: 360, step: 1, mode: "slider", unit_of_measurement: "°" } }
}), w = (e, t) => ({ value: e, label: t }), U = (...e) => ({
  select: { mode: "dropdown", options: e }
});
function xs(e = Te) {
  return nu(e);
}
function Km(e, t = Te) {
  return Di(t, e)?.name ?? e;
}
function Gm(e, t = () => 0) {
  const i = Z(e), n = Ui(e), r = fi(e), o = [
    { name: "type", label: "Type", selector: U(w("door", "Door"), w("window", "Window")) },
    {
      name: "motion",
      label: "Motion",
      selector: U(
        w("swing", "Swing"),
        w("slide", "Slide"),
        // Not "garage / shutter": an external shutter is the Shutter field
        // below, a layer over any opening, and naming it here read as the
        // place to set one up.
        w("roll", "Roll up (garage)"),
        ...e.type === "window" ? [w("fixed", "Fixed (does not open)"), w("awning", "Top-hinged (awning)")] : []
      )
    },
    { name: "length", label: "Length", required: !0, selector: { number: { min: 1, mode: "box" } } }
  ];
  if (i === "swing") {
    const a = e.type === "door";
    o.push({
      name: "sash",
      label: a ? "Leaves" : "Sashes",
      helper: a ? "Double = two leaves meeting in the middle, hinged at each jamb. Three or four: equal leaves side by side" : "Single = one full-width sash (issue #73). Three or four: equal sashes side by side",
      selector: a ? U(
        w("single", "Single (one leaf)"),
        w("double", "Double (two leaves)"),
        w("triple", "Triple (three leaves)"),
        w("quad", "Quad (four leaves)")
      ) : U(
        w("double", "Double (two leaves)"),
        w("single", "Single sash"),
        w("triple", "Triple (three sashes)"),
        w("quad", "Quad (four sashes)")
      )
    });
  }
  if (i === "swing" && Pt(e) === "single" && o.push({
    name: "sashSpan",
    label: e.type === "door" ? "Leaf width" : "Sash width",
    helper: e.type === "door" ? "Share of the opening that actually swings — the rest is a fixed panel" : "Share of the opening that actually opens — the rest is fixed glass",
    selector: { number: { min: $a, max: 1, step: 0.05, mode: "slider" } }
  }), e.type === "door" && o.push({
    name: "glazed",
    label: "Glazed",
    helper: "Lets sunlight through even when shut — a patio or French door",
    selector: { boolean: {} }
  }), o.push({
    name: "sunlight",
    label: "Lets sunlight in",
    helper: "Off makes it wall to the sun — for a solid door the plan draws open",
    selector: { boolean: {} }
  }), i === "swing" && Pt(e) === "single" && o.push({
    name: "hinge",
    label: "Hinge",
    selector: U(w("left", "Left"), w("right", "Right"))
  }), i === "swing") {
    const a = Ae(e);
    for (let s = 0; a > 1 && s < a; s++)
      o.push({
        name: `leafHinge${s + 1}`,
        label: `Hinge leaf ${s + 1}`,
        selector: U(w("", "Default"), w("left", "Left"), w("right", "Right"))
      });
  }
  if (i === "swing" && o.push({
    name: "opens",
    label: "Opens",
    selector: U(w("this", "This side"), w("other", "Other side"))
  }), i === "slide" && (r || o.push({
    name: "slide",
    label: "Slide",
    selector: U(w("left", "To left"), w("right", "To right"))
  }), o.push({
    name: "style",
    label: "Style",
    selector: U(
      w("single", "Single"),
      w("bypass", "Bypass (stack)"),
      w("biparting", "Biparting (into the walls)"),
      w("biparting-bypass", "Biparting (over fixed panels)"),
      w("converging", "Converging (both panels stack in the middle)")
    )
  })), o.push({
    name: "entity",
    label: "Entity",
    // Says locks are usable, because nothing else would: a lock is neither a
    // contact nor a cover, and its states are `locked` / `unlocked` rather
    // than anything that looks like open/closed (issue #176).
    helper: r ? "Contact, cover or lock. Drives the first leaf; type and motion follow its device class" : "Contact, cover or lock — a lock reads unlocked as open. Type and motion follow its device class",
    selector: { entity: { filter: [{ domain: Zt }] } }
  }), r && e.entity && o.push({
    name: "secondaryEntity",
    label: "Second leaf",
    helper: "Its own sensor for the other leaf — leave empty to move both together",
    selector: { entity: { filter: [{ domain: Zt }] } }
  }), i === "swing" && e.entity) {
    const a = Ae(e);
    a >= 3 && o.push({
      name: "leaf3Entity",
      label: "Third leaf",
      helper: "Its own sensor — leave empty to follow the first leaf",
      selector: { entity: { filter: [{ domain: Zt }] } }
    }), a >= 4 && o.push({
      name: "leaf4Entity",
      label: "Fourth leaf",
      helper: "Its own sensor — leave empty to follow the first leaf",
      selector: { entity: { filter: [{ domain: Zt }] } }
    });
  }
  return o.push({
    name: "shutterEntity",
    label: "Shutter",
    helper: "External shutter over this opening — a cover, or a contact sensor",
    selector: { entity: { filter: [{ domain: ["cover", "binary_sensor"] }] } }
  }), e.shutterEntity && (o.push({
    name: "shutterStyle",
    label: "Shutter type",
    helper: "Hinged panels fold back against the wall; roll-up slats disappear upward",
    selector: U(w("swing", "Hinged (louvered panels)"), w("roll", "Roll-up (slats)"))
  }), ot(e) === "swing" && o.push({
    name: "shutterSide",
    label: "Shutter side",
    helper: "Which side of the wall the panels hang on",
    selector: U(w("far", "Away from the sash"), w("near", "Same side as the sash"))
  }), ot(e) === "swing" && o.push({
    name: "shutterSecondaryEntity",
    label: "Second shutter panel",
    helper: "Its own contact for the other panel — leave empty to fold both together",
    selector: { entity: { filter: [{ domain: ["binary_sensor", "cover"] }] } }
  }), o.push({
    name: "shutterInvert",
    label: "Invert shutter animation",
    selector: { boolean: {} }
  })), o.push({
    name: "invert",
    label: e.type === "door" ? "Invert door animation" : "Invert window animation",
    helper: e.entity ? void 0 : (
      // Only a swing door draws open with no sensor to ask
      // (openingDefaultOpen) — everything else, door or window, draws shut.
      e.type === "door" && Z(e) === "swing" ? "No sensor bound — draws shut instead of open" : "No sensor bound — draws open instead of shut"
    ),
    selector: { boolean: {} }
  }), o.push(Kt()), e.entity && (o.push({
    name: "showIcon",
    label: "Show icon",
    helper: Z(e) === "roll" ? "A raised roll-up leaves only a line — this puts its state beside it, and opens its dialog when tapped" : "Shows this opening's state beside it, and opens its dialog when tapped",
    selector: { boolean: {} }
  }), e.showIcon && o.push({
    name: "icon",
    label: "Icon",
    helper: "Overrides the entity's own icon, which changes with its state",
    selector: { icon: {} }
  })), e.entity && e.shutterEntity && (o.push({
    name: "showShutterIcon",
    label: "Shutter icon",
    helper: "Shows the shutter's state beside the opening, and opens it when tapped",
    selector: { boolean: {} }
  }), (e.showShutterIcon ?? !0) && o.push({
    name: "shutterIcon",
    label: "Icon",
    helper: "Overrides the shutter entity's own icon, which changes with its state",
    selector: { icon: {} }
  }), o.push({
    name: "tapTarget",
    label: "Tap opens",
    helper: "The other one moves to press-and-hold. Opens the dialog; use Tap action below to move the shutter itself",
    selector: U(
      w("opening", e.type === "door" ? "The door" : "The window"),
      w("shutter", "The shutter")
    )
  })), (e.entity || e.shutterEntity) && o.push(
    {
      name: "tap_action",
      label: "Tap action",
      selector: {
        ui_action: {
          default_action: sr(e, "tap", t)?.config.action ?? "none"
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
    fields: o,
    data: {
      type: e.type,
      motion: i,
      length: e.length,
      hinge: e.flipH ? "right" : "left",
      opens: e.flipV ? "other" : "this",
      slide: e.flipH ? "right" : "left",
      style: n,
      sash: Pt(e),
      entity: e.entity ?? "",
      secondaryEntity: e.secondaryEntity ?? "",
      leafHinge1: e.leafHinges?.[0] ?? "",
      leafHinge2: e.leafHinges?.[1] ?? "",
      leafHinge3: e.leafHinges?.[2] ?? "",
      leafHinge4: e.leafHinges?.[3] ?? "",
      leaf3Entity: e.extraEntities?.[0] ?? "",
      leaf4Entity: e.extraEntities?.[1] ?? "",
      glazed: hr(e),
      sunlight: e.sunlight ?? !0,
      shutterEntity: e.shutterEntity ?? "",
      shutterSecondaryEntity: e.shutterSecondaryEntity ?? "",
      shutterStyle: ot(e),
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
    toPatch(a) {
      const s = {};
      for (const [l, c] of Object.entries(a))
        if (l === "shutterEntity")
          s.shutterEntity = c, c || (s.shutterStyle = void 0, s.shutterFlipV = void 0, s.shutterInvert = void 0, s.shutterActiveColor = void 0, s.shutterSecondaryEntity = void 0, s.tapTarget = void 0, s.showShutterIcon = void 0, s.shutterIcon = void 0);
        else if (l === "sunlight")
          s.sunlight = c ? void 0 : !1;
        else if (l === "glazed")
          s.glazed = e.type === "door" && c ? !0 : void 0;
        else if (l === "entity")
          s.entity = c, c || (s.showIcon = void 0, s.icon = void 0);
        else if (l === "shutterSide") s.shutterFlipV = c === "near" || void 0;
        else if (l === "shutterInvert") s.shutterInvert = c || void 0;
        else if (l === "tapTarget") s.tapTarget = c === "shutter" ? "shutter" : void 0;
        else if (l === "showShutterIcon") s.showShutterIcon = c ? void 0 : !1;
        else if (l === "showIcon")
          s.showIcon = c ? !0 : void 0, c || (s.icon = void 0);
        else if (l === "motion") {
          const h = c === "slide" || c === "roll" || c === "fixed" || c === "awning" ? c : void 0;
          s.motion = h, c !== "slide" && (s.sliderStyle = void 0), c !== "swing" && (s.sashSpan = void 0), c !== "swing" && (s.extraEntities = void 0), c !== "swing" && (s.leafHinges = void 0), fi({
            ...e,
            motion: h,
            sliderStyle: c === "slide" ? e.sliderStyle : void 0
          }) || (s.secondaryEntity = void 0);
        } else if (l === "sashSpan")
          s.sashSpan = typeof c == "number" && c < 1 ? c : void 0;
        else if (l === "sash") {
          s.sash = c === bn(e.type) ? void 0 : c;
          const h = Ae({ ...e, sash: c, motion: "swing" });
          if (h < 2 && (s.secondaryEntity = void 0), h < 2 && (s.leafHinges = void 0), h < 3) s.extraEntities = void 0;
          else if (e.extraEntities && e.extraEntities.length > h - 2) {
            const d = e.extraEntities.slice(0, h - 2);
            s.extraEntities = d.some(Boolean) ? d : void 0;
          }
          h > 1 && (s.sashSpan = void 0);
        } else if (/^leafHinge[1-4]$/.test(l)) {
          const h = s.leafHinges ?? e.leafHinges, d = [0, 1, 2, 3].map((p) => h?.[p] ?? "");
          for (d[Number(l.slice(-1)) - 1] = c || ""; d.length && !d[d.length - 1]; ) d.pop();
          s.leafHinges = d.length ? d : void 0;
        } else if (l === "leaf3Entity" || l === "leaf4Entity") {
          const h = s.extraEntities ?? e.extraEntities, d = [0, 1].map((p) => h?.[p] ?? "");
          for (d[l === "leaf3Entity" ? 0 : 1] = c || ""; d.length && !d[d.length - 1]; ) d.pop();
          s.extraEntities = d.length ? d : void 0;
        } else l === "shutterStyle" ? (s.shutterStyle = c, c !== "swing" && (s.shutterSecondaryEntity = void 0)) : l === "hinge" || l === "slide" ? s.flipH = c === "right" || void 0 : l === "opens" ? s.flipV = c === "other" || void 0 : l === "style" ? (s.sliderStyle = c === "single" ? void 0 : c, Va(c) || (s.secondaryEntity = void 0)) : l === "invert" ? s.invert = c || void 0 : s[l] = c;
      return s;
    }
  };
}
function fr(e, t) {
  return e?.entities.length ? { entity: { include_entities: t && !e.entities.includes(t) ? [...e.entities, t] : e.entities } } : { entity: {} };
}
function mr(e, t) {
  if (!e?.entities.length) return t;
  const n = `Only entities in ${e.name ? `the ${e.name} area` : "this area"} — turn off “Filter entities” on the area to see all`;
  return t ? `${t}. ${n}` : n;
}
function ri(e) {
  if ((e.display ?? "badge") === "ripple") return "none";
  const t = Bt(e);
  if (t !== "icon") return t;
  const i = e.iconAnimation ?? "auto";
  return i === "spin" || i === "pulse" ? i : i === "auto" ? za(e.entity) ?? "icon" : "icon";
}
function gr(e) {
  return (e.display ?? "badge") !== "badge";
}
function $s(e, t) {
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
function Vm(e, t) {
  return {
    fields: [
      {
        name: "entity",
        label: "Entity",
        required: !0,
        helper: mr(t),
        selector: fr(t, e.entity)
      },
      {
        name: "attribute",
        label: "Attribute",
        helper: "Show this attribute instead of the state (e.g. current_temperature)",
        selector: { attribute: { entity_id: e.entity } }
      }
    ],
    data: { entity: e.entity ?? "", attribute: e.attribute ?? "" },
    toPatch: Ze
  };
}
function Ym(e) {
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
    toPatch: Ze
  };
}
function Zm(e) {
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
    toPatch: Ze
  };
}
function Xm(e) {
  const t = [
    {
      name: "labelPosition",
      label: "Label position",
      helper: "Beside the badge instead of under it — a long reading then grows one way only",
      selector: U(w("below", "Below"), w("left", "Left"), w("right", "Right"))
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
      labelPosition: tr(e),
      labelSize: e.labelSize ?? La,
      disableLabelColor: e.disableLabelColor ?? !1,
      useCustomLabelColor: e.useCustomLabelColor ?? !1,
      labelCustomColor: e.labelCustomColor ?? ""
    },
    toPatch: (i) => {
      const n = { ...i }, r = n.disableLabelColor ?? e.disableLabelColor ?? !1, o = n.useCustomLabelColor ?? e.useCustomLabelColor ?? !1;
      return n.labelPosition === "below" && (n.labelPosition = void 0), n.disableLabelColor === !1 && (n.disableLabelColor = void 0), n.useCustomLabelColor === !1 && (n.useCustomLabelColor = void 0), r ? o || (n.labelCustomColor = void 0) : (n.useCustomLabelColor = void 0, n.labelCustomColor = void 0), n.labelCustomColor === "" && (n.labelCustomColor = void 0), n;
    }
  };
}
function Qm(e, t) {
  const i = [
    {
      name: "badgeMode",
      label: "Badge shows",
      helper: "Animations play only while the entity is active. Value puts the reading in the badge, falling back to the icon when there is no number",
      selector: U(
        w("icon", "Icon, still"),
        w("spin", "Icon, spinning"),
        w("pulse", "Icon, pulsing"),
        w("value", "Value"),
        w("none", "Nothing")
      )
    }
  ], n = Fe(e);
  return ri(e) === "value" && n.length && i.push({
    name: "badgeEntity",
    label: "Badge reads",
    helper: "Which of this device's readings the badge shows",
    selector: U(
      w("primary", t?.primaryLabel || e.entity || "Main entity"),
      ...n.map(
        (r, o) => w(
          String(o),
          t?.readingLabels?.[o] || r.entity || (r.attribute ? `${e.entity || "this device"} · ${r.attribute}` : `Reading ${o + 1}`)
        )
      )
    )
  }), i.push(
    {
      name: "size",
      label: "Size",
      selector: { number: { min: 16, max: 160, step: 2, mode: "slider", unit_of_measurement: "px" } }
    },
    Kt()
  ), {
    fields: i,
    data: {
      badgeMode: ri(e),
      // The dropdown's values are strings, so the stored index (or the legacy
      // "secondary") is spelled the same way here; toPatch turns it back into
      // a number. Opens on what the badge is *actually* reading when nothing
      // is chosen, which is the whole point of badgeSource (issue #136).
      badgeEntity: String(qa(e.badgeEntity) ?? t?.source ?? "primary"),
      size: e.size ?? Be,
      angle: e.angle ?? 0
    },
    // "Badge shows" is the editor's spelling of three config keys (issue
    // #127) — expand it back, carrying the ripple state off the item since
    // that control lives in another group now.
    toPatch: (r) => {
      let o = r;
      if ("badgeEntity" in o && typeof o.badgeEntity == "string" && o.badgeEntity !== "primary" && (o = { ...o, badgeEntity: Number(o.badgeEntity) }), !("badgeMode" in o)) return o;
      const { badgeMode: a, ...s } = o;
      return {
        ...s,
        ...$s(a ?? ri(e), gr(e))
      };
    }
  };
}
function Jm(e, t) {
  const i = gr(e), n = Ha(e.entity, t), r = e.kind === "light" || e.entity?.startsWith("light.");
  if (!n && !r) return;
  const o = [];
  return n && (o.push({
    name: "ripple",
    label: "Ripple",
    // "Detected" rather than "the sensor is on": this is offered to a
    // device_tracker and a person too, and neither of those is a sensor.
    // It stays vague about *what* is detected because a vibration sensor
    // rings for a knock, not for presence (issue #202).
    helper: "Draws a pulsing ring while this device detects something",
    selector: { boolean: {} }
  }), i && (o.push({
    name: "rippleSize",
    label: "Ripple size",
    selector: {
      number: { min: 40, max: 400, step: 4, mode: "slider", unit_of_measurement: "px" }
    }
  }), o.push({
    name: "rippleDirection",
    label: "Ripple direction",
    selector: {
      number: { min: 0, max: 360, step: 1, mode: "slider", unit_of_measurement: "°" }
    }
  }), o.push({
    name: "rippleWidth",
    label: "Ripple width",
    selector: {
      number: { min: 0, max: 360, step: 1, mode: "slider", unit_of_measurement: "°" }
    }
  }))), r && (o.push({
    name: "glow",
    label: "Cast light",
    helper: "Pools the light's own color onto the plan; overlapping lights mix",
    selector: { boolean: {} }
  }), e.glow && o.push(
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
    fields: o,
    data: {
      ripple: i,
      rippleSize: e.rippleSize ?? Pi,
      rippleDirection: e.rippleDirection ?? Fi,
      rippleWidth: e.rippleWidth ?? Ni,
      glow: e.glow ?? !1,
      glowRadius: e.glowRadius ?? Li,
      glowColor: e.glowColor ?? ""
    },
    // "Ripple" is the other half of #127's three-key spelling — same expansion
    // as the badge group's, with the badge mode read off the item.
    toPatch: (a) => {
      if (!("ripple" in a)) return a;
      const { ripple: s, ...l } = a;
      return { ...l, ...$s(ri(e), !!s) };
    }
  };
}
function eg(e) {
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
function tg(e) {
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
        selector: { ui_action: { default_action: va(e.entity).action } }
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
    toPatch: Ze
  };
}
function ig(e, t) {
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
      helper: mr(t, "Shows this entity's value, formatted as HA formats it"),
      selector: fr(t, e.entity)
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
    Kt()
  ), {
    fields: i,
    data: {
      text: e.text ?? "",
      entity: e.entity ?? "",
      attribute: e.attribute ?? "",
      size: e.size ?? Ot,
      angle: e.angle ?? 0
    },
    toPatch: (n) => "entity" in n && !n.entity ? { ...n, attribute: void 0 } : n
  };
}
function ng(e, t, i = Te) {
  const n = xs(i);
  return {
    fields: [
      {
        name: "type",
        label: "Type",
        selector: { select: { mode: "dropdown", options: n.some((o) => o.id === e.type) ? n.map((o) => ({ value: o.id, label: o.name })) : [{ value: e.type, label: `${e.type} (missing)` }, ...n.map((o) => ({ value: o.id, label: o.name }))] } }
      },
      // L-shaped sectional only (#40): which side the chaise extends on,
      // facing the sofa from the front. Conditional, in the same shape
      // openingForm uses for its hinge / slide fields.
      ...e.type === "sectional" ? [
        {
          name: "hand",
          label: "Chaise side",
          helper: "Facing the sofa from the front",
          selector: U(w("right", "right"), w("left", "left"))
        }
      ] : [],
      { name: "w", label: "Width", required: !0, selector: { number: { min: 10, mode: "box" } } },
      { name: "h", label: "Height", required: !0, selector: { number: { min: 10, mode: "box" } } },
      Kt(),
      // Optional entity that makes the drawing live (issue #82) — a soil
      // sensor on a plant, a contact sensor on a cabinet. Last, because most
      // furniture is decoration and never binds anything.
      {
        name: "entity",
        label: "Entity",
        helper: mr(t, "Optional — lets the drawing change color with a sensor"),
        selector: fr(t, e.entity)
      },
      // Clicking it changes floor (issue #121). Offered on any piece rather
      // than only on the built-in `stairs`, because a plan can draw its own
      // staircase and a rule keyed on one symbol id would leave those out.
      // Empty on everything by default, so it is a row and not a nag.
      {
        name: "goToFloor",
        label: "Go to floor",
        helper: "Clicking this piece changes floor — for a staircase",
        selector: U(w("", "Nothing"), w("up", "Up one floor"), w("down", "Down one floor"))
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
    toPatch: (o) => "goToFloor" in o && !o.goToFloor ? { ...o, goToFloor: void 0 } : o
  };
}
function rg(e) {
  return {
    fields: [
      { name: "w", label: "Width", required: !0, selector: { number: { min: 10, mode: "box" } } },
      { name: "h", label: "Height", required: !0, selector: { number: { min: 10, mode: "box" } } },
      { name: "x", label: "X", required: !0, selector: { number: { mode: "box" } } },
      { name: "y", label: "Y", required: !0, selector: { number: { mode: "box" } } },
      Kt(),
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
      dotSize: e.dotSize ?? qn
    },
    toPatch: Ze
  };
}
function og(e, t = []) {
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
    toPatch: Ze
  };
}
function ag(e) {
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
                max: ga,
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
          selector: U(
            w("fill", "Fill"),
            w("border", "Border only"),
            w("both", "Fill and border")
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
      labelSize: e.labelSize ?? Wn,
      opacity: e.opacity ?? dn,
      entity: e.entity ?? "",
      activeOpacity: e.activeOpacity ?? e.opacity ?? dn,
      highlight: e.highlight ?? "fill",
      // "Fit" is the absence of a number, so it gets its own boolean; the
      // slider only appears once that is off, and then always shows a real
      // stored value.
      fitZoom: e.zoom === void 0,
      zoom: e.zoom ?? hn,
      tap_action: e.tap_action,
      hold_action: e.hold_action,
      double_tap_action: e.double_tap_action
    },
    toPatch: (t) => {
      let i = t;
      if ("highlight" in i && i.highlight === "fill" && (i = { ...i, highlight: void 0 }), "fitZoom" in i) {
        const { fitZoom: n, ...r } = i;
        i = { ...r, zoom: n ? void 0 : hn };
      }
      return i;
    }
  };
}
function sg(e) {
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
          number: { min: 2, max: ca, step: 1, mode: "slider", unit_of_measurement: "px" }
        }
      }
    ],
    data: {
      x1: Math.round(e.x1),
      y1: Math.round(e.y1),
      x2: Math.round(e.x2),
      y2: Math.round(e.y2),
      thickness: e.thickness ?? G
    },
    // Keep the default out of the YAML so untouched walls stay terse.
    toPatch: (i) => "thickness" in i && i.thickness === G ? { ...i, thickness: void 0 } : i
  };
}
function lg(e) {
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
    data: { title: e.title ?? "", width: e.width, height: e.height, grid: e.grid ?? Kn },
    toPatch: Ze
  };
}
function cg(e) {
  return {
    fields: [
      {
        name: "pressEffect",
        label: "Press effect",
        helper: "Feedback when a device is pressed. Only devices that do something respond",
        selector: U(
          w("scale", "Press in"),
          w("ripple", "Ink ripple"),
          w("flash", "Flash"),
          w("none", "None")
        )
      }
    ],
    data: { pressEffect: Qt(e) },
    // The default stays out of the YAML, as the skin's does.
    toPatch: (t) => "pressEffect" in t && t.pressEffect === fa ? { ...t, pressEffect: void 0 } : t
  };
}
function dg(e) {
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
function hg(e) {
  const t = Un(e.skin) ?? li[0];
  return {
    fields: [
      {
        name: "skin",
        label: "Skin",
        helper: t.description,
        selector: U(...li.map((i) => w(i.id, i.label)))
      }
    ],
    // An id we don't ship reads back as Default, matching what it renders as.
    data: { skin: t.id },
    toPatch: (i) => (
      // Default is the absence of a skin, so it stays out of the YAML.
      "skin" in i && i.skin === Mi ? { ...i, skin: void 0 } : i
    )
  };
}
function pg(e) {
  return {
    fields: [
      {
        name: "rotation",
        label: "Rotate display",
        helper: "Rotates the live card only — editing stays as drawn",
        selector: U(w("0", "0°"), w("90", "90°"), w("180", "180°"), w("270", "270°"))
      },
      // Per-orientation overrides (issue #237). Two dropdowns with a "same as
      // above" default rather than a switch plus two angles: the switch would
      // be a third control whose only job is to say whether the other two
      // count, and "same as above" says that per orientation and for free.
      {
        name: "rotationPortrait",
        label: "…on a portrait screen",
        helper: "Overrides the angle above while the screen is taller than it is wide",
        selector: U(
          w("", "Same as above"),
          w("0", "0°"),
          w("90", "90°"),
          w("180", "180°"),
          w("270", "270°")
        )
      },
      {
        name: "rotationLandscape",
        label: "…on a landscape screen",
        helper: "Overrides the angle above while the screen is wider than it is tall",
        selector: U(
          w("", "Same as above"),
          w("0", "0°"),
          w("90", "90°"),
          w("180", "180°"),
          w("270", "270°")
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
        selector: U(w("plan", "Canvas units"), w("fixed", "Fixed pixels"))
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
        selector: U(
          w("dim", "Dimmed"),
          w("strike", "Dimmed and crossed out"),
          w("none", "No different")
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
      overlayScale: ir(e.overlayScale),
      compactHeader: e.compactHeader ?? !1,
      zoomedOverlayScale: e.zoomedOverlayScale ?? pn,
      offlineStyle: ja(e)
    },
    toPatch: (t) => {
      let i = t;
      "rotation" in i && (i = { ...i, rotation: i.rotation === "0" ? void 0 : Number(i.rotation) });
      for (const n of ["rotationPortrait", "rotationLandscape"])
        n in i && (i = { ...i, [n]: i[n] === "" ? void 0 : Number(i[n]) });
      return "compactHeader" in i && !i.compactHeader && (i = { ...i, compactHeader: void 0 }), "offlineStyle" in i && i.offlineStyle === ma && (i = { ...i, offlineStyle: void 0 }), "zoomedOverlayScale" in i && i.zoomedOverlayScale === pn && (i = { ...i, zoomedOverlayScale: void 0 }), i;
    }
  };
}
function ug(e) {
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
function fg(e) {
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
      sunBrightnessMin: e.sunBrightnessMin ?? jn,
      sunBrightnessMax: e.sunBrightnessMax ?? ci
    },
    // Off is the default, so keep the whole feature out of the YAML until it
    // is switched on — including the two sliders it drags along with it.
    toPatch: (i) => "sunDimming" in i && !i.sunDimming ? { ...i, sunDimming: void 0, sunBrightnessMin: void 0, sunBrightnessMax: void 0 } : i
  };
}
function mg(e) {
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
      sunReach: e.sunReach ?? bi,
      sunFollows: typeof e.sunBearing != "number",
      sunBearing: e.sunBearing ?? vn
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
      } : ("sunFollows" in n && (n.sunBearing = n.sunFollows ? void 0 : e.sunBearing ?? vn, delete n.sunFollows), "north" in n && !n.north && (n.north = void 0), "sunReach" in n && n.sunReach === bi && (n.sunReach = void 0), "sunShade" in n && n.sunShade && (n.sunShade = void 0), n);
    }
  };
}
function gg(e) {
  const t = [
    { name: "image", label: "Bg image", helper: "/local/floorplan.png or URL", selector: { text: {} } }
  ];
  return e.image && (t.push({
    name: "imageFit",
    label: "Image fit",
    helper: "Per floor, so scans of different resolutions can each fit properly",
    selector: U(
      w("stretch", "Stretch to canvas (may distort)"),
      w("contain", "Fit inside (keep proportions)"),
      w("cover", "Fill canvas (keep proportions, crop)")
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
var yg = Object.defineProperty, bg = Object.getOwnPropertyDescriptor, L = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? bg(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (r = (n ? a(t, i, r) : a(r)) || r);
  return n && r && yg(t, i, r), r;
};
const vg = (e) => e.label, _g = (e) => e.helper, rn = {
  select: { icon: "mdi:cursor-default", label: "Select" },
  wall: { icon: "mdi:wall", label: "Wall" },
  door: { icon: "mdi:door", label: "Door" },
  window: { icon: "mdi:window-closed-variant", label: "Window" },
  tracker: { icon: "mdi:crosshairs-gps", label: "Tracker" },
  area: { icon: "mdi:vector-polygon", label: "Area" }
}, wg = {
  wall: "mdi:wall",
  opening: "mdi:door",
  item: "mdi:lightbulb-outline",
  text: "mdi:format-text",
  furniture: "mdi:sofa-outline",
  tracker: "mdi:crosshairs-gps",
  area: "mdi:floor-plan"
}, Lo = 35, Po = 12, xg = 8, $g = 2e3, kg = 10;
function Fo(e) {
  return e.some((t) => {
    const i = t, n = i.tagName?.toLowerCase();
    return n === "input" || n === "textarea" || n === "select" || n === "ha-form" || n === "ha-entity-picker" || n === "ha-icon-picker" || i.isContentEditable === !0;
  });
}
let I = class extends ae {
  constructor() {
    super(...arguments), this._wallMaskId = `fp-edit-wall-mask-${I._nextWallMaskId++}`, this.panelMode = !1, this.panelError = "", this._watchedEntities = /* @__PURE__ */ new Set(), this._tool = "select", this._selection = [], this._draft = null, this._draftTracker = null, this._areaShape = "polygon", this._draftArea = null, this._areaHover = null, this._freeWalls = !1, this._defaultOpeningLength = 60, this._marquee = null, this._history = [], this._future = [], this._zoom = 1, this._floorMenuOpen = !1, this._addMenuOpen = !1, this._addQuery = "", this._symbolDraft = "", this._symbolError = "", this._paletteError = "", this._projectOpen = !1, this._openGroups = /* @__PURE__ */ new Set(), this._fullscreen = !1, this._applyState = "idle", this._applyError = "", this._applyResetTimer = null, this._drag = null, this._dragMoves = new Am(Em, (e) => {
      this._drag && this._applyDrag(e);
    }), this._dragDirty = !1, this._pickAnchor = null, this._hideLabels = !1, this._pinchPts = /* @__PURE__ */ new Map(), this._pinch = null, this._gesturePointer = null, this._marqueeAdd = !1, this._clipboard = null, this._onKeyDown = (e) => this._handleKeyDown(e), this._onHostKeyDown = (e) => {
      e.key !== "Escape" || !this._fullscreen || Fo(e.composedPath()) && (e.preventDefault(), e.stopPropagation(), this._canvasWrap?.focus({ preventScroll: !0 }));
    }, this._onFocusIn = (e) => {
      this._fullscreen && !this.panelMode && !e.composedPath().includes(this) && (this._fullscreen = !1);
    }, this._preventGesture = (e) => e.preventDefault(), this._onWrapPointerDown = (e) => {
      if (e.pointerType !== "touch" || (this._pinchPts.set(e.pointerId, { x: e.clientX, y: e.clientY }), this._pinchPts.size !== 2)) return;
      this._cancelGesture();
      const t = this._canvasWrap, i = t?.getBoundingClientRect(), [n, r] = [...this._pinchPts.values()];
      this._pinch = {
        d0: Math.max(Math.hypot(r.x - n.x, r.y - n.y), 1),
        z0: this._zoom,
        cx: (n.x + r.x) / 2 - (i?.left ?? 0) + (t?.scrollLeft ?? 0),
        cy: (n.y + r.y) / 2 - (i?.top ?? 0) + (t?.scrollTop ?? 0)
      }, e.stopPropagation();
    }, this._onWrapPointerMove = (e) => {
      if (!this._pinch || !this._pinchPts.has(e.pointerId) || (this._pinchPts.set(e.pointerId, { x: e.clientX, y: e.clientY }), this._pinchPts.size < 2)) return;
      e.preventDefault(), e.stopPropagation();
      const [t, i] = [...this._pinchPts.values()], n = this._pinch;
      this._setZoom(n.z0 * (Math.hypot(i.x - t.x, i.y - t.y) / n.d0)), this.updateComplete.then(() => {
        const r = this._canvasWrap;
        if (!r || this._pinch !== n) return;
        const o = r.getBoundingClientRect(), a = this._zoom / n.z0;
        r.scrollLeft = n.cx * a - ((t.x + i.x) / 2 - o.left), r.scrollTop = n.cy * a - ((t.y + i.y) / 2 - o.top);
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
      const e = await Mm(this);
      if (!e.ok) {
        this._applyState = "idle", this._applyError = e.error;
        return;
      }
      this._applyState = "saved", this._applyResetTimer = setTimeout(() => {
        this._applyResetTimer = null, this._applyState = "idle";
      }, $g);
    }, this._addSymbol = () => {
      let e;
      try {
        e = JSON.parse(this._symbolDraft);
      } catch (n) {
        this._symbolError = `Not valid JSON — ${n.message}`;
        return;
      }
      const t = [], i = zi(e, void 0, t);
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
    const t = { ...rc(e.type || "custom:easy-floorplan-card"), ...e }, i = je(t).map((n) => structuredClone(n));
    this._config = {
      ...t,
      floors: i,
      walls: [],
      openings: [],
      items: [],
      texts: [],
      furniture: [],
      trackers: []
    }, (!this._activeFloorId || !i.some((n) => n.id === this._activeFloorId)) && (this._activeFloorId = t.defaultFloor && i.some((n) => n.id === t.defaultFloor) ? t.defaultFloor : i[0].id), this._lastEmitted && e !== this._lastEmitted && !un(e, this._lastEmitted) && (this._history = [], this._future = [], this._liveEditKey = null), this._watchedEntities = Ct(this._config);
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
    return i(t) !== i(this.hass) ? !0 : ka(t, this.hass, this._watchedEntities);
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
    return mn(this._config.symbols);
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
    return this._config.grid ?? Kn;
  }
  /**
   * Resolved placement snap step. `snap` is tri-state in the config: unset
   * means "follow the grid" (the default behaviour), `0` is free placement,
   * any other number is a custom step. See {@link resolveSnap}.
   */
  get _resolvedSnap() {
    return Jl(this._config.snap, this.grid);
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
        snap: t && t > 0 ? t : Ji(Yr, this.grid)
      });
    }
  }
  /** Grid update plus a custom-snap rescale so its percentage of the grid is preserved. */
  _gridPatch(e) {
    const t = { grid: e };
    if (this._snapMode === "custom") {
      const i = Zr(this._config.snap, this.grid);
      t.snap = Ji(i, e);
    }
    return t;
  }
  _setGuides(e) {
    JSON.stringify(e) !== JSON.stringify(this._guides) && (this._guides = e);
  }
  /** Snap to the step, but pull onto the x/y of a nearby wall end or room corner and remember the guide lines. */
  _alignedSnap(e, t, i) {
    const n = this._floor();
    let r = this._snap(e), o = this._snap(t);
    if (this._resolvedSnap <= 0)
      return this._setGuides([]), { x: r, y: o };
    const a = [];
    for (const h of n.walls) a.push({ x: h.x1, y: h.y1 }, { x: h.x2, y: h.y2 });
    for (const h of n.areas ?? []) for (const d of h.points) a.push(d);
    const s = [];
    let l = Po, c = Po;
    for (const h of a)
      i?.(h) || (Math.abs(h.x - e) <= l && (l = Math.abs(h.x - e), r = h.x, s[0] = { axis: "x", value: h.x }), Math.abs(h.y - t) <= c && (c = Math.abs(h.y - t), o = h.y, s[1] = { axis: "y", value: h.y }));
    return this._setGuides(s.filter(Boolean)), { x: r, y: o };
  }
  _snap(e) {
    const t = this._resolvedSnap;
    return t > 0 ? Math.round(e / t) * t : e;
  }
  _toVirtual(e, t = !0) {
    const n = this._svg.getScreenCTM();
    if (!n) return { x: 0, y: 0 };
    const r = new DOMPoint(e.clientX, e.clientY).matrixTransform(n.inverse());
    return t ? { x: this._snap(r.x), y: this._snap(r.y) } : { x: r.x, y: r.y };
  }
  /** Nearest existing wall endpoint within ENDPOINT_SNAP, or null. */
  _nearestCorner(e, t) {
    return _s(this._floor().walls, e, t, nt);
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
    return gm(this._floor(), e, t, nt, i) ?? this._alignedSnap(e, t, (n) => {
      const r = i ? this._floor().areas?.find((o) => o.id === i.areaId)?.points : void 0;
      return !!r && r[i.vertexIndex] === n;
    });
  }
  /**
   * Like {@link _snapWallPoint}, but ignores endpoints in `moving` (keys
   * `${wallId}:${end}`) — the corner cluster being dragged must not attract
   * itself.
   */
  _snapWallPointExcluding(e, t, i) {
    let n = null, r = nt;
    for (const o of this._floor().walls)
      for (const a of [1, 2]) {
        if (i.has(`${o.id}:${a}`)) continue;
        const s = a === 1 ? o.x1 : o.x2, l = a === 1 ? o.y1 : o.y2, c = Math.hypot(e - s, t - l);
        c < r && (r = c, n = { x: s, y: l });
      }
    return n ?? this._alignedSnap(
      e,
      t,
      (o) => this._floor().walls.some(
        (a) => i.has(`${a.id}:1`) && a.x1 === o.x && a.y1 === o.y || i.has(`${a.id}:2`) && a.x2 === o.x && a.y2 === o.y
      )
    );
  }
  /** See {@link snapWallEnd}: corners win, then axis gravity, then the snap step. */
  _snapWallEnd(e, t, i, n) {
    const r = bm(
      this._floor().walls,
      e,
      t,
      i,
      n,
      (s) => this._snap(s),
      this._freeWalls,
      kg,
      nt
    );
    if (this._nearestCorner(i, n))
      return this._setGuides([]), r;
    const o = this._alignedSnap(i, n), a = this._guides.filter((s) => s.axis === "x" ? r.x !== e : r.y !== t);
    return this._setGuides(a), {
      x: a.some((s) => s.axis === "x") ? o.x : r.x,
      y: a.some((s) => s.axis === "y") ? o.y : r.y
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
    for (const n of t) i.some((r) => r.kind === n.kind && r.id === n.id) || i.push(n);
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
    if (Fo(i)) return;
    const n = e.ctrlKey || e.metaKey, r = e.key.toLowerCase(), o = !!(this._drag || this._draft || this._draftTracker || this._draftArea || this._marquee);
    if (e.key === "Backspace" && this._draftArea?.points.length) {
      e.preventDefault();
      const c = this._draftArea.points.slice(0, -1);
      this._draftArea = c.length ? { points: c } : null;
      return;
    }
    if (o && e.key !== "Escape" && !(n && r === "c")) return;
    if (n && r === "c") {
      this._selection.length && (e.preventDefault(), this._copy());
      return;
    }
    if (n && r === "v") {
      this._clipboard && (e.preventDefault(), this._paste());
      return;
    }
    if (n && r === "d") {
      this._selection.length && (e.preventDefault(), this._duplicate());
      return;
    }
    if (n && r === "z") {
      e.preventDefault(), e.shiftKey ? this._redo() : this._undo();
      return;
    }
    if (n && r === "y") {
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
    const s = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1]
    }[e.key];
    if (!s) return;
    e.preventDefault();
    const l = e.shiftKey ? this.grid : this._resolvedSnap || 1;
    this._nudge(s[0] * l, s[1] * l);
  }
  _nudge(e, t) {
    if (!this._selection.length) return;
    const i = this._floor();
    if (!km(i, this._selection).length) return;
    const n = (d) => {
      const p = this._idsOfKind(d);
      for (const g of p) At(i, { kind: d, id: g }) && p.delete(g);
      return p;
    }, r = n("wall"), o = n("opening"), a = n("item"), s = n("text"), l = n("furniture"), c = n("tracker"), h = n("area");
    this._commitFloor({
      walls: i.walls.map(
        (d) => r.has(d.id) ? { ...d, x1: d.x1 + e, y1: d.y1 + t, x2: d.x2 + e, y2: d.y2 + t } : d
      ),
      openings: i.openings.map((d) => o.has(d.id) ? { ...d, x: d.x + e, y: d.y + t } : d),
      items: i.items.map((d) => a.has(d.id) ? { ...d, x: d.x + e, y: d.y + t } : d),
      texts: i.texts.map((d) => s.has(d.id) ? { ...d, x: d.x + e, y: d.y + t } : d),
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
    if (!e) return m;
    const t = this._selection.length > 0, i = this._floor(), n = t && this._selection.every((o) => At(i, o)), r = (o, a, s, l = !1) => f`<button
      class=${l ? "danger" : ""}
      @click=${() => {
      this._ctx = null, s();
    }}
    ><ha-icon icon=${o}></ha-icon>${a}</button>`;
    return f`<div class="fp-ctx" style="left:${e.x}px;top:${e.y}px" @pointerdown=${(o) => o.stopPropagation()}>
      ${t ? f`${r("mdi:content-duplicate", "Duplizieren", () => this._duplicate())}
            ${r("mdi:content-copy", "Kopieren", () => this._copy())}
            ${r("mdi:content-save-outline", "Als Vorlage speichern", () => this._saveTemplate())}
            ${r(n ? "mdi:lock-open-variant-outline" : "mdi:lock", n ? "Entsperren" : "Fixieren", () => this._setLocked(!n))}` : m}
      ${this._clipboard ? r("mdi:content-paste", "Einfügen", () => this._paste()) : m}
      ${t ? r("mdi:delete-outline", "Löschen", () => this._deleteSelected(), !0) : m}
      ${!t && !this._clipboard ? f`<span class="fp-ctx-empty">Nichts ausgewählt</span>` : m}
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
      const n = this._draftArea.points, r = n[0];
      if (n.length >= 3 && Math.hypot(i.x - r.x, i.y - r.y) <= nt) {
        this._finishArea();
        return;
      }
      const o = n[n.length - 1];
      (i.x !== o.x || i.y !== o.y) && (this._draftArea = { points: [...n, i] });
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
          const i = { id: Y("wall"), ...t };
          this._commitFloor({ walls: [...this._floor().walls, i] }), this._selection = [{ kind: "wall", id: i.id }];
        }
        return;
      }
      if ((this._tool === "tracker" || this._tool === "area") && this._draftTracker) {
        const t = this._draftTracker;
        this._draftTracker = null, this._releasePointer(e);
        const i = Math.min(t.x0, t.x1), n = Math.min(t.y0, t.y1), r = Math.abs(t.x1 - t.x0), o = Math.abs(t.y1 - t.y0);
        r >= this.grid / 2 && o >= this.grid / 2 && (this._tool === "area" ? this._addRectArea(i, n, r, o) : this._addTracker(i, n, r, o));
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
    return vm(this._floor(), e);
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
    const i = this._toVirtual(e, !1), n = $m(this._floor(), i.x, i.y, {
      itemSize: Be,
      textSize: Ot,
      wallThickness: G,
      hass: this.hass
    }), r = !!this._pickAnchor && Math.hypot(e.clientX - this._pickAnchor.clientX, e.clientY - this._pickAnchor.clientY) <= xg;
    return this._pickAnchor = { clientX: e.clientX, clientY: e.clientY }, Sm(n, this._selection, r) ?? t;
  }
  _startDrag(e, t, i, n) {
    if (this._tool !== "select") return;
    if (e.stopPropagation(), this._ctx = null, e.button === 2) {
      this._isSel(t.kind, t.id) || this._selectOne(t);
      return;
    }
    if (this._gesturePointer !== null) return;
    this._canvasWrap?.focus({ preventScroll: !0 });
    const r = i != null || n != null, o = r ? t : this._resolvePick(e, t);
    r ? this._selectOne(o) : this._selectForPointer(e, o), !At(this._floor(), o) && (this._drag = {
      primary: o,
      start: this._toVirtual(e, !1),
      orig: this._snapshotSelection(),
      endpoint: i,
      areaVertex: n
    }, o.kind === "wall" && (this._drag.attached = this._attachedCorners(o.id, i)), this._gesturePointer = e.pointerId, this._capturePointer(e));
  }
  /** See {@link attachedCorners}: shared room corners that stretch with this wall. */
  _attachedCorners(e, t) {
    return mm(this._floor().walls, e, t);
  }
  /** Capture the start positions of every selected element on the active floor. */
  _snapshotSelection() {
    const e = this._floor(), t = /* @__PURE__ */ new Map();
    for (const i of this._selection)
      if (!At(e, i))
        if (i.kind === "wall") {
          const n = e.walls.find((r) => r.id === i.id);
          n && t.set(`wall:${n.id}`, { kind: "wall", x1: n.x1, y1: n.y1, x2: n.x2, y2: n.y2 });
        } else if (i.kind === "opening") {
          const n = e.openings.find((r) => r.id === i.id);
          n && t.set(`opening:${n.id}`, { kind: "pt", x: n.x, y: n.y });
        } else if (i.kind === "item") {
          const n = e.items.find((r) => r.id === i.id);
          n && t.set(`item:${n.id}`, { kind: "pt", x: n.x, y: n.y });
        } else if (i.kind === "text") {
          const n = e.texts.find((r) => r.id === i.id);
          n && t.set(`text:${n.id}`, { kind: "pt", x: n.x, y: n.y });
        } else if (i.kind === "furniture") {
          const n = e.furniture.find((r) => r.id === i.id);
          n && t.set(`furniture:${n.id}`, { kind: "pt", x: n.x, y: n.y });
        } else if (i.kind === "area") {
          const n = (e.areas ?? []).find((r) => r.id === i.id);
          n && t.set(`area:${n.id}`, { kind: "polygon", points: n.points.map((r) => ({ ...r })) });
        } else {
          const n = (e.trackers ?? []).find((r) => r.id === i.id);
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
        ...c.map((g) => `${g.id}:${g.end}`)
      ]), d = this._snapWallPointExcluding(e.x, e.y, h), p = i.walls.map((g) => {
        let y = g;
        g.id === t.primary.id && (y = t.endpoint === 1 ? { ...y, x1: d.x, y1: d.y } : { ...y, x2: d.x, y2: d.y });
        for (const b of c)
          b.id === g.id && (y = b.end === 1 ? { ...y, x1: d.x, y1: d.y } : { ...y, x2: d.x, y2: d.y });
        return y;
      });
      this._emitFloor({ walls: p });
      return;
    }
    if (t.primary.kind === "area" && t.areaVertex != null) {
      const c = t.areaVertex, h = this._snapAreaPoint(e.x, e.y, { areaId: t.primary.id, vertexIndex: c }), d = (i.areas ?? []).map(
        (p) => p.id === t.primary.id ? { ...p, points: p.points.map((g, y) => y === c ? h : g) } : p
      );
      this._emitFloor({ areas: d });
      return;
    }
    if (this._selection.length === 1 && t.primary.kind === "opening") {
      const c = t.orig.get(`opening:${t.primary.id}`);
      if (c && c.kind === "pt") {
        const h = c.x + (e.x - t.start.x), d = c.y + (e.y - t.start.y), p = yo(h, d, i.walls, Lo), g = i.openings.map(
          (y) => y.id === t.primary.id ? p ? { ...y, x: p.x, y: p.y, angle: p.angle } : { ...y, x: this._snap(h), y: this._snap(d) } : y
        );
        this._emitFloor({ openings: g });
        return;
      }
    }
    const n = t.orig.get(`${t.primary.kind}:${t.primary.id}`);
    if (!n) return;
    const r = n.kind === "wall" ? n.x1 : n.kind === "polygon" ? n.points[0].x : n.x, o = n.kind === "wall" ? n.y1 : n.kind === "polygon" ? n.points[0].y : n.y, a = this._snap(r + (e.x - t.start.x)) - r, s = this._snap(o + (e.y - t.start.y)) - o;
    let l = this._applyDelta(a, s, t.orig);
    if (t.attached?.length && !e.altKey) {
      const c = (l.walls ?? i.walls).map((h) => {
        let d = h;
        for (const p of t.attached)
          p.id !== h.id || t.orig.has(`wall:${p.id}`) || (d = p.end === 1 ? { ...d, x1: p.x0 + a, y1: p.y0 + s } : { ...d, x2: p.x0 + a, y2: p.y0 + s });
        return d;
      });
      l = { ...l, walls: c };
    }
    this._emitFloor(l);
  }
  /** Translate every snapshotted element by (dx, dy). */
  _applyDelta(e, t, i) {
    return _m(this._floor(), e, t, i);
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
    const n = this._floor(), r = yo(t, i, n.walls, Lo), o = {
      id: Y(e),
      type: e,
      x: r?.x ?? t,
      y: r?.y ?? i,
      // User-editable from the door/window context bar so opening size can be
      // set BEFORE placing (the previous hardcoded 60 forced place-then-resize).
      length: this._defaultOpeningLength,
      angle: r?.angle ?? 0
    };
    this._commitFloor({ openings: [...n.openings, o] }), this._selection = [{ kind: "opening", id: o.id }], this._tool = "select";
  }
  _addItem(e) {
    const t = {
      id: Y("item"),
      entity: "",
      x: this._snap(this._config.width / 2),
      y: this._snap(this._config.height / 2),
      kind: e,
      showState: e === "sensor",
      showIcon: !0,
      size: Be
    };
    this._commitFloor({ items: [...this._floor().items, t] }), this._selection = [{ kind: "item", id: t.id }], this._tool = "select";
  }
  _addFurniture(e) {
    const t = ou(e, this._symbols()), i = {
      id: Y("furn"),
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
    const r = {
      id: Y("tracker"),
      x: e,
      y: t,
      w: i,
      h: n,
      angle: 0,
      dotSize: qn
    };
    this._commitFloor({ trackers: [...this._floor().trackers ?? [], r] }), this._selection = [{ kind: "tracker", id: r.id }], this._tool = "select";
  }
  /** floorplan-panel: a rectangular room from a dragged box. */
  _addRectArea(e, t, i, n) {
    const r = {
      id: Y("area"),
      points: [
        { x: e, y: t },
        { x: e + i, y: t },
        { x: e + i, y: t + n },
        { x: e, y: t + n }
      ],
      showName: !0
    };
    this._commitFloor({ areas: [...this._floor().areas ?? [], r] }), this._selection = [{ kind: "area", id: r.id }], this._tool = "select";
  }
  /** Close the in-progress Area draft into a committed polygon and select it. */
  _finishArea() {
    if (!this._draftArea || this._draftArea.points.length < 3) return;
    const e = { id: Y("area"), points: this._draftArea.points, showName: !0 };
    this._commitFloor({ areas: [...this._floor().areas ?? [], e] }), this._selection = [{ kind: "area", id: e.id }], this._draftArea = null, this._areaHover = null, this._tool = "select";
  }
  _addText() {
    const e = {
      id: Y("text"),
      x: this._snap(this._config.width / 2),
      y: this._snap(this._config.height / 2),
      text: "Label",
      size: Ot
    };
    this._commitFloor({ texts: [...this._floor().texts, e] }), this._selection = [{ kind: "text", id: e.id }], this._tool = "select";
  }
  _deleteSelected() {
    if (!this._selection.length) return;
    const e = this._floor(), t = this._idsOfKind("wall"), i = this._idsOfKind("opening"), n = this._idsOfKind("item"), r = this._idsOfKind("text"), o = this._idsOfKind("furniture"), a = this._idsOfKind("tracker"), s = this._idsOfKind("area");
    this._commitFloor({
      walls: e.walls.filter((l) => !t.has(l.id)),
      openings: e.openings.filter((l) => !i.has(l.id)),
      items: e.items.filter((l) => !n.has(l.id)),
      texts: e.texts.filter((l) => !r.has(l.id)),
      furniture: e.furniture.filter((l) => !o.has(l.id)),
      trackers: (e.trackers ?? []).filter((l) => !a.has(l.id)),
      areas: (e.areas ?? []).filter((l) => !s.has(l.id))
    }), this._clearSel();
  }
  // ---- clipboard (copy / paste / duplicate) ------------------------------
  _copy() {
    if (!this._selection.length) return;
    const e = this._floor(), t = this._idsOfKind("wall"), i = this._idsOfKind("opening"), n = this._idsOfKind("item"), r = this._idsOfKind("text"), o = this._idsOfKind("furniture"), a = this._idsOfKind("tracker"), s = this._idsOfKind("area");
    this._clipboard = structuredClone({
      walls: e.walls.filter((l) => t.has(l.id)),
      openings: e.openings.filter((l) => i.has(l.id)),
      items: e.items.filter((l) => n.has(l.id)),
      texts: e.texts.filter((l) => r.has(l.id)),
      furniture: e.furniture.filter((l) => o.has(l.id)),
      trackers: (e.trackers ?? []).filter((l) => a.has(l.id)),
      areas: (e.areas ?? []).filter((l) => s.has(l.id))
    });
  }
  /** Paste the clipboard onto the active floor, offset by one snap step, with fresh ids. */
  _paste() {
    if (!this._clipboard) return;
    const e = structuredClone(this._clipboard), t = this._resolvedSnap || this.grid, i = this._floor(), n = { locked: void 0 }, r = e.walls.map((d) => ({
      ...d,
      ...n,
      id: Y("wall"),
      x1: d.x1 + t,
      y1: d.y1 + t,
      x2: d.x2 + t,
      y2: d.y2 + t
    })), o = e.openings.map((d) => ({
      ...d,
      ...n,
      id: Y(d.type),
      x: d.x + t,
      y: d.y + t
    })), a = e.items.map((d) => ({
      ...d,
      ...n,
      id: Y("item"),
      x: d.x + t,
      y: d.y + t
    })), s = e.texts.map((d) => ({
      ...d,
      ...n,
      id: Y("text"),
      x: d.x + t,
      y: d.y + t
    })), l = e.furniture.map((d) => ({
      ...d,
      ...n,
      id: Y("furn"),
      x: d.x + t,
      y: d.y + t
    })), c = (e.trackers ?? []).map((d) => ({
      ...d,
      ...n,
      id: Y("tracker"),
      x: d.x + t,
      y: d.y + t
    })), h = (e.areas ?? []).map((d) => ({
      ...d,
      ...n,
      id: Y("area"),
      points: d.points.map((p) => ({ x: p.x + t, y: p.y + t }))
    }));
    this._commitFloor({
      walls: [...i.walls, ...r],
      openings: [...i.openings, ...o],
      items: [...i.items, ...a],
      texts: [...i.texts, ...s],
      furniture: [...i.furniture, ...l],
      trackers: [...i.trackers ?? [], ...c],
      areas: [...i.areas ?? [], ...h]
    }), this._selection = [
      ...r.map((d) => ({ kind: "wall", id: d.id })),
      ...o.map((d) => ({ kind: "opening", id: d.id })),
      ...a.map((d) => ({ kind: "item", id: d.id })),
      ...s.map((d) => ({ kind: "text", id: d.id })),
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
      templates: [...t, { id: Y("tpl"), name: i, data: structuredClone(e) }]
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
    return f`<div class="fp-templates">
      <h3 class="section-title">Vorlagen</h3>
      ${e.length ? e.map(
      (t) => f`<div class="fp-tpl">
              <button title="Auf dieser Etage einfügen" @click=${() => this._insertTemplate(t.id)}>
                <ha-icon icon="mdi:shape-plus-outline"></ha-icon> ${t.name}
              </button>
              <button class="danger" aria-label="Delete template" @click=${() => this._deleteTemplate(t.id)}>
                <ha-icon icon="mdi:delete-outline"></ha-icon>
              </button>
            </div>`
    ) : f`<p class="hint">Mehrere Elemente auswählen und mit dem Vorlagen-Knopf speichern, um sie später wieder einzufügen.</p>`}
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
    const t = this._floor(), i = e || void 0, n = (r, o) => {
      const a = this._idsOfKind(o);
      return r.map((s) => a.has(s.id) ? { ...s, locked: i } : s);
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
    const e = this._floor().walls.map((r) => ({ ...r, id: Y("wall") })), t = (this._config.floors?.length ?? 1) + 1, i = ac(`Floor ${t}`, e), n = [...this._config.floors ?? [], i];
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
    const t = cc(this._config.floors ?? [], this._activeFloorId, e);
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
    const t = Xr(this.hass).find((i) => i.floor_id === e);
    this._commit({
      ...this._config,
      floors: (this._config.floors ?? []).map(
        (i) => i.id === this._activeFloorId ? { ...i, haFloor: t?.floor_id, ...t ? { name: t.name } : {} } : i
      )
    });
  }
  /** HA-floor link row for the floor gear popover; hidden when HA exposes no floors. */
  _renderHaFloorRow(e) {
    const t = Xr(this.hass);
    return t.length ? f`
      <div class="pop-row">
        <label>HA floor</label>
        <select
          .value=${e?.haFloor ?? ""}
          @change=${(i) => this._linkHaFloor(i.target.value)}
        >
          <option value="" ?selected=${!e?.haFloor}>(not linked)</option>
          ${t.map(
      (i) => f`<option value=${i.floor_id} ?selected=${e?.haFloor === i.floor_id}>
                ${i.name}
              </option>`
    )}
        </select>
      </div>
    ` : f`${m}`;
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
    return f`
      <div class="row wide area-name-status">
        <label></label>
        ${e.haArea ? f`<span
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
            </span>` : f`<span class="hint"
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
    return jt(this._config?.palette);
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
    if (!i.length) return m;
    const n = bs(e), r = n && i.some((o) => te(o.name) === n) ? n : void 0;
    return f`
      <select
        class="palette-pick"
        title="Use one of the plan's named colours"
        .value=${r ?? ""}
        @change=${(o) => {
      const a = o.target.value;
      if (!a) {
        r && t(ni(e, i));
        return;
      }
      const s = i.find((l) => te(l.name) === a);
      s && t(_o(s.name));
    }}
      >
        <option value="" ?selected=${!r}>Custom…</option>
        ${i.map(
      (o) => f`<option
            value=${te(o.name)}
            ?selected=${te(o.name) === r}
          >
            ${o.name}
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
    const i = ni(e, this._config?.palette);
    return typeof i == "string" && i ? i : t;
  }
  _renderColorRow(e) {
    return f`
      <div class="row">
        <label title=${e.title ?? m}>${e.label}</label>
        <input
          type="color"
          title=${e.title ?? m}
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
    return gn(
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
    return f`
      <div class="row wide">
        <label title=${t}>Icon</label>
        ${this._renderIconPicker(e.icon ?? "", (i) => this._updateItem(e.id, { icon: i || void 0 }), {
      // The entity's own glyph, so leaving the box empty is visibly a
      // choice rather than a blank.
      placeholder: this._itemDefaultIcon(e),
      title: t
    })}
      </div>
      ${e.stateColor?.length ? f`<p class="hint rule-note">Shown while no rule below names an icon of its own.</p>` : m}
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
    return f`
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
        ${i ? t : m}
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
    const t = Fe(e), i = (r) => this._updateItem(e.id, {
      readings: r.length ? r : void 0,
      secondaryEntity: void 0,
      secondaryAttribute: void 0,
      // `badgeEntity: "secondary"` meant index 0, which is where the legacy
      // pair still is — restate it as the index so the old spelling does not
      // outlive the keys it referred to.
      ...e.badgeEntity === "secondary" ? { badgeEntity: 0 } : {}
    }), n = (r, o) => i(t.map((a, s) => s === r ? { ...a, ...o } : a));
    return f`
      <div class="row wide">
        <label title="Further entities and attributes whose readings join this device's label line"
          >Other entities</label
        >
      </div>
      ${t.map(
      (r, o) => f`
          <div class="row wide item-reading">
            ${this._renderEntityPicker(
        r.entity ?? "",
        (a) => n(o, { entity: a || void 0 }),
        void 0,
        // Scoped to the room the device sits in, exactly as its own
        // entity picker is — an extra reading is as likely to come from
        // the same room as the first one.
        this._areaEntitiesAt(e.x, e.y)?.entities
      )}
            ${this._renderAttributePicker(
        r.entity || e.entity,
        r.attribute ?? "",
        (a) => n(o, { attribute: a || void 0 }),
        "Read this attribute instead of the state — with no entity beside it, from this device's own entity"
      )}
            <button
              class="rule-remove"
              aria-label="Remove entity"
              title="Remove this entity"
              @click=${() => i(t.filter((a, s) => s !== o))}
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
                .checked=${r.showState !== !1}
                @change=${(a) => n(o, {
        // `true` is the default, so it stays out of the YAML.
        showState: a.target.checked ? void 0 : !1
      })}
              />
              Show on label
            </label>
            <span class="hint"
              >${r.showState === !1 ? "Bound but not printed — the badge can still read it." : "Its value joins the label line."}</span
            >
          </div>
        `
    )}
      <div class="row wide state-color-add">
        <button @click=${() => i([...t, {}])}>
          <ha-icon icon="mdi:plus"></ha-icon>Add entity
        </button>
      </div>
      ${t.length ? f`<p class="hint rule-note">
            These show whether or not the device's own "Show state" above is on
            — that toggle is about the device's entity, not about these. Use
            each row's own "Show on label" to keep one bound without printing it.
          </p>` : m}
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
    const n = e ?? [], r = (o, a) => {
      const s = n.map((l, c) => c === o ? { ...l, ...a } : l);
      t(s);
    };
    return f`
      <div class="row wide state-colors">
        <label
          title=${i?.icons ? "Color the badge — and optionally swap its icon — by what the entity reads" : "Color the element by what its entity reads"}
          >${i?.icons ? "Color & icon by state" : "Color by state"}</label
        >
      </div>
      ${n.map((o, a) => {
      const s = typeof o.state == "string" ? "state" : typeof o.above == "number" ? "above" : "else";
      return f`
          <div class="row wide state-color-rule">
            <select
              .value=${s}
              title="When this rule applies"
              @change=${(l) => {
        const c = l.target.value;
        r(a, {
          above: c === "above" ? o.above ?? 0 : void 0,
          state: c === "state" ? o.state ?? "" : void 0
        });
      }}
            >
              <option value="above">above</option>
              <option value="state">state is</option>
              <option value="else">otherwise</option>
            </select>
            ${s === "above" ? f`<input
                  type="number"
                  class="cond"
                  .value=${String(o.above ?? 0)}
                  @change=${(l) => r(a, { above: Number(l.target.value) || 0 })}
                />` : s === "state" ? f`<input
                    type="text"
                    class="cond"
                    placeholder="on"
                    .value=${o.state ?? ""}
                    @change=${(l) => r(a, { state: l.target.value })}
                  />` : f`<span class="cond hint">any other value</span>`}
            <input
              type="color"
              .value=${this._swatchValue(o.color, "#ff0000")}
              @input=${(l) => r(a, { color: l.target.value })}
            />
            <input
              type="text"
              class="rule-color-text"
              placeholder="red"
              .value=${o.color ?? ""}
              @change=${(l) => r(a, { color: l.target.value })}
            />
            ${this._renderPalettePicker(o.color, (l) => r(a, { color: l ?? "" }))}
            ${i?.icons ? (
        // Empty means "keep the device's icon", so the device's icon is
        // the placeholder — the rule shows what leaving it blank gives
        // you, and colour-only rules need no icon at all (issue #127).
        this._renderIconPicker(o.icon ?? "", (l) => r(a, { icon: l || void 0 }), {
          placeholder: i.iconPlaceholder,
          title: "Icon while this rule matches — empty keeps the device's own"
        })
      ) : m}
            <button
              class="rule-remove"
              aria-label="Remove rule"
              title="Remove this rule"
              @click=${() => {
        const l = n.filter((c, h) => h !== a);
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
    const e = this._selection[0], t = this._floor(), i = e.kind === "item" ? t.items.find((r) => r.id === e.id) : e.kind === "furniture" ? t.furniture.find((r) => r.id === e.id) : void 0;
    if (!i) return;
    const n = ko(t, i.x, i.y);
    if (Ur(n))
      return en(this.hass, n.haArea).length ? n.id : void 0;
  }
  _areaEntitiesAt(e, t) {
    const i = ko(this._floor(), e, t);
    return Ur(i) ? { entities: en(this.hass, i.haArea), name: i.name } : void 0;
  }
  /** Every entity in `area`'s linked HA area not already placed as an item on this floor. */
  _pendingAreaEntities(e) {
    if (!e.haArea) return [];
    const t = new Set(this._floor().items.map((i) => i.entity));
    return en(this.hass, e.haArea).filter((i) => !t.has(i));
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
    const i = ym(e.points, t.length), n = t.map((r, o) => {
      const a = po(r);
      return {
        id: Y("item"),
        entity: r,
        x: Math.round(i[o].x),
        y: Math.round(i[o].y),
        kind: a,
        showState: a === "sensor",
        showIcon: !0,
        size: Be
      };
    });
    this._commitFloor({ items: [...this._floor().items, ...n] }), this._selection = n.map((r) => ({ kind: "item", id: r.id }));
  }
  /** Patch a single field on one of a tracker's sensor sub-objects (X / Y axis). */
  _updateTrackerSensor(e, t, i) {
    const n = (this._floor().trackers ?? []).find((o) => o.id === e);
    if (!n) return;
    if (i === null) {
      this._updateTracker(e, { [t]: void 0 });
      return;
    }
    const r = n[t] ?? { entity: "", min: 0, max: 5 };
    this._updateTracker(e, { [t]: { ...r, ...i } });
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
        const n = t.texts.find((r) => r.id === e.id)?.text ?? "";
        return n ? `Text · “${n.length > 24 ? `${n.slice(0, 24)}…` : n}”` : "Text";
      }
      case "furniture": {
        const i = t.furniture.find((r) => r.id === e.id);
        if (!i) return "Furniture";
        const n = Km(i.type, this._symbols());
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
    const r = [];
    for (let o = 0; o <= e; o += i)
      r.push(_`<line x1=${o} y1="0" x2=${o} y2=${t} class="grid" />`);
    for (let o = 0; o <= t; o += i)
      r.push(_`<line x1="0" y1=${o} x2=${e} y2=${o} class="grid" />`);
    return this._gridCache = { key: n, lines: r }, r;
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
      t = "Wall", i = f`
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
      t = "Tracker", i = f`
        <span class="ctx-hint"
          >Drag on the canvas to draw the tracked area; bind one or two
          distance sensors in the Element editor.</span
        >
      `;
    else if (e === "area") {
      t = "Area";
      const n = this._draftArea?.points.length ?? 0;
      i = f`
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
      t = e === "door" ? "Door" : "Window", i = f`
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
      i = n === 0 ? f`<span class="ctx-hint"
              >Click an element to select it, or drag a box to select several.</span
            >` : f`
              <span class="ctx-count">${n} selected</span>
              <span class="ctx-hint">Properties and actions are in the Element section below.</span>
            `;
    }
    return f`
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
    const e = this._snapMode, t = Zr(this._config.snap, this.grid), i = [
      { id: "grid", label: "On" },
      { id: "off", label: "Off" },
      { id: "custom", label: "Custom" }
    ], n = e === "grid" ? `Snapping to the ${this.grid}-unit grid.` : e === "off" ? "No snapping — free placement." : `Snap = ${t}% of grid (${this._resolvedSnap} units).`;
    return f`
      <span class="ctx-field-label">Snap</span>
      <div class="seg" role="group" aria-label="Snap mode">
        ${i.map(
      (r) => f`
            <button
              class=${e === r.id ? "active" : ""}
              aria-pressed=${e === r.id}
              title=${r.id === "grid" ? "Snap to the grid" : r.id === "off" ? "Free placement" : "Custom step (% of grid)"}
              @click=${() => this._setSnapMode(r.id)}
            >
              ${r.label}
            </button>
          `
    )}
      </div>
      ${e === "custom" ? f`<input
              class="num"
              type="number"
              min="1"
              step="5"
              .value=${String(t)}
              title="Custom snap step, as a percentage of the grid"
              @change=${(r) => {
      const o = Math.max(
        1,
        Number(r.target.value) || Yr
      );
      this._patchConfig({ snap: Ji(o, this.grid) });
    }}
            /><span class="ctx-field-label">%</span>` : m}
      <span class="ctx-hint">${n}</span>
    `;
  }
  render() {
    if (!this._config) return f`${m}`;
    const e = this._config, t = this._floor(), i = e.floors ?? [], n = ir(e.overlayScale), r = this._scopingAreaId(), o = e.showDeadSpaces ? xa(t.walls, t.openings) : [], a = t.items.some((l) => l.glow) ? Jn(t.walls, t.openings, (l) => {
      const c = (h) => We(l, h ? this.hass?.states[h] : void 0);
      return Ta(
        l,
        c(l.entity),
        l.secondaryEntity && fi(l) ? We(
          ar(l),
          this.hass?.states[l.secondaryEntity]
        ) : void 0,
        l.shutterEntity ? Oe(this.hass?.states[l.shutterEntity], l.shutterInvert) : void 0,
        Ae(l) > 2 && l.extraEntities ? l.extraEntities.map((h) => c(h || l.entity)) : void 0
      );
    }) : t.walls, s = !t.walls.length && !t.openings.length && !t.items.length && !t.texts.length && !t.furniture.length && !(t.trackers ?? []).length && !(t.areas ?? []).length;
    return f`
      <div
        class="editor ${this._fullscreen ? "fullscreen" : ""}"
        popover=${this._fullscreen ? "manual" : m}
        @pointerdown=${this._onEditorPointerDown}
      >
        ${this._floorMenuOpen || this._addMenuOpen ? f`<div
              class="pop-backdrop"
              @click=${() => {
      this._floorMenuOpen = !1, this._addMenuOpen = !1, this._addQuery = "";
    }}
            ></div>` : m}
        <div class="toolbar">
          <!-- Tools — modes; exactly one is active at a time -->
          <div class="seg" role="group" aria-label="Tool">
            ${["select", "wall", "door", "window", "tracker", "area"].map(
      (l) => f`
                <button
                  class=${this._tool === l ? "active" : ""}
                  aria-pressed=${this._tool === l}
                  title=${rn[l].label}
                  @click=${() => {
        this._tool = l, this._draft = null, this._draftTracker = null, this._draftArea = null, this._areaHover = null;
      }}
                >
                  <ha-icon icon=${rn[l].icon}></ha-icon>${rn[l].label}
                </button>`
    )}
          </div>

          <span class="divider"></span>

          <!-- Expand: break out of HA's narrow config dialog into a full-screen
               workspace. Kept next to the tools so it's reachable even when the
               toolbar wraps at dialog width. -->
          ${this.panelMode ? f`<button
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
              </button>${this.panelError ? f`<span class="apply-error">${this.panelError}</span>` : m}` : f`<button
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
          ${this._applyError ? f`<span class="apply-error">${this._applyError}</span>` : m}

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
            ${this._addMenuOpen ? this._renderAddMenu() : m}
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
      (l) => f`<option value=${l.id} .selected=${l.id === this._activeFloorId}>${l.name}</option>`
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
            ${this._floorMenuOpen ? f`<div class="pop">
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
                </div>` : m}
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
          style=${this._fullscreen ? m : `aspect-ratio:${D(e.width, rt)} / ${D(e.height, Ht)};`}
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
               style="aspect-ratio: ${D(e.width, rt)} / ${D(
      e.height,
      Ht
    )}; width:${this._zoom * 100}%;
                   --fp-plan-w: ${D(e.width, rt)};${Rl(
      e.skin
    )}${gs(e.palette)}">
            <!-- Keyed on the skin and the palette, for the repaint reason
                 documented on the card's SVG (issue #122): a var() inside a
                 presentation attribute does not repaint when the custom
                 property changes, so without this the canvas kept the previous
                 skin's doors and room fills — and, since issue #265, would show
                 a palette colour's old value while you were editing it. -->
            ${sa(
      `${e.skin ?? ""}|${ys(e.palette)}`,
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
                fill=${e.background ?? Oi}
              />
              ${t.image ? _`<image href=${t.image} x="0" y="0" width=${e.width} height=${e.height}
                            preserveAspectRatio=${as(t.imageFit)}
                            opacity=${t.imageOpacity ?? 1} />` : m}
              ${this._renderGrid()}
              ${ke(
        t.areas ?? [],
        (l, c) => l.id || c,
        (l) => this._renderAreaSel(l, r)
      )}
              <!-- Dead spaces (issue #88), same layer position as the card so
                   what you draw is what you get. Live while you draw: closing
                   the last wall of a shaft hatches it, and dropping a door into
                   it clears the hatching again — which is the fastest way to
                   see that the card agrees with you about what is sealed. -->
              ${o.length ? _`${ls(`${this._wallMaskId}-dead`)}
                      ${o.map(
        (l) => cs(l, `${this._wallMaskId}-dead`)
      )}` : m}
              <!-- Light pools (issue #6), same layer position as the card so
                   what you place is what you get. Previewed at full strength
                   with no hass in the editor, so the radius is adjustable
                   without having to turn the real light on. -->
              ${Ma(
        t.furniture,
        e.width,
        e.height,
        `${this._wallMaskId}-glowmask`,
        this._symbols()
      )}
              <g class="fp-glows"
                 mask=${t.furniture.length ? `url(#${this._wallMaskId}-glowmask)` : m}>
                ${t.items.map((l, c) => {
        if (!l.glow) return m;
        const h = ku(l, this.hass?.states[l.entity]);
        return h ? Ia(l, h, `${this._wallMaskId}-glow-${c}`, a) : m;
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
                                  r=${D(l.glowRadius, Li)} />` : m
      )}
              ${t.furniture.map((l) => this._renderFurnitureSel(l))}
              ${ss(t.openings, e.width, e.height, this._wallMaskId)}
              ${t.walls.map((l) => this._renderWall(l))}
              <!-- Room outlines, same layer position as the card so what you
                   place is what you get. Only a static borderColor draws here,
                   there being no hass to resolve a live color from — but the
                   clip ids are passed anyway, so wiring a live preview in later
                   cannot silently land on the unclipped path. -->
              <g mask=${`url(#${this._wallMaskId})`}>
                ${(t.areas ?? []).map(
        (l, c) => hs(l, void 0, `${this._wallMaskId}-area-${c}`)
      )}
              </g>
              ${ke(
        // Keyed by id: switching floors must create fresh DOM. Reused
        // nodes would CSS-transition from the previous floor's opening
        // state — a window briefly plays a door swing (issue #50).
        t.openings,
        (l, c) => l.id || c,
        (l) => this._renderOpeningSel(l)
      )}
              ${ke(
        t.trackers ?? [],
        (l, c) => l.id || c,
        (l) => this._renderTrackerSel(l)
      )}
              ${this._draftTracker ? _`<rect class="tracker-draft"
                              x=${Math.min(this._draftTracker.x0, this._draftTracker.x1)}
                              y=${Math.min(this._draftTracker.y0, this._draftTracker.y1)}
                              width=${Math.abs(this._draftTracker.x1 - this._draftTracker.x0)}
                              height=${Math.abs(this._draftTracker.y1 - this._draftTracker.y0)}
                              rx="4" />` : m}
              ${this._draft ? _`<g class="fp-wall-neon"><line x1=${this._draft.x1} y1=${this._draft.y1}
                              x2=${this._draft.x2} y2=${this._draft.y2}
                              class="wall draft" mask=${`url(#${this._wallMaskId})`}
                              stroke-width=${G} /></g>` : m}
              ${this._renderAreaDraft()}
              ${this._guides.map(
        (l) => l.axis === "x" ? _`<line class="fp-guide" x1=${l.value} x2=${l.value} y1="0" y2=${e.height} />` : _`<line class="fp-guide" y1=${l.value} y2=${l.value} x1="0" x2=${e.width} />`
      )}
              ${this._marquee ? _`<rect x=${Math.min(this._marquee.x0, this._marquee.x1)}
                              y=${Math.min(this._marquee.y0, this._marquee.y1)}
                              width=${Math.abs(this._marquee.x1 - this._marquee.x0)}
                              height=${Math.abs(this._marquee.y1 - this._marquee.y0)}
                              class="marquee" />` : m}
            </svg>`
    )}
            <div class="items">
              ${t.texts.map((l) => this._renderTextOverlay(l, e, n))}
              ${t.openings.filter((l) => Za(l)).map((l) => this._renderShutterMarkOverlay(l, e, n))}
              ${t.openings.filter((l) => Ja(l)).map((l) => this._renderOpeningMarkOverlay(l, e, n))}
              ${t.items.map((l) => this._renderItemOverlay(l, e, n))}
            </div>
          </div>
        </div>
        ${s && !this._draft && !this._draftTracker && !this._draftArea ? f`<div class="empty-hint">
              <div>
                <b>Draw your first room:</b> pick the <b>Wall</b> tool and drag on the canvas.<br />
                Then drop doors, windows and devices onto it.
              </div>
            </div>` : m}
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
    return customElements.get("ha-form") ? f`<ha-form
        .hass=${this.hass}
        .data=${e.data}
        .schema=${e.fields}
        .computeLabel=${vg}
        .computeHelper=${_g}
        @value-changed=${(i) => {
      i.stopPropagation();
      const n = qm(e.data, i.detail.value, e.fields), r = Oo(n, e.fields), o = Object.keys(r);
      if (!o.length) return;
      const a = o.length === 1 && Mo(e.fields.find((s) => s.name === o[0]));
      t(e.toPatch(r), a);
    }}
      ></ha-form>` : f`${e.fields.map((i) => this._renderFallbackField(e, i, t))}`;
  }
  _applyFallback(e, t, i, n, r) {
    const o = Oo({ [t.name]: i }, e.fields);
    t.name in o && r(e.toPatch(o), n && Mo(t));
  }
  /** One plain-input row per schema field — the outside-HA / load-failure path. */
  _renderFallbackField(e, t, i) {
    const n = e.data[t.name], r = t.selector;
    if ("select" in r) {
      const o = r.select, a = o.options;
      if (o.custom_value) {
        const s = `sel-${t.name}-${a.length}`;
        return f`<div class="row wide">
          <label>${t.label}</label>
          <input
            type="text"
            list=${s}
            .value=${String(n ?? "")}
            @change=${(l) => this._applyFallback(e, t, l.target.value, !1, i)}
          />
          <datalist id=${s}>
            ${a.map((l) => f`<option value=${l.value}></option>`)}
          </datalist>
        </div>`;
      }
      return f`<div class="row">
        <label>${t.label}</label>
        <select
          .value=${String(n ?? "")}
          @change=${(s) => this._applyFallback(e, t, s.target.value, !1, i)}
        >
          ${a.map(
        (s) => f`<option value=${s.value} ?selected=${s.value === n}>${s.label}</option>`
      )}
        </select>
      </div>`;
    }
    if ("boolean" in r)
      return f`<div class="row">
        <label>${t.label}</label>
        <input
          type="checkbox"
          .checked=${!!n}
          @change=${(o) => this._applyFallback(e, t, o.target.checked, !1, i)}
        />
      </div>`;
    if ("number" in r) {
      const o = r.number, a = o.mode === "slider";
      return f`<div class="row">
        <label>${t.label}</label>
        ${a ? f`<input
              type="range"
              min=${o.min ?? 0}
              max=${o.max ?? 100}
              step=${o.step ?? 1}
              .value=${String(n ?? o.min ?? 0)}
              @input=${(s) => this._applyFallback(e, t, Number(s.target.value), !0, i)}
            />` : m}
        <input
          class="num"
          type="number"
          min=${o.min ?? m}
          max=${o.max ?? m}
          step=${o.step ?? m}
          .value=${String(n ?? "")}
          @change=${(s) => {
        const l = s.target;
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
    if ("entity" in r) {
      const o = r.entity;
      return f`<div class="row wide">
        <label>${t.label}</label>
        ${this._renderEntityPicker(
        String(n ?? ""),
        (a) => this._applyFallback(e, t, a, !1, i),
        o.filter?.[0]?.domain,
        o.include_entities
      )}
      </div>`;
    }
    return "icon" in r ? f`<div class="row wide">
        <label>${t.label}</label>
        <input
          type="text"
          placeholder=${r.icon.placeholder ?? "mdi:…"}
          .value=${String(n ?? "")}
          @change=${(o) => this._applyFallback(e, t, o.target.value, !1, i)}
        />
      </div>` : "ui_action" in r ? f`${m}` : f`<div class="row">
      <label>${t.label}</label>
      <input
        type="text"
        .value=${String(n ?? "")}
        @input=${(o) => this._applyFallback(e, t, o.target.value, !0, i)}
      />
    </div>`;
  }
  _renderEntityPicker(e, t, i, n) {
    return customElements.get("ha-entity-picker") ? f`<ha-entity-picker
        .hass=${this.hass}
        .value=${e}
        .includeDomains=${i}
        .includeEntities=${n}
        allow-custom-entity
        @value-changed=${(r) => t(r.detail.value ?? "")}
      ></ha-entity-picker>` : f`<input
      type="text"
      placeholder="sensor.example"
      .value=${e}
      @change=${(r) => t(r.target.value)}
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
    return customElements.get("ha-entity-attribute-picker") && e ? f`<ha-entity-attribute-picker
        class="reading-attr"
        .hass=${this.hass}
        .entityId=${e}
        .value=${t}
        allow-custom-value
        title=${n ?? m}
        @value-changed=${(r) => i(r.detail.value ?? "")}
      ></ha-entity-attribute-picker>` : f`<input
      type="text"
      class="reading-attr"
      placeholder="attribute"
      title=${n ?? m}
      .value=${t}
      @change=${(r) => i(r.target.value)}
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
    return customElements.get("ha-icon-picker") ? f`<ha-icon-picker
        class="rule-icon"
        .hass=${this.hass}
        .value=${e}
        placeholder=${i?.placeholder ?? "Icon"}
        title=${i?.title ?? m}
        @value-changed=${(n) => t(n.detail.value ?? "")}
      ></ha-icon-picker>` : f`<input
      type="text"
      class="rule-icon"
      placeholder=${i?.placeholder ?? "mdi:blinds"}
      title=${i?.title ?? m}
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
    }, t = this._symbols(), i = xs(t).filter((o) => ru(o, this._addQuery)), n = !this._addQuery.trim();
    let r = "";
    return f`
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
            @input=${(o) => {
      this._addQuery = o.target.value;
    }}
            @keydown=${(o) => {
      o.key === "Escape" && this._addQuery && (o.stopPropagation(), this._addQuery = "");
    }}
          />
        </div>
        <div class="add-furn-scroll">
          ${i.length ? i.map((o) => {
      const a = n && o.category !== r ? o.category : "";
      return r = o.category, f`${a ? f`<div class="furn-group">${a}</div>` : m}
                  ${this._renderFurnCell(o, e)}`;
    }) : f`<div class="furn-empty">No symbol matches “${this._addQuery}”</div>`}
        </div>
      </div>
    `;
  }
  /** One picker cell: the symbol drawn at its own default size, plus its name. */
  _renderFurnCell(e, t) {
    const { w: i, h: n } = e.size, r = Math.max(i, n) * 0.25 + 6, o = `${-i / 2 - r} ${-n / 2 - r} ${i + r * 2} ${n + r * 2}`;
    return f`
      <button
        class="furn-cell"
        title=${e.name}
        @click=${() => {
      this._addFurniture(e.id), t();
    }}
      >
        <svg viewBox=${o}>
          ${$n(
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
      return f`
        <section class="edit-area">
          <h3 class="section-title">Element</h3>
          <p class="hint">Select an element on the canvas to edit its properties here.</p>
        </section>
        ${this._renderTemplates()}
      `;
    const i = e > 1 ? `${e} elements selected` : this._selectionSummary(t), n = e > 1 ? "mdi:select-group" : wg[t.kind];
    return f`
      <section class="edit-area">
        <div class="edit-head">
          <ha-icon icon=${n}></ha-icon>
          <span class="edit-title" title=${i}>${i}</span>
          <span class="head-spacer"></span>
          ${(() => {
      const r = this._floor(), o = this._selection.every((a) => At(r, a));
      return f`<button
              class=${o ? "on" : ""}
              aria-label=${o ? "Unlock" : "Lock in place"}
              aria-pressed=${o ? "true" : "false"}
              title=${o ? "Unlock — let it be dragged again" : "Lock in place — it can still be selected and edited, just not moved"}
              @click=${() => this._setLocked(!o)}
            >
              <ha-icon icon=${o ? "mdi:lock" : "mdi:lock-open-variant-outline"}></ha-icon>
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
        ${e > 1 ? f`<p class="hint">
              Edit elements one at a time. Drag any selected element to move the whole group.
            </p>` : f`${this._renderAreaScopeHint()}
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
              style=${Ra(e.thickness)} stroke-linecap="round" /></g>
        ${i ? _`
                <circle cx=${e.x1} cy=${e.y1} r="9" class="handle"
                        @pointerdown=${(n) => this._startDrag(n, { kind: "wall", id: e.id }, 1)} />
                <circle cx=${e.x2} cy=${e.y2} r="9" class="handle"
                        @pointerdown=${(n) => this._startDrag(n, { kind: "wall", id: e.id }, 2)} />` : m}
      </g>`;
  }
  _renderOpeningSel(e) {
    const t = this._isSel("opening", e.id);
    return _`
      <g class="opening-hit"
         @pointerdown=${(i) => this._startDrag(i, { kind: "opening", id: e.id })}>
        ${ns(e, {
      color: t ? "var(--primary-color, #03a9f4)" : Hn,
      // The closed colour previews here too (issue #228) — unless this is
      // the selected opening, whose whole symbol goes blue to show that.
      inactive: t ? void 0 : e.inactiveColor,
      open: or(e),
      // Draw sliding / rolling openings partly open in the editor so the
      // motion is visible — closed, both look like a plain band, which
      // would make the Motion / Slide / Style controls appear inert.
      amount: Z(e) !== "swing" ? 0.55 : void 0,
      // Shutter previewed half-rolled so the layer is visible while
      // configuring, whatever the live state.
      shutter: e.shutterEntity ? { amount: 0.55, style: ot(e), flip: e.shutterFlipV } : void 0
    })}
      </g>`;
  }
  /**
   * Render a Tracker in the editor SVG with its zone outline visible (so the
   * user can grab/resize it) plus a hit overlay for drag-to-move and a dashed
   * selection rectangle when active.
   */
  _renderTrackerSel(e) {
    const t = this._isSel("tracker", e.id), i = _i(this.hass?.states, e.xSensor?.entity), n = _i(this.hass?.states, e.ySensor?.entity), r = pi(this.hass?.states, e.xSensor?.presence), o = pi(this.hass?.states, e.ySensor?.presence);
    return _`
      <g class="tracker-hit ${t ? "selected" : ""}"
         @pointerdown=${(a) => this._startDrag(a, { kind: "tracker", id: e.id })}>
        ${ps(e, {
      editing: !0,
      xReading: i,
      yReading: n,
      xPresent: r,
      yPresent: o
    })}
        <rect x=${e.x} y=${e.y} width=${e.w} height=${e.h}
              transform="rotate(${e.angle ?? 0} ${e.x + e.w / 2} ${e.y + e.h / 2})"
              class="tracker-hit-rect" />
        ${t ? _`<rect x=${e.x - 4} y=${e.y - 4}
                        width=${e.w + 8} height=${e.h + 8}
                        transform="rotate(${e.angle ?? 0} ${e.x + e.w / 2} ${e.y + e.h / 2})"
                        class="tracker-outline" />` : m}
      </g>`;
  }
  _renderFurnitureSel(e) {
    const t = this._isSel("furniture", e.id);
    return _`
      <g class="furn-hit ${t ? "selected" : ""}"
         @pointerdown=${(i) => this._startDrag(i, { kind: "furniture", id: e.id })}>
        ${$n(e, void 0, this._symbols())}
        ${t ? _`<rect x=${e.x - e.w / 2 - 4} y=${e.y - e.h / 2 - 4}
                        width=${e.w + 8} height=${e.h + 8}
                        transform="rotate(${e.angle ?? 0} ${e.x} ${e.y})"
                        class="furn-outline" />` : m}
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
    if (!e) return m;
    const t = (this._floor().areas ?? []).find((n) => n.id === e), i = t?.name ? t.name : "this area";
    return f`<p class="hint area-scope-hint">
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
    const i = this._isSel("area", e.id), n = e.id === t, r = e.points.map((o) => `${o.x},${o.y}`).join(" ");
    return _`
      <g class="area-hit ${i ? "selected" : ""} ${n ? "scoping" : ""}">
        ${n ? _`<polygon points=${r} class="area-scoping" />` : m}
        ${ds(e)}
        <polygon points=${r} class="area-hit-shape"
                 @pointerdown=${(o) => this._startDrag(o, { kind: "area", id: e.id })} />
        ${i ? _`<polygon points=${r} class="area-outline" />` : m}
        ${// Outline yes, vertex handles no, for a pinned room — same reasoning
    // as the wall's endpoints (issue #191): still visibly selected, with
    // nothing on it that pretends to be draggable.
    i && !e.locked ? e.points.map(
      (o, a) => _`
                  <circle cx=${o.x} cy=${o.y} r="7" class="handle"
                          @pointerdown=${(s) => this._startDrag(s, { kind: "area", id: e.id }, void 0, a)} />`
    ) : m}
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
    if (!e) return m;
    const t = e.points, i = t.map((a) => `${a.x},${a.y}`).join(" "), n = t[t.length - 1], r = t.length >= 3, o = this._areaHover;
    return _`
      <g class="area-draft">
        ${t.length > 1 ? _`<polyline points=${i} class="area-draft-line" />` : m}
        ${o ? _`<line x1=${n.x} y1=${n.y} x2=${o.x} y2=${o.y}
                        class="area-draft-hover" />` : m}
        ${t.map(
      (a, s) => s === 0 && r ? _`<circle cx=${a.x} cy=${a.y} r="9" class="area-draft-start" />` : _`<circle cx=${a.x} cy=${a.y} r="5" class="area-draft-point" />`
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
    const n = e.shutterEntity, r = this.hass?.states[n], o = Oe(r, e.shutterInvert) > 0, a = Qa(e, r, o, this.hass?.entities?.[n]?.icon), s = B(e.shutterActiveColor ?? e.activeColor) ?? W, l = cr(e), c = lr(e), h = j(gi, i), d = j(mi, i);
    return f`<div
      class="shutter-mark ${ei(r, e.shutterInvert) ? "on" : "off"}"
      style="left:${l.x / t.width * 100}%; top:${l.y / t.height * 100}%;
             width:${h};height:${h};
             transform:translate(-50%,-50%)
                       translate(calc(${c.x} * ${d}), calc(${c.y} * ${d}));
             --fp-active:${s};"
      title=${`${r?.attributes?.friendly_name ?? n} — shown on the card, tap it there to open the shutter`}
    >
      <ha-icon icon=${a} style="--mdc-icon-size:${j(
      yi,
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
    const n = e.entity, r = this.hass?.states[n], o = We(e, r) > 0, a = es(e, r, o, this.hass?.entities?.[n]?.icon), s = B(e.activeColor) ?? W, l = ts(e), c = is(e), h = j(gi, i), d = j(mi, i);
    return f`<div
      class="shutter-mark ${ii(e, r) ? "on" : "off"}"
      style="left:${l.x / t.width * 100}%; top:${l.y / t.height * 100}%;
             width:${h};height:${h};
             transform:translate(-50%,-50%)
                       translate(calc(${c.x} * ${d}), calc(${c.y} * ${d}));
             --fp-active:${s};"
      title=${`${r?.attributes?.friendly_name ?? n} — shown on the card, tap it there to open its dialog`}
    >
      <ha-icon icon=${a} style="--mdc-icon-size:${j(
      yi,
      i
    )};"></ha-icon>
    </div>`;
  }
  _renderItemOverlay(e, t, i) {
    const n = this._isSel("item", e.id), r = e.entity ? this.hass?.states[e.entity] : void 0, o = gn(e, r, e.entity ? this.hass?.entities?.[e.entity]?.icon : void 0), { text: a, live: s } = Mu(this.hass, e), l = D(e.size, Be), c = Bt(e) !== "none", h = e.display ?? "badge", d = nr(e, r), p = B(Hi(e.stateColor, d)), g = Na(e, p), y = Bt(e) === "value" ? Wa(this.hass, e) : void 0, b = Ce(e.entity, r?.state), v = b ? B(e.activeColor) ?? Ea(r) : void 0, x = !!this.hass && yn(e, r?.state), A = b || x ? void 0 : B(e.inactiveColor), u = la(
      ni(p ?? v ?? A, this._config?.palette)
    ), $ = e.rippleColor ?? p ?? v ?? W, k = e.rippleSize ?? Pi, O = e.rippleDirection ?? Fi, T = e.rippleWidth ?? Ni, H = Da(e, r?.state, r?.attributes), V = j(l, i), z = f`<div
      class="badge ${c ? "" : "ghost"} ${p ? "state-colored" : b ? "active-colored" : A ? "inactive-colored" : ""}"
      style="width:${V};height:${V};transform:rotate(${D(e.angle, 0)}deg);${p ? `--fp-state:${p};` : ""}${v ? `--fp-active:${v};` : ""}${A ? `--fp-inactive:${A};` : ""}${u ? `--fp-ink:${u};` : ""}"
    >
      ${y ? f`<span
            class="badge-value"
            style="font-size:${j(Ga(l, y), i)};"
            >${y}</span
          >` : f`<ha-icon
            class=${H ? `anim-${H}` : ""}
            icon=${o}
            style="--mdc-icon-size:${j(Ba(l), i)};"
          ></ha-icon>`}
    </div>`;
    let P;
    h === "ripple" ? P = vi(!0, $, k, O, T, 3, i) : h === "iconRipple" ? P = f`<div class="stack">
        ${vi(!0, $, k, O, T, 3, i)}
        <div class="stack-icon">${z}</div>
      </div>` : P = z;
    const S = Oa(e, r?.state);
    return f`
      <div
        class="edit-item ${n ? "selected" : ""} ${S ? "card-hidden" : ""}"
        style="left:${e.x / t.width * 100}%; top:${e.y / t.height * 100}%;"
        @pointerdown=${(oe) => this._onOverlayDown(oe, { kind: "item", id: e.id })}
        @pointermove=${this._onOverlayMove}
        @pointerup=${this._onOverlayUp}
        @pointercancel=${this._onPointerCancel}
      >
        ${P}
        <!-- The card's own label line when there is one (issue #135), so
             turning Show state on is visible here rather than only after
             leaving the editor; otherwise the dim identification fallback.
             The Labels toolbar toggle hides either on dense plans (issue
             #52), and the size previews the card's labelSize (issue #59). -->
        ${this._hideLabels ? m : f`<span
            class="ilabel ${s ? "live" : ""} ilabel-${tr(e)}"
            style="font-size:${j(
      s || e.labelSize != null ? Fa(e.labelSize) : 11,
      i
    )};${s && g ? `color:${g};` : ""}"
            >${a}</span
          >`}
      </div>
    `;
  }
  _renderTextOverlay(e, t, i) {
    const n = this._isSel("text", e.id);
    return f`
      <div
        class="edit-text ${n ? "selected" : ""}"
        style="left:${e.x / t.width * 100}%; top:${e.y / t.height * 100}%;
               font-size:${j(D(e.size, Ot), i)};
               color:${le(e.color, da)};
               transform:translate(-50%,-50%) rotate(${D(e.angle, 0)}deg);"
        @pointerdown=${(r) => this._onOverlayDown(r, { kind: "text", id: e.id })}
        @pointermove=${this._onOverlayMove}
        @pointerup=${this._onOverlayUp}
        @pointercancel=${this._onPointerCancel}
      >
        ${Yn(this.hass, e) || "…"}
      </div>
    `;
  }
  _renderPanel() {
    return f`
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
          ${this._projectOpen ? m : f`<span class="section-summary"
                >${this._config.title || "Untitled"} · ${this._config.width}×${this._config.height}</span
              >`}
        </button>
        ${this._projectOpen ? this._renderPanelBody() : m}
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
    const e = this._config, t = (n) => this._patchConfig(n), i = pg(e);
    return f`
      <div class="rows panel-body">
        ${this._renderGroup(
      "Project",
      this._renderForm(lg(e), (n, r) => {
        "grid" in n && typeof n.grid == "number" && (n = { ...n, ...this._gridPatch(n.grid) }), r ? this._patchConfigLive(n) : this._patchConfig(n);
      })
    )}
        ${this._renderGroup(
      // The plan's own look: its palette, its paper, and the one drawing
      // convention that is a plan-wide choice rather than an element's.
      "Look",
      this._renderForm(hg(e), t),
      this._renderColorRow({
        label: "Background",
        value: e.background,
        swatch: "#ffffff",
        placeholder: "#ffffff or empty",
        onLive: (n) => this._patchConfigLive({ background: n }),
        onCommit: (n) => this._patchConfig({ background: n })
      }),
      this._renderForm(ug(e), t)
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
      this._renderForm(gg(this._floor()), (n, r) => {
        r ? this._patchFloorLive(n) : this._commitFloor(n);
      })
    )}
        ${this._renderGroup(
      // How the card is framed on the dashboard, as opposed to what is
      // drawn inside it. Set once for a surface and rarely touched again.
      "Display",
      this._renderForm(
        be(i, [
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
      this._renderForm(mg(e), t),
      e.sunlight ? f`${this._renderColorRow({
        label: "Sun color",
        title: "Color of the light the openings let in",
        value: e.sunlightColor,
        swatch: "#ffd9a0",
        placeholder: "(warm white)",
        onLive: (n) => this._patchConfigLive({ sunlightColor: n }),
        onCommit: (n) => this._patchConfig({ sunlightColor: n })
      })}
              ${e.sunShade === !1 ? m : this._renderColorRow({
        label: "Shade color",
        title: "Color of everywhere the light does not reach",
        value: e.sunShadeColor,
        swatch: "#000000",
        placeholder: "(black)",
        onLive: (n) => this._patchConfigLive({ sunShadeColor: n }),
        onCommit: (n) => this._patchConfig({ sunShadeColor: n })
      })}` : m
    )}
        ${this._renderGroup(
      // The other half of following the sun, and a separate switch: this
      // one dims the whole plan after dark rather than casting anything.
      "Night dimming",
      this._renderForm(fg(e), t)
    )}
        ${this._renderGroup(
      // How devices look and answer, plan-wide. "Offline devices" lived
      // under display, beside the card's rotation, which is not what it is
      // about.
      "Devices",
      this._renderForm(dg(e), t),
      this._renderForm(be(i, ["offlineStyle"]), t),
      this._renderForm(cg(e), t)
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
    const e = this._config.palette ?? [], t = (n) => this._patchConfig({ palette: n.length ? n : void 0 }), i = (n, r, o = !1) => {
      const a = e.map((s, l) => l === n ? { ...s, ...r } : s);
      o ? this._patchConfigLive({ palette: a }) : this._patchConfig({ palette: a });
    };
    return f`
      <div class="row col palette-panel">
        <label>Named colors</label>
        ${e.length ? m : f`<span class="hint"
              >Name a color here and every color field on the plan can point at it.</span
            >`}
        ${e.map(
      (n, r) => f`
            <div class="row wide palette-row">
              <input
                type="text"
                class="palette-name"
                placeholder="Warm"
                .value=${n.name ?? ""}
                @change=${(o) => this._renamePaletteColor(r, o.target)}
              />
              <input
                type="color"
                .value=${this._swatchValue(n.color, "#ff8800")}
                @input=${(o) => i(r, { color: o.target.value }, !0)}
              />
              <input
                type="text"
                class="palette-color"
                placeholder="#ff8800"
                .value=${n.color ?? ""}
                @change=${(o) => this._recolorPaletteColor(r, o.target)}
              />
              <button
                class="rule-remove"
                aria-label="Remove color"
                title="Remove this color; anything using it keeps the color it has now"
                @click=${() => this._removePaletteColor(r)}
              >
                <ha-icon icon="mdi:close"></ha-icon>
              </button>
            </div>
          `
    )}
        ${this._paletteError ? f`<div class="symbol-error">${this._paletteError}</div>` : m}
        ${e.length >= fs ? m : f`<div class="row wide state-color-add">
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
    const t = new Set(e.map((i) => te(i.name)));
    for (let i = 1; ; i++) {
      const n = `Color ${i}`;
      if (!t.has(te(n))) return n;
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
    const r = t.value.trim(), o = te(n.name), a = te(r);
    if (o === a) {
      if (this._paletteError = "", r === (n.name ?? "")) {
        t.value = r;
        return;
      }
      this._patchConfig({ palette: i.map((c, h) => h === e ? { ...c, name: r } : c) });
      return;
    }
    if (a && i.some((c, h) => h !== e && te(c.name) === a)) {
      this._paletteError = `Another color is already called “${r}”.`, t.value = n.name ?? "";
      return;
    }
    this._paletteError = "";
    const s = i.map((c, h) => h === e ? { ...c, name: r } : c), l = { ...this._config, palette: s };
    this._patchConfig(
      // Same shadowing caveat as delete: if another entry still declares the old
      // slug, its references are none of this rename's business.
      this._slugStillResolves(o, l) ? l : (
        // An empty new name leaves the entry unusable, so its references have
        // nothing to point at — freeze them at the colour, as a delete does.
        wo(l, o, a ? _o(r) : n.color)
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
    const r = t.value.trim();
    if (!B(r)) {
      this._paletteError = r ? `“${r}” is not a color the card can use.` : "A named color needs a color. Use the remove button to take the name away.", t.value = n.color ?? "";
      return;
    }
    this._paletteError = "", this._patchConfig({ palette: i.map((o, a) => a === e ? { ...o, color: r } : o) });
  }
  _removePaletteColor(e) {
    const t = this._config.palette ?? [], i = t[e];
    if (!i) return;
    this._paletteError = "";
    const n = t.filter((o, a) => a !== e), r = { ...this._config, palette: n.length ? n : void 0 };
    this._patchConfig(
      this._slugStillResolves(te(i.name), r) ? r : wo(r, te(i.name), i.color)
    );
  }
  /** Whether a slug is still declared by the palette in `config`. */
  _slugStillResolves(e, t) {
    return e ? jt(t.palette).some((i) => te(i.name) === e) : !1;
  }
  _renderSymbolsPanel() {
    const e = Object.keys(this._config.symbols ?? {});
    return f`
      <div class="row col symbols-panel">
        ${e.length ? f`<div class="symbol-list">
              ${e.map(
      (t) => f`
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
            </div>` : m}
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
        ${this._symbolError ? f`<div class="symbol-error">${this._symbolError}</div>` : m}
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
    if (!e || this._selection.length !== 1) return f`${m}`;
    if (e.kind === "opening") {
      const t = this._floor().openings.find((o) => o.id === e.id);
      if (!t) return f`${m}`;
      const i = Gm(t, (o) => this._supportedFeatures(o)), n = (o, a) => {
        if ("entity" in o) {
          const s = o.entity, l = s ? this.hass?.states[s]?.attributes?.device_class : void 0;
          o = { ...o, ...l ? sf(l) : {} };
        }
        this._applyElementPatch("opening", t.id, o, a);
      }, r = (o, a, ...s) => {
        const l = be(i, a);
        return !l.fields.length && !s.some((c) => c && c !== m) ? m : this._renderGroup(o, this._renderForm(l, n), ...s);
      };
      return f`
        ${I.OPENING_GROUPS.map(
        ([o, a]) => o === "Color" ? r(
          o,
          a,
          t.entity ? f`${this._renderColorRow({
            label: "Open color",
            title: "Leaf, sash and swing arc while this opening is open",
            value: t.activeColor,
            swatch: "#03a9f4",
            placeholder: "(primary)",
            onLive: (s) => this._updateOpeningLive(t.id, { activeColor: s }),
            onCommit: (s) => this._updateOpening(t.id, { activeColor: s })
          })}
                    ${this._renderColorRow({
            label: "Closed color",
            title: "Leaf, sash and swing arc while it is closed — the jambs stay the wall's color",
            value: t.inactiveColor,
            swatch: "#c62828",
            placeholder: "(wall)",
            onLive: (s) => this._updateOpeningLive(t.id, { inactiveColor: s }),
            onCommit: (s) => this._updateOpening(t.id, { inactiveColor: s })
          })}` : m
        ) : o === "Shutter" ? r(
          o,
          a,
          // The shutter's own accent, so an open shutter over a shut
          // window can read as a separate thing from the sash it
          // covers. Falls back to the opening's, hence the placeholder.
          t.shutterEntity ? this._renderColorRow({
            label: "Shutter color",
            title: "Shutter color while it is open",
            value: t.shutterActiveColor,
            swatch: t.activeColor ?? "#03a9f4",
            placeholder: t.activeColor ? "(active color)" : "(primary)",
            onLive: (s) => this._updateOpeningLive(t.id, { shutterActiveColor: s }),
            onCommit: (s) => this._updateOpening(t.id, { shutterActiveColor: s })
          }) : m
        ) : r(o, a)
      )}
      `;
    }
    if (e.kind === "item") {
      const t = this._floor().items.find((l) => l.id === e.id);
      if (!t) return f`${m}`;
      const i = this._areaEntitiesAt(t.x, t.y), n = t.entity ? this.hass?.states[t.entity]?.attributes?.device_class : void 0, r = (l) => (l ? this.hass?.states[l]?.attributes?.friendly_name : void 0) ?? l, o = {
        source: Ka(this.hass, t)?.source ?? "primary",
        primaryLabel: r(t.entity),
        // One label per reading, positionally — the dropdown names each rather
        // than numbering them, and a reading with no entity of its own is read
        // off this device, so that is the name to show for it (issue #180).
        readingLabels: Fe(t).map((l) => r(l.entity || t.entity))
      }, a = (l, c) => {
        "entity" in l && typeof l.entity == "string" && (l = { ...l, kind: po(l.entity) }), this._applyElementPatch("item", t.id, l, c);
      }, s = Jm(t, n);
      return f`
        ${this._renderGroup("Identity", this._renderForm(Ym(t), a))}
        ${this._renderGroup(
        "What it reads",
        // Entity, its attribute, whether its own state shows, then every
        // other entity — the order the label prints them in (issue #180).
        this._renderForm(Vm(t, i), a),
        this._renderForm(Zm(t), a),
        this._renderItemReadings(t)
      )}
        ${Iu(t) ? this._renderGroup(
        "Label",
        this._renderForm(Xm(t), a),
        t.disableLabelColor && t.useCustomLabelColor ? this._renderColorRow({
          label: "Custom color",
          value: t.labelCustomColor,
          swatch: "#ffffff",
          placeholder: "e.g. #ff0000 or red",
          onLive: (l) => this._updateItemLive(t.id, { labelCustomColor: l }),
          onCommit: (l) => this._updateItem(t.id, { labelCustomColor: l })
        }) : m
      ) : m}
        ${this._renderGroup(
        "Badge",
        this._renderForm(Qm(t, o), a),
        this._renderItemIconRow(t)
      )}
        ${this._renderGroup(
        "Color",
        t.stateColor?.length ? (
          // Colour by state supersedes the fixed active colour, so showing
          // both invites setting one and seeing the other. Say which one is
          // in charge instead of leaving a dead control on screen.
          f`<p class="hint rule-note">
                Colored by the state rules below — they replace the active and inactive colors.
              </p>`
        ) : f`${this._renderColorRow({
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
        ${s ? this._renderGroup(
        "Effects",
        this._renderForm(s, a),
        // The ring's colour belongs with the ring, not with the badge's.
        Ha(t.entity, n) && gr(t) ? this._renderColorRow({
          label: "Ripple color",
          value: t.rippleColor,
          swatch: t.activeColor ?? "#03a9f4",
          placeholder: t.activeColor ? "(active color)" : "(primary)",
          onLive: (l) => this._updateItemLive(t.id, { rippleColor: l }),
          onCommit: (l) => this._updateItem(t.id, { rippleColor: l })
        }) : m
      ) : m}
        ${this._renderGroup("Behaviour", this._renderForm(tg(t), a))}
        ${this._renderGroup("Visibility", this._renderForm(eg(t), a))}
      `;
    }
    if (e.kind === "text") {
      const t = this._floor().texts.find((i) => i.id === e.id);
      return t ? f`
        ${this._renderForm(
        ig(t, this._areaEntitiesAt(t.x, t.y)),
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
      ` : f`${m}`;
    }
    if (e.kind === "furniture") {
      const t = this._floor().furniture.find((r) => r.id === e.id);
      if (!t) return f`${m}`;
      const i = ng(t, this._areaEntitiesAt(t.x, t.y), this._symbols()), n = (r, o) => this._applyElementPatch("furniture", t.id, r, o);
      return f`
        ${I.FURNITURE_GROUPS.map(
        ([r, o]) => this._renderGroup(r, this._renderForm(be(i, o), n))
      )}
        ${this._renderGroup(
        "Color",
        this._renderColorRow({
          label: "Color",
          value: t.color,
          swatch: "#9e9e9e",
          placeholder: "(gray)",
          onLive: (r) => this._updateFurnitureLive(t.id, { color: r }),
          onCommit: (r) => this._updateFurniture(t.id, { color: r })
        }),
        // Without an entity there is nothing to condition a colour on.
        t.entity ? f`
                ${this._renderColorRow({
          label: "Active color",
          title: "Color while the entity is on",
          value: t.activeColor,
          swatch: "#03a9f4",
          placeholder: "(no change)",
          onLive: (r) => this._updateFurnitureLive(t.id, { activeColor: r }),
          onCommit: (r) => this._updateFurniture(t.id, { activeColor: r })
        })}
                ${this._renderStateColorRules(
          t.stateColor,
          (r) => this._updateFurniture(t.id, { stateColor: r })
        )}
              ` : m
      )}
      `;
    }
    if (e.kind === "area") {
      const t = (this._floor().areas ?? []).find((a) => a.id === e.id);
      if (!t) return f`${m}`;
      const i = ec(this.hass), n = t.haArea ? this._pendingAreaEntities(t) : [], r = ag(t), o = (a, s) => this._applyElementPatch("area", t.id, a, s);
      return f`
        ${this._renderGroup(
        // The name doubles as the HA-area link, so the link status line and
        // the name-related toggles belong with it.
        "Identity",
        this._renderForm(
          og(t, i.map((a) => a.name)),
          (a, s) => (
            // A name change also decides `haArea` (see areaNamePatch).
            this._applyElementPatch("area", t.id, tc(a, i), s)
          )
        ),
        this._renderAreaLinkRow(t, i),
        this._renderForm(be(r, ["showName", "labelSize"]), o)
      )}
        ${this._renderGroup(
        "Room type & sidebar",
        f`<fp-ef-area-extras
            .hass=${this.hass}
            .area=${t}
            @area-patch=${(a) => o(a.detail, !1)}
          ></fp-ef-area-extras>`
      )}
        ${this._renderGroup(
        "What it reads",
        this._renderForm(be(r, ["entity"]), o)
      )}
        ${this._renderGroup(
        "Color",
        this._renderForm(be(r, ["highlight", "opacity", "activeOpacity"]), o),
        this._renderColorRow({
          label: "Color",
          value: t.color,
          swatch: "#03a9f4",
          placeholder: "(primary)",
          onLive: (a) => this._updateAreaLive(t.id, { color: a }),
          onCommit: (a) => this._updateArea(t.id, { color: a })
        }),
        // The colours the bound entity drives. Same shape furniture and
        // devices already use, and gated the same way — without an entity
        // there is nothing to condition on. Until this existed the Entity
        // picker above was inert on its own: areaColor() resolves nothing
        // without an activeColor or a matching rule, so binding an entity
        // in the editor changed nothing and the feature looked unbuilt.
        t.entity ? f`
                ${this._renderColorRow({
          label: "Active color",
          title: "Color while the entity is on",
          value: t.activeColor,
          swatch: "#03a9f4",
          placeholder: "(no change)",
          onLive: (a) => this._updateAreaLive(t.id, { activeColor: a }),
          onCommit: (a) => this._updateArea(t.id, { activeColor: a })
        })}
                ${this._renderStateColorRules(
          t.stateColor,
          (a) => this._updateArea(t.id, { stateColor: a })
        )}
              ` : m
      )}
        ${this._renderGroup(
        // What tapping the room does (issue #181). Last, as it is on every
        // other element: the thing it *does*, after everything it *is*.
        "Behavior",
        this._renderForm(
          be(r, [
            "fitZoom",
            "zoom",
            "tap_action",
            "hold_action",
            "double_tap_action"
          ]),
          o
        )
      )}
        ${t.haArea ? this._renderGroup(
        // Everything that only exists because this room is linked to a
        // Home Assistant area.
        "Home Assistant area",
        f`<div class="row wide">
                <label>Filter entities</label>
                <input
                  type="checkbox"
                  .checked=${t.filterEntities ?? !0}
                  @change=${(a) => this._updateArea(t.id, {
          filterEntities: a.target.checked
        })}
                />
                <span class="hint"
                  >Scope the entity picker, for devices placed inside this room, to this HA
                  area's entities.</span
                >
              </div>`,
        f`<div class="row wide">
                <button
                  ?disabled=${!n.length}
                  title=${n.length ? `Add ${n.length} device${n.length === 1 ? "" : "s"} from this HA area, spread out across the room` : "Every entity in this HA area is already placed on this floor"}
                  @click=${() => this._addAreaEntities(t)}
                >
                  <ha-icon icon="mdi:shape-square-plus"></ha-icon>
                  Add all devices in this HA area${n.length ? ` (${n.length})` : ""}
                </button>
              </div>`
      ) : m}
        <p class="hint">
          Drag inside the fill to move the whole room; drag a vertex handle to reshape it.
        </p>
      `;
    }
    if (e.kind === "tracker") {
      const t = (this._floor().trackers ?? []).find((r) => r.id === e.id);
      if (!t) return f`${m}`;
      const i = rg(t), n = (r, o) => this._applyElementPatch("tracker", t.id, r, o);
      return f`
        ${this._renderGroup(
        "Zone",
        this._renderForm(be(i, I.TRACKER_GROUPS[0][1]), n)
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
        this._renderForm(be(i, I.TRACKER_GROUPS[1][1]), n),
        this._renderColorRow({
          label: "Color",
          value: t.color,
          swatch: "#03a9f4",
          placeholder: "(primary)",
          onLive: (r) => this._updateTrackerLive(t.id, { color: r }),
          onCommit: (r) => this._updateTracker(t.id, { color: r })
        })
      )}
      `;
    }
    if (e.kind === "wall") {
      const t = this._floor().walls.find((n) => n.id === e.id);
      if (!t) return f`${m}`;
      const i = Math.round(Math.hypot(t.x2 - t.x1, t.y2 - t.y1));
      return f`
        ${this._renderForm(
        sg(t),
        (n, r) => this._applyElementPatch("wall", t.id, n, r)
      )}
        <div class="row">
          <label>Length</label>
          <input
            class="num"
            type="number"
            min="1"
            .value=${String(i)}
            @change=${(n) => {
        const r = n.target, o = Number(r.value);
        if (r.value === "" || !(o >= 1)) {
          r.value = String(i);
          return;
        }
        const a = t.x2 - t.x1, s = t.y2 - t.y1, l = Math.hypot(a, s), c = l > 0 ? a / l : 1, h = l > 0 ? s / l : 0;
        this._updateWall(t.id, {
          x2: Math.round(t.x1 + c * o),
          y2: Math.round(t.y1 + h * o)
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
    return f`${m}`;
  }
  /**
   * Editor rows for one of a tracker's two sensor mappings (X or Y). Entity
   * picker is always shown; min / max / invert appear once a sensor entity is
   * set so the panel stays compact while empty.
   */
  _renderTrackerSensorRows(e, t, i) {
    const n = e[t];
    return f`
      <div class="row wide">
        <label>${i}</label>
        ${this._renderEntityPicker(
      n?.entity ?? "",
      (r) => {
        r ? this._updateTrackerSensor(e.id, t, { entity: r }) : this._updateTrackerSensor(e.id, t, null);
      },
      ["sensor", "input_number", "number"]
    )}
      </div>
      ${n ? f`<div class="row">
            <label>${i} range</label>
            <input
              class="num"
              type="number"
              step="0.01"
              title="Reading at the near edge"
              .value=${String(n.min)}
              @change=${(r) => {
      const o = r.target, a = Number(o.value);
      o.value !== "" && Number.isFinite(a) ? this._updateTrackerSensor(e.id, t, { min: a }) : o.value = String(n.min);
    }}
            />
            <input
              class="num"
              type="number"
              step="0.01"
              title="Reading at the far edge"
              .value=${String(n.max)}
              @change=${(r) => {
      const o = r.target, a = Number(o.value);
      o.value !== "" && Number.isFinite(a) ? this._updateTrackerSensor(e.id, t, { max: a }) : o.value = String(n.max);
    }}
            />
            <label class="inline-check">
              <input
                type="checkbox"
                .checked=${n.invert ?? !1}
                @change=${(r) => this._updateTrackerSensor(e.id, t, {
      invert: r.target.checked || void 0
    })}
              />
              invert
            </label>
          </div>
          <div class="row wide">
            <label>${i} presence</label>
            ${this._renderEntityPicker(
      n.presence?.entity ?? "",
      (r) => this._updateTrackerSensor(e.id, t, {
        presence: r ? { entity: r, invert: n.presence?.invert } : void 0
      }),
      ["binary_sensor", "input_boolean", "device_tracker"]
    )}
            ${n.presence ? f`<label class="inline-check" title="Treat 'off' as detected">
                  <input
                    type="checkbox"
                    .checked=${n.presence.invert ?? !1}
                    @change=${(r) => this._updateTrackerSensor(e.id, t, {
      presence: {
        entity: n.presence.entity,
        invert: r.target.checked || void 0
      }
    })}
                  />
                  invert
                </label>` : m}
          </div>` : m}
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
  ha,
  me`
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
      width: ${hi}px;
      height: ${hi}px;
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
L([
  C({ attribute: !1 })
], I.prototype, "hass", 2);
L([
  C({ type: Boolean })
], I.prototype, "panelMode", 2);
L([
  C({ attribute: !1 })
], I.prototype, "panelError", 2);
L([
  M()
], I.prototype, "_config", 2);
L([
  M()
], I.prototype, "_tool", 2);
L([
  M()
], I.prototype, "_selection", 2);
L([
  M()
], I.prototype, "_activeFloorId", 2);
L([
  M()
], I.prototype, "_draft", 2);
L([
  M()
], I.prototype, "_draftTracker", 2);
L([
  M()
], I.prototype, "_areaShape", 2);
L([
  M()
], I.prototype, "_draftArea", 2);
L([
  M()
], I.prototype, "_areaHover", 2);
L([
  M()
], I.prototype, "_freeWalls", 2);
L([
  M()
], I.prototype, "_defaultOpeningLength", 2);
L([
  M()
], I.prototype, "_marquee", 2);
L([
  M()
], I.prototype, "_history", 2);
L([
  M()
], I.prototype, "_future", 2);
L([
  M()
], I.prototype, "_zoom", 2);
L([
  M()
], I.prototype, "_floorMenuOpen", 2);
L([
  M()
], I.prototype, "_addMenuOpen", 2);
L([
  M()
], I.prototype, "_addQuery", 2);
L([
  M()
], I.prototype, "_symbolDraft", 2);
L([
  M()
], I.prototype, "_symbolError", 2);
L([
  M()
], I.prototype, "_paletteError", 2);
L([
  M()
], I.prototype, "_projectOpen", 2);
L([
  M()
], I.prototype, "_openGroups", 2);
L([
  M()
], I.prototype, "_fullscreen", 2);
L([
  M()
], I.prototype, "_applyState", 2);
L([
  M()
], I.prototype, "_applyError", 2);
L([
  Ti(".editor")
], I.prototype, "_editorEl", 2);
L([
  Ti("svg")
], I.prototype, "_svg", 2);
L([
  Ti(".canvas-wrap")
], I.prototype, "_canvasWrap", 2);
L([
  M()
], I.prototype, "_hideLabels", 2);
L([
  M()
], I.prototype, "_guides", 2);
L([
  M()
], I.prototype, "_ctx", 2);
I = L([
  Ai("fp-ef-editor")
], I);
const Sg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get FloorplanCardEditor() {
    return I;
  }
}, Symbol.toStringTag, { value: "Module" }));
var Eg = Object.defineProperty, Ag = Object.getOwnPropertyDescriptor, qi = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Ag(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (r = (n ? a(t, i, r) : a(r)) || r);
  return n && r && Eg(t, i, r), r;
};
const Tg = [
  { kind: "device", title: "Geräte" },
  { kind: "scene", title: "Szenen" },
  { kind: "script", title: "Skripte" }
];
let ht = class extends ae {
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
    const e = this.area.sidebar ?? [], t = e.filter((i) => Sn(i.entity) === "device" && Eo(this.hass.states[i.entity])).length;
    return f`
      <header>
        <div class="title">
          <h2>${this.area.name || "Raum"}</h2>
          <span class="sub">${e.length ? `${t} aktiv` : ""}</span>
        </div>
        ${this.canEdit ? f`<button class="icon-btn" title="Seitenleiste bearbeiten" @click=${this._edit}>
              <ha-icon icon="mdi:pencil"></ha-icon>
            </button>` : m}
        <button class="icon-btn" title="Schließen" @click=${this._close}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </header>
      <div class="content">
        ${e.length === 0 ? f`<p class="empty">
              Diesem Raum ist noch nichts zugeordnet.${this.canEdit ? f` Im Editor lassen sich Geräte, Szenen und Skripte für die Seitenleiste auswählen.` : m}
            </p>` : Tg.map(({ kind: i, title: n }) => {
      const r = e.filter((o) => Sn(o.entity) === i);
      return r.length ? f`<section>
                <h3>${n}</h3>
                ${i === "device" ? r.map((o) => this._renderRow(o)) : f`<div class="chips">${r.map((o) => this._renderChip(o))}</div>`}
              </section>` : m;
    })}
      </div>
    `;
  }
  _renderRow(e) {
    const t = this.hass.states[e.entity], i = Eo(t), n = Ao(t), r = e.name || En(this.hass, e.entity), o = we(e.entity);
    return f`
      <div class="row ${i ? "active" : ""} ${n ? "unavailable" : ""}">
        <button class="row-main" @click=${() => Co(this, e.entity)} title="Details">
          <span class="row-icon"><ha-icon .icon=${Wt(this.hass, e.entity, e.icon)}></ha-icon></span>
          <span class="row-text">
            <span class="name">${r}</span>
            <span class="state">${Nm(this.hass, t)}</span>
          </span>
        </button>
        ${n ? m : o === "cover" ? f`<span class="cover-btns">
              <button class="icon-btn" title="Öffnen" @click=${() => this._call("cover", "open_cover", e.entity)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button class="icon-btn" title="Stopp" @click=${() => this._call("cover", "stop_cover", e.entity)}>
                <ha-icon icon="mdi:stop"></ha-icon>
              </button>
              <button class="icon-btn" title="Schließen" @click=${() => this._call("cover", "close_cover", e.entity)}>
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
            </span>` : Fm(e.entity) ? f`<button class="run" @click=${() => To(this.hass, e.entity)}>Ausführen</button>` : Pm(e.entity) ? f`<button
              class="switch ${i ? "on" : ""}"
              role="switch"
              aria-checked=${i ? "true" : "false"}
              title=${i ? "Ausschalten" : "Einschalten"}
              @click=${() => zm(this.hass, e.entity)}
            >
              <span class="knob"></span>
            </button>` : m}
      </div>
    `;
  }
  _renderChip(e) {
    const t = this.hass.states[e.entity], i = e.name || En(this.hass, e.entity), n = we(e.entity) === "script" && t?.state === "on";
    return f`
      <button
        class="chip ${n ? "running" : ""}"
        ?disabled=${Ao(t)}
        title=${e.entity}
        @click=${() => To(this.hass, e.entity)}
        @contextmenu=${(r) => {
      r.preventDefault(), Co(this, e.entity);
    }}
      >
        <ha-icon .icon=${Wt(this.hass, e.entity, e.icon)}></ha-icon>
        <span>${i}</span>
      </button>
    `;
  }
  _call(e, t, i) {
    this.hass.callService(e, t, { entity_id: i });
  }
};
ht.styles = me`
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
qi([
  C({ attribute: !1 })
], ht.prototype, "hass", 2);
qi([
  C({ attribute: !1 })
], ht.prototype, "area", 2);
qi([
  C({ type: Boolean })
], ht.prototype, "canEdit", 2);
ht = qi([
  gt("fp-room-sidebar")
], ht);
var Cg = Object.defineProperty, Ig = Object.getOwnPropertyDescriptor, Gt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Ig(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (r = (n ? a(t, i, r) : a(r)) || r);
  return n && r && Cg(t, i, r), r;
};
const Mg = 380, Og = 700;
let Ke = class extends ae {
  constructor() {
    super(...arguments), this.canEdit = !1, this.sheet = !1, this._onKey = (e) => {
      e.key === "Escape" && this._close();
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._onKey), this._ro = new ResizeObserver(() => this.sheet = this.clientWidth < Og), this._ro.observe(this);
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
    return this.area ? f`
      <div class="scrim" @click=${this._close}></div>
      <div class="card" role="dialog" aria-label=${this.area.name || "Raum"} tabindex="-1">
        <fp-room-sidebar .hass=${this.hass} .area=${this.area} .canEdit=${this.canEdit}></fp-room-sidebar>
      </div>
    ` : m;
  }
};
Ke.styles = me`
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
      width: ${Mg}px;
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
Gt([
  C({ attribute: !1 })
], Ke.prototype, "hass", 2);
Gt([
  C({ attribute: !1 })
], Ke.prototype, "area", 2);
Gt([
  C({ type: Boolean })
], Ke.prototype, "canEdit", 2);
Gt([
  C({ type: Boolean, reflect: !0 })
], Ke.prototype, "sheet", 2);
Ke = Gt([
  gt("fp-room-dialog")
], Ke);
/*! js-yaml 5.4.3 https://github.com/nodeca/js-yaml @license MIT */
var F = Symbol("NOT_RESOLVED");
function ne(e, t) {
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
function yr(e, t) {
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
function Ki(e, t) {
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
var Lg = ne("tag:yaml.org,2002:str", {
  resolve: (e) => e,
  identify: (e) => typeof e == "string"
}), Pg = [
  "",
  "~",
  "null",
  "Null",
  "NULL"
], Fg = ne("tag:yaml.org,2002:null", {
  implicit: !0,
  implicitFirstChars: [
    "",
    "~",
    "n",
    "N"
  ],
  resolve: (e) => Pg.indexOf(e) !== -1 ? null : F,
  identify: (e) => e === null,
  represent: () => "null"
}), Ng = ne("tag:yaml.org,2002:null", {
  implicit: !0,
  implicitFirstChars: ["n"],
  resolve: (e, t) => e === "null" || t && e === "" ? null : F,
  identify: (e) => e === null,
  represent: () => "null"
}), Rg = [
  "",
  "~",
  "null",
  "Null",
  "NULL"
], zg = ne("tag:yaml.org,2002:null", {
  implicit: !0,
  implicitFirstChars: [
    "",
    "~",
    "n",
    "N"
  ],
  resolve: (e) => Rg.indexOf(e) !== -1 ? null : F,
  identify: (e) => e === null,
  represent: () => "null"
}), Dg = [
  "true",
  "True",
  "TRUE"
], Hg = [
  "false",
  "False",
  "FALSE"
], Ug = ne("tag:yaml.org,2002:bool", {
  implicit: !0,
  implicitFirstChars: [
    "t",
    "T",
    "f",
    "F"
  ],
  resolve: (e) => Dg.indexOf(e) !== -1 ? !0 : Hg.indexOf(e) !== -1 ? !1 : F,
  identify: (e) => Object.prototype.toString.call(e) === "[object Boolean]",
  represent: (e) => e ? "true" : "false"
}), Bg = ["true"], jg = ["false"], Wg = ne("tag:yaml.org,2002:bool", {
  implicit: !0,
  implicitFirstChars: ["t", "f"],
  resolve: (e) => Bg.indexOf(e) !== -1 ? !0 : jg.indexOf(e) !== -1 ? !1 : F,
  identify: (e) => Object.prototype.toString.call(e) === "[object Boolean]",
  represent: (e) => e ? "true" : "false"
}), qg = [
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
], Kg = [
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
], Gg = ne("tag:yaml.org,2002:bool", {
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
  resolve: (e) => qg.indexOf(e) !== -1 ? !0 : Kg.indexOf(e) !== -1 ? !1 : F,
  identify: (e) => Object.prototype.toString.call(e) === "[object Boolean]",
  represent: (e) => e ? "true" : "false"
}), Vg = /* @__PURE__ */ new RegExp("^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$"), Yg = /* @__PURE__ */ new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");
function Zg(e) {
  let t = e, i = 1;
  return (t[0] === "-" || t[0] === "+") && (t[0] === "-" && (i = -1), t = t.slice(1)), t.startsWith("0b") ? i * parseInt(t.slice(2), 2) : t.startsWith("0o") ? i * parseInt(t.slice(2), 8) : t.startsWith("0x") ? i * parseInt(t.slice(2), 16) : i * parseInt(t, 10);
}
function Xg(e, t) {
  if (t) {
    if (!Yg.test(e)) return F;
  } else if (!Vg.test(e)) return F;
  const i = Zg(e);
  return Number.isFinite(i) ? i : F;
}
var ks = ne("tag:yaml.org,2002:int", {
  implicit: !0,
  implicitFirstChars: [
    "-",
    "+",
    ..."0123456789"
  ],
  resolve: Xg,
  identify: (e) => Number.isInteger(e) && !Object.is(e, -0) && e.toString(10).indexOf("e") < 0,
  represent: (e) => e.toString(10)
}), Qg = /* @__PURE__ */ new RegExp("^-?(?:0|[1-9][0-9]*)$"), Jg = /* @__PURE__ */ new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");
function ey(e) {
  let t = e, i = 1;
  return (t[0] === "-" || t[0] === "+") && (t[0] === "-" && (i = -1), t = t.slice(1)), t.startsWith("0b") ? i * parseInt(t.slice(2), 2) : t.startsWith("0o") ? i * parseInt(t.slice(2), 8) : t.startsWith("0x") ? i * parseInt(t.slice(2), 16) : i * parseInt(t, 10);
}
function ty(e, t) {
  if (t) {
    if (!Jg.test(e)) return F;
  } else if (!Qg.test(e)) return F;
  const i = ey(e);
  return Number.isFinite(i) ? i : F;
}
var iy = ne("tag:yaml.org,2002:int", {
  implicit: !0,
  implicitFirstChars: ["-", ..."0123456789"],
  resolve: ty,
  identify: (e) => Number.isInteger(e) && !Object.is(e, -0) && e.toString(10).indexOf("e") < 0,
  represent: (e) => e.toString(10)
}), ny = /* @__PURE__ */ new RegExp("^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$");
function ry(e) {
  let t = e.replace(/_/g, ""), i = 1;
  if ((t[0] === "-" || t[0] === "+") && (t[0] === "-" && (i = -1), t = t.slice(1)), t.startsWith("0b")) return i * parseInt(t.slice(2), 2);
  if (t.startsWith("0x")) return i * parseInt(t.slice(2), 16);
  if (t.includes(":")) {
    let n = 0;
    for (const r of t.split(":")) n = n * 60 + Number(r);
    return i * n;
  }
  return t !== "0" && t[0] === "0" ? i * parseInt(t, 8) : i * parseInt(t, 10);
}
function oy(e) {
  if (!ny.test(e)) return F;
  const t = ry(e);
  return Number.isFinite(t) ? t : F;
}
var An = ne("tag:yaml.org,2002:int", {
  implicit: !0,
  implicitFirstChars: [
    "-",
    "+",
    ..."0123456789"
  ],
  resolve: oy,
  identify: (e) => Number.isInteger(e) && !Object.is(e, -0) && e.toString(10).indexOf("e") < 0,
  represent: (e) => e.toString(10)
}), ay = /* @__PURE__ */ new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"), sy = /* @__PURE__ */ new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
function ly(e) {
  if (!ay.test(e)) return F;
  let t = e.toLowerCase();
  const i = t[0] === "-" ? -1 : 1;
  if ("+-".includes(t[0]) && (t = t.slice(1)), t === ".inf") return i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  if (t === ".nan") return NaN;
  const n = i * parseFloat(t);
  return Number.isFinite(n) || sy.test(e) ? n : F;
}
function cy(e) {
  if (isNaN(e)) return ".nan";
  if (e === Number.POSITIVE_INFINITY) return ".inf";
  if (e === Number.NEGATIVE_INFINITY) return "-.inf";
  if (Object.is(e, -0)) return "-0.0";
  const t = e.toString(10);
  return /^[-+]?[0-9]+e/.test(t) ? t.replace("e", ".e") : t;
}
var Ss = ne("tag:yaml.org,2002:float", {
  implicit: !0,
  implicitFirstChars: [
    "-",
    "+",
    ".",
    ..."0123456789"
  ],
  resolve: ly,
  identify: (e) => typeof e == "number" && (!Number.isInteger(e) || Object.is(e, -0) || e.toString(10).indexOf("e") >= 0),
  represent: cy
}), dy = /* @__PURE__ */ new RegExp("^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$"), hy = /* @__PURE__ */ new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
function py(e, t) {
  if (t) {
    if (!hy.test(e)) return F;
    let n = e.toLowerCase();
    const r = n[0] === "-" ? -1 : 1;
    if ("+-".includes(n[0]) && (n = n.slice(1)), n === ".inf") return r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    if (n === ".nan") return NaN;
    const o = r * parseFloat(n);
    return Number.isFinite(o) ? o : F;
  }
  if (!dy.test(e)) return F;
  const i = Number(e);
  return Number.isFinite(i) ? i : F;
}
function uy(e) {
  if (isNaN(e)) return ".nan";
  if (e === Number.POSITIVE_INFINITY) return ".inf";
  if (e === Number.NEGATIVE_INFINITY) return "-.inf";
  if (Object.is(e, -0)) return "-0.0";
  const t = e.toString(10);
  return /^[-+]?[0-9]+e/.test(t) ? t.replace("e", ".e") : t;
}
var fy = ne("tag:yaml.org,2002:float", {
  implicit: !0,
  implicitFirstChars: ["-", ..."0123456789"],
  resolve: py,
  identify: (e) => typeof e == "number" && (!Number.isInteger(e) || Object.is(e, -0) || e.toString(10).indexOf("e") >= 0),
  represent: uy
}), my = /* @__PURE__ */ new RegExp("^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"), gy = /* @__PURE__ */ new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
function yy(e) {
  if (!my.test(e)) return F;
  let t = e.toLowerCase().replace(/_/g, "");
  const i = t[0] === "-" ? -1 : 1;
  if ("+-".includes(t[0]) && (t = t.slice(1)), t === ".inf") return i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  if (t === ".nan") return NaN;
  let n = 0;
  if (t.includes(":")) {
    for (const r of t.split(":")) n = n * 60 + Number(r);
    n *= i;
  } else n = i * parseFloat(t);
  return Number.isFinite(n) || gy.test(e) ? n : F;
}
function by(e) {
  if (isNaN(e)) return ".nan";
  if (e === Number.POSITIVE_INFINITY) return ".inf";
  if (e === Number.NEGATIVE_INFINITY) return "-.inf";
  if (Object.is(e, -0)) return "-0.0";
  const t = e.toString(10);
  return /^[-+]?[0-9]+e/.test(t) ? t.replace("e", ".e") : t;
}
var Tn = ne("tag:yaml.org,2002:float", {
  implicit: !0,
  implicitFirstChars: [
    "-",
    "+",
    ".",
    ..."0123456789"
  ],
  resolve: yy,
  identify: (e) => typeof e == "number" && (!Number.isInteger(e) || Object.is(e, -0) || e.toString(10).indexOf("e") >= 0),
  represent: by
}), vy = ne("tag:yaml.org,2002:merge", {
  implicit: !0,
  implicitFirstChars: ["<"],
  resolve: (e, t) => e === "<<" || t && e === "" ? "<<" : F,
  identify: () => !1
}), _y = /^[A-Za-z0-9+/]*={0,2}$/;
function wy(e) {
  const t = e.replace(/\s/g, "");
  if (t.length % 4 !== 0 || !_y.test(t)) return F;
  const i = atob(t), n = new Uint8Array(i.length);
  for (let r = 0; r < i.length; r++) n[r] = i.charCodeAt(r);
  return n;
}
function xy(e) {
  let t = "";
  for (let i = 0; i < e.length; i++) t += String.fromCharCode(e[i]);
  return btoa(t);
}
var $y = ne("tag:yaml.org,2002:binary", {
  resolve: wy,
  identify: (e) => Object.prototype.toString.call(e) === "[object Uint8Array]",
  represent: xy
}), ky = /* @__PURE__ */ new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"), Sy = /* @__PURE__ */ new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");
function No(e, t, i, n = 0, r = 0, o = 0, a = 0) {
  const s = new Date(Date.UTC(e, t, i, n, r, o, a));
  return s.setUTCFullYear(e, t, i), s;
}
function Ey(e) {
  let t = ky.exec(e);
  if (t === null && (t = Sy.exec(e)), t === null) return F;
  const i = +t[1], n = +t[2] - 1, r = +t[3];
  if (!t[4]) {
    const h = No(i, n, r);
    return h.getUTCFullYear() !== i || h.getUTCMonth() !== n || h.getUTCDate() !== r ? F : h;
  }
  const o = +t[4], a = +t[5], s = +t[6];
  let l = 0;
  if (o > 23 || a > 59 || s > 59) return F;
  if (t[7]) {
    let h = t[7].slice(0, 3);
    for (; h.length < 3; ) h += "0";
    l = +h;
  }
  const c = No(i, n, r, o, a, s, l);
  if (c.getUTCFullYear() !== i || c.getUTCMonth() !== n || c.getUTCDate() !== r) return F;
  if (t[9]) {
    const h = +t[10], d = +(t[11] || 0);
    if (h > 23 || d > 59) return F;
    const p = (h * 60 + d) * 6e4;
    c.setTime(c.getTime() - (t[9] === "-" ? -p : p));
  }
  return c;
}
var Ay = ne("tag:yaml.org,2002:timestamp", {
  implicit: !0,
  implicitFirstChars: [..."0123456789"],
  resolve: Ey,
  identify: (e) => e instanceof Date,
  represent: (e) => e.toISOString()
}), Ty = yr("tag:yaml.org,2002:seq", {
  create: () => [],
  addItem: (e, t) => {
    e.push(t);
  },
  identify: Array.isArray
});
function Gi(e) {
  if (e === null || typeof e != "object" || Array.isArray(e)) return !1;
  const t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
function Ro(e, t) {
  const i = {};
  for (const n of t) e[n] !== void 0 && (i[n] = e[n]);
  return i;
}
var Cy = yr("tag:yaml.org,2002:omap", {
  create: () => ({
    list: [],
    seen: /* @__PURE__ */ new Set()
  }),
  addItem: (e, t) => {
    let i;
    if (t instanceof Map) {
      if (t.size !== 1) return "cannot resolve an ordered map item";
      i = t.keys().next().value;
    } else if (Gi(t)) {
      const n = Object.keys(t);
      if (n.length !== 1) return "cannot resolve an ordered map item";
      i = n[0];
    } else return "cannot resolve an ordered map item";
    return e.seen.has(i) ? "duplicate key in ordered map" : (e.seen.add(i), e.list.push(t), "");
  },
  finalize: (e) => e.list,
  identify: () => !1
}), Iy = yr("tag:yaml.org,2002:pairs", {
  create: () => [],
  addItem: (e, t) => {
    if (t instanceof Map)
      return t.size !== 1 ? "cannot resolve a pairs item" : (e.push(t.entries().next().value), "");
    if (Object.prototype.toString.call(t) !== "[object Object]") return "cannot resolve a pairs item";
    const i = t, n = Object.keys(i);
    return n.length !== 1 ? "cannot resolve a pairs item" : (e.push([n[0], i[n[0]]]), "");
  },
  identify: () => !1
}), My = Ki("tag:yaml.org,2002:map", {
  create: () => ({}),
  identify: Gi,
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
}), Oy = Ki("tag:yaml.org,2002:set", {
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
function Ly() {
  return {
    scalar: /* @__PURE__ */ Object.create(null),
    sequence: /* @__PURE__ */ Object.create(null),
    mapping: /* @__PURE__ */ Object.create(null)
  };
}
function Py() {
  return {
    scalar: [],
    sequence: [],
    mapping: []
  };
}
function Fy(e) {
  const t = [];
  for (const i of e) {
    let n = t.length;
    for (let r = 0; r < t.length; r++) {
      const o = t[r];
      if (o.nodeKind === i.nodeKind && o.tagName === i.tagName && o.matchByTagPrefix === i.matchByTagPrefix) {
        n = r;
        break;
      }
    }
    t[n] = i;
  }
  return t;
}
var Vi = class Es {
  constructor(t) {
    he(this, "tags");
    /** @internal */
    he(this, "implicitScalarTags");
    /**
    * Dispatch implicit scalar resolvers by `source.charAt(0)`. Each bucket holds
    * the resolvers that may match that key, in schema order; a key absent from
    * the map uses
    * {@link Schema.implicitScalarAnyFirstChar}
    * (resolvers that declared no first-char constraint, so they apply to any
    * first character).
    */
    he(this, "implicitScalarByFirstChar");
    he(this, "implicitScalarAnyFirstChar");
    /**
    * The default scalar tag (`!!str`), resolved once so the composer's fallback
    * for unresolved plain scalars avoids a keyed lookup per scalar.
    *
    * @internal
    */
    he(this, "defaultScalarTag");
    /**
    * The default container tags (`!!seq` / `!!map`), used by the dumper: when a
    * value is identified by its default tag, the tag is implicit and not
    * printed. Undefined if the schema does not define them (then such values
    * can't be dumped).
    *
    * @internal
    */
    he(this, "defaultSequenceTag");
    /** @internal */
    he(this, "defaultMappingTag");
    he(this, "exact");
    he(this, "prefix");
    const i = Fy(t), n = [], r = Ly(), o = Py();
    for (const h of i) {
      if (h.nodeKind === "scalar" && h.implicit) {
        if (h.matchByTagPrefix) throw new Error("Implicit scalar tags cannot match by tag prefix");
        n.push(h);
      }
      switch (h.nodeKind) {
        case "scalar":
          h.matchByTagPrefix ? o.scalar.push(h) : r.scalar[h.tagName] = h;
          break;
        case "sequence":
          h.matchByTagPrefix ? o.sequence.push(h) : r.sequence[h.tagName] = h;
          break;
        case "mapping":
          h.matchByTagPrefix ? o.mapping.push(h) : r.mapping[h.tagName] = h;
          break;
      }
    }
    const a = n.filter((h) => h.implicitFirstChars === null), s = /* @__PURE__ */ new Set();
    for (const h of n) if (h.implicitFirstChars !== null) for (const d of h.implicitFirstChars) s.add(d);
    const l = /* @__PURE__ */ new Map();
    for (const h of s) l.set(h, n.filter((d) => d.implicitFirstChars === null || d.implicitFirstChars.indexOf(h) !== -1));
    const c = r.scalar["tag:yaml.org,2002:str"];
    if (!c) throw new Error("schema does not define the default scalar tag (tag:yaml.org,2002:str)");
    this.tags = i, this.implicitScalarTags = n, this.implicitScalarByFirstChar = l, this.implicitScalarAnyFirstChar = a, this.defaultScalarTag = c, this.defaultSequenceTag = r.sequence["tag:yaml.org,2002:seq"], this.defaultMappingTag = r.mapping["tag:yaml.org,2002:map"], this.exact = r, this.prefix = o;
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
    for (const r of i) {
      const o = r.resolve(t, !1, r.tagName);
      if (o !== F) return {
        value: o,
        tag: r
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
    return new Es([...this.tags, ...i]);
  }
}, br = new Vi([
  Lg,
  Ty,
  My
]);
new Vi([
  ...br.tags,
  Ng,
  Wg,
  iy,
  fy
]);
var Ny = new Vi([
  ...br.tags,
  Fg,
  Ug,
  ks,
  Ss
]), Ry = new Vi([
  ...br.tags,
  zg,
  Gg,
  An,
  Tn,
  Ay,
  vy,
  $y,
  Cy,
  Iy,
  Oy
]);
Ry.withTags({
  ...An,
  resolve: (e, t, i) => {
    const n = An.resolve(e, t, i);
    return n === F ? ks.resolve(e, t, i) : n;
  }
}, {
  ...Tn,
  resolve: (e, t, i) => {
    const n = Tn.resolve(e, t, i);
    return n === F ? Ss.resolve(e, t, i) : n;
  }
});
Ki("tag:yaml.org,2002:map", {
  create: () => /* @__PURE__ */ new Map(),
  addPair: (e, t, i) => (e.set(t, i), ""),
  has: (e, t) => e.has(t),
  keys: (e) => e.keys(),
  get: (e, t) => e.get(t),
  identify: (e) => e instanceof Map || Gi(e),
  represent: (e) => {
    if (e instanceof Map) return e;
    const t = /* @__PURE__ */ new Map(), i = e;
    for (const n of Object.keys(i)) t.set(n, i[n]);
    return t;
  }
});
function zo(e) {
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
Ki("tag:yaml.org,2002:map", {
  create: () => ({}),
  identify: Gi,
  represent: (e) => {
    const t = /* @__PURE__ */ new Map();
    for (const i of Object.keys(e)) t.set(i, e[i]);
    return t;
  },
  addPair: (e, t, i) => {
    const n = zo(t);
    return n === null ? "nested arrays are not supported inside keys" : (n === "__proto__" ? Object.defineProperty(e, n, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[n] = i, "");
  },
  has: (e, t) => {
    const i = zo(t);
    return i !== null && Object.prototype.hasOwnProperty.call(e, i);
  },
  keys: (e) => Object.keys(e),
  get: (e, t) => {
    const i = String(t);
    return Object.prototype.hasOwnProperty.call(e, i) ? e[i] : null;
  }
});
var zy = {
  maxLength: 79,
  indent: 1,
  linesBefore: 3,
  linesAfter: 2
};
function on(e, t, i, n, r) {
  let o = "", a = "";
  const s = Math.floor(r / 2) - 1;
  return n - t > s && (o = " ... ", t = n - s + o.length), i - n > s && (a = " ...", i = n + s - a.length), {
    str: o + e.slice(t, i).replace(/\t/g, "→") + a,
    pos: n - t + o.length
  };
}
function an(e, t) {
  return " ".repeat(Math.max(t - e.length, 0)) + e;
}
function Dy(e, t) {
  if (!e.buffer) return null;
  const i = {
    ...zy,
    ...t
  }, n = /\r?\n|\r|\0/g, r = [0], o = [];
  let a, s = -1;
  for (; a = n.exec(e.buffer); )
    o.push(a.index), r.push(a.index + a[0].length), e.position <= a.index && s < 0 && (s = r.length - 2);
  s < 0 && (s = r.length - 1);
  let l = "";
  const c = Math.min(e.line + i.linesAfter, o.length).toString().length, h = i.maxLength - (i.indent + c + 3);
  for (let p = 1; p <= i.linesBefore && !(s - p < 0); p++) {
    const g = on(e.buffer, r[s - p], o[s - p], e.position - (r[s] - r[s - p]), h);
    l = `${" ".repeat(i.indent)}${an((e.line - p + 1).toString(), c)} | ${g.str}
${l}`;
  }
  const d = on(e.buffer, r[s], o[s], e.position, h);
  l += `${" ".repeat(i.indent)}${an((e.line + 1).toString(), c)} | ${d.str}
`, l += `${"-".repeat(i.indent + c + 3 + d.pos)}^
`;
  for (let p = 1; p <= i.linesAfter && !(s + p >= o.length); p++) {
    const g = on(e.buffer, r[s + p], o[s + p], e.position - (r[s] - r[s + p]), h);
    l += `${" ".repeat(i.indent)}${an((e.line + p + 1).toString(), c)} | ${g.str}
`;
  }
  return l.replace(/\n$/, "");
}
function Do(e, t) {
  let i = "";
  return e.mark ? (e.mark.name && (i += `in "${e.mark.name}" `), i += `(${e.mark.line + 1}:${e.mark.column + 1})`, !t && e.mark.snippet && (i += `

${e.mark.snippet}`), `${e.reason} ${i}`) : e.reason;
}
var Ge = class As extends Error {
  /**
  * Optional `mark` contains source snippet data. Usually, use
  * {@link YAMLException.throwAt} instead of passing it directly.
  */
  constructor(i, n) {
    super();
    he(this, "reason");
    he(this, "mark");
    this.name = "YAMLException", this.reason = i, this.mark = n, this.message = Do(this, !1), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  }
  /**
  * Returns the formatted error, omitting the source snippet in compact mode.
  */
  toString(i) {
    return `${this.name}: ${Do(this, i)}`;
  }
  /**
  * Builds a YAMLException with a source snippet and throws it. `source` is
  * the raw input text; `position` is an offset into it.
  */
  static throwAt(i, n, r, o = "") {
    let a = 0, s = 0;
    for (let c = 0; c < n; c++) {
      const h = i.charCodeAt(c);
      h === 10 ? (a++, s = c + 1) : h === 13 && (a++, i.charCodeAt(c + 1) === 10 && c++, s = c + 1);
    }
    const l = {
      name: o,
      buffer: i,
      position: n,
      line: a,
      column: n - s
    };
    throw l.snippet = Dy(l), new As(r, l);
  }
}, J = {
  DOCUMENT: 1,
  SEQUENCE: 2,
  MAPPING: 3,
  SCALAR: 4,
  ALIAS: 5,
  POP: 6
}, R = {
  PLAIN: 1,
  SINGLE_QUOTED: 2,
  DOUBLE_QUOTED: 3,
  LITERAL_BLOCK: 4,
  FOLDED_BLOCK: 5
}, pt = {
  BLOCK: 1,
  FLOW: 2
}, ve = {
  CLIP: 1,
  STRIP: 2,
  KEEP: 3
}, Hy = -1;
function Ho(e) {
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
var Ts = new Array(256), Cs = new Array(256);
for (let e = 0; e < 256; e++)
  Ts[e] = Ho(e) ? 1 : 0, Cs[e] = Ho(e);
function Uy(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode((e - 65536 >> 10) + 55296, (e - 65536 & 1023) + 56320);
}
function By(e) {
  return e >= 48 && e <= 57 ? e - 48 : (e | 32) - 97 + 10;
}
function jy(e) {
  return e === 120 ? 2 : e === 117 ? 4 : 8;
}
function xi(e, t, i) {
  let n = 0;
  for (; t < i; ) {
    const r = e.charCodeAt(t);
    if (r === 10)
      n++, t++;
    else if (r === 13)
      n++, t++, e.charCodeAt(t) === 10 && t++;
    else if (r === 32 || r === 9) t++;
    else break;
  }
  return {
    position: t,
    breaks: n
  };
}
function vr(e) {
  return e === 1 ? " " : `
`.repeat(e - 1);
}
function Wy(e, t, i) {
  let n = "", r = t, o = t, a = t;
  for (; r < i; ) {
    const s = e.charCodeAt(r);
    if (s === 10 || s === 13) {
      n += e.slice(o, a);
      const l = xi(e, r, i);
      n += vr(l.breaks), r = o = a = l.position;
    } else
      r++, s !== 32 && s !== 9 && (a = r);
  }
  return n + e.slice(o, a);
}
function qy(e, t, i) {
  let n = "", r = t, o = t, a = t;
  for (; r < i; ) {
    const s = e.charCodeAt(r);
    if (s === 39)
      n += e.slice(o, r) + "'", r += 2, o = a = r;
    else if (s === 10 || s === 13) {
      n += e.slice(o, a);
      const l = xi(e, r, i);
      n += vr(l.breaks), r = o = a = l.position;
    } else
      r++, s !== 32 && s !== 9 && (a = r);
  }
  return n + e.slice(o, i);
}
function Ky(e, t, i) {
  let n = "", r = t, o = t, a = t;
  for (; r < i; ) {
    const s = e.charCodeAt(r);
    if (s === 92) {
      n += e.slice(o, r), r++;
      const l = e.charCodeAt(r);
      if (l === 10 || l === 13) r = xi(e, r, i).position;
      else if (l < 256 && Ts[l])
        n += Cs[l], r++;
      else {
        let c = jy(l), h = 0;
        for (; c > 0; c--) {
          r++;
          const d = By(e.charCodeAt(r));
          h = (h << 4) + d;
        }
        n += Uy(h), r++;
      }
      o = a = r;
    } else if (s === 10 || s === 13) {
      n += e.slice(o, a);
      const l = xi(e, r, i);
      n += vr(l.breaks), r = o = a = l.position;
    } else
      r++, s !== 32 && s !== 9 && (a = r);
  }
  return n + e.slice(o, i);
}
function Uo(e, t, i, n, r, o) {
  const a = n < 0 ? 0 : n, s = e.slice(t, i).replace(/\r\n?/g, `
`), l = s === "" ? [] : (s.endsWith(`
`) ? s.slice(0, -1) : s).split(`
`);
  let c = "", h = !1, d = 0, p = !1;
  for (const g of l) {
    let y = 0;
    for (; y < a && g.charCodeAt(y) === 32; ) y++;
    if (n < 0 || y >= g.length) {
      d++;
      continue;
    }
    const b = g.slice(a), v = b.charCodeAt(0);
    o ? v === 32 || v === 9 ? (p = !0, c += `
`.repeat(h ? 1 + d : d)) : p ? (p = !1, c += `
`.repeat(d + 1)) : d === 0 ? h && (c += " ") : c += `
`.repeat(d) : c += `
`.repeat(h ? 1 + d : d), c += b, h = !0, d = 0;
  }
  return r === ve.KEEP ? c += `
`.repeat(h ? 1 + d : d) : r !== ve.STRIP && h && (c += `
`), c;
}
function Gy(e, t) {
  if (t.valueStart === Hy) return "";
  const { valueStart: i, valueEnd: n } = t;
  if (t.fast) return e.slice(i, n);
  switch (t.style) {
    case R.SINGLE_QUOTED:
      return qy(e, i, n);
    case R.DOUBLE_QUOTED:
      return Ky(e, i, n);
    case R.LITERAL_BLOCK:
      return Uo(e, i, n, t.indent, t.chomping, !1);
    case R.FOLDED_BLOCK:
      return Uo(e, i, n, t.indent, t.chomping, !0);
    default:
      return Wy(e, i, n);
  }
}
var Vy = Object.assign(/* @__PURE__ */ Object.create(null), {
  "!": "!",
  "!!": "tag:yaml.org,2002:"
});
function Is(e, t) {
  if (e.startsWith("!<") && e.endsWith(">")) return decodeURIComponent(e.slice(2, -1));
  const i = e.indexOf("!", 1), n = i === -1 ? "!" : e.slice(0, i + 1), r = t?.[n] ?? Vy[n] ?? n;
  return decodeURIComponent(r) + decodeURIComponent(e.slice(n.length));
}
var at = -1, Yy = "tag:yaml.org,2002:merge", _r = {
  filename: "",
  schema: Ny,
  json: !1,
  maxTotalMergeKeys: 1e4,
  maxAliases: -1
};
function Zy(e) {
  return "tagStart" in e && e.tagStart !== at ? e.tagStart : "anchorStart" in e && e.anchorStart !== at ? e.anchorStart : "valueStart" in e && e.valueStart !== at ? e.valueStart : "start" in e ? e.start : 0;
}
function ee(e, t) {
  Ge.throwAt(e.source, e.position, t, e.filename);
}
function Ms(e, t, i, n) {
  try {
    return i.finalize(n);
  } catch (r) {
    if (r instanceof Ge) throw r;
    Ge.throwAt(e.source, t, r instanceof Error ? r.message : String(r), e.filename);
  }
}
function Xy(e, t) {
  const i = Gy(e.source, t), n = t.tagStart === at ? "" : e.source.slice(t.tagStart, t.tagEnd), r = e.schema.defaultScalarTag;
  if (n !== "") {
    if (n === "!") return {
      value: i,
      tag: r
    };
    const o = Is(n, e.tagHandlers), a = e.schema.lookupScalarTag(o);
    if (a) {
      const l = a.resolve(i, !0, o);
      return l === F && ee(e, `cannot resolve a node with !<${o}> explicit tag`), {
        value: l,
        tag: a
      };
    }
    const s = e.schema.lookupMappingTag(o) ?? e.schema.lookupSequenceTag(o);
    if (s) {
      i !== "" && ee(e, `cannot resolve a node with !<${o}> explicit tag`);
      const l = s.create(o);
      return {
        value: s.carrierIsResult ? l : Ms(e, e.position, s, l),
        tag: s
      };
    }
    ee(e, `unknown scalar tag !<${o}>`);
  }
  return t.style === R.PLAIN ? e.schema.resolveImplicitScalarTag(i) : {
    value: r.resolve(i, !1, r.tagName),
    tag: r
  };
}
function Bo(e, t, i) {
  const n = t.tagStart === at ? "" : e.source.slice(t.tagStart, t.tagEnd);
  return n === "" || n === "!" ? i : Is(n, e.tagHandlers);
}
function Os(e) {
  return e.nodeKind === "mapping";
}
function jo(e) {
  e.totalMergeKeys++, e.maxTotalMergeKeys !== -1 && e.totalMergeKeys > e.maxTotalMergeKeys && ee(e, `merge keys exceeded maxTotalMergeKeys (${e.maxTotalMergeKeys})`);
}
function Wo(e, t, i, n) {
  jo(e);
  for (const r of n.keys(i)) {
    if (jo(e), t.tag.has(t.value, r)) continue;
    const o = t.tag.addPair(t.value, r, n.get(i, r));
    o && ee(e, o), t.overridable ??= /* @__PURE__ */ new Set(), t.overridable.add(r);
  }
}
function Qy(e, t, i, n) {
  if (e.position = t.keyPosition, Os(n)) Wo(e, t, i, n);
  else if (n.nodeKind === "sequence" && Array.isArray(i)) {
    i.length > 100 && ee(e, "abnormal merge sequence size");
    for (const r of i) {
      const o = e.nodeTags.get(r);
      o || ee(e, "cannot merge mappings; the provided source object is unacceptable"), Wo(e, t, r, o);
    }
  } else ee(e, "cannot merge mappings; the provided source object is unacceptable");
}
function Jy(e, t, i, n, r) {
  if (e.position = t.keyPosition, t.keyIsMerge) {
    Qy(e, t, n, r);
    return;
  }
  !e.json && t.tag.has(t.value, i) && !t.overridable?.has(i) && ee(e, "duplicated mapping key");
  const o = t.tag.addPair(t.value, i, n);
  o && ee(e, o), t.overridable?.delete(i);
}
function sn(e, t, i) {
  const n = e.frames[e.frames.length - 1];
  if (n.kind === "document")
    n.value = t, n.hasValue = !0;
  else if (n.kind === "sequence") {
    Os(i) && e.nodeTags.set(t, i);
    const r = n.tag.addItem(n.value, t, n.index++);
    r && ee(e, r);
  } else if (n.hasKey) {
    const r = n.key;
    n.key = void 0, n.hasKey = !1, Jy(e, n, r, t, i);
  } else
    n.key = t, n.keyPosition = e.position, n.hasKey = !0, n.keyIsMerge = i.tagName === Yy;
}
function ln(e, t, i, n, r) {
  if (t.anchorStart !== at) {
    const o = {
      value: i,
      tag: n,
      isValueFinal: r
    };
    return e.anchors.set(e.source.slice(t.anchorStart, t.anchorEnd), o), o;
  }
  return null;
}
function eb(e, t) {
  const i = {
    ..._r,
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
    switch (i.position = Zy(n), n.type) {
      case J.DOCUMENT:
        i.anchors = /* @__PURE__ */ new Map(), i.nodeTags = /* @__PURE__ */ new Map(), i.aliasCount = 0, i.tagHandlers = /* @__PURE__ */ Object.create(null);
        for (const r of n.directives) r.kind === "tag" && (i.tagHandlers[r.handle] = r.prefix);
        i.frames.push({
          kind: "document",
          position: i.position,
          value: void 0,
          hasValue: !1
        });
        break;
      case J.SCALAR: {
        const { value: r, tag: o } = Xy(i, n);
        ln(i, n, r, o, !0), sn(i, r, o);
        break;
      }
      case J.SEQUENCE: {
        const r = Bo(i, n, "tag:yaml.org,2002:seq"), o = i.schema.lookupSequenceTag(r);
        o || ee(i, `unknown sequence tag !<${r}>`);
        const a = o.create(r), s = ln(i, n, a, o, o.carrierIsResult);
        i.frames.push({
          kind: "sequence",
          position: i.position,
          value: a,
          tag: o,
          anchor: s,
          index: 0
        });
        break;
      }
      case J.MAPPING: {
        const r = Bo(i, n, "tag:yaml.org,2002:map"), o = i.schema.lookupMappingTag(r);
        o || ee(i, `unknown mapping tag !<${r}>`);
        const a = o.create(r), s = ln(i, n, a, o, o.carrierIsResult);
        i.frames.push({
          kind: "mapping",
          position: i.position,
          value: a,
          tag: o,
          anchor: s,
          key: void 0,
          keyPosition: i.position,
          hasKey: !1,
          keyIsMerge: !1,
          overridable: null
        });
        break;
      }
      case J.ALIAS: {
        i.maxAliases !== -1 && ++i.aliasCount > i.maxAliases && ee(i, `aliases exceeded maxAliases (${i.maxAliases})`);
        const r = i.source.slice(n.anchorStart, n.anchorEnd), o = i.anchors.get(r);
        o || ee(i, `unidentified alias "${r}"`), o.isValueFinal || ee(i, `recursive alias "${r}" is not supported for tag ${o.tag.tagName} because it uses finalize()`), sn(i, o.value, o.tag);
        break;
      }
      case J.POP: {
        const r = i.frames.pop();
        if (r.kind === "mapping" && r.hasKey && (i.position = r.keyPosition, ee(i, "incomplete mapping pair in event stream")), r.kind === "document") i.documents.push(r.value);
        else {
          const o = r.tag.carrierIsResult ? r.value : Ms(i, r.position, r.tag, r.value);
          r.anchor && (r.anchor.value = o, r.anchor.isValueFinal = !0), sn(i, o, r.tag);
        }
        break;
      }
    }
  }
  return i.documents;
}
var N = -1, Ls = Object.prototype.hasOwnProperty, ut = 1, Ps = 2, Fs = 3, $i = 4, tb = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, ib = /[,\[\]{}]/, Ns = /^(?:!|!!|![0-9A-Za-z-]+!)$/, Cn = String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`, Rs = String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`, nb = new RegExp(`^(?:${Cn})*$`), rb = new RegExp(`^(?:${Rs})+$`), ob = new RegExp(`^(?:!(?:${Cn})*|${Rs}(?:${Cn})*)$`), wr = {
  filename: "",
  maxDepth: 100
};
function ab(e, t, i) {
  e.events.push({
    type: J.DOCUMENT,
    explicitStart: t,
    explicitEnd: i,
    directives: e.directives
  });
}
function zs(e, t, i, n, r, o, a) {
  e.events.push({
    type: J.SEQUENCE,
    start: t,
    anchorStart: i,
    anchorEnd: n,
    tagStart: r,
    tagEnd: o,
    style: a
  });
}
function Ds(e, t, i, n, r, o, a) {
  e.events.push({
    type: J.MAPPING,
    start: t,
    anchorStart: i,
    anchorEnd: n,
    tagStart: r,
    tagEnd: o,
    style: a
  });
}
function qo(e, t) {
  e.events.splice(t.eventsLength, 0, {
    type: J.MAPPING,
    start: t.position,
    anchorStart: N,
    anchorEnd: N,
    tagStart: N,
    tagEnd: N,
    style: pt.FLOW
  });
}
function _t(e, t, i, n, r, o, a, s, l = ve.CLIP, c = -1, h = !1) {
  e.events.push({
    type: J.SCALAR,
    valueStart: t,
    valueEnd: i,
    anchorStart: n,
    anchorEnd: r,
    tagStart: o,
    tagEnd: a,
    style: s,
    chomping: l,
    indent: c,
    fast: h
  });
}
function sb(e, t, i) {
  e.events.push({
    type: J.ALIAS,
    anchorStart: t,
    anchorEnd: i
  });
}
function st(e) {
  e.events.push({ type: J.POP });
}
function re(e) {
  _t(e, N, N, N, N, N, N, R.PLAIN);
}
function Ko() {
  return {
    anchorStart: N,
    anchorEnd: N,
    tagStart: N,
    tagEnd: N
  };
}
function lt(e) {
  return {
    position: e.position,
    line: e.line,
    lineStart: e.lineStart,
    lineIndent: e.lineIndent,
    firstTabInLine: e.firstTabInLine,
    eventsLength: e.events.length
  };
}
function ct(e, t) {
  e.position = t.position, e.line = t.line, e.lineStart = t.lineStart, e.lineIndent = t.lineIndent, e.firstTabInLine = t.firstTabInLine, e.events.length = t.eventsLength;
}
function E(e, t) {
  Ge.throwAt(e.input.slice(0, e.length), e.position, t, e.filename);
}
function Q(e) {
  return e === 10 || e === 13;
}
function wt(e) {
  return e === 9 || e === 32;
}
function fe(e) {
  return wt(e) || Q(e);
}
function Ee(e) {
  return e === 0 || fe(e);
}
function Ve(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function lb(e) {
  return e >= 48 && e <= 57 ? e - 48 : -1;
}
function cb(e) {
  if (e >= 48 && e <= 57) return e - 48;
  const t = e | 32;
  return t >= 97 && t <= 102 ? t - 97 + 10 : -1;
}
function db(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function hb(e) {
  return e === 48 || e === 97 || e === 98 || e === 116 || e === 9 || e === 110 || e === 118 || e === 102 || e === 114 || e === 101 || e === 32 || e === 34 || e === 47 || e === 92 || e === 78 || e === 95 || e === 76 || e === 80;
}
function ki(e) {
  e.input.charCodeAt(e.position) === 10 ? e.position++ : (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++), e.line++, e.lineStart = e.position, e.lineIndent = 0, e.firstTabInLine = -1;
}
function ie(e, t) {
  let i = 0, n = e.input.charCodeAt(e.position), r = e.position === e.lineStart || fe(e.input.charCodeAt(e.position - 1));
  for (; n !== 0; ) {
    for (; wt(n); )
      r = !0, n === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), n = e.input.charCodeAt(++e.position);
    if (t && r && n === 35) do
      n = e.input.charCodeAt(++e.position);
    while (!Q(n) && n !== 0);
    if (!Q(n)) break;
    for (ki(e), i++, r = !0, n = e.input.charCodeAt(e.position); n === 32; )
      e.lineIndent++, n = e.input.charCodeAt(++e.position);
  }
  return i;
}
function ft(e, t = e.position) {
  const i = e.input.charCodeAt(t);
  if ((i === 45 || i === 46) && i === e.input.charCodeAt(t + 1) && i === e.input.charCodeAt(t + 2)) {
    const n = e.input.charCodeAt(t + 3);
    return n === 0 || fe(n);
  }
  return !1;
}
function Hs(e) {
  e.position === e.lineStart && e.input.charCodeAt(e.position) === 65279 && (e.position++, e.lineStart = e.position);
}
function xr(e) {
  if (e.position !== e.lineStart) return !1;
  if (ft(e)) return !0;
  if (e.input.charCodeAt(e.position) !== 65279) return !1;
  const t = lt(e);
  Hs(e), ie(e, !0);
  const i = e.input.charCodeAt(e.position), n = e.position === e.lineStart && (i === 37 || i === 45 && ft(e));
  return ct(e, t), n;
}
function Go(e) {
  let t = e.input.charCodeAt(e.position);
  for (; t !== 0 && !Q(t); ) t = e.input.charCodeAt(++e.position);
}
function Us(e, t, i) {
  tb.test(e.input.slice(t, i)) && E(e, "the stream contains non-printable characters");
}
function pb(e, t, i) {
  if (e.input.charCodeAt(e.position) !== 33) return !1;
  t.tagStart !== N && E(e, "duplication of a tag property");
  const n = e.position;
  let r = !1, o = !1, a = "!", s = e.input.charCodeAt(++e.position);
  s === 60 ? (r = !0, s = e.input.charCodeAt(++e.position)) : s === 33 && (o = !0, a = "!!", s = e.input.charCodeAt(++e.position));
  let l = e.position, c;
  if (r) {
    for (; s !== 0 && s !== 62; ) s = e.input.charCodeAt(++e.position);
    s !== 62 && E(e, "unexpected end of the stream within a verbatim tag"), c = e.input.slice(l, e.position), e.position++;
  } else {
    for (; s !== 0 && !fe(s) && !(i && Ve(s)); )
      s === 33 && (o ? E(e, "tag suffix cannot contain exclamation marks") : (a = e.input.slice(l - 1, e.position + 1), Ns.test(a) || E(e, "named tag handle cannot contain such characters"), o = !0, l = e.position + 1)), s = e.input.charCodeAt(++e.position);
    c = e.input.slice(l, e.position), ib.test(c) && E(e, "tag suffix cannot contain flow indicator characters");
  }
  return c && !(r ? nb.test(c) : rb.test(c)) && E(e, `tag name cannot contain such characters: ${c}`), !r && a !== "!" && a !== "!!" && !Ls.call(e.tagHandlers, a) && E(e, `undeclared tag handle "${a}"`), t.tagStart = n, t.tagEnd = e.position, !0;
}
function ub(e, t) {
  if (e.input.charCodeAt(e.position) !== 38) return !1;
  t.anchorStart !== N && E(e, "duplication of an anchor property"), e.position++;
  const i = e.position;
  for (; e.input.charCodeAt(e.position) !== 0 && !fe(e.input.charCodeAt(e.position)) && !Ve(e.input.charCodeAt(e.position)); ) e.position++;
  return e.position === i && E(e, "name of an anchor node must contain at least one character"), t.anchorStart = i, t.anchorEnd = e.position, !0;
}
function fb(e, t) {
  if (e.input.charCodeAt(e.position) !== 42) return !1;
  (t.anchorStart !== N || t.tagStart !== N) && E(e, "alias node should not have any properties"), e.position++;
  const i = e.position;
  for (; e.input.charCodeAt(e.position) !== 0 && !fe(e.input.charCodeAt(e.position)) && !Ve(e.input.charCodeAt(e.position)); ) e.position++;
  return e.position === i && E(e, "name of an alias node must contain at least one character"), sb(e, i, e.position), !0;
}
function In(e, t) {
  ie(e, !1), e.lineIndent < t && E(e, "deficient indentation");
}
function mb(e, t, i) {
  if (e.input.charCodeAt(e.position) !== 39) return !1;
  e.position++;
  const n = e.position;
  let r = !0;
  for (; e.input.charCodeAt(e.position) !== 0; ) {
    const o = e.input.charCodeAt(e.position);
    if (o === 39) {
      if (e.input.charCodeAt(e.position + 1) === 39) {
        r = !1, e.position += 2;
        continue;
      }
      const a = e.position;
      return e.position++, _t(e, n, a, i.anchorStart, i.anchorEnd, i.tagStart, i.tagEnd, R.SINGLE_QUOTED, ve.CLIP, -1, r), !0;
    }
    Q(o) ? (r = !1, In(e, t)) : e.position === e.lineStart && ft(e) ? E(e, "unexpected end of the document within a single quoted scalar") : o !== 9 && o < 32 ? E(e, "expected valid JSON character") : e.position++;
  }
  E(e, "unexpected end of the stream within a single quoted scalar");
}
function gb(e, t, i) {
  if (e.input.charCodeAt(e.position) !== 34) return !1;
  e.position++;
  const n = e.position;
  let r = !0;
  for (; e.input.charCodeAt(e.position) !== 0; ) {
    const o = e.input.charCodeAt(e.position);
    if (o === 34) {
      const a = e.position;
      return e.position++, _t(e, n, a, i.anchorStart, i.anchorEnd, i.tagStart, i.tagEnd, R.DOUBLE_QUOTED, ve.CLIP, -1, r), !0;
    }
    if (o === 92) {
      r = !1;
      const a = e.input.charCodeAt(++e.position);
      if (Q(a)) In(e, t);
      else if (hb(a)) e.position++;
      else {
        let s = db(a);
        for (s === 0 && E(e, "unknown escape sequence"); s-- > 0; )
          e.position++, cb(e.input.charCodeAt(e.position)) < 0 && E(e, "expected hexadecimal character");
        e.position++;
      }
    } else Q(o) ? (r = !1, In(e, t)) : e.position === e.lineStart && ft(e) ? E(e, "unexpected end of the document within a double quoted scalar") : o !== 9 && o < 32 ? E(e, "expected valid JSON character") : e.position++;
  }
  E(e, "unexpected end of the stream within a double quoted scalar");
}
function yb(e, t, i) {
  const n = e.input.charCodeAt(e.position);
  let r = ve.CLIP, o = -1, a = !1;
  if (n !== 124 && n !== 62) return !1;
  const s = n === 124 ? R.LITERAL_BLOCK : R.FOLDED_BLOCK;
  for (e.position++; e.input.charCodeAt(e.position) !== 0; ) {
    const g = e.input.charCodeAt(e.position), y = lb(g);
    if (g === 43 || g === 45)
      r !== ve.CLIP && E(e, "repeat of a chomping mode identifier"), r = g === 43 ? ve.KEEP : ve.STRIP, e.position++;
    else if (y >= 0)
      y === 0 && E(e, "bad explicit indentation width of a block scalar; it cannot be less than one"), a && E(e, "repeat of an indentation width identifier"), o = t + y - 1, a = !0, e.position++;
    else break;
  }
  let l = !1;
  for (; wt(e.input.charCodeAt(e.position)); )
    l = !0, e.position++;
  l && e.input.charCodeAt(e.position) === 35 && Go(e), Q(e.input.charCodeAt(e.position)) ? ki(e) : e.input.charCodeAt(e.position) !== 0 && E(e, "a line break is expected");
  let c = a ? o : -1, h = 0;
  const d = e.position;
  let p = e.position;
  for (; e.input.charCodeAt(e.position) !== 0; ) {
    const g = e.position;
    let y = 0;
    for (; e.input.charCodeAt(g + y) === 32; ) y++;
    const b = e.input.charCodeAt(g + y);
    if (b === 0) {
      c >= 0 ? y > c && (p = g + y) : y > 0 && (p = g + y);
      break;
    }
    if (xr(e)) break;
    if (!a && c === -1 && Q(b) && (h = Math.max(h, y)), !a && c === -1 && !Q(b) && (b === 9 && y < t && (e.position = g + y, E(e, "tab characters must not be used in indentation")), y >= t && y < h && (e.position = g + y, E(e, "bad indentation of a mapping entry"))), c === -1 && b !== 0 && !Q(b) && y < t) {
      e.lineIndent = y, e.position = g + y;
      break;
    }
    !a && b !== 0 && !Q(b) && c === -1 && (c = y);
    const v = c === -1 ? t + 1 : c;
    if (b !== 0 && !Q(b) && y < v) {
      e.lineIndent = y, e.position = g + y;
      break;
    }
    Go(e), p = e.position, Q(e.input.charCodeAt(e.position)) && (ki(e), p = e.position);
  }
  return Us(e, d, p), _t(e, d, p, i.anchorStart, i.anchorEnd, i.tagStart, i.tagEnd, s, r, c), !0;
}
function bb(e, t) {
  const i = e.input.charCodeAt(e.position), n = t === ut;
  if (i === 0 || fe(i) || i === 35 || i === 38 || i === 42 || i === 33 || i === 124 || i === 62 || i === 39 || i === 34 || i === 37 || i === 64 || i === 96 || n && Ve(i)) return !1;
  if (i === 63 || i === 45) {
    const r = e.input.charCodeAt(e.position + 1);
    if (Ee(r) || n && Ve(r)) return !1;
  }
  return !0;
}
function vb(e, t, i, n) {
  if (!bb(e, i)) return !1;
  const r = e.position;
  let o = e.position, a = e.input.charCodeAt(e.position);
  const s = i === ut;
  let l = !1;
  for (; a !== 0 && !xr(e); ) {
    if (a === 58) {
      const c = e.input.charCodeAt(e.position + 1);
      if (Ee(c) || s && Ve(c)) break;
    } else if (a === 35) {
      if (fe(e.input.charCodeAt(e.position - 1))) break;
    } else {
      if (s && Ve(a)) break;
      if (Q(a)) {
        const c = e.position, h = e.line, d = e.lineStart, p = e.lineIndent;
        if (ie(e, !1), e.lineIndent >= t) {
          l = !0, a = e.input.charCodeAt(e.position);
          continue;
        }
        e.position = c, e.line = h, e.lineStart = d, e.lineIndent = p;
        break;
      }
    }
    wt(a) || (o = e.position + 1), a = e.input.charCodeAt(++e.position);
  }
  return o === r ? !1 : (Us(e, r, o), _t(e, r, o, n.anchorStart, n.anchorEnd, n.tagStart, n.tagEnd, R.PLAIN, ve.CLIP, -1, !l), !0);
}
function Tt(e, t) {
  const i = e.line;
  ie(e, !0), (e.line > i && e.lineIndent < t || e.firstTabInLine !== -1 && e.lineIndent < t) && E(e, "deficient indentation");
}
function _b(e, t, i) {
  const n = e.input.charCodeAt(e.position), r = n === 123, o = e.position;
  let a = !0;
  if (n !== 91 && n !== 123) return !1;
  const s = r ? 125 : 93;
  for (r ? Ds(e, o, i.anchorStart, i.anchorEnd, i.tagStart, i.tagEnd, pt.FLOW) : zs(e, o, i.anchorStart, i.anchorEnd, i.tagStart, i.tagEnd, pt.FLOW), e.position++; e.input.charCodeAt(e.position) !== 0; ) {
    Tt(e, t);
    let l = e.input.charCodeAt(e.position);
    if (l === s)
      return e.position++, st(e), !0;
    a ? l === 44 && E(e, "expected the node content, but found ','") : E(e, "missed comma between flow collection entries");
    let c = !1, h = !1;
    l === 63 && fe(e.input.charCodeAt(e.position + 1)) && (c = h = !0, e.position += 1, Tt(e, t));
    const d = e.line, p = lt(e), g = mt(e, t, ut, !1, !0);
    Tt(e, t), l = e.input.charCodeAt(e.position), (r || h || e.line === d) && l === 58 ? (c = !0, e.position++, Tt(e, t), r || qo(e, p), g || re(e), mt(e, t, ut, !1, !0) || re(e), Tt(e, t), r || st(e)) : r && c ? (g || re(e), re(e)) : r ? re(e) : c && (qo(e, p), g || re(e), re(e), st(e)), l = e.input.charCodeAt(e.position), l === 44 ? (a = !0, e.position++) : a = !1;
  }
  E(e, "unexpected end of the stream within a flow collection");
}
function Vo(e, t, i) {
  if (e.firstTabInLine !== -1 || e.input.charCodeAt(e.position) !== 45 || !Ee(e.input.charCodeAt(e.position + 1))) return !1;
  for (zs(e, e.position, i.anchorStart, i.anchorEnd, i.tagStart, i.tagEnd, pt.BLOCK); e.input.charCodeAt(e.position) === 45 && Ee(e.input.charCodeAt(e.position + 1)); ) {
    e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, E(e, "tab characters must not be used in indentation"));
    const n = e.line;
    e.position++;
    const r = ie(e, !0) > 0;
    if (e.firstTabInLine !== -1 && e.input.charCodeAt(e.position) === 45 && Ee(e.input.charCodeAt(e.position + 1)) && E(e, "bad indentation of a sequence entry"), r && e.lineIndent <= t ? re(e) : mt(e, t, Fs, !1, !0), ie(e, !0), e.lineIndent < t || e.position >= e.length) break;
    e.lineIndent > t && E(e, "bad indentation of a sequence entry"), e.line === n && e.input.charCodeAt(e.position) === 45 && Ee(e.input.charCodeAt(e.position + 1)) && E(e, "bad indentation of a sequence entry");
  }
  return st(e), !0;
}
function cn(e, t, i, n) {
  let r = !1, o = !1, a = !1, s = !1;
  if (e.firstTabInLine !== -1) return !1;
  let l = e.input.charCodeAt(e.position);
  for (; l !== 0; ) {
    !r && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, E(e, "tab characters must not be used in indentation"));
    const c = e.input.charCodeAt(e.position + 1), h = e.line;
    if ((l === 63 || l === 58) && Ee(c))
      a || (Ds(e, e.position, n.anchorStart, n.anchorEnd, n.tagStart, n.tagEnd, pt.BLOCK), a = !0), l === 63 ? (r && re(e), o = !0, r = !0) : (r || (re(e), o = !0), r = !1), e.position += 1, s = !0;
    else {
      r && (re(e), r = !1);
      const d = lt(e);
      if (!mt(e, i, Ps, !1, !0)) break;
      if (e.line === h) {
        for (l = e.input.charCodeAt(e.position); wt(l); ) l = e.input.charCodeAt(++e.position);
        if (l === 58)
          l = e.input.charCodeAt(++e.position), Ee(l) || E(e, "a whitespace character is expected after the key-value separator within a block mapping"), a || (e.events.splice(d.eventsLength, 0, {
            type: J.MAPPING,
            start: d.position,
            anchorStart: n.anchorStart,
            anchorEnd: n.anchorEnd,
            tagStart: n.tagStart,
            tagEnd: n.tagEnd,
            style: pt.BLOCK
          }), a = !0), o = !0, r = !1, s = !1;
        else if (o) E(e, "expected ':' after a mapping key");
        else
          return n.anchorStart !== N || n.tagStart !== N ? (ct(e, d), !1) : !0;
      } else if (o) E(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return n.anchorStart !== N || n.tagStart !== N ? (ct(e, d), !1) : !0;
    }
    if (mt(e, t, $i, !0, s) && (s = !1), r || s && (re(e), s = !1), ie(e, !0), l = e.input.charCodeAt(e.position), (e.line === h || e.lineIndent > t) && l !== 0) E(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t) break;
  }
  return o ? (r && re(e), a && st(e), !0) : !1;
}
function mt(e, t, i, n, r, o = !0) {
  e.depth >= e.maxDepth && E(e, `nesting exceeded maxDepth (${e.maxDepth})`), e.depth++;
  let a = 1, s = !1, l = !1, c = null;
  const h = Ko();
  let d = i === $i || i === Fs, p = d;
  const g = d;
  if (n && ie(e, !0) && (s = !0, e.lineIndent > t ? a = 1 : e.lineIndent === t ? a = 0 : a = -1), a === 1) for (; ; ) {
    const y = e.input.charCodeAt(e.position), b = lt(e);
    if (s && a !== 1 && (y === 33 || y === 38)) break;
    if (s && g && (h.tagStart !== N || h.anchorStart !== N) && (y === 33 || y === 38)) {
      const v = lt(e), x = t + 1;
      if (cn(e, e.position - e.lineStart, x, h) && e.events[v.eventsLength]?.type === J.MAPPING)
        return e.depth--, !0;
      ct(e, v);
    }
    if (s && (y === 33 && h.tagStart !== N || y === 38 && h.anchorStart !== N) || !pb(e, h, i === ut) && !ub(e, h)) break;
    c === null && (c = b), ie(e, !0) ? (s = !0, p = g, e.lineIndent > t ? a = 1 : e.lineIndent === t ? a = 0 : a = -1) : p = !1;
  }
  if (p && (p = s || r), a === 1 || i === $i) {
    const y = i === ut || i === Ps ? t : t + 1, b = e.position - e.lineStart;
    if (a === 1) if (p && (Vo(e, b, h) || cn(e, b, y, h)) || _b(e, y, h)) l = !0;
    else {
      const v = e.input.charCodeAt(e.position);
      if (c !== null && o && g && !p && v !== 124 && v !== 62) {
        const x = lt(e), A = c.position - c.lineStart;
        ct(e, c), cn(e, A, y, Ko()) && e.events[x.eventsLength]?.type === J.MAPPING ? l = !0 : ct(e, x);
      }
      !l && (d && yb(e, y, h) || mb(e, y, h) || gb(e, y, h) || fb(e, h) || vb(e, y, i, h)) && (l = !0);
    }
    else a === 0 && (l = p && Vo(e, b, h));
  }
  return d = d && !l, !l && (h.anchorStart !== N || h.tagStart !== N || d) && (_t(e, N, N, h.anchorStart, h.anchorEnd, h.tagStart, h.tagEnd, R.PLAIN), l = !0), e.depth--, l || h.anchorStart !== N || h.tagStart !== N;
}
function wb(e) {
  if (e.lineIndent > 0 || e.input.charCodeAt(e.position) !== 37) return !1;
  e.position++;
  const t = e.position;
  for (; e.input.charCodeAt(e.position) !== 0 && !fe(e.input.charCodeAt(e.position)); ) e.position++;
  const i = e.input.slice(t, e.position), n = [];
  for (i.length === 0 && E(e, "directive name must not be less than one character in length"); e.input.charCodeAt(e.position) !== 0 && !Q(e.input.charCodeAt(e.position)); ) {
    for (; wt(e.input.charCodeAt(e.position)); ) e.position++;
    if (e.input.charCodeAt(e.position) === 35 || Q(e.input.charCodeAt(e.position)) || e.input.charCodeAt(e.position) === 0) break;
    const r = e.position;
    for (; e.input.charCodeAt(e.position) !== 0 && !fe(e.input.charCodeAt(e.position)); ) e.position++;
    n.push(e.input.slice(r, e.position));
  }
  if (Q(e.input.charCodeAt(e.position)) && ki(e), i === "YAML") {
    e.directives.some((o) => o.kind === "yaml") && E(e, "duplication of %YAML directive"), n.length !== 1 && E(e, "YAML directive accepts exactly one argument");
    const r = /^([0-9]+)\.([0-9]+)$/.exec(n[0]);
    r === null && E(e, "ill-formed argument of the YAML directive"), parseInt(r[1], 10) !== 1 && E(e, "unacceptable YAML version of the document"), e.directives.push({
      kind: "yaml",
      version: n[0]
    });
  } else if (i === "TAG") {
    n.length !== 2 && E(e, "TAG directive accepts exactly two arguments");
    const [r, o] = n;
    Ns.test(r) || E(e, "ill-formed tag handle (first argument) of the TAG directive"), Ls.call(e.tagHandlers, r) && E(e, `there is a previously declared suffix for "${r}" tag handle`), ob.test(o) || E(e, "ill-formed tag prefix (second argument) of the TAG directive"), e.tagHandlers[r] = o, e.directives.push({
      kind: "tag",
      handle: r,
      prefix: o
    });
  }
  return !0;
}
function xb(e) {
  e.directives = [], e.tagHandlers = /* @__PURE__ */ Object.create(null);
  let t = !1;
  for (ie(e, !0); wb(e); )
    t = !0, ie(e, !0);
  let i = !1, n = !1, r = !0;
  if (e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 && Ee(e.input.charCodeAt(e.position + 3))) {
    i = !0;
    const s = e.line;
    e.position += 3, ie(e, !0), r = e.line > s;
  } else t && E(e, "directives end mark is expected");
  const o = e.events.length;
  if (!i && e.position === e.lineStart && e.input.charCodeAt(e.position) === 46 && ft(e)) {
    e.position += 3, ie(e, !0);
    return;
  }
  if (ab(e, i, !1), mt(e, e.lineIndent - 1, $i, !1, r, r) || re(e), ie(e, !0), e.position === e.lineStart && ft(e) && (n = e.input.charCodeAt(e.position) === 46, n)) {
    const s = e.line;
    e.position += 3, ie(e, !0), e.line === s && e.position < e.length && E(e, "end of the stream or a document separator is expected");
  }
  const a = e.events[o];
  a?.type === J.DOCUMENT && (a.explicitEnd = n), st(e), !n && e.position < e.length && !xr(e) && E(e, "end of the stream or a document separator is expected");
}
function $b(e, t) {
  const i = e.length, n = {
    ...wr,
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
  }, r = e.indexOf("\0");
  for (r !== -1 && Ge.throwAt(e, r, "null byte is not allowed in input", n.filename); n.position < n.length && (Hs(n), ie(n, !0), !(n.position >= n.length)); ) {
    const o = n.position;
    xb(n), n.position === o && E(n, "can not read a document");
  }
  return n.events;
}
var kb = {
  ...wr,
  ..._r
};
function Sb(e, t = {}) {
  const i = {
    ...kb,
    ...t
  }, n = String(e), r = Object.keys(wr), o = Object.keys(_r);
  return eb($b(n, Ro(i, r)), {
    ...Ro(i, o),
    source: n
  });
}
function Eb(e, t) {
  const i = Sb(e, t);
  if (i.length === 0) throw new Ge("expected a document, but the input is empty");
  if (i.length === 1) return i[0];
  throw new Ge("expected a single document in the stream, but found more");
}
function Yi(e, t) {
  return (e & 1 << t) !== 0;
}
var Yo = {
  applyQuoteFlowKeysOption: Ab,
  doubleQuoteForInvisibles: Tb,
  doubleQuoteWhitespaceOnly: Cb,
  applyForceQuotesOption: Ib,
  tryLongOrMultilineAsBlock: Mb,
  quoteInvalidPlain: Ob,
  fallbackToDoubleQuoted: Lb
};
function Bs(e) {
  return e.presenterOptions.quoteStyle === "single" && Yi(e.allowedStylesMask, R.SINGLE_QUOTED) ? R.SINGLE_QUOTED : R.DOUBLE_QUOTED;
}
function Ab(e) {
  e.presenterOptions.quoteFlowKeys && (!e.isKey || !e.flowOnly || e.style !== R.PLAIN || (e.style = R.DOUBLE_QUOTED));
}
function Tb(e) {
  e.style === R.PLAIN && /[\t\x7F-\xA0\u2028\u2029\uFEFF\uFFFE\uFFFF]/.test(e.node.value) && (e.style = R.DOUBLE_QUOTED);
}
function Cb(e) {
  e.style === R.PLAIN && /^\s+$/.test(e.node.value) && (e.style = R.DOUBLE_QUOTED);
}
function Ib(e) {
  e.presenterOptions.forceQuotes && (e.isKey || e.style !== R.PLAIN || e.node.tag === e.presenterOptions.schema.defaultScalarTag.tagName && (e.style = e.node.value.includes(`
`) ? R.DOUBLE_QUOTED : Bs(e)));
}
function Mb(e) {
  if (e.style !== R.PLAIN || e.isKey) return;
  const t = e.node.value, i = t.indexOf(`
`) !== -1;
  if (!Yi(e.allowedStylesMask, R.LITERAL_BLOCK)) {
    i && (e.style = R.DOUBLE_QUOTED);
    return;
  }
  const n = e.presenterOptions.lineWidth;
  if (n === -1) {
    i && (e.style = R.LITERAL_BLOCK);
    return;
  }
  const r = Math.max(Math.min(n, 40), n - e.shiftOfContent);
  let o = 0, a = !1;
  for (; o <= t.length; ) {
    let s = t.length;
    const l = t.indexOf(`
`, o);
    l !== -1 && (s = l);
    const c = t.slice(o, s);
    if (c.length > r && c[0] !== " " && / [^ \t]/.test(c) && (a = !0), l === -1) break;
    o = l + 1;
  }
  a ? e.style = R.FOLDED_BLOCK : i && (e.style = R.LITERAL_BLOCK);
}
function Ob(e) {
  e.style === R.PLAIN && !Yi(e.allowedStylesMask, R.PLAIN) && (e.style = Bs(e));
}
function Lb(e) {
  Yi(e.allowedStylesMask, e.style) || (e.style = R.DOUBLE_QUOTED);
}
Object.keys(Yo).map((e) => Reflect.get(Yo, e));
const Pb = "custom:fp-ef-card", Mn = (e) => !!e && typeof e == "object" && !Array.isArray(e), js = (e) => Array.isArray(e.floors) || ["walls", "openings", "items", "texts"].some((t) => Array.isArray(e[t]));
function On(e, t = 0) {
  if (!(t > 6)) {
    if (Mn(e)) {
      if (typeof e.type == "string" && /easy-floorplan/.test(e.type) && js(e)) return e;
      for (const i of Object.values(e)) {
        const n = On(i, t + 1);
        if (n) return n;
      }
    } else if (Array.isArray(e))
      for (const i of e) {
        const n = On(i, t + 1);
        if (n) return n;
      }
  }
}
const Zo = (e) => Array.isArray(e) ? e.length : 0;
function Fb(e) {
  let t;
  try {
    t = Eb(e);
  } catch (a) {
    throw new Error(`Kein gültiges YAML/JSON: ${a.message.split(`
`)[0]}`);
  }
  const i = Mn(t) && js(t) ? t : On(t);
  if (!i) throw new Error("Keine easy-floorplan-Konfiguration gefunden (erwartet: floors, walls, openings …).");
  const n = structuredClone({ ...i, type: Pb }), r = Array.isArray(n.floors) ? n.floors : [], o = (a) => Zo(n[a]) + r.reduce((s, l) => s + Zo(Mn(l) ? l[a] : 0), 0);
  return {
    config: n,
    summary: {
      floors: r.length || 1,
      walls: o("walls"),
      openings: o("openings"),
      items: o("items"),
      texts: o("texts")
    }
  };
}
var Nb = Object.defineProperty, Rb = Object.getOwnPropertyDescriptor, ye = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Rb(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (r = (n ? a(t, i, r) : a(r)) || r);
  return n && r && Nb(t, i, r), r;
};
const Xo = "floorplan_panel", Qo = 800, zb = "custom:fp-ef-card";
function Db(e) {
  return e?.ef ? structuredClone(e.ef) : { type: zb };
}
let de = class extends ae {
  constructor() {
    super(...arguments), this.revision = 0, this.edit = !1, this.narrow = !1, this._status = "", this._error = "", this._importText = "", this._importError = "", this._saving = !1, this._rev = 0, this._onConfigChanged = (e) => {
      const t = e.detail?.config;
      t && (e.stopPropagation(), this._pending = t, clearTimeout(this._timer), this._timer = setTimeout(() => void this._flush(), Qo));
    }, this._onAreaTap = (e) => {
      const { areaId: t, zoomed: i } = e.detail, n = this.plan?.ef, r = [...(n?.floors ?? []).map((a) => a.areas ?? []), n?.areas ?? []], o = i ? r.flat().find((a) => a?.id === t) : void 0;
      this._room = o && o.sidebar?.length ? { ...o, name: o.name ?? "", sidebar: o.sidebar } : void 0;
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
    t && (t.hass = this.hass, (this._loadedEl !== t || !this.edit && e.has("plan")) && (this._loadedEl = t, t.setConfig(Db(this.plan))));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._pending && this._flush();
  }
  async _flush() {
    if (clearTimeout(this._timer), !this._pending || this._saving) {
      this._pending && (this._timer = setTimeout(() => void this._flush(), Qo));
      return;
    }
    const e = this._pending;
    this._pending = void 0, await this._saveNow(e);
  }
  async _saveNow(e) {
    this._saving = !0, this._status = "saving", this._error = "";
    try {
      const t = await this.hass.callWS({
        type: `${Xo}/plan/save`,
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
  /** Dienst floorplan_panel.show_room: nur in der Ansicht, nicht im Editor. */
  showRoom(e, t) {
    return this.edit ? !1 : this.renderRoot.querySelector("fp-ef-card")?.showRoom(e, t) ?? !1;
  }
  /** Dienst floorplan_panel.reset_view. */
  resetView() {
    this.edit || this.renderRoot.querySelector("fp-ef-card")?.resetView();
  }
  _fire(e) {
    this.dispatchEvent(new CustomEvent(e, { bubbles: !0, composed: !0 }));
  }
  async _loadSample() {
    try {
      const e = await this.hass.callWS({ type: `${Xo}/plan/load_sample` });
      this._plan = e.plan, this._rev = e.revision, this.dispatchEvent(
        new CustomEvent("ef-saved", { detail: { plan: e.plan, revision: e.revision }, bubbles: !0, composed: !0 })
      );
    } catch (e) {
      this._status = "error", this._error = e?.message ?? String(e);
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
      e = Fb(this._importText);
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
    if (!this.edit && !this.plan?.ef) {
      const e = !!this.hass?.user?.is_admin;
      return f`<div class="empty">
        <ha-icon icon="mdi:floor-plan"></ha-icon>
        <p>Noch kein Grundriss gezeichnet.</p>
        ${this._status === "error" ? f`<p class="err">${this._error}</p>` : m}
        ${e ? f`<div class="row">
              <button class="primary" @click=${() => this._fire("ef-edit-request")}>Editor öffnen</button>
              <button @click=${this._loadSample}>Beispiel-Grundriss laden</button>
            </div>` : f`<p>Ein Administrator kann ihn im Editor anlegen oder importieren.</p>`}
      </div>`;
    }
    return this.edit ? f`
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
        ${this._importError ? f`<div class="err">${this._importError}</div>` : m}
        <div class="row">
          <button @click=${() => this._dialog()?.close()}>Abbrechen</button>
          <button class="primary" ?disabled=${!this._importText.trim()} @click=${this._applyImport}>Als Entwurf laden</button>
        </div>
      </dialog>
    ` : f`<fp-ef-card @fp-area-tap=${this._onAreaTap}></fp-ef-card>
        ${this._room ? f`<fp-room-dialog .hass=${this.hass} .area=${this._room} @close=${() => this._room = void 0}></fp-room-dialog>` : m}`;
  }
};
de.styles = me`
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
    .empty {
      margin: auto;
      text-align: center;
      color: var(--secondary-text-color);
      padding: 24px;
    }
    .empty ha-icon {
      --mdc-icon-size: 64px;
      opacity: 0.5;
    }
    .empty .err {
      color: var(--error-color, #db4437);
    }
    .empty .row {
      display: flex;
      gap: 8px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .empty button {
      font: inherit;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border-radius: 18px;
      padding: 8px 16px;
      cursor: pointer;
    }
    .empty button.primary {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
  `;
ye([
  C({ attribute: !1 })
], de.prototype, "hass", 2);
ye([
  C({ attribute: !1 })
], de.prototype, "plan", 2);
ye([
  C({ type: Number })
], de.prototype, "revision", 2);
ye([
  C({ type: Boolean })
], de.prototype, "edit", 2);
ye([
  C({ attribute: !1 })
], de.prototype, "narrow", 2);
ye([
  M()
], de.prototype, "_status", 2);
ye([
  M()
], de.prototype, "_error", 2);
ye([
  M()
], de.prototype, "_room", 2);
ye([
  M()
], de.prototype, "_importText", 2);
ye([
  M()
], de.prototype, "_importError", 2);
de = ye([
  gt("fp-ef-host")
], de);
var Hb = Object.defineProperty, Ub = Object.getOwnPropertyDescriptor, Ne = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Ub(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (r = (n ? a(t, i, r) : a(r)) || r);
  return n && r && Hb(t, i, r), r;
};
const Jo = "floorplan_panel";
let xe = class extends ae {
  constructor() {
    super(...arguments), this.narrow = !1, this._edit = !1, this._revision = 0, this._loading = !1;
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
      const e = await this.hass.callWS({ type: `${Jo}/plan/get` });
      this._setPlan(e.plan, e.revision), this._unsub || (this._unsub = await this.hass.connection.subscribeMessage((t) => this._onEvent(t), {
        type: `${Jo}/subscribe`
      }));
    } catch (e) {
      this._error = e?.message ?? String(e);
    } finally {
      this._loading = !1;
    }
  }
  _setPlan(e, t) {
    this._plan = e, this._revision = t;
  }
  async _onEvent(e) {
    e.type === "plan_updated" ? e.revision !== this._revision && !this._edit && await this._load() : e.type === "show_room" ? this._host()?.showRoom(e.room, e.floor) : e.type === "reset_view" && this._host()?.resetView();
  }
  _host() {
    return this.renderRoot.querySelector("fp-ef-host");
  }
  get _isAdmin() {
    return !!this.hass?.user?.is_admin;
  }
  /** Öffnet/schließt die HA-Seitenleiste (auf schmalen Bildschirmen). */
  _toggleMenu() {
    this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: !0, composed: !0 }));
  }
  _onEfSaved(e) {
    this._setPlan(e.detail.plan, e.detail.revision);
  }
  render() {
    return f`
      <div class="toolbar">
        ${this.narrow ? f`<button class="icon-btn" title="Menü" @click=${this._toggleMenu}><ha-icon icon="mdi:menu"></ha-icon></button>` : f`<span class="spacer"></span>`}
        <div class="main-title">Grundriss</div>
        ${this._isAdmin && this._plan && !this._edit ? f`<button class="icon-btn" title="Grundriss bearbeiten" @click=${() => this._edit = !0}>
              <ha-icon icon="mdi:pencil-ruler"></ha-icon>
            </button>` : m}
      </div>
      ${this._error ? f`<div class="message error">Grundriss konnte nicht geladen werden: ${this._error}</div>` : this._plan ? f`<fp-ef-host
            .hass=${this.hass}
            .plan=${this._plan}
            .revision=${this._revision}
            .edit=${this._edit}
            @ef-saved=${this._onEfSaved}
            @ef-edit-request=${() => this._edit = !0}
            @ef-close=${() => this._edit = !1}
          ></fp-ef-host>` : f`<div class="message">Lade …</div>`}
    `;
  }
};
xe.styles = me`
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
    .main-title {
      flex: 1;
      font-size: 20px;
      margin-left: 8px;
    }
    button {
      font: inherit;
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
    .message {
      margin: auto;
      text-align: center;
      color: var(--secondary-text-color);
      padding: 24px;
    }
    .message.error {
      color: var(--error-color, #db4437);
    }
  `;
Ne([
  C({ attribute: !1 })
], xe.prototype, "hass", 2);
Ne([
  C({ type: Boolean, reflect: !0 })
], xe.prototype, "narrow", 2);
Ne([
  C({ attribute: !1 })
], xe.prototype, "panel", 2);
Ne([
  M()
], xe.prototype, "_plan", 2);
Ne([
  M()
], xe.prototype, "_edit", 2);
Ne([
  M()
], xe.prototype, "_revision", 2);
Ne([
  M()
], xe.prototype, "_error", 2);
xe = Ne([
  gt("floorplan-panel")
], xe);
