"use client"

import React from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-4 bg-background">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="h-12 w-12 rounded-lg border-4 border-primary border-t-transparent shadow-lg"
      />
      <p className="text-lg font-medium text-muted-foreground animate-pulse">
        Loading CivicCare AI...
      </p>
    </div>
  );
}
