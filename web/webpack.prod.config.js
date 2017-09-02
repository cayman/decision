'use strict';
let webpack = require('webpack');

let base = require('./webpack.config');

module.exports = {
  context: base.context,
  entry: base.entry,
  output: base.output,
  module: base.module,
  plugins: base.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]),
  resolve: base.resolve,
  devServer:  base.devServer,
  performance: {
    hints: false
  },
  devtool: '#source-map'
};
