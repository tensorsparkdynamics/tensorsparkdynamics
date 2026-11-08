'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { TabView, Applicant, WeeklyReport, AgencyServiceId, CareerOption, AuthUser, AuthModalMode } from '../types';
import { INITIAL_APPLICANTS } from '../data/mockData';
import { MotionBackground } from './MotionBackground';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ApplicationModal } from './ApplicationModal';
import { AuthModal } from './AuthModal';
import { WaitlistModal } from './WaitlistModal';
import {
  dbSaveApplicant,
  dbGetApplicants,
  dbUpdateApplicantStage,
  dbSaveWeeklyReport,
  testConnection,
} from '../lib/firebase';
import { pathForTab, pathForAgency, pathForCareer, tabFromPath, agencyFromPath, careerFromPath } from '../lib/routes';

interface AppContextValue {
  applicants: Applicant[];
  activeApplicantId: string | null;
  setActiveApplicantId: (id: string | null) => void;
  currentUser: AuthUser | null;
  openApplyModal: (roleId?: string) => void;
  openAuthModal: (mode?: AuthModalMode) => void;
  openWaitlistModal: () => void;
  navigateTab: (tab: TabView) => void;
  navigateAgency: (service: AgencyServiceId | 'overview') => void;
  navigateCareer: (option: CareerOption) => void;
  navigateToTracker: (applicantId?: string) => void;
  submitReport: (applicantId: string, report: WeeklyReport) => Promise<void>;
  submitTechnicalAssignment: (applicantId: string, repoUrl: string) => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppShell>');
  return ctx;
}

const USER_KEY = 'tensorspark_current_user';
const APPLICANTS_KEY = 'tensorspark_applicants_v1';

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const currentTab = tabFromPath(pathname);
  const selectedAgencyService = agencyFromPath(pathname);
  const selectedCareerOption = careerFromPath(pathname);

  // Server render and first client render use identical defaults (no hydration mismatch);
  // persisted browser state is restored right after mount.
  const [hydrated, setHydrated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>(INITIAL_APPLICANTS);
  const [activeApplicantId, setActiveApplicantId] = useState<string | null>(INITIAL_APPLICANTS[0].id);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>('login');
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [defaultModalRoleId, setDefaultModalRoleId] = useState<string | undefined>(undefined);

  // Restore persisted state + remote sync (browser only)
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(USER_KEY);
      if (savedUser) setCurrentUser(JSON.parse(savedUser));
    } catch {}
    try {
      const savedApplicants = localStorage.getItem(APPLICANTS_KEY);
      if (savedApplicants) setApplicants(JSON.parse(savedApplicants));
    } catch (e) {
      console.error('Failed reading applicants from storage', e);
    }
    setHydrated(true);

    testConnection().catch(() => {});
    (async () => {
      try {
        const remote = await dbGetApplicants();
        if (remote && remote.length > 0) {
          setApplicants((prev) => {
            const ids = new Set(prev.map((a) => a.id));
            return [...remote.filter((a) => !ids.has(a.id)), ...prev];
          });
        }
      } catch (err) {
        console.warn('Initial remote applicant sync note:', err);
      }
    })();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(APPLICANTS_KEY, JSON.stringify(applicants));
    } catch (e) {
      console.error('Failed writing applicants to storage', e);
    }
  }, [applicants, hydrated]);

  const navigateTab = useCallback((tab: TabView) => router.push(pathForTab(tab)), [router]);
  const navigateAgency = useCallback((s: AgencyServiceId | 'overview') => router.push(pathForAgency(s)), [router]);
  const navigateCareer = useCallback((o: CareerOption) => router.push(pathForCareer(o)), [router]);

  const openApplyModal = useCallback((roleId?: string) => {
    setDefaultModalRoleId(roleId);
    setIsApplyModalOpen(true);
  }, []);

  const openAuthModal = useCallback((mode: AuthModalMode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  }, []);

  const openWaitlistModal = useCallback(() => setIsWaitlistModalOpen(true), []);

  const navigateToTracker = useCallback(
    (applicantId?: string) => {
      if (applicantId) setActiveApplicantId(applicantId);
      router.push('/dashboard');
    },
    [router]
  );

  const handleAddApplicant = async (newApplicant: Applicant) => {
    setApplicants((prev) => [newApplicant, ...prev]);
    setActiveApplicantId(newApplicant.id);
    try {
      await dbSaveApplicant(newApplicant);
    } catch (err) {
      console.warn('Firestore applicant save fallback:', err);
    }
    try {
      await fetch('/api/applicants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApplicant),
      });
    } catch (err) {
      console.warn('Backend API applicant post fallback:', err);
    }
  };

  const submitReport = useCallback(async (applicantId: string, report: WeeklyReport) => {
    setApplicants((prev) =>
      prev.map((app) =>
        app.id === applicantId ? { ...app, weeklyReports: [report, ...(app.weeklyReports || [])] } : app
      )
    );
    try {
      await dbSaveWeeklyReport(report);
    } catch (err) {
      console.warn('Firestore weekly report save error:', err);
    }
    try {
      await fetch('/api/tracker/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report),
      });
    } catch (err) {
      console.warn('Backend API weekly report post error:', err);
    }
  }, []);

  const submitTechnicalAssignment = useCallback(async (applicantId: string, repoUrl: string) => {
    setApplicants((prev) =>
      prev.map((app) =>
        app.id === applicantId
          ? {
              ...app,
              currentStage: 'interview',
              scoreBreakdown: { ...app.scoreBreakdown, technicalScore: 93 },
              technicalSubmission: {
                repoUrl,
                submittedAt: new Date().toISOString().split('T')[0],
                score: 93,
                feedback: 'Asynchronous streaming architecture and unit test coverage validated successfully.',
              },
              reviewerNotes:
                'Technical challenge submitted. High marks for test coverage and modularity. Advanced to Final Round Technical Interview.',
            }
          : app
      )
    );
    try {
      await dbUpdateApplicantStage(applicantId, 'interview');
    } catch (err) {
      console.warn('Firestore stage update error:', err);
    }
    try {
      await fetch(`/api/applicants/${applicantId}/stage`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: 'interview' }),
      });
    } catch (err) {
      console.warn('API stage update error:', err);
    }
  }, []);

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(USER_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const value = useMemo<AppContextValue>(
    () => ({
      applicants,
      activeApplicantId,
      setActiveApplicantId,
      currentUser,
      openApplyModal,
      openAuthModal,
      openWaitlistModal,
      navigateTab,
      navigateAgency,
      navigateCareer,
      navigateToTracker,
      submitReport,
      submitTechnicalAssignment,
    }),
    [
      applicants, activeApplicantId, currentUser, openApplyModal, openAuthModal, openWaitlistModal,
      navigateTab, navigateAgency, navigateCareer, navigateToTracker, submitReport, submitTechnicalAssignment,
    ]
  );

  return (
    <AppContext.Provider value={value}>
      <div className="w-full min-h-screen bg-[#08090e] text-neutral-100 flex flex-col relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
        <MotionBackground currentTab={currentTab} isHome={currentTab === 'home'} />

        <Navbar
          currentTab={currentTab}
          onSelectTab={navigateTab}
          onOpenApplyModal={() => openApplyModal()}
          selectedAgencyService={selectedAgencyService}
          onSelectAgencyService={navigateAgency}
          selectedCareerOption={selectedCareerOption}
          onSelectCareerOption={navigateCareer}
          onOpenWaitlistModal={openWaitlistModal}
          onOpenAuthModal={openAuthModal}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        <main className="flex-1 relative z-10">{children}</main>

        <ApplicationModal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          selectedRoleDefault={defaultModalRoleId}
          onSubmitApplication={handleAddApplicant}
          onNavigateToTracker={navigateToTracker}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          initialMode={authModalMode}
          onAuthSuccess={handleLoginSuccess}
          onOpenWaitlist={() => {
            setIsAuthModalOpen(false);
            setIsWaitlistModalOpen(true);
          }}
        />

        <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />

        <Footer
          onSelectTab={navigateTab}
          onOpenApply={() => openApplyModal()}
          onSelectAgencyService={navigateAgency}
          onSelectCareerOption={navigateCareer}
          onOpenWaitlist={openWaitlistModal}
          onOpenAuth={openAuthModal}
        />
      </div>
    </AppContext.Provider>
  );
}
