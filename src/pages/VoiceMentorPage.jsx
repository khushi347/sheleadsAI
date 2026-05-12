import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Volume2, Bot, User, Sparkles, AlertCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "../components/ui/Button";

// ─── 1. CONFIG ────────────────────────────────────────────────────────────────
const GEMINI_MODEL = "gemini-2.5-flash";

// ─── 2. SYSTEM PROMPT ─────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are SheLeads Assistant, a warm and practical AI business mentor 
for women entrepreneurs in India — especially those running small or home-based businesses 
(handicrafts, food, clothing, etc.). 

Your role:
- Give concrete, actionable business advice (pricing, marketing, scaling, finance).
- Respond in the same language the user speaks (Hindi, Hinglish, English, etc.).
- Be encouraging but realistic. Never give vague platitudes.
- Keep responses conversational and under 3 sentences so they work well as spoken audio.
- When discussing prices, always use ₹ (Indian Rupees).
- Reference local platforms like Meesho, IndiaMART, WhatsApp Business, Instagram when relevant.`;

export function VoiceMentorPage() {
  const { t, language } = useLanguage();

  // ── State ──────────────────────────────────────────────────────────────────
  const [isListening, setIsListening]   = useState(false);
  const [isSpeaking, setIsSpeaking]     = useState(false);
  const [isThinking, setIsThinking]     = useState(false);
  const [conversation, setConversation] = useState([]);
  const [errorMsg, setErrorMsg]         = useState("");
  const [transcript, setTranscript]     = useState(""); // live transcript while listening

  // ── Refs ───────────────────────────────────────────────────────────────────
  const recognitionRef  = useRef(null);   // SpeechRecognition instance
  const synthRef        = useRef(window.speechSynthesis);
  const chatBottomRef   = useRef(null);
  const conversationRef = useRef([]);     // keep latest value accessible in callbacks

  // Keep ref in sync
  useEffect(() => { conversationRef.current = conversation; }, [conversation]);

  // ── Scroll to bottom on new messages ──────────────────────────────────────
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, isThinking]);

  // ── Initial AI greeting (real Gemini call) ─────────────────────────────────
  useEffect(() => {
    const greetUser = async () => {
      const greeting = await callGemini("Hello! Introduce yourself briefly and ask how you can help today.");
      if (greeting) {
        const msg = { type: "ai", text: greeting };
        setConversation([msg]);
        speakText(greeting);
      }
    };
    greetUser();

    // Cleanup speech on unmount
    return () => {
      synthRef.current?.cancel();
      recognitionRef.current?.abort();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  // ── 3. CALL GEMINI API ─────────────────────────────────────────────────────
async function callGemini(userMessage) {
  setErrorMsg("");
     console.log("GEMINI KEY =", import.meta.env.VITE_GEMINI_API_KEY);
  try {
    const history = conversationRef.current.map((m) => ({
      role: m.type === "ai" ? "model" : "user",
      parts: [{ text: m.text }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            ...history,
            {
              role: "user",
              parts: [{ text: userMessage }],
            },
          ],
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error("Gemini API Error:", err);
      throw new Error(err.error?.message || "API Error");
    }

    const data = await response.json();

    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text || ""
    );

  } catch (err) {
    console.error("Gemini API error:", err);
    setErrorMsg("Couldn't reach Gemini AI.");
    return null;
  }
}

  // ── 4. TEXT-TO-SPEECH ──────────────────────────────────────────────────────
  function speakText(text) {
    if (!synthRef.current) return;
    synthRef.current.cancel(); // cancel any ongoing speech

    const utter = new SpeechSynthesisUtterance(text);

    // Pick a female voice if available
    const voices = synthRef.current.getVoices();
    const preferred =
  voices.find(v => v.lang === "hi-IN") ||
  voices.find(v => v.lang.startsWith("hi")) ||
  voices.find(v => v.lang.includes("IN")) ||
  voices[0];
    if (preferred) utter.voice = preferred;

    utter.rate  = 0.95;
    utter.pitch = 1.05;

    utter.onstart = () => setIsSpeaking(true);
    utter.onend   = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utter);
  }

  // ── 5. SPEECH RECOGNITION ─────────────────────────────────────────────────
  function startListening() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMsg("Your browser doesn't support speech recognition. Try Chrome.");
      return;
    }

    synthRef.current?.cancel(); // stop AI speaking if user interrupts

    const recognition = new SpeechRecognition();
    recognition.continuous     = false;
    recognition.interimResults = true;
    recognition.lang           = language === "hi" ? "hi-IN" : "en-IN";

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
      setErrorMsg("");
    };

    recognition.onresult = (event) => {
      let interim = "";
      let final   = "";
      for (const result of event.results) {
        if (result.isFinal) final   += result[0].transcript;
        else                interim += result[0].transcript;
      }
      setTranscript(final || interim);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      if (event.error !== "no-speech") {
        setErrorMsg(`Mic error: ${event.error}. Please try again.`);
      }
      setIsListening(false);
    };

    recognition.onend = async () => {
      setIsListening(false);
      const spokenText = transcript || recognitionRef.current?._lastTranscript;
      if (!spokenText?.trim()) return;

      // Add user message to conversation
      const userMsg = { type: "user", text: spokenText.trim() };
      setConversation((prev) => [...prev, userMsg]);
      setTranscript("");

      // Get AI response
      setIsThinking(true);
      const aiText = await callGemini(spokenText.trim());
      setIsThinking(false);

      if (aiText) {
        setConversation((prev) => [...prev, { type: "ai", text: aiText }]);
        speakText(aiText);
      }
    };

    // Hack: store last transcript for the onend handler
    const origOnResult = recognition.onresult;
    recognition.onresult = (event) => {
      origOnResult(event);
      let final = "";
      for (const result of event.results) {
        if (result.isFinal) final += result[0].transcript;
      }
      if (final) recognitionRef.current._lastTranscript = final;
    };

    recognitionRef.current = recognition;
    recognition.start();
  }

  function stopListening() {
    recognitionRef.current?.stop();
    setIsListening(false);
  }

  function handleMicToggle() {
    if (isListening) stopListening();
    else              startListening();
  }

  // ── Status label ──────────────────────────────────────────────────────────
  const currentStatus = isListening
    ? (transcript ? `"${transcript}"` : t("vm_status_listening") || "Listening…")
    : isThinking
    ? "Thinking…"
    : isSpeaking
    ? t("vm_status_speaking") || "Speaking…"
    : t("vm_status_idle") || "Ready to listen";

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative min-h-[calc(100vh-80px)] flex flex-col">
      {/* Ambient Backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-slate-50 to-teal-50/30 pointer-events-none -z-20" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-float mix-blend-multiply" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-float-delayed mix-blend-multiply" />

      {/* Header */}
      <div className="text-center mb-10 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center justify-center p-3 bg-secondary/10 rounded-2xl mb-4">
            <Mic className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {t("vm_title") || "AI Voice Mentor"}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
            {t("vm_subtitle") || "Your personal business coach, available 24/7 in your preferred language."}
          </p>
        </motion.div>
      </div>

      {/* Main Interactive Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-3xl mx-auto">

        {/* Orb */}
        <div className="relative w-64 h-64 flex items-center justify-center mb-12">
          <AnimatePresence>
            {(isListening || isSpeaking || isThinking) && (
              <>
                <motion.div
                  key="ring1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: [1, 1.2, 1] }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: isListening ? 2 : 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute inset-0 rounded-full blur-xl ${
                    isListening ? "bg-accent/40" : isThinking ? "bg-yellow-400/30" : "bg-secondary/40"
                  }`}
                />
                <motion.div
                  key="ring2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: [1, 1.4, 1] }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: isListening ? 2.5 : 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className={`absolute -inset-4 rounded-full blur-2xl ${
                    isListening ? "bg-accent/20" : isThinking ? "bg-yellow-300/10" : "bg-secondary/20"
                  }`}
                />
              </>
            )}
          </AnimatePresence>

          <motion.div
            className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-500 overflow-hidden
              ${isListening
                ? "bg-gradient-to-tr from-accent to-accent-light"
                : isSpeaking
                ? "bg-gradient-to-tr from-secondary to-teal-300"
                : isThinking
                ? "bg-gradient-to-tr from-yellow-400 to-amber-300"
                : "bg-gradient-to-tr from-slate-200 to-slate-100"
              }`}
            animate={(isListening || isSpeaking || isThinking) ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent mix-blend-overlay" />
            {isListening  ? <Mic      className="w-12 h-12 text-white animate-pulse" /> :
             isSpeaking   ? <Volume2  className="w-12 h-12 text-white animate-pulse" /> :
             isThinking   ? <Sparkles className="w-12 h-12 text-white animate-spin"  style={{ animationDuration: "2s" }} /> :
                            <Sparkles className="w-12 h-12 text-slate-400" />}
          </motion.div>
        </div>

        {/* Status */}
        <motion.p
          key={currentStatus}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-base font-medium mb-2 px-4 text-center max-w-sm truncate ${
            isListening ? "text-accent-light" : isSpeaking ? "text-secondary" : isThinking ? "text-amber-500" : "text-slate-500"
          }`}
        >
          {currentStatus}
        </motion.p>

        {/* Error */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-rose-500 text-sm mb-4 bg-rose-50 border border-rose-200 rounded-xl px-4 py-2"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errorMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mic Button */}
        <div className="flex gap-4 mb-12 mt-4">
          <Button
            size="lg"
            onClick={handleMicToggle}
            disabled={isThinking}
            className={`rounded-full px-8 py-6 text-lg shadow-xl transition-all duration-300 ${
              isListening
                ? "bg-rose-500 hover:bg-rose-600 shadow-rose-500/20"
                : isThinking
                ? "bg-slate-300 cursor-not-allowed"
                : "bg-accent hover:bg-accent-light shadow-accent/20"
            }`}
          >
            {isListening ? (
              <><Square className="w-5 h-5 mr-2 fill-current" />{t("vm_stop_btn") || "Stop"}</>
            ) : (
              <><Mic className="w-5 h-5 mr-2" />{t("vm_start_btn") || "Tap to Speak"}</>
            )}
          </Button>
        </div>

        {/* Conversation */}
        <div className="w-full bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-xl shadow-slate-200/50 min-h-[200px] max-h-[320px] overflow-y-auto custom-scrollbar">
          <AnimatePresence>
            {conversation.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                className={`flex gap-4 mb-6 ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.type === "ai" ? "bg-secondary/10 text-secondary" : "bg-accent/10 text-accent-light"
                }`}>
                  {msg.type === "ai" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                <div className={`flex flex-col ${msg.type === "user" ? "items-end" : "items-start"}`}>
                  <span className="text-xs font-medium text-slate-400 mb-1">
                    {msg.type === "ai" ? (t("vm_ai_name") || "SheLeads Assistant") : "Meera"}
                  </span>
                  <div className={`p-4 rounded-2xl max-w-lg ${
                    msg.type === "ai"
                      ? "bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tl-sm"
                      : "bg-accent text-white shadow-md rounded-tr-sm"
                  }`}>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Thinking indicator */}
          {isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 mb-6"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-secondary/10 text-secondary">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs font-medium text-slate-400 mb-1">{t("vm_ai_name") || "SheLeads Assistant"}</span>
                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm rounded-tl-sm">
                  <div className="flex gap-1 items-center h-5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-slate-300 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {conversation.length === 0 && !isThinking && (
            <div className="h-full flex items-center justify-center text-slate-400 font-light">
              Conversation history will appear here…
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>
      </div>
    </div>
  );
}