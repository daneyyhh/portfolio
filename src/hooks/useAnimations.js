import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const useAnimations = () => {
    useEffect(() => {
        // 0. SMOOTH SCROLL (Lenis)
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureDirection: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Update ScrollTrigger on Lenis scroll
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // 1. MAGNETIC ELEMENTS (Improved)
        const magnetics = document.querySelectorAll('.magnetic');
        magnetics.forEach(el => {
            const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
            const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

            el.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const { left, top, width, height } = el.getBoundingClientRect();
                const x = clientX - (left + width / 2);
                const y = clientY - (top + height / 2);
                xTo(x * 0.35);
                yTo(y * 0.35);
            });

            el.addEventListener('mouseleave', () => {
                xTo(0);
                yTo(0);
            });
        });

        // 2. CHARACTER-LEVEL TEXT REVEAL (Premium)
        const revealTexts = document.querySelectorAll('.reveal-text');
        revealTexts.forEach(text => {
            const content = text.innerText;
            text.innerHTML = '';

            // Wrap each character in a span for granular control
            [...content].forEach(char => {
                const span = document.createElement('span');
                span.style.display = 'inline-block';
                span.style.overflow = 'hidden';
                span.style.verticalAlign = 'bottom';

                const inner = document.createElement('span');
                inner.innerText = char === ' ' ? '\u00A0' : char;
                inner.style.display = 'inline-block';
                inner.classList.add('char-inner');

                span.appendChild(inner);
                text.appendChild(span);
            });

            gsap.from(text.querySelectorAll('.char-inner'), {
                y: '100%',
                rotateX: -90,
                opacity: 0,
                duration: 1.5,
                stagger: 0.02,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: text,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            });
        });

        // 3. ADVANCED PARALLAX & IMAGE ZOOM
        const parallaxImages = document.querySelectorAll('.parallax-img');
        parallaxImages.forEach(img => {
            // Parent container must have overflow: hidden
            const parent = img.parentElement;
            if (parent) parent.style.overflow = 'hidden';

            gsap.fromTo(img,
                { yPercent: -20, scale: 1.25 },
                {
                    yPercent: 20,
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img,
                        scrub: true,
                        start: "top bottom",
                        end: "bottom top"
                    }
                }
            );
        });

        // 4. SECTION-BASED COLOR SHIFT (GrilledPixels Style)
        const sections = document.querySelectorAll('section');
        sections.forEach((section, i) => {
            const bgColor = section.getAttribute('data-bg') || (i % 2 === 0 ? '#ffffff' : '#f0f0f0');

            ScrollTrigger.create({
                trigger: section,
                start: "top 50%",
                end: "bottom 50%",
                onEnter: () => gsap.to('body', { backgroundColor: bgColor, duration: 1 }),
                onEnterBack: () => gsap.to('body', { backgroundColor: bgColor, duration: 1 }),
            });

            // Generic section entrance animation (3D Effect)
            if (section.id !== 'hero') {
                gsap.fromTo(section, 
                    {
                        opacity: 0,
                        rotateX: -15, // 3D rotation
                        scale: 0.9,
                        y: 100,
                        transformPerspective: 1200,
                        transformOrigin: 'top center'
                    },
                    {
                        opacity: 1,
                        rotateX: 0,
                        scale: 1,
                        y: 0,
                        duration: 1.5,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%",
                            end: "top 20%",
                            scrub: 1, // Smooth tie to scroll position for 3D feel
                        }
                    }
                );
            }
        });

        // 5. VELOCITY-BASED 3D TILT
        const main = document.querySelector('main');
        if (main) {
            let proxy = { rotateX: 0, rotateY: 0 },
                rotateXSetter = gsap.quickSetter(main, "rotateX", "deg"),
                rotateYSetter = gsap.quickSetter(main, "rotateY", "deg"),
                clamp = gsap.utils.clamp(-10, 10); // clamp for 3d rotation bounds

            ScrollTrigger.create({
                onUpdate: (self) => {
                    let velocity = self.getVelocity();
                    let rotateX = clamp(velocity / -250); // Calculate 3D tilt based on scroll speed
                    
                    if (Math.abs(rotateX) > Math.abs(proxy.rotateX)) {
                        proxy.rotateX = rotateX;
                        gsap.to(proxy, {
                            rotateX: 0,
                            duration: 0.8,
                            ease: "power3",
                            overwrite: true,
                            onUpdate: () => rotateXSetter(proxy.rotateX)
                        });
                    }
                }
            });
            gsap.set(main, { transformOrigin: "center center", force3D: true, transformPerspective: 1500 });
        }

        // 6. STICKY PROJECT CARDS (Optional staggered entrance)
        const cards = document.querySelectorAll('.project-card');
        if (cards.length > 0) {
            gsap.from(cards, {
                y: 150,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.projects-grid',
                    start: 'top 80%',
                }
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
            lenis.destroy();
        };
    }, []);
};
