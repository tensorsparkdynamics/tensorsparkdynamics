'use client';

import React, { useState } from 'react';
import { Applicant, WeeklyReport, ApplicationStage } from '../types';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  FileText, 
  Github, 
  ExternalLink, 
  Award, 
  AlertCircle, 
  Send, 
  Download, 
  Sparkles, 
  ChevronRight, 
  Star, 
  User, 
  Briefcase, 
  Code2, 
  Check, 
  RefreshCw,
  PlusCircle
} from 'lucide-react';

interface TrackerDashboardViewProps {
  applicants: Applicant[];
  activeApplicantId: string | null;
  onSelectApplicant: (id: string) => void;
  onSubmitReport: (applicantId: string, report: WeeklyReport) => void;
  onSubmitTechnicalAssignment: (applicantId: string, repoUrl: string) => void;
  onOpenApplyModal: () => void;
}

export const TrackerDashboardView: React.FC<TrackerDashboardViewProps> = ({
  applicants,
  activeApplicantId,
  onSelectApplicant,
  onSubmitReport,
  onSubmitTechnicalAssignment,
  onOpenApplyModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'application' | 'intern_reports'>('application');
  
  // Submission modals
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [assignmentRepoUrl, setAssignmentRepoUrl] = useState('');
  
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportWeek, setReportWeek] = useState(4);
  const [reportTitle, setReportTitle] = useState('');
  const [reportMilestone, setReportMilestone] = useState('');
  const [reportHours, setReportHours] = useState(40);
  const [reportBlockers, setReportBlockers] = useState('');
  const [reportPrUrl, setReportPrUrl] = useState('');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Selected applicant lookup
  const currentApplicant = 
    applicants.find(a => a.id === activeApplicantId) ||
    applicants.find(a => a.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
    applicants[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = applicants.find(a => 
      a.id.toLowerCase() === searchQuery.trim().toLowerCase() ||
      a.fullName.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
    if (found) {
      onSelectApplicant(found.id);
      showToast(`Found applicant record for ${found.fullName} (${found.id})`);
    } else {
      showToast(`No record matching "${searchQuery}". Select from available candidates.`);
    }
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentRepoUrl) return;
    onSubmitTechnicalAssignment(currentApplicant.id, assignmentRepoUrl);
    setShowAssignmentModal(false);
    setAssignmentRepoUrl('');
    showToast('Technical challenge repository submitted! Score generated.');
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportTitle || !reportMilestone) return;

    const newReport: WeeklyReport = {
      id: `rep-w${reportWeek}-${Date.now()}`,
      weekNumber: reportWeek,
      title: reportTitle,
      dates: `Week ${reportWeek}, Cohort Q4`,
      milestoneCompleted: reportMilestone,
      deliverables: ['Production deployment check', reportTitle],
      hoursLogged: reportHours,
      supervisorFeedback: 'Weekly report logged. Pending mentor signoff.',
      rating: 5,
      blockers: reportBlockers || 'None reported',
      githubPrUrl: reportPrUrl || 'https://github.com/tensorspark/core/pull/' + Math.floor(130 + Math.random() * 40),
      status: 'in_review'
    };

    onSubmitReport(currentApplicant.id, newReport);
    setShowReportModal(false);
    setReportTitle('');
    setReportMilestone('');
    showToast(`Weekly progress report for Week ${reportWeek} submitted!`);
  };

  const stages: { key: ApplicationStage; label: string; desc: string }[] = [
    { key: 'submitted', label: '1. Submitted', desc: 'Application received & indexed' },
    { key: 'screening', label: '2. AI Screening', desc: 'Semantic resume & portfolio scan' },
    { key: 'technical_challenge', label: '3. Technical Challenge', desc: '48-hour code & architecture test' },
    { key: 'interview', label: '4. Deep Technical Interview', desc: '1:1 system design with AI Lead' },
    { key: 'offer', label: '5. Fellowship Offer', desc: 'Formal stipend contract & onboarding' }
  ];

  const getStageIndex = (stage: ApplicationStage): number => {
    switch (stage) {
      case 'submitted': return 0;
      case 'screening': return 1;
      case 'technical_challenge': return 2;
      case 'interview': return 3;
      case 'offer': return 4;
      case 'onboarded': return 5;
      default: return 0;
    }
  };

  const currentStageIndex = getStageIndex(currentApplicant.currentStage);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-3 bg-neutral-900 border border-cyan-500/50 rounded-xl shadow-2xl text-xs text-cyan-300 flex items-center gap-2 animate-in slide-in-from-top-4 duration-150">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Quick Candidate Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>REAL-TIME ADMISSIONS & PROGRESS PORTAL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Applicant & Intern Tracking Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Track evaluation stages, check challenge repo benchmarks, review supervisor ratings, and log weekly reports.
          </p>
        </div>

        {/* Search by Application ID */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <form onSubmit={handleSearch} className="relative flex-1 sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
            <input
              id="input-tracker-search-id"
              type="text"
              placeholder="Search Application ID (e.g. NX-AI-2026-8941)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-20 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
            />
            <button
              id="btn-tracker-search-submit"
              type="submit"
              className="absolute right-1.5 top-1.5 px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[11px] text-neutral-200 transition-colors"
            >
              Lookup
            </button>
          </form>

          <button
            id="btn-tracker-new-application"
            onClick={onOpenApplyModal}
            className="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0 transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Application</span>
          </button>
        </div>
      </div>

      {/* Available Candidate Records Selector Strip */}
      <div className="p-4 bg-neutral-900/60 rounded-2xl border border-neutral-800 space-y-2">
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span className="font-mono text-[11px] uppercase tracking-wider">
            Quick Switch Active Candidate Record:
          </span>
          <span className="text-[11px] text-neutral-500">
            Click to switch candidate profile
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {applicants.map((app) => {
            const isSelected = app.id === currentApplicant.id;
            return (
              <button
                key={app.id}
                id={`btn-select-applicant-${app.id}`}
                onClick={() => onSelectApplicant(app.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 shadow-sm'
                    : 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="font-bold">{app.id}</span>
                <span className="text-neutral-400 font-sans text-[11px]">({app.fullName.split(' ')[0]})</span>
                <span className="text-[10px] px-1 rounded bg-neutral-800 text-neutral-400 uppercase">
                  {app.currentStage.replace('_', ' ')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Applicant Summary Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-md relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm font-bold text-cyan-400 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                {currentApplicant.id}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-300 font-medium">
                {currentApplicant.roleTitle}
              </span>
              <span className="text-xs text-neutral-500 font-mono">
                Applied: {currentApplicant.appliedDate}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display flex items-center gap-3">
              <span>{currentApplicant.fullName}</span>
              {currentApplicant.isEnrolledIntern && (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Enrolled Active Fellow
                </span>
              )}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 pt-1">
              <span>Email: <strong className="text-neutral-200">{currentApplicant.email}</strong></span>
              {currentApplicant.githubUrl && (
                <a
                  href={currentApplicant.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
              <span>Experience: <strong className="text-neutral-200">{currentApplicant.yearsExperience}</strong></span>
            </div>
          </div>

          {/* Scores Overview */}
          <div className="flex items-center justify-around sm:justify-start gap-2 sm:gap-4 bg-neutral-950 p-3 sm:p-4 rounded-2xl border border-neutral-800 w-full sm:w-auto">
            <div className="text-center px-1 sm:px-2">
              <div className="text-xl sm:text-2xl font-extrabold text-cyan-400 font-display">
                {currentApplicant.scoreBreakdown.resumeMatchScore}%
              </div>
              <div className="text-[9px] sm:text-[10px] text-neutral-500 uppercase font-mono mt-0.5">Resume Fit</div>
            </div>

            <div className="h-8 w-px bg-neutral-800" />

            <div className="text-center px-1 sm:px-2">
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-display">
                {currentApplicant.scoreBreakdown.technicalScore ? `${currentApplicant.scoreBreakdown.technicalScore}%` : 'Pending'}
              </div>
              <div className="text-[9px] sm:text-[10px] text-neutral-500 uppercase font-mono mt-0.5">Tech Score</div>
            </div>

            <div className="h-8 w-px bg-neutral-800" />

            <div className="text-center px-1 sm:px-2">
              <div className="text-xl sm:text-2xl font-extrabold text-white font-display">
                {currentApplicant.scoreBreakdown.overallRating}%
              </div>
              <div className="text-[9px] sm:text-[10px] text-neutral-500 uppercase font-mono mt-0.5">Total Rating</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation: Application Progress vs Active Intern Weekly Reports */}
        <div className="mt-8 pt-4 border-t border-neutral-800 flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3">
          <button
            id="tab-btn-application-progress"
            onClick={() => setActiveTab('application')}
            className={`flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'application'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-neutral-400 hover:text-white bg-neutral-950/60'
            }`}
          >
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Application Pipeline</span>
          </button>

          <button
            id="tab-btn-intern-reports"
            onClick={() => setActiveTab('intern_reports')}
            className={`flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'intern_reports'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-neutral-400 hover:text-white bg-neutral-950/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              3-Month Sprint Reports
              {currentApplicant.weeklyReports && currentApplicant.weeklyReports.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded bg-cyan-400/30 text-cyan-200 text-[10px] font-mono">
                  {currentApplicant.weeklyReports.length}
                </span>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* View Mode 1: Application Pipeline */}
      {activeTab === 'application' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Visual Step Pipeline Progress Bar */}
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-white">
                Application Pipeline Journey
              </h3>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-neutral-800 text-neutral-300">
                Stage {currentStageIndex + 1} of 5
              </span>
            </div>

            {/* Stepper Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {stages.map((stage, idx) => {
                const isPassed = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                return (
                  <div
                    key={stage.key}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-cyan-500/10 border-cyan-500/60 text-white shadow-lg shadow-cyan-950/30'
                        : isPassed
                        ? 'bg-neutral-950/90 border-emerald-500/40 text-neutral-300'
                        : 'bg-neutral-950/40 border-neutral-850 text-neutral-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono">STEP 0{idx + 1}</span>
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isCurrent ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                      ) : (
                        <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                      )}
                    </div>
                    <div className="font-bold text-xs mb-1">{stage.label}</div>
                    <div className="text-[11px] text-neutral-400">{stage.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actionable Stage Details & Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stage Action Card */}
            <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Active Stage Action
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono">
                  {currentApplicant.currentStage.replace('_', ' ')}
                </span>
              </div>

              {currentApplicant.currentStage === 'technical_challenge' && (
                <div className="space-y-3 text-xs text-neutral-300">
                  <h4 className="font-bold text-white text-sm">
                    48-Hour Technical Assignment Assigned
                  </h4>
                  <p className="text-neutral-400">
                    Candidate has been provisioned a sandbox repo to implement asynchronous token streaming and multi-agent DAG execution.
                  </p>
                  {currentApplicant.technicalSubmission ? (
                    <div className="p-3 bg-neutral-950 rounded-xl border border-emerald-500/30 text-emerald-300 space-y-1">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Submitted: {currentApplicant.technicalSubmission.repoUrl}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400">
                        Score: {currentApplicant.technicalSubmission.score}/100 • {currentApplicant.technicalSubmission.feedback}
                      </p>
                    </div>
                  ) : (
                    <div className="pt-2">
                      <button
                        id="btn-trigger-assignment-modal"
                        onClick={() => setShowAssignmentModal(true)}
                        className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Submit Code Solution Repo</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {currentApplicant.currentStage === 'interview' && (
                <div className="space-y-3 text-xs">
                  <h4 className="font-bold text-white text-sm">
                    Technical Architecture Interview
                  </h4>
                  <p className="text-neutral-400">
                    A 45-minute live pair architecture session with one of our principal engineers.
                  </p>
                  {currentApplicant.interviewSlot ? (
                    <div className="p-3 bg-neutral-950 rounded-xl border border-cyan-500/30 text-neutral-200 space-y-1.5 font-mono">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <Calendar className="w-4 h-4" />
                        <span>{currentApplicant.interviewSlot.date} at {currentApplicant.interviewSlot.time}</span>
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        Interviewer: {currentApplicant.interviewSlot.interviewer}
                      </div>
                      <a
                        href={currentApplicant.interviewSlot.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-300 underline inline-block text-[11px]"
                      >
                        Join Video Meeting Room
                      </a>
                    </div>
                  ) : (
                    <button
                      onClick={() => showToast('Calendar slot booked for tomorrow at 2:00 PM EST!')}
                      className="px-4 py-2 rounded-xl bg-cyan-400 text-neutral-950 font-bold text-xs"
                    >
                      Book Interview Time Slot
                    </button>
                  )}
                </div>
              )}

              {currentApplicant.currentStage === 'offer' && (
                <div className="space-y-3 text-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-base">
                    Formal Fellowship Offer Extended!
                  </h4>
                  <p className="text-neutral-300">
                    Congratulations! The admissions committee has voted unanimously to welcome you to the 3-Month Fellowship.
                  </p>
                  <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1 text-[11px] text-neutral-400 font-mono">
                    <div>Stipend: <span className="text-emerald-400 font-bold">$2,000 / month</span></div>
                    <div>Duration: <span className="text-white">12 Weeks (Full-Time)</span></div>
                    <div>Cloud Compute: <span className="text-cyan-400">Unlimited H100 Cluster Access</span></div>
                  </div>
                </div>
              )}

              {currentApplicant.currentStage === 'screening' && (
                <div className="space-y-3 text-xs text-neutral-300">
                  <h4 className="font-bold text-white text-sm">
                    Automated Semantic Screening in Progress
                  </h4>
                  <p className="text-neutral-400">
                    Your skills and statement of purpose have been matched against cohort requirements.
                  </p>
                  <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-neutral-400 text-[11px] font-mono">
                    Status: Verified • Semantic Fit: {currentApplicant.scoreBreakdown.resumeMatchScore}%
                  </div>
                </div>
              )}
            </div>

            {/* Reviewer Remarks Card */}
            <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-4">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                Admissions Committee Notes
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed italic bg-neutral-950 p-4 rounded-xl border border-neutral-850">
                "{currentApplicant.reviewerNotes}"
              </p>

              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                  Recognized Core Skills
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentApplicant.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 text-cyan-300 font-mono text-[11px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Mode 2: Active 3-Month Intern Weekly Reports */}
      {activeTab === 'intern_reports' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Weekly Sprint Progress & Milestone Logs
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Enrolled 3-month fellows submit weekly deliverables, pull request links, and hours for supervisor sign-off.
              </p>
            </div>

            <button
              id="btn-submit-weekly-report-modal"
              onClick={() => setShowReportModal(true)}
              className="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit New Weekly Report</span>
            </button>
          </div>

          {/* Weekly Reports List */}
          {currentApplicant.weeklyReports && currentApplicant.weeklyReports.length > 0 ? (
            <div className="space-y-4">
              {currentApplicant.weeklyReports.map((report) => (
                <div
                  key={report.id}
                  className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-800/80">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs">
                        W{report.weekNumber}
                      </span>
                      <h4 className="font-bold text-white text-sm font-display">
                        {report.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="text-neutral-400">{report.dates}</span>
                      <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                        {report.hoursLogged} hrs logged
                      </span>
                      <span className={`px-2 py-0.5 rounded uppercase font-semibold ${
                        report.status === 'approved'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-neutral-500 font-mono block mb-1">MILESTONE DELIVERED:</span>
                      <p className="text-neutral-300 leading-relaxed">
                        {report.milestoneCompleted}
                      </p>
                      {report.githubPrUrl && (
                        <a
                          href={report.githubPrUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 hover:underline inline-flex items-center gap-1 mt-2 text-[11px]"
                        >
                          <Github className="w-3 h-3" />
                          <span>View Code Pull Request</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>

                    <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-850 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500 font-mono text-[11px]">SUPERVISOR REVIEW:</span>
                        <div className="flex items-center gap-1 text-amber-400">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              className={`w-3 h-3 ${idx < report.rating ? 'fill-current' : 'text-neutral-700'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-neutral-300 text-[11px] italic">
                        "{report.supervisorFeedback}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-neutral-900/30 border border-neutral-800 space-y-3">
              <FileText className="w-8 h-8 text-neutral-600 mx-auto" />
              <h4 className="text-sm font-semibold text-neutral-300">
                No weekly reports logged yet for this applicant
              </h4>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Once the fellowship begins, weekly milestones and supervisor ratings will be cataloged here.
              </p>
              <button
                onClick={() => setShowReportModal(true)}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Log First Report Now</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal: Submit Technical Assignment */}
      {showAssignmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="font-display font-bold text-lg text-white">
              Submit 48-Hour Technical Solution
            </h3>
            <p className="text-xs text-neutral-400">
              Provide the public GitHub repository URL containing your implementation, Dockerfile, and architecture documentation.
            </p>

            <form onSubmit={handleAssignmentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  GitHub Repository URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/your-name/tensorspark-challenge"
                  value={assignmentRepoUrl}
                  onChange={(e) => setAssignmentRepoUrl(e.target.value)}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShowAssignmentModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs"
                >
                  Submit for Evaluation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Submit Weekly Report */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="font-display font-bold text-lg text-white">
              Log Sprint Weekly Progress Report
            </h3>
            <p className="text-xs text-neutral-400">
              Submit deliverables for supervisor review and rating sign-off.
            </p>

            <form onSubmit={handleReportSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Week Number (1-12)</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={reportWeek}
                    onChange={(e) => setReportWeek(parseInt(e.target.value) || 1)}
                    className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Hours Logged</label>
                  <input
                    type="number"
                    min={10}
                    max={60}
                    value={reportHours}
                    onChange={(e) => setReportHours(parseInt(e.target.value) || 40)}
                    className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Sprint Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Model Serving & Edge Caching"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Completed Milestones & Deliverables *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Detail the code modules or PRs shipped..."
                  value={reportMilestone}
                  onChange={(e) => setReportMilestone(e.target.value)}
                  className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Pull Request / GitHub Commit URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/tensorspark/core/pull/..."
                  value={reportPrUrl}
                  onChange={(e) => setReportPrUrl(e.target.value)}
                  className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Blockers / Need Help With?</label>
                <input
                  type="text"
                  placeholder="None / CUDA driver compatibility..."
                  value={reportBlockers}
                  onChange={(e) => setReportBlockers(e.target.value)}
                  className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs"
                >
                  Save & Log Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
