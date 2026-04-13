"use client"

import React, { useState, useEffect } from 'react';
import { DocumentUpload } from '@/components/dashboard/document-upload';
import { DocumentList } from '@/components/dashboard/document-list';
import { ChecklistProgress } from '@/components/dashboard/checklist-progress';
import documentService from '@/services/document.service';
import schemeService from '@/services/scheme.service';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Loader2, ShieldCheck, Activity, ArrowRight, Wallet } from 'lucide-react';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [checklist, setChecklist] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [schemes, setSchemes] = useState<any[]>([]);
  const [selectedSchemeId, setSelectedSchemeId] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const docsResponse = await documentService.getAll();
      const schemesResponse = await schemeService.getSchemes({});
      if (docsResponse.success) setDocuments(docsResponse.data);
      if (schemesResponse.success) {
          setSchemes(schemesResponse.data);
          if (schemesResponse.data.length > 0 && !selectedSchemeId) {
              setSelectedSchemeId(schemesResponse.data[0]._id);
          }
      }
    } catch (error) {
      console.error("Failed to load documents data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChecklist = async (id: string) => {
      try {
          const response = await documentService.getChecklist(id);
          if (response.success) setChecklist(response.data);
      } catch (error) {
          console.error("Failed to load checklist", error);
      }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
      if (selectedSchemeId) fetchChecklist(selectedSchemeId);
  }, [selectedSchemeId, documents]);

  const handleDelete = async (id: string) => {
      try {
          await documentService.delete(id);
          setDocuments(prev => prev.filter(d => d._id !== id));
      } catch (error) {
          console.error("Deletion failed", error);
      }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-12 pb-24 h-full">
        <section className="flex flex-col md:flex-row md:items-end justify-between px-2 gap-8">
            <div className="space-y-3">
               <h1 className="text-5xl font-black text-primary tracking-tighter">
                  Document <span className="text-accent underline decoration-accent/20 tracking-tighter">Vault</span>
               </h1>
               <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
                  Securely manage your identity and welfare credentials. Encrypted and accessible for AI deep-audits.
               </p>
            </div>
            <div className="flex items-center space-x-4 bg-emerald-500 p-6 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform"></div>
                <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center text-white relative z-10 transition-transform group-hover:rotate-12">
                   <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="relative z-10">
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/60">KYC Status</p>
                   <p className="text-lg font-black mt-1">Ready for Schemes</p>
                </div>
            </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content (Upload & List) */}
            <div className="lg:col-span-8 space-y-12 h-screen overflow-y-auto pr-2 custom-scrollbar pb-12">
                <DocumentUpload onUploadComplete={fetchData} />
                <DocumentList documents={documents} onDelete={handleDelete} />
            </div>

            {/* Right Sidebar (Readiness) */}
            <div className="lg:col-span-4 space-y-10 sticky top-12">
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Scheme Readiness Hub</h3>
                    <select 
                        value={selectedSchemeId || ""} 
                        onChange={e => setSelectedSchemeId(e.target.value)}
                        className="w-full h-14 bg-white border border-slate-100 rounded-[1.5rem] px-6 text-sm font-bold text-primary focus:outline-none focus:ring-4 focus:ring-primary/5 shadow-sm hover:shadow-xl transition-all"
                    >
                        {schemes.map(s => (
                            <option key={s._id} value={s._id}>{s.title}</option>
                        ))}
                    </select>
                </div>

                {checklist && (
                   <ChecklistProgress 
                        items={checklist.checklist} 
                        completionRate={checklist.completionRate} 
                        schemeTitle={schemes.find(s => s._id === selectedSchemeId)?.title}
                   />
                )}

                <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 h-48 w-48 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform"></div>
                    <div className="relative z-10 space-y-6">
                        <Wallet className="h-10 w-10 text-primary" />
                        <h3 className="text-2xl font-black text-primary tracking-tighter">Sync Required?</h3>
                        <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-[200px]">Link your DigiLocker for automated KYC retrieval coming soon.</p>
                        <button className="flex items-center space-x-2 text-[10px] font-black uppercase text-primary tracking-widest hover:text-accent transition-colors">
                            Notify Me <ArrowRight className="h-3 w-3" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
