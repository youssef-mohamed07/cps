# Inner page composition

Public inner pages use the shared `PageHero`, `CollectionGrid`, and
`InnerPageEngagement` components under `src/components/sections/`.

- Commercial listing and detail pages close with the shared Stats, Clients,
  FAQ, and Brief Form sequence.
- Detail pages may pass context-specific FAQ items to `InnerPageEngagement`.
- Contact (`/contact`) is intentionally lean: form + contact details, then a
  regional presence map — no hero and no engagement bundle.
- Legal routes use `LegalPage` and intentionally omit marketing sections.
- Pass a unique `namespace` when composing engagement sections so generated
  anchor IDs stay unique.

# Development guide

For whoever continues the site after the current white homepage.

## Before you code

1. Read [architecture.md](architecture.md) and [AGENTS.md](../AGENTS.md)
2. This is **Next.js 16** — check `node_modules/next/dist/docs/` before inventing routing/metadata patterns
3. Prefer Server Components; `"use client"` only for real interactivity

## Local workflow

```bash
cp .env.example .env.local   # once
npm install
npm run dev
```

Open `/en` and `/ar`. Confirm RTL on Arabic.

## Extending the homepage

Homepage today: [`src/app/[locale]/page.tsx`](../src/app/[locale]/page.tsx)

```tsx
<SiteChrome locale={locale} dictionary={dictionary}>
  <HomeHero locale={locale} content={dictionary.hero} />
</SiteChrome>
```

### To add sections back

Components already exist under `src/components/sections/`:

- `AboutSection`
- `ServicesSection`
- `ProcessSection`
- `FeaturedWork`
- `ContactSection`

Wire them in `page.tsx` and pass the matching dictionary slices. Copy is already in `dictionaries.local.ts`.

Example:

```tsx
<HomeHero locale={locale} content={dictionary.hero} />
<AboutSection content={dictionary.about} />
<FeaturedWork
  locale={locale}
  eyebrow={dictionary.work.eyebrow}
  title={dictionary.work.title}
  viewAll={dictionary.work.viewAll}
  items={dictionary.work.items}
/>
<ContactSection content={dictionary.contact} />
```

Always confirm props against the component file before wiring.

### To add a new section

1. Create `src/components/sections/your-section.tsx` (Server Component by default)
2. Add EN/AR strings in `dictionaries.local.ts` (+ merge in `resolveDictionary` if nested)
3. Import and render in `page.tsx`
4. Add styles in `src/app/globals.css` (or colocated CSS if the project later adopts that)

## Layout chrome

- Header: `src/components/layout/site-header.tsx` (client — mobile menu)
- Footer: `src/components/layout/site-footer.tsx`
- Wrapper: `src/components/layout/site-chrome.tsx`

Inner pages (`about`, `services`, `work`, `contact`) already use `SiteChrome`. Keep that pattern.

## Styling rules of thumb

- Global styles: `src/app/globals.css`
- Brand tokens: CSS variables in `@theme inline`
- Avoid Framer Motion `initial={{ opacity: 0 }}` without a guaranteed animate-in — it has left content invisible on SSR before
- Avoid glass/blur/gradient stacks unless the product owner asks for them again
- Keep first viewport simple: brand, one headline, short support, CTAs

## i18n checklist

When adding links:

```ts
import { localizePath } from "@/lib/i18n";
href={localizePath("/work", locale)}
```

Language switch:

```ts
import { switchLocalePath } from "@/lib/i18n";
```

Never hardcode `/en/...` inside shared components.

## Known pitfalls

| Pitfall | Fix |
| --- | --- |
| CMS shallow merge wipes `hero` | Always use `resolveDictionary` |
| Favicon looks stale | Hard refresh / clear tab icon cache |
| Unsplash images fail | Check `next.config.ts` `remotePatterns` |
| Blank page after motion | Remove opacity-0 initial states |

## Suggested next work

1. Replace Unsplash project images with real case studies
2. Wire homepage sections the client wants (or keep hero-only)
3. Fill real contact details in `site-config.ts`
4. Turn on indexing only when production URL + content are ready
5. Optional: connect Sanity and migrate copy
