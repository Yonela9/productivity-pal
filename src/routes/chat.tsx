import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Bot, Send, User, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "AI Chatbot — Fluent" }] }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const suggestions = [
  "Help me prepare for a 1:1 with my manager",
  "Draft a follow-up message to a recruiter",
  "Brainstorm OKRs for Q4",
  "Explain the pros/cons of async standups",
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);

    let assistantText = "";
    const updateAssistant = (chunk: string) => {
      assistantText += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantText } : m));
        }
        return [...prev, { role: "assistant", content: assistantText }];
      });
    };

    try {
      const resp = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!resp.ok || !resp.body) {
        const data = await resp.json().catch(() => ({}));
        toast.error(data.error || "Chat request failed");
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line || line.startsWith(":")) continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) updateAssistant(content);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Stream failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="px-6 lg:px-10 pt-6 max-w-4xl mx-auto w-full">
        <PageHeader icon={Bot} title="AI Chatbot" description="Conversational assistant for workplace tasks and Q&A." />
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 lg:px-10">
        <div className="max-w-4xl mx-auto pb-6">
          {messages.length === 0 ? (
            <div className="card-soft">
              <h3 className="font-semibold flex items-center gap-2 mb-3"><Sparkles className="h-4 w-4 text-primary" /> Try a prompt</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => send(s)} className="text-left text-sm rounded-lg border border-border bg-background hover:bg-muted/60 px-3 py-2.5 transition">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${m.role === "user" ? "bg-muted" : "btn-gradient"}`}>
                    {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-primary-foreground" />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border"}`}>
                    {m.role === "assistant" ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none [&>*]:my-1.5 [&_pre]:bg-muted [&_pre]:p-2 [&_pre]:rounded [&_code]:text-xs">
                        <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t bg-card/60 backdrop-blur px-6 lg:px-10 py-4">
        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="max-w-4xl mx-auto flex gap-2 items-end"
        >
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Ask anything... (Enter to send, Shift+Enter for newline)"
            rows={1}
            className="resize-none min-h-[44px] max-h-40"
          />
          <Button type="submit" disabled={loading || !input.trim()} className="btn-gradient h-11">
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <div className="max-w-4xl mx-auto">
          <AiDisclaimer />
        </div>
      </div>
    </div>
  );
}
