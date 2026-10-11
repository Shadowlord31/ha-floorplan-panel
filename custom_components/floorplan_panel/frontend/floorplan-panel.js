function nt(t) {
  return (e) => {
    customElements.get(t) || customElements.define(t, e);
  };
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const At = globalThis, ce = At.ShadowRoot && (At.ShadyCSS === void 0 || At.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, he = Symbol(), be = /* @__PURE__ */ new WeakMap();
let Ve = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== he) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (ce && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = be.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && be.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const dt = (t) => new Ve(typeof t == "string" ? t : t + "", void 0, he), Y = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((s, n, o) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[o + 1], t[0]);
  return new Ve(i, t, he);
}, ki = (t, e) => {
  if (ce) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const s = document.createElement("style"), n = At.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, t.appendChild(s);
  }
}, $e = ce ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return dt(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Si, defineProperty: Mi, getOwnPropertyDescriptor: Ai, getOwnPropertyNames: Pi, getOwnPropertySymbols: Ei, getPrototypeOf: zi } = Object, Dt = globalThis, ve = Dt.trustedTypes, Ci = ve ? ve.emptyScript : "", Oi = Dt.reactiveElementPolyfillSupport, yt = (t, e) => t, Et = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Ci : null;
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
} }, de = (t, e) => !Si(t, e), we = { attribute: !0, type: String, converter: Et, reflect: !1, useDefault: !1, hasChanged: de };
Symbol.metadata ??= Symbol("metadata"), Dt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let lt = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = we) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(e, s, i);
      n !== void 0 && Mi(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: n, set: o } = Ai(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? we;
  }
  static _$Ei() {
    if (this.hasOwnProperty(yt("elementProperties"))) return;
    const e = zi(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(yt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(yt("properties"))) {
      const i = this.properties, s = [...Pi(i), ...Ei(i)];
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
      for (const n of s) i.unshift($e(n));
    } else e !== void 0 && i.push($e(e));
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
    return ki(e, this.constructor.elementStyles), e;
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
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : Et).toAttribute(i, s.type);
      this._$Em = e, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const s = this.constructor, n = s._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Et;
      this._$Em = n;
      const a = r.fromAttribute(i, o.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, i, s, n = !1, o) {
    if (e !== void 0) {
      const r = this.constructor;
      if (n === !1 && (o = this[e]), s ??= r.getPropertyOptions(e), !((s.hasChanged ?? de)(o, i) || s.useDefault && s.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, s)))) return;
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
lt.elementStyles = [], lt.shadowRootOptions = { mode: "open" }, lt[yt("elementProperties")] = /* @__PURE__ */ new Map(), lt[yt("finalized")] = /* @__PURE__ */ new Map(), Oi?.({ ReactiveElement: lt }), (Dt.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pe = globalThis, ke = (t) => t, zt = pe.trustedTypes, Se = zt ? zt.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, qe = "$lit$", Z = `lit$${Math.random().toFixed(9).slice(2)}$`, Ze = "?" + Z, Ri = `<${Ze}>`, et = document, bt = () => et.createComment(""), $t = (t) => t === null || typeof t != "object" && typeof t != "function", ue = Array.isArray, Ii = (t) => ue(t) || typeof t?.[Symbol.iterator] == "function", Ft = `[ 	
\f\r]`, gt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Me = /-->/g, Ae = />/g, Q = RegExp(`>|${Ft}(?:([^\\s"'>=/]+)(${Ft}*=${Ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Pe = /'/g, Ee = /"/g, Xe = /^(?:script|style|textarea|title)$/i, Ye = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), p = Ye(1), _ = Ye(2), pt = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), ze = /* @__PURE__ */ new WeakMap(), tt = et.createTreeWalker(et, 129);
function Je(t, e) {
  if (!ue(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Se !== void 0 ? Se.createHTML(e) : e;
}
const Ti = (t, e) => {
  const i = t.length - 1, s = [];
  let n, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = gt;
  for (let a = 0; a < i; a++) {
    const l = t[a];
    let c, h, d = -1, g = 0;
    for (; g < l.length && (r.lastIndex = g, h = r.exec(l), h !== null); ) g = r.lastIndex, r === gt ? h[1] === "!--" ? r = Me : h[1] !== void 0 ? r = Ae : h[2] !== void 0 ? (Xe.test(h[2]) && (n = RegExp("</" + h[2], "g")), r = Q) : h[3] !== void 0 && (r = Q) : r === Q ? h[0] === ">" ? (r = n ?? gt, d = -1) : h[1] === void 0 ? d = -2 : (d = r.lastIndex - h[2].length, c = h[1], r = h[3] === void 0 ? Q : h[3] === '"' ? Ee : Pe) : r === Ee || r === Pe ? r = Q : r === Me || r === Ae ? r = gt : (r = Q, n = void 0);
    const f = r === Q && t[a + 1].startsWith("/>") ? " " : "";
    o += r === gt ? l + Ri : d >= 0 ? (s.push(c), l.slice(0, d) + qe + l.slice(d) + Z + f) : l + Z + (d === -2 ? a : f);
  }
  return [Je(t, o + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class vt {
  constructor({ strings: e, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const a = e.length - 1, l = this.parts, [c, h] = Ti(e, i);
    if (this.el = vt.createElement(c, s), tt.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = tt.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(qe)) {
          const g = h[r++], f = n.getAttribute(d).split(Z), u = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: o, name: u[2], strings: f, ctor: u[1] === "." ? Ni : u[1] === "?" ? Di : u[1] === "@" ? Ui : Ut }), n.removeAttribute(d);
        } else d.startsWith(Z) && (l.push({ type: 6, index: o }), n.removeAttribute(d));
        if (Xe.test(n.tagName)) {
          const d = n.textContent.split(Z), g = d.length - 1;
          if (g > 0) {
            n.textContent = zt ? zt.emptyScript : "";
            for (let f = 0; f < g; f++) n.append(d[f], bt()), tt.nextNode(), l.push({ type: 2, index: ++o });
            n.append(d[g], bt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Ze) l.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(Z, d + 1)) !== -1; ) l.push({ type: 7, index: o }), d += Z.length - 1;
      }
      o++;
    }
  }
  static createElement(e, i) {
    const s = et.createElement("template");
    return s.innerHTML = e, s;
  }
}
function ut(t, e, i = t, s) {
  if (e === pt) return e;
  let n = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const o = $t(e) ? void 0 : e._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(t), n._$AT(t, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = n : i._$Cl = n), n !== void 0 && (e = ut(t, n._$AS(t, e.values), n, s)), e;
}
class Li {
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
    const { el: { content: i }, parts: s } = this._$AD, n = (e?.creationScope ?? et).importNode(i, !0);
    tt.currentNode = n;
    let o = tt.nextNode(), r = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new wt(o, o.nextSibling, this, e) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, e) : l.type === 6 && (c = new Wi(o, this, e)), this._$AV.push(c), l = s[++a];
      }
      r !== l?.index && (o = tt.nextNode(), r++);
    }
    return tt.currentNode = et, n;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
}
class wt {
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
    e = ut(this, e, i), $t(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== pt && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ii(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== m && $t(this._$AH) ? this._$AA.nextSibling.data = e : this.T(et.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: s } = e, n = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = vt.createElement(Je(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const o = new Li(n, this), r = o.u(this.options);
      o.p(i), this.T(r), this._$AH = o;
    }
  }
  _$AC(e) {
    let i = ze.get(e.strings);
    return i === void 0 && ze.set(e.strings, i = new vt(e)), i;
  }
  k(e) {
    ue(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const o of e) n === i.length ? i.push(s = new wt(this.O(bt()), this.O(bt()), this, this.options)) : s = i[n], s._$AI(o), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const s = ke(e).nextSibling;
      ke(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Ut {
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
    if (o === void 0) e = ut(this, e, i, 0), r = !$t(e) || e !== this._$AH && e !== pt, r && (this._$AH = e);
    else {
      const a = e;
      let l, c;
      for (e = o[0], l = 0; l < o.length - 1; l++) c = ut(this, a[s + l], i, l), c === pt && (c = this._$AH[l]), r ||= !$t(c) || c !== this._$AH[l], c === m ? e = m : e !== m && (e += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    r && !n && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ni extends Ut {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
class Di extends Ut {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
}
class Ui extends Ut {
  constructor(e, i, s, n, o) {
    super(e, i, s, n, o), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = ut(this, e, i, 0) ?? m) === pt) return;
    const s = this._$AH, n = e === m && s !== m || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, o = e !== m && (s === m || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Wi {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ut(this, e);
  }
}
const Fi = pe.litHtmlPolyfillSupport;
Fi?.(vt, wt), (pe.litHtmlVersions ??= []).push("3.3.3");
const ji = (t, e, i) => {
  const s = i?.renderBefore ?? e;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = i?.renderBefore ?? null;
    s._$litPart$ = n = new wt(e.insertBefore(bt(), o), o, void 0, i ?? {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fe = globalThis;
class W extends lt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ji(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return pt;
  }
}
W._$litElement$ = !0, W.finalized = !0, fe.litElementHydrateSupport?.({ LitElement: W });
const Bi = fe.litElementPolyfillSupport;
Bi?.({ LitElement: W });
(fe.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Gi = { attribute: !0, type: String, converter: Et, reflect: !1, hasChanged: de }, Hi = (t = Gi, e, i) => {
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
function w(t) {
  return (e, i) => typeof i == "object" ? Hi(t, e, i) : ((s, n, o) => {
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
  return w({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ki = (t, e, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, i), i);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ge(t, e) {
  return (i, s, n) => {
    const o = (r) => r.renderRoot?.querySelector(t) ?? null;
    return Ki(i, s, { get() {
      return o(this);
    } });
  };
}
const R = (t) => t.split(".")[0], Vi = /* @__PURE__ */ new Set([
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
]), qi = /* @__PURE__ */ new Set(["scene", "script", "button", "input_button"]);
function Xt(t) {
  const e = R(t);
  return e === "scene" ? "scene" : e === "script" ? "script" : "device";
}
function Zi(t) {
  return Vi.has(R(t));
}
function Yt(t) {
  return qi.has(R(t));
}
function it(t) {
  if (!t) return !1;
  const e = t.state;
  if (e === "unavailable" || e === "unknown") return !1;
  switch (R(t.entity_id)) {
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
function Jt(t) {
  return !t || t.state === "unavailable";
}
function Ct(t, e) {
  return t.states[e]?.attributes.friendly_name ?? e;
}
function Qe(t, e) {
  if (!e) return "nicht gefunden";
  if (t.formatEntityState)
    try {
      return t.formatEntityState(e);
    } catch {
    }
  const i = e.attributes.unit_of_measurement;
  return i ? `${e.state} ${i}` : e.state;
}
const Xi = {
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
function B(t, e, i) {
  if (i) return i;
  const s = t.states[e]?.attributes.icon;
  return s || (Xi[R(e)] ?? "mdi:help-circle-outline");
}
async function ti(t, e) {
  const i = R(e), s = t.states[e];
  i === "lock" ? await t.callService("lock", s?.state === "locked" ? "unlock" : "lock", { entity_id: e }) : i === "cover" ? await t.callService("cover", "toggle", { entity_id: e }) : await t.callService("homeassistant", "toggle", { entity_id: e });
}
async function Qt(t, e) {
  const i = R(e);
  i === "scene" ? await t.callService("scene", "turn_on", { entity_id: e }) : i === "script" ? await t.callService("script", "turn_on", { entity_id: e }) : (i === "button" || i === "input_button") && await t.callService(i, "press", { entity_id: e });
}
function Ot(t, e) {
  t.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: e }, bubbles: !0, composed: !0 }));
}
var Yi = Object.defineProperty, Ji = Object.getOwnPropertyDescriptor, F = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Ji(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (n = (s ? r(e, i, n) : r(n)) || n);
  return s && n && Yi(e, i, n), n;
};
const Qi = 60;
let L = class extends W {
  constructor() {
    super(...arguments), this.value = "", this.domains = [], this.exclude = [], this.placeholder = "Entität suchen …", this.clearOnSelect = !1, this._open = !1, this._filter = "", this._highlight = 0;
  }
  _results() {
    const t = this._filter.trim().toLowerCase(), e = new Set(this.exclude), i = [];
    for (const s of Object.keys(this.hass.states).sort()) {
      if (e.has(s) || this.domains.length && !this.domains.includes(R(s))) continue;
      const n = this.hass.states[s].attributes.friendly_name ?? s;
      if (!(t && !s.toLowerCase().includes(t) && !n.toLowerCase().includes(t)) && (i.push({ id: s, name: n }), i.length >= Qi))
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
        ${this.value && !this.clearOnSelect ? p`<ha-icon class="lead" .icon=${B(this.hass, this.value)}></ha-icon>` : p`<ha-icon class="lead" icon="mdi:magnify"></ha-icon>`}
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
            </button>` : m}
      </div>
      ${this.value && !this.clearOnSelect ? p`<div class="id">${this.value}</div>` : m}
      ${this._open ? p`<div class="list">
            ${t.length === 0 ? p`<div class="none">Keine Treffer</div>` : t.map(
      (s, n) => p`<div
                    class="opt ${n === this._highlight ? "hl" : ""}"
                    @mousedown=${(o) => {
        o.preventDefault(), this._select(s.id);
      }}
                  >
                    <ha-icon .icon=${B(this.hass, s.id)}></ha-icon>
                    <span class="txt"><span>${s.name}</span><small>${s.id}</small></span>
                  </div>`
    )}
          </div>` : m}
    `;
  }
};
L.styles = Y`
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
F([
  w({ attribute: !1 })
], L.prototype, "hass", 2);
F([
  w()
], L.prototype, "value", 2);
F([
  w({ attribute: !1 })
], L.prototype, "domains", 2);
F([
  w({ attribute: !1 })
], L.prototype, "exclude", 2);
F([
  w()
], L.prototype, "placeholder", 2);
F([
  w({ type: Boolean })
], L.prototype, "clearOnSelect", 2);
F([
  b()
], L.prototype, "_open", 2);
F([
  b()
], L.prototype, "_filter", 2);
F([
  b()
], L.prototype, "_highlight", 2);
F([
  ge("input")
], L.prototype, "_input", 2);
L = F([
  nt("fp-entity-picker")
], L);
const te = 4, ei = "#ef6c00", ii = "#8d6e63", ts = [
  ["room", "Zimmer"],
  ["balcony", "Balkon"],
  ["hallway", "Flur"],
  ["staircase", "Treppenhaus"],
  ["bathroom", "Bad"],
  ["custom", "Eigene Bezeichnung"]
], rt = 100, ct = 60, ee = "#9e9e9e", ie = 150, si = "#ffd9a0", Ce = 30, es = { wallThickness: 12, grid: 10 };
function is(t) {
  const { sashes: e, shutterEntity: i, shutterColor: s, ...n } = t;
  return n.type === "window" && !n.leaves && (e === 1 || e === 2) && (n.leaves = e === 2 ? [{ w: 1, hinge: "left" }, { w: 1, hinge: "right" }] : [{ w: 1 }]), n.type === "window" && i && !n.shutters && (n.shutters = [{ entity: i, side: "out", ...s ? { color: s } : {} }]), n.type === "door" && n.entity?.startsWith("lock.") && (n.lockEntity ??= n.entity, delete n.entity), n;
}
function se(t) {
  const e = t ?? {};
  return {
    version: e.version ?? 1,
    canvas: e.canvas ?? { width: 1e3, height: 700 },
    settings: { ...es, ...e.settings ?? {} },
    furniture: e.furniture ?? [],
    floors: (e.floors ?? []).map((i) => ({
      ...i,
      name: i.name ?? "",
      walls: i.walls ?? [],
      openings: (i.openings ?? []).map(is),
      areas: (i.areas ?? []).map((s) => ({ ...s, name: s.name ?? "", sidebar: s.sidebar ?? [] })),
      items: i.items ?? []
    }))
  };
}
function E(t) {
  return `${t}-${Math.random().toString(36).slice(2, 8)}`;
}
const ss = /^[MmLlHhVvCcSsQqTtAaZz0-9eE.,\s+-]+$/, ns = /^(#[0-9a-fA-F]{3,8}|[a-zA-Z]{3,20}|rgba?\([0-9.,\s%]+\)|var\(--[a-zA-Z0-9-]+\))$/, os = 2e4;
function ni(t) {
  return typeof t == "string" && t.length > 0 && t.length <= os && ss.test(t);
}
function Rt(t) {
  return typeof t == "string" && ns.test(t.trim());
}
function H(t, e) {
  return e ? t?.find((i) => i.id === e) : void 0;
}
function oi(t, e) {
  const i = (t.rotation ?? 0) * Math.PI / 180, s = t.scale ?? 1, n = Math.cos(i), o = Math.sin(i);
  return { x: t.x + s * (e.x * n - e.y * o), y: t.y + s * (e.x * o + e.y * n) };
}
function It(t) {
  if (t.shape === "circle") {
    const s = t.r ?? 0;
    return { x0: t.x - s, y0: t.y - s, x1: t.x + s, y1: t.y + s };
  }
  if (t.shape === "polygon") {
    const s = t.points ?? [];
    return s.length ? {
      x0: t.x + Math.min(...s.map((n) => n.x)),
      y0: t.y + Math.min(...s.map((n) => n.y)),
      x1: t.x + Math.max(...s.map((n) => n.x)),
      y1: t.y + Math.max(...s.map((n) => n.y))
    } : { x0: t.x, y0: t.y, x1: t.x, y1: t.y };
  }
  const e = t.w ?? 0, i = t.h ?? 0;
  return { x0: t.x - e / 2, y0: t.y - i / 2, x1: t.x + e / 2, y1: t.y + i / 2 };
}
function Tt(t) {
  const e = t.parts.map(It);
  for (const i of t.lights ?? []) e.push({ x0: i.x, y0: i.y, x1: i.x, y1: i.y });
  return e.length ? {
    x0: Math.min(...e.map((i) => i.x0)),
    y0: Math.min(...e.map((i) => i.y0)),
    x1: Math.max(...e.map((i) => i.x1)),
    y1: Math.max(...e.map((i) => i.y1))
  } : { x0: -15, y0: -15, x1: 15, y1: 15 };
}
function ri(t, e) {
  const i = Tt(e);
  return [
    { x: i.x0, y: i.y0 },
    { x: i.x1, y: i.y0 },
    { x: i.x1, y: i.y1 },
    { x: i.x0, y: i.y1 }
  ].map((s) => oi(t, s));
}
function ai(t, e) {
  const i = H(e, t.furnitureType);
  return i?.lights?.length ? i.lights.map((s) => oi(t, s)) : [{ x: t.x, y: t.y }];
}
function Pt(t, e) {
  if (typeof t.glow == "boolean") return t.glow;
  if (!t.entity || R(t.entity) !== "light") return !1;
  const i = H(e, t.furnitureType);
  return !t.furnitureType || !i || !!i.lights?.length;
}
function li(t, e) {
  return !t.furnitureType || !H(e, t.furnitureType) ? !0 : !!(t.entity || t.icon || t.label);
}
function rs(t) {
  if (t.shape === "path" && t.d && t.vb) {
    const [e, i, s, n] = t.vb, o = t.w ?? s, r = t.h ?? n;
    return `translate(${t.x - o / 2} ${t.y - r / 2}) scale(${s ? o / s : 1} ${n ? r / n : 1}) translate(${-e} ${-i})`;
  }
}
function Lt(t, e = {}) {
  const i = e.fill ?? (Rt(t.fill) ? t.fill : ee), s = t.opacity ?? 1, n = `fpart ${e.cls ?? ""}`;
  let o = m;
  if (t.shape === "rect") {
    const h = t.w ?? 0, d = t.h ?? 0;
    o = _`<rect class=${n} x=${t.x - h / 2} y=${t.y - d / 2} width=${h} height=${d} fill=${i} fill-opacity=${s}></rect>`;
  } else if (t.shape === "circle")
    o = _`<circle class=${n} cx=${t.x} cy=${t.y} r=${t.r ?? 0} fill=${i} fill-opacity=${s}></circle>`;
  else if (t.shape === "polygon") {
    const h = (t.points ?? []).map((d) => `${t.x + d.x},${t.y + d.y}`).join(" ");
    o = _`<polygon class=${n} points=${h} fill=${i} fill-opacity=${s}></polygon>`;
  } else t.shape === "path" && ni(t.d) && (o = _`<path class=${n} d=${t.d} transform=${rs(t) ?? m} fill=${i} fill-opacity=${s}
      vector-effect="non-scaling-stroke"></path>`);
  const r = It(t), a = e.iconSize ?? Math.max(8, Math.min(r.x1 - r.x0, r.y1 - r.y0) * 0.7), l = (r.x0 + r.x1) / 2, c = (r.y0 + r.y1) / 2;
  return _`${o}${t.icon ? _`<foreignObject class="fpart-icon" x=${l - a / 2} y=${c - a / 2} width=${a} height=${a} pointer-events="none">
          <div class="fo-icon" style="--mdc-icon-size:${a}px;width:${a}px;height:${a}px"><ha-icon .icon=${t.icon}></ha-icon></div>
        </foreignObject>` : m}`;
}
function ne(t, e, i = {}) {
  const s = t.rotation ?? 0, n = t.scale ?? 1;
  return _`<g class="furniture ${i.selected ? "selected" : ""}" data-furniture=${t.id}
      transform="translate(${t.x} ${t.y}) rotate(${s}) scale(${n})">
    ${e.parts.map((o) => Lt(o, { fill: i.fill, cls: i.hit ? "hit" : "" }))}
  </g>`;
}
function ci(t, e) {
  return e && Rt(t.activeColor) ? t.activeColor : Rt(t.fillColor) ? t.fillColor : void 0;
}
const me = `
  .furniture { pointer-events: none; }
  .furniture .fpart { stroke: var(--fp-wall-color, var(--primary-text-color)); stroke-width: 1; stroke-opacity: .55; vector-effect: non-scaling-stroke; }
  .furniture.selected .fpart { stroke: var(--primary-color); stroke-width: 2; stroke-opacity: 1; }
  .furniture .fpart-icon { color: var(--primary-text-color); opacity: .75; }
  .furniture .fo-icon { display: flex; align-items: center; justify-content: center; }
`, T = (t, e, i = 0) => {
  const s = parseFloat(t.getAttribute(e) ?? "");
  return Number.isFinite(s) ? s : i;
};
function as(t) {
  const e = t.getAttribute("fill") ?? /fill\s*:\s*([^;]+)/.exec(t.getAttribute("style") ?? "")?.[1]?.trim();
  return e && e !== "none" && Rt(e) ? e : void 0;
}
function ls(t, e = 100) {
  const i = new DOMParser().parseFromString(t, "image/svg+xml"), s = i.documentElement;
  if (!s || s.nodeName.toLowerCase() !== "svg" || i.querySelector("parsererror")) throw new Error("Keine gültige SVG-Datei");
  const n = (s.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), r = n.length === 4 && n.every(Number.isFinite) && n[2] > 0 && n[3] > 0 ? n : [0, 0, T(s, "width", 100) || 100, T(s, "height", 100) || 100], a = e / Math.max(r[2], r[3]), l = r[0] + r[2] / 2, c = r[1] + r[3] / 2, h = [];
  let d = 0;
  const g = (u) => {
    if (h.length >= ct) {
      d++;
      return;
    }
    h.push({ id: E("p"), ...u });
  }, f = (u) => Math.round(u * 100) / 100;
  for (const u of Array.from(s.querySelectorAll("*"))) {
    const y = u.localName.toLowerCase(), A = as(u), S = A ? { fill: A } : {};
    if (y === "rect") {
      const x = T(u, "width"), $ = T(u, "height");
      x > 0 && $ > 0 && g({ shape: "rect", x: f((T(u, "x") + x / 2 - l) * a), y: f((T(u, "y") + $ / 2 - c) * a), w: f(x * a), h: f($ * a), ...S });
    } else if (y === "circle") {
      const x = T(u, "r");
      x > 0 && g({ shape: "circle", x: f((T(u, "cx") - l) * a), y: f((T(u, "cy") - c) * a), r: f(x * a), ...S });
    } else if (y === "ellipse") {
      const x = T(u, "rx"), $ = T(u, "ry");
      if (x > 0 && $ > 0) {
        const P = T(u, "cx"), I = T(u, "cy");
        g({
          shape: "path",
          d: `M ${P - x} ${I} a ${x} ${$} 0 1 0 ${2 * x} 0 a ${x} ${$} 0 1 0 ${-2 * x} 0 Z`,
          vb: [P - x, I - $, 2 * x, 2 * $],
          x: f((P - l) * a),
          y: f((I - c) * a),
          w: f(2 * x * a),
          h: f(2 * $ * a),
          ...S
        });
      }
    } else if (y === "polygon") {
      const x = (u.getAttribute("points") ?? "").split(/[\s,]+/).map(Number).filter(Number.isFinite), $ = [];
      for (let P = 0; P + 1 < x.length; P += 2) $.push({ x: f((x[P] - l) * a), y: f((x[P + 1] - c) * a) });
      $.length >= 3 && g({ shape: "polygon", x: 0, y: 0, points: $, ...S });
    } else if (y === "path") {
      const x = (u.getAttribute("d") ?? "").trim();
      if (!ni(x)) {
        d++;
        continue;
      }
      g({ shape: "path", d: x, vb: r, x: 0, y: 0, w: f(r[2] * a), h: f(r[3] * a), ...S });
    } else ["line", "polyline", "image", "use", "text"].includes(y) && d++;
  }
  if (!h.length) throw new Error("Die SVG enthält keine unterstützten Formen (path, rect, circle, ellipse, polygon)");
  return { parts: h, skipped: d };
}
const cs = 4, hs = 10, oe = { scale: 1, txPercent: 0, tyPercent: 0 };
function ds(t, e, i, s = 0.15, n = cs, o) {
  if (!t.length) return oe;
  const r = t.map((P) => P.x), a = t.map((P) => P.y), l = Math.min(...r), c = Math.max(...r), h = Math.min(...a), d = Math.max(...a), g = Math.max(c - l, d - h) * s, f = Math.max(c - l + g * 2, 1), u = Math.max(d - h + g * 2, 1), y = Math.max(1, Math.min(n, Math.min(e / f, i / u))), A = o ?? y;
  if (!Number.isFinite(A)) return oe;
  const S = (l + c) / 2 / e, x = (h + d) / 2 / i, $ = (P) => Math.min(0, Math.max(100 * (1 - A), P));
  return {
    scale: A,
    txPercent: $(50 - A * S * 100),
    tyPercent: $(50 - A * x * 100)
  };
}
function ps(t) {
  const e = t.zoom;
  if (!(typeof e != "number" || !Number.isFinite(e)))
    return Math.max(1, Math.min(hs, e));
}
function _e(t) {
  if (!t.length) return { x: 0, y: 0 };
  const e = t.reduce((i, s) => ({ x: i.x + s.x, y: i.y + s.y }), { x: 0, y: 0 });
  return { x: e.x / t.length, y: e.y / t.length };
}
function X(t, e, i) {
  let s = !1;
  for (let n = 0, o = t.length - 1; n < t.length; o = n++) {
    const r = t[n], a = t[o];
    r.y > i != a.y > i && e < (a.x - r.x) * (i - r.y) / (a.y - r.y) + r.x && (s = !s);
  }
  return s;
}
function Oe(t) {
  let e = 0;
  for (let i = 0, s = t.length - 1; i < t.length; s = i++)
    e += (t[s].x + t[i].x) * (t[s].y - t[i].y);
  return Math.abs(e / 2);
}
function us(t, e) {
  return t.area ? e.find((s) => s.id === t.area || s.name === t.area) : e.filter((s) => X(s.points, t.x, t.y)).sort((s, n) => Oe(s.points) - Oe(n.points))[0];
}
function fs(t, e, i) {
  return t.showOnlyWhenZoomed ? e ? us(t, i)?.id !== e.id : !0 : !1;
}
function D(t, e) {
  return e > 0 ? Math.round(t / e) * e : t;
}
function M(t, e) {
  return Math.hypot(t.x - e.x, t.y - e.y);
}
function J(t, e, i) {
  const s = i.x - e.x, n = i.y - e.y, o = s * s + n * n, r = o === 0 ? 0 : Math.max(0, Math.min(1, ((t.x - e.x) * s + (t.y - e.y) * n) / o));
  return { point: { x: e.x + r * s, y: e.y + r * n }, t: r };
}
function jt(t, e, i) {
  let s;
  for (const n of e) {
    const { point: o, t: r } = J(t, { x: n.x1, y: n.y1 }, { x: n.x2, y: n.y2 }), a = M(t, o);
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
function gs(t, e, i, s = []) {
  let n, o = i;
  for (const r of e)
    if (!s.includes(r))
      for (const a of [
        { x: r.x1, y: r.y1 },
        { x: r.x2, y: r.y2 }
      ]) {
        const l = M(t, a);
        l <= o && (n = a, o = l);
      }
  return n;
}
function ms(t, e, i, s = []) {
  let n, o = i;
  for (const r of e)
    for (const a of r.points) {
      if (s.includes(a)) continue;
      const l = M(t, a);
      l <= o && (n = a, o = l);
    }
  return n && { x: n.x, y: n.y };
}
function Bt(t, e, i = 8) {
  const s = Math.abs(Math.atan2(e.y - t.y, e.x - t.x) * 180 / Math.PI);
  return s < i || s > 180 - i ? { x: e.x, y: t.y } : Math.abs(s - 90) < i ? { x: t.x, y: e.y } : e;
}
function re(t, e) {
  const { width: i, height: s } = e.canvas;
  let n = 1 / 0, o = 1 / 0, r = -1 / 0, a = -1 / 0;
  const l = (f, u, y = 0) => {
    n = Math.min(n, f - y), o = Math.min(o, u - y), r = Math.max(r, f + y), a = Math.max(a, u + y);
  }, c = Math.max(i, s), h = e.settings?.wallThickness ?? 12;
  for (const f of t.walls) {
    const u = (f.thickness ?? h) / 2;
    l(f.x1, f.y1, u), l(f.x2, f.y2, u);
  }
  for (const f of t.areas) for (const u of f.points) l(u.x, u.y);
  for (const f of t.openings) {
    const u = f.angle * Math.PI / 180, y = Math.cos(u), A = Math.sin(u), S = f.swing === "out" ? -1 : 1, x = 30, $ = S > 0 ? -x : -(f.length + x), P = S > 0 ? f.length + x : x;
    for (const I of [-f.length / 2, f.length / 2])
      for (const V of [$, P]) l(f.x + I * y - V * A, f.y + I * A + V * y);
  }
  const d = c * 0.04;
  for (const f of t.items) {
    const u = f.furnitureType ? e.furniture?.find((y) => y.id === f.furnitureType) : void 0;
    if (u) for (const y of ri(f, u)) l(y.x, y.y);
    else l(f.x, f.y, d);
  }
  if (n === 1 / 0) {
    const f = c * 0.03;
    return { x: -f, y: -f, w: i + 2 * f, h: s + 2 * f };
  }
  const g = Math.max(r - n, a - o) * 0.03;
  return { x: n - g, y: o - g, w: r - n + 2 * g, h: a - o + 2 * g };
}
function hi(t, e, i) {
  let s, n, o = i, r = i;
  for (const l of e) {
    const c = Math.abs(l.x - t.x);
    c <= o && (o = c, s = l);
    const h = Math.abs(l.y - t.y);
    h <= r && (r = h, n = l);
  }
  const a = [];
  return s && a.push({ axis: "x", value: s.x, ref: s }), n && a.push({ axis: "y", value: n.y, ref: n }), { x: s?.x, y: n?.y, guides: a };
}
function Gt(t) {
  if (t.length !== 4) return;
  const e = [...new Set(t.map((s) => s.x))], i = [...new Set(t.map((s) => s.y))];
  if (!(e.length !== 2 || i.length !== 2))
    return { x: Math.min(...e), y: Math.min(...i), w: Math.abs(e[0] - e[1]), h: Math.abs(i[0] - i[1]) };
}
function _s(t, e) {
  let i = 1 / 0;
  for (let s = 0; s < t.length; s++) {
    const n = t[s], o = t[(s + 1) % t.length];
    i = Math.min(i, M(e, J(e, n, o).point));
  }
  return i;
}
function ys(t, e, i = [], s, n = 40, o = 20) {
  if (t.length < 3) return e.map(() => ({ x: 0, y: 0 }));
  const r = _e(t), a = t.map((S) => S.x), l = t.map((S) => S.y), c = Math.min(...a), h = Math.max(...a), d = Math.min(...l), g = Math.max(...l), f = Math.max(5, Math.min(h - c, g - d) / 40), u = [];
  for (let S = d + f / 2; S < g; S += f)
    for (let x = c + f / 2; x < h; x += f) {
      const $ = { x: Math.round(x), y: Math.round(S) };
      X(t, $.x, $.y) && u.push($);
    }
  const y = [...i], A = [];
  for (const S of e) {
    let x;
    for (const P of [1, 0.6, 0.3]) {
      let I = 1 / 0;
      for (const V of u) {
        const ye = _s(t, V);
        if (ye < o * P || y.some((wi) => M(V, wi) < n * P) || s && M(V, s) < n * 1.5 * P) continue;
        const xe = S.light ? M(V, r) : ye;
        xe < I && (I = xe, x = V);
      }
      if (x) break;
    }
    const $ = x ?? r;
    y.push($), A.push({ x: $.x, y: $.y });
  }
  return A;
}
function xs(t, e, i, s = []) {
  let n, o = i;
  for (const r of e) {
    if (s.includes(r)) continue;
    const a = J(t, { x: r.x1, y: r.y1 }, { x: r.x2, y: r.y2 }), l = M(t, a.point);
    l <= o && (n = a.point, o = l);
  }
  return n && { x: Math.round(n.x * 100) / 100, y: Math.round(n.y * 100) / 100 };
}
function bs(t, e, i, s = 0.5) {
  const n = M(t, e);
  if (n < 1) return [];
  const o = [];
  for (const c of i) {
    const h = { x: c.x1, y: c.y1 }, d = { x: c.x2, y: c.y2 }, g = J(h, t, e), f = J(d, t, e);
    if (M(h, g.point) > s || M(d, f.point) > s) continue;
    const u = Math.min(g.t, f.t), y = Math.max(g.t, f.t);
    y > u && o.push([u, y]);
  }
  o.sort((c, h) => c[0] - h[0]);
  const r = [];
  let a = 0;
  const l = (c) => ({ x: t.x + (e.x - t.x) * c, y: t.y + (e.y - t.y) * c });
  for (const [c, h] of o)
    c > a && (c - a) * n > 1 && r.push([l(a), l(c)]), a = Math.max(a, h);
  return a < 1 && (1 - a) * n > 1 && r.push([l(a), l(1)]), r;
}
function xt(t, e, i, s = 0.5) {
  return M(t, J(t, e, i).point) <= s;
}
function di(t, e, i = 0.5) {
  const s = t.points;
  return e.filter((n) => {
    const o = { x: n.x1, y: n.y1 }, r = { x: n.x2, y: n.y2 };
    return s.some((a, l) => {
      const c = s[(l + 1) % s.length];
      return xt(o, a, c, i) && xt(r, a, c, i);
    });
  });
}
function Re(t, e) {
  return e.filter((i) => di(i, [t]).length > 0);
}
var $s = Object.defineProperty, vs = Object.getOwnPropertyDescriptor, O = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? vs(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (n = (s ? r(e, i, n) : r(n)) || n);
  return s && n && $s(e, i, n), n;
};
const Ie = [
  { id: "select", icon: "mdi:cursor-default", label: "Auswahl", hint: "Teile und Leuchtpunkte anklicken und ziehen. Griffe ändern die Größe. Alt hält den Fang aus." },
  { id: "rect", icon: "mdi:rectangle-outline", label: "Rechteck", hint: "Von Ecke zu Ecke ziehen." },
  { id: "circle", icon: "mdi:circle-outline", label: "Kreis", hint: "Vom Mittelpunkt zum Rand ziehen." },
  { id: "polygon", icon: "mdi:vector-polygon", label: "Polygon", hint: "Eckpunkte anklicken; Doppelklick, Enter oder Klick auf den ersten Punkt schließt die Form." },
  { id: "light", icon: "mdi:lightbulb-on-outline", label: "Leuchtpunkt", hint: "Klick setzt einen Leuchtpunkt – dort scheint das Licht, wenn dem Möbelstück ein Licht zugewiesen ist." }
], ws = [1, 2, 5, 10, 25], Te = 50, Le = 300, Ne = 7, ks = ["mdi:sofa", "mdi:bed", "mdi:desk-lamp", "mdi:floor-lamp", "mdi:television", "mdi:table-furniture", "mdi:chair-rolling", "mdi:flower"], z = (t) => Math.round(t * 100) / 100, mt = (t) => JSON.parse(JSON.stringify(t));
let C = class extends W {
  constructor() {
    super(...arguments), this._isNew = !1, this._dirty = !1, this._tool = "select", this._grid = 5, this._zoom = 1, this._poly = [], this._guides = [], this._undo = [], this._redo = [], this._onKey = (t) => {
      if (!this._editing) return;
      const e = t.composedPath()[0]?.tagName;
      if (e === "INPUT" || e === "SELECT" || e === "TEXTAREA") return;
      const i = t.ctrlKey || t.metaKey;
      t.key === "Escape" ? this._poly.length ? this._poly = [] : this._tool !== "select" ? this._tool = "select" : this._sel = void 0 : t.key === "Enter" && this._poly.length >= 3 ? this._finishPolygon() : (t.key === "Delete" || t.key === "Backspace") && this._sel ? (t.preventDefault(), this._deleteSel()) : i && t.key.toLowerCase() === "z" ? (t.preventDefault(), t.shiftKey ? this._doRedo() : this._doUndo()) : i && t.key.toLowerCase() === "y" ? (t.preventDefault(), this._doRedo()) : i && t.key.toLowerCase() === "d" && this._part && (t.preventDefault(), this._duplicatePart());
    };
  }
  willUpdate(t) {
    if (t.has("openId") && this.openId) {
      const e = H(this.plan?.furniture, this.openId);
      e && this._edit(e, !1);
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
    const t = this._svg?.getBoundingClientRect(), e = t && t.width && t.height ? Math.min(t.width, t.height) : 600;
    return Le / this._zoom / e;
  }
  // ---------------------------------------------------------------- Bibliothek
  _emit(t) {
    this.dispatchEvent(new CustomEvent("furniture-change", { detail: { furniture: t }, bubbles: !0, composed: !0 }));
  }
  _close() {
    if (this._editing) return this._leaveEdit();
    this.dispatchEvent(new CustomEvent("close-furniture", { bubbles: !0, composed: !0 }));
  }
  _new() {
    if (this._list.length >= rt) return void (this._notice = `Höchstens ${rt} Vorlagen`);
    this._edit({ id: E("m"), name: "", parts: [] }, !0);
  }
  _edit(t, e) {
    this._editing = mt(t), this._isNew = e, this._dirty = !1, this._sel = void 0, this._tool = "select", this._poly = [], this._undo = [], this._redo = [], this._notice = void 0, this._zoom = 1;
  }
  _leaveEdit() {
    this._dirty && !confirm("Änderungen an dieser Vorlage verwerfen?") || (this._editing = void 0, this.openId = void 0, this.dispatchEvent(new CustomEvent("edit-left", { bubbles: !0, composed: !0 })));
  }
  _apply() {
    const t = this._editing;
    if (!t) return;
    const e = t.name.trim();
    if (!e) return void (this._notice = "Bitte einen Namen eingeben");
    if (!t.parts.length) return void (this._notice = "Die Vorlage braucht mindestens ein Teil");
    const i = { ...t, name: e }, s = this._list.some((n) => n.id === t.id) ? this._list.map((n) => n.id === t.id ? i : n) : [...this._list, i];
    this._emit(s), this._editing = void 0, this._dirty = !1, this.openId = void 0, this.dispatchEvent(new CustomEvent("edit-left", { bubbles: !0, composed: !0 }));
  }
  _rename(t) {
    const e = prompt("Neuer Name", t.name)?.trim();
    e && this._emit(this._list.map((i) => i.id === t.id ? { ...i, name: e } : i));
  }
  _duplicate(t) {
    if (this._list.length >= rt) return void (this._notice = `Höchstens ${rt} Vorlagen`);
    const e = mt(t);
    e.id = E("m"), e.name = `${t.name} Kopie`.slice(0, 100), e.parts.forEach((i) => i.id = E("p")), this._emit([...this._list, e]);
  }
  _usage(t) {
    return this.plan.floors.reduce((e, i) => e + i.items.filter((s) => s.furnitureType === t.id).length, 0);
  }
  _delete(t) {
    const e = this._usage(t), i = e ? `„${t.name}“ löschen? ${e} platzierte${e === 1 ? "s Exemplar zeigt" : " Exemplare zeigen"} dann nur noch ein Icon.` : `„${t.name}“ löschen?`;
    confirm(i) && this._emit(this._list.filter((s) => s.id !== t.id));
  }
  async _importFile(t, e) {
    const i = t.target, s = i.files?.[0];
    if (i.value = "", !!s)
      try {
        if (s.size > 5e5) throw new Error("Die Datei ist zu groß (höchstens 500 kB)");
        const { parts: n, skipped: o } = ls(await s.text());
        if (e) {
          if (this._list.length >= rt) throw new Error(`Höchstens ${rt} Vorlagen`);
          this._edit({ id: E("m"), name: s.name.replace(/\.svg$/i, ""), parts: n }, !0), this._dirty = !0;
        } else if (this._editing) {
          if (this._editing.parts.length + n.length > ct) throw new Error(`Höchstens ${ct} Teile je Vorlage`);
          this._pushUndo(), this._editing = { ...this._editing, parts: [...this._editing.parts, ...n] }, this._sel = { kind: "part", id: n[0].id };
        }
        this._notice = o ? `${o} nicht unterstützte Elemente wurden übersprungen` : void 0;
      } catch (n) {
        this._notice = n instanceof Error ? n.message : "Import fehlgeschlagen";
      }
  }
  // ---------------------------------------------------------------- Bearbeiten
  _pushUndo() {
    this._editing && (this._undo.push(JSON.stringify(this._editing)), this._undo.length > Te && this._undo.shift(), this._redo = [], this._dirty = !0);
  }
  _doUndo() {
    const t = this._undo.pop();
    !t || !this._editing || (this._redo.push(JSON.stringify(this._editing)), this._editing = JSON.parse(t), this._fixSel(), this._dirty = !0);
  }
  _doRedo() {
    const t = this._redo.pop();
    !t || !this._editing || (this._undo.push(JSON.stringify(this._editing)), this._editing = JSON.parse(t), this._fixSel());
  }
  _fixSel() {
    const t = this._editing;
    !t || !this._sel || (this._sel.kind === "part" && !t.parts.some((e) => e.id === this._sel.id) && (this._sel = void 0), this._sel?.kind === "light" && !(t.lights ?? [])[this._sel.index] && (this._sel = void 0));
  }
  /** Ändert das Modell mit Undo-Schritt. */
  _mutate(t) {
    this._editing && (this._pushUndo(), t(this._editing), this._editing = { ...this._editing });
  }
  get _part() {
    return this._sel?.kind === "part" ? this._editing?.parts.find((t) => t.id === this._sel.id) : void 0;
  }
  _setPart(t, e) {
    const i = this._part?.id;
    i && this._mutate((s) => {
      const n = s.parts.find((o) => o.id === i);
      e === void 0 || e === "" || typeof e == "number" && Number.isNaN(e) ? delete n[t] : n[t] = e;
    });
  }
  _deleteSel() {
    const t = this._sel;
    t && (this._mutate((e) => {
      t.kind === "part" ? e.parts = e.parts.filter((i) => i.id !== t.id) : e.lights = (e.lights ?? []).filter((i, s) => s !== t.index);
    }), this._sel = void 0);
  }
  _duplicatePart() {
    const t = this._part;
    if (!t || (this._editing?.parts.length ?? 0) >= ct) return;
    const e = mt(t);
    e.id = E("p"), e.x += 10, e.y += 10, this._mutate((i) => i.parts.push(e)), this._sel = { kind: "part", id: e.id };
  }
  _order(t) {
    const e = this._part?.id;
    e && this._mutate((i) => {
      const s = i.parts.findIndex((o) => o.id === e), n = s + t;
      n < 0 || n >= i.parts.length || ([i.parts[s], i.parts[n]] = [i.parts[n], i.parts[s]]);
    });
  }
  _addPart(t) {
    if ((this._editing?.parts.length ?? 0) >= ct) return void (this._notice = `Höchstens ${ct} Teile je Vorlage`);
    const e = E("p");
    this._mutate((i) => i.parts.push({ id: e, fill: ee, ...t })), this._sel = { kind: "part", id: e };
  }
  // ---------------------------------------------------------------- Zeiger
  _toLocal(t) {
    const e = this._svg.getScreenCTM();
    if (!e) return { x: 0, y: 0 };
    const i = new DOMPoint(t.clientX, t.clientY).matrixTransform(e.inverse());
    return { x: i.x, y: i.y };
  }
  _refs(t) {
    const e = [{ x: 0, y: 0 }];
    for (const i of this._editing?.parts ?? []) {
      if (i.id === t) continue;
      const s = It(i);
      e.push({ x: s.x0, y: s.y0 }, { x: s.x1, y: s.y1 }, { x: (s.x0 + s.x1) / 2, y: (s.y0 + s.y1) / 2 });
    }
    for (const i of this._editing?.lights ?? []) e.push(i);
    return e;
  }
  _snap(t, e, i) {
    if (e.altKey)
      return this._guides = [], t;
    const s = hi(t, this._refs(i), 6 * this._upp);
    return this._guides = s.guides, { x: s.x ?? D(t.x, this._grid), y: s.y ?? D(t.y, this._grid) };
  }
  _hitOf(t) {
    for (const e of t.composedPath()) {
      if (!(e instanceof Element)) continue;
      if (e === this._svg) break;
      const i = e.getAttribute("data-handle");
      if (i) return { handle: i };
      const s = e.getAttribute("data-part");
      if (s) return { part: s };
      const n = e.getAttribute("data-light");
      if (n !== null) return { light: Number(n) };
    }
    return {};
  }
  _onPointerDown(t) {
    if (t.button !== 0 || !this._editing) return;
    const e = this._toLocal(t), i = this._hitOf(t), s = JSON.stringify(this._editing), n = { pointerId: t.pointerId, start: e, moved: !1, snapshot: s };
    if (this._tool === "select") {
      const o = this._part;
      if (i.handle && o)
        this._drag = { ...n, mode: i.handle.startsWith("v") ? "vertex" : "resize", orig: mt(o), handle: i.handle, index: Number(i.handle.slice(1)) };
      else if (i.light !== void 0)
        this._sel = { kind: "light", index: i.light }, this._drag = { ...n, mode: "light", orig: void 0, origLight: { ...(this._editing.lights ?? [])[i.light] }, index: i.light };
      else if (i.part)
        this._sel = { kind: "part", id: i.part }, this._drag = { ...n, mode: "move", orig: mt(this._editing.parts.find((r) => r.id === i.part)) };
      else {
        this._sel = void 0;
        return;
      }
      this._svg.setPointerCapture(t.pointerId);
      return;
    }
    if (this._tool === "rect" || this._tool === "circle") {
      const o = this._snap(e, t);
      this._rubber = { a: o, b: o }, this._drag = { ...n, mode: "shape", orig: void 0 }, this._svg.setPointerCapture(t.pointerId);
      return;
    }
    if (this._tool === "polygon") {
      const o = this._snap(e, t);
      if (this._poly.length >= 3 && Math.hypot(o.x - this._poly[0].x, o.y - this._poly[0].y) <= Ne * this._upp) return this._finishPolygon();
      this._poly = [...this._poly, o];
      return;
    }
    if (this._tool === "light") {
      const o = this._snap(e, t);
      if ((this._editing.lights ?? []).length >= 10) return void (this._notice = "Höchstens 10 Leuchtpunkte");
      this._mutate((r) => r.lights = [...r.lights ?? [], { x: o.x, y: o.y }]), this._sel = { kind: "light", index: (this._editing.lights ?? []).length - 1 }, this._tool = "select";
    }
  }
  _onPointerMove(t) {
    const e = this._toLocal(t);
    this._cursor = e;
    const i = this._drag;
    if (!i || i.pointerId !== t.pointerId || !this._editing) {
      (this._tool === "polygon" || this._tool === "light") && this._snap(e, t);
      return;
    }
    const s = this._editing;
    if (i.mode === "shape") {
      this._rubber = { a: this._rubber.a, b: this._snap(e, t) }, i.moved = !0;
      return;
    }
    if (!i.moved && Math.hypot(e.x - i.start.x, e.y - i.start.y) < 3 * this._upp) return;
    if (i.moved || (this._undo.push(i.snapshot), this._undo.length > Te && this._undo.shift(), this._redo = [], this._dirty = !0, i.moved = !0), i.mode === "light") {
      const o = this._snap(e, t), r = [...s.lights ?? []];
      r[i.index] = o, this._editing = { ...s, lights: r };
      return;
    }
    const n = s.parts.find((o) => o.id === i.orig.id);
    if (i.mode === "move") {
      const o = e.x - i.start.x, r = e.y - i.start.y, a = this._snap({ x: i.orig.x + o, y: i.orig.y + r }, t, n.id);
      n.x = z(a.x), n.y = z(a.y);
    } else if (i.mode === "resize") {
      const o = this._snap(e, t, n.id);
      n.shape === "circle" ? n.r = z(Math.max(1, Math.hypot(o.x - n.x, o.y - n.y))) : (n.w = z(Math.max(2, Math.abs(o.x - n.x) * 2)), n.h = z(Math.max(2, Math.abs(o.y - n.y) * 2)));
    } else if (i.mode === "vertex") {
      const o = this._snap({ x: e.x, y: e.y }, t, n.id);
      n.points = (n.points ?? []).map((r, a) => a === i.index ? { x: z(o.x - n.x), y: z(o.y - n.y) } : r);
    }
    this._editing = { ...s };
  }
  _onPointerUp(t) {
    const e = this._drag;
    if (!(!e || e.pointerId !== t.pointerId) && (this._drag = void 0, this._guides = [], e.mode === "shape" && this._rubber)) {
      const { a: i, b: s } = this._rubber;
      if (this._rubber = void 0, this._tool === "rect") {
        const n = Math.abs(s.x - i.x), o = Math.abs(s.y - i.y);
        n >= 2 && o >= 2 && this._addPart({ shape: "rect", x: z((i.x + s.x) / 2), y: z((i.y + s.y) / 2), w: z(n), h: z(o) });
      } else {
        const n = Math.hypot(s.x - i.x, s.y - i.y);
        n >= 1 && this._addPart({ shape: "circle", x: i.x, y: i.y, r: z(n) });
      }
      this._tool = "select";
    }
  }
  _finishPolygon() {
    if (this._poly.length < 3) return;
    const t = this._poly, e = z(t.reduce((s, n) => s + n.x, 0) / t.length), i = z(t.reduce((s, n) => s + n.y, 0) / t.length);
    this._poly = [], this._addPart({ shape: "polygon", x: e, y: i, points: t.map((s) => ({ x: z(s.x - e), y: z(s.y - i) })) }), this._tool = "select";
  }
  _onWheel(t) {
    t.preventDefault(), this._zoom = Math.max(0.25, Math.min(8, this._zoom * (t.deltaY < 0 ? 1.15 : 1 / 1.15)));
  }
  // ---------------------------------------------------------------- Darstellung
  render() {
    return this._editing ? this._renderEdit(this._editing) : this._renderList();
  }
  _thumb(t) {
    const e = Tt(t), i = Math.max(e.x1 - e.x0, e.y1 - e.y0) * 0.1 + 2;
    return p`<svg class="thumb" viewBox="${e.x0 - i} ${e.y0 - i} ${e.x1 - e.x0 + 2 * i} ${e.y1 - e.y0 + 2 * i}">
      <g class="furniture">${t.parts.map((s) => Lt(s))}</g>
      ${(t.lights ?? []).map((s) => _`<circle class="light-dot" cx=${s.x} cy=${s.y} r=${Math.max(e.x1 - e.x0, e.y1 - e.y0) * 0.04}></circle>`)}
    </svg>`;
  }
  _renderList() {
    return p`
      <div class="toolbar">
        <button class="icon-btn" title="Zurück zum Grundriss" @click=${this._close}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <div class="main-title">Möbel-Bibliothek</div>
        <label class="chip-btn" title="SVG als neue Vorlage importieren">
          <ha-icon icon="mdi:file-import-outline"></ha-icon>SVG importieren
          <input type="file" accept=".svg,image/svg+xml" hidden @change=${(t) => this._importFile(t, !0)} />
        </label>
        <button class="save" @click=${this._new}>Neue Vorlage</button>
      </div>
      ${this._noticeBar()}
      <div class="list">
        ${this._list.length ? this._list.map((t) => {
      const e = this._usage(t);
      return p`<div class="card">
                ${this._thumb(t)}
                <div class="card-name">${t.name}</div>
                <div class="muted">${t.parts.length} Teile${t.lights?.length ? ` · ${t.lights.length} Leuchtpunkt${t.lights.length > 1 ? "e" : ""}` : ""} · ${e}× platziert</div>
                <div class="card-actions">
                  <button class="icon-btn" title="Bearbeiten" @click=${() => this._edit(t, !1)}><ha-icon icon="mdi:pencil-outline"></ha-icon></button>
                  <button class="icon-btn" title="Umbenennen" @click=${() => this._rename(t)}><ha-icon icon="mdi:rename-outline"></ha-icon></button>
                  <button class="icon-btn" title="Duplizieren" @click=${() => this._duplicate(t)}><ha-icon icon="mdi:content-duplicate"></ha-icon></button>
                  <button class="icon-btn" title="Löschen" @click=${() => this._delete(t)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
                </div>
              </div>`;
    }) : p`<div class="empty">
              <ha-icon icon="mdi:sofa-outline"></ha-icon>
              <p>Die Bibliothek ist leer. Baue eigene Möbelstücke aus Rechtecken, Kreisen und Polygonen oder importiere eine einfache SVG-Draufsicht.</p>
            </div>`}
      </div>
    `;
  }
  _noticeBar() {
    return this._notice ? p`<div class="notice">${this._notice}<button @click=${() => this._notice = void 0}>OK</button></div>` : m;
  }
  _renderEdit(t) {
    const e = Ie.find((s) => s.id === this._tool), i = Le / this._zoom / 2;
    return p`
      <div class="toolbar">
        <button class="icon-btn" title="Zur Bibliothek" @click=${this._leaveEdit}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <div class="main-title">${this._isNew ? "Neue Vorlage" : "Vorlage bearbeiten"}${this._dirty ? p`<span class="dirty"> • ungespeichert</span>` : m}</div>
        <button class="icon-btn" title="Rückgängig (Strg+Z)" ?disabled=${!this._undo.length} @click=${this._doUndo}><ha-icon icon="mdi:undo"></ha-icon></button>
        <button class="icon-btn" title="Wiederholen (Strg+Y)" ?disabled=${!this._redo.length} @click=${this._doRedo}><ha-icon icon="mdi:redo"></ha-icon></button>
        <button class="save" @click=${this._apply}>Übernehmen</button>
      </div>
      ${this._noticeBar()}
      <div class="body">
        <div class="tools">
          ${Ie.map(
      (s) => p`<button class="tool ${s.id === this._tool ? "active" : ""}" title=${s.label} @click=${() => (this._tool = s.id, this._poly = [])}>
              <ha-icon .icon=${s.icon}></ha-icon><span>${s.label}</span>
            </button>`
    )}
          <div class="sep"></div>
          <label class="tool" title="SVG-Formen zu dieser Vorlage hinzufügen">
            <ha-icon icon="mdi:file-import-outline"></ha-icon><span>SVG</span>
            <input type="file" accept=".svg,image/svg+xml" hidden @change=${(s) => this._importFile(s, !1)} />
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
            ${this._renderCanvas(t, i)}
          </svg>
          <div class="hint">${e.hint}</div>
        </div>
        <div class="props">${this._renderProps(t)}</div>
      </div>
    `;
  }
  _renderCanvas(t, e) {
    const i = this._upp, s = this._grid, n = s * 1, o = s * 10, r = this._sel, a = this._part;
    return _`
      <defs>
        <pattern id="fg-minor" width=${n} height=${n} patternUnits="userSpaceOnUse">
          <path d="M ${n} 0 L 0 0 0 ${n}" class="grid-minor"></path>
        </pattern>
        <pattern id="fg-major" width=${o} height=${o} patternUnits="userSpaceOnUse">
          ${n / i >= 4 ? _`<rect width=${o} height=${o} fill="url(#fg-minor)"></rect>` : m}
          <path d="M ${o} 0 L 0 0 0 ${o}" class="grid-major"></path>
        </pattern>
      </defs>
      <rect class="sheet" x=${-e} y=${-e} width=${2 * e} height=${2 * e}></rect>
      <rect x=${-e} y=${-e} width=${2 * e} height=${2 * e} fill="url(#fg-major)" pointer-events="none"></rect>
      <line class="axis" x1=${-e} x2=${e} y1="0" y2="0" stroke-width=${i}></line>
      <line class="axis" y1=${-e} y2=${e} x1="0" x2="0" stroke-width=${i}></line>
      <g class="furniture editing">
        ${t.parts.map(
      (l) => _`<g data-part=${l.id} class="part ${r?.kind === "part" && r.id === l.id ? "selected" : ""}">${Lt(l, { cls: "hit" })}</g>`
    )}
      </g>
      ${(t.lights ?? []).map(
      (l, c) => _`<g data-light=${c} class="light-mark ${r?.kind === "light" && r.index === c ? "selected" : ""}">
          <circle cx=${l.x} cy=${l.y} r=${9 * i} class="light-hit"></circle>
          <circle cx=${l.x} cy=${l.y} r=${4 * i} class="light-dot"></circle>
          <circle cx=${l.x} cy=${l.y} r=${8 * i} class="light-ring" stroke-width=${i * 1.5}></circle>
        </g>`
    )}
      ${a ? this._renderHandles(a, i) : m}
      ${this._renderPreview(i)}
      ${this._guides.map(
      (l) => l.axis === "x" ? _`<line class="guide" x1=${l.value} x2=${l.value} y1=${-e} y2=${e} stroke-width=${i}></line>` : _`<line class="guide" y1=${l.value} y2=${l.value} x1=${-e} x2=${e} stroke-width=${i}></line>`
    )}
    `;
  }
  _renderHandles(t, e) {
    const i = Ne * e;
    if (t.shape === "polygon")
      return _`${(t.points ?? []).map((r, a) => _`<circle class="handle" data-handle="v${a}" cx=${t.x + r.x} cy=${t.y + r.y} r=${i} stroke-width=${2 * e}></circle>`)}`;
    const s = It(t), n = t.shape === "circle" ? t.x + (t.r ?? 0) : s.x1, o = t.shape === "circle" ? t.y : s.y1;
    return _`<rect class="sel-box" x=${s.x0} y=${s.y0} width=${s.x1 - s.x0} height=${s.y1 - s.y0} stroke-width=${e * 1.5}></rect>
      <circle class="handle" data-handle="s0" cx=${n} cy=${o} r=${i} stroke-width=${2 * e}></circle>`;
  }
  _renderPreview(t) {
    if (this._rubber) {
      const { a: e, b: i } = this._rubber;
      return this._tool === "rect" ? _`<rect class="preview" x=${Math.min(e.x, i.x)} y=${Math.min(e.y, i.y)} width=${Math.abs(i.x - e.x)} height=${Math.abs(i.y - e.y)} stroke-width=${2 * t}></rect>` : _`<circle class="preview" cx=${e.x} cy=${e.y} r=${Math.hypot(i.x - e.x, i.y - e.y)} stroke-width=${2 * t}></circle>`;
    }
    if (this._tool === "polygon" && this._poly.length) {
      const e = this._cursor ? this._snap(this._cursor, { altKey: !1 }) : void 0, i = [...this._poly, ...e ? [e] : []];
      return _`<polyline class="preview" points=${i.map((s) => `${s.x},${s.y}`).join(" ")} stroke-width=${2 * t}></polyline>
        ${this._poly.map((s, n) => _`<circle class="handle ${n === 0 ? "first" : ""}" cx=${s.x} cy=${s.y} r=${(n === 0 ? 6 : 4) * t}></circle>`)}`;
    }
    return m;
  }
  _num(t, e, i, s = 1) {
    return p`<label class="field"><span>${t}</span>
      <input type="number" step="1" min=${s} .value=${i === void 0 ? "" : String(z(i))}
        @change=${(n) => this._setPartNum(e, n.target.value, s)} /></label>`;
  }
  _setPartNum(t, e, i) {
    if (e === "") return;
    const s = Number(e);
    Number.isFinite(s) && this._setPart(t, t === "x" || t === "y" ? s : Math.max(i, s));
  }
  _renderProps(t) {
    const e = this._part, i = this._sel, s = Tt(t);
    return p`
      <h3>Vorlage</h3>
      <label class="field"><span>Name</span>
        <input type="text" maxlength="100" .value=${t.name} placeholder="z. B. Stehlampe"
          @input=${(n) => {
      this._editing = { ...t, name: n.target.value }, this._dirty = !0;
    }} /></label>
      <label class="field"><span>Raster (cm)</span>
        <select @change=${(n) => this._grid = Number(n.target.value)}>
          ${ws.map((n) => p`<option value=${n} ?selected=${n === this._grid}>${n}</option>`)}
        </select></label>
      <p class="muted">${t.parts.length} Teile · ${z(s.x1 - s.x0)} × ${z(s.y1 - s.y0)} cm · ${(t.lights ?? []).length} Leuchtpunkt${(t.lights ?? []).length === 1 ? "" : "e"}</p>
      ${i?.kind === "light" ? p`<h3>Leuchtpunkt</h3>
            <p class="muted">Ziehen verschiebt den Punkt. Hier scheint das Licht eines platzierten Exemplars.</p>
            <div class="row-btns"><button class="chip" @click=${this._deleteSel}><ha-icon icon="mdi:delete-outline"></ha-icon>Löschen</button></div>` : e ? p`
            <h3>${{ rect: "Rechteck", circle: "Kreis", polygon: "Polygon", path: "SVG-Form" }[e.shape]}</h3>
            <div class="row-btns">
              <button class="icon-btn" title="Nach vorn" @click=${() => this._order(1)}><ha-icon icon="mdi:arrange-bring-forward"></ha-icon></button>
              <button class="icon-btn" title="Nach hinten" @click=${() => this._order(-1)}><ha-icon icon="mdi:arrange-send-backward"></ha-icon></button>
              <button class="icon-btn" title="Duplizieren (Strg+D)" @click=${this._duplicatePart}><ha-icon icon="mdi:content-duplicate"></ha-icon></button>
              <button class="icon-btn" title="Löschen (Entf)" @click=${this._deleteSel}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
            </div>
            <div class="grid2">${this._num("Mitte x", "x", e.x, -1e5)} ${this._num("Mitte y", "y", e.y, -1e5)}</div>
            ${e.shape === "rect" || e.shape === "path" ? p`<div class="grid2">${this._num("Breite", "w", e.w)} ${this._num("Höhe", "h", e.h)}</div>` : m}
            ${e.shape === "circle" ? this._num("Radius", "r", e.r) : m}
            <label class="field color"><span>Farbe</span>
              <input type="color" .value=${e.fill?.startsWith("#") && e.fill.length === 7 ? e.fill : ee}
                @change=${(n) => this._setPart("fill", n.target.value)} /></label>
            <label class="field"><span>Deckkraft ${Math.round((e.opacity ?? 1) * 100)} %</span>
              <input type="range" min="0.05" max="1" step="0.05" .value=${String(e.opacity ?? 1)}
                @change=${(n) => this._setPart("opacity", Number(n.target.value))} /></label>
            <div class="field"><span>Icon als Symbol (optional)</span>
              <div class="icon-input"><ha-icon .icon=${e.icon ?? "mdi:help-circle-outline"}></ha-icon>
                <input type="text" .value=${e.icon ?? ""} placeholder="mdi:…" @change=${(n) => this._setPart("icon", n.target.value.trim())} /></div>
              <div class="icon-grid">${ks.map((n) => p`<button class="icon-pick ${e.icon === n ? "active" : ""}" title=${n} @click=${() => this._setPart("icon", n)}><ha-icon .icon=${n}></ha-icon></button>`)}</div>
            </div>` : p`<p class="muted">Teil oder Leuchtpunkt anklicken, oder links ein Werkzeug wählen und zeichnen. Mehrere Teile ergeben zusammen ein Möbelstück; der Mittelpunkt (0/0) ist der Ankerpunkt beim Platzieren und Drehen.</p>`}
    `;
  }
};
C.styles = [
  dt(me),
  Y`
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
O([
  w({ attribute: !1 })
], C.prototype, "plan", 2);
O([
  w({ attribute: !1 })
], C.prototype, "hass", 2);
O([
  w()
], C.prototype, "openId", 2);
O([
  b()
], C.prototype, "_editing", 2);
O([
  b()
], C.prototype, "_isNew", 2);
O([
  b()
], C.prototype, "_dirty", 2);
O([
  b()
], C.prototype, "_sel", 2);
O([
  b()
], C.prototype, "_tool", 2);
O([
  b()
], C.prototype, "_grid", 2);
O([
  b()
], C.prototype, "_zoom", 2);
O([
  b()
], C.prototype, "_poly", 2);
O([
  b()
], C.prototype, "_cursor", 2);
O([
  b()
], C.prototype, "_rubber", 2);
O([
  b()
], C.prototype, "_guides", 2);
O([
  b()
], C.prototype, "_notice", 2);
O([
  ge("svg.canvas")
], C.prototype, "_svg", 2);
C = O([
  nt("fp-furniture-editor")
], C);
const De = 0.18, Ue = 0.6, We = 0.5;
function Ss(t, e) {
  if (!e || e.state !== "on") return;
  const i = e.attributes ?? {}, s = i.brightness, n = typeof s == "number" && Number.isFinite(s) ? Math.max(0, Math.min(255, s)) / 255 : void 0, o = n === void 0 ? Ue : De + (Ue - De) * n, a = (typeof t.glowRadius == "number" && t.glowRadius > 0 ? t.glowRadius : ie) * (n === void 0 ? 1 : We + (1 - We) * n), l = i.rgb_color;
  if (Array.isArray(l) && l.length >= 3 && l.slice(0, 3).every((c) => typeof c == "number" && Number.isFinite(c))) {
    const c = (h) => Math.max(0, Math.min(255, Math.round(h)));
    return { color: `rgb(${c(l[0])}, ${c(l[1])}, ${c(l[2])})`, opacity: o, radius: a };
  }
  return { color: t.glowColor || si, opacity: o, radius: a };
}
function pi(t, e, i) {
  const s = i.x2 - i.x1, n = i.y2 - i.y1, o = s * s + n * n, r = o === 0 ? 0 : Math.max(0, Math.min(1, ((t - i.x1) * s + (e - i.y1) * n) / o));
  return Math.hypot(t - (i.x1 + r * s), e - (i.y1 + r * n));
}
function Ms(t, e, i, s, n) {
  const o = n.x2 - n.x1, r = n.y2 - n.y1, a = i * r - s * o;
  if (Math.abs(a) < 1e-12) return;
  const l = n.x1 - t, c = n.y1 - e, h = (l * r - c * o) / a, d = (l * s - c * i) / a;
  if (!(h <= 1e-9 || d < 0 || d > 1))
    return h;
}
function As(t, e, i, s, n) {
  const o = t.x2 - t.x1, r = t.y2 - t.y1, a = [-o, o, -r, r], l = [t.x1 - e, s - t.x1, t.y1 - i, n - t.y1];
  let c = 0, h = 1;
  for (let d = 0; d < 4; d++) {
    if (a[d] === 0) {
      if (l[d] < 0) return;
      continue;
    }
    const g = l[d] / a[d];
    if (a[d] < 0) {
      if (g > h) return;
      g > c && (c = g);
    } else {
      if (g < c) return;
      g < h && (h = g);
    }
  }
  return { ...t, x1: t.x1 + c * o, y1: t.y1 + c * r, x2: t.x1 + h * o, y2: t.y1 + h * r };
}
function ui(t, e, i, s, n = () => 12) {
  const o = s.filter((g) => {
    const f = pi(t, e, g);
    return f < i && f > n(g) / 2 + 1;
  });
  if (!o.length) return;
  const r = i * 1.01, a = [
    { id: "b1", x1: t - r, y1: e - r, x2: t + r, y2: e - r },
    { id: "b2", x1: t + r, y1: e - r, x2: t + r, y2: e + r },
    { id: "b3", x1: t + r, y1: e + r, x2: t - r, y2: e + r },
    { id: "b4", x1: t - r, y1: e + r, x2: t - r, y2: e - r }
  ], l = o.map((g) => As(g, t - r, e - r, t + r, e + r)).filter((g) => !!g);
  if (!l.length) return;
  const c = [...l, ...a], h = [];
  for (const g of c)
    for (const [f, u] of [
      [g.x1, g.y1],
      [g.x2, g.y2]
    ]) {
      const y = Math.atan2(u - e, f - t);
      for (const A of [y - 1e-4, y, y + 1e-4]) {
        const S = Math.cos(A), x = Math.sin(A);
        let $ = 1 / 0;
        for (const P of c) {
          const I = Ms(t, e, S, x, P);
          I !== void 0 && I < $ && ($ = I);
        }
        $ < 1 / 0 && h.push({ x: t + S * $, y: e + x * $, a: A });
      }
    }
  h.sort((g, f) => g.a - f.a);
  const d = (g) => Math.round(g * 100) / 100;
  return h.map(({ x: g, y: f }) => ({ x: d(g), y: d(f) }));
}
function fi(t, e) {
  return t.type !== "door" ? !1 : t.entity ? it(e?.states[t.entity]) : !0;
}
function gi(t, e, i, s = () => 12) {
  const n = e.filter(i);
  if (!n.length) return t;
  const o = [];
  for (const r of t) {
    const a = r.x2 - r.x1, l = r.y2 - r.y1, c = a * a + l * l;
    if (c === 0) {
      o.push(r);
      continue;
    }
    const h = Math.sqrt(c), d = [];
    for (const u of n) {
      if (pi(u.x, u.y, r) > s(r) / 2 + 1) continue;
      const y = ((u.x - r.x1) * a + (u.y - r.y1) * l) / c, A = u.length / 2 / h, S = Math.max(0, y - A), x = Math.min(1, y + A);
      x > S && d.push([S, x]);
    }
    if (!d.length) {
      o.push(r);
      continue;
    }
    d.sort((u, y) => u[0] - y[0]);
    let g = 0;
    const f = (u, y) => {
      y - u > 1e-6 && o.push({ ...r, x1: r.x1 + a * u, y1: r.y1 + l * u, x2: r.x1 + a * y, y2: r.y1 + l * y });
    };
    for (const [u, y] of d)
      f(g, u), g = Math.max(g, y);
    f(g, 1);
  }
  return o;
}
function Ps(t) {
  if (!t || t.state === "unavailable" || t.state === "unknown") return;
  const e = t.attributes?.current_position;
  if (typeof e == "number" && Number.isFinite(e)) return 1 - Math.max(0, Math.min(100, e)) / 100;
  if (t.state === "closed") return 1;
  if (t.state === "open") return 0;
  if (t.state === "opening" || t.state === "closing") return 0.5;
}
function Es(t, e, i, s) {
  const n = t.items.filter((a) => a.entity && Pt(a, e.furniture)).flatMap((a) => {
    const l = Ss(a, i.states[a.entity]);
    return l ? ai(a, e.furniture).map((c) => ({ it: { ...a, x: c.x, y: c.y }, paint: l })) : [];
  });
  if (!n.length) return m;
  const o = (a) => a.thickness ?? e.settings.wallThickness, r = gi(t.walls, t.openings, (a) => fi(a, i), o);
  return _`<g class="fp-glows">
    ${n.map(({ it: a, paint: l }, c) => {
    const h = `${s}-${c}`, d = ui(a.x, a.y, l.radius, r, o);
    return _`
        ${d ? _`<clipPath id="${h}-clip"><polygon points=${d.map((g) => `${g.x},${g.y}`).join(" ")}></polygon></clipPath>` : m}
        <radialGradient id=${h} gradientUnits="userSpaceOnUse" cx=${a.x} cy=${a.y} r=${l.radius}>
          <stop offset="0" stop-color=${l.color} stop-opacity=${l.opacity}></stop>
          <stop offset="1" stop-color=${l.color} stop-opacity="0"></stop>
        </radialGradient>
        <circle class="fp-glow" cx=${a.x} cy=${a.y} r=${l.radius} fill="url(#${h})"
                clip-path=${d ? `url(#${h}-clip)` : m}></circle>`;
  })}
  </g>`;
}
const Fe = 10;
function ae(t) {
  return t.leaves?.length ? t.leaves : [{ w: 1 }];
}
function le(t) {
  const e = ae(t), i = e.reduce((n, o) => n + Math.max(o.w, 1e-4), 0);
  let s = -t.length / 2;
  return e.map((n, o) => {
    const r = Math.max(n.w, 1e-4) / i * t.length, a = {
      index: o,
      x0: s,
      x1: s + r,
      hinge: n.hinge ?? zs(t, o, e.length),
      entity: n.entity || t.entity || void 0
    };
    return s += r, a;
  });
}
function zs(t, e, i) {
  return i === 1 ? t.hinge ?? "left" : e === i - 1 ? "right" : "left";
}
function mi(t, e) {
  if (!t || !e) return { open: !1, unknown: !1 };
  const i = e.states[t], s = !i || i.state === "unavailable" || i.state === "unknown";
  return { open: !s && it(i), unknown: s };
}
function Cs(t, e) {
  return mi(t.entity, e);
}
function Os(t) {
  return !t || t.state === "unavailable" || t.state === "unknown" ? "unknown" : t.state === "locked" ? "locked" : "unlocked";
}
function Ht(t) {
  return t.type === "window" && !t.entity && !t.leaves?.some((e) => e.entity);
}
function Rs(t, e) {
  const i = Math.max(1, Math.min(te, Math.round(e))), s = t.length ? t.map((o) => ({ ...o })) : [{ w: 1 }];
  if (i <= s.length) return s.slice(0, i);
  const n = s.reduce((o, r) => o + r.w, 0) / s.length;
  for (; s.length < i; ) s.push({ w: n });
  return s;
}
function Is(t, e, i, s) {
  if (t.length === 1) return t.map((h) => ({ ...h }));
  const n = t.length - 1, o = Math.max(Fe, Math.min(s - Fe * n, i)), r = t.reduce((h, d, g) => g === e ? h : h + d.w, 0), a = s - o, l = t.reduce((h, d) => h + d.w, 0), c = s / l;
  return t.map((h, d) => {
    if (d === e) return { ...h, w: o / c };
    const g = r > 0 ? h.w / r : 1 / n;
    return { ...h, w: a * g / c };
  });
}
const Ts = 0.12;
function Nt(t, e) {
  return t.thickness ?? e.settings.wallThickness;
}
function ht(t, e) {
  return t.walls.reduce((i, s) => Math.max(i, Nt(s, e)), e.settings.wallThickness);
}
function Ls(t, e) {
  const i = t.color ?? "var(--primary-color)", s = t.opacity ?? Ts;
  return e && t.entity && it(e.states[t.entity]) ? { color: t.activeColor ?? "#ffc107", opacity: Math.min(1, s + 0.2) } : { color: i, opacity: s };
}
function _i(t, e) {
  const { color: i, opacity: s } = Ls(t, e.hass), n = t.points.map((c) => `${c.x},${c.y}`).join(" "), o = Math.min(...t.points.map((c) => c.x)), r = Math.min(...t.points.map((c) => c.y));
  let a = { x: o + e.labelSize * 0.8, y: r + e.labelSize * 1.5 };
  X(t.points, a.x, a.y) || (a = _e(t.points));
  const l = X(t.points, o + e.labelSize * 0.8, r + e.labelSize * 1.5) ? "start" : "middle";
  return _`
    <g class="area ${e.selected ? "selected" : ""} ${e.dimmed ? "dimmed" : ""}" data-id=${t.id}>
      <polygon points=${n} fill=${i} fill-opacity=${s}
        style=${t.type === "balcony" ? `stroke:${i};stroke-width:3;stroke-dasharray:10 6;stroke-linejoin:round` : m}></polygon>
      ${t.showName !== !1 && t.name ? _`<text class="area-label" x=${a.x} y=${a.y} font-size=${e.labelSize}
                  text-anchor=${l} dominant-baseline="middle">${t.name}</text>` : m}
    </g>`;
}
function yi(t, e, i, s = {}) {
  const { width: n, height: o } = e.canvas, r = Math.max(n, o), a = ht(t, e) + 2;
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
                         stroke-width=${Nt(l, e)}></line>`
  )}
    </g>`;
}
function je(t, e, i, s) {
  const n = e * s < 0 ? 0 : 1;
  return _`
    <path class="swing" d="M ${t} ${s * i} A ${i} ${i} 0 0 ${n} ${t - e * i} 0"></path>
    <line class="leaf" x1=${t} y1="0" x2=${t} y2=${s * i}></line>`;
}
function Ns(t, e, i, s) {
  const n = e, o = s?.states[t.entity], r = Ps(o), a = o?.state === "opening" || o?.state === "closing", l = t.side === "in" ? 1 : -1, c = Math.max(i * 0.8, 8), h = l * i / 2, d = l > 0 ? h : h - c, g = (r ?? 0) * c, f = l > 0 ? h : h - g, u = [];
  for (let y = 3; y < g; y += 3) u.push(h + l * y);
  return _`
    <g class="shutter ${t.side} ${a ? "moving" : ""} ${r === void 0 ? "unknown" : ""}" style="--fp-shutter:${t.color || ii}">
      <rect class="shutter-track" x=${-n / 2} y=${d} width=${n} height=${c}></rect>
      ${g > 0 ? _`<rect class="shutter-fill" x=${-n / 2} y=${f} width=${n} height=${g}></rect>` : m}
      ${u.map((y) => _`<line class="shutter-slat" x1=${-n / 2} y1=${y} x2=${n / 2} y2=${y}></line>`)}
    </g>`;
}
function Ds(t, e) {
  if (!t.lockEntity) return m;
  const i = Os(e?.states[t.lockEntity]), n = -(t.hinge === "right" ? 1 : -1) * (t.length / 2 - 9);
  return _`
    <g class="lock ${i}" transform="translate(${n} 0)">
      <circle r="6.5"></circle>
      <path class="shackle" d=${i === "locked" ? "M -2.4 -1 V -3 a 2.4 2.4 0 0 1 4.8 0 V -1" : "M -2.4 -1 V -3 a 2.4 2.4 0 0 1 4.8 0 V -2.4"}></path>
      <rect x="-3.4" y="-1" width="6.8" height="5" rx="1"></rect>
    </g>`;
}
function xi(t, e, i = {}) {
  const s = t.length, n = `--fp-open:${t.openColor || ei}`, o = t.hinge === "right" ? 1 : -1, r = t.swing === "out" ? -1 : 1;
  if (t.type === "window") {
    const h = e - 2, d = le(t).map((u) => {
      const y = mi(u.entity, i.hass);
      return { seg: u, open: !!i.forceOpen || y.open, unknown: y.unknown };
    }), g = Math.max(...d.filter((u) => u.open).map((u) => u.seg.x1 - u.seg.x0), 0), f = `opening window ${i.selected ? "selected" : ""} ${i.warn ? "warn" : ""}`;
    return _`
      <g class=${f} data-id=${t.id} transform="translate(${t.x} ${t.y}) rotate(${t.angle})" style=${n}>
        <rect class="hit" x=${-s / 2} y=${r < 0 ? -g : -h / 2} width=${s} height=${g + h}></rect>
        ${(t.shutters ?? []).map((u) => Ns(u, s, e, i.hass))}
        ${d.map(({ seg: u, open: y, unknown: A }) => {
      const S = u.x1 - u.x0, x = u.hinge === "right" ? u.x1 : u.x0, $ = u.hinge === "right" ? 1 : -1;
      return _`
            <g class="seg ${y ? "open" : ""} ${A ? "unknown" : ""} ${i.leafIndex === u.index ? "sel" : ""}">
              <rect class="frame" x=${u.x0} y=${-h / 2} width=${S} height=${h}></rect>
              ${y ? je(x, $, S, r) : _`<line class="glass" x1=${u.x0} y1=${-h / 6} x2=${u.x1} y2=${-h / 6}></line>
                      <line class="glass" x1=${u.x0} y1=${h / 6} x2=${u.x1} y2=${h / 6}></line>`}
            </g>`;
    })}
      </g>`;
  }
  const a = Cs(t, i.hass), l = !!i.forceOpen || !t.entity || a.open, c = `opening door ${l ? "open" : ""} ${a.unknown ? "unknown" : ""} ${i.selected ? "selected" : ""}`;
  return _`
    <g class=${c} data-id=${t.id} transform="translate(${t.x} ${t.y}) rotate(${t.angle})" style=${n}>
      <rect class="hit" x=${-s / 2} y=${r > 0 ? -e / 2 : -s} width=${s} height=${s + e / 2}></rect>
      ${l ? je(o * s / 2, o, s, r) : _`<rect class="frame" x=${-s / 2} y=${-(e - 2) / 2} width=${s} height=${e - 2}></rect>
              <line class="leaf closed" x1=${-s / 2} y1="0" x2=${s / 2} y2="0"></line>`}
      ${Ds(t, i.hass)}
    </g>`;
}
function Us(t, e, i = {}) {
  const s = ht(t, e) + 2;
  return _`<g class="openings">${t.openings.map(
    (n) => xi(n, s, { hass: i.hass, selected: i.selectedId === n.id })
  )}</g>`;
}
const bi = `
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
var Ws = Object.defineProperty, Fs = Object.getOwnPropertyDescriptor, k = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Fs(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (n = (s ? r(e, i, n) : r(n)) || n);
  return s && n && Ws(e, i, n), n;
};
const St = "floorplan_panel", js = 100, Kt = [1, 5, 10, 25, 50], G = 12, Vt = 14, Be = 7, q = { wall: "walls", opening: "openings", area: "areas", item: "items" };
let _t, Mt = 0;
const Ge = [
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
], Bs = [
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
], at = ["#4f8bd6", "#e0a030", "#3fb5a8", "#8e6cc9", "#d65f5f", "#6aa84f", "#9e9e9e"];
let v = class extends W {
  constructor() {
    super(...arguments), this.revision = 0, this.narrow = !1, this._tool = "select", this._furnMode = !1, this._multi = [], this._guides = [], this._lastGuides = [], this._view = { x: 0, y: 0, w: 1e3, h: 700 }, this._roomPoints = [], this._dirty = !1, this._saving = !1, this._conflict = !1, this._svgSize = { w: 1, h: 1 }, this._undo = [], this._redo = [], this._baseRevision = 0, this._keyHandler = (t) => this._onKey(t);
  }
  // ---------------------------------------------------------------- Lebenszyklus
  willUpdate(t) {
    t.has("_sel") && this._multi.length && !this._multi.some((e) => e.kind === this._sel?.kind && e.id === this._sel?.id) && (this._multi = []), t.has("plan") && !this._draft && (this._draft = se(structuredClone(this.plan)), this._baseRevision = this.revision, this._floorId = this.floorId && this._draft.floors.some((e) => e.id === this.floorId) ? this.floorId : this._draft.floors[0]?.id, this._floorId || (this._draft.floors.push({ id: "eg", name: "Wohnung", walls: [], openings: [], areas: [], items: [] }), this._floorId = "eg"), this._fitView(), this.initialAreaId && this._floor.areas.some((e) => e.id === this.initialAreaId) && (this._sel = { kind: "area", id: this.initialAreaId }));
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
    const t = re(this._floor, this._draft), e = Math.max(t.w, t.h) * 0.1;
    this._view = { x: t.x - e, y: t.y - e, w: t.w + 2 * e, h: t.h + 2 * e };
  }
  // ---------------------------------------------------------------- Änderungen & Undo
  _snapshot() {
    return JSON.stringify({ plan: this._draft, floorId: this._floorId });
  }
  _pushUndo(t) {
    this._undo.push(t), this._undo.length > js && this._undo.shift(), this._redo = [], this._dirty = !0;
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
      (t) => t.openings.filter(Ht).map((e) => ({ floorId: t.id, opening: e }))
    );
  }
  _selectOpening(t, e) {
    this._floorId = t, this._sel = { kind: "opening", id: e }, this._tool = "select";
  }
  _deleteSelected() {
    const t = this._group;
    t.length && (this._mutate((e) => {
      for (const i of Object.keys(q)) {
        const s = new Set(t.filter((n) => n.kind === i).map((n) => n.id));
        s.size && (e[q[i]] = e[q[i]].filter((n) => !s.has(n.id)));
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
      const r = t.kind === "opening" ? e.length / 2 : Vt * this._upp;
      i = [e.x - r, e.x + r], s = [e.y - r, e.y + r];
    }
    const n = Math.min(...i), o = Math.min(...s);
    return { x: n, y: o, w: Math.max(...i) - n, h: Math.max(...s) - o };
  }
  _selectInRect(t, e, i) {
    const s = Math.min(t.x, e.x), n = Math.max(t.x, e.x), o = Math.min(t.y, e.y), r = Math.max(t.y, e.y), a = i ? [...this._group] : [];
    for (const l of Object.keys(q))
      for (const c of this._collection(l)) {
        const h = this._bbox({ kind: l, id: c.id });
        !h || h.x > n || h.x + h.w < s || h.y > r || h.y + h.h < o || a.some((d) => d.kind === l && d.id === c.id) || a.push({ kind: l, id: c.id });
      }
    this._setGroup(a);
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
      i && t[q[e.kind]].push(structuredClone(i));
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
      for (const a of t.walls) {
        const l = structuredClone(a);
        Object.assign(l, { id: E("w"), x1: a.x1 + e, y1: a.y1 + i, x2: a.x2 + e, y2: a.y2 + i }), r.walls.push(l), n.push({ kind: "wall", id: l.id });
      }
      for (const a of t.openings) {
        const l = structuredClone(a);
        Object.assign(l, { id: E(a.type === "door" ? "t" : "f"), x: a.x + e, y: a.y + i }), r.openings.push(l), n.push({ kind: "opening", id: l.id });
      }
      for (const a of t.areas) {
        const l = structuredClone(a);
        l.id = E("r"), l.points = a.points.map((c) => ({ x: c.x + e, y: c.y + i })), s && l.name && (l.name = `${l.name} (Kopie)`), o.set(a.id, l.id), r.areas.push(l), n.push({ kind: "area", id: l.id });
      }
      for (const a of t.items) {
        const l = structuredClone(a);
        Object.assign(l, { id: E("i"), x: a.x + e, y: a.y + i }), l.area && o.has(l.area) && (l.area = o.get(l.area)), r.items.push(l), n.push({ kind: "item", id: l.id });
      }
    }), n;
  }
  _duplicate() {
    const t = this._groupClip();
    this._clipBounds(t) && (this._setGroup(this._insertClip(t, this._gap, this._gap, !0)), this._menu = void 0);
  }
  _copy() {
    const t = this._groupClip();
    this._clipBounds(t) && (_t = t, Mt = 0, this._menu = void 0);
  }
  _paste() {
    _t && (Mt++, this._setGroup(this._insertClip(_t, this._gap * Mt, this._gap * Mt, !0)), this._menu = void 0);
  }
  _saveTemplate() {
    const t = this._groupClip();
    if (!this._clipBounds(t)) return;
    if ((this._draft.settings.templates?.length ?? 0) >= Ce) {
      this._error = `Es sind höchstens ${Ce} Vorlagen möglich.`;
      return;
    }
    const e = prompt("Name der Vorlage", "Vorlage " + ((this._draft.settings.templates?.length ?? 0) + 1))?.trim();
    e && this._mutate((i, s) => {
      (s.settings.templates ??= []).push({ id: E("v"), name: e, ...t });
    });
  }
  _insertTemplate(t) {
    const e = this._clipBounds(t);
    if (!e) return;
    const i = this._draft.settings.grid, s = D(this._view.x + this._view.w / 2 - (e.x + e.w / 2), i), n = D(this._view.y + this._view.h / 2 - (e.y + e.h / 2), i);
    this._setGroup(this._insertClip(t, s, n, !1));
  }
  _deleteTemplate(t) {
    this._mutate((e, i) => {
      i.settings.templates = (i.settings.templates ?? []).filter((s) => s.id !== t), i.settings.templates.length || delete i.settings.templates;
    });
  }
  _openMenu(t, e, i) {
    if (this._tool !== "select" || (i && i.kind !== "handle" && !this._inGroup(i.kind, i.id) && this._setGroup([{ kind: i.kind, id: i.id }]), !this._group.length && !_t)) return;
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
        type: `${St}/plan/save`,
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
        const t = await this.hass.callWS({ type: `${St}/plan/load_sample` });
        this._acceptServerPlan(t.plan, t.revision);
      } catch (t) {
        this._error = t?.message ?? String(t);
      }
  }
  _acceptServerPlan(t, e) {
    this._draft = se(t), this._baseRevision = e, this._floorId = this._draft.floors[0].id, this._undo = [], this._redo = [], this._dirty = !1, this._sel = void 0, this._history = void 0, this._fitView();
  }
  async _loadHistory() {
    const t = await this.hass.callWS({ type: `${St}/history/list` });
    this._history = t.items;
  }
  async _restoreHistory(t) {
    if (!confirm("Diesen Stand wiederherstellen? Der aktuelle gespeicherte Stand bleibt im Verlauf.")) return;
    const e = await this.hass.callWS({ type: `${St}/history/restore`, history_id: t });
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
    const n = gs(t, this._floor.walls, G * this._upp, i);
    if (n) return { ...n };
    const o = ms(t, this._floor.areas, G * this._upp, s);
    if (o) return o;
    if (this._tool !== "item") {
      const c = xs(t, this._floor.walls, G * this._upp, i);
      if (c) return c;
    }
    const r = [];
    for (const c of this._floor.walls)
      i.includes(c) || r.push({ x: c.x1, y: c.y1 }, { x: c.x2, y: c.y2 });
    for (const c of this._floor.areas) for (const h of c.points) s.includes(h) || r.push(h);
    const a = hi(t, r, G * this._upp);
    this._lastGuides = a.guides;
    const l = this._draft.settings.grid;
    return { x: a.x ?? D(t.x, l), y: a.y ?? D(t.y, l) };
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
          const a = t.clientX, l = t.clientY;
          window.clearTimeout(this._lpTimer), this._lpTimer = window.setTimeout(() => {
            this._lpTimer = void 0;
            const c = this._drag;
            !c || c.moved || (this._svg.hasPointerCapture(c.pointerId) && this._svg.releasePointerCapture(c.pointerId), this._drag = void 0, this._openMenu(a, l, n));
          }, 550);
        }
        const o = t.shiftKey || t.ctrlKey || t.metaKey, r = this._wallRoomPts();
        if (n?.kind === "handle" && r && !this._sel) {
          const a = Number(n.handle.slice(1)), l = r.length;
          this._drag = { ...s, mode: "handle", wr: !0, handle: n.handle }, this._drag.edge = n.handle.startsWith("e") ? this._edgeSetup(r[a], r[(a + 1) % l]) : { n: { x: 0, y: 0 }, pts: this._movers((c) => M(c, r[a]) < 0.5) }, this._svg.setPointerCapture(t.pointerId);
          break;
        }
        if (n?.kind === "wall" && !o) {
          const a = this._floor.walls.find((h) => h.id === n.id), l = this._wallRoom?.walls.some((h) => h.id === n.id), c = a && !l && !Re(a, this._floor.areas).length ? this._findLoop(a) : void 0;
          if (c) {
            this._wallRoom = { walls: c }, this._sel = void 0, this._setGroup([]);
            const h = this._wallRoomPts();
            this._drag = { ...s, mode: "group", origs: this._wallRoomGroup(h).map((d) => ({ sel: d, orig: structuredClone(this._elementOf(d)) })) }, this._svg.setPointerCapture(t.pointerId);
            break;
          }
        }
        if (this._wallRoom = void 0, n && n.kind !== "handle" && o) {
          this._toggleMulti(n.kind, n.id);
          break;
        }
        if (!n && t.shiftKey) {
          this._drag = { ...s, mode: "marquee", add: !0 }, this._marquee = { a: e, b: e }, this._svg.setPointerCapture(t.pointerId);
          break;
        }
        if (n && n.kind !== "handle" && this._multi.length > 1 && this._inGroup(n.kind, n.id)) {
          this._drag = { ...s, mode: "group", origs: this._multi.map((a) => ({ sel: a, orig: structuredClone(this._elementOf(a)) })) }, this._svg.setPointerCapture(t.pointerId);
          break;
        }
        if (n?.kind === "handle" && this._sel) {
          const a = this._findSelected();
          if (this._drag = { ...s, mode: "handle", sel: this._sel, handle: n.handle, orig: structuredClone(a) }, this._sel.kind === "wall" && a) {
            const l = n.handle === "p1" ? 1 : 2;
            this._drag.links = [this._linksAt(a, l)];
          } else if (this._sel.kind === "area" && a && n.handle?.startsWith("e"))
            this._drag.edge = this._edgeSetup(a.points[Number(n.handle.slice(1))], a.points[(Number(n.handle.slice(1)) + 1) % a.points.length]);
          else if (this._sel.kind === "area" && a && n.handle?.startsWith("v")) {
            const l = a.points[Number(n.handle.slice(1))];
            this._drag.links = [this._linksAt(void 0, 0, l, a)];
          }
        } else if (n && n.kind !== "handle" && this._roomTarget(n)) {
          const a = this._roomTarget(n);
          this._sel = { kind: "area", id: a.id }, this._drag = { ...s, mode: "group", origs: this._roomGroup(a).map((l) => ({ sel: l, orig: structuredClone(this._elementOf(l)) })) };
        } else if (n && n.kind !== "handle") {
          if (this._sel = { kind: n.kind, id: n.id }, this._drag = { ...s, mode: "move", sel: this._sel, orig: structuredClone(this._findSelected()) }, n.kind === "wall") {
            const a = this._findSelected();
            this._drag.links = [this._linksAt(a, 1), this._linksAt(a, 2)];
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
          const o = t.shiftKey ? n : Bt(this._chainStart, n);
          if (M(o, this._chainStart) > 1) {
            const r = this._chainStart;
            this._mutate((a) => this._addWalls(a, r, o)), this._chainStart = o;
          }
        }
        break;
      }
      case "area": {
        const n = this._snap(e, t);
        this._roomPoints.length >= 3 && M(n, this._roomPoints[0]) <= G * this._upp ? this._finishRoom() : this._roomPoints = [...this._roomPoints, n];
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
      case "furniture": {
        const n = H(this._draft.furniture, this._placeType);
        if (!n) break;
        const o = this._snap(e, t), r = E("i");
        this._mutate((a) => a.items.push({ id: r, x: o.x, y: o.y, furnitureType: n.id, tapAction: "auto" })), this._sel = { kind: "item", id: r }, this._tool = "select";
        break;
      }
      case "item": {
        const n = this._snap(e, t), o = E("i");
        this._mutate((r) => r.items.push({ id: o, x: n.x, y: n.y, icon: "mdi:lightbulb", tapAction: "auto" })), this._sel = { kind: "item", id: o }, this._tool = "select";
        break;
      }
    }
  }
  _onPointerMove(t) {
    this._lastGuides = [], this._onPointerMoveInner(t), !this._drag && this._cursor && ["wall", "rect", "wallrect", "area", "item", "furniture"].includes(this._tool) && this._snap(this._cursor, t), this._setGuides(this._lastGuides);
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
      const h = t.altKey ? 0 : this._draft.settings.grid, d = D(e.x - i.start.x, h), g = D(e.y - i.start.y, h);
      for (const { sel: f, orig: u } of i.origs) {
        const y = this._elementOf(f);
        y && this._shiftElement(f.kind, y, u, d, g);
      }
      this._draft = { ...this._draft };
      return;
    }
    if (i.mode === "pan" && i.viewStart) {
      const h = this._upp;
      this._view = { ...i.viewStart, x: i.viewStart.x - s * h, y: i.viewStart.y - n * h };
      return;
    }
    if (i.mode === "handle" && i.wr && i.handle && i.edge) {
      const { n: h, pts: d } = i.edge;
      if (i.handle.startsWith("e")) {
        const g = t.altKey ? 0 : this._draft.settings.grid, f = D((e.x - i.start.x) * h.x + (e.y - i.start.y) * h.y, g);
        for (const u of d) u.set(u.x + h.x * f, u.y + h.y * f);
      } else {
        const g = this._snap(e, t, d.flatMap((f) => f.wall ? [f.wall] : []), d.flatMap((f) => f.vert ? [f.vert] : []));
        for (const f of d) f.set(g.x, g.y);
      }
      this._draft = { ...this._draft };
      return;
    }
    const o = this._findSelected();
    if (!o || !i.sel) return;
    const r = t.altKey ? 0 : this._draft.settings.grid, a = D(e.x - i.start.x, r), l = D(e.y - i.start.y, r), c = i.orig;
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
          const h = { x: c.x + (e.x - i.start.x), y: c.y + (e.y - i.start.y) }, d = jt(h, this._floor.walls, ht(this._floor, this._draft) * 2 + G * this._upp);
          d && !t.altKey ? Object.assign(o, { x: U(d.point.x), y: U(d.point.y), angle: Ke(c.angle, d.angle) }) : Object.assign(o, { x: c.x + a, y: c.y + l });
          break;
        }
      }
    else if (i.mode === "handle" && i.handle) {
      if (i.sel.kind === "wall") {
        const h = i.handle === "p1" ? 1 : 2, d = h === 1 ? { x: c.x2, y: c.y2 } : { x: c.x1, y: c.y1 }, g = i.links?.[0];
        let f = this._snap(e, t, [o, ...(g?.walls ?? []).map((u) => u.wall)], g?.verts ?? []);
        !t.shiftKey && !t.altKey && (f = Bt(d, f)), o[`x${h}`] = f.x, o[`y${h}`] = f.y, g && this._applyLink(g, f);
      } else if (i.sel.kind === "area" && i.handle.startsWith("e") && i.edge) {
        const { n: h, pts: d } = i.edge, g = t.altKey ? 0 : this._draft.settings.grid, f = D((e.x - i.start.x) * h.x + (e.y - i.start.y) * h.y, g);
        for (const u of d) u.set(u.x + h.x * f, u.y + h.y * f);
      } else if (i.sel.kind === "area" && i.handle.startsWith("v")) {
        const h = o.points[Number(i.handle.slice(1))], d = i.links?.[0], g = this._snap(e, t, d?.walls.map((f) => f.wall) ?? [], [h, ...d?.verts ?? []]);
        Object.assign(h, g), d && this._applyLink(d, g);
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
    let n = { i: -1, d: G * this._upp, pt: s };
    if (e.points.forEach((o, r) => {
      const a = e.points[(r + 1) % e.points.length], { point: l } = J(s, o, a), c = M(s, l);
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
    i || (t.key === "Escape" ? this._drag?.mode === "rect" ? (this._svg.hasPointerCapture(this._drag.pointerId) && this._svg.releasePointerCapture(this._drag.pointerId), this._drag = void 0) : this._chainStart ? this._chainStart = void 0 : this._roomPoints.length ? this._roomPoints = [] : this._menu ? this._menu = void 0 : this._tool !== "select" ? this._tool = "select" : this._sel = void 0 : t.key === "Enter" && this._tool === "area" && this._roomPoints.length >= 3 ? this._finishRoom() : (t.key === "Delete" || t.key === "Backspace") && !this._sel && this._wallRoomPts() ? (t.preventDefault(), this._deleteWallRoom()) : (t.key === "Delete" || t.key === "Backspace") && this._group.length && (t.preventDefault(), this._deleteSelected()));
  }
  /** Wand-Endpunkte und Raumecken, die genau auf dem Punkt liegen (Endpunkt `end` von `wall` bzw. `pt` einer Raumecke). */
  _linksAt(t, e, i, s) {
    const n = i ?? (e === 1 ? { x: t.x1, y: t.y1 } : { x: t.x2, y: t.y2 }), o = [];
    for (const a of this._floor.walls)
      a !== t && (M(n, { x: a.x1, y: a.y1 }) < 0.5 && o.push({ wall: a, end: 1 }), M(n, { x: a.x2, y: a.y2 }) < 0.5 && o.push({ wall: a, end: 2 }));
    const r = [];
    for (const a of this._floor.areas)
      for (const l of a.points) l !== i && a !== s && M(n, l) < 0.5 && r.push(l);
    return { end: e, walls: o, verts: r };
  }
  _applyLink(t, e) {
    for (const i of t.walls)
      i.wall[`x${i.end}`] = e.x, i.wall[`y${i.end}`] = e.y;
    for (const i of t.verts) Object.assign(i, e);
  }
  _placeOpening(t, e, i) {
    const s = jt(e, this._floor.walls, ht(this._floor, this._draft) + G * 2 * this._upp), n = t === "door" ? 80 : 120, o = s ? { x: U(s.point.x), y: U(s.point.y) } : this._snap(e, i), r = E(t === "door" ? "t" : "f"), a = { id: r, type: t, x: o.x, y: o.y, length: n, angle: s ? Ke(0, s.angle) : 0 };
    t === "door" && Object.assign(a, { hinge: "left", swing: "in" }), this._mutate((l) => l.openings.push(a)), this._sel = { kind: "opening", id: r };
  }
  _finishRoom() {
    const t = this._roomPoints;
    if (t.length < 3) return;
    const e = E("r"), i = this._floor.areas.length;
    this._mutate(
      (s) => s.areas.push({ id: e, name: `Raum ${i + 1}`, points: t, color: at[i % at.length], sidebar: [] })
    ), this._roomPoints = [], this._sel = { kind: "area", id: e }, this._tool = "select";
  }
  /** Teilt vorhandene Wände an a/b, legt nur noch nicht abgedeckte Wandstücke an. */
  _addWalls(t, e, i) {
    for (const s of [e, i])
      for (const n of [...t.walls]) {
        const o = J(s, { x: n.x1, y: n.y1 }, { x: n.x2, y: n.y2 });
        if (M(s, o.point) > 0.5 || M(s, { x: n.x1, y: n.y1 }) < 0.5 || M(s, { x: n.x2, y: n.y2 }) < 0.5) continue;
        const r = { ...n, id: E("w"), x1: s.x, y1: s.y };
        n.x2 = s.x, n.y2 = s.y, t.walls.push(r);
      }
    for (const [s, n] of bs(e, i, t.walls)) t.walls.push({ id: E("w"), x1: s.x, y1: s.y, x2: n.x, y2: n.y });
  }
  _finishRect(t, e) {
    const i = Math.min(t.x, e.x), s = Math.max(t.x, e.x), n = Math.min(t.y, e.y), o = Math.max(t.y, e.y);
    if (s - i < 1 || o - n < 1) return;
    const r = [
      { x: i, y: n },
      { x: s, y: n },
      { x: s, y: o },
      { x: i, y: o }
    ], a = E("r"), l = this._floor.areas.length, c = this._tool === "wallrect";
    if (this._mutate((h) => {
      r.forEach((d, g) => this._addWalls(h, d, r[(g + 1) % 4])), c || h.areas.push({ id: a, name: `Raum ${l + 1}`, points: r, color: at[l % at.length], sidebar: [] });
    }), c) {
      this._tool = "select";
      return;
    }
    this._sel = { kind: "area", id: a }, this._tool = "select";
  }
  _onFurnitureChange(t) {
    t.stopPropagation(), this._pushUndo(this._snapshot()), this._draft = { ...this._draft, furniture: t.detail.furniture };
  }
  _closeFurniture() {
    this._furnMode = !1, this._furnOpen = void 0;
  }
  _editTemplate(t) {
    this._furnOpen = t, this._furnMode = !0;
  }
  _setTool(t) {
    this._tool = t, this._chainStart = void 0, this._roomPoints = [];
  }
  // ---------------------------------------------------------------- Darstellung
  render() {
    if (!this._draft) return m;
    const t = Ge.find((e) => e.id === this._tool);
    return this._furnMode ? p`<fp-furniture-editor
        style="height:100%"
        .plan=${this._draft}
        .hass=${this.hass}
        .openId=${this._furnOpen}
        @furniture-change=${this._onFurnitureChange}
        @close-furniture=${this._closeFurniture}
        @edit-left=${() => this._furnOpen = void 0}
      ></fp-furniture-editor>` : p`
      <div class="toolbar">
        <button class="icon-btn" title="Schließen" @click=${this._close}><ha-icon icon="mdi:close"></ha-icon></button>
        <div class="main-title">Grundriss bearbeiten${this._dirty ? p`<span class="dirty"> • ungespeichert</span>` : m}</div>
        <button class="chip-top" title="Eigene Möbel-Vorlagen bauen und verwalten" @click=${() => (this._furnOpen = void 0, this._furnMode = !0)}>
          <ha-icon icon="mdi:sofa-outline"></ha-icon>Möbel-Bibliothek
        </button>
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
            </button>` : m}
        <button class="save" ?disabled=${!this._dirty || this._saving} @click=${() => this._save()}>
          ${this._saving ? "Speichert …" : "Speichern"}
        </button>
      </div>
      ${this._error ? p`<div class="error-bar">
            ${this._conflict ? "Der Grundriss wurde inzwischen an anderer Stelle gespeichert." : this._error}
            ${this._conflict ? p`<button @click=${() => this._save(!0)}>Trotzdem überschreiben</button>` : m}
            <button @click=${() => this._error = void 0}>OK</button>
          </div>` : m}
      <div class="body">
        <div class="tools">
          ${Ge.map(
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
                      <button @click=${this._copy}><ha-icon icon="mdi:content-copy"></ha-icon>Kopieren</button>` : m}
                ${_t ? p`<button @click=${this._paste}><ha-icon icon="mdi:content-paste"></ha-icon>Einfügen</button>` : m}
                ${this._group.length ? p`<button @click=${() => (this._menu = void 0, this._deleteSelected())}><ha-icon icon="mdi:delete-outline"></ha-icon>Löschen</button>` : m}
              </div>` : m}
          <div class="hint">${t.hint}</div>
        </div>
        <div class="props">${this._renderProps()}</div>
      </div>
    `;
  }
  _renderCanvas() {
    const t = this._draft, e = this._floor, { width: i, height: s } = t.canvas, n = this._upp, o = t.settings.grid, r = o * 10, a = ht(e, t) + 2, l = this._sel, c = this._view, [h, d, g, f] = [c.x - c.w, c.y - c.h, c.w * 3, c.h * 3];
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
      <rect class="sheet" x=${h} y=${d} width=${g} height=${f}></rect>
      ${o * (1 / n) >= 4 ? _`<rect x=${h} y=${d} width=${g} height=${f} fill="url(#grid-major)" pointer-events="none"></rect>` : m}
      <g class="areas">
        ${e.areas.map(
      (u) => _`<g data-kind="area" data-id=${u.id}>${_i(u, {
        selected: l?.kind === "area" && l.id === u.id,
        labelSize: Math.max(i, s) / 45
      })}</g>`
    )}
      </g>
      ${yi(e, t, "fp-editor-wall-mask", { selectedId: l?.kind === "wall" ? l.id : void 0 })}
      <g class="wall-hits">
        ${e.walls.map(
      (u) => _`<line data-kind="wall" data-id=${u.id} x1=${u.x1} y1=${u.y1} x2=${u.x2} y2=${u.y2}
                           stroke-width=${Math.max(Nt(u, t), 10 * n)}></line>`
    )}
      </g>
      <g class="openings">
        ${e.openings.map(
      (u) => _`<g data-kind="opening" data-id=${u.id}>${xi(u, a, { selected: l?.kind === "opening" && l.id === u.id, forceOpen: l?.kind === "opening" && l.id === u.id, warn: Ht(u), leafIndex: l?.kind === "opening" && l.id === u.id ? this._leafSel ?? void 0 : void 0 })}</g>`
    )}
      </g>
      <g class="furniture-layer">${e.items.map((u) => this._renderFurniture(u))}</g>
      <g class="items">${e.items.map((u) => this._renderItem(u, n))}</g>
      ${this._renderSelectionOverlay(n)}
      ${this._renderDrawPreview(n)}
      ${this._renderGuides(n)}
    `;
  }
  _renderFurniture(t) {
    const e = H(this._draft.furniture, t.furnitureType);
    if (!e) return m;
    const i = this._sel?.kind === "item" && this._sel.id === t.id || this._multi.some((o) => o.kind === "item" && o.id === t.id), s = !!t.entity && !!t.activeColor && ["on", "open", "home"].includes(this.hass?.states?.[t.entity]?.state ?? ""), n = ri(t, e).map((o) => `${o.x},${o.y}`).join(" ");
    return _`<g>
      ${ne(t, e, { selected: i, fill: ci(t, s) })}
      <polygon class="furn-hit" data-kind="item" data-id=${t.id} points=${n}></polygon>
    </g>`;
  }
  _renderItem(t, e) {
    if (!li(t, this._draft.furniture)) return m;
    const i = (t.size ?? 34) / 34 * Vt * e, s = this._sel?.kind === "item" && this._sel.id === t.id, n = t.icon ?? (t.entity ? B(this.hass, t.entity) : "mdi:map-marker");
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
  _renderGuides(t) {
    const e = this._view;
    return _`${this._guides.map(
      (i) => i.axis === "x" ? _`<line class="guide" x1=${i.value} x2=${i.value} y1=${e.y} y2=${e.y + e.h} stroke-width=${t}></line><circle class="guide-dot" cx=${i.ref.x} cy=${i.ref.y} r=${5 * t}></circle>` : _`<line class="guide" y1=${i.value} y2=${i.value} x1=${e.x} x2=${e.x + e.w} stroke-width=${t}></line><circle class="guide-dot" cx=${i.ref.x} cy=${i.ref.y} r=${5 * t}></circle>`
    )}`;
  }
  _renderSelectionOverlay(t) {
    if (this._marquee) {
      const { a: n, b: o } = this._marquee;
      return _`<rect class="marquee" x=${Math.min(n.x, o.x)} y=${Math.min(n.y, o.y)} width=${Math.abs(n.x - o.x)} height=${Math.abs(n.y - o.y)} stroke-width=${t}></rect>`;
    }
    if (this._multi.length > 1) {
      const n = 4 * t;
      return _`${this._multi.map((o) => {
        const r = this._bbox(o);
        return r ? _`<rect class="sel-outline" x=${r.x - n} y=${r.y - n} width=${r.w + 2 * n} height=${r.h + 2 * n} stroke-width=${2 * t}></rect>` : m;
      })}`;
    }
    const e = this._sel ? void 0 : this._wallRoomPts();
    if (e) {
      const n = Be * t;
      return _`
        <polygon class="sel-outline" points=${e.map((o) => `${o.x},${o.y}`).join(" ")} stroke-width=${2 * t}></polygon>
        ${e.map((o, r) => _`<circle class="handle" data-handle="v${r}" cx=${o.x} cy=${o.y} r=${n} stroke-width=${2 * t}></circle>`)}
        ${e.map((o, r) => {
        const a = e[(r + 1) % e.length];
        return _`<rect class="handle" data-handle="e${r}" x=${(o.x + a.x) / 2 - n} y=${(o.y + a.y) / 2 - n} width=${2 * n} height=${2 * n} rx=${n / 3} stroke-width=${2 * t}></rect>`;
      })}`;
    }
    const i = this._findSelected();
    if (!i || !this._sel) return m;
    if (this._sel.kind === "item" && Pt(i, this._draft.furniture)) {
      const n = i, o = n.glowRadius ?? ie, r = (l) => Nt(l, this._draft), a = gi(this._floor.walls, this._floor.openings, (l) => fi(l), r);
      return _`${ai(n, this._draft.furniture).map((l) => {
        const c = ui(l.x, l.y, o, a, r);
        return c ? _`<polygon class="glow-reach" points=${c.map((h) => `${h.x},${h.y}`).join(" ")} stroke-width=${1.5 * t}></polygon>` : _`<circle class="glow-reach" cx=${l.x} cy=${l.y} r=${o} stroke-width=${1.5 * t}></circle>`;
      })}`;
    }
    const s = Be * t;
    if (this._sel.kind === "wall") {
      const n = i;
      return _`
        <line class="sel-line" x1=${n.x1} y1=${n.y1} x2=${n.x2} y2=${n.y2} stroke-width=${2 * t}></line>
        <circle class="handle" data-handle="p1" cx=${n.x1} cy=${n.y1} r=${s} stroke-width=${2 * t}></circle>
        <circle class="handle" data-handle="p2" cx=${n.x2} cy=${n.y2} r=${s} stroke-width=${2 * t}></circle>
        ${this._lengthLabel({ x: n.x1, y: n.y1 }, { x: n.x2, y: n.y2 }, t)}`;
    }
    if (this._sel.kind === "area") {
      const n = i;
      return _`
        <polygon class="sel-outline" points=${n.points.map((o) => `${o.x},${o.y}`).join(" ")} stroke-width=${2 * t}></polygon>
        ${n.points.map(
        (o, r) => _`<circle class="handle" data-handle="v${r}" cx=${o.x} cy=${o.y} r=${s} stroke-width=${2 * t}></circle>`
      )}
        ${n.points.map((o, r) => {
        const a = n.points[(r + 1) % n.points.length];
        return _`<rect class="handle" data-handle="e${r}" x=${(o.x + a.x) / 2 - s} y=${(o.y + a.y) / 2 - s} width=${2 * s} height=${2 * s} rx=${s / 3} stroke-width=${2 * t}></rect>`;
      })}`;
    }
    return m;
  }
  _lengthLabel(t, e, i) {
    const s = M(t, e);
    return s < 1 ? m : _`<text class="measure" x=${(t.x + e.x) / 2} y=${(t.y + e.y) / 2 - 10 * i} font-size=${12 * i}
                     text-anchor="middle">${qt(s)}</text>`;
  }
  _renderDrawPreview(t) {
    const e = this._cursor;
    if (!e) return m;
    const i = { altKey: !1 };
    if (this._tool === "wall") {
      const s = this._snap(e, i);
      if (!this._chainStart) return _`<circle class="cursor-dot" cx=${s.x} cy=${s.y} r=${4 * t}></circle>`;
      const n = Bt(this._chainStart, s);
      return _`
        <line class="preview-wall" x1=${this._chainStart.x} y1=${this._chainStart.y} x2=${n.x} y2=${n.y}
              stroke-width=${this._draft.settings.wallThickness}></line>
        ${this._lengthLabel(this._chainStart, n, t)}`;
    }
    if (this._tool === "rect" || this._tool === "wallrect") {
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
      const s = jt(e, this._floor.walls, ht(this._floor, this._draft) + G * 2 * t);
      return s ? _`<circle class="cursor-dot" cx=${s.point.x} cy=${s.point.y} r=${5 * t}></circle>` : m;
    }
    if (this._tool === "furniture") {
      const s = H(this._draft.furniture, this._placeType);
      if (!s) return m;
      const n = this._snap(e, i);
      return _`<g opacity=".6">${ne({ id: "", x: n.x, y: n.y }, s, {})}</g>`;
    }
    if (this._tool === "item") {
      const s = this._snap(e, i);
      return _`<circle class="preview-item" cx=${s.x} cy=${s.y} r=${Vt * t}></circle>`;
    }
    return m;
  }
  // ---------------------------------------------------------------- Eigenschaften
  _renderPicker() {
    const t = this._draft.furniture ?? [];
    return p`
      <div class="props-head"><h3>Möbel platzieren</h3></div>
      ${t.length ? p`<div class="furn-picker">${t.map((e) => {
      const i = Tt(e), s = Math.max(i.x1 - i.x0, i.y1 - i.y0) * 0.1 + 2;
      return p`<button class="furn-pick ${this._placeType === e.id ? "active" : ""}" title=${e.name} @click=${() => this._placeType = e.id}>
              <svg viewBox="${i.x0 - s} ${i.y0 - s} ${i.x1 - i.x0 + 2 * s} ${i.y1 - i.y0 + 2 * s}"><g class="furniture">${e.parts.map((n) => Lt(n))}</g></svg>
              <span>${e.name}</span>
            </button>`;
    })}</div>` : p`<p class="muted">Die Bibliothek ist leer. Über „Möbel-Bibliothek“ oben baust du eigene Vorlagen.</p>`}
      <button class="chip" @click=${() => (this._furnOpen = void 0, this._furnMode = !0)}><ha-icon icon="mdi:sofa-outline"></ha-icon>Möbel-Bibliothek öffnen</button>
    `;
  }
  _renderProps() {
    if (this._tool === "furniture") return this._renderPicker();
    if (this._multi.length > 1) return this._renderMultiProps();
    if (!this._sel && this._wallRoomPts()) {
      const i = Gt(this._wallRoomPts());
      return p`
        <div class="props-head"><h3>Raum aus Wänden</h3></div>
        ${i ? p`<p class="muted">${qt(i.w)} × ${qt(i.h)}</p>` : m}
        <div class="row-btns">
          <button class="chip" @click=${this._wallRoomToArea}><ha-icon icon="mdi:vector-polygon"></ha-icon>Raumfläche anlegen</button>
          <button class="chip" @click=${this._deleteWallRoom}><ha-icon icon="mdi:delete-outline"></ha-icon>Löschen</button>
        </div>
        <p class="muted">Ziehen verschiebt den Raum samt Wänden. Griffe an Ecken und Kanten ändern die Größe. Ein weiterer Klick auf eine Wand wählt nur die Wand. Mit „Raumfläche anlegen“ wird daraus ein Raum mit Seitenleiste und Icons.</p>
      `;
    }
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
        .value=${i == null ? "" : String(U(i))}
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
      ${i ? p`<button class="link" @click=${() => this._setProp(e, void 0)}>Standard</button>` : m}
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
        <input type="number" min="1" step="1" .value=${String(U(M({ x: t.x1, y: t.y1 }, { x: t.x2, y: t.y2 })))}
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
    const i = Re(e, this._floor.areas), s = this._sel;
    if (!(!i.length || s?.kind === "wall" && s.id === e.id))
      return i.find((n) => s?.kind === "area" && s.id === n.id) ? void 0 : i[0];
  }
  _roomGroup(t) {
    const e = this._floor, i = di(t, e.walls), s = [{ kind: "area", id: t.id }, ...i.map((n) => ({ kind: "wall", id: n.id }))];
    for (const n of e.openings)
      i.some((o) => xt({ x: n.x, y: n.y }, { x: o.x1, y: o.y1 }, { x: o.x2, y: o.y2 }, 3)) && s.push({ kind: "opening", id: n.id });
    for (const n of e.items) X(t.points, n.x, n.y) && s.push({ kind: "item", id: n.id });
    return s;
  }
  _movers(t) {
    const e = [];
    for (const i of this._floor.areas)
      for (const s of i.points) t(s) && e.push({ x: s.x, y: s.y, vert: s, set: (n, o) => Object.assign(s, { x: n, y: o }) });
    for (const i of this._floor.walls)
      t({ x: i.x1, y: i.y1 }) && e.push({ x: i.x1, y: i.y1, wall: i, set: (s, n) => Object.assign(i, { x1: s, y1: n }) }), t({ x: i.x2, y: i.y2 }) && e.push({ x: i.x2, y: i.y2, wall: i, set: (s, n) => Object.assign(i, { x2: s, y2: n }) });
    return e;
  }
  _edgeSetup(t, e) {
    const i = M(t, e) || 1;
    return { n: { x: -(e.y - t.y) / i, y: (e.x - t.x) / i }, pts: this._movers((n) => xt(n, t, e)) };
  }
  /** Kürzester geschlossener Wandzug durch die Wand (Raum ohne Fläche). */
  _findLoop(t) {
    const e = (h, d) => `${Math.round(h)},${Math.round(d)}`, i = /* @__PURE__ */ new Map();
    for (const h of this._floor.walls) {
      const d = e(h.x1, h.y1), g = e(h.x2, h.y2);
      d !== g && ((i.get(d) ?? i.set(d, []).get(d)).push({ w: h, to: g, flip: !1 }), (i.get(g) ?? i.set(g, []).get(g)).push({ w: h, to: d, flip: !0 }));
    }
    const s = e(t.x2, t.y2), n = e(t.x1, t.y1);
    if (s === n) return;
    const o = /* @__PURE__ */ new Map(), r = [s], a = /* @__PURE__ */ new Set([s]);
    for (; r.length && !a.has(n); ) {
      const h = r.shift();
      for (const d of i.get(h) ?? [])
        d.w === t || a.has(d.to) || (a.add(d.to), o.set(d.to, { from: h, w: d.w, flip: d.flip }), r.push(d.to));
    }
    if (!a.has(n)) return;
    const l = [];
    for (let h = n; h !== s; ) {
      const d = o.get(h);
      l.unshift({ id: d.w.id, flip: d.flip }), h = d.from;
    }
    const c = [{ id: t.id, flip: !1 }, ...l];
    return c.length >= 3 ? c : void 0;
  }
  _wallRoomPts() {
    if (!this._wallRoom) return;
    const t = [];
    for (const { id: e, flip: i } of this._wallRoom.walls) {
      const s = this._floor.walls.find((n) => n.id === e);
      if (!s) return;
      t.push(i ? { x: s.x2, y: s.y2 } : { x: s.x1, y: s.y1 });
    }
    return t;
  }
  _wallRoomGroup(t) {
    const e = this._floor, i = new Set(this._wallRoom.walls.map((o) => o.id)), s = e.walls.filter((o) => i.has(o.id)), n = s.map((o) => ({ kind: "wall", id: o.id }));
    for (const o of e.openings)
      s.some((r) => xt({ x: o.x, y: o.y }, { x: r.x1, y: r.y1 }, { x: r.x2, y: r.y2 }, 3)) && n.push({ kind: "opening", id: o.id });
    for (const o of e.items) X(t, o.x, o.y) && n.push({ kind: "item", id: o.id });
    return n;
  }
  _wallRoomToArea() {
    const t = this._wallRoomPts();
    if (!t) return;
    const e = E("r"), i = this._floor.areas.length;
    this._mutate((s) => s.areas.push({ id: e, name: `Raum ${i + 1}`, points: t, color: at[i % at.length], sidebar: [] })), this._wallRoom = void 0, this._sel = { kind: "area", id: e };
  }
  _deleteWallRoom() {
    const t = this._wallRoomPts();
    if (!t) return;
    const e = this._wallRoomGroup(t);
    this._mutate((i) => {
      for (const s of Object.keys(q)) {
        const n = new Set(e.filter((o) => o.kind === s).map((o) => o.id));
        n.size && (i[q[s]] = i[q[s]].filter((o) => !n.has(o.id)));
      }
    }), this._wallRoom = void 0;
  }
  _setWallLength(t) {
    const e = this._findSelected();
    if (!e || !Number.isFinite(t) || t < 1) return;
    const i = M({ x: e.x1, y: e.y1 }, { x: e.x2, y: e.y2 });
    i < 0.01 || this._mutate(() => {
      const s = this._linksAt(e, 2), n = t / i, o = { x: U(e.x1 + (e.x2 - e.x1) * n), y: U(e.y1 + (e.y2 - e.y1) * n) };
      e.x2 = o.x, e.y2 = o.y, this._applyLink(s, o);
    });
  }
  _setRectSize(t, e, i) {
    const s = Gt(t.points);
    !s || !(e >= 1) || !(i >= 1) || this._mutate(() => {
      const n = t.points.map((o) => this._linksAt(void 0, 0, o, t));
      t.points.forEach((o, r) => {
        const a = { x: o.x === s.x ? s.x : s.x + e, y: o.y === s.y ? s.y : s.y + i };
        Object.assign(o, a), this._applyLink(n[r], a);
      });
    });
  }
  _autoPlaceIcons(t) {
    const e = new Set(this._floor.items.map((o) => o.entity).filter(Boolean)), i = t.sidebar.map((o) => o.entity).filter((o) => !e.has(o));
    if (!i.length) return;
    const s = this._floor.items.filter((o) => X(t.points, o.x, o.y)).map((o) => ({ x: o.x, y: o.y })), n = ys(t.points, i.map((o) => ({ light: R(o) === "light" })), s, _e(t.points));
    this._mutate((o) => {
      i.forEach((r, a) => o.items.push({ id: E("i"), x: n[a].x, y: n[a].y, entity: r, icon: B(this.hass, r), tapAction: "auto" }));
    });
  }
  _renderOpeningProps(t) {
    const e = t.type === "window", i = Ht(t), s = ae(t), n = le(t), o = (r) => t.shutters?.find((a) => a.side === r);
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
              ${i ? p`<span class="warn">Ohne Sensor kann der Öffnungszustand nicht angezeigt werden.</span>` : m}
            </div>
            <h4>Flügel (${s.length} von ${te})</h4>
            ${s.map(
      (r, a) => p`<div class="leaf-row ${this._leafSel === a ? "active" : ""}" @click=${() => this._leafSel = a}>
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
              <button ?disabled=${s.length >= te} @click=${() => this._setLeafCount(s.length + 1)}>
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
      ${this._color("Farbe wenn offen", "openColor", t.openColor, ei)}
      <p class="muted">Im Editor wird die ausgewählte Öffnung geöffnet gezeigt. Ziehen schiebt sie entlang der Wände.</p>
      ${e ? p`<h4>Rollo</h4>
            ${["out", "in"].map((r) => {
      const a = o(r);
      return p`<div class="shutter-row">
                <div class="field">
                  <span>${r === "out" ? "Außen" : "Innen"} (optional)</span>
                  <fp-entity-picker
                    .hass=${this.hass}
                    .value=${a?.entity ?? ""}
                    .domains=${["cover"]}
                    @value-changed=${(l) => this._setShutter(r, { entity: l.detail.value })}
                  ></fp-entity-picker>
                </div>
                ${a ? p`<label class="field color">
                      <span>Farbe</span>
                      <input
                        type="color"
                        .value=${a.color && a.color.startsWith("#") ? a.color : ii}
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
      e && (e.leaves = t(ae(e).map((i) => ({ ...i })), e));
    });
  }
  _setLeaf(t, e) {
    this._leafSel = t, this._editLeaves((i, s) => {
      if (e.hinge === void 0) return i.map((o, r) => r === t ? He({ ...o, ...e }) : o);
      const n = le(s);
      return i.map((o, r) => r === t ? He({ ...o, ...e }) : { ...o, hinge: o.hinge ?? n[r].hinge });
    });
  }
  _setLeafCount(t) {
    this._editLeaves((e) => Rs(e, t)), this._leafSel = Math.min(this._leafSel ?? 0, t - 1);
  }
  _setLeafWidth(t, e) {
    Number.isFinite(e) && this._editLeaves((i, s) => Is(i, t, e, s.length));
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
          ${ts.map(([s, n]) => p`<option value=${s} ?selected=${(t.type ?? "room") === s}>${n}</option>`)}
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
      ${(() => {
      const s = Gt(t.points);
      return s ? p`<div class="grid2">
              <label class="field"><span>Breite</span><input type="number" min="1" .value=${String(U(s.w))} @change=${(n) => this._setRectSize(t, Number(n.target.value), s.h)} /></label>
              <label class="field"><span>Höhe</span><input type="number" min="1" .value=${String(U(s.h))} @change=${(n) => this._setRectSize(t, s.w, Number(n.target.value))} /></label>
            </div>` : m;
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
            </label>` : m}
        ${this._entity("Raum einfärben, wenn aktiv", "entity", t.entity, ["binary_sensor", "input_boolean", "light", "switch", "person"])}
        ${t.entity ? this._color("Farbe wenn aktiv", "activeColor", t.activeColor, "#ffc107") : m}
      </details>

      <h4>Seitenleiste</h4>
      <p class="muted">Nur was hier steht, erscheint beim Antippen des Raums – Geräte, Szenen und Skripte.</p>
      <div class="sidebar-list">
        ${t.sidebar.map(
      (s, n) => p`<div class="sb-row">
            <ha-icon .icon=${B(this.hass, s.entity, s.icon)}></ha-icon>
            <div class="sb-main">
              <input
                type="text"
                .value=${s.name ?? ""}
                placeholder=${Ct(this.hass, s.entity)}
                @change=${(o) => this._editSidebar(n, "name", o.target.value.trim())}
              />
              <small>${s.entity} · ${{ device: "Gerät", scene: "Szene", script: "Skript" }[Xt(s.entity)]}${this.hass.states[s.entity] ? "" : " · nicht gefunden"}</small>
            </div>
            <button class="icon-btn" title="Nach oben" ?disabled=${n === 0} @click=${() => this._moveSidebar(n, -1)}><ha-icon icon="mdi:chevron-up"></ha-icon></button>
            <button class="icon-btn" title="Nach unten" ?disabled=${n === t.sidebar.length - 1} @click=${() => this._moveSidebar(n, 1)}><ha-icon icon="mdi:chevron-down"></ha-icon></button>
            <button class="icon-btn" title="Entfernen" @click=${() => this._removeSidebar(n)}><ha-icon icon="mdi:close"></ha-icon></button>
          </div>`
    )}
      </div>
      ${t.sidebar.length ? p`<button class="chip" title="Fehlende Icons für die Seitenleisten-Geräte im Raum verteilen" @click=${() => this._autoPlaceIcons(t)}>
            <ha-icon icon="mdi:auto-fix"></ha-icon>Icons automatisch platzieren
          </button>` : m}
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
                  <ha-icon .icon=${B(this.hass, s)}></ha-icon>${Ct(this.hass, s)}
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
    return Object.values(this.hass.entities).filter((n) => !n.hidden && !e.has(n.entity_id) && s.has(R(n.entity_id))).filter((n) => (n.area_id ?? (n.device_id ? i?.[n.device_id]?.area_id : void 0)) === t.haArea).map((n) => n.entity_id).slice(0, 30);
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
  _renderFurnitureProps(t) {
    const e = this._draft.furniture ?? [], i = H(e, t.furnitureType), s = (n) => this._setProp("rotation", (((t.rotation ?? 0) + n) % 360 + 360) % 360);
    return p`
      <label class="field">
        <span>Vorlage</span>
        <select @change=${(n) => this._setProp("furnitureType", n.target.value)}>
          ${i ? m : p`<option value="" selected>${t.furnitureType ? "(gelöscht)" : "keine"}</option>`}
          ${e.map((n) => p`<option value=${n.id} ?selected=${n.id === t.furnitureType}>${n.name}</option>`)}
        </select>
      </label>
      ${i ? p`<button class="chip" @click=${() => this._editTemplate(i.id)}><ha-icon icon="mdi:pencil-outline"></ha-icon>Vorlage bearbeiten</button>` : m}
      <div class="grid2">
        ${this._num("Drehung (°)", "rotation", t.rotation, { min: -720, max: 720, step: 5, placeholder: "0" })}
        ${this._num("Skalierung", "scale", t.scale, { min: 0.05, max: 20, step: 0.1, placeholder: "1" })}
      </div>
      <div class="row-btns">
        <button class="chip" @click=${() => s(-90)}><ha-icon icon="mdi:rotate-left"></ha-icon>−90°</button>
        <button class="chip" @click=${() => s(90)}><ha-icon icon="mdi:rotate-right"></ha-icon>+90°</button>
      </div>
      ${this._color("Farbe (überschreibt Vorlage)", "fillColor", t.fillColor, "#9e9e9e")}
      ${i?.lights?.length ? p`<p class="muted">Die Vorlage hat ${i.lights.length} Leuchtpunkt${i.lights.length > 1 ? "e" : ""}. Mit einer Licht-Entität scheint das Licht genau dort.</p>` : m}
      <h4>Icon / Entität</h4>
    `;
  }
  _renderItemProps(t) {
    return p`
      ${t.furnitureType ? this._renderFurnitureProps(t) : m}
      <div class="field">
        <span>Icon</span>
        <div class="icon-input">
          <ha-icon .icon=${t.icon ?? (t.entity ? B(this.hass, t.entity) : "mdi:map-marker")}></ha-icon>
          <input type="text" .value=${t.icon ?? ""} placeholder=${t.entity ? "vom Gerät" : "mdi:…"}
                 @change=${(e) => this._setProp("icon", e.target.value.trim())} />
        </div>
        <div class="icon-grid">
          ${Bs.map(
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
        <input type="checkbox" .checked=${Pt(t, this._draft.furniture)} @change=${(e) => this._setProp("glow", e.target.checked)} />
        <span>Lichtschein anzeigen${t.glow === void 0 || t.glow === null ? " (automatisch)" : ""}</span>
      </label>
      ${Pt(t, this._draft.furniture) ? p`<div class="grid2">
              ${this._num("Radius", "glowRadius", t.glowRadius, { min: 10, max: 5e3, step: 10, placeholder: String(ie) })}
              ${this._color("Farbe ohne RGB", "glowColor", t.glowColor, si)}
            </div>
            <p class="muted">Bei voller Helligkeit; gedimmt schrumpft der Schein. RGB-Lampen leuchten in ihrer eigenen Farbe. Die gestrichelte Kontur zeigt, wo Wände das Licht begrenzen.</p>` : m}
      <h4>Sichtbarkeit</h4>
      ${this._check("Nur zeigen, wenn der Raum gezoomt ist", "showOnlyWhenZoomed", t.showOnlyWhenZoomed)}
      ${t.showOnlyWhenZoomed ? p`<label class="field">
            <span>Gehört zu Raum</span>
            <select @change=${(e) => this._setProp("area", e.target.value)}>
              <option value="">automatisch (Lage im Raum)</option>
              ${this._floor.areas.map((e) => p`<option value=${e.id} ?selected=${t.area === e.id}>${e.name || e.id}</option>`)}
            </select>
          </label>` : m}
      ${!t.area && !this._floor.areas.some((e) => X(e.points, t.x, t.y)) && t.showOnlyWhenZoomed ? p`<p class="warn">Das Icon liegt in keinem Raum und wird deshalb nie angezeigt.</p>` : m}
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
            ${(Kt.includes(t.settings.grid) ? Kt : [...Kt, t.settings.grid].sort((i, s) => i - s)).map(
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
            </div>` : m}
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
    const e = E("etage");
    this._mutate((i, s) => s.floors.push({ id: e, name: t, walls: [], openings: [], areas: [], items: [] })), this._floorId = e, this._sel = void 0;
  }
  _deleteFloor() {
    if (this._draft.floors.length < 2 || !confirm(`Etage „${this._floor.name || this._floorId}“ mit allem Inhalt löschen?`)) return;
    const t = this._floorId;
    this._mutate((e, i) => i.floors = i.floors.filter((s) => s.id !== t)), this._floorId = this._draft.floors[0].id, this._sel = void 0;
  }
};
v.styles = [
  dt(bi),
  dt(me),
  Y`
      .furn-hit { fill: transparent; pointer-events: all; cursor: move; }
      .furn-picker { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin: 8px 0; }
      .furn-pick { display: flex; flex-direction: column; align-items: center; gap: 2px; border: 1px solid var(--divider-color); border-radius: 8px; background: none; padding: 6px; cursor: pointer; font-size: 11px; color: var(--primary-text-color); }
      .furn-pick.active { border-color: var(--primary-color); outline: 2px solid var(--primary-color); }
      .furn-pick svg { width: 100%; height: 56px; }
      .chip-top { display: inline-flex; align-items: center; gap: 4px; border: 1px solid rgba(255,255,255,.6); border-radius: 16px; background: none; color: inherit; padding: 4px 12px; cursor: pointer; font: inherit; font-size: 13px; --mdc-icon-size: 18px; }
    `,
  Y`
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
k([
  w({ attribute: !1 })
], v.prototype, "hass", 2);
k([
  w({ attribute: !1 })
], v.prototype, "plan", 2);
k([
  w({ attribute: !1 })
], v.prototype, "revision", 2);
k([
  w({ attribute: !1 })
], v.prototype, "floorId", 2);
k([
  w({ attribute: !1 })
], v.prototype, "initialAreaId", 2);
k([
  w({ type: Boolean, reflect: !0 })
], v.prototype, "narrow", 2);
k([
  b()
], v.prototype, "_draft", 2);
k([
  b()
], v.prototype, "_floorId", 2);
k([
  b()
], v.prototype, "_tool", 2);
k([
  b()
], v.prototype, "_furnMode", 2);
k([
  b()
], v.prototype, "_furnOpen", 2);
k([
  b()
], v.prototype, "_placeType", 2);
k([
  b()
], v.prototype, "_sel", 2);
k([
  b()
], v.prototype, "_multi", 2);
k([
  b()
], v.prototype, "_marquee", 2);
k([
  b()
], v.prototype, "_guides", 2);
k([
  b()
], v.prototype, "_wallRoom", 2);
k([
  b()
], v.prototype, "_menu", 2);
k([
  b()
], v.prototype, "_leafSel", 2);
k([
  b()
], v.prototype, "_view", 2);
k([
  b()
], v.prototype, "_cursor", 2);
k([
  b()
], v.prototype, "_chainStart", 2);
k([
  b()
], v.prototype, "_roomPoints", 2);
k([
  b()
], v.prototype, "_dirty", 2);
k([
  b()
], v.prototype, "_saving", 2);
k([
  b()
], v.prototype, "_error", 2);
k([
  b()
], v.prototype, "_conflict", 2);
k([
  b()
], v.prototype, "_history", 2);
k([
  b()
], v.prototype, "_svgSize", 2);
k([
  ge("svg.canvas")
], v.prototype, "_svg", 2);
v = k([
  nt("fp-editor")
], v);
function He(t) {
  const e = { w: t.w };
  return t.entity && (e.entity = t.entity), t.hinge && (e.hinge = t.hinge), e;
}
function U(t) {
  return Math.round(t * 10) / 10;
}
function Ke(t, e) {
  const i = (e % 360 + 360) % 360, s = (i + 180) % 360, n = (t % 360 + 360) % 360, o = (r) => Math.min(Math.abs(r - n), 360 - Math.abs(r - n));
  return U(o(i) <= o(s) ? i : s);
}
function qt(t) {
  return t >= 100 ? `${(t / 100).toFixed(2).replace(".", ",")} m` : `${Math.round(t)} cm`;
}
var Gs = Object.defineProperty, Hs = Object.getOwnPropertyDescriptor, ot = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Hs(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (n = (s ? r(e, i, n) : r(n)) || n);
  return s && n && Gs(e, i, n), n;
};
const Ks = /* @__PURE__ */ new Set(["light", "switch", "fan", "input_boolean", "siren"]), Vs = 1.35, qs = 34, $i = 380, vi = 700, Zs = 0.55;
let Xs = 0, K = class extends W {
  constructor() {
    super(...arguments), this.popupOpen = !1, this._box = { w: 0, h: 0 }, this._maskId = `fp-wall-mask-${++Xs}`;
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
    const { w: t, h: e } = re(this.floor, this.plan), i = getComputedStyle(this), s = this.clientWidth - parseFloat(i.paddingLeft) - parseFloat(i.paddingRight), n = this.clientHeight - parseFloat(i.paddingTop) - parseFloat(i.paddingBottom);
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
    s === "auto" && (Yt(i) ? s = "toggle" : s = Ks.has(R(i)) ? "toggle" : "more-info"), s !== "none" && (s === "more-info" ? Ot(this, i) : Yt(i) ? await Qt(this.hass, i) : await ti(this.hass, i));
  }
  _onItemContext(t, e) {
    e.entity && (t.preventDefault(), Ot(this, e.entity));
  }
  render() {
    if (!this.plan || !this.floor) return m;
    const t = this.floor, e = re(t, this.plan), { w: i, h: s } = e, n = t.areas.find((l) => l.id === this.zoomedAreaId);
    let o = n ? ds(
      n.points.map((l) => ({ x: l.x - e.x, y: l.y - e.y })),
      i,
      s,
      void 0,
      void 0,
      ps(n)
    ) : oe;
    n && this.popupOpen && o.scale > 1 && (o = this._shiftForPopup(o));
    const r = o.scale > 1 ? Vs / o.scale : 1, a = Math.max(this.plan.canvas.width, this.plan.canvas.height) / 45;
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
      (l) => _`<g @click=${(c) => this._onAreaClick(c, l.id)}>${_i(l, {
        hass: this.hass,
        selected: l.id === this.zoomedAreaId,
        dimmed: !!n && l.id !== n.id,
        labelSize: a
      })}</g>`
    )}
            </g>
            <g class="furniture-layer">${t.items.map((l) => this._renderFurniture(l))}</g>
            ${Es(t, this.plan, this.hass, `${this._maskId}-glow`)}
            ${yi(t, this.plan, this._maskId)} ${Us(t, this.plan, { hass: this.hass })}
          </svg>
          <div class="items">
            ${t.items.filter((l) => !fs(l, n, t.areas)).map((l) => this._renderItem(l, e))}
          </div>
        </div>
      </div>
    `;
  }
  /** Verschiebt den gezoomten Raum in den Bereich, den das Popup frei lässt (links bzw. oben). */
  _shiftForPopup(t) {
    return !this._box.w || !this._box.h ? t : this.clientWidth < vi ? { ...t, tyPercent: t.tyPercent - this.clientHeight * Zs / 2 / this._box.h * 100 } : { ...t, txPercent: t.txPercent - ($i + 32) / 2 / this._box.w * 100 };
  }
  _renderFurniture(t) {
    const e = H(this.plan?.furniture, t.furnitureType);
    return e ? ne(t, e, { fill: ci(t, it(t.entity ? this.hass.states[t.entity] : void 0)) }) : m;
  }
  _renderItem(t, e) {
    if (!li(t, this.plan?.furniture)) return m;
    const i = e.w, s = e.h, n = t.entity ? this.hass.states[t.entity] : void 0, o = it(n), r = !!t.entity && Jt(n), a = t.icon ?? (t.entity ? B(this.hass, t.entity) : "mdi:map-marker"), l = t.size ?? qs, c = o ? t.activeColor ?? "var(--fp-active-color, #ffb300)" : t.color ?? "", h = t.label ?? n?.attributes.friendly_name ?? t.entity ?? "";
    return p`
      <div
        class="item ${o ? "active" : ""} ${r ? "unavailable" : ""} ${t.entity ? "interactive" : ""}"
        style="left:${(t.x - e.x) / i * 100}%;top:${(t.y - e.y) / s * 100}%;--fp-item-size:${l}px;${c ? `--fp-item-color:${c}` : ""}"
        title=${h}
        @click=${(d) => this._onItemClick(d, t)}
        @contextmenu=${(d) => this._onItemContext(d, t)}
      >
        <div class="badge"><ha-icon .icon=${a}></ha-icon></div>
        ${t.label ? p`<div class="label">${t.label}</div>` : m}
        ${t.showState && n ? p`<div class="state">${Qe(this.hass, n)}</div>` : m}
      </div>
    `;
  }
};
K.styles = [
  dt(bi),
  dt(me),
  Y`
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
ot([
  w({ attribute: !1 })
], K.prototype, "hass", 2);
ot([
  w({ attribute: !1 })
], K.prototype, "plan", 2);
ot([
  w({ attribute: !1 })
], K.prototype, "floor", 2);
ot([
  w({ attribute: !1 })
], K.prototype, "zoomedAreaId", 2);
ot([
  w({ type: Boolean })
], K.prototype, "popupOpen", 2);
ot([
  b()
], K.prototype, "_box", 2);
K = ot([
  nt("fp-plan-view")
], K);
var Ys = Object.defineProperty, Js = Object.getOwnPropertyDescriptor, Wt = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Js(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (n = (s ? r(e, i, n) : r(n)) || n);
  return s && n && Ys(e, i, n), n;
};
const Qs = [
  { kind: "device", title: "Geräte" },
  { kind: "scene", title: "Szenen" },
  { kind: "script", title: "Skripte" }
];
let ft = class extends W {
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
    const t = this.area.sidebar ?? [], e = t.filter((i) => Xt(i.entity) === "device" && it(this.hass.states[i.entity])).length;
    return p`
      <header>
        <div class="title">
          <h2>${this.area.name || "Raum"}</h2>
          <span class="sub">${t.length ? `${e} aktiv` : ""}</span>
        </div>
        ${this.canEdit ? p`<button class="icon-btn" title="Seitenleiste bearbeiten" @click=${this._edit}>
              <ha-icon icon="mdi:pencil"></ha-icon>
            </button>` : m}
        <button class="icon-btn" title="Schließen" @click=${this._close}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </header>
      <div class="content">
        ${t.length === 0 ? p`<p class="empty">
              Diesem Raum ist noch nichts zugeordnet.${this.canEdit ? p` Im Editor lassen sich Geräte, Szenen und Skripte für die Seitenleiste auswählen.` : m}
            </p>` : Qs.map(({ kind: i, title: s }) => {
      const n = t.filter((o) => Xt(o.entity) === i);
      return n.length ? p`<section>
                <h3>${s}</h3>
                ${i === "device" ? n.map((o) => this._renderRow(o)) : p`<div class="chips">${n.map((o) => this._renderChip(o))}</div>`}
              </section>` : m;
    })}
      </div>
    `;
  }
  _renderRow(t) {
    const e = this.hass.states[t.entity], i = it(e), s = Jt(e), n = t.name || Ct(this.hass, t.entity), o = R(t.entity);
    return p`
      <div class="row ${i ? "active" : ""} ${s ? "unavailable" : ""}">
        <button class="row-main" @click=${() => Ot(this, t.entity)} title="Details">
          <span class="row-icon"><ha-icon .icon=${B(this.hass, t.entity, t.icon)}></ha-icon></span>
          <span class="row-text">
            <span class="name">${n}</span>
            <span class="state">${Qe(this.hass, e)}</span>
          </span>
        </button>
        ${s ? m : o === "cover" ? p`<span class="cover-btns">
              <button class="icon-btn" title="Öffnen" @click=${() => this._call("cover", "open_cover", t.entity)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button class="icon-btn" title="Stopp" @click=${() => this._call("cover", "stop_cover", t.entity)}>
                <ha-icon icon="mdi:stop"></ha-icon>
              </button>
              <button class="icon-btn" title="Schließen" @click=${() => this._call("cover", "close_cover", t.entity)}>
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
            </span>` : Yt(t.entity) ? p`<button class="run" @click=${() => Qt(this.hass, t.entity)}>Ausführen</button>` : Zi(t.entity) ? p`<button
              class="switch ${i ? "on" : ""}"
              role="switch"
              aria-checked=${i ? "true" : "false"}
              title=${i ? "Ausschalten" : "Einschalten"}
              @click=${() => ti(this.hass, t.entity)}
            >
              <span class="knob"></span>
            </button>` : m}
      </div>
    `;
  }
  _renderChip(t) {
    const e = this.hass.states[t.entity], i = t.name || Ct(this.hass, t.entity), s = R(t.entity) === "script" && e?.state === "on";
    return p`
      <button
        class="chip ${s ? "running" : ""}"
        ?disabled=${Jt(e)}
        title=${t.entity}
        @click=${() => Qt(this.hass, t.entity)}
        @contextmenu=${(n) => {
      n.preventDefault(), Ot(this, t.entity);
    }}
      >
        <ha-icon .icon=${B(this.hass, t.entity, t.icon)}></ha-icon>
        <span>${i}</span>
      </button>
    `;
  }
  _call(t, e, i) {
    this.hass.callService(t, e, { entity_id: i });
  }
};
ft.styles = Y`
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
Wt([
  w({ attribute: !1 })
], ft.prototype, "hass", 2);
Wt([
  w({ attribute: !1 })
], ft.prototype, "area", 2);
Wt([
  w({ type: Boolean })
], ft.prototype, "canEdit", 2);
ft = Wt([
  nt("fp-room-sidebar")
], ft);
var tn = Object.defineProperty, en = Object.getOwnPropertyDescriptor, kt = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? en(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (n = (s ? r(e, i, n) : r(n)) || n);
  return s && n && tn(e, i, n), n;
};
let st = class extends W {
  constructor() {
    super(...arguments), this.canEdit = !1, this.sheet = !1, this._onKey = (t) => {
      t.key === "Escape" && this._close();
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._onKey), this._ro = new ResizeObserver(() => this.sheet = this.clientWidth < vi), this._ro.observe(this);
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
    ` : m;
  }
};
st.styles = Y`
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
      width: ${$i}px;
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
kt([
  w({ attribute: !1 })
], st.prototype, "hass", 2);
kt([
  w({ attribute: !1 })
], st.prototype, "area", 2);
kt([
  w({ type: Boolean })
], st.prototype, "canEdit", 2);
kt([
  w({ type: Boolean, reflect: !0 })
], st.prototype, "sheet", 2);
st = kt([
  nt("fp-room-dialog")
], st);
var sn = Object.defineProperty, nn = Object.getOwnPropertyDescriptor, j = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? nn(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (n = (s ? r(e, i, n) : r(n)) || n);
  return s && n && sn(e, i, n), n;
};
const Zt = "floorplan_panel";
let N = class extends W {
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
      const t = await this.hass.callWS({ type: `${Zt}/plan/get` });
      this._setPlan(t.plan, t.revision), this._unsub || (this._unsub = await this.hass.connection.subscribeMessage((e) => this._onEvent(e), {
        type: `${Zt}/subscribe`
      }));
    } catch (t) {
      this._error = t?.message ?? String(t);
    } finally {
      this._loading = !1;
    }
  }
  _setPlan(t, e) {
    const i = se(t);
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
      const t = await this.hass.callWS({ type: `${Zt}/plan/load_sample` });
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
            </div>` : m}
        ${this._isAdmin && t ? p`<button class="icon-btn" title="Grundriss bearbeiten" @click=${() => this._openEditor()}>
              <ha-icon icon="mdi:pencil-ruler"></ha-icon>
            </button>` : m}
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
                ></fp-room-dialog>` : m}
          </div>` : p`<div class="message">Lade …</div>`}
    `;
  }
};
N.styles = Y`
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
j([
  w({ attribute: !1 })
], N.prototype, "hass", 2);
j([
  w({ type: Boolean, reflect: !0 })
], N.prototype, "narrow", 2);
j([
  w({ attribute: !1 })
], N.prototype, "panel", 2);
j([
  b()
], N.prototype, "_plan", 2);
j([
  b()
], N.prototype, "_revision", 2);
j([
  b()
], N.prototype, "_floorId", 2);
j([
  b()
], N.prototype, "_zoomedAreaId", 2);
j([
  b()
], N.prototype, "_editing", 2);
j([
  b()
], N.prototype, "_editRoomId", 2);
j([
  b()
], N.prototype, "_error", 2);
N = j([
  nt("floorplan-panel")
], N);
