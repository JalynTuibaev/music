const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');

const config = require('../config');
const Album = require('../models/Album');

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
    const query = {};

    if (req.query.artist) {
        query.artist = req.query.artist;
    }

    try {
        const albums = await Album.find(query);
        res.send(albums);
    } catch {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const albums = await Album.findById({_id: req.params.id}).populate('artist', 'name info image');

        if (!albums) {
            res.status(404).send({error: 'Album not found'});
        }

        res.send(albums);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const {name, artist, release} = req.body;

    if (!name || !artist || !release) {
        return res.status(400).send({error: 'Data not valid!'});
    }

    const albumData = {
        name,
        artist,
        release,
        image: null,
    };

    if (req.file) {
        albumData.image = req.file.filename;
    }

    try {
        const album = new Album(albumData);
        await album.save();
        res.send(album);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

module.exports = router;