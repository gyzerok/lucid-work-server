var mongoose = require('mongoose');
var crypto = require('crypto');
var async = require('async');
var error = require('error');
var Session = require('./Session');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    token: {
        code: String,
        expiresIn: Date
    }
});

userSchema.methods.addSession = function(timestamp, callback) {

    var session = new Session({startTime: timastamp});
    session.save(function(err, session) {
        callback(err, session);
    });
}

userSchema.methods.updateToken = function() {

    var tokenTime = 1000 * 60 * 60 * 24;

    var sha = crypto.createHash('sha512');
    sha.update(Date.now() + '' + Math.random());

    var code = sha.digest('hex');
    var expiresIn = Date.now();
    expiresIn += tokenTime;

    this.token = {code: code, expiresIn: expiresIn};
    this.save(function (err, user) {

        if (err) console.log(err);
    });
}

userSchema.methods.getToken = function(callback) {

    async.series([
        this.updateToken()
    ],

    function(err, result) {
        callback(this.token);
    });
}

userSchema.methods.updateCurrentSession = function(callback) {

    Session.findOne({user_id: this._id}, function(err, session) {

        callback(err, session);
    });
}

userSchema.statics.create = function(err, username, password, callback) {

    var User = mongoose.model('User', userSchema);

    this.findOne({username: username}, function(err, user) {

        if (!user)
        {
            newUser = new User({username: username, password: password});

            newUser.save(function(err, user){
                callback(err, user);
            });
        }
        else
            callback(error.USER_EXISTS);
    });
}

module.exports = mongoose.model('User', userSchema);