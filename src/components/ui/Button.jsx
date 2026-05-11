import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

const variants = {
  primary: "bg-gradient-to-r from-secondary to-teal-500 text-white shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30",
  secondary: "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 shadow-sm",
  accent: "bg-gradient-to-r from-accent to-pink-500 text-white shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 font-semibold",
  ghost: "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100/50",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-14 px-8 text-lg font-medium",
  icon: "h-11 w-11 flex items-center justify-center p-0",
};

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  asChild = false, 
  children,
  ...props 
}, ref) => {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export { Button };
