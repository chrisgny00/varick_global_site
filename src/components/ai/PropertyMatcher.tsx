"use client";

import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PropertyCard } from "@/components/idx/PropertyCard";
import { IconBadge } from "@/components/ui/IconBadge";
import type { Property } from "@/types";

interface Match {
  property: Property;
  score: number;
}

export function PropertyMatcher() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [narrative, setNarrative] = useState<string>("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    try {
      const r = await fetch("/api/property-match", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ description: input }),
      });
      const data = await r.json();
      setMatches(data.matches || []);
      setNarrative(data.narrative || "");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="relative bg-vg-card border rounded-[4px] p-8 md:p-12 overflow-hidden"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(250,201,184,0.15) 0%, transparent 60%), radial-gradient(ellipse at bottom left, rgba(219,138,116,0.14) 0%, transparent 60%)",
        }}
      />
      <div className="relative">
        <div className="flex items-center gap-4 mb-4">
          <IconBadge variant="gradient" size="md">
            <Sparkles className="h-5 w-5" />
          </IconBadge>
          <div className="eyebrow">AI Property Matchmaker</div>
        </div>

        <h3 className="display-h2 text-white max-w-2xl">
          Describe your <em className="italic-accent">dream home</em>
        </h3>
        <p className="mt-3 text-vg-pewter max-w-xl">
          Tell us in your own words. Our AI will translate it into a curated set of South Florida
          properties.
        </p>

        <form onSubmit={submit} className="mt-8 flex flex-col md:flex-row gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="A 5-bedroom waterfront estate in Miami Beach under $20M, with a dock and pool…"
            className="flex-1 bg-black/40 border border-white/10 px-5 py-4 text-[15px] text-white placeholder:text-vg-pewter focus:border-vg-vivid focus:outline-none rounded-[2px]"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 bg-vg-crimson hover:bg-vg-vivid text-white font-accent font-bold uppercase tracking-[2.5px] text-[11px] px-7 py-4 rounded-[2px] disabled:opacity-50"
          >
            {loading ? "Matching…" : "Find Matches"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {matches && (
          <div className="mt-10">
            {narrative && <p className="text-vg-pewter italic mb-6">{narrative}</p>}
            {matches.length === 0 ? (
              <div className="text-center py-10 text-vg-pewter">
                No precise matches today.{" "}
                <Link href="/contact" className="text-vg-vivid hover:underline">
                  Speak with an advisor
                </Link>{" "}
                — we have access to off-market inventory.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {matches.map((m) => (
                  <div key={m.property.id} className="relative">
                    <div className="absolute -top-3 left-4 z-10 bg-vg-deep px-3 py-1 border border-vg-vivid/40 text-vg-vivid font-accent text-[10px] font-bold uppercase tracking-[1.5px] rounded-[2px]">
                      {m.score}% match
                    </div>
                    <PropertyCard property={m.property} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
