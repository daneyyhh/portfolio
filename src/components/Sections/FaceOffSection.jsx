import React, { useEffect, useRef, useState } from "react";

const SpiderLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className="w-[0.8em] h-[0.8em] -translate-y-[0.1em] opacity-80"
  >
    <path fill="currentColor" d="M50 15 L58 35 L50 85 L42 35 Z" />
    <path fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter" d="M45 35 L20 15 L15 35 M55 35 L80 15 L85 35" />
    <path fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter" d="M45 42 L10 40 L5 60 M55 42 L90 40 L95 60" />
    <path fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter" d="M46 50 L15 75 L20 95 M54 50 L85 75 L80 95" />
    <path fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter" d="M47 65 L40 95 M53 65 L60 95" />
  </svg>
);

export default function FaceOffSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-spider-red halftone-overlay selection:bg-spider-yellow selection:text-spider-black font-mono overflow-hidden py-12 md:py-24 flex items-center justify-center"
    >
      {/* HUD SEPARATOR */}
      <div className="absolute top-0 left-0 w-full h-16 pointer-events-none z-50 flex flex-col items-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-spider-yellow/40 to-transparent shadow-[0_0_12px_rgba(255,214,0,0.3)]" />
      </div>

      {/* BACKGROUND DECORATIVE VS */}
      <div
        className={`absolute inset-0 pointer-events-none flex items-center justify-center font-bangers text-[60vh] text-spider-white leading-none overflow-hidden select-none z-0 transition-opacity duration-1000 ease-out ${isVisible ? "opacity-[0.05]" : "opacity-0"}`}
      >
        VS
      </div>

      {/* INFINITE MARQUEE */}
      <div className="absolute bottom-8 md:bottom-16 left-0 w-full overflow-hidden pointer-events-none z-5 opacity-[0.15]">
        <div className="flex w-max" style={{ animation: "shadowMarquee 40s linear infinite" }}>
          {Array(4).fill(null).map((_, i) => (
            <div key={i} className="flex items-center font-bangers text-3xl md:text-5xl lg:text-[4vw] text-spider-black tracking-widest leading-none whitespace-nowrap">
              <span className="px-4 md:px-6">ELEGANCE UNDER THE HOOD</span>
              <SpiderLogo />
              <span className="px-4 md:px-6">PREMIUM UI EXPERIENCE</span>
              <SpiderLogo />
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP character portraits */}
      <div className="absolute left-0 bottom-0 w-[45vw] lg:w-[40vw] xl:w-[35vw] h-[85vh] lg:h-[95vh] z-10 hidden md:block pointer-events-none overflow-hidden">
        <img
          src="https://res.cloudinary.com/dmq5tx0bd/image/upload/v1775411924/w-mask-fo_ohic1z.png"
          alt="Masked Portrait"
          loading="lazy"
          className={`w-full h-full object-cover object-bottom drop-shadow-[20px_0_35px_rgba(0,0,0,0.3)] transition-all duration-1000 ease-out delay-100 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"}`}
        />
      </div>
      <div className="absolute right-0 bottom-0 w-[45vw] lg:w-[40vw] xl:w-[35vw] h-[85vh] lg:h-[95vh] z-10 hidden md:block pointer-events-none overflow-hidden">
        <img
          src="https://res.cloudinary.com/dmq5tx0bd/image/upload/v1775411927/wo-mask-fo_kunnrk.png"
          alt="Unmasked Portrait"
          loading="lazy"
          className={`w-full h-full object-cover object-bottom drop-shadow-[-20px_0_35px_rgba(0,0,0,0.3)] transition-all duration-1000 ease-out delay-100 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"}`}
        />
      </div>

      {/* CENTER CONTENT */}
      <div
        className="relative z-20 w-full mx-auto grid grid-cols-1 md:grid-cols-2 items-center mt-4 md:mt-0"
        style={{ maxWidth: "85rem", paddingLeft: "5vw", paddingRight: "5vw", gap: "clamp(1rem, 6vh, 8rem)" }}
      >
        <div className={`flex flex-col items-center md:items-end text-center md:text-right h-full transition-all duration-1000 ease-out delay-300 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}>
          <div className="space-y-4 md:space-y-8 flex-1 flex flex-col items-center md:items-end">
             <div className="space-y-[-5px] md:space-y-[-10px]">
               <h2 className="font-bangers tracking-wider text-spider-white leading-none whitespace-nowrap" style={{ fontSize: "clamp(2.5rem, 11vw, 5rem)" }}>THE DEV</h2>
               <h3 className="font-bangers tracking-wide text-spider-black leading-none opacity-80 whitespace-nowrap" style={{ fontSize: "clamp(1.8rem, 7vw, 3.5rem)" }}>FULL STACK</h3>
             </div>
             <div className="flex flex-col items-center md:items-end space-y-2 md:space-y-3 font-mono tracking-widest uppercase text-spider-black" style={{ fontSize: "clamp(0.85rem, 2vw, 1.1rem)" }}>
               <span className="font-bold">Node.js Architecture</span>
               <span className="font-bold">React &amp; Next.js</span>
               <span className="font-bold">Three.js / GLSL</span>
               <div className="mt-4 md:mt-6 pt-4 border-t border-spider-black/20 w-48 flex justify-center md:justify-end">
                 <span className="text-xs text-spider-black/50 tracking-[0.2em] font-bold">EXPERTISE / ELITE</span>
               </div>
             </div>
          </div>
        </div>

        <div className={`flex flex-col items-center md:items-start text-center md:text-left h-full transition-all duration-1000 ease-out delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}>
          <div className="space-y-4 md:space-y-8 flex-1 flex flex-col items-center md:items-start">
             <div className="space-y-[-5px] md:space-y-[-10px]">
               <h2 className="font-bangers tracking-wider text-spider-white leading-none whitespace-nowrap" style={{ fontSize: "clamp(2.5rem, 11vw, 5rem)" }}>THE CREATOR</h2>
               <h3 className="font-bangers tracking-wide text-spider-black leading-none opacity-80 whitespace-nowrap" style={{ fontSize: "clamp(1.8rem, 7vw, 3.5rem)" }}>REUBEN</h3>
             </div>
             <div className="flex flex-col items-center md:items-start space-y-2 md:space-y-3 font-mono tracking-widest uppercase text-spider-black" style={{ fontSize: "clamp(0.85rem, 2vw, 1.1rem)" }}>
               <span className="font-bold">Cyberspace</span>
               <span className="font-bold">System Architect</span>
               <span className="text-spider-yellow font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Engineer. Designer. Creator.</span>
               <div className="mt-4 md:mt-6 pt-4 border-t border-spider-black/20 w-48 flex justify-center md:justify-start">
                 <span className="text-xs text-spider-black/50 tracking-[0.2em] font-bold">STATUS / AVAILABLE</span>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* MOBILE ONLY IMAGES */}
      <div className="md:hidden flex w-full h-[40vh] mt-12 z-10 bottom-0 absolute overflow-hidden pointer-events-none">
        <img src="https://res.cloudinary.com/dmq5tx0bd/image/upload/v1775411924/w-mask-fo_ohic1z.png" alt="Masked Portrait" className={`w-1/2 h-full object-cover object-bottom drop-shadow-[5px_0_15px_rgba(0,0,0,0.3)] transition-all duration-1000 ease-out delay-100 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`} />
        <img src="https://res.cloudinary.com/dmq5tx0bd/image/upload/v1775411927/wo-mask-fo_kunnrk.png" alt="Unmasked Portrait" className={`w-1/2 h-full object-cover object-bottom drop-shadow-[-5px_0_15px_rgba(0,0,0,0.3)] transition-all duration-1000 ease-out delay-100 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`} />
      </div>
    </section>
  );
}
