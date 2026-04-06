import React, { useEffect, useRef } from "react";

export default function TransitionCtaSection() {
  const containerRef = useRef(null);

  // Animation Refs
  const portalRef = useRef(null);
  const portalBgRef = useRef(null);
  const anomalyTextRef = useRef(null);
  const imageLayerRef = useRef(null);
  const hudRef = useRef(null);
  const subtitleRef = useRef(null);
  const mainTitleRef = useRef(null);
  const ctaLeftRef = useRef(null);
  const ctaRightRef = useRef(null);
  const crosshairRef = useRef(null);

  const rafRef = useRef(null);
  const isVisibleRef = useRef(true);
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const wh = window.innerHeight;
      const scrollable = Math.max(rect.height - wh, 1);
      targetScroll.current = Math.min(Math.max(-rect.top / scrollable, 0), 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
    const mapRange = (val, inMin, inMax, outMin, outMax) =>
      outMin + (outMax - outMin) * clamp((val - inMin) / (inMax - inMin), 0, 1);

    const easeOutBack = (x) => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    };

    const animate = () => {
      if (!isVisibleRef.current) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      currentScroll.current += (targetScroll.current - currentScroll.current) * 0.08;
      const p = currentScroll.current;

      // 0. Effects (Parallax + Glitch)
      if (imageLayerRef.current) {
        const scale = 1 + p * 0.15;
        let glitchX = 0;
        if (p > 0.08 && p < 0.12) {
          glitchX = Math.sin(p * 1000) * 10;
          imageLayerRef.current.style.filter = "contrast(150%) saturate(150%) hue-rotate(90deg)";
        } else {
          imageLayerRef.current.style.filter = "none";
        }
        imageLayerRef.current.style.transform = `scale(${scale}) translateX(${glitchX}px)`;
      }

      // HUD / Warning Text
      if (hudRef.current) {
        const op = p > 0.01 && p < 0.20 ? (Math.sin(p * 300) > 0 ? 0.8 : 0.4) : 0;
        hudRef.current.style.opacity = op.toString();
        hudRef.current.style.transform = `scale(${1 - p * 0.5})`;
      }
      if (anomalyTextRef.current) {
        const blink = Math.sin(p * 200) > 0 ? 1 : 0.2;
        anomalyTextRef.current.style.opacity = (p > 0.01 && p < 0.2 ? blink : 0).toString();
      }

      // 2. Multiverse Rift
      if (portalRef.current && portalBgRef.current) {
        const scale = mapRange(p, 0.1, 0.35, 0, 300);
        portalRef.current.style.transform = `scale(${scale}) rotate(${p * 720}deg)`;
        portalBgRef.current.style.opacity = p >= 0.35 ? "1" : "0";
      }

      // 3. Reveal Content
      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = mapRange(p, 0.35, 0.45, 0, 1).toString();
        subtitleRef.current.style.transform = `translateY(${mapRange(p, 0.35, 0.45, -30, 0)}px)`;
      }

      if (mainTitleRef.current) {
        const progress = clamp(mapRange(p, 0.45, 0.60, 0, 1), 0, 1);
        const ease = progress > 0 ? easeOutBack(progress) : 0;
        mainTitleRef.current.style.opacity = progress.toString();
        mainTitleRef.current.style.transform = `scale(${1 + (1 - ease) * 1.5}) rotate(${ease * -2 + 2}deg)`;
      }

      if (ctaLeftRef.current && ctaRightRef.current) {
        const progress = clamp(mapRange(p, 0.60, 0.75, 0, 1), 0, 1);
        const ease = progress > 0 ? easeOutBack(progress) : 0;

        ctaLeftRef.current.style.opacity = progress.toString();
        ctaLeftRef.current.style.transform = `translateX(${-30 * (1 - ease)}vw) rotate(-2deg)`;
        ctaLeftRef.current.style.pointerEvents = progress > 0.5 ? "auto" : "none";

        ctaRightRef.current.style.opacity = progress.toString();
        ctaRightRef.current.style.transform = `translateX(${30 * (1 - ease)}vw) rotate(3deg)`;
        ctaRightRef.current.style.pointerEvents = progress > 0.5 ? "auto" : "none";
      }

      if (crosshairRef.current) {
        crosshairRef.current.style.opacity = mapRange(p, 0.75, 0.85, 0, 1).toString();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(([entry]) => { isVisibleRef.current = entry.isIntersecting; }, { threshold: 0 });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} style={{ height: "400vh" }} className="relative w-full bg-spider-black selection:bg-spider-yellow selection:text-spider-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-spider-black">

        {/* IMAGE LAYER */}
        <div ref={imageLayerRef} className="absolute inset-0 z-0 will-change-transform origin-center">
          <img src="https://res.cloudinary.com/dmq5tx0bd/image/upload/v1775411913/cta_lxlxpu.jpg" alt="Final CTA" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-spider-red/10 mix-blend-color-burn"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-spider-black/90 via-spider-black/20 to-transparent"></div>
          <div className="absolute inset-0 halftone-overlay opacity-30 mix-blend-overlay"></div>
        </div>

        {/* HUD UI */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center md:pt-[15vh] max-md:hidden">
          <div ref={hudRef} className="relative w-[350px] h-[350px] border border-spider-white/10 opacity-0 flex flex-col justify-between p-2 will-change-transform">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-spider-yellow shadow-[0_0_10px_#FFD600]"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-spider-yellow shadow-[0_0_10px_#FFD600]"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-spider-yellow shadow-[0_0_10px_#FFD600]"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-spider-yellow shadow-[0_0_10px_#FFD600]"></div>
            <div className="text-spider-yellow font-mono text-[10px] tracking-[0.4em] font-bold">SCANNING ID...</div>
            <div className="text-spider-yellow font-mono text-[10px] tracking-[0.4em] font-bold text-right pb-1">MATCH FOUND: <span className="text-spider-white">YOU</span></div>
          </div>
        </div>

        <div ref={anomalyTextRef} className="absolute top-1/2 md:top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full text-center flex flex-col items-center gap-3 opacity-0 text-balance px-4">
          <div className="font-mono font-bold text-spider-yellow tracking-[0.5em] text-[10px] px-4 py-2 bg-spider-black/60 backdrop-blur-sm border-l-2 border-r-2 border-spider-yellow/50">
            [ TRANSFERRING CREATIVE CONTROL... ]
          </div>
          <div className="font-bangers tracking-wider text-5xl md:text-8xl text-spider-white drop-shadow-[4px_4px_0_#E8272A] mt-1 leading-[0.9]">
            THE STORY HANDS <span className="text-spider-yellow">IT TO YOU</span>
          </div>
        </div>

        {/* MULTIVERSE RIFT */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div
            ref={portalRef}
            className="w-10 h-10 bg-spider-black origin-center will-change-transform"
            style={{ clipPath: "polygon(40% 0%, 55% 15%, 80% 10%, 70% 30%, 100% 45%, 85% 60%, 95% 85%, 65% 75%, 50% 100%, 35% 85%, 10% 95%, 25% 65%, 0% 50%, 20% 35%, 10% 15%, 30% 20%)", transform: "scale(0)" }}
          />
        </div>
        <div ref={portalBgRef} className="absolute inset-0 bg-spider-black z-30 opacity-0 pointer-events-none transition-opacity duration-300"></div>

        {/* REVEALED CONTENT */}
        <div className="absolute inset-0 z-40 pointer-events-none flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 halftone-overlay opacity-20 mix-blend-overlay"></div>
          <div ref={subtitleRef} className="font-mono text-spider-yellow font-bold tracking-widest text-xs md:text-lg opacity-0 mb-6 text-center px-4 max-w-3xl leading-relaxed">
            And in this portfolio, you don&apos;t need a radioactive spider bite to build something this cool.
          </div>
          <div ref={mainTitleRef} className="font-bangers leading-[1.1] text-spider-white text-center opacity-0 drop-shadow-[5px_5px_0px_#E8272A] mb-12 px-4" style={{ fontSize: "clamp(1.75rem, 9vw, 7.5rem)" }}>
            LET&apos;S BUILD <br /> <span className="text-spider-yellow drop-shadow-[4px_4px_0px_#F5F0E8] mt-2 inline-block">SOMETHING EPIC</span>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center w-full px-6 md:px-0">
             <a ref={ctaLeftRef} href="#contact" className="group relative inline-block text-spider-black p-2 opacity-0 w-full md:w-auto min-w-[320px] max-w-sm">
               <div className="absolute inset-0 border-4 border-spider-black translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform bg-spider-yellow -z-10"></div>
               <div className="relative border-4 border-spider-black bg-spider-white px-8 py-8 flex flex-col items-center gap-2 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform">
                 <span className="font-bangers text-4xl uppercase tracking-widest">START A PROJECT</span>
                 <span className="font-mono text-xs font-bold tracking-[0.2em] text-spider-black/50 mt-1">BOOK A DISCOVERY CALL //</span>
               </div>
             </a>
             <a ref={ctaRightRef} href="#projects" className="group relative inline-block text-spider-white p-2 opacity-0 w-full md:w-auto min-w-[320px] max-w-sm">
               <div className="absolute inset-0 border-4 border-spider-yellow translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform bg-spider-red -z-10"></div>
               <div className="relative border-4 border-spider-white bg-spider-black px-8 py-8 flex flex-col items-center gap-2 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform">
                 <span className="font-bangers text-4xl uppercase tracking-widest text-spider-yellow drop-shadow-[2px_2px_0_#E8272A]">VIEW PORTFOLIO</span>
                 <span className="font-mono text-xs font-bold tracking-[0.2em] text-spider-white/60 mt-1">SEE MORE WORK //</span>
               </div>
             </a>
          </div>

          <div ref={crosshairRef} className="absolute bottom-12 left-0 w-full flex flex-col md:flex-row justify-between items-center px-16 opacity-0 font-mono text-[10px] text-spider-white/40 tracking-[0.3em] pointer-events-none gap-6 md:gap-0">
            <div className="flex flex-col items-start gap-2 text-center md:text-left">
              <span className="w-12 h-[2px] bg-spider-yellow blur-[1px]"></span>
              <span className="text-spider-white/30 text-[8px] tracking-widest uppercase">PORTFOLIO PROJECT</span>
            </div>
            <div className="flex gap-8 pointer-events-auto">
              <a href="#" className="hover:text-spider-yellow transition-all underline underline-offset-4">X / TWITTER</a>
              <a href="#" className="hover:text-spider-yellow transition-all underline underline-offset-4">LINKEDIN</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
