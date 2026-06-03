import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { AiResult } from "@/components/ai-result";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { useAiGenerate } from "@/hooks/use-ai-generate";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/meeting")({
  head: () => ({ meta: [{ title: "Meeting Notes Summarizer — Fluent" }] }),
  component: MeetingPage,
});

function MeetingPage() {
  const [notes, setNotes] = useState("");
  const { generate, loading, result } = useAiGenerate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    generate("meeting", { notes });
  };

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
      <PageHeader icon={FileText} title="Meeting Notes Summarizer" description="Paste raw notes — get a crisp summary with decisions, actions, and risks." />
      <form onSubmit={submit} className="card-soft space-y-4">
        <div>
          <Label htmlFor="notes">Meeting Notes</Label>
          <Textarea id="notes" required rows={14} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Paste your meeting notes or transcript here..." />
        </div>
        <Button type="submit" disabled={loading} className="btn-gradient">
          <Sparkles className="h-4 w-4 mr-2" /> {loading ? "Summarizing..." : "Summarize"}
        </Button>
      </form>
      <AiResult content={result} loading={loading} />
      <AiDisclaimer />
    </div>
  );
}
