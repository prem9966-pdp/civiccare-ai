import React from 'react';
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";

interface EligibilityScoreProps {
  score: number;
  className?: string;
  showLabel?: boolean;
}

export function EligibilityScore({ score, className, showLabel = true }: EligibilityScoreProps) {
  const getStatus = () => {
    if (score >= 90) return { color: "text-emerald-500 bg-emerald-50 border-emerald-100", label: "Excellent Match", icon: CheckCircle2 };
    if (score >= 60) return { color: "text-blue-500 bg-blue-50 border-blue-100", label: "High Potential", icon: CheckCircle2 };
    if (score >= 30) return { color: "text-amber-500 bg-amber-50 border-amber-100", label: "Needs Data", icon: HelpCircle };
    return { color: "text-red-500 bg-red-50 border-red-100", label: "Ineligible", icon: AlertTriangle };
  };

  const status = getStatus();

  return (
    <div className={cn("flex items-center space-x-3 px-3 py-1.5 rounded-full border shadow-sm transition-all animate-in fade-in zoom-in-95", status.color, className)}>
      <status.icon className="h-4 w-4" />
      <div className="flex flex-col">
        <span className="text-[10px] font-black uppercase tracking-[0.15em] leading-none opacity-60">Citizen Match</span>
        {showLabel && <span className="text-[11px] font-black tracking-tight">{score}% - {status.label}</span>}
      </div>
    </div>
  );
}
