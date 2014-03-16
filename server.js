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

app.get('/start_session', UserController.loadUserAction, SessionController.startAction);
app.get('/pause_session', UserController.loadUserAction, SessionController.pauseAction);
app.get('/unpause_session', UserController.loadUserAction, SessionController.unpauseAction);
app.get('/close_session', UserController.loadUserAction, SessionController.closeAction);
//app.get('/add_image', SessionController.closeAction);

app.listen(3333);