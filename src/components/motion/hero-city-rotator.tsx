"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

const CITIES: Record<Locale, string[]> = {
  en: ["Riyadh", "Jeddah", "Dammam"],
  ar: ["الرياض", "جدة", "الدمام"],
};

type HeroCityRotatorProps = {
  locale: Locale;
  template?: string;
};

export function HeroCityRotator({ locale, template }: HeroCityRotatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % CITIES[locale].length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [locale]);

  if (!template) return null;

  if (!template.includes("{City}")) {
    return <p className="home-hero-badge">{template}</p>;
  }

  const [before, after = ""] = template.split("{City}");

  return (
    <p className="home-hero-badge">
      <span>{before}</span>
      <span key={`${locale}-${index}`} className="home-hero-city">
        {CITIES[locale][index]}
      </span>
      <span>{after}</span>
    </p>
  );
}
