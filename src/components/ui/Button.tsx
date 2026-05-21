import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost" | "elite";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 font-accent font-bold uppercase tracking-[2.5px] text-[11px] rounded-[2px] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5",
  md: "px-7 py-3.5",
  lg: "px-9 py-4",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-vg-crimson text-white hover:bg-vg-vivid border border-vg-crimson hover:border-vg-vivid",
  outline:
    "bg-transparent text-white border border-white/30 hover:border-vg-vivid hover:text-vg-vivid",
  ghost:
    "bg-transparent text-vg-vivid border-b border-vg-vivid/40 hover:border-vg-vivid rounded-none px-0",
  elite:
    "bg-elite-violet text-white hover:bg-elite-violet-light border border-elite-violet",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  target,
  rel,
}: BaseProps & {
  href: string;
  target?: string;
  rel?: string;
}) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={cn(base, sizes[size], variants[variant], className)}
    >
      {children}
    </Link>
  );
}
