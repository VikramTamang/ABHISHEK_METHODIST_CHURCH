const express = require('express');
const router = express.Router();
const Branch = require('../models/Branch');
const auth = require('../middleware/auth');

// @route   GET api/content/branch
// @desc    Get all branches
// @access  Public
router.get('/', async (req, res) => {
    try {
        const branches = await Branch.find();
        res.json(branches);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   POST api/content/branch
// @desc    Add new branch
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const newBranch = new Branch(req.body);
        const branch = await newBranch.save();
        res.json(branch);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/content/branch/:id
// @desc    Update a branch
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!branch) return res.status(404).json({ message: 'Branch not found' });
        res.json(branch);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/content/branch/:id
// @desc    Delete a branch
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const branch = await Branch.findByIdAndDelete(req.params.id);
        if (!branch) return res.status(404).json({ message: 'Branch not found' });
        res.json({ message: 'Branch removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
