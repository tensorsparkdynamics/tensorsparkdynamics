import { AgencyServiceDetail, AgencyServiceId } from '../types';

export const AGENCY_SERVICES_DETAILS: Record<AgencyServiceId, AgencyServiceDetail> = {
  'web-development': {
    id: 'web-development',
    title: 'Next-Gen Full-Stack Web Development',
    shortTitle: 'Web Development',
    subtitle: 'Lightning-fast, high-converting digital experiences engineered for modern tech startups and enterprise leaders.',
    tagline: 'Sub-40ms TTFB • 99+ Lighthouse Scores • Zero-Lag Interactions',
    description: 'We engineer bespoke web applications, interactive marketing frontends, SaaS dashboards, and headless ecommerce platforms. Utilizing modern React 19, Next.js 15, TypeScript, WebGL/Three.js, and edge microservices, we build platforms that captivate users and drive commercial conversions.',
    category: 'Engineering & Code',
    badge: 'Core Service',
    highlightMetric: '99+ / 100',
    highlightLabel: 'Avg Google Lighthouse Performance Score',
    secondaryMetric: '3.4x',
    secondaryLabel: 'Faster Page Loads than Competitors',
    technologies: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'WebGL / Three.js', 'Node.js', 'FastAPI', 'PostgreSQL', 'Cloudflare Edge'],
    coreCapabilities: [
      {
        title: 'High-Converting Web Apps & SaaS Portals',
        desc: 'Interactive client dashboards, authentication flows, real-time data streaming, and scalable responsive layouts.',
        deliverable: 'Production-ready production web application with CI/CD deployment pipelines'
      },
      {
        title: 'Interactive 3D & Kinetic Motion Frontends',
        desc: 'WebGL, Three.js shaders, and smooth 60fps micro-animations that make your product launch unforgettable.',
        deliverable: 'Fluid GPU-accelerated interactive experience and custom canvas animations'
      },
      {
        title: 'Headless CMS & Dynamic Architecture',
        desc: 'Clean content modeling via Sanity, Strapi, or Supabase, empowering your marketing team to publish without developer blockers.',
        deliverable: 'Intuitive headless backend configuration with instant live preview'
      },
      {
        title: 'Core Web Vitals & Technical SEO Mastery',
        desc: 'Structured JSON-LD schema, server-side static generation, edge caching, and image optimization for peak Google search visibility.',
        deliverable: 'Full technical SEO certification and sub-second load times'
      }
    ],
    processSteps: [
      { phase: 'Phase 01', name: 'Architecture & Wireframes', summary: 'Technical stack selection, state management blueprints, and component hierarchy planning.' },
      { phase: 'Phase 02', name: 'Agile Component Sprints', summary: 'Bi-weekly builds with clean TypeScript typing, responsive layouts, and interactive micro-states.' },
      { phase: 'Phase 03', name: 'API & Backend Integration', summary: 'Connecting REST/GraphQL/WebSocket services, databases, authentication, and edge caching.' },
      { phase: 'Phase 04', name: 'Auditing & Global Deployment', summary: 'Automated penetration testing, cross-browser verification, and global CDN DNS configuration.' }
    ],
    caseStudy: {
      client: 'Vortex Quantum Compute',
      impact: 'Redesigned entire developer cloud portal and marketing hub from legacy Angular to Next.js 15.',
      description: 'Resulted in 4.2x organic signups, cut page load times from 3.8s down to 310ms, and scaled from zero to 120,000 monthly active engineers.',
      metricValue: '310ms',
      metricLabel: 'Global p95 Latency'
    },
    samplePackages: [
      {
        name: 'Startup Launchpad MVP',
        timeline: '2 - 3 Weeks',
        price: '$4,500',
        features: [
          'Up to 5 custom interactive pages',
          'Next.js 15 + Tailwind CSS architecture',
          'Responsive desktop & mobile optimization',
          'Contact inquiry & analytics integrations',
          '100% SEO & Core Web Vitals pass rate'
        ]
      },
      {
        name: 'Full-Stack SaaS Platform',
        timeline: '4 - 6 Weeks',
        price: '$9,800',
        popular: true,
        features: [
          'Complete web application & user portal',
          'Auth, database & REST/GraphQL API setup',
          'Interactive charts & data telemetry',
          'Stripe / LemonSqueezy payment gateway',
          'Role-based access control & admin CMS',
          '30 days post-launch hypercare'
        ]
      },
      {
        name: 'Enterprise Custom Scale',
        timeline: '8+ Weeks',
        price: 'Custom Scope',
        features: [
          'High-throughput microservices architecture',
          'Custom 3D WebGL / Three.js interactive visuals',
          'Multi-region edge cluster deployment',
          'Dedicated engineering squad & SLA support',
          'SOC-2 / GDPR security hardening'
        ]
      }
    ]
  },

  'ux-ui-design': {
    id: 'ux-ui-design',
    title: 'Product UX/UI Design & Design Systems',
    shortTitle: 'UX/UI Design',
    subtitle: 'Human-centered interfaces, cohesive component design systems, and frictionless conversion journeys.',
    tagline: 'Figma Auto-Layout Mastered • 100% Tokenized Systems • Zero-Friction UX',
    description: 'Great software fails when user experience is an afterthought. We build deeply researched, beautifully crafted UX/UI designs that make complex technological workflows feel instinctive. From comprehensive Figma design tokens to interactive user test prototypes, we turn visitors into committed brand evangelists.',
    category: 'Design & Experience',
    badge: 'Award-Winning',
    highlightMetric: '4.8 / 5.0',
    highlightLabel: 'SUS (System Usability Scale) Benchmark',
    secondaryMetric: '+64%',
    secondaryLabel: 'User Task Completion Velocity',
    technologies: ['Figma', 'FigJam', 'Tokens Studio', 'Framer', 'Principle', 'Maze User Testing', 'Lottie Lab', 'Tailwind Tokens'],
    coreCapabilities: [
      {
        title: 'Comprehensive Design Systems & Figma Tokens',
        desc: 'Scalable typography scales, mathematical spacing grids, dark/light color schemes, and hundreds of reusable components.',
        deliverable: 'Master Figma library linked directly to code variables via CSS/Tailwind tokens'
      },
      {
        title: 'Deep User Research & Journey Mapping',
        desc: 'Persona definitions, competitive heuristic audits, information architecture, and behavioral journey diagrams.',
        deliverable: 'Evidence-based UX research deck and clickable wireframe blueprints'
      },
      {
        title: 'High-Fidelity Interactive Prototyping',
        desc: 'Pixel-perfect UI screens with hyper-realistic hover, active, drag-and-drop, and micro-interaction states.',
        deliverable: 'Clickable investor-ready and developer-ready interactive prototypes'
      },
      {
        title: 'Usability Testing & Conversion Optimization',
        desc: 'Unmoderated user testing sessions, heatmaps, and funnel drop-off diagnostics to eliminate user frustration.',
        deliverable: 'Data-driven redesign recommendations and UX scorecard'
      }
    ],
    processSteps: [
      { phase: 'Phase 01', name: 'Discovery & Heuristic Audit', summary: 'Unpack user archetypes, audit competitive landscape, and define product milestones.' },
      { phase: 'Phase 02', name: 'Wireframing & Information Flow', summary: 'Low-fidelity layout validation, structural flowcharts, and frictionless funnel mapping.' },
      { phase: 'Phase 03', name: 'Visual UI & Component Design', summary: 'Elevating aesthetic polish with luxury dark/light modes, custom typography, and icons.' },
      { phase: 'Phase 04', name: 'Developer Handoff & Specs', summary: 'Exporting zero-ambiguity design tokens, responsive guidelines, and interactive states.' }
    ],
    caseStudy: {
      client: 'Aetheris AI Workspace',
      impact: 'Rethought complete multi-tab AI prompt IDE and workflow canvas.',
      description: 'Streamlined user navigation, reducing time-to-first-inference from 4.2 minutes to 38 seconds. Boosted day-30 user retention by 51%.',
      metricValue: '+51%',
      metricLabel: 'Day-30 Retention Uplift'
    },
    samplePackages: [
      {
        name: 'UI Refresh & Audit',
        timeline: '1 - 2 Weeks',
        price: '$3,200',
        features: [
          'Full heuristic usability audit of current app',
          'UI polish for up to 6 core screens',
          'Standardized color palette & typography kit',
          'Responsive tablet & mobile adaptations'
        ]
      },
      {
        name: 'Complete Product Design & System',
        timeline: '3 - 5 Weeks',
        price: '$7,500',
        popular: true,
        features: [
          'End-to-end design for up to 20 screens',
          'Complete Figma tokenized design system',
          'Interactive clickable prototype for testing/investors',
          'Dark & Light mode token sets',
          'Video walkthrough for developer engineering handoff'
        ]
      },
      {
        name: 'Enterprise Continuous Design Partner',
        timeline: 'Monthly Retainer',
        price: '$5,800 / mo',
        features: [
          'Dedicated senior product designer on Slack',
          'Continuous sprint iterations & new feature UX',
          'Ongoing user testing & usability research',
          'Quarterly design system evolution & audits'
        ]
      }
    ]
  },

  'graphic-design': {
    id: 'graphic-design',
    title: 'Graphic Designing & Brand Visual Identity',
    shortTitle: 'Graphic Designing',
    subtitle: 'Bespoke brand identities, vector typography, packaging design, editorial layout, and high-impact marketing collateral.',
    tagline: 'Vector Perfection • Golden Ratio Composition • Print & Digital Production Ready',
    description: 'Visual identity is the emotional bridge between your breakthrough technology and your audience. We engineer iconic logo systems, brand guidelines, marketing print collateral, vector illustrations, typography hierarchies, and social assets that establish instant authority and high perceived value.',
    category: 'Design & Visual Arts',
    badge: 'Vector Mastery',
    highlightMetric: '300 DPI',
    highlightLabel: 'Vector & Print-Ready Fidelity',
    secondaryMetric: '100%',
    secondaryLabel: 'Vector Scalability & Source Ownership',
    technologies: ['Adobe Illustrator', 'Photoshop', 'InDesign', 'Figma', 'VectorStyler', 'CorelDRAW', 'Glyphs 3', 'Cinema 4D'],
    coreCapabilities: [
      {
        title: 'Brand Identity & Vector Logo Systems',
        desc: 'Precision geometry logos built on golden ratio circles, custom typography lockups, responsive horizontal/vertical lockups, and full monochrome & inverted iterations.',
        deliverable: 'Master vector logo suite (SVG, EPS, AI, PDF/X) + Comprehensive 40-page brand guidelines'
      },
      {
        title: 'Marketing Collateral & Editorial Layout',
        desc: 'Investor pitch decks, annual reports, product whitepapers, brochures, trade show booths, and roll-up banners with pristine Swiss typographic grids.',
        deliverable: 'Print-ready CMYK assets with 3mm bleed margins & interactive digital presentation decks'
      },
      {
        title: 'Product Packaging & 3D Mockup Dielines',
        desc: 'Physical packaging engineering: exact dieline cut/crease layouts, foil-stamping and spot-UV varnish callouts, and photorealistic 3D product renders.',
        deliverable: 'Factory-certified CAD/vector dielines and 4K photorealistic product packaging renders'
      },
      {
        title: 'Digital Brand Assets & Social Design Systems',
        desc: 'Custom vector icon libraries, branded infographic templates, social media design packs, and display advertising creative suites.',
        deliverable: 'Figma and Illustrator asset libraries with scalable vector components and export presets'
      }
    ],
    processSteps: [
      { phase: 'Phase 01', name: 'Visual Discovery & Moodboarding', summary: 'Unpack brand archetype, competitive landscape, aesthetic moodboards, and color psychology.' },
      { phase: 'Phase 02', name: 'Vector Drafting & Golden Ratio', summary: 'Hand-sketching concepts, geometric vector digitization, and typography pairing exploration.' },
      { phase: 'Phase 03', name: 'Collateral System & Mockups', summary: 'Applying brand mark to business stationery, pitch decks, product packaging, and digital touchpoints.' },
      { phase: 'Phase 04', name: 'Brand Book & Asset Handoff', summary: 'Packaging all vector source files, color formula specs (Pantone, CMYK, RGB, HEX), and print guides.' }
    ],
    caseStudy: {
      client: 'AuraScale Technologies',
      impact: 'Complete corporate visual identity overhaul, typography system, investor deck, and exhibition booth.',
      description: 'Unified fragmented visual touchpoints into an elite identity system. Led to successful $14M Series A closing and 96% positive brand recall in enterprise client surveys.',
      metricValue: '+96%',
      metricLabel: 'Brand Recall & Authority Rating'
    },
    samplePackages: [
      {
        name: 'Brand Identity Starter Kit',
        timeline: '1 - 2 Weeks',
        price: '$2,400',
        features: [
          'Primary, secondary & icon brand mark designs',
          'Full vector source files (AI, EPS, SVG, PDF)',
          'Color palette system (Pantone, CMYK, RGB, HEX)',
          'Typography pairing rules & font licensing guide',
          'Standard business card & letterhead collateral'
        ]
      },
      {
        name: 'Complete Corporate Graphic Design Suite',
        timeline: '3 - 4 Weeks',
        price: '$5,800',
        popular: true,
        features: [
          'Master brand identity with golden-ratio geometric construction',
          'Comprehensive 40+ page brand style guidelines',
          'Full marketing collateral pack (Pitch deck, brochure, folder)',
          'Custom 24-piece vector iconography library',
          '3D photorealistic product packaging & stationery mockups',
          'Social media design template kit (LinkedIn, X, Instagram)'
        ]
      },
      {
        name: 'Monthly Dedicated Graphic Design Partner',
        timeline: 'Monthly Retainer',
        price: '$4,600 / mo',
        features: [
          'Unlimited graphic design requests (collateral, decks, ads, banners)',
          'Dedicated senior art director & vector illustrator',
          'Same-day turnarounds for urgent press/pitch assets',
          'Print production supervision & vendor pre-flight coordination'
        ]
      }
    ]
  },

  'video-editing': {
    id: 'video-editing',
    title: 'Graphic Designing & Brand Visual Identity',
    shortTitle: 'Graphic Designing',
    subtitle: 'Bespoke brand identities, vector typography, packaging design, editorial layout, and high-impact marketing collateral.',
    tagline: 'Vector Perfection • Golden Ratio Composition • Print & Digital Production Ready',
    description: 'Visual identity is the emotional bridge between your breakthrough technology and your audience. We engineer iconic logo systems, brand guidelines, marketing print collateral, vector illustrations, typography hierarchies, and social assets that establish instant authority and high perceived value.',
    category: 'Design & Visual Arts',
    badge: 'Vector Mastery',
    highlightMetric: '300 DPI',
    highlightLabel: 'Vector & Print-Ready Fidelity',
    secondaryMetric: '100%',
    secondaryLabel: 'Vector Scalability & Source Ownership',
    technologies: ['Adobe Illustrator', 'Photoshop', 'InDesign', 'Figma', 'VectorStyler', 'CorelDRAW', 'Glyphs 3', 'Cinema 4D'],
    coreCapabilities: [
      {
        title: 'Brand Identity & Vector Logo Systems',
        desc: 'Precision geometry logos built on golden ratio circles, custom typography lockups, responsive horizontal/vertical lockups, and full monochrome & inverted iterations.',
        deliverable: 'Master vector logo suite (SVG, EPS, AI, PDF/X) + Comprehensive 40-page brand guidelines'
      },
      {
        title: 'Marketing Collateral & Editorial Layout',
        desc: 'Investor pitch decks, annual reports, product whitepapers, brochures, trade show booths, and roll-up banners with pristine Swiss typographic grids.',
        deliverable: 'Print-ready CMYK assets with 3mm bleed margins & interactive digital presentation decks'
      },
      {
        title: 'Product Packaging & 3D Mockup Dielines',
        desc: 'Physical packaging engineering: exact dieline cut/crease layouts, foil-stamping and spot-UV varnish callouts, and photorealistic 3D product renders.',
        deliverable: 'Factory-certified CAD/vector dielines and 4K photorealistic product packaging renders'
      },
      {
        title: 'Digital Brand Assets & Social Design Systems',
        desc: 'Custom vector icon libraries, branded infographic templates, social media design packs, and display advertising creative suites.',
        deliverable: 'Figma and Illustrator asset libraries with scalable vector components and export presets'
      }
    ],
    processSteps: [
      { phase: 'Phase 01', name: 'Visual Discovery & Moodboarding', summary: 'Unpack brand archetype, competitive landscape, aesthetic moodboards, and color psychology.' },
      { phase: 'Phase 02', name: 'Vector Drafting & Golden Ratio', summary: 'Hand-sketching concepts, geometric vector digitization, and typography pairing exploration.' },
      { phase: 'Phase 03', name: 'Collateral System & Mockups', summary: 'Applying brand mark to business stationery, pitch decks, product packaging, and digital touchpoints.' },
      { phase: 'Phase 04', name: 'Brand Book & Asset Handoff', summary: 'Packaging all vector source files, color formula specs (Pantone, CMYK, RGB, HEX), and print guides.' }
    ],
    caseStudy: {
      client: 'AuraScale Technologies',
      impact: 'Complete corporate visual identity overhaul, typography system, investor deck, and exhibition booth.',
      description: 'Unified fragmented visual touchpoints into an elite identity system. Led to successful $14M Series A closing and 96% positive brand recall in enterprise client surveys.',
      metricValue: '+96%',
      metricLabel: 'Brand Recall & Authority Rating'
    },
    samplePackages: [
      {
        name: 'Brand Identity Starter Kit',
        timeline: '1 - 2 Weeks',
        price: '$2,400',
        features: [
          'Primary, secondary & icon brand mark designs',
          'Full vector source files (AI, EPS, SVG, PDF)',
          'Color palette system (Pantone, CMYK, RGB, HEX)',
          'Typography pairing rules & font licensing guide',
          'Standard business card & letterhead collateral'
        ]
      },
      {
        name: 'Complete Corporate Graphic Design Suite',
        timeline: '3 - 4 Weeks',
        price: '$5,800',
        popular: true,
        features: [
          'Master brand identity with golden-ratio geometric construction',
          'Comprehensive 40+ page brand style guidelines',
          'Full marketing collateral pack (Pitch deck, brochure, folder)',
          'Custom 24-piece vector iconography library',
          '3D photorealistic product packaging & stationery mockups',
          'Social media design template kit (LinkedIn, X, Instagram)'
        ]
      },
      {
        name: 'Monthly Dedicated Graphic Design Partner',
        timeline: 'Monthly Retainer',
        price: '$4,600 / mo',
        features: [
          'Unlimited graphic design requests (collateral, decks, ads, banners)',
          'Dedicated senior art director & vector illustrator',
          'Same-day turnarounds for urgent press/pitch assets',
          'Print production supervision & vendor pre-flight coordination'
        ]
      }
    ]
  },

  'ai-integration': {
    id: 'ai-integration',
    title: 'Enterprise AI Integration & Custom RAG',
    shortTitle: 'AI Integration',
    subtitle: 'Infuse your existing software with intelligent LLM capabilities, private semantic search, and automated intelligence.',
    tagline: 'Sub-50ms Streaming • Zero Data Leaks • 99.6% Retrieval Accuracy',
    description: 'Bringing state-of-the-art AI into real-world business operations requires more than basic API calls. We architect resilient, enterprise-grade AI backends: hybrid Retrieval-Augmented Generation (RAG), context caching, token cost optimization, multi-modal ingestion, and robust guardrails to eliminate hallucinations.',
    category: 'Applied AI',
    badge: 'High Demand',
    highlightMetric: '99.6%',
    highlightLabel: 'Contextual RAG Retrieval Accuracy',
    secondaryMetric: '-68%',
    secondaryLabel: 'Token Cost Reduction via Smart Routing',
    technologies: ['Gemini 2.5 / 1.5 Pro', 'OpenAI GPT-4o', 'Claude 3.5 Sonnet', 'Pinecone', 'Qdrant', 'pgvector', 'LangChain', 'LlamaIndex', 'FastAPI'],
    coreCapabilities: [
      {
        title: 'Custom RAG & Hybrid Vector Pipelines',
        desc: 'Ingest proprietary PDFs, technical manuals, contracts, and internal databases into high-precision vector embeddings.',
        deliverable: 'Semantic search engine with BM25 reranking and source citation badges'
      },
      {
        title: 'Multi-LLM Intelligent Cost Routing',
        desc: 'Dynamically route simple user queries to lightweight fast models and reserve frontier models for complex reasoning.',
        deliverable: 'Automatic router reducing monthly token expenditure by 40-70%'
      },
      {
        title: 'Hallucination Guardrails & Cryptographic Audit',
        desc: 'Strict input sanitization, PII redaction, prompt injection defense, and structured JSON schema enforcement.',
        deliverable: 'Secure SOC2-ready middleware layer between clients and AI models'
      },
      {
        title: 'Real-Time Streaming WebSocket Integrations',
        desc: 'Deliver token-by-token streaming experiences to your user interface with sub-50ms time-to-first-token.',
        deliverable: 'Client-side hooks and backend SSE endpoints for seamless UX'
      }
    ],
    processSteps: [
      { phase: 'Phase 01', name: 'Data Ingestion & Chunking Strategy', summary: 'Cleaning internal documents, experimenting with chunk sizes, and vectorizing embeddings.' },
      { phase: 'Phase 02', name: 'RAG Pipeline & Retrieval Tuning', summary: 'Implementing hybrid semantic + keyword search with cross-encoder re-ranking.' },
      { phase: 'Phase 03', name: 'Model Evaluation & Red Teaming', summary: 'Benchmarking 500+ real queries for accuracy, latency, and adversarial guardrail testing.' },
      { phase: 'Phase 04', name: 'Production Cloud Deployment', summary: 'Containerizing services on Kubernetes/Cloud Run with automated telemetry.' }
    ],
    caseStudy: {
      client: 'LexiCorp Legal Intelligence',
      impact: 'Built private RAG system querying 2.5M legal case documents.',
      description: 'Cut contract review time by 82% while maintaining 0 false citations across 45,000 monthly lawyer queries.',
      metricValue: '82%',
      metricLabel: 'Reduction in Review Time'
    },
    samplePackages: [
      {
        name: 'AI Feature Prototype',
        timeline: '2 Weeks',
        price: '$4,200',
        features: [
          'Single LLM feature integration into your web app',
          'Document parsing & basic vector search',
          'Streaming response frontend components',
          'API key security proxy & rate limiter'
        ]
      },
      {
        name: 'Production Enterprise RAG System',
        timeline: '4 - 6 Weeks',
        price: '$11,500',
        popular: true,
        features: [
          'End-to-end proprietary knowledge base vectorization',
          'Hybrid search (Dense + Sparse BM25 + Re-ranker)',
          'Strict hallucination guardrails & PII filters',
          'Multi-model fallback routing & cost analytics',
          'Full documentation, evaluation suite & dev handoff'
        ]
      },
      {
        name: 'Full AI Transformation Retainer',
        timeline: 'Ongoing',
        price: '$7,800 / mo',
        features: [
          'Continuous model fine-tuning on new domain data',
          'Weekly prompt evaluation benchmarks',
          'New autonomous tool integrations',
          'Dedicated senior AI architect'
        ]
      }
    ]
  },

  'ai-agents': {
    id: 'ai-agents',
    title: 'Autonomous AI Agents & Multi-Agent Swarms',
    shortTitle: 'AI Agents',
    subtitle: 'Deploy self-coordinating agent workforces that execute multi-step workflows, research, coding, and customer operations 24/7.',
    tagline: 'Self-Correcting Loops • Tool Calling • 24/7 Autonomous Execution',
    description: 'The paradigm has shifted from passive chatbots to proactive autonomous agents. We build production-ready multi-agent swarms using frameworks like LangGraph and CrewAI. Our agents execute complex asynchronous tasks: scraping web data, updating CRMs, generating tailored code, triaging customer tickets, and orchestrating business logic with zero human intervention.',
    category: 'Autonomous Systems',
    badge: 'Frontier Tech',
    highlightMetric: '94.2%',
    highlightLabel: 'Autonomous Task Completion Without Human Escalation',
    secondaryMetric: '10,000+',
    secondaryLabel: 'Daily Autonomous Tool Calls Executed',
    technologies: ['LangGraph', 'CrewAI', 'AutoGen', 'Python', 'FastAPI', 'Playwright', 'Redis Streams', 'Docker', 'Ollama'],
    coreCapabilities: [
      {
        title: 'Multi-Agent Swarm Orchestration',
        desc: 'Specialized agent personas (Researcher, Writer, Reviewer, Executor) collaborating dynamically with peer review loops.',
        deliverable: 'Autonomous state-machine DAG with failover and rollback capabilities'
      },
      {
        title: 'Headless Browser Automation & Web Scraping',
        desc: 'Agents capable of navigating complex modern web interfaces, authenticating, and extracting unstructured dynamic data.',
        deliverable: 'Resilient Playwright-backed agent tools with proxy rotation'
      },
      {
        title: 'Self-Healing Tool Execution & Code Synthesis',
        desc: 'Agents that write code, execute in sandboxed containers, interpret error stacktraces, and fix bugs autonomously.',
        deliverable: 'Sandboxed Python/Node execution environment with audit logging'
      },
      {
        title: 'Human-in-the-Loop Approval Checkpoints',
        desc: 'Allow agents to handle 90% of routine workflows while seamlessly requesting human approval on sensitive actions (e.g. transfers, emails).',
        deliverable: 'Interactive Slack / Discord / Webhook approval portal'
      }
    ],
    processSteps: [
      { phase: 'Phase 01', name: 'Task Decomposition & Architecture', summary: 'Deconstruct complex human workflows into atomic deterministic agent states.' },
      { phase: 'Phase 02', name: 'Tool Binding & API Integration', summary: 'Equipping agents with custom search, database, email, and calculation tools.' },
      { phase: 'Phase 03', name: 'Reflexion & Memory Loops', summary: 'Programming self-evaluation loops, short-term conversational context, and long-term vector memory.' },
      { phase: 'Phase 04', name: 'Stress Testing & Chaos Scenarios', summary: 'Simulating edge cases, circular logic traps, and network drops to ensure resilience.' }
    ],
    caseStudy: {
      client: 'OmniVenture Partners',
      impact: 'Deployed autonomous startup deal-sourcing and diligence agent swarm.',
      description: 'Scanned 14,000 startup pitches, evaluated Github velocity and team backgrounds, and prepared 120 deep diligence memos with 0 manual analyst hours.',
      metricValue: '14,000+',
      metricLabel: 'Startups Analyzed Autonomously'
    },
    samplePackages: [
      {
        name: 'Single-Purpose Agent Bot',
        timeline: '2 - 3 Weeks',
        price: '$5,400',
        features: [
          'Autonomous agent for one specific workflow (e.g. Lead Qualification)',
          'Custom tool integrations (Email, CRM, Search)',
          'Slack or Telegram interactive command interface',
          'Execution logs and audit dashboard'
        ]
      },
      {
        name: 'Enterprise Multi-Agent Swarm',
        timeline: '5 - 7 Weeks',
        price: '$14,200',
        popular: true,
        features: [
          'Orchestrated multi-role swarm (Planner, Coder, Validator, Dispatcher)',
          'LangGraph state-machine with dynamic self-correction',
          'Human-in-the-loop Slack/Web approval workflows',
          'Browser automation & structured database manipulation',
          'Containerized deployment & 60 days dedicated monitoring'
        ]
      },
      {
        name: 'Autonomous Operations Transformation',
        timeline: 'Custom',
        price: 'From $22,000',
        features: [
          'Full-scale company operations automation',
          'Custom proprietary agent fine-tuning & local models',
          'On-premise air-gapped deployment option',
          '24/7 dedicated support & live telemetry monitoring'
        ]
      }
    ]
  },

  'photoshop': {
    id: 'photoshop',
    title: 'Photoshop & High-End Visual Retouching',
    shortTitle: 'Photoshop',
    subtitle: 'Pixel-perfect digital imagery, composite visual manipulation, 3D product rendering, and luxury brand marketing assets.',
    tagline: '16-Bit Color Depth • Non-Destructive Master Files • Print & 8K Digital Ready',
    description: 'Visual perception establishes brand value in milliseconds. Our master Photoshop digital artists craft hyper-polished key visuals, complex multi-layer composites, high-fashion skin retouching, product photography cleanups, and ultra-high-DPI advertising billboards. We bridge traditional digital artistry with generative AI workflows to deliver perfection.',
    category: 'Creative & Visual Art',
    badge: 'Craft Excellence',
    highlightMetric: '100%',
    highlightLabel: 'Non-Destructive Layer Master Files',
    secondaryMetric: '8K / 300 DPI',
    secondaryLabel: 'Master Resolution for Global Campaigns',
    technologies: ['Adobe Photoshop 2026', 'Adobe Illustrator', 'Adobe Camera RAW', 'Capture One Pro', 'Topaz Gigapixel AI', 'Adobe Firefly', 'Midjourney 6.1'],
    coreCapabilities: [
      {
        title: 'Commercial Product Retouching & Cleanups',
        desc: 'Eliminating micro-scratches, dust, reflections, and imperfections while reconstructing materials with photorealistic textures.',
        deliverable: 'Flawless e-commerce & billboard-grade product hero cutouts'
      },
      {
        title: 'Complex Multi-Plate Creative Compositing',
        desc: 'Blending multiple disparate photography assets, atmospheric lighting, volumetric smoke, and shadows into a singular seamless reality.',
        deliverable: 'Key visual campaign artwork and hero marketing banners'
      },
      {
        title: '3D Mockups & Hardware Packaging Visualization',
        desc: 'Projecting brand identities onto realistic 3D bottle, box, device, and textile packaging with accurate surface warp distortion.',
        deliverable: 'Photorealistic investor decks and commercial packaging mockups'
      },
      {
        title: 'Color Grading & Cinematic Atmosphere',
        desc: 'Advanced color grading, dodging and burning, frequency separation, and LUT styling to achieve an unmistakably premium aura.',
        deliverable: 'Consistent branded visual lookbook and standardized export presets'
      }
    ],
    processSteps: [
      { phase: 'Phase 01', name: 'Raw Ingestion & Plate Planning', summary: 'Selecting highest bit-depth camera RAW files and planning lighting interaction.' },
      { phase: 'Phase 02', name: 'Frequency Separation & Cleanup', summary: 'Separating high-frequency texture from low-frequency color for non-destructive healing.' },
      { phase: 'Phase 03', name: 'Lighting, Shading & Compositing', summary: 'Painting manual highlight curves, cast shadows, and volumetric ambiance.' },
      { phase: 'Phase 04', name: 'Final Color Tone & Multi-Format Delivery', summary: 'Exporting in sRGB for web, AdobeRGB for displays, and CMYK for print.' }
    ],
    caseStudy: {
      client: 'Lumina Smart Optics',
      impact: 'Executed master campaign retouching for smart AR sunglasses worldwide launch.',
      description: 'Created 45 composite scenes featuring high-contrast futuristic urban backgrounds, yielding a 3.7x higher banner ad click-through rate.',
      metricValue: '3.7x',
      metricLabel: 'Ad CTR Increase Over Stock Visuals'
    },
    samplePackages: [
      {
        name: 'Product Hero Asset Suite',
        timeline: '3 - 5 Days',
        price: '$1,400',
        features: [
          '5 flagship product hero images retouched to perfection',
          'Transparent PNG cutouts + custom background staging',
          'Frequency separation & realistic reflection cleanup',
          'Delivery in high-res web and print formats'
        ]
      },
      {
        name: 'Campaign Key Visual (KV) Package',
        timeline: '1 - 2 Weeks',
        price: '$3,800',
        popular: true,
        features: [
          '3 master creative composite campaign artworks',
          'Complex atmospheric lighting, smoke & environment blending',
          'Re-formatted across 12 standard digital & social dimensions',
          'Full layered PSD master files with non-destructive smart objects',
          'Includes 2 rounds of creative revisions'
        ]
      },
      {
        name: 'Monthly Visual Production Retainer',
        timeline: 'Monthly Rolling',
        price: '$4,200 / mo',
        features: [
          'Up to 25 bespoke retouched visual assets per month',
          'Priority 24-hour turnaround for urgent marketing launches',
          'Direct collaboration with your marketing directors',
          'Dedicated creative Photoshop retoucher'
        ]
      }
    ]
  },

  'digital-marketing': {
    id: 'digital-marketing',
    title: 'Digital Marketing & Brand Promotion',
    shortTitle: 'Digital Marketing & Brand Promotion',
    subtitle: 'Data-driven paid customer acquisition, viral brand promotion, algorithmic ROAS scaling, and high-velocity PR launches.',
    tagline: '5.86x Blended ROAS • Full-Funnel Attribution • Exponential Brand Recall',
    description: 'Even the most groundbreaking product fails if nobody knows it exists. We manage multi-channel paid acquisition across Meta, Google Search AI, LinkedIn B2B, TikTok, and X, paired with viral influencer seeding, PR promotion, and high-converting landing page funnels to turn new brands into category leaders.',
    category: 'Growth & Promotion',
    badge: 'Growth Engine',
    highlightMetric: '5.86x',
    highlightLabel: 'Average Blended Return on Ad Spend (ROAS)',
    secondaryMetric: '-42%',
    secondaryLabel: 'Reduction in Customer Acquisition Cost (CAC)',
    technologies: ['Meta Ads Manager', 'Google Ads (Search & PMax)', 'LinkedIn Ads', 'TikTok Ads Manager', 'Triple Whale', 'Google Analytics 4', 'Hotjar', 'PostHog'],
    coreCapabilities: [
      {
        title: 'Full-Funnel Paid Media Buying & Scaling',
        desc: 'Hyper-targeted audience segmentation, automated bid management, and zero-waste retargeting to maximize revenue pipeline.',
        deliverable: 'Hands-on management of your paid ad budget with daily optimization'
      },
      {
        title: 'Viral Brand Promotion & Influencer Seeding',
        desc: 'Coordinating tech founder podcasts, Twitter/X thread storms, and tech creator partnerships to establish immediate industry authority.',
        deliverable: 'Seeding campaigns reaching 500,000+ targeted industry stakeholders'
      },
      {
        title: 'High-Velocity Creative Testing Cadence',
        desc: 'Testing 30+ new ad creative angles, copy hooks, and visual formats weekly to defeat ad fatigue and discover breakthrough winners.',
        deliverable: 'Weekly creative performance dashboard with automated fatigue alerts'
      },
      {
        title: 'First-Party Server-Side Attribution & CRO',
        desc: 'Bypassing iOS privacy blockers with Meta Conversions API (CAPI) and Google server-side tagging for 100% accurate attribution.',
        deliverable: 'Custom live dashboard showing true Blended CAC and LTV metrics'
      }
    ],
    processSteps: [
      { phase: 'Phase 01', name: 'Audience & Competitor Intelligence', summary: 'Deconstructing top 5 competitor ad funnels and identifying untapped customer pain points.' },
      { phase: 'Phase 02', name: 'Creative & Landing Page Blitz', summary: 'Developing 24 tailored ad creatives and 3 high-converting landing page variants.' },
      { phase: 'Phase 03', name: 'Algorithm Calibration & Scaling', summary: 'Launching initial $2k-$5k test campaigns to train pixel events and identify top 10% winners.' },
      { phase: 'Phase 04', name: 'Aggressive Capital Allocation', summary: 'Pouring media budget into profitable segments while lowering blended acquisition costs.' }
    ],
    caseStudy: {
      client: 'CognitiveScale AI',
      impact: 'Executed full go-to-market brand promotion and paid acquisition launch.',
      description: 'Generated $340,000 in attributed Annual Recurring Revenue in the first 90 days with a 6.2x ROAS across Google Search and Meta ads.',
      metricValue: '$340K',
      metricLabel: 'Attributed ARR in 90 Days'
    },
    samplePackages: [
      {
        name: 'Brand Launch Ignition',
        timeline: 'First 30 Days',
        price: '$3,500 + ad spend',
        features: [
          'Setup & tracking calibration across Meta & Google Ads',
          '16 bespoke static & video ad creatives',
          'High-converting landing page design & copy',
          'Bi-weekly performance review calls',
          'Recommended media budget: $2,000 - $8,000/mo'
        ]
      },
      {
        name: 'Full-Funnel Growth Accelerator',
        timeline: 'Monthly Retainer',
        price: '$6,500 / mo + % ad spend',
        popular: true,
        features: [
          'Omnichannel management across 3+ paid ad platforms',
          '35+ new creative ad variants produced every month',
          'Daily bid, budget & negative keyword adjustments',
          'Influencer & tech podcast brand promotion seeding',
          'Server-side CAPI telemetry & custom attribution portal',
          'Recommended media budget: $10,000 - $50,000+/mo'
        ]
      },
      {
        name: 'Category Dominance Scale',
        timeline: 'Quarterly',
        price: 'Custom Scope',
        features: [
          'Global paid media deployment across US, EMEA & APAC',
          'National PR & tech media distribution',
          'High-production 3D video ad assets',
          'Dedicated growth team (Media buyer, Copywriter, Designer, Analyst)'
        ]
      }
    ]
  }
};
