const express = require('express');
const router = express.Router();
const History = require('../models/History');
const auth = require('../middleware/auth');

// @route   GET api/content/history
// @desc    Get all histories
// @access  Public
router.get('/', async (req, res) => {
    try {
        const histories = await History.find().sort({ year: 1 });
        res.json(histories);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   POST api/content/history
// @desc    Add new history event
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const newHistory = new History(req.body);
        const history = await newHistory.save();
        res.json(history);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/content/history/:id
// @desc    Update history event
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const history = await History.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!history) return res.status(404).json({ message: 'History event not found' });
        res.json(history);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/content/history/:id
// @desc    Delete history event
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const history = await History.findByIdAndDelete(req.params.id);
        if (!history) return res.status(404).json({ message: 'History event not found' });
        res.json({ message: 'History event removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
