"use client"

import React from 'react';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(
  () => import('./leaflet-map'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center">
        <div className="h-16 w-16 border-4 border-slate-100 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-4 font-black uppercase tracking-widest text-primary italic">Initialization Maps...</p>
      </div>
    )
  }
);

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
  return (
    <div className="relative h-full w-full bg-slate-50 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl group select-none">
      <LeafletMap 
        hospitals={hospitals} 
        activeId={activeId} 
        onSelect={onSelect} 
      />
    </div>
  );
}
