module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "react-native/react-native": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": 11,
    "sourceType": "module",
  },
  "plugins": [
    "react",
    "react-native",
  ],
  "rules": {
    "no-unused-vars" : 0,
    "react/display-name": 0,
    "react-native/no-unused-styles": 1,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 0,
    "react-native/no-color-literals": 2,
    "react-native/no-raw-text": 2,
    "react-native/no-single-element-style-arrays": 2,
  }
};
