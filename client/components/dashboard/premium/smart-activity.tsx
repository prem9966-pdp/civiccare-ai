"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Map, 
  Search, 
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: 'grievance' | 'scheme' | 'hospital' | 'system';
  title: string;
  status: string;
  date: string;
  description: string;
}

interface SmartActivityProps {
  activities: ActivityItem[];
  isLoading?: boolean;
}

const typeConfigs: any = {
  grievance: {
    icon: FileText,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  scheme: {
    icon: Sparkles,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  hospital: {
    icon: Map,
    color: "text-rose-600",
    bg: "bg-rose-50"
  },
  system: {
    icon: AlertCircle,
    color: "text-amber-600",
    bg: "bg-amber-50"
  }
};

export function SmartActivity({ activities, isLoading }: SmartActivityProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-white/50 backdrop-blur-xl rounded-[2rem] animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
        <Card className="rounded-[2.5rem] bg-white/50 border-none backdrop-blur-xl shadow-none py-16 text-center">
             <Clock className="h-12 w-12 text-slate-200 mx-auto mb-4" />
             <p className="text-sm font-bold text-slate-400">No recent activity detected.</p>
        </Card>
    );
  }

  return (
    <div className="space-y-6">
      {activities.map((activity, index) => {
        const config = typeConfigs[activity.type] || typeConfigs.system;
        const Icon = config.icon;

        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group relative overflow-hidden border-none bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer">
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center gap-6">
                  <div className={cn(
                    "h-16 w-16 rounded-[1.5rem] flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-500",
                    config.bg, config.color
                  )}>
                    <Icon className="h-8 w-8" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                         <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full", config.bg, config.color)}>
                            {activity.type}
                         </span>
                         <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">
                           {new Date(activity.date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                         </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                         <CheckCircle2 className="h-3 w-3" />
                         <span>{activity.status}</span>
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-black text-primary tracking-tight truncate group-hover:text-accent transition-colors">
                      {activity.title}
                    </h4>
                    <p className="text-xs font-medium text-slate-500 truncate mt-0.5">
                      {activity.description}
                    </p>
                  </div>
                  
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-300 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:translate-x-1 duration-300">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
