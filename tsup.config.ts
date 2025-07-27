import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  splitting: false,
  clean: true,
  external: [
    "@solidjs/router",
    "@solidjs/start",
    "@solidjs/start/server",
    "@solidjs/start/middleware",
    "vinxi/http",
  ],
});
