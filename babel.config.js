import replace from 'rollup-plugin-replace';

module.exports = function (api) {
  api.cache(true);
  const presets = [
    ["@babel/preset-react"]
    ]
  const plugins = [
    "@babel/plugin-syntax-jsx",
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    })
  ];
  return {
    presets,
    plugins
  };
}
