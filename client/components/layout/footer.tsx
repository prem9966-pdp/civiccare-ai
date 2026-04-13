import React from 'react';
import Link from 'next/link';
import { Landmark, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-primary p-2 rounded-lg group-hover:bg-accent transition-colors">
              <Landmark className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">
              CivicCare<span className="text-accent">AI</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Bridging the gap between citizens and critical government services through 
            intelligent, accessible, and inclusive AI-driven solutions.
          </p>
          <div className="flex items-center space-x-4 pt-2">
            <Link href="#" className="h-8 w-8 bg-white border rounded-full flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-all">
              <Twitter className="h-4 w-4" />
            </Link>
            <Link href="#" className="h-8 w-8 bg-white border rounded-full flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-all">
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link href="#" className="h-8 w-8 bg-white border rounded-full flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-all">
              <Github className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Resources */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-primary opacity-60">Resources</h4>
          <ul className="space-y-3">
            {['Browse Schemes', 'Hospital Finder', 'AI Chatbot', 'Document Vault'].map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-primary opacity-60">Support</h4>
          <ul className="space-y-3">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-primary opacity-60">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start space-x-3">
              <MapPin className="h-4 w-4 mt-0.5" />
              <span>Civic Labs, Innovation Plaza, Tech City, 560001</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="h-4 w-4" />
              <span>+1 (555) 000-1111</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="h-4 w-4" />
              <span>support@civiccare.ai</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-slate-200 text-center text-xs text-muted-foreground">
        <p>&copy; {currentYear} CivicCare AI Platform. All rights reserved. Designed for digital impact.</p>
      </div>
    </footer>
  );
}
