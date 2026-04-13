"use client"

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  User as UserIcon, 
  Mail, 
  ShieldCheck, 
  Save, 
  Loader2, 
  Activity, 
  Eye, 
  Bookmark, 
  MessageSquare,
  ArrowRight,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  Camera,
  Settings,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'activity' | 'schemes'>('info');

  const handleSave = async () => {
    setIsUpdating(true);
    // Mocking update delay
    await new Promise(r => setTimeout(r, 1000));
    setIsUpdating(false);
    toast.success("Profile synchronized with CivicCloud.");
  };

  const stats = [
    { label: "Schemes Viewed", val: "42", icon: Eye, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Saved Schemes", val: "08", icon: Bookmark, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Grievances Filed", val: "03", icon: MessageSquare, color: "text-rose-500", bg: "bg-rose-50" }
  ];

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto space-y-12 pb-20">
        {/* Profile Identity Header */}
        <section className="bg-slate-900 rounded-[50px] p-12 text-white relative overflow-hidden group shadow-2xl">
           <div className="absolute top-0 right-0 h-full w-1/3 bg-white/5 skew-x-[-20deg] translate-x-1/2 pointer-events-none" />
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="relative">
                 <div className="h-40 w-40 rounded-[40px] bg-gradient-to-tr from-accent to-primary p-1 border-4 border-white/10">
                    <div className="h-full w-full rounded-[36px] bg-slate-800 flex items-center justify-center overflow-hidden">
                       <UserIcon className="h-20 w-20 text-white/20" />
                    </div>
                 </div>
                 <button className="absolute -bottom-2 -right-2 h-12 w-12 bg-white text-primary rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
                    <Camera className="h-5 w-5" />
                 </button>
              </div>

              <div className="text-center md:text-left space-y-4">
                 <div className="flex items-center justify-center md:justify-start space-x-3">
                    <h1 className="text-5xl font-black tracking-tighter italic">{user?.name || "Citizen User"}</h1>
                    <div className="px-4 py-1.5 bg-accent text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                       Verified Citizen
                    </div>
                 </div>
                 <div className="flex flex-wrap justify-center md:justify-start gap-6 text-white/50 font-medium">
                    <div className="flex items-center space-x-2"><Mail size={16} /> <span>{user?.email}</span></div>
                    <div className="flex items-center space-x-2"><ShieldCheck size={16} /> <span>Role: {user?.role || "Resident"}</span></div>
                    <div className="flex items-center space-x-2"><MapPin size={16} /> <span>Mumbai, IN</span></div>
                 </div>
              </div>

              <div className="flex-1 flex justify-center md:justify-end gap-3">
                  <Button variant="outline" className="h-14 w-14 rounded-2xl border-white/10 text-white bg-white/5 hover:bg-white/10">
                    <Settings className="h-6 w-6" />
                  </Button>
                  <Button variant="outline" className="h-14 w-14 rounded-2xl border-white/10 text-white bg-white/5 hover:bg-white/10">
                    <Bell className="h-6 w-6" />
                  </Button>
              </div>
           </div>
        </section>

        {/* Global Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {stats.map((stat, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
             >
               <Card className="rounded-[40px] border-slate-100 shadow-xl p-10 hover:shadow-2xl transition-all group cursor-default">
                  <div className="flex items-center justify-between">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                        <h4 className="text-5xl font-black text-primary tracking-tighter">{stat.val}</h4>
                     </div>
                     <div className={cn("h-16 w-16 rounded-[24px] flex items-center justify-center group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                        <stat.icon size={32} />
                     </div>
                  </div>
               </Card>
             </motion.div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
           {/* Section Selector / Sub-navigation */}
           <div className="lg:col-span-3 space-y-3">
              {[
                { id: 'info', label: 'Identity Settings', icon: UserIcon },
                { id: 'schemes', label: 'Saved Schemes', icon: Bookmark },
                { id: 'activity', label: 'Recent Activity', icon: Activity }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "w-full p-6 h-20 rounded-[28px] flex items-center justify-between transition-all font-black text-xs uppercase tracking-widest",
                    activeTab === tab.id 
                      ? "bg-primary text-white shadow-2xl shadow-primary/20 scale-[1.05]" 
                      : "bg-white text-slate-400 border border-slate-50 hover:border-slate-100"
                  )}
                >
                  <div className="flex items-center space-x-4">
                     <tab.icon size={20} />
                     <span>{tab.label}</span>
                  </div>
                  {activeTab === tab.id && <ArrowRight size={16} />}
                </button>
              ))}
              
              <div className="pt-6 border-t mt-6">
                 <Button 
                   variant="ghost" 
                   onClick={() => router.push('/grievances/my')}
                   className="w-full h-16 rounded-2xl font-black uppercase text-[10px] tracking-widest text-rose-500 hover:bg-rose-50"
                 >
                   <MessageSquare className="h-4 w-4 mr-2" /> View My Grievances
                 </Button>
              </div>
           </div>

           {/* Content Window */}
           <div className="lg:col-span-9">
              <AnimatePresence mode="wait">
                {activeTab === 'info' && (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Card className="rounded-[50px] border-slate-100 shadow-2xl bg-white overflow-hidden">
                       <div className="p-10 space-y-10">
                          <div className="flex items-center justify-between">
                             <div className="space-y-1">
                                <h3 className="text-3xl font-black text-primary tracking-tight">Profile Integrity</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Update your documentation and preferences</p>
                             </div>
                             <div className="h-12 w-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                                <Sparkles size={24} />
                             </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="space-y-8">
                                <div className="space-y-3">
                                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Full Name</label>
                                   <div className="relative">
                                      <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                                      <Input defaultValue={user?.name} className="h-16 pl-14 rounded-2xl bg-slate-50 border-none font-bold" />
                                   </div>
                                </div>
                                <div className="space-y-3">
                                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Primary Email</label>
                                   <div className="relative">
                                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                                      <Input defaultValue={user?.email} disabled className="h-16 pl-14 rounded-2xl bg-slate-50 border-none font-bold opacity-60" />
                                   </div>
                                </div>
                             </div>

                             <div className="space-y-8">
                                <div className="space-y-3">
                                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Active Phone</label>
                                   <div className="relative">
                                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                                      <Input defaultValue={user?.profile?.phone || "+91 999 000 000"} className="h-16 pl-14 rounded-2xl bg-slate-50 border-none font-bold" />
                                   </div>
                                </div>
                                <div className="space-y-3">
                                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Resident City</label>
                                   <div className="relative">
                                      <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                                      <Input defaultValue={user?.profile?.city || "Mumbai"} className="h-16 pl-14 rounded-2xl bg-slate-50 border-none font-bold" />
                                   </div>
                                </div>
                             </div>
                          </div>

                          <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 flex items-center justify-between">
                             <div className="flex items-center space-x-4">
                                <Calendar className="h-10 w-10 text-primary/20" />
                                <div>
                                   <p className="text-sm font-black text-primary">Member since 2024</p>
                                   <p className="text-xs text-slate-400 font-bold">Account secured with CivicSSL</p>
                                </div>
                             </div>
                             <Button 
                               disabled={isUpdating}
                               onClick={handleSave}
                               className="h-16 px-12 rounded-2xl font-black uppercase tracking-widest bg-primary shadow-xl shadow-primary/20 hover:scale-[1.02]"
                             >
                               {isUpdating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5 mr-3" />}
                               Synchronize Profile
                             </Button>
                          </div>
                       </div>
                    </Card>
                  </motion.div>
                )}

                {activeTab === 'schemes' && (
                  <motion.div
                    key="schemes"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                     <div className="space-y-8">
                        <div className="flex items-center justify-between px-2">
                           <h3 className="text-3xl font-black text-primary tracking-tight">Saved Welfare <span className="text-slate-300 italic">Programs</span></h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[1, 2].map(i => (
                              <Card key={i} className="rounded-[40px] border-slate-100 shadow-xl p-10 space-y-6 group hover:shadow-2xl transition-all">
                                 <div className="h-14 w-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
                                    <Bookmark size={28} />
                                 </div>
                                 <div className="space-y-2">
                                    <h4 className="text-xl font-black text-primary italic leading-tight">National Health Scheme {i}</h4>
                                    <p className="text-sm text-slate-400 font-medium">Verified benefit for registered residents with basic health coverage.</p>
                                 </div>
                                 <Button variant="link" className="p-0 h-auto font-black text-[10px] uppercase tracking-widest text-primary flex items-center">
                                    Continue Application <ArrowRight size={14} className="ml-2 group-hover:translate-x-1" />
                                 </Button>
                              </Card>
                            ))}
                        </div>
                     </div>
                  </motion.div>
                )}

                {activeTab === 'activity' && (
                  <motion.div
                    key="activity"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                     <Card className="rounded-[40px] border-slate-100 shadow-xl overflow-hidden">
                        <div className="p-10 space-y-8">
                           <h3 className="text-3xl font-black text-primary tracking-tight">Recent Interactions</h3>
                           <div className="space-y-4">
                              {[
                                { title: "Viewed Metro Subsidy Scheme", time: "2 hours ago", type: "View" },
                                { title: "Updated Residency Status", time: "1 day ago", type: "Account" },
                                { title: "Filed Sanitation Grievance", time: "3 days ago", type: "Resolution" }
                              ].map((act, i) => (
                                <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-transparent hover:border-slate-100 transition-colors">
                                   <div className="flex items-center space-x-4">
                                      <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary/40 leading-none font-black text-[10px]">
                                         {act.type[0]}
                                      </div>
                                      <div>
                                         <p className="text-sm font-black text-primary">{act.title}</p>
                                         <p className="text-xs text-slate-400 font-bold">{act.time}</p>
                                      </div>
                                   </div>
                                   <ChevronRight size={16} className="text-slate-200" />
                                </div>
                              ))}
                           </div>
                        </div>
                     </Card>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

function ChevronRight(props: any) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
