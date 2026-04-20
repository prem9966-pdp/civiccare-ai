"use client"

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Settings as SettingsIcon, 
  Bell, 
  ShieldSecret, 
  User, 
  LogOut, 
  Globe, 
  Smartphone,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'notifications'>('general');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
    toast.success("Settings synchronized with CivicCloud.");
  };

  const tabs = [
    { id: 'general', label: 'General Settings', icon: Globe },
    { id: 'security', label: 'Security & Privacy', icon: Lock },
    { id: 'notifications', label: 'Alert Preferences', icon: Bell }
  ];

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto space-y-12 pb-20">
        {/* Header section with high-contrast premium feel */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
          <div className="space-y-3">
             <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">System Configuration</span>
             </div>
             <h1 className="text-5xl md:text-6xl font-black text-primary tracking-tighter leading-none italic">
                User <span className="text-accent underline decoration-accent/20">Settings.</span>
             </h1>
             <p className="text-lg text-muted-foreground font-medium max-w-xl">
                Configure your digital identity, security protocols, and real-time governance alerts.
             </p>
          </div>
          <div className="h-16 w-16 rounded-[24px] bg-white border border-slate-100 shadow-xl flex items-center justify-center text-primary rotate-3">
            <SettingsIcon className="h-8 w-8" />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
           {/* Sidebar Navigation */}
           <div className="lg:col-span-4 space-y-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "w-full p-8 rounded-[36px] flex items-center justify-between transition-all duration-300 font-black text-xs uppercase tracking-[0.2em]",
                    activeTab === tab.id 
                      ? "bg-slate-900 text-white shadow-2xl shadow-slate-900/20 translate-x-2" 
                      : "bg-white text-slate-400 border border-slate-50 hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-center space-x-5">
                     <tab.icon size={24} className={activeTab === tab.id ? "text-accent" : "text-slate-300"} />
                     <span>{tab.label}</span>
                  </div>
                  {activeTab === tab.id && <Zap size={14} className="text-accent animate-pulse" />}
                </button>
              ))}

              <div className="pt-10 border-t border-slate-100 mt-10">
                 <Button 
                   variant="ghost" 
                   className="w-full h-20 rounded-[30px] border-2 border-transparent hover:border-rose-100 hover:bg-rose-50 text-rose-500 font-black uppercase text-xs tracking-[0.3em] transition-all group"
                   onClick={() => logout?.()}
                 >
                   <LogOut className="h-5 w-5 mr-3 group-hover:-translate-x-1 transition-transform" /> 
                   Terminate Session
                 </Button>
              </div>
           </div>

           {/* Content Window */}
           <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {activeTab === 'general' && (
                    <Card className="rounded-[50px] border-none shadow-2xl shadow-slate-200/50 bg-white overflow-hidden">
                       <CardHeader className="p-10 pb-6 bg-slate-50/50">
                          <CardTitle className="text-3xl font-black text-primary tracking-tight">System Preferences</CardTitle>
                          <CardDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Global platform behavior and display options</CardDescription>
                       </CardHeader>
                       <CardContent className="p-10 space-y-10">
                          <div className="space-y-6">
                             <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[32px] border border-slate-100/50">
                                <div className="space-y-1">
                                   <p className="text-sm font-black text-primary">Dynamic Dashboard</p>
                                   <p className="text-xs text-slate-400 font-medium italic">Adjust layout based on recent activity</p>
                                </div>
                                <Switch defaultChecked />
                             </div>
                             
                             <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[32px] border border-slate-100/50">
                                <div className="space-y-1">
                                   <p className="text-sm font-black text-primary">Multi-language Support</p>
                                   <p className="text-xs text-slate-400 font-medium italic">Auto-translate scheme details</p>
                                </div>
                                <Switch defaultChecked />
                             </div>

                             <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[32px] border border-slate-100/50">
                                <div className="space-y-1">
                                   <p className="text-sm font-black text-primary">Analytics Engine</p>
                                   <p className="text-xs text-slate-400 font-medium italic">Anonymous data sharing for better civic insights</p>
                                </div>
                                <Switch />
                             </div>
                          </div>

                          <Button 
                            className="w-full h-20 rounded-[28px] bg-slate-900 text-white font-black uppercase text-sm tracking-[0.2em] shadow-2xl hover:scale-[1.01] transition-all"
                            onClick={handleSave}
                            disabled={isSaving}
                          >
                             {isSaving ? "Synchronizing..." : "Apply General Updates"}
                          </Button>
                       </CardContent>
                    </Card>
                  )}

                  {activeTab === 'security' && (
                    <Card className="rounded-[50px] border-none shadow-2xl bg-white overflow-hidden">
                       <CardHeader className="p-10 pb-6 bg-slate-900 text-white relative overflow-hidden">
                          <div className="absolute top-0 right-0 h-40 w-40 bg-accent/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
                          <CardTitle className="text-3xl font-black tracking-tight relative z-10 italic">Vault Security</CardTitle>
                          <CardDescription className="text-xs font-bold text-white/50 uppercase tracking-widest mt-1 relative z-10">Advanced protection for your citizen data</CardDescription>
                       </CardHeader>
                       <CardContent className="p-10 space-y-8">
                          <div className="p-8 border-2 border-slate-50 rounded-[32px] space-y-6">
                             <div className="flex items-center space-x-4 mb-4">
                                <div className="h-12 w-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-100">
                                   <ShieldCheck size={24} />
                                </div>
                                <h4 className="text-xl font-black text-primary tracking-tight">Two-Factor Authentication</h4>
                             </div>
                             <p className="text-sm text-slate-500 font-medium leading-relaxed">Add an extra layer of security to your account by requiring a verification code for all new sessions.</p>
                             <Button className="h-14 px-10 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-emerald-200">
                                Enable 2FA Now
                             </Button>
                          </div>

                          <div className="space-y-4 pt-4">
                             <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[24px]">
                                <span className="text-sm font-black text-primary">Login Alerts</span>
                                <Switch defaultChecked />
                             </div>
                             <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[24px]">
                                <span className="text-sm font-black text-primary">Session Management</span>
                                <Button variant="ghost" className="text-xs font-black uppercase text-accent">Active</Button>
                             </div>
                          </div>
                       </CardContent>
                    </Card>
                  )}

                  {activeTab === 'notifications' && (
                    <Card className="rounded-[50px] border-none shadow-2xl bg-white overflow-hidden">
                       <CardHeader className="p-10 pb-6 bg-accent text-white">
                          <CardTitle className="text-3xl font-black tracking-tight">Alert Hub</CardTitle>
                          <CardDescription className="text-xs font-bold text-white/60 uppercase tracking-widest mt-1">Real-time civic and scheme notifications</CardDescription>
                       </CardHeader>
                       <CardContent className="p-10 space-y-8">
                          {[
                            { title: "Scheme Match Alerts", desc: "Get notified as soon as you become eligible for a new benefit.", icon: Zap },
                            { title: "Grievance Updates", desc: "Status changes for your filed reports sent directly to your device.", icon: MessageSquare },
                            { title: "Civic Warnings", desc: "Emergency sanitation, traffic, and water supply alerts in your region.", icon: Bell }
                          ].map((item, i) => (
                            <div key={i} className="flex items-start justify-between p-8 hover:bg-slate-50/50 rounded-[32px] transition-all border border-transparent hover:border-slate-50">
                               <div className="flex items-start space-x-6">
                                  <div className="mt-1 h-12 w-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                     <item.icon size={24} />
                                  </div>
                                  <div className="space-y-1">
                                     <p className="text-lg font-black text-primary italic leading-none">{item.title}</p>
                                     <p className="text-sm text-slate-400 font-medium max-w-sm">{item.desc}</p>
                                  </div>
                               </div>
                               <Switch defaultChecked />
                            </div>
                          ))}
                       </CardContent>
                    </Card>
                  )}
                </motion.div>
              </AnimatePresence>
           </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

function ShieldSecret(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function MessageSquare(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
