var fs = require('fs');
var path = require('path');
var errors = require('../errors');
var Session = require('../models/Session');
var Image = require('../models/Image');

module.exports = {

    startAction: function(req, res) {

        var timestamp = req.query.time;

        if (!timestamp)
        {
            res.send(400, errors.WRONG_ARGUMENT);

            return;
        }

        var user = req.currentUser;
        user.addSession(timestamp, function(err) {

            if (err)
            {
                console.log(err);
                res.send(500);
            }
            else
                res.send(errors.SUCCESS);
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
                    res.send(errors.SUCCESS);
            });
        });
    },

    unpauseAction: function(res, req) {

        var timestamp = req.query.time;

        if (!timestamp)
        {
            res.send(400, errors.WRONG_ARGUMENT);

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
                    res.send(errors.SUCCESS);
            });
        });
    },

    closeAction: function(req, res) {

        var timestamp = req.query.time;

        if (!timestamp)
        {
            res.send(400, errors.WRONG_ARGUMENT);

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
                    res.send(errors.SUCCESS);
            });
        });
    },

    getAllAction: function(req, res) {

        var username = req.query.username;

        if (!username)
        {
            req.send(400, errors.WRONG_ARGUMENT);
            return;
        }

        User.findOne({username: username}, function(err, user) {

            if (user) {

                user.getSessions(function(err, sessions) {

                    if (err)
                    {
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
    },

    uploadAction: function(req, res) {

        var tempPath = req.files.file.path;

        var ext = path.extname(req.files.file.name).toLowerCase()
        if (ext == '.jpg' || ext == '.bmp') {

            req.currentUser.getCurrentSession(function (err, session) {

                if (err)
                {
                    console.log(err);
                    res.send(500);
                }
                else
                {
                    session.addImage(fs.readFileSync(tempPath), 'image/' + ext.substring(1), function(err) {

                        if (err)
                        {
                            res.send(500, error.IMAGE_UPLOAD_FAILED);
                        }
                        else
                        {
                            fs.unlink(tempPath);

                            res.send(errors.SUCCESS);
                        }
                    });
                }
            });
        }
        else
            res.send(500, errors.IMAGE_UPLOAD_FAILED);
    },

    getImageAction: function(req, res) {

        var image_id = req.params.id;

        if (image_id)
        {
            Image.findById(image_id, function(err, image) {

                if (err)
                {
                    console.log(err);
                    res.send(500);
                }
                else
                {
                    if (image)
                    {
                        res.contentType(image.contentType);
                        res.send(image.data);
                    }
                    else
                        res.send(404);
                }
            });
        }
        else
            res.send(400, errors.WRONG_ARGUMENT);
    }
}