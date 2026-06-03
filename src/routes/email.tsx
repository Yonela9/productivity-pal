import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { AiResult } from "@/components/ai-result";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { useAiGenerate } from "@/hooks/use-ai-generate";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Smart Email Generator — Fluent" }] }),
  component: EmailPage,
});

function EmailPage() {
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [tone, setTone] = useState("professional");
  const [keyPoints, setKeyPoints] = useState("");
  const { generate, loading, result } = useAiGenerate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    generate("email", { purpose, recipient, tone, keyPoints });
  };

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
      <PageHeader icon={Mail} title="Smart Email Generator" description="Draft professional emails in seconds with a clear call to action." />
      <form onSubmit={submit} className="card-soft space-y-4">
        <div>
          <Label htmlFor="purpose">Purpose</Label>
          <Input id="purpose" required value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="e.g. Follow up after sales meeting" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="recipient">Recipient</Label>
            <Input id="recipient" required value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. Marketing Director, Acme Corp" />
          </div>
          <div>
            <Label>Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="persuasive">Persuasive</SelectItem>
                <SelectItem value="concise">Concise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="key">Key Points</Label>
          <Textarea id="key" required rows={5} value={keyPoints} onChange={(e) => setKeyPoints(e.target.value)} placeholder="Bullet points or notes to include..." />
        </div>
        <Button type="submit" disabled={loading} className="btn-gradient">
          <Sparkles className="h-4 w-4 mr-2" /> {loading ? "Generating..." : "Generate Email"}
        </Button>
      </form>
      <AiResult content={result} loading={loading} />
      <AiDisclaimer />
    </div>
  );
}
