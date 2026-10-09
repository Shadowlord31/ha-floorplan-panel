import { defineConfig } from "vitest/config";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: () => "floorplan-panel.js",
    },
    // Ausgabe direkt in die Integration, damit HACS die fertige Datei mitliefert
    outDir: "../custom_components/floorplan_panel/frontend",
    emptyOutDir: true,
    minify: "esbuild",
    target: "es2021",
  },
  test: {
    include: ["src/**/*.test.ts"],
  },
});
