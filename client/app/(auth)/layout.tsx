import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Authentication | CivicCare AI',
  description: 'Securely access your civic assistance account.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {children}
    </div>
  );
}
