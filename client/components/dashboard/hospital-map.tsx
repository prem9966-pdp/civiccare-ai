"use client"

import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Landmark, Activity, Layers, Info, Phone, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

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

interface HospitalMapProps {
  hospitals: Hospital[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export function HospitalMap({ hospitals, activeId, onSelect }: HospitalMapProps) {
  console.log("[MAP COMPONENT] Hospitals received:", hospitals);
  const [zoom, setZoom] = useState(1);

  // Normalize coordinates to a 0-100% scale for our visual map surface
  // This is a "Proximity Engine" that maps geographic points to a visual space
  // For a specific city like Mumbai, we can bound the coordinates
  const getCoordinates = (lat: number, lng: number) => {
    // Basic normalization within India for demo purposes
    // If we have a variety of cities, we'll auto-scale based on bounds
    if (hospitals.length === 0) return { x: 50, y: 50 };

    const lats = hospitals.map(h => h.latitude).filter(l => !isNaN(l));
    const lngs = hospitals.map(h => h.longitude).filter(l => !isNaN(l));

    if (lats.length === 0 || lngs.length === 0) return { x: 50, y: 50 };

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const latRange = maxLat - minLat || 0.1;
    const lngRange = maxLng - minLng || 0.1;

    // We invert LAT for Y because in CSS top:0 is top but Max Lat is top
    const y = 100 - ((lat - minLat) / latRange * 80 + 10);
    const x = (lng - minLng) / lngRange * 80 + 10;

    return { x, y };
  };

  return (
    <div className="relative h-full w-full bg-slate-50 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl group select-none">
        {/* Map Grid Background */}
        <div className="absolute inset-0 bg-[#f8fbff]">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#1e293b 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}></div>
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
            
            {/* Animated Ambient Glows */}
            <div className="absolute top-1/4 left-1/4 h-96 w-96 bg-primary/10 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 h-96 w-96 bg-accent/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* UI Overlay */}
        <div className="absolute top-8 left-8 z-30 flex flex-col space-y-3">
             <div className="bg-white/90 backdrop-blur-xl px-5 py-2.5 rounded-2xl shadow-xl border border-white/40 flex items-center space-x-3">
                 <div className="h-2 w-2 bg-emerald-500 rounded-full animate-ping"></div>
                 <p className="text-[10px] font-black uppercase text-primary tracking-[0.2em]">Healthcare Link Active</p>
             </div>
             <div className="bg-white/90 backdrop-blur-xl px-5 py-2.5 rounded-2xl shadow-xl border border-white/40">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Displaying</p>
                 <p className="text-sm font-black text-primary tracking-tight">{hospitals.length} Centers Found</p>
             </div>
        </div>

        {/* Action Controls */}
        <div className="absolute top-8 right-8 z-30 flex flex-col space-y-3">
            <button className="h-12 w-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-primary border border-slate-100 hover:scale-110 active:scale-95 transition-all">
                <Navigation className="h-5 w-5" />
            </button>
            <button className="h-12 w-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-slate-400 border border-slate-100 hover:scale-110 active:scale-95 transition-all">
                <Layers className="h-5 w-5" />
            </button>
        </div>

        {/* The Cartographic Surface */}
        <div className="relative h-full w-full z-10 p-10">
            {hospitals.map((h, i) => {
                const isActive = activeId === h._id;
                const { x, y } = getCoordinates(Number(h.latitude), Number(h.longitude));

                // Don't render if coordinates are missing
                if (isNaN(x) || isNaN(y)) return null;

                return (
                    <div
                        key={h._id || i}
                        className="absolute transition-all duration-700 ease-out"
                        style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                        <div className="relative">
                            {/* Visual Pulse for Active Facility */}
                            {isActive && (
                                <motion.div 
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 2, opacity: [0, 0.5, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="absolute inset-0 bg-primary rounded-full blur-xl"
                                />
                            )}
                            
                            {/* Marker Pin */}
                            <button
                                onClick={() => onSelect(h._id)}
                                className={cn(
                                    "relative h-12 w-12 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-500 border-2 z-20 group/marker",
                                    isActive 
                                        ? "bg-primary text-white border-white scale-125 -translate-y-4 ring-8 ring-primary/10" 
                                        : "bg-white text-primary border-slate-50 hover:scale-110 hover:-translate-y-2"
                                )}
                            >
                                {h.type === 'government' ? <Landmark className="h-5 w-5" /> : <Activity className="h-5 w-5" />}
                                
                                {/* Quick Label on Hover */}
                                <div className="absolute top-14 opacity-0 group-hover/marker:opacity-100 transition-opacity bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap pointer-events-none">
                                    {h.name}
                                </div>
                            </button>

                            {/* Info Popup */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.9, x: '-50%' }}
                                        animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                                        exit={{ opacity: 0, y: 10, scale: 0.9, x: '-50%' }}
                                        className="absolute bottom-[calc(100%+20px)] left-1/2 w-72 bg-white rounded-[2rem] shadow-2xl p-6 border border-slate-100 z-50 overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                        
                                        <div className="relative space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="px-3 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest">
                                                    {h.type}
                                                </span>
                                                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                            </div>

                                            <div className="space-y-1">
                                                <h4 className="text-lg font-black text-primary leading-tight tracking-tighter">{h.name}</h4>
                                                <div className="flex items-center text-[10px] font-bold text-slate-400">
                                                    <MapPin className="h-3 w-3 mr-1" /> {h.area}, {h.city}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-50">
                                                <button 
                                                    className="flex items-center justify-center p-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-primary/5 hover:text-primary transition-colors border border-transparent hover:border-primary/5"
                                                    onClick={(e) => { e.stopPropagation(); window.open(`tel:${h.phone}`) }}
                                                >
                                                    <Phone className="h-4 w-4" />
                                                </button>
                                                <button 
                                                    className="flex items-center justify-center p-3 rounded-2xl bg-primary text-white hover:shadow-lg hover:shadow-primary/20 transition-all"
                                                    onClick={(e) => { e.stopPropagation(); window.open(h.mapLink, '_blank') }}
                                                >
                                                    <Navigation className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {/* Little arrow at bottom */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white"></div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                );
            })}
        </div>

        {/* Legend */}
        <div className="absolute bottom-8 left-8 z-30 bg-white/80 backdrop-blur-xl p-4 rounded-3xl border border-white/40 shadow-2xl flex items-center space-x-6">
            <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-primary ring-4 ring-primary/10"></div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Facility</span>
            </div>
            <div className="h-4 w-px bg-slate-200"></div>
            <div className="flex items-center space-x-2">
                <Landmark className="h-3 w-3 text-slate-400" />
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Govt</span>
            </div>
            <div className="flex items-center space-x-2">
                <Activity className="h-3 w-3 text-slate-400" />
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Private</span>
            </div>
        </div>

        {/* Global Branding Stubs */}
        <div className="absolute bottom-8 right-8 z-30 block">
             <div className="bg-primary/95 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 transition-transform hover:scale-105 active:scale-95 cursor-pointer">
                 <Layers className="h-4 w-4" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">Cartographic Axis v3.0</span>
             </div>
        </div>
    </div>
  );
}
