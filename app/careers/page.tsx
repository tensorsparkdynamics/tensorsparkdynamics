import type { Metadata } from 'next';
import { CareersPageView } from '@/src/components/pages/PageViews';

export const metadata: Metadata = { title: 'Careers | Tensorspark', description: 'Full-time openings, 3-month fellowships and 15-day internship certificates.' };

export default function Page() {
  return <CareersPageView option="openings" />;
}
