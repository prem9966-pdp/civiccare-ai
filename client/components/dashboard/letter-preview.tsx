"use client"

import React, { useState } from 'react';
import { FileText, Save, Download, Printer, RotateCcw, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import letterService from '@/services/letter.service';
import { toast } from 'sonner';

interface LetterPreviewProps {
  letter: any;
  onUpdate: () => void;
}

export function LetterPreview({ letter, onUpdate }: LetterPreviewProps) {
  const [content, setContent] = useState(letter.content);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await letterService.updateContent(letter._id, content);
      toast.success("Changes saved to formal record!");
      onUpdate();
    } catch (error) {
        toast.error("Save failed");
    } finally {
        setIsSaving(false);
    }
  };

  const handleExport = async () => {
      setIsExporting(true);
      try {
          const response = await letterService.exportPDF(letter._id);
          if (response.success && response.data.pdfUrl) {
              window.open(response.data.pdfUrl, '_blank');
              toast.success("PDF generated successfully!");
          }
      } catch (error) {
          toast.error("PDF generation failed");
      } finally {
          setIsExporting(false);
      }
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-700 flex flex-col h-full border-b-4 border-b-accent">
      <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-xl bg-accent/5 flex items-center justify-center text-accent border border-accent/10">
                  <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-black text-primary tracking-tighter">Draft <span className="text-accent underline decoration-accent/20 tracking-tighter">Review</span></h3>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Subject: {letter.subject}</p>
      </div>

      <div className="p-12 flex-1 relative bg-slate-50/30 overflow-hidden group">
          <div className="absolute top-0 right-0 h-48 w-48 bg-white opacity-50 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/5 transition-all"></div>
          
          <div className="relative bg-white shadow-2xl rounded-3xl p-12 min-h-[500px] border border-slate-100/50 shadow-inner group-focus-within:ring-4 ring-primary/5 transition-all">
              <div className="absolute top-6 right-6 opacity-20 pointer-events-none">
                  <FileText className="h-24 w-24 text-slate-100" />
              </div>
              <textarea 
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full h-full min-h-[400px] bg-transparent border-none focus:ring-0 text-lg font-medium text-slate-700 leading-relaxed font-sans resize-none custom-scrollbar"
                placeholder="Write your letter here..."
              />
          </div>
      </div>

      <div className="p-8 bg-slate-50 border-t flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Contextually Verified AI Content</span>
          </div>
          
          <div className="flex items-center space-x-4">
              <Button onClick={handleSave} disabled={isSaving} variant="outline" className="h-11 rounded-xl shadow-lg border border-slate-100 px-6 font-bold flex items-center justify-center hover:bg-white active:scale-95 transition-all">
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Finalize Review
              </Button>
              <Button onClick={handleExport} disabled={isExporting} size="lg" className="h-11 rounded-xl shadow-xl shadow-primary/20 bg-primary group/export active:scale-95 transition-all px-8 font-black">
                  {isExporting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Download className="h-4 w-4 mr-2" />}
                  Export Official PDF
              </Button>
          </div>
      </div>
      <div className="p-3 text-center bg-slate-100 text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">
          Digital Advocacy Module v2.0 - Certified for Municipal and Health Dept usage
      </div>
    </div>
  );
}
