var error = require('../error');
var User = require('../model/User');

module.exports = {

    registerAction: function(req, res) {

        var username = req.query.username;
        var password = req.query.password;

        if (username && password)
        {
            User.create(username, password, function(err, user) {

                if (err)
                {
                    console.log(err);
                    res.send(500);
                }
                else
                    res.send({id: user._id, username: user.username});
            });
        }
        else
        {
            res.status(400).send(error.WRONG_ARGUMENT);
        }
    },

    loadUserAction: function (req, res, next) {

        var token = req.query.token;

        if (token) {

            User.findOne({token: {code: token}}, function(user) {

                if (user)
                {
                    req.currentUser = user;
                    next();
                }
                else
                    res.send(404, error.INCORRECT_TOKEN);
            });
        }
        else
            res.send(403);
    },

    loginAction: function(req, res) {

        var username = req.query.username;
        var password = req.query.password;

        if (username && password) {
            User.findOne({username: username, password: password}, function(user) {

                if (user) {

                    res.send({id: user._id, token: user.token});
                }
                else {
                    res.send(404, error.USER_NOT_FOUND);
                }
            })
        }
    }
}