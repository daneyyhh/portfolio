import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // 1. Title Pop - SLOW Neofont reveal
            tl.from('.gp-title', {
                scale: 0.5,
                opacity: 0,
                duration: 2.5,  // Slower for premium feel
                ease: 'back.out(1.7)',
                transformOrigin: 'center center'
            })
                // 2. Subtitle Pop - SLOW reveal
                .from('.gp-subtitle', {
                    scale: 0.8,
                    y: 20,
                    opacity: 0,
                    duration: 1.8,  // Slower duration
                    ease: 'back.out(1.5)'
                }, "-=0.8")
                // 3. Side Blocks Slide & Fade - SLOW
                .from('.gp-side-block', {
                    x: 50,
                    opacity: 0,
                    duration: 2.0,  // Slower animation
                    stagger: 0.4,      // Slower stagger
                    ease: 'power3.out'
                }, "-=0.6");
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="gp-hero" ref={heroRef}>
            <div className="container">
                <div className="gp-hero-top">
                    <div className="gp-hero-name">
                        <h1 className="gp-title">
                            <span className="reveal-line">Reuben</span>
                            <span className="reveal-line" style={{fontStyle: 'italic'}}>Binu George</span>
                        </h1>
                        <div className="gp-subtitle">
                            <span className="reveal-line">Gaming Enthusiast |</span>
                            <span className="reveal-line">Tech Explorer</span>
                        </div>
                    </div>

                    <div className="gp-hero-side">
                        <div className="gp-side-block">
                            <div className="gp-side-label">What I do</div>
                            <p className="gp-side-text">I create high-impact digital experiences for products, games, tools and websites.</p>
                        </div>
                        <div className="gp-side-block">
                            <div className="gp-side-label">Services</div>
                            <ul className="gp-services">
                                <li>Creative Direction & Strategy</li>
                                <li>UX / UI Design</li>
                                <li>Web Development</li>
                                <li>Realtime / Game Systems</li>
                                <li>Animation & Motion</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="gp-hero-bottom">
                    <div className="scroll-down-indicator">
                        <span className="scroll-text">SCROLL DOWN</span>
                        <div className="scroll-arrow">↓</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
