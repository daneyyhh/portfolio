import gsap from 'gsap';

export function initMouseParallax() {
    const parallaxContainer = document.querySelector('.gp-hero');
    if (!parallaxContainer) return;

    // Select elements that should move
    // We will control speed via data-mouse-speed attribute on HTML elements
    // Example: <div data-mouse-speed="0.05">...</div>
    const layers = document.querySelectorAll('[data-mouse-speed]');

    parallaxContainer.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2);
        const y = (e.clientY - window.innerHeight / 2);

        layers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-mouse-speed')) || 0.05;

            gsap.to(layer, {
                x: x * speed,
                y: y * speed,
                duration: 1, // Smooth dampening
                ease: 'power2.out',
                overwrite: 'auto'
            });
        });
    });

    // Reset on mouse leave (optional, can keep it floating or return to center)
    parallaxContainer.addEventListener('mouseleave', () => {
        layers.forEach(layer => {
            gsap.to(layer, {
                x: 0,
                y: 0,
                duration: 1.2,
                ease: 'power3.out'
            });
        });
    });

    console.log("Mouse Parallax Initialized");
}
