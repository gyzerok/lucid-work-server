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

app.get('/session/start', UserController.authAction, SessionController.startAction);
app.get('/session/pause', UserController.authAction, SessionController.pauseAction);
app.get('/session/unpause', UserController.authAction, SessionController.unpauseAction);
app.get('/session/close', UserController.authAction, SessionController.closeAction);
app.get('/session/all', UserController.authAction, SessionController.getAllAction);
app.get('/session/images/:id', UserController.authAction, SessionController.getImageAction);
//app.post('/session/upload', UserController.authAction, SessionController.uploadAction);
app.post('/session/upload', function(req, res) {

    console.log("here");
    var tempPath = req.files.file.path;

    res.contentType('image/jpg');
    res.send(fs.readFileSync(tempPath));
});

app.listen(3333);