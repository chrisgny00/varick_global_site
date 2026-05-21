import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { PropertyCard } from "@/components/idx/PropertyCard";
import { properties } from "@/lib/data/properties";

export function FeaturedProperties() {
  const featured = properties
    .filter((p) => p.transactionType === "buy" && p.price >= 4_000_000)
    .slice(0, 6);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <SectionHeader
            eyebrow="Featured Properties"
            title="Curated Listings"
            subtitle="A selection of active and off-market opportunities across South Florida."
            className="mb-0"
          />
          <Link
            href="/properties"
            className="font-accent text-[11px] font-bold uppercase tracking-[2px] text-vg-vivid border-b border-vg-vivid/40 hover:border-vg-vivid pb-1 hidden md:inline-block"
          >
            View All Listings →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <ButtonLink href="/properties" variant="outline">
            View All Listings
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
