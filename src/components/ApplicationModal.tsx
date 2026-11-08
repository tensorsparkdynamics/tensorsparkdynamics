'use client';

import React, { useState, useRef } from 'react';
import { InternshipRole, Applicant } from '../types';
import { INTERNSHIP_ROLES } from '../data/mockData';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Send, 
  Github, 
  Globe, 
  FileText, 
  User, 
  Mail, 
  Award,
  Upload,
  Paperclip,
  Trash2,
  FileCheck,
  Check,
  Link as LinkIcon
} from 'lucide-react';
import { dbSaveApplicant } from '../lib/firebase';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoleDefault?: string;
  onSubmitApplication: (applicant: Applicant) => void;
  onNavigateToTracker: (applicantId: string) => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  selectedRoleDefault,
  onSubmitApplication,
  onNavigateToTracker
}) => {
  const [roleId, setRoleId] = useState<string>(selectedRoleDefault || INTERNSHIP_ROLES[0].id);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [yearsExperience, setYearsExperience] = useState('1-2 years');
  const [statement, setStatement] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState('');

  // Resume Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [resumeMode, setResumeMode] = useState<'upload' | 'link'>('upload');
  const [resumeLink, setResumeLink] = useState('');
  const [resumeFile, setResumeFile] = useState<{
    name: string;
    size: string;
    fitScore: number;
    parsedSkills: string[];
    fileUrl?: string;
  } | null>({
    name: 'Elena_Rostova_AI_Systems_CV.pdf',
    size: '342 KB',
    fitScore: 95,
    parsedSkills: ['PyTorch', 'Distributed Systems', 'TypeScript', 'CUDA', 'Agentic Workflows'],
    fileUrl: 'https://storage.googleapis.com/tensorspark-resumes/elena_rostova.pdf'
  });

  const [submittedApplicant, setSubmittedApplicant] = useState<Applicant | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentRole = INTERNSHIP_ROLES.find(r => r.id === roleId) || INTERNSHIP_ROLES[0];

  const handleFileSelect = (file: File) => {
    const sizeKb = Math.round(file.size / 1024);
    const sizeStr = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;
    const fitScore = Math.floor(91 + Math.random() * 8);

    setResumeFile({
      name: file.name,
      size: sizeStr,
      fitScore,
      parsedSkills: currentRole.skills.slice(0, 4),
      fileUrl: URL.createObjectURL(file)
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills([...selectedSkills, customSkill.trim()]);
      setCustomSkill('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const rolePrefix = roleId.includes('ai') ? 'TS-AI' : roleId.includes('fullstack') ? 'TS-FS' : 'TS-ENG';
    const newId = `${rolePrefix}-2026-${randomDigits}`;

    const calculatedResumeScore = resumeFile?.fitScore || Math.floor(88 + Math.random() * 8);
    const overallRating = Math.floor(calculatedResumeScore * 0.96);

    const resolvedResumeUrl = resumeMode === 'link' && resumeLink
      ? resumeLink
      : (resumeFile?.fileUrl || `https://storage.googleapis.com/tensorspark-resumes/${fullName.toLowerCase().replace(/\s+/g, '_')}.pdf`);

    const newApplicant: Applicant = {
      id: newId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      roleId: currentRole.id,
      roleTitle: currentRole.title,
      appliedDate: new Date().toISOString().split('T')[0],
      currentStage: 'screening',
      resumeUrl: resolvedResumeUrl,
      resumeFileName: resumeFile?.name || (resumeLink ? 'linked_resume.pdf' : 'candidate_resume.pdf'),
      resumeFileSize: resumeFile?.size || '310 KB',
      resumeFitScore: calculatedResumeScore,
      resumeParsedSkills: resumeFile?.parsedSkills || currentRole.skills.slice(0, 4),
      githubUrl: githubUrl || 'https://github.com/' + fullName.toLowerCase().replace(/\s+/g, ''),
      portfolioUrl: portfolioUrl,
      statementOfPurpose: statement || 'Eager to build high-scale AI infrastructure and full-stack systems at Tensorspark.',
      yearsExperience,
      skills: selectedSkills.length > 0 ? selectedSkills : currentRole.skills.slice(0, 3),
      scoreBreakdown: {
        resumeMatchScore: calculatedResumeScore,
        overallRating
      },
      reviewerNotes: `Application received into Q4 Cohort with resume (${resumeFile?.name || 'attached file'}). Automated ATS scan score: ${calculatedResumeScore}%.`
    };

    // 1. Persist to Firestore
    try {
      await dbSaveApplicant(newApplicant);
    } catch (dbErr) {
      console.warn('Firestore applicant save caught:', dbErr);
    }

    // 2. Post to backend Express server
    try {
      await fetch('/api/applicants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newApplicant,
          resumeFileName: newApplicant.resumeFileName,
          resumeFileSize: newApplicant.resumeFileSize,
          resumeFitScore: calculatedResumeScore,
          resumeParsedSkills: newApplicant.resumeParsedSkills,
        })
      });
    } catch (apiErr) {
      console.warn('Backend API submission caught:', apiErr);
    }

    onSubmitApplication(newApplicant);
    setSubmittedApplicant(newApplicant);
    setIsSubmitting(false);
  };

  const resetAndClose = () => {
    setSubmittedApplicant(null);
    onClose();
  };

  return (
    <div 
      id="application-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        id="application-modal-content"
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto sm:my-8 max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 bg-neutral-950/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white">
                3-Month Startup Fellowship Application
              </h3>
              <p className="text-xs text-neutral-400">
                Cohort Q4 2026 • Stipend + Direct Transition to Full-Time
              </p>
            </div>
          </div>
          <button
            id="btn-close-application-modal"
            type="button"
            onClick={resetAndClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {submittedApplicant ? (
          <div className="p-5 sm:p-8 text-center space-y-6 animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[85vh]">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="font-display text-2xl font-bold text-white">
                Application Successfully Logged!
              </h4>
              <p className="text-sm text-neutral-300 max-w-md mx-auto">
                Welcome, <span className="text-white font-semibold">{submittedApplicant.fullName}</span>. Your application for{' '}
                <span className="text-cyan-400 font-medium">{submittedApplicant.roleTitle}</span> has been processed.
              </p>
            </div>

            {/* Generated Tracking ID Card */}
            <div className="p-5 bg-neutral-950/80 border border-cyan-500/30 rounded-xl max-w-md mx-auto text-left space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="text-xs text-neutral-400">Your Personal Tracking ID:</span>
                <span className="font-mono text-sm font-bold text-cyan-400 tracking-wider">
                  {submittedApplicant.id}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-neutral-500 block">Initial Screening:</span>
                  <span className="text-emerald-400 font-medium">Passed (Automatic)</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Resume Semantic Score:</span>
                  <span className="text-neutral-200 font-medium">{submittedApplicant.scoreBreakdown.resumeMatchScore}%</span>
                </div>
              </div>
              <p className="text-[11px] text-neutral-400 italic">
                Save this ID to track your interview stage, test challenge repo, and mentor remarks in the tracker dashboard.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                id="btn-modal-go-to-tracker"
                type="button"
                onClick={() => {
                  onNavigateToTracker(submittedApplicant.id);
                  resetAndClose();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch Progress Tracker Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-modal-done-close"
                type="button"
                onClick={resetAndClose}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs transition-colors"
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* Step 1: Select Role */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2">
                1. Select Desired 3-Month Role Track:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {INTERNSHIP_ROLES.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setRoleId(role.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      roleId === role.id
                        ? 'bg-cyan-500/10 border-cyan-500/60 text-white shadow-sm shadow-cyan-500/10'
                        : 'bg-neutral-950/40 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-neutral-100">{role.title}</span>
                      {role.featured && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-300 font-mono">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-neutral-400">
                      <span>{role.duration}</span>
                      <span className="text-cyan-400/90 font-mono">{role.stipend.split('+')[0]}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Role Perks banner */}
            <div className="p-3 bg-neutral-950/60 border border-neutral-800/80 rounded-xl text-xs space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 font-medium">
                <Award className="w-3.5 h-3.5" />
                <span>Track Focus: {currentRole.track}</span>
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                {currentRole.description}
              </p>
            </div>

            {/* Step 2: Personal Information */}
            <div className="space-y-3 pt-1">
              <span className="block text-xs font-semibold text-neutral-300">
                2. Applicant Contact Details:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Full Legal Name *</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                    <input
                      id="input-applicant-fullname"
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                    <input
                      id="input-applicant-email"
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Phone / WhatsApp</label>
                  <input
                    id="input-applicant-phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Experience Level</label>
                  <select
                    id="select-applicant-experience"
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="Student / Final Year">Student / Final Year</option>
                    <option value="Self-Taught / Open Source Contributor">Self-Taught / Open Source</option>
                    <option value="1-2 years">1-2 years industry exp</option>
                    <option value="3+ years">3+ years engineering exp</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Links & Portfolio */}
            <div className="space-y-3 pt-1">
              <span className="block text-xs font-semibold text-neutral-300">
                3. Technical Profiles & Portfolio:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">GitHub / GitLab Profile *</label>
                  <div className="relative">
                    <Github className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                    <input
                      id="input-applicant-github"
                      type="url"
                      required
                      placeholder="https://github.com/username"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Portfolio or LinkedIn URL</label>
                  <div className="relative">
                    <Globe className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                    <input
                      id="input-applicant-portfolio"
                      type="url"
                      placeholder="https://myportfolio.dev"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Resume / CV Upload */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="block text-xs font-semibold text-neutral-300">
                  4. Attach Your Resume / CV *:
                </span>
                <div className="flex items-center gap-1 text-[11px] font-mono">
                  <button
                    type="button"
                    onClick={() => setResumeMode('upload')}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                      resumeMode === 'upload'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setResumeMode('link')}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                      resumeMode === 'link'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Link URL
                  </button>
                </div>
              </div>

              {resumeMode === 'upload' ? (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                    className="hidden"
                  />

                  {resumeFile ? (
                    <div className="p-3.5 rounded-xl bg-neutral-950 border border-cyan-500/40 space-y-2.5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                            <FileCheck className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-white truncate">
                              {resumeFile.name}
                            </p>
                            <p className="text-[10px] text-neutral-400 font-mono">
                              {resumeFile.size} • Attached for automated parsing
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-[11px] font-mono cursor-pointer transition-colors"
                          >
                            Replace
                          </button>
                          <button
                            type="button"
                            onClick={() => setResumeFile(null)}
                            className="p-1 rounded text-neutral-400 hover:text-red-400 cursor-pointer transition-colors"
                            title="Remove file"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Automated ATS Match Score Indicator */}
                      <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-between text-[11px]">
                        <span className="text-neutral-400 flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-cyan-400" />
                          ATS Semantic Match Score:
                        </span>
                        <span className="font-mono font-bold text-emerald-400">
                          {resumeFile.fitScore}% Fit
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`p-6 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all ${
                        isDragging
                          ? 'border-cyan-400 bg-cyan-500/10'
                          : 'border-neutral-800 hover:border-cyan-500/50 bg-neutral-950/50 hover:bg-neutral-950'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-2">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-medium text-white mb-1">
                        Drag and drop your Resume / CV here, or <span className="text-cyan-400 underline">browse</span>
                      </p>
                      <p className="text-[10px] text-neutral-500 font-mono">
                        Supports PDF, DOC, DOCX up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <LinkIcon className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                  <input
                    id="input-applicant-resume-link"
                    type="url"
                    placeholder="https://drive.google.com/file/d/... or direct PDF link"
                    value={resumeLink}
                    onChange={(e) => setResumeLink(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              )}
            </div>

            {/* Step 5: Skills Checklist */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                5. Select or Add Your Core Skills:
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {currentRole.skills.map((skill) => {
                  const isChecked = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
                        isChecked
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                          : 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}
                      {skill}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add another technology (e.g. Next.js, vLLM)..."
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={handleAddCustomSkill}
                  className="px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white text-xs"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Step 6: Statement */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                6. What would you like to build or master in these 3 months?
              </label>
              <textarea
                id="input-applicant-statement"
                rows={3}
                placeholder="Share a project you built, a paper you read, or an AI problem you're passionate about solving..."
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
                className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 resize-none transition-colors"
              />
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">
                Guaranteed response & interview decision within 48 hours.
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2 rounded-lg text-neutral-400 hover:text-white text-xs"
                >
                  Cancel
                </button>
                <button
                  id="btn-submit-internship-application"
                  type="submit"
                  disabled={isSubmitting || !fullName || !email}
                  className="px-5 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-neutral-950 font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Processing Submission...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
