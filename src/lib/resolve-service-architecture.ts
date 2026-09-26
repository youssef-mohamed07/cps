import type {
  LocalizedText,
  ServiceArchitecture,
} from "@/content/service-architecture";
import type { Locale } from "@/lib/i18n";
import type { CmsService } from "@/sanity/transformers/collections";

export function resolveServiceArchitecture(
  locale: Locale,
  localService: ServiceArchitecture | undefined,
  cmsService: CmsService | null,
): ServiceArchitecture | null {
  if (!localService) return null;

  const cmsCopyReady = cmsService?.blueprintVersion === 5;
  const overlayText = (fallback: LocalizedText, next?: string): LocalizedText =>
    next ? { ...fallback, [locale]: next } : fallback;

  return {
    ...localService,
    ...(cmsCopyReady && cmsService?.title
      ? { title: overlayText(localService.title, cmsService.title) }
      : {}),
    ...(cmsCopyReady && cmsService?.excerpt
      ? { excerpt: overlayText(localService.excerpt, cmsService.excerpt) }
      : {}),
    hero: {
      ...localService.hero,
      headline: overlayText(
        localService.hero.headline,
        cmsCopyReady ? cmsService?.overviewTitle : undefined,
      ),
      bullets:
        cmsCopyReady && cmsService?.overviewBullets?.length
          ? cmsService.overviewBullets.map((item, index) =>
              overlayText(
                localService.hero.bullets[index] ?? { en: "", ar: "" },
                item.title || item.description,
              ),
            )
          : localService.hero.bullets,
      ...(cmsCopyReady && cmsService?.heroLead
        ? { support: overlayText(localService.hero.support, cmsService.heroLead) }
        : {}),
    },
    showcase:
      cmsCopyReady && cmsService?.designs?.items.length
        ? {
            ...localService.showcase,
            title: overlayText(localService.showcase.title, cmsService.designs.title),
            items: cmsService.designs.items.map((item, index) => {
              const fallbackItem = localService.showcase.items[index];

              return {
                ...fallbackItem,
                title: overlayText(
                  fallbackItem?.title ?? { en: "", ar: "" },
                  item.title,
                ),
                description: overlayText(
                  fallbackItem?.description ?? { en: "", ar: "" },
                  item.description,
                ),
              };
            }),
          }
        : localService.showcase,
    why:
      cmsCopyReady && cmsService?.why?.items.length
        ? {
            headline: overlayText(localService.why.headline, cmsService.why.title),
            support: overlayText(localService.why.support, cmsService.why.support),
            items: cmsService.why.items.map((item, index) =>
              overlayText(
                localService.why.items[index] ?? { en: "", ar: "" },
                item.title || item.description,
              ),
            ),
          }
        : localService.why,
    benefits:
      cmsCopyReady && cmsService?.benefits.length
        ? cmsService.benefits.map((item, index) =>
            overlayText(
              localService.benefits[index] ?? { en: "", ar: "" },
              item.title || item.description,
            ),
          )
        : localService.benefits,
    ...(cmsCopyReady && cmsService?.faq?.length
      ? {
          faq: cmsService.faq.map((item, index) => ({
            question: overlayText(
              localService.faq[index]?.question ?? { en: "", ar: "" },
              item.question,
            ),
            answer: overlayText(
              localService.faq[index]?.answer ?? { en: "", ar: "" },
              item.answer,
            ),
          })),
        }
      : {}),
  };
}
