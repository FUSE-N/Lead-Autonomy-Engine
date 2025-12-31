import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Bot, Zap, Shield, BarChart3, ArrowRight, MessageSquare, Target, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                            <Bot className="w-5 h-5" />
                        </div>
                        <span className="font-heading font-bold text-xl tracking-tight">LeadAutonomy</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                        <a href="#features" className="hover:text-primary transition-colors">Features</a>
                        <a href="#solutions" className="hover:text-primary transition-colors">Solutions</a>
                        <a href="/pricing" className="hover:text-primary transition-colors">Pricing</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/auth">
                            <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
                        </Link>
                        <Link href="/auth?signup=true">
                            <Button className="shadow-lg shadow-primary/20">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-4">
                {/* Abstract shapes */}
                <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-multiply transition-all animate-pulse" />
                <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] transition-all" />

                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                            AI-Powered Lead Generation
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight text-foreground leading-[1.1]">
                            Automate Your Outreach <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                                With Autonomous AI.
                            </span>
                        </h1>
                        <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Research audiences, draft conversion-focused content, and launch outreach campaigns
                            autonomously. Scale your pipeline without lifting a finger.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    >
                        <Link href="/auth">
                            <Button size="lg" className="h-14 px-8 text-lg shadow-xl shadow-primary/20 w-full sm:w-auto">
                                Start My Mission Today
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full sm:w-auto backdrop-blur-sm border-border/60">
                            Watch Demo
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
                    >
                        <div className="flex items-center justify-center font-bold text-xl uppercase tracking-tighter">Acme Corp</div>
                        <div className="flex items-center justify-center font-bold text-xl uppercase tracking-tighter">Global Tech</div>
                        <div className="flex items-center justify-center font-bold text-xl uppercase tracking-tighter">Horizon AI</div>
                        <div className="flex items-center justify-center font-bold text-xl uppercase tracking-tighter">Nebula</div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-accent/30 relative border-y border-border/40">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading">Powerful Autonomy</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to scale your outreach engine without the manual heavy lifting.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Zap className="w-6 h-6 text-yellow-500" />}
                            title="Instant Research"
                            description="Our AI agent researches your target audience and finds decision-makers in seconds."
                        />
                        <FeatureCard
                            icon={<MessageSquare className="w-6 h-6 text-primary" />}
                            title="Smart Content"
                            description="Automatically draft conversion-ready outreach copy tailored to each prospect's needs."
                        />
                        <FeatureCard
                            icon={<Shield className="w-6 h-6 text-green-500" />}
                            title="Safe Delivery"
                            description="Intelligent delivery rhythms to ensure high deliverability and account safety."
                        />
                        <FeatureCard
                            icon={<BarChart3 className="w-6 h-6 text-blue-500" />}
                            title="Predictive Analytics"
                            description="Get insights on what's working and automatically optimize your mission parameters."
                        />
                        <FeatureCard
                            icon={<Target className="w-6 h-6 text-destructive" />}
                            title="Precise Targeting"
                            description="Define your ICP and let the agent filter through millions to find the perfect leads."
                        />
                        <FeatureCard
                            icon={<Users className="w-6 h-6 text-orange-500" />}
                            title="Team Autonomy"
                            description="Collaborate with your team while agents handle individual outreach missions."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-border/40">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-2">
                        <Bot className="w-6 h-6 text-primary" />
                        <span className="font-heading font-bold text-lg">LeadAutonomy</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        © 2025 Lead Autonomy Engine. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-muted-foreground">
                        <a href="#" className="hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all group hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-background border border-border/50 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 font-heading tracking-tight">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
    );
}
