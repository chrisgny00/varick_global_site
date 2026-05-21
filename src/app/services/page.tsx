import { PageHero } from "@/components/ui/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CTABand } from "@/components/sections/CTABand";
import { services } from "@/lib/data/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Services — Luxury Real Estate Advisory",
  description:
    "From residential and commercial brokerage to HOA advisory and receivership — explore Varick Global's full advisory spectrum.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Practice"
        title="A full-spectrum advisory"
        italicWord="advisory"
        subtitle="Eight integrated practice areas, one disciplined approach. Built for clients who expect precision."
      />
      <ServicesGrid limit={services.length} />
      <CTABand
        eyebrow="Engage Us"
        title="Tell us your brief"
        italicWord="brief"
      />
    </>
  );
}
