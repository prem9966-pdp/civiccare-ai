import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle, Calendar, RefreshCcw, Bell } from "lucide-react";

const mockAlerts = [
  { id: 1, title: "PM KISAN Renewal", desc: "Verification due in 3 days", icon: Calendar, color: "bg-red-50 text-red-600" },
  { id: 2, title: "Aadhar Link Update", desc: "Profile status update suggested", icon: RefreshCcw, color: "bg-amber-50 text-amber-600" },
  { id: 3, title: "Hospital Finder Alert", desc: "New primary health center in your district", icon: AlertCircle, color: "bg-emerald-50 text-emerald-600" },
];

export function AlertsPanel() {
  return (
    <Card className="border-none shadow-sm bg-white overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold">Priority Alerts</CardTitle>
          <CardDescription className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Action required soon</CardDescription>
        </div>
        <div className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center text-primary group hover:bg-slate-50 cursor-pointer transition-colors shadow-sm">
          <Bell className="h-5 w-5 animate-pulse group-hover:animate-none" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y border-t-0 p-4">
          {mockAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-4 p-4 hover:bg-slate-50 transition-all rounded-xl cursor-pointer mt-1 first:mt-0 transition-all border border-transparent hover:border-slate-100">
              <div className={`p-2 rounded-lg ${alert.color}`}>
                <alert.icon className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-primary">{alert.title}</p>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{alert.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
