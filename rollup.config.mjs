import { defineConfig } from "rollup";

const config = defineConfig({
  input: "src/index.ts",
  output: { file: "dist/index.js", format: "cjs" },
});

export default config;
