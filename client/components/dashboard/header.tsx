"use client"

import React from 'react';
import { Search, Bell, Menu, User, Settings, LogOut } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { MobileNav } from './mobile-nav';

export function Header() {
  const { user, logout } = useAuth();
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  // Get initials for profile circle
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="h-16 px-6 border-b flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-40 transition-all">
      <div className="flex items-center space-x-4">
        {/* Search Bar - Desktop Only */}
        <div className="hidden lg:flex items-center bg-slate-100 px-4 py-2 rounded-full border border-slate-200 group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search className="h-4 w-4 text-muted-foreground mr-3" />
          <input 
            type="text" 
            placeholder="Search schemes, help-centers..." 
            className="bg-transparent border-none text-sm focus:outline-none w-64 placeholder:text-muted-foreground/60"
          />
        </div>
        
        {/* Mobile Nav Trigger */}
        <button 
          className="lg:hidden p-2 text-primary hover:bg-slate-100 rounded-lg"
          onClick={() => setIsMobileNavOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 relative group transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-accent rounded-full border-2 border-white ring-2 ring-transparent group-hover:ring-accent/10"></span>
        </button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-3 hover:bg-slate-50 px-2 py-1.5 rounded-full border border-slate-100 transition-colors">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-accent-foreground text-white flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-sm">
                {user?.name ? getInitials(user.name) : 'CC'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-primary">{user?.name || 'Loading...'}</p>
                <p className="text-[10px] text-muted-foreground font-medium capitalize">{user?.role || 'User'}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl shadow-xl border-slate-200">
            <DropdownMenuLabel className="font-bold text-xs text-muted-foreground uppercase py-2 px-3 tracking-widest">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="py-2.5 px-3 rounded-lg cursor-pointer flex items-center gap-3">
              <User className="h-4 w-4 text-slate-400" />
              <span>Profile Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2.5 px-3 rounded-lg cursor-pointer flex items-center gap-3">
              <Settings className="h-4 w-4 text-slate-400" />
              <span>Preferences</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={logout}
              className="py-2.5 px-3 rounded-lg cursor-pointer flex items-center gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-semibold">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Nav Overlay */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </header>
  );
}
