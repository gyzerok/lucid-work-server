var error = require('../error');
var Session = require('../model/Session');

module.exports = {

    startAction: function(req, res) {

        var timestamp = req.query.time;

        if (timestamp)
        {
            Session.start(timestamp, function(err) {

                if (err)
                {
                    res.send(500);
                    console.log(err);
                }
                else
                    res.send(error.SUCCESS);
            });
        }
        else
        {
            res.send(error.WRONG_ARGUMENT);
        }
    },

    pauseAction: function(res, req) {

        var timestamp = req.query.time;

        if (timestamp)
        {
            Session.updateCurrent(function(err, session) {

                session.pause(timestamp, function(err) {

                    if (err)
                    {
                        res.send(500);
                        console.log(err);
                    }
                    else
                        res.send(error.SUCCESS);
                });
            });
        }
        else
        {
            res.status(500).send(error.WRONG_ARGUMENT);
        }
    },

    unpauseAction: function(res, req) {

        var timestamp = req.query.time;

        if (timestamp)
        {
            Session.updateCurrent(function(err, session) {

                session.unpause(timestamp, function(err) {

                    if (err)
                    {
                        res.send(500);
                        console.log(err);
                    }
                    else
                        res.send(error.SUCCESS);
                });
            });
        }
        else
        {
            res.status(500).send(error.WRONG_ARGUMENT);
        }
    },

    closeAction: function(req, res) {

        var timestamp = req.query.time;

        if (timestamp)
        {
            Session.updateCurrent(function(err, session) {

                session.close(timestamp, function(err) {

                    if (err)
                    {
                        res.send(500);
                        console.log(err);
                    }
                    else
                        res.send(error.SUCCESS);
                });
            });
        }
        else
        {
            res.status(500).send(error.WRONG_ARGUMENT);
        }
    }

}