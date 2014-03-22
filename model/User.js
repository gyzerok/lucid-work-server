var mongoose = require('mongoose');
var crypto = require('crypto');
var async = require('async');
var error = require('../error');
var Session = require('./Session');

function generateToken() {

    var tokenTime = 1000 * 60 * 60 * 24;

    var sha = crypto.createHash('sha512');
    sha.update(Date.now() + '' + Math.random());

    var code = sha.digest('hex').substring(0, 15);
    var expiresIn = new Date(Date.now() + tokenTime);

    return {code: code, expiresIn: expiresIn};
}

var userSchema = mongoose.Schema({
    email: String,
    password: String,
    token: {
        code: String,
        expiresIn: Date
    },
    regitered_at: Date
});

userSchema.methods.addSession = function(timestamp, callback) {

    var session = new Session({startTime: timestamp, user_id: this._id});

    session.save(callback);
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

userSchema.methods.getCurrentSession = function(callback) {

    Session.findOne({user_id: this._id}).sort({_id: -1}).exec(callback);
}

userSchema.methods.getSessions = function(callback) {

    Session.find({user_id: this._id}, '_id, startTime, endTime', callback);
}

userSchema.statics.create = function(email, password, callback) {

    var User = mongoose.model('User', userSchema);

    this.findOne({email: email}, function(err, user) {

        if (!user) {

            var newUser = new User({
                email: email,
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