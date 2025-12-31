import { motion } from "framer-motion";
import { CheckCircle2, Circle, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { useMissions } from "@/hooks/use-missions";

interface Step {
  id: string;
  label: string;
  status: "completed" | "processing" | "pending" | "failed";
  description?: string;
}

export function WorkflowVisualizer({ missionId }: { missionId?: string }) {
  const { getMission, getLogs } = useMissions();
  const { data: mission } = getMission(missionId);
  const { data: logs } = getLogs(missionId);

  const steps: Step[] = [
    {
      id: "1",
      label: "Intent Parsing",
      status: mission?.status === "pending" ? "pending" : (logs?.some(l => l.agentName === "Intent Agent" && l.type === "success") ? "completed" : "processing"),
      description: logs?.find(l => l.agentName === "Intent Agent")?.message
    },
    {
      id: "2",
      label: "Market Research",
      status: logs?.some(l => l.agentName === "Research Agent" && l.type === "success") ? "completed" : (logs?.some(l => l.agentName === "Research Agent") ? "processing" : "pending"),
      description: logs?.find(l => l.agentName === "Research Agent")?.message
    },
    {
      id: "3",
      label: "Strategy",
      status: logs?.some(l => l.agentName === "Strategy Agent" && l.type === "success") ? "completed" : (logs?.some(l => l.agentName === "Strategy Agent") ? "processing" : "pending"),
      description: logs?.find(l => l.agentName === "Strategy Agent") ? "Campaign calendar formulated." : undefined
    },
    {
      id: "4",
      label: "Generation",
      status: logs?.some(l => l.agentName === "Content Agent" && l.type === "success") ? "completed" : (logs?.some(l => l.agentName === "Content Agent") ? "processing" : "pending"),
      description: logs?.find(l => l.agentName === "Content Agent") ? "Content assets ready." : undefined
    },
  ];

  if (!missionId) return null;
  return (
    <div className="w-full py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.id} className="flex-1 flex flex-col items-center relative w-full md:w-auto group">

            {/* Connector Line (Horizontal for Desktop) */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-4 left-1/2 w-full h-[2px] bg-border -z-10">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: step.status === "completed" ? "100%" : "0%" }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="h-full bg-primary"
                />
              </div>
            )}

            {/* Icon Circle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 bg-background transition-colors duration-300",
                step.status === "completed"
                  ? "border-primary text-primary"
                  : step.status === "processing"
                    ? "border-primary text-primary ring-4 ring-primary/10"
                    : "border-muted-foreground/30 text-muted-foreground/30"
              )}
            >
              {step.status === "completed" && <CheckCircle2 className="w-5 h-5" />}
              {step.status === "processing" && <Loader2 className="w-5 h-5 animate-spin" />}
              {step.status === "pending" && <Circle className="w-5 h-5" />}
            </motion.div>

            {/* Text Content */}
            <div className="mt-3 text-center px-2">
              <div className={cn(
                "text-sm font-medium transition-colors",
                step.status === "pending" ? "text-muted-foreground" : "text-foreground"
              )}>
                {step.label}
              </div>

              {/* Contextual Info appearing on active/completed steps */}
              {(step.status === "completed" || step.status === "processing") && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs text-muted-foreground max-w-[150px] mx-auto hidden md:block"
                >
                  {step.description}
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
