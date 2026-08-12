import { cn } from "@/lib/cn";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  italicWord,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  italicWord?: string;
}) {
  const renderTitle = () => {
    if (italicWord && typeof title === "string" && title.includes(italicWord)) {
      const [before, after] = title.split(italicWord);
      return (
        <>
          {before}
          <em className="italic-accent">{italicWord}</em>
          {after}
        </>
      );
    }
    return title;
  };

  return (
    <div
      className={cn(
        "mb-12 md:mb-16 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <div className="eyebrow mb-5">{eyebrow}</div>}
      <h2 className="display-h2 text-vg-onyx">{renderTitle()}</h2>
      {subtitle && (
        <p className="mt-5 text-vg-pewter text-base md:text-[15px] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
