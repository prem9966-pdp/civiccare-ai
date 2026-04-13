import React from 'react';
import { cn } from "@/lib/utils";
import { Bot, User, Clock, AlertTriangle } from "lucide-react";
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: {
    sender: "user" | "ai";
    content: string;
    timestamp: string | Date;
    isEmergency?: boolean;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.sender === "ai";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "flex w-full space-x-4 p-6 rounded-[2.5rem] transition-all relative overflow-hidden group",
        isAI ? "bg-white shadow-xl border border-slate-100" : "bg-primary/5 border border-primary/10 ml-auto max-w-[85%] rounded-br-none"
      )}
    >
        {isAI && <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>}
        
        <div className={cn(
            "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg transition-transform group-hover:scale-110",
            isAI ? "bg-primary text-white" : "bg-white text-primary border border-primary/20"
        )}>
            {isAI ? <Bot className="h-6 w-6" /> : <User className="h-6 w-6" />}
        </div>

        <div className="space-y-3 flex-1">
            <div className="flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 opacity-60">
                    {isAI ? "CivicCare AI Counselor" : "Citizen Request"}
                </p>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-300">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>

            {message.isEmergency && (
                <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 animate-pulse">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="text-xs font-black uppercase tracking-widest leading-none">Emergency Context Detected</span>
                </div>
            )}

            <div className={cn(
                "text-sm leading-relaxed font-medium",
                isAI ? "text-slate-600" : "text-primary italic"
            )}>
                {message.content}
            </div>

            {isAI && (
                <div className="pt-4 flex items-center space-x-6 border-t border-slate-50">
                    <button className="text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-widest transition-colors">Helpful?</button>
                    <button className="text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors">Incorrect?</button>
                    <button className="text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-widest transition-colors ml-auto">Share Transcript</button>
                </div>
            )}
        </div>
    </motion.div>
  );
}
