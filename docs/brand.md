# Brand

## Assets (`public/`)

| File | Use |
| --- | --- |
| `logo.png` | Full bilingual wordmark + mark (homepage hero, marketing) |
| `icon.png` | Cube mark only (header, footer, large icon) |
| `favicon.ico` | Browser tab (16 / 32 / 48) |
| `favicon-16.png` / `favicon-32.png` | PNG favicons |
| `apple-touch-icon.png` | iOS home screen (mark on navy) |

Source branding: [Google Drive pack](https://drive.google.com/drive/folders/1IL4Up3AfoVhSnbUXukUAs7J-PslSBwU_) (logo, Alexandria font, color guide).

### Regenerating favicons

If the mark changes, regenerate from `public/icon.png` (square, transparent):

- Multi-size `favicon.ico`
- 16 / 32 / 48 PNGs
- Apple touch on navy `#0f3355`
- Optional App Router files: `src/app/icon.png`, `src/app/apple-icon.png`, `src/app/favicon.ico`

Metadata icons are declared in `src/lib/seo.ts`.

## Colors

| Token | Hex | Role |
| --- | --- | --- |
| Navy / primary | `#0f3355` | Text, header brand, primary buttons |
| Teal / accent | `#2192b4` | Eyebrows, accents, hover |
| Cyan | `#00e3fe` | Selection / highlight accents |
| White | `#ffffff` | Page background |

CSS variables live in `src/app/globals.css` (`@theme inline`) and can be overridden by Sanity `brandColors` via root layout.

## Typography

- Font: **Alexandria** (variable), loaded in `src/lib/fonts.ts` from `src/fonts/`
- Applied on `<html>` via `rootFontClassName`
- Used for both EN and AR

## Current visual direction

- Plain white site shell
- No glass / blur stacks on the homepage
- No hero background image on the homepage
- Rounded corners kept modest (`0.5rem` on buttons / media)

If you change direction, update `src/app/globals.css` and this doc together.
