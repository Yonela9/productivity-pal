import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Fluent" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="p-6 lg:p-10 max-w-3xl mx-auto">
      <PageHeader icon={SettingsIcon} title="Settings" description="Personalize your Fluent workspace." />
      <div className="space-y-4">
        <div className="card-soft space-y-4">
          <h3 className="font-semibold">Profile</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Display name</Label>
              <Input id="name" placeholder="Alex Doe" />
            </div>
            <div>
              <Label htmlFor="email">Work email</Label>
              <Input id="email" type="email" placeholder="alex@company.com" />
            </div>
          </div>
        </div>

        <div className="card-soft space-y-3">
          <h3 className="font-semibold">Preferences</h3>
          <Row label="Stream AI responses" desc="Render tokens as they arrive." defaultChecked />
          <Row label="Markdown rendering" desc="Pretty-print AI output." defaultChecked />
          <Row label="Email notifications" desc="Get updates about new features." />
        </div>

        <div className="card-soft">
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-sm text-muted-foreground">
            Fluent is your AI workplace productivity assistant. All AI responses should be reviewed
            before use in critical workflows.
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, desc, defaultChecked }: { label: string; desc: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
