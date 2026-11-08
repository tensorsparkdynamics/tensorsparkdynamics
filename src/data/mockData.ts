import { InternshipRole, Applicant, AIProduct, AgencyService, AgencyCaseStudy, AnalyticsDataPoint, ChannelPerformance } from '../types';

export const INTERNSHIP_ROLES: InternshipRole[] = [
  {
    id: 'ai-engineer',
    title: 'AI Engineer (LLMs & Multi-Agent Systems)',
    track: 'Artificial Intelligence & Agents',
    duration: '3 Months (Full-Time / Hybrid)',
    stipend: '$2,200 / month + Equity pool',
    openings: 8,
    applicantsCount: 142,
    featured: true,
    description: 'Build state-of-the-art multi-agent workflows, fine-tune open-source models (Llama 3, Mistral), and integrate production RAG pipelines into client enterprise systems.',
    requirements: [
      'Strong proficiency in Python, PyTorch, or Hugging Face ecosystem',
      'Understanding of Vector DBs (Pinecone, Chroma, Qdrant) and RAG paradigms',
      'Familiarity with LangChain, LlamaIndex, or native Agentic frameworks',
      'Curiosity for autonomous systems and prompt latency optimizations'
    ],
    responsibilities: [
      'Develop autonomous decision-making agents with tool-calling capabilities',
      'Fine-tune domain-specific LLMs on client proprietary datasets',
      'Implement semantic search and real-time inference telemetry',
      'Co-author research writeups and release open-source tooling'
    ],
    curriculum: {
      month1: 'Architecture & Foundations: Vector embeddings, token economics, context caching, and agent memory loops.',
      month2: 'Production Engineering: Scalable streaming inference, guardrails, automated red-teaming, and client pilots.',
      month3: 'Venture Demo & Deployment: Launch a commercial-grade AI feature, present at Demo Day, and transition to full-time.'
    },
    skills: ['Python', 'PyTorch', 'LangChain', 'FastAPI', 'Vector Databases', 'Prompt Engineering']
  },
  {
    id: 'fullstack-dev',
    title: 'Full-Stack Developer (React, Next.js & Python)',
    track: 'Core Engineering',
    duration: '3 Months (Full-Time / Remote)',
    stipend: '$2,000 / month + Performance bonus',
    openings: 6,
    applicantsCount: 189,
    featured: true,
    description: 'Design and ship end-to-end web applications with modern reactive user interfaces, high-throughput microservices, and slick real-time data streaming.',
    requirements: [
      'Proficiency in modern TypeScript, React, Next.js or Vite ecosystems',
      'Experience with backend APIs (Node.js/Express, Python/FastAPI, or Go)',
      'Working knowledge of relational/NoSQL databases and caching (Redis)',
      'Obsession with 60fps micro-interactions and clean code design'
    ],
    responsibilities: [
      'Build rich, low-latency web interfaces for our internal AI dashboards',
      'Implement streaming WebSocket endpoints and server-sent events for AI generation',
      'Design clean, accessible components following modern design systems',
      'Deploy resilient containerized workloads to Cloud infrastructure'
    ],
    curriculum: {
      month1: 'Modern UI/UX Patterns & Streaming Architecture: Edge rendering, Tailwind CSS systems, and WebSocket telemetry.',
      month2: 'Full-Stack Integration: Microservice orchestration, rate limiting, and enterprise authentication.',
      month3: 'Product Launch: Ship a live SaaS dashboard, optimize Core Web Vitals to 99+, and lead client sprint demos.'
    },
    skills: ['TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'FastAPI', 'PostgreSQL', 'Docker']
  },
  {
    id: 'mlops-infra',
    title: 'MLOps & Inference Infrastructure Engineer',
    track: 'Systems & Infrastructure',
    duration: '3 Months (Full-Time / Hybrid)',
    stipend: '$2,400 / month + GPU compute allowance',
    openings: 4,
    applicantsCount: 78,
    description: 'Scale distributed model serving clusters, optimize GPU utilization with vLLM / TensorRT-LLM, and build rock-solid CI/CD for continuous AI evaluation.',
    requirements: [
      'Experience with Linux, Docker, Kubernetes, and GPU orchestration',
      'Hands-on familiarity with model quantizations (AWQ, GPTQ, GGUF)',
      'Understanding of Prometheus, Grafana, and inference latency profiling'
    ],
    responsibilities: [
      'Deploy high-throughput inference endpoints with automatic scaling',
      'Benchmark p99 latency across distributed GPU instances',
      'Construct automated regression testing pipelines for model drifts'
    ],
    curriculum: {
      month1: 'Compute & Quantization: Profiling CUDA kernels, vLLM setup, and memory bandwidth optimization.',
      month2: 'Cluster Orchestration: Kubernetes autoscaling, batching strategies, and multi-region routing.',
      month3: 'Enterprise SLA Delivery: Zero-downtime rolling model updates, cost-per-token analytics, and hiring pipeline.'
    },
    skills: ['Kubernetes', 'Docker', 'vLLM', 'CUDA profiling', 'Terraform', 'Prometheus']
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist & Autonomous Analytics',
    track: 'Data & Forecasting',
    duration: '3 Months (Full-Time / Remote)',
    stipend: '$1,900 / month + Mentorship perks',
    openings: 5,
    applicantsCount: 110,
    description: 'Uncover deep predictive signals, build automated cohort attribution engines, and power our digital marketing agency with algorithmic intelligence.',
    requirements: [
      'Strong grasp of statistics, econometric modeling, and machine learning',
      'Hands-on expertise with Pandas, Polars, Scikit-learn, and XGBoost',
      'Ability to translate raw event streams into actionable client growth playbooks'
    ],
    responsibilities: [
      'Train predictive lifetime value (pLTV) models for agency clients',
      'Build automated conversion attribution models',
      'Conduct rigorous A/B experiments and Bayesian causal inference'
    ],
    curriculum: {
      month1: 'Algorithmic Attribution: Markov chains, shapley values, and modern marketing mix modeling (MMM).',
      month2: 'Predictive Modeling: Real-time churn forecasting and algorithmic bidding optimizations.',
      month3: 'Custom Reporting Studio: Package models into customer-facing interactive analytics dashboards.'
    },
    skills: ['Python', 'Polars', 'Scikit-learn', 'SQL', 'Bayesian Stats', 'Data Viz']
  },
  {
    id: 'creative-technologist',
    title: 'Creative Technologist & AI UI/UX Specialist',
    track: 'Design & Creative Engineering',
    duration: '3 Months (Full-Time / Remote)',
    stipend: '$1,950 / month + Design stack grants',
    openings: 4,
    applicantsCount: 95,
    description: 'Bridge generative AI media (ComfyUI, Midjourney, Spline 3D) and code to produce high-converting brand experiences, viral motion graphics, and interactive sites.',
    requirements: [
      'Experience with Figma, Framer/Motion, and generative media workflows',
      'Front-end knowledge (HTML/CSS/JS/React) to build live interactive components',
      'Keen eye for dark-mode typography, micro-interactions, and kinetic physics'
    ],
    responsibilities: [
      'Create 60fps kinetic motion graphics for new brand campaigns',
      'Prototype generative UI concepts that respond to dynamic AI outputs',
      'Collaborate directly with our digital marketing agency leads'
    ],
    curriculum: {
      month1: 'Kinetic Design: Canvas particle systems, SVG motion, and high-contrast dark themes.',
      month2: 'Generative Brand Assets: Automated asset pipelines with ComfyUI and custom LoRA models.',
      month3: 'Interactive Launch Sites: Ship 3 high-impact brand landing pages with seamless page transitions.'
    },
    skills: ['Figma', 'React', 'Motion', 'Canvas/WebGL', 'ComfyUI', 'Creative Direction']
  }
];

export const INITIAL_APPLICANTS: Applicant[] = [
  {
    id: 'TS-AI-2026-8941',
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
    statementOfPurpose: 'Passionate about autonomous multi-agent consensus and deterministic guardrails in production RAG systems. Built an open-source evaluation suite with 1.4k GitHub stars.',
    yearsExperience: '1.5 years',
    skills: ['Python', 'PyTorch', 'LangChain', 'FastAPI', 'Vector Databases'],
    scoreBreakdown: {
      resumeMatchScore: 94,
      technicalScore: 89,
      overallRating: 92
    },
    technicalSubmission: {
      repoUrl: 'https://github.com/sophiachen-ai/agentic-rag-benchmark',
      submittedAt: '2026-09-02',
      score: 91,
      feedback: 'Excellent modular architecture, robust async streaming implementation, and thoughtful latency evaluation suite.'
    },
    reviewerNotes: 'Top 5% candidate. Strong grasp of context window management and token streaming. Scheduled for final Technical Round on Sept 14th.',
    interviewSlot: {
      date: '2026-09-14',
      time: '14:30 EST',
      interviewer: 'Dr. Marcus Vance (Head of AI Research)',
      meetLink: 'https://meet.tensorspark.internal/room/ts-8941'
    }
  },
  {
    id: 'TS-FS-2026-7720',
    fullName: 'Liam Alexander Vance',
    email: 'liam.vance@example.com',
    phone: '+1 (555) 892-3411',
    roleId: 'fullstack-dev',
    roleTitle: 'Full-Stack Developer (React, Next.js & Python)',
    appliedDate: '2026-08-15',
    currentStage: 'offer',
    resumeUrl: 'https://example.com/resumes/liam_vance_cv.pdf',
    githubUrl: 'https://github.com/liamvance-dev',
    portfolioUrl: 'https://liamvance.codes',
    statementOfPurpose: 'Specialized in building sub-second interactive data consoles and streaming web architectures. Looking forward to shipping mission-critical UI for Tensorspark products.',
    yearsExperience: '2 years',
    skills: ['TypeScript', 'React', 'Tailwind CSS', 'FastAPI', 'PostgreSQL', 'Docker'],
    scoreBreakdown: {
      resumeMatchScore: 96,
      technicalScore: 98,
      interviewScore: 95,
      overallRating: 97
    },
    reviewerNotes: 'Exceptional full-stack execution. Acknowledged by interview team as immediate lead material. Formal 3-month fellowship offer extended with stipend of $2,000/mo.',
    isEnrolledIntern: true,
    weeklyReports: [
      {
        id: 'rep-w1',
        weekNumber: 1,
        title: 'Week 1: Architecture Onboarding & Streaming API Setup',
        dates: 'Aug 25 - Aug 31, 2026',
        milestoneCompleted: 'Set up local developer environment, configured Docker containers, and built initial prototype for SSE token streaming.',
        deliverables: ['PR #104: SSE endpoint implementation', 'RFC document on client-side state caching'],
        hoursLogged: 41,
        supervisorFeedback: 'Outstanding start. Liam grasped our microservices topology immediately and reduced initial client rendering jitter by 38%.',
        rating: 5,
        status: 'approved',
        githubPrUrl: 'https://github.com/tensorspark/core/pull/104'
      },
      {
        id: 'rep-w2',
        weekNumber: 2,
        title: 'Week 2: Real-Time Analytics Component Library & Dark UI',
        dates: 'Sep 01 - Sep 07, 2026',
        milestoneCompleted: 'Shipped 14 reusable Tailwind v4 components with smooth Framer motion transitions and accessibility audits.',
        deliverables: ['PR #112: Design system components', 'Storybook documentation deployment'],
        hoursLogged: 43,
        supervisorFeedback: 'Clean code craftsmanship. Typography pairings and keyboard navigation meet WCAG AAA requirements.',
        rating: 5,
        status: 'approved',
        githubPrUrl: 'https://github.com/tensorspark/core/pull/112'
      },
      {
        id: 'rep-w3',
        weekNumber: 3,
        title: 'Week 3: Live Application Tracker & Reporting Engine Integration',
        dates: 'Sep 08 - Sep 14, 2026',
        milestoneCompleted: 'Connected real-time applicant data pipeline and interactive multi-tab dashboard for cohort tracking.',
        deliverables: ['PR #128: Tracker dashboard full state sync', 'Export PDF/JSON reporting utility'],
        hoursLogged: 39,
        supervisorFeedback: 'In review. Impressive velocity. Ready for mid-term milestone presentation next week.',
        rating: 4,
        status: 'in_review',
        githubPrUrl: 'https://github.com/tensorspark/core/pull/128'
      }
    ]
  },
  {
    id: 'TS-ML-2026-6410',
    fullName: 'Aarav Patel',
    email: 'aarav.patel@example.com',
    roleId: 'mlops-infra',
    roleTitle: 'MLOps & Inference Infrastructure Engineer',
    appliedDate: '2026-09-04',
    currentStage: 'screening',
    resumeUrl: 'https://example.com/resumes/aarav_patel.pdf',
    githubUrl: 'https://github.com/aarav-infra',
    statementOfPurpose: 'Obsessed with kernel-level optimization, vLLM continuous batching, and lowering latency for generative AI systems.',
    yearsExperience: '1 year',
    skills: ['Kubernetes', 'Docker', 'vLLM', 'CUDA profiling'],
    scoreBreakdown: {
      resumeMatchScore: 88,
      overallRating: 88
    },
    reviewerNotes: 'Resume screened. Good background in containerizing PyTorch models. Moving to automated technical assignment.'
  }
];

export const STARTUP_PRODUCTS: AIProduct[] = [
  {
    id: 'ai-avatar-persona',
    name: 'AuraPersona AI Avatar',
    tagline: 'Autonomous Public Figure & Executive Multitask Operator',
    badge: 'Digital Persona',
    category: 'Digital Persona & Avatars',
    description: 'Autonomous photorealistic digital public figure and synthetic persona that handles daily public appearances, keynote speeches, multi-lingual video podcasts, real-time client consultations, and continuous calendar orchestration.',
    features: [
      'Sub-75ms facial neural sync & micro-expression generation for lifelike video presence',
      'Autonomous daily public figure workflow: broadcasts morning briefs, responds to press queries, hosts AMA sessions',
      'Multi-lingual voice cloning across 38 languages with accent nuance preservation',
      'Episodic memory bank maintaining historical audience engagement and executive preferences'
    ],
    metrics: {
      latency: '74ms lipsync',
      accuracy: '99.7% voice fidelity',
      throughput: '240 fps render'
    },
    liveDemoInputPlaceholder: 'Schedule 9 AM live broadcast on quantum computing, answer 40 investor questions, and deliver partner greeting in Japanese...',
    demoOutputSample: 'Avatar "Aura Prime" initiated broadcast in 4K 60FPS. Addressed 40 investor inquiries simultaneously across YouTube and LinkedIn. Conducted partner greeting in flawless Japanese with natural executive cadence.'
  },
  {
    id: 'ai-agents-swarm',
    name: 'NexusSwarm AI Agents',
    tagline: 'Autonomous Multi-Agent Goal Execution & DAG Swarm Fabric',
    badge: 'Autonomous Swarms',
    category: 'Autonomous Swarms',
    description: 'Self-organizing collective of specialized autonomous agents that decomposes high-level business objectives, plans parallel tool runs, queries heterogeneous databases, and executes end-to-end software and data engineering tasks without human bottlenecks.',
    features: [
      'Self-healing dynamic execution DAG with automatic error backtracking and branch recovery',
      'Multi-specialist consensus protocol: Planner, Coder, SQL Engine, Verifier, and Dispatcher',
      'Native tool execution harness (PostgreSQL, GitHub APIs, Docker runtimes, bash commands, Web scraping)',
      'Deterministic safety guardrails with cryptographic proof-of-execution audit logs'
    ],
    metrics: {
      latency: '38ms p95 step',
      accuracy: '99.6% task completion',
      throughput: '15,000 tasks/min'
    },
    liveDemoInputPlaceholder: 'Audit competitor repos, build daily automated regression benchmark pipeline, and deploy green PR to staging cluster...',
    demoOutputSample: 'Swarm decomposed goal into 5 sub-tasks. Coder agent scaffolded benchmark suite. Verifier executed 54 integration tests (100% pass). Dispatcher submitted verified PR #318 and triggered auto-deploy.'
  },
  {
    id: 'youtube-animated-video',
    name: 'AnimaTube Motion Engine',
    tagline: 'YouTube URL to Stylized Animated Video Transformation',
    badge: 'Generative Motion',
    category: 'Video & Animation',
    description: 'Proprietary video transformation pipeline that ingests any YouTube video URL or long-form recording and synthesizes high-engagement 2D anime, 3D Pixar-style, or vector motion explainers with automated scene segmentation and kinetic typography.',
    features: [
      'Single-click YouTube ingest with speech-to-visual semantic storyboard synthesis',
      'Multi-style animation transfer: 3D Cel-Shaded, Studio Anime, Flat Vector Motion, or Cyberpunk',
      'Automated kinetic typography and dynamic camera zoom/pan choreography for social reels',
      'Smart audio track remastering with synchronized sound effects (SFX) and adaptive background music'
    ],
    metrics: {
      latency: '1.8x realtime speed',
      accuracy: '99.2% frame coherence',
      throughput: '4K 60fps render'
    },
    liveDemoInputPlaceholder: 'https://youtube.com/watch?v=k9X4dY7 --style studio-anime --format 9:16 --duration 60s --caption-style viral-bold',
    demoOutputSample: 'YouTube 14-min tech keynote converted to 60-second viral animated explainer. Synthesized 16 stylized keyframe anime sequences with 3D camera pan, kinetic captions, and ambient audio mix.'
  },
  {
    id: 'ai-voice-assistant',
    name: 'Vocalis Conversational Voice',
    tagline: 'Zero-Latency Duplex Conversational Voice Intelligence',
    badge: 'Voice Intelligence',
    category: 'Voice & Audio Intelligence',
    description: 'Human-grade duplex conversational voice system operating at sub-120ms latency. Handles high-stakes telephony, automated customer resolution, and real-time executive co-piloting with natural human breathing, emotion modulation, and instant barge-in detection.',
    features: [
      'Ultra-low 118ms glass-to-glass response time (surpassing human conversational reaction time)',
      'Instant barge-in & interruption detection without audio clipping or robotic hesitation',
      'Emotion-aware vocal modulation: empathetic customer care, assertive sales, or calm executive delivery',
      'Direct SIP/VoIP telephony trunking with bidirectional live CRM state synchronization'
    ],
    metrics: {
      latency: '118ms duplex response',
      accuracy: '99.4% speech recognition',
      throughput: '100,000 concurrent calls'
    },
    liveDemoInputPlaceholder: 'Customer: "Wait, before you confirm my enterprise seat billing, can we transfer remaining credits to our EU subsidiary?"',
    demoOutputSample: 'Vocalis detected barge-in in 18ms, paused previous statement seamlessly, and replied in reassuring tone: "Absolutely. I have applied the credit transfer policy for your EU subsidiary and emailed your revised invoice."'
  },
  {
    id: 'animated-inshort-news',
    name: 'InshortMotion News AI',
    tagline: 'Automated 60-Word Breaking News to Animated Video Shorts',
    badge: 'Animated News',
    category: 'Animated News & Media',
    description: 'Autonomous media news engine that monitors global wire feeds (Reuters, Bloomberg, AP), distills breaking events into strict 60-word verified briefs, and renders 15-second animated infographics, data charts, and dynamic visual shorts for social feeds.',
    features: [
      'Real-time global wire ingestion with automated multi-source fact-checking and anti-hallucination verification',
      'Strict 60-word editorial briefing algorithm optimized for maximum cognitive retention',
      'Dynamic infographic synthesizer: generates animated stock charts, geographical maps, and stylized anchor reels',
      'Automated multi-platform publishing pipeline to Instagram Reels, YouTube Shorts, and X'
    ],
    metrics: {
      latency: '24s end-to-end publish',
      accuracy: '100% verified facts',
      throughput: '1,200 shorts/day'
    },
    liveDemoInputPlaceholder: 'Wire: Global Energy Forum declares 40GW offshore floating wind initiative across North Sea with $12B financing package...',
    demoOutputSample: 'Drafted 60-word verified brief: "North Sea $12B Floating Wind Initiative Greenlit." Rendered 15-second animated short featuring glowing kinetic offshore turbine models, financial summary bar, and broadcast narrator voice.'
  },
  {
    id: 'file-info-extractor',
    name: 'DocuExtract Multi-File Intelligence',
    tagline: 'High-Precision PDF, Table & Document Intelligence Extractor',
    badge: 'Doc Intelligence',
    category: 'Document Intelligence',
    description: 'Enterprise multimodal document parsing platform that ingests complex PDFs, multi-tab Excel workbooks, scanned receipts, research whitepapers, and legal agreements, extracting validated JSON schemas with zero hallucination and complete mathematical reconciliation.',
    features: [
      'Universal format ingestion: multi-page PDF, scanned TIFF, DOCX, XLSX, and high-res image documents',
      'Spatial layout preservation: extracts nested tables, multi-column headers, and financial footnote disclosures',
      'Deterministic schema validation: enforces strict TypeScript & Pydantic output schemas with zero hallucination',
      'Cross-document reconciliation: verifies balance sheet arithmetic and cross-references multi-contract covenants'
    ],
    metrics: {
      latency: '140ms per page',
      accuracy: '99.9% table parsing',
      throughput: '50,000 pages/hour'
    },
    liveDemoInputPlaceholder: 'Upload 140-page SEC 10-K filing PDF. Extract EBITDA, long-term debt covenants, segment operating margins, and executive stock grants...',
    demoOutputSample: 'Processed 140 pages in 19.6s. Extracted 112 structured financial entities into schema-validated JSON. Verified 100% mathematical reconciliation against balance sheet totals with cited page coordinates [p.42, line 18].'
  }
];

export const AGENCY_SERVICES: AgencyService[] = [
  {
    id: 'brand-identity',
    title: 'Brand Identity & Narrative Engineering',
    shortDesc: 'Positioning your new brand to dominate in the AI era with high-converting visual identity, motion design, and developer-first messaging.',
    deliverables: ['Brand Guidelines & Style System', 'Interactive Pitch Decks & Web Assets', 'Mission & Core Value Messaging', '60fps Kinetic Motion Graphics'],
    growthMetric: '94% Investor Recall Rate',
    tag: 'Design & Strategy'
  },
  {
    id: 'ai-creative-engine',
    title: 'AI-Generated Ad Creatives & Video Content',
    shortDesc: 'Automated synthesis of high-performing video reels, UGC simulations, and static variations tested continuously against live algorithms.',
    deliverables: ['120+ Monthly Ad Creatives', 'Dynamic Hook Testing (10 variants/ad)', 'Platform-Specific Formats (9:16 & 1:1)', 'Rapid Creative Fatigue Refresh'],
    growthMetric: '3.8x Average Return on Ad Spend (ROAS)',
    tag: 'Performance Media'
  },
  {
    id: 'growth-acquisition',
    title: 'Omnichannel Paid Acquisition (Meta, Google, X, TikTok)',
    shortDesc: 'Full-funnel campaign management engineered for seed and Series A startups to hit sustainable unit economics and scale MRR.',
    deliverables: ['Predictive Audience Targeting', 'Automated Daily Bid & Budget Optimization', 'Zero-Waste Retargeting Funnels', 'Real-time Fraud & Bot Filtering'],
    growthMetric: '62% Reduction in Blended CAC',
    tag: 'Paid Acquisition'
  },
  {
    id: 'analytics-cro',
    title: 'Conversion Rate Optimization & Funnel Analytics',
    shortDesc: 'Deep behavioral heatmapping, multivariate landing page experimentation, and custom telemetry to maximize visitor-to-customer conversion.',
    deliverables: ['High-Speed Interactive Landing Pages', 'Event-Driven Telemetry Setup', 'Continuous A/B/n Testing Cadence', 'Executive ROI Reports'],
    growthMetric: '+48% Landing Page Conversion',
    tag: 'CRO & Telemetry'
  }
];

export const AGENCY_CASE_STUDIES: AgencyCaseStudy[] = [
  {
    id: 'case-1',
    clientName: 'Synthetix Robotics',
    industry: 'Autonomous Hardware & AI Vision',
    challenge: 'Early-stage deep tech startup struggling to translate complex autonomous navigation technology into commercial pipeline and investor excitement.',
    solution: 'Designed complete visual rebrand, kinetic 3D motion graphics hero videos, and executed a 60-day hyper-targeted LinkedIn & Google Tech search campaign.',
    resultMetrics: [
      { label: 'Pipeline Generated', value: '$2.8M' },
      { label: 'CAC Decrease', value: '-54%' },
      { label: 'Qualified Demos Booked', value: '184' }
    ]
  },
  {
    id: 'case-2',
    clientName: 'PulseFlow BioTech',
    industry: 'HealthTech & Wearable AI',
    challenge: 'Needed rapid consumer waitlist validation for a consumer AI diagnostic ring before closing their Series A round.',
    solution: 'Engineered viral video hooks with our AuraSynth AI engine, deployed 24 landing page variants, and captured high-intent signups at scale.',
    resultMetrics: [
      { label: 'Waitlist Signups', value: '46,500+' },
      { label: 'Cost Per Lead', value: '$0.78' },
      { label: 'Oversubscribed Round', value: '$4.5M Seed' }
    ]
  }
];

export const ANALYTICS_TIMESERIES: AnalyticsDataPoint[] = [
  { date: 'Aug 01', revenue: 14200, adSpend: 3100, conversions: 210, cac: 14.76, roas: 4.58 },
  { date: 'Aug 08', revenue: 18900, adSpend: 3800, conversions: 285, cac: 13.33, roas: 4.97 },
  { date: 'Aug 15', revenue: 23400, adSpend: 4400, conversions: 360, cac: 12.22, roas: 5.31 },
  { date: 'Aug 22', revenue: 29800, adSpend: 5200, conversions: 440, cac: 11.81, roas: 5.73 },
  { date: 'Aug 29', revenue: 34100, adSpend: 5900, conversions: 512, cac: 11.52, roas: 5.78 },
  { date: 'Sep 05', revenue: 41200, adSpend: 6700, conversions: 624, cac: 10.73, roas: 6.15 },
  { date: 'Sep 12', revenue: 48600, adSpend: 7500, conversions: 740, cac: 10.13, roas: 6.48 }
];

export const CHANNEL_PERFORMANCE_DATA: ChannelPerformance[] = [
  { channel: 'Google Search AI Intent', spend: 8500, revenue: 54400, roas: 6.4, leads: 820, cpl: 10.36 },
  { channel: 'Meta Hyper-Targeted Ads', spend: 12400, revenue: 68200, roas: 5.5, leads: 1340, cpl: 9.25 },
  { channel: 'LinkedIn B2B Precision', spend: 7200, revenue: 43200, roas: 6.0, leads: 410, cpl: 17.56 },
  { channel: 'TikTok Creative Reels', spend: 4800, revenue: 27840, roas: 5.8, leads: 910, cpl: 5.27 },
  { channel: 'Organic & Partner Referrals', spend: 1200, revenue: 19800, roas: 16.5, leads: 640, cpl: 1.87 }
];
