import type { Metadata } from 'next';
import { AnalyticsPageView } from '@/src/components/pages/PageViews';

export const metadata: Metadata = { title: 'Analytics | Tensorspark', description: 'Marketing analytics dashboard and custom client report builder.' };

export default function Page() {
  return <AnalyticsPageView />;
}
