import type { Metadata } from 'next';
import { AccountPageView } from '@/src/components/pages/PageViews';

export const metadata: Metadata = { title: 'My Account | Tensorspark', description: 'Your Tensorspark profile, work sessions and applications.' };

export default function Page() {
  return <AccountPageView />;
}
