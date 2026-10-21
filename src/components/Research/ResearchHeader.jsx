import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReubgLogo from '../UI/ReubgLogo';

/**
 * ResearchHeader
 * Dedicated minimal-ist header for REUBG.DEV Research Lab
 * Features original REUBG DEV logo, structured navigation, reubg.in link,
 * thin dividers, and a signal red (#FF0000) active indicator for Research.
 */
export default function ResearchHeader() {
  const location = useLocation();
  const isResearchActive = location.pathname.startsWith('/research');

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#F1F0EA]/95 backdrop-blur-md border-b border-[#E2E0D8] text-[#000000] font-mono transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-16 flex items-center justify-between">
        
        {/* Left: Original REUBG DEV Logo */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/" className="flex items-center group select-none" title="REUBG DEV Home">
            <ReubgLogo
              variant="dark"
              className="w-[100px] sm:w-[125px] h-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
            />
          </Link>
          
          <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-[#E2E0D8] text-[10px] text-[#555555] tracking-wider uppercase">
            <span>LAB_SYS</span>
            <span className="text-[#E2E0D8]">/</span>
            <span className="text-[#000000] font-bold">RESEARCH ARCHIVE</span>
          </div>
        </div>

        {/* Center: Structured Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-bold tracking-wider">
          <a
            href="/#hero"
            className="text-[#555555] hover:text-[#000000] transition-colors flex items-center gap-1.5 py-1"
          >
            <span>HOME</span>
          </a>

          <a
            href="/#projects"
            className="text-[#555555] hover:text-[#000000] transition-colors flex items-center gap-1.5 py-1"
          >
            <span>WORK</span>
          </a>

          <Link
            to="/research"
            className="text-[#000000] font-extrabold flex items-center gap-1.5 py-1 relative"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse" />
            <span className="text-[#FF0000]">RESEARCH</span>
            <span className="absolute -bottom-2.5 left-0 right-0 h-[2px] bg-[#FF0000]" />
          </Link>

          <a
            href="/#about"
            className="text-[#555555] hover:text-[#000000] transition-colors flex items-center gap-1.5 py-1"
          >
            <span>ABOUT</span>
          </a>

          <a
            href="/#contact"
            className="text-[#555555] hover:text-[#000000] transition-colors flex items-center gap-1.5 py-1"
          >
            <span>CONTACT</span>
          </a>
        </nav>

        {/* Right: reubg.in Canonical Link & Telemetry */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono">
          <a
            href="https://reubg.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-[#FAF9F5] border border-[#E2E0D8] text-[#555555] hover:text-[#000000] hover:border-[#000000] transition-colors text-[11px] font-bold tracking-wider"
          >
            <span>reubg.in</span>
            <span className="text-[#FF0000]">↗</span>
          </a>

          <Link
            to="/research"
            className="md:hidden flex items-center gap-1 px-2.5 py-1 bg-[#FAF9F5] border border-[#E2E0D8] text-[10px] font-bold text-[#FF0000]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]" />
            <span>RESEARCH</span>
          </Link>
        </div>

      </div>
    </header>
  );
}
