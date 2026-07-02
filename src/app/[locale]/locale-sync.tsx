"use client";

import { useEffect } from "react";
import { getDirection, type Locale } from "@/lib/i18n";

export function LocaleSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = getDirection(locale);
    root.classList.toggle("lang-ar", locale === "ar");
  }, [locale]);

  return null;
}
