"use client"

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Role-based access control (RBAC)
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      router.push('/dashboard'); // Or an unauthorized page
    }
  }, [isAuthenticated, user, allowedRoles, router, loading]);

  // Loading state while checking auth
  if (loading || !isAuthenticated || (allowedRoles && user && !allowedRoles.includes(user.role))) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50/50">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-sm font-bold text-muted-foreground animate-pulse uppercase tracking-widest leading-loose">
            Verifying Citizen Credentials...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
