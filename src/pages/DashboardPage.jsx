import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Upload, Sparkles, TrendingUp, Mic, Leaf, Image as ImageIcon, 
  BarChart3, Activity, Clock, X, CheckCircle, Wand2, Camera, Megaphone, Users, Target
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { useLanguage } from "../context/LanguageContext";

const data = [
  { name: 'Mon', demand: 4000, price: 2400 },
  { name: 'Tue', demand: 3000, price: 1398 },
  { name: 'Wed', demand: 2000, price: 9800 },
  { name: 'Thu', demand: 2780, price: 3908 },
  { name: 'Fri', demand: 1890, price: 4800 },
  { name: 'Sat', demand: 2390, price: 3800 },
  { name: 'Sun', demand: 3490, price: 4300 },
];

export function DashboardPage() {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'photos' | 'ad' | null
  const [isProcessing, setIsProcessing] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);
  const { t } = useLanguage();

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate AI processing
    setTimeout(() => {
      navigate("/result");
    }, 2500);
  };

  const handleAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setProcessComplete(true);
    }, 2500);
  };

  const closeModal = () => {
    setActiveModal(null);
    setTimeout(() => {
      setIsProcessing(false);
      setProcessComplete(false);
    }, 300); // reset after animation
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Ambient Dashboard Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-rose-50/20 to-teal-50/20 pointer-events-none -z-20" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-float mix-blend-multiply" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-float-delayed mix-blend-multiply" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-rose-200/20 rounded-full blur-[100px] pointer-events-none -z-10 animate-float mix-blend-multiply" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 relative z-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">{t("dash_welcome")}</h1>
          <p className="text-slate-600 font-light">{t("dash_subtitle")}</p>
        </div>
        <div className="flex items-center gap-3 bg-glass-bg border border-glass-border rounded-full px-5 py-2 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
          <span className="text-sm text-slate-700 font-medium">{t("dash_mentor_online")}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full ml-2 bg-slate-100 text-accent-light hover:text-slate-900 hover:bg-accent/20 transition-colors">
            <Mic className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Main Actions */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Upload Section */}
          <Card className={`relative overflow-hidden transition-all duration-500 ${isUploading ? 'border-secondary shadow-[0_0_30px_rgba(20,184,166,0.3)]' : 'border-secondary/30'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent pointer-events-none" />
            
            {/* Scan Animation Overlay */}
            {isUploading && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent animate-scan shadow-[0_0_15px_rgba(20,184,166,0.8)]" />
              </div>
            )}

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <Badge variant="accent" className="mb-4 bg-accent/10 border-accent/30 text-accent-light px-3 py-1">
                  <Sparkles className="w-3 h-3 mr-1.5" /> {t("dash_new_feature")}
                </Badge>
                <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{t("dash_ai_analyzer")}</h2>
                <p className="text-base text-slate-600 mb-4 leading-relaxed font-light">
                  {t("dash_ai_desc")}
                </p>
              </div>
              <div className="w-full md:w-72">
                <button 
                  onClick={handleUpload}
                  disabled={isUploading}
                  className={`relative w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-4 transition-all duration-500 overflow-hidden ${
                    isUploading ? 'border-secondary bg-secondary/10' : 'border-slate-300 hover:border-secondary hover:bg-secondary/5 cursor-pointer hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] group'
                  }`}
                >
                  {isUploading ? (
                    <>
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full border-2 border-secondary/20 border-t-secondary animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
                        </div>
                      </div>
                      <span className="text-sm text-secondary font-medium tracking-wide">{t("dash_analyzing")}</span>
                    </>
                  ) : (
                    <>
                      <div className="p-4 bg-slate-100 rounded-full text-slate-500 group-hover:text-secondary group-hover:scale-110 transition-all duration-300 shadow-inner">
                        <Upload className="w-7 h-7" />
                      </div>
                      <span className="text-sm text-slate-700 font-medium">{t("dash_upload_btn")}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </Card>

          {/* Analytics Chart */}
          <Card>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-secondary" />
                {t("dash_market_trends")}
              </h3>
              <select className="bg-white/80 backdrop-blur-md border border-slate-200 text-sm rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-secondary transition-colors cursor-pointer shadow-sm">
                <option>{t("dash_cat_handicrafts")}</option>
                <option>{t("dash_cat_textiles")}</option>
                <option>{t("dash_cat_spices")}</option>
              </select>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    itemStyle={{ color: '#0f172a' }}
                  />
                  <Area type="monotone" dataKey="demand" stroke="var(--color-secondary)" strokeWidth={3} fillOpacity={1} fill="url(#colorDemand)" activeDot={{ r: 6, strokeWidth: 0, fill: "var(--color-secondary)" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Right Column - Side Widgets */}
        <div className="space-y-6 lg:-mt-8 relative z-20">
          
          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5">{t("dash_quick_tools")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveModal('photos')}
                className="flex flex-col items-center justify-center p-5 rounded-xl bg-glass-bg border border-glass-border hover:bg-slate-50/50 hover:border-secondary/50 hover:-translate-y-1 transition-all duration-300 group"
              >
                <ImageIcon className="w-6 h-6 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-xs text-slate-700 font-medium">{t("dash_edit_photos")}</span>
              </motion.button>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveModal('ad')}
                className="flex flex-col items-center justify-center p-5 rounded-xl bg-glass-bg border border-glass-border hover:bg-slate-50/50 hover:border-accent-light/50 hover:-translate-y-1 transition-all duration-300 group"
              >
                <Activity className="w-6 h-6 text-accent-light mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-xs text-slate-700 font-medium">{t("dash_run_ad")}</span>
              </motion.button>
            </div>
          </Card>

          {/* Eco-Friendly Tips */}
          <Card className="p-6 border-teal-500/20 bg-teal-500/5 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 text-teal-500/10 rotate-12">
              <Leaf className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-teal-500/20 rounded-lg">
                  <Leaf className="w-5 h-5 text-teal-400" />
                </div>
                <h3 className="font-semibold text-slate-900">{t("dash_sus_tip_title")}</h3>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-4 font-light">
                {t("dash_sus_tip_desc")}
              </p>
              <a href="#" className="text-xs text-teal-400 hover:text-teal-300 hover:underline font-medium transition-colors">{t("dash_read_more")} &rarr;</a>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5">{t("dash_recent_scans")}</h3>
            <div className="space-y-5">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-glass-bg border border-glass-border flex flex-shrink-0 items-center justify-center overflow-hidden group-hover:border-secondary/50 transition-colors">
                    <img src={`https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=100&h=100`} alt="product" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate group-hover:text-secondary transition-colors">{t("dash_scan_item")}</p>
                    <div className="flex items-center text-xs text-slate-500 mt-1.5 font-light">
                      <Clock className="w-3 h-3 mr-1.5" />
                      {t("dash_time_ago")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-xs h-9 hover:bg-slate-100/50 border border-transparent hover:border-slate-200 text-slate-600">{t("dash_view_all")}</Button>
          </Card>

        </div>
      </div>

      {/* Modal Overlays */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md bg-white/90 backdrop-blur-xl border border-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="absolute top-4 right-4 z-10">
                <button onClick={closeModal} className="p-2 bg-slate-100/50 hover:bg-slate-200 backdrop-blur-sm rounded-full text-slate-600 hover:text-slate-900 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Photos Modal Content */}
              {activeModal === 'photos' && (
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl shadow-inner">
                      <Wand2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">AI Photo Enhancer</h2>
                      <p className="text-sm text-slate-500">Make your products shine.</p>
                    </div>
                  </div>

                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-6 border border-slate-200 shadow-inner group">
                    <img 
                      src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800" 
                      alt="Product" 
                      className={`w-full h-full object-cover transition-all duration-1000 ${processComplete ? 'brightness-110 contrast-110 saturate-150 scale-105' : 'brightness-90 contrast-90'}`}
                    />
                    
                    {/* Scanning Animation */}
                    {isProcessing && (
                      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                        <div className="w-full h-1 bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-scan-vertical" />
                        <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay animate-pulse" />
                      </div>
                    )}

                    {/* Success Overlay effect */}
                    {processComplete && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent pointer-events-none"
                      />
                    )}
                  </div>

                  {!processComplete ? (
                    <div className="space-y-4">
                      {['Background Cleanup', 'Brightness Enhancement', 'Instagram Ready Color'].map((opt, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white/50 hover:bg-blue-50/50 transition-colors">
                          <span className="text-sm text-slate-700 font-medium">{opt}</span>
                          <div className="w-10 h-5 bg-blue-500 rounded-full relative shadow-inner cursor-pointer">
                            <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                          </div>
                        </div>
                      ))}
                      <Button onClick={handleAction} disabled={isProcessing} className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                        {isProcessing ? (
                          <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Enhancing...</div>
                        ) : 'Enhance Photo'}
                      </Button>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-500 mb-3 shadow-inner">
                        <CheckCircle className="w-7 h-7" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Enhancement Complete!</h3>
                      <p className="text-sm text-slate-500 mb-6">Your product is now ready for the spotlight.</p>
                      <Button onClick={closeModal} className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg">View in Gallery</Button>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Ad Modal Content */}
              {activeModal === 'ad' && (
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-accent/10 text-accent-light rounded-2xl shadow-inner">
                      <Megaphone className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Run Smart Ad</h2>
                      <p className="text-sm text-slate-500">Reach more customers automatically.</p>
                    </div>
                  </div>

                  {!processComplete ? (
                    <div className="space-y-6">
                      <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Target Audience</label>
                        <div className="p-3.5 rounded-xl border border-slate-200 bg-white/50 flex items-center gap-3">
                          <Target className="w-5 h-5 text-slate-400" />
                          <span className="text-sm text-slate-700 font-medium">Eco-conscious buyers in Metro Cities</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Daily Budget</label>
                        <div className="p-3.5 rounded-xl border border-slate-200 bg-white/50 font-medium text-slate-700 flex justify-between items-center">
                          <span>₹200 / day</span>
                          <span className="text-accent-light text-xs bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">Recommended</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button onClick={handleAction} disabled={isProcessing} className="w-full bg-accent hover:bg-accent-light text-white shadow-lg shadow-accent/20 h-12">
                          {isProcessing ? (
                            <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Generating Campaign...</div>
                          ) : 'Launch Campaign'}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div className="bg-green-50 border border-green-100 rounded-2xl p-5 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/30 rounded-full blur-2xl pointer-events-none" />
                        <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
                        <h3 className="font-bold text-green-800 text-lg">Campaign is Live!</h3>
                        <p className="text-sm text-green-600/80">Your ad is now running successfully.</p>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">AI Generated Caption</h4>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-700 italic relative">
                          <div className="absolute top-4 left-4 text-slate-200">"</div>
                          <p className="relative z-10 pl-2">Bring artisan elegance to your home. 🌿 Our handcrafted terracotta vases are made with love and tradition. Perfect for your living room! ✨ #HandmadeIndia #VocalForLocal</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm text-center">
                          <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                          <div className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Est. Reach</div>
                          <div className="font-bold text-slate-900 text-lg">12K - 15K</div>
                        </div>
                        <div className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm text-center">
                          <Camera className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                          <div className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Platform</div>
                          <div className="font-bold text-slate-900 text-lg">Instagram</div>
                        </div>
                      </div>
                      
                      <Button onClick={closeModal} variant="outline" className="w-full mt-2 h-11 border-slate-200 text-slate-600 hover:bg-slate-50">Back to Dashboard</Button>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
