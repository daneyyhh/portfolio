import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard3D = ({ title, image, desc }) => {
    const cardRef = useRef(null);
    const bgFarRef = useRef(null);
    const bgMidRef = useRef(null);
    const bgNearRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // 1. ScrollTrigger Entrance & Scrub
        gsap.fromTo(card,
            { scale: 0.9, rotateX: 10, opacity: 0 },
            {
                scale: 1,
                rotateX: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: "top 50%",
                    scrub: 1,
                }
            }
        );

        // 2. Mouse Move Tilt Effect (Desktop Only)
        const onMove = (e) => {
            if (window.innerWidth < 768) return; // Mobile check

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
            const yPercent = (y / rect.height - 0.5) * 2;

            // Tilt Card
            gsap.to(card, {
                rotationY: xPercent * 15,
                rotationX: yPercent * -15, // Inverted for natural tilt
                duration: 0.5,
                ease: "power2.out"
            });

            // Parallax Backgrounds
            gsap.to(bgFarRef.current, { x: xPercent * -20, y: yPercent * -20, duration: 1 });
            gsap.to(bgMidRef.current, { x: xPercent * -40, y: yPercent * -40, duration: 1 });
            gsap.to(bgNearRef.current, { x: xPercent * -60, y: yPercent * -60, duration: 1 });
        };

        const onLeave = () => {
            gsap.to(card, { rotationY: 0, rotationX: 0, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" });
            gsap.to([bgFarRef.current, bgMidRef.current, bgNearRef.current], { x: 0, y: 0, duration: 0.8 });
        };

        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);

        return () => {
            card.removeEventListener('mousemove', onMove);
            card.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className="project-card-3d"
            style={{
                position: 'relative',
                width: '100%',
                height: '400px',
                borderRadius: '16px',
                overflow: 'hidden',
                perspective: '1000px',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                backgroundColor: '#1a1a1a',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                cursor: 'pointer'
            }}
            onMouseEnter={(e) => gsap.to(e.currentTarget, { boxShadow: '0 0 25px #00ff88', borderColor: '#00ff88', duration: 0.3 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { boxShadow: '0 10px 30px rgba(0,0,0,0.5)', borderColor: 'transparent', duration: 0.3 })}
        >
            {/* Layer 1: Far (Blurred) */}
            <div ref={bgFarRef} style={{
                position: 'absolute', inset: '-10%', background: `url(${image}) center/cover`,
                filter: 'blur(5px)', opacity: 0.4, transform: 'translateZ(-50px)'
            }} />

            {/* Layer 2: Mid (Slight Blur) */}
            <div ref={bgMidRef} style={{
                position: 'absolute', inset: '-5%', background: `url(${image}) center/cover`,
                filter: 'blur(2px)', opacity: 0.6, transform: 'translateZ(-20px)', mixBlendMode: 'overlay'
            }} />

            {/* Layer 3: Near (Sharp) */}
            <div ref={bgNearRef} style={{
                position: 'absolute', inset: '0', background: `linear-gradient(to top, #1a1a1a, transparent), url(${image}) center/cover`,
                transform: 'translateZ(0)'
            }} />

            {/* Content */}
            <div ref={contentRef} style={{
                position: 'absolute', bottom: '2rem', left: '2rem', zIndex: 10,
                pointerEvents: 'none', transform: 'translateZ(30px)' // Pop out
            }}>
                <h3 style={{
                    color: '#fff', fontSize: '2rem', fontFamily: 'Inter, sans-serif', fontWeight: '800',
                    textShadow: '0 0 10px rgba(255,255,255,0.5)', margin: 0
                }}>{title}</h3>
                <p style={{ color: '#ccc', marginTop: '0.5rem', fontFamily: 'monospace' }}>{desc}</p>
            </div>
        </div>
    );
};

export default ProjectCard3D;

// Simulation: https://codepen.io/pen?template=ProjectCard3D_Simulation
