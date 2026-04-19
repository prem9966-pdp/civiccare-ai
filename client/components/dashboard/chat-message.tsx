import React from 'react';
import { cn } from "@/lib/utils";
import { Bot, User, Clock, AlertTriangle } from "lucide-react";
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "flex w-full space-x-6 p-6 rounded-[2.5rem] transition-all relative overflow-hidden group mb-4",
        isAI ? "bg-white shadow-xl border border-slate-100" : "bg-primary/5 border border-primary/10 ml-auto max-w-[85%] rounded-br-none"
      )}
    >
        {isAI && <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>}
        
        <div className={cn(
            "h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg transition-transform group-hover:rotate-6",
            isAI ? "bg-primary text-white" : "bg-white text-primary border border-primary/20"
        )}>
            {isAI ? <Bot className="h-7 w-7" /> : <User className="h-7 w-7" />}
        </div>

        <div className="space-y-4 flex-1 overflow-hidden">
            <div className="flex items-center justify-between">
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${isAI ? "text-primary/60" : "text-slate-400 opacity-60"}`}>
                    {isAI ? "CivicCare Intelligence (GPT-4)" : "Verified Citizen"}
                </p>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-300">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>

            {message.isEmergency && (
                <div className="flex items-center space-x-3 p-5 bg-red-50 border border-red-100 rounded-2xl text-red-600 animate-pulse">
                    <AlertTriangle className="h-5 w-5 fill-red-600 text-white" />
                    <span className="text-xs font-black uppercase tracking-widest leading-none">Emergency Protocol Engaged</span>
                </div>
            )}

            <div className={cn(
                "text-sm leading-relaxed font-medium prose prose-slate prose-invert-none max-w-none",
                isAI ? "text-slate-600" : "text-primary italic"
            )}>
                {isAI ? (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    className="markdown-content"
                    components={{
                      h3: ({...props}) => <h3 className="text-lg font-black text-primary mt-6 mb-3 tracking-tight border-l-4 border-accent pl-3" {...props} />,
                      ul: ({...props}) => <ul className="list-disc pl-5 space-y-2 my-4 text-slate-500 font-semibold" {...props} />,
                      p: ({...props}) => <p className="mb-4 last:mb-0" {...props} />,
                      li: ({...props}) => <li className="marker:text-primary" {...props} />,
                      strong: ({...props}) => <strong className="font-black text-primary bg-primary/5 px-1 rounded-sm" {...props} />,
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  <p>{message.content}</p>
                )}
            </div>

            {isAI && (
                <div className="pt-4 flex items-center space-x-6 border-t border-slate-50">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Counselor v.2.1</span>
                    <div className="ml-auto flex items-center space-x-4">
                      <button className="text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-widest transition-colors">Helpful</button>
                      <button className="text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors">Incorrect</button>
                    </div>
                </div>
            )}
        </div>
    </motion.div>
  );
}
