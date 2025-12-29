import * as React from "react";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Shield, Globe, Star, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for solo entrepreneurs beginning their growth journey.",
    features: [
      "Up to 500 leads/month",
      "Basic AI research",
      "LinkedIn & Twitter integration",
      "Email support",
      "Standard analytics"
    ],
    buttonText: "Start Free Trial",
    popular: false
  },
  {
    name: "Growth",
    price: "$79",
    description: "The sweet spot for growing teams needing more power.",
    features: [
      "Up to 2,500 leads/month",
      "Advanced AI personalization",
      "Unlimited social integrations",
      "Priority chat support",
      "Advanced performance insights",
      "Team collaboration"
    ],
    buttonText: "Get Started",
    popular: true
  },
  {
    name: "Scale",
    price: "$199",
    description: "Full-scale autonomous outreach for serious sales organizations.",
    features: [
      "Unlimited leads/month",
      "Custom AI model training",
      "API access",
      "Dedicated account manager",
      "Custom reporting",
      "SLA guarantee"
    ],
    buttonText: "Contact Sales",
    popular: false
  }
];

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  const handleSubscribe = (planName: string) => {
    setLoadingPlan(planName);
    // Simulate payment processing delay
    setTimeout(() => {
      setLoadingPlan(null);
      // In a real app, we'd redirect to Stripe/Paystack here
      // For the mockup, we'll just show success
      alert(`Simulating ${planName} checkout flow with Stripe & Paystack integration...`);
    }, 1500);
  };

  return (
    <Shell>
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scale your outreach with our autonomous AI agents. Choose the plan that fits your growth stage.
          </p>
          
          <div className="flex items-center justify-center gap-6 pt-6">
            <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-help" title="Integrated with Stripe">
              <span className="font-bold tracking-tighter text-xl">Stripe</span>
            </div>
            <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-help" title="Integrated with Paystack">
              <span className="font-bold tracking-tighter text-xl">Paystack</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={React.useMemo(() => {
                return plan.popular 
                  ? "relative border-primary shadow-2xl scale-105 z-10 bg-card/50 backdrop-blur-sm" 
                  : "border-border/50 shadow-xl bg-card/30 backdrop-blur-sm";
              }, [plan.popular])}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-heading">{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1 pt-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <CardDescription className="pt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full h-11" 
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={loadingPlan === plan.name}
                >
                  {loadingPlan === plan.name ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Connecting...
                    </div>
                  ) : (
                    <>
                      {plan.buttonText}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Security & Trust */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border/50 pt-16">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-bold">Secure Payments</h3>
            <p className="text-sm text-muted-foreground">Encryption via Stripe and Paystack ensure your data is always safe.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-bold">Global Coverage</h3>
            <p className="text-sm text-muted-foreground">Accepting 135+ currencies and local payment methods worldwide.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="font-bold">Money-back Guarantee</h3>
            <p className="text-sm text-muted-foreground">Not satisfied? Get a full refund within your first 14 days of scale.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}
