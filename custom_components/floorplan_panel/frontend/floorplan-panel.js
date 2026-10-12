var El = Object.defineProperty;
var Al = (e, t, i) => t in e ? El(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var pe = (e, t, i) => Al(e, typeof t != "symbol" ? t + "" : t, i);
function Oe(e) {
  return (t) => {
    customElements.get(e) || customElements.define(e, t);
  };
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Jt = globalThis, Kn = Jt.ShadowRoot && (Jt.ShadyCSS === void 0 || Jt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, qn = Symbol(), Br = /* @__PURE__ */ new WeakMap();
let ba = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== qn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Kn && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Br.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Br.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const li = (e) => new ba(typeof e == "string" ? e : e + "", void 0, qn), $e = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, r, o) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[o + 1], e[0]);
  return new ba(i, e, qn);
}, Tl = (e, t) => {
  if (Kn) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), r = Jt.litNonce;
    r !== void 0 && n.setAttribute("nonce", r), n.textContent = i.cssText, e.appendChild(n);
  }
}, Ur = Kn ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return li(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Cl, defineProperty: Il, getOwnPropertyDescriptor: Ol, getOwnPropertyNames: Ll, getOwnPropertySymbols: Ml, getPrototypeOf: Pl } = Object, Ci = globalThis, jr = Ci.trustedTypes, Fl = jr ? jr.emptyScript : "", Nl = Ci.reactiveElementPolyfillSupport, Mt = (e, t) => e, ci = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Fl : null;
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
} }, Gn = (e, t) => !Cl(e, t), Wr = { attribute: !0, type: String, converter: ci, reflect: !1, useDefault: !1, hasChanged: Gn };
Symbol.metadata ??= Symbol("metadata"), Ci.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let nt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Wr) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), r = this.getPropertyDescriptor(t, n, i);
      r !== void 0 && Il(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: r, set: o } = Ol(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Wr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Mt("elementProperties"))) return;
    const t = Pl(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Mt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Mt("properties"))) {
      const i = this.properties, n = [...Ll(i), ...Ml(i)];
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
      for (const r of n) i.unshift(Ur(r));
    } else t !== void 0 && i.push(Ur(t));
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
    return Tl(t, this.constructor.elementStyles), t;
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
      const o = (n.converter?.toAttribute !== void 0 ? n.converter : ci).toAttribute(i, n.type);
      this._$Em = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, r = n._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const o = n.getPropertyOptions(r), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : ci;
      this._$Em = r;
      const s = a.fromAttribute(i, o.type);
      this[r] = s ?? this._$Ej?.get(r) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, r = !1, o) {
    if (t !== void 0) {
      const a = this.constructor;
      if (r === !1 && (o = this[t]), n ??= a.getPropertyOptions(t), !((n.hasChanged ?? Gn)(o, i) || n.useDefault && n.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, n)))) return;
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
nt.elementStyles = [], nt.shadowRootOptions = { mode: "open" }, nt[Mt("elementProperties")] = /* @__PURE__ */ new Map(), nt[Mt("finalized")] = /* @__PURE__ */ new Map(), Nl?.({ ReactiveElement: nt }), (Ci.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Vn = globalThis, Kr = (e) => e, di = Vn.trustedTypes, qr = di ? di.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, va = "$lit$", Fe = `lit$${Math.random().toFixed(9).slice(2)}$`, _a = "?" + Fe, Rl = `<${_a}>`, Ze = document, zt = () => Ze.createComment(""), Ht = (e) => e === null || typeof e != "object" && typeof e != "function", Yn = Array.isArray, Dl = (e) => Yn(e) || typeof e?.[Symbol.iterator] == "function", en = `[ 	
\f\r]`, $t = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Gr = /-->/g, Vr = />/g, Be = RegExp(`>|${en}(?:([^\\s"'>=/]+)(${en}*=${en}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Yr = /'/g, Zr = /"/g, wa = /^(?:script|style|textarea|title)$/i, xa = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), u = xa(1), _ = xa(2), we = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), Xr = /* @__PURE__ */ new WeakMap(), qe = Ze.createTreeWalker(Ze, 129);
function $a(e, t) {
  if (!Yn(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return qr !== void 0 ? qr.createHTML(t) : t;
}
const zl = (e, t) => {
  const i = e.length - 1, n = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = $t;
  for (let s = 0; s < i; s++) {
    const l = e[s];
    let c, h, d = -1, p = 0;
    for (; p < l.length && (a.lastIndex = p, h = a.exec(l), h !== null); ) p = a.lastIndex, a === $t ? h[1] === "!--" ? a = Gr : h[1] !== void 0 ? a = Vr : h[2] !== void 0 ? (wa.test(h[2]) && (r = RegExp("</" + h[2], "g")), a = Be) : h[3] !== void 0 && (a = Be) : a === Be ? h[0] === ">" ? (a = r ?? $t, d = -1) : h[1] === void 0 ? d = -2 : (d = a.lastIndex - h[2].length, c = h[1], a = h[3] === void 0 ? Be : h[3] === '"' ? Zr : Yr) : a === Zr || a === Yr ? a = Be : a === Gr || a === Vr ? a = $t : (a = Be, r = void 0);
    const g = a === Be && e[s + 1].startsWith("/>") ? " " : "";
    o += a === $t ? l + Rl : d >= 0 ? (n.push(c), l.slice(0, d) + va + l.slice(d) + Fe + g) : l + Fe + (d === -2 ? s : g);
  }
  return [$a(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Bt {
  constructor({ strings: t, _$litType$: i }, n) {
    let r;
    this.parts = [];
    let o = 0, a = 0;
    const s = t.length - 1, l = this.parts, [c, h] = zl(t, i);
    if (this.el = Bt.createElement(c, n), qe.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = qe.nextNode()) !== null && l.length < s; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(va)) {
          const p = h[a++], g = r.getAttribute(d).split(Fe), y = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: o, name: y[2], strings: g, ctor: y[1] === "." ? Bl : y[1] === "?" ? Ul : y[1] === "@" ? jl : Ii }), r.removeAttribute(d);
        } else d.startsWith(Fe) && (l.push({ type: 6, index: o }), r.removeAttribute(d));
        if (wa.test(r.tagName)) {
          const d = r.textContent.split(Fe), p = d.length - 1;
          if (p > 0) {
            r.textContent = di ? di.emptyScript : "";
            for (let g = 0; g < p; g++) r.append(d[g], zt()), qe.nextNode(), l.push({ type: 2, index: ++o });
            r.append(d[p], zt());
          }
        }
      } else if (r.nodeType === 8) if (r.data === _a) l.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(Fe, d + 1)) !== -1; ) l.push({ type: 7, index: o }), d += Fe.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const n = Ze.createElement("template");
    return n.innerHTML = t, n;
  }
}
function ut(e, t, i = e, n) {
  if (t === we) return t;
  let r = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const o = Ht(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(!1), o === void 0 ? r = void 0 : (r = new o(e), r._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = r : i._$Cl = r), r !== void 0 && (t = ut(e, r._$AS(e, t.values), r, n)), t;
}
class Hl {
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
    const { el: { content: i }, parts: n } = this._$AD, r = (t?.creationScope ?? Ze).importNode(i, !0);
    qe.currentNode = r;
    let o = qe.nextNode(), a = 0, s = 0, l = n[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let c;
        l.type === 2 ? c = new bt(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new Wl(o, this, t)), this._$AV.push(c), l = n[++s];
      }
      a !== l?.index && (o = qe.nextNode(), a++);
    }
    return qe.currentNode = Ze, r;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class bt {
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
    t = ut(this, t, i), Ht(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== we && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Dl(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && Ht(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Ze.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, r = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Bt.createElement($a(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const o = new Hl(r, this), a = o.u(this.options);
      o.p(i), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = Xr.get(t.strings);
    return i === void 0 && Xr.set(t.strings, i = new Bt(t)), i;
  }
  k(t) {
    Yn(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, r = 0;
    for (const o of t) r === i.length ? i.push(n = new bt(this.O(zt()), this.O(zt()), this, this.options)) : n = i[r], n._$AI(o), r++;
    r < i.length && (this._$AR(n && n._$AB.nextSibling, r), i.length = r);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Kr(t).nextSibling;
      Kr(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Ii {
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
    if (o === void 0) t = ut(this, t, i, 0), a = !Ht(t) || t !== this._$AH && t !== we, a && (this._$AH = t);
    else {
      const s = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = ut(this, s[n + l], i, l), c === we && (c = this._$AH[l]), a ||= !Ht(c) || c !== this._$AH[l], c === m ? t = m : t !== m && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    a && !r && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Bl extends Ii {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class Ul extends Ii {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class jl extends Ii {
  constructor(t, i, n, r, o) {
    super(t, i, n, r, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = ut(this, t, i, 0) ?? m) === we) return;
    const n = this._$AH, r = t === m && n !== m || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== m && (n === m || r);
    r && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Wl {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ut(this, t);
  }
}
const Kl = { I: bt }, ql = Vn.litHtmlPolyfillSupport;
ql?.(Bt, bt), (Vn.litHtmlVersions ??= []).push("3.3.3");
const Gl = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let r = n._$litPart$;
  if (r === void 0) {
    const o = i?.renderBefore ?? null;
    n._$litPart$ = r = new bt(t.insertBefore(zt(), o), o, void 0, i ?? {});
  }
  return r._$AI(e), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Zn = globalThis;
let ce = class extends nt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Gl(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return we;
  }
};
ce._$litElement$ = !0, ce.finalized = !0, Zn.litElementHydrateSupport?.({ LitElement: ce });
const Vl = Zn.litElementPolyfillSupport;
Vl?.({ LitElement: ce });
(Zn.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Yl = { attribute: !0, type: String, converter: ci, reflect: !1, hasChanged: Gn }, Zl = (e = Yl, t, i) => {
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
function I(e) {
  return (t, i) => typeof i == "object" ? Zl(e, t, i) : ((n, r, o) => {
    const a = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, n), a ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function T(e) {
  return I({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xl = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Oi(e, t) {
  return (i, n, r) => {
    const o = (a) => a.renderRoot?.querySelector(e) ?? null;
    return Xl(i, n, { get() {
      return o(this);
    } });
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ql = { CHILD: 2 }, Li = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Mi = class {
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
const { I: Jl } = Kl, Qr = (e) => e, Jr = () => document.createComment(""), kt = (e, t, i) => {
  const n = e._$AA.parentNode, r = t === void 0 ? e._$AB : t._$AA;
  if (i === void 0) {
    const o = n.insertBefore(Jr(), r), a = n.insertBefore(Jr(), r);
    i = new Jl(o, a, e, e.options);
  } else {
    const o = i._$AB.nextSibling, a = i._$AM, s = a !== e;
    if (s) {
      let l;
      i._$AQ?.(e), i._$AM = e, i._$AP !== void 0 && (l = e._$AU) !== a._$AU && i._$AP(l);
    }
    if (o !== r || s) {
      let l = i._$AA;
      for (; l !== o; ) {
        const c = Qr(l).nextSibling;
        Qr(n).insertBefore(l, r), l = c;
      }
    }
  }
  return i;
}, Ue = (e, t, i = e) => (e._$AI(t, i), e), ec = {}, ka = (e, t = ec) => e._$AH = t, tc = (e) => e._$AH, tn = (e) => {
  e._$AR(), e._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const eo = (e, t, i) => {
  const n = /* @__PURE__ */ new Map();
  for (let r = t; r <= i; r++) n.set(e[r], r);
  return n;
}, Se = Li(class extends Mi {
  constructor(e) {
    if (super(e), e.type !== Ql.CHILD) throw Error("repeat() can only be used in text expressions");
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
    const r = tc(e), { values: o, keys: a } = this.dt(t, i, n);
    if (!Array.isArray(r)) return this.ut = a, o;
    const s = this.ut ??= [], l = [];
    let c, h, d = 0, p = r.length - 1, g = 0, y = o.length - 1;
    for (; d <= p && g <= y; ) if (r[d] === null) d++;
    else if (r[p] === null) p--;
    else if (s[d] === a[g]) l[g] = Ue(r[d], o[g]), d++, g++;
    else if (s[p] === a[y]) l[y] = Ue(r[p], o[y]), p--, y--;
    else if (s[d] === a[y]) l[y] = Ue(r[d], o[y]), kt(e, l[y + 1], r[d]), d++, y--;
    else if (s[p] === a[g]) l[g] = Ue(r[p], o[g]), kt(e, r[d], r[p]), p--, g++;
    else if (c === void 0 && (c = eo(a, g, y), h = eo(s, d, p)), c.has(s[d])) if (c.has(s[p])) {
      const b = h.get(a[g]), v = b !== void 0 ? r[b] : null;
      if (v === null) {
        const w = kt(e, r[d]);
        Ue(w, o[g]), l[g] = w;
      } else l[g] = Ue(v, o[g]), kt(e, r[d], v), r[b] = null;
      g++;
    } else tn(r[p]), p--;
    else tn(r[d]), d++;
    for (; g <= y; ) {
      const b = kt(e, l[y + 1]);
      Ue(b, o[g]), l[g++] = b;
    }
    for (; d <= p; ) {
      const b = r[d++];
      b !== null && tn(b);
    }
    return this.ut = a, ka(e, l), we;
  }
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Sa = Li(class extends Mi {
  constructor() {
    super(...arguments), this.key = m;
  }
  render(e, t) {
    return this.key = e, t;
  }
  update(e, [t, i]) {
    return t !== this.key && (ka(e), this.key = t), i;
  }
});
class to {
  constructor(t) {
    this._hass = t;
  }
  getEntityState(t) {
    return this._hass.states[t];
  }
}
class ic {
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
function nc(e, t, i, n) {
  return e ? i ? new ic(t, new to(e), n) : new to(e) : { getEntityState: () => {
  } };
}
function rc(e, t, i, n, r) {
  if (!e) return;
  const o = nc(e, i, n, r), a = {};
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
const oc = {}, io = Li(class extends Mi {
  constructor() {
    super(...arguments), this.ot = oc;
  }
  render(e, t) {
    return t();
  }
  update(e, [t, i]) {
    if (Array.isArray(t)) {
      if (Array.isArray(this.ot) && this.ot.length === t.length && t.every((n, r) => n === this.ot[r])) return we;
    } else if (this.ot === t) return we;
    return this.ot = Array.isArray(t) ? Array.from(t) : t, this.render(t, i);
  }
}), ac = /* @__PURE__ */ new Set([
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
]), sc = /^[a-z0-9#%.,/_() +*-]+$/i, lc = /([a-z][a-z0-9-]*)\s*\(/gi;
function U(e) {
  if (typeof e != "string") return;
  const t = e.trim();
  if (!t || !sc.test(t) || t.includes("/*") || t.includes("*/") || !/^[a-z#]/i.test(t)) return;
  let i = 0;
  for (let r = 0; r < t.length; r++) {
    const o = t[r];
    if (o === "(") i++;
    else if (o === ")" && --i < 0) return;
  }
  if (i !== 0) return;
  const n = new RegExp(lc.source, "gi");
  for (let r; r = n.exec(t); )
    if (!ac.has(r[1].toLowerCase())) return;
  return t;
}
function de(e, t) {
  return U(e) ?? t;
}
function z(e, t) {
  if (e == null || typeof e == "string" && e.trim() === "") return t;
  const i = typeof e == "number" ? e : Number(e);
  return Number.isFinite(i) ? i : t;
}
function le(e) {
  if (typeof e != "string") return;
  const t = e.trim().replace(/[^a-zA-Z0-9_-]/g, "");
  return t === "" ? void 0 : t;
}
const cc = {
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
function dc(e) {
  const t = e.trim().toLowerCase(), i = cc[t];
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
function Xn([e, t, i]) {
  const n = (r) => {
    const o = r / 255;
    return o <= 0.03928 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * n(e) + 0.7152 * n(t) + 0.0722 * n(i);
}
const hc = "#212121", pc = "#ffffff", uc = Xn([33, 33, 33]), fc = Xn([255, 255, 255]);
function Ea(e) {
  if (typeof e != "string") return;
  const t = dc(e);
  if (!t) return;
  const i = Xn(t), n = (r) => (Math.max(i, r) + 0.05) / (Math.min(i, r) + 0.05);
  return n(uc) >= n(fc) ? hc : pc;
}
const mc = /^[a-z0-9]+(?:-[a-z0-9]+)*:[a-z0-9]+(?:-[a-z0-9]+)*$/i;
function Pt(e) {
  if (typeof e != "string") return;
  const t = e.trim();
  return mc.test(t) ? t : void 0;
}
function De(e) {
  if (typeof e != "string") return;
  const t = e.trim().replace(/[^a-zA-Z0-9_.-]/g, "");
  return t === "" ? void 0 : t;
}
const Pi = "default", Aa = 10, hi = [
  {
    id: Pi,
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
], Fi = "var(--fp-skin-bg, var(--card-background-color, #fff))", Qn = "var(--fp-skin-wall, var(--primary-text-color))", Ta = "var(--fp-skin-text, var(--primary-text-color))", W = "var(--fp-skin-accent, var(--primary-color, #03a9f4))", nn = "var(--fp-skin-active, var(--state-light-active-color, var(--state-active-color, #fdd835)))", je = "var(--fp-skin-badge-bg, var(--card-background-color, #fff))";
function Jn(e) {
  if (typeof e == "string")
    return hi.find((t) => t.id === e);
}
function gc(e) {
  const t = Jn(e);
  return t ? Object.entries(t.vars).map(([i, n]) => `${i}:${n};`).join("") : "";
}
function yc(e) {
  const t = Jn(e);
  return t && t.id !== Pi ? t.id : void 0;
}
const bc = li(
  hi.filter((e) => e.id !== Pi).map(
    (e) => `:host([data-skin="${e.id}"]){` + Object.entries(e.vars).map(([t, i]) => `${t}:${i};`).join("") + "}"
  ).join(`
`)
), Ca = $e`
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
`, vc = 6e4, _c = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
function Ia(e) {
  return _c.has(e);
}
function er(e) {
  if (e === "") return;
  const t = Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function Oa(e) {
  let t = 0;
  for (const i of e)
    if (!Ia(i.newState)) {
      if (er(i.newState) === void 0) return !1;
      t++;
    }
  return t > 0;
}
function wc(e, t, i) {
  const n = e.map((c) => er(c.newState)), r = n.filter((c) => c !== void 0);
  if (!r.length) return e;
  const o = (Math.max(...r) - Math.min(...r)) / t;
  if (!(o > 0) && !e.some((c) => Ia(c.newState)))
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
function xc(e, t = {}) {
  const i = t.numericSteps ?? 0;
  return !(i > 0) || e.length < 3 || !Oa(e) ? e : wc(e, i, t.maxGapMs ?? vc);
}
function $c(e, t = {}) {
  if (!(t.numericSteps ?? 0) || e.length === 0) return e;
  const i = /* @__PURE__ */ new Map();
  for (const r of e) {
    const o = i.get(r.entityId);
    o ? o.push(r) : i.set(r.entityId, [r]);
  }
  const n = /* @__PURE__ */ new Set();
  for (const r of i.values())
    for (const o of xc(r, t)) n.add(o);
  return e.filter((r) => n.has(r));
}
function kc(e, t) {
  if (!(t > 2) || e.length <= t || !Oa(e)) return e;
  const i = e.map((a) => er(a.newState)), n = /* @__PURE__ */ new Set([0, e.length - 1]);
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
function Ut(e) {
  const t = typeof e.color == "string" ? U(e.color) : void 0;
  if (t) return t;
  const i = e.attributes?.color, n = typeof i == "string" ? U(i) : void 0;
  if (n) return n;
  const r = String(e.newState ?? "").trim().toLowerCase();
  return e.entityId.startsWith("light.") ? r === "off" ? je : nn : e.entityId.startsWith("cover.") ? r === "closed" ? je : W : e.entityId.startsWith("sensor.") || e.entityId.startsWith("binary_sensor.") ? r === "off" ? je : W : e.entityId.startsWith("fan.") ? r === "off" ? je : nn : e.entityId.startsWith("media_player.") ? r === "idle" ? je : nn : r === "on" || r === "open" || r === "playing" || r === "home" || r === "locked" || r === "unlocked" ? W : je;
}
class Sc {
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
    })), d = $c(h, { numericSteps: n.numericSteps });
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
        const v = s(b, ["state", "s"]), w = s(b, ["attributes", "a"]), E = s(b, ["last_updated", "lu"]), f = s(b, ["last_changed", "lc"]);
        return {
          state: typeof v == "string" || typeof v == "number" || typeof v == "boolean" ? String(v) : void 0,
          attributes: w && typeof w == "object" ? w : void 0,
          last_updated: typeof E == "string" || typeof E == "number" ? E : void 0,
          last_changed: typeof f == "string" || typeof f == "number" ? f : void 0
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
          const b = g[y - 1], v = g[y], w = a(b.last_updated ?? b.last_changed, h), E = a(v.last_updated ?? v.last_changed, h);
          if (!Number.isFinite(w) || !Number.isFinite(E) || E < i || w > n)
            continue;
          const f = b.state !== v.state, $ = !this._attributesEqual(b.attributes ?? {}, v.attributes ?? {});
          !f && !$ || c.push({
            timestamp: E,
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
var Ec = Object.defineProperty, Ac = Object.getOwnPropertyDescriptor, Qe = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Ac(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (r = (n ? a(t, i, r) : a(r)) || r);
  return n && r && Ec(t, i, r), r;
};
let me = class extends ce {
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
      e.set(t, kc(i, me.MAX_MARKERS_PER_LANE));
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
        ${io([this.events, this.startTime, this.endTime, this._hidden], () => i.map((r, o) => {
      const a = t.get(r) ?? [], s = o + 1, l = this._getEntityLabel(a[0]), c = this._hidden.has(r);
      return u`
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
        const d = Ut(h), p = this._getMarkerLeftClamped(h.timestamp, 4);
        return u`
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
        ${io([this.events, this.startTime, this.endTime], () => this._groupEventsByTimestamp().map((t) => u`
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
      return u`
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
me.MAX_MARKERS_PER_LANE = 150;
me.styles = $e`
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
    .playhead { position: absolute; top: -2px; width: 2px; height: calc(100% + 4px); background: ${li(W)}; }
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
      background: ${li(W)};
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
Qe([
  I({ attribute: !1 })
], me.prototype, "events", 2);
Qe([
  I({ type: Number })
], me.prototype, "startTime", 2);
Qe([
  I({ type: Number })
], me.prototype, "endTime", 2);
Qe([
  I({ type: Number })
], me.prototype, "currentTime", 2);
Qe([
  I({ type: Boolean })
], me.prototype, "expanded", 2);
Qe([
  T()
], me.prototype, "_hidden", 2);
me = Qe([
  Oe("easy-floorplan-history-timeline")
], me);
function no(e) {
  return !!e?.haArea && (e.filterEntities ?? !0);
}
const ro = -6, Tc = 6, tr = 0.45, pi = 1, La = "scale", Ma = "dim", oo = 0.92, ao = 80, so = 260, gn = 0.25, yn = 4, Pa = 10, bn = 1, ir = 14, Cc = 3, Ni = 140, Fa = "var(--fp-skin-glow, #ffd9a0)", lo = 0.18, ui = 0.6, co = 0.5, ho = 0.45, Ic = 0.5, nr = 14, Ge = 34, fi = 34, Ft = 16, Ri = 80, Di = 0, zi = 360, Oc = "var(--fp-skin-furniture, #9e9e9e)", st = 1e3, jt = 600, rr = 20, po = 50;
function Lc(e, t) {
  return e ?? t;
}
function uo(e, t) {
  return t <= 0 ? 100 : Math.round(e / t * 100);
}
function rn(e, t) {
  return Math.max(1, Math.round(t * e / 100));
}
function fo(e) {
  const t = e?.floors;
  return !t || typeof t != "object" ? [] : Object.values(t).filter((i) => !!i && typeof i.floor_id == "string" && typeof i.name == "string").sort((i, n) => (i.level ?? 0) - (n.level ?? 0) || i.name.localeCompare(n.name));
}
function Mc(e) {
  const t = e?.areas;
  return !t || typeof t != "object" ? [] : Object.values(t).filter((i) => !!i && typeof i.area_id == "string" && typeof i.name == "string").sort((i, n) => i.name.localeCompare(n.name));
}
function Pc(e, t) {
  if (!("name" in e)) return e;
  const i = (e.name ?? "").toString().trim(), n = Fc(t, i);
  return { ...e, name: n ? n.name : i || void 0, haArea: n?.area_id };
}
function Fc(e, t) {
  const i = (t ?? "").trim();
  if (!i) return;
  const n = e.find((s) => s.name === i);
  if (n) return n;
  const r = i.toLowerCase(), o = e.find((s) => s.name.toLowerCase() === r);
  if (o) return o;
  const a = r.replace(/\s+/g, " ");
  return e.find((s) => s.name.trim().toLowerCase().replace(/\s+/g, " ") === a);
}
function Nc(e, t) {
  const i = e, n = i?.entities?.[t];
  return n ? n.area_id ? n.area_id : (n.device_id ? i?.devices?.[n.device_id] : void 0)?.area_id ?? void 0 : void 0;
}
function on(e, t) {
  const n = e?.entities;
  return !n || typeof n != "object" ? [] : Object.keys(n).filter((r) => Nc(e, r) === t);
}
function Rc(e) {
  return {
    type: e,
    width: st,
    height: jt,
    grid: rr,
    walls: [],
    openings: [],
    items: [],
    texts: [],
    furniture: [],
    trackers: [],
    areas: []
  };
}
function Dc() {
  return { overlayScale: "plan" };
}
function Z(e) {
  return `${e}_${Math.random().toString(36).slice(2, 9)}`;
}
function vn(e, t) {
  if (e === t) return !0;
  if (Array.isArray(e) || Array.isArray(t))
    return !Array.isArray(e) || !Array.isArray(t) || e.length !== t.length ? !1 : e.every((r, o) => vn(r, t[o]));
  if (typeof e != "object" || typeof t != "object" || e === null || t === null) return !1;
  const i = e, n = t;
  for (const r of /* @__PURE__ */ new Set([...Object.keys(i), ...Object.keys(n)]))
    if (!vn(i[r], n[r])) return !1;
  return !0;
}
function zc(e, t = []) {
  return {
    id: Z("floor"),
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
function Hc(e) {
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
function Bc(e) {
  const t = /* @__PURE__ */ new Set();
  return e.map((i, n) => {
    let r = i.id || `floor_${n + 1}`;
    for (; t.has(r); ) r = `${r}_${n + 1}`;
    return t.add(r), r === i.id ? i : { ...i, id: r };
  });
}
function Uc(e, t, i) {
  const n = e.findIndex((s) => s.id === t), r = n + i;
  if (n < 0 || r < 0 || r >= e.length) return null;
  const o = [...e], [a] = o.splice(n, 1);
  return o.splice(r, 0, a), o;
}
function Ve(e) {
  return e.floors && e.floors.length ? Bc(e.floors.map(Hc)) : [
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
function mi(e, t) {
  if (!t) return null;
  const i = e?.[t.entity]?.state;
  if (i == null || i === "unavailable" || i === "unknown") return !1;
  const n = i === "on" || i === "open" || i === "home" || i === "detected";
  return t.invert ? !n : n;
}
function mo(e, t) {
  if (!e || t == null || !Number.isFinite(t)) return null;
  const i = e.max - e.min;
  if (i === 0) return null;
  const n = (t - e.min) / i, r = Math.max(0, Math.min(1, n));
  return e.invert ? 1 - r : r;
}
const jc = "airHandler", Wc = "air handler", Kc = "utility", qc = [
  "hvac",
  "ahu",
  "furnace",
  "ventilation"
], Gc = {
  w: 60,
  h: 56
}, Vc = [
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
], Yc = {
  id: jc,
  name: Wc,
  category: Kc,
  keywords: qc,
  size: Gc,
  parts: Vc
}, Zc = "bathtub", Xc = "bathtub", Qc = "bath", Jc = [
  "bath",
  "tub"
], ed = {
  w: 150,
  h: 76
}, td = [
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
], id = {
  id: Zc,
  name: Xc,
  category: Qc,
  keywords: Jc,
  size: ed,
  parts: td
}, nd = "bed", rd = "bed", od = "bedroom", ad = [
  "double",
  "mattress",
  "sleep"
], sd = {
  w: 150,
  h: 200
}, ld = [
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
], cd = {
  id: nd,
  name: rd,
  category: od,
  keywords: ad,
  size: sd,
  parts: ld
}, dd = "chair", hd = "chair", pd = "living", ud = [
  "seat"
], fd = {
  w: 44,
  h: 44
}, md = [
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
], gd = {
  id: dd,
  name: hd,
  category: pd,
  keywords: ud,
  size: fd,
  parts: md
}, yd = "cornerShowerCurved", bd = "curved corner shower", vd = "bath", _d = [
  "shower",
  "corner",
  "cubicle",
  "stall",
  "dusche"
], wd = {
  w: 100,
  h: 100
}, xd = [
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
], $d = {
  id: yd,
  name: bd,
  category: vd,
  keywords: _d,
  size: wd,
  parts: xd
}, kd = "desk", Sd = "desk", Ed = "living", Ad = [
  "office",
  "workstation"
], Td = {
  w: 120,
  h: 60
}, Cd = [
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
], Id = {
  id: kd,
  name: Sd,
  category: Ed,
  keywords: Ad,
  size: Td,
  parts: Cd
}, Od = "dishwasher", Ld = "dishwasher", Md = "kitchen", Pd = [
  "dishes"
], Fd = {
  w: 60,
  h: 60
}, Nd = [
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
], Rd = {
  id: Od,
  name: Ld,
  category: Md,
  keywords: Pd,
  size: Fd,
  parts: Nd
}, Dd = "dryer", zd = "dryer", Hd = "utility", Bd = [
  "tumble dryer",
  "laundry"
], Ud = {
  w: 60,
  h: 62
}, jd = [
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
], Wd = {
  id: Dd,
  name: zd,
  category: Hd,
  keywords: Bd,
  size: Ud,
  parts: jd
}, Kd = "fishTank", qd = "fish tank", Gd = "living", Vd = [
  "aquarium",
  "fish",
  "water"
], Yd = {
  w: 100,
  h: 40
}, Zd = [
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
], Xd = {
  id: Kd,
  name: qd,
  category: Gd,
  keywords: Vd,
  size: Yd,
  parts: Zd
}, Qd = "fridge", Jd = "fridge", eh = "kitchen", th = [
  "refrigerator",
  "freezer"
], ih = {
  w: 60,
  h: 64
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
], rh = {
  id: Qd,
  name: Jd,
  category: eh,
  keywords: th,
  size: ih,
  parts: nh
}, oh = "hotTub", ah = "hot tub", sh = "bath", lh = [
  "jacuzzi",
  "spa",
  "whirlpool"
], ch = {
  w: 120,
  h: 120
}, dh = [
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
], hh = {
  id: oh,
  name: ah,
  category: sh,
  keywords: lh,
  size: ch,
  parts: dh
}, ph = "piano", uh = "piano", fh = "living", mh = [
  "upright",
  "keyboard",
  "music"
], gh = {
  w: 140,
  h: 60
}, yh = [
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
], bh = {
  id: ph,
  name: uh,
  category: fh,
  keywords: mh,
  size: gh,
  parts: yh
}, vh = "plant", _h = "plant", wh = "living", xh = [
  "pot",
  "tree",
  "greenery"
], $h = {
  w: 44,
  h: 44
}, kh = "ellipse", Sh = [
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
], Eh = {
  id: vh,
  name: _h,
  category: wh,
  keywords: xh,
  size: $h,
  footprint: kh,
  parts: Sh
}, Ah = "quarterTub", Th = "corner hot tub", Ch = "bath", Ih = [
  "hottub",
  "jacuzzi",
  "corner",
  "quarter",
  "spa",
  "whirlpool"
], Oh = {
  w: 140,
  h: 140
}, Lh = [
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
], Mh = {
  id: Ah,
  name: Th,
  category: Ch,
  keywords: Ih,
  size: Oh,
  parts: Lh
}, Ph = "roundTable", Fh = "round table", Nh = "living", Rh = [
  "dining",
  "circular"
], Dh = {
  w: 100,
  h: 100
}, zh = "ellipse", Hh = [
  {
    ellipse: [
      50,
      50,
      50,
      50
    ],
    role: "body"
  }
], Bh = {
  id: Ph,
  name: Fh,
  category: Nh,
  keywords: Rh,
  size: Dh,
  footprint: zh,
  parts: Hh
}, Uh = "rug", jh = "rug", Wh = "living", Kh = [
  "carpet",
  "mat"
], qh = {
  w: 180,
  h: 120
}, Gh = [
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
], Vh = {
  id: Uh,
  name: jh,
  category: Wh,
  keywords: Kh,
  size: qh,
  parts: Gh
}, Yh = "sectional", Zh = "sectional (L)", Xh = "living", Qh = [
  "couch",
  "sofa",
  "corner",
  "chaise"
], Jh = {
  w: 230,
  h: 180
}, ep = [
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
], tp = {
  id: Yh,
  name: Zh,
  category: Xh,
  keywords: Qh,
  size: Jh,
  parts: ep
}, ip = "sink", np = "sink", rp = "kitchen", op = [
  "basin",
  "tap",
  "faucet"
], ap = {
  w: 64,
  h: 48
}, sp = [
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
], lp = {
  id: ip,
  name: np,
  category: rp,
  keywords: op,
  size: ap,
  parts: sp
}, cp = "sofa", dp = "sofa", hp = "living", pp = [
  "couch",
  "settee",
  "seat"
], up = {
  w: 170,
  h: 72
}, fp = [
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
], mp = {
  id: cp,
  name: dp,
  category: hp,
  keywords: pp,
  size: up,
  parts: fp
}, gp = "stairs", yp = "stairs", bp = "utility", vp = [
  "steps",
  "staircase"
], _p = {
  w: 90,
  h: 170
}, wp = [
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
], xp = {
  id: gp,
  name: yp,
  category: bp,
  keywords: vp,
  size: _p,
  parts: wp
}, $p = "stove", kp = "stove", Sp = "kitchen", Ep = [
  "cooker",
  "hob",
  "oven",
  "range"
], Ap = {
  w: 64,
  h: 64
}, Tp = [
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
], Cp = {
  id: $p,
  name: kp,
  category: Sp,
  keywords: Ep,
  size: Ap,
  parts: Tp
}, Ip = "table", Op = "table", Lp = "living", Mp = [
  "dining"
], Pp = {
  w: 120,
  h: 80
}, Fp = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 5
  }
], Np = {
  id: Ip,
  name: Op,
  category: Lp,
  keywords: Mp,
  size: Pp,
  parts: Fp
}, Rp = "toilet", Dp = "toilet", zp = "bath", Hp = [
  "wc",
  "loo",
  "lavatory"
], Bp = {
  w: 48,
  h: 68
}, Up = [
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
], jp = {
  id: Rp,
  name: Dp,
  category: zp,
  keywords: Hp,
  size: Bp,
  parts: Up
}, Wp = "tv", Kp = "tv", qp = "living", Gp = [
  "television",
  "screen",
  "media"
], Vp = {
  w: 110,
  h: 18
}, Yp = [
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
], Zp = {
  id: Wp,
  name: Kp,
  category: qp,
  keywords: Gp,
  size: Vp,
  parts: Yp
}, Xp = "vanity", Qp = "vanity", Jp = "bath", eu = [
  "washbasin",
  "sink",
  "bathroom"
], tu = {
  w: 110,
  h: 55
}, iu = [
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
], nu = {
  id: Xp,
  name: Qp,
  category: Jp,
  keywords: eu,
  size: tu,
  parts: iu
}, ru = "wardrobe", ou = "wardrobe", au = "bedroom", su = [
  "closet",
  "armoire",
  "cupboard"
], lu = {
  w: 120,
  h: 55
}, cu = [
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
], du = {
  id: ru,
  name: ou,
  category: au,
  keywords: su,
  size: lu,
  parts: cu
}, hu = "washer", pu = "washer", uu = "utility", fu = [
  "washing machine",
  "laundry"
], mu = {
  w: 60,
  h: 62
}, gu = [
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
], yu = {
  id: hu,
  name: pu,
  category: uu,
  keywords: fu,
  size: mu,
  parts: gu
}, bu = "waterHeater", vu = "water heater", _u = "utility", wu = [
  "boiler",
  "cylinder",
  "tank"
], xu = {
  w: 52,
  h: 52
}, $u = "ellipse", ku = [
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
], Su = {
  id: bu,
  name: vu,
  category: _u,
  keywords: wu,
  size: xu,
  footprint: $u,
  parts: ku
}, _n = [
  "living",
  "bedroom",
  "kitchen",
  "bath",
  "utility",
  "other"
], Hi = (e) => Object.assign(/* @__PURE__ */ Object.create(null), e), or = (e, t) => typeof t == "string" && Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0, go = Hi({
  body: { width: 2, opacity: 1, fillOpacity: 0.12 },
  line: { width: 2, opacity: 1, fillOpacity: 0 },
  thin: { width: 1.5, opacity: 1, fillOpacity: 0 },
  detail: { width: 1.5, opacity: 0.7, fillOpacity: 0 },
  hint: { width: 1, opacity: 0.6, fillOpacity: 0 },
  solid: { width: 0, opacity: 0.7, fillOpacity: 1 }
}), Eu = [0, 0, 100, 100], Au = 64, Na = 256, Tu = 256, Cu = 0.25, yo = 8, Ee = (e) => typeof e == "number" && Number.isFinite(e) ? e : null, rt = (e, t, i) => Math.min(i, Math.max(t, e));
function Re(e, t) {
  if (!Array.isArray(e) || e.length !== t) return null;
  const i = [];
  for (const n of e) {
    const r = Ee(n);
    if (r === null) return null;
    i.push(r);
  }
  return i;
}
function Iu(e) {
  if (!Array.isArray(e) || e.length < 2 || e.length > Na) return null;
  const t = [];
  for (const i of e) {
    const n = Re(i, 2);
    if (!n) return null;
    t.push([n[0], n[1]]);
  }
  return t;
}
const Ou = Hi({ M: 2, L: 2, Q: 4, C: 6, Z: 0 });
function Lu(e) {
  if (!Array.isArray(e) || !e.length || e.length > Tu) return null;
  const t = [];
  for (const i of e) {
    if (!Array.isArray(i) || typeof i[0] != "string") return null;
    const n = i[0].toUpperCase(), r = or(Ou, n);
    if (r === void 0) return null;
    const o = Re(i.slice(1), r);
    if (!o) return null;
    t.push([n, ...o]);
  }
  return t[0]?.[0] !== "M" ? null : t;
}
function tt(e, t) {
  const i = or(go, e.role) ? e.role : t, n = go[i], r = Ee(e.width), o = Ee(e.opacity), a = Ee(e.fillOpacity), s = Array.isArray(e.dash) ? e.dash.map(Ee) : null, l = s && s.length && s.length <= 8 && s.every((c) => c !== null) ? s.map((c) => rt(c, 0, 100)) : void 0;
  return {
    role: i,
    width: r === null ? n.width : i === "solid" ? rt(r, 0, yo) : rt(r, Cu, yo),
    opacity: o === null ? n.opacity : rt(o, 0, 1),
    fillOpacity: a === null ? n.fillOpacity : rt(a, 0, 1),
    dash: l
  };
}
function bo(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return null;
  const t = e, i = t.space === "square" ? "square" : "box";
  if ("line" in t) {
    const n = Re(t.line, 4);
    return n ? { kind: "line", a: [n[0], n[1]], b: [n[2], n[3]], space: i, style: tt(t, "line") } : null;
  }
  if ("rect" in t) {
    const n = Re(t.rect, 4);
    return !n || n[2] < 0 || n[3] < 0 ? null : {
      kind: "rect",
      x: n[0],
      y: n[1],
      w: n[2],
      h: n[3],
      rx: Math.max(0, Ee(t.rx) ?? 0),
      space: i,
      style: tt(t, "body")
    };
  }
  if ("circle" in t) {
    const n = Re(t.circle, 3);
    return !n || n[2] < 0 ? null : { kind: "circle", cx: n[0], cy: n[1], r: n[2], space: i, style: tt(t, "line") };
  }
  if ("ellipse" in t) {
    const n = Re(t.ellipse, 4);
    return !n || n[2] < 0 || n[3] < 0 ? null : {
      kind: "ellipse",
      cx: n[0],
      cy: n[1],
      rx: n[2],
      ry: n[3],
      space: i,
      style: tt(t, "line")
    };
  }
  if ("polygon" in t || "polyline" in t) {
    const n = "polygon" in t, r = Iu(n ? t.polygon : t.polyline);
    return r ? { kind: "poly", closed: n, pts: r, space: i, style: tt(t, n ? "body" : "line") } : null;
  }
  if ("path" in t) {
    const n = Lu(t.path);
    return n ? { kind: "path", cmds: n, space: i, style: tt(t, "line") } : null;
  }
  return null;
}
function Mu(e, t, i) {
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
function Pu(e) {
  if (e && typeof e == "object" && "repeat" in e) {
    const i = e, n = Ee(i.repeat), r = Re(i.step, 2), o = bo(i.part);
    if (n === null || !r || !o) return [];
    const a = rt(Math.round(n), 1, Au);
    return Array.from({ length: a }, (s, l) => Mu(o, r[0] * l, r[1] * l));
  }
  const t = bo(e);
  return t ? [t] : [];
}
function Bi(e, t, i) {
  const n = (p) => (i?.push(p), null);
  if (!e || typeof e != "object" || Array.isArray(e))
    return n("A symbol has to be a JSON object.");
  const r = e, o = typeof r.id == "string" && r.id.trim() ? r.id.trim() : t, a = le(o);
  if (!a || a !== o)
    return n('`id` is missing, or uses characters a CSS class cannot: letters, digits, "-" and "_" only.');
  if (!Array.isArray(r.parts)) return n("`parts` has to be an array of shapes.");
  const s = [];
  for (const p of r.parts)
    for (const g of Pu(p)) {
      if (s.length >= Na) break;
      s.push(g);
    }
  if (!s.length)
    return n(
      "No drawable parts. Each one needs a known shape (line, rect, circle, ellipse, polygon, polyline, path) with the right number of finite numbers."
    );
  const l = r.size && typeof r.size == "object" ? r.size : {}, c = Ee(l.w), h = Ee(l.h), d = Re(r.viewBox, 4);
  return {
    id: a,
    name: typeof r.name == "string" && r.name.trim() ? r.name.trim().slice(0, 60) : a,
    category: typeof r.category == "string" && _n.includes(r.category) ? r.category : "other",
    keywords: Array.isArray(r.keywords) ? r.keywords.filter((p) => typeof p == "string").slice(0, 12) : [],
    size: { w: c && c > 0 ? c : 60, h: h && h > 0 ? h : 60 },
    viewBox: d && d[2] > 0 && d[3] > 0 ? d : Eu,
    footprint: r.footprint === "ellipse" ? "ellipse" : "rect",
    parts: s
  };
}
const Fu = Bi({
  id: "unknown",
  name: "unknown",
  size: { w: 60, h: 60 },
  parts: [{ rect: [0, 0, 100, 100], rx: 6.666667 }]
}), Ie = (() => {
  const e = /* @__PURE__ */ Object.assign({ "../ef-furniture/airHandler.json": Yc, "../ef-furniture/bathtub.json": id, "../ef-furniture/bed.json": cd, "../ef-furniture/chair.json": gd, "../ef-furniture/cornerShowerCurved.json": $d, "../ef-furniture/desk.json": Id, "../ef-furniture/dishwasher.json": Rd, "../ef-furniture/dryer.json": Wd, "../ef-furniture/fishTank.json": Xd, "../ef-furniture/fridge.json": rh, "../ef-furniture/hotTub.json": hh, "../ef-furniture/piano.json": bh, "../ef-furniture/plant.json": Eh, "../ef-furniture/quarterTub.json": Mh, "../ef-furniture/roundTable.json": Bh, "../ef-furniture/rug.json": Vh, "../ef-furniture/sectional.json": tp, "../ef-furniture/sink.json": lp, "../ef-furniture/sofa.json": mp, "../ef-furniture/stairs.json": xp, "../ef-furniture/stove.json": Cp, "../ef-furniture/table.json": Np, "../ef-furniture/toilet.json": jp, "../ef-furniture/tv.json": Zp, "../ef-furniture/vanity.json": nu, "../ef-furniture/wardrobe.json": du, "../ef-furniture/washer.json": yu, "../ef-furniture/waterHeater.json": Su }), t = Hi({});
  for (const [i, n] of Object.entries(e)) {
    const r = Bi(n, i.split("/").pop()?.replace(/\.json$/, ""));
    r && (t[r.id] = r);
  }
  return t;
})();
function Ui(e, t) {
  return or(e, t);
}
let vo, _o = Ie;
function wn(e) {
  if (!e || typeof e != "object") return Ie;
  if (e === vo) return _o;
  const t = Hi({});
  Object.assign(t, Ie);
  for (const [i, n] of Object.entries(e)) {
    const r = Bi(n, i);
    r && (t[r.id] = r);
  }
  return vo = e, _o = t, t;
}
function Nu(e) {
  const t = (i) => {
    const n = _n.indexOf(i);
    return n < 0 ? _n.length : n;
  };
  return Object.values(e).sort(
    (i, n) => t(i.category) - t(n.category) || i.name.localeCompare(n.name)
  );
}
function Ru(e, t) {
  const i = t.trim().toLowerCase();
  return i ? e.id.toLowerCase().includes(i) || e.name.toLowerCase().includes(i) || e.category.includes(i) || e.keywords.some((n) => n.toLowerCase().includes(i)) : !0;
}
function Du(e, t = Ie) {
  return Ui(t, e)?.size ?? { w: 60, h: 60 };
}
function wo(e, t, i, n) {
  const [r, o, a, s] = e.viewBox, l = n === "square" ? Math.min(t, i) : t, c = n === "square" ? Math.min(t, i) : i, h = l / a, d = c / s;
  return {
    x: (p) => (p - r) * h - l / 2,
    y: (p) => (p - o) * d - c / 2,
    len: (p) => p * Math.min(h, d),
    sx: (p) => p * h,
    sy: (p) => p * d
  };
}
const G = (e) => Number.isFinite(e) ? e : 0;
function zu(e, t) {
  const i = e.fillOpacity > 0 ? t : "none", n = e.role === "solid" ? "none" : t;
  return { fill: i, stroke: n, style: e };
}
function Hu(e, t, i) {
  const { fill: n, stroke: r, style: o } = zu(e.style, i), a = o.opacity < 1 ? o.opacity : m, s = o.dash?.length ? o.dash.join(" ") : m, l = o.fillOpacity > 0 && o.fillOpacity < 1 ? o.fillOpacity : m, c = o.role === "solid" ? m : o.width;
  switch (e.kind) {
    case "line":
      return _`<line x1=${G(t.x(e.a[0]))} y1=${G(t.y(e.a[1]))}
                       x2=${G(t.x(e.b[0]))} y2=${G(t.y(e.b[1]))}
                       fill="none" stroke=${r} stroke-width=${c}
                       stroke-dasharray=${s} opacity=${a} />`;
    case "rect":
      return _`<rect x=${G(t.x(e.x))} y=${G(t.y(e.y))}
                       width=${G(t.sx(e.w))} height=${G(t.sy(e.h))}
                       rx=${e.rx > 0 ? G(t.len(e.rx)) : m}
                       fill=${n} fill-opacity=${l}
                       stroke=${r} stroke-width=${c}
                       stroke-dasharray=${s} opacity=${a} />`;
    case "circle":
      return _`<circle cx=${G(t.x(e.cx))} cy=${G(t.y(e.cy))} r=${G(t.len(e.r))}
                         fill=${n} fill-opacity=${l}
                         stroke=${r} stroke-width=${c} opacity=${a} />`;
    case "ellipse":
      return _`<ellipse cx=${G(t.x(e.cx))} cy=${G(t.y(e.cy))}
                          rx=${G(t.sx(e.rx))} ry=${G(t.sy(e.ry))}
                          fill=${n} fill-opacity=${l}
                          stroke=${r} stroke-width=${c} opacity=${a} />`;
    case "poly": {
      const h = e.pts.map(([d, p]) => `${G(t.x(d))},${G(t.y(p))}`).join(" ");
      return e.closed ? _`<polygon points=${h}
                       fill=${n} fill-opacity=${l}
                       stroke=${r} stroke-width=${c}
                       stroke-linejoin="round" opacity=${a} />` : _`<polyline points=${h} fill="none"
                        stroke=${r} stroke-width=${c}
                        stroke-linejoin="round" opacity=${a} />`;
    }
    case "path": {
      const h = e.cmds.map(
        (d) => d[0] === "Z" ? "Z" : `${d[0]} ${d.slice(1).map((p, g) => g % 2 === 0 ? G(t.x(p)) : G(t.y(p))).join(" ")}`
      ).join(" ");
      return _`<path d=${h}
                       fill=${n} fill-opacity=${l}
                       stroke=${r} stroke-width=${c}
                       stroke-linejoin="round" opacity=${a} />`;
    }
  }
}
function Bu(e, t, i, n) {
  const r = wo(e, t, i, "box"), o = wo(e, t, i, "square");
  return e.parts.map((a) => Hu(a, a.space === "square" ? o : r, n));
}
const Uu = /* @__PURE__ */ new Set(["light", "switch", "fan", "input_boolean"]);
function Ra(e) {
  const t = e?.split(".")[0] ?? "";
  return Uu.has(t) ? { action: "toggle" } : { action: "more-info" };
}
function Pe(e) {
  return e !== void 0 && e.action !== "none";
}
function Da(e, t) {
  return t === "tap" ? e.tap_action ?? Ra(e.entity) : t === "hold" ? e.hold_action : e.double_tap_action;
}
function ju(e, t) {
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
      return za(t) !== null;
    case "fire-dom-event":
      return !0;
    default:
      return !1;
  }
}
function Wu(e) {
  return ["tap", "hold", "double_tap"].some(
    (t) => ju(e, Da(e, t))
  );
}
function za(e) {
  const t = e.perform_action ?? e.service;
  if (!t || !t.includes(".")) return null;
  const [i, n] = t.split(".", 2);
  return { domain: i, service: n, data: e.data ?? e.service_data, target: e.target };
}
function St(e, t, i, n) {
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
        const r = za(n);
        r && t.callService(r.domain, r.service, r.data, r.target);
        break;
      }
      case "fire-dom-event":
        e.dispatchEvent(new CustomEvent("ll-custom", { detail: n, bubbles: !0, composed: !0 }));
        break;
    }
  }
}
const Ku = 0.75, gi = 8, qu = 400;
function an(e, t) {
  return typeof e == "number" && Number.isFinite(e) && e > 0 ? e : t;
}
function Gu(e) {
  let t = 0;
  for (let i = 0, n = e.length - 1; i < e.length; n = i++)
    t += e[n].x * e[i].y - e[i].x * e[n].y;
  return t / 2;
}
function Vu(e, t, i, n) {
  const r = n.x - i.x, o = n.y - i.y, a = r * r + o * o;
  if (a === 0) return Math.hypot(e - i.x, t - i.y);
  let s = ((e - i.x) * r + (t - i.y) * o) / a;
  return s = Math.max(0, Math.min(1, s)), Math.hypot(e - (i.x + s * r), t - (i.y + s * o));
}
function Yu(e, t) {
  const i = [];
  for (let n = 0; n < e.length; n++) {
    const r = e[n], o = r.b.x - r.a.x, a = r.b.y - r.a.y, s = Math.hypot(o, a);
    if (s <= t) continue;
    const l = [0, 1], c = t / s;
    for (let h = 0; h < e.length; h++) {
      if (h === n) continue;
      const d = e[h], p = d.b.x - d.a.x, g = d.b.y - d.a.y, y = o * g - a * p;
      if (Math.abs(y) > 1e-9) {
        const b = ((d.a.x - r.a.x) * g - (d.a.y - r.a.y) * p) / y, v = ((d.a.x - r.a.x) * a - (d.a.y - r.a.y) * o) / y, w = t / Math.max(Math.hypot(p, g), 1e-9);
        b > c && b < 1 - c && v >= -w && v <= 1 + w && l.push(b);
        continue;
      }
      for (const b of [d.a, d.b]) {
        const v = ((b.x - r.a.x) * o + (b.y - r.a.y) * a) / (s * s);
        if (v <= c || v >= 1 - c) continue;
        const w = r.a.x + v * o, E = r.a.y + v * a;
        Math.hypot(b.x - w, b.y - E) <= t && l.push(v);
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
function Zu(e, t) {
  const i = [], n = /* @__PURE__ */ new Map(), r = (c) => Math.floor(c / t), o = (c) => {
    const h = r(c.x), d = r(c.y);
    for (let b = -1; b <= 1; b++)
      for (let v = -1; v <= 1; v++)
        for (const w of n.get(`${h + b}:${d + v}`) ?? [])
          if (Math.hypot(i[w].x - c.x, i[w].y - c.y) <= t) return w;
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
function Xu(e, t) {
  const { points: i, neighbors: n } = Zu(e, t), r = /* @__PURE__ */ new Set(), o = [];
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
function Qu(e, t, i) {
  for (let n = 0, r = e.length - 1; n < e.length; r = n++)
    for (const o of t)
      if (Vu(o.x, o.y, e[r], e[n]) <= i) return !0;
  return !1;
}
function Ju(e, t, i = {}) {
  const n = an(i.weldEps, Ku), r = an(i.openingEps, gi), o = an(i.minArea, qu);
  if (e.length < 3) return [];
  const a = Yu(
    e.map((l) => ({ a: { x: l.x1, y: l.y1 }, b: { x: l.x2, y: l.y2 } })),
    n
  );
  return Xu(a, n).map((l) => ({ ring: l, area: Gu(l) })).filter((l) => l.area >= o && !Qu(l.ring, t, r)).sort((l, c) => c.area - l.area).map((l) => l.ring);
}
const xo = /* @__PURE__ */ new WeakMap();
function Ha(e, t) {
  const i = xo.get(e);
  if (i && i.openings === t) return i.out;
  const n = Ju(e, t);
  return xo.set(e, { openings: t, out: n }), n;
}
const V = 8, Ba = 0.05, Nt = "—";
function Wt(e, t) {
  if (!t || !e) return Nt;
  const i = e.states[t];
  return i ? e.formatEntityState(i) : Nt;
}
function Ua(e, t, i) {
  if (e.formatEntityState !== t.formatEntityState || e.formatEntityAttributeValue !== t.formatEntityAttributeValue) return !0;
  for (const n of i)
    if (e.states[n] !== t.states[n]) return !0;
  return !1;
}
function Ot(e) {
  const t = /* @__PURE__ */ new Set();
  (e.sunDimming || e.sunlight && !Ki(e)) && t.add("sun.sun");
  for (const i of Ve(e)) {
    for (const n of i.openings) {
      n.entity && t.add(n.entity), n.shutterEntity && t.add(n.shutterEntity), n.secondaryEntity && t.add(n.secondaryEntity);
      for (const r of n.extraEntities ?? []) r && t.add(r);
      n.shutterSecondaryEntity && t.add(n.shutterSecondaryEntity);
    }
    for (const n of i.items) {
      n.entity && t.add(n.entity), n.hideEntity && t.add(n.hideEntity), n.hideStateEntity && t.add(n.hideStateEntity), n.hideBadgeEntity && t.add(n.hideBadgeEntity);
      for (const r of ze(n)) r.entity && t.add(r.entity);
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
function ar(e, t, i) {
  if (!t || !e) return Nt;
  const n = e.states[t];
  if (!n) return Nt;
  const r = e.formatEntityAttributeValue;
  if (typeof r == "function") return r(n, i);
  const o = n.attributes?.[i];
  return o == null || o === "" ? Nt : String(o);
}
function ef(e, t, i) {
  const n = i.entity || (i.attribute ? t.entity : void 0);
  return n ? i.attribute ? ar(e, n, i.attribute) : Wt(e, n) : "";
}
function ze(e) {
  return [...e.secondaryEntity || e.secondaryAttribute ? [{ entity: e.secondaryEntity, attribute: e.secondaryAttribute }] : [], ...e.readings ?? []];
}
function tf(e, t) {
  return t.attribute ? ar(e, t.entity, t.attribute) : Wt(e, t.entity);
}
function sr(e, t) {
  if (!t.entity) return t.text ?? "";
  const i = t.attribute ? ar(e, t.entity, t.attribute) : Wt(e, t.entity);
  return t.text ? `${t.text} ${i}` : i;
}
function ji(e, t) {
  return ja(e, t)?.color;
}
function ja(e, t) {
  if (!e?.length) return;
  const i = typeof t == "number" ? t : Number(t), n = typeof t != "boolean" && t !== "" && t != null && Number.isFinite(i), r = t == null ? "" : String(t).trim().toLowerCase();
  let o, a, s;
  for (const l of e)
    !l || typeof l != "object" || typeof l.color != "string" || (typeof l.state == "string" && l.state !== "" ? o === void 0 && r !== "" && l.state.trim().toLowerCase() === r && (o = l) : typeof l.above == "number" ? n && i > l.above && (!a || l.above > (a.above ?? -1 / 0)) && (a = l) : s === void 0 && (s = l));
  return o ?? a ?? s;
}
function nf(e, t) {
  if (!e.entity) return;
  const i = ji(e.stateColor, t);
  if (i) return U(i);
  if (e.activeColor && Le(e.entity, t)) return U(e.activeColor);
}
function $o(e, t) {
  if (!e.entity) return;
  const i = ji(e.stateColor, t);
  if (i) return U(i);
  if (e.activeColor && Le(e.entity, t)) return U(e.activeColor);
}
function lr(e, t) {
  if (!t || t.state !== "on") return;
  const i = t.attributes ?? {}, n = i.brightness, r = typeof n == "number" && Number.isFinite(n) ? Math.max(0, Math.min(255, n)) : void 0, o = r === void 0 ? ui : lo + (ui - lo) * (r / 255), a = z(e.glowRadius, Ni) * (r === void 0 ? 1 : co + (1 - co) * (r / 255)), s = i.rgb_color;
  if (Array.isArray(s) && s.length >= 3) {
    const [l, c, h] = s;
    if ([l, c, h].every((d) => typeof d == "number" && Number.isFinite(d))) {
      const d = (g) => Math.max(0, Math.min(255, Math.round(g))), p = U(`rgb(${d(l)}, ${d(c)}, ${d(h)})`);
      if (p) return { color: p, opacity: o, radius: a };
    }
  }
  return { color: de(e.glowColor, Fa), opacity: o, radius: a };
}
function Wa(e) {
  if (!e || e.state !== "on") return;
  const t = e.attributes ?? {}, i = t.rgb_color;
  if (!Array.isArray(i) || i.length < 3) return;
  const [n, r, o] = i;
  if (![n, r, o].every((h) => typeof h == "number" && Number.isFinite(h))) return;
  const a = t.brightness, s = typeof a == "number" && Number.isFinite(a) ? Math.max(0, Math.min(255, a)) : void 0, l = s === void 0 ? 1 : ho + (1 - ho) * (s / 255), c = (h) => Math.max(0, Math.min(255, Math.round(h * l)));
  return U(`rgb(${c(n)}, ${c(r)}, ${c(o)})`);
}
function rf(e, t) {
  return t ? lr(e, t) : {
    color: de(e.glowColor, Fa),
    opacity: ui,
    radius: z(e.glowRadius, Ni)
  };
}
function cr(e, t, i) {
  const n = i.x2 - i.x1, r = i.y2 - i.y1, o = n * n + r * r, a = o === 0 ? 0 : Math.max(0, Math.min(1, ((e - i.x1) * n + (t - i.y1) * r) / o)), s = i.x1 + a * n, l = i.y1 + a * r;
  return Math.hypot(e - s, t - l);
}
function dr(e, t, i, n, r) {
  const o = r.x2 - r.x1, a = r.y2 - r.y1, s = i * a - n * o;
  if (Math.abs(s) < 1e-12) return;
  const l = r.x1 - e, c = r.y1 - t, h = (l * a - c * o) / s, d = (l * n - c * i) / s;
  if (!(h <= 1e-9 || d < 0 || d > 1))
    return h;
}
function of(e, t, i, n, r) {
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
function Ka(e, t, i, n) {
  if (X(e) === "fixed") return 0;
  const r = Math.max(0, Math.min(1, t)), o = Math.max(0, Math.min(1, i ?? t));
  if (X(e) === "swing") {
    const a = Te(e);
    if (a > 2) {
      let s = r + o;
      for (let l = 2; l < a; l++) s += Math.max(0, Math.min(1, n?.[l - 2] ?? t));
      return s / a;
    }
    return a === 2 ? (r + o) / 2 : r * gr(e);
  }
  if (X(e) === "awning") return r;
  switch (Wi(e)) {
    case "biparting":
      return (r + o) / 2;
    case "biparting-bypass":
    case "converging":
      return (r + o) / 4;
    default:
      return r;
  }
}
function qa(e, t, i, n, r) {
  return n !== void 0 && n <= 0 ? [0, 0] : $r(e) && X(e) !== "roll" ? [0, 1] : af(e, t, i, r);
}
function af(e, t, i, n) {
  const r = Ka(e, t, i, n), o = [(1 - r) / 2, (1 + r) / 2];
  if (gr(e) < 1) {
    const c = [0, r];
    return e.flipH ? [1 - c[1], 1 - c[0]] : c;
  }
  if (X(e) !== "swing" || Te(e) !== 2) return o;
  const a = Math.max(0, Math.min(1, t)), s = Math.max(0, Math.min(1, i ?? t)), l = [0.5 - a / 2, 0.5 + s / 2];
  return e.flipH ? [1 - l[1], 1 - l[0]] : l;
}
function hr(e, t, i) {
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
    for (const { o: v, span: w } of n) {
      if (cr(v.x, v.y, o) > gi) continue;
      const E = ((v.x - o.x1) * a + (v.y - o.y1) * s) / l, f = Math.cos(v.angle * Math.PI / 180) * a + Math.sin(v.angle * Math.PI / 180) * s >= 0 ? 1 : -1, $ = (Y) => f * (Y - 0.5) * v.length / c, k = E + $(w[0]), M = E + $(w[1]), C = Math.max(0, Math.min(k, M)), H = Math.min(1, Math.max(k, M));
      H > C && h.push([C, H]);
    }
    if (!h.length) {
      r.push(o);
      continue;
    }
    h.sort((v, w) => v[0] - w[0]);
    const d = [h[0]];
    for (const v of h.slice(1)) {
      const w = d[d.length - 1];
      v[0] <= w[1] ? w[1] = Math.max(w[1], v[1]) : d.push(v);
    }
    const p = (v) => ({ x: o.x1 + a * v, y: o.y1 + s * v });
    let g = 0, y = 0;
    const b = (v, w) => {
      if ((w - v) * c < V / 2) return;
      const E = p(v), f = p(w);
      r.push({ id: `${o.id}#${y++}`, x1: E.x, y1: E.y, x2: f.x, y2: f.y });
    };
    for (const [v, w] of d)
      b(g, v), g = w;
    b(g, 1);
  }
  return r;
}
function Ga(e, t, i, n) {
  const r = n.filter((d) => {
    const p = cr(e, t, d);
    return p < i && p > V;
  });
  if (!r.length) return;
  const o = i * 1.01, a = [
    { id: "b1", x1: e - o, y1: t - o, x2: e + o, y2: t - o },
    { id: "b2", x1: e + o, y1: t - o, x2: e + o, y2: t + o },
    { id: "b3", x1: e + o, y1: t + o, x2: e - o, y2: t + o },
    { id: "b4", x1: e - o, y1: t + o, x2: e - o, y2: t - o }
  ], s = r.map((d) => of(d, e - o, t - o, e + o, t + o)).filter((d) => d !== void 0);
  if (!s.length) return;
  const l = [...s, ...a], c = [];
  for (const d of l)
    for (const [p, g] of [
      [d.x1, d.y1],
      [d.x2, d.y2]
    ]) {
      const y = Math.atan2(g - t, p - e);
      for (const b of [y - 1e-4, y, y + 1e-4]) {
        const v = Math.cos(b), w = Math.sin(b);
        let E = 1 / 0;
        for (const f of l) {
          const $ = dr(e, t, v, w, f);
          $ !== void 0 && $ < E && (E = $);
        }
        E < 1 / 0 && c.push({ x: e + v * E, y: t + w * E, a: b });
      }
    }
  c.sort((d, p) => d.a - p.a);
  const h = (d) => Math.round(d * 100) / 100;
  return c.map(({ x: d, y: p }) => ({ x: h(d), y: h(p) }));
}
function Va(e, t, i, n) {
  const r = t.radius, o = n?.length ? Ga(e.x, e.y, r, n) : void 0, a = `${i}-clip`;
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
function sf(e, t, i, n, r, o) {
  const a = e.map((l) => {
    if (!l.glow) return;
    const c = lr(l, t?.[l.entity]);
    if (c)
      return {
        // Normalized against the glow's own ceiling, so a full-brightness lamp
        // clears the dim entirely and a dim one clears proportionally.
        strength: Math.max(0, Math.min(1, c.opacity / ui)),
        // Straight off the paint, so the clearing tracks the pool as it shrinks
        // with brightness (issue #123) instead of staying at the configured size.
        radius: c.radius
      };
  });
  if (!a.some((l) => l !== void 0)) return m;
  const s = V;
  return _`
    <defs>
      <mask id=${r} maskUnits="userSpaceOnUse"
            x=${-s} y=${-s} width=${i + s * 2} height=${n + s * 2}>
        <rect x=${-s} y=${-s} width=${i + s * 2} height=${n + s * 2}
              fill="white" />
        ${e.map((l, c) => {
    const h = a[c];
    if (h === void 0) return m;
    const { strength: d, radius: p } = h, g = `${r}-${c}`, y = o?.length ? Ga(l.x, l.y, p, o) : void 0, b = `${g}-clip`;
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
function Ya(e, t, i, n, r = Ie) {
  const o = V;
  return _`
    <defs>
      <mask id=${n} maskUnits="userSpaceOnUse"
            x=${-o} y=${-o} width=${t + o * 2} height=${i + o * 2}>
        <rect x=${-o} y=${-o} width=${t + o * 2} height=${i + o * 2}
              fill="white" />
        ${e.map((a) => {
    const s = a.angle ? `rotate(${a.angle} ${a.x} ${a.y})` : void 0, l = Ui(r, a.type)?.footprint === "ellipse", c = 1 - Ic;
    return l ? _`<ellipse cx=${a.x} cy=${a.y} rx=${a.w / 2} ry=${a.h / 2}
                           fill="#000" fill-opacity=${c} transform=${s ?? m} />` : _`<rect x=${a.x - a.w / 2} y=${a.y - a.h / 2} width=${a.w} height=${a.h}
                        fill="#000" fill-opacity=${c} transform=${s ?? m} />`;
  })}
      </mask>
    </defs>`;
}
function Za(e, t, i) {
  if (e.enableHideByEntity) {
    const n = e.hideEntity || e.entity;
    let r = t;
    return n && i && i.states[n] && (r = e.hideAttribute ? i.states[n].attributes[e.hideAttribute] : i.states[n].state), pr(
      r,
      e.hideMode,
      e.hideState,
      e.hideOperator,
      e.hideThreshold,
      e.hideInvert
    );
  }
  return e.hideWhenInactive ? e.entity ? !Le(e.entity, t) : !0 : !1;
}
function lf(e, t) {
  return e.showOnlyWhenZoomed ? t ? e.area ? e.area !== t.id && e.area !== t.name : !qi(t.points ?? [], e.x, e.y) : !0 : !1;
}
function cf(e, t, i) {
  if (!e.enableHideBadgeByEntity) return !1;
  let n = t;
  if (i) {
    const r = e.hideBadgeEntity || e.entity;
    r && i.states[r] && (n = e.hideBadgeAttribute && i.states[r].attributes ? String(i.states[r].attributes[e.hideBadgeAttribute]) : i.states[r].state);
  }
  return pr(
    n,
    e.hideBadgeMode,
    e.hideBadgeMatch,
    // Ensure this property is correctly mapped in your types, or use hideBadgeState
    e.hideBadgeOperator,
    e.hideBadgeThreshold,
    e.hideBadgeInvert
  );
}
const Xa = 12;
function Qa(e, t) {
  const i = [];
  if (t.showName) {
    const r = t.entity ? e?.states[t.entity]?.attributes?.friendly_name : void 0, o = t.name || r || t.entity;
    o && i.push(o);
  }
  let n = !1;
  if (t.enableHideStateByEntity && e) {
    const r = t.hideStateEntity || t.entity;
    let o;
    r && e.states[r] && (o = t.hideStateAttribute && e.states[r].attributes ? e.states[r].attributes[t.hideStateAttribute] : e.states[r].state), n = pr(
      o,
      t.hideStateMode,
      t.hideStateMatch,
      t.hideStateOperator,
      t.hideStateThreshold,
      t.hideStateInvert
    );
  }
  if (t.entity && (t.showState ?? t.kind === "sensor") && !n && i.push(tf(e, t)), !n)
    for (const r of ze(t)) {
      if (r.showState === !1) continue;
      const o = ef(e, t, r);
      o && i.push(o);
    }
  return i.join(" · ");
}
const ko = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
function pr(e, t = "state", i, n = "==", r, o = !1) {
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
    if (ko.has(s) && !ko.has(l))
      return !1;
    a = n === "!=" ? s !== l : s === l;
  }
  return o ? !a : a;
}
function df(e) {
  return e.showName || (e.showState ?? e.kind === "sensor") ? !0 : ze(e).some((t) => t.showState !== !1 && (t.entity || t.attribute));
}
function ur(e) {
  const t = e.labelPosition;
  return t === "left" || t === "right" ? t : "below";
}
function hf(e, t) {
  const i = Qa(e, t);
  return i ? { text: i, live: !0 } : { text: t.name || t.entity || t.kind, live: !1 };
}
function Ja(e) {
  return Math.min(40, Math.max(8, z(e, Xa)));
}
function es(e, t) {
  if (!e.disableLabelColor) return t;
  if (e.useCustomLabelColor)
    return U(e.labelCustomColor) ?? void 0;
}
function pf(e) {
  return Math.min(40, Math.max(8, z(e, ir)));
}
function uf(e) {
  return Math.min(Aa, Math.max(2, z(e, V)));
}
function ts(e) {
  return e === void 0 ? "" : `stroke-width:${uf(e)};`;
}
function fr(e) {
  return e === "plan" ? "plan" : "fixed";
}
function j(e, t) {
  return t === "plan" ? `calc(${e} * var(--fp-u, 1px))` : `${e}px`;
}
function ff(e, t) {
  return t !== "plan" && e === void 0 ? "" : `font-size:${j(pf(e), t)};`;
}
function So(e) {
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
const mf = {
  media_player: { on: "mdi:television-play", off: "mdi:television-off" },
  fan: { on: "mdi:fan", off: "mdi:fan-off" },
  lock: { on: "mdi:lock-open-variant", off: "mdi:lock" },
  camera: { on: "mdi:cctv", off: "mdi:cctv-off" },
  humidifier: { on: "mdi:air-humidifier", off: "mdi:air-humidifier-off" },
  vacuum: { on: "mdi:robot-vacuum", off: "mdi:robot-vacuum-variant" }
}, gf = {
  paused: "mdi:television-pause",
  idle: "mdi:television"
}, yf = {
  off: "mdi:power",
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan"
}, bf = {
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
}, vf = {
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
}, _f = {
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
}, wf = {
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
function xf(e) {
  return e === "on" || e === "open" || e === "home" || e === "playing";
}
const $f = {
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
function Le(e, t) {
  if (!t || t === "unavailable" || t === "unknown") return !1;
  const i = e?.split(".")[0] ?? "", n = $f[i];
  return n ? n.has(t) : xf(t);
}
const kf = {
  fan: "spin",
  media_player: "pulse",
  vacuum: "pulse"
};
function is(e) {
  return kf[e?.split(".")[0] ?? ""];
}
const Sf = /* @__PURE__ */ new Set(["idle", "off"]);
function Ef(e) {
  const t = e?.hvac_action;
  return typeof t != "string" ? !0 : !Sf.has(t);
}
function ns(e, t, i) {
  const n = e.iconAnimation ?? "auto";
  if (n !== "none" && Le(e.entity, t)) {
    if (e.entity?.split(".")[0] === "climate") {
      if (!Ef(i)) return;
      if (t === "fan_only") return "spin";
    }
    return n === "spin" || n === "pulse" ? n : is(e.entity);
  }
}
const Af = /* @__PURE__ */ new Set(["motion", "occupancy", "presence", "vibration"]);
function rs(e, t) {
  const i = e?.split(".")[0];
  return i === "device_tracker" || i === "person" ? !0 : i === "binary_sensor" && !!t && Af.has(t);
}
function os(e, t, i, n) {
  const r = e.split(".")[0];
  if (r === "climate")
    return yf[n ?? ""] ?? (i ? "mdi:thermostat" : "mdi:power");
  if (r === "weather") return bf[n ?? ""] ?? "mdi:weather-cloudy";
  if (r === "media_player" && n) {
    const a = gf[n];
    if (a) return a;
  }
  const o = mf[r];
  if (o) return i ? o.on : o.off;
  if (t) {
    if (r === "binary_sensor") {
      const a = vf[t];
      return a ? i ? a.on : a.off : void 0;
    }
    if (r === "sensor") return _f[t];
    if (r === "cover") {
      const a = wf[t];
      return a ? i ? a.on : a.off : void 0;
    }
  }
}
function mr(e, t) {
  if (t)
    return e.attribute ? t.attributes?.[e.attribute] : t.state;
}
function xn(e, t, i) {
  const n = Pt(ja(e.stateColor, mr(e, t))?.icon);
  if (n) return n;
  const r = Pt(e.icon);
  if (r) return r;
  if (!e.entity) return So(e.kind);
  if (i) return i;
  const o = t?.attributes?.icon;
  return o || (os(
    e.entity,
    t?.attributes?.device_class,
    Le(e.entity, t?.state),
    t?.state
  ) ?? So(e.kind));
}
function as(e) {
  const t = Math.round(e);
  let i = Math.round(t * 0.62);
  return i % 2 !== t % 2 && (i += 1), Math.max(2, i);
}
function Kt(e) {
  return e.badgeContent === "icon" || e.badgeContent === "value" || e.badgeContent === "none" ? e.badgeContent : e.showIcon === !1 ? "none" : "icon";
}
function ei(e) {
  const t = e.pressEffect;
  return t === "scale" || t === "ripple" || t === "flash" || t === "none" ? t : La;
}
function Tf(e, t, i) {
  if (e.goToFloor !== "up" && e.goToFloor !== "down") return;
  const n = t.findIndex((o) => o.id === i);
  return n < 0 ? void 0 : t[n + (e.goToFloor === "up" ? 1 : -1)]?.id;
}
function ss(e) {
  const t = e.offlineStyle;
  return t === "dim" || t === "strike" || t === "none" ? t : Ma;
}
function $n(e, t) {
  return e.entity ? t === void 0 || vt(t) : !1;
}
const Cf = {
  climate: { attribute: "current_temperature", unit: "°" },
  water_heater: { attribute: "current_temperature", unit: "°" },
  humidifier: { attribute: "current_humidity", unit: "%" }
};
function Et(e) {
  if (e == null || typeof e == "boolean" || typeof e == "string" && e.trim() === "") return;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function If(e) {
  if (typeof e != "string") return "";
  const t = e.trim();
  return t === "°C" || t === "°F" || t === "K" ? "°" : t === "ppm" || t === "ppb" ? "" : t.length <= 3 ? t : "";
}
function ti(e) {
  return Math.abs(e) < 10 && !Number.isInteger(e) ? e.toFixed(1) : String(Math.round(e));
}
function Of(e, t) {
  return t === "W" && Math.abs(e) >= 1e3 ? { n: e / 1e3, unit: "kW" } : { n: e, unit: t };
}
function Eo(e, t) {
  const i = Of(e, If(t));
  return ti(i.n) + i.unit;
}
function ls(e, t) {
  return ds(e, t)?.text;
}
function cs(e) {
  return e === "primary" ? "primary" : e === "secondary" ? 0 : typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : void 0;
}
function ds(e, t) {
  if (!e || !t.entity) return;
  const i = ze(t), n = () => {
    const s = e.states[t.entity], l = s?.attributes, c = Cf[t.entity.split(".")[0]];
    if (t.attribute) {
      const d = Et(l?.[t.attribute]);
      if (d !== void 0)
        return ti(d) + (t.attribute === c?.attribute ? c.unit : "");
    }
    if (c) {
      const d = Et(l?.[c.attribute]);
      if (d !== void 0) return ti(d) + c.unit;
    }
    const h = Et(s?.state);
    return h === void 0 ? void 0 : Eo(h, l?.unit_of_measurement);
  }, r = (s) => {
    const l = i[s];
    if (!l) return;
    const c = l.entity || (l.attribute ? t.entity : void 0);
    if (!c) return;
    const h = e.states[c], d = h?.attributes;
    if (l.attribute) {
      const g = Et(d?.[l.attribute]);
      return g === void 0 ? void 0 : ti(g);
    }
    const p = Et(h?.state);
    return p === void 0 ? void 0 : Eo(p, d?.unit_of_measurement);
  }, o = cs(t.badgeEntity);
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
const Lf = { ".": 0.28, "-": 0.38, "°": 0.45, "%": 1, k: 0.58 }, Mf = 0.7, Pf = 0.85;
function Ao(e) {
  let t = 0;
  for (const i of e)
    t += Lf[i] ?? (i >= "0" && i <= "9" ? Mf : Pf);
  return t;
}
function hs(e, t) {
  const i = Math.round(z(e, Ge)), n = Math.max(0, i - 6), r = Ao(t) > 0 ? n / Ao(t) : i;
  let o = Math.round(Math.min(i * 0.46, r));
  return o % 2 !== i % 2 && (o -= 1), Math.max(6, o);
}
function To(e) {
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
function X(e) {
  return e.motion ?? "swing";
}
function gr(e) {
  if (X(e) !== "swing" || Rt(e) !== "single") return 1;
  const t = e.sashSpan;
  return typeof t != "number" || !Number.isFinite(t) ? 1 : Math.max(Ba, Math.min(1, t));
}
function yr(e) {
  const t = e.type === "door" && X(e) === "swing";
  return e.invert ? !t : t;
}
function Ff(e) {
  return { sx: e.flipH ? -1 : 1, sy: e.flipV ? -1 : 1 };
}
function Wi(e) {
  return X(e) === "slide" ? e.sliderStyle ?? "single" : "single";
}
function ps(e) {
  return e === "biparting" || e === "biparting-bypass" || e === "converging";
}
function yi(e) {
  return X(e) === "swing" ? Te(e) >= 2 : ps(Wi(e));
}
function Te(e) {
  if (X(e) !== "swing") return 1;
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
function Nf(e, t) {
  return t === 0 ? e : t === 1 ? br(e) : { ...e, entity: e.extraEntities?.[t - 2] };
}
function br(e) {
  return { ...e, entity: e.secondaryEntity };
}
function kn(e) {
  return e === "window" ? "double" : "single";
}
function Rt(e) {
  return X(e) === "swing" ? e.sash ?? kn(e.type) : kn(e.type);
}
function lt(e) {
  return e.shutterStyle === "roll" || e.shutterStyle === "swing" ? e.shutterStyle : e.shutterEntity?.split(".")[0] === "binary_sensor" ? "swing" : "roll";
}
function Ne(e, t = !1) {
  if (!e || vt(e.state)) return 0;
  const i = e.attributes?.current_position;
  if (typeof i == "number" && Number.isFinite(i)) {
    const r = Math.max(0, Math.min(1, i / 100));
    return t ? 1 - r : r;
  }
  const n = e.state === "open" || e.state === "opening" || e.state === "closing" || e.state === "on";
  return (t ? !n : n) ? 1 : 0;
}
function ii(e, t = !1) {
  return !e || vt(e.state) ? !1 : Ne(e, t) > 0 || e.state === "opening" || e.state === "closing";
}
const Rf = /* @__PURE__ */ new Set(["window", "blind", "shade", "shutter", "curtain", "awning"]), Df = /* @__PURE__ */ new Set(["blind", "shade", "curtain"]), zf = /* @__PURE__ */ new Set(["garage", "garage_door", "shutter"]);
function Hf(e) {
  const t = e ?? "";
  return {
    type: Rf.has(t) ? "window" : "door",
    motion: zf.has(t) ? "roll" : Df.has(t) ? "slide" : void 0
  };
}
const Bf = 3;
function Uf(e, t) {
  return e.split(".")[0] === "cover" && t & Bf ? "cover-toggle" : "more-info";
}
function vr(e, t, i) {
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
          !o && Uf(a, i(a)) === "cover-toggle" ? "toggle" : "more-info"
        )
      }
    } : void 0;
  if (t === "hold" && s) return { entity: s, config: { action: "more-info" } };
}
function ni(e, t) {
  const i = t === "tap" ? e.tap_action : t === "hold" ? e.hold_action : e.double_tap_action;
  if (i)
    return { entity: i.entity ?? e.entity, config: i };
}
function jf(e) {
  return ["tap", "hold", "double_tap"].some(
    (t) => Pe(ni(e, t)?.config)
  );
}
function Wf(e, t) {
  return ["tap", "hold", "double_tap"].some(
    (i) => Pe(vr(e, i, t)?.config)
  );
}
function vt(e) {
  return e === "unavailable" || e === "unknown";
}
function Kf(e, t) {
  if (!e.entity || t === void 0) return yr(e);
  if (qf(e.entity, t)) return !1;
  const i = Gf(e.entity, t);
  return e.invert ? !i : i;
}
function qf(e, t) {
  return vt(t) ? !0 : e.split(".")[0] === "lock" && t === "jammed";
}
function Gf(e, t) {
  return e.split(".")[0] === "lock" ? Le(e, t) : t === "on" || t === "open" || t === "opening" || t === "closing";
}
function Vf(e) {
  return e === "opening" || e === "closing";
}
function Ye(e, t) {
  if (!e.entity || !t) return yr(e) ? 1 : 0;
  if (vt(t.state)) return 0;
  const i = t.attributes?.current_position;
  if (typeof i == "number" && Number.isFinite(i)) {
    const n = Math.max(0, Math.min(1, i / 100));
    return e.invert ? 1 - n : n;
  }
  return Kf(e, t.state) ? 1 : 0;
}
function ri(e, t) {
  return !e.entity || !t || vt(t.state) ? !1 : Vf(t.state) || Ye(e, t) > 0;
}
function Co(e, t, i) {
  const n = e / 2, r = 5, o = Math.max(3, Math.round(e / 12)), a = [];
  for (let s = 1; s < o; s++) {
    const l = -n + e * s / o;
    a.push(
      _`<line x1=${l} y1=${-r / 2} x2=${l} y2=${r / 2}
            stroke=${Fi} stroke-width="0.75" />`
    );
  }
  return _`<g class="fp-roll-curtain" style="transform:scaleY(${1 - i});">
      <rect x=${-n} y=${-r / 2} width=${e} height=${r}
            style="fill:${t};" />
      ${a}
    </g>`;
}
function Yf(e, t, i, n, r = 1, o = i, a = n) {
  const s = e / 2, l = 3, c = r * (t / 2 + l / 2), h = (d, p) => {
    const g = [], y = Math.max(2, Math.round(p / 14));
    for (let b = 1; b < y; b++) {
      const v = d + p * b / y;
      g.push(
        _`<line x1=${v} y1=${-l / 2} x2=${v} y2=${l / 2}
              stroke=${Fi} stroke-width="0.75" />`
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
const us = 22, bi = 14, vi = 22, _i = 15;
function _r(e, t = 0) {
  const i = e.flipV ? -1 : 1, n = e.angle * Math.PI / 180, r = { x: -Math.sin(n) * i, y: Math.cos(n) * i };
  return t === 90 ? { x: -r.y, y: r.x } : t === 180 ? { x: -r.x, y: -r.y } : t === 270 ? { x: r.y, y: -r.x } : r;
}
function wr(e, t = us) {
  const i = (e.flipV ? -1 : 1) * t, n = e.angle * Math.PI / 180;
  return { x: e.x - Math.sin(n) * i, y: e.y + Math.cos(n) * i };
}
function fs(e) {
  return !!(e.entity && e.shutterEntity) && (e.showShutterIcon ?? !0);
}
const Zf = { on: "mdi:window-shutter-open", off: "mdi:window-shutter" }, Io = {
  door: { on: "mdi:door-open", off: "mdi:door-closed" },
  window: { on: "mdi:window-open", off: "mdi:window-closed" }
};
function ms(e, t, i, n, r, o) {
  const a = Pt(t);
  if (a) return a;
  const s = Pt(o);
  if (s) return s;
  const l = Pt(i?.attributes?.icon);
  return l || (os(e, i?.attributes?.device_class, n) ?? (n ? r.on : r.off));
}
function gs(e, t, i, n) {
  return ms(
    e.shutterEntity ?? "",
    e.shutterIcon,
    t,
    i,
    Zf,
    n
  );
}
function ys(e) {
  return !!e.entity && (e.showIcon ?? !1);
}
function bs(e, t, i, n) {
  return ms(
    e.entity ?? "",
    e.icon,
    t,
    i,
    Io[e.type] ?? Io.door,
    n
  );
}
function vs(e) {
  return wr(e, -us);
}
function _s(e, t = 0) {
  const i = _r(e, t);
  return { x: -i.x, y: -i.y };
}
function ws(e, t) {
  const { color: i, open: n = !0, active: r = !1, accent: o = W } = t, a = e.length / 2, s = V + 4, l = U(t.inactive) ?? i, c = Math.max(0, Math.min(1, t.amount ?? (n ? 1 : 0))), h = t.second ? Math.max(0, Math.min(1, t.second.amount)) : c, d = (f, $) => de(f ? o : $ === 0 ? l : i, W), p = d(r, c), g = t.second ? d(!!t.second.active, h) : p, y = (t.more ?? []).map((f) => Math.max(0, Math.min(1, f.amount))), b = (t.more ?? []).map((f, $) => d(!!f.active, y[$]));
  let v;
  if (X(e) === "swing") {
    const f = Te(e), $ = gr(e), k = f > 1 ? e.length / f : e.length * $, M = Math.PI / 2 * k, C = Array.from({ length: f }, (D, F) => {
      const S = F === 0 ? c : F === 1 ? h : y[F - 2] ?? c, se = F === 0 ? p : F === 1 ? g : b[F - 2] ?? p;
      return { index: F, amt: S, tone: se, hingeRight: f > 1 && (e.leafHinges?.[F] ? e.leafHinges[F] === "right" : F === f - 1) };
    }), H = (D, F, S) => _`<path class="fp-door-arc" d=${D}
              fill="none" stroke-width="1.5" stroke-dasharray=${M}
              style="stroke:${F};stroke-dashoffset:${M * (1 - S)};" />`, Y = e.type === "window" ? _`
        <line x1=${-a} y1=${-s / 2} x2=${-a} y2=${s / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${a} y1=${-s / 2} x2=${a} y2=${s / 2}
              stroke=${i} stroke-width="2" />` : m;
    v = _`
        ${Y}
        ${f > 1 ? (
      // Equal leaves side by side (floorplan-panel: 2..4). All hang on
      // their left edge but the last, which hangs on the right; for two
      // that is the classic pair meeting in the middle, each tracing
      // its own quarter circle outward.
      _`${C.map((D) => {
        const F = -a + D.index * k, S = F + k;
        return D.hingeRight ? H(`M ${F} 0 A ${k} ${k} 0 0 1 ${S} ${-k}`, D.tone, D.amt) : H(`M ${S} 0 A ${k} ${k} 0 0 0 ${F} ${-k}`, D.tone, D.amt);
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
        ${C.map((D) => {
      const F = -a + D.index * k;
      return D.hingeRight ? _`<g transform="translate(${F + k} 0)">
          <g class="fp-leaf-r" style="transform:rotate(${90 * D.amt}deg);">
            <rect x=${-k} y="-1.25" width=${k} height="2.5" style="fill:${D.tone};" />
          </g>
        </g>` : _`<g transform="translate(${F} 0)">
          <g class="fp-door-leaf" style="transform:rotate(${-90 * D.amt}deg);">
            <rect x="0" y="-1.25" width=${k} height="2.5" style="fill:${D.tone};" />
          </g>
        </g>`;
    })}
      `;
  } else if (X(e) === "fixed") {
    const f = e.type === "window" ? 1.5 : 2.5;
    v = _`
        ${e.type === "window" ? _`
        <line x1=${-a} y1=${-s / 2} x2=${-a} y2=${s / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${a} y1=${-s / 2} x2=${a} y2=${s / 2}
              stroke=${i} stroke-width="2" />` : m}
        <line x1=${-a} y1="0" x2=${a} y2="0"
              stroke=${i} stroke-width=${f} />`;
  } else if (X(e) === "awning") {
    const f = Math.min(12, e.length * 0.16), $ = 5, k = a - f / 2 - 1, M = Math.max(0, k - f / 2), C = Math.min(a * 0.62, 34) * c, H = Math.min(C * 0.16, M * 0.4), Y = c > 0.02;
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
              stroke-dasharray=${Y ? "6 4" : m} />
        ${Y ? (
      // A polyline, not a polygon, and that is the whole point of the
      // broken line above it. A closed shape strokes its own base back
      // along y=0 — straight over the dashes, solid — and the only
      // glass left uncovered would be the sliver outside `bx`, which
      // is exactly where the knuckles sit. The line would have been
      // dashed in the markup and solid on the screen at every size.
      _`<polyline
                    points="${-M},0 ${-M + H},${-C} ${M - H},${-C} ${M},0"
                    fill="none" stroke=${p} stroke-width="1.5"
                    stroke-linejoin="round" />`
    ) : m}
        <!-- Hinge knuckles, drawn whether or not it is open: they are what says
             this window is top-hung rather than fixed when it happens to be
             shut, and the request asked for them by name. -->
        ${[-k, k].map(
      (D) => _`
          <rect x=${D - f / 2} y=${-$ / 2} width=${f} height=${$}
                fill="none" stroke=${p} stroke-width="1.25" />
          <line x1=${D} y1=${-$ / 2} x2=${D} y2=${$ / 2}
                stroke=${p} stroke-width="1.25" />`
    )}`;
  } else if (X(e) === "roll")
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
        ${Co(e.length, p, c)}`;
  else {
    const f = e.type === "window" ? 1.5 : 2.5, $ = _`
        <line x1=${-a} y1=${-s / 2} x2=${-a} y2=${s / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${a} y1=${-s / 2} x2=${a} y2=${s / 2}
              stroke=${i} stroke-width="2" />`, k = Wi(e);
    if (k === "bypass") {
      const C = -a * c;
      v = _`
        ${$}
        <!-- tracks -->
        <line x1=${-a} y1=${-1.75} x2=${a} y2=${-1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <line x1=${-a} y1=${1.75} x2=${a} y2=${1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <!-- fixed panel: left half, front track -->
        <rect x=${-a} y=${1.75 - f / 2} width=${a} height=${f} style="fill:${p};" />
        <!-- moving panel: right half, back track -->
        <g class="fp-slide-panel" style="transform:translateX(${C}px);">
          <rect x="0" y=${-1.75 - f / 2} width=${a} height=${f} style="fill:${p};" />
        </g>`;
    } else if (k === "biparting")
      v = _`
        ${$}
        <!-- track -->
        <line x1=${-a} y1="0" x2=${a} y2="0"
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <g class="fp-slide-panel" style="transform:translateX(${-a * c}px);">
          <rect x=${-a} y=${-f / 2} width=${a} height=${f} style="fill:${p};" />
        </g>
        <g class="fp-slide-panel" style="transform:translateX(${a * h}px);">
          <rect x="0" y=${-f / 2} width=${a} height=${f} style="fill:${g};" />
        </g>`;
    else if (k === "biparting-bypass") {
      const C = a / 2;
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
        <rect x=${-a} y=${1.75 - f / 2} width=${C} height=${f} fill=${i} />
        <rect x=${a - C} y=${1.75 - f / 2} width=${C} height=${f} fill=${i} />
        <!-- moving panels: inner quarters, back track -->
        <g class="fp-slide-panel" style="transform:translateX(${-C * c}px);">
          <rect x=${-C} y=${-1.75 - f / 2} width=${C} height=${f} style="fill:${p};" />
        </g>
        <g class="fp-slide-panel" style="transform:translateX(${C * h}px);">
          <rect x="0" y=${-1.75 - f / 2} width=${C} height=${f} style="fill:${g};" />
        </g>`;
    } else if (k === "converging") {
      const C = a / 2;
      v = _`
        ${$}
        <!-- tracks -->
        <line x1=${-a} y1=${-1.75} x2=${a} y2=${-1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <line x1=${-a} y1=${1.75} x2=${a} y2=${1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <!-- both panels move, so both take the accent on their own state:
             front track travels right, back track left, and they meet. -->
        <g class="fp-slide-panel" style="transform:translateX(${C * c}px);">
          <rect x=${-a} y=${1.75 - f / 2} width=${a} height=${f} style="fill:${p};" />
        </g>
        <g class="fp-slide-panel" style="transform:translateX(${-C * h}px);">
          <rect x="0" y=${-1.75 - f / 2} width=${a} height=${f} style="fill:${g};" />
        </g>`;
    } else {
      const M = e.length * c;
      v = _`
        ${$}
        <!-- track -->
        <line x1=${-a} y1="0" x2=${a} y2="0"
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <g class="fp-slide-panel" style="transform:translateX(${M}px);">
          <rect x=${-a} y=${-f / 2} width=${e.length} height=${f} style="fill:${p};" />
        </g>`;
    }
  }
  if (t.shutter) {
    const f = Math.max(0, Math.min(1, t.shutter.amount)), $ = (Y, D) => de(Y ? t.shutter.accent ?? o : D === 0 ? l : i, W), k = $(t.shutter.active, f), M = t.shutter.second, C = M ? Math.max(0, Math.min(1, M.amount)) : f, H = M ? $(M.active, C) : k;
    v = _`${v}${t.shutter.style === "swing" ? Yf(
      e.length,
      s,
      k,
      f,
      t.shutter.flip ? -1 : 1,
      H,
      C
    ) : Co(e.length, k, f)}`;
  }
  const { sx: w, sy: E } = Ff(e);
  return _`<g class=${`fp-opening fp-opening-${le(e.type) ?? "unknown"}`}
                data-id=${le(e.id) ?? m}
                data-entity=${De(e.entity) ?? m}
                transform="translate(${e.x} ${e.y}) rotate(${e.angle})">
      <g transform="scale(${w} ${E})">${v}</g>
    </g>`;
}
function Dt(e) {
  if (typeof e != "number" || !Number.isFinite(e)) return 0;
  const t = (e % 360 + 360) % 360;
  return t === 90 || t === 180 || t === 270 ? t : 0;
}
function Xf(e, t) {
  const i = Dt(e.rotation);
  if (t === void 0) return i;
  const n = t ? e.rotationPortrait : e.rotationLandscape;
  return n == null ? i : Dt(n);
}
function Qf(e, t) {
  return typeof e.addEventListener == "function" ? (e.addEventListener("change", t), () => e.removeEventListener?.("change", t)) : typeof e.addListener == "function" ? (e.addListener(t), () => e.removeListener?.(t)) : () => {
  };
}
function We(e, t, i) {
  return i === 90 || i === 270 ? { w: t, h: e } : { w: e, h: t };
}
function ot(e, t, i, n, r) {
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
function Jf(e, t, i) {
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
function em(e, t = tr, i = pi) {
  const n = Math.min(t, i), r = Math.max(t, i);
  if (!(typeof e == "number" || typeof e == "string" && e.trim() !== "")) return r;
  const a = typeof e == "number" ? e : Number(e);
  if (!Number.isFinite(a)) return r;
  const s = Tc - ro, l = Math.max(0, Math.min(1, (a - ro) / s)), c = l * l * (3 - 2 * l);
  return n + (r - n) * c;
}
const Sn = 135, Oo = 12;
function xr(e) {
  if (!(typeof e == "number" || typeof e == "string" && e.trim() !== "")) return;
  const i = typeof e == "number" ? e : Number(e);
  return Number.isFinite(i) ? i : void 0;
}
function tm(e) {
  const t = xr(e);
  if (t === void 0) return 1;
  if (t <= 0) return 0;
  if (t >= Oo) return 1;
  const i = t / Oo;
  return i * i * (3 - 2 * i);
}
function im(e, t = 0) {
  const i = (e + t) * Math.PI / 180;
  return { x: Math.sin(i), y: -Math.cos(i) };
}
function nm(e, t) {
  return Ki(e) ? e.sunBearing : xr(t) ?? Sn;
}
function Ki(e) {
  return typeof e.sunBearing == "number" && Number.isFinite(e.sunBearing);
}
function rm(e, t) {
  return Ki(e) ? 1 : tm(t);
}
const wi = 0.34, om = 30, am = 0.95, sm = 0.16, lm = 0.37, En = "var(--fp-skin-sunlight, #ffd9a0)", An = "var(--fp-skin-sunshade, #000)";
function cm(e) {
  return Math.max(0.02, Math.min(1.5, z(e, wi)));
}
function dm(e, t, i, n) {
  let r = n;
  for (const o of i) {
    const a = dr(e.x, e.y, t.x, t.y, o);
    a !== void 0 && a > 1 && a < r && (r = a);
  }
  return r;
}
function hm(e) {
  const t = xr(e);
  if (t === void 0) return 1;
  const i = (r) => r * Math.PI / 180, n = Math.tan(i(om)) / Math.tan(i(Math.max(1, Math.min(89, t))));
  return Math.max(0.45, Math.min(1.9, n));
}
function pm(e, t, i) {
  return e.sunlight === !1 || i !== void 0 && i <= 0 ? 0 : $r(e) ? 1 : Math.max(0, Math.min(1, t));
}
function $r(e) {
  return e.glazed ?? e.type === "window";
}
function xs(e) {
  const t = e.angle * Math.PI / 180, i = Math.cos(t) * e.length / 2, n = Math.sin(t) * e.length / 2;
  return [
    { x: e.x - i, y: e.y - n },
    { x: e.x + i, y: e.y + n }
  ];
}
function qi(e, t, i) {
  let n = !1;
  for (let r = 0, o = e.length - 1; r < e.length; o = r++) {
    const a = e[r], s = e[o];
    a.y > i != s.y > i && t < (s.x - a.x) * (i - a.y) / (s.y - a.y) + a.x && (n = !n);
  }
  return n;
}
function um(e, t, i) {
  for (const n of t) {
    const r = dr(e.x, e.y, -i.x, -i.y, n);
    if (r === void 0) continue;
    if (!(r <= gi && cr(e.x, e.y, n) <= gi)) return !1;
  }
  return !0;
}
function fm(e, t) {
  return im(nm(e, t) + 180, e.north ?? 0);
}
function $s(e, t, i, n) {
  return [
    e,
    t,
    { x: t.x + i.x * n, y: t.y + i.y * n },
    { x: e.x + i.x * n, y: e.y + i.y * n }
  ];
}
function mm(e, t, i, n = 1) {
  const [r, o] = xs(e), a = Math.max(0, Math.min(1, n)), s = (r.x + o.x) / 2, l = (r.y + o.y) / 2, c = (h) => ({ x: s + (h.x - s) * a, y: l + (h.y - l) * a });
  return $s(c(r), c(o), t, i);
}
function gm(e, t, i) {
  return $s({ x: e.x1, y: e.y1 }, { x: e.x2, y: e.y2 }, t, i);
}
function Lo(e) {
  return e.map((t) => `${t.x},${t.y}`).join(" ");
}
function ym(e, t, i, n, r, o) {
  const { dir: a, openAmount: s, shutterOpen: l, strength: c = 1 } = o, h = {
    light: o.light ?? En,
    // `?? ` would swallow the explicit null that means "no shade at all".
    shade: o.shade === void 0 ? An : o.shade
  };
  if (c <= 0) return m;
  const d = Math.min(i, n) * cm(o.reach), p = (S) => pm(S, s(S), l(S)), g = hr(e, t, p), y = g.map((S) => gm(S, a, d)), b = t.map((S, se) => {
    if (!(p(S) > 0 && um(S, e, a))) return;
    const et = dm(S, a, g, d), [zr, Hr] = xs(S), $l = Hr.x - zr.x, kl = Hr.y - zr.y, Sl = Math.abs($l * a.y - kl * a.x) * p(S) / 2;
    return {
      // The outline runs past the falloff, so the ellipse is what bounds the
      // patch and never the polygon's flat far edge.
      points: Lo(mm(S, a, et + S.length, p(S))),
      cx: S.x,
      cy: S.y,
      along: et,
      across: Math.max(1, Sl * am),
      angle: Math.atan2(a.y, a.x) * 180 / Math.PI,
      lightId: `${r}-b${se}`,
      shadeId: `${r}-s${se}`,
      fadeId: `${r}-f${se}`
    };
  });
  if (!b.some((S) => S !== void 0)) return m;
  const v = y.map(Lo), w = V, E = `${r}-shade`, f = `${r}-shadow`, $ = -w, k = -w, M = i + w * 2, C = n + w * 2, H = (S, se = m) => _`<rect x=${$} y=${k} width=${M} height=${C} fill=${S}>${se}</rect>`, Y = (S, se) => _`<polygon points=${S} fill=${se} stroke=${se} stroke-width=${V} />`, D = (S, se, et) => _`<radialGradient id=${se} gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1"
              gradientTransform=${`translate(${S.cx} ${S.cy}) rotate(${S.angle}) scale(${S.along} ${S.across})`}>
          <stop offset="0" stop-color=${et} stop-opacity="1" />
          <stop offset="0.45" stop-color=${et} stop-opacity="0.55" />
          <stop offset="1" stop-color=${et} stop-opacity="0" />
        </radialGradient>`, F = h.shade === null ? m : _`
      <!-- Where the shade shows: everywhere, minus the patches of light, plus
           back wherever a wall stands in one. The order is the whole logic. -->
      <mask id=${E} maskUnits="userSpaceOnUse" x=${$} y=${k} width=${M} height=${C}>
        ${H("#fff")}
        ${b.map((S) => S ? D(S, S.shadeId, "#000") : m)}
        ${b.map(
    (S) => S ? _`<polygon points=${S.points} fill=${`url(#${S.shadeId})`} />` : m
  )}
        ${v.map((S) => Y(S, "#fff"))}
      </mask>`;
  return _`
    <defs>
      ${F}
      <!-- The wall shadows again, for the warm patches themselves. -->
      <mask id=${f} maskUnits="userSpaceOnUse" x=${$} y=${k} width=${M} height=${C}>
        ${H("#fff")}
        ${v.map((S) => Y(S, "#000"))}
      </mask>
    </defs>
    <g class="fp-sunlight">
      ${h.shade === null ? m : _`<rect x=${$} y=${k} width=${M} height=${C}
            style=${`fill:${de(h.shade, An)};`}
            opacity=${sm * c} mask=${`url(#${E})`} />`}
      <g mask=${`url(#${f})`} opacity=${lm * c}>
        ${b.map(
    (S) => S ? D(S, S.lightId, de(h.light, En)) : m
  )}
        ${b.map(
    (S) => S ? _`<polygon class="fp-sunbeam" points=${S.points}
                            fill=${`url(#${S.lightId})`} />` : m
  )}
      </g>
    </g>`;
}
function ks(e) {
  switch (e) {
    case "contain":
      return "xMidYMid meet";
    case "cover":
      return "xMidYMid slice";
    default:
      return "none";
  }
}
function Ss(e, t, i, n) {
  const r = V + 4, o = V;
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
function kr(e) {
  if (!e.length) return { x: 0, y: 0 };
  const t = e.reduce((i, n) => ({ x: i.x + n.x, y: i.y + n.y }), { x: 0, y: 0 });
  return { x: t.x / e.length, y: t.y / e.length };
}
const Tn = { scale: 1, txPercent: 0, tyPercent: 0 };
function bm(e, t, i, n, r = 0.15, o = yn, a) {
  if (!e.length) return Tn;
  const s = e.map((C) => ot(C.x, C.y, t, i, n)), l = We(t, i, n), c = s.map((C) => C.x), h = s.map((C) => C.y), d = Math.min(...c), p = Math.max(...c), g = Math.min(...h), y = Math.max(...h), b = Math.max(p - d, y - g) * r, v = Math.max(p - d + b * 2, 1), w = Math.max(y - g + b * 2, 1), E = Math.max(1, Math.min(o, Math.min(l.w / v, l.h / w))), f = a ?? E;
  if (!Number.isFinite(f)) return Tn;
  const $ = (d + p) / 2 / l.w, k = (g + y) / 2 / l.h, M = (C) => Math.min(0, Math.max(100 * (1 - f), C));
  return {
    scale: f,
    txPercent: M(50 - f * $ * 100),
    tyPercent: M(50 - f * k * 100)
  };
}
function vm(e) {
  const t = e.zoom;
  if (!(typeof t != "number" || !Number.isFinite(t)))
    return Math.max(1, Math.min(Pa, t));
}
function _m(e, t) {
  if (!Number.isFinite(e) || e <= 1) return 1;
  const i = typeof t == "number" && Number.isFinite(t) && t > 0 ? t : bn;
  return 1 / e * i;
}
const sn = 12, wm = 1.5, xm = 0.4;
function Es(e) {
  return _`
    <defs>
      <pattern id=${e} width=${sn} height=${sn}
               patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line class="fp-dead-space-line" x1="0" y1="0" x2="0" y2=${sn}
              stroke=${Qn} stroke-width=${wm} />
      </pattern>
    </defs>`;
}
function As(e, t) {
  const i = e.map((n) => `${n.x},${n.y}`).join(" ");
  return _`<polygon class="fp-dead-space" points=${i}
                      fill=${`url(#${t})`} fill-rule="nonzero"
                      fill-opacity=${xm} stroke="none" />`;
}
function Ts(e, t) {
  const i = e.points.map((o) => `${o.x},${o.y}`).join(" "), n = t !== void 0 && (e.highlight ?? "fill") !== "border", r = n ? e.activeOpacity ?? e.opacity : e.opacity;
  return _`<polygon class="fp-area" data-id=${le(e.id) ?? m}
                       data-entity=${De(e.entity) ?? m}
                       points=${i}
                       fill=${n ? t : de(e.color, W)}
                       fill-opacity=${z(r, gn)}
                       stroke=${e.type === "balcony" ? de(e.color, W) : "none"}
                       stroke-width=${e.type === "balcony" ? 3 : 0}
                       stroke-dasharray=${e.type === "balcony" ? "10 6" : m} />`;
}
function Cs(e, t, i) {
  const n = t !== void 0 && (e.highlight ?? "fill") !== "fill", r = n ? t : e.borderColor ? de(e.borderColor, "none") : void 0;
  if (r === void 0 || r === "none") return m;
  const o = e.points.map((s) => `${s.x},${s.y}`).join(" "), a = z(
    e.borderWidth,
    n ? V / 2 : Cc
  );
  return !n || i === void 0 ? _`<polygon class="fp-area-border" data-id=${le(e.id) ?? m}
                        data-entity=${De(e.entity) ?? m}
                        points=${o} fill="none"
                        stroke=${r} stroke-width=${a} />` : _`
    <clipPath id=${i}><polygon points=${o} /></clipPath>
    <polygon class="fp-area-border" data-id=${le(e.id) ?? m}
             data-entity=${De(e.entity) ?? m}
             points=${o} fill="none" clip-path=${`url(#${i})`}
             stroke=${r} stroke-width=${a * 2} />`;
}
function Cn(e, t, i = Ie) {
  const n = t ?? e.color ?? Oc, r = Bu(Ui(i, e.type) ?? Fu, e.w, e.h, n), o = e.hand === "left" ? " scale(-1 1)" : "";
  return _`<g class=${`fp-furniture fp-furniture-${le(e.type) ?? "unknown"}`}
                data-id=${le(e.id) ?? m}
                data-entity=${De(e.entity) ?? m}
                transform="translate(${e.x} ${e.y}) rotate(${e.angle ?? 0})${o}">${r}</g>`;
}
function xi(e, t, i, n, r, o = 3, a = "fixed") {
  function s(p) {
    return (p % 360 + 360) % 360;
  }
  function l(p, g, y) {
    return Math.max(Math.min(p, y), g);
  }
  const c = j(z(i, Ri), a), h = s(z(n, Di)), d = l(z(r, zi), 0, 360);
  return u`
    <div
      class="ripple ${e ? "active" : ""}"
      style="width:${c};height:${c};--fp-ripple-color:${de(t, W)};--fp-ripple-direction:${h};--fp-ripple-width:${d}"
    >
      <span class="dot"></span>
      ${Array.from(
    { length: o },
    (p, g) => u`<span class="ring" style="animation-delay:${(g * 0.6).toFixed(2)}s;"></span>`
  )}
    </div>
  `;
}
function $i(e, t) {
  if (!t || !e) return null;
  const i = e[t]?.state;
  if (i == null || i === "unavailable" || i === "unknown") return null;
  const n = Number(i);
  return Number.isFinite(n) ? n : null;
}
function Is(e, t) {
  const i = e.color ?? W, n = (e.dotSize ?? nr) / 2, r = e.x + e.w / 2, o = e.y + e.h / 2, a = e.angle ?? 0, s = mo(e.xSensor, t.xReading), l = mo(e.ySensor, t.yReading), c = s != null, h = l != null, d = t.xPresent === !1 || t.yPresent === !1, p = e.w / 2, g = e.h / 2, y = t.editing ? _`<rect class="tracker-zone ${d ? "presence-gated" : ""}"
                x=${-p} y=${-g} width=${e.w} height=${e.h}
                fill=${i} fill-opacity="0.08" stroke=${i} stroke-width="1.5"
                stroke-dasharray="6 4" rx="4" pointer-events="none" />` : _``;
  let b;
  if (d)
    b = _``;
  else if (c && h) {
    const v = -p + s * e.w, w = -g + l * e.h, E = `0,${-n} ${n * 0.9},${n * 0.7} ${-n * 0.9},${n * 0.7}`, f = Math.max(n * 3.5, Math.min(e.w, e.h) * 0.45);
    b = _`
      <g class="tracker-marker" style="transform:translate(${v}px, ${w}px);">
        <circle class="tracker-ring" cx="0" cy="0" r="0"
                fill="none" stroke=${i} stroke-width="1.5"
                style="--fp-tracker-ring-max:${f}px;" />
        <circle class="tracker-ring" cx="0" cy="0" r="0"
                fill="none" stroke=${i} stroke-width="1.5"
                style="--fp-tracker-ring-max:${f}px; animation-delay:0.7s;" />
        <polygon class="tracker-dot" points=${E} fill=${i} />
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
       data-id=${le(e.id) ?? m}
       transform="translate(${r} ${o}) rotate(${a})">
      ${y}${b}
    </g>`;
}
function Mo(e, t, i, n) {
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
class Gi {
  static currentFloorEntityIds(t, i) {
    const n = t ? Ve(t) : [], r = n.find((a) => a.id === i) ?? n[0];
    if (!r) return [];
    const o = /* @__PURE__ */ new Set();
    for (const a of r.openings)
      a.entity && o.add(a.entity), a.secondaryEntity && o.add(a.secondaryEntity), a.shutterEntity && o.add(a.shutterEntity), a.shutterSecondaryEntity && o.add(a.shutterSecondaryEntity);
    for (const a of r.items) {
      a.entity && o.add(a.entity);
      for (const s of ze(a))
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
    const n = Gi.currentFloorEntityIds(t, i);
    return n.length ? n.join("|") : "none";
  }
}
function $m(e) {
  const t = Date.now() / 1e3, i = e?.historyReplay?.lookbackSeconds, n = typeof i == "number" && Number.isFinite(i) && i > 0 ? i : 3600;
  return { start: Math.max(0, t - n), end: t };
}
function Po(e, t) {
  const i = Math.max(0, Math.min(e, t)), n = Math.max(0, Math.max(e, t));
  return {
    start: i,
    end: Math.max(i, n)
  };
}
function km(e, t) {
  return Gi.currentFloorEntityIds(e, t);
}
function Sm(e, t) {
  return Gi.scopeKey(e, t);
}
function Em(e, t, i) {
  const r = Math.max(1, i - t) / 30, o = e?.historyReplay?.defaultSpeed;
  return Math.max(0.25, o ?? r);
}
function Am(e) {
  const t = Date.parse(e);
  return Number.isNaN(t) ? Date.now() / 1e3 : t / 1e3;
}
function Fo(e) {
  if (!Number.isFinite(e) || e <= 0) return "";
  const t = new Date(e * 1e3), i = t.getFullYear(), n = `${t.getMonth() + 1}`.padStart(2, "0"), r = `${t.getDate()}`.padStart(2, "0"), o = `${t.getHours()}`.padStart(2, "0"), a = `${t.getMinutes()}`.padStart(2, "0");
  return `${i}-${n}-${r}T${o}:${a}`;
}
function Tm(e) {
  const t = Math.min(3, Math.max(-2, e));
  return Number((10 ** t).toPrecision(4));
}
function Cm(e, t, i) {
  if (!e) return;
  if (i.has(t))
    return i.get(t);
  const n = Ve(e);
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
function Im(e, t, i, n, r) {
  if (!t) return Ut(e);
  const o = U(Cm(t, e.entityId, n)), a = Le(e.entityId, e.newState);
  if (r && o) return a ? o : "#ffffff";
  const s = Ut(e);
  return a ? s : "#ffffff";
}
function Om(e, t) {
  if (!Number.isFinite(e)) return "—";
  try {
    return t.format(new Date(e * 1e3));
  } catch {
    return new Date(e * 1e3).toISOString();
  }
}
var Lm = Object.defineProperty, Mm = Object.getOwnPropertyDescriptor, Q = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Mm(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (r = (n ? a(t, i, r) : a(r)) || r);
  return n && r && Lm(t, i, r), r;
};
function Pm(e) {
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
    startInputValue: Fo(o),
    endInputValue: Fo(a),
    onToggleVisible: (l) => e.toggleHistoryVisible(l),
    onRangeChange: (l, c) => {
      e.handleRangeChange(l, { target: { value: c } });
    },
    onZoom: (l) => e.zoomWindow(l),
    onJump: (l) => e.jumpReplay(l),
    onStep: (l) => e.stepReplay(l),
    onPlayToggle: () => t.playing ? e.pauseReplay() : e.playReplay(),
    onToggleSpeedPanel: () => e.toggleSpeedPanel(),
    onSpeedSliderInput: (l) => e.setReplaySpeed(Tm(l)),
    onSpeedChange: (l) => e.setReplaySpeed(l),
    onToggleTimeline: () => e.toggleTimeline(),
    onToggleLog: () => e.toggleLog(),
    onSeek: (l) => e.seekReplay(l)
  };
}
function Fm(e) {
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
let K = class extends ce {
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
    const i = e.timestamp <= this.currentTime, n = (typeof e.color == "string" ? e.color : void 0) ?? (typeof e.attributes?.color == "string" ? e.attributes.color : void 0) ?? Ut(e), r = U(n), o = r ? `background:${r}; box-shadow:0 0 0 2px ${r}22;` : m;
    return u`
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
            ${this.error ? u`<span class="replay-error">${this.error}</span>` : m}
            ${this.rangeWarning ? u`<span class="replay-loading">${this.rangeWarning}</span>` : m}
            ${!this.ready && this.enabled && !this.error ? u`<span class="replay-loading">Loading history…</span>` : m}
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
          ${this.logExpanded ? u`<ul
                class="replay-event-list"
                ${(t) => {
      this._logRef = t instanceof HTMLUListElement ? t : void 0, this._logRef && this.events.length && this._syncLogToCurrentEvent();
    }}
              >${Se(this.events, (t, i) => `${t.timestamp}-${t.entityId}-${t.newState}-${i}`, (t) => this._renderEventItem(t, e?.timestamp === t.timestamp))}</ul>` : m}
          ${!this.logExpanded && !this.events.length ? u`<div class="replay-empty">No history events yet.</div>` : m}
        </div>
      </div>
    `;
  }
};
K.styles = $e`
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
  I({ attribute: !1 })
], K.prototype, "events", 2);
Q([
  I({ type: Number })
], K.prototype, "startTime", 2);
Q([
  I({ type: Number })
], K.prototype, "endTime", 2);
Q([
  I({ type: Number })
], K.prototype, "currentTime", 2);
Q([
  I({ type: Boolean })
], K.prototype, "visible", 2);
Q([
  I({ type: Boolean })
], K.prototype, "enabled", 2);
Q([
  I({ type: Boolean })
], K.prototype, "ready", 2);
Q([
  I({ type: Boolean })
], K.prototype, "playing", 2);
Q([
  I({ type: Boolean })
], K.prototype, "timelineExpanded", 2);
Q([
  I({ type: Boolean })
], K.prototype, "logExpanded", 2);
Q([
  I({ type: Boolean })
], K.prototype, "speedExpanded", 2);
Q([
  I({ type: String })
], K.prototype, "error", 2);
Q([
  I({ type: String })
], K.prototype, "rangeWarning", 2);
Q([
  I({ type: String })
], K.prototype, "panelId", 2);
Q([
  I({ type: Number })
], K.prototype, "replaySpeed", 2);
Q([
  I({ type: String })
], K.prototype, "currentTimeLabel", 2);
Q([
  I({ type: String })
], K.prototype, "startInputValue", 2);
Q([
  I({ type: String })
], K.prototype, "endInputValue", 2);
K = Q([
  Oe("easy-floorplan-replay-panel")
], K);
const Os = "--fp-color-", Ls = 24;
function ne(e) {
  return typeof e != "string" ? "" : e.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
}
function Ms(e) {
  return Os + ne(e);
}
function No(e) {
  return `var(${Ms(e)})`;
}
function qt(e) {
  if (!Array.isArray(e)) return [];
  const t = /* @__PURE__ */ new Set(), i = [];
  for (const n of e) {
    if (!n || typeof n != "object") continue;
    const { name: r, color: o } = n, a = ne(r), s = U(o);
    if (!(!a || !s || t.has(a)) && (t.add(a), i.push({ name: r.trim(), color: s }), i.length >= Ls))
      break;
  }
  return i;
}
function Ps(e) {
  return qt(e).map((t) => `${Ms(t.name)}:${t.color};`).join("");
}
function Fs(e) {
  return qt(e).map((t) => `${ne(t.name)}=${t.color}`).join(",");
}
const Nm = /^[Vv][Aa][Rr]\(\s*--fp-color-([\p{L}\p{N}-]+)\s*(?:,((?:[^()]|\([^()]*\))*))?\)$/u;
function Ns(e) {
  return In(e)?.slug;
}
function In(e) {
  if (typeof e != "string") return;
  const t = Nm.exec(e.trim());
  if (!t) return;
  const i = t[2]?.trim();
  return { slug: t[1], fallback: i || void 0 };
}
function oi(e, t) {
  const i = Ns(e);
  if (!i) return e;
  const n = qt(t).find((r) => ne(r.name) === i);
  return n ? n.color : e;
}
function Ro(e, t, i) {
  if (!t) return e;
  const n = (r) => {
    if (typeof r == "string") {
      const o = In(r);
      if (o?.slug !== t) return r;
      const a = In(i);
      return o.fallback && a && !a.fallback ? `var(${Os}${a.slug}, ${o.fallback})` : i;
    }
    return Array.isArray(r) ? r.map(n) : r && typeof r == "object" ? Object.fromEntries(Object.entries(r).map(([o, a]) => [o, n(a)])) : r;
  };
  return n(e);
}
const Rm = 500, Dm = 250;
class zm extends HTMLElement {
  constructor() {
    super(...arguments), this.holdTime = Rm, this.held = !1, this.cancelled = !1;
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
    t.actionHandler && Hm(i, t.actionHandler.options) || (t.actionHandler ? (t.removeEventListener("touchstart", t.actionHandler.start), t.removeEventListener("touchend", t.actionHandler.end), t.removeEventListener("touchcancel", t.actionHandler.end), t.removeEventListener("mousedown", t.actionHandler.start), t.removeEventListener("click", t.actionHandler.end), t.removeEventListener("keydown", t.actionHandler.handleKeyDown)) : t.addEventListener("contextmenu", (n) => {
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
      i.hasHold && this.timer && (clearTimeout(this.timer), this.timer = void 0), i.hasHold && this.held ? Zt(r, "hold") : i.hasDoubleClick ? n.type === "click" && n.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, Zt(r, "tap");
      }, Dm) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, Zt(r, "double_tap")) : Zt(r, "tap");
    }, t.actionHandler.handleKeyDown = (n) => {
      ["Enter", " "].includes(n.key) && (n.preventDefault(), n.currentTarget.actionHandler.end(n));
    }, t.addEventListener("touchstart", t.actionHandler.start, { passive: !0 }), t.addEventListener("touchend", t.actionHandler.end), t.addEventListener("touchcancel", t.actionHandler.end), t.addEventListener("mousedown", t.actionHandler.start, { passive: !0 }), t.addEventListener("click", t.actionHandler.end), t.addEventListener("keydown", t.actionHandler.handleKeyDown)));
  }
}
function Hm(e, t) {
  return e.hasHold === t.hasHold && e.hasDoubleClick === t.hasDoubleClick && e.disabled === t.disabled;
}
function Zt(e, t) {
  e.dispatchEvent(
    new CustomEvent("action", { detail: { action: t }, bubbles: !0, composed: !0 })
  );
}
function Bm() {
  const e = document.body, t = e.querySelector("action-handler-fp-ef");
  if (t) return t;
  const i = document.createElement("action-handler-fp-ef");
  return e.appendChild(i), i;
}
customElements.get("action-handler-fp-ef") || customElements.define("action-handler-fp-ef", zm);
const Um = (e, t) => {
  Bm().bind(e, t);
}, it = Li(
  class extends Mi {
    update(e, [t]) {
      return Um(e.element, t), we;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render(e) {
    }
  }
), ke = class ke {
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
    return Number.isFinite(t) ? Math.min(ke._MAX_SPEED, Math.max(ke._MIN_SPEED, t)) : Number.isNaN(t) ? 1 : ke._MAX_SPEED;
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
    Number.isFinite(t) && (this.speed = Math.min(ke._MAX_SPEED, Math.max(ke._MIN_SPEED, t)));
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
ke._MIN_SPEED = 0.01, ke._MAX_SPEED = 1e3;
let ki = ke, jm = 0;
class Wm {
  constructor(t) {
    this._card = t, this._historyService = new Sc(), this.state = {
      playbackController: new ki(),
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
      panelId: `fp-replay-panel-${jm++}`
    };
  }
  logReplay(t, i) {
    this._card.getConfig()?.historyReplay?.debug && console.log(t, i ?? {});
  }
  getDefaultWindow() {
    return $m(this._card.getConfig());
  }
  normalizeWindow(t, i) {
    return Po(t, i);
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
    return km(this._card.getConfig(), this._card.getActiveFloorId());
  }
  scopeKey() {
    return Sm(this._card.getConfig(), this._card.getActiveFloorId());
  }
  speedForRange(t, i) {
    return Em(this._card.getConfig(), t, i);
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
    return Om(t, new Intl.DateTimeFormat(void 0, {
      dateStyle: "short",
      timeStyle: "medium"
    }));
  }
  handleRangeChange(t, i) {
    const n = i.target, r = Am(n.value);
    t === "start" ? this.state.startTime = r : this.state.endTime = r, this.updateWindow(this.state.startTime, this.state.endTime);
  }
  updateWindow(t, i) {
    const { start: n, end: r } = Po(t, i), o = r - n;
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
    this.state.playbackController = new ki({
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
        color: Im(s, this._card.getConfig(), this._card.getHass(), this.state.configuredColorCache, this.state.configured)
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
var Km = Object.defineProperty, qm = Object.getOwnPropertyDescriptor, _t = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? qm(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (r = (n ? a(t, i, r) : a(r)) || r);
  return n && r && Km(t, i, r), r;
};
const Do = /* @__PURE__ */ new Map();
function zo(e) {
  return e.map((t) => t.id).join("|");
}
let ue = class extends ce {
  constructor() {
    super(...arguments), this._wallMaskId = `fp-wall-mask-${ue._nextWallMaskId++}`, this._glowIdBase = `fp-glow-${ue._nextGlowId++}`, this._watchedEntities = /* @__PURE__ */ new Set(), this._replayController = new Wm({
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
    this._onOrientation(e), this._unsubscribeOrientation = Qf(e, this._onOrientation);
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
      width: e.width ?? st,
      height: e.height ?? jt,
      walls: e.walls ?? [],
      openings: e.openings ?? [],
      items: e.items ?? [],
      texts: e.texts ?? [],
      furniture: e.furniture ?? []
    }, this._watchedEntities = Ot(this._config), this._syncHistoryServiceContext(), this._replayController.clearConfigColorCache();
    const i = this._replayCacheKey();
    if (i !== this._lastReplayCacheKey && (this._lastReplayCacheKey = i, this._replayController.historyService().clearCache()), this._replayController.syncToConfig(), !this._activeFloorId) {
      const n = Ve(this._config), r = Do.get(zo(n));
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
    return !t || !this.hass ? !0 : Ua(t, this.hass, this._watchedEntities);
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
    const t = yc(this._config?.skin);
    t ? this.setAttribute("data-skin", t) : this.removeAttribute("data-skin");
  }
  updated(e) {
    super.updated(e), (e.has("hass") || e.has("_activeFloorId")) && this._syncHistoryServiceContext();
  }
  getCardSize() {
    return 6;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => ry), document.createElement("fp-ef-editor");
  }
  static getStubConfig() {
    return Dc();
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
    return Le(e.entity, t?.states[e.entity]?.state);
  }
  /** How far open an opening should be drawn (0..1), from its entity (or default). */
  _openingAmount(e, t) {
    const i = e.entity ? t?.states[e.entity] : void 0;
    return Ye(e, i);
  }
  /** Whether an opening wears its accent: drawn open, or a cover still in transit. */
  _openingActive(e, t) {
    const i = e.entity ? t?.states[e.entity] : void 0;
    return ri(e, i);
  }
  /**
   * The second leaf's own state for an opening with a sensor on each — a
   * two-panel slider (issue #145) or a hinged double (issue #159).
   * `undefined` — no second sensor, or a shape with only one leaf — leaves both
   * on the first entity, so nothing about a single-sensor opening changes.
   */
  _openingSecond(e, t) {
    if (!e.secondaryEntity || !yi(e)) return;
    const i = br(e), n = t?.states[e.secondaryEntity];
    return { amount: Ye(i, n), active: ri(i, n) };
  }
  /** floorplan-panel: states of leaves 3 and 4; a leaf without a sensor follows the first. */
  _openingMore(e, t) {
    const i = Te(e);
    if (i < 3 || !e.extraEntities?.some(Boolean)) return;
    const n = [];
    for (let r = 2; r < i; r++) {
      const o = e.extraEntities[r - 2];
      if (!o) {
        n.push({ amount: this._openingAmount(e, t), active: this._openingActive(e, t) });
        continue;
      }
      const a = Nf(e, r), s = t?.states[o];
      n.push({ amount: Ye(a, s), active: ri(a, s) });
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
    if (!e.shutterSecondaryEntity || lt(e) !== "swing") return;
    const i = t?.states[e.shutterSecondaryEntity];
    return {
      amount: Ne(i, e.shutterInvert),
      active: ii(i, e.shutterInvert)
    };
  }
  _itemIcon(e, t) {
    return xn(
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
    this.hass && St(this, this.hass, t, Da(t, e.detail.action));
  }
  /** What a gesture on this opening would do, if anything. */
  _openingPress(e, t) {
    return vr(e, t, this._featuresOf);
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
  _renderShutterMark(e, t, i, n, r) {
    const o = e.shutterEntity, a = r?.states[o], s = Ne(a, e.shutterInvert) > 0, l = ii(a, e.shutterInvert), c = gs(e, a, s, this.hass?.entities?.[o]?.icon), h = U(e.shutterActiveColor ?? e.activeColor) ?? W, d = wr(e), p = ot(d.x, d.y, t.width, t.height, i), g = We(t.width, t.height, i), y = _r(e, i), b = j(bi, n), v = `translate(calc(${y.x} * ${b}), calc(${y.y} * ${b}))`, w = j(vi, n), E = r?.states[o]?.attributes?.friendly_name ?? o;
    return u`
      <div
        class="shutter-mark ${l ? "on" : "off"}"
        data-entity=${De(o) ?? m}
        style="left:${p.x / g.w * 100}%; top:${p.y / g.h * 100}%;
               width:${w};height:${w};
               transform:translate(-50%,-50%) ${v};--fp-active:${h};"
        title="${E} · ${Wt(r, o)}"
        role="button"
        tabindex="0"
        @action=${() => {
      this.hass && St(this, this.hass, { entity: o }, { action: "more-info" });
    }}
        .actionHandler=${it({})}
      >
        <ha-icon
          icon=${c}
          style="--mdc-icon-size:${j(_i, n)};"
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
    const o = e.entity, a = r?.states[o], s = this._openingAmount(e, r) > 0, l = this._openingActive(e, r), c = bs(e, a, s, this.hass?.entities?.[o]?.icon), h = U(e.activeColor) ?? W, d = vs(e), p = ot(d.x, d.y, t.width, t.height, i), g = We(t.width, t.height, i), y = _s(e, i), b = j(bi, n), v = `translate(calc(${y.x} * ${b}), calc(${y.y} * ${b}))`, w = j(vi, n), E = r?.states[o]?.attributes?.friendly_name ?? o;
    return u`
      <div
        class="shutter-mark ${l ? "on" : "off"}"
        data-entity=${De(o) ?? m}
        style="left:${p.x / g.w * 100}%; top:${p.y / g.h * 100}%;
               width:${w};height:${w};
               transform:translate(-50%,-50%) ${v};--fp-active:${h};"
        title="${E} · ${Wt(r, o)}"
        role="button"
        tabindex="0"
        @action=${() => {
      this.hass && St(this, this.hass, { entity: o }, { action: "more-info" });
    }}
        .actionHandler=${it({})}
      >
        <ha-icon
          icon=${c}
          style="--mdc-icon-size:${j(_i, n)};"
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
    this._activeFloorId = t, Do.set(zo(e), t), this._zoomedAreaId && this._emitAreaTap(this._zoomedAreaId, !1), this._zoomedAreaId = void 0, !(i || !this.hass || !this._config?.historyReplay?.enabled) && this._replayController.resetForFloorChange();
  }
  /** floorplan-panel: service floorplan_panel.show_room — jump to a room (id or name) and zoom in. */
  showRoom(e, t) {
    if (!this._config) return !1;
    const i = Ve(this._config), n = e.toLowerCase();
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
    const i = ni(t, e.detail.action);
    if (!i) {
      e.detail.action === "tap" && this._onAreaClick(t);
      return;
    }
    this.hass && St(this, this.hass, { entity: i.entity }, i.config);
  }
  _renderBadge(e, t, i) {
    const n = z(e.size, Ge), r = j(n, t), o = e.entity ? i?.states[e.entity] : void 0, a = ns(e, o?.state, o?.attributes), s = Kt(e) === "value" ? ls(i, e) : void 0;
    return u`
      <div
        class="badge"
        style="width:${r};height:${r};transform:rotate(${z(e.angle, 0)}deg);"
      >
        ${s ? u`<span
              class="badge-value"
              style="font-size:${j(hs(n, s), t)};"
              >${s}</span
            >` : u`<ha-icon
              class=${a ? `anim-${a}` : ""}
              icon=${this._itemIcon(e, i)}
              style="--mdc-icon-size:${j(as(n), t)};"
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
    const o = this._isOn(e, r), a = Qa(r, e), s = e.entity ? r?.states[e.entity] : void 0, l = mr(e, s), c = U(ji(e.stateColor, l)), h = es(e, c), d = !!this.hass && $n(e, s?.state), p = cf(e, s?.state, r), g = Kt(e) !== "none", y = e.display ?? "badge", b = Wa(s), v = U(e.activeColor) ?? b, w = o || d ? void 0 : U(e.inactiveColor), E = e.rippleColor ?? c ?? e.activeColor ?? b ?? W, f = Ea(
      oi(
        c ?? (o ? v : w),
        this._config?.palette
      )
    ), $ = e.rippleSize ?? Ri, k = e.rippleDirection ?? Di, M = e.rippleWidth ?? zi, C = p ? "visibility: hidden; pointer-events: none;" : "";
    let H = m;
    y === "ripple" ? H = u`<span style="${C}">
        ${xi(o, E, $, k, M, 3, n)}
      </span>` : y === "iconRipple" ? H = u`<div class="stack" style="${C}">
        ${xi(o, E, $, k, M, 3, n)}
        ${g ? u`<div class="stack-icon">${this._renderBadge(e, n, r)}</div>` : m}
      </div>` : g && (H = u`<span style="${C}">
        ${this._renderBadge(e, n, r)}
      </span>`);
    const Y = ot(e.x, e.y, t.width, t.height, i), D = We(t.width, t.height, i), F = Wu(e);
    return u`
      <div
        class="item fp-item ${o ? "on" : "off"} ${d ? "offline" : ""} ${c ? "state-colored" : ""} ${w ? "inactive-colored" : ""} ${F ? "interactive" : ""}"
        data-id=${le(e.id) ?? m}
        data-entity=${De(e.entity) ?? m}
        data-kind=${le(e.kind) ?? m}
        style="left:${Y.x / D.w * 100}%; top:${Y.y / D.h * 100}%;${c ? `--fp-state:${c};` : ""}${v ? `--fp-active:${v};` : ""}${w ? `--fp-inactive:${w};` : ""}${f ? `--fp-ink:${f};` : ""}"
        title=${this._label(e, r)}
        role=${F ? "button" : m}
        tabindex=${F ? "0" : m}
        @action=${(S) => this._handleItemAction(S, e)}
        .actionHandler=${it({
      hasHold: Pe(e.hold_action),
      hasDoubleClick: Pe(e.double_tap_action),
      // Unbinds the gesture listeners outright, so keyboard activation
      // cannot reach an action that would do nothing.
      disabled: !F
    })}
        @pointerdown=${F && ei(t) === "ripple" ? (S) => this._startInk(S) : m}
      >
        ${H}
        ${F && ei(t) === "ripple" ? u`<span class="press-ink" aria-hidden="true"></span>` : m}
        ${a ? u`<span
              class="label ${H === m ? "inflow" : ""} label-${ur(e)}"
              style="font-size:${j(Ja(e.labelSize), n)};${h ? `color:${h};` : ""}"
              >${a}</span
            >` : m}
      </div>
    `;
  }
  _renderAreaLabel(e, t, i, n) {
    if (!e.name || (e.showName ?? !0) === !1) return m;
    const r = kr(e.points), o = ot(r.x, r.y, t.width, t.height, i), a = We(t.width, t.height, i), s = ff(e.labelSize, n);
    return u`
      <div
        class="area-label"
        style="left:${o.x / a.w * 100}%; top:${o.y / a.h * 100}%;${s}"
      >
        ${e.name}
      </div>
    `;
  }
  _renderText(e, t, i, n) {
    const r = ot(e.x, e.y, t.width, t.height, i), o = We(t.width, t.height, i);
    return u`
      <div
        class="text fp-text"
        data-id=${le(e.id) ?? m}
        style="left:${r.x / o.w * 100}%; top:${r.y / o.h * 100}%;
               font-size:${j(z(e.size, Ft), n)};
               color:${de(e.color, Ta)};
               transform:translate(-50%,-50%) scale(var(--fp-inv-zoom,1)) rotate(${z(e.angle, 0)}deg);"
      >
        ${sr(this.hass, e)}
      </div>
    `;
  }
  render() {
    if (!this._config) return u`${m}`;
    const e = this._config, t = this._replayController.getRenderState(), i = rc(this.hass, this._watchedEntities, this._replayController.historyService(), t.enabled, t.currentTime), n = Ve(e), r = n.find((f) => f.id === this._activeFloorId) ?? n.find((f) => f.id === e.defaultFloor) ?? n[0], o = Xf(e, this._portrait), a = We(z(e.width, st), z(e.height, jt), o), s = Jf(e.width, e.height, o), l = fr(e.overlayScale), c = e.sunDimming ? em(
      i?.states["sun.sun"]?.attributes?.elevation,
      z(e.sunBrightnessMin, tr),
      z(e.sunBrightnessMax, pi)
    ) : pi, h = e.showDeadSpaces ? Ha(r.walls, r.openings) : [], p = e.sunDimming || r.items.some((f) => f.glow) ? hr(
      r.walls,
      r.openings,
      (f) => (
        // Both leaves, and the travel each style actually has (issue #145):
        // asking `entity` alone left a door whose *second* panel was open
        // still blocking light outright. Glass admits it whole regardless
        // of sash — a closed window is not a hole, but light still gets
        // through it. A shutter rolled down overrides that, same as it
        // does for sunlight.
        qa(
          f,
          this._openingAmount(f, i),
          this._openingSecond(f, i)?.amount,
          f.shutterEntity ? Ne(i?.states[f.shutterEntity], f.shutterInvert) : void 0,
          this._openingMore(f, i)?.map(($) => $.amount)
        )
      )
    ) : r.walls, g = `${this._glowIdBase}-sundim`, y = e.sunDimming ? sf(
      r.items,
      i?.states,
      e.width,
      e.height,
      g,
      p
    ) : m, b = r.areas?.find((f) => f.id === this._zoomedAreaId), v = b ? bm(
      b.points,
      e.width,
      e.height,
      o,
      void 0,
      void 0,
      // A room may say how close to go; without one the fit decides,
      // exactly as it always has (issue #222).
      vm(b)
    ) : Tn, w = e.compactHeader === !0, E = w && !!e.title;
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
        .header=${w ? m : e.title ?? m}
        style=${Ps(e.palette) || m}
      >
        <div class="card-shell ${this._replayController.isHistoryVisible() ? "replay-visible" : ""}">
          ${this._config.historyReplay?.enabled ? this._renderReplayPanel() : m}
          <div
            class="stage press-${ei(e)} offline-${ss(e)} ${E ? "compact-title" : ""}"
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
                   background:${de(e.background, Fi)};"
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
          ${Sa(
      `${e.skin ?? ""}|${Fs(e.palette)}`,
      _`<svg viewBox="0 0 ${a.w} ${a.h}" preserveAspectRatio="none">
            <g transform=${s || m}>
            ${r.image ? _`<image href=${r.image} x="0" y="0" width=${e.width} height=${e.height}
                          preserveAspectRatio=${ks(r.imageFit)}
                          opacity=${r.imageOpacity ?? 1} />` : m}
            ${r.areas?.map((f) => {
        const $ = jf(f);
        return _`<g class="area-tap-target"
                    role=${$ ? "button" : m}
                    tabindex=${$ ? "0" : m}
                    @action=${(k) => this._onAreaAction(k, f)}
                    .actionHandler=${it({
          // Only wait out the timers when a gesture can resolve:
          // otherwise every tap on an ordinary room would sit for
          // 500ms before zooming.
          hasHold: Pe(ni(f, "hold")?.config),
          hasDoubleClick: Pe(ni(f, "double_tap")?.config)
        })}>
                  ${Ts(f, $o(f, f.entity ? i?.states[f.entity]?.state : void 0))}
                </g>`;
      })}
            <!-- Dead spaces (issue #88): the regions the walls seal off that no
                 door or window reaches, hatched. Above the room fills, so a
                 region someone has also drawn an area over still reads as
                 unreachable; below everything else, because it describes the
                 floor rather than anything standing on it. -->
            ${h.length ? _`${Es(`${this._wallMaskId}-dead`)}
                    ${h.map(
        (f) => As(f, `${this._wallMaskId}-dead`)
      )}` : m}
            <!-- Light pools (issue #6). Above the room fills but below the
                 furniture and walls, so light reads as cast onto the floor
                 rather than painted over the plan. Isolated as one layer: the
                 pools screen-blend with each other (two lamps brighten where
                 they meet) without screening against the plan beneath, which
                 would wash out on a light theme. -->
            ${Ya(
        r.furniture,
        e.width,
        e.height,
        `${this._glowIdBase}-mask`,
        wn(e.symbols)
      )}
            <g class="fp-glows"
               mask=${r.furniture.length ? `url(#${this._glowIdBase}-mask)` : m}>
              ${r.items.map((f, $) => {
        if (!f.glow) return m;
        const k = lr(f, i?.states[f.entity]);
        return k ? Va(f, k, `${this._glowIdBase}-${$}`, p) : m;
      })}
            </g>
            ${r.furniture.map((f) => {
        const $ = Cn(
          f,
          nf(f, f.entity ? i?.states[f.entity]?.state : void 0),
          wn(e.symbols)
        ), k = Tf(f, n, r.id);
        if (!k) return $;
        const M = n.find((C) => C.id === k)?.name;
        return _`<g class="fp-furniture-link" role="button" tabindex="0"
                    @action=${() => this._goToFloor(n, k)}
                    .actionHandler=${it({
          // A staircase has one gesture. Saying so keeps a tap from
          // sitting out the hold and double-tap timers before it
          // does anything.
          hasHold: !1,
          hasDoubleClick: !1
        })}>
                  <!-- An SVG tooltip is a <title> child, not a title=
                       attribute: the attribute does nothing here. -->
                  <title>${M ? `Go to ${M}` : "Go to the next floor"}</title>
                  ${$}
                </g>`;
      })}
            <!-- Sunlight through the openings. Under the walls on purpose:
                 light lands on the floor, and the walls stay crisp lines over
                 it rather than being tinted by the patches they let in. The
                 sun dimming further down is the whole-sky reading and still
                 has the last word — at night there is nothing to let in. -->
            ${e.sunlight ? ym(
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
          dir: fm(
            e,
            i?.states["sun.sun"]?.attributes?.azimuth
          ),
          strength: rm(
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
          reach: z(e.sunReach, wi) * (Ki(e) ? 1 : hm(i?.states["sun.sun"]?.attributes?.elevation)),
          // The gap each style actually clears, both leaves
          // included — the same reading the lamps get above, and
          // for the same reason (#145): `entity` alone leaves a
          // door whose *second* panel is open reading as shut,
          // and a converging pair reading as twice as clear as it
          // draws. Glazing and shutters are applied on top of
          // this, inside openingSunFraction.
          openAmount: (f) => Ka(
            f,
            this._openingAmount(f, i),
            this._openingSecond(f, i)?.amount,
            this._openingMore(f, i)?.map(($) => $.amount)
          ),
          // A shutter that is all the way down stops the light, as
          // one does. Undefined where none is bound, so an opening
          // without a shutter is judged on itself alone.
          shutterOpen: (f) => f.shutterEntity ? Ne(i?.states[f.shutterEntity], f.shutterInvert) : void 0,
          light: e.sunlightColor ?? En,
          shade: e.sunShade === !1 ? null : e.sunShadeColor ?? An
        }
      ) : m}
            ${Ss(r.openings, e.width, e.height, this._wallMaskId)}
            ${r.walls.map(
        (f) => _`
                <g class="fp-wall-neon"><line x1=${f.x1} y1=${f.y1} x2=${f.x2} y2=${f.y2}
                      class="wall fp-wall" data-id=${le(f.id) ?? m}
                      mask=${`url(#${this._wallMaskId})`}
                      style=${ts(f.thickness)} stroke-linecap="round" /></g>`
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
        (f, $) => Cs(
          f,
          $o(f, f.entity ? i?.states[f.entity]?.state : void 0),
          `${this._wallMaskId}-area-${$}`
        )
      )}
            </g>
            ${Se(
        // Keyed by id: switching floors must create fresh DOM nodes.
        // Unkeyed, Lit morphs floor A's openings into floor B's, and the
        // 0.5s leaf/panel transitions animate the leftover state — a
        // window briefly plays a door swing (issue #50).
        r.openings,
        (f, $) => f.id || $,
        (f) => {
          const $ = this._openingAmount(f, i), k = f.shutterEntity ? i?.states[f.shutterEntity] : void 0, M = ws(f, {
            color: Qn,
            // The closed tone (issue #228). Absent, the moving parts stay
            // the wall colour, which is what a closed opening always was —
            // and that is also what an opening whose contact has dropped
            // out falls back to, so a dead sensor does not draw the same
            // emphatic "shut" as a door that really is (issue #162).
            // Guarded on `hass` for the same reason the device path is:
            // before the first states arrive every opening would read as
            // offline and the closed colour would flash off on load.
            inactive: this.hass && $n(f, f.entity ? i?.states[f.entity]?.state : void 0) ? void 0 : f.inactiveColor,
            open: $ > 0,
            amount: $,
            active: this._openingActive(f, i),
            accent: f.activeColor ?? W,
            // Per-leaf state for a two-sensor biparting slider (issue #145).
            second: this._openingSecond(f, i),
            more: this._openingMore(f, i),
            // External roller shutter layer (issue #74). No entity bound
            // yet → previewed shut, like a static plan.
            shutter: f.shutterEntity ? {
              amount: Ne(k, f.shutterInvert),
              active: ii(k, f.shutterInvert),
              style: lt(f),
              // The shutter's own accent, falling back to the
              // opening's and then to the skin's.
              accent: f.shutterActiveColor ?? f.activeColor ?? W,
              flip: f.shutterFlipV,
              // Per-panel state for a two-contact hinged shutter
              // (issue #159).
              second: this._shutterSecond(f, i)
            } : void 0
          });
          if (!Wf(f, this._featuresOf)) return M;
          const C = f.length / 2, H = V + 4;
          return _`<g class="fp-opening" role="button" tabindex="0"
                    @action=${(Y) => this._onOpeningAction(Y, f)}
                    .actionHandler=${it({
            // Only wait out the hold/double-tap timers when a gesture
            // actually resolves: otherwise every tap on a plain
            // contact sensor would sit for 500ms before answering.
            hasHold: Pe(this._openingPress(f, "hold")?.config),
            hasDoubleClick: Pe(this._openingPress(f, "double_tap")?.config)
          })}>
                  ${M}
                  <rect class="fp-opening-hit" x=${f.x - C} y=${f.y - H / 2}
                        width=${f.length} height=${H}
                        transform="rotate(${f.angle} ${f.x} ${f.y})" />
                </g>`;
        }
      )}
            ${Se(
        r.trackers ?? [],
        (f, $) => f.id || $,
        (f) => Is(f, {
          editing: !1,
          xReading: $i(i?.states, f.xSensor?.entity),
          yReading: $i(i?.states, f.ySensor?.entity),
          xPresent: mi(i?.states, f.xSensor?.presence),
          yPresent: mi(i?.states, f.ySensor?.presence)
        })
      )}
            <!-- Sun dimming (issue #113). Last inside the rotated group, so it
                 covers the whole plan; the device overlay below is HTML and
                 stays at full brightness, keeping icons and state readable at
                 night. pointer-events:none is not optional — this rect spans
                 the canvas, and without it every tappable opening underneath
                 stops responding (the lesson from #108). -->
            ${e.sunDimming ? _`${y}<rect class="fp-sun-dim"
                            x=${-V} y=${-V}
                            width=${e.width + V * 2}
                            height=${e.height + V * 2}
                            fill="#000"
                            mask=${y === m ? m : `url(#${g})`}
                            opacity=${1 - c} />` : m}
            </g>
          </svg>`
    )}
          <div
            class="items"
            style="--fp-inv-zoom:${_m(v.scale, e.zoomedOverlayScale)};"
          >
            ${r.areas?.map((f) => this._renderAreaLabel(f, e, o, l))}
            ${r.texts.map((f) => this._renderText(f, e, o, l))}
            ${Se(
      // Keyed like the openings above: a floor switch must build fresh
      // nodes rather than morph one floor's badges into another's.
      r.openings.filter((f) => fs(f)),
      (f, $) => `${f.id || $}-shutter`,
      (f) => this._renderShutterMark(f, e, o, l, i)
    )}
            ${Se(
      r.openings.filter((f) => ys(f)),
      (f, $) => `${f.id || $}-opening`,
      (f) => this._renderOpeningMark(f, e, o, l, i)
    )}
            ${Se(
      // No entity filter: devices that exist physically but have no HA
      // entity still deserve their badge (issue #39). Keyed by id so a
      // floor switch builds fresh DOM (see the openings comment).
      // "Only when active" devices drop out here (issue #55), and so do
      // the ones that only show inside their own room (#222) — the
      // editor still draws them, dimmed, so they stay editable.
      r.items.filter(
        (f) => !Za(
          f,
          f.entity ? i?.states[f.entity]?.state : void 0
        ) && !lf(f, b)
      ),
      (f, $) => f.id || $,
      (f) => this._renderItem(f, e, o, l, i)
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
              </button>` : m}
          ${E ? u`<div class="plan-title">${e.title}</div>` : m}
          ${n.length > 1 ? this._renderFloorSwitcher(n, r, w) : m}
        </div>
        </div>
      </ha-card>
    `;
  }
  _renderReplayPanel() {
    return Fm(Pm(this._replayController));
  }
  _renderFloorSwitcher(e, t, i = !1) {
    return u`
      <div class="floor-switcher ${i ? "row" : ""}">
        ${e.map((n) => {
      const r = n.id === t.id ? U(n.color) : void 0;
      return u`
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
ue._nextWallMaskId = 0;
ue._nextGlowId = 0;
ue.styles = [
  Ca,
  bc,
  $e`
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
      width: ${fi}px;
      height: ${fi}px;
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
       replace it — restating scale(${oo}) alone would drop the
       counter-scale along with the translate, and a badge held down at 4x
       zoom would balloon to roughly 4x its resting size instead of shrinking. */
    .press-scale .item.interactive {
      transition: transform ${so}ms cubic-bezier(0.2, 0.8, 0.3, 1);
    }
    .press-scale .item.interactive:active {
      transform: translate(-50%, -50%) scale(calc(var(--fp-inv-zoom, 1) * ${oo}));
      transition-duration: ${ao}ms;
    }

    /* Flash: drop-shadow rather than a box-shadow or a background, so the halo
       follows whatever the device actually draws — the badge's circle, a bare
       ripple ring, the label — instead of a rectangle around it. */
    .press-flash .item.interactive {
      transition: filter ${so}ms ease-out;
    }
    .press-flash .item.interactive:active {
      filter: drop-shadow(0 0 5px var(--fp-skin-accent, var(--primary-color, #03a9f4)));
      transition-duration: ${ao}ms;
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
      font-size: ${ir}px;
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
_t([
  I({ attribute: !1 })
], ue.prototype, "hass", 2);
_t([
  T()
], ue.prototype, "_config", 2);
_t([
  T()
], ue.prototype, "_activeFloorId", 2);
_t([
  T()
], ue.prototype, "_zoomedAreaId", 2);
_t([
  T()
], ue.prototype, "_portrait", 2);
ue = _t([
  Oe("fp-ef-card")
], ue);
const at = 26, Gm = 0.75;
function Vm(e, t, i, n = Gm) {
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
function Rs(e, t, i, n) {
  let r = null, o = n;
  for (const a of e) {
    const s = Math.hypot(t - a.x, i - a.y);
    s < o && (o = s, r = { x: a.x, y: a.y });
  }
  return r;
}
function Ds(e, t, i, n) {
  const r = e.flatMap((o) => [
    { x: o.x1, y: o.y1 },
    { x: o.x2, y: o.y2 }
  ]);
  return Rs(r, t, i, n);
}
function Ym(e, t, i, n, r) {
  const o = e.walls.flatMap((s) => [
    { x: s.x1, y: s.y1 },
    { x: s.x2, y: s.y2 }
  ]), a = (e.areas ?? []).flatMap(
    (s) => s.points.filter((l, c) => !(r && r.areaId === s.id && r.vertexIndex === c)).map((l) => ({ x: l.x, y: l.y }))
  );
  return Rs([...o, ...a], t, i, n);
}
function Ho(e, t, i) {
  const n = e.areas ?? [];
  for (let r = n.length - 1; r >= 0; r--)
    if (qi(n[r].points, t, i)) return n[r];
}
function Zm(e, t) {
  if (t <= 0) return [];
  const i = kr(e);
  if (t === 1) return [i];
  const n = e.map((d) => d.x), r = e.map((d) => d.y), o = Math.min(...n), a = Math.max(...n), s = Math.min(...r), l = Math.max(...r), c = Math.max(a - o, 1), h = Math.max(l - s, 1);
  for (let d = 1; d <= 8; d++) {
    const p = t * d, g = Math.max(1, Math.round(Math.sqrt(p * c / h))), y = Math.max(1, Math.ceil(p / g)), b = c / (g + 1), v = h / (y + 1), w = [];
    for (let E = 1; E <= y; E++)
      for (let f = 1; f <= g; f++) {
        const $ = o + f * b, k = s + E * v;
        qi(e, $, k) && w.push({ x: $, y: k });
      }
    if (w.length >= t)
      return Array.from(
        { length: t },
        (E, f) => w[Math.floor(f * w.length / t)]
      );
  }
  return Array.from({ length: t }, (d, p) => {
    const g = p / t * Math.PI * 2, y = Math.min(c, h) * 0.15 * (1 + Math.floor(p / 6));
    return { x: i.x + Math.cos(g) * y, y: i.y + Math.sin(g) * y };
  });
}
function Xm(e, t, i, n, r, o, a, s, l = at) {
  if (a) return { x: o(n), y: o(r) };
  const c = Ds(e, n, r, l);
  if (c) return c;
  const h = n - t, d = r - i, p = Math.tan(s * Math.PI / 180);
  return Math.abs(d) <= Math.abs(h) * p ? { x: o(n), y: i } : Math.abs(h) <= Math.abs(d) * p ? { x: t, y: o(r) } : { x: o(n), y: o(r) };
}
function Qm(e, t) {
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
    const c = kr(l.points);
    a(c.x, c.y) && s.push({ kind: "area", id: l.id });
  }
  return s;
}
function Jm(e, t, i, n) {
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
const eg = [
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
function Xt(e, t, i, n, r) {
  const o = -(r || 0) * Math.PI / 180, a = e - i, s = t - n;
  return { x: a * Math.cos(o) - s * Math.sin(o), y: a * Math.sin(o) + s * Math.cos(o) };
}
function tg(e, t, i) {
  const n = i.x2 - i.x1, r = i.y2 - i.y1, o = n * n + r * r;
  if (o === 0) return Math.hypot(e - i.x1, t - i.y1);
  let a = ((e - i.x1) * n + (t - i.y1) * r) / o;
  return a = Math.max(0, Math.min(1, a)), Math.hypot(e - (i.x1 + a * n), t - (i.y1 + a * r));
}
function ig(e, t, i, n) {
  const r = [], o = (a, s, l, c) => r.push({ sel: { kind: a, id: s }, rank: eg.indexOf(a), order: l, locked: !!c });
  return e.items.forEach((a, s) => {
    const l = (a.size ?? n.itemSize) / 2 + At.pad;
    Math.abs(t - a.x) <= l && Math.abs(i - a.y) <= l && o("item", a.id, s, a.locked);
  }), e.texts.forEach((a, s) => {
    const l = a.size ?? n.textSize, c = l * 0.6 * Math.max(1, sr(n.hass, a).length) / 2 + At.pad, h = l / 2 + At.pad, d = Xt(t, i, a.x, a.y, a.angle ?? 0);
    Math.abs(d.x) <= c && Math.abs(d.y) <= h && o("text", a.id, s, a.locked);
  }), e.openings.forEach((a, s) => {
    const l = Xt(t, i, a.x, a.y, a.angle ?? 0);
    Math.abs(l.x) <= a.length / 2 && Math.abs(l.y) <= n.wallThickness / 2 + At.pad && o("opening", a.id, s, a.locked);
  }), e.furniture.forEach((a, s) => {
    const l = Xt(t, i, a.x, a.y, a.angle ?? 0);
    Math.abs(l.x) <= a.w / 2 && Math.abs(l.y) <= a.h / 2 && o("furniture", a.id, s, a.locked);
  }), e.walls.forEach((a, s) => {
    tg(t, i, a) <= At.wall && o("wall", a.id, s, a.locked);
  }), (e.trackers ?? []).forEach((a, s) => {
    const l = Xt(t, i, a.x + a.w / 2, a.y + a.h / 2, a.angle ?? 0);
    Math.abs(l.x) <= a.w / 2 && Math.abs(l.y) <= a.h / 2 && o("tracker", a.id, s, a.locked);
  }), (e.areas ?? []).forEach((a, s) => {
    qi(a.points, t, i) && o("area", a.id, s, a.locked);
  }), r.sort((a, s) => Number(a.locked) - Number(s.locked) || a.rank - s.rank || s.order - a.order).map((a) => a.sel);
}
function zs(e, t) {
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
function Tt(e, t) {
  return !!zs(e, t)?.locked;
}
function ng(e, t) {
  return t.filter((i) => {
    const n = zs(e, i);
    return !!n && !n.locked;
  });
}
function rg(e, t, i) {
  if (!e.length) return null;
  if (!i || t.length !== 1) return e[0];
  const n = e.findIndex((r) => r.kind === t[0].kind && r.id === t[0].id);
  return n < 0 ? e[0] : e[(n + 1) % e.length];
}
const og = {
  request: (e) => requestAnimationFrame(e),
  cancel: (e) => cancelAnimationFrame(e)
};
class ag {
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
const Bo = "Apply needs Home Assistant's card editor — use Save instead.", sg = "Save this card once first — it isn't on the dashboard yet.", lg = 200;
function cg(e) {
  let t = e;
  for (let i = 0; t && i < lg; i++) {
    const n = t;
    if (typeof n._params?.saveCardConfig == "function") return n;
    t = t.parentNode ?? t.host ?? null;
  }
  return null;
}
async function dg(e) {
  const t = cg(e);
  if (!t) return { ok: !1, error: Bo };
  if (t._params?.isNew) return { ok: !1, error: sg };
  const i = t._cardConfig;
  if (!i || typeof i != "object")
    return { ok: !1, error: Bo };
  try {
    await t._params.saveCardConfig(i);
  } catch (n) {
    return { ok: !1, error: `Could not save — ${n instanceof Error ? n.message : String(n)}` };
  }
  return typeof t._markDirtyStateClean == "function" ? t._markDirtyStateClean() : typeof t._dirty == "boolean" && (t._dirty = !1), { ok: !0 };
}
const xe = (e) => e.split(".")[0], hg = /* @__PURE__ */ new Set([
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
]), pg = /* @__PURE__ */ new Set(["scene", "script", "button", "input_button"]);
function On(e) {
  const t = xe(e);
  return t === "scene" ? "scene" : t === "script" ? "script" : "device";
}
function ug(e) {
  return hg.has(xe(e));
}
function fg(e) {
  return pg.has(xe(e));
}
function Uo(e) {
  if (!e) return !1;
  const t = e.state;
  if (t === "unavailable" || t === "unknown") return !1;
  switch (xe(e.entity_id)) {
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
function jo(e) {
  return !e || e.state === "unavailable";
}
function Ln(e, t) {
  return e.states[t]?.attributes.friendly_name ?? t;
}
function mg(e, t) {
  if (!t) return "nicht gefunden";
  if (e.formatEntityState)
    try {
      return e.formatEntityState(t);
    } catch {
    }
  const i = t.attributes.unit_of_measurement;
  return i ? `${t.state} ${i}` : t.state;
}
const gg = {
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
function Gt(e, t, i) {
  if (i) return i;
  const n = e.states[t]?.attributes.icon;
  return n || (gg[xe(t)] ?? "mdi:help-circle-outline");
}
async function yg(e, t) {
  const i = xe(t), n = e.states[t];
  i === "lock" ? await e.callService("lock", n?.state === "locked" ? "unlock" : "lock", { entity_id: t }) : i === "cover" ? await e.callService("cover", "toggle", { entity_id: t }) : await e.callService("homeassistant", "toggle", { entity_id: t });
}
async function Wo(e, t) {
  const i = xe(t);
  i === "scene" ? await e.callService("scene", "turn_on", { entity_id: t }) : i === "script" ? await e.callService("script", "turn_on", { entity_id: t }) : (i === "button" || i === "input_button") && await e.callService(i, "press", { entity_id: t });
}
function Ko(e, t) {
  e.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: t }, bubbles: !0, composed: !0 }));
}
var bg = Object.defineProperty, vg = Object.getOwnPropertyDescriptor, be = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? vg(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (r = (n ? a(t, i, r) : a(r)) || r);
  return n && r && bg(t, i, r), r;
};
const _g = 60;
let he = class extends ce {
  constructor() {
    super(...arguments), this.value = "", this.domains = [], this.exclude = [], this.placeholder = "Entität suchen …", this.clearOnSelect = !1, this._open = !1, this._filter = "", this._highlight = 0;
  }
  _results() {
    const e = this._filter.trim().toLowerCase(), t = new Set(this.exclude), i = [];
    for (const n of Object.keys(this.hass.states).sort()) {
      if (t.has(n) || this.domains.length && !this.domains.includes(xe(n))) continue;
      const r = this.hass.states[n].attributes.friendly_name ?? n;
      if (!(e && !n.toLowerCase().includes(e) && !r.toLowerCase().includes(e)) && (i.push({ id: n, name: r }), i.length >= _g))
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
        ${this.value && !this.clearOnSelect ? u`<ha-icon class="lead" .icon=${Gt(this.hass, this.value)}></ha-icon>` : u`<ha-icon class="lead" icon="mdi:magnify"></ha-icon>`}
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
            </button>` : m}
      </div>
      ${this.value && !this.clearOnSelect ? u`<div class="id">${this.value}</div>` : m}
      ${this._open ? u`<div class="list">
            ${e.length === 0 ? u`<div class="none">Keine Treffer</div>` : e.map(
      (n, r) => u`<div
                    class="opt ${r === this._highlight ? "hl" : ""}"
                    @mousedown=${(o) => {
        o.preventDefault(), this._select(n.id);
      }}
                  >
                    <ha-icon .icon=${Gt(this.hass, n.id)}></ha-icon>
                    <span class="txt"><span>${n.name}</span><small>${n.id}</small></span>
                  </div>`
    )}
          </div>` : m}
    `;
  }
};
he.styles = $e`
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
  I({ attribute: !1 })
], he.prototype, "hass", 2);
be([
  I()
], he.prototype, "value", 2);
be([
  I({ attribute: !1 })
], he.prototype, "domains", 2);
be([
  I({ attribute: !1 })
], he.prototype, "exclude", 2);
be([
  I()
], he.prototype, "placeholder", 2);
be([
  I({ type: Boolean })
], he.prototype, "clearOnSelect", 2);
be([
  T()
], he.prototype, "_open", 2);
be([
  T()
], he.prototype, "_filter", 2);
be([
  T()
], he.prototype, "_highlight", 2);
be([
  Oi("input")
], he.prototype, "_input", 2);
he = be([
  Oe("fp-entity-picker")
], he);
function qo(e) {
  if (e.length !== 4) return;
  const t = [...new Set(e.map((n) => n.x))], i = [...new Set(e.map((n) => n.y))];
  if (!(t.length !== 2 || i.length !== 2))
    return { x: Math.min(...t), y: Math.min(...i), w: Math.abs(t[0] - t[1]), h: Math.abs(i[0] - i[1]) };
}
const wg = [
  ["room", "Zimmer"],
  ["balcony", "Balkon"],
  ["hallway", "Flur"],
  ["staircase", "Treppenhaus"],
  ["bathroom", "Bad"],
  ["custom", "Eigene Bezeichnung"]
];
var xg = Object.defineProperty, $g = Object.getOwnPropertyDescriptor, Sr = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? $g(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (r = (n ? a(t, i, r) : a(r)) || r);
  return n && r && xg(t, i, r), r;
};
let Vt = class extends ce {
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
    const i = this.area.points, n = i && qo(i);
    !i || !n || !(e >= 1) || !(t >= 1) || this._patch({
      points: i.map((r) => ({ x: r.x === n.x ? n.x : n.x + e, y: r.y === n.y ? n.y : n.y + t }))
    });
  }
  render() {
    const e = this.area, t = e.points && qo(e.points), i = this._list;
    return u`
      <label class="field">
        <span>Type</span>
        <select @change=${(n) => this._patch({ type: n.target.value })}>
          ${wg.map(([n, r]) => u`<option value=${n} ?selected=${(e.type ?? "room") === n}>${r}</option>`)}
        </select>
      </label>
      ${e.type === "custom" ? u`<label class="field">
            <span>Label</span>
            <input
              type="text"
              .value=${e.typeLabel ?? ""}
              @change=${(n) => this._patch({ typeLabel: n.target.value.trim() || void 0 })}
            />
          </label>` : m}
      ${t ? u`<div class="dims">
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
      (n, r) => u`<div class="row">
          <ha-icon .icon=${Gt(this.hass, n.entity, n.icon)}></ha-icon>
          <div class="main">
            <input
              type="text"
              .value=${n.name ?? ""}
              placeholder=${Ln(this.hass, n.entity)}
              @change=${(o) => this._rename(r, o.target.value.trim())}
            />
            <small>${n.entity} · ${{ device: "device", scene: "scene", script: "script" }[On(n.entity)]}${this.hass.states[n.entity] ? "" : " · not found"}</small>
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
Vt.styles = $e`
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
Sr([
  I({ attribute: !1 })
], Vt.prototype, "hass", 2);
Sr([
  I({ attribute: !1 })
], Vt.prototype, "area", 2);
Vt = Sr([
  Oe("fp-ef-area-extras")
], Vt);
function Go(e) {
  return "text" in e.selector || "number" in e.selector;
}
function kg(e, t, i) {
  const n = {};
  for (const r of i)
    t[r.name] !== e[r.name] && (n[r.name] = t[r.name]);
  return n;
}
function Vo(e, t) {
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
const Je = (e) => e, Qt = ["binary_sensor", "cover", "lock"];
function ve(e, t) {
  return { fields: t.map((n) => e.fields.find((r) => r.name === n)).filter((n) => !!n), data: e.data, toPatch: e.toPatch };
}
const Yt = () => ({
  name: "angle",
  label: "Angle",
  selector: { number: { min: 0, max: 360, step: 1, mode: "slider", unit_of_measurement: "°" } }
}), x = (e, t) => ({ value: e, label: t }), B = (...e) => ({
  select: { mode: "dropdown", options: e }
});
function Hs(e = Ie) {
  return Nu(e);
}
function Sg(e, t = Ie) {
  return Ui(t, e)?.name ?? e;
}
function Eg(e, t = () => 0) {
  const i = X(e), n = Wi(e), r = yi(e), o = [
    { name: "type", label: "Type", selector: B(x("door", "Door"), x("window", "Window")) },
    {
      name: "motion",
      label: "Motion",
      selector: B(
        x("swing", "Swing"),
        x("slide", "Slide"),
        // Not "garage / shutter": an external shutter is the Shutter field
        // below, a layer over any opening, and naming it here read as the
        // place to set one up.
        x("roll", "Roll up (garage)"),
        ...e.type === "window" ? [x("fixed", "Fixed (does not open)"), x("awning", "Top-hinged (awning)")] : []
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
      selector: a ? B(
        x("single", "Single (one leaf)"),
        x("double", "Double (two leaves)"),
        x("triple", "Triple (three leaves)"),
        x("quad", "Quad (four leaves)")
      ) : B(
        x("double", "Double (two leaves)"),
        x("single", "Single sash"),
        x("triple", "Triple (three sashes)"),
        x("quad", "Quad (four sashes)")
      )
    });
  }
  if (i === "swing" && Rt(e) === "single" && o.push({
    name: "sashSpan",
    label: e.type === "door" ? "Leaf width" : "Sash width",
    helper: e.type === "door" ? "Share of the opening that actually swings — the rest is a fixed panel" : "Share of the opening that actually opens — the rest is fixed glass",
    selector: { number: { min: Ba, max: 1, step: 0.05, mode: "slider" } }
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
  }), i === "swing" && Rt(e) === "single" && o.push({
    name: "hinge",
    label: "Hinge",
    selector: B(x("left", "Left"), x("right", "Right"))
  }), i === "swing") {
    const a = Te(e);
    for (let s = 0; a > 1 && s < a; s++)
      o.push({
        name: `leafHinge${s + 1}`,
        label: `Hinge leaf ${s + 1}`,
        selector: B(x("", "Default"), x("left", "Left"), x("right", "Right"))
      });
  }
  if (i === "swing" && o.push({
    name: "opens",
    label: "Opens",
    selector: B(x("this", "This side"), x("other", "Other side"))
  }), i === "slide" && (r || o.push({
    name: "slide",
    label: "Slide",
    selector: B(x("left", "To left"), x("right", "To right"))
  }), o.push({
    name: "style",
    label: "Style",
    selector: B(
      x("single", "Single"),
      x("bypass", "Bypass (stack)"),
      x("biparting", "Biparting (into the walls)"),
      x("biparting-bypass", "Biparting (over fixed panels)"),
      x("converging", "Converging (both panels stack in the middle)")
    )
  })), o.push({
    name: "entity",
    label: "Entity",
    // Says locks are usable, because nothing else would: a lock is neither a
    // contact nor a cover, and its states are `locked` / `unlocked` rather
    // than anything that looks like open/closed (issue #176).
    helper: r ? "Contact, cover or lock. Drives the first leaf; type and motion follow its device class" : "Contact, cover or lock — a lock reads unlocked as open. Type and motion follow its device class",
    selector: { entity: { filter: [{ domain: Qt }] } }
  }), r && e.entity && o.push({
    name: "secondaryEntity",
    label: "Second leaf",
    helper: "Its own sensor for the other leaf — leave empty to move both together",
    selector: { entity: { filter: [{ domain: Qt }] } }
  }), i === "swing" && e.entity) {
    const a = Te(e);
    a >= 3 && o.push({
      name: "leaf3Entity",
      label: "Third leaf",
      helper: "Its own sensor — leave empty to follow the first leaf",
      selector: { entity: { filter: [{ domain: Qt }] } }
    }), a >= 4 && o.push({
      name: "leaf4Entity",
      label: "Fourth leaf",
      helper: "Its own sensor — leave empty to follow the first leaf",
      selector: { entity: { filter: [{ domain: Qt }] } }
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
    selector: B(x("swing", "Hinged (louvered panels)"), x("roll", "Roll-up (slats)"))
  }), lt(e) === "swing" && o.push({
    name: "shutterSide",
    label: "Shutter side",
    helper: "Which side of the wall the panels hang on",
    selector: B(x("far", "Away from the sash"), x("near", "Same side as the sash"))
  }), lt(e) === "swing" && o.push({
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
      e.type === "door" && X(e) === "swing" ? "No sensor bound — draws shut instead of open" : "No sensor bound — draws open instead of shut"
    ),
    selector: { boolean: {} }
  }), o.push(Yt()), e.entity && (o.push({
    name: "showIcon",
    label: "Show icon",
    helper: X(e) === "roll" ? "A raised roll-up leaves only a line — this puts its state beside it, and opens its dialog when tapped" : "Shows this opening's state beside it, and opens its dialog when tapped",
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
    selector: B(
      x("opening", e.type === "door" ? "The door" : "The window"),
      x("shutter", "The shutter")
    )
  })), (e.entity || e.shutterEntity) && o.push(
    {
      name: "tap_action",
      label: "Tap action",
      selector: {
        ui_action: {
          default_action: vr(e, "tap", t)?.config.action ?? "none"
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
      sash: Rt(e),
      entity: e.entity ?? "",
      secondaryEntity: e.secondaryEntity ?? "",
      leafHinge1: e.leafHinges?.[0] ?? "",
      leafHinge2: e.leafHinges?.[1] ?? "",
      leafHinge3: e.leafHinges?.[2] ?? "",
      leafHinge4: e.leafHinges?.[3] ?? "",
      leaf3Entity: e.extraEntities?.[0] ?? "",
      leaf4Entity: e.extraEntities?.[1] ?? "",
      glazed: $r(e),
      sunlight: e.sunlight ?? !0,
      shutterEntity: e.shutterEntity ?? "",
      shutterSecondaryEntity: e.shutterSecondaryEntity ?? "",
      shutterStyle: lt(e),
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
          s.motion = h, c !== "slide" && (s.sliderStyle = void 0), c !== "swing" && (s.sashSpan = void 0), c !== "swing" && (s.extraEntities = void 0), c !== "swing" && (s.leafHinges = void 0), yi({
            ...e,
            motion: h,
            sliderStyle: c === "slide" ? e.sliderStyle : void 0
          }) || (s.secondaryEntity = void 0);
        } else if (l === "sashSpan")
          s.sashSpan = typeof c == "number" && c < 1 ? c : void 0;
        else if (l === "sash") {
          s.sash = c === kn(e.type) ? void 0 : c;
          const h = Te({ ...e, sash: c, motion: "swing" });
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
        } else l === "shutterStyle" ? (s.shutterStyle = c, c !== "swing" && (s.shutterSecondaryEntity = void 0)) : l === "hinge" || l === "slide" ? s.flipH = c === "right" || void 0 : l === "opens" ? s.flipV = c === "other" || void 0 : l === "style" ? (s.sliderStyle = c === "single" ? void 0 : c, ps(c) || (s.secondaryEntity = void 0)) : l === "invert" ? s.invert = c || void 0 : s[l] = c;
      return s;
    }
  };
}
function Er(e, t) {
  return e?.entities.length ? { entity: { include_entities: t && !e.entities.includes(t) ? [...e.entities, t] : e.entities } } : { entity: {} };
}
function Ar(e, t) {
  if (!e?.entities.length) return t;
  const n = `Only entities in ${e.name ? `the ${e.name} area` : "this area"} — turn off “Filter entities” on the area to see all`;
  return t ? `${t}. ${n}` : n;
}
function ai(e) {
  if ((e.display ?? "badge") === "ripple") return "none";
  const t = Kt(e);
  if (t !== "icon") return t;
  const i = e.iconAnimation ?? "auto";
  return i === "spin" || i === "pulse" ? i : i === "auto" ? is(e.entity) ?? "icon" : "icon";
}
function Tr(e) {
  return (e.display ?? "badge") !== "badge";
}
function Bs(e, t) {
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
function Ag(e, t) {
  return {
    fields: [
      {
        name: "entity",
        label: "Entity",
        required: !0,
        helper: Ar(t),
        selector: Er(t, e.entity)
      },
      {
        name: "attribute",
        label: "Attribute",
        helper: "Show this attribute instead of the state (e.g. current_temperature)",
        selector: { attribute: { entity_id: e.entity } }
      }
    ],
    data: { entity: e.entity ?? "", attribute: e.attribute ?? "" },
    toPatch: Je
  };
}
function Tg(e) {
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
    toPatch: Je
  };
}
function Cg(e) {
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
    toPatch: Je
  };
}
function Ig(e) {
  const t = [
    {
      name: "labelPosition",
      label: "Label position",
      helper: "Beside the badge instead of under it — a long reading then grows one way only",
      selector: B(x("below", "Below"), x("left", "Left"), x("right", "Right"))
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
      labelPosition: ur(e),
      labelSize: e.labelSize ?? Xa,
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
function Og(e, t) {
  const i = [
    {
      name: "badgeMode",
      label: "Badge shows",
      helper: "Animations play only while the entity is active. Value puts the reading in the badge, falling back to the icon when there is no number",
      selector: B(
        x("icon", "Icon, still"),
        x("spin", "Icon, spinning"),
        x("pulse", "Icon, pulsing"),
        x("value", "Value"),
        x("none", "Nothing")
      )
    }
  ], n = ze(e);
  return ai(e) === "value" && n.length && i.push({
    name: "badgeEntity",
    label: "Badge reads",
    helper: "Which of this device's readings the badge shows",
    selector: B(
      x("primary", t?.primaryLabel || e.entity || "Main entity"),
      ...n.map(
        (r, o) => x(
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
    Yt()
  ), {
    fields: i,
    data: {
      badgeMode: ai(e),
      // The dropdown's values are strings, so the stored index (or the legacy
      // "secondary") is spelled the same way here; toPatch turns it back into
      // a number. Opens on what the badge is *actually* reading when nothing
      // is chosen, which is the whole point of badgeSource (issue #136).
      badgeEntity: String(cs(e.badgeEntity) ?? t?.source ?? "primary"),
      size: e.size ?? Ge,
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
        ...Bs(a ?? ai(e), Tr(e))
      };
    }
  };
}
function Lg(e, t) {
  const i = Tr(e), n = rs(e.entity, t), r = e.kind === "light" || e.entity?.startsWith("light.");
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
      rippleSize: e.rippleSize ?? Ri,
      rippleDirection: e.rippleDirection ?? Di,
      rippleWidth: e.rippleWidth ?? zi,
      glow: e.glow ?? !1,
      glowRadius: e.glowRadius ?? Ni,
      glowColor: e.glowColor ?? ""
    },
    // "Ripple" is the other half of #127's three-key spelling — same expansion
    // as the badge group's, with the badge mode read off the item.
    toPatch: (a) => {
      if (!("ripple" in a)) return a;
      const { ripple: s, ...l } = a;
      return { ...l, ...Bs(ai(e), !!s) };
    }
  };
}
function Mg(e) {
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
function Pg(e) {
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
        selector: { ui_action: { default_action: Ra(e.entity).action } }
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
    toPatch: Je
  };
}
function Fg(e, t) {
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
      helper: Ar(t, "Shows this entity's value, formatted as HA formats it"),
      selector: Er(t, e.entity)
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
    Yt()
  ), {
    fields: i,
    data: {
      text: e.text ?? "",
      entity: e.entity ?? "",
      attribute: e.attribute ?? "",
      size: e.size ?? Ft,
      angle: e.angle ?? 0
    },
    toPatch: (n) => "entity" in n && !n.entity ? { ...n, attribute: void 0 } : n
  };
}
function Ng(e, t, i = Ie) {
  const n = Hs(i);
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
          selector: B(x("right", "right"), x("left", "left"))
        }
      ] : [],
      { name: "w", label: "Width", required: !0, selector: { number: { min: 10, mode: "box" } } },
      { name: "h", label: "Height", required: !0, selector: { number: { min: 10, mode: "box" } } },
      Yt(),
      // Optional entity that makes the drawing live (issue #82) — a soil
      // sensor on a plant, a contact sensor on a cabinet. Last, because most
      // furniture is decoration and never binds anything.
      {
        name: "entity",
        label: "Entity",
        helper: Ar(t, "Optional — lets the drawing change color with a sensor"),
        selector: Er(t, e.entity)
      },
      // Clicking it changes floor (issue #121). Offered on any piece rather
      // than only on the built-in `stairs`, because a plan can draw its own
      // staircase and a rule keyed on one symbol id would leave those out.
      // Empty on everything by default, so it is a row and not a nag.
      {
        name: "goToFloor",
        label: "Go to floor",
        helper: "Clicking this piece changes floor — for a staircase",
        selector: B(x("", "Nothing"), x("up", "Up one floor"), x("down", "Down one floor"))
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
function Rg(e) {
  return {
    fields: [
      { name: "w", label: "Width", required: !0, selector: { number: { min: 10, mode: "box" } } },
      { name: "h", label: "Height", required: !0, selector: { number: { min: 10, mode: "box" } } },
      { name: "x", label: "X", required: !0, selector: { number: { mode: "box" } } },
      { name: "y", label: "Y", required: !0, selector: { number: { mode: "box" } } },
      Yt(),
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
      dotSize: e.dotSize ?? nr
    },
    toPatch: Je
  };
}
function Dg(e, t = []) {
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
    toPatch: Je
  };
}
function zg(e) {
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
                max: Pa,
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
          selector: B(
            x("fill", "Fill"),
            x("border", "Border only"),
            x("both", "Fill and border")
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
      labelSize: e.labelSize ?? ir,
      opacity: e.opacity ?? gn,
      entity: e.entity ?? "",
      activeOpacity: e.activeOpacity ?? e.opacity ?? gn,
      highlight: e.highlight ?? "fill",
      // "Fit" is the absence of a number, so it gets its own boolean; the
      // slider only appears once that is off, and then always shows a real
      // stored value.
      fitZoom: e.zoom === void 0,
      zoom: e.zoom ?? yn,
      tap_action: e.tap_action,
      hold_action: e.hold_action,
      double_tap_action: e.double_tap_action
    },
    toPatch: (t) => {
      let i = t;
      if ("highlight" in i && i.highlight === "fill" && (i = { ...i, highlight: void 0 }), "fitZoom" in i) {
        const { fitZoom: n, ...r } = i;
        i = { ...r, zoom: n ? void 0 : yn };
      }
      return i;
    }
  };
}
function Hg(e) {
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
          number: { min: 2, max: Aa, step: 1, mode: "slider", unit_of_measurement: "px" }
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
function Bg(e) {
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
    data: { title: e.title ?? "", width: e.width, height: e.height, grid: e.grid ?? rr },
    toPatch: Je
  };
}
function Ug(e) {
  return {
    fields: [
      {
        name: "pressEffect",
        label: "Press effect",
        helper: "Feedback when a device is pressed. Only devices that do something respond",
        selector: B(
          x("scale", "Press in"),
          x("ripple", "Ink ripple"),
          x("flash", "Flash"),
          x("none", "None")
        )
      }
    ],
    data: { pressEffect: ei(e) },
    // The default stays out of the YAML, as the skin's does.
    toPatch: (t) => "pressEffect" in t && t.pressEffect === La ? { ...t, pressEffect: void 0 } : t
  };
}
function jg(e) {
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
function Wg(e) {
  const t = Jn(e.skin) ?? hi[0];
  return {
    fields: [
      {
        name: "skin",
        label: "Skin",
        helper: t.description,
        selector: B(...hi.map((i) => x(i.id, i.label)))
      }
    ],
    // An id we don't ship reads back as Default, matching what it renders as.
    data: { skin: t.id },
    toPatch: (i) => (
      // Default is the absence of a skin, so it stays out of the YAML.
      "skin" in i && i.skin === Pi ? { ...i, skin: void 0 } : i
    )
  };
}
function Kg(e) {
  return {
    fields: [
      {
        name: "rotation",
        label: "Rotate display",
        helper: "Rotates the live card only — editing stays as drawn",
        selector: B(x("0", "0°"), x("90", "90°"), x("180", "180°"), x("270", "270°"))
      },
      // Per-orientation overrides (issue #237). Two dropdowns with a "same as
      // above" default rather than a switch plus two angles: the switch would
      // be a third control whose only job is to say whether the other two
      // count, and "same as above" says that per orientation and for free.
      {
        name: "rotationPortrait",
        label: "…on a portrait screen",
        helper: "Overrides the angle above while the screen is taller than it is wide",
        selector: B(
          x("", "Same as above"),
          x("0", "0°"),
          x("90", "90°"),
          x("180", "180°"),
          x("270", "270°")
        )
      },
      {
        name: "rotationLandscape",
        label: "…on a landscape screen",
        helper: "Overrides the angle above while the screen is wider than it is tall",
        selector: B(
          x("", "Same as above"),
          x("0", "0°"),
          x("90", "90°"),
          x("180", "180°"),
          x("270", "270°")
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
        selector: B(x("plan", "Canvas units"), x("fixed", "Fixed pixels"))
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
        selector: B(
          x("dim", "Dimmed"),
          x("strike", "Dimmed and crossed out"),
          x("none", "No different")
        )
      }
    ],
    data: {
      rotation: String(Dt(e.rotation)),
      // "" is "same as above" — the absence of an override, not an angle.
      // `== null` for the same reason resolvePlanRotation uses it: a key
      // written with no value (`rotationPortrait:`) parses to `null`, and
      // reading that as an angle would show 0° here — then write it into the
      // YAML as a real override the moment this panel is saved, turning a
      // stray empty key into an instruction the plan never had.
      rotationPortrait: e.rotationPortrait == null ? "" : String(Dt(e.rotationPortrait)),
      rotationLandscape: e.rotationLandscape == null ? "" : String(Dt(e.rotationLandscape)),
      overlayScale: fr(e.overlayScale),
      compactHeader: e.compactHeader ?? !1,
      zoomedOverlayScale: e.zoomedOverlayScale ?? bn,
      offlineStyle: ss(e)
    },
    toPatch: (t) => {
      let i = t;
      "rotation" in i && (i = { ...i, rotation: i.rotation === "0" ? void 0 : Number(i.rotation) });
      for (const n of ["rotationPortrait", "rotationLandscape"])
        n in i && (i = { ...i, [n]: i[n] === "" ? void 0 : Number(i[n]) });
      return "compactHeader" in i && !i.compactHeader && (i = { ...i, compactHeader: void 0 }), "offlineStyle" in i && i.offlineStyle === Ma && (i = { ...i, offlineStyle: void 0 }), "zoomedOverlayScale" in i && i.zoomedOverlayScale === bn && (i = { ...i, zoomedOverlayScale: void 0 }), i;
    }
  };
}
function qg(e) {
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
function Gg(e) {
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
      sunBrightnessMin: e.sunBrightnessMin ?? tr,
      sunBrightnessMax: e.sunBrightnessMax ?? pi
    },
    // Off is the default, so keep the whole feature out of the YAML until it
    // is switched on — including the two sliders it drags along with it.
    toPatch: (i) => "sunDimming" in i && !i.sunDimming ? { ...i, sunDimming: void 0, sunBrightnessMin: void 0, sunBrightnessMax: void 0 } : i
  };
}
function Vg(e) {
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
      sunReach: e.sunReach ?? wi,
      sunFollows: typeof e.sunBearing != "number",
      sunBearing: e.sunBearing ?? Sn
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
      } : ("sunFollows" in n && (n.sunBearing = n.sunFollows ? void 0 : e.sunBearing ?? Sn, delete n.sunFollows), "north" in n && !n.north && (n.north = void 0), "sunReach" in n && n.sunReach === wi && (n.sunReach = void 0), "sunShade" in n && n.sunShade && (n.sunShade = void 0), n);
    }
  };
}
function Yg(e) {
  const t = [
    { name: "image", label: "Bg image", helper: "/local/floorplan.png or URL", selector: { text: {} } }
  ];
  return e.image && (t.push({
    name: "imageFit",
    label: "Image fit",
    helper: "Per floor, so scans of different resolutions can each fit properly",
    selector: B(
      x("stretch", "Stretch to canvas (may distort)"),
      x("contain", "Fit inside (keep proportions)"),
      x("cover", "Fill canvas (keep proportions, crop)")
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
var Zg = Object.defineProperty, Xg = Object.getOwnPropertyDescriptor, P = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Xg(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (r = (n ? a(t, i, r) : a(r)) || r);
  return n && r && Zg(t, i, r), r;
};
const Qg = (e) => e.label, Jg = (e) => e.helper, ln = {
  select: { icon: "mdi:cursor-default", label: "Select" },
  wall: { icon: "mdi:wall", label: "Wall" },
  door: { icon: "mdi:door", label: "Door" },
  window: { icon: "mdi:window-closed-variant", label: "Window" },
  tracker: { icon: "mdi:crosshairs-gps", label: "Tracker" },
  area: { icon: "mdi:vector-polygon", label: "Area" }
}, ey = {
  wall: "mdi:wall",
  opening: "mdi:door",
  item: "mdi:lightbulb-outline",
  text: "mdi:format-text",
  furniture: "mdi:sofa-outline",
  tracker: "mdi:crosshairs-gps",
  area: "mdi:floor-plan"
}, Yo = 35, Zo = 12, ty = 8, iy = 2e3, ny = 10;
function Xo(e) {
  return e.some((t) => {
    const i = t, n = i.tagName?.toLowerCase();
    return n === "input" || n === "textarea" || n === "select" || n === "ha-form" || n === "ha-entity-picker" || n === "ha-icon-picker" || i.isContentEditable === !0;
  });
}
let L = class extends ce {
  constructor() {
    super(...arguments), this._wallMaskId = `fp-edit-wall-mask-${L._nextWallMaskId++}`, this.panelMode = !1, this.panelError = "", this._watchedEntities = /* @__PURE__ */ new Set(), this._tool = "select", this._selection = [], this._draft = null, this._draftTracker = null, this._areaShape = "polygon", this._draftArea = null, this._areaHover = null, this._freeWalls = !1, this._defaultOpeningLength = 60, this._marquee = null, this._history = [], this._future = [], this._zoom = 1, this._floorMenuOpen = !1, this._addMenuOpen = !1, this._addQuery = "", this._symbolDraft = "", this._symbolError = "", this._paletteError = "", this._projectOpen = !1, this._openGroups = /* @__PURE__ */ new Set(), this._fullscreen = !1, this._applyState = "idle", this._applyError = "", this._applyResetTimer = null, this._drag = null, this._dragMoves = new ag(og, (e) => {
      this._drag && this._applyDrag(e);
    }), this._dragDirty = !1, this._pickAnchor = null, this._hideLabels = !1, this._pinchPts = /* @__PURE__ */ new Map(), this._pinch = null, this._gesturePointer = null, this._marqueeAdd = !1, this._clipboard = null, this._onKeyDown = (e) => this._handleKeyDown(e), this._onHostKeyDown = (e) => {
      e.key !== "Escape" || !this._fullscreen || Xo(e.composedPath()) && (e.preventDefault(), e.stopPropagation(), this._canvasWrap?.focus({ preventScroll: !0 }));
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
      const e = await dg(this);
      if (!e.ok) {
        this._applyState = "idle", this._applyError = e.error;
        return;
      }
      this._applyState = "saved", this._applyResetTimer = setTimeout(() => {
        this._applyResetTimer = null, this._applyState = "idle";
      }, iy);
    }, this._addSymbol = () => {
      let e;
      try {
        e = JSON.parse(this._symbolDraft);
      } catch (n) {
        this._symbolError = `Not valid JSON — ${n.message}`;
        return;
      }
      const t = [], i = Bi(e, void 0, t);
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
    const t = { ...Rc(e.type || "custom:easy-floorplan-card"), ...e }, i = Ve(t).map((n) => structuredClone(n));
    this._config = {
      ...t,
      floors: i,
      walls: [],
      openings: [],
      items: [],
      texts: [],
      furniture: [],
      trackers: []
    }, (!this._activeFloorId || !i.some((n) => n.id === this._activeFloorId)) && (this._activeFloorId = t.defaultFloor && i.some((n) => n.id === t.defaultFloor) ? t.defaultFloor : i[0].id), this._lastEmitted && e !== this._lastEmitted && !vn(e, this._lastEmitted) && (this._history = [], this._future = [], this._liveEditKey = null), this._watchedEntities = Ot(this._config);
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
    return i(t) !== i(this.hass) ? !0 : Ua(t, this.hass, this._watchedEntities);
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
    return wn(this._config.symbols);
  }
  /** Discrete change to the active floor's elements (snapshots for undo). */
  _commitFloor(e) {
    this._commit({ ...this._config, floors: this._patchFloors(e) });
  }
  /** Live change to the active floor's elements (no history snapshot — for dragging). */
  _emitFloor(e) {
    const t = { ...this._config, floors: this._patchFloors(e) };
    if (this._drag) {
      this._config = t, this._watchedEntities = Ot(t), this._dragDirty = !0;
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
    return this._config.grid ?? rr;
  }
  /**
   * Resolved placement snap step. `snap` is tri-state in the config: unset
   * means "follow the grid" (the default behaviour), `0` is free placement,
   * any other number is a custom step. See {@link resolveSnap}.
   */
  get _resolvedSnap() {
    return Lc(this._config.snap, this.grid);
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
        snap: t && t > 0 ? t : rn(po, this.grid)
      });
    }
  }
  /** Grid update plus a custom-snap rescale so its percentage of the grid is preserved. */
  _gridPatch(e) {
    const t = { grid: e };
    if (this._snapMode === "custom") {
      const i = uo(this._config.snap, this.grid);
      t.snap = rn(i, e);
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
    let l = Zo, c = Zo;
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
    return Ds(this._floor().walls, e, t, at);
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
    return Ym(this._floor(), e, t, at, i) ?? this._alignedSnap(e, t, (n) => {
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
    let n = null, r = at;
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
    const r = Xm(
      this._floor().walls,
      e,
      t,
      i,
      n,
      (s) => this._snap(s),
      this._freeWalls,
      ny,
      at
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
    this._drag && (this._drag.emitted = !0), this._config = e, this._watchedEntities = Ot(e);
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
    if (Xo(i)) return;
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
    if (!ng(i, this._selection).length) return;
    const n = (d) => {
      const p = this._idsOfKind(d);
      for (const g of p) Tt(i, { kind: d, id: g }) && p.delete(g);
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
    const t = this._selection.length > 0, i = this._floor(), n = t && this._selection.every((o) => Tt(i, o)), r = (o, a, s, l = !1) => u`<button
      class=${l ? "danger" : ""}
      @click=${() => {
      this._ctx = null, s();
    }}
    ><ha-icon icon=${o}></ha-icon>${a}</button>`;
    return u`<div class="fp-ctx" style="left:${e.x}px;top:${e.y}px" @pointerdown=${(o) => o.stopPropagation()}>
      ${t ? u`${r("mdi:content-duplicate", "Duplizieren", () => this._duplicate())}
            ${r("mdi:content-copy", "Kopieren", () => this._copy())}
            ${r("mdi:content-save-outline", "Als Vorlage speichern", () => this._saveTemplate())}
            ${r(n ? "mdi:lock-open-variant-outline" : "mdi:lock", n ? "Entsperren" : "Fixieren", () => this._setLocked(!n))}` : m}
      ${this._clipboard ? r("mdi:content-paste", "Einfügen", () => this._paste()) : m}
      ${t ? r("mdi:delete-outline", "Löschen", () => this._deleteSelected(), !0) : m}
      ${!t && !this._clipboard ? u`<span class="fp-ctx-empty">Nichts ausgewählt</span>` : m}
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
      if (n.length >= 3 && Math.hypot(i.x - r.x, i.y - r.y) <= at) {
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
    this._drag = null, e?.moved && e.snapshot && (this._history = this._history.filter((t) => t !== e.snapshot), e.emitted ? this._emit(e.snapshot) : (this._config = e.snapshot, this._watchedEntities = Ot(e.snapshot)), this._future = e.priorFuture ?? []);
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
          const i = { id: Z("wall"), ...t };
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
    return Qm(this._floor(), e);
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
    const i = this._toVirtual(e, !1), n = ig(this._floor(), i.x, i.y, {
      itemSize: Ge,
      textSize: Ft,
      wallThickness: V,
      hass: this.hass
    }), r = !!this._pickAnchor && Math.hypot(e.clientX - this._pickAnchor.clientX, e.clientY - this._pickAnchor.clientY) <= ty;
    return this._pickAnchor = { clientX: e.clientX, clientY: e.clientY }, rg(n, this._selection, r) ?? t;
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
    r ? this._selectOne(o) : this._selectForPointer(e, o), !Tt(this._floor(), o) && (this._drag = {
      primary: o,
      start: this._toVirtual(e, !1),
      orig: this._snapshotSelection(),
      endpoint: i,
      areaVertex: n
    }, o.kind === "wall" && (this._drag.attached = this._attachedCorners(o.id, i)), this._gesturePointer = e.pointerId, this._capturePointer(e));
  }
  /** See {@link attachedCorners}: shared room corners that stretch with this wall. */
  _attachedCorners(e, t) {
    return Vm(this._floor().walls, e, t);
  }
  /** Capture the start positions of every selected element on the active floor. */
  _snapshotSelection() {
    const e = this._floor(), t = /* @__PURE__ */ new Map();
    for (const i of this._selection)
      if (!Tt(e, i))
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
        const h = c.x + (e.x - t.start.x), d = c.y + (e.y - t.start.y), p = Mo(h, d, i.walls, Yo), g = i.openings.map(
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
    return Jm(this._floor(), e, t, i);
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
    const n = this._floor(), r = Mo(t, i, n.walls, Yo), o = {
      id: Z(e),
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
      id: Z("item"),
      entity: "",
      x: this._snap(this._config.width / 2),
      y: this._snap(this._config.height / 2),
      kind: e,
      showState: e === "sensor",
      showIcon: !0,
      size: Ge
    };
    this._commitFloor({ items: [...this._floor().items, t] }), this._selection = [{ kind: "item", id: t.id }], this._tool = "select";
  }
  _addFurniture(e) {
    const t = Du(e, this._symbols()), i = {
      id: Z("furn"),
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
      id: Z("tracker"),
      x: e,
      y: t,
      w: i,
      h: n,
      angle: 0,
      dotSize: nr
    };
    this._commitFloor({ trackers: [...this._floor().trackers ?? [], r] }), this._selection = [{ kind: "tracker", id: r.id }], this._tool = "select";
  }
  /** floorplan-panel: a rectangular room from a dragged box. */
  _addRectArea(e, t, i, n) {
    const r = {
      id: Z("area"),
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
    const e = { id: Z("area"), points: this._draftArea.points, showName: !0 };
    this._commitFloor({ areas: [...this._floor().areas ?? [], e] }), this._selection = [{ kind: "area", id: e.id }], this._draftArea = null, this._areaHover = null, this._tool = "select";
  }
  _addText() {
    const e = {
      id: Z("text"),
      x: this._snap(this._config.width / 2),
      y: this._snap(this._config.height / 2),
      text: "Label",
      size: Ft
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
      id: Z("wall"),
      x1: d.x1 + t,
      y1: d.y1 + t,
      x2: d.x2 + t,
      y2: d.y2 + t
    })), o = e.openings.map((d) => ({
      ...d,
      ...n,
      id: Z(d.type),
      x: d.x + t,
      y: d.y + t
    })), a = e.items.map((d) => ({
      ...d,
      ...n,
      id: Z("item"),
      x: d.x + t,
      y: d.y + t
    })), s = e.texts.map((d) => ({
      ...d,
      ...n,
      id: Z("text"),
      x: d.x + t,
      y: d.y + t
    })), l = e.furniture.map((d) => ({
      ...d,
      ...n,
      id: Z("furn"),
      x: d.x + t,
      y: d.y + t
    })), c = (e.trackers ?? []).map((d) => ({
      ...d,
      ...n,
      id: Z("tracker"),
      x: d.x + t,
      y: d.y + t
    })), h = (e.areas ?? []).map((d) => ({
      ...d,
      ...n,
      id: Z("area"),
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
      templates: [...t, { id: Z("tpl"), name: i, data: structuredClone(e) }]
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
    const e = this._floor().walls.map((r) => ({ ...r, id: Z("wall") })), t = (this._config.floors?.length ?? 1) + 1, i = zc(`Floor ${t}`, e), n = [...this._config.floors ?? [], i];
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
    const t = Uc(this._config.floors ?? [], this._activeFloorId, e);
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
    const t = fo(this.hass).find((i) => i.floor_id === e);
    this._commit({
      ...this._config,
      floors: (this._config.floors ?? []).map(
        (i) => i.id === this._activeFloorId ? { ...i, haFloor: t?.floor_id, ...t ? { name: t.name } : {} } : i
      )
    });
  }
  /** HA-floor link row for the floor gear popover; hidden when HA exposes no floors. */
  _renderHaFloorRow(e) {
    const t = fo(this.hass);
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
    ` : u`${m}`;
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
    return qt(this._config?.palette);
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
    const n = Ns(e), r = n && i.some((o) => ne(o.name) === n) ? n : void 0;
    return u`
      <select
        class="palette-pick"
        title="Use one of the plan's named colours"
        .value=${r ?? ""}
        @change=${(o) => {
      const a = o.target.value;
      if (!a) {
        r && t(oi(e, i));
        return;
      }
      const s = i.find((l) => ne(l.name) === a);
      s && t(No(s.name));
    }}
      >
        <option value="" ?selected=${!r}>Custom…</option>
        ${i.map(
      (o) => u`<option
            value=${ne(o.name)}
            ?selected=${ne(o.name) === r}
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
    const i = oi(e, this._config?.palette);
    return typeof i == "string" && i ? i : t;
  }
  _renderColorRow(e) {
    return u`
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
    return xn(
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
      ${e.stateColor?.length ? u`<p class="hint rule-note">Shown while no rule below names an icon of its own.</p>` : m}
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
    const t = ze(e), i = (r) => this._updateItem(e.id, {
      readings: r.length ? r : void 0,
      secondaryEntity: void 0,
      secondaryAttribute: void 0,
      // `badgeEntity: "secondary"` meant index 0, which is where the legacy
      // pair still is — restate it as the index so the old spelling does not
      // outlive the keys it referred to.
      ...e.badgeEntity === "secondary" ? { badgeEntity: 0 } : {}
    }), n = (r, o) => i(t.map((a, s) => s === r ? { ...a, ...o } : a));
    return u`
      <div class="row wide">
        <label title="Further entities and attributes whose readings join this device's label line"
          >Other entities</label
        >
      </div>
      ${t.map(
      (r, o) => u`
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
      ${t.length ? u`<p class="hint rule-note">
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
    return u`
      <div class="row wide state-colors">
        <label
          title=${i?.icons ? "Color the badge — and optionally swap its icon — by what the entity reads" : "Color the element by what its entity reads"}
          >${i?.icons ? "Color & icon by state" : "Color by state"}</label
        >
      </div>
      ${n.map((o, a) => {
      const s = typeof o.state == "string" ? "state" : typeof o.above == "number" ? "above" : "else";
      return u`
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
            ${s === "above" ? u`<input
                  type="number"
                  class="cond"
                  .value=${String(o.above ?? 0)}
                  @change=${(l) => r(a, { above: Number(l.target.value) || 0 })}
                />` : s === "state" ? u`<input
                    type="text"
                    class="cond"
                    placeholder="on"
                    .value=${o.state ?? ""}
                    @change=${(l) => r(a, { state: l.target.value })}
                  />` : u`<span class="cond hint">any other value</span>`}
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
    const n = Ho(t, i.x, i.y);
    if (no(n))
      return on(this.hass, n.haArea).length ? n.id : void 0;
  }
  _areaEntitiesAt(e, t) {
    const i = Ho(this._floor(), e, t);
    return no(i) ? { entities: on(this.hass, i.haArea), name: i.name } : void 0;
  }
  /** Every entity in `area`'s linked HA area not already placed as an item on this floor. */
  _pendingAreaEntities(e) {
    if (!e.haArea) return [];
    const t = new Set(this._floor().items.map((i) => i.entity));
    return on(this.hass, e.haArea).filter((i) => !t.has(i));
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
    const i = Zm(e.points, t.length), n = t.map((r, o) => {
      const a = To(r);
      return {
        id: Z("item"),
        entity: r,
        x: Math.round(i[o].x),
        y: Math.round(i[o].y),
        kind: a,
        showState: a === "sensor",
        showIcon: !0,
        size: Ge
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
        const n = Sg(i.type, this._symbols());
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
    const e = this._snapMode, t = uo(this._config.snap, this.grid), i = [
      { id: "grid", label: "On" },
      { id: "off", label: "Off" },
      { id: "custom", label: "Custom" }
    ], n = e === "grid" ? `Snapping to the ${this.grid}-unit grid.` : e === "off" ? "No snapping — free placement." : `Snap = ${t}% of grid (${this._resolvedSnap} units).`;
    return u`
      <span class="ctx-field-label">Snap</span>
      <div class="seg" role="group" aria-label="Snap mode">
        ${i.map(
      (r) => u`
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
      ${e === "custom" ? u`<input
              class="num"
              type="number"
              min="1"
              step="5"
              .value=${String(t)}
              title="Custom snap step, as a percentage of the grid"
              @change=${(r) => {
      const o = Math.max(
        1,
        Number(r.target.value) || po
      );
      this._patchConfig({ snap: rn(o, this.grid) });
    }}
            /><span class="ctx-field-label">%</span>` : m}
      <span class="ctx-hint">${n}</span>
    `;
  }
  render() {
    if (!this._config) return u`${m}`;
    const e = this._config, t = this._floor(), i = e.floors ?? [], n = fr(e.overlayScale), r = this._scopingAreaId(), o = e.showDeadSpaces ? Ha(t.walls, t.openings) : [], a = t.items.some((l) => l.glow) ? hr(t.walls, t.openings, (l) => {
      const c = (h) => Ye(l, h ? this.hass?.states[h] : void 0);
      return qa(
        l,
        c(l.entity),
        l.secondaryEntity && yi(l) ? Ye(
          br(l),
          this.hass?.states[l.secondaryEntity]
        ) : void 0,
        l.shutterEntity ? Ne(this.hass?.states[l.shutterEntity], l.shutterInvert) : void 0,
        Te(l) > 2 && l.extraEntities ? l.extraEntities.map((h) => c(h || l.entity)) : void 0
      );
    }) : t.walls, s = !t.walls.length && !t.openings.length && !t.items.length && !t.texts.length && !t.furniture.length && !(t.trackers ?? []).length && !(t.areas ?? []).length;
    return u`
      <div
        class="editor ${this._fullscreen ? "fullscreen" : ""}"
        popover=${this._fullscreen ? "manual" : m}
        @pointerdown=${this._onEditorPointerDown}
      >
        ${this._floorMenuOpen || this._addMenuOpen ? u`<div
              class="pop-backdrop"
              @click=${() => {
      this._floorMenuOpen = !1, this._addMenuOpen = !1, this._addQuery = "";
    }}
            ></div>` : m}
        <div class="toolbar">
          <!-- Tools — modes; exactly one is active at a time -->
          <div class="seg" role="group" aria-label="Tool">
            ${["select", "wall", "door", "window", "tracker", "area"].map(
      (l) => u`
                <button
                  class=${this._tool === l ? "active" : ""}
                  aria-pressed=${this._tool === l}
                  title=${ln[l].label}
                  @click=${() => {
        this._tool = l, this._draft = null, this._draftTracker = null, this._draftArea = null, this._areaHover = null;
      }}
                >
                  <ha-icon icon=${ln[l].icon}></ha-icon>${ln[l].label}
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
              </button>${this.panelError ? u`<span class="apply-error">${this.panelError}</span>` : m}` : u`<button
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
          ${this._applyError ? u`<span class="apply-error">${this._applyError}</span>` : m}

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
          style=${this._fullscreen ? m : `aspect-ratio:${z(e.width, st)} / ${z(e.height, jt)};`}
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
               style="aspect-ratio: ${z(e.width, st)} / ${z(
      e.height,
      jt
    )}; width:${this._zoom * 100}%;
                   --fp-plan-w: ${z(e.width, st)};${gc(
      e.skin
    )}${Ps(e.palette)}">
            <!-- Keyed on the skin and the palette, for the repaint reason
                 documented on the card's SVG (issue #122): a var() inside a
                 presentation attribute does not repaint when the custom
                 property changes, so without this the canvas kept the previous
                 skin's doors and room fills — and, since issue #265, would show
                 a palette colour's old value while you were editing it. -->
            ${Sa(
      `${e.skin ?? ""}|${Fs(e.palette)}`,
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
                fill=${e.background ?? Fi}
              />
              ${t.image ? _`<image href=${t.image} x="0" y="0" width=${e.width} height=${e.height}
                            preserveAspectRatio=${ks(t.imageFit)}
                            opacity=${t.imageOpacity ?? 1} />` : m}
              ${this._renderGrid()}
              ${Se(
        t.areas ?? [],
        (l, c) => l.id || c,
        (l) => this._renderAreaSel(l, r)
      )}
              <!-- Dead spaces (issue #88), same layer position as the card so
                   what you draw is what you get. Live while you draw: closing
                   the last wall of a shaft hatches it, and dropping a door into
                   it clears the hatching again — which is the fastest way to
                   see that the card agrees with you about what is sealed. -->
              ${o.length ? _`${Es(`${this._wallMaskId}-dead`)}
                      ${o.map(
        (l) => As(l, `${this._wallMaskId}-dead`)
      )}` : m}
              <!-- Light pools (issue #6), same layer position as the card so
                   what you place is what you get. Previewed at full strength
                   with no hass in the editor, so the radius is adjustable
                   without having to turn the real light on. -->
              ${Ya(
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
        const h = rf(l, this.hass?.states[l.entity]);
        return h ? Va(l, h, `${this._wallMaskId}-glow-${c}`, a) : m;
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
                                  r=${z(l.glowRadius, Ni)} />` : m
      )}
              ${t.furniture.map((l) => this._renderFurnitureSel(l))}
              ${Ss(t.openings, e.width, e.height, this._wallMaskId)}
              ${t.walls.map((l) => this._renderWall(l))}
              <!-- Room outlines, same layer position as the card so what you
                   place is what you get. Only a static borderColor draws here,
                   there being no hass to resolve a live color from — but the
                   clip ids are passed anyway, so wiring a live preview in later
                   cannot silently land on the unclipped path. -->
              <g mask=${`url(#${this._wallMaskId})`}>
                ${(t.areas ?? []).map(
        (l, c) => Cs(l, void 0, `${this._wallMaskId}-area-${c}`)
      )}
              </g>
              ${Se(
        // Keyed by id: switching floors must create fresh DOM. Reused
        // nodes would CSS-transition from the previous floor's opening
        // state — a window briefly plays a door swing (issue #50).
        t.openings,
        (l, c) => l.id || c,
        (l) => this._renderOpeningSel(l)
      )}
              ${Se(
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
                              stroke-width=${V} /></g>` : m}
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
              ${t.openings.filter((l) => fs(l)).map((l) => this._renderShutterMarkOverlay(l, e, n))}
              ${t.openings.filter((l) => ys(l)).map((l) => this._renderOpeningMarkOverlay(l, e, n))}
              ${t.items.map((l) => this._renderItemOverlay(l, e, n))}
            </div>
          </div>
        </div>
        ${s && !this._draft && !this._draftTracker && !this._draftArea ? u`<div class="empty-hint">
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
    return customElements.get("ha-form") ? u`<ha-form
        .hass=${this.hass}
        .data=${e.data}
        .schema=${e.fields}
        .computeLabel=${Qg}
        .computeHelper=${Jg}
        @value-changed=${(i) => {
      i.stopPropagation();
      const n = kg(e.data, i.detail.value, e.fields), r = Vo(n, e.fields), o = Object.keys(r);
      if (!o.length) return;
      const a = o.length === 1 && Go(e.fields.find((s) => s.name === o[0]));
      t(e.toPatch(r), a);
    }}
      ></ha-form>` : u`${e.fields.map((i) => this._renderFallbackField(e, i, t))}`;
  }
  _applyFallback(e, t, i, n, r) {
    const o = Vo({ [t.name]: i }, e.fields);
    t.name in o && r(e.toPatch(o), n && Go(t));
  }
  /** One plain-input row per schema field — the outside-HA / load-failure path. */
  _renderFallbackField(e, t, i) {
    const n = e.data[t.name], r = t.selector;
    if ("select" in r) {
      const o = r.select, a = o.options;
      if (o.custom_value) {
        const s = `sel-${t.name}-${a.length}`;
        return u`<div class="row wide">
          <label>${t.label}</label>
          <input
            type="text"
            list=${s}
            .value=${String(n ?? "")}
            @change=${(l) => this._applyFallback(e, t, l.target.value, !1, i)}
          />
          <datalist id=${s}>
            ${a.map((l) => u`<option value=${l.value}></option>`)}
          </datalist>
        </div>`;
      }
      return u`<div class="row">
        <label>${t.label}</label>
        <select
          .value=${String(n ?? "")}
          @change=${(s) => this._applyFallback(e, t, s.target.value, !1, i)}
        >
          ${a.map(
        (s) => u`<option value=${s.value} ?selected=${s.value === n}>${s.label}</option>`
      )}
        </select>
      </div>`;
    }
    if ("boolean" in r)
      return u`<div class="row">
        <label>${t.label}</label>
        <input
          type="checkbox"
          .checked=${!!n}
          @change=${(o) => this._applyFallback(e, t, o.target.checked, !1, i)}
        />
      </div>`;
    if ("number" in r) {
      const o = r.number, a = o.mode === "slider";
      return u`<div class="row">
        <label>${t.label}</label>
        ${a ? u`<input
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
      return u`<div class="row wide">
        <label>${t.label}</label>
        ${this._renderEntityPicker(
        String(n ?? ""),
        (a) => this._applyFallback(e, t, a, !1, i),
        o.filter?.[0]?.domain,
        o.include_entities
      )}
      </div>`;
    }
    return "icon" in r ? u`<div class="row wide">
        <label>${t.label}</label>
        <input
          type="text"
          placeholder=${r.icon.placeholder ?? "mdi:…"}
          .value=${String(n ?? "")}
          @change=${(o) => this._applyFallback(e, t, o.target.value, !1, i)}
        />
      </div>` : "ui_action" in r ? u`${m}` : u`<div class="row">
      <label>${t.label}</label>
      <input
        type="text"
        .value=${String(n ?? "")}
        @input=${(o) => this._applyFallback(e, t, o.target.value, !0, i)}
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
        @value-changed=${(r) => t(r.detail.value ?? "")}
      ></ha-entity-picker>` : u`<input
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
    return customElements.get("ha-entity-attribute-picker") && e ? u`<ha-entity-attribute-picker
        class="reading-attr"
        .hass=${this.hass}
        .entityId=${e}
        .value=${t}
        allow-custom-value
        title=${n ?? m}
        @value-changed=${(r) => i(r.detail.value ?? "")}
      ></ha-entity-attribute-picker>` : u`<input
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
    return customElements.get("ha-icon-picker") ? u`<ha-icon-picker
        class="rule-icon"
        .hass=${this.hass}
        .value=${e}
        placeholder=${i?.placeholder ?? "Icon"}
        title=${i?.title ?? m}
        @value-changed=${(n) => t(n.detail.value ?? "")}
      ></ha-icon-picker>` : u`<input
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
    }, t = this._symbols(), i = Hs(t).filter((o) => Ru(o, this._addQuery)), n = !this._addQuery.trim();
    let r = "";
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
      return r = o.category, u`${a ? u`<div class="furn-group">${a}</div>` : m}
                  ${this._renderFurnCell(o, e)}`;
    }) : u`<div class="furn-empty">No symbol matches “${this._addQuery}”</div>`}
        </div>
      </div>
    `;
  }
  /** One picker cell: the symbol drawn at its own default size, plus its name. */
  _renderFurnCell(e, t) {
    const { w: i, h: n } = e.size, r = Math.max(i, n) * 0.25 + 6, o = `${-i / 2 - r} ${-n / 2 - r} ${i + r * 2} ${n + r * 2}`;
    return u`
      <button
        class="furn-cell"
        title=${e.name}
        @click=${() => {
      this._addFurniture(e.id), t();
    }}
      >
        <svg viewBox=${o}>
          ${Cn(
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
    const i = e > 1 ? `${e} elements selected` : this._selectionSummary(t), n = e > 1 ? "mdi:select-group" : ey[t.kind];
    return u`
      <section class="edit-area">
        <div class="edit-head">
          <ha-icon icon=${n}></ha-icon>
          <span class="edit-title" title=${i}>${i}</span>
          <span class="head-spacer"></span>
          ${(() => {
      const r = this._floor(), o = this._selection.every((a) => Tt(r, a));
      return u`<button
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
              style=${ts(e.thickness)} stroke-linecap="round" /></g>
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
        ${ws(e, {
      color: t ? "var(--primary-color, #03a9f4)" : Qn,
      // The closed colour previews here too (issue #228) — unless this is
      // the selected opening, whose whole symbol goes blue to show that.
      inactive: t ? void 0 : e.inactiveColor,
      open: yr(e),
      // Draw sliding / rolling openings partly open in the editor so the
      // motion is visible — closed, both look like a plain band, which
      // would make the Motion / Slide / Style controls appear inert.
      amount: X(e) !== "swing" ? 0.55 : void 0,
      // Shutter previewed half-rolled so the layer is visible while
      // configuring, whatever the live state.
      shutter: e.shutterEntity ? { amount: 0.55, style: lt(e), flip: e.shutterFlipV } : void 0
    })}
      </g>`;
  }
  /**
   * Render a Tracker in the editor SVG with its zone outline visible (so the
   * user can grab/resize it) plus a hit overlay for drag-to-move and a dashed
   * selection rectangle when active.
   */
  _renderTrackerSel(e) {
    const t = this._isSel("tracker", e.id), i = $i(this.hass?.states, e.xSensor?.entity), n = $i(this.hass?.states, e.ySensor?.entity), r = mi(this.hass?.states, e.xSensor?.presence), o = mi(this.hass?.states, e.ySensor?.presence);
    return _`
      <g class="tracker-hit ${t ? "selected" : ""}"
         @pointerdown=${(a) => this._startDrag(a, { kind: "tracker", id: e.id })}>
        ${Is(e, {
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
        ${Cn(e, void 0, this._symbols())}
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
    const i = this._isSel("area", e.id), n = e.id === t, r = e.points.map((o) => `${o.x},${o.y}`).join(" ");
    return _`
      <g class="area-hit ${i ? "selected" : ""} ${n ? "scoping" : ""}">
        ${n ? _`<polygon points=${r} class="area-scoping" />` : m}
        ${Ts(e)}
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
    const n = e.shutterEntity, r = this.hass?.states[n], o = Ne(r, e.shutterInvert) > 0, a = gs(e, r, o, this.hass?.entities?.[n]?.icon), s = U(e.shutterActiveColor ?? e.activeColor) ?? W, l = wr(e), c = _r(e), h = j(vi, i), d = j(bi, i);
    return u`<div
      class="shutter-mark ${ii(r, e.shutterInvert) ? "on" : "off"}"
      style="left:${l.x / t.width * 100}%; top:${l.y / t.height * 100}%;
             width:${h};height:${h};
             transform:translate(-50%,-50%)
                       translate(calc(${c.x} * ${d}), calc(${c.y} * ${d}));
             --fp-active:${s};"
      title=${`${r?.attributes?.friendly_name ?? n} — shown on the card, tap it there to open the shutter`}
    >
      <ha-icon icon=${a} style="--mdc-icon-size:${j(
      _i,
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
    const n = e.entity, r = this.hass?.states[n], o = Ye(e, r) > 0, a = bs(e, r, o, this.hass?.entities?.[n]?.icon), s = U(e.activeColor) ?? W, l = vs(e), c = _s(e), h = j(vi, i), d = j(bi, i);
    return u`<div
      class="shutter-mark ${ri(e, r) ? "on" : "off"}"
      style="left:${l.x / t.width * 100}%; top:${l.y / t.height * 100}%;
             width:${h};height:${h};
             transform:translate(-50%,-50%)
                       translate(calc(${c.x} * ${d}), calc(${c.y} * ${d}));
             --fp-active:${s};"
      title=${`${r?.attributes?.friendly_name ?? n} — shown on the card, tap it there to open its dialog`}
    >
      <ha-icon icon=${a} style="--mdc-icon-size:${j(
      _i,
      i
    )};"></ha-icon>
    </div>`;
  }
  _renderItemOverlay(e, t, i) {
    const n = this._isSel("item", e.id), r = e.entity ? this.hass?.states[e.entity] : void 0, o = xn(e, r, e.entity ? this.hass?.entities?.[e.entity]?.icon : void 0), { text: a, live: s } = hf(this.hass, e), l = z(e.size, Ge), c = Kt(e) !== "none", h = e.display ?? "badge", d = mr(e, r), p = U(ji(e.stateColor, d)), g = es(e, p), y = Kt(e) === "value" ? ls(this.hass, e) : void 0, b = Le(e.entity, r?.state), v = b ? U(e.activeColor) ?? Wa(r) : void 0, w = !!this.hass && $n(e, r?.state), E = b || w ? void 0 : U(e.inactiveColor), f = Ea(
      oi(p ?? v ?? E, this._config?.palette)
    ), $ = e.rippleColor ?? p ?? v ?? W, k = e.rippleSize ?? Ri, M = e.rippleDirection ?? Di, C = e.rippleWidth ?? zi, H = ns(e, r?.state, r?.attributes), Y = j(l, i), D = u`<div
      class="badge ${c ? "" : "ghost"} ${p ? "state-colored" : b ? "active-colored" : E ? "inactive-colored" : ""}"
      style="width:${Y};height:${Y};transform:rotate(${z(e.angle, 0)}deg);${p ? `--fp-state:${p};` : ""}${v ? `--fp-active:${v};` : ""}${E ? `--fp-inactive:${E};` : ""}${f ? `--fp-ink:${f};` : ""}"
    >
      ${y ? u`<span
            class="badge-value"
            style="font-size:${j(hs(l, y), i)};"
            >${y}</span
          >` : u`<ha-icon
            class=${H ? `anim-${H}` : ""}
            icon=${o}
            style="--mdc-icon-size:${j(as(l), i)};"
          ></ha-icon>`}
    </div>`;
    let F;
    h === "ripple" ? F = xi(!0, $, k, M, C, 3, i) : h === "iconRipple" ? F = u`<div class="stack">
        ${xi(!0, $, k, M, C, 3, i)}
        <div class="stack-icon">${D}</div>
      </div>` : F = D;
    const S = Za(e, r?.state);
    return u`
      <div
        class="edit-item ${n ? "selected" : ""} ${S ? "card-hidden" : ""}"
        style="left:${e.x / t.width * 100}%; top:${e.y / t.height * 100}%;"
        @pointerdown=${(se) => this._onOverlayDown(se, { kind: "item", id: e.id })}
        @pointermove=${this._onOverlayMove}
        @pointerup=${this._onOverlayUp}
        @pointercancel=${this._onPointerCancel}
      >
        ${F}
        <!-- The card's own label line when there is one (issue #135), so
             turning Show state on is visible here rather than only after
             leaving the editor; otherwise the dim identification fallback.
             The Labels toolbar toggle hides either on dense plans (issue
             #52), and the size previews the card's labelSize (issue #59). -->
        ${this._hideLabels ? m : u`<span
            class="ilabel ${s ? "live" : ""} ilabel-${ur(e)}"
            style="font-size:${j(
      s || e.labelSize != null ? Ja(e.labelSize) : 11,
      i
    )};${s && g ? `color:${g};` : ""}"
            >${a}</span
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
               font-size:${j(z(e.size, Ft), i)};
               color:${de(e.color, Ta)};
               transform:translate(-50%,-50%) rotate(${z(e.angle, 0)}deg);"
        @pointerdown=${(r) => this._onOverlayDown(r, { kind: "text", id: e.id })}
        @pointermove=${this._onOverlayMove}
        @pointerup=${this._onOverlayUp}
        @pointercancel=${this._onPointerCancel}
      >
        ${sr(this.hass, e) || "…"}
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
          ${this._projectOpen ? m : u`<span class="section-summary"
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
    const e = this._config, t = (n) => this._patchConfig(n), i = Kg(e);
    return u`
      <div class="rows panel-body">
        ${this._renderGroup(
      "Project",
      this._renderForm(Bg(e), (n, r) => {
        "grid" in n && typeof n.grid == "number" && (n = { ...n, ...this._gridPatch(n.grid) }), r ? this._patchConfigLive(n) : this._patchConfig(n);
      })
    )}
        ${this._renderGroup(
      // The plan's own look: its palette, its paper, and the one drawing
      // convention that is a plan-wide choice rather than an element's.
      "Look",
      this._renderForm(Wg(e), t),
      this._renderColorRow({
        label: "Background",
        value: e.background,
        swatch: "#ffffff",
        placeholder: "#ffffff or empty",
        onLive: (n) => this._patchConfigLive({ background: n }),
        onCommit: (n) => this._patchConfig({ background: n })
      }),
      this._renderForm(qg(e), t)
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
      this._renderForm(Yg(this._floor()), (n, r) => {
        r ? this._patchFloorLive(n) : this._commitFloor(n);
      })
    )}
        ${this._renderGroup(
      // How the card is framed on the dashboard, as opposed to what is
      // drawn inside it. Set once for a surface and rarely touched again.
      "Display",
      this._renderForm(
        ve(i, [
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
      this._renderForm(Vg(e), t),
      e.sunlight ? u`${this._renderColorRow({
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
      this._renderForm(Gg(e), t)
    )}
        ${this._renderGroup(
      // How devices look and answer, plan-wide. "Offline devices" lived
      // under display, beside the card's rotation, which is not what it is
      // about.
      "Devices",
      this._renderForm(jg(e), t),
      this._renderForm(ve(i, ["offlineStyle"]), t),
      this._renderForm(Ug(e), t)
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
    return u`
      <div class="row col palette-panel">
        <label>Named colors</label>
        ${e.length ? m : u`<span class="hint"
              >Name a color here and every color field on the plan can point at it.</span
            >`}
        ${e.map(
      (n, r) => u`
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
        ${this._paletteError ? u`<div class="symbol-error">${this._paletteError}</div>` : m}
        ${e.length >= Ls ? m : u`<div class="row wide state-color-add">
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
    const r = t.value.trim(), o = ne(n.name), a = ne(r);
    if (o === a) {
      if (this._paletteError = "", r === (n.name ?? "")) {
        t.value = r;
        return;
      }
      this._patchConfig({ palette: i.map((c, h) => h === e ? { ...c, name: r } : c) });
      return;
    }
    if (a && i.some((c, h) => h !== e && ne(c.name) === a)) {
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
        Ro(l, o, a ? No(r) : n.color)
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
    if (!U(r)) {
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
      this._slugStillResolves(ne(i.name), r) ? r : Ro(r, ne(i.name), i.color)
    );
  }
  /** Whether a slug is still declared by the palette in `config`. */
  _slugStillResolves(e, t) {
    return e ? qt(t.palette).some((i) => ne(i.name) === e) : !1;
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
        ${this._symbolError ? u`<div class="symbol-error">${this._symbolError}</div>` : m}
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
    if (!e || this._selection.length !== 1) return u`${m}`;
    if (e.kind === "opening") {
      const t = this._floor().openings.find((o) => o.id === e.id);
      if (!t) return u`${m}`;
      const i = Eg(t, (o) => this._supportedFeatures(o)), n = (o, a) => {
        if ("entity" in o) {
          const s = o.entity, l = s ? this.hass?.states[s]?.attributes?.device_class : void 0;
          o = { ...o, ...l ? Hf(l) : {} };
        }
        this._applyElementPatch("opening", t.id, o, a);
      }, r = (o, a, ...s) => {
        const l = ve(i, a);
        return !l.fields.length && !s.some((c) => c && c !== m) ? m : this._renderGroup(o, this._renderForm(l, n), ...s);
      };
      return u`
        ${L.OPENING_GROUPS.map(
        ([o, a]) => o === "Color" ? r(
          o,
          a,
          t.entity ? u`${this._renderColorRow({
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
      if (!t) return u`${m}`;
      const i = this._areaEntitiesAt(t.x, t.y), n = t.entity ? this.hass?.states[t.entity]?.attributes?.device_class : void 0, r = (l) => (l ? this.hass?.states[l]?.attributes?.friendly_name : void 0) ?? l, o = {
        source: ds(this.hass, t)?.source ?? "primary",
        primaryLabel: r(t.entity),
        // One label per reading, positionally — the dropdown names each rather
        // than numbering them, and a reading with no entity of its own is read
        // off this device, so that is the name to show for it (issue #180).
        readingLabels: ze(t).map((l) => r(l.entity || t.entity))
      }, a = (l, c) => {
        "entity" in l && typeof l.entity == "string" && (l = { ...l, kind: To(l.entity) }), this._applyElementPatch("item", t.id, l, c);
      }, s = Lg(t, n);
      return u`
        ${this._renderGroup("Identity", this._renderForm(Tg(t), a))}
        ${this._renderGroup(
        "What it reads",
        // Entity, its attribute, whether its own state shows, then every
        // other entity — the order the label prints them in (issue #180).
        this._renderForm(Ag(t, i), a),
        this._renderForm(Cg(t), a),
        this._renderItemReadings(t)
      )}
        ${df(t) ? this._renderGroup(
        "Label",
        this._renderForm(Ig(t), a),
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
        this._renderForm(Og(t, o), a),
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
        ${s ? this._renderGroup(
        "Effects",
        this._renderForm(s, a),
        // The ring's colour belongs with the ring, not with the badge's.
        rs(t.entity, n) && Tr(t) ? this._renderColorRow({
          label: "Ripple color",
          value: t.rippleColor,
          swatch: t.activeColor ?? "#03a9f4",
          placeholder: t.activeColor ? "(active color)" : "(primary)",
          onLive: (l) => this._updateItemLive(t.id, { rippleColor: l }),
          onCommit: (l) => this._updateItem(t.id, { rippleColor: l })
        }) : m
      ) : m}
        ${this._renderGroup("Behaviour", this._renderForm(Pg(t), a))}
        ${this._renderGroup("Visibility", this._renderForm(Mg(t), a))}
      `;
    }
    if (e.kind === "text") {
      const t = this._floor().texts.find((i) => i.id === e.id);
      return t ? u`
        ${this._renderForm(
        Fg(t, this._areaEntitiesAt(t.x, t.y)),
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
      ` : u`${m}`;
    }
    if (e.kind === "furniture") {
      const t = this._floor().furniture.find((r) => r.id === e.id);
      if (!t) return u`${m}`;
      const i = Ng(t, this._areaEntitiesAt(t.x, t.y), this._symbols()), n = (r, o) => this._applyElementPatch("furniture", t.id, r, o);
      return u`
        ${L.FURNITURE_GROUPS.map(
        ([r, o]) => this._renderGroup(r, this._renderForm(ve(i, o), n))
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
        t.entity ? u`
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
      if (!t) return u`${m}`;
      const i = Mc(this.hass), n = t.haArea ? this._pendingAreaEntities(t) : [], r = zg(t), o = (a, s) => this._applyElementPatch("area", t.id, a, s);
      return u`
        ${this._renderGroup(
        // The name doubles as the HA-area link, so the link status line and
        // the name-related toggles belong with it.
        "Identity",
        this._renderForm(
          Dg(t, i.map((a) => a.name)),
          (a, s) => (
            // A name change also decides `haArea` (see areaNamePatch).
            this._applyElementPatch("area", t.id, Pc(a, i), s)
          )
        ),
        this._renderAreaLinkRow(t, i),
        this._renderForm(ve(r, ["showName", "labelSize"]), o)
      )}
        ${this._renderGroup(
        "Room type & sidebar",
        u`<fp-ef-area-extras
            .hass=${this.hass}
            .area=${t}
            @area-patch=${(a) => o(a.detail, !1)}
          ></fp-ef-area-extras>`
      )}
        ${this._renderGroup(
        "What it reads",
        this._renderForm(ve(r, ["entity"]), o)
      )}
        ${this._renderGroup(
        "Color",
        this._renderForm(ve(r, ["highlight", "opacity", "activeOpacity"]), o),
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
        t.entity ? u`
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
          ve(r, [
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
        u`<div class="row wide">
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
      ) : m}
        <p class="hint">
          Drag inside the fill to move the whole room; drag a vertex handle to reshape it.
        </p>
      `;
    }
    if (e.kind === "tracker") {
      const t = (this._floor().trackers ?? []).find((r) => r.id === e.id);
      if (!t) return u`${m}`;
      const i = Rg(t), n = (r, o) => this._applyElementPatch("tracker", t.id, r, o);
      return u`
        ${this._renderGroup(
        "Zone",
        this._renderForm(ve(i, L.TRACKER_GROUPS[0][1]), n)
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
        this._renderForm(ve(i, L.TRACKER_GROUPS[1][1]), n),
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
      if (!t) return u`${m}`;
      const i = Math.round(Math.hypot(t.x2 - t.x1, t.y2 - t.y1));
      return u`
        ${this._renderForm(
        Hg(t),
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
    return u`${m}`;
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
      (r) => {
        r ? this._updateTrackerSensor(e.id, t, { entity: r }) : this._updateTrackerSensor(e.id, t, null);
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
            ${n.presence ? u`<label class="inline-check" title="Treat 'off' as detected">
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
L._nextWallMaskId = 0;
L.OPENING_GROUPS = [
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
L.FURNITURE_GROUPS = [
  ["Shape", ["type", "hand", "w", "h", "angle"]],
  ["What it reads", ["entity"]],
  // What clicking it does — a staircase that changes floor (issue #121).
  ["Behavior", ["goToFloor"]]
];
L.TRACKER_GROUPS = [
  ["Zone", ["w", "h", "x", "y", "angle"]],
  ["Marker", ["dotSize"]]
];
L.styles = [
  Ca,
  $e`
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
      width: ${fi}px;
      height: ${fi}px;
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
  I({ attribute: !1 })
], L.prototype, "hass", 2);
P([
  I({ type: Boolean })
], L.prototype, "panelMode", 2);
P([
  I({ attribute: !1 })
], L.prototype, "panelError", 2);
P([
  T()
], L.prototype, "_config", 2);
P([
  T()
], L.prototype, "_tool", 2);
P([
  T()
], L.prototype, "_selection", 2);
P([
  T()
], L.prototype, "_activeFloorId", 2);
P([
  T()
], L.prototype, "_draft", 2);
P([
  T()
], L.prototype, "_draftTracker", 2);
P([
  T()
], L.prototype, "_areaShape", 2);
P([
  T()
], L.prototype, "_draftArea", 2);
P([
  T()
], L.prototype, "_areaHover", 2);
P([
  T()
], L.prototype, "_freeWalls", 2);
P([
  T()
], L.prototype, "_defaultOpeningLength", 2);
P([
  T()
], L.prototype, "_marquee", 2);
P([
  T()
], L.prototype, "_history", 2);
P([
  T()
], L.prototype, "_future", 2);
P([
  T()
], L.prototype, "_zoom", 2);
P([
  T()
], L.prototype, "_floorMenuOpen", 2);
P([
  T()
], L.prototype, "_addMenuOpen", 2);
P([
  T()
], L.prototype, "_addQuery", 2);
P([
  T()
], L.prototype, "_symbolDraft", 2);
P([
  T()
], L.prototype, "_symbolError", 2);
P([
  T()
], L.prototype, "_paletteError", 2);
P([
  T()
], L.prototype, "_projectOpen", 2);
P([
  T()
], L.prototype, "_openGroups", 2);
P([
  T()
], L.prototype, "_fullscreen", 2);
P([
  T()
], L.prototype, "_applyState", 2);
P([
  T()
], L.prototype, "_applyError", 2);
P([
  Oi(".editor")
], L.prototype, "_editorEl", 2);
P([
  Oi("svg")
], L.prototype, "_svg", 2);
P([
  Oi(".canvas-wrap")
], L.prototype, "_canvasWrap", 2);
P([
  T()
], L.prototype, "_hideLabels", 2);
P([
  T()
], L.prototype, "_guides", 2);
P([
  T()
], L.prototype, "_ctx", 2);
L = P([
  Oe("fp-ef-editor")
], L);
const ry = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get FloorplanCardEditor() {
    return L;
  }
}, Symbol.toStringTag, { value: "Module" }));
var oy = Object.defineProperty, ay = Object.getOwnPropertyDescriptor, Vi = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? ay(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (r = (n ? a(t, i, r) : a(r)) || r);
  return n && r && oy(t, i, r), r;
};
const sy = [
  { kind: "device", title: "Geräte" },
  { kind: "scene", title: "Szenen" },
  { kind: "script", title: "Skripte" }
];
let ft = class extends ce {
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
    const e = this.area.sidebar ?? [], t = e.filter((i) => On(i.entity) === "device" && Uo(this.hass.states[i.entity])).length;
    return u`
      <header>
        <div class="title">
          <h2>${this.area.name || "Raum"}</h2>
          <span class="sub">${e.length ? `${t} aktiv` : ""}</span>
        </div>
        ${this.canEdit ? u`<button class="icon-btn" title="Seitenleiste bearbeiten" @click=${this._edit}>
              <ha-icon icon="mdi:pencil"></ha-icon>
            </button>` : m}
        <button class="icon-btn" title="Schließen" @click=${this._close}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </header>
      <div class="content">
        ${e.length === 0 ? u`<p class="empty">
              Diesem Raum ist noch nichts zugeordnet.${this.canEdit ? u` Im Editor lassen sich Geräte, Szenen und Skripte für die Seitenleiste auswählen.` : m}
            </p>` : sy.map(({ kind: i, title: n }) => {
      const r = e.filter((o) => On(o.entity) === i);
      return r.length ? u`<section>
                <h3>${n}</h3>
                ${i === "device" ? r.map((o) => this._renderRow(o)) : u`<div class="chips">${r.map((o) => this._renderChip(o))}</div>`}
              </section>` : m;
    })}
      </div>
    `;
  }
  _renderRow(e) {
    const t = this.hass.states[e.entity], i = Uo(t), n = jo(t), r = e.name || Ln(this.hass, e.entity), o = xe(e.entity);
    return u`
      <div class="row ${i ? "active" : ""} ${n ? "unavailable" : ""}">
        <button class="row-main" @click=${() => Ko(this, e.entity)} title="Details">
          <span class="row-icon"><ha-icon .icon=${Gt(this.hass, e.entity, e.icon)}></ha-icon></span>
          <span class="row-text">
            <span class="name">${r}</span>
            <span class="state">${mg(this.hass, t)}</span>
          </span>
        </button>
        ${n ? m : o === "cover" ? u`<span class="cover-btns">
              <button class="icon-btn" title="Öffnen" @click=${() => this._call("cover", "open_cover", e.entity)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button class="icon-btn" title="Stopp" @click=${() => this._call("cover", "stop_cover", e.entity)}>
                <ha-icon icon="mdi:stop"></ha-icon>
              </button>
              <button class="icon-btn" title="Schließen" @click=${() => this._call("cover", "close_cover", e.entity)}>
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
            </span>` : fg(e.entity) ? u`<button class="run" @click=${() => Wo(this.hass, e.entity)}>Ausführen</button>` : ug(e.entity) ? u`<button
              class="switch ${i ? "on" : ""}"
              role="switch"
              aria-checked=${i ? "true" : "false"}
              title=${i ? "Ausschalten" : "Einschalten"}
              @click=${() => yg(this.hass, e.entity)}
            >
              <span class="knob"></span>
            </button>` : m}
      </div>
    `;
  }
  _renderChip(e) {
    const t = this.hass.states[e.entity], i = e.name || Ln(this.hass, e.entity), n = xe(e.entity) === "script" && t?.state === "on";
    return u`
      <button
        class="chip ${n ? "running" : ""}"
        ?disabled=${jo(t)}
        title=${e.entity}
        @click=${() => Wo(this.hass, e.entity)}
        @contextmenu=${(r) => {
      r.preventDefault(), Ko(this, e.entity);
    }}
      >
        <ha-icon .icon=${Gt(this.hass, e.entity, e.icon)}></ha-icon>
        <span>${i}</span>
      </button>
    `;
  }
  _call(e, t, i) {
    this.hass.callService(e, t, { entity_id: i });
  }
};
ft.styles = $e`
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
Vi([
  I({ attribute: !1 })
], ft.prototype, "hass", 2);
Vi([
  I({ attribute: !1 })
], ft.prototype, "area", 2);
Vi([
  I({ type: Boolean })
], ft.prototype, "canEdit", 2);
ft = Vi([
  Oe("fp-room-sidebar")
], ft);
/*! js-yaml 5.4.3 https://github.com/nodeca/js-yaml @license MIT */
var N = Symbol("NOT_RESOLVED");
function oe(e, t) {
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
function Cr(e, t) {
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
function Yi(e, t) {
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
var ly = oe("tag:yaml.org,2002:str", {
  resolve: (e) => e,
  identify: (e) => typeof e == "string"
}), cy = [
  "",
  "~",
  "null",
  "Null",
  "NULL"
], dy = oe("tag:yaml.org,2002:null", {
  implicit: !0,
  implicitFirstChars: [
    "",
    "~",
    "n",
    "N"
  ],
  resolve: (e) => cy.indexOf(e) !== -1 ? null : N,
  identify: (e) => e === null,
  represent: () => "null"
}), hy = oe("tag:yaml.org,2002:null", {
  implicit: !0,
  implicitFirstChars: ["n"],
  resolve: (e, t) => e === "null" || t && e === "" ? null : N,
  identify: (e) => e === null,
  represent: () => "null"
}), py = [
  "",
  "~",
  "null",
  "Null",
  "NULL"
], uy = oe("tag:yaml.org,2002:null", {
  implicit: !0,
  implicitFirstChars: [
    "",
    "~",
    "n",
    "N"
  ],
  resolve: (e) => py.indexOf(e) !== -1 ? null : N,
  identify: (e) => e === null,
  represent: () => "null"
}), fy = [
  "true",
  "True",
  "TRUE"
], my = [
  "false",
  "False",
  "FALSE"
], gy = oe("tag:yaml.org,2002:bool", {
  implicit: !0,
  implicitFirstChars: [
    "t",
    "T",
    "f",
    "F"
  ],
  resolve: (e) => fy.indexOf(e) !== -1 ? !0 : my.indexOf(e) !== -1 ? !1 : N,
  identify: (e) => Object.prototype.toString.call(e) === "[object Boolean]",
  represent: (e) => e ? "true" : "false"
}), yy = ["true"], by = ["false"], vy = oe("tag:yaml.org,2002:bool", {
  implicit: !0,
  implicitFirstChars: ["t", "f"],
  resolve: (e) => yy.indexOf(e) !== -1 ? !0 : by.indexOf(e) !== -1 ? !1 : N,
  identify: (e) => Object.prototype.toString.call(e) === "[object Boolean]",
  represent: (e) => e ? "true" : "false"
}), _y = [
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
], wy = [
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
], xy = oe("tag:yaml.org,2002:bool", {
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
  resolve: (e) => _y.indexOf(e) !== -1 ? !0 : wy.indexOf(e) !== -1 ? !1 : N,
  identify: (e) => Object.prototype.toString.call(e) === "[object Boolean]",
  represent: (e) => e ? "true" : "false"
}), $y = /* @__PURE__ */ new RegExp("^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$"), ky = /* @__PURE__ */ new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");
function Sy(e) {
  let t = e, i = 1;
  return (t[0] === "-" || t[0] === "+") && (t[0] === "-" && (i = -1), t = t.slice(1)), t.startsWith("0b") ? i * parseInt(t.slice(2), 2) : t.startsWith("0o") ? i * parseInt(t.slice(2), 8) : t.startsWith("0x") ? i * parseInt(t.slice(2), 16) : i * parseInt(t, 10);
}
function Ey(e, t) {
  if (t) {
    if (!ky.test(e)) return N;
  } else if (!$y.test(e)) return N;
  const i = Sy(e);
  return Number.isFinite(i) ? i : N;
}
var Us = oe("tag:yaml.org,2002:int", {
  implicit: !0,
  implicitFirstChars: [
    "-",
    "+",
    ..."0123456789"
  ],
  resolve: Ey,
  identify: (e) => Number.isInteger(e) && !Object.is(e, -0) && e.toString(10).indexOf("e") < 0,
  represent: (e) => e.toString(10)
}), Ay = /* @__PURE__ */ new RegExp("^-?(?:0|[1-9][0-9]*)$"), Ty = /* @__PURE__ */ new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");
function Cy(e) {
  let t = e, i = 1;
  return (t[0] === "-" || t[0] === "+") && (t[0] === "-" && (i = -1), t = t.slice(1)), t.startsWith("0b") ? i * parseInt(t.slice(2), 2) : t.startsWith("0o") ? i * parseInt(t.slice(2), 8) : t.startsWith("0x") ? i * parseInt(t.slice(2), 16) : i * parseInt(t, 10);
}
function Iy(e, t) {
  if (t) {
    if (!Ty.test(e)) return N;
  } else if (!Ay.test(e)) return N;
  const i = Cy(e);
  return Number.isFinite(i) ? i : N;
}
var Oy = oe("tag:yaml.org,2002:int", {
  implicit: !0,
  implicitFirstChars: ["-", ..."0123456789"],
  resolve: Iy,
  identify: (e) => Number.isInteger(e) && !Object.is(e, -0) && e.toString(10).indexOf("e") < 0,
  represent: (e) => e.toString(10)
}), Ly = /* @__PURE__ */ new RegExp("^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$");
function My(e) {
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
function Py(e) {
  if (!Ly.test(e)) return N;
  const t = My(e);
  return Number.isFinite(t) ? t : N;
}
var Mn = oe("tag:yaml.org,2002:int", {
  implicit: !0,
  implicitFirstChars: [
    "-",
    "+",
    ..."0123456789"
  ],
  resolve: Py,
  identify: (e) => Number.isInteger(e) && !Object.is(e, -0) && e.toString(10).indexOf("e") < 0,
  represent: (e) => e.toString(10)
}), Fy = /* @__PURE__ */ new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"), Ny = /* @__PURE__ */ new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
function Ry(e) {
  if (!Fy.test(e)) return N;
  let t = e.toLowerCase();
  const i = t[0] === "-" ? -1 : 1;
  if ("+-".includes(t[0]) && (t = t.slice(1)), t === ".inf") return i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  if (t === ".nan") return NaN;
  const n = i * parseFloat(t);
  return Number.isFinite(n) || Ny.test(e) ? n : N;
}
function Dy(e) {
  if (isNaN(e)) return ".nan";
  if (e === Number.POSITIVE_INFINITY) return ".inf";
  if (e === Number.NEGATIVE_INFINITY) return "-.inf";
  if (Object.is(e, -0)) return "-0.0";
  const t = e.toString(10);
  return /^[-+]?[0-9]+e/.test(t) ? t.replace("e", ".e") : t;
}
var js = oe("tag:yaml.org,2002:float", {
  implicit: !0,
  implicitFirstChars: [
    "-",
    "+",
    ".",
    ..."0123456789"
  ],
  resolve: Ry,
  identify: (e) => typeof e == "number" && (!Number.isInteger(e) || Object.is(e, -0) || e.toString(10).indexOf("e") >= 0),
  represent: Dy
}), zy = /* @__PURE__ */ new RegExp("^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$"), Hy = /* @__PURE__ */ new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
function By(e, t) {
  if (t) {
    if (!Hy.test(e)) return N;
    let n = e.toLowerCase();
    const r = n[0] === "-" ? -1 : 1;
    if ("+-".includes(n[0]) && (n = n.slice(1)), n === ".inf") return r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    if (n === ".nan") return NaN;
    const o = r * parseFloat(n);
    return Number.isFinite(o) ? o : N;
  }
  if (!zy.test(e)) return N;
  const i = Number(e);
  return Number.isFinite(i) ? i : N;
}
function Uy(e) {
  if (isNaN(e)) return ".nan";
  if (e === Number.POSITIVE_INFINITY) return ".inf";
  if (e === Number.NEGATIVE_INFINITY) return "-.inf";
  if (Object.is(e, -0)) return "-0.0";
  const t = e.toString(10);
  return /^[-+]?[0-9]+e/.test(t) ? t.replace("e", ".e") : t;
}
var jy = oe("tag:yaml.org,2002:float", {
  implicit: !0,
  implicitFirstChars: ["-", ..."0123456789"],
  resolve: By,
  identify: (e) => typeof e == "number" && (!Number.isInteger(e) || Object.is(e, -0) || e.toString(10).indexOf("e") >= 0),
  represent: Uy
}), Wy = /* @__PURE__ */ new RegExp("^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"), Ky = /* @__PURE__ */ new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
function qy(e) {
  if (!Wy.test(e)) return N;
  let t = e.toLowerCase().replace(/_/g, "");
  const i = t[0] === "-" ? -1 : 1;
  if ("+-".includes(t[0]) && (t = t.slice(1)), t === ".inf") return i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  if (t === ".nan") return NaN;
  let n = 0;
  if (t.includes(":")) {
    for (const r of t.split(":")) n = n * 60 + Number(r);
    n *= i;
  } else n = i * parseFloat(t);
  return Number.isFinite(n) || Ky.test(e) ? n : N;
}
function Gy(e) {
  if (isNaN(e)) return ".nan";
  if (e === Number.POSITIVE_INFINITY) return ".inf";
  if (e === Number.NEGATIVE_INFINITY) return "-.inf";
  if (Object.is(e, -0)) return "-0.0";
  const t = e.toString(10);
  return /^[-+]?[0-9]+e/.test(t) ? t.replace("e", ".e") : t;
}
var Pn = oe("tag:yaml.org,2002:float", {
  implicit: !0,
  implicitFirstChars: [
    "-",
    "+",
    ".",
    ..."0123456789"
  ],
  resolve: qy,
  identify: (e) => typeof e == "number" && (!Number.isInteger(e) || Object.is(e, -0) || e.toString(10).indexOf("e") >= 0),
  represent: Gy
}), Vy = oe("tag:yaml.org,2002:merge", {
  implicit: !0,
  implicitFirstChars: ["<"],
  resolve: (e, t) => e === "<<" || t && e === "" ? "<<" : N,
  identify: () => !1
}), Yy = /^[A-Za-z0-9+/]*={0,2}$/;
function Zy(e) {
  const t = e.replace(/\s/g, "");
  if (t.length % 4 !== 0 || !Yy.test(t)) return N;
  const i = atob(t), n = new Uint8Array(i.length);
  for (let r = 0; r < i.length; r++) n[r] = i.charCodeAt(r);
  return n;
}
function Xy(e) {
  let t = "";
  for (let i = 0; i < e.length; i++) t += String.fromCharCode(e[i]);
  return btoa(t);
}
var Qy = oe("tag:yaml.org,2002:binary", {
  resolve: Zy,
  identify: (e) => Object.prototype.toString.call(e) === "[object Uint8Array]",
  represent: Xy
}), Jy = /* @__PURE__ */ new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"), eb = /* @__PURE__ */ new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");
function Qo(e, t, i, n = 0, r = 0, o = 0, a = 0) {
  const s = new Date(Date.UTC(e, t, i, n, r, o, a));
  return s.setUTCFullYear(e, t, i), s;
}
function tb(e) {
  let t = Jy.exec(e);
  if (t === null && (t = eb.exec(e)), t === null) return N;
  const i = +t[1], n = +t[2] - 1, r = +t[3];
  if (!t[4]) {
    const h = Qo(i, n, r);
    return h.getUTCFullYear() !== i || h.getUTCMonth() !== n || h.getUTCDate() !== r ? N : h;
  }
  const o = +t[4], a = +t[5], s = +t[6];
  let l = 0;
  if (o > 23 || a > 59 || s > 59) return N;
  if (t[7]) {
    let h = t[7].slice(0, 3);
    for (; h.length < 3; ) h += "0";
    l = +h;
  }
  const c = Qo(i, n, r, o, a, s, l);
  if (c.getUTCFullYear() !== i || c.getUTCMonth() !== n || c.getUTCDate() !== r) return N;
  if (t[9]) {
    const h = +t[10], d = +(t[11] || 0);
    if (h > 23 || d > 59) return N;
    const p = (h * 60 + d) * 6e4;
    c.setTime(c.getTime() - (t[9] === "-" ? -p : p));
  }
  return c;
}
var ib = oe("tag:yaml.org,2002:timestamp", {
  implicit: !0,
  implicitFirstChars: [..."0123456789"],
  resolve: tb,
  identify: (e) => e instanceof Date,
  represent: (e) => e.toISOString()
}), nb = Cr("tag:yaml.org,2002:seq", {
  create: () => [],
  addItem: (e, t) => {
    e.push(t);
  },
  identify: Array.isArray
});
function Zi(e) {
  if (e === null || typeof e != "object" || Array.isArray(e)) return !1;
  const t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
function Fn(e, t) {
  const i = {};
  for (const n of t) e[n] !== void 0 && (i[n] = e[n]);
  return i;
}
var rb = Cr("tag:yaml.org,2002:omap", {
  create: () => ({
    list: [],
    seen: /* @__PURE__ */ new Set()
  }),
  addItem: (e, t) => {
    let i;
    if (t instanceof Map) {
      if (t.size !== 1) return "cannot resolve an ordered map item";
      i = t.keys().next().value;
    } else if (Zi(t)) {
      const n = Object.keys(t);
      if (n.length !== 1) return "cannot resolve an ordered map item";
      i = n[0];
    } else return "cannot resolve an ordered map item";
    return e.seen.has(i) ? "duplicate key in ordered map" : (e.seen.add(i), e.list.push(t), "");
  },
  finalize: (e) => e.list,
  identify: () => !1
}), ob = Cr("tag:yaml.org,2002:pairs", {
  create: () => [],
  addItem: (e, t) => {
    if (t instanceof Map)
      return t.size !== 1 ? "cannot resolve a pairs item" : (e.push(t.entries().next().value), "");
    if (Object.prototype.toString.call(t) !== "[object Object]") return "cannot resolve a pairs item";
    const i = t, n = Object.keys(i);
    return n.length !== 1 ? "cannot resolve a pairs item" : (e.push([n[0], i[n[0]]]), "");
  },
  identify: () => !1
}), ab = Yi("tag:yaml.org,2002:map", {
  create: () => ({}),
  identify: Zi,
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
}), sb = Yi("tag:yaml.org,2002:set", {
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
function lb() {
  return {
    scalar: /* @__PURE__ */ Object.create(null),
    sequence: /* @__PURE__ */ Object.create(null),
    mapping: /* @__PURE__ */ Object.create(null)
  };
}
function cb() {
  return {
    scalar: [],
    sequence: [],
    mapping: []
  };
}
function db(e) {
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
var Xi = class Ws {
  constructor(t) {
    pe(this, "tags");
    /** @internal */
    pe(this, "implicitScalarTags");
    /**
    * Dispatch implicit scalar resolvers by `source.charAt(0)`. Each bucket holds
    * the resolvers that may match that key, in schema order; a key absent from
    * the map uses
    * {@link Schema.implicitScalarAnyFirstChar}
    * (resolvers that declared no first-char constraint, so they apply to any
    * first character).
    */
    pe(this, "implicitScalarByFirstChar");
    pe(this, "implicitScalarAnyFirstChar");
    /**
    * The default scalar tag (`!!str`), resolved once so the composer's fallback
    * for unresolved plain scalars avoids a keyed lookup per scalar.
    *
    * @internal
    */
    pe(this, "defaultScalarTag");
    /**
    * The default container tags (`!!seq` / `!!map`), used by the dumper: when a
    * value is identified by its default tag, the tag is implicit and not
    * printed. Undefined if the schema does not define them (then such values
    * can't be dumped).
    *
    * @internal
    */
    pe(this, "defaultSequenceTag");
    /** @internal */
    pe(this, "defaultMappingTag");
    pe(this, "exact");
    pe(this, "prefix");
    const i = db(t), n = [], r = lb(), o = cb();
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
      if (o !== N) return {
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
    return new Ws([...this.tags, ...i]);
  }
}, Ir = new Xi([
  ly,
  nb,
  ab
]);
new Xi([
  ...Ir.tags,
  hy,
  vy,
  Oy,
  jy
]);
var hb = new Xi([
  ...Ir.tags,
  dy,
  gy,
  Us,
  js
]), pb = new Xi([
  ...Ir.tags,
  uy,
  xy,
  Mn,
  Pn,
  ib,
  Vy,
  Qy,
  rb,
  ob,
  sb
]), ub = pb.withTags({
  ...Mn,
  resolve: (e, t, i) => {
    const n = Mn.resolve(e, t, i);
    return n === N ? Us.resolve(e, t, i) : n;
  }
}, {
  ...Pn,
  resolve: (e, t, i) => {
    const n = Pn.resolve(e, t, i);
    return n === N ? js.resolve(e, t, i) : n;
  }
});
Yi("tag:yaml.org,2002:map", {
  create: () => /* @__PURE__ */ new Map(),
  addPair: (e, t, i) => (e.set(t, i), ""),
  has: (e, t) => e.has(t),
  keys: (e) => e.keys(),
  get: (e, t) => e.get(t),
  identify: (e) => e instanceof Map || Zi(e),
  represent: (e) => {
    if (e instanceof Map) return e;
    const t = /* @__PURE__ */ new Map(), i = e;
    for (const n of Object.keys(i)) t.set(n, i[n]);
    return t;
  }
});
function Jo(e) {
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
Yi("tag:yaml.org,2002:map", {
  create: () => ({}),
  identify: Zi,
  represent: (e) => {
    const t = /* @__PURE__ */ new Map();
    for (const i of Object.keys(e)) t.set(i, e[i]);
    return t;
  },
  addPair: (e, t, i) => {
    const n = Jo(t);
    return n === null ? "nested arrays are not supported inside keys" : (n === "__proto__" ? Object.defineProperty(e, n, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[n] = i, "");
  },
  has: (e, t) => {
    const i = Jo(t);
    return i !== null && Object.prototype.hasOwnProperty.call(e, i);
  },
  keys: (e) => Object.keys(e),
  get: (e, t) => {
    const i = String(t);
    return Object.prototype.hasOwnProperty.call(e, i) ? e[i] : null;
  }
});
var fb = {
  maxLength: 79,
  indent: 1,
  linesBefore: 3,
  linesAfter: 2
};
function cn(e, t, i, n, r) {
  let o = "", a = "";
  const s = Math.floor(r / 2) - 1;
  return n - t > s && (o = " ... ", t = n - s + o.length), i - n > s && (a = " ...", i = n + s - a.length), {
    str: o + e.slice(t, i).replace(/\t/g, "→") + a,
    pos: n - t + o.length
  };
}
function dn(e, t) {
  return " ".repeat(Math.max(t - e.length, 0)) + e;
}
function mb(e, t) {
  if (!e.buffer) return null;
  const i = {
    ...fb,
    ...t
  }, n = /\r?\n|\r|\0/g, r = [0], o = [];
  let a, s = -1;
  for (; a = n.exec(e.buffer); )
    o.push(a.index), r.push(a.index + a[0].length), e.position <= a.index && s < 0 && (s = r.length - 2);
  s < 0 && (s = r.length - 1);
  let l = "";
  const c = Math.min(e.line + i.linesAfter, o.length).toString().length, h = i.maxLength - (i.indent + c + 3);
  for (let p = 1; p <= i.linesBefore && !(s - p < 0); p++) {
    const g = cn(e.buffer, r[s - p], o[s - p], e.position - (r[s] - r[s - p]), h);
    l = `${" ".repeat(i.indent)}${dn((e.line - p + 1).toString(), c)} | ${g.str}
${l}`;
  }
  const d = cn(e.buffer, r[s], o[s], e.position, h);
  l += `${" ".repeat(i.indent)}${dn((e.line + 1).toString(), c)} | ${d.str}
`, l += `${"-".repeat(i.indent + c + 3 + d.pos)}^
`;
  for (let p = 1; p <= i.linesAfter && !(s + p >= o.length); p++) {
    const g = cn(e.buffer, r[s + p], o[s + p], e.position - (r[s] - r[s + p]), h);
    l += `${" ".repeat(i.indent)}${dn((e.line + p + 1).toString(), c)} | ${g.str}
`;
  }
  return l.replace(/\n$/, "");
}
function ea(e, t) {
  let i = "";
  return e.mark ? (e.mark.name && (i += `in "${e.mark.name}" `), i += `(${e.mark.line + 1}:${e.mark.column + 1})`, !t && e.mark.snippet && (i += `

${e.mark.snippet}`), `${e.reason} ${i}`) : e.reason;
}
var He = class Ks extends Error {
  /**
  * Optional `mark` contains source snippet data. Usually, use
  * {@link YAMLException.throwAt} instead of passing it directly.
  */
  constructor(i, n) {
    super();
    pe(this, "reason");
    pe(this, "mark");
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
    throw l.snippet = mb(l), new Ks(r, l);
  }
}, te = {
  DOCUMENT: 1,
  SEQUENCE: 2,
  MAPPING: 3,
  SCALAR: 4,
  ALIAS: 5,
  POP: 6
}, O = {
  PLAIN: 1,
  SINGLE_QUOTED: 2,
  DOUBLE_QUOTED: 3,
  LITERAL_BLOCK: 4,
  FOLDED_BLOCK: 5
}, fe = {
  BLOCK: 1,
  FLOW: 2
}, _e = {
  CLIP: 1,
  STRIP: 2,
  KEEP: 3
}, gb = -1;
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
var qs = new Array(256), Gs = new Array(256);
for (let e = 0; e < 256; e++)
  qs[e] = ta(e) ? 1 : 0, Gs[e] = ta(e);
function yb(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode((e - 65536 >> 10) + 55296, (e - 65536 & 1023) + 56320);
}
function bb(e) {
  return e >= 48 && e <= 57 ? e - 48 : (e | 32) - 97 + 10;
}
function vb(e) {
  return e === 120 ? 2 : e === 117 ? 4 : 8;
}
function Si(e, t, i) {
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
function Or(e) {
  return e === 1 ? " " : `
`.repeat(e - 1);
}
function _b(e, t, i) {
  let n = "", r = t, o = t, a = t;
  for (; r < i; ) {
    const s = e.charCodeAt(r);
    if (s === 10 || s === 13) {
      n += e.slice(o, a);
      const l = Si(e, r, i);
      n += Or(l.breaks), r = o = a = l.position;
    } else
      r++, s !== 32 && s !== 9 && (a = r);
  }
  return n + e.slice(o, a);
}
function wb(e, t, i) {
  let n = "", r = t, o = t, a = t;
  for (; r < i; ) {
    const s = e.charCodeAt(r);
    if (s === 39)
      n += e.slice(o, r) + "'", r += 2, o = a = r;
    else if (s === 10 || s === 13) {
      n += e.slice(o, a);
      const l = Si(e, r, i);
      n += Or(l.breaks), r = o = a = l.position;
    } else
      r++, s !== 32 && s !== 9 && (a = r);
  }
  return n + e.slice(o, i);
}
function xb(e, t, i) {
  let n = "", r = t, o = t, a = t;
  for (; r < i; ) {
    const s = e.charCodeAt(r);
    if (s === 92) {
      n += e.slice(o, r), r++;
      const l = e.charCodeAt(r);
      if (l === 10 || l === 13) r = Si(e, r, i).position;
      else if (l < 256 && qs[l])
        n += Gs[l], r++;
      else {
        let c = vb(l), h = 0;
        for (; c > 0; c--) {
          r++;
          const d = bb(e.charCodeAt(r));
          h = (h << 4) + d;
        }
        n += yb(h), r++;
      }
      o = a = r;
    } else if (s === 10 || s === 13) {
      n += e.slice(o, a);
      const l = Si(e, r, i);
      n += Or(l.breaks), r = o = a = l.position;
    } else
      r++, s !== 32 && s !== 9 && (a = r);
  }
  return n + e.slice(o, i);
}
function ia(e, t, i, n, r, o) {
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
  return r === _e.KEEP ? c += `
`.repeat(h ? 1 + d : d) : r !== _e.STRIP && h && (c += `
`), c;
}
function $b(e, t) {
  if (t.valueStart === gb) return "";
  const { valueStart: i, valueEnd: n } = t;
  if (t.fast) return e.slice(i, n);
  switch (t.style) {
    case O.SINGLE_QUOTED:
      return wb(e, i, n);
    case O.DOUBLE_QUOTED:
      return xb(e, i, n);
    case O.LITERAL_BLOCK:
      return ia(e, i, n, t.indent, t.chomping, !1);
    case O.FOLDED_BLOCK:
      return ia(e, i, n, t.indent, t.chomping, !0);
    default:
      return _b(e, i, n);
  }
}
var kb = Object.assign(/* @__PURE__ */ Object.create(null), {
  "!": "!",
  "!!": "tag:yaml.org,2002:"
});
function hn(e) {
  return encodeURI(e).replace(/!/g, "%21");
}
function Vs(e, t) {
  if (e.startsWith("!<") && e.endsWith(">")) return decodeURIComponent(e.slice(2, -1));
  const i = e.indexOf("!", 1), n = i === -1 ? "!" : e.slice(0, i + 1), r = t?.[n] ?? kb[n] ?? n;
  return decodeURIComponent(r) + decodeURIComponent(e.slice(n.length));
}
function Ys(e) {
  let t = e;
  return t.charCodeAt(0) === 33 ? (t = t.slice(1), `!${hn(t)}`) : t.slice(0, 18) === "tag:yaml.org,2002:" ? `!!${hn(t.slice(18))}` : `!<${hn(t)}>`;
}
var ct = -1, Sb = "tag:yaml.org,2002:merge", Lr = {
  filename: "",
  schema: hb,
  json: !1,
  maxTotalMergeKeys: 1e4,
  maxAliases: -1
};
function Eb(e) {
  return "tagStart" in e && e.tagStart !== ct ? e.tagStart : "anchorStart" in e && e.anchorStart !== ct ? e.anchorStart : "valueStart" in e && e.valueStart !== ct ? e.valueStart : "start" in e ? e.start : 0;
}
function ie(e, t) {
  He.throwAt(e.source, e.position, t, e.filename);
}
function Zs(e, t, i, n) {
  try {
    return i.finalize(n);
  } catch (r) {
    if (r instanceof He) throw r;
    He.throwAt(e.source, t, r instanceof Error ? r.message : String(r), e.filename);
  }
}
function Ab(e, t) {
  const i = $b(e.source, t), n = t.tagStart === ct ? "" : e.source.slice(t.tagStart, t.tagEnd), r = e.schema.defaultScalarTag;
  if (n !== "") {
    if (n === "!") return {
      value: i,
      tag: r
    };
    const o = Vs(n, e.tagHandlers), a = e.schema.lookupScalarTag(o);
    if (a) {
      const l = a.resolve(i, !0, o);
      return l === N && ie(e, `cannot resolve a node with !<${o}> explicit tag`), {
        value: l,
        tag: a
      };
    }
    const s = e.schema.lookupMappingTag(o) ?? e.schema.lookupSequenceTag(o);
    if (s) {
      i !== "" && ie(e, `cannot resolve a node with !<${o}> explicit tag`);
      const l = s.create(o);
      return {
        value: s.carrierIsResult ? l : Zs(e, e.position, s, l),
        tag: s
      };
    }
    ie(e, `unknown scalar tag !<${o}>`);
  }
  return t.style === O.PLAIN ? e.schema.resolveImplicitScalarTag(i) : {
    value: r.resolve(i, !1, r.tagName),
    tag: r
  };
}
function na(e, t, i) {
  const n = t.tagStart === ct ? "" : e.source.slice(t.tagStart, t.tagEnd);
  return n === "" || n === "!" ? i : Vs(n, e.tagHandlers);
}
function Xs(e) {
  return e.nodeKind === "mapping";
}
function ra(e) {
  e.totalMergeKeys++, e.maxTotalMergeKeys !== -1 && e.totalMergeKeys > e.maxTotalMergeKeys && ie(e, `merge keys exceeded maxTotalMergeKeys (${e.maxTotalMergeKeys})`);
}
function oa(e, t, i, n) {
  ra(e);
  for (const r of n.keys(i)) {
    if (ra(e), t.tag.has(t.value, r)) continue;
    const o = t.tag.addPair(t.value, r, n.get(i, r));
    o && ie(e, o), t.overridable ??= /* @__PURE__ */ new Set(), t.overridable.add(r);
  }
}
function Tb(e, t, i, n) {
  if (e.position = t.keyPosition, Xs(n)) oa(e, t, i, n);
  else if (n.nodeKind === "sequence" && Array.isArray(i)) {
    i.length > 100 && ie(e, "abnormal merge sequence size");
    for (const r of i) {
      const o = e.nodeTags.get(r);
      o || ie(e, "cannot merge mappings; the provided source object is unacceptable"), oa(e, t, r, o);
    }
  } else ie(e, "cannot merge mappings; the provided source object is unacceptable");
}
function Cb(e, t, i, n, r) {
  if (e.position = t.keyPosition, t.keyIsMerge) {
    Tb(e, t, n, r);
    return;
  }
  !e.json && t.tag.has(t.value, i) && !t.overridable?.has(i) && ie(e, "duplicated mapping key");
  const o = t.tag.addPair(t.value, i, n);
  o && ie(e, o), t.overridable?.delete(i);
}
function pn(e, t, i) {
  const n = e.frames[e.frames.length - 1];
  if (n.kind === "document")
    n.value = t, n.hasValue = !0;
  else if (n.kind === "sequence") {
    Xs(i) && e.nodeTags.set(t, i);
    const r = n.tag.addItem(n.value, t, n.index++);
    r && ie(e, r);
  } else if (n.hasKey) {
    const r = n.key;
    n.key = void 0, n.hasKey = !1, Cb(e, n, r, t, i);
  } else
    n.key = t, n.keyPosition = e.position, n.hasKey = !0, n.keyIsMerge = i.tagName === Sb;
}
function un(e, t, i, n, r) {
  if (t.anchorStart !== ct) {
    const o = {
      value: i,
      tag: n,
      isValueFinal: r
    };
    return e.anchors.set(e.source.slice(t.anchorStart, t.anchorEnd), o), o;
  }
  return null;
}
function Ib(e, t) {
  const i = {
    ...Lr,
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
    switch (i.position = Eb(n), n.type) {
      case te.DOCUMENT:
        i.anchors = /* @__PURE__ */ new Map(), i.nodeTags = /* @__PURE__ */ new Map(), i.aliasCount = 0, i.tagHandlers = /* @__PURE__ */ Object.create(null);
        for (const r of n.directives) r.kind === "tag" && (i.tagHandlers[r.handle] = r.prefix);
        i.frames.push({
          kind: "document",
          position: i.position,
          value: void 0,
          hasValue: !1
        });
        break;
      case te.SCALAR: {
        const { value: r, tag: o } = Ab(i, n);
        un(i, n, r, o, !0), pn(i, r, o);
        break;
      }
      case te.SEQUENCE: {
        const r = na(i, n, "tag:yaml.org,2002:seq"), o = i.schema.lookupSequenceTag(r);
        o || ie(i, `unknown sequence tag !<${r}>`);
        const a = o.create(r), s = un(i, n, a, o, o.carrierIsResult);
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
      case te.MAPPING: {
        const r = na(i, n, "tag:yaml.org,2002:map"), o = i.schema.lookupMappingTag(r);
        o || ie(i, `unknown mapping tag !<${r}>`);
        const a = o.create(r), s = un(i, n, a, o, o.carrierIsResult);
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
      case te.ALIAS: {
        i.maxAliases !== -1 && ++i.aliasCount > i.maxAliases && ie(i, `aliases exceeded maxAliases (${i.maxAliases})`);
        const r = i.source.slice(n.anchorStart, n.anchorEnd), o = i.anchors.get(r);
        o || ie(i, `unidentified alias "${r}"`), o.isValueFinal || ie(i, `recursive alias "${r}" is not supported for tag ${o.tag.tagName} because it uses finalize()`), pn(i, o.value, o.tag);
        break;
      }
      case te.POP: {
        const r = i.frames.pop();
        if (r.kind === "mapping" && r.hasKey && (i.position = r.keyPosition, ie(i, "incomplete mapping pair in event stream")), r.kind === "document") i.documents.push(r.value);
        else {
          const o = r.tag.carrierIsResult ? r.value : Zs(i, r.position, r.tag, r.value);
          r.anchor && (r.anchor.value = o, r.anchor.isValueFinal = !0), pn(i, o, r.tag);
        }
        break;
      }
    }
  }
  return i.documents;
}
var R = -1, Qs = Object.prototype.hasOwnProperty, mt = 1, Js = 2, el = 3, Ei = 4, Ob = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Lb = /[,\[\]{}]/, tl = /^(?:!|!!|![0-9A-Za-z-]+!)$/, Nn = String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`, il = String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`, Mb = new RegExp(`^(?:${Nn})*$`), Pb = new RegExp(`^(?:${il})+$`), Fb = new RegExp(`^(?:!(?:${Nn})*|${il}(?:${Nn})*)$`), Mr = {
  filename: "",
  maxDepth: 100
};
function Nb(e, t, i) {
  e.events.push({
    type: te.DOCUMENT,
    explicitStart: t,
    explicitEnd: i,
    directives: e.directives
  });
}
function nl(e, t, i, n, r, o, a) {
  e.events.push({
    type: te.SEQUENCE,
    start: t,
    anchorStart: i,
    anchorEnd: n,
    tagStart: r,
    tagEnd: o,
    style: a
  });
}
function rl(e, t, i, n, r, o, a) {
  e.events.push({
    type: te.MAPPING,
    start: t,
    anchorStart: i,
    anchorEnd: n,
    tagStart: r,
    tagEnd: o,
    style: a
  });
}
function aa(e, t) {
  e.events.splice(t.eventsLength, 0, {
    type: te.MAPPING,
    start: t.position,
    anchorStart: R,
    anchorEnd: R,
    tagStart: R,
    tagEnd: R,
    style: fe.FLOW
  });
}
function wt(e, t, i, n, r, o, a, s, l = _e.CLIP, c = -1, h = !1) {
  e.events.push({
    type: te.SCALAR,
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
function Rb(e, t, i) {
  e.events.push({
    type: te.ALIAS,
    anchorStart: t,
    anchorEnd: i
  });
}
function dt(e) {
  e.events.push({ type: te.POP });
}
function ae(e) {
  wt(e, R, R, R, R, R, R, O.PLAIN);
}
function sa() {
  return {
    anchorStart: R,
    anchorEnd: R,
    tagStart: R,
    tagEnd: R
  };
}
function ht(e) {
  return {
    position: e.position,
    line: e.line,
    lineStart: e.lineStart,
    lineIndent: e.lineIndent,
    firstTabInLine: e.firstTabInLine,
    eventsLength: e.events.length
  };
}
function pt(e, t) {
  e.position = t.position, e.line = t.line, e.lineStart = t.lineStart, e.lineIndent = t.lineIndent, e.firstTabInLine = t.firstTabInLine, e.events.length = t.eventsLength;
}
function A(e, t) {
  He.throwAt(e.input.slice(0, e.length), e.position, t, e.filename);
}
function ee(e) {
  return e === 10 || e === 13;
}
function xt(e) {
  return e === 9 || e === 32;
}
function ge(e) {
  return xt(e) || ee(e);
}
function Ae(e) {
  return e === 0 || ge(e);
}
function Xe(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function Db(e) {
  return e >= 48 && e <= 57 ? e - 48 : -1;
}
function zb(e) {
  if (e >= 48 && e <= 57) return e - 48;
  const t = e | 32;
  return t >= 97 && t <= 102 ? t - 97 + 10 : -1;
}
function Hb(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function Bb(e) {
  return e === 48 || e === 97 || e === 98 || e === 116 || e === 9 || e === 110 || e === 118 || e === 102 || e === 114 || e === 101 || e === 32 || e === 34 || e === 47 || e === 92 || e === 78 || e === 95 || e === 76 || e === 80;
}
function Ai(e) {
  e.input.charCodeAt(e.position) === 10 ? e.position++ : (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++), e.line++, e.lineStart = e.position, e.lineIndent = 0, e.firstTabInLine = -1;
}
function re(e, t) {
  let i = 0, n = e.input.charCodeAt(e.position), r = e.position === e.lineStart || ge(e.input.charCodeAt(e.position - 1));
  for (; n !== 0; ) {
    for (; xt(n); )
      r = !0, n === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), n = e.input.charCodeAt(++e.position);
    if (t && r && n === 35) do
      n = e.input.charCodeAt(++e.position);
    while (!ee(n) && n !== 0);
    if (!ee(n)) break;
    for (Ai(e), i++, r = !0, n = e.input.charCodeAt(e.position); n === 32; )
      e.lineIndent++, n = e.input.charCodeAt(++e.position);
  }
  return i;
}
function gt(e, t = e.position) {
  const i = e.input.charCodeAt(t);
  if ((i === 45 || i === 46) && i === e.input.charCodeAt(t + 1) && i === e.input.charCodeAt(t + 2)) {
    const n = e.input.charCodeAt(t + 3);
    return n === 0 || ge(n);
  }
  return !1;
}
function ol(e) {
  e.position === e.lineStart && e.input.charCodeAt(e.position) === 65279 && (e.position++, e.lineStart = e.position);
}
function Pr(e) {
  if (e.position !== e.lineStart) return !1;
  if (gt(e)) return !0;
  if (e.input.charCodeAt(e.position) !== 65279) return !1;
  const t = ht(e);
  ol(e), re(e, !0);
  const i = e.input.charCodeAt(e.position), n = e.position === e.lineStart && (i === 37 || i === 45 && gt(e));
  return pt(e, t), n;
}
function la(e) {
  let t = e.input.charCodeAt(e.position);
  for (; t !== 0 && !ee(t); ) t = e.input.charCodeAt(++e.position);
}
function al(e, t, i) {
  Ob.test(e.input.slice(t, i)) && A(e, "the stream contains non-printable characters");
}
function Ub(e, t, i) {
  if (e.input.charCodeAt(e.position) !== 33) return !1;
  t.tagStart !== R && A(e, "duplication of a tag property");
  const n = e.position;
  let r = !1, o = !1, a = "!", s = e.input.charCodeAt(++e.position);
  s === 60 ? (r = !0, s = e.input.charCodeAt(++e.position)) : s === 33 && (o = !0, a = "!!", s = e.input.charCodeAt(++e.position));
  let l = e.position, c;
  if (r) {
    for (; s !== 0 && s !== 62; ) s = e.input.charCodeAt(++e.position);
    s !== 62 && A(e, "unexpected end of the stream within a verbatim tag"), c = e.input.slice(l, e.position), e.position++;
  } else {
    for (; s !== 0 && !ge(s) && !(i && Xe(s)); )
      s === 33 && (o ? A(e, "tag suffix cannot contain exclamation marks") : (a = e.input.slice(l - 1, e.position + 1), tl.test(a) || A(e, "named tag handle cannot contain such characters"), o = !0, l = e.position + 1)), s = e.input.charCodeAt(++e.position);
    c = e.input.slice(l, e.position), Lb.test(c) && A(e, "tag suffix cannot contain flow indicator characters");
  }
  return c && !(r ? Mb.test(c) : Pb.test(c)) && A(e, `tag name cannot contain such characters: ${c}`), !r && a !== "!" && a !== "!!" && !Qs.call(e.tagHandlers, a) && A(e, `undeclared tag handle "${a}"`), t.tagStart = n, t.tagEnd = e.position, !0;
}
function jb(e, t) {
  if (e.input.charCodeAt(e.position) !== 38) return !1;
  t.anchorStart !== R && A(e, "duplication of an anchor property"), e.position++;
  const i = e.position;
  for (; e.input.charCodeAt(e.position) !== 0 && !ge(e.input.charCodeAt(e.position)) && !Xe(e.input.charCodeAt(e.position)); ) e.position++;
  return e.position === i && A(e, "name of an anchor node must contain at least one character"), t.anchorStart = i, t.anchorEnd = e.position, !0;
}
function Wb(e, t) {
  if (e.input.charCodeAt(e.position) !== 42) return !1;
  (t.anchorStart !== R || t.tagStart !== R) && A(e, "alias node should not have any properties"), e.position++;
  const i = e.position;
  for (; e.input.charCodeAt(e.position) !== 0 && !ge(e.input.charCodeAt(e.position)) && !Xe(e.input.charCodeAt(e.position)); ) e.position++;
  return e.position === i && A(e, "name of an alias node must contain at least one character"), Rb(e, i, e.position), !0;
}
function Rn(e, t) {
  re(e, !1), e.lineIndent < t && A(e, "deficient indentation");
}
function Kb(e, t, i) {
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
      return e.position++, wt(e, n, a, i.anchorStart, i.anchorEnd, i.tagStart, i.tagEnd, O.SINGLE_QUOTED, _e.CLIP, -1, r), !0;
    }
    ee(o) ? (r = !1, Rn(e, t)) : e.position === e.lineStart && gt(e) ? A(e, "unexpected end of the document within a single quoted scalar") : o !== 9 && o < 32 ? A(e, "expected valid JSON character") : e.position++;
  }
  A(e, "unexpected end of the stream within a single quoted scalar");
}
function qb(e, t, i) {
  if (e.input.charCodeAt(e.position) !== 34) return !1;
  e.position++;
  const n = e.position;
  let r = !0;
  for (; e.input.charCodeAt(e.position) !== 0; ) {
    const o = e.input.charCodeAt(e.position);
    if (o === 34) {
      const a = e.position;
      return e.position++, wt(e, n, a, i.anchorStart, i.anchorEnd, i.tagStart, i.tagEnd, O.DOUBLE_QUOTED, _e.CLIP, -1, r), !0;
    }
    if (o === 92) {
      r = !1;
      const a = e.input.charCodeAt(++e.position);
      if (ee(a)) Rn(e, t);
      else if (Bb(a)) e.position++;
      else {
        let s = Hb(a);
        for (s === 0 && A(e, "unknown escape sequence"); s-- > 0; )
          e.position++, zb(e.input.charCodeAt(e.position)) < 0 && A(e, "expected hexadecimal character");
        e.position++;
      }
    } else ee(o) ? (r = !1, Rn(e, t)) : e.position === e.lineStart && gt(e) ? A(e, "unexpected end of the document within a double quoted scalar") : o !== 9 && o < 32 ? A(e, "expected valid JSON character") : e.position++;
  }
  A(e, "unexpected end of the stream within a double quoted scalar");
}
function Gb(e, t, i) {
  const n = e.input.charCodeAt(e.position);
  let r = _e.CLIP, o = -1, a = !1;
  if (n !== 124 && n !== 62) return !1;
  const s = n === 124 ? O.LITERAL_BLOCK : O.FOLDED_BLOCK;
  for (e.position++; e.input.charCodeAt(e.position) !== 0; ) {
    const g = e.input.charCodeAt(e.position), y = Db(g);
    if (g === 43 || g === 45)
      r !== _e.CLIP && A(e, "repeat of a chomping mode identifier"), r = g === 43 ? _e.KEEP : _e.STRIP, e.position++;
    else if (y >= 0)
      y === 0 && A(e, "bad explicit indentation width of a block scalar; it cannot be less than one"), a && A(e, "repeat of an indentation width identifier"), o = t + y - 1, a = !0, e.position++;
    else break;
  }
  let l = !1;
  for (; xt(e.input.charCodeAt(e.position)); )
    l = !0, e.position++;
  l && e.input.charCodeAt(e.position) === 35 && la(e), ee(e.input.charCodeAt(e.position)) ? Ai(e) : e.input.charCodeAt(e.position) !== 0 && A(e, "a line break is expected");
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
    if (Pr(e)) break;
    if (!a && c === -1 && ee(b) && (h = Math.max(h, y)), !a && c === -1 && !ee(b) && (b === 9 && y < t && (e.position = g + y, A(e, "tab characters must not be used in indentation")), y >= t && y < h && (e.position = g + y, A(e, "bad indentation of a mapping entry"))), c === -1 && b !== 0 && !ee(b) && y < t) {
      e.lineIndent = y, e.position = g + y;
      break;
    }
    !a && b !== 0 && !ee(b) && c === -1 && (c = y);
    const v = c === -1 ? t + 1 : c;
    if (b !== 0 && !ee(b) && y < v) {
      e.lineIndent = y, e.position = g + y;
      break;
    }
    la(e), p = e.position, ee(e.input.charCodeAt(e.position)) && (Ai(e), p = e.position);
  }
  return al(e, d, p), wt(e, d, p, i.anchorStart, i.anchorEnd, i.tagStart, i.tagEnd, s, r, c), !0;
}
function Vb(e, t) {
  const i = e.input.charCodeAt(e.position), n = t === mt;
  if (i === 0 || ge(i) || i === 35 || i === 38 || i === 42 || i === 33 || i === 124 || i === 62 || i === 39 || i === 34 || i === 37 || i === 64 || i === 96 || n && Xe(i)) return !1;
  if (i === 63 || i === 45) {
    const r = e.input.charCodeAt(e.position + 1);
    if (Ae(r) || n && Xe(r)) return !1;
  }
  return !0;
}
function Yb(e, t, i, n) {
  if (!Vb(e, i)) return !1;
  const r = e.position;
  let o = e.position, a = e.input.charCodeAt(e.position);
  const s = i === mt;
  let l = !1;
  for (; a !== 0 && !Pr(e); ) {
    if (a === 58) {
      const c = e.input.charCodeAt(e.position + 1);
      if (Ae(c) || s && Xe(c)) break;
    } else if (a === 35) {
      if (ge(e.input.charCodeAt(e.position - 1))) break;
    } else {
      if (s && Xe(a)) break;
      if (ee(a)) {
        const c = e.position, h = e.line, d = e.lineStart, p = e.lineIndent;
        if (re(e, !1), e.lineIndent >= t) {
          l = !0, a = e.input.charCodeAt(e.position);
          continue;
        }
        e.position = c, e.line = h, e.lineStart = d, e.lineIndent = p;
        break;
      }
    }
    xt(a) || (o = e.position + 1), a = e.input.charCodeAt(++e.position);
  }
  return o === r ? !1 : (al(e, r, o), wt(e, r, o, n.anchorStart, n.anchorEnd, n.tagStart, n.tagEnd, O.PLAIN, _e.CLIP, -1, !l), !0);
}
function Ct(e, t) {
  const i = e.line;
  re(e, !0), (e.line > i && e.lineIndent < t || e.firstTabInLine !== -1 && e.lineIndent < t) && A(e, "deficient indentation");
}
function Zb(e, t, i) {
  const n = e.input.charCodeAt(e.position), r = n === 123, o = e.position;
  let a = !0;
  if (n !== 91 && n !== 123) return !1;
  const s = r ? 125 : 93;
  for (r ? rl(e, o, i.anchorStart, i.anchorEnd, i.tagStart, i.tagEnd, fe.FLOW) : nl(e, o, i.anchorStart, i.anchorEnd, i.tagStart, i.tagEnd, fe.FLOW), e.position++; e.input.charCodeAt(e.position) !== 0; ) {
    Ct(e, t);
    let l = e.input.charCodeAt(e.position);
    if (l === s)
      return e.position++, dt(e), !0;
    a ? l === 44 && A(e, "expected the node content, but found ','") : A(e, "missed comma between flow collection entries");
    let c = !1, h = !1;
    l === 63 && ge(e.input.charCodeAt(e.position + 1)) && (c = h = !0, e.position += 1, Ct(e, t));
    const d = e.line, p = ht(e), g = yt(e, t, mt, !1, !0);
    Ct(e, t), l = e.input.charCodeAt(e.position), (r || h || e.line === d) && l === 58 ? (c = !0, e.position++, Ct(e, t), r || aa(e, p), g || ae(e), yt(e, t, mt, !1, !0) || ae(e), Ct(e, t), r || dt(e)) : r && c ? (g || ae(e), ae(e)) : r ? ae(e) : c && (aa(e, p), g || ae(e), ae(e), dt(e)), l = e.input.charCodeAt(e.position), l === 44 ? (a = !0, e.position++) : a = !1;
  }
  A(e, "unexpected end of the stream within a flow collection");
}
function ca(e, t, i) {
  if (e.firstTabInLine !== -1 || e.input.charCodeAt(e.position) !== 45 || !Ae(e.input.charCodeAt(e.position + 1))) return !1;
  for (nl(e, e.position, i.anchorStart, i.anchorEnd, i.tagStart, i.tagEnd, fe.BLOCK); e.input.charCodeAt(e.position) === 45 && Ae(e.input.charCodeAt(e.position + 1)); ) {
    e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, A(e, "tab characters must not be used in indentation"));
    const n = e.line;
    e.position++;
    const r = re(e, !0) > 0;
    if (e.firstTabInLine !== -1 && e.input.charCodeAt(e.position) === 45 && Ae(e.input.charCodeAt(e.position + 1)) && A(e, "bad indentation of a sequence entry"), r && e.lineIndent <= t ? ae(e) : yt(e, t, el, !1, !0), re(e, !0), e.lineIndent < t || e.position >= e.length) break;
    e.lineIndent > t && A(e, "bad indentation of a sequence entry"), e.line === n && e.input.charCodeAt(e.position) === 45 && Ae(e.input.charCodeAt(e.position + 1)) && A(e, "bad indentation of a sequence entry");
  }
  return dt(e), !0;
}
function fn(e, t, i, n) {
  let r = !1, o = !1, a = !1, s = !1;
  if (e.firstTabInLine !== -1) return !1;
  let l = e.input.charCodeAt(e.position);
  for (; l !== 0; ) {
    !r && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, A(e, "tab characters must not be used in indentation"));
    const c = e.input.charCodeAt(e.position + 1), h = e.line;
    if ((l === 63 || l === 58) && Ae(c))
      a || (rl(e, e.position, n.anchorStart, n.anchorEnd, n.tagStart, n.tagEnd, fe.BLOCK), a = !0), l === 63 ? (r && ae(e), o = !0, r = !0) : (r || (ae(e), o = !0), r = !1), e.position += 1, s = !0;
    else {
      r && (ae(e), r = !1);
      const d = ht(e);
      if (!yt(e, i, Js, !1, !0)) break;
      if (e.line === h) {
        for (l = e.input.charCodeAt(e.position); xt(l); ) l = e.input.charCodeAt(++e.position);
        if (l === 58)
          l = e.input.charCodeAt(++e.position), Ae(l) || A(e, "a whitespace character is expected after the key-value separator within a block mapping"), a || (e.events.splice(d.eventsLength, 0, {
            type: te.MAPPING,
            start: d.position,
            anchorStart: n.anchorStart,
            anchorEnd: n.anchorEnd,
            tagStart: n.tagStart,
            tagEnd: n.tagEnd,
            style: fe.BLOCK
          }), a = !0), o = !0, r = !1, s = !1;
        else if (o) A(e, "expected ':' after a mapping key");
        else
          return n.anchorStart !== R || n.tagStart !== R ? (pt(e, d), !1) : !0;
      } else if (o) A(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return n.anchorStart !== R || n.tagStart !== R ? (pt(e, d), !1) : !0;
    }
    if (yt(e, t, Ei, !0, s) && (s = !1), r || s && (ae(e), s = !1), re(e, !0), l = e.input.charCodeAt(e.position), (e.line === h || e.lineIndent > t) && l !== 0) A(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t) break;
  }
  return o ? (r && ae(e), a && dt(e), !0) : !1;
}
function yt(e, t, i, n, r, o = !0) {
  e.depth >= e.maxDepth && A(e, `nesting exceeded maxDepth (${e.maxDepth})`), e.depth++;
  let a = 1, s = !1, l = !1, c = null;
  const h = sa();
  let d = i === Ei || i === el, p = d;
  const g = d;
  if (n && re(e, !0) && (s = !0, e.lineIndent > t ? a = 1 : e.lineIndent === t ? a = 0 : a = -1), a === 1) for (; ; ) {
    const y = e.input.charCodeAt(e.position), b = ht(e);
    if (s && a !== 1 && (y === 33 || y === 38)) break;
    if (s && g && (h.tagStart !== R || h.anchorStart !== R) && (y === 33 || y === 38)) {
      const v = ht(e), w = t + 1;
      if (fn(e, e.position - e.lineStart, w, h) && e.events[v.eventsLength]?.type === te.MAPPING)
        return e.depth--, !0;
      pt(e, v);
    }
    if (s && (y === 33 && h.tagStart !== R || y === 38 && h.anchorStart !== R) || !Ub(e, h, i === mt) && !jb(e, h)) break;
    c === null && (c = b), re(e, !0) ? (s = !0, p = g, e.lineIndent > t ? a = 1 : e.lineIndent === t ? a = 0 : a = -1) : p = !1;
  }
  if (p && (p = s || r), a === 1 || i === Ei) {
    const y = i === mt || i === Js ? t : t + 1, b = e.position - e.lineStart;
    if (a === 1) if (p && (ca(e, b, h) || fn(e, b, y, h)) || Zb(e, y, h)) l = !0;
    else {
      const v = e.input.charCodeAt(e.position);
      if (c !== null && o && g && !p && v !== 124 && v !== 62) {
        const w = ht(e), E = c.position - c.lineStart;
        pt(e, c), fn(e, E, y, sa()) && e.events[w.eventsLength]?.type === te.MAPPING ? l = !0 : pt(e, w);
      }
      !l && (d && Gb(e, y, h) || Kb(e, y, h) || qb(e, y, h) || Wb(e, h) || Yb(e, y, i, h)) && (l = !0);
    }
    else a === 0 && (l = p && ca(e, b, h));
  }
  return d = d && !l, !l && (h.anchorStart !== R || h.tagStart !== R || d) && (wt(e, R, R, h.anchorStart, h.anchorEnd, h.tagStart, h.tagEnd, O.PLAIN), l = !0), e.depth--, l || h.anchorStart !== R || h.tagStart !== R;
}
function Xb(e) {
  if (e.lineIndent > 0 || e.input.charCodeAt(e.position) !== 37) return !1;
  e.position++;
  const t = e.position;
  for (; e.input.charCodeAt(e.position) !== 0 && !ge(e.input.charCodeAt(e.position)); ) e.position++;
  const i = e.input.slice(t, e.position), n = [];
  for (i.length === 0 && A(e, "directive name must not be less than one character in length"); e.input.charCodeAt(e.position) !== 0 && !ee(e.input.charCodeAt(e.position)); ) {
    for (; xt(e.input.charCodeAt(e.position)); ) e.position++;
    if (e.input.charCodeAt(e.position) === 35 || ee(e.input.charCodeAt(e.position)) || e.input.charCodeAt(e.position) === 0) break;
    const r = e.position;
    for (; e.input.charCodeAt(e.position) !== 0 && !ge(e.input.charCodeAt(e.position)); ) e.position++;
    n.push(e.input.slice(r, e.position));
  }
  if (ee(e.input.charCodeAt(e.position)) && Ai(e), i === "YAML") {
    e.directives.some((o) => o.kind === "yaml") && A(e, "duplication of %YAML directive"), n.length !== 1 && A(e, "YAML directive accepts exactly one argument");
    const r = /^([0-9]+)\.([0-9]+)$/.exec(n[0]);
    r === null && A(e, "ill-formed argument of the YAML directive"), parseInt(r[1], 10) !== 1 && A(e, "unacceptable YAML version of the document"), e.directives.push({
      kind: "yaml",
      version: n[0]
    });
  } else if (i === "TAG") {
    n.length !== 2 && A(e, "TAG directive accepts exactly two arguments");
    const [r, o] = n;
    tl.test(r) || A(e, "ill-formed tag handle (first argument) of the TAG directive"), Qs.call(e.tagHandlers, r) && A(e, `there is a previously declared suffix for "${r}" tag handle`), Fb.test(o) || A(e, "ill-formed tag prefix (second argument) of the TAG directive"), e.tagHandlers[r] = o, e.directives.push({
      kind: "tag",
      handle: r,
      prefix: o
    });
  }
  return !0;
}
function Qb(e) {
  e.directives = [], e.tagHandlers = /* @__PURE__ */ Object.create(null);
  let t = !1;
  for (re(e, !0); Xb(e); )
    t = !0, re(e, !0);
  let i = !1, n = !1, r = !0;
  if (e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 && Ae(e.input.charCodeAt(e.position + 3))) {
    i = !0;
    const s = e.line;
    e.position += 3, re(e, !0), r = e.line > s;
  } else t && A(e, "directives end mark is expected");
  const o = e.events.length;
  if (!i && e.position === e.lineStart && e.input.charCodeAt(e.position) === 46 && gt(e)) {
    e.position += 3, re(e, !0);
    return;
  }
  if (Nb(e, i, !1), yt(e, e.lineIndent - 1, Ei, !1, r, r) || ae(e), re(e, !0), e.position === e.lineStart && gt(e) && (n = e.input.charCodeAt(e.position) === 46, n)) {
    const s = e.line;
    e.position += 3, re(e, !0), e.line === s && e.position < e.length && A(e, "end of the stream or a document separator is expected");
  }
  const a = e.events[o];
  a?.type === te.DOCUMENT && (a.explicitEnd = n), dt(e), !n && e.position < e.length && !Pr(e) && A(e, "end of the stream or a document separator is expected");
}
function Jb(e, t) {
  const i = e.length, n = {
    ...Mr,
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
  for (r !== -1 && He.throwAt(e, r, "null byte is not allowed in input", n.filename); n.position < n.length && (ol(n), re(n, !0), !(n.position >= n.length)); ) {
    const o = n.position;
    Qb(n), n.position === o && A(n, "can not read a document");
  }
  return n.events;
}
var ev = {
  ...Mr,
  ...Lr
};
function tv(e, t = {}) {
  const i = {
    ...ev,
    ...t
  }, n = String(e), r = Object.keys(Mr), o = Object.keys(Lr);
  return Ib(Jb(n, Fn(i, r)), {
    ...Fn(i, o),
    source: n
  });
}
function Fr(e, t) {
  const i = tv(e, t);
  if (i.length === 0) throw new He("expected a document, but the input is empty");
  if (i.length === 1) return i[0];
  throw new He("expected a single document in the stream, but found more");
}
var Ke = Symbol("INVALID");
function iv(e) {
  const t = new Set([
    e.defaultScalarTag,
    e.defaultSequenceTag,
    e.defaultMappingTag
  ].filter((o) => o !== void 0)), i = e.implicitScalarTags, n = e.tags.filter((o) => !(o.nodeKind === "scalar" && o.implicit) && !t.has(o)), r = e.tags.filter((o) => t.has(o));
  return [
    ...i.map((o) => ({
      tag: o,
      implicitTag: !0
    })),
    ...n.map((o) => ({
      tag: o,
      implicitTag: !1
    })),
    ...r.map((o) => ({
      tag: o,
      implicitTag: !0
    }))
  ];
}
function nv(e, t) {
  for (let i = 0, n = e.representTypes.length; i < n; i += 1) {
    const { tag: r, implicitTag: o } = e.representTypes[i];
    if (r.identify(t)) {
      let a;
      return r.matchByTagPrefix ? a = r.representTagName(t) : a = r.tagName, {
        tag: r,
        tagName: a,
        implicitTag: o
      };
    }
  }
  return null;
}
function Lt(e, t) {
  if (!e.noRefs && t !== null && typeof t == "object") {
    const c = e.refs.get(t);
    if (c)
      return c.anchor === void 0 && (c.anchor = `ref_${e.refCounter++}`), {
        kind: "alias",
        anchor: c.anchor
      };
  }
  const i = nv(e, t);
  if (!i) {
    if (t === void 0 || e.skipInvalid) return Ke;
    throw new He(`unacceptable kind of an object to dump ${Object.prototype.toString.call(t)}`);
  }
  const { tag: n, tagName: r, implicitTag: o } = i, a = o ? r : Ys(r);
  if (n.nodeKind === "scalar") return {
    kind: "scalar",
    tag: a,
    tagged: !o,
    style: O.PLAIN,
    value: n.represent(t)
  };
  if (n.nodeKind === "sequence") {
    const c = n.represent(t), h = {
      kind: "sequence",
      tag: a,
      tagged: !o,
      style: fe.BLOCK,
      items: []
    };
    e.noRefs || e.refs.set(t, h);
    for (let d = 0, p = c.length; d < p; d += 1) {
      let g = Lt(e, c[d]);
      g === Ke && c[d] === void 0 && (g = Lt(e, null)), g !== Ke && h.items.push(g);
    }
    return h;
  }
  const s = n.represent(t), l = {
    kind: "mapping",
    tag: a,
    tagged: !o,
    style: fe.BLOCK,
    items: []
  };
  e.noRefs || e.refs.set(t, l);
  for (const [c, h] of s) {
    const d = Lt(e, c);
    if (d === Ke) continue;
    const p = Lt(e, h);
    p !== Ke && l.items.push({
      key: d,
      value: p
    });
  }
  return l;
}
function rv(e, t, i = {}) {
  const n = Lt({
    representTypes: iv(t),
    noRefs: i.noRefs ?? !1,
    skipInvalid: i.skipInvalid ?? !1,
    refs: /* @__PURE__ */ new Map(),
    refCounter: 0
  }, e);
  return [{
    contents: n === Ke ? null : n,
    directives: []
  }];
}
var ov = Symbol("visit:break"), sl = Symbol("visit:skip");
function si(e, t, i) {
  const n = t(e, i);
  if (n === ov) return !0;
  if (n === sl) return !1;
  const r = i.depth + 1;
  switch (e.kind) {
    case "sequence":
      for (const o of e.items) if (si(o, t, {
        depth: r,
        parent: e,
        isKey: !1
      })) return !0;
      break;
    case "mapping":
      for (const { key: o, value: a } of e.items)
        if (si(o, t, {
          depth: r,
          parent: e,
          isKey: !0
        }) || si(a, t, {
          depth: r,
          parent: e,
          isKey: !1
        })) return !0;
      break;
  }
  return !1;
}
function da(e, t) {
  for (const i of e) if (i.contents && si(i.contents, t, {
    depth: 0,
    parent: null,
    isKey: !1
  })) return;
}
function Qi(e, t) {
  return (e & 1 << t) !== 0;
}
var ha = {
  applyQuoteFlowKeysOption: av,
  doubleQuoteForInvisibles: sv,
  doubleQuoteWhitespaceOnly: lv,
  applyForceQuotesOption: cv,
  tryLongOrMultilineAsBlock: dv,
  quoteInvalidPlain: hv,
  fallbackToDoubleQuoted: pv
};
function ll(e) {
  return e.presenterOptions.quoteStyle === "single" && Qi(e.allowedStylesMask, O.SINGLE_QUOTED) ? O.SINGLE_QUOTED : O.DOUBLE_QUOTED;
}
function av(e) {
  e.presenterOptions.quoteFlowKeys && (!e.isKey || !e.flowOnly || e.style !== O.PLAIN || (e.style = O.DOUBLE_QUOTED));
}
function sv(e) {
  e.style === O.PLAIN && /[\t\x7F-\xA0\u2028\u2029\uFEFF\uFFFE\uFFFF]/.test(e.node.value) && (e.style = O.DOUBLE_QUOTED);
}
function lv(e) {
  e.style === O.PLAIN && /^\s+$/.test(e.node.value) && (e.style = O.DOUBLE_QUOTED);
}
function cv(e) {
  e.presenterOptions.forceQuotes && (e.isKey || e.style !== O.PLAIN || e.node.tag === e.presenterOptions.schema.defaultScalarTag.tagName && (e.style = e.node.value.includes(`
`) ? O.DOUBLE_QUOTED : ll(e)));
}
function dv(e) {
  if (e.style !== O.PLAIN || e.isKey) return;
  const t = e.node.value, i = t.indexOf(`
`) !== -1;
  if (!Qi(e.allowedStylesMask, O.LITERAL_BLOCK)) {
    i && (e.style = O.DOUBLE_QUOTED);
    return;
  }
  const n = e.presenterOptions.lineWidth;
  if (n === -1) {
    i && (e.style = O.LITERAL_BLOCK);
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
  a ? e.style = O.FOLDED_BLOCK : i && (e.style = O.LITERAL_BLOCK);
}
function hv(e) {
  e.style === O.PLAIN && !Qi(e.allowedStylesMask, O.PLAIN) && (e.style = ll(e));
}
function pv(e) {
  Qi(e.allowedStylesMask, e.style) || (e.style = O.DOUBLE_QUOTED);
}
function It(e, t) {
  return e | 1 << t;
}
var uv = "[\\x09\\x0A\\x0D\\x20-\\x7E\\x85\\xA0-\\uD7FF\\uE000-\\uFFFD\\u{10000}-\\u{10FFFF}]", fv = "[\\n\\r]", mv = "\\uFEFF", Nr = "[ \\t]", cl = `(?:(?!(?:${fv}|${mv}))${uv})`, Ji = `(?:(?!${Nr})${cl})`, dl = "[\\x09\\x20-\\uD7FF\\uE000-\\uFFFF\\u{10000}-\\u{10FFFF}]", hl = "[-?:,\\[\\]{}#&*!|>'\"%@`]", gv = "[,\\[\\]{}]", Dn = Ji, zn = `(?:(?!${gv})${Ji})`, yv = `(?:(?:(?!${hl})${Ji})|[?:-](?=${Dn}))`, bv = `(?:(?:(?!${hl})${Ji})|[?:-](?=${zn}))`, pl = `(?:(?:(?![:#])${Dn})|:(?=${Dn}))#*`, ul = `(?:(?:(?![:#])${zn})|:(?=${zn}))#*`, fl = `(?:${Nr}*${pl})*`, ml = `(?:${Nr}*${ul})*`, gl = `${yv}#*${fl}`, yl = `${bv}#*${ml}`, vv = gl, _v = yl, wv = `\\n+${pl}${fl}`, xv = `\\n+${ul}${ml}`, $v = `${gl}(?:${wv})*`, kv = `${yl}(?:${xv})*`, Sv = new RegExp(`^(?:${$v})$`, "u"), Ev = new RegExp(`^(?:${kv})$`, "u"), Av = new RegExp(`^(?:${vv})$`, "u"), Tv = new RegExp(`^(?:${_v})$`, "u"), Cv = new RegExp(`^(?:${dl})*$`, "u"), Iv = new RegExp(`^(?:${dl}|\\n)*$`, "u"), Ov = new RegExp(`^(?:${cl}|\\n)*$`, "u"), Lv = /^(?:---|\.\.\.)(?=$|[ \t\n\r])/, Rr = /^(?:---|\.\.\.)(?=$|[ \t\n\r])/m;
function Mv(e) {
  const t = e.node.value;
  if (t !== "") {
    if (!(e.isKey ? e.flowOnly ? Tv : Av : e.flowOnly ? Ev : Sv).test(t) || e.shiftOfFirstLine === 0 && Lv.test(t)) return !1;
    if (e.shiftOfContent === 0) {
      const n = t.indexOf(`
`);
      if (n !== -1) {
        const r = t.slice(n + 1);
        if (Rr.test(r)) return !1;
      }
    }
  }
  const i = e.presenterOptions.schema.resolveImplicitScalarTag(t).tag.tagName;
  return !(!e.node.tagged && i !== e.node.tag || !e.node.tagged && t === "=" && i === e.presenterOptions.schema.defaultScalarTag.tagName);
}
function Pv(e) {
  const t = e.node.value;
  if (!(e.isKey ? Cv : Iv).test(t) || /[ \t]\n|\n[ \t]/.test(t)) return !1;
  if (!e.isKey && e.shiftOfContent === 0) {
    const i = t.indexOf(`
`);
    if (i !== -1 && Rr.test(t.slice(i + 1))) return !1;
  }
  return !0;
}
function Fv(e) {
  if (e.flowOnly || !Ov.test(e.node.value)) return !1;
  const t = e.shiftOfContent - e.shiftOfParent;
  return !(t < 1 || t > 9 && /^\n* /.test(e.node.value) || e.shiftOfContent === 0 && Rr.test(e.node.value));
}
function Nv(e) {
  let t = It(0, O.DOUBLE_QUOTED);
  Mv(e) && (t = It(t, O.PLAIN)), Pv(e) && (t = It(t, O.SINGLE_QUOTED)), Fv(e) && (t = It(It(t, O.LITERAL_BLOCK), O.FOLDED_BLOCK)), e.allowedStylesMask = t;
}
function Rv(e) {
  switch (e.style) {
    case O.PLAIN:
      return Dv(e);
    case O.SINGLE_QUOTED:
      return zv(e);
    case O.LITERAL_BLOCK:
      return Hv(e);
    case O.FOLDED_BLOCK:
      return Bv(e);
    case O.DOUBLE_QUOTED:
      return Uv(e);
  }
}
function Dv(e) {
  return bl(e.node.value, e.shiftOfContent);
}
function zv(e) {
  return `'${bl(e.node.value, e.shiftOfContent).replace(/'/g, "''")}'`;
}
function Hv(e) {
  const t = e.node.value;
  return "|" + _l(t, e.shiftOfParent, e.shiftOfContent) + wl(vl(t, e.shiftOfContent));
}
function Bv(e) {
  const t = e.node.value, i = e.presenterOptions.lineWidth;
  let n = 1 / 0;
  return i !== -1 && (n = Math.max(Math.min(i, 40), i - e.shiftOfContent)), ">" + _l(t, e.shiftOfParent, e.shiftOfContent) + wl(vl(Wv(t, n), e.shiftOfContent));
}
function Uv(e) {
  return `"${Gv(e.node.value)}"`;
}
function bl(e, t) {
  let i = e.indexOf(`
`);
  if (i === -1) return e;
  const n = " ".repeat(t);
  let r = e.slice(0, i);
  const o = /(\n+)([^\n]*)/g;
  o.lastIndex = i;
  let a;
  for (; a = o.exec(e); ) {
    const s = a[1].length, l = a[2];
    r += `
`.repeat(s + 1) + n + l;
  }
  return r;
}
function vl(e, t) {
  const i = " ".repeat(t);
  let n = 0, r = "";
  const o = e.length;
  for (; n < o; ) {
    let a;
    const s = e.indexOf(`
`, n);
    s === -1 ? (a = e.slice(n), n = o) : (a = e.slice(n, s + 1), n = s + 1), a.length && a !== `
` && (r += i), r += a;
  }
  return r;
}
function jv(e) {
  return /^\n* /.test(e);
}
function _l(e, t, i) {
  const n = jv(e) ? String(i - t) : "", r = e[e.length - 1] === `
`;
  return `${n}${r && (e[e.length - 2] === `
` || e === `
`) ? "+" : r ? "" : "-"}
`;
}
function wl(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function Hn(e) {
  return e === " " || e === "	";
}
function pa(e, t) {
  if (e === "" || Hn(e[0])) return e;
  const i = / [^ \t]/g;
  let n, r = 0, o, a = 0, s = 0, l = "";
  for (; n = i.exec(e); )
    s = n.index, s - r > t && (o = a > r ? a : s, l += `
${e.slice(r, o)}`, r = o + 1), a = s;
  return l += `
`, e.length - r > t && a > r ? l += `${e.slice(r, a)}
${e.slice(a + 1)}` : l += e.slice(r), l.slice(1);
}
function Wv(e, t) {
  const i = /(\n+)([^\n]*)/g;
  let n = e.indexOf(`
`);
  n === -1 && (n = e.length), i.lastIndex = n;
  let r = pa(e.slice(0, n), t), o = e[0] === `
` || Hn(e[0]), a, s;
  for (; s = i.exec(e); ) {
    const l = s[1], c = s[2];
    a = c !== "" && Hn(c[0]), r += l + (!o && !a && c !== "" ? `
` : "") + pa(c, t), o = a;
  }
  return r;
}
var Kv = /["\\\x00-\x1F\x7F-\xA0\u2028\u2029\uD800-\uDFFF\uFEFF\uFFFE\uFFFF]/gu;
function qv(e) {
  switch (e) {
    case "\0":
      return "\\0";
    case "\x07":
      return "\\a";
    case "\b":
      return "\\b";
    case "	":
      return "\\t";
    case `
`:
      return "\\n";
    case "\v":
      return "\\v";
    case "\f":
      return "\\f";
    case "\r":
      return "\\r";
    case "\x1B":
      return "\\e";
    case '"':
      return '\\"';
    case "\\":
      return "\\\\";
    case "":
      return "\\N";
    case " ":
      return "\\_";
    case "\u2028":
      return "\\L";
    case "\u2029":
      return "\\P";
  }
  const t = e.charCodeAt(0), i = t.toString(16).toUpperCase();
  return t <= 255 ? `\\x${"0".repeat(2 - i.length)}${i}` : `\\u${"0".repeat(4 - i.length)}${i}`;
}
function Gv(e) {
  return e.replace(Kv, qv);
}
var Ti = 10, Dr = {
  indent: 2,
  seqNoIndent: !1,
  seqInlineFirst: !0,
  lineWidth: 80,
  flowBracketPadding: !1,
  flowSkipCommaSpace: !1,
  flowSkipColonSpace: !1,
  quoteFlowKeys: !1,
  quoteStyle: "single",
  forceQuotes: !1,
  scalarStyleRules: Object.keys(ha).map((e) => Reflect.get(ha, e)),
  tagBeforeAnchor: !1
};
function Vv(e) {
  return e.tagged ? e.tag : Ys(e.tag);
}
function Yv(e) {
  const t = {
    ...Dr,
    ...e
  };
  return t.flowSkipColonSpace && (t.quoteFlowKeys = !0), {
    ...t,
    defaultScalarTagName: t.schema.defaultScalarTag.tagName,
    openEnded: !1
  };
}
function Bn(e, t) {
  return `
${" ".repeat(e.indent * t)}`;
}
function Zv(e, t, i, n, r, o) {
  return {
    node: t,
    parent: i,
    level: n,
    isKey: r,
    flowOnly: o,
    shiftOfParent: n === 0 ? -1 : e.indent * (n - 1),
    shiftOfContent: e.indent * Math.max(1, n),
    shiftOfFirstLine: n === 0 ? 0 : e.indent * n,
    presenterOptions: e,
    allowedStylesMask: 0,
    style: t.style
  };
}
function Xv(e, t, i) {
  let n = "";
  for (let o = 0, a = i.items.length; o < a; o += 1) {
    const s = Ce(e, t, i.items[o], i, {}).text;
    o > 0 && (n += `,${e.flowSkipCommaSpace ? "" : " "}`), n += s;
  }
  const r = e.flowBracketPadding && i.items.length > 0 ? " " : "";
  return `[${r}${n}${r}]`;
}
function ua(e, t, i, n) {
  let r = "";
  for (let o = 0, a = i.items.length; o < a; o += 1) {
    const s = Ce(e, t + 1, i.items[o], i, {
      block: !0,
      compact: e.seqInlineFirst,
      isblockseq: !0
    }).text;
    (!n || r !== "") && (r += Bn(e, t)), s === "" || Ti === s.charCodeAt(0) ? r += "-" : r += "- ", r += s;
  }
  return r;
}
function Qv(e, t, i) {
  let n = "";
  for (const { key: o, value: a } of i.items) {
    let s = "";
    n !== "" && (s += `,${e.flowSkipCommaSpace ? "" : " "}`);
    const l = Ce(e, t, o, i, { iskey: !0 }), c = l.text, h = Ce(e, t, a, i, {}).text, d = e.flowSkipColonSpace || h === "" ? "" : " ", p = o.kind === "scalar" && l.noBody && (o.tagged || o.anchor !== void 0), g = o.kind === "alias" || p ? " " : "";
    s += `${c}${g}:${d}${h}`, n += s;
  }
  const r = e.flowBracketPadding && n !== "" ? " " : "";
  return `{${r}${n}${r}}`;
}
function Jv(e, t, i, n) {
  let r = "";
  for (let o = 0, a = i.items.length; o < a; o += 1) {
    let s = "";
    (!n || r !== "") && (s += Bn(e, t));
    const { key: l, value: c } = i.items[o], h = (l.kind === "mapping" || l.kind === "sequence") && l.style === fe.BLOCK && l.items.length !== 0 || l.kind === "scalar" && (l.style === O.LITERAL_BLOCK || l.style === O.FOLDED_BLOCK), d = h ? Ce(e, t + 1, l, i, {
      block: !0,
      compact: !0,
      isblockseq: !Un(e, l, t + 1)
    }) : Ce(e, t + 1, l, i, {
      block: !0,
      compact: !0,
      iskey: !0
    }), p = d.text, g = l.kind === "scalar" && l.value.indexOf(`
`) !== -1, y = p.length > 1024 && /^[\s\S]{1025}/u.test(p), b = h || g || y;
    b && (p && Ti === p.charCodeAt(0) ? s += "?" : s += "? "), s += p, b && (s += Bn(e, t));
    const v = Ce(e, t + 1, c, i, {
      block: !0,
      compact: b,
      isblockseq: b && !Un(e, c, t + 1)
    }).text, w = l.kind === "scalar" && d.noBody && (l.tagged || l.anchor !== void 0), E = !b && (l.kind === "alias" || w) ? " " : "";
    v === "" || Ti === v.charCodeAt(0) ? s += `${E}:` : s += `${E}: `, s += v, r += s;
  }
  return r;
}
function Un(e, t, i) {
  return t.kind === "alias" ? !0 : t.tagged || t.anchor !== void 0 || e.indent < 2 && i > 0;
}
function Ce(e, t, i, n, r) {
  if (i.kind === "alias")
    return e.openEnded = !1, {
      text: `*${i.anchor}`,
      noBody: !1
    };
  const { block: o = !1, iskey: a = !1, isblockseq: s = !1 } = r;
  let l = r.compact ?? !1;
  const c = i.anchor !== void 0;
  Un(e, i, t) && (l = !1);
  let h, d = i.tagged;
  const p = o && (i.kind === "mapping" || i.kind === "sequence") && i.style === fe.BLOCK && i.items.length !== 0;
  if (i.kind === "mapping") p ? h = Jv(e, t, i, l) : h = Qv(e, t, i);
  else if (i.kind === "sequence") p ? e.seqNoIndent && !s && t > 0 ? h = ua(e, t - 1, i, l) : h = ua(e, t, i, l) : h = Xv(e, t, i);
  else {
    const b = Zv(e, i, n, t, a, !o);
    Nv(b);
    for (const v of e.scalarStyleRules) v(b);
    h = Rv(b), e.openEnded = (b.style === O.LITERAL_BLOCK || b.style === O.FOLDED_BLOCK) && (i.value === `
` || i.value.endsWith(`

`)), d = i.tagged || h === "" && b.flowOnly && n?.kind === "sequence" && !c || b.style !== O.PLAIN && i.tag !== e.defaultScalarTagName;
  }
  (i.kind === "mapping" || i.kind === "sequence") && !p && (e.openEnded = !1), p && l && t > 0 && e.indent > 2 && (h = `${" ".repeat(e.indent - 2)}${h}`);
  const g = h === "";
  let y = h;
  if (d || c) {
    const b = [], v = d ? Vv(i) : null, w = c ? `&${i.anchor}` : null;
    e.tagBeforeAnchor ? (v !== null && b.push(v), w !== null && b.push(w)) : (w !== null && b.push(w), v !== null && b.push(v));
    const E = h === "" || h.charCodeAt(0) === Ti ? "" : " ";
    y = `${b.join(" ")}${E}${h}`;
  }
  return {
    text: y,
    noBody: g
  };
}
function e_(e) {
  return (e.kind === "sequence" || e.kind === "mapping") && e.style === fe.BLOCK && e.items.length !== 0 && !e.tagged && e.anchor === void 0;
}
function t_(e) {
  let t = "";
  for (const i of e.directives) {
    if (i.kind === "yaml") {
      t += `%YAML ${i.version}
`;
      continue;
    }
    const { handle: n, prefix: r } = i;
    t += `%TAG ${n} ${r}
`;
  }
  return t;
}
function i_(e, t) {
  const i = Yv(t);
  let n = "", r = !1;
  for (let o = 0; o < e.length; o += 1) {
    const a = e[o];
    i.openEnded = !1;
    const s = t_(a), l = s !== "", c = a.explicitStart || l || o > 0 && !r;
    if (n += s, a.contents === null)
      c && (n += `---
`);
    else if (c) {
      const h = Ce(i, 0, a.contents, null, {
        block: !0,
        compact: !0
      }).text, d = h === "" ? "" : l || e_(a.contents) ? `
` : " ";
      n += `---${d}${h}
`;
    } else n += Ce(i, 0, a.contents, null, {
      block: !0,
      compact: !0
    }).text + `
`;
    r = a.explicitEnd || i.openEnded, r && (n += `...
`);
  }
  return n;
}
var n_ = {
  ...Dr,
  schema: ub,
  skipInvalid: !1,
  noRefs: !1,
  flowLevel: -1,
  sortKeys: !1,
  transform: () => {
  }
};
function r_(e, t) {
  const i = String(e), n = String(t);
  return i < n ? -1 : i > n ? 1 : 0;
}
function fa(e, t = {}) {
  const i = {
    ...n_,
    ...t
  }, n = rv(e, i.schema, {
    noRefs: i.noRefs,
    skipInvalid: i.skipInvalid
  });
  if (i.flowLevel >= 0 && da(n, (r, o) => {
    if (!(o.depth < i.flowLevel))
      return (r.kind === "sequence" || r.kind === "mapping") && (r.style = fe.FLOW), sl;
  }), i.sortKeys) {
    const r = i.sortKeys === !0 ? r_ : i.sortKeys;
    da(n, (o) => {
      o.kind === "mapping" && o.items.sort((a, s) => r(a.key.kind === "scalar" ? a.key.value : "", s.key.kind === "scalar" ? s.key.value : ""));
    });
  }
  return i.transform(n), i_(n, {
    ...Fn(i, Object.keys(Dr)),
    schema: i.schema
  });
}
function o_(e) {
  const t = Fr(e), i = Array.isArray(t) ? t : t?.cards;
  if (!Array.isArray(i)) throw new Error("Erwartet wird eine Kartenliste oder eine Ansichts-Konfiguration mit `cards:`.");
  return i.forEach((n, r) => {
    if (!n || typeof n != "object" || Array.isArray(n) || !n.type)
      throw new Error(`Karte ${r + 1} hat kein \`type:\`.`);
  }), i;
}
const a_ = "custom:fp-ef-card", jn = (e) => !!e && typeof e == "object" && !Array.isArray(e), xl = (e) => Array.isArray(e.floors) || ["walls", "openings", "items", "texts"].some((t) => Array.isArray(e[t]));
function Wn(e, t = 0) {
  if (!(t > 6)) {
    if (jn(e)) {
      if (typeof e.type == "string" && /easy-floorplan/.test(e.type) && xl(e)) return e;
      for (const i of Object.values(e)) {
        const n = Wn(i, t + 1);
        if (n) return n;
      }
    } else if (Array.isArray(e))
      for (const i of e) {
        const n = Wn(i, t + 1);
        if (n) return n;
      }
  }
}
const ma = (e) => Array.isArray(e) ? e.length : 0;
function s_(e) {
  let t;
  try {
    t = Fr(e);
  } catch (a) {
    throw new Error(`Kein gültiges YAML/JSON: ${a.message.split(`
`)[0]}`);
  }
  const i = jn(t) && xl(t) ? t : Wn(t);
  if (!i) throw new Error("Keine easy-floorplan-Konfiguration gefunden (erwartet: floors, walls, openings …).");
  const n = structuredClone({ ...i, type: a_ }), r = Array.isArray(n.floors) ? n.floors : [], o = (a) => ma(n[a]) + r.reduce((s, l) => s + ma(jn(l) ? l[a] : 0), 0);
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
var l_ = Object.defineProperty, c_ = Object.getOwnPropertyDescriptor, J = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? c_(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (r = (n ? a(t, i, r) : a(r)) || r);
  return n && r && l_(t, i, r), r;
};
const mn = "floorplan_panel", ga = 800, d_ = 700, h_ = [
  ["entities", "Entities"],
  ["glance", "Glance"],
  ["weather-forecast", "Wettervorhersage"],
  ["sensor", "Sensor"],
  ["light", "Licht"],
  ["markdown", "Markdown"],
  ["button", "Button"],
  ["vertical-stack", "Stapel (vertikal)"],
  ["horizontal-stack", "Stapel (horizontal)"]
], p_ = 5 * 60 * 1e3, u_ = "custom:fp-ef-card";
function f_(e) {
  return e?.ef ? structuredClone(e.ef) : { type: u_ };
}
let q = class extends ce {
  constructor() {
    super(...arguments), this.revision = 0, this.edit = !1, this.kiosk = !1, this.narrow = !1, this._status = "", this._error = "", this._narrow = !1, this._importText = "", this._importError = "", this._cardsDraft = [], this._cardsError = "", this._addType = "entities", this._customType = "", this._saving = !1, this._rev = 0, this._onConfigChanged = (e) => {
      const t = e.detail?.config;
      t && (e.stopPropagation(), this._pending = t, clearTimeout(this._timer), this._timer = setTimeout(() => void this._flush(), ga));
    }, this._onAreaTap = (e) => {
      const { areaId: t, zoomed: i } = e.detail, n = this.plan?.ef, r = [...(n?.floors ?? []).map((a) => a.areas ?? []), n?.areas ?? []], o = i ? r.flat().find((a) => a?.id === t) : void 0;
      this._room = o && o.sidebar?.length ? { ...o, name: o.name ?? "", sidebar: o.sidebar } : void 0, this._armResetTimer();
    }, this._armResetTimer = () => {
      if (clearTimeout(this._resetTimer), !this._room) return;
      const e = Number(localStorage.getItem("fp-reset-ms")) || p_;
      this._resetTimer = setTimeout(() => this.resetView(), e);
    }, this._closeRoom = () => {
      this.resetView(), this._room = void 0, clearTimeout(this._resetTimer);
    }, this._openImport = () => {
      this._importText = "", this._importError = "", this._dialog()?.showModal();
    }, this._openCards = () => {
      this._cardsDraft = structuredClone(this._sidebarCards()), this._cardsError = "", this._cardEdit = void 0, this._cardsPaste = void 0, this._cardsDialog()?.showModal();
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
    t && (t.hass = this.hass, (this._loadedEl !== t || !this.edit && e.has("plan")) && (this._loadedEl = t, t.setConfig(f_(this.plan))));
  }
  connectedCallback() {
    super.connectedCallback(), this._ro = new ResizeObserver(() => this._narrow = this.clientWidth < d_), this._ro.observe(this), window.loadCardHelpers?.();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._ro?.disconnect(), clearTimeout(this._resetTimer), this._pending && this._flush();
  }
  async _flush() {
    if (clearTimeout(this._timer), !this._pending || this._saving) {
      this._pending && (this._timer = setTimeout(() => void this._flush(), ga));
      return;
    }
    const e = this._pending;
    this._pending = void 0, await this._saveNow(e);
  }
  async _saveNow(e) {
    this._saving = !0, this._status = "saving", this._error = "";
    try {
      const t = await this.hass.callWS({
        type: `${mn}/plan/save`,
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
  _rooms() {
    const e = this.plan?.ef;
    return [...(e?.floors ?? []).flatMap((t) => t.areas ?? []), ...e?.areas ?? []].filter((t) => t?.sidebar?.length).map((t) => ({ ...t, name: t.name ?? t.id, sidebar: t.sidebar }));
  }
  /** Dienst floorplan_panel.show_room: nur in der Ansicht, nicht im Editor. */
  showRoom(e, t) {
    return this.edit ? !1 : this.renderRoot.querySelector("fp-ef-card")?.showRoom(e, t) ?? !1;
  }
  /** Dienst floorplan_panel.reset_view. */
  resetView() {
    this.edit || (this.renderRoot.querySelector("fp-ef-card")?.resetView(), this._room = void 0, clearTimeout(this._resetTimer));
  }
  _fire(e) {
    this.dispatchEvent(new CustomEvent(e, { bubbles: !0, composed: !0 }));
  }
  async _loadSample() {
    try {
      const e = await this.hass.callWS({ type: `${mn}/plan/load_sample` });
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
      e = s_(this._importText);
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
  _sidebarCards() {
    const e = this.plan?.settings?.sidebarCards;
    return Array.isArray(e) ? e : [];
  }
  _cardsDialog() {
    return this.renderRoot.querySelector("dialog.cards");
  }
  _moveCard(e, t) {
    const i = [...this._cardsDraft], n = e + t;
    n < 0 || n >= i.length || ([i[e], i[n]] = [i[n], i[e]], this._cardsDraft = i);
  }
  _removeCard(e) {
    this._cardsDraft = this._cardsDraft.filter((t, i) => i !== e);
  }
  _cardLabel(e) {
    const t = String(e.type ?? "?").replace(/^custom:/, ""), i = e.title ?? e.name;
    return i ? `${t} – ${i}` : t;
  }
  /** Karten-Klasse über die öffentliche loadCardHelpers-Schnittstelle laden (lädt eingebaute Karten lazy nach). */
  async _cardCtor(e) {
    const t = e.startsWith("custom:") ? e.slice(7) : `hui-${e}-card`;
    try {
      (await window.loadCardHelpers?.())?.createCardElement({ type: e, entities: [] });
    } catch {
    }
    return await Promise.race([customElements.whenDefined(t), new Promise((i) => setTimeout(i, 3e3))]), customElements.get(t);
  }
  async _addCard() {
    if (this._addType === "__yaml") {
      this._cardsDraft = [...this._cardsDraft, { type: "" }], this._cardEdit = { index: this._cardsDraft.length - 1, yaml: !0, yamlText: "type: ", error: "" };
      return;
    }
    const e = this._addType === "__custom" ? this._customType.trim() : this._addType;
    if (!e) return;
    const t = this._addType === "__custom" && !e.startsWith("custom:") ? `custom:${e}` : e, i = await this._cardCtor(t);
    let n = { type: t };
    try {
      const r = await i?.getStubConfig?.(this.hass, Object.keys(this.hass.states ?? {}), []);
      r && typeof r == "object" && (n = { ...r, type: t });
    } catch {
    }
    this._cardsDraft = [...this._cardsDraft, n], await this._editCard(this._cardsDraft.length - 1);
  }
  async _editCard(e) {
    const t = this._cardsDraft[e], i = await this._cardCtor(String(t.type ?? "")), n = typeof i?.getConfigElement == "function";
    if (this._cardEdit = { index: e, yaml: !n, yamlText: fa(t, { lineWidth: 100 }), error: "" }, !n) return;
    await this.updateComplete;
    const r = this.renderRoot.querySelector(".card-editor-host");
    if (r)
      try {
        const o = await i.getConfigElement();
        o.hass = this.hass, o.lovelace = { views: [] }, o.setConfig(t), o.addEventListener("config-changed", (a) => {
          a.stopPropagation();
          const s = a.detail?.config;
          s && (this._cardsDraft = this._cardsDraft.map((l, c) => c === e ? s : l));
        }), r.replaceChildren(o);
      } catch {
        this._cardEdit = { index: e, yaml: !0, yamlText: fa(t, { lineWidth: 100 }), error: "" };
      }
  }
  _applyPaste(e) {
    const t = this._cardsPaste;
    if (t)
      try {
        const i = o_(t.text);
        this._cardsDraft = e ? [...this._cardsDraft, ...i] : i, this._cardsPaste = void 0;
      } catch (i) {
        this._cardsPaste = { ...t, error: i?.message ?? String(i) };
      }
  }
  _finishCardEdit() {
    const e = this._cardEdit;
    if (e) {
      if (e.yaml)
        try {
          const t = Fr(e.yamlText);
          if (!t || typeof t != "object" || Array.isArray(t) || !t.type) throw new Error("Eine Karte braucht `type:`.");
          this._cardsDraft = this._cardsDraft.map((i, n) => n === e.index ? t : i);
        } catch (t) {
          this._cardEdit = { ...e, error: t?.message ?? String(t) };
          return;
        }
      this._cardEdit = void 0;
    }
  }
  async _saveCards() {
    const e = this._cardsDraft.filter((t) => t && t.type);
    try {
      const t = { ...this._plan?.settings ?? {}, sidebarCards: e }, i = await this.hass.callWS({
        type: `${mn}/plan/save`,
        plan: { ...this._plan ?? this.plan ?? {}, settings: t },
        revision: this._rev
      });
      this._plan = i.plan, this._rev = i.revision, this.dispatchEvent(
        new CustomEvent("ef-saved", { detail: { plan: i.plan, revision: i.revision }, bubbles: !0, composed: !0 })
      ), this._cardsDialog()?.close();
    } catch (t) {
      this._cardsError = t?.message ?? String(t);
    }
  }
  _renderCardsDialog() {
    const e = this._cardEdit, t = this._cardsPaste;
    return u`<dialog class="import cards">
      <h3>Karten der Übersicht</h3>
      ${t ? u`<p>
              Kartenliste (<code>- type: …</code>) oder YAML einer Ansicht mit <code>cards:</code> einfügen. Titel, Pfad
              und Badges werden ignoriert.
            </p>
            <textarea
              rows="14"
              .value=${t.text}
              @input=${(i) => this._cardsPaste = { ...t, text: i.target.value }}
            ></textarea>
            ${t.error ? u`<div class="err">${t.error}</div>` : m}
            <div class="row">
              <button @click=${() => this._cardsPaste = void 0}>Zurück</button>
              <button ?disabled=${!t.text.trim()} @click=${() => this._applyPaste(!0)}>Anhängen</button>
              <button class="primary" ?disabled=${!t.text.trim()} @click=${() => this._applyPaste(!1)}>Ersetzen</button>
            </div>` : e ? u`<p>${this._cardLabel(this._cardsDraft[e.index] ?? {})}</p>
            ${e.yaml ? u`<p>Für diesen Kartentyp gibt es keinen Editor – Konfiguration als YAML:</p>
                  <textarea
                    rows="12"
                    .value=${e.yamlText}
                    @input=${(i) => this._cardEdit = { ...e, yamlText: i.target.value }}
                  ></textarea>` : u`<div class="card-editor-host"></div>`}
            ${e.error ? u`<div class="err">${e.error}</div>` : m}
            <div class="row"><button class="primary" @click=${() => this._finishCardEdit()}>Fertig</button></div>` : u`<p>
              Karten, die in der Seitenleiste angezeigt werden, solange kein Raum aktiv ist. Ohne Karten erscheint die
              Raumliste.
            </p>
            <ul class="card-list">
              ${this._cardsDraft.map(
      (i, n) => u`<li>
                  <span>${this._cardLabel(i)}</span>
                  <button title="Nach oben" ?disabled=${n === 0} @click=${() => this._moveCard(n, -1)}>↑</button>
                  <button title="Nach unten" ?disabled=${n === this._cardsDraft.length - 1} @click=${() => this._moveCard(n, 1)}>↓</button>
                  <button @click=${() => void this._editCard(n)}>Bearbeiten</button>
                  <button @click=${() => this._removeCard(n)}>Entfernen</button>
                </li>`
    )}
            </ul>
            <div class="row add">
              <select @change=${(i) => this._addType = i.target.value}>
                ${h_.map(([i, n]) => u`<option value=${i} ?selected=${this._addType === i}>${n}</option>`)}
                <option value="__custom" ?selected=${this._addType === "__custom"}>Custom Card (Typ eingeben)</option>
                <option value="__yaml" ?selected=${this._addType === "__yaml"}>Anderer Typ (YAML)</option>
              </select>
              ${this._addType === "__custom" ? u`<input
                    placeholder="z. B. mushroom-entity-card"
                    .value=${this._customType}
                    @input=${(i) => this._customType = i.target.value}
                  />` : m}
              <button @click=${() => void this._addCard()}>Karte hinzufügen</button>
              <button @click=${() => this._cardsPaste = { text: "", error: "" }}>Liste per YAML einfügen</button>
            </div>
            ${this._cardsError ? u`<div class="err">${this._cardsError}</div>` : m}
            <div class="row">
              <button @click=${() => this._cardsDialog()?.close()}>Abbrechen</button>
              <button class="primary" @click=${() => void this._saveCards()}>Speichern</button>
            </div>`}
    </dialog>`;
  }
  _renderIdle() {
    const e = this._rooms(), t = this._sidebarCards(), n = !!this.hass?.user?.is_admin && !this.kiosk ? u`<button class="cards-edit" title="Karten der Übersicht bearbeiten" @click=${this._openCards}>
          <ha-icon icon="mdi:pencil"></ha-icon>Übersicht-Karten
        </button>` : m;
    return t.length ? u`<div class="idle">
        ${t.map((r) => u`<hui-card .hass=${this.hass} .config=${r}></hui-card>`)} ${n}
      </div>` : u`<div class="idle">
      <h3>Übersicht</h3>
      <p>Raum im Plan antippen, um seine Geräte, Szenen und Skripte zu sehen.</p>
      ${e.map(
      (r) => u`<button @click=${() => this.showRoom(r.id)}><ha-icon icon="mdi:floor-plan"></ha-icon>${r.name}</button>`
    )}
      ${n}
    </div>`;
  }
  render() {
    if (!this.edit && !this.plan?.ef) {
      const e = !!this.hass?.user?.is_admin;
      return u`<div class="empty">
        <ha-icon icon="mdi:floor-plan"></ha-icon>
        <p>Noch kein Grundriss gezeichnet.</p>
        ${this._status === "error" ? u`<p class="err">${this._error}</p>` : m}
        ${e ? u`<div class="row">
              <button class="primary" @click=${() => this._fire("ef-edit-request")}>Editor öffnen</button>
              <button @click=${this._loadSample}>Beispiel-Grundriss laden</button>
            </div>` : u`<p>Ein Administrator kann ihn im Editor anlegen oder importieren.</p>`}
      </div>`;
    }
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
        ${this._importError ? u`<div class="err">${this._importError}</div>` : m}
        <div class="row">
          <button @click=${() => this._dialog()?.close()}>Abbrechen</button>
          <button class="primary" ?disabled=${!this._importText.trim()} @click=${this._applyImport}>Als Entwurf laden</button>
        </div>
      </dialog>
    ` : u`<div class="layout ${this._narrow ? "narrow" : ""}">
        <fp-ef-card @fp-area-tap=${this._onAreaTap}></fp-ef-card>
        ${this._renderCardsDialog()}
        <aside class="side" @pointerdown=${this._armResetTimer} @keydown=${this._armResetTimer} @change=${this._armResetTimer}>
          ${this._room ? u`<fp-room-sidebar
                .hass=${this.hass}
                .area=${this._room}
                .canEdit=${!1}
                @close=${this._closeRoom}
              ></fp-room-sidebar>` : this._renderIdle()}
        </aside>
      </div>`;
  }
};
q.styles = $e`
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .layout {
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: row;
    }
    .layout.narrow {
      flex-direction: column;
    }
    .layout fp-ef-card {
      flex: 1;
      min-width: 0;
      min-height: 0;
    }
    .side {
      flex: none;
      width: 380px;
      display: flex;
      flex-direction: column;
      min-height: 0;
      overflow: auto;
      border-left: 1px solid var(--divider-color);
      background: var(--card-background-color, #fff);
    }
    .layout.narrow .side {
      width: auto;
      height: 40%;
      border-left: none;
      border-top: 1px solid var(--divider-color);
    }
    .side fp-room-sidebar {
      flex: 1;
      min-height: 0;
    }
    .idle {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    dialog.cards .card-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    dialog.cards .card-list li {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    dialog.cards .card-list li span {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    dialog.cards .row.add {
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
    }
    dialog.cards select,
    dialog.cards input {
      font: inherit;
      padding: 4px 8px;
    }
    .idle .cards-edit {
      align-self: flex-start;
      font-size: 12px;
      padding: 4px 10px;
      color: var(--secondary-text-color);
    }
    .idle h3 {
      margin: 0;
    }
    .idle p {
      margin: 0 0 8px;
      color: var(--secondary-text-color);
    }
    .idle button {
      font: inherit;
      display: flex;
      align-items: center;
      gap: 8px;
      border: 1px solid var(--divider-color);
      background: none;
      color: var(--primary-text-color);
      border-radius: 12px;
      padding: 10px 12px;
      cursor: pointer;
      text-align: left;
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
J([
  I({ attribute: !1 })
], q.prototype, "hass", 2);
J([
  I({ attribute: !1 })
], q.prototype, "plan", 2);
J([
  I({ type: Number })
], q.prototype, "revision", 2);
J([
  I({ type: Boolean })
], q.prototype, "edit", 2);
J([
  I({ type: Boolean })
], q.prototype, "kiosk", 2);
J([
  I({ attribute: !1 })
], q.prototype, "narrow", 2);
J([
  T()
], q.prototype, "_status", 2);
J([
  T()
], q.prototype, "_error", 2);
J([
  T()
], q.prototype, "_room", 2);
J([
  T()
], q.prototype, "_narrow", 2);
J([
  T()
], q.prototype, "_importText", 2);
J([
  T()
], q.prototype, "_importError", 2);
J([
  T()
], q.prototype, "_cardsDraft", 2);
J([
  T()
], q.prototype, "_cardsError", 2);
J([
  T()
], q.prototype, "_cardEdit", 2);
J([
  T()
], q.prototype, "_cardsPaste", 2);
J([
  T()
], q.prototype, "_addType", 2);
J([
  T()
], q.prototype, "_customType", 2);
q = J([
  Oe("fp-ef-host")
], q);
var m_ = Object.defineProperty, g_ = Object.getOwnPropertyDescriptor, Me = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? g_(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (r = (n ? a(t, i, r) : a(r)) || r);
  return n && r && m_(t, i, r), r;
};
const ya = "floorplan_panel";
let ye = class extends ce {
  constructor() {
    super(...arguments), this.narrow = !1, this.kiosk = !1, this._edit = !1, this._revision = 0, this._loading = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.kiosk = new URLSearchParams(location.search).has("kiosk"), this.hass && !this._plan && this._load();
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
      const e = await this.hass.callWS({ type: `${ya}/plan/get` });
      this._setPlan(e.plan, e.revision), this._unsub || (this._unsub = await this.hass.connection.subscribeMessage((t) => this._onEvent(t), {
        type: `${ya}/subscribe`
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
    return u`
      <div class="toolbar">
        ${this.narrow ? u`<button class="icon-btn" title="Menü" @click=${this._toggleMenu}><ha-icon icon="mdi:menu"></ha-icon></button>` : u`<span class="spacer"></span>`}
        <div class="main-title">Grundriss</div>
        ${this._isAdmin && this._plan && !this._edit ? u`<button class="icon-btn" title="Grundriss bearbeiten" @click=${() => this._edit = !0}>
              <ha-icon icon="mdi:pencil-ruler"></ha-icon>
            </button>` : m}
      </div>
      ${this._error ? u`<div class="message error">Grundriss konnte nicht geladen werden: ${this._error}</div>` : this._plan ? u`<fp-ef-host
            .hass=${this.hass}
            .plan=${this._plan}
            .revision=${this._revision}
            .edit=${this._edit}
            .kiosk=${this.kiosk}
            @ef-saved=${this._onEfSaved}
            @ef-edit-request=${() => this._edit = !0}
            @ef-close=${() => this._edit = !1}
          ></fp-ef-host>` : u`<div class="message">Lade …</div>`}
    `;
  }
};
ye.styles = $e`
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
    :host([kiosk]) .toolbar {
      display: none;
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
Me([
  I({ attribute: !1 })
], ye.prototype, "hass", 2);
Me([
  I({ type: Boolean, reflect: !0 })
], ye.prototype, "narrow", 2);
Me([
  I({ type: Boolean, reflect: !0 })
], ye.prototype, "kiosk", 2);
Me([
  I({ attribute: !1 })
], ye.prototype, "panel", 2);
Me([
  T()
], ye.prototype, "_plan", 2);
Me([
  T()
], ye.prototype, "_edit", 2);
Me([
  T()
], ye.prototype, "_revision", 2);
Me([
  T()
], ye.prototype, "_error", 2);
ye = Me([
  Oe("floorplan-panel")
], ye);
