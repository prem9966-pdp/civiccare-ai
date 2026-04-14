"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, User, Loader2, Eye, EyeOff } from 'lucide-react';
import { signupSchema, SignupValues } from '@/lib/validation/auth';
import { useAuth } from '@/hooks/use-auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register: signupAction } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: SignupValues) => {
    setIsLoading(true);
    await signupAction(data);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 pl-1">Full Name</label>
        <div className="relative group">
          <User className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <Input 
            {...register('name')}
            placeholder="John Doe" 
            className="pl-10 h-11 bg-slate-50 border-slate-100 hover:border-slate-200 focus:bg-white transition-all rounded-xl"
          />
        </div>
        {errors.name && <p className="text-xs font-bold text-red-500 pl-1 pt-1">{errors.name.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 pl-1">Email</label>
        <div className="relative group">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <Input 
            {...register('email')}
            placeholder="name@example.com" 
            className="pl-10 h-11 bg-slate-50 border-slate-100 hover:border-slate-200 focus:bg-white transition-all rounded-xl"
          />
        </div>
        {errors.email && <p className="text-xs font-bold text-red-500 pl-1 pt-1">{errors.email.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 pl-1">New Password</label>
        <div className="relative group">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <Input 
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Min. 8 chars" 
            className="pl-10 h-11 bg-slate-50 border-slate-100 hover:border-slate-200 focus:bg-white transition-all rounded-xl"
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-slate-400"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="text-xs font-bold text-red-500 pl-1 pt-1">{errors.password.message}</p>}
      </div>

      <div className="space-y-1 pb-2">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 pl-1">Confirm Password</label>
        <div className="relative group">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input 
            {...register('confirmPassword')}
            type="password"
            placeholder="••••••••" 
            className="pl-10 h-11 bg-slate-50 border-slate-100 hover:border-slate-200 focus:bg-white transition-all rounded-xl"
          />
        </div>
        {errors.confirmPassword && <p className="text-xs font-bold text-red-500 pl-1 pt-1">{errors.confirmPassword.message}</p>}
      </div>

      <div className="flex items-start space-x-2 px-1">
        <input 
            type="checkbox" 
            {...register('acceptTerms')}
            className="h-4 w-4 mt-0.5 accent-primary cursor-pointer" 
        />
        <label className="text-[10px] sm:text-xs font-medium text-slate-500 leading-tight">
            I agree to the <span className="text-primary font-bold hover:underline underline-offset-2 cursor-pointer">Terms of Service</span> and <span className="text-primary font-bold hover:underline underline-offset-2 cursor-pointer">Privacy Policy</span>.
        </label>
      </div>
      {errors.acceptTerms && <p className="text-xs font-bold text-red-500 pl-1">{errors.acceptTerms.message}</p>}

      <Button disabled={isLoading} className="w-full h-11 rounded-xl text-sm font-bold shadow-xl">
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Create Citizen Account
      </Button>
    </form>
  );
}
