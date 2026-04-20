"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ShieldCheck, 
  Search, 
  MapPin, 
  MessageSquare, 
  Globe, 
  Sparkles,
  ChevronRight,
  Landmark
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';

const features = [
  {
    title: "AI Counselor",
    description: "24/7 intelligent support for all your civic and healthcare queries. Get instant answers to complex government procedures.",
    icon: MessageSquare,
    color: "bg-blue-500/10 text-blue-600",
    href: "/dashboard/chat"
  },
  {
    title: "Scheme Finder",
    description: "Discover government schemes tailored to your profile and eligibility. Never miss out on benefits you deserve.",
    icon: Search,
    color: "bg-emerald-500/10 text-emerald-600",
    href: "/dashboard/schemes"
  },
  {
    title: "Help Centers",
    description: "Interactive map to find hospitals, clinics, and government offices near you. Real-time availability and directions.",
    icon: MapPin,
    color: "bg-orange-500/10 text-orange-600",
    href: "/dashboard/help-centers"
  },
  {
    title: "Grievance Support",
    description: "Easy tracking and filing of civic grievances with AI-guided assistance. We help you navigate the bureaucracy.",
    icon: ShieldCheck,
    color: "bg-purple-500/10 text-purple-600",
    href: "/grievances/submit"
  }
];

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 flex items-center overflow-hidden">
        {/* Animated Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] -z-10 group">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse items-center"></div>
            <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-xs font-black uppercase tracking-widest border border-accent/20 animate-bounce">
              <Sparkles className="h-4 w-4 mr-2" />
              Revolutionizing Civic Engagement
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-primary leading-[1.1] tracking-tight">
              Empowering Every <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Citizen</span> with AI.
            </h1>
            
            <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-xl">
              CivicCare AI is your all-in-one assistant for government schemes, healthcare support, and civic grievances. Simplified, accessible, and inclusive for everyone.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Button size="lg" asChild className="rounded-2xl h-16 px-10 text-lg bg-primary hover:bg-slate-800 shadow-2xl shadow-primary/30 group">
                <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
                  {isAuthenticated ? "Go to Dashboard" : "Get Started Now"}
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="rounded-2xl h-16 px-10 text-lg border-2 hover:bg-slate-50">
                <Link href="#services">Explore Features</Link>
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-8">
                <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="User" className="rounded-full" />
                        </div>
                    ))}
                </div>
                <div className="text-sm font-bold text-muted-foreground">
                    <span className="text-primary">2,500+</span> citizens already joined
                </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(15,23,42,0.3)] border-8 border-white">
              <Image 
                src="/hero.png" 
                alt="CivicCare AI Interface" 
                width={800} 
                height={600} 
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating Element 1 */}
            <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-10 -right-10 z-20 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 hidden md:block"
            >
                <div className="flex items-center space-x-4">
                    <div className="bg-emerald-500 p-3 rounded-2xl">
                        <ShieldCheck className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase text-slate-400">Status</p>
                        <p className="text-sm font-bold text-primary">Benefits Verified</p>
                    </div>
                </div>
            </motion.div>
            
            {/* Floating Element 2 */}
            <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-10 -left-10 z-20 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 hidden md:block"
            >
                <div className="flex items-center space-x-4">
                    <div className="bg-blue-500 p-3 rounded-2xl">
                        <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase text-slate-400">Available In</p>
                        <p className="text-sm font-bold text-primary">12+ Languages</p>
                    </div>
                </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                {[
                    { label: "Schemes Managed", value: "500+" },
                    { label: "Districts Covered", value: "450+" },
                    { label: "Success Rate", value: "98%" },
                    { label: "Community Support", value: "24/7" }
                ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                        <h3 className="text-4xl lg:text-5xl font-black text-white">{stat.value}</h3>
                        <p className="text-blue-200/60 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-accent">Feature Highlights</h2>
            <h3 className="text-4xl lg:text-5xl font-black text-primary">Everything you need to navigate civic life.</h3>
            <p className="text-lg text-muted-foreground font-medium">
              We've built a suite of tools designed to make interacting with government systems and healthcare providers as smooth as possible.
            </p>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, i) => (
              <motion.div variants={item} key={i}>
                <Card className="p-8 rounded-[2rem] border-none shadow-xl hover:shadow-2xl transition-all duration-500 h-full group hover:-translate-y-2 bg-white">
                  <div className={`h-16 w-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-black text-primary mb-3">{feature.title}</h4>
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    {feature.description}
                  </p>
                  <Link href={feature.href} className="inline-flex items-center text-sm font-black text-accent mt-6 group-hover:translate-x-2 transition-transform">
                    Learn More <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
            <div className="bg-accent rounded-[3.5rem] p-12 lg:p-24 relative overflow-hidden shadow-2xl">
                {/* Abstract Shapes */}
                <div className="absolute top-0 right-0 h-64 w-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 h-48 w-48 bg-black/10 rounded-full blur-2xl -ml-24 -mb-24"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center space-y-10">
                    <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md">
                        <Landmark className="h-12 w-12 text-white" />
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-black text-white max-w-4xl leading-tight">
                        Ready to simplify your <span className="text-primary italic">civic experience?</span>
                    </h2>
                    <p className="text-xl text-white/80 font-bold max-w-2xl">
                        Join thousands of citizens who are already using CivicCare AI to secure their future and health.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <Button size="lg" asChild className="rounded-2xl h-16 px-12 text-lg bg-primary text-white hover:bg-slate-900 shadow-2xl font-black tracking-tight border-none">
                            <Link href="/signup">Create Free Account</Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild className="rounded-2xl h-16 px-12 text-lg border-2 border-white text-white hover:bg-white hover:text-accent backdrop-blur-md font-black tracking-tight transition-all">
                            <Link href="/login">Sign In</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
