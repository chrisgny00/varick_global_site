import { NextRequest, NextResponse } from "next/server";
import { callLLM, hasAIKey } from "@/lib/ai/client";
import { conciergePrompt, elitePrompt } from "@/lib/ai/prompts";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { message, mode } = await req.json().catch(() => ({}));
  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Missing message" }, { status: 400 });
  }

  if (!hasAIKey()) {
    return NextResponse.json({
      reply:
        "Our AI concierge is currently offline in this environment. For immediate assistance, please call 786.352.7547 or email info@varickglobal.com — an advisor will respond promptly.",
      degraded: true,
    });
  }

  try {
    const system = mode === "elite" ? elitePrompt : conciergePrompt;
    const reply = await callLLM({ system, user: message });
    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json(
      {
        reply:
          "I'm having trouble connecting at the moment. Please reach an advisor at 786.352.7547 or info@varickglobal.com.",
        degraded: true,
        error: e instanceof Error ? e.message : String(e),
      },
      { status: 200 },
    );
  }
}
