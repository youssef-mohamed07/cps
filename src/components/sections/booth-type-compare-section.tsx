import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import {
  BOOTH_COMPARISON_COLUMNS,
  BOOTH_COMPARISON_ROWS,
  type BoothComparisonRow,
} from "@/content/booth-comparison";
import { localizePath, type Locale } from "@/lib/i18n";
import {
  DEFAULT_LOCATION_SLUG,
  locationBoothTypePath,
} from "@/lib/locations";

function Mark({
  value,
  yesLabel,
  noLabel,
}: {
  value: boolean;
  yesLabel: string;
  noLabel: string;
}) {
  return value ? (
    <span className="booth-compare-yes" aria-label={yesLabel}>
      ✓
    </span>
  ) : (
    <span className="booth-compare-no" aria-label={noLabel}>
      ✕
    </span>
  );
}

type BoothTypeCompareSectionProps = {
  locale: Locale;
  activeSlug: string;
  locationSlug?: string;
  rows?: BoothComparisonRow[];
};

export function BoothTypeCompareSection({
  locale,
  activeSlug,
  locationSlug = DEFAULT_LOCATION_SLUG,
  rows: rowsProp,
}: BoothTypeCompareSectionProps) {
  const isArabic = locale === "ar";
  const source = rowsProp?.length ? rowsProp : BOOTH_COMPARISON_ROWS;
  const rows = [
    ...source.filter((row) => row.slug === activeSlug),
    ...source.filter((row) => row.slug !== activeSlug),
  ];

  return (
    <section className="booth-compare-section section-pad section-rule">
      <div className="site-container">
        <Reveal>
          <div className="booth-compare-head">
            <p className="eyebrow">{isArabic ? "مقارنة" : "Compare"}</p>
            <h2 className="display booth-compare-title">
              {isArabic ? "أي نوع جناح يناسبك؟" : "Which booth type fits you?"}
            </h2>
            <p className="lede booth-compare-support">
              {isArabic
                ? "نظرة سريعة على الفروقات بين أنواع الأجنحة — من الاستخدام الداخلي إلى سرعة التركيب."
                : "A quick look at how booth formats differ — from indoor use to setup speed."}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="booth-compare-scroll">
            <table className="booth-compare-table">
              <caption className="sr-only">
                {isArabic
                  ? "جدول مقارنة أنواع الأجنحة"
                  : "Booth type comparison table"}
              </caption>
              <thead>
                <tr>
                  <th scope="col">{isArabic ? "نوع الجناح" : "Booth Type"}</th>
                  {BOOTH_COMPARISON_COLUMNS.map((column) => (
                    <th key={column.key} scope="col">
                      {isArabic ? column.ar : column.en}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const isActive = row.slug === activeSlug;
                  return (
                    <tr
                      key={row.slug}
                      className={isActive ? "is-active" : undefined}
                    >
                      <th scope="row">
                        <Link
                          href={localizePath(
                            locationBoothTypePath(row.slug, locationSlug),
                            locale,
                          )}
                          className="booth-compare-link"
                          aria-current={isActive ? "page" : undefined}
                        >
                          {isArabic ? row.label.ar : row.label.en}
                        </Link>
                        {isActive ? (
                          <span className="booth-compare-current">
                            {isArabic ? "الحالي" : "Current"}
                          </span>
                        ) : null}
                      </th>
                      {BOOTH_COMPARISON_COLUMNS.map((column) => (
                        <td key={column.key}>
                          <Mark
                            value={row[column.key]}
                            yesLabel={isArabic ? "نعم" : "Yes"}
                            noLabel={isArabic ? "لا" : "No"}
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
