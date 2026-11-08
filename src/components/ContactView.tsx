'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  Building2, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Compass,
  MessageSquare,
  Globe2,
  ExternalLink
} from 'lucide-react';
import { TabView } from '../types';

interface ContactViewProps {
  onNavigate?: (tab: TabView) => void;
  onOpenWaitlist?: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate, onOpenWaitlist }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Enterprise AI & Autonomous Swarms',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="relative min-h-screen pb-24 text-neutral-100">
      {/* Header Section */}
      <section className="relative pt-12 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono backdrop-blur-md shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>GLOBAL HEADQUARTERS • BENGALURU & REMOTE-FIRST LABS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-display">
            Get in Touch with{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Tensorspark
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-sans max-w-2xl mx-auto">
            Connect with our engineering leadership in Bengaluru, apply for our 100% remote engineering fellowship, or submit an enterprise inquiry for autonomous AI agent architectures.
          </p>
        </div>
      </section>

      {/* Main Content Grid: Physical Address / Office Details + Inquiry Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Physical Address, Contact Numbers, Visiting Hours & Map (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary Physical Address Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-neutral-900/90 via-neutral-900/60 to-neutral-950 border border-cyan-500/30 shadow-xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-md shadow-cyan-500/10">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                    Registered Corporate Headquarters
                  </span>
                  <h2 className="text-2xl font-bold text-white font-display">
                    Tensorspark Dynamics Headquarters
                  </h2>
                </div>
              </div>

              {/* Exact Bangalore Address Block */}
              <div className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-rose-400 shrink-0 mt-1" />
                  <div className="space-y-1">
                    <p className="font-semibold text-white text-base">
                      Tensorspark Dynamics Pvt. Ltd.
                    </p>
                    <p className="text-neutral-300 text-sm leading-relaxed">
                      Indiranagar Tech Boulevard, 100 Feet Road
                    </p>
                    <p className="text-cyan-300 font-medium text-sm">
                      Bengaluru - 560038, Karnataka, India
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-700/80 text-[11px] font-mono text-neutral-300 flex items-center gap-1">
                        <Compass className="w-3 h-3 text-cyan-400" /> Landmark: Indiranagar 100 Ft Rd Tech Hub
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                        Corporate Office & Labs
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remote Internship Model Banner */}
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 mb-6 flex items-start gap-3">
                <Globe2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    100% Remote Internship & Fellowship Operations
                  </h4>
                  <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                    While our registered corporate headquarters is located in Bengaluru, all candidate internships, engineering fellowships, and research cohorts operate completely remote. Interns receive high-performance cloud GPU access ($5,000+ credits) and work collaboratively from anywhere.
                  </p>
                </div>
              </div>

              {/* Contact Channels Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Email Contacts */}
                <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
                    <Mail className="w-4 h-4" />
                    <span>DIRECT INBOX</span>
                  </div>
                  <div>
                    <a 
                      href="mailto:contact@tensorspark.ai" 
                      className="text-white hover:text-cyan-300 text-sm font-semibold block transition-colors"
                    >
                      contact@tensorspark.ai
                    </a>
                    <a 
                      href="mailto:careers@tensorspark.ai" 
                      className="text-neutral-400 hover:text-cyan-300 text-xs transition-colors"
                    >
                      careers@tensorspark.ai (Fellowships)
                    </a>
                  </div>
                </div>

                {/* Phone Contacts */}
                <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
                    <Phone className="w-4 h-4" />
                    <span>OFFICE PHONE</span>
                  </div>
                  <div>
                    <a 
                      href="tel:+911145678900" 
                      className="text-white hover:text-emerald-300 text-sm font-semibold block transition-colors"
                    >
                      +91 (011) 4567-8900
                    </a>
                    <span className="text-neutral-400 text-xs">
                      +91 98712 34567 (Direct Enterprise Line)
                    </span>
                  </div>
                </div>
              </div>

              {/* Working Hours Strip */}
              <div className="p-4 rounded-2xl bg-neutral-950/50 border border-neutral-850 flex items-center justify-between flex-wrap gap-3 text-xs">
                <div className="flex items-center gap-2.5 text-neutral-300">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Office Hours: </span>
                    <span>Mon - Fri: 9:30 AM – 6:30 PM IST</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Bengaluru HQ Active</span>
                </div>
              </div>
            </div>

            {/* Interactive Bangalore Office Map Preview / Transit Card */}
            <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 relative overflow-hidden backdrop-blur-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-sm text-white">Bengaluru HQ & Remote Operations</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Indiranagar+Bengaluru+Karnataka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Visual Stylized Map Box */}
              <div className="h-44 w-full rounded-2xl bg-neutral-950 border border-neutral-800 relative overflow-hidden flex items-center justify-center p-4 group">
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:24px_24px]" />
                
                {/* Ambient Glow */}
                <div className="absolute w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl" />

                <div className="relative text-center space-y-2 z-10">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white font-mono">TENSORSPARK DYNAMICS HQ</div>
                    <div className="text-[11px] text-neutral-400">Bengaluru Tech Hub • 560038 • Remote First</div>
                  </div>
                </div>

                <div className="absolute bottom-2.5 right-3 text-[10px] font-mono text-neutral-500 bg-neutral-900/90 px-2 py-0.5 rounded border border-neutral-800">
                  12.9716° N, 77.6412° E
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Contact & Inquiry Form (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-xl relative overflow-hidden backdrop-blur-md">
              <div className="flex items-center gap-2.5 mb-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Direct Dispatch
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white font-display mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Fill out the form below and an executive from our team will respond within 24 business hours.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-base">Inquiry Dispatched Successfully</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Thank you, <span className="text-white font-medium">{formData.name}</span>. Our engineering team has received your communication at <span className="text-cyan-300">{formData.email}</span>.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-3 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs text-neutral-300 border border-neutral-700 cursor-pointer transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Vikram Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-neutral-600 outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-neutral-600 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-neutral-600 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Subject / Interest Area
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-cyan-500 text-sm text-white outline-none transition-colors"
                    >
                      <option value="Enterprise AI & Autonomous Swarms">Enterprise AI & Autonomous Swarms</option>
                      <option value="Agency & Full-Stack Development">Agency & Full-Stack Development</option>
                      <option value="Graphic Design & Brand Systems">Graphic Design & Brand Systems</option>
                      <option value="3-Month Engineering Fellowship">3-Month Engineering Fellowship (100% Remote)</option>
                      <option value="15-Day Internship Certification">15-Day Internship Certification (Remote)</option>
                      <option value="Executive / Office Visit">Visit Bengaluru HQ / Remote Partnership</option>
                      <option value="General Inquiry">Other Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Detailed Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your requirements, project scope, or fellowship inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-neutral-600 outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-indigo-400 hover:from-cyan-300 hover:to-white text-neutral-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-400/20 transition-all transform hover:-translate-y-0.5"
                  >
                    <Send className="w-4 h-4 text-neutral-950" />
                    <span>Send Message to Team</span>
                  </button>
                </form>
              )}
            </div>

            {/* Quick Link to Waitlist or Careers */}
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Interested in our early access products?</span>
              </div>
              <button
                onClick={onOpenWaitlist || (() => onNavigate?.('products'))}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer flex items-center gap-1 transition-colors"
              >
                <span>Join Waitlist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
