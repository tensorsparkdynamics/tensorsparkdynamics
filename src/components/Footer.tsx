'use client';

import React, { useState } from 'react';
import { TabView, AgencyServiceId, CareerOption } from '../types';
import { TensorsparkLogo } from './TensorsparkLogo';
import { 
  Cpu, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Code2, 
  Layout, 
  Video, 
  Bot, 
  Image as ImageIcon, 
  Megaphone, 
  Briefcase,
  Instagram,
  Linkedin,
  Twitter,
  Clock,
  LogIn,
  UserPlus,
  MapPin,
  FileText
} from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: TabView) => void;
  onOpenApply: () => void;
  onSelectAgencyService?: (service: AgencyServiceId | 'overview') => void;
  onSelectCareerOption?: (option: CareerOption) => void;
  onOpenWaitlist?: () => void;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onSelectTab, 
  onOpenApply,
  onSelectAgencyService,
  onSelectCareerOption,
  onOpenWaitlist,
  onOpenAuth
}) => {

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
  };

  const handleNavAgency = (serviceId: AgencyServiceId | 'overview') => {
    onSelectTab('agency');
    if (onSelectAgencyService) {
      onSelectAgencyService(serviceId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavCareer = (option: CareerOption) => {
    onSelectTab('careers');
    if (onSelectCareerOption) {
      onSelectCareerOption(option);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-850 bg-neutral-950/90 relative z-10 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <TensorsparkLogo size="md" showText={true} subtitle="DYNAMICS" animated={true} />

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Architecting enterprise autonomous intelligence, accelerating the next generation of engineers through intensive 3-month fellowships, and scaling tech brands with dedicated agency practices and custom analytics.
            </p>

            {/* Corporate Headquarters & Remote Operations */}
            <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-neutral-300 space-y-1">
              <div className="flex items-center gap-2 text-white font-semibold text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Bengaluru Headquarters & Remote Labs</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-snug pl-5">
                Indiranagar Tech Boulevard, 100 Feet Road, Bengaluru - 560038, Karnataka, India
              </p>
              <p className="text-[10px] text-cyan-300 font-mono pl-5">
                • 100% Remote-First Internships & Engineering Fellowships
              </p>
              <div className="pl-5 pt-1">
                <button
                  onClick={() => onSelectTab('contact')}
                  className="text-cyan-400 hover:text-cyan-300 text-[10px] font-mono flex items-center gap-1 cursor-pointer"
                >
                  <span>Contact & Office Details →</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational • p95 API Latency: 18ms</span>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-[11px] font-mono text-neutral-300 block mb-1.5">
                Join Tech Leaders Newsletter:
              </span>
              {subscribed ? (
                <div className="text-emerald-400 font-mono text-xs flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" /> Subscribed to monthly technical reports.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-xs">
                  <input
                    type="email"
                    required
                    placeholder="engineer@company.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-neutral-950 rounded-lg font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>

            {/* Social Media Links: Instagram, LinkedIn, X */}
            <div className="pt-3">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-2 font-medium">
                Official Channels & Socials:
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  id="footer-social-instagram"
                  href="https://www.instagram.com/tensorspark.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-pink-500/50 text-neutral-400 hover:text-pink-400 flex items-center gap-2 transition-all group cursor-pointer"
                  title="Follow Tensorspark on Instagram"
                  aria-label="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                  <span className="text-[11px] font-medium hidden sm:inline">Instagram</span>
                </a>

                <a
                  id="footer-social-linkedin"
                  href="https://www.linkedin.com/company/tensorspark-dynamics/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-sky-500/50 text-neutral-400 hover:text-sky-400 flex items-center gap-2 transition-all group cursor-pointer"
                  title="Connect with Tensorspark on LinkedIn"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                  <span className="text-[11px] font-medium hidden sm:inline">LinkedIn</span>
                </a>

                <a
                  id="footer-social-x"
                  href="https://x.com/tensorspark_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-400 text-neutral-400 hover:text-white flex items-center gap-2 transition-all group cursor-pointer"
                  title="Follow Tensorspark on X (@tensorspark)"
                  aria-label="X (formerly Twitter)"
                >
                  <Twitter className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                  <span className="text-[11px] font-medium hidden sm:inline">X</span>
                </a>
              </div>
            </div>
          </div>

          {/* Agency Nested Services Col */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase font-mono tracking-wider text-[11px] flex items-center gap-1.5">
              <Megaphone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Agency Services</span>
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavAgency('overview')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Agency Growth Hub Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavAgency('web-development')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Web Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavAgency('ux-ui-design')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  UX/UI Design & Systems
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavAgency('graphic-design')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Graphic Designing & Identity
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavAgency('ai-integration')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  AI Integration & RAG
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavAgency('ai-agents')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Autonomous AI Agents
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavAgency('photoshop')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Photoshop & Retouching
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavAgency('digital-marketing')}
                  className="hover:text-cyan-400 transition-colors text-left text-cyan-300 font-medium"
                >
                  Digital Marketing & Promotion
                </button>
              </li>
            </ul>
          </div>

          {/* Careers & Portals */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase font-mono tracking-wider text-[11px] flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
              <span>Careers & Fellowships</span>
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavCareer('openings')}
                  className="hover:text-cyan-400 transition-colors text-left flex items-center justify-between w-full"
                >
                  <span>Current Openings (16 Roles)</span>
                  <span className="text-[10px] font-mono text-cyan-400">Jobs</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavCareer('three-month')}
                  className="hover:text-cyan-400 transition-colors text-left flex items-center justify-between w-full"
                >
                  <span>3-Month Internship (PPO)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavCareer('fifteen-day')}
                  className="hover:text-indigo-400 transition-colors text-left flex items-center justify-between w-full text-indigo-300 font-medium"
                >
                  <span>15-Day Certificate Track</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('dashboard')}
                  className="hover:text-cyan-400 transition-colors text-neutral-400 text-left"
                >
                  Applicant Tracker & Sprint Reports
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions & Analytics */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase font-mono tracking-wider text-[11px]">
              Platform & Leadership
            </h4>
            <ul className="space-y-2">
              
              <li>
                <button
                  onClick={() => onSelectTab('contact')}
                  className="text-cyan-300 hover:text-cyan-200 transition-colors text-left flex items-center justify-between w-full font-medium"
                >
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Contact Us (Bengaluru HQ)</span>
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">HQ</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-about"
                  onClick={() => onSelectTab('about')}
                  className="text-teal-300 hover:text-teal-200 transition-colors text-left flex items-center justify-between w-full font-medium"
                >
                  <span>About Us & IIT Patna Founders</span>
                  <span className="text-[10px] font-mono text-teal-400">Leadership</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('products')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  AI Products & Inference Sandbox
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('analytics')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Custom Reporting Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('analytics')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Executive PDF Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavAgency('overview')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Brand ROI Calculator
                </button>
              </li>
              {onOpenWaitlist && (
                <li>
                  <button
                    id="footer-link-waitlist"
                    onClick={onOpenWaitlist}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors text-left flex items-center gap-1.5 font-medium"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Waiting List for New Products</span>
                  </button>
                </li>
              )}
              {onOpenAuth && (
                <>
                  <li>
                    <button
                      id="footer-link-login"
                      onClick={() => onOpenAuth('login')}
                      className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1.5"
                    >
                      <LogIn className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Console Log In</span>
                    </button>
                  </li>
                  <li>
                    <button
                      id="footer-link-signup"
                      onClick={() => onOpenAuth('signup')}
                      className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1.5"
                    >
                      <UserPlus className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Create Account (Sign Up)</span>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-850/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div>
            © 2026 Tensorspark DynamicsInc. All rights reserved. Enterprise AI solutions, agency practices & certified fellowships.
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Security Policy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Inference Terms</span>
            <span className="hover:text-neutral-400 cursor-pointer">SLA</span>
            <div className="flex items-center gap-3 pl-2 border-l border-neutral-800">
              <a 
                href="https://www.instagram.com/tensorspark.ai/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-pink-400 transition-colors"
                title="Instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://www.instagram.com/tensorspark.ai/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-sky-400 transition-colors"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://x.com/tensorspark_" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                title="X (Twitter)"
                aria-label="X"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
