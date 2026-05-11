import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Mic, Package, ShieldCheck, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { useLanguage } from "../context/LanguageContext";

export function LandingPage() {
  const { t } = useLanguage();



  const successStories = [
    {
      name: "Meera D.",
      business: t("success_1_biz"),
      increase: "+145%",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
      quote: t("success_1_quote")
    },
    {
      name: "Anita P.",
      business: t("success_2_biz"),
      increase: "+85%",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80",
      quote: t("success_2_quote")
    },
    {
      name: "Lakshmi K.",
      business: t("success_3_biz"),
      increase: "+210%",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&h=200&q=80",
      quote: t("success_3_quote")
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      {/* Hero Section - Dark Split Layout */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 bg-[#0f172a] overflow-hidden">
        {/* Artistic Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] pointer-events-none" />
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[800px] h-[800px] bg-teal-800/25 rounded-full blur-[150px] pointer-events-none animate-float mix-blend-screen" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none animate-float-delayed mix-blend-screen" />
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-fuchsia-600/20 rounded-full blur-[150px] pointer-events-none animate-float mix-blend-screen" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/15 rounded-full blur-[120px] pointer-events-none animate-float-delayed mix-blend-screen" />
        
        {/* Subtle grid texture overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none mix-blend-overlay" />
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy & CTAs */}
          <div className="text-left text-white">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-start mb-6"
            >
              <Badge variant="accent" className="px-5 py-1.5 text-sm rounded-full backdrop-blur-xl border-accent/30 bg-accent/10 text-accent-light shadow-lg shadow-accent/5 font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                {t("hero_badge")}
              </Badge>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight text-white"
            >
              {t("hero_title_1")} <br />
              <span className="text-gradient drop-shadow-sm">{t("hero_title_2")}</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg leading-relaxed font-light"
            >
              {t("hero_subtitle")}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-start gap-4"
            >
              <Link to="/auth?signup=true" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto group rounded-full px-8 text-lg">
                  {t("hero_cta_1")}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
                </Button>
              </Link>
              <a 
                href="#how-it-works" 
                className="w-full sm:w-auto"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Button variant="ghost" size="lg" className="w-full sm:w-auto rounded-full px-8 border border-slate-700 hover:bg-slate-800 text-white hover:text-white">
                  {t("hero_cta_2")}
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right: AI Mockup Preview */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative lg:h-[600px] flex items-center justify-center lg:justify-end mt-12 lg:mt-0"
          >
            <div className="relative w-full max-w-md perspective-[1000px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/30 to-accent/30 rounded-[2rem] blur-2xl transform -rotate-6" />
              
              <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 p-6 rounded-[2rem] shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-700/50">
                  <div className="w-16 h-16 rounded-xl overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=200&h=200" alt="Product Scan" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 w-full h-1 bg-secondary shadow-[0_0_10px_#0d9488] animate-scan-beam" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Ceramic Bowl</h3>
                    <p className="text-secondary text-sm font-medium flex items-center gap-1">Scanning Market Trends<span className="animate-pulse">...</span></p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-accent-light" />
                      <span className="text-gray-300 font-medium">Demand Score</span>
                    </div>
                    <span className="text-white font-bold text-lg">94/100</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <Mic className="w-5 h-5 text-secondary" />
                      <span className="text-gray-300 font-medium">Voice Mentor</span>
                    </div>
                    <Badge variant="success" className="bg-teal-500/20 text-teal-300 border-teal-500/30 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse-dot" /> Online
                    </Badge>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <p className="text-sm text-gray-400 leading-relaxed italic">
                    "Consider bundling this with a smaller dish to increase average order value by 15%."
                  </p>
                </div>
                
                <div className="absolute -left-6 top-1/3 bg-slate-800 border border-slate-600/50 rounded-full px-3 py-1.5 shadow-lg flex items-center gap-2 transform -rotate-12 animate-float">
                  <div className="w-2 h-2 rounded-full bg-accent-light animate-pulse-dot" />
                  <span className="text-xs text-slate-300 font-medium whitespace-nowrap">Artisan Detected</span>
                </div>
              </div>

              {/* Floating Element */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 -top-8 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 p-4 rounded-2xl shadow-xl hidden md:flex items-center gap-3"
              >
                <Sparkles className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Suggested Price</p>
                  <p className="text-lg font-bold text-white">₹799 <span className="text-secondary text-sm ml-1">+12%</span></p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Organic Wave Transition */}
        <div className="absolute bottom-0 left-0 right-0 w-full translate-y-px pointer-events-none">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-primary">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 60C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor"/>
          </svg>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative overflow-hidden bg-gradient-to-b from-primary via-orange-50/30 to-rose-50/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none mix-blend-overlay" />
        <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-rose-200/40 rounded-full blur-[120px] pointer-events-none mix-blend-multiply animate-float" />
        <div className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-teal-100/50 rounded-full blur-[120px] pointer-events-none mix-blend-multiply animate-float-delayed" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <Badge variant="accent" className="mb-4 bg-secondary/10 border-secondary/30 text-secondary-dark px-4 py-1.5 rounded-full">{t("nav_how_it_works")}</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight leading-tight">{t("hiw_title")}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-light text-lg">{t("hiw_subtitle")}</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Central Timeline Line (Desktop Only) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
              <svg className="h-full w-[2px]" preserveAspectRatio="none">
                <line x1="0" y1="0" x2="0" y2="100%" stroke="currentColor" className="text-secondary/30" strokeWidth="2" strokeDasharray="8 8" />
                <line x1="0" y1="0" x2="0" y2="100%" stroke="currentColor" className="text-secondary animate-dash-scroll" strokeWidth="2" strokeDasharray="8 8" />
              </svg>
            </div>

            <div className="space-y-24">
              {/* Step 1: Upload */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
              >
                <div className="flex-1 md:text-right md:pr-12 relative w-full">
                  <div className="hidden md:flex absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-4 border-primary z-20 items-center justify-center shadow-lg text-secondary font-bold text-xl">1</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{t("hiw_step1_title")}</h3>
                  <p className="text-slate-600 font-light leading-relaxed">{t("hiw_step1_desc")}</p>
                </div>
                <div className="flex-1 w-full md:pl-12">
                  <Card className="relative overflow-hidden border-2 border-dashed border-secondary/40 p-4 bg-secondary/5 group">
                    <div className="aspect-video rounded-xl overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=400&h=300" alt="Upload" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-secondary/10" />
                      <div className="absolute top-0 left-0 right-0 h-1 bg-secondary shadow-[0_0_15px_#0d9488] animate-scan-beam" />
                    </div>
                  </Card>
                </div>
              </motion.div>

              {/* Step 2: Analysis */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16"
              >
                <div className="flex-1 md:text-left md:pl-12 relative w-full">
                  <div className="hidden md:flex absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-4 border-primary z-20 items-center justify-center shadow-lg text-accent font-bold text-xl">2</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{t("hiw_step2_title")}</h3>
                  <p className="text-slate-600 font-light leading-relaxed">{t("hiw_step2_desc")}</p>
                </div>
                <div className="flex-1 w-full md:pr-12">
                  <Card className="p-6 relative overflow-hidden shadow-xl shadow-accent/5 border-accent/20 bg-white">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-accent" /><span className="font-semibold text-slate-900">Demand Score</span></div>
                      <span className="text-2xl font-bold text-slate-900">94<span className="text-sm text-slate-500 font-normal">/100</span></span>
                    </div>
                    <div className="flex items-end gap-3 h-24 mt-4 relative z-10">
                      {[30, 45, 25, 60, 40, 85, 100].map((h, i) => (
                        <div key={i} className="flex-1 bg-accent/10 rounded-t-sm relative group">
                          <div className="absolute bottom-0 left-0 right-0 bg-accent rounded-t-sm transition-all duration-700 ease-out" style={{ height: `${h}%` }} />
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </motion.div>

              {/* Step 3: Suggestions */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
              >
                <div className="flex-1 md:text-right md:pr-12 relative w-full">
                  <div className="hidden md:flex absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-4 border-primary z-20 items-center justify-center shadow-lg text-teal-500 font-bold text-xl">3</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{t("hiw_step3_title")}</h3>
                  <p className="text-slate-600 font-light leading-relaxed">{t("hiw_step3_desc")}</p>
                </div>
                <div className="flex-1 w-full md:pl-12">
                  <div className="relative h-48 flex items-center justify-center">
                    <div className="absolute inset-0 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
                    <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 left-0 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 z-10">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold">₹</div>
                      <div>
                        <p className="text-xs text-slate-500">Suggested</p>
                        <p className="font-bold text-slate-900">₹799</p>
                      </div>
                    </motion.div>
                    <motion.div animate={{ y: [5, -5, 5] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-4 right-0 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 z-20">
                      <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500"><Package className="w-4 h-4" /></div>
                      <div>
                        <p className="text-xs text-slate-500">Eco-Package</p>
                        <p className="font-bold text-slate-900">Jute Box</p>
                      </div>
                    </motion.div>
                    <motion.div animate={{ y: [-3, 6, -3] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 z-0">
                      <div className="w-8 h-8 rounded-full bg-accent-light/10 flex items-center justify-center text-accent-light"><Smartphone className="w-4 h-4" /></div>
                      <div>
                        <p className="text-xs text-slate-500">Instagram</p>
                        <p className="font-bold text-slate-900">Ready</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Step 4: Voice Mentor */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16"
              >
                <div className="flex-1 md:text-left md:pl-12 relative w-full">
                  <div className="hidden md:flex absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-4 border-primary z-20 items-center justify-center shadow-lg text-secondary font-bold text-xl">4</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{t("hiw_step4_title")}</h3>
                  <p className="text-slate-600 font-light leading-relaxed">{t("hiw_step4_desc")}</p>
                </div>
                <div className="flex-1 w-full md:pr-12">
                  <Card className="p-8 flex flex-col items-center justify-center bg-slate-900 border-slate-800 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-6 relative shadow-[0_0_30px_rgba(13,148,136,0.3)]">
                      <div className="absolute inset-0 rounded-full border border-secondary animate-ping opacity-20" />
                      <Mic className="w-8 h-8 text-secondary relative z-10" />
                      <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-teal-400 animate-pulse-dot z-20" />
                    </div>
                    <div className="flex items-center gap-1.5 h-8 relative z-10">
                      <div className="w-1.5 bg-secondary rounded-full animate-waveform" />
                      <div className="w-1.5 bg-secondary rounded-full animate-waveform" />
                      <div className="w-1.5 bg-secondary rounded-full animate-waveform" />
                      <div className="w-1.5 bg-secondary rounded-full animate-waveform" />
                      <div className="w-1.5 bg-secondary rounded-full animate-waveform" />
                    </div>
                    <p className="text-slate-400 text-sm mt-4 font-medium tracking-wide relative z-10">Speaking in Hindi...</p>
                  </Card>
                </div>
              </motion.div>

              {/* Step 5: Grow & Sell */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
              >
                <div className="flex-1 md:text-right md:pr-12 relative w-full">
                  <div className="hidden md:flex absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-4 border-primary z-20 items-center justify-center shadow-lg text-accent-light font-bold text-xl">5</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{t("hiw_step5_title")}</h3>
                  <p className="text-slate-600 font-light leading-relaxed">{t("hiw_step5_desc")}</p>
                </div>
                <div className="flex-1 w-full md:pl-12">
                  <Card className="p-6 bg-gradient-to-br from-rose-50 to-orange-50 border-accent-light/20 shadow-xl relative overflow-hidden group">
                    <div className="absolute -right-6 -bottom-6 text-accent-light/10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                      <TrendingUp className="w-40 h-40" />
                    </div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500 font-medium mb-1">Monthly Sales</p>
                        <p className="text-3xl font-bold text-slate-900">₹45,200</p>
                      </div>
                      <Badge variant="accent" className="bg-white/80 backdrop-blur-sm text-accent-light font-bold shadow-lg shadow-accent-light/10 px-3 py-1.5">+145%</Badge>
                    </div>
                  </Card>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* Trusted Artisans Mosaic */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px]">
              <div className="absolute top-0 left-0 w-2/3 h-2/3 rounded-3xl overflow-hidden shadow-2xl group hover:-translate-y-2 transition-transform duration-500 z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />
                <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600&h=600" alt="Weaving" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <p className="absolute bottom-4 left-4 text-white font-medium z-20 flex items-center gap-2"><Sparkles className="w-4 h-4 text-secondary" /> Heritage Textiles</p>
              </div>
              <div className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-3xl overflow-hidden shadow-2xl group hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />
                <img src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=600&h=600" alt="Pottery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <p className="absolute bottom-4 left-4 text-white font-medium z-20 flex items-center gap-2"><Sparkles className="w-4 h-4 text-accent" /> Modern Ceramics</p>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.15)] z-20 animate-float">
                <p className="text-sm text-slate-500 font-medium text-center">Avg. Growth</p>
                <p className="text-3xl font-bold text-slate-900">+124%</p>
              </div>
            </div>
            <div>
              <Badge variant="accent" className="mb-4 bg-accent/10 border-accent/30 text-accent-light px-4 py-1.5 rounded-full backdrop-blur-md inline-flex">{t("hero_badge")}</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight leading-tight">Elevating India's <span className="text-gradient">Handcrafted Future</span></h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed font-light">Join thousands of women artisans and micro-entrepreneurs who are using SheLeads AI to modernize their business, understand market demand, and scale globally.</p>
              <ul className="space-y-4 mb-8">
                {['Real-time demand forecasting', 'Automated pricing strategies', 'Culturally aware voice mentorship'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center">
                      <ShieldCheck className="w-3 h-3 text-secondary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-shadow shadow-secondary/20 group">
                Meet our creators <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-rose-50/40 via-teal-50/30 to-purple-50/40">
        <div className="absolute inset-0 bg-artisan-pattern opacity-[0.2] pointer-events-none mix-blend-overlay" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-200/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-200/50 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10 animate-float" />
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-slate-900">{t("success_title")}</h2>
            <p className="text-slate-700 max-w-2xl mx-auto font-light text-lg">{t("success_subtitle")}</p>
          </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {successStories.map((story, idx) => (
            <motion.div key={idx} variants={itemVariants} className={`mt-${idx % 2 === 0 ? '0' : '8'}`}>
              <Card className="relative overflow-hidden group h-full hover:shadow-2xl hover:shadow-secondary/5 transition-all duration-500 hover:-translate-y-2">
                <div className="absolute top-0 right-0 p-5 z-10">
                  <Badge variant="success" className="font-bold shadow-lg shadow-teal-500/20">{story.increase} {t("success_sales")}</Badge>
                </div>
                <div className="flex items-center gap-5 mb-6 mt-4 relative z-10">
                  <img src={story.image} alt={story.name} className="w-16 h-16 rounded-full object-cover border-2 border-glass-border group-hover:border-accent-light transition-colors duration-300" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-lg">{story.name}</h4>
                    <p className="text-sm text-slate-600 font-light">{story.business}</p>
                  </div>
                </div>
                <p className="text-slate-700 italic leading-relaxed relative z-10 font-light">"{story.quote}"</p>
                <div className="absolute -bottom-6 -right-6 text-accent/5 group-hover:text-accent/10 group-hover:scale-110 transition-all duration-500">
                  <TrendingUp className="w-40 h-40" />
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 mb-10">
        <Card className="max-w-6xl mx-auto bg-gradient-to-br from-white to-gray-50 border-accent/20 relative overflow-hidden shadow-2xl p-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-stretch">
            <div className="w-full md:w-2/5 min-h-[300px] relative hidden md:block">
              <img src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&q=80&w=600&h=800" alt="Empowered entrepreneur" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white" />
            </div>
            <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center text-center md:text-left items-center md:items-start">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 tracking-tight">{t("cta_title")}</h2>
              <p className="text-slate-700 max-w-md flex items-center justify-center md:justify-start gap-2 font-light mb-8">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                {t("cta_subtitle")}
              </p>
              <div>
                <Link to="/auth?signup=true" className="inline-block w-full md:w-auto">
                  <Button size="lg" className="animate-pulse-glow w-full md:w-auto rounded-full text-lg shadow-accent/20 font-semibold px-8">
                    {t("cta_button")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
