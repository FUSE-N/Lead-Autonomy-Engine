import * as React from "react";
import { useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { CommandInputEnhanced } from "@/components/dashboard/CommandInputEnhanced";
import { DiscoverySnap } from "@/components/dashboard/DiscoverySnap";
import { ProfileSnap } from "@/components/dashboard/ProfileSnap";
import { WorkflowVisualizer } from "@/components/dashboard/WorkflowVisualizer";
import { Button } from "@/components/ui/button";
import { Compass, User } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export default function Dashboard() {
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  return (
    <>
      <Shell>
        <div className="max-w-4xl mx-auto py-12">
          {/* Hero Section - Minimal, Mission-Focused */}
          <div className="space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground font-heading tracking-tight">
                Welcome back{user ? `, ${user.username.split('@')[0]}` : ""}
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
              <CommandInputEnhanced onMissionStarted={(id) => setActiveMissionId(id)} />
            </div>

            {/* Workflow Visualizer - Show when active */}
            {activeMissionId && (
              <div className="pt-8">
                <WorkflowVisualizer missionId={activeMissionId} />
              </div>
            )}

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

      {/* Snap Views */}
      <DiscoverySnap isOpen={isDiscoveryOpen} onOpenChange={setIsDiscoveryOpen} currentProgress={28} />
      <ProfileSnap isOpen={isProfileOpen} onOpenChange={setIsProfileOpen} />

      {/* Floating Action Buttons - Top Area */}
      <div className="fixed top-6 left-6 md:left-auto right-6 flex items-center justify-between md:justify-end gap-3 z-40 w-[calc(100%-3rem)] md:w-auto">
        <div className="flex items-center gap-3 ml-auto">
          {/* Profile Trigger - Now opens Snap view */}
          <Button
            size="icon"
            variant="outline"
            onClick={() => setIsProfileOpen(true)}
            className="h-10 w-10 rounded-full shadow-sm hover:bg-accent flex items-center justify-center bg-background/80 backdrop-blur-sm transition-all active:scale-95"
            title="User profile"
          >
            <User className="w-4 h-4" />
          </Button>

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
