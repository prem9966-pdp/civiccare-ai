"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { loginSchema, LoginValues } from '@/lib/validation/auth';
import { useAuth } from '@/hooks/use-auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginValues) => {
    setIsLoading(true);
    console.log("[LOGIN DEBUG] Submitting login for:", data.email);
    await login(data);
    console.log("[LOGIN DEBUG] Login function call complete. Check router for next step.");
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 pl-1">Email Address</label>
        <div className="relative group">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <Input 
            {...register('email')}
            placeholder="name@example.com" 
            className="pl-10 h-11 bg-slate-50 border-slate-100 hover:border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all rounded-xl"
          />
        </div>
        {errors.email && <p className="text-xs font-bold text-red-500 pl-1 pt-1 opacity-80">{errors.email.message}</p>}
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-center px-1">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Password</label>
          <button type="button" className="text-xs font-bold text-primary hover:underline underline-offset-4">Forgot password?</button>
        </div>
        <div className="relative group">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <Input 
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••" 
            className="pl-10 pr-10 h-11 bg-slate-50 border-slate-100 hover:border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all rounded-xl"
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-slate-400 hover:text-primary transition-colors"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="text-xs font-bold text-red-500 pl-1 pt-1 opacity-80">{errors.password.message}</p>}
      </div>

      <Button disabled={isLoading} className="w-full h-11 rounded-xl text-sm font-bold shadow-xl hover:shadow-2xl transition-all">
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Sign In to Portal
      </Button>
    </form>
  );
}
