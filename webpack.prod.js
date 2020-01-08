const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const common = require('./webpack.common.js');
const runtimeCaching = require('./webpackRuntimeCachingConfig');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.styles\.s(c|a)ss$/,
        exclude: [
          /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        ],
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching,
      exclude: [/\.css$/, /\.js$/],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      test: /\.js(\?.*)?$/i,
    })],
  },
});
