'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TabView, AgencyServiceId, CareerOption, AuthUser } from '../types';
import { TensorsparkLogo } from './TensorsparkLogo';
import { 
  Cpu, 
  Layers, 
  GraduationCap, 
  LayoutDashboard, 
  Megaphone, 
  BarChart3, 
  ArrowRight,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Code2,
  Layout,
  Palette,
  Video,
  Bot,
  Image as ImageIcon,
  Check,
  Briefcase,
  Award,
  FileText,
  LogIn,
  UserPlus,
  LogOut,
  Clock,
  Users,
  MapPin,
  Phone
} from 'lucide-react';

interface NavbarProps {
  currentTab: TabView;
  onSelectTab: (tab: TabView) => void;
  onOpenApplyModal: () => void;
  selectedAgencyService?: AgencyServiceId | 'overview';
  onSelectAgencyService?: (service: AgencyServiceId | 'overview') => void;
  selectedCareerOption?: CareerOption;
  onSelectCareerOption?: (option: CareerOption) => void;
  onOpenWaitlistModal?: () => void;
  onOpenAuthModal?: (mode: 'login' | 'signup') => void;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenApplyModal,
  selectedAgencyService = 'overview',
  onSelectAgencyService,
  selectedCareerOption = 'openings',
  onSelectCareerOption,
  onOpenWaitlistModal,
  onOpenAuthModal,
  currentUser,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [agencyDropdownOpen, setAgencyDropdownOpen] = useState(false);
  const [careerDropdownOpen, setCareerDropdownOpen] = useState(false);
  const [mobileAgencyExpanded, setMobileAgencyExpanded] = useState(false);
  const [mobileCareerExpanded, setMobileCareerExpanded] = useState(false);
  const agencyDropdownRef = useRef<HTMLDivElement>(null);
  const careerDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (agencyDropdownRef.current && !agencyDropdownRef.current.contains(event.target as Node)) {
        setAgencyDropdownOpen(false);
      }
      if (careerDropdownRef.current && !careerDropdownRef.current.contains(event.target as Node)) {
        setCareerDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const agencySublinks: { id: AgencyServiceId; title: string; icon: React.FC<{ className?: string }>; desc: string }[] = [
    { id: 'web-development', title: 'Web Development', icon: Code2, desc: 'Next.js 15, Three.js & full-stack web apps' },
    { id: 'ux-ui-design', title: 'UX/UI Design', icon: Layout, desc: 'Figma token design systems & high-fi prototypes' },
    { id: 'graphic-design', title: 'Graphic Designing', icon: Palette, desc: 'Brand identity, vector logos & print collateral' },
    { id: 'ai-integration', title: 'AI Integration', icon: Cpu, desc: 'Enterprise RAG pipelines & custom LLM backends' },
    { id: 'ai-agents', title: 'AI Agents', icon: Bot, desc: 'Autonomous multi-agent swarms & tool execution' },
    { id: 'photoshop', title: 'Photoshop', icon: ImageIcon, desc: 'High-end visual retouching & composite art' },
    { id: 'digital-marketing', title: 'Digital Marketing / Brand Promotion', icon: Megaphone, desc: 'Paid acquisition, viral seeding & 5.86x ROAS' },
  ];

  const careerSublinks: { 
    id: CareerOption; 
    title: string; 
    badge: string; 
    icon: React.FC<{ className?: string }>; 
    desc: string; 
    highlightColor: string;
  }[] = [
    {
      id: 'openings',
      title: 'Current Openings',
      badge: 'Multiple Roles',
      icon: Briefcase,
      desc: '16 full-time & specialist positions across AI, Systems, UI/UX, and Marketing',
      highlightColor: 'text-cyan-400'
    },
    {
      id: 'three-month',
      title: '3 Months Internship',
      badge: 'Extendable & PPO',
      icon: GraduationCap,
      desc: '12-week fellowship with stipend, extendable tenure & direct PPO full-time offers',
      highlightColor: 'text-emerald-400'
    },
    {
      id: 'fifteen-day',
      title: '15 Days Internship Certificate',
      badge: '₹2,000 RS • Signed',
      icon: Award,
      desc: 'Fast-track certification (charged ₹2,000 RS) with candidate digital signature & on-time task delivery',
      highlightColor: 'text-indigo-400'
    }
  ];

  const handleSelectAgencySubservice = (serviceId: AgencyServiceId | 'overview') => {
    onSelectTab('agency');
    if (onSelectAgencyService) {
      onSelectAgencyService(serviceId);
    }
    setAgencyDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleSelectCareerOption = (option: CareerOption) => {
    onSelectTab('careers');
    if (onSelectCareerOption) {
      onSelectCareerOption(option);
    }
    setCareerDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const isCareerActive = currentTab === 'careers' || currentTab === 'internships';

  const navItems = [
    { 
      id: 'home' as TabView, 
      label: 'Home', 
      icon: Cpu, 
      type: 'regular' as const,
      theme: {
        activeBg: 'bg-gradient-to-r from-cyan-500/25 via-cyan-500/15 to-blue-500/15 border-cyan-500/60 text-cyan-200 shadow-[0_0_14px_rgba(6,182,212,0.3)]',
        activeGlow: 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]',
        activeIcon: 'text-cyan-300',
        idleBg: 'hover:bg-cyan-950/40 hover:border-cyan-500/30 hover:text-cyan-200 text-neutral-300 border-transparent',
        dotColor: 'bg-cyan-400',
        mobileActive: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/15',
        mobileIdle: 'hover:bg-cyan-950/30 text-neutral-300'
      }
    },
    { 
      id: 'about' as TabView, 
      label: 'About', 
      icon: Users, 
      type: 'regular' as const,
      theme: {
        activeBg: 'bg-gradient-to-r from-teal-500/25 via-cyan-500/15 to-emerald-500/15 border-teal-500/60 text-teal-200 shadow-[0_0_14px_rgba(20,184,166,0.3)]',
        activeGlow: 'bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.9)]',
        activeIcon: 'text-teal-300',
        idleBg: 'hover:bg-teal-950/40 hover:border-teal-500/30 hover:text-teal-200 text-neutral-300 border-transparent',
        dotColor: 'bg-teal-400',
        mobileActive: 'bg-teal-500/15 text-teal-300 border-teal-500/40 shadow-sm shadow-teal-500/15',
        mobileIdle: 'hover:bg-teal-950/30 text-neutral-300'
      }
    },
    { 
      id: 'products' as TabView, 
      label: 'AI Products', 
      icon: Layers, 
      type: 'regular' as const,
      theme: {
        activeBg: 'bg-gradient-to-r from-violet-500/25 via-purple-500/15 to-fuchsia-500/15 border-violet-500/60 text-violet-200 shadow-[0_0_14px_rgba(168,85,247,0.3)]',
        activeGlow: 'bg-violet-400 shadow-[0_0_8px_rgba(168,85,247,0.9)]',
        activeIcon: 'text-violet-300',
        idleBg: 'hover:bg-violet-950/40 hover:border-violet-500/30 hover:text-violet-200 text-neutral-300 border-transparent',
        dotColor: 'bg-violet-400',
        mobileActive: 'bg-violet-500/15 text-violet-300 border-violet-500/40 shadow-sm shadow-violet-500/15',
        mobileIdle: 'hover:bg-violet-950/30 text-neutral-300'
      }
    },
    { 
      id: 'careers' as TabView, 
      label: 'Careers', 
      icon: Briefcase, 
      type: 'career' as const,
      theme: {
        activeBg: 'bg-gradient-to-r from-emerald-500/25 via-teal-500/15 to-cyan-500/15 border-emerald-500/60 text-emerald-200 shadow-[0_0_14px_rgba(16,185,129,0.3)]',
        activeGlow: 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)]',
        activeIcon: 'text-emerald-300',
        idleBg: 'hover:bg-emerald-950/40 hover:border-emerald-500/30 hover:text-emerald-200 text-neutral-300 border-transparent',
        dotColor: 'bg-emerald-400',
        mobileActive: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/15',
        mobileIdle: 'hover:bg-emerald-950/30 text-neutral-300'
      }
    },
    
    { 
      id: 'contact' as TabView, 
      label: 'Contact Us', 
      icon: MapPin, 
      type: 'regular' as const,
      theme: {
        activeBg: 'bg-gradient-to-r from-cyan-500/25 via-sky-500/15 to-blue-500/15 border-cyan-500/60 text-cyan-200 shadow-[0_0_14px_rgba(6,182,212,0.3)]',
        activeGlow: 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]',
        activeIcon: 'text-cyan-300',
        idleBg: 'hover:bg-cyan-950/40 hover:border-cyan-500/30 hover:text-cyan-200 text-neutral-300 border-transparent',
        dotColor: 'bg-cyan-400',
        mobileActive: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/15',
        mobileIdle: 'hover:bg-cyan-950/30 text-neutral-300'
      }
    },
    { 
      id: 'agency' as TabView, 
      label: 'Agency & Services', 
      icon: Megaphone, 
      type: 'agency' as const,
      theme: {
        activeBg: 'bg-gradient-to-r from-rose-500/25 via-pink-500/15 to-purple-500/15 border-rose-500/60 text-rose-200 shadow-[0_0_14px_rgba(244,63,94,0.3)]',
        activeGlow: 'bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.9)]',
        activeIcon: 'text-rose-300',
        idleBg: 'hover:bg-rose-950/40 hover:border-rose-500/30 hover:text-rose-200 text-neutral-300 border-transparent',
        dotColor: 'bg-rose-400',
        mobileActive: 'bg-rose-500/15 text-rose-300 border-rose-500/40 shadow-sm shadow-rose-500/15',
        mobileIdle: 'hover:bg-rose-950/30 text-neutral-300'
      }
    },
    { 
      id: 'analytics' as TabView, 
      label: 'Analytics', 
      icon: BarChart3, 
      type: 'regular' as const,
      theme: {
        activeBg: 'bg-gradient-to-r from-blue-500/25 via-indigo-500/15 to-cyan-500/15 border-blue-500/60 text-blue-200 shadow-[0_0_14px_rgba(59,130,246,0.3)]',
        activeGlow: 'bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.9)]',
        activeIcon: 'text-blue-300',
        idleBg: 'hover:bg-blue-950/40 hover:border-blue-500/30 hover:text-blue-200 text-neutral-300 border-transparent',
        dotColor: 'bg-blue-400',
        mobileActive: 'bg-blue-500/15 text-blue-300 border-blue-500/40 shadow-sm shadow-blue-500/15',
        mobileIdle: 'hover:bg-blue-950/30 text-neutral-300'
      }
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/85 backdrop-blur-2xl shadow-xl shadow-black/40">
      {/* Top micro announcement bar with sleek gradient & badge */}
      <div className="bg-linear-to-r from-cyan-950/70 via-neutral-900/90 to-indigo-950/70 border-b border-neutral-800/50 py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs text-neutral-300">
          <span className="flex items-center gap-1.5 font-medium text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Careers & Fellowships Open:
          </span>
          <span className="text-neutral-400 hidden sm:inline">
            Now hiring: Full-Time Openings, 3-Month PPO Fellowships & 15-Day Fast-Track Internship Certification.
          </span>
          <button
            id="nav-banner-apply-now"
            onClick={onOpenWaitlistModal || (() => handleSelectCareerOption('openings'))}
            className="text-cyan-300 hover:text-white font-semibold underline underline-offset-2 ml-1 text-xs cursor-pointer inline-flex items-center gap-1 group transition-colors"
          >
            <span>Join Products Waitlist</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <div className="w-full max-w-360 mx-auto px-3 sm:px-4 lg:px-6 h-16 flex items-center justify-between flex-nowrap gap-2">
        {/* Brand Logo with ambient hover glow */}
        <div 
          id="nav-brand-logo"
          onClick={() => onSelectTab('home')}
          className="cursor-pointer group select-none flex items-center p-1 rounded-xl transition-transform hover:scale-[1.02] shrink-0"
        >
          <TensorsparkLogo size="md" showText={true} subtitle="DYNAMICS" animated={true} />
        </div>

        {/* Desktop Navigation Links with Individual Link Themed Backgrounds - Single Unbroken Line */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-neutral-900/80 backdrop-blur-md p-1 xl:p-1.5 rounded-2xl border border-neutral-800/90 shadow-inner shrink-0 flex-nowrap">
          {navItems.map((item) => {
            const Icon = item.icon;
            const theme = item.theme;

            // 1. CAREER DROPDOWN - Single Unified Pill with Smooth Hover & Click
            if (item.type === 'career') {
              return (
                <div 
                  key={item.id} 
                  className="relative group shrink-0" 
                  ref={careerDropdownRef}
                  onMouseEnter={() => setCareerDropdownOpen(true)}
                  onMouseLeave={() => setCareerDropdownOpen(false)}
                >
                  <button
                    id="nav-link-careers"
                    onClick={() => handleSelectCareerOption((selectedCareerOption || 'openings') as CareerOption)}
                    className={`relative px-2.5 xl:px-3 py-1.5 rounded-xl text-[11px] xl:text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer border whitespace-nowrap ${
                      isCareerActive
                        ? theme.activeBg
                        : theme.idleBg
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 transition-colors ${isCareerActive ? theme.activeIcon : 'text-neutral-400'}`} />
                    <span>{item.label}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${careerDropdownOpen ? 'rotate-180 text-emerald-300' : isCareerActive ? theme.activeIcon : 'text-neutral-400'}`} />
                    {isCareerActive && (
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 ${theme.activeGlow} rounded-full`} />
                    )}
                  </button>

                  {/* Invisible hover bridge to prevent premature closing */}
                  <div className="absolute top-full left-0 w-full h-2 z-40" />

                  {/* Career Nested Dropdown (3 Options) */}
                  {careerDropdownOpen && (
                    <div className="absolute top-[calc(100%+6px)] left-0 w-92 p-2.5 rounded-2xl bg-neutral-950/95 border border-emerald-500/30 shadow-2xl shadow-emerald-950/50 backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-2.5 py-1.5 mb-1.5 flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
                        <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          3 Career & Internship Pathways
                        </span>
                        <span className="text-neutral-400">Select Pathway</span>
                      </div>

                      <div className="space-y-1.5">
                        {careerSublinks.map((sub) => {
                          const SubIcon = sub.icon;
                          const isSubActive = isCareerActive && selectedCareerOption === sub.id;
                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => handleSelectCareerOption(sub.id)}
                              className={`w-full p-2.5 rounded-xl text-left flex items-start gap-2.5 transition-all cursor-pointer border ${
                                isSubActive
                                  ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-200 shadow-sm shadow-emerald-500/10'
                                  : 'hover:bg-neutral-900/90 text-neutral-300 border-transparent hover:border-neutral-800'
                              }`}
                            >
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                                isSubActive ? 'bg-emerald-400 text-neutral-950 font-bold' : 'bg-neutral-900 ' + sub.highlightColor
                              }`}>
                                <SubIcon className="w-4 h-4" />
                              </div>

                              <div className="space-y-0.5 flex-1 min-w-0">
                                <div className="text-xs font-bold text-white flex items-center justify-between">
                                  <span className="truncate">{sub.title}</span>
                                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-emerald-300 shrink-0 ml-1 border border-neutral-700/60">
                                    {sub.badge}
                                  </span>
                                </div>
                                <div className="text-[11px] text-neutral-400 leading-snug line-clamp-2">
                                  {sub.desc}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            // 2. AGENCY DROPDOWN - Single Unified Pill with Smooth Hover & Click
            if (item.type === 'agency') {
              const isAgencyActive = currentTab === 'agency';
              return (
                <div 
                  key={item.id} 
                  className="relative group shrink-0" 
                  ref={agencyDropdownRef}
                  onMouseEnter={() => setAgencyDropdownOpen(true)}
                  onMouseLeave={() => setAgencyDropdownOpen(false)}
                >
                  <button
                    id="nav-link-agency"
                    onClick={() => {
                      onSelectTab('agency');
                      if (onSelectAgencyService) onSelectAgencyService('overview');
                    }}
                    className={`relative px-2.5 xl:px-3 py-1.5 rounded-xl text-[11px] xl:text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer border whitespace-nowrap ${
                      isAgencyActive
                        ? theme.activeBg
                        : theme.idleBg
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 transition-colors ${isAgencyActive ? theme.activeIcon : 'text-neutral-400'}`} />
                    <span>{item.label}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${agencyDropdownOpen ? 'rotate-180 text-rose-300' : isAgencyActive ? theme.activeIcon : 'text-neutral-400'}`} />
                    {isAgencyActive && (
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 ${theme.activeGlow} rounded-full`} />
                    )}
                  </button>

                  {/* Invisible hover bridge to prevent premature closing */}
                  <div className="absolute top-full left-0 w-full h-2 z-40" />

                  {/* Desktop Nested Dropdown Menu */}
                  {agencyDropdownOpen && (
                    <div className="absolute top-[calc(100%+6px)] left-0 w-84 p-2.5 rounded-2xl bg-neutral-950/95 border border-rose-500/30 shadow-2xl shadow-rose-950/50 backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <button
                        type="button"
                        onClick={() => handleSelectAgencySubservice('overview')}
                        className={`w-full p-2.5 rounded-xl text-left flex items-start gap-2.5 transition-colors cursor-pointer border ${
                          isAgencyActive && selectedAgencyService === 'overview'
                            ? 'bg-rose-500/15 text-rose-200 border-rose-500/40'
                            : 'hover:bg-neutral-900 text-neutral-300 border-transparent'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center shrink-0 mt-0.5">
                          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>Agency Growth Hub Overview</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-800 text-rose-400">All-in-One</span>
                          </div>
                          <div className="text-[11px] text-neutral-400">
                            Full capabilities, ROI calculator, and client case studies
                          </div>
                        </div>
                      </button>

                      <div className="my-1.5 border-t border-neutral-800 px-2 py-1 flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                        <span className="text-rose-400 font-semibold">7 Specialized Practices</span>
                      </div>

                      <div className="space-y-1 max-h-95 overflow-y-auto pr-1">
                        {agencySublinks.map((sub) => {
                          const SubIcon = sub.icon;
                          const isSubActive = isAgencyActive && selectedAgencyService === sub.id;
                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => handleSelectAgencySubservice(sub.id)}
                              className={`w-full p-2 rounded-xl text-left flex items-start gap-2.5 transition-colors cursor-pointer border ${
                                isSubActive
                                  ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                                  : 'hover:bg-neutral-900 text-neutral-300 border-transparent'
                              }`}
                            >
                              <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                                isSubActive ? 'bg-rose-400 text-neutral-950 font-bold' : 'bg-neutral-900 text-rose-400'
                              }`}>
                                <SubIcon className="w-3.5 h-3.5" />
                              </div>
                              <div className="space-y-0.5 flex-1 min-w-0">
                                <div className="text-xs font-semibold text-white flex items-center justify-between">
                                  <span className="truncate">{sub.title}</span>
                                  {isSubActive && <Check className="w-3 h-3 text-rose-400" />}
                                </div>
                                <div className="text-[10px] text-neutral-400 truncate">
                                  {sub.desc}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            // 3. REGULAR NAV ITEMS (Home, About, Products, Tracker, Analytics)
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`relative px-2.5 xl:px-3 py-1.5 rounded-xl text-[11px] xl:text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer border shrink-0 whitespace-nowrap ${
                  isActive
                    ? theme.activeBg
                    : theme.idleBg
                }`}
              >
                <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? theme.activeIcon : 'text-neutral-400'}`} />
                <span>{item.label}</span>
                {isActive && (
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 ${theme.activeGlow} rounded-full`} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons: Waiting List for New Products, Login, and Sign Up */}
        <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0 flex-nowrap">
          {/* Waiting List for New Products with prominent glow */}
          <button
            id="nav-waitlist-btn"
            onClick={() => onOpenWaitlistModal?.()}
            className="px-2.5 xl:px-3.5 py-1.5 rounded-xl text-[11px] xl:text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-950/50 hover:bg-cyan-900/70 border border-cyan-500/40 hover:border-cyan-400/80 shadow-[0_0_12px_rgba(6,182,212,0.15)] hover:shadow-[0_0_18px_rgba(6,182,212,0.3)] transition-all flex items-center gap-1.5 cursor-pointer group shrink-0 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden 2xl:inline">Waiting List for New Products</span>
            <span className="2xl:hidden">Join Waitlist</span>
          </button>

          {currentUser ? (
            <div className="flex items-center gap-1.5 pl-2 border-l border-neutral-800 shrink-0 flex-nowrap">
              <button
                id="nav-user-account-btn"
                onClick={() => onSelectTab('account')}
                title="Open Account & Work Monitor"
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                  currentTab === 'account'
                    ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 shadow-sm shadow-cyan-500/10'
                    : 'bg-neutral-900 hover:bg-neutral-850 border-neutral-800 text-neutral-300 hover:text-white'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-[10px] border border-cyan-500/30">
                  {currentUser.name.charAt(0).toUpperCase()}
                </span>
                <span className="text-xs font-semibold max-w-22.5 truncate">{currentUser.name}</span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800/60 hidden 2xl:inline">
                  Work Monitor
                </span>
              </button>
              <button
                id="nav-user-logout-btn"
                onClick={onLogout}
                title="Sign Out"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-neutral-900 transition-colors cursor-pointer shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 shrink-0 flex-nowrap">
              {/* Login Link */}
              <button
                id="nav-login-btn"
                onClick={() => onOpenAuthModal?.('login')}
                className="px-2.5 xl:px-3 py-1.5 text-[11px] xl:text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-900/80 rounded-xl border border-transparent hover:border-neutral-800 transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap"
              >
                <LogIn className="w-3.5 h-3.5 text-neutral-400" />
                <span>Login</span>
              </button>

              {/* Sign Up Link / Button */}
              <button
                id="nav-signup-btn"
                onClick={() => onOpenAuthModal?.('signup')}
                className="px-2.5 xl:px-3.5 py-1.5 rounded-xl text-[11px] xl:text-xs font-semibold text-neutral-950 bg-linear-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white shadow-[0_0_15px_rgba(6,182,212,0.35)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all flex items-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5 shrink-0 whitespace-nowrap"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            id="btn-mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-drawer"
          className="lg:hidden bg-neutral-950/95 border-b border-neutral-800 px-4 pt-2 pb-6 space-y-3 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 max-h-[85vh] overflow-y-auto"
        >
          <div className="grid grid-cols-1 gap-1.5 pt-1">
            {/* Home with Cyan Tint */}
            <button
              onClick={() => { onSelectTab('home'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                currentTab === 'home' 
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 shadow-sm shadow-cyan-500/10' 
                  : 'bg-neutral-900/50 hover:bg-cyan-950/30 text-neutral-300 border-neutral-800/80'
              }`}
            >
              <Cpu className="w-4 h-4 text-cyan-400" /> <span>Home</span>
            </button>

            {/* About (Founders & Leadership) with Teal Tint */}
            <button
              onClick={() => { onSelectTab('about'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                currentTab === 'about' 
                  ? 'bg-teal-500/15 border-teal-500/40 text-teal-300 shadow-sm shadow-teal-500/10' 
                  : 'bg-neutral-900/50 hover:bg-teal-950/30 text-neutral-300 border-neutral-800/80'
              }`}
            >
              <Users className="w-4 h-4 text-teal-400" /> <span>About & Founders</span>
            </button>

            {/* AI Products with Violet Tint */}
            <button
              onClick={() => { onSelectTab('products'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                currentTab === 'products' 
                  ? 'bg-violet-500/15 border-violet-500/40 text-violet-300 shadow-sm shadow-violet-500/10' 
                  : 'bg-neutral-900/50 hover:bg-violet-950/30 text-neutral-300 border-neutral-800/80'
              }`}
            >
              <Layers className="w-4 h-4 text-violet-400" /> <span>AI Products</span>
            </button>

            {/* Careers (Expandable Mobile Accordion with Emerald Tint) */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    handleSelectCareerOption('openings');
                  }}
                  className={`flex-1 flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                    isCareerActive 
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-sm shadow-emerald-500/10' 
                      : 'bg-neutral-900/50 hover:bg-emerald-950/30 text-neutral-300 border-neutral-800/80'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  <span>Careers (3 Pathways)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMobileCareerExpanded(!mobileCareerExpanded)}
                  className="p-2.5 rounded-xl text-neutral-400 hover:text-white bg-neutral-900/60 border border-neutral-800 ml-1"
                  aria-label="Toggle career options"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileCareerExpanded ? 'rotate-180 text-emerald-400' : ''}`} />
                </button>
              </div>

              {mobileCareerExpanded && (
                <div className="pl-4 pr-2 py-2 space-y-1 bg-neutral-900/60 rounded-xl border border-emerald-500/30">
                  {careerSublinks.map((sub) => {
                    const SubIcon = sub.icon;
                    const isSubActive = isCareerActive && selectedCareerOption === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => handleSelectCareerOption(sub.id)}
                        className={`w-full text-left py-2 px-2.5 text-xs rounded-lg flex items-center justify-between border ${
                          isSubActive 
                            ? 'bg-emerald-500/20 text-emerald-300 font-bold border-emerald-500/40' 
                            : 'text-neutral-300 hover:bg-neutral-800 border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <SubIcon className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{sub.title}</span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-400">{sub.badge}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            

            {/* Contact Us with Cyan Tint */}
            <button
              onClick={() => { onSelectTab('contact'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                currentTab === 'contact' 
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 shadow-sm shadow-cyan-500/10' 
                  : 'bg-neutral-900/50 hover:bg-cyan-950/30 text-neutral-300 border-neutral-800/80'
              }`}
            >
              <MapPin className="w-4 h-4 text-cyan-400" /> <span>Contact Us</span>
            </button>

            {/* Agency & Services with Rose Tint */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    onSelectTab('agency');
                    if (onSelectAgencyService) onSelectAgencyService('overview');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex-1 flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                    currentTab === 'agency' 
                      ? 'bg-rose-500/15 border-rose-500/40 text-rose-300 shadow-sm shadow-rose-500/10' 
                      : 'bg-neutral-900/50 hover:bg-rose-950/30 text-neutral-300 border-neutral-800/80'
                  }`}
                >
                  <Megaphone className="w-4 h-4 text-rose-400" />
                  <span>Agency & Services</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMobileAgencyExpanded(!mobileAgencyExpanded)}
                  className="p-2.5 rounded-xl text-neutral-400 hover:text-white bg-neutral-900/60 border border-neutral-800 ml-1"
                  aria-label="Toggle agency options"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileAgencyExpanded ? 'rotate-180 text-rose-400' : ''}`} />
                </button>
              </div>

              {mobileAgencyExpanded && (
                <div className="pl-4 pr-2 py-2 space-y-1 bg-neutral-900/60 rounded-xl border border-rose-500/30">
                  <button
                    onClick={() => handleSelectAgencySubservice('overview')}
                    className="w-full text-left py-2 px-2.5 text-xs text-rose-300 font-semibold rounded-lg hover:bg-neutral-800 flex items-center justify-between"
                  >
                    <span>• Agency Overview Hub</span>
                  </button>
                  {agencySublinks.map((sub) => {
                    const SubIcon = sub.icon;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => handleSelectAgencySubservice(sub.id)}
                        className="w-full text-left py-2 px-2.5 text-xs rounded-lg flex items-center gap-2 text-neutral-300 hover:bg-neutral-800"
                      >
                        <SubIcon className="w-3.5 h-3.5 text-rose-400" />
                        <span>{sub.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Analytics Suite with Blue Tint */}
            <button
              onClick={() => { onSelectTab('analytics'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                currentTab === 'analytics' 
                  ? 'bg-blue-500/15 border-blue-500/40 text-blue-300 shadow-sm shadow-blue-500/10' 
                  : 'bg-neutral-900/50 hover:bg-blue-950/30 text-neutral-300 border-neutral-800/80'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-blue-400" /> <span>Analytics Suite</span>
            </button>
          </div>

          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
            {/* Waiting List for New Products */}
            <button
              id="mobile-nav-waitlist-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWaitlistModal?.();
              }}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-cyan-300 bg-cyan-950/70 border border-cyan-500/40 hover:bg-cyan-900/80 flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-[0_0_12px_rgba(6,182,212,0.2)]"
            >
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Waiting List for New Products</span>
            </button>

            {currentUser ? (
              <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs border border-cyan-500/30">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">{currentUser.name}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">{currentUser.email}</div>
                  </div>
                </div>
                <button
                  id="mobile-nav-logout-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout?.();
                  }}
                  className="px-2 py-1 rounded-lg text-xs text-red-400 hover:bg-neutral-800 flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="mobile-nav-login-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal?.('login');
                  }}
                  className="py-2.5 rounded-xl text-xs font-semibold text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Login</span>
                </button>
                <button
                  id="mobile-nav-signup-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal?.('signup');
                  }}
                  className="py-2.5 rounded-xl text-xs font-semibold text-neutral-950 bg-linear-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
