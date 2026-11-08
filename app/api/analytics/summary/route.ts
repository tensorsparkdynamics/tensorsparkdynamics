import { NextResponse } from 'next/server';
import { apiStore } from '@/src/lib/apiStore';

export async function GET() {
  return NextResponse.json({
    totalWaitlistCount: apiStore.waitlist.length,
    activeApplicantsCount: apiStore.applicants.length,
    activeProjectsCount: 18,
    averageReviewScore: 92.4,
    systemHealth: '100.0% Nominal',
    avgLatencyMs: 4.2,
    lastSyncedAt: new Date().toISOString(),
  });
}
