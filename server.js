var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var UserController = require('./controller/UserController');
var SessionController = require('./controller/SessionController');

var app = express();

//app.use(express.session());
app.use(express.bodyParser());
app.use(app.router);

app.get('/', function(req, res){
    res.end("Hello!");
});

app.get('/register', UserController.registerAction);

app.get('/start_session', SessionController.startAction);
app.get('/pause_session', SessionController.pauseAction);
app.get('/unpause_session', SessionController.unpauseAction);
app.get('/close_session', SessionController.closeAction);
//app.get('/add_image', SessionController.closeAction);

app.listen(3333);