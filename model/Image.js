var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var imageSchema = Schema({
    session_id: Schema.Types.ObjectId,
    data: Buffer,
    contentType: String
});

module.exports = mongoose.model('Image', imageSchema);
