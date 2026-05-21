import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const testimonials = [
  {
    quote:
      "Chris and the Varick Global team handled our acquisition with extraordinary discretion. They sourced an off-market property that perfectly matched our brief.",
    name: "A. R.",
    title: "Private Family Office, New York",
  },
  {
    quote:
      "Their HOA Division navigated a complicated receivership for our association. We had clarity at every step. Truly best-in-class advisory.",
    name: "Board President",
    title: "Aventura, FL",
  },
  {
    quote:
      "From listing strategy through closing, Varick Global delivered. Our home sold at the top of the comp set in 28 days.",
    name: "M. & D. P.",
    title: "Coral Gables Sellers",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="In Their Words"
          title="A track record of trust"
          align="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="bg-vg-card/50 border rounded-[4px] p-8 flex flex-col"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div className="font-display text-6xl text-vg-vivid leading-none mb-4">"</div>
              <blockquote className="font-display italic text-lg text-white/90 leading-relaxed flex-1">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t" style={{ borderTopColor: "rgba(255,255,255,0.08)" }}>
                <div className="font-accent text-[11px] font-bold uppercase tracking-[2px] text-white">
                  {t.name}
                </div>
                <div className="mt-1 text-[12px] text-vg-pewter">{t.title}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
