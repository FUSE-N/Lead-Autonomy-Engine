import * as React from "react";
import { useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { CommandInputEnhanced } from "@/components/dashboard/CommandInputEnhanced";
import { DiscoverySnap } from "@/components/dashboard/DiscoverySnap";
import { Button } from "@/components/ui/button";
import { Compass, User, Settings, LogOut, Shield, CreditCard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation } from "wouter";

export default function Dashboard() {
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const [, setLocation] = useLocation();

  return (
    <>
      <Shell>
        <div className="max-w-4xl mx-auto py-12">
          {/* Hero Section - Minimal, Mission-Focused */}
          <div className="space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground font-heading tracking-tight">
                Welcome back
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-primary font-heading">
                What's our mission today?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                I'm ready to research audiences, draft content, or launch outreach campaigns autonomously.
              </p>
            </div>

            {/* Primary Command Input - Clean Focus */}
            <div className="pt-8">
              <CommandInputEnhanced onSend={(val) => console.log(val)} />
            </div>

            {/* Quick Navigation Hints */}
            <div className="pt-12 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">Explore deeper insights</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="outline" size="sm">View Active Campaigns</Button>
                <Button variant="outline" size="sm">Agent Activity</Button>
                <Button variant="outline" size="sm">Performance Metrics</Button>
              </div>
            </div>
          </div>
        </div>
      </Shell>

      {/* Discovery Snap */}
      <DiscoverySnap isOpen={isDiscoveryOpen} onOpenChange={setIsDiscoveryOpen} currentProgress={28} />

      {/* Floating Action Buttons - Top Area */}
      <div className="fixed top-6 left-6 md:left-auto right-6 flex items-center justify-between md:justify-end gap-3 z-40 w-[calc(100%-3rem)] md:w-auto">
        <div className="flex items-center gap-3 ml-auto">
          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                size="icon" 
                variant="outline"
                className="h-10 w-10 rounded-full shadow-sm hover:bg-accent flex items-center justify-center bg-background/80 backdrop-blur-sm transition-all active:scale-95"
                title="User profile"
              >
                <User className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2 border-border/50 shadow-xl backdrop-blur-md bg-background/95">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Alex Rivera</p>
                  <p className="text-xs leading-none text-muted-foreground">alex@growth-leads.ai</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => setLocation("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing & Plans</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Shield className="mr-2 h-4 w-4" />
                <span>Security</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={() => setLocation("/auth")}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Discovery Button */}
          <Button 
            size="icon" 
            variant="default"
            onClick={() => setIsDiscoveryOpen(true)}
            className="h-10 w-10 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center transition-all active:scale-95"
            title="Open discovery and learning path"
          >
            <Compass className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
