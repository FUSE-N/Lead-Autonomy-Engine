import { Shell } from "@/components/layout/Shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Users, Mail, TrendingUp, Target, Lightbulb, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function InsightCard({ 
  icon: Icon,
  title, 
  description, 
  stat,
  trend,
  trendUp,
  action
}: { 
  icon: any;
  title: string; 
  description: string;
  stat: string;
  trend: string;
  trendUp?: boolean;
  action?: string;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Icon className="w-5 h-5" />
          </div>
          {action && <Button variant="ghost" size="sm" className="text-xs h-7">{action}</Button>}
        </div>
        <h3 className="font-semibold text-sm mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground mb-4">{description}</p>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold font-heading">{stat}</span>
          <span className={`text-xs flex items-center gap-1 ${trendUp ? 'text-emerald-500' : 'text-muted-foreground'}`}>
            {trendUp && <TrendingUp className="w-3 h-3" />}
            {trend}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Insights() {
  return (
    <Shell>
      <div className="space-y-8 pb-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-heading">Insights & Analysis</h1>
          <p className="text-muted-foreground">Strategic intelligence and performance metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <InsightCard 
            icon={Users}
            title="Active Leads"
            description="Total leads in active campaigns"
            stat="1,284"
            trend="+12% from last week"
            trendUp
            action="Explore"
          />
          <InsightCard 
            icon={Mail}
            title="Emails Sent"
            description="Outreach emails dispatched"
            stat="842"
            trend="Daily limit: 1000"
            trendUp={false}
          />
          <InsightCard 
            icon={Activity}
            title="Response Rate"
            description="Percentage of leads responding"
            stat="4.2%"
            trend="+0.8% vs industry avg"
            trendUp
          />
          <InsightCard 
            icon={Target}
            title="Conversion Rate"
            description="Leads to qualified opportunities"
            stat="18.3%"
            trend="+2.1% improvement"
            trendUp
          />
          <InsightCard 
            icon={Lightbulb}
            title="Best Channel"
            description="Highest performing outreach method"
            stat="LinkedIn"
            trend="52% of conversions"
            trendUp={false}
          />
          <InsightCard 
            icon={AlertCircle}
            title="Top Opportunity"
            description="Recommended next focus area"
            stat="Fintech"
            trend="3 deals pending"
            trendUp={false}
            action="Target"
          />
        </div>

        {/* AI Recommendations */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold font-heading">AI Recommendations</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  Optimize LinkedIn Messaging
                </CardTitle>
                <CardDescription>You're seeing 52% conversion on LinkedIn. Increase volume by 20%.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" variant="outline" className="text-xs">Review Strategy</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  Expand to European Market
                </CardTitle>
                <CardDescription>120 high-fit leads identified in Germany & UK. Zero outreach yet.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" variant="outline" className="text-xs">Create Campaign</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  Scale Successful Template
                </CardTitle>
                <CardDescription>"Fintech Founder Outreach" has 22% response rate. Apply to 500 new leads.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" variant="outline" className="text-xs">Scale Campaign</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  Improve Email Performance
                </CardTitle>
                <CardDescription>Email response down to 2.1%. Try personalization at scale with templates.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" variant="outline" className="text-xs">View Templates</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trend Analysis */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold font-heading">Trend Summary</h2>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Performance Over Time</CardTitle>
              <CardDescription>Weekly trends across all channels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">LinkedIn Outreach</span>
                  <span className="text-muted-foreground">↑ 18%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Email Campaigns</span>
                  <span className="text-muted-foreground">↓ 5%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Social Content</span>
                  <span className="text-muted-foreground">↑ 32%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full w-5/6 bg-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Shell>
  );
}
