import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "legendary";

const THEME_STORAGE_KEY = "theme-preference";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    return stored || "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Remove all theme classes first
    root.classList.remove("light", "dark", "legendary");
    // Add the new theme class
    if (theme !== "light") {
      root.classList.add(theme);
    }
  }, [theme]);

  return { theme, setTheme };
}
