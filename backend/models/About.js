const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    description: { type: String, default: '' },
    mission: { type: String, default: '' },
    vision: { type: String, default: '' },
    members: [{
        name: { type: String },
        role: { type: String },
        photoUrl: { type: String }
    }]
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
