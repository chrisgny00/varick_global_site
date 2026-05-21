import { NextRequest, NextResponse } from "next/server";
import { callLLM, hasAIKey } from "@/lib/ai/client";
import { properties } from "@/lib/data/properties";

export const runtime = "nodejs";

interface ValuationInput {
  address: string;
  city: string;
  beds: number;
  baths: number;
  sqft: number;
  propertyType: string;
}

function estimate(input: ValuationInput) {
  const comps = properties
    .filter(
      (p) =>
        p.transactionType === "buy" &&
        (p.city.toLowerCase() === input.city.toLowerCase() ||
          p.propertyType === input.propertyType),
    )
    .slice(0, 6);

  const pricePerSqft =
    comps.length > 0
      ? comps.reduce((s, c) => s + c.price / c.sqft, 0) / comps.length
      : 750;

  const base = input.sqft * pricePerSqft;
  const low = Math.round(base * 0.92);
  const high = Math.round(base * 1.08);
  const mid = Math.round(base);

  return { low, mid, high, pricePerSqft: Math.round(pricePerSqft), comps };
}

export async function POST(req: NextRequest) {
  const input = (await req.json().catch(() => ({}))) as ValuationInput;
  if (!input.address || !input.sqft) {
    return NextResponse.json({ error: "Missing address or sqft" }, { status: 400 });
  }

  const valuation = estimate(input);
  let narrative =
    `Based on ${valuation.comps.length} recent comparable transactions, ${input.address} in ${input.city} estimates between $${valuation.low.toLocaleString()} and $${valuation.high.toLocaleString()}. ` +
    `Average price per square foot for this submarket is ~$${valuation.pricePerSqft}. For a verified, signed CMA, a Varick Global advisor will follow up within one business day.`;

  if (hasAIKey()) {
    try {
      narrative = await callLLM({
        system:
          "You write CMAs (comparative market analyses) in the voice of Varick Global — luxury real estate in South Florida. Professional, discreet, knowledgeable. Two short paragraphs. No exclamation marks. No emoji.",
        user: `Property: ${input.address}, ${input.city}. ${input.beds} bd / ${input.baths} ba, ${input.sqft} sqft, ${input.propertyType}. Estimated range: $${valuation.low.toLocaleString()} – $${valuation.high.toLocaleString()} (mid $${valuation.mid.toLocaleString()}). Price/sqft: $${valuation.pricePerSqft}. ${valuation.comps.length} comps used. Write the CMA narrative.`,
      });
    } catch {
      // fall through to heuristic narrative
    }
  }

  return NextResponse.json({ valuation, narrative, degraded: !hasAIKey() });
}
