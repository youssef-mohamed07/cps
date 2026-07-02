import { cache } from "react";
import type { QueryParams } from "next-sanity";
import { sanityClient } from "./client";
import { isSanityConfigured } from "./env";

const fetchSanityQuery = cache(
  async <T>(
    query: string,
    paramsJson: string,
    tagsKey: string,
  ): Promise<T | null> => {
    if (!isSanityConfigured() || !sanityClient) {
      return null;
    }

    const params = JSON.parse(paramsJson) as QueryParams;

    try {
      return await sanityClient.fetch<T>(query, params, {
        next: {
          revalidate: process.env.NODE_ENV === "development" ? 0 : 3600,
          tags: tagsKey ? tagsKey.split(",") : [],
        },
      });
    } catch {
      return null;
    }
  },
);

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<T | null> {
  return fetchSanityQuery<T>(
    query,
    JSON.stringify(params),
    tags.join(","),
  );
}
