import { defineConfig } from "tsup";
import { copyFileSync } from "fs";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "zustand"],
  banner: {
    js: '"use client";',
  },
  onSuccess: async () => {
    copyFileSync("src/styles/styles.css", "dist/styles.css");
    console.log("✅ Copied styles.css to dist/");
  },
});
