import { useState, useEffect } from "react";
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
  FolderOpen,
  PanelLeftClose,
  PanelRightClose,
  Activity
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
];

const sidebarPages: NavItem[] = [
  { icon: Activity, label: "Agent Activity", href: "/agent-activity" },
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Load sidebar state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved) setIsSidebarCollapsed(JSON.parse(saved));
  }, []);

  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
  };

  return (
    <div className="min-h-screen flex bg-background overflow-hidden">
      {/* Sidebar - Fixed Position */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-card border-r border-border transition-all duration-300 ease-in-out hidden md:flex flex-col",
          isSidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="h-full flex flex-col p-4 overflow-y-auto">
          {/* Header with Logo and Collapse Button */}
          <div className={cn("flex items-center gap-2 mb-8", isSidebarCollapsed ? "justify-center" : "justify-between")}>
            {!isSidebarCollapsed && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold font-heading tracking-tight whitespace-nowrap">Leads</span>
              </div>
            )}
            
            {/* Sidebar Toggle Button */}
            <button 
              onClick={toggleSidebar}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition-all duration-300 flex-shrink-0 border border-border bg-background shadow-sm"
              title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isSidebarCollapsed ? (
                <PanelRightClose className="w-4 h-4 text-muted-foreground" />
              ) : (
                <PanelLeftClose className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          </div>

          {/* Primary Navigation */}
          <nav className="space-y-1 flex-1">
            {navItems.map((item) => {
              const isActive = location === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <button 
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer w-full",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    title={isSidebarCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {!isSidebarCollapsed && <span>{item.label}</span>}
                  </button>
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Pages Section */}
          {!isSidebarCollapsed && (
            <div className="space-y-1 pb-6 border-b border-border">
              {sidebarPages.map((item) => {
                const isActive = location === item.href;
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <button 
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer w-full",
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Leads Library Section */}
          {!isSidebarCollapsed && (
            <div className="space-y-2 pb-6 border-b border-border">
              <Collapsible open={isLeadsOpen} onOpenChange={setIsLeadsOpen}>
                <CollapsibleTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted w-full transition-colors">
                    <FolderOpen className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1 text-left">Leads Library</span>
                    <ChevronDown className={cn("w-3 h-3 transition-transform flex-shrink-0", isLeadsOpen ? "rotate-180" : "")} />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 mt-2 pl-2">
                  {leadsExamples.map((lead, idx) => (
                    <Link key={idx} href={`/leads/${idx}`}>
                      <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer truncate w-full text-left">
                        <div className="w-2 h-2 rounded-full bg-primary/40 flex-shrink-0" />
                        <span className="truncate">{lead}</span>
                      </button>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}

          {/* Settings & Profile */}
          <div className="pt-4 border-t border-border mt-auto space-y-4">
            {!isSidebarCollapsed ? (
              <>
                <Link href="/settings">
                  <button 
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer w-full",
                      location === "/settings"
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Settings className="w-4 h-4 flex-shrink-0" />
                    Settings
                  </button>
                </Link>
                <div className="flex items-center gap-3 px-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0" />
                  <div className="text-xs min-w-0">
                    <div className="font-medium truncate">Workspace Admin</div>
                    <div className="text-muted-foreground truncate">Pro Plan</div>
                  </div>
                </div>
              </>
            ) : (
              <Link href="/settings">
                <button 
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-lg transition-colors",
                    location === "/settings"
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  title="Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside 
        className={cn(
          "fixed inset-0 z-50 bg-card md:hidden transition-all duration-500 ease-in-out",
          isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col p-6 overflow-y-auto">
          {/* Header with Logo and Close Button */}
          <div className="flex items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0 shadow-lg shadow-primary/20">
                <Bot className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold font-heading tracking-tight whitespace-nowrap">Leads</span>
            </div>
            
            {/* Sidebar Toggle Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted transition-all duration-300 flex-shrink-0 border border-border bg-background shadow-sm"
              title="Close menu"
            >
              <PanelLeftClose className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Primary Navigation */}
          <nav className="space-y-2 flex-1">
            {navItems.map((item) => {
              const isActive = location === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-medium transition-all cursor-pointer w-full",
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </button>
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Pages Section */}
          <div className="space-y-2 py-6 border-t border-border mt-4">
            <p className="px-4 text-xs font-semibold text-muted-foreground/50 uppercase tracking-wider mb-2">Intelligence</p>
            {sidebarPages.map((item) => {
              const isActive = location === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium transition-all cursor-pointer w-full",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </button>
                </Link>
              );
            })}
          </div>

          {/* Settings & Profile */}
          <div className="pt-6 border-t border-border mt-auto space-y-6">
            <Link href="/settings">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium transition-all cursor-pointer w-full",
                  location === "/settings"
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Settings className="w-5 h-5 flex-shrink-0" />
                Settings
              </button>
            </Link>
            
            <div className="flex items-center gap-4 px-4 py-2 bg-muted/30 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0 border-2 border-background shadow-sm" />
              <div className="min-w-0">
                <div className="font-bold truncate text-foreground">Workspace Admin</div>
                <div className="text-sm text-muted-foreground truncate font-medium">Pro Plan</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content - Scrollable, Fixed Sidebar Content Space */}
      <main className={cn(
        "flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative",
        isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
      )}>
        {/* Mobile menu trigger - absolute positioned since header is removed */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden absolute top-6 left-6 z-40 w-10 h-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-sm"
        >
          <PanelRightClose className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
