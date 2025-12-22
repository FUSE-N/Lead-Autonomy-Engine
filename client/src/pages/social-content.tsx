import { Shell } from "@/components/layout/Shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Send,
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  Copy,
  Check,
  Edit2,
  Clock,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SocialPost {
  id: string;
  platform: string;
  icon: React.ElementType;
  content: string;
  tone: string;
  status: "draft" | "scheduled" | "published";
  scheduledFor?: string;
  color: string;
}

export default function SocialContent() {
  const [posts, setPosts] = useState<SocialPost[]>([
    {
      id: "1",
      platform: "LinkedIn",
      icon: Linkedin,
      content: "🚀 Excited to announce our Q1 product updates! We've listened to your feedback and built exactly what you asked for. Check out the new features dropping this week.",
      tone: "Professional",
      status: "scheduled",
      scheduledFor: "Tomorrow at 9:00 AM",
      color: "text-blue-600"
    },
    {
      id: "2",
      platform: "X (Twitter)",
      icon: Twitter,
      content: "Your marketing workflow is about to change. Introducing autonomous outreach that actually works. 🎯 #MarTech #AI",
      tone: "Casual",
      status: "draft",
      color: "text-black"
    },
    {
      id: "3",
      platform: "Instagram",
      icon: Instagram,
      content: "Behind the scenes: How we're building the future of marketing automation. Swipe for the full story! 📸✨ #Startup #Growth",
      tone: "Casual",
      status: "draft",
      color: "text-pink-600"
    },
  ]);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePublishAll = () => {
    setPosts(posts.map(post => post.status === "draft" ? { ...post, status: "published" } : post));
  };

  const getStatusColor = (status: SocialPost["status"]) => {
    switch (status) {
      case "published":
        return "bg-emerald-500/10 text-emerald-600";
      case "scheduled":
        return "bg-blue-500/10 text-blue-600";
      case "draft":
        return "bg-slate-500/10 text-slate-600";
    }
  };

  const getStatusIcon = (status: SocialPost["status"]) => {
    switch (status) {
      case "published":
        return <Check className="w-3 h-3" />;
      case "scheduled":
        return <Clock className="w-3 h-3" />;
      case "draft":
        return <Edit2 className="w-3 h-3" />;
    }
  };

  return (
    <Shell>
      <div className="space-y-8 pb-10">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold font-heading">Social Content</h1>
            <p className="text-muted-foreground">Generate, preview, and publish AI-optimized content across all platforms</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs">
              <Sparkles className="w-3 h-3 mr-1.5" />
              AI-Generated
            </Badge>
            <Badge variant="outline" className="text-xs">
              {posts.filter(p => p.status === "draft").length} drafts
            </Badge>
            <Badge variant="outline" className="text-xs">
              {posts.filter(p => p.status === "scheduled").length} scheduled
            </Badge>
            <Badge variant="outline" className="text-xs">
              {posts.filter(p => p.status === "published").length} published
            </Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-dashed">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Generate New Post</h3>
                <p className="text-xs text-muted-foreground mt-1">Use AI to create platform-optimized content</p>
              </div>
              <Button size="sm" className="w-full mt-2">Generate</Button>
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Publish All Drafts</h3>
                <p className="text-xs text-muted-foreground mt-1">Share all draft posts to your accounts</p>
              </div>
              <Button 
                size="sm" 
                className="w-full mt-2"
                onClick={handlePublishAll}
              >
                Publish Now
              </Button>
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Schedule Posts</h3>
                <p className="text-xs text-muted-foreground mt-1">Auto-schedule for optimal posting times</p>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-2">Schedule</Button>
            </CardContent>
          </Card>
        </div>

        {/* Posts Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold font-heading">Generated Posts</h2>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const Icon = post.icon;
              return (
                <Card key={post.id} className="flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded ${post.color} bg-muted/50`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">{post.platform}</span>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={cn("text-[10px] h-5 border-0", getStatusColor(post.status))}
                      >
                        {getStatusIcon(post.status)}
                        <span className="ml-1">
                          {post.status === "draft" && "Draft"}
                          {post.status === "scheduled" && "Scheduled"}
                          {post.status === "published" && "Published"}
                        </span>
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-4">
                    <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                      <p className="text-sm leading-relaxed">{post.content}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Tone: <span className="font-medium text-foreground">{post.tone}</span>
                      </span>
                      {post.scheduledFor && (
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.scheduledFor}
                        </span>
                      )}
                    </div>
                  </CardContent>

                  <CardContent className="border-t border-border pt-3 pb-0 flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 text-xs"
                      onClick={() => handleCopy(post.id, post.content)}
                    >
                      {copiedId === post.id ? (
                        <>
                          <Check className="w-3 h-3 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                    {post.status === "draft" && (
                      <Button 
                        size="sm" 
                        className="flex-1 text-xs"
                        onClick={() => {
                          const newPosts = posts.map(p => 
                            p.id === post.id ? { ...p, status: "published" as const } : p
                          );
                          setPosts(newPosts);
                        }}
                      >
                        <Send className="w-3 h-3 mr-1" />
                        Publish
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </Shell>
  );
}
