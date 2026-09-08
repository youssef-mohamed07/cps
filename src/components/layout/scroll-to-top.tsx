"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

function resetScrollRoots() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/**
 * App Router can keep the previous scroll Y when the real scroll root
 * isn't what Next resets — force top (or hash target) on route change.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const hash = window.location.hash?.slice(1);
    if (hash) {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
    }

    resetScrollRoots();
  }, [pathname]);

  return null;
}
