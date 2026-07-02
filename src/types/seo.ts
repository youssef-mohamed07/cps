export interface SeoMeta {
  title?: string;
  description?: string;
  keywords?: string[];
  /** Absolute or app-relative OG image path. */
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  robots?: string;
}
