import gsap from 'gsap';

export function initTiltEffect() {
    // 1. Standard Cards (Projects, Articles)
    const cards = document.querySelectorAll('.gp-case, .gallery4-card, .gp-article');

    cards.forEach(card => {
        // Create Glare Element if it doesn't exist
        if (!card.querySelector('.glare')) {
            const glare = document.createElement('div');
            glare.classList.add('glare');
            card.appendChild(glare);
            card.style.position = 'relative';
            card.style.overflow = 'hidden';
        }

        const glareEl = card.querySelector('.glare');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Standard tilt for cards
            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg
            const rotateY = ((x - centerX) / centerX) * 5;

            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;

            gsap.to(card, {
                duration: 0.5,
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                scale: 1.02,
                ease: 'power2.out',
                overwrite: true
            });

            if (glareEl) {
                gsap.to(glareEl, {
                    duration: 0.1,
                    background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.1), transparent 50%)`,
                    opacity: 1,
                    overwrite: "auto"
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.8,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                ease: 'elastic.out(1, 0.5)',
                overwrite: true
            });

            if (glareEl) {
                gsap.to(glareEl, {
                    duration: 0.5,
                    opacity: 0,
                });
            }
        });
    });

    // 2. Hero Section Specialized Tilt
    const hero = document.querySelector('.gp-hero-top');
    if (hero) {
        // Ensure hero has 3D context
        gsap.set(hero, { transformStyle: "preserve-3d", transformPerspective: 1000 });

        const heroName = hero.querySelector('.gp-hero-name');
        const heroSide = hero.querySelector('.gp-hero-side');

        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            // Mouse relative to the element
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Hero tilt is subtler but affects layers differently
            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;

            gsap.to(hero, {
                duration: 1,
                rotateX: rotateX,
                rotateY: rotateY,
                ease: 'power2.out',
                overwrite: true
            });

            // Parallax Layers
            if (heroName) {
                gsap.to(heroName, {
                    x: (x - centerX) * 0.02,
                    y: (y - centerY) * 0.02,
                    z: 50,
                    duration: 1,
                    ease: 'power2.out'
                });
            }
            if (heroSide) {
                gsap.to(heroSide, {
                    x: (x - centerX) * -0.01, // Move opposite for depth
                    y: (y - centerY) * -0.01,
                    z: 20,
                    duration: 1,
                    ease: 'power2.out'
                });
            }
        });

        hero.addEventListener('mouseleave', () => {
            gsap.to([hero, heroName, heroSide], {
                duration: 1.2,
                rotateX: 0,
                rotateY: 0,
                x: 0,
                y: 0,
                z: 0,
                ease: 'power2.out',
                overwrite: true
            });
        });
    }
}
