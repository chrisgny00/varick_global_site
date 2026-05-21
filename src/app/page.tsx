import { Hero } from "@/components/sections/Hero";
import { SearchBar } from "@/components/idx/SearchBar";
import { FeaturedProperties } from "@/components/sections/FeaturedProperties";
import { Stats } from "@/components/sections/Stats";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { PropertyMatcher } from "@/components/ai/PropertyMatcher";
import { EliteTeaser } from "@/components/sections/EliteTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTABand } from "@/components/sections/CTABand";
import { Container } from "@/components/ui/Container";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Varick Global Real Estate Advisors — Luxury Real Estate South Florida",
  description:
    "South Florida's premier luxury real estate advisory. Residential, commercial, HOA, and an invitation-only Sports & Entertainment division. Aventura, FL.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="relative -mt-20 md:-mt-24 z-10">
        <Container>
          <SearchBar />
        </Container>
      </section>

      <FeaturedProperties />
      <Stats />
      <ServicesGrid limit={8} />

      <section className="py-20 md:py-28">
        <Container>
          <PropertyMatcher />
        </Container>
      </section>

      <EliteTeaser />
      <Testimonials />
      <CTABand />
    </>
  );
}
