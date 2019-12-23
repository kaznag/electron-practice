const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rootPath = path.resolve(__dirname, './../');
const srcPath = path.resolve(rootPath, 'src');

var main = {
  target: 'electron-main',
  entry: path.resolve(srcPath, 'main/main'),
  output: {
    filename: 'main.js',
  },
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [{
      test: /.ts?$/,
      include: [
        srcPath,
      ],
      exclude: [
        path.resolve(rootPath, 'node_modules'),
      ],
      loader: 'ts-loader',
    }]
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.resolve(srcPath, '*.html'), to: '[name].[ext]' },
      { from: path.resolve(srcPath, 'package.json') }
    ])
  ]
};

module.exports = {
  main: main,
  rootPath: rootPath,
};
