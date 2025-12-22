import { Shell } from "@/components/layout/Shell";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Mail, Clock, TrendingUp, Copy } from "lucide-react";
import { Link } from "wouter";

const leadsData: Record<string, any> = {
  "0": {
    name: "SaaS Founders - Q1 Push",
    status: "Active",
    created: "Jan 15, 2025",
    totalLeads: 450,
    contacted: 156,
    responded: 24,
    responseRate: "15.4%",
    description: "High-intent SaaS founders in North America for our new API product launch",
    messages: [
      "Custom email sequence generated",
      "LinkedIn connection requests sent",
      "Follow-up automation scheduled"
    ]
  },
  "1": {
    name: "Webinar Invites - Fintech",
    status: "Paused",
    created: "Jan 10, 2025",
    totalLeads: 210,
    contacted: 85,
    responded: 8,
    responseRate: "9.4%",
    description: "Fintech decision makers for Q1 webinar series",
    messages: [
      "Initial outreach sent",
      "Follow-up email queued",
      "Calendar invite ready"
    ]
  },
  "2": {
    name: "Blog Post Promotion",
    status: "Completed",
    created: "Jan 5, 2025",
    totalLeads: 890,
    contacted: 890,
    responded: 142,
    responseRate: "15.9%",
    description: "Promote new case study to relevant marketing leaders",
    messages: [
      "Email campaign delivered",
      "Social shares scheduled",
      "Performance report generated"
    ]
  }
};

export default function LeadsFolder() {
  const [match, params] = useRoute("/leads/:id");
  
  if (!match) return null;

  const leads = leadsData[params?.id as string];

  if (!leads) {
    return (
      <Shell>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Leads folder not found</p>
        </div>
      </Shell>
    );
  }

  const statusColors: Record<string, string> = {
    "Active": "bg-emerald-500/10 text-emerald-600",
    "Paused": "bg-yellow-500/10 text-yellow-600",
    "Completed": "bg-blue-500/10 text-blue-600",
  };

  return (
    <Shell>
      <div className="space-y-8 pb-10">
        
        {/* Header with Back Button */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Link href="/">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-3">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>
            </Link>
            <h1 className="text-3xl font-bold font-heading">{leads.name}</h1>
            <p className="text-muted-foreground">{leads.description}</p>
          </div>
          
          <Badge className={statusColors[leads.status]}>
            {leads.status}
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4 space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Total Leads</p>
              <p className="text-2xl font-bold font-heading">{leads.totalLeads}</p>
              <p className="text-xs text-muted-foreground mt-2">Created: {leads.created}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-1">
              <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <Mail className="w-3 h-3" />
                Contacted
              </p>
              <p className="text-2xl font-bold font-heading">{leads.contacted}</p>
              <p className="text-xs text-muted-foreground mt-2">{Math.round(leads.contacted / leads.totalLeads * 100)}% of total</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-1">
              <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <Users className="w-3 h-3" />
                Responses
              </p>
              <p className="text-2xl font-bold font-heading">{leads.responded}</p>
              <p className="text-xs text-muted-foreground mt-2">Rate: {leads.responseRate}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-1">
              <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Next Step
              </p>
              <p className="text-2xl font-bold font-heading">Follow-up</p>
              <p className="text-xs text-muted-foreground mt-2">Scheduled in 2 days</p>
            </CardContent>
          </Card>
        </div>

        {/* AI-Generated Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI-Generated Messages</CardTitle>
            <CardDescription>Personalized outreach content used for this campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {leads.messages.map((msg: string, idx: number) => (
              <div 
                key={idx} 
                className="flex items-start justify-between p-4 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{msg}</p>
                  <p className="text-xs text-muted-foreground">Example message variation</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Lead Response Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Responses</CardTitle>
            <CardDescription>Latest engagement from leads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((idx) => (
                <div key={idx} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Lead #{Math.floor(Math.random() * 1000)} Responded</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Interested in demo • 2 hours ago</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-border">
          <Button className="flex-1">
            <Mail className="w-4 h-4 mr-2" />
            Send Follow-up
          </Button>
          <Button variant="outline" className="flex-1">
            <Clock className="w-4 h-4 mr-2" />
            Reschedule Campaign
          </Button>
        </div>
      </div>
    </Shell>
  );
}
