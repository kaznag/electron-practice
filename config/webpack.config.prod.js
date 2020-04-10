const merge = require('webpack-merge');
const path = require('path');
const JavaScriptObfuscator = require('webpack-obfuscator');
const common = require('./webpack.config.common');

const outputPath = path.resolve(common.rootPath, 'dist/prod');

const main = merge(common.main, {
  mode: 'production',
  output: {
    path: outputPath,
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
    path: outputPath,
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
