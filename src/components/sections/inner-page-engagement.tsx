import { BriefFormSection } from "@/components/sections/brief-form-section";
import { ClientsSection } from "@/components/sections/clients-section";
import { FaqSection } from "@/components/sections/faq-section";
import { StatsSection } from "@/components/sections/stats-section";
import type { Dictionary } from "@/content/dictionaries.local";
import type { Locale } from "@/lib/i18n";

type InnerPageEngagementProps = {
  locale: Locale;
  dictionary: Dictionary;
  faqItems?: Dictionary["faq"]["items"];
  faqTitle?: string;
  namespace?: string;
  showStats?: boolean;
};

export function InnerPageEngagement({
  locale,
  dictionary,
  faqItems,
  faqTitle,
  namespace = "inner",
  showStats = true,
}: InnerPageEngagementProps) {
  return (
    <div className="inner-engagement">
      {showStats ? (
        <StatsSection
          id={`${namespace}-stats`}
          eyebrow={dictionary.stats.eyebrow}
          title={dictionary.stats.title}
          support={dictionary.stats.support}
          items={dictionary.stats.items}
        />
      ) : null}
      <ClientsSection
        id={`${namespace}-clients`}
        eyebrow={dictionary.clients.eyebrow}
        title={dictionary.clients.title}
        support={dictionary.clients.support}
        items={dictionary.clients.items}
      />
      <BriefFormSection
        id={`${namespace}-brief`}
        locale={locale}
        copy={dictionary.briefForm}
      />
      <FaqSection
        id={`${namespace}-faq`}
        eyebrow={dictionary.faq.eyebrow}
        title={faqTitle ?? dictionary.faq.title}
        support={dictionary.faq.support}
        items={faqItems?.length ? faqItems : dictionary.faq.items}
      />
    </div>
  );
}
