import { Link, useLocation } from "react-router-dom";
import { Sparkles, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/Button";
import { useLanguage } from "../../context/LanguageContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { name: t("nav_how_it_works"), path: "/#how-it-works" },
    { name: t("nav_dashboard"), path: "/dashboard" },
    { name: t("footer_voice_mentor"), path: "/mentor" },
  ];

  return (
    <nav className="fixed top-4 inset-x-4 max-w-7xl mx-auto z-50 bg-white/80 backdrop-blur-xl border border-white/50 rounded-full shadow-lg shadow-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-br from-secondary to-accent rounded-xl group-hover:shadow-lg group-hover:shadow-secondary/20 transition-all">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-slate-900">
              SheLeads <span className="text-secondary">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  location.pathname === link.path ? "text-secondary" : "text-slate-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Globe className="w-4 h-4 text-secondary" />
              {language === "en" ? "EN" : "हिन्दी"}
            </button>

            <Link to="/auth">
              <Button variant="secondary" size="sm">{t("nav_login")}</Button>
            </Link>
            <Link to="/auth?signup=true">
              <Button size="sm" className="shadow-lg shadow-accent/20">{t("nav_get_started")}</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="text-slate-600 hover:text-slate-900 flex items-center"
            >
              <Globe className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl mt-2 mx-auto absolute top-full left-0 right-0 shadow-2xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <Button variant="secondary" className="w-full">{t("nav_login")}</Button>
              </Link>
              <Link to="/auth?signup=true" onClick={() => setIsOpen(false)}>
                <Button className="w-full">{t("nav_get_started")}</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
