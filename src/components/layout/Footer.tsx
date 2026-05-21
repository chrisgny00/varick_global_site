import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { siteConfig } from "@/lib/seo";
import {
  FacebookIcon,
  XIcon,
  LinkedInIcon,
  InstagramIcon,
  YouTubeIcon,
} from "@/components/ui/SocialIcons";

const servicesLinks = [
  { label: "Buyer & Seller Services", href: "/services/buyer-seller-services" },
  { label: "Tenant Representation", href: "/services/tenant-representation" },
  { label: "Landlord Representation", href: "/services/landlord-representation" },
  { label: "Valuation & Advisory", href: "/services/valuation" },
  { label: "Investment Sales", href: "/services/investment-sales" },
  { label: "New Development", href: "/services/new-development" },
];

const hoaLinks = [
  { label: "HOA Advisory", href: "/services/hoa-advisory" },
  { label: "HOA Conversions", href: "/services/hoa-conversions" },
  { label: "Receivership", href: "/services/receivership" },
  { label: "HOA Sale & Termination", href: "/services/hoa-sale" },
  { label: "HOA Division", href: "/hoa" },
];

const eliteLinks = [
  { label: "Athlete Services", href: "/elite#athlete" },
  { label: "Entertainment Services", href: "/elite#entertainment" },
  { label: "Investment Division", href: "/elite#investment" },
  { label: "Private Inquiry", href: "/elite#inquiry" },
];

const socials = [
  { icon: FacebookIcon, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: XIcon, href: siteConfig.social.x, label: "X (Twitter)" },
  { icon: LinkedInIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: YouTubeIcon, href: siteConfig.social.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer
      className="mt-32 border-t bg-[#050505]"
      style={{ borderTopColor: "rgba(166,25,46,0.3)" }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <div className="mt-6 space-y-3 text-[13px] text-vg-pewter">
              <p className="inline-flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-vg-vivid shrink-0" />
                <span>
                  19505 Biscayne Blvd, Suite 2350
                  <br />
                  Aventura, FL 33180
                </span>
              </p>
              <p>
                <a href="tel:+17863527547" className="inline-flex items-center gap-2.5 hover:text-white">
                  <Phone className="h-4 w-4 text-vg-vivid" />
                  786.352.7547
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2.5 hover:text-white break-all"
                >
                  <Mail className="h-4 w-4 text-vg-vivid" />
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </div>

          <FooterColumn title="Services" links={servicesLinks} />
          <FooterColumn title="HOA Division" links={hoaLinks} />
          <FooterColumn title="VG Elite" links={eliteLinks} />
        </div>

        <div
          className="mt-14 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ borderTopColor: "rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs text-vg-pewter">
            © {new Date().getFullYear()} Varick Global Real Estate Advisors. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-vg-pewter hover:border-vg-vivid hover:text-vg-vivid transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-accent text-[11px] font-bold uppercase tracking-[2.5px] text-white">
        {title}
      </h3>
      <ul className="mt-5 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[13px] text-vg-pewter hover:text-white transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
