/*var express = require('express');
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
app.post('/session/upload', UserController.authAction, SessionController.uploadAction);

app.post('/test', function(req, res) {
    var fs = require('fs');

    fs.writeFileSync('log.txt', req.headers.toString() + '\r\n\r\n' + req.body.toString(), encoding='utf8');
    console.log('here');

    res.send(200);
});

app.listen(3333);*/

var http = require('http');

http.createServer(function (req, res) {

    var fs = require('fs');
    console.log('here');

    var body = '';
    // we want to get the data as utf8 strings
    // If you don't set an encoding, then you'll get Buffer objects
    req.setEncoding('utf8');

    // Readable streams emit 'data' events once a listener is added
    req.on('data', function (chunk) {
        body += chunk;
    });

    // the end event tells you that you have entire body
    req.on('end', function () {
        fs.writeFileSync('log.txt', body, encoding='utf8');
        try {
            var data = JSON.parse(body);
        } catch (er) {
            // uh oh!  bad json!
            res.statusCode = 400;
            return res.end('error: ' + er.message);
        }
    });

    // write back something interesting to the user

    res.write(typeof data);
    res.end();

}).listen(3333, '127.0.0.1');