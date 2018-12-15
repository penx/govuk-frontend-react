const esModules = (process.env["BABEL_ENV"] === "es");

const presets = [
  "@babel/preset-env",
  "@babel/preset-flow",
  "@babel/preset-react"
];

const plugins =  [
  "@babel/plugin-proposal-object-rest-spread",
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-proposal-export-default-from",
  "@babel/plugin-transform-runtime",
  "babel-plugin-transform-react-remove-prop-types"
];

const ignore = [".spec.js", ".test.js", "-test.js", "/__tests__/"];

if (!esModules) {
  presets[0] = ["@babel/preset-env", {
    "loose": true,
    "modules": "commonjs"
  }];
  plugins.push("add-module-exports")
} else {
  presets[0] = ["@babel/preset-env", {
    "loose": true,
    "modules": false
  }];
}

module.exports = {
  presets,
  plugins,
  ignore
}
