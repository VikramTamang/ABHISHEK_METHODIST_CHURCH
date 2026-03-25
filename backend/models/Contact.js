const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    mapLocation: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
