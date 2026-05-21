import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTABand } from "@/components/sections/CTABand";
import { Stats } from "@/components/sections/Stats";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Varick Global Real Estate Advisors",
  description:
    "Discreet, senior advisory for the South Florida luxury market. Residential, commercial, HOA — and an invitation-only Sports & Entertainment division.",
  path: "/about",
});

const values = [
  {
    title: "Discretion",
    desc: "We hold every brief in confidence. Where appropriate, we work under NDA from first contact through closing.",
  },
  {
    title: "Precision",
    desc: "Underwriting, comps, and market intelligence inform every recommendation — and every word we put on paper.",
  },
  {
    title: "Senior Engagement",
    desc: "You speak with a principal. We do not delegate the work to a junior who's never met you.",
  },
  {
    title: "Long Horizon",
    desc: "We optimize for the relationship, not the transaction. Most of our work comes from prior clients.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Varick Global"
        title="A discreet, senior advisory"
        italicWord="advisory"
        subtitle="Headquartered in Aventura, Varick Global serves a private clientele across South Florida — and a broader network of family offices, executives and entertainers worldwide."
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <h2 className="display-h2 text-white">Our mission</h2>
              <p className="mt-5 text-vg-pewter leading-relaxed">
                Varick Global was founded on a simple premise: luxury real estate should be advised, not sold.
                Our work spans the full spectrum of South Florida real estate — from single-family acquisitions and
                trophy estates to commercial investment, HOA restructuring and the discreet relocation needs of
                professional athletes and entertainers.
              </p>
              <p className="mt-4 text-vg-pewter leading-relaxed">
                We measure success not by transaction volume but by the longevity of the relationships
                we keep. Our clients return — and they refer.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div
                className="bg-vg-card border rounded-[4px] p-8 h-full"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div className="eyebrow mb-4">Brand Promise</div>
                <div className="font-display text-3xl text-white font-light leading-tight">
                  Where <em className="italic-accent">Luxury</em> Meets Precision.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Stats />

      <section className="py-20">
        <Container>
          <SectionHeader eyebrow="What We Value" title="Four operating principles" italicWord="operating" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-vg-card border rounded-[4px] p-8"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <h3 className="display-h3 text-white">{v.title}</h3>
                <p className="mt-3 text-vg-pewter leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABand
        eyebrow="Meet the Team"
        title="Speak with an advisor"
        italicWord="advisor"
      />
    </>
  );
}
