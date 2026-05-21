"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Input, Select, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface Valuation {
  low: number;
  mid: number;
  high: number;
  pricePerSqft: number;
  comps: { id: string; city: string; price: number; sqft: number }[];
}

export function ValuationTool() {
  const [form, setForm] = useState({
    address: "",
    city: "Miami Beach",
    beds: 4,
    baths: 4,
    sqft: 3000,
    propertyType: "Single Family",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ valuation: Valuation; narrative: string; degraded: boolean } | null>(null);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await fetch("/api/valuation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await r.json();
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <form onSubmit={submit} className="lg:col-span-5">
          <Card>
            <div className="eyebrow mb-4">AI Valuation</div>
            <h3 className="display-h3 text-white mb-6">Your property details</h3>
            <div className="space-y-4">
              <div>
                <Label>Address</Label>
                <Input
                  required
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  placeholder="123 Ocean Drive"
                />
              </div>
              <div>
                <Label>City</Label>
                <Input value={form.city} onChange={(e) => update("city", e.target.value)} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>Beds</Label>
                  <Input
                    type="number"
                    value={form.beds}
                    onChange={(e) => update("beds", Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Baths</Label>
                  <Input
                    type="number"
                    value={form.baths}
                    onChange={(e) => update("baths", Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Sqft</Label>
                  <Input
                    type="number"
                    value={form.sqft}
                    onChange={(e) => update("sqft", Number(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <Label>Property Type</Label>
                <Select
                  value={form.propertyType}
                  onChange={(e) => update("propertyType", e.target.value)}
                >
                  <option>Single Family</option>
                  <option>Condo</option>
                  <option>Townhouse</option>
                  <option>Penthouse</option>
                  <option>Estate</option>
                </Select>
              </div>
              <Button type="submit" className="w-full mt-2" disabled={loading}>
                {loading ? "Calculating…" : "Get Estimate"}
              </Button>
            </div>
          </Card>
        </form>

        <div className="lg:col-span-7">
          {result ? (
            <Card accent>
              <div className="eyebrow mb-4">Estimated Value Range</div>
              <div className="flex items-baseline gap-3">
                <div className="font-display text-5xl text-vg-vivid font-light">
                  ${result.valuation.low.toLocaleString()}
                </div>
                <span className="text-vg-pewter">—</span>
                <div className="font-display text-5xl text-vg-vivid font-light">
                  ${result.valuation.high.toLocaleString()}
                </div>
              </div>
              <div className="mt-2 text-sm text-vg-pewter">
                Mid: <span className="text-white">${result.valuation.mid.toLocaleString()}</span> · Price/sqft: $
                {result.valuation.pricePerSqft}
              </div>

              <div
                className="mt-8 pt-8 border-t"
                style={{ borderTopColor: "rgba(255,255,255,0.08)" }}
              >
                <h4 className="display-h3 text-white mb-3">Narrative</h4>
                <p className="text-vg-pewter leading-relaxed whitespace-pre-line">{result.narrative}</p>
                {result.degraded && (
                  <p className="mt-4 text-[11px] text-vg-pewter italic">
                    AI narrative is offline in this environment. Heuristic estimate shown.
                  </p>
                )}
              </div>
            </Card>
          ) : (
            <Card>
              <div className="text-center py-12">
                <div className="eyebrow mb-3">Valuation</div>
                <p className="text-vg-pewter max-w-md mx-auto">
                  Enter your property details and we'll generate an instant value estimate using
                  recent South Florida comps. A Varick Global advisor will follow up with a verified
                  CMA within one business day.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Container>
  );
}
