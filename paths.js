const path = require('path')

const paths = {
  src: path.resolve(__dirname, './src'),
  theme: path.resolve(__dirname, './src/constants/theming/'),
  reuse: path.resolve(__dirname, './src/reuse/')
}

module.exports = paths;
