// Headless-Test des Kerns: baut nichts, benutzt core-dist/floorplan-core.js und den erfundenen Beispielplan.
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
function ladePlaywright() {
  for (const m of [process.env.PW_MODULE, "playwright", "playwright-core", "/tmp/pw/node_modules/playwright-core"].filter(Boolean)) {
    try { return require(m); } catch { /* nächster Kandidat */ }
  }
  throw new Error("playwright nicht gefunden (PW_MODULE setzen oder 'npm i -D playwright-core')");
}
const { chromium } = ladePlaywright();
const CHROMIUM = process.env.CHROMIUM_PATH || [
  "/home/claude/.cache/ms-playwright/chromium_headless_shell-1193/chrome-linux/headless_shell",
  "/opt/pw-browsers/chromium",
].find((p) => fs.existsSync(p));

const ROOT = path.resolve(__dirname, "..", "..");
const DATEIEN = {
  "/": [path.join(__dirname, "seite.html"), "text/html"],
  "/floorplan-core.js": [path.join(ROOT, "core-dist", "floorplan-core.js"), "text/javascript"],
  "/sample_plan.json": [path.join(ROOT, "custom_components", "floorplan_panel", "sample_plan.json"), "application/json"],
};
const SCREENSHOT = process.env.KERN_SCREENSHOT || path.join(ROOT, "docs", "core", "core-test.png");
let fehler = 0;
const ok = (name) => console.log(`  ok  ${name}`);
async function test(name, fn) {
  try { await fn(); ok(name); } catch (e) { fehler++; console.error(`FAIL  ${name}\n      ${e.message.split("\n").slice(0,3).join(" | ")}`); }
}

(async () => {
  const server = http.createServer((req, res) => {
    const d = DATEIEN[req.url.split("?")[0]];
    if (!d) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "content-type": d[1] }); res.end(fs.readFileSync(d[0]));
  }).listen(0);
  const port = server.address().port;
  const browser = await chromium.launch({ executablePath: CHROMIUM, args: ["--no-sandbox", "--disable-gpu"] });

  async function neueSeite(vorab) {
    const ctx = await browser.newContext({ viewport: { width: 1140, height: 800 }, deviceScaleFactor: 1 });
    const p = await ctx.newPage();
    p.anfragen = []; p.fehler = [];
    p.on("request", (r) => p.anfragen.push(r.url()));
    p.on("pageerror", (e) => p.fehler.push(e.message));
    p.on("console", (m) => m.type() === "error" && p.fehler.push(m.text()));
    if (vorab) await p.addInitScript(vorab);
    await p.goto(`http://localhost:${port}/`);
    await p.waitForFunction(() => window.bereit === true);
    return p;
  }
  const glows = (p) => p.evaluate(() => window.test.ansicht.karte.shadowRoot.querySelectorAll("circle.fp-glow").length);
  const warte = (p, ms = 60) => p.evaluate((ms) => new Promise((r) => setTimeout(r, ms)), ms);

  console.log("Kern im Browser");
  const bundle = fs.readFileSync(DATEIEN["/floorplan-core.js"][0], "utf8");

  await test("Bundle: eine Datei, unter 300 KB, ohne Editor-Code", () => {
    assert.ok(Buffer.byteLength(bundle) < 300 * 1024, "zu groß");
    assert.equal(fs.readdirSync(path.join(ROOT, "core-dist")).filter((f) => f.endsWith(".js")).length, 1);
    for (const marker of ["einmalig importieren", "ef-import-request", "Als Vorlage speichern", "fp-edit-wall-mask"]) assert.ok(!bundle.includes(marker), `Editor-Text gefunden: ${marker}`);
  });
  await test("Bundle: lädt nichts nach (kein fetch/XHR/import())", () => {
    assert.ok(!/\bfetch\s*\(/.test(bundle) && !/XMLHttpRequest/.test(bundle) && !/\bimport\s*\(/.test(bundle));
  });
  await test("Prüfsumme passt zur Datei", () => {
    const soll = fs.readFileSync(path.join(ROOT, "core-dist", "floorplan-core.js.sha256"), "utf8").split(/\s+/)[0];
    assert.equal(require("node:crypto").createHash("sha256").update(bundle).digest("hex"), soll);
  });

  let p = await neueSeite();
  await p.evaluate(() => window.test.starte());
  await warte(p, 400);

  await test("Beispielplan rendert: Wände, Möbel, Lichtscheine, Symbole", async () => {
    const z = await p.evaluate(() => {
      const r = window.test.ansicht.karte.shadowRoot;
      return { svg: r.querySelectorAll("svg").length, wand: r.querySelectorAll("line, path, polyline").length, glows: r.querySelectorAll("circle.fp-glow").length, icons: [...r.querySelectorAll("ha-icon")].filter((i) => i.shadowRoot.querySelector("path")).length, kreise: [...r.querySelectorAll("ha-icon")].filter((i) => i.shadowRoot.querySelector("circle")).length };
    });
    assert.ok(z.svg > 0 && z.wand > 20, JSON.stringify(z));
    assert.ok(z.glows >= 3, `Lichtscheine: ${z.glows}`);
    assert.ok(z.icons >= 1, "kein Symbol mit Pfad");
    assert.ok(z.kreise >= 1, "kein neutraler Kreis für unbekannte Symbole");
    const moebel = await p.evaluate(() => window.test.plan.plan.ef.floors[0].furniture.length);
    assert.equal(moebel, 10);
  });
  fs.mkdirSync(path.dirname(SCREENSHOT), { recursive: true });
  await p.screenshot({ path: SCREENSHOT });

  await test("kein Netzwerk außer den drei lokalen Dateien, keine Konsolenfehler", async () => {
    const fremd = p.anfragen.filter((u) => !u.startsWith(`http://localhost:${port}/`) || !["/", "/floorplan-core.js", "/sample_plan.json", "/favicon.ico"].includes(new URL(u).pathname));
    assert.deepEqual(fremd, []);
    assert.deepEqual(p.fehler.filter((f) => !/favicon|404/.test(f)), []);
  });

  await test("ha-card/ha-icon: Kern registriert sie, wenn sie fehlen", async () => {
    const r = await p.evaluate(() => ({ card: !!customElements.get("ha-card"), icon: !!customElements.get("ha-icon") }));
    assert.deepEqual(r, { card: true, icon: true });
  });

  await test("Änderung einer Leuchte aktualisiert genau diese Leuchte", async () => {
    const r = await p.evaluate(async () => {
      const t = window.test, root = t.ansicht.karte.shadowRoot;
      const snap = () => [...root.querySelectorAll("circle.fp-glow")].map((c) => c.getAttribute("fill") + "|" + root.getElementById(c.getAttribute("fill").slice(5, -1))?.querySelector("stop")?.getAttribute("stop-opacity"));
      const vor = snap(), ids = t.lichter;
      const an = ids.filter((id) => t.adapter.zustand(id).state === "on")[0];
      t.setze(an, { state: "on", attributes: { brightness: 30, rgb_color: [255, 190, 110] } });
      await t.ansicht.karte.updateComplete; await new Promise((r) => setTimeout(r, 450));
      const nach = snap();
      return { vor, nach, n: vor.filter((v, i) => v !== nach[i]).length };
    });
    assert.equal(r.n, 1, `geänderte Lichtscheine: ${r.n}`);
  });

  await test("Lichtschalter-Klick ruft adapter.aktion(toggle) auf, Fremddienste werden ignoriert", async () => {
    const r = await p.evaluate(async () => {
      const t = window.test, hass = t.ansicht.karte.hass;
      await hass.callService("homeassistant", "toggle", { entity_id: t.lichter[0] });
      await hass.callService("light", "turn_off", { entity_id: t.lichter[1] });
      await hass.callService("notify", "send_message", { entity_id: "notify.x" });
      await hass.callService("light", "set_brightness", { entity_id: t.lichter[0] });
      return t.aktionen;
    });
    assert.equal(r.length, 2);
    assert.equal(r[0][1], "toggle"); assert.equal(r[1][1], "aus");
  });

  await test("Optionen: schein=aus entfernt alle Lichtscheine", async () => {
    await p.evaluate(() => window.test.starte({ schein: "aus" })); await warte(p, 300);
    assert.equal(await glows(p), 0);
  });
  await test("Optionen: schein=einfach nimmt den Mischmodus, voll behält ihn", async () => {
    const modus = async (o) => { await p.evaluate((o) => window.test.starte(o), o); await warte(p, 300); return p.evaluate(() => getComputedStyle(window.test.ansicht.karte.shadowRoot.querySelector("circle.fp-glow")).mixBlendMode); };
    assert.equal(await modus({ schein: "einfach" }), "normal");
    assert.equal(await modus({ schein: "voll" }), "screen");
    assert.equal(await modus(undefined), "screen");
  });
  await test("Optionen: wandverdeckung=aus entfernt die clipPath-Verdeckung", async () => {
    const clips = async (o) => { await p.evaluate((o) => window.test.starte(o), o); await warte(p, 300); return p.evaluate(() => window.test.ansicht.karte.shadowRoot.querySelectorAll("clipPath[id$='-clip']").length); };
    assert.ok((await clips(undefined)) > 0, "Standard sollte Verdeckung haben");
    assert.equal(await clips({ wandverdeckung: false }), 0);
  });
  await test("Optionen: setzeOptionen wirkt ohne Neuaufbau", async () => {
    await p.evaluate(() => window.test.starte()); await warte(p, 300);
    await p.evaluate(() => window.test.ansicht.setzeOptionen({ schein: "aus" })); await warte(p, 200);
    assert.equal(await glows(p), 0);
  });

  await test("buendeln_ms: mehrere Änderungen = ein Zeichenvorgang", async () => {
    const lauf = async (ms) => p.evaluate(async (ms) => {
      const t = window.test; await t.starte({ buendeln_ms: ms }); await new Promise((r) => setTimeout(r, 300));
      const an = t.lichter.filter((id) => t.adapter.zustand(id).state === "on");
      t.zaehler = 0;
      t.setze(an[0], { state: "on", attributes: { brightness: 20 + ms } });
      await new Promise((r) => setTimeout(r, 25));
      t.setze(an[1], { state: "on", attributes: { brightness: 40 + ms } });
      await new Promise((r) => setTimeout(r, 250));
      return t.zaehler;
    }, ms);
    assert.equal(await lauf(0), 2, "ohne Bündeln zwei Zeichenvorgänge");
    assert.equal(await lauf(120), 1, "mit Bündeln ein Zeichenvorgang");
  });
  await p.context().close();

  await test("vorhandene ha-card/ha-icon werden nicht überschrieben", async () => {
    const q = await neueSeite(() => {
      class Fremd extends HTMLElement {}
      customElements.define("ha-card", class extends Fremd {}); customElements.define("ha-icon", class extends Fremd {});
      window.fremdCard = customElements.get("ha-card"); window.fremdIcon = customElements.get("ha-icon");
    });
    await q.evaluate(() => window.test.starte());
    const gleich = await q.evaluate(() => customElements.get("ha-card") === window.fremdCard && customElements.get("ha-icon") === window.fremdIcon);
    assert.ok(gleich); assert.deepEqual(q.fehler, []);
    await q.context().close();
  });

  await browser.close(); server.close();
  console.log(fehler ? `\n${fehler} Test(s) fehlgeschlagen` : "\nalle Kern-Tests grün");
  process.exit(fehler ? 1 : 0);
})();
