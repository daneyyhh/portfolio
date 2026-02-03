import './style.css'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { init3DBackground } from './background3d';
import { initTiltEffect } from './tilt';
// import { initLoader3D } from './loader3d';
import { initThemeLoader } from './loaderTheme';



// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- 1. SMOOTH SCROLL (Lenis) ---
function initSmoothScroll() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureDirection: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

// --- 2. CUSTOM CURSOR & TRAIL ---
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    if (!cursor || !cursorDot) return;

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: 'power2.out'
        });
        gsap.to(cursorDot, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.05,
            ease: 'power2.out'
        });
    });

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [data-cursor-label]');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorDot.classList.add('active');
            document.body.classList.add('cursor-hover');

            if (el.getAttribute('data-cursor-label')) {
                const label = el.getAttribute('data-cursor-label');
                cursor.setAttribute('data-label', label);
                document.body.classList.add('cursor-labeled');
                // You might need a label element if you want to show text
            }
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorDot.classList.remove('active');
            document.body.classList.remove('cursor-hover');
            document.body.classList.remove('cursor-labeled');
        });
    });
}

function initCursorTrail() {
    const canvas = document.getElementById('cursor-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particles = [];
    const mouse = { x: 0, y: 0 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        createParticle();
    });

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    class Particle {
        constructor() {
            this.x = mouse.x;
            this.y = mouse.y;
            this.size = Math.random() * 4 + 2; // Slightly larger for pixel look
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.life = 1; // opacity/life
            this.decay = Math.random() * 0.05 + 0.02; // Faster decay for glitch feel
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;
        }
        draw() {
            ctx.fillStyle = `rgba(74, 222, 128, ${this.life})`; // Terminal Green (#4ade80)
            // Draw Square (Pixel)
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }

    function createParticle() {
        // Emit fewer particles for cleaner "pixel" look
        if (Math.random() > 0.5) particles.push(new Particle());
    }

    function animateTrail() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
}

// --- 3. MODALS ---
function initContactModal() {
    const modal = document.querySelector('[data-modal]');
    const openBtns = document.querySelectorAll('[data-open-contact]');
    const closeBtns = document.querySelectorAll('[data-close-contact]');

    if (!modal) return;

    const openModal = () => {
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    };

    openBtns.forEach(btn => btn.addEventListener('click', openModal));
    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
}

function initShowreelModal() {
    const modal = document.querySelector('[data-showreel-modal]');
    const openBtns = document.querySelectorAll('[data-open-showreel]'); // If any
    const closeBtns = document.querySelectorAll('[data-close-showreel]');

    if (!modal) return;

    // Logic similar to contact modal
    const closeModal = () => {
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    };
    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
}

// --- 4. NAVIGATION & INTERACTIONS ---
function initNavigation() {
    // Reveal header on load
    // Reveal header handled by loaderTheme.js now

    // Smooth scroll anchors with Fade Effect
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                // Fade Out
                gsap.to('#main-content', {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        // Scroll instantly while invisible (or smooth, but instant feels like a page load)
                        target.scrollIntoView({ behavior: 'auto' });

                        // Fade In
                        gsap.to('#main-content', {
                            opacity: 1,
                            duration: 0.5,
                            ease: 'power2.out',
                            delay: 0.1
                        });
                    }
                });
            }
        });
    });
}

function initMagnetic() {
    // Re-impl magnetic effect if needed. For now simpler hover.
    const magnets = document.querySelectorAll('.magnetic'); // Add magnetic class to elements if needed
    magnets.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.3 });
        });
    });
}

function initCaseToggles() {
    // Hover effects for cases
    const cases = document.querySelectorAll('.gp-case');
    cases.forEach(c => {
        c.addEventListener('mouseenter', () => {
            // e.g. Animate marquee speed or opacity
        });
    });
}

// --- 5. INITIALIZATION ---



// ... other imports

function initHero() {
    const tl = gsap.timeline();
    tl.from('.gp-title .reveal-line', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out'
    })
        .from('.gp-subtitle .reveal-line', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out'
        }, "-=0.8")
        .from('.gp-side-block', {
            x: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        }, "-=0.8");
}


function initScrollAnimations() {
    // Reveal sections on scroll
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
        // Section Reveal
        gsap.from(sec, {
            scrollTrigger: {
                trigger: sec,
                start: "top 85%", // Trigger earlier
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Text Animation (Tags & Chips)
        const textElements = sec.querySelectorAll('.gp-case-tags span, .gp-chip');
        if (textElements.length > 0) {
            gsap.from(textElements, {
                scrollTrigger: {
                    trigger: sec,
                    start: "top 70%",
                },
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out'
            });
        }

        // Marquee Text Entrance Animation (Cover Fonts)
        const marqueeText = sec.querySelectorAll('.marquee-track span');
        if (marqueeText.length > 0) {
            gsap.from(marqueeText, {
                scrollTrigger: {
                    trigger: sec,
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }
    });
}

function hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loader.style.display = 'none';

                // Show Header/Navbar after loader is gone
                const header = document.querySelector('.header');
                if (header) {
                    header.style.visibility = 'visible'; // Make interactive
                    gsap.to(header, {
                        opacity: 1,
                        y: 0, // Reset from -20px
                        duration: 0.8,
                        ease: 'power3.out'
                    });
                }
            }
        });
    }
}

// --- Global Load and Init ---
// Old load listener removed


// --- Gallery4 Carousel Logic (Preserved) ---
function initGallery4() {
    const track = document.getElementById('gallery-track');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    const dotsContainer = document.getElementById('gallery-dots');

    if (!track || !prevBtn || !nextBtn) return;

    const items = track.querySelectorAll('.gallery4-item');
    if (items.length === 0) return;
    const itemWidth = items[0].offsetWidth + 24; // Width + gap (1.5rem = 24px)

    // Clear existing dots
    if (dotsContainer) dotsContainer.innerHTML = '';

    // Create Dots
    items.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('gallery4-dot');
        if (index === 0) dot.classList.add('active');
        dot.ariaLabel = `Go to slide ${index + 1}`;
        dot.addEventListener('click', () => {
            track.scrollTo({
                left: itemWidth * index,
                behavior: 'smooth'
            });
        });
        dotsContainer.appendChild(dot);
    });

    const updateDots = () => {
        const scrollLeft = track.scrollLeft;
        const index = Math.round(scrollLeft / itemWidth);

        const dots = dotsContainer.querySelectorAll('.gallery4-dot');
        dots.forEach((dot, i) => {
            if (i === index) dot.classList.add('active');
            else dot.classList.remove('active');
        });

        // Update Button State
        prevBtn.disabled = scrollLeft <= 10;
        nextBtn.disabled = scrollLeft >= (track.scrollWidth - track.clientWidth - 10);
    };

    track.addEventListener('scroll', updateDots);
    window.addEventListener('resize', updateDots); // Update on resize too

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: itemWidth, behavior: 'smooth' });
    });

    // Initial check
    setTimeout(updateDots, 100);
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("System Initializing...");
    initSmoothScroll();
    initThemeLoader();
    // init3DBackground(); // Disabled per request
    // initTiltEffect();   // Disabled per request
    initCursor();
    initCursorTrail(); // Activate Green Pixel Particles
    initContactModal();
    initShowreelModal();
    initNavigation();
    initScrollAnimations();
    initGallery4();
    initHero();
});
