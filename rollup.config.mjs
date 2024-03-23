import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";
import { defineConfig } from "rollup";
import pkg from "./package.json" assert { type: "json" };

const config = defineConfig({
  input: "src/index.ts",
  output: [
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "esm" },
  ],
  plugins: [
    babel({ babelHelpers: "bundled", exclude: "node_modules/**" }),
    resolve(),
    commonjs({ include: /\/node_modules\// }),
    typescript({ tsconfig: "./tsconfig.json" }),
    terser({ output: { comments: false } }),
  ],
  external: Object.keys(pkg.peerDependencies),
});

export default config;
