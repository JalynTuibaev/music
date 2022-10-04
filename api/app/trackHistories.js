const express = require('express');
const TrackHistory = require('../models/TrackHistory');
const Track = require("../models/Track");
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const history = await TrackHistory.find({user: req.user._id}).sort([['datetime', -1]]).populate({
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

router.post('/', auth, async (req, res) => {
    const track = await Track.findOne({_id: req.body.track});

    if (!track) {
        return res.status(404).send({error: 'Track not found!'});
    }


    const TrackHistoryData = {
        user: req.user.id,
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