"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const nav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Buyer & Seller Services", href: "/services/buyer-seller-services" },
      { label: "Tenant Representation", href: "/services/tenant-representation" },
      { label: "Landlord Representation", href: "/services/landlord-representation" },
      { label: "Lease Renewal", href: "/services/lease-renewal" },
      { label: "Valuation & Advisory", href: "/services/valuation" },
      { label: "Foreclosures", href: "/services/foreclosures" },
      { label: "Investment Sales", href: "/services/investment-sales" },
      { label: "New Development", href: "/services/new-development" },
    ],
  },
  {
    label: "Commercial",
    href: "/commercial",
    children: [
      { label: "Office", href: "/properties?propertyType=Office" },
      { label: "Industrial", href: "/properties?propertyType=Industrial" },
      { label: "Multi-Family", href: "/properties?propertyType=Multi-Family" },
      { label: "Retail", href: "/properties?propertyType=Retail" },
      { label: "Land", href: "/land" },
    ],
  },
  {
    label: "HOA",
    href: "/hoa",
    children: [
      { label: "HOA Advisory", href: "/services/hoa-advisory" },
      { label: "HOA Conversions", href: "/services/hoa-conversions" },
      { label: "Receivership", href: "/services/receivership" },
      { label: "HOA Sale", href: "/services/hoa-sale" },
    ],
  },
  { label: "Properties", href: "/properties" },
  { label: "VG Elite", href: "/elite" },
  {
    label: "Agents",
    href: "/agents",
    children: [
      { label: "Chris Gallego", href: "/agents/chris-gallego" },
      { label: "Nina Vazquez", href: "/agents/nina-vazquez" },
      { label: "Alfredo Morejon", href: "/agents/alfredo-morejon" },
      { label: "Gloria Grullon", href: "/agents/gloria-grullon" },
    ],
  },
  { label: "About", href: "/about" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{
        backgroundColor: "rgba(10,10,10,0.95)",
        borderBottomColor: "rgba(166,25,46,0.3)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-10">
        <Logo />

        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+17863527547"
            className="font-accent text-[11px] font-bold uppercase tracking-[2px] text-vg-pewter hover:text-white inline-flex items-center gap-1.5"
          >
            <Phone className="h-3.5 w-3.5" />
            786.352.7547
          </a>
          <ButtonLink href="/contact" variant="primary" size="sm">
            Schedule
          </ButtonLink>
        </div>

        <button
          aria-label="Open menu"
          className="lg:hidden text-white"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {mobileOpen && <MobileMenu nav={nav} onClose={() => setMobileOpen(false)} />}
    </header>
  );
}

function NavLink({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="font-accent text-[11px] font-bold uppercase tracking-[1.8px] text-vg-pewter hover:text-white transition-colors"
      >
        {item.label}
      </Link>
    );
  }
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={item.href}
        className="inline-flex items-center gap-1 font-accent text-[11px] font-bold uppercase tracking-[1.8px] text-vg-pewter hover:text-white transition-colors"
      >
        {item.label}
        <ChevronDown className="h-3 w-3" />
      </Link>
      {open && (
        <div
          className="absolute left-0 top-full pt-4"
        >
          <div
            className="min-w-[240px] border bg-vg-deep/98 backdrop-blur p-2 rounded-[2px]"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            {item.children.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="block px-4 py-2.5 text-[13px] text-white/80 hover:bg-vg-crimson/10 hover:text-white rounded-[2px]"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileMenu({ nav, onClose }: { nav: NavItem[]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-vg-deep flex flex-col">
      <div className="flex h-16 items-center justify-between px-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <Logo />
        <button aria-label="Close menu" onClick={onClose} className="text-white">
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-6 space-y-6">
        {nav.map((item) => (
          <div key={item.href}>
            <Link
              href={item.href}
              onClick={onClose}
              className="font-display text-2xl text-white block"
            >
              {item.label}
            </Link>
            {item.children && (
              <div className="mt-2 ml-4 space-y-1.5">
                {item.children.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={onClose}
                    className="block text-sm text-vg-pewter"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <Link
          href="/contact"
          onClick={onClose}
          className={cn(
            "block mt-8 text-center bg-vg-crimson text-white py-4 font-accent text-[11px] font-bold uppercase tracking-[2.5px]",
          )}
        >
          Schedule Consultation
        </Link>
      </nav>
    </div>
  );
}
