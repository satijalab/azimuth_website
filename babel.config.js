
module.exports = function (api) {
  api.cache(true);
  const presets = [
    ["@babel/preset-react"]
    ]
  const plugins = [
    "@babel/plugin-syntax-jsx",
    ["transform-inline-environment-variables", {
      "include": [
        "NODE_ENV"
      ]
    }]
  ];
  return {
    presets,
    plugins
  };
}
