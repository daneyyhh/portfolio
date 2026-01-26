import './style.css'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { init3DBackground } from './background3d';
import { initTiltEffect } from './tilt';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
// ... existing code ...
// --- Global Load and Init ---
window.addEventListener('load', () => {
    initSmoothScroll(); // Start Lenis
    initCursor();
    initCursorTrail(); // New trail

    initContactModal();
    initShowreelModal();
    // initAudioToggle(); // Removed
    initMagnetic();
    initNavigation();
    initCaseToggles();
    startLoader();
    initHero(); // New hero animation
    initGallery4(); // Gallery4 Carousel

    // 3D Immersion
    init3DBackground();
    setTimeout(() => {
        initTiltEffect();
    }, 500);

    setTimeout(initScrollAnimations, 1000);
});

// (cursor is now enabled via initCursor)

// --- Gallery4 Carousel Logic ---
function initGallery4() {
    const track = document.getElementById('gallery-track');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    const dotsContainer = document.getElementById('gallery-dots');

    if (!track || !prevBtn || !nextBtn) return;

    const items = track.querySelectorAll('.gallery4-item');
    if (items.length === 0) return;
    const itemWidth = items[0].offsetWidth + 24; // Width + gap (1.5rem = 24px)

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
