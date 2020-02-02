const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const localServer = require('./server/index');

const env = process.env.NODE_ENV || 'development';
const definePlugin = new webpack.DefinePlugin({
  __DEV__: env !== 'production',
});

const plugins = [
  definePlugin,
  new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    inject: true,
    script: {
      // BEACON: `<script src="${autoconfig.BEACON_URL}"></script>`,
      // SENTRY: `<script src="${autoconfig.SENTRY}"></script>`,
    },
  }),
];

/**************************************************************************************************************************
 **
 */
module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: [path.resolve(__dirname, 'src/main.js')],
  },
  devtool: 'source-map',
  output: {
    pathinfo: false,
    path: path.resolve(__dirname, './bin'),
    filename: 'js/bundle.js',
  },
  watch: env !== 'production',
  optimization: {
    // minimize: true,
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js|ts$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },
  devServer: {
    hot: false,
    host: '0.0.0.0',
    disableHostCheck: true,
    contentBase: './bin/',
    before: function(app) {
      localServer(app);
    },
  },
  resolve: {
    extensions: ['.js', '.ts'],
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    alias: {},
  },
};
