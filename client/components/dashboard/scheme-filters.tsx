import React, { useState } from 'react';
import { Filter, Search, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SchemeFiltersProps {
  onFilterChange: (filters: any) => void;
}

const categories = ["Healthcare", "Finance", "Agriculture", "Education", "Insurance"];
const states = ["Central", "Maharashtra", "Karnataka", "Uttar Pradesh", "Bihar"];

export function SchemeFilters({ onFilterChange }: SchemeFiltersProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeState, setActiveState] = useState<string | null>(null);

  const toggleCategory = (cat: string) => {
    const newVal = activeCategory === cat ? null : cat;
    setActiveCategory(newVal);
    onFilterChange({ category: newVal, state: activeState });
  };

  const toggleState = (st: string) => {
    const newVal = activeState === st ? null : st;
    setActiveState(newVal);
    onFilterChange({ category: activeCategory, state: newVal });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Category Pills */}
      <div className="space-y-3 px-2">
        <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 opacity-60">Citizen Categories</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={cn(
                "px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border shadow-sm",
                activeCategory === cat 
                   ? "bg-primary text-white border-primary shadow-xl scale-105" 
                   : "bg-white text-slate-500 hover:border-primary/20 hover:shadow-md"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* State Selection */}
      <div className="space-y-3 px-2">
        <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 opacity-60">Regional Scope</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {states.map((st) => (
            <button
               key={st}
               onClick={() => toggleState(st)}
               className={cn(
                 "flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all border shadow-sm",
                 activeState === st 
                    ? "bg-white border-primary text-primary shadow-lg ring-2 ring-primary/5" 
                    : "bg-white text-slate-500 hover:bg-slate-50"
               )}
            >
              <span>{st}</span>
              {activeState === st && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
