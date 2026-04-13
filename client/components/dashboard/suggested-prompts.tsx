import React from 'react';
import { MessageSquare, Heart, ShieldCheck, Landmark } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
  className?: string;
}

const prompts = [
  { icon: Heart, label: "Medical Aid", text: "How can I apply for Ayushman Bharat?" },
  { icon: Landmark, label: "Farmer Support", text: "Check status of my PM-Kisan account" },
  { icon: ShieldCheck, label: "Security", text: "What documents are needed for ID link?" },
  { icon: MessageSquare, label: "General", text: "Explain PMJDY benefits simply" },
];

export function SuggestedPrompts({ onSelect, className }: SuggestedPromptsProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {prompts.map((p) => (
        <button
          key={p.label}
          onClick={() => onSelect(p.text)}
          className="flex items-start space-x-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/20 hover:scale-105 transition-all duration-300 text-left group"
        >
          <div className="bg-primary/5 p-3 rounded-xl group-hover:bg-primary transition-colors duration-300">
             <p.icon className="h-4 w-4 text-primary group-hover:text-white" />
          </div>
          <div className="space-y-1">
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">{p.label}</p>
             <p className="text-xs font-bold text-slate-600 line-clamp-2 leading-relaxed">{p.text}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
