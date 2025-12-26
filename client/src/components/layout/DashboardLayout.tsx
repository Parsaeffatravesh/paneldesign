import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Sidebar />
      
      {/* 
        Main content area:
        - Mobile: pb-16 to account for fixed bottom nav
        - Desktop: pl-64 to account for fixed sidebar, no bottom padding needed
      */}
      <main className="flex-1 md:pl-64 pb-20 md:pb-8 min-h-screen">
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">
          {children}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
