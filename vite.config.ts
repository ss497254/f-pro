import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import makeManifest from "./utils/plugins/make-manifest";
import customDynamicImport from "./utils/plugins/custom-dynamic-import";
import addHmr from "./utils/plugins/add-hmr";
import watchRebuild from "./utils/plugins/watch-rebuild";
import manifest from "./manifest";

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, "src");
const appDir = resolve(srcDir, "app");
const outDir = resolve(rootDir, "dist");
const publicDir = resolve(rootDir, "public");

const isDev = process.env.__DEV__ === "true";
const isProduction = !isDev;

// ENABLE HMR IN BACKGROUND SCRIPT
const enableHmrInBackgroundScript = true;

export default defineConfig({
  resolve: {
    alias: {
      "@root": rootDir,
      "@src": srcDir,
      "@app": appDir,
    },
  },
  plugins: [
    react(),
    makeManifest(manifest, {
      isDev,
    }),
    customDynamicImport(),
    addHmr({ background: enableHmrInBackgroundScript, view: true }),
    watchRebuild(),
  ],
  publicDir,
  build: {
    outDir,
    /** Can slowDown build speed. */
    // sourcemap: isDev,
    minify: isProduction,
    reportCompressedSize: isProduction,
    rollupOptions: {
      input: {
        "content-script": resolve(srcDir, "content", "index.ts"),
        "service-worker": resolve(srcDir, "service-worker.ts"),
        popup: resolve(srcDir, "popup", "index.html"),
      },
      output: {
        entryFileNames: "src/[name].js",
        esModule: false,
        exports: "none",
        chunkFileNames: "assets/js/[hash].js",
        assetFileNames: () => {
          return `assets/[ext]/[hash].[ext]`;
        },
      },
    },
  },
});

