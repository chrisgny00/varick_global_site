import { cn } from "@/lib/cn";

export function IconBadge({
  children,
  variant = "crimson",
  className,
  size = "md",
}: {
  children: React.ReactNode;
  variant?: "crimson" | "gold" | "elite" | "gradient";
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "h-10 w-10",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };
  const variants = {
    crimson: "bg-vg-crimson/10 text-vg-vivid border border-vg-crimson/30",
    gold: "bg-vg-gold/10 text-vg-gold-light border border-vg-gold/30",
    elite: "bg-elite-violet/15 text-elite-violet-light border border-elite-violet/30",
    gradient:
      "text-white border border-elite-violet/40 bg-[linear-gradient(135deg,#a6192e_0%,#d2203a_100%)]",
  };
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full",
        sizes[size],
        variants[variant],
        className,
      )}
    >
      {children}
    </div>
  );
}
