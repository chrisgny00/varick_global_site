import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PropertyCard } from "@/components/idx/PropertyCard";
import { FilterPanel } from "@/components/idx/FilterPanel";
import { SearchBar } from "@/components/idx/SearchBar";
import { fetchListings } from "@/lib/repliers";
import { properties as mockProperties, filterProperties, type PropertyFilters } from "@/lib/data/properties";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Luxury Properties for Sale & Rent — South Florida",
  description:
    "Browse Varick Global's curated luxury inventory across Miami-Dade, Broward and Palm Beach — residential, commercial and waterfront.",
  path: "/properties",
});

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const toStr = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

  const txType = toStr(sp.transactionType);
  const city = toStr(sp.city);
  const minPrice = sp.minPrice ? Number(toStr(sp.minPrice)) : undefined;
  const maxPrice = sp.maxPrice ? Number(toStr(sp.maxPrice)) : undefined;
  const beds = sp.beds ? Number(toStr(sp.beds)) : undefined;

  // Try Repliers live data; gracefully fall back to mock data
  const { properties: live, total } = await fetchListings({
    type: txType === "rent" ? "lease" : txType === "commercial" ? undefined : "sale",
    class: txType === "commercial" ? "CommercialProperty" : undefined,
    city,
    minPrice,
    maxPrice,
    minBedrooms: beds,
    resultsPerPage: 24,
  });

  const useLive = live.length > 0;

  const results = useLive
    ? live
    : filterProperties(mockProperties, {
        transactionType: txType,
        city,
        county: toStr(sp.county),
        minPrice,
        maxPrice,
        beds,
        baths: sp.baths ? Number(toStr(sp.baths)) : undefined,
        propertyType: toStr(sp.propertyType),
        q: toStr(sp.q),
      } as PropertyFilters);

  const count = useLive ? total : results.length;

  return (
    <>
      <PageHero
        eyebrow="The Inventory"
        title="South Florida Properties"
        italicWord="Properties"
        subtitle="A curated selection of active listings — refine by location, price, type and signature luxury features."
      />

      <section className="py-12">
        <Container>
          <SearchBar />
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
              <FilterPanel />
            </div>

            <div className="lg:col-span-9">
              <div className="flex items-center justify-between mb-6">
                <p className="text-vg-pewter text-sm">
                  <span className="text-vg-onyx font-semibold">{count.toLocaleString()}</span>{" "}
                  {count === 1 ? "listing" : "listings"}
                  {useLive && (
                    <span className="ml-2 font-accent text-[10px] font-bold uppercase tracking-[2px] text-vg-crimson">
                      Live MLS
                    </span>
                  )}
                </p>
              </div>

              {results.length === 0 ? (
                <div
                  className="bg-vg-card border rounded-[4px] p-12 text-center"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <p className="text-vg-pewter">
                    No listings match these filters. Try broadening your criteria.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {results.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Properties", url: "/properties" },
            ]),
          ),
        }}
      />
    </>
  );
}
