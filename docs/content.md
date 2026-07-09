# Content

All user-facing copy should stay bilingual (EN + AR).

## UI strings

**File:** [`src/content/dictionaries.local.ts`](../src/content/dictionaries.local.ts)

This is the primary source of truth for:

- Nav labels / CTA / language switch
- Home hero (`headline`, `support`, `primaryCta`, `secondaryCta`)
- About / Services / Process / Work / Contact section copy
- Full page copy (`aboutPage`, `servicesPage`, `workPage`, `contactPage`, `projectPage`)
- Footer

### How to edit

1. Open `dictionaries.local.ts`
2. Change both `en` and `ar` blocks
3. Keep keys in sync — TypeScript `Dictionary` interface enforces shape

### How pages read copy

```ts
const dictionary = await resolveDictionary(locale);
// dictionary.hero, dictionary.nav, …
```

`resolveDictionary` (`src/lib/dictionary.ts`) merges Sanity UI Copy on top of local defaults when CMS is configured.

## Projects / portfolio

**File:** [`src/content/projects.ts`](../src/content/projects.ts)

Each project has:

- `slug`, `year`, `image`, `imageAlt`, `gallery[]`
- Localized fields under `en` / `ar`: title, category, summary, challenge, approach, outcome

Used by:

- `/[locale]/work`
- `/[locale]/work/[slug]`
- `FeaturedWork` section (exists; not currently on homepage)

Images today are Unsplash URLs. Replace with real assets under `public/` or a CDN when ready. Remote host must stay allowed in `next.config.ts` → `images.remotePatterns`.

## Site config (contact, SEO defaults)

**File:** [`src/lib/site-config.ts`](../src/lib/site-config.ts)

Defaults for:

- Name, tagline, description
- Email, phone, WhatsApp message
- Address, social links
- Brand colors, logo/favicon paths
- Default SEO titles/descriptions per locale

Helpers:

- `getWhatsAppUrl()`
- `getMailtoUrl()`

Sanity Site Settings can override these at runtime via `ensureSiteConfig()`.

## Adding a new string

1. Add the field to the `Dictionary` interface in `dictionaries.local.ts`
2. Fill `en` and `ar` values
3. Update `resolveDictionary` merge if the field is nested (follow existing patterns for `hero`, `services`, etc.)
4. Consume it in the component / page

## Do not

- Hardcode user-facing English/Arabic in components when a dictionary key exists
- Shallow-merge CMS dictionaries in a way that drops nested objects
- Commit real secrets into content files
