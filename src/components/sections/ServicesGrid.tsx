import Link from "next/link";
import {
  Briefcase,
  Building2,
  Home,
  RefreshCw,
  LineChart,
  ShieldAlert,
  TrendingUp,
  Compass,
  Users,
  Replace,
  Gavel,
  FileSignature,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/lib/data/services";

const iconMap: Record<string, LucideIcon> = {
  Briefcase, Building2, Home, RefreshCw, LineChart, ShieldAlert,
  TrendingUp, Compass, Users, Replace, Gavel, FileSignature,
};

export function ServicesGrid({ limit = 8 }: { limit?: number }) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="What We Do"
          title="A full-spectrum advisory"
          subtitle="Eight integrated practice areas across residential, commercial, HOA and investment."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.slice(0, limit).map((s) => {
            const Icon = iconMap[s.icon] ?? Briefcase;
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group block bg-vg-card border rounded-[4px] p-7 hover:border-vg-vivid/50 transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-vg-crimson/10 border border-vg-crimson/30 text-vg-vivid mb-5">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="display-h3 text-white">{s.title}</h3>
                <p className="mt-3 text-[13px] text-vg-pewter leading-relaxed">
                  {s.short}
                </p>
                <div className="mt-5 font-accent text-[10px] font-bold uppercase tracking-[2px] text-vg-vivid group-hover:tracking-[2.5px] transition-all">
                  Learn More →
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
