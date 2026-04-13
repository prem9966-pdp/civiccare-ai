import React from 'react';
import { Users, BookOpen, Activity, MessageSquareWarning, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AdminStatsProps {
  stats: any;
}

export function AdminStats({ stats }: AdminStatsProps) {
  const items = [
    { 
        icon: Users, 
        label: "Total Citizens", 
        value: stats.totalUsers || 0, 
        trend: stats.trends?.users || 0,
        color: 'text-primary',
        bg: 'bg-primary/5'
    },
    { 
        icon: BookOpen, 
        label: "Schemes Active", 
        value: stats.totalSchemes || 0, 
        trend: stats.trends?.schemes || 0,
        color: 'text-accent',
        bg: 'bg-accent/5'
    },
    { 
        icon: Activity, 
        label: "Hospitals Map", 
        value: stats.totalHospitals || 0, 
        trend: stats.trends?.hospitals || 0,
        color: 'text-emerald-500',
        bg: 'bg-emerald-50'
    },
    { 
        icon: MessageSquareWarning, 
        label: "Open Complaints", 
        value: stats.totalComplaints || 0, 
        trend: stats.trends?.complaints || 0,
        color: 'text-red-500',
        bg: 'bg-red-50'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-slate-100 transition-all group overflow-hidden relative"
        >
           <div className="absolute top-0 right-0 h-24 w-24 bg-slate-50 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:scale-125 transition-transform duration-1000"></div>
           
           <div className="flex items-center justify-between mb-8 relative z-10">
               <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform", item.bg, item.color)}>
                   <item.icon className="h-7 w-7" />
               </div>
               <div className={cn(
                   "flex items-center space-x-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                   item.trend >= 0 ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-500"
               )}>
                   {item.trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                   <span>{item.trend >= 0 ? '+' : ''}{item.trend}%</span>
               </div>
           </div>

           <div className="space-y-1 relative z-10">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 opacity-60">{item.label}</p>
               <h3 className="text-4xl font-black text-primary tracking-tighter tabular-nums">{item.value.toLocaleString()}</h3>
           </div>
        </motion.div>
      ))}
    </div>
  );
}
