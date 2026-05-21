import Link from "next/link";
import { Users, Replace, Gavel, FileSignature } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pageMeta, faqSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "HOA Division — Distressed HOA Advisory Florida",
  description:
    "Independent advisory, conversions, receivership and bulk-sale execution for Florida HOAs and condominium associations.",
  path: "/hoa",
});

const offerings = [
  {
    slug: "hoa-advisory",
    title: "HOA Advisory",
    icon: Users,
    desc: "Strategic governance, financial restructuring, capital-project planning and board-level advisory for associations facing change.",
  },
  {
    slug: "hoa-conversions",
    title: "HOA Conversions",
    icon: Replace,
    desc: "Rental-to-condo and condo-to-rental conversion feasibility, regulatory navigation and execution.",
  },
  {
    slug: "receivership",
    title: "Receivership",
    icon: Gavel,
    desc: "Court-appointed receivership for distressed associations — restoring financial health, governance and asset value.",
  },
  {
    slug: "hoa-sale",
    title: "HOA Sale & Termination",
    icon: FileSignature,
    desc: "Bulk-buyer transactions, termination votes and discreet disposition of association-owned assets.",
  },
];

const faqs = [
  { q: "What qualifies an HOA as distressed?", a: "Sustained operating deficits, deferred reserves, deferred maintenance, litigation exposure, or governance failure can each qualify an association as distressed." },
  { q: "Do you act as a receiver?", a: "Yes. Varick Global serves as a court-appointed receiver for Florida HOAs and condominium associations in distress." },
  { q: "Can you handle a condo termination?", a: "We advise on Section 718 terminations, bulk sales and unit-buyout strategies, supporting the legal team and the board through the vote and execution." },
];

export default function HOAPage() {
  return (
    <>
      <PageHero
        eyebrow="HOA Division"
        title="Distressed HOA Advisory"
        italicWord="Advisory"
        subtitle="Independent, senior advisory for Florida HOAs and condominium associations navigating distress, change, or major capital decisions."
      />

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeader
            eyebrow="Practice Areas"
            title="Four integrated services"
            italicWord="integrated"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offerings.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="bg-vg-card border rounded-[4px] p-8 hover:border-vg-vivid/50 transition-colors block"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-vg-crimson/10 border border-vg-crimson/30 text-vg-vivid mb-5">
                  <o.icon className="h-5 w-5" />
                </div>
                <h3 className="display-h3 text-white">{o.title}</h3>
                <p className="mt-3 text-vg-pewter leading-relaxed">{o.desc}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeader eyebrow="FAQ" title="Frequently asked" />
          <div className="space-y-4 max-w-3xl">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="bg-vg-card border rounded-[4px] p-6 group"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <summary className="cursor-pointer text-white font-medium list-none flex items-center justify-between">
                  <span>{f.q}</span>
                  <span className="text-vg-vivid group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-vg-pewter leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <CTABand
        eyebrow="Board Members & Counsel"
        title="A confidential briefing"
        italicWord="briefing"
        subtitle="Schedule a private call with the HOA Division leadership."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
    </>
  );
}
