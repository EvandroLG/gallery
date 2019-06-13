const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './public/Index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  devtool: 'inline-source-map',

  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    })
  ]
};
