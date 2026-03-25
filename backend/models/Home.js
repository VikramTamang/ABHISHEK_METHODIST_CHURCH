const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    heroTitle: { type: String, default: 'Welcome to Abhisek Methodist Church' },
    heroSubtitle: { type: String, default: 'A place of worship, fellowship, and grace.' },
    pastorMessageTitle: { type: String, default: 'Welcome Message from our Pastor' },
    pastorMessageBody: { type: String, default: '' },
    fellowshipInfo: { type: String, default: '' },
    announcements: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Home', homeSchema);
