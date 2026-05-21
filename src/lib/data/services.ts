import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "tenant-representation",
    title: "Tenant Representation",
    short: "Securing optimal terms for tenants in luxury and commercial leasing.",
    description:
      "We represent tenants in office, retail and luxury residential leasing — from market intelligence and site selection through lease negotiation and post-occupancy advisory.",
    icon: "Briefcase",
    category: "commercial",
  },
  {
    slug: "landlord-representation",
    title: "Landlord Representation",
    short: "Maximizing asset value through strategic leasing and marketing.",
    description:
      "End-to-end leasing strategy, market positioning, prospect cultivation and lease execution for landlords across South Florida.",
    icon: "Building2",
    category: "commercial",
  },
  {
    slug: "buyer-seller-services",
    title: "Buyer & Seller Services",
    short: "Discreet, full-service representation for luxury home transactions.",
    description:
      "From off-market acquisitions to white-glove listing campaigns, our advisors guide every step of a residential transaction with discretion and precision.",
    icon: "Home",
    category: "residential",
  },
  {
    slug: "lease-renewal",
    title: "Lease Renewal",
    short: "Re-trading existing leases to capture market upside.",
    description:
      "We audit existing lease terms, benchmark to current market and re-negotiate renewals to align with your long-term occupancy strategy.",
    icon: "RefreshCw",
    category: "commercial",
  },
  {
    slug: "valuation",
    title: "Valuation & Advisory",
    short: "Institutional-grade valuation for owners and investors.",
    description:
      "CMA-driven valuations powered by current comps, market dynamics and our proprietary AI valuation model — ideal for pricing, refinancing or estate planning.",
    icon: "LineChart",
    category: "residential",
  },
  {
    slug: "foreclosures",
    title: "Foreclosures",
    short: "Discreet acquisition and disposition of distressed assets.",
    description:
      "Specialized expertise in foreclosure acquisition, short-sale negotiation and bank-owned property disposition across Miami-Dade, Broward and Palm Beach.",
    icon: "ShieldAlert",
    category: "residential",
  },
  {
    slug: "investment-sales",
    title: "Investment Sales",
    short: "Capital placement across multifamily, retail and mixed-use.",
    description:
      "Underwriting, sourcing and disposition of income-producing assets — from boutique multifamily to mixed-use redevelopment.",
    icon: "TrendingUp",
    category: "commercial",
  },
  {
    slug: "new-development",
    title: "New Development",
    short: "Pre-construction strategy, sales and project consulting.",
    description:
      "Advisory across pre-development feasibility, product positioning, pricing strategy and full sales execution for ground-up condominium and mixed-use projects.",
    icon: "Compass",
    category: "residential",
  },
  {
    slug: "hoa-advisory",
    title: "HOA Advisory",
    short: "Strategic guidance for boards navigating change.",
    description:
      "Independent advisory for HOA boards on financial restructuring, governance, capital projects and complex association decisions.",
    icon: "Users",
    category: "hoa",
  },
  {
    slug: "hoa-conversions",
    title: "HOA Conversions",
    short: "Rental-to-condo and condo-to-rental conversion strategy.",
    description:
      "Feasibility studies, regulatory navigation and execution for community conversions on both sides of the rental-condo spectrum.",
    icon: "Replace",
    category: "hoa",
  },
  {
    slug: "receivership",
    title: "Receivership",
    short: "Court-appointed receivership for distressed associations.",
    description:
      "Experienced receivers for distressed HOAs and condominium associations — restoring financial health, governance and asset value.",
    icon: "Gavel",
    category: "hoa",
  },
  {
    slug: "hoa-sale",
    title: "HOA Sale & Termination",
    short: "Discreet bulk-sale and association termination strategy.",
    description:
      "Advisory and execution on bulk-buyer transactions, termination votes and disposition of association-owned assets.",
    icon: "FileSignature",
    category: "hoa",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
