import { Send, Sparkles, ArrowRight, Paperclip, Mic } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function CommandInputEnhanced({ 
  onSend 
}: { 
  onSend?: (value: string) => void 
}) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSend?.(value);
      setValue("");
      setAttachedFiles([]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      const newFiles = Array.from(files).map(f => f.name);
      setAttachedFiles([...attachedFiles, ...newFiles]);
    }
  };

  const handleVoiceRecord = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setIsRecording(true);

        mediaRecorder.onstop = () => {
          setIsRecording(false);
          setValue(prev => prev + " [Voice message recorded]");
        };

        setTimeout(() => {
          mediaRecorder.stop();
          stream.getTracks().forEach(track => track.stop());
        }, 5000);
      } catch (err) {
        console.error("Microphone access denied");
      }
    } else {
      mediaRecorderRef.current?.stop();
    }
  };

  const removeFile = (fileName: string) => {
    setAttachedFiles(attachedFiles.filter(f => f !== fileName));
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
            {/* Attached Files Display */}
            {attachedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {attachedFiles.map((file) => (
                  <Badge key={file} variant="secondary" className="text-xs pl-2">
                    📎 {file}
                    <button
                      type="button"
                      onClick={() => removeFile(file)}
                      className="ml-1.5 text-muted-foreground hover:text-foreground"
                    >
                      ✕
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Voice Recording Indicator */}
            {isRecording && (
              <div className="flex items-center gap-2 mb-3 text-sm text-primary">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Recording audio...
              </div>
            )}

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
            <div className="flex items-center gap-1">
              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full h-8 px-3 text-xs"
                title="Upload PDF, DOC, or image"
              >
                <Paperclip className="w-3.5 h-3.5 mr-1.5" />
                Attach
              </Button>

              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                onClick={handleVoiceRecord}
                className={cn(
                  "rounded-full h-8 px-3 text-xs transition-colors",
                  isRecording 
                    ? "text-destructive hover:bg-destructive/10" 
                    : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                )}
                title="Record voice message"
              >
                <Mic className={cn("w-3.5 h-3.5 mr-1.5", isRecording && "animate-pulse")} />
                {isRecording ? "Stop" : "Voice"}
              </Button>

              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full h-8 px-3 text-xs"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Templates
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                onChange={handleFileSelect}
                className="hidden"
              />
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
