import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Landmark, ArrowRight, Tag, Share2 } from "lucide-react";
import Link from 'next/link';
import { EligibilityScore } from './eligibility-score';
import { SaveSchemeButton } from './save-scheme-button';
import { cn } from '@/lib/utils';

interface SchemeCardProps {
  scheme: any;
}

export function SchemeCard({ scheme }: SchemeCardProps) {
  const getCategoryColor = (category: string) => {
    if (category.toLowerCase().includes('health')) return "from-emerald-50 to-emerald-100 text-emerald-600";
    if (category.toLowerCase().includes('finance')) return "from-blue-50 to-blue-100 text-blue-600";
    if (category.toLowerCase().includes('farmer')) return "from-orange-50 to-orange-100 text-orange-600";
    return "from-slate-50 to-slate-100 text-slate-600";
  };

  return (
    <Card className="group relative border-none shadow-sm hover:shadow-2xl bg-white overflow-hidden transition-all duration-500 rounded-[2rem]">
      {/* Visual Identity Strip */}
      <div className={cn(
        "h-1.5 w-full bg-gradient-to-r transition-all duration-500",
        getCategoryColor(scheme.category).split(' ').slice(0, 2).join(' ').replace('from-', 'bg-').replace('to-', '')
      )}></div>

      <CardHeader className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className={cn("p-4 rounded-[1.25rem] bg-gradient-to-br shadow-inner transition-transform group-hover:scale-110 duration-500", getCategoryColor(scheme.category))}>
             <Landmark className="h-6 w-6" />
          </div>
          <EligibilityScore score={scheme.eligibilityScore || 0} />
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 opacity-60 flex items-center">
            <Tag className="h-3 w-3 mr-2" /> {scheme.category} • {scheme.state}
          </p>
          <CardTitle className="text-2xl font-black text-primary tracking-tighter leading-tight group-hover:text-accent transition-colors duration-300">
             {scheme.title}
          </CardTitle>
          <CardDescription className="text-slate-500 font-medium line-clamp-2 text-sm leading-relaxed">
             {scheme.description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-8 pb-8 flex flex-wrap gap-2">
         {scheme.targetGroups.slice(0, 3).map((tag: string) => (
             <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black text-slate-400 group-hover:bg-primary/5 transition-colors">
                {tag}
             </span>
         ))}
      </CardContent>

      <CardFooter className="px-8 py-6 bg-slate-50/50 border-t flex items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
           <SaveSchemeButton schemeId={scheme._id} initialSaved={scheme.isSaved} variant="ghost" className="hover:bg-white" />
           <button className="h-9 w-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-primary hover:bg-white transition-all shadow-sm">
                <Share2 className="h-4 w-4" />
           </button>
        </div>
        <Link 
            href={`/dashboard/schemes/${scheme._id}`} 
            className="flex items-center space-x-2 text-xs font-black text-primary hover:text-accent uppercase tracking-widest group/link"
        >
          <span>Deep Audit</span> 
          <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
