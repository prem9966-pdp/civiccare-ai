"use client"

import React, { useState, useEffect } from 'react';
import { AdminStats } from '@/components/admin/admin-stats';
import { DataTable } from '@/components/admin/data-table';
import adminService from '@/services/admin.service';
import { 
  ShieldCheck, 
  Activity, 
  TrendingUp, 
  Globe, 
  MapPin, 
  BookOpen, 
  AlertCircle,
  Clock,
  ChevronRight,
  TrendingDown,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const statsRes = await adminService.getSummary();
      const usersRes = await adminService.getUsers();
      if (statsRes.success) setStats(statsRes.data);
      if (usersRes.success) setUsers(usersRes.data);
    } catch (error) {
      console.error("Failed to load admin analytics", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-12 pb-24 h-full">
        {/* Analytics Header */}
        <section className="flex flex-col md:flex-row md:items-end justify-between px-2 gap-8">
            <div className="space-y-3">
               <h1 className="text-5xl font-black text-primary tracking-tighter">
                  Analytics <span className="text-accent underline decoration-accent/20 tracking-tighter">Hub</span>
               </h1>
               <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
                  Global observation tower for CivicCare AI. Monitoring citizen engagement, scheme catalogs, and regional health readiness.
               </p>
            </div>
            <div className="flex items-center space-x-6 bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100/50 hover:shadow-2xl transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-1000"></div>
                <div className="h-14 w-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center relative z-10 transition-transform group-hover:rotate-12">
                   <TrendingUp className="h-8 w-8" />
                </div>
                <div className="relative z-10 text-right">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Global Growth</p>
                   <p className="text-2xl font-black text-primary mt-1 tracking-tighter">Live Monitor</p>
                </div>
            </div>
        </section>

        {stats && <AdminStats stats={stats} />}

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Citizen Registry Overlay (8/12) */}
            <div className="lg:col-span-8 space-y-12">
                <DataTable 
                    title="Citizen" 
                    columns={['Name', 'City', 'LanguagePreference', 'Role']} 
                    data={users} 
                    isLoading={isLoading} 
                />
            </div>

            {/* Sidebar High-Engagement Monitor (4/12) */}
            <div className="lg:col-span-4 h-full space-y-10">
                <div className="bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 group-hover:bg-primary/30 transition-all pointer-events-none"></div>
                    <div className="relative z-10 space-y-8">
                        <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                            <Activity className="h-7 w-7 text-accent animate-pulse" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-3xl font-black text-white tracking-tighter">Emergency <span className="text-red-400">Load</span></h3>
                            <p className="text-xs font-bold text-white/50 leading-relaxed">System-wide monitoring of critical health inquiries in real-time.</p>
                        </div>
                        <div className="space-y-4">
                            {[
                                { city: 'Delhi', load: '82%', color: 'bg-red-400' },
                                { city: 'Mumbai', load: '45%', color: 'bg-accent' },
                                { city: 'Bangalore', load: '22%', color: 'bg-emerald-400' },
                            ].map(loc => (
                                <div key={loc.city} className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase text-white/60 tracking-widest">
                                        <span>{loc.city} Hub</span>
                                        <span>{loc.load}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className={cn("h-full", loc.color)} style={{ width: loc.load }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full h-12 rounded-xl bg-white text-primary text-[10px] font-black uppercase tracking-widest flex items-center justify-center hover:bg-slate-50 transition-all active:scale-95">
                           Dispatch Alert Hub <ChevronRight className="h-4 w-4 ml-2" />
                        </button>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-8 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 h-48 w-48 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center space-x-6 relative z-10">
                        <div className="h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                            <Layers className="h-7 w-7" />
                        </div>
                        <h3 className="text-2xl font-black text-primary tracking-tighter leading-tight">Catalog <br />Health Status</h3>
                    </div>
                    <div className="space-y-4 relative z-10 transition-all">
                        {[
                            { label: 'Scheme Indexing', status: 'Operational', color: 'text-emerald-500' },
                            { label: 'Map Proximity', status: 'Updating...', color: 'text-amber-500' },
                            { label: 'Document Vault', status: 'Locked', color: 'text-emerald-500' },
                        ].map(info => (
                             <div key={info.label} className="flex justify-between items-center py-2">
                                <span className="text-xs font-black uppercase tracking-widest text-slate-400">{info.label}</span>
                                <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]", info.color)}>{info.status}</span>
                             </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
}
