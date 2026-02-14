import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
// Components
import Header from './components/Layout/Header.jsx';
import Hero from './components/Sections/Hero.jsx';
import About from './components/Sections/About.jsx';
import Projects from './components/Sections/Projects.jsx';
import Articles from './components/Sections/Articles.jsx';
import Contact from './components/Sections/Contact.jsx';
import Footer from './components/Layout/Footer.jsx';
import Particles from './components/UI/Particles.jsx';

// Styles
import './style.css';

import Loader from './components/UI/Loader.jsx';

// Register Plugins
gsap.registerPlugin(ScrollTrigger);

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 2.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureDirection: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.8,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Custom Cursor Logic
        const cursor = document.querySelector('.cursor');
        const cursorDot = document.querySelector('.cursor-dot');

        if (cursor && cursorDot) {
            const onMouseMove = (e) => {
                gsap.to(cursorDot, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.1,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
                gsap.to(cursor, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.5,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            };

            window.addEventListener('mousemove', onMouseMove);

            // Hover effects
            const onMouseEnter = () => {
                cursor.classList.add('active');
                cursorDot.classList.add('active');
                document.body.classList.add('cursor-hover');
            };

            const onMouseLeave = () => {
                cursor.classList.remove('active');
                cursorDot.classList.remove('active');
                document.body.classList.remove('cursor-hover');
            };

            const addHoverListeners = () => {
                const interactiveElements = document.querySelectorAll('a, button, input, textarea, .gp-case-hit, .gp-case');
                interactiveElements.forEach(el => {
                    el.addEventListener('mouseenter', onMouseEnter);
                    el.addEventListener('mouseleave', onMouseLeave);
                });
            };

            // Call immediately and potentially on updates
            addHoverListeners();

            return () => {
                window.removeEventListener('mousemove', onMouseMove);
                const interactiveElements = document.querySelectorAll('a, button, input, textarea, .gp-case-hit, .gp-case');
                interactiveElements.forEach(el => {
                    el.removeEventListener('mouseenter', onMouseEnter);
                    el.removeEventListener('mouseleave', onMouseLeave);
                });
                lenis.destroy();
            };
        }
    }, []);

    return (
        <div className="site-wrapper">
            {/* Cursor Elements - recreated here if they were outside in index.html, 
                 but keeping them in markup or creating them here is fine. 
                 Since index.html was cleared, we add them here. 
             */}
            <div className="cursor" aria-hidden="true"></div>
            <div className="cursor-dot" aria-hidden="true"></div>

            <Loader onComplete={() => setLoading(false)} />
            {!loading && <Particles />}

            <Header />

            <main id="main-content">
                <Hero />
                <About />
                <Projects />
                <Articles />
                <Contact />
                <Footer />
            </main>
        </div>
    );
};

export default App;
