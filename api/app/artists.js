const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');

const config = require('../config');
const Artist = require('../models/Artist');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

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

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const {name, info} = req.body;

    const artistData = {
        name,
        info: info || null,
        image: null,
    };

    if (req.file) {
        artistData.image = 'uploads/' + req.file.filename;
    }

   try {
        const artist = new Artist(artistData);
        await artist.save();
        res.send(artist);
   } catch (e) {
       res.status(400).send(e);
   }
});

router.post('/:id/publish', [auth, permit('admin')], async (req, res) => {
    try {
        await Artist.findByIdAndUpdate({_id: req.params.id}, {$set: {published: true}});
        res.send({message: 'success'});
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.delete('/', [auth, permit('admin')], async (req, res) => {
    const {artist} = req.body;

    try {
        await Artist.findByIdAndRemove(artist);
        res.send({message: 'success'});
    } catch (e) {
        res.status(403).send(e);
    }
});

module.exports = router;