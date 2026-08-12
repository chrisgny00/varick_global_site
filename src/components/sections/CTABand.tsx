import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CTABand({
  eyebrow = "Begin Your Search",
  title = "Ready to begin?",
  italicWord = "begin",
  subtitle = "Speak with a Varick Global advisor. We'll listen first, then translate your brief into the right opportunities.",
  primaryHref = "/contact",
  primaryLabel = "Schedule a Consultation",
  secondaryHref = "/properties",
  secondaryLabel = "Browse Listings",
}: {
  eyebrow?: string;
  title?: string;
  italicWord?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  const renderTitle = () => {
    if (italicWord && title.includes(italicWord)) {
      const parts = title.split(italicWord);
      return (
        <>
          {parts[0]}
          <em className="italic-accent">{italicWord}</em>
          {parts[1]}
        </>
      );
    }
    return title;
  };

  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      style={{
        background: "#1A1A1A",
      }}
    >
      <div className="absolute inset-0 diagonal-lines opacity-50 pointer-events-none" />
      <Container className="text-center relative">
        <div className="eyebrow mb-5">{eyebrow}</div>
        <h2 className="display-h2 text-white max-w-3xl mx-auto">{renderTitle()}</h2>
        <p className="mt-5 text-vg-pewter max-w-xl mx-auto">{subtitle}</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonLink href={primaryHref} variant="primary" size="lg">
            {primaryLabel}
          </ButtonLink>
          <ButtonLink href={secondaryHref} variant="outline" size="lg">
            {secondaryLabel}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
