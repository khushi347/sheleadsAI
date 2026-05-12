import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

function Card({ className, children, hover = false, ...props }) {
  const Comp = hover ? motion.div : "div";
  const hoverProps = hover ? {
    whileHover: { y: -5, transition: { duration: 0.2 } }
  } : {};

  return (
    <Comp
      className={cn(
        "glass-panel p-6",
        className
      )}
      {...hoverProps}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Card };
