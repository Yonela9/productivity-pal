import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListTodo, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { AiResult } from "@/components/ai-result";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { useAiGenerate } from "@/hooks/use-ai-generate";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/tasks")({
  head: () => ({ meta: [{ title: "AI Task Planner — Fluent" }] }),
  component: TasksPage,
});

function TasksPage() {
  const [goal, setGoal] = useState("");
  const [priority, setPriority] = useState("medium");
  const [deadline, setDeadline] = useState("");
  const { generate, loading, result } = useAiGenerate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    generate("tasks", { goal, priority, deadline });
  };

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
      <PageHeader icon={ListTodo} title="AI Task Planner" description="Transform a project goal into a structured, actionable plan." />
      <form onSubmit={submit} className="card-soft space-y-4">
        <div>
          <Label htmlFor="goal">Project Goal</Label>
          <Textarea id="goal" required rows={4} value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Describe what you want to achieve..." />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>Priority</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="deadline">Deadline</Label>
            <Input id="deadline" required value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="e.g. 6 weeks, by Q3, Dec 15" />
          </div>
        </div>
        <Button type="submit" disabled={loading} className="btn-gradient">
          <Sparkles className="h-4 w-4 mr-2" /> {loading ? "Planning..." : "Generate Plan"}
        </Button>
      </form>
      <AiResult content={result} loading={loading} />
      <AiDisclaimer />
    </div>
  );
}
