import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import AuthPage from "@/pages/auth";
import LandingPage from "@/pages/landing";
import PricingPage from "@/pages/pricing";
import Settings from "@/pages/settings";
import SocialContent from "@/pages/social-content";
import LeadsFolder from "@/pages/leads-folder";
import Campaigns from "@/pages/campaigns";
import Insights from "@/pages/insights";
import AgentActivity from "@/pages/agent-activity";
import Automations from "@/pages/automations";

function ProtectedRoute({ component: Component, path }: { component: React.ComponentType, path: string }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/auth" />;
  }

  return <Route path={path} component={Component} />;
}

function Router() {
  const { user } = useAuth();

  return (
    <Switch>
      <Route path="/">
        {user ? <Dashboard /> : <LandingPage />}
      </Route>
      <Route path="/auth" component={AuthPage} />
      <Route path="/pricing" component={PricingPage} />

      {/* Protected Routes */}
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/settings" component={Settings} />
      <ProtectedRoute path="/social-content" component={SocialContent} />
      <ProtectedRoute path="/leads/:id" component={LeadsFolder} />
      <ProtectedRoute path="/campaigns" component={Campaigns} />
      <ProtectedRoute path="/insights" component={Insights} />
      <ProtectedRoute path="/agent-activity" component={AgentActivity} />
      <ProtectedRoute path="/automations" component={Automations} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
