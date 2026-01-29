import gsap from 'gsap';

// Enhanced Tilt + Jelly Effect
export function initTiltEffect() {
    const cards = document.querySelectorAll('.gp-case, .gallery4-card, .gp-article');

    // Track mouse velocity
    let xPrev = 0;
    let yPrev = 0;
    let xVel = 0;
    let yVel = 0;

    window.addEventListener('mousemove', (e) => {
        xVel = e.clientX - xPrev;
        yVel = e.clientY - yPrev;
        xPrev = e.clientX;
        yPrev = e.clientY;
    });

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Normalize to -1 to 1
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Standard Tilt
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;

            // Jelly Skew based on velocity (clamped)
            const skewX = Math.max(Math.min(xVel * 0.1, 5), -5);
            const skewY = Math.max(Math.min(yVel * 0.1, 5), -5);

            gsap.to(card, {
                duration: 0.6,
                rotateX: rotateX,
                rotateY: rotateY,
                skewX: -skewX,
                skewY: -skewY,
                transformPerspective: 1000,
                scale: 1.05,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.8,
                rotateX: 0,
                rotateY: 0,
                skewX: 0,
                skewY: 0,
                scale: 1,
                ease: 'elastic.out(1, 0.5)',
                overwrite: 'auto'
            });
        });
    });
}
