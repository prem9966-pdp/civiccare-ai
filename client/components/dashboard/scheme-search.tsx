"use client"

import React, { useState, useEffect } from 'react';
import { Search, Loader2, Sparkles, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SchemeSearchProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function SchemeSearch({ onSearch, isLoading = false }: SchemeSearchProps) {
  const [query, setQuery] = useState("");

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 500); // 500ms debounce
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative max-w-2xl mx-auto group animate-in slide-in-from-top-4 duration-1000">
      <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] blur-2xl group-focus-within:bg-primary/10 transition-colors"></div>
      
      <div className="relative flex items-center bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-2 group-focus-within:border-primary/20 transition-all">
        <div className="pl-6 pr-4 border-r border-slate-100">
          {isLoading ? (
            <Loader2 className="h-6 w-6 text-primary animate-spin" />
          ) : (
            <Search className="h-6 w-6 text-slate-400 group-focus-within:text-primary transition-colors" />
          )}
        </div>
        
        <Input 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by keywords: 'Health', 'Farmer', 'Education'..." 
          className="border-none shadow-none text-lg h-16 font-bold text-primary placeholder:text-slate-300 placeholder:font-medium focus:ring-0 px-6 bg-transparent"
        />

        <div className="flex items-center space-x-2 pr-4">
            {query && (
              <button 
                onClick={handleClear}
                className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors text-slate-400"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            <div className="hidden sm:flex items-center space-x-2 bg-primary/5 rounded-2xl px-4 py-2 text-primary font-black uppercase text-[10px] tracking-widest border border-primary/10">
                <Sparkles className="h-4 w-4 mr-0.5" />
                <span>AI ASSISTED</span>
            </div>
        </div>
      </div>
    </div>
  );
}
