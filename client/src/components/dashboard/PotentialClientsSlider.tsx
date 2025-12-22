import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Mail, Linkedin, Globe, MessageSquare, Plus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PotentialClient {
  id: string;
  company: string;
  industry: string;
  location: string;
  size: string;
  fit: string;
  suggestedChannel: "Email" | "LinkedIn" | "Social" | "Website";
  score: number;
}

const potentialClients: PotentialClient[] = [
  {
    id: "1",
    company: "TechVenture Labs",
    industry: "SaaS / AI",
    location: "San Francisco, CA",
    size: "50-100 employees",
    fit: "Heavy API user with 3+ integrations. Perfect match for your platform.",
    suggestedChannel: "LinkedIn",
    score: 92,
  },
  {
    id: "2",
    company: "Growth Systems Inc",
    industry: "MarTech",
    location: "Austin, TX",
    size: "100-250 employees",
    fit: "Growing marketing ops team. Your automation would save them 20+ hours/week.",
    suggestedChannel: "Email",
    score: 88,
  },
  {
    id: "3",
    company: "Horizon Fintech",
    industry: "Fintech",
    location: "New York, NY",
    size: "150-300 employees",
    fit: "Expanding customer acquisition. Needs your exact use case.",
    suggestedChannel: "LinkedIn",
    score: 85,
  },
  {
    id: "4",
    company: "NextGen Commerce",
    industry: "E-commerce",
    location: "Los Angeles, CA",
    size: "30-50 employees",
    fit: "Early-stage with lean team. Perfect for autonomous outreach.",
    suggestedChannel: "Email",
    score: 81,
  },
  {
    id: "5",
    company: "DataFlow Systems",
    industry: "Analytics",
    location: "Boston, MA",
    size: "200+ employees",
    fit: "Data-driven team. Your insights align with their culture.",
    suggestedChannel: "Website",
    score: 79,
  },
];

export function PotentialClientsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollPrev(scrollLeft > 0);
      setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 100);
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "Email":
        return <Mail className="w-4 h-4" />;
      case "LinkedIn":
        return <Linkedin className="w-4 h-4" />;
      case "Social":
        return <MessageSquare className="w-4 h-4" />;
      case "Website":
        return <Globe className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-semibold font-heading">Potential Clients</h2>
        <div className="flex gap-1">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => scroll("left")}
            disabled={!canScrollPrev}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => scroll("right")}
            disabled={!canScrollNext}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative">
        <div 
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
        >
          {potentialClients.map((client) => (
            <div 
              key={client.id} 
              className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 snap-start"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50">
                <CardContent className="p-4 flex flex-col h-full gap-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 flex-1">
                      <h3 className="font-bold text-sm leading-tight">{client.company}</h3>
                      <p className="text-xs text-muted-foreground">{client.industry}</p>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="text-xs h-fit whitespace-nowrap bg-primary/10 text-primary border-0"
                    >
                      {client.score}%
                    </Badge>
                  </div>

                  {/* Location & Size */}
                  <div className="space-y-1 text-xs">
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">{client.location}</span></p>
                    <p className="text-muted-foreground">{client.size}</p>
                  </div>

                  {/* AI Insight */}
                  <div className="p-2.5 rounded-lg bg-primary/5 border border-primary/20 flex-1">
                    <p className="text-xs leading-relaxed text-foreground">
                      {client.fit}
                    </p>
                  </div>

                  {/* Channel */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground px-2 py-1.5 rounded-lg bg-muted/30">
                    {getChannelIcon(client.suggestedChannel)}
                    <span>Suggest: <span className="font-medium">{client.suggestedChannel}</span></span>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Button size="sm" variant="outline" className="h-8 text-xs">
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                    <Button size="sm" className="h-8 text-xs">
                      <Zap className="w-3 h-3 mr-1" />
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
