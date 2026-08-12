import { Trophy, Music, TrendingUp, Phone, Network, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "VG Elite — Sports & Entertainment Division",
  description:
    "Invitation-only luxury real estate advisory for professional athletes, entertainers and high-net-worth executives. Discreet. NDA-protected. White glove.",
  path: "/elite",
});

const pillars = [
  {
    id: "athlete",
    icon: Trophy,
    eyebrow: "Athlete Services",
    title: "Private Acquisition",
    desc: "Off-market sourcing, relocation logistics and full discretion for active rosters. Pre-vetted properties surfaced before they hit the market.",
  },
  {
    id: "entertainment",
    icon: Music,
    eyebrow: "Entertainment Services",
    title: "Celebrity Estates",
    desc: "Private acquisition and disposition of estate residences with full identity protection. NDA-bound transactions from end to end.",
  },
  {
    id: "investment",
    icon: TrendingUp,
    eyebrow: "Investment Division",
    title: "Portfolio Building",
    desc: "Long-term wealth strategy through real estate — acquisition, hold, repositioning and disposition advisory for the Elite portfolio.",
  },
];

const tiers = [
  {
    icon: Phone,
    title: "Concierge Access",
    desc: "A dedicated advisor available 24/7. Coordination of private aviation, yacht, and ground transport.",
  },
  {
    icon: Network,
    title: "Network Access",
    desc: "Direct relationships with developers, ultra-prime listing agents and a private buyer network for off-market opportunities.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy Guarantee",
    desc: "Every Elite engagement is NDA-protected. Closings can be structured via LLC, trust, or other privacy vehicles.",
  },
];

export default function ElitePage() {
  return (
    <>
      <section
        className="relative pt-36 pb-32 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #3A2569 0%, #1A1A1A 50%, #3A2569 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(109,71,217,0.2) 0%, transparent 60%), radial-gradient(ellipse at bottom left, rgba(109,71,217,0.1) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden
        >
          <div className="font-display text-[280px] md:text-[420px] font-light text-white/[0.025] tracking-[24px]">
            ELITE
          </div>
        </div>

        <Container className="relative">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="elite">VG Elite — Sports & Entertainment Division</Badge>
              <Badge variant="gold">White Glove Service</Badge>
            </div>
            <h1 className="display-hero text-white">
              Exclusive Access.{" "}
              <em className="italic" style={{ color: "#8B60FF" }}>
                Extraordinary Living.
              </em>
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-white/60 leading-relaxed">
              An invitation-only luxury real estate division for professional athletes,
              entertainers and high-net-worth executives. Discreet. NDA-protected. Globally connected.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <ButtonLink href="#inquiry" variant="elite" size="lg">
                Request Invitation
              </ButtonLink>
              <ButtonLink href="#access" variant="outline" size="lg">
                Learn More
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20" style={{ background: "#1A1A1A" }}>
        <Container>
          <div className="max-w-2xl mb-12">
            <div className="eyebrow mb-5" style={{ color: "#6D47D9" }}>
              Service Pillars
            </div>
            <h2 className="display-h2 text-white">
              Three divisions. <em className="italic" style={{ color: "#8B60FF" }}>One standard.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div
                key={p.id}
                id={p.id}
                className="bg-elite-navy-2 border rounded-[4px] p-8 relative overflow-hidden"
                style={{ borderColor: "rgba(109,71,217,0.3)" }}
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-elite-violet/15 border border-elite-violet/40 text-elite-violet-light mb-6">
                  <p.icon className="h-5 w-5" />
                </div>
                <div className="eyebrow mb-3" style={{ color: "#6D47D9" }}>
                  {p.eyebrow}
                </div>
                <h3 className="display-h3 text-white">{p.title}</h3>
                <p className="mt-4 text-white/60 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20" style={{ background: "#1A1A1A" }}>
        <Container>
          <div
            className="border rounded-[4px] p-10 md:p-14 text-center"
            style={{
              borderColor: "rgba(109,71,217,0.35)",
              background:
                "linear-gradient(135deg, rgba(109,71,217,0.08) 0%, rgba(109,71,217,0.04) 100%)",
            }}
          >
            <div className="font-accent text-[10px] font-bold uppercase tracking-[6px] mb-4" style={{ color: "#6D47D9" }}>
              Brand Lockup
            </div>
            <div className="font-display text-7xl md:text-8xl font-light text-white tracking-[8px]">
              VG <em className="italic" style={{ color: "#8B60FF" }}>ELITE</em>
            </div>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Swatch color="#B32338" label="Crimson" />
              <Swatch color="#6D47D9" label="Violet" />
              <Swatch color="#8B60FF" label="Vio Light" />
              <Swatch color="#3A2569" label="Plum" />
              <Swatch color="#C9A238" label="Gold" />
            </div>
          </div>
        </Container>
      </section>

      <section id="access" className="py-20" style={{ background: "#1A1A1A" }}>
        <Container>
          <div className="max-w-2xl mb-12">
            <div className="eyebrow mb-5" style={{ color: "#6D47D9" }}>
              Access Tiers
            </div>
            <h2 className="display-h2 text-white">
              What Elite <em className="italic" style={{ color: "#8B60FF" }}>access</em> looks like
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((t) => (
              <div
                key={t.title}
                className="bg-elite-navy-2 border rounded-[4px] p-8"
                style={{ borderColor: "rgba(109,71,217,0.3)" }}
              >
                <t.icon className="h-6 w-6 mb-5" style={{ color: "#6D47D9" }} />
                <h3 className="display-h3 text-white">{t.title}</h3>
                <p className="mt-3 text-white/60 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section
        id="inquiry"
        className="py-24"
        style={{
          background: "linear-gradient(135deg, #3A2569 0%, #1A1A1A 100%)",
        }}
      >
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Badge variant="elite">Private Inquiry</Badge>
            <h2 className="display-h2 text-white mt-5">
              By <em className="italic" style={{ color: "#8B60FF" }}>invitation</em> only
            </h2>
            <p className="mt-5 text-white/60">
              The VG Elite division operates by referral and invitation. Complete a brief private
              inquiry and an Elite advisor will reach out under NDA within 48 hours.
            </p>
          </div>

          <form
            className="mt-12 max-w-xl mx-auto space-y-5"
            action="/api/concierge"
            method="post"
          >
            <input
              required
              placeholder="Full name"
              name="name"
              className="w-full bg-black/40 border px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none rounded-[2px]"
              style={{ borderColor: "rgba(109,71,217,0.35)" }}
            />
            <input
              required
              type="email"
              placeholder="Email"
              name="email"
              className="w-full bg-black/40 border px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none rounded-[2px]"
              style={{ borderColor: "rgba(109,71,217,0.35)" }}
            />
            <input
              placeholder="Referred by (optional)"
              name="referral"
              className="w-full bg-black/40 border px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none rounded-[2px]"
              style={{ borderColor: "rgba(109,71,217,0.35)" }}
            />
            <textarea
              required
              name="brief"
              placeholder="A brief, confidential description of how we can help"
              className="w-full bg-black/40 border px-4 py-3.5 text-white placeholder:text-white/40 min-h-[140px] focus:outline-none rounded-[2px]"
              style={{ borderColor: "rgba(109,71,217,0.35)" }}
            />
            <ButtonLink href="mailto:info@varickglobal.com?subject=VG Elite Inquiry" variant="elite" className="w-full" size="lg">
              Submit Private Inquiry
            </ButtonLink>
            <p className="text-[11px] text-white/40 text-center">
              All inquiries are held in confidence. NDA available on request.
            </p>
          </form>
        </Container>
      </section>
    </>
  );
}

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="h-8 w-8 rounded-full border border-white/10"
        style={{ background: color }}
      />
      <span className="text-[10px] font-accent uppercase tracking-[1.5px] text-white/50">
        {label}
      </span>
    </div>
  );
}
