import { Switch, Route } from "wouter";
import { useEffect, useMemo, memo } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useI18n } from "@/hooks/useI18n";
import { useTheme } from "@/hooks/useTheme";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import MyTournaments from "@/pages/my-tournaments";
import Competitions from "@/pages/competitions";
import Profile from "@/pages/profile";

const Router = memo(() => {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/tournaments" component={MyTournaments} />
      <Route path="/leaderboard" component={Competitions} />
      <Route path="/competitions" component={Competitions} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
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
