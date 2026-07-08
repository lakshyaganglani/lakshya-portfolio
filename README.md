# Lakshya Ganglani — Portfolio (Phase 1: Structure & Skeleton)

A multipage portfolio built with Next.js (App Router) + TypeScript + Tailwind CSS v4.

## Design direction
The site is framed as a "systems console" — the visual language of the data
infrastructure this portfolio is about (pipeline canvases, monitoring
dashboards, status indicators) rather than a generic creative portfolio.
Signature element: the animated pipeline node graph on the homepage
(Ingest → Transform → Orchestrate → Deliver), which doubles as the interactive
skill Quick Filter.

**Honesty note:** the resume has no FinTech-specific project, so the Quick
Filter categories are Pipelines & ETL / Cloud & Azure / Analytics & BI /
Automation — the real categories in the resume. These map naturally to what a
FinTech or Big Tech hiring manager cares about (data infra reliability)
without fabricating a project that doesn't exist.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint     # eslint
```

## Structure

```
src/
  app/
    layout.tsx          Root layout, fonts, metadata
    globals.css          Design tokens (Tailwind v4 @theme block)
    page.tsx              Home — hero, pipeline graph, quick filter, stats
    about/page.tsx        Career timeline with tech-badge filtering
    projects/page.tsx     Project grid + expandable case study modals
    contact/page.tsx      Contact form + direct links
  components/
    SiteShell.tsx          Persistent collapsible sidebar nav + responsive shell
    StatusPill.tsx          "Open to work" live status indicator
    PipelineGraph.tsx       Animated 4-node pipeline diagram (hero signature element)
    PipelineFilter.tsx      Quick-filter buttons (shared by Home + Projects)
    ProjectModal.tsx        Case study modal: problem / solution / impact
    ContactForm.tsx         Client-validated contact form (no backend wired yet)
    Badge.tsx / Eyebrow.tsx  Small shared UI primitives
  data/
    profile.ts              Single source of truth for all resume-derived content
```

## What's real vs. what needs your input

- **Real & working**: routing, collapsible nav (desktop + mobile drawer),
  quick filters that actually filter skills/projects, timeline badge
  filtering, project modals, form validation (client-side).
- **Needs your input**:
  - `person.github` in `src/data/profile.ts` is a placeholder — add your real
    GitHub URL.
  - The contact form has no backend. It currently simulates a submit. Wire it
    to a real endpoint (a Next.js API route + email service like Resend, or a
    form backend like Formspree) before going live.
  - Swap in real project repo links if you want "view code" links per project.

## Notes on the sandbox build

This was built and verified with `npm run build` (zero TypeScript/ESLint
errors, all 5 routes statically generated). If your local build fails
specifically on font fetching, it's a network/firewall issue reaching Google
Fonts, not a code issue — `next/font/google` needs outbound access to
fonts.googleapis.com at build time.
