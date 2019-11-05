const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: ['@babel/polyfill', './src/index.jsx'],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      Atoms: path.resolve(__dirname, 'src/components/atoms'),
      Components: path.resolve(__dirname, 'src/components'),
      Compounds: path.resolve(__dirname, 'src/components/compounds'),
      Images: path.resolve(__dirname, 'src/static/index.html'),
      Pages: path.resolve(__dirname, 'src/pages'),
      Actions: path.resolve(__dirname, 'src/store/actions'),
      HOC: path.resolve(__dirname, 'src/HOC'),
      Services: path.resolve(__dirname, 'src/services'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Portfolio App',
      template: './src/static/index.html',
    }),
    new CompressionPlugin(),
    new Dotenv(),
  ],
};
