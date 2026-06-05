import { Container } from "@/components/ui/Container";

export function PageHero({
  eyebrow,
  title,
  italicWord,
  subtitle,
  variant = "default",
}: {
  eyebrow?: string;
  title: string;
  italicWord?: string;
  subtitle?: string;
  variant?: "default" | "elite";
}) {
  const renderTitle = () => {
    if (italicWord && title.includes(italicWord)) {
      const parts = title.split(italicWord);
      return (
        <>
          {parts[0]}
          <em
            className={variant === "elite" ? "italic" : "italic-accent"}
            style={variant === "elite" ? { color: "#fac9b8" } : undefined}
          >
            {italicWord}
          </em>
          {parts[1]}
        </>
      );
    }
    return title;
  };

  return (
    <section
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden"
      style={{
        background:
          variant === "elite"
            ? "linear-gradient(135deg, #1f1828 0%, #444054 50%, #2f243a 100%)"
            : "linear-gradient(135deg, #2f243a 0%, #3a2e47 50%, #2f243a 100%)",
      }}
    >
      <div className="absolute inset-0 diagonal-lines opacity-40 pointer-events-none" />
      <Container className="relative">
        <div className="max-w-3xl">
          {eyebrow && (
            <div
              className="eyebrow mb-5"
              style={variant === "elite" ? { color: "#fac9b8" } : undefined}
            >
              {eyebrow}
            </div>
          )}
          <h1 className="display-hero text-white">{renderTitle()}</h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl text-vg-pewter text-lg leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
