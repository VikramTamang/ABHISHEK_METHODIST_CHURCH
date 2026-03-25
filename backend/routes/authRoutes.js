const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// @route   POST api/auth/login
// @desc    Authenticate admin & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Enforce single email rule
        if (email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ message: 'Access Denied. Unauthorized Email.' });
        }

        let admin = await Admin.findOne({ email });

        // Auto-seed admin if database is empty but email matches env variable
        if (!admin) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
            admin = new Admin({ email: process.env.ADMIN_EMAIL, password: hashedPassword });
            await admin.save();
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const payload = { admin: { id: admin.id, email: admin.email } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) throw err;
            res.json({ token, email: admin.email });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
