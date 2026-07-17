import { createClient, type SanityClient } from "@sanity/client";
import {
  isSanityConfigured,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from "./env";

let writeClient: SanityClient | null | undefined;

export function getSanityWriteClient(): SanityClient | null {
  if (writeClient !== undefined) return writeClient;

  const token =
    process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

  if (!isSanityConfigured() || !token) {
    writeClient = null;
    return writeClient;
  }

  writeClient = createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    token,
    useCdn: false,
  });

  return writeClient;
}
