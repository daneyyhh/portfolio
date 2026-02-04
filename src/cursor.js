import gsap from 'gsap';

export function initAdvancedCursor() {
    // Check for fine pointer (Desktop)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Create Cursor Elements if not present
    let cursor = document.querySelector('.cursor-dot-main');
    let ring = document.querySelector('.cursor-ring-main');

    if (!cursor) {
        cursor = document.createElement('div');
        cursor.className = 'cursor-dot-main';
        document.body.appendChild(cursor);
    }
    if (!ring) {
        ring = document.createElement('div');
        ring.className = 'cursor-ring-main';
        document.body.appendChild(ring);
    }

    // Centering Logic (GSAP quickTo)
    const xDot = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power2.out" });
    const yDot = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power2.out" });

    const xRing = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power2.out" }); // Lag
    const yRing = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power2.out" });

    // Initial Center
    gsap.set([cursor, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    window.addEventListener('mousemove', (e) => {
        gsap.to([cursor, ring], { opacity: 1, duration: 0.2, overwrite: "auto" });
        xDot(e.clientX);
        yDot(e.clientY);
        xRing(e.clientX);
        yRing(e.clientY);
    });

    // Hover & Magnetic Logic
    const targets = document.querySelectorAll('a, button, .gp-hero-card, .nav-item');

    targets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Expand Ring
            gsap.to(ring, {
                width: 60,
                height: 60,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'transparent',
                mixBlendMode: 'difference',
                duration: 0.3
            });

            // Magnetic Pull (Optional simplified)
            if (el.classList.contains('nav-item')) {
                // ... magnetic logic if needed
            }
        });

        el.addEventListener('mouseleave', () => {
            // Reset Ring
            gsap.to(ring, {
                width: 40,
                height: 40,
                backgroundColor: 'transparent',
                borderColor: '#00ff88',
                mixBlendMode: 'normal',
                duration: 0.3
            });

            // Clear magnetic
            gsap.to(el, { x: 0, y: 0, duration: 0.5 });
        });

        // Add simple magnetic to nav items
        if (el.classList.contains('nav-item')) {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.2 });
            });
        }
    });

    // Hide default cursor
    document.body.style.cursor = 'none';
}
