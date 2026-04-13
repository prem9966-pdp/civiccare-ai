"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}

export function SectionWrapper({
  children,
  className,
  containerClassName,
  animate = true,
}: SectionWrapperProps) {
  const content = (
    <div className={cn('max-w-7xl mx-auto px-6', containerClassName)}>
      {children}
    </div>
  );

  if (!animate) {
    return <section className={cn('py-16 md:py-24', className)}>{content}</section>;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={cn('py-16 md:py-24', className)}
    >
      {content}
    </motion.section>
  );
}
