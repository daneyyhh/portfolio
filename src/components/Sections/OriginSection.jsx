import React, { useEffect, useRef } from "react";

/* Pure math helpers — outside component for stable references */
const mapRange = (val, inMin, inMax, outMin, outMax) =>
  outMin + (outMax - outMin) * Math.min(Math.max((val - inMin) / (inMax - inMin), 0), 1);

const lerp = (start, end, factor) =>
  start + (end - start) * factor;

export default function OriginSection() {
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const bgTextRef = useRef(null);
  const videoInnerAlignerRef = useRef(null);
  const quoteLine1Ref = useRef(null);
  const quoteLine2Ref = useRef(null);
  const quoteLine3Ref = useRef(null);
  const quoteContainerRef = useRef(null);
  const headingRef = useRef(null);
  const headingWhiteRef = useRef(null);
  const rafRef = useRef(null);
  const isVisibleRef = useRef(true);

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollableDistance = rect.height - windowHeight;
      // Clamp between 0 and 1
      const progress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);

      targetProgress.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const animate = () => {
      if (!isVisibleRef.current) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      // Smooth lerp - 0.12 for fast but fluid responsiveness
      currentProgress.current = lerp(currentProgress.current, targetProgress.current, 0.12);
      const p = currentProgress.current;

      if (videoWrapperRef.current && videoInnerAlignerRef.current) {
        // From left: 50% to left: 0% and width: 50% to width: 100%
        const currentLeft = 50 * (1 - p);
        const currentWidth = 50 + (50 * p);

        videoWrapperRef.current.style.left = `${currentLeft}%`;
        videoWrapperRef.current.style.width = `${currentWidth}%`;

        // Offset the inner aligner by the negative of currentLeft so its 0 matches the screen's 0
        videoInnerAlignerRef.current.style.transform = `translateX(-${currentLeft}vw)`;
      }

      if (headingRef.current && headingWhiteRef.current) {
        // Fade out initial heading quickly (first 10% of scroll)
        const headingProgress = Math.min(p / 0.1, 1);
        const opacity = (1 - headingProgress).toString();
        const transform = `translate(-50%, -50%) scale(${1 + headingProgress * 0.1})`;

        headingRef.current.style.opacity = opacity;
        headingRef.current.style.transform = transform;

        headingWhiteRef.current.style.opacity = opacity;
        headingWhiteRef.current.style.transform = transform;
      }

      // Parallax for decorative background watermark
      if (bgTextRef.current) {
        bgTextRef.current.style.transform = `translateY(-${p * 15}vh)`;
      }

      // Snappy staggered quote reveals with quartic easing
      if (quoteLine1Ref.current) {
        const q1Prog = mapRange(p, 0.15, 0.35, 0, 1);
        const ease1 = 1 - Math.pow(1 - q1Prog, 4);
        const scale1 = 1 + 1.5 * (1 - ease1);
        const blur1 = 15 * (1 - ease1);
        quoteLine1Ref.current.style.opacity = ease1.toString();
        quoteLine1Ref.current.style.transform = `scale(${scale1}) rotate(-2deg)`;
        quoteLine1Ref.current.style.filter = `blur(${blur1}px)`;
      }

      if (quoteLine2Ref.current) {
        const q2Prog = mapRange(p, 0.25, 0.45, 0, 1);
        const ease2 = 1 - Math.pow(1 - q2Prog, 4);
        const x2 = -80 * (1 - ease2);
        quoteLine2Ref.current.style.opacity = ease2.toString();
        quoteLine2Ref.current.style.transform = `translateX(${x2}vw) rotate(1.5deg)`;
      }

      if (quoteLine3Ref.current) {
        const q3Prog = mapRange(p, 0.35, 0.55, 0, 1);
        const ease3 = 1 - Math.pow(1 - q3Prog, 4);
        const rotX = 90 * (1 - ease3);
        quoteLine3Ref.current.style.opacity = ease3.toString();
        quoteLine3Ref.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotate(-1deg)`;
      }

      // Fade out quote container at the end to prioritize video
      if (quoteContainerRef.current) {
        const fadeOutProg = mapRange(p, 0.65, 0.85, 0, 1);
        const fadeOutEase = fadeOutProg * fadeOutProg * (3 - 2 * fadeOutProg);
        quoteContainerRef.current.style.opacity = (1 - fadeOutEase).toString();
        quoteContainerRef.current.style.transform = `scale(${1 + fadeOutEase * 0.05})`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* Optimization: Pause loop when off-screen */
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-spider-red halftone-overlay selection:bg-spider-yellow selection:text-spider-black font-mono"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* BACKGROUND DECORATIVE ELEMENTS */}
        <div className="absolute inset-y-0 left-0 w-1/2 pointer-events-none z-0 overflow-hidden">
          <div
            ref={bgTextRef}
            className="absolute top-[30%] -left-[5%] font-bangers text-[35vw] text-spider-black opacity-[0.02] leading-none"
          >
            ENG
          </div>
          <div className="absolute top-0 bottom-0 left-[6%] md:left-[8%] w-px bg-spider-black/10"></div>
          <div className="absolute top-[15%] left-[6%] md:left-[8%] -translate-x-1/2 flex flex-col items-center gap-6 mix-blend-overlay">
            <div className="w-1.5 h-1.5 rounded-full bg-spider-yellow opacity-60"></div>
            <div
              className="font-mono text-spider-black/40 text-[0.65rem] md:text-xs tracking-[0.5em] font-bold"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              SEC_01 // ARCHITECT
            </div>
            <div className="w-px h-16 bg-spider-black/20"></div>
          </div>
        </div>

        {/* STATIC BLACK TEXT */}
        <h2
          ref={headingRef}
          className="absolute top-1/2 left-1/2 w-full z-10 font-bangers leading-[0.85] text-spider-black text-center pointer-events-none px-4 drop-shadow-sm"
          style={{ transform: "translate(-50%, -50%)", fontSize: "clamp(1.75rem, 8vw, 6rem)" }}
        >
          RIGOROUS ENGINEERING MEETS<br />PREMIUM AESTHETICS
        </h2>

        {/* SLIDING VIDEO APERTURE */}
        <div
          ref={videoWrapperRef}
          className="absolute top-0 h-full overflow-hidden z-20"
          style={{ left: "50%", width: "50%" }}
        >
          <div className="relative w-full h-full bg-spider-black">
            <video
              src="https://res.cloudinary.com/dmq5tx0bd/video/upload/v1774669383/2nd-sec_3_qj5slf.mov"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.55] contrast-125"
            />
            <div className="halftone-overlay mix-blend-overlay z-10 pointer-events-none"></div>

            {/* ALIGNED OVERLAY FOR WHITE TEXT */}
            <div
              ref={videoInnerAlignerRef}
              className="absolute top-0 h-full w-screen z-20 pointer-events-none"
              style={{ transform: "translateX(-50vw)" }}
            >
              <h2
                ref={headingWhiteRef}
                className="absolute top-1/2 left-1/2 w-full font-bangers leading-[0.85] text-spider-white text-center px-4 drop-shadow-md"
                style={{ transform: "translate(-50%, -50%)", fontSize: "clamp(1.75rem, 8vw, 6rem)" }}
              >
                RIGOROUS ENGINEERING MEETS<br />PREMIUM AESTHETICS
              </h2>
            </div>

            {/* FLOATING QUOTES */}
            <div
              ref={quoteContainerRef}
              className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none p-3 sm:p-5"
            >
              <div className="mb-4">
                <span
                  ref={quoteLine1Ref}
                  className="inline-block font-bangers text-spider-white tracking-widest uppercase bg-spider-black border-l-[6px] border-spider-red opacity-0"
                  style={{ fontSize: "clamp(1rem, 4vw, 4.375rem)", padding: "clamp(0.25rem, 1vw, 0.5rem) clamp(0.75rem, 2.5vw, 1.5rem)" }}
                >
                  My name is Reuben
                </span>
              </div>
              <div className="mb-4">
                <span
                  ref={quoteLine2Ref}
                  className="inline-block font-bangers text-spider-black tracking-widest uppercase bg-spider-yellow opacity-0"
                  style={{ fontSize: "clamp(0.875rem, 3.5vw, 3.75rem)", padding: "clamp(0.25rem, 1vw, 0.5rem) clamp(0.75rem, 2.5vw, 1.5rem)", boxShadow: "clamp(3px, 0.5vw, 6px) clamp(3px, 0.5vw, 6px) 0px #E8272A" }}
                >
                  I am a creative full-stack engineer
                </span>
              </div>
              <div className="mt-4">
                <span
                  ref={quoteLine3Ref}
                  className="inline-block font-mono font-bold text-spider-white tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,1)] bg-spider-black/40 backdrop-blur-sm opacity-0"
                  style={{ fontSize: "clamp(0.75rem, 2.5vw, 2.25rem)", padding: "clamp(0.25rem, 0.8vw, 0.5rem) clamp(0.5rem, 1.5vw, 1rem)" }}
                >
                  Building systems that outclass the rest...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
