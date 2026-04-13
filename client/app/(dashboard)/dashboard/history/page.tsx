"use client"

import React, { useState, useEffect } from 'react';
import { ActivityTimeline } from '@/components/dashboard/activity-timeline';
import { NotificationList } from '@/components/dashboard/notification-list';
import notificationService from '@/services/notification.service';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Bell, Activity, ArrowRight, History, Sparkles, AlertCircle, Info } from 'lucide-react';

export default function HistoryPage() {
  const [timeline, setTimeline] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const timelineRes = await notificationService.getTimeline();
      const notificationRes = await notificationService.getNotifications();
      if (timelineRes.success) setTimeline(timelineRes.data);
      if (notificationRes.success) setNotifications(notificationRes.data);
    } catch (error) {
      console.error("Failed to load history data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMarkRead = async (id: string) => {
      try {
          await notificationService.markRead(id);
          setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
      } catch (error) {
          console.error("Mark read failed", error);
      }
  };

  const handleMarkAllRead = async () => {
      try {
          await notificationService.markAllRead();
          setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      } catch (error) {
          console.error("Mark all read failed", error);
      }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-12 pb-24 h-full">
        <section className="flex flex-col md:flex-row md:items-end justify-between px-2 gap-8">
            <div className="space-y-3">
               <h1 className="text-5xl font-black text-primary tracking-tighter">
                  Activity <span className="text-accent underline decoration-accent/20 tracking-tighter">Timeline</span>
               </h1>
               <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
                  Every interaction with CivicCare AI is documented and synchronized. Track your historical journey across all modules.
               </p>
            </div>
            <div className="flex items-center space-x-6 bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100/50 group relative overflow-hidden">
                <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform"></div>
                <div className="h-14 w-14 bg-primary text-white rounded-2xl flex items-center justify-center relative z-10 group-hover:rotate-12 transition-transform">
                   <Activity className="h-8 w-8" />
                </div>
                <div className="relative z-10">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 opacity-60">Session Audit</p>
                   <p className="text-2xl font-black text-primary mt-1 tracking-tighter">Synchronized</p>
                </div>
            </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Timeline Section (7/12) */}
            <div className="lg:col-span-7 h-[calc(100vh-280px)] overflow-y-auto pr-2 custom-scrollbar pb-12">
                <div className="flex items-center space-x-4 mb-10 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                    <Sparkles className="h-5 w-5 text-accent animate-pulse" />
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Master Trail of {timeline.length} Records</p>
                </div>
                <ActivityTimeline items={timeline} />
            </div>

            {/* Notification Sidebar (5/12) */}
            <div className="lg:col-span-5 h-[calc(100vh-280px)]">
                <div className="mb-10 space-y-4">
                   <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Alert Hub</h2>
                   <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex items-center space-x-4 shadow-sm">
                       <div className="h-10 w-10 bg-amber-500 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
                           <AlertCircle className="h-6 w-6" />
                       </div>
                       <div>
                           <p className="text-xs font-black text-amber-700 uppercase tracking-widest leading-none">Security Guard Active</p>
                           <p className="text-xs font-bold text-amber-600 mt-1 leading-tight">CivicCare AI only notifies you about verified government circulars and your scheme progress.</p>
                       </div>
                   </div>
                </div>
                
                <NotificationList 
                    notifications={notifications} 
                    onMarkRead={handleMarkRead} 
                    onMarkAllRead={handleMarkAllRead} 
                />

                <div className="mt-10 p-10 bg-primary/5 rounded-[2.5rem] border border-primary/10 shadow-xl relative group overflow-hidden">
                    <div className="absolute top-0 right-0 h-48 w-48 bg-white opacity-40 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:scale-110 transition-transform"></div>
                    <div className="relative z-10 space-y-6">
                        <Info className="h-10 w-10 text-primary" />
                        <h3 className="text-2xl font-black text-primary tracking-tighter">Smart Delivery</h3>
                        <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-[200px]">AI prioritizes life-saving alerts over general info updates.</p>
                        <button className="flex items-center space-x-2 text-[10px] font-black uppercase text-primary tracking-widest hover:text-accent transition-colors">
                            Manage Subscriptions <ArrowRight className="h-3 w-3" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
