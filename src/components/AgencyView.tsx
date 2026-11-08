'use client';

import React, { useState } from 'react';
import { AgencyServiceId } from '../types';
import { AGENCY_SERVICES_DETAILS } from '../data/agencyServicesData';
import { AGENCY_CASE_STUDIES } from '../data/mockData';
import { AgencyServicePage } from './agency/AgencyServicePage';
import { 
  Megaphone, 
  Sparkles, 
  TrendingUp, 
  Target, 
  Zap, 
  BarChart3, 
  Sliders, 
  ArrowRight, 
  CheckCircle2, 
  DollarSign, 
  Users, 
  Send,
  Building2,
  Award,
  Code2,
  Layout,
  Palette,
  Video,
  Cpu,
  Bot,
  Image as ImageIcon,
  ChevronRight
} from 'lucide-react';

const PRIMARY_AGENCY_SERVICES: AgencyServiceId[] = [
  'web-development',
  'ux-ui-design',
  'graphic-design',
  'ai-integration',
  'ai-agents',
  'photoshop',
  'digital-marketing'
];

interface AgencyViewProps {
  onNavigateToAnalytics: () => void;
  selectedService?: AgencyServiceId | 'overview';
  onSelectService: (service: AgencyServiceId | 'overview') => void;
}

export const AgencyView: React.FC<AgencyViewProps> = ({ 
  onNavigateToAnalytics,
  selectedService = 'overview',
  onSelectService
}) => {
  // Interactive ROI Calculator State
  const [monthlyBudget, setMonthlyBudget] = useState<number>(10000);
  const [industry, setIndustry] = useState<'ai_saas' | 'd2c' | 'fintech' | 'deep_tech'>('ai_saas');

  // Contact / Audit State
  const [brandName, setBrandName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [email, setEmail] = useState('');
  const [auditSubmitted, setAuditSubmitted] = useState(false);

  // Dynamic calculations based on industry & budget
  const getMultiplier = () => {
    switch (industry) {
      case 'ai_saas': return { roas: 5.4, cpl: 24, conversionRate: 4.8 };
      case 'd2c': return { roas: 4.2, cpl: 12, conversionRate: 3.5 };
      case 'fintech': return { roas: 6.1, cpl: 38, conversionRate: 5.2 };
      case 'deep_tech': return { roas: 4.9, cpl: 45, conversionRate: 6.0 };
      default: return { roas: 5.0, cpl: 25, conversionRate: 4.0 };
    }
  };

  const metrics = getMultiplier();
  const projectedRevenue = Math.round(monthlyBudget * metrics.roas);
  const projectedLeads = Math.round(monthlyBudget / metrics.cpl);
  const projectedImpressions = Math.round((monthlyBudget / 12) * 1000);

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName || !email) return;
    setAuditSubmitted(true);
  };

  const getServiceIcon = (id: AgencyServiceId) => {
    switch (id) {
      case 'web-development': return Code2;
      case 'ux-ui-design': return Layout;
      case 'graphic-design': return Palette;
      case 'video-editing': return Palette;
      case 'ai-integration': return Cpu;
      case 'ai-agents': return Bot;
      case 'photoshop': return ImageIcon;
      case 'digital-marketing': return Megaphone;
      default: return Sparkles;
    }
  };

  // If a specific sub-service page is selected, render the dedicated service page
  if (selectedService && selectedService !== 'overview') {
    return (
      <AgencyServicePage
        serviceId={selectedService}
        onSelectService={onSelectService}
        onNavigateToAnalytics={onNavigateToAnalytics}
      />
    );
  }

  // Overview Page
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-in fade-in duration-200">
      {/* Nested Sub-navigation pill bar */}
      <div className="bg-neutral-900/90 border border-neutral-800 p-2 rounded-2xl backdrop-blur-xl flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          <button
            onClick={() => onSelectService('overview')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              selectedService === 'overview'
                ? 'bg-cyan-400 text-neutral-950 shadow-md shadow-cyan-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Growth Hub Overview</span>
          </button>

          {PRIMARY_AGENCY_SERVICES.map((sid) => {
            const Icon = getServiceIcon(sid);
            const item = AGENCY_SERVICES_DETAILS[sid];
            return (
              <button
                key={sid}
                onClick={() => {
                  onSelectService(sid);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Icon className="w-3.5 h-3.5 text-cyan-400/80" />
                <span>{item.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
          <Megaphone className="w-3.5 h-3.5" />
          <span>TENSORSPARK GROWTH LABS • FULL-SPECTRUM AGENCY</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          High-Velocity Engineering, Design & Growth Agency
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          From full-stack web development and UX/UI design to graphic designing & brand visual identity, enterprise AI integration, autonomous agents, Photoshop retouching, and omnichannel brand promotion.
        </p>
      </div>

      {/* 7 Dedicated Nested Services Showcase Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
              Nested Agency Specializations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              7 Dedicated Agency Practices & Pages
            </h2>
          </div>
          <span className="text-xs text-neutral-400 font-mono">
            Click any service to view its dedicated page, interactive demo & packages
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRIMARY_AGENCY_SERVICES.map((sid) => {
            const svc = AGENCY_SERVICES_DETAILS[sid];
            const Icon = getServiceIcon(sid);

            return (
              <div
                key={sid}
                onClick={() => {
                  onSelectService(sid);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-cyan-500/50 hover:bg-neutral-900 transition-all cursor-pointer flex flex-col justify-between space-y-5 shadow-lg relative overflow-hidden"
              >
                {/* Subtle top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent group-hover:via-cyan-400 transition-all" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700/60">
                      {svc.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                      {svc.shortTitle}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed line-clamp-2">
                      {svc.subtitle}
                    </p>
                  </div>

                  {/* Highlight Metric */}
                  <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-850 flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-400 text-[11px]">{svc.highlightLabel}:</span>
                    <span className="text-cyan-400 font-bold">{svc.highlightMetric}</span>
                  </div>

                  {/* Core Deliverable bullets */}
                  <div className="space-y-1.5 text-xs text-neutral-300 pt-1">
                    {svc.coreCapabilities.slice(0, 2).map((c, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="line-clamp-1">{c.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-850 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                  <span>Explore {svc.shortTitle} Page</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Growth & ROI Calculator */}
      <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/90 border border-neutral-800 backdrop-blur-md relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-neutral-800">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
              Interactive Forecast Tool
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Brand Growth & ROI Estimator
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Estimate your customer acquisition pipeline based on our historical client benchmarks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToAnalytics}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Open Full Analytics Studio</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-neutral-300">
                  Target Monthly Paid Media Budget:
                </label>
                <span className="text-base font-mono font-bold text-cyan-400">
                  ${monthlyBudget.toLocaleString()} / mo
                </span>
              </div>
              <input
                id="slider-marketing-budget"
                type="range"
                min={2000}
                max={50000}
                step={1000}
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1">
                <span>$2,000 (Seed Launch)</span>
                <span>$25,000</span>
                <span>$50,000 (Scale)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-2">
                Brand Vertical / Category:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'ai_saas', label: 'AI & B2B SaaS' },
                  { id: 'd2c', label: 'D2C Consumer Tech' },
                  { id: 'fintech', label: 'FinTech & Web3' },
                  { id: 'deep_tech', label: 'DeepTech / Hardware' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIndustry(item.id as any)}
                    className={`p-3 rounded-xl text-xs font-medium border text-left transition-all ${
                      industry === item.id
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Forecast Output Projection Card (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-6">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block">
              90-DAY FORECAST PROJECTION
            </span>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-850">
                <span className="text-[11px] text-neutral-400 block mb-1">Projected Attributed Pipeline</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-display">
                  ${projectedRevenue.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono block mt-1">
                  Estimated {metrics.roas}x ROAS
                </span>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-850">
                <span className="text-[11px] text-neutral-400 block mb-1">Qualified Demos / Leads</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {projectedLeads.toLocaleString()}
                </span>
                <span className="text-[10px] text-neutral-500 font-mono block mt-1">
                  Target CAC ~${metrics.cpl}
                </span>
              </div>
            </div>

            <div className="p-3 bg-neutral-900/40 rounded-xl border border-neutral-850 text-xs text-neutral-400 flex items-center justify-between">
              <span>Estimated Monthly Reach:</span>
              <span className="font-mono text-neutral-200 font-semibold">
                {projectedImpressions.toLocaleString()}+ Impressions
              </span>
            </div>

            <div className="pt-2 text-[11px] text-neutral-500 italic">
              *Projections modeled using historical campaign performance across 140+ new brand rollouts.
            </div>
          </div>
        </div>
      </div>

      {/* Case Studies */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
            Proven Track Record
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Recent Client Case Studies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AGENCY_CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <h3 className="font-bold text-lg text-white font-display">
                  {cs.clientName}
                </h3>
                <span className="text-xs text-neutral-400 font-mono">{cs.industry}</span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-neutral-500 font-mono block">CHALLENGE:</span>
                  <p className="text-neutral-300">{cs.challenge}</p>
                </div>
                <div>
                  <span className="text-cyan-400 font-mono block mt-2">OUR SOLUTION:</span>
                  <p className="text-neutral-300">{cs.solution}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 bg-neutral-950 rounded-xl border border-neutral-850 text-center">
                {cs.resultMetrics.map((rm, idx) => (
                  <div key={idx}>
                    <span className="text-[10px] text-neutral-500 block">{rm.label}</span>
                    <span className="text-sm font-bold text-white font-display">{rm.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Free Growth Audit Inquiry Form */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-neutral-900/90 to-neutral-950 border border-neutral-800 max-w-3xl mx-auto text-center space-y-6">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
          <Sparkles className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Request a Free Brand Growth & Engineering Audit
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-lg mx-auto">
            Our agency leads will analyze your digital stack, design assets, and marketing channels to deliver a custom 90-day growth roadmap.
          </p>
        </div>

        {auditSubmitted ? (
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-300 text-sm space-y-2">
            <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400" />
            <h4 className="font-bold text-white">Audit Request Received!</h4>
            <p className="text-xs text-neutral-300">
              We will review {brandName} and email our complete competitive breakdown and custom report to {email} within 24 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleAuditSubmit} className="space-y-4 max-w-md mx-auto text-left">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Brand / Startup Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Acme AI"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Current Website / Pitch Deck Link</label>
              <input
                type="url"
                placeholder="https://acme.ai"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Work Email Address *</label>
              <input
                type="email"
                required
                placeholder="founder@acme.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              id="btn-submit-agency-audit"
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg shadow-cyan-500/20"
            >
              <Send className="w-4 h-4" />
              <span>Get Free 90-Day Growth Blueprint</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
