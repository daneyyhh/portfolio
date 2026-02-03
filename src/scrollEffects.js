import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollEffects() {
    console.log('3D Scroll Effects Initialized');

    // 1. Parallax for Project Images
    // Move images slightly slower/faster than scroll to create depth
    const projectImages = document.querySelectorAll('.gp-case-hit img, .gp-case-body'); // Targeting body/images

    // If no direct images, let's target the article/cards themselves for a simpler parallax lift
    const cards = document.querySelectorAll('.gp-case');

    cards.forEach(card => {
        gsap.to(card, {
            y: -50, // Move up slightly as we scroll down (parallax)
            ease: 'none',
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // 2. Velocity Skew Effect
    // Skew elements based on scroll velocity to give "weight"
    let proxy = { skew: 0 },
        skewSetter = gsap.quickSetter(".gp-case", "skewY", "deg"), // fast
        clamp = gsap.utils.clamp(-10, 10); // Don't skew too much

    ScrollTrigger.create({
        onUpdate: (self) => {
            let skew = clamp(self.getVelocity() / -300);
            // Only skew if velocity is significant
            if (Math.abs(skew) > 0.1) {
                skewSetter(skew);
            } else {
                skewSetter(0);
            }
        }
    });

    // 3. Section Depth / 3D Reveal
    // Animate sections appearing with a slight rotation/scale
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
        gsap.fromTo(sec,
            {
                opacity: 0,
                y: 100,
                rotateX: 5,
                transformPerspective: 1000
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sec,
                    start: 'top 85%'
                }
            }
        );
    });

    // 4. Hero Parallax
    // Make the hero content move at different speeds
    gsap.to('.gp-hero-name', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.gp-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    gsap.to('.gp-hero-side', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
            trigger: '.gp-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}
