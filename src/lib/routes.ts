import type { TabView, AgencyServiceId, CareerOption } from '../types';

export const AGENCY_SERVICE_IDS: AgencyServiceId[] = [
  'web-development',
  'ux-ui-design',
  'graphic-design',
  'video-editing',
  'ai-integration',
  'ai-agents',
  'photoshop',
  'digital-marketing',
];

export const CAREER_OPTIONS: CareerOption[] = ['openings', 'three-month', 'fifteen-day'];

export const TAB_PATHS: Record<TabView, string> = {
  home: '/',
  about: '/about',
  products: '/products',
  careers: '/careers',
  internships: '/careers',
  'offer-letter': '/dashboard',
  dashboard: '/dashboard',
  agency: '/agency',
  analytics: '/analytics',
  contact: '/contact',
  account: '/account',
};

export const pathForTab = (tab: TabView): string => TAB_PATHS[tab] ?? '/';

export const pathForAgency = (service: AgencyServiceId | 'overview'): string =>
  service === 'overview' ? '/agency' : `/agency/${service}`;

export const pathForCareer = (option: CareerOption): string =>
  option === 'openings' ? '/careers' : `/careers/${option}`;

export const tabFromPath = (pathname: string | null): TabView => {
  const seg = (pathname || '/').split('/').filter(Boolean)[0];
  switch (seg) {
    case 'about':
    case 'products':
    case 'careers':
    case 'dashboard':
    case 'agency':
    case 'analytics':
    case 'contact':
    case 'account':
      return seg;
    default:
      return 'home';
  }
};

export const agencyFromPath = (pathname: string | null): AgencyServiceId | 'overview' => {
  const parts = (pathname || '/').split('/').filter(Boolean);
  if (parts[0] !== 'agency') return 'overview';
  return (AGENCY_SERVICE_IDS as string[]).includes(parts[1]) ? (parts[1] as AgencyServiceId) : 'overview';
};

export const careerFromPath = (pathname: string | null): CareerOption => {
  const parts = (pathname || '/').split('/').filter(Boolean);
  if (parts[0] !== 'careers') return 'openings';
  return (CAREER_OPTIONS as string[]).includes(parts[1]) ? (parts[1] as CareerOption) : 'openings';
};
