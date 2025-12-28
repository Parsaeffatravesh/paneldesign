import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function MinimalThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || theme === "legendary";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      data-testid="button-theme-toggle"
      className="relative inline-flex items-center justify-center w-9 h-9 rounded-md bg-muted/50 hover:bg-muted transition-colors duration-300 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-4 h-4">
        {/* Sun Icon */}
        <Sun
          className={`absolute inset-0 w-4 h-4 transition-all duration-300 ${
            isDark ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
          }`}
        />
        {/* Moon Icon */}
        <Moon
          className={`absolute inset-0 w-4 h-4 transition-all duration-300 ${
            isDark ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
          }`}
        />
      </div>
    </button>
  );
}
