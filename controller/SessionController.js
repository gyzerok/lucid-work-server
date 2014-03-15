var error = require('../error');
var Session = require('../model/Session');

module.exports = {

    checkArguments: function(req, res, next) {

        var timestamp = req.query.time;

        if (!timestamp)
        {
            res.send(error.WRONG_ARGUMENT);

            next();
        }

        return timestamp;
    },

    startAction: function(req, res, next) {

        var timestamp = this.checkArguments(req, res, next);

        Session.start(timestamp, function(err) {

            if (err)
            {
                res.send(500);
                console.log(err);
            }
            else
                res.send(error.SUCCESS);
        });
    },

    pauseAction: function(res, req, next) {

        var timestamp = this.checkArguments(req, res, next);


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
    },

    unpauseAction: function(res, req, next) {

        var timestamp = this.checkArguments(req, res, next);

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
    },

    closeAction: function(req, res, next) {

        var timestamp = this.checkArguments(req, res, next);

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

}