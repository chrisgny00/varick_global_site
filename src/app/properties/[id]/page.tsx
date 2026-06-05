import { notFound } from "next/navigation";
import Link from "next/link";
import { Bed, Bath, Square, MapPin, Calendar, Tag, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { PropertyCard } from "@/components/idx/PropertyCard";
import { Button, ButtonLink } from "@/components/ui/Button";
import { properties, getProperty } from "@/lib/data/properties";
import { formatPrice, formatSqft } from "@/lib/format";
import { pageMeta, breadcrumbSchema, offerSchema, siteConfig } from "@/lib/seo";

export async function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getProperty(id);
  if (!p) return pageMeta({ title: "Property not found", description: "", path: `/properties/${id}` });
  return pageMeta({
    title: `${p.title} — ${p.city}`,
    description: `${formatPrice(p.price, p.transactionType)} · ${p.beds} bd · ${p.baths} ba · ${formatSqft(p.sqft)} sqft. ${p.city}, ${p.county}. Presented by Varick Global.`,
    path: `/properties/${p.id}`,
  });
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getProperty(id);
  if (!p) notFound();

  const similar = properties
    .filter((x) => x.id !== p.id && x.county === p.county && x.transactionType === p.transactionType)
    .slice(0, 3);

  return (
    <>
      <section
        className="pt-24 pb-12"
        style={{
          background: "linear-gradient(135deg, #2f243a 0%, #3a2e47 50%, #2f243a 100%)",
        }}
      >
        <Container>
          <div className="text-[12px] text-vg-pewter mb-5">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/properties" className="hover:text-white">Properties</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{p.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {p.badge && <Badge variant="crimson">{p.badge}</Badge>}
                <Badge variant="neutral">{p.propertyType}</Badge>
                <Badge variant="outline">{p.status}</Badge>
              </div>
              <h1 className="display-h2 text-white">{p.title}</h1>
              <p className="mt-3 inline-flex items-center gap-2 text-vg-pewter">
                <MapPin className="h-4 w-4 text-vg-vivid" />
                {p.address}, {p.city}, FL · {p.county} County
              </p>
            </div>

            <div className="lg:col-span-4">
              <div
                className="bg-vg-card border rounded-[4px] p-7"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div className="font-display text-4xl text-vg-vivid font-light">
                  {formatPrice(p.price, p.transactionType)}
                </div>
                <div
                  className="mt-5 pt-5 border-t grid grid-cols-3 gap-3 text-center text-[12px] text-vg-pewter"
                  style={{ borderTopColor: "rgba(255,255,255,0.08)" }}
                >
                  <div>
                    <div className="font-display text-2xl text-white">{p.beds || "—"}</div>
                    <div>Beds</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl text-white">{p.baths || "—"}</div>
                    <div>Baths</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl text-white">{formatSqft(p.sqft)}</div>
                    <div>Sqft</div>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <ButtonLink href={`/contact?listing=${p.id}`} className="w-full" size="md">
                    Request a Showing
                  </ButtonLink>
                  <ButtonLink href={`/valuation?ref=${p.id}`} variant="outline" className="w-full" size="md">
                    Mortgage Calculator
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <div
            className="relative bg-vg-card border rounded-[4px] aspect-[16/9] overflow-hidden flex items-center justify-center"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #3a2e47 0%, #2f243a 50%, #3a2e47 100%)",
              }}
            />
            <div className="diagonal-lines absolute inset-0 opacity-50" />
            <div className="relative font-display text-[180px] font-light text-white/[0.04] tracking-[12px]">
              VG
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <h2 className="display-h2 text-white mb-6">About this property</h2>
              <p className="text-vg-pewter leading-relaxed text-base">
                {p.description ||
                  `${p.title} offers ${p.beds} bedrooms and ${p.baths} bathrooms across ${formatSqft(p.sqft)} square feet in ${p.city}, one of South Florida's most sought-after addresses. Presented exclusively by Varick Global.`}
              </p>

              <div
                className="mt-10 pt-10 border-t grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm"
                style={{ borderTopColor: "rgba(255,255,255,0.08)" }}
              >
                <Spec icon={<Tag className="h-4 w-4" />} label="Type" value={p.propertyType} />
                <Spec icon={<Calendar className="h-4 w-4" />} label="Days on Market" value={p.daysOnMarket.toString()} />
                <Spec icon={<Square className="h-4 w-4" />} label="Square Feet" value={formatSqft(p.sqft)} />
                {p.beds > 0 && <Spec icon={<Bed className="h-4 w-4" />} label="Bedrooms" value={p.beds.toString()} />}
                {p.baths > 0 && <Spec icon={<Bath className="h-4 w-4" />} label="Bathrooms" value={p.baths.toString()} />}
                <Spec icon={<MapPin className="h-4 w-4" />} label="County" value={p.county} />
              </div>

              <div
                className="mt-10 pt-10 border-t"
                style={{ borderTopColor: "rgba(255,255,255,0.08)" }}
              >
                <h3 className="display-h3 text-white mb-5">Signature Features</h3>
                <div className="flex flex-wrap gap-2">
                  {p.features.map((f) => (
                    <Badge key={f} variant="neutral">{f}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div
                className="bg-vg-card border rounded-[4px] p-7 sticky top-20"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div className="eyebrow mb-4">Listing Advisor</div>
                <div className="font-display text-2xl text-white">Chris Gallego</div>
                <div className="text-vg-pewter text-sm mt-1">Founder & Principal Broker</div>
                <div className="mt-6 space-y-3 text-sm">
                  <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2.5 text-white hover:text-vg-vivid">
                    <Phone className="h-4 w-4 text-vg-vivid" />
                    {siteConfig.phoneDisplay}
                  </a>
                  <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2.5 text-white hover:text-vg-vivid break-all">
                    <Mail className="h-4 w-4 text-vg-vivid" />
                    {siteConfig.email}
                  </a>
                </div>
                <ButtonLink href={`/contact?listing=${p.id}`} className="w-full mt-6">
                  Contact Advisor
                </ButtonLink>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {similar.length > 0 && (
        <section className="py-16">
          <Container>
            <h2 className="display-h2 text-white mb-8">Similar listings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similar.map((s) => (
                <PropertyCard key={s.id} property={s} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema(p)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Properties", url: "/properties" },
              { name: p.title, url: `/properties/${p.id}` },
            ]),
          ),
        }}
      />
    </>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-vg-vivid">{icon}</div>
      <div className="mt-2 text-white font-medium">{value}</div>
      <div className="text-[11px] text-vg-pewter font-accent uppercase tracking-[2px] mt-1">{label}</div>
    </div>
  );
}
