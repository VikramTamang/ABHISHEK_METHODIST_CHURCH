const mongoose = require('mongoose');

const testimonySchema = new mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Testimony', testimonySchema);
