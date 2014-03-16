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
        user.updateCurrentSession(function(err, session) {

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
        user.updateCurrentSession(function(err, session) {

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
        user.updateCurrentSession(function(err, session) {

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
    }

}