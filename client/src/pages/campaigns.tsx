import { Shell } from "@/components/layout/Shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Copy, Pause, Play, MoreHorizontal, Zap, Mail, Share2, Radio } from "lucide-react";
import { useState } from "react";

interface Campaign {
  id: string;
  name: string;
  goal: string;
  audience: string;
  channels: string[];
  status: "draft" | "active" | "completed" | "paused";
  leads: number;
  contacted: number;
  responseRate: number;
}

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "SaaS Founders - Q1 Push",
      goal: "Drive product awareness and secure initial pilots",
      audience: "450 SaaS founders in North America",
      channels: ["Email", "LinkedIn"],
      status: "active",
      leads: 450,
      contacted: 156,
      responseRate: 15.4,
    },
    {
      id: "2",
      name: "Webinar Invites - Fintech",
      goal: "Fill Q1 webinar with fintech decision makers",
      audience: "210 fintech CTOs and VPs",
      channels: ["Email"],
      status: "paused",
      leads: 210,
      contacted: 85,
      responseRate: 9.4,
    },
    {
      id: "3",
      name: "Blog Post Promotion",
      goal: "Drive case study downloads",
      audience: "890 relevant marketers",
      channels: ["Social", "Email"],
      status: "completed",
      leads: 890,
      contacted: 890,
      responseRate: 15.9,
    },
  ]);

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "Email":
        return <Mail className="w-3 h-3" />;
      case "LinkedIn":
        return <Share2 className="w-3 h-3" />;
      case "Social":
        return <Radio className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-600";
      case "paused":
        return "bg-yellow-500/10 text-yellow-600";
      case "completed":
        return "bg-blue-500/10 text-blue-600";
      case "draft":
        return "bg-slate-500/10 text-slate-600";
    }
  };

  return (
    <Shell>
      <div className="space-y-8 pb-10">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold font-heading">Campaigns</h1>
            <p className="text-muted-foreground">Create, manage, and optimize outreach campaigns</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Campaign
          </Button>
        </div>

        {/* Campaign Type Selector */}
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline" className="cursor-pointer bg-primary/10 text-primary border-0">All Campaigns</Badge>
          <Badge variant="outline" className="cursor-pointer">Content</Badge>
          <Badge variant="outline" className="cursor-pointer">Outreach</Badge>
          <Badge variant="outline" className="cursor-pointer">Social</Badge>
          <Badge variant="outline" className="cursor-pointer">Multichannel</Badge>
        </div>

        {/* Campaign Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="flex flex-col hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base">{campaign.name}</CardTitle>
                    <CardDescription className="mt-1">{campaign.goal}</CardDescription>
                  </div>
                  <Badge className={`text-xs h-fit flex-shrink-0 border-0 ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 flex-1">
                {/* Audience */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Audience</p>
                  <p className="text-sm font-medium">{campaign.audience}</p>
                </div>

                {/* Channels */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Channels</p>
                  <div className="flex gap-2 flex-wrap">
                    {campaign.channels.map((ch) => (
                      <Badge key={ch} variant="secondary" className="text-xs">
                        {getChannelIcon(ch)}
                        <span className="ml-1">{ch}</span>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="text-xs text-muted-foreground">Leads</p>
                    <p className="text-lg font-bold">{campaign.leads}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Contacted</p>
                    <p className="text-lg font-bold">{campaign.contacted}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Response</p>
                    <p className="text-lg font-bold">{campaign.responseRate}%</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{Math.round((campaign.contacted / campaign.leads) * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${(campaign.contacted / campaign.leads) * 100}%` }} 
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {campaign.status === "active" ? (
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <Pause className="w-3 h-3 mr-1" />
                      Pause
                    </Button>
                  ) : campaign.status === "paused" ? (
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <Play className="w-3 h-3 mr-1" />
                      Resume
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <Copy className="w-3 h-3 mr-1" />
                      Duplicate
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" className="flex-1 text-xs">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Shell>
  );
}
