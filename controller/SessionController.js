var fs = require('fs');
var path = require('path');
var error = require('../error');
var Session = require('../model/Session');

module.exports = {

    startAction: function(req, res) {

        var timestamp = req.query.time;

        if (!timestamp)
        {
            res.send(400, error.WRONG_ARGUMENT);

            return;
        }

        Session.start(timestamp, function(err) {

            if (err)
            {
                console.log(err);
                res.send(500);
            }
            else
                res.send(error.SUCCESS);
        });
    },

    pauseAction: function(res, req) {

        var timestamp = req.query.time;

        if (!timestamp)
        {
            res.send(error.WRONG_ARGUMENT);

            return;
        }

        var user = req.currentUser;
        user.getCurrentSession(function(err, session) {

            session.pause(timestamp, function(err) {

                if (err)
                {
                    console.log(err);
                    res.send(500);
                }
                else
                    res.send(error.SUCCESS);
            });
        });
    },

    unpauseAction: function(res, req) {

        var timestamp = req.query.time;

        if (!timestamp)
        {
            res.send(400, error.WRONG_ARGUMENT);

            return;
        }

        var user = req.currentUser;
        user.getCurrentSession(function(err, session) {

            session.unpause(timestamp, function(err) {

                if (err)
                {
                    console.log(err);
                    res.send(500);
                }
                else
                    res.send(error.SUCCESS);
            });
        });
    },

    closeAction: function(req, res) {

        var timestamp = req.query.time;

        if (!timestamp)
        {
            res.send(400, error.WRONG_ARGUMENT);

            return;
        }

        var user = req.currentUser;
        user.getCurrentSession(function(err, session) {

            session.close(timestamp, function(err) {

                if (err)
                {
                    console.log(err);
                    res.send(500);
                }
                else
                    res.send(error.SUCCESS);
            });
        });
    },

    getAllAction: function(req, res) {

        var username = req.query.username;
        var session = req.query.session_id;

        if (username && session) {

            User.findOne({username: username}, function(err, user) {

                if (user) {

                    user.getSessions(function(err, sessions) {

                        if (err) {

                            console.log(err);
                            res.send(500);
                        }
                        else {
                            res.send(sessions);
                        }
                    });
                }
                else
                    res.send(404, error.USER_NOT_FOUND);
            });
        }
        else
            req.send(400, error.WRONG_ARGUMENT);
    },

    uploadAction: function(req, res) {

        var tempPath = req.files.file.path;

        if (path.extname(req.files.file.name).toLowerCase() === 'jpg') {

            req.currentUser.getCurrentSession(function (err, session) {

                if (err) res.send(500);
                else {
                    session.addImage(fs.readFileSync(tempPath), 'image/jpg', function(err, image) {

                        if (image) {

                            fs.unlink(tempPath);

                            res.send(error.SUCCESS);
                        }
                        else res.send(500, error.IMAGE_UPLOAD_FAILED);
                    });
                }
            });
        }
    }
}