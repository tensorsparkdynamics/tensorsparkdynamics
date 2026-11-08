'use client';

import React from 'react';
import { Award, GraduationCap, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { CO_FOUNDERS } from '../data/foundersData';
import { AbhishekSignature, AjaySignature } from './FounderSignatures';

interface FoundersSectionProps {
  className?: string;
  showSignatures?: boolean;
  onNavigateToAbout?: () => void;
}

export const FoundersSection: React.FC<FoundersSectionProps> = ({
  className = '',
  showSignatures = true,
  onNavigateToAbout,
}) => {
  return (
    <section className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono backdrop-blur-md">
          <GraduationCap className="w-4 h-4 text-cyan-400" />
          <span>IIT PATNA ALUMNI FOUNDERS & EXECUTIVE LEADERSHIP</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          Engineered by Deep-Tech Co-Founders
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          Tensorspark is founded and led by engineering researchers from the prestigious Indian Institute of Technology Patna, bringing state-of-the-art computational rigor to enterprise AI and engineer training.
        </p>
      </div>

      {/* Founders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {CO_FOUNDERS.map((founder) => {
          const isAbhishek = founder.signatureType === 'abhishek';
          return (
            <div
              key={founder.id}
              className="relative rounded-3xl bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 border border-neutral-800 hover:border-cyan-500/40 p-5 sm:p-8 backdrop-blur-md transition-all duration-300 shadow-xl group flex flex-col justify-between"
            >
              {/* Subtle Ambient Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    Verified Co-Founder
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/25">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>IIT Patna</span>
                  </div>
                </div>

                {/* Profile Photo & Name Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5">
                  <div className="relative shrink-0 group/photo">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-cyan-500/40 bg-neutral-950 shadow-md shadow-cyan-500/10 relative">
                      <img
                        src={founder.image}
                        alt={`${founder.name} - Co-Founder of Tensorspark`}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/photo:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-neutral-900 flex items-center justify-center text-[10px] text-white" title="Verified Executive">
                      ✓
                    </span>
                  </div>

                  {/* Name and Qualification */}
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-white tracking-tight font-display group-hover:text-cyan-200 transition-colors">
                      {founder.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-cyan-400 font-mono font-medium">{founder.role}</span>
                    </div>
                    <div className="pt-0.5">
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-mono font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20 text-xs">
                        <GraduationCap className="w-3 h-3 text-emerald-400" />
                        {founder.qualification}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Institution & Bio */}
                <div className="space-y-3 mb-5">
                  <p className="text-xs text-neutral-300 flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{founder.institution}</span>
                  </p>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    {founder.bio}
                  </p>
                </div>

                {/* Specialization Tags */}
                {founder.specialization && (
                  <div className="mb-6 space-y-1.5">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                      Core Specializations:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {founder.specialization.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-mono text-neutral-300 bg-neutral-800/80 border border-neutral-700/60 px-2 py-0.5 rounded"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Verified Digital Signature Card */}
              {showSignatures && (
                <div className="pt-4 border-t border-neutral-800/80 mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      Executive Digital Signature
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Cryptographically Verified
                    </span>
                  </div>

                  <div className="h-20 sm:h-24 rounded-2xl bg-neutral-950/80 border border-neutral-850 p-2 flex items-center justify-center relative overflow-hidden group-hover:border-cyan-500/30 transition-colors">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.04),transparent_70%)] pointer-events-none" />
                    {isAbhishek ? (
                      <div className="text-cyan-300 transition-transform group-hover:scale-105 duration-200 max-w-full">
                        <AbhishekSignature color="#38bdf8" width={220} height={70} className="max-w-[190px] sm:max-w-[220px] w-full h-auto" />
                      </div>
                    ) : (
                      <div className="transition-transform group-hover:scale-105 duration-200 max-w-full">
                        <AjaySignature color="#60a5fa" width={140} height={80} className="max-w-[125px] sm:max-w-[140px] w-full h-auto" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 mt-2">
                    <span>Signatory: {founder.name}</span>
                    <span>{founder.qualification}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {onNavigateToAbout && (
        <div className="mt-10 text-center">
          <button
            id="founders-view-full-about-btn"
            onClick={onNavigateToAbout}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-cyan-500/10 cursor-pointer group"
          >
            <span>Read Complete Executive Dossier & IIT Patna Research Story</span>
            <ExternalLink className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}
    </section>
  );
};
