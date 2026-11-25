import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";

const MAX_BYTES = 300 * 1024;
const OUT = resolve(__dirname, "../core-dist");

// Der Editor bleibt im HA-Panel: im Kern wird er durch einen leeren Baustein ersetzt.
const ohneEditor = (): Plugin => ({
  name: "kern-ohne-editor",
  enforce: "pre",
  resolveId(source, importer) {
    if (source === "./editor" && importer?.replace(/\\/g, "/").endsWith("/ef/floorplan-card.ts"))
      return resolve(__dirname, "src/core/editor-stub.ts");
    return null;
  },
});

const lizenzen = (): string => {
  const mit = readFileSync(resolve(__dirname, "../NOTICE.md"), "utf8").split("## MIT-Lizenztext (easy-floorplan)")[1]?.trim() ?? "";
  const lit = readFileSync(resolve(__dirname, "node_modules/lit/LICENSE"), "utf8").trim();
  return `floorplan-core.js – Drittanbieter-Lizenzen

== easy-floorplan (Quellcode-Port: Karte, Renderer, Möbelsymbole) ==
Copyright (c) 2026 Nicolas Sandller, https://github.com/Vombato/easy-floorplan
Ursprung: Version 0.7.2, Commit e9178c9401a359410efcc7d88f9fee81615db149 (angepasst für fp-ef-card)

${mit}

== Lit (lit, @lit/reactive-element, lit-html) ==
${lit}

== Material Design Icons (@mdi/svg, Pfaddaten) ==
Die Pfad-Tabelle \`icons\` einer Plan-Exportdatei enthält SVG-Pfade von Material Design Icons
(Copyright Pictogrammers, Lizenz Apache-2.0, https://github.com/Templarian/MaterialDesign).
Sie stammen aus der Exportdatei, nicht aus dieser Datei; floorplan-core.js enthält keine Icon-Bibliothek.
`;
};

const grenzeUndPruefsumme = (): Plugin => ({
  name: "kern-grenze-und-pruefsumme",
  generateBundle(_o, bundle) {
    const dateien = Object.keys(bundle);
    if (dateien.length !== 1 || dateien[0] !== "floorplan-core.js")
      this.error(`Der Kern muss genau eine Datei sein, gefunden: ${dateien.join(", ")}`);
    const chunk = bundle["floorplan-core.js"];
    const bytes = chunk.type === "chunk" ? Buffer.byteLength(chunk.code) : 0;
    if (bytes > MAX_BYTES) this.error(`floorplan-core.js ist ${(bytes / 1024).toFixed(1)} KB, erlaubt sind ${MAX_BYTES / 1024} KB.`);
    this.info(`floorplan-core.js: ${(bytes / 1024).toFixed(1)} KB (Grenze ${MAX_BYTES / 1024} KB)`);
  },
  writeBundle() {
    const hash = createHash("sha256").update(readFileSync(resolve(OUT, "floorplan-core.js"))).digest("hex");
    writeFileSync(resolve(OUT, "floorplan-core.js.sha256"), `${hash}  floorplan-core.js\n`);
    writeFileSync(resolve(OUT, "LICENSES.txt"), lizenzen());
  },
});

export default defineConfig({
  plugins: [ohneEditor(), grenzeUndPruefsumme()],
  build: {
    lib: { entry: "src/core/index.ts", formats: ["es"], fileName: () => "floorplan-core.js" },
    outDir: OUT,
    emptyOutDir: true,
    minify: "esbuild",
    target: "es2021",
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
