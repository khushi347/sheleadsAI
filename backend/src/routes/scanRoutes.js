const express = require('express');
const multer = require('multer');
const path = require('path');
const { analyzeProductImage } = require('../utils/gemini');

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only .jpg, .jpeg, .png, .webp files allowed!'));
  }
});

// Scan Route
router.post('/scan', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image uploaded' });
    }

    console.log("📸 Image received:", req.file.filename);

    // Call Gemini
    const aiResponse = await analyzeProductImage(req.file.path);

    res.json({
      success: true,
      message: "Product analyzed successfully!",
      filename: req.file.filename,
      aiResult: aiResponse
    });

  } catch (error) {
    console.error("❌ Scan Error:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message || "Failed to analyze image" 
    });
  }
});

module.exports = router;