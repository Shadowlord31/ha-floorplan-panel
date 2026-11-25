import { defineConfig } from "vite";
export default defineConfig({ root: "poc", base: "./", build: { outDir: "dist", emptyOutDir: true, target: "es2021", minify: "esbuild" } });
