import { Shell } from "@/components/layout/Shell";
import { CommandInputEnhanced } from "@/components/dashboard/CommandInputEnhanced";
import { WorkflowVisualizer } from "@/components/dashboard/WorkflowVisualizer";
import { PotentialClientsSlider } from "@/components/dashboard/PotentialClientsSlider";
import { DiscoverySnap } from "@/components/dashboard/DiscoverySnap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Users, Mail, TrendingUp, MoreHorizontal, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function MetricCard({ 
  title, 
  value, 
  trend, 
  icon: Icon,
  trendUp 
}: { 
  title: string; 
  value: string; 
  trend: string; 
  icon: any;
  trendUp?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-bold font-heading tracking-tight">{value}</h3>
          <p className={`text-xs ${trendUp ? 'text-emerald-500' : 'text-muted-foreground'} flex items-center`}>
            {trendUp && <TrendingUp className="w-3 h-3 mr-1" />}
            {trend}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);

  return (
    <>
      <Shell>
        <div className="space-y-12">
          
          {/* Hero Section */}
          <div className="space-y-6 text-center max-w-4xl mx-auto pt-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground font-heading tracking-tight">
              What's our <span className="text-primary">mission</span> today?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I'm ready to research audiences, draft content, or launch outreach campaigns autonomously.
            </p>
            
            <div className="pt-4">
              <CommandInputEnhanced onSend={(val) => console.log(val)} />
            </div>
          </div>

          {/* Potential Clients Slider */}
          <div className="space-y-4">
            <PotentialClientsSlider />
          </div>

          {/* Active Workflow Visualization */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-semibold font-heading">Active Agent Activity</h2>
              <Badge variant="outline" className="text-xs font-normal">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                Processing "London SaaS Outreach"
              </Badge>
            </div>
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/5">
              <CardContent className="pt-6">
                <WorkflowVisualizer />
              </CardContent>
            </Card>
          </div>

          {/* Analytics Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-semibold font-heading">Performance Overview</h2>
              <Button variant="ghost" size="sm" className="text-muted-foreground">View all</Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard 
                title="Active Leads" 
                value="1,284" 
                trend="+12% from last week" 
                icon={Users} 
                trendUp
              />
              <MetricCard 
                title="Emails Sent" 
                value="842" 
                trend="Daily limit: 1000" 
                icon={Send} 
              />
              <MetricCard 
                title="Response Rate" 
                value="4.2%" 
                trend="+0.8% vs industry avg" 
                icon={Activity} 
                trendUp
              />
              <MetricCard 
                title="Meetings Booked" 
                value="12" 
                trend="3 pending confirmation" 
                icon={Calendar} 
              />
            </div>
          </div>

          {/* Recent Campaigns Table */}
          <div className="space-y-4 pb-10">
             <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-semibold font-heading">Recent Campaigns</h2>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {[
                    { name: "SaaS Founders - Q1 Push", status: "Active", progress: 65, leads: 450 },
                    { name: "Webinar Invites - Fintech", status: "Paused", progress: 32, leads: 210 },
                    { name: "Blog Post Promotion", status: "Completed", progress: 100, leads: 890 },
                  ].map((campaign, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">{campaign.name}</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'} className="text-[10px] h-5">
                            {campaign.status}
                          </Badge>
                          <span>• {campaign.leads} leads targeted</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24 md:w-32 flex flex-col gap-1">
                          <div className="flex justify-between text-[10px] text-muted-foreground">
                            <span>Progress</span>
                            <span>{campaign.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all duration-500" 
                              style={{ width: `${campaign.progress}%` }} 
                            />
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Shell>

      {/* Discovery Snap - Floating in header */}
      <DiscoverySnap isOpen={isDiscoveryOpen} onOpenChange={setIsDiscoveryOpen} currentProgress={28} />

      {/* Discovery Button (Floating in top-right) */}
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

// Icon for the metric card
function Send({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function Calendar({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}
