import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { AiResult } from "@/components/ai-result";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { useAiGenerate } from "@/hooks/use-ai-generate";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "AI Research Assistant — Fluent" }] }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [industry, setIndustry] = useState("");
  const [depth, setDepth] = useState("standard");
  const { generate, loading, result } = useAiGenerate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    generate("research", { topic, industry, depth });
  };

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
      <PageHeader icon={Search} title="AI Research Assistant" description="Structured business research with trends, opportunities, and risks." />
      <form onSubmit={submit} className="card-soft space-y-4">
        <div>
          <Label htmlFor="topic">Research Topic</Label>
          <Input id="topic" required value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. AI-powered customer support tools" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="industry">Industry</Label>
            <Input id="industry" required value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="e.g. SaaS, Retail, Fintech" />
          </div>
          <div>
            <Label>Depth Level</Label>
            <Select value={depth} onValueChange={setDepth}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="deep">Deep Dive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit" disabled={loading} className="btn-gradient">
          <Sparkles className="h-4 w-4 mr-2" /> {loading ? "Researching..." : "Generate Report"}
        </Button>
      </form>
      <AiResult content={result} loading={loading} />
      <AiDisclaimer />
    </div>
  );
}
