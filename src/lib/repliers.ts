import type { Property, County, PropertyType, TransactionType, PropertyStatus } from "@/types";

const BASE_URL = "https://api.repliers.io";

// ── Repliers API shapes ──────────────────────────────────────────────────────

interface RepliersAddress {
  streetNumber?: string;
  streetName?: string;
  streetSuffix?: string;
  unitNumber?: string;
  city?: string;
  state?: string;
  zip?: string;
  neighborhood?: string;
  area?: string;
}

interface RepliersDetails {
  numBedrooms?: number;
  numBathrooms?: number;
  sqft?: number;
  numGarageSpaces?: number;
  propertyType?: string;
  style?: string;
  yearBuilt?: number;
  description?: string;
  extras?: string;
  swimmingPool?: string;
  waterFront?: string;
  waterBodyType?: string;
  status?: string;
}

export interface RepliersListing {
  mlsNumber: string;
  listPrice: number;
  address: RepliersAddress;
  details: RepliersDetails;
  images?: string[];
  photoCount?: number;
  daysOnMarket?: number;
  status?: string;
  type?: string;
  class?: string;
  map?: { latitude?: number; longitude?: number };
  timestamps?: { listDate?: string };
}

interface RepliersResponse {
  listings: RepliersListing[];
  numFound: number;
  page?: { numResults: number; pageNum: number; numPages: number };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const MIAMI_DADE = new Set([
  "miami", "miami beach", "coral gables", "aventura", "bal harbour",
  "surfside", "bay harbor islands", "miami shores", "brickell",
  "coconut grove", "palmetto bay", "pinecrest", "south miami", "kendall",
  "homestead", "hialeah", "doral", "north miami", "north miami beach",
  "miami gardens", "key biscayne", "fisher island", "miami lakes",
  "golden beach", "el portal", "north bay village",
]);

const BROWARD = new Set([
  "fort lauderdale", "hollywood", "pompano beach", "miramar",
  "coral springs", "pembroke pines", "sunrise", "plantation", "weston",
  "davie", "deerfield beach", "margate", "tamarac", "hallandale beach",
  "dania beach", "lauderdale-by-the-sea", "coconut creek", "parkland",
  "lighthouse point", "hillsboro beach", "lauderhill", "oakland park",
  "wilton manors",
]);

function inferCounty(city?: string): County {
  const c = (city ?? "").toLowerCase().trim();
  if (MIAMI_DADE.has(c)) return "Miami-Dade";
  if (BROWARD.has(c)) return "Broward";
  return "Palm Beach";
}

function mapPropertyType(raw?: string): PropertyType {
  const t = (raw ?? "").toLowerCase();
  if (t.includes("condo") || t.includes("co-op")) return "Condo";
  if (t.includes("penthouse")) return "Penthouse";
  if (t.includes("townhouse") || t.includes("twnhouse") || t.includes("row")) return "Townhouse";
  if (t.includes("estate") || t.includes("villa")) return "Estate";
  if (t.includes("single family") || t.includes("detached") || t.includes("residential")) return "Single Family";
  if (t.includes("office")) return "Office";
  if (t.includes("retail")) return "Retail";
  if (t.includes("industrial") || t.includes("warehouse")) return "Industrial";
  if (t.includes("multi") || t.includes("duplex") || t.includes("triplex")) return "Multi-Family";
  if (t.includes("land") || t.includes("lot")) return "Land";
  return "Condo";
}

function mapTransactionType(type?: string, cls?: string): TransactionType {
  if ((cls ?? "").toLowerCase().includes("commercial")) return "commercial";
  if ((type ?? "").toLowerCase() === "lease") return "rent";
  return "buy";
}

function mapStatus(status?: string): PropertyStatus {
  const s = (status ?? "A").toUpperCase();
  if (s === "U" || s === "SLD" || s === "SOLD") return "Sold";
  if (s === "P" || s === "PEND" || s === "PENDING") return "Pending";
  if (s === "CS" || s === "COMING") return "Coming Soon";
  return "Active";
}

function formatAddress(addr: RepliersAddress): string {
  const parts = [
    addr.streetNumber,
    addr.streetName,
    addr.streetSuffix,
    addr.unitNumber ? `#${addr.unitNumber}` : undefined,
  ].filter(Boolean);
  return parts.join(" ") || addr.neighborhood || "";
}

function extractFeatures(d: RepliersDetails): string[] {
  const f: string[] = [];
  if (d.waterFront && d.waterFront !== "N") f.push("Waterfront");
  if (d.waterBodyType) f.push(d.waterBodyType);
  if (d.swimmingPool && d.swimmingPool !== "N") f.push("Pool");
  if (d.numGarageSpaces && d.numGarageSpaces >= 2) f.push(`${d.numGarageSpaces}-Car Garage`);
  if ((d.extras ?? "").toLowerCase().includes("elevator")) f.push("Private Elevator");
  if ((d.extras ?? "").toLowerCase().includes("concierge")) f.push("Concierge");
  if ((d.extras ?? "").toLowerCase().includes("dock")) f.push("Dock");
  return f;
}

function decideBadge(listing: RepliersListing, transactionType: TransactionType): string | undefined {
  const dom = listing.daysOnMarket ?? 0;
  const status = mapStatus(listing.status);
  if (status === "Coming Soon") return "Coming Soon";
  if (dom <= 7) return "New Listing";
  const price = listing.listPrice;
  if (transactionType === "buy" && price >= 10_000_000) return "Ultra Luxury";
  if (transactionType === "buy" && price >= 5_000_000) return "Luxury";
  return undefined;
}

// ── Public mapper ─────────────────────────────────────────────────────────────

export function repliersToProperty(listing: RepliersListing): Property {
  const transactionType = mapTransactionType(listing.type, listing.class);
  return {
    id: listing.mlsNumber,
    title: buildTitle(listing),
    address: formatAddress(listing.address),
    city: listing.address.city ?? "",
    county: inferCounty(listing.address.city),
    price: listing.listPrice,
    beds: listing.details.numBedrooms ?? 0,
    baths: listing.details.numBathrooms ?? 0,
    sqft: listing.details.sqft ?? 0,
    propertyType: mapPropertyType(listing.details.propertyType ?? listing.details.style),
    transactionType,
    lat: listing.map?.latitude ?? 25.7617,
    lng: listing.map?.longitude ?? -80.1918,
    images: listing.images ?? [],
    features: extractFeatures(listing.details),
    status: mapStatus(listing.status),
    daysOnMarket: listing.daysOnMarket ?? 0,
    badge: decideBadge(listing, transactionType),
    description: listing.details.description,
  };
}

function buildTitle(listing: RepliersListing): string {
  const { details, address } = listing;
  const type = mapPropertyType(details.propertyType ?? details.style);
  const city = address.city ?? address.neighborhood ?? "";
  const suffix = type === "Condo" || type === "Penthouse" ? "Residence" : "";
  if (address.neighborhood) return `${address.neighborhood} ${type}${suffix ? " " + suffix : ""}`;
  return `${city} ${type}${suffix ? " " + suffix : ""}`;
}

// ── API client ────────────────────────────────────────────────────────────────

export interface ListingsQuery {
  type?: "sale" | "lease";
  class?: "ResidentialProperty" | "CondoProperty" | "CommercialProperty";
  city?: string;
  area?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBaths?: number;
  minSqft?: number;
  propertyType?: string;
  status?: string;
  resultsPerPage?: number;
  pageNum?: number;
  sortBy?: string;
}

export async function fetchListings(query: ListingsQuery = {}): Promise<{
  properties: Property[];
  total: number;
}> {
  const apiKey = process.env.REPLIERS_API_KEY;
  if (!apiKey) return { properties: [], total: 0 };

  const params = new URLSearchParams();
  params.set("status", query.status ?? "A");
  if (query.type) params.set("type", query.type);
  if (query.class) params.set("class", query.class);
  if (query.city) params.set("city", query.city);
  if (query.area) params.set("area", query.area);
  if (query.minPrice) params.set("minPrice", String(query.minPrice));
  if (query.maxPrice) params.set("maxPrice", String(query.maxPrice));
  if (query.minBedrooms) params.set("minBedrooms", String(query.minBedrooms));
  if (query.maxBedrooms) params.set("maxBedrooms", String(query.maxBedrooms));
  if (query.minBaths) params.set("minBaths", String(query.minBaths));
  if (query.minSqft) params.set("minSqft", String(query.minSqft));
  params.set("resultsPerPage", String(query.resultsPerPage ?? 24));
  params.set("pageNum", String(query.pageNum ?? 1));
  if (query.sortBy) params.set("sortBy", query.sortBy ?? "createdOnDesc");

  try {
    const res = await fetch(`${BASE_URL}/listings?${params}`, {
      headers: { "REPLIERS-API-KEY": apiKey, "Content-Type": "application/json" },
      next: { revalidate: 300 }, // cache 5 min
    });
    if (!res.ok) return { properties: [], total: 0 };
    const data: RepliersResponse = await res.json();
    return {
      properties: (data.listings ?? []).map(repliersToProperty),
      total: data.numFound ?? 0,
    };
  } catch {
    return { properties: [], total: 0 };
  }
}

export async function fetchListing(mlsNumber: string): Promise<Property | null> {
  const apiKey = process.env.REPLIERS_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(`${BASE_URL}/listings/${mlsNumber}`, {
      headers: { "REPLIERS-API-KEY": apiKey, "Content-Type": "application/json" },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data: RepliersListing = await res.json();
    return repliersToProperty(data);
  } catch {
    return null;
  }
}
