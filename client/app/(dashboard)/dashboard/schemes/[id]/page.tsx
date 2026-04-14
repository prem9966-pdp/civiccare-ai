"use client"

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import schemeService from '@/services/scheme.service';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { EligibilityScore } from '@/components/dashboard/eligibility-score';
import { SaveSchemeButton } from '@/components/dashboard/save-scheme-button';
import { Loader2, ArrowLeft, Landmark, FileText, CheckCircle2, ChevronRight, Share2, Printer, ExternalLink, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function SchemeDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [scheme, setScheme] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const response = await schemeService.getSchemeById(id as string);
        if (response.success) {
          setScheme(response.data);
        }
      } catch (error) {
        console.error("Failed to load scheme details", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (isLoading) return (
    <div className="h-screen w-full flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Loading Deep Audit Data...</p>
    </div>
  );

  if (!scheme) return <p>Scheme not found.</p>;

  return (
    <ProtectedRoute>
      <div className="space-y-12 pb-24">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <button 
                onClick={() => router.back()} 
                className="flex items-center space-x-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all group"
            >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
                <span>Back to Discovery</span>
            </button>
            <div className="flex items-center space-x-4">
                <SaveSchemeButton schemeId={scheme._id} initialSaved={false} variant="outline" className="shadow-lg h-11" />
                <Button variant="outline" size="sm" className="h-11 w-11 p-0 rounded-xl shadow-lg border border-slate-100 hover:bg-slate-50 transition-all flex items-center justify-center text-primary">
                    <Printer className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="h-11 w-11 p-0 rounded-xl shadow-lg border border-slate-100 hover:bg-slate-50 transition-all flex items-center justify-center text-primary">
                    <Share2 className="h-4 w-4" />
                </Button>
            </div>
        </div>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 flex flex-col justify-center space-y-10 animate-in fade-in slide-in-from-left-4 duration-700">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/20">
                        <Landmark className="h-8 w-8" />
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-black text-primary tracking-tighter leading-none">{scheme.title}</h1>
                    <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">{scheme.description}</p>
                </motion.div>

                <div className="flex flex-wrap gap-3">
                    {scheme.targetGroups.map((tag: string) => (
                        <span key={tag} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black text-slate-400 uppercase tracking-widest shadow-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center animate-in fade-in slide-in-from-right-4 duration-700">
                <EligibilityScore score={scheme.eligibilityScore} className="p-8 rounded-[3rem] shadow-2xl border-4 scale-110" />
            </div>
        </section>

        {/* Content Tabs/Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-12">
                {/* Benefits */}
                <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden">
                    <CardHeader className="bg-emerald-500 p-8 text-white relative">
                        <div className="absolute top-0 right-0 h-32 w-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <CardTitle className="text-2xl font-black tracking-tight flex items-center">
                            <CheckCircle2 className="h-6 w-6 mr-3" /> Scheme Benefits
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {scheme.benefits.map((benefit: string, i: number) => (
                            <div key={i} className="flex flex-col space-y-2 group">
                                <span className="text-emerald-500 font-black text-xl leading-none transition-transform group-hover:scale-110 inline-block w-fit">0{i+1}</span>
                                <p className="text-sm font-bold text-slate-600 leading-relaxed font-medium tracking-tight group-hover:text-primary transition-colors">{benefit}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Steps */}
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h2 className="text-2xl font-black text-primary tracking-tight px-4 flex items-center">
                         <Activity className="h-6 w-6 mr-3 text-accent" /> Steps to Avail the Program
                    </h2>
                    <div className="space-y-4">
                        {scheme.stepsToApply.map((step: string, i: number) => (
                            <div key={i} className="flex items-center space-x-6 p-6 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:shadow-xl hover:border-accent/10 transition-all group">
                                <div className="h-10 w-10 min-w-[2.5rem] rounded-xl bg-primary text-white flex items-center justify-center font-black text-sm shadow-lg group-hover:bg-accent transition-all ring-offset-4 ring-primary/5 group-hover:ring-accent/10">
                                    {i+1}
                                </div>
                                <p className="text-sm font-bold text-slate-600 leading-relaxed font-medium tracking-tight group-hover:text-primary transition-colors">{step}</p>
                                <ChevronRight className="h-4 w-4 text-slate-200 ml-auto group-hover:text-primary" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Content (Audit Sidebar) */}
            <div className="space-y-12">
                {/* Documents */}
                <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden border-b-4 border-b-primary">
                    <CardHeader className="p-8 border-b border-slate-50">
                        <CardTitle className="text-xl font-black tracking-tight text-primary flex items-center">
                            <FileText className="h-5 w-5 mr-3 text-accent" /> Required KYC
                        </CardTitle>
                        <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-400">Documentation Checklist</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-4">
                        {scheme.requiredDocs.map((doc: string) => (
                            <div key={doc} className="flex items-center space-x-4 p-4 bg-slate-50/50 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all cursor-pointer group">
                                <div className="h-2 w-2 rounded-full bg-slate-200 group-hover:bg-accent transition-all"></div>
                                <span className="text-xs font-bold text-slate-500 group-hover:text-primary transition-colors">{doc}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Call to Action */}
                <div className="bg-slate-800 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 h-48 w-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-all duration-1000"></div>
                     <div className="relative z-10 space-y-6">
                        <h3 className="text-2xl font-black text-white tracking-tighter">Ready to Apply?</h3>
                        <p className="text-sm text-slate-400 font-medium leading-relaxed">Proceed to the official government portal for this scheme. Ensure you have all documents ready.</p>
                        <Button size="lg" className="w-full rounded-2xl bg-accent text-primary hover:bg-accent/90 shadow-xl group/btn" asChild>
                           <a href={scheme.officialUrl || "#"} target="_blank" rel="noopener noreferrer">
                               Apply via Portal <ExternalLink className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-all" />
                           </a>
                        </Button>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
