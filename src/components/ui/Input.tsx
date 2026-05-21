import { cn } from "@/lib/cn";

const baseField =
  "w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-vg-pewter focus:border-vg-vivid focus:outline-none focus:ring-1 focus:ring-vg-vivid/40 rounded-[2px] transition-colors";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(baseField, props.className)} />;
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(baseField, "appearance-none cursor-pointer pr-9", className)} {...props}>
      {children}
    </select>
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(baseField, "min-h-[120px] resize-vertical", props.className)}
    />
  );
}

export function Label({
  children,
  className,
  htmlFor,
}: {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "block font-accent text-[10px] font-bold uppercase tracking-[2px] text-vg-pewter mb-2",
        className,
      )}
    >
      {children}
    </label>
  );
}
