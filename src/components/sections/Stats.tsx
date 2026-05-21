import { Container } from "@/components/ui/Container";

const stats = [
  { value: "247", label: "Active Listings" },
  { value: "42", label: "Avg Days on Market" },
  { value: "$2.4M", label: "Median Sale Price" },
  { value: "31", label: "Neighborhoods Served" },
];

export function Stats() {
  return (
    <section
      className="py-16 md:py-20 border-y"
      style={{
        borderTopColor: "rgba(255,255,255,0.08)",
        borderBottomColor: "rgba(255,255,255,0.08)",
        background:
          "linear-gradient(180deg, rgba(15,15,15,0) 0%, rgba(15,15,15,0.5) 100%)",
      }}
    >
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <div className="font-display text-5xl md:text-6xl font-light text-white leading-none">
                {s.value}
              </div>
              <div className="mt-3 font-accent text-[10px] font-bold uppercase tracking-[2.5px] text-vg-vivid">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
