/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st = globalThis, xt = st.ShadowRoot && (st.ShadyCSS === void 0 || st.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, wt = Symbol(), Ot = /* @__PURE__ */ new WeakMap();
let Vt = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== wt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (xt && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = Ot.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Ot.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const kt = (t) => new Vt(typeof t == "string" ? t : t + "", void 0, wt), J = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((s, o, n) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[n + 1], t[0]);
  return new Vt(i, t, wt);
}, he = (t, e) => {
  if (xt) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const s = document.createElement("style"), o = st.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, t.appendChild(s);
  }
}, Mt = xt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return kt(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: pe, defineProperty: ue, getOwnPropertyDescriptor: fe, getOwnPropertyNames: me, getOwnPropertySymbols: _e, getPrototypeOf: ge } = Object, ct = globalThis, It = ct.trustedTypes, ve = It ? It.emptyScript : "", be = ct.reactiveElementPolyfillSupport, Z = (t, e) => t, ot = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? ve : null;
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
} }, St = (t, e) => !pe(t, e), Rt = { attribute: !0, type: String, converter: ot, reflect: !1, useDefault: !1, hasChanged: St };
Symbol.metadata ??= Symbol("metadata"), ct.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let T = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Rt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(e, s, i);
      o !== void 0 && ue(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: o, set: n } = fe(this.prototype, e) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: o, set(r) {
      const a = o?.call(this);
      n?.call(this, r), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Rt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Z("elementProperties"))) return;
    const e = ge(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Z("properties"))) {
      const i = this.properties, s = [...me(i), ..._e(i)];
      for (const o of s) this.createProperty(o, i[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [s, o] of i) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const o = this._$Eu(i, s);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const o of s) i.unshift(Mt(o));
    } else e !== void 0 && i.push(Mt(e));
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
    return he(e, this.constructor.elementStyles), e;
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
    const s = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, s);
    if (o !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : ot).toAttribute(i, s.type);
      this._$Em = e, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const s = this.constructor, o = s._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const n = s.getPropertyOptions(o), r = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : ot;
      this._$Em = o;
      const a = r.fromAttribute(i, n.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, i, s, o = !1, n) {
    if (e !== void 0) {
      const r = this.constructor;
      if (o === !1 && (n = this[e]), s ??= r.getPropertyOptions(e), !((s.hasChanged ?? St)(n, i) || s.useDefault && s.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, s)))) return;
      this.C(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: s, reflect: o, wrapped: n }, r) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, r ?? i ?? this[e]), n !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (i = void 0), this._$AL.set(e, i)), o === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, n] of s) {
        const { wrapped: r } = n, a = this[o];
        r !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, n, a);
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
T.elementStyles = [], T.shadowRootOptions = { mode: "open" }, T[Z("elementProperties")] = /* @__PURE__ */ new Map(), T[Z("finalized")] = /* @__PURE__ */ new Map(), be?.({ ReactiveElement: T }), (ct.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const At = globalThis, Nt = (t) => t, nt = At.trustedTypes, Tt = nt ? nt.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Xt = "$lit$", z = `lit$${Math.random().toFixed(9).slice(2)}$`, Yt = "?" + z, ye = `<${Yt}>`, I = document, V = () => I.createComment(""), X = (t) => t === null || typeof t != "object" && typeof t != "function", Et = Array.isArray, $e = (t) => Et(t) || typeof t?.[Symbol.iterator] == "function", pt = `[ 	
\f\r]`, K = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ut = /-->/g, Dt = />/g, O = RegExp(`>|${pt}(?:([^\\s"'>=/]+)(${pt}*=${pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Lt = /'/g, jt = /"/g, qt = /^(?:script|style|textarea|title)$/i, Jt = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), c = Jt(1), f = Jt(2), L = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), Ht = /* @__PURE__ */ new WeakMap(), M = I.createTreeWalker(I, 129);
function Qt(t, e) {
  if (!Et(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Tt !== void 0 ? Tt.createHTML(e) : e;
}
const xe = (t, e) => {
  const i = t.length - 1, s = [];
  let o, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = K;
  for (let a = 0; a < i; a++) {
    const l = t[a];
    let d, p, u = -1, b = 0;
    for (; b < l.length && (r.lastIndex = b, p = r.exec(l), p !== null); ) b = r.lastIndex, r === K ? p[1] === "!--" ? r = Ut : p[1] !== void 0 ? r = Dt : p[2] !== void 0 ? (qt.test(p[2]) && (o = RegExp("</" + p[2], "g")), r = O) : p[3] !== void 0 && (r = O) : r === O ? p[0] === ">" ? (r = o ?? K, u = -1) : p[1] === void 0 ? u = -2 : (u = r.lastIndex - p[2].length, d = p[1], r = p[3] === void 0 ? O : p[3] === '"' ? jt : Lt) : r === jt || r === Lt ? r = O : r === Ut || r === Dt ? r = K : (r = O, o = void 0);
    const y = r === O && t[a + 1].startsWith("/>") ? " " : "";
    n += r === K ? l + ye : u >= 0 ? (s.push(d), l.slice(0, u) + Xt + l.slice(u) + z + y) : l + z + (u === -2 ? a : y);
  }
  return [Qt(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class Y {
  constructor({ strings: e, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const a = e.length - 1, l = this.parts, [d, p] = xe(e, i);
    if (this.el = Y.createElement(d, s), M.currentNode = this.el.content, i === 2 || i === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (o = M.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const u of o.getAttributeNames()) if (u.endsWith(Xt)) {
          const b = p[r++], y = o.getAttribute(u).split(z), R = /([.?@])?(.*)/.exec(b);
          l.push({ type: 1, index: n, name: R[2], strings: y, ctor: R[1] === "." ? ke : R[1] === "?" ? Se : R[1] === "@" ? Ae : dt }), o.removeAttribute(u);
        } else u.startsWith(z) && (l.push({ type: 6, index: n }), o.removeAttribute(u));
        if (qt.test(o.tagName)) {
          const u = o.textContent.split(z), b = u.length - 1;
          if (b > 0) {
            o.textContent = nt ? nt.emptyScript : "";
            for (let y = 0; y < b; y++) o.append(u[y], V()), M.nextNode(), l.push({ type: 2, index: ++n });
            o.append(u[b], V());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Yt) l.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = o.data.indexOf(z, u + 1)) !== -1; ) l.push({ type: 7, index: n }), u += z.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const s = I.createElement("template");
    return s.innerHTML = e, s;
  }
}
function j(t, e, i = t, s) {
  if (e === L) return e;
  let o = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const n = X(e) ? void 0 : e._$litDirective$;
  return o?.constructor !== n && (o?._$AO?.(!1), n === void 0 ? o = void 0 : (o = new n(t), o._$AT(t, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = o : i._$Cl = o), o !== void 0 && (e = j(t, o._$AS(t, e.values), o, s)), e;
}
class we {
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
    const { el: { content: i }, parts: s } = this._$AD, o = (e?.creationScope ?? I).importNode(i, !0);
    M.currentNode = o;
    let n = M.nextNode(), r = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new Q(n, n.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(n, l.name, l.strings, this, e) : l.type === 6 && (d = new Ee(n, this, e)), this._$AV.push(d), l = s[++a];
      }
      r !== l?.index && (n = M.nextNode(), r++);
    }
    return M.currentNode = I, o;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
}
class Q {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, s, o) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    e = j(this, e, i), X(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== L && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : $e(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && X(this._$AH) ? this._$AA.nextSibling.data = e : this.T(I.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: s } = e, o = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = Y.createElement(Qt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const n = new we(o, this), r = n.u(this.options);
      n.p(i), this.T(r), this._$AH = n;
    }
  }
  _$AC(e) {
    let i = Ht.get(e.strings);
    return i === void 0 && Ht.set(e.strings, i = new Y(e)), i;
  }
  k(e) {
    Et(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const n of e) o === i.length ? i.push(s = new Q(this.O(V()), this.O(V()), this, this.options)) : s = i[o], s._$AI(n), o++;
    o < i.length && (this._$AR(s && s._$AB.nextSibling, o), i.length = o);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const s = Nt(e).nextSibling;
      Nt(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class dt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, o, n) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = i, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = h;
  }
  _$AI(e, i = this, s, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) e = j(this, e, i, 0), r = !X(e) || e !== this._$AH && e !== L, r && (this._$AH = e);
    else {
      const a = e;
      let l, d;
      for (e = n[0], l = 0; l < n.length - 1; l++) d = j(this, a[s + l], i, l), d === L && (d = this._$AH[l]), r ||= !X(d) || d !== this._$AH[l], d === h ? e = h : e !== h && (e += (d ?? "") + n[l + 1]), this._$AH[l] = d;
    }
    r && !o && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ke extends dt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class Se extends dt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class Ae extends dt {
  constructor(e, i, s, o, n) {
    super(e, i, s, o, n), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = j(this, e, i, 0) ?? h) === L) return;
    const s = this._$AH, o = e === h && s !== h || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== h && (s === h || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ee {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    j(this, e);
  }
}
const Pe = At.litHtmlPolyfillSupport;
Pe?.(Y, Q), (At.litHtmlVersions ??= []).push("3.3.3");
const ze = (t, e, i) => {
  const s = i?.renderBefore ?? e;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = i?.renderBefore ?? null;
    s._$litPart$ = o = new Q(e.insertBefore(V(), n), n, void 0, i ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pt = globalThis;
class P extends T {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ze(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return L;
  }
}
P._$litElement$ = !0, P.finalized = !0, Pt.litElementHydrateSupport?.({ LitElement: P });
const Ce = Pt.litElementPolyfillSupport;
Ce?.({ LitElement: P });
(Pt.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Oe = { attribute: !0, type: String, converter: ot, reflect: !1, hasChanged: St }, Me = (t = Oe, e, i) => {
  const { kind: s, metadata: o } = i;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(i.name, t), s === "accessor") {
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
function g(t) {
  return (e, i) => typeof i == "object" ? Me(t, e, i) : ((s, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, s), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function m(t) {
  return g({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ie = (t, e, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, i), i);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function te(t, e) {
  return (i, s, o) => {
    const n = (r) => r.renderRoot?.querySelector(t) ?? null;
    return Ie(i, s, { get() {
      return n(this);
    } });
  };
}
const w = (t) => t.split(".")[0], Re = /* @__PURE__ */ new Set([
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
]), Ne = /* @__PURE__ */ new Set(["scene", "script", "button", "input_button"]);
function _t(t) {
  const e = w(t);
  return e === "scene" ? "scene" : e === "script" ? "script" : "device";
}
function Te(t) {
  return Re.has(w(t));
}
function gt(t) {
  return Ne.has(w(t));
}
function q(t) {
  if (!t) return !1;
  const e = t.state;
  if (e === "unavailable" || e === "unknown") return !1;
  switch (w(t.entity_id)) {
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
function vt(t) {
  return !t || t.state === "unavailable";
}
function rt(t, e) {
  return t.states[e]?.attributes.friendly_name ?? e;
}
function ee(t, e) {
  if (!e) return "nicht gefunden";
  if (t.formatEntityState)
    try {
      return t.formatEntityState(e);
    } catch {
    }
  const i = e.attributes.unit_of_measurement;
  return i ? `${e.state} ${i}` : e.state;
}
const Ue = {
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
function E(t, e, i) {
  if (i) return i;
  const s = t.states[e]?.attributes.icon;
  return s || (Ue[w(e)] ?? "mdi:help-circle-outline");
}
async function ie(t, e) {
  const i = w(e), s = t.states[e];
  i === "lock" ? await t.callService("lock", s?.state === "locked" ? "unlock" : "lock", { entity_id: e }) : i === "cover" ? await t.callService("cover", "toggle", { entity_id: e }) : await t.callService("homeassistant", "toggle", { entity_id: e });
}
async function bt(t, e) {
  const i = w(e);
  i === "scene" ? await t.callService("scene", "turn_on", { entity_id: e }) : i === "script" ? await t.callService("script", "turn_on", { entity_id: e }) : (i === "button" || i === "input_button") && await t.callService(i, "press", { entity_id: e });
}
function at(t, e) {
  t.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: e }, bubbles: !0, composed: !0 }));
}
var De = Object.defineProperty, Le = Object.getOwnPropertyDescriptor, k = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Le(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && De(e, i, o), o;
};
const je = 60;
let $ = class extends P {
  constructor() {
    super(...arguments), this.value = "", this.domains = [], this.exclude = [], this.placeholder = "Entität suchen …", this.clearOnSelect = !1, this._open = !1, this._filter = "", this._highlight = 0;
  }
  _results() {
    const t = this._filter.trim().toLowerCase(), e = new Set(this.exclude), i = [];
    for (const s of Object.keys(this.hass.states).sort()) {
      if (e.has(s) || this.domains.length && !this.domains.includes(w(s))) continue;
      const o = this.hass.states[s].attributes.friendly_name ?? s;
      if (!(t && !s.toLowerCase().includes(t) && !o.toLowerCase().includes(t)) && (i.push({ id: s, name: o }), i.length >= je))
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
    return c`
      <div class="field">
        ${this.value && !this.clearOnSelect ? c`<ha-icon class="lead" .icon=${E(this.hass, this.value)}></ha-icon>` : c`<ha-icon class="lead" icon="mdi:magnify"></ha-icon>`}
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
        ${this.value && !this.clearOnSelect ? c`<button class="clear" title="Entfernen" @mousedown=${(s) => s.preventDefault()} @click=${() => this._select("")}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>` : h}
      </div>
      ${this.value && !this.clearOnSelect ? c`<div class="id">${this.value}</div>` : h}
      ${this._open ? c`<div class="list">
            ${t.length === 0 ? c`<div class="none">Keine Treffer</div>` : t.map(
      (s, o) => c`<div
                    class="opt ${o === this._highlight ? "hl" : ""}"
                    @mousedown=${(n) => {
        n.preventDefault(), this._select(s.id);
      }}
                  >
                    <ha-icon .icon=${E(this.hass, s.id)}></ha-icon>
                    <span class="txt"><span>${s.name}</span><small>${s.id}</small></span>
                  </div>`
    )}
          </div>` : h}
    `;
  }
};
$.styles = J`
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
k([
  g({ attribute: !1 })
], $.prototype, "hass", 2);
k([
  g()
], $.prototype, "value", 2);
k([
  g({ attribute: !1 })
], $.prototype, "domains", 2);
k([
  g({ attribute: !1 })
], $.prototype, "exclude", 2);
k([
  g()
], $.prototype, "placeholder", 2);
k([
  g({ type: Boolean })
], $.prototype, "clearOnSelect", 2);
k([
  m()
], $.prototype, "_open", 2);
k([
  m()
], $.prototype, "_filter", 2);
k([
  m()
], $.prototype, "_highlight", 2);
k([
  te("input")
], $.prototype, "_input", 2);
$ = k([
  tt("fp-entity-picker")
], $);
const He = 4, We = 10, yt = { scale: 1, txPercent: 0, tyPercent: 0 };
function Fe(t, e, i, s = 0.15, o = He, n) {
  if (!t.length) return yt;
  const r = t.map((B) => B.x), a = t.map((B) => B.y), l = Math.min(...r), d = Math.max(...r), p = Math.min(...a), u = Math.max(...a), b = Math.max(d - l, u - p) * s, y = Math.max(d - l + b * 2, 1), R = Math.max(u - p + b * 2, 1), le = Math.max(1, Math.min(o, Math.min(e / y, i / R))), F = n ?? le;
  if (!Number.isFinite(F)) return yt;
  const ce = (l + d) / 2 / e, de = (p + u) / 2 / i, Ct = (B) => Math.min(0, Math.max(100 * (1 - F), B));
  return {
    scale: F,
    txPercent: Ct(50 - F * ce * 100),
    tyPercent: Ct(50 - F * de * 100)
  };
}
function Be(t) {
  const e = t.zoom;
  if (!(typeof e != "number" || !Number.isFinite(e)))
    return Math.max(1, Math.min(We, e));
}
function Ke(t) {
  if (!t.length) return { x: 0, y: 0 };
  const e = t.reduce((i, s) => ({ x: i.x + s.x, y: i.y + s.y }), { x: 0, y: 0 });
  return { x: e.x / t.length, y: e.y / t.length };
}
function lt(t, e, i) {
  let s = !1;
  for (let o = 0, n = t.length - 1; o < t.length; n = o++) {
    const r = t[o], a = t[n];
    r.y > i != a.y > i && e < (a.x - r.x) * (i - r.y) / (a.y - r.y) + r.x && (s = !s);
  }
  return s;
}
function Wt(t) {
  let e = 0;
  for (let i = 0, s = t.length - 1; i < t.length; s = i++)
    e += (t[s].x + t[i].x) * (t[s].y - t[i].y);
  return Math.abs(e / 2);
}
function Ge(t, e) {
  return t.area ? e.find((s) => s.id === t.area || s.name === t.area) : e.filter((s) => lt(s.points, t.x, t.y)).sort((s, o) => Wt(s.points) - Wt(o.points))[0];
}
function Ze(t, e, i) {
  return t.showOnlyWhenZoomed ? e ? Ge(t, i)?.id !== e.id : !0 : !1;
}
function et(t, e) {
  return e > 0 ? Math.round(t / e) * e : t;
}
function A(t, e) {
  return Math.hypot(t.x - e.x, t.y - e.y);
}
function se(t, e, i) {
  const s = i.x - e.x, o = i.y - e.y, n = s * s + o * o, r = n === 0 ? 0 : Math.max(0, Math.min(1, ((t.x - e.x) * s + (t.y - e.y) * o) / n));
  return { point: { x: e.x + r * s, y: e.y + r * o }, t: r };
}
function ut(t, e, i) {
  let s;
  for (const o of e) {
    const { point: n, t: r } = se(t, { x: o.x1, y: o.y1 }, { x: o.x2, y: o.y2 }), a = A(t, n);
    a <= i && (!s || a < s.distance) && (s = {
      wall: o,
      point: n,
      t: r,
      distance: a,
      angle: Math.atan2(o.y2 - o.y1, o.x2 - o.x1) * 180 / Math.PI
    });
  }
  return s;
}
function Ve(t, e, i, s = []) {
  let o, n = i;
  for (const r of e)
    if (!s.includes(r))
      for (const a of [
        { x: r.x1, y: r.y1 },
        { x: r.x2, y: r.y2 }
      ]) {
        const l = A(t, a);
        l <= n && (o = a, n = l);
      }
  return o;
}
function ft(t, e, i = 8) {
  const s = Math.abs(Math.atan2(e.y - t.y, e.x - t.x) * 180 / Math.PI);
  return s < i || s > 180 - i ? { x: e.x, y: t.y } : Math.abs(s - 90) < i ? { x: t.x, y: e.y } : e;
}
const Xe = 0.12;
function zt(t, e) {
  return t.thickness ?? e.settings.wallThickness;
}
function D(t, e) {
  return t.walls.reduce((i, s) => Math.max(i, zt(s, e)), e.settings.wallThickness);
}
function Ye(t, e) {
  const i = t.color ?? "var(--primary-color)", s = t.opacity ?? Xe;
  return e && t.entity && q(e.states[t.entity]) ? { color: t.activeColor ?? "#ffc107", opacity: Math.min(1, s + 0.2) } : { color: i, opacity: s };
}
function oe(t, e) {
  const { color: i, opacity: s } = Ye(t, e.hass), o = t.points.map((d) => `${d.x},${d.y}`).join(" "), n = Math.min(...t.points.map((d) => d.x)), r = Math.min(...t.points.map((d) => d.y));
  let a = { x: n + e.labelSize * 0.8, y: r + e.labelSize * 1.5 };
  lt(t.points, a.x, a.y) || (a = Ke(t.points));
  const l = lt(t.points, n + e.labelSize * 0.8, r + e.labelSize * 1.5) ? "start" : "middle";
  return f`
    <g class="area ${e.selected ? "selected" : ""} ${e.dimmed ? "dimmed" : ""}" data-id=${t.id}>
      <polygon points=${o} fill=${i} fill-opacity=${s}></polygon>
      ${t.showName !== !1 && t.name ? f`<text class="area-label" x=${a.x} y=${a.y} font-size=${e.labelSize}
                  text-anchor=${l} dominant-baseline="middle">${t.name}</text>` : h}
    </g>`;
}
function ne(t, e, i, s = {}) {
  const { width: o, height: n } = e.canvas, r = Math.max(o, n), a = D(t, e) + 2;
  return f`
    <defs>
      <mask id=${i} maskUnits="userSpaceOnUse" x=${-r} y=${-r} width=${o + 2 * r} height=${n + 2 * r}>
        <rect x=${-r} y=${-r} width=${o + 2 * r} height=${n + 2 * r} fill="white"></rect>
        ${t.openings.map(
    (l) => f`<rect x=${l.x - l.length / 2} y=${l.y - a / 2} width=${l.length} height=${a}
                           fill="black" transform="rotate(${l.angle} ${l.x} ${l.y})"></rect>`
  )}
      </mask>
    </defs>
    <g class="walls" mask="url(#${i})">
      ${t.walls.map(
    (l) => f`<line class="wall ${s.selectedId === l.id ? "selected" : ""}" data-id=${l.id}
                         x1=${l.x1} y1=${l.y1} x2=${l.x2} y2=${l.y2}
                         stroke-width=${zt(l, e)}></line>`
  )}
    </g>`;
}
function re(t, e, i = {}) {
  const s = t.length, o = !!(i.hass && t.entity && q(i.hass.states[t.entity])), n = `opening ${t.type} ${o ? "open" : ""} ${i.selected ? "selected" : ""}`;
  if (t.type === "window") {
    const p = e - 2;
    return f`
      <g class=${n} data-id=${t.id} transform="translate(${t.x} ${t.y}) rotate(${t.angle})">
        <rect class="hit" x=${-s / 2} y=${-p / 2} width=${s} height=${p}></rect>
        <rect class="frame" x=${-s / 2} y=${-p / 2} width=${s} height=${p}></rect>
        <line class="glass" x1=${-s / 2} y1=${-p / 6} x2=${s / 2} y2=${-p / 6}></line>
        <line class="glass" x1=${-s / 2} y1=${p / 6} x2=${s / 2} y2=${p / 6}></line>
      </g>`;
  }
  const r = t.hinge === "right" ? 1 : -1, a = t.swing === "out" ? -1 : 1, l = r * s / 2, d = r * a < 0 ? 0 : 1;
  return f`
    <g class=${n} data-id=${t.id} transform="translate(${t.x} ${t.y}) rotate(${t.angle})">
      <rect class="hit" x=${-s / 2} y=${a > 0 ? -e / 2 : -s} width=${s} height=${s + e / 2}></rect>
      <path class="swing" d="M ${l} ${a * s} A ${s} ${s} 0 0 ${d} ${-l} 0"></path>
      <line class="leaf" x1=${l} y1="0" x2=${l} y2=${a * s}></line>
    </g>`;
}
function qe(t, e, i = {}) {
  const s = D(t, e) + 2;
  return f`<g class="openings">${t.openings.map(
    (o) => re(o, s, { hass: i.hass, selected: i.selectedId === o.id })
  )}</g>`;
}
const ae = `
  .area polygon { stroke: none; transition: fill-opacity .25s ease; }
  .area-label { fill: var(--primary-text-color); opacity: .7; font-weight: 500; pointer-events: none; user-select: none; }
  .wall { stroke: var(--fp-wall-color, var(--primary-text-color)); stroke-linecap: square; }
  .opening .hit { fill: transparent; stroke: none; }
  .opening .frame { fill: var(--fp-floor-color, var(--card-background-color, #fff)); stroke: var(--fp-wall-color, var(--primary-text-color)); stroke-width: 1.5; }
  .opening .glass { stroke: var(--fp-window-color, #64b5f6); stroke-width: 2; }
  .opening .leaf { stroke: var(--fp-wall-color, var(--primary-text-color)); stroke-width: 3; stroke-linecap: round; }
  .opening .swing { fill: none; stroke: var(--secondary-text-color); stroke-width: 1.2; stroke-dasharray: 5 4; }
  .opening.open .glass, .opening.open .leaf { stroke: var(--fp-open-color, #ef6c00); }
  .opening.open .frame { stroke: var(--fp-open-color, #ef6c00); }
`, Je = { wallThickness: 12, grid: 10 };
function $t(t) {
  const e = t ?? {};
  return {
    version: e.version ?? 1,
    canvas: e.canvas ?? { width: 1e3, height: 700 },
    settings: { ...Je, ...e.settings ?? {} },
    floors: (e.floors ?? []).map((i) => ({
      ...i,
      name: i.name ?? "",
      walls: i.walls ?? [],
      openings: i.openings ?? [],
      areas: (i.areas ?? []).map((s) => ({ ...s, name: s.name ?? "", sidebar: s.sidebar ?? [] })),
      items: i.items ?? []
    }))
  };
}
function G(t) {
  return `${t}-${Math.random().toString(36).slice(2, 8)}`;
}
var Qe = Object.defineProperty, ti = Object.getOwnPropertyDescriptor, v = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ti(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && Qe(e, i, o), o;
};
const it = "floorplan_panel", ei = 100, N = 12, Ft = 14, ii = 7, Bt = [
  { id: "select", icon: "mdi:cursor-default-outline", label: "Auswahl", hint: "Element anklicken zum Bearbeiten, ziehen zum Verschieben. Leere Fläche ziehen verschiebt die Ansicht, Mausrad zoomt." },
  { id: "wall", icon: "mdi:wall", label: "Wand", hint: "Klick setzt Anfang, weitere Klicks setzen Wandstücke. Esc oder Doppelklick beendet. Umschalt: freier Winkel, Alt: ohne Raster." },
  { id: "area", icon: "mdi:vector-polygon", label: "Raum", hint: "Ecken nacheinander anklicken, zum Schließen den ersten Punkt anklicken oder Enter drücken. Esc bricht ab." },
  { id: "door", icon: "mdi:door", label: "Tür", hint: "Auf eine Wand klicken, um dort eine Tür einzusetzen." },
  { id: "window", icon: "mdi:window-closed-variant", label: "Fenster", hint: "Auf eine Wand klicken, um dort ein Fenster einzusetzen." },
  { id: "item", icon: "mdi:map-marker-plus", label: "Icon", hint: "Klick platziert ein freies Icon – Icon und Entität danach rechts wählen." }
], si = [
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
], Kt = ["#4f8bd6", "#e0a030", "#3fb5a8", "#8e6cc9", "#d65f5f", "#6aa84f", "#9e9e9e"];
let _ = class extends P {
  constructor() {
    super(...arguments), this.revision = 0, this.narrow = !1, this._tool = "select", this._view = { x: 0, y: 0, w: 1e3, h: 700 }, this._roomPoints = [], this._dirty = !1, this._saving = !1, this._conflict = !1, this._svgSize = { w: 1, h: 1 }, this._undo = [], this._redo = [], this._baseRevision = 0, this._keyHandler = (t) => this._onKey(t);
  }
  // ---------------------------------------------------------------- Lebenszyklus
  willUpdate(t) {
    t.has("plan") && !this._draft && (this._draft = $t(structuredClone(this.plan)), this._baseRevision = this.revision, this._floorId = this.floorId && this._draft.floors.some((e) => e.id === this.floorId) ? this.floorId : this._draft.floors[0]?.id, this._floorId || (this._draft.floors.push({ id: "eg", name: "Wohnung", walls: [], openings: [], areas: [], items: [] }), this._floorId = "eg"), this._fitView(), this.initialAreaId && this._floor.areas.some((e) => e.id === this.initialAreaId) && (this._sel = { kind: "area", id: this.initialAreaId }));
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
    const { width: t, height: e } = this._draft.canvas, i = Math.max(t, e) * 0.04;
    this._view = { x: -i, y: -i, w: t + 2 * i, h: e + 2 * i };
  }
  // ---------------------------------------------------------------- Änderungen & Undo
  _snapshot() {
    return JSON.stringify({ plan: this._draft, floorId: this._floorId });
  }
  _pushUndo(t) {
    this._undo.push(t), this._undo.length > ei && this._undo.shift(), this._redo = [], this._dirty = !0;
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
        type: `${it}/plan/save`,
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
        const t = await this.hass.callWS({ type: `${it}/plan/load_sample` });
        this._acceptServerPlan(t.plan, t.revision);
      } catch (t) {
        this._error = t?.message ?? String(t);
      }
  }
  _acceptServerPlan(t, e) {
    this._draft = $t(t), this._baseRevision = e, this._floorId = this._draft.floors[0].id, this._undo = [], this._redo = [], this._dirty = !1, this._sel = void 0, this._history = void 0, this._fitView();
  }
  async _loadHistory() {
    const t = await this.hass.callWS({ type: `${it}/history/list` });
    this._history = t.items;
  }
  async _restoreHistory(t) {
    if (!confirm("Diesen Stand wiederherstellen? Der aktuelle gespeicherte Stand bleibt im Verlauf.")) return;
    const e = await this.hass.callWS({ type: `${it}/history/restore`, history_id: t });
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
  _snap(t, e, i = []) {
    if (e.altKey) return t;
    const s = Ve(t, this._floor.walls, N * this._upp, i);
    if (s) return { ...s };
    const o = this._draft.settings.grid;
    return { x: et(t.x, o), y: et(t.y, o) };
  }
  _hit(t) {
    for (const e of t.composedPath()) {
      if (!(e instanceof Element)) continue;
      if (e === this._svg) break;
      const i = e.getAttribute("data-handle");
      if (i) return { kind: "handle", id: e.getAttribute("data-owner") ?? "", handle: i };
      const s = e.getAttribute("data-kind"), o = e.getAttribute("data-id");
      if (s && o) return { kind: s, id: o };
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
        const o = this._hit(t);
        if (o?.kind === "handle" && this._sel) {
          const n = this._findSelected();
          this._drag = { ...s, mode: "handle", sel: this._sel, handle: o.handle, orig: structuredClone(n) }, this._sel.kind === "wall" && n && (this._drag.linked = this._linkedEnds(n, o.handle === "p1" ? 1 : 2));
        } else o && o.kind !== "handle" ? (this._sel = { kind: o.kind, id: o.id }, this._drag = { ...s, mode: "move", sel: this._sel, orig: structuredClone(this._findSelected()) }) : (this._sel = void 0, this._drag = { ...s, mode: "pan", viewStart: { ...this._view } });
        this._svg.setPointerCapture(t.pointerId);
        break;
      }
      case "wall": {
        const o = this._snap(e, t);
        if (!this._chainStart)
          this._chainStart = o;
        else {
          const n = t.shiftKey ? o : ft(this._chainStart, o);
          if (A(n, this._chainStart) > 1) {
            const r = this._chainStart;
            this._mutate((a) => a.walls.push({ id: G("w"), x1: r.x, y1: r.y, x2: n.x, y2: n.y })), this._chainStart = n;
          }
        }
        break;
      }
      case "area": {
        const o = this._snap(e, t);
        this._roomPoints.length >= 3 && A(o, this._roomPoints[0]) <= N * this._upp ? this._finishRoom() : this._roomPoints = [...this._roomPoints, o];
        break;
      }
      case "door":
      case "window":
        this._placeOpening(this._tool, e, t);
        break;
      case "item": {
        const o = this._snap(e, t), n = G("i");
        this._mutate((r) => r.items.push({ id: n, x: o.x, y: o.y, icon: "mdi:lightbulb", tapAction: "auto" })), this._sel = { kind: "item", id: n }, this._tool = "select";
        break;
      }
    }
  }
  _onPointerMove(t) {
    const e = this._toPlan(t);
    this._cursor = e;
    const i = this._drag;
    if (!i || i.pointerId !== t.pointerId) return;
    const s = t.clientX - i.screenStart.x, o = t.clientY - i.screenStart.y;
    if (!i.moved && Math.hypot(s, o) < 3) return;
    if (i.moved = !0, i.mode === "pan" && i.viewStart) {
      const p = this._upp;
      this._view = { ...i.viewStart, x: i.viewStart.x - s * p, y: i.viewStart.y - o * p };
      return;
    }
    const n = this._findSelected();
    if (!n || !i.sel) return;
    const r = t.altKey ? 0 : this._draft.settings.grid, a = et(e.x - i.start.x, r), l = et(e.y - i.start.y, r), d = i.orig;
    if (i.mode === "move")
      switch (i.sel.kind) {
        case "wall":
          Object.assign(n, { x1: d.x1 + a, y1: d.y1 + l, x2: d.x2 + a, y2: d.y2 + l });
          break;
        case "area":
          n.points = d.points.map((p) => ({ x: p.x + a, y: p.y + l }));
          break;
        case "item":
          Object.assign(n, { x: d.x + a, y: d.y + l });
          break;
        case "opening": {
          const p = { x: d.x + (e.x - i.start.x), y: d.y + (e.y - i.start.y) }, u = ut(p, this._floor.walls, D(this._floor, this._draft) * 2 + N * this._upp);
          u && !t.altKey ? Object.assign(n, { x: U(u.point.x), y: U(u.point.y), angle: Gt(d.angle, u.angle) }) : Object.assign(n, { x: d.x + a, y: d.y + l });
          break;
        }
      }
    else if (i.mode === "handle" && i.handle) {
      if (i.sel.kind === "wall") {
        const p = i.handle === "p1" ? 1 : 2, u = p === 1 ? { x: d.x2, y: d.y2 } : { x: d.x1, y: d.y1 };
        let b = this._snap(e, t, [n, ...(i.linked ?? []).map((y) => y.wall)]);
        !t.shiftKey && !t.altKey && (b = ft(u, b)), n[`x${p}`] = b.x, n[`y${p}`] = b.y;
        for (const y of i.linked ?? [])
          y.wall[`x${y.end}`] = b.x, y.wall[`y${y.end}`] = b.y;
      } else if (i.sel.kind === "area" && i.handle.startsWith("v")) {
        const p = Number(i.handle.slice(1));
        n.points = n.points.map((u, b) => b === p ? this._snap(e, t) : u);
      }
    }
    this._draft = { ...this._draft };
  }
  _onPointerUp(t) {
    const e = this._drag;
    !e || e.pointerId !== t.pointerId || (this._drag = void 0, this._svg.hasPointerCapture(t.pointerId) && this._svg.releasePointerCapture(t.pointerId), e.moved && e.mode !== "pan" && this._pushUndo(e.before));
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
      const n = Number(i.handle.slice(1));
      this._mutate(() => e.points.splice(n, 1));
      return;
    }
    const s = this._toPlan(t);
    let o = { i: -1, d: N * this._upp, pt: s };
    if (e.points.forEach((n, r) => {
      const a = e.points[(r + 1) % e.points.length], { point: l } = se(s, n, a), d = A(s, l);
      d < o.d && (o = { i: r, d, pt: l });
    }), o.i >= 0) {
      const n = this._snap(o.pt, t);
      this._mutate(() => e.points.splice(o.i + 1, 0, n));
    }
  }
  _onWheel(t) {
    t.preventDefault();
    const e = this._toPlan(t), i = Math.exp(t.deltaY * 15e-4), { width: s, height: o } = this._draft.canvas, n = Math.max(s, o) * 4, r = Math.min(n, Math.max(50, this._view.w * i)), a = r / this._view.w;
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
    i || (t.key === "Escape" ? this._chainStart ? this._chainStart = void 0 : this._roomPoints.length ? this._roomPoints = [] : this._tool !== "select" ? this._tool = "select" : this._sel = void 0 : t.key === "Enter" && this._tool === "area" && this._roomPoints.length >= 3 ? this._finishRoom() : (t.key === "Delete" || t.key === "Backspace") && this._sel && (t.preventDefault(), this._deleteSelected()));
  }
  /** Endpunkte anderer Wände, die genau auf dem gezogenen Endpunkt liegen. */
  _linkedEnds(t, e) {
    const i = e === 1 ? { x: t.x1, y: t.y1 } : { x: t.x2, y: t.y2 }, s = [];
    for (const o of this._floor.walls)
      o !== t && (A(i, { x: o.x1, y: o.y1 }) < 0.5 && s.push({ wall: o, end: 1 }), A(i, { x: o.x2, y: o.y2 }) < 0.5 && s.push({ wall: o, end: 2 }));
    return s;
  }
  _placeOpening(t, e, i) {
    const s = ut(e, this._floor.walls, D(this._floor, this._draft) + N * 2 * this._upp), o = t === "door" ? 80 : 120, n = s ? { x: U(s.point.x), y: U(s.point.y) } : this._snap(e, i), r = G(t === "door" ? "t" : "f"), a = { id: r, type: t, x: n.x, y: n.y, length: o, angle: s ? Gt(0, s.angle) : 0 };
    t === "door" && Object.assign(a, { hinge: "left", swing: "in" }), this._mutate((l) => l.openings.push(a)), this._sel = { kind: "opening", id: r };
  }
  _finishRoom() {
    const t = this._roomPoints;
    if (t.length < 3) return;
    const e = G("r"), i = this._floor.areas.length;
    this._mutate(
      (s) => s.areas.push({ id: e, name: `Raum ${i + 1}`, points: t, color: Kt[i % Kt.length], sidebar: [] })
    ), this._roomPoints = [], this._sel = { kind: "area", id: e }, this._tool = "select";
  }
  _setTool(t) {
    this._tool = t, this._chainStart = void 0, this._roomPoints = [];
  }
  // ---------------------------------------------------------------- Darstellung
  render() {
    if (!this._draft) return h;
    const t = Bt.find((e) => e.id === this._tool);
    return c`
      <div class="toolbar">
        <button class="icon-btn" title="Schließen" @click=${this._close}><ha-icon icon="mdi:close"></ha-icon></button>
        <div class="main-title">Grundriss bearbeiten${this._dirty ? c`<span class="dirty"> • ungespeichert</span>` : h}</div>
        <button class="icon-btn" title="Rückgängig (Strg+Z)" ?disabled=${!this._undo.length} @click=${this._doUndo}>
          <ha-icon icon="mdi:undo"></ha-icon>
        </button>
        <button class="icon-btn" title="Wiederholen (Strg+Y)" ?disabled=${!this._redo.length} @click=${this._doRedo}>
          <ha-icon icon="mdi:redo"></ha-icon>
        </button>
        <button class="save" ?disabled=${!this._dirty || this._saving} @click=${() => this._save()}>
          ${this._saving ? "Speichert …" : "Speichern"}
        </button>
      </div>
      ${this._error ? c`<div class="error-bar">
            ${this._conflict ? "Der Grundriss wurde inzwischen an anderer Stelle gespeichert." : this._error}
            ${this._conflict ? c`<button @click=${() => this._save(!0)}>Trotzdem überschreiben</button>` : h}
            <button @click=${() => this._error = void 0}>OK</button>
          </div>` : h}
      <div class="body">
        <div class="tools">
          ${Bt.map(
      (e) => c`<button class="tool ${e.id === this._tool ? "active" : ""}" title=${e.label} @click=${() => this._setTool(e.id)}>
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
    const t = this._draft, e = this._floor, { width: i, height: s } = t.canvas, o = this._upp, n = t.settings.grid, r = n * 10, a = D(e, t) + 2, l = this._sel;
    return f`
      <defs>
        <pattern id="grid-minor" width=${n} height=${n} patternUnits="userSpaceOnUse">
          <path d="M ${n} 0 L 0 0 0 ${n}" class="grid-minor"></path>
        </pattern>
        <pattern id="grid-major" width=${r} height=${r} patternUnits="userSpaceOnUse">
          <rect width=${r} height=${r} fill="url(#grid-minor)"></rect>
          <path d="M ${r} 0 L 0 0 0 ${r}" class="grid-major"></path>
        </pattern>
      </defs>
      <rect class="sheet" x="0" y="0" width=${i} height=${s}></rect>
      ${n * (1 / o) >= 4 ? f`<rect x="0" y="0" width=${i} height=${s} fill="url(#grid-major)" pointer-events="none"></rect>` : h}
      <g class="areas">
        ${e.areas.map(
      (d) => f`<g data-kind="area" data-id=${d.id}>${oe(d, {
        selected: l?.kind === "area" && l.id === d.id,
        labelSize: Math.max(i, s) / 45
      })}</g>`
    )}
      </g>
      ${ne(e, t, "fp-editor-wall-mask", { selectedId: l?.kind === "wall" ? l.id : void 0 })}
      <g class="wall-hits">
        ${e.walls.map(
      (d) => f`<line data-kind="wall" data-id=${d.id} x1=${d.x1} y1=${d.y1} x2=${d.x2} y2=${d.y2}
                           stroke-width=${Math.max(zt(d, t), 10 * o)}></line>`
    )}
      </g>
      <g class="openings">
        ${e.openings.map(
      (d) => f`<g data-kind="opening" data-id=${d.id}>${re(d, a, { selected: l?.kind === "opening" && l.id === d.id })}</g>`
    )}
      </g>
      <g class="items">${e.items.map((d) => this._renderItem(d, o))}</g>
      ${this._renderSelectionOverlay(o)}
      ${this._renderDrawPreview(o)}
    `;
  }
  _renderItem(t, e) {
    const i = (t.size ?? 34) / 34 * Ft * e, s = this._sel?.kind === "item" && this._sel.id === t.id, o = t.icon ?? (t.entity ? E(this.hass, t.entity) : "mdi:map-marker");
    return f`
      <g class="item ${s ? "selected" : ""}" data-kind="item" data-id=${t.id}>
        <circle cx=${t.x} cy=${t.y} r=${i}></circle>
        <foreignObject x=${t.x - i} y=${t.y - i} width=${2 * i} height=${2 * i}>
          <div class="fo-icon" style="--mdc-icon-size:${i * 1.2}px;width:${2 * i}px;height:${2 * i}px">
            <ha-icon .icon=${o}></ha-icon>
          </div>
        </foreignObject>
        ${t.label ? f`<text x=${t.x} y=${t.y + i + 12 * e} font-size=${11 * e} text-anchor="middle" class="item-label">${t.label}</text>` : h}
      </g>`;
  }
  _renderSelectionOverlay(t) {
    const e = this._findSelected();
    if (!e || !this._sel) return h;
    const i = ii * t;
    if (this._sel.kind === "wall") {
      const s = e;
      return f`
        <line class="sel-line" x1=${s.x1} y1=${s.y1} x2=${s.x2} y2=${s.y2} stroke-width=${2 * t}></line>
        <circle class="handle" data-handle="p1" cx=${s.x1} cy=${s.y1} r=${i} stroke-width=${2 * t}></circle>
        <circle class="handle" data-handle="p2" cx=${s.x2} cy=${s.y2} r=${i} stroke-width=${2 * t}></circle>
        ${this._lengthLabel({ x: s.x1, y: s.y1 }, { x: s.x2, y: s.y2 }, t)}`;
    }
    if (this._sel.kind === "area") {
      const s = e;
      return f`
        <polygon class="sel-outline" points=${s.points.map((o) => `${o.x},${o.y}`).join(" ")} stroke-width=${2 * t}></polygon>
        ${s.points.map(
        (o, n) => f`<circle class="handle" data-handle="v${n}" cx=${o.x} cy=${o.y} r=${i} stroke-width=${2 * t}></circle>`
      )}`;
    }
    return h;
  }
  _lengthLabel(t, e, i) {
    const s = A(t, e);
    return s < 1 ? h : f`<text class="measure" x=${(t.x + e.x) / 2} y=${(t.y + e.y) / 2 - 10 * i} font-size=${12 * i}
                     text-anchor="middle">${Zt(s)}</text>`;
  }
  _renderDrawPreview(t) {
    const e = this._cursor;
    if (!e) return h;
    const i = { altKey: !1 };
    if (this._tool === "wall") {
      const s = this._snap(e, i);
      if (!this._chainStart) return f`<circle class="cursor-dot" cx=${s.x} cy=${s.y} r=${4 * t}></circle>`;
      const o = ft(this._chainStart, s);
      return f`
        <line class="preview-wall" x1=${this._chainStart.x} y1=${this._chainStart.y} x2=${o.x} y2=${o.y}
              stroke-width=${this._draft.settings.wallThickness}></line>
        ${this._lengthLabel(this._chainStart, o, t)}`;
    }
    if (this._tool === "area") {
      const s = this._snap(e, i), o = [...this._roomPoints, s];
      return f`
        <polyline class="preview-area" points=${o.map((n) => `${n.x},${n.y}`).join(" ")} stroke-width=${2 * t}></polyline>
        ${this._roomPoints.map((n, r) => f`<circle class="cursor-dot ${r === 0 ? "first" : ""}" cx=${n.x} cy=${n.y} r=${(r === 0 ? 6 : 4) * t}></circle>`)}
        <circle class="cursor-dot" cx=${s.x} cy=${s.y} r=${4 * t}></circle>`;
    }
    if (this._tool === "door" || this._tool === "window") {
      const s = ut(e, this._floor.walls, D(this._floor, this._draft) + N * 2 * t);
      return s ? f`<circle class="cursor-dot" cx=${s.point.x} cy=${s.point.y} r=${5 * t}></circle>` : h;
    }
    if (this._tool === "item") {
      const s = this._snap(e, i);
      return f`<circle class="preview-item" cx=${s.x} cy=${s.y} r=${Ft * t}></circle>`;
    }
    return h;
  }
  // ---------------------------------------------------------------- Eigenschaften
  _renderProps() {
    const t = this._findSelected();
    if (!t || !this._sel) return this._renderPlanProps();
    const e = { wall: "Wand", opening: t.type === "window" ? "Fenster" : "Tür", area: "Raum", item: "Icon" }[this._sel.kind];
    return c`
      <div class="props-head">
        <h3>${e}</h3>
        <button class="icon-btn" title="Löschen (Entf)" @click=${this._deleteSelected}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
        <button class="icon-btn" title="Auswahl aufheben" @click=${() => this._sel = void 0}><ha-icon icon="mdi:close"></ha-icon></button>
      </div>
      ${this._sel.kind === "wall" ? this._renderWallProps(t) : this._sel.kind === "opening" ? this._renderOpeningProps(t) : this._sel.kind === "area" ? this._renderAreaProps(t) : this._renderItemProps(t)}
    `;
  }
  _num(t, e, i, s = {}) {
    return c`<label class="field">
      <span>${t}</span>
      <input
        type="number"
        .value=${i == null ? "" : String(U(i))}
        min=${s.min ?? ""}
        max=${s.max ?? ""}
        step=${s.step ?? 1}
        placeholder=${s.placeholder ?? ""}
        @change=${(o) => {
      const n = o.target.value;
      this._setProp(e, n === "" ? void 0 : Number(n));
    }}
      />
    </label>`;
  }
  _text(t, e, i, s = "") {
    return c`<label class="field">
      <span>${t}</span>
      <input
        type="text"
        .value=${i ?? ""}
        placeholder=${s}
        @change=${(o) => this._setProp(e, o.target.value.trim())}
      />
    </label>`;
  }
  _check(t, e, i) {
    return c`<label class="check">
      <input type="checkbox" .checked=${!!i} @change=${(s) => this._setProp(e, s.target.checked)} />
      <span>${t}</span>
    </label>`;
  }
  _color(t, e, i, s) {
    return c`<label class="field color">
      <span>${t}</span>
      <input type="color" .value=${i && i.startsWith("#") ? i : s} @change=${(o) => this._setProp(e, o.target.value)} />
      ${i ? c`<button class="link" @click=${() => this._setProp(e, void 0)}>Standard</button>` : h}
    </label>`;
  }
  _entity(t, e, i, s = []) {
    return c`<div class="field">
      <span>${t}</span>
      <fp-entity-picker
        .hass=${this.hass}
        .value=${i ?? ""}
        .domains=${s}
        @value-changed=${(o) => this._setProp(e, o.detail.value)}
      ></fp-entity-picker>
    </div>`;
  }
  _renderWallProps(t) {
    return c`
      <div class="grid2">
        ${this._num("x1", "x1", t.x1)} ${this._num("y1", "y1", t.y1)} ${this._num("x2", "x2", t.x2)} ${this._num("y2", "y2", t.y2)}
      </div>
      ${this._num("Stärke", "thickness", t.thickness, { min: 1, max: 100, placeholder: `Standard (${this._draft.settings.wallThickness})` })}
      <p class="muted">Länge: ${Zt(A({ x: t.x1, y: t.y1 }, { x: t.x2, y: t.y2 }))}. Endpunkte ziehen ändert die Wand; verbundene Wände ziehen mit.</p>
    `;
  }
  _renderOpeningProps(t) {
    return c`
      <label class="field">
        <span>Art</span>
        <select @change=${(e) => this._setProp("type", e.target.value)}>
          <option value="door" ?selected=${t.type === "door"}>Tür</option>
          <option value="window" ?selected=${t.type === "window"}>Fenster</option>
        </select>
      </label>
      <div class="grid2">
        ${this._num("Breite", "length", t.length, { min: 10, max: 1e3 })} ${this._num("Winkel", "angle", t.angle, { min: -360, max: 360, step: 15 })}
      </div>
      ${t.type === "door" ? c`<div class="btn-row">
            <button @click=${() => this._setProp("hinge", t.hinge === "right" ? "left" : "right")}>
              <ha-icon icon="mdi:swap-horizontal"></ha-icon> Anschlag
            </button>
            <button @click=${() => this._setProp("swing", t.swing === "out" ? "in" : "out")}>
              <ha-icon icon="mdi:swap-vertical"></ha-icon> Richtung
            </button>
          </div>` : h}
      ${this._entity("Kontakt / Rollo (optional)", "entity", t.entity, ["binary_sensor", "cover", "lock"])}
      <p class="muted">Ist die Entität „offen“, wird die Öffnung farbig hervorgehoben. Ziehen schiebt sie entlang der Wände.</p>
    `;
  }
  _renderAreaProps(t) {
    const e = Object.values(this.hass.areas ?? {}).sort((s, o) => s.name.localeCompare(o.name)), i = this._areaSuggestions(t);
    return c`
      ${this._text("Name", "name", t.name)}
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
        ${e.length ? c`<label class="field">
              <span>HA-Bereich (nur Bezug, keine Automatik)</span>
              <select
                @change=${(s) => {
      const o = s.target.value;
      this._mutate(() => {
        const n = this._findSelected();
        o ? n.haArea = o : delete n.haArea, o && (!n.name || /^Raum \d+$/.test(n.name)) && (n.name = this.hass.areas[o].name);
      });
    }}
              >
                <option value="">– keiner –</option>
                ${e.map((s) => c`<option value=${s.area_id} ?selected=${t.haArea === s.area_id}>${s.name}</option>`)}
              </select>
            </label>` : h}
        ${this._entity("Raum einfärben, wenn aktiv", "entity", t.entity, ["binary_sensor", "input_boolean", "light", "switch", "person"])}
        ${t.entity ? this._color("Farbe wenn aktiv", "activeColor", t.activeColor, "#ffc107") : h}
      </details>

      <h4>Seitenleiste</h4>
      <p class="muted">Nur was hier steht, erscheint beim Antippen des Raums – Geräte, Szenen und Skripte.</p>
      <div class="sidebar-list">
        ${t.sidebar.map(
      (s, o) => c`<div class="sb-row">
            <ha-icon .icon=${E(this.hass, s.entity, s.icon)}></ha-icon>
            <div class="sb-main">
              <input
                type="text"
                .value=${s.name ?? ""}
                placeholder=${rt(this.hass, s.entity)}
                @change=${(n) => this._editSidebar(o, "name", n.target.value.trim())}
              />
              <small>${s.entity} · ${{ device: "Gerät", scene: "Szene", script: "Skript" }[_t(s.entity)]}${this.hass.states[s.entity] ? "" : " · nicht gefunden"}</small>
            </div>
            <button class="icon-btn" title="Nach oben" ?disabled=${o === 0} @click=${() => this._moveSidebar(o, -1)}><ha-icon icon="mdi:chevron-up"></ha-icon></button>
            <button class="icon-btn" title="Nach unten" ?disabled=${o === t.sidebar.length - 1} @click=${() => this._moveSidebar(o, 1)}><ha-icon icon="mdi:chevron-down"></ha-icon></button>
            <button class="icon-btn" title="Entfernen" @click=${() => this._removeSidebar(o)}><ha-icon icon="mdi:close"></ha-icon></button>
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
      ${i.length ? c`<div class="suggest">
            <span class="muted">Vorschläge aus dem HA-Bereich – zum Übernehmen antippen:</span>
            <div class="chips">
              ${i.map(
      (s) => c`<button class="chip" title=${s} @click=${() => this._addSidebar(s)}>
                  <ha-icon .icon=${E(this.hass, s)}></ha-icon>${rt(this.hass, s)}
                </button>`
    )}
            </div>
          </div>` : h}
    `;
  }
  /** Entitäten des verknüpften HA-Bereichs, die noch nicht in der Seitenleiste sind (nur Vorschlag). */
  _areaSuggestions(t) {
    if (!t.haArea || !this.hass.entities) return [];
    const e = new Set(t.sidebar.map((o) => o.entity)), i = this.hass.devices, s = /* @__PURE__ */ new Set(["light", "switch", "fan", "cover", "climate", "media_player", "lock", "scene", "script", "vacuum", "input_boolean", "sensor", "binary_sensor", "humidifier", "valve", "button"]);
    return Object.values(this.hass.entities).filter((o) => !o.hidden && !e.has(o.entity_id) && s.has(w(o.entity_id))).filter((o) => (o.area_id ?? (o.device_id ? i?.[o.device_id]?.area_id : void 0)) === t.haArea).map((o) => o.entity_id).slice(0, 30);
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
    return c`
      <div class="field">
        <span>Icon</span>
        <div class="icon-input">
          <ha-icon .icon=${t.icon ?? (t.entity ? E(this.hass, t.entity) : "mdi:map-marker")}></ha-icon>
          <input type="text" .value=${t.icon ?? ""} placeholder=${t.entity ? "vom Gerät" : "mdi:…"}
                 @change=${(e) => this._setProp("icon", e.target.value.trim())} />
        </div>
        <div class="icon-grid">
          ${si.map(
      (e) => c`<button class="icon-pick ${t.icon === e ? "active" : ""}" title=${e} @click=${() => this._setProp("icon", e)}>
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
    ].map(([e, i]) => c`<option value=${e} ?selected=${(t.tapAction ?? "auto") === e}>${i}</option>`)}
        </select>
      </label>
      <div class="grid2">
        ${this._num("Größe (px)", "size", t.size, { min: 8, max: 200, placeholder: "34" })}
        ${this._color("Farbe wenn an", "activeColor", t.activeColor, "#ffb300")}
      </div>
      ${this._check("Zustand anzeigen", "showState", t.showState)}
      ${this._check("Nur zeigen, wenn der Raum gezoomt ist", "showOnlyWhenZoomed", t.showOnlyWhenZoomed)}
      ${t.showOnlyWhenZoomed ? c`<label class="field">
            <span>Gehört zu Raum</span>
            <select @change=${(e) => this._setProp("area", e.target.value)}>
              <option value="">automatisch (Lage im Raum)</option>
              ${this._floor.areas.map((e) => c`<option value=${e.id} ?selected=${t.area === e.id}>${e.name || e.id}</option>`)}
            </select>
          </label>` : h}
      ${!t.area && !this._floor.areas.some((e) => lt(e.points, t.x, t.y)) && t.showOnlyWhenZoomed ? c`<p class="warn">Das Icon liegt in keinem Raum und wird deshalb nie angezeigt.</p>` : h}
    `;
  }
  _renderPlanProps() {
    const t = this._draft, e = this._floor;
    return c`
      <div class="props-head"><h3>Etage &amp; Plan</h3></div>
      <label class="field">
        <span>Etage</span>
        <div class="row">
          <select
            @change=${(i) => {
      this._floorId = i.target.value, this._sel = void 0;
    }}
          >
            ${t.floors.map((i) => c`<option value=${i.id} ?selected=${i.id === this._floorId}>${i.name || i.id}</option>`)}
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
        ${this._planNum("Breite", t.canvas.width, (i) => t.canvas.width = i, 50)}
        ${this._planNum("Höhe", t.canvas.height, (i) => t.canvas.height = i, 50)}
        ${this._planNum("Wandstärke", t.settings.wallThickness, (i) => t.settings.wallThickness = i, 1)}
        ${this._planNum("Raster", t.settings.grid, (i) => t.settings.grid = i, 1)}
      </div>
      <p class="muted">Einheiten frei wählbar – Zentimeter bieten sich an (1000 × 700 = 10 × 7 m).</p>
      <p class="muted">
        ${e.walls.length} Wände · ${e.openings.length} Türen/Fenster · ${e.areas.length} Räume · ${e.items.length} Icons
      </p>
      <h4>Räume</h4>
      <div class="room-list">
        ${e.areas.length ? e.areas.map(
      (i) => c`<button class="room-btn" @click=${() => this._sel = { kind: "area", id: i.id }}>
                <span class="swatch" style="background:${i.color ?? "var(--primary-color)"}"></span>
                ${i.name || i.id}<small>${i.sidebar.length} in Seitenleiste</small>
              </button>`
    ) : c`<p class="muted">Noch keine Räume – mit dem Werkzeug „Raum“ zeichnen.</p>`}
      </div>
      <h4>Verlauf</h4>
      ${this._history ? this._history.length ? c`<div class="history">
              ${this._history.map(
      (i) => c`<div class="hist-row">
                  <span>${new Date(i.created).toLocaleString()}<small> · Rev. ${i.revision} · ${i.reason}</small></span>
                  <button class="link" @click=${() => this._restoreHistory(i.id)}>Wiederherstellen</button>
                </div>`
    )}
            </div>` : c`<p class="muted">Noch keine früheren Stände.</p>` : c`<button class="link" @click=${this._loadHistory}>Frühere Stände anzeigen</button>`}
      <h4>Beispiel</h4>
      <button class="link" @click=${this._loadSample}>Beispiel-Grundriss laden</button>
    `;
  }
  _planNum(t, e, i, s) {
    return c`<label class="field">
      <span>${t}</span>
      <input
        type="number"
        min=${s}
        .value=${String(e)}
        @change=${(o) => {
      const n = Number(o.target.value);
      Number.isFinite(n) && n >= s && this._mutate(() => i(n));
    }}
      />
    </label>`;
  }
  _addFloor() {
    const t = prompt("Name der neuen Etage", "Etage " + (this._draft.floors.length + 1));
    if (!t) return;
    const e = G("etage");
    this._mutate((i, s) => s.floors.push({ id: e, name: t, walls: [], openings: [], areas: [], items: [] })), this._floorId = e, this._sel = void 0;
  }
  _deleteFloor() {
    if (this._draft.floors.length < 2 || !confirm(`Etage „${this._floor.name || this._floorId}“ mit allem Inhalt löschen?`)) return;
    const t = this._floorId;
    this._mutate((e, i) => i.floors = i.floors.filter((s) => s.id !== t)), this._floorId = this._draft.floors[0].id, this._sel = void 0;
  }
};
_.styles = [
  kt(ae),
  J`
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
  g({ attribute: !1 })
], _.prototype, "hass", 2);
v([
  g({ attribute: !1 })
], _.prototype, "plan", 2);
v([
  g({ attribute: !1 })
], _.prototype, "revision", 2);
v([
  g({ attribute: !1 })
], _.prototype, "floorId", 2);
v([
  g({ attribute: !1 })
], _.prototype, "initialAreaId", 2);
v([
  g({ type: Boolean, reflect: !0 })
], _.prototype, "narrow", 2);
v([
  m()
], _.prototype, "_draft", 2);
v([
  m()
], _.prototype, "_floorId", 2);
v([
  m()
], _.prototype, "_tool", 2);
v([
  m()
], _.prototype, "_sel", 2);
v([
  m()
], _.prototype, "_view", 2);
v([
  m()
], _.prototype, "_cursor", 2);
v([
  m()
], _.prototype, "_chainStart", 2);
v([
  m()
], _.prototype, "_roomPoints", 2);
v([
  m()
], _.prototype, "_dirty", 2);
v([
  m()
], _.prototype, "_saving", 2);
v([
  m()
], _.prototype, "_error", 2);
v([
  m()
], _.prototype, "_conflict", 2);
v([
  m()
], _.prototype, "_history", 2);
v([
  m()
], _.prototype, "_svgSize", 2);
v([
  te("svg.canvas")
], _.prototype, "_svg", 2);
_ = v([
  tt("fp-editor")
], _);
function U(t) {
  return Math.round(t * 10) / 10;
}
function Gt(t, e) {
  const i = (e % 360 + 360) % 360, s = (i + 180) % 360, o = (t % 360 + 360) % 360, n = (r) => Math.min(Math.abs(r - o), 360 - Math.abs(r - o));
  return U(n(i) <= n(s) ? i : s);
}
function Zt(t) {
  return t >= 100 ? `${(t / 100).toFixed(2).replace(".", ",")} m` : `${Math.round(t)} cm`;
}
var oi = Object.defineProperty, ni = Object.getOwnPropertyDescriptor, W = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ni(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && oi(e, i, o), o;
};
const ri = /* @__PURE__ */ new Set(["light", "switch", "fan", "input_boolean", "siren"]), ai = 1.35, li = 34;
let ci = 0, C = class extends P {
  constructor() {
    super(...arguments), this._box = { w: 0, h: 0 }, this._maskId = `fp-wall-mask-${++ci}`;
  }
  connectedCallback() {
    super.connectedCallback(), this._ro = new ResizeObserver(() => this._measure()), this._ro.observe(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._ro?.disconnect();
  }
  updated(t) {
    t.has("plan") && this._measure();
  }
  /** Größte Box mit dem Seitenverhältnis der Leinwand, die in das Element passt. */
  _measure() {
    if (!this.plan) return;
    const { width: t, height: e } = this.plan.canvas, i = getComputedStyle(this), s = this.clientWidth - parseFloat(i.paddingLeft) - parseFloat(i.paddingRight), o = this.clientHeight - parseFloat(i.paddingTop) - parseFloat(i.paddingBottom);
    if (!s || !o) return;
    const n = Math.min(s / t, o / e), r = Math.floor(t * n), a = Math.floor(e * n);
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
    s === "auto" && (gt(i) ? s = "toggle" : s = ri.has(w(i)) ? "toggle" : "more-info"), s !== "none" && (s === "more-info" ? at(this, i) : gt(i) ? await bt(this.hass, i) : await ie(this.hass, i));
  }
  _onItemContext(t, e) {
    e.entity && (t.preventDefault(), at(this, e.entity));
  }
  render() {
    if (!this.plan || !this.floor) return h;
    const { width: t, height: e } = this.plan.canvas, i = this.floor, s = i.areas.find((a) => a.id === this.zoomedAreaId), o = s ? Fe(s.points, t, e, void 0, void 0, Be(s)) : yt, n = o.scale > 1 ? ai / o.scale : 1, r = Math.max(t, e) / 45;
    return c`
      <div
        class="plan"
        style="width:${this._box.w}px;height:${this._box.h}px"
        @click=${() => this._emit("background-click")}
      >
        <div
          class="plan-zoom"
          style="transform:translate(${o.txPercent}%, ${o.tyPercent}%) scale(${o.scale});--fp-inv-zoom:${n}"
        >
          <svg viewBox="0 0 ${t} ${e}" preserveAspectRatio="xMidYMid meet">
            <g class="areas">
              ${i.areas.map(
      (a) => f`<g @click=${(l) => this._onAreaClick(l, a.id)}>${oe(a, {
        hass: this.hass,
        selected: a.id === this.zoomedAreaId,
        dimmed: !!s && a.id !== s.id,
        labelSize: r
      })}</g>`
    )}
            </g>
            ${ne(i, this.plan, this._maskId)} ${qe(i, this.plan, { hass: this.hass })}
          </svg>
          <div class="items">
            ${i.items.filter((a) => !Ze(a, s, i.areas)).map((a) => this._renderItem(a, t, e))}
          </div>
        </div>
      </div>
    `;
  }
  _renderItem(t, e, i) {
    const s = t.entity ? this.hass.states[t.entity] : void 0, o = q(s), n = !!t.entity && vt(s), r = t.icon ?? (t.entity ? E(this.hass, t.entity) : "mdi:map-marker"), a = t.size ?? li, l = o ? t.activeColor ?? "var(--fp-active-color, #ffb300)" : t.color ?? "", d = t.label ?? s?.attributes.friendly_name ?? t.entity ?? "";
    return c`
      <div
        class="item ${o ? "active" : ""} ${n ? "unavailable" : ""} ${t.entity ? "interactive" : ""}"
        style="left:${t.x / e * 100}%;top:${t.y / i * 100}%;--fp-item-size:${a}px;${l ? `--fp-item-color:${l}` : ""}"
        title=${d}
        @click=${(p) => this._onItemClick(p, t)}
        @contextmenu=${(p) => this._onItemContext(p, t)}
      >
        <div class="badge"><ha-icon .icon=${r}></ha-icon></div>
        ${t.label ? c`<div class="label">${t.label}</div>` : h}
        ${t.showState && s ? c`<div class="state">${ee(this.hass, s)}</div>` : h}
      </div>
    `;
  }
};
C.styles = [
  kt(ae),
  J`
      :host {
        display: block;
        position: relative;
        overflow: hidden;
        min-height: 0;
        min-width: 0;
      }
      .plan {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        border-radius: 12px;
        background: var(--fp-floor-color, var(--card-background-color, #fff));
        box-shadow: var(--ha-card-box-shadow, 0 2px 6px rgba(0, 0, 0, 0.12));
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
W([
  g({ attribute: !1 })
], C.prototype, "hass", 2);
W([
  g({ attribute: !1 })
], C.prototype, "plan", 2);
W([
  g({ attribute: !1 })
], C.prototype, "floor", 2);
W([
  g({ attribute: !1 })
], C.prototype, "zoomedAreaId", 2);
W([
  m()
], C.prototype, "_box", 2);
C = W([
  tt("fp-plan-view")
], C);
var di = Object.defineProperty, hi = Object.getOwnPropertyDescriptor, ht = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? hi(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && di(e, i, o), o;
};
const pi = [
  { kind: "device", title: "Geräte" },
  { kind: "scene", title: "Szenen" },
  { kind: "script", title: "Skripte" }
];
let H = class extends P {
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
    if (!this.area) return h;
    const t = this.area.sidebar ?? [], e = t.filter((i) => _t(i.entity) === "device" && q(this.hass.states[i.entity])).length;
    return c`
      <header>
        <div class="title">
          <h2>${this.area.name || "Raum"}</h2>
          <span class="sub">${t.length ? `${e} aktiv` : ""}</span>
        </div>
        ${this.canEdit ? c`<button class="icon-btn" title="Seitenleiste bearbeiten" @click=${this._edit}>
              <ha-icon icon="mdi:pencil"></ha-icon>
            </button>` : h}
        <button class="icon-btn" title="Schließen" @click=${this._close}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </header>
      <div class="content">
        ${t.length === 0 ? c`<p class="empty">
              Diesem Raum ist noch nichts zugeordnet.${this.canEdit ? c` Im Editor lassen sich Geräte, Szenen und Skripte für die Seitenleiste auswählen.` : h}
            </p>` : pi.map(({ kind: i, title: s }) => {
      const o = t.filter((n) => _t(n.entity) === i);
      return o.length ? c`<section>
                <h3>${s}</h3>
                ${i === "device" ? o.map((n) => this._renderRow(n)) : c`<div class="chips">${o.map((n) => this._renderChip(n))}</div>`}
              </section>` : h;
    })}
      </div>
    `;
  }
  _renderRow(t) {
    const e = this.hass.states[t.entity], i = q(e), s = vt(e), o = t.name || rt(this.hass, t.entity), n = w(t.entity);
    return c`
      <div class="row ${i ? "active" : ""} ${s ? "unavailable" : ""}">
        <button class="row-main" @click=${() => at(this, t.entity)} title="Details">
          <span class="row-icon"><ha-icon .icon=${E(this.hass, t.entity, t.icon)}></ha-icon></span>
          <span class="row-text">
            <span class="name">${o}</span>
            <span class="state">${ee(this.hass, e)}</span>
          </span>
        </button>
        ${s ? h : n === "cover" ? c`<span class="cover-btns">
              <button class="icon-btn" title="Öffnen" @click=${() => this._call("cover", "open_cover", t.entity)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button class="icon-btn" title="Stopp" @click=${() => this._call("cover", "stop_cover", t.entity)}>
                <ha-icon icon="mdi:stop"></ha-icon>
              </button>
              <button class="icon-btn" title="Schließen" @click=${() => this._call("cover", "close_cover", t.entity)}>
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
            </span>` : gt(t.entity) ? c`<button class="run" @click=${() => bt(this.hass, t.entity)}>Ausführen</button>` : Te(t.entity) ? c`<button
              class="switch ${i ? "on" : ""}"
              role="switch"
              aria-checked=${i ? "true" : "false"}
              title=${i ? "Ausschalten" : "Einschalten"}
              @click=${() => ie(this.hass, t.entity)}
            >
              <span class="knob"></span>
            </button>` : h}
      </div>
    `;
  }
  _renderChip(t) {
    const e = this.hass.states[t.entity], i = t.name || rt(this.hass, t.entity), s = w(t.entity) === "script" && e?.state === "on";
    return c`
      <button
        class="chip ${s ? "running" : ""}"
        ?disabled=${vt(e)}
        title=${t.entity}
        @click=${() => bt(this.hass, t.entity)}
        @contextmenu=${(o) => {
      o.preventDefault(), at(this, t.entity);
    }}
      >
        <ha-icon .icon=${E(this.hass, t.entity, t.icon)}></ha-icon>
        <span>${i}</span>
      </button>
    `;
  }
  _call(t, e, i) {
    this.hass.callService(t, e, { entity_id: i });
  }
};
H.styles = J`
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
ht([
  g({ attribute: !1 })
], H.prototype, "hass", 2);
ht([
  g({ attribute: !1 })
], H.prototype, "area", 2);
ht([
  g({ type: Boolean })
], H.prototype, "canEdit", 2);
H = ht([
  tt("fp-room-sidebar")
], H);
var ui = Object.defineProperty, fi = Object.getOwnPropertyDescriptor, S = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? fi(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && ui(e, i, o), o;
};
const mt = "floorplan_panel";
let x = class extends P {
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
      const t = await this.hass.callWS({ type: `${mt}/plan/get` });
      this._setPlan(t.plan, t.revision), this._unsub || (this._unsub = await this.hass.connection.subscribeMessage((e) => this._onEvent(e), {
        type: `${mt}/subscribe`
      }));
    } catch (t) {
      this._error = t?.message ?? String(t);
    } finally {
      this._loading = !1;
    }
  }
  _setPlan(t, e) {
    const i = $t(t);
    this._plan = i, this._revision = e, i.floors.some((o) => o.id === this._floorId) || (this._floorId = i.floors[0]?.id), i.floors.find((o) => o.id === this._floorId)?.areas.some((o) => o.id === this._zoomedAreaId) || (this._zoomedAreaId = void 0);
  }
  async _onEvent(t) {
    t.type === "plan_updated" ? t.revision !== this._revision && !this._editing && await this._load() : t.type === "show_room" ? this._showRoom(t.room, t.floor ?? void 0) : t.type === "reset_view" && (this._zoomedAreaId = void 0);
  }
  _showRoom(t, e) {
    if (!this._plan || this._editing) return;
    const i = t.toLowerCase();
    for (const s of this._plan.floors) {
      if (e && s.id !== e) continue;
      const o = s.areas.find((n) => n.id === t || n.name.toLowerCase() === i);
      if (o) {
        this._floorId = s.id, this._zoomedAreaId = o.id;
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
      const t = await this.hass.callWS({ type: `${mt}/plan/load_sample` });
      this._setPlan(t.plan, t.revision);
    } catch (t) {
      this._error = t?.message ?? String(t);
    }
  }
  render() {
    if (this._editing && this._plan)
      return c`<fp-editor
        .hass=${this.hass}
        .plan=${this._plan}
        .revision=${this._revision}
        .floorId=${this._floorId}
        .initialAreaId=${this._editRoomId}
        .narrow=${this.narrow}
        @editor-done=${this._onEditorDone}
      ></fp-editor>`;
    const t = this._plan, e = t?.floors.find((o) => o.id === this._floorId), i = e?.areas.find((o) => o.id === this._zoomedAreaId), s = !!e && !e.walls.length && !e.areas.length && !e.items.length;
    return c`
      <div class="toolbar">
        ${this.narrow ? c`<button class="icon-btn" title="Menü" @click=${this._toggleMenu}><ha-icon icon="mdi:menu"></ha-icon></button>` : c`<span class="spacer"></span>`}
        <div class="main-title">Grundriss</div>
        ${t && t.floors.length > 1 ? c`<div class="floors">
              ${t.floors.map(
      (o) => c`<button
                  class="floor-btn ${o.id === this._floorId ? "active" : ""}"
                  @click=${() => {
        this._floorId = o.id, this._zoomedAreaId = void 0;
      }}
                >
                  ${o.name || o.id}
                </button>`
    )}
            </div>` : h}
        ${this._isAdmin && t ? c`<button class="icon-btn" title="Grundriss bearbeiten" @click=${() => this._openEditor()}>
              <ha-icon icon="mdi:pencil-ruler"></ha-icon>
            </button>` : h}
      </div>
      ${this._error ? c`<div class="message error">Grundriss konnte nicht geladen werden: ${this._error}</div>` : t ? !e || s ? c`<div class="message">
            <ha-icon icon="mdi:floor-plan" class="big"></ha-icon>
            <p>Noch kein Grundriss gezeichnet.</p>
            ${this._isAdmin ? c`<div class="actions">
                  <button class="primary" @click=${() => this._openEditor()}>Editor öffnen</button>
                  <button @click=${this._loadSample}>Beispiel-Grundriss laden</button>
                </div>` : c`<p>Ein Administrator kann ihn im Editor anlegen.</p>`}
          </div>` : c`<div class="body ${i ? "with-sidebar" : ""}">
            <fp-plan-view
              .hass=${this.hass}
              .plan=${t}
              .floor=${e}
              .zoomedAreaId=${this._zoomedAreaId}
              @area-click=${this._onAreaClick}
              @background-click=${() => this._zoomedAreaId = void 0}
            ></fp-plan-view>
            ${i ? c`<fp-room-sidebar
                  .hass=${this.hass}
                  .area=${i}
                  .canEdit=${this._isAdmin}
                  @close=${() => this._zoomedAreaId = void 0}
                  @edit-room=${(o) => this._openEditor(o.detail.id)}
                ></fp-room-sidebar>` : h}
          </div>` : c`<div class="message">Lade …</div>`}
    `;
  }
};
x.styles = J`
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
    }
    fp-plan-view {
      flex: 1;
      padding: 16px;
    }
    fp-room-sidebar {
      width: 360px;
      flex: none;
      border-left: 1px solid var(--divider-color);
      animation: slide-in 0.3s ease;
    }
    @keyframes slide-in {
      from {
        transform: translateX(40px);
        opacity: 0;
      }
    }
    :host([narrow]) .body {
      flex-direction: column;
    }
    :host([narrow]) fp-plan-view {
      padding: 8px;
    }
    :host([narrow]) fp-room-sidebar {
      width: auto;
      max-height: 55%;
      border-left: none;
      border-top: 1px solid var(--divider-color);
      border-radius: 16px 16px 0 0;
      box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.15);
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
S([
  g({ attribute: !1 })
], x.prototype, "hass", 2);
S([
  g({ type: Boolean, reflect: !0 })
], x.prototype, "narrow", 2);
S([
  g({ attribute: !1 })
], x.prototype, "panel", 2);
S([
  m()
], x.prototype, "_plan", 2);
S([
  m()
], x.prototype, "_revision", 2);
S([
  m()
], x.prototype, "_floorId", 2);
S([
  m()
], x.prototype, "_zoomedAreaId", 2);
S([
  m()
], x.prototype, "_editing", 2);
S([
  m()
], x.prototype, "_editRoomId", 2);
S([
  m()
], x.prototype, "_error", 2);
x = S([
  tt("floorplan-panel")
], x);
