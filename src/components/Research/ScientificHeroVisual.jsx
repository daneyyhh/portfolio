import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ScientificHeroVisual
 * Restrained abstract scientific illustration featuring layered geometric planes,
 * subtle orbital paths, technical annotations, and a central structural/mountain form
 * with selective signal red (#FF0000) highlights.
 * 
 * Palette: Pure Black, Charcoal, Cool Grey, Off-white, and Signal Red (#FF0000).
 */
export default function ScientificHeroVisual({ className = "" }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <div className={`relative w-full max-w-[620px] mx-auto select-none overflow-hidden ${className}`}>
      
      {/* Editorial Frame Ticks */}
      <div className="absolute top-2 left-2 font-mono text-[9px] tracking-widest text-[#777770]">
        [FIG 01.A — GEODESIC TENSOR MANIFOLD]
      </div>
      <div className="absolute top-2 right-2 font-mono text-[9px] tracking-widest text-[#777770]">
        COORD: 12.97°N // 77.59°E
      </div>
      <div className="absolute bottom-2 left-2 font-mono text-[9px] tracking-widest text-[#777770]">
        ISO_PROJECTION // DATUM: WGS-84
      </div>
      <div className="absolute bottom-2 right-2 font-mono text-[9px] tracking-widest text-[#FF0000] font-bold">
        PEAK_AFFINITY: \lambda = 0.948
      </div>

      <svg
        viewBox="0 0 640 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xs"
      >
        <defs>
          {/* Subtle grid pattern */}
          <pattern id="sciGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#E2E0D8" strokeWidth="0.5" />
          </pattern>
          {/* Fine diagonal hatch pattern */}
          <pattern id="diagHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#D5D3C8" strokeWidth="0.75" />
          </pattern>
        </defs>

        {/* ── 01. BACKGROUND SCIENTIFIC GRID ── */}
        <rect x="40" y="40" width="560" height="400" fill="url(#sciGrid)" opacity="0.7" />
        <rect x="40" y="40" width="560" height="400" stroke="#D5D3C8" strokeWidth="0.75" />

        {/* Axis Ticks & Coordinate Markings */}
        <g stroke="#888880" strokeWidth="0.75">
          {/* Horizontal Axis Ticks */}
          <line x1="100" y1="36" x2="100" y2="44" />
          <line x1="200" y1="36" x2="200" y2="44" />
          <line x1="320" y1="36" x2="320" y2="44" />
          <line x1="440" y1="36" x2="440" y2="44" />
          <line x1="540" y1="36" x2="540" y2="44" />

          {/* Vertical Axis Ticks */}
          <line x1="36" y1="100" x2="44" y2="100" />
          <line x1="36" y1="200" x2="44" y2="200" />
          <line x1="36" y1="300" x2="44" y2="300" />
          <line x1="36" y1="400" x2="44" y2="400" />
        </g>

        {/* ── 02. LAYERED GEOMETRIC PLANES (ISOMETRIC DATUMS) ── */}
        {/* Base Plane (z = 0) */}
        <polygon
          points="80,380 320,440 560,380 320,320"
          fill="#FAF9F5"
          stroke="#C8C6BD"
          strokeWidth="1"
        />
        <line x1="80" y1="380" x2="560" y2="380" stroke="#E2E0D8" strokeWidth="0.75" strokeDasharray="3 3" />
        <line x1="320" y1="320" x2="320" y2="440" stroke="#E2E0D8" strokeWidth="0.75" strokeDasharray="3 3" />

        {/* Mid-Elevation Analytical Plane (z = 1) */}
        <polygon
          points="130,290 320,335 510,290 320,245"
          fill="#FAF9F5"
          fillOpacity="0.85"
          stroke="#B5B3A8"
          strokeWidth="0.75"
          strokeDasharray="4 2"
        />

        {/* Upper Geodesic Horizon (z = 2) */}
        <polygon
          points="180,210 320,245 460,210 320,175"
          fill="none"
          stroke="#999990"
          strokeWidth="0.75"
          strokeDasharray="2 3"
        />

        {/* ── 03. SUBTLE ORBITAL PATHS & DATA FLOW ARCS ── */}
        {/* Primary Elliptical Orbit (Tilted) */}
        <ellipse
          cx="320"
          cy="260"
          rx="210"
          ry="65"
          transform="rotate(-8 320 260)"
          stroke="#888880"
          strokeWidth="0.8"
          strokeDasharray="4 4"
          fill="none"
        />
        
        {/* Secondary Upper Orbit */}
        <ellipse
          cx="320"
          cy="220"
          rx="150"
          ry="42"
          transform="rotate(6 320 220)"
          stroke="#AAAAA0"
          strokeWidth="0.6"
          strokeDasharray="2 3"
          fill="none"
        />

        {/* ── 04. CENTRAL MOUNTAIN / STRUCTURAL TOPOGRAPHY ── */}
        {/* Shaded Topographic Facets (Black, Charcoal, Slate, Cream) */}
        
        {/* Base Foothill Shadows */}
        <polygon points="170,360 250,330 320,375 220,390" fill="#E8E6DF" stroke="#888880" strokeWidth="0.75" />
        <polygon points="470,360 390,330 320,375 420,390" fill="#DAD8D0" stroke="#888880" strokeWidth="0.75" />

        {/* Mid-Tier Mountain Ridge Slices */}
        {/* West Flank (Dark Charcoal & Deep Shading) */}
        <polygon points="210,340 280,270 320,310 250,360" fill="#2E2E2E" stroke="#111111" strokeWidth="0.8" />
        <polygon points="250,310 320,240 320,310" fill="#1A1A1A" stroke="#000000" strokeWidth="0.8" />
        <polygon points="280,270 320,200 320,240" fill="#0D0D0D" stroke="#000000" strokeWidth="0.8" />
        
        {/* East Flank (Light Intercept & Architectural Facets) */}
        <polygon points="430,340 360,270 320,310 390,360" fill="#757570" stroke="#333333" strokeWidth="0.8" />
        <polygon points="390,310 320,240 320,310" fill="#999990" stroke="#333333" strokeWidth="0.8" />
        <polygon points="360,270 320,200 320,240" fill="#B8B6AD" stroke="#444444" strokeWidth="0.8" />

        {/* Topographic Contour Lines (Scientific Elevation) */}
        <path d="M 230 330 Q 320 300 410 330" stroke="#FFFFFF" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M 260 295 Q 320 270 380 295" stroke="#FFFFFF" strokeWidth="0.8" fill="none" opacity="0.7" />
        <path d="M 290 250 Q 320 230 350 250" stroke="#FFFFFF" strokeWidth="0.8" fill="none" opacity="0.8" />
        <path d="M 305 215 Q 320 205 335 215" stroke="#FFFFFF" strokeWidth="0.8" fill="none" opacity="0.9" />

        {/* Central Ridge Arête (Sharp dividing spine) */}
        <line x1="320" y1="160" x2="320" y2="380" stroke="#000000" strokeWidth="1.2" />

        {/* ── 05. ZENITH PLUMB LINE & SIGNAL RED HIGHLIGHTS ── */}
        {/* Plumb Line rising from apex to analytical zenith */}
        <line x1="320" y1="160" x2="320" y2="80" stroke="#FF0000" strokeWidth="1.2" strokeDasharray="3 3" />
        
        {/* Horizon Focal Ray */}
        <line x1="200" y1="160" x2="440" y2="160" stroke="#FF0000" strokeWidth="0.5" opacity="0.6" />
        
        {/* Apex Zenith Target Marker (Signal Red #FF0000) */}
        <g transform="translate(320, 80)">
          <circle cx="0" cy="0" r="14" stroke="#FF0000" strokeWidth="0.75" fill="none" strokeDasharray="3 2" />
          <circle cx="0" cy="0" r="5" fill="#FF0000" />
          <line x1="-18" y1="0" x2="18" y2="0" stroke="#FF0000" strokeWidth="0.75" />
          <line x1="0" y1="-18" x2="0" y2="18" stroke="#FF0000" strokeWidth="0.75" />
          <circle cx="0" cy="0" r="22" stroke="#FF0000" strokeWidth="0.5" opacity="0.4" fill="none" />
        </g>

        {/* Mountain Peak Node (Apex) */}
        <circle cx="320" cy="160" r="3.5" fill="#000000" stroke="#FFFFFF" strokeWidth="1" />
        <circle cx="320" cy="160" r="7" stroke="#000000" strokeWidth="0.5" fill="none" />

        {/* ── 06. ORBITAL SATELLITES & MATHEMATICAL NODES ── */}
        {/* Node 1: West Orbit Node */}
        <g transform="translate(135, 275)">
          <circle cx="0" cy="0" r="3.5" fill="#111111" stroke="#FAF9F5" strokeWidth="1" />
          <text x="-8" y="-8" fill="#555555" fontSize="8" fontFamily="monospace" textAnchor="end">
            K_t[-1]
          </text>
        </g>

        {/* Node 2: East Orbit Node (Selective Red Highlight) */}
        <g transform="translate(485, 235)">
          <circle cx="0" cy="0" r="4.5" fill="#FF0000" stroke="#FAF9F5" strokeWidth="1" />
          <circle cx="0" cy="0" r="8" stroke="#FF0000" strokeWidth="0.6" strokeDasharray="2 2" fill="none" />
          <text x="12" y="3" fill="#FF0000" fontSize="8" fontFamily="monospace" fontWeight="bold">
            Q \cdot K^T / \sqrt(d_k)
          </text>
        </g>

        {/* Node 3: Ground Datum Anchor */}
        <g transform="translate(520, 395)">
          <rect x="-3" y="-3" width="6" height="6" fill="#111111" />
          <text x="8" y="3" fill="#777770" fontSize="8" fontFamily="monospace">
            Z_0 = 0.00
          </text>
        </g>

        {/* ── 07. TECHNICAL LEADER LINES & SCIENTIFIC ANNOTATIONS ── */}
        
        {/* Annotation 1: Peak Altitude */}
        <g>
          <line x1="320" y1="120" x2="230" y2="120" stroke="#555555" strokeWidth="0.75" />
          <line x1="230" y1="120" x2="210" y2="105" stroke="#555555" strokeWidth="0.75" />
          <text x="205" y="100" fill="#111111" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="end">
            CONVERGENCE APEX // +3,420m
          </text>
          <text x="205" y="112" fill="#777770" fontSize="7.5" fontFamily="monospace" textAnchor="end">
            GLOBAL MINIMUM \min \mathcal{L}_{CE}
          </text>
        </g>

        {/* Annotation 2: Geodesic Metric */}
        <g>
          <line x1="320" y1="280" x2="420" y2="280" stroke="#555555" strokeWidth="0.75" />
          <line x1="420" y1="280" x2="450" y2="305" stroke="#555555" strokeWidth="0.75" />
          <text x="455" y="308" fill="#111111" fontSize="9" fontFamily="monospace" fontWeight="bold">
            O(1) PATHWAY
          </text>
          <text x="455" y="320" fill="#555555" fontSize="7.5" fontFamily="monospace">
            TENSOR AFFINITY \mathcal{A} \times \mathcal{V}
          </text>
        </g>

        {/* Annotation 3: Dimension Vector */}
        <g>
          <line x1="80" y1="410" x2="320" y2="470" stroke="#999990" strokeWidth="0.75" />
          <polygon points="80,410 88,410 84,414" fill="#999990" />
          <polygon points="320,470 312,470 316,466" fill="#999990" />
          <text x="195" y="450" fill="#777770" fontSize="8" fontFamily="monospace" textAnchor="middle">
            {"d_model = 4096 // SEQUENCE N"}
          </text>
        </g>

        {/* Small Crosshairs */}
        <g stroke="#999990" strokeWidth="0.5">
          <path d="M 70 70 L 80 70 M 75 65 L 75 75" />
          <path d="M 565 70 L 575 70 M 570 65 L 570 75" />
          <path d="M 70 410 L 80 410 M 75 405 L 75 415" />
          <path d="M 565 410 L 575 410 M 570 405 L 570 415" />
        </g>
      </svg>
    </div>
  );
}
