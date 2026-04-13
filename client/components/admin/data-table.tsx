import React from 'react';
import { MoreVertical, Trash2, Eye, Edit3, ShieldCheck, Clock, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface DataTableProps {
  title: string;
  columns: string[];
  data: any[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  isLoading?: boolean;
}

export function DataTable({ title, columns, data, onDelete, onEdit, isLoading = false }: DataTableProps) {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-8 duration-700">
      <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-primary/5">
          <div className="flex items-center space-x-6">
              <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-primary shadow-xl border border-primary/10">
                  <Layers className="h-7 w-7" />
              </div>
              <div>
                  <h3 className="text-2xl font-black text-primary tracking-tighter">{title} <span className="text-slate-400 opacity-60">Registry</span></h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 opacity-80">{data.length} Records Verified</p>
              </div>
          </div>
          <div className="flex items-center space-x-4">
              <button className="h-11 px-6 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:text-primary transition-all shadow-sm">Export CSV</button>
              <button className="h-11 px-6 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">Add New Record</button>
          </div>
      </div>

      <div className="overflow-x-auto p-2">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-50">
              {columns.map((col) => (
                <th key={col} className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 opacity-60">{col}</th>
              ))}
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <AnimatePresence>
                {data.map((row, i) => (
                    <motion.tr 
                        key={row._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group hover:bg-slate-50/50 transition-all duration-300"
                    >
                        {columns.map((col) => (
                            <td key={col} className="px-8 py-6 whitespace-nowrap">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">{row[col.toLowerCase()] || '—'}</span>
                                    {col === 'User' && <span className="text-[10px] font-medium text-slate-400 group-hover:text-slate-500">{row.email}</span>}
                                </div>
                            </td>
                        ))}
                        <td className="px-8 py-6 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => onEdit && onEdit(row._id)} className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white text-slate-300 hover:text-primary border border-transparent hover:border-slate-100 shadow-sm transition-all">
                                    <Edit3 className="h-4 w-4" />
                                </button>
                                <button onClick={() => onDelete && onDelete(row._id)} className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white text-slate-300 hover:text-red-500 border border-transparent hover:border-red-100 shadow-sm transition-all">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </td>
                    </motion.tr>
                ))}
            </AnimatePresence>
          </tbody>
        </table>
        
        {data.length === 0 && !isLoading && (
            <div className="py-24 text-center space-y-6">
                 <Layers className="h-12 w-12 text-slate-100 mx-auto" />
                 <p className="text-sm font-bold text-slate-400">No active records found in this repository.</p>
            </div>
        )}

        {isLoading && (
            <div className="py-24 text-center space-y-4">
                 <Layers className="h-12 w-12 text-primary animate-pulse mx-auto opacity-20" />
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Querying Master Hub...</p>
            </div>
        )}
      </div>
      <div className="p-4 bg-slate-50 border-t flex items-center justify-center">
          <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-300 opacity-60">High-Fidelity Security Grid v2.1 • Certified by Digital India Audit</p>
      </div>
    </div>
  );
}
