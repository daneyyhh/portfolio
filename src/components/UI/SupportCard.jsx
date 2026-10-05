import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Coffee, ArrowUpRight } from 'lucide-react';

const SUPPORT_URL = "https://buymeacoffee.com/reubg.dev";

/**
 * Compact Support Card for REUBG DEV
 * Minimal, technical developer aesthetic adhering strictly to portfolio design language.
 */
export default function SupportCard({ className = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(SUPPORT_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      className={`bg-[#FAF9F5] border border-[#C9C7C0] hover:border-[#FF1E27] p-6 sm:p-7 transition-all duration-300 shadow-sm relative font-mono text-[#111111] group ${className}`}
    >
      {/* Technical Top Bar */}
      <div className="flex items-center justify-between border-b border-[#C9C7C0] pb-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF1E27] animate-pulse" />
          <span className="text-[10px] text-[#FF1E27] font-bold uppercase tracking-widest">
            SUPPORT REUBG DEV
          </span>
        </div>
        <span className="text-[9px] text-[#888884] uppercase tracking-wider">
          OFFICIAL LINK
        </span>
      </div>

      {/* Engineering Creed */}
      <div className="space-y-1 mb-6">
        <div className="text-xs text-[#888884] uppercase tracking-wider">MANTRA</div>
        <div className="font-syne font-extrabold text-2xl sm:text-3xl text-[#111111] leading-tight tracking-tight uppercase">
          Build.<br />
          Research.<br />
          Experiment.<br />
          Ship<span className="text-[#FF1E27]">.</span>
        </div>
      </div>

      <p className="text-xs font-sans text-[#444444] leading-relaxed mb-6">
        Support the open-source engineering, AI laboratory research, and creative systems built at REUBG DEV.
      </p>

      {/* Action Buttons */}
      <div className="space-y-2.5">
        <a
          href={SUPPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-editorial-red w-full flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-wider group-hover:shadow-lg transition-all cursor-pointer"
        >
          <Coffee size={15} className="shrink-0" />
          <span>SUPPORT THE BUILD</span>
          <ArrowUpRight size={14} className="shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

        {/* Copy Direct Link Utility */}
        <div className="flex items-center justify-between pt-2 text-[10px] text-[#888884]">
          <span className="truncate max-w-[190px] sm:max-w-[220px]">buymeacoffee.com/reubg.dev</span>
          <button
            onClick={handleCopyLink}
            type="button"
            className="flex items-center gap-1 hover:text-[#FF1E27] transition-colors cursor-pointer py-0.5 px-1.5 bg-[#EDECE6] border border-[#C9C7C0]"
            title="Copy support URL to clipboard"
          >
            {copied ? (
              <>
                <Check size={11} className="text-[#FF1E27]" />
                <span className="text-[#FF1E27] font-bold">COPIED</span>
              </>
            ) : (
              <>
                <Copy size={11} />
                <span>COPY URL</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
