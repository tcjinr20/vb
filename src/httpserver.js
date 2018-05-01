console.log('create http server')


var http=require('http');
var path = require('path');
var config = require('./config')
var express = require('express');
var app = express();
var filePath = path.join(__dirname, '..', 'static')
app.use("/", express.static(filePath));
http.createServer(app).listen(config.LOCAL_HTTP_PORT, function() {
  console.log('启动服务器完成');
});