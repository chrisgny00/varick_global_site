"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Search, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { PropertyCard } from "@/components/idx/PropertyCard";
import type { Property } from "@/types";

const SUGGESTIONS = [
  "4 bedroom waterfront in Aventura under $8M",
  "Penthouse with ocean view in Miami Beach",
  "Modern estate in Coral Gables over $5M",
  "Luxury condo in Brickell under $3M",
  "Townhouse near Fort Lauderdale with pool",
  "Single family home in Bal Harbour $10M+",
];

interface SearchResult {
  properties: Property[];
  total: number;
  summary: string;
  live: boolean;
  filters: Record<string, unknown>;
}

export function AiSearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [placeholder, setPlaceholder] = useState(SUGGESTIONS[0]);

  // Cycle placeholder text
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % SUGGESTIONS.length;
      setPlaceholder(SUGGESTIONS[i]);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  // Auto-focus
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      if (!res.ok) throw new Error("Search failed");
      setResult(await res.json());
    } catch {
      setError("Search unavailable — try the filter panel below.");
    } finally {
      setLoading(false);
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    search(query);
  }

  // Build /properties URL from filters
  function buildPropertiesUrl(filters: Record<string, unknown>): string {
    const p = new URLSearchParams();
    if (filters.city) p.set("city", String(filters.city));
    if (filters.minPrice) p.set("minPrice", String(filters.minPrice));
    if (filters.maxPrice) p.set("maxPrice", String(filters.maxPrice));
    if (filters.minBeds) p.set("beds", String(filters.minBeds));
    if (filters.transactionType === "lease") p.set("transactionType", "rent");
    return `/properties?${p.toString()}`;
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col"
      style={{ background: "rgba(15,12,10,0.97)", backdropFilter: "blur(12px)" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-4 px-6 md:px-12 py-5 border-b"
        style={{ borderBottomColor: "rgba(179,35,56,0.25)" }}
      >
        <div className="flex items-center gap-2.5 text-vg-vivid">
          <Sparkles className="h-4 w-4" />
          <span className="font-accent text-[11px] font-bold uppercase tracking-[2.5px]">
            AI Property Search
          </span>
        </div>
        <button
          onClick={onClose}
          className="ml-auto text-white/40 hover:text-white transition-colors"
          aria-label="Close search"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Search input */}
      <div className="px-6 md:px-12 py-8 md:py-10">
        <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent border-b-2 border-white/20 focus:border-vg-vivid pb-4 text-white font-display text-2xl md:text-4xl placeholder:text-white/20 outline-none transition-colors pr-14"
          />
          <button
            type="submit"
            disabled={!query.trim() || loading}
            className="absolute right-0 bottom-3 text-white/40 hover:text-vg-vivid disabled:opacity-30 transition-colors"
          >
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <Search className="h-6 w-6" />
            )}
          </button>
        </form>

        {/* Suggestion chips */}
        {!result && !loading && (
          <div className="max-w-4xl mx-auto mt-8 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => { setQuery(s); search(s); }}
                className="text-[12px] text-white/40 hover:text-white border border-white/10 hover:border-vg-vivid/50 px-4 py-2 rounded-full transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-6 md:px-12 pb-12">
        {loading && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 text-vg-pewter mb-8">
              <Loader2 className="h-4 w-4 animate-spin text-vg-vivid" />
              <span className="font-accent text-[11px] uppercase tracking-[2px]">
                Searching South Florida listings…
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-[4px] overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-white/5" />
                  <div className="p-6 space-y-3 bg-vg-card/60">
                    <div className="h-4 bg-white/5 rounded w-1/2" />
                    <div className="h-6 bg-white/5 rounded w-3/4" />
                    <div className="h-3 bg-white/5 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-4xl mx-auto text-vg-pewter text-sm">{error}</div>
        )}

        {result && !loading && (
          <div className="max-w-4xl mx-auto">
            {/* Summary */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-white/90 font-display text-lg">
                  {result.summary}
                </p>
                <p className="mt-1 text-[12px] text-vg-pewter font-accent uppercase tracking-[2px]">
                  {result.total.toLocaleString()} {result.total === 1 ? "listing" : "listings"} found
                  {result.live && (
                    <span className="ml-2 text-vg-vivid">· Live MLS</span>
                  )}
                </p>
              </div>
              <Link
                href={buildPropertiesUrl(result.filters)}
                onClick={onClose}
                className="inline-flex items-center gap-2 font-accent text-[11px] font-bold uppercase tracking-[2px] text-vg-vivid border border-vg-vivid/40 hover:border-vg-vivid px-5 py-2.5 rounded-[2px] transition-colors"
              >
                View all {result.total} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {result.properties.length === 0 ? (
              <p className="text-vg-pewter text-sm">
                No exact matches. Try broadening your search or{" "}
                <Link href="/contact" onClick={onClose} className="text-vg-vivid underline">
                  speak with an advisor
                </Link>
                .
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.properties.map((p) => (
                  <div key={p.id} onClick={onClose}>
                    <PropertyCard property={p} />
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
