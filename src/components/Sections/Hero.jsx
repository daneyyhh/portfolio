import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 36 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay },
});

const Hero = () => {
    return (
        <section id="hero" className="hero-section">
            <div className="hero-inner">
                {/* ── TOP NAV ── */}
                <motion.div {...fadeUp(0)} className="hero-top-nav">
                    <div className="hero-nav-links">
                        <a href="#about" className="nav-link-cyber">ABOUT</a>
                        <span className="nav-separator">|</span>
                        <a href="#blog" className="nav-link-cyber">BLOG</a>
                        <span className="nav-separator">|</span>
                        <a href="#play" className="nav-link-cyber">PLAY</a>
                    </div>
                </motion.div>

                {/* ── LEFT: Text ── */}
                <div className="hero-left">
                    <motion.div {...fadeUp(0.08)} className="hero-title-cyber">
                        <h1 className="hero-title-cyber glitch" data-text="REUBEN">REUBEN</h1>
                    </motion.div>

                    <motion.div {...fadeUp(0.14)} className="hero-subtitle">
                        <span className="subtitle-text">NEON CODER</span>
                        <span className="subtitle-level">LVL 21</span>
                        <div className="level-badge">↑</div>
                    </motion.div>

                    <motion.p {...fadeUp(0.2)} className="hero-tagline">
                        Build your code, design your future yourself
                    </motion.p>

                    <motion.div {...fadeUp(0.26)} className="hero-stats-cyber">
                        {[
                            { n: '3+', l: 'Projects' },
                            { n: '12', l: 'Bots' },
                            { n: '100%', l: 'Uptime' },
                        ].map(s => (
                            <div key={s.l} className="stat-badge-cyber">
                                <span className="stat-val-cyber">{s.n}</span>
                                <span className="stat-label-cyber">{s.l}</span>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div {...fadeUp(0.34)} className="hero-ctas-cyber">
                        <a href="#projects" className="btn-cyber-red">
                            VIEW PORTFOLIO
                        </a>
                        <a href="#contact" className="btn-cyber-red">
                            GET IN TOUCH
                        </a>
                    </motion.div>
                </div>

                {/* ── RIGHT: Character ── */}
                <div className="hero-right">
                    <motion.div
                        className="hero-char-wrap"
                        initial={{ opacity: 0, scale: 0.92, x: 30 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
                    >
                        {/* Floating 3D Neon Coder helmet */}
                        <div className="hero-helmet-3d">
                            <img
                                src="https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?auto=format&fit=crop&w=800&q=85"
                                alt="Neon Coder Helmet"
                                className="hero-char-img"
                                loading="eager"
                            />
                        </div>

                        {/* Anime mascot for PLAY */}
                        <div className="play-mascot">
                            <span className="mascot-emoji">🎮</span>
                        </div>

                        {/* Glitch typography overlay */}
                        <div className="hero-glitch-text" aria-hidden="true">
                            NEON CODER
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scanlines effect */}
            <div className="scanlines" aria-hidden="true"></div>

            {/* Scroll hint */}
            <motion.div
                className="scroll-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                <div className="scroll-hint-line" />
                Scroll Down
            </motion.div>
        </section>
    );
};

export default Hero;
