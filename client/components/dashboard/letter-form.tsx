"use client"

import React, { useState } from 'react';
import { FileText, Send, Building, ShieldAlert, Globe, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import letterService from '@/services/letter.service';
import { toast } from 'sonner';

interface LetterFormProps {
  onDraftCreated: (draft: any) => void;
}

export function LetterForm({ onDraftCreated }: LetterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "Complaint",
    authority: "Municipal Corporation",
    subject: "",
    details: "",
    language: "English"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.details) return;

    // MANDATORY DEBUG LOGS (Step 3)
    console.log("[DRAFT FRONTEND] Button clicked");
    console.log("[DRAFT FRONTEND] Current form data:", formData);
    console.log("[DRAFT FRONTEND] About to call API");

    setIsLoading(true);
    try {
      const response = await letterService.createDraft(formData);
      
      // MANDATORY DEBUG LOGS (Step 3)
      console.log("[DRAFT FRONTEND] API response:", response);
      console.log("[DRAFT FRONTEND] Draft received:", response?.data);

      if (response.success) {
        toast.success("AI is drafting your official letter...");
        onDraftCreated(response.data);
      }
    } catch (error) {
      // MANDATORY DEBUG LOGS (Step 3)
      console.log("[DRAFT FRONTEND] Error:", error);
      toast.error("Failed to generate draft");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-left-6 duration-1000">
      <div className="p-10 border-b border-slate-50 flex items-center space-x-6 bg-primary text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform"></div>
          <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <FileText className="h-8 w-8" />
          </div>
          <div>
              <h3 className="text-2xl font-black tracking-tighter">Drafting <span className="text-accent underline decoration-accent/20 tracking-tighter">Agent</span></h3>
              <p className="text-[10px] uppercase font-black tracking-widest text-white/60">Official Advocacy Engine v1.0</p>
          </div>
      </div>

      <div className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Letter Type</label>
                  <select 
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                    className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-primary/20 outline-none"
                  >
                      <option>Complaint</option>
                      <option>Application</option>
                      <option>Request for Benefit</option>
                  </select>
              </div>
              <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Addressed To</label>
                  <div className="relative">
                      <Building className="absolute left-3 top-3.5 h-4 w-4 text-slate-300" />
                      <Input 
                        value={formData.authority}
                        onChange={e => setFormData({...formData, authority: e.target.value})}
                        className="pl-10 h-12" 
                        placeholder="e.g. Health Department" 
                      />
                  </div>
              </div>
          </div>

          <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Subject Line</label>
              <div className="relative">
                  <ShieldAlert className="absolute left-3 top-3.5 h-4 w-4 text-slate-300" />
                  <Input 
                    value={formData.subject}
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                    className="pl-10 h-12" 
                    placeholder="e.g. Non-availability of PM-JAY services at Local Clinic" 
                  />
              </div>
          </div>

          <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Describe Issue / Details</label>
              <textarea 
                value={formData.details}
                onChange={e => setFormData({...formData, details: e.target.value})}
                rows={4}
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium text-slate-600 placeholder:text-slate-300 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="Provide as much detail as possible. AI will format this into a professional letter."
              />
          </div>

          <div className="flex items-center space-x-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <Globe className="h-5 w-5 text-slate-300" />
              <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Language Output</p>
                  <select 
                    value={formData.language}
                    onChange={e => setFormData({...formData, language: e.target.value})}
                    className="bg-transparent text-sm font-bold text-primary focus:outline-none"
                  >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Kannada</option>
                      <option>Marathi</option>
                  </select>
              </div>
          </div>

          <Button disabled={isLoading} size="lg" className="w-full h-14 rounded-2xl shadow-xl shadow-primary/20 bg-primary group/btn active:scale-95 transition-all">
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-3" /> : <Send className="h-5 w-5 mr-3" />}
              <span>Generate Official Draft</span>
              <ArrowRight className="h-4 w-4 ml-auto group-hover/btn:translate-x-1 transition-transform" />
          </Button>
      </div>
    </form>
  );
}
