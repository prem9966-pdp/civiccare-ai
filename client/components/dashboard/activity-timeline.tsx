import React from 'react';
import { 
  MessageSquare, 
  Sparkles, 
  FileText, 
  Upload, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TimelineItem {
  _id: string;
  type: 'chat' | 'recommendation' | 'letter' | 'document';
  title: string;
  date: string | Date;
  meta: any;
}

const typeConfig: any = {
  chat: { icon: MessageSquare, color: 'text-primary', bg: 'bg-primary/5' },
  recommendation: { icon: Sparkles, color: 'text-accent', bg: 'bg-accent/5' },
  letter: { icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
  document: { icon: Upload, color: 'text-emerald-500', bg: 'bg-emerald-50' },
};

export function ActivityTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
      {items.map((item, index) => {
        const config = typeConfig[item.type];
        return (
          <motion.div 
            key={item._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative flex items-start space-x-12 group"
          >
            {/* Dot & Line Connection */}
            <div className="relative flex items-center justify-center shrink-0">
                <div className={cn(
                    "absolute h-10 w-10 rounded-full blur-xl opacity-20 transition-all group-hover:opacity-60",
                    config.bg.replace('/5', '/20')
                )}></div>
                <div className={cn(
                    "h-10 w-10 rounded-2xl flex items-center justify-center relative z-10 transition-transform group-hover:scale-110",
                    config.bg, config.color
                )}>
                    <config.icon className="h-5 w-5" />
                </div>
            </div>

            {/* Content Card */}
            <div className="flex-1 bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-slate-100 transition-all duration-500 group-hover:-translate-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                             <p className={cn("text-[9px] font-black uppercase tracking-widest", config.color)}>{item.type}</p>
                             <div className="h-1 w-1 rounded-full bg-slate-200"></div>
                             <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                                {new Date(item.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                             </p>
                        </div>
                        <h3 className="text-xl font-black text-primary tracking-tighter leading-tight">{item.title}</h3>
                    </div>
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-300">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center space-x-4">
                        {item.type === 'recommendation' && (
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                                <CheckCircle2 className="h-3 w-3 mr-1 text-accent" /> {item.meta.matches} Matches
                            </span>
                        )}
                        {item.type === 'chat' && (
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1 text-primary" /> {item.meta.messages} Messages
                            </span>
                        )}
                    </div>
                    <button className="h-8 w-8 rounded-lg bg-slate-50 text-slate-300 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
          </motion.div>
        );
      })}

      {items.length === 0 && (
          <div className="py-24 text-center space-y-4">
               <Clock className="h-12 w-12 text-slate-100 mx-auto" />
               <p className="text-sm font-bold text-slate-400">No recent activity on your timeline.</p>
          </div>
      )}
    </div>
  );
}
