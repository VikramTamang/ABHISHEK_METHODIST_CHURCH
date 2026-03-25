const express = require('express');
const router = express.Router();
const Home = require('../models/Home');
const auth = require('../middleware/auth');

// @route   GET api/content/home
// @desc    Get home content
// @access  Public
router.get('/', async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) {
            home = await Home.create({}); // create default if not exists
        }
        res.json(home);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/content/home
// @desc    Update home content
// @access  Private
router.put('/', auth, async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) {
            home = new Home(req.body);
            await home.save();
            return res.json(home);
        }
        
        home = await Home.findOneAndUpdate({}, req.body, { new: true });
        res.json(home);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
