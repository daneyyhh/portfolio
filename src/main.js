import './style.css'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- Custom Cursor ---
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const dot = document.querySelector('.cursor-dot');
    if (!cursor || !dot) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const setPos = () => {
        // Smooth follow for outer cursor, dot sticks closer
        x += (tx - x) * 0.14;
        y += (ty - y) * 0.14;

        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        dot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        label.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;

        requestAnimationFrame(setPos);
    };

    window.addEventListener('mousemove', (e) => {
        tx = e.clientX;
        ty = e.clientY;
        document.body.classList.add('cursor-ready');
    }, { passive: true });

    window.addEventListener('mousedown', () => document.body.classList.add('cursor-down'));
    window.addEventListener('mouseup', () => document.body.classList.remove('cursor-down'));

    const hoverables = 'a, button, [role="button"], .project-item, .project-media';
    document.addEventListener('mouseover', (e) => {
        const el = e.target?.closest?.(hoverables);
        if (el) document.body.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', (e) => {
        const el = e.target?.closest?.(hoverables);
        if (el) document.body.classList.remove('cursor-hover');
    });

    // Cursor label
    const label = document.createElement('div');
    label.className = 'cursor-label';
    label.setAttribute('aria-hidden', 'true');
    document.body.appendChild(label);

    let labelText = '';
    document.addEventListener('mouseover', (e) => {
        const el = e.target?.closest?.('[data-cursor-label]');
        if (!el) return;
        labelText = el.getAttribute('data-cursor-label') || '';
        label.textContent = labelText;
        document.body.classList.toggle('cursor-labeled', Boolean(labelText));
    });
    document.addEventListener('mouseout', (e) => {
        const el = e.target?.closest?.('[data-cursor-label]');
        if (!el) return;
        labelText = '';
        label.textContent = '';
        document.body.classList.remove('cursor-labeled');
    });

    // Hide on touch devices
    if (window.matchMedia?.('(pointer: coarse)').matches) {
        cursor.style.display = 'none';
        dot.style.display = 'none';
        label.style.display = 'none';
        return;
    }

    requestAnimationFrame(setPos);
}

// --- Contact Modal ---
function initContactModal() {
    const modal = document.querySelector('[data-modal]');
    if (!modal) return;

    const openers = document.querySelectorAll('[data-open-contact]');
    const closers = document.querySelectorAll('[data-close-contact]');

    const open = () => {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    };

    const close = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    };

    openers.forEach(btn => btn.addEventListener('click', open));
    closers.forEach(btn => btn.addEventListener('click', close));

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });

    const form = modal.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Demo behavior: close on submit
            close();
        });
    }
}

// --- Showreel Modal ---
function initShowreelModal() {
    const modal = document.querySelector('[data-showreel-modal]');
    if (!modal) return;

    const openers = document.querySelectorAll('[data-open-showreel]');
    const closers = document.querySelectorAll('[data-close-showreel]');

    const open = () => {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    };

    const close = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    };

    openers.forEach(btn => btn.addEventListener('click', open));
    closers.forEach(btn => btn.addEventListener('click', close));

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });
}

// --- Audio Toggle (lightweight, no external assets) ---
function initAudioToggle() {
    const btn = document.querySelector('[data-audio-toggle]');
    if (!btn) return;

    let ctx = null;
    let gain = null;
    let osc = null;
    let isOn = false;

    const ensure = () => {
        if (ctx) return;
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        ctx = new AudioCtx();
        gain = ctx.createGain();
        gain.gain.value = 0.0;
        gain.connect(ctx.destination);

        // Subtle “room tone” using a sine stack (kept very quiet)
        osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 110;
        osc.connect(gain);
        osc.start();
    };

    const setState = (next) => {
        isOn = next;
        document.body.classList.toggle('audio-on', isOn);
        btn.textContent = isOn ? 'Mute' : 'Unmute';
        btn.setAttribute('data-cursor-label', isOn ? 'Mute' : 'Unmute');

        if (!gain) return;
        gsap.to(gain.gain, {
            value: isOn ? 0.03 : 0.0,
            duration: 0.35,
            ease: 'power2.out'
        });
    };

    btn.addEventListener('click', async () => {
        ensure();
        if (ctx?.state === 'suspended') await ctx.resume();
        setState(!isOn);
    });
}

// --- Magnetic hover ---
function initMagnetic() {
    const items = document.querySelectorAll('.gp-pill, .gp-chip, .nav-item, .gp-case-toggle');
    if (!items.length) return;

    items.forEach((el) => {
        let bounds = null;

        const onEnter = () => {
            bounds = el.getBoundingClientRect();
            el.classList.add('is-magnetic');
        };

        const onMove = (e) => {
            if (!bounds) bounds = el.getBoundingClientRect();
            const x = e.clientX - (bounds.left + bounds.width / 2);
            const y = e.clientY - (bounds.top + bounds.height / 2);
            gsap.to(el, { x: x * 0.18, y: y * 0.22, duration: 0.25, ease: 'power3.out' });
        };

        const onLeave = () => {
            bounds = null;
            el.classList.remove('is-magnetic');
            gsap.to(el, { x: 0, y: 0, duration: 0.45, ease: 'power3.out' });
        };

        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
    });
}

// --- Loading Sequence ---
function startLoader() {
    const counter = document.querySelector('.counter');
    const loaderText = document.querySelector('.loader-text');
    const loader = document.querySelector('.loader');
    const site = document.querySelector('.site-wrapper');

    let count = 0;

    // Ensure main content is not interactable/visible until loader completes
    if (site) {
        site.style.opacity = '0';
        site.style.pointerEvents = 'none';
    }

    const interval = setInterval(() => {
        count += Math.floor(Math.random() * 5) + 2;
        if (count > 100) count = 100;

        counter.innerText = `${count}%`;

        if (count === 100) {
            clearInterval(interval);
            setTimeout(() => {
                animateOut();
            }, 400); // Slight pause at 100%
        }
    }, 40);

    function animateOut() {
        const tl = gsap.timeline();

        tl.to([counter, loaderText], {
            y: -50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.inOut"
        })
            .to(loader, {
                height: 0,
                duration: 1,
                ease: "power4.inOut",
                onComplete: () => {
                    document.body.classList.remove('loading-active');
                    if (site) {
                        site.style.opacity = '1';
                        site.style.pointerEvents = 'auto';
                    }
                    initHeroAnimations();
                }
            });
    }
}

// --- Hero Animations ---
function initHeroAnimations() {
    const tl = gsap.timeline();

    tl.from(".gp-title .reveal-line", {
        yPercent: 110,
        duration: 1.05,
        ease: "power4.out",
        stagger: 0.08
    })
        .from(".gp-subtitle .reveal-line", {
            yPercent: 110,
            duration: 0.85,
            ease: "power4.out",
            stagger: 0.06
        }, "-=0.55")
        .from(".gp-hero-side", {
            opacity: 0,
            y: 14,
            duration: 0.7,
            ease: "power3.out"
        }, "-=0.55")
        .from(".gp-hero-bottom", {
            opacity: 0,
            y: 10,
            duration: 0.6,
            ease: "power3.out"
        }, "-=0.3");
}

// --- Scroll Animations (Projects) ---
function initScrollAnimations() {
    // Cases
    const cases = document.querySelectorAll('[data-case]');
    cases.forEach((c) => {
        const mediaImg = c.querySelector('.gp-case-media img');
        if (mediaImg) {
            gsap.to(mediaImg, {
                y: "10%",
                scrollTrigger: {
                    trigger: c,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }

        gsap.from(c, {
            y: 18,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
                trigger: c,
                start: "top 85%"
            }
        });
    });

    // About reveal
    gsap.from(".gp-about .gp-h2", {
        y: 22,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%"
        }
    });

    // Header subtle hide/reveal on scroll - REMOVED per request
    /*
    const header = document.querySelector('.header');
    if (header) {
        ScrollTrigger.create({
            start: 0,
            end: 99999,
            onUpdate: (self) => {
                header.style.transform = self.direction === 1 ? 'translateY(-110%)' : 'translateY(0%)';
            }
        });
    }
    */
}

// --- Case expand/collapse ---
function initCaseToggles() {
    const toggles = document.querySelectorAll('[data-case-toggle]');
    toggles.forEach((btn) => {
        btn.addEventListener('click', () => {
            const card = btn.closest('[data-case]');
            if (!card) return;
            const details = card.querySelector('[data-case-details]');
            if (!details) return;

            const isOpen = card.classList.toggle('is-open');
            btn.textContent = isOpen ? 'Close' : 'Details';
            btn.setAttribute('data-cursor-label', isOpen ? 'Close' : 'Details');
        });
    });
}

// --- Navigation Smooth Scroll ---
function initNavigation() {
    const navLinks = document.querySelectorAll('[data-nav-link]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            e.preventDefault();
            const targetId = href.slice(1);
            const target = document.getElementById(targetId);

            if (target) {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');

                // Set offset to 0 for full-screen alignment
                const headerOffset = 0;
                const targetPosition = target.offsetTop - headerOffset;

                // Smooth scroll with GSAP animation
                const scrollObj = { y: window.scrollY };
                gsap.to(scrollObj, {
                    y: targetPosition,
                    duration: 1.2,
                    ease: 'power3.inOut',
                    onUpdate: () => {
                        window.scrollTo(0, scrollObj.y);
                    }
                });
            }
        });
    });
}

// --- Cursor Trail ---
function initCursorTrail() {
    const canvas = document.getElementById('cursor-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    let mouseX = width / 2;
    let mouseY = height / 2;

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        createTrailParticle();
    });

    function createTrailParticle() {
        // Create multiple particles for "spread"
        for (let i = 0; i < 3; i++) {
            particles.push({
                x: mouseX,
                y: mouseY,
                vx: (Math.random() - 0.5) * 2, // Random X velocity
                vy: (Math.random() - 0.5) * 2, // Random Y velocity
                size: Math.random() * 8 + 4,
                life: 1,
                decay: Math.random() * 0.03 + 0.01 // Slower decay for smoother feel
            });
        }
    }

    function animateTrail() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // update position for smoothness
            p.x += p.vx;
            p.y += p.vy;

            ctx.fillStyle = `rgba(255, 0, 0, ${p.life * 0.5})`; // Red trail
            ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
            p.life -= p.decay;

            if (p.life <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
}

// --- Text Scramble Effect ---


// Start Everything
window.addEventListener('load', () => {
    initCursor();
    initCursorTrail(); // New trail

    initContactModal();
    initShowreelModal();
    // initAudioToggle(); // Removed
    initMagnetic();
    initNavigation();
    initCaseToggles();
    startLoader();
    setTimeout(initScrollAnimations, 1000);
});

// (cursor is now enabled via initCursor)
