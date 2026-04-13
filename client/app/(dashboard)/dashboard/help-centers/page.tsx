"use client"

import React, { useState, useEffect } from 'react';
import { HospitalList } from '@/components/dashboard/hospital-list';
import { HospitalMapMock } from '@/components/dashboard/hospital-map-mock';
import hospitalService from '@/services/hospital.service';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Landmark, Compass, Target, ArrowRight, Activity, MapPin, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HelpCentersPage() {
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await hospitalService.getHospitals({});
        if (response.success) {
          setHospitals(response.data);
          if (response.data.length > 0) setActiveId(response.data[0]._id);
        }
      } catch (error) {
        console.error("Failed to load map data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex flex-col space-y-8 h-[calc(100vh-140px)]">
        {/* Responsive Header Hub */}
        <section className="flex flex-col md:flex-row md:items-end justify-between px-2 gap-8 shrink-0">
            <div className="space-y-3">
               <h1 className="text-5xl font-black text-primary tracking-tighter">
                  Location <span className="text-accent underline decoration-accent/20 tracking-tighter">Discovery</span>
               </h1>
               <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
                  Find nearest hospitals, emergency help centers, and regional health offices optimized for your safety.
               </p>
            </div>
            <div className="flex items-center space-x-6 bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100/50 hover:shadow-2xl transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-1000"></div>
                <div className="h-14 w-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center relative z-10">
                    <Compass className="h-8 w-8 animate-spin-slow" />
                </div>
                <div className="relative z-10 text-right">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Map Engine</p>
                   <p className="text-2xl font-black text-primary mt-1 tracking-tighter">Proximity v2.1</p>
                </div>
            </div>
        </section>

        {/* Interactive Discovery Grid */}
        <section className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
            {/* List Section: Sidebar (4/12) */}
            <div className="lg:col-span-4 h-full min-h-0 animate-in slide-in-from-left-4 duration-700">
                <HospitalList 
                  hospitals={hospitals} 
                  activeId={activeId} 
                  onSelect={setActiveId} 
                  isLoading={isLoading} 
                />
            </div>

            {/* Map Section: Main (8/12) */}
            <div className="lg:col-span-8 h-full min-h-0 animate-in fade-in duration-1000 delay-300">
                <HospitalMapMock 
                  hospitals={hospitals} 
                  activeId={activeId} 
                  onSelect={setActiveId} 
                />
            </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
