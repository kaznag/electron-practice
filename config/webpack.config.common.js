const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const rootPath = path.resolve(__dirname, './../');
const srcPath = path.resolve(rootPath, 'src');

const main = {
  entry: path.resolve(srcPath, 'main/main'),
  output: {
    filename: 'main.js',
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
  target: 'electron-main',
  externals: [
    nodeExternals(),
  ],
  node: {
    __filename: false,
    __dirname: false,
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
