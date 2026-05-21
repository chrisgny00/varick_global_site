import type { Agent } from "@/types";

export const agents: Agent[] = [
  {
    slug: "chris-gallego",
    name: "Chris Gallego",
    title: "Founder & Principal Broker",
    bio: "Chris leads Varick Global with two decades of South Florida real estate experience spanning residential luxury, commercial investment and complex HOA assignments. He founded Varick Global to deliver an advisory experience that pairs deep market expertise with discretion and precision.",
    phone: "786.352.7547",
    email: "chris@varickglobal.com",
    image: "/images/agent-1.jpg",
    specialties: ["Luxury Residential", "Commercial Investment", "HOA Advisory"],
  },
  {
    slug: "nina-vazquez",
    name: "Nina Vazquez",
    title: "Senior Advisor, Luxury Residential",
    bio: "Nina represents an international clientele acquiring and disposing of luxury homes across Miami Beach, Coral Gables and Palm Beach. She is known for sourcing off-market opportunities and orchestrating discreet transactions.",
    phone: "786.352.7547",
    email: "nina@varickglobal.com",
    image: "/images/agent-2.jpg",
    specialties: ["Off-Market Acquisitions", "Waterfront Estates", "International Clients"],
  },
  {
    slug: "alfredo-morejon",
    name: "Alfredo Morejon",
    title: "Director, Commercial & Investment Sales",
    bio: "Alfredo leads Varick Global's commercial practice across office, retail, multifamily and mixed-use, advising private capital, family offices and institutional investors across South Florida.",
    phone: "786.352.7547",
    email: "alfredo@varickglobal.com",
    image: "/images/agent-3.jpg",
    specialties: ["Investment Sales", "Multifamily", "Retail Leasing"],
  },
  {
    slug: "gloria-grullon",
    name: "Gloria Grullon",
    title: "Director, HOA Division",
    bio: "Gloria leads Varick Global's HOA Division, advising boards through governance challenges, distressed scenarios, conversions and bulk transactions. She is widely respected for her command of Florida condominium and HOA law.",
    phone: "786.352.7547",
    email: "gloria@varickglobal.com",
    image: "/images/agent-4.jpg",
    specialties: ["HOA Advisory", "Receivership", "Condo Terminations"],
  },
];

export function getAgent(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}
