"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  MapPin,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardsProps {
  stats: {
    total: number;
    pending: number;
    resolved: number;
    hospitals: number;
  };
  isLoading?: boolean;
}

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Grievances",
      value: stats.total,
      icon: FileText,
      color: "from-blue-500/20 to-indigo-500/20",
      iconColor: "text-blue-600",
      trend: "+2 this week",
      label: "Total submissions"
    },
    {
      title: "Pending Reviews",
      value: stats.pending,
      icon: Clock,
      color: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-600",
      trend: "Action required",
      label: "Awaiting response"
    },
    {
      title: "Resolved Cases",
      value: stats.resolved,
      icon: CheckCircle2,
      color: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-600",
      trend: "85% success rate",
      label: "Completed actions"
    },
    {
      title: "Nearby Hospitals",
      value: stats.hospitals,
      icon: MapPin,
      color: "from-rose-500/20 to-pink-500/20",
      iconColor: "text-rose-600",
      trend: "Within 5km",
      label: "Available facilities"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="relative overflow-hidden border-none bg-white/50 backdrop-blur-xl shadow-sm hover:shadow-xl transition-all duration-500 group">
            {/* Background Gradient Blob */}
            <div className={cn(
              "absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity bg-gradient-to-br",
              card.color
            )} />
            
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className={cn(
                  "p-3 rounded-2xl bg-white shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-500",
                  card.iconColor
                )}>
                  <card.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center space-x-1 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-lg">
                  <TrendingUp className="h-3 w-3" />
                  <span>Live</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-500">{card.title}</p>
                <div className="flex items-baseline space-x-2">
                  <h3 className="text-3xl font-black text-primary tracking-tight">
                    {isLoading ? "..." : card.value}
                  </h3>
                </div>
                <div className="flex items-center justify-between pt-2">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{card.label}</p>
                   <p className={cn("text-[10px] font-black px-2 py-0.5 rounded-full", 
                    card.iconColor.replace('text-', 'bg-').replace('600', '50')
                   )}>
                    {card.trend}
                   </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
