/**
 * @author: gyzerok@gmail.com
 * Date: 3/22/14
 * Time: 3:38 PM
 */

var UserController = require('./controllers/UserController');
var SessionController = require('./controllers/SessionController');

module.exports = function(app) {

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
}