import React from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Sidebar - Desktop Only */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-h-screen relative">
        <Header />
        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-x-hidden backdrop-blur-3xl animate-in fade-in duration-700">
          <div className="max-w-[1440px] mx-auto space-y-10">
            {children}
          </div>
        </main>
        
        {/* Help Bubble - Global within dashboard */}
        <button className="fixed bottom-8 right-8 z-50 h-14 w-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-accent transition-all animate-bounce hover:scale-110 active:scale-95 group">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping group-hover:hidden"></div>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
