'use strict';

var config = require('../package').config || {};
var express = require('express');

var app = express();
var port = process.env.PORT || config.port;

require('babel/register')({ignore: /\.css$/});
require('./configure')(app);
require('./routes')(app);

app.listen(port, function () {
  console.log('listening %s', port);
});
