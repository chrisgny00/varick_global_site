import { notFound } from "next/navigation";
import { Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CTABand } from "@/components/sections/CTABand";
import { agents, getAgent } from "@/lib/data/agents";
import { pageMeta, breadcrumbSchema, personSchema, siteConfig } from "@/lib/seo";

export async function generateStaticParams() {
  return agents.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getAgent(slug);
  if (!a) return pageMeta({ title: "Advisor", description: "", path: `/agents/${slug}` });
  return pageMeta({
    title: `${a.name} — ${a.title}`,
    description: a.bio.slice(0, 150),
    path: `/agents/${a.slug}`,
  });
}

export default async function AgentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getAgent(slug);
  if (!a) notFound();

  return (
    <>
      <section
        className="pt-24 pb-16 md:pt-32"
        style={{
          background:
            "linear-gradient(135deg, #2f243a 0%, #3a2e47 50%, #2f243a 100%)",
        }}
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <div
                className="aspect-[4/5] bg-vg-card border rounded-[4px] relative overflow-hidden flex items-center justify-center"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div className="diagonal-lines absolute inset-0 opacity-40" />
                <div className="font-display text-[140px] font-light text-white/[0.06] tracking-[12px]">
                  {a.name.split(" ").map((w) => w[0]).join("")}
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="eyebrow mb-5">{a.title}</div>
              <h1 className="display-hero text-white">{a.name}</h1>
              <p className="mt-8 text-vg-pewter leading-relaxed text-base">{a.bio}</p>

              <div className="mt-10">
                <div className="eyebrow mb-4">Specialties</div>
                <div className="flex flex-wrap gap-2">
                  {a.specialties.map((s) => (
                    <Badge key={s} variant="neutral">{s}</Badge>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <ButtonLink href={`mailto:${a.email}`} size="md">
                  <Mail className="h-4 w-4" />
                  Email
                </ButtonLink>
                <ButtonLink href={`tel:${siteConfig.phone}`} variant="outline" size="md">
                  <Phone className="h-4 w-4" />
                  {siteConfig.phoneDisplay}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTABand
        eyebrow={`Work with ${a.name.split(" ")[0]}`}
        title="Schedule a private call"
        italicWord="private"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(a)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Advisors", url: "/agents" },
              { name: a.name, url: `/agents/${a.slug}` },
            ]),
          ),
        }}
      />
    </>
  );
}
