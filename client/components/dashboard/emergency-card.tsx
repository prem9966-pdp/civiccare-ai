import React from 'react';
import { AlertTriangle, Phone, MapPin, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function EmergencyCard() {
  return (
    <Card className="border-none bg-red-600 text-white shadow-2xl rounded-[2rem] overflow-hidden animate-in zoom-in-95 duration-500">
      <CardContent className="p-8 relative">
        <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="space-y-6 relative z-10">
          <div className="flex items-center space-x-3">
             <div className="bg-white/20 p-2 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
             </div>
             <h3 className="text-xl font-black uppercase tracking-tighter">Emergency Action Required</h3>
          </div>
          
          <p className="text-sm font-medium leading-relaxed text-red-50 opacity-90">
             Critical keywords detected. If this is a life-threatening situation, please do not wait for AI guidance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="tel:102" className="flex items-center justify-center space-x-3 bg-white text-red-600 p-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform">
                  <Phone className="h-5 w-5" />
                  <span>Call 102 (Ambulance)</span>
              </a>
              <Link href="/dashboard/help-centers" className="flex items-center justify-center space-x-3 bg-red-700/50 border border-white/20 text-white p-4 rounded-2xl font-black hover:bg-red-700 transition-all">
                  <MapPin className="h-5 w-5" />
                  <span>Nearest Hospital</span>
              </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
