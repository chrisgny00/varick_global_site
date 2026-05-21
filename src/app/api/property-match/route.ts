import { NextRequest, NextResponse } from "next/server";
import { callLLM, hasAIKey } from "@/lib/ai/client";
import { matcherPrompt } from "@/lib/ai/prompts";
import { properties, filterProperties } from "@/lib/data/properties";

export const runtime = "nodejs";

interface Filters {
  intent?: string;
  minBeds?: number | null;
  minBaths?: number | null;
  maxPrice?: number | null;
  minPrice?: number | null;
  propertyType?: string | null;
  cities?: string[];
  features?: string[];
  narrative?: string;
}

function heuristicParse(desc: string): Filters {
  const d = desc.toLowerCase();
  const bedsMatch = d.match(/(\d+)\s*(?:\+)?\s*(?:bed|br|bedroom)/);
  const priceMatch = d.match(/\$?\s*(\d+(?:\.\d+)?)\s*(m|million|k)?/);
  let maxPrice: number | null = null;
  if (priceMatch) {
    const n = parseFloat(priceMatch[1]);
    const unit = priceMatch[2]?.toLowerCase();
    if (unit === "m" || unit === "million") maxPrice = n * 1_000_000;
    else if (unit === "k") maxPrice = n * 1_000;
    else if (n > 1000) maxPrice = n;
  }
  const features: string[] = [];
  ["ocean", "waterfront", "pool", "smart home", "concierge", "dock", "bay view"].forEach((f) => {
    if (d.includes(f)) features.push(f);
  });
  const cities: string[] = [];
  [
    "miami beach", "brickell", "coral gables", "aventura", "bal harbour",
    "fort lauderdale", "palm beach", "boca raton", "delray", "wellington",
    "key biscayne", "coconut grove", "jupiter",
  ].forEach((c) => {
    if (d.includes(c)) cities.push(c);
  });
  return {
    intent: d.includes("rent") ? "rent" : d.includes("commercial") ? "commercial" : "buy",
    minBeds: bedsMatch ? parseInt(bedsMatch[1], 10) : null,
    minBaths: null,
    maxPrice,
    minPrice: null,
    propertyType: d.includes("penthouse")
      ? "Penthouse"
      : d.includes("estate") || d.includes("mansion")
      ? "Estate"
      : d.includes("condo")
      ? "Condo"
      : null,
    cities,
    features,
    narrative: "We've matched your description to our active South Florida inventory.",
  };
}

export async function POST(req: NextRequest) {
  const { description } = await req.json().catch(() => ({}));
  if (!description || typeof description !== "string") {
    return NextResponse.json({ error: "Missing description" }, { status: 400 });
  }

  let filters: Filters;
  let degraded = false;

  if (hasAIKey()) {
    try {
      const raw = await callLLM({
        system: matcherPrompt,
        user: `Buyer description: ${description}\n\nReturn JSON only.`,
      });
      const jsonStart = raw.indexOf("{");
      const jsonEnd = raw.lastIndexOf("}");
      filters =
        jsonStart >= 0 && jsonEnd > jsonStart
          ? JSON.parse(raw.slice(jsonStart, jsonEnd + 1))
          : heuristicParse(description);
    } catch {
      filters = heuristicParse(description);
      degraded = true;
    }
  } else {
    filters = heuristicParse(description);
    degraded = true;
  }

  const scored = properties
    .filter((p) => (filters.intent ? p.transactionType === filters.intent : true))
    .map((p) => {
      let score = 0;
      if (filters.minBeds && p.beds >= filters.minBeds) score += 25;
      if (filters.maxPrice && p.price <= filters.maxPrice) score += 25;
      if (filters.propertyType && p.propertyType === filters.propertyType) score += 20;
      if (filters.cities?.length) {
        for (const c of filters.cities) {
          if (p.city.toLowerCase().includes(c)) {
            score += 15;
            break;
          }
        }
      }
      if (filters.features?.length) {
        for (const f of filters.features) {
          if (
            p.features.some((pf) => pf.toLowerCase().includes(f.toLowerCase()))
          ) {
            score += 5;
          }
        }
      }
      return { property: p, score: Math.min(score, 100) };
    })
    .filter((m) => m.score >= 15)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  return NextResponse.json({
    matches: scored,
    filters,
    narrative: filters.narrative,
    degraded,
  });
}
