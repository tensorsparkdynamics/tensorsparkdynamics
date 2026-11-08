'use client';

// Thin route-level adapters: each Next.js page renders one of these, which wires the
// existing view components to the shared app state (useApp) and to URL navigation.
import React from 'react';
import { useApp } from '../AppShell';
import { HomeView } from '../HomeView';
import { AboutView } from '../AboutView';
import { ProductsView } from '../ProductsView';
import { CareersView } from '../CareersView';
import { TrackerDashboardView } from '../TrackerDashboardView';
import { AgencyView } from '../AgencyView';
import { AnalyticsView } from '../AnalyticsView';
import { ContactView } from '../ContactView';
import { AccountView } from '../AccountView';
import type { AgencyServiceId, CareerOption } from '../../types';

export function HomePageView() {
  const a = useApp();
  return (
    <HomeView
      onNavigate={a.navigateTab}
      onOpenApply={a.openApplyModal}
      onSelectAgencyService={a.navigateAgency}
      onOpenWaitlist={a.openWaitlistModal}
    />
  );
}

export function AboutPageView() {
  const a = useApp();
  return (
    <AboutView
      onNavigateTab={a.navigateTab}
      onSelectCareerOption={a.navigateCareer}
      onOpenApply={() => a.openApplyModal()}
    />
  );
}

export function ProductsPageView() {
  const a = useApp();
  return <ProductsView onOpenApply={() => a.openApplyModal()} />;
}

export function CareersPageView({ option }: { option: CareerOption }) {
  const a = useApp();
  return (
    <CareersView
      selectedOption={option}
      onSelectOption={a.navigateCareer}
      onOpenApplyModal={a.openApplyModal}
      onNavigateToDashboard={() => a.navigateTab('dashboard')}
    />
  );
}

export function DashboardPageView() {
  const a = useApp();
  return (
    <TrackerDashboardView
      applicants={a.applicants}
      activeApplicantId={a.activeApplicantId}
      onSelectApplicant={(id) => a.setActiveApplicantId(id)}
      onSubmitReport={a.submitReport}
      onSubmitTechnicalAssignment={a.submitTechnicalAssignment}
      onOpenApplyModal={() => a.openApplyModal()}
    />
  );
}

export function AgencyPageView({ service }: { service: AgencyServiceId | 'overview' }) {
  const a = useApp();
  return (
    <AgencyView
      onNavigateToAnalytics={() => a.navigateTab('analytics')}
      selectedService={service}
      onSelectService={a.navigateAgency}
    />
  );
}

export function AnalyticsPageView() {
  return <AnalyticsView />;
}

export function ContactPageView() {
  const a = useApp();
  return <ContactView onNavigate={a.navigateTab} onOpenWaitlist={a.openWaitlistModal} />;
}

export function AccountPageView() {
  const a = useApp();
  return (
    <AccountView
      currentUser={a.currentUser}
      onOpenAuthModal={() => a.openAuthModal('login')}
      onOpenApplyModal={() => a.openApplyModal()}
      onNavigateToTracker={a.navigateToTracker}
      onNavigateTab={a.navigateTab}
      applicants={a.applicants}
    />
  );
}
