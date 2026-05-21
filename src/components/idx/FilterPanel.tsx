"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Input, Select, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const propertyTypes = [
  "Single Family", "Condo", "Townhouse", "Penthouse", "Estate",
  "Office", "Retail", "Industrial", "Multi-Family", "Land",
];

const luxuryFeatures = [
  "Ocean View", "Bay View", "Waterfront", "Dock", "Pool",
  "Smart Home", "Concierge Building", "Private Elevator",
];

export function FilterPanel() {
  const router = useRouter();
  const sp = useSearchParams();
  const [state, setState] = useState<Record<string, string>>({});

  useEffect(() => {
    const next: Record<string, string> = {};
    sp.forEach((v, k) => (next[k] = v));
    setState(next);
  }, [sp]);

  function update(key: string, value: string) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function apply() {
    const params = new URLSearchParams();
    Object.entries(state).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    router.push(`/properties?${params.toString()}`);
  }

  function reset() {
    setState({});
    router.push("/properties");
  }

  return (
    <aside
      className="bg-vg-card border rounded-[4px] p-7 sticky top-20"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-accent text-[11px] font-bold uppercase tracking-[2.5px] text-white">
          Filters
        </h3>
        <button onClick={reset} className="text-[11px] text-vg-vivid hover:underline">
          Reset
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <Label>Transaction</Label>
          <Select
            value={state.transactionType || ""}
            onChange={(e) => update("transactionType", e.target.value)}
          >
            <option value="">Any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
            <option value="commercial">Commercial</option>
          </Select>
        </div>

        <div>
          <Label>Location</Label>
          <Input
            value={state.city || ""}
            onChange={(e) => update("city", e.target.value)}
            placeholder="City or zip"
          />
        </div>

        <div>
          <Label>County</Label>
          <Select value={state.county || ""} onChange={(e) => update("county", e.target.value)}>
            <option value="">Any</option>
            <option value="Miami-Dade">Miami-Dade</option>
            <option value="Broward">Broward</option>
            <option value="Palm Beach">Palm Beach</option>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Min Price</Label>
            <Input
              type="number"
              value={state.minPrice || ""}
              onChange={(e) => update("minPrice", e.target.value)}
              placeholder="$"
            />
          </div>
          <div>
            <Label>Max Price</Label>
            <Input
              type="number"
              value={state.maxPrice || ""}
              onChange={(e) => update("maxPrice", e.target.value)}
              placeholder="$"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Beds</Label>
            <Select value={state.beds || ""} onChange={(e) => update("beds", e.target.value)}>
              <option value="">Any</option>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n}+</option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Baths</Label>
            <Select value={state.baths || ""} onChange={(e) => update("baths", e.target.value)}>
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}+</option>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <Label>Property Type</Label>
          <Select
            value={state.propertyType || ""}
            onChange={(e) => update("propertyType", e.target.value)}
          >
            <option value="">All</option>
            {propertyTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </div>

        <div>
          <Label>Luxury Features</Label>
          <Select value={state.q || ""} onChange={(e) => update("q", e.target.value)}>
            <option value="">Any</option>
            {luxuryFeatures.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </Select>
        </div>

        <Button onClick={apply} className="w-full mt-2">
          Apply Filters
        </Button>
      </div>
    </aside>
  );
}
