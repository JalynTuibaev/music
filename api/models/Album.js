const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    },
    release: {
        type: String,
        required: true,
    },
    image: String,
    published: {
        type: Boolean,
        required: true,
        default: false,
    }
});


AlbumSchema.plugin(idValidator, {message: 'Bad ID for value {PATH}'});
const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;