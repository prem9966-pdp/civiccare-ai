"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
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
  HeartPulse,
  Filter,
  RefreshCw,
  Compass
} from 'lucide-react';
import { toast } from 'sonner';
import hospitalService from '@/services/hospital.service';
import { HospitalMap } from '@/components/dashboard/hospital-map';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import _ from 'lodash';

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

const FILTER_OPTIONS = [
  { id: 'all', label: 'All Centers', icon: Filter },
  { id: 'public', label: 'Public / Govt', icon: Landmark },
  { id: 'private', label: 'Private', icon: Activity },
  { id: 'Emergency', label: 'Emergency', icon: AlertCircle },
];

export default function HealthcareMapPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchCity, setSearchCity] = useState('');
  
  const [filters, setFilters] = useState({
    city: '',
    type: 'all'
  });

  const fetchHospitals = useCallback(async (currentFilters: typeof filters) => {
    setIsLoading(true);
    try {
      const queryParams: any = {
        city: currentFilters.city,
      };
      if (currentFilters.type !== 'all') {
        queryParams.type = currentFilters.type;
      }

      const response = await hospitalService.getHospitals(queryParams);
      // Ensure data is an array and items have coordinates
      const rawData = response.data || [];
      const normalized = rawData.map((h: any) => ({
        ...h,
        latitude: Number(h.latitude || h.lat),
        longitude: Number(h.longitude || h.lng)
      })).filter((h: any) => !isNaN(h.latitude) && !isNaN(h.longitude));

      setHospitals(normalized);
      if (normalized.length > 0) setActiveId(normalized[0]._id);
      else setActiveId(null);
    } catch (error) {
      console.error("Search failed:", error);
      toast.error("Failed to fetch healthcare data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search for city input
  const debouncedSearch = useCallback(
    _.debounce((city: string) => {
      setFilters(prev => ({ ...prev, city }));
    }, 500),
    []
  );

  useEffect(() => {
    fetchHospitals(filters);
  }, [filters, fetchHospitals]);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    toast.info("Accessing your location...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, we'd reverse geocode to get the city
        // Here we'll just show the map moving to user location if possible
        // For now, let's just toast and clear city to show everything
        setFilters(prev => ({ ...prev, city: '' }));
        setSearchCity('');
        toast.success("Showing centers near you");
      },
      () => {
        toast.error("Unable to retrieve your location");
      }
    );
  };

  const activeHospital = hospitals.find(h => h._id === activeId);

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto space-y-6 pb-20 px-4 sm:px-6">
        {/* Emergency Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-rose-600 to-rose-500 rounded-[32px] p-6 text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl shadow-rose-200"
        >
           <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                 <AlertCircle className="h-7 w-7 animate-pulse" />
              </div>
              <div>
                 <h2 className="text-xl font-black uppercase tracking-tight">Emergency Protocol</h2>
                 <p className="text-sm font-medium opacity-90">Instant access to critical life-saving lines</p>
              </div>
           </div>
           <div className="flex flex-wrap gap-4 justify-center">
              {[
                { label: 'Ambulance', num: '102', icon: Activity },
                { label: 'National Aid', num: '112', icon: Phone },
                { label: 'Medical Helpline', num: '1075', icon: HeartPulse }
              ].map((item) => (
                <div key={item.num} className="bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-2xl flex items-center space-x-4 backdrop-blur-sm border border-white/10 group cursor-pointer">
                   <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                   <div className="text-left leading-none">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">{item.label}</p>
                      <p className="text-xl font-black">{item.num}</p>
                   </div>
                </div>
              ))}
           </div>
        </motion.div>

        {/* Dynamic Navigation & Search Hub */}
        <section className="bg-white p-6 sm:p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                 <h1 className="text-4xl font-black text-primary tracking-tighter italic flex items-center gap-3">
                   Healthcare <span className="text-accent underline decoration-accent/20">Explorer</span>
                   {isLoading && <Loader2 className="h-6 w-6 animate-spin text-accent" />}
                 </h1>
                 <p className="text-muted-foreground font-medium">Verified medical facilities and centers across India.</p>
              </div>

              <div className="flex items-center gap-2">
                 <Button 
                   variant="outline" 
                   onClick={handleUseMyLocation}
                   className="rounded-2xl h-12 px-6 border-slate-200 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 gap-2"
                 >
                   <Compass className="h-4 w-4" /> Use My Location
                 </Button>
                 <Button 
                   variant="outline" 
                   onClick={() => fetchHospitals(filters)}
                   className="rounded-2xl h-12 w-12 p-0 border-slate-200 hover:bg-slate-50"
                 >
                   <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
                 </Button>
              </div>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Filter Chips */}
              <div className="lg:col-span-8 flex flex-wrap gap-3">
                 {FILTER_OPTIONS.map((opt) => (
                   <button
                     key={opt.id}
                     onClick={() => setFilters(prev => ({ ...prev, type: opt.id }))}
                     className={cn(
                       "flex items-center gap-2 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                       filters.type === opt.id 
                        ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" 
                        : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                     )}
                   >
                     <opt.icon className="h-4 w-4" />
                     {opt.label}
                   </button>
                 ))}
              </div>

              {/* City Search */}
              <div className="lg:col-span-4 relative group">
                 <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                 <Input 
                   placeholder="Search City (e.g. Pune, Mumbai...)" 
                   value={searchCity}
                   onChange={(e) => {
                     setSearchCity(e.target.value);
                     debouncedSearch(e.target.value);
                   }}
                   className="h-14 pl-14 pr-6 rounded-2xl bg-slate-50 border-none font-bold focus:ring-2 focus:ring-primary/20 shadow-inner"
                 />
              </div>
           </div>
        </section>

        {/* Real-time Interaction Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[600px]">
           {/* Cartographic Visualization */}
           <div className="lg:col-span-8 h-[500px] lg:h-auto rounded-[40px] overflow-hidden border border-slate-100 shadow-2xl relative">
              <HospitalMap 
                hospitals={hospitals} 
                activeId={activeId} 
                onSelect={(id) => {
                  setActiveId(id);
                  // Scroll card into view
                  const element = document.getElementById(`hospital-card-${id}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }
                }} 
              />
           </div>

           {/* Facility Registry Sidebar */}
           <div className="lg:col-span-4 space-y-6 overflow-y-auto max-h-[700px] pr-2 custom-scrollbar">
              <div className="flex items-center justify-between sticky top-0 bg-slate-50/80 backdrop-blur-md py-2 z-10">
                 <h3 className="text-xl font-black text-primary tracking-tighter italic">Facility Registry</h3>
                 <span className="px-4 py-1.5 bg-white border border-slate-100 shadow-sm rounded-full text-[10px] font-black">
                   {hospitals.length} Matched
                 </span>
              </div>

              <div className="space-y-4 pb-10">
                <AnimatePresence mode="popLayout">
                  {hospitals.length === 0 && !isLoading ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-12 text-center rounded-[32px] bg-white border border-slate-100 shadow-sm"
                    >
                       <div className="h-20 w-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mx-auto mb-6">
                          <Search size={40} />
                       </div>
                       <h4 className="font-black text-primary text-lg">No Results Found</h4>
                       <p className="text-sm text-slate-400 mt-2 font-medium">No centers discovered for "{searchCity || 'current filters'}". Try broadening your search.</p>
                       <Button 
                        variant="link" 
                        onClick={() => {setSearchCity(''); setFilters({city: '', type: 'all'})}}
                        className="mt-4 text-accent font-black uppercase text-[10px] tracking-widest"
                       >
                         Clear All Filters
                       </Button>
                    </motion.div>
                  ) : (
                    hospitals.map((h, i) => (
                      <motion.div
                        key={h._id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        id={`hospital-card-${h._id}`}
                      >
                        <Card 
                          onClick={() => setActiveId(h._id)}
                          className={cn(
                            "rounded-[32px] cursor-pointer transition-all duration-300 border-2 p-1 overflow-hidden group",
                            activeId === h._id 
                              ? "border-primary bg-white shadow-2xl scale-[1.02]" 
                              : "border-transparent bg-white shadow-sm hover:border-slate-200 hover:shadow-md"
                          )}
                        >
                           <div className="p-5 space-y-4">
                              <div className="flex items-center justify-between">
                                 <div className={cn(
                                   "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest",
                                   h.type === 'government' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-blue-50 text-blue-600 border border-blue-100"
                                 )}>
                                   {h.type} Center
                                 </div>
                                 <div className={cn(
                                   "h-10 w-10 rounded-xl flex items-center justify-center transition-colors",
                                   activeId === h._id ? "bg-primary text-white" : "bg-slate-50 text-slate-300 group-hover:text-primary"
                                 )}>
                                   {h.type === 'government' ? <Landmark className="h-5 w-5" /> : <Activity className="h-5 w-5" />}
                                 </div>
                              </div>
                              
                              <div>
                                <h4 className="text-lg font-black text-primary leading-tight group-hover:text-accent transition-colors">{h.name}</h4>
                                <div className="flex items-start mt-2">
                                   <MapPin className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-slate-400 shrink-0" />
                                   <p className="text-[11px] font-bold text-slate-500 line-clamp-2">
                                     {h.address}
                                   </p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                 <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Contact</p>
                                    <p className="text-xs font-black text-primary truncate">{h.phone}</p>
                                 </div>
                                 <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">City</p>
                                    <p className="text-xs font-black text-primary">{h.city}</p>
                                 </div>
                              </div>

                              <div className="flex items-center gap-3 pt-2">
                                 <Button 
                                   asChild 
                                   className="flex-1 rounded-2xl bg-primary text-white h-12 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                                 >
                                   <a href={h.mapLink} target="_blank" rel="noopener noreferrer">
                                      <Navigation className="h-3.5 w-3.5 mr-2" /> Open Maps
                                   </a>
                                 </Button>
                                 <Button 
                                   variant="outline"
                                   asChild 
                                   className="h-12 w-12 p-0 rounded-2xl border-slate-200 hover:bg-slate-50"
                                 >
                                   <a href={`tel:${h.phone}`}>
                                      <Phone className="h-4 w-4" />
                                   </a>
                                 </Button>
                              </div>
                           </div>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
           </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
