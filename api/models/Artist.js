const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
   name: {
       type: String,
       required: true,
       unique: true,
   },
   info: String,
   image: String,
    published: {
       type: Boolean,
       required: true,
       default: false,
    }
});

ArtistSchema.plugin(uniqueValidator, {message: 'Error,  {PATH} to be unique'});
const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;

