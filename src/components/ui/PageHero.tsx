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
            style={variant === "elite" ? { color: "#6D47D9" } : undefined}
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
            ? "linear-gradient(135deg, #3A2569 0%, #1A1A1A 50%, #3A2569 100%)"
            : "#1A1A1A",
      }}
    >
      <div className="absolute inset-0 diagonal-lines opacity-30 pointer-events-none" />
      <Container className="relative">
        <div className="max-w-3xl">
          {eyebrow && (
            <div
              className="eyebrow mb-5"
              style={variant === "elite" ? { color: "#6D47D9" } : undefined}
            >
              {eyebrow}
            </div>
          )}
          <h1 className="display-hero text-white">{renderTitle()}</h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl text-white/60 text-lg leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
