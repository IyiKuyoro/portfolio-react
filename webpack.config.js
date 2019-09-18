const path = require('path');
const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [],
  },
  devServer: {
    contentBase: path.join(__dirname, './src/static/'),
    port: 4200,
    historyApiFallback: true,
  },
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
});
