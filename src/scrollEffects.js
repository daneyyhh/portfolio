import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollEffects() {
    console.log('Scroll Effects Initialized (3D Removed)');

    // 1. Projects Entrance (Simple Fade Up)
    const cards = document.querySelectorAll('.gp-case');

    cards.forEach((card, i) => {
        gsap.set(card, { clearProps: "all" }); // Clear 3D props

        gsap.fromTo(card,
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%"
                }
            }
        );

        // Slight Parallax for Content (Internal) - Keeping this as it's subtle and nice
        const image = card.querySelector('.gp-case-hit img, .gp-case-body');
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

    // 2. Velocity Skew REMOVED for Readability

    // 3. Section Titles Reveal (Simple Fade)
    const headings = document.querySelectorAll('.gp-h2, .gp-lead');
    headings.forEach(h => {
        gsap.set(h, { clearProps: "all" });

        gsap.fromTo(h,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: h,
                    start: "top 90%"
                }
            }
        );
    });

    // 4. Case Tags Stagger (Kept, just removed delays/complex easing)
    const cases = document.querySelectorAll('.gp-case');
    cases.forEach(c => {
        const tags = c.querySelectorAll('.gp-case-tags span');
        if (tags.length > 0) {
            gsap.from(tags, {
                y: 10,
                opacity: 0,
                duration: 0.5,
                stagger: 0.05,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: c,
                    start: "top 80%"
                }
            });
        }
    });

    // 5. General Section Fade
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
        gsap.fromTo(sec,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sec,
                    start: 'top 90%'
                }
            }
        );
    });
}
