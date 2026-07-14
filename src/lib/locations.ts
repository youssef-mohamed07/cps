/** Default city for nav, footer, and hub links when no city context exists. */
export const DEFAULT_LOCATION_SLUG = "riyadh";

export function locationPath(locationSlug: string = DEFAULT_LOCATION_SLUG) {
  return `/locations/${locationSlug}`;
}

export function locationServicePath(
  serviceSlug: string,
  locationSlug: string = DEFAULT_LOCATION_SLUG,
) {
  return `/locations/${locationSlug}/services/${serviceSlug}`;
}

export function locationBoothTypePath(
  boothTypeSlug: string,
  locationSlug: string = DEFAULT_LOCATION_SLUG,
) {
  return `/locations/${locationSlug}/booth-types/${boothTypeSlug}`;
}
