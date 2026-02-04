import './style.css'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// --- 1. SMOOTH SCROLL ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
});
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- 2. CUSTOM CURSOR ---
const dot = document.querySelector('.cursor-dot');
const trail = document.querySelector('.cursor-trail');

if (dot && trail) {
    window.addEventListener('mousemove', (e) => {
        gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
        gsap.to(trail, { x: e.clientX, y: e.clientY, duration: 0.3 });
    });

    // Magnetic & Hover Effects
    document.querySelectorAll('.btn-magnetic, .project-card, a').forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
            // Magnetic Pull
            el.addEventListener('mousemove', magneticMove);
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
            el.removeEventListener('mousemove', magneticMove);
            gsap.to(el, { x: 0, y: 0, duration: 0.5 });
        });
    });

    const magneticMove = (e) => {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
        gsap.to(target, { x: x, y: y, duration: 0.3 });
    }
}

// --- 3. HERO REVEAL ---
const tl = gsap.timeline();
tl.from('.reveal-text', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power4.out',
    delay: 0.2
})
    .from('.hero-marquee', {
        scaleX: 0,
        duration: 1,
        ease: 'expo.out'
    }, "-=0.5");

// --- 4. 3D TILT ---
// Only on desktop
if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg
            const rotateY = ((x - centerX) / centerX) * 10;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

// --- 5. PARALLAX EFFECTS ---
gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section.querySelector('h2'), {
        y: 50,
        opacity: 0,
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// Helmet Rotation on Scroll/Hover
gsap.utils.toArray('.helmet-visual').forEach(helmet => {
    gsap.to(helmet, {
        rotationY: 360,
        scrollTrigger: {
            trigger: helmet,
            start: "top bottom",
            end: "bottom top",
            scrub: 2
        }
    });
});
