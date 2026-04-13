"use client"

import React from 'react';
import Link from 'next/link';
import { AuthCard } from '@/components/auth/auth-card';
import { LoginForm } from '@/components/auth/login-form';
import { SocialProof } from '@/components/auth/social-proof';

export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50 overflow-hidden">
      {/* Left Session: Login Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative z-10 w-full animate-in fade-in slide-in-from-left-4 duration-700">
        {/* Subtle Background Blob for Login */}
        <div className="absolute top-1/4 -left-12 h-64 w-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 left-1/2 h-48 w-48 bg-accent/5 rounded-full blur-2xl -z-10"></div>

        <AuthCard 
          title="Welcome Back" 
          description="Access your personalized civic assistance portal"
          footer={
            <p className="text-sm text-slate-500 font-medium">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary font-bold hover:underline underline-offset-4">
                Sign Up Now
              </Link>
            </p>
          }
        >
          <LoginForm />
        </AuthCard>
      </div>

      {/* Right Section: Social Proof & Branding */}
      <div className="hidden lg:flex items-center justify-center p-12 bg-white relative overflow-hidden">
        {/* Deep Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0F172A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        <div className="max-w-xl w-full">
            <SocialProof />
        </div>
      </div>
    </main>
  );
}
