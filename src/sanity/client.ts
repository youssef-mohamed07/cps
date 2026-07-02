import { createClient } from "next-sanity";
import {
  isSanityConfigured,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
  sanityReadToken,
} from "./env";

export const sanityClient = isSanityConfigured()
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: true,
      token: sanityReadToken,
      stega: {
        enabled: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL !== undefined,
        studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
      },
    })
  : null;
