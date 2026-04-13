"use client"

import React from 'react';
import Link from 'next/link';
import { Landmark, Mail, Phone, MapPin, Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        {/* Brand Section */}
        <div className="space-y-8">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-primary p-3 rounded-2xl group-hover:bg-accent transition-all duration-500 shadow-lg group-hover:rotate-6">
              <Landmark className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight text-primary">
              CivicCare<span className="text-accent">AI</span>
            </span>
          </Link>
          <p className="text-muted-foreground leading-relaxed font-medium">
            Bridging the gap between citizens and critical government services through 
            intelligent, accessible, and inclusive AI-driven solutions.
          </p>
          <div className="flex items-center space-x-3">
            {[
              { icon: Twitter, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: Github, href: '#' }
            ].map((social, i) => (
              <Link 
                key={i}
                href={social.href} 
                className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-accent hover:bg-accent/10 hover:rotate-6 transition-all duration-300"
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="space-y-8 lg:pl-10">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary/40">Platform</h4>
          <ul className="space-y-4">
            {['Browse Schemes', 'Hospital Finder', 'AI Chatbot', 'Document Vault'].map((item) => (
              <li key={item}>
                <Link href="#" className="flex items-center group text-muted-foreground hover:text-primary font-bold transition-all">
                  {item} <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-8 lg:pl-10">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary/40">Legal & Support</h4>
          <ul className="space-y-4">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map((item) => (
              <li key={item}>
                <Link href="#" className="flex items-center group text-muted-foreground hover:text-primary font-bold transition-all">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary/40">Get in Touch</h4>
          <ul className="space-y-6">
            <li className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <span className="text-muted-foreground font-medium">Civic Labs, Innovation Plaza, Tech City, 560001</span>
            </li>
            <li className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="h-5 w-5 text-accent" />
              </div>
              <span className="text-muted-foreground font-medium">+1 (555) 000-1111</span>
            </li>
            <li className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-accent" />
              </div>
              <span className="text-muted-foreground font-medium">support@civiccare.ai</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 mt-24 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center text-xs font-bold text-muted-foreground gap-4">
        <p>&copy; {currentYear} CivicCare AI Platform. Built for the future of digital citizenship.</p>
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          <span>System Status: Fully Operational</span>
        </div>
      </div>
    </footer>
  );
}
