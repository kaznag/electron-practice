const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.config.common');

const main = merge(common.main, {
  mode: 'development',
  output: {
    path: path.resolve(common.rootPath, 'dist/dev')
  },
  devtool: 'inline-source-map',
});

const renderer = merge(common.renderer, {
  mode: 'development',
  output: {
    path: path.resolve(common.rootPath, 'dist/dev')
  },
  devtool: 'inline-source-map',
});

module.exports = [
  main,
  renderer,
];
