import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { agents } from "@/lib/data/agents";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our Advisors",
  description:
    "Meet the senior advisors at Varick Global Real Estate Advisors — Aventura, FL.",
  path: "/agents",
});

export default function AgentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Advisors"
        title="Senior, named advisors"
        italicWord="named"
        subtitle="You work with principals, not associates. Every Varick Global advisor brings decades of South Florida expertise."
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((a) => (
              <Link
                key={a.slug}
                href={`/agents/${a.slug}`}
                className="bg-vg-card border rounded-[4px] overflow-hidden hover:border-vg-vivid/50 transition-colors block group"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div
                  className="aspect-[4/5] relative overflow-hidden flex items-center justify-center"
                  style={{
                    background:
                      "#2A2A2A",
                  }}
                >
                  <div className="diagonal-lines absolute inset-0 opacity-50" />
                  <div className="font-display text-7xl font-light text-white/[0.06] tracking-[8px]">
                    {a.name.split(" ").map((w) => w[0]).join("")}
                  </div>
                </div>
                <div className="p-6">
                  <div className="display-h3 text-white group-hover:text-vg-vivid transition-colors">{a.name}</div>
                  <div className="text-[12px] text-vg-pewter mt-1 font-accent uppercase tracking-[1.5px]">
                    {a.title}
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {a.specialties.slice(0, 2).map((s) => (
                      <li
                        key={s}
                        className="text-[10px] font-accent font-bold uppercase tracking-[1.5px] text-vg-pewter border border-white/10 px-2 py-1 rounded-[2px]"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
