import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  accent = false,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative bg-vg-card border border-white/8 rounded-[4px] p-8 transition-colors duration-300 hover:border-white/20",
        accent && "border-t-2 border-t-vg-crimson",
        className,
      )}
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      {accent && (
        <div className="absolute -top-px left-0 right-0 h-[2px] bg-vg-crimson" />
      )}
      {children}
    </div>
  );
}
