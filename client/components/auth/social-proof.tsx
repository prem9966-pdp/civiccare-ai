"use client"

import React from 'react';
import { ShieldCheck, Users, Globe, Star } from 'lucide-react';

const stats = [
  { icon: Users, label: 'Active Citizens', value: '500k+' },
  { icon: ShieldCheck, label: 'Encrypted Data', value: 'Secure' },
  { icon: Globe, label: 'Open Data Support', value: '25 States' },
];

export function SocialProof() {
  return (
    <div className="hidden lg:flex flex-col justify-center space-y-12 p-16 bg-primary/5 rounded-3xl border border-primary/10">
      <div className="space-y-4">
        <h2 className="text-4xl font-black text-primary tracking-tight">Trust by Design.</h2>
        <p className="text-xl text-slate-600 max-w-lg leading-relaxed font-medium">
          Join thousands of citizens who have optimized their civic accessibility with AI-guided tools, 
          ensuring no benefit goes overlooked.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center space-x-6 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
            <div className="bg-primary/5 group-hover:bg-accent/10 p-4 rounded-xl transition-colors">
              <stat.icon className="h-8 w-8 text-primary group-hover:text-accent font-bold" />
            </div>
            <div>
              <p className="text-3xl font-black text-primary">{stat.value}</p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-4 pt-4">
        <div className="flex -space-x-3 overflow-hidden">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center font-bold text-xs text-slate-400">
              U{i}
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-1">
          {[1,2,3,4,5].map(i => (
            <Star key={i} className="h-4 w-4 text-orange-400 fill-orange-400" />
          ))}
          <span className="text-sm font-bold text-primary pl-2 tracking-tight">4.9/5 Rating</span>
        </div>
      </div>
    </div>
  );
}
