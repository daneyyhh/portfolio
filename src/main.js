import './style.css'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { initHero3D } from './hero3d'; // NEW
import { initAdvancedCursor } from './cursor'; // NEW
// import { initLoader3D } from './loader3d';
import { initThemeLoader } from './loaderTheme';
import { initScrollEffects } from './scrollEffects';
import { initSkillsMarquee } from './skillsMarquee';
// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- 1. SMOOTH SCROLL (Lenis) ---
function initSmoothScroll() {
    const lenis = new Lenis({
        duration: 2.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

// Custom Cursor is now handled by initAdvancedCursor() imported from cursor.js
// Old initCursor() removed to prevent conflicts

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

// --- 5. INITIALIZATION ---



// ... other imports


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
    console.log("Initializing Grilled Pixels 2.0...");

    initThemeLoader();
    initSmoothScroll();
    initHero3D(); // 3D Tilt & Blobs
    initAdvancedCursor(); // Dual Ring Magnetic Cursor
    initScrollEffects(); // Stacked Parallax
    initSkillsMarquee(); // Infinite Loop
    initNavigation();

    // Force refresh to calculate positions correctly
    setTimeout(() => ScrollTrigger.refresh(), 1000);
});
