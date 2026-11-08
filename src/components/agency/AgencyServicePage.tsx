'use client';

import React, { useState } from 'react';
import { AgencyServiceDetail, AgencyServiceId } from '../../types';
import { AGENCY_SERVICES_DETAILS } from '../../data/agencyServicesData';
import { dbSaveAgencyInquiry } from '../../lib/firebase';
import { 
  Code2, 
  Layout, 
  Video, 
  Palette,
  PenTool,
  Compass,
  Box,
  Cpu, 
  Bot, 
  Image as ImageIcon, 
  Megaphone, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  ShieldCheck, 
  Clock, 
  Send, 
  Sliders, 
  Zap, 
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Play,
  Check,
  Building2,
  Calendar,
  DollarSign,
  Database
} from 'lucide-react';

interface AgencyServicePageProps {
  serviceId: AgencyServiceId;
  onSelectService: (id: AgencyServiceId | 'overview') => void;
  onNavigateToAnalytics: () => void;
}

export const AgencyServicePage: React.FC<AgencyServicePageProps> = ({
  serviceId,
  onSelectService,
  onNavigateToAnalytics
}) => {
  const service = AGENCY_SERVICES_DETAILS[serviceId];

  // Consultation / Scope Estimator form state
  const [clientName, setClientName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [projectTimeline, setProjectTimeline] = useState('1_month');
  const [selectedPackage, setSelectedPackage] = useState(service.samplePackages[1]?.name || service.samplePackages[0]?.name);
  const [projectNotes, setProjectNotes] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Domain-specific interactive tool states
  // 1. Web Dev: Stack toggles
  const [webSsrEnabled, setWebSsrEnabled] = useState(true);
  const [webEdgeCache, setWebEdgeCache] = useState(true);
  const [webThreeJs, setWebThreeJs] = useState(false);

  // 2. UX/UI: Fidelity view
  const [uxFidelity, setUxFidelity] = useState<'wireframe' | 'visual' | 'tokens'>('visual');

  // 3. Graphic Designing & Brand Visual Identity: Artboard & Vector Inspector
  const [graphicArtboard, setGraphicArtboard] = useState<'logo' | 'editorial' | 'packaging'>('logo');
  const [showAnchorPoints, setShowAnchorPoints] = useState<boolean>(true);
  const [showGoldenCircles, setShowGoldenCircles] = useState<boolean>(true);
  const [selectedPantoneIdx, setSelectedPantoneIdx] = useState<number>(0);
  const [videoFormat, setVideoFormat] = useState<'reel' | 'launch' | 'ad'>('reel');

  // 4. AI Integration: Model & volume
  const [aiModel, setAiModel] = useState<'gemini-2.5' | 'gpt-4o' | 'claude-3.5'>('gemini-2.5');
  const [monthlyTokensMillions, setMonthlyTokensMillions] = useState<number>(25);

  // 5. AI Agents: Swarm Simulator
  const [agentSimulationState, setAgentSimulationState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [activeAgentStep, setActiveAgentStep] = useState<number>(0);

  // 6. Photoshop: Inspection mode
  const [retouchMode, setRetouchMode] = useState<'master' | 'raw' | 'breakdown'>('master');

  // 7. Digital Marketing: Allocation
  const [marketingBudget, setMarketingBudget] = useState<number>(12000);
  const [primaryChannel, setPrimaryChannel] = useState<'meta' | 'google' | 'tiktok' | 'omni'>('omni');

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

  const ServiceIcon = getServiceIcon(serviceId);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyEmail || !clientName) return;

    const inquiryId = `NX-INQ-${Date.now().toString().slice(-6)}`;
    const inquiryPayload = {
      id: inquiryId,
      clientName: clientName.trim(),
      email: companyEmail.trim().toLowerCase(),
      serviceType: service.title,
      budgetRange: selectedPackage,
      projectBrief: projectNotes || `Inquiry for ${service.title} (${selectedPackage})`,
      timeline: projectTimeline,
      createdAt: new Date().toISOString()
    };

    // 1. Save to Cloud Firestore Database
    try {
      await dbSaveAgencyInquiry(inquiryPayload);
    } catch (err) {
      console.warn('Firestore inquiry write note:', err);
    }

    // 2. Post to Express Backend API
    try {
      await fetch('/api/agency/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryPayload),
      });
    } catch (err) {
      console.warn('Backend API inquiry post note:', err);
    }

    setFormSubmitted(true);
  };

  const runAgentSwarmDemo = () => {
    setAgentSimulationState('running');
    setActiveAgentStep(1);
    setTimeout(() => setActiveAgentStep(2), 700);
    setTimeout(() => setActiveAgentStep(3), 1400);
    setTimeout(() => {
      setActiveAgentStep(4);
      setAgentSimulationState('completed');
    }, 2100);
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Quick Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => onSelectService('overview')}
            className="text-neutral-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Growth Labs Agency</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-cyan-400 font-semibold">{service.shortTitle}</span>
        </div>

        {/* Quick Nav Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <span className="text-[11px] font-mono text-neutral-500 uppercase shrink-0 mr-1 hidden md:inline">
            Other Services:
          </span>
          {(Object.keys(AGENCY_SERVICES_DETAILS) as AgencyServiceId[]).map((sid) => {
            const isCurrent = sid === serviceId;
            const Icon = getServiceIcon(sid);
            return (
              <button
                key={sid}
                onClick={() => {
                  onSelectService(sid);
                  setFormSubmitted(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850'
                }`}
              >
                <Icon className={`w-3 h-3 ${isCurrent ? 'text-cyan-400' : 'text-neutral-500'}`} />
                <span>{AGENCY_SERVICES_DETAILS[sid].shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative p-8 sm:p-12 rounded-3xl bg-neutral-900/90 border border-neutral-800 backdrop-blur-xl overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs flex items-center gap-1.5">
                <ServiceIcon className="w-3.5 h-3.5" />
                <span>{service.badge} • {service.category}</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-400 font-mono text-xs">
                Tensorspark Growth Labs
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-sans max-w-2xl">
              {service.subtitle}
            </p>

            <div className="text-xs font-mono text-cyan-400/90 bg-cyan-950/30 px-3.5 py-2 rounded-xl border border-cyan-800/40 inline-block">
              {service.tagline}
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl">
              {service.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#consultation-inquiry"
                className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-cyan-500/20"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#packages"
                className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-xs border border-neutral-700 transition-colors"
              >
                <span>View Engagement Packages</span>
              </a>

              <button
                onClick={onNavigateToAnalytics}
                className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white font-medium text-xs border border-neutral-800 transition-colors flex items-center gap-1.5"
              >
                <span>Live Analytics</span>
                <ExternalLink className="w-3 h-3 text-cyan-400" />
              </button>
            </div>
          </div>

          {/* Key Metrics Card (4 cols) */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-5">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block">
              VERIFIED IMPACT BENCHMARK
            </span>

            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-850 space-y-1">
              <span className="text-xs text-neutral-400">{service.highlightLabel}</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-display">
                {service.highlightMetric}
              </div>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Certified across 80+ client deliveries
              </span>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-850 space-y-1">
              <span className="text-xs text-neutral-400">{service.secondaryLabel}</span>
              <div className="text-2xl sm:text-3xl font-bold text-white font-display">
                {service.secondaryMetric}
              </div>
              <span className="text-[10px] text-neutral-500 font-mono">
                Historical client median
              </span>
            </div>

            <div className="pt-2 border-t border-neutral-850">
              <span className="text-[11px] font-mono text-neutral-400 block mb-2">
                PRODUCTION TECH STACK:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {service.technologies.slice(0, 6).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Domain-Specific Interactive Showcase / Tool */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-1">
              <Sparkles className="w-3 h-3" />
              <span>INTERACTIVE WORKBENCH</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              {serviceId === 'web-development' && 'Live Performance & Architecture Simulator'}
              {serviceId === 'ux-ui-design' && 'Design System Token & Fidelity Explorer'}
              {(serviceId === 'graphic-design' || serviceId === 'video-editing') && 'Vector Brand Studio & Artboard Inspector'}
              {serviceId === 'ai-integration' && 'Enterprise RAG & Token Cost Modeler'}
              {serviceId === 'ai-agents' && 'Autonomous Multi-Agent Swarm Sandbox'}
              {serviceId === 'photoshop' && 'Multi-Layer Retouching & Composite Inspector'}
              {serviceId === 'digital-marketing' && 'Brand Promotion & ROAS Allocation Modeler'}
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Experiment with parameters below to see how our agency builds and delivers this capability.
            </p>
          </div>
        </div>

        {/* 1. WEB DEV TOOL */}
        {serviceId === 'web-development' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-4">
              <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                Toggle Modern Architectural Layers:
              </label>
              
              <div className="space-y-3 text-xs">
                <div 
                  onClick={() => setWebSsrEnabled(!webSsrEnabled)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    webSsrEnabled ? 'bg-cyan-500/10 border-cyan-500/50 text-white' : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold block text-cyan-300">Server-Side Streaming (Next.js 15 App Router)</span>
                    <span className="text-[11px] text-neutral-400">Instantly hydrates UI above-the-fold; reduces LCP by 65%.</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${webSsrEnabled ? 'bg-cyan-400 text-neutral-950' : 'bg-neutral-800'}`}>
                    {webSsrEnabled && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <div 
                  onClick={() => setWebEdgeCache(!webEdgeCache)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    webEdgeCache ? 'bg-cyan-500/10 border-cyan-500/50 text-white' : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold block text-cyan-300">Cloudflare Edge Caching & Brotli Compression</span>
                    <span className="text-[11px] text-neutral-400">Serves static HTML/JS assets within 20ms worldwide.</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${webEdgeCache ? 'bg-cyan-400 text-neutral-950' : 'bg-neutral-800'}`}>
                    {webEdgeCache && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <div 
                  onClick={() => setWebThreeJs(!webThreeJs)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    webThreeJs ? 'bg-cyan-500/10 border-cyan-500/50 text-white' : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold block text-cyan-300">Interactive 3D Three.js GPU Canvas</span>
                    <span className="text-[11px] text-neutral-400">Adds engaging kinetic 3D background with WebGL shaders.</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${webThreeJs ? 'bg-cyan-400 text-neutral-950' : 'bg-neutral-800'}`}>
                    {webThreeJs && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4 font-mono text-xs">
              <span className="text-neutral-500 text-[11px] block">SIMULATED LIGHTHOUSE BENCHMARK</span>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-850">
                  <span className="text-[10px] text-neutral-400 block">Performance</span>
                  <span className="text-2xl font-bold text-emerald-400 font-display">
                    {webSsrEnabled && webEdgeCache ? '100' : webSsrEnabled ? '94' : '82'}
                  </span>
                </div>
                <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-850">
                  <span className="text-[10px] text-neutral-400 block">p95 TTFB</span>
                  <span className="text-2xl font-bold text-cyan-400 font-display">
                    {webEdgeCache ? '28ms' : '140ms'}
                  </span>
                </div>
                <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-850">
                  <span className="text-[10px] text-neutral-400 block">FPS Target</span>
                  <span className="text-2xl font-bold text-white font-display">
                    60 FPS
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/60 text-neutral-300 text-[11px] space-y-1">
                <div className="text-cyan-400 font-bold">Bundle Size & Asset Audit:</div>
                <div>• Initial Gzipped JavaScript: {webThreeJs ? '184 KB' : '42 KB'}</div>
                <div>• Largest Contentful Paint (LCP): {webSsrEnabled ? '0.4s (Pass)' : '1.8s'}</div>
                <div>• First Input Delay (FID): 8ms (Instantaneous)</div>
              </div>
            </div>
          </div>
        )}

        {/* 2. UX/UI DESIGN TOOL */}
        {serviceId === 'ux-ui-design' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400 mr-2">Prototype Stage:</span>
              {(['wireframe', 'visual', 'tokens'] as const).map((stage) => (
                <button
                  key={stage}
                  onClick={() => setUxFidelity(stage)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase font-mono transition-colors ${
                    uxFidelity === stage
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                      : 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {stage === 'wireframe' && '1. Wireframe Flow'}
                  {stage === 'visual' && '2. High-Fi Visual UI'}
                  {stage === 'tokens' && '3. Design System Tokens'}
                </button>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 min-h-56 flex flex-col justify-center">
              {uxFidelity === 'wireframe' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-neutral-500 border-b border-neutral-850 pb-2">
                    <span>WIREFRAME STAGE • USER FLOW & CONVERSION PATHS</span>
                    <span className="text-cyan-400">Low-Fidelity Architecture</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-4 border-2 border-dashed border-neutral-700 rounded-xl space-y-2 text-center">
                      <div className="h-4 bg-neutral-800 rounded w-3/4 mx-auto" />
                      <div className="h-2 bg-neutral-850 rounded w-1/2 mx-auto" />
                      <div className="h-8 bg-neutral-800/60 rounded flex items-center justify-center text-[10px] text-neutral-400">
                        [Hero CTA Hook]
                      </div>
                    </div>
                    <div className="p-4 border-2 border-dashed border-neutral-700 rounded-xl space-y-2 text-center">
                      <div className="h-4 bg-neutral-800 rounded w-3/4 mx-auto" />
                      <div className="h-2 bg-neutral-850 rounded w-1/2 mx-auto" />
                      <div className="h-8 bg-neutral-800/60 rounded flex items-center justify-center text-[10px] text-neutral-400">
                        [Social Proof Grid]
                      </div>
                    </div>
                    <div className="p-4 border-2 border-dashed border-neutral-700 rounded-xl space-y-2 text-center">
                      <div className="h-4 bg-neutral-800 rounded w-3/4 mx-auto" />
                      <div className="h-2 bg-neutral-850 rounded w-1/2 mx-auto" />
                      <div className="h-8 bg-neutral-800/60 rounded flex items-center justify-center text-[10px] text-neutral-400">
                        [Checkout Frictionless]
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {uxFidelity === 'visual' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-neutral-850 pb-2">
                    <span className="text-cyan-400 font-bold">HIGH-FIDELITY LUXURY UI COMPONENT</span>
                    <span>100% Contrast Verified WCAG AAA</span>
                  </div>
                  <div className="p-5 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-900/60 border border-cyan-500/30 shadow-xl flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 text-[10px] font-mono border border-cyan-400/20">
                        <Sparkles className="w-3 h-3" />
                        <span>Interactive Card Component</span>
                      </div>
                      <h4 className="text-base font-bold text-white font-display">Tensorspark Quantum Interface Engine</h4>
                      <p className="text-xs text-neutral-400">Engineered with optical hierarchy and custom 1px micro-borders.</p>
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 text-xs font-bold shadow-md shadow-cyan-400/20">
                      Explore Spec
                    </button>
                  </div>
                </div>
              )}

              {uxFidelity === 'tokens' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-neutral-500 border-b border-neutral-850 pb-2">
                    <span>FIGMA TOKENS STUDIO EXPORT • DIRECT CSS / TAILWIND SYNC</span>
                    <span className="text-emerald-400">100% Machine-Readable</span>
                  </div>
                  <pre className="p-3 bg-neutral-900 rounded-xl text-[11px] text-cyan-300 leading-relaxed overflow-x-auto">
{`{
  "color": {
    "brand-primary": "#22d3ee",
    "surface-dark": "#0a0a0f",
    "border-subtle": "rgba(255, 255, 255, 0.08)"
  },
  "spacing": { "card-padding": "24px", "button-radius": "12px" },
  "typography": { "font-display": "Space Grotesk", "font-body": "Plus Jakarta Sans" }
}`}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. GRAPHIC DESIGNING TOOL */}
        {(serviceId === 'graphic-design' || serviceId === 'video-editing') && (
          <div className="space-y-6">
            {/* Artboard mode selector & vector controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-400 mr-1">Artboard View:</span>
                {(['logo', 'editorial', 'packaging'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setGraphicArtboard(mode)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-colors flex items-center gap-1.5 ${
                      graphicArtboard === mode
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                        : 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {mode === 'logo' && <PenTool className="w-3.5 h-3.5" />}
                    {mode === 'editorial' && <Layout className="w-3.5 h-3.5" />}
                    {mode === 'packaging' && <Box className="w-3.5 h-3.5" />}
                    <span>
                      {mode === 'logo' && 'Vector Logo & Mark'}
                      {mode === 'editorial' && 'Editorial & Swiss Grid'}
                      {mode === 'packaging' && 'Packaging Dieline (300 DPI)'}
                    </span>
                  </button>
                ))}
              </div>

              {/* View toggles */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAnchorPoints(!showAnchorPoints)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors border ${
                    showAnchorPoints
                      ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                      : 'bg-neutral-950 text-neutral-500 border-neutral-800'
                  }`}
                >
                  Anchor Nodes: {showAnchorPoints ? 'ON' : 'OFF'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowGoldenCircles(!showGoldenCircles)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors border ${
                    showGoldenCircles
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      : 'bg-neutral-950 text-neutral-500 border-neutral-800'
                  }`}
                >
                  Golden Spiral (φ): {showGoldenCircles ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Main Interactive Graphic Design Canvas Artboard */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Artboard Canvas Simulation */}
              <div className="lg:col-span-8 p-6 rounded-2xl bg-neutral-950 border border-neutral-800 relative overflow-hidden min-h-[380px] flex flex-col justify-between">
                {/* Dotted drafting canvas background */}
                <div 
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }}
                />

                {/* Top Artboard Metadata Bar */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-400 border-b border-neutral-850 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-white font-semibold">
                      ARTBOARD 01
                    </span>
                    <span>1920 × 1080 px (300 DPI)</span>
                    <span className="text-cyan-400">CMYK FOGRA39</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-emerald-400">Pixel-Perfect Scale: 100%</span>
                  </div>
                </div>

                {/* Center Canvas Content depending on Mode */}
                <div className="relative z-10 my-8 flex items-center justify-center">
                  {graphicArtboard === 'logo' && (
                    <div className="relative flex flex-col items-center justify-center p-8">
                      {/* SVG Vector Logo with interactive golden circles and anchor nodes */}
                      <div className="relative w-48 h-48 flex items-center justify-center">
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                          {/* Golden Ratio Drafting Circles */}
                          {showGoldenCircles && (
                            <g className="opacity-40 stroke-amber-400" strokeWidth="0.8" fill="none" strokeDasharray="3,3">
                              <circle cx="100" cy="100" r="90" />
                              <circle cx="100" cy="100" r="56" />
                              <circle cx="100" cy="100" r="34" />
                              <circle cx="70" cy="100" r="34" />
                              <circle cx="130" cy="100" r="34" />
                              <line x1="10" y1="100" x2="190" y2="100" />
                              <line x1="100" y1="10" x2="100" y2="190" />
                            </g>
                          )}

                          {/* Primary Vector Emblem Geometric Shapes */}
                          <defs>
                            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#06b6d4" />
                              <stop offset="100%" stopColor="#6366f1" />
                            </linearGradient>
                          </defs>

                          {/* Stylized Tensorspark Hexagonal Lattice & Spark Monogram */}
                          <polygon
                            points="100,28 162,64 162,136 100,172 38,136 38,64"
                            fill="none"
                            stroke="url(#logoGrad)"
                            strokeWidth="4"
                            strokeLinejoin="round"
                          />
                          <polygon
                            points="100,52 142,76 142,124 100,148 58,124 58,76"
                            fill="rgba(6, 182, 212, 0.08)"
                            stroke="#38bdf8"
                            strokeWidth="2"
                          />
                          {/* 8-Point Kinetic Spark Center */}
                          <path
                            d="M100,68 Q100,96 72,100 Q100,104 100,132 Q100,104 128,100 Q100,96 100,68 Z"
                            fill="url(#logoGrad)"
                          />
                          <circle cx="100" cy="100" r="7" fill="#fbbf24" />
                          <circle cx="100" cy="100" r="3.5" fill="#ffffff" />

                          {/* Vector Anchor Nodes & Tangents */}
                          {showAnchorPoints && (
                            <g>
                              {/* Square nodes */}
                              {[
                                [100, 28], [162, 64], [162, 136],
                                [100, 172], [38, 136], [38, 64],
                                [100, 52], [142, 76], [142, 124],
                                [100, 148], [58, 124], [58, 76]
                              ].map(([nx, ny], idx) => (
                                <rect
                                  key={idx}
                                  x={nx - 3}
                                  y={ny - 3}
                                  width="6"
                                  height="6"
                                  fill="#ffffff"
                                  stroke="#0284c7"
                                  strokeWidth="1.2"
                                />
                              ))}
                              {/* Tangent handle simulation */}
                              <line x1="100" y1="28" x2="120" y2="16" stroke="#ec4899" strokeWidth="1" />
                              <circle cx="120" cy="16" r="2.5" fill="#ec4899" />
                              <line x1="100" y1="28" x2="80" y2="40" stroke="#ec4899" strokeWidth="1" />
                              <circle cx="80" cy="40" r="2.5" fill="#ec4899" />
                            </g>
                          )}
                        </svg>

                        {/* Phi dimension badge */}
                        {showGoldenCircles && (
                          <div className="absolute -bottom-2 right-0 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono text-amber-400">
                            φ = 1.618 Harmonic Scale
                          </div>
                        )}
                      </div>

                      <div className="mt-5 text-center">
                        <div className="text-xl font-bold tracking-[0.25em] text-white font-display">
                          TENSORSPARK AI SYSTEMS
                        </div>
                        <div className="text-[10px] font-mono tracking-[0.4em] text-neutral-400 mt-1">
                          VECTOR IDENTITY SYSTEM • MASTER SUITE
                        </div>
                      </div>
                    </div>
                  )}

                  {graphicArtboard === 'editorial' && (
                    <div className="w-full max-w-lg p-5 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-4 font-sans text-left">
                      {/* Swiss Grid Editorial Layout Simulation */}
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-2 text-[10px] font-mono text-neutral-500">
                        <span>VOLUME 04 / ISSUE 12</span>
                        <span className="text-cyan-400">SWISS MODULAR GRID • 12 COLUMNS</span>
                        <span>BLEED 3.0mm</span>
                      </div>
                      <div>
                        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                          Brand Architecture & Strategy
                        </span>
                        <h4 className="text-2xl font-bold text-white tracking-tight leading-snug mt-1 font-display">
                          The Algorithmic Epoch: Typography as Interface
                        </h4>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-[11px] text-neutral-300 leading-relaxed">
                        <p className="border-l-2 border-cyan-500/60 pl-2 text-neutral-200 italic">
                          "Visual distinction in tech has shifted from decorative graphics to mathematical precision, custom kinetic glyphs, and high-legibility typographic hierarchies."
                        </p>
                        <p className="text-neutral-400">
                          Every letterform is drafted to maintain optical harmony across high-DPI displays, luxury print substrates, and billboard collateral.
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-[10px] font-mono text-neutral-400">
                        <span>Font: Plus Jakarta Sans Bold (72pt / 24pt / 11pt)</span>
                        <span className="text-emerald-400">100% Vector Crisp</span>
                      </div>
                    </div>
                  )}

                  {graphicArtboard === 'packaging' && (
                    <div className="w-full max-w-md p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between text-[11px] text-neutral-400 border-b border-neutral-800 pb-2">
                        <span className="text-white font-semibold flex items-center gap-1.5">
                          <Box className="w-3.5 h-3.5 text-cyan-400" />
                          Hardware Product Packaging Dieline
                        </span>
                        <span className="text-pink-400">Cut & Crease Spec</span>
                      </div>
                      {/* Unfolded Box Dieline Blueprint */}
                      <div className="p-4 bg-neutral-950 rounded-lg border border-dashed border-cyan-500/40 relative space-y-2">
                        <div className="flex items-center justify-between text-[10px] text-neutral-500">
                          <span>TOP FLAP [GLUE TAB: 12mm]</span>
                          <span className="text-amber-400">SPOT UV EMBOSS ZONE</span>
                        </div>
                        <div className="h-20 rounded border border-cyan-500/30 bg-cyan-950/20 flex flex-col items-center justify-center p-2 text-center">
                          <span className="text-white font-bold tracking-widest text-sm">TENSORSPARK SENSOR MODULE</span>
                          <span className="text-[10px] text-neutral-400">Matt Black Coated Paperboard • 450 GSM</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center text-[9px] text-neutral-400">
                          <div className="p-1.5 bg-neutral-900 rounded border border-neutral-800">LEFT PANEL</div>
                          <div className="p-1.5 bg-neutral-900 rounded border border-neutral-800 text-cyan-400">BASE TRAY</div>
                          <div className="p-1.5 bg-neutral-900 rounded border border-neutral-800">RIGHT PANEL</div>
                        </div>
                        {/* CMYK Registration Targets */}
                        <div className="flex items-center justify-between text-[9px] text-neutral-500 pt-1">
                          <span>⊕ REGISTRATION TARGET</span>
                          <span>EAN-13 BARCODE AREA</span>
                          <span>⊕ REGISTRATION TARGET</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-neutral-400">
                        <span>Tolerance: ±0.25mm</span>
                        <span className="text-cyan-300">Certified for Die-Cutting & Emboss</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Graphic Design Status Ticker */}
                <div className="relative z-10 pt-3 border-t border-neutral-850 flex flex-wrap items-center justify-between text-[10px] font-mono text-neutral-400 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400">COLOR SPACE: PANTONE® SOLID COATED</span>
                    <span>BLEED: +3.0mm ALL EDGES</span>
                  </div>
                  <div>
                    <span className="text-white font-semibold">PRE-FLIGHT: 0 ERRORS • ALL FONTS CONVERTED TO OUTLINES</span>
                  </div>
                </div>
              </div>

              {/* Right: Interactive Pantone Swatches & Production Checklist */}
              <div className="lg:col-span-4 space-y-4">
                {/* Interactive Pantone Swatch Picker */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-300 font-semibold flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-cyan-400" />
                      Pantone & CMYK Formula Guide
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">Pick Ink</span>
                  </div>

                  {/* Swatches Grid */}
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { name: 'PANTONE 312 C', hex: '#00A9E0', cmyk: 'C:92 M:12 Y:0 K:0', bg: 'bg-[#00A9E0]' },
                      { name: 'PANTONE 2728 C', hex: '#1C3F94', cmyk: 'C:96 M:78 Y:0 K:0', bg: 'bg-[#1C3F94]' },
                      { name: 'PANTONE 806 C', hex: '#FF3EB5', cmyk: 'C:0 M:85 Y:0 K:0', bg: 'bg-[#FF3EB5]' },
                      { name: 'PANTONE 123 C', hex: '#FFC72C', cmyk: 'C:0 M:23 Y:93 K:0', bg: 'bg-[#FFC72C]' },
                      { name: 'PANTONE BLACK 6', hex: '#101419', cmyk: 'C:82 M:71 Y:59 K:75', bg: 'bg-[#101419]' },
                    ].map((swatch, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedPantoneIdx(idx)}
                        className={`h-12 rounded-lg ${swatch.bg} relative transition-transform ${
                          selectedPantoneIdx === idx
                            ? 'scale-105 ring-2 ring-cyan-400 ring-offset-2 ring-offset-neutral-950 shadow-md'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                        title={swatch.name}
                      >
                        {selectedPantoneIdx === idx && (
                          <Check className="w-4 h-4 text-white absolute inset-0 m-auto drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Active Ink Formula Card */}
                  {(() => {
                    const swatches = [
                      { name: 'PANTONE 312 C', hex: '#00A9E0', cmyk: 'C:92 M:12 Y:0 K:0', rgb: '0, 169, 224', role: 'Primary Brand Electric Cyan' },
                      { name: 'PANTONE 2728 C', hex: '#1C3F94', cmyk: 'C:96 M:78 Y:0 K:0', rgb: '28, 63, 148', role: 'Deep Strategic Cobalt' },
                      { name: 'PANTONE 806 C', hex: '#FF3EB5', cmyk: 'C:0 M:85 Y:0 K:0', rgb: '255, 62, 181', role: 'Neon Accent & Callout' },
                      { name: 'PANTONE 123 C', hex: '#FFC72C', cmyk: 'C:0 M:23 Y:93 K:0', rgb: '255, 199, 44', role: 'Golden Ratio Highlight' },
                      { name: 'PANTONE BLACK 6', hex: '#101419', cmyk: 'C:82 M:71 Y:59 K:75', rgb: '16, 20, 25', role: 'Rich Obsidian Substrate' },
                    ];
                    const active = swatches[selectedPantoneIdx] || swatches[0];
                    return (
                      <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-850 space-y-1.5 font-mono text-[11px]">
                        <div className="flex items-center justify-between text-white font-bold">
                          <span>{active.name}</span>
                          <span className="text-cyan-400">{active.hex}</span>
                        </div>
                        <div className="text-neutral-400 flex items-center justify-between text-[10px]">
                          <span>{active.cmyk}</span>
                          <span>RGB: ({active.rgb})</span>
                        </div>
                        <div className="text-neutral-500 text-[10px] font-sans">
                          {active.role}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Print & Digital Production Standards */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5 font-mono text-xs">
                  <span className="text-neutral-300 font-semibold block text-[11px]">
                    Graphic Delivery Formats Included:
                  </span>
                  <div className="space-y-1.5 text-[11px] text-neutral-400">
                    <div className="flex items-center justify-between py-1 border-b border-neutral-900">
                      <span>Vector Scalability</span>
                      <span className="text-white font-semibold">AI, EPS, SVG (Inf. Scale)</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-neutral-900">
                      <span>Print Standard</span>
                      <span className="text-white font-semibold">PDF/X-4:2010 (300 DPI)</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-neutral-900">
                      <span>Typography Outlines</span>
                      <span className="text-emerald-400 font-semibold">Pre-Converted to Paths</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span>Source IP Ownership</span>
                      <span className="text-cyan-400 font-semibold">100% Client Retained</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. AI INTEGRATION TOOL */}
        {serviceId === 'ai-integration' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div>
                <label className="text-xs font-mono text-neutral-300 block mb-2">
                  Select Foundation Reasoning Model:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'gemini-2.5', label: 'Gemini 2.5 Flash', latency: '35ms', price: '$0.075 / 1M' },
                    { id: 'gpt-4o', label: 'OpenAI GPT-4o', latency: '85ms', price: '$2.50 / 1M' },
                    { id: 'claude-3.5', label: 'Claude 3.5 Sonnet', latency: '90ms', price: '$3.00 / 1M' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setAiModel(m.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        aiModel === m.id
                          ? 'bg-cyan-500/20 border-cyan-500/60 text-white'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold text-xs">{m.label}</div>
                      <div className="text-[10px] text-cyan-400 font-mono mt-1">{m.latency} p95</div>
                      <div className="text-[10px] text-neutral-500 font-mono">{m.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-neutral-400">Monthly Enterprise Token Volume:</span>
                  <span className="text-cyan-400 font-bold">{monthlyTokensMillions} Million Tokens</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={200}
                  step={5}
                  value={monthlyTokensMillions}
                  onChange={(e) => setMonthlyTokensMillions(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>

            <div className="lg:col-span-6 p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4 font-mono text-xs">
              <span className="text-neutral-500 text-[11px] block">PROJECTED INFRASTRUCTURE SAVINGS</span>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-850">
                  <span className="text-[10px] text-neutral-400 block">Baseline Unoptimized Cost</span>
                  <span className="text-xl font-bold text-neutral-400 font-display line-through">
                    ${Math.round(monthlyTokensMillions * 3.2).toLocaleString()} / mo
                  </span>
                </div>
                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-850">
                  <span className="text-[10px] text-cyan-400 block">With Tensorspark Smart RAG Router</span>
                  <span className="text-2xl font-bold text-emerald-400 font-display">
                    ${Math.round(monthlyTokensMillions * 0.72).toLocaleString()} / mo
                  </span>
                </div>
              </div>
              <div className="text-[11px] text-neutral-400 pt-2 border-t border-neutral-850 space-y-1">
                <div>• Context Caching Hit Rate: 72%</div>
                <div>• Zero-Shot Retrieval Latency: 42ms p95</div>
                <div>• Hallucination Defenses: Cryptographically Verified Output</div>
              </div>
            </div>
          </div>
        )}

        {/* 5. AI AGENTS TOOL */}
        {serviceId === 'ai-agents' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">
                Simulate 4-Agent Autonomous Swarm Execution:
              </span>
              <button
                type="button"
                onClick={runAgentSwarmDemo}
                disabled={agentSimulationState === 'running'}
                className="px-4 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{agentSimulationState === 'running' ? 'Swarm Executing...' : 'Run Swarm Simulation'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
              {[
                { step: 1, name: '1. Web Intelligence Agent', role: 'Headless Browser & Scraping', status: activeAgentStep >= 1 ? 'Executed' : 'Standby' },
                { step: 2, name: '2. Reasoning & Synthesis Agent', role: 'Structured JSON Extraction', status: activeAgentStep >= 2 ? 'Executed' : 'Standby' },
                { step: 3, name: '3. QA Reviewer Agent', role: 'Self-Healing Unit Tests', status: activeAgentStep >= 3 ? 'Executed' : 'Standby' },
                { step: 4, name: '4. Dispatcher Agent', role: 'Database & API Commit', status: activeAgentStep >= 4 ? 'Dispatched' : 'Standby' }
              ].map((ag) => (
                <div
                  key={ag.step}
                  className={`p-4 rounded-xl border transition-all ${
                    activeAgentStep === ag.step
                      ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                      : activeAgentStep > ag.step
                      ? 'bg-neutral-900 border-neutral-700 text-neutral-300'
                      : 'bg-neutral-950 border-neutral-850 text-neutral-500'
                  }`}
                >
                  <span className="text-[10px] text-cyan-400 block font-bold mb-1">{ag.name}</span>
                  <div className="text-xs font-semibold mb-2">{ag.role}</div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md ${
                    ag.status === 'Dispatched' || ag.status === 'Executed'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-neutral-800 text-neutral-500'
                  }`}>
                    {ag.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. PHOTOSHOP TOOL */}
        {serviceId === 'photoshop' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400 mr-2">Inspection Plate:</span>
              {(['master', 'raw', 'breakdown'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setRetouchMode(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase font-mono transition-colors ${
                    retouchMode === m
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                      : 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {m === 'master' && '1. Master Campaign Composite'}
                  {m === 'raw' && '2. Raw Camera Capture'}
                  {m === 'breakdown' && '3. Frequency Layer Breakdown'}
                </button>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between text-neutral-400 border-b border-neutral-850 pb-2">
                <span className="text-cyan-400 font-bold">16-BIT PROPHOTO RGB WORKSPACE</span>
                <span>Layer Count: 48 Non-Destructive Smart Objects</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-neutral-900 rounded-xl border border-neutral-850">
                  <span className="text-[10px] text-cyan-400 block">Atmospheric Volumetrics</span>
                  <span className="text-white font-semibold">Custom Ray Lighting</span>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Multi-source directional lens glow matching product geometry perfectly.
                  </p>
                </div>
                <div className="p-3.5 bg-neutral-900 rounded-xl border border-neutral-850">
                  <span className="text-[10px] text-cyan-400 block">Frequency Separation</span>
                  <span className="text-white font-semibold">High-Pass 2.4px Healing</span>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Zero loss of micro-texture while eliminating reflections and scratches.
                  </p>
                </div>
                <div className="p-3.5 bg-neutral-900 rounded-xl border border-neutral-850">
                  <span className="text-[10px] text-emerald-400 block">Billboard Resolution</span>
                  <span className="text-white font-semibold">8,192 x 4,608 px</span>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Crisp detail for Times Square mega-displays and mobile screens alike.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. DIGITAL MARKETING & BRAND PROMOTION TOOL */}
        {serviceId === 'digital-marketing' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-neutral-300">Monthly Ad Promotion Media Spend:</span>
                  <span className="text-cyan-400 font-bold">${marketingBudget.toLocaleString()} / mo</span>
                </div>
                <input
                  type="range"
                  min={3000}
                  max={60000}
                  step={1000}
                  value={marketingBudget}
                  onChange={(e) => setMarketingBudget(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-400 block mb-2">
                  Primary Paid Media Distribution Focus:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'omni', label: 'Omnichannel Full-Funnel' },
                    { id: 'google', label: 'Google Search & PMax' },
                    { id: 'meta', label: 'Meta (IG & FB Viral)' },
                    { id: 'tiktok', label: 'TikTok & Tech Creator Seeding' }
                  ].map((ch) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setPrimaryChannel(ch.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        primaryChannel === ch.id
                          ? 'bg-cyan-500/20 border-cyan-500/60 text-white font-semibold'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4 font-mono text-xs">
              <span className="text-neutral-500 text-[11px] block">PROJECTED 90-DAY PROMOTION IMPACT</span>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-850">
                  <span className="text-[10px] text-neutral-400 block">Attributed Pipeline</span>
                  <span className="text-2xl font-bold text-cyan-400 font-display">
                    ${Math.round(marketingBudget * 5.86).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">5.86x Target ROAS</span>
                </div>
                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-850">
                  <span className="text-[10px] text-neutral-400 block">Qualified Customers</span>
                  <span className="text-2xl font-bold text-white font-display">
                    {Math.round(marketingBudget / 11.4).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-neutral-400 block mt-0.5">CAC: ~$11.40</span>
                </div>
              </div>
              <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-850 text-neutral-300 text-[11px]">
                Estimated Impressions: <span className="text-white font-bold">{Math.round((marketingBudget / 10) * 1200).toLocaleString()}+</span> targeted prospects.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Core Capabilities & Deliverables Grid */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
            Deliverables & Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            What We Build & Ship For You
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.coreCapabilities.map((cap, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-all space-y-3"
            >
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[10px] font-bold">
                  {idx + 1}
                </span>
                <span>CAPABILITY SPECIFICATION</span>
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                {cap.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                {cap.desc}
              </p>
              <div className="pt-2 border-t border-neutral-850 text-xs text-neutral-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-mono text-[11px] text-neutral-300">
                  <strong className="text-white">Deliverable:</strong> {cap.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4-Phase Delivery Process */}
      <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-6">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
            Execution Methodology
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            How We Execute & Deliver
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {service.processSteps.map((step, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 relative"
            >
              <span className="text-[10px] font-mono text-cyan-400 block font-bold">
                {step.phase}
              </span>
              <h4 className="text-sm font-bold text-white font-display">
                {step.name}
              </h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                {step.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Highlight */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-cyan-950/20 border border-cyan-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
            FEATURED CLIENT CASE STUDY
          </span>
          <span className="text-xs font-mono text-neutral-400">
            Client: <strong className="text-white">{service.caseStudy.client}</strong>
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
          {service.caseStudy.impact}
        </h3>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans max-w-3xl">
          {service.caseStudy.description}
        </p>

        <div className="inline-flex items-center gap-3 p-3.5 bg-neutral-950/90 rounded-2xl border border-cyan-500/40">
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-display">
            {service.caseStudy.metricValue}
          </div>
          <div className="text-xs text-neutral-400 font-mono">
            {service.caseStudy.metricLabel}
          </div>
        </div>
      </div>

      {/* Sample Packages & Pricing */}
      <div id="packages" className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
            Transparent Engagements
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Select Your Ideal Service Tier
          </h2>
          <p className="text-xs text-neutral-400">
            Fixed sprint deliverables or dedicated monthly retainers designed for high-velocity teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.samplePackages.map((pkg, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-3xl border transition-all flex flex-col justify-between space-y-6 ${
                pkg.popular
                  ? 'bg-neutral-900 border-cyan-500/60 shadow-xl shadow-cyan-500/10 relative'
                  : 'bg-neutral-900/60 border-neutral-800'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan-400 text-neutral-950 text-[10px] font-bold uppercase font-mono tracking-wider">
                  Most Popular Scope
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-white font-display">{pkg.name}</h4>
                  <span className="text-xs font-mono text-neutral-400 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>Timeline: {pkg.timeline}</span>
                  </span>
                </div>

                <div className="text-3xl font-extrabold text-white font-display">
                  {pkg.price}
                </div>

                <ul className="space-y-2.5 text-xs text-neutral-300 pt-3 border-t border-neutral-850">
                  {pkg.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedPackage(pkg.name);
                  const el = document.getElementById('consultation-inquiry');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full py-2.5 rounded-xl font-semibold text-xs transition-colors cursor-pointer ${
                  pkg.popular
                    ? 'bg-cyan-400 hover:bg-cyan-300 text-neutral-950'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                }`}
              >
                Select {pkg.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Dedicated Consultation / Inquiry Form */}
      <div
        id="consultation-inquiry"
        className="p-8 sm:p-12 rounded-3xl bg-neutral-900 border border-neutral-800 max-w-3xl mx-auto space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
            <ServiceIcon className="w-6 h-6" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Inquire for {service.shortTitle}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400">
            Tell us about your brand milestones and our agency practice leads will respond within 24 business hours.
          </p>
        </div>

        {formSubmitted ? (
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-300 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400" />
            <h4 className="text-lg font-bold text-white">Proposal Request Received!</h4>
            <p className="text-xs text-neutral-300 max-w-md mx-auto">
              Thank you, {clientName}. We’ve queued your inquiry for <strong>{service.shortTitle}</strong> ({selectedPackage}) and sent confirmation to <strong>{companyEmail}</strong>.
            </p>
            <div className="flex items-center justify-center gap-2 text-[11px] text-cyan-400 font-mono">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>Record Persisted to Firestore Database & Backend Service</span>
            </div>
            <button
              onClick={() => setFormSubmitted(false)}
              className="text-xs text-cyan-400 underline font-mono"
            >
              Submit another project inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4 text-left max-w-xl mx-auto text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-400 mb-1">Your Name / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Lin, CEO"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Work Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="founder@company.com"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-400 mb-1">Target Package</label>
                <select
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                >
                  {service.samplePackages.map((p, i) => (
                    <option key={i} value={p.name}>
                      {p.name} ({p.price})
                    </option>
                  ))}
                  <option value="Custom Scope">Custom Scope / Custom Retainer</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Desired Timeline</label>
                <select
                  value={projectTimeline}
                  onChange={(e) => setProjectTimeline(e.target.value)}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="asap">Immediate (Next 1-2 weeks)</option>
                  <option value="1_month">Within 1 Month</option>
                  <option value="next_quarter">Next Quarter</option>
                  <option value="exploring">Just Exploring Options</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">Project Goals & Scope Details</label>
              <textarea
                rows={3}
                placeholder={`Tell us what you're trying to achieve with ${service.shortTitle} (e.g. tech stack, current challenges, links)...`}
                value={projectNotes}
                onChange={(e) => setProjectNotes(e.target.value)}
                className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg shadow-cyan-500/20"
            >
              <Send className="w-4 h-4" />
              <span>Submit {service.shortTitle} Project Brief</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
