import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollEffects() {
    console.log('Initializing Grilled Pixels 2.0 Scroll Effects...');

    const cards = document.querySelectorAll('.gp-case');

    // Stacking Logic: Cards overlap slightly and move at different speeds
    cards.forEach((card, i) => {
        gsap.set(card, {
            transformPerspective: 1000,
            transformOrigin: "center top",
            z: 0
        });

        // 1. 3D Entrance
        gsap.fromTo(card,
            {
                opacity: 0,
                rotateX: -15,
                y: 100,
                scale: 0.9
            },
            {
                opacity: 1,
                rotateX: 0,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                }
            }
        );

        // 2. Parallax Stacking (Slower scroll = sticking effect)
        // Each subsequent card moves slightly slower than the previous to stack
        gsap.to(card, {
            y: -50 * (i + 1), // Move UP as we scroll down to create overlap
            ease: "none",
            scrollTrigger: {
                trigger: card.parentElement, // Trigger based on container
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // Sticky Navbar Glow
    const header = document.querySelector('.header');
    if (header) {
        ScrollTrigger.create({
            start: "top -50",
            onUpdate: (self) => {
                // Add glow when scrolled
                if (self.scroll() > 50) {
                    gsap.to(header, {
                        boxShadow: "0 4px 20px rgba(0, 255, 136, 0.1)",
                        background: "rgba(5, 5, 5, 0.9)",
                        duration: 0.3
                    });
                } else {
                    gsap.to(header, {
                        boxShadow: "none",
                        background: "transparent",
                        duration: 0.3
                    });
                }
            }
        });
    }
}
