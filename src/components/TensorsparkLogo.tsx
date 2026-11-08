import React from 'react';

interface TensorsparkLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  subtitle?: string;
  className?: string;
  sparkOnly?: boolean;
  animated?: boolean;
}

const SIZE_MAP = {
  xs: { box: 'w-6 h-6', icon: 24, font: 'text-sm', sub: 'text-[8px]' },
  sm: { box: 'w-8 h-8', icon: 32, font: 'text-base', sub: 'text-[9px]' },
  md: { box: 'w-10 h-10', icon: 40, font: 'text-lg', sub: 'text-[10px]' },
  lg: { box: 'w-12 h-12', icon: 48, font: 'text-xl', sub: 'text-[11px]' },
  xl: { box: 'w-16 h-16', icon: 64, font: 'text-2xl', sub: 'text-xs' },
};

export const TensorsparkLogo: React.FC<TensorsparkLogoProps> = ({
  size = 'md',
  showText = true,
  subtitle = 'DYNAMICS',
  className = '',
  sparkOnly = false,
  animated = true,
}) => {
  const currentSize = SIZE_MAP[size] || SIZE_MAP.md;

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Animated Tensor Spark Mark */}
      <div 
        className={`relative ${currentSize.box} flex items-center justify-center flex-shrink-0 group cursor-pointer`}
      >
        {/* Subtle radial ambient energy glow */}
        <div 
          className={`absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-500/30 via-indigo-500/20 to-amber-500/30 blur-md pointer-events-none ${
            animated ? 'animate-pulse' : ''
          }`} 
        />

        {/* Outer high-tech glass frame with gradient border */}
        <div className="relative w-full h-full rounded-xl bg-neutral-950/90 border border-cyan-500/30 p-0.5 overflow-hidden shadow-lg shadow-cyan-500/10 group-hover:border-cyan-400 group-hover:shadow-cyan-500/30 transition-all duration-300">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Electric Gradient for Tensor Lattice */}
              <linearGradient id="tensorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>

              {/* Spark Flare Radiant Gradient */}
              <radialGradient id="sparkCoreGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#38bdf8" />
                <stop offset="70%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#08090d" stopOpacity="0" />
              </radialGradient>

              {/* Golden Accent Flare */}
              <radialGradient id="sparkGoldGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fffbeb" />
                <stop offset="40%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
              </radialGradient>

              {/* Glow Filter */}
              <filter id="tensorGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Grid Accent Lines */}
            <g className="opacity-25 stroke-cyan-500/40" strokeWidth="0.75" strokeDasharray="2,2">
              <line x1="50" y1="10" x2="50" y2="90" />
              <line x1="10" y1="50" x2="90" y2="50" />
              <circle cx="50" cy="50" r="38" />
              <circle cx="50" cy="50" r="26" strokeDasharray="1,3" />
            </g>

            {/* 1. Rotating Outer Tensor Coordinate Hexagon / Diamond Lattice */}
            <g 
              className={animated ? 'origin-center animate-[spin_24s_linear_infinite]' : 'origin-center'}
            >
              {/* Hexagonal Isometric Coordinate Wireframe */}
              <polygon
                points="50,14 82,32 82,68 50,86 18,68 18,32"
                stroke="url(#tensorGrad)"
                strokeWidth="1.8"
                strokeLinejoin="round"
                fill="none"
                opacity="0.85"
              />
              {/* Tensor Node Points */}
              <circle cx="50" cy="14" r="2" fill="#38bdf8" />
              <circle cx="82" cy="32" r="2" fill="#818cf8" />
              <circle cx="82" cy="68" r="2" fill="#a855f7" />
              <circle cx="50" cy="86" r="2" fill="#f59e0b" />
              <circle cx="18" cy="68" r="2" fill="#818cf8" />
              <circle cx="18" cy="32" r="2" fill="#38bdf8" />
            </g>

            {/* 2. Counter-Rotating Inner Tensor Matrix Diamond */}
            <g 
              className={animated ? 'origin-center animate-[spin_16s_linear_infinite_reverse]' : 'origin-center'}
            >
              <polygon
                points="50,25 75,50 50,75 25,50"
                stroke="#38bdf8"
                strokeWidth="1.2"
                strokeDasharray="4,3"
                fill="rgba(56, 189, 248, 0.05)"
                opacity="0.7"
              />
              <circle cx="50" cy="25" r="1.75" fill="#f59e0b" />
              <circle cx="75" cy="50" r="1.75" fill="#38bdf8" />
              <circle cx="50" cy="75" r="1.75" fill="#f59e0b" />
              <circle cx="25" cy="50" r="1.75" fill="#38bdf8" />
            </g>

            {/* 3. Orbiting Spark Particle Satellites */}
            {animated && (
              <g className="origin-center animate-[spin_6s_linear_infinite]">
                <ellipse cx="50" cy="50" rx="34" ry="16" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="0.8" strokeDasharray="3,6" fill="none" transform="rotate(-25 50 50)" />
                {/* Micro spark orb 1 */}
                <circle cx="80" cy="38" r="2.2" fill="#fbbf24" filter="url(#tensorGlow)" />
                <circle cx="20" cy="62" r="1.8" fill="#38bdf8" filter="url(#tensorGlow)" />
              </g>
            )}

            {/* 4. Central Energy Core Corona */}
            <circle
              cx="50"
              cy="50"
              r="18"
              fill="url(#sparkCoreGrad)"
              className={animated ? 'origin-center animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-60' : 'opacity-40'}
            />

            {/* 5. Dynamic 8-Point Kinetic "Spark" Starburst */}
            <g className={animated ? 'origin-center animate-[pulse_2.2s_ease-in-out_infinite]' : 'origin-center'}>
              {/* Primary Vertical/Horizontal Spark Beams */}
              <path
                d="M50,22 Q50,47 22,50 Q50,53 50,78 Q50,53 78,50 Q50,47 50,22 Z"
                fill="url(#tensorGrad)"
                filter="url(#tensorGlow)"
              />
              
              {/* Secondary Diagonal Spark Beams */}
              <path
                d="M50,32 Q50,48 34,40 Q48,50 36,64 Q50,52 64,62 Q52,50 66,36 Q50,48 50,32 Z"
                fill="#fbbf24"
                opacity="0.85"
                transform="rotate(45 50 50)"
              />

              {/* Super-bright White-Hot Spark Center */}
              <circle cx="50" cy="50" r="4.5" fill="#ffffff" filter="url(#tensorGlow)" />
              <circle cx="50" cy="50" r="2.5" fill="#38bdf8" />
            </g>
          </svg>
        </div>
      </div>

      {/* Typography Label */}
      {showText && !sparkOnly && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <span className={`font-display font-bold ${currentSize.font} text-white tracking-tight leading-none`}>
              Tensor<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300">spark</span>
            </span>
            {subtitle && (
              <span className={`font-mono ${currentSize.sub} tracking-widest px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800 font-semibold shadow-inner`}>
                {subtitle}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
