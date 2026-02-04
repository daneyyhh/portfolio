import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollEffects() {
    console.log('3D Scroll Effects Initialized');

    // 1. Projects Entrance (3D Rotate & Scale)
    const cards = document.querySelectorAll('.gp-case');

    cards.forEach((card, i) => {
        // Set initial 3D state
        gsap.set(card, {
            transformPerspective: 1000,
            transformStyle: "preserve-3d"
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: "top 85%", // Start when top of card hits 85% of viewport
                end: "top 50%",
                toggleActions: "play none none reverse"
            }
        });

        tl.fromTo(card,
            {
                opacity: 0,
                rotateX: 15,
                y: 100,
                scale: 0.9,
                filter: "blur(10px)"
            },
            {
                opacity: 1,
                rotateX: 0,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 1.2,
                ease: "power3.out"
            }
        );

        // Internal Parallax for Card Content
        const image = card.querySelector('.gp-case-hit img, .gp-case-body'); // Fallback to body
        if (image) {
            gsap.to(image, {
                y: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }
    });

    // 2. Velocity Skew (Retained & Tuned)
    let proxy = { skew: 0 },
        skewSetter = gsap.quickSetter(".gp-case", "skewY", "deg"),
        clamp = gsap.utils.clamp(-5, 5); // Reduce clamp for subtler effect

    ScrollTrigger.create({
        onUpdate: (self) => {
            let skew = clamp(self.getVelocity() / -500);
            if (Math.abs(skew) > 0.1) skewSetter(skew);
            else skewSetter(0);
        }
    });

    // 3. Section Titles 3D Reveal
    const headings = document.querySelectorAll('.gp-h2, .gp-lead');
    headings.forEach(h => {
        gsap.fromTo(h,
            {
                opacity: 0,
                y: 50,
                rotateX: 10,
                transformPerspective: 2500
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: h,
                    start: "top 90%"
                }
            }
        );
    });

    // 4. Case Tags Stagger
    const cases = document.querySelectorAll('.gp-case');
    cases.forEach(c => {
        const tags = c.querySelectorAll('.gp-case-tags span');
        if (tags.length > 0) {
            gsap.from(tags, {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.05,
                delay: 0.2,
                ease: 'back.out(1.5)',
                scrollTrigger: {
                    trigger: c,
                    start: "top 75%"
                }
            });
        }
    });
}
