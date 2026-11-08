// Shared in-memory data store for Next.js API Route Handlers and runtime state

export interface WaitlistRecord {
  id: string;
  fullName: string;
  email: string;
  companyOrOrg?: string;
  selectedProducts: string[];
  useCase?: string;
  priorityPosition: number;
  joinedAt: string;
}

export interface ApplicantRecord {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  roleId: string;
  roleTitle: string;
  appliedDate: string;
  currentStage: string;
  resumeUrl: string;
  resumeFileName?: string;
  resumeFileSize?: string;
  resumeFitScore?: number;
  resumeParsedSkills?: string[];
  githubUrl: string;
  portfolioUrl?: string;
  statementOfPurpose: string;
  yearsExperience: string;
  skills: string[];
  scoreBreakdown: {
    resumeMatchScore: number;
    technicalScore?: number;
    interviewScore?: number;
    overallRating: number;
  };
  reviewerNotes: string;
}

export interface InquiryRecord {
  id: string;
  clientName: string;
  email: string;
  company?: string;
  serviceType: string;
  budgetRange?: string;
  projectBrief: string;
  timeline?: string;
  status: string;
  createdAt: string;
}

export interface WeeklyReportRecord {
  id: string;
  weekNumber: number;
  title: string;
  dates: string;
  milestoneCompleted: string;
  deliverables: string[];
  hoursLogged: number;
  supervisorFeedback: string;
  rating: number;
  status: string;
}

export interface UserRecord {
  id: string;
  uniqueId: string;
  name: string;
  email: string;
  role: string;
  department: string;
  credentialsSentToEmail: string;
  credentialSentAt: string;
  accessKey: string;
  totalWorkSeconds: number;
  lastLoginAt: string;
  createdAt: string;
}

export interface WorkSessionRecord {
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
}

// Global persistent in-memory singleton across Next.js reloads
const globalStore = globalThis as unknown as {
  __tensorspark_store?: {
    waitlist: WaitlistRecord[];
    applicants: ApplicantRecord[];
    inquiries: InquiryRecord[];
    reports: WeeklyReportRecord[];
    users: UserRecord[];
    workSessions: WorkSessionRecord[];
  };
};

if (!globalStore.__tensorspark_store) {
  globalStore.__tensorspark_store = {
    waitlist: [
      {
        id: 'NX-WL-101',
        fullName: 'Sarah Chen',
        email: 'schen@alphaventures.ai',
        companyOrOrg: 'Alpha Ventures AI',
        selectedProducts: ['AuraPersona AI Avatar', 'NexusSwarm AI Agents'],
        useCase: 'Autonomous enterprise workflows and multi-agent coordination',
        priorityPosition: 1,
        joinedAt: '2026-09-01T10:00:00Z',
      },
      {
        id: 'NX-WL-102',
        fullName: 'Marcus Vance',
        email: 'm.vance@hyperionhealth.io',
        companyOrOrg: 'Hyperion Health',
        selectedProducts: ['DocuExtract Multi-File Intelligence', 'Vocalis Conversational Voice'],
        useCase: 'Hospital document extraction and ultra-low latency voice co-pilot',
        priorityPosition: 2,
        joinedAt: '2026-09-03T14:30:00Z',
      }
    ],
    applicants: [
      {
        id: 'NX-AI-2026-8941',
        fullName: 'Sophia Elena Chen',
        email: 'sophia.chen@example.com',
        phone: '+1 (555) 234-8901',
        roleId: 'ai-engineer',
        roleTitle: 'AI Engineer (LLMs & Multi-Agent Systems)',
        appliedDate: '2026-08-28',
        currentStage: 'technical_challenge',
        resumeUrl: 'https://example.com/resumes/sophia_chen_cv.pdf',
        githubUrl: 'https://github.com/sophiachen-ai',
        portfolioUrl: 'https://sophiachen.dev',
        statementOfPurpose: 'Passionate about autonomous multi-agent consensus and deterministic guardrails in production RAG systems.',
        yearsExperience: '1.5 years',
        skills: ['Python', 'PyTorch', 'LangChain', 'FastAPI', 'Vector Databases'],
        scoreBreakdown: {
          resumeMatchScore: 94,
          technicalScore: 89,
          overallRating: 92,
        },
        reviewerNotes: 'Exceptional background in distributed inference. Passed initial architecture screening.',
      }
    ],
    inquiries: [],
    reports: [
      {
        id: 'wk-1',
        weekNumber: 1,
        title: 'Foundation Architecture & Multi-Agent Communication Graph',
        dates: 'Sep 01 - Sep 07, 2026',
        milestoneCompleted: 'Implemented asynchronous actor message broker with zero-copy buffer serialization.',
        deliverables: ['PR #104: Actor Core', 'Benchmark: 180k msgs/sec throughput', 'System Architecture Diagram'],
        hoursLogged: 42,
        supervisorFeedback: 'Exceeded throughput benchmarks by 35%. Excellent documentation quality.',
        rating: 5,
        status: 'approved',
      },
      {
        id: 'wk-2',
        weekNumber: 2,
        title: 'Distributed Vector Index & Sub-10ms Retrieval Engine',
        dates: 'Sep 08 - Sep 14, 2026',
        milestoneCompleted: 'Integrated SIMD-accelerated HNSW index partitioner across distributed sharding nodes.',
        deliverables: ['PR #119: SIMD Quantizer', 'Test Suite: 99.4% coverage', 'Stress-testing report on 10M embeddings'],
        hoursLogged: 45,
        supervisorFeedback: 'Clean memory safety patterns. Ready for staging integration testing.',
        rating: 5,
        status: 'approved',
      }
    ],
    users: [],
    workSessions: []
  };
}

export const apiStore = globalStore.__tensorspark_store;
