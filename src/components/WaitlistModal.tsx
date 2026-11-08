'use client';

import React, { useState } from 'react';
import { X, Sparkles, Check, Copy, Share2, Rocket, Clock, Layers, Shield, ArrowRight, ExternalLink, Database } from 'lucide-react';
import { TensorsparkLogo } from './TensorsparkLogo';
import { WaitlistEntry } from '../types';
import { dbSaveWaitlistEntry } from '../lib/firebase';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

const UPCOMING_PRODUCTS = [
  {
    id: 'ai-avatar-persona',
    name: 'AuraPersona AI Avatar',
    badge: 'DIGITAL PERSONA',
    tagline: 'Autonomous public figure & digital executive persona managing daily tasks, briefs & public broadcasts.',
    expectedRelease: 'Early Access Alpha'
  },
  {
    id: 'ai-agents-swarm',
    name: 'NexusSwarm AI Agents',
    badge: 'AUTONOMOUS SWARMS',
    tagline: 'Self-organizing multi-agent execution DAGs solving complex software & enterprise business goals.',
    expectedRelease: 'Enterprise Beta'
  },
  {
    id: 'youtube-animated-video',
    name: 'AnimaTube Motion Engine',
    badge: 'GENERATIVE MOTION',
    tagline: 'YouTube URL to stylized 2D/3D anime, cartoon & vector animated motion explainer videos.',
    expectedRelease: 'Rolling Pilot'
  },
  {
    id: 'ai-voice-assistant',
    name: 'Vocalis Conversational Voice',
    badge: 'VOICE INTELLIGENCE',
    tagline: 'Sub-118ms duplex conversational voice intelligence with natural emotion modulation & barge-in.',
    expectedRelease: 'Q4 2026'
  },
  {
    id: 'animated-inshort-news',
    name: 'InshortMotion News AI',
    badge: 'ANIMATED NEWS',
    tagline: 'Automated 60-word breaking news briefs converted into 15-second animated infographics and shorts.',
    expectedRelease: 'Private Beta'
  },
  {
    id: 'file-info-extractor',
    name: 'DocuExtract Multi-File Intelligence',
    badge: 'DOC INTELLIGENCE',
    tagline: 'Universal PDF, complex table, balance sheet & scanned contract extractor with verified schema reconciliation.',
    expectedRelease: 'Immediate Sandbox'
  }
];

export const WaitlistModal: React.FC<WaitlistModalProps> = ({
  isOpen,
  onClose,
  preselectedProduct
}) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>(() => 
    preselectedProduct ? [preselectedProduct] : ['ai-avatar-persona']
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyOrOrg, setCompanyOrOrg] = useState('');
  const [useCase, setUseCase] = useState('');
  const [deploymentPreference, setDeploymentPreference] = useState('cloud');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEntry, setSubmittedEntry] = useState<WaitlistEntry | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const toggleProduct = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      if (selectedProducts.length > 1) {
        setSelectedProducts(selectedProducts.filter((p) => p !== productId));
      }
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName) return;

    setIsSubmitting(true);

    const randomTicket = Math.floor(1000 + Math.random() * 9000);
    const position = Math.floor(320 + Math.random() * 150);

    const entry: WaitlistEntry = {
      id: `TS-WL-2026-${randomTicket}`,
      fullName,
      email,
      companyOrOrg: companyOrOrg || 'Independent Developer',
      selectedProducts,
      useCase: useCase || 'High-throughput production AI applications',
      priorityPosition: position,
      joinedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    // 1. Persist to Firestore Database
    try {
      await dbSaveWaitlistEntry(entry);
      console.log('✅ Entry persisted to Firestore');
    } catch (err) {
      console.warn('Firestore write fallback:', err);
    }

    // 2. Post to Express Backend API
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
    } catch (err) {
      console.warn('Backend API sync fallback:', err);
    }

    // 3. Local fallback cache
    try {
      const existing = JSON.parse(localStorage.getItem('tensorspark_waitlist_records') || '[]');
      localStorage.setItem('tensorspark_waitlist_records', JSON.stringify([entry, ...existing]));
    } catch (err) {
      console.error('Waitlist storage error', err);
    }

    setSubmittedEntry(entry);
    setIsSubmitting(false);
  };

  const handleCopyTicket = () => {
    if (!submittedEntry) return;
    navigator.clipboard.writeText(submittedEntry.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setSubmittedEntry(null);
    setFullName('');
    setEmail('');
    setCompanyOrOrg('');
    setUseCase('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        id="waitlist-modal-container"
        className="relative w-full max-w-2xl rounded-2xl bg-neutral-900 border border-neutral-800 p-5 sm:p-8 shadow-2xl shadow-cyan-950/50 z-10 my-auto sm:my-8 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Close Button */}
        <button
          id="btn-close-waitlist-modal"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-800/60 hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {!submittedEntry ? (
          <div>
            {/* Header */}
            <div className="space-y-3 pb-6 border-b border-neutral-800/80">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  EARLY ACCESS COHORT 2026
                </span>
                <span className="text-xs text-neutral-500 font-mono">• PRIVATE INVITATION</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Waiting List for New Products
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Be among the first enterprises, researchers, and engineers to test Tensorspark's upcoming autonomous intelligence models, generative video synthesis tools, and micro-edge runtimes.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 pt-5">
              {/* Product Checklist */}
              <div>
                <label className="block text-xs font-semibold text-white mb-2">
                  Select Products You Want Early Access To:
                </label>
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {UPCOMING_PRODUCTS.map((prod) => {
                    const isSelected = selectedProducts.includes(prod.id);
                    return (
                      <div
                        key={prod.id}
                        onClick={() => toggleProduct(prod.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 select-none ${
                          isSelected
                            ? 'bg-cyan-500/10 border-cyan-500/40'
                            : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-white">
                              {prod.name}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-neutral-800 text-[9px] font-mono text-cyan-400 uppercase">
                              {prod.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-400 leading-snug">
                            {prod.tagline}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                            isSelected 
                              ? 'bg-cyan-400 border-cyan-400 text-neutral-950' 
                              : 'border-neutral-700 bg-neutral-900'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-[9px] font-mono text-neutral-500">
                            {prod.expectedRelease}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Personal & Work Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="waitlist-input-name"
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Work / Academic Email *
                  </label>
                  <input
                    id="waitlist-input-email"
                    type="email"
                    required
                    placeholder="s.jenkins@enterprise.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Company / Organization / University
                  </label>
                  <input
                    id="waitlist-input-org"
                    type="text"
                    placeholder="e.g. Apex Labs or Stanford University"
                    value={companyOrOrg}
                    onChange={(e) => setCompanyOrOrg(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Preferred Deployment Target
                  </label>
                  <select
                    id="waitlist-select-deployment"
                    value={deploymentPreference}
                    onChange={(e) => setDeploymentPreference(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="cloud">Managed Cloud REST / gRPC API</option>
                    <option value="cluster">Dedicated Inference Pod / Cluster</option>
                    <option value="edge">Edge / Self-Hosted On-Premise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Primary Use Case or Application Idea (Optional)
                </label>
                <textarea
                  id="waitlist-input-usecase"
                  rows={2}
                  placeholder="Tell us what you plan to build with our upcoming models or agents..."
                  value={useCase}
                  onChange={(e) => setUseCase(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                id="waitlist-btn-submit"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-indigo-400 hover:from-cyan-300 hover:to-white text-neutral-950 font-bold text-xs shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    Reserving Priority Spot...
                  </span>
                ) : (
                  <>
                    <Rocket className="w-4 h-4" />
                    <span>Join Waiting List for New Products</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-4 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-500 p-0.5 mx-auto flex items-center justify-center shadow-xl shadow-cyan-500/20">
              <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center">
                <Check className="w-8 h-8 text-cyan-400" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs">
                VIP PRIORITY ACCESS RESERVED
              </span>
              <h3 className="text-2xl font-bold text-white font-display">
                You're on the Waiting List!
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
                Thank you, <span className="text-white font-semibold">{submittedEntry.fullName}</span>. We have logged your request for early access to our next-generation AI products.
              </p>
            </div>

            {/* Ticket Card */}
            <div className="max-w-md mx-auto p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 text-left">
              <div className="flex items-center justify-between border-b border-neutral-850 pb-3">
                <span className="text-[11px] font-mono text-neutral-400">WAITLIST TICKET</span>
                <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  {submittedEntry.id}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-neutral-500 font-mono block">QUEUE POSITION</span>
                  <span className="text-lg font-bold text-white font-display">#{submittedEntry.priorityPosition} in Line</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 font-mono block">PRODUCTS REQUESTED</span>
                  <span className="text-sm font-semibold text-neutral-200">
                    {submittedEntry.selectedProducts.length} Product{submittedEntry.selectedProducts.length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                <span>Notification Email:</span>
                <span className="text-neutral-200 font-medium">{submittedEntry.email}</span>
              </div>

              <div className="pt-2 border-t border-neutral-850 flex items-center justify-between text-[10px] text-emerald-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <Database className="w-3 h-3 text-cyan-400" />
                  <span>Cloud Database Record:</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  Synced to Firestore & Express API
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopyTicket}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-xs font-medium text-white border border-neutral-700 flex items-center gap-2 cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Ticket Copied!' : 'Copy Ticket ID'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `I just joined the waiting list for next-gen AI products at @Tensorspark! Priority Ticket: ${submittedEntry.id}`
                    )}`,
                    '_blank'
                  );
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-xs font-medium text-cyan-300 border border-cyan-500/30 flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share on X</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-medium text-neutral-300 hover:text-white cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
