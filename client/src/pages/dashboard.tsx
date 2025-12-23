import { Shell } from "@/components/layout/Shell";
import { CommandInputEnhanced } from "@/components/dashboard/CommandInputEnhanced";
import { DiscoverySnap } from "@/components/dashboard/DiscoverySnap";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Compass } from "lucide-react";

export default function Dashboard() {
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);

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

      {/* Discovery Button - Floating in top-right */}
      <Button 
        size="icon" 
        variant="ghost"
        onClick={() => setIsDiscoveryOpen(true)}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 z-40"
        title="Open discovery and learning path"
      >
        <Compass className="w-5 h-5" />
      </Button>
    </>
  );
}
