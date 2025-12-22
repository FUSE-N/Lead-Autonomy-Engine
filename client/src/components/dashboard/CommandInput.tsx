import { Send, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CommandInput({ 
  onSend 
}: { 
  onSend?: (value: string) => void 
}) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSend?.(value);
      setValue("");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative">
      <div 
        className={cn(
          "relative bg-card rounded-2xl shadow-sm border border-border transition-all duration-300 overflow-hidden",
          isFocused ? "shadow-md ring-2 ring-primary/20 border-primary" : "shadow-sm"
        )}
      >
        <form onSubmit={handleSubmit} className="relative">
          <div className="p-4">
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Describe your goal (e.g., 'Find SaaS founders in London and email them about our new API')"
              className="w-full min-h-[80px] bg-transparent border-none resize-none focus:ring-0 text-lg placeholder:text-muted-foreground/50 font-medium"
              style={{ outline: 'none' }}
            />
          </div>
          
          <div className="flex items-center justify-between px-4 pb-4">
            <div className="flex items-center gap-2">
              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full h-8 px-3 text-xs"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Templates
              </Button>
            </div>
            
            <Button 
              type="submit" 
              disabled={!value.trim()}
              className={cn(
                "rounded-xl transition-all duration-300",
                value.trim() ? "translate-x-0 opacity-100" : "translate-x-2 opacity-50"
              )}
            >
              Start Campaign
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </div>
      
      {/* Abstract decorative glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-blue-400/20 to-teal-400/20 rounded-3xl blur-2xl -z-10 opacity-50" />
    </div>
  );
}
