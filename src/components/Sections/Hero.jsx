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

                {/* ── TOP BREADCRUMB ── */}
                <motion.div {...fadeUp(0)} className="hero-top-nav">
                    <div className="hero-nav-links">
                        <a href="#about" className="nav-link-cyber">PORTFOLIO</a>
                        <span className="nav-separator">|</span>
                        <a href="#projects" className="nav-link-cyber">PROJECTS</a>
                        <span className="nav-separator">|</span>
                        <a href="#contact" className="nav-link-cyber">CONTACT</a>
                    </div>
                    {/* Serial number detail */}
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.18em', color: 'var(--val-faint)', marginLeft: 'auto' }}>
                        X139 // BUILD 2025
                    </span>
                </motion.div>

                {/* ── LOGO ── */}
                <motion.div {...fadeUp(0.05)} className="hero-logo">
                    <div className="logo-circle">
                        <span className="logo-text">R</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--val-faint)', textTransform: 'uppercase' }}>
                        Reuben · Dev Portfolio
                    </span>
                </motion.div>

                {/* ── MAIN TITLE — left col ── */}
                <div className="hero-centered-title">
                    <motion.div {...fadeUp(0.08)} className="hero-eyebrow-label">
                        EPISODE 01 // IGNITION
                    </motion.div>
                    <motion.h1
                        className="hero-title-cyber"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                    >
                        REUBEN<br />
                        <span style={{ color: 'var(--val-red)', textShadow: '0 0 60px rgba(255,70,85,0.4)' }}>CODES</span>
                    </motion.h1>
                </div>

                {/* ── LEFT: Stats + CTAs ── */}
                <div className="hero-left">
                    <motion.div {...fadeUp(0.22)} className="hero-stats-cyber">
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

                    <motion.div {...fadeUp(0.30)} className="hero-ctas-cyber">
                        <a href="#projects" className="btn-red">
                            VIEW WORK
                        </a>
                        <a href="#contact" className="btn-outline-dark">
                            GET IN TOUCH
                        </a>
                    </motion.div>

                    {/* Sub­text below CTA */}
                    <motion.p
                        {...fadeUp(0.36)}
                        style={{ fontFamily: 'var(--font-sub)', fontSize: '0.88rem', color: 'var(--val-muted)', lineHeight: 1.7, maxWidth: '400px' }}
                    >
                        FiveM Developer · Unity Game Creator · Discord Bot Engineer.
                        Building immersive experiences from Haripad.
                    </motion.p>
                </div>

                {/* ── RIGHT: Character art ── */}
                <div className="hero-right">
                    {/* Red dot decorations */}
                    <div className="hero-red-dots" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                        {[
                            { top: '10%', left: '5%', delay: '0s' },
                            { top: '25%', right: '8%', delay: '0.6s' },
                            { bottom: '30%', left: '8%', delay: '1.2s' },
                            { bottom: '15%', right: '12%', delay: '0.3s' },
                            { top: '55%', left: '2%', delay: '1.8s' },
                        ].map((pos, i) => (
                            <span
                                key={i}
                                className="red-dot"
                                style={{ ...pos, animationDelay: pos.delay }}
                            />
                        ))}
                    </div>

                    <motion.div
                        className="hero-char-wrap"
                        initial={{ opacity: 0, scale: 0.94, x: 40 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
                    >
                        <div className="hero-helmet-3d">
                            <img
                                src="https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?auto=format&fit=crop&w=800&q=85"
                                alt="Developer"
                                className="hero-char-img"
                                loading="eager"
                            />
                        </div>

                        {/* Tactical icon grid */}
                        <div className="modular-icons-grid">
                            {['⚡', '▲', '▶', '▼', '◀', '⚠', 'Δ', '04', 'NODE'].map((icon, i) => (
                                <div key={i} className="modular-icon" style={{ animationDelay: `${i * 0.22}s` }}>
                                    {icon}
                                </div>
                            ))}
                        </div>

                        {/* Glitch label */}
                        <div className="hero-glitch-text">
                            S/N 48-1508F ▶
                        </div>
                    </motion.div>
                </div>

                {/* ── BOTTOM: Video ── */}
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
                    </video>
                    <div className="video-overlay">
                        <span className="video-label">NIGHT PERFORMANCE // LIVE SHOWCASE</span>
                    </div>
                </motion.div>

            </div>

            {/* Scanlines */}
            <div className="scanlines" aria-hidden="true" />

            {/* Scroll hint */}
            <motion.div
                className="scroll-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
            >
                <div className="scroll-hint-line" />
                Scroll
            </motion.div>
        </section>
    );
};

export default Hero;
