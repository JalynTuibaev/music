const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');

const config = require('../config');
const Album = require('../models/Album');
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
    const query = {};

    if (req.query.artist) {
        query.artist = req.query.artist;
    }

    try {
        const albums = await Album.find(query).sort([['release', -1]]).populate('artist', 'name');
        res.send(albums);
    } catch {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const albums = await Album.findById({_id: req.params.id}).populate('artist', 'name info image');

        if (!albums) {
            res.status(404).send({error: 'Album not found'});
        }

        res.send(albums);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const {name, artist, release} = req.body;

    const albumData = {
        name,
        artist,
        release,
        image: null,
    };

    if (req.file) {
        albumData.image = 'uploads/' + req.file.filename;
    }

    try {
        const album = new Album(albumData);
        await album.save();
        res.send(album);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/:id/publish', [auth, permit('admin')], async (req, res) => {
    try {
        await Album.findByIdAndUpdate({_id: req.params.id}, {$set: {published: true}});
        res.send({message: 'success'});
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.delete('/', [auth, permit('admin')], async (req, res) => {
    const {album} = req.body;

    try {
        await Album.findByIdAndRemove(album);
        res.send({message: 'success'});
    } catch (e) {
        res.status(403).send(e);
    }
});

module.exports = router;