import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({
  variant = "default",
  className,
}: {
  variant?: "default" | "elite" | "footer";
  className?: string;
}) {
  if (variant === "elite") {
    return (
      <Link href="/elite" className={cn("inline-flex items-baseline gap-1.5", className)}>
        <span className="font-display text-[26px] font-semibold tracking-[2px] text-white">
          VG
        </span>
        <span className="font-accent text-[10px] font-bold uppercase tracking-[4px] text-elite-violet-light">
          Elite
        </span>
      </Link>
    );
  }
  return (
    <Link
      href="/"
      className={cn("inline-flex items-baseline gap-2 font-display", className)}
      aria-label="Varick Global — Home"
    >
      <span className="text-[22px] font-semibold tracking-[3px] text-white">VARICK</span>
      <span className="text-[22px] font-semibold tracking-[3px] text-vg-vivid">GLOBAL</span>
    </Link>
  );
}
