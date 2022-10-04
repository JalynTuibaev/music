const express = require('express');
const User = require('../models/User');
const TrackHistory = require('../models/TrackHistory');
const Track = require("../models/Track");

const router = express.Router();

router.get('/', async (req, res) => {
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).send({error: 'No token present!'});
    }

    const user = await User.findOne({token});

    if (!user) {
        return res.status(401).send({error: 'Wrong token!'});
    }

    try {
        const history = await TrackHistory.find({user: user._id}).sort([['datetime', -1]]).populate({
            path: 'track',
            select: 'name album',
            populate: {
                path: 'album',
                select: 'artist',
                model: 'Album',
                populate: {
                    path: 'artist',
                    select: 'name',
                    model: 'Artist'
                }
            }
        });

        res.send(history);
    } catch (e) {
        return res.status(500);
    }
});

router.post('/', async (req, res) => {
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).send({error: 'No token present!'});
    }

    const user = await User.findOne({token});

    if (!user) {
        return res.status(401).send({error: 'Wrong token!'});
    }

    const track = await Track.findOne({_id: req.body.track});

    if (!track) {
        return res.status(404).send({error: 'Track not found!'});
    }


    const TrackHistoryData = {
        user: user.id,
        track: req.body.track,
        datetime: new Date().toISOString(),
    };


    try {
        const trackHistory = new TrackHistory(TrackHistoryData);

        await trackHistory.save();
        res.send(trackHistory);
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;