import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CareersPageView } from '@/src/components/pages/PageViews';
import { CAREER_OPTIONS } from '@/src/lib/routes';
import type { CareerOption } from '@/src/types';

const TITLES: Record<string, string> = {
  'three-month': '3-Month Engineering Fellowship',
  'fifteen-day': '15-Day Internship Certificate',
};

export function generateStaticParams() {
  return CAREER_OPTIONS.filter((o) => o !== 'openings').map((option) => ({ option }));
}

export async function generateMetadata({ params }: { params: Promise<{ option: string }> }): Promise<Metadata> {
  const { option } = await params;
  return { title: `${TITLES[option] ?? 'Careers'} | Tensorspark` };
}

export default async function Page({ params }: { params: Promise<{ option: string }> }) {
  const { option } = await params;
  if (!CAREER_OPTIONS.includes(option as CareerOption) || option === 'openings') notFound();
  return <CareersPageView option={option as CareerOption} />;
}
