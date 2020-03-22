const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const dist = path.resolve(__dirname, 'dist');

module.exports = {
  entry: './src/Index.tsx',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  output: {
    filename: 'static/bundle.js',
    path: dist,
  },

  plugins: [
    new CopyPlugin([{ from: 'src/sw.js', to: `${dist}/static/sw.js` }]),
  ],
};
