'use client';

import React, { useState } from 'react';
import { JobOpening } from '../../types';
import { JOB_OPENINGS } from '../../data/careerData';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';

interface CurrentOpeningsSectionProps {
  onOpenApplyModal: (roleId?: string) => void;
}

export const CurrentOpeningsSection: React.FC<CurrentOpeningsSectionProps> = ({
  onOpenApplyModal
}) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedJobId, setExpandedJobId] = useState<string | null>('lead-ai-systems-architect');

  const departments = [
    { id: 'all', label: 'All Departments (6)' },
    { id: 'Autonomous Intelligence', label: 'AI & Swarms' },
    { id: 'Core Platform', label: 'Full-Stack & Systems' },
    { id: 'Infrastructure & Cloud', label: 'MLOps & Cloud' },
    { id: 'Product Design', label: 'UX/UI & Design' },
    { id: 'Digital Agency Practice', label: 'Marketing & Growth' },
  ];

  const filteredJobs = JOB_OPENINGS.filter((job) => {
    const matchesDept = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-b from-neutral-900 via-neutral-900/80 to-neutral-950 border border-neutral-800 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>EXPERIENCED ENGINEERING & LEADERSHIP</span>
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
              MULTIPLE ACTIVE ROLES
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Current Openings & Experienced Tech Roles
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            We are assembling an elite team of systems architects, AI engineers, product designers, and growth leaders to build autonomous intelligence infrastructure and scale high-growth client ventures.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800">
              <span className="text-[10px] text-neutral-400 block">Total Openings</span>
              <span className="text-base font-bold text-white">16 Positions</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800">
              <span className="text-[10px] text-neutral-400 block">Work Modes</span>
              <span className="text-base font-bold text-cyan-400">Remote & Hybrid</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800">
              <span className="text-[10px] text-neutral-400 block">Equity Pool</span>
              <span className="text-base font-bold text-emerald-400">0.2% - 1.5% ESOPs</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800">
              <span className="text-[10px] text-neutral-400 block">Review SLA</span>
              <span className="text-base font-bold text-indigo-400">48-Hour Response</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by role, skill (Python, React, CUDA, Figma)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Department Filters */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-neutral-900 rounded-xl border border-neutral-800">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(dept.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedDepartment === dept.id
                  ? 'bg-cyan-400 text-neutral-950 font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {dept.label}
            </button>
          ))}
        </div>
      </div>

      {/* Job Openings List */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800 text-neutral-400 text-xs">
            No active positions found matching your search. Try resetting filters.
          </div>
        ) : (
          filteredJobs.map((job) => {
            const isExpanded = expandedJobId === job.id;
            return (
              <div
                key={job.id}
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
                        {job.department}
                      </span>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                        {job.salaryRange}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {job.location}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {job.experience}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-white font-display">
                      {job.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-400 max-w-3xl leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => onOpenApplyModal(job.id)}
                      className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/15"
                    >
                      <span>Apply for Role</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                      className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          <span className="text-xs pr-1">Hide</span>
                          <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <span className="text-xs pr-1">Details</span>
                          <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-neutral-800/80 grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs text-neutral-300 animate-in fade-in duration-150">
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-white uppercase font-mono tracking-wider mb-2">
                          Core Responsibilities:
                        </h5>
                        <ul className="space-y-1.5 text-neutral-400">
                          {job.responsibilities.map((resp, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-white uppercase font-mono tracking-wider mb-2">
                          Technical Requirements:
                        </h5>
                        <ul className="space-y-1.5 text-neutral-400">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
                        <h5 className="font-semibold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Perks & Executive Benefits</span>
                        </h5>
                        <div className="space-y-1.5">
                          {job.benefits.map((b, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-neutral-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold text-white uppercase font-mono tracking-wider mb-2">
                          Primary Tech Stack & Ecosystem:
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {job.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-1 rounded-lg bg-neutral-800 text-cyan-300 font-mono text-[11px] border border-neutral-750"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
