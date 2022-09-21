const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');

const config = require('../config');
const Artist = require('../models/Artist');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});


router.get('/', async (req, res) => {
    try {
        const artists = await Artist.find();
        res.send(artists);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const {name, info, image} = req.body;

    if (!name) {
        return res.status(400).send({error: 'Name is Required!'});
    }

    const artistData = {
        name,
        info: info || null,
        image: image,
    };

    if (req.file) {
        artistData.image = req.file.filename;
    }

   try {
        const artist = new Artist(artistData);
        await artist.save();
        res.send(artist);
   } catch (e) {
        res.status(400).send({error: e.errors});
   }
});

module.exports = router;