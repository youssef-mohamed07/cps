import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import { SiteAnalytics } from "@/components/analytics/site-analytics";
import { JsonLd } from "@/components/seo/json-ld";
import { rootFontClassName } from "@/lib/fonts";
import { defaultLocale, getDirection, isLocale, type Locale } from "@/lib/i18n";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/seo";
import { getSiteConfig } from "@/lib/site-config";
import { sanitizeBrandColors } from "@/lib/sanitize-css-color";
import { ensureSiteConfig } from "@/sanity/load-site-config";
import { cn } from "@/lib/utils";
import "./globals.css";

/**
 * The proxy tags every locale-matched request with `x-site-locale`, so the
 * root `<html>` can carry the correct `lang`/`dir` on the very first byte
 * instead of waiting on client-side hydration (see `LocaleSync`).
 */
async function resolveRootLocale(): Promise<Locale> {
  const headerStore = await headers();
  const fromHeader = headerStore.get("x-site-locale");
  return isLocale(fromHeader ?? undefined) ? (fromHeader as Locale) : defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  await ensureSiteConfig();
  return {};
}

function BrandThemeStyles() {
  const brandColors = sanitizeBrandColors(getSiteConfig().brandColors);
  if (!brandColors?.accent && !brandColors?.primary) return null;

  const rules: string[] = [];
  if (brandColors.accent) rules.push(`--color-accent: ${brandColors.accent};`);
  if (brandColors.primary) rules.push(`--color-primary: ${brandColors.primary};`);

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `:root { ${rules.join(" ")} }`,
      }}
    />
  );
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  await ensureSiteConfig();
  const locale = await resolveRootLocale();

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      suppressHydrationWarning
      className={cn("h-full", rootFontClassName)}
    >
      <body className="h-full antialiased">
        <BrandThemeStyles />
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd(locale)]} />
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
