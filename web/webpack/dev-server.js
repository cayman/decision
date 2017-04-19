'use strict';
const restHost = process.env.REST_HOST || /*'localhost'*/ 'dev1.parksolutions.ru'; //'89.249.23.207';
const restPort = process.env.REST_PORT || '8081';

module.exports = {
  contentBase: './src',
  port: 80,
  host:'0.0.0.0',
  inline: true,
  historyApiFallback: true,
  stats: 'errors-only',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 500
  },
  proxy: {
    "/rest": 'http://' + restHost + ':' + restPort
  }
};
