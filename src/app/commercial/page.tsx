import Link from "next/link";
import { Building2, Warehouse, Building, Store, Map as MapIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PropertyCard } from "@/components/idx/PropertyCard";
import { CTABand } from "@/components/sections/CTABand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { properties } from "@/lib/data/properties";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Commercial Real Estate South Florida",
  description:
    "Office, industrial, retail and multifamily — Varick Global represents commercial owners, tenants and investors across South Florida.",
  path: "/commercial",
});

const verticals = [
  { name: "Office", icon: Building2, desc: "Class A office leasing, sub-leasing and tenant representation across South Florida's financial corridors." },
  { name: "Industrial", icon: Warehouse, desc: "Distribution, last-mile, and flex industrial — sales and leasing in Doral, Medley, and emerging Broward submarkets." },
  { name: "Multi-Family", icon: Building, desc: "Stabilized and value-add multifamily — boutique, mid-market and institutional-grade." },
  { name: "Retail", icon: Store, desc: "High-street and anchored retail leasing, repositioning and investment sales." },
  { name: "Land", icon: MapIcon, desc: "Development sites, infill parcels, and large-acreage transactions." },
];

export default function CommercialPage() {
  const commercial = properties.filter((p) => p.transactionType === "commercial").slice(0, 6);

  return (
    <>
      <PageHero
        eyebrow="Commercial Practice"
        title="Commercial Real Estate"
        italicWord="Real Estate"
        subtitle="Underwriting, leasing and investment-sales advisory for owners, tenants and capital across Miami-Dade, Broward and Palm Beach."
      />

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeader
            eyebrow="Sectors We Cover"
            title="Five disciplined verticals"
            italicWord="disciplined"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {verticals.map((v) => (
              <Link
                key={v.name}
                href={`/properties?propertyType=${v.name}`}
                className="bg-vg-card border rounded-[4px] p-7 hover:border-vg-vivid/50 transition-colors block"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-vg-crimson/10 border border-vg-crimson/30 text-vg-vivid mb-4">
                  <v.icon className="h-5 w-5" />
                </div>
                <div className="display-h3 text-white">{v.name}</div>
                <p className="mt-3 text-[13px] text-vg-pewter leading-relaxed">{v.desc}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeader
            eyebrow="Available Now"
            title="Active commercial listings"
          />
          {commercial.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {commercial.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <CTABand
        eyebrow="Discuss a Mandate"
        title="A confidential conversation"
        italicWord="conversation"
        subtitle="Whether you're underwriting an acquisition or positioning an asset for sale or lease, we'll meet you where you are."
      />
    </>
  );
}
