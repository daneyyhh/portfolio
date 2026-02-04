import gsap from 'gsap';

export function initHero3D() {
    console.log("Initializing Hero 3D...");

    const heroSection = document.querySelector('.gp-hero');
    const heroCard = document.getElementById('hero-card');
    const blobs = document.querySelectorAll('.hero-blob');

    if (!heroSection || !heroCard) return;

    // Mobile Check
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return; // Disable on mobile for performance

    // Mouse Move Logic
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // 1. Card Tilt (Max 8deg)
        // Invert X rotation for natural feel
        const rotateY = ((x - centerX) / centerX) * 8;
        const rotateX = ((y - centerY) / centerY) * -8;

        gsap.to(heroCard, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 1, // Smooth damping
            ease: "power2.out",
            overwrite: "auto"
        });

        // 2. Blobs Parallax (Slow movement)
        blobs.forEach((blob, i) => {
            const speed = 0.05 + (i * 0.02); // Varied speeds
            const moveX = (x - centerX) * speed;
            const moveY = (y - centerY) * speed;

            gsap.to(blob, {
                x: moveX,
                y: moveY,
                duration: 2, // Slower follow
                ease: "power2.out",
                overwrite: "auto"
            });
        });
    });

    // Reset on Leave
    heroSection.addEventListener('mouseleave', () => {
        gsap.to(heroCard, {
            rotationX: 0,
            rotationY: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)",
            overwrite: "auto"
        });

        gsap.to(blobs, {
            x: 0,
            y: 0,
            duration: 1.5,
            ease: "power2.out"
        });
    });
}
