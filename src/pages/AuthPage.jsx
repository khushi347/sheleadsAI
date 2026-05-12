import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, User, ArrowRight } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useLanguage } from "../context/LanguageContext";

export function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    if (searchParams.get("signup") === "true") {
      setIsLogin(false);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login/signup and redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 border-t-4 border-t-accent">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {isLogin ? t("auth_welcome_back") : t("auth_create_account")}
            </h2>
            <p className="text-slate-600 text-sm">
              {isLogin 
                ? t("auth_login_desc") 
                : t("auth_signup_desc")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 ml-1">{t("auth_full_name")}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input type="text" placeholder="Meera Devi" className="pl-10" required />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ml-1">{t("auth_email")}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input type="email" placeholder="meera@example.com" className="pl-10" required />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-slate-700">{t("auth_password")}</label>
                {isLogin && <a href="#" className="text-xs text-secondary hover:underline">{t("auth_forgot")}</a>}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input type="password" placeholder="••••••••" className="pl-10" required />
              </div>
            </div>

            <Button type="submit" className="w-full mt-6 group">
              {isLogin ? t("auth_signin_btn") : t("auth_signup_btn")}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            {isLogin ? `${t("auth_no_account")} ` : `${t("auth_has_account")} `}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-secondary font-medium hover:underline focus:outline-none"
            >
              {isLogin ? t("auth_signup_link") : t("auth_login_link")}
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
