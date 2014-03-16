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
                {
                    var ret = {id: user._id, username: user.username}

                    res.send(JSON.stringify(ret));
                }
            });
        }
        else
        {
            res.status(500).send(error.WRONG_ARGUMENT);
        }
    },

    loginAction: function(req, res) {

    }
}