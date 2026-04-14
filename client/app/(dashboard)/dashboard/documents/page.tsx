"use client"

import React, { useState, useEffect } from 'react';
import { DocumentUpload } from '@/components/dashboard/document-upload';
import { DocumentList } from '@/components/dashboard/document-list';
import documentService from '@/services/document.service';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { ShieldCheck, ArrowRight, Wallet } from 'lucide-react';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const docsResponse = await documentService.getAll();
      if (docsResponse.success) setDocuments(docsResponse.data);
    } catch (error) {
      console.error("Failed to load documents data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-10 sticky top-12">
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
