import React from 'react';
import { Bell, Info, CheckCircle2, AlertTriangle, AlertCircle, X, Check, Archive } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationListProps {
  notifications: any[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}

const typeConfig: any = {
  info: { icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' },
  success: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  warning: { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
  alert: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
};

export function NotificationList({ notifications, onMarkRead, onMarkAllRead }: NotificationListProps) {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-full">
      <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-primary/5">
          <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-xl border border-primary/10">
                  <Bell className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black text-primary tracking-tighter">Citizen <span className="text-accent underline decoration-accent/20 tracking-tighter">Alerts</span></h3>
          </div>
          <button 
            disabled={notifications.filter(n => !n.isRead).length === 0}
            onClick={onMarkAllRead} 
            className="flex items-center space-x-2 text-[10px] font-black uppercase text-slate-400 hover:text-primary transition-all tracking-widest"
          >
              <Archive className="h-4 w-4" />
              <span>Bulk Resolve</span>
          </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          <AnimatePresence>
            {notifications.map((n, i) => {
              const config = typeConfig[n.type] || typeConfig.info;
              return (
                <motion.div
                  key={n._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => !n.isRead && onMarkRead(n._id)}
                  className={cn(
                    "p-6 rounded-[2rem] border transition-all cursor-pointer group relative overflow-hidden",
                    !n.isRead ? "bg-white border-primary/20 shadow-xl ring-2 ring-primary/5" : "bg-slate-50/50 border-transparent hover:bg-white hover:border-slate-100 opacity-60"
                  )}
                >
                   {!n.isRead && <div className="absolute top-0 right-0 h-10 w-10 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>}
                   
                   <div className="flex items-start space-x-6">
                       <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner", config.bg, config.color)}>
                           <config.icon className="h-6 w-6" />
                       </div>
                       
                       <div className="flex-1 space-y-2">
                           <div className="flex items-center justify-between">
                               <h4 className={cn("text-base font-black leading-tight tracking-tight", !n.isRead ? "text-primary" : "text-slate-500")}>{n.title}</h4>
                               <p className="text-[10px] font-bold text-slate-300 uppercase shrink-0">
                                   {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                               </p>
                           </div>
                           <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-sm">{n.message}</p>
                       </div>

                       {!n.isRead && (
                           <button className="h-8 w-8 rounded-full bg-primary/5 text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Check className="h-4 w-4" />
                           </button>
                       )}
                   </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {notifications.length === 0 && (
              <div className="py-24 text-center space-y-6 animate-in fade-in duration-1000">
                   <div className="h-24 w-24 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-200">
                      <Bell className="h-10 w-10" />
                   </div>
                   <p className="text-sm font-black uppercase tracking-widest text-slate-300">No active alerts at this time.</p>
              </div>
          )}
      </div>
    </div>
  );
}
