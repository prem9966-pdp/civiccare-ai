"use client"

import React, { useState, useEffect } from 'react';
import { RecommendationResults } from '@/components/dashboard/recommendation-results';
import recommendationService from '@/services/recommendation.service';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Loader2, Sparkles, Activity, ArrowRight, UserCircle } from 'lucide-react';
import Link from 'next/link';

export default function RecommendationPage() {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await recommendationService.getPersonalizedMatches();
        if (response.success) {
          setRecommendations(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch recommendations", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <ProtectedRoute>
      <div className="space-y-12 pb-24">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between p-12 bg-primary rounded-[3rem] text-white relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 h-64 w-64 bg-accent opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000"></div>
          <div className="absolute bottom-0 left-0 h-32 w-32 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="space-y-4 relative z-10">
            <h1 className="text-5xl font-black tracking-tighter">
                AI <span className="text-accent underline decoration-accent/20">Discovery</span> Engine
            </h1>
            <p className="text-xl text-white/60 font-medium max-w-2xl leading-relaxed">
                Personalized benefits and welfare programs mapped directly to your citizen credentials.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 group shadow-xl transition-all relative z-10">
               <Sparkles className="h-12 w-12 text-accent animate-pulse mb-2" />
               <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60 mb-2">Algorithm Version</p>
               <p className="text-2xl font-black text-white">v1.2.4 Active</p>
          </div>
        </section>

        {/* Informational Alerts */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center space-x-4">
                <div className="h-10 w-10 bg-white border rounded-xl flex items-center justify-center text-primary shadow-sm">
                    <UserCircle className="h-5 w-5" />
                </div>
                <div>
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Profile Driven</p>
                   <p className="text-sm font-bold text-primary mt-1">Based on location & age</p>
                </div>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center space-x-4">
                <div className="h-10 w-10 bg-white border rounded-xl flex items-center justify-center text-primary shadow-sm">
                    <Activity className="h-5 w-5" />
                </div>
                <div>
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Live Analysis</p>
                   <p className="text-sm font-bold text-primary mt-1">Real-time DB synchronization</p>
                </div>
            </div>
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center space-x-4">
                <div className="h-10 w-10 bg-white border rounded-xl flex items-center justify-center text-emerald-600 shadow-sm font-black text-xs">
                    95%
                </div>
                <div>
                   <p className="text-xs font-black text-emerald-600 uppercase tracking-widest leading-none">Confidence Level</p>
                   <p className="text-sm font-bold text-emerald-700 mt-1">High recommendation accuracy</p>
                </div>
            </div>
        </section>

        {/* Results List */}
        <section className="space-y-12">
            <div className="flex items-baseline justify-between px-2">
                <h2 className="text-2xl font-black text-primary tracking-tight">Personalized Recommendations</h2>
                <Link href="/dashboard/profile" className="text-[10px] font-black uppercase text-slate-400 hover:text-primary tracking-[0.2em] flex items-center transition-colors">
                    Edit Credentials <ArrowRight className="h-3 w-3 ml-2" />
                </Link>
            </div>

            {isLoading ? (
                <div className="h-96 w-full flex flex-col items-center justify-center space-y-4 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-100">
                    <Loader2 className="h-10 w-10 text-primary animate-spin" />
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 animate-pulse">Running Eligibility Algorithms...</p>
                </div>
            ) : (recommendations.length === 0 ? (
                <div className="h-96 w-full flex flex-col items-center justify-center space-y-4 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-100">
                    <p className="text-lg font-bold text-slate-500">No matching schemes for your profile.</p>
                    <Link href="/dashboard/profile" className="text-sm font-black text-primary hover:underline">Complete your profile to find better matches</Link>
                </div>
            ) : (
                <RecommendationResults recommendations={recommendations} />
            ))}
        </section>
      </div>
    </ProtectedRoute>
  );
}
