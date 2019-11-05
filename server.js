// 手写 webpack-dev-server
const express = require('express');
const webpack = require('webpack');
// 中间件
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
// 在node中可以使用webpack
const complier = webpack(config);

const app = express();

app.use(webpackDevMiddleware(complier,{
    publicPath:config.output.publicPath
}))

app.listen(3000,()=>{
    console.log(123456)
})