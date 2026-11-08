import type { Metadata } from 'next';
import { AgencyPageView } from '@/src/components/pages/PageViews';

export const metadata: Metadata = { title: 'Growth Agency | Tensorspark', description: 'Web development, design, AI integration and digital marketing services.' };

export default function Page() {
  return <AgencyPageView service="overview" />;
}
