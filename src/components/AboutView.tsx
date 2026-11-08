'use client';

import React from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Sparkles, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  Binary, 
  Globe2, 
  Terminal, 
  Code2, 
  Building2,
  Users,
  Compass
} from 'lucide-react';
import { CO_FOUNDERS } from '../data/foundersData';
import { AbhishekSignature, AjaySignature } from './FounderSignatures';
import { TabView, CareerOption } from '../types';

interface AboutViewProps {
  onNavigateTab: (tab: TabView) => void;
  onSelectCareerOption?: (option: CareerOption) => void;
  onOpenApply?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onNavigateTab,
  onSelectCareerOption,
  onOpenApply
}) => {
  const abhishek = CO_FOUNDERS.find(f => f.id === 'abhishek-kumar') || CO_FOUNDERS[0];
  const ajay = CO_FOUNDERS.find(f => f.id === 'ajay-singh-chauhan') || CO_FOUNDERS[1];

  return (
    <div className="relative min-h-screen pb-24 text-neutral-100">
      {/* Hero Header */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono backdrop-blur-md shadow-sm">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>EXECUTIVE LEADERSHIP & ORIGIN STORY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-display">
            Architected at <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">IIT Patna</span>.
            <br />
            Engineered for Autonomous Scale.
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-sans">
            Tensorspark Dynamics was founded by engineering researchers from the prestigious Indian Institute of Technology Patna. We combine rigorous academic computing theory with production-grade autonomous intelligence and elite engineer training.
          </p>
        </div>
      </section>

      {/* Primary Co-Founders Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Meet the Co-Founders</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
            Executive Leadership & Visionaries
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Abhishek Kumar Card */}
          <div className="relative rounded-3xl bg-gradient-to-b from-neutral-900/95 via-neutral-900/90 to-neutral-950/95 border border-cyan-500/30 p-5 sm:p-8 shadow-2xl backdrop-blur-md flex flex-col justify-between group hover:border-cyan-400/60 transition-all duration-300">
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-all" />

            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Co-Founder & CTO
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
                  <GraduationCap className="w-3.5 h-3.5" />
                  IIT Patna
                </span>
              </div>

              {/* Founder Image & Primary Title */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 text-center sm:text-left">
                <div className="relative shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-cyan-400/50 bg-neutral-950 shadow-xl shadow-cyan-500/15 group-hover:border-cyan-400 transition-colors">
                    <img
                      src={abhishek.image}
                      alt="Abhishek Kumar - Co-Founder & CTO"
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-neutral-900 flex items-center justify-center text-xs text-white font-bold" title="Verified Co-Founder">
                    ✓
                  </span>
                </div>

                <div className="space-y-1.5 flex-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
                    {abhishek.name}
                  </h3>
                  <p className="text-cyan-400 font-mono text-sm font-medium">
                    {abhishek.role}
                  </p>
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-xs font-semibold">
                      <GraduationCap className="w-3.5 h-3.5" />
                      {abhishek.qualification}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-sans pt-1">
                    {abhishek.institution}
                  </p>
                </div>
              </div>

              {/* Bio & Vision */}
              <div className="space-y-4 mb-6 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                <p>
                  {abhishek.bio}
                </p>
                <p className="text-neutral-400 text-xs">
                  At Tensorspark, Abhishek directs all artificial intelligence research, autonomous multi-agent protocol design, and high-throughput model inferencing.
                </p>
              </div>

              {/* Specialization Tags */}
              <div className="mb-6 space-y-2">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                  Core Research & Technical Domains:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {abhishek.specialization.map((spec, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono text-cyan-200 bg-cyan-950/50 border border-cyan-500/30 px-2.5 py-1 rounded-md"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Official Digital Signature */}
            <div className="pt-4 border-t border-neutral-800/90 mt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  Executive Cryptographic Signature
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Alumnus Verified
                </span>
              </div>

              <div className="h-24 rounded-2xl bg-neutral-950 border border-neutral-800 p-2 flex items-center justify-center relative overflow-hidden group-hover:border-cyan-500/40 transition-colors">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05),transparent_70%)] pointer-events-none" />
                <div className="text-cyan-300 transition-transform group-hover:scale-105 duration-200 max-w-full">
                  <AbhishekSignature color="#38bdf8" width={240} height={75} className="max-w-[200px] sm:max-w-[240px] w-full h-auto" />
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mt-2">
                <span>Signatory: {abhishek.name}</span>
                <span>{abhishek.qualification}</span>
              </div>
            </div>
          </div>

          {/* Ajay Singh Chauhan Card */}
          <div className="relative rounded-3xl bg-gradient-to-b from-neutral-900/95 via-neutral-900/90 to-neutral-950/95 border border-indigo-500/30 p-5 sm:p-8 shadow-2xl backdrop-blur-md flex flex-col justify-between group hover:border-indigo-400/60 transition-all duration-300">
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/15 transition-all" />

            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 text-xs font-mono font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  Co-Founder & COO
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
                  <GraduationCap className="w-3.5 h-3.5" />
                  IIT Patna
                </span>
              </div>

              {/* Founder Image & Primary Title */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 text-center sm:text-left">
                <div className="relative shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-indigo-400/50 bg-neutral-950 shadow-xl shadow-indigo-500/15 group-hover:border-indigo-400 transition-colors">
                    <img
                      src={ajay.image}
                      alt="Ajay Singh Chauhan - Co-Founder & COO"
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-neutral-900 flex items-center justify-center text-xs text-white font-bold" title="Verified Co-Founder">
                    ✓
                  </span>
                </div>

                <div className="space-y-1.5 flex-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
                    {ajay.name}
                  </h3>
                  <p className="text-indigo-400 font-mono text-sm font-medium">
                    {ajay.role}
                  </p>
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-xs font-semibold">
                      <GraduationCap className="w-3.5 h-3.5" />
                      {ajay.qualification}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-sans pt-1">
                    {ajay.institution}
                  </p>
                </div>
              </div>

              {/* Bio & Vision */}
              <div className="space-y-4 mb-6 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                <p>
                  {ajay.bio}
                </p>
                <p className="text-neutral-400 text-xs">
                  Ajay spearheads global operational infrastructure, commercial technology deployment, strategic industry alliances, and our developer incubation programs.
                </p>
              </div>

              {/* Specialization Tags */}
              <div className="mb-6 space-y-2">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                  Core Operational & Engineering Domains:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {ajay.specialization.map((spec, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono text-indigo-200 bg-indigo-950/50 border border-indigo-500/30 px-2.5 py-1 rounded-md"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Official Digital Signature */}
            <div className="pt-4 border-t border-neutral-800/90 mt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  Executive Cryptographic Signature
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Alumnus Verified
                </span>
              </div>

              <div className="h-24 rounded-2xl bg-neutral-950 border border-neutral-800 p-2 flex items-center justify-center relative overflow-hidden group-hover:border-indigo-500/40 transition-colors">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05),transparent_70%)] pointer-events-none" />
                <div className="text-indigo-300 transition-transform group-hover:scale-105 duration-200 max-w-full">
                  <AjaySignature color="#818cf8" width={150} height={85} className="max-w-[140px] sm:max-w-[160px] w-full h-auto" />
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mt-2">
                <span>Signatory: {ajay.name}</span>
                <span>{ajay.qualification}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Story & Foundational Mission */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-3xl bg-neutral-900/60 border border-neutral-800 p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-mono">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>THE TENSORSPARK STORY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Transforming Postgraduate Research into Production Reality
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
              <p>
                Tensorspark was conceptualized at the Indian Institute of Technology Patna by Abhishek Kumar and Ajay Singh Chauhan. Experiencing firsthand the gap between theoretical AI models and resilient, production-ready enterprise execution, they set out to construct an end-to-end ecosystem for autonomous systems.
              </p>
              <p>
                Today, Tensorspark Dynamics operates at the intersection of deep-tech research and applied engineering: delivering high-performance AI products, architecting full-stack digital solutions through our specialized agency, and cultivating the next generation of engineers through rigorous fellowships and verified credentialing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-800">
              <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800">
                <div className="text-2xl font-bold text-cyan-400 font-mono">IIT Patna</div>
                <div className="text-xs text-neutral-400 mt-1">Foundational Research & Postgraduate Heritage</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800">
                <div className="text-2xl font-bold text-emerald-400 font-mono">100% Verified</div>
                <div className="text-xs text-neutral-400 mt-1">Dual-Founder Cryptographic Credentials</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800">
                <div className="text-2xl font-bold text-indigo-400 font-mono">Autonomous</div>
                <div className="text-xs text-neutral-400 mt-1">Agent Swarms & Model Context Protocol (MCP)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Architectural Tenets */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
            Core Architectural Tenets
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            The engineering principles guiding every line of code and every cohort trained.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-cyan-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-4">
              <Binary className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Deterministic Reliability</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              We design autonomous systems with formal verification, idempotent fallbacks, and guaranteed execution boundaries, eliminating erratic LLM hallucinations in production environments.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-emerald-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">High-Assurance Certification</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Our 15-day and 3-month internship certifications are rigorously backed by verifiable GitHub PR milestones, on-time submissions, candidate digital signing, and dual executive signatures.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-indigo-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 mb-4">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">End-to-End Synergy</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              From our proprietary AI inference engines to bespoke enterprise web platforms and high-conversion UX design, Tensorspark delivers complete technical mastery.
            </p>
          </div>
        </div>
      </section>

      {/* Direct Action Hub */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-neutral-900 to-indigo-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Ready to collaborate or accelerate your career?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300">
              Explore our 15-day certified tracks, apply for the 3-month fellowship, or partner with our engineering teams.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              id="about-cta-fifteen-day"
              onClick={() => {
                if (onSelectCareerOption) onSelectCareerOption('fifteen-day');
                onNavigateTab('careers');
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>15-Day Internship Track</span>
            </button>

            <button
              id="about-cta-products"
              onClick={() => onNavigateTab('products')}
              className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white font-medium text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Explore AI Products</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
