import React from 'react';
import { CheckCircle2, Circle, AlertCircle, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChecklistItem {
  name: string;
  isUploaded: boolean;
  status: string;
}

interface ChecklistProgressProps {
  items: ChecklistItem[];
  completionRate: number;
  schemeTitle?: string;
}

export function ChecklistProgress({ items, completionRate, schemeTitle }: ChecklistProgressProps) {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden animate-in fade-in duration-700">
      <div className="bg-primary p-8 text-white">
        <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60">Readiness Audit</p>
                <h3 className="text-xl font-black truncate max-w-[200px]">{schemeTitle || "General Readiness"}</h3>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <span className="text-xl font-black">{completionRate}%</span>
            </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
                className="h-full bg-accent transition-all duration-1000" 
                style={{ width: `${completionRate}%` }}
            ></div>
        </div>
      </div>

      <div className="p-8 space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between group">
            <div className="flex items-center space-x-4">
               {item.isUploaded ? (
                 <CheckCircle2 className="h-5 w-5 text-emerald-500" />
               ) : (
                 <Circle className="h-5 w-5 text-slate-200" />
               )}
               <span className={cn(
                 "text-sm font-bold transition-colors",
                 item.isUploaded ? "text-primary" : "text-slate-400"
               )}>
                 {item.name}
               </span>
            </div>
            {!item.isUploaded && (
               <div className="flex items-center space-x-1 text-[10px] font-black text-amber-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  <AlertCircle className="h-3 w-3" />
                  <span>Required</span>
               </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="px-8 py-6 bg-slate-50 border-t flex items-center justify-center text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {completionRate === 100 ? "Ready to apply via portal" : "Upload missing documents below"}
          </p>
      </div>
    </div>
  );
}
