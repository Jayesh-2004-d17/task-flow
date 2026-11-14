import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  showWordmark?: boolean;
  showBadge?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'light',
  showWordmark = true,
  showBadge = false,
  className = '',
}) => {
  // Sizing definitions
  const dimensions = {
    sm: { box: 'w-7 h-7', icon: 28, text: 'text-base', dot: 'w-1.5 h-1.5' },
    md: { box: 'w-10 h-10', icon: 40, text: 'text-xl', dot: 'w-2 h-2' },
    lg: { box: 'w-12 h-12', icon: 48, text: 'text-2xl', dot: 'w-2.5 h-2.5' },
  }[size];

  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Aesthetic Custom Vector Icon Mark */}
      <div className={`relative ${dimensions.box} shrink-0 group`}>
        {/* Soft ambient backglow on hover */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 opacity-40 blur-md group-hover:opacity-75 transition-opacity duration-300"
          aria-hidden="true"
        />

        {/* Outer glass/enamel container with rim highlight */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-slate-900 to-indigo-950 p-0.5 shadow-lg shadow-indigo-950/20 ring-1 ring-white/20 overflow-hidden flex items-center justify-center">
          {/* Subtle inner reflective shimmer */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 pointer-events-none"
            aria-hidden="true"
          />

          {/* Precision SVG Vector Mark: Interlocking Dynamic Flow Waves forming an ascending Check */}
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1.5 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          >
            <defs>
              {/* Primary Vibrant Gradient */}
              <linearGradient id="tf-flow-grad-1" x1="4" y1="6" x2="36" y2="34" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="45%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>

              {/* Accent Luminous Flow Gradient */}
              <linearGradient id="tf-flow-grad-2" x1="8" y1="28" x2="34" y2="10" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>

              {/* Shadow filter for depth */}
              <filter id="tf-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#4F46E5" floodOpacity="0.45" />
              </filter>
            </defs>

            {/* Base geometric flow ribbon (Left loop & foundation) */}
            <path
              d="M10 24C8.34315 24 7 22.6569 7 21C7 19.3431 8.34315 18 10 18H16L18 15H10C6.68629 15 4 17.6863 4 21C4 24.3137 6.68629 27 10 27H18L15 24H10Z"
              fill="url(#tf-flow-grad-1)"
              opacity="0.3"
            />

            {/* Dynamic S-curve / Flow Wave 1 (Upper stream) */}
            <path
              d="M8 14C8 10.6863 10.6863 8 14 8H26C29.3137 8 32 10.6863 32 14C32 16.5 30.2 18.6 27.8 19.5L25 20.6C22.6 21.5 21 23.7 21 26.3V27"
              stroke="url(#tf-flow-grad-1)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
            />

            {/* Primary Ascending Checkmark Flow (The triumphant check stroke) */}
            <path
              d="M11 20.5L17.5 27L31 11.5"
              stroke="url(#tf-flow-grad-2)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#tf-glow)"
            />

            {/* Momentum Accent Node */}
            <circle cx="31" cy="11.5" r="2.2" fill="#F472B6" />
            <circle cx="31" cy="11.5" r="1" fill="#FFFFFF" />
          </svg>
        </div>
      </div>

      {/* Aesthetic Typographic Wordmark */}
      {showWordmark && (
        <div className="flex items-center gap-1.5">
          <div className="flex items-baseline font-extrabold tracking-tight">
            <span
              className={`transition-colors duration-200 ${
                isDark ? 'text-white' : 'text-slate-900 group-hover:text-indigo-600'
              } ${dimensions.text}`}
            >
              Task
            </span>
            <span
              className={`bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-black ${dimensions.text}`}
            >
              Flow
            </span>
          </div>

          {/* Aesthetic tiny pulse/dot or SaaS pill */}
          {showBadge ? (
            <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200/80 rounded-md">
              Pro
            </span>
          ) : (
            <span
              className={`${dimensions.dot} rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-xs mt-1 shrink-0`}
              aria-hidden="true"
            />
          )}
        </div>
      )}
    </div>
  );
};
