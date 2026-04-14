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
  GraduationCap,
  Accessibility,
  Tractor,
  BookOpen,
  MapPin,
  Briefcase,
  IndianRupee
} from 'lucide-react';
import schemeService from '@/services/scheme.service';
import { toast } from 'sonner';

interface Scheme {
  name: string;
  description: string;
  eligibilityReason: string;
}

export default function SchemesPage() {
  const [recommendations, setRecommendations] = useState<Scheme[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Using shared schemeService for centralized API calls
      const result = await schemeService.getRecommendations({
        age: Number(data.age),
        gender: data.gender,
        state: data.state,
        income: Number(data.income),
        category: data.category,
        occupation: data.occupation
      });
      
      setRecommendations(result.data || []);
      setHasSearched(true);
      toast.success("Eligibility scan complete!");
    } catch (error: any) {
      console.error("Discovery error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Unable to fetch schemes.";
      toast.error(`Discovery Failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-12 pb-24 animate-in fade-in duration-700">
        {/* Simple Page Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-primary tracking-tighter md:text-5xl">
              Scheme <span className="text-accent underline decoration-accent/20">Eligibility</span> Finder
            </h1>
            <p className="text-lg text-slate-500 font-medium">
              Find and apply for government benefits based on your citizen profile.
            </p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-primary group hover:bg-primary hover:text-white transition-all duration-300">
             <ClipboardCheck className="h-6 w-6" />
          </div>
        </header>

        {/* Structured Eligibility Form */}
        <Card className="rounded-[2.5rem] border-slate-100 shadow-2xl bg-white overflow-hidden border-b-8 border-b-primary/5">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-10 pb-6">
            <div className="flex items-center space-x-4">
               <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                  <User className="h-6 w-6" />
               </div>
               <div>
                   <CardTitle className="text-2xl font-black tracking-tight">Citizen Profile Details</CardTitle>
                   <CardDescription className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-0.5">Please provide accurate demographic data</CardDescription>
               </div>
            </div>
          </CardHeader>
          <CardContent className="p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Row 1: Age, Gender, State */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1 flex items-center">
                     <User className="h-3 w-3 mr-1" /> Age
                   </label>
                   <Input 
                     type="number" 
                     placeholder="e.g. 25" 
                     {...register('age', { required: true, min: 1 })}
                     className="rounded-2xl h-14 bg-slate-50 border-slate-100 focus:bg-white transition-all text-sm font-bold"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1 flex items-center">
                     <User className="h-3 w-3 mr-1" /> Gender
                   </label>
                   <select 
                     {...register('gender', { required: true })}
                     className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-100 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 appearance-none outline-none transition-all focus:bg-white"
                   >
                     <option value="male">Male</option>
                     <option value="female">Female</option>
                     <option value="other">Other</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1 flex items-center">
                     <MapPin className="h-3 w-3 mr-1" /> State
                   </label>
                   <select 
                     {...register('state', { required: true })}
                     className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-100 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 appearance-none outline-none transition-all focus:bg-white"
                   >
                     <option value="Maharashtra">Maharashtra</option>
                     <option value="Delhi">Delhi</option>
                     <option value="Karnataka">Karnataka</option>
                     <option value="Uttar Pradesh">Uttar Pradesh</option>
                     <option value="West Bengal">West Bengal</option>
                     <option value="Other">Other State</option>
                   </select>
                </div>
              </div>

              {/* Row 2: Category, Income, Occupation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1">Social Category</label>
                   <select 
                     {...register('category', { required: true })}
                     className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-100 px-5 text-sm font-bold outline-none focus:bg-white"
                   >
                     <option value="general">General</option>
                     <option value="obc">OBC</option>
                     <option value="sc">SC</option>
                     <option value="st">ST</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1 flex items-center">
                     <IndianRupee className="h-3 w-3 mr-1" /> Annual Income (₹)
                   </label>
                   <Input 
                      type="number" 
                      placeholder="e.g. 500000" 
                      {...register('income', { required: true })}
                      className="rounded-2xl h-14 bg-slate-50 border-slate-100 focus:bg-white"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1 flex items-center">
                     <Briefcase className="h-3 w-3 mr-1" /> Occupation
                   </label>
                   <select 
                     {...register('occupation', { required: true })}
                     className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-100 px-5 text-sm font-bold outline-none focus:bg-white"
                   >
                     <option value="salaried">Salaried</option>
                     <option value="self-employed">Self Employed</option>
                     <option value="farmer">Farmer</option>
                     <option value="student">Student</option>
                     <option value="unemployed">Unemployed</option>
                     <option value="pensioner">Pensioner</option>
                   </select>
                </div>
              </div>

              {/* Row 3: Education Level and Status Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end border-t border-slate-50 pt-8">
                <div className="space-y-2 col-span-1">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1 flex items-center">
                     <GraduationCap className="h-3 w-3 mr-1" /> Education Level
                   </label>
                   <select 
                     {...register('education', { required: true })}
                     className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-100 px-5 text-sm font-bold outline-none focus:bg-white"
                   >
                     <option value="secondary">Primary/Secondary</option>
                     <option value="higher-secondary">Higher Secondary</option>
                     <option value="graduate">Graduate</option>
                     <option value="post-graduate">Post Graduate</option>
                     <option value="none">No Formal Education</option>
                   </select>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1 flex items-center">
                     <Accessibility className="h-3 w-3 mr-1" /> Disability Status
                   </label>
                   <select 
                     {...register('disabilityStatus', { required: true })}
                     className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-100 px-5 text-sm font-bold outline-none focus:bg-white"
                   >
                     <option value="none">No Disability</option>
                     <option value="partially">Partially Disabled</option>
                     <option value="permanently">Permanently Disabled</option>
                   </select>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1 flex items-center">
                     <Tractor className="h-3 w-3 mr-1" /> Farmer Status
                   </label>
                   <select 
                     {...register('farmerStatus', { required: true })}
                     className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-100 px-5 text-sm font-bold outline-none focus:bg-white"
                   >
                     <option value="no">Non-Farmer</option>
                     <option value="yes">Active Farmer</option>
                   </select>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1 flex items-center">
                     <BookOpen className="h-3 w-3 mr-1" /> Student Status
                   </label>
                   <select 
                     {...register('studentStatus', { required: true })}
                     className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-100 px-5 text-sm font-bold outline-none focus:bg-white"
                   >
                     <option value="no">Non-Student</option>
                     <option value="yes">Active Student</option>
                   </select>
                </div>
              </div>

              <div className="pt-6">
                <Button disabled={isLoading} className="w-full h-18 rounded-[1.5rem] text-sm font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-[1.01] bg-primary group">
                    {isLoading ? (
                        <>
                           <Loader2 className="h-5 w-5 animate-spin mr-3" /> 
                           Scanning Database...
                        </>
                    ) : (
                        <>
                           <Search className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                           Find Matched Schemes
                        </>
                    )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div id="results" className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          {!hasSearched ? (
            <div className="h-[400px] border-4 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/50 flex flex-col items-center justify-center text-center p-12 group transition-all hover:bg-white hover:border-primary/10">
               <div className="h-24 w-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center text-slate-200 group-hover:text-primary/20 group-hover:scale-110 transition-all duration-500">
                  <Search className="h-10 w-10" />
               </div>
               <div className="mt-8 space-y-2">
                  <h3 className="text-2xl font-black text-slate-300 tracking-tight">Eligibility Results</h3>
                  <p className="text-slate-400 font-medium max-w-sm">
                    Complete the profile form above to see your personalized list of eligible government schemes.
                  </p>
               </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-end justify-between px-4">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] leading-none">Discovery Complete</p>
                     <h3 className="text-3xl font-black text-primary tracking-tighter">Matched Schemes for You</h3>
                  </div>
                  <div className="px-6 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl flex items-center space-x-3 shadow-sm">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-xs font-black uppercase tracking-widest">{recommendations.length} Results Found</span>
                  </div>
              </div>

              {recommendations.length === 0 ? (
                <Card className="rounded-[2.5rem] border-slate-100 shadow-sm p-20 text-center bg-white/50 border-dashed">
                   <Info className="h-12 w-12 text-slate-300 mx-auto mb-6" />
                   <h4 className="text-xl font-bold text-slate-500">No matching schemes identified</h4>
                   <p className="text-slate-400 text-sm font-medium mt-2 max-w-xs mx-auto">
                      We couldn't find any direct matches for the current profile. Try adjusting your details or consult local offices.
                   </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {recommendations.map((scheme, idx) => (
                     <Card key={idx} className="group rounded-[2.5rem] border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white overflow-hidden border-t-8 border-t-emerald-500 flex flex-col">
                       <CardHeader className="p-8 pb-4">
                          <div className="flex justify-between items-start">
                             <CardTitle className="text-xl font-black text-primary group-hover:text-emerald-600 transition-colors">{scheme.name}</CardTitle>
                             <div className="h-8 w-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500 flex-shrink-0">
                                <CheckCircle2 className="h-5 w-5" />
                             </div>
                          </div>
                          <CardDescription className="text-sm font-medium text-slate-500 leading-relaxed pt-3">
                             {scheme.description}
                          </CardDescription>
                       </CardHeader>
                       <CardContent className="p-8 pt-4 flex-1 flex flex-col justify-between">
                          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100/50 group-hover:bg-emerald-50 transition-colors">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-3">Eligibility Logic</p>
                              <div className="flex items-start">
                                 <Info className="h-4 w-4 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                                 <p className="text-sm font-bold text-slate-600 leading-snug">{scheme.eligibilityReason}</p>
                              </div>
                          </div>
                          <Button variant="link" className="mt-8 p-0 h-auto text-primary font-black uppercase text-[10px] tracking-widest flex items-center group/btn">
                             Learn More & Application Guide <ArrowRight className="h-3 w-3 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                          </Button>
                       </CardContent>
                     </Card>
                   ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
