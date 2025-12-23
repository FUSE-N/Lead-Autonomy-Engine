import { Shell } from "@/components/layout/Shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Loader2, AlertCircle, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Task {
  id: string;
  name: string;
  status: "completed" | "running" | "pending" | "error";
  progress: number;
  startedAt: string;
  duration?: string;
  details: string;
}

export default function AgentActivity() {
  const [tasks] = useState<Task[]>([
    {
      id: "1",
      name: "London SaaS Outreach Campaign",
      status: "running",
      progress: 65,
      startedAt: "2 hours ago",
      details: "Processing 450 leads for personalized LinkedIn outreach",
    },
    {
      id: "2",
      name: "Fintech Email Sequence",
      status: "completed",
      progress: 100,
      startedAt: "Yesterday",
      duration: "2 hours",
      details: "Sent 210 personalized emails to fintech founders",
    },
    {
      id: "3",
      name: "Social Media Content Generation",
      status: "running",
      progress: 42,
      startedAt: "30 minutes ago",
      details: "Generating 24 platform-optimized posts across 4 channels",
    },
    {
      id: "4",
      name: "Lead Enrichment & Scoring",
      status: "completed",
      progress: 100,
      startedAt: "3 days ago",
      duration: "4 hours",
      details: "Enriched 890 leads with company data and fit scores",
    },
    {
      id: "5",
      name: "Weekly Analytics Report",
      status: "pending",
      progress: 0,
      startedAt: "Scheduled for tomorrow",
      details: "Will compile performance metrics and learning feedback",
    },
  ]);

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "running":
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case "pending":
        return <Clock className="w-5 h-5 text-slate-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-destructive" />;
    }
  };

  const getStatusLabel = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "running":
        return "Running";
      case "pending":
        return "Pending";
      case "error":
        return "Error";
    }
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-600";
      case "running":
        return "bg-blue-500/10 text-blue-600";
      case "pending":
        return "bg-slate-500/10 text-slate-600";
      case "error":
        return "bg-destructive/10 text-destructive";
    }
  };

  return (
    <Shell>
      <div className="space-y-8 pb-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-heading">Agent Activity</h1>
          <p className="text-muted-foreground">Real-time execution log of autonomous workflows</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Active Agents</p>
              <p className="text-3xl font-bold font-heading">2</p>
              <p className="text-xs text-emerald-600 mt-2">Running continuously</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Tasks Completed</p>
              <p className="text-3xl font-bold font-heading">2,450</p>
              <p className="text-xs text-muted-foreground mt-2">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Avg Duration</p>
              <p className="text-3xl font-bold font-heading">3.2h</p>
              <p className="text-xs text-emerald-600 mt-2">+12% faster than last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Success Rate</p>
              <p className="text-3xl font-bold font-heading">98.7%</p>
              <p className="text-xs text-emerald-600 mt-2">5 manual interventions</p>
            </CardContent>
          </Card>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold font-heading">Task Execution Log</h2>
          <div className="space-y-3">
            {tasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Status Icon */}
                    <div className="mt-1 flex-shrink-0">
                      {getStatusIcon(task.status)}
                    </div>

                    {/* Task Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-semibold text-base">{task.name}</h3>
                        <Badge className={`text-xs h-fit flex-shrink-0 border-0 ${getStatusColor(task.status)}`}>
                          {getStatusLabel(task.status)}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">{task.details}</p>

                      {/* Progress Bar */}
                      {(task.status === "running" || task.status === "pending") && (
                        <div className="space-y-1.5 mb-3">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{task.progress}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all duration-300" 
                              style={{ width: `${task.progress}%` }} 
                            />
                          </div>
                        </div>
                      )}

                      {/* Metadata */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{task.startedAt}</span>
                        {task.duration && <span>• Completed in {task.duration}</span>}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      {task.status === "running" && (
                        <Button variant="ghost" size="sm" className="text-xs">Pause</Button>
                      )}
                      <Button variant="ghost" size="sm" className="text-xs">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Agent Configuration */}
        <div className="space-y-4 border-t border-border pt-8">
          <h2 className="text-xl font-semibold font-heading">Active Automations</h2>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                Weekly Lead Enrichment
              </CardTitle>
              <CardDescription>Runs every Monday at 2:00 AM UTC</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium mb-1">Configuration</p>
                <ul className="text-muted-foreground space-y-1 text-xs">
                  <li>• Enrich all new leads with company data</li>
                  <li>• Update firmographic signals</li>
                  <li>• Re-score lead quality</li>
                  <li>• Notify on high-opportunity matches</li>
                </ul>
              </div>
              <Button variant="outline" size="sm" className="text-xs">Edit Automation</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Shell>
  );
}
