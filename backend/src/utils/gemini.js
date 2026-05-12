const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const apiKey = process.env.VITE_GEMINI_API_KEY;

console.log("KEY START:", apiKey?.slice(0,10));
console.log("KEY END:", apiKey?.slice(-6));
console.log("KEY LENGTH:", apiKey?.length);

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash"
});

const analyzeProductImage = async (imagePath) => {
  try {
    console.log("🤖 Sending image to Gemini...");

    const imageData = fs.readFileSync(imagePath).toString('base64');

    const image = {
      inlineData: {
        data: imageData,
        mimeType: 'image/jpeg'
      }
    };

               const prompt = `You are a caring and expert business mentor for small women entrepreneurs in India.

Carefully analyze the product in the image and return **ONLY valid JSON** (no extra text, no markdown).

Use this exact structure:

{
  "productName": "Clear product name in English",
  "category": "Food / Pickles / Home Decor / Fashion etc",
  "estimatedCost": 120,
  "suggestedPrice": 299,
  "marketAvgPrice": 250,
  "demandScore": 85,
  "demandDescription": "Current market demand in India",
  "whyThisPrice": "Why this price makes good profit",
  "socialCaption": "One beautiful ready-to-post Instagram caption in Hinglish with emojis",
  "socialMediaTips": "2-3 practical tips on how and when to post on Instagram and WhatsApp",
  "packagingMaterial": "Best packaging suggestion",
  "packagingCost": "₹20-35",
  "packagingTip": "Helpful packaging advice for small sellers",
  "businessTip": "One strong actionable business growth tip",
  "sellingStrategy": "Simple strategy - how much to make, where to sell, and pricing tips",
  "greenSuggestion": "One eco-friendly or hygienic suggestion"
}

Be very practical, encouraging and detailed for Indian women running small businesses.`;

    const result = await model.generateContent([prompt, image]);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response
    let jsonStr = text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) jsonStr = jsonMatch[0];

    const parsed = JSON.parse(jsonStr);
    console.log("✅ Gemini analysis successful");
    return parsed;

  } catch (error) {
    console.error("❌ Gemini Error:", error.message);
    throw new Error("Failed to analyze image with Gemini");
  }
};

module.exports = { analyzeProductImage };