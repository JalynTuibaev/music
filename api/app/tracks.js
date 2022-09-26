const express = require('express');
const Track = require('../models/Track');

const router = express.Router();

router.get('/', async (req, res) => {
    const query = {};

    if (req.query.album) {
        query.album = req.query.album;
    }

    try {
        const tracks = await Track.find(query).sort([['number', -1]]).populate('album', 'name artist');
        res.send(tracks);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    const {name, album, duration} = req.body;

    if (!name || !album) {
        return res.status(400).send({error: 'Data not valid!'});
    }

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
        res.status(400).send({error: e.errors});
    }
});

module.exports = router;