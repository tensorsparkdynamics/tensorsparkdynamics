import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AgencyPageView } from '@/src/components/pages/PageViews';
import { AGENCY_SERVICE_IDS } from '@/src/lib/routes';
import type { AgencyServiceId } from '@/src/types';

export function generateStaticParams() {
  return AGENCY_SERVICE_IDS.map((service) => ({ service }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  const label = service.split('-').map((w) => (w === 'ai' || w === 'ux' || w === 'ui' ? w.toUpperCase() : w[0]?.toUpperCase() + w.slice(1))).join(' ');
  return { title: `${label} | Tensorspark Agency` };
}

export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  if (!AGENCY_SERVICE_IDS.includes(service as AgencyServiceId)) notFound();
  return <AgencyPageView service={service as AgencyServiceId} />;
}
