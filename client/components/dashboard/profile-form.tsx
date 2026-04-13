"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileValues } from '@/lib/validation/user';
import { useAuth } from '@/hooks/use-auth';
import userService from '@/services/user.service';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Save, User as UserIcon, Phone, MapPin, Globe, Briefcase, IndianRupee, Activity } from 'lucide-react';

export function ProfileForm() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      profile: {
        phone: user?.profile?.phone || "",
        state: user?.profile?.state || "",
        city: user?.profile?.city || "",
        languagePreference: user?.profile?.languagePreference || "English",
        occupation: user?.profile?.occupation || "",
        category: user?.profile?.category || "General",
        incomeRange: user?.profile?.incomeRange || "",
        healthIssues: user?.profile?.healthIssues || [],
      }
    }
  });

  const onSubmit = async (data: ProfileValues) => {
    setIsLoading(true);
    try {
      const response = await userService.updateProfile(data);
      if (response.success) {
        toast.success("Profile updated successfully!");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Card className="border-none shadow-xl bg-white overflow-hidden">
        <CardHeader className="bg-primary p-8 text-white relative">
            <div className="absolute top-0 right-0 h-32 w-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 flex items-center space-x-6">
                <div className="h-20 w-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <UserIcon className="h-10 w-10 text-white" />
                </div>
                <div>
                    <CardTitle className="text-2xl font-black">Personal Metadata</CardTitle>
                    <CardDescription className="text-white/60 font-medium">Update your core profile to optimize AI recommendations</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Identity */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Basic Identity</h3>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-600">Full Name</label>
              <Input {...register('name')} placeholder="Legal name" />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-600">Phone Number</label>
              <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input {...register('profile.phone')} className="pl-10" placeholder="+91 00000 00000" />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Location Settings</h3>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1 text-sm font-bold">
                  <label>State</label>
                  <Input {...register('profile.state')} placeholder="e.g. Karnataka" />
               </div>
               <div className="space-y-1 text-sm font-bold">
                  <label>City</label>
                  <Input {...register('profile.city')} placeholder="e.g. Bangalore" />
               </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-600">Preferred Language</label>
              <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input {...register('profile.languagePreference')} className="pl-10" />
              </div>
            </div>
          </div>

          {/* Demographics */}
          <div className="space-y-4 md:col-span-2 border-t pt-8">
             <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Citizen Classification</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-600">Occupation</label>
                    <div className="relative">
                        <Briefcase className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input {...register('profile.occupation')} className="pl-10" placeholder="Self-employed" />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-600">Annual Income Range</label>
                    <div className="relative">
                        <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input {...register('profile.incomeRange')} className="pl-10" placeholder="e.g. 5L - 10L" />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-600">Category (Caste/Quota)</label>
                    <Input {...register('profile.category')} placeholder="General/OBC/SC/ST" />
                </div>
             </div>
          </div>

          {/* Health */}
          <div className="space-y-4 md:col-span-2 border-t pt-8">
             <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Healthcare Context</h3>
             <div className="space-y-1">
                <label className="text-sm font-bold text-slate-600">Critical Health Issues</label>
                <div className="relative">
                    <Activity className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                        placeholder="Comma separated: Diabetes, Hypertension..." 
                        className="pl-10"
                        onChange={(e) => {
                            const val = e.target.value.split(',').map(s => s.trim());
                            // Handle array state if needed or just pass string for now
                        }}
                    />
                </div>
             </div>
          </div>
        </CardContent>
        <div className="bg-slate-50 p-8 border-t flex items-center justify-between">
            <p className="text-xs text-slate-500 font-medium">Last updated: Just now</p>
            <Button disabled={isLoading} size="lg" className="rounded-xl px-12 shadow-2xl hover:bg-slate-800 transition-all">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Sync Profile Credentials
            </Button>
        </div>
      </Card>
    </form>
  );
}
