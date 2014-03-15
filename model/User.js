var mongoose = require('mongoose');
var Session = require('./Session');

var userSchema = mongoose.Schema({
    username: String,
    password: String
});

userSchema.methods.addSession = function(timestamp, callback) {

    var session = new Session({startTime: timastamp});
    session.save(function(err, session) {
        callback(err, session);
    });
}

userSchema.statics.create = function(username, password, callback) {

    var User = mongoose.model('User', userSchema);

    this.find({username: username}, function(err, users) {
        if (users.length > 0)
        {
            //TODO Написать нормальный вывод ошибки
            callback('{error: "username or password is empty"}');
        }
        else
        {
            var user = new User({username: username, password: password});

            user.save(function(err, user){
                callback(err, user);
            });
        }
    });
}

module.exports = mongoose.model('User', userSchema);