const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const paths = require('./paths.js')

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  // If you want to add a new alias to the config.
    config.resolve.alias = {...config.resolve.alias, ...paths}

  return config;
};

