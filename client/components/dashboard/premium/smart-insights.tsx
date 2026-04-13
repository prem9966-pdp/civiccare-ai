"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  MapPin,
  CheckCircle2,
  ArrowRight,
  Target
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from 'next/link';

interface Insight {
  id: string;
  type: 'info' | 'success' | 'warning' | 'urgent';
  title: string;
  message: string;
  action?: {
    label: string;
    href: string;
  };
  icon: any;
}

interface SmartInsightsProps {
  insights: Insight[];
}

export function SmartInsights({ insights }: SmartInsightsProps) {
  if (insights.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {insights.map((insight, index) => (
        <motion.div
           key={insight.id}
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: index * 0.15 }}
        >
           <Card className={cn(
             "relative overflow-hidden border-none rounded-[2.5rem] bg-indigo-50/30 backdrop-blur-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] group",
             insight.type === 'success' && "bg-emerald-50/30",
             insight.type === 'warning' && "bg-amber-50/30",
             insight.type === 'urgent' && "bg-rose-50/30"
           )}>
             {/* Gradient Background Blobs */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] animate-pulse"></div>
             <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 blur-[80px]"></div>

             <CardContent className="p-10 relative z-10 flex items-start gap-8">
               <div className={cn(
                 "h-16 w-16 min-w-16 rounded-3xl flex items-center justify-center shrink-0 shadow-lg group-hover:rotate-12 transition-transform duration-500",
                 insight.type === 'info' && "bg-indigo-600 text-white",
                 insight.type === 'success' && "bg-emerald-600 text-white",
                 insight.type === 'warning' && "bg-amber-600 text-white",
                 insight.type === 'urgent' && "bg-rose-600 text-white"
               )}>
                 <insight.icon className="h-8 w-8" />
               </div>

               <div className="flex-1 space-y-4">
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white/50 px-3 py-1 rounded-full shadow-sm">
                        AI Personalized Insight
                    </span>
                 </div>
                 <h3 className="text-2xl font-black text-primary tracking-tight leading-none group-hover:text-accent transition-colors">
                    {insight.title}
                 </h3>
                 <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-sm">
                    {insight.message}
                 </p>
                 
                 {insight.action && (
                    <div className="pt-4 flex items-center gap-4">
                       <Link href={insight.action.href}>
                          <button className="flex items-center gap-3 text-sm font-black text-primary hover:text-accent transition-all group/btn">
                             {insight.action.label}
                             <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all">
                                <ArrowRight className="h-4 w-4" />
                             </div>
                          </button>
                       </Link>
                    </div>
                 )}
               </div>
               
               <div className="flex flex-col items-center justify-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-200 group-hover:bg-primary animate-bounce"></div>
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-200 group-hover:bg-primary"></div>
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-200 group-hover:bg-primary"></div>
               </div>
             </CardContent>
           </Card>
        </motion.div>
      ))}
    </div>
  );
}
