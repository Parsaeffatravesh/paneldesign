import { useEffect } from "react";

export function useRoutePreloader() {
  useEffect(() => {
    // Preload all lazy-loaded pages in the background
    const pages = [
      () => import("@/pages/dashboard"),
      () => import("@/pages/my-tournaments"),
      () => import("@/pages/competitions"),
      () => import("@/pages/profile"),
    ];

    // Start preloading all pages when the app mounts
    pages.forEach(page => {
      page().catch(err => console.warn("Route preload failed:", err));
    });
  }, []);
}
