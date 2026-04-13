import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";

const steps = [
  { id: 1, name: "Profile Registration", status: "completed", date: "Mar 25" },
  { id: 2, name: "ID Verification", status: "completed", date: "Mar 26" },
  { id: 3, name: "Social Welfare Matching", status: "current", date: "Mar 29" },
  { id: 4, name: "Grievance Application", status: "upcoming", date: "--" },
];

export function ProgressOverview() {
  return (
    <Card className="border-none shadow-sm bg-white overflow-hidden">
      <CardHeader className="pb-2 border-b">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold tracking-tight">Onboarding Progress</CardTitle>
          <CardDescription className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Citizen Readiness Pathway</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative space-y-8">
          {/* Vertical Connecting Line */}
          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-100 -z-10"></div>
          
          {steps.map((step) => (
            <div key={step.id} className="flex items-center space-x-6 group">
              <div className="relative">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm ${
                  step.status === 'completed' ? "bg-emerald-500 text-white" : 
                  step.status === 'current' ? "bg-white border-4 border-primary ring-4 ring-primary/10" : 
                  "bg-white border-2 border-slate-200"
                }`}>
                  {step.status === 'completed' ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <span className="text-[10px] font-black">{step.id}</span>
                  )}
                </div>
              </div>
              <div className="flex-1 flex items-center justify-between border-b border-transparent group-hover:border-slate-100 transition-all pb-2">
                <div className="space-y-0.5">
                  <p className={`text-sm font-bold tracking-tight ${step.status === 'upcoming' ? "text-slate-400" : "text-primary"}`}>{step.name}</p>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.1em]">{step.status.toUpperCase()}</p>
                </div>
                <p className="text-[11px] font-bold text-slate-400 group-hover:text-primary transition-colors">{step.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
