var mongoose = require('mongoose');
var Image = require('./Image');

var Schema = mongoose.Schema;

var sessionSchema = Schema({
    user_id: Schema.Types.ObjectId,
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

sessionSchema.methods.addImage = function(data, contentType, callback) {

    var image = new Image({
        session_id: this._id,
        data: data,
        contentType: contentType
    });

    image.save(function(err) {

        callback(err);
    });
}

module.exports = mongoose.model('Session', sessionSchema);

