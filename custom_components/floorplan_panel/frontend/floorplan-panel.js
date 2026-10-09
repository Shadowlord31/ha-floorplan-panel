function st(t) {
  return (e) => {
    customElements.get(t) || customElements.define(t, e);
  };
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _t = globalThis, Kt = _t.ShadowRoot && (_t.ShadyCSS === void 0 || _t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, qt = Symbol(), ie = /* @__PURE__ */ new WeakMap();
let ke = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== qt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Kt && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = ie.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && ie.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Vt = (t) => new ke(typeof t == "string" ? t : t + "", void 0, qt), nt = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((s, n, o) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[o + 1], t[0]);
  return new ke(i, t, qt);
}, Ze = (t, e) => {
  if (Kt) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const s = document.createElement("style"), n = _t.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, t.appendChild(s);
  }
}, se = Kt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return Vt(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Xe, defineProperty: Ye, getOwnPropertyDescriptor: Je, getOwnPropertyNames: Qe, getOwnPropertySymbols: ti, getPrototypeOf: ei } = Object, St = globalThis, ne = St.trustedTypes, ii = ne ? ne.emptyScript : "", si = St.reactiveElementPolyfillSupport, lt = (t, e) => t, xt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? ii : null;
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
} }, Zt = (t, e) => !Xe(t, e), oe = { attribute: !0, type: String, converter: xt, reflect: !1, useDefault: !1, hasChanged: Zt };
Symbol.metadata ??= Symbol("metadata"), St.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Y = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = oe) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(e, s, i);
      n !== void 0 && Ye(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: n, set: o } = Je(this.prototype, e) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: n, set(r) {
      const l = n?.call(this);
      o?.call(this, r), this.requestUpdate(e, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? oe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(lt("elementProperties"))) return;
    const e = ei(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(lt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(lt("properties"))) {
      const i = this.properties, s = [...Qe(i), ...ti(i)];
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
      for (const n of s) i.unshift(se(n));
    } else e !== void 0 && i.push(se(e));
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
    return Ze(e, this.constructor.elementStyles), e;
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
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : xt).toAttribute(i, s.type);
      this._$Em = e, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const s = this.constructor, n = s._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : xt;
      this._$Em = n;
      const l = r.fromAttribute(i, o.type);
      this[n] = l ?? this._$Ej?.get(n) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, i, s, n = !1, o) {
    if (e !== void 0) {
      const r = this.constructor;
      if (n === !1 && (o = this[e]), s ??= r.getPropertyOptions(e), !((s.hasChanged ?? Zt)(o, i) || s.useDefault && s.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, s)))) return;
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
        const { wrapped: r } = o, l = this[n];
        r !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, o, l);
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
Y.elementStyles = [], Y.shadowRootOptions = { mode: "open" }, Y[lt("elementProperties")] = /* @__PURE__ */ new Map(), Y[lt("finalized")] = /* @__PURE__ */ new Map(), si?.({ ReactiveElement: Y }), (St.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xt = globalThis, re = (t) => t, bt = Xt.trustedTypes, ae = bt ? bt.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Se = "$lit$", G = `lit$${Math.random().toFixed(9).slice(2)}$`, Ae = "?" + G, ni = `<${Ae}>`, V = document, ct = () => V.createComment(""), ht = (t) => t === null || typeof t != "object" && typeof t != "function", Yt = Array.isArray, oi = (t) => Yt(t) || typeof t?.[Symbol.iterator] == "function", Mt = `[ 	
\f\r]`, ot = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, le = /-->/g, ce = />/g, B = RegExp(`>|${Mt}(?:([^\\s"'>=/]+)(${Mt}*=${Mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), he = /'/g, de = /"/g, Ee = /^(?:script|style|textarea|title)$/i, Me = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), p = Me(1), _ = Me(2), Q = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), pe = /* @__PURE__ */ new WeakMap(), K = V.createTreeWalker(V, 129);
function Pe(t, e) {
  if (!Yt(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ae !== void 0 ? ae.createHTML(e) : e;
}
const ri = (t, e) => {
  const i = t.length - 1, s = [];
  let n, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = ot;
  for (let l = 0; l < i; l++) {
    const a = t[l];
    let c, h, d = -1, f = 0;
    for (; f < a.length && (r.lastIndex = f, h = r.exec(a), h !== null); ) f = r.lastIndex, r === ot ? h[1] === "!--" ? r = le : h[1] !== void 0 ? r = ce : h[2] !== void 0 ? (Ee.test(h[2]) && (n = RegExp("</" + h[2], "g")), r = B) : h[3] !== void 0 && (r = B) : r === B ? h[0] === ">" ? (r = n ?? ot, d = -1) : h[1] === void 0 ? d = -2 : (d = r.lastIndex - h[2].length, c = h[1], r = h[3] === void 0 ? B : h[3] === '"' ? de : he) : r === de || r === he ? r = B : r === le || r === ce ? r = ot : (r = B, n = void 0);
    const m = r === B && t[l + 1].startsWith("/>") ? " " : "";
    o += r === ot ? a + ni : d >= 0 ? (s.push(c), a.slice(0, d) + Se + a.slice(d) + G + m) : a + G + (d === -2 ? l : m);
  }
  return [Pe(t, o + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class dt {
  constructor({ strings: e, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const l = e.length - 1, a = this.parts, [c, h] = ri(e, i);
    if (this.el = dt.createElement(c, s), K.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = K.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(Se)) {
          const f = h[r++], m = n.getAttribute(d).split(G), u = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: o, name: u[2], strings: m, ctor: u[1] === "." ? li : u[1] === "?" ? ci : u[1] === "@" ? hi : At }), n.removeAttribute(d);
        } else d.startsWith(G) && (a.push({ type: 6, index: o }), n.removeAttribute(d));
        if (Ee.test(n.tagName)) {
          const d = n.textContent.split(G), f = d.length - 1;
          if (f > 0) {
            n.textContent = bt ? bt.emptyScript : "";
            for (let m = 0; m < f; m++) n.append(d[m], ct()), K.nextNode(), a.push({ type: 2, index: ++o });
            n.append(d[f], ct());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Ae) a.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(G, d + 1)) !== -1; ) a.push({ type: 7, index: o }), d += G.length - 1;
      }
      o++;
    }
  }
  static createElement(e, i) {
    const s = V.createElement("template");
    return s.innerHTML = e, s;
  }
}
function tt(t, e, i = t, s) {
  if (e === Q) return e;
  let n = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const o = ht(e) ? void 0 : e._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(t), n._$AT(t, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = n : i._$Cl = n), n !== void 0 && (e = tt(t, n._$AS(t, e.values), n, s)), e;
}
class ai {
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
    const { el: { content: i }, parts: s } = this._$AD, n = (e?.creationScope ?? V).importNode(i, !0);
    K.currentNode = n;
    let o = K.nextNode(), r = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let c;
        a.type === 2 ? c = new pt(o, o.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, e) : a.type === 6 && (c = new di(o, this, e)), this._$AV.push(c), a = s[++l];
      }
      r !== a?.index && (o = K.nextNode(), r++);
    }
    return K.currentNode = V, n;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
}
class pt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, s, n) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    e = tt(this, e, i), ht(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== Q && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : oi(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && ht(this._$AH) ? this._$AA.nextSibling.data = e : this.T(V.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: s } = e, n = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = dt.createElement(Pe(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const o = new ai(n, this), r = o.u(this.options);
      o.p(i), this.T(r), this._$AH = o;
    }
  }
  _$AC(e) {
    let i = pe.get(e.strings);
    return i === void 0 && pe.set(e.strings, i = new dt(e)), i;
  }
  k(e) {
    Yt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const o of e) n === i.length ? i.push(s = new pt(this.O(ct()), this.O(ct()), this, this.options)) : s = i[n], s._$AI(o), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const s = re(e).nextSibling;
      re(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class At {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, n, o) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = e, this.name = i, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = g;
  }
  _$AI(e, i = this, s, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) e = tt(this, e, i, 0), r = !ht(e) || e !== this._$AH && e !== Q, r && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = o[0], a = 0; a < o.length - 1; a++) c = tt(this, l[s + a], i, a), c === Q && (c = this._$AH[a]), r ||= !ht(c) || c !== this._$AH[a], c === g ? e = g : e !== g && (e += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    r && !n && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class li extends At {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
}
class ci extends At {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
}
class hi extends At {
  constructor(e, i, s, n, o) {
    super(e, i, s, n, o), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = tt(this, e, i, 0) ?? g) === Q) return;
    const s = this._$AH, n = e === g && s !== g || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, o = e !== g && (s === g || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class di {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    tt(this, e);
  }
}
const pi = Xt.litHtmlPolyfillSupport;
pi?.(dt, pt), (Xt.litHtmlVersions ??= []).push("3.3.3");
const ui = (t, e, i) => {
  const s = i?.renderBefore ?? e;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = i?.renderBefore ?? null;
    s._$litPart$ = n = new pt(e.insertBefore(ct(), o), o, void 0, i ?? {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Jt = globalThis;
class N extends Y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ui(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Q;
  }
}
N._$litElement$ = !0, N.finalized = !0, Jt.litElementHydrateSupport?.({ LitElement: N });
const fi = Jt.litElementPolyfillSupport;
fi?.({ LitElement: N });
(Jt.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mi = { attribute: !0, type: String, converter: xt, reflect: !1, hasChanged: Zt }, gi = (t = mi, e, i) => {
  const { kind: s, metadata: n } = i;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), o.set(i.name, t), s === "accessor") {
    const { name: r } = i;
    return { set(l) {
      const a = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(r, a, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, t, l), l;
    } };
  }
  if (s === "setter") {
    const { name: r } = i;
    return function(l) {
      const a = this[r];
      e.call(this, l), this.requestUpdate(r, a, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function $(t) {
  return (e, i) => typeof i == "object" ? gi(t, e, i) : ((s, n, o) => {
    const r = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), r ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function x(t) {
  return $({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _i = (t, e, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, i), i);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ce(t, e) {
  return (i, s, n) => {
    const o = (r) => r.renderRoot?.querySelector(t) ?? null;
    return _i(i, s, { get() {
      return o(this);
    } });
  };
}
const M = (t) => t.split(".")[0], yi = /* @__PURE__ */ new Set([
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
]), xi = /* @__PURE__ */ new Set(["scene", "script", "button", "input_button"]);
function Tt(t) {
  const e = M(t);
  return e === "scene" ? "scene" : e === "script" ? "script" : "device";
}
function bi(t) {
  return yi.has(M(t));
}
function Lt(t) {
  return xi.has(M(t));
}
function et(t) {
  if (!t) return !1;
  const e = t.state;
  if (e === "unavailable" || e === "unknown") return !1;
  switch (M(t.entity_id)) {
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
function Nt(t) {
  return !t || t.state === "unavailable";
}
function $t(t, e) {
  return t.states[e]?.attributes.friendly_name ?? e;
}
function Oe(t, e) {
  if (!e) return "nicht gefunden";
  if (t.formatEntityState)
    try {
      return t.formatEntityState(e);
    } catch {
    }
  const i = e.attributes.unit_of_measurement;
  return i ? `${e.state} ${i}` : e.state;
}
const $i = {
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
  return s || ($i[M(e)] ?? "mdi:help-circle-outline");
}
async function ze(t, e) {
  const i = M(e), s = t.states[e];
  i === "lock" ? await t.callService("lock", s?.state === "locked" ? "unlock" : "lock", { entity_id: e }) : i === "cover" ? await t.callService("cover", "toggle", { entity_id: e }) : await t.callService("homeassistant", "toggle", { entity_id: e });
}
async function Dt(t, e) {
  const i = M(e);
  i === "scene" ? await t.callService("scene", "turn_on", { entity_id: e }) : i === "script" ? await t.callService("script", "turn_on", { entity_id: e }) : (i === "button" || i === "input_button") && await t.callService(i, "press", { entity_id: e });
}
function vt(t, e) {
  t.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: e }, bubbles: !0, composed: !0 }));
}
var vi = Object.defineProperty, wi = Object.getOwnPropertyDescriptor, R = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? wi(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (n = (s ? r(e, i, n) : r(n)) || n);
  return s && n && vi(e, i, n), n;
};
const ki = 60;
let O = class extends N {
  constructor() {
    super(...arguments), this.value = "", this.domains = [], this.exclude = [], this.placeholder = "Entität suchen …", this.clearOnSelect = !1, this._open = !1, this._filter = "", this._highlight = 0;
  }
  _results() {
    const t = this._filter.trim().toLowerCase(), e = new Set(this.exclude), i = [];
    for (const s of Object.keys(this.hass.states).sort()) {
      if (e.has(s) || this.domains.length && !this.domains.includes(M(s))) continue;
      const n = this.hass.states[s].attributes.friendly_name ?? s;
      if (!(t && !s.toLowerCase().includes(t) && !n.toLowerCase().includes(t)) && (i.push({ id: s, name: n }), i.length >= ki))
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
    return p`
      <div class="field">
        ${this.value && !this.clearOnSelect ? p`<ha-icon class="lead" .icon=${L(this.hass, this.value)}></ha-icon>` : p`<ha-icon class="lead" icon="mdi:magnify"></ha-icon>`}
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
        ${this.value && !this.clearOnSelect ? p`<button class="clear" title="Entfernen" @mousedown=${(s) => s.preventDefault()} @click=${() => this._select("")}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>` : g}
      </div>
      ${this.value && !this.clearOnSelect ? p`<div class="id">${this.value}</div>` : g}
      ${this._open ? p`<div class="list">
            ${t.length === 0 ? p`<div class="none">Keine Treffer</div>` : t.map(
      (s, n) => p`<div
                    class="opt ${n === this._highlight ? "hl" : ""}"
                    @mousedown=${(o) => {
        o.preventDefault(), this._select(s.id);
      }}
                  >
                    <ha-icon .icon=${L(this.hass, s.id)}></ha-icon>
                    <span class="txt"><span>${s.name}</span><small>${s.id}</small></span>
                  </div>`
    )}
          </div>` : g}
    `;
  }
};
O.styles = nt`
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
R([
  $({ attribute: !1 })
], O.prototype, "hass", 2);
R([
  $()
], O.prototype, "value", 2);
R([
  $({ attribute: !1 })
], O.prototype, "domains", 2);
R([
  $({ attribute: !1 })
], O.prototype, "exclude", 2);
R([
  $()
], O.prototype, "placeholder", 2);
R([
  $({ type: Boolean })
], O.prototype, "clearOnSelect", 2);
R([
  x()
], O.prototype, "_open", 2);
R([
  x()
], O.prototype, "_filter", 2);
R([
  x()
], O.prototype, "_highlight", 2);
R([
  Ce("input")
], O.prototype, "_input", 2);
O = R([
  st("fp-entity-picker")
], O);
const Si = 4, Ai = 10, Ut = { scale: 1, txPercent: 0, tyPercent: 0 };
function Ei(t, e, i, s = 0.15, n = Si, o) {
  if (!t.length) return Ut;
  const r = t.map((P) => P.x), l = t.map((P) => P.y), a = Math.min(...r), c = Math.max(...r), h = Math.min(...l), d = Math.max(...l), f = Math.max(c - a, d - h) * s, m = Math.max(c - a + f * 2, 1), u = Math.max(d - h + f * 2, 1), y = Math.max(1, Math.min(n, Math.min(e / m, i / u))), A = o ?? y;
  if (!Number.isFinite(A)) return Ut;
  const k = (a + c) / 2 / e, S = (h + d) / 2 / i, E = (P) => Math.min(0, Math.max(100 * (1 - A), P));
  return {
    scale: A,
    txPercent: E(50 - A * k * 100),
    tyPercent: E(50 - A * S * 100)
  };
}
function Mi(t) {
  const e = t.zoom;
  if (!(typeof e != "number" || !Number.isFinite(e)))
    return Math.max(1, Math.min(Ai, e));
}
function Qt(t) {
  if (!t.length) return { x: 0, y: 0 };
  const e = t.reduce((i, s) => ({ x: i.x + s.x, y: i.y + s.y }), { x: 0, y: 0 });
  return { x: e.x / t.length, y: e.y / t.length };
}
function q(t, e, i) {
  let s = !1;
  for (let n = 0, o = t.length - 1; n < t.length; o = n++) {
    const r = t[n], l = t[o];
    r.y > i != l.y > i && e < (l.x - r.x) * (i - r.y) / (l.y - r.y) + r.x && (s = !s);
  }
  return s;
}
function ue(t) {
  let e = 0;
  for (let i = 0, s = t.length - 1; i < t.length; s = i++)
    e += (t[s].x + t[i].x) * (t[s].y - t[i].y);
  return Math.abs(e / 2);
}
function Pi(t, e) {
  return t.area ? e.find((s) => s.id === t.area || s.name === t.area) : e.filter((s) => q(s.points, t.x, t.y)).sort((s, n) => ue(s.points) - ue(n.points))[0];
}
function Ci(t, e, i) {
  return t.showOnlyWhenZoomed ? e ? Pi(t, i)?.id !== e.id : !0 : !1;
}
function U(t, e) {
  return e > 0 ? Math.round(t / e) * e : t;
}
function w(t, e) {
  return Math.hypot(t.x - e.x, t.y - e.y);
}
function H(t, e, i) {
  const s = i.x - e.x, n = i.y - e.y, o = s * s + n * n, r = o === 0 ? 0 : Math.max(0, Math.min(1, ((t.x - e.x) * s + (t.y - e.y) * n) / o));
  return { point: { x: e.x + r * s, y: e.y + r * n }, t: r };
}
function Pt(t, e, i) {
  let s;
  for (const n of e) {
    const { point: o, t: r } = H(t, { x: n.x1, y: n.y1 }, { x: n.x2, y: n.y2 }), l = w(t, o);
    l <= i && (!s || l < s.distance) && (s = {
      wall: n,
      point: o,
      t: r,
      distance: l,
      angle: Math.atan2(n.y2 - n.y1, n.x2 - n.x1) * 180 / Math.PI
    });
  }
  return s;
}
function Oi(t, e, i, s = []) {
  let n, o = i;
  for (const r of e)
    if (!s.includes(r))
      for (const l of [
        { x: r.x1, y: r.y1 },
        { x: r.x2, y: r.y2 }
      ]) {
        const a = w(t, l);
        a <= o && (n = l, o = a);
      }
  return n;
}
function zi(t, e, i, s = []) {
  let n, o = i;
  for (const r of e)
    for (const l of r.points) {
      if (s.includes(l)) continue;
      const a = w(t, l);
      a <= o && (n = l, o = a);
    }
  return n && { x: n.x, y: n.y };
}
function Ct(t, e, i = 8) {
  const s = Math.abs(Math.atan2(e.y - t.y, e.x - t.x) * 180 / Math.PI);
  return s < i || s > 180 - i ? { x: e.x, y: t.y } : Math.abs(s - 90) < i ? { x: t.x, y: e.y } : e;
}
function Wt(t, e) {
  const { width: i, height: s } = e.canvas;
  let n = 1 / 0, o = 1 / 0, r = -1 / 0, l = -1 / 0;
  const a = (m, u, y = 0) => {
    n = Math.min(n, m - y), o = Math.min(o, u - y), r = Math.max(r, m + y), l = Math.max(l, u + y);
  }, c = Math.max(i, s), h = e.settings?.wallThickness ?? 12;
  for (const m of t.walls) {
    const u = (m.thickness ?? h) / 2;
    a(m.x1, m.y1, u), a(m.x2, m.y2, u);
  }
  for (const m of t.areas) for (const u of m.points) a(u.x, u.y);
  for (const m of t.openings) {
    const u = m.angle * Math.PI / 180, y = Math.cos(u), A = Math.sin(u), k = m.swing === "out" ? -1 : 1, S = 30, E = k > 0 ? -S : -(m.length + S), P = k > 0 ? m.length + S : S;
    for (const D of [-m.length / 2, m.length / 2])
      for (const F of [E, P]) a(m.x + D * y - F * A, m.y + D * A + F * y);
  }
  const d = c * 0.04;
  for (const m of t.items) a(m.x, m.y, d);
  if (n === 1 / 0) {
    const m = c * 0.03;
    return { x: -m, y: -m, w: i + 2 * m, h: s + 2 * m };
  }
  const f = Math.max(r - n, l - o) * 0.03;
  return { x: n - f, y: o - f, w: r - n + 2 * f, h: l - o + 2 * f };
}
function Ii(t, e, i) {
  let s, n, o = i, r = i;
  for (const a of e) {
    const c = Math.abs(a.x - t.x);
    c <= o && (o = c, s = a);
    const h = Math.abs(a.y - t.y);
    h <= r && (r = h, n = a);
  }
  const l = [];
  return s && l.push({ axis: "x", value: s.x, ref: s }), n && l.push({ axis: "y", value: n.y, ref: n }), { x: s?.x, y: n?.y, guides: l };
}
function fe(t) {
  if (t.length !== 4) return;
  const e = [...new Set(t.map((s) => s.x))], i = [...new Set(t.map((s) => s.y))];
  if (!(e.length !== 2 || i.length !== 2))
    return { x: Math.min(...e), y: Math.min(...i), w: Math.abs(e[0] - e[1]), h: Math.abs(i[0] - i[1]) };
}
function Ri(t, e) {
  let i = 1 / 0;
  for (let s = 0; s < t.length; s++) {
    const n = t[s], o = t[(s + 1) % t.length];
    i = Math.min(i, w(e, H(e, n, o).point));
  }
  return i;
}
function Ti(t, e, i = [], s, n = 40, o = 20) {
  if (t.length < 3) return e.map(() => ({ x: 0, y: 0 }));
  const r = Qt(t), l = t.map((k) => k.x), a = t.map((k) => k.y), c = Math.min(...l), h = Math.max(...l), d = Math.min(...a), f = Math.max(...a), m = Math.max(5, Math.min(h - c, f - d) / 40), u = [];
  for (let k = d + m / 2; k < f; k += m)
    for (let S = c + m / 2; S < h; S += m) {
      const E = { x: Math.round(S), y: Math.round(k) };
      q(t, E.x, E.y) && u.push(E);
    }
  const y = [...i], A = [];
  for (const k of e) {
    let S;
    for (const P of [1, 0.6, 0.3]) {
      let D = 1 / 0;
      for (const F of u) {
        const te = Ri(t, F);
        if (te < o * P || y.some((Ve) => w(F, Ve) < n * P) || s && w(F, s) < n * 1.5 * P) continue;
        const ee = k.light ? w(F, r) : te;
        ee < D && (D = ee, S = F);
      }
      if (S) break;
    }
    const E = S ?? r;
    y.push(E), A.push({ x: E.x, y: E.y });
  }
  return A;
}
function Li(t, e, i, s = []) {
  let n, o = i;
  for (const r of e) {
    if (s.includes(r)) continue;
    const l = H(t, { x: r.x1, y: r.y1 }, { x: r.x2, y: r.y2 }), a = w(t, l.point);
    a <= o && (n = l.point, o = a);
  }
  return n && { x: Math.round(n.x * 100) / 100, y: Math.round(n.y * 100) / 100 };
}
function Ni(t, e, i, s = 0.5) {
  const n = w(t, e);
  if (n < 1) return [];
  const o = [];
  for (const c of i) {
    const h = { x: c.x1, y: c.y1 }, d = { x: c.x2, y: c.y2 }, f = H(h, t, e), m = H(d, t, e);
    if (w(h, f.point) > s || w(d, m.point) > s) continue;
    const u = Math.min(f.t, m.t), y = Math.max(f.t, m.t);
    y > u && o.push([u, y]);
  }
  o.sort((c, h) => c[0] - h[0]);
  const r = [];
  let l = 0;
  const a = (c) => ({ x: t.x + (e.x - t.x) * c, y: t.y + (e.y - t.y) * c });
  for (const [c, h] of o)
    c > l && (c - l) * n > 1 && r.push([a(l), a(c)]), l = Math.max(l, h);
  return l < 1 && (1 - l) * n > 1 && r.push([a(l), a(1)]), r;
}
function wt(t, e, i, s = 0.5) {
  return w(t, H(t, e, i).point) <= s;
}
function Ie(t, e, i = 0.5) {
  const s = t.points;
  return e.filter((n) => {
    const o = { x: n.x1, y: n.y1 }, r = { x: n.x2, y: n.y2 };
    return s.some((l, a) => {
      const c = s[(a + 1) % s.length];
      return wt(o, l, c, i) && wt(r, l, c, i);
    });
  });
}
function Di(t, e) {
  return e.filter((i) => Ie(i, [t]).length > 0);
}
const jt = 4, Re = "#ef6c00", Te = "#8d6e63", Ui = [
  ["room", "Zimmer"],
  ["balcony", "Balkon"],
  ["hallway", "Flur"],
  ["staircase", "Treppenhaus"],
  ["bathroom", "Bad"],
  ["custom", "Eigene Bezeichnung"]
], Ft = 150, Le = "#ffd9a0", me = 30, Wi = { wallThickness: 12, grid: 10 };
function ji(t) {
  const { sashes: e, shutterEntity: i, shutterColor: s, ...n } = t;
  return n.type === "window" && !n.leaves && (e === 1 || e === 2) && (n.leaves = e === 2 ? [{ w: 1, hinge: "left" }, { w: 1, hinge: "right" }] : [{ w: 1 }]), n.type === "window" && i && !n.shutters && (n.shutters = [{ entity: i, side: "out", ...s ? { color: s } : {} }]), n.type === "door" && n.entity?.startsWith("lock.") && (n.lockEntity ??= n.entity, delete n.entity), n;
}
function Gt(t) {
  const e = t ?? {};
  return {
    version: e.version ?? 1,
    canvas: e.canvas ?? { width: 1e3, height: 700 },
    settings: { ...Wi, ...e.settings ?? {} },
    floors: (e.floors ?? []).map((i) => ({
      ...i,
      name: i.name ?? "",
      walls: i.walls ?? [],
      openings: (i.openings ?? []).map(ji),
      areas: (i.areas ?? []).map((s) => ({ ...s, name: s.name ?? "", sidebar: s.sidebar ?? [] })),
      items: i.items ?? []
    }))
  };
}
function C(t) {
  return `${t}-${Math.random().toString(36).slice(2, 8)}`;
}
const ge = 0.18, _e = 0.6, ye = 0.5;
function yt(t) {
  return typeof t.glow == "boolean" ? t.glow : !!t.entity && M(t.entity) === "light";
}
function Fi(t, e) {
  if (!e || e.state !== "on") return;
  const i = e.attributes ?? {}, s = i.brightness, n = typeof s == "number" && Number.isFinite(s) ? Math.max(0, Math.min(255, s)) / 255 : void 0, o = n === void 0 ? _e : ge + (_e - ge) * n, l = (typeof t.glowRadius == "number" && t.glowRadius > 0 ? t.glowRadius : Ft) * (n === void 0 ? 1 : ye + (1 - ye) * n), a = i.rgb_color;
  if (Array.isArray(a) && a.length >= 3 && a.slice(0, 3).every((c) => typeof c == "number" && Number.isFinite(c))) {
    const c = (h) => Math.max(0, Math.min(255, Math.round(h)));
    return { color: `rgb(${c(a[0])}, ${c(a[1])}, ${c(a[2])})`, opacity: o, radius: l };
  }
  return { color: t.glowColor || Le, opacity: o, radius: l };
}
function Ne(t, e, i) {
  const s = i.x2 - i.x1, n = i.y2 - i.y1, o = s * s + n * n, r = o === 0 ? 0 : Math.max(0, Math.min(1, ((t - i.x1) * s + (e - i.y1) * n) / o));
  return Math.hypot(t - (i.x1 + r * s), e - (i.y1 + r * n));
}
function Gi(t, e, i, s, n) {
  const o = n.x2 - n.x1, r = n.y2 - n.y1, l = i * r - s * o;
  if (Math.abs(l) < 1e-12) return;
  const a = n.x1 - t, c = n.y1 - e, h = (a * r - c * o) / l, d = (a * s - c * i) / l;
  if (!(h <= 1e-9 || d < 0 || d > 1))
    return h;
}
function Hi(t, e, i, s, n) {
  const o = t.x2 - t.x1, r = t.y2 - t.y1, l = [-o, o, -r, r], a = [t.x1 - e, s - t.x1, t.y1 - i, n - t.y1];
  let c = 0, h = 1;
  for (let d = 0; d < 4; d++) {
    if (l[d] === 0) {
      if (a[d] < 0) return;
      continue;
    }
    const f = a[d] / l[d];
    if (l[d] < 0) {
      if (f > h) return;
      f > c && (c = f);
    } else {
      if (f < c) return;
      f < h && (h = f);
    }
  }
  return { ...t, x1: t.x1 + c * o, y1: t.y1 + c * r, x2: t.x1 + h * o, y2: t.y1 + h * r };
}
function De(t, e, i, s, n = () => 12) {
  const o = s.filter((f) => {
    const m = Ne(t, e, f);
    return m < i && m > n(f) / 2 + 1;
  });
  if (!o.length) return;
  const r = i * 1.01, l = [
    { id: "b1", x1: t - r, y1: e - r, x2: t + r, y2: e - r },
    { id: "b2", x1: t + r, y1: e - r, x2: t + r, y2: e + r },
    { id: "b3", x1: t + r, y1: e + r, x2: t - r, y2: e + r },
    { id: "b4", x1: t - r, y1: e + r, x2: t - r, y2: e - r }
  ], a = o.map((f) => Hi(f, t - r, e - r, t + r, e + r)).filter((f) => !!f);
  if (!a.length) return;
  const c = [...a, ...l], h = [];
  for (const f of c)
    for (const [m, u] of [
      [f.x1, f.y1],
      [f.x2, f.y2]
    ]) {
      const y = Math.atan2(u - e, m - t);
      for (const A of [y - 1e-4, y, y + 1e-4]) {
        const k = Math.cos(A), S = Math.sin(A);
        let E = 1 / 0;
        for (const P of c) {
          const D = Gi(t, e, k, S, P);
          D !== void 0 && D < E && (E = D);
        }
        E < 1 / 0 && h.push({ x: t + k * E, y: e + S * E, a: A });
      }
    }
  h.sort((f, m) => f.a - m.a);
  const d = (f) => Math.round(f * 100) / 100;
  return h.map(({ x: f, y: m }) => ({ x: d(f), y: d(m) }));
}
function Ue(t, e) {
  return t.type !== "door" ? !1 : t.entity ? et(e?.states[t.entity]) : !0;
}
function We(t, e, i, s = () => 12) {
  const n = e.filter(i);
  if (!n.length) return t;
  const o = [];
  for (const r of t) {
    const l = r.x2 - r.x1, a = r.y2 - r.y1, c = l * l + a * a;
    if (c === 0) {
      o.push(r);
      continue;
    }
    const h = Math.sqrt(c), d = [];
    for (const u of n) {
      if (Ne(u.x, u.y, r) > s(r) / 2 + 1) continue;
      const y = ((u.x - r.x1) * l + (u.y - r.y1) * a) / c, A = u.length / 2 / h, k = Math.max(0, y - A), S = Math.min(1, y + A);
      S > k && d.push([k, S]);
    }
    if (!d.length) {
      o.push(r);
      continue;
    }
    d.sort((u, y) => u[0] - y[0]);
    let f = 0;
    const m = (u, y) => {
      y - u > 1e-6 && o.push({ ...r, x1: r.x1 + l * u, y1: r.y1 + a * u, x2: r.x1 + l * y, y2: r.y1 + a * y });
    };
    for (const [u, y] of d)
      m(f, u), f = Math.max(f, y);
    m(f, 1);
  }
  return o;
}
function Bi(t) {
  if (!t || t.state === "unavailable" || t.state === "unknown") return;
  const e = t.attributes?.current_position;
  if (typeof e == "number" && Number.isFinite(e)) return 1 - Math.max(0, Math.min(100, e)) / 100;
  if (t.state === "closed") return 1;
  if (t.state === "open") return 0;
  if (t.state === "opening" || t.state === "closing") return 0.5;
}
function Ki(t, e, i, s) {
  const n = t.items.filter((l) => l.entity && yt(l)).map((l) => ({ it: l, paint: Fi(l, i.states[l.entity]) })).filter((l) => !!l.paint);
  if (!n.length) return g;
  const o = (l) => l.thickness ?? e.settings.wallThickness, r = We(t.walls, t.openings, (l) => Ue(l, i), o);
  return _`<g class="fp-glows">
    ${n.map(({ it: l, paint: a }, c) => {
    const h = `${s}-${c}`, d = De(l.x, l.y, a.radius, r, o);
    return _`
        ${d ? _`<clipPath id="${h}-clip"><polygon points=${d.map((f) => `${f.x},${f.y}`).join(" ")}></polygon></clipPath>` : g}
        <radialGradient id=${h} gradientUnits="userSpaceOnUse" cx=${l.x} cy=${l.y} r=${a.radius}>
          <stop offset="0" stop-color=${a.color} stop-opacity=${a.opacity}></stop>
          <stop offset="1" stop-color=${a.color} stop-opacity="0"></stop>
        </radialGradient>
        <circle class="fp-glow" cx=${l.x} cy=${l.y} r=${a.radius} fill="url(#${h})"
                clip-path=${d ? `url(#${h}-clip)` : g}></circle>`;
  })}
  </g>`;
}
const xe = 10;
function Ht(t) {
  return t.leaves?.length ? t.leaves : [{ w: 1 }];
}
function Bt(t) {
  const e = Ht(t), i = e.reduce((n, o) => n + Math.max(o.w, 1e-4), 0);
  let s = -t.length / 2;
  return e.map((n, o) => {
    const r = Math.max(n.w, 1e-4) / i * t.length, l = {
      index: o,
      x0: s,
      x1: s + r,
      hinge: n.hinge ?? qi(t, o, e.length),
      entity: n.entity || t.entity || void 0
    };
    return s += r, l;
  });
}
function qi(t, e, i) {
  return i === 1 ? t.hinge ?? "left" : e === i - 1 ? "right" : "left";
}
function je(t, e) {
  if (!t || !e) return { open: !1, unknown: !1 };
  const i = e.states[t], s = !i || i.state === "unavailable" || i.state === "unknown";
  return { open: !s && et(i), unknown: s };
}
function Vi(t, e) {
  return je(t.entity, e);
}
function Zi(t) {
  return !t || t.state === "unavailable" || t.state === "unknown" ? "unknown" : t.state === "locked" ? "locked" : "unlocked";
}
function Ot(t) {
  return t.type === "window" && !t.entity && !t.leaves?.some((e) => e.entity);
}
function Xi(t, e) {
  const i = Math.max(1, Math.min(jt, Math.round(e))), s = t.length ? t.map((o) => ({ ...o })) : [{ w: 1 }];
  if (i <= s.length) return s.slice(0, i);
  const n = s.reduce((o, r) => o + r.w, 0) / s.length;
  for (; s.length < i; ) s.push({ w: n });
  return s;
}
function Yi(t, e, i, s) {
  if (t.length === 1) return t.map((h) => ({ ...h }));
  const n = t.length - 1, o = Math.max(xe, Math.min(s - xe * n, i)), r = t.reduce((h, d, f) => f === e ? h : h + d.w, 0), l = s - o, a = t.reduce((h, d) => h + d.w, 0), c = s / a;
  return t.map((h, d) => {
    if (d === e) return { ...h, w: o / c };
    const f = r > 0 ? h.w / r : 1 / n;
    return { ...h, w: l * f / c };
  });
}
const Ji = 0.12;
function kt(t, e) {
  return t.thickness ?? e.settings.wallThickness;
}
function J(t, e) {
  return t.walls.reduce((i, s) => Math.max(i, kt(s, e)), e.settings.wallThickness);
}
function Qi(t, e) {
  const i = t.color ?? "var(--primary-color)", s = t.opacity ?? Ji;
  return e && t.entity && et(e.states[t.entity]) ? { color: t.activeColor ?? "#ffc107", opacity: Math.min(1, s + 0.2) } : { color: i, opacity: s };
}
function Fe(t, e) {
  const { color: i, opacity: s } = Qi(t, e.hass), n = t.points.map((c) => `${c.x},${c.y}`).join(" "), o = Math.min(...t.points.map((c) => c.x)), r = Math.min(...t.points.map((c) => c.y));
  let l = { x: o + e.labelSize * 0.8, y: r + e.labelSize * 1.5 };
  q(t.points, l.x, l.y) || (l = Qt(t.points));
  const a = q(t.points, o + e.labelSize * 0.8, r + e.labelSize * 1.5) ? "start" : "middle";
  return _`
    <g class="area ${e.selected ? "selected" : ""} ${e.dimmed ? "dimmed" : ""}" data-id=${t.id}>
      <polygon points=${n} fill=${i} fill-opacity=${s}
        style=${t.type === "balcony" ? `stroke:${i};stroke-width:3;stroke-dasharray:10 6;stroke-linejoin:round` : g}></polygon>
      ${t.showName !== !1 && t.name ? _`<text class="area-label" x=${l.x} y=${l.y} font-size=${e.labelSize}
                  text-anchor=${a} dominant-baseline="middle">${t.name}</text>` : g}
    </g>`;
}
function Ge(t, e, i, s = {}) {
  const { width: n, height: o } = e.canvas, r = Math.max(n, o), l = J(t, e) + 2;
  return _`
    <defs>
      <mask id=${i} maskUnits="userSpaceOnUse" x=${-r} y=${-r} width=${n + 2 * r} height=${o + 2 * r}>
        <rect x=${-r} y=${-r} width=${n + 2 * r} height=${o + 2 * r} fill="white"></rect>
        ${t.openings.map(
    (a) => _`<rect x=${a.x - a.length / 2} y=${a.y - l / 2} width=${a.length} height=${l}
                           fill="black" transform="rotate(${a.angle} ${a.x} ${a.y})"></rect>`
  )}
      </mask>
    </defs>
    <g class="walls" mask="url(#${i})">
      ${t.walls.map(
    (a) => _`<line class="wall ${s.selectedId === a.id ? "selected" : ""}" data-id=${a.id}
                         x1=${a.x1} y1=${a.y1} x2=${a.x2} y2=${a.y2}
                         stroke-width=${kt(a, e)}></line>`
  )}
    </g>`;
}
function be(t, e, i, s) {
  const n = e * s < 0 ? 0 : 1;
  return _`
    <path class="swing" d="M ${t} ${s * i} A ${i} ${i} 0 0 ${n} ${t - e * i} 0"></path>
    <line class="leaf" x1=${t} y1="0" x2=${t} y2=${s * i}></line>`;
}
function ts(t, e, i, s) {
  const n = e, o = s?.states[t.entity], r = Bi(o), l = o?.state === "opening" || o?.state === "closing", a = t.side === "in" ? 1 : -1, c = Math.max(i * 0.8, 8), h = a * i / 2, d = a > 0 ? h : h - c, f = (r ?? 0) * c, m = a > 0 ? h : h - f, u = [];
  for (let y = 3; y < f; y += 3) u.push(h + a * y);
  return _`
    <g class="shutter ${t.side} ${l ? "moving" : ""} ${r === void 0 ? "unknown" : ""}" style="--fp-shutter:${t.color || Te}">
      <rect class="shutter-track" x=${-n / 2} y=${d} width=${n} height=${c}></rect>
      ${f > 0 ? _`<rect class="shutter-fill" x=${-n / 2} y=${m} width=${n} height=${f}></rect>` : g}
      ${u.map((y) => _`<line class="shutter-slat" x1=${-n / 2} y1=${y} x2=${n / 2} y2=${y}></line>`)}
    </g>`;
}
function es(t, e) {
  if (!t.lockEntity) return g;
  const i = Zi(e?.states[t.lockEntity]), n = -(t.hinge === "right" ? 1 : -1) * (t.length / 2 - 9);
  return _`
    <g class="lock ${i}" transform="translate(${n} 0)">
      <circle r="6.5"></circle>
      <path class="shackle" d=${i === "locked" ? "M -2.4 -1 V -3 a 2.4 2.4 0 0 1 4.8 0 V -1" : "M -2.4 -1 V -3 a 2.4 2.4 0 0 1 4.8 0 V -2.4"}></path>
      <rect x="-3.4" y="-1" width="6.8" height="5" rx="1"></rect>
    </g>`;
}
function He(t, e, i = {}) {
  const s = t.length, n = `--fp-open:${t.openColor || Re}`, o = t.hinge === "right" ? 1 : -1, r = t.swing === "out" ? -1 : 1;
  if (t.type === "window") {
    const h = e - 2, d = Bt(t).map((u) => {
      const y = je(u.entity, i.hass);
      return { seg: u, open: !!i.forceOpen || y.open, unknown: y.unknown };
    }), f = Math.max(...d.filter((u) => u.open).map((u) => u.seg.x1 - u.seg.x0), 0), m = `opening window ${i.selected ? "selected" : ""} ${i.warn ? "warn" : ""}`;
    return _`
      <g class=${m} data-id=${t.id} transform="translate(${t.x} ${t.y}) rotate(${t.angle})" style=${n}>
        <rect class="hit" x=${-s / 2} y=${r < 0 ? -f : -h / 2} width=${s} height=${f + h}></rect>
        ${(t.shutters ?? []).map((u) => ts(u, s, e, i.hass))}
        ${d.map(({ seg: u, open: y, unknown: A }) => {
      const k = u.x1 - u.x0, S = u.hinge === "right" ? u.x1 : u.x0, E = u.hinge === "right" ? 1 : -1;
      return _`
            <g class="seg ${y ? "open" : ""} ${A ? "unknown" : ""} ${i.leafIndex === u.index ? "sel" : ""}">
              <rect class="frame" x=${u.x0} y=${-h / 2} width=${k} height=${h}></rect>
              ${y ? be(S, E, k, r) : _`<line class="glass" x1=${u.x0} y1=${-h / 6} x2=${u.x1} y2=${-h / 6}></line>
                      <line class="glass" x1=${u.x0} y1=${h / 6} x2=${u.x1} y2=${h / 6}></line>`}
            </g>`;
    })}
      </g>`;
  }
  const l = Vi(t, i.hass), a = !!i.forceOpen || !t.entity || l.open, c = `opening door ${a ? "open" : ""} ${l.unknown ? "unknown" : ""} ${i.selected ? "selected" : ""}`;
  return _`
    <g class=${c} data-id=${t.id} transform="translate(${t.x} ${t.y}) rotate(${t.angle})" style=${n}>
      <rect class="hit" x=${-s / 2} y=${r > 0 ? -e / 2 : -s} width=${s} height=${s + e / 2}></rect>
      ${a ? be(o * s / 2, o, s, r) : _`<rect class="frame" x=${-s / 2} y=${-(e - 2) / 2} width=${s} height=${e - 2}></rect>
              <line class="leaf closed" x1=${-s / 2} y1="0" x2=${s / 2} y2="0"></line>`}
      ${es(t, i.hass)}
    </g>`;
}
function is(t, e, i = {}) {
  const s = J(t, e) + 2;
  return _`<g class="openings">${t.openings.map(
    (n) => He(n, s, { hass: i.hass, selected: i.selectedId === n.id })
  )}</g>`;
}
const Be = `
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
var ss = Object.defineProperty, ns = Object.getOwnPropertyDescriptor, v = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? ns(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (n = (s ? r(e, i, n) : r(n)) || n);
  return s && n && ss(e, i, n), n;
};
const ft = "floorplan_panel", os = 100, zt = [1, 5, 10, 25, 50], W = 12, It = 14, rs = 7, rt = { wall: "walls", opening: "openings", area: "areas", item: "items" };
let at, mt = 0;
const $e = [
  { id: "select", icon: "mdi:cursor-default-outline", label: "Auswahl", hint: "Raum oder Wand anklicken: der erste Klick wählt den ganzen Raum (ziehen verschiebt ihn samt Wänden, Griffe an Ecken und Kanten ändern die Größe), ein weiterer Klick auf eine Wand wählt nur die Wand. Leere Fläche ziehen verschiebt die Ansicht, Mausrad zoomt. Umschalt-/Strg-Klick wählt mehrere, Rechtsklick oder langes Drücken öffnet das Menü." },
  { id: "marquee", icon: "mdi:select-drag", label: "Mehrfachauswahl", hint: "Rahmen aufziehen, um mehrere Elemente zu wählen (Umschalt: zur Auswahl hinzufügen). Danach ziehen, duplizieren, kopieren oder als Vorlage speichern." },
  { id: "wall", icon: "mdi:wall", label: "Wand", hint: "Klick setzt Anfang, weitere Klicks setzen Wandstücke. Esc oder Doppelklick beendet. Umschalt: freier Winkel, Alt: ohne Raster." },
  { id: "wallrect", icon: "mdi:square-outline", label: "Wände (Rechteck)", hint: "Von Ecke zu Ecke ziehen: legt nur die vier Wände an, ohne Raumfläche. Bestehende Wände werden mitgenutzt, nicht doppelt gezeichnet. Alt: ohne Fang, Esc bricht ab." },
  { id: "area", icon: "mdi:vector-polygon", label: "Raum", hint: "Ecken nacheinander anklicken, zum Schließen den ersten Punkt anklicken oder Enter drücken. Esc bricht ab." },
  { id: "rect", icon: "mdi:vector-rectangle", label: "Raum (Rechteck)", hint: "Von Ecke zu Ecke ziehen: legt Raumfläche und die vier Wände in einem Zug an. Alt: ohne Raster/Fang, Esc bricht ab." },
  { id: "door", icon: "mdi:door", label: "Tür", hint: "Auf eine Wand klicken, um dort eine Tür einzusetzen." },
  { id: "window", icon: "mdi:window-closed-variant", label: "Fenster", hint: "Auf eine Wand klicken, um dort ein Fenster einzusetzen." },
  { id: "item", icon: "mdi:map-marker-plus", label: "Icon", hint: "Klick platziert ein freies Icon – Icon und Entität danach rechts wählen." }
], as = [
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
], gt = ["#4f8bd6", "#e0a030", "#3fb5a8", "#8e6cc9", "#d65f5f", "#6aa84f", "#9e9e9e"];
let b = class extends N {
  constructor() {
    super(...arguments), this.revision = 0, this.narrow = !1, this._tool = "select", this._multi = [], this._guides = [], this._lastGuides = [], this._view = { x: 0, y: 0, w: 1e3, h: 700 }, this._roomPoints = [], this._dirty = !1, this._saving = !1, this._conflict = !1, this._svgSize = { w: 1, h: 1 }, this._undo = [], this._redo = [], this._baseRevision = 0, this._keyHandler = (t) => this._onKey(t);
  }
  // ---------------------------------------------------------------- Lebenszyklus
  willUpdate(t) {
    t.has("_sel") && this._multi.length && !this._multi.some((e) => e.kind === this._sel?.kind && e.id === this._sel?.id) && (this._multi = []), t.has("plan") && !this._draft && (this._draft = Gt(structuredClone(this.plan)), this._baseRevision = this.revision, this._floorId = this.floorId && this._draft.floors.some((e) => e.id === this.floorId) ? this.floorId : this._draft.floors[0]?.id, this._floorId || (this._draft.floors.push({ id: "eg", name: "Wohnung", walls: [], openings: [], areas: [], items: [] }), this._floorId = "eg"), this._fitView(), this.initialAreaId && this._floor.areas.some((e) => e.id === this.initialAreaId) && (this._sel = { kind: "area", id: this.initialAreaId }));
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
    const t = Wt(this._floor, this._draft), e = Math.max(t.w, t.h) * 0.1;
    this._view = { x: t.x - e, y: t.y - e, w: t.w + 2 * e, h: t.h + 2 * e };
  }
  // ---------------------------------------------------------------- Änderungen & Undo
  _snapshot() {
    return JSON.stringify({ plan: this._draft, floorId: this._floorId });
  }
  _pushUndo(t) {
    this._undo.push(t), this._undo.length > os && this._undo.shift(), this._redo = [], this._dirty = !0;
  }
  /** Führt eine Änderung am Entwurf aus und legt vorher einen Undo-Schritt an. */
  _mutate(t) {
    this._pushUndo(this._snapshot()), t(this._floor, this._draft), this._draft = { ...this._draft };
  }
  _restore(t) {
    const { plan: e, floorId: i } = JSON.parse(t);
    if (this._draft = e, this._floorId = i, this._sel && !this._findSelected() && (this._sel = void 0), this._multi.length) {
      const s = this._multi.filter((n) => this._elementOf(n));
      this._setGroup(s);
    }
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
      (t) => t.openings.filter(Ot).map((e) => ({ floorId: t.id, opening: e }))
    );
  }
  _selectOpening(t, e) {
    this._floorId = t, this._sel = { kind: "opening", id: e }, this._tool = "select";
  }
  _deleteSelected() {
    const t = this._group;
    t.length && (this._mutate((e) => {
      for (const i of Object.keys(rt)) {
        const s = new Set(t.filter((n) => n.kind === i).map((n) => n.id));
        s.size && (e[rt[i]] = e[rt[i]].filter((n) => !s.has(n.id)));
      }
    }), this._sel = void 0);
  }
  // ---------------------------------------------------------------- Mehrfachauswahl, Kopieren, Vorlagen
  get _group() {
    return this._multi.length > 1 ? this._multi : this._sel ? [this._sel] : [];
  }
  _elementOf(t) {
    return this._collection(t.kind).find((e) => e.id === t.id);
  }
  _inGroup(t, e) {
    return this._group.some((i) => i.kind === t && i.id === e);
  }
  _setGroup(t) {
    t.length > 1 ? (this._multi = t, this._sel = t[t.length - 1]) : (this._multi = [], this._sel = t[0]);
  }
  _toggleMulti(t, e) {
    const i = this._group, s = this._inGroup(t, e) ? i.filter((n) => !(n.kind === t && n.id === e)) : [...i, { kind: t, id: e }];
    this._setGroup(s);
  }
  _bbox(t) {
    const e = this._elementOf(t);
    if (!e) return;
    let i, s;
    if (t.kind === "wall")
      i = [e.x1, e.x2], s = [e.y1, e.y2];
    else if (t.kind === "area")
      i = e.points.map((r) => r.x), s = e.points.map((r) => r.y);
    else {
      const r = t.kind === "opening" ? e.length / 2 : It * this._upp;
      i = [e.x - r, e.x + r], s = [e.y - r, e.y + r];
    }
    const n = Math.min(...i), o = Math.min(...s);
    return { x: n, y: o, w: Math.max(...i) - n, h: Math.max(...s) - o };
  }
  _selectInRect(t, e, i) {
    const s = Math.min(t.x, e.x), n = Math.max(t.x, e.x), o = Math.min(t.y, e.y), r = Math.max(t.y, e.y), l = i ? [...this._group] : [];
    for (const a of Object.keys(rt))
      for (const c of this._collection(a)) {
        const h = this._bbox({ kind: a, id: c.id });
        !h || h.x > n || h.x + h.w < s || h.y > r || h.y + h.h < o || l.some((d) => d.kind === a && d.id === c.id) || l.push({ kind: a, id: c.id });
      }
    this._setGroup(l);
  }
  _shiftElement(t, e, i, s, n) {
    t === "wall" ? Object.assign(e, { x1: i.x1 + s, y1: i.y1 + n, x2: i.x2 + s, y2: i.y2 + n }) : t === "area" ? e.points = i.points.map((o) => ({ x: o.x + s, y: o.y + n })) : Object.assign(e, { x: i.x + s, y: i.y + n });
  }
  get _gap() {
    return Math.max(this._draft.settings.grid, 10) * 2;
  }
  _groupClip() {
    const t = { walls: [], openings: [], areas: [], items: [] };
    for (const e of this._group) {
      const i = this._elementOf(e);
      i && t[rt[e.kind]].push(structuredClone(i));
    }
    return t;
  }
  _clipBounds(t) {
    const e = [], i = [];
    for (const o of t.walls) e.push(o.x1, o.x2), i.push(o.y1, o.y2);
    for (const o of t.openings) e.push(o.x), i.push(o.y);
    for (const o of t.areas) for (const r of o.points) e.push(r.x), i.push(r.y);
    for (const o of t.items) e.push(o.x), i.push(o.y);
    if (!e.length) return;
    const s = Math.min(...e), n = Math.min(...i);
    return { x: s, y: n, w: Math.max(...e) - s, h: Math.max(...i) - n };
  }
  /** Fügt eine Kopie des Inhalts mit neuen IDs um (dx, dy) verschoben auf der aktuellen Etage ein. */
  _insertClip(t, e, i, s) {
    const n = [], o = /* @__PURE__ */ new Map();
    return this._mutate((r) => {
      for (const l of t.walls) {
        const a = structuredClone(l);
        Object.assign(a, { id: C("w"), x1: l.x1 + e, y1: l.y1 + i, x2: l.x2 + e, y2: l.y2 + i }), r.walls.push(a), n.push({ kind: "wall", id: a.id });
      }
      for (const l of t.openings) {
        const a = structuredClone(l);
        Object.assign(a, { id: C(l.type === "door" ? "t" : "f"), x: l.x + e, y: l.y + i }), r.openings.push(a), n.push({ kind: "opening", id: a.id });
      }
      for (const l of t.areas) {
        const a = structuredClone(l);
        a.id = C("r"), a.points = l.points.map((c) => ({ x: c.x + e, y: c.y + i })), s && a.name && (a.name = `${a.name} (Kopie)`), o.set(l.id, a.id), r.areas.push(a), n.push({ kind: "area", id: a.id });
      }
      for (const l of t.items) {
        const a = structuredClone(l);
        Object.assign(a, { id: C("i"), x: l.x + e, y: l.y + i }), a.area && o.has(a.area) && (a.area = o.get(a.area)), r.items.push(a), n.push({ kind: "item", id: a.id });
      }
    }), n;
  }
  _duplicate() {
    const t = this._groupClip();
    this._clipBounds(t) && (this._setGroup(this._insertClip(t, this._gap, this._gap, !0)), this._menu = void 0);
  }
  _copy() {
    const t = this._groupClip();
    this._clipBounds(t) && (at = t, mt = 0, this._menu = void 0);
  }
  _paste() {
    at && (mt++, this._setGroup(this._insertClip(at, this._gap * mt, this._gap * mt, !0)), this._menu = void 0);
  }
  _saveTemplate() {
    const t = this._groupClip();
    if (!this._clipBounds(t)) return;
    if ((this._draft.settings.templates?.length ?? 0) >= me) {
      this._error = `Es sind höchstens ${me} Vorlagen möglich.`;
      return;
    }
    const e = prompt("Name der Vorlage", "Vorlage " + ((this._draft.settings.templates?.length ?? 0) + 1))?.trim();
    e && this._mutate((i, s) => {
      (s.settings.templates ??= []).push({ id: C("v"), name: e, ...t });
    });
  }
  _insertTemplate(t) {
    const e = this._clipBounds(t);
    if (!e) return;
    const i = this._draft.settings.grid, s = U(this._view.x + this._view.w / 2 - (e.x + e.w / 2), i), n = U(this._view.y + this._view.h / 2 - (e.y + e.h / 2), i);
    this._setGroup(this._insertClip(t, s, n, !1));
  }
  _deleteTemplate(t) {
    this._mutate((e, i) => {
      i.settings.templates = (i.settings.templates ?? []).filter((s) => s.id !== t), i.settings.templates.length || delete i.settings.templates;
    });
  }
  _openMenu(t, e, i) {
    if (this._tool !== "select" || (i && i.kind !== "handle" && !this._inGroup(i.kind, i.id) && this._setGroup([{ kind: i.kind, id: i.id }]), !this._group.length && !at)) return;
    const s = this.renderRoot.querySelector(".canvas-wrap")?.getBoundingClientRect();
    s && (this._menu = { x: t - s.left, y: e - s.top });
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
        type: `${ft}/plan/save`,
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
        const t = await this.hass.callWS({ type: `${ft}/plan/load_sample` });
        this._acceptServerPlan(t.plan, t.revision);
      } catch (t) {
        this._error = t?.message ?? String(t);
      }
  }
  _acceptServerPlan(t, e) {
    this._draft = Gt(t), this._baseRevision = e, this._floorId = this._draft.floors[0].id, this._undo = [], this._redo = [], this._dirty = !1, this._sel = void 0, this._history = void 0, this._fitView();
  }
  async _loadHistory() {
    const t = await this.hass.callWS({ type: `${ft}/history/list` });
    this._history = t.items;
  }
  async _restoreHistory(t) {
    if (!confirm("Diesen Stand wiederherstellen? Der aktuelle gespeicherte Stand bleibt im Verlauf.")) return;
    const e = await this.hass.callWS({ type: `${ft}/history/restore`, history_id: t });
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
    const n = Oi(t, this._floor.walls, W * this._upp, i);
    if (n) return { ...n };
    const o = zi(t, this._floor.areas, W * this._upp, s);
    if (o) return o;
    if (this._tool !== "item") {
      const c = Li(t, this._floor.walls, W * this._upp, i);
      if (c) return c;
    }
    const r = [];
    for (const c of this._floor.walls)
      i.includes(c) || r.push({ x: c.x1, y: c.y1 }, { x: c.x2, y: c.y2 });
    for (const c of this._floor.areas) for (const h of c.points) s.includes(h) || r.push(h);
    const l = Ii(t, r, W * this._upp);
    this._lastGuides = l.guides;
    const a = this._draft.settings.grid;
    return { x: l.x ?? U(t.x, a), y: l.y ?? U(t.y, a) };
  }
  _setGuides(t) {
    JSON.stringify(t) !== JSON.stringify(this._guides) && (this._guides = t);
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
    this._menu = void 0;
    const e = this._toPlan(t), i = this._snapshot(), s = { pointerId: t.pointerId, start: e, screenStart: { x: t.clientX, y: t.clientY }, before: i, moved: !1 };
    if (t.button === 1) {
      this._drag = { ...s, mode: "pan", viewStart: { ...this._view } }, this._svg.setPointerCapture(t.pointerId), t.preventDefault();
      return;
    }
    switch (this._tool) {
      case "marquee": {
        this._drag = { ...s, mode: "marquee", add: t.shiftKey }, this._marquee = { a: e, b: e }, this._svg.setPointerCapture(t.pointerId);
        break;
      }
      case "select": {
        const n = this._hit(t);
        if (t.pointerType !== "mouse") {
          const r = t.clientX, l = t.clientY;
          window.clearTimeout(this._lpTimer), this._lpTimer = window.setTimeout(() => {
            this._lpTimer = void 0;
            const a = this._drag;
            !a || a.moved || (this._svg.hasPointerCapture(a.pointerId) && this._svg.releasePointerCapture(a.pointerId), this._drag = void 0, this._openMenu(r, l, n));
          }, 550);
        }
        const o = t.shiftKey || t.ctrlKey || t.metaKey;
        if (n && n.kind !== "handle" && o) {
          this._toggleMulti(n.kind, n.id);
          break;
        }
        if (!n && t.shiftKey) {
          this._drag = { ...s, mode: "marquee", add: !0 }, this._marquee = { a: e, b: e }, this._svg.setPointerCapture(t.pointerId);
          break;
        }
        if (n && n.kind !== "handle" && this._multi.length > 1 && this._inGroup(n.kind, n.id)) {
          this._drag = { ...s, mode: "group", origs: this._multi.map((r) => ({ sel: r, orig: structuredClone(this._elementOf(r)) })) }, this._svg.setPointerCapture(t.pointerId);
          break;
        }
        if (n?.kind === "handle" && this._sel) {
          const r = this._findSelected();
          if (this._drag = { ...s, mode: "handle", sel: this._sel, handle: n.handle, orig: structuredClone(r) }, this._sel.kind === "wall" && r) {
            const l = n.handle === "p1" ? 1 : 2;
            this._drag.links = [this._linksAt(r, l)];
          } else if (this._sel.kind === "area" && r && n.handle?.startsWith("e"))
            this._drag.edge = this._edgeSetup(r, Number(n.handle.slice(1)));
          else if (this._sel.kind === "area" && r && n.handle?.startsWith("v")) {
            const l = r.points[Number(n.handle.slice(1))];
            this._drag.links = [this._linksAt(void 0, 0, l, r)];
          }
        } else if (n && n.kind !== "handle" && this._roomTarget(n)) {
          const r = this._roomTarget(n);
          this._sel = { kind: "area", id: r.id }, this._drag = { ...s, mode: "group", origs: this._roomGroup(r).map((l) => ({ sel: l, orig: structuredClone(this._elementOf(l)) })) };
        } else if (n && n.kind !== "handle") {
          if (this._sel = { kind: n.kind, id: n.id }, this._drag = { ...s, mode: "move", sel: this._sel, orig: structuredClone(this._findSelected()) }, n.kind === "wall") {
            const r = this._findSelected();
            this._drag.links = [this._linksAt(r, 1), this._linksAt(r, 2)];
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
          const o = t.shiftKey ? n : Ct(this._chainStart, n);
          if (w(o, this._chainStart) > 1) {
            const r = this._chainStart;
            this._mutate((l) => this._addWalls(l, r, o)), this._chainStart = o;
          }
        }
        break;
      }
      case "area": {
        const n = this._snap(e, t);
        this._roomPoints.length >= 3 && w(n, this._roomPoints[0]) <= W * this._upp ? this._finishRoom() : this._roomPoints = [...this._roomPoints, n];
        break;
      }
      case "wallrect":
      case "rect": {
        this._drag = { ...s, mode: "rect", start: this._snap(e, t) }, this._svg.setPointerCapture(t.pointerId);
        break;
      }
      case "door":
      case "window":
        this._placeOpening(this._tool, e, t);
        break;
      case "item": {
        const n = this._snap(e, t), o = C("i");
        this._mutate((r) => r.items.push({ id: o, x: n.x, y: n.y, icon: "mdi:lightbulb", tapAction: "auto" })), this._sel = { kind: "item", id: o }, this._tool = "select";
        break;
      }
    }
  }
  _onPointerMove(t) {
    this._lastGuides = [], this._onPointerMoveInner(t), !this._drag && this._cursor && ["wall", "rect", "wallrect", "area", "item"].includes(this._tool) && this._snap(this._cursor, t), this._setGuides(this._lastGuides);
  }
  _onPointerMoveInner(t) {
    const e = this._toPlan(t);
    this._cursor = e;
    const i = this._drag;
    if (!i || i.pointerId !== t.pointerId) return;
    const s = t.clientX - i.screenStart.x, n = t.clientY - i.screenStart.y;
    if (!i.moved && Math.hypot(s, n) < 3) return;
    if (i.moved = !0, window.clearTimeout(this._lpTimer), i.mode === "marquee") {
      this._marquee = { a: i.start, b: e };
      return;
    }
    if (i.mode === "group" && i.origs) {
      const h = t.altKey ? 0 : this._draft.settings.grid, d = U(e.x - i.start.x, h), f = U(e.y - i.start.y, h);
      for (const { sel: m, orig: u } of i.origs) {
        const y = this._elementOf(m);
        y && this._shiftElement(m.kind, y, u, d, f);
      }
      this._draft = { ...this._draft };
      return;
    }
    if (i.mode === "pan" && i.viewStart) {
      const h = this._upp;
      this._view = { ...i.viewStart, x: i.viewStart.x - s * h, y: i.viewStart.y - n * h };
      return;
    }
    const o = this._findSelected();
    if (!o || !i.sel) return;
    const r = t.altKey ? 0 : this._draft.settings.grid, l = U(e.x - i.start.x, r), a = U(e.y - i.start.y, r), c = i.orig;
    if (i.mode === "move")
      switch (i.sel.kind) {
        case "wall":
          Object.assign(o, { x1: c.x1 + l, y1: c.y1 + a, x2: c.x2 + l, y2: c.y2 + a });
          for (const h of i.links ?? []) this._applyLink(h, h.end === 1 ? { x: c.x1 + l, y: c.y1 + a } : { x: c.x2 + l, y: c.y2 + a });
          break;
        case "area":
          o.points = c.points.map((h) => ({ x: h.x + l, y: h.y + a }));
          break;
        case "item":
          Object.assign(o, { x: c.x + l, y: c.y + a });
          break;
        case "opening": {
          const h = { x: c.x + (e.x - i.start.x), y: c.y + (e.y - i.start.y) }, d = Pt(h, this._floor.walls, J(this._floor, this._draft) * 2 + W * this._upp);
          d && !t.altKey ? Object.assign(o, { x: I(d.point.x), y: I(d.point.y), angle: we(c.angle, d.angle) }) : Object.assign(o, { x: c.x + l, y: c.y + a });
          break;
        }
      }
    else if (i.mode === "handle" && i.handle) {
      if (i.sel.kind === "wall") {
        const h = i.handle === "p1" ? 1 : 2, d = h === 1 ? { x: c.x2, y: c.y2 } : { x: c.x1, y: c.y1 }, f = i.links?.[0];
        let m = this._snap(e, t, [o, ...(f?.walls ?? []).map((u) => u.wall)], f?.verts ?? []);
        !t.shiftKey && !t.altKey && (m = Ct(d, m)), o[`x${h}`] = m.x, o[`y${h}`] = m.y, f && this._applyLink(f, m);
      } else if (i.sel.kind === "area" && i.handle.startsWith("e") && i.edge) {
        const { n: h, pts: d } = i.edge, f = t.altKey ? 0 : this._draft.settings.grid, m = U((e.x - i.start.x) * h.x + (e.y - i.start.y) * h.y, f);
        for (const u of d) u.set(u.x + h.x * m, u.y + h.y * m);
      } else if (i.sel.kind === "area" && i.handle.startsWith("v")) {
        const h = o.points[Number(i.handle.slice(1))], d = i.links?.[0], f = this._snap(e, t, d?.walls.map((m) => m.wall) ?? [], [h, ...d?.verts ?? []]);
        Object.assign(h, f), d && this._applyLink(d, f);
      }
    }
    this._draft = { ...this._draft };
  }
  _onPointerUp(t) {
    window.clearTimeout(this._lpTimer), this._setGuides([]);
    const e = this._drag;
    if (!(!e || e.pointerId !== t.pointerId)) {
      if (this._drag = void 0, this._svg.hasPointerCapture(t.pointerId) && this._svg.releasePointerCapture(t.pointerId), e.mode === "marquee") {
        const i = this._marquee;
        this._marquee = void 0, i && e.moved && (this._selectInRect(i.a, i.b, !!e.add), this._tool = "select");
        return;
      }
      if (e.mode === "rect") {
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
      const l = e.points[(r + 1) % e.points.length], { point: a } = H(s, o, l), c = w(s, a);
      c < n.d && (n = { i: r, d: c, pt: a });
    }), n.i >= 0) {
      const o = this._snap(n.pt, t);
      this._mutate(() => e.points.splice(n.i + 1, 0, o));
    }
  }
  _onWheel(t) {
    t.preventDefault();
    const e = this._toPlan(t), i = Math.exp(t.deltaY * 15e-4), { width: s, height: n } = this._draft.canvas, o = Math.max(s, n) * 8, r = Math.min(o, Math.max(50, this._view.w * i)), l = r / this._view.w;
    this._view = {
      x: e.x - (e.x - this._view.x) * l,
      y: e.y - (e.y - this._view.y) * l,
      w: r,
      h: this._view.h * l
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
    if ((t.ctrlKey || t.metaKey) && !i && ["c", "v", "d"].includes(t.key.toLowerCase())) {
      t.preventDefault();
      const s = t.key.toLowerCase();
      s === "c" ? this._copy() : s === "v" ? this._paste() : this._duplicate();
      return;
    }
    if ((t.ctrlKey || t.metaKey) && t.key.toLowerCase() === "s") {
      t.preventDefault(), this._dirty && !this._saving && this._save();
      return;
    }
    i || (t.key === "Escape" ? this._drag?.mode === "rect" ? (this._svg.hasPointerCapture(this._drag.pointerId) && this._svg.releasePointerCapture(this._drag.pointerId), this._drag = void 0) : this._chainStart ? this._chainStart = void 0 : this._roomPoints.length ? this._roomPoints = [] : this._menu ? this._menu = void 0 : this._tool !== "select" ? this._tool = "select" : this._sel = void 0 : t.key === "Enter" && this._tool === "area" && this._roomPoints.length >= 3 ? this._finishRoom() : (t.key === "Delete" || t.key === "Backspace") && this._group.length && (t.preventDefault(), this._deleteSelected()));
  }
  /** Wand-Endpunkte und Raumecken, die genau auf dem Punkt liegen (Endpunkt `end` von `wall` bzw. `pt` einer Raumecke). */
  _linksAt(t, e, i, s) {
    const n = i ?? (e === 1 ? { x: t.x1, y: t.y1 } : { x: t.x2, y: t.y2 }), o = [];
    for (const l of this._floor.walls)
      l !== t && (w(n, { x: l.x1, y: l.y1 }) < 0.5 && o.push({ wall: l, end: 1 }), w(n, { x: l.x2, y: l.y2 }) < 0.5 && o.push({ wall: l, end: 2 }));
    const r = [];
    for (const l of this._floor.areas)
      for (const a of l.points) a !== i && l !== s && w(n, a) < 0.5 && r.push(a);
    return { end: e, walls: o, verts: r };
  }
  _applyLink(t, e) {
    for (const i of t.walls)
      i.wall[`x${i.end}`] = e.x, i.wall[`y${i.end}`] = e.y;
    for (const i of t.verts) Object.assign(i, e);
  }
  _placeOpening(t, e, i) {
    const s = Pt(e, this._floor.walls, J(this._floor, this._draft) + W * 2 * this._upp), n = t === "door" ? 80 : 120, o = s ? { x: I(s.point.x), y: I(s.point.y) } : this._snap(e, i), r = C(t === "door" ? "t" : "f"), l = { id: r, type: t, x: o.x, y: o.y, length: n, angle: s ? we(0, s.angle) : 0 };
    t === "door" && Object.assign(l, { hinge: "left", swing: "in" }), this._mutate((a) => a.openings.push(l)), this._sel = { kind: "opening", id: r };
  }
  _finishRoom() {
    const t = this._roomPoints;
    if (t.length < 3) return;
    const e = C("r"), i = this._floor.areas.length;
    this._mutate(
      (s) => s.areas.push({ id: e, name: `Raum ${i + 1}`, points: t, color: gt[i % gt.length], sidebar: [] })
    ), this._roomPoints = [], this._sel = { kind: "area", id: e }, this._tool = "select";
  }
  /** Teilt vorhandene Wände an a/b, legt nur noch nicht abgedeckte Wandstücke an. */
  _addWalls(t, e, i) {
    for (const s of [e, i])
      for (const n of [...t.walls]) {
        const o = H(s, { x: n.x1, y: n.y1 }, { x: n.x2, y: n.y2 });
        if (w(s, o.point) > 0.5 || w(s, { x: n.x1, y: n.y1 }) < 0.5 || w(s, { x: n.x2, y: n.y2 }) < 0.5) continue;
        const r = { ...n, id: C("w"), x1: s.x, y1: s.y };
        n.x2 = s.x, n.y2 = s.y, t.walls.push(r);
      }
    for (const [s, n] of Ni(e, i, t.walls)) t.walls.push({ id: C("w"), x1: s.x, y1: s.y, x2: n.x, y2: n.y });
  }
  _finishRect(t, e) {
    const i = Math.min(t.x, e.x), s = Math.max(t.x, e.x), n = Math.min(t.y, e.y), o = Math.max(t.y, e.y);
    if (s - i < 1 || o - n < 1) return;
    const r = [
      { x: i, y: n },
      { x: s, y: n },
      { x: s, y: o },
      { x: i, y: o }
    ], l = C("r"), a = this._floor.areas.length, c = this._tool === "wallrect";
    if (this._mutate((h) => {
      r.forEach((d, f) => this._addWalls(h, d, r[(f + 1) % 4])), c || h.areas.push({ id: l, name: `Raum ${a + 1}`, points: r, color: gt[a % gt.length], sidebar: [] });
    }), c) {
      this._tool = "select";
      return;
    }
    this._sel = { kind: "area", id: l }, this._tool = "select";
  }
  _setTool(t) {
    this._tool = t, this._chainStart = void 0, this._roomPoints = [];
  }
  // ---------------------------------------------------------------- Darstellung
  render() {
    if (!this._draft) return g;
    const t = $e.find((e) => e.id === this._tool);
    return p`
      <div class="toolbar">
        <button class="icon-btn" title="Schließen" @click=${this._close}><ha-icon icon="mdi:close"></ha-icon></button>
        <div class="main-title">Grundriss bearbeiten${this._dirty ? p`<span class="dirty"> • ungespeichert</span>` : g}</div>
        <button class="icon-btn" title="Rückgängig (Strg+Z)" ?disabled=${!this._undo.length} @click=${this._doUndo}>
          <ha-icon icon="mdi:undo"></ha-icon>
        </button>
        <button class="icon-btn" title="Wiederholen (Strg+Y)" ?disabled=${!this._redo.length} @click=${this._doRedo}>
          <ha-icon icon="mdi:redo"></ha-icon>
        </button>
        ${this._windowsWithoutContact.length ? p`<button
              class="warn-chip"
              title="Fenster ohne Fensterkontakt – zum ersten springen"
              @click=${() => {
      const e = this._windowsWithoutContact[0];
      this._selectOpening(e.floorId, e.opening.id);
    }}
            >
              <ha-icon icon="mdi:alert"></ha-icon>${this._windowsWithoutContact.length} Fenster ohne Kontakt
            </button>` : g}
        <button class="save" ?disabled=${!this._dirty || this._saving} @click=${() => this._save()}>
          ${this._saving ? "Speichert …" : "Speichern"}
        </button>
      </div>
      ${this._error ? p`<div class="error-bar">
            ${this._conflict ? "Der Grundriss wurde inzwischen an anderer Stelle gespeichert." : this._error}
            ${this._conflict ? p`<button @click=${() => this._save(!0)}>Trotzdem überschreiben</button>` : g}
            <button @click=${() => this._error = void 0}>OK</button>
          </div>` : g}
      <div class="body">
        <div class="tools">
          ${$e.map(
      (e) => p`<button class="tool ${e.id === this._tool ? "active" : ""}" title=${e.label} @click=${() => this._setTool(e.id)}>
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
      e.preventDefault(), this._chainStart = void 0, this._openMenu(e.clientX, e.clientY, this._hit(e));
    }}
          >
            ${this._renderCanvas()}
          </svg>
          ${this._menu ? p`<div class="ctx-menu" style="left:${this._menu.x}px;top:${this._menu.y}px">
                ${this._group.length ? p`<button @click=${this._duplicate}><ha-icon icon="mdi:content-duplicate"></ha-icon>Duplizieren</button>
                      <button @click=${this._copy}><ha-icon icon="mdi:content-copy"></ha-icon>Kopieren</button>` : g}
                ${at ? p`<button @click=${this._paste}><ha-icon icon="mdi:content-paste"></ha-icon>Einfügen</button>` : g}
                ${this._group.length ? p`<button @click=${() => (this._menu = void 0, this._deleteSelected())}><ha-icon icon="mdi:delete-outline"></ha-icon>Löschen</button>` : g}
              </div>` : g}
          <div class="hint">${t.hint}</div>
        </div>
        <div class="props">${this._renderProps()}</div>
      </div>
    `;
  }
  _renderCanvas() {
    const t = this._draft, e = this._floor, { width: i, height: s } = t.canvas, n = this._upp, o = t.settings.grid, r = o * 10, l = J(e, t) + 2, a = this._sel, c = this._view, [h, d, f, m] = [c.x - c.w, c.y - c.h, c.w * 3, c.h * 3];
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
      <rect class="sheet" x=${h} y=${d} width=${f} height=${m}></rect>
      ${o * (1 / n) >= 4 ? _`<rect x=${h} y=${d} width=${f} height=${m} fill="url(#grid-major)" pointer-events="none"></rect>` : g}
      <g class="areas">
        ${e.areas.map(
      (u) => _`<g data-kind="area" data-id=${u.id}>${Fe(u, {
        selected: a?.kind === "area" && a.id === u.id,
        labelSize: Math.max(i, s) / 45
      })}</g>`
    )}
      </g>
      ${Ge(e, t, "fp-editor-wall-mask", { selectedId: a?.kind === "wall" ? a.id : void 0 })}
      <g class="wall-hits">
        ${e.walls.map(
      (u) => _`<line data-kind="wall" data-id=${u.id} x1=${u.x1} y1=${u.y1} x2=${u.x2} y2=${u.y2}
                           stroke-width=${Math.max(kt(u, t), 10 * n)}></line>`
    )}
      </g>
      <g class="openings">
        ${e.openings.map(
      (u) => _`<g data-kind="opening" data-id=${u.id}>${He(u, l, { selected: a?.kind === "opening" && a.id === u.id, forceOpen: a?.kind === "opening" && a.id === u.id, warn: Ot(u), leafIndex: a?.kind === "opening" && a.id === u.id ? this._leafSel ?? void 0 : void 0 })}</g>`
    )}
      </g>
      <g class="items">${e.items.map((u) => this._renderItem(u, n))}</g>
      ${this._renderSelectionOverlay(n)}
      ${this._renderDrawPreview(n)}
      ${this._renderGuides(n)}
    `;
  }
  _renderItem(t, e) {
    const i = (t.size ?? 34) / 34 * It * e, s = this._sel?.kind === "item" && this._sel.id === t.id, n = t.icon ?? (t.entity ? L(this.hass, t.entity) : "mdi:map-marker");
    return _`
      <g class="item ${s ? "selected" : ""}" data-kind="item" data-id=${t.id}>
        <circle cx=${t.x} cy=${t.y} r=${i}></circle>
        <foreignObject x=${t.x - i} y=${t.y - i} width=${2 * i} height=${2 * i}>
          <div class="fo-icon" style="--mdc-icon-size:${i * 1.2}px;width:${2 * i}px;height:${2 * i}px">
            <ha-icon .icon=${n}></ha-icon>
          </div>
        </foreignObject>
        ${t.label ? _`<text x=${t.x} y=${t.y + i + 12 * e} font-size=${11 * e} text-anchor="middle" class="item-label">${t.label}</text>` : g}
      </g>`;
  }
  _renderGuides(t) {
    const e = this._view;
    return _`${this._guides.map(
      (i) => i.axis === "x" ? _`<line class="guide" x1=${i.value} x2=${i.value} y1=${e.y} y2=${e.y + e.h} stroke-width=${t}></line><circle class="guide-dot" cx=${i.ref.x} cy=${i.ref.y} r=${5 * t}></circle>` : _`<line class="guide" y1=${i.value} y2=${i.value} x1=${e.x} x2=${e.x + e.w} stroke-width=${t}></line><circle class="guide-dot" cx=${i.ref.x} cy=${i.ref.y} r=${5 * t}></circle>`
    )}`;
  }
  _renderSelectionOverlay(t) {
    if (this._marquee) {
      const { a: s, b: n } = this._marquee;
      return _`<rect class="marquee" x=${Math.min(s.x, n.x)} y=${Math.min(s.y, n.y)} width=${Math.abs(s.x - n.x)} height=${Math.abs(s.y - n.y)} stroke-width=${t}></rect>`;
    }
    if (this._multi.length > 1) {
      const s = 4 * t;
      return _`${this._multi.map((n) => {
        const o = this._bbox(n);
        return o ? _`<rect class="sel-outline" x=${o.x - s} y=${o.y - s} width=${o.w + 2 * s} height=${o.h + 2 * s} stroke-width=${2 * t}></rect>` : g;
      })}`;
    }
    const e = this._findSelected();
    if (!e || !this._sel) return g;
    if (this._sel.kind === "item" && yt(e)) {
      const s = e, n = s.glowRadius ?? Ft, o = (a) => kt(a, this._draft), r = We(this._floor.walls, this._floor.openings, (a) => Ue(a), o), l = De(s.x, s.y, n, r, o);
      return l ? _`<polygon class="glow-reach" points=${l.map((a) => `${a.x},${a.y}`).join(" ")} stroke-width=${1.5 * t}></polygon>` : _`<circle class="glow-reach" cx=${s.x} cy=${s.y} r=${n} stroke-width=${1.5 * t}></circle>`;
    }
    const i = rs * t;
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
      )}
        ${s.points.map((n, o) => {
        const r = s.points[(o + 1) % s.points.length];
        return _`<rect class="handle" data-handle="e${o}" x=${(n.x + r.x) / 2 - i} y=${(n.y + r.y) / 2 - i} width=${2 * i} height=${2 * i} rx=${i / 3} stroke-width=${2 * t}></rect>`;
      })}`;
    }
    return g;
  }
  _lengthLabel(t, e, i) {
    const s = w(t, e);
    return s < 1 ? g : _`<text class="measure" x=${(t.x + e.x) / 2} y=${(t.y + e.y) / 2 - 10 * i} font-size=${12 * i}
                     text-anchor="middle">${ls(s)}</text>`;
  }
  _renderDrawPreview(t) {
    const e = this._cursor;
    if (!e) return g;
    const i = { altKey: !1 };
    if (this._tool === "wall") {
      const s = this._snap(e, i);
      if (!this._chainStart) return _`<circle class="cursor-dot" cx=${s.x} cy=${s.y} r=${4 * t}></circle>`;
      const n = Ct(this._chainStart, s);
      return _`
        <line class="preview-wall" x1=${this._chainStart.x} y1=${this._chainStart.y} x2=${n.x} y2=${n.y}
              stroke-width=${this._draft.settings.wallThickness}></line>
        ${this._lengthLabel(this._chainStart, n, t)}`;
    }
    if (this._tool === "rect" || this._tool === "wallrect") {
      const s = this._snap(e, i), n = this._drag;
      if (n?.mode !== "rect") return _`<circle class="cursor-dot" cx=${s.x} cy=${s.y} r=${4 * t}></circle>`;
      const o = Math.min(n.start.x, s.x), r = Math.min(n.start.y, s.y), l = Math.abs(s.x - n.start.x), a = Math.abs(s.y - n.start.y);
      return _`
        <rect class="preview-area" x=${o} y=${r} width=${l} height=${a} stroke-width=${2 * t}></rect>
        ${l > 1 ? this._lengthLabel({ x: o, y: r }, { x: o + l, y: r }, t) : g}
        ${a > 1 ? this._lengthLabel({ x: o + l, y: r }, { x: o + l, y: r + a }, t) : g}`;
    }
    if (this._tool === "area") {
      const s = this._snap(e, i), n = [...this._roomPoints, s];
      return _`
        <polyline class="preview-area" points=${n.map((o) => `${o.x},${o.y}`).join(" ")} stroke-width=${2 * t}></polyline>
        ${this._roomPoints.map((o, r) => _`<circle class="cursor-dot ${r === 0 ? "first" : ""}" cx=${o.x} cy=${o.y} r=${(r === 0 ? 6 : 4) * t}></circle>`)}
        <circle class="cursor-dot" cx=${s.x} cy=${s.y} r=${4 * t}></circle>`;
    }
    if (this._tool === "door" || this._tool === "window") {
      const s = Pt(e, this._floor.walls, J(this._floor, this._draft) + W * 2 * t);
      return s ? _`<circle class="cursor-dot" cx=${s.point.x} cy=${s.point.y} r=${5 * t}></circle>` : g;
    }
    if (this._tool === "item") {
      const s = this._snap(e, i);
      return _`<circle class="preview-item" cx=${s.x} cy=${s.y} r=${It * t}></circle>`;
    }
    return g;
  }
  // ---------------------------------------------------------------- Eigenschaften
  _renderProps() {
    if (this._multi.length > 1) return this._renderMultiProps();
    const t = this._findSelected();
    if (!t || !this._sel) return this._renderPlanProps();
    const e = { wall: "Wand", opening: t.type === "window" ? "Fenster" : "Tür", area: "Raum", item: "Icon" }[this._sel.kind];
    return p`
      <div class="props-head">
        <h3>${e}</h3>
        <button class="icon-btn" title="Duplizieren (Strg+D)" @click=${this._duplicate}><ha-icon icon="mdi:content-duplicate"></ha-icon></button>
        <button class="icon-btn" title="Löschen (Entf)" @click=${this._deleteSelected}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
        <button class="icon-btn" title="Auswahl aufheben" @click=${() => this._sel = void 0}><ha-icon icon="mdi:close"></ha-icon></button>
      </div>
      ${this._sel.kind === "wall" ? this._renderWallProps(t) : this._sel.kind === "opening" ? this._renderOpeningProps(t) : this._sel.kind === "area" ? this._renderAreaProps(t) : this._renderItemProps(t)}
    `;
  }
  _renderMultiProps() {
    const t = (e) => this._multi.filter((i) => i.kind === e).length;
    return p`
      <div class="props-head">
        <h3>${this._multi.length} Elemente</h3>
        <button class="icon-btn" title="Löschen (Entf)" @click=${this._deleteSelected}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
        <button class="icon-btn" title="Auswahl aufheben" @click=${() => this._sel = void 0}><ha-icon icon="mdi:close"></ha-icon></button>
      </div>
      <p class="muted">${t("wall")} Wände · ${t("opening")} Türen/Fenster · ${t("area")} Räume · ${t("item")} Icons</p>
      <div class="row-btns">
        <button class="chip" @click=${this._duplicate}><ha-icon icon="mdi:content-duplicate"></ha-icon>Duplizieren</button>
        <button class="chip" @click=${this._copy}><ha-icon icon="mdi:content-copy"></ha-icon>Kopieren</button>
        <button class="chip" @click=${this._saveTemplate}><ha-icon icon="mdi:content-save-outline"></ha-icon>Als Vorlage</button>
      </div>
      <p class="muted">Ziehen verschiebt alle gemeinsam. Strg+C / Strg+V kopieren und einfügen, auch auf andere Etagen.</p>
    `;
  }
  _num(t, e, i, s = {}) {
    return p`<label class="field">
      <span>${t}</span>
      <input
        type="number"
        .value=${i == null ? "" : String(I(i))}
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
    return p`<label class="field">
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
    return p`<label class="check">
      <input type="checkbox" .checked=${!!i} @change=${(s) => this._setProp(e, s.target.checked)} />
      <span>${t}</span>
    </label>`;
  }
  _color(t, e, i, s) {
    return p`<label class="field color">
      <span>${t}</span>
      <input type="color" .value=${i && i.startsWith("#") ? i : s} @change=${(n) => this._setProp(e, n.target.value)} />
      ${i ? p`<button class="link" @click=${() => this._setProp(e, void 0)}>Standard</button>` : g}
    </label>`;
  }
  _entity(t, e, i, s = []) {
    return p`<div class="field">
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
    return p`
      <div class="grid2">
        ${this._num("x1", "x1", t.x1)} ${this._num("y1", "y1", t.y1)} ${this._num("x2", "x2", t.x2)} ${this._num("y2", "y2", t.y2)}
      </div>
      ${this._num("Stärke", "thickness", t.thickness, { min: 1, max: 100, placeholder: `Standard (${this._draft.settings.wallThickness})` })}
      <label class="field">
        <span>Länge</span>
        <input type="number" min="1" step="1" .value=${String(I(w({ x: t.x1, y: t.y1 }, { x: t.x2, y: t.y2 })))}
               @change=${(e) => this._setWallLength(Number(e.target.value))} />
      </label>
      <p class="muted">Länge ändern verschiebt den zweiten Endpunkt; verbundene Wände ziehen mit.</p>
    `;
  }
  /** Raum, der bei diesem Treffer als Ganzes gewählt wird (undefined: Element direkt wählen). */
  _roomTarget(t) {
    if (t.kind === "area") return this._floor.areas.find((n) => n.id === t.id);
    if (t.kind !== "wall") return;
    const e = this._floor.walls.find((n) => n.id === t.id);
    if (!e) return;
    const i = Di(e, this._floor.areas), s = this._sel;
    if (!(!i.length || s?.kind === "wall" && s.id === e.id))
      return i.find((n) => s?.kind === "area" && s.id === n.id) ? void 0 : i[0];
  }
  _roomGroup(t) {
    const e = this._floor, i = Ie(t, e.walls), s = [{ kind: "area", id: t.id }, ...i.map((n) => ({ kind: "wall", id: n.id }))];
    for (const n of e.openings)
      i.some((o) => wt({ x: n.x, y: n.y }, { x: o.x1, y: o.y1 }, { x: o.x2, y: o.y2 }, 3)) && s.push({ kind: "opening", id: n.id });
    for (const n of e.items) q(t.points, n.x, n.y) && s.push({ kind: "item", id: n.id });
    return s;
  }
  _edgeSetup(t, e) {
    const i = t.points[e], s = t.points[(e + 1) % t.points.length], n = w(i, s) || 1, o = { x: -(s.y - i.y) / n, y: (s.x - i.x) / n }, r = [], l = (a) => wt(a, i, s);
    for (const a of this._floor.areas)
      for (const c of a.points) l(c) && r.push({ x: c.x, y: c.y, set: (h, d) => Object.assign(c, { x: h, y: d }) });
    for (const a of this._floor.walls)
      l({ x: a.x1, y: a.y1 }) && r.push({ x: a.x1, y: a.y1, set: (c, h) => Object.assign(a, { x1: c, y1: h }) }), l({ x: a.x2, y: a.y2 }) && r.push({ x: a.x2, y: a.y2, set: (c, h) => Object.assign(a, { x2: c, y2: h }) });
    return { n: o, pts: r };
  }
  _setWallLength(t) {
    const e = this._findSelected();
    if (!e || !Number.isFinite(t) || t < 1) return;
    const i = w({ x: e.x1, y: e.y1 }, { x: e.x2, y: e.y2 });
    i < 0.01 || this._mutate(() => {
      const s = this._linksAt(e, 2), n = t / i, o = { x: I(e.x1 + (e.x2 - e.x1) * n), y: I(e.y1 + (e.y2 - e.y1) * n) };
      e.x2 = o.x, e.y2 = o.y, this._applyLink(s, o);
    });
  }
  _setRectSize(t, e, i) {
    const s = fe(t.points);
    !s || !(e >= 1) || !(i >= 1) || this._mutate(() => {
      const n = t.points.map((o) => this._linksAt(void 0, 0, o, t));
      t.points.forEach((o, r) => {
        const l = { x: o.x === s.x ? s.x : s.x + e, y: o.y === s.y ? s.y : s.y + i };
        Object.assign(o, l), this._applyLink(n[r], l);
      });
    });
  }
  _autoPlaceIcons(t) {
    const e = new Set(this._floor.items.map((o) => o.entity).filter(Boolean)), i = t.sidebar.map((o) => o.entity).filter((o) => !e.has(o));
    if (!i.length) return;
    const s = this._floor.items.filter((o) => q(t.points, o.x, o.y)).map((o) => ({ x: o.x, y: o.y })), n = Ti(t.points, i.map((o) => ({ light: M(o) === "light" })), s, Qt(t.points));
    this._mutate((o) => {
      i.forEach((r, l) => o.items.push({ id: C("i"), x: n[l].x, y: n[l].y, entity: r, icon: L(this.hass, r), tapAction: "auto" }));
    });
  }
  _renderOpeningProps(t) {
    const e = t.type === "window", i = Ot(t), s = Ht(t), n = Bt(t), o = (r) => t.shutters?.find((l) => l.side === r);
    return p`
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
      ${e ? p`
            <div class="field ${i ? "required-missing" : ""}">
              <span>Gesamtkontakt (für Flügel ohne eigenen Sensor)</span>
              <fp-entity-picker
                .hass=${this.hass}
                .value=${t.entity ?? ""}
                .domains=${["binary_sensor"]}
                placeholder="Fensterkontakt wählen …"
                @value-changed=${(r) => this._setProp("entity", r.detail.value)}
              ></fp-entity-picker>
              ${i ? p`<span class="warn">Ohne Sensor kann der Öffnungszustand nicht angezeigt werden.</span>` : g}
            </div>
            <h4>Flügel (${s.length} von ${jt})</h4>
            ${s.map(
      (r, l) => p`<div class="leaf-row ${this._leafSel === l ? "active" : ""}" @click=${() => this._leafSel = l}>
                <div class="leaf-head">
                  <b>${l + 1}</b>
                  <label>
                    Breite
                    <input
                      type="number"
                      min="10"
                      step="1"
                      .value=${String(Math.round(n[l].x1 - n[l].x0))}
                      ?disabled=${s.length === 1}
                      @change=${(a) => this._setLeafWidth(l, Number(a.target.value))}
                    />
                  </label>
                  <button
                    title="Anschlag wechseln"
                    @click=${() => this._setLeaf(l, { hinge: n[l].hinge === "right" ? "left" : "right" })}
                  >
                    <ha-icon icon="mdi:swap-horizontal"></ha-icon> ${n[l].hinge === "right" ? "rechts" : "links"}
                  </button>
                </div>
                <fp-entity-picker
                  .hass=${this.hass}
                  .value=${r.entity ?? ""}
                  .domains=${["binary_sensor"]}
                  placeholder="Eigener Sensor (optional)"
                  @value-changed=${(a) => this._setLeaf(l, { entity: a.detail.value || void 0 })}
                ></fp-entity-picker>
              </div>`
    )}
            <div class="btn-row">
              <button ?disabled=${s.length >= jt} @click=${() => this._setLeafCount(s.length + 1)}>
                <ha-icon icon="mdi:plus"></ha-icon> Flügel
              </button>
              <button ?disabled=${s.length <= 1} @click=${() => this._setLeafCount(s.length - 1)}>
                <ha-icon icon="mdi:minus"></ha-icon> Flügel
              </button>
              <button @click=${() => this._setProp("swing", t.swing === "out" ? "in" : "out")}>
                <ha-icon icon="mdi:swap-vertical"></ha-icon> Richtung
              </button>
            </div>` : p`
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
      ${this._color("Farbe wenn offen", "openColor", t.openColor, Re)}
      <p class="muted">Im Editor wird die ausgewählte Öffnung geöffnet gezeigt. Ziehen schiebt sie entlang der Wände.</p>
      ${e ? p`<h4>Rollo</h4>
            ${["out", "in"].map((r) => {
      const l = o(r);
      return p`<div class="shutter-row">
                <div class="field">
                  <span>${r === "out" ? "Außen" : "Innen"} (optional)</span>
                  <fp-entity-picker
                    .hass=${this.hass}
                    .value=${l?.entity ?? ""}
                    .domains=${["cover"]}
                    @value-changed=${(a) => this._setShutter(r, { entity: a.detail.value })}
                  ></fp-entity-picker>
                </div>
                ${l ? p`<label class="field color">
                      <span>Farbe</span>
                      <input
                        type="color"
                        .value=${l.color && l.color.startsWith("#") ? l.color : Te}
                        @change=${(a) => this._setShutter(r, { color: a.target.value })}
                      />
                    </label>` : g}
              </div>`;
    })}
            <p class="muted">Außen liegt auf der Seite gegen den Aufschlag „innen“; die Tiefe des Bands zeigt, wie weit das Rollo zu ist.</p>` : g}
    `;
  }
  /** Ändert die Flügelliste des ausgewählten Fensters. */
  _editLeaves(t) {
    this._mutate(() => {
      const e = this._findSelected();
      e && (e.leaves = t(Ht(e).map((i) => ({ ...i })), e));
    });
  }
  _setLeaf(t, e) {
    this._leafSel = t, this._editLeaves((i, s) => {
      if (e.hinge === void 0) return i.map((o, r) => r === t ? ve({ ...o, ...e }) : o);
      const n = Bt(s);
      return i.map((o, r) => r === t ? ve({ ...o, ...e }) : { ...o, hinge: o.hinge ?? n[r].hinge });
    });
  }
  _setLeafCount(t) {
    this._editLeaves((e) => Xi(e, t)), this._leafSel = Math.min(this._leafSel ?? 0, t - 1);
  }
  _setLeafWidth(t, e) {
    Number.isFinite(e) && this._editLeaves((i, s) => Yi(i, t, e, s.length));
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
    return p`
      ${this._text("Name", "name", t.name)}
      <label class="field">
        <span>Art</span>
        <select @change=${(s) => this._setProp("type", s.target.value)}>
          ${Ui.map(([s, n]) => p`<option value=${s} ?selected=${(t.type ?? "room") === s}>${n}</option>`)}
        </select>
      </label>
      ${t.type === "custom" ? this._text("Bezeichnung", "typeLabel", t.typeLabel) : g}
      <div class="grid2">
        ${this._color("Farbe", "color", t.color, "#4f8bd6")}
        <label class="field">
          <span>Deckkraft</span>
          <input type="range" min="0" max="0.6" step="0.02" .value=${String(t.opacity ?? 0.12)}
                 @change=${(s) => this._setProp("opacity", Number(s.target.value))} />
        </label>
      </div>
      ${(() => {
      const s = fe(t.points);
      return s ? p`<div class="grid2">
              <label class="field"><span>Breite</span><input type="number" min="1" .value=${String(I(s.w))} @change=${(n) => this._setRectSize(t, Number(n.target.value), s.h)} /></label>
              <label class="field"><span>Höhe</span><input type="number" min="1" .value=${String(I(s.h))} @change=${(n) => this._setRectSize(t, s.w, Number(n.target.value))} /></label>
            </div>` : g;
    })()}
      ${this._check("Name im Plan anzeigen", "showName", t.showName !== !1)}
      ${this._num("Zoom beim Antippen", "zoom", t.zoom ?? void 0, { min: 1, max: 10, step: 0.25, placeholder: "automatisch einpassen" })}
      <details>
        <summary>Mehr</summary>
        ${e.length ? p`<label class="field">
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
                ${e.map((s) => p`<option value=${s.area_id} ?selected=${t.haArea === s.area_id}>${s.name}</option>`)}
              </select>
            </label>` : g}
        ${this._entity("Raum einfärben, wenn aktiv", "entity", t.entity, ["binary_sensor", "input_boolean", "light", "switch", "person"])}
        ${t.entity ? this._color("Farbe wenn aktiv", "activeColor", t.activeColor, "#ffc107") : g}
      </details>

      <h4>Seitenleiste</h4>
      <p class="muted">Nur was hier steht, erscheint beim Antippen des Raums – Geräte, Szenen und Skripte.</p>
      <div class="sidebar-list">
        ${t.sidebar.map(
      (s, n) => p`<div class="sb-row">
            <ha-icon .icon=${L(this.hass, s.entity, s.icon)}></ha-icon>
            <div class="sb-main">
              <input
                type="text"
                .value=${s.name ?? ""}
                placeholder=${$t(this.hass, s.entity)}
                @change=${(o) => this._editSidebar(n, "name", o.target.value.trim())}
              />
              <small>${s.entity} · ${{ device: "Gerät", scene: "Szene", script: "Skript" }[Tt(s.entity)]}${this.hass.states[s.entity] ? "" : " · nicht gefunden"}</small>
            </div>
            <button class="icon-btn" title="Nach oben" ?disabled=${n === 0} @click=${() => this._moveSidebar(n, -1)}><ha-icon icon="mdi:chevron-up"></ha-icon></button>
            <button class="icon-btn" title="Nach unten" ?disabled=${n === t.sidebar.length - 1} @click=${() => this._moveSidebar(n, 1)}><ha-icon icon="mdi:chevron-down"></ha-icon></button>
            <button class="icon-btn" title="Entfernen" @click=${() => this._removeSidebar(n)}><ha-icon icon="mdi:close"></ha-icon></button>
          </div>`
    )}
      </div>
      ${t.sidebar.length ? p`<button class="chip" title="Fehlende Icons für die Seitenleisten-Geräte im Raum verteilen" @click=${() => this._autoPlaceIcons(t)}>
            <ha-icon icon="mdi:auto-fix"></ha-icon>Icons automatisch platzieren
          </button>` : g}
      <fp-entity-picker
        .hass=${this.hass}
        .exclude=${t.sidebar.map((s) => s.entity)}
        clearOnSelect
        placeholder="Gerät, Szene oder Skript hinzufügen …"
        @value-changed=${(s) => s.detail.value && this._addSidebar(s.detail.value)}
      ></fp-entity-picker>
      ${i.length ? p`<div class="suggest">
            <span class="muted">Vorschläge aus dem HA-Bereich – zum Übernehmen antippen:</span>
            <div class="chips">
              ${i.map(
      (s) => p`<button class="chip" title=${s} @click=${() => this._addSidebar(s)}>
                  <ha-icon .icon=${L(this.hass, s)}></ha-icon>${$t(this.hass, s)}
                </button>`
    )}
            </div>
          </div>` : g}
    `;
  }
  /** Entitäten des verknüpften HA-Bereichs, die noch nicht in der Seitenleiste sind (nur Vorschlag). */
  _areaSuggestions(t) {
    if (!t.haArea || !this.hass.entities) return [];
    const e = new Set(t.sidebar.map((n) => n.entity)), i = this.hass.devices, s = /* @__PURE__ */ new Set(["light", "switch", "fan", "cover", "climate", "media_player", "lock", "scene", "script", "vacuum", "input_boolean", "sensor", "binary_sensor", "humidifier", "valve", "button"]);
    return Object.values(this.hass.entities).filter((n) => !n.hidden && !e.has(n.entity_id) && s.has(M(n.entity_id))).filter((n) => (n.area_id ?? (n.device_id ? i?.[n.device_id]?.area_id : void 0)) === t.haArea).map((n) => n.entity_id).slice(0, 30);
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
    return p`
      <div class="field">
        <span>Icon</span>
        <div class="icon-input">
          <ha-icon .icon=${t.icon ?? (t.entity ? L(this.hass, t.entity) : "mdi:map-marker")}></ha-icon>
          <input type="text" .value=${t.icon ?? ""} placeholder=${t.entity ? "vom Gerät" : "mdi:…"}
                 @change=${(e) => this._setProp("icon", e.target.value.trim())} />
        </div>
        <div class="icon-grid">
          ${as.map(
      (e) => p`<button class="icon-pick ${t.icon === e ? "active" : ""}" title=${e} @click=${() => this._setProp("icon", e)}>
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
    ].map(([e, i]) => p`<option value=${e} ?selected=${(t.tapAction ?? "auto") === e}>${i}</option>`)}
        </select>
      </label>
      <div class="grid2">
        ${this._num("Größe (px)", "size", t.size, { min: 8, max: 200, placeholder: "34" })}
        ${this._color("Farbe wenn an", "activeColor", t.activeColor, "#ffb300")}
      </div>
      ${this._check("Zustand anzeigen", "showState", t.showState)}
      <h4>Lichtschein</h4>
      <label class="check">
        <input type="checkbox" .checked=${yt(t)} @change=${(e) => this._setProp("glow", e.target.checked)} />
        <span>Lichtschein anzeigen${t.glow === void 0 || t.glow === null ? " (automatisch)" : ""}</span>
      </label>
      ${yt(t) ? p`<div class="grid2">
              ${this._num("Radius", "glowRadius", t.glowRadius, { min: 10, max: 5e3, step: 10, placeholder: String(Ft) })}
              ${this._color("Farbe ohne RGB", "glowColor", t.glowColor, Le)}
            </div>
            <p class="muted">Bei voller Helligkeit; gedimmt schrumpft der Schein. RGB-Lampen leuchten in ihrer eigenen Farbe. Die gestrichelte Kontur zeigt, wo Wände das Licht begrenzen.</p>` : g}
      <h4>Sichtbarkeit</h4>
      ${this._check("Nur zeigen, wenn der Raum gezoomt ist", "showOnlyWhenZoomed", t.showOnlyWhenZoomed)}
      ${t.showOnlyWhenZoomed ? p`<label class="field">
            <span>Gehört zu Raum</span>
            <select @change=${(e) => this._setProp("area", e.target.value)}>
              <option value="">automatisch (Lage im Raum)</option>
              ${this._floor.areas.map((e) => p`<option value=${e.id} ?selected=${t.area === e.id}>${e.name || e.id}</option>`)}
            </select>
          </label>` : g}
      ${!t.area && !this._floor.areas.some((e) => q(e.points, t.x, t.y)) && t.showOnlyWhenZoomed ? p`<p class="warn">Das Icon liegt in keinem Raum und wird deshalb nie angezeigt.</p>` : g}
    `;
  }
  _renderPlanProps() {
    const t = this._draft, e = this._floor;
    return p`
      <div class="props-head"><h3>Etage &amp; Plan</h3></div>
      <label class="field">
        <span>Etage</span>
        <div class="row">
          <select
            @change=${(i) => {
      this._floorId = i.target.value, this._sel = void 0;
    }}
          >
            ${t.floors.map((i) => p`<option value=${i.id} ?selected=${i.id === this._floorId}>${i.name || i.id}</option>`)}
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
        <label class="field">
          <span>Raster</span>
          <select @change=${(i) => this._mutate(() => t.settings.grid = Number(i.target.value))}>
            ${(zt.includes(t.settings.grid) ? zt : [...zt, t.settings.grid].sort((i, s) => i - s)).map(
      (i) => p`<option value=${i} ?selected=${i === t.settings.grid}>${i}</option>`
    )}
          </select>
        </label>
      </div>
      <p class="muted">Die Zeichenfläche ist unbegrenzt. Einheiten frei wählbar – Zentimeter bieten sich an (1000 = 10 m).</p>
      <p class="muted">
        ${e.walls.length} Wände · ${e.openings.length} Türen/Fenster · ${e.areas.length} Räume · ${e.items.length} Icons
      </p>
      ${this._windowsWithoutContact.length ? p`<h4>Fenster ohne Kontakt</h4>
            <div class="room-list">
              ${this._windowsWithoutContact.map(
      ({ floorId: i, opening: s }) => p`<button class="room-btn warn-row" @click=${() => this._selectOpening(i, s.id)}>
                  <ha-icon icon="mdi:window-closed-variant"></ha-icon>${s.id}
                  <small>${this._draft.floors.find((n) => n.id === i)?.name || i}</small>
                </button>`
    )}
            </div>` : g}
      <h4>Vorlagen</h4>
      ${t.settings.templates?.length ? p`<div class="room-list">
            ${t.settings.templates.map(
      (i) => p`<div class="row">
                <button class="room-btn" title="In die Mitte der Ansicht einfügen" @click=${() => this._insertTemplate(i)}>
                  <ha-icon icon="mdi:shape-plus-outline"></ha-icon>${i.name}
                  <small>${i.walls.length + i.openings.length + i.areas.length + i.items.length} Elemente</small>
                </button>
                <button class="icon-btn" title="Vorlage löschen" @click=${() => this._deleteTemplate(i.id)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
              </div>`
    )}
          </div>` : p`<p class="muted">Mehrere Elemente auswählen und als Vorlage speichern, um sie später wieder einzufügen.</p>`}
      <h4>Räume</h4>
      <div class="room-list">
        ${e.areas.length ? e.areas.map(
      (i) => p`<button class="room-btn" @click=${() => this._sel = { kind: "area", id: i.id }}>
                <span class="swatch" style="background:${i.color ?? "var(--primary-color)"}"></span>
                ${i.name || i.id}<small>${i.sidebar.length} in Seitenleiste</small>
              </button>`
    ) : p`<p class="muted">Noch keine Räume – mit dem Werkzeug „Raum“ zeichnen.</p>`}
      </div>
      <h4>Verlauf</h4>
      ${this._history ? this._history.length ? p`<div class="history">
              ${this._history.map(
      (i) => p`<div class="hist-row">
                  <span>${new Date(i.created).toLocaleString()}<small> · Rev. ${i.revision} · ${i.reason}</small></span>
                  <button class="link" @click=${() => this._restoreHistory(i.id)}>Wiederherstellen</button>
                </div>`
    )}
            </div>` : p`<p class="muted">Noch keine früheren Stände.</p>` : p`<button class="link" @click=${this._loadHistory}>Frühere Stände anzeigen</button>`}
      <h4>Beispiel</h4>
      <button class="link" @click=${this._loadSample}>Beispiel-Grundriss laden</button>
    `;
  }
  _planNum(t, e, i, s) {
    return p`<label class="field">
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
    const e = C("etage");
    this._mutate((i, s) => s.floors.push({ id: e, name: t, walls: [], openings: [], areas: [], items: [] })), this._floorId = e, this._sel = void 0;
  }
  _deleteFloor() {
    if (this._draft.floors.length < 2 || !confirm(`Etage „${this._floor.name || this._floorId}“ mit allem Inhalt löschen?`)) return;
    const t = this._floorId;
    this._mutate((e, i) => i.floors = i.floors.filter((s) => s.id !== t)), this._floorId = this._draft.floors[0].id, this._sel = void 0;
  }
};
b.styles = [
  Vt(Be),
  nt`
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
v([
  $({ attribute: !1 })
], b.prototype, "hass", 2);
v([
  $({ attribute: !1 })
], b.prototype, "plan", 2);
v([
  $({ attribute: !1 })
], b.prototype, "revision", 2);
v([
  $({ attribute: !1 })
], b.prototype, "floorId", 2);
v([
  $({ attribute: !1 })
], b.prototype, "initialAreaId", 2);
v([
  $({ type: Boolean, reflect: !0 })
], b.prototype, "narrow", 2);
v([
  x()
], b.prototype, "_draft", 2);
v([
  x()
], b.prototype, "_floorId", 2);
v([
  x()
], b.prototype, "_tool", 2);
v([
  x()
], b.prototype, "_sel", 2);
v([
  x()
], b.prototype, "_multi", 2);
v([
  x()
], b.prototype, "_marquee", 2);
v([
  x()
], b.prototype, "_guides", 2);
v([
  x()
], b.prototype, "_menu", 2);
v([
  x()
], b.prototype, "_leafSel", 2);
v([
  x()
], b.prototype, "_view", 2);
v([
  x()
], b.prototype, "_cursor", 2);
v([
  x()
], b.prototype, "_chainStart", 2);
v([
  x()
], b.prototype, "_roomPoints", 2);
v([
  x()
], b.prototype, "_dirty", 2);
v([
  x()
], b.prototype, "_saving", 2);
v([
  x()
], b.prototype, "_error", 2);
v([
  x()
], b.prototype, "_conflict", 2);
v([
  x()
], b.prototype, "_history", 2);
v([
  x()
], b.prototype, "_svgSize", 2);
v([
  Ce("svg.canvas")
], b.prototype, "_svg", 2);
b = v([
  st("fp-editor")
], b);
function ve(t) {
  const e = { w: t.w };
  return t.entity && (e.entity = t.entity), t.hinge && (e.hinge = t.hinge), e;
}
function I(t) {
  return Math.round(t * 10) / 10;
}
function we(t, e) {
  const i = (e % 360 + 360) % 360, s = (i + 180) % 360, n = (t % 360 + 360) % 360, o = (r) => Math.min(Math.abs(r - n), 360 - Math.abs(r - n));
  return I(o(i) <= o(s) ? i : s);
}
function ls(t) {
  return t >= 100 ? `${(t / 100).toFixed(2).replace(".", ",")} m` : `${Math.round(t)} cm`;
}
var cs = Object.defineProperty, hs = Object.getOwnPropertyDescriptor, X = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? hs(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (n = (s ? r(e, i, n) : r(n)) || n);
  return s && n && cs(e, i, n), n;
};
const ds = /* @__PURE__ */ new Set(["light", "switch", "fan", "input_boolean", "siren"]), ps = 1.35, us = 34, Ke = 380, qe = 700, fs = 0.55;
let ms = 0, j = class extends N {
  constructor() {
    super(...arguments), this.popupOpen = !1, this._box = { w: 0, h: 0 }, this._maskId = `fp-wall-mask-${++ms}`;
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
    const { w: t, h: e } = Wt(this.floor, this.plan), i = getComputedStyle(this), s = this.clientWidth - parseFloat(i.paddingLeft) - parseFloat(i.paddingRight), n = this.clientHeight - parseFloat(i.paddingTop) - parseFloat(i.paddingBottom);
    if (!s || !n) return;
    const o = Math.min(s / t, n / e), r = Math.floor(t * o), l = Math.floor(e * o);
    (r !== this._box.w || l !== this._box.h) && (this._box = { w: r, h: l });
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
    s === "auto" && (Lt(i) ? s = "toggle" : s = ds.has(M(i)) ? "toggle" : "more-info"), s !== "none" && (s === "more-info" ? vt(this, i) : Lt(i) ? await Dt(this.hass, i) : await ze(this.hass, i));
  }
  _onItemContext(t, e) {
    e.entity && (t.preventDefault(), vt(this, e.entity));
  }
  render() {
    if (!this.plan || !this.floor) return g;
    const t = this.floor, e = Wt(t, this.plan), { w: i, h: s } = e, n = t.areas.find((a) => a.id === this.zoomedAreaId);
    let o = n ? Ei(
      n.points.map((a) => ({ x: a.x - e.x, y: a.y - e.y })),
      i,
      s,
      void 0,
      void 0,
      Mi(n)
    ) : Ut;
    n && this.popupOpen && o.scale > 1 && (o = this._shiftForPopup(o));
    const r = o.scale > 1 ? ps / o.scale : 1, l = Math.max(this.plan.canvas.width, this.plan.canvas.height) / 45;
    return p`
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
      (a) => _`<g @click=${(c) => this._onAreaClick(c, a.id)}>${Fe(a, {
        hass: this.hass,
        selected: a.id === this.zoomedAreaId,
        dimmed: !!n && a.id !== n.id,
        labelSize: l
      })}</g>`
    )}
            </g>
            ${Ki(t, this.plan, this.hass, `${this._maskId}-glow`)}
            ${Ge(t, this.plan, this._maskId)} ${is(t, this.plan, { hass: this.hass })}
          </svg>
          <div class="items">
            ${t.items.filter((a) => !Ci(a, n, t.areas)).map((a) => this._renderItem(a, e))}
          </div>
        </div>
      </div>
    `;
  }
  /** Verschiebt den gezoomten Raum in den Bereich, den das Popup frei lässt (links bzw. oben). */
  _shiftForPopup(t) {
    return !this._box.w || !this._box.h ? t : this.clientWidth < qe ? { ...t, tyPercent: t.tyPercent - this.clientHeight * fs / 2 / this._box.h * 100 } : { ...t, txPercent: t.txPercent - (Ke + 32) / 2 / this._box.w * 100 };
  }
  _renderItem(t, e) {
    const i = e.w, s = e.h, n = t.entity ? this.hass.states[t.entity] : void 0, o = et(n), r = !!t.entity && Nt(n), l = t.icon ?? (t.entity ? L(this.hass, t.entity) : "mdi:map-marker"), a = t.size ?? us, c = o ? t.activeColor ?? "var(--fp-active-color, #ffb300)" : t.color ?? "", h = t.label ?? n?.attributes.friendly_name ?? t.entity ?? "";
    return p`
      <div
        class="item ${o ? "active" : ""} ${r ? "unavailable" : ""} ${t.entity ? "interactive" : ""}"
        style="left:${(t.x - e.x) / i * 100}%;top:${(t.y - e.y) / s * 100}%;--fp-item-size:${a}px;${c ? `--fp-item-color:${c}` : ""}"
        title=${h}
        @click=${(d) => this._onItemClick(d, t)}
        @contextmenu=${(d) => this._onItemContext(d, t)}
      >
        <div class="badge"><ha-icon .icon=${l}></ha-icon></div>
        ${t.label ? p`<div class="label">${t.label}</div>` : g}
        ${t.showState && n ? p`<div class="state">${Oe(this.hass, n)}</div>` : g}
      </div>
    `;
  }
};
j.styles = [
  Vt(Be),
  nt`
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
X([
  $({ attribute: !1 })
], j.prototype, "hass", 2);
X([
  $({ attribute: !1 })
], j.prototype, "plan", 2);
X([
  $({ attribute: !1 })
], j.prototype, "floor", 2);
X([
  $({ attribute: !1 })
], j.prototype, "zoomedAreaId", 2);
X([
  $({ type: Boolean })
], j.prototype, "popupOpen", 2);
X([
  x()
], j.prototype, "_box", 2);
j = X([
  st("fp-plan-view")
], j);
var gs = Object.defineProperty, _s = Object.getOwnPropertyDescriptor, Et = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? _s(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (n = (s ? r(e, i, n) : r(n)) || n);
  return s && n && gs(e, i, n), n;
};
const ys = [
  { kind: "device", title: "Geräte" },
  { kind: "scene", title: "Szenen" },
  { kind: "script", title: "Skripte" }
];
let it = class extends N {
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
    const t = this.area.sidebar ?? [], e = t.filter((i) => Tt(i.entity) === "device" && et(this.hass.states[i.entity])).length;
    return p`
      <header>
        <div class="title">
          <h2>${this.area.name || "Raum"}</h2>
          <span class="sub">${t.length ? `${e} aktiv` : ""}</span>
        </div>
        ${this.canEdit ? p`<button class="icon-btn" title="Seitenleiste bearbeiten" @click=${this._edit}>
              <ha-icon icon="mdi:pencil"></ha-icon>
            </button>` : g}
        <button class="icon-btn" title="Schließen" @click=${this._close}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </header>
      <div class="content">
        ${t.length === 0 ? p`<p class="empty">
              Diesem Raum ist noch nichts zugeordnet.${this.canEdit ? p` Im Editor lassen sich Geräte, Szenen und Skripte für die Seitenleiste auswählen.` : g}
            </p>` : ys.map(({ kind: i, title: s }) => {
      const n = t.filter((o) => Tt(o.entity) === i);
      return n.length ? p`<section>
                <h3>${s}</h3>
                ${i === "device" ? n.map((o) => this._renderRow(o)) : p`<div class="chips">${n.map((o) => this._renderChip(o))}</div>`}
              </section>` : g;
    })}
      </div>
    `;
  }
  _renderRow(t) {
    const e = this.hass.states[t.entity], i = et(e), s = Nt(e), n = t.name || $t(this.hass, t.entity), o = M(t.entity);
    return p`
      <div class="row ${i ? "active" : ""} ${s ? "unavailable" : ""}">
        <button class="row-main" @click=${() => vt(this, t.entity)} title="Details">
          <span class="row-icon"><ha-icon .icon=${L(this.hass, t.entity, t.icon)}></ha-icon></span>
          <span class="row-text">
            <span class="name">${n}</span>
            <span class="state">${Oe(this.hass, e)}</span>
          </span>
        </button>
        ${s ? g : o === "cover" ? p`<span class="cover-btns">
              <button class="icon-btn" title="Öffnen" @click=${() => this._call("cover", "open_cover", t.entity)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button class="icon-btn" title="Stopp" @click=${() => this._call("cover", "stop_cover", t.entity)}>
                <ha-icon icon="mdi:stop"></ha-icon>
              </button>
              <button class="icon-btn" title="Schließen" @click=${() => this._call("cover", "close_cover", t.entity)}>
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
            </span>` : Lt(t.entity) ? p`<button class="run" @click=${() => Dt(this.hass, t.entity)}>Ausführen</button>` : bi(t.entity) ? p`<button
              class="switch ${i ? "on" : ""}"
              role="switch"
              aria-checked=${i ? "true" : "false"}
              title=${i ? "Ausschalten" : "Einschalten"}
              @click=${() => ze(this.hass, t.entity)}
            >
              <span class="knob"></span>
            </button>` : g}
      </div>
    `;
  }
  _renderChip(t) {
    const e = this.hass.states[t.entity], i = t.name || $t(this.hass, t.entity), s = M(t.entity) === "script" && e?.state === "on";
    return p`
      <button
        class="chip ${s ? "running" : ""}"
        ?disabled=${Nt(e)}
        title=${t.entity}
        @click=${() => Dt(this.hass, t.entity)}
        @contextmenu=${(n) => {
      n.preventDefault(), vt(this, t.entity);
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
it.styles = nt`
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
Et([
  $({ attribute: !1 })
], it.prototype, "hass", 2);
Et([
  $({ attribute: !1 })
], it.prototype, "area", 2);
Et([
  $({ type: Boolean })
], it.prototype, "canEdit", 2);
it = Et([
  st("fp-room-sidebar")
], it);
var xs = Object.defineProperty, bs = Object.getOwnPropertyDescriptor, ut = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? bs(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (n = (s ? r(e, i, n) : r(n)) || n);
  return s && n && xs(e, i, n), n;
};
let Z = class extends N {
  constructor() {
    super(...arguments), this.canEdit = !1, this.sheet = !1, this._onKey = (t) => {
      t.key === "Escape" && this._close();
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._onKey), this._ro = new ResizeObserver(() => this.sheet = this.clientWidth < qe), this._ro.observe(this);
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
    return this.area ? p`
      <div class="scrim" @click=${this._close}></div>
      <div class="card" role="dialog" aria-label=${this.area.name || "Raum"} tabindex="-1">
        <fp-room-sidebar .hass=${this.hass} .area=${this.area} .canEdit=${this.canEdit}></fp-room-sidebar>
      </div>
    ` : g;
  }
};
Z.styles = nt`
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
      width: ${Ke}px;
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
ut([
  $({ attribute: !1 })
], Z.prototype, "hass", 2);
ut([
  $({ attribute: !1 })
], Z.prototype, "area", 2);
ut([
  $({ type: Boolean })
], Z.prototype, "canEdit", 2);
ut([
  $({ type: Boolean, reflect: !0 })
], Z.prototype, "sheet", 2);
Z = ut([
  st("fp-room-dialog")
], Z);
var $s = Object.defineProperty, vs = Object.getOwnPropertyDescriptor, T = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? vs(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (n = (s ? r(e, i, n) : r(n)) || n);
  return s && n && $s(e, i, n), n;
};
const Rt = "floorplan_panel";
let z = class extends N {
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
      const t = await this.hass.callWS({ type: `${Rt}/plan/get` });
      this._setPlan(t.plan, t.revision), this._unsub || (this._unsub = await this.hass.connection.subscribeMessage((e) => this._onEvent(e), {
        type: `${Rt}/subscribe`
      }));
    } catch (t) {
      this._error = t?.message ?? String(t);
    } finally {
      this._loading = !1;
    }
  }
  _setPlan(t, e) {
    const i = Gt(t);
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
      const t = await this.hass.callWS({ type: `${Rt}/plan/load_sample` });
      this._setPlan(t.plan, t.revision);
    } catch (t) {
      this._error = t?.message ?? String(t);
    }
  }
  render() {
    if (this._editing && this._plan)
      return p`<fp-editor
        .hass=${this.hass}
        .plan=${this._plan}
        .revision=${this._revision}
        .floorId=${this._floorId}
        .initialAreaId=${this._editRoomId}
        .narrow=${this.narrow}
        @editor-done=${this._onEditorDone}
      ></fp-editor>`;
    const t = this._plan, e = t?.floors.find((n) => n.id === this._floorId), i = e?.areas.find((n) => n.id === this._zoomedAreaId), s = !!e && !e.walls.length && !e.areas.length && !e.items.length;
    return p`
      <div class="toolbar">
        ${this.narrow ? p`<button class="icon-btn" title="Menü" @click=${this._toggleMenu}><ha-icon icon="mdi:menu"></ha-icon></button>` : p`<span class="spacer"></span>`}
        <div class="main-title">Grundriss</div>
        ${t && t.floors.length > 1 ? p`<div class="floors">
              ${t.floors.map(
      (n) => p`<button
                  class="floor-btn ${n.id === this._floorId ? "active" : ""}"
                  @click=${() => {
        this._floorId = n.id, this._zoomedAreaId = void 0;
      }}
                >
                  ${n.name || n.id}
                </button>`
    )}
            </div>` : g}
        ${this._isAdmin && t ? p`<button class="icon-btn" title="Grundriss bearbeiten" @click=${() => this._openEditor()}>
              <ha-icon icon="mdi:pencil-ruler"></ha-icon>
            </button>` : g}
      </div>
      ${this._error ? p`<div class="message error">Grundriss konnte nicht geladen werden: ${this._error}</div>` : t ? !e || s ? p`<div class="message">
            <ha-icon icon="mdi:floor-plan" class="big"></ha-icon>
            <p>Noch kein Grundriss gezeichnet.</p>
            ${this._isAdmin ? p`<div class="actions">
                  <button class="primary" @click=${() => this._openEditor()}>Editor öffnen</button>
                  <button @click=${this._loadSample}>Beispiel-Grundriss laden</button>
                </div>` : p`<p>Ein Administrator kann ihn im Editor anlegen.</p>`}
          </div>` : p`<div class="body">
            <fp-plan-view
              .hass=${this.hass}
              .plan=${t}
              .floor=${e}
              .zoomedAreaId=${this._zoomedAreaId}
              .popupOpen=${!!i}
              @area-click=${this._onAreaClick}
              @background-click=${() => this._zoomedAreaId = void 0}
            ></fp-plan-view>
            ${i ? p`<fp-room-dialog
                  .hass=${this.hass}
                  .area=${i}
                  .canEdit=${this._isAdmin}
                  @close=${() => this._zoomedAreaId = void 0}
                  @edit-room=${(n) => this._openEditor(n.detail.id)}
                ></fp-room-dialog>` : g}
          </div>` : p`<div class="message">Lade …</div>`}
    `;
  }
};
z.styles = nt`
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
T([
  $({ attribute: !1 })
], z.prototype, "hass", 2);
T([
  $({ type: Boolean, reflect: !0 })
], z.prototype, "narrow", 2);
T([
  $({ attribute: !1 })
], z.prototype, "panel", 2);
T([
  x()
], z.prototype, "_plan", 2);
T([
  x()
], z.prototype, "_revision", 2);
T([
  x()
], z.prototype, "_floorId", 2);
T([
  x()
], z.prototype, "_zoomedAreaId", 2);
T([
  x()
], z.prototype, "_editing", 2);
T([
  x()
], z.prototype, "_editRoomId", 2);
T([
  x()
], z.prototype, "_error", 2);
z = T([
  st("floorplan-panel")
], z);
