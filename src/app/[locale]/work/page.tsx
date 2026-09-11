import { redirect } from "next/navigation";
import type { Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LegacyWorkPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const query = await searchParams;
  const paramsString = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    for (const item of Array.isArray(value) ? value : [value]) {
      if (item) paramsString.append(key, item);
    }
  });
  redirect(`/${locale as Locale}/our-work${paramsString.size ? `?${paramsString}` : ""}`);
}
