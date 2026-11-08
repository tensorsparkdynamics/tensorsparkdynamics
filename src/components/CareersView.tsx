'use client';

import React, { useState, useEffect } from 'react';
import { CareerOption } from '../types';
import { CurrentOpeningsSection } from './careers/CurrentOpeningsSection';
import { ThreeMonthFellowshipSection } from './careers/ThreeMonthFellowshipSection';
import { FifteenDayInternshipSection } from './careers/FifteenDayInternshipSection';
import { FoundersSection } from './FoundersSection';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  PenTool, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Check, 
  LayoutDashboard,
  TrendingUp,
  Layers
} from 'lucide-react';

interface CareersViewProps {
  selectedOption?: CareerOption;
  onSelectOption?: (option: CareerOption) => void;
  onOpenApplyModal: (roleId?: string) => void;
  onNavigateToDashboard: () => void;
}

export const CareersView: React.FC<CareersViewProps> = ({
  selectedOption = 'openings',
  onSelectOption,
  onOpenApplyModal,
  onNavigateToDashboard
}) => {
  const [currentOption, setCurrentOption] = useState<CareerOption>(selectedOption);

  useEffect(() => {
    if (selectedOption) {
      setCurrentOption(selectedOption);
    }
  }, [selectedOption]);

  const handleSwitchOption = (option: CareerOption) => {
    setCurrentOption(option);
    if (onSelectOption) {
      onSelectOption(option);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Careers Navigation Switcher (The 3 Options) */}
      <div className="space-y-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TENSORSPARK TALENT & FELLOWSHIP PORTAL</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          Careers & Engineering Fellowships
        </h1>

        <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Choose your career trajectory: explore experienced full-time job openings, apply for our 3-month fellowship with extendable PPO tracks, or complete the 15-day fast-track internship certificate.
        </p>

        {/* 3 Prominent Option Cards / Switcher Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-left">
          {/* Option 1: Current Openings */}
          <button
            type="button"
            onClick={() => handleSwitchOption('openings')}
            className={`p-5 rounded-2xl border transition-all text-left relative cursor-pointer ${
              currentOption === 'openings'
                ? 'bg-neutral-900 border-cyan-400 shadow-xl shadow-cyan-950/30 ring-1 ring-cyan-400'
                : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/60'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                currentOption === 'openings' ? 'bg-cyan-400 text-neutral-950' : 'bg-neutral-900 text-cyan-400'
              }`}>
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-cyan-300">
                Option 1
              </span>
            </div>

            <div className="text-base font-bold text-white font-display">
              Current Openings
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              Multiple active job roles for experienced engineers, architects, designers, and growth leads.
            </div>

            <div className="mt-3 pt-2 border-t border-neutral-850 flex items-center justify-between text-[11px] font-mono">
              <span className="text-cyan-400">16 Full-Time Roles</span>
              <ArrowRight className={`w-3.5 h-3.5 transition-transform ${currentOption === 'openings' ? 'translate-x-1 text-cyan-400' : 'text-neutral-500'}`} />
            </div>
          </button>

          {/* Option 2: 3 Months Internship */}
          <button
            type="button"
            onClick={() => handleSwitchOption('three-month')}
            className={`p-5 rounded-2xl border transition-all text-left relative cursor-pointer ${
              currentOption === 'three-month'
                ? 'bg-neutral-900 border-emerald-400 shadow-xl shadow-emerald-950/30 ring-1 ring-emerald-400'
                : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/60'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                currentOption === 'three-month' ? 'bg-emerald-400 text-neutral-950' : 'bg-neutral-900 text-emerald-400'
              }`}>
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-emerald-400">
                Option 2
              </span>
            </div>

            <div className="text-base font-bold text-white font-display">
              3 Months Internship
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              Extendable tenure (1-3 mos) and high-conversion <strong className="text-emerald-400">PPO Offers</strong> with competitive CTC packages.
            </div>

            <div className="mt-3 pt-2 border-t border-neutral-850 flex items-center justify-between text-[11px] font-mono">
              <span className="text-emerald-400">Extendable & PPO Offers</span>
              <ArrowRight className={`w-3.5 h-3.5 transition-transform ${currentOption === 'three-month' ? 'translate-x-1 text-emerald-400' : 'text-neutral-500'}`} />
            </div>
          </button>

          {/* Option 3: 15 Days Internship Certificate */}
          <button
            type="button"
            onClick={() => handleSwitchOption('fifteen-day')}
            className={`p-5 rounded-2xl border transition-all text-left relative cursor-pointer ${
              currentOption === 'fifteen-day'
                ? 'bg-neutral-900 border-indigo-400 shadow-xl shadow-indigo-950/30 ring-1 ring-indigo-400'
                : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/60'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                currentOption === 'fifteen-day' ? 'bg-indigo-400 text-neutral-950' : 'bg-neutral-900 text-indigo-400'
              }`}>
                <Award className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                Option 3 • ₹2,000 RS
              </span>
            </div>

            <div className="text-base font-bold text-white font-display">
              15 Days Internship Certificate
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              Charged ₹2,000 RS. Requires candidate digital signature & on-time multiple task completion.
            </div>

            <div className="mt-3 pt-2 border-t border-neutral-850 flex items-center justify-between text-[11px] font-mono">
              <span className="text-indigo-400">Digital Signature Pad</span>
              <ArrowRight className={`w-3.5 h-3.5 transition-transform ${currentOption === 'fifteen-day' ? 'translate-x-1 text-indigo-400' : 'text-neutral-500'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Render Selected Career Section */}
      <div className="pt-4">
        {currentOption === 'openings' && (
          <CurrentOpeningsSection onOpenApplyModal={onOpenApplyModal} />
        )}

        {currentOption === 'three-month' && (
          <ThreeMonthFellowshipSection
            onOpenApplyModal={onOpenApplyModal}
            onNavigateToDashboard={onNavigateToDashboard}
          />
        )}

        {currentOption === 'fifteen-day' && (
          <FifteenDayInternshipSection />
        )}
      </div>

      {/* Leadership & Co-Founders Endorsement */}
      <FoundersSection className="pt-16 border-t border-neutral-850" />
    </div>
  );
};
