const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const nodeEnv = process.env.NODE_ENV;
// const isProduction = nodeEnv === 'production';
let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv || 'dev'),
    },
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
];

const entry = path.join(__dirname, '/src/server/server.ts');

module.exports = {
  mode: 'development',
  devtool: false,
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?100'],
    }),
  ],
  name: 'server',
  plugins: plugins,
  target: 'node',
  entry: entry,
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: 'server.prod.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.ts'],
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        loader: 'ts-loader',
      },
    ],
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
};
