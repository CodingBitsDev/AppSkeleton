const paths = require('./paths.js')

console.log({ ...paths })
module.exports = function(api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo', "@babel/preset-flow"],
    plugins: [
      [
        'module-resolver',
        {
          extensions: [".ios.js", ".android.js", ".js", ".json", ".png"],
          alias: {...paths }
        }
      ]
    ],
  };
};
