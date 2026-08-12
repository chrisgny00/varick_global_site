import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

export function EliteTeaser() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, #3A2569 0%, #1A1A1A 50%, #3A2569 100%)",
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(109,71,217,0.22) 0%, transparent 60%)",
        }}
      />

      <Container>
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant="elite">VG Elite</Badge>
            <Badge variant="gold">By Invitation Only</Badge>
          </div>
          <h2 className="display-h2 text-white">
            Sports & Entertainment. <em className="italic" style={{ color: "#8B60FF" }}>Extraordinary Living.</em>
          </h2>
          <p className="mt-5 text-white/60 leading-relaxed max-w-2xl">
            VG Elite is Varick Global's invitation-only division for professional athletes,
            entertainers, and high-net-worth executives — a discreet, NDA-protected advisory
            with access to off-market inventory and white-glove relocation services.
          </p>
          <div className="mt-8">
            <Link
              href="/elite"
              className="inline-flex items-center gap-2 text-elite-violet-light hover:text-white font-accent text-[11px] font-bold uppercase tracking-[2.5px] border-b border-elite-violet/40 hover:border-white pb-1.5"
            >
              Discover VG Elite
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
