const merge = require('webpack-merge');
const path = require('path');
const JavaScriptObfuscator = require('webpack-obfuscator');
const common = require('./webpack.config.common');

const main = merge(common.main, {
  mode: 'production',
  output: {
    path: path.resolve(common.rootPath, 'dist/prod')
  },
  plugins: [
    new JavaScriptObfuscator({
      rotateUnicodeArray: true
    }),
  ]
});

const renderer = merge(common.renderer, {
  mode: 'production',
  output: {
    path: path.resolve(common.rootPath, 'dist/prod')
  },
  plugins: [
    new JavaScriptObfuscator({
      rotateUnicodeArray: true
    }),
  ]
});

module.exports = [
  main,
  renderer,
];
