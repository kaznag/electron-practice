const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.config.common');

const outputPath = path.resolve(common.rootPath, 'dist/dev');

const main = merge(common.main, {
  mode: 'development',
  output: {
    path: outputPath,
  },
  devtool: 'inline-source-map',
});

const renderer = merge(common.renderer, {
  mode: 'development',
  output: {
    path: outputPath,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  devtool: 'inline-source-map',
});

module.exports = [
  main,
  renderer,
];
