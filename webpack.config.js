const path = require('path');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.styles\.s(c|a)ss$/,
        exclude: [
          /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        ],
        loader: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: [
          /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
          /\.styles.(s(a|c)ss)$/,
        ],
        loader: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, './src/static/'),
    port: 4200,
    historyApiFallback: true,
  },
  plugins: [],
});
