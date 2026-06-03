import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, ListTodo, Search, Bot, ArrowRight, Sparkles, Activity } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Fluent AI Workplace Assistant" },
      { name: "description", content: "Your AI-powered productivity hub: emails, meetings, tasks, research, and chat." },
    ],
  }),
  component: Dashboard,
});

const kpis = [
  { label: "Emails Generated", value: 245, icon: Mail, color: "from-indigo-500 to-violet-500" },
  { label: "Tasks Planned", value: 128, icon: ListTodo, color: "from-violet-500 to-fuchsia-500" },
  { label: "Research Reports", value: 54, icon: Search, color: "from-cyan-500 to-blue-500" },
  { label: "AI Chats", value: 512, icon: Bot, color: "from-emerald-500 to-cyan-500" },
];

const modules = [
  { title: "Smart Email Generator", desc: "Draft professional emails with a clear CTA.", icon: Mail, to: "/email" },
  { title: "Meeting Notes Summarizer", desc: "Turn long discussions into crisp summaries.", icon: FileText, to: "/meeting" },
  { title: "AI Task Planner", desc: "Turn goals into actionable task plans.", icon: ListTodo, to: "/tasks" },
  { title: "Research Assistant", desc: "Structured market and topic research.", icon: Search, to: "/research" },
  { title: "AI Chatbot", desc: "Conversational assistant for any workplace task.", icon: Bot, to: "/chat" },
];

const activity = [
  { text: "Sales Email Created", time: "2m ago" },
  { text: "Meeting Summary Generated", time: "18m ago" },
  { text: "Project Tasks Planned", time: "1h ago" },
  { text: "Market Research Completed", time: "3h ago" },
];

function Dashboard() {
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl p-8 lg:p-10 mb-8" style={{ backgroundImage: "var(--gradient-primary)" }}>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-medium text-white mb-4">
            <Sparkles className="h-3 w-3" /> AI Productivity Hub
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white max-w-2xl">
            Work smarter, ship faster with your AI assistant.
          </h1>
          <p className="text-white/80 mt-2 max-w-xl">
            Emails, meetings, plans, research, and chat — all in one streamlined workspace.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/chat" className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-white/90 transition">
              Start chatting <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/email" className="inline-flex items-center gap-2 rounded-lg bg-white/15 backdrop-blur px-4 py-2 text-sm font-semibold text-white hover:bg-white/25 transition">
              Generate an email
            </Link>
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((k) => (
          <div key={k.label} className="card-soft">
            <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${k.color} flex items-center justify-center mb-3`}>
              <k.icon className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-bold">{k.value.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">{k.label}</div>
          </div>
        ))}
      </section>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Modules */}
        <section className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Productivity Tools</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {modules.map((m) => (
              <Link key={m.title} to={m.to} className="card-soft group hover:shadow-lg transition-all hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg btn-gradient flex items-center justify-center flex-shrink-0">
                    <m.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm group-hover:text-primary transition">{m.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{m.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Activity */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Activity className="h-4 w-4" /> Recent Activity</h2>
          <div className="card-soft">
            <ul className="space-y-3">
              {activity.map((a) => (
                <li key={a.text} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {a.text}
                  </span>
                  <span className="text-xs text-muted-foreground">{a.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
