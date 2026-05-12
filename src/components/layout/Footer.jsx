import { Link } from "react-router-dom";
import { Sparkles, Heart } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-rose-100/50 bg-gradient-to-t from-orange-50/50 via-rose-50/30 to-primary py-12 mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-artisan-pattern opacity-10 pointer-events-none mix-blend-overlay" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="font-heading font-bold text-xl text-slate-900">SheLeads AI</span>
            </Link>
            <p className="text-slate-500 text-sm max-w-sm">
              {t("footer_desc")}
            </p>
          </div>
          
          <div>
            <h4 className="text-slate-900 font-semibold mb-4">{t("footer_platform")}</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/#features" className="hover:text-secondary transition-colors">{t("nav_features")}</Link></li>
              <li><Link to="/dashboard" className="hover:text-secondary transition-colors">{t("nav_dashboard")}</Link></li>
              <li><Link to="/pricing" className="hover:text-secondary transition-colors">{t("footer_pricing_guide")}</Link></li>
              <li><Link to="/mentorship" className="hover:text-secondary transition-colors">{t("footer_voice_mentor")}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-slate-900 font-semibold mb-4">{t("footer_company")}</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/about" className="hover:text-secondary transition-colors">{t("footer_about")}</Link></li>
              <li><Link to="/contact" className="hover:text-secondary transition-colors">{t("footer_contact")}</Link></li>
              <li><Link to="/privacy" className="hover:text-secondary transition-colors">{t("footer_privacy")}</Link></li>
              <li><Link to="/terms" className="hover:text-secondary transition-colors">{t("footer_terms")}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-glass-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} SheLeads AI. {t("footer_rights")}
          </p>
          <p className="text-slate-500 text-sm flex items-center gap-1 mt-4 md:mt-0">
            {t("footer_built_with")} <Heart className="w-4 h-4 text-accent-light fill-accent-light" /> {t("footer_for")}
          </p>
        </div>
      </div>
    </footer>
  );
}
