import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Server, Database, Shield, Cpu, RefreshCw, Layers, CheckCircle2 } from 'lucide-react';

/**
 * Editorial Interactive Diagrams for Full-Stack Systems
 */
export default function RoadmapDiagrams({ diagramType = 'request-response' }) {
  const [activeStep, setActiveStep] = useState(0);

  if (diagramType === 'request-response') {
    const steps = [
      {
        num: '01',
        title: 'DNS Resolution',
        actor: 'Client -> DNS Server',
        desc: 'Browser queries recursive DNS to resolve human domain "reubg.in" to IPv4/IPv6 address.',
        badge: 'UDP / Port 53'
      },
      {
        num: '02',
        title: 'TCP Handshake & TLS 1.3',
        actor: 'Client <-> Origin Server',
        desc: 'SYN, SYN-ACK, ACK 3-way handshake established, followed by TLS cryptographic session keys.',
        badge: 'TCP / Port 443'
      },
      {
        num: '03',
        title: 'HTTP Request Transmission',
        actor: 'Client -> Reverse Proxy',
        desc: 'Browser transmits HTTP method (GET), path, headers (Host, User-Agent, Accept, Cookies).',
        badge: 'HTTP/2 or HTTP/3'
      },
      {
        num: '04',
        title: 'Server Processing & Response',
        actor: 'Node.js / Express -> DB',
        desc: 'Server executes middleware, queries database, constructs payload, returns 200 OK with HTML/JSON.',
        badge: 'Response Headers'
      },
      {
        num: '05',
        title: 'Critical Rendering Path',
        actor: 'Browser Engine (V8)',
        desc: 'Browser constructs DOM + CSSOM -> Render Tree -> Computes Layout geometry -> Paints pixels.',
        badge: 'Frame Paint'
      }
    ];

    return (
      <div className="bg-[#FAF9F5] border border-[#C9C7C0] p-4 sm:p-6 font-mono text-xs text-[#111111] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#C9C7C0] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF1E27]" />
            <span className="font-bold uppercase tracking-wider text-[#111111]">
              SYSTEM FLOW // THE HTTP REQUEST-RESPONSE JOURNEY
            </span>
          </div>
          <span className="text-[10px] text-[#666660] uppercase">
            Click step to inspect
          </span>
        </div>

        {/* Step Nodes Horizontal Progression */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {steps.map((st, i) => (
            <button
              key={st.num}
              type="button"
              onClick={() => setActiveStep(i)}
              className={`p-2.5 text-left border transition-all duration-150 flex flex-col justify-between h-20 ${
                activeStep === i
                  ? 'bg-[#111111] text-[#FFFFFF] border-[#111111] shadow-sm'
                  : 'bg-[#FFFFFF] text-[#222222] border-[#C9C7C0] hover:border-[#111111]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[10px] font-bold ${activeStep === i ? 'text-[#FF1E27]' : 'text-[#888880]'}`}>
                  {st.num}
                </span>
                <span className="text-[9px] uppercase tracking-wider px-1 border border-current opacity-70">
                  {st.badge}
                </span>
              </div>
              <span className="font-bold text-xs truncate w-full mt-1">{st.title}</span>
            </button>
          ))}
        </div>

        {/* Active Node Detail Card */}
        <div className="p-4 bg-[#FFFFFF] border border-[#C9C7C0] space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-[#FF1E27] uppercase">
              PHASE {steps[activeStep].num} // {steps[activeStep].actor}
            </span>
            <span className="text-[10px] text-[#666660] uppercase">
              STATUS: STEP ACTIVE
            </span>
          </div>
          <div className="text-sm font-bold text-[#000000]">
            {steps[activeStep].title}
          </div>
          <p className="text-xs text-[#444440] leading-relaxed">
            {steps[activeStep].desc}
          </p>
        </div>
      </div>
    );
  }

  if (diagramType === 'event-loop') {
    return (
      <div className="bg-[#FAF9F5] border border-[#C9C7C0] p-4 sm:p-6 font-mono text-xs text-[#111111] space-y-4">
        <div className="flex items-center justify-between border-b border-[#C9C7C0] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF1E27]" />
            <span className="font-bold uppercase tracking-wider text-[#111111]">
              JAVASCRIPT RUNTIME // THE EVENT LOOP ARCHITECTURE
            </span>
          </div>
          <span className="text-[10px] text-[#666660] uppercase">Single-Threaded Model</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="p-3 bg-[#FFFFFF] border border-[#C9C7C0] space-y-2">
            <span className="text-[10px] text-[#FF1E27] font-bold block uppercase">01 // CALL STACK</span>
            <span className="font-bold text-xs block text-[#000000]">Synchronous Execution</span>
            <p className="text-[11px] text-[#555550] leading-relaxed">
              LIFO stack where currently executing functions reside. One frame executes at a time until return.
            </p>
          </div>

          <div className="p-3 bg-[#FFFFFF] border border-[#C9C7C0] space-y-2">
            <span className="text-[10px] text-[#888880] font-bold block uppercase">02 // WEB APIS / LIBUV</span>
            <span className="font-bold text-xs block text-[#000000]">Background Workers</span>
            <p className="text-[11px] text-[#555550] leading-relaxed">
              Timers, HTTP fetch, file I/O, and crypto offloaded to host browser threads or Node libuv pool.
            </p>
          </div>

          <div className="p-3 bg-[#FFFFFF] border border-[#C9C7C0] space-y-2">
            <span className="text-[10px] text-[#FF1E27] font-bold block uppercase">03 // MICROTASK QUEUE</span>
            <span className="font-bold text-xs block text-[#000000]">Promises & queueMicrotask</span>
            <p className="text-[11px] text-[#555550] leading-relaxed">
              High-priority queue drained completely after each stack frame before any macrotasks execute.
            </p>
          </div>

          <div className="p-3 bg-[#FFFFFF] border border-[#C9C7C0] space-y-2">
            <span className="text-[10px] text-[#888880] font-bold block uppercase">04 // TASK / MACRO QUEUE</span>
            <span className="font-bold text-xs block text-[#000000]">setTimeout / I/O</span>
            <p className="text-[11px] text-[#555550] leading-relaxed">
              Standard event queue. Event Loop picks one task per tick once microtasks are completely empty.
            </p>
          </div>
        </div>

        <div className="p-3 bg-[#FFFFFF] border-l-2 border-l-[#FF1E27] border border-[#C9C7C0] text-[11px] text-[#444440]">
          <strong className="text-[#000000]">Event Loop Cycle:</strong> Call Stack is checked. If empty, the Microtask Queue is drained until zero items remain. Then, one task from the Task Queue is pushed onto the Call Stack. Screen renders happen between ticks.
        </div>
      </div>
    );
  }

  if (diagramType === 'backend-lifecycle') {
    return (
      <div className="bg-[#FAF9F5] border border-[#C9C7C0] p-4 sm:p-6 font-mono text-xs text-[#111111] space-y-4">
        <div className="flex items-center justify-between border-b border-[#C9C7C0] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF1E27]" />
            <span className="font-bold uppercase tracking-wider text-[#111111]">
              BACKEND REQUEST LIFECYCLE // LAYERED ARCHITECTURE
            </span>
          </div>
          <span className="text-[10px] text-[#666660] uppercase">Express Pipeline</span>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-2 text-center">
          <div className="flex-1 p-2.5 bg-[#FFFFFF] border border-[#C9C7C0] space-y-1">
            <span className="text-[9px] text-[#888880] font-bold block uppercase">STAGE 1</span>
            <span className="font-bold text-xs block text-[#000000]">Client Request</span>
            <span className="text-[10px] text-[#555550] block">Headers, Path, Body</span>
          </div>
          <div className="hidden md:flex items-center text-[#888880]">→</div>
          <div className="flex-1 p-2.5 bg-[#FFFFFF] border border-[#C9C7C0] space-y-1">
            <span className="text-[9px] text-[#FF1E27] font-bold block uppercase">STAGE 2</span>
            <span className="font-bold text-xs block text-[#000000]">Middleware Chain</span>
            <span className="text-[10px] text-[#555550] block">Helmet, CORS, Auth, Rate Limit</span>
          </div>
          <div className="hidden md:flex items-center text-[#888880]">→</div>
          <div className="flex-1 p-2.5 bg-[#FFFFFF] border border-[#C9C7C0] space-y-1">
            <span className="text-[9px] text-[#888880] font-bold block uppercase">STAGE 3</span>
            <span className="font-bold text-xs block text-[#000000]">Schema Validation</span>
            <span className="text-[10px] text-[#555550] block">Zod / Joi validation</span>
          </div>
          <div className="hidden md:flex items-center text-[#888880]">→</div>
          <div className="flex-1 p-2.5 bg-[#FFFFFF] border border-[#C9C7C0] space-y-1">
            <span className="text-[9px] text-[#FF1E27] font-bold block uppercase">STAGE 4</span>
            <span className="font-bold text-xs block text-[#000000]">Controller</span>
            <span className="text-[10px] text-[#555550] block">Extracts params, calls Service</span>
          </div>
          <div className="hidden md:flex items-center text-[#888880]">→</div>
          <div className="flex-1 p-2.5 bg-[#FFFFFF] border border-[#C9C7C0] space-y-1">
            <span className="text-[9px] text-[#888880] font-bold block uppercase">STAGE 5</span>
            <span className="font-bold text-xs block text-[#000000]">Domain Service</span>
            <span className="text-[10px] text-[#555550] block">Business rules, DB query</span>
          </div>
          <div className="hidden md:flex items-center text-[#888880]">→</div>
          <div className="flex-1 p-2.5 bg-[#FFFFFF] border border-[#C9C7C0] space-y-1">
            <span className="text-[9px] text-[#FF1E27] font-bold block uppercase">STAGE 6</span>
            <span className="font-bold text-xs block text-[#000000]">Response Envelope</span>
            <span className="text-[10px] text-[#555550] block">JSON {`{ success, data }`}</span>
          </div>
        </div>
      </div>
    );
  }

  if (diagramType === 'fullstack-architecture') {
    return (
      <div className="bg-[#FAF9F5] border border-[#C9C7C0] p-4 sm:p-6 font-mono text-xs text-[#111111] space-y-4">
        <div className="flex items-center justify-between border-b border-[#C9C7C0] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF1E27]" />
            <span className="font-bold uppercase tracking-wider text-[#111111]">
              FULL-STACK APPLICATION ARCHITECTURE
            </span>
          </div>
          <span className="text-[10px] text-[#666660] uppercase">MERN / PERN Flow</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-[#FFFFFF] border border-[#C9C7C0] space-y-2">
            <span className="text-[10px] text-[#FF1E27] font-bold uppercase block">TIER 1 // CLIENT APPLICATION</span>
            <span className="font-bold text-xs text-[#000000] block">React 18/19 + TypeScript</span>
            <ul className="text-[11px] text-[#555550] space-y-1 list-disc list-inside">
              <li>Component tree & declarative UI</li>
              <li>TanStack Query cache management</li>
              <li>Client-side route guards (AuthContext)</li>
              <li>Direct S3 upload via presigned URLs</li>
            </ul>
          </div>

          <div className="p-3 bg-[#FFFFFF] border border-[#C9C7C0] space-y-2">
            <span className="text-[10px] text-[#888880] font-bold uppercase block">TIER 2 // API GATEWAY & LOGIC</span>
            <span className="font-bold text-xs text-[#000000] block">Node.js + Express.js</span>
            <ul className="text-[11px] text-[#555550] space-y-1 list-disc list-inside">
              <li>HTTP-only cookie session authentication</li>
              <li>Role-based authorization checks (RBAC)</li>
              <li>Zod schema payload validation</li>
              <li>Centralized error handling middleware</li>
            </ul>
          </div>

          <div className="p-3 bg-[#FFFFFF] border border-[#C9C7C0] space-y-2">
            <span className="text-[10px] text-[#FF1E27] font-bold uppercase block">TIER 3 // PERSISTENCE TIER</span>
            <span className="font-bold text-xs text-[#000000] block">MongoDB / PostgreSQL</span>
            <ul className="text-[11px] text-[#555550] space-y-1 list-disc list-inside">
              <li>Compound index query optimization</li>
              <li>ACID transaction support</li>
              <li>Aggregation pipelines & analytical views</li>
              <li>Automated daily snapshot backups</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Default: CI/CD Pipeline
  return (
    <div className="bg-[#FAF9F5] border border-[#C9C7C0] p-4 sm:p-6 font-mono text-xs text-[#111111] space-y-4">
      <div className="flex items-center justify-between border-b border-[#C9C7C0] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF1E27]" />
          <span className="font-bold uppercase tracking-wider text-[#111111]">
            AUTOMATED CI/CD PIPELINE // GITHUB ACTIONS
          </span>
        </div>
        <span className="text-[10px] text-[#666660] uppercase">Deployment Gate</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-center">
        {[
          { step: '01', name: 'Git Commit', tool: 'PR Opened' },
          { step: '02', name: 'Dependencies', tool: 'npm ci' },
          { step: '03', name: 'Static Analysis', tool: 'ESLint / Prettier' },
          { step: '04', name: 'Type Check', tool: 'tsc --noEmit' },
          { step: '05', name: 'Automated Tests', tool: 'Vitest / Supertest' },
          { step: '06', name: 'Docker Build', tool: 'Multi-stage image' },
          { step: '07', name: 'Deploy & Verify', tool: 'Health Check 200' },
        ].map((item, idx) => (
          <div key={item.step} className="p-2 bg-[#FFFFFF] border border-[#C9C7C0] space-y-1">
            <span className={`text-[9px] font-bold block ${idx === 6 ? 'text-[#FF1E27]' : 'text-[#888880]'}`}>
              {item.step}
            </span>
            <span className="font-bold text-[11px] block text-[#000000] truncate">{item.name}</span>
            <span className="text-[9px] text-[#666660] block truncate">{item.tool}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
