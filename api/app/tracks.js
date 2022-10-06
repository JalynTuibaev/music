const express = require('express');
const Track = require('../models/Track');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const TrackHistory = require("../models/TrackHistory");

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

router.post('/', auth, async (req, res) => {
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

router.post('/:id/publish', [auth, permit('admin')], async (req, res) => {
    try {
        await Track.findByIdAndUpdate({_id: req.params.id}, {$set: {published: true}});
        res.send({message: 'success'});
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.delete('/', [auth, permit('admin')], async (req, res) => {
    const {track} = req.body;

    try {
        await Track.findByIdAndRemove(track);
        await TrackHistory.deleteMany({track: track});
        res.send({message: 'success'});
    } catch (e) {
        res.status(403).send(e);
    }
});

module.exports = router;