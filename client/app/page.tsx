"use client"

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Search, 
  MapPin, 
  FileText, 
  MessageSquare, 
  Shield, 
  Zap, 
  Users,
  CheckCircle2,
  Landmark,
  HeartPulse,
  BrainCircuit,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 rounded-l-[100px] -z-10 hidden lg:block" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />
          
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={stagger}
              className="space-y-8"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center space-x-2 bg-slate-100 border border-slate-200 px-4 py-2 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Reimagining Civic Support</span>
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-6xl md:text-7xl font-black text-primary leading-[1.1] tracking-tight">
                Empowering <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-accent">Citizens</span> with AI
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Your intelligent companion for government schemes, healthcare mapping, 
                and automated civic assistance. Accessible. Inclusive. Smarter.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="h-16 px-8 text-lg rounded-2xl bg-primary hover:bg-slate-800 shadow-xl shadow-primary/20 group">
                  <Link href="/register" className="flex items-center">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="h-16 px-8 text-lg rounded-2xl border-2 hover:bg-slate-50">
                  <Link href="#services" className="flex items-center">
                    Explore Services
                  </Link>
                </Button>
              </motion.div>

              <motion.div variants={fadeIn} className="flex items-center space-x-6 pt-4 text-sm text-muted-foreground">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
                    </div>
                  ))}
                  <div className="h-10 w-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] text-white font-bold">
                    10k+
                  </div>
                </div>
                <p>Trusted by citizens nationwide</p>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative bg-white rounded-[40px] shadow-2xl border border-slate-100 p-4 aspect-[4/3] overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white -z-10" />
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="space-y-4">
                    <div className="h-2/3 bg-slate-50 rounded-3xl p-6 flex flex-col justify-end">
                      <div className="h-12 w-12 bg-accent/20 rounded-2xl flex items-center justify-center mb-4">
                        <BrainCircuit className="text-accent h-6 w-6" />
                      </div>
                      <h4 className="font-bold text-primary">AI Scheme Matching</h4>
                    </div>
                    <div className="h-1/3 bg-primary rounded-3xl p-6 text-white flex flex-col justify-center">
                      <HeartPulse className="h-6 w-6 mb-2" />
                      <p className="text-xs font-medium opacity-80">Healthcare Maps</p>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="h-1/3 bg-accent rounded-3xl p-6 text-white flex flex-col justify-center">
                      <FileText className="h-6 w-6 mb-2" />
                      <p className="text-xs font-medium">Automatic Grievance</p>
                    </div>
                    <div className="h-2/3 bg-slate-100 rounded-3xl p-6 flex flex-col justify-end">
                      <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                        <Users className="text-primary h-6 w-6" />
                      </div>
                      <h4 className="font-bold text-primary">Community Driven</h4>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 bg-white shadow-xl rounded-2xl p-4 border border-slate-50 flex items-center space-x-3"
                >
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Scheme Matched!</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-4 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent font-bold uppercase tracking-[0.2em] text-sm"
            >
              Core Platform
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-primary"
            >
              Services for Every Citizen
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Unified access to tools that make government interaction seamless, 
              healthcare discovery faster, and civic rights more accessible.
            </motion.p>
          </div>

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Scheme Finder',
                desc: 'Intelligent search for government welfare programs based on your profile.',
                icon: Search,
                color: 'text-blue-600',
                bg: 'bg-blue-50',
                href: '/dashboard/schemes'
              },
              {
                title: 'Healthcare Map',
                desc: 'Locate nearby public hospitals, clinics, and specialists with real-time tracking.',
                icon: MapPin,
                color: 'text-rose-600',
                bg: 'bg-rose-50',
                href: '/hospital-map'
              },
              {
                title: 'Grievance Portal',
                desc: 'Automated documentation and tracking for formal complaints and applications.',
                icon: FileText,
                color: 'text-emerald-600',
                bg: 'bg-emerald-50',
                href: '/grievances'
              },
              {
                title: 'AI Assistance',
                desc: '24/7 intelligent multilingual support for all your civic and administrative queries.',
                icon: MessageSquare,
                color: 'text-violet-600',
                bg: 'bg-violet-50',
                href: '/chat'
              }
            ].map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 transition-all hover:shadow-xl group"
              >
                <div className={`h-16 w-16 ${service.bg} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  <service.icon className={`h-8 w-8 ${service.color}`} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>
                <Link 
                  href={service.href} 
                  className="flex items-center text-sm font-bold text-primary group-hover:text-accent transition-colors"
                >
                  Explore Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10" />
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200" 
                alt="Civic Work" 
                className="rounded-[40px] shadow-2xl border-4 border-white aspect-square object-cover"
              />
              <div className="absolute -bottom-10 -right-10 bg-primary p-10 rounded-[32px] text-white shadow-2xl hidden md:block max-w-[280px]">
                <Globe className="h-10 w-10 text-accent mb-4" />
                <p className="text-lg font-bold">Bridging the digital divide for millions of citizens.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="text-accent font-bold uppercase tracking-[0.2em] text-sm">Our Mission</span>
                <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight">
                  Democratizing Access to <br /> Governance
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  CivicCare AI was born from the vision of making government interaction 
                  radically simple. We believe that every citizen, regardless of their 
                  technical expertise, should have clear, direct access to the services 
                  they are entitled to.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'Inclusivity', desc: 'Removing barriers for all communities.' },
                  { title: 'Intelligence', desc: 'Personalized results with AI.' },
                  { title: 'Transparency', desc: 'Clear tracking of civic processes.' },
                  { title: 'Accessibility', desc: 'Mobile-first, simple interfaces.' }
                ].map((item) => (
                  <div key={item.title} className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center mt-1">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-24 bg-slate-900 text-white rounded-[60px] mx-6 my-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -z-0 translate-x-1/2 -translate-y-1/2" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-4 mb-20">
            <span className="text-accent font-bold uppercase tracking-[0.2em] text-sm italic">User Journey</span>
            <h2 className="text-4xl md:text-5xl font-black">How CivicCare AI Works</h2>
          </div>

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Create Your Profile',
                desc: 'Sign up and tell us about your needs, eligibility, and location.',
                icon: Shield
              },
              {
                step: '02',
                title: 'Get AI Insights',
                desc: 'Our AI engine matches you with schemes and healthcare services instantly.',
                icon: Zap
              },
              {
                step: '03',
                title: 'Execute & Track',
                desc: 'Apply for services and track your applications directly from your dashboard.',
                icon: FileText
              }
            ].map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative group text-center md:text-left"
              >
                <div className="text-8xl font-black text-white/5 absolute -top-8 -left-4 md:left-0 group-hover:text-accent/20 transition-colors">
                  {step.step}
                </div>
                <div className="space-y-6 relative">
                  <div className="h-16 w-16 bg-white/10 rounded-[24px] flex items-center justify-center backdrop-blur-sm group-hover:bg-accent transition-colors">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                  <p className="text-white/60 leading-relaxed italic">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-24 bg-white relative">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-accent rounded-[48px] p-12 md:p-20 text-center text-white shadow-2xl shadow-accent/40 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/10 -z-0" />
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
              
              <div className="relative z-10 space-y-8">
                <h2 className="text-4xl md:text-6xl font-black leading-tight">
                  Ready to take control of <br /> your civic journey?
                </h2>
                <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
                  Join thousands of citizens who are already using CivicCare AI to 
                  improve their access to government and healthcare.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button size="lg" asChild className="bg-white text-accent hover:bg-slate-50 h-16 px-12 text-lg font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95">
                    <Link href="/register">Sign Up Now</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="h-16 px-12 text-lg font-bold rounded-2xl border-white/40 text-white hover:bg-white/10">
                    <Link href="/contact">Talk to Us</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
