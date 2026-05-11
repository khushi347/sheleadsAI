import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, CheckCircle2, TrendingUp, Package, Smartphone, 
  Copy, Download, DollarSign, Lightbulb
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { useLanguage } from "../context/LanguageContext";

export function AIResultPage() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Ambient Backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-rose-50/20 to-teal-50/20 pointer-events-none -z-20" />
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-float mix-blend-multiply" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-float-delayed mix-blend-multiply" />
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-rose-200/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-float mix-blend-multiply" />

      <Link to="/dashboard" className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-6 transition-colors relative z-10">
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t("res_back")}
      </Link>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column - Image & Overview */}
        <motion.div variants={itemVariants} className="space-y-6">
          <Card className="p-4 relative overflow-hidden group border-secondary/20">
            <div className="absolute top-6 right-6 z-10">
              <Badge variant="success" className="bg-white/90 backdrop-blur-md">
                <CheckCircle2 className="w-3 h-3 mr-1" /> {t("res_scan_complete")}
              </Badge>
            </div>
            <div className="aspect-square rounded-xl overflow-hidden mb-4 relative">
              <img 
                src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=600&h=600" 
                alt="Analyzed product" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">{t("res_product_name")}</h2>
              <p className="text-slate-600 text-sm">{t("res_detected_cat")}</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-white to-gray-50 border-accent/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-slate-900">{t("res_demand_score")}</h3>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-slate-900">85</span>
              <span className="text-slate-500 mb-1">/ 100</span>
            </div>
            <div className="w-full bg-glass-bg rounded-full h-2 mt-2">
              <div className="bg-gradient-to-r from-accent to-purple-500 h-2 rounded-full w-[85%]" />
            </div>
            <p className="text-sm text-slate-600 mt-3">{t("res_demand_desc")}</p>
          </Card>
        </motion.div>

        {/* Right Column - Recommendations */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6 lg:-mt-6 relative z-20">
          
          {/* Pricing Guidance */}
          <Card className="border-secondary/30 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-6">
              <DollarSign className="w-5 h-5 text-secondary" />
              {t("res_pricing_opt")}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-glass-bg border border-glass-border rounded-xl p-4 text-center">
                <p className="text-sm text-slate-500 mb-1">{t("res_est_cost")}</p>
                <p className="text-xl font-semibold text-slate-900">₹250</p>
              </div>
              <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 text-center transform scale-105 shadow-[0_0_15px_rgba(13,148,136,0.15)]">
                <p className="text-sm text-secondary-dark mb-1 font-medium">{t("res_sugg_price")}</p>
                <p className="text-2xl font-bold text-slate-900">₹799</p>
              </div>
              <div className="bg-glass-bg border border-glass-border rounded-xl p-4 text-center">
                <p className="text-sm text-slate-500 mb-1">{t("res_market_avg")}</p>
                <p className="text-xl font-semibold text-slate-900">₹650</p>
              </div>
            </div>
            
            <div className="bg-blue-50/50 border border-blue-200/50 rounded-lg p-4 flex gap-3">
              <Lightbulb className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700">
                <strong className="text-slate-900 block mb-1">{t("res_why_price")}</strong>
                {t("res_why_desc")}
              </p>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Social Media */}
            <Card className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-pink-500" />
                  {t("res_social_content")}
                </h3>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="bg-glass-bg border border-glass-border rounded-lg p-4 flex-grow mb-4">
                <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {t("res_social_text")}
                </p>
              </div>
              <Button variant="secondary" className="w-full text-sm">{t("res_gen_another")}</Button>
            </Card>

            {/* Packaging */}
            <Card className="flex flex-col border-teal-500/20">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-teal-500" />
                {t("res_pkg_idea")}
              </h3>
              <div className="relative h-32 rounded-lg overflow-hidden mb-4 border border-glass-border">
                <img src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=400&h=200" alt="packaging idea" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2 mb-4 flex-grow">
                <p className="text-sm text-slate-700"><strong>{t("res_pkg_mat_label")}</strong> {t("res_pkg_mat")}</p>
                <p className="text-sm text-slate-700"><strong>{t("res_pkg_cost_label")}</strong> {t("res_pkg_cost")}</p>
                <p className="text-sm text-slate-700"><strong>{t("res_pkg_tip_label")}</strong> {t("res_pkg_tip")}</p>
              </div>
              <Button variant="ghost" className="w-full text-sm border border-glass-border hover:bg-slate-100">
                <Download className="w-4 h-4 mr-2" /> {t("res_dl_vendor")}
              </Button>
            </Card>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
}
