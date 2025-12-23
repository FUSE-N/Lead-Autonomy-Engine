import { Shell } from "@/components/layout/Shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, Clock } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  frequency: string;
  isEnabled: boolean;
  lastRun?: string;
  nextRun: string;
}

export default function Automations() {
  const [automations, setAutomations] = useState<Automation[]>([
    {
      id: "1",
      name: "Weekly Lead Enrichment",
      description: "Automatically enrich new leads with company data and firmographic signals",
      trigger: "Every Monday at 2:00 AM UTC",
      action: "Enrich leads, update scores, notify on high-opportunities",
      frequency: "Weekly",
      isEnabled: true,
      lastRun: "Monday, 2:15 AM",
      nextRun: "Next Monday, 2:00 AM",
    },
    {
      id: "2",
      name: "Follow-up Email Sequence",
      description: "Send automated follow-ups to leads who haven't responded",
      trigger: "3 days after initial contact",
      action: "Send personalized follow-up email",
      frequency: "Continuous",
      isEnabled: true,
      lastRun: "Today, 10:30 AM",
      nextRun: "Ongoing",
    },
    {
      id: "3",
      name: "Daily Social Post Publishing",
      description: "Publish pre-generated social content to all linked accounts",
      trigger: "Every day at 9:00 AM UTC",
      action: "Publish to LinkedIn, Twitter, Instagram, Facebook",
      frequency: "Daily",
      isEnabled: true,
      lastRun: "Today, 9:05 AM",
      nextRun: "Tomorrow, 9:00 AM",
    },
    {
      id: "4",
      name: "Performance Report Generation",
      description: "Generate weekly performance summary and AI insights",
      trigger: "Every Friday at 5:00 PM UTC",
      action: "Compile metrics, generate recommendations, send report",
      frequency: "Weekly",
      isEnabled: false,
      nextRun: "Next Friday, 5:00 PM",
    },
  ]);

  const toggleAutomation = (id: string) => {
    setAutomations(automations.map(a => 
      a.id === id ? { ...a, isEnabled: !a.isEnabled } : a
    ));
  };

  return (
    <Shell>
      <div className="space-y-8 pb-10">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold font-heading">Automations</h1>
            <p className="text-muted-foreground">Set up autonomous workflows to scale your growth</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Automation
          </Button>
        </div>

        {/* Info Card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <p className="text-sm">
              <span className="font-semibold">Tip:</span> Use natural language to describe your automation. Our AI will translate it into a workflow. Example: "Every week, find new SaaS founders in Europe and start LinkedIn outreach."
            </p>
          </CardContent>
        </Card>

        {/* Automations List */}
        <div className="space-y-4">
          {automations.map((automation) => (
            <Card key={automation.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold">{automation.name}</h3>
                      <Badge 
                        variant={automation.isEnabled ? "default" : "secondary"} 
                        className={automation.isEnabled ? "bg-emerald-500/10 text-emerald-600 border-0" : ""}
                      >
                        {automation.isEnabled ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{automation.description}</p>
                  </div>

                  {/* Toggle */}
                  <Switch 
                    checked={automation.isEnabled}
                    onCheckedChange={() => toggleAutomation(automation.id)}
                  />
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-3 gap-4 mb-4 p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Trigger</p>
                    <p className="text-sm font-medium">{automation.trigger}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Action</p>
                    <p className="text-sm font-medium">{automation.action}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Frequency</p>
                    <p className="text-sm font-medium">{automation.frequency}</p>
                  </div>
                </div>

                {/* Run Info */}
                <div className="space-y-2 mb-4">
                  {automation.lastRun && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>Last run: {automation.lastRun}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Next run: {automation.nextRun}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs text-destructive hover:text-destructive">
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create New Automation Card */}
        <Card className="border-dashed">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <Plus className="w-8 h-8 text-muted-foreground/50 mb-3" />
            <h3 className="font-semibold mb-1">Create Custom Automation</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              Describe what you want to automate in plain English and AI will create the workflow
            </p>
            <Button size="sm">New Automation</Button>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
}
