const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.config.common');

const main = merge(common.main, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(common.rootPath, 'dist/dev')
  },
});

module.exports = [
  main,
];
