"use client"

import React, { useState } from 'react';
import { Send, Loader2, Sparkles, Plus, Mic, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

export function ChatInput({ onSend, isLoading = false }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="relative p-2 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 group-focus-within:border-primary/20 transition-all duration-500 max-w-4xl mx-auto w-full group animate-in slide-in-from-bottom-4">
      <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] blur-2xl group-focus-within:bg-primary/10 transition-colors pointer-events-none"></div>
      
      <form onSubmit={handleSubmit} className="relative flex items-center space-x-2">
        <label className="h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:text-primary hover:bg-slate-100 transition-all cursor-pointer shadow-inner">
            <Plus className="h-5 w-5" />
            <input type="file" className="hidden" />
        </label>

        <Input 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your situation... e.g. 'I need help with medical expenses'" 
          className="flex-1 h-14 border-none shadow-none text-sm font-bold text-primary placeholder:text-slate-300 placeholder:font-medium focus:ring-0 px-4 bg-transparent"
        />

        <div className="flex items-center space-x-2 pr-2">
            {!message && (
                <button type="button" className="h-10 w-10 flex items-center justify-center rounded-full text-slate-300 hover:text-primary transition-colors">
                    <Mic className="h-5 w-5" />
                </button>
            )}
            
            <button 
                type={message ? "submit" : "button"}
                disabled={isLoading || !message.trim()}
                className={cn(
                    "h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl",
                    message.trim() ? "bg-primary text-white scale-105 shadow-primary/20" : "bg-slate-100 text-slate-300"
                )}
            >
                {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <Send className={cn("h-5 w-5", message && "translate-x-0.5 -translate-y-0.5")} />
                )}
            </button>
        </div>
      </form>
    </div>
  );
}
