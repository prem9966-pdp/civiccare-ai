import React from 'react';
import { SchemeCard } from './scheme-card';
import { CheckCircle2, XCircle, Info, Sparkles, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface Recommendation {
  schemeId: string;
  score: number;
  schemeDetails: any;
  matchedCriteria: string[];
  missingCriteria: string[];
}

interface RecommendationResultsProps {
  recommendations: Recommendation[];
}

export function RecommendationResults({ recommendations }: RecommendationResultsProps) {
  return (
    <div className="space-y-12">
      {recommendations.map((rec, index) => (
        <motion.div 
            key={rec.schemeId}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* The Scheme Card (8/12) */}
            <div className="lg:col-span-8">
                <SchemeCard scheme={{...rec.schemeDetails, eligibilityScore: rec.score}} />
            </div>

            {/* The Explanation Sidepanel (4/12) */}
            <div className="lg:col-span-4 h-full">
                <Card className="h-full border-none shadow-xl bg-white rounded-[2rem] overflow-hidden flex flex-col">
                    <div className="bg-primary/5 p-6 border-b border-primary/10 flex items-center justify-between">
                         <div className="flex items-center space-x-2">
                             <Sparkles className="h-4 w-4 text-primary" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-primary">Match Audit</span>
                         </div>
                         <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center border shadow-sm">
                            <Info className="h-4 w-4 text-slate-400" />
                         </div>
                    </div>
                    <CardContent className="p-8 flex-1 space-y-6">
                        {/* Matched List */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Why you qualify</h4>
                            <div className="space-y-3">
                                {rec.matchedCriteria.length > 0 ? rec.matchedCriteria.map((item, i) => (
                                    <div key={i} className="flex items-start space-x-3 group/item">
                                        <div className="mt-1 h-5 w-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-all">
                                            <CheckCircle2 className="h-3 w-3" />
                                        </div>
                                        <p className="text-xs font-bold text-slate-600 group-hover/item:text-primary transition-colors">{item}</p>
                                    </div>
                                )) : (
                                    <p className="text-xs text-slate-400 italic">No specific criteria matched.</p>
                                )}
                            </div>
                        </div>

                        {/* Missing List */}
                        {rec.missingCriteria.length > 0 && (
                            <div className="space-y-4 pt-6 border-t border-slate-50">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Requirements Needed</h4>
                                <div className="space-y-3">
                                    {rec.missingCriteria.map((item, i) => (
                                        <div key={i} className="flex items-start space-x-3 group/item">
                                            <div className="mt-1 h-5 w-5 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 group-hover/item:bg-amber-500 group-hover/item:text-white transition-all">
                                                <AlertCircle className="h-3 w-3" />
                                            </div>
                                            <p className="text-xs font-bold text-slate-600 group-hover/item:text-primary transition-colors">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                    <div className="p-6 bg-slate-50/50 border-t text-center">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Logic: Profile-to-Scheme Mapping v1.0</p>
                    </div>
                </Card>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
