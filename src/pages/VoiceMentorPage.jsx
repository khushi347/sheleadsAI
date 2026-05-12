import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Volume2, Bot, User, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "../components/ui/Button";

export function VoiceMentorPage() {
  const { t, language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversation, setConversation] = useState([]);

  // Mock conversation sequence
  useEffect(() => {
    // Add initial greeting after a short delay
    const timer = setTimeout(() => {
      setConversation([
        { type: "ai", text: t("vm_greeting") }
      ]);
      setIsSpeaking(true);
      
      // Stop speaking animation after 4 seconds
      setTimeout(() => setIsSpeaking(false), 4000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [language]); // Re-run if language changes to show translated greeting

  const handleMicToggle = () => {
    if (isListening) {
      // Stop listening and simulate AI response
      setIsListening(false);
      
      // Add user mock input
      setConversation(prev => [...prev, { type: "user", text: t("vm_user_sample") }]);
      
      // Simulate AI thinking then speaking
      setTimeout(() => {
        setIsSpeaking(true);
        setConversation(prev => [...prev, { type: "ai", text: t("vm_ai_response") }]);
        
        // Stop speaking after 5 seconds
        setTimeout(() => setIsSpeaking(false), 5000);
      }, 1500);
      
    } else {
      // Start listening
      setIsListening(true);
      setIsSpeaking(false);
    }
  };

  const currentStatus = isListening ? t("vm_status_listening") : (isSpeaking ? t("vm_status_speaking") : t("vm_status_idle"));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative min-h-[calc(100vh-80px)] flex flex-col">
      {/* Ambient Backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-slate-50 to-teal-50/30 pointer-events-none -z-20" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-float mix-blend-multiply" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-float-delayed mix-blend-multiply" />

      {/* Header */}
      <div className="text-center mb-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center p-3 bg-secondary/10 rounded-2xl mb-4">
            <Mic className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {t("vm_title")}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
            {t("vm_subtitle")}
          </p>
        </motion.div>
      </div>

      {/* Main Interactive Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-3xl mx-auto">
        
        {/* Visualizer / Orb */}
        <div className="relative w-64 h-64 flex items-center justify-center mb-12">
          {/* Glowing rings */}
          <AnimatePresence>
            {(isListening || isSpeaking) && (
              <>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: [1, 1.2, 1] }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: isListening ? 2 : 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute inset-0 rounded-full blur-xl ${isListening ? 'bg-accent/40' : 'bg-secondary/40'}`} 
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: [1, 1.4, 1] }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: isListening ? 2.5 : 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className={`absolute -inset-4 rounded-full blur-2xl ${isListening ? 'bg-accent/20' : 'bg-secondary/20'}`} 
                />
              </>
            )}
          </AnimatePresence>

          {/* Central Orb */}
          <motion.div 
            className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-500 overflow-hidden
              ${isListening ? 'bg-gradient-to-tr from-accent to-accent-light' : 
                isSpeaking ? 'bg-gradient-to-tr from-secondary to-teal-300' : 'bg-gradient-to-tr from-slate-200 to-slate-100'}
            `}
            animate={isListening || isSpeaking ? {
              scale: [1, 1.05, 1],
            } : { scale: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Inner dynamic mesh */}
            <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent mix-blend-overlay"></div>
            
            {isListening ? (
              <Mic className="w-12 h-12 text-white animate-pulse" />
            ) : isSpeaking ? (
              <Volume2 className="w-12 h-12 text-white animate-pulse" />
            ) : (
              <Sparkles className="w-12 h-12 text-slate-400" />
            )}
          </motion.div>
        </div>

        {/* Status Text */}
        <motion.p 
          key={currentStatus}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-lg font-medium mb-8 ${isListening ? 'text-accent-light' : isSpeaking ? 'text-secondary' : 'text-slate-500'}`}
        >
          {currentStatus}
        </motion.p>

        {/* Controls */}
        <div className="flex gap-4 mb-12">
          <Button 
            size="lg" 
            onClick={handleMicToggle}
            className={`rounded-full px-8 py-6 text-lg shadow-xl transition-all duration-300 ${
              isListening ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/20' : 'bg-accent hover:bg-accent-light shadow-accent/20'
            }`}
          >
            {isListening ? (
              <>
                <Square className="w-5 h-5 mr-2 fill-current" />
                {t("vm_stop_btn")}
              </>
            ) : (
              <>
                <Mic className="w-5 h-5 mr-2" />
                {t("vm_start_btn")}
              </>
            )}
          </Button>
        </div>

        {/* Transcript / Conversation Area */}
        <div className="w-full bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-xl shadow-slate-200/50 min-h-[200px] max-h-[300px] overflow-y-auto custom-scrollbar">
          <AnimatePresence>
            {conversation.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                className={`flex gap-4 mb-6 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.type === 'ai' ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent-light'
                }`}>
                  {msg.type === 'ai' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                <div className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className="text-xs font-medium text-slate-400 mb-1">
                    {msg.type === 'ai' ? t("vm_ai_name") : "Meera"}
                  </span>
                  <div className={`p-4 rounded-2xl max-w-lg ${
                    msg.type === 'ai' 
                      ? 'bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tl-sm' 
                      : 'bg-accent text-white shadow-md rounded-tr-sm'
                  }`}>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {conversation.length === 0 && (
            <div className="h-full flex items-center justify-center text-slate-400 font-light">
              Conversation history will appear here...
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
