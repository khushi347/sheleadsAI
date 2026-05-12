const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.get('/daily-tip', async (req, res) => {
  try {
    const prompt = `Give a short, motivating business tip in simple Hinglish for small women entrepreneurs in India (max 2 sentences). 
    Make it practical and encouraging.`;

    const result = await model.generateContent(prompt);
    const tip = result.response.text();

    res.json({
      success: true,
      tip: tip,
      hindiTip: tip // We can improve later for pure Hindi
    });

  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to generate tip" });
  }
});

module.exports = router;