"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2, ExternalLink, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Property } from "@/types";
import { formatPrice } from "@/lib/format";

interface Msg {
  role: "user" | "assistant";
  content: string;
  properties?: Property[];
  searchQuery?: string;
}

const QUICK_PROMPTS = [
  "Waterfront homes in Miami Beach",
  "Condos under $3M in Brickell",
  "HOA advisory services",
  "VG Elite membership",
];

export function ConciergeChat({ mode = "default" }: { mode?: "default" | "elite" }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        mode === "elite"
          ? "Welcome to VG Elite. I am your discreet concierge — how may I be of service?"
          : "Welcome to Varick Global. I'm here to help with luxury properties, market intelligence, or to connect you with an advisor. What are you looking for today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: msg }]);
    setLoading(true);

    try {
      const r = await fetch("/api/concierge", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: msg, mode }),
      });
      const data = await r.json();
      const reply: string = data.reply || "I'm not sure how to help with that.";

      // Detect property search intent
      const searchMatch = reply.match(/SEARCH_QUERY:\s*(\{[^}]+\})/);
      const cleanReply = reply.replace(/SEARCH_QUERY:\s*\{[^}]+\}/g, "").trim();

      if (searchMatch) {
        try {
          const { query } = JSON.parse(searchMatch[1]) as { query: string };
          // Run the AI search in parallel
          const sr = await fetch("/api/ai-search", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ query }),
          });
          const sd = await sr.json();
          setMessages((m) => [
            ...m,
            {
              role: "assistant",
              content: cleanReply,
              properties: sd.properties?.slice(0, 3),
              searchQuery: query,
            },
          ]);
        } catch {
          setMessages((m) => [...m, { role: "assistant", content: cleanReply }]);
        }
      } else {
        setMessages((m) => [...m, { role: "assistant", content: cleanReply }]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "I'm having trouble connecting. Please call 786.352.7547 to reach an advisor directly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const isElite = mode === "elite";

  return (
    <>
      <button
        aria-label="Open concierge chat"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full flex items-center justify-center shadow-[0_15px_40px_-10px_rgba(0,0,0,0.7)] transition-all",
          isElite
            ? "bg-elite-violet hover:bg-elite-violet-light"
            : "bg-vg-crimson hover:bg-vg-vivid",
          "text-white",
        )}
      >
        {open ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-40 w-[min(96vw,420px)] h-[min(80vh,620px)] bg-vg-deep border rounded-[4px] flex flex-col shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
          style={{ borderColor: "rgba(255,255,255,0.10)" }}
        >
          {/* Header */}
          <div
            className="px-5 py-4 border-b flex items-center justify-between flex-shrink-0"
            style={{ borderBottomColor: "rgba(255,255,255,0.08)" }}
          >
            <div>
              <div className={cn("eyebrow", isElite && "!text-elite-violet-light")}>
                {isElite ? "VG Elite Concierge" : "AI Concierge"}
              </div>
              <div className="font-display text-lg text-white mt-0.5">
                {isElite ? "Discreet Assistance" : "How can I help?"}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((m, i) => (
              <div key={i}>
                <div
                  className={cn(
                    "text-[14px] leading-relaxed",
                    m.role === "user"
                      ? "ml-auto max-w-[85%] px-4 py-2.5 rounded-[2px] text-white"
                      : "text-vg-pewter",
                  )}
                  style={
                    m.role === "user"
                      ? {
                          backgroundColor: isElite ? "rgba(109,71,217,0.12)" : "rgba(179,35,56,0.12)",
                          borderColor: isElite ? "rgba(109,71,217,0.3)" : "rgba(179,35,56,0.3)",
                          border: "1px solid",
                        }
                      : {}
                  }
                >
                  {m.content}
                </div>

                {/* Inline property results */}
                {m.properties && m.properties.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {m.properties.map((p) => (
                      <Link
                        key={p.id}
                        href={`/properties/${p.id}`}
                        className="block bg-white/5 border border-white/08 hover:border-vg-vivid/50 rounded-[2px] p-3 transition-colors group"
                        style={{ borderColor: "rgba(255,255,255,0.07)" }}
                      >
                        <div className="font-display text-vg-vivid text-sm">
                          {formatPrice(p.price, p.transactionType)}
                        </div>
                        <div className="text-white/80 text-[13px] font-medium mt-0.5 group-hover:text-white truncate">
                          {p.title}
                        </div>
                        <div className="text-vg-pewter text-[11px] mt-1">
                          {p.city} · {p.beds > 0 ? `${p.beds} bd` : ""} {p.baths > 0 ? `${p.baths} ba` : ""}
                        </div>
                      </Link>
                    ))}
                    {m.searchQuery && (
                      <Link
                        href={`/properties?q=${encodeURIComponent(m.searchQuery)}`}
                        className="flex items-center gap-2 text-[11px] text-vg-vivid hover:underline mt-1"
                      >
                        <Search className="h-3 w-3" />
                        View all matching listings
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-vg-pewter text-[13px]">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span className="italic">Searching listings…</span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick prompts (only on first message) */}
          {messages.length === 1 && !loading && (
            <div
              className="px-4 pb-3 border-t flex flex-wrap gap-1.5 flex-shrink-0"
              style={{ borderTopColor: "rgba(255,255,255,0.06)" }}
            >
              {QUICK_PROMPTS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-[11px] text-vg-pewter hover:text-white border border-white/08 hover:border-white/20 px-2.5 py-1 rounded-full transition-colors"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            className="p-4 border-t flex gap-2 flex-shrink-0"
            style={{ borderTopColor: "rgba(255,255,255,0.08)" }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Ask about a property, neighborhood…"
              className="flex-1 bg-black/40 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-vg-pewter focus:border-vg-vivid focus:outline-none rounded-[2px] min-w-0"
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              aria-label="Send"
              className={cn(
                "px-4 rounded-[2px] text-white disabled:opacity-40 transition-colors flex-shrink-0",
                isElite ? "bg-elite-violet hover:bg-elite-violet-light" : "bg-vg-crimson hover:bg-vg-vivid",
              )}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
