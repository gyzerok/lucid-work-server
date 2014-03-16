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
app.get('/login', UserController.loginAction);

app.get('/session/start', UserController.loadUserAction, SessionController.startAction);
app.get('/session/pause', UserController.loadUserAction, SessionController.pauseAction);
app.get('/session/unpause', UserController.loadUserAction, SessionController.unpauseAction);
app.get('/session/close', UserController.loadUserAction, SessionController.closeAction);
app.post('/session/upload', UserController.loadUserAction, SessionController.uploadAction);
app.get('/session/all', UserController.loadUserAction, SessionController.getAllAction);

app.get('/session/image', SessionController.closeAction);

app.listen(3333);