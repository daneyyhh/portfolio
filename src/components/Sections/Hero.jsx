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
                {/* ── LEFT: Text ── */}
                <div className="hero-left">
                    <motion.div {...fadeUp(0)} className="hero-kicker">
                        <span className="hero-kicker-bar" />
                        Game Dev · Unity · FiveM
                    </motion.div>

                    <motion.h1 {...fadeUp(0.08)} className="hero-title">
                        REUBEN
                    </motion.h1>

                    <motion.div {...fadeUp(0.14)} className="hero-title-sub">
                        FUTURE&nbsp;FRONTIER
                    </motion.div>

                    <motion.p {...fadeUp(0.2)} className="hero-desc">
                        It's time to level up. A hardcore gamer and relentless developer,
                        I craft Unity worlds, dominate FiveM servers, and build tools that rule.
                        Write your own story — one commit at a time.
                    </motion.p>

                    <motion.div {...fadeUp(0.26)} className="hero-ctas">
                        <a href="#projects" className="btn-yellow">
                            View Projects
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </a>
                        <a href="#contact" className="btn-outline-dark">Start Now</a>
                    </motion.div>

                    <motion.div {...fadeUp(0.34)} className="hero-stats-row">
                        {[
                            { n: '3+', l: 'Years Dev' },
                            { n: '10+', l: 'Projects' },
                            { n: '100%', l: 'FiveM' },
                        ].map(s => (
                            <div key={s.l} className="hero-stat-item">
                                <span className="stat-big">{s.n}</span>
                                <span className="stat-tiny">{s.l}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* ── RIGHT: Character card ── */}
                <div className="hero-right">
                    <motion.div
                        className="hero-char-wrap"
                        initial={{ opacity: 0, scale: 0.92, x: 30 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
                    >
                        {/* Yellow glow splash behind image */}
                        <div className="hero-ink-splash" aria-hidden="true" />

                        {/* Character image */}
                        <img
                            src="https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?auto=format&fit=crop&w=800&q=85"
                            alt="Reuben — Game Developer"
                            className="hero-char-img"
                            loading="eager"
                        />

                        {/* Grunge name overlay */}
                        <div className="hero-grunge-text" aria-hidden="true">
                            REUBEN
                        </div>

                        {/* Info card (top-right) */}
                        <motion.div
                            className="hero-info-card"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.6 }}
                        >
                            <div className="info-card-label">Status</div>
                            <div className="info-card-val">LVL 27</div>
                            <div className="info-card-badge">
                                <span className="badge-dot" />
                                ONLINE
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

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
