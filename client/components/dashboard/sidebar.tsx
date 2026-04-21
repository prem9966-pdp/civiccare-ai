"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Search, 
  MessageSquare, 
  FileText, 
  Map, 
  History, 
  User, 
  Settings, 
  LogOut,
  Landmark,
  ShieldCheck
} from 'lucide-react';

const userNavItems = [
  { icon: LayoutDashboard, name: 'Overview', href: '/dashboard' },
  { icon: Search, name: 'Schemes', href: '/dashboard/schemes' },
  { icon: MessageSquare, name: 'AI Counselor', href: '/dashboard/chat' },
  { icon: FileText, name: 'Grievance Portal', href: '/grievances/submit' },
  { icon: Landmark, name: 'Advocacy Creator', href: '/dashboard/generator' },
  { icon: Map, name: 'Help Centers', href: '/dashboard/help-centers' },
  { icon: ShieldCheck, name: 'Documents', href: '/dashboard/documents' },
  { icon: History, name: 'History', href: '/dashboard/history' },
];

const adminNavItems = [
  { icon: LayoutDashboard, name: 'Analytics', href: '/admin/analytics' },
  { icon: Landmark, name: 'Advocacy Creator', href: '/dashboard/generator' },
  { icon: Search, name: 'Manage Schemes', href: '/admin/schemes' },
  { icon: Map, name: 'Manage Maps', href: '/admin/hospitals' },
  { icon: MessageSquare, name: 'User Complaints', href: '/admin/complaints' },
  { icon: User, name: 'User Management', href: '/admin/users' },
];

interface SidebarProps {
  isAdmin?: boolean;
}

export function Sidebar({ isAdmin = false }: SidebarProps) {
  const pathname = usePathname();
  const items = isAdmin ? adminNavItems : userNavItems;

  return (
    <aside className="hidden lg:flex w-72 flex-col h-screen border-r bg-white sticky top-0 left-0 transition-all shadow-sm">
      <div className="p-6 border-b flex items-center space-x-2">
        <div className="bg-primary p-2 rounded-lg">
          <Landmark className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-primary">
          CivicCare<span className="text-accent">AI</span>
        </span>
      </div>

      <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-4 px-2">
          {isAdmin ? 'System Management' : 'Citizen Dashboard'}
        </p>
        
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group',
                isActive 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-muted-foreground hover:bg-slate-50 hover:text-primary'
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-muted-foreground group-hover:text-primary")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t space-y-2 bg-slate-50/50">
        <Link
          href="/dashboard/profile"
          className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <User className="h-5 w-5" />
          <span>Profile</span>
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
        <button
          className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-2"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
