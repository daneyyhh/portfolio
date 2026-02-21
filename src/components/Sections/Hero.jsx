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
                        <a href="#portfolio" className="nav-link-cyber">PORT</a>
                        <span className="nav-separator">|</span>
                        <a href="#build" className="nav-link-cyber">BUILD</a>
                        <span className="nav-separator">|</span>
                        <a href="#play" className="nav-link-cyber">PLAY</a>
                    </div>
                </motion.div>

                {/* ── TOP-LEFT LOGO ── */}
                <motion.div {...fadeUp(0.1)} className="hero-logo">
                    <div className="logo-circle">
                        <span className="logo-text">REUBEN</span>
                    </div>
                </motion.div>

                {/* ── CENTERED TITLE ── */}
                <motion.div {...fadeUp(0.08)} className="hero-centered-title">
                    <h1 className="hero-title-cyber hot-pink">REUBEN</h1>
                </motion.div>

                {/* ── LEFT: Stats and CTAs ── */}
                <div className="hero-left">
                    <motion.div {...fadeUp(0.26)} className="hero-stats-cyber">
                        {[
                            { n: '3+', l: 'Projects' },
                            { n: '18', l: 'Bots' },
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
                    <motion.div {...fadeUp(0.12)} className="hero-right-stack">
                        <span className="stacked-neon-coder">NEON</span>
                        <span className="stacked-neon-coder">CODER</span>
                    </motion.div>

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

                        {/* Floating modular icons grid */}
                        <div className="modular-icons-grid">
                            {[
                                '⚡', '▲', '▶', '▼', '◀', '⚠', 'Δ', '04', 'Q1', 'MODULAR', 'NODE', 'V+HP', 'GRM734', 'PROMGEAR'
                            ].map((icon, i) => (
                                <div key={i} className="modular-icon" style={{ animationDelay: `${i * 0.2}s` }}>
                                    {icon}
                                </div>
                            ))}
                        </div>

                        {/* Glitch typography overlay */}
                        <div className="hero-glitch-text" aria-hidden="true">
                            NEON CODER
                        </div>
                    </motion.div>
                </div>

                {/* Lower mascots */}
                {/*
                <div className="lower-mascots">
                    <div className="mascot-vega">
                        <span className="mascot-text">VEGA-GIS</span>
                    </div>
                    <div className="mascot-gamer">
                        <span className="mascot-emoji">👩‍💻</span>
                    </div>
                </div>
                */}
            </div>

            {/* ── BOTTOM: Video Frame ── */}
            <motion.div {...fadeUp(0.4)} className="hero-video-frame">
                <video
                    className="hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
                >
                    <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="video-overlay">
                    <span className="video-label">PROFESSIONAL SHOWCASE</span>
                </div>
            </motion.div>

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
