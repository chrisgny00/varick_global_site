import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { pageMeta, faqSchema } from "@/lib/seo";

const faqs = [
  {
    q: "What areas do you cover?",
    a: "Varick Global represents clients across Miami-Dade, Broward and Palm Beach counties — and globally through the VG Elite division.",
  },
  {
    q: "Do you work with off-market properties?",
    a: "Yes. A significant portion of our luxury inventory is off-market and is shared only with vetted, NDA-bound clients.",
  },
  {
    q: "How does VG Elite differ from the main practice?",
    a: "VG Elite is invitation-only and serves professional athletes, entertainers and high-net-worth executives with NDA-protected, identity-protected service.",
  },
  {
    q: "Do you handle commercial transactions?",
    a: "Yes — office, industrial, retail, multifamily and land. We represent owners, tenants, and capital from family offices to institutional investors.",
  },
  {
    q: "Can Varick Global serve as a court-appointed receiver?",
    a: "Yes. Our HOA Division serves as a receiver for distressed Florida HOAs and condominium associations.",
  },
  {
    q: "What is your fee structure?",
    a: "Commission-based for transactions; advisory engagements are scoped on a fee or retainer basis depending on the work. We are transparent about both from day one.",
  },
  {
    q: "How quickly will an advisor follow up?",
    a: "Within one business day. Urgent matters can be routed by phone to 786.352.7547.",
  },
  {
    q: "Is the AI concierge a real advisor?",
    a: "No — the concierge is an AI assistant trained on Varick Global services and South Florida market context. It can answer questions, surface listings and route you to a human advisor.",
  },
];

export const metadata = pageMeta({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Varick Global services, VG Elite, the HOA Division and our advisory approach.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked"
        italicWord="asked"
        subtitle="Answers to common questions. Don't see what you need? An advisor is one call away."
      />
      <section className="py-16">
        <Container>
          <div className="max-w-3xl space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="bg-vg-card border rounded-[4px] p-6 group"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <summary className="cursor-pointer text-white font-medium list-none flex items-center justify-between">
                  <span>{f.q}</span>
                  <span className="text-vg-vivid group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <p className="mt-4 text-vg-pewter leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
      <CTABand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
    </>
  );
}
