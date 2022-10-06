const express = require('express');
const Track = require('../models/Track');

const router = express.Router();

router.get('/', async (req, res) => {
    const query = {};

    if (req.query.album) {
        query.album = req.query.album;
    }

    try {
        const tracks = await Track.find(query).sort([['number', 1]]).populate({
            path: 'album',
            select: 'name artist',
            populate: {
                path: 'artist',
                select: 'name',
                model: 'Artist'
            }
        });
        res.send(tracks);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    const {name, album, duration} = req.body;

    const trackData = {
        name,
        album,
        duration: duration || null,
    };

    try {
        const track = new Track(trackData);
        await track.save();
        res.send(track);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;