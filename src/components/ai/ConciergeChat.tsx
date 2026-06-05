"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { cn } from "@/lib/cn";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

export function ConciergeChat({ mode = "default" }: { mode?: "default" | "elite" }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        mode === "elite"
          ? "Welcome to VG Elite. I am your discreet concierge — how may I be of service?"
          : "Welcome to Varick Global. I'm here to help with luxury properties, market intelligence, or to connect you with an advisor.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);
    try {
      const r = await fetch("/api/concierge", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: text, mode }),
      });
      const data = await r.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply || "I'm not sure how to help with that." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting. Please call 786.352.7547 to reach an advisor directly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const accent = mode === "elite" ? "elite-violet" : "vg-crimson";

  return (
    <>
      <button
        aria-label="Open concierge chat"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full flex items-center justify-center shadow-[0_15px_40px_-10px_rgba(0,0,0,0.7)] transition-all",
          mode === "elite"
            ? "bg-elite-violet hover:bg-elite-violet-light text-white"
            : "bg-vg-crimson hover:bg-vg-vivid text-white",
        )}
      >
        {open ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-40 w-[min(96vw,400px)] h-[min(72vh,560px)] bg-vg-card border rounded-[4px] flex flex-col shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
          style={{ borderColor: "rgba(255,255,255,0.10)" }}
        >
          <div
            className="px-5 py-4 border-b flex items-center justify-between"
            style={{ borderBottomColor: "rgba(255,255,255,0.08)" }}
          >
            <div>
              <div className={cn("eyebrow", mode === "elite" && "!text-elite-violet-light")}>
                {mode === "elite" ? "VG Elite Concierge" : "Concierge"}
              </div>
              <div className="font-display text-lg text-white mt-0.5">
                {mode === "elite" ? "Discreet Assistance" : "How can I help?"}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] text-[14px] leading-relaxed",
                  m.role === "user"
                    ? `ml-auto bg-${accent}/15 text-white border border-${accent}/30 px-4 py-2.5 rounded-[2px]`
                    : "text-vg-pewter",
                )}
                style={
                  m.role === "user"
                    ? {
                        backgroundColor:
                          mode === "elite"
                            ? "rgba(250,201,184,0.12)"
                            : "rgba(219,138,116,0.14)",
                        borderColor:
                          mode === "elite"
                            ? "rgba(250,201,184,0.3)"
                            : "rgba(219,138,116,0.3)",
                      }
                    : {}
                }
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="text-vg-pewter text-[13px] italic">Composing…</div>
            )}
            <div ref={endRef} />
          </div>

          <div
            className="p-4 border-t flex gap-2"
            style={{ borderTopColor: "rgba(255,255,255,0.08)" }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about a property, neighborhood, or service…"
              className="flex-1 bg-black/40 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-vg-pewter focus:border-vg-vivid focus:outline-none rounded-[2px]"
            />
            <button
              onClick={send}
              disabled={loading}
              aria-label="Send"
              className={cn(
                "px-4 rounded-[2px] text-white disabled:opacity-50",
                mode === "elite"
                  ? "bg-elite-violet hover:bg-elite-violet-light"
                  : "bg-vg-crimson hover:bg-vg-vivid",
              )}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
