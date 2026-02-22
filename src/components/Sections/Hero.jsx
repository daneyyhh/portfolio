import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="hero" className="hero-section hero-ignition">
            {/* Background grain from CSS */}
            <div className="hero-dot-grid" aria-hidden="true" />

            <div className="hero-ignition-grid">
                {/* LEFT: Character Silhouette Area */}
                <motion.div
                    className="hero-char-col"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    {/* Character image - Using a silhouette for now as placeholder or Arthur style image */}
                    <img
                        src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/arthur-morgan-red-dead-redemption-2-clarence-low.jpg"
                        alt="Reuben"
                        className="hero-char-full"
                        onError={(e) => { e.target.src = "https://i.pinimg.com/originals/91/9f/6e/919f6eeb3f4d607e4d5885f8e5884860.png" }}
                    />
                </motion.div>

                {/* RIGHT: Content Area */}
                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <h1 className="hero-title">
                            <span>REUBEN</span>
                            <span>DEVELOPER</span>
                        </h1>

                        {/* Red Band Style for Tagline or Quote */}
                        <motion.div
                            className="hero-red-band"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 0.6, ease: "circOut" }}
                            style={{
                                background: 'var(--rdr-red)',
                                padding: '20px 40px',
                                margin: '40px 0',
                                transformOrigin: 'left',
                                width: 'fit-content',
                                minWidth: '400px'
                            }}
                        >
                            <p style={{
                                fontFamily: 'var(--font-title)',
                                fontSize: '1.5rem',
                                color: '#fff',
                                letterSpacing: '0.1em'
                            }}>
                                "CODE IS THE LAW... UNTIL IT BREAKS."
                            </p>
                        </motion.div>

                        <p className="hero-subtitle">
                            Building digital frontiers with FiveM, Unity, and React.
                            An outlaw developer in a world of high-tech and low-lives.
                        </p>

                        <div className="hero-actions">
                            <a href="#projects" className="btn-rdr">WANTED PROJECTS</a>
                            <a href="#about" className="btn-outline-rdr">MY STORY</a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Hint */}
            <div className="scroll-hint" style={{ color: 'var(--rdr-red)' }}>
                <div className="scroll-hint-line" style={{ background: 'var(--rdr-red)' }} />
                RIDE DOWN
            </div>
        </section>
    );
};

export default Hero;
