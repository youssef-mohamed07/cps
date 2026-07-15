# CPS — Creatives Professionals

Bilingual marketing site for **CPS** (`المبدعون المحترفون`).

- Locales: `/en`, `/ar` (RTL for Arabic)
- Homepage today: plain white hero (logo + headline + CTAs)
- Inner pages already exist: About, Services, Work, Work detail, Contact
- Optional Sanity CMS at `/studio`

## Docs for the next person

| Doc | What it covers |
| --- | --- |
| [docs/architecture.md](docs/architecture.md) | Routes, folders, data flow |
| [docs/content.md](docs/content.md) | How to change copy & projects |
| [docs/brand.md](docs/brand.md) | Logo, favicon, colors, fonts |
| [docs/development.md](docs/development.md) | How to extend the homepage / UI |
| [docs/sanity.md](docs/sanity.md) | Optional CMS setup |
| [AGENTS.md](AGENTS.md) | Conventions for AI / coding agents |

## Quick start

```bash
cp .env.example .env.local
npm install
npm run dev
```

- Site: http://localhost:3000/en
- Arabic: http://localhost:3000/ar
- Studio: http://localhost:3000/studio (only after Sanity env vars)

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local Next.js server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run studio` | Sanity Studio (standalone) |
| `npm run setup:sanity` | Prints webhook / env checklist |
| `npm run seed:sanity` | Seed EN+AR docs from local content (needs write token) |

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Alexandria font (local)
- Framer Motion available (prefer not using opacity-0 SSR patterns)
- Sanity (optional)

## Current homepage

White page only:

1. Header (logo mark + nav + locale + CTA)
2. `HomeHero` — brand logo, headline, support, two buttons
3. Footer

About / Services / Process / Work sections exist as components and routes, but are **not** wired on the home page right now.
