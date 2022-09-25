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
        const history = await TrackHistory.find({user: user._id});
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


    const TrackHistoryData = {
        user: user.id,
        track: req.body.track,
        datetime: new Date().toISOString(),
    };


    try {
        await Track.findOne({_id: TrackHistoryData.track});
    } catch {
        return res.status(404).send({error: 'Track not found!'});
    }


    try {
        const trackHistory = new TrackHistory(TrackHistoryData);

        await trackHistory.save();
        res.send(trackHistory);
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;