"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input, Select, Label } from "@/components/ui/Input";
import { cn } from "@/lib/cn";

const tabs: { id: "buy" | "rent" | "commercial"; label: string }[] = [
  { id: "buy", label: "Buy" },
  { id: "rent", label: "Rent" },
  { id: "commercial", label: "Commercial" },
];

const popular = [
  "Miami Beach",
  "Aventura",
  "Brickell",
  "Fort Lauderdale",
  "Palm Beach",
];

export function SearchBar() {
  const router = useRouter();
  const [tab, setTab] = useState<"buy" | "rent" | "commercial">("buy");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [type, setType] = useState("");

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const params = new URLSearchParams();
    params.set("transactionType", tab);
    if (city) params.set("city", city);
    if (price) {
      const [min, max] = price.split("-");
      if (min) params.set("minPrice", min);
      if (max) params.set("maxPrice", max);
    }
    if (beds) params.set("beds", beds);
    if (type) params.set("propertyType", type);
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <div
      className="bg-vg-card/95 backdrop-blur border rounded-[4px] p-6 md:p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
      style={{ borderColor: "rgba(255,255,255,0.10)" }}
    >
      <div className="flex gap-1 mb-6 border-b" style={{ borderBottomColor: "rgba(255,255,255,0.08)" }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "font-accent text-[11px] font-bold uppercase tracking-[2px] py-3 px-5 border-b-2 transition-colors",
              tab === t.id
                ? "border-vg-vivid text-white"
                : "border-transparent text-vg-pewter hover:text-white",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4">
          <Label>Location</Label>
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City or neighborhood"
            list="city-suggestions"
          />
          <datalist id="city-suggestions">
            {popular.concat([
              "Coral Gables", "Coconut Grove", "Bal Harbour", "Surfside",
              "Sunny Isles Beach", "Key Biscayne", "Hollywood",
              "Hallandale Beach", "Boca Raton", "Delray Beach",
              "Wellington", "Jupiter", "Doral", "Edgewater",
            ]).map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>

        <div className="md:col-span-3">
          <Label>Price Range</Label>
          <Select value={price} onChange={(e) => setPrice(e.target.value)}>
            <option value="">Any Price</option>
            <option value="0-1000000">Under $1M</option>
            <option value="1000000-3000000">$1M – $3M</option>
            <option value="3000000-5000000">$3M – $5M</option>
            <option value="5000000-10000000">$5M – $10M</option>
            <option value="10000000-">$10M+</option>
          </Select>
        </div>

        <div className="md:col-span-2">
          <Label>Beds</Label>
          <Select value={beds} onChange={(e) => setBeds(e.target.value)}>
            <option value="">Any</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </Select>
        </div>

        <div className="md:col-span-3">
          <Label>Type</Label>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All Types</option>
            {tab === "commercial" ? (
              <>
                <option>Office</option>
                <option>Retail</option>
                <option>Industrial</option>
                <option>Multi-Family</option>
                <option>Land</option>
              </>
            ) : (
              <>
                <option>Single Family</option>
                <option>Condo</option>
                <option>Townhouse</option>
                <option>Penthouse</option>
                <option>Estate</option>
              </>
            )}
          </Select>
        </div>

        <div className="md:col-span-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-accent text-[10px] font-bold uppercase tracking-[2px] text-vg-pewter mr-2">
              Popular
            </span>
            {popular.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setCity(p);
                }}
                className="text-[12px] text-vg-pewter hover:text-vg-vivid border border-white/10 hover:border-vg-vivid/50 px-3 py-1 rounded-[2px]"
              >
                {p}
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-vg-crimson hover:bg-vg-vivid text-white font-accent font-bold uppercase tracking-[2.5px] text-[11px] px-8 py-3.5 rounded-[2px] transition-colors"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
