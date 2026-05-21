import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PropertyCard } from "@/components/idx/PropertyCard";
import { CTABand } from "@/components/sections/CTABand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { properties } from "@/lib/data/properties";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Land for Sale South Florida",
  description:
    "Development sites, infill parcels and large-acreage land — Miami-Dade, Broward and Palm Beach. Represented by Varick Global.",
  path: "/land",
});

export default function LandPage() {
  const land = properties.filter((p) => p.propertyType === "Land");

  return (
    <>
      <PageHero
        eyebrow="Land Practice"
        title="Land for Sale South Florida"
        italicWord="South Florida"
        subtitle="Development sites, agricultural acreage, infill parcels and assemblage opportunities — represented by Varick Global."
      />
      <section className="py-16 md:py-20">
        <Container>
          <SectionHeader eyebrow="Active Inventory" title="Available parcels" />
          {land.length === 0 ? (
            <p className="text-vg-pewter">
              Off-market land opportunities are available on request — please contact our team.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {land.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </Container>
      </section>
      <CTABand
        eyebrow="Acquisition or Disposition"
        title="Discuss your site"
        italicWord="site"
      />
    </>
  );
}
