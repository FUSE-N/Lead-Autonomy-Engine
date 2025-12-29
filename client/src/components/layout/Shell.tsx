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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sheet, SheetContent } from "@/components/ui/sheet";

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
  
  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved) setIsSidebarCollapsed(JSON.parse(saved));
  }, []);

  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
  };

  const sidebarContent = (
    <div className="h-full flex flex-col p-4 overflow-y-auto">
      <div className={cn("flex items-center gap-2 mb-8", isSidebarCollapsed ? "justify-center" : "justify-between")}>
        {!isSidebarCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold font-heading tracking-tight whitespace-nowrap">Leads</span>
          </div>
        )}
        
        <button 
          onClick={toggleSidebar}
          className="hidden md:flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition-all duration-300 flex-shrink-0 border border-border bg-background shadow-sm"
        >
          {isSidebarCollapsed ? <PanelRightClose className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>

        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition-all duration-300 flex-shrink-0 border border-border bg-background shadow-sm"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer w-full",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!isSidebarCollapsed && <span>{item.label}</span>}
              </button>
            </Link>
          );
        })}
      </nav>

      {(!isSidebarCollapsed || isMobileMenuOpen) && (
        <div className="space-y-1 pb-6 border-b border-border">
          {sidebarPages.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
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

      {(!isSidebarCollapsed || isMobileMenuOpen) && (
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
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer truncate w-full text-left"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary/40 flex-shrink-0" />
                    <span className="truncate">{lead}</span>
                  </button>
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      <div className="pt-4 border-t border-border mt-auto space-y-4">
        {(!isSidebarCollapsed || isMobileMenuOpen) ? (
          <>
            <Link href="/settings">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
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
            >
              <Settings className="w-4 h-4" />
            </button>
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background overflow-hidden">
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-card border-r border-border transition-all duration-300 ease-in-out hidden md:flex flex-col",
          isSidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>

      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[300px] p-0 border-r border-border/50 shadow-2xl backdrop-blur-xl bg-background/95">
          {sidebarContent}
        </SheetContent>
      </Sheet>

      <main className={cn(
        "flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative transition-all duration-300",
        isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
      )}>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden absolute top-6 left-6 z-40 w-10 h-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-sm active:scale-95 transition-transform"
        >
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
