"use client"

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LayoutDashboard, Search, MessageSquare, FileText, Map, ShieldCheck, History, Landmark } from 'lucide-react';

const mobileNavItems = [
  { icon: LayoutDashboard, name: 'Overview', href: '/dashboard' },
  { icon: Search, name: 'Schemes', href: '/dashboard/schemes' },
  { icon: MessageSquare, name: 'AI Counselor', href: '/dashboard/chat' },
  { icon: FileText, name: 'Applications', href: '/dashboard/generator' },
  { icon: Map, name: 'Help Centers', href: '/dashboard/help-centers' },
  { icon: ShieldCheck, name: 'Documents', href: '/dashboard/documents' },
  { icon: History, name: 'History', href: '/dashboard/history' },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-[100]"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[280px] bg-white lg:hidden z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Landmark className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold tracking-tight text-primary">
                  CivicCare<span className="text-accent">AI</span>
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
              {mobileNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-slate-50 transition-all border border-transparent active:border-slate-100"
                >
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
            
            <div className="p-6 border-t">
              <p className="text-xs text-muted-foreground text-center">
                CivicCare AI v1.0.0-beta
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
