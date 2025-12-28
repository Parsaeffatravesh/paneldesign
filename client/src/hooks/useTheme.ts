import { useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark" | "legendary";

const THEME_STORAGE_KEY = "theme-preference";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    return stored || "light";
  });

  const updateTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement;
    
    if (!root.classList.contains("theme-transition")) {
      root.classList.add("theme-transition");
    }

    root.setAttribute("data-theme", newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);

    root.classList.remove("light", "dark", "legendary");
    if (newTheme !== "light") {
      root.classList.add(newTheme);
    }

    setTheme(newTheme);

    setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 350);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    root.classList.remove("light", "dark", "legendary");
    if (theme !== "light") {
      root.classList.add(theme);
    }
  }, []);

  return { theme, setTheme: updateTheme };
}
