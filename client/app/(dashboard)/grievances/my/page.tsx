"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  Clock, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Building2, 
  MapPin, 
  ChevronRight,
  TrendingUp,
  History,
  Activity,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';
import grievanceService from '@/services/grievance.service';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Grievance {
  _id: string;
  title: string;
  category: string;
  department: string;
  description: string;
  location: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  createdAt: string;
}

const statusColors = {
  'pending': 'bg-amber-50 text-amber-600 border-amber-100',
  'in-progress': 'bg-blue-50 text-blue-600 border-blue-100',
  'resolved': 'bg-emerald-50 text-emerald-600 border-emerald-100',
  'rejected': 'bg-rose-50 text-rose-600 border-rose-100'
};

const statusIcons = {
  'pending': <Clock className="h-4 w-4" />,
  'in-progress': <Zap className="h-4 w-4" />,
  'resolved': <CheckCircle2 className="h-4 w-4" />,
  'rejected': <AlertCircle className="h-4 w-4" />
};

export default function MyGrievancesPage() {
  const router = useRouter();
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await grievanceService.getMyGrievances();
        setGrievances(response.data || []);
      } catch (error: any) {
        toast.error("Failed to fetch grievances");
      } finally {
        setIsLoading(false);
      }
    };
    fetchGrievances();
  }, []);

  const total = grievances.length;
  const pending = grievances.filter(g => g.status === 'pending' || g.status === 'in-progress').length;
  const resolved = grievances.filter(g => g.status === 'resolved').length;

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Civic Tracking System</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-primary tracking-tighter leading-none">
            My <span className="text-accent underline decoration-accent/20 italic">Resolutions.</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-xl">
            Monitor and manage your active civic reports and official applications.
          </p>
        </div>
        <Button 
          onClick={() => router.push('/grievances/submit')}
          className="rounded-[24px] h-16 px-8 font-black uppercase tracking-widest bg-primary shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 group"
        >
          <PlusCircle className="mr-2 h-6 w-6" />
          File New Grievance
          <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
        </Button>
      </motion.div>

      {/* Analytics Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-primary p-12 rounded-[48px] shadow-2xl shadow-primary/20 text-white relative overflow-hidden group"
      >
         <div className="absolute top-0 right-0 h-full w-1/2 bg-white/5 skew-x-[-20deg] translate-x-1/2 pointer-events-none transition-transform group-hover:translate-x-[40%] duration-1000" />
         <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
             {[
                 { label: "Total Complaints", val: total, icon: History, sub: "Total reports filed" },
                 { label: "Active Processing", val: pending, icon: Zap, sub: "Resolutions in progress" },
                 { label: "Successfully Resolved", val: resolved, icon: CheckCircle2, sub: "Verified resolutions" }
             ].map((stat, i) => (
                 <div key={i} className="flex items-center space-x-6">
                     <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                        <stat.icon size={32} className="text-accent" />
                     </div>
                     <div className="space-y-1">
                         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">{stat.label}</p>
                         <p className="text-5xl font-black tracking-tighter">{stat.val}</p>
                         <p className="text-xs font-bold text-white/30 italic">{stat.sub}</p>
                     </div>
                 </div>
             ))}
         </div>
      </motion.div>

      {/* Search & Filter */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-between bg-white border border-slate-100 p-2 rounded-[32px] shadow-sm overflow-hidden"
      >
          <div className="flex-1 flex items-center space-x-4 pl-6">
              <Search className="h-5 w-5 text-slate-300" />
              <input 
                type="text" 
                placeholder="Search resources, IDs, or departments..." 
                className="bg-transparent border-none outline-none w-full h-14 text-sm font-bold placeholder:text-slate-300"
              />
          </div>
          <div className="hidden sm:flex items-center space-x-2 pr-2">
              <Button variant="ghost" className="rounded-2xl h-12 px-6 font-black uppercase tracking-widest text-slate-400 text-[10px] hover:bg-slate-50">
                  <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
              <Button disabled className="rounded-2xl h-12 px-6 font-black uppercase tracking-widest bg-slate-100 text-slate-400 text-[10px]">
                  <TrendingUp className="h-4 w-4 mr-2" /> Export
              </Button>
          </div>
      </motion.div>

      {/* Grievance List */}
      <div className="space-y-8 min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader2 className="h-16 w-16 text-primary/10 animate-spin" />
              <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Synchronizing Records...</p>
          </div>
        ) : grievances.length === 0 ? (
          <Card className="rounded-[50px] border-dashed border-4 border-slate-100 bg-slate-50/20 flex flex-col items-center justify-center py-32 space-y-8 animate-in zoom-in duration-500">
              <div className="bg-white p-8 rounded-[32px] shadow-xl border border-slate-50">
                  <History className="h-12 w-12 text-slate-200" />
              </div>
              <div className="text-center space-y-2">
                  <h3 className="text-3xl font-black text-primary italic tracking-tight underline decoration-slate-100">No Records Discovered</h3>
                  <p className="text-slate-400 font-medium max-w-sm mx-auto italic">Submit your first report to start tracking civic resolutions and administrative actions.</p>
              </div>
              <Button 
                onClick={() => router.push('/grievances/submit')}
                className="rounded-2xl h-14 px-10 font-black uppercase tracking-widest shadow-xl shadow-primary/10"
              >
                Start Discovery Report
              </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            <AnimatePresence>
              {grievances.map((g, index) => (
                <motion.div
                  key={g._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group rounded-[40px] border border-slate-100 hover:shadow-2xl transition-all duration-700 overflow-hidden bg-white">
                    <CardContent className="p-10">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
                          <div className="space-y-6 flex-1">
                              <div className="flex items-center space-x-3">
                                  <div className={cn(
                                      "flex items-center space-x-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm",
                                      statusColors[g.status]
                                  )}>
                                      {statusIcons[g.status]}
                                      <span>Status: {g.status}</span>
                                  </div>
                                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">REF-ID: {g._id.slice(-12).toUpperCase()}</span>
                              </div>
                              
                              <div className="space-y-4">
                                  <h3 className="text-3xl font-black text-primary leading-tight group-hover:text-accent transition-colors">{g.title}</h3>
                                  <div className="flex flex-wrap items-center gap-4">
                                      <div className="flex items-center text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                                          <Building2 className="h-4 w-4 mr-2 text-primary/40" />
                                          {g.department}
                                      </div>
                                      <div className="flex items-center text-xs font-bold text-slate-400 px-4 py-2 border border-slate-50 rounded-2xl">
                                          <MapPin className="h-4 w-4 mr-2 text-rose-400" />
                                          {g.location}
                                      </div>
                                      <div className="text-xs font-black uppercase tracking-widest text-slate-300 pl-2">
                                          {new Date(g.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                      </div>
                                  </div>
                              </div>

                              <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 group-hover:bg-accent/5 transition-colors">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Report Context</p>
                                 <p className="text-slate-600 font-medium leading-relaxed italic">"{g.description.length > 180 ? g.description.substring(0, 180) + '...' : g.description}"</p>
                              </div>
                          </div>

                          <div className="flex flex-col items-center justify-center border-l border-slate-50 pl-10 hidden md:flex">
                              <Button 
                                variant="ghost" 
                                className="rounded-[32px] h-20 w-20 flex flex-col p-0 hover:bg-primary hover:text-white transition-all text-primary border border-slate-100 shadow-sm"
                              >
                                  <ChevronRight className="h-8 w-8 transition-transform group-hover:translate-x-1" />
                                  <span className="text-[8px] font-black uppercase tracking-widest mt-1">Details</span>
                              </Button>
                          </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
