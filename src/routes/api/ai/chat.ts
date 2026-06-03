import { createFileRoute } from "@tanstack/react-router";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

export const Route = createFileRoute("/api/ai/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as {
            messages: { role: "user" | "assistant"; content: string }[];
          };
          const key = process.env.LOVABLE_API_KEY;
          if (!key) return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), { status: 500 });

          const res = await fetch(GATEWAY_URL, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${key}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [
                {
                  role: "system",
                  content:
                    "You are Fluent, a helpful workplace productivity assistant. Be concise, clear, and actionable. Use markdown formatting when helpful.",
                },
                ...messages,
              ],
              stream: true,
            }),
          });

          if (res.status === 429)
            return new Response(JSON.stringify({ error: "Rate limit reached. Please try again shortly." }), { status: 429, headers: { "Content-Type": "application/json" } });
          if (res.status === 402)
            return new Response(JSON.stringify({ error: "AI credits exhausted." }), { status: 402, headers: { "Content-Type": "application/json" } });
          if (!res.ok || !res.body) {
            const t = await res.text();
            console.error("AI gateway error", res.status, t);
            return new Response(JSON.stringify({ error: "AI request failed" }), { status: 500, headers: { "Content-Type": "application/json" } });
          }

          return new Response(res.body, {
            headers: { "Content-Type": "text/event-stream" },
          });
        } catch (e) {
          console.error(e);
          return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), { status: 500 });
        }
      },
    },
  },
});
