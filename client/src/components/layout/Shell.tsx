import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Zap, 
  BarChart3, 
  Settings, 
  Menu,
  X,
  Bot,
  Share2,
  ChevronDown,
  FolderOpen
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Command Center", href: "/" },
  { icon: MessageSquare, label: "Campaigns", href: "/campaigns" },
  { icon: Share2, label: "Social Content", href: "/social-content" },
  { icon: Zap, label: "Automations", href: "/automations" },
  { icon: BarChart3, label: "Insights", href: "/insights" },
];

const leadsExamples = [
  "SaaS Founders - Q1 Push",
  "Webinar Invites - Fintech",
  "Blog Post Promotion",
];

export function Shell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLeadsOpen, setIsLeadsOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col p-6 overflow-y-auto">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Bot className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold font-heading tracking-tight">Leads</span>
          </div>

          <nav className="space-y-1 flex-1">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div 
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </div>
                </Link>
              );
            })}

            {/* Leads Library Section */}
            <div className="mt-8 pt-6 border-t border-border">
              <Collapsible open={isLeadsOpen} onOpenChange={setIsLeadsOpen}>
                <CollapsibleTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted w-full transition-colors">
                    <FolderOpen className="w-4 h-4" />
                    <span className="flex-1 text-left">Leads Library</span>
                    <ChevronDown className={cn("w-3 h-3 transition-transform", isLeadsOpen ? "rotate-180" : "")} />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 mt-2 pl-2">
                  {leadsExamples.map((lead, idx) => (
                    <Link key={idx} href={`/leads/${idx}`}>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer truncate">
                        <div className="w-2 h-2 rounded-full bg-primary/40" />
                        <span className="truncate">{lead}</span>
                      </div>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </div>
          </nav>

          <div className="pt-6 border-t border-border mt-auto">
            <Link href="/settings">
              <div 
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                  location === "/settings"
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Settings className="w-4 h-4" />
                Settings
              </div>
            </Link>
            <div className="mt-4 flex items-center gap-3 px-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
              <div className="text-xs">
                <div className="font-medium">Workspace Admin</div>
                <div className="text-muted-foreground">Pro Plan</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 lg:hidden flex items-center px-6 border-b border-border bg-card">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
          <div className="ml-4 font-bold font-heading">Leads</div>
        </header>
        
        <div className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
