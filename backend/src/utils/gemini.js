const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash" 
});

const analyzeProductImage = async (imagePath) => {
  try {
    const image = {
      inlineData: {
        data: require('fs').readFileSync(imagePath).toString('base64'),
        mimeType: 'image/jpeg' // Will work for jpg, png, webp
      }
    };

    const prompt = `You are an expert business mentor for small women-led businesses in India.

Analyze this product image and return a JSON object with the following fields:

{
  "productName": "Clear name of the product in English and Hindi",
  "suggestedPrice": "Suggested selling price in INR (realistic for Indian market)",
  "packagingTips": "2-3 practical packaging suggestions suitable for small sellers",
  "instagramCaption": "Engaging Instagram caption in Hindi + English mix (ready to post)",
  "greenSuggestion": "One eco-friendly or sustainable tip for this product"
}

Be practical, encouraging, and suitable for small-scale women entrepreneurs in India.`;

    const result = await model.generateContent([prompt, image]);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? jsonMatch[0] : text;
    
    return JSON.parse(jsonStr);

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to analyze image");
  }
};

module.exports = { analyzeProductImage };