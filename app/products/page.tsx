import type { Metadata } from 'next';
import { ProductsPageView } from '@/src/components/pages/PageViews';

export const metadata: Metadata = { title: 'AI Products | Tensorspark', description: 'Enterprise AI products with live demos, code samples and early-access waitlist.' };

export default function Page() {
  return <ProductsPageView />;
}
