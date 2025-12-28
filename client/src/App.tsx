import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useMemo, memo, lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useI18n } from "@/hooks/useI18n";
import { useTheme } from "@/hooks/useTheme";
import NotFound from "@/pages/not-found";

// Lazy load pages for instant navigation
const Dashboard = lazy(() => import("@/pages/dashboard"));
const MyTournaments = lazy(() => import("@/pages/my-tournaments"));
const Competitions = lazy(() => import("@/pages/competitions"));
const Profile = lazy(() => import("@/pages/profile"));

const Router = memo(() => {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tournaments" element={<MyTournaments />} />
        <Route path="/leaderboard" element={<Competitions />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

Router.displayName = "Router";

function AppContent() {
  const { language } = useI18n();
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
    document.documentElement.setAttribute("data-theme", theme);
  }, [language, theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function App() {
  return <AppContent />;
}

export default App;
