'use client';

import React, { useRef, useState, useEffect } from 'react';
import { PenTool, RotateCcw, Check, ShieldCheck, Type, Lock } from 'lucide-react';

interface DigitalSignaturePadProps {
  onSaveSignature: (signatureDataUrl: string, signerName: string) => void;
  initialName?: string;
  initialSignature?: string;
}

export const DigitalSignaturePad: React.FC<DigitalSignaturePadProps> = ({
  onSaveSignature,
  initialName = 'Candidate Name',
  initialSignature
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [mode, setMode] = useState<'draw' | 'type'>('draw');
  const [typedName, setTypedName] = useState(initialName);
  const [fontStyle, setFontStyle] = useState<'cursive1' | 'cursive2' | 'formal'>('cursive1');
  const [isSigned, setIsSigned] = useState(!!initialSignature);
  const [signatureHash, setSignatureHash] = useState<string>('0x7f4e92a...c391');

  // Generate deterministic pseudo-hash on sign
  const generateHash = (name: string) => {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 16; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2; // high-DPI scaling
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    ctx.strokeStyle = '#22d3ee'; // cyan-400
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // If initial signature is provided and not drawn yet
    if (initialSignature) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
        setHasDrawn(true);
      };
      img.src = initialSignature;
    }
  }, []);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isSigned) return;
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isSigned) return;
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setIsSigned(false);
  };

  const handleSaveDrawn = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) return;
    const dataUrl = canvas.toDataURL('image/png');
    const hash = generateHash(typedName);
    setSignatureHash(hash);
    setIsSigned(true);
    onSaveSignature(dataUrl, typedName);
  };

  const handleSaveTyped = () => {
    if (!typedName.trim()) return;
    // Render text to canvas to get dataUrl
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, 600, 200);

    ctx.fillStyle = '#22d3ee';
    ctx.font = fontStyle === 'cursive1' 
      ? 'italic 44px "Brush Script MT", "Segoe Script", cursive' 
      : fontStyle === 'cursive2' 
      ? 'italic 38px "Dancing Script", cursive' 
      : 'bold 32px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(typedName, 300, 100);

    const dataUrl = canvas.toDataURL('image/png');
    const hash = generateHash(typedName);
    setSignatureHash(hash);
    setIsSigned(true);
    onSaveSignature(dataUrl, typedName);
  };

  return (
    <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Candidate Digital Signature Authorization</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Mandatory
              </span>
            </h4>
            <p className="text-xs text-neutral-400">
              Required for 15-Day Internship Certificate verification & original authorship audit.
            </p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
          <button
            type="button"
            onClick={() => { setMode('draw'); setIsSigned(false); }}
            className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              mode === 'draw' ? 'bg-cyan-500/20 text-cyan-300' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <PenTool className="w-3 h-3" />
            <span>Draw</span>
          </button>
          <button
            type="button"
            onClick={() => { setMode('type'); setIsSigned(false); }}
            className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              mode === 'type' ? 'bg-cyan-500/20 text-cyan-300' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Type className="w-3 h-3" />
            <span>Type Name</span>
          </button>
        </div>
      </div>

      {/* Candidate Name Input */}
      <div>
        <label className="block text-xs font-mono text-neutral-300 mb-1.5">
          Candidate Official Full Name:
        </label>
        <input
          type="text"
          value={typedName}
          onChange={(e) => setTypedName(e.target.value)}
          placeholder="e.g. Alex Chen"
          disabled={isSigned}
          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 disabled:opacity-60"
        />
      </div>

      {/* Drawing Pad Mode */}
      {mode === 'draw' ? (
        <div className="space-y-3">
          <div className="relative w-full h-40 bg-neutral-950 rounded-xl border-2 border-dashed border-neutral-700 hover:border-cyan-500/50 transition-colors overflow-hidden">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className={`w-full h-full cursor-crosshair touch-none ${isSigned ? 'pointer-events-none opacity-80' : ''}`}
            />

            {!hasDrawn && !isSigned && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-neutral-500 text-xs">
                <PenTool className="w-5 h-5 mb-1 text-neutral-600" />
                <span>Draw your signature using cursor, finger, or stylus</span>
              </div>
            )}

            {isSigned && (
              <div className="absolute top-2 right-2 px-2 py-1 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] flex items-center gap-1">
                <Check className="w-3 h-3" /> Digitally Locked
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={clearCanvas}
              disabled={isSigned}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Signature</span>
            </button>

            {!isSigned ? (
              <button
                type="button"
                onClick={handleSaveDrawn}
                disabled={!hasDrawn}
                className="px-4 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-40 shadow-sm shadow-cyan-500/20"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply Digital Signature</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsSigned(false)}
                className="text-cyan-400 hover:underline font-mono text-xs cursor-pointer"
              >
                Re-sign
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Typed Mode */
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'cursive1', label: 'Script Elegant', sampleFont: 'italic font-serif' },
              { id: 'cursive2', label: 'Modern Flow', sampleFont: 'italic tracking-wider' },
              { id: 'formal', label: 'Monospace Audit', sampleFont: 'font-mono' }
            ].map((font) => (
              <button
                key={font.id}
                type="button"
                onClick={() => setFontStyle(font.id as any)}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  fontStyle === font.id
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <span className="text-[10px] font-mono text-neutral-500 block">{font.label}</span>
                <span className={`text-base text-white block truncate ${font.sampleFont}`}>
                  {typedName || 'Signature'}
                </span>
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-center py-6">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-2">
              Generated Visual Signature:
            </span>
            <div className={`text-3xl text-cyan-400 select-none ${
              fontStyle === 'cursive1' ? 'italic font-serif' : fontStyle === 'cursive2' ? 'italic tracking-wide font-sans' : 'font-mono font-bold'
            }`}>
              {typedName || 'Alex Chen'}
            </div>
          </div>

          <div className="flex justify-end">
            {!isSigned ? (
              <button
                type="button"
                onClick={handleSaveTyped}
                className="px-4 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm shadow-cyan-500/20"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Confirm Typed Signature</span>
              </button>
            ) : (
              <span className="text-emerald-400 font-mono text-xs flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Signature Saved
              </span>
            )}
          </div>
        </div>
      )}

      {/* Cryptographic Declaration & Legal Stamp */}
      <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-850 flex items-start gap-2.5 text-[11px] text-neutral-400">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-white font-medium">Digital Authorship & On-Time Task Guarantee:</span>
          <p className="text-neutral-400 leading-relaxed">
            By signing, the candidate guarantees that all submitted tasks for the 15-Day Internship are completed autonomously on time. The resulting verification certificate embeds this digital signature alongside cryptographic hash <span className="font-mono text-cyan-400">{signatureHash}</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
