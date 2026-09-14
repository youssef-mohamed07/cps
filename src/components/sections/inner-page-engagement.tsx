import { BriefFormSection } from "@/components/sections/brief-form-section";
import { ClientsSection } from "@/components/sections/clients-section";
import { FaqSection } from "@/components/sections/faq-section";
import type { Dictionary } from "@/content/dictionaries.local";
import type { Locale } from "@/lib/i18n";

type InnerPageEngagementProps = {
  locale: Locale;
  dictionary: Dictionary;
  faqItems?: Dictionary["faq"]["items"];
  faqTitle?: string;
  namespace?: string;
  showClients?: boolean;
};

export function InnerPageEngagement({
  locale,
  dictionary,
  faqItems,
  faqTitle,
  namespace = "inner",
  showClients = true,
}: InnerPageEngagementProps) {
  return (
    <div className="inner-engagement">
      {showClients ? (
        <ClientsSection
          id={`${namespace}-clients`}
          eyebrow={dictionary.clients.eyebrow}
          title={dictionary.clients.title}
          support={dictionary.clients.support}
          items={dictionary.clients.items}
        />
      ) : null}
      <BriefFormSection
        id={`${namespace}-brief`}
        locale={locale}
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
