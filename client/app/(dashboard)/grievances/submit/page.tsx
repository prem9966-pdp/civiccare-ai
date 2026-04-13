"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  AlertCircle, 
  CheckCircle2, 
  Send, 
  MapPin, 
  Building2, 
  ChevronRight,
  Loader2,
  FileText,
  ShieldCheck,
  Activity,
  ArrowLeft,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import grievanceService from '@/services/grievance.service';
import { motion } from 'framer-motion';

const CATEGORIES = [
  "Public Infrastructure",
  "Sanitation & Waste",
  "Public Health",
  "Traffic & Transport",
  "Electric & Power",
  "Water Supply",
  "Education",
  "Social Welfare",
  "Safety & Security",
  "Other"
];

const DEPARTMENTS = [
  "Municipal Corporation (BMC)",
  "Urban Development Dept",
  "PWD (Public Works Dept)",
  "Health Department",
  "Traffic Police",
  "Pollution Control Board",
  "Education Department",
  "Social Justice Dept",
  "Ministry of Home Affairs"
];

export default function SubmitGrievancePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    department: '',
    location: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.department || !formData.location || !formData.description) {
      toast.error("Please fill all fields");
      return;
    }

    setIsLoading(true);
    try {
      await grievanceService.submitGrievance(formData);
      toast.success("Grievance submitted successfully!");
      router.push('/grievances/my');
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to submit grievance");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-rose-500/10 px-4 py-1.5 rounded-full border border-rose-500/20">
            <AlertCircle className="h-4 w-4 text-rose-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">Citizen Reporting Engine</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-primary tracking-tighter leading-none">
            File a <span className="text-accent underline decoration-accent/20 italic">Grievance.</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-xl">
            Report civic issues directly to relevant departments for fast tracking and resolution.
          </p>
        </div>
        <Button 
          variant="outline"
          onClick={() => router.push('/grievances/my')}
          className="rounded-2xl h-16 px-8 font-black uppercase tracking-widest border-slate-200 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          View History
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Form Area */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-7"
        >
          <Card className="rounded-[50px] border-slate-100 shadow-2xl shadow-slate-200/50 bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-10">
                <div className="flex items-center space-x-4 mb-2">
                    <div className="bg-primary/5 p-3 rounded-2xl">
                        <Send className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-black text-primary tracking-tight italic">Submission Intake</CardTitle>
                        <CardDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest">Formal Departmental Request</CardDescription>
                    </div>
                </div>
            </CardHeader>
            
            <CardContent className="p-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Grievance Subject</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g. Major water logging at Station Road"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="rounded-2xl bg-slate-50 border-none h-14 px-6 text-base font-bold focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Issue Classification</Label>
                    <select 
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full h-14 rounded-2xl bg-slate-50 border-none px-6 text-sm font-bold appearance-none outline-none focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
                    >
                      <option value="">Select Category</option>
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="department" className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Target Department</Label>
                    <select 
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="w-full h-14 rounded-2xl bg-slate-50 border-none px-6 text-sm font-bold appearance-none outline-none focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
                    >
                      <option value="">Select Department</option>
                      {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="location" className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Incident Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                    <Input 
                      id="location" 
                      placeholder="Street, Building, or Landmark"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="rounded-2xl bg-slate-50 border-none h-14 pl-14 pr-6 text-base font-bold focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Evidence & Context</Label>
                  <Textarea 
                    id="description" 
                    rows={6}
                    placeholder="Provide specific details, landmarks, and impact of the issue..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="rounded-[32px] bg-slate-50 border-none p-8 text-base font-bold focus:ring-2 focus:ring-primary/10 leading-relaxed italic"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-20 rounded-[28px] text-lg font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-all bg-primary group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-3">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>Transmitting Report...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <span>Dispatch Grievance</span>
                      <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar Info */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-5 space-y-8"
        >
          <div className="bg-slate-900 rounded-[50px] p-12 text-white space-y-8 relative overflow-hidden group shadow-2xl">
             <div className="absolute top-0 right-0 h-40 w-40 bg-accent/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
             <div className="space-y-4 relative z-10">
                <div className="h-14 w-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                   <ShieldCheck className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-3xl font-black tracking-tight italic">Citizen Rights & SLA</h3>
                <p className="text-white/60 font-medium leading-relaxed italic">
                  "Under the Right to Service Act, civic bodies are mandated to provide an initial response within 3-7 working days for public infrastructure issues."
                </p>
             </div>
             
             <div className="space-y-6 relative z-10">
                {[
                  { icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />, title: "Live Tracking", desc: "Real-time updates via dashboard and SMS." },
                  { icon: <Building2 className="h-5 w-5 text-blue-500" />, title: "Automated Routing", desc: "AI directs reports to exactly the right desk." },
                  { icon: <Activity className="h-5 w-5 text-accent" />, title: "Priority Engine", desc: "Emergency sanitation and safety gets fast-tracked." }
                ].map((tip, i) => (
                  <div key={i} className="flex items-start space-x-4 p-4 bg-white/5 rounded-3xl border border-white/5 transition-colors hover:bg-white/10">
                    <div className="bg-white/10 p-2 rounded-xl h-fit">{tip.icon}</div>
                    <div className="space-y-1">
                        <h4 className="font-black text-xs uppercase tracking-widest">{tip.title}</h4>
                        <p className="text-xs text-white/40 font-bold italic">{tip.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-[40px] p-10 space-y-6 shadow-sm">
             <div className="flex items-center space-x-3">
                <Info className="h-5 w-5 text-primary" />
                <h4 className="text-lg font-black text-primary tracking-tight italic">Before Submission</h4>
             </div>
             <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Ensure you have provided the precise location and a clear description. 
                Vague reports may lead to slower resolution times or rejection by the department.
             </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
