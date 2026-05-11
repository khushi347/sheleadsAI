import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const translations = {
  en: {
    // Navbar
    nav_features: "Features",
    nav_how_it_works: "How it Works",
    nav_dashboard: "Dashboard",
    nav_login: "Log in",
    nav_get_started: "Get Started",
    
    // Landing Page Hero
    hero_badge: "Built for WITCHUNT Hackathon",
    hero_title_1: "Empowering Women to Build",
    hero_title_2: "Thriving Businesses",
    hero_subtitle: "Upload a product, get instant pricing guidance, marketing materials, and regional-language mentorship. Your AI partner in entrepreneurship.",
    hero_cta_1: "Start Growing Today",
    hero_cta_2: "See How It Works",

    // Landing Page How It Works
    hiw_title: "How SheLeads AI Works",
    hiw_subtitle: "Your journey from local artisan to global entrepreneur in 5 simple steps.",
    hiw_step1_title: "Upload Product Photo",
    hiw_step1_desc: "Snap a picture of your handcrafted item. Our AI instantly recognizes the product and category.",
    hiw_step2_title: "AI Market Analysis",
    hiw_step2_desc: "We analyze thousands of data points to determine current market demand, competitor pricing, and trends.",
    hiw_step3_title: "Smart Business Suggestions",
    hiw_step3_desc: "Receive the perfect pricing strategy, eco-friendly packaging ideas, and viral social media captions.",
    hiw_step4_title: "Voice Mentor Guidance",
    hiw_step4_desc: "Listen to your AI business coach explain your strategy in your preferred regional language.",
    hiw_step5_title: "Grow & Sell",
    hiw_step5_desc: "Apply the recommendations, reach more customers, and watch your business thrive.",

    // Landing Page Features
    feat_title: "Supercharge Your Business",
    feat_subtitle: "Everything you need to turn your local craft or service into a scalable enterprise.",
    feat_1_title: "AI Price Optimization",
    feat_1_desc: "Upload a product image and our AI analyzes market trends to suggest the perfect selling price for maximum profit.",
    feat_2_title: "Regional Voice Mentor",
    feat_2_desc: "Get personalized business advice in Hindi, Tamil, Telugu, and more through our interactive voice assistant.",
    feat_3_title: "Packaging & Marketing",
    feat_3_desc: "Receive instant, eco-friendly packaging ideas and AI-generated social media captions to boost your sales.",

    // Landing Page Success Stories
    success_title: "Success Stories",
    success_subtitle: "Join thousands of women who have transformed their passion into profit.",
    success_sales: "Sales",
    success_1_biz: "Handcrafted Jewelry",
    success_1_quote: "SheLeads AI helped me price my terracotta jewelry correctly and the Instagram captions brought in so many new orders!",
    success_2_biz: "Organic Spices",
    success_2_quote: "The voice mentor in Hindi is like having a business coach by my side. My confidence has grown tremendously.",
    success_3_biz: "Handloom Sarees",
    success_3_quote: "I never knew my products were undervalued until the AI scan. Now I sell across India with beautiful packaging.",

    // Landing Page CTA
    cta_title: "Ready to elevate your business?",
    cta_subtitle: "100% free for the first 30 days. No credit card required.",
    cta_button: "Create Free Account",

    // Footer
    footer_desc: "Empowering women micro-entrepreneurs in India with AI-driven business intelligence, personalized mentorship, and growth strategies.",
    footer_platform: "Platform",
    footer_pricing_guide: "Pricing Guidance",
    footer_voice_mentor: "Voice Mentor",
    footer_company: "Company",
    footer_about: "About Us",
    footer_contact: "Contact",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",
    footer_rights: "All rights reserved.",
    footer_built_with: "Built with",
    footer_for: "for WITCHUNT Hackathon",

    // Auth Page
    auth_welcome_back: "Welcome back",
    auth_create_account: "Create your account",
    auth_login_desc: "Enter your details to access your dashboard",
    auth_signup_desc: "Join thousands of women entrepreneurs today",
    auth_full_name: "Full Name",
    auth_email: "Email Address",
    auth_password: "Password",
    auth_forgot: "Forgot password?",
    auth_signin_btn: "Sign In",
    auth_signup_btn: "Create Account",
    auth_no_account: "Don't have an account?",
    auth_has_account: "Already have an account?",
    auth_signup_link: "Sign up",
    auth_login_link: "Log in",

    // Dashboard Page
    dash_welcome: "Welcome back, Meera! 👋",
    dash_subtitle: "Here's what's happening with your business today.",
    dash_mentor_online: "Voice Mentor Online (Hindi)",
    dash_new_feature: "New Feature",
    dash_ai_analyzer: "AI Product Analyzer",
    dash_ai_desc: "Upload a photo of your new product. Our AI will analyze it to suggest the perfect price, eco-friendly packaging, and write an Instagram caption for you.",
    dash_analyzing: "Analyzing product...",
    dash_upload_btn: "Click to upload photo",
    dash_market_trends: "Market Demand Trends",
    dash_cat_handicrafts: "Handicrafts",
    dash_cat_textiles: "Textiles",
    dash_cat_spices: "Spices",
    dash_quick_tools: "Quick Tools",
    dash_edit_photos: "Edit Photos",
    dash_run_ad: "Run Ad",
    dash_sus_tip_title: "Sustainability Tip",
    dash_sus_tip_desc: "Switching to corrugated cardboard packaging can reduce your shipping costs by 15% and appeals to eco-conscious buyers.",
    dash_read_more: "Read more tips",
    dash_recent_scans: "Recent Scans",
    dash_scan_item: "Terracotta Vase",
    dash_time_ago: "2 days ago",
    dash_view_all: "View All Scans",

    // AI Result Page
    res_back: "Back to Dashboard",
    res_scan_complete: "Scan Complete",
    res_product_name: "Hand-painted Ceramic Bowl",
    res_detected_cat: "Detected Category: Home Decor & Crafts",
    res_demand_score: "Demand Score",
    res_demand_desc: "High demand in urban markets (Mumbai, Delhi) for artisanal tableware.",
    res_pricing_opt: "Pricing Optimization",
    res_est_cost: "Estimated Cost",
    res_sugg_price: "Suggested Price",
    res_market_avg: "Market Avg",
    res_why_price: "Why ₹799?",
    res_why_desc: "Your product has unique hand-painted patterns that justify a premium. Similar artisanal items on premium platforms sell between ₹700 - ₹900. Highlighting \"handcrafted\" will support this price point.",
    res_social_content: "Social Content",
    res_social_text: "Bring a touch of artisan elegance to your dining table! ✨\n\nOur new hand-painted ceramic bowls are carefully crafted by local artisans. Perfect for your morning cereal or evening soups. Each piece tells a story of tradition. 🥣🪴\n\nDM to order! Limited stock available.\n\n#HandmadeIndia #VocalForLocal #ArtisanCrafts #HomeDecorIndia",
    res_gen_another: "Generate Another",
    res_pkg_idea: "Packaging Idea",
    res_pkg_mat_label: "Material:",
    res_pkg_mat: "Recycled corrugated box with jute rope tying.",
    res_pkg_cost_label: "Cost:",
    res_pkg_cost: "Approx ₹15 per box.",
    res_pkg_tip_label: "Tip:",
    res_pkg_tip: "Add a small handwritten 'Thank You' note inside. It increases repeat customers by 30%!",
    res_dl_vendor: "Download Vendor List",

    // Voice Mentor Page
    vm_title: "AI Voice Mentor",
    vm_subtitle: "Your personal business coach, available 24/7 in your preferred language.",
    vm_status_idle: "Ready to listen",
    vm_status_listening: "Listening...",
    vm_status_speaking: "Speaking...",
    vm_start_btn: "Tap to Speak",
    vm_stop_btn: "Stop",
    vm_ai_name: "SheLeads Assistant",
    vm_greeting: "Hello Meera! I see your terracotta vases are doing great. How can I help you grow your business today?",
    vm_user_sample: "How should I price my new hand-painted vase?",
    vm_ai_response: "Based on recent market trends in your area, hand-painted terracotta vases sell best between ₹600 and ₹800. Since yours have unique detailing, I suggest starting at ₹750."
  },
  hi: {
    // Navbar
    nav_features: "विशेषताएं",
    nav_how_it_works: "यह कैसे काम करता है",
    nav_dashboard: "डैशबोर्ड",
    nav_login: "लॉग इन करें",
    nav_get_started: "शुरू करें",
    
    // Landing Page Hero
    hero_badge: "WITCHUNT हैकाथॉन के लिए निर्मित",
    hero_title_1: "महिलाओं को सशक्त बनाना",
    hero_title_2: "सफल व्यापार के लिए",
    hero_subtitle: "अपना उत्पाद फोटो अपलोड करें, सही कीमत जानें, मार्केटिंग के तरीके सीखें और अपनी भाषा में व्यापार सलाह पाएं। उद्यमिता में आपका AI साथी।",
    hero_cta_1: "आज ही शुरुआत करें",
    hero_cta_2: "देखें यह कैसे काम करता है",

    // Landing Page How It Works
    hiw_title: "SheLeads AI कैसे काम करता है",
    hiw_subtitle: "स्थानीय कारीगर से वैश्विक उद्यमी बनने तक की आपकी यात्रा 5 आसान चरणों में।",
    hiw_step1_title: "उत्पाद की फोटो अपलोड करें",
    hiw_step1_desc: "अपने हस्तनिर्मित आइटम की एक तस्वीर लें। हमारा AI तुरंत उत्पाद और श्रेणी को पहचान लेता है।",
    hiw_step2_title: "AI बाज़ार विश्लेषण",
    hiw_step2_desc: "हम वर्तमान बाज़ार की मांग, प्रतिस्पर्धी मूल्य निर्धारण और रुझानों को निर्धारित करने के लिए हजारों डेटा बिंदुओं का विश्लेषण करते हैं।",
    hiw_step3_title: "स्मार्ट व्यापार सुझाव",
    hiw_step3_desc: "सही मूल्य निर्धारण रणनीति, पर्यावरण के अनुकूल पैकेजिंग विचार और वायरल सोशल मीडिया कैप्शन प्राप्त करें।",
    hiw_step4_title: "वॉयस मेंटर मार्गदर्शन",
    hiw_step4_desc: "अपने AI बिजनेस कोच को अपनी पसंदीदा क्षेत्रीय भाषा में अपनी रणनीति समझाते हुए सुनें।",
    hiw_step5_title: "बढ़ें और बेचें",
    hiw_step5_desc: "सुझावों को लागू करें, अधिक ग्राहकों तक पहुंचें और अपने व्यवसाय को फलते-फूलते देखें।",

    // Landing Page Features
    feat_title: "अपने व्यापार को नई ऊंचाइयों पर ले जाएं",
    feat_subtitle: "अपनी स्थानीय कला या सेवा को एक बड़े व्यवसाय में बदलने के लिए आपको जो कुछ भी चाहिए।",
    feat_1_title: "AI सही कीमत सुझाव",
    feat_1_desc: "उत्पाद की फोटो अपलोड करें और हमारा AI बाजार को समझकर आपको सबसे सही कीमत बताएगा जिससे ज्यादा मुनाफा हो।",
    feat_2_title: "आपकी भाषा में वॉयस मेंटर",
    feat_2_desc: "हमारे वॉयस असिस्टेंट के जरिए हिंदी, तमिल, तेलुगु जैसी भाषाओं में व्यक्तिगत व्यापार सलाह पाएं।",
    feat_3_title: "पैकेजिंग और मार्केटिंग",
    feat_3_desc: "अपनी बिक्री बढ़ाने के लिए तुरंत इको-फ्रेंडली पैकेजिंग आइडिया और इंस्टाग्राम कैप्शन पाएं।",

    // Landing Page Success Stories
    success_title: "सफलता की कहानियाँ",
    success_subtitle: "उन हजारों महिलाओं से जुड़ें जिन्होंने अपनी कला को मुनाफे में बदला है।",
    success_sales: "बिक्री",
    success_1_biz: "हस्तनिर्मित आभूषण (Handcrafted Jewelry)",
    success_1_quote: "SheLeads AI ने मुझे अपनी टेराकोटा ज्वेलरी की सही कीमत तय करने में मदद की और उनके इंस्टाग्राम कैप्शन से मुझे कई नए ऑर्डर मिले!",
    success_2_biz: "ऑर्गेनिक मसाले (Organic Spices)",
    success_2_quote: "हिंदी में वॉयस मेंटर ऐसा है जैसे कोई बिज़नेस कोच हमेशा मेरे साथ हो। मेरा आत्मविश्वास बहुत बढ़ गया है।",
    success_3_biz: "हथकरघा साड़ियाँ (Handloom Sarees)",
    success_3_quote: "मुझे पता ही नहीं था कि मेरे उत्पाद कितने मूल्यवान हैं। AI स्कैन के बाद अब मैं पूरे भारत में सुंदर पैकेजिंग के साथ साड़ियाँ बेचती हूँ।",

    // Landing Page CTA
    cta_title: "क्या आप अपने व्यापार को बढ़ाने के लिए तैयार हैं?",
    cta_subtitle: "पहले 30 दिनों के लिए 100% मुफ्त। किसी क्रेडिट कार्ड की जरूरत नहीं।",
    cta_button: "मुफ्त अकाउंट बनाएं",

    // Footer
    footer_desc: "भारत में महिला उद्यमियों को AI की मदद से व्यापार की जानकारी, सही सलाह और विकास के तरीकों से सशक्त बनाना।",
    footer_platform: "प्लेटफ़ॉर्म",
    footer_pricing_guide: "मूल्य निर्धारण मार्गदर्शन",
    footer_voice_mentor: "वॉयस मेंटर",
    footer_company: "कंपनी",
    footer_about: "हमारे बारे में",
    footer_contact: "संपर्क करें",
    footer_privacy: "गोपनीयता नीति",
    footer_terms: "सेवा की शर्तें",
    footer_rights: "सर्वाधिकार सुरक्षित।",
    footer_built_with: "के साथ बनाया गया",
    footer_for: "WITCHUNT हैकाथॉन के लिए",

    // Auth Page
    auth_welcome_back: "वापसी पर स्वागत है",
    auth_create_account: "अपना अकाउंट बनाएं",
    auth_login_desc: "डैशबोर्ड देखने के लिए अपना विवरण दर्ज करें",
    auth_signup_desc: "आज ही हजारों महिला उद्यमियों से जुड़ें",
    auth_full_name: "पूरा नाम",
    auth_email: "ईमेल आईडी",
    auth_password: "पासवर्ड",
    auth_forgot: "पासवर्ड भूल गए?",
    auth_signin_btn: "लॉग इन",
    auth_signup_btn: "अकाउंट बनाएं",
    auth_no_account: "अकाउंट नहीं है?",
    auth_has_account: "क्या आपके पास पहले से अकाउंट है?",
    auth_signup_link: "साइन अप करें",
    auth_login_link: "लॉग इन करें",

    // Dashboard Page
    dash_welcome: "वापसी पर स्वागत है, मीरा! 👋",
    dash_subtitle: "आज आपके व्यवसाय में क्या हो रहा है, यहां देखें।",
    dash_mentor_online: "वॉयस मेंटर ऑनलाइन है (हिंदी)",
    dash_new_feature: "नया फीचर",
    dash_ai_analyzer: "AI प्रोडक्ट एनालाइज़र",
    dash_ai_desc: "अपने नए उत्पाद की फोटो अपलोड करें। हमारा AI इसकी जांच करके सही कीमत, इको-फ्रेंडली पैकेजिंग और इंस्टाग्राम कैप्शन का सुझाव देगा।",
    dash_analyzing: "उत्पाद की जांच हो रही है...",
    dash_upload_btn: "फोटो अपलोड करने के लिए क्लिक करें",
    dash_market_trends: "बाजार में मांग का रुझान (Market Trends)",
    dash_cat_handicrafts: "हस्तशिल्प (Handicrafts)",
    dash_cat_textiles: "कपड़े (Textiles)",
    dash_cat_spices: "मसाले (Spices)",
    dash_quick_tools: "त्वरित टूल (Quick Tools)",
    dash_edit_photos: "फोटो एडिट करें",
    dash_run_ad: "विज्ञापन चलाएं",
    dash_sus_tip_title: "पर्यावरण के अनुकूल टिप",
    dash_sus_tip_desc: "नालीदार कार्डबोर्ड (corrugated cardboard) पैकेजिंग का उपयोग करने से शिपिंग लागत में 15% की कमी आ सकती है और यह पर्यावरण के प्रति जागरूक ग्राहकों को पसंद आता है।",
    dash_read_more: "और टिप्स पढ़ें",
    dash_recent_scans: "हाल के स्कैन",
    dash_scan_item: "टेराकोटा फूलदान",
    dash_time_ago: "2 दिन पहले",
    dash_view_all: "सभी स्कैन देखें",

    // AI Result Page
    res_back: "डैशबोर्ड पर वापस जाएं",
    res_scan_complete: "स्कैन पूरा हुआ",
    res_product_name: "हाथ से पेंट किया हुआ सिरेमिक बाउल",
    res_detected_cat: "पहचानी गई श्रेणी: घर की सजावट और हस्तशिल्प",
    res_demand_score: "बाजार में मांग का स्कोर",
    res_demand_desc: "शहरी बाज़ारों (मुंबई, दिल्ली) में कारीगरों द्वारा बनाए गए टेबलवेयर की भारी मांग है।",
    res_pricing_opt: "सही कीमत का सुझाव",
    res_est_cost: "अनुमानित लागत",
    res_sugg_price: "सुझाई गई कीमत",
    res_market_avg: "बाजार की औसत कीमत",
    res_why_price: "₹799 क्यों?",
    res_why_desc: "आपके उत्पाद में अद्वितीय हाथ से पेंट किए गए पैटर्न हैं जो इसे खास बनाते हैं। इसी तरह के हस्तशिल्प आइटम प्रीमियम प्लेटफ़ॉर्म पर ₹700 - ₹900 के बीच बिकते हैं। 'हाथ से बना (Handcrafted)' पर जोर देने से आपको यह कीमत मिल सकती है।",
    res_social_content: "सोशल मीडिया कंटेंट",
    res_social_text: "अपनी डाइनिंग टेबल पर कलात्मक सुंदरता का स्पर्श लाएँ! ✨\n\nहमारे नए हाथ से पेंट किए गए सिरेमिक बाउल स्थानीय कारीगरों द्वारा बहुत ही सावधानी से बनाए गए हैं। आपके सुबह के नाश्ते या शाम के सूप के लिए बिल्कुल सही। हर पीस परंपरा की एक कहानी कहता है। 🥣🪴\n\nऑर्डर करने के लिए DM करें! सीमित स्टॉक उपलब्ध है।\n\n#HandmadeIndia #VocalForLocal #ArtisanCrafts #HomeDecorIndia",
    res_gen_another: "एक और कैप्शन बनाएं",
    res_pkg_idea: "पैकेजिंग आइडिया",
    res_pkg_mat_label: "सामग्री:",
    res_pkg_mat: "जूट की रस्सी से बंधा हुआ रिसाइकल्ड कार्डबोर्ड बॉक्स।",
    res_pkg_cost_label: "लागत:",
    res_pkg_cost: "लगभग ₹15 प्रति बॉक्स।",
    res_pkg_tip_label: "सुझाव:",
    res_pkg_tip: "अंदर हाथ से लिखा हुआ एक छोटा सा 'Thank You' नोट रखें। इससे बार-बार आने वाले ग्राहकों में 30% की वृद्धि होती है!",
    res_dl_vendor: "वेंडर लिस्ट डाउनलोड करें",

    // Voice Mentor Page
    vm_title: "AI वॉयस मेंटर",
    vm_subtitle: "आपका व्यक्तिगत बिजनेस कोच, आपकी पसंदीदा भाषा में 24/7 उपलब्ध है।",
    vm_status_idle: "सुनने के लिए तैयार",
    vm_status_listening: "सुन रहा है...",
    vm_status_speaking: "बोल रहा है...",
    vm_start_btn: "बोलने के लिए टैप करें",
    vm_stop_btn: "रोकें",
    vm_ai_name: "SheLeads असिस्टेंट",
    vm_greeting: "नमस्ते मीरा! मैं देख रहा हूँ कि आपके टेराकोटा फूलदान बहुत अच्छे चल रहे हैं। आज मैं आपके व्यवसाय को बढ़ाने में कैसे मदद कर सकता हूँ?",
    vm_user_sample: "मुझे अपने नए हाथ से पेंट किए गए फूलदान की कीमत क्या रखनी चाहिए?",
    vm_ai_response: "आपके क्षेत्र में हाल के बाज़ार रुझानों के आधार पर, हाथ से पेंट किए गए टेराकोटा फूलदान ₹600 और ₹800 के बीच सबसे अच्छे बिकते हैं। चूंकि आपके फूलदान में अनूठा डिज़ाइन है, मेरा सुझाव है कि आप ₹750 से शुरुआत करें।"
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "hi" : "en");
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
