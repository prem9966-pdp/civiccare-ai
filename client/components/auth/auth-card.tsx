"use client"

import React from 'react';
import { Landmark } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function AuthCard({ title, description, children, footer, className }: AuthCardProps) {
  return (
    <Card className={cn("w-full max-w-md border-none shadow-2xl bg-white/90 backdrop-blur-sm", className)}>
      <CardHeader className="space-y-4 text-center">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-primary p-3 rounded-xl group-hover:bg-accent transition-colors shadow-lg">
              <Landmark className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-primary">
              CivicCare<span className="text-accent">AI</span>
            </span>
          </Link>
        </div>
        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
          <CardDescription className="text-slate-500 font-medium">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {children}
        {footer && (
          <div className="text-center text-sm text-slate-500 pt-4 border-t border-slate-100">
            {footer}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
