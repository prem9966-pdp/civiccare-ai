"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Loader2, 
  CheckCircle2, 
  Info, 
  ArrowRight,
  ClipboardCheck,
  User,
  MapPin,
  Briefcase,
  Layers,
  IndianRupee,
  Calendar,
  Bookmark,
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { schemeDiscoverySchema, SchemeDiscoveryValues } from '@/lib/validation/scheme';
import { zodResolver } from '@hookform/resolvers/zod';

interface Scheme {
  name: string;
  description: string;
  eligibilityReason: string;
  score?: 'High' | 'Medium' | 'Low'; // Added for UI
}

export default function SchemeFinderPage() {
  const [recommendations, setRecommendations] = useState<Scheme[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SchemeDiscoveryValues>({
    resolver: zodResolver(schemeDiscoverySchema),
    defaultValues: {
      age: 0,
      gender: 'male',
      state: '',
      category: '',
      income: 0,
      occupation: 'student',
    }
  });

  const onSubmit = async (data: SchemeDiscoveryValues) => {
    setIsLoading(true);
    try {
      // Keep existing API logic
      const response = await axios.post('http://127.0.0.1:5050/api/v1/recommendation', data);
      
      // Injecting random/mock scores for UI demonstration as requested (High/Medium/Low)
      const dataWithScores = (response.data.data || []).map((s: any) => ({
        ...s,
        score: ['High', 'High', 'Medium', 'Low'][Math.floor(Math.random() * 4)]
      }));

      setRecommendations(dataWithScores);
      setHasSearched(true);
      toast.success("We found matching schemes for you!");
    } catch (error) {
      console.error("Discovery error:", error);
      toast.error("Failed to find schemes. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto space-y-12 pb-20 overflow-visible">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
          <div className="space-y-3">
             <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">AI Recommendation Engine</span>
             </div>
             <h1 className="text-5xl md:text-6xl font-black text-primary tracking-tighter leading-none">
                Find Your <span className="text-accent underline decoration-accent/20 italic">Benefits.</span>
             </h1>
             <p className="text-lg text-muted-foreground font-medium max-w-xl">
                Discover personalized government welfare programs and subsidies based on your unique citizen profile.
             </p>
          </div>
          <div className="h-16 w-16 rounded-[24px] bg-white border border-slate-100 shadow-xl flex items-center justify-center text-primary rotate-3 transition-transform hover:rotate-0">
            <ClipboardCheck className="h-8 w-8" />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* 1. Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5"
          >
            <Card className="rounded-[40px] border-slate-100 shadow-2xl shadow-slate-200/50 bg-white overflow-hidden">
               <div className="p-10 space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-primary tracking-tight">Citizen Profile</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Provide basic details to start search</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                           <Calendar className="h-3 w-3 mr-1.5" /> Age
                         </label>
                         <Input 
                           type="number" 
                           placeholder="25" 
                           {...register('age', { required: true, min: 1, valueAsNumber: true })}
                           className="rounded-2xl h-14 bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-primary/10 text-base font-bold transition-all"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                           <User className="h-3 w-3 mr-1.5" /> Gender
                         </label>
                         <select 
                           {...register('gender', { required: true })}
                           className="w-full h-14 rounded-2xl bg-slate-50 border-none px-4 text-sm font-bold focus:ring-2 focus:ring-primary/10 appearance-none outline-none cursor-pointer"
                         >
                           <option value="male">Male</option>
                           <option value="female">Female</option>
                           <option value="other">Other</option>
                         </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                         <IndianRupee className="h-3 w-3 mr-1.5" /> Annual Income (₹)
                      </label>
                      <Input 
                          type="number" 
                          placeholder="500,000" 
                          {...register('income', { required: true, valueAsNumber: true })}
                          className="rounded-2xl h-14 bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-primary/10 text-base font-bold transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                           <Layers className="h-3 w-3 mr-1.5" /> Category
                         </label>
                        <select
                          {...register("category", { required: true })}
                          defaultValue=""
                          className="w-full h-14 rounded-2xl bg-slate-50 border-none px-4 text-sm font-bold outline-none cursor-pointer">
                          <option value="" disabled>Select</option>
                          <option value="general">General</option>
                          <option value="obc">OBC</option>
                          <option value="sc">SC</option>
                          <option value="st">ST</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                         <label className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                           <Briefcase className="h-3 w-3 mr-1.5" /> Occupation
                         </label>
                         <select 
                           {...register('occupation', { required: true })}
                           className="w-full h-14 rounded-2xl bg-slate-50 border-none px-4 text-sm font-bold outline-none cursor-pointer"
                         >
                           <option value="student">Student</option>
                           <option value="farmer">Farmer</option>
                           <option value="unemployed">Unemployed</option>
                           <option value="self-employed">Self Employed</option>
                           <option value="pensioner">Pensioner</option>
                         </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                         <MapPin className="h-3 w-3 mr-1.5" /> State of Residence
                      </label>
                      <Input 
                          placeholder="e.g. Maharashtra" 
                          {...register('state', { required: true })}
                          className="rounded-2xl h-14 bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-primary/10 text-base font-bold transition-all"
                      />
                    </div>

                    <Button 
                      disabled={isLoading} 
                      className="w-full h-16 rounded-[24px] text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 transition-all mt-4 hover:scale-[1.02] active:scale-[0.98] bg-primary group"
                    >
                      {isLoading ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : (
                        <>
                          Run Discovery Engine
                          <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
               </div>
            </Card>
          </motion.div>

          {/* 2. Results Section */}
          <div className="lg:col-span-7">
             <AnimatePresence mode="wait">
               {!hasSearched && !isLoading ? (
                 <motion.div 
                   key="empty-state"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="h-full min-h-[600px] border-4 border-dashed border-slate-100 rounded-[50px] flex flex-col items-center justify-center text-center p-12 bg-slate-50/20"
                 >
                    <div className="h-24 w-24 bg-white rounded-[32px] shadow-2xl flex items-center justify-center text-primary/10 mb-8 border border-slate-50">
                       <Search className="h-12 w-12" />
                    </div>
                    <h3 className="text-3xl font-black text-primary/40 mb-4 italic tracking-tight">Ready to Search?</h3>
                    <p className="text-base font-medium text-slate-400 max-w-xs mx-auto leading-relaxed">
                       Complete your citizen profile on the left to see which schemes you are eligible for today.
                    </p>
                 </motion.div>
               ) : isLoading ? (
                 <motion.div 
                   key="loading-state"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="h-full min-h-[600px] flex flex-col items-center justify-center text-center"
                 >
                    <div className="relative">
                      <div className="h-24 w-24 border-8 border-slate-100 border-t-accent rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Zap className="h-8 w-8 text-accent animate-pulse" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-primary mt-8">Analyzing Eligibility...</h3>
                    <p className="text-sm font-bold text-accent uppercase tracking-widest mt-2">Checking 500+ Central & State Schemes</p>
                 </motion.div>
               ) : (
                 <motion.div 
                   key="results"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="space-y-8"
                 >
                    <div className="flex items-center justify-between px-4">
                       <div className="flex items-center space-x-3">
                         <h3 className="text-3xl font-black text-primary tracking-tighter italic">Matched Schemes</h3>
                         <span className="h-10 px-4 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center text-xs font-black uppercase tracking-widest">
                            {recommendations.length} Results
                         </span>
                       </div>
                       <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-primary/30" onClick={() => setHasSearched(false)}>Clear</Button>
                    </div>

                    {recommendations.length === 0 ? (
                      <Card className="rounded-[40px] border-slate-100 shadow-xl p-16 text-center">
                         <div className="h-20 w-20 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-500 mx-auto mb-6">
                            <Info className="h-10 w-10" />
                         </div>
                         <h4 className="text-2xl font-black text-primary mb-2">No Broad Matches Found</h4>
                         <p className="text-muted-foreground font-medium max-w-sm mx-auto">
                            Try broadening your criteria or updating your profile information to find more programs.
                         </p>
                      </Card>
                    ) : (
                      <div className="grid grid-cols-1 gap-8">
                        {recommendations.map((scheme, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <Card className="rounded-[40px] border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white overflow-hidden group">
                              <div className="flex flex-col md:flex-row h-full">
                                 {/* Eligibility Score Badge Side */}
                                 <div className={cn(
                                   "w-full md:w-3 px-1 transition-all",
                                   scheme.score === 'High' ? "bg-emerald-500" :
                                   scheme.score === 'Medium' ? "bg-amber-500" : "bg-rose-500"
                                 )} />
                                 
                                 <div className="flex-1 p-8 md:p-10 space-y-8">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                       <div className="space-y-2">
                                          <div className={cn(
                                            "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2",
                                            scheme.score === 'High' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                                            scheme.score === 'Medium' ? "bg-amber-50 text-amber-600 border border-amber-100" :
                                            "bg-rose-50 text-rose-600 border border-rose-100"
                                          )}>
                                            {scheme.score} Eligibility
                                          </div>
                                          <h4 className="text-2xl font-black text-primary leading-tight group-hover:text-accent transition-colors">
                                            {scheme.name}
                                          </h4>
                                       </div>
                                       <div className="flex items-center space-x-2">
                                          <Button size="icon" variant="outline" className="h-12 w-12 rounded-2xl border-slate-100 hover:bg-slate-50 transition-all">
                                             <Bookmark className="h-5 w-5 text-slate-400 group-hover:text-primary" />
                                          </Button>
                                       </div>
                                    </div>

                                    <p className="text-muted-foreground font-medium leading-relaxed">
                                      {scheme.description}
                                    </p>

                                    <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 space-y-3">
                                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                                          <CheckCircle2 className="h-3 w-3 mr-2 text-emerald-500" /> Matching Rationale
                                       </p>
                                       <p className="text-sm font-bold text-slate-600 italic">
                                          "{scheme.eligibilityReason}"
                                       </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                       <Button className="h-14 px-8 rounded-2xl bg-primary hover:bg-slate-800 font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20">
                                          View Full Details
                                       </Button>
                                       <Button variant="ghost" className="h-14 px-8 rounded-2xl font-black text-xs uppercase tracking-widest text-accent hover:bg-accent/5">
                                          Save to Vault
                                       </Button>
                                    </div>
                                 </div>
                              </div>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    )}
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
