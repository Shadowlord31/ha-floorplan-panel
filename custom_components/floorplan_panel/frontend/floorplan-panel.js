function He(e) {
  return (t) => {
    customElements.get(e) || customElements.define(e, t);
  };
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Jt = globalThis, Hn = Jt.ShadowRoot && (Jt.ShadyCSS === void 0 || Jt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, jn = Symbol(), Ao = /* @__PURE__ */ new WeakMap();
let Xs = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== jn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Hn && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Ao.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Ao.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Se = (e) => new Xs(typeof e == "string" ? e : e + "", void 0, jn), ne = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, o, s) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new Xs(i, e, jn);
}, Va = (e, t) => {
  if (Hn) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), o = Jt.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, e.appendChild(n);
  }
}, Mo = Hn ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return Se(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Za, defineProperty: Xa, getOwnPropertyDescriptor: Ya, getOwnPropertyNames: Ja, getOwnPropertySymbols: Qa, getPrototypeOf: el } = Object, Ai = globalThis, Co = Ai.trustedTypes, tl = Co ? Co.emptyScript : "", il = Ai.reactiveElementPolyfillSupport, Ct = (e, t) => e, ri = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? tl : null;
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
} }, Wn = (e, t) => !Za(e, t), To = { attribute: !0, type: String, converter: ri, reflect: !1, useDefault: !1, hasChanged: Wn };
Symbol.metadata ??= Symbol("metadata"), Ai.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let st = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = To) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(t, n, i);
      o !== void 0 && Xa(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: o, set: s } = Ya(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? To;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ct("elementProperties"))) return;
    const t = el(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ct("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ct("properties"))) {
      const i = this.properties, n = [...Ja(i), ...Qa(i)];
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
      for (const o of n) i.unshift(Mo(o));
    } else t !== void 0 && i.push(Mo(t));
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
    return Va(t, this.constructor.elementStyles), t;
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
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : ri).toAttribute(i, n.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = n.getPropertyOptions(o), r = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : ri;
      this._$Em = o;
      const a = r.fromAttribute(i, s.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, o = !1, s) {
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (s = this[t]), n ??= r.getPropertyOptions(t), !((n.hasChanged ?? Wn)(s, i) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, n)))) return;
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
st.elementStyles = [], st.shadowRootOptions = { mode: "open" }, st[Ct("elementProperties")] = /* @__PURE__ */ new Map(), st[Ct("finalized")] = /* @__PURE__ */ new Map(), il?.({ ReactiveElement: st }), (Ai.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Un = globalThis, Io = (e) => e, ai = Un.trustedTypes, Po = ai ? ai.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ys = "$lit$", Pe = `lit$${Math.random().toFixed(9).slice(2)}$`, Js = "?" + Pe, nl = `<${Js}>`, Ve = document, Rt = () => Ve.createComment(""), Ft = (e) => e === null || typeof e != "object" && typeof e != "function", Bn = Array.isArray, ol = (e) => Bn(e) || typeof e?.[Symbol.iterator] == "function", qi = `[ 	
\f\r]`, xt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Oo = /-->/g, zo = />/g, We = RegExp(`>|${qi}(?:([^\\s"'>=/]+)(${qi}*=${qi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Lo = /'/g, Ro = /"/g, Qs = /^(?:script|style|textarea|title)$/i, er = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), u = er(1), _ = er(2), be = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), Fo = /* @__PURE__ */ new WeakMap(), Ke = Ve.createTreeWalker(Ve, 129);
function tr(e, t) {
  if (!Bn(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Po !== void 0 ? Po.createHTML(t) : t;
}
const sl = (e, t) => {
  const i = e.length - 1, n = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = xt;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let c, h, d = -1, p = 0;
    for (; p < l.length && (r.lastIndex = p, h = r.exec(l), h !== null); ) p = r.lastIndex, r === xt ? h[1] === "!--" ? r = Oo : h[1] !== void 0 ? r = zo : h[2] !== void 0 ? (Qs.test(h[2]) && (o = RegExp("</" + h[2], "g")), r = We) : h[3] !== void 0 && (r = We) : r === We ? h[0] === ">" ? (r = o ?? xt, d = -1) : h[1] === void 0 ? d = -2 : (d = r.lastIndex - h[2].length, c = h[1], r = h[3] === void 0 ? We : h[3] === '"' ? Ro : Lo) : r === Ro || r === Lo ? r = We : r === Oo || r === zo ? r = xt : (r = We, o = void 0);
    const f = r === We && e[a + 1].startsWith("/>") ? " " : "";
    s += r === xt ? l + nl : d >= 0 ? (n.push(c), l.slice(0, d) + Ys + l.slice(d) + Pe + f) : l + Pe + (d === -2 ? a : f);
  }
  return [tr(e, s + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Dt {
  constructor({ strings: t, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let s = 0, r = 0;
    const a = t.length - 1, l = this.parts, [c, h] = sl(t, i);
    if (this.el = Dt.createElement(c, n), Ke.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = Ke.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(Ys)) {
          const p = h[r++], f = o.getAttribute(d).split(Pe), g = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: s, name: g[2], strings: f, ctor: g[1] === "." ? al : g[1] === "?" ? ll : g[1] === "@" ? cl : Mi }), o.removeAttribute(d);
        } else d.startsWith(Pe) && (l.push({ type: 6, index: s }), o.removeAttribute(d));
        if (Qs.test(o.tagName)) {
          const d = o.textContent.split(Pe), p = d.length - 1;
          if (p > 0) {
            o.textContent = ai ? ai.emptyScript : "";
            for (let f = 0; f < p; f++) o.append(d[f], Rt()), Ke.nextNode(), l.push({ type: 2, index: ++s });
            o.append(d[p], Rt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Js) l.push({ type: 2, index: s });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(Pe, d + 1)) !== -1; ) l.push({ type: 7, index: s }), d += Pe.length - 1;
      }
      s++;
    }
  }
  static createElement(t, i) {
    const n = Ve.createElement("template");
    return n.innerHTML = t, n;
  }
}
function ft(e, t, i = e, n) {
  if (t === be) return t;
  let o = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = Ft(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = o : i._$Cl = o), o !== void 0 && (t = ft(e, o._$AS(e, t.values), o, n)), t;
}
class rl {
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
    const { el: { content: i }, parts: n } = this._$AD, o = (t?.creationScope ?? Ve).importNode(i, !0);
    Ke.currentNode = o;
    let s = Ke.nextNode(), r = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new yt(s, s.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (c = new dl(s, this, t)), this._$AV.push(c), l = n[++a];
      }
      r !== l?.index && (s = Ke.nextNode(), r++);
    }
    return Ke.currentNode = Ve, o;
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
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = ft(this, t, i), Ft(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== be && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ol(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && Ft(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Ve.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Dt.createElement(tr(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const s = new rl(o, this), r = s.u(this.options);
      s.p(i), this.T(r), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = Fo.get(t.strings);
    return i === void 0 && Fo.set(t.strings, i = new Dt(t)), i;
  }
  k(t) {
    Bn(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const s of t) o === i.length ? i.push(n = new yt(this.O(Rt()), this.O(Rt()), this, this.options)) : n = i[o], n._$AI(s), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Io(t).nextSibling;
      Io(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Mi {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, o, s) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = m;
  }
  _$AI(t, i = this, n, o) {
    const s = this.strings;
    let r = !1;
    if (s === void 0) t = ft(this, t, i, 0), r = !Ft(t) || t !== this._$AH && t !== be, r && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = s[0], l = 0; l < s.length - 1; l++) c = ft(this, a[n + l], i, l), c === be && (c = this._$AH[l]), r ||= !Ft(c) || c !== this._$AH[l], c === m ? t = m : t !== m && (t += (c ?? "") + s[l + 1]), this._$AH[l] = c;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class al extends Mi {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class ll extends Mi {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class cl extends Mi {
  constructor(t, i, n, o, s) {
    super(t, i, n, o, s), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = ft(this, t, i, 0) ?? m) === be) return;
    const n = this._$AH, o = t === m && n !== m || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== m && (n === m || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class dl {
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
const hl = { I: yt }, pl = Un.litHtmlPolyfillSupport;
pl?.(Dt, yt), (Un.litHtmlVersions ??= []).push("3.3.3");
const ul = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = o = new yt(t.insertBefore(Rt(), s), s, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Gn = globalThis;
let te = class extends st {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ul(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return be;
  }
};
te._$litElement$ = !0, te.finalized = !0, Gn.litElementHydrateSupport?.({ LitElement: te });
const fl = Gn.litElementPolyfillSupport;
fl?.({ LitElement: te });
(Gn.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ci = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ml = { attribute: !0, type: String, converter: ri, reflect: !1, hasChanged: Wn }, gl = (e = ml, t, i) => {
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
  return (t, i) => typeof i == "object" ? gl(e, t, i) : ((n, o, s) => {
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
const yl = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function bt(e, t) {
  return (i, n, o) => {
    const s = (r) => r.renderRoot?.querySelector(e) ?? null;
    return yl(i, n, { get() {
      return s(this);
    } });
  };
}
const oe = (e) => e.split(".")[0], bl = /* @__PURE__ */ new Set([
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
]), _l = /* @__PURE__ */ new Set(["scene", "script", "button", "input_button"]);
function dn(e) {
  const t = oe(e);
  return t === "scene" ? "scene" : t === "script" ? "script" : "device";
}
function vl(e) {
  return bl.has(oe(e));
}
function hn(e) {
  return _l.has(oe(e));
}
function Ze(e) {
  if (!e) return !1;
  const t = e.state;
  if (t === "unavailable" || t === "unknown") return !1;
  switch (oe(e.entity_id)) {
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
function pn(e) {
  return !e || e.state === "unavailable";
}
function li(e, t) {
  return e.states[t]?.attributes.friendly_name ?? t;
}
function ir(e, t) {
  if (!t) return "nicht gefunden";
  if (e.formatEntityState)
    try {
      return e.formatEntityState(t);
    } catch {
    }
  const i = t.attributes.unit_of_measurement;
  return i ? `${t.state} ${i}` : t.state;
}
const xl = {
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
function ye(e, t, i) {
  if (i) return i;
  const n = e.states[t]?.attributes.icon;
  return n || (xl[oe(t)] ?? "mdi:help-circle-outline");
}
async function nr(e, t) {
  const i = oe(t), n = e.states[t];
  i === "lock" ? await e.callService("lock", n?.state === "locked" ? "unlock" : "lock", { entity_id: t }) : i === "cover" ? await e.callService("cover", "toggle", { entity_id: t }) : await e.callService("homeassistant", "toggle", { entity_id: t });
}
async function un(e, t) {
  const i = oe(t);
  i === "scene" ? await e.callService("scene", "turn_on", { entity_id: t }) : i === "script" ? await e.callService("script", "turn_on", { entity_id: t }) : (i === "button" || i === "input_button") && await e.callService(i, "press", { entity_id: t });
}
function ci(e, t) {
  e.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: t }, bubbles: !0, composed: !0 }));
}
var wl = Object.defineProperty, $l = Object.getOwnPropertyDescriptor, me = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? $l(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && wl(t, i, o), o;
};
const kl = 60;
let ae = class extends te {
  constructor() {
    super(...arguments), this.value = "", this.domains = [], this.exclude = [], this.placeholder = "Entität suchen …", this.clearOnSelect = !1, this._open = !1, this._filter = "", this._highlight = 0;
  }
  _results() {
    const e = this._filter.trim().toLowerCase(), t = new Set(this.exclude), i = [];
    for (const n of Object.keys(this.hass.states).sort()) {
      if (t.has(n) || this.domains.length && !this.domains.includes(oe(n))) continue;
      const o = this.hass.states[n].attributes.friendly_name ?? n;
      if (!(e && !n.toLowerCase().includes(e) && !o.toLowerCase().includes(e)) && (i.push({ id: n, name: o }), i.length >= kl))
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
        ${this.value && !this.clearOnSelect ? u`<ha-icon class="lead" .icon=${ye(this.hass, this.value)}></ha-icon>` : u`<ha-icon class="lead" icon="mdi:magnify"></ha-icon>`}
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
      (n, o) => u`<div
                    class="opt ${o === this._highlight ? "hl" : ""}"
                    @mousedown=${(s) => {
        s.preventDefault(), this._select(n.id);
      }}
                  >
                    <ha-icon .icon=${ye(this.hass, n.id)}></ha-icon>
                    <span class="txt"><span>${n.name}</span><small>${n.id}</small></span>
                  </div>`
    )}
          </div>` : m}
    `;
  }
};
ae.styles = ne`
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
me([
  A({ attribute: !1 })
], ae.prototype, "hass", 2);
me([
  A()
], ae.prototype, "value", 2);
me([
  A({ attribute: !1 })
], ae.prototype, "domains", 2);
me([
  A({ attribute: !1 })
], ae.prototype, "exclude", 2);
me([
  A()
], ae.prototype, "placeholder", 2);
me([
  A({ type: Boolean })
], ae.prototype, "clearOnSelect", 2);
me([
  k()
], ae.prototype, "_open", 2);
me([
  k()
], ae.prototype, "_filter", 2);
me([
  k()
], ae.prototype, "_highlight", 2);
me([
  bt("input")
], ae.prototype, "_input", 2);
ae = me([
  He("fp-entity-picker")
], ae);
const fn = 4, or = "#ef6c00", sr = "#8d6e63", Sl = [
  ["room", "Zimmer"],
  ["balcony", "Balkon"],
  ["hallway", "Flur"],
  ["staircase", "Treppenhaus"],
  ["bathroom", "Bad"],
  ["custom", "Eigene Bezeichnung"]
], tt = 100, rt = 60, mn = "#9e9e9e", gn = 150, rr = "#ffd9a0", Do = 30, El = { wallThickness: 12, grid: 10 };
function Al(e) {
  const { sashes: t, shutterEntity: i, shutterColor: n, ...o } = e;
  return o.type === "window" && !o.leaves && (t === 1 || t === 2) && (o.leaves = t === 2 ? [{ w: 1, hinge: "left" }, { w: 1, hinge: "right" }] : [{ w: 1 }]), o.type === "window" && i && !o.shutters && (o.shutters = [{ entity: i, side: "out", ...n ? { color: n } : {} }]), o.type === "door" && o.entity?.startsWith("lock.") && (o.lockEntity ??= o.entity, delete o.entity), o;
}
function yn(e) {
  const t = e ?? {};
  return {
    version: t.version ?? 1,
    canvas: t.canvas ?? { width: 1e3, height: 700 },
    settings: { ...El, ...t.settings ?? {} },
    furniture: t.furniture ?? [],
    floors: (t.floors ?? []).map((i) => ({
      ...i,
      name: i.name ?? "",
      walls: i.walls ?? [],
      openings: (i.openings ?? []).map(Al),
      areas: (i.areas ?? []).map((n) => ({ ...n, name: n.name ?? "", sidebar: n.sidebar ?? [] })),
      items: i.items ?? []
    }))
  };
}
function j(e) {
  return `${e}-${Math.random().toString(36).slice(2, 8)}`;
}
const Ml = /^[MmLlHhVvCcSsQqTtAaZz0-9eE.,\s+-]+$/, Cl = /^(#[0-9a-fA-F]{3,8}|[a-zA-Z]{3,20}|rgba?\([0-9.,\s%]+\)|var\(--[a-zA-Z0-9-]+\))$/, Tl = 2e4;
function ar(e) {
  return typeof e == "string" && e.length > 0 && e.length <= Tl && Ml.test(e);
}
function Nt(e) {
  return typeof e == "string" && Cl.test(e.trim());
}
function $e(e, t) {
  return t ? e?.find((i) => i.id === t) : void 0;
}
function lr(e, t) {
  const i = (e.rotation ?? 0) * Math.PI / 180, n = e.scale ?? 1, o = Math.cos(i), s = Math.sin(i);
  return { x: e.x + n * (t.x * o - t.y * s), y: e.y + n * (t.x * s + t.y * o) };
}
function di(e) {
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
function hi(e) {
  const t = e.parts.map(di);
  for (const i of e.lights ?? []) t.push({ x0: i.x, y0: i.y, x1: i.x, y1: i.y });
  return t.length ? {
    x0: Math.min(...t.map((i) => i.x0)),
    y0: Math.min(...t.map((i) => i.y0)),
    x1: Math.max(...t.map((i) => i.x1)),
    y1: Math.max(...t.map((i) => i.y1))
  } : { x0: -15, y0: -15, x1: 15, y1: 15 };
}
function cr(e, t) {
  const i = hi(t);
  return [
    { x: i.x0, y: i.y0 },
    { x: i.x1, y: i.y0 },
    { x: i.x1, y: i.y1 },
    { x: i.x0, y: i.y1 }
  ].map((n) => lr(e, n));
}
function dr(e, t) {
  const i = $e(t, e.furnitureType);
  return i?.lights?.length ? i.lights.map((n) => lr(e, n)) : [{ x: e.x, y: e.y }];
}
function Qt(e, t) {
  if (typeof e.glow == "boolean") return e.glow;
  if (!e.entity || oe(e.entity) !== "light") return !1;
  const i = $e(t, e.furnitureType);
  return !e.furnitureType || !i || !!i.lights?.length;
}
function hr(e, t) {
  return !e.furnitureType || !$e(t, e.furnitureType) ? !0 : !!(e.entity || e.icon || e.label);
}
function Il(e) {
  if (e.shape === "path" && e.d && e.vb) {
    const [t, i, n, o] = e.vb, s = e.w ?? n, r = e.h ?? o;
    return `translate(${e.x - s / 2} ${e.y - r / 2}) scale(${n ? s / n : 1} ${o ? r / o : 1}) translate(${-t} ${-i})`;
  }
}
function pi(e, t = {}) {
  const n = e.fill === "none" ? "none" : t.fill ?? (Nt(e.fill) ? e.fill : mn), o = Nt(e.stroke) && e.stroke !== "none", s = e.shape === "path" && e.vb && e.vb[2] ? (e.w ?? e.vb[2]) / e.vb[2] : 1, r = (e.strokeWidth ?? 1) / (s || 1), a = o ? `stroke:${e.stroke};stroke-width:${r};stroke-opacity:1;vector-effect:none` : m, l = e.opacity ?? 1, c = `fpart ${t.cls ?? ""}`;
  let h = m;
  if (e.shape === "rect") {
    const b = e.w ?? 0, x = e.h ?? 0;
    h = _`<rect class=${c} x=${e.x - b / 2} y=${e.y - x / 2} width=${b} height=${x} fill=${n} fill-opacity=${l} style=${a}></rect>`;
  } else if (e.shape === "circle")
    h = _`<circle class=${c} cx=${e.x} cy=${e.y} r=${e.r ?? 0} fill=${n} fill-opacity=${l} style=${a}></circle>`;
  else if (e.shape === "polygon") {
    const b = (e.points ?? []).map((x) => `${e.x + x.x},${e.y + x.y}`).join(" ");
    h = _`<polygon class=${c} points=${b} fill=${n} fill-opacity=${l} style=${a}></polygon>`;
  } else e.shape === "path" && ar(e.d) && (h = _`<path class=${c} d=${e.d} transform=${Il(e) ?? m} fill=${n} fill-opacity=${l}
      style=${a}></path>`);
  const d = di(e), p = t.iconSize ?? Math.max(8, Math.min(d.x1 - d.x0, d.y1 - d.y0) * 0.7), f = (d.x0 + d.x1) / 2, g = (d.y0 + d.y1) / 2;
  return _`${h}${e.icon ? _`<foreignObject class="fpart-icon" x=${f - p / 2} y=${g - p / 2} width=${p} height=${p} pointer-events="none">
          <div class="fo-icon" style="--mdc-icon-size:${p}px;width:${p}px;height:${p}px"><ha-icon .icon=${e.icon}></ha-icon></div>
        </foreignObject>` : m}`;
}
function bn(e, t, i = {}) {
  const n = e.rotation ?? 0, o = e.scale ?? 1;
  return _`<g class="furniture ${i.selected ? "selected" : ""}" data-furniture=${e.id}
      transform="translate(${e.x} ${e.y}) rotate(${n}) scale(${o})">
    ${t.parts.map((s) => pi(s, { fill: i.fill, cls: i.hit ? "hit" : "" }))}
  </g>`;
}
function pr(e, t) {
  return t && Nt(e.activeColor) ? e.activeColor : Nt(e.fillColor) ? e.fillColor : void 0;
}
const Kn = `
  .furniture { pointer-events: none; }
  .furniture .fpart { stroke: var(--fp-wall-color, var(--primary-text-color)); stroke-width: 1; stroke-opacity: .55; vector-effect: non-scaling-stroke; }
  .furniture.selected .fpart { stroke: var(--primary-color) !important; stroke-width: 2 !important; stroke-opacity: 1 !important; vector-effect: non-scaling-stroke !important; }
  .furniture .fpart-icon { color: var(--primary-text-color); opacity: .75; }
  .furniture .fo-icon { display: flex; align-items: center; justify-content: center; }
`, X = (e, t, i = 0) => {
  const n = parseFloat(e.getAttribute(t) ?? "");
  return Number.isFinite(n) ? n : i;
};
function _n(e, t) {
  for (let i = e; i; i = i.parentElement) {
    const n = i.getAttribute(t)?.trim() || new RegExp(`(?:^|;)\\s*${t}\\s*:\\s*([^;]+)`).exec(i.getAttribute("style") ?? "")?.[1]?.trim();
    if (n && n !== "inherit") return n;
  }
}
function No(e, t) {
  let i = _n(e, t);
  if (i?.toLowerCase() === "currentcolor" && (i = _n(e, "color")), !!i)
    return i === "none" ? "none" : Nt(i) && !i.toLowerCase().startsWith("url") ? i : void 0;
}
function Pl(e, t) {
  const i = {}, n = No(e, "fill"), o = No(e, "stroke");
  if (n && (i.fill = n), o && o !== "none") {
    i.stroke = o;
    const s = parseFloat(_n(e, "stroke-width") ?? "");
    i.strokeWidth = Math.max(0.2, Math.round((Number.isFinite(s) && s > 0 ? s : 1) * t * 100) / 100), n || (i.fill = i.fill ?? "none");
  } else n === "none" && (i.stroke = "#444", i.strokeWidth = 1);
  return i;
}
function Ol(e, t = 100) {
  const i = new DOMParser().parseFromString(e, "image/svg+xml"), n = i.documentElement;
  if (!n || n.nodeName.toLowerCase() !== "svg" || i.querySelector("parsererror")) throw new Error("Keine gültige SVG-Datei");
  const o = (n.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), r = o.length === 4 && o.every(Number.isFinite) && o[2] > 0 && o[3] > 0 ? o : [0, 0, X(n, "width", 100) || 100, X(n, "height", 100) || 100], a = t / Math.max(r[2], r[3]), l = r[0] + r[2] / 2, c = r[1] + r[3] / 2, h = [];
  let d = 0;
  const p = (g) => {
    if (h.length >= rt) {
      d++;
      return;
    }
    h.push({ id: j("p"), ...g });
  }, f = (g) => Math.round(g * 100) / 100;
  for (const g of Array.from(n.querySelectorAll("*"))) {
    const b = g.localName.toLowerCase(), x = Pl(g, a);
    if (b === "rect") {
      const v = X(g, "width"), w = X(g, "height");
      v > 0 && w > 0 && p({ shape: "rect", x: f((X(g, "x") + v / 2 - l) * a), y: f((X(g, "y") + w / 2 - c) * a), w: f(v * a), h: f(w * a), ...x });
    } else if (b === "circle") {
      const v = X(g, "r");
      v > 0 && p({ shape: "circle", x: f((X(g, "cx") - l) * a), y: f((X(g, "cy") - c) * a), r: f(v * a), ...x });
    } else if (b === "ellipse") {
      const v = X(g, "rx"), w = X(g, "ry");
      if (v > 0 && w > 0) {
        const y = X(g, "cx"), $ = X(g, "cy");
        p({
          shape: "path",
          d: `M ${y - v} ${$} a ${v} ${w} 0 1 0 ${2 * v} 0 a ${v} ${w} 0 1 0 ${-2 * v} 0 Z`,
          vb: [y - v, $ - w, 2 * v, 2 * w],
          x: f((y - l) * a),
          y: f(($ - c) * a),
          w: f(2 * v * a),
          h: f(2 * w * a),
          ...x
        });
      }
    } else if (b === "polygon") {
      const v = (g.getAttribute("points") ?? "").split(/[\s,]+/).map(Number).filter(Number.isFinite), w = [];
      for (let y = 0; y + 1 < v.length; y += 2) w.push({ x: f((v[y] - l) * a), y: f((v[y + 1] - c) * a) });
      w.length >= 3 && p({ shape: "polygon", x: 0, y: 0, points: w, ...x });
    } else if (b === "path") {
      const v = (g.getAttribute("d") ?? "").trim();
      if (!ar(v)) {
        d++;
        continue;
      }
      p({ shape: "path", d: v, vb: r, x: 0, y: 0, w: f(r[2] * a), h: f(r[3] * a), ...x });
    } else if (b === "line" || b === "polyline") {
      const v = b === "line" ? [X(g, "x1"), X(g, "y1"), X(g, "x2"), X(g, "y2")] : (g.getAttribute("points") ?? "").split(/[\s,]+/).map(Number).filter(Number.isFinite);
      if (v.length >= 4) {
        let w = `M ${v[0]} ${v[1]}`;
        for (let $ = 2; $ + 1 < v.length; $ += 2) w += ` L ${v[$]} ${v[$ + 1]}`;
        const y = { ...x, fill: "none" };
        y.stroke || Object.assign(y, { stroke: "#444", strokeWidth: 1 }), p({ shape: "path", d: w, vb: r, x: 0, y: 0, w: f(r[2] * a), h: f(r[3] * a), ...y });
      } else d++;
    } else ["image", "use", "text"].includes(b) && d++;
  }
  if (!h.length) throw new Error("Die SVG enthält keine unterstützten Formen (path, rect, circle, ellipse, polygon)");
  return { parts: h, skipped: d };
}
const zl = 4, Ll = 10, vn = { scale: 1, txPercent: 0, tyPercent: 0 };
function Rl(e, t, i, n = 0.15, o = zl, s) {
  if (!e.length) return vn;
  const r = e.map(($) => $.x), a = e.map(($) => $.y), l = Math.min(...r), c = Math.max(...r), h = Math.min(...a), d = Math.max(...a), p = Math.max(c - l, d - h) * n, f = Math.max(c - l + p * 2, 1), g = Math.max(d - h + p * 2, 1), b = Math.max(1, Math.min(o, Math.min(t / f, i / g))), x = s ?? b;
  if (!Number.isFinite(x)) return vn;
  const v = (l + c) / 2 / t, w = (h + d) / 2 / i, y = ($) => Math.min(0, Math.max(100 * (1 - x), $));
  return {
    scale: x,
    txPercent: y(50 - x * v * 100),
    tyPercent: y(50 - x * w * 100)
  };
}
function Fl(e) {
  const t = e.zoom;
  if (!(typeof t != "number" || !Number.isFinite(t)))
    return Math.max(1, Math.min(Ll, t));
}
function qn(e) {
  if (!e.length) return { x: 0, y: 0 };
  const t = e.reduce((i, n) => ({ x: i.x + n.x, y: i.y + n.y }), { x: 0, y: 0 });
  return { x: t.x / e.length, y: t.y / e.length };
}
function ze(e, t, i) {
  let n = !1;
  for (let o = 0, s = e.length - 1; o < e.length; s = o++) {
    const r = e[o], a = e[s];
    r.y > i != a.y > i && t < (a.x - r.x) * (i - r.y) / (a.y - r.y) + r.x && (n = !n);
  }
  return n;
}
function Ho(e) {
  let t = 0;
  for (let i = 0, n = e.length - 1; i < e.length; n = i++)
    t += (e[n].x + e[i].x) * (e[n].y - e[i].y);
  return Math.abs(t / 2);
}
function Dl(e, t) {
  return e.area ? t.find((n) => n.id === e.area || n.name === e.area) : t.filter((n) => ze(n.points, e.x, e.y)).sort((n, o) => Ho(n.points) - Ho(o.points))[0];
}
function Nl(e, t, i) {
  return e.showOnlyWhenZoomed ? t ? Dl(e, i)?.id !== t.id : !0 : !1;
}
function de(e, t) {
  return t > 0 ? Math.round(e / t) * t : e;
}
function F(e, t) {
  return Math.hypot(e.x - t.x, e.y - t.y);
}
function De(e, t, i) {
  const n = i.x - t.x, o = i.y - t.y, s = n * n + o * o, r = s === 0 ? 0 : Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * o) / s));
  return { point: { x: t.x + r * n, y: t.y + r * o }, t: r };
}
function Vi(e, t, i) {
  let n;
  for (const o of t) {
    const { point: s, t: r } = De(e, { x: o.x1, y: o.y1 }, { x: o.x2, y: o.y2 }), a = F(e, s);
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
function Hl(e, t, i, n = []) {
  let o, s = i;
  for (const r of t)
    if (!n.includes(r))
      for (const a of [
        { x: r.x1, y: r.y1 },
        { x: r.x2, y: r.y2 }
      ]) {
        const l = F(e, a);
        l <= s && (o = a, s = l);
      }
  return o;
}
function jl(e, t, i, n = []) {
  let o, s = i;
  for (const r of t)
    for (const a of r.points) {
      if (n.includes(a)) continue;
      const l = F(e, a);
      l <= s && (o = a, s = l);
    }
  return o && { x: o.x, y: o.y };
}
function Zi(e, t, i = 8) {
  const n = Math.abs(Math.atan2(t.y - e.y, t.x - e.x) * 180 / Math.PI);
  return n < i || n > 180 - i ? { x: t.x, y: e.y } : Math.abs(n - 90) < i ? { x: e.x, y: t.y } : t;
}
function xn(e, t) {
  const { width: i, height: n } = t.canvas;
  let o = 1 / 0, s = 1 / 0, r = -1 / 0, a = -1 / 0;
  const l = (f, g, b = 0) => {
    o = Math.min(o, f - b), s = Math.min(s, g - b), r = Math.max(r, f + b), a = Math.max(a, g + b);
  }, c = Math.max(i, n), h = t.settings?.wallThickness ?? 12;
  for (const f of e.walls) {
    const g = (f.thickness ?? h) / 2;
    l(f.x1, f.y1, g), l(f.x2, f.y2, g);
  }
  for (const f of e.areas) for (const g of f.points) l(g.x, g.y);
  for (const f of e.openings) {
    const g = f.angle * Math.PI / 180, b = Math.cos(g), x = Math.sin(g), v = f.swing === "out" ? -1 : 1, w = 30, y = v > 0 ? -w : -(f.length + w), $ = v > 0 ? f.length + w : w;
    for (const E of [-f.length / 2, f.length / 2])
      for (const T of [y, $]) l(f.x + E * b - T * x, f.y + E * x + T * b);
  }
  const d = c * 0.04;
  for (const f of e.items) {
    const g = f.furnitureType ? t.furniture?.find((b) => b.id === f.furnitureType) : void 0;
    if (g) for (const b of cr(f, g)) l(b.x, b.y);
    else l(f.x, f.y, d);
  }
  if (o === 1 / 0) {
    const f = c * 0.03;
    return { x: -f, y: -f, w: i + 2 * f, h: n + 2 * f };
  }
  const p = Math.max(r - o, a - s) * 0.03;
  return { x: o - p, y: s - p, w: r - o + 2 * p, h: a - s + 2 * p };
}
function ur(e, t, i) {
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
function Xi(e) {
  if (e.length !== 4) return;
  const t = [...new Set(e.map((n) => n.x))], i = [...new Set(e.map((n) => n.y))];
  if (!(t.length !== 2 || i.length !== 2))
    return { x: Math.min(...t), y: Math.min(...i), w: Math.abs(t[0] - t[1]), h: Math.abs(i[0] - i[1]) };
}
function Wl(e, t) {
  let i = 1 / 0;
  for (let n = 0; n < e.length; n++) {
    const o = e[n], s = e[(n + 1) % e.length];
    i = Math.min(i, F(t, De(t, o, s).point));
  }
  return i;
}
function Ul(e, t, i = [], n, o = 40, s = 20) {
  if (e.length < 3) return t.map(() => ({ x: 0, y: 0 }));
  const r = qn(e), a = e.map((v) => v.x), l = e.map((v) => v.y), c = Math.min(...a), h = Math.max(...a), d = Math.min(...l), p = Math.max(...l), f = Math.max(5, Math.min(h - c, p - d) / 40), g = [];
  for (let v = d + f / 2; v < p; v += f)
    for (let w = c + f / 2; w < h; w += f) {
      const y = { x: Math.round(w), y: Math.round(v) };
      ze(e, y.x, y.y) && g.push(y);
    }
  const b = [...i], x = [];
  for (const v of t) {
    let w;
    for (const $ of [1, 0.6, 0.3]) {
      let E = 1 / 0;
      for (const T of g) {
        const I = Wl(e, T);
        if (I < s * $ || b.some((Q) => F(T, Q) < o * $) || n && F(T, n) < o * 1.5 * $) continue;
        const R = v.light ? F(T, r) : I;
        R < E && (E = R, w = T);
      }
      if (w) break;
    }
    const y = w ?? r;
    b.push(y), x.push({ x: y.x, y: y.y });
  }
  return x;
}
function Bl(e, t, i, n = []) {
  let o, s = i;
  for (const r of t) {
    if (n.includes(r)) continue;
    const a = De(e, { x: r.x1, y: r.y1 }, { x: r.x2, y: r.y2 }), l = F(e, a.point);
    l <= s && (o = a.point, s = l);
  }
  return o && { x: Math.round(o.x * 100) / 100, y: Math.round(o.y * 100) / 100 };
}
function Gl(e, t, i, n = 0.5) {
  const o = F(e, t);
  if (o < 1) return [];
  const s = [];
  for (const c of i) {
    const h = { x: c.x1, y: c.y1 }, d = { x: c.x2, y: c.y2 }, p = De(h, e, t), f = De(d, e, t);
    if (F(h, p.point) > n || F(d, f.point) > n) continue;
    const g = Math.min(p.t, f.t), b = Math.max(p.t, f.t);
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
function Tt(e, t, i, n = 0.5) {
  return F(e, De(e, t, i).point) <= n;
}
function fr(e, t, i = 0.5) {
  const n = e.points;
  return t.filter((o) => {
    const s = { x: o.x1, y: o.y1 }, r = { x: o.x2, y: o.y2 };
    return n.some((a, l) => {
      const c = n[(l + 1) % n.length];
      return Tt(s, a, c, i) && Tt(r, a, c, i);
    });
  });
}
function jo(e, t) {
  return t.filter((i) => fr(i, [e]).length > 0);
}
var Kl = Object.defineProperty, ql = Object.getOwnPropertyDescriptor, J = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? ql(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Kl(t, i, o), o;
};
const Wo = [
  { id: "select", icon: "mdi:cursor-default", label: "Auswahl", hint: "Teile und Leuchtpunkte anklicken und ziehen. Griffe ändern die Größe. Alt hält den Fang aus." },
  { id: "rect", icon: "mdi:rectangle-outline", label: "Rechteck", hint: "Von Ecke zu Ecke ziehen." },
  { id: "circle", icon: "mdi:circle-outline", label: "Kreis", hint: "Vom Mittelpunkt zum Rand ziehen." },
  { id: "polygon", icon: "mdi:vector-polygon", label: "Polygon", hint: "Eckpunkte anklicken; Doppelklick, Enter oder Klick auf den ersten Punkt schließt die Form." },
  { id: "light", icon: "mdi:lightbulb-on-outline", label: "Leuchtpunkt", hint: "Klick setzt einen Leuchtpunkt – dort scheint das Licht, wenn dem Möbelstück ein Licht zugewiesen ist." }
], Vl = [1, 2, 5, 10, 25], Uo = 50, Bo = 300, Go = 7, Zl = ["mdi:sofa", "mdi:bed", "mdi:desk-lamp", "mdi:floor-lamp", "mdi:television", "mdi:table-furniture", "mdi:chair-rolling", "mdi:flower"], K = (e) => Math.round(e * 100) / 100, wt = (e) => JSON.parse(JSON.stringify(e));
let q = class extends te {
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
      const t = $e(this.plan?.furniture, this.openId);
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
    return Bo / this._zoom / t;
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
    if (this._list.length >= tt) return void (this._notice = `Höchstens ${tt} Vorlagen`);
    this._edit({ id: j("m"), name: "", parts: [] }, !0);
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
    if (this._list.length >= tt) return void (this._notice = `Höchstens ${tt} Vorlagen`);
    const t = wt(e);
    t.id = j("m"), t.name = `${e.name} Kopie`.slice(0, 100), t.parts.forEach((i) => i.id = j("p")), this._emit([...this._list, t]);
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
        const { parts: o, skipped: s } = Ol(await n.text());
        if (t) {
          if (this._list.length >= tt) throw new Error(`Höchstens ${tt} Vorlagen`);
          this._edit({ id: j("m"), name: n.name.replace(/\.svg$/i, ""), parts: o }, !0), this._dirty = !0;
        } else if (this._editing) {
          if (this._editing.parts.length + o.length > rt) throw new Error(`Höchstens ${rt} Teile je Vorlage`);
          this._pushUndo(), this._editing = { ...this._editing, parts: [...this._editing.parts, ...o] }, this._sel = { kind: "part", id: o[0].id };
        }
        this._notice = s ? `${s} nicht unterstützte Elemente wurden übersprungen` : void 0;
      } catch (o) {
        this._notice = o instanceof Error ? o.message : "Import fehlgeschlagen";
      }
  }
  // ---------------------------------------------------------------- Bearbeiten
  _pushUndo() {
    this._editing && (this._undo.push(JSON.stringify(this._editing)), this._undo.length > Uo && this._undo.shift(), this._redo = [], this._dirty = !0);
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
    if (!e || (this._editing?.parts.length ?? 0) >= rt) return;
    const t = wt(e);
    t.id = j("p"), t.x += 10, t.y += 10, this._mutate((i) => i.parts.push(t)), this._sel = { kind: "part", id: t.id };
  }
  _order(e) {
    const t = this._part?.id;
    t && this._mutate((i) => {
      const n = i.parts.findIndex((s) => s.id === t), o = n + e;
      o < 0 || o >= i.parts.length || ([i.parts[n], i.parts[o]] = [i.parts[o], i.parts[n]]);
    });
  }
  _addPart(e) {
    if ((this._editing?.parts.length ?? 0) >= rt) return void (this._notice = `Höchstens ${rt} Teile je Vorlage`);
    const t = j("p");
    this._mutate((i) => i.parts.push({ id: t, fill: mn, ...e })), this._sel = { kind: "part", id: t };
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
      const n = di(i);
      t.push({ x: n.x0, y: n.y0 }, { x: n.x1, y: n.y1 }, { x: (n.x0 + n.x1) / 2, y: (n.y0 + n.y1) / 2 });
    }
    for (const i of this._editing?.lights ?? []) t.push(i);
    return t;
  }
  _snap(e, t, i) {
    if (t.altKey)
      return this._guides = [], e;
    const n = ur(e, this._refs(i), 6 * this._upp);
    return this._guides = n.guides, { x: n.x ?? de(e.x, this._grid), y: n.y ?? de(e.y, this._grid) };
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
      if (this._poly.length >= 3 && Math.hypot(s.x - this._poly[0].x, s.y - this._poly[0].y) <= Go * this._upp) return this._finishPolygon();
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
    if (i.moved || (this._undo.push(i.snapshot), this._undo.length > Uo && this._undo.shift(), this._redo = [], this._dirty = !0, i.moved = !0), i.mode === "light") {
      const s = this._snap(t, e), r = [...n.lights ?? []];
      r[i.index] = s, this._editing = { ...n, lights: r };
      return;
    }
    const o = n.parts.find((s) => s.id === i.orig.id);
    if (i.mode === "move") {
      const s = t.x - i.start.x, r = t.y - i.start.y, a = this._snap({ x: i.orig.x + s, y: i.orig.y + r }, e, o.id);
      o.x = K(a.x), o.y = K(a.y);
    } else if (i.mode === "resize") {
      const s = this._snap(t, e, o.id);
      o.shape === "circle" ? o.r = K(Math.max(1, Math.hypot(s.x - o.x, s.y - o.y))) : (o.w = K(Math.max(2, Math.abs(s.x - o.x) * 2)), o.h = K(Math.max(2, Math.abs(s.y - o.y) * 2)));
    } else if (i.mode === "vertex") {
      const s = this._snap({ x: t.x, y: t.y }, e, o.id);
      o.points = (o.points ?? []).map((r, a) => a === i.index ? { x: K(s.x - o.x), y: K(s.y - o.y) } : r);
    }
    this._editing = { ...n };
  }
  _onPointerUp(e) {
    const t = this._drag;
    if (!(!t || t.pointerId !== e.pointerId) && (this._drag = void 0, this._guides = [], t.mode === "shape" && this._rubber)) {
      const { a: i, b: n } = this._rubber;
      if (this._rubber = void 0, this._tool === "rect") {
        const o = Math.abs(n.x - i.x), s = Math.abs(n.y - i.y);
        o >= 2 && s >= 2 && this._addPart({ shape: "rect", x: K((i.x + n.x) / 2), y: K((i.y + n.y) / 2), w: K(o), h: K(s) });
      } else {
        const o = Math.hypot(n.x - i.x, n.y - i.y);
        o >= 1 && this._addPart({ shape: "circle", x: i.x, y: i.y, r: K(o) });
      }
      this._tool = "select";
    }
  }
  _finishPolygon() {
    if (this._poly.length < 3) return;
    const e = this._poly, t = K(e.reduce((n, o) => n + o.x, 0) / e.length), i = K(e.reduce((n, o) => n + o.y, 0) / e.length);
    this._poly = [], this._addPart({ shape: "polygon", x: t, y: i, points: e.map((n) => ({ x: K(n.x - t), y: K(n.y - i) })) }), this._tool = "select";
  }
  _onWheel(e) {
    e.preventDefault(), this._zoom = Math.max(0.25, Math.min(8, this._zoom * (e.deltaY < 0 ? 1.15 : 1 / 1.15)));
  }
  // ---------------------------------------------------------------- Darstellung
  render() {
    return this._editing ? this._renderEdit(this._editing) : this._renderList();
  }
  _thumb(e) {
    const t = hi(e), i = Math.max(t.x1 - t.x0, t.y1 - t.y0) * 0.1 + 2;
    return u`<svg class="thumb" viewBox="${t.x0 - i} ${t.y0 - i} ${t.x1 - t.x0 + 2 * i} ${t.y1 - t.y0 + 2 * i}">
      <g class="furniture">${e.parts.map((n) => pi(n))}</g>
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
    return this._notice ? u`<div class="notice">${this._notice}<button @click=${() => this._notice = void 0}>OK</button></div>` : m;
  }
  _renderEdit(e) {
    const t = Wo.find((n) => n.id === this._tool), i = Bo / this._zoom / 2;
    return u`
      <div class="toolbar">
        <button class="icon-btn" title="Zur Bibliothek" @click=${this._leaveEdit}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <div class="main-title">${this._isNew ? "Neue Vorlage" : "Vorlage bearbeiten"}${this._dirty ? u`<span class="dirty"> • ungespeichert</span>` : m}</div>
        <button class="icon-btn" title="Rückgängig (Strg+Z)" ?disabled=${!this._undo.length} @click=${this._doUndo}><ha-icon icon="mdi:undo"></ha-icon></button>
        <button class="icon-btn" title="Wiederholen (Strg+Y)" ?disabled=${!this._redo.length} @click=${this._doRedo}><ha-icon icon="mdi:redo"></ha-icon></button>
        <button class="save" @click=${this._apply}>Übernehmen</button>
      </div>
      ${this._noticeBar()}
      <div class="body">
        <div class="tools">
          ${Wo.map(
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
          ${o / i >= 4 ? _`<rect width=${s} height=${s} fill="url(#fg-minor)"></rect>` : m}
          <path d="M ${s} 0 L 0 0 0 ${s}" class="grid-major"></path>
        </pattern>
      </defs>
      <rect class="sheet" x=${-t} y=${-t} width=${2 * t} height=${2 * t}></rect>
      <rect x=${-t} y=${-t} width=${2 * t} height=${2 * t} fill="url(#fg-major)" pointer-events="none"></rect>
      <line class="axis" x1=${-t} x2=${t} y1="0" y2="0" stroke-width=${i}></line>
      <line class="axis" y1=${-t} y2=${t} x1="0" x2="0" stroke-width=${i}></line>
      <g class="furniture editing">
        ${e.parts.map(
      (l) => _`<g data-part=${l.id} class="part ${r?.kind === "part" && r.id === l.id ? "selected" : ""}">${pi(l, { cls: "hit" })}</g>`
    )}
      </g>
      ${(e.lights ?? []).map(
      (l, c) => _`<g data-light=${c} class="light-mark ${r?.kind === "light" && r.index === c ? "selected" : ""}">
          <circle cx=${l.x} cy=${l.y} r=${9 * i} class="light-hit"></circle>
          <circle cx=${l.x} cy=${l.y} r=${4 * i} class="light-dot"></circle>
          <circle cx=${l.x} cy=${l.y} r=${8 * i} class="light-ring" stroke-width=${i * 1.5}></circle>
        </g>`
    )}
      ${a ? this._renderHandles(a, i) : m}
      ${this._renderPreview(i)}
      ${this._guides.map(
      (l) => l.axis === "x" ? _`<line class="guide" x1=${l.value} x2=${l.value} y1=${-t} y2=${t} stroke-width=${i}></line>` : _`<line class="guide" y1=${l.value} y2=${l.value} x1=${-t} x2=${t} stroke-width=${i}></line>`
    )}
    `;
  }
  _renderHandles(e, t) {
    const i = Go * t;
    if (e.shape === "polygon")
      return _`${(e.points ?? []).map((r, a) => _`<circle class="handle" data-handle="v${a}" cx=${e.x + r.x} cy=${e.y + r.y} r=${i} stroke-width=${2 * t}></circle>`)}`;
    const n = di(e), o = e.shape === "circle" ? e.x + (e.r ?? 0) : n.x1, s = e.shape === "circle" ? e.y : n.y1;
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
    return m;
  }
  _num(e, t, i, n = 1) {
    return u`<label class="field"><span>${e}</span>
      <input type="number" step="1" min=${n} .value=${i === void 0 ? "" : String(K(i))}
        @change=${(o) => this._setPartNum(t, o.target.value, n)} /></label>`;
  }
  _setPartNum(e, t, i) {
    if (t === "") return;
    const n = Number(t);
    Number.isFinite(n) && this._setPart(e, e === "x" || e === "y" ? n : Math.max(i, n));
  }
  _renderProps(e) {
    const t = this._part, i = this._sel, n = hi(e);
    return u`
      <h3>Vorlage</h3>
      <label class="field"><span>Name</span>
        <input type="text" maxlength="100" .value=${e.name} placeholder="z. B. Stehlampe"
          @input=${(o) => {
      this._editing = { ...e, name: o.target.value }, this._dirty = !0;
    }} /></label>
      <label class="field"><span>Raster (cm)</span>
        <select @change=${(o) => this._grid = Number(o.target.value)}>
          ${Vl.map((o) => u`<option value=${o} ?selected=${o === this._grid}>${o}</option>`)}
        </select></label>
      <p class="muted">${e.parts.length} Teile · ${K(n.x1 - n.x0)} × ${K(n.y1 - n.y0)} cm · ${(e.lights ?? []).length} Leuchtpunkt${(e.lights ?? []).length === 1 ? "" : "e"}</p>
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
            ${t.shape === "rect" || t.shape === "path" ? u`<div class="grid2">${this._num("Breite", "w", t.w)} ${this._num("Höhe", "h", t.h)}</div>` : m}
            ${t.shape === "circle" ? this._num("Radius", "r", t.r) : m}
            <label class="field color"><span>Farbe</span>
              <input type="color" .value=${t.fill?.startsWith("#") && t.fill.length === 7 ? t.fill : mn}
                @change=${(o) => this._setPart("fill", o.target.value)} /></label>
            <label class="field"><span>Deckkraft ${Math.round((t.opacity ?? 1) * 100)} %</span>
              <input type="range" min="0.05" max="1" step="0.05" .value=${String(t.opacity ?? 1)}
                @change=${(o) => this._setPart("opacity", Number(o.target.value))} /></label>
            <div class="field"><span>Icon als Symbol (optional)</span>
              <div class="icon-input"><ha-icon .icon=${t.icon ?? "mdi:help-circle-outline"}></ha-icon>
                <input type="text" .value=${t.icon ?? ""} placeholder="mdi:…" @change=${(o) => this._setPart("icon", o.target.value.trim())} /></div>
              <div class="icon-grid">${Zl.map((o) => u`<button class="icon-pick ${t.icon === o ? "active" : ""}" title=${o} @click=${() => this._setPart("icon", o)}><ha-icon .icon=${o}></ha-icon></button>`)}</div>
            </div>` : u`<p class="muted">Teil oder Leuchtpunkt anklicken, oder links ein Werkzeug wählen und zeichnen. Mehrere Teile ergeben zusammen ein Möbelstück; der Mittelpunkt (0/0) ist der Ankerpunkt beim Platzieren und Drehen.</p>`}
    `;
  }
};
q.styles = [
  Se(Kn),
  ne`
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
J([
  A({ attribute: !1 })
], q.prototype, "plan", 2);
J([
  A({ attribute: !1 })
], q.prototype, "hass", 2);
J([
  A()
], q.prototype, "openId", 2);
J([
  k()
], q.prototype, "_editing", 2);
J([
  k()
], q.prototype, "_isNew", 2);
J([
  k()
], q.prototype, "_dirty", 2);
J([
  k()
], q.prototype, "_sel", 2);
J([
  k()
], q.prototype, "_tool", 2);
J([
  k()
], q.prototype, "_grid", 2);
J([
  k()
], q.prototype, "_zoom", 2);
J([
  k()
], q.prototype, "_poly", 2);
J([
  k()
], q.prototype, "_cursor", 2);
J([
  k()
], q.prototype, "_rubber", 2);
J([
  k()
], q.prototype, "_guides", 2);
J([
  k()
], q.prototype, "_notice", 2);
J([
  bt("svg.canvas")
], q.prototype, "_svg", 2);
q = J([
  He("fp-furniture-editor")
], q);
const Ko = 0.18, qo = 0.6, Vo = 0.5;
function Xl(e, t) {
  if (!t || t.state !== "on") return;
  const i = t.attributes ?? {}, n = i.brightness, o = typeof n == "number" && Number.isFinite(n) ? Math.max(0, Math.min(255, n)) / 255 : void 0, s = o === void 0 ? qo : Ko + (qo - Ko) * o, a = (typeof e.glowRadius == "number" && e.glowRadius > 0 ? e.glowRadius : gn) * (o === void 0 ? 1 : Vo + (1 - Vo) * o), l = i.rgb_color;
  if (Array.isArray(l) && l.length >= 3 && l.slice(0, 3).every((c) => typeof c == "number" && Number.isFinite(c))) {
    const c = (h) => Math.max(0, Math.min(255, Math.round(h)));
    return { color: `rgb(${c(l[0])}, ${c(l[1])}, ${c(l[2])})`, opacity: s, radius: a };
  }
  return { color: e.glowColor || rr, opacity: s, radius: a };
}
function mr(e, t, i) {
  const n = i.x2 - i.x1, o = i.y2 - i.y1, s = n * n + o * o, r = s === 0 ? 0 : Math.max(0, Math.min(1, ((e - i.x1) * n + (t - i.y1) * o) / s));
  return Math.hypot(e - (i.x1 + r * n), t - (i.y1 + r * o));
}
function Yl(e, t, i, n, o) {
  const s = o.x2 - o.x1, r = o.y2 - o.y1, a = i * r - n * s;
  if (Math.abs(a) < 1e-12) return;
  const l = o.x1 - e, c = o.y1 - t, h = (l * r - c * s) / a, d = (l * n - c * i) / a;
  if (!(h <= 1e-9 || d < 0 || d > 1))
    return h;
}
function Jl(e, t, i, n, o) {
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
function gr(e, t, i, n, o = () => 12) {
  const s = n.filter((p) => {
    const f = mr(e, t, p);
    return f < i && f > o(p) / 2 + 1;
  });
  if (!s.length) return;
  const r = i * 1.01, a = [
    { id: "b1", x1: e - r, y1: t - r, x2: e + r, y2: t - r },
    { id: "b2", x1: e + r, y1: t - r, x2: e + r, y2: t + r },
    { id: "b3", x1: e + r, y1: t + r, x2: e - r, y2: t + r },
    { id: "b4", x1: e - r, y1: t + r, x2: e - r, y2: t - r }
  ], l = s.map((p) => Jl(p, e - r, t - r, e + r, t + r)).filter((p) => !!p);
  if (!l.length) return;
  const c = [...l, ...a], h = [];
  for (const p of c)
    for (const [f, g] of [
      [p.x1, p.y1],
      [p.x2, p.y2]
    ]) {
      const b = Math.atan2(g - t, f - e);
      for (const x of [b - 1e-4, b, b + 1e-4]) {
        const v = Math.cos(x), w = Math.sin(x);
        let y = 1 / 0;
        for (const $ of c) {
          const E = Yl(e, t, v, w, $);
          E !== void 0 && E < y && (y = E);
        }
        y < 1 / 0 && h.push({ x: e + v * y, y: t + w * y, a: x });
      }
    }
  h.sort((p, f) => p.a - f.a);
  const d = (p) => Math.round(p * 100) / 100;
  return h.map(({ x: p, y: f }) => ({ x: d(p), y: d(f) }));
}
function yr(e, t) {
  return e.type !== "door" ? !1 : e.entity ? Ze(t?.states[e.entity]) : !0;
}
function br(e, t, i, n = () => 12) {
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
      if (mr(g.x, g.y, r) > n(r) / 2 + 1) continue;
      const b = ((g.x - r.x1) * a + (g.y - r.y1) * l) / c, x = g.length / 2 / h, v = Math.max(0, b - x), w = Math.min(1, b + x);
      w > v && d.push([v, w]);
    }
    if (!d.length) {
      s.push(r);
      continue;
    }
    d.sort((g, b) => g[0] - b[0]);
    let p = 0;
    const f = (g, b) => {
      b - g > 1e-6 && s.push({ ...r, x1: r.x1 + a * g, y1: r.y1 + l * g, x2: r.x1 + a * b, y2: r.y1 + l * b });
    };
    for (const [g, b] of d)
      f(p, g), p = Math.max(p, b);
    f(p, 1);
  }
  return s;
}
function Ql(e) {
  if (!e || e.state === "unavailable" || e.state === "unknown") return;
  const t = e.attributes?.current_position;
  if (typeof t == "number" && Number.isFinite(t)) return 1 - Math.max(0, Math.min(100, t)) / 100;
  if (e.state === "closed") return 1;
  if (e.state === "open") return 0;
  if (e.state === "opening" || e.state === "closing") return 0.5;
}
function ec(e, t, i, n) {
  const o = e.items.filter((a) => a.entity && Qt(a, t.furniture)).flatMap((a) => {
    const l = Xl(a, i.states[a.entity]);
    return l ? dr(a, t.furniture).map((c) => ({ it: { ...a, x: c.x, y: c.y }, paint: l })) : [];
  });
  if (!o.length) return m;
  const s = (a) => a.thickness ?? t.settings.wallThickness, r = br(e.walls, e.openings, (a) => yr(a, i), s);
  return _`<g class="fp-glows">
    ${o.map(({ it: a, paint: l }, c) => {
    const h = `${n}-${c}`, d = gr(a.x, a.y, l.radius, r, s);
    return _`
        ${d ? _`<clipPath id="${h}-clip"><polygon points=${d.map((p) => `${p.x},${p.y}`).join(" ")}></polygon></clipPath>` : m}
        <radialGradient id=${h} gradientUnits="userSpaceOnUse" cx=${a.x} cy=${a.y} r=${l.radius}>
          <stop offset="0" stop-color=${l.color} stop-opacity=${l.opacity}></stop>
          <stop offset="1" stop-color=${l.color} stop-opacity="0"></stop>
        </radialGradient>
        <circle class="fp-glow" cx=${a.x} cy=${a.y} r=${l.radius} fill="url(#${h})"
                clip-path=${d ? `url(#${h}-clip)` : m}></circle>`;
  })}
  </g>`;
}
const Zo = 10;
function wn(e) {
  return e.leaves?.length ? e.leaves : [{ w: 1 }];
}
function $n(e) {
  const t = wn(e), i = t.reduce((o, s) => o + Math.max(s.w, 1e-4), 0);
  let n = -e.length / 2;
  return t.map((o, s) => {
    const r = Math.max(o.w, 1e-4) / i * e.length, a = {
      index: s,
      x0: n,
      x1: n + r,
      hinge: o.hinge ?? tc(e, s, t.length),
      entity: o.entity || e.entity || void 0
    };
    return n += r, a;
  });
}
function tc(e, t, i) {
  return i === 1 ? e.hinge ?? "left" : t === i - 1 ? "right" : "left";
}
function _r(e, t) {
  if (!e || !t) return { open: !1, unknown: !1 };
  const i = t.states[e], n = !i || i.state === "unavailable" || i.state === "unknown";
  return { open: !n && Ze(i), unknown: n };
}
function ic(e, t) {
  return _r(e.entity, t);
}
function nc(e) {
  return !e || e.state === "unavailable" || e.state === "unknown" ? "unknown" : e.state === "locked" ? "locked" : "unlocked";
}
function Yi(e) {
  return e.type === "window" && !e.entity && !e.leaves?.some((t) => t.entity);
}
function oc(e, t) {
  const i = Math.max(1, Math.min(fn, Math.round(t))), n = e.length ? e.map((s) => ({ ...s })) : [{ w: 1 }];
  if (i <= n.length) return n.slice(0, i);
  const o = n.reduce((s, r) => s + r.w, 0) / n.length;
  for (; n.length < i; ) n.push({ w: o });
  return n;
}
function sc(e, t, i, n) {
  if (e.length === 1) return e.map((h) => ({ ...h }));
  const o = e.length - 1, s = Math.max(Zo, Math.min(n - Zo * o, i)), r = e.reduce((h, d, p) => p === t ? h : h + d.w, 0), a = n - s, l = e.reduce((h, d) => h + d.w, 0), c = n / l;
  return e.map((h, d) => {
    if (d === t) return { ...h, w: s / c };
    const p = r > 0 ? h.w / r : 1 / o;
    return { ...h, w: a * p / c };
  });
}
const rc = 0.12;
function ui(e, t) {
  return e.thickness ?? t.settings.wallThickness;
}
function dt(e, t) {
  return e.walls.reduce((i, n) => Math.max(i, ui(n, t)), t.settings.wallThickness);
}
function ac(e, t) {
  const i = e.color ?? "var(--primary-color)", n = e.opacity ?? rc;
  return t && e.entity && Ze(t.states[e.entity]) ? { color: e.activeColor ?? "#ffc107", opacity: Math.min(1, n + 0.2) } : { color: i, opacity: n };
}
function vr(e, t) {
  const { color: i, opacity: n } = ac(e, t.hass), o = e.points.map((c) => `${c.x},${c.y}`).join(" "), s = Math.min(...e.points.map((c) => c.x)), r = Math.min(...e.points.map((c) => c.y));
  let a = { x: s + t.labelSize * 0.8, y: r + t.labelSize * 1.5 };
  ze(e.points, a.x, a.y) || (a = qn(e.points));
  const l = ze(e.points, s + t.labelSize * 0.8, r + t.labelSize * 1.5) ? "start" : "middle";
  return _`
    <g class="area ${t.selected ? "selected" : ""} ${t.dimmed ? "dimmed" : ""}" data-id=${e.id}>
      <polygon points=${o} fill=${i} fill-opacity=${n}
        style=${e.type === "balcony" ? `stroke:${i};stroke-width:3;stroke-dasharray:10 6;stroke-linejoin:round` : m}></polygon>
      ${e.showName !== !1 && e.name ? _`<text class="area-label" x=${a.x} y=${a.y} font-size=${t.labelSize}
                  text-anchor=${l} dominant-baseline="middle">${e.name}</text>` : m}
    </g>`;
}
function xr(e, t, i, n = {}) {
  const { width: o, height: s } = t.canvas, r = Math.max(o, s), a = dt(e, t) + 2;
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
                         stroke-width=${ui(l, t)}></line>`
  )}
    </g>`;
}
function Xo(e, t, i, n) {
  const o = t * n < 0 ? 0 : 1;
  return _`
    <path class="swing" d="M ${e} ${n * i} A ${i} ${i} 0 0 ${o} ${e - t * i} 0"></path>
    <line class="leaf" x1=${e} y1="0" x2=${e} y2=${n * i}></line>`;
}
function lc(e, t, i, n) {
  const o = t, s = n?.states[e.entity], r = Ql(s), a = s?.state === "opening" || s?.state === "closing", l = e.side === "in" ? 1 : -1, c = Math.max(i * 0.8, 8), h = l * i / 2, d = l > 0 ? h : h - c, p = (r ?? 0) * c, f = l > 0 ? h : h - p, g = [];
  for (let b = 3; b < p; b += 3) g.push(h + l * b);
  return _`
    <g class="shutter ${e.side} ${a ? "moving" : ""} ${r === void 0 ? "unknown" : ""}" style="--fp-shutter:${e.color || sr}">
      <rect class="shutter-track" x=${-o / 2} y=${d} width=${o} height=${c}></rect>
      ${p > 0 ? _`<rect class="shutter-fill" x=${-o / 2} y=${f} width=${o} height=${p}></rect>` : m}
      ${g.map((b) => _`<line class="shutter-slat" x1=${-o / 2} y1=${b} x2=${o / 2} y2=${b}></line>`)}
    </g>`;
}
function cc(e, t) {
  if (!e.lockEntity) return m;
  const i = nc(t?.states[e.lockEntity]), o = -(e.hinge === "right" ? 1 : -1) * (e.length / 2 - 9);
  return _`
    <g class="lock ${i}" transform="translate(${o} 0)">
      <circle r="6.5"></circle>
      <path class="shackle" d=${i === "locked" ? "M -2.4 -1 V -3 a 2.4 2.4 0 0 1 4.8 0 V -1" : "M -2.4 -1 V -3 a 2.4 2.4 0 0 1 4.8 0 V -2.4"}></path>
      <rect x="-3.4" y="-1" width="6.8" height="5" rx="1"></rect>
    </g>`;
}
function wr(e, t, i = {}) {
  const n = e.length, o = `--fp-open:${e.openColor || or}`, s = e.hinge === "right" ? 1 : -1, r = e.swing === "out" ? -1 : 1;
  if (e.type === "window") {
    const h = t - 2, d = $n(e).map((g) => {
      const b = _r(g.entity, i.hass);
      return { seg: g, open: !!i.forceOpen || b.open, unknown: b.unknown };
    }), p = Math.max(...d.filter((g) => g.open).map((g) => g.seg.x1 - g.seg.x0), 0), f = `opening window ${i.selected ? "selected" : ""} ${i.warn ? "warn" : ""}`;
    return _`
      <g class=${f} data-id=${e.id} transform="translate(${e.x} ${e.y}) rotate(${e.angle})" style=${o}>
        <rect class="hit" x=${-n / 2} y=${r < 0 ? -p : -h / 2} width=${n} height=${p + h}></rect>
        ${(e.shutters ?? []).map((g) => lc(g, n, t, i.hass))}
        ${d.map(({ seg: g, open: b, unknown: x }) => {
      const v = g.x1 - g.x0, w = g.hinge === "right" ? g.x1 : g.x0, y = g.hinge === "right" ? 1 : -1;
      return _`
            <g class="seg ${b ? "open" : ""} ${x ? "unknown" : ""} ${i.leafIndex === g.index ? "sel" : ""}">
              <rect class="frame" x=${g.x0} y=${-h / 2} width=${v} height=${h}></rect>
              ${b ? Xo(w, y, v, r) : _`<line class="glass" x1=${g.x0} y1=${-h / 6} x2=${g.x1} y2=${-h / 6}></line>
                      <line class="glass" x1=${g.x0} y1=${h / 6} x2=${g.x1} y2=${h / 6}></line>`}
            </g>`;
    })}
      </g>`;
  }
  const a = ic(e, i.hass), l = !!i.forceOpen || !e.entity || a.open, c = `opening door ${l ? "open" : ""} ${a.unknown ? "unknown" : ""} ${i.selected ? "selected" : ""}`;
  return _`
    <g class=${c} data-id=${e.id} transform="translate(${e.x} ${e.y}) rotate(${e.angle})" style=${o}>
      <rect class="hit" x=${-n / 2} y=${r > 0 ? -t / 2 : -n} width=${n} height=${n + t / 2}></rect>
      ${l ? Xo(s * n / 2, s, n, r) : _`<rect class="frame" x=${-n / 2} y=${-(t - 2) / 2} width=${n} height=${t - 2}></rect>
              <line class="leaf closed" x1=${-n / 2} y1="0" x2=${n / 2} y2="0"></line>`}
      ${cc(e, i.hass)}
    </g>`;
}
function dc(e, t, i = {}) {
  const n = dt(e, t) + 2;
  return _`<g class="openings">${e.openings.map(
    (o) => wr(o, n, { hass: i.hass, selected: i.selectedId === o.id })
  )}</g>`;
}
const $r = `
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
var hc = Object.defineProperty, pc = Object.getOwnPropertyDescriptor, z = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? pc(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && hc(t, i, o), o;
};
const qt = "floorplan_panel", uc = 100, Ji = [1, 5, 10, 25, 50], ve = 12, Qi = 14, Yo = 7, Te = { wall: "walls", opening: "openings", area: "areas", item: "items" };
let $t, Vt = 0;
const Jo = [
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
], fc = [
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
], it = ["#4f8bd6", "#e0a030", "#3fb5a8", "#8e6cc9", "#d65f5f", "#6aa84f", "#9e9e9e"];
let P = class extends te {
  constructor() {
    super(...arguments), this.revision = 0, this.narrow = !1, this._tool = "select", this._furnMode = !1, this._multi = [], this._guides = [], this._lastGuides = [], this._view = { x: 0, y: 0, w: 1e3, h: 700 }, this._roomPoints = [], this._dirty = !1, this._saving = !1, this._conflict = !1, this._svgSize = { w: 1, h: 1 }, this._undo = [], this._redo = [], this._baseRevision = 0, this._keyHandler = (e) => this._onKey(e);
  }
  // ---------------------------------------------------------------- Lebenszyklus
  willUpdate(e) {
    e.has("_sel") && this._multi.length && !this._multi.some((t) => t.kind === this._sel?.kind && t.id === this._sel?.id) && (this._multi = []), e.has("plan") && !this._draft && (this._draft = yn(structuredClone(this.plan)), this._baseRevision = this.revision, this._floorId = this.floorId && this._draft.floors.some((t) => t.id === this.floorId) ? this.floorId : this._draft.floors[0]?.id, this._floorId || (this._draft.floors.push({ id: "eg", name: "Wohnung", walls: [], openings: [], areas: [], items: [] }), this._floorId = "eg"), this._fitView(), this.initialAreaId && this._floor.areas.some((t) => t.id === this.initialAreaId) && (this._sel = { kind: "area", id: this.initialAreaId }));
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
    const e = xn(this._floor, this._draft), t = Math.max(e.w, e.h) * 0.1;
    this._view = { x: e.x - t, y: e.y - t, w: e.w + 2 * t, h: e.h + 2 * t };
  }
  // ---------------------------------------------------------------- Änderungen & Undo
  _snapshot() {
    return JSON.stringify({ plan: this._draft, floorId: this._floorId });
  }
  _pushUndo(e) {
    this._undo.push(e), this._undo.length > uc && this._undo.shift(), this._redo = [], this._dirty = !0;
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
      (e) => e.openings.filter(Yi).map((t) => ({ floorId: e.id, opening: t }))
    );
  }
  _selectOpening(e, t) {
    this._floorId = e, this._sel = { kind: "opening", id: t }, this._tool = "select";
  }
  _deleteSelected() {
    const e = this._group;
    e.length && (this._mutate((t) => {
      for (const i of Object.keys(Te)) {
        const n = new Set(e.filter((o) => o.kind === i).map((o) => o.id));
        n.size && (t[Te[i]] = t[Te[i]].filter((o) => !n.has(o.id)));
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
      const r = e.kind === "opening" ? t.length / 2 : Qi * this._upp;
      i = [t.x - r, t.x + r], n = [t.y - r, t.y + r];
    }
    const o = Math.min(...i), s = Math.min(...n);
    return { x: o, y: s, w: Math.max(...i) - o, h: Math.max(...n) - s };
  }
  _selectInRect(e, t, i) {
    const n = Math.min(e.x, t.x), o = Math.max(e.x, t.x), s = Math.min(e.y, t.y), r = Math.max(e.y, t.y), a = i ? [...this._group] : [];
    for (const l of Object.keys(Te))
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
      i && e[Te[t.kind]].push(structuredClone(i));
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
        Object.assign(l, { id: j("w"), x1: a.x1 + t, y1: a.y1 + i, x2: a.x2 + t, y2: a.y2 + i }), r.walls.push(l), o.push({ kind: "wall", id: l.id });
      }
      for (const a of e.openings) {
        const l = structuredClone(a);
        Object.assign(l, { id: j(a.type === "door" ? "t" : "f"), x: a.x + t, y: a.y + i }), r.openings.push(l), o.push({ kind: "opening", id: l.id });
      }
      for (const a of e.areas) {
        const l = structuredClone(a);
        l.id = j("r"), l.points = a.points.map((c) => ({ x: c.x + t, y: c.y + i })), n && l.name && (l.name = `${l.name} (Kopie)`), s.set(a.id, l.id), r.areas.push(l), o.push({ kind: "area", id: l.id });
      }
      for (const a of e.items) {
        const l = structuredClone(a);
        Object.assign(l, { id: j("i"), x: a.x + t, y: a.y + i }), l.area && s.has(l.area) && (l.area = s.get(l.area)), r.items.push(l), o.push({ kind: "item", id: l.id });
      }
    }), o;
  }
  _duplicate() {
    const e = this._groupClip();
    this._clipBounds(e) && (this._setGroup(this._insertClip(e, this._gap, this._gap, !0)), this._menu = void 0);
  }
  _copy() {
    const e = this._groupClip();
    this._clipBounds(e) && ($t = e, Vt = 0, this._menu = void 0);
  }
  _paste() {
    $t && (Vt++, this._setGroup(this._insertClip($t, this._gap * Vt, this._gap * Vt, !0)), this._menu = void 0);
  }
  _saveTemplate() {
    const e = this._groupClip();
    if (!this._clipBounds(e)) return;
    if ((this._draft.settings.templates?.length ?? 0) >= Do) {
      this._error = `Es sind höchstens ${Do} Vorlagen möglich.`;
      return;
    }
    const t = prompt("Name der Vorlage", "Vorlage " + ((this._draft.settings.templates?.length ?? 0) + 1))?.trim();
    t && this._mutate((i, n) => {
      (n.settings.templates ??= []).push({ id: j("v"), name: t, ...e });
    });
  }
  _insertTemplate(e) {
    const t = this._clipBounds(e);
    if (!t) return;
    const i = this._draft.settings.grid, n = de(this._view.x + this._view.w / 2 - (t.x + t.w / 2), i), o = de(this._view.y + this._view.h / 2 - (t.y + t.h / 2), i);
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
        type: `${qt}/plan/save`,
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
        const e = await this.hass.callWS({ type: `${qt}/plan/load_sample` });
        this._acceptServerPlan(e.plan, e.revision);
      } catch (e) {
        this._error = e?.message ?? String(e);
      }
  }
  _acceptServerPlan(e, t) {
    this._draft = yn(e), this._baseRevision = t, this._floorId = this._draft.floors[0].id, this._undo = [], this._redo = [], this._dirty = !1, this._sel = void 0, this._history = void 0, this._fitView();
  }
  async _loadHistory() {
    const e = await this.hass.callWS({ type: `${qt}/history/list` });
    this._history = e.items;
  }
  async _restoreHistory(e) {
    if (!confirm("Diesen Stand wiederherstellen? Der aktuelle gespeicherte Stand bleibt im Verlauf.")) return;
    const t = await this.hass.callWS({ type: `${qt}/history/restore`, history_id: e });
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
    const o = Hl(e, this._floor.walls, ve * this._upp, i);
    if (o) return { ...o };
    const s = jl(e, this._floor.areas, ve * this._upp, n);
    if (s) return s;
    if (this._tool !== "item") {
      const c = Bl(e, this._floor.walls, ve * this._upp, i);
      if (c) return c;
    }
    const r = [];
    for (const c of this._floor.walls)
      i.includes(c) || r.push({ x: c.x1, y: c.y1 }, { x: c.x2, y: c.y2 });
    for (const c of this._floor.areas) for (const h of c.points) n.includes(h) || r.push(h);
    const a = ur(e, r, ve * this._upp);
    this._lastGuides = a.guides;
    const l = this._draft.settings.grid;
    return { x: a.x ?? de(e.x, l), y: a.y ?? de(e.y, l) };
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
          this._drag = { ...n, mode: "handle", wr: !0, handle: o.handle }, this._drag.edge = o.handle.startsWith("e") ? this._edgeSetup(r[a], r[(a + 1) % l]) : { n: { x: 0, y: 0 }, pts: this._movers((c) => F(c, r[a]) < 0.5) }, this._svg.setPointerCapture(e.pointerId);
          break;
        }
        if (o?.kind === "wall" && !s) {
          const a = this._floor.walls.find((h) => h.id === o.id), l = this._wallRoom?.walls.some((h) => h.id === o.id), c = a && !l && !jo(a, this._floor.areas).length ? this._findLoop(a) : void 0;
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
          const s = e.shiftKey ? o : Zi(this._chainStart, o);
          if (F(s, this._chainStart) > 1) {
            const r = this._chainStart;
            this._mutate((a) => this._addWalls(a, r, s)), this._chainStart = s;
          }
        }
        break;
      }
      case "area": {
        const o = this._snap(t, e);
        this._roomPoints.length >= 3 && F(o, this._roomPoints[0]) <= ve * this._upp ? this._finishRoom() : this._roomPoints = [...this._roomPoints, o];
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
        const o = $e(this._draft.furniture, this._placeType);
        if (!o) break;
        const s = this._snap(t, e), r = j("i");
        this._mutate((a) => a.items.push({ id: r, x: s.x, y: s.y, furnitureType: o.id, tapAction: "auto" })), this._sel = { kind: "item", id: r }, this._tool = "select";
        break;
      }
      case "item": {
        const o = this._snap(t, e), s = j("i");
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
      const h = e.altKey ? 0 : this._draft.settings.grid, d = de(t.x - i.start.x, h), p = de(t.y - i.start.y, h);
      for (const { sel: f, orig: g } of i.origs) {
        const b = this._elementOf(f);
        b && this._shiftElement(f.kind, b, g, d, p);
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
        const p = e.altKey ? 0 : this._draft.settings.grid, f = de((t.x - i.start.x) * h.x + (t.y - i.start.y) * h.y, p);
        for (const g of d) g.set(g.x + h.x * f, g.y + h.y * f);
      } else {
        const p = this._snap(t, e, d.flatMap((f) => f.wall ? [f.wall] : []), d.flatMap((f) => f.vert ? [f.vert] : []));
        for (const f of d) f.set(p.x, p.y);
      }
      this._draft = { ...this._draft };
      return;
    }
    const s = this._findSelected();
    if (!s || !i.sel) return;
    const r = e.altKey ? 0 : this._draft.settings.grid, a = de(t.x - i.start.x, r), l = de(t.y - i.start.y, r), c = i.orig;
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
          const h = { x: c.x + (t.x - i.start.x), y: c.y + (t.y - i.start.y) }, d = Vi(h, this._floor.walls, dt(this._floor, this._draft) * 2 + ve * this._upp);
          d && !e.altKey ? Object.assign(s, { x: ue(d.point.x), y: ue(d.point.y), angle: es(c.angle, d.angle) }) : Object.assign(s, { x: c.x + a, y: c.y + l });
          break;
        }
      }
    else if (i.mode === "handle" && i.handle) {
      if (i.sel.kind === "wall") {
        const h = i.handle === "p1" ? 1 : 2, d = h === 1 ? { x: c.x2, y: c.y2 } : { x: c.x1, y: c.y1 }, p = i.links?.[0];
        let f = this._snap(t, e, [s, ...(p?.walls ?? []).map((g) => g.wall)], p?.verts ?? []);
        !e.shiftKey && !e.altKey && (f = Zi(d, f)), s[`x${h}`] = f.x, s[`y${h}`] = f.y, p && this._applyLink(p, f);
      } else if (i.sel.kind === "area" && i.handle.startsWith("e") && i.edge) {
        const { n: h, pts: d } = i.edge, p = e.altKey ? 0 : this._draft.settings.grid, f = de((t.x - i.start.x) * h.x + (t.y - i.start.y) * h.y, p);
        for (const g of d) g.set(g.x + h.x * f, g.y + h.y * f);
      } else if (i.sel.kind === "area" && i.handle.startsWith("v")) {
        const h = s.points[Number(i.handle.slice(1))], d = i.links?.[0], p = this._snap(t, e, d?.walls.map((f) => f.wall) ?? [], [h, ...d?.verts ?? []]);
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
    let o = { i: -1, d: ve * this._upp, pt: n };
    if (t.points.forEach((s, r) => {
      const a = t.points[(r + 1) % t.points.length], { point: l } = De(n, s, a), c = F(n, l);
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
      a !== e && (F(o, { x: a.x1, y: a.y1 }) < 0.5 && s.push({ wall: a, end: 1 }), F(o, { x: a.x2, y: a.y2 }) < 0.5 && s.push({ wall: a, end: 2 }));
    const r = [];
    for (const a of this._floor.areas)
      for (const l of a.points) l !== i && a !== n && F(o, l) < 0.5 && r.push(l);
    return { end: t, walls: s, verts: r };
  }
  _applyLink(e, t) {
    for (const i of e.walls)
      i.wall[`x${i.end}`] = t.x, i.wall[`y${i.end}`] = t.y;
    for (const i of e.verts) Object.assign(i, t);
  }
  _placeOpening(e, t, i) {
    const n = Vi(t, this._floor.walls, dt(this._floor, this._draft) + ve * 2 * this._upp), o = e === "door" ? 80 : 120, s = n ? { x: ue(n.point.x), y: ue(n.point.y) } : this._snap(t, i), r = j(e === "door" ? "t" : "f"), a = { id: r, type: e, x: s.x, y: s.y, length: o, angle: n ? es(0, n.angle) : 0 };
    e === "door" && Object.assign(a, { hinge: "left", swing: "in" }), this._mutate((l) => l.openings.push(a)), this._sel = { kind: "opening", id: r };
  }
  _finishRoom() {
    const e = this._roomPoints;
    if (e.length < 3) return;
    const t = j("r"), i = this._floor.areas.length;
    this._mutate(
      (n) => n.areas.push({ id: t, name: `Raum ${i + 1}`, points: e, color: it[i % it.length], sidebar: [] })
    ), this._roomPoints = [], this._sel = { kind: "area", id: t }, this._tool = "select";
  }
  /** Teilt vorhandene Wände an a/b, legt nur noch nicht abgedeckte Wandstücke an. */
  _addWalls(e, t, i) {
    for (const n of [t, i])
      for (const o of [...e.walls]) {
        const s = De(n, { x: o.x1, y: o.y1 }, { x: o.x2, y: o.y2 });
        if (F(n, s.point) > 0.5 || F(n, { x: o.x1, y: o.y1 }) < 0.5 || F(n, { x: o.x2, y: o.y2 }) < 0.5) continue;
        const r = { ...o, id: j("w"), x1: n.x, y1: n.y };
        o.x2 = n.x, o.y2 = n.y, e.walls.push(r);
      }
    for (const [n, o] of Gl(t, i, e.walls)) e.walls.push({ id: j("w"), x1: n.x, y1: n.y, x2: o.x, y2: o.y });
  }
  _finishRect(e, t) {
    const i = Math.min(e.x, t.x), n = Math.max(e.x, t.x), o = Math.min(e.y, t.y), s = Math.max(e.y, t.y);
    if (n - i < 1 || s - o < 1) return;
    const r = [
      { x: i, y: o },
      { x: n, y: o },
      { x: n, y: s },
      { x: i, y: s }
    ], a = j("r"), l = this._floor.areas.length, c = this._tool === "wallrect";
    if (this._mutate((h) => {
      r.forEach((d, p) => this._addWalls(h, d, r[(p + 1) % 4])), c || h.areas.push({ id: a, name: `Raum ${l + 1}`, points: r, color: it[l % it.length], sidebar: [] });
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
    if (!this._draft) return m;
    const e = Jo.find((t) => t.id === this._tool);
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
        <div class="main-title">Grundriss bearbeiten${this._dirty ? u`<span class="dirty"> • ungespeichert</span>` : m}</div>
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
          ${Jo.map(
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
                      <button @click=${this._copy}><ha-icon icon="mdi:content-copy"></ha-icon>Kopieren</button>` : m}
                ${$t ? u`<button @click=${this._paste}><ha-icon icon="mdi:content-paste"></ha-icon>Einfügen</button>` : m}
                ${this._group.length ? u`<button @click=${() => (this._menu = void 0, this._deleteSelected())}><ha-icon icon="mdi:delete-outline"></ha-icon>Löschen</button>` : m}
              </div>` : m}
          <div class="hint">${e.hint}</div>
        </div>
        <div class="props">${this._renderProps()}</div>
      </div>
    `;
  }
  _renderCanvas() {
    const e = this._draft, t = this._floor, { width: i, height: n } = e.canvas, o = this._upp, s = e.settings.grid, r = s * 10, a = dt(t, e) + 2, l = this._sel, c = this._view, [h, d, p, f] = [c.x - c.w, c.y - c.h, c.w * 3, c.h * 3];
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
      <rect class="sheet" x=${h} y=${d} width=${p} height=${f}></rect>
      ${s * (1 / o) >= 4 ? _`<rect x=${h} y=${d} width=${p} height=${f} fill="url(#grid-major)" pointer-events="none"></rect>` : m}
      <g class="areas">
        ${t.areas.map(
      (g) => _`<g data-kind="area" data-id=${g.id}>${vr(g, {
        selected: l?.kind === "area" && l.id === g.id,
        labelSize: Math.max(i, n) / 45
      })}</g>`
    )}
      </g>
      ${xr(t, e, "fp-editor-wall-mask", { selectedId: l?.kind === "wall" ? l.id : void 0 })}
      <g class="wall-hits">
        ${t.walls.map(
      (g) => _`<line data-kind="wall" data-id=${g.id} x1=${g.x1} y1=${g.y1} x2=${g.x2} y2=${g.y2}
                           stroke-width=${Math.max(ui(g, e), 10 * o)}></line>`
    )}
      </g>
      <g class="openings">
        ${t.openings.map(
      (g) => _`<g data-kind="opening" data-id=${g.id}>${wr(g, a, { selected: l?.kind === "opening" && l.id === g.id, forceOpen: l?.kind === "opening" && l.id === g.id, warn: Yi(g), leafIndex: l?.kind === "opening" && l.id === g.id ? this._leafSel ?? void 0 : void 0 })}</g>`
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
    const t = $e(this._draft.furniture, e.furnitureType);
    if (!t) return m;
    const i = this._sel?.kind === "item" && this._sel.id === e.id || this._multi.some((s) => s.kind === "item" && s.id === e.id), n = !!e.entity && !!e.activeColor && ["on", "open", "home"].includes(this.hass?.states?.[e.entity]?.state ?? ""), o = cr(e, t).map((s) => `${s.x},${s.y}`).join(" ");
    return _`<g>
      ${bn(e, t, { selected: i, fill: pr(e, n) })}
      <polygon class="furn-hit" data-kind="item" data-id=${e.id} points=${o}></polygon>
    </g>`;
  }
  _renderItem(e, t) {
    if (!hr(e, this._draft.furniture)) return m;
    const i = (e.size ?? 34) / 34 * Qi * t, n = this._sel?.kind === "item" && this._sel.id === e.id, o = e.icon ?? (e.entity ? ye(this.hass, e.entity) : "mdi:map-marker");
    return _`
      <g class="item ${n ? "selected" : ""}" data-kind="item" data-id=${e.id}>
        <circle cx=${e.x} cy=${e.y} r=${i}></circle>
        <foreignObject x=${e.x - i} y=${e.y - i} width=${2 * i} height=${2 * i}>
          <div class="fo-icon" style="--mdc-icon-size:${i * 1.2}px;width:${2 * i}px;height:${2 * i}px">
            <ha-icon .icon=${o}></ha-icon>
          </div>
        </foreignObject>
        ${e.label ? _`<text x=${e.x} y=${e.y + i + 12 * t} font-size=${11 * t} text-anchor="middle" class="item-label">${e.label}</text>` : m}
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
        return r ? _`<rect class="sel-outline" x=${r.x - o} y=${r.y - o} width=${r.w + 2 * o} height=${r.h + 2 * o} stroke-width=${2 * e}></rect>` : m;
      })}`;
    }
    const t = this._sel ? void 0 : this._wallRoomPts();
    if (t) {
      const o = Yo * e;
      return _`
        <polygon class="sel-outline" points=${t.map((s) => `${s.x},${s.y}`).join(" ")} stroke-width=${2 * e}></polygon>
        ${t.map((s, r) => _`<circle class="handle" data-handle="v${r}" cx=${s.x} cy=${s.y} r=${o} stroke-width=${2 * e}></circle>`)}
        ${t.map((s, r) => {
        const a = t[(r + 1) % t.length];
        return _`<rect class="handle" data-handle="e${r}" x=${(s.x + a.x) / 2 - o} y=${(s.y + a.y) / 2 - o} width=${2 * o} height=${2 * o} rx=${o / 3} stroke-width=${2 * e}></rect>`;
      })}`;
    }
    const i = this._findSelected();
    if (!i || !this._sel) return m;
    if (this._sel.kind === "item" && Qt(i, this._draft.furniture)) {
      const o = i, s = o.glowRadius ?? gn, r = (l) => ui(l, this._draft), a = br(this._floor.walls, this._floor.openings, (l) => yr(l), r);
      return _`${dr(o, this._draft.furniture).map((l) => {
        const c = gr(l.x, l.y, s, a, r);
        return c ? _`<polygon class="glow-reach" points=${c.map((h) => `${h.x},${h.y}`).join(" ")} stroke-width=${1.5 * e}></polygon>` : _`<circle class="glow-reach" cx=${l.x} cy=${l.y} r=${s} stroke-width=${1.5 * e}></circle>`;
      })}`;
    }
    const n = Yo * e;
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
    return m;
  }
  _lengthLabel(e, t, i) {
    const n = F(e, t);
    return n < 1 ? m : _`<text class="measure" x=${(e.x + t.x) / 2} y=${(e.y + t.y) / 2 - 10 * i} font-size=${12 * i}
                     text-anchor="middle">${en(n)}</text>`;
  }
  _renderDrawPreview(e) {
    const t = this._cursor;
    if (!t) return m;
    const i = { altKey: !1 };
    if (this._tool === "wall") {
      const n = this._snap(t, i);
      if (!this._chainStart) return _`<circle class="cursor-dot" cx=${n.x} cy=${n.y} r=${4 * e}></circle>`;
      const o = Zi(this._chainStart, n);
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
        ${a > 1 ? this._lengthLabel({ x: s, y: r }, { x: s + a, y: r }, e) : m}
        ${l > 1 ? this._lengthLabel({ x: s + a, y: r }, { x: s + a, y: r + l }, e) : m}`;
    }
    if (this._tool === "area") {
      const n = this._snap(t, i), o = [...this._roomPoints, n];
      return _`
        <polyline class="preview-area" points=${o.map((s) => `${s.x},${s.y}`).join(" ")} stroke-width=${2 * e}></polyline>
        ${this._roomPoints.map((s, r) => _`<circle class="cursor-dot ${r === 0 ? "first" : ""}" cx=${s.x} cy=${s.y} r=${(r === 0 ? 6 : 4) * e}></circle>`)}
        <circle class="cursor-dot" cx=${n.x} cy=${n.y} r=${4 * e}></circle>`;
    }
    if (this._tool === "door" || this._tool === "window") {
      const n = Vi(t, this._floor.walls, dt(this._floor, this._draft) + ve * 2 * e);
      return n ? _`<circle class="cursor-dot" cx=${n.point.x} cy=${n.point.y} r=${5 * e}></circle>` : m;
    }
    if (this._tool === "furniture") {
      const n = $e(this._draft.furniture, this._placeType);
      if (!n) return m;
      const o = this._snap(t, i);
      return _`<g opacity=".6">${bn({ id: "", x: o.x, y: o.y }, n, {})}</g>`;
    }
    if (this._tool === "item") {
      const n = this._snap(t, i);
      return _`<circle class="preview-item" cx=${n.x} cy=${n.y} r=${Qi * e}></circle>`;
    }
    return m;
  }
  // ---------------------------------------------------------------- Eigenschaften
  _renderPicker() {
    const e = this._draft.furniture ?? [];
    return u`
      <div class="props-head"><h3>Möbel platzieren</h3></div>
      ${e.length ? u`<div class="furn-picker">${e.map((t) => {
      const i = hi(t), n = Math.max(i.x1 - i.x0, i.y1 - i.y0) * 0.1 + 2;
      return u`<button class="furn-pick ${this._placeType === t.id ? "active" : ""}" title=${t.name} @click=${() => this._placeType = t.id}>
              <svg viewBox="${i.x0 - n} ${i.y0 - n} ${i.x1 - i.x0 + 2 * n} ${i.y1 - i.y0 + 2 * n}"><g class="furniture">${t.parts.map((o) => pi(o))}</g></svg>
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
      const i = Xi(this._wallRoomPts());
      return u`
        <div class="props-head"><h3>Raum aus Wänden</h3></div>
        ${i ? u`<p class="muted">${en(i.w)} × ${en(i.h)}</p>` : m}
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
        .value=${i == null ? "" : String(ue(i))}
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
      ${i ? u`<button class="link" @click=${() => this._setProp(t, void 0)}>Standard</button>` : m}
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
        <input type="number" min="1" step="1" .value=${String(ue(F({ x: e.x1, y: e.y1 }, { x: e.x2, y: e.y2 })))}
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
    const i = jo(t, this._floor.areas), n = this._sel;
    if (!(!i.length || n?.kind === "wall" && n.id === t.id))
      return i.find((o) => n?.kind === "area" && n.id === o.id) ? void 0 : i[0];
  }
  _roomGroup(e) {
    const t = this._floor, i = fr(e, t.walls), n = [{ kind: "area", id: e.id }, ...i.map((o) => ({ kind: "wall", id: o.id }))];
    for (const o of t.openings)
      i.some((s) => Tt({ x: o.x, y: o.y }, { x: s.x1, y: s.y1 }, { x: s.x2, y: s.y2 }, 3)) && n.push({ kind: "opening", id: o.id });
    for (const o of t.items) ze(e.points, o.x, o.y) && n.push({ kind: "item", id: o.id });
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
    const i = F(e, t) || 1;
    return { n: { x: -(t.y - e.y) / i, y: (t.x - e.x) / i }, pts: this._movers((o) => Tt(o, e, t)) };
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
      n.some((r) => Tt({ x: s.x, y: s.y }, { x: r.x1, y: r.y1 }, { x: r.x2, y: r.y2 }, 3)) && o.push({ kind: "opening", id: s.id });
    for (const s of t.items) ze(e, s.x, s.y) && o.push({ kind: "item", id: s.id });
    return o;
  }
  _wallRoomToArea() {
    const e = this._wallRoomPts();
    if (!e) return;
    const t = j("r"), i = this._floor.areas.length;
    this._mutate((n) => n.areas.push({ id: t, name: `Raum ${i + 1}`, points: e, color: it[i % it.length], sidebar: [] })), this._wallRoom = void 0, this._sel = { kind: "area", id: t };
  }
  _deleteWallRoom() {
    const e = this._wallRoomPts();
    if (!e) return;
    const t = this._wallRoomGroup(e);
    this._mutate((i) => {
      for (const n of Object.keys(Te)) {
        const o = new Set(t.filter((s) => s.kind === n).map((s) => s.id));
        o.size && (i[Te[n]] = i[Te[n]].filter((s) => !o.has(s.id)));
      }
    }), this._wallRoom = void 0;
  }
  _setWallLength(e) {
    const t = this._findSelected();
    if (!t || !Number.isFinite(e) || e < 1) return;
    const i = F({ x: t.x1, y: t.y1 }, { x: t.x2, y: t.y2 });
    i < 0.01 || this._mutate(() => {
      const n = this._linksAt(t, 2), o = e / i, s = { x: ue(t.x1 + (t.x2 - t.x1) * o), y: ue(t.y1 + (t.y2 - t.y1) * o) };
      t.x2 = s.x, t.y2 = s.y, this._applyLink(n, s);
    });
  }
  _setRectSize(e, t, i) {
    const n = Xi(e.points);
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
    const n = this._floor.items.filter((s) => ze(e.points, s.x, s.y)).map((s) => ({ x: s.x, y: s.y })), o = Ul(e.points, i.map((s) => ({ light: oe(s) === "light" })), n, qn(e.points));
    this._mutate((s) => {
      i.forEach((r, a) => s.items.push({ id: j("i"), x: o[a].x, y: o[a].y, entity: r, icon: ye(this.hass, r), tapAction: "auto" }));
    });
  }
  _renderOpeningProps(e) {
    const t = e.type === "window", i = Yi(e), n = wn(e), o = $n(e), s = (r) => e.shutters?.find((a) => a.side === r);
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
              ${i ? u`<span class="warn">Ohne Sensor kann der Öffnungszustand nicht angezeigt werden.</span>` : m}
            </div>
            <h4>Flügel (${n.length} von ${fn})</h4>
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
              <button ?disabled=${n.length >= fn} @click=${() => this._setLeafCount(n.length + 1)}>
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
      ${this._color("Farbe wenn offen", "openColor", e.openColor, or)}
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
                        .value=${a.color && a.color.startsWith("#") ? a.color : sr}
                        @change=${(l) => this._setShutter(r, { color: l.target.value })}
                      />
                    </label>` : m}
              </div>`;
    })}
            <p class="muted">Außen liegt auf der Seite gegen den Aufschlag „innen“; die Tiefe des Bands zeigt, wie weit das Rollo zu ist.</p>` : m}
    `;
  }
  /** Ändert die Flügelliste des ausgewählten Fensters. */
  _editLeaves(e) {
    this._mutate(() => {
      const t = this._findSelected();
      t && (t.leaves = e(wn(t).map((i) => ({ ...i })), t));
    });
  }
  _setLeaf(e, t) {
    this._leafSel = e, this._editLeaves((i, n) => {
      if (t.hinge === void 0) return i.map((s, r) => r === e ? Qo({ ...s, ...t }) : s);
      const o = $n(n);
      return i.map((s, r) => r === e ? Qo({ ...s, ...t }) : { ...s, hinge: s.hinge ?? o[r].hinge });
    });
  }
  _setLeafCount(e) {
    this._editLeaves((t) => oc(t, e)), this._leafSel = Math.min(this._leafSel ?? 0, e - 1);
  }
  _setLeafWidth(e, t) {
    Number.isFinite(t) && this._editLeaves((i, n) => sc(i, e, t, n.length));
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
          ${Sl.map(([n, o]) => u`<option value=${n} ?selected=${(e.type ?? "room") === n}>${o}</option>`)}
        </select>
      </label>
      ${e.type === "custom" ? this._text("Bezeichnung", "typeLabel", e.typeLabel) : m}
      <div class="grid2">
        ${this._color("Farbe", "color", e.color, "#4f8bd6")}
        <label class="field">
          <span>Deckkraft</span>
          <input type="range" min="0" max="0.6" step="0.02" .value=${String(e.opacity ?? 0.12)}
                 @change=${(n) => this._setProp("opacity", Number(n.target.value))} />
        </label>
      </div>
      ${(() => {
      const n = Xi(e.points);
      return n ? u`<div class="grid2">
              <label class="field"><span>Breite</span><input type="number" min="1" .value=${String(ue(n.w))} @change=${(o) => this._setRectSize(e, Number(o.target.value), n.h)} /></label>
              <label class="field"><span>Höhe</span><input type="number" min="1" .value=${String(ue(n.h))} @change=${(o) => this._setRectSize(e, n.w, Number(o.target.value))} /></label>
            </div>` : m;
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
            </label>` : m}
        ${this._entity("Raum einfärben, wenn aktiv", "entity", e.entity, ["binary_sensor", "input_boolean", "light", "switch", "person"])}
        ${e.entity ? this._color("Farbe wenn aktiv", "activeColor", e.activeColor, "#ffc107") : m}
      </details>

      <h4>Seitenleiste</h4>
      <p class="muted">Nur was hier steht, erscheint beim Antippen des Raums – Geräte, Szenen und Skripte.</p>
      <div class="sidebar-list">
        ${e.sidebar.map(
      (n, o) => u`<div class="sb-row">
            <ha-icon .icon=${ye(this.hass, n.entity, n.icon)}></ha-icon>
            <div class="sb-main">
              <input
                type="text"
                .value=${n.name ?? ""}
                placeholder=${li(this.hass, n.entity)}
                @change=${(s) => this._editSidebar(o, "name", s.target.value.trim())}
              />
              <small>${n.entity} · ${{ device: "Gerät", scene: "Szene", script: "Skript" }[dn(n.entity)]}${this.hass.states[n.entity] ? "" : " · nicht gefunden"}</small>
            </div>
            <button class="icon-btn" title="Nach oben" ?disabled=${o === 0} @click=${() => this._moveSidebar(o, -1)}><ha-icon icon="mdi:chevron-up"></ha-icon></button>
            <button class="icon-btn" title="Nach unten" ?disabled=${o === e.sidebar.length - 1} @click=${() => this._moveSidebar(o, 1)}><ha-icon icon="mdi:chevron-down"></ha-icon></button>
            <button class="icon-btn" title="Entfernen" @click=${() => this._removeSidebar(o)}><ha-icon icon="mdi:close"></ha-icon></button>
          </div>`
    )}
      </div>
      ${e.sidebar.length ? u`<button class="chip" title="Fehlende Icons für die Seitenleisten-Geräte im Raum verteilen" @click=${() => this._autoPlaceIcons(e)}>
            <ha-icon icon="mdi:auto-fix"></ha-icon>Icons automatisch platzieren
          </button>` : m}
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
                  <ha-icon .icon=${ye(this.hass, n)}></ha-icon>${li(this.hass, n)}
                </button>`
    )}
            </div>
          </div>` : m}
    `;
  }
  /** Entitäten des verknüpften HA-Bereichs, die noch nicht in der Seitenleiste sind (nur Vorschlag). */
  _areaSuggestions(e) {
    if (!e.haArea || !this.hass.entities) return [];
    const t = new Set(e.sidebar.map((o) => o.entity)), i = this.hass.devices, n = /* @__PURE__ */ new Set(["light", "switch", "fan", "cover", "climate", "media_player", "lock", "scene", "script", "vacuum", "input_boolean", "sensor", "binary_sensor", "humidifier", "valve", "button"]);
    return Object.values(this.hass.entities).filter((o) => !o.hidden && !t.has(o.entity_id) && n.has(oe(o.entity_id))).filter((o) => (o.area_id ?? (o.device_id ? i?.[o.device_id]?.area_id : void 0)) === e.haArea).map((o) => o.entity_id).slice(0, 30);
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
    const t = this._draft.furniture ?? [], i = $e(t, e.furnitureType), n = (o) => this._setProp("rotation", (((e.rotation ?? 0) + o) % 360 + 360) % 360);
    return u`
      <label class="field">
        <span>Vorlage</span>
        <select @change=${(o) => this._setProp("furnitureType", o.target.value)}>
          ${i ? m : u`<option value="" selected>${e.furnitureType ? "(gelöscht)" : "keine"}</option>`}
          ${t.map((o) => u`<option value=${o.id} ?selected=${o.id === e.furnitureType}>${o.name}</option>`)}
        </select>
      </label>
      ${i ? u`<button class="chip" @click=${() => this._editTemplate(i.id)}><ha-icon icon="mdi:pencil-outline"></ha-icon>Vorlage bearbeiten</button>` : m}
      <div class="grid2">
        ${this._num("Drehung (°)", "rotation", e.rotation, { min: -720, max: 720, step: 5, placeholder: "0" })}
        ${this._num("Skalierung", "scale", e.scale, { min: 0.05, max: 20, step: 0.1, placeholder: "1" })}
      </div>
      <div class="row-btns">
        <button class="chip" @click=${() => n(-90)}><ha-icon icon="mdi:rotate-left"></ha-icon>−90°</button>
        <button class="chip" @click=${() => n(90)}><ha-icon icon="mdi:rotate-right"></ha-icon>+90°</button>
      </div>
      ${this._color("Farbe (überschreibt Vorlage)", "fillColor", e.fillColor, "#9e9e9e")}
      ${i?.lights?.length ? u`<p class="muted">Die Vorlage hat ${i.lights.length} Leuchtpunkt${i.lights.length > 1 ? "e" : ""}. Mit einer Licht-Entität scheint das Licht genau dort.</p>` : m}
      <h4>Icon / Entität</h4>
    `;
  }
  _renderItemProps(e) {
    return u`
      ${e.furnitureType ? this._renderFurnitureProps(e) : m}
      <div class="field">
        <span>Icon</span>
        <div class="icon-input">
          <ha-icon .icon=${e.icon ?? (e.entity ? ye(this.hass, e.entity) : "mdi:map-marker")}></ha-icon>
          <input type="text" .value=${e.icon ?? ""} placeholder=${e.entity ? "vom Gerät" : "mdi:…"}
                 @change=${(t) => this._setProp("icon", t.target.value.trim())} />
        </div>
        <div class="icon-grid">
          ${fc.map(
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
        <input type="checkbox" .checked=${Qt(e, this._draft.furniture)} @change=${(t) => this._setProp("glow", t.target.checked)} />
        <span>Lichtschein anzeigen${e.glow === void 0 || e.glow === null ? " (automatisch)" : ""}</span>
      </label>
      ${Qt(e, this._draft.furniture) ? u`<div class="grid2">
              ${this._num("Radius", "glowRadius", e.glowRadius, { min: 10, max: 5e3, step: 10, placeholder: String(gn) })}
              ${this._color("Farbe ohne RGB", "glowColor", e.glowColor, rr)}
            </div>
            <p class="muted">Bei voller Helligkeit; gedimmt schrumpft der Schein. RGB-Lampen leuchten in ihrer eigenen Farbe. Die gestrichelte Kontur zeigt, wo Wände das Licht begrenzen.</p>` : m}
      <h4>Sichtbarkeit</h4>
      ${this._check("Nur zeigen, wenn der Raum gezoomt ist", "showOnlyWhenZoomed", e.showOnlyWhenZoomed)}
      ${e.showOnlyWhenZoomed ? u`<label class="field">
            <span>Gehört zu Raum</span>
            <select @change=${(t) => this._setProp("area", t.target.value)}>
              <option value="">automatisch (Lage im Raum)</option>
              ${this._floor.areas.map((t) => u`<option value=${t.id} ?selected=${e.area === t.id}>${t.name || t.id}</option>`)}
            </select>
          </label>` : m}
      ${!e.area && !this._floor.areas.some((t) => ze(t.points, e.x, e.y)) && e.showOnlyWhenZoomed ? u`<p class="warn">Das Icon liegt in keinem Raum und wird deshalb nie angezeigt.</p>` : m}
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
            ${(Ji.includes(e.settings.grid) ? Ji : [...Ji, e.settings.grid].sort((i, n) => i - n)).map(
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
            </div>` : m}
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
    const t = j("etage");
    this._mutate((i, n) => n.floors.push({ id: t, name: e, walls: [], openings: [], areas: [], items: [] })), this._floorId = t, this._sel = void 0;
  }
  _deleteFloor() {
    if (this._draft.floors.length < 2 || !confirm(`Etage „${this._floor.name || this._floorId}“ mit allem Inhalt löschen?`)) return;
    const e = this._floorId;
    this._mutate((t, i) => i.floors = i.floors.filter((n) => n.id !== e)), this._floorId = this._draft.floors[0].id, this._sel = void 0;
  }
};
P.styles = [
  Se($r),
  Se(Kn),
  ne`
      .furn-hit { fill: transparent; pointer-events: all; cursor: move; }
      .furn-picker { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin: 8px 0; }
      .furn-pick { display: flex; flex-direction: column; align-items: center; gap: 2px; border: 1px solid var(--divider-color); border-radius: 8px; background: none; padding: 6px; cursor: pointer; font-size: 11px; color: var(--primary-text-color); }
      .furn-pick.active { border-color: var(--primary-color); outline: 2px solid var(--primary-color); }
      .furn-pick svg { width: 100%; height: 56px; }
      .chip-top { display: inline-flex; align-items: center; gap: 4px; border: 1px solid rgba(255,255,255,.6); border-radius: 16px; background: none; color: inherit; padding: 4px 12px; cursor: pointer; font: inherit; font-size: 13px; --mdc-icon-size: 18px; }
    `,
  ne`
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
z([
  A({ attribute: !1 })
], P.prototype, "hass", 2);
z([
  A({ attribute: !1 })
], P.prototype, "plan", 2);
z([
  A({ attribute: !1 })
], P.prototype, "revision", 2);
z([
  A({ attribute: !1 })
], P.prototype, "floorId", 2);
z([
  A({ attribute: !1 })
], P.prototype, "initialAreaId", 2);
z([
  A({ type: Boolean, reflect: !0 })
], P.prototype, "narrow", 2);
z([
  k()
], P.prototype, "_draft", 2);
z([
  k()
], P.prototype, "_floorId", 2);
z([
  k()
], P.prototype, "_tool", 2);
z([
  k()
], P.prototype, "_furnMode", 2);
z([
  k()
], P.prototype, "_furnOpen", 2);
z([
  k()
], P.prototype, "_placeType", 2);
z([
  k()
], P.prototype, "_sel", 2);
z([
  k()
], P.prototype, "_multi", 2);
z([
  k()
], P.prototype, "_marquee", 2);
z([
  k()
], P.prototype, "_guides", 2);
z([
  k()
], P.prototype, "_wallRoom", 2);
z([
  k()
], P.prototype, "_menu", 2);
z([
  k()
], P.prototype, "_leafSel", 2);
z([
  k()
], P.prototype, "_view", 2);
z([
  k()
], P.prototype, "_cursor", 2);
z([
  k()
], P.prototype, "_chainStart", 2);
z([
  k()
], P.prototype, "_roomPoints", 2);
z([
  k()
], P.prototype, "_dirty", 2);
z([
  k()
], P.prototype, "_saving", 2);
z([
  k()
], P.prototype, "_error", 2);
z([
  k()
], P.prototype, "_conflict", 2);
z([
  k()
], P.prototype, "_history", 2);
z([
  k()
], P.prototype, "_svgSize", 2);
z([
  bt("svg.canvas")
], P.prototype, "_svg", 2);
P = z([
  He("fp-editor")
], P);
function Qo(e) {
  const t = { w: e.w };
  return e.entity && (t.entity = e.entity), e.hinge && (t.hinge = e.hinge), t;
}
function ue(e) {
  return Math.round(e * 10) / 10;
}
function es(e, t) {
  const i = (t % 360 + 360) % 360, n = (i + 180) % 360, o = (e % 360 + 360) % 360, s = (r) => Math.min(Math.abs(r - o), 360 - Math.abs(r - o));
  return ue(s(i) <= s(n) ? i : n);
}
function en(e) {
  return e >= 100 ? `${(e / 100).toFixed(2).replace(".", ",")} m` : `${Math.round(e)} cm`;
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mc = { CHILD: 2 }, Ti = (e) => (...t) => ({ _$litDirective$: e, values: t });
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
const { I: gc } = hl, ts = (e) => e, is = () => document.createComment(""), kt = (e, t, i) => {
  const n = e._$AA.parentNode, o = t === void 0 ? e._$AB : t._$AA;
  if (i === void 0) {
    const s = n.insertBefore(is(), o), r = n.insertBefore(is(), o);
    i = new gc(s, r, e, e.options);
  } else {
    const s = i._$AB.nextSibling, r = i._$AM, a = r !== e;
    if (a) {
      let l;
      i._$AQ?.(e), i._$AM = e, i._$AP !== void 0 && (l = e._$AU) !== r._$AU && i._$AP(l);
    }
    if (s !== o || a) {
      let l = i._$AA;
      for (; l !== s; ) {
        const c = ts(l).nextSibling;
        ts(n).insertBefore(l, o), l = c;
      }
    }
  }
  return i;
}, Ue = (e, t, i = e) => (e._$AI(t, i), e), yc = {}, kr = (e, t = yc) => e._$AH = t, bc = (e) => e._$AH, tn = (e) => {
  e._$AR(), e._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ns = (e, t, i) => {
  const n = /* @__PURE__ */ new Map();
  for (let o = t; o <= i; o++) n.set(e[o], o);
  return n;
}, we = Ti(class extends Ii {
  constructor(e) {
    if (super(e), e.type !== mc.CHILD) throw Error("repeat() can only be used in text expressions");
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
    const o = bc(e), { values: s, keys: r } = this.dt(t, i, n);
    if (!Array.isArray(o)) return this.ut = r, s;
    const a = this.ut ??= [], l = [];
    let c, h, d = 0, p = o.length - 1, f = 0, g = s.length - 1;
    for (; d <= p && f <= g; ) if (o[d] === null) d++;
    else if (o[p] === null) p--;
    else if (a[d] === r[f]) l[f] = Ue(o[d], s[f]), d++, f++;
    else if (a[p] === r[g]) l[g] = Ue(o[p], s[g]), p--, g--;
    else if (a[d] === r[g]) l[g] = Ue(o[d], s[g]), kt(e, l[g + 1], o[d]), d++, g--;
    else if (a[p] === r[f]) l[f] = Ue(o[p], s[f]), kt(e, o[d], o[p]), p--, f++;
    else if (c === void 0 && (c = ns(r, f, g), h = ns(a, d, p)), c.has(a[d])) if (c.has(a[p])) {
      const b = h.get(r[f]), x = b !== void 0 ? o[b] : null;
      if (x === null) {
        const v = kt(e, o[d]);
        Ue(v, s[f]), l[f] = v;
      } else l[f] = Ue(x, s[f]), kt(e, o[d], x), o[b] = null;
      f++;
    } else tn(o[p]), p--;
    else tn(o[d]), d++;
    for (; f <= g; ) {
      const b = kt(e, l[g + 1]);
      Ue(b, s[f]), l[f++] = b;
    }
    for (; d <= p; ) {
      const b = o[d++];
      b !== null && tn(b);
    }
    return this.ut = r, kr(e, l), be;
  }
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Sr = Ti(class extends Ii {
  constructor() {
    super(...arguments), this.key = m;
  }
  render(e, t) {
    return this.key = e, t;
  }
  update(e, [t, i]) {
    return t !== this.key && (kr(e), this.key = t), i;
  }
});
class os {
  constructor(t) {
    this._hass = t;
  }
  getEntityState(t) {
    return this._hass.states[t];
  }
}
class _c {
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
function vc(e, t, i, n) {
  return e ? i ? new _c(t, new os(e), n) : new os(e) : { getEntityState: () => {
  } };
}
function xc(e, t, i, n, o) {
  if (!e) return;
  const s = vc(e, i, n, o), r = {};
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
const wc = {}, ss = Ti(class extends Ii {
  constructor() {
    super(...arguments), this.ot = wc;
  }
  render(e, t) {
    return t();
  }
  update(e, [t, i]) {
    if (Array.isArray(t)) {
      if (Array.isArray(this.ot) && this.ot.length === t.length && t.every((n, o) => n === this.ot[o])) return be;
    } else if (this.ot === t) return be;
    return this.ot = Array.isArray(t) ? Array.from(t) : t, this.render(t, i);
  }
}), $c = /* @__PURE__ */ new Set([
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
]), kc = /^[a-z0-9#%.,/_() +*-]+$/i, Sc = /([a-z][a-z0-9-]*)\s*\(/gi;
function D(e) {
  if (typeof e != "string") return;
  const t = e.trim();
  if (!t || !kc.test(t) || t.includes("/*") || t.includes("*/") || !/^[a-z#]/i.test(t)) return;
  let i = 0;
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    if (s === "(") i++;
    else if (s === ")" && --i < 0) return;
  }
  if (i !== 0) return;
  const n = new RegExp(Sc.source, "gi");
  for (let o; o = n.exec(t); )
    if (!$c.has(o[1].toLowerCase())) return;
  return t;
}
function he(e, t) {
  return D(e) ?? t;
}
function O(e, t) {
  if (e == null || typeof e == "string" && e.trim() === "") return t;
  const i = typeof e == "number" ? e : Number(e);
  return Number.isFinite(i) ? i : t;
}
function re(e) {
  if (typeof e != "string") return;
  const t = e.trim().replace(/[^a-zA-Z0-9_-]/g, "");
  return t === "" ? void 0 : t;
}
const Ec = {
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
function Ac(e) {
  const t = e.trim().toLowerCase(), i = Ec[t];
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
function Vn([e, t, i]) {
  const n = (o) => {
    const s = o / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * n(e) + 0.7152 * n(t) + 0.0722 * n(i);
}
const Mc = "#212121", Cc = "#ffffff", Tc = Vn([33, 33, 33]), Ic = Vn([255, 255, 255]);
function Er(e) {
  if (typeof e != "string") return;
  const t = Ac(e);
  if (!t) return;
  const i = Vn(t), n = (o) => (Math.max(i, o) + 0.05) / (Math.min(i, o) + 0.05);
  return n(Tc) >= n(Ic) ? Mc : Cc;
}
const Pc = /^[a-z0-9]+(?:-[a-z0-9]+)*:[a-z0-9]+(?:-[a-z0-9]+)*$/i;
function It(e) {
  if (typeof e != "string") return;
  const t = e.trim();
  return Pc.test(t) ? t : void 0;
}
function Re(e) {
  if (typeof e != "string") return;
  const t = e.trim().replace(/[^a-zA-Z0-9_.-]/g, "");
  return t === "" ? void 0 : t;
}
const Pi = "default", Ar = 10, fi = [
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
], Oi = "var(--fp-skin-bg, var(--card-background-color, #fff))", Zn = "var(--fp-skin-wall, var(--primary-text-color))", Mr = "var(--fp-skin-text, var(--primary-text-color))", B = "var(--fp-skin-accent, var(--primary-color, #03a9f4))", nn = "var(--fp-skin-active, var(--state-light-active-color, var(--state-active-color, #fdd835)))", Be = "var(--fp-skin-badge-bg, var(--card-background-color, #fff))";
function Xn(e) {
  if (typeof e == "string")
    return fi.find((t) => t.id === e);
}
function Oc(e) {
  const t = Xn(e);
  return t ? Object.entries(t.vars).map(([i, n]) => `${i}:${n};`).join("") : "";
}
function zc(e) {
  const t = Xn(e);
  return t && t.id !== Pi ? t.id : void 0;
}
const Lc = Se(
  fi.filter((e) => e.id !== Pi).map(
    (e) => `:host([data-skin="${e.id}"]){` + Object.entries(e.vars).map(([t, i]) => `${t}:${i};`).join("") + "}"
  ).join(`
`)
), Cr = ne`
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
`, Rc = 6e4, Fc = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
function Tr(e) {
  return Fc.has(e);
}
function Yn(e) {
  if (e === "") return;
  const t = Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function Ir(e) {
  let t = 0;
  for (const i of e)
    if (!Tr(i.newState)) {
      if (Yn(i.newState) === void 0) return !1;
      t++;
    }
  return t > 0;
}
function Dc(e, t, i) {
  const n = e.map((c) => Yn(c.newState)), o = n.filter((c) => c !== void 0);
  if (!o.length) return e;
  const s = (Math.max(...o) - Math.min(...o)) / t;
  if (!(s > 0) && !e.some((c) => Tr(c.newState)))
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
    const d = n[c - 1], p = n[c + 1], f = d !== void 0 && p !== void 0 && (h > d && h >= p || h < d && h <= p);
    (Math.abs(h - a) >= s || f && Math.abs(h - a) >= s / 2 || e[c].timestamp - l >= i) && (r.push(e[c]), a = h, l = e[c].timestamp);
  }
  return e.length > 1 && r.push(e[e.length - 1]), r;
}
function Nc(e, t = {}) {
  const i = t.numericSteps ?? 0;
  return !(i > 0) || e.length < 3 || !Ir(e) ? e : Dc(e, i, t.maxGapMs ?? Rc);
}
function Hc(e, t = {}) {
  if (!(t.numericSteps ?? 0) || e.length === 0) return e;
  const i = /* @__PURE__ */ new Map();
  for (const o of e) {
    const s = i.get(o.entityId);
    s ? s.push(o) : i.set(o.entityId, [o]);
  }
  const n = /* @__PURE__ */ new Set();
  for (const o of i.values())
    for (const s of Nc(o, t)) n.add(s);
  return e.filter((o) => n.has(o));
}
function jc(e, t) {
  if (!(t > 2) || e.length <= t || !Ir(e)) return e;
  const i = e.map((r) => Yn(r.newState)), n = /* @__PURE__ */ new Set([0, e.length - 1]);
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
function Ht(e) {
  const t = typeof e.color == "string" ? D(e.color) : void 0;
  if (t) return t;
  const i = e.attributes?.color, n = typeof i == "string" ? D(i) : void 0;
  if (n) return n;
  const o = String(e.newState ?? "").trim().toLowerCase();
  return e.entityId.startsWith("light.") ? o === "off" ? Be : nn : e.entityId.startsWith("cover.") ? o === "closed" ? Be : B : e.entityId.startsWith("sensor.") || e.entityId.startsWith("binary_sensor.") ? o === "off" ? Be : B : e.entityId.startsWith("fan.") ? o === "off" ? Be : nn : e.entityId.startsWith("media_player.") ? o === "idle" ? Be : nn : o === "on" || o === "open" || o === "playing" || o === "home" || o === "locked" || o === "unlocked" ? B : Be;
}
class Wc {
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
    const a = n.hass ?? this._context?.hass, l = n.watched ?? this._context?.watched, h = (a && Array.isArray(l) ? await this._loadFromHass(a, t, i, l) : await this._loader(t, i, { ...this._context, ...n, hass: a, watched: l })).slice().sort((p, f) => p.timestamp - f.timestamp).map((p) => ({
      ...p,
      attributes: p.attributes ?? {}
    })), d = Hc(h, { numericSteps: n.numericSteps });
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
    const s = /* @__PURE__ */ new Map(), r = (p, f) => {
      if (typeof p == "number")
        return Number.isFinite(p) ? p > 1e12 ? p / 1e3 : p : Number.NaN;
      if (typeof p == "string") {
        const g = Number(p);
        if (Number.isFinite(g)) return g > 1e12 ? g / 1e3 : g;
        const b = Date.parse(p) / 1e3;
        return Number.isFinite(b) ? b : Number.NaN;
      }
      return Date.parse(f) / 1e3;
    }, a = (p, f) => {
      for (const g of f) {
        const b = p[g];
        if (b !== void 0) return b;
      }
    }, l = (p, f) => {
      const g = f.filter((b) => !!b && typeof b == "object");
      g.length && s.set(p, g.map((b) => {
        const x = a(b, ["state", "s"]), v = a(b, ["attributes", "a"]), w = a(b, ["last_updated", "lu"]), y = a(b, ["last_changed", "lc"]);
        return {
          state: typeof x == "string" || typeof x == "number" || typeof x == "boolean" ? String(x) : void 0,
          attributes: v && typeof v == "object" ? v : void 0,
          last_updated: typeof w == "string" || typeof w == "number" ? w : void 0,
          last_changed: typeof y == "string" || typeof y == "number" ? y : void 0
        };
      }));
    };
    if (Array.isArray(t))
      for (const p of t) {
        if (!p || typeof p != "object") continue;
        const f = p, g = typeof f.entity_id == "string" ? f.entity_id : void 0, b = Array.isArray(f.states) ? f.states : Array.isArray(f.history) ? f.history : [];
        g && b.length && l(g, b);
      }
    else if (t && typeof t == "object")
      for (const [p, f] of Object.entries(t)) {
        if (Array.isArray(f) && f.length) {
          l(p, f);
          continue;
        }
        if (f && typeof f == "object") {
          const g = f;
          Array.isArray(g.states) && g.states.length && l(p, g.states);
        }
      }
    if (!s.size)
      throw new Error("History payload contained no parseable state rows.");
    const c = [], h = new Date(n * 1e3).toISOString();
    for (const [p, f] of s.entries())
      if (f.length && o.has(p)) {
        if (f.length === 1) {
          const g = f[0], b = r(g.last_updated ?? g.last_changed, h);
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
        for (let g = 1; g < f.length; g += 1) {
          const b = f[g - 1], x = f[g], v = r(b.last_updated ?? b.last_changed, h), w = r(x.last_updated ?? x.last_changed, h);
          if (!Number.isFinite(v) || !Number.isFinite(w) || w < i || v > n)
            continue;
          const y = b.state !== x.state, $ = !this._attributesEqual(b.attributes ?? {}, x.attributes ?? {});
          !y && !$ || c.push({
            timestamp: w,
            entityId: p,
            oldState: b.state ?? "unknown",
            newState: x.state ?? "unknown",
            attributes: {
              ...b.attributes ?? {},
              ...x.attributes ?? {}
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
var Uc = Object.defineProperty, Bc = Object.getOwnPropertyDescriptor, Ye = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Bc(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Uc(t, i, o), o;
};
let fe = class extends te {
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
    const i = Ht(e), n = `left:${this._getMarkerLeftClamped(e.timestamp, 7)};--stack-offset:${t};--marker-pct:${this._pct(e.timestamp)};`;
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
      e.set(t, jc(i, fe.MAX_MARKERS_PER_LANE));
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
        ${ss([this.events, this.startTime, this.endTime, this._hidden], () => i.map((o, s) => {
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
        const d = Ht(h), p = this._getMarkerLeftClamped(h.timestamp, 4);
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
        ${ss([this.events, this.startTime, this.endTime], () => this._groupEventsByTimestamp().map((t) => u`
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
fe.MAX_MARKERS_PER_LANE = 150;
fe.styles = ne`
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
    .playhead { position: absolute; top: -2px; width: 2px; height: calc(100% + 4px); background: ${Se(B)}; }
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
      background: ${Se(B)};
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
  A({ attribute: !1 })
], fe.prototype, "events", 2);
Ye([
  A({ type: Number })
], fe.prototype, "startTime", 2);
Ye([
  A({ type: Number })
], fe.prototype, "endTime", 2);
Ye([
  A({ type: Number })
], fe.prototype, "currentTime", 2);
Ye([
  A({ type: Boolean })
], fe.prototype, "expanded", 2);
Ye([
  k()
], fe.prototype, "_hidden", 2);
fe = Ye([
  Ci("easy-floorplan-history-timeline")
], fe);
function rs(e) {
  return !!e?.haArea && (e.filterEntities ?? !0);
}
const as = -6, Gc = 6, Jn = 0.45, mi = 1, Pr = "scale", Or = "dim", ls = 0.92, cs = 80, ds = 260, kn = 0.25, Sn = 4, zr = 10, En = 1, Qn = 14, Kc = 3, zi = 140, Lr = "var(--fp-skin-glow, #ffd9a0)", hs = 0.18, gi = 0.6, ps = 0.5, us = 0.45, qc = 0.5, eo = 14, qe = 34, yi = 34, Pt = 16, Li = 80, Ri = 0, Fi = 360, Vc = "var(--fp-skin-furniture, #9e9e9e)", ht = 1e3, jt = 600, to = 20, fs = 50;
function Zc(e, t) {
  return e ?? t;
}
function ms(e, t) {
  return t <= 0 ? 100 : Math.round(e / t * 100);
}
function on(e, t) {
  return Math.max(1, Math.round(t * e / 100));
}
function gs(e) {
  const t = e?.floors;
  return !t || typeof t != "object" ? [] : Object.values(t).filter((i) => !!i && typeof i.floor_id == "string" && typeof i.name == "string").sort((i, n) => (i.level ?? 0) - (n.level ?? 0) || i.name.localeCompare(n.name));
}
function Xc(e) {
  const t = e?.areas;
  return !t || typeof t != "object" ? [] : Object.values(t).filter((i) => !!i && typeof i.area_id == "string" && typeof i.name == "string").sort((i, n) => i.name.localeCompare(n.name));
}
function Yc(e, t) {
  if (!("name" in e)) return e;
  const i = (e.name ?? "").toString().trim(), n = Jc(t, i);
  return { ...e, name: n ? n.name : i || void 0, haArea: n?.area_id };
}
function Jc(e, t) {
  const i = (t ?? "").trim();
  if (!i) return;
  const n = e.find((a) => a.name === i);
  if (n) return n;
  const o = i.toLowerCase(), s = e.find((a) => a.name.toLowerCase() === o);
  if (s) return s;
  const r = o.replace(/\s+/g, " ");
  return e.find((a) => a.name.trim().toLowerCase().replace(/\s+/g, " ") === r);
}
function Qc(e, t) {
  const i = e, n = i?.entities?.[t];
  return n ? n.area_id ? n.area_id : (n.device_id ? i?.devices?.[n.device_id] : void 0)?.area_id ?? void 0 : void 0;
}
function sn(e, t) {
  const n = e?.entities;
  return !n || typeof n != "object" ? [] : Object.keys(n).filter((o) => Qc(e, o) === t);
}
function ed(e) {
  return {
    type: e,
    width: ht,
    height: jt,
    grid: to,
    walls: [],
    openings: [],
    items: [],
    texts: [],
    furniture: [],
    trackers: [],
    areas: []
  };
}
function td() {
  return { overlayScale: "plan" };
}
function Y(e) {
  return `${e}_${Math.random().toString(36).slice(2, 9)}`;
}
function An(e, t) {
  if (e === t) return !0;
  if (Array.isArray(e) || Array.isArray(t))
    return !Array.isArray(e) || !Array.isArray(t) || e.length !== t.length ? !1 : e.every((o, s) => An(o, t[s]));
  if (typeof e != "object" || typeof t != "object" || e === null || t === null) return !1;
  const i = e, n = t;
  for (const o of /* @__PURE__ */ new Set([...Object.keys(i), ...Object.keys(n)]))
    if (!An(i[o], n[o])) return !1;
  return !0;
}
function id(e, t = []) {
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
function nd(e) {
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
function od(e) {
  const t = /* @__PURE__ */ new Set();
  return e.map((i, n) => {
    let o = i.id || `floor_${n + 1}`;
    for (; t.has(o); ) o = `${o}_${n + 1}`;
    return t.add(o), o === i.id ? i : { ...i, id: o };
  });
}
function sd(e, t, i) {
  const n = e.findIndex((a) => a.id === t), o = n + i;
  if (n < 0 || o < 0 || o >= e.length) return null;
  const s = [...e], [r] = s.splice(n, 1);
  return s.splice(o, 0, r), s;
}
function mt(e) {
  return e.floors && e.floors.length ? od(e.floors.map(nd)) : [
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
function bi(e, t) {
  if (!t) return null;
  const i = e?.[t.entity]?.state;
  if (i == null || i === "unavailable" || i === "unknown") return !1;
  const n = i === "on" || i === "open" || i === "home" || i === "detected";
  return t.invert ? !n : n;
}
function ys(e, t) {
  if (!e || t == null || !Number.isFinite(t)) return null;
  const i = e.max - e.min;
  if (i === 0) return null;
  const n = (t - e.min) / i, o = Math.max(0, Math.min(1, n));
  return e.invert ? 1 - o : o;
}
const rd = "airHandler", ad = "air handler", ld = "utility", cd = [
  "hvac",
  "ahu",
  "furnace",
  "ventilation"
], dd = {
  w: 60,
  h: 56
}, hd = [
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
], pd = {
  id: rd,
  name: ad,
  category: ld,
  keywords: cd,
  size: dd,
  parts: hd
}, ud = "bathtub", fd = "bathtub", md = "bath", gd = [
  "bath",
  "tub"
], yd = {
  w: 150,
  h: 76
}, bd = [
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
], _d = {
  id: ud,
  name: fd,
  category: md,
  keywords: gd,
  size: yd,
  parts: bd
}, vd = "bed", xd = "bed", wd = "bedroom", $d = [
  "double",
  "mattress",
  "sleep"
], kd = {
  w: 150,
  h: 200
}, Sd = [
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
], Ed = {
  id: vd,
  name: xd,
  category: wd,
  keywords: $d,
  size: kd,
  parts: Sd
}, Ad = "chair", Md = "chair", Cd = "living", Td = [
  "seat"
], Id = {
  w: 44,
  h: 44
}, Pd = [
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
], Od = {
  id: Ad,
  name: Md,
  category: Cd,
  keywords: Td,
  size: Id,
  parts: Pd
}, zd = "cornerShowerCurved", Ld = "curved corner shower", Rd = "bath", Fd = [
  "shower",
  "corner",
  "cubicle",
  "stall",
  "dusche"
], Dd = {
  w: 100,
  h: 100
}, Nd = [
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
], Hd = {
  id: zd,
  name: Ld,
  category: Rd,
  keywords: Fd,
  size: Dd,
  parts: Nd
}, jd = "desk", Wd = "desk", Ud = "living", Bd = [
  "office",
  "workstation"
], Gd = {
  w: 120,
  h: 60
}, Kd = [
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
], qd = {
  id: jd,
  name: Wd,
  category: Ud,
  keywords: Bd,
  size: Gd,
  parts: Kd
}, Vd = "dishwasher", Zd = "dishwasher", Xd = "kitchen", Yd = [
  "dishes"
], Jd = {
  w: 60,
  h: 60
}, Qd = [
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
], eh = {
  id: Vd,
  name: Zd,
  category: Xd,
  keywords: Yd,
  size: Jd,
  parts: Qd
}, th = "dryer", ih = "dryer", nh = "utility", oh = [
  "tumble dryer",
  "laundry"
], sh = {
  w: 60,
  h: 62
}, rh = [
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
], ah = {
  id: th,
  name: ih,
  category: nh,
  keywords: oh,
  size: sh,
  parts: rh
}, lh = "fishTank", ch = "fish tank", dh = "living", hh = [
  "aquarium",
  "fish",
  "water"
], ph = {
  w: 100,
  h: 40
}, uh = [
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
], fh = {
  id: lh,
  name: ch,
  category: dh,
  keywords: hh,
  size: ph,
  parts: uh
}, mh = "fridge", gh = "fridge", yh = "kitchen", bh = [
  "refrigerator",
  "freezer"
], _h = {
  w: 60,
  h: 64
}, vh = [
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
], xh = {
  id: mh,
  name: gh,
  category: yh,
  keywords: bh,
  size: _h,
  parts: vh
}, wh = "hotTub", $h = "hot tub", kh = "bath", Sh = [
  "jacuzzi",
  "spa",
  "whirlpool"
], Eh = {
  w: 120,
  h: 120
}, Ah = [
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
], Mh = {
  id: wh,
  name: $h,
  category: kh,
  keywords: Sh,
  size: Eh,
  parts: Ah
}, Ch = "piano", Th = "piano", Ih = "living", Ph = [
  "upright",
  "keyboard",
  "music"
], Oh = {
  w: 140,
  h: 60
}, zh = [
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
], Lh = {
  id: Ch,
  name: Th,
  category: Ih,
  keywords: Ph,
  size: Oh,
  parts: zh
}, Rh = "plant", Fh = "plant", Dh = "living", Nh = [
  "pot",
  "tree",
  "greenery"
], Hh = {
  w: 44,
  h: 44
}, jh = "ellipse", Wh = [
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
], Uh = {
  id: Rh,
  name: Fh,
  category: Dh,
  keywords: Nh,
  size: Hh,
  footprint: jh,
  parts: Wh
}, Bh = "quarterTub", Gh = "corner hot tub", Kh = "bath", qh = [
  "hottub",
  "jacuzzi",
  "corner",
  "quarter",
  "spa",
  "whirlpool"
], Vh = {
  w: 140,
  h: 140
}, Zh = [
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
], Xh = {
  id: Bh,
  name: Gh,
  category: Kh,
  keywords: qh,
  size: Vh,
  parts: Zh
}, Yh = "roundTable", Jh = "round table", Qh = "living", ep = [
  "dining",
  "circular"
], tp = {
  w: 100,
  h: 100
}, ip = "ellipse", np = [
  {
    ellipse: [
      50,
      50,
      50,
      50
    ],
    role: "body"
  }
], op = {
  id: Yh,
  name: Jh,
  category: Qh,
  keywords: ep,
  size: tp,
  footprint: ip,
  parts: np
}, sp = "rug", rp = "rug", ap = "living", lp = [
  "carpet",
  "mat"
], cp = {
  w: 180,
  h: 120
}, dp = [
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
], hp = {
  id: sp,
  name: rp,
  category: ap,
  keywords: lp,
  size: cp,
  parts: dp
}, pp = "sectional", up = "sectional (L)", fp = "living", mp = [
  "couch",
  "sofa",
  "corner",
  "chaise"
], gp = {
  w: 230,
  h: 180
}, yp = [
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
], bp = {
  id: pp,
  name: up,
  category: fp,
  keywords: mp,
  size: gp,
  parts: yp
}, _p = "sink", vp = "sink", xp = "kitchen", wp = [
  "basin",
  "tap",
  "faucet"
], $p = {
  w: 64,
  h: 48
}, kp = [
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
], Sp = {
  id: _p,
  name: vp,
  category: xp,
  keywords: wp,
  size: $p,
  parts: kp
}, Ep = "sofa", Ap = "sofa", Mp = "living", Cp = [
  "couch",
  "settee",
  "seat"
], Tp = {
  w: 170,
  h: 72
}, Ip = [
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
], Pp = {
  id: Ep,
  name: Ap,
  category: Mp,
  keywords: Cp,
  size: Tp,
  parts: Ip
}, Op = "stairs", zp = "stairs", Lp = "utility", Rp = [
  "steps",
  "staircase"
], Fp = {
  w: 90,
  h: 170
}, Dp = [
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
], Np = {
  id: Op,
  name: zp,
  category: Lp,
  keywords: Rp,
  size: Fp,
  parts: Dp
}, Hp = "stove", jp = "stove", Wp = "kitchen", Up = [
  "cooker",
  "hob",
  "oven",
  "range"
], Bp = {
  w: 64,
  h: 64
}, Gp = [
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
], Kp = {
  id: Hp,
  name: jp,
  category: Wp,
  keywords: Up,
  size: Bp,
  parts: Gp
}, qp = "table", Vp = "table", Zp = "living", Xp = [
  "dining"
], Yp = {
  w: 120,
  h: 80
}, Jp = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 5
  }
], Qp = {
  id: qp,
  name: Vp,
  category: Zp,
  keywords: Xp,
  size: Yp,
  parts: Jp
}, eu = "toilet", tu = "toilet", iu = "bath", nu = [
  "wc",
  "loo",
  "lavatory"
], ou = {
  w: 48,
  h: 68
}, su = [
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
], ru = {
  id: eu,
  name: tu,
  category: iu,
  keywords: nu,
  size: ou,
  parts: su
}, au = "tv", lu = "tv", cu = "living", du = [
  "television",
  "screen",
  "media"
], hu = {
  w: 110,
  h: 18
}, pu = [
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
], uu = {
  id: au,
  name: lu,
  category: cu,
  keywords: du,
  size: hu,
  parts: pu
}, fu = "vanity", mu = "vanity", gu = "bath", yu = [
  "washbasin",
  "sink",
  "bathroom"
], bu = {
  w: 110,
  h: 55
}, _u = [
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
], vu = {
  id: fu,
  name: mu,
  category: gu,
  keywords: yu,
  size: bu,
  parts: _u
}, xu = "wardrobe", wu = "wardrobe", $u = "bedroom", ku = [
  "closet",
  "armoire",
  "cupboard"
], Su = {
  w: 120,
  h: 55
}, Eu = [
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
], Au = {
  id: xu,
  name: wu,
  category: $u,
  keywords: ku,
  size: Su,
  parts: Eu
}, Mu = "washer", Cu = "washer", Tu = "utility", Iu = [
  "washing machine",
  "laundry"
], Pu = {
  w: 60,
  h: 62
}, Ou = [
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
], zu = {
  id: Mu,
  name: Cu,
  category: Tu,
  keywords: Iu,
  size: Pu,
  parts: Ou
}, Lu = "waterHeater", Ru = "water heater", Fu = "utility", Du = [
  "boiler",
  "cylinder",
  "tank"
], Nu = {
  w: 52,
  h: 52
}, Hu = "ellipse", ju = [
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
], Wu = {
  id: Lu,
  name: Ru,
  category: Fu,
  keywords: Du,
  size: Nu,
  footprint: Hu,
  parts: ju
}, Mn = [
  "living",
  "bedroom",
  "kitchen",
  "bath",
  "utility",
  "other"
], Di = (e) => Object.assign(/* @__PURE__ */ Object.create(null), e), io = (e, t) => typeof t == "string" && Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0, bs = Di({
  body: { width: 2, opacity: 1, fillOpacity: 0.12 },
  line: { width: 2, opacity: 1, fillOpacity: 0 },
  thin: { width: 1.5, opacity: 1, fillOpacity: 0 },
  detail: { width: 1.5, opacity: 0.7, fillOpacity: 0 },
  hint: { width: 1, opacity: 0.6, fillOpacity: 0 },
  solid: { width: 0, opacity: 0.7, fillOpacity: 1 }
}), Uu = [0, 0, 100, 100], Bu = 64, Rr = 256, Gu = 256, Ku = 0.25, _s = 8, ke = (e) => typeof e == "number" && Number.isFinite(e) ? e : null, at = (e, t, i) => Math.min(i, Math.max(t, e));
function Le(e, t) {
  if (!Array.isArray(e) || e.length !== t) return null;
  const i = [];
  for (const n of e) {
    const o = ke(n);
    if (o === null) return null;
    i.push(o);
  }
  return i;
}
function qu(e) {
  if (!Array.isArray(e) || e.length < 2 || e.length > Rr) return null;
  const t = [];
  for (const i of e) {
    const n = Le(i, 2);
    if (!n) return null;
    t.push([n[0], n[1]]);
  }
  return t;
}
const Vu = Di({ M: 2, L: 2, Q: 4, C: 6, Z: 0 });
function Zu(e) {
  if (!Array.isArray(e) || !e.length || e.length > Gu) return null;
  const t = [];
  for (const i of e) {
    if (!Array.isArray(i) || typeof i[0] != "string") return null;
    const n = i[0].toUpperCase(), o = io(Vu, n);
    if (o === void 0) return null;
    const s = Le(i.slice(1), o);
    if (!s) return null;
    t.push([n, ...s]);
  }
  return t[0]?.[0] !== "M" ? null : t;
}
function nt(e, t) {
  const i = io(bs, e.role) ? e.role : t, n = bs[i], o = ke(e.width), s = ke(e.opacity), r = ke(e.fillOpacity), a = Array.isArray(e.dash) ? e.dash.map(ke) : null, l = a && a.length && a.length <= 8 && a.every((c) => c !== null) ? a.map((c) => at(c, 0, 100)) : void 0;
  return {
    role: i,
    width: o === null ? n.width : i === "solid" ? at(o, 0, _s) : at(o, Ku, _s),
    opacity: s === null ? n.opacity : at(s, 0, 1),
    fillOpacity: r === null ? n.fillOpacity : at(r, 0, 1),
    dash: l
  };
}
function vs(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return null;
  const t = e, i = t.space === "square" ? "square" : "box";
  if ("line" in t) {
    const n = Le(t.line, 4);
    return n ? { kind: "line", a: [n[0], n[1]], b: [n[2], n[3]], space: i, style: nt(t, "line") } : null;
  }
  if ("rect" in t) {
    const n = Le(t.rect, 4);
    return !n || n[2] < 0 || n[3] < 0 ? null : {
      kind: "rect",
      x: n[0],
      y: n[1],
      w: n[2],
      h: n[3],
      rx: Math.max(0, ke(t.rx) ?? 0),
      space: i,
      style: nt(t, "body")
    };
  }
  if ("circle" in t) {
    const n = Le(t.circle, 3);
    return !n || n[2] < 0 ? null : { kind: "circle", cx: n[0], cy: n[1], r: n[2], space: i, style: nt(t, "line") };
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
      style: nt(t, "line")
    };
  }
  if ("polygon" in t || "polyline" in t) {
    const n = "polygon" in t, o = qu(n ? t.polygon : t.polyline);
    return o ? { kind: "poly", closed: n, pts: o, space: i, style: nt(t, n ? "body" : "line") } : null;
  }
  if ("path" in t) {
    const n = Zu(t.path);
    return n ? { kind: "path", cmds: n, space: i, style: nt(t, "line") } : null;
  }
  return null;
}
function Xu(e, t, i) {
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
function Yu(e) {
  if (e && typeof e == "object" && "repeat" in e) {
    const i = e, n = ke(i.repeat), o = Le(i.step, 2), s = vs(i.part);
    if (n === null || !o || !s) return [];
    const r = at(Math.round(n), 1, Bu);
    return Array.from({ length: r }, (a, l) => Xu(s, o[0] * l, o[1] * l));
  }
  const t = vs(e);
  return t ? [t] : [];
}
function Ni(e, t, i) {
  const n = (p) => (i?.push(p), null);
  if (!e || typeof e != "object" || Array.isArray(e))
    return n("A symbol has to be a JSON object.");
  const o = e, s = typeof o.id == "string" && o.id.trim() ? o.id.trim() : t, r = re(s);
  if (!r || r !== s)
    return n('`id` is missing, or uses characters a CSS class cannot: letters, digits, "-" and "_" only.');
  if (!Array.isArray(o.parts)) return n("`parts` has to be an array of shapes.");
  const a = [];
  for (const p of o.parts)
    for (const f of Yu(p)) {
      if (a.length >= Rr) break;
      a.push(f);
    }
  if (!a.length)
    return n(
      "No drawable parts. Each one needs a known shape (line, rect, circle, ellipse, polygon, polyline, path) with the right number of finite numbers."
    );
  const l = o.size && typeof o.size == "object" ? o.size : {}, c = ke(l.w), h = ke(l.h), d = Le(o.viewBox, 4);
  return {
    id: r,
    name: typeof o.name == "string" && o.name.trim() ? o.name.trim().slice(0, 60) : r,
    category: typeof o.category == "string" && Mn.includes(o.category) ? o.category : "other",
    keywords: Array.isArray(o.keywords) ? o.keywords.filter((p) => typeof p == "string").slice(0, 12) : [],
    size: { w: c && c > 0 ? c : 60, h: h && h > 0 ? h : 60 },
    viewBox: d && d[2] > 0 && d[3] > 0 ? d : Uu,
    footprint: o.footprint === "ellipse" ? "ellipse" : "rect",
    parts: a
  };
}
const Ju = Ni({
  id: "unknown",
  name: "unknown",
  size: { w: 60, h: 60 },
  parts: [{ rect: [0, 0, 100, 100], rx: 6.666667 }]
}), Ee = (() => {
  const e = /* @__PURE__ */ Object.assign({ "../ef-furniture/airHandler.json": pd, "../ef-furniture/bathtub.json": _d, "../ef-furniture/bed.json": Ed, "../ef-furniture/chair.json": Od, "../ef-furniture/cornerShowerCurved.json": Hd, "../ef-furniture/desk.json": qd, "../ef-furniture/dishwasher.json": eh, "../ef-furniture/dryer.json": ah, "../ef-furniture/fishTank.json": fh, "../ef-furniture/fridge.json": xh, "../ef-furniture/hotTub.json": Mh, "../ef-furniture/piano.json": Lh, "../ef-furniture/plant.json": Uh, "../ef-furniture/quarterTub.json": Xh, "../ef-furniture/roundTable.json": op, "../ef-furniture/rug.json": hp, "../ef-furniture/sectional.json": bp, "../ef-furniture/sink.json": Sp, "../ef-furniture/sofa.json": Pp, "../ef-furniture/stairs.json": Np, "../ef-furniture/stove.json": Kp, "../ef-furniture/table.json": Qp, "../ef-furniture/toilet.json": ru, "../ef-furniture/tv.json": uu, "../ef-furniture/vanity.json": vu, "../ef-furniture/wardrobe.json": Au, "../ef-furniture/washer.json": zu, "../ef-furniture/waterHeater.json": Wu }), t = Di({});
  for (const [i, n] of Object.entries(e)) {
    const o = Ni(n, i.split("/").pop()?.replace(/\.json$/, ""));
    o && (t[o.id] = o);
  }
  return t;
})();
function Hi(e, t) {
  return io(e, t);
}
let xs, ws = Ee;
function Cn(e) {
  if (!e || typeof e != "object") return Ee;
  if (e === xs) return ws;
  const t = Di({});
  Object.assign(t, Ee);
  for (const [i, n] of Object.entries(e)) {
    const o = Ni(n, i);
    o && (t[o.id] = o);
  }
  return xs = e, ws = t, t;
}
function Qu(e) {
  const t = (i) => {
    const n = Mn.indexOf(i);
    return n < 0 ? Mn.length : n;
  };
  return Object.values(e).sort(
    (i, n) => t(i.category) - t(n.category) || i.name.localeCompare(n.name)
  );
}
function ef(e, t) {
  const i = t.trim().toLowerCase();
  return i ? e.id.toLowerCase().includes(i) || e.name.toLowerCase().includes(i) || e.category.includes(i) || e.keywords.some((n) => n.toLowerCase().includes(i)) : !0;
}
function tf(e, t = Ee) {
  return Hi(t, e)?.size ?? { w: 60, h: 60 };
}
function $s(e, t, i, n) {
  const [o, s, r, a] = e.viewBox, l = n === "square" ? Math.min(t, i) : t, c = n === "square" ? Math.min(t, i) : i, h = l / r, d = c / a;
  return {
    x: (p) => (p - o) * h - l / 2,
    y: (p) => (p - s) * d - c / 2,
    len: (p) => p * Math.min(h, d),
    sx: (p) => p * h,
    sy: (p) => p * d
  };
}
const U = (e) => Number.isFinite(e) ? e : 0;
function nf(e, t) {
  const i = e.fillOpacity > 0 ? t : "none", n = e.role === "solid" ? "none" : t;
  return { fill: i, stroke: n, style: e };
}
function of(e, t, i) {
  const { fill: n, stroke: o, style: s } = nf(e.style, i), r = s.opacity < 1 ? s.opacity : m, a = s.dash?.length ? s.dash.join(" ") : m, l = s.fillOpacity > 0 && s.fillOpacity < 1 ? s.fillOpacity : m, c = s.role === "solid" ? m : s.width;
  switch (e.kind) {
    case "line":
      return _`<line x1=${U(t.x(e.a[0]))} y1=${U(t.y(e.a[1]))}
                       x2=${U(t.x(e.b[0]))} y2=${U(t.y(e.b[1]))}
                       fill="none" stroke=${o} stroke-width=${c}
                       stroke-dasharray=${a} opacity=${r} />`;
    case "rect":
      return _`<rect x=${U(t.x(e.x))} y=${U(t.y(e.y))}
                       width=${U(t.sx(e.w))} height=${U(t.sy(e.h))}
                       rx=${e.rx > 0 ? U(t.len(e.rx)) : m}
                       fill=${n} fill-opacity=${l}
                       stroke=${o} stroke-width=${c}
                       stroke-dasharray=${a} opacity=${r} />`;
    case "circle":
      return _`<circle cx=${U(t.x(e.cx))} cy=${U(t.y(e.cy))} r=${U(t.len(e.r))}
                         fill=${n} fill-opacity=${l}
                         stroke=${o} stroke-width=${c} opacity=${r} />`;
    case "ellipse":
      return _`<ellipse cx=${U(t.x(e.cx))} cy=${U(t.y(e.cy))}
                          rx=${U(t.sx(e.rx))} ry=${U(t.sy(e.ry))}
                          fill=${n} fill-opacity=${l}
                          stroke=${o} stroke-width=${c} opacity=${r} />`;
    case "poly": {
      const h = e.pts.map(([d, p]) => `${U(t.x(d))},${U(t.y(p))}`).join(" ");
      return e.closed ? _`<polygon points=${h}
                       fill=${n} fill-opacity=${l}
                       stroke=${o} stroke-width=${c}
                       stroke-linejoin="round" opacity=${r} />` : _`<polyline points=${h} fill="none"
                        stroke=${o} stroke-width=${c}
                        stroke-linejoin="round" opacity=${r} />`;
    }
    case "path": {
      const h = e.cmds.map(
        (d) => d[0] === "Z" ? "Z" : `${d[0]} ${d.slice(1).map((p, f) => f % 2 === 0 ? U(t.x(p)) : U(t.y(p))).join(" ")}`
      ).join(" ");
      return _`<path d=${h}
                       fill=${n} fill-opacity=${l}
                       stroke=${o} stroke-width=${c}
                       stroke-linejoin="round" opacity=${r} />`;
    }
  }
}
function sf(e, t, i, n) {
  const o = $s(e, t, i, "box"), s = $s(e, t, i, "square");
  return e.parts.map((r) => of(r, r.space === "square" ? s : o, n));
}
const rf = /* @__PURE__ */ new Set(["light", "switch", "fan", "input_boolean"]);
function Fr(e) {
  const t = e?.split(".")[0] ?? "";
  return rf.has(t) ? { action: "toggle" } : { action: "more-info" };
}
function Ie(e) {
  return e !== void 0 && e.action !== "none";
}
function Dr(e, t) {
  return t === "tap" ? e.tap_action ?? Fr(e.entity) : t === "hold" ? e.hold_action : e.double_tap_action;
}
function af(e, t) {
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
      return Nr(t) !== null;
    case "fire-dom-event":
      return !0;
    default:
      return !1;
  }
}
function lf(e) {
  return ["tap", "hold", "double_tap"].some(
    (t) => af(e, Dr(e, t))
  );
}
function Nr(e) {
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
        const o = Nr(n);
        o && t.callService(o.domain, o.service, o.data, o.target);
        break;
      }
      case "fire-dom-event":
        e.dispatchEvent(new CustomEvent("ll-custom", { detail: n, bubbles: !0, composed: !0 }));
        break;
    }
  }
}
const cf = 0.75, _i = 8, df = 400;
function rn(e, t) {
  return typeof e == "number" && Number.isFinite(e) && e > 0 ? e : t;
}
function hf(e) {
  let t = 0;
  for (let i = 0, n = e.length - 1; i < e.length; n = i++)
    t += e[n].x * e[i].y - e[i].x * e[n].y;
  return t / 2;
}
function pf(e, t, i, n) {
  const o = n.x - i.x, s = n.y - i.y, r = o * o + s * s;
  if (r === 0) return Math.hypot(e - i.x, t - i.y);
  let a = ((e - i.x) * o + (t - i.y) * s) / r;
  return a = Math.max(0, Math.min(1, a)), Math.hypot(e - (i.x + a * o), t - (i.y + a * s));
}
function uf(e, t) {
  const i = [];
  for (let n = 0; n < e.length; n++) {
    const o = e[n], s = o.b.x - o.a.x, r = o.b.y - o.a.y, a = Math.hypot(s, r);
    if (a <= t) continue;
    const l = [0, 1], c = t / a;
    for (let h = 0; h < e.length; h++) {
      if (h === n) continue;
      const d = e[h], p = d.b.x - d.a.x, f = d.b.y - d.a.y, g = s * f - r * p;
      if (Math.abs(g) > 1e-9) {
        const b = ((d.a.x - o.a.x) * f - (d.a.y - o.a.y) * p) / g, x = ((d.a.x - o.a.x) * r - (d.a.y - o.a.y) * s) / g, v = t / Math.max(Math.hypot(p, f), 1e-9);
        b > c && b < 1 - c && x >= -v && x <= 1 + v && l.push(b);
        continue;
      }
      for (const b of [d.a, d.b]) {
        const x = ((b.x - o.a.x) * s + (b.y - o.a.y) * r) / (a * a);
        if (x <= c || x >= 1 - c) continue;
        const v = o.a.x + x * s, w = o.a.y + x * r;
        Math.hypot(b.x - v, b.y - w) <= t && l.push(x);
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
function ff(e, t) {
  const i = [], n = /* @__PURE__ */ new Map(), o = (c) => Math.floor(c / t), s = (c) => {
    const h = o(c.x), d = o(c.y);
    for (let b = -1; b <= 1; b++)
      for (let x = -1; x <= 1; x++)
        for (const v of n.get(`${h + b}:${d + x}`) ?? [])
          if (Math.hypot(i[v].x - c.x, i[v].y - c.y) <= t) return v;
    const p = i.push({ x: c.x, y: c.y }) - 1, f = `${h}:${d}`, g = n.get(f);
    return g ? g.push(p) : n.set(f, [p]), p;
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
function mf(e, t) {
  const { points: i, neighbors: n } = ff(e, t), o = /* @__PURE__ */ new Set(), s = [];
  for (let r = 0; r < i.length; r++)
    for (const a of n[r]) {
      if (o.has(`${r}>${a}`)) continue;
      const l = [];
      let c = r, h = a, d = !1;
      for (let p = 0; p <= i.length * i.length + 4; p++) {
        o.add(`${c}>${h}`), l.push(c);
        const f = n[h], g = f.indexOf(c), b = f[(g - 1 + f.length) % f.length];
        if (c = h, h = b, c === r && h === a) {
          d = !0;
          break;
        }
      }
      d && l.length >= 3 && s.push(l.map((p) => ({ x: i[p].x, y: i[p].y })));
    }
  return s;
}
function gf(e, t, i) {
  for (let n = 0, o = e.length - 1; n < e.length; o = n++)
    for (const s of t)
      if (pf(s.x, s.y, e[o], e[n]) <= i) return !0;
  return !1;
}
function yf(e, t, i = {}) {
  const n = rn(i.weldEps, cf), o = rn(i.openingEps, _i), s = rn(i.minArea, df);
  if (e.length < 3) return [];
  const r = uf(
    e.map((l) => ({ a: { x: l.x1, y: l.y1 }, b: { x: l.x2, y: l.y2 } })),
    n
  );
  return mf(r, n).map((l) => ({ ring: l, area: hf(l) })).filter((l) => l.area >= s && !gf(l.ring, t, o)).sort((l, c) => c.area - l.area).map((l) => l.ring);
}
const ks = /* @__PURE__ */ new WeakMap();
function Hr(e, t) {
  const i = ks.get(e);
  if (i && i.openings === t) return i.out;
  const n = yf(e, t);
  return ks.set(e, { openings: t, out: n }), n;
}
const G = 8, jr = 0.05, Ot = "—";
function Wt(e, t) {
  if (!t || !e) return Ot;
  const i = e.states[t];
  return i ? e.formatEntityState(i) : Ot;
}
function Wr(e, t, i) {
  if (e.formatEntityState !== t.formatEntityState || e.formatEntityAttributeValue !== t.formatEntityAttributeValue) return !0;
  for (const n of i)
    if (e.states[n] !== t.states[n]) return !0;
  return !1;
}
function Mt(e) {
  const t = /* @__PURE__ */ new Set();
  (e.sunDimming || e.sunlight && !Ui(e)) && t.add("sun.sun");
  for (const i of mt(e)) {
    for (const n of i.openings)
      n.entity && t.add(n.entity), n.shutterEntity && t.add(n.shutterEntity), n.secondaryEntity && t.add(n.secondaryEntity), n.shutterSecondaryEntity && t.add(n.shutterSecondaryEntity);
    for (const n of i.items) {
      n.entity && t.add(n.entity), n.hideEntity && t.add(n.hideEntity), n.hideStateEntity && t.add(n.hideStateEntity), n.hideBadgeEntity && t.add(n.hideBadgeEntity);
      for (const o of Ne(n)) o.entity && t.add(o.entity);
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
function no(e, t, i) {
  if (!t || !e) return Ot;
  const n = e.states[t];
  if (!n) return Ot;
  const o = e.formatEntityAttributeValue;
  if (typeof o == "function") return o(n, i);
  const s = n.attributes?.[i];
  return s == null || s === "" ? Ot : String(s);
}
function bf(e, t, i) {
  const n = i.entity || (i.attribute ? t.entity : void 0);
  return n ? i.attribute ? no(e, n, i.attribute) : Wt(e, n) : "";
}
function Ne(e) {
  return [...e.secondaryEntity || e.secondaryAttribute ? [{ entity: e.secondaryEntity, attribute: e.secondaryAttribute }] : [], ...e.readings ?? []];
}
function _f(e, t) {
  return t.attribute ? no(e, t.entity, t.attribute) : Wt(e, t.entity);
}
function oo(e, t) {
  if (!t.entity) return t.text ?? "";
  const i = t.attribute ? no(e, t.entity, t.attribute) : Wt(e, t.entity);
  return t.text ? `${t.text} ${i}` : i;
}
function ji(e, t) {
  return Ur(e, t)?.color;
}
function Ur(e, t) {
  if (!e?.length) return;
  const i = typeof t == "number" ? t : Number(t), n = typeof t != "boolean" && t !== "" && t != null && Number.isFinite(i), o = t == null ? "" : String(t).trim().toLowerCase();
  let s, r, a;
  for (const l of e)
    !l || typeof l != "object" || typeof l.color != "string" || (typeof l.state == "string" && l.state !== "" ? s === void 0 && o !== "" && l.state.trim().toLowerCase() === o && (s = l) : typeof l.above == "number" ? n && i > l.above && (!r || l.above > (r.above ?? -1 / 0)) && (r = l) : a === void 0 && (a = l));
  return s ?? r ?? a;
}
function vf(e, t) {
  if (!e.entity) return;
  const i = ji(e.stateColor, t);
  if (i) return D(i);
  if (e.activeColor && Me(e.entity, t)) return D(e.activeColor);
}
function Ss(e, t) {
  if (!e.entity) return;
  const i = ji(e.stateColor, t);
  if (i) return D(i);
  if (e.activeColor && Me(e.entity, t)) return D(e.activeColor);
}
function so(e, t) {
  if (!t || t.state !== "on") return;
  const i = t.attributes ?? {}, n = i.brightness, o = typeof n == "number" && Number.isFinite(n) ? Math.max(0, Math.min(255, n)) : void 0, s = o === void 0 ? gi : hs + (gi - hs) * (o / 255), r = O(e.glowRadius, zi) * (o === void 0 ? 1 : ps + (1 - ps) * (o / 255)), a = i.rgb_color;
  if (Array.isArray(a) && a.length >= 3) {
    const [l, c, h] = a;
    if ([l, c, h].every((d) => typeof d == "number" && Number.isFinite(d))) {
      const d = (f) => Math.max(0, Math.min(255, Math.round(f))), p = D(`rgb(${d(l)}, ${d(c)}, ${d(h)})`);
      if (p) return { color: p, opacity: s, radius: r };
    }
  }
  return { color: he(e.glowColor, Lr), opacity: s, radius: r };
}
function Br(e) {
  if (!e || e.state !== "on") return;
  const t = e.attributes ?? {}, i = t.rgb_color;
  if (!Array.isArray(i) || i.length < 3) return;
  const [n, o, s] = i;
  if (![n, o, s].every((h) => typeof h == "number" && Number.isFinite(h))) return;
  const r = t.brightness, a = typeof r == "number" && Number.isFinite(r) ? Math.max(0, Math.min(255, r)) : void 0, l = a === void 0 ? 1 : us + (1 - us) * (a / 255), c = (h) => Math.max(0, Math.min(255, Math.round(h * l)));
  return D(`rgb(${c(n)}, ${c(o)}, ${c(s)})`);
}
function xf(e, t) {
  return t ? so(e, t) : {
    color: he(e.glowColor, Lr),
    opacity: gi,
    radius: O(e.glowRadius, zi)
  };
}
function ro(e, t, i) {
  const n = i.x2 - i.x1, o = i.y2 - i.y1, s = n * n + o * o, r = s === 0 ? 0 : Math.max(0, Math.min(1, ((e - i.x1) * n + (t - i.y1) * o) / s)), a = i.x1 + r * n, l = i.y1 + r * o;
  return Math.hypot(e - a, t - l);
}
function ao(e, t, i, n, o) {
  const s = o.x2 - o.x1, r = o.y2 - o.y1, a = i * r - n * s;
  if (Math.abs(a) < 1e-12) return;
  const l = o.x1 - e, c = o.y1 - t, h = (l * r - c * s) / a, d = (l * n - c * i) / a;
  if (!(h <= 1e-9 || d < 0 || d > 1))
    return h;
}
function wf(e, t, i, n, o) {
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
function Gr(e, t, i) {
  if (Z(e) === "fixed") return 0;
  const n = Math.max(0, Math.min(1, t)), o = Math.max(0, Math.min(1, i ?? t));
  if (Z(e) === "swing")
    return Fe(e) === "double" ? (n + o) / 2 : n * fo(e);
  if (Z(e) === "awning") return n;
  switch (Wi(e)) {
    case "biparting":
      return (n + o) / 2;
    case "biparting-bypass":
    case "converging":
      return (n + o) / 4;
    default:
      return n;
  }
}
function Kr(e, t, i, n) {
  return n !== void 0 && n <= 0 ? [0, 0] : vo(e) && Z(e) !== "roll" ? [0, 1] : $f(e, t, i);
}
function $f(e, t, i) {
  const n = Gr(e, t, i), o = [(1 - n) / 2, (1 + n) / 2];
  if (fo(e) < 1) {
    const l = [0, n];
    return e.flipH ? [1 - l[1], 1 - l[0]] : l;
  }
  if (Z(e) !== "swing" || Fe(e) !== "double") return o;
  const s = Math.max(0, Math.min(1, t)), r = Math.max(0, Math.min(1, i ?? t)), a = [0.5 - s / 2, 0.5 + r / 2];
  return e.flipH ? [1 - a[1], 1 - a[0]] : a;
}
function lo(e, t, i) {
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
    for (const { o: x, span: v } of n) {
      if (ro(x.x, x.y, s) > _i) continue;
      const w = ((x.x - s.x1) * r + (x.y - s.y1) * a) / l, y = Math.cos(x.angle * Math.PI / 180) * r + Math.sin(x.angle * Math.PI / 180) * a >= 0 ? 1 : -1, $ = (Q) => y * (Q - 0.5) * x.length / c, E = w + $(v[0]), T = w + $(v[1]), I = Math.max(0, Math.min(E, T)), R = Math.min(1, Math.max(E, T));
      R > I && h.push([I, R]);
    }
    if (!h.length) {
      o.push(s);
      continue;
    }
    h.sort((x, v) => x[0] - v[0]);
    const d = [h[0]];
    for (const x of h.slice(1)) {
      const v = d[d.length - 1];
      x[0] <= v[1] ? v[1] = Math.max(v[1], x[1]) : d.push(x);
    }
    const p = (x) => ({ x: s.x1 + r * x, y: s.y1 + a * x });
    let f = 0, g = 0;
    const b = (x, v) => {
      if ((v - x) * c < G / 2) return;
      const w = p(x), y = p(v);
      o.push({ id: `${s.id}#${g++}`, x1: w.x, y1: w.y, x2: y.x, y2: y.y });
    };
    for (const [x, v] of d)
      b(f, x), f = v;
    b(f, 1);
  }
  return o;
}
function qr(e, t, i, n) {
  const o = n.filter((d) => {
    const p = ro(e, t, d);
    return p < i && p > G;
  });
  if (!o.length) return;
  const s = i * 1.01, r = [
    { id: "b1", x1: e - s, y1: t - s, x2: e + s, y2: t - s },
    { id: "b2", x1: e + s, y1: t - s, x2: e + s, y2: t + s },
    { id: "b3", x1: e + s, y1: t + s, x2: e - s, y2: t + s },
    { id: "b4", x1: e - s, y1: t + s, x2: e - s, y2: t - s }
  ], a = o.map((d) => wf(d, e - s, t - s, e + s, t + s)).filter((d) => d !== void 0);
  if (!a.length) return;
  const l = [...a, ...r], c = [];
  for (const d of l)
    for (const [p, f] of [
      [d.x1, d.y1],
      [d.x2, d.y2]
    ]) {
      const g = Math.atan2(f - t, p - e);
      for (const b of [g - 1e-4, g, g + 1e-4]) {
        const x = Math.cos(b), v = Math.sin(b);
        let w = 1 / 0;
        for (const y of l) {
          const $ = ao(e, t, x, v, y);
          $ !== void 0 && $ < w && (w = $);
        }
        w < 1 / 0 && c.push({ x: e + x * w, y: t + v * w, a: b });
      }
    }
  c.sort((d, p) => d.a - p.a);
  const h = (d) => Math.round(d * 100) / 100;
  return c.map(({ x: d, y: p }) => ({ x: h(d), y: h(p) }));
}
function Vr(e, t, i, n) {
  const o = t.radius, s = n?.length ? qr(e.x, e.y, o, n) : void 0, r = `${i}-clip`;
  return _`
    ${s ? _`<clipPath id=${r}>
                <polygon points=${s.map((a) => `${a.x},${a.y}`).join(" ")} />
              </clipPath>` : m}
    <radialGradient id=${i} gradientUnits="userSpaceOnUse"
                    cx=${e.x} cy=${e.y} r=${o}>
      <stop offset="0" stop-color=${t.color} stop-opacity=${t.opacity} />
      <stop offset="1" stop-color=${t.color} stop-opacity="0" />
    </radialGradient>
    <circle class="fp-glow" cx=${e.x} cy=${e.y} r=${o}
            fill=${`url(#${i})`}
            clip-path=${s ? `url(#${r})` : m} />`;
}
function kf(e, t, i, n, o, s) {
  const r = e.map((l) => {
    if (!l.glow) return;
    const c = so(l, t?.[l.entity]);
    if (c)
      return {
        // Normalized against the glow's own ceiling, so a full-brightness lamp
        // clears the dim entirely and a dim one clears proportionally.
        strength: Math.max(0, Math.min(1, c.opacity / gi)),
        // Straight off the paint, so the clearing tracks the pool as it shrinks
        // with brightness (issue #123) instead of staying at the configured size.
        radius: c.radius
      };
  });
  if (!r.some((l) => l !== void 0)) return m;
  const a = G;
  return _`
    <defs>
      <mask id=${o} maskUnits="userSpaceOnUse"
            x=${-a} y=${-a} width=${i + a * 2} height=${n + a * 2}>
        <rect x=${-a} y=${-a} width=${i + a * 2} height=${n + a * 2}
              fill="white" />
        ${e.map((l, c) => {
    const h = r[c];
    if (h === void 0) return m;
    const { strength: d, radius: p } = h, f = `${o}-${c}`, g = s?.length ? qr(l.x, l.y, p, s) : void 0, b = `${f}-clip`;
    return _`
            ${g ? _`<clipPath id=${b}>
                        <polygon points=${g.map((x) => `${x.x},${x.y}`).join(" ")} />
                      </clipPath>` : m}
            <radialGradient id=${f} gradientUnits="userSpaceOnUse"
                            cx=${l.x} cy=${l.y} r=${p}>
              <stop offset="0" stop-color="#000" stop-opacity=${d} />
              <stop offset="1" stop-color="#000" stop-opacity="0" />
            </radialGradient>
            <circle cx=${l.x} cy=${l.y} r=${p} fill=${`url(#${f})`}
                    clip-path=${g ? `url(#${b})` : m} />`;
  })}
      </mask>
    </defs>`;
}
function Zr(e, t, i, n, o = Ee) {
  const s = G;
  return _`
    <defs>
      <mask id=${n} maskUnits="userSpaceOnUse"
            x=${-s} y=${-s} width=${t + s * 2} height=${i + s * 2}>
        <rect x=${-s} y=${-s} width=${t + s * 2} height=${i + s * 2}
              fill="white" />
        ${e.map((r) => {
    const a = r.angle ? `rotate(${r.angle} ${r.x} ${r.y})` : void 0, l = Hi(o, r.type)?.footprint === "ellipse", c = 1 - qc;
    return l ? _`<ellipse cx=${r.x} cy=${r.y} rx=${r.w / 2} ry=${r.h / 2}
                           fill="#000" fill-opacity=${c} transform=${a ?? m} />` : _`<rect x=${r.x - r.w / 2} y=${r.y - r.h / 2} width=${r.w} height=${r.h}
                        fill="#000" fill-opacity=${c} transform=${a ?? m} />`;
  })}
      </mask>
    </defs>`;
}
function Xr(e, t, i) {
  if (e.enableHideByEntity) {
    const n = e.hideEntity || e.entity;
    let o = t;
    return n && i && i.states[n] && (o = e.hideAttribute ? i.states[n].attributes[e.hideAttribute] : i.states[n].state), co(
      o,
      e.hideMode,
      e.hideState,
      e.hideOperator,
      e.hideThreshold,
      e.hideInvert
    );
  }
  return e.hideWhenInactive ? e.entity ? !Me(e.entity, t) : !0 : !1;
}
function Sf(e, t) {
  return e.showOnlyWhenZoomed ? t ? e.area ? e.area !== t.id && e.area !== t.name : !Bi(t.points ?? [], e.x, e.y) : !0 : !1;
}
function Ef(e, t, i) {
  if (!e.enableHideBadgeByEntity) return !1;
  let n = t;
  if (i) {
    const o = e.hideBadgeEntity || e.entity;
    o && i.states[o] && (n = e.hideBadgeAttribute && i.states[o].attributes ? String(i.states[o].attributes[e.hideBadgeAttribute]) : i.states[o].state);
  }
  return co(
    n,
    e.hideBadgeMode,
    e.hideBadgeMatch,
    // Ensure this property is correctly mapped in your types, or use hideBadgeState
    e.hideBadgeOperator,
    e.hideBadgeThreshold,
    e.hideBadgeInvert
  );
}
const Yr = 12;
function Jr(e, t) {
  const i = [];
  if (t.showName) {
    const o = t.entity ? e?.states[t.entity]?.attributes?.friendly_name : void 0, s = t.name || o || t.entity;
    s && i.push(s);
  }
  let n = !1;
  if (t.enableHideStateByEntity && e) {
    const o = t.hideStateEntity || t.entity;
    let s;
    o && e.states[o] && (s = t.hideStateAttribute && e.states[o].attributes ? e.states[o].attributes[t.hideStateAttribute] : e.states[o].state), n = co(
      s,
      t.hideStateMode,
      t.hideStateMatch,
      t.hideStateOperator,
      t.hideStateThreshold,
      t.hideStateInvert
    );
  }
  if (t.entity && (t.showState ?? t.kind === "sensor") && !n && i.push(_f(e, t)), !n)
    for (const o of Ne(t)) {
      if (o.showState === !1) continue;
      const s = bf(e, t, o);
      s && i.push(s);
    }
  return i.join(" · ");
}
const Es = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
function co(e, t = "state", i, n = "==", o, s = !1) {
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
    if (Es.has(a) && !Es.has(l))
      return !1;
    r = n === "!=" ? a !== l : a === l;
  }
  return s ? !r : r;
}
function Af(e) {
  return e.showName || (e.showState ?? e.kind === "sensor") ? !0 : Ne(e).some((t) => t.showState !== !1 && (t.entity || t.attribute));
}
function ho(e) {
  const t = e.labelPosition;
  return t === "left" || t === "right" ? t : "below";
}
function Mf(e, t) {
  const i = Jr(e, t);
  return i ? { text: i, live: !0 } : { text: t.name || t.entity || t.kind, live: !1 };
}
function Qr(e) {
  return Math.min(40, Math.max(8, O(e, Yr)));
}
function ea(e, t) {
  if (!e.disableLabelColor) return t;
  if (e.useCustomLabelColor)
    return D(e.labelCustomColor) ?? void 0;
}
function Cf(e) {
  return Math.min(40, Math.max(8, O(e, Qn)));
}
function Tf(e) {
  return Math.min(Ar, Math.max(2, O(e, G)));
}
function ta(e) {
  return e === void 0 ? "" : `stroke-width:${Tf(e)};`;
}
function po(e) {
  return e === "plan" ? "plan" : "fixed";
}
function H(e, t) {
  return t === "plan" ? `calc(${e} * var(--fp-u, 1px))` : `${e}px`;
}
function If(e, t) {
  return t !== "plan" && e === void 0 ? "" : `font-size:${H(Cf(e), t)};`;
}
function As(e) {
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
const Pf = {
  media_player: { on: "mdi:television-play", off: "mdi:television-off" },
  fan: { on: "mdi:fan", off: "mdi:fan-off" },
  lock: { on: "mdi:lock-open-variant", off: "mdi:lock" },
  camera: { on: "mdi:cctv", off: "mdi:cctv-off" },
  humidifier: { on: "mdi:air-humidifier", off: "mdi:air-humidifier-off" },
  vacuum: { on: "mdi:robot-vacuum", off: "mdi:robot-vacuum-variant" }
}, Of = {
  paused: "mdi:television-pause",
  idle: "mdi:television"
}, zf = {
  off: "mdi:power",
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan"
}, Lf = {
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
}, Rf = {
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
}, Ff = {
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
}, Df = {
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
function Nf(e) {
  return e === "on" || e === "open" || e === "home" || e === "playing";
}
const Hf = {
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
function Me(e, t) {
  if (!t || t === "unavailable" || t === "unknown") return !1;
  const i = e?.split(".")[0] ?? "", n = Hf[i];
  return n ? n.has(t) : Nf(t);
}
const jf = {
  fan: "spin",
  media_player: "pulse",
  vacuum: "pulse"
};
function ia(e) {
  return jf[e?.split(".")[0] ?? ""];
}
const Wf = /* @__PURE__ */ new Set(["idle", "off"]);
function Uf(e) {
  const t = e?.hvac_action;
  return typeof t != "string" ? !0 : !Wf.has(t);
}
function na(e, t, i) {
  const n = e.iconAnimation ?? "auto";
  if (n !== "none" && Me(e.entity, t)) {
    if (e.entity?.split(".")[0] === "climate") {
      if (!Uf(i)) return;
      if (t === "fan_only") return "spin";
    }
    return n === "spin" || n === "pulse" ? n : ia(e.entity);
  }
}
const Bf = /* @__PURE__ */ new Set(["motion", "occupancy", "presence", "vibration"]);
function oa(e, t) {
  const i = e?.split(".")[0];
  return i === "device_tracker" || i === "person" ? !0 : i === "binary_sensor" && !!t && Bf.has(t);
}
function sa(e, t, i, n) {
  const o = e.split(".")[0];
  if (o === "climate")
    return zf[n ?? ""] ?? (i ? "mdi:thermostat" : "mdi:power");
  if (o === "weather") return Lf[n ?? ""] ?? "mdi:weather-cloudy";
  if (o === "media_player" && n) {
    const r = Of[n];
    if (r) return r;
  }
  const s = Pf[o];
  if (s) return i ? s.on : s.off;
  if (t) {
    if (o === "binary_sensor") {
      const r = Rf[t];
      return r ? i ? r.on : r.off : void 0;
    }
    if (o === "sensor") return Ff[t];
    if (o === "cover") {
      const r = Df[t];
      return r ? i ? r.on : r.off : void 0;
    }
  }
}
function uo(e, t) {
  if (t)
    return e.attribute ? t.attributes?.[e.attribute] : t.state;
}
function Tn(e, t, i) {
  const n = It(Ur(e.stateColor, uo(e, t))?.icon);
  if (n) return n;
  const o = It(e.icon);
  if (o) return o;
  if (!e.entity) return As(e.kind);
  if (i) return i;
  const s = t?.attributes?.icon;
  return s || (sa(
    e.entity,
    t?.attributes?.device_class,
    Me(e.entity, t?.state),
    t?.state
  ) ?? As(e.kind));
}
function ra(e) {
  const t = Math.round(e);
  let i = Math.round(t * 0.62);
  return i % 2 !== t % 2 && (i += 1), Math.max(2, i);
}
function Ut(e) {
  return e.badgeContent === "icon" || e.badgeContent === "value" || e.badgeContent === "none" ? e.badgeContent : e.showIcon === !1 ? "none" : "icon";
}
function ei(e) {
  const t = e.pressEffect;
  return t === "scale" || t === "ripple" || t === "flash" || t === "none" ? t : Pr;
}
function Gf(e, t, i) {
  if (e.goToFloor !== "up" && e.goToFloor !== "down") return;
  const n = t.findIndex((s) => s.id === i);
  return n < 0 ? void 0 : t[n + (e.goToFloor === "up" ? 1 : -1)]?.id;
}
function aa(e) {
  const t = e.offlineStyle;
  return t === "dim" || t === "strike" || t === "none" ? t : Or;
}
function In(e, t) {
  return e.entity ? t === void 0 || _t(t) : !1;
}
const Kf = {
  climate: { attribute: "current_temperature", unit: "°" },
  water_heater: { attribute: "current_temperature", unit: "°" },
  humidifier: { attribute: "current_humidity", unit: "%" }
};
function Et(e) {
  if (e == null || typeof e == "boolean" || typeof e == "string" && e.trim() === "") return;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function qf(e) {
  if (typeof e != "string") return "";
  const t = e.trim();
  return t === "°C" || t === "°F" || t === "K" ? "°" : t === "ppm" || t === "ppb" ? "" : t.length <= 3 ? t : "";
}
function ti(e) {
  return Math.abs(e) < 10 && !Number.isInteger(e) ? e.toFixed(1) : String(Math.round(e));
}
function Vf(e, t) {
  return t === "W" && Math.abs(e) >= 1e3 ? { n: e / 1e3, unit: "kW" } : { n: e, unit: t };
}
function Ms(e, t) {
  const i = Vf(e, qf(t));
  return ti(i.n) + i.unit;
}
function la(e, t) {
  return da(e, t)?.text;
}
function ca(e) {
  return e === "primary" ? "primary" : e === "secondary" ? 0 : typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : void 0;
}
function da(e, t) {
  if (!e || !t.entity) return;
  const i = Ne(t), n = () => {
    const a = e.states[t.entity], l = a?.attributes, c = Kf[t.entity.split(".")[0]];
    if (t.attribute) {
      const d = Et(l?.[t.attribute]);
      if (d !== void 0)
        return ti(d) + (t.attribute === c?.attribute ? c.unit : "");
    }
    if (c) {
      const d = Et(l?.[c.attribute]);
      if (d !== void 0) return ti(d) + c.unit;
    }
    const h = Et(a?.state);
    return h === void 0 ? void 0 : Ms(h, l?.unit_of_measurement);
  }, o = (a) => {
    const l = i[a];
    if (!l) return;
    const c = l.entity || (l.attribute ? t.entity : void 0);
    if (!c) return;
    const h = e.states[c], d = h?.attributes;
    if (l.attribute) {
      const f = Et(d?.[l.attribute]);
      return f === void 0 ? void 0 : ti(f);
    }
    const p = Et(h?.state);
    return p === void 0 ? void 0 : Ms(p, d?.unit_of_measurement);
  }, s = ca(t.badgeEntity);
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
const Zf = { ".": 0.28, "-": 0.38, "°": 0.45, "%": 1, k: 0.58 }, Xf = 0.7, Yf = 0.85;
function Cs(e) {
  let t = 0;
  for (const i of e)
    t += Zf[i] ?? (i >= "0" && i <= "9" ? Xf : Yf);
  return t;
}
function ha(e, t) {
  const i = Math.round(O(e, qe)), n = Math.max(0, i - 6), o = Cs(t) > 0 ? n / Cs(t) : i;
  let s = Math.round(Math.min(i * 0.46, o));
  return s % 2 !== i % 2 && (s -= 1), Math.max(6, s);
}
function Ts(e) {
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
function fo(e) {
  if (Z(e) !== "swing" || Fe(e) !== "single") return 1;
  const t = e.sashSpan;
  return typeof t != "number" || !Number.isFinite(t) ? 1 : Math.max(jr, Math.min(1, t));
}
function mo(e) {
  const t = e.type === "door" && Z(e) === "swing";
  return e.invert ? !t : t;
}
function Jf(e) {
  return { sx: e.flipH ? -1 : 1, sy: e.flipV ? -1 : 1 };
}
function Wi(e) {
  return Z(e) === "slide" ? e.sliderStyle ?? "single" : "single";
}
function pa(e) {
  return e === "biparting" || e === "biparting-bypass" || e === "converging";
}
function zt(e) {
  return Z(e) === "swing" ? Fe(e) === "double" : pa(Wi(e));
}
function ua(e) {
  return { ...e, entity: e.secondaryEntity };
}
function Pn(e) {
  return e === "window" ? "double" : "single";
}
function Fe(e) {
  return Z(e) === "swing" ? e.sash ?? Pn(e.type) : Pn(e.type);
}
function pt(e) {
  return e.shutterStyle === "roll" || e.shutterStyle === "swing" ? e.shutterStyle : e.shutterEntity?.split(".")[0] === "binary_sensor" ? "swing" : "roll";
}
function Oe(e, t = !1) {
  if (!e || _t(e.state)) return 0;
  const i = e.attributes?.current_position;
  if (typeof i == "number" && Number.isFinite(i)) {
    const o = Math.max(0, Math.min(1, i / 100));
    return t ? 1 - o : o;
  }
  const n = e.state === "open" || e.state === "opening" || e.state === "closing" || e.state === "on";
  return (t ? !n : n) ? 1 : 0;
}
function ii(e, t = !1) {
  return !e || _t(e.state) ? !1 : Oe(e, t) > 0 || e.state === "opening" || e.state === "closing";
}
const Qf = /* @__PURE__ */ new Set(["window", "blind", "shade", "shutter", "curtain", "awning"]), em = /* @__PURE__ */ new Set(["blind", "shade", "curtain"]), tm = /* @__PURE__ */ new Set(["garage", "garage_door", "shutter"]);
function im(e) {
  const t = e ?? "";
  return {
    type: Qf.has(t) ? "window" : "door",
    motion: tm.has(t) ? "roll" : em.has(t) ? "slide" : void 0
  };
}
const nm = 3;
function om(e, t) {
  return e.split(".")[0] === "cover" && t & nm ? "cover-toggle" : "more-info";
}
function go(e, t, i) {
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
          !s && om(r, i(r)) === "cover-toggle" ? "toggle" : "more-info"
        )
      }
    } : void 0;
  if (t === "hold" && a) return { entity: a, config: { action: "more-info" } };
}
function ni(e, t) {
  const i = t === "tap" ? e.tap_action : t === "hold" ? e.hold_action : e.double_tap_action;
  if (i)
    return { entity: i.entity ?? e.entity, config: i };
}
function sm(e) {
  return ["tap", "hold", "double_tap"].some(
    (t) => Ie(ni(e, t)?.config)
  );
}
function rm(e, t) {
  return ["tap", "hold", "double_tap"].some(
    (i) => Ie(go(e, i, t)?.config)
  );
}
function _t(e) {
  return e === "unavailable" || e === "unknown";
}
function am(e, t) {
  if (!e.entity || t === void 0) return mo(e);
  if (lm(e.entity, t)) return !1;
  const i = cm(e.entity, t);
  return e.invert ? !i : i;
}
function lm(e, t) {
  return _t(t) ? !0 : e.split(".")[0] === "lock" && t === "jammed";
}
function cm(e, t) {
  return e.split(".")[0] === "lock" ? Me(e, t) : t === "on" || t === "open" || t === "opening" || t === "closing";
}
function dm(e) {
  return e === "opening" || e === "closing";
}
function ut(e, t) {
  if (!e.entity || !t) return mo(e) ? 1 : 0;
  if (_t(t.state)) return 0;
  const i = t.attributes?.current_position;
  if (typeof i == "number" && Number.isFinite(i)) {
    const n = Math.max(0, Math.min(1, i / 100));
    return e.invert ? 1 - n : n;
  }
  return am(e, t.state) ? 1 : 0;
}
function On(e, t) {
  return !e.entity || !t || _t(t.state) ? !1 : dm(t.state) || ut(e, t) > 0;
}
function Is(e, t, i) {
  const n = e / 2, o = 5, s = Math.max(3, Math.round(e / 12)), r = [];
  for (let a = 1; a < s; a++) {
    const l = -n + e * a / s;
    r.push(
      _`<line x1=${l} y1=${-o / 2} x2=${l} y2=${o / 2}
            stroke=${Oi} stroke-width="0.75" />`
    );
  }
  return _`<g class="fp-roll-curtain" style="transform:scaleY(${1 - i});">
      <rect x=${-n} y=${-o / 2} width=${e} height=${o}
            style="fill:${t};" />
      ${r}
    </g>`;
}
function hm(e, t, i, n, o = 1, s = i, r = n) {
  const a = e / 2, l = 3, c = o * (t / 2 + l / 2), h = (d, p) => {
    const f = [], g = Math.max(2, Math.round(p / 14));
    for (let b = 1; b < g; b++) {
      const x = d + p * b / g;
      f.push(
        _`<line x1=${x} y1=${-l / 2} x2=${x} y2=${l / 2}
              stroke=${Oi} stroke-width="0.75" />`
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
        <g class="fp-leaf-r" style="transform:rotate(${-o * 90 * r}deg);">
          <rect x=${-a} y=${-l / 2} width=${a} height=${l} style="fill:${s};" />
          ${h(-a, a)}
        </g>
      </g>`;
}
const fa = 22, vi = 14, xi = 22, wi = 15;
function yo(e, t = 0) {
  const i = e.flipV ? -1 : 1, n = e.angle * Math.PI / 180, o = { x: -Math.sin(n) * i, y: Math.cos(n) * i };
  return t === 90 ? { x: -o.y, y: o.x } : t === 180 ? { x: -o.x, y: -o.y } : t === 270 ? { x: o.y, y: -o.x } : o;
}
function bo(e, t = fa) {
  const i = (e.flipV ? -1 : 1) * t, n = e.angle * Math.PI / 180;
  return { x: e.x - Math.sin(n) * i, y: e.y + Math.cos(n) * i };
}
function ma(e) {
  return !!(e.entity && e.shutterEntity) && (e.showShutterIcon ?? !0);
}
const pm = { on: "mdi:window-shutter-open", off: "mdi:window-shutter" }, Ps = {
  door: { on: "mdi:door-open", off: "mdi:door-closed" },
  window: { on: "mdi:window-open", off: "mdi:window-closed" }
};
function ga(e, t, i, n, o, s) {
  const r = It(t);
  if (r) return r;
  const a = It(s);
  if (a) return a;
  const l = It(i?.attributes?.icon);
  return l || (sa(e, i?.attributes?.device_class, n) ?? (n ? o.on : o.off));
}
function ya(e, t, i, n) {
  return ga(
    e.shutterEntity ?? "",
    e.shutterIcon,
    t,
    i,
    pm,
    n
  );
}
function ba(e) {
  return !!e.entity && (e.showIcon ?? !1);
}
function _a(e, t, i, n) {
  return ga(
    e.entity ?? "",
    e.icon,
    t,
    i,
    Ps[e.type] ?? Ps.door,
    n
  );
}
function va(e) {
  return bo(e, -fa);
}
function xa(e, t = 0) {
  const i = yo(e, t);
  return { x: -i.x, y: -i.y };
}
function wa(e, t) {
  const { color: i, open: n = !0, active: o = !1, accent: s = B } = t, r = e.length / 2, a = G + 4, l = D(t.inactive) ?? i, c = Math.max(0, Math.min(1, t.amount ?? (n ? 1 : 0))), h = t.second ? Math.max(0, Math.min(1, t.second.amount)) : c, d = (v, w) => he(v ? s : w === 0 ? l : i, B), p = d(o, c), f = t.second ? d(!!t.second.active, h) : p;
  let g;
  if (Z(e) === "swing") {
    const v = Fe(e) === "double", w = fo(e), y = v ? r : e.length * w, $ = Math.PI / 2 * y, E = (I, R, Q) => _`<path class="fp-door-arc" d=${I}
              fill="none" stroke-width="1.5" stroke-dasharray=${$}
              style="stroke:${R};stroke-dashoffset:${$ * (1 - Q)};" />`, T = e.type === "window" ? _`
        <line x1=${-r} y1=${-a / 2} x2=${-r} y2=${a / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${r} y1=${-a / 2} x2=${r} y2=${a / 2}
              stroke=${i} stroke-width="2" />` : m;
    g = _`
        ${T}
        ${v ? (
      // Two leaves hinged at opposite jambs, meeting in the middle when
      // shut and each tracing its own quarter circle outward.
      _`${E(`M 0 0 A ${r} ${r} 0 0 0 ${-r} ${-r}`, p, c)}${E(
        `M 0 0 A ${r} ${r} 0 0 1 ${r} ${-r}`,
        f,
        h
      )}`
    ) : (
      // Hinged at the −x jamb, so the tip starts `leafW` along the wall
      // and ends `leafW` out from it. At full span that is exactly the
      // arc this drew before `sashSpan` existed.
      E(`M ${-r + y} 0 A ${y} ${y} 0 0 0 ${-r} ${-y}`, p, c)
    )}
        ${// The pane the sash does not cover: fixed glass, drawn in the base
    // colour because it never opens and so is never the active part.
    // Nothing at full span, which is every opening that predates this.
    w < 1 ? _`<line x1=${-r + y} y1="0" x2=${r} y2="0"
              stroke=${i} stroke-width=${e.type === "window" ? 1.5 : 2.5} />` : m}
        <!-- leaf hinged at the left jamb (flipH mirrors it to the right one) -->
        <g transform="translate(${-r} 0)">
          <g class="fp-door-leaf" style="transform:rotate(${-90 * c}deg);">
            <rect x="0" y="-1.25" width=${y} height="2.5" style="fill:${p};" />
          </g>
        </g>
        ${v ? (
      // The other leaf, on its own sensor when it has one (issue #159):
      // a casement pair with a contact per sash draws left-open /
      // right-shut, exactly as a two-sensor slider parts unevenly.
      _`<g transform="translate(${r} 0)">
          <g class="fp-leaf-r" style="transform:rotate(${90 * h}deg);">
            <rect x=${-r} y="-1.25" width=${r} height="2.5" style="fill:${f};" />
          </g>
        </g>`
    ) : m}
      `;
  } else if (Z(e) === "fixed") {
    const v = e.type === "window" ? 1.5 : 2.5;
    g = _`
        ${e.type === "window" ? _`
        <line x1=${-r} y1=${-a / 2} x2=${-r} y2=${a / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${r} y1=${-a / 2} x2=${r} y2=${a / 2}
              stroke=${i} stroke-width="2" />` : m}
        <line x1=${-r} y1="0" x2=${r} y2="0"
              stroke=${i} stroke-width=${v} />`;
  } else if (Z(e) === "awning") {
    const v = Math.min(12, e.length * 0.16), w = 5, y = r - v / 2 - 1, $ = Math.max(0, y - v / 2), E = Math.min(r * 0.62, 34) * c, T = Math.min(E * 0.16, $ * 0.4), I = c > 0.02;
    g = _`
        <!-- jambs, as any window -->
        <line x1=${-r} y1=${-a / 2} x2=${-r} y2=${a / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${r} y1=${-a / 2} x2=${r} y2=${a / 2}
              stroke=${i} stroke-width="2" />
        <!-- The glass line: solid while the sash is shut and sitting in it,
             broken once the sash has swung out and left the gap behind. -->
        <line x1=${-r} y1="0" x2=${r} y2="0"
              stroke=${p} stroke-width="1.5"
              stroke-dasharray=${I ? "6 4" : m} />
        ${I ? (
      // A polyline, not a polygon, and that is the whole point of the
      // broken line above it. A closed shape strokes its own base back
      // along y=0 — straight over the dashes, solid — and the only
      // glass left uncovered would be the sliver outside `bx`, which
      // is exactly where the knuckles sit. The line would have been
      // dashed in the markup and solid on the screen at every size.
      _`<polyline
                    points="${-$},0 ${-$ + T},${-E} ${$ - T},${-E} ${$},0"
                    fill="none" stroke=${p} stroke-width="1.5"
                    stroke-linejoin="round" />`
    ) : m}
        <!-- Hinge knuckles, drawn whether or not it is open: they are what says
             this window is top-hung rather than fixed when it happens to be
             shut, and the request asked for them by name. -->
        ${[-y, y].map(
      (R) => _`
          <rect x=${R - v / 2} y=${-w / 2} width=${v} height=${w}
                fill="none" stroke=${p} stroke-width="1.25" />
          <line x1=${R} y1=${-w / 2} x2=${R} y2=${w / 2}
                stroke=${p} stroke-width="1.25" />`
    )}`;
  } else if (Z(e) === "roll")
    g = _`
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
        ${Is(e.length, p, c)}`;
  else {
    const v = e.type === "window" ? 1.5 : 2.5, w = _`
        <line x1=${-r} y1=${-a / 2} x2=${-r} y2=${a / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${r} y1=${-a / 2} x2=${r} y2=${a / 2}
              stroke=${i} stroke-width="2" />`, y = Wi(e);
    if (y === "bypass") {
      const E = -r * c;
      g = _`
        ${w}
        <!-- tracks -->
        <line x1=${-r} y1=${-1.75} x2=${r} y2=${-1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <line x1=${-r} y1=${1.75} x2=${r} y2=${1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <!-- fixed panel: left half, front track -->
        <rect x=${-r} y=${1.75 - v / 2} width=${r} height=${v} style="fill:${p};" />
        <!-- moving panel: right half, back track -->
        <g class="fp-slide-panel" style="transform:translateX(${E}px);">
          <rect x="0" y=${-1.75 - v / 2} width=${r} height=${v} style="fill:${p};" />
        </g>`;
    } else if (y === "biparting")
      g = _`
        ${w}
        <!-- track -->
        <line x1=${-r} y1="0" x2=${r} y2="0"
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <g class="fp-slide-panel" style="transform:translateX(${-r * c}px);">
          <rect x=${-r} y=${-v / 2} width=${r} height=${v} style="fill:${p};" />
        </g>
        <g class="fp-slide-panel" style="transform:translateX(${r * h}px);">
          <rect x="0" y=${-v / 2} width=${r} height=${v} style="fill:${f};" />
        </g>`;
    else if (y === "biparting-bypass") {
      const E = r / 2;
      g = _`
        ${w}
        <!-- tracks -->
        <line x1=${-r} y1=${-1.75} x2=${r} y2=${-1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <line x1=${-r} y1=${1.75} x2=${r} y2=${1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <!-- fixed panels: outer quarters, front track. Never accented, even
             wide open — the accent marks what has moved, and lighting these
             would accent exactly the half that is still glazed shut. -->
        <rect x=${-r} y=${1.75 - v / 2} width=${E} height=${v} fill=${i} />
        <rect x=${r - E} y=${1.75 - v / 2} width=${E} height=${v} fill=${i} />
        <!-- moving panels: inner quarters, back track -->
        <g class="fp-slide-panel" style="transform:translateX(${-E * c}px);">
          <rect x=${-E} y=${-1.75 - v / 2} width=${E} height=${v} style="fill:${p};" />
        </g>
        <g class="fp-slide-panel" style="transform:translateX(${E * h}px);">
          <rect x="0" y=${-1.75 - v / 2} width=${E} height=${v} style="fill:${f};" />
        </g>`;
    } else if (y === "converging") {
      const E = r / 2;
      g = _`
        ${w}
        <!-- tracks -->
        <line x1=${-r} y1=${-1.75} x2=${r} y2=${-1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <line x1=${-r} y1=${1.75} x2=${r} y2=${1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <!-- both panels move, so both take the accent on their own state:
             front track travels right, back track left, and they meet. -->
        <g class="fp-slide-panel" style="transform:translateX(${E * c}px);">
          <rect x=${-r} y=${1.75 - v / 2} width=${r} height=${v} style="fill:${p};" />
        </g>
        <g class="fp-slide-panel" style="transform:translateX(${-E * h}px);">
          <rect x="0" y=${-1.75 - v / 2} width=${r} height=${v} style="fill:${f};" />
        </g>`;
    } else {
      const $ = e.length * c;
      g = _`
        ${w}
        <!-- track -->
        <line x1=${-r} y1="0" x2=${r} y2="0"
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <g class="fp-slide-panel" style="transform:translateX(${$}px);">
          <rect x=${-r} y=${-v / 2} width=${e.length} height=${v} style="fill:${p};" />
        </g>`;
    }
  }
  if (t.shutter) {
    const v = Math.max(0, Math.min(1, t.shutter.amount)), w = (I, R) => he(I ? t.shutter.accent ?? s : R === 0 ? l : i, B), y = w(t.shutter.active, v), $ = t.shutter.second, E = $ ? Math.max(0, Math.min(1, $.amount)) : v, T = $ ? w($.active, E) : y;
    g = _`${g}${t.shutter.style === "swing" ? hm(
      e.length,
      a,
      y,
      v,
      t.shutter.flip ? -1 : 1,
      T,
      E
    ) : Is(e.length, y, v)}`;
  }
  const { sx: b, sy: x } = Jf(e);
  return _`<g class=${`fp-opening fp-opening-${re(e.type) ?? "unknown"}`}
                data-id=${re(e.id) ?? m}
                data-entity=${Re(e.entity) ?? m}
                transform="translate(${e.x} ${e.y}) rotate(${e.angle})">
      <g transform="scale(${b} ${x})">${g}</g>
    </g>`;
}
function Lt(e) {
  if (typeof e != "number" || !Number.isFinite(e)) return 0;
  const t = (e % 360 + 360) % 360;
  return t === 90 || t === 180 || t === 270 ? t : 0;
}
function um(e, t) {
  const i = Lt(e.rotation);
  if (t === void 0) return i;
  const n = t ? e.rotationPortrait : e.rotationLandscape;
  return n == null ? i : Lt(n);
}
function fm(e, t) {
  return typeof e.addEventListener == "function" ? (e.addEventListener("change", t), () => e.removeEventListener?.("change", t)) : typeof e.addListener == "function" ? (e.addListener(t), () => e.removeListener?.(t)) : () => {
  };
}
function Ge(e, t, i) {
  return i === 90 || i === 270 ? { w: t, h: e } : { w: e, h: t };
}
function lt(e, t, i, n, o) {
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
function mm(e, t, i) {
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
function gm(e, t = Jn, i = mi) {
  const n = Math.min(t, i), o = Math.max(t, i);
  if (!(typeof e == "number" || typeof e == "string" && e.trim() !== "")) return o;
  const r = typeof e == "number" ? e : Number(e);
  if (!Number.isFinite(r)) return o;
  const a = Gc - as, l = Math.max(0, Math.min(1, (r - as) / a)), c = l * l * (3 - 2 * l);
  return n + (o - n) * c;
}
const zn = 135, Os = 12;
function _o(e) {
  if (!(typeof e == "number" || typeof e == "string" && e.trim() !== "")) return;
  const i = typeof e == "number" ? e : Number(e);
  return Number.isFinite(i) ? i : void 0;
}
function ym(e) {
  const t = _o(e);
  if (t === void 0) return 1;
  if (t <= 0) return 0;
  if (t >= Os) return 1;
  const i = t / Os;
  return i * i * (3 - 2 * i);
}
function bm(e, t = 0) {
  const i = (e + t) * Math.PI / 180;
  return { x: Math.sin(i), y: -Math.cos(i) };
}
function _m(e, t) {
  return Ui(e) ? e.sunBearing : _o(t) ?? zn;
}
function Ui(e) {
  return typeof e.sunBearing == "number" && Number.isFinite(e.sunBearing);
}
function vm(e, t) {
  return Ui(e) ? 1 : ym(t);
}
const $i = 0.34, xm = 30, wm = 0.95, $m = 0.16, km = 0.37, Ln = "var(--fp-skin-sunlight, #ffd9a0)", Rn = "var(--fp-skin-sunshade, #000)";
function Sm(e) {
  return Math.max(0.02, Math.min(1.5, O(e, $i)));
}
function Em(e, t, i, n) {
  let o = n;
  for (const s of i) {
    const r = ao(e.x, e.y, t.x, t.y, s);
    r !== void 0 && r > 1 && r < o && (o = r);
  }
  return o;
}
function Am(e) {
  const t = _o(e);
  if (t === void 0) return 1;
  const i = (o) => o * Math.PI / 180, n = Math.tan(i(xm)) / Math.tan(i(Math.max(1, Math.min(89, t))));
  return Math.max(0.45, Math.min(1.9, n));
}
function Mm(e, t, i) {
  return e.sunlight === !1 || i !== void 0 && i <= 0 ? 0 : vo(e) ? 1 : Math.max(0, Math.min(1, t));
}
function vo(e) {
  return e.glazed ?? e.type === "window";
}
function $a(e) {
  const t = e.angle * Math.PI / 180, i = Math.cos(t) * e.length / 2, n = Math.sin(t) * e.length / 2;
  return [
    { x: e.x - i, y: e.y - n },
    { x: e.x + i, y: e.y + n }
  ];
}
function Bi(e, t, i) {
  let n = !1;
  for (let o = 0, s = e.length - 1; o < e.length; s = o++) {
    const r = e[o], a = e[s];
    r.y > i != a.y > i && t < (a.x - r.x) * (i - r.y) / (a.y - r.y) + r.x && (n = !n);
  }
  return n;
}
function Cm(e, t, i) {
  for (const n of t) {
    const o = ao(e.x, e.y, -i.x, -i.y, n);
    if (o === void 0) continue;
    if (!(o <= _i && ro(e.x, e.y, n) <= _i)) return !1;
  }
  return !0;
}
function Tm(e, t) {
  return bm(_m(e, t) + 180, e.north ?? 0);
}
function ka(e, t, i, n) {
  return [
    e,
    t,
    { x: t.x + i.x * n, y: t.y + i.y * n },
    { x: e.x + i.x * n, y: e.y + i.y * n }
  ];
}
function Im(e, t, i, n = 1) {
  const [o, s] = $a(e), r = Math.max(0, Math.min(1, n)), a = (o.x + s.x) / 2, l = (o.y + s.y) / 2, c = (h) => ({ x: a + (h.x - a) * r, y: l + (h.y - l) * r });
  return ka(c(o), c(s), t, i);
}
function Pm(e, t, i) {
  return ka({ x: e.x1, y: e.y1 }, { x: e.x2, y: e.y2 }, t, i);
}
function zs(e) {
  return e.map((t) => `${t.x},${t.y}`).join(" ");
}
function Om(e, t, i, n, o, s) {
  const { dir: r, openAmount: a, shutterOpen: l, strength: c = 1 } = s, h = {
    light: s.light ?? Ln,
    // `?? ` would swallow the explicit null that means "no shade at all".
    shade: s.shade === void 0 ? Rn : s.shade
  };
  if (c <= 0) return m;
  const d = Math.min(i, n) * Sm(s.reach), p = (M) => Mm(M, a(M), l(M)), f = lo(e, t, p), g = f.map((M) => Pm(M, r, d)), b = t.map((M, ce) => {
    if (!(p(M) > 0 && Cm(M, e, r))) return;
    const et = Em(M, r, f, d), [So, Eo] = $a(M), Ga = Eo.x - So.x, Ka = Eo.y - So.y, qa = Math.abs(Ga * r.y - Ka * r.x) * p(M) / 2;
    return {
      // The outline runs past the falloff, so the ellipse is what bounds the
      // patch and never the polygon's flat far edge.
      points: zs(Im(M, r, et + M.length, p(M))),
      cx: M.x,
      cy: M.y,
      along: et,
      across: Math.max(1, qa * wm),
      angle: Math.atan2(r.y, r.x) * 180 / Math.PI,
      lightId: `${o}-b${ce}`,
      shadeId: `${o}-s${ce}`,
      fadeId: `${o}-f${ce}`
    };
  });
  if (!b.some((M) => M !== void 0)) return m;
  const x = g.map(zs), v = G, w = `${o}-shade`, y = `${o}-shadow`, $ = -v, E = -v, T = i + v * 2, I = n + v * 2, R = (M, ce = m) => _`<rect x=${$} y=${E} width=${T} height=${I} fill=${M}>${ce}</rect>`, Q = (M, ce) => _`<polygon points=${M} fill=${ce} stroke=${ce} stroke-width=${G} />`, Ce = (M, ce, et) => _`<radialGradient id=${ce} gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1"
              gradientTransform=${`translate(${M.cx} ${M.cy}) rotate(${M.angle}) scale(${M.along} ${M.across})`}>
          <stop offset="0" stop-color=${et} stop-opacity="1" />
          <stop offset="0.45" stop-color=${et} stop-opacity="0.55" />
          <stop offset="1" stop-color=${et} stop-opacity="0" />
        </radialGradient>`, se = h.shade === null ? m : _`
      <!-- Where the shade shows: everywhere, minus the patches of light, plus
           back wherever a wall stands in one. The order is the whole logic. -->
      <mask id=${w} maskUnits="userSpaceOnUse" x=${$} y=${E} width=${T} height=${I}>
        ${R("#fff")}
        ${b.map((M) => M ? Ce(M, M.shadeId, "#000") : m)}
        ${b.map(
    (M) => M ? _`<polygon points=${M.points} fill=${`url(#${M.shadeId})`} />` : m
  )}
        ${x.map((M) => Q(M, "#fff"))}
      </mask>`;
  return _`
    <defs>
      ${se}
      <!-- The wall shadows again, for the warm patches themselves. -->
      <mask id=${y} maskUnits="userSpaceOnUse" x=${$} y=${E} width=${T} height=${I}>
        ${R("#fff")}
        ${x.map((M) => Q(M, "#000"))}
      </mask>
    </defs>
    <g class="fp-sunlight">
      ${h.shade === null ? m : _`<rect x=${$} y=${E} width=${T} height=${I}
            style=${`fill:${he(h.shade, Rn)};`}
            opacity=${$m * c} mask=${`url(#${w})`} />`}
      <g mask=${`url(#${y})`} opacity=${km * c}>
        ${b.map(
    (M) => M ? Ce(M, M.lightId, he(h.light, Ln)) : m
  )}
        ${b.map(
    (M) => M ? _`<polygon class="fp-sunbeam" points=${M.points}
                            fill=${`url(#${M.lightId})`} />` : m
  )}
      </g>
    </g>`;
}
function Sa(e) {
  switch (e) {
    case "contain":
      return "xMidYMid meet";
    case "cover":
      return "xMidYMid slice";
    default:
      return "none";
  }
}
function Ea(e, t, i, n) {
  const o = G + 4, s = G;
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
function xo(e) {
  if (!e.length) return { x: 0, y: 0 };
  const t = e.reduce((i, n) => ({ x: i.x + n.x, y: i.y + n.y }), { x: 0, y: 0 });
  return { x: t.x / e.length, y: t.y / e.length };
}
const Fn = { scale: 1, txPercent: 0, tyPercent: 0 };
function zm(e, t, i, n, o = 0.15, s = Sn, r) {
  if (!e.length) return Fn;
  const a = e.map((I) => lt(I.x, I.y, t, i, n)), l = Ge(t, i, n), c = a.map((I) => I.x), h = a.map((I) => I.y), d = Math.min(...c), p = Math.max(...c), f = Math.min(...h), g = Math.max(...h), b = Math.max(p - d, g - f) * o, x = Math.max(p - d + b * 2, 1), v = Math.max(g - f + b * 2, 1), w = Math.max(1, Math.min(s, Math.min(l.w / x, l.h / v))), y = r ?? w;
  if (!Number.isFinite(y)) return Fn;
  const $ = (d + p) / 2 / l.w, E = (f + g) / 2 / l.h, T = (I) => Math.min(0, Math.max(100 * (1 - y), I));
  return {
    scale: y,
    txPercent: T(50 - y * $ * 100),
    tyPercent: T(50 - y * E * 100)
  };
}
function Lm(e) {
  const t = e.zoom;
  if (!(typeof t != "number" || !Number.isFinite(t)))
    return Math.max(1, Math.min(zr, t));
}
function Rm(e, t) {
  if (!Number.isFinite(e) || e <= 1) return 1;
  const i = typeof t == "number" && Number.isFinite(t) && t > 0 ? t : En;
  return 1 / e * i;
}
const an = 12, Fm = 1.5, Dm = 0.4;
function Aa(e) {
  return _`
    <defs>
      <pattern id=${e} width=${an} height=${an}
               patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line class="fp-dead-space-line" x1="0" y1="0" x2="0" y2=${an}
              stroke=${Zn} stroke-width=${Fm} />
      </pattern>
    </defs>`;
}
function Ma(e, t) {
  const i = e.map((n) => `${n.x},${n.y}`).join(" ");
  return _`<polygon class="fp-dead-space" points=${i}
                      fill=${`url(#${t})`} fill-rule="nonzero"
                      fill-opacity=${Dm} stroke="none" />`;
}
function Ca(e, t) {
  const i = e.points.map((s) => `${s.x},${s.y}`).join(" "), n = t !== void 0 && (e.highlight ?? "fill") !== "border", o = n ? e.activeOpacity ?? e.opacity : e.opacity;
  return _`<polygon class="fp-area" data-id=${re(e.id) ?? m}
                       data-entity=${Re(e.entity) ?? m}
                       points=${i}
                       fill=${n ? t : he(e.color, B)}
                       fill-opacity=${O(o, kn)}
                       stroke="none"
                       stroke-width="0" />`;
}
function Ta(e, t, i) {
  const n = t !== void 0 && (e.highlight ?? "fill") !== "fill", o = n ? t : e.borderColor ? he(e.borderColor, "none") : void 0;
  if (o === void 0 || o === "none") return m;
  const s = e.points.map((a) => `${a.x},${a.y}`).join(" "), r = O(
    e.borderWidth,
    n ? G / 2 : Kc
  );
  return !n || i === void 0 ? _`<polygon class="fp-area-border" data-id=${re(e.id) ?? m}
                        data-entity=${Re(e.entity) ?? m}
                        points=${s} fill="none"
                        stroke=${o} stroke-width=${r} />` : _`
    <clipPath id=${i}><polygon points=${s} /></clipPath>
    <polygon class="fp-area-border" data-id=${re(e.id) ?? m}
             data-entity=${Re(e.entity) ?? m}
             points=${s} fill="none" clip-path=${`url(#${i})`}
             stroke=${o} stroke-width=${r * 2} />`;
}
function Dn(e, t, i = Ee) {
  const n = t ?? e.color ?? Vc, o = sf(Hi(i, e.type) ?? Ju, e.w, e.h, n), s = e.hand === "left" ? " scale(-1 1)" : "";
  return _`<g class=${`fp-furniture fp-furniture-${re(e.type) ?? "unknown"}`}
                data-id=${re(e.id) ?? m}
                data-entity=${Re(e.entity) ?? m}
                transform="translate(${e.x} ${e.y}) rotate(${e.angle ?? 0})${s}">${o}</g>`;
}
function ki(e, t, i, n, o, s = 3, r = "fixed") {
  function a(p) {
    return (p % 360 + 360) % 360;
  }
  function l(p, f, g) {
    return Math.max(Math.min(p, g), f);
  }
  const c = H(O(i, Li), r), h = a(O(n, Ri)), d = l(O(o, Fi), 0, 360);
  return u`
    <div
      class="ripple ${e ? "active" : ""}"
      style="width:${c};height:${c};--fp-ripple-color:${he(t, B)};--fp-ripple-direction:${h};--fp-ripple-width:${d}"
    >
      <span class="dot"></span>
      ${Array.from(
    { length: s },
    (p, f) => u`<span class="ring" style="animation-delay:${(f * 0.6).toFixed(2)}s;"></span>`
  )}
    </div>
  `;
}
function Si(e, t) {
  if (!t || !e) return null;
  const i = e[t]?.state;
  if (i == null || i === "unavailable" || i === "unknown") return null;
  const n = Number(i);
  return Number.isFinite(n) ? n : null;
}
function Ia(e, t) {
  const i = e.color ?? B, n = (e.dotSize ?? eo) / 2, o = e.x + e.w / 2, s = e.y + e.h / 2, r = e.angle ?? 0, a = ys(e.xSensor, t.xReading), l = ys(e.ySensor, t.yReading), c = a != null, h = l != null, d = t.xPresent === !1 || t.yPresent === !1, p = e.w / 2, f = e.h / 2, g = t.editing ? _`<rect class="tracker-zone ${d ? "presence-gated" : ""}"
                x=${-p} y=${-f} width=${e.w} height=${e.h}
                fill=${i} fill-opacity="0.08" stroke=${i} stroke-width="1.5"
                stroke-dasharray="6 4" rx="4" pointer-events="none" />` : _``;
  let b;
  if (d)
    b = _``;
  else if (c && h) {
    const x = -p + a * e.w, v = -f + l * e.h, w = `0,${-n} ${n * 0.9},${n * 0.7} ${-n * 0.9},${n * 0.7}`, y = Math.max(n * 3.5, Math.min(e.w, e.h) * 0.45);
    b = _`
      <g class="tracker-marker" style="transform:translate(${x}px, ${v}px);">
        <circle class="tracker-ring" cx="0" cy="0" r="0"
                fill="none" stroke=${i} stroke-width="1.5"
                style="--fp-tracker-ring-max:${y}px;" />
        <circle class="tracker-ring" cx="0" cy="0" r="0"
                fill="none" stroke=${i} stroke-width="1.5"
                style="--fp-tracker-ring-max:${y}px; animation-delay:0.7s;" />
        <polygon class="tracker-dot" points=${w} fill=${i} />
      </g>`;
  } else if (c || h)
    if (c) {
      const x = -p + a * e.w;
      b = _`
        <g class="tracker-line" style="transform:translate(${x}px, 0);">
          <line class="tracker-line-stroke" x1="0" y1=${-f} x2="0" y2=${f}
                stroke=${i} stroke-width="1.5" />
          <line class="tracker-band" x1="0" y1=${-f} x2="0" y2=${f}
                stroke=${i} stroke-width="3" stroke-linecap="round" />
          <line class="tracker-band" x1="0" y1=${-f} x2="0" y2=${f}
                stroke=${i} stroke-width="3" stroke-linecap="round"
                style="animation-delay:0.8s;" />
        </g>`;
    } else {
      const x = -f + l * e.h;
      b = _`
        <g class="tracker-line tracker-line-h" style="transform:translate(0, ${x}px);">
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
       data-id=${re(e.id) ?? m}
       transform="translate(${o} ${s}) rotate(${r})">
      ${g}${b}
    </g>`;
}
function Ls(e, t, i, n) {
  let o = null, s = n;
  for (const r of i) {
    const a = r.x2 - r.x1, l = r.y2 - r.y1, c = a * a + l * l;
    if (c === 0) continue;
    let h = ((e - r.x1) * a + (t - r.y1) * l) / c;
    h = Math.max(0, Math.min(1, h));
    const d = r.x1 + h * a, p = r.y1 + h * l, f = Math.hypot(e - d, t - p);
    f < s && (s = f, o = { x: d, y: p, angle: Math.atan2(l, a) * 180 / Math.PI });
  }
  return o;
}
class Gi {
  static currentFloorEntityIds(t, i) {
    const n = t ? mt(t) : [], o = n.find((r) => r.id === i) ?? n[0];
    if (!o) return [];
    const s = /* @__PURE__ */ new Set();
    for (const r of o.openings)
      r.entity && s.add(r.entity), r.secondaryEntity && s.add(r.secondaryEntity), r.shutterEntity && s.add(r.shutterEntity), r.shutterSecondaryEntity && s.add(r.shutterSecondaryEntity);
    for (const r of o.items) {
      r.entity && s.add(r.entity);
      for (const a of Ne(r))
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
    const n = Gi.currentFloorEntityIds(t, i);
    return n.length ? n.join("|") : "none";
  }
}
function Nm(e) {
  const t = Date.now() / 1e3, i = e?.historyReplay?.lookbackSeconds, n = typeof i == "number" && Number.isFinite(i) && i > 0 ? i : 3600;
  return { start: Math.max(0, t - n), end: t };
}
function Rs(e, t) {
  const i = Math.max(0, Math.min(e, t)), n = Math.max(0, Math.max(e, t));
  return {
    start: i,
    end: Math.max(i, n)
  };
}
function Hm(e, t) {
  return Gi.currentFloorEntityIds(e, t);
}
function jm(e, t) {
  return Gi.scopeKey(e, t);
}
function Wm(e, t, i) {
  const o = Math.max(1, i - t) / 30, s = e?.historyReplay?.defaultSpeed;
  return Math.max(0.25, s ?? o);
}
function Um(e) {
  const t = Date.parse(e);
  return Number.isNaN(t) ? Date.now() / 1e3 : t / 1e3;
}
function Fs(e) {
  if (!Number.isFinite(e) || e <= 0) return "";
  const t = new Date(e * 1e3), i = t.getFullYear(), n = `${t.getMonth() + 1}`.padStart(2, "0"), o = `${t.getDate()}`.padStart(2, "0"), s = `${t.getHours()}`.padStart(2, "0"), r = `${t.getMinutes()}`.padStart(2, "0");
  return `${i}-${n}-${o}T${s}:${r}`;
}
function Bm(e) {
  const t = Math.min(3, Math.max(-2, e));
  return Number((10 ** t).toPrecision(4));
}
function Gm(e, t, i) {
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
function Km(e, t, i, n, o) {
  if (!t) return Ht(e);
  const s = D(Gm(t, e.entityId, n)), r = Me(e.entityId, e.newState);
  if (o && s) return r ? s : "#ffffff";
  const a = Ht(e);
  return r ? a : "#ffffff";
}
function qm(e, t) {
  if (!Number.isFinite(e)) return "—";
  try {
    return t.format(new Date(e * 1e3));
  } catch {
    return new Date(e * 1e3).toISOString();
  }
}
var Vm = Object.defineProperty, Zm = Object.getOwnPropertyDescriptor, V = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Zm(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Vm(t, i, o), o;
};
function Xm(e) {
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
    startInputValue: Fs(s),
    endInputValue: Fs(r),
    onToggleVisible: (l) => e.toggleHistoryVisible(l),
    onRangeChange: (l, c) => {
      e.handleRangeChange(l, { target: { value: c } });
    },
    onZoom: (l) => e.zoomWindow(l),
    onJump: (l) => e.jumpReplay(l),
    onStep: (l) => e.stepReplay(l),
    onPlayToggle: () => t.playing ? e.pauseReplay() : e.playReplay(),
    onToggleSpeedPanel: () => e.toggleSpeedPanel(),
    onSpeedSliderInput: (l) => e.setReplaySpeed(Bm(l)),
    onSpeedChange: (l) => e.setReplaySpeed(l),
    onToggleTimeline: () => e.toggleTimeline(),
    onToggleLog: () => e.toggleLog(),
    onSeek: (l) => e.seekReplay(l)
  };
}
function Ym(e) {
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
let W = class extends te {
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
    const i = e.timestamp <= this.currentTime, n = (typeof e.color == "string" ? e.color : void 0) ?? (typeof e.attributes?.color == "string" ? e.attributes.color : void 0) ?? Ht(e), o = D(n), s = o ? `background:${o}; box-shadow:0 0 0 2px ${o}22;` : m;
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
              >${we(this.events, (t, i) => `${t.timestamp}-${t.entityId}-${t.newState}-${i}`, (t) => this._renderEventItem(t, e?.timestamp === t.timestamp))}</ul>` : m}
          ${!this.logExpanded && !this.events.length ? u`<div class="replay-empty">No history events yet.</div>` : m}
        </div>
      </div>
    `;
  }
};
W.styles = ne`
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
V([
  A({ attribute: !1 })
], W.prototype, "events", 2);
V([
  A({ type: Number })
], W.prototype, "startTime", 2);
V([
  A({ type: Number })
], W.prototype, "endTime", 2);
V([
  A({ type: Number })
], W.prototype, "currentTime", 2);
V([
  A({ type: Boolean })
], W.prototype, "visible", 2);
V([
  A({ type: Boolean })
], W.prototype, "enabled", 2);
V([
  A({ type: Boolean })
], W.prototype, "ready", 2);
V([
  A({ type: Boolean })
], W.prototype, "playing", 2);
V([
  A({ type: Boolean })
], W.prototype, "timelineExpanded", 2);
V([
  A({ type: Boolean })
], W.prototype, "logExpanded", 2);
V([
  A({ type: Boolean })
], W.prototype, "speedExpanded", 2);
V([
  A({ type: String })
], W.prototype, "error", 2);
V([
  A({ type: String })
], W.prototype, "rangeWarning", 2);
V([
  A({ type: String })
], W.prototype, "panelId", 2);
V([
  A({ type: Number })
], W.prototype, "replaySpeed", 2);
V([
  A({ type: String })
], W.prototype, "currentTimeLabel", 2);
V([
  A({ type: String })
], W.prototype, "startInputValue", 2);
V([
  A({ type: String })
], W.prototype, "endInputValue", 2);
W = V([
  Ci("easy-floorplan-replay-panel")
], W);
const Pa = "--fp-color-", Oa = 24;
function ee(e) {
  return typeof e != "string" ? "" : e.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
}
function za(e) {
  return Pa + ee(e);
}
function Ds(e) {
  return `var(${za(e)})`;
}
function Bt(e) {
  if (!Array.isArray(e)) return [];
  const t = /* @__PURE__ */ new Set(), i = [];
  for (const n of e) {
    if (!n || typeof n != "object") continue;
    const { name: o, color: s } = n, r = ee(o), a = D(s);
    if (!(!r || !a || t.has(r)) && (t.add(r), i.push({ name: o.trim(), color: a }), i.length >= Oa))
      break;
  }
  return i;
}
function La(e) {
  return Bt(e).map((t) => `${za(t.name)}:${t.color};`).join("");
}
function Ra(e) {
  return Bt(e).map((t) => `${ee(t.name)}=${t.color}`).join(",");
}
const Jm = /^[Vv][Aa][Rr]\(\s*--fp-color-([\p{L}\p{N}-]+)\s*(?:,((?:[^()]|\([^()]*\))*))?\)$/u;
function Fa(e) {
  return Nn(e)?.slug;
}
function Nn(e) {
  if (typeof e != "string") return;
  const t = Jm.exec(e.trim());
  if (!t) return;
  const i = t[2]?.trim();
  return { slug: t[1], fallback: i || void 0 };
}
function oi(e, t) {
  const i = Fa(e);
  if (!i) return e;
  const n = Bt(t).find((o) => ee(o.name) === i);
  return n ? n.color : e;
}
function Ns(e, t, i) {
  if (!t) return e;
  const n = (o) => {
    if (typeof o == "string") {
      const s = Nn(o);
      if (s?.slug !== t) return o;
      const r = Nn(i);
      return s.fallback && r && !r.fallback ? `var(${Pa}${r.slug}, ${s.fallback})` : i;
    }
    return Array.isArray(o) ? o.map(n) : o && typeof o == "object" ? Object.fromEntries(Object.entries(o).map(([s, r]) => [s, n(r)])) : o;
  };
  return n(e);
}
const Qm = 500, eg = 250;
class tg extends HTMLElement {
  constructor() {
    super(...arguments), this.holdTime = Qm, this.held = !1, this.cancelled = !1;
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
    t.actionHandler && ig(i, t.actionHandler.options) || (t.actionHandler ? (t.removeEventListener("touchstart", t.actionHandler.start), t.removeEventListener("touchend", t.actionHandler.end), t.removeEventListener("touchcancel", t.actionHandler.end), t.removeEventListener("mousedown", t.actionHandler.start), t.removeEventListener("click", t.actionHandler.end), t.removeEventListener("keydown", t.actionHandler.handleKeyDown)) : t.addEventListener("contextmenu", (n) => {
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
      i.hasHold && this.timer && (clearTimeout(this.timer), this.timer = void 0), i.hasHold && this.held ? Zt(o, "hold") : i.hasDoubleClick ? n.type === "click" && n.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, Zt(o, "tap");
      }, eg) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, Zt(o, "double_tap")) : Zt(o, "tap");
    }, t.actionHandler.handleKeyDown = (n) => {
      ["Enter", " "].includes(n.key) && (n.preventDefault(), n.currentTarget.actionHandler.end(n));
    }, t.addEventListener("touchstart", t.actionHandler.start, { passive: !0 }), t.addEventListener("touchend", t.actionHandler.end), t.addEventListener("touchcancel", t.actionHandler.end), t.addEventListener("mousedown", t.actionHandler.start, { passive: !0 }), t.addEventListener("click", t.actionHandler.end), t.addEventListener("keydown", t.actionHandler.handleKeyDown)));
  }
}
function ig(e, t) {
  return e.hasHold === t.hasHold && e.hasDoubleClick === t.hasDoubleClick && e.disabled === t.disabled;
}
function Zt(e, t) {
  e.dispatchEvent(
    new CustomEvent("action", { detail: { action: t }, bubbles: !0, composed: !0 })
  );
}
function ng() {
  const e = document.body, t = e.querySelector("action-handler-fp-ef");
  if (t) return t;
  const i = document.createElement("action-handler-fp-ef");
  return e.appendChild(i), i;
}
customElements.get("action-handler-fp-ef") || customElements.define("action-handler-fp-ef", tg);
const og = (e, t) => {
  ng().bind(e, t);
}, ot = Ti(
  class extends Ii {
    update(e, [t]) {
      return og(e.element, t), be;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render(e) {
    }
  }
), xe = class xe {
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
    return Number.isFinite(t) ? Math.min(xe._MAX_SPEED, Math.max(xe._MIN_SPEED, t)) : Number.isNaN(t) ? 1 : xe._MAX_SPEED;
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
    Number.isFinite(t) && (this.speed = Math.min(xe._MAX_SPEED, Math.max(xe._MIN_SPEED, t)));
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
xe._MIN_SPEED = 0.01, xe._MAX_SPEED = 1e3;
let Ei = xe, sg = 0;
class rg {
  constructor(t) {
    this._card = t, this._historyService = new Wc(), this.state = {
      playbackController: new Ei(),
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
      panelId: `fp-replay-panel-${sg++}`
    };
  }
  logReplay(t, i) {
    this._card.getConfig()?.historyReplay?.debug && console.log(t, i ?? {});
  }
  getDefaultWindow() {
    return Nm(this._card.getConfig());
  }
  normalizeWindow(t, i) {
    return Rs(t, i);
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
    return Hm(this._card.getConfig(), this._card.getActiveFloorId());
  }
  scopeKey() {
    return jm(this._card.getConfig(), this._card.getActiveFloorId());
  }
  speedForRange(t, i) {
    return Wm(this._card.getConfig(), t, i);
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
    return qm(t, new Intl.DateTimeFormat(void 0, {
      dateStyle: "short",
      timeStyle: "medium"
    }));
  }
  handleRangeChange(t, i) {
    const n = i.target, o = Um(n.value);
    t === "start" ? this.state.startTime = o : this.state.endTime = o, this.updateWindow(this.state.startTime, this.state.endTime);
  }
  updateWindow(t, i) {
    const { start: n, end: o } = Rs(t, i), s = o - n;
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
    this.state.playbackController = new Ei({
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
        color: Km(a, this._card.getConfig(), this._card.getHass(), this.state.configuredColorCache, this.state.configured)
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
var ag = Object.defineProperty, lg = Object.getOwnPropertyDescriptor, vt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? lg(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && ag(t, i, o), o;
};
const Hs = /* @__PURE__ */ new Map();
function js(e) {
  return e.map((t) => t.id).join("|");
}
let pe = class extends te {
  constructor() {
    super(...arguments), this._wallMaskId = `fp-wall-mask-${pe._nextWallMaskId++}`, this._glowIdBase = `fp-glow-${pe._nextGlowId++}`, this._watchedEntities = /* @__PURE__ */ new Set(), this._replayController = new rg({
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
    this._onOrientation(e), this._unsubscribeOrientation = fm(e, this._onOrientation);
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
      width: e.width ?? ht,
      height: e.height ?? jt,
      walls: e.walls ?? [],
      openings: e.openings ?? [],
      items: e.items ?? [],
      texts: e.texts ?? [],
      furniture: e.furniture ?? []
    }, this._watchedEntities = Mt(this._config), this._syncHistoryServiceContext(), this._replayController.clearConfigColorCache();
    const i = this._replayCacheKey();
    if (i !== this._lastReplayCacheKey && (this._lastReplayCacheKey = i, this._replayController.historyService().clearCache()), this._replayController.syncToConfig(), !this._activeFloorId) {
      const n = mt(this._config), o = Hs.get(js(n));
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
    return !t || !this.hass ? !0 : Wr(t, this.hass, this._watchedEntities);
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
    const t = zc(this._config?.skin);
    t ? this.setAttribute("data-skin", t) : this.removeAttribute("data-skin");
  }
  updated(e) {
    super.updated(e), (e.has("hass") || e.has("_activeFloorId")) && this._syncHistoryServiceContext();
  }
  getCardSize() {
    return 6;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => ay), document.createElement("fp-ef-editor");
  }
  static getStubConfig() {
    return td();
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
    return Me(e.entity, t?.states[e.entity]?.state);
  }
  /** How far open an opening should be drawn (0..1), from its entity (or default). */
  _openingAmount(e, t) {
    const i = e.entity ? t?.states[e.entity] : void 0;
    return ut(e, i);
  }
  /** Whether an opening wears its accent: drawn open, or a cover still in transit. */
  _openingActive(e, t) {
    const i = e.entity ? t?.states[e.entity] : void 0;
    return On(e, i);
  }
  /**
   * The second leaf's own state for an opening with a sensor on each — a
   * two-panel slider (issue #145) or a hinged double (issue #159).
   * `undefined` — no second sensor, or a shape with only one leaf — leaves both
   * on the first entity, so nothing about a single-sensor opening changes.
   */
  _openingSecond(e, t) {
    if (!e.secondaryEntity || !zt(e)) return;
    const i = ua(e), n = t?.states[e.secondaryEntity];
    return { amount: ut(i, n), active: On(i, n) };
  }
  /**
   * The same for a hinged shutter's other panel (issue #159). Read from its
   * own key and its own resolvers — the shutter answers to `shutterInvert` and
   * is drawn from `shutterAmount` / `shutterActive`, not the sash's — and only
   * for a `swing` shutter, since a roll curtain has no second panel to drive.
   */
  _shutterSecond(e, t) {
    if (!e.shutterSecondaryEntity || pt(e) !== "swing") return;
    const i = t?.states[e.shutterSecondaryEntity];
    return {
      amount: Oe(i, e.shutterInvert),
      active: ii(i, e.shutterInvert)
    };
  }
  _itemIcon(e, t) {
    return Tn(
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
    this.hass && St(this, this.hass, t, Dr(t, e.detail.action));
  }
  /** What a gesture on this opening would do, if anything. */
  _openingPress(e, t) {
    return go(e, t, this._featuresOf);
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
    const s = e.shutterEntity, r = o?.states[s], a = Oe(r, e.shutterInvert) > 0, l = ii(r, e.shutterInvert), c = ya(e, r, a, this.hass?.entities?.[s]?.icon), h = D(e.shutterActiveColor ?? e.activeColor) ?? B, d = bo(e), p = lt(d.x, d.y, t.width, t.height, i), f = Ge(t.width, t.height, i), g = yo(e, i), b = H(vi, n), x = `translate(calc(${g.x} * ${b}), calc(${g.y} * ${b}))`, v = H(xi, n), w = o?.states[s]?.attributes?.friendly_name ?? s;
    return u`
      <div
        class="shutter-mark ${l ? "on" : "off"}"
        data-entity=${Re(s) ?? m}
        style="left:${p.x / f.w * 100}%; top:${p.y / f.h * 100}%;
               width:${v};height:${v};
               transform:translate(-50%,-50%) ${x};--fp-active:${h};"
        title="${w} · ${Wt(o, s)}"
        role="button"
        tabindex="0"
        @action=${() => {
      this.hass && St(this, this.hass, { entity: s }, { action: "more-info" });
    }}
        .actionHandler=${ot({})}
      >
        <ha-icon
          icon=${c}
          style="--mdc-icon-size:${H(wi, n)};"
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
    const s = e.entity, r = o?.states[s], a = this._openingAmount(e, o) > 0, l = this._openingActive(e, o), c = _a(e, r, a, this.hass?.entities?.[s]?.icon), h = D(e.activeColor) ?? B, d = va(e), p = lt(d.x, d.y, t.width, t.height, i), f = Ge(t.width, t.height, i), g = xa(e, i), b = H(vi, n), x = `translate(calc(${g.x} * ${b}), calc(${g.y} * ${b}))`, v = H(xi, n), w = o?.states[s]?.attributes?.friendly_name ?? s;
    return u`
      <div
        class="shutter-mark ${l ? "on" : "off"}"
        data-entity=${Re(s) ?? m}
        style="left:${p.x / f.w * 100}%; top:${p.y / f.h * 100}%;
               width:${v};height:${v};
               transform:translate(-50%,-50%) ${x};--fp-active:${h};"
        title="${w} · ${Wt(o, s)}"
        role="button"
        tabindex="0"
        @action=${() => {
      this.hass && St(this, this.hass, { entity: s }, { action: "more-info" });
    }}
        .actionHandler=${ot({})}
      >
        <ha-icon
          icon=${c}
          style="--mdc-icon-size:${H(wi, n)};"
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
    this._activeFloorId = t, Hs.set(js(e), t), this._zoomedAreaId = void 0, !(i || !this.hass || !this._config?.historyReplay?.enabled) && this._replayController.resetForFloorChange();
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
    const n = O(e.size, qe), o = H(n, t), s = e.entity ? i?.states[e.entity] : void 0, r = na(e, s?.state, s?.attributes), a = Ut(e) === "value" ? la(i, e) : void 0;
    return u`
      <div
        class="badge"
        style="width:${o};height:${o};transform:rotate(${O(e.angle, 0)}deg);"
      >
        ${a ? u`<span
              class="badge-value"
              style="font-size:${H(ha(n, a), t)};"
              >${a}</span
            >` : u`<ha-icon
              class=${r ? `anim-${r}` : ""}
              icon=${this._itemIcon(e, i)}
              style="--mdc-icon-size:${H(ra(n), t)};"
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
    const s = this._isOn(e, o), r = Jr(o, e), a = e.entity ? o?.states[e.entity] : void 0, l = uo(e, a), c = D(ji(e.stateColor, l)), h = ea(e, c), d = !!this.hass && In(e, a?.state), p = Ef(e, a?.state, o), f = Ut(e) !== "none", g = e.display ?? "badge", b = Br(a), x = D(e.activeColor) ?? b, v = s || d ? void 0 : D(e.inactiveColor), w = e.rippleColor ?? c ?? e.activeColor ?? b ?? B, y = Er(
      oi(
        c ?? (s ? x : v),
        this._config?.palette
      )
    ), $ = e.rippleSize ?? Li, E = e.rippleDirection ?? Ri, T = e.rippleWidth ?? Fi, I = p ? "visibility: hidden; pointer-events: none;" : "";
    let R = m;
    g === "ripple" ? R = u`<span style="${I}">
        ${ki(s, w, $, E, T, 3, n)}
      </span>` : g === "iconRipple" ? R = u`<div class="stack" style="${I}">
        ${ki(s, w, $, E, T, 3, n)}
        ${f ? u`<div class="stack-icon">${this._renderBadge(e, n, o)}</div>` : m}
      </div>` : f && (R = u`<span style="${I}">
        ${this._renderBadge(e, n, o)}
      </span>`);
    const Q = lt(e.x, e.y, t.width, t.height, i), Ce = Ge(t.width, t.height, i), se = lf(e);
    return u`
      <div
        class="item fp-item ${s ? "on" : "off"} ${d ? "offline" : ""} ${c ? "state-colored" : ""} ${v ? "inactive-colored" : ""} ${se ? "interactive" : ""}"
        data-id=${re(e.id) ?? m}
        data-entity=${Re(e.entity) ?? m}
        data-kind=${re(e.kind) ?? m}
        style="left:${Q.x / Ce.w * 100}%; top:${Q.y / Ce.h * 100}%;${c ? `--fp-state:${c};` : ""}${x ? `--fp-active:${x};` : ""}${v ? `--fp-inactive:${v};` : ""}${y ? `--fp-ink:${y};` : ""}"
        title=${this._label(e, o)}
        role=${se ? "button" : m}
        tabindex=${se ? "0" : m}
        @action=${(M) => this._handleItemAction(M, e)}
        .actionHandler=${ot({
      hasHold: Ie(e.hold_action),
      hasDoubleClick: Ie(e.double_tap_action),
      // Unbinds the gesture listeners outright, so keyboard activation
      // cannot reach an action that would do nothing.
      disabled: !se
    })}
        @pointerdown=${se && ei(t) === "ripple" ? (M) => this._startInk(M) : m}
      >
        ${R}
        ${se && ei(t) === "ripple" ? u`<span class="press-ink" aria-hidden="true"></span>` : m}
        ${r ? u`<span
              class="label ${R === m ? "inflow" : ""} label-${ho(e)}"
              style="font-size:${H(Qr(e.labelSize), n)};${h ? `color:${h};` : ""}"
              >${r}</span
            >` : m}
      </div>
    `;
  }
  _renderAreaLabel(e, t, i, n) {
    if (!e.name || (e.showName ?? !0) === !1) return m;
    const o = xo(e.points), s = lt(o.x, o.y, t.width, t.height, i), r = Ge(t.width, t.height, i), a = If(e.labelSize, n);
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
    const o = lt(e.x, e.y, t.width, t.height, i), s = Ge(t.width, t.height, i);
    return u`
      <div
        class="text fp-text"
        data-id=${re(e.id) ?? m}
        style="left:${o.x / s.w * 100}%; top:${o.y / s.h * 100}%;
               font-size:${H(O(e.size, Pt), n)};
               color:${he(e.color, Mr)};
               transform:translate(-50%,-50%) scale(var(--fp-inv-zoom,1)) rotate(${O(e.angle, 0)}deg);"
      >
        ${oo(this.hass, e)}
      </div>
    `;
  }
  render() {
    if (!this._config) return u`${m}`;
    const e = this._config, t = this._replayController.getRenderState(), i = xc(this.hass, this._watchedEntities, this._replayController.historyService(), t.enabled, t.currentTime), n = mt(e), o = n.find((y) => y.id === this._activeFloorId) ?? n.find((y) => y.id === e.defaultFloor) ?? n[0], s = um(e, this._portrait), r = Ge(O(e.width, ht), O(e.height, jt), s), a = mm(e.width, e.height, s), l = po(e.overlayScale), c = e.sunDimming ? gm(
      i?.states["sun.sun"]?.attributes?.elevation,
      O(e.sunBrightnessMin, Jn),
      O(e.sunBrightnessMax, mi)
    ) : mi, h = e.showDeadSpaces ? Hr(o.walls, o.openings) : [], p = e.sunDimming || o.items.some((y) => y.glow) ? lo(
      o.walls,
      o.openings,
      (y) => (
        // Both leaves, and the travel each style actually has (issue #145):
        // asking `entity` alone left a door whose *second* panel was open
        // still blocking light outright. Glass admits it whole regardless
        // of sash — a closed window is not a hole, but light still gets
        // through it. A shutter rolled down overrides that, same as it
        // does for sunlight.
        Kr(
          y,
          this._openingAmount(y, i),
          this._openingSecond(y, i)?.amount,
          y.shutterEntity ? Oe(i?.states[y.shutterEntity], y.shutterInvert) : void 0
        )
      )
    ) : o.walls, f = `${this._glowIdBase}-sundim`, g = e.sunDimming ? kf(
      o.items,
      i?.states,
      e.width,
      e.height,
      f,
      p
    ) : m, b = o.areas?.find((y) => y.id === this._zoomedAreaId), x = b ? zm(
      b.points,
      e.width,
      e.height,
      s,
      void 0,
      void 0,
      // A room may say how close to go; without one the fit decides,
      // exactly as it always has (issue #222).
      Lm(b)
    ) : Fn, v = e.compactHeader === !0, w = v && !!e.title;
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
        .header=${v ? m : e.title ?? m}
        style=${La(e.palette) || m}
      >
        <div class="card-shell ${this._replayController.isHistoryVisible() ? "replay-visible" : ""}">
          ${this._config.historyReplay?.enabled ? this._renderReplayPanel() : m}
          <div
            class="stage press-${ei(e)} offline-${aa(e)} ${w ? "compact-title" : ""}"
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
                   background:${he(e.background, Oi)};"
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
            style="transform: translate(${x.txPercent}%, ${x.tyPercent}%) scale(${x.scale});"
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
          ${Sr(
      `${e.skin ?? ""}|${Ra(e.palette)}`,
      _`<svg viewBox="0 0 ${r.w} ${r.h}" preserveAspectRatio="none">
            <g transform=${a || m}>
            ${o.image ? _`<image href=${o.image} x="0" y="0" width=${e.width} height=${e.height}
                          preserveAspectRatio=${Sa(o.imageFit)}
                          opacity=${o.imageOpacity ?? 1} />` : m}
            ${o.areas?.map((y) => {
        const $ = sm(y);
        return _`<g class="area-tap-target"
                    role=${$ ? "button" : m}
                    tabindex=${$ ? "0" : m}
                    @action=${(E) => this._onAreaAction(E, y)}
                    .actionHandler=${ot({
          // Only wait out the timers when a gesture can resolve:
          // otherwise every tap on an ordinary room would sit for
          // 500ms before zooming.
          hasHold: Ie(ni(y, "hold")?.config),
          hasDoubleClick: Ie(ni(y, "double_tap")?.config)
        })}>
                  ${Ca(y, Ss(y, y.entity ? i?.states[y.entity]?.state : void 0))}
                </g>`;
      })}
            <!-- Dead spaces (issue #88): the regions the walls seal off that no
                 door or window reaches, hatched. Above the room fills, so a
                 region someone has also drawn an area over still reads as
                 unreachable; below everything else, because it describes the
                 floor rather than anything standing on it. -->
            ${h.length ? _`${Aa(`${this._wallMaskId}-dead`)}
                    ${h.map(
        (y) => Ma(y, `${this._wallMaskId}-dead`)
      )}` : m}
            <!-- Light pools (issue #6). Above the room fills but below the
                 furniture and walls, so light reads as cast onto the floor
                 rather than painted over the plan. Isolated as one layer: the
                 pools screen-blend with each other (two lamps brighten where
                 they meet) without screening against the plan beneath, which
                 would wash out on a light theme. -->
            ${Zr(
        o.furniture,
        e.width,
        e.height,
        `${this._glowIdBase}-mask`,
        Cn(e.symbols)
      )}
            <g class="fp-glows"
               mask=${o.furniture.length ? `url(#${this._glowIdBase}-mask)` : m}>
              ${o.items.map((y, $) => {
        if (!y.glow) return m;
        const E = so(y, i?.states[y.entity]);
        return E ? Vr(y, E, `${this._glowIdBase}-${$}`, p) : m;
      })}
            </g>
            ${o.furniture.map((y) => {
        const $ = Dn(
          y,
          vf(y, y.entity ? i?.states[y.entity]?.state : void 0),
          Cn(e.symbols)
        ), E = Gf(y, n, o.id);
        if (!E) return $;
        const T = n.find((I) => I.id === E)?.name;
        return _`<g class="fp-furniture-link" role="button" tabindex="0"
                    @action=${() => this._goToFloor(n, E)}
                    .actionHandler=${ot({
          // A staircase has one gesture. Saying so keeps a tap from
          // sitting out the hold and double-tap timers before it
          // does anything.
          hasHold: !1,
          hasDoubleClick: !1
        })}>
                  <!-- An SVG tooltip is a <title> child, not a title=
                       attribute: the attribute does nothing here. -->
                  <title>${T ? `Go to ${T}` : "Go to the next floor"}</title>
                  ${$}
                </g>`;
      })}
            <!-- Sunlight through the openings. Under the walls on purpose:
                 light lands on the floor, and the walls stay crisp lines over
                 it rather than being tinted by the patches they let in. The
                 sun dimming further down is the whole-sky reading and still
                 has the last word — at night there is nothing to let in. -->
            ${e.sunlight ? Om(
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
          dir: Tm(
            e,
            i?.states["sun.sun"]?.attributes?.azimuth
          ),
          strength: vm(
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
          reach: O(e.sunReach, $i) * (Ui(e) ? 1 : Am(i?.states["sun.sun"]?.attributes?.elevation)),
          // The gap each style actually clears, both leaves
          // included — the same reading the lamps get above, and
          // for the same reason (#145): `entity` alone leaves a
          // door whose *second* panel is open reading as shut,
          // and a converging pair reading as twice as clear as it
          // draws. Glazing and shutters are applied on top of
          // this, inside openingSunFraction.
          openAmount: (y) => Gr(
            y,
            this._openingAmount(y, i),
            this._openingSecond(y, i)?.amount
          ),
          // A shutter that is all the way down stops the light, as
          // one does. Undefined where none is bound, so an opening
          // without a shutter is judged on itself alone.
          shutterOpen: (y) => y.shutterEntity ? Oe(i?.states[y.shutterEntity], y.shutterInvert) : void 0,
          light: e.sunlightColor ?? Ln,
          shade: e.sunShade === !1 ? null : e.sunShadeColor ?? Rn
        }
      ) : m}
            ${Ea(o.openings, e.width, e.height, this._wallMaskId)}
            ${o.walls.map(
        (y) => _`
                <g class="fp-wall-neon"><line x1=${y.x1} y1=${y.y1} x2=${y.x2} y2=${y.y2}
                      class="wall fp-wall" data-id=${re(y.id) ?? m}
                      mask=${`url(#${this._wallMaskId})`}
                      style=${ta(y.thickness)} stroke-linecap="round" /></g>`
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
        (y, $) => Ta(
          y,
          Ss(y, y.entity ? i?.states[y.entity]?.state : void 0),
          `${this._wallMaskId}-area-${$}`
        )
      )}
            </g>
            ${we(
        // Keyed by id: switching floors must create fresh DOM nodes.
        // Unkeyed, Lit morphs floor A's openings into floor B's, and the
        // 0.5s leaf/panel transitions animate the leftover state — a
        // window briefly plays a door swing (issue #50).
        o.openings,
        (y, $) => y.id || $,
        (y) => {
          const $ = this._openingAmount(y, i), E = y.shutterEntity ? i?.states[y.shutterEntity] : void 0, T = wa(y, {
            color: Zn,
            // The closed tone (issue #228). Absent, the moving parts stay
            // the wall colour, which is what a closed opening always was —
            // and that is also what an opening whose contact has dropped
            // out falls back to, so a dead sensor does not draw the same
            // emphatic "shut" as a door that really is (issue #162).
            // Guarded on `hass` for the same reason the device path is:
            // before the first states arrive every opening would read as
            // offline and the closed colour would flash off on load.
            inactive: this.hass && In(y, y.entity ? i?.states[y.entity]?.state : void 0) ? void 0 : y.inactiveColor,
            open: $ > 0,
            amount: $,
            active: this._openingActive(y, i),
            accent: y.activeColor ?? B,
            // Per-leaf state for a two-sensor biparting slider (issue #145).
            second: this._openingSecond(y, i),
            // External roller shutter layer (issue #74). No entity bound
            // yet → previewed shut, like a static plan.
            shutter: y.shutterEntity ? {
              amount: Oe(E, y.shutterInvert),
              active: ii(E, y.shutterInvert),
              style: pt(y),
              // The shutter's own accent, falling back to the
              // opening's and then to the skin's.
              accent: y.shutterActiveColor ?? y.activeColor ?? B,
              flip: y.shutterFlipV,
              // Per-panel state for a two-contact hinged shutter
              // (issue #159).
              second: this._shutterSecond(y, i)
            } : void 0
          });
          if (!rm(y, this._featuresOf)) return T;
          const I = y.length / 2, R = G + 4;
          return _`<g class="fp-opening" role="button" tabindex="0"
                    @action=${(Q) => this._onOpeningAction(Q, y)}
                    .actionHandler=${ot({
            // Only wait out the hold/double-tap timers when a gesture
            // actually resolves: otherwise every tap on a plain
            // contact sensor would sit for 500ms before answering.
            hasHold: Ie(this._openingPress(y, "hold")?.config),
            hasDoubleClick: Ie(this._openingPress(y, "double_tap")?.config)
          })}>
                  ${T}
                  <rect class="fp-opening-hit" x=${y.x - I} y=${y.y - R / 2}
                        width=${y.length} height=${R}
                        transform="rotate(${y.angle} ${y.x} ${y.y})" />
                </g>`;
        }
      )}
            ${we(
        o.trackers ?? [],
        (y, $) => y.id || $,
        (y) => Ia(y, {
          editing: !1,
          xReading: Si(i?.states, y.xSensor?.entity),
          yReading: Si(i?.states, y.ySensor?.entity),
          xPresent: bi(i?.states, y.xSensor?.presence),
          yPresent: bi(i?.states, y.ySensor?.presence)
        })
      )}
            <!-- Sun dimming (issue #113). Last inside the rotated group, so it
                 covers the whole plan; the device overlay below is HTML and
                 stays at full brightness, keeping icons and state readable at
                 night. pointer-events:none is not optional — this rect spans
                 the canvas, and without it every tappable opening underneath
                 stops responding (the lesson from #108). -->
            ${e.sunDimming ? _`${g}<rect class="fp-sun-dim"
                            x=${-G} y=${-G}
                            width=${e.width + G * 2}
                            height=${e.height + G * 2}
                            fill="#000"
                            mask=${g === m ? m : `url(#${f})`}
                            opacity=${1 - c} />` : m}
            </g>
          </svg>`
    )}
          <div
            class="items"
            style="--fp-inv-zoom:${Rm(x.scale, e.zoomedOverlayScale)};"
          >
            ${o.areas?.map((y) => this._renderAreaLabel(y, e, s, l))}
            ${o.texts.map((y) => this._renderText(y, e, s, l))}
            ${we(
      // Keyed like the openings above: a floor switch must build fresh
      // nodes rather than morph one floor's badges into another's.
      o.openings.filter((y) => ma(y)),
      (y, $) => `${y.id || $}-shutter`,
      (y) => this._renderShutterMark(y, e, s, l, i)
    )}
            ${we(
      o.openings.filter((y) => ba(y)),
      (y, $) => `${y.id || $}-opening`,
      (y) => this._renderOpeningMark(y, e, s, l, i)
    )}
            ${we(
      // No entity filter: devices that exist physically but have no HA
      // entity still deserve their badge (issue #39). Keyed by id so a
      // floor switch builds fresh DOM (see the openings comment).
      // "Only when active" devices drop out here (issue #55), and so do
      // the ones that only show inside their own room (#222) — the
      // editor still draws them, dimmed, so they stay editable.
      o.items.filter(
        (y) => !Xr(
          y,
          y.entity ? i?.states[y.entity]?.state : void 0
        ) && !Sf(y, b)
      ),
      (y, $) => y.id || $,
      (y) => this._renderItem(y, e, s, l, i)
    )}
          </div>
          </div>
          ${x.scale > 1 ? u`<button
                class="zoom-out"
                title="Zoom out"
                aria-label="Zoom out"
                @click=${() => this._zoomedAreaId = void 0}
              >
                <ha-icon icon="mdi:magnify-minus-outline"></ha-icon>
              </button>` : m}
          ${w ? u`<div class="plan-title">${e.title}</div>` : m}
          ${n.length > 1 ? this._renderFloorSwitcher(n, o, v) : m}
        </div>
        </div>
      </ha-card>
    `;
  }
  _renderReplayPanel() {
    return Ym(Xm(this._replayController));
  }
  _renderFloorSwitcher(e, t, i = !1) {
    return u`
      <div class="floor-switcher ${i ? "row" : ""}">
        ${e.map((n) => {
      const o = n.id === t.id ? D(n.color) : void 0;
      return u`
            <button
              class=${n.id === t.id ? "active" : ""}
              title=${n.name}
              style=${o ? `background:${o};border-color:${o};` : m}
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
  Cr,
  Lc,
  ne`
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
      width: ${yi}px;
      height: ${yi}px;
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
       replace it — restating scale(${ls}) alone would drop the
       counter-scale along with the translate, and a badge held down at 4x
       zoom would balloon to roughly 4x its resting size instead of shrinking. */
    .press-scale .item.interactive {
      transition: transform ${ds}ms cubic-bezier(0.2, 0.8, 0.3, 1);
    }
    .press-scale .item.interactive:active {
      transform: translate(-50%, -50%) scale(calc(var(--fp-inv-zoom, 1) * ${ls}));
      transition-duration: ${cs}ms;
    }

    /* Flash: drop-shadow rather than a box-shadow or a background, so the halo
       follows whatever the device actually draws — the badge's circle, a bare
       ripple ring, the label — instead of a rectangle around it. */
    .press-flash .item.interactive {
      transition: filter ${ds}ms ease-out;
    }
    .press-flash .item.interactive:active {
      filter: drop-shadow(0 0 5px var(--fp-skin-accent, var(--primary-color, #03a9f4)));
      transition-duration: ${cs}ms;
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
      font-size: ${Qn}px;
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
], pe.prototype, "hass", 2);
vt([
  k()
], pe.prototype, "_config", 2);
vt([
  k()
], pe.prototype, "_activeFloorId", 2);
vt([
  k()
], pe.prototype, "_zoomedAreaId", 2);
vt([
  k()
], pe.prototype, "_portrait", 2);
pe = vt([
  Ci("fp-ef-card")
], pe);
const ct = 26, cg = 0.75;
function dg(e, t, i, n = cg) {
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
function Da(e, t, i, n) {
  let o = null, s = n;
  for (const r of e) {
    const a = Math.hypot(t - r.x, i - r.y);
    a < s && (s = a, o = { x: r.x, y: r.y });
  }
  return o;
}
function Na(e, t, i, n) {
  const o = e.flatMap((s) => [
    { x: s.x1, y: s.y1 },
    { x: s.x2, y: s.y2 }
  ]);
  return Da(o, t, i, n);
}
function hg(e, t, i, n, o) {
  const s = e.walls.flatMap((a) => [
    { x: a.x1, y: a.y1 },
    { x: a.x2, y: a.y2 }
  ]), r = (e.areas ?? []).flatMap(
    (a) => a.points.filter((l, c) => !(o && o.areaId === a.id && o.vertexIndex === c)).map((l) => ({ x: l.x, y: l.y }))
  );
  return Da([...s, ...r], t, i, n);
}
function Ws(e, t, i) {
  const n = e.areas ?? [];
  for (let o = n.length - 1; o >= 0; o--)
    if (Bi(n[o].points, t, i)) return n[o];
}
function pg(e, t) {
  if (t <= 0) return [];
  const i = xo(e);
  if (t === 1) return [i];
  const n = e.map((d) => d.x), o = e.map((d) => d.y), s = Math.min(...n), r = Math.max(...n), a = Math.min(...o), l = Math.max(...o), c = Math.max(r - s, 1), h = Math.max(l - a, 1);
  for (let d = 1; d <= 8; d++) {
    const p = t * d, f = Math.max(1, Math.round(Math.sqrt(p * c / h))), g = Math.max(1, Math.ceil(p / f)), b = c / (f + 1), x = h / (g + 1), v = [];
    for (let w = 1; w <= g; w++)
      for (let y = 1; y <= f; y++) {
        const $ = s + y * b, E = a + w * x;
        Bi(e, $, E) && v.push({ x: $, y: E });
      }
    if (v.length >= t)
      return Array.from(
        { length: t },
        (w, y) => v[Math.floor(y * v.length / t)]
      );
  }
  return Array.from({ length: t }, (d, p) => {
    const f = p / t * Math.PI * 2, g = Math.min(c, h) * 0.15 * (1 + Math.floor(p / 6));
    return { x: i.x + Math.cos(f) * g, y: i.y + Math.sin(f) * g };
  });
}
function ug(e, t, i, n, o, s, r, a, l = ct) {
  if (r) return { x: s(n), y: s(o) };
  const c = Na(e, n, o, l);
  if (c) return c;
  const h = n - t, d = o - i, p = Math.tan(a * Math.PI / 180);
  return Math.abs(d) <= Math.abs(h) * p ? { x: s(n), y: i } : Math.abs(h) <= Math.abs(d) * p ? { x: t, y: s(o) } : { x: s(n), y: s(o) };
}
function fg(e, t) {
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
    const c = xo(l.points);
    r(c.x, c.y) && a.push({ kind: "area", id: l.id });
  }
  return a;
}
function mg(e, t, i, n) {
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
const gg = [
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
function Xt(e, t, i, n, o) {
  const s = -(o || 0) * Math.PI / 180, r = e - i, a = t - n;
  return { x: r * Math.cos(s) - a * Math.sin(s), y: r * Math.sin(s) + a * Math.cos(s) };
}
function yg(e, t, i) {
  const n = i.x2 - i.x1, o = i.y2 - i.y1, s = n * n + o * o;
  if (s === 0) return Math.hypot(e - i.x1, t - i.y1);
  let r = ((e - i.x1) * n + (t - i.y1) * o) / s;
  return r = Math.max(0, Math.min(1, r)), Math.hypot(e - (i.x1 + r * n), t - (i.y1 + r * o));
}
function bg(e, t, i, n) {
  const o = [], s = (r, a, l, c) => o.push({ sel: { kind: r, id: a }, rank: gg.indexOf(r), order: l, locked: !!c });
  return e.items.forEach((r, a) => {
    const l = (r.size ?? n.itemSize) / 2 + At.pad;
    Math.abs(t - r.x) <= l && Math.abs(i - r.y) <= l && s("item", r.id, a, r.locked);
  }), e.texts.forEach((r, a) => {
    const l = r.size ?? n.textSize, c = l * 0.6 * Math.max(1, oo(n.hass, r).length) / 2 + At.pad, h = l / 2 + At.pad, d = Xt(t, i, r.x, r.y, r.angle ?? 0);
    Math.abs(d.x) <= c && Math.abs(d.y) <= h && s("text", r.id, a, r.locked);
  }), e.openings.forEach((r, a) => {
    const l = Xt(t, i, r.x, r.y, r.angle ?? 0);
    Math.abs(l.x) <= r.length / 2 && Math.abs(l.y) <= n.wallThickness / 2 + At.pad && s("opening", r.id, a, r.locked);
  }), e.furniture.forEach((r, a) => {
    const l = Xt(t, i, r.x, r.y, r.angle ?? 0);
    Math.abs(l.x) <= r.w / 2 && Math.abs(l.y) <= r.h / 2 && s("furniture", r.id, a, r.locked);
  }), e.walls.forEach((r, a) => {
    yg(t, i, r) <= At.wall && s("wall", r.id, a, r.locked);
  }), (e.trackers ?? []).forEach((r, a) => {
    const l = Xt(t, i, r.x + r.w / 2, r.y + r.h / 2, r.angle ?? 0);
    Math.abs(l.x) <= r.w / 2 && Math.abs(l.y) <= r.h / 2 && s("tracker", r.id, a, r.locked);
  }), (e.areas ?? []).forEach((r, a) => {
    Bi(r.points, t, i) && s("area", r.id, a, r.locked);
  }), o.sort((r, a) => Number(r.locked) - Number(a.locked) || r.rank - a.rank || a.order - r.order).map((r) => r.sel);
}
function Ha(e, t) {
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
function Yt(e, t) {
  return !!Ha(e, t)?.locked;
}
function _g(e, t) {
  return t.filter((i) => {
    const n = Ha(e, i);
    return !!n && !n.locked;
  });
}
function vg(e, t, i) {
  if (!e.length) return null;
  if (!i || t.length !== 1) return e[0];
  const n = e.findIndex((o) => o.kind === t[0].kind && o.id === t[0].id);
  return n < 0 ? e[0] : e[(n + 1) % e.length];
}
const xg = {
  request: (e) => requestAnimationFrame(e),
  cancel: (e) => cancelAnimationFrame(e)
};
class wg {
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
const Us = "Apply needs Home Assistant's card editor — use Save instead.", $g = "Save this card once first — it isn't on the dashboard yet.", kg = 200;
function Sg(e) {
  let t = e;
  for (let i = 0; t && i < kg; i++) {
    const n = t;
    if (typeof n._params?.saveCardConfig == "function") return n;
    t = t.parentNode ?? t.host ?? null;
  }
  return null;
}
async function Eg(e) {
  const t = Sg(e);
  if (!t) return { ok: !1, error: Us };
  if (t._params?.isNew) return { ok: !1, error: $g };
  const i = t._cardConfig;
  if (!i || typeof i != "object")
    return { ok: !1, error: Us };
  try {
    await t._params.saveCardConfig(i);
  } catch (n) {
    return { ok: !1, error: `Could not save — ${n instanceof Error ? n.message : String(n)}` };
  }
  return typeof t._markDirtyStateClean == "function" ? t._markDirtyStateClean() : typeof t._dirty == "boolean" && (t._dirty = !1), { ok: !0 };
}
function Bs(e) {
  return "text" in e.selector || "number" in e.selector;
}
function Ag(e, t, i) {
  const n = {};
  for (const o of i)
    t[o.name] !== e[o.name] && (n[o.name] = t[o.name]);
  return n;
}
function Gs(e, t) {
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
const Je = (e) => e, Ks = ["binary_sensor", "cover", "lock"];
function ge(e, t) {
  return { fields: t.map((n) => e.fields.find((o) => o.name === n)).filter((n) => !!n), data: e.data, toPatch: e.toPatch };
}
const Gt = () => ({
  name: "angle",
  label: "Angle",
  selector: { number: { min: 0, max: 360, step: 1, mode: "slider", unit_of_measurement: "°" } }
}), S = (e, t) => ({ value: e, label: t }), N = (...e) => ({
  select: { mode: "dropdown", options: e }
});
function ja(e = Ee) {
  return Qu(e);
}
function Mg(e, t = Ee) {
  return Hi(t, e)?.name ?? e;
}
function Cg(e, t = () => 0) {
  const i = Z(e), n = Wi(e), o = zt(e), s = [
    { name: "type", label: "Type", selector: N(S("door", "Door"), S("window", "Window")) },
    {
      name: "motion",
      label: "Motion",
      selector: N(
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
      helper: r ? "Double = two leaves meeting in the middle, hinged at each jamb" : "Single = one full-width sash (issue #73)",
      selector: r ? N(S("single", "Single (one leaf)"), S("double", "Double (two leaves)")) : N(S("double", "Double (two leaves)"), S("single", "Single sash"))
    });
  }
  return i === "swing" && Fe(e) === "single" && s.push({
    name: "sashSpan",
    label: e.type === "door" ? "Leaf width" : "Sash width",
    helper: e.type === "door" ? "Share of the opening that actually swings — the rest is a fixed panel" : "Share of the opening that actually opens — the rest is fixed glass",
    selector: { number: { min: jr, max: 1, step: 0.05, mode: "slider" } }
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
  }), i === "swing" && Fe(e) === "single" && s.push({
    name: "hinge",
    label: "Hinge",
    selector: N(S("left", "Left"), S("right", "Right"))
  }), i === "swing" && s.push({
    name: "opens",
    label: "Opens",
    selector: N(S("this", "This side"), S("other", "Other side"))
  }), i === "slide" && (o || s.push({
    name: "slide",
    label: "Slide",
    selector: N(S("left", "To left"), S("right", "To right"))
  }), s.push({
    name: "style",
    label: "Style",
    selector: N(
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
    selector: { entity: { filter: [{ domain: Ks }] } }
  }), o && e.entity && s.push({
    name: "secondaryEntity",
    label: "Second leaf",
    helper: "Its own sensor for the other leaf — leave empty to move both together",
    selector: { entity: { filter: [{ domain: Ks }] } }
  }), s.push({
    name: "shutterEntity",
    label: "Shutter",
    helper: "External shutter over this opening — a cover, or a contact sensor",
    selector: { entity: { filter: [{ domain: ["cover", "binary_sensor"] }] } }
  }), e.shutterEntity && (s.push({
    name: "shutterStyle",
    label: "Shutter type",
    helper: "Hinged panels fold back against the wall; roll-up slats disappear upward",
    selector: N(S("swing", "Hinged (louvered panels)"), S("roll", "Roll-up (slats)"))
  }), pt(e) === "swing" && s.push({
    name: "shutterSide",
    label: "Shutter side",
    helper: "Which side of the wall the panels hang on",
    selector: N(S("far", "Away from the sash"), S("near", "Same side as the sash"))
  }), pt(e) === "swing" && s.push({
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
      e.type === "door" && Z(e) === "swing" ? "No sensor bound — draws shut instead of open" : "No sensor bound — draws open instead of shut"
    ),
    selector: { boolean: {} }
  }), s.push(Gt()), e.entity && (s.push({
    name: "showIcon",
    label: "Show icon",
    helper: Z(e) === "roll" ? "A raised roll-up leaves only a line — this puts its state beside it, and opens its dialog when tapped" : "Shows this opening's state beside it, and opens its dialog when tapped",
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
    selector: N(
      S("opening", e.type === "door" ? "The door" : "The window"),
      S("shutter", "The shutter")
    )
  })), (e.entity || e.shutterEntity) && s.push(
    {
      name: "tap_action",
      label: "Tap action",
      selector: {
        ui_action: {
          default_action: go(e, "tap", t)?.config.action ?? "none"
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
      sash: Fe(e),
      entity: e.entity ?? "",
      secondaryEntity: e.secondaryEntity ?? "",
      glazed: vo(e),
      sunlight: e.sunlight ?? !0,
      shutterEntity: e.shutterEntity ?? "",
      shutterSecondaryEntity: e.shutterSecondaryEntity ?? "",
      shutterStyle: pt(e),
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
          a.motion = h, c !== "slide" && (a.sliderStyle = void 0), c !== "swing" && (a.sashSpan = void 0), zt({
            ...e,
            motion: h,
            sliderStyle: c === "slide" ? e.sliderStyle : void 0
          }) || (a.secondaryEntity = void 0);
        } else l === "sashSpan" ? a.sashSpan = typeof c == "number" && c < 1 ? c : void 0 : l === "sash" ? (a.sash = c === Pn(e.type) ? void 0 : c, zt({ ...e, sash: c }) || (a.secondaryEntity = void 0), c === "double" && (a.sashSpan = void 0)) : l === "shutterStyle" ? (a.shutterStyle = c, c !== "swing" && (a.shutterSecondaryEntity = void 0)) : l === "hinge" || l === "slide" ? a.flipH = c === "right" || void 0 : l === "opens" ? a.flipV = c === "other" || void 0 : l === "style" ? (a.sliderStyle = c === "single" ? void 0 : c, pa(c) || (a.secondaryEntity = void 0)) : l === "invert" ? a.invert = c || void 0 : a[l] = c;
      return a;
    }
  };
}
function wo(e, t) {
  return e?.entities.length ? { entity: { include_entities: t && !e.entities.includes(t) ? [...e.entities, t] : e.entities } } : { entity: {} };
}
function $o(e, t) {
  if (!e?.entities.length) return t;
  const n = `Only entities in ${e.name ? `the ${e.name} area` : "this area"} — turn off “Filter entities” on the area to see all`;
  return t ? `${t}. ${n}` : n;
}
function si(e) {
  if ((e.display ?? "badge") === "ripple") return "none";
  const t = Ut(e);
  if (t !== "icon") return t;
  const i = e.iconAnimation ?? "auto";
  return i === "spin" || i === "pulse" ? i : i === "auto" ? ia(e.entity) ?? "icon" : "icon";
}
function ko(e) {
  return (e.display ?? "badge") !== "badge";
}
function Wa(e, t) {
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
function Tg(e, t) {
  return {
    fields: [
      {
        name: "entity",
        label: "Entity",
        required: !0,
        helper: $o(t),
        selector: wo(t, e.entity)
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
function Ig(e) {
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
function Pg(e) {
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
function Og(e) {
  const t = [
    {
      name: "labelPosition",
      label: "Label position",
      helper: "Beside the badge instead of under it — a long reading then grows one way only",
      selector: N(S("below", "Below"), S("left", "Left"), S("right", "Right"))
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
      labelPosition: ho(e),
      labelSize: e.labelSize ?? Yr,
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
function zg(e, t) {
  const i = [
    {
      name: "badgeMode",
      label: "Badge shows",
      helper: "Animations play only while the entity is active. Value puts the reading in the badge, falling back to the icon when there is no number",
      selector: N(
        S("icon", "Icon, still"),
        S("spin", "Icon, spinning"),
        S("pulse", "Icon, pulsing"),
        S("value", "Value"),
        S("none", "Nothing")
      )
    }
  ], n = Ne(e);
  return si(e) === "value" && n.length && i.push({
    name: "badgeEntity",
    label: "Badge reads",
    helper: "Which of this device's readings the badge shows",
    selector: N(
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
    Gt()
  ), {
    fields: i,
    data: {
      badgeMode: si(e),
      // The dropdown's values are strings, so the stored index (or the legacy
      // "secondary") is spelled the same way here; toPatch turns it back into
      // a number. Opens on what the badge is *actually* reading when nothing
      // is chosen, which is the whole point of badgeSource (issue #136).
      badgeEntity: String(ca(e.badgeEntity) ?? t?.source ?? "primary"),
      size: e.size ?? qe,
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
        ...Wa(r ?? si(e), ko(e))
      };
    }
  };
}
function Lg(e, t) {
  const i = ko(e), n = oa(e.entity, t), o = e.kind === "light" || e.entity?.startsWith("light.");
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
      rippleSize: e.rippleSize ?? Li,
      rippleDirection: e.rippleDirection ?? Ri,
      rippleWidth: e.rippleWidth ?? Fi,
      glow: e.glow ?? !1,
      glowRadius: e.glowRadius ?? zi,
      glowColor: e.glowColor ?? ""
    },
    // "Ripple" is the other half of #127's three-key spelling — same expansion
    // as the badge group's, with the badge mode read off the item.
    toPatch: (r) => {
      if (!("ripple" in r)) return r;
      const { ripple: a, ...l } = r;
      return { ...l, ...Wa(si(e), !!a) };
    }
  };
}
function Rg(e) {
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
function Fg(e) {
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
        selector: { ui_action: { default_action: Fr(e.entity).action } }
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
function Dg(e, t) {
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
      helper: $o(t, "Shows this entity's value, formatted as HA formats it"),
      selector: wo(t, e.entity)
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
    Gt()
  ), {
    fields: i,
    data: {
      text: e.text ?? "",
      entity: e.entity ?? "",
      attribute: e.attribute ?? "",
      size: e.size ?? Pt,
      angle: e.angle ?? 0
    },
    toPatch: (n) => "entity" in n && !n.entity ? { ...n, attribute: void 0 } : n
  };
}
function Ng(e, t, i = Ee) {
  const n = ja(i);
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
          selector: N(S("right", "right"), S("left", "left"))
        }
      ] : [],
      { name: "w", label: "Width", required: !0, selector: { number: { min: 10, mode: "box" } } },
      { name: "h", label: "Height", required: !0, selector: { number: { min: 10, mode: "box" } } },
      Gt(),
      // Optional entity that makes the drawing live (issue #82) — a soil
      // sensor on a plant, a contact sensor on a cabinet. Last, because most
      // furniture is decoration and never binds anything.
      {
        name: "entity",
        label: "Entity",
        helper: $o(t, "Optional — lets the drawing change color with a sensor"),
        selector: wo(t, e.entity)
      },
      // Clicking it changes floor (issue #121). Offered on any piece rather
      // than only on the built-in `stairs`, because a plan can draw its own
      // staircase and a rule keyed on one symbol id would leave those out.
      // Empty on everything by default, so it is a row and not a nag.
      {
        name: "goToFloor",
        label: "Go to floor",
        helper: "Clicking this piece changes floor — for a staircase",
        selector: N(S("", "Nothing"), S("up", "Up one floor"), S("down", "Down one floor"))
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
function Hg(e) {
  return {
    fields: [
      { name: "w", label: "Width", required: !0, selector: { number: { min: 10, mode: "box" } } },
      { name: "h", label: "Height", required: !0, selector: { number: { min: 10, mode: "box" } } },
      { name: "x", label: "X", required: !0, selector: { number: { mode: "box" } } },
      { name: "y", label: "Y", required: !0, selector: { number: { mode: "box" } } },
      Gt(),
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
      dotSize: e.dotSize ?? eo
    },
    toPatch: Je
  };
}
function jg(e, t = []) {
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
function Wg(e) {
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
                max: zr,
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
          selector: N(
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
      labelSize: e.labelSize ?? Qn,
      opacity: e.opacity ?? kn,
      entity: e.entity ?? "",
      activeOpacity: e.activeOpacity ?? e.opacity ?? kn,
      highlight: e.highlight ?? "fill",
      // "Fit" is the absence of a number, so it gets its own boolean; the
      // slider only appears once that is off, and then always shows a real
      // stored value.
      fitZoom: e.zoom === void 0,
      zoom: e.zoom ?? Sn,
      tap_action: e.tap_action,
      hold_action: e.hold_action,
      double_tap_action: e.double_tap_action
    },
    toPatch: (t) => {
      let i = t;
      if ("highlight" in i && i.highlight === "fill" && (i = { ...i, highlight: void 0 }), "fitZoom" in i) {
        const { fitZoom: n, ...o } = i;
        i = { ...o, zoom: n ? void 0 : Sn };
      }
      return i;
    }
  };
}
function Ug(e) {
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
          number: { min: 2, max: Ar, step: 1, mode: "slider", unit_of_measurement: "px" }
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
    data: { title: e.title ?? "", width: e.width, height: e.height, grid: e.grid ?? to },
    toPatch: Je
  };
}
function Gg(e) {
  return {
    fields: [
      {
        name: "pressEffect",
        label: "Press effect",
        helper: "Feedback when a device is pressed. Only devices that do something respond",
        selector: N(
          S("scale", "Press in"),
          S("ripple", "Ink ripple"),
          S("flash", "Flash"),
          S("none", "None")
        )
      }
    ],
    data: { pressEffect: ei(e) },
    // The default stays out of the YAML, as the skin's does.
    toPatch: (t) => "pressEffect" in t && t.pressEffect === Pr ? { ...t, pressEffect: void 0 } : t
  };
}
function Kg(e) {
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
function qg(e) {
  const t = Xn(e.skin) ?? fi[0];
  return {
    fields: [
      {
        name: "skin",
        label: "Skin",
        helper: t.description,
        selector: N(...fi.map((i) => S(i.id, i.label)))
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
function Vg(e) {
  return {
    fields: [
      {
        name: "rotation",
        label: "Rotate display",
        helper: "Rotates the live card only — editing stays as drawn",
        selector: N(S("0", "0°"), S("90", "90°"), S("180", "180°"), S("270", "270°"))
      },
      // Per-orientation overrides (issue #237). Two dropdowns with a "same as
      // above" default rather than a switch plus two angles: the switch would
      // be a third control whose only job is to say whether the other two
      // count, and "same as above" says that per orientation and for free.
      {
        name: "rotationPortrait",
        label: "…on a portrait screen",
        helper: "Overrides the angle above while the screen is taller than it is wide",
        selector: N(
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
        selector: N(
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
        selector: N(S("plan", "Canvas units"), S("fixed", "Fixed pixels"))
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
        selector: N(
          S("dim", "Dimmed"),
          S("strike", "Dimmed and crossed out"),
          S("none", "No different")
        )
      }
    ],
    data: {
      rotation: String(Lt(e.rotation)),
      // "" is "same as above" — the absence of an override, not an angle.
      // `== null` for the same reason resolvePlanRotation uses it: a key
      // written with no value (`rotationPortrait:`) parses to `null`, and
      // reading that as an angle would show 0° here — then write it into the
      // YAML as a real override the moment this panel is saved, turning a
      // stray empty key into an instruction the plan never had.
      rotationPortrait: e.rotationPortrait == null ? "" : String(Lt(e.rotationPortrait)),
      rotationLandscape: e.rotationLandscape == null ? "" : String(Lt(e.rotationLandscape)),
      overlayScale: po(e.overlayScale),
      compactHeader: e.compactHeader ?? !1,
      zoomedOverlayScale: e.zoomedOverlayScale ?? En,
      offlineStyle: aa(e)
    },
    toPatch: (t) => {
      let i = t;
      "rotation" in i && (i = { ...i, rotation: i.rotation === "0" ? void 0 : Number(i.rotation) });
      for (const n of ["rotationPortrait", "rotationLandscape"])
        n in i && (i = { ...i, [n]: i[n] === "" ? void 0 : Number(i[n]) });
      return "compactHeader" in i && !i.compactHeader && (i = { ...i, compactHeader: void 0 }), "offlineStyle" in i && i.offlineStyle === Or && (i = { ...i, offlineStyle: void 0 }), "zoomedOverlayScale" in i && i.zoomedOverlayScale === En && (i = { ...i, zoomedOverlayScale: void 0 }), i;
    }
  };
}
function Zg(e) {
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
function Xg(e) {
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
      sunBrightnessMin: e.sunBrightnessMin ?? Jn,
      sunBrightnessMax: e.sunBrightnessMax ?? mi
    },
    // Off is the default, so keep the whole feature out of the YAML until it
    // is switched on — including the two sliders it drags along with it.
    toPatch: (i) => "sunDimming" in i && !i.sunDimming ? { ...i, sunDimming: void 0, sunBrightnessMin: void 0, sunBrightnessMax: void 0 } : i
  };
}
function Yg(e) {
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
      sunReach: e.sunReach ?? $i,
      sunFollows: typeof e.sunBearing != "number",
      sunBearing: e.sunBearing ?? zn
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
      } : ("sunFollows" in n && (n.sunBearing = n.sunFollows ? void 0 : e.sunBearing ?? zn, delete n.sunFollows), "north" in n && !n.north && (n.north = void 0), "sunReach" in n && n.sunReach === $i && (n.sunReach = void 0), "sunShade" in n && n.sunShade && (n.sunShade = void 0), n);
    }
  };
}
function Jg(e) {
  const t = [
    { name: "image", label: "Bg image", helper: "/local/floorplan.png or URL", selector: { text: {} } }
  ];
  return e.image && (t.push({
    name: "imageFit",
    label: "Image fit",
    helper: "Per floor, so scans of different resolutions can each fit properly",
    selector: N(
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
var Qg = Object.defineProperty, ey = Object.getOwnPropertyDescriptor, L = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? ey(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Qg(t, i, o), o;
};
const ty = (e) => e.label, iy = (e) => e.helper, ln = {
  select: { icon: "mdi:cursor-default", label: "Select" },
  wall: { icon: "mdi:wall", label: "Wall" },
  door: { icon: "mdi:door", label: "Door" },
  window: { icon: "mdi:window-closed-variant", label: "Window" },
  tracker: { icon: "mdi:crosshairs-gps", label: "Tracker" },
  area: { icon: "mdi:vector-polygon", label: "Area" }
}, ny = {
  wall: "mdi:wall",
  opening: "mdi:door",
  item: "mdi:lightbulb-outline",
  text: "mdi:format-text",
  furniture: "mdi:sofa-outline",
  tracker: "mdi:crosshairs-gps",
  area: "mdi:floor-plan"
}, qs = 35, oy = 8, sy = 2e3, ry = 10;
function Vs(e) {
  return e.some((t) => {
    const i = t, n = i.tagName?.toLowerCase();
    return n === "input" || n === "textarea" || n === "select" || n === "ha-form" || n === "ha-entity-picker" || n === "ha-icon-picker" || i.isContentEditable === !0;
  });
}
let C = class extends te {
  constructor() {
    super(...arguments), this._wallMaskId = `fp-edit-wall-mask-${C._nextWallMaskId++}`, this._watchedEntities = /* @__PURE__ */ new Set(), this._tool = "select", this._selection = [], this._draft = null, this._draftTracker = null, this._draftArea = null, this._areaHover = null, this._freeWalls = !1, this._defaultOpeningLength = 60, this._marquee = null, this._history = [], this._future = [], this._zoom = 1, this._floorMenuOpen = !1, this._addMenuOpen = !1, this._addQuery = "", this._symbolDraft = "", this._symbolError = "", this._paletteError = "", this._projectOpen = !1, this._openGroups = /* @__PURE__ */ new Set(), this._fullscreen = !1, this._applyState = "idle", this._applyError = "", this._applyResetTimer = null, this._drag = null, this._dragMoves = new wg(xg, (e) => {
      this._drag && this._applyDrag(e);
    }), this._dragDirty = !1, this._pickAnchor = null, this._hideLabels = !1, this._pinchPts = /* @__PURE__ */ new Map(), this._pinch = null, this._gesturePointer = null, this._marqueeAdd = !1, this._clipboard = null, this._onKeyDown = (e) => this._handleKeyDown(e), this._onHostKeyDown = (e) => {
      e.key !== "Escape" || !this._fullscreen || Vs(e.composedPath()) && (e.preventDefault(), e.stopPropagation(), this._canvasWrap?.focus({ preventScroll: !0 }));
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
    }, this._liveEditKey = null, this._onEditorPointerDown = () => {
      this._liveEditKey = null;
    }, this._gridCache = null, this._apply = async () => {
      if (this._applyState === "saving") return;
      this._applyResetTimer !== null && clearTimeout(this._applyResetTimer), this._applyState = "saving", this._applyError = "", await this.updateComplete, await new Promise((t) => setTimeout(t, 0));
      const e = await Eg(this);
      if (!e.ok) {
        this._applyState = "idle", this._applyError = e.error;
        return;
      }
      this._applyState = "saved", this._applyResetTimer = setTimeout(() => {
        this._applyResetTimer = null, this._applyState = "idle";
      }, sy);
    }, this._addSymbol = () => {
      let e;
      try {
        e = JSON.parse(this._symbolDraft);
      } catch (n) {
        this._symbolError = `Not valid JSON — ${n.message}`;
        return;
      }
      const t = [], i = Ni(e, void 0, t);
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
    const t = { ...ed(e.type || "custom:easy-floorplan-card"), ...e }, i = mt(t).map((n) => structuredClone(n));
    this._config = {
      ...t,
      floors: i,
      walls: [],
      openings: [],
      items: [],
      texts: [],
      furniture: [],
      trackers: []
    }, (!this._activeFloorId || !i.some((n) => n.id === this._activeFloorId)) && (this._activeFloorId = t.defaultFloor && i.some((n) => n.id === t.defaultFloor) ? t.defaultFloor : i[0].id), this._lastEmitted && e !== this._lastEmitted && !An(e, this._lastEmitted) && (this._history = [], this._future = [], this._liveEditKey = null), this._watchedEntities = Mt(this._config);
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
    return i(t) !== i(this.hass) ? !0 : Wr(t, this.hass, this._watchedEntities);
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
    return Cn(this._config.symbols);
  }
  /** Discrete change to the active floor's elements (snapshots for undo). */
  _commitFloor(e) {
    this._commit({ ...this._config, floors: this._patchFloors(e) });
  }
  /** Live change to the active floor's elements (no history snapshot — for dragging). */
  _emitFloor(e) {
    const t = { ...this._config, floors: this._patchFloors(e) };
    if (this._drag) {
      this._config = t, this._watchedEntities = Mt(t), this._dragDirty = !0;
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
    return this._config.grid ?? to;
  }
  /**
   * Resolved placement snap step. `snap` is tri-state in the config: unset
   * means "follow the grid" (the default behaviour), `0` is free placement,
   * any other number is a custom step. See {@link resolveSnap}.
   */
  get _resolvedSnap() {
    return Zc(this._config.snap, this.grid);
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
        snap: t && t > 0 ? t : on(fs, this.grid)
      });
    }
  }
  /** Grid update plus a custom-snap rescale so its percentage of the grid is preserved. */
  _gridPatch(e) {
    const t = { grid: e };
    if (this._snapMode === "custom") {
      const i = ms(this._config.snap, this.grid);
      t.snap = on(i, e);
    }
    return t;
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
    return Na(this._floor().walls, e, t, ct);
  }
  /** Snap a raw point to a nearby existing wall endpoint, else to the snap step. */
  _snapWallPoint(e, t) {
    return this._nearestCorner(e, t) ?? { x: this._snap(e), y: this._snap(t) };
  }
  /**
   * Snap a raw point for Area drawing/editing: nearby wall corner or another
   * Area's vertex wins (so adjacent rooms can share an exact boundary point),
   * else the grid/snap step. `exclude` drops one vertex from the candidate
   * set — the one currently being dragged, so it can't snap to itself.
   */
  _snapAreaPoint(e, t, i) {
    return hg(this._floor(), e, t, ct, i) ?? {
      x: this._snap(e),
      y: this._snap(t)
    };
  }
  /**
   * Like {@link _snapWallPoint}, but ignores endpoints in `moving` (keys
   * `${wallId}:${end}`) — the corner cluster being dragged must not attract
   * itself.
   */
  _snapWallPointExcluding(e, t, i) {
    let n = null, o = ct;
    for (const s of this._floor().walls)
      for (const r of [1, 2]) {
        if (i.has(`${s.id}:${r}`)) continue;
        const a = r === 1 ? s.x1 : s.x2, l = r === 1 ? s.y1 : s.y2, c = Math.hypot(e - a, t - l);
        c < o && (o = c, n = { x: a, y: l });
      }
    return n ?? { x: this._snap(e), y: this._snap(t) };
  }
  /** See {@link snapWallEnd}: corners win, then axis gravity, then the snap step. */
  _snapWallEnd(e, t, i, n) {
    return ug(
      this._floor().walls,
      e,
      t,
      i,
      n,
      (o) => this._snap(o),
      this._freeWalls,
      ry,
      ct
    );
  }
  _emit(e) {
    this._drag && (this._drag.emitted = !0), this._config = e, this._watchedEntities = Mt(e);
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
    if (Vs(i)) return;
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
    if (!_g(i, this._selection).length) return;
    const n = (d) => {
      const p = this._idsOfKind(d);
      for (const f of p) Yt(i, { kind: d, id: f }) && p.delete(f);
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
  _onCanvasDown(e) {
    if (e.button !== 0 || this._gesturePointer !== null) return;
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
    if (this._tool === "area") {
      const i = this._snapAreaPoint(t.x, t.y);
      if (!this._draftArea) {
        this._draftArea = { points: [i] };
        return;
      }
      const n = this._draftArea.points, o = n[0];
      if (n.length >= 3 && Math.hypot(i.x - o.x, i.y - o.y) <= ct) {
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
    this._dragMoves.cancel(), this._dragDirty = !1, this._gesturePointer = null, this._draft = null, this._draftTracker = null, this._draftArea = null, this._areaHover = null, this._marquee = null;
    const e = this._drag;
    this._drag = null, e?.moved && e.snapshot && (this._history = this._history.filter((t) => t !== e.snapshot), e.emitted ? this._emit(e.snapshot) : (this._config = e.snapshot, this._watchedEntities = Mt(e.snapshot)), this._future = e.priorFuture ?? []);
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
      if (this._tool === "tracker" && this._draftTracker) {
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
      if (this._dragMoves.settle(), this._gesturePointer = null, this._tool === "wall" && this._draft) {
        const t = this._draft;
        if (this._draft = null, t.x1 !== t.x2 || t.y1 !== t.y2) {
          const i = { id: Y("wall"), ...t };
          this._commitFloor({ walls: [...this._floor().walls, i] }), this._selection = [{ kind: "wall", id: i.id }];
        }
        return;
      }
      if (this._tool === "tracker" && this._draftTracker) {
        const t = this._draftTracker;
        this._draftTracker = null, this._releasePointer(e);
        const i = Math.min(t.x0, t.x1), n = Math.min(t.y0, t.y1), o = Math.abs(t.x1 - t.x0), s = Math.abs(t.y1 - t.y0);
        o >= this.grid / 2 && s >= this.grid / 2 && this._addTracker(i, n, o, s);
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
    return fg(this._floor(), e);
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
    const i = this._toVirtual(e, !1), n = bg(this._floor(), i.x, i.y, {
      itemSize: qe,
      textSize: Pt,
      wallThickness: G,
      hass: this.hass
    }), o = !!this._pickAnchor && Math.hypot(e.clientX - this._pickAnchor.clientX, e.clientY - this._pickAnchor.clientY) <= oy;
    return this._pickAnchor = { clientX: e.clientX, clientY: e.clientY }, vg(n, this._selection, o) ?? t;
  }
  _startDrag(e, t, i, n) {
    if (this._tool !== "select" || (e.stopPropagation(), this._gesturePointer !== null)) return;
    this._canvasWrap?.focus({ preventScroll: !0 });
    const o = i != null || n != null, s = o ? t : this._resolvePick(e, t);
    o ? this._selectOne(s) : this._selectForPointer(e, s), !Yt(this._floor(), s) && (this._drag = {
      primary: s,
      start: this._toVirtual(e, !1),
      orig: this._snapshotSelection(),
      endpoint: i,
      areaVertex: n
    }, s.kind === "wall" && (this._drag.attached = this._attachedCorners(s.id, i)), this._gesturePointer = e.pointerId, this._capturePointer(e));
  }
  /** See {@link attachedCorners}: shared room corners that stretch with this wall. */
  _attachedCorners(e, t) {
    return dg(this._floor().walls, e, t);
  }
  /** Capture the start positions of every selected element on the active floor. */
  _snapshotSelection() {
    const e = this._floor(), t = /* @__PURE__ */ new Map();
    for (const i of this._selection)
      if (!Yt(e, i))
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
        let g = f;
        f.id === t.primary.id && (g = t.endpoint === 1 ? { ...g, x1: d.x, y1: d.y } : { ...g, x2: d.x, y2: d.y });
        for (const b of c)
          b.id === f.id && (g = b.end === 1 ? { ...g, x1: d.x, y1: d.y } : { ...g, x2: d.x, y2: d.y });
        return g;
      });
      this._emitFloor({ walls: p });
      return;
    }
    if (t.primary.kind === "area" && t.areaVertex != null) {
      const c = t.areaVertex, h = this._snapAreaPoint(e.x, e.y, { areaId: t.primary.id, vertexIndex: c }), d = (i.areas ?? []).map(
        (p) => p.id === t.primary.id ? { ...p, points: p.points.map((f, g) => g === c ? h : f) } : p
      );
      this._emitFloor({ areas: d });
      return;
    }
    if (this._selection.length === 1 && t.primary.kind === "opening") {
      const c = t.orig.get(`opening:${t.primary.id}`);
      if (c && c.kind === "pt") {
        const h = c.x + (e.x - t.start.x), d = c.y + (e.y - t.start.y), p = Ls(h, d, i.walls, qs), f = i.openings.map(
          (g) => g.id === t.primary.id ? p ? { ...g, x: p.x, y: p.y, angle: p.angle } : { ...g, x: this._snap(h), y: this._snap(d) } : g
        );
        this._emitFloor({ openings: f });
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
    return mg(this._floor(), e, t, i);
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
    const n = this._floor(), o = Ls(t, i, n.walls, qs), s = {
      id: Y(e),
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
      id: Y("item"),
      entity: "",
      x: this._snap(this._config.width / 2),
      y: this._snap(this._config.height / 2),
      kind: e,
      showState: e === "sensor",
      showIcon: !0,
      size: qe
    };
    this._commitFloor({ items: [...this._floor().items, t] }), this._selection = [{ kind: "item", id: t.id }], this._tool = "select";
  }
  _addFurniture(e) {
    const t = tf(e, this._symbols()), i = {
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
    const o = {
      id: Y("tracker"),
      x: e,
      y: t,
      w: i,
      h: n,
      angle: 0,
      dotSize: eo
    };
    this._commitFloor({ trackers: [...this._floor().trackers ?? [], o] }), this._selection = [{ kind: "tracker", id: o.id }], this._tool = "select";
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
      size: Pt
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
      id: Y("wall"),
      x1: d.x1 + t,
      y1: d.y1 + t,
      x2: d.x2 + t,
      y2: d.y2 + t
    })), s = e.openings.map((d) => ({
      ...d,
      ...n,
      id: Y(d.type),
      x: d.x + t,
      y: d.y + t
    })), r = e.items.map((d) => ({
      ...d,
      ...n,
      id: Y("item"),
      x: d.x + t,
      y: d.y + t
    })), a = e.texts.map((d) => ({
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
    const e = this._floor().walls.map((o) => ({ ...o, id: Y("wall") })), t = (this._config.floors?.length ?? 1) + 1, i = id(`Floor ${t}`, e), n = [...this._config.floors ?? [], i];
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
    const t = sd(this._config.floors ?? [], this._activeFloorId, e);
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
    const t = gs(this.hass).find((i) => i.floor_id === e);
    this._commit({
      ...this._config,
      floors: (this._config.floors ?? []).map(
        (i) => i.id === this._activeFloorId ? { ...i, haFloor: t?.floor_id, ...t ? { name: t.name } : {} } : i
      )
    });
  }
  /** HA-floor link row for the floor gear popover; hidden when HA exposes no floors. */
  _renderHaFloorRow(e) {
    const t = gs(this.hass);
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
    return Bt(this._config?.palette);
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
    const n = Fa(e), o = n && i.some((s) => ee(s.name) === n) ? n : void 0;
    return u`
      <select
        class="palette-pick"
        title="Use one of the plan's named colours"
        .value=${o ?? ""}
        @change=${(s) => {
      const r = s.target.value;
      if (!r) {
        o && t(oi(e, i));
        return;
      }
      const a = i.find((l) => ee(l.name) === r);
      a && t(Ds(a.name));
    }}
      >
        <option value="" ?selected=${!o}>Custom…</option>
        ${i.map(
      (s) => u`<option
            value=${ee(s.name)}
            ?selected=${ee(s.name) === o}
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
    return Tn(
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
    const t = Ne(e), i = (o) => this._updateItem(e.id, {
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
      ) : m}
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
    const n = Ws(t, i.x, i.y);
    if (rs(n))
      return sn(this.hass, n.haArea).length ? n.id : void 0;
  }
  _areaEntitiesAt(e, t) {
    const i = Ws(this._floor(), e, t);
    return rs(i) ? { entities: sn(this.hass, i.haArea), name: i.name } : void 0;
  }
  /** Every entity in `area`'s linked HA area not already placed as an item on this floor. */
  _pendingAreaEntities(e) {
    if (!e.haArea) return [];
    const t = new Set(this._floor().items.map((i) => i.entity));
    return sn(this.hass, e.haArea).filter((i) => !t.has(i));
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
    const i = pg(e.points, t.length), n = t.map((o, s) => {
      const r = Ts(o);
      return {
        id: Y("item"),
        entity: o,
        x: Math.round(i[s].x),
        y: Math.round(i[s].y),
        kind: r,
        showState: r === "sensor",
        showIcon: !0,
        size: qe
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
        const n = Mg(i.type, this._symbols());
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
        <span class="ctx-hint">
          ${n === 0 ? "Click to start a room outline; points snap to nearby corners." : n < 3 ? `${n} point${n === 1 ? "" : "s"} placed — click to add more (3+ to close).` : `${n} points placed — click the first point to close the room, or keep adding.`}
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
    const e = this._snapMode, t = ms(this._config.snap, this.grid), i = [
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
        Number(o.target.value) || fs
      );
      this._patchConfig({ snap: on(s, this.grid) });
    }}
            /><span class="ctx-field-label">%</span>` : m}
      <span class="ctx-hint">${n}</span>
    `;
  }
  render() {
    if (!this._config) return u`${m}`;
    const e = this._config, t = this._floor(), i = e.floors ?? [], n = po(e.overlayScale), o = this._scopingAreaId(), s = e.showDeadSpaces ? Hr(t.walls, t.openings) : [], r = t.items.some((l) => l.glow) ? lo(t.walls, t.openings, (l) => Kr(
      l,
      ((h) => ut(l, h ? this.hass?.states[h] : void 0))(l.entity),
      l.secondaryEntity && zt(l) ? ut(
        ua(l),
        this.hass?.states[l.secondaryEntity]
      ) : void 0,
      l.shutterEntity ? Oe(this.hass?.states[l.shutterEntity], l.shutterInvert) : void 0
    )) : t.walls, a = !t.walls.length && !t.openings.length && !t.items.length && !t.texts.length && !t.furniture.length && !(t.trackers ?? []).length && !(t.areas ?? []).length;
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
          style=${this._fullscreen ? m : `aspect-ratio:${O(e.width, ht)} / ${O(e.height, jt)};`}
          @wheel=${this._onCanvasWheel}
        >
          <!-- The stage doubles as the card's .plan box for overlay sizing: same
               container query, same --fp-u, so a badge measured in canvas units
               previews here at the size a card of this width would draw it
               (issue #192). The editor never rotates the plan, so the canvas
               width is what 100cqw measures against. -->
          <div class="stage ${n === "plan" ? "scale-plan" : ""}"
               style="aspect-ratio: ${O(e.width, ht)} / ${O(
      e.height,
      jt
    )}; width:${this._zoom * 100}%;
                   --fp-plan-w: ${O(e.width, ht)};${Oc(
      e.skin
    )}${La(e.palette)}">
            <!-- Keyed on the skin and the palette, for the repaint reason
                 documented on the card's SVG (issue #122): a var() inside a
                 presentation attribute does not repaint when the custom
                 property changes, so without this the canvas kept the previous
                 skin's doors and room fills — and, since issue #265, would show
                 a palette colour's old value while you were editing it. -->
            ${Sr(
      `${e.skin ?? ""}|${Ra(e.palette)}`,
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
                            preserveAspectRatio=${Sa(t.imageFit)}
                            opacity=${t.imageOpacity ?? 1} />` : m}
              ${this._renderGrid()}
              ${we(
        t.areas ?? [],
        (l, c) => l.id || c,
        (l) => this._renderAreaSel(l, o)
      )}
              <!-- Dead spaces (issue #88), same layer position as the card so
                   what you draw is what you get. Live while you draw: closing
                   the last wall of a shaft hatches it, and dropping a door into
                   it clears the hatching again — which is the fastest way to
                   see that the card agrees with you about what is sealed. -->
              ${s.length ? _`${Aa(`${this._wallMaskId}-dead`)}
                      ${s.map(
        (l) => Ma(l, `${this._wallMaskId}-dead`)
      )}` : m}
              <!-- Light pools (issue #6), same layer position as the card so
                   what you place is what you get. Previewed at full strength
                   with no hass in the editor, so the radius is adjustable
                   without having to turn the real light on. -->
              ${Zr(
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
        const h = xf(l, this.hass?.states[l.entity]);
        return h ? Vr(l, h, `${this._wallMaskId}-glow-${c}`, r) : m;
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
                                  r=${O(l.glowRadius, zi)} />` : m
      )}
              ${t.furniture.map((l) => this._renderFurnitureSel(l))}
              ${Ea(t.openings, e.width, e.height, this._wallMaskId)}
              ${t.walls.map((l) => this._renderWall(l))}
              <!-- Room outlines, same layer position as the card so what you
                   place is what you get. Only a static borderColor draws here,
                   there being no hass to resolve a live color from — but the
                   clip ids are passed anyway, so wiring a live preview in later
                   cannot silently land on the unclipped path. -->
              <g mask=${`url(#${this._wallMaskId})`}>
                ${(t.areas ?? []).map(
        (l, c) => Ta(l, void 0, `${this._wallMaskId}-area-${c}`)
      )}
              </g>
              ${we(
        // Keyed by id: switching floors must create fresh DOM. Reused
        // nodes would CSS-transition from the previous floor's opening
        // state — a window briefly plays a door swing (issue #50).
        t.openings,
        (l, c) => l.id || c,
        (l) => this._renderOpeningSel(l)
      )}
              ${we(
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
              ${this._marquee ? _`<rect x=${Math.min(this._marquee.x0, this._marquee.x1)}
                              y=${Math.min(this._marquee.y0, this._marquee.y1)}
                              width=${Math.abs(this._marquee.x1 - this._marquee.x0)}
                              height=${Math.abs(this._marquee.y1 - this._marquee.y0)}
                              class="marquee" />` : m}
            </svg>`
    )}
            <div class="items">
              ${t.texts.map((l) => this._renderTextOverlay(l, e, n))}
              ${t.openings.filter((l) => ma(l)).map((l) => this._renderShutterMarkOverlay(l, e, n))}
              ${t.openings.filter((l) => ba(l)).map((l) => this._renderOpeningMarkOverlay(l, e, n))}
              ${t.items.map((l) => this._renderItemOverlay(l, e, n))}
            </div>
          </div>
        </div>
        ${a && !this._draft && !this._draftTracker && !this._draftArea ? u`<div class="empty-hint">
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
        .computeLabel=${ty}
        .computeHelper=${iy}
        @value-changed=${(i) => {
      i.stopPropagation();
      const n = Ag(e.data, i.detail.value, e.fields), o = Gs(n, e.fields), s = Object.keys(o);
      if (!s.length) return;
      const r = s.length === 1 && Bs(e.fields.find((a) => a.name === s[0]));
      t(e.toPatch(o), r);
    }}
      ></ha-form>` : u`${e.fields.map((i) => this._renderFallbackField(e, i, t))}`;
  }
  _applyFallback(e, t, i, n, o) {
    const s = Gs({ [t.name]: i }, e.fields);
    t.name in s && o(e.toPatch(s), n && Bs(t));
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
            />` : m}
        <input
          class="num"
          type="number"
          min=${s.min ?? m}
          max=${s.max ?? m}
          step=${s.step ?? m}
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
      </div>` : "ui_action" in o ? u`${m}` : u`<div class="row">
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
        title=${n ?? m}
        @value-changed=${(o) => i(o.detail.value ?? "")}
      ></ha-entity-attribute-picker>` : u`<input
      type="text"
      class="reading-attr"
      placeholder="attribute"
      title=${n ?? m}
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
    }, t = this._symbols(), i = ja(t).filter((s) => ef(s, this._addQuery)), n = !this._addQuery.trim();
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
      return o = s.category, u`${r ? u`<div class="furn-group">${r}</div>` : m}
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
          ${Dn(
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
      `;
    const i = e > 1 ? `${e} elements selected` : this._selectionSummary(t), n = e > 1 ? "mdi:select-group" : ny[t.kind];
    return u`
      <section class="edit-area">
        <div class="edit-head">
          <ha-icon icon=${n}></ha-icon>
          <span class="edit-title" title=${i}>${i}</span>
          <span class="head-spacer"></span>
          ${(() => {
      const o = this._floor(), s = this._selection.every((r) => Yt(o, r));
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
              style=${ta(e.thickness)} stroke-linecap="round" /></g>
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
        ${wa(e, {
      color: t ? "var(--primary-color, #03a9f4)" : Zn,
      // The closed colour previews here too (issue #228) — unless this is
      // the selected opening, whose whole symbol goes blue to show that.
      inactive: t ? void 0 : e.inactiveColor,
      open: mo(e),
      // Draw sliding / rolling openings partly open in the editor so the
      // motion is visible — closed, both look like a plain band, which
      // would make the Motion / Slide / Style controls appear inert.
      amount: Z(e) !== "swing" ? 0.55 : void 0,
      // Shutter previewed half-rolled so the layer is visible while
      // configuring, whatever the live state.
      shutter: e.shutterEntity ? { amount: 0.55, style: pt(e), flip: e.shutterFlipV } : void 0
    })}
      </g>`;
  }
  /**
   * Render a Tracker in the editor SVG with its zone outline visible (so the
   * user can grab/resize it) plus a hit overlay for drag-to-move and a dashed
   * selection rectangle when active.
   */
  _renderTrackerSel(e) {
    const t = this._isSel("tracker", e.id), i = Si(this.hass?.states, e.xSensor?.entity), n = Si(this.hass?.states, e.ySensor?.entity), o = bi(this.hass?.states, e.xSensor?.presence), s = bi(this.hass?.states, e.ySensor?.presence);
    return _`
      <g class="tracker-hit ${t ? "selected" : ""}"
         @pointerdown=${(r) => this._startDrag(r, { kind: "tracker", id: e.id })}>
        ${Ia(e, {
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
                        class="tracker-outline" />` : m}
      </g>`;
  }
  _renderFurnitureSel(e) {
    const t = this._isSel("furniture", e.id);
    return _`
      <g class="furn-hit ${t ? "selected" : ""}"
         @pointerdown=${(i) => this._startDrag(i, { kind: "furniture", id: e.id })}>
        ${Dn(e, void 0, this._symbols())}
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
    const i = this._isSel("area", e.id), n = e.id === t, o = e.points.map((s) => `${s.x},${s.y}`).join(" ");
    return _`
      <g class="area-hit ${i ? "selected" : ""} ${n ? "scoping" : ""}">
        ${n ? _`<polygon points=${o} class="area-scoping" />` : m}
        ${Ca(e)}
        <polygon points=${o} class="area-hit-shape"
                 @pointerdown=${(s) => this._startDrag(s, { kind: "area", id: e.id })} />
        ${i ? _`<polygon points=${o} class="area-outline" />` : m}
        ${// Outline yes, vertex handles no, for a pinned room — same reasoning
    // as the wall's endpoints (issue #191): still visibly selected, with
    // nothing on it that pretends to be draggable.
    i && !e.locked ? e.points.map(
      (s, r) => _`
                  <circle cx=${s.x} cy=${s.y} r="7" class="handle"
                          @pointerdown=${(a) => this._startDrag(a, { kind: "area", id: e.id }, void 0, r)} />`
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
    const t = e.points, i = t.map((r) => `${r.x},${r.y}`).join(" "), n = t[t.length - 1], o = t.length >= 3, s = this._areaHover;
    return _`
      <g class="area-draft">
        ${t.length > 1 ? _`<polyline points=${i} class="area-draft-line" />` : m}
        ${s ? _`<line x1=${n.x} y1=${n.y} x2=${s.x} y2=${s.y}
                        class="area-draft-hover" />` : m}
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
    const n = e.shutterEntity, o = this.hass?.states[n], s = Oe(o, e.shutterInvert) > 0, r = ya(e, o, s, this.hass?.entities?.[n]?.icon), a = D(e.shutterActiveColor ?? e.activeColor) ?? B, l = bo(e), c = yo(e), h = H(xi, i), d = H(vi, i);
    return u`<div
      class="shutter-mark ${ii(o, e.shutterInvert) ? "on" : "off"}"
      style="left:${l.x / t.width * 100}%; top:${l.y / t.height * 100}%;
             width:${h};height:${h};
             transform:translate(-50%,-50%)
                       translate(calc(${c.x} * ${d}), calc(${c.y} * ${d}));
             --fp-active:${a};"
      title=${`${o?.attributes?.friendly_name ?? n} — shown on the card, tap it there to open the shutter`}
    >
      <ha-icon icon=${r} style="--mdc-icon-size:${H(
      wi,
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
    const n = e.entity, o = this.hass?.states[n], s = ut(e, o) > 0, r = _a(e, o, s, this.hass?.entities?.[n]?.icon), a = D(e.activeColor) ?? B, l = va(e), c = xa(e), h = H(xi, i), d = H(vi, i);
    return u`<div
      class="shutter-mark ${On(e, o) ? "on" : "off"}"
      style="left:${l.x / t.width * 100}%; top:${l.y / t.height * 100}%;
             width:${h};height:${h};
             transform:translate(-50%,-50%)
                       translate(calc(${c.x} * ${d}), calc(${c.y} * ${d}));
             --fp-active:${a};"
      title=${`${o?.attributes?.friendly_name ?? n} — shown on the card, tap it there to open its dialog`}
    >
      <ha-icon icon=${r} style="--mdc-icon-size:${H(
      wi,
      i
    )};"></ha-icon>
    </div>`;
  }
  _renderItemOverlay(e, t, i) {
    const n = this._isSel("item", e.id), o = e.entity ? this.hass?.states[e.entity] : void 0, s = Tn(e, o, e.entity ? this.hass?.entities?.[e.entity]?.icon : void 0), { text: r, live: a } = Mf(this.hass, e), l = O(e.size, qe), c = Ut(e) !== "none", h = e.display ?? "badge", d = uo(e, o), p = D(ji(e.stateColor, d)), f = ea(e, p), g = Ut(e) === "value" ? la(this.hass, e) : void 0, b = Me(e.entity, o?.state), x = b ? D(e.activeColor) ?? Br(o) : void 0, v = !!this.hass && In(e, o?.state), w = b || v ? void 0 : D(e.inactiveColor), y = Er(
      oi(p ?? x ?? w, this._config?.palette)
    ), $ = e.rippleColor ?? p ?? x ?? B, E = e.rippleSize ?? Li, T = e.rippleDirection ?? Ri, I = e.rippleWidth ?? Fi, R = na(e, o?.state, o?.attributes), Q = H(l, i), Ce = u`<div
      class="badge ${c ? "" : "ghost"} ${p ? "state-colored" : b ? "active-colored" : w ? "inactive-colored" : ""}"
      style="width:${Q};height:${Q};transform:rotate(${O(e.angle, 0)}deg);${p ? `--fp-state:${p};` : ""}${x ? `--fp-active:${x};` : ""}${w ? `--fp-inactive:${w};` : ""}${y ? `--fp-ink:${y};` : ""}"
    >
      ${g ? u`<span
            class="badge-value"
            style="font-size:${H(ha(l, g), i)};"
            >${g}</span
          >` : u`<ha-icon
            class=${R ? `anim-${R}` : ""}
            icon=${s}
            style="--mdc-icon-size:${H(ra(l), i)};"
          ></ha-icon>`}
    </div>`;
    let se;
    h === "ripple" ? se = ki(!0, $, E, T, I, 3, i) : h === "iconRipple" ? se = u`<div class="stack">
        ${ki(!0, $, E, T, I, 3, i)}
        <div class="stack-icon">${Ce}</div>
      </div>` : se = Ce;
    const M = Xr(e, o?.state);
    return u`
      <div
        class="edit-item ${n ? "selected" : ""} ${M ? "card-hidden" : ""}"
        style="left:${e.x / t.width * 100}%; top:${e.y / t.height * 100}%;"
        @pointerdown=${(ce) => this._onOverlayDown(ce, { kind: "item", id: e.id })}
        @pointermove=${this._onOverlayMove}
        @pointerup=${this._onOverlayUp}
        @pointercancel=${this._onPointerCancel}
      >
        ${se}
        <!-- The card's own label line when there is one (issue #135), so
             turning Show state on is visible here rather than only after
             leaving the editor; otherwise the dim identification fallback.
             The Labels toolbar toggle hides either on dense plans (issue
             #52), and the size previews the card's labelSize (issue #59). -->
        ${this._hideLabels ? m : u`<span
            class="ilabel ${a ? "live" : ""} ilabel-${ho(e)}"
            style="font-size:${H(
      a || e.labelSize != null ? Qr(e.labelSize) : 11,
      i
    )};${a && f ? `color:${f};` : ""}"
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
               font-size:${H(O(e.size, Pt), i)};
               color:${he(e.color, Mr)};
               transform:translate(-50%,-50%) rotate(${O(e.angle, 0)}deg);"
        @pointerdown=${(o) => this._onOverlayDown(o, { kind: "text", id: e.id })}
        @pointermove=${this._onOverlayMove}
        @pointerup=${this._onOverlayUp}
        @pointercancel=${this._onPointerCancel}
      >
        ${oo(this.hass, e) || "…"}
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
    const e = this._config, t = (n) => this._patchConfig(n), i = Vg(e);
    return u`
      <div class="rows panel-body">
        ${this._renderGroup(
      "Project",
      this._renderForm(Bg(e), (n, o) => {
        "grid" in n && typeof n.grid == "number" && (n = { ...n, ...this._gridPatch(n.grid) }), o ? this._patchConfigLive(n) : this._patchConfig(n);
      })
    )}
        ${this._renderGroup(
      // The plan's own look: its palette, its paper, and the one drawing
      // convention that is a plan-wide choice rather than an element's.
      "Look",
      this._renderForm(qg(e), t),
      this._renderColorRow({
        label: "Background",
        value: e.background,
        swatch: "#ffffff",
        placeholder: "#ffffff or empty",
        onLive: (n) => this._patchConfigLive({ background: n }),
        onCommit: (n) => this._patchConfig({ background: n })
      }),
      this._renderForm(Zg(e), t)
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
      this._renderForm(Jg(this._floor()), (n, o) => {
        o ? this._patchFloorLive(n) : this._commitFloor(n);
      })
    )}
        ${this._renderGroup(
      // How the card is framed on the dashboard, as opposed to what is
      // drawn inside it. Set once for a surface and rarely touched again.
      "Display",
      this._renderForm(
        ge(i, [
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
      this._renderForm(Yg(e), t),
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
      this._renderForm(Xg(e), t)
    )}
        ${this._renderGroup(
      // How devices look and answer, plan-wide. "Offline devices" lived
      // under display, beside the card's rotation, which is not what it is
      // about.
      "Devices",
      this._renderForm(Kg(e), t),
      this._renderForm(ge(i, ["offlineStyle"]), t),
      this._renderForm(Gg(e), t)
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
        ${e.length ? m : u`<span class="hint"
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
        ${this._paletteError ? u`<div class="symbol-error">${this._paletteError}</div>` : m}
        ${e.length >= Oa ? m : u`<div class="row wide state-color-add">
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
    const t = new Set(e.map((i) => ee(i.name)));
    for (let i = 1; ; i++) {
      const n = `Color ${i}`;
      if (!t.has(ee(n))) return n;
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
    const o = t.value.trim(), s = ee(n.name), r = ee(o);
    if (s === r) {
      if (this._paletteError = "", o === (n.name ?? "")) {
        t.value = o;
        return;
      }
      this._patchConfig({ palette: i.map((c, h) => h === e ? { ...c, name: o } : c) });
      return;
    }
    if (r && i.some((c, h) => h !== e && ee(c.name) === r)) {
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
        Ns(l, s, r ? Ds(o) : n.color)
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
    if (!D(o)) {
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
      this._slugStillResolves(ee(i.name), o) ? o : Ns(o, ee(i.name), i.color)
    );
  }
  /** Whether a slug is still declared by the palette in `config`. */
  _slugStillResolves(e, t) {
    return e ? Bt(t.palette).some((i) => ee(i.name) === e) : !1;
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
      const t = this._floor().openings.find((s) => s.id === e.id);
      if (!t) return u`${m}`;
      const i = Cg(t, (s) => this._supportedFeatures(s)), n = (s, r) => {
        if ("entity" in s) {
          const a = s.entity, l = a ? this.hass?.states[a]?.attributes?.device_class : void 0;
          s = { ...s, ...l ? im(l) : {} };
        }
        this._applyElementPatch("opening", t.id, s, r);
      }, o = (s, r, ...a) => {
        const l = ge(i, r);
        return !l.fields.length && !a.some((c) => c && c !== m) ? m : this._renderGroup(s, this._renderForm(l, n), ...a);
      };
      return u`
        ${C.OPENING_GROUPS.map(
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
          })}` : m
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
          }) : m
        ) : o(s, r)
      )}
      `;
    }
    if (e.kind === "item") {
      const t = this._floor().items.find((l) => l.id === e.id);
      if (!t) return u`${m}`;
      const i = this._areaEntitiesAt(t.x, t.y), n = t.entity ? this.hass?.states[t.entity]?.attributes?.device_class : void 0, o = (l) => (l ? this.hass?.states[l]?.attributes?.friendly_name : void 0) ?? l, s = {
        source: da(this.hass, t)?.source ?? "primary",
        primaryLabel: o(t.entity),
        // One label per reading, positionally — the dropdown names each rather
        // than numbering them, and a reading with no entity of its own is read
        // off this device, so that is the name to show for it (issue #180).
        readingLabels: Ne(t).map((l) => o(l.entity || t.entity))
      }, r = (l, c) => {
        "entity" in l && typeof l.entity == "string" && (l = { ...l, kind: Ts(l.entity) }), this._applyElementPatch("item", t.id, l, c);
      }, a = Lg(t, n);
      return u`
        ${this._renderGroup("Identity", this._renderForm(Ig(t), r))}
        ${this._renderGroup(
        "What it reads",
        // Entity, its attribute, whether its own state shows, then every
        // other entity — the order the label prints them in (issue #180).
        this._renderForm(Tg(t, i), r),
        this._renderForm(Pg(t), r),
        this._renderItemReadings(t)
      )}
        ${Af(t) ? this._renderGroup(
        "Label",
        this._renderForm(Og(t), r),
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
        this._renderForm(zg(t, s), r),
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
        oa(t.entity, n) && ko(t) ? this._renderColorRow({
          label: "Ripple color",
          value: t.rippleColor,
          swatch: t.activeColor ?? "#03a9f4",
          placeholder: t.activeColor ? "(active color)" : "(primary)",
          onLive: (l) => this._updateItemLive(t.id, { rippleColor: l }),
          onCommit: (l) => this._updateItem(t.id, { rippleColor: l })
        }) : m
      ) : m}
        ${this._renderGroup("Behaviour", this._renderForm(Fg(t), r))}
        ${this._renderGroup("Visibility", this._renderForm(Rg(t), r))}
      `;
    }
    if (e.kind === "text") {
      const t = this._floor().texts.find((i) => i.id === e.id);
      return t ? u`
        ${this._renderForm(
        Dg(t, this._areaEntitiesAt(t.x, t.y)),
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
      const t = this._floor().furniture.find((o) => o.id === e.id);
      if (!t) return u`${m}`;
      const i = Ng(t, this._areaEntitiesAt(t.x, t.y), this._symbols()), n = (o, s) => this._applyElementPatch("furniture", t.id, o, s);
      return u`
        ${C.FURNITURE_GROUPS.map(
        ([o, s]) => this._renderGroup(o, this._renderForm(ge(i, s), n))
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
              ` : m
      )}
      `;
    }
    if (e.kind === "area") {
      const t = (this._floor().areas ?? []).find((r) => r.id === e.id);
      if (!t) return u`${m}`;
      const i = Xc(this.hass), n = t.haArea ? this._pendingAreaEntities(t) : [], o = Wg(t), s = (r, a) => this._applyElementPatch("area", t.id, r, a);
      return u`
        ${this._renderGroup(
        // The name doubles as the HA-area link, so the link status line and
        // the name-related toggles belong with it.
        "Identity",
        this._renderForm(
          jg(t, i.map((r) => r.name)),
          (r, a) => (
            // A name change also decides `haArea` (see areaNamePatch).
            this._applyElementPatch("area", t.id, Yc(r, i), a)
          )
        ),
        this._renderAreaLinkRow(t, i),
        this._renderForm(ge(o, ["showName", "labelSize"]), s)
      )}
        ${this._renderGroup(
        "What it reads",
        this._renderForm(ge(o, ["entity"]), s)
      )}
        ${this._renderGroup(
        "Color",
        this._renderForm(ge(o, ["highlight", "opacity", "activeOpacity"]), s),
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
              ` : m
      )}
        ${this._renderGroup(
        // What tapping the room does (issue #181). Last, as it is on every
        // other element: the thing it *does*, after everything it *is*.
        "Behavior",
        this._renderForm(
          ge(o, [
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
      ) : m}
        <p class="hint">
          Drag inside the fill to move the whole room; drag a vertex handle to reshape it.
        </p>
      `;
    }
    if (e.kind === "tracker") {
      const t = (this._floor().trackers ?? []).find((o) => o.id === e.id);
      if (!t) return u`${m}`;
      const i = Hg(t), n = (o, s) => this._applyElementPatch("tracker", t.id, o, s);
      return u`
        ${this._renderGroup(
        "Zone",
        this._renderForm(ge(i, C.TRACKER_GROUPS[0][1]), n)
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
        this._renderForm(ge(i, C.TRACKER_GROUPS[1][1]), n),
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
      if (!t) return u`${m}`;
      const i = Math.round(Math.hypot(t.x2 - t.x1, t.y2 - t.y1));
      return u`
        ${this._renderForm(
        Ug(t),
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
                </label>` : m}
          </div>` : m}
    `;
  }
};
C._nextWallMaskId = 0;
C.OPENING_GROUPS = [
  // What it is, and how it is drawn.
  ["Shape", ["type", "motion", "length", "sash", "sashSpan", "hinge", "opens", "slide", "style", "angle"]],
  // Which contacts drive it — the opening's own, before the shutter's.
  ["What it reads", ["entity", "secondaryEntity", "invert"]],
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
C.FURNITURE_GROUPS = [
  ["Shape", ["type", "hand", "w", "h", "angle"]],
  ["What it reads", ["entity"]],
  // What clicking it does — a staircase that changes floor (issue #121).
  ["Behavior", ["goToFloor"]]
];
C.TRACKER_GROUPS = [
  ["Zone", ["w", "h", "x", "y", "angle"]],
  ["Marker", ["dotSize"]]
];
C.styles = [
  Cr,
  ne`
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
      width: ${yi}px;
      height: ${yi}px;
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
  A({ attribute: !1 })
], C.prototype, "hass", 2);
L([
  k()
], C.prototype, "_config", 2);
L([
  k()
], C.prototype, "_tool", 2);
L([
  k()
], C.prototype, "_selection", 2);
L([
  k()
], C.prototype, "_activeFloorId", 2);
L([
  k()
], C.prototype, "_draft", 2);
L([
  k()
], C.prototype, "_draftTracker", 2);
L([
  k()
], C.prototype, "_draftArea", 2);
L([
  k()
], C.prototype, "_areaHover", 2);
L([
  k()
], C.prototype, "_freeWalls", 2);
L([
  k()
], C.prototype, "_defaultOpeningLength", 2);
L([
  k()
], C.prototype, "_marquee", 2);
L([
  k()
], C.prototype, "_history", 2);
L([
  k()
], C.prototype, "_future", 2);
L([
  k()
], C.prototype, "_zoom", 2);
L([
  k()
], C.prototype, "_floorMenuOpen", 2);
L([
  k()
], C.prototype, "_addMenuOpen", 2);
L([
  k()
], C.prototype, "_addQuery", 2);
L([
  k()
], C.prototype, "_symbolDraft", 2);
L([
  k()
], C.prototype, "_symbolError", 2);
L([
  k()
], C.prototype, "_paletteError", 2);
L([
  k()
], C.prototype, "_projectOpen", 2);
L([
  k()
], C.prototype, "_openGroups", 2);
L([
  k()
], C.prototype, "_fullscreen", 2);
L([
  k()
], C.prototype, "_applyState", 2);
L([
  k()
], C.prototype, "_applyError", 2);
L([
  bt(".editor")
], C.prototype, "_editorEl", 2);
L([
  bt("svg")
], C.prototype, "_svg", 2);
L([
  bt(".canvas-wrap")
], C.prototype, "_canvasWrap", 2);
L([
  k()
], C.prototype, "_hideLabels", 2);
C = L([
  Ci("fp-ef-editor")
], C);
const ay = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get FloorplanCardEditor() {
    return C;
  }
}, Symbol.toStringTag, { value: "Module" }));
var ly = Object.defineProperty, cy = Object.getOwnPropertyDescriptor, je = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? cy(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && ly(t, i, o), o;
};
const dy = "floorplan_panel", Zs = 800, hy = "custom:fp-ef-card";
function py(e) {
  return e?.ef ? structuredClone(e.ef) : { type: hy };
}
let _e = class extends te {
  constructor() {
    super(...arguments), this.revision = 0, this.edit = !1, this.narrow = !1, this._status = "", this._error = "", this._saving = !1, this._rev = 0, this._onConfigChanged = (e) => {
      const t = e.detail?.config;
      t && (e.stopPropagation(), this._pending = t, clearTimeout(this._timer), this._timer = setTimeout(() => void this._flush(), Zs));
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
    t && (t.hass = this.hass, (this._loadedEl !== t || !this.edit && e.has("plan")) && (this._loadedEl = t, t.setConfig(py(this.plan))));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._pending && this._flush();
  }
  async _flush() {
    if (clearTimeout(this._timer), !this._pending || this._saving) {
      this._pending && (this._timer = setTimeout(() => void this._flush(), Zs));
      return;
    }
    const e = this._pending;
    this._pending = void 0, await this._saveNow(e);
  }
  async _saveNow(e) {
    this._saving = !0, this._status = "saving", this._error = "";
    try {
      const t = await this.hass.callWS({
        type: `${dy}/plan/save`,
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
      ${m}
    ` : u`<fp-ef-card></fp-ef-card>`;
  }
};
_e.styles = ne`
    :host {
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
je([
  A({ attribute: !1 })
], _e.prototype, "hass", 2);
je([
  A({ attribute: !1 })
], _e.prototype, "plan", 2);
je([
  A({ type: Number })
], _e.prototype, "revision", 2);
je([
  A({ type: Boolean })
], _e.prototype, "edit", 2);
je([
  A({ attribute: !1 })
], _e.prototype, "narrow", 2);
je([
  k()
], _e.prototype, "_status", 2);
je([
  k()
], _e.prototype, "_error", 2);
_e = je([
  He("fp-ef-host")
], _e);
var uy = Object.defineProperty, fy = Object.getOwnPropertyDescriptor, Qe = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? fy(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && uy(t, i, o), o;
};
const my = /* @__PURE__ */ new Set(["light", "switch", "fan", "input_boolean", "siren"]), gy = 1.35, yy = 34, Ua = 380, Ba = 700, by = 0.55;
let _y = 0, Ae = class extends te {
  constructor() {
    super(...arguments), this.popupOpen = !1, this._box = { w: 0, h: 0 }, this._maskId = `fp-wall-mask-${++_y}`;
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
    const { w: e, h: t } = xn(this.floor, this.plan), i = getComputedStyle(this), n = this.clientWidth - parseFloat(i.paddingLeft) - parseFloat(i.paddingRight), o = this.clientHeight - parseFloat(i.paddingTop) - parseFloat(i.paddingBottom);
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
    n === "auto" && (hn(i) ? n = "toggle" : n = my.has(oe(i)) ? "toggle" : "more-info"), n !== "none" && (n === "more-info" ? ci(this, i) : hn(i) ? await un(this.hass, i) : await nr(this.hass, i));
  }
  _onItemContext(e, t) {
    t.entity && (e.preventDefault(), ci(this, t.entity));
  }
  render() {
    if (!this.plan || !this.floor) return m;
    const e = this.floor, t = xn(e, this.plan), { w: i, h: n } = t, o = e.areas.find((l) => l.id === this.zoomedAreaId);
    let s = o ? Rl(
      o.points.map((l) => ({ x: l.x - t.x, y: l.y - t.y })),
      i,
      n,
      void 0,
      void 0,
      Fl(o)
    ) : vn;
    o && this.popupOpen && s.scale > 1 && (s = this._shiftForPopup(s));
    const r = s.scale > 1 ? gy / s.scale : 1, a = Math.max(this.plan.canvas.width, this.plan.canvas.height) / 45;
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
      (l) => _`<g @click=${(c) => this._onAreaClick(c, l.id)}>${vr(l, {
        hass: this.hass,
        selected: l.id === this.zoomedAreaId,
        dimmed: !!o && l.id !== o.id,
        labelSize: a
      })}</g>`
    )}
            </g>
            <g class="furniture-layer">${e.items.map((l) => this._renderFurniture(l))}</g>
            ${ec(e, this.plan, this.hass, `${this._maskId}-glow`)}
            ${xr(e, this.plan, this._maskId)} ${dc(e, this.plan, { hass: this.hass })}
          </svg>
          <div class="items">
            ${e.items.filter((l) => !Nl(l, o, e.areas)).map((l) => this._renderItem(l, t))}
          </div>
        </div>
      </div>
    `;
  }
  /** Verschiebt den gezoomten Raum in den Bereich, den das Popup frei lässt (links bzw. oben). */
  _shiftForPopup(e) {
    return !this._box.w || !this._box.h ? e : this.clientWidth < Ba ? { ...e, tyPercent: e.tyPercent - this.clientHeight * by / 2 / this._box.h * 100 } : { ...e, txPercent: e.txPercent - (Ua + 32) / 2 / this._box.w * 100 };
  }
  _renderFurniture(e) {
    const t = $e(this.plan?.furniture, e.furnitureType);
    return t ? bn(e, t, { fill: pr(e, Ze(e.entity ? this.hass.states[e.entity] : void 0)) }) : m;
  }
  _renderItem(e, t) {
    if (!hr(e, this.plan?.furniture)) return m;
    const i = t.w, n = t.h, o = e.entity ? this.hass.states[e.entity] : void 0, s = Ze(o), r = !!e.entity && pn(o), a = e.icon ?? (e.entity ? ye(this.hass, e.entity) : "mdi:map-marker"), l = e.size ?? yy, c = s ? e.activeColor ?? "var(--fp-active-color, #ffb300)" : e.color ?? "", h = e.label ?? o?.attributes.friendly_name ?? e.entity ?? "";
    return u`
      <div
        class="item ${s ? "active" : ""} ${r ? "unavailable" : ""} ${e.entity ? "interactive" : ""}"
        style="left:${(e.x - t.x) / i * 100}%;top:${(e.y - t.y) / n * 100}%;--fp-item-size:${l}px;${c ? `--fp-item-color:${c}` : ""}"
        title=${h}
        @click=${(d) => this._onItemClick(d, e)}
        @contextmenu=${(d) => this._onItemContext(d, e)}
      >
        <div class="badge"><ha-icon .icon=${a}></ha-icon></div>
        ${e.label ? u`<div class="label">${e.label}</div>` : m}
        ${e.showState && o ? u`<div class="state">${ir(this.hass, o)}</div>` : m}
      </div>
    `;
  }
};
Ae.styles = [
  Se($r),
  Se(Kn),
  ne`
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
Qe([
  A({ attribute: !1 })
], Ae.prototype, "hass", 2);
Qe([
  A({ attribute: !1 })
], Ae.prototype, "plan", 2);
Qe([
  A({ attribute: !1 })
], Ae.prototype, "floor", 2);
Qe([
  A({ attribute: !1 })
], Ae.prototype, "zoomedAreaId", 2);
Qe([
  A({ type: Boolean })
], Ae.prototype, "popupOpen", 2);
Qe([
  k()
], Ae.prototype, "_box", 2);
Ae = Qe([
  He("fp-plan-view")
], Ae);
var vy = Object.defineProperty, xy = Object.getOwnPropertyDescriptor, Ki = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? xy(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && vy(t, i, o), o;
};
const wy = [
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
    if (!this.area) return m;
    const e = this.area.sidebar ?? [], t = e.filter((i) => dn(i.entity) === "device" && Ze(this.hass.states[i.entity])).length;
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
            </p>` : wy.map(({ kind: i, title: n }) => {
      const o = e.filter((s) => dn(s.entity) === i);
      return o.length ? u`<section>
                <h3>${n}</h3>
                ${i === "device" ? o.map((s) => this._renderRow(s)) : u`<div class="chips">${o.map((s) => this._renderChip(s))}</div>`}
              </section>` : m;
    })}
      </div>
    `;
  }
  _renderRow(e) {
    const t = this.hass.states[e.entity], i = Ze(t), n = pn(t), o = e.name || li(this.hass, e.entity), s = oe(e.entity);
    return u`
      <div class="row ${i ? "active" : ""} ${n ? "unavailable" : ""}">
        <button class="row-main" @click=${() => ci(this, e.entity)} title="Details">
          <span class="row-icon"><ha-icon .icon=${ye(this.hass, e.entity, e.icon)}></ha-icon></span>
          <span class="row-text">
            <span class="name">${o}</span>
            <span class="state">${ir(this.hass, t)}</span>
          </span>
        </button>
        ${n ? m : s === "cover" ? u`<span class="cover-btns">
              <button class="icon-btn" title="Öffnen" @click=${() => this._call("cover", "open_cover", e.entity)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button class="icon-btn" title="Stopp" @click=${() => this._call("cover", "stop_cover", e.entity)}>
                <ha-icon icon="mdi:stop"></ha-icon>
              </button>
              <button class="icon-btn" title="Schließen" @click=${() => this._call("cover", "close_cover", e.entity)}>
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
            </span>` : hn(e.entity) ? u`<button class="run" @click=${() => un(this.hass, e.entity)}>Ausführen</button>` : vl(e.entity) ? u`<button
              class="switch ${i ? "on" : ""}"
              role="switch"
              aria-checked=${i ? "true" : "false"}
              title=${i ? "Ausschalten" : "Einschalten"}
              @click=${() => nr(this.hass, e.entity)}
            >
              <span class="knob"></span>
            </button>` : m}
      </div>
    `;
  }
  _renderChip(e) {
    const t = this.hass.states[e.entity], i = e.name || li(this.hass, e.entity), n = oe(e.entity) === "script" && t?.state === "on";
    return u`
      <button
        class="chip ${n ? "running" : ""}"
        ?disabled=${pn(t)}
        title=${e.entity}
        @click=${() => un(this.hass, e.entity)}
        @contextmenu=${(o) => {
      o.preventDefault(), ci(this, e.entity);
    }}
      >
        <ha-icon .icon=${ye(this.hass, e.entity, e.icon)}></ha-icon>
        <span>${i}</span>
      </button>
    `;
  }
  _call(e, t, i) {
    this.hass.callService(e, t, { entity_id: i });
  }
};
gt.styles = ne`
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
Ki([
  A({ attribute: !1 })
], gt.prototype, "hass", 2);
Ki([
  A({ attribute: !1 })
], gt.prototype, "area", 2);
Ki([
  A({ type: Boolean })
], gt.prototype, "canEdit", 2);
gt = Ki([
  He("fp-room-sidebar")
], gt);
var $y = Object.defineProperty, ky = Object.getOwnPropertyDescriptor, Kt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? ky(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && $y(t, i, o), o;
};
let Xe = class extends te {
  constructor() {
    super(...arguments), this.canEdit = !1, this.sheet = !1, this._onKey = (e) => {
      e.key === "Escape" && this._close();
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._onKey), this._ro = new ResizeObserver(() => this.sheet = this.clientWidth < Ba), this._ro.observe(this);
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
    ` : m;
  }
};
Xe.styles = ne`
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
      width: ${Ua}px;
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
Kt([
  A({ attribute: !1 })
], Xe.prototype, "hass", 2);
Kt([
  A({ attribute: !1 })
], Xe.prototype, "area", 2);
Kt([
  A({ type: Boolean })
], Xe.prototype, "canEdit", 2);
Kt([
  A({ type: Boolean, reflect: !0 })
], Xe.prototype, "sheet", 2);
Xe = Kt([
  He("fp-room-dialog")
], Xe);
var Sy = Object.defineProperty, Ey = Object.getOwnPropertyDescriptor, le = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ey(t, i) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Sy(t, i, o), o;
};
const cn = "floorplan_panel";
let ie = class extends te {
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
      const e = await this.hass.callWS({ type: `${cn}/plan/get` });
      this._setPlan(e.plan, e.revision), this._unsub || (this._unsub = await this.hass.connection.subscribeMessage((t) => this._onEvent(t), {
        type: `${cn}/subscribe`
      }));
    } catch (e) {
      this._error = e?.message ?? String(e);
    } finally {
      this._loading = !1;
    }
  }
  _setPlan(e, t) {
    const i = yn(e);
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
      const e = await this.hass.callWS({ type: `${cn}/plan/load_sample` });
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
              </button>` : m}
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
            </div>` : m}
        <button class="icon-btn" title="Zum easy-floorplan-Port wechseln" @click=${this._toggleEf}>
          <ha-icon icon="mdi:swap-horizontal"></ha-icon>
        </button>
        ${this._isAdmin && e ? u`<button class="icon-btn" title="Grundriss bearbeiten" @click=${() => this._openEditor()}>
              <ha-icon icon="mdi:pencil-ruler"></ha-icon>
            </button>` : m}
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
                ></fp-room-dialog>` : m}
          </div>` : u`<div class="message">Lade …</div>`}
    `;
  }
};
ie.styles = ne`
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
le([
  A({ attribute: !1 })
], ie.prototype, "hass", 2);
le([
  A({ type: Boolean, reflect: !0 })
], ie.prototype, "narrow", 2);
le([
  A({ attribute: !1 })
], ie.prototype, "panel", 2);
le([
  k()
], ie.prototype, "_plan", 2);
le([
  k()
], ie.prototype, "_raw", 2);
le([
  k()
], ie.prototype, "_ef", 2);
le([
  k()
], ie.prototype, "_revision", 2);
le([
  k()
], ie.prototype, "_floorId", 2);
le([
  k()
], ie.prototype, "_zoomedAreaId", 2);
le([
  k()
], ie.prototype, "_editing", 2);
le([
  k()
], ie.prototype, "_editRoomId", 2);
le([
  k()
], ie.prototype, "_error", 2);
ie = le([
  He("floorplan-panel")
], ie);
