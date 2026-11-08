'use client';

import React, { useState } from 'react';
import { AIProduct } from '../types';
import { STARTUP_PRODUCTS } from '../data/mockData';
import { 
  Terminal, 
  Play, 
  Copy, 
  Check, 
  Cpu, 
  Zap, 
  ArrowRight,
  RefreshCw,
  Code2,
  UserCheck,
  Bot,
  Video,
  Mic,
  Newspaper,
  FileText,
  Sparkles,
  Layers,
  Activity,
  CheckCircle2,
  FileCheck2,
  Sliders,
  Database
} from 'lucide-react';

interface ProductsViewProps {
  onOpenApply: () => void;
}

const PRESET_PROMPTS: Record<string, string[]> = {
  'ai-avatar-persona': [
    'Schedule 9 AM live broadcast on quantum computing, answer 40 investor questions, and deliver partner greeting in Japanese...',
    'Conduct 24/7 autonomous VIP client consultation for European partners with emotional cadence...',
    'Synthesize 4K 60FPS digital persona keynote speech from bullet points with synchronized hand gestures...'
  ],
  'ai-agents-swarm': [
    'Audit competitor repos, build daily automated regression benchmark pipeline, and deploy green PR to staging cluster...',
    'Decompose goal into 6 worker agents: extract vector embeddings, query Postgres, verify unit tests, and dispatch alert...',
    'Self-healing code refactor: detect circular dependencies in TypeScript AST and generate passing tests...'
  ],
  'youtube-animated-video': [
    'https://youtube.com/watch?v=k9X4dY7 --style studio-anime --format 9:16 --duration 60s --caption-style viral-bold',
    'https://youtube.com/watch?v=m7F9xL2 --style 3d-cel-shaded --extract-storyboard --add-sfx ambient-beat',
    'Transform 20-min technical architecture lecture into 90-sec kinetic vector motion explainer with animated infographics...'
  ],
  'ai-voice-assistant': [
    'Customer: "Wait, before you confirm my enterprise seat billing, can we transfer remaining credits to our EU subsidiary?"',
    'Support caller requesting flight cancellation with angry tone: modulate voice to empathetic, resolve refund in 118ms...',
    'Meeting co-pilot: live transcribe bilingual audio stream, detect action items, and auto-dispatch to Slack #engineering...'
  ],
  'animated-inshort-news': [
    'Wire: Global Energy Forum declares 40GW offshore floating wind initiative across North Sea with $12B financing package...',
    'Breaking: Semiconductor alliance announces 1.4nm quantum lithography breakthrough in Tokyo with commercial tape-out...',
    'Market Alert: Federal Reserve maintains target rate corridor at 4.75%; automated 15-second animated candlestick reel...'
  ],
  'file-info-extractor': [
    'Upload 140-page SEC 10-K filing PDF. Extract EBITDA, long-term debt covenants, segment operating margins, and executive stock grants...',
    'Scan 8 multi-column medical trial patient charts (TIFF/PDF) and extract dosage timings into FHIR-compliant JSON...',
    'Ingest scanned handwritten commercial lease agreement. Cross-reconcile escalation clauses against consumer price index...'
  ]
};

export const ProductsView: React.FC<ProductsViewProps> = ({ onOpenApply }) => {
  const [selectedProduct, setSelectedProduct] = useState<AIProduct>(STARTUP_PRODUCTS[0]);
  const [inputQuery, setInputQuery] = useState(selectedProduct.liveDemoInputPlaceholder);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedOutput, setSimulatedOutput] = useState<string | null>(null);
  const [simulatedLatency, setSimulatedLatency] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [codeLang, setCodeLang] = useState<'typescript' | 'python' | 'curl'>('typescript');

  const handleSelectProduct = (product: AIProduct) => {
    setSelectedProduct(product);
    setInputQuery(product.liveDemoInputPlaceholder);
    setSimulatedOutput(null);
    setSimulatedLatency(null);
  };

  const handleRunSimulation = () => {
    if (!inputQuery) return;
    setIsSimulating(true);
    setSimulatedOutput(null);

    const startTime = performance.now();
    setTimeout(() => {
      const elapsed = Math.round(performance.now() - startTime + (Math.random() * 20 + 20));
      setSimulatedLatency(elapsed);
      setSimulatedOutput(selectedProduct.demoOutputSample);
      setIsSimulating(false);
    }, 550);
  };

  const getProductIcon = (id: string) => {
    switch (id) {
      case 'ai-avatar-persona':
        return <UserCheck className="w-4 h-4 text-cyan-400" />;
      case 'ai-agents-swarm':
        return <Bot className="w-4 h-4 text-indigo-400" />;
      case 'youtube-animated-video':
        return <Video className="w-4 h-4 text-rose-400" />;
      case 'ai-voice-assistant':
        return <Mic className="w-4 h-4 text-sky-400" />;
      case 'animated-inshort-news':
        return <Newspaper className="w-4 h-4 text-amber-400" />;
      case 'file-info-extractor':
        return <FileText className="w-4 h-4 text-emerald-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getCodeSnippet = () => {
    const safeMethodName = selectedProduct.id.replace(/-/g, '_');
    if (codeLang === 'typescript') {
      return `import { TensorsparkClient } from '@tensorspark/sdk';

const client = new TensorsparkClient({
  apiKey: process.env.TENSORSPARK_API_KEY,
  cluster: 'accelerated-mesh-v4'
});

// Execute request via ${selectedProduct.name}
const response = await client.${safeMethodName}.execute({
  payload: "${inputQuery.substring(0, 50)}...",
  streaming: true,
  hardwareAcceleration: 'h100-nvlink',
  confidenceThreshold: 0.98
});

for await (const chunk of response) {
  process.stdout.write(chunk.content);
}`;
    }
    if (codeLang === 'python') {
      return `import os
from tensorspark import TensorsparkClient

client = TensorsparkClient(
    api_key=os.environ.get("TENSORSPARK_API_KEY"),
    region="global-accelerated"
)

# High-throughput asynchronous pipeline
stream = client.${safeMethodName}.stream(
    payload="${inputQuery.substring(0, 50)}...",
    temperature=0.1,
    latency_budget_ms=100
)

for token in stream:
    print(token.text, end="", flush=True)`;
    }
    return `curl -X POST "https://api.tensorspark.ai/v1/${selectedProduct.id}/execute" \\
  -H "Authorization: Bearer $TENSORSPARK_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "payload": "${inputQuery.substring(0, 45)}...",
    "streaming": true,
    "quantization": "fp8"
  }'`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const currentPresets = PRESET_PROMPTS[selectedProduct.id] || [];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-200">
      
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
          <Layers className="w-3.5 h-3.5" />
          <span>PROPRIETARY AI ENGINES & ENTERPRISE ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          AI Products & Systems Suite
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          Explore our 6 production AI engines: Autonomous Avatars, Multi-Agent Swarms, YouTube-to-Animation transformation, Duplex Voice Assistants, Animated 60-Word News, and Universal File Extractors.
        </p>
      </div>

      {/* 6 Product Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {STARTUP_PRODUCTS.map((prod, idx) => {
          const isSelected = selectedProduct.id === prod.id;
          return (
            <button
              key={prod.id}
              id={`btn-product-tab-${prod.id}`}
              onClick={() => handleSelectProduct(prod)}
              className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'bg-neutral-900 border-cyan-500/80 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/40 text-white'
                  : 'bg-neutral-950/60 border-neutral-800/80 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 hover:bg-neutral-900/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded flex items-center gap-1 ${
                  isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-neutral-900 text-neutral-400'
                }`}>
                  {getProductIcon(prod.id)}
                  <span className="truncate max-w-[70px]">{prod.badge}</span>
                </span>
                <span className="text-[10px] text-neutral-500 font-mono">0{idx + 1}</span>
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-white font-display truncate group-hover:text-cyan-300 transition-colors">
                {prod.name}
              </h3>
              <p className="text-[10.5px] text-neutral-400 line-clamp-1 mt-0.5 font-sans">
                {prod.tagline}
              </p>
            </button>
          );
        })}
      </div>

      {/* Detailed Product Showcase & Interactive Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Specs, Architecture & Features (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-neutral-900/85 border border-neutral-800 backdrop-blur-md space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {getProductIcon(selectedProduct.id)}
                <span className="text-xs font-mono text-cyan-400">
                  {selectedProduct.category}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                {selectedProduct.name}
              </h2>
              <p className="text-xs font-mono text-neutral-400 mt-1">
                {selectedProduct.tagline}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              {selectedProduct.description}
            </p>

            {/* Performance Benchmark Chips */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-center">
              <div>
                <span className="text-[9.5px] text-neutral-500 uppercase font-mono block">Latency</span>
                <span className="text-xs sm:text-sm font-bold text-cyan-400 font-mono">{selectedProduct.metrics.latency}</span>
              </div>
              <div>
                <span className="text-[9.5px] text-neutral-500 uppercase font-mono block">Accuracy</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">{selectedProduct.metrics.accuracy}</span>
              </div>
              <div>
                <span className="text-[9.5px] text-neutral-500 uppercase font-mono block">Throughput</span>
                <span className="text-xs sm:text-sm font-bold text-sky-400 font-mono">{selectedProduct.metrics.throughput}</span>
              </div>
            </div>

            {/* Key Capabilities */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider font-mono">
                Key Architectural Features:
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                {selectedProduct.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Intern Opportunity callout */}
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-neutral-300 space-y-2">
              <div className="flex items-center gap-2 font-medium text-cyan-300">
                <Cpu className="w-4 h-4" />
                <span>Engineering & Applied AI Opportunities</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Interns and fellows in our AI Engineering cohorts work directly on this engine's neural models, inference microservices, and client integrations.
              </p>
              <button
                onClick={onOpenApply}
                className="text-cyan-400 hover:text-white font-semibold flex items-center gap-1 text-[11px] underline underline-offset-2 cursor-pointer"
              >
                Apply for related engineering tracks <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Live Inference Simulator & Code SDK (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Interactive Playground Console */}
          <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <h3 className="font-semibold text-sm text-white font-display">
                  Live Engine Test Sandbox
                </h3>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Cluster Ready
              </span>
            </div>

            {/* Preset prompt pills */}
            <div>
              <span className="block text-[11px] text-neutral-400 mb-1.5 font-mono">
                Click a preset test payload:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentPresets.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setInputQuery(preset)}
                    className="text-[10.5px] px-2.5 py-1 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors text-left truncate max-w-full cursor-pointer"
                    title={preset}
                  >
                    Preset 0{i + 1}: {preset.substring(0, 36)}...
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1.5 font-mono">
                Input Prompt / Execution Payload:
              </label>
              <textarea
                id="input-product-sandbox-query"
                rows={3}
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Enter sample payload or test prompt..."
                className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 font-mono transition-colors resize-none"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setInputQuery(selectedProduct.liveDemoInputPlaceholder)}
                className="text-[11px] text-neutral-500 hover:text-neutral-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                Reset to default payload
              </button>

              <button
                id="btn-run-product-simulation"
                type="button"
                disabled={isSimulating || !inputQuery.trim()}
                onClick={handleRunSimulation}
                className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-neutral-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-cyan-400/20"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Inference...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Simulate Inference</span>
                  </>
                )}
              </button>
            </div>

            {/* Sandbox Output Window */}
            <div className="mt-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between text-[11px] text-neutral-500 border-b border-neutral-850 pb-2">
                <span>EXECUTION STREAM</span>
                {simulatedLatency && (
                  <span className="text-cyan-400 font-semibold">
                    Inference Complete in {simulatedLatency}ms
                  </span>
                )}
              </div>

              {isSimulating ? (
                <div className="py-6 flex flex-col items-center justify-center gap-2 text-neutral-500">
                  <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-[11px]">Distributing tokens across accelerator cluster...</span>
                </div>
              ) : simulatedOutput ? (
                <div className="text-cyan-200 leading-relaxed whitespace-pre-wrap animate-in fade-in duration-150">
                  {simulatedOutput}
                </div>
              ) : (
                <div className="text-neutral-600 py-4 text-center italic">
                  Click "Simulate Inference" or select a preset to see real-time output and benchmark metrics.
                </div>
              )}
            </div>
          </div>

          {/* Developer SDK Code Preview */}
          <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 backdrop-blur-md space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-sky-400" />
                <h4 className="font-semibold text-xs text-white uppercase tracking-wider font-mono">
                  Enterprise Client SDK
                </h4>
              </div>

              <div className="flex items-center gap-1.5">
                {(['typescript', 'python', 'curl'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setCodeLang(lang)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono capitalize transition-colors cursor-pointer ${
                      codeLang === lang
                        ? 'bg-neutral-800 text-cyan-300 font-bold border border-neutral-700'
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    {lang}
                  </button>
                ))}

                <button
                  id="btn-copy-sdk-code"
                  type="button"
                  onClick={handleCopyCode}
                  className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 ml-2 transition-colors cursor-pointer"
                  title="Copy code snippet"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-300 font-mono overflow-x-auto leading-relaxed">
              <code>{getCodeSnippet()}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
