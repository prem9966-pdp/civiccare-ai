"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Map, 
  FileText,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';

export function QuickActions() {
  const actions = [
    {
      title: "Explore Schemes",
      description: "Find matching government benefits.",
      icon: Sparkles,
      href: "/dashboard/schemes",
      color: "bg-emerald-500",
      iconColor: "text-white",
      badge: "Smart Match",
      theme: "from-emerald-600 to-teal-700"
    },
    {
      title: "Healthcare Map",
      description: "Locate and navigate to nearest hospitals.",
      icon: Map,
      href: "/dashboard/help-centers",
      color: "bg-rose-500",
      iconColor: "text-white",
      badge: "Real-time",
      theme: "from-rose-600 to-pink-700"
    },
    {
        title: "My Grievances",
        description: "Track status of submitted reports.",
        icon: FileText,
        href: "/dashboard/history",
        color: "bg-amber-500",
        iconColor: "text-white",
        badge: "Status Update",
        theme: "from-amber-600 to-orange-700"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {actions.map((action, index) => (
        <motion.div
          key={action.title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <Card className="relative overflow-hidden border-none bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 group h-full">
            <CardContent className="p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-3xl ${action.color} shadow-lg shadow-${action.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 bg-slate-50 px-3 py-1.5 rounded-full">
                    {action.badge}
                  </span>
                </div>
                
                <h3 className="text-2xl font-black text-primary tracking-tight mb-2 group-hover:text-accent transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8">
                  {action.description}
                </p>
              </div>

              <div className="mt-auto">
                 <Link href={action.href} className="w-full">
                    <Button variant="ghost" className="w-full justify-between rounded-2xl group/btn h-12 px-6 font-bold bg-slate-50 hover:bg-primary hover:text-white transition-all duration-300">
                        Continue to Action
                        <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                 </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
