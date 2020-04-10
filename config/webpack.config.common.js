const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const rootPath = path.resolve(__dirname, './../');
const srcPath = path.resolve(rootPath, 'src');

const main = {
  entry: path.resolve(srcPath, 'main/main.ts'),
  output: {
    filename: 'main.js',
  },
  module: {
    rules: [{
      test: /\.ts$/,
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
      { from: path.resolve(srcPath, 'package.json') }
    ])
  ],
  target: 'electron-main',
  externals: [
    nodeExternals(),
  ],
  node: {
    __filename: false,
    __dirname: false,
  },
};

const renderer = {
  entry: path.resolve(srcPath, 'renderer/main.ts'),
  output: {
    filename: 'renderer.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [
          srcPath,
        ],
        exclude: [
          path.resolve(rootPath, 'node_modules'),
        ],
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootPath, './src/renderer/index.html'),
      filename: 'index.html',
    })
  ],
  target: 'electron-renderer',
  externals: [
    nodeExternals(),
  ],
  node: {
    __dirname: false,
    __filename: false
  },
};

module.exports = {
  main: main,
  renderer: renderer,
  rootPath: rootPath,
};
