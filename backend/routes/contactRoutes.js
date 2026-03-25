const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// @route   GET api/content/contact
// @desc    Get contact content
// @access  Public
router.get('/', async (req, res) => {
    try {
        let contact = await Contact.findOne();
        if (!contact) {
            contact = await Contact.create({});
        }
        res.json(contact);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/content/contact
// @desc    Update contact content
// @access  Private
router.put('/', auth, async (req, res) => {
    try {
        let contact = await Contact.findOne();
        if (!contact) {
            contact = new Contact(req.body);
            await contact.save();
            return res.json(contact);
        }
        
        contact = await Contact.findOneAndUpdate({}, req.body, { new: true });
        res.json(contact);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
