import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteAnalytics } from "@/components/analytics/site-analytics";
import { rootFontClassName } from "@/lib/fonts";
import { getSiteConfig } from "@/lib/site-config";
import { sanitizeBrandColors } from "@/lib/sanitize-css-color";
import { ensureSiteConfig } from "@/sanity/load-site-config";
import { cn } from "@/lib/utils";
import "./globals.css";

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

  return (
    <html suppressHydrationWarning className={cn("h-full", rootFontClassName)}>
      <body className="h-full antialiased">
        <BrandThemeStyles />
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
