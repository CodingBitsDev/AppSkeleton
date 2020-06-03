const path = require('path')

const paths = {
  src: path.resolve(__dirname, './src'),
  theme: path.resolve(__dirname, './src/constants/theming/'),
  reuse: path.resolve(__dirname, './src/reuse/'),
  assets: path.resolve(__dirname, './assets/'),
  hooks: path.resolve(__dirname, './src/hooks/'),
  actions: path.resolve(__dirname, './src/actions/'),
  reducers: path.resolve(__dirname, './src/reducers/'),
  utils: path.resolve(__dirname, './utils/'),
}

module.exports = paths;
