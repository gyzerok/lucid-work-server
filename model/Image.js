var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var imageSchema = Schema({
    session_id: Schema.Types.ObjectId,
    //binary: Schema.Types.Buffer,
    timestamp: Schema.Types.Date
});

module.exports = mongoose.model('Image', imageSchema);
