import type { Metadata } from 'next';
import { AboutPageView } from '@/src/components/pages/PageViews';

export const metadata: Metadata = { title: 'About | Tensorspark', description: 'Meet the Tensorspark founders, mission and engineering culture.' };

export default function Page() {
  return <AboutPageView />;
}
