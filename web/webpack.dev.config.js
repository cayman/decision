'use strict';

let webpack = require('webpack');

let base = require('./webpack.config');

module.exports = {
  context: base.context,
  entry: base.entry,
  output: base.output,
  module: base.module,
  plugins: base.plugins,
  resolve: base.resolve,
  devServer: base.devServer,
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};
