# CPS — Architecture

Coming soon shell with the full engineering foundation in place.

## Goal

Keep the infrastructure ready for the real site:

- Locale-first routing (`/[locale]/…`)
- Centralized dictionaries (EN + AR)
- Optional Sanity CMS with local fallback
- SEO helpers (metadata, sitemap, robots)

## Routes (current)

| Path | Status |
| --- | --- |
| `/[locale]/` | Coming soon page |
| `/studio` | Sanity Studio (when configured) |

## Content flow

```
dictionaries.local.ts  →  getDictionary()  →  page.tsx
        ↑
   Sanity UI Copy (optional override)
```

## Related

- `AGENTS.md` — agent conventions
- `README.md` — setup and day-to-day workflow
