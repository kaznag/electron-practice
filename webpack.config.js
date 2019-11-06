const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

var main = {
  mode: 'development',
  target: 'electron-main',
  entry: path.join(__dirname, 'src', 'main', 'main'),
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [{
      test: /.ts?$/,
      include: [
        path.resolve(__dirname, 'src'),
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules'),
      ],
      loader: 'ts-loader',
    }]
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/*.html', to: '[name].[ext]' },
      { from: './src/package.json' }
    ])
  ]
};

module.exports = [
  main,
];
