import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true, // generate .d.ts files
  bundle: true,
  splitting: false,
  clean: true,
  sourcemap: true,
  external: [
    "@solidjs/router",
    "@solidjs/start",
    "@solidjs/start/server",
    "@solidjs/start/middleware",
    "vinxi",
    "vinxi/http",
  ],
});
