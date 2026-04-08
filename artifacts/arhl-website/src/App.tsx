import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/Home";
import Teams from "@/pages/Teams";
import TeamDetail from "@/pages/TeamDetail";
import Standings from "@/pages/Standings";
import Stats from "@/pages/Stats";
import Schedule from "@/pages/Schedule";
import Rulebook from "@/pages/Rulebook";
import Join from "@/pages/Join";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/teams" component={Teams} />
        <Route path="/teams/:id" component={TeamDetail} />
        <Route path="/standings" component={Standings} />
        <Route path="/stats" component={Stats} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/rulebook" component={Rulebook} />
        <Route path="/join" component={Join} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin" component={AdminDashboard} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
