import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n";
import {
  breadcrumbsJsonLd,
  JsonLd,
  type BreadcrumbItem,
} from "@/components/seo/json-ld";

type BreadcrumbsProps = {
  locale: Locale;
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ locale, items }: BreadcrumbsProps) {
  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(items, locale)} />
      <nav aria-label="Breadcrumb" className="site-container pt-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {item.href && !isLast ? (
                  <Link
                    href={localizePath(item.href, locale)}
                    className="transition hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-foreground" : undefined}>{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
