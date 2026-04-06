import React, { useCallback, useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────
   Spider icon — used as the hamburger trigger (< sm breakpoint).
   A clean geometric spider with 8 legs, matches the FaceOffSection logo DNA.
───────────────────────────────────────────────────────────────────── */
const SpiderMenuIcon = ({ open }) => (
  <div className="relative w-6 h-6 flex items-center justify-center">
    {/* When closed — draw the spider */}
    <svg
      viewBox="0 0 24 24"
      className={`absolute inset-0 w-full h-full transition-all duration-300 ease-in-out ${open ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
        }`}
      fill="none"
    >
      {/* Body */}
      <ellipse cx="12" cy="12" rx="2.5" ry="3.5" fill="currentColor" />
      {/* Head */}
      <circle cx="12" cy="7.5" r="1.8" fill="currentColor" />
      {/* Legs — 4 pairs */}
      <line x1="9.5" y1="10" x2="3" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
      <line x1="9.5" y1="12" x2="2" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
      <line x1="9.5" y1="14" x2="3" y2="17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
      <line x1="10" y1="15.5" x2="5" y2="21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
      <line x1="14.5" y1="10" x2="21" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
      <line x1="14.5" y1="12" x2="22" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
      <line x1="14.5" y1="14" x2="21" y2="17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
      <line x1="14" y1="15.5" x2="19" y2="21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
    </svg>

    {/* When open — angular X (comic-panel style) */}
    <svg
      viewBox="0 0 24 24"
      className={`absolute inset-0 w-full h-full transition-all duration-300 ease-in-out ${open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
        }`}
      fill="none"
    >
      <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
      <line x1="20" y1="4" x2="4" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
    </svg>
  </div>
);

/* ─────────────────────────────────────────────────────────────────
   Faint radial web SVG — decorative background inside mobile menu.
   Stays subtle (opacity ~0.06) so text stays legible.
───────────────────────────────────────────────────────────────────── */
const WEB_SPOKES = [
  { x2: 400, y2: 200 }, // 0°
  { x2: 373.2, y2: 300 }, // 30°
  { x2: 300, y2: 373.2 }, // 60°
  { x2: 200, y2: 400 }, // 90°
  { x2: 100, y2: 373.2 }, // 120°
  { x2: 26.8, y2: 300 }, // 150°
  { x2: 0, y2: 200 }, // 180°
  { x2: 26.8, y2: 100 }, // 210°
  { x2: 100, y2: 26.8 }, // 240°
  { x2: 200, y2: 0 }, // 270°
  { x2: 300, y2: 26.8 }, // 300°
  { x2: 373.2, y2: 100 }, // 330°
];

const WebWatermark = () => (
  <svg
    viewBox="0 0 400 400"
    className="absolute -bottom-8 -right-8 w-56 h-56 pointer-events-none select-none"
    style={{ opacity: 0.06 }}
  >
    {/* Rings */}
    <circle cx="200" cy="200" r="40" fill="none" stroke="#0A0A0A" strokeWidth="1" />
    <circle cx="200" cy="200" r="80" fill="none" stroke="#0A0A0A" strokeWidth="1" />
    <circle cx="200" cy="200" r="120" fill="none" stroke="#0A0A0A" strokeWidth="1" />
    <circle cx="200" cy="200" r="160" fill="none" stroke="#0A0A0A" strokeWidth="1" />
    <circle cx="200" cy="200" r="200" fill="none" stroke="#0A0A0A" strokeWidth="1" />
    {/* Spokes */}
    {WEB_SPOKES.map(({ x2, y2 }, i) => (
      <line key={i} x1="200" y1="200" x2={x2} y2={y2} stroke="#0A0A0A" strokeWidth="0.8" />
    ))}
  </svg>
);

/* ─────────────────────────────────────────────────────────────────
   Thin silk thread corner accents — top-left & bottom-right only,
   matching the angular comic aesthetic without being overdone.
───────────────────────────────────────────────────────────────────── */
const WebCorner = ({ position }) => {
  const isTopLeft = position === "tl";
  return (
    <svg
      viewBox="0 0 40 40"
      className={`absolute w-8 h-8 pointer-events-none ${isTopLeft ? "top-0 left-0" : "bottom-0 right-0 rotate-180"
        }`}
      style={{ opacity: 0.25 }}
    >
      <line x1="0" y1="0" x2="40" y2="0" stroke="#FFD600" strokeWidth="1.5" />
      <line x1="0" y1="0" x2="0" y2="40" stroke="#FFD600" strokeWidth="1.5" />
      <line x1="0" y1="0" x2="22" y2="22" stroke="#FFD600" strokeWidth="0.8" />
    </svg>
  );
};

/* Pure math helper — stable reference outside component to avoid re-renders */
const lerp = (start, end, factor) => start + (end - start) * factor;

export default function HeroReveal() {
  const containerRef = useRef(null);
  const topImageRef = useRef(null);
  const bottomImageRef = useRef(null);
  const rafRef = useRef(null);

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 640) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isVisibleRef = useRef(true);

  const animate = useCallback(() => {
    if (!isVisibleRef.current) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }
    if (topImageRef.current && bottomImageRef.current) {
      currentProgress.current = lerp(currentProgress.current, targetProgress.current, 0.06);
      const p = currentProgress.current;

      const blurAmount = 15;
      const startPos = -blurAmount;
      const endPos = 100 + blurAmount;
      const currentPos = startPos + (endPos - startPos) * p;

      const bottomEdge = currentPos - blurAmount;
      const topEdge = currentPos + blurAmount;

      const maskStrTop = `linear-gradient(to top, transparent ${bottomEdge}%, black ${topEdge}%)`;
      const maskStrBottom = `linear-gradient(to top, black ${bottomEdge}%, transparent ${topEdge}%)`;

      topImageRef.current.style.maskImage = maskStrTop;
      topImageRef.current.style.webkitMaskImage = maskStrTop;
      bottomImageRef.current.style.maskImage = maskStrBottom;
      bottomImageRef.current.style.webkitMaskImage = maskStrBottom;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [animate]);

  const desktopNavLink = "hover:text-spider-white transition-colors whitespace-nowrap";

  return (
    <section
      ref={containerRef}
      className="relative w-full h-dvh bg-spider-red halftone-overlay selection:bg-spider-yellow selection:text-spider-black font-mono text-spider-black overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full">

        {/* ─── WATERMARK ──────────────────────────────────────────────────── */}
        <div className="absolute top-[6%] sm:top-[8%] left-0 w-full text-center pointer-events-none z-0 px-2 select-none overflow-hidden">
          <h1
            style={{ fontSize: "clamp(3.5rem, 18vw, 16rem)" }}
            className={`font-bangers leading-none text-spider-black drop-shadow-sm transition-all duration-1500 ease-out ${isLoaded ? "opacity-10 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              }`}
          >
            REUBEN
          </h1>
        </div>

        {/* ─── BOTTOM IMAGE: masked ───────────────────────────── */}
        <div
          ref={bottomImageRef}
          className="absolute inset-0 w-full h-full z-10 pointer-events-none top-7"
          style={{ maskImage: "linear-gradient(to top, black -30%, transparent 0%)", WebkitMaskImage: "linear-gradient(to top, black -30%, transparent 0%)" }}
        >
          <div
            className="-translate-x-[51.3%] min-[540px]:-translate-x-[51%]"
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              height: "100%",
              width: "min(88vmax, 780px)",
            }}
          >
            <img 
              src="https://res.cloudinary.com/dmq5tx0bd/image/upload/v1775411911/a-m_oqjmir.png" 
              alt="Masked Portrait" 
              className={`absolute inset-0 w-full h-full object-contain object-bottom transition-opacity duration-1000 ease-in-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
              style={{ imageRendering: "-webkit-optimize-contrast", transform: "translateZ(0)" }}
            />
          </div>
        </div>

        {/* ─── TOP IMAGE: unmasked ──────────────────────────────────── */}
        <div
          ref={topImageRef}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
          style={{ maskImage: "linear-gradient(to top, transparent -30%, black 0%)", WebkitMaskImage: "linear-gradient(to top, transparent -30%, black 0%)" }}
        >
          <div
            className="-translate-x-[51.3%] min-[540px]:-translate-x-[51%]"
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              height: "100%",
              width: "min(88vmax, 780px)",
            }}
          >
             <img 
               src="https://res.cloudinary.com/dmq5tx0bd/image/upload/v1775411912/a-um_bajkuq.png" 
               alt="Unmasked Portrait" 
               className={`absolute inset-0 w-full h-full object-contain object-bottom transition-opacity duration-1000 ease-in-out delay-200 ${isLoaded ? "opacity-100" : "opacity-0"}`}
               style={{ imageRendering: "-webkit-optimize-contrast", transform: "translateZ(0)" }}
             />
          </div>
        </div>

        {/* ─── HOVER HITBOX ───────────────────────────────────────────────── */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] sm:w-[50%] md:w-[42%] lg:w-[36%] max-w-[480px] h-[82%] z-25"
          onMouseEnter={() => { targetProgress.current = 1; }}
          onMouseLeave={() => { targetProgress.current = 0; }}
          onTouchStart={() => { targetProgress.current = 1; }}
          onTouchEnd={() => { targetProgress.current = 0; }}
        />

        {/* ═══════════════════════════════════════════════════════════════════
            UI OVERLAY — header + bottom card
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between"
          style={{ padding: "clamp(1rem, 4vw, 3.5rem)" }}
        >

          {/* ── HEADER ──────────────────────────────────────────────────── */}
          <header
            className={`flex justify-between items-start w-full pointer-events-auto transition-all duration-1000 ease-out delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
          >
            {/* Logo */}
            <div className="flex flex-col gap-1 shrink-0">
              <span
                className="font-bold text-spider-black tracking-tight select-none"
                style={{ fontSize: "clamp(0.75rem, 2.5vw, 1.125rem)" }}
              >
                RB-N / ENG
              </span>
              <div className="h-0.5 w-6 sm:w-8 bg-spider-yellow" />
            </div>

            {/* ── DESKTOP NAV (sm and above) ─────────────────────────── */}
            <nav
              className="hidden sm:flex items-center font-bold uppercase text-spider-black"
              style={{ gap: "clamp(1rem, 4vw, 3rem)", fontSize: "clamp(0.6rem, 1.4vw, 0.75rem)", letterSpacing: "0.2em" }}
            >
              <a href="#about" className={desktopNavLink}>Manifesto</a>
              <a href="#projects" className={`${desktopNavLink} relative group`}>
                Deployments
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-spider-yellow transition-all group-hover:w-full" />
              </a>
              <a href="#contact" className={desktopNavLink}>Systems</a>
            </nav>

            {/* ── MOBILE HAMBURGER BUTTON (below sm) ─────────────────── */}
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden text-spider-black p-1 -mr-1 pointer-events-auto focus:outline-none"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <SpiderMenuIcon open={menuOpen} />
            </button>
          </header>

          {/* ── BOTTOM INFO CARD ────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row justify-between items-end gap-3 sm:gap-4 w-full">
            <div
              className={`pointer-events-auto w-full sm:w-auto sm:max-w-[280px] border-[0.5px] border-spider-black/40 bg-spider-red/30 backdrop-blur-sm shadow-sm transition-all duration-1000 ease-out delay-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              style={{ padding: "clamp(0.75rem, 2.5vw, 1.25rem)" }}
            >
              <div className="flex justify-between items-center mb-2 sm:mb-3">
                <span className="tracking-widest uppercase font-bold text-spider-white" style={{ fontSize: "clamp(0.55rem, 1.4vw, 0.625rem)" }}>
                  Target Locked
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-spider-yellow animate-pulse shrink-0" />
              </div>
              <p className="uppercase leading-relaxed tracking-wide text-spider-black" style={{ fontSize: "clamp(0.6rem, 1.5vw, 0.75rem)" }}>
                Subject exhibits advanced full-stack capabilities.
                High-performance architectures detected.
              </p>
              <div className="mt-3 pt-2 sm:pt-3 border-t border-spider-black/30 flex justify-between items-center tracking-widest uppercase text-spider-white" style={{ fontSize: "clamp(0.5rem, 1.2vw, 0.5625rem)" }}>
                <span>Threat: Extreme</span>
                <span className="font-bold text-spider-black bg-spider-yellow px-1 py-0.5 shrink-0" style={{ fontSize: "clamp(0.5rem, 1.2vw, 0.5625rem)" }}>
                  NODE-REACT
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            MOBILE MENU PANEL
        ═══════════════════════════════════════════════════════════════════ */}
        {menuOpen && (
          <div
            className="sm:hidden absolute inset-0 z-39 pointer-events-auto"
            onClick={() => setMenuOpen(false)}
          />
        )}

        <div
          className={`sm:hidden absolute top-0 left-0 w-full z-40 pointer-events-auto transition-[transform,opacity] duration-500 ${menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
            }`}
          style={{ transitionTimingFunction: menuOpen ? "cubic-bezier(0.16,1,0.3,1)" : "cubic-bezier(0.7,0,0.84,0)" }}
        >
          <div
            className="relative w-full bg-spider-black/92 backdrop-blur-md border-b-2 border-spider-yellow/60 overflow-hidden"
            style={{
              paddingTop: "1.75rem",
              paddingBottom: "clamp(1.75rem, 6vw, 2.5rem)",
              paddingLeft: "clamp(1.25rem, 6vw, 2rem)",
              paddingRight: "clamp(1.25rem, 6vw, 2rem)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#F5F0E8 1px, transparent 1px)",
                backgroundSize: "6px 6px",
                opacity: 0.04,
              }}
            />
            <WebWatermark />
            <WebCorner position="tl" />
            <WebCorner position="br" />
            <div className="absolute top-0 left-0 w-[3px] h-full bg-spider-red opacity-70" />

            <nav className="relative flex flex-col gap-0 z-10">
              {[
                { label: "MANIFESTO", delay: "delay-[60ms]" },
                { label: "DEPLOYMENTS", delay: "delay-[120ms]" },
                { label: "SYSTEMS", delay: "delay-[180ms]" },
              ].map(({ label, delay }) => (
                <a
                  key={label}
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className={`group flex items-center justify-between py-4 border-b border-spider-white/8 transition-all duration-300 ease-out ${delay} ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    }`}
                >
                  <span className="font-bangers text-4xl tracking-widest text-spider-white group-hover:text-spider-yellow transition-colors duration-200 leading-none">
                    {label}
                  </span>
                  <span className="font-mono text-[0.6rem] tracking-[0.3em] text-spider-white/30 group-hover:text-spider-yellow/70 transition-colors duration-200 uppercase">
                    &#47;&#47;&nbsp;GO
                  </span>
                </a>
              ))}
            </nav>

            <div
              className={`relative z-10 mt-5 flex justify-between items-center transition-all duration-300 delay-240 pb-3 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
            >
              <span className="font-mono text-[0.55rem] tracking-[0.25em] uppercase text-spider-white/25">
                ENGINEERING STATUS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-spider-yellow animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
