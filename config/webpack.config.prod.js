const { merge } = require('webpack-merge');
const path = require('path');
const WebpackObfuscator = require('webpack-obfuscator');
const common = require('./webpack.config.common');

const outputPath = path.resolve(common.rootPath, 'dist/prod');

const main = merge(common.main, {
  mode: 'production',
  output: {
    path: outputPath,
  },
  plugins: [
    new WebpackObfuscator({
      rotateUnicodeArray: true
    }, []),
  ]
});

const renderer = merge(common.renderer, {
  mode: 'production',
  output: {
    path: outputPath,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ]
  },
  plugins: [
    new WebpackObfuscator({
      rotateUnicodeArray: true
    }, []),
  ]
});

const preload = merge(common.preload, {
  mode: 'production',
  output: {
    path: outputPath,
  },
  plugins: [
    new WebpackObfuscator({
      rotateUnicodeArray: true
    }, []),
  ]
});

module.exports = [
  main,
  renderer,
  preload,
];
