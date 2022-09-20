const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(401).send({error: 'Data not valid!'});
    }

    const userData = {
        username,
        password,
    };

    try {
        const user = new User(userData);
        user.generateToken();
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/sessions', async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username,});

    if (!user) {
        return res.status(401).send({error: 'Username not found!'});
    }

    const isMatch = await user.checkPassword(password);

    if (!isMatch) {
        return res.status(401).send({error: 'Password is wrong!'});
    }

    user.generateToken();

    await user.save();

    res.send({token: user.token});
});

module.exports = router;