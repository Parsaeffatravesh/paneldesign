import { useLocation } from "wouter";
import { LayoutDashboard, Trophy, Crown, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useI18n } from "@/hooks/useI18n";

export function BottomNav() {
  const [location] = useLocation();
  const { t } = useI18n();

  const navItems = useMemo(() => [
    { icon: LayoutDashboard, label: t("nav.dashboard"), href: "/" },
    { icon: Trophy, label: t("nav.tournaments"), href: "/tournaments" },
    { icon: Crown, label: t("nav.competitions"), href: "/competitions" },
    { icon: User, label: t("nav.profile"), href: "/profile" },
  ], [t]);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-md z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 cursor-pointer",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-6 w-6", isActive && "stroke-[2.5px]")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
