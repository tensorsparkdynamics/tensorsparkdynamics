import { JobOpening, FastTrackTask, FifteenDayInternship } from '../types';

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'lead-ai-systems-architect',
    title: 'Lead AI Systems Architect',
    department: 'Autonomous Intelligence',
    type: 'Full-Time',
    location: 'Bangalore / San Francisco (Hybrid)',
    experience: '4 - 7 Years',
    salaryRange: '₹38,00,000 - ₹58,00,000 / $160k - $220k',
    openings: 3,
    featured: true,
    description: 'Lead the architecture of our multi-agent orchestration platform, low-latency LLM inference pipelines, and distributed vector memory clusters serving enterprise scale.',
    responsibilities: [
      'Architect distributed multi-agent swarm platforms with verifiable tool execution',
      'Optimize token utilization, context caching, and p99 inference latency to under 30ms',
      'Drive technical direction for enterprise LLM fine-tuning and proprietary RAG pipelines',
      'Mentor senior engineers and lead architecture review boards'
    ],
    requirements: [
      '5+ years building distributed backend systems in Python, Go, or Rust',
      'Deep hands-on experience with PyTorch, vLLM, TensorRT-LLM, and Vector DB architectures',
      'Proven track record scaling production services to >10,000 requests/sec',
      'B.Tech/M.Tech/MS in Computer Science or equivalent practical mastery'
    ],
    skills: ['Python', 'Rust', 'vLLM', 'Distributed Systems', 'PyTorch', 'Vector DBs', 'Kubernetes'],
    benefits: ['Substantial Equity Options (ESOPs)', 'Flexible Hybrid Policy', 'Annual Hardware & GPU Budget (₹3,00,000)', 'Comprehensive Health Insurance for Family']
  },
  {
    id: 'sr-fullstack-engineer',
    title: 'Senior Full-Stack Product Engineer',
    department: 'Core Platform',
    type: 'Full-Time',
    location: 'Remote (Global) / Bangalore',
    experience: '3 - 6 Years',
    salaryRange: '₹28,00,000 - ₹44,00,000 / $130k - $175k',
    openings: 4,
    featured: true,
    description: 'Craft ultra-responsive web applications, real-time telemetry canvases, and developer tools using Next.js 15, TypeScript, WebSockets, and high-throughput Node/Go microservices.',
    responsibilities: [
      'Build 60fps reactive frontends for agent debugging and analytics dashboards',
      'Design robust microservice APIs with edge rendering and streaming SSE/WebSocket protocols',
      'Implement modular design systems and performance profiling for sub-second page loads',
      'Collaborate closely with AI researchers to translate experimental models into consumer products'
    ],
    requirements: [
      '3+ years with modern React / Next.js ecosystem, TypeScript, and Tailwind CSS',
      'Strong backend experience in Node.js, Python FastAPI, or Go microservices',
      'Experience with PostgreSQL, Redis caching, and real-time state synchronization',
      'Eye for design ergonomics, micro-interactions, and accessibility standards'
    ],
    skills: ['React', 'Next.js 15', 'TypeScript', 'Node.js', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    benefits: ['Home Office Setup Stipend ($2,000)', 'Unlimited Paid Time Off', 'Health & Wellness Allowance', 'Performance Bonuses']
  },
  {
    id: 'applied-mlops-engineer',
    title: 'Applied MLOps & Inference Optimization Engineer',
    department: 'Infrastructure & Cloud',
    type: 'Full-Time',
    location: 'Bangalore (Hybrid)',
    experience: '2 - 5 Years',
    salaryRange: '₹26,00,000 - ₹42,00,000 / $125k - $165k',
    openings: 3,
    featured: false,
    description: 'Scale multi-cloud GPU infrastructure, automate CI/CD for continuous model benchmarking, and implement kernel optimizations for state-of-the-art open-weights models.',
    responsibilities: [
      'Manage multi-node Kubernetes GPU clusters across AWS, GCP, and bare-metal nodes',
      'Profile CUDA kernels and optimize weights quantization (AWQ, FP8, INT4)',
      'Construct automated regression evaluation suites detecting prompt drift and hallucination rates',
      'Ensure 99.99% inference cluster uptime with zero-downtime rolling deployments'
    ],
    requirements: [
      'Experience managing production Kubernetes clusters and NVIDIA GPU drivers',
      'Familiarity with model serving frameworks (Triton, vLLM, TGI)',
      'Proficiency in Terraform, Helm, Prometheus, and Grafana monitoring stacks',
      'Solid scripting in Python and Bash'
    ],
    skills: ['Kubernetes', 'CUDA', 'Docker', 'vLLM', 'Terraform', 'Prometheus', 'Python', 'AWS/GCP'],
    benefits: ['Dedicated Cloud GPU instances for personal AI research', 'Continuous Learning Stipend', 'Comprehensive Medical & Dental Coverage']
  },
  {
    id: 'lead-ux-ui-designer',
    title: 'Lead Product & Design Systems Architect',
    department: 'Product Design',
    type: 'Full-Time',
    location: 'Remote (Worldwide)',
    experience: '3 - 6 Years',
    salaryRange: '₹24,00,000 - ₹38,00,000 / $115k - $155k',
    openings: 2,
    featured: false,
    description: 'Set the visual and experiential benchmark for all Tensorspark products and agency client deliverables, championing design token systems and conversational AI ergonomics.',
    responsibilities: [
      'Maintain and expand our core Figma Design System and CSS token libraries',
      'Design intuitive mental models for complex agent swarm workflows and generative prompts',
      'Conduct rapid usability prototyping and translate client brand aesthetics into web platforms',
      'Work alongside frontend engineers to guarantee 1:1 design execution fidelity'
    ],
    requirements: [
      'Demonstrated portfolio of sophisticated web software and SaaS tools',
      'Expertise in Figma, design tokens, auto-layout, and interactive prototyping',
      'Understanding of modern web CSS, layout constraints, and responsive ergonomics',
      'Ability to articulate user journeys and simplify complex data visualizations'
    ],
    skills: ['Figma', 'Design Systems', 'UI/UX Prototyping', 'User Research', 'Design Tokens', 'Web Ergonomics'],
    benefits: ['Top-spec Apple Silicon workstation', 'Conference & Design Event Sponsorship', 'Flexible Working Hours']
  },
  {
    id: 'performance-marketing-lead',
    title: 'Performance Marketing & Brand Growth Lead',
    department: 'Digital Agency Practice',
    type: 'Full-Time',
    location: 'Bangalore / Remote',
    experience: '3 - 5 Years',
    salaryRange: '₹22,00,000 - ₹36,00,000 / $105k - $145k + Profit Share',
    openings: 2,
    featured: false,
    description: 'Orchestrate multi-million dollar ad budgets for our agency clients, engineering high-ROAS acquisition funnels with algorithmic creative generation and server-side tracking.',
    responsibilities: [
      'Deploy and optimize performance campaigns across Meta, Google Search/PMax, and TikTok',
      'Coordinate with our video and motion graphics team to test 50+ creative variants weekly',
      'Architect server-side CAPI tracking and multi-touch attribution dashboards',
      'Deliver client growth reviews with quantifiable CAC reduction and ROAS scaling'
    ],
    requirements: [
      '3+ years managing >₹50L / $50k monthly ad spend with proven positive ROAS',
      'Deep knowledge of Meta Ads Manager, Google Ads, GA4, and Post-Hog/Mixpanel attribution',
      'Analytical mindset capable of statistical A/B testing and financial modeling',
      'Superb communication skills and consultative client management acumen'
    ],
    skills: ['Meta Ads', 'Google Ads', 'Media Buying', 'CAPI Attribution', 'Funnel Optimization', 'Growth Analytics'],
    benefits: ['Quarterly Agency Profit Sharing Pool', 'Performance Incentives', 'Global Client Exposure']
  },
  {
    id: 'autonomous-agents-qa-engineer',
    title: 'Autonomous Swarms QA & Red-Teaming Engineer',
    department: 'AI Safety & Security',
    type: 'Full-Time / Contract',
    location: 'Remote',
    experience: '2 - 4 Years',
    salaryRange: '₹20,00,000 - ₹32,00,000 / $95k - $135k',
    openings: 2,
    featured: false,
    description: 'Stress-test autonomous agent swarms, probe for adversarial prompt injections, automate end-to-end deterministic verification, and validate API reliability.',
    responsibilities: [
      'Design test harnesses for non-deterministic LLM behavior and tool execution chains',
      'Conduct automated red-teaming against jailbreaks, hallucinations, and data leakage',
      'Build end-to-end integration test suites with Playwright and Python pytest',
      'Establish quality scorecards for enterprise client agent deployments'
    ],
    requirements: [
      '2+ years in QA engineering or AI safety evaluation',
      'Strong Python or TypeScript test automation skills (Playwright, Pytest, Cypress)',
      'Understanding of LLM threat vectors and prompt security protocols'
    ],
    skills: ['Python', 'Playwright', 'Adversarial Prompting', 'API Testing', 'CI/CD', 'Security Auditing'],
    benefits: ['Flexible Remote Work', 'Conference Travel Budget', 'Annual Skill Development Grants']
  }
];

export const INITIAL_FAST_TRACK_TASKS: FastTrackTask[] = [
  {
    id: 'ft-task-1',
    taskNumber: 1,
    dayRange: 'Days 1 - 3',
    title: 'Environment Initialization & Architectural Blueprint',
    description: 'Set up the development workspace, configure TypeScript strict mode, integrate Git pre-commit hooks (ESLint/Prettier), and construct the modular system architecture diagram with API data schemas.',
    deadlineHours: 72,
    deliverables: [
      'GitHub repository with strict CI/CD lint action configured',
      'Architecture diagram & modular folder structure',
      'Type definitions & mock contract interfaces'
    ],
    evaluationCriteria: 'Zero lint errors, 100% TypeScript type-safety compliance, clean repository commit hygiene.',
    status: 'completed',
    submittedOnTime: true,
    submissionRepoUrl: 'https://github.com/candidate/tensorspark-fast-track-milestone1',
    liveDemoUrl: 'https://preview-task1.tensorspark-demo.app',
    submittedAt: 'Day 2, 18:40 IST',
    reviewerScore: 94
  },
  {
    id: 'ft-task-2',
    taskNumber: 2,
    dayRange: 'Days 4 - 7',
    title: 'Core Engine Logic & API Integration',
    description: 'Implement the primary business logic layer, streaming data handlers, and external AI/backend endpoints with resilient error handling, exponential backoff, and state persistence.',
    deadlineHours: 96,
    deliverables: [
      'Functional API communication service with loading and error boundaries',
      'State management pipeline with optimistic UI updates',
      'Live streaming response handler'
    ],
    evaluationCriteria: 'Robust error recovery, sub-100ms UI response time, comprehensive request payload validation.',
    status: 'completed',
    submittedOnTime: true,
    submissionRepoUrl: 'https://github.com/candidate/tensorspark-fast-track-milestone2',
    liveDemoUrl: 'https://preview-task2.tensorspark-demo.app',
    submittedAt: 'Day 6, 21:15 IST',
    reviewerScore: 92
  },
  {
    id: 'ft-task-3',
    taskNumber: 3,
    dayRange: 'Days 8 - 10',
    title: 'Responsive UI Design System & 60fps Micro-Interactions',
    description: 'Develop pixel-perfect, accessible responsive components adhering strictly to design token specifications, fluid typography, dark/light contrast rules, and seamless keyboard navigation.',
    deadlineHours: 72,
    deliverables: [
      'Complete responsive UI matching mobile, tablet, and desktop breakpoints',
      'Framer motion / CSS keyframe micro-interactions without frame drops',
      'WCAG AA color contrast and screen reader accessibility audit report'
    ],
    evaluationCriteria: 'Mobile viewport smoothness, zero layout shifting (CLS < 0.05), accessibility pass rate.',
    status: 'completed',
    submittedOnTime: true,
    submissionRepoUrl: 'https://github.com/candidate/tensorspark-fast-track-milestone3',
    liveDemoUrl: 'https://preview-task3.tensorspark-demo.app',
    submittedAt: 'Day 9, 16:30 IST',
    reviewerScore: 96
  },
  {
    id: 'ft-task-4',
    taskNumber: 4,
    dayRange: 'Days 11 - 13',
    title: 'Performance Profiling, Unit Tests & Cloud Deployment',
    description: 'Execute automated unit and integration tests, optimize bundle size through dynamic code splitting, and deploy the functional production application to an edge cloud server.',
    deadlineHours: 72,
    deliverables: [
      'Test suite with >80% code coverage on core logic modules',
      'Lighthouse performance score of 95+ (Performance, SEO, Best Practices)',
      'Public HTTPS live deployment link with custom preview badge'
    ],
    evaluationCriteria: 'Production build pass, all tests green, verified public staging URL functioning correctly.',
    status: 'completed',
    submittedOnTime: true,
    submissionRepoUrl: 'https://github.com/candidate/tensorspark-fast-track-milestone4',
    liveDemoUrl: 'https://candidate-task4-deployed.tensorspark.run.app',
    submittedAt: 'Day 12, 22:00 IST',
    reviewerScore: 95
  },
  {
    id: 'ft-task-5',
    taskNumber: 5,
    dayRange: 'Days 14 - 15',
    title: 'Executive Code Defense, Digital Signature & Verified Issuance',
    description: 'Submit your complete capstone submission, undergo automated peer review validation, provide your certified Candidate Digital Signature, and generate your cryptographically verified 15-Day Certificate.',
    deadlineHours: 48,
    deliverables: [
      'Final project pull request with comprehensive README documentation',
      'Recorded 3-minute technical walkthrough video or interactive defense',
      'Verified digital signature execution with timestamp hash'
    ],
    evaluationCriteria: 'Clear technical documentation, verified digital signature match, 100% on-time completion across all 5 milestones.',
    status: 'completed',
    submittedOnTime: true,
    submissionRepoUrl: 'https://github.com/candidate/tensorspark-fast-track-final-capstone',
    liveDemoUrl: 'https://candidate-capstone-verified.tensorspark.run.app',
    submittedAt: 'Day 15, 14:10 IST',
    reviewerScore: 98
  }
];

export const THREE_MONTH_PPO_DETAILS = {
  duration: '3 Months (Extendable to 6 Months)',
  stipendRange: '₹25,000 - ₹45,000 / month ($1,800 - $2,500/mo)',
  extensionTerms: 'Eligible candidates can request a 1-to-3 month extension based on active client product sprint requirements and lead architect recommendation.',
  ppoConversionRate: '78% of fellows in Q1-Q3 2026 received confirmed Pre-Placement Offers (PPO)',
  ppoPackageRange: '₹14,00,000 - ₹28,00,000 LPA ($85,000 - $140,000 / yr) Full-Time CTC with ESOP grants',
  evaluationCriteria: [
    'Minimum 85% average rating across 12 weekly sprint reports',
    'Successful production release of at least one core AI or Full-Stack service',
    'Peer-reviewed code contributions and active architecture sprint participation',
    'Final Capstone presentation to Tensorspark executive technical board'
  ],
  tracks: [
    { title: 'AI & Autonomous Multi-Agents', openings: 8, stipend: '₹40,000 / mo' },
    { title: 'Full-Stack & Systems Engineering', openings: 6, stipend: '₹35,000 / mo' },
    { title: 'MLOps & Inference Cluster DevOps', openings: 4, stipend: '₹45,000 / mo' },
    { title: 'Data Science & Predictive Modeling', openings: 5, stipend: '₹32,000 / mo' },
    { title: 'UI/UX & Creative Technology', openings: 4, stipend: '₹30,000 / mo' }
  ]
};

export const FIFTEEN_DAY_PROGRAM_RULES = {
  name: '15-Day Accelerated Internship & Verified Certification',
  fee: '₹2,000 RS',
  feeDescription: 'Nominal ₹2,000 RS candidate evaluation, infrastructure sandbox access, and cryptographic certificate verification fee.',
  totalDays: 15,
  totalTasks: 5,
  taskPolicy: 'Candidates MUST complete multiple rigorous real-world tasks strictly ON TIME. Timestamps are cryptographically recorded against our review server.',
  signaturePolicy: 'A legally binding candidate digital signature is mandatory before certificate generation. Candidates sign digitally on our secure signature pad to certify original authorship and adherence to professional standards.',
  certificateFeatures: [
    'Unique Cryptographic Credential ID (e.g. TS-CERT-15D-2026-XXXX)',
    'Candidate Digital Signature printed directly on the certificate',
    'Detailed Task Completion Transcript (5/5 Tasks On-Time Verified)',
    'Direct Verification QR Code readable by HR & recruiters worldwide',
    'Official Tensorspark Corporate Seal and Authorized Signatory'
  ]
};

export const FIFTEEN_DAY_INTERNSHIPS: FifteenDayInternship[] = [
  {
    id: 'genai-llm-15d',
    title: 'Generative AI & LLM Systems Internship',
    category: 'Artificial Intelligence',
    domain: 'LLM Orchestration & RAG',
    level: 'Intermediate - Advanced',
    duration: '15 Days (5 Sprints)',
    fee: '₹2,000 RS',
    seatsRemaining: 7,
    description: 'Build production-ready LLM pipelines with vector retrieval-augmented generation (RAG), tool calling agents, and context-cached low latency API servers.',
    skills: ['Python', 'OpenAI/Gemini APIs', 'LangChain', 'ChromaDB/Pinecone', 'FastAPI', 'Prompt Engineering'],
    sprintsSummary: [
      'Sprint 1 (Days 1-3): Architecture & Token Benchmark',
      'Sprint 2 (Days 4-7): Vector Embeddings & Hybrid RAG Engine',
      'Sprint 3 (Days 8-10): Function Calling & Autonomous Agents',
      'Sprint 4 (Days 11-13): Low-Latency Streaming & Docker Setup',
      'Sprint 5 (Days 14-15): Capstone Defense & Digital Sign-off'
    ],
    prerequisites: 'Basic Python & understanding of REST APIs'
  },
  {
    id: 'fullstack-ai-15d',
    title: 'Full-Stack AI Application Developer',
    category: 'Full-Stack Web',
    domain: 'Next.js & Cloud Edge',
    level: 'Beginner - Intermediate',
    duration: '15 Days (5 Sprints)',
    fee: '₹2,000 RS',
    seatsRemaining: 12,
    description: 'Develop ultra-responsive AI dashboards using React 18, TypeScript, Tailwind CSS, real-time WebSocket state, and robust serverless backend APIs.',
    skills: ['React 18', 'TypeScript', 'Tailwind CSS', 'Node.js/Express', 'PostgreSQL/Supabase', 'Vite'],
    sprintsSummary: [
      'Sprint 1 (Days 1-3): Modern React App Scaffold & State Architecture',
      'Sprint 2 (Days 4-7): Secure Backend APIs & Auth Integration',
      'Sprint 3 (Days 8-10): Responsive Design & 60fps Micro-interactions',
      'Sprint 4 (Days 11-13): Bundle Optimization & Cloud Run Deployment',
      'Sprint 5 (Days 14-15): Capstone Defense & Digital Sign-off'
    ],
    prerequisites: 'Foundational HTML/CSS & JavaScript/TypeScript knowledge'
  },
  {
    id: 'agents-mcp-15d',
    title: 'Autonomous Agent Swarms & MCP Engineer',
    category: 'Autonomous Systems',
    domain: 'Multi-Agent Loops & Tools',
    level: 'Advanced',
    duration: '15 Days (5 Sprints)',
    fee: '₹2,000 RS',
    seatsRemaining: 5,
    description: 'Design self-correcting agent collectives with Model Context Protocol (MCP) integrations, persistent memory hierarchies, and automated red-teaming safety guardrails.',
    skills: ['Model Context Protocol (MCP)', 'Python', 'CrewAI/AutoGen', 'Vector Databases', 'Docker', 'Telemetry'],
    sprintsSummary: [
      'Sprint 1 (Days 1-3): Multi-Agent Communication Protocols',
      'Sprint 2 (Days 4-7): MCP Tool Server Implementation',
      'Sprint 3 (Days 8-10): Long-Term Memory & Reflexion Loops',
      'Sprint 4 (Days 11-13): Adversarial Red-Teaming & Guardrails',
      'Sprint 5 (Days 14-15): Capstone Defense & Digital Sign-off'
    ],
    prerequisites: 'Object-oriented programming & basic asynchronous concurrency'
  },
  {
    id: 'ui-ux-design-15d',
    title: 'Product UI/UX & Design Systems Architect',
    category: 'Design & Experience',
    domain: 'Design Systems & Ergonomics',
    level: 'All Levels Welcome',
    duration: '15 Days (5 Sprints)',
    fee: '₹2,000 RS',
    seatsRemaining: 9,
    description: 'Master enterprise design systems, mathematical layout ratios, WCAG AAA accessibility, dark/light optical tuning, and interactive high-fidelity prototypes.',
    skills: ['Figma', 'Design Tokens', 'Tailwind CSS', 'Micro-Interactions', 'User Testing', 'Accessibility (a11y)'],
    sprintsSummary: [
      'Sprint 1 (Days 1-3): Information Architecture & Wireframing',
      'Sprint 2 (Days 4-7): Design Token Systems & Typography Hierarchies',
      'Sprint 3 (Days 8-10): Interactive Prototyping & Motion Timing',
      'Sprint 4 (Days 11-13): Usability Audit & Developer Hand-off Specs',
      'Sprint 5 (Days 14-15): Capstone Defense & Digital Sign-off'
    ],
    prerequisites: 'Curiosity for visual hierarchy & user experience'
  },
  {
    id: 'graphic-brand-15d',
    title: 'Graphic Designing & Brand Visual Identity',
    category: 'Creative Arts',
    domain: 'Brand Identity & Vector Art',
    level: 'All Levels Welcome',
    duration: '15 Days (5 Sprints)',
    fee: '₹2,000 RS',
    seatsRemaining: 8,
    description: 'Craft high-impact corporate branding identities, vector logomarks, editorial typography guidelines, and complete multi-channel marketing collateral.',
    skills: ['Vector Design', 'Brand Strategy', 'Typography Pairings', 'Social Media Kits', 'Color Theory', 'Illustrator/Figma'],
    sprintsSummary: [
      'Sprint 1 (Days 1-3): Brand Strategy & Moodboard Formulation',
      'Sprint 2 (Days 4-7): Vector Logo Construction & Optical Balancing',
      'Sprint 3 (Days 8-10): Corporate Color Schemes & Type Pairing Book',
      'Sprint 4 (Days 11-13): Digital Marketing Assets & Print Collateral',
      'Sprint 5 (Days 14-15): Capstone Defense & Digital Sign-off'
    ],
    prerequisites: 'Basic familiarity with design software or vector tools'
  },
  {
    id: 'datascience-ml-15d',
    title: 'Data Science & Predictive Modeling Intern',
    category: 'Data & Analytics',
    domain: 'Machine Learning Pipelines',
    level: 'Intermediate',
    duration: '15 Days (5 Sprints)',
    fee: '₹2,000 RS',
    seatsRemaining: 6,
    description: 'Analyze real-world high-volume datasets, engineer predictive features, train Scikit-Learn/XGBoost models, and expose predictions via production REST endpoints.',
    skills: ['Python', 'Pandas & NumPy', 'Scikit-Learn', 'Matplotlib/Seaborn', 'SQL', 'FastAPI'],
    sprintsSummary: [
      'Sprint 1 (Days 1-3): Exploratory Data Analysis & Imputation',
      'Sprint 2 (Days 4-7): Feature Engineering & Dimensionality Reduction',
      'Sprint 3 (Days 8-10): Model Selection, Hyperparameter Tuning & Cross-Val',
      'Sprint 4 (Days 11-13): REST API Serving & Model Metrics Dashboard',
      'Sprint 5 (Days 14-15): Capstone Defense & Digital Sign-off'
    ],
    prerequisites: 'Python fundamentals & basic statistics'
  }
];
