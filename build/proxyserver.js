var {PLAY_SERVER_PORT} = require("../config/myConfig");
const proxyTable = require("../config/proxyTable");
var express = require('express');
var proxy = require('http-proxy-middleware');
var path = require("path");

var app = express();
app.use(express.static(path.join(__dirname, "../dist")));

let urls = Object.keys(proxyTable);
console.log("proxyTable",proxyTable)
urls.forEach(key=>{
  app.use(key,proxy(proxyTable[key]));
});
app.listen(PLAY_SERVER_PORT);
console.log("本地测试服务器已经启动: http://localhost:" + PLAY_SERVER_PORT);
