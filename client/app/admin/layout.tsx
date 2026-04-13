"use client"

import React from 'react';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Activity, 
  MessageSquareWarning, 
  ShieldCheck, 
  LogOut,
  Settings,
  Menu
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Analytics Hub', href: '/admin/dashboard' },
    { icon: Users, label: 'Citizen Registry', href: '/admin/users' },
    { icon: BookOpen, label: 'Schemes Catalog', href: '/admin/schemes' },
    { icon: Activity, label: 'Health Proximity', href: '/admin/hospitals' },
    { icon: MessageSquareWarning, label: 'Compaints Monitor', href: '/admin/complaints' },
  ];

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-slate-50 overflow-hidden">
        {/* Admin Sidebar */}
        <aside className="w-80 bg-white border-r border-slate-100 flex flex-col p-8 overflow-y-auto shrink-0 relative z-20 shadow-2xl">
          <div className="flex items-center space-x-4 mb-14 px-2">
             <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20">
                <ShieldCheck className="h-8 w-8" />
             </div>
             <div>
                <h1 className="text-xl font-black text-primary tracking-tighter">CivicCare <span className="text-accent">Admin</span></h1>
                <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Control Matrix v2.0</p>
             </div>
          </div>

          <nav className="flex-1 space-y-3">
             {menuItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-4 p-4 rounded-2xl transition-all group",
                    pathname === item.href 
                        ? "bg-primary text-white shadow-xl shadow-primary/20 scale-102" 
                        : "text-slate-500 hover:bg-slate-50 hover:text-primary"
                  )}
                >
                   <item.icon className={cn("h-5 w-5", pathname === item.href ? "text-white" : "text-slate-300 group-hover:text-primary")} />
                   <span className="text-sm font-black tracking-tight">{item.label}</span>
                </Link>
             ))}
          </nav>

          <div className="mt-12 p-6 bg-slate-900 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-32 w-32 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform"></div>
              <div className="relative z-10 space-y-4">
                  <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center">
                     <Settings className="h-5 w-5 text-accent" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-white/60 leading-none">System Load</p>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-accent w-[34%]"></div>
                  </div>
              </div>
          </div>

          <button className="mt-8 flex items-center space-x-4 p-4 text-red-400 font-black text-sm uppercase tracking-widest hover:bg-red-50 rounded-2xl transition-all">
             <LogOut className="h-5 w-5" />
             <span>Terminate Session</span>
          </button>
        </aside>

        {/* Admin Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
            {/* Top Bar */}
            <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-12 sticky top-0 z-10">
                <div className="flex items-center space-x-4">
                    <button className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                        <Menu className="h-5 w-5" />
                    </button>
                    <div className="px-4 py-2 bg-slate-50 rounded-full border border-slate-100 flex items-center space-x-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span>Production Cluster A-3 Active</span>
                    </div>
                </div>
                
                <div className="flex items-center space-x-6">
                    <div className="text-right">
                        <p className="text-xs font-black text-primary leading-none">System Architect</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Super Admin Account</p>
                    </div>
                    <div className="h-11 w-11 rounded-2xl bg-primary border-4 border-white shadow-xl"></div>
                </div>
            </header>

            <div className="p-12">
                {children}
            </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
