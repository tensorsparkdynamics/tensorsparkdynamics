import React from 'react';

interface SignatureProps {
  className?: string;
  color?: string;
  width?: number | string;
  height?: number | string;
}

/**
 * Authentic digital signature representation of Co-Founder Abhishek Kumar (M.Tech IIT Patna).
 * Vectorized directly from uploaded artifact 'abhishek sign.png'.
 */
export const AbhishekSignature: React.FC<SignatureProps> = ({
  className = 'h-auto max-h-14 max-w-full',
  color = 'currentColor',
  width = 240,
  height = 90,
}) => {
  return (
    <svg
      viewBox="0 0 280 110"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Abhishek Kumar Signature"
    >
      <g transform="translate(10, 8) rotate(-16 130 55)">
        {/* 'A' */}
        <path
          d="M 28 82 L 48 24 L 66 82"
          stroke={color}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 37 60 L 59 60"
          stroke={color}
          strokeWidth="3.0"
          strokeLinecap="round"
        />

        {/* 'b' */}
        <path
          d="M 68 82 L 72 26 C 73 24 74 24 75 28 L 74 80 C 74 72 78 64 86 64 C 95 64 98 71 97 78 C 96 83 91 84 83 83 C 76 82 74 81 74 81"
          stroke={color}
          strokeWidth="3.0"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 'h' */}
        <path
          d="M 98 82 L 102 24 C 103 22 104 23 105 27 L 103 82 C 103 72 108 64 116 64 C 124 64 127 71 126 82"
          stroke={color}
          strokeWidth="3.0"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 'i' */}
        <path
          d="M 132 64 L 132 82"
          stroke={color}
          strokeWidth="3.0"
          strokeLinecap="round"
        />
        <circle cx="132" cy="55" r="2.2" fill={color} />

        {/* 's' */}
        <path
          d="M 141 78 C 143 81 146 83 150 83 C 155 83 158 80 157 76 C 156 71 145 71 144 67 C 144 64 147 62 152 62 C 156 62 159 64 161 67"
          stroke={color}
          strokeWidth="2.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 'h' */}
        <path
          d="M 166 82 L 170 24 C 171 22 172 23 173 27 L 171 82 C 171 72 176 64 184 64 C 192 64 195 71 194 82"
          stroke={color}
          strokeWidth="3.0"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 'e' */}
        <path
          d="M 200 75 L 213 74 C 213 67 209 63 204 63 C 198 63 196 70 197 78 C 198 83 203 84 210 83"
          stroke={color}
          strokeWidth="2.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 'k' */}
        <path
          d="M 218 24 L 218 82"
          stroke={color}
          strokeWidth="3.0"
          strokeLinecap="round"
        />
        <path
          d="M 232 64 L 221 73 L 234 83"
          stroke={color}
          strokeWidth="3.0"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dots '...' */}
        <circle cx="243" cy="81" r="2.4" fill={color} />
        <circle cx="251" cy="80" r="2.4" fill={color} />
        <circle cx="259" cy="79" r="2.4" fill={color} />

        {/* Characteristic Underline stroke extending under Abhishek */}
        <path
          d="M 20 89 C 80 88, 170 87, 266 85"
          stroke={color}
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

/**
 * Authentic digital signature representation of Co-Founder Ajay Singh Chauhan (M.Tech IIT Patna).
 * Vectorized directly from uploaded artifact 'newsign nb - Copy.png' in authentic signature blue ink.
 */
export const AjaySignature: React.FC<SignatureProps> = ({
  className = 'h-auto max-h-16 max-w-full',
  color = '#1d4ed8', // classic fountain pen royal blue as in uploaded artifact
  width = 160,
  height = 95,
}) => {
  return (
    <svg
      viewBox="0 0 170 190"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ajay Singh Chauhan Signature"
    >
      {/* Top loop and tall distinctive initial 'Ajay' flourish */}
      <g>
        {/* Tall vertical spine with top loop */}
        <path
          d="M 52 170 C 44 140, 22 85, 26 50 C 30 20, 56 12, 68 28 C 76 39, 74 62, 58 84 C 42 105, 34 135, 46 160 C 50 169, 58 174, 62 165 C 72 145, 78 120, 84 90"
          stroke={color}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 'jay' curve & dot at top */}
        <path
          d="M 66 40 C 74 32, 85 28, 92 34 C 98 39, 97 48, 90 56 C 82 66, 75 78, 72 90"
          stroke={color}
          strokeWidth="3.0"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Accent dot/circle top */}
        <circle cx="78" cy="20" r="2.8" fill={color} />

        {/* Horizontal crossbar extending into 'Chauhan' cursive */}
        <path
          d="M 44 75 L 132 35"
          stroke={color}
          strokeWidth="3.0"
          strokeLinecap="round"
        />

        {/* 'Chauhan' text written across middle */}
        <path
          d="M 68 112 C 67 100, 71 85, 76 75 C 78 70, 82 72, 80 82 L 78 110"
          stroke={color}
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 78 95 C 83 88, 88 88, 91 94 L 90 108"
          stroke={color}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M 94 96 C 97 93, 102 92, 105 95 L 103 108 C 103 108, 106 102, 109 95 C 112 90, 115 92, 116 97 L 115 107"
          stroke={color}
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 120 95 C 124 90, 131 92, 131 98 L 130 106"
          stroke={color}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M 134 94 C 137 90, 142 90, 144 95 L 143 105"
          stroke={color}
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Long dynamic underline flourish across bottom */}
        <path
          d="M 32 148 L 158 84"
          stroke={color}
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        {/* End flourish tick */}
        <path
          d="M 152 87 C 155 83, 158 80, 160 84 C 160 87, 156 93, 152 97"
          stroke={color}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
