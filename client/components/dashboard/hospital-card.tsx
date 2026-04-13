import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MapPin, Activity, ShieldCheck, ArrowUpRight, Landmark } from "lucide-react";
import { cn } from '@/lib/utils';

interface HospitalCardProps {
  hospital: any;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export function HospitalCard({ hospital, isActive, onSelect }: HospitalCardProps) {
  const isPublic = hospital.type === "Public" || hospital.type === "government";
  const isHelpCenter = hospital.type === "HelpCenter";

  return (
    <Card 
        onClick={() => onSelect(hospital._id)}
        className={cn(
            "group relative border-none cursor-pointer transition-all duration-500 rounded-[2rem] overflow-hidden",
            isActive ? "bg-white shadow-2xl scale-102 ring-4 ring-primary/5" : "bg-slate-50 hover:bg-white shadow-sm hover:shadow-xl"
        )}
    >
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-start">
            <div className={cn(
                "h-12 w-12 rounded-xl flex items-center justify-center shadow-inner",
                isHelpCenter ? "bg-blue-50 text-blue-500" : (isPublic ? "bg-emerald-50 text-emerald-500" : "bg-primary/5 text-primary")
            )}>
                 {isHelpCenter ? <Landmark className="h-6 w-6" /> : <Activity className="h-6 w-6" />}
            </div>
            {hospital.isEmergencyReady && (
                <div className="flex items-center space-x-1.5 px-3 py-1 bg-red-50 text-red-500 border border-red-100 rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse">
                    <ShieldCheck className="h-3 w-3" />
                    <span>Emergency Ready</span>
                </div>
            )}
        </div>

        <div className="space-y-1">
            <h3 className={cn(
                "text-xl font-black tracking-tighter leading-tight transition-colors",
                isActive ? "text-primary" : "text-slate-600 group-hover:text-primary"
            )}>
                {hospital.name}
            </h3>
            <p className="text-xs font-bold text-slate-400 capitalize">{hospital.type} • {hospital.city}</p>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-100/50">
            <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-slate-300 mt-0.5" />
                <p className="text-xs font-medium text-slate-500 line-clamp-1">{hospital.address}</p>
            </div>
            <div className="flex items-center space-x-3">
                <Phone className="h-3.5 w-3.5 text-slate-300" />
                <p className="text-xs font-black text-primary">{hospital.phone}</p>
            </div>
        </div>

        <div className="flex flex-wrap gap-2">
            {(hospital.services || hospital.specialty?.split(', ') || []).slice(0, 3).map((s: string) => (
                <span key={s} className="px-2 py-0.5 bg-white border border-slate-100 rounded-md text-[9px] font-bold text-slate-400">
                    {s}
                </span>
            ))}
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="h-4 w-4 text-slate-200" />
        </div>
      </CardContent>
    </Card>
  );
}
