"use client"

import React, { useState, useEffect } from 'react';
import { LetterForm } from '@/components/dashboard/letter-form';
import { LetterPreview } from '@/components/dashboard/letter-preview';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { History, FilePlus2, Sparkles, Layout, ArrowRight, Printer, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import letterService from '@/services/letter.service';

export default function LettersPage() {
  const [activeDraft, setActiveDraft] = useState<any>(null);
  const [letters, setLetters] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await letterService.getAll();
      if (response.success) setLetters(response.data);
    } catch (error) {
        console.error("Failed to load advocacy records", error);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ProtectedRoute>
      <div className="space-y-12 pb-24 h-full">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between px-2 gap-8">
            <div className="space-y-3">
               <h1 className="text-5xl font-black text-primary tracking-tighter">
                  Advocacy <span className="text-accent underline decoration-accent/20 tracking-tighter">Letters</span>
               </h1>
               <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
                  Generate formal complaints, applications, and legal appeals with AI-backed accuracy and formal municipal styling.
               </p>
            </div>
            <div className="flex items-center space-x-6 bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100/50 hover:shadow-2xl transition-all group border-b-4 border-b-primary/10">
                <div className="h-14 w-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                   <Sparkles className="h-7 w-7" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Draft Agent Active</p>
                   <p className="text-xl font-black text-primary mt-1 tracking-tighter">Certified Formal Drafting</p>
                </div>
            </div>
        </section>

        {/* Content Tabs (Mock) */}
        <div className="flex items-center space-x-4 border-b border-slate-100 overflow-x-auto pb-4 custom-scrollbar">
            <button className="px-8 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 flex items-center shrink-0">
               <FilePlus2 className="h-4 w-4 mr-2" /> New Advocacy
            </button>
            <button className="px-8 py-3 bg-white text-slate-400 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 shrink-0">
               <History className="h-4 w-4 mr-2" /> Historical Records
            </button>
            <button className="px-8 py-3 bg-white text-slate-400 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 shrink-0">
               <Layout className="h-4 w-4 mr-2" /> Templates Hub
            </button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Input/Form (5/12) */}
            <div className="lg:col-span-5 h-[calc(100vh-280px)] overflow-y-auto pr-2 custom-scrollbar pb-12">
                <LetterForm onDraftCreated={(draft) => { setActiveDraft(draft); fetchData(); }} />
                
                <div className="mt-12 p-10 bg-slate-800 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 h-48 w-48 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-1000"></div>
                     <div className="relative z-10 space-y-6">
                        <Printer className="h-10 w-10 text-accent" />
                        <h3 className="text-2xl font-black tracking-tighter">Print to Portal</h3>
                        <p className="text-sm font-medium text-slate-300 leading-relaxed max-w-[200px]">Once finalized, you can upload these directly to departmental portals.</p>
                        <button className="flex items-center space-x-2 text-[10px] font-black uppercase text-accent tracking-widest hover:text-white transition-colors">
                            Portal Guidelines <ArrowRight className="h-3 w-3" />
                        </button>
                     </div>
                </div>
            </div>

            {/* Right: Preview (7/12) */}
            <div className="lg:col-span-7 h-[calc(100vh-280px)]">
                <AnimatePresence mode="wait">
                    {activeDraft ? (
                        <motion.div 
                            key={activeDraft._id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="h-full"
                        >
                            <LetterPreview letter={activeDraft} onUpdate={fetchData} />
                        </motion.div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center space-y-8 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-100 animate-in fade-in duration-1000">
                             <div className="p-8 bg-white rounded-full shadow-2xl border border-slate-50 relative group">
                                <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl group-hover:scale-125 transition-transform"></div>
                                <FilePlus2 className="h-12 w-12 text-slate-300 relative z-10" />
                             </div>
                             <div className="text-center space-y-2">
                                <h3 className="text-xl font-black text-slate-500 tracking-tight">Select or Create Advocacy</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Drafts will appear here for deep review</p>
                             </div>
                             <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-center space-x-4 max-w-sm">
                                <AlertCircle className="h-5 w-5 text-amber-500" />
                                <p className="text-[10px] font-bold text-amber-700 leading-tight">AI drafts are formal suggestions. Legal verification by a certified advocate is recommended before filing.</p>
                             </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
