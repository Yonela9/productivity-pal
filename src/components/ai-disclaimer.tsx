import { AlertTriangle } from "lucide-react";

export function AiDisclaimer() {
  return (
    <div className="mt-6 flex gap-3 rounded-xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
      <AlertTriangle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
      <p>
        AI-generated content may contain inaccuracies. Always verify critical information
        before making business, legal, financial, or operational decisions.
      </p>
    </div>
  );
}
