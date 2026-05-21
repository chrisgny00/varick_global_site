import { PageHero } from "@/components/ui/PageHero";
import { ValuationTool } from "@/components/ai/ValuationTool";
import { CTABand } from "@/components/sections/CTABand";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Home Valuation South Florida",
  description:
    "Get an instant AI-driven valuation backed by recent South Florida comps. Followed by a verified CMA from a Varick Global advisor.",
  path: "/valuation",
});

export default function ValuationPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Valuation"
        title="What is your home worth?"
        italicWord="worth"
        subtitle="An instant valuation drawn from current South Florida comps, followed by a verified CMA from a senior advisor."
      />
      <section className="py-16">
        <ValuationTool />
      </section>
      <CTABand
        eyebrow="Verified CMA"
        title="Request a signed report"
        italicWord="signed"
      />
    </>
  );
}
