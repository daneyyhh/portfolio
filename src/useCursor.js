import { useEffect } from 'react';
import gsap from 'gsap';

export const useCursor = () => {
    useEffect(() => {
        // Check if device has fine pointer
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const cursor = document.querySelector('.custom-cursor');
        const ring = document.querySelector('.custom-cursor-ring');
        const label = document.querySelector('.custom-cursor-label');

        if (!cursor || !ring) return;

        // Center cursor initially
        gsap.set([cursor, ring], { xPercent: -50, yPercent: -50 });

        // Movement Logic
        const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const mouse = { x: pos.x, y: pos.y };

        // GSAP quickTo for performance
        const xSet = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power2.out" });
        const ySet = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power2.out" });

        // Ring has lag
        const ringXSet = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power2.out" });
        const ringYSet = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power2.out" });

        const onMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            xSet(mouse.x);
            ySet(mouse.y);
            ringXSet(mouse.x);
            ringYSet(mouse.y);
        };

        window.addEventListener('mousemove', onMove);

        // Hover & Magnetic Logic
        const handleMouseEnter = (e) => {
            const target = e.currentTarget;

            // Magnetic Pull
            if (target.dataset.magnetic === "true") {
                const rect = target.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                gsap.to([cursor, ring], {
                    x: centerX,
                    y: centerY,
                    duration: 0.35,
                    ease: "elastic.out(1, 0.3)",
                    overwrite: true
                });
            }

            // Expand & Label
            gsap.to(ring, {
                width: 80,
                height: 80,
                backgroundColor: '#fff',
                mixBlendMode: 'difference',
                duration: 0.3
            });

            // Show Label
            if (label) label.style.opacity = 1;
        };

        const handleMouseLeave = (e) => {
            // Release Magnetic
            const target = e.currentTarget;
            if (target.dataset.magnetic === "true") {
                gsap.to([cursor, ring], {
                    clearProps: "all", // Clear hard set position to resume following mouse
                    duration: 0.1
                });

                // Re-enable mouse tracking immediately
                xSet(mouse.x);
                ySet(mouse.y);
                ringXSet(mouse.x);
                ringYSet(mouse.y);
            }

            // Shrink
            gsap.to(ring, {
                width: 40,
                height: 40,
                backgroundColor: 'transparent',
                mixBlendMode: 'normal',
                duration: 0.3
            });

            if (label) label.style.opacity = 0;
        };

        // Attach listeners
        const targets = document.querySelectorAll('a, button, .hover-target');
        targets.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', onMove);
            targets.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);
};
