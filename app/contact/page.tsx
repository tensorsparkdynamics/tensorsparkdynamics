import type { Metadata } from 'next';
import { ContactPageView } from '@/src/components/pages/PageViews';

export const metadata: Metadata = { title: 'Contact | Tensorspark', description: 'Get in touch with the Tensorspark team in Bengaluru.' };

export default function Page() {
  return <ContactPageView />;
}
