const paths = require('./paths.js')

module.exports = function(api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: [".ios.js", ".android.js", ".js", ".json",],
          alias: {...paths }
        }
      ]
    ],
  };
};
