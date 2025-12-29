import * as React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  CreditCard, 
  Mail,
  Bell,
  HelpCircle,
  ExternalLink
} from "lucide-react";
import { useLocation } from "wouter";

export function ProfileSnap({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [, setLocation] = useLocation();

  const menuGroups = [
    {
      label: "Account",
      items: [
        { icon: Settings, label: "Account Settings", path: "/settings" },
        { icon: Shield, label: "Security & Privacy", path: null },
        { icon: CreditCard, label: "Billing & Plans", path: null },
      ]
    },
    {
      label: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", path: null },
        { icon: Bell, label: "Notifications", path: null },
        { icon: ExternalLink, label: "Documentation", path: null },
      ]
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:w-[400px] p-0 flex flex-col border-l border-border/50 shadow-2xl backdrop-blur-xl bg-background/95">
        <SheetHeader className="px-6 pt-10 pb-6 bg-muted/30 border-b border-border/50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
              <User className="w-8 h-8" />
            </div>
            <div className="flex flex-col">
              <SheetTitle className="text-xl font-heading">Alex Rivera</SheetTitle>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Mail className="w-3.5 h-3.5" />
                <span className="text-sm">alex@growth-leads.ai</span>
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {menuGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60 px-2">
                {group.label}
              </h3>
              <div className="space-y-1">
                {group.items.map((item, itemIdx) => (
                  <button
                    key={itemIdx}
                    onClick={() => {
                      if (item.path) {
                        setLocation(item.path);
                        onOpenChange(false);
                      }
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-all duration-200 group text-left"
                  >
                    <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto border-t border-border/50 p-6 bg-muted/20">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl py-6"
            onClick={() => {
              setLocation("/auth");
              onOpenChange(false);
            }}
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span className="font-semibold text-base">Log out</span>
          </Button>
          <p className="text-[10px] text-center text-muted-foreground mt-4 font-medium uppercase tracking-widest opacity-40">
            Growth OS v2.4.0
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
