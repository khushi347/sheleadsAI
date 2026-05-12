const express = require('express');
const multer = require('multer');
const path = require('path');
const { analyzeProductImage } = require('../utils/gemini');

const router = express.Router();

// Multer setup (same as before)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    if (filetypes.test(file.mimetype) && filetypes.test(path.extname(file.originalname).toLowerCase())) {
      return cb(null, true);
    }
    cb(new Error('Only images (jpg, jpeg, png, webp) are allowed!'));
  }
});

router.post('/scan', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    // Analyze image with Gemini
    const aiResponse = await analyzeProductImage(req.file.path);

    res.json({
      success: true,
      message: "Product analyzed successfully!",
      filename: req.file.filename,
      aiResult: aiResponse
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;