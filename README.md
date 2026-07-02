# CPS

Coming soon site — structure only until the full CPS website is built.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Bilingual routes: `/en`, `/ar`
- Optional Sanity CMS (`/studio`)

## Quick start

```bash
cp .env.example .env.local
npm install
npm run dev
```

- Site: http://localhost:3000/en
- Studio: http://localhost:3000/studio (after Sanity env vars are set)

## Project layout

```
src/
  app/[locale]/          ← routes (coming soon homepage)
  components/analytics/  ← analytics helpers
  content/               ← UI strings (EN + AR)
  lib/                   ← i18n, seo, site-config
  sanity/                ← CMS fetch + transformers
```

## Sanity (optional)

Works fully offline with local dictionaries. To enable CMS:

1. Create a Sanity project
2. Fill `NEXT_PUBLIC_SANITY_*` in `.env.local`
3. Run `npm run setup:sanity` for webhook checklist
