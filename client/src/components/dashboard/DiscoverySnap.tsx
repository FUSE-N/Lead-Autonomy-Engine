import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, ArrowRight, Book, Zap, Users, Lock, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiscoveryLevel {
  id: number;
  percentage: number;
  title: string;
  description: string;
  icon: React.ElementType;
  tips: string[];
  readTime: string;
}

const discoveryLevels: DiscoveryLevel[] = [
  {
    id: 1,
    percentage: 20,
    title: "Getting Started",
    description: "How to describe your product for better AI results",
    icon: Book,
    tips: [
      "Use specific, descriptive language about your product",
      "Include target customer profile and use cases",
      "Mention unique value propositions clearly",
    ],
    readTime: "3 min read",
  },
  {
    id: 2,
    percentage: 40,
    title: "Social Integration",
    description: "Linking social accounts to enable one-click publishing",
    icon: Users,
    tips: [
      "Connect your LinkedIn and Twitter accounts first",
      "Set default platforms for automatic posting",
      "Configure team member access (if applicable)",
    ],
    readTime: "4 min read",
  },
  {
    id: 3,
    percentage: 60,
    title: "Lead Organization",
    description: "Using Leads Folders to scale multiple campaigns",
    icon: Zap,
    tips: [
      "Create separate folders for different target audiences",
      "Use folder templates for repeatable campaigns",
      "Track performance metrics per campaign",
    ],
    readTime: "5 min read",
  },
  {
    id: 4,
    percentage: 80,
    title: "Optimization",
    description: "Optimizing outreach with AI-driven personalization",
    icon: Lightbulb,
    tips: [
      "Use engagement data to refine messaging",
      "A/B test subject lines and content variations",
      "Monitor response rates by channel",
    ],
    readTime: "6 min read",
  },
  {
    id: 5,
    percentage: 100,
    title: "Advanced Mastery",
    description: "Advanced autonomous workflows and growth automation",
    icon: Lock,
    tips: [
      "Set up fully automated campaign sequences",
      "Create custom workflows for unique scenarios",
      "Integrate external tools and platforms",
    ],
    readTime: "7 min read",
  },
];

export function DiscoverySnap({
  isOpen,
  onOpenChange,
  currentProgress = 28,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentProgress?: number;
}) {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const currentLevel = discoveryLevels.find((l) => l.percentage <= currentProgress);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:w-[480px] p-0 flex flex-col">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="text-2xl font-heading">Your Learning Path</SheetTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Master Leads.ai and unlock platform capabilities
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Progress Overview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Overall Progress</h3>
              <span className="text-sm font-bold text-primary">{currentProgress}%</span>
            </div>
            <Progress value={currentProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {currentProgress < 100
                ? `Unlock advanced features at 100%`
                : "Congratulations! You've mastered Leads.ai"}
            </p>
          </div>

          {/* Milestones */}
          <div className="space-y-3">
            {discoveryLevels.map((level) => {
              const isCompleted = currentProgress >= level.percentage;
              const isCurrent = currentLevel?.id === level.id;
              const Icon = level.icon;

              return (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(selectedLevel === level.id ? null : level.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border transition-all duration-200 cursor-pointer",
                    isCompleted
                      ? "bg-primary/10 border-primary/30 hover:border-primary/50"
                      : "bg-muted/20 border-border opacity-50",
                    isCurrent && "ring-2 ring-primary/50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground/30" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-muted-foreground">{level.percentage}%</span>
                        <Icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <h4 className="font-semibold text-sm">{level.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{level.description}</p>

                      {selectedLevel === level.id && (
                        <div className="mt-3 pt-3 border-t border-border/50 space-y-2">
                          <ul className="space-y-1.5">
                            {level.tips.map((tip, idx) => (
                              <li key={idx} className="text-xs text-foreground flex gap-2">
                                <span className="text-primary font-bold">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                          <Button size="sm" variant="outline" className="w-full mt-3 text-xs">
                            <Book className="w-3 h-3 mr-1.5" />
                            Read Article ({level.readTime})
                          </Button>
                        </div>
                      )}
                    </div>

                    {selectedLevel === level.id && (
                      <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-border px-6 py-4">
          <Button className="w-full">Continue Learning</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ChevronDown({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
