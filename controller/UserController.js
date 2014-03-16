var error = require('../error');
var User = require('../model/User');

module.exports = {

    registerAction: function(req, res) {

        var email = req.query.email;
        var password = req.query.password;

        if (email && password)
        {
            User.create(email, password, function(err, user) {

                if (err)
                {
                    res.send(400, err);
                }
                else
                    res.send({_id: user._id, email: user.email});
            });
        }
        else
        {
            res.status(400).send(error.WRONG_ARGUMENT);
        }
    },

    authAction: function (req, res, next) {

        var token = req.query.token;

        if (token) {

            User.findOne({'token.code': token}, function(err, user) {

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

        var email = req.query.email;
        var password = req.query.password;

        if (email && password)
        {
            User.findOne({email: email, password: password}, function(err, user) {

                if (user)
                {
                    res.send({
                        _id: user._id,
                        token: {
                            code: user.token.code,
                            expires_in: user.token.expiresIn.getTime()
                        }
                    });
                }
                else
                    res.send(404, error.USER_NOT_FOUND);
            })
        }
    }
}