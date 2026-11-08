'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Palette, PenTool, Sparkles, Waves, Grid } from 'lucide-react';
import { TabView } from '../types';

export type VisualMode = 'graphic-design' | 'neural' | 'waves' | 'grid';

interface MotionBackgroundProps {
  currentTab?: TabView;
  isHome?: boolean;
}

export const MotionBackground: React.FC<MotionBackgroundProps> = ({ 
  currentTab = 'home',
  isHome: propIsHome
}) => {
  const isHomePage = propIsHome !== undefined ? propIsHome : currentTab === 'home';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<VisualMode>('graphic-design');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [showSmartGuides, setShowSmartGuides] = useState<boolean>(true);

  // Animated background runs ONLY on the home page
  useEffect(() => {
    if (!isHomePage) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // ==========================================
    // 1. GRAPHIC DESIGNING THEME STATE
    // ==========================================
    interface BezierAnchor {
      x: number;
      y: number;
      cp1x: number;
      cp1y: number;
      cp2x: number;
      cp2y: number;
      vx: number;
      vy: number;
      vcp1x: number;
      vcp1y: number;
      vcp2x: number;
      vcp2y: number;
    }

    const anchorCount = 6;
    const bezierAnchors: BezierAnchor[] = [];
    for (let i = 0; i < anchorCount; i++) {
      const x = (width / (anchorCount - 1)) * i;
      const y = height * 0.45 + (Math.random() - 0.5) * height * 0.25;
      bezierAnchors.push({
        x,
        y,
        cp1x: x - 60 + (Math.random() - 0.5) * 40,
        cp1y: y + (Math.random() - 0.5) * 120,
        cp2x: x + 60 + (Math.random() - 0.5) * 40,
        cp2y: y + (Math.random() - 0.5) * 120,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.5,
        vcp1x: (Math.random() - 0.5) * 0.6,
        vcp1y: (Math.random() - 0.5) * 0.8,
        vcp2x: (Math.random() - 0.5) * 0.6,
        vcp2y: (Math.random() - 0.5) * 0.8,
      });
    }

    // Floating Graphic Design Elements (Typography Glyphs & Color Swatches)
    interface DesignGlyph {
      x: number;
      y: number;
      vx: number;
      vy: number;
      text: string;
      subtext?: string;
      size: number;
      color: string;
      type: 'glyph' | 'swatch' | 'guide' | 'node';
      opacity: number;
    }

    const designGlyphs: DesignGlyph[] = [
      { x: width * 0.15, y: height * 0.25, vx: 0.15, vy: 0.1, text: 'Aa', size: 36, color: 'rgba(56, 189, 248, 0.4)', type: 'glyph', opacity: 0.4 },
      { x: width * 0.82, y: height * 0.32, vx: -0.12, vy: 0.15, text: '&', size: 48, color: 'rgba(99, 102, 241, 0.35)', type: 'glyph', opacity: 0.35 },
      { x: width * 0.25, y: height * 0.72, vx: 0.18, vy: -0.1, text: 'PANTONE 312 C', subtext: '#00A9E0', size: 11, color: 'rgba(6, 182, 212, 0.8)', type: 'swatch', opacity: 0.6 },
      { x: width * 0.75, y: height * 0.68, vx: -0.15, vy: -0.12, text: 'CYAN: 92% MAGENTA: 14%', subtext: 'CMYK PRO-SPEC', size: 10, color: 'rgba(236, 72, 153, 0.75)', type: 'swatch', opacity: 0.55 },
      { x: width * 0.65, y: height * 0.18, vx: 0.1, vy: 0.12, text: 'φ = 1.618', subtext: 'GOLDEN RATIO', size: 12, color: 'rgba(234, 179, 8, 0.6)', type: 'guide', opacity: 0.5 },
      { x: width * 0.42, y: height * 0.82, vx: -0.08, vy: 0.14, text: '✒ PEN TOOL: BEZIER', subtext: 'Tangents 45°', size: 10, color: 'rgba(16, 185, 129, 0.7)', type: 'node', opacity: 0.5 },
      { x: width * 0.08, y: height * 0.6, vx: 0.12, vy: -0.1, text: '§', size: 40, color: 'rgba(168, 85, 247, 0.3)', type: 'glyph', opacity: 0.3 },
      { x: width * 0.9, y: height * 0.8, vx: -0.1, vy: -0.08, text: '¶', size: 32, color: 'rgba(56, 189, 248, 0.35)', type: 'glyph', opacity: 0.35 },
    ];

    // ==========================================
    // 2. NEURAL NETWORK STATE
    // ==========================================
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      connections: number[];
    }

    const particleCount = 65;
    const particles: Particle[] = [];
    const colors = ['rgba(6, 182, 212, ', 'rgba(99, 102, 241, ', 'rgba(56, 189, 248, '];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        connections: []
      });
    }

    interface Packet {
      fromIndex: number;
      toIndex: number;
      progress: number;
      speed: number;
    }
    const packets: Packet[] = [];

    // Wave parameters
    let waveStep = 0;
    // Grid parameters
    let gridOffset = 0;
    // Graphic Design rotation & oscillation phase
    let designPhase = 0;

    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 16.66;
      lastTime = currentTime;

      if (!isPlaying) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Deep dark sleek base canvas
      ctx.fillStyle = '#08090e';
      ctx.fillRect(0, 0, width, height);

      // ======================================================
      // MODE: GRAPHIC DESIGNING THEME (Artboard, Vector & Typography)
      // ======================================================
      if (mode === 'graphic-design') {
        designPhase += 0.008 * speedMultiplier * delta;

        // 1. Draw Swiss Modular Drafting Grid (Dotted lines & 40px grid ticks)
        const gridSize = 60;
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
        ctx.lineWidth = 0.6;
        ctx.setLineDash([2, 6]);

        for (let x = 0; x <= width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        for (let y = 0; y <= height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
        ctx.setLineDash([]); // Reset line dash

        // 2. Corner Crop / Bleed Marks (Graphic Print Registration)
        const cropMargin = 30;
        const cropLen = 16;
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.lineWidth = 1;

        // Top Left
        ctx.beginPath();
        ctx.moveTo(cropMargin - cropLen, cropMargin);
        ctx.lineTo(cropMargin + cropLen, cropMargin);
        ctx.moveTo(cropMargin, cropMargin - cropLen);
        ctx.lineTo(cropMargin, cropMargin + cropLen);
        ctx.stroke();

        // Top Right
        ctx.beginPath();
        ctx.moveTo(width - cropMargin - cropLen, cropMargin);
        ctx.lineTo(width - cropMargin + cropLen, cropMargin);
        ctx.moveTo(width - cropMargin, cropMargin - cropLen);
        ctx.lineTo(width - cropMargin, cropMargin + cropLen);
        ctx.stroke();

        // Bottom Left
        ctx.beginPath();
        ctx.moveTo(cropMargin - cropLen, height - cropMargin);
        ctx.lineTo(cropMargin + cropLen, height - cropMargin);
        ctx.moveTo(cropMargin, height - cropMargin - cropLen);
        ctx.lineTo(cropMargin, height - cropMargin + cropLen);
        ctx.stroke();

        // Bottom Right
        ctx.beginPath();
        ctx.moveTo(width - cropMargin - cropLen, height - cropMargin);
        ctx.lineTo(width - cropMargin + cropLen, height - cropMargin);
        ctx.moveTo(width - cropMargin, height - cropMargin - cropLen);
        ctx.lineTo(width - cropMargin, height - cropMargin + cropLen);
        ctx.stroke();

        // 3. Golden Ratio Logarithmic Spiral & Geometric Drafting Section
        const spiralCenterX = width * 0.72;
        const spiralCenterY = height * 0.42;

        ctx.save();
        ctx.translate(spiralCenterX, spiralCenterY);
        ctx.rotate(Math.sin(designPhase * 0.5) * 0.12);

        // Golden Ratio Nesting Circles
        const radii = [18, 29, 47, 76, 123, 199];
        radii.forEach((r, idx) => {
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.05 + idx * 0.02})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Golden Ratio Crosshairs
          if (idx === 4) {
            ctx.setLineDash([3, 3]);
            ctx.strokeStyle = 'rgba(234, 179, 8, 0.18)';
            ctx.beginPath();
            ctx.moveTo(-r, 0);
            ctx.lineTo(r, 0);
            ctx.moveTo(0, -r);
            ctx.lineTo(0, r);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });

        // Golden Spiral Arc
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 1.2;
        for (let theta = 0; theta < Math.PI * 4; theta += 0.05) {
          const a = 3;
          const b = 0.30635; // golden spiral growth constant
          const r = a * Math.exp(b * theta);
          const x = r * Math.cos(theta + designPhase);
          const y = r * Math.sin(theta + designPhase);
          if (theta === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Phi badge text
        ctx.font = '10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas';
        ctx.fillStyle = 'rgba(234, 179, 8, 0.45)';
        ctx.fillText('φ = 1.618 GOLDEN COMPOSITION', 30, -30);
        ctx.restore();

        // 4. Dynamic Vector Bézier Curves with Anchor Points & Tangent Handles
        for (let i = 0; i < bezierAnchors.length; i++) {
          const anchor = bezierAnchors[i];
          anchor.y += Math.sin(designPhase + i) * 0.8 * speedMultiplier;
          anchor.cp1y += Math.cos(designPhase * 1.2 + i) * 1.2 * speedMultiplier;
          anchor.cp2y += Math.sin(designPhase * 1.1 + i) * 1.2 * speedMultiplier;
        }

        const curveLayers = [
          { stroke: 'rgba(6, 182, 212, 0.35)', width: 2, offset: 0 },
          { stroke: 'rgba(99, 102, 241, 0.25)', width: 1.5, offset: 25 },
          { stroke: 'rgba(236, 72, 153, 0.18)', width: 1.2, offset: -25 }
        ];

        curveLayers.forEach(layer => {
          ctx.beginPath();
          ctx.strokeStyle = layer.stroke;
          ctx.lineWidth = layer.width;

          ctx.moveTo(bezierAnchors[0].x, bezierAnchors[0].y + layer.offset);
          for (let i = 0; i < bezierAnchors.length - 1; i++) {
            const curr = bezierAnchors[i];
            const next = bezierAnchors[i + 1];
            ctx.bezierCurveTo(
              curr.cp2x, curr.cp2y + layer.offset,
              next.cp1x, next.cp1y + layer.offset,
              next.x, next.y + layer.offset
            );
          }
          ctx.stroke();
        });

        // Draw Tangent Handles & Anchor Points
        if (showSmartGuides) {
          for (let i = 0; i < bezierAnchors.length; i++) {
            const anchor = bezierAnchors[i];

            ctx.beginPath();
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
            ctx.lineWidth = 0.8;
            ctx.moveTo(anchor.cp1x, anchor.cp1y);
            ctx.lineTo(anchor.x, anchor.y);
            ctx.lineTo(anchor.cp2x, anchor.cp2y);
            ctx.stroke();

            ctx.fillStyle = '#38bdf8';
            ctx.beginPath();
            ctx.arc(anchor.cp1x, anchor.cp1y, 2.5, 0, Math.PI * 2);
            ctx.arc(anchor.cp2x, anchor.cp2y, 2.5, 0, Math.PI * 2);
            ctx.fill();

            const nodeSize = 6;
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#0284c7';
            ctx.lineWidth = 1.2;
            ctx.fillRect(anchor.x - nodeSize / 2, anchor.y - nodeSize / 2, nodeSize, nodeSize);
            ctx.strokeRect(anchor.x - nodeSize / 2, anchor.y - nodeSize / 2, nodeSize, nodeSize);

            ctx.font = '9px ui-monospace, SFMono-Regular, monospace';
            ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
            ctx.fillText(`P${i} [${Math.round(anchor.x)}, ${Math.round(anchor.y)}]`, anchor.x + 8, anchor.y - 8);
          }

          const snapY = height * 0.48;
          ctx.strokeStyle = 'rgba(236, 72, 153, 0.35)';
          ctx.setLineDash([4, 4]);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(width * 0.1, snapY);
          ctx.lineTo(width * 0.9, snapY);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = '#ec4899';
          ctx.fillRect(width * 0.5 - 32, snapY - 8, 64, 16);
          ctx.fillStyle = '#ffffff';
          ctx.font = '9px ui-monospace, monospace';
          ctx.textAlign = 'center';
          ctx.fillText('SNAP: Y 480px', width * 0.5, snapY + 3);
          ctx.textAlign = 'start';
        }

        // 5. Render Floating Graphic Design Glyphs & Swatches
        designGlyphs.forEach(g => {
          g.x += g.vx * speedMultiplier * delta;
          g.y += g.vy * speedMultiplier * delta;

          if (g.x < 20) g.vx = Math.abs(g.vx);
          if (g.x > width - 20) g.vx = -Math.abs(g.vx);
          if (g.y < 40) g.vy = Math.abs(g.vy);
          if (g.y > height - 40) g.vy = -Math.abs(g.vy);

          if (g.type === 'glyph') {
            ctx.font = `600 ${g.size}px "Playfair Display", Georgia, serif`;
            ctx.fillStyle = g.color;
            ctx.fillText(g.text, g.x, g.y);
          } else if (g.type === 'swatch') {
            const boxW = 120;
            const boxH = 34;
            ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
            ctx.lineWidth = 0.8;
            ctx.fillRect(g.x, g.y, boxW, boxH);
            ctx.strokeRect(g.x, g.y, boxW, boxH);

            ctx.fillStyle = g.color;
            ctx.fillRect(g.x + 2, g.y + 2, 8, boxH - 4);

            ctx.font = '9px ui-monospace, monospace';
            ctx.fillStyle = '#f8fafc';
            ctx.fillText(g.text, g.x + 16, g.y + 14);
            if (g.subtext) {
              ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
              ctx.fillText(g.subtext, g.x + 16, g.y + 26);
            }
          } else if (g.type === 'guide' || g.type === 'node') {
            ctx.font = '10px ui-monospace, monospace';
            ctx.fillStyle = g.color;
            ctx.fillText(g.text, g.x, g.y);
            if (g.subtext) {
              ctx.font = '8px ui-monospace, monospace';
              ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
              ctx.fillText(g.subtext, g.x, g.y + 12);
            }
          }
        });

      } else if (mode === 'neural') {
        const maxDist = 140;

        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.22;
              ctx.beginPath();
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();

              if (Math.random() < 0.0015 * speedMultiplier && packets.length < 20) {
                packets.push({
                  fromIndex: i,
                  toIndex: j,
                  progress: 0,
                  speed: (0.015 + Math.random() * 0.02) * speedMultiplier
                });
              }
            }
          }
        }

        for (let k = packets.length - 1; k >= 0; k--) {
          const pkt = packets[k];
          pkt.progress += pkt.speed * delta;
          const pFrom = particles[pkt.fromIndex];
          const pTo = particles[pkt.toIndex];

          if (pFrom && pTo && pkt.progress <= 1) {
            const curX = pFrom.x + (pTo.x - pFrom.x) * pkt.progress;
            const curY = pFrom.y + (pTo.y - pFrom.y) * pkt.progress;

            ctx.beginPath();
            ctx.fillStyle = '#38bdf8';
            ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
            ctx.arc(curX, curY, 6, 0, Math.PI * 2);
            ctx.fill();
          } else {
            packets.splice(k, 1);
          }
        }

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx * speedMultiplier * delta;
          p.y += p.vy * speedMultiplier * delta;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.beginPath();
          ctx.fillStyle = p.color + '0.75)';
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.fillStyle = p.color + '0.15)';
          ctx.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }

      } else if (mode === 'waves') {
        waveStep += 0.02 * speedMultiplier * delta;
        const waveCount = 5;

        for (let w = 0; w < waveCount; w++) {
          ctx.beginPath();
          const waveAlpha = 0.12 + w * 0.05;
          ctx.strokeStyle = `rgba(56, 189, 248, ${waveAlpha})`;
          ctx.lineWidth = 1.5;

          const baseHeight = height * (0.35 + w * 0.09);
          const frequency = 0.003 + w * 0.001;
          const amplitude = 50 + w * 22;

          for (let x = 0; x <= width; x += 12) {
            const y =
              baseHeight +
              Math.sin(x * frequency + waveStep + w) * amplitude +
              Math.cos(x * 0.0015 - waveStep * 0.6) * (amplitude * 0.4);
            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }

      } else if (mode === 'grid') {
        gridOffset = (gridOffset + 1.2 * speedMultiplier * delta) % 40;
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
        ctx.lineWidth = 1;

        const horizon = height * 0.45;
        const vpX = width / 2;

        for (let x = -width * 0.5; x <= width * 1.5; x += 60) {
          ctx.beginPath();
          ctx.moveTo(vpX, horizon);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        for (let y = horizon + gridOffset; y <= height; y += 28) {
          const depthRatio = (y - horizon) / (height - horizon);
          ctx.strokeStyle = `rgba(56, 189, 248, ${depthRatio * 0.25})`;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      const radialGradient = ctx.createRadialGradient(
        width / 2,
        height * 0.4,
        width * 0.15,
        width / 2,
        height * 0.4,
        width * 0.85
      );
      radialGradient.addColorStop(0, 'rgba(8, 9, 14, 0.35)');
      radialGradient.addColorStop(1, 'rgba(8, 9, 14, 0.88)');
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode, isPlaying, speedMultiplier, isHomePage, showSmartGuides]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-all duration-700">
      {/* 1. HOME PAGE: Animated interactive canvas background */}
      {isHomePage && (
        <>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
          
          {/* Subtle ambient light orbs in background */}
          <div className="absolute -top-40 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -right-20 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-teal-500/8 rounded-full blur-3xl pointer-events-none" />

          {/* Floating Graphic Designing & Visual Theme Interactive Controller (Clickable) */}
          <div className="pointer-events-auto absolute bottom-5 right-5 z-20 flex flex-col items-end gap-2">
            {showControls && (
              <div 
                id="graphic-design-controls-panel"
                className="p-3.5 bg-neutral-900/95 backdrop-blur-md border border-neutral-800 rounded-xl shadow-2xl flex flex-col gap-3 text-xs text-neutral-300 w-72 animate-in fade-in slide-in-from-bottom-2 duration-200"
              >
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <span className="font-semibold text-neutral-200 flex items-center gap-1.5 font-display">
                    <Palette className="w-4 h-4 text-cyan-400" />
                    Graphic Designing Theme
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    Vector Studio
                  </span>
                </div>

                {/* Mode selection */}
                <div>
                  <span className="text-[11px] text-neutral-400 mb-1.5 block">Visual Studio Mode:</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      id="btn-mode-graphic-design"
                      type="button"
                      onClick={() => setMode('graphic-design')}
                      className={`px-2 py-1.5 rounded text-[11px] font-medium flex items-center gap-1.5 transition-colors ${
                        mode === 'graphic-design'
                          ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 shadow-sm'
                          : 'bg-neutral-800/60 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                      }`}
                    >
                      <PenTool className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Graphic Design</span>
                    </button>
                    <button
                      id="btn-mode-neural"
                      type="button"
                      onClick={() => setMode('neural')}
                      className={`px-2 py-1.5 rounded text-[11px] font-medium flex items-center gap-1.5 transition-colors ${
                        mode === 'neural'
                          ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/40'
                          : 'bg-neutral-800/60 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Neural Mesh</span>
                    </button>
                    <button
                      id="btn-mode-waves"
                      type="button"
                      onClick={() => setMode('waves')}
                      className={`px-2 py-1.5 rounded text-[11px] font-medium flex items-center gap-1.5 transition-colors ${
                        mode === 'waves'
                          ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/40'
                          : 'bg-neutral-800/60 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                      }`}
                    >
                      <Waves className="w-3.5 h-3.5 text-sky-400" />
                      <span>Waveform</span>
                    </button>
                    <button
                      id="btn-mode-grid"
                      type="button"
                      onClick={() => setMode('grid')}
                      className={`px-2 py-1.5 rounded text-[11px] font-medium flex items-center gap-1.5 transition-colors ${
                        mode === 'grid'
                          ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/40'
                          : 'bg-neutral-800/60 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                      }`}
                    >
                      <Grid className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Matrix Grid</span>
                    </button>
                  </div>
                </div>

                {/* Smart Guides Toggle */}
                {mode === 'graphic-design' && (
                  <div className="flex items-center justify-between py-1 px-2 rounded bg-neutral-950/60 border border-neutral-800/80">
                    <span className="text-[11px] text-neutral-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-pink-500" />
                      Smart Alignment Guides
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowSmartGuides(!showSmartGuides)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium transition-colors ${
                        showSmartGuides ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' : 'bg-neutral-800 text-neutral-500'
                      }`}
                    >
                      {showSmartGuides ? 'Active' : 'Off'}
                    </button>
                  </div>
                )}

                {/* Controls */}
                <div className="flex items-center justify-between pt-1 border-t border-neutral-800/80">
                  <div className="flex items-center gap-1">
                    <button
                      id="btn-motion-toggle-play"
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors cursor-pointer"
                      title={isPlaying ? 'Pause Motion' : 'Play Motion'}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-[11px] text-neutral-400 ml-1 font-mono">
                      {isPlaying ? 'Live 60fps' : 'Paused'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-neutral-500">Speed:</span>
                    {[0.5, 1, 1.75].map((speed) => (
                      <button
                        key={speed}
                        type="button"
                        onClick={() => setSpeedMultiplier(speed)}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono cursor-pointer ${
                          speedMultiplier === speed
                            ? 'bg-cyan-500/30 text-cyan-300 font-bold border border-cyan-500/40'
                            : 'text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Floating Toggle Button */}
            <button
              id="btn-toggle-motion-controls"
              type="button"
              onClick={() => setShowControls(!showControls)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 text-neutral-200 hover:text-white shadow-xl backdrop-blur-sm text-xs transition-all hover:border-cyan-500/50 cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-mono text-[11px]">Graphic Designing Theme</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </button>
          </div>
        </>
      )}

      {/* 2. AI PRODUCTS: Deep Quantum Cyber Obsidian Grid with Indigo/Cyan Aurora */}
      {currentTab === 'products' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none animate-in fade-in duration-500">
          {/* Base tint */}
          <div className="absolute inset-0 bg-[#070912]" />

          {/* Top Center Quantum Beam */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[480px] bg-gradient-to-b from-cyan-500/18 via-indigo-600/12 to-transparent blur-3xl" />
          <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] bg-cyan-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] bg-indigo-600/12 rounded-full blur-3xl" />

          {/* Micro-dot Quantum Grid */}
          <div 
            className="absolute inset-0 opacity-[0.22]" 
            style={{
              backgroundImage: `radial-gradient(rgba(56, 189, 248, 0.45) 1px, transparent 1px)`,
              backgroundSize: '28px 28px'
            }}
          />
          {/* Macro Technical Coordinates Grid */}
          <div 
            className="absolute inset-0 opacity-[0.06]" 
            style={{
              backgroundImage: `linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)`,
              backgroundSize: '112px 112px'
            }}
          />

          {/* Precision Blueprint Tech Badges */}
          <div className="absolute top-24 left-8 font-mono text-[9px] text-cyan-400/40 uppercase tracking-widest hidden md:block">
            SYSTEM // TENSOR_MATRIX_V3 • QUANTUM INFERENCE RUNTIME
          </div>
          <div className="absolute top-36 right-10 font-mono text-[9px] text-indigo-400/40 uppercase tracking-widest hidden md:block">
            NEURAL ENCLAVE // MULTI-MODAL 1M CONTEXT • P99 &lt;14ms
          </div>
          <div className="absolute bottom-16 left-10 font-mono text-[9px] text-cyan-500/30 uppercase tracking-widest hidden lg:block">
            COORDINATES // [37.7749° N, 122.4194° W] • SILICON VALIDATED
          </div>
        </div>
      )}

      {/* 3. CAREERS & FELLOWSHIPS: Emerald & Mint Growth Fellowship Matrix */}
      {currentTab === 'careers' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none animate-in fade-in duration-500">
          {/* Base tint */}
          <div className="absolute inset-0 bg-[#06100c]" />

          {/* Emerald Growth Auroras */}
          <div className="absolute top-0 right-1/4 w-[900px] h-[500px] bg-gradient-to-bl from-emerald-500/16 via-teal-600/12 to-transparent blur-3xl" />
          <div className="absolute bottom-1/4 -left-20 w-[550px] h-[550px] bg-emerald-600/12 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

          {/* Diagonal Prestige Fellowship Lattice */}
          <div 
            className="absolute inset-0 opacity-[0.09]" 
            style={{
              backgroundImage: `repeating-linear-gradient(135deg, rgba(16, 185, 129, 0.45) 0px, rgba(16, 185, 129, 0.45) 1px, transparent 1px, transparent 32px)`
            }}
          />
          <div 
            className="absolute inset-0 opacity-[0.16]" 
            style={{
              backgroundImage: `radial-gradient(rgba(20, 184, 166, 0.4) 1px, transparent 1px)`,
              backgroundSize: '36px 36px'
            }}
          />

          {/* Fellowship Metadata Markers */}
          <div className="absolute top-24 left-8 font-mono text-[9px] text-emerald-400/50 uppercase tracking-widest hidden md:block">
            ACADEMY // COHORT 2026 • 3 DEDICATED CAREER PATHWAYS
          </div>
          <div className="absolute top-36 right-10 font-mono text-[9px] text-teal-400/40 uppercase tracking-widest hidden md:block">
            STIPEND // ₹25,000 - ₹45,000 / MO • DIRECT PPO TRANSITIONS
          </div>
          <div className="absolute bottom-16 right-12 font-mono text-[9px] text-emerald-500/35 uppercase tracking-widest hidden lg:block">
            VERIFIED INSTITUTIONAL CREDENTIAL • 15-DAY & 3-MONTH TENURES
          </div>
        </div>
      )}

      {/* 4. TRACKER DASHBOARD: Command Center Telemetry Navy Matrix */}
      {currentTab === 'dashboard' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none animate-in fade-in duration-500">
          {/* Base tint */}
          <div className="absolute inset-0 bg-[#060b14]" />

          {/* Telemetry Sky Blue Overhead Beam */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-sky-500/18 via-blue-600/10 to-transparent blur-3xl" />
          <div className="absolute top-1/2 right-12 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

          {/* Crosshair / Telemetry Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.12]" 
            style={{
              backgroundImage: `linear-gradient(to right, rgba(56, 189, 248, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.4) 1px, transparent 1px)`,
              backgroundSize: '54px 54px'
            }}
          />

          {/* Telemetry Console Indicators */}
          <div className="absolute top-24 left-8 font-mono text-[9px] text-sky-400/45 uppercase tracking-widest hidden md:block">
            CONSOLE // REAL-TIME APPLICATION PORTAL • CANDIDATE VERIFIED
          </div>
          <div className="absolute top-36 right-10 font-mono text-[9px] text-cyan-400/40 uppercase tracking-widest hidden md:block">
            SECURE AUDIT TELEMETRY // ENCRYPTED APPLICATION REGISTRY
          </div>
          <div className="absolute bottom-16 left-10 font-mono text-[9px] text-sky-500/35 uppercase tracking-widest hidden lg:block">
            PIPELINE STATUS // AUTO-PROGRESSION & WEEKLY REPORT VERIFICATION
          </div>
        </div>
      )}

      {/* 5. AGENCY & SERVICES: Creative Studio Luxury Violet/Fuchsia Spotlights */}
      {currentTab === 'agency' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none animate-in fade-in duration-500">
          {/* Base tint */}
          <div className="absolute inset-0 bg-[#0f0714]" />

          {/* Creative Studio Dramatic Lighting */}
          <div className="absolute top-0 left-1/4 w-[850px] h-[520px] bg-gradient-to-br from-purple-600/18 via-pink-600/12 to-transparent blur-3xl" />
          <div className="absolute top-1/2 right-8 w-[600px] h-[600px] bg-fuchsia-600/12 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-12 w-[480px] h-[480px] bg-indigo-600/12 rounded-full blur-3xl" />

          {/* Swiss Drafting Dot Matrix */}
          <div 
            className="absolute inset-0 opacity-[0.22]" 
            style={{
              backgroundImage: `radial-gradient(rgba(236, 72, 153, 0.45) 1.2px, transparent 1.2px)`,
              backgroundSize: '32px 32px'
            }}
          />

          {/* Creative Studio Registration Annotations */}
          <div className="absolute top-24 left-8 font-mono text-[9px] text-pink-400/50 uppercase tracking-widest hidden md:block">
            STUDIO // 7 DEDICATED PRACTICES • FULL-CYCLE DIGITAL PRODUCTION
          </div>
          <div className="absolute top-36 right-10 font-mono text-[9px] text-purple-400/40 uppercase tracking-widest hidden md:block">
            STANDARDS // FIGMA TOKENS • NEXT.JS 15 • 5.86x VERIFIED ROAS
          </div>
          <div className="absolute bottom-16 right-12 font-mono text-[9px] text-fuchsia-400/35 uppercase tracking-widest hidden lg:block">
            SPECIFICATION // CMYK / RGB VECTOR DRAFTING • PIXEL PRECISION
          </div>
        </div>
      )}

      {/* 6. ANALYTICS SUITE: Institutional Observatory Amber & Sky Benchmark Matrix */}
      {currentTab === 'analytics' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none animate-in fade-in duration-500">
          {/* Base tint */}
          <div className="absolute inset-0 bg-[#0e0c06]" />

          {/* Institutional Benchmark Glowing Auroras */}
          <div className="absolute top-0 right-1/3 w-[850px] h-[480px] bg-gradient-to-b from-amber-500/16 via-sky-600/12 to-transparent blur-3xl" />
          <div className="absolute bottom-10 left-1/4 w-[600px] h-[600px] bg-sky-600/12 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-8 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl" />

          {/* Financial & Benchmark Horizontal Rule Matrix */}
          <div 
            className="absolute inset-0 opacity-[0.16]" 
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, rgba(245, 158, 11, 0.35) 0px, rgba(245, 158, 11, 0.35) 1px, transparent 1px, transparent 44px)`
            }}
          />
          <div 
            className="absolute inset-0 opacity-[0.08]" 
            style={{
              backgroundImage: `linear-gradient(to right, rgba(14, 165, 233, 0.45) 1px, transparent 1px)`,
              backgroundSize: '88px 100%'
            }}
          />

          {/* Quantitative Observatory Labels */}
          <div className="absolute top-24 left-8 font-mono text-[9px] text-amber-400/50 uppercase tracking-widest hidden md:block">
            OBSERVATORY // BENCHMARK MMLU-PRO, MATH & HUMAN-EVAL
          </div>
          <div className="absolute top-36 right-10 font-mono text-[9px] text-sky-400/40 uppercase tracking-widest hidden md:block">
            TELEMETRY // 1,480,000 TOKENS / SEC • P99 LATENCY VERIFIED
          </div>
          <div className="absolute bottom-16 left-12 font-mono text-[9px] text-amber-500/35 uppercase tracking-widest hidden lg:block">
            AUDIT // INDEPENDENT MULTI-AGENT SWARM VALIDATION SUITE
          </div>
        </div>
      )}

      {/* 7. ABOUT & LEADERSHIP: Executive Research Heritage Teal & Cyan Auroras */}
      {currentTab === 'about' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none animate-in fade-in duration-500">
          <div className="absolute inset-0 bg-[#070d10]" />
          <div className="absolute top-0 left-1/3 w-[800px] h-[450px] bg-gradient-to-b from-teal-500/18 via-cyan-600/12 to-transparent blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-[600px] h-[550px] bg-sky-600/10 rounded-full blur-3xl" />
          <div 
            className="absolute inset-0 opacity-[0.15]" 
            style={{
              backgroundImage: `radial-gradient(rgba(20, 184, 166, 0.4) 1px, transparent 1px)`,
              backgroundSize: '36px 36px'
            }}
          />
          <div className="absolute top-24 left-8 font-mono text-[9px] text-teal-400/50 uppercase tracking-widest hidden md:block">
            RESEARCH // IIT PATNA POSTGRADUATE FOUNDATION • DEEP-TECH COMPUTING
          </div>
          <div className="absolute top-36 right-10 font-mono text-[9px] text-cyan-400/40 uppercase tracking-widest hidden md:block">
            LEADERSHIP // ABHISHEK KUMAR (CTO) & AJAY SINGH CHAUHAN (COO)
          </div>
        </div>
      )}
    </div>
  );
};

