import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import AuthPage from "@/pages/auth";
import Settings from "@/pages/settings";
import SocialContent from "@/pages/social-content";
import LeadsFolder from "@/pages/leads-folder";
import Campaigns from "@/pages/campaigns";
import Insights from "@/pages/insights";
import AgentActivity from "@/pages/agent-activity";
import Automations from "@/pages/automations";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route path="/" component={Dashboard} />
      <Route path="/settings" component={Settings} />
      <Route path="/social-content" component={SocialContent} />
      <Route path="/leads/:id" component={LeadsFolder} />
      <Route path="/campaigns" component={Campaigns} />
      <Route path="/insights" component={Insights} />
      <Route path="/agent-activity" component={AgentActivity} />
      <Route path="/automations" component={Automations} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
