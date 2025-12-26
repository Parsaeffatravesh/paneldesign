import { Link, useLocation } from "wouter";
import { LayoutDashboard, Trophy, Crown, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Trophy, label: "My Tournaments", href: "/tournaments" },
    { icon: Crown, label: "Leaderboard", href: "/leaderboard" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-sidebar h-screen fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold tracking-tight text-sidebar-foreground flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">T</span>
          </div>
          Tralent
        </h1>
      </div>

      <div className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 group cursor-pointer",
              isActive 
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" 
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}>
              <item.icon className={cn("h-5 w-5", isActive ? "stroke-[2.5px]" : "stroke-[1.5px] group-hover:stroke-[2px]")} />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-md text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all cursor-pointer">
          <LogOut className="h-5 w-5 stroke-[1.5px]" />
          Log out
        </button>
      </div>
    </aside>
  );
}
