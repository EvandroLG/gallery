const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/Index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'static/bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devtool: 'inline-source-map',

  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
