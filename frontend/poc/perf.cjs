const { chromium } = require("playwright-core");
(async () => {
  const b = await chromium.launch({ executablePath: process.env.H, args: ["--no-sandbox","--disable-gpu","--disable-crash-reporter"] });
  for (const rate of [1, 6]) for (const n of [6, 14, 34]) {
    const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
    const c = await p.context().newCDPSession(p);
    await p.goto(`http://localhost:8765/?lights=${n - 6 < 0 ? 0 : n - 6}`); await p.waitForTimeout(1200);
    await c.send("Emulation.setCPUThrottlingRate", { rate });
    const r = await p.evaluate(async () => {
      const card = document.querySelector("fp-ef-card"); const t = []; const f = [];
      for (let i = 0; i < 15; i++) {
        const t0 = performance.now();
        const s = {}; for (const [k, v] of Object.entries(card.hass.states)) s[k] = k.startsWith("light.") ? { ...v, state: "on", attributes: { ...v.attributes, brightness: 20 + (i * 53) % 230 } } : v;
        card.hass = { ...card.hass, states: s }; await card.updateComplete; t.push(performance.now() - t0);
        const f0 = performance.now(); await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); f.push(performance.now() - f0);
      }
      t.sort((a,b)=>a-b); f.sort((a,b)=>a-b); return { render_ms: +t[7].toFixed(1), bis_zum_frame_ms: +f[7].toFixed(0), glows: card.shadowRoot.querySelectorAll("circle.fp-glow").length };
    });
    console.log("cpu x" + rate, "lichter(glow)=" + r.glows, JSON.stringify(r)); await p.close();
  }
  await b.close();
})();
