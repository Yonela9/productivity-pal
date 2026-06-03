import { createFileRoute } from "@tanstack/react-router";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

interface Body {
  mode: "email" | "meeting" | "tasks" | "research";
  payload: Record<string, string>;
}

const systemPrompts: Record<Body["mode"], string> = {
  email: `You are an expert professional email writer. Given the purpose, recipient, tone, and key points, produce:
1. A concise subject line
2. A professional email body with proper greeting and sign-off
3. A clear call to action
Use markdown formatting with **Subject:** on first line, then a blank line, then the email body.`,
  meeting: `You are a meeting notes analyst. Summarize the provided meeting notes into these markdown sections:
## Key Discussion Points
## Decisions Made
## Action Items
## Risks & Concerns
## Next Steps
Be concise, factual, and actionable.`,
  tasks: `You are an expert project planner. Given a project goal, priority, and deadline, produce a markdown plan with:
## Task Breakdown (numbered list with estimated effort)
## Timeline (week-by-week)
## Dependencies
## Recommendations
Be realistic and actionable.`,
  research: `You are a senior business research analyst. Given a research topic, industry, and depth level, produce a comprehensive markdown report with:
## Executive Summary
## Market Trends
## Opportunities
## Risks & Challenges
## Recommendations
Use concrete examples where possible.`,
};

function buildUserPrompt(mode: Body["mode"], payload: Record<string, string>): string {
  switch (mode) {
    case "email":
      return `Purpose: ${payload.purpose}\nRecipient: ${payload.recipient}\nTone: ${payload.tone}\nKey Points: ${payload.keyPoints}`;
    case "meeting":
      return `Meeting Notes:\n\n${payload.notes}`;
    case "tasks":
      return `Project Goal: ${payload.goal}\nPriority: ${payload.priority}\nDeadline: ${payload.deadline}`;
    case "research":
      return `Topic: ${payload.topic}\nIndustry: ${payload.industry}\nDepth: ${payload.depth}`;
  }
}

export const Route = createFileRoute("/api/ai/generate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { mode, payload } = (await request.json()) as Body;
          const key = process.env.LOVABLE_API_KEY;
          if (!key) {
            return Response.json({ error: "LOVABLE_API_KEY not configured" }, { status: 500 });
          }
          if (!systemPrompts[mode]) {
            return Response.json({ error: "Invalid mode" }, { status: 400 });
          }
          const res = await fetch(GATEWAY_URL, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${key}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [
                { role: "system", content: systemPrompts[mode] },
                { role: "user", content: buildUserPrompt(mode, payload) },
              ],
            }),
          });
          if (res.status === 429) return Response.json({ error: "Rate limit reached. Please try again shortly." }, { status: 429 });
          if (res.status === 402) return Response.json({ error: "AI credits exhausted. Please add credits to continue." }, { status: 402 });
          if (!res.ok) {
            const t = await res.text();
            console.error("AI gateway error", res.status, t);
            return Response.json({ error: "AI request failed" }, { status: 500 });
          }
          const data = await res.json();
          const content = data?.choices?.[0]?.message?.content ?? "";
          return Response.json({ content });
        } catch (e) {
          console.error(e);
          return Response.json({ error: e instanceof Error ? e.message : "Unknown error" }, { status: 500 });
        }
      },
    },
  },
});
