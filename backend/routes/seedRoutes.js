const express = require('express');
const router = express.Router();
const Home = require('../models/Home');
const About = require('../models/About');
const Contact = require('../models/Contact');
const History = require('../models/History');
const Branch = require('../models/Branch');
const Testimony = require('../models/Testimony');

// POST /api/seed        — seeds only missing records
// POST /api/seed?force=true  — wipes and re-seeds everything
router.post('/', async (req, res) => {
    const force = req.query.force === 'true';
    try {
        const results = [];

        // ── HOME ──────────────────────────────────────────────────────────
        if (force) await Home.deleteMany({});
        if (force || !(await Home.findOne())) {
            await Home.create({
                heroTitle: 'Abhisek Methodist Church',
                heroSubtitle: 'A place of faith, hope, and boundless love. Come as you are, and be transformed by God\'s grace.',
                pastorMessageTitle: 'Welcome to Our Family in Christ',
                pastorMessageBody: 'Dear beloved friends and visitors, you are warmly welcomed to Abhisek Methodist Church — a community built on love, rooted in Scripture, and committed to making disciples of Christ. Whether you are searching for meaning, seeking community, or deepening your faith, you have found a home here.\n\nWe believe that every person has a unique purpose, and we are here to walk alongside you on your journey. Come, worship with us every Saturday and experience the transforming power of God\'s presence.',
                fellowshipInfo: 'We come together every Saturday for worship, prayer, the Word, and meaningful fellowship. All are welcome — come experience the warmth of our church family.'
            });
            results.push('✅ Home content seeded');
        } else { results.push('ℹ️ Home already exists — skipped'); }

        // ── ABOUT ─────────────────────────────────────────────────────────
        if (force) await About.deleteMany({});
        if (force || !(await About.findOne())) {
            await About.create({
                description: 'Abhisek Methodist Church is a vibrant, welcoming community of believers rooted in the Methodist tradition, committed to sharing the love of Christ with all people.',
                mission: 'To love God, grow together in faith, serve our community, and make disciples who transform the world through the power of the Holy Spirit.',
                vision: 'To be a vibrant, Christ-centered community that impacts every sphere of life — family, society, and nation — with the Gospel of Jesus Christ.'
            });
            results.push('✅ About content seeded');
        } else { results.push('ℹ️ About already exists — skipped'); }

        // ── CONTACT ───────────────────────────────────────────────────────
        if (force) await Contact.deleteMany({});
        if (force || !(await Contact.findOne())) {
            await Contact.create({
                address: 'Abhisek Methodist Church, Central District Road, City, State — 100001',
                phone: '+91 98765 43210',
                email: 'info@abhisekmethodist.org',
                mapLocation: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.465!2d85.3142!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19!2sKathmandu!5e0!3m2!1sen!2snp!4v1673000000000!5m2!1sen!2snp'
            });
            results.push('✅ Contact content seeded');
        } else { results.push('ℹ️ Contact already exists — skipped'); }

        // ── HISTORY ───────────────────────────────────────────────────────
        if (force) await History.deleteMany({});
        if (force || (await History.countDocuments()) === 0) {
            await History.insertMany([
                { year: '2001', title: 'A Seed Planted in Prayer', description: 'It began not with grand plans, but with a handful of faithful hearts. In 2001, twelve believers gathered for the first time in a humble room — no stage, no microphone, only a wooden cross and a tattered Bible. They prayed, wept, and believed. The vision was simple: to build a community where every person could encounter the living God.' },
                { year: '2005', title: 'The First House of God', description: 'Four years of faithful tithing, sacrifice, and prayer — and God was faithful. In 2005, Abhisek Methodist Church dedicated its first permanent building. Membership swelled to over 100 believers, each one a living stone in the house God was building.' },
                { year: '2008', title: 'Going Beyond the Four Walls', description: 'In 2008, Abhisek Methodist launched its first large-scale community outreach programs — food drives, free medical camps, and educational sponsorships for underprivileged children. Hundreds of families felt the tangible love of God through the hands of church volunteers.' },
                { year: '2012', title: 'The First Branch is Born', description: 'In 2012, the first branch of Abhisek Methodist Church was opened in a neighbouring community. On opening day, the branch was already packed. People who had never been to church before walked through those doors, many moved to tears by the warmth and worship they encountered.' },
                { year: '2024', title: "A Quarter Century of God's Faithfulness", description: 'Twenty-five years. In 2024, Abhisek Methodist Church celebrated its Silver Anniversary — surrounded by over 500 members, 8 established branches, and a legacy that will outlast all of us. The celebration was filled with tears of joy, testimonies of healing, and a renewed commitment to carry the Gospel further.' },
            ]);
            results.push('✅ History milestones seeded (5)');
        } else { results.push('ℹ️ History already exists — skipped'); }

        // ── BRANCHES ──────────────────────────────────────────────────────
        if (force) await Branch.deleteMany({});
        if (force || (await Branch.countDocuments()) === 0) {
            await Branch.insertMany([
                { name: 'Abhisek Methodist Church — Main', location: 'Central District, City', details: 'Every Saturday, 10:00 AM | +91-98765-43210' },
                { name: 'Abhisek Methodist — North Campus', location: 'North District, City', details: 'Every Saturday, 9:30 AM | +91-98765-43211' },
                { name: 'Abhisek Methodist — South Campus', location: 'South District, City', details: 'Every Saturday, 10:00 AM | +91-98765-43212' },
                { name: 'Abhisek Methodist — East Campus', location: 'East District, City', details: 'Every Saturday, 10:30 AM | +91-98765-43213' },
                { name: 'Abhisek Methodist — West Campus', location: 'West District, City', details: 'Every Saturday, 9:00 AM | +91-98765-43214' },
                { name: 'Abhisek Methodist — Rural Ministry', location: 'Rural District, Outskirts', details: 'Every Saturday, 8:30 AM | +91-98765-43215' },
            ]);
            results.push('✅ Branches seeded (6)');
        } else { results.push('ℹ️ Branches already exist — skipped'); }

        // ── TESTIMONIES ───────────────────────────────────────────────────
        if (force) await Testimony.deleteMany({});
        if (force || (await Testimony.countDocuments()) === 0) {
            await Testimony.insertMany([
                { name: 'Mary Johnson', message: 'Joining Abhisek Methodist Church changed my life completely. I had lost all hope, but through the prayers and love of this community, God restored my family, my health, and my faith. I am forever grateful.' },
                { name: 'Rajesh Kumar', message: 'I came to this church broken and searching. The Saturday fellowship became my anchor. Through the Word and the worship, I found my purpose and calling. God is truly present in this place.' },
                { name: 'Priya Mehra', message: 'The youth ministry here gave me a foundation of faith that has carried me through university and life. The leaders poured into us with such love and wisdom. I am now leading my own small group!' },
                { name: 'Samuel Osei', message: 'When my business failed and I was in deep debt, the church community came alongside me. They prayed, supported, and encouraged me. Within a year, God opened new doors. This church is a true family.' },
                { name: 'Grace Lindokuhle', message: 'I was diagnosed with a serious illness, and the intercessory team prayed faithfully for months. The doctors were amazed at my recovery. I know it was God working through those prayers. My faith is stronger than ever.' },
            ]);
            results.push('✅ Testimonies seeded (5)');
        } else { results.push('ℹ️ Testimonies already exist — skipped'); }

        res.json({ success: true, results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Seed failed', error: err.message });
    }
});

module.exports = router;
