"use client"

import React, { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Search, 
  Phone, 
  Building2, 
  Loader2, 
  Navigation, 
  Activity, 
  Landmark,
  AlertCircle,
  Stethoscope,
  HeartPulse,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';
import hospitalService from '@/services/hospital.service';
import { HospitalMap } from '@/components/dashboard/hospital-map';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Hospital {
  _id: string;
  name: string;
  type: string;
  city: string;
  area: string;
  address: string;
  phone: string;
  specialty: string;
  mapLink: string;
  latitude: number;
  longitude: number;
}

export default function HealthcareMapPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const [filters, setFilters] = useState({
    city: 'Mumbai',
    area: '',
    type: 'all'
  });

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);
    try {
      const queryParams: any = {
        city: filters.city || 'Mumbai',
        area: filters.area,
      };
      if (filters.type !== 'all') queryParams.type = filters.type;

      const response = await hospitalService.getHospitals(queryParams);
      const rawData = response.data || [];
      const normalized = rawData.map((h: any) => ({
        ...h,
        latitude: Number(h.latitude || h.lat),
        longitude: Number(h.longitude || h.lng)
      })).filter((h: any) => !isNaN(h.latitude) && !isNaN(h.longitude));

      setHospitals(normalized);
      if (normalized.length > 0) setActiveId(normalized[0]._id);
      else toast.info("No centers found for your search.");
    } catch (error) {
      toast.error("Failed to connect to healthcare registry.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto space-y-8 pb-20">
        {/* Emergency Alert Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-rose-500 rounded-[32px] p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-rose-200"
        >
           <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                 <AlertCircle className="h-6 w-6 animate-pulse" />
              </div>
              <div>
                 <h2 className="text-xl font-black uppercase tracking-tight">Emergency Assistance</h2>
                 <p className="text-sm font-medium opacity-90">Instant access to critical aid numbers</p>
              </div>
           </div>
           <div className="flex flex-wrap gap-4 justify-center">
              {[
                { label: 'Ambulance', num: '102', icon: Activity },
                { label: 'Emergency', num: '112', icon: Phone },
                { label: 'Medical Helpline', num: '1075', icon: HeartPulse }
              ].map((item) => (
                <div key={item.num} className="bg-white/10 px-5 py-3 rounded-2xl flex items-center space-x-3 backdrop-blur-sm border border-white/10">
                   <item.icon className="h-5 w-5" />
                   <div className="text-left leading-none">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">{item.label}</p>
                      <p className="text-lg font-black">{item.num}</p>
                   </div>
                </div>
              ))}
           </div>
        </motion.div>

        {/* Search Header Section */}
        <section className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col lg:flex-row items-center gap-8">
           <div className="lg:w-1/3 space-y-2">
              <h1 className="text-4xl font-black text-primary tracking-tighter italic">Healthcare <span className="text-accent underline decoration-accent/20">Discovery</span></h1>
              <p className="text-muted-foreground font-medium">Find hospitals and aid centers near you.</p>
           </div>
           
           <form onSubmit={handleSearch} className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
              <div className="relative group">
                 <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                 <Input 
                   placeholder="City" 
                   value={filters.city}
                   onChange={(e) => setFilters({...filters, city: e.target.value})}
                   className="h-14 pl-12 rounded-2xl bg-slate-50 border-none font-bold focus:ring-2 focus:ring-primary/20"
                 />
              </div>
              <div className="relative group">
                 <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                 <Input 
                   placeholder="Area" 
                   value={filters.area}
                   onChange={(e) => setFilters({...filters, area: e.target.value})}
                   className="h-14 pl-12 rounded-2xl bg-slate-50 border-none font-bold focus:ring-2 focus:ring-primary/20"
                 />
              </div>
              <select 
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="h-14 rounded-2xl bg-slate-50 border-none px-4 text-sm font-bold outline-none cursor-pointer focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">All Types</option>
                <option value="government">Government</option>
                <option value="private">Private</option>
              </select>
              <Button type="submit" disabled={isLoading} className="h-14 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]">
                 {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
              </Button>
           </form>
        </section>

        {/* Map and List Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
           {/* Map Perspective */}
           <div className="lg:col-span-8 h-[600px] rounded-[40px] overflow-hidden border border-slate-100 shadow-2xl relative">
              {isLoading ? (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                   <div className="h-16 w-16 border-4 border-slate-100 border-t-accent rounded-full animate-spin"></div>
                   <p className="mt-4 font-black uppercase tracking-widest text-primary italic">Updating Map Layers...</p>
                </div>
              ) : null}
              <HospitalMap 
                hospitals={hospitals} 
                activeId={activeId} 
                onSelect={setActiveId} 
              />
           </div>

           {/* Hospital List Sidebar */}
           <div className="lg:col-span-4 space-y-6 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-xl font-black text-primary tracking-tighter italic">Nearby Centers</h3>
                 <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black">{hospitals.length} Found</span>
              </div>

              {hospitals.length === 0 && !isLoading ? (
                <Card className="p-8 text-center rounded-3xl border-slate-100">
                   <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-4">
                      <Search size={32} />
                   </div>
                   <h4 className="font-bold text-primary">No centers discovered</h4>
                   <p className="text-sm text-slate-400">Try adjusting your filters or search area.</p>
                </Card>
              ) : (
                hospitals.map((h, i) => (
                  <motion.div
                    key={h._id || i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card 
                      onClick={() => setActiveId(h._id)}
                      className={cn(
                        "rounded-[28px] cursor-pointer transition-all border-2 p-1 overflow-hidden",
                        activeId === h._id ? "border-primary bg-white shadow-xl scale-[1.02]" : "border-transparent bg-white shadow-sm hover:border-slate-100 hover:shadow-md"
                      )}
                    >
                       <div className="p-5 space-y-4">
                          <div className="flex items-center justify-between">
                             <div className={cn(
                               "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest",
                               h.type === 'government' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-primary/5 text-primary border border-primary/10"
                             )}>
                               {h.type}
                             </div>
                             {h.type === 'government' ? <Landmark className={cn("h-4 w-4", activeId === h._id ? "text-primary" : "text-slate-200")} /> : <Activity className={cn("h-4 w-4", activeId === h._id ? "text-primary" : "text-slate-200")} />}
                          </div>
                          
                          <div>
                            <h4 className="font-black text-primary line-clamp-1">{h.name}</h4>
                            <p className="text-[10px] font-bold text-muted-foreground flex items-center mt-1">
                               <MapPin className="h-3 w-3 mr-1 text-primary/40" /> {h.area}, {h.city}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 gap-2">
                             <div className="bg-slate-50/50 p-3 rounded-2xl border border-slate-50">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Contact</p>
                                <p className="text-xs font-bold text-primary">{h.phone}</p>
                             </div>
                          </div>

                          <div className="flex items-center gap-2 pt-2">
                             <Button 
                               asChild 
                               size="sm" 
                               className="flex-1 rounded-xl bg-primary text-white h-10 font-bold text-[10px] uppercase"
                             >
                               <a href={h.mapLink} target="_blank" rel="noopener noreferrer">
                                  <Navigation className="h-3 w-3 mr-1.5" /> Direct Navigate
                               </a>
                             </Button>
                          </div>
                       </div>
                    </Card>
                  </motion.div>
                ))
              )}
           </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
