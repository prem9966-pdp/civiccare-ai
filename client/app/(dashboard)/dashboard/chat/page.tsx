"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '@/components/dashboard/chat-message';
import { ChatInput } from '@/components/dashboard/chat-input';
import { SuggestedPrompts } from '@/components/dashboard/suggested-prompts';
import { EmergencyCard } from '@/components/dashboard/emergency-card';
import chatService from '@/services/chat.service';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { toast } from 'sonner';
import { 
  Bot, 
  MessageSquare, 
  Trash2, 
  History, 
  Sparkles, 
  ChevronRight, 
  Loader2, 
  Plus,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState<any[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchSessions = async () => {
        try {
            const response = await chatService.getSessions();
            if (response.success) setSessions(response.data);
        } catch (error) {
            console.error("Failed to load sessions", error);
        }
    };
    fetchSessions();
  }, [sessionId]);

  const handleSend = async (content: string) => {
    setIsLoading(true);
    
    // Add optimistic user message
    const tempMsg = { sender: "user", content, timestamp: new Date() };
    setMessages(prev => [...prev, tempMsg]);

    try {
      const response = await chatService.sendMessage(content, sessionId);
      if (response.success) {
        setMessages(response.data.session.messages);
        setSessionId(response.data.session._id);
      } else {
        toast.error(response.message || "Failed to get AI response");
      }
    } catch (error: any) {
      console.error("Chat failure", error);
      toast.error(error.response?.data?.message || "Connection to AI Counselor failed");
    } finally {
      setIsLoading(false);
    }
  };

  const loadSession = async (id: string) => {
    setIsLoading(true);
    try {
        const response = await chatService.getSessionById(id);
        if (response.success) {
            setMessages(response.data.messages);
            setSessionId(id);
        }
    } catch (error) {
        console.error("Session load failure", error);
        toast.error("Could not retrieve conversation history");
    } finally {
        setIsLoading(false);
    }
  };

  const showEmergency = messages.some(m => m.isEmergency);

  return (
    <ProtectedRoute>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-140px)]">
        {/* Sidebar: Chat History (3/12) */}
        <aside className="hidden lg:flex lg:col-span-3 flex-col space-y-6 animate-in slide-in-from-left-4 duration-700">
           <div className="flex items-center justify-between px-2">
               <h2 className="text-xl font-black text-primary tracking-tight flex items-center">
                   <History className="h-5 w-5 mr-3 text-accent" /> Archives
               </h2>
               <button onClick={() => { setMessages([]); setSessionId(undefined); }} className="h-8 w-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                   <PlusIcon className="h-4 w-4" />
               </button>
           </div>

           <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
               {sessions.map((s) => (
                   <button
                        key={s._id}
                        onClick={() => loadSession(s._id)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all group flex items-start justify-between ${
                            sessionId === s._id 
                                ? "bg-white border-primary shadow-xl ring-2 ring-primary/5" 
                                : "bg-slate-50 border-transparent hover:bg-white hover:border-slate-100 hover:shadow-md"
                        }`}
                   >
                       <div className="space-y-1 overflow-hidden">
                           <p className={`text-xs font-black truncate leading-tight ${sessionId === s._id ? "text-primary" : "text-slate-500"}`}>{s.title}</p>
                           <p className="text-[10px] font-bold text-slate-400 capitalize">{new Date(s.updatedAt).toLocaleDateString()}</p>
                       </div>
                       <ChevronRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${sessionId === s._id ? "text-primary" : "text-slate-200"}`} />
                   </button>
               ))}
           </div>

           <div className="p-6 bg-primary rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 h-32 w-32 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>
                <div className="relative z-10 space-y-4">
                    <Sparkles className="h-8 w-8 text-accent animate-pulse" />
                    <p className="text-sm font-black leading-tight tracking-tighter">Your AI Counselor is trained on official Indian gazettes.</p>
                </div>
           </div>
        </aside>

        {/* Main: Chat Window (9/12) */}
        <main className="lg:col-span-9 flex flex-col space-y-8 h-full">
            {/* Header Hub */}
            <div className="flex items-center justify-between px-4">
                <div className="flex items-center space-x-6">
                    <div className="h-14 w-14 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center justify-center relative ring-4 ring-primary/5 group transition-all">
                        <Bot className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                        <div className="absolute bottom-0 right-0 h-4 w-4 bg-emerald-500 rounded-full border-4 border-white animate-pulse shadow-sm"></div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-primary tracking-tighter leading-none">Counselor <span className="text-accent underline decoration-accent/20">GPT</span></h1>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1 animate-pulse">Online & Synchronized</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="h-11 w-11 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-red-500 transition-all hover:shadow-xl">
                        <Trash2 className="h-5 w-5" />
                    </button>
                    <button className="h-11 w-11 lg:hidden flex items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 text-primary transition-all hover:shadow-xl">
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-slate-50/50 rounded-[3rem] border border-slate-100/50 shadow-inner overflow-hidden relative flex flex-col p-4 sm:p-8">
                <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center space-y-12 animate-in fade-in duration-1000">
                           <div className="relative group">
                              <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full group-hover:bg-primary/20 transition-all scale-150"></div>
                              <Bot className="h-24 w-24 text-primary relative z-10" />
                           </div>
                           <div className="text-center space-y-2">
                                <h2 className="text-2xl font-black text-primary tracking-tight">Need assistance, citizen?</h2>
                                <p className="text-sm font-medium text-slate-500 max-w-sm mx-auto">Ask me about PM-JAY eligibility, health emergency procedures, or document linking in simple language.</p>
                           </div>
                           <SuggestedPrompts onSelect={handleSend} className="max-w-4xl w-full" />
                        </div>
                    ) : (
                        <>
                           {showEmergency && <div className="mb-10"><EmergencyCard /></div>}
                           {messages.map((m, i) => (
                             <ChatMessage key={i} message={m} />
                           ))}
                           {isLoading && (
                               <div className="flex items-center space-x-3 p-6 bg-white rounded-[2.5rem] shadow-xl w-fit border border-slate-50 animate-pulse">
                                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Consulting Indian Gazettes...</span>
                               </div>
                           )}
                           <div ref={messagesEndRef} />
                        </>
                    )}
                </div>

                {/* Input Hub */}
                <div className="mt-8 pt-4 border-t border-slate-100/50">
                    <ChatInput onSend={handleSend} isLoading={isLoading} />
                    <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest mt-4 opacity-60">CivicCare AI provides suggestions based on open legal data v1.0.2</p>
                </div>
            </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

function PlusIcon({ className }: any) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>;
}
