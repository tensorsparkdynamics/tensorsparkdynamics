'use client';

import React, { useState } from 'react';
import { InternshipRole } from '../../types';
import { INTERNSHIP_ROLES } from '../../data/mockData';
import { THREE_MONTH_PPO_DETAILS } from '../../data/careerData';
import { 
  GraduationCap, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Briefcase, 
  Clock, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp,
  LayoutDashboard,
  Check
} from 'lucide-react';

interface ThreeMonthFellowshipSectionProps {
  onOpenApplyModal: (roleId?: string) => void;
  onNavigateToDashboard: () => void;
}

export const ThreeMonthFellowshipSection: React.FC<ThreeMonthFellowshipSectionProps> = ({
  onOpenApplyModal,
  onNavigateToDashboard
}) => {
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [expandedRoleId, setExpandedRoleId] = useState<string | null>('ai-engineer');
  const [simulatedScore, setSimulatedScore] = useState<number>(88);

  const tracks = [
    { id: 'all', label: 'All Roles (5)' },
    { id: 'ai', label: 'AI & Multi-Agents' },
    { id: 'engineering', label: 'Full-Stack & Systems' },
    { id: 'data', label: 'Data & Modeling' },
    { id: 'design', label: 'UI/UX & Creative' },
  ];

  const filteredRoles = INTERNSHIP_ROLES.filter((role) => {
    if (selectedTrack === 'all') return true;
    if (selectedTrack === 'ai') return role.id.includes('ai');
    if (selectedTrack === 'engineering') return role.id.includes('fullstack') || role.id.includes('mlops');
    if (selectedTrack === 'data') return role.id.includes('data');
    if (selectedTrack === 'design') return role.id.includes('creative');
    return true;
  });

  return (
    <div className="space-y-16 animate-in fade-in duration-200">
      {/* Hero Strip with PPO & Extendable Highlight */}
      <div className="p-8 rounded-3xl bg-gradient-to-b from-neutral-900 via-neutral-900/80 to-neutral-950 border border-neutral-800 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>3-MONTH FELLOWSHIP COHORT</span>
              </span>
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> EXTENDABLE TO 6 MONTHS
              </span>
              <span className="px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono font-bold flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> PRE-PLACEMENT OFFERS (PPO)
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              3 Months Internship with Extendable Terms & PPO Offers
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
              An immersive 12-week fellowship designed for high-caliber engineers. Work directly on production AI clusters, receive a guaranteed monthly stipend (<strong className="text-cyan-400">₹25,000 - ₹45,000 / mo</strong>), and qualify for seamless <strong className="text-emerald-400">Pre-Placement Offers (PPO)</strong> with full-time packages up to <strong className="text-white">₹28 LPA</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                  1. Duration & Extension
                </span>
                <div className="text-sm font-bold text-white font-mono">3 Months (Extendable)</div>
                <span className="text-[11px] text-neutral-400">Extendable up to 6 months on request</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                  2. PPO Conversion
                </span>
                <div className="text-sm font-bold text-white font-mono">78% PPO Offer Rate</div>
                <span className="text-[11px] text-neutral-400">Direct full-time transition pathway</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800">
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider block mb-1">
                  3. PPO Salary CTC
                </span>
                <div className="text-sm font-bold text-white font-mono">₹14L - ₹28L / $85k-$140k</div>
                <span className="text-[11px] text-neutral-400">Pre-agreed full-time package tiers</span>
              </div>
            </div>
          </div>

          {/* Quick Apply Card */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>

            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Cohort Q4 2026 Admissions</span>
              <div className="text-xl font-bold text-white mt-1">
                27 Fellowship Openings
              </div>
              <div className="text-xs text-emerald-400 font-mono mt-0.5">
                Stipend: ₹25k - ₹45k/mo + GPU Compute
              </div>
            </div>

            <button
              id="btn-three-month-apply"
              onClick={() => onOpenApplyModal('ai-engineer')}
              className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Apply for 3-Month Fellowship & PPO</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onNavigateToDashboard}
              className="w-full py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-800 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
              <span>Track Application Status</span>
            </button>
          </div>
        </div>
      </div>

      {/* PPO Conversion & Extendability Criteria Breakdown */}
      <div className="p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
              Pre-Placement Offer (PPO) Pathway
            </span>
            <h3 className="text-2xl font-bold text-white font-display">
              How the 3-Month Internship Converts to Full-Time PPO
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              Fellows who demonstrate consistent technical rigor during the 3-month tenure are offered immediate full-time employment or flexible extensions.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-neutral-400">Historical PPO Rate</div>
              <div className="text-lg font-bold text-emerald-400 font-mono">78% of Fellows Hired</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          {[
            {
              step: '01',
              title: 'Weekly Sprint Reports',
              desc: 'Submit weekly milestone deliverables on GitHub and maintain a >85% code review evaluation score.',
              badge: 'Weeks 1 - 8'
            },
            {
              step: '02',
              title: 'Production Deployment',
              desc: 'Ship at least one mission-critical AI feature or scalable service to live enterprise staging.',
              badge: 'Weeks 6 - 10'
            },
            {
              step: '03',
              title: 'Extendable Tenure Option',
              desc: 'Eligible candidates can extend by 1-3 additional months for specialized client engagements.',
              badge: 'Optional 1-3 Mos'
            },
            {
              step: '04',
              title: 'Formal PPO Offer',
              desc: 'Receive your official Full-Time PPO letter with competitive CTC package (₹14L - ₹28L LPA).',
              badge: 'Week 12'
            }
          ].map((item) => (
            <div key={item.step} className="p-5 rounded-2xl bg-neutral-950 border border-neutral-850 space-y-2 relative">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 font-bold">{item.step}</span>
                <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 text-[10px]">{item.badge}</span>
              </div>
              <h4 className="text-sm font-bold text-white">{item.title}</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive PPO Eligibility Score Calculator */}
        <div className="p-6 rounded-2xl bg-neutral-950/80 border border-cyan-500/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Simulate Your PPO Probability & Full-Time Package</span>
              </h4>
              <p className="text-xs text-neutral-400">
                Adjust your simulated average weekly sprint score to see estimated PPO eligibility and offer bracket.
              </p>
            </div>
            <div className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/20">
              Sprint Score: {simulatedScore}%
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="65"
              max="99"
              value={simulatedScore}
              onChange={(e) => setSimulatedScore(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-neutral-500">
              <span>65% (Extension Review)</span>
              <span>80% (Benchmark)</span>
              <span>90%+ (Priority PPO + ESOPs)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[10px] font-mono text-neutral-400 block">PPO Offer Probability</span>
              <span className={`text-base font-bold font-mono ${simulatedScore >= 85 ? 'text-emerald-400' : simulatedScore >= 75 ? 'text-cyan-300' : 'text-amber-400'}`}>
                {simulatedScore >= 85 ? 'High (92% - Guaranteed)' : simulatedScore >= 75 ? 'Moderate (65%)' : 'Eligible for 1-Month Extension'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[10px] font-mono text-neutral-400 block">Projected Full-Time CTC Package</span>
              <span className="text-base font-bold text-white font-mono">
                {simulatedScore >= 90 ? '₹22L - ₹28L LPA ($110k - $140k)' : simulatedScore >= 80 ? '₹16L - ₹22L LPA ($85k - $110k)' : '₹12L - ₹16L LPA'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[10px] font-mono text-neutral-400 block">Extension Eligibility</span>
              <span className="text-base font-bold text-indigo-400 font-mono">
                {simulatedScore >= 70 ? 'Eligible for 1-3 Mo Extension' : 'Standard 3-Month Track'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Month Available Roles List */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white font-display">
              Open 3-Month Fellowship Tracks
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Select a specialization track below. All roles include monthly stipend, extension option, and direct PPO assessment.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-neutral-900 rounded-xl border border-neutral-800">
            {tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => setSelectedTrack(track.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedTrack === track.id
                    ? 'bg-cyan-400 text-neutral-950 font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {track.label}
              </button>
            ))}
          </div>
        </div>

        {/* Roles List */}
        <div className="space-y-4">
          {filteredRoles.map((role) => {
            const isExpanded = expandedRoleId === role.id;
            return (
              <div
                key={role.id}
                className={`rounded-2xl border transition-all ${
                  isExpanded
                    ? 'bg-neutral-900/90 border-cyan-500/50 shadow-xl shadow-cyan-950/20'
                    : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold">
                        {role.track}
                      </span>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                        {role.stipend}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">
                        {role.duration}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        Extendable • PPO Track
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-white font-display">
                      {role.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-400 max-w-3xl leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => onOpenApplyModal(role.id)}
                      className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/15"
                    >
                      <span>Apply for Fellowship</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setExpandedRoleId(isExpanded ? null : role.id)}
                      className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          <span className="text-xs pr-1">Hide</span>
                          <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <span className="text-xs pr-1">Curriculum</span>
                          <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-neutral-800/80 grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs text-neutral-300 animate-in fade-in duration-150">
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-white uppercase font-mono tracking-wider mb-2">
                          Responsibilities:
                        </h5>
                        <ul className="space-y-1.5 text-neutral-400">
                          {role.responsibilities.map((resp, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-white uppercase font-mono tracking-wider mb-2">
                          Prerequisites & Skills:
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {role.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 rounded bg-neutral-800 text-cyan-300 font-mono text-[10px]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
                      <h5 className="font-semibold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                        <span>12-Week Syllabus & PPO Milestones</span>
                      </h5>

                      <div className="space-y-2.5 text-[11px]">
                        <div>
                          <strong className="text-cyan-400 block font-mono">Month 1 (Foundation & Setup):</strong>
                          <p className="text-neutral-400">{role.curriculum.month1}</p>
                        </div>
                        <div>
                          <strong className="text-indigo-400 block font-mono">Month 2 (Production Shipping):</strong>
                          <p className="text-neutral-400">{role.curriculum.month2}</p>
                        </div>
                        <div>
                          <strong className="text-emerald-400 block font-mono">Month 3 (PPO Evaluation & Demo Day):</strong>
                          <p className="text-neutral-400">{role.curriculum.month3}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
