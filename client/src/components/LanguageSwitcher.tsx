import { useI18n } from "@/hooks/useI18n";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  return (
    <div className="flex gap-2">
      <Button
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("en")}
        className="gap-2"
      >
        <Globe className="w-4 h-4" />
        EN
      </Button>
      <Button
        variant={language === "fa" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("fa")}
      >
        فا
      </Button>
    </div>
  );
}
