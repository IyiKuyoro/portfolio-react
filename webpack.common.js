/* eslint-disable comma-dangle */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
  entry: ['@babel/polyfill', './src/index.jsx'],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
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
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ['raw-loader']
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag'
            }
          },
          {
            loader: 'postcss-loader',
            options: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
              },
              minify: true
            })
          }
        ]
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
      IndexDB: path.resolve(__dirname, 'src/indexDB'),
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
