const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();

const marriageRoutes = require('./routes/marriageRoutes');
const authRoutes = require('./routes/auth');
const autoPublish = require('./utils/autoPublish');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/marriages', marriageRoutes);
app.use('/api/auth', authRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Customary Marriage Registration API');
});

// Schedule the autoPublish function to run every day at midnight (server time)
cron.schedule('0 0 * * *', () => {
  console.log('Running daily auto-publish check...');
  autoPublish();
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    autoPublish();  // Run auto-publish once when server starts

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });