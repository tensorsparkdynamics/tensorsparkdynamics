import type { Metadata } from 'next';
import { DashboardPageView } from '@/src/components/pages/PageViews';

export const metadata: Metadata = { title: 'Applicant Tracker | Tensorspark', description: 'Track applications, weekly reports and technical assignments.' };

export default function Page() {
  return <DashboardPageView />;
}
