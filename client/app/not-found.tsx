import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-6 px-4 text-center">
      <h1 className="text-8xl font-black text-primary opacity-20">404</h1>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight sm:text-4xl text-foreground">
          Page Not Found
        </h2>
        <p className="max-w-[500px] text-muted-foreground sm:text-lg">
          We can&apos;t find the civic assistance page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
      </div>
      <Button asChild size="lg">
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
