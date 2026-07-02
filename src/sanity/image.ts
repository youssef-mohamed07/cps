import createImageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";
import { isSanityConfigured } from "./env";

type SanityImageSource = Parameters<
  ReturnType<typeof createImageUrlBuilder>["image"]
>[0];

const builder = isSanityConfigured() && sanityClient
  ? createImageUrlBuilder(sanityClient)
  : null;

export function urlForImage(source: SanityImageSource | null | undefined) {
  if (!builder || !source) return null;
  return builder.image(source).auto("format").quality(85);
}

export function imageUrl(
  source: SanityImageSource | null | undefined,
  options: {
    width?: number;
    height?: number;
    fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
  } = {},
): string | undefined {
  const image = urlForImage(source);
  if (!image) return undefined;

  let chain = image;
  if (options.width) chain = chain.width(options.width);
  if (options.height) chain = chain.height(options.height);
  if (options.fit) chain = chain.fit(options.fit);

  return chain.url();
}

export function blurDataUrl(
  source: SanityImageSource | null | undefined,
): string | undefined {
  return imageUrl(source, { width: 24, height: 24, fit: "crop" });
}
