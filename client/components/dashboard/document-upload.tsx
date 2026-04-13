"use client"

import React, { useState, useRef } from 'react';
import { Upload, X, File, CheckCircle2, Loader2, Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import documentService from '@/services/document.service';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function DocumentUpload({ onUploadComplete }: { onUploadComplete: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Aadhar");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      if (!title) setTitle(e.target.files[0].name.split('.')[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !title) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("type", type);

    try {
      const response = await documentService.upload(formData);
      if (response.success) {
        toast.success("Document optimized and stored!");
        setFile(null);
        setTitle("");
        onUploadComplete();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-6 duration-1000 group">
      <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                  <Upload className="h-6 w-6" />
              </div>
              <div>
                  <h3 className="text-xl font-black text-primary tracking-tighter">Document <span className="text-accent underline decoration-accent/20 tracking-tighter">Vault</span></h3>
                  <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Secure AES-256 Storage</p>
              </div>
          </div>
          <button className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-300">
              <X className="h-4 w-4" />
          </button>
      </div>

      <div className="p-8 space-y-8">
        {!file ? (
            <div 
                onClick={() => fileInputRef.current?.click()}
                className="h-64 rounded-[2rem] border-4 border-dashed border-slate-100 hover:border-primary/20 hover:bg-primary/5 transition-all cursor-pointer flex flex-col items-center justify-center space-y-4 text-center group/drop"
            >
                <div className="h-16 w-16 bg-white border shadow-sm rounded-2xl flex items-center justify-center text-slate-300 group-hover/drop:scale-110 group-hover/drop:text-primary transition-all">
                    <Plus className="h-8 w-8" />
                </div>
                <div>
                   <p className="text-sm font-black text-slate-400">Select Document or Image</p>
                   <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-2">Maximum 5MB • PDF, JPG, PNG</p>
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.png,.jpg,.jpeg" />
            </div>
        ) : (
            <div className="space-y-8 animate-in zoom-in-95 duration-500">
                <div className="flex items-center space-x-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                    <div className="h-14 w-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-primary">
                        <File className="h-8 w-8" />
                    </div>
                    <div className="flex-1 space-y-1">
                        <p className="text-xs font-black text-primary truncate max-w-[200px]">{file.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready</p>
                    </div>
                    <button onClick={() => setFile(null)} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-white text-red-400">
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 px-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Document Label</label>
                        <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Aadhar Card Front" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2 px-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Doc Category</label>
                        <select 
                            value={type} 
                            onChange={e => setType(e.target.value)}
                            className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option>Aadhar</option>
                            <option>PAN</option>
                            <option>Income Certificate</option>
                            <option>Cast Certificate</option>
                            <option>Other / Evidence</option>
                        </select>
                    </div>
                </div>

                <Button disabled={isLoading} onClick={handleUpload} size="lg" className="w-full h-14 rounded-2xl shadow-xl shadow-primary/20 bg-primary group/btn active:scale-95 transition-all">
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-3" /> : <Upload className="h-5 w-5 mr-3" />}
                    <span>Securely Push to Vault</span>
                    <ArrowRight className="h-4 w-4 ml-auto group-hover/btn:translate-x-1 transition-transform" />
                </Button>
            </div>
        )}
      </div>
      <div className="p-4 text-center bg-slate-50 text-[9px] font-black uppercase tracking-widest text-slate-300">
          Citizen Shield Enabled: Files are encrypted before transit v2.0
      </div>
    </div>
  );
}
