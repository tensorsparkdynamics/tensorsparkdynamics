'use client';

import React from 'react';
import { TabView, AgencyServiceId, CareerOption } from '../types';
import { ProductMotionCarousel } from './ProductMotionCarousel';
import { 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Code2,
  Layout,
  Cpu,
  Bot,
  Image as ImageIcon,
  Megaphone,
  Palette
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: TabView) => void;
  onOpenApply: (roleId?: string) => void;
  onSelectAgencyService?: (service: AgencyServiceId | 'overview') => void;
  onSelectCareerOption?: (option: CareerOption) => void;
  onOpenWaitlist?: () => void;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  onNavigate, 
  onSelectAgencyService,
  onOpenWaitlist
}) => {
  return (
    <div className="relative z-10 space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Floating Pill */}
        <div className="inline-flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-2xl sm:rounded-full bg-neutral-900/90 border border-cyan-500/30 text-cyan-300 text-[11px] sm:text-xs font-mono mb-8 backdrop-blur-md shadow-lg shadow-cyan-950/40 max-w-full text-center animate-in fade-in slide-in-from-top-3 duration-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
          <span>AUTONOMOUS MULTI-AGENT SYSTEMS • ENTERPRISE AI PRODUCTS • GROWTH LABS</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.12] sm:leading-[1.08] font-display">
          Building the Next Wave of{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
            Enterprise AI Products
          </span>{' '}
          & Autonomous Intelligence.
        </h1>

        {/* Subtitle */}
        <p className="mt-5 sm:mt-6 text-sm sm:text-lg lg:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed font-sans">
          Tensorspark orchestrates production-grade multi-agent swarms, delivers low-latency generative models, and scales modern technology brands with automated engineering, design systems, and real-time custom telemetry.
        </p>

        {/* Primary CTA Cluster */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
          {/* Waiting List for New Products */}
          <button
            id="hero-cta-waitlist"
            onClick={onOpenWaitlist || (() => onNavigate('products'))}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-indigo-400 hover:from-cyan-300 hover:to-white text-neutral-950 font-bold text-sm shadow-xl shadow-cyan-400/25 hover:shadow-cyan-400/40 transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-neutral-950 animate-pulse" />
            <span>Waiting List for New Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Explore AI Products Sandbox */}
          <button
            id="hero-cta-explore-products"
            onClick={() => onNavigate('products')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-850 text-neutral-200 hover:text-white font-semibold text-sm border border-neutral-700/80 hover:border-cyan-500/50 backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Explore Live Products Sandbox</span>
          </button>
        </div>

        {/* Live Metrics Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm text-left">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">18ms</div>
            <div className="text-xs text-neutral-400 mt-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-cyan-400" /> p95 Model Latency
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm text-left">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">4.8M</div>
            <div className="text-xs text-neutral-400 mt-1 flex items-center gap-1">
              <Layers className="w-3 h-3 text-cyan-400" /> Daily Inferences
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm text-left">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">4.2x</div>
            <div className="text-xs text-neutral-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-sky-400" /> Average Agency ROAS
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm text-left">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">99.98%</div>
            <div className="text-xs text-neutral-400 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-indigo-400" /> Production Uptime SLA
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Products Graphic Motion Video Carousel */}
      <ProductMotionCarousel 
        onNavigate={onNavigate} 
        onOpenWaitlist={onOpenWaitlist} 
      />

      {/* Digital Marketing Agency & Custom Analytics Suite Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Agency Card */}
          <div className="p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800 backdrop-blur-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TENSORSPARK GROWTH LABS</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-display">
                Digital Agency for Engineering, Design & Growth
              </h3>
              <p className="text-sm text-neutral-400 mb-5 leading-relaxed">
                We empower seed startups and modern brands with full-stack engineering, high-converting design systems, graphic designing & visual brand identity, applied AI pipelines, autonomous swarms, Photoshop retouching, and performance brand promotion.
              </p>

              {/* 7 Nested Service Links Grid */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
                  7 Dedicated Agency Practices:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'web-development' as const, label: 'Web Development', icon: Code2 },
                    { id: 'ux-ui-design' as const, label: 'UX/UI Design', icon: Layout },
                    { id: 'graphic-design' as const, label: 'Graphic Designing', icon: Palette },
                    { id: 'ai-integration' as const, label: 'AI Integration', icon: Cpu },
                    { id: 'ai-agents' as const, label: 'AI Agents Swarms', icon: Bot },
                    { id: 'photoshop' as const, label: 'Photoshop Art', icon: ImageIcon },
                    { id: 'digital-marketing' as const, label: 'Digital Marketing', icon: Megaphone },
                  ].map((s) => {
                    const SIcon = s.icon;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          onNavigate('agency');
                          if (onSelectAgencyService) onSelectAgencyService(s.id);
                        }}
                        className="p-2 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-cyan-500/50 hover:bg-neutral-900 text-neutral-300 hover:text-white flex items-center gap-2 text-left transition-all cursor-pointer"
                      >
                        <SIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate text-[11px] font-medium">{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-neutral-800">
              <button
                id="home-explore-agency-overview-btn"
                onClick={() => {
                  onNavigate('agency');
                  if (onSelectAgencyService) onSelectAgencyService('overview');
                }}
                className="flex-1 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-white text-xs font-semibold border border-neutral-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Growth Hub Overview</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          </div>

          {/* Custom Analytics Reporting Suite Card */}
          <div className="p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-sky-400 text-xs font-mono mb-3">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>REAL-TIME TELEMETRY</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-display">
                Custom Analytics & Reporting Tools
              </h3>
              <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                Say goodbye to fragmented data spreadsheets. Generate executive-ready performance summaries, track true customer acquisition costs (CAC) vs. LTV, and forecast growth with AI-assisted attribution.
              </p>

              {/* Mini Preview Widget */}
              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 mb-8 font-mono text-xs space-y-2.5">
                <div className="flex justify-between items-center text-neutral-500 border-b border-neutral-850 pb-2">
                  <span>LIVE REVENUE TELEMETRY</span>
                  <span className="text-emerald-400 font-sans font-medium text-[11px]">+34.2% YoY</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-neutral-400 text-[11px]">Blended ROAS:</span>
                  <span className="text-white font-bold text-sm">6.15x</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-neutral-400 text-[11px]">Attributed Conversions:</span>
                  <span className="text-cyan-400 font-bold text-sm">3,420 orders</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-neutral-400 text-[11px]">Custom Reports Generated:</span>
                  <span className="text-neutral-300 font-bold text-sm">184 PDFs Exported</span>
                </div>
              </div>
            </div>

            <button
              id="home-open-analytics-suite-btn"
              onClick={() => onNavigate('analytics')}
              className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Launch Custom Analytics Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
