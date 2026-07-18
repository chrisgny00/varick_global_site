import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PropertyCard } from "@/components/idx/PropertyCard";
import { CTABand } from "@/components/sections/CTABand";
import { neighborhoods, getNeighborhood } from "@/lib/data/neighborhoods";
import { properties } from "@/lib/data/properties";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export async function generateStaticParams() {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = getNeighborhood(slug);
  if (!n) return pageMeta({ title: "Neighborhood", description: "", path: `/neighborhoods/${slug}` });
  return pageMeta({
    title: `${n.name} Real Estate — Luxury Homes for Sale`,
    description: `${n.name}, ${n.county} luxury real estate. ${n.intro.slice(0, 100)}…`,
    path: `/neighborhoods/${n.slug}`,
  });
}

export default async function NeighborhoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = getNeighborhood(slug);
  if (!n) notFound();

  const filtered = properties.filter(
    (p) => p.city.toLowerCase().includes(n.name.toLowerCase()) || p.address.toLowerCase().includes(n.name.toLowerCase()),
  );

  const related = neighborhoods.filter((x) => x.county === n.county && x.slug !== n.slug).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow={`${n.county} County`}
        title={`Luxury Real Estate in ${n.name}`}
        italicWord={n.name}
        subtitle={n.intro}
      />

      <section className="py-12">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Stat label="Median Price" value={n.stats.medianPrice} />
            <Stat label="Days on Market" value={n.stats.daysOnMarket.toString()} />
            <Stat label="Price / Sqft" value={n.stats.pricePerSqft} />
            <Stat label="Active Listings" value={n.stats.activeListings.toString()} />
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <h2 className="display-h2 text-white mb-8">{n.name} Listings</h2>
          {filtered.length === 0 ? (
            <p className="text-vg-pewter">
              No active listings on the public IDX feed for {n.name} at the moment — we have off-market
              opportunities. <Link href="/contact" className="text-vg-vivid hover:underline">Request access</Link>.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {related.length > 0 && (
        <section className="py-16 border-t" style={{ borderTopColor: "rgba(255,255,255,0.08)" }}>
          <Container>
            <h2 className="display-h2 text-white mb-8">Nearby in {n.county}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/neighborhoods/${r.slug}`}
                  className="bg-vg-card border rounded-[4px] p-5 hover:border-vg-vivid/50 transition-colors"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <div className="display-h3 text-white">{r.name}</div>
                  <div className="text-[12px] text-vg-pewter mt-1">{r.stats.medianPrice} median</div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTABand
        eyebrow={`${n.name} Advisor`}
        title="Local expertise"
        italicWord="expertise"
        subtitle={`Speak with a Varick Global advisor specializing in ${n.name}.`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Neighborhoods", url: "/neighborhoods" },
              { name: n.name, url: `/neighborhoods/${n.slug}` },
            ]),
          ),
        }}
      />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="bg-vg-card border rounded-[4px] p-6"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="font-display text-3xl text-white font-light">{value}</div>
      <div className="mt-2 font-accent text-[10px] font-bold uppercase tracking-[2px] text-vg-vivid">
        {label}
      </div>
    </div>
  );
}
