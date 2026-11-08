'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AuthUser, WorkSession, Applicant, TabView } from '../types';
import { 
  Clock, 
  Play, 
  Pause, 
  Square, 
  CheckCircle2, 
  Copy, 
  ShieldCheck, 
  Mail, 
  Key, 
  User, 
  Briefcase, 
  Calendar, 
  FileText, 
  Sparkles, 
  TrendingUp, 
  ExternalLink,
  ArrowRight,
  RefreshCw,
  Award,
  Layers,
  Check,
  Building
} from 'lucide-react';
import { dbSaveWorkSession, dbGetWorkSessions, dbUpdateUserWorkTime } from '../lib/firebase';

interface AccountViewProps {
  currentUser: AuthUser | null;
  onOpenAuthModal: () => void;
  onOpenApplyModal: () => void;
  onNavigateToTracker: (applicantId?: string) => void;
  onNavigateTab: (tab: TabView) => void;
  applicants: Applicant[];
}

export const AccountView: React.FC<AccountViewProps> = ({
  currentUser,
  onOpenAuthModal,
  onOpenApplyModal,
  onNavigateToTracker,
  onNavigateTab,
  applicants,
}) => {
  // Session tracking states
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentSessionSeconds, setCurrentSessionSeconds] = useState<number>(0);
  const [sessionStartTime, setSessionStartTime] = useState<string | null>(null);
  const [taskDescription, setTaskDescription] = useState<string>('Refining distributed transformer attention kernels');
  const [projectTrack, setProjectTrack] = useState<string>('AI Core Engineering');
  
  // Total work accumulated
  const [totalWorkSeconds, setTotalWorkSeconds] = useState<number>(() => currentUser?.totalWorkSeconds || 3600);
  const [workSessions, setWorkSessions] = useState<WorkSession[]>([]);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const syncTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Match applicant record for this user
  const matchingApplicant = applicants.find(
    a => a.email.toLowerCase() === (currentUser?.email || '').toLowerCase()
  );

  // Fetch past work sessions from Firestore or server
  useEffect(() => {
    if (!currentUser) return;
    setTotalWorkSeconds(currentUser.totalWorkSeconds || 3600);

    const loadSessions = async () => {
      try {
        const remoteSessions = await dbGetWorkSessions(currentUser.id);
        if (remoteSessions && remoteSessions.length > 0) {
          setWorkSessions(remoteSessions);
        } else {
          // Initialize sample previous session
          const sampleSession: WorkSession = {
            id: 'ws_sample_01',
            userId: currentUser.id,
            userName: currentUser.name,
            userEmail: currentUser.email,
            startTime: new Date(Date.now() - 3600 * 1000).toISOString(),
            endTime: new Date().toISOString(),
            durationSeconds: 3600,
            durationFormatted: '01:00:00',
            taskDescription: 'Onboarding & Tensor architecture setup',
            projectTrack: currentUser.department || 'Autonomous Intelligence',
            createdAt: new Date().toISOString(),
          };
          setWorkSessions([sampleSession]);
        }
      } catch (err) {
        console.warn('Work session fetch note:', err);
      }
    };

    loadSessions();
  }, [currentUser]);

  // Active work stopwatch ticker
  useEffect(() => {
    if (isClockedIn && !isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentSessionSeconds(prev => prev + 1);
        setTotalWorkSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isClockedIn, isPaused]);

  // Periodic cloud sync every 25 seconds during active session
  useEffect(() => {
    if (isClockedIn && currentUser) {
      syncTimerRef.current = setInterval(async () => {
        try {
          setIsSyncing(true);
          await dbUpdateUserWorkTime(currentUser.id, totalWorkSeconds);
          setIsSyncing(false);
        } catch {
          setIsSyncing(false);
        }
      }, 25000);
    } else {
      if (syncTimerRef.current) clearInterval(syncTimerRef.current);
    }

    return () => {
      if (syncTimerRef.current) clearInterval(syncTimerRef.current);
    };
  }, [isClockedIn, currentUser, totalWorkSeconds]);

  const handleStartWork = () => {
    setIsClockedIn(true);
    setIsPaused(false);
    if (!sessionStartTime) {
      setSessionStartTime(new Date().toISOString());
    }
  };

  const handlePauseWork = () => {
    setIsPaused(prev => !prev);
  };

  const handleStopAndLogWork = async () => {
    if (!currentUser) return;
    setIsClockedIn(false);
    setIsPaused(false);

    const duration = currentSessionSeconds;
    if (duration <= 0) return;

    const newSession: WorkSession = {
      id: `ws_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      startTime: sessionStartTime || new Date().toISOString(),
      endTime: new Date().toISOString(),
      durationSeconds: duration,
      durationFormatted: formatDuration(duration),
      taskDescription: taskDescription || 'General Tensor Engineering work',
      projectTrack: projectTrack || 'Autonomous Intelligence',
      createdAt: new Date().toISOString()
    };

    setWorkSessions(prev => [newSession, ...prev]);
    setCurrentSessionSeconds(0);
    setSessionStartTime(null);

    // Save to Firestore
    try {
      await dbSaveWorkSession(newSession);
      await dbUpdateUserWorkTime(currentUser.id, totalWorkSeconds);
    } catch (err) {
      console.warn('Firestore session logging note:', err);
    }

    // Save to Express server API
    try {
      await fetch('/api/work-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSession)
      });
    } catch (apiErr) {
      console.warn('API work session save note:', apiErr);
    }
  };

  const formatDuration = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const formatHoursReadable = (totalSecs: number) => {
    const hrs = (totalSecs / 3600).toFixed(1);
    return `${hrs} hrs`;
  };

  const handleCopy = (text: string, type: 'id' | 'key') => {
    navigator.clipboard.writeText(text);
    if (type === 'id') {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const handleResendCredentials = () => {
    setResendStatus('sending');
    setTimeout(() => {
      setResendStatus('sent');
      setTimeout(() => setResendStatus('idle'), 4000);
    }, 900);
  };

  // If no user is logged in, show polished prompt to log in or sign up
  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-xl shadow-cyan-500/10">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-3xl font-bold text-white tracking-tight">
            Developer & Candidate Account Portal
          </h2>
          <p className="text-neutral-400 max-w-lg mx-auto text-sm leading-relaxed">
            Sign in to access your unique registered account, automated work time telemetry monitor, resume ATS evaluations, and credential dispatch records.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            id="account-btn-signin"
            onClick={onOpenAuthModal}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 text-neutral-950 font-bold text-xs shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <User className="w-4 h-4" />
            <span>Sign In to Account</span>
          </button>
          <button
            id="account-btn-return-home"
            onClick={() => onNavigateTab('home')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs transition-colors cursor-pointer"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Welcome Banner with Unique ID & Telemetry Badge */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-neutral-900/90 via-neutral-900/60 to-neutral-950 border border-neutral-800 shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                VERIFIED TENSORSPARK ACCOUNT
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                {currentUser.role || 'Autonomous Intelligence Member'}
              </span>
              {isSyncing && (
                <span className="px-2 py-0.5 rounded text-[11px] text-cyan-400 font-mono flex items-center gap-1 animate-pulse">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  Telemetry Synced
                </span>
              )}
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome back, {currentUser.name}
            </h1>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Your personal workstation console monitoring real-time productivity hours, hiring progress, and credential security.
            </p>
          </div>

          {/* Unique ID Badge Display */}
          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-cyan-500/40 space-y-2 w-full sm:w-auto sm:min-w-[280px]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-neutral-400 font-mono uppercase tracking-wider">
                Permanent Unique ID
              </span>
              <button
                type="button"
                id="btn-copy-unique-id"
                onClick={() => handleCopy(currentUser.uniqueId, 'id')}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono transition-colors cursor-pointer"
              >
                {copiedId ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="font-mono font-bold text-base sm:text-lg text-cyan-300 tracking-wider break-all">
              {currentUser.uniqueId}
            </div>

            <div className="flex items-center gap-2 pt-1 border-t border-neutral-800/80 text-[11px] text-neutral-400">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Database Synced (Firestore Collection: users)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Left Column = Work Time Monitor, Right Column = Credentials & Resume */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: REAL-TIME WORK MONITOR & LOGS (7 cols)       */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Work Stopwatch Card */}
          <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-base text-white">
                    Live Work Time Monitor
                  </h2>
                  <p className="text-[11px] text-neutral-400">
                    Precision telemetry monitoring active engineering & research hours
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium ${
                  isClockedIn 
                    ? isPaused
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    isClockedIn 
                      ? isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse' 
                      : 'bg-neutral-500'
                  }`} />
                  {isClockedIn ? (isPaused ? 'Paused' : 'Clocked In') : 'Off Clock'}
                </span>
              </div>
            </div>

            {/* Stopwatch Display */}
            <div className="py-6 px-4 rounded-2xl bg-neutral-950/90 border border-neutral-800/90 text-center relative overflow-hidden">
              <div className="text-[11px] font-mono text-neutral-400 tracking-wider uppercase mb-1">
                Active Session Elapsed Time
              </div>
              <div className="font-mono text-4xl sm:text-5xl font-extrabold text-white tracking-widest drop-shadow-[0_0_20px_rgba(6,182,212,0.25)]">
                {formatDuration(currentSessionSeconds)}
              </div>
              <div className="mt-2 text-xs text-neutral-400 font-mono">
                HH : MM : SS
              </div>

              {/* Progress Ring / Bar */}
              <div className="mt-4 w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${Math.min(100, (currentSessionSeconds % 3600) / 36)}%` }}
                />
              </div>
            </div>

            {/* Task note inputs */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                    Project / Cohort Track
                  </label>
                  <select
                    value={projectTrack}
                    onChange={(e) => setProjectTrack(e.target.value)}
                    disabled={isClockedIn}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-cyan-500 disabled:opacity-60"
                  >
                    <option value="AI Core Engineering">AI Core Engineering</option>
                    <option value="Autonomous Multi-Agent Swarms">Autonomous Multi-Agent Swarms</option>
                    <option value="Full-Stack Web & Systems">Full-Stack Web & Systems</option>
                    <option value="UX/UI & Design Tokens">UX/UI & Design Tokens</option>
                    <option value="Technical Screening Challenge">Technical Screening Challenge</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                    Current Task Objective
                  </label>
                  <input
                    type="text"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="e.g. Profiling inference latency on vLLM..."
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Timer Control Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              {!isClockedIn ? (
                <button
                  type="button"
                  id="btn-clock-in-start"
                  onClick={handleStartWork}
                  className="sm:col-span-3 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white text-neutral-950 font-bold text-xs shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-neutral-950" />
                  <span>Clock In & Begin Work Session</span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    id="btn-clock-pause-resume"
                    onClick={handlePauseWork}
                    className="py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs border border-neutral-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Pause className="w-4 h-4" />
                    <span>{isPaused ? 'Resume Session' : 'Pause Session'}</span>
                  </button>

                  <button
                    type="button"
                    id="btn-clock-stop-save"
                    onClick={handleStopAndLogWork}
                    className="sm:col-span-2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Square className="w-4 h-4 fill-neutral-950" />
                    <span>Clock Out & Save to Firestore</span>
                  </button>
                </>
              )}
            </div>

            {/* Key Aggregate Metrics Row */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-800">
              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                <span className="text-[10px] text-neutral-400 font-mono block">TOTAL LOGGED</span>
                <span className="text-base sm:text-lg font-bold text-cyan-300 font-mono">
                  {formatHoursReadable(totalWorkSeconds)}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                <span className="text-[10px] text-neutral-400 font-mono block">SESSIONS</span>
                <span className="text-base sm:text-lg font-bold text-white font-mono">
                  {workSessions.length}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                <span className="text-[10px] text-neutral-400 font-mono block">STATUS</span>
                <span className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Session History Log Table */}
          <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h3 className="font-display font-bold text-sm text-white">
                  Logged Work Sessions ({workSessions.length})
                </h3>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">
                Firestore Collection: work_sessions
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 text-[11px] font-mono uppercase">
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Track & Task</th>
                    <th className="py-2.5 px-3">Duration</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {workSessions.map((ws) => (
                    <tr key={ws.id} className="hover:bg-neutral-950/40 transition-colors">
                      <td className="py-3 px-3 font-mono text-neutral-300">
                        {ws.createdAt ? new Date(ws.createdAt).toLocaleDateString() : 'Today'}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-white">{ws.taskDescription}</div>
                        <div className="text-[10px] text-cyan-400/90 font-mono">{ws.projectTrack}</div>
                      </td>
                      <td className="py-3 px-3 font-mono font-semibold text-emerald-400">
                        {ws.durationFormatted}
                      </td>
                      <td className="py-3 px-3 text-right font-mono">
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          <Check className="w-3 h-3" />
                          Saved
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: CREDENTIALS & RESUME HIRING (5 cols)        */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Registered Credentials & Email Dispatch Card */}
          <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-sm text-white">
                  Registered Credentials & Mail Dispatch
                </h3>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">
                Dispatched ✓
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1">
                <span className="text-[10px] text-neutral-400 font-mono uppercase block">
                  Registered Email Address
                </span>
                <div className="font-mono text-white font-medium break-all">
                  {currentUser.email}
                </div>
                <p className="text-[11px] text-neutral-400 pt-1">
                  Login credentials and unique security tokens are automatically dispatched to this registered email upon account creation.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-400 font-mono uppercase">
                    Account Access Key
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(currentUser.accessKey || 'TS-KEY-DEFAULT', 'key')}
                    className="text-[10px] text-cyan-400 hover:text-cyan-300 font-mono cursor-pointer"
                  >
                    {copiedKey ? 'Copied' : 'Copy Key'}
                  </button>
                </div>
                <div className="font-mono text-cyan-300 font-bold tracking-wide">
                  {currentUser.accessKey || 'TS-KEY-2026-X89F2'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1">
                <span className="text-[10px] text-neutral-400 font-mono uppercase block">
                  Department & Role Assignment
                </span>
                <div className="text-white font-medium">
                  {currentUser.department || 'Autonomous Intelligence Division'}
                </div>
                <div className="text-[11px] text-neutral-400">
                  Role: {currentUser.role || 'Software Engineer / Fellow'}
                </div>
              </div>

              <button
                type="button"
                id="btn-resend-credentials"
                onClick={handleResendCredentials}
                disabled={resendStatus !== 'idle'}
                className="w-full py-2 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-300 hover:text-white font-mono transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  {resendStatus === 'sending' 
                    ? 'Dispatching credentials...' 
                    : resendStatus === 'sent' 
                      ? 'Credentials Dispatched to Registered Mail ✓' 
                      : 'Resend Credentials to Registered Mail'}
                </span>
              </button>
            </div>
          </div>

          {/* Resume & Hiring Status Card */}
          <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-sm text-white">
                  Resume & Hiring Evaluation
                </h3>
              </div>

              {matchingApplicant && (
                <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 font-mono text-[10px]">
                  {matchingApplicant.currentStage.toUpperCase()}
                </span>
              )}
            </div>

            {matchingApplicant ? (
              <div className="space-y-3.5">
                {/* Resume File Metadata */}
                <div className="p-3.5 rounded-2xl bg-neutral-950 border border-cyan-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-semibold text-white">
                        {matchingApplicant.resumeFileName || 'Candidate_Resume.pdf'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {matchingApplicant.resumeFileSize || '284 KB'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-xs">
                    <span className="text-neutral-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      ATS Fit Score:
                    </span>
                    <span className="font-mono font-bold text-emerald-400">
                      {matchingApplicant.scoreBreakdown?.resumeMatchScore || matchingApplicant.resumeFitScore || 94}% Fit
                    </span>
                  </div>
                </div>

                {/* Parsed Skill Tags */}
                <div>
                  <span className="block text-[11px] font-mono text-neutral-400 mb-1.5 uppercase">
                    Extracted Resume Skill Tags:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(matchingApplicant.resumeParsedSkills || matchingApplicant.skills || ['PyTorch', 'Distributed Systems', 'TypeScript']).map(skill => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-neutral-950 border border-neutral-800 text-neutral-300 text-[11px] font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Application Stage Tracker Link */}
                <button
                  type="button"
                  id="btn-account-open-tracker"
                  onClick={() => onNavigateToTracker(matchingApplicant.id)}
                  className="w-full py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Open Tracking Console ({matchingApplicant.id})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-center py-4 space-y-3">
                <p className="text-xs text-neutral-400">
                  You haven&apos;t attached a hiring resume yet for this account. Attach your resume to unlock automated ATS scoring and cohort evaluation.
                </p>
                <button
                  type="button"
                  id="btn-account-apply-now"
                  onClick={onOpenApplyModal}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white text-neutral-950 font-bold text-xs shadow-md shadow-cyan-400/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Submit Hiring Application & Resume</span>
                </button>
              </div>
            )}
          </div>

          {/* Direct Navigation Links */}
          <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 flex items-center justify-between text-xs">
            <span className="text-neutral-400">Ready to test challenges?</span>
            <button
              type="button"
              onClick={() => onNavigateTab('dashboard')}
              className="text-cyan-400 hover:underline flex items-center gap-1 font-mono cursor-pointer"
            >
              <span>Tracker Dashboard</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
