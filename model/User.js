var mongoose = require('mongoose');
var crypto = require('crypto');
var async = require('async');
var error = require('../error');
var Session = require('./Session');

function generateToken() {

    var tokenTime = 1000 * 60 * 60 * 24;

    var sha = crypto.createHash('sha512');
    sha.update(Date.now() + '' + Math.random());

    var code = sha.digest('hex');
    var expiresIn = new Date(Date.now() + tokenTime);

    return {code: code, expiresIn: expiresIn};
}

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    token: {
        code: String,
        expiresIn: Date
    },
    regitered_at: Date
});

userSchema.methods.addSession = function(timestamp, callback) {

    var session = new Session({startTime: timastamp});
    session.save(function(err, session) {
        callback(err, session);
    });
}

userSchema.methods.updateToken = function() {

    this.token = generateToken();
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

    Session.findOne({user_id: this._id}).sort({_id: -1}).exec(function(err, session) {

        callback(err, session);
    });
}

userSchema.statics.create = function(username, password, callback) {

    var User = mongoose.model('User', userSchema);

    this.findOne({username: username}, function(err, user) {

        if (!user) {

            var newUser = new User({
                username: username,
                password: password,
                token: generateToken(),
                regitered_at: Date.now()
            });

            newUser.save(function(err, user){
                callback(err, user);
            });
        }
        else
            callback(error.USER_EXISTS, user);
    });
}

module.exports = mongoose.model('User', userSchema);