"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { localizePath, type Locale } from "@/lib/i18n";

type FilterOption = { value: string; label: string };

type WorkFiltersProps = {
  locale: Locale;
  basePath: string;
  values: {
    boothType?: string;
    industry?: string;
    country?: string;
    event?: string;
    size?: string;
  };
  options: {
    boothType: FilterOption[];
    industry: FilterOption[];
    country: FilterOption[];
    event: FilterOption[];
    size: FilterOption[];
  };
  labels: {
    boothType: string;
    industry: string;
    country: string;
    event: string;
    size: string;
    all: string;
    clear: string;
    filters: string;
  };
};

const KEYS = ["boothType", "industry", "country", "event", "size"] as const;

export function WorkFilters({
  locale,
  basePath,
  values,
  options,
  labels,
}: WorkFiltersProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function hrefFor(next: Partial<Record<(typeof KEYS)[number], string | undefined>>) {
    const params = new URLSearchParams();
    const merged = { ...values, ...next };
    for (const key of KEYS) {
      const value = merged[key];
      if (value) params.set(key, value);
    }
    const query = params.toString();
    return `${basePath}${query ? `?${query}` : ""}`;
  }

  function onChange(key: (typeof KEYS)[number], value: string) {
    startTransition(() => {
      router.push(hrefFor({ [key]: value || undefined }));
    });
  }

  const active = KEYS.flatMap((key) => {
    const value = values[key];
    if (!value) return [];
    const option = options[key].find((item) => item.value === value);
    if (!option) return [];
    return [{ key, label: labels[key], value: option.label }];
  });

  const fields: {
    key: (typeof KEYS)[number];
    label: string;
    items: FilterOption[];
  }[] = [
    { key: "boothType", label: labels.boothType, items: options.boothType },
    { key: "industry", label: labels.industry, items: options.industry },
    { key: "country", label: labels.country, items: options.country },
  ];

  if (options.event.length) {
    fields.push({ key: "event", label: labels.event, items: options.event });
  }
  if (options.size.length) {
    fields.push({ key: "size", label: labels.size, items: options.size });
  }

  return (
    <section className={`work-filters${pending ? " is-pending" : ""}`}>
      <div className="site-container">
        <div className="work-filters-bar">
          <p className="work-filters-kicker">{labels.filters}</p>
          <div className="work-filters-fields">
            {fields.map((field) => (
              <label key={field.key} className="work-filter-select">
                <span className="work-filter-select-label">{field.label}</span>
                <select
                  value={values[field.key] ?? ""}
                  onChange={(event) => onChange(field.key, event.target.value)}
                  aria-label={field.label}
                >
                  <option value="">{labels.all}</option>
                  {field.items.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </div>

        {active.length ? (
          <div className="work-filters-active">
            {active.map((item) => (
              <Link
                key={item.key}
                href={hrefFor({ [item.key]: undefined })}
                className="work-filter-tag"
              >
                <span>
                  {item.label}: {item.value}
                </span>
                <span aria-hidden="true">×</span>
              </Link>
            ))}
            <Link href={localizePath("/work", locale)} className="work-filter-clear">
              {labels.clear}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
