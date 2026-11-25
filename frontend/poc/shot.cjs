const { chromium } = require("playwright-core");
(async () => {
  const b = await chromium.launch({executablePath:"/home/claude/.cache/ms-playwright/chromium_headless_shell-1193/chrome-linux/headless_shell",args:["--no-sandbox","--disable-gpu","--disable-crash-reporter","--no-crashpad"]}); const out = process.argv[2];
  for (const [name, qs] of [["klein", ""], ["last40", "?lights=34"]]) {
    const p = await b.newPage({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 1 });
    const errs = []; p.on("pageerror", e => errs.push(e.message)); p.on("console", m => m.type()==="error" && errs.push(m.text()));
    await p.goto("http://localhost:8765/" + qs); await p.waitForTimeout(1500);
    const m = await p.evaluate(() => window.messen(20));
    const glows = await p.evaluate(() => { const c = document.querySelector("fp-ef-card"); return c.shadowRoot.querySelectorAll("circle.fp-glow").length; });
    console.log(name, JSON.stringify(m), "glows:", glows, "errors:", JSON.stringify(errs.slice(0,3)));
    await p.screenshot({ path: `${out}/spike-${name}.png` });
  }
  await b.close();
})();
