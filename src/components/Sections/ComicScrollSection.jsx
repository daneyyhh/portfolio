import React, { useEffect, useRef, useState } from "react";

const BEATS = [
  {
    heading: "THE CREATIVE\nENGINEER",
    story: "Reuben. Crafting ultra-modern, high-performance web applications. Fusing rigorous engineering with premium aesthetics.",
    img: "https://res.cloudinary.com/dmq5tx0bd/image/upload/v1775411919/comic-1_h0rfk3.jpg",
    rotate: -3,
    x: 0, y: 0,
  },
  {
    heading: "IMMERSIVE\nEXPERIENCES",
    story: "Building immersive 3D experiences with Three.js, React, Next.js, and GLSL. Ensuring elegance on the surface.",
    img: "https://res.cloudinary.com/dmq5tx0bd/image/upload/v1775411911/comic-2_kltqdg.jpg",
    rotate: 4,
    x: 40, y: 85,
  },
  {
    heading: "SYSTEM\nARCHITECTURE",
    story: "Scalable infrastructure and robust backend systems with Node.js. Elegance under the hood matters just as much.",
    img: "https://res.cloudinary.com/dmq5tx0bd/image/upload/v1775411919/comic-3_dup0pj.jpg",
    rotate: -2,
    x: -25, y: 170,
  },
  {
    heading: "BUILDING THE\nFUTURE",
    story: "Crafting software that simply outclasses the rest. From complex React state to orchestrating microservices.",
    img: "https://res.cloudinary.com/dmq5tx0bd/image/upload/v1775411915/comic-4_tet35f.jpg",
    rotate: 5,
    x: 35, y: 255,
  },
  {
    heading: "AVAILABLE\nFOR WORK",
    story: "Let's build the future of interfaces together. Leave a lasting impression across the web.",
    img: "https://res.cloudinary.com/dmq5tx0bd/image/upload/v1775411915/comic_rfymqj.jpg",
    rotate: -1,
    x: 0, y: 340,
  },
];

const BG_TEXTS = ["ENGINEER.", "REACT.", "NODE.JS.", "THREE.JS.", "AVAILABLE."];

export default function ComicScrollSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  const [activeBeat, setActiveBeat] = useState(0);
  const latestBeat = useRef(0);

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const wh = window.innerHeight;
      const scrollable = Math.max(rect.height - wh, 1);
      targetProgress.current = Math.min(Math.max(-rect.top / scrollable, 0), 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const animate = () => {
      currentProgress.current = lerp(currentProgress.current, targetProgress.current, 0.1);
      const p = currentProgress.current;

      const float = p * (BEATS.length - 1);
      const idx = Math.min(Math.floor(float), BEATS.length - 2);
      const next = idx + 1;
      const t = easeInOutCubic(float - idx);

      const currentClosestBeat = Math.round(float);
      if (currentClosestBeat !== latestBeat.current) {
        latestBeat.current = currentClosestBeat;
        setActiveBeat(currentClosestBeat);
      }

      const camX = lerp(BEATS[idx].x, BEATS[next].x, t);
      const camY = lerp(BEATS[idx].y, BEATS[next].y, t);

      if (canvasRef.current) {
        canvasRef.current.style.transform = `translate(${-camX}vw, ${-camY}vh)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{ height: "600vh" }}
      className="relative bg-spider-red halftone-overlay selection:bg-spider-yellow selection:text-spider-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Cinematic Background Story Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
          {BG_TEXTS.map((text, i) => (
            <h2
              key={i}
              className={`absolute font-bangers text-[24vw] leading-none text-spider-black select-none whitespace-nowrap transition-all duration-1000 ease-out ${i === activeBeat ? 'opacity-[0.08] scale-100 blur-0' : 'opacity-0 scale-[0.8] blur-md'
                }`}
            >
              {text}
            </h2>
          ))}
        </div>

        {/* HUD UI Elements */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 z-100 flex flex-col items-end gap-3 pointer-events-none">
          <div className="flex flex-col items-end mb-1 text-right">
            <h4 className="font-bangers text-2xl md:text-3xl text-spider-white tracking-widest drop-shadow-md leading-none mb-1">
              THE PORTFOLIO FILES
            </h4>
            <p className="font-mono text-[9px] md:text-[10px] text-spider-yellow uppercase font-bold tracking-[0.3em] drop-shadow-sm">
              HOW OUTCLASS SYSTEMS ARE BUILT
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="font-mono text-[12px] text-spider-white font-bold tracking-widest drop-shadow-md">
              {String(activeBeat + 1).padStart(2, '0')} / {String(BEATS.length).padStart(2, '0')}
            </div>
            <div className="flex items-center gap-1.5 drop-shadow-sm">
              {BEATS.map((_, i) => (
                <div key={i} className={`h-[3px] rounded-full transition-all duration-300 ease-out ${i === activeBeat ? 'w-5 bg-spider-yellow opacity-100' : 'w-2.5 bg-spider-white opacity-30'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Story Canvas */}
        <div
          ref={canvasRef}
          className="absolute top-1/2 left-1/2 will-change-transform z-10"
          style={{ width: "200vw", height: "500vh", marginLeft: "-100vw", marginTop: "-250vh" }}
        >
          {BEATS.map((beat, i) => {
            const isActive = i === activeBeat;
            return (
              <div
                key={i}
                className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'z-50' : 'z-10'}`}
                style={{
                  left: `calc(100vw + ${beat.x}vw)`,
                  top: `calc(250vh + ${beat.y}vh)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className={`relative transition-all ${isActive ? 'duration-200 ease-out scale-100 opacity-100 grayscale-0 blur-0' : 'duration-100 ease-out scale-[1.08] opacity-50 grayscale-0.6 blur-[2px]'}`}>
                  {/* Panel Image */}
                  <div
                    className="relative shadow-[12px_12px_0px_#0A0A0A] border-4 border-spider-black bg-spider-yellow overflow-hidden z-10"
                    style={{ width: "clamp(260px, 38vw, 500px)", height: "clamp(250px, 55vh, 580px)", transform: `rotate(${beat.rotate}deg)` }}
                  >
                    <img src={beat.img} alt={`Panel ${i + 1}`} className="w-full h-full object-cover filter contrast-[1.15] saturate-[1.2]" />
                  </div>

                  {/* Caption Box */}
                  <div
                    className="absolute z-20 bg-spider-white border-[3px] border-spider-black shadow-[6px_6px_0px_#E8272A] p-4 md:p-5 flex flex-col gap-2"
                    style={{ width: "clamp(140px, 24vw, 340px)", bottom: "-5vh", ...(i % 2 === 0 ? { left: "-8vw" } : { right: "-8vw" }), transform: `rotate(${-beat.rotate * 0.5}deg)` }}
                  >
                    <h3 className="font-bangers text-xl md:text-3xl lg:text-4xl leading-[0.9] text-spider-black tracking-wide">
                      {beat.heading.split("\n").map((line, li) => (
                        <span key={li}>{line}<br /></span>
                      ))}
                    </h3>
                    <div className="w-6 md:w-8 h-1 bg-spider-yellow" />
                    <p className="font-mono text-[0.55rem] md:text-xs font-bold text-spider-black/90 leading-tight">
                      {beat.story}
                    </p>
                    <div className="absolute -bottom-3 -right-3 bg-spider-black text-spider-yellow font-mono text-[0.4rem] md:text-[0.5rem] tracking-widest px-2 py-0.5 font-bold uppercase rotate-[-5deg]">
                      REACT-DEV
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
