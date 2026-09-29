import React from 'react';

/**
 * Supported Status Values:
 * - "live" | "LIVE"
 * - "in development" | "IN DEVELOPMENT"
 * - "concept" | "CONCEPT"
 * 
 * Aesthetic constraints:
 * - Warm Ivory, Black, Stone, Graphite, Red accent.
 * - No purple.
 * - Accessibility: Never relies on color alone; displays text label + distinct shape.
 * - Reduced-motion support via motion-reduce.
 */
export default function ProjectStatusBadge({
  status = 'live',
  variant = 'default',
  className = ''
}) {
  const normalized = (status || '').toLowerCase().trim();

  // Normalize to one of the 3 supported statuses
  let statusKey = 'live';
  if (normalized.includes('dev') || normalized.includes('progress')) {
    statusKey = 'in_development';
  } else if (normalized.includes('concept') || normalized.includes('prototype') || normalized.includes('plan')) {
    statusKey = 'concept';
  } else {
    statusKey = 'live';
  }

  // Visual & accessibility configuration per status
  const config = {
    live: {
      label: 'LIVE',
      ariaLabel: 'Project Status: Live (Production Active)',
      indicator: (
        <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden duration-1000" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
      ),
      theme: {
        default: 'bg-[#111111] text-[#F1F0EB] border border-[#333333]',
        dark: 'bg-[#0A0A0A]/90 backdrop-blur-md text-[#F1F0EB] border border-white/15',
        hero: 'bg-[#141416] text-[#F1F0EB] border border-white/20',
        card: 'bg-[#111111] text-[#F1F0EB] border border-[#333333] shadow-sm'
      }
    },
    in_development: {
      label: 'IN DEVELOPMENT',
      ariaLabel: 'Project Status: In Development (Active Progress)',
      indicator: (
        <svg
          className="h-2.5 w-2.5 shrink-0 animate-spin motion-reduce:animate-none text-[#FF1E27]"
          style={{ animationDuration: '3.5s' }}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
          <path
            d="M14 8a6 6 0 00-6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      theme: {
        default: 'bg-[#1A1A1C] text-[#F1F0EB] border border-[#FF1E27]/40',
        dark: 'bg-[#141010]/95 backdrop-blur-md text-white border border-[#FF1E27]/40',
        hero: 'bg-[#181212] text-white border border-[#FF1E27]/50',
        card: 'bg-[#111111] text-white border border-[#FF1E27]/40 shadow-sm'
      }
    },
    concept: {
      label: 'CONCEPT',
      ariaLabel: 'Project Status: Concept (Architecture & Blueprint)',
      indicator: (
        <span
          className="w-2 h-2 shrink-0 border border-stone-400 rotate-45 inline-block bg-transparent"
          aria-hidden="true"
        />
      ),
      theme: {
        default: 'bg-[#FAF9F5] text-[#555555] border border-dashed border-[#C9C7C0]',
        dark: 'bg-[#111113]/90 backdrop-blur-md text-slate-300 border border-dashed border-white/25',
        hero: 'bg-[#141416] text-slate-300 border border-dashed border-white/25',
        card: 'bg-[#111111] text-slate-300 border border-dashed border-stone-500 shadow-sm'
      }
    }
  };

  const current = config[statusKey];
  const themeClass = current.theme[variant] || current.theme.default;

  return (
    <span
      role="status"
      aria-label={current.ariaLabel}
      className={`inline-flex items-center gap-2 px-2.5 py-1 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase select-none rounded-none transition-colors duration-200 ${themeClass} ${className}`}
    >
      {current.indicator}
      <span className="tracking-widest">{current.label}</span>
    </span>
  );
}
