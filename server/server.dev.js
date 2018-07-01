
const webpack = require('webpack');
const express = require('express');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../webpack.config');
const compiler = webpack(config);

const app = express();
const port = 1022;

app.use(webpackDevMiddleware(compiler,{
  index: 'index.html',
  contentBase: path.resolve(__dirname, '..', 'dist'),
  noInfo: true,
  hot: true,
  inline: true,
  publicPath: path.resolve(__dirname, '..', 'dist'),
}));

app.use(webpackHotMiddleware(compiler));

app.listen(port,(err) => {
  if(err) {
    console.log(err);
  }
  console.log("server is listening at port " + port);
})