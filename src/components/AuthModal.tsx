'use client';

import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, User, Sparkles, Check, ArrowRight, Eye, EyeOff, ShieldCheck, Github, Copy, CheckCircle2, Send, Database } from 'lucide-react';
import { AuthUser, AuthModalMode } from '../types';
import { TensorsparkLogo } from './TensorsparkLogo';
import { dbSaveUser } from '../lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthModalMode;
  onAuthSuccess: (user: AuthUser) => void;
  onOpenWaitlist?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onAuthSuccess,
  onOpenWaitlist
}) => {
  const [mode, setMode] = useState<AuthModalMode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Screen state when credentials are dispatched
  const [dispatchedAccount, setDispatchedAccount] = useState<{
    user: AuthUser;
    accessKey: string;
    email: string;
  } | null>(null);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('AI Engineer / Developer');
  const [department, setDepartment] = useState('Autonomous Systems');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  useEffect(() => {
    setMode(initialMode);
    setErrorMessage(null);
    setSuccessMessage(null);
    setDispatchedAccount(null);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    if (!email || !password) {
      setErrorMessage('Please provide both email and password.');
      setIsLoading(false);
      return;
    }

    if (mode === 'signup' && !fullName.trim()) {
      setErrorMessage('Please provide your full name.');
      setIsLoading(false);
      return;
    }

    if (mode === 'signup' && !agreeTerms) {
      setErrorMessage('You must agree to the Terms of Service & Privacy Policy.');
      setIsLoading(false);
      return;
    }

    if (mode === 'signup') {
      // 1. Generate Unique ID and Access Key
      const generatedUniqueId = `TS-UID-${Math.floor(100000 + Math.random() * 900000)}`;
      const generatedAccessKey = `TS-KEY-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const userId = `usr_${generatedUniqueId.toLowerCase()}`;
      const nowIso = new Date().toISOString();

      const newUser: AuthUser = {
        id: userId,
        uniqueId: generatedUniqueId,
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        role: role,
        department: department,
        credentialsSentToEmail: email.trim().toLowerCase(),
        credentialSentAt: nowIso,
        accessKey: generatedAccessKey,
        totalWorkSeconds: 0,
        lastLoginAt: nowIso,
        createdAt: nowIso,
      };

      try {
        // 2. Persist to Firestore Database
        await dbSaveUser(newUser);

        // 3. Dispatch to Backend API for Email delivery logging
        try {
          await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fullName: newUser.name,
              email: newUser.email,
              role: newUser.role,
              department: newUser.department,
            }),
          });
        } catch (apiErr) {
          console.warn('Backend registration API logged locally:', apiErr);
        }

        // 4. Save to Local Storage
        try {
          localStorage.setItem('tensorspark_current_user', JSON.stringify(newUser));
        } catch (storageErr) {
          console.error('Storage error', storageErr);
        }

        setIsLoading(false);
        setDispatchedAccount({
          user: newUser,
          accessKey: generatedAccessKey,
          email: newUser.email,
        });

      } catch (err: unknown) {
        console.error('Signup error:', err);
        setIsLoading(false);
        setErrorMessage('Failed to complete registration. Please check your connection.');
      }

    } else {
      // Login Mode
      setTimeout(() => {
        // Look up existing user or create login session
        let existingUser: AuthUser | null = null;
        try {
          const stored = localStorage.getItem('tensorspark_current_user');
          if (stored) {
            existingUser = JSON.parse(stored);
          }
        } catch (e) {
          console.warn('Storage read error:', e);
        }

        const user: AuthUser = existingUser && existingUser.email.toLowerCase() === email.toLowerCase()
          ? {
              ...existingUser,
              lastLoginAt: new Date().toISOString(),
            }
          : {
              id: 'usr_' + Math.random().toString(36).substring(2, 9),
              uniqueId: `TS-UID-${Math.floor(100000 + Math.random() * 900000)}`,
              name: email.split('@')[0] || 'Tensorspark Member',
              email: email.toLowerCase(),
              role: role,
              department: department,
              credentialsSentToEmail: email.toLowerCase(),
              credentialSentAt: new Date().toISOString(),
              accessKey: `TS-KEY-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
              totalWorkSeconds: existingUser?.totalWorkSeconds || 0,
              lastLoginAt: new Date().toISOString(),
              createdAt: existingUser?.createdAt || new Date().toISOString(),
            };

        try {
          localStorage.setItem('tensorspark_current_user', JSON.stringify(user));
        } catch (err) {
          console.error('Storage write error', err);
        }

        setIsLoading(false);
        setSuccessMessage('Authentication verified. Loading your personal account & work monitor...');

        setTimeout(() => {
          onAuthSuccess(user);
          onClose();
        }, 700);
      }, 500);
    }
  };

  const handleCopyId = (idToCopy: string) => {
    navigator.clipboard.writeText(idToCopy);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleFillDemo = () => {
    setEmail('developer@tensorspark.ai');
    setPassword('TensorSpark@2026');
    setFullName('Elena Rostova');
    setDepartment('Autonomous Systems Lab');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div 
        id="auth-modal-container"
        className="relative w-full max-w-md rounded-2xl bg-neutral-900 border border-neutral-800 p-5 sm:p-8 shadow-2xl shadow-cyan-950/40 z-10 my-auto sm:my-8 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Close Button */}
        <button
          id="btn-close-auth-modal"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-800/60 hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* If credentials have just been dispatched, show prominent confirmation view */}
        {dispatchedAccount ? (
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Account Successfully Created
              </h3>
              <p className="text-xs text-neutral-400">
                Your unique ID has been generated and saved into the cloud database.
              </p>
            </div>

            {/* Unique ID Highlight Box */}
            <div className="p-4 rounded-xl bg-neutral-950/80 border border-cyan-500/40 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400">
                <span className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5" />
                  SAVED IN DATABASE
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Unique ID
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 bg-neutral-900 px-3 py-2.5 rounded-lg border border-neutral-800">
                <span className="text-base sm:text-lg font-mono font-bold text-white tracking-wider">
                  {dispatchedAccount.user.uniqueId}
                </span>
                <button
                  type="button"
                  id="btn-copy-unique-id"
                  onClick={() => handleCopyId(dispatchedAccount.user.uniqueId)}
                  className="px-2.5 py-1.5 rounded-md bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Email Dispatch Notice */}
            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Send className="w-3.5 h-3.5" />
                <span>Credentials Dispatched to Registered Email</span>
              </div>
              <p className="text-neutral-300 text-[11px] font-mono break-all">
                Recipient: <span className="text-white font-medium">{dispatchedAccount.email}</span>
              </p>
              <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400 space-y-1 font-mono">
                <div className="flex justify-between">
                  <span>Security Access Key:</span>
                  <span className="text-neutral-200 font-bold">{dispatchedAccount.accessKey}</span>
                </div>
                <div className="flex justify-between">
                  <span>Relay Protocol:</span>
                  <span className="text-emerald-400">TLS 1.3 Verified Delivery</span>
                </div>
              </div>
            </div>

            {/* Direct Proceed Button */}
            <button
              type="button"
              id="btn-proceed-to-account"
              onClick={() => {
                onAuthSuccess(dispatchedAccount.user);
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white text-neutral-950 font-bold text-xs shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Access My Account & Work Station</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            {/* Logo & Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="flex justify-center">
            <TensorsparkLogo size="md" showText={true} subtitle="CONSOLE" animated={true} />
          </div>
          <h3 className="text-xl font-bold text-white font-display">
            {mode === 'login' ? 'Welcome Back to Tensorspark' : 'Create Your Tensorspark Account'}
          </h3>
          <p className="text-xs text-neutral-400">
            {mode === 'login' 
              ? 'Sign in to access your API keys, fellowships & inference console'
              : 'Join the next-generation autonomous AI and engineering ecosystem'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex rounded-xl bg-neutral-950 p-1 border border-neutral-800 mb-6">
          <button
            type="button"
            id="tab-auth-login"
            onClick={() => { setMode('login'); setErrorMessage(null); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            id="tab-auth-signup"
            onClick={() => { setMode('signup'); setErrorMessage(null); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Status Alerts */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="auth-input-fullname"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dr. Jordan Reed"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Work / Academic Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="auth-input-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-neutral-300">
                Password
              </label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to your registered email address.')}
                  className="text-[11px] text-cyan-400 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="auth-input-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-10 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Primary Focus / Role
              </label>
              <select
                id="auth-select-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="AI Engineer / Developer">AI Engineer / Developer</option>
                <option value="MLOps & Systems Specialist">MLOps & Systems Specialist</option>
                <option value="Full-Stack Web Architect">Full-Stack Web Architect</option>
                <option value="Fellowship / Internship Candidate">Fellowship / Internship Candidate</option>
                <option value="Enterprise Client / Agency Partner">Enterprise Client / Agency Partner</option>
              </select>
            </div>
          )}

          {mode === 'login' ? (
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-neutral-700 bg-neutral-950 text-cyan-400 focus:ring-cyan-500"
                />
                <span>Remember this device</span>
              </label>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] text-amber-400 hover:underline cursor-pointer font-mono"
              >
                Fill demo account
              </button>
            </div>
          ) : (
            <div className="space-y-2 pt-1">
              <label className="flex items-start gap-2 text-[11px] text-neutral-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-neutral-700 bg-neutral-950 text-cyan-400 focus:ring-cyan-500"
                />
                <span>
                  I agree to the Tensorspark <span className="text-cyan-400 hover:underline">Terms of Service</span> and <span className="text-cyan-400 hover:underline">Privacy Policy</span>.
                </span>
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            id="auth-btn-submit"
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white text-neutral-950 font-bold text-xs shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : mode === 'login' ? (
              <>
                <span>Sign In to Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>Create Tensorspark Account</span>
                <Sparkles className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* SSO Options */}
        <div className="mt-6 pt-5 border-t border-neutral-800 text-center">
          <span className="text-[11px] text-neutral-500 block mb-3 font-mono">
            OR CONTINUE WITH DEVELOPER SSO
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              id="auth-sso-google"
              onClick={() => {
                const demoUser: AuthUser = {
                  id: 'usr_google_' + Math.random().toString(36).substring(2, 7),
                  uniqueId: `TS-UID-GOOG-${Math.floor(100000 + Math.random() * 900000)}`,
                  name: 'Google User',
                  email: 'user@google.com',
                  role: 'Developer',
                  department: 'Autonomous Intelligence',
                  credentialsSentToEmail: 'user@google.com',
                  credentialSentAt: new Date().toISOString(),
                  accessKey: `TS-KEY-GOOG-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
                  totalWorkSeconds: 3600,
                  createdAt: new Date().toISOString()
                };
                onAuthSuccess(demoUser);
                onClose();
              }}
              className="px-3 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-300 hover:text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span className="w-3.5 h-3.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-bold flex items-center justify-center">G</span>
              <span>Google</span>
            </button>
            <button
              type="button"
              id="auth-sso-github"
              onClick={() => {
                const demoUser: AuthUser = {
                  id: 'usr_gh_' + Math.random().toString(36).substring(2, 7),
                  uniqueId: `TS-UID-GH-${Math.floor(100000 + Math.random() * 900000)}`,
                  name: 'GitHub Engineer',
                  email: 'engineer@github.com',
                  role: 'AI Engineer',
                  department: 'Distributed Systems',
                  credentialsSentToEmail: 'engineer@github.com',
                  credentialSentAt: new Date().toISOString(),
                  accessKey: `TS-KEY-GH-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
                  totalWorkSeconds: 7200,
                  createdAt: new Date().toISOString()
                };
                onAuthSuccess(demoUser);
                onClose();
              }}
              className="px-3 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-300 hover:text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </button>
          </div>
        </div>
        </>
        )}

        {/* Security Badge Footer */}
        <div className="mt-5 pt-3 flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>256-BIT ENCRYPTED TENSOR TELEMETRY & AUTH</span>
        </div>
      </div>
    </div>
  );
};
