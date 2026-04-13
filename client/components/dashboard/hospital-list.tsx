import React from 'react';
import { HospitalCard } from './hospital-card';
import { Search, Loader2, Filters, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

interface HospitalListProps {
  hospitals: any[];
  activeId: string | null;
  onSelect: (id: string) => void;
  isLoading?: boolean;
}

export function HospitalList({ hospitals, activeId, onSelect, isLoading = false }: HospitalListProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50/50 rounded-[3rem] border border-slate-100 shadow-inner">
      <div className="p-8 border-b border-slate-100 bg-white space-y-6">
          <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-primary tracking-tighter">Nearby <span className="text-accent underline decoration-accent/20 tracking-tighter">Facilities</span></h2>
              <div className="h-10 w-10 rounded-xl bg-slate-50 text-slate-300 flex items-center justify-center hover:bg-slate-100 transition-all cursor-pointer">
                  <FiltersIcon className="h-5 w-5" />
              </div>
          </div>
          
          <div className="relative">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-300 pointer-events-none" />
              <Input placeholder="Search hospitals, centers, etc." className="pl-12 h-12 rounded-2xl border-slate-200 focus:ring-primary/10 shadow-sm" />
          </div>

          <div className="flex items-center space-x-3 overflow-x-auto pb-1 no-scrollbar">
              {["All", "Public", "Private", "HelpCenter"].map(t => (
                  <button key={t} className="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-slate-50 text-slate-400 hover:bg-primary hover:text-white transition-all shadow-sm shrink-0">
                      {t}
                  </button>
              ))}
          </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                  <Loader2 className="h-10 w-10 text-primary animate-spin" />
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Scanning Proximity...</p>
              </div>
          ) : (hospitals.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center space-y-2 text-slate-400">
                  <p className="text-sm font-bold">No results found.</p>
                  <p className="text-[10px] uppercase font-black tracking-widest opacity-60 text-center">Try broadening your search.</p>
              </div>
          ) : (
              <AnimatePresence>
                  {hospitals.map((h, i) => (
                      <motion.div
                          key={h._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                      >
                          <HospitalCard 
                            hospital={h} 
                            isActive={activeId === h._id} 
                            onSelect={onSelect} 
                          />
                      </motion.div>
                  ))}
              </AnimatePresence>
          ))}
      </div>
    </div>
  );
}

function FiltersIcon({ className }: any) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>;
}
