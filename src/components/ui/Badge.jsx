import { cn } from "../../lib/utils";

function Badge({ className, variant = "default", children, ...props }) {
  const variants = {
    default: "bg-blue-100 text-blue-800 border border-blue-200",
    success: "bg-teal-100 text-teal-800 border border-teal-200",
    warning: "bg-amber-100 text-amber-800 border border-amber-200",
    accent: "bg-purple-100 text-purple-800 border border-purple-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
