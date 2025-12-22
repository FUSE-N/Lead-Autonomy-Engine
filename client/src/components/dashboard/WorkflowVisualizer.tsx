import { motion } from "framer-motion";
import { CheckCircle2, Circle, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
  status: "completed" | "processing" | "pending";
  description?: string;
}

const steps: Step[] = [
  { id: "1", label: "Audience Discovery", status: "completed", description: "Identified 1,240 potential leads matching 'SaaS Founders' in London." },
  { id: "2", label: "Strategy Formulation", status: "processing", description: "Analyzing optimal outreach channels and crafting value proposition." },
  { id: "3", label: "Content Generation", status: "pending", description: "Generating personalized email sequences." },
  { id: "4", label: "Execution", status: "pending", description: "Ready to schedule." },
];

export function WorkflowVisualizer() {
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
