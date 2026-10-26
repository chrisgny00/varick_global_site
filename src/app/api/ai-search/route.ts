import { NextRequest, NextResponse } from "next/server";
import { callLLM, hasAIKey } from "@/lib/ai/client";
import { fetchListings } from "@/lib/repliers";
import { properties as mockData, filterProperties } from "@/lib/data/properties";

export const runtime = "nodejs";

const parsePrompt = `You are a real estate search parser for Varick Global, a luxury South Florida real estate firm.

Extract structured search filters from a natural language query. Return ONLY a JSON object with these optional fields (omit if not mentioned):
{
  "city": string,           // e.g. "Miami Beach", "Aventura", "Brickell"
  "transactionType": "sale" | "lease",
  "propertyType": string,   // "Condo", "Single Family", "Townhouse", "Estate", "Penthouse"
  "minPrice": number,       // e.g. 2000000
  "maxPrice": number,       // e.g. 8000000
  "minBeds": number,
  "minBaths": number,
  "features": string[],     // e.g. ["waterfront", "pool", "dock"]
  "summary": string         // 1-sentence human-readable version of the search
}

Interpret natural language:
- "under $5M" → maxPrice: 5000000
- "over $3M" → minPrice: 3000000
- "$2M-$5M" → minPrice: 2000000, maxPrice: 5000000
- "waterfront" → features: ["waterfront"]
- "4 beds" or "4BR" → minBeds: 4
- If no transaction type mentioned, default to sale
- Luxury/high-end implies minPrice: 2000000 if no price given

Return ONLY valid JSON, no explanation.`;

interface ParsedFilters {
  city?: string;
  transactionType?: "sale" | "lease";
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  minBaths?: number;
  features?: string[];
  summary?: string;
}

export async function POST(req: NextRequest) {
  const { query } = await req.json().catch(() => ({}));
  if (!query || typeof query !== "string") {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  let filters: ParsedFilters = {};
  let summary = query;

  // Parse with AI if available
  if (hasAIKey()) {
    try {
      const raw = await callLLM({ system: parsePrompt, user: query });
      // Extract JSON from response
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        filters = JSON.parse(match[0]);
        if (filters.summary) summary = filters.summary;
      }
    } catch {
      // Fallback: basic keyword extraction
      filters = basicParse(query);
    }
  } else {
    filters = basicParse(query);
  }

  // Search Repliers with parsed filters
  const { properties: live, total } = await fetchListings({
    type: filters.transactionType === "lease" ? "lease" : "sale",
    city: filters.city,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    minBedrooms: filters.minBeds,
    minBaths: filters.minBaths,
    resultsPerPage: 9,
    sortBy: "createdOnDesc",
  });

  // Fall back to mock data
  const results = live.length
    ? live
    : filterProperties(mockData, {
        transactionType: filters.transactionType === "lease" ? "rent" : "buy",
        city: filters.city,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        beds: filters.minBeds,
        propertyType: filters.propertyType,
      });

  return NextResponse.json({
    properties: results.slice(0, 9),
    total: live.length ? total : results.length,
    filters,
    summary,
    live: live.length > 0,
  });
}

// Lightweight keyword parser when AI is unavailable
function basicParse(q: string): ParsedFilters {
  const lower = q.toLowerCase();
  const filters: ParsedFilters = {};

  // Price
  const under = lower.match(/under\s*\$?([\d,.]+)([mk]?)/);
  if (under) filters.maxPrice = parseMoney(under[1], under[2]);
  const over = lower.match(/over\s*\$?([\d,.]+)([mk]?)/);
  if (over) filters.minPrice = parseMoney(over[1], over[2]);
  const range = lower.match(/\$?([\d,.]+)([mk]?)\s*[-–to]+\s*\$?([\d,.]+)([mk]?)/);
  if (range) {
    filters.minPrice = parseMoney(range[1], range[2]);
    filters.maxPrice = parseMoney(range[3], range[4]);
  }

  // Beds
  const beds = lower.match(/(\d+)\s*(?:bed|br|bedroom)/);
  if (beds) filters.minBeds = Number(beds[1]);

  // Transaction
  if (/\brent\b|\blease\b/.test(lower)) filters.transactionType = "lease";

  // Cities
  const cities = [
    "miami beach", "miami", "brickell", "aventura", "coral gables", "coconut grove",
    "bal harbour", "surfside", "fort lauderdale", "boca raton", "palm beach",
    "delray beach", "hallandale", "sunny isles", "doral", "key biscayne",
  ];
  for (const city of cities) {
    if (lower.includes(city)) {
      filters.city = city.replace(/\b\w/g, (c) => c.toUpperCase());
      break;
    }
  }

  // Features
  const featureMap: Record<string, string> = {
    waterfront: "waterfront", pool: "pool", dock: "dock",
    "ocean view": "Ocean View", "bay view": "Bay View",
    penthouse: "penthouse", "smart home": "Smart Home",
  };
  filters.features = Object.entries(featureMap)
    .filter(([k]) => lower.includes(k))
    .map(([, v]) => v);

  // Property type
  if (/\bcondo\b/.test(lower)) filters.propertyType = "Condo";
  else if (/\bpenthouse\b/.test(lower)) filters.propertyType = "Penthouse";
  else if (/\btownhouse\b/.test(lower)) filters.propertyType = "Townhouse";
  else if (/\bestate\b/.test(lower)) filters.propertyType = "Estate";
  else if (/\bhouse\b|\bsingle.?family\b/.test(lower)) filters.propertyType = "Single Family";

  filters.summary = q;
  return filters;
}

function parseMoney(num: string, suffix: string): number {
  const n = Number(num.replace(/,/g, ""));
  if (suffix === "m" || suffix === "M") return n * 1_000_000;
  if (suffix === "k" || suffix === "K") return n * 1_000;
  return n;
}
