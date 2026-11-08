'use client';

import React, { useState } from 'react';
import { InternshipRole } from '../types';
import { INTERNSHIP_ROLES } from '../data/mockData';
import { 
  GraduationCap, 
  Calendar, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Cpu, 
  Briefcase, 
  Terminal, 
  ChevronDown, 
  ChevronUp,
  LayoutDashboard
} from 'lucide-react';

interface InternshipViewProps {
  onOpenApplyModal: (roleId?: string) => void;
  onNavigateToDashboard: () => void;
}

export const InternshipView: React.FC<InternshipViewProps> = ({
  onOpenApplyModal,
  onNavigateToDashboard
}) => {
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [expandedRoleId, setExpandedRoleId] = useState<string | null>('ai-engineer');

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
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>COHORT Q4 2026 • 3 MONTHS • PAID FELLOWSHIP</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          3-Month Startup Fellowship Program
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          Skip generic bootcamps. Ship mission-critical AI products, deploy models to production clusters, and receive direct 1:1 mentorship from ex-FAANG engineers with a guaranteed monthly stipend.
        </p>

        {/* Quick action strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            id="btn-internships-apply-general"
            onClick={() => onOpenApplyModal()}
            className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Submit General Application</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            id="btn-internships-view-dashboard"
            onClick={onNavigateToDashboard}
            className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4 text-cyan-400" />
            <span>Track Existing Application</span>
          </button>
        </div>
      </div>

      {/* 3-Month Roadmap Timeline */}
      <div className="p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800 backdrop-blur-md">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
            Program Structure
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            The 12-Week Immersion Blueprint
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            Every intern follows a structured sprint cycle with weekly progress reports, code reviews, and production releases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Month 1 */}
          <div className="p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800 relative">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold text-xs font-mono mb-4">
              01
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>WEEKS 1 - 4</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">
              Foundations & Architecture
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Deep dive into multi-agent loops, context window caching, streaming token protocols, and modern React 19 / Tailwind engineering.
            </p>
            <div className="pt-3 border-t border-neutral-850 text-[11px] text-neutral-500">
              <span className="text-neutral-400 font-semibold">Milestone:</span> Pass technical baseline benchmark and publish first open-source PR.
            </div>
          </div>

          {/* Month 2 */}
          <div className="p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800 relative">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-xs font-mono mb-4">
              02
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>WEEKS 5 - 8</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">
              Production Client Shipping
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Embed directly within client projects and our flagship products. Build real features, optimize p95 latency, and handle real user queries.
            </p>
            <div className="pt-3 border-t border-neutral-850 text-[11px] text-neutral-500">
              <span className="text-neutral-400 font-semibold">Milestone:</span> Deploy live production feature used by 10,000+ daily active users.
            </div>
          </div>

          {/* Month 3 */}
          <div className="p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800 relative">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-xs font-mono mb-4">
              03
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>WEEKS 9 - 12</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">
              Demo Day & Full-Time Offer
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Present your capstone AI system to our venture partners, showcase performance telemetry, and transition into a permanent full-time role.
            </p>
            <div className="pt-3 border-t border-neutral-850 text-[11px] text-neutral-500">
              <span className="text-neutral-400 font-semibold">Milestone:</span> 85%+ cohort conversion rate into full-time roles or seed venture grants.
            </div>
          </div>
        </div>
      </div>

      {/* Role Openings Section */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
              Active Cohort Openings
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Available 3-Month Tracks
            </h2>
          </div>

          {/* Track Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
            {tracks.map((track) => (
              <button
                key={track.id}
                id={`filter-track-${track.id}`}
                onClick={() => setSelectedTrack(track.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedTrack === track.id
                    ? 'bg-neutral-800 text-cyan-400 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {track.label}
              </button>
            ))}
          </div>
        </div>

        {/* Roles List */}
        <div className="space-y-4">
          {filteredRoles.map((role: InternshipRole) => {
            const isExpanded = expandedRoleId === role.id;
            return (
              <div
                key={role.id}
                id={`internship-card-${role.id}`}
                className={`rounded-2xl border transition-all ${
                  isExpanded
                    ? 'bg-neutral-900/90 border-cyan-500/50 shadow-xl shadow-cyan-950/20'
                    : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {/* Summary Header */}
                <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {role.track}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {role.stipend}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono">
                        {role.duration}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white font-display">
                      {role.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 max-w-3xl">
                      {role.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      id={`btn-apply-role-direct-${role.id}`}
                      onClick={() => onOpenApplyModal(role.id)}
                      className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/15"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      id={`btn-toggle-expand-${role.id}`}
                      onClick={() => setExpandedRoleId(isExpanded ? null : role.id)}
                      className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs transition-colors flex items-center gap-1"
                    >
                      {isExpanded ? (
                        <>
                          <span className="text-xs pr-1">Hide Details</span>
                          <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <span className="text-xs pr-1">View Curriculum</span>
                          <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-neutral-800/80 grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs text-neutral-300 animate-in fade-in duration-150">
                    {/* Responsibilities & Requirements */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-white uppercase font-mono tracking-wider mb-2">
                          What You Will Work On:
                        </h4>
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
                        <h4 className="font-semibold text-white uppercase font-mono tracking-wider mb-2">
                          Prerequisites & Skills:
                        </h4>
                        <div className="flex flex-wrap gap-1.5 mb-2">
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

                    {/* 3-Month Month-by-Month Plan */}
                    <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
                      <h4 className="font-semibold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                        <span>3-Month Track Syllabus</span>
                      </h4>

                      <div className="space-y-2.5 text-[11px]">
                        <div>
                          <strong className="text-cyan-400 block font-mono">Month 1:</strong>
                          <p className="text-neutral-400">{role.curriculum.month1}</p>
                        </div>
                        <div>
                          <strong className="text-indigo-400 block font-mono">Month 2:</strong>
                          <p className="text-neutral-400">{role.curriculum.month2}</p>
                        </div>
                        <div>
                          <strong className="text-emerald-400 block font-mono">Month 3:</strong>
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
