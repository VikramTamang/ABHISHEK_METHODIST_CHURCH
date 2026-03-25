const express = require('express');
const router = express.Router();
const Testimony = require('../models/Testimony');
const auth = require('../middleware/auth');

// @route   GET api/content/testimony
// @desc    Get all testimonies
// @access  Public
router.get('/', async (req, res) => {
    try {
        const testimonies = await Testimony.find().sort({ date: -1 });
        res.json(testimonies);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   POST api/content/testimony
// @desc    Add new testimony
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const newTestimony = new Testimony(req.body);
        const testimony = await newTestimony.save();
        res.json(testimony);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/content/testimony/:id
// @desc    Update a testimony
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const testimony = await Testimony.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!testimony) return res.status(404).json({ message: 'Testimony not found' });
        res.json(testimony);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/content/testimony/:id
// @desc    Delete a testimony
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const testimony = await Testimony.findByIdAndDelete(req.params.id);
        if (!testimony) return res.status(404).json({ message: 'Testimony not found' });
        res.json({ message: 'Testimony removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
