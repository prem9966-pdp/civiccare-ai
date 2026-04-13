import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral';
  color?: string;
}

export function StatCard({ title, value, icon: Icon, trend, trendType, color }: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow border-none bg-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{title}</p>
            <h3 className="text-2xl font-black text-primary tracking-tight">{value}</h3>
            {trend && (
              <p className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1",
                trendType === 'up' ? "bg-emerald-50 text-emerald-600" : trendType === 'down' ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-600"
              )}>
                {trendType === 'up' ? '↑' : trendType === 'down' ? '↓' : '•'} {trend}
              </p>
            )}
          </div>
          <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shadow-sm", color || "bg-primary/5")}>
            <Icon className={cn("h-6 w-6", color ? "text-white" : "text-primary")} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
