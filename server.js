'use strict';
var express = require('express');
var session = require('cookie-session');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var path = require('path');
var http = require('http');
var Q = require('q');
var httpProxy = require('http-proxy');
var config = require('./config');
var targetHost = process.env.PROXY_HOST || config.DEFAULT_TARGET_PROXY_HOST;
var publicDir = config.DEFAULT_PUBLIC_PATH;
var proxy = httpProxy.createProxyServer();
var app = express();

app.disable('x-powered-by');
app.use(cookieParser());
app.use(session({secret: require('crypto').randomBytes(20).toString('base64')}));
app.use(express.static(publicDir, {'redirect': false}));

app.get('/', function (req, res) {
    res.sendfile(path.join(publicDir, 'index.html'));
});

app.all(config.API_BASE_PATH + "*", function(req, res) {
    req.headers.host = targetHost;
    req.headers.origin = 'http://' + targetHost;
    proxy.web(req, res, {target: req.headers.origin + '/'});
});

app.listen(3000, '0.0.0.0', function () {
    console.log("server started at http://127.0.0.1:3000");
});
