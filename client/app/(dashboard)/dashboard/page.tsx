"use client"

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  MapPin, 
  Search, 
  User, 
  Bookmark, 
  Eye, 
  Hospital, 
  ArrowRight,
  LayoutDashboard,
  Clock,
  ShieldCheck,
  Zap
} from "lucide-react";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Services
import grievanceService from '@/services/grievance.service';
import hospitalService from '@/services/hospital.service';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    grievances: 0,
    hospitals: 0,
    savedSchemes: 12, // Mock or from service
    schemesViewed: 48  // Mock
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [grievanceRes, hospitalRes] = await Promise.all([
          grievanceService.getMyGrievances().catch(() => ({ data: [] })),
          hospitalService.getHospitals({ city: 'Mumbai' }).catch(() => ({ data: [] }))
        ]);

        setStats(prev => ({
          ...prev,
          grievances: grievanceRes.data?.length || 0,
          hospitals: hospitalRes.data?.length || 0,
        }));
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="h-12 w-12 border-4 border-slate-100 border-t-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <ProtectedRoute>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-12 pb-12"
      >
        {/* 1. Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
              <Zap className="h-3.5 w-3.5 text-accent" />
              <span className="text-[10px] font-black uppercase tracking-widest text-accent">Citizen Portal Active</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight">
              Welcome back, <span className="text-accent">{user?.name?.split(' ')[0] || 'Citizen'}</span>
            </h1>
            <p className="text-muted-foreground font-medium text-lg">
              Here's a quick look at your civic activity and available resources.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex items-center space-x-3">
             <div className="px-4 py-2 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-bold text-slate-600 tracking-tight">Identity Verified</span>
             </div>
             <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20">
                <LayoutDashboard size={24} />
             </div>
          </motion.div>
        </section>

        {/* 2. Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Saved Schemes', value: stats.savedSchemes, icon: Bookmark, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Schemes Viewed', value: stats.schemesViewed, icon: Eye, color: 'text-violet-600', bg: 'bg-violet-50' },
            { label: 'Grievances', value: stats.grievances, icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Nearby Hospitals', value: stats.hospitals, icon: Hospital, color: 'text-rose-600', bg: 'bg-rose-50' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center space-x-5 group transition-all hover:shadow-xl hover:border-accent/10"
            >
              <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", stat.bg)}>
                <stat.icon className={cn("h-7 w-7", stat.color)} />
              </div>
              <div>
                <p className="text-3xl font-black text-primary tracking-tight">
                  {loading ? '...' : stat.value}
                </p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* 3. Quick Actions Grid */}
        <section className="space-y-6">
          <motion.div variants={itemVariants} className="flex items-center justify-between px-2">
             <h2 className="text-2xl font-black text-primary tracking-tight italic">Quick Actions</h2>
             <span className="h-0.5 flex-1 mx-6 bg-slate-50" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Scheme Finder', icon: Search, href: '/dashboard/schemes', desc: 'Find eligible programs' },
              { title: 'Healthcare Map', icon: MapPin, href: '/healthcare-map', desc: 'Locate nearby aid' },
              { title: 'Grievance Portal', icon: FileText, href: '/grievances/submit', desc: 'Report civic issues' },
              { title: 'My Profile', icon: User, href: '/dashboard/profile', desc: 'Manage your data' }
            ].map((action, i) => (
              <motion.div key={action.title} variants={itemVariants}>
                <div 
                  onClick={() => router.push(action.href)} 
                  className="group block cursor-pointer"
                >
                  <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 group-hover:bg-primary group-hover:border-primary relative overflow-hidden h-full">
                    <div className="absolute -right-4 -top-4 bg-accent/10 h-24 w-24 rounded-full group-hover:bg-white/10 transition-colors" />
                    
                    <div className="relative z-10 space-y-4">
                      <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-500">
                        <action.icon className="h-7 w-7 text-primary group-hover:text-accent" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-primary group-hover:text-white transition-colors">{action.title}</h3>
                        <p className="text-sm text-muted-foreground group-hover:text-white/60 transition-colors">{action.desc}</p>
                      </div>
                      <div className="pt-2">
                        <ArrowRight className="h-5 w-5 text-primary group-hover:text-white group-hover:translate-x-2 transition-all opacity-0 group-hover:opacity-100" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Recent Activity & Placeholder List */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
             <div className="flex items-center justify-between mb-8">
               <h2 className="text-2xl font-black text-primary tracking-tight italic">Recent Activity</h2>
               <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-accent hover:bg-accent/5">View History</Button>
             </div>
             
             <div className="space-y-6">
                {[
                  { title: 'Scheme Verification', desc: 'Applied for PM KISAN Yojana verification.', time: '2 hours ago', status: 'Pending', icon: Clock },
                  { title: 'Hospital Inquiry', desc: 'Searched for Specialist in Mumbai Central.', time: '5 hours ago', status: 'Completed', icon: MapPin },
                  { title: 'Document Uploaded', desc: 'ID Proof successfully added to vault.', time: '1 day ago', status: 'Verified', icon: ShieldCheck }
                ].map((act, i) => (
                  <div key={i} className="flex items-center justify-between p-5 rounded-3xl bg-slate-50/50 border border-transparent hover:border-slate-100 hover:bg-white transition-all group cursor-default">
                    <div className="flex items-center space-x-5">
                      <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-primary transition-colors">
                        <act.icon className="h-5 w-5 text-primary group-hover:text-white" />
                      </div>
                      <div>
                         <h4 className="font-bold text-primary">{act.title}</h4>
                         <p className="text-sm text-slate-500 font-medium">{act.desc}</p>
                      </div>
                    </div>
                    <div className="text-center hidden sm:block">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{act.time}</p>
                      <span className={cn(
                        "text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter",
                        act.status === 'Verified' ? "bg-emerald-100 text-emerald-600" :
                        act.status === 'Pending' ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                      )}>
                        {act.status}
                      </span>
                    </div>
                  </div>
                ))}
             </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -z-0" />
            <div className="relative z-10 space-y-6">
               <div className="h-14 w-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                 <Zap className="h-7 w-7 text-accent" />
               </div>
               <h3 className="text-3xl font-black leading-[1.1]">AI Insights <br /><span className="text-accent underline decoration-white/20">Available</span></h3>
               <p className="text-white/60 font-medium leading-relaxed italic">
                 "Based on your profile, you are eligible for 3 new health-related subsidies in Maharashtra."
               </p>
               <Button className="w-full bg-accent hover:bg-accent/80 text-white rounded-2xl h-14 font-black text-sm uppercase tracking-widest">
                  Try AI Assist
               </Button>
            </div>
          </motion.div>
        </section>
      </motion.div>
    </ProtectedRoute>
  );
}
