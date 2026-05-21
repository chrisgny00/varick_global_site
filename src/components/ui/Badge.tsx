import { cn } from "@/lib/cn";

type Variant = "crimson" | "gold" | "neutral" | "elite" | "outline";

const variants: Record<Variant, string> = {
  crimson: "bg-vg-crimson/10 text-vg-vivid border-vg-crimson/30",
  gold: "bg-vg-gold/10 text-vg-gold-light border-vg-gold/40",
  neutral: "bg-white/5 text-vg-pewter border-white/10",
  elite: "bg-elite-violet/15 text-elite-violet-light border-elite-violet/40",
  outline: "bg-transparent text-white border-white/20",
};

export function Badge({
  variant = "crimson",
  className,
  children,
}: {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 border px-3 py-1.5 font-accent text-[10px] font-bold uppercase tracking-[1.8px] rounded-[2px]",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
