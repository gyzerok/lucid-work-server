/**
 * @author: gyzerok@gmail.com
 * Date: 3/22/14
 * Time: 3:38 PM
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var express = require('express');
var app = express();

app.use(express.bodyParser());

// Setting up routes
require('./routes')(app);

module.exports = app;

