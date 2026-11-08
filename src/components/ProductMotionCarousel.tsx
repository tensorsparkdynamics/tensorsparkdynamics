'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AIProduct, TabView } from '../types';
import { STARTUP_PRODUCTS } from '../data/mockData';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Cpu, 
  Terminal, 
  Zap, 
  ArrowRight, 
  Maximize2, 
  Volume2, 
  VolumeX, 
  Layers, 
  Bot, 
  CheckCircle2, 
  Film, 
  MonitorPlay, 
  UserCheck, 
  Video, 
  Mic, 
  Newspaper, 
  FileText,
  Send,
  RefreshCw
} from 'lucide-react';

interface ProductMotionCarouselProps {
  onNavigate: (tab: TabView) => void;
  onOpenWaitlist?: () => void;
}

export const ProductMotionCarousel: React.FC<ProductMotionCarouselProps> = ({
  onNavigate,
  onOpenWaitlist
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.5 | 2>(1);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<'motion' | 'terminal' | 'architecture' | 'quick-test'>('motion');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [testInput, setTestInput] = useState('');
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [isTestRunning, setIsTestRunning] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentProduct: AIProduct = STARTUP_PRODUCTS[currentIndex] || STARTUP_PRODUCTS[0];
  const DURATION_SECONDS = 10; // 10 seconds per slide in autoplay

  // Sync test prompt when product changes
  useEffect(() => {
    setTestInput(currentProduct.liveDemoInputPlaceholder);
    setTestOutput(null);
    setIsTestRunning(false);
  }, [currentIndex, currentProduct]);

  // Advance to next product in circular order: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 0
  const advanceToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % STARTUP_PRODUCTS.length);
    setElapsedSeconds(0);
    setProgress(0);
  }, []);

  const advanceToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + STARTUP_PRODUCTS.length) % STARTUP_PRODUCTS.length);
    setElapsedSeconds(0);
    setProgress(0);
  }, []);

  // Autoplay progression & elapsed time ticker
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = 100;
    const step = (intervalMs / 1000) * playbackSpeed;

    const timer = setInterval(() => {
      setElapsedSeconds((prev) => {
        const next = prev + step;
        if (next >= DURATION_SECONDS) {
          advanceToNext();
          return 0;
        }
        setProgress((next / DURATION_SECONDS) * 100);
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, advanceToNext]);

  // When switching slides manually, reset timer
  const handleSelectProduct = (index: number) => {
    setCurrentIndex(index);
    setElapsedSeconds(0);
    setProgress(0);
  };

  const handlePrev = () => {
    advanceToPrev();
  };

  const handleNext = () => {
    advanceToNext();
  };

  const handleRestart = () => {
    setElapsedSeconds(0);
    setProgress(0);
    setIsPlaying(true);
  };

  // Quick test execution inside carousel
  const handleRunQuickTest = () => {
    if (!testInput.trim()) return;
    setIsTestRunning(true);
    setTestOutput(null);

    setTimeout(() => {
      setTestOutput(currentProduct.demoOutputSample);
      setIsTestRunning(false);
    }, 550);
  };

  // Fullscreen toggle for the video canvas
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Helper icon for each product
  const getProductIcon = (id: string) => {
    switch (id) {
      case 'ai-avatar-persona':
        return <UserCheck className="w-3.5 h-3.5" />;
      case 'ai-agents-swarm':
        return <Bot className="w-3.5 h-3.5" />;
      case 'youtube-animated-video':
        return <Video className="w-3.5 h-3.5" />;
      case 'ai-voice-assistant':
        return <Mic className="w-3.5 h-3.5" />;
      case 'animated-inshort-news':
        return <Newspaper className="w-3.5 h-3.5" />;
      case 'file-info-extractor':
        return <FileText className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  // Kinetic Canvas Graphic Motion Simulation for all 6 products
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    let width = 640;
    let height = 360;

    const updateDimensions = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width || 640;
      height = rect.height || 360;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const render = () => {
      if (!isPlaying) {
        t += 0.005; // Slow subtle drift even when paused
      } else {
        t += 0.025 * playbackSpeed;
      }

      ctx.clearRect(0, 0, width, height);

      // Deep dark cybernetic background
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#05070d');
      bgGrad.addColorStop(0.5, '#0a0f1d');
      bgGrad.addColorStop(1, '#04060a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle cyber coordinate grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 36;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // ==========================================
      // 1. AI AVATAR (Unique Public Figure Multitasking)
      // ==========================================
      if (currentProduct.id === 'ai-avatar-persona') {
        const cx = width * 0.44;
        const cy = height * 0.5;

        // Radiating Holographic Base Rings
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(cx, cy + 90, 85, 24, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(129, 140, 248, 0.4)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.ellipse(cx, cy + 90, 110 + Math.sin(t * 2) * 6, 32, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Holographic Head / Face Wireframe Contour
        ctx.save();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.ellipse(cx, cy - 10, 48, 64, 0, 0, Math.PI * 2); // head outline
        ctx.stroke();

        // Facial Mesh Features (Forehead, Eyes, Nose, Animated Mouth)
        const eyeY = cy - 20;
        const blink = Math.sin(t * 4) > 0.94 ? 1 : 4; // realistic blink
        // Left Eye
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.ellipse(cx - 18, eyeY, 6, blink, 0, 0, Math.PI * 2);
        ctx.fill();
        // Right Eye
        ctx.beginPath();
        ctx.ellipse(cx + 18, eyeY, 6, blink, 0, 0, Math.PI * 2);
        ctx.fill();

        // Eye tracking reticles
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.6)';
        ctx.lineWidth = 1;
        ctx.strokeRect(cx - 26, eyeY - 8, 16, 16);
        ctx.strokeRect(cx + 10, eyeY - 8, 16, 16);

        // Nose Bridge
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
        ctx.beginPath();
        ctx.moveTo(cx, eyeY + 4);
        ctx.lineTo(cx - 3, eyeY + 22);
        ctx.lineTo(cx + 4, eyeY + 24);
        ctx.stroke();

        // Animated Speaking Mouth Waveform
        const mouthOpen = 2 + Math.abs(Math.sin(t * 8)) * 7;
        ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
        ctx.beginPath();
        ctx.ellipse(cx, cy + 28, 14, mouthOpen, 0, 0, Math.PI * 2);
        ctx.fill();

        // Speech Soundwaves emitting from mouth
        for (let sw = 1; sw <= 3; sw++) {
          const swR = 24 + sw * 14 + ((t * 18) % 20);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.4 - sw * 0.1})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(cx, cy + 28, swR, -0.6, 0.6);
          ctx.stroke();
        }

        // Facial Neural Landmark Constellation Points
        const landmarks = [
          { x: cx, y: cy - 60 },
          { x: cx - 28, y: cy - 40 },
          { x: cx + 28, y: cy - 40 },
          { x: cx - 38, y: cy },
          { x: cx + 38, y: cy },
          { x: cx - 22, y: cy + 46 },
          { x: cx + 22, y: cy + 46 },
          { x: cx, y: cy + 54 }
        ];

        ctx.fillStyle = '#ffffff';
        for (const p of landmarks) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // 4 Revolving Daily Multitask Pods around Avatar
        const tasks = [
          { label: '09:00 AM Press Brief', color: '#38bdf8', icon: '🎙️' },
          { label: '40+ Investor Q&As', color: '#10b981', icon: '💼' },
          { label: '38x Voice Clones', color: '#818cf8', icon: '🌐' },
          { label: 'Calendar Orchestration', color: '#f59e0b', icon: '📅' }
        ];

        const orbitR = Math.min(width, height) * 0.38;
        for (let i = 0; i < tasks.length; i++) {
          const angle = (i * (Math.PI * 2) / tasks.length) + t * 0.5;
          const tx = cx + Math.cos(angle) * orbitR;
          const ty = cy + Math.sin(angle) * (orbitR * 0.62);

          // Connecting laser ray from avatar to task pod
          ctx.strokeStyle = `${tasks[i].color}40`;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(tx, ty);
          ctx.stroke();
          ctx.setLineDash([]);

          // Task Pod Container
          ctx.fillStyle = '#0f172a';
          ctx.strokeStyle = tasks[i].color;
          ctx.lineWidth = 1.5;
          const boxW = 120;
          const boxH = 26;
          ctx.strokeRect(tx - boxW / 2, ty - boxH / 2, boxW, boxH);
          ctx.fillRect(tx - boxW / 2, ty - boxH / 2, boxW, boxH);

          ctx.fillStyle = '#f8fafc';
          ctx.font = 'bold 9.5px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(`${tasks[i].icon} ${tasks[i].label}`, tx, ty + 3.5);
        }

        // Top Status HUD
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('AVATAR STATUS: 4K 60FPS LIVE • 4 CONCURRENT EXECUTIVE TASKS', width * 0.08, height * 0.12);

      // ==========================================
      // 2. AI AGENTS (Multi-Agent Swarm DAG)
      // ==========================================
      } else if (currentProduct.id === 'ai-agents-swarm') {
        const centerX = width * 0.44;
        const centerY = height * 0.5;

        // Central Neural Swarm Engine Core
        const coreR = 36 + Math.sin(t * 3) * 4;
        const coreGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, coreR);
        coreGrad.addColorStop(0, '#ffffff');
        coreGrad.addColorStop(0.4, '#38bdf8');
        coreGrad.addColorStop(0.8, '#4f46e5');
        coreGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, coreR, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GOAL CORE', centerX, centerY + 3);

        // 6 Autonomous Specialist Agent Pods
        const swarmAgents = [
          { name: 'PLANNER', role: 'Decompose DAG', color: '#38bdf8' },
          { name: 'CODER', role: 'TypeScript/Py', color: '#818cf8' },
          { name: 'SQL ENGINE', role: 'Vector / DB', color: '#34d399' },
          { name: 'VERIFIER', role: '54 Unit Tests', color: '#fbbf24' },
          { name: 'SECURITY', role: 'Zero Trust', color: '#f43f5e' },
          { name: 'DISPATCHER', role: 'Auto PR Merge', color: '#06b6d4' }
        ];

        const nodeRadius = Math.min(width, height) * 0.36;
        const agentPositions: { x: number; y: number }[] = [];

        for (let i = 0; i < swarmAgents.length; i++) {
          const angle = (i * (Math.PI * 2) / swarmAgents.length) + t * 0.4;
          const ax = centerX + Math.cos(angle) * nodeRadius;
          const ay = centerY + Math.sin(angle) * (nodeRadius * 0.72);
          agentPositions.push({ x: ax, y: ay });

          // Connecting Rays to Central Goal
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.3 + Math.sin(t * 2 + i) * 0.2})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(ax, ay);
          ctx.stroke();

          // Particle moving along connection line
          const particlePct = (t * 1.6 + i * 0.35) % 1;
          const px = centerX + (ax - centerX) * particlePct;
          const py = centerY + (ay - centerY) * particlePct;
          ctx.fillStyle = swarmAgents[i].color;
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Agent Node Circle
          ctx.fillStyle = '#0b1329';
          ctx.beginPath();
          ctx.arc(ax, ay, 20, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = swarmAgents[i].color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(ax, ay, 20, 0, Math.PI * 2);
          ctx.stroke();

          // Node Text
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 8.5px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(swarmAgents[i].name, ax, ay - 1);

          ctx.fillStyle = swarmAgents[i].color;
          ctx.font = '7.5px monospace';
          ctx.fillText(swarmAgents[i].role, ax, ay + 9);
        }

        // Inter-Agent Mesh Consensus Lines
        for (let i = 0; i < swarmAgents.length; i++) {
          const next = (i + 1) % swarmAgents.length;
          ctx.strokeStyle = 'rgba(129, 140, 248, 0.2)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(agentPositions[i].x, agentPositions[i].y);
          ctx.lineTo(agentPositions[next].x, agentPositions[next].y);
          ctx.stroke();
        }

        // Swarm Telemetry Header
        ctx.fillStyle = '#38bdf8';
        ctx.font = '10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('SWARM CONSENSUS: 99.6% • ACTIVE AGENTS: 6/6 • P95: 38ms', width * 0.08, height * 0.12);

      // ==========================================
      // 3. ANIMATED VIDEO CONVERSION THROUGH YOUTUBE
      // ==========================================
      } else if (currentProduct.id === 'youtube-animated-video') {
        const leftX = width * 0.08;
        const boxY = height * 0.2;
        const cardW = width * 0.36;
        const cardH = height * 0.6;
        const rightX = width * 0.52;

        // LEFT CARD: YouTube Video Input Mockup
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)'; // YouTube Red
        ctx.lineWidth = 1.5;
        ctx.strokeRect(leftX, boxY, cardW, cardH);
        ctx.fillRect(leftX, boxY, cardW, cardH);

        // YouTube URL Header
        ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
        ctx.fillRect(leftX, boxY, cardW, 24);
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 8.5px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('▶ YOUTUBE INGEST // youtu.be/k9X4dY7', leftX + 8, boxY + 16);

        // Video Player Wireframe & Play Button
        const vMidX = leftX + cardW / 2;
        const vMidY = boxY + cardH * 0.45;
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.fillRect(leftX + 12, boxY + 34, cardW - 24, cardH * 0.55);

        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(vMidX, vMidY, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(vMidX - 5, vMidY - 7);
        ctx.lineTo(vMidX + 8, vMidY);
        ctx.lineTo(vMidX - 5, vMidY + 7);
        ctx.fill();

        // Audio waveform along bottom of left player
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        for (let b = 0; b < 16; b++) {
          const bh = 4 + Math.sin(t * 5 + b) * 8;
          ctx.beginPath();
          ctx.moveTo(leftX + 18 + b * 6, boxY + cardH - 12 - bh);
          ctx.lineTo(leftX + 18 + b * 6, boxY + cardH - 12);
          ctx.stroke();
        }

        // CENTER: Animated Transformation Beam & Particle Stream
        const beamStartX = leftX + cardW;
        const beamEndX = rightX;
        const beamY = boxY + cardH / 2;

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(beamStartX, beamY);
        ctx.lineTo(beamEndX, beamY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Animated particles rushing from YouTube -> Animation
        for (let p = 0; p < 5; p++) {
          const pPct = (t * 2 + p * 0.22) % 1;
          const px = beamStartX + (beamEndX - beamStartX) * pPct;
          const py = beamY + Math.sin(t * 6 + p) * 12;
          ctx.fillStyle = p % 2 === 0 ? '#38bdf8' : '#f43f5e';
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('ANIME LoRA DIFFUSION', (beamStartX + beamEndX) / 2, beamY - 18);

        // RIGHT CARD: Stylized Animated Video Output
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.strokeRect(rightX, boxY, cardW, cardH);
        ctx.fillRect(rightX, boxY, cardW, cardH);

        // Header
        ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.fillRect(rightX, boxY, cardW, 24);
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 8.5px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('⚡ 60FPS STYLIZED ANIME EXPLAINER', rightX + 8, boxY + 16);

        // Animated Cel-Shaded Keyframe Character Art (Geometric)
        const aMidX = rightX + cardW / 2;
        const aMidY = boxY + cardH * 0.44;

        // Dynamic Anime Speedlines radiating
        for (let s = 0; s < 8; s++) {
          const sAngle = (s * Math.PI / 4) + t * 0.2;
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(aMidX + Math.cos(sAngle) * 20, aMidY + Math.sin(sAngle) * 20);
          ctx.lineTo(aMidX + Math.cos(sAngle) * 60, aMidY + Math.sin(sAngle) * 60);
          ctx.stroke();
        }

        // Stylized Anime Character Avatar Silhouette
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(aMidX, aMidY - 14, 18, 0, Math.PI * 2); // head
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(aMidX, aMidY + 22, 28, 20, 0, 0, Math.PI * 2); // shoulders
        ctx.fill();

        // Stylized Anime Eyes
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(aMidX - 8, aMidY - 16, 5, 4);
        ctx.fillRect(aMidX + 3, aMidY - 16, 5, 4);

        // Bouncing Kinetic Subtitles on Right Output
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(rightX + 8, boxY + cardH - 30, cardW - 16, 20);
        ctx.strokeStyle = '#fbbf24';
        ctx.strokeRect(rightX + 8, boxY + cardH - 30, cardW - 16, 20);

        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 8.5px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('\"The Future of AI is Realtime Swarms\"', rightX + cardW / 2, boxY + cardH - 16);

        // Top Status
        ctx.fillStyle = '#38bdf8';
        ctx.font = '10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('CONVERSION SPEED: 1.8x REALTIME • STYLE: STUDIO ANIME • 4K RENDER', width * 0.08, height * 0.12);

      // ==========================================
      // 4. AI VOICE ASSISTANT (Ultra-Low Latency Conversational Voice)
      // ==========================================
      } else if (currentProduct.id === 'ai-voice-assistant') {
        const cx = width * 0.44;
        const cy = height * 0.48;

        // Resonant Acoustic Orb Rings expanding
        const ringCount = 4;
        for (let r = 1; r <= ringCount; r++) {
          const rad = 25 + r * 22 + (Math.sin(t * 4 + r) * 6);
          const alpha = 0.5 - (r * 0.1);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(cx, cy, rad, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Central Fluid Voice Pulse Core
        const coreR = 28 + Math.abs(Math.sin(t * 6)) * 8;
        const vGrad = ctx.createRadialGradient(cx, cy, 4, cx, cy, coreR);
        vGrad.addColorStop(0, '#ffffff');
        vGrad.addColorStop(0.3, '#38bdf8');
        vGrad.addColorStop(0.7, '#6366f1');
        vGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
        ctx.fillStyle = vGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
        ctx.fill();

        // Microphone Glyph in Core
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(cx, cy - 4, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(cx - 3, cy - 4, 6, 10);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy + 2, 8, 0, Math.PI);
        ctx.stroke();

        // Dual Audio Frequency Spectrum Bars (Top & Bottom)
        const specCount = 28;
        const specW = (width * 0.7) / specCount;
        const specStartX = width * 0.09;

        // Top Equalizer
        for (let i = 0; i < specCount; i++) {
          const barH = 4 + Math.abs(Math.sin(t * 7 + i * 0.4)) * 32;
          const bx = specStartX + i * specW;
          const by = cy - 85 - barH;

          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(bx + 1, by, specW - 2, barH);
        }

        // Bottom Equalizer
        for (let i = 0; i < specCount; i++) {
          const barH = 4 + Math.abs(Math.cos(t * 6 + i * 0.4)) * 30;
          const bx = specStartX + i * specW;
          const by = cy + 85;

          ctx.fillStyle = '#818cf8';
          ctx.fillRect(bx + 1, by, specW - 2, barH);
        }

        // Conversational Live Duplex Status Bubbles
        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 1;
        ctx.strokeRect(width * 0.1, height * 0.78, width * 0.68, 28);
        ctx.fillRect(width * 0.1, height * 0.78, width * 0.68, 28);

        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('⚡ BARGE-IN ARMED: User spoke · Vocalis interrupted previous sentence in 18ms', width * 0.12, height * 0.78 + 17);

        // Header
        ctx.fillStyle = '#38bdf8';
        ctx.font = '10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('ACOUSTIC LATENCY: 118ms DUPLEX • EMOTION MODULATION: ACTIVE • 100K CONCURRENT', width * 0.08, height * 0.12);

      // ==========================================
      // 5. INSHORT NEWS IN ANIMATED VERSION
      // ==========================================
      } else if (currentProduct.id === 'animated-inshort-news') {
        const boardX = width * 0.08;
        const boardY = height * 0.2;
        const boardW = width * 0.72;
        const boardH = height * 0.6;

        // Television / Social Reel News Frame
        ctx.fillStyle = '#0b1120';
        ctx.strokeStyle = '#f59e0b'; // Amber / Gold News Alert
        ctx.lineWidth = 2;
        ctx.strokeRect(boardX, boardY, boardW, boardH);
        ctx.fillRect(boardX, boardY, boardW, boardH);

        // Flashing Breaking News Bar
        const isFlash = Math.sin(t * 6) > 0;
        ctx.fillStyle = isFlash ? '#dc2626' : '#991b1b';
        ctx.fillRect(boardX, boardY, boardW, 28);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('🔴 BREAKING NEWS • 60-WORD VERIFIED ANIMATED BRIEF', boardX + 12, boardY + 18);

        // 15-Second Radial Countdown Ring
        const timerX = boardX + boardW - 32;
        const timerY = boardY + 14;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(timerX, timerY, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('15s', timerX, timerY + 3);

        // Animated Financial Infographic Chart (Left Half)
        const chartX = boardX + 16;
        const chartY = boardY + 44;
        const chartW = boardW * 0.44;
        const chartH = boardH - 60;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
        ctx.fillRect(chartX, chartY, chartW, chartH);
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.strokeRect(chartX, chartY, chartW, chartH);

        // Candlestick / Area Chart Bars
        const bars = 10;
        const bw = chartW / bars;
        for (let i = 0; i < bars; i++) {
          const bh = 15 + Math.sin(t * 4 + i) * 25 + (i * 3);
          const by = chartY + chartH - bh - 6;
          ctx.fillStyle = i % 2 === 0 ? '#10b981' : '#f59e0b';
          ctx.fillRect(chartX + i * bw + 4, by, bw - 8, bh);
        }

        // Headline Text on Right
        const textX = chartX + chartW + 20;
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('North Sea $12B Offshore Wind', textX, chartY + 20);
        ctx.fillText('Consortium Finalized', textX, chartY + 38);

        // 60-Word Brief Excerpt
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '10px sans-serif';
        ctx.fillText('Global Energy Forum confirmed 40GW', textX, chartY + 62);
        ctx.fillText('capacity. First power expected by Q3', textX, chartY + 76);
        ctx.fillText('with multi-nation European grid tie-in.', textX, chartY + 90);

        // Verification Badge
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 9px monospace';
        ctx.fillText('✓ REUTERS & BLOOMBERG FACT-VERIFIED', textX, chartY + 114);

        // Header
        ctx.fillStyle = '#f59e0b';
        ctx.font = '10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('NEWS GENERATION: 24s END-TO-END • ZERO HALLUCINATION • 60-WORD REEL', width * 0.08, height * 0.12);

      // ==========================================
      // 6. PDF AND OTHER FILES INFORMATION EXTRACTOR
      // ==========================================
      } else {
        const leftX = width * 0.08;
        const boxY = height * 0.2;
        const docW = width * 0.35;
        const docH = height * 0.6;
        const jsonX = width * 0.49;
        const jsonW = width * 0.39;

        // LEFT: PDF Document Wireframe
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(leftX, boxY, docW, docH);
        ctx.fillRect(leftX, boxY, docW, docH);

        // Document Header Bar
        ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.fillRect(leftX, boxY, docW, 20);
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 8.5px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('📄 SEC_10K_AUDITED_FILING.PDF', leftX + 8, boxY + 14);

        // Mock Document Content Lines & Tables
        for (let row = 0; row < 6; row++) {
          const rowY = boxY + 32 + row * 16;
          ctx.fillStyle = row % 2 === 0 ? 'rgba(255, 255, 255, 0.25)' : 'rgba(56, 189, 248, 0.25)';
          ctx.fillRect(leftX + 12, rowY, docW - 24, 8);
        }

        // Highlighted Extracted Table Bounding Box
        const tableY = boxY + docH * 0.58;
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(leftX + 10, tableY, docW - 20, 42);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
        ctx.fillRect(leftX + 10, tableY, docW - 20, 42);

        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 7.5px monospace';
        ctx.fillText('DETECTED TABLE (100% RECONCILED)', leftX + 14, tableY - 4);

        // Laser Scanline traveling up and down
        const scanY = boxY + 22 + ((Math.sin(t * 3) * 0.5 + 0.5) * (docH - 26));
        const scanGrad = ctx.createLinearGradient(leftX, scanY - 8, leftX, scanY + 8);
        scanGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
        scanGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.7)');
        scanGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.fillStyle = scanGrad;
        ctx.fillRect(leftX, scanY - 8, docW, 16);

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(leftX, scanY);
        ctx.lineTo(leftX + docW, scanY);
        ctx.stroke();

        // RIGHT: Structured Extracted JSON Tree Window
        ctx.fillStyle = '#090d16';
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(jsonX, boxY, jsonW, docH);
        ctx.fillRect(jsonX, boxY, jsonW, docH);

        // Header
        ctx.fillStyle = 'rgba(16, 185, 129, 0.18)';
        ctx.fillRect(jsonX, boxY, jsonW, 20);
        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 8.5px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('{ } STRUCTURED OUTPUT SCHEMA [PYDANTIC]', jsonX + 8, boxY + 14);

        // JSON Code stream lines
        const jsonLines = [
          '1: {',
          '2:   "ebitda_usd": 42800000,',
          '3:   "operating_margin": 0.342,',
          '4:   "debt_covenants": "compliant",',
          '5:   "confidence_score": 0.999,',
          '6:   "coords": "[p.42, line 18]"',
          '7: }'
        ];

        ctx.fillStyle = '#38bdf8';
        ctx.font = '9px monospace';
        for (let j = 0; j < jsonLines.length; j++) {
          ctx.fillText(jsonLines[j], jsonX + 12, boxY + 36 + j * 16);
        }

        // Header
        ctx.fillStyle = '#38bdf8';
        ctx.font = '10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('DOCUMENT SPEED: 140ms/PAGE • ACCURACY: 99.9% • SCHEMAS VALIDATED', width * 0.08, height * 0.12);
      }

      // Scanline television filter
      ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
      for (let sl = 0; sl < height; sl += 4) {
        ctx.fillRect(0, sl, width, 1.5);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [currentProduct.id, isPlaying, playbackSpeed]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = Math.floor(secs % 60);
    return `${String(mins).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
  };

  return (
    <section 
      id="products-motion-carousel-section"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-3">
            <Film className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>INTERACTIVE PRODUCT MOTION CAROUSEL • 6 FLAGSHIP AI PRODUCTS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Interactive Product Motion Carousel
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Experience our 6 proprietary AI systems in real-time with kinetic motion graphic simulations, live execution telemetry, architectural benchmarks, and embedded test sandbox.
          </p>
        </div>

        {/* Carousel Slide Indicators & Manual Arrows */}
        <div className="flex items-center gap-3">
          <div className="font-mono text-xs text-neutral-400">
            <span className="text-cyan-400 font-bold text-sm">0{currentIndex + 1}</span>
            <span className="text-neutral-600 mx-1">/</span>
            <span>0{STARTUP_PRODUCTS.length}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              id="product-carousel-btn-prev"
              type="button"
              onClick={handlePrev}
              aria-label="Previous product slide"
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-cyan-500/40 text-neutral-300 hover:text-white transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="product-carousel-btn-next"
              type="button"
              onClick={handleNext}
              aria-label="Next product slide"
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-cyan-500/40 text-neutral-300 hover:text-white transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Top 6 Product Navigation Tabs with Animated Progress Bars */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
        {STARTUP_PRODUCTS.map((prod, idx) => {
          const isSelected = idx === currentIndex;
          return (
            <button
              key={prod.id}
              id={`product-carousel-tab-${prod.id}`}
              type="button"
              onClick={() => handleSelectProduct(idx)}
              className={`relative text-left p-3 rounded-2xl border transition-all cursor-pointer overflow-hidden group ${
                isSelected
                  ? 'bg-neutral-900 border-cyan-500/80 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                  : 'bg-neutral-950/70 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/60'
              }`}
            >
              {/* Animated Progress Bar along bottom of selected card */}
              {isSelected && (
                <div 
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              )}

              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded flex items-center gap-1 ${
                  isSelected ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-neutral-900 text-neutral-400'
                }`}>
                  {getProductIcon(prod.id)}
                  <span className="truncate max-w-[70px]">{prod.badge}</span>
                </span>
                <span className="text-[10px] font-mono text-neutral-500">0{idx + 1}</span>
              </div>

              <div className="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                {prod.name}
              </div>
              <div className="text-[10.5px] text-neutral-400 truncate mt-0.5 font-sans">
                {prod.tagline}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Motion Video Frame & Specifications Deck */}
      <div 
        ref={containerRef}
        className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl relative"
      >
        {/* Futuristic Video Player Chrome Top Header */}
        <div className="p-3.5 sm:p-4 bg-neutral-950 border-b border-neutral-850 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-neutral-600'}`} />
              <span className="font-mono font-bold text-white text-[11px] tracking-wider uppercase">
                {isPlaying ? 'STREAMING 60 FPS' : 'STREAM PAUSED'}
              </span>
            </div>

            <div className="hidden sm:block h-3.5 w-px bg-neutral-800" />

            <div className="hidden sm:flex items-center gap-2 text-neutral-400 font-mono text-[11px]">
              <span>PRODUCT {currentIndex + 1}/6:</span>
              <span className="text-cyan-400 font-bold">{currentProduct.name}</span>
              <span>•</span>
              <span className="text-neutral-500">{currentProduct.category}</span>
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            <button
              type="button"
              onClick={() => setActiveTab('motion')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'motion'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <MonitorPlay className="w-3 h-3" />
              <span>Motion Graphic</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('terminal')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'terminal'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3 h-3" />
              <span>Live Telemetry</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('architecture')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'architecture'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Architecture</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('quick-test')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'quick-test'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>Quick Test</span>
            </button>
          </div>
        </div>

        {/* Video Player Display Area (Grid: Visual Motion Left, HUD Specs Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[400px] sm:min-h-[460px] bg-neutral-950">
          
          {/* Main Visual Display (Canvas, Terminal, Architecture, or Quick-Test) */}
          <div className="lg:col-span-8 relative flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-800/90 overflow-hidden group">
            
            {activeTab === 'motion' && (
              <div className="relative w-full h-full min-h-[320px] sm:min-h-[400px] flex items-center justify-center">
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-full object-cover block cursor-pointer"
                  onClick={() => setIsPlaying(!isPlaying)}
                />

                {/* Overlay Brand Watermark */}
                <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 px-2.5 py-1 rounded-lg bg-neutral-950/75 border border-neutral-800 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[10px] font-mono text-neutral-300 tracking-wider font-bold">
                    TENSORSPARK MOTION LABS
                  </span>
                </div>

                {/* Floating Big Play Button if paused */}
                {!isPlaying && (
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-neutral-950 flex items-center justify-center shadow-2xl shadow-cyan-500/50 cursor-pointer transform hover:scale-110 transition-all"
                  >
                    <Play className="w-7 h-7 ml-1 fill-current" />
                  </button>
                )}

                {/* Live Output HUD Strip */}
                <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                  <div className="p-3 rounded-xl bg-neutral-950/90 border border-cyan-500/30 backdrop-blur-md text-xs font-mono text-neutral-300 flex items-center justify-between gap-3 shadow-xl">
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                      <span className="text-cyan-300 font-bold truncate">LIVE SAMPLE:</span>
                      <span className="text-neutral-400 truncate">{currentProduct.demoOutputSample}</span>
                    </div>
                    <span className="text-[10px] text-cyan-400 font-mono shrink-0 hidden sm:inline">
                      {currentProduct.metrics.latency}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'terminal' && (
              <div className="p-5 sm:p-6 bg-neutral-950 font-mono text-xs text-neutral-300 space-y-3 h-full flex flex-col justify-between overflow-y-auto">
                <div className="space-y-2">
                  <div className="text-neutral-500 text-[11px] pb-2 border-b border-neutral-850 flex items-center justify-between">
                    <span>LIVE INFERENCE LOGS // {currentProduct.name}</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      STREAMING ACTIVE
                    </span>
                  </div>
                  <div className="text-cyan-400">$ tensorspark-cli orchestrate --product {currentProduct.id} --streaming true</div>
                  <div className="text-neutral-400">[00:00:01] Binding neural cluster: 8x H100 SXM5 with NVLink v4.</div>
                  <div className="text-neutral-400">[00:00:02] Initializing model pipeline & hardware context buffer...</div>
                  <div className="text-emerald-400">[00:00:03] Payload validated against enterprise security guardrails:</div>
                  <div className="p-3 rounded-lg bg-neutral-900/90 border border-neutral-800 text-neutral-200">
                    "{currentProduct.liveDemoInputPlaceholder}"
                  </div>
                  <div className="text-cyan-300">[00:00:04] Dispatched via {currentProduct.name} in {currentProduct.metrics.latency}:</div>
                  <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/40 text-cyan-200 leading-relaxed">
                    {currentProduct.demoOutputSample}
                  </div>
                </div>
                <div className="pt-3 border-t border-neutral-850 text-[11px] text-neutral-500 flex justify-between">
                  <span>Throughput: {currentProduct.metrics.throughput}</span>
                  <span>Accuracy: {currentProduct.metrics.accuracy}</span>
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="p-5 sm:p-6 bg-neutral-950 space-y-4 h-full flex flex-col justify-between overflow-y-auto">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider pb-2 border-b border-neutral-850 flex items-center justify-between">
                    <span>Technical Architecture & DAG Specifications</span>
                    <span className="text-cyan-400 font-mono">v4.2 Production Ready</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {currentProduct.features.map((feat, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>Capability 0{i + 1}</span>
                        </div>
                        <p className="text-neutral-400 text-[11.5px] leading-relaxed">
                          {feat}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-mono">Enterprise Service Level Agreement</span>
                  <span className="text-emerald-400 font-bold font-mono">99.98% High Availability</span>
                </div>
              </div>
            )}

            {activeTab === 'quick-test' && (
              <div className="p-5 sm:p-6 bg-neutral-950 space-y-4 h-full flex flex-col justify-between overflow-y-auto">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-850 text-xs font-mono text-neutral-400">
                    <span>EMBEDDED TEST RUNNER // {currentProduct.name}</span>
                    <span className="text-cyan-400">Interactive Sandbox</span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1">
                      Execution Prompt / Test Payload:
                    </label>
                    <textarea
                      rows={3}
                      value={testInput}
                      onChange={(e) => setTestInput(e.target.value)}
                      placeholder="Enter test prompt or URL..."
                      className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setTestInput(currentProduct.liveDemoInputPlaceholder)}
                      className="text-[11px] text-neutral-500 hover:text-neutral-300 flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Reset to default</span>
                    </button>

                    <button
                      type="button"
                      disabled={isTestRunning || !testInput.trim()}
                      onClick={handleRunQuickTest}
                      className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-neutral-950 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
                    >
                      {isTestRunning ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Run Quick Simulation</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Output Box */}
                  <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 font-mono text-xs space-y-2">
                    <div className="text-[10.5px] text-neutral-500 border-b border-neutral-850 pb-1.5 flex justify-between">
                      <span>SIMULATED EXECUTION RESPONSE</span>
                      <span className="text-cyan-400">{currentProduct.metrics.latency}</span>
                    </div>

                    {isTestRunning ? (
                      <div className="py-4 text-center text-neutral-500 flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                        <span>Running neural inference...</span>
                      </div>
                    ) : testOutput ? (
                      <div className="text-cyan-200 leading-relaxed">
                        {testOutput}
                      </div>
                    ) : (
                      <div className="text-neutral-600 italic py-2 text-center">
                        Click "Run Quick Simulation" to test this engine live.
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-[11px] text-neutral-500 flex justify-between">
                  <span>Want full IDE integration? Open the main Products playground.</span>
                  <button
                    onClick={() => onNavigate('products')}
                    className="text-cyan-400 hover:text-white underline cursor-pointer"
                  >
                    Open Full Studio
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Specifications & Benchmark Sidebar */}
          <div className="lg:col-span-4 p-5 sm:p-7 flex flex-col justify-between space-y-6 bg-neutral-900/80 backdrop-blur-md">
            <div>
              {/* Product Badge & Category */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
                  {getProductIcon(currentProduct.id)}
                  <span>{currentProduct.badge}</span>
                </span>
                <span className="text-xs font-mono text-neutral-500 uppercase">
                  {currentProduct.category}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display mb-1">
                {currentProduct.name}
              </h3>
              <div className="text-xs font-mono text-cyan-400 mb-4 font-semibold">
                {currentProduct.tagline}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6 font-sans">
                {currentProduct.description}
              </p>

              {/* Metrics Grid */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                  Benchmark Telemetry:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
                    <span className="text-[10px] text-neutral-500 block font-mono">LATENCY</span>
                    <span className="text-xs sm:text-sm font-bold text-cyan-400 font-mono">
                      {currentProduct.metrics.latency.split(' ')[0]}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
                    <span className="text-[10px] text-neutral-500 block font-mono">ACCURACY</span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">
                      {currentProduct.metrics.accuracy.split(' ')[0]}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
                    <span className="text-[10px] text-neutral-500 block font-mono">THROUGHPUT</span>
                    <span className="text-xs sm:text-sm font-bold text-sky-400 font-mono">
                      {currentProduct.metrics.throughput.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-4 border-t border-neutral-800">
              <button
                id="product-carousel-open-sandbox-btn"
                type="button"
                onClick={() => onNavigate('products')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 hover:from-cyan-300 hover:to-white text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/20 transition-all cursor-pointer"
              >
                <span>Launch Interactive Playground</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="product-carousel-join-waitlist-btn"
                type="button"
                onClick={onOpenWaitlist || (() => onNavigate('products'))}
                className="w-full py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-850 text-neutral-300 hover:text-white font-medium text-xs border border-neutral-800 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Join Waiting List for Enterprise Access</span>
              </button>
            </div>

          </div>
        </div>

        {/* Video Scrubber & Playback Controls Bar */}
        <div className="p-3 sm:p-4 bg-neutral-950 border-t border-neutral-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          {/* Controls Left: Play/Pause, Restart, Timecode */}
          <div className="flex items-center gap-3">
            <button
              id="product-video-play-toggle"
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-cyan-400 border border-neutral-800 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              id="product-video-restart-btn"
              type="button"
              onClick={handleRestart}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
              title="Replay sequence"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="font-mono text-neutral-400 text-xs">
              <span className="text-white font-semibold">{formatTime(elapsedSeconds)}</span>
              <span className="text-neutral-600 mx-1">/</span>
              <span>{formatTime(DURATION_SECONDS)}</span>
            </div>
          </div>

          {/* Interactive Timeline Progress Bar */}
          <div className="flex-1 mx-0 sm:mx-4">
            <div 
              className="relative h-2 rounded-full bg-neutral-850 overflow-hidden cursor-pointer group"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                setElapsedSeconds(ratio * DURATION_SECONDS);
                setProgress(ratio * 100);
              }}
            >
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Controls Right: Speed, Mute, Fullscreen */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Speed toggle */}
            <div className="flex items-center gap-1 bg-neutral-900 px-1 py-0.5 rounded-lg border border-neutral-800 font-mono text-[10px]">
              {([1, 1.5, 2] as const).map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${
                    playbackSpeed === spd ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Simulated Audio Mute */}
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
              title={isMuted ? 'Sound Off (Simulation)' : 'Sound On'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>

            {/* Fullscreen toggle */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
