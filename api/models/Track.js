const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    },
    duration: String,
    published: {
        type: Boolean,
        required: true,
        default: false,
    }
});


TrackSchema.plugin(idValidator, {message: 'Bad ID for value {PATH}'});
TrackSchema.plugin(AutoIncrement, {inc_field: 'number'});
const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;