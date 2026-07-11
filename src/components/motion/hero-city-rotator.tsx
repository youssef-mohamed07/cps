"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

const CITIES: Record<Locale, string[]> = {
  en: ["Riyadh", "Jeddah", "Dammam"],
  ar: ["الرياض", "جدة", "الدمام"],
};

type HeroCityTag = "p" | "span" | "div" | "h1" | "h2";

type HeroCityRotatorProps = {
  locale: Locale;
  template?: string;
  as?: HeroCityTag;
  className?: string;
  cityClassName?: string;
};

export function HeroCityRotator({
  locale,
  template,
  as: Tag = "p",
  className = "home-hero-badge",
  cityClassName = "home-hero-city",
}: HeroCityRotatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % CITIES[locale].length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [locale]);

  if (!template) return null;

  if (!template.includes("{City}")) {
    return <Tag className={className}>{template}</Tag>;
  }

  const [before, after = ""] = template.split("{City}");

  return (
    <Tag className={className}>
      <span>{before}</span>
      <span key={`${locale}-${index}`} className={cityClassName}>
        {CITIES[locale][index]}
      </span>
      <span>{after}</span>
    </Tag>
  );
}
