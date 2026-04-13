"use client"

import React, { useState } from 'react';
import { Bookmark, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import schemeService from '@/services/scheme.service';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface SaveSchemeButtonProps {
  schemeId: string;
  initialSaved: boolean;
  className?: string;
  variant?: "default" | "outline" | "ghost";
}

export function SaveSchemeButton({ schemeId, initialSaved, className, variant = "outline" }: SaveSchemeButtonProps) {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    try {
      await schemeService.toggleSave(schemeId);
      setIsSaved(!isSaved);
      toast.success(!isSaved ? "Scheme bookmarked!" : "Bookmark removed");
    } catch (error) {
      toast.error("Login required to save schemes");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant={variant} 
      size="sm" 
      onClick={handleToggle} 
      disabled={isLoading}
      className={cn(
        "rounded-xl transition-all font-bold",
        isSaved ? "bg-primary text-white border-primary hover:bg-primary/90" : "bg-white text-slate-500",
        className
      )}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Bookmark className={cn("h-4 w-4 mr-2", isSaved ? "fill-white" : "fill-transparent")} />
      )}
      {isSaved ? "Bookmarked" : "Save for later"}
    </Button>
  );
}
