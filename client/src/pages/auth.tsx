import * as React from "react";
import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Mail, Lock, ArrowRight, Github } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, InsertUser } from "@shared/schema";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const form = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  React.useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  const onSubmit = (data: InsertUser) => {
    if (isLogin) {
      loginMutation.mutate(data);
    } else {
      registerMutation.mutate(data);
    }
  };

  const isLoading = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <Card className="w-full max-w-md border-border/50 shadow-2xl backdrop-blur-sm bg-card/80">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
              <Bot className="w-7 h-7" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">
            {isLogin ? "Welcome back" : "Create an account"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {isLogin
              ? "Enter your credentials to access your leads dashboard"
              : "Start your journey with Lead Autonomy Engine."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username (Email)</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="name@company.com"
                  {...form.register("username")}
                  required
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {isLogin && (
                  <button type="button" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  {...form.register("password")}
                  required
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-11 text-base font-medium" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {isLogin ? "Sign In" : "Get Started"}
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Button variant="outline" className="w-full bg-background/50" disabled>
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-medium hover:underline"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </div>
          <p className="text-xs text-center text-muted-foreground px-8">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">Privacy Policy</a>.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
