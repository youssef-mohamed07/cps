import {
  NextStudioLayout,
  NextStudioNoScript,
  metadata as studioMetadata,
  viewport as studioViewport,
} from "next-sanity/studio";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "CPS CMS",
};

export const viewport: Viewport = {
  ...studioViewport,
  viewportFit: "cover",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextStudioNoScript />
      <NextStudioLayout>{children}</NextStudioLayout>
    </>
  );
}
