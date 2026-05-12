/**
 * aiService.js
 * Real AI layer using Google Gemini 1.5 Flash (vision-capable).
 * Falls back to intelligent mock data when no API key is present.
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

/**
 * Convert a File object to a base64 string (data-URL stripped).
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Remove the "data:image/xxx;base64," prefix
      const base64 = reader.result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Call Gemini with an image and a prompt.
 * Returns the text response.
 */
async function callGeminiVision(imageBase64, mimeType, prompt) {
  const body = {
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inline_data: {
              mime_type: mimeType,
              data: imageBase64,
            },
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
    },
  };

  const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.error?.message || "Gemini API error");
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

/**
 * Parse JSON safely from Gemini text output (which may have markdown fences).
 */
function parseJSON(text) {
  // Strip markdown code fences if present
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

/**
 * Analyze a product image using Gemini Vision.
 * Returns a structured result object.
 *
 * @param {File} imageFile
 * @returns {Promise<ProductAnalysis>}
 */
export async function analyzeProduct(imageFile) {
  const prompt = `You are an expert business advisor helping women micro-entrepreneurs in India price and market their homemade products.

Analyze this product image and respond ONLY with a valid JSON object (no markdown, no explanation) in exactly this format:
{
  "productName": "Short product name in English",
  "category": "Category (e.g. Handicraft, Food, Textile, Jewellery, Home Decor, etc.)",
  "estimatedCost": 120,
  "suggestedPrice": 450,
  "marketAvgPrice": 380,
  "demandScore": 78,
  "demandDescription": "One sentence about demand for this product in Indian local markets",
  "whyThisPrice": "Brief 2-sentence explanation of the pricing strategy",
  "socialCaption": "Engaging Instagram caption in English with emojis and 3-4 relevant hashtags like #VocalForLocal #HandmadeIndia",
  "packagingMaterial": "Eco-friendly packaging material suggestion",
  "packagingCost": "₹15–25",
  "packagingTip": "One practical eco-friendly packaging tip",
  "businessTip": "One short actionable business tip for this product type"
}

All prices must be in Indian Rupees (₹). demandScore must be between 0–100.`;

  if (!GEMINI_API_KEY) {
    // Intelligent mock when no API key configured
    return getMockAnalysis(imageFile.name);
  }

  const base64 = await fileToBase64(imageFile);
  const mimeType = imageFile.type || "image/jpeg";
  const text = await callGeminiVision(base64, mimeType, prompt);

  try {
    return parseJSON(text);
  } catch (e) {
    console.warn("JSON parse failed, using mock. Raw:", text);
    return getMockAnalysis(imageFile.name);
  }
}

/**
 * Get trending demand insights for a category.
 * @param {string} category
 * @returns {Promise<DemandInsight[]>}
 */
export async function getDemandInsights(category = "handicrafts") {
  if (!GEMINI_API_KEY) {
    return getMockDemandInsights(category);
  }

  const prompt = `You are a market analyst for Indian micro-business products.
Give trending demand insights for "${category}" products in Indian local and online markets.
Respond ONLY with a valid JSON array of 4 objects with this format:
[
  { "day": "Mon", "demand": 72, "price": 450 },
  ...
]
day values: Mon, Tue, Wed, Thu, Fri, Sat, Sun
demand: 0–100, price: realistic INR average for the category`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.5, maxOutputTokens: 512 },
  };

  const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) return getMockDemandInsights(category);

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  try {
    return parseJSON(text);
  } catch {
    return getMockDemandInsights(category);
  }
}

/**
 * Get eco-friendly packaging tip.
 * @param {string} productType
 * @returns {Promise<string>}
 */
export async function getEcoPackagingTip(productType = "general") {
  if (!GEMINI_API_KEY) {
    return "Use recycled kraft paper bags or banana leaf wrapping — affordable, biodegradable, and loved by eco-conscious buyers on Instagram!";
  }

  const prompt = `Give one short, practical eco-friendly packaging tip (2 sentences max) for a woman selling ${productType} products in India. Be specific and encouraging.`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.8, maxOutputTokens: 150 },
  };

  const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) return "Use recycled kraft paper — affordable and eco-friendly!";

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
}

// ──────────────────────────────────────────────────
// MOCK DATA (used when no API key is set)
// ──────────────────────────────────────────────────

function getMockAnalysis(filename = "") {
  const products = [
    {
      productName: "Handcrafted Terracotta Vase",
      category: "Home Decor",
      estimatedCost: 180,
      suggestedPrice: 799,
      marketAvgPrice: 650,
      demandScore: 85,
      demandDescription:
        "High demand during festive seasons and among urban eco-conscious buyers.",
      whyThisPrice:
        "Your handcrafted quality justifies a premium over mass-produced items. At ₹799, you earn a healthy margin while staying competitive on Instagram.",
      socialCaption:
        "Bring artisan elegance to your home ✨🌿 Our handcrafted terracotta vases are made with love and tradition. Perfect for your living room or gifting! 🎁 #HandmadeIndia #VocalForLocal #TerracottaArt #MadeWithLove",
      packagingMaterial: "Recycled kraft paper with jute twine",
      packagingCost: "₹18–28",
      packagingTip:
        "Wrap in kraft paper with a personalised handwritten tag — buyers love the personal touch and it costs under ₹25!",
      businessTip:
        "List on Meesho and Instagram Shop to reach buyers in Tier 2 cities who love handmade decor.",
    },
    {
      productName: "Homemade Pickle Jar",
      category: "Food & Condiments",
      estimatedCost: 90,
      suggestedPrice: 320,
      marketAvgPrice: 250,
      demandScore: 78,
      demandDescription:
        "Consistent demand year-round; spikes during winter and festival gifting season.",
      whyThisPrice:
        "Home-made pickles command a 25–30% premium over branded options. ₹320 for 500g is competitive and profitable.",
      socialCaption:
        "Maa ke haath ka swaad, ab ghar-ghar! 🌶️❤️ Pure, homemade achar with zero preservatives. Order now — limited jars available! 📦 #HomePickle #GharkaKhana #VocalForLocal #HomemadeFood",
      packagingMaterial: "Glass jars with cloth lid covers",
      packagingCost: "₹20–35",
      packagingTip:
        "Tie a small neem twig or turmeric sprig on the lid — it signals natural ingredients and makes stunning Instagram photos!",
      businessTip:
        "Offer a 3-jar combo for ₹850 to increase average order value and encourage gifting.",
    },
    {
      productName: "Hand-embroidered Kurti",
      category: "Textile & Fashion",
      estimatedCost: 350,
      suggestedPrice: 1299,
      marketAvgPrice: 950,
      demandScore: 82,
      demandDescription:
        "Rising demand for ethnic handwork on platforms like Meesho, Myntra and WhatsApp groups.",
      whyThisPrice:
        "Handmade embroidery work is rare and valued. ₹1299 positions you in the premium ethnic wear segment without being unaffordable.",
      socialCaption:
        "Handcrafted just for you 🧵✨ Every stitch tells a story! Our hand-embroidered kurtis blend tradition with modern style. DM to order! 📩 #HandEmbroidery #EthnicWear #HandmadeKurti #IndianFashion",
      packagingMaterial: "Biodegradable garment bags with cardboard backing",
      packagingCost: "₹30–45",
      packagingTip:
        "Use a cloth dust bag instead of plastic poly bags — buyers keep them and remember your brand!",
      businessTip:
        "Shoot your kurti on a plain white wall with natural light — no expensive setup needed for viral Instagram Reels.",
    },
  ];

  const idx = Math.floor(Math.random() * products.length);
  return products[idx];
}

function getMockDemandInsights(category) {
  return [
    { day: "Mon", demand: 62, price: 420 },
    { day: "Tue", demand: 74, price: 450 },
    { day: "Wed", demand: 58, price: 390 },
    { day: "Thu", demand: 80, price: 480 },
    { day: "Fri", demand: 91, price: 520 },
    { day: "Sat", demand: 88, price: 510 },
    { day: "Sun", demand: 76, price: 460 },
  ];
}
