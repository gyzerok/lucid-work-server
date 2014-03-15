var mongoose = require('mongoose');
//var Image = require('./Image');

var sessionSchema = mongoose.Schema({
    startTime: Date,
    endTime: Date,
    pauses: [{
        startTime: Date,
        endTime: Date
    }]
});

sessionSchema.methods.pause = function(timestamp, callback) {

    this.pauses.push({startTime: timestamp});
}

sessionSchema.methods.unpause = function(timestamp, callback) {
    var pause = this.pauses.pop();

    pause.endTime = timestamp;
    pause.save(function(err, pause) {
        callback(err, pause);
    });
}

sessionSchema.methods.close = function(timestamp, callback) {
    this.endTime = timestamp;

    this.save(function(err, session) {
        callback(err, session);
    });
}

sessionSchema.methods.addImage = function(binary, timestamp, callback) {

    var image = new Image({session_id: this._id, binary: binary, timestamp: timestamp});
    image.save(function(err, image) {
        callback(err, image);
    });
}

sessionSchema.statics.start = function(timestamp, callback) {

    var Session = mongoose.model('Session', sessionSchema);

    var session = new Session({startTime: timestamp});
    session.save(function(err, session) {
        callback(err, session);
    });
}

sessionSchema.statics.updateCurrent = function(callback) {

    var Session = mongoose.model('Session', sessionSchema);

    Session.findOne({}, function(err, session) {
        callback(err, session);
    });
}

module.exports = mongoose.model('Session', sessionSchema);

