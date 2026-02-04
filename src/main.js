import './style.css'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { init3DBackground } from './background3d';
import { initTiltEffect } from './tilt';
// import { initLoader3D } from './loader3d';
import { initThemeLoader } from './loaderTheme';
import { initScrollEffects } from './scrollEffects';



// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- 1. SMOOTH SCROLL (Lenis) ---
function initSmoothScroll() {
    const lenis = new Lenis({
        duration: 2.0, // Increased from 1.2 for ultra-smooth feel
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureDirection: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8, // Reduced slightly for weight
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

    // Mouse Tracking with GSAP for smooth delay
    window.addEventListener('mousemove', (e) => {
        // Dot follows instantly
        gsap.to(cursorDot, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: 'power2.out',
            overwrite: 'auto'
        });
        // Cursor Circle follows with delay
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto'
        });
    });

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .gp-case-hit, .gp-case');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorDot.classList.add('active');
            document.body.classList.add('cursor-hover');

            // Specific Case/Project Hover
            if (el.classList.contains('gp-case-hit') || el.closest('.gp-case')) {
                cursor.innerHTML = '<span style="font-size: 10px; color: black; font-weight: bold;">VIEW</span>';
                gsap.to(cursor, { width: 60, height: 60, backgroundColor: '#4ade80', mixBlendMode: 'normal' });
            }
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorDot.classList.remove('active');
            document.body.classList.remove('cursor-hover');

            // Reset
            cursor.innerHTML = '';
            gsap.to(cursor, { width: 14, height: 14, backgroundColor: '#4ade80', mixBlendMode: 'difference' });
        });
    });

    // Magnetic Buttons
    // Find buttons specifically to apply magnetic effect
    const buttons = document.querySelectorAll('.gp-pill, .gp-submit');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Magnetic pull strength
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
            // Cursor also attracted slightly
            gsap.to([cursor, cursorDot], {
                x: e.clientX + (x * 0.1),
                y: e.clientY + (y * 0.1),
                duration: 0.3
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
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
    let lastMouse = { x: 0, y: 0 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        // Spawn based on velocity
        const dist = Math.hypot(mouse.x - lastMouse.x, mouse.y - lastMouse.y);
        if (dist > 5) { // Only spawn if moved enough
            const count = Math.min(5, Math.floor(dist / 5)); // More movement = more particles
            for (let i = 0; i < count; i++) createParticle();
        }
        lastMouse.x = mouse.x;
        lastMouse.y = mouse.y;
    });

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    class Particle {
        constructor() {
            this.x = mouse.x + (Math.random() - 0.5) * 10;
            this.y = mouse.y + (Math.random() - 0.5) * 10;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5; // Slower float
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.life = 1;
            this.decay = Math.random() * 0.03 + 0.01;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;
        }
        draw() {
            ctx.fillStyle = `rgba(74, 222, 128, ${this.life})`; // Terminal Green
            ctx.fillRect(this.x, this.y, this.size, this.size); // Square pixels
        }
    }

    function createParticle() {
        if (particles.length < 100) { // Limit total
            particles.push(new Particle());
        }
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
    // 1. Title Pop
    tl.from('.gp-title', {
        scale: 0.5,
        opacity: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
        transformOrigin: 'center center'
    })
        // 2. Subtitle Pop
        .from('.gp-subtitle', {
            scale: 0.8,
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.5)'
        }, "-=0.8")
        // 3. Side Blocks Slide & Fade
        .from('.gp-side-block', {
            x: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        }, "-=0.6");
}


// function initScrollAnimations() removed - replaced by initScrollEffects

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
    // initTiltEffect();   // Re-enabled for 3D effect
    initTiltEffect();
    initCursor();
    initCursorTrail(); // Activate Green Pixel Particles
    initContactModal();
    initShowreelModal();
    initNavigation();
    // initScrollAnimations(); // Replaced by initScrollEffects
    initScrollEffects();
    initGallery4();
    initHero();

    // Force refresh ScrollTrigger after everything interacts
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 1000);
});
