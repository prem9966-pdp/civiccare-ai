import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, FileCheck, MapPin, Search, Bot } from "lucide-react";
import Link from 'next/link';

const actions = [
  { icon: FileCheck, name: "Upload Verification ID", href: "/dashboard/documents" },
  { icon: Search, name: "Check Scheme Eligibility", href: "/dashboard/schemes" },
  { icon: Bot, name: "Citizen Support Chat", href: "/dashboard/chat" },
  { icon: MapPin, name: "Locate Nearest Medical Aid", href: "/dashboard/help-centers" },
];

export function NextActions() {
  return (
    <Card className="border-none shadow-sm bg-white overflow-hidden">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-lg font-bold tracking-tight">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link 
            key={action.name} 
            href={action.href} 
            className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:bg-white hover:shadow-lg hover:border-accent/10 transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white border rounded-xl shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <action.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-bold text-primary opacity-80 group-hover:opacity-100">{action.name}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary transition-all group-hover:translate-x-1" />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
