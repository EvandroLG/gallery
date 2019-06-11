const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/Index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
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
    new webpack.ProgressPlugin()
  ]
};
