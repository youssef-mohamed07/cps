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
      <nav aria-label="Breadcrumb" className="page-breadcrumbs">
        <div className="site-container">
          <ol className="page-breadcrumbs-list">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <li key={`${item.label}-${index}`} className="page-breadcrumbs-item">
                  {index > 0 ? (
                    <span className="page-breadcrumbs-sep" aria-hidden="true">
                      /
                    </span>
                  ) : null}
                  {item.href && !isLast ? (
                    <Link href={localizePath(item.href, locale)} className="page-breadcrumbs-link">
                      {item.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "page-breadcrumbs-current" : undefined}>
                      {item.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
