require('dotenv').config();

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const scanRoutes = require('./src/routes/scanRoutes');
const mentorRoutes = require('./src/routes/mentorRoutes');

dotenv.config({ path: '.env' });
console.log("🔑 Environment Variables Loaded:");
console.log("GEMINI_API_KEY exists:", !!process.env.VITE_GEMINI_API_KEY);
console.log("Key length:", process.env.VITE_GEMINI_API_KEY?.length || 0);
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', scanRoutes);

app.use('/api/mentor', mentorRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: "✅ SheaLeads AI Backend is running!",
    status: "active"
  });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
  }
};

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();