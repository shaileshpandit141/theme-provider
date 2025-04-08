import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: {
    file: "dist/themeProvider.min.js",
    format: "iife",
    name: "themeProvider",
  },
  plugins: [terser()],
};
