const express = require('express');
const User = require('../models/User');
const TrackHistory = require('../models/TrackHistory');

const router = express.Router();

router.post('/', async (req, res) => {
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).send({error: 'Unauthorized'});
    }

    const user = await User.findOne({token});

    if (!user) {
        return res.status(401).send({error: 'Token wrong!'});
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