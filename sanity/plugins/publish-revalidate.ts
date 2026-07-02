import { definePlugin } from "sanity";

async function revalidateSite(): Promise<void> {
  const response = await fetch("/api/revalidate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source: "sanity-studio" }),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as {
      message?: string;
    };
    throw new Error(payload.message ?? "Failed to refresh website cache");
  }
}

/** Refreshes Next.js cache after every document publish in Studio. */
export const publishRevalidatePlugin = definePlugin({
  name: "publish-revalidate",
  document: {
    actions: (prev) =>
      prev.map((actionComponent) => {
        const actionComponentWithMeta = actionComponent as typeof actionComponent & {
          action?: string;
        };

        if (actionComponentWithMeta.action !== "publish") {
          return actionComponent;
        }

        const OriginalPublish = actionComponent;

        return ((props) => {
          const original = OriginalPublish(props);
          if (!original?.onHandle) return original;

          const originalOnHandle = original.onHandle;

          return {
            ...original,
            onHandle: async () => {
              await originalOnHandle();
              try {
                await revalidateSite();
              } catch {
                // Publish succeeded; cache refresh is best-effort.
              }
            },
          };
        }) as typeof actionComponent;
      }),
  },
});
