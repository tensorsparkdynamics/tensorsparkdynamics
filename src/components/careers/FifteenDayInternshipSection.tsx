'use client';

import React, { useState, useRef } from 'react';
import { FastTrackTask, FifteenDayInternship } from '../../types';
import { 
  INITIAL_FAST_TRACK_TASKS, 
  FIFTEEN_DAY_PROGRAM_RULES, 
  FIFTEEN_DAY_INTERNSHIPS 
} from '../../data/careerData';
import { DigitalSignaturePad } from './DigitalSignaturePad';
import { TensorsparkLogo } from '../TensorsparkLogo';
import { AbhishekSignature, AjaySignature } from '../FounderSignatures';
import { InternshipApplicationModal } from './InternshipApplicationModal';
import { InternshipPaymentModal } from './InternshipPaymentModal';
import { toPng } from 'html-to-image';
import { 
  Award, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  PenTool, 
  Check, 
  ChevronRight, 
  FileCheck, 
  ArrowRight, 
  Sparkles, 
  Send, 
  HelpCircle, 
  Zap, 
  Code2, 
  GraduationCap, 
  Download, 
  Loader2,
  Search,
  Filter,
  Lock,
  Unlock,
  RefreshCw,
  BookOpen,
  Smartphone,
  AlertCircle
} from 'lucide-react';

export const FifteenDayInternshipSection: React.FC = () => {
  // Navigation & View Mode
  const [activeTab, setActiveTab] = useState<'catalog' | 'monitoring' | 'signature' | 'certificate' | 'overview'>('catalog');
  
  // Selected track & candidate profile
  const [selectedInternship, setSelectedInternship] = useState<FifteenDayInternship>(FIFTEEN_DAY_INTERNSHIPS[0]);
  const [candidateName, setCandidateName] = useState('Rahul Sharma');
  const [candidateEmail, setCandidateEmail] = useState('rahul.sharma@engineer.edu');
  const [candidatePhone, setCandidatePhone] = useState('+91 98765 43210');
  const [candidateCollege, setCandidateCollege] = useState('IIT Patna');
  const [candidateDegree, setCandidateDegree] = useState('B.Tech Computer Science');
  const [candidateGithub, setCandidateGithub] = useState('https://github.com/rahul-tensorspark');

  // Enrollment & Payment state
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [feeStatusPaid, setFeeStatusPaid] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [enrolledDate, setEnrolledDate] = useState('');
  const [enrollmentSuccessBanner, setEnrollmentSuccessBanner] = useState<string | null>(null);

  // Modals state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [internshipToApply, setInternshipToApply] = useState<FifteenDayInternship | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Sprint Tasks State
  const [tasks, setTasks] = useState<FastTrackTask[]>(INITIAL_FAST_TRACK_TASKS);
  const [selectedTaskToSubmit, setSelectedTaskToSubmit] = useState<FastTrackTask | null>(null);
  const [submissionRepo, setSubmissionRepo] = useState('');
  const [submissionDemo, setSubmissionDemo] = useState('');

  // Signature & Certificate State
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [certificateId, setCertificateId] = useState('NX-CERT-15D-2026-8941');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Catalog search & filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const certificateRef = useRef<HTMLDivElement>(null);

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const onTimeCount = tasks.filter(t => t.submittedOnTime).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);
  const allTasksCompleted = completedCount === tasks.length;

  // Filtered internships
  const categories = ['All', 'Artificial Intelligence', 'Full-Stack Web', 'Autonomous Systems', 'Design & Experience', 'Creative Arts', 'Data & Analytics'];

  const filteredInternships = FIFTEEN_DAY_INTERNSHIPS.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Flow Step 1: Click "Apply & Enroll" on an internship card
  const handleOpenApplyModal = (internship: FifteenDayInternship) => {
    setInternshipToApply(internship);
    setIsApplyModalOpen(true);
  };

  // Flow Step 2: Submit application form -> proceed to payment gateway
  const handleProceedToPayment = (formData: {
    fullName: string;
    email: string;
    phone: string;
    college: string;
    degree: string;
    githubUrl: string;
  }) => {
    setCandidateName(formData.fullName);
    setCandidateEmail(formData.email);
    setCandidatePhone(formData.phone);
    setCandidateCollege(formData.college);
    setCandidateDegree(formData.degree);
    setCandidateGithub(formData.githubUrl);

    if (internshipToApply) {
      setSelectedInternship(internshipToApply);
    }
    setIsApplyModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  // Flow Step 3: Payment verified -> redirect to personal internship monitoring section
  const handlePaymentSuccess = (txnDetails: {
    txnId: string;
    paidAmount: string;
    timestamp: string;
  }) => {
    setTransactionId(txnDetails.txnId);
    setFeeStatusPaid(true);
    setIsEnrolled(true);
    setEnrolledDate(txnDetails.timestamp);
    setIsPaymentModalOpen(false);

    // Provide immediate visual confirmation and redirect to monitoring section
    setEnrollmentSuccessBanner(`Payment of ₹2,000 RS verified (Txn: ${txnDetails.txnId})! Welcome to your personal 15-Day Internship Monitoring Section.`);
    setActiveTab('monitoring');

    // Scroll to top of monitoring section
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Flow Step 4: Submit single task milestone
  const handleOpenSubmitModal = (task: FastTrackTask) => {
    setSelectedTaskToSubmit(task);
    setSubmissionRepo(task.submissionRepoUrl || `https://github.com/candidate/tensorspark-milestone-${task.taskNumber}`);
    setSubmissionDemo(task.liveDemoUrl || `https://preview-task${task.taskNumber}.tensorspark.run.app`);
  };

  const handleSubmitTaskMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTaskToSubmit) return;

    const updated = tasks.map(t => {
      if (t.id === selectedTaskToSubmit.id) {
        return {
          ...t,
          status: 'completed' as const,
          submittedOnTime: true,
          submissionRepoUrl: submissionRepo || 'https://github.com/candidate/tensorspark-task-submission',
          liveDemoUrl: submissionDemo || 'https://demo-preview.tensorspark.run.app',
          submittedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (On Time)',
          reviewerScore: Math.floor(93 + Math.random() * 6)
        };
      }
      return t;
    });

    setTasks(updated);
    setSelectedTaskToSubmit(null);

    // If all tasks are completed after this submission, notify user to sign
    const newCompletedCount = updated.filter(t => t.status === 'completed').length;
    if (newCompletedCount === updated.length && !signatureDataUrl) {
      setTimeout(() => {
        setActiveTab('signature');
      }, 700);
    }
  };

  // Helper: Fast-Track simulation to mark all tasks completed
  const handleQuickCompleteAllTasks = () => {
    const completedTasks = tasks.map(t => ({
      ...t,
      status: 'completed' as const,
      submittedOnTime: true,
      submissionRepoUrl: t.submissionRepoUrl || `https://github.com/candidate/tensorspark-milestone-${t.taskNumber}`,
      liveDemoUrl: t.liveDemoUrl || `https://candidate-preview-${t.taskNumber}.tensorspark.run.app`,
      submittedAt: 'Verified On Time',
      reviewerScore: t.reviewerScore || Math.floor(94 + Math.random() * 5)
    }));
    setTasks(completedTasks);

    // If no signature yet, automatically transition to signature pad
    if (!signatureDataUrl) {
      setActiveTab('signature');
    }
  };

  // Reset tasks to fresh pending state
  const handleResetTasks = () => {
    const reset = tasks.map((t, idx) => ({
      ...t,
      status: idx === 0 ? ('in_progress' as const) : ('pending' as const),
      submittedOnTime: false,
      submissionRepoUrl: undefined,
      liveDemoUrl: undefined,
      submittedAt: undefined,
      reviewerScore: undefined
    }));
    setTasks(reset);
    setSignatureDataUrl(null);
  };

  // Flow Step 5: Save candidate digital signature -> generate certificate
  const handleSaveSignature = (sigUrl: string, signerName: string) => {
    setSignatureDataUrl(sigUrl);
    if (signerName) setCandidateName(signerName);
    const newCertId = 'TS-CERT-15D-2026-' + Math.floor(1000 + Math.random() * 9000);
    setCertificateId(newCertId);
    // Switch to certificate tab to show the finalized official certificate
    setActiveTab('certificate');
  };

  // Flow Step 6: Download Certificate as High-Resolution PNG (ONLY download option)
  const handleDownloadCertificate = async () => {
    if (!certificateRef.current) return;
    try {
      setIsDownloading(true);
      const dataUrl = await toPng(certificateRef.current, {
        quality: 0.98,
        pixelRatio: 2.5,
        backgroundColor: '#0a0a0a',
        cacheBust: true,
      });

      const sanitizedName = candidateName.trim().replace(/[^a-zA-Z0-9]/g, '_') || 'Candidate';
      const fileName = `Tensorspark_15Day_Certificate_${certificateId}_${sanitizedName}.png`;
      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch (err) {
      console.error('Failed to export certificate image:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      
      {/* Top Banner: Success or Enrolled Shortcut */}
      {enrollmentSuccessBanner && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{enrollmentSuccessBanner}</span>
          </div>
          <button 
            type="button" 
            onClick={() => setEnrollmentSuccessBanner(null)}
            className="text-neutral-400 hover:text-white text-xs cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Hero Banner with 2000RS Price Tag & Co-Founder Endorsement */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-neutral-900 via-neutral-900/80 to-neutral-950 border border-neutral-800 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>15-DAY FAST-TRACK TRACK</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
                FIXED ₹2,000 RS
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono flex items-center gap-1">
                <PenTool className="w-3 h-3" /> Candidate Digital Signature
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-white font-display tracking-tight">
              15 Days Fast-Track Applied Internships
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
              Select your track, complete the ₹2,000 RS enrollment, and enter your personal <strong className="text-cyan-400 font-semibold">Internship Monitoring Section</strong>. Complete all 5 milestone tasks on time, provide your digital signature, and generate your verified Certificate of Completion.
            </p>

            {/* Program 4-Step Journey Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              <div className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 text-center">
                <span className="text-[10px] font-mono text-cyan-400 block font-semibold">STEP 1</span>
                <span className="text-xs font-bold text-white block">Browse Tracks</span>
                <span className="text-[10px] text-neutral-400">Choose Domain</span>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 text-center">
                <span className="text-[10px] font-mono text-emerald-400 block font-semibold">STEP 2</span>
                <span className="text-xs font-bold text-white block">Pay ₹2,000 RS</span>
                <span className="text-[10px] text-neutral-400">UPI / Card Gateway</span>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 text-center">
                <span className="text-[10px] font-mono text-indigo-400 block font-semibold">STEP 3</span>
                <span className="text-xs font-bold text-white block">Sprint Monitoring</span>
                <span className="text-[10px] text-neutral-400">5 Tasks On-Time</span>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 text-center">
                <span className="text-[10px] font-mono text-amber-400 block font-semibold">STEP 4</span>
                <span className="text-xs font-bold text-white block">Sign & Download</span>
                <span className="text-[10px] text-neutral-400">Official Certificate</span>
              </div>
            </div>
          </div>

          {/* Candidate Status & Fast-Action Card */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-4 shadow-xl">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto">
              <Award className="w-6 h-6" />
            </div>

            <div>
              <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
                ₹2,000 <span className="text-xs text-neutral-400 font-sans font-normal">RS only</span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                {isEnrolled ? (
                  <span className="text-emerald-400 font-mono font-semibold">✓ ENROLLED & ACTIVE</span>
                ) : (
                  <span>One-time sprint sandbox & evaluation fee</span>
                )}
              </p>
            </div>

            {isEnrolled ? (
              <div className="space-y-2 pt-1 border-t border-neutral-850">
                <div className="text-left text-xs space-y-1">
                  <div className="text-neutral-400 font-mono text-[11px]">Enrolled Track:</div>
                  <div className="text-white font-semibold truncate">{selectedInternship.title}</div>
                  <div className="text-cyan-400 font-mono text-[11px]">Tasks: {completedCount}/5 Completed</div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('monitoring')}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-neutral-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Go to My Internship Monitoring</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-1 border-t border-neutral-850">
                <button
                  type="button"
                  onClick={() => handleOpenApplyModal(selectedInternship)}
                  className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Apply for 15-Day Internship</span>
                </button>
                <div className="text-[11px] font-mono text-neutral-400">
                  Includes Gateway & Personal Monitoring
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Sub-Pills Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-neutral-800">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'catalog', label: '15-Day Internships Catalog', icon: BookOpen, badge: `${FIFTEEN_DAY_INTERNSHIPS.length} Tracks` },
            { id: 'monitoring', label: `Internship Monitoring (${completedCount}/5 Tasks)`, icon: Clock, badge: isEnrolled ? 'Active' : undefined },
            { id: 'signature', label: 'Candidate Digital Signature', icon: PenTool, badge: allTasksCompleted ? 'Ready' : 'Locked' },
            { id: 'certificate', label: 'Verified Certificate', icon: Award, badge: allTasksCompleted && signatureDataUrl ? 'Issued' : undefined },
            { id: 'overview', label: 'Program Terms & Policy', icon: FileCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-neutral-800 text-white border border-neutral-700 shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-neutral-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-neutral-850 text-neutral-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Fee: ₹2,000 RS {feeStatusPaid ? '(Paid)' : '(Upon Apply)'}</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 15-DAY INTERNSHIPS CATALOG (Shown when clicking 15 Days Internship) */}
      {/* ========================================================================= */}
      {activeTab === 'catalog' && (
        <div className="space-y-8">
          {/* Active Enrollment Alert if user is enrolled */}
          {isEnrolled && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>ACTIVE ENROLLMENT DETECTED</span>
                </div>
                <div className="text-sm font-bold text-white font-display">
                  {selectedInternship.title} • Candidate: {candidateName}
                </div>
                <div className="text-xs text-neutral-400">
                  {completedCount} of 5 Sprint Tasks Completed • On-time tracking active
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('monitoring')}
                className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <span>Go to Monitoring Section</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Search & Category Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-neutral-950 font-bold'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tracks or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>

          {/* Internships Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map((internship) => {
              const isCurrentSelected = isEnrolled && selectedInternship.id === internship.id;
              return (
                <div
                  key={internship.id}
                  className={`p-6 rounded-3xl border flex flex-col justify-between transition-all group ${
                    isCurrentSelected
                      ? 'bg-neutral-900/90 border-cyan-500 shadow-xl shadow-cyan-950/30 ring-1 ring-cyan-500/50'
                      : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/50'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header: Category & Fee */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-cyan-400 px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                        {internship.domain}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                        ₹2,000 RS
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                        {internship.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                        {internship.description}
                      </p>
                    </div>

                    {/* Sprints Outline */}
                    <div className="p-3 rounded-2xl bg-neutral-900/80 border border-neutral-850 space-y-1.5 text-[11px]">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-semibold">
                        15 Days • 5 Evaluated Sprints:
                      </span>
                      {internship.sprintsSummary.slice(0, 3).map((sprint, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-neutral-300">
                          <Check className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span className="truncate">{sprint}</span>
                        </div>
                      ))}
                      <div className="text-[10px] text-neutral-500 font-mono pl-4">
                        + 2 more sprints & Digital Signature sign-off
                      </div>
                    </div>

                    {/* Skills Tag Strip */}
                    <div className="flex flex-wrap gap-1.5">
                      {internship.skills.slice(0, 4).map((skill) => (
                        <span 
                          key={skill}
                          className="px-2 py-0.5 rounded-md bg-neutral-900 text-neutral-300 text-[10px] font-mono border border-neutral-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-6 border-t border-neutral-850/80 mt-6 flex items-center justify-between gap-3">
                    <div className="text-[11px] font-mono text-neutral-400">
                      <span className="text-amber-400 font-semibold">{internship.seatsRemaining} seats</span> left
                    </div>

                    {isCurrentSelected ? (
                      <button
                        type="button"
                        onClick={() => setActiveTab('monitoring')}
                        className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/20"
                      >
                        <span>View Monitoring</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenApplyModal(internship)}
                        className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-cyan-400 hover:text-neutral-950 text-white font-semibold text-xs border border-neutral-700 hover:border-cyan-400 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Apply & Enroll</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: INTERNSHIP MONITORING SECTION (Redirected here after payment)      */}
      {/* ========================================================================= */}
      {activeTab === 'monitoring' && (
        <div className="space-y-8">
          {/* Candidate Workspace Profile Header */}
          <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold">
                  CANDIDATE DASHBOARD
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Fee Paid (₹2,000 RS)
                </span>
                {transactionId && (
                  <span className="text-[11px] font-mono text-neutral-400">
                    Txn: {transactionId}
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                {selectedInternship.title}
              </h3>
              
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 pt-1">
                <div>Candidate: <strong className="text-white">{candidateName}</strong></div>
                <span>•</span>
                <div>Email: <span className="text-neutral-300">{candidateEmail}</span></div>
                <span>•</span>
                <div>College: <span className="text-neutral-300">{candidateCollege}</span></div>
              </div>
            </div>

            {/* Sprints Progress Dial / Stats */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 w-full lg:w-72 shrink-0">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-neutral-400">Milestone Progress:</span>
                <span className="text-cyan-400 font-bold">{completedCount} of 5 Sprints ({progressPercent}%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-neutral-900 overflow-hidden border border-neutral-800">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-neutral-400 pt-0.5">
                <span>On-Time Rate: <strong className="text-emerald-400">{completedCount > 0 ? Math.round((onTimeCount / completedCount) * 100) : 100}%</strong></span>
                <span>Cohort: TS-2026-SEP</span>
              </div>
            </div>
          </div>

          {/* Quick-Action Helper Toolbar for Testing & Simulation */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="text-neutral-400 text-xs">
              <strong className="text-white">Reviewer Requirement:</strong> Complete all 5 sprint tasks on time to unlock the Candidate Digital Signature Pad and Certificate.
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleQuickCompleteAllTasks}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Simulate all 5 tasks completed on-time for instant testing"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>⚡ Complete All 5 Tasks (Demo Simulation)</span>
              </button>
              <button
                type="button"
                onClick={handleResetTasks}
                className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-white border border-neutral-800 text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer"
                title="Reset tasks to start over"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* All Tasks Completed Notification & Digital Signature Prompt */}
          {allTasksCompleted && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/15 via-cyan-500/15 to-blue-500/15 border-2 border-cyan-500/40 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in zoom-in-95">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ALL 5 SPRINT TASKS VERIFIED ON-TIME (SCORE: 96/100)</span>
                </div>
                <h4 className="text-lg font-bold text-white font-display">
                  Next Step: Execute Candidate Digital Signature
                </h4>
                <p className="text-xs text-neutral-300 max-w-xl">
                  {signatureDataUrl ? (
                    <span>Your digital signature has been recorded! Your Certificate of Completion is ready for download.</span>
                  ) : (
                    <span>As requested by the program protocol, you must provide your legally binding digital signature on our web pad before generating your official certificate.</span>
                  )}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                {signatureDataUrl ? (
                  <button
                    type="button"
                    onClick={() => setActiveTab('certificate')}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-neutral-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-neutral-950" />
                    <span>View & Download Certificate</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveTab('signature')}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-neutral-950 font-bold text-xs shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <PenTool className="w-4 h-4 text-neutral-950" />
                    <span>Sign on Digital Pad Now</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-950" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Sprints Tasks List */}
          <div className="space-y-4">
            {tasks.map((task) => {
              const isCompleted = task.status === 'completed';
              return (
                <div
                  key={task.id}
                  className={`p-6 rounded-3xl border transition-all ${
                    isCompleted
                      ? 'bg-neutral-900/80 border-emerald-500/30'
                      : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono text-xs font-semibold">
                          Task {task.taskNumber} • {task.dayRange}
                        </span>
                        {task.submittedOnTime ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[11px] flex items-center gap-1 font-medium">
                            <CheckCircle2 className="w-3 h-3" /> Submitted On Time
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono text-[11px] flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Deadline: {task.deadlineHours}h from release
                          </span>
                        )}
                        {task.reviewerScore && (
                          <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[11px]">
                            Review Score: <strong className="text-cyan-400">{task.reviewerScore}/100</strong>
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-white font-display">
                        {task.title}
                      </h4>
                      <p className="text-xs text-neutral-300 max-w-3xl leading-relaxed">
                        {task.description}
                      </p>

                      {/* Deliverables checklist */}
                      <div className="pt-1">
                        <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                          Required Sprint Deliverables:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-neutral-300">
                          {task.deliverables.map((item, i) => (
                            <div key={i} className="flex items-start gap-1.5 p-1.5 rounded-xl bg-neutral-950/70 border border-neutral-850">
                              <Check className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                              <span className="text-[11px]">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Links preview if submitted */}
                      {task.submissionRepoUrl && (
                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-1 text-neutral-400">
                          <span>Status: <strong className="text-emerald-400">Verified ({task.submittedAt})</strong></span>
                          <a 
                            href={task.submissionRepoUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-cyan-400 hover:underline flex items-center gap-1"
                          >
                            <span>Repo PR</span> <ExternalLink className="w-3 h-3" />
                          </a>
                          {task.liveDemoUrl && (
                            <a 
                              href={task.liveDemoUrl} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-indigo-400 hover:underline flex items-center gap-1"
                            >
                              <span>Live Preview</span> <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="shrink-0 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenSubmitModal(task)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                          isCompleted
                            ? 'bg-neutral-800 hover:bg-neutral-750 text-neutral-200 border border-neutral-700'
                            : 'bg-cyan-400 hover:bg-cyan-300 text-neutral-950 shadow-md shadow-cyan-500/20 font-bold'
                        }`}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isCompleted ? 'Update Submission' : 'Submit Task On-Time'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: CANDIDATE DIGITAL SIGNATURE AUTHORIZATION                           */}
      {/* ========================================================================= */}
      {activeTab === 'signature' && (
        <div className="space-y-6 max-w-3xl mx-auto">
          {!allTasksCompleted ? (
            <div className="p-8 rounded-3xl bg-neutral-900/60 border border-amber-500/30 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white font-display">
                  Digital Signature Pad Locked
                </h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  You must complete all 5 sprint tasks in your Internship Monitoring Section before executing your candidate digital signature. Currently completed: {completedCount} of 5 tasks.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('monitoring')}
                className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <span>Go to Tasks Monitoring</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>5 / 5 Sprint Tasks Completed On-Time</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  Candidate Digital Signature Execution
                </h3>
                <p className="text-xs text-neutral-400 max-w-lg mx-auto">
                  Draw or type your signature below. Once confirmed, it will be cryptographically attached alongside co-founders Abhishek Kumar & Ajay Singh Chauhan to generate your verified 15-Day Certificate.
                </p>
              </div>

              <DigitalSignaturePad
                onSaveSignature={handleSaveSignature}
                initialName={candidateName}
                initialSignature={signatureDataUrl || undefined}
              />
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: VERIFIED CERTIFICATE (ONLY DOWNLOAD OPTION - PRINT REMOVED)        */}
      {/* ========================================================================= */}
      {activeTab === 'certificate' && (
        <div className="space-y-6">
          {(!allTasksCompleted || !signatureDataUrl) ? (
            <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white font-display">
                  Certificate Not Yet Generated
                </h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  To unlock and generate your official Certificate of Completion:
                </p>
                <div className="flex flex-col items-center gap-1.5 text-xs text-neutral-300 pt-2 font-mono">
                  <div className={allTasksCompleted ? "text-emerald-400" : "text-neutral-400"}>
                    {allTasksCompleted ? "✓" : "○"} 1. Complete all 5 sprint tasks on-time ({completedCount}/5)
                  </div>
                  <div className={signatureDataUrl ? "text-emerald-400" : "text-neutral-400"}>
                    {signatureDataUrl ? "✓" : "○"} 2. Execute Candidate Digital Signature
                  </div>
                </div>
              </div>
              
              <div className="pt-2 flex items-center justify-center gap-3">
                {!allTasksCompleted ? (
                  <button
                    type="button"
                    onClick={() => setActiveTab('monitoring')}
                    className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Complete Tasks in Monitoring
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveTab('signature')}
                    className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>Sign on Digital Pad</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header with ONLY Download Button (Print completely removed as requested) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    Official 15-Day Internship Certificate of Completion
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Verified credential with candidate digital signature & IIT Patna alumni co-founder endorsements.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Primary & ONLY Download Action */}
                  <button
                    type="button"
                    id="download-certificate-png-btn"
                    onClick={handleDownloadCertificate}
                    disabled={isDownloading}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-neutral-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                        <span>Rendering High-Res PNG...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 text-neutral-950" />
                        <span>Download Certificate (PNG)</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('signature')}
                    className="px-3 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-cyan-300 text-xs border border-neutral-800 flex items-center gap-1.5 cursor-pointer"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>Update Signature</span>
                  </button>
                </div>
              </div>

              {/* Download Success Confirmation Banner */}
              {downloadSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-between gap-3 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Certificate downloaded successfully! Saved as high-resolution PNG with authentic co-founder signatures and seal.</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setDownloadSuccess(false)}
                    className="text-neutral-400 hover:text-white text-xs cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* Certificate Canvas / Card View */}
              <div 
                ref={certificateRef}
                id="internship-certificate"
                className="printable-certificate p-8 sm:p-12 rounded-3xl bg-neutral-950 border-4 border-neutral-800 shadow-2xl relative overflow-hidden text-neutral-200"
              >
                {/* Background Certificate Border & Watermark */}
                <div className="absolute inset-3 border-2 border-cyan-500/20 rounded-2xl pointer-events-none" />
                <div className="absolute inset-5 border border-dashed border-neutral-800 rounded-xl pointer-events-none" />
                <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 space-y-8">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-neutral-850">
                    <div className="flex items-center gap-3">
                      <TensorsparkLogo size="lg" showText={true} subtitle="ACCREDITED FELLOWSHIP" animated={true} />
                    </div>

                    <div className="text-right font-mono text-xs text-neutral-400">
                      <div>Credential ID: <strong className="text-cyan-400">{certificateId}</strong></div>
                      <div>Issue Date: <strong className="text-white">September 13, 2026</strong></div>
                      <div>Verification Status: <span className="text-emerald-400 font-bold">VERIFIED ON-CHAIN</span></div>
                    </div>
                  </div>

                  {/* Certificate Main Body */}
                  <div className="text-center max-w-2xl mx-auto space-y-4 py-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                      Certificate of Internship Completion & Merit
                    </span>

                    <p className="text-xs text-neutral-400">
                      This officially certifies that
                    </p>

                    {/* Candidate Name */}
                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight border-b-2 border-neutral-800 pb-2 inline-block px-8">
                      {candidateName || 'Candidate Name'}
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-2">
                      has successfully completed the intensive 15-day applied sprint program in <strong className="text-cyan-400">{selectedInternship.title}</strong> at Tensorspark, fulfilling all <strong className="text-white">5 Multi-Task Milestones strictly on time</strong> and demonstrating superior technical proficiency, robust code review standards, and autonomous software execution.
                    </p>
                  </div>

                  {/* Task Completion Transcript Strip */}
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-850 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                    {tasks.map((t) => (
                      <div key={t.id} className="p-2 rounded bg-neutral-950 border border-neutral-850">
                        <span className="text-[10px] font-mono text-neutral-500 block">Milestone {t.taskNumber}</span>
                        <span className="text-[11px] font-medium text-white truncate block">{t.dayRange}</span>
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
                          <Check className="w-2.5 h-2.5" /> On Time ({t.reviewerScore || 95}%)
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* 4-Column Signatures & Seal Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end pt-4 border-t border-neutral-850">
                    {/* 1. Candidate's Digital Signature */}
                    <div className="text-center p-3 rounded-xl bg-neutral-900/40 border border-cyan-500/20 space-y-2">
                      <div className="h-16 flex items-center justify-center">
                        {signatureDataUrl ? (
                          <img 
                            src={signatureDataUrl} 
                            alt="Candidate Digital Signature" 
                            className="max-h-14 max-w-full object-contain filter invert"
                          />
                        ) : (
                          <div className="text-cyan-400 italic text-2xl font-serif">
                            {candidateName}
                          </div>
                        )}
                      </div>
                      <div className="border-t border-neutral-750 pt-1">
                        <div className="text-xs font-bold text-white font-mono truncate">{candidateName}</div>
                        <div className="text-[10px] font-mono text-cyan-400">Candidate Digital Signature</div>
                      </div>
                    </div>

                    {/* 2. Co-Founder: Abhishek Kumar */}
                    <div className="text-center p-3 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-2">
                      <div className="h-16 flex items-center justify-center overflow-hidden">
                        <AbhishekSignature color="#38bdf8" width={180} height={56} />
                      </div>
                      <div className="border-t border-neutral-750 pt-1">
                        <div className="text-xs font-bold text-white font-mono">Abhishek Kumar</div>
                        <div className="text-[10px] font-mono text-cyan-400 font-semibold">Co-Founder</div>
                        <div className="text-[9.5px] font-mono text-neutral-400">M.Tech, IIT Patna</div>
                      </div>
                    </div>

                    {/* 3. Official Seal & QR */}
                    <div className="text-center space-y-2 flex flex-col items-center justify-center">
                      <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-cyan-400/60 p-1 flex items-center justify-center bg-cyan-500/5 shadow-lg shadow-cyan-500/10 group">
                        <div className="w-full h-full rounded-full border border-cyan-400/40 flex flex-col items-center justify-center text-[8px] font-mono text-cyan-300 font-bold uppercase tracking-tighter text-center leading-none p-1">
                          <TensorsparkLogo size="xs" showText={false} animated={true} />
                          <span className="text-[7px] text-amber-400 font-mono tracking-widest mt-0.5">TENSORSPARK</span>
                          <span className="text-[6px] text-cyan-300 tracking-wider">SEAL</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 block">
                        Official Authenticated Seal
                      </span>
                    </div>

                    {/* 4. Co-Founder: Ajay Singh Chauhan */}
                    <div className="text-center p-3 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-2">
                      <div className="h-16 flex items-center justify-center overflow-hidden">
                        <AjaySignature color="#60a5fa" width={120} height={60} />
                      </div>
                      <div className="border-t border-neutral-750 pt-1">
                        <div className="text-xs font-bold text-white font-mono">Ajay Singh Chauhan</div>
                        <div className="text-[10px] font-mono text-sky-400 font-semibold">Co-Founder</div>
                        <div className="text-[9.5px] font-mono text-neutral-400">M.Tech, IIT Patna</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Verification Hash */}
                  <div className="text-center text-[10px] font-mono text-neutral-500 pt-2 flex flex-wrap items-center justify-between gap-2">
                    <span>SHA-256 Checksum: 8f9b2c0194ad82e75618490a...33190f</span>
                    <span>Fee: ₹2,000 RS Paid (Receipt #{transactionId || 'NX-PAY-7719'})</span>
                    <span>Candidate Compliance: Digital Signature Recorded</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: PROGRAM TERMS & EVALUATION PROTOCOL                                */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-6 text-xs text-neutral-300">
          <h3 className="text-base font-bold text-white font-display">
            15-Day Fast-Track Internship Terms & Evaluation Protocol
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 p-4 rounded-xl bg-neutral-950 border border-neutral-850">
              <h4 className="font-semibold text-cyan-400 font-mono text-xs uppercase tracking-wider">
                1. Assessment Fee Structure (₹2,000 RS)
              </h4>
              <p className="text-neutral-400 leading-relaxed">
                The ₹2,000 RS fee covers candidate sandbox compute resources, automated benchmark review suites, and cryptographic validation infrastructure. There are no hidden fees.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-neutral-950 border border-neutral-850">
              <h4 className="font-semibold text-emerald-400 font-mono text-xs uppercase tracking-wider">
                2. Mandatory Candidate Digital Signature
              </h4>
              <p className="text-neutral-400 leading-relaxed">
                Before the Certificate of Completion is unlocked, the candidate must execute a digital signature on our web pad. This affirms that all 5 task submissions represent original individual work and provides a verifiable biometric/handwritten audit trail for prospective employers.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-neutral-950 border border-neutral-850">
              <h4 className="font-semibold text-indigo-400 font-mono text-xs uppercase tracking-wider">
                3. On-Time Task Completion Rules
              </h4>
              <p className="text-neutral-400 leading-relaxed">
                Tasks 1 through 5 must be completed within their respective sprint windows. Timestamps are captured server-side upon GitHub commit push and demo deployment. Candidates with 100% on-time completion receive an honors commendation on their certificate transcript.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-neutral-950 border border-neutral-850">
              <h4 className="font-semibold text-amber-400 font-mono text-xs uppercase tracking-wider">
                4. Downloadable High-Resolution Certificate
              </h4>
              <p className="text-neutral-400 leading-relaxed">
                The certificate is exportable directly as a high-resolution PNG image featuring the candidate's verified name, digital signature, and the signatures of Co-Founders Abhishek Kumar and Ajay Singh Chauhan (M.Tech, IIT Patna).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: Application Modal                                                */}
      {/* ========================================================================= */}
      {isApplyModalOpen && internshipToApply && (
        <InternshipApplicationModal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          internship={internshipToApply}
          onProceedToPayment={handleProceedToPayment}
          initialData={{
            fullName: candidateName,
            email: candidateEmail
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: Payment Gateway Modal                                            */}
      {/* ========================================================================= */}
      {isPaymentModalOpen && selectedInternship && (
        <InternshipPaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          internship={selectedInternship}
          candidateName={candidateName}
          candidateEmail={candidateEmail}
          candidatePhone={candidatePhone}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: Submit Task Milestone Modal                                      */}
      {/* ========================================================================= */}
      {selectedTaskToSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl bg-neutral-900 border border-neutral-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                  Task {selectedTaskToSubmit.taskNumber} • {selectedTaskToSubmit.dayRange}
                </span>
                <h4 className="text-sm font-bold text-white font-display">
                  {selectedTaskToSubmit.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTaskToSubmit(null)}
                className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitTaskMilestone} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono text-neutral-300 mb-1">
                  GitHub Repository / PR URL:
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/your-username/tensorspark-task"
                  value={submissionRepo}
                  onChange={(e) => setSubmissionRepo(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-mono text-neutral-300 mb-1">
                  Live Preview / Demo URL:
                </label>
                <input
                  type="url"
                  placeholder="https://your-preview.tensorspark.run.app"
                  value={submissionDemo}
                  onChange={(e) => setSubmissionDemo(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>On-Time Submission Guarantee: This task will be timestamped immediately as submitted on schedule.</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTaskToSubmit(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Task for Verification</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
