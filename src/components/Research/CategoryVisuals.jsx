import React from 'react';

/**
 * Technical Fine-Line Vector Visuals for the 4 Research Categories
 * Palette: Black, Grey, Off-white, and selective Signal Red (#FF0000).
 */

// CARD 01: Artificial Intelligence (Waveform, Neural Tensor Lattice & Attention Matrix)
export function AiCategoryVisual({ className = "w-full h-32" }) {
  return (
    <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background Matrix Grid */}
      <defs>
        <pattern id="aiGridSmall" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#E2E0D8" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect x="10" y="10" width="300" height="100" fill="url(#aiGridSmall)" opacity="0.6" />
      <rect x="10" y="10" width="300" height="100" stroke="#E2E0D8" strokeWidth="0.5" />

      {/* Scaled Dot-Product Waveform */}
      <path
        d="M 20 60 Q 60 20 100 60 T 180 60 T 260 60 L 300 60"
        stroke="#CCCCCC"
        strokeWidth="1"
        fill="none"
        strokeDasharray="2 2"
      />
      <path
        d="M 20 60 C 50 15, 80 105, 110 60 C 140 15, 170 105, 200 60 C 230 15, 260 105, 300 60"
        stroke="#111111"
        strokeWidth="1.25"
        fill="none"
      />

      {/* Multi-Head Attention Node Columns */}
      <g stroke="#999990" strokeWidth="0.75">
        <line x1="80" y1="20" x2="80" y2="100" strokeDasharray="3 3" />
        <line x1="160" y1="20" x2="160" y2="100" strokeDasharray="3 3" />
        <line x1="240" y1="20" x2="240" y2="100" strokeDasharray="3 3" />
      </g>

      {/* Cross-Attention Lattice Lines */}
      <line x1="80" y1="35" x2="160" y2="60" stroke="#777770" strokeWidth="0.8" />
      <line x1="80" y1="85" x2="160" y2="60" stroke="#777770" strokeWidth="0.8" />
      <line x1="160" y1="60" x2="240" y2="35" stroke="#FF0000" strokeWidth="1" />
      <line x1="160" y1="60" x2="240" y2="85" stroke="#777770" strokeWidth="0.8" />

      {/* Nodes */}
      <circle cx="80" cy="35" r="3" fill="#111111" />
      <circle cx="80" cy="85" r="3" fill="#111111" />
      <circle cx="160" cy="60" r="4.5" fill="#111111" stroke="#FAF9F5" strokeWidth="1" />
      <circle cx="240" cy="35" r="4" fill="#FF0000" />
      <circle cx="240" cy="85" r="3" fill="#111111" />

      {/* Technical Labels */}
      <text x="80" y="112" fill="#777770" fontSize="7" fontFamily="monospace" textAnchor="middle">Q_t</text>
      <text x="160" y="112" fill="#777770" fontSize="7" fontFamily="monospace" textAnchor="middle">K_s</text>
      <text x="240" y="112" fill="#FF0000" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ATTN_WEIGHT</text>
    </svg>
  );
}

// CARD 02: Human Cognition (Fine-Line Profile of Head & Synaptic Lattice)
export function CognitionCategoryVisual({ className = "w-full h-32" }) {
  return (
    <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <pattern id="cogGridSmall" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#E2E0D8" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect x="10" y="10" width="300" height="100" fill="url(#cogGridSmall)" opacity="0.6" />
      <rect x="10" y="10" width="300" height="100" stroke="#E2E0D8" strokeWidth="0.5" />

      {/* Minimal Fine-Line Human Head Profile */}
      <path
        d="M 60 100 L 60 92 C 60 78, 65 74, 75 70 C 85 66, 92 62, 92 50 C 92 30, 110 20, 135 20 C 160 20, 175 32, 175 52 C 175 62, 172 70, 168 76 C 164 82, 160 88, 160 100"
        stroke="#111111"
        strokeWidth="1.25"
        fill="none"
      />

      {/* Facial Profile Contours (Nose, Lips, Chin) */}
      <path
        d="M 135 20 C 120 20, 110 26, 102 34 C 95 42, 92 48, 88 52 L 82 58 L 86 62 C 82 66, 84 70, 80 74 C 76 78, 72 84, 70 94"
        stroke="#888880"
        strokeWidth="0.75"
        strokeDasharray="2 2"
        fill="none"
      />

      {/* Cortical Neural Synaptic Lattice */}
      <g stroke="#999990" strokeWidth="0.75">
        <line x1="120" y1="45" x2="138" y2="35" />
        <line x1="120" y1="45" x2="142" y2="55" />
        <line x1="138" y1="35" x2="155" y2="48" />
        <line x1="142" y1="55" x2="155" y2="48" />
        <line x1="142" y1="55" x2="135" y2="72" />
        <line x1="155" y1="48" x2="165" y2="65" />
      </g>

      {/* Synaptic Nodes */}
      <circle cx="120" cy="45" r="2.5" fill="#111111" />
      <circle cx="138" cy="35" r="2.5" fill="#111111" />
      <circle cx="135" cy="72" r="2.5" fill="#111111" />
      <circle cx="165" cy="65" r="2.5" fill="#111111" />

      {/* Focal Signal Red Synaptic Node (Neuroplasticity / Executive Control) */}
      <g transform="translate(155, 48)">
        <circle cx="0" cy="0" r="4.5" fill="#FF0000" />
        <circle cx="0" cy="0" r="9" stroke="#FF0000" strokeWidth="0.5" strokeDasharray="2 2" fill="none" />
      </g>

      {/* Cognitive Wave Horizon */}
      <path
        d="M 180 50 Q 210 30, 240 50 T 300 50"
        stroke="#CCCCCC"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="240" cy="50" r="3" fill="#111111" />
      <circle cx="280" cy="40" r="2" fill="#FF0000" />

      {/* Technical Labels */}
      <text x="155" y="28" fill="#FF0000" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">PREFRONTAL_CORTEX</text>
      <text x="240" y="85" fill="#777770" fontSize="7" fontFamily="monospace" textAnchor="middle">WORKING_MEMORY: 7±2</text>
    </svg>
  );
}

// CARD 03: Systems & Patterns (Orbital Paths, Connected Nodes & Mathematical Patterns)
export function SystemsCategoryVisual({ className = "w-full h-32" }) {
  return (
    <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <pattern id="sysGridSmall" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#E2E0D8" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect x="10" y="10" width="300" height="100" fill="url(#sysGridSmall)" opacity="0.6" />
      <rect x="10" y="10" width="300" height="100" stroke="#E2E0D8" strokeWidth="0.5" />

      {/* Concentric / Eccentric Orbital Ellipses */}
      <ellipse cx="160" cy="60" rx="100" ry="38" stroke="#D5D3C8" strokeWidth="0.75" fill="none" />
      <ellipse cx="160" cy="60" rx="70" ry="26" transform="rotate(-15 160 60)" stroke="#111111" strokeWidth="1" fill="none" />
      <ellipse cx="160" cy="60" rx="40" ry="16" transform="rotate(20 160 60)" stroke="#888880" strokeWidth="0.75" strokeDasharray="3 2" fill="none" />

      {/* Dynamical System Trajectory */}
      <path
        d="M 60 70 Q 110 30, 160 60 T 260 50"
        stroke="#999990"
        strokeWidth="0.75"
        strokeDasharray="2 3"
        fill="none"
      />

      {/* Central Attractor Node */}
      <circle cx="160" cy="60" r="5" fill="#111111" stroke="#FAF9F5" strokeWidth="1.5" />
      <circle cx="160" cy="60" r="10" stroke="#111111" strokeWidth="0.5" strokeDasharray="2 2" fill="none" />

      {/* Orbital Satellite Nodes */}
      <circle cx="95" cy="50" r="3" fill="#111111" />
      <circle cx="225" cy="70" r="3" fill="#111111" />
      
      {/* Perturbation Node in Signal Red */}
      <g transform="translate(200, 38)">
        <circle cx="0" cy="0" r="4" fill="#FF0000" />
        <circle cx="0" cy="0" r="8" stroke="#FF0000" strokeWidth="0.6" strokeDasharray="2 2" fill="none" />
        <line x1="0" y1="-10" x2="0" y2="10" stroke="#FF0000" strokeWidth="0.5" />
      </g>

      {/* Coordinate Crosshairs */}
      <line x1="160" y1="20" x2="160" y2="100" stroke="#E2E0D8" strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1="40" y1="60" x2="280" y2="60" stroke="#E2E0D8" strokeWidth="0.5" strokeDasharray="2 2" />

      {/* Technical Labels */}
      <text x="160" y="112" fill="#777770" fontSize="7" fontFamily="monospace" textAnchor="middle">STRANGE_ATTRACTOR // \Delta S \ge 0</text>
      <text x="200" y="25" fill="#FF0000" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">LIMIT_CYCLE</text>
    </svg>
  );
}

// CARD 04: Real-World Applications (Layered Geometric Structures & System Execution Pipelines)
export function ApplicationsCategoryVisual({ className = "w-full h-32" }) {
  return (
    <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <pattern id="appGridSmall" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#E2E0D8" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect x="10" y="10" width="300" height="100" fill="url(#appGridSmall)" opacity="0.6" />
      <rect x="10" y="10" width="300" height="100" stroke="#E2E0D8" strokeWidth="0.5" />

      {/* Layered Isometric Software / Engine Slabs */}
      {/* Base Layer: Infrastructure */}
      <polygon points="60,85 160,102 260,85 160,68" fill="#FAF9F5" stroke="#B8B6AD" strokeWidth="0.75" />
      
      {/* Mid Layer: Orchestration & Tools */}
      <polygon points="80,65 160,78 240,65 160,52" fill="#E8E6DE" stroke="#555555" strokeWidth="0.8" />
      
      {/* Top Layer: Interactive Application / Agent */}
      <polygon points="105,45 160,55 215,45 160,35" fill="#111111" stroke="#000000" strokeWidth="1" />

      {/* Connecting Isometric Pillars */}
      <line x1="60" y1="85" x2="80" y2="65" stroke="#888880" strokeWidth="0.75" strokeDasharray="2 2" />
      <line x1="260" y1="85" x2="240" y2="65" stroke="#888880" strokeWidth="0.75" strokeDasharray="2 2" />
      <line x1="80" y1="65" x2="105" y2="45" stroke="#888880" strokeWidth="0.75" strokeDasharray="2 2" />
      <line x1="240" y1="65" x2="215" y2="45" stroke="#888880" strokeWidth="0.75" strokeDasharray="2 2" />

      {/* Output Vector Ray Rising from Apex in Signal Red */}
      <line x1="160" y1="35" x2="160" y2="18" stroke="#FF0000" strokeWidth="1.25" />
      <g transform="translate(160, 18)">
        <circle cx="0" cy="0" r="3" fill="#FF0000" />
        <polyline points="-4,-2 0,-6 4,-2" stroke="#FF0000" strokeWidth="1" fill="none" />
      </g>

      {/* Lateral Flow Annotations */}
      <line x1="215" y1="45" x2="280" y2="45" stroke="#FF0000" strokeWidth="0.75" strokeDasharray="3 2" />
      <circle cx="280" cy="45" r="2.5" fill="#FF0000" />
      <text x="285" y="47" fill="#FF0000" fontSize="7" fontFamily="monospace" fontWeight="bold">PROD_DEPLOY</text>

      {/* Left Ingestion Annotation */}
      <line x1="40" y1="85" x2="60" y2="85" stroke="#777770" strokeWidth="0.75" />
      <text x="35" y="87" fill="#777770" fontSize="7" fontFamily="monospace" textAnchor="end">RUNTIME_ENV</text>

      {/* Bottom Technical Label */}
      <text x="160" y="112" fill="#777770" fontSize="7" fontFamily="monospace" textAnchor="middle">STACK: BROWSER \times WASM \times GPU</text>
    </svg>
  );
}
