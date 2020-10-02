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
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(srcPath, 'package.json') }
      ],
    }),
  ],
  target: 'electron-main',
  externals: [
    nodeExternals(),
  ],
  node: {
    __filename: true,
    __dirname: true,
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
  target: 'web',
  externals: [
    nodeExternals(),
  ],
  node: {
    __dirname: true,
    __filename: true,
  },
};

const preload = {
  entry: path.resolve(srcPath, 'preload/preload.ts'),
  output: {
    filename: 'preload.js',
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
  target: 'electron-preload',
  node: {
    __filename: true,
    __dirname: true,
  },
};

module.exports = {
  main: main,
  renderer: renderer,
  preload: preload,
  rootPath: rootPath,
};
