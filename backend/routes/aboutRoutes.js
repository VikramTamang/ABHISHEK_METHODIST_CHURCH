const express = require('express');
const router = express.Router();
const About = require('../models/About');
const auth = require('../middleware/auth');

// @route   GET api/content/about
// @desc    Get about content
// @access  Public
router.get('/', async (req, res) => {
    try {
        let about = await About.findOne();
        if (!about) {
            about = await About.create({});
        }
        res.json(about);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/content/about
// @desc    Update about content
// @access  Private
router.put('/', auth, async (req, res) => {
    try {
        let about = await About.findOne();
        if (!about) {
            about = new About(req.body);
            await about.save();
            return res.json(about);
        }
        
        about = await About.findOneAndUpdate({}, req.body, { new: true });
        res.json(about);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
