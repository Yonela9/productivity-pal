import { useState } from "react";
import { toast } from "sonner";

export type AiMode = "email" | "meeting" | "tasks" | "research";

export function useAiGenerate() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  const generate = async (mode: AiMode, payload: Record<string, string>) => {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, payload }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Generation failed");
        return;
      }
      setResult(data.content);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return { generate, loading, result, setResult };
}
