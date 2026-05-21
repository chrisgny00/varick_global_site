import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Briefcase, Building2, Home, RefreshCw, LineChart, ShieldAlert,
  TrendingUp, Compass, Users, Replace, Gavel, FileSignature, type LucideIcon,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { CTABand } from "@/components/sections/CTABand";
import { services, getService } from "@/lib/data/services";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

const iconMap: Record<string, LucideIcon> = {
  Briefcase, Building2, Home, RefreshCw, LineChart, ShieldAlert,
  TrendingUp, Compass, Users, Replace, Gavel, FileSignature,
};

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return pageMeta({ title: "Service", description: "", path: `/services/${slug}` });
  return pageMeta({
    title: `${s.title} — Varick Global`,
    description: s.short,
    path: `/services/${s.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const Icon = iconMap[s.icon] ?? Briefcase;

  const related = services.filter((x) => x.slug !== s.slug && x.category === s.category).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={s.category ? s.category.toUpperCase() : "Our Services"}
        title={s.title}
        subtitle={s.short}
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-vg-crimson/10 border border-vg-crimson/30 text-vg-vivid mb-8">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="display-h2 text-white">Our Approach</h2>
              <p className="mt-5 text-vg-pewter text-base leading-relaxed">
                {s.description}
              </p>

              <h3 className="display-h3 text-white mt-12">What you can expect</h3>
              <ul className="mt-5 space-y-3 text-vg-pewter">
                {[
                  "A senior advisor as your single point of contact from day one.",
                  "Discreet engagement — your brief is held in confidence.",
                  "Market intelligence drawn from our proprietary South Florida database.",
                  "A disciplined, written work plan and clear milestones.",
                  "A defined deliverable: a transaction, an advisory memo, or both.",
                ].map((t) => (
                  <li key={t} className="flex gap-3 items-start">
                    <CheckCircle2 className="h-5 w-5 text-vg-vivid shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <ButtonLink href={`/contact?service=${s.slug}`} size="lg">
                  Engage Varick Global
                </ButtonLink>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div
                className="bg-vg-card border rounded-[4px] p-7 sticky top-20"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div className="eyebrow mb-4">Related Services</div>
                <ul className="space-y-3">
                  {related.length > 0 ? (
                    related.map((r) => (
                      <li key={r.slug}>
                        <Link href={`/services/${r.slug}`} className="text-white hover:text-vg-vivid">
                          {r.title}
                        </Link>
                        <p className="text-[12px] text-vg-pewter mt-1">{r.short}</p>
                      </li>
                    ))
                  ) : (
                    services
                      .filter((x) => x.slug !== s.slug)
                      .slice(0, 4)
                      .map((r) => (
                        <li key={r.slug}>
                          <Link href={`/services/${r.slug}`} className="text-white hover:text-vg-vivid">
                            {r.title}
                          </Link>
                        </li>
                      ))
                  )}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <CTABand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Services", url: "/services" },
              { name: s.title, url: `/services/${s.slug}` },
            ]),
          ),
        }}
      />
    </>
  );
}
