import React from 'react';
import { File, MoreVertical, Trash2, Eye, Download, ShieldCheck, Clock, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface DocumentListProps {
  documents: any[];
  onDelete: (id: string) => void;
}

export function DocumentList({ documents, onDelete }: DocumentListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between px-2">
          <h2 className="text-2xl font-black text-primary tracking-tight flex items-center">
              <Layers className="h-6 w-6 mr-3 text-accent" /> Active Metadata ({documents.length})
          </h2>
          <button className="text-[10px] font-black uppercase text-slate-400 hover:text-primary tracking-[0.2em] flex items-center transition-colors">
              Sort by Recent v
          </button>
      </div>

      {documents.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center space-y-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] text-slate-400">
           <File className="h-10 w-10 opacity-20" />
           <p className="text-sm font-bold">No documents stored in vault.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {documents.map((doc, index) => (
              <motion.div
                key={doc._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden"
              >
                 <div className="flex items-start justify-between mb-6">
                    <div className="p-4 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-inner relative z-10">
                        <File className="h-6 w-6" />
                    </div>
                    
                    <div className="flex items-center space-x-2 relative z-10">
                        {doc.status === 'verified' ? (
                            <div className="flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-full text-[10px] font-black uppercase tracking-widest">
                                <ShieldCheck className="h-3 w-3" />
                                <span>Verified</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-1.5 px-3 py-1 bg-amber-50 text-amber-500 border border-amber-100 rounded-full text-[10px] font-black uppercase tracking-widest">
                                <Clock className="h-3 w-3" />
                                <span>Pending</span>
                            </div>
                        )}
                    </div>
                 </div>

                 <div className="space-y-4 relative z-10">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 opacity-60">{doc.type}</p>
                        <h3 className="text-xl font-black text-primary truncate tracking-tighter leading-tight group-hover:text-accent transition-colors">{doc.title}</h3>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <div className="text-[11px] font-bold text-slate-400">
                            {(doc.fileSize / 1024 / 1024).toFixed(2)} MB • {doc.mimeType.split('/')[1]?.toUpperCase()}
                        </div>
                        <div className="flex items-center space-x-2">
                             <a 
                                href={doc.fileUrl} 
                                target="_blank" 
                                rel="noreferrer"
                                className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-400 hover:text-primary transition-all shadow-sm border border-transparent hover:border-slate-100 bg-white"
                             >
                                <Eye className="h-4 w-4" />
                             </a>
                             <button 
                                onClick={() => onDelete(doc._id)}
                                className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all shadow-sm border border-transparent hover:border-red-100 bg-white"
                             >
                                <Trash2 className="h-4 w-4" />
                             </button>
                        </div>
                    </div>
                 </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
