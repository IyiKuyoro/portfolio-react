const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
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
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/static/index.html',
    }),
    new CompressionPlugin(),
  ],
};
