# Fluent — AI Workplace Productivity Assistant

## Project Overview

Fluent is a modern SaaS web application designed to help professionals automate repetitive workplace tasks using Artificial Intelligence. Built as a full-stack TypeScript application, it provides a centralized productivity hub for smart email generation, meeting summarization, task planning, research assistance, and AI-powered chat.

The application features a clean, responsive dashboard with dark/light theme support, a collapsible sidebar navigation, and real-time AI content generation. All AI interactions are powered by the Lovable AI Gateway using Google's Gemini models, ensuring fast and high-quality responses.

---

## Features

### 1. Smart Email Generator (`/email`)
- Draft professional emails based on purpose, recipient, tone, and key points.
- Supports multiple tones: Formal, Informal, Persuasive.
- Adapts content for different audiences: Clients, Managers, Team Members.
- Generates a clear subject line, body, and call to action.

### 2. Meeting Notes Summarizer (`/meeting`)
- Converts lengthy meeting notes into concise, structured summaries.
- Extracts: Key Discussion Points, Decisions Made, Action Items, Risks & Concerns, Next Steps.

### 3. AI Task Planner (`/tasks`)
- Creates structured project plans from a single goal input.
- Generates: Task Breakdown, Weekly Timeline, Dependencies, and Recommendations.
- Supports priority levels and deadline-aware planning.

### 4. AI Research Assistant (`/research`)
- Performs structured market and topic research.
- Produces reports with: Executive Summary, Market Trends, Opportunities, Risks & Challenges, Recommendations.
- Supports customizable research depth (Brief, Standard, Deep Dive).

### 5. AI Chatbot (`/chat`)
- Full-height streaming chat interface for interactive AI conversations.
- Supports suggested prompts for quick-start workplace queries.
- Real-time message rendering with Markdown formatting.

### Dashboard (`/`)
- Centralized productivity hub with KPI cards and recent activity tracking.
- Quick-access cards to all productivity tools.
- Gradient hero section with AI-powered call-to-actions.

### Responsible AI
- AI-generated content disclaimer on all AI outputs.
- Copy-to-clipboard functionality for easy reuse.
- Transparent AI limitation notices.

---

## Tools Used

### Frontend
- **React 19** — UI library with concurrent features.
- **TanStack Start** — Full-stack React framework with SSR/SSG and server functions.
- **TanStack Router** — Type-safe file-based routing.
- **TanStack Query** — Server-state management and caching.
- **TypeScript** — Type-safe development.
- **Tailwind CSS v4** — Utility-first styling with CSS-native theme variables.
- **shadcn/ui** — Accessible, composable UI components (Radix UI primitives).
- **Lucide React** — Modern icon library.
- **React Markdown** — Markdown rendering for AI-generated content.

### Backend & AI
- **Lovable AI Gateway** — Unified API for AI model access (Google Gemini models).
- **TanStack Server Functions (`createServerFn`)** — Type-safe RPC for AI generation and chat.
- **Server Routes** — Raw HTTP endpoints for streaming chat responses.

### Database & Auth (Optional)
- **Lovable Cloud / Supabase** — Managed backend with authentication and database capabilities (pre-configured).

### Build & Dev
- **Vite 7** — Fast build tool and dev server.
- **Bun** — Package manager and runtime.
- **ESLint + Prettier** — Code linting and formatting.

---

## Setup Instructions

### Prerequisites

- **Node.js** v18 or later (or Bun v1.0+)
- A **Lovable API Key** for AI generation (configured automatically in Lovable Cloud environments)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/fluent-ai-assistant.git
cd fluent-ai-assistant
```

2. **Install dependencies:**

```bash
bun install
```

*(Or use `npm install` if you prefer npm.)*

3. **Configure environment variables:**

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
VITE_SUPABASE_PROJECT_ID=your_project_id
LOVABLE_API_KEY=your_lovable_api_key
```

> **Note:** In a Lovable Cloud environment, these variables are pre-configured automatically.

4. **Start the development server:**

```bash
bun run dev
```

5. **Open in browser:**

Navigate to `http://localhost:3000`

---

## Project Structure

```
src/
  components/        # Reusable UI components (sidebar, AI result display, etc.)
  components/ui/     # shadcn/ui components
  hooks/             # Custom React hooks (useAiGenerate)
  integrations/      # Supabase client and auth middleware
  lib/               # Utility functions and server config
  routes/            # TanStack file-based routes
    api/ai/          # AI server routes (generate, chat)
    __root.tsx       # Root layout with sidebar and theme provider
    index.tsx        # Dashboard homepage
    chat.tsx         # AI Chatbot
    email.tsx        # Smart Email Generator
    meeting.tsx      # Meeting Notes Summarizer
    research.tsx     # Research Assistant
    tasks.tsx        # AI Task Planner
    settings.tsx     # Settings page
  styles.css         # Global styles and Tailwind theme tokens
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start the Vite development server |
| `bun run build` | Build for production |
| `bun run build:dev` | Build in development mode |
| `bun run preview` | Preview the production build |
| `bun run lint` | Run ESLint |
| `bun run format` | Run Prettier to format code |

---

## Design System

- **Primary Gradient:** Indigo (`#4F46E5`) to Violet (`#7C3AED`).
- **Typography:** Inter (400–700 weights).
- **Cards:** 16px border-radius, subtle shadow (`0 8px 30px rgba(0,0,0,0.08)`).
- **Dark Mode:** Full dark theme support via CSS custom properties.
- **Responsive:** Desktop (sidebar + main), Tablet (collapsed sidebar), Mobile (hamburger menu + single column).

---

## Future Enhancements

- Calendar integration
- Gmail / Outlook integration for direct email sending
- Team collaboration and shared workspaces
- Voice-to-text input
- Advanced analytics and usage dashboard
- Multi-language support
- Persistent chat history and saved AI outputs

---

## License

This project is developed as part of the AI Skill Accelerator Programme. All rights reserved.
