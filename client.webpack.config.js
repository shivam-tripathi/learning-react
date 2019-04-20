const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '/src/client/client.tsx'),
  output: {
    path: path.join(__dirname, '/static/client/js/bundles'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
