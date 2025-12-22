import { Shell } from "@/components/layout/Shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Link2,
  Check,
  LogOut,
  Plus
} from "lucide-react";
import { useState } from "react";

interface LinkedAccount {
  platform: string;
  icon: React.ElementType;
  username: string;
  email?: string;
  connected: boolean;
  color: string;
}

export default function Settings() {
  const [accounts, setAccounts] = useState<LinkedAccount[]>([
    {
      platform: "LinkedIn",
      icon: Linkedin,
      username: "@john_entrepreneur",
      email: "john@company.com",
      connected: true,
      color: "text-blue-600"
    },
    {
      platform: "X (Twitter)",
      icon: Twitter,
      username: "@johntweetstech",
      connected: true,
      color: "text-black"
    },
    {
      platform: "Facebook",
      icon: Facebook,
      username: "Facebook Business Page",
      connected: false,
      color: "text-blue-500"
    },
    {
      platform: "Instagram",
      icon: Instagram,
      username: "Not connected",
      connected: false,
      color: "text-pink-600"
    },
  ]);

  const handleConnect = (index: number) => {
    const newAccounts = [...accounts];
    newAccounts[index].connected = true;
    setAccounts(newAccounts);
  };

  const handleDisconnect = (index: number) => {
    const newAccounts = [...accounts];
    newAccounts[index].connected = false;
    newAccounts[index].username = "Not connected";
    setAccounts(newAccounts);
  };

  return (
    <Shell>
      <div className="space-y-8 pb-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-heading">Settings</h1>
          <p className="text-muted-foreground">Manage your account and integrations</p>
        </div>

        {/* Social Media Accounts Section */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold font-heading">Linked Social Accounts</h2>
            <p className="text-sm text-muted-foreground">
              Connect your social media accounts to enable autonomous posting and content distribution. We use OAuth to keep your accounts secure.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {accounts.map((account, idx) => {
              const Icon = account.icon;
              return (
                <Card key={idx} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-muted ${account.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">{account.platform}</h3>
                          <p className="text-xs text-muted-foreground">
                            {account.connected ? "Connected" : "Not connected"}
                          </p>
                        </div>
                      </div>
                      {account.connected && (
                        <Badge variant="default" className="bg-emerald-500/10 text-emerald-600 border-0">
                          <Check className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {account.connected && (
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Account:</span>
                          <code className="bg-muted px-2 py-1 rounded text-xs font-mono">{account.username}</code>
                        </div>
                        {account.email && (
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Email:</span>
                            <span className="text-sm">{account.email}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="pt-2 flex gap-2">
                      {!account.connected ? (
                        <Button 
                          size="sm" 
                          onClick={() => handleConnect(idx)}
                          className="w-full"
                        >
                          <Link2 className="w-3.5 h-3.5 mr-2" />
                          Connect Account
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDisconnect(idx)}
                          className="w-full text-destructive hover:text-destructive"
                        >
                          <LogOut className="w-3.5 h-3.5 mr-2" />
                          Disconnect
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* API Keys Section */}
        <div className="space-y-4 pt-8 border-t border-border">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold font-heading">API Configuration</h2>
            <p className="text-sm text-muted-foreground">
              Advanced settings for API access and integrations
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">API Keys</CardTitle>
              <CardDescription>Create and manage API keys for external integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-dashed border-border p-8 text-center">
                <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-sm text-muted-foreground">No API keys created yet</p>
                <Button variant="outline" size="sm" className="mt-4">
                  <Plus className="w-3.5 h-3.5 mr-2" />
                  Create API Key
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workspace Settings */}
        <div className="space-y-4 pt-8 border-t border-border">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold font-heading">Workspace</h2>
            <p className="text-sm text-muted-foreground">
              Manage your workspace settings and team
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Workspace Name</CardTitle>
              </CardHeader>
              <CardContent>
                <input 
                  type="text" 
                  value="Acme Corp Marketing"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                />
                <Button size="sm" className="mt-4">Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Plan & Billing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Plan:</span>
                  <Badge>Pro</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Renews on December 31, 2025</p>
                <Button variant="outline" size="sm" className="w-full">Manage Billing</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Shell>
  );
}
