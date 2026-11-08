'use client';

import React, { useState } from 'react';
import { FifteenDayInternship } from '../../types';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2, 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Github, 
  FileCheck2
} from 'lucide-react';

interface InternshipApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  internship: FifteenDayInternship | null;
  onProceedToPayment: (candidateData: {
    fullName: string;
    email: string;
    phone: string;
    college: string;
    degree: string;
    githubUrl: string;
  }) => void;
  initialData?: {
    fullName?: string;
    email?: string;
  };
}

export const InternshipApplicationModal: React.FC<InternshipApplicationModalProps> = ({
  isOpen,
  onClose,
  internship,
  onProceedToPayment,
  initialData
}) => {
  const [fullName, setFullName] = useState(initialData?.fullName || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [college, setCollege] = useState('IIT / NIT / State Engineering College');
  const [degree, setDegree] = useState('B.Tech Computer Science (3rd / 4th Year)');
  const [githubUrl, setGithubUrl] = useState('https://github.com/my-profile');
  const [termsAccepted, setTermsAccepted] = useState(true);

  if (!isOpen || !internship) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    onProceedToPayment({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      college: college.trim(),
      degree: degree.trim(),
      githubUrl: githubUrl.trim()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-auto sm:my-8 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 bg-neutral-950/60 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
                15-Day Fast-Track Track
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
                Fee: ₹2,000 RS
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-white font-display">
              Apply for {internship.title}
            </h3>
            <p className="text-xs text-neutral-400">
              Fill out your candidate profile for on-time sprint task evaluation and certificate issuance.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-850 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-7 space-y-5 sm:space-y-6 overflow-y-auto flex-1">
          {/* Selected Track Overview pill */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="font-semibold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Domain: {internship.domain}</span>
              </div>
              <p className="text-neutral-400 text-[11px]">{internship.description}</p>
            </div>
            <div className="text-right sm:shrink-0 font-mono">
              <div className="text-cyan-400 font-bold text-sm">₹2,000 RS</div>
              <div className="text-[10px] text-neutral-500">15 Days • 5 Sprints</div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            {/* Full Name */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-neutral-300 font-semibold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  Candidate Full Name (Printed on Certificate) *
                </span>
                <span className="text-[10px] text-amber-400 font-normal">Official legal name</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-750 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-750 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                WhatsApp / Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-750 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* College */}
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                College / University *
              </label>
              <input
                type="text"
                required
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. IIT Patna / NIT Trichy / Pune University"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-750 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Degree & Year */}
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-cyan-400" />
                Degree & Year / Stream *
              </label>
              <input
                type="text"
                required
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="e.g. B.Tech Computer Science (3rd Year)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-750 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* GitHub Profile URL */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-neutral-300 font-semibold flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-cyan-400" />
                GitHub / Portfolio URL (for milestone review commits)
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/your-username"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-750 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Program Checklist & Terms */}
          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-2.5 text-xs text-neutral-300">
            <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              Internship Workflow & Rules:
            </div>
            <div className="space-y-1.5 text-[11.5px]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Immediate redirect to your personal <strong>Internship Monitoring Section</strong> upon payment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Complete all 5 sprint milestone tasks strictly on time to qualify</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Execute your <strong>Candidate Digital Signature</strong> to generate the official certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>High-resolution PNG download signed by IIT Patna alumni co-founders</span>
              </div>
            </div>

            <label className="flex items-center gap-2.5 pt-2 border-t border-neutral-850 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="rounded border-neutral-700 text-cyan-400 focus:ring-cyan-400"
              />
              <span className="text-[11px] text-neutral-400">
                I agree to the 15-day milestone evaluation policies and ₹2,000 RS enrollment fee.
              </span>
            </label>
          </div>

          {/* Submit Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-neutral-400 text-xs font-mono">
              Total Due: <strong className="text-white text-base">₹2,000 RS</strong>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-neutral-850 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!termsAccepted || !fullName.trim()}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-neutral-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Proceed to Payment Gateway (₹2,000 RS)</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-950" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
