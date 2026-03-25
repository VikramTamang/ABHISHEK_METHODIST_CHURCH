const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// ── CORS: open to all origins — safe because auth uses JWT tokens ─────────
app.use(cors({ origin: '*' }));
app.use(express.json());

// ── Serve uploaded media ──────────────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Serve the full website from the self-contained public/ folder ────────────
// All HTML, CSS, JS and images are copied into backend/public/ for deployment.
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/churchDB';
if (!process.env.MONGO_URI) console.warn('⚠️  MONGO_URI not set — using local fallback');
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => {
    console.error('MongoDB Connection Error:');
    console.error(err);
  });

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ message: 'Abhisek Methodist Church API is running smoothly' });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/seed', require('./routes/seedRoutes'));
app.use('/api/content/home', require('./routes/homeRoutes'));
app.use('/api/content/about', require('./routes/aboutRoutes'));
app.use('/api/content/contact', require('./routes/contactRoutes'));
app.use('/api/content/history', require('./routes/historyRoutes'));
app.use('/api/content/branch', require('./routes/branchRoutes'));
app.use('/api/content/testimony', require('./routes/testimonyRoutes'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
