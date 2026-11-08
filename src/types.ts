export type TabView = 
  | 'home' 
  | 'about'
  | 'products' 
  | 'careers' 
  | 'internships' 
  | 'offer-letter'
  | 'dashboard' 
  | 'agency' 
  | 'analytics'
  | 'contact'
  | 'account';

export interface OfferLetter {
  id: string;
  uniqueCode: string; // e.g. TS-OL-2026-REM-84F921
  candidateId: string; // e.g. CND-58201
  verificationHash: string;
  candidateName: string;
  candidateEmail?: string;
  candidatePhone?: string;
  roleTitle: string;
  department: string;
  programType: '3-Month Engineering Fellowship' | '15-Day Internship Certification' | 'Full-Time AI Engineer' | 'Custom Role';
  stipendOrSalary: string;
  joiningDate: string;
  validUntil: string;
  officeLocation: string;
  reportingManager: string;
  signatoryName: 'Abhishek Kumar' | 'Ajay Singh Chauhan' | 'Both Directors';
  generatedAt: string;
  status: 'Issued' | 'Accepted' | 'Pending Review';
  additionalPerks?: string[];
}

export type CareerOption = 'openings' | 'three-month' | 'fifteen-day';

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  type: 'Full-Time' | 'Contract' | 'Hybrid' | 'Full-Time / Contract';
  location: string;
  experience: string;
  salaryRange: string;
  openings: number;
  featured?: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
}

export interface FastTrackTask {
  id: string;
  taskNumber: number;
  dayRange: string;
  title: string;
  description: string;
  deadlineHours: number;
  deliverables: string[];
  evaluationCriteria: string;
  status: 'completed' | 'in_progress' | 'pending';
  submittedOnTime?: boolean;
  submissionRepoUrl?: string;
  liveDemoUrl?: string;
  submittedAt?: string;
  reviewerScore?: number; // 0-100
}

export interface FastTrackCandidate {
  fullName: string;
  email: string;
  phone: string;
  enrolledDate: string;
  feePaid: boolean;
  amountCharged: string; // "₹2,000 RS"
  signatureDataUrl?: string;
  signedAt?: string;
  verificationHash?: string;
  tasks: FastTrackTask[];
  certificateIssued: boolean;
  certificateId?: string;
}

export interface FifteenDayInternship {
  id: string;
  title: string;
  category: string;
  domain: string;
  level: string;
  duration: string;
  fee: string;
  seatsRemaining: number;
  description: string;
  skills: string[];
  sprintsSummary: string[];
  prerequisites: string;
}

export type ApplicationStage = 
  | 'submitted' 
  | 'screening' 
  | 'technical_challenge' 
  | 'interview' 
  | 'offer' 
  | 'onboarded' 
  | 'rejected';

export interface InternshipRole {
  id: string;
  title: string;
  track: string;
  duration: string;
  stipend: string;
  openings: number;
  applicantsCount: number;
  description: string;
  requirements: string[];
  responsibilities: string[];
  curriculum: {
    month1: string;
    month2: string;
    month3: string;
  };
  skills: string[];
  featured?: boolean;
}

export interface WeeklyReport {
  id: string;
  weekNumber: number;
  title: string;
  dates: string;
  milestoneCompleted: string;
  deliverables: string[];
  hoursLogged: number;
  supervisorFeedback: string;
  rating: number; // 1 - 5
  blockers?: string;
  githubPrUrl?: string;
  status: 'approved' | 'in_review' | 'revision_needed';
}

export interface Applicant {
  id: string; // e.g. NX-AI-2026-8941
  fullName: string;
  email: string;
  phone?: string;
  roleId: string;
  roleTitle: string;
  appliedDate: string;
  currentStage: ApplicationStage;
  resumeUrl: string;
  resumeFileName?: string;
  resumeFileSize?: string;
  resumeParsedSkills?: string[];
  resumeFitScore?: number;
  githubUrl: string;
  portfolioUrl?: string;
  statementOfPurpose: string;
  yearsExperience: string;
  skills: string[];
  scoreBreakdown: {
    resumeMatchScore: number; // 0-100
    technicalScore?: number;  // 0-100
    interviewScore?: number;  // 0-100
    overallRating: number;    // 0-100
  };
  interviewSlot?: {
    date: string;
    time: string;
    interviewer: string;
    meetLink: string;
  };
  technicalSubmission?: {
    repoUrl: string;
    submittedAt: string;
    score: number;
    feedback: string;
  };
  reviewerNotes: string;
  isEnrolledIntern?: boolean;
  weeklyReports?: WeeklyReport[];
}

export interface AIProduct {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  description: string;
  features: string[];
  metrics: {
    latency: string;
    accuracy: string;
    throughput: string;
  };
  liveDemoInputPlaceholder: string;
  demoOutputSample: string;
  category: string;
  architectureDetails?: string;
}

export interface AgencyService {
  id: string;
  title: string;
  shortDesc: string;
  deliverables: string[];
  growthMetric: string;
  tag: string;
}

export type AgencyServiceId = 
  | 'web-development'
  | 'ux-ui-design'
  | 'graphic-design'
  | 'video-editing'
  | 'ai-integration'
  | 'ai-agents'
  | 'photoshop'
  | 'digital-marketing';

export interface AgencyServiceDetail {
  id: AgencyServiceId;
  title: string;
  shortTitle: string;
  subtitle: string;
  tagline: string;
  description: string;
  category: string;
  badge: string;
  highlightMetric: string;
  highlightLabel: string;
  secondaryMetric: string;
  secondaryLabel: string;
  technologies: string[];
  coreCapabilities: {
    title: string;
    desc: string;
    deliverable: string;
  }[];
  processSteps: {
    phase: string;
    name: string;
    summary: string;
  }[];
  caseStudy: {
    client: string;
    impact: string;
    description: string;
    metricValue: string;
    metricLabel: string;
  };
  samplePackages: {
    name: string;
    timeline: string;
    price: string;
    features: string[];
    popular?: boolean;
  }[];
}

export interface AgencyCaseStudy {
  id: string;
  clientName: string;
  industry: string;
  challenge: string;
  solution: string;
  resultMetrics: {
    label: string;
    value: string;
  }[];
}

export interface AnalyticsDataPoint {
  date: string;
  revenue: number;
  adSpend: number;
  conversions: number;
  cac: number;
  roas: number;
}

export interface ChannelPerformance {
  channel: string;
  spend: number;
  revenue: number;
  roas: number;
  leads: number;
  cpl: number;
}

export interface AuthUser {
  id: string;
  uniqueId: string; // e.g. "TS-UID-749102"
  name: string;
  email: string;
  role?: string;
  department?: string;
  createdAt: string;
  credentialsSentToEmail?: string;
  credentialSentAt?: string;
  accessKey?: string;
  lastLoginAt?: string;
  totalWorkSeconds?: number;
}

export interface WorkSession {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  startTime: string;
  endTime: string;
  durationSeconds: number;
  durationFormatted: string;
  taskDescription: string;
  projectTrack: string;
  createdAt: string;
  syncedToDb?: boolean;
}

export interface WaitlistEntry {
  id: string;
  fullName: string;
  email: string;
  companyOrOrg?: string;
  selectedProducts: string[];
  useCase?: string;
  priorityPosition: number;
  joinedAt: string;
}

export type AuthModalMode = 'login' | 'signup';

