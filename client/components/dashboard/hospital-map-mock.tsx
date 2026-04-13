import React from 'react';
import { MapPin, Navigation, Landmark, Activity, Sparkles, Map as MapIcon, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface HospitalMapMockProps {
  hospitals: any[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export function HospitalMapMock({ hospitals, activeId, onSelect }: HospitalMapMockProps) {
  return (
    <div className="relative h-full w-full bg-slate-100 rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white group">
        {/* Mock Map Background (Mesh Gradient) */}
        <div className="absolute inset-0 bg-[#E5E7EB] opacity-60">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#0F172A 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
            <div className="absolute top-[20%] left-[30%] h-[40%] w-[30%] bg-emerald-500/5 blur-[120px] rounded-full animate-pulse transition-all"></div>
            <div className="absolute bottom-[20%] right-[30%] h-[40%] w-[30%] bg-blue-500/5 blur-[120px] rounded-full animate-pulse transition-all"></div>
        </div>

        {/* Mock Map UI Controls */}
        <div className="absolute top-8 right-8 flex flex-col space-y-3 z-20">
            <button className="h-12 w-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-primary border border-slate-100/50 hover:bg-slate-50 transition-all">
                <Navigation className="h-5 w-5" />
            </button>
            <button className="h-12 w-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-slate-400 border border-slate-100/50 hover:bg-slate-50 transition-all">
                <Layers className="h-5 w-5" />
            </button>
        </div>

        <div className="absolute top-8 left-8 z-20">
             <div className="bg-white/80 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center space-x-3">
                 <div className="h-3 w-3 bg-emerald-500 rounded-full animate-ping"></div>
                 <p className="text-xs font-black uppercase text-primary tracking-widest">Geolocation Active</p>
             </div>
        </div>

        {/* Simulated Map Markers */}
        <div className="relative h-full w-full z-10 transition-all duration-1000">
            {hospitals.map((h, i) => {
                const isActive = activeId === h._id;
                // Generate semi-random deterministic positions based on array index for mock stability
                const top = 20 + (i * 15) % 60;
                const left = 20 + (i * 25) % 65;

                return (
                    <motion.button
                        key={h._id}
                        onClick={() => onSelect(h._id)}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                        className="absolute"
                        style={{ top: `${top}%`, left: `${left}%` }}
                    >
                        <div className="relative group/pin">
                            {/* Pulse for Active Marker */}
                            {isActive && (
                                <div className="absolute inset-0 h-10 w-10 bg-primary/20 rounded-full animate-ping -translate-x-1/4 -translate-y-1/4"></div>
                            )}
                            
                            {/* The Pin */}
                            <div className={cn(
                                "h-10 w-10 rounded-2xl shadow-2xl relative z-10 flex items-center justify-center transition-all duration-500 border-2",
                                isActive ? "bg-primary text-white border-white scale-125 -translate-y-2 ring-4 ring-primary/10" : "bg-white text-primary border-transparent hover:scale-110 hover:-translate-y-1"
                            )}>
                                {h.type === "HelpCenter" ? <Landmark className="h-5 w-5" /> : <Activity className="h-5 w-5" />}
                            </div>

                            {/* Popup on Hover or Active */}
                            <AnimatePresence>
                                {(isActive) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-white rounded-[1.5rem] shadow-2xl p-5 border border-slate-100 pointer-events-none z-30"
                                    >
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 opacity-60">{h.type}</p>
                                                {h.isEmergencyReady && <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>}
                                            </div>
                                            <p className="text-sm font-black text-primary leading-tight tracking-tighter line-clamp-1">{h.name}</p>
                                            <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-500">
                                                <MapPin className="h-3 w-3" />
                                                <span className="truncate">{h.address}</span>
                                            </div>
                                            <button className="w-full mt-2 py-2 bg-primary/5 text-primary text-[10px] font-black uppercase rounded-lg border border-primary/5">Deep Analytics</button>
                                        </div>
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.button>
                );
            })}
        </div>

        {/* Global Branding Stubs */}
        <div className="absolute bottom-8 right-8 z-20">
             <div className="bg-white/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 flex items-center space-x-2 text-[10px] font-black text-primary/40 uppercase tracking-[0.3em]">
                 <MapIcon className="h-3 w-3" />
                 <span>Cartographic Engine v2.0</span>
             </div>
        </div>
    </div>
  );
}
