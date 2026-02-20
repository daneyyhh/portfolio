import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
});

const Hero = () => {
    return (
        <section id="hero" className="hero-section">
            {/* Animated background grid */}
            <div className="hero-grid" aria-hidden="true" />

            {/* Floating orbs */}
            <div className="hero-orb hero-orb-1" aria-hidden="true" />
            <div className="hero-orb hero-orb-2" aria-hidden="true" />

            <div className="hero-inner">
                {/* Left column */}
                <div className="hero-left">
                    <motion.div {...fadeUp(0)} className="hero-eyebrow">
                        <span className="eyebrow-dot" />
                        GAME DEVELOPER · BCA FINAL YEAR
                    </motion.div>

                    <motion.h1 {...fadeUp(0.1)} className="hero-title">
                        REUBEN<br />
                        <span className="hero-title-accent">GAMER</span><br />
                        &amp; CODER.
                    </motion.h1>

                    <motion.p {...fadeUp(0.2)} className="hero-bio">
                        A hardcore gamer turned game developer — crafting Unity worlds,
                        FiveM servers, and Discord bots from Haripad's battlegrounds.
                        BCA finalist at Yenepoya University, fueled by C# and endless caffeine.
                    </motion.p>

                    <motion.div {...fadeUp(0.3)} className="hero-ctas">
                        <a href="#projects" className="btn-primary">
                            View Projects
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </a>
                        <a href="#contact" className="btn-ghost">Let's Talk</a>
                    </motion.div>

                    {/* Mini stats */}
                    <motion.div {...fadeUp(0.4)} className="hero-stats">
                        {[
                            { n: '3+', l: 'Years Dev' },
                            { n: '10+', l: 'Projects' },
                            { n: '100%', l: 'FiveM' },
                        ].map(s => (
                            <div key={s.l} className="hero-stat">
                                <span className="stat-num">{s.n}</span>
                                <span className="stat-lbl">{s.l}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right column — visual card */}
                <motion.div
                    className="hero-right"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
                >
                    <div className="hero-card">
                        {/* Card top bar */}
                        <div className="card-topbar">
                            <div className="topbar-dots">
                                <span /><span /><span />
                            </div>
                            <span className="topbar-label">REUBEN.PORTFOLIO</span>
                            <span className="topbar-status">ONLINE</span>
                        </div>

                        {/* Card body */}
                        <div className="card-body">
                            <div className="card-avatar">
                                <div className="avatar-ring" />
                                <div className="avatar-inner">
                                    <img
                                        src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Reuben&backgroundColor=1a1a2e"
                                        alt="Reuben Avatar"
                                        className="avatar-img"
                                    />
                                </div>
                                <div className="avatar-badge">LVL 27</div>
                            </div>

                            <div className="card-info">
                                <div className="card-name">REUBX_DEV</div>
                                <div className="card-class">Cyber-Architect</div>
                            </div>

                            {/* Skill bars */}
                            <div className="card-skills">
                                {[
                                    { n: 'FiveM', v: 100, c: '#ff6b00' },
                                    { n: 'Unity', v: 90, c: '#ccff00' },
                                    { n: 'React', v: 88, c: '#00f0ff' },
                                ].map(s => (
                                    <div key={s.n} className="skill-row">
                                        <span className="skill-name">{s.n}</span>
                                        <div className="skill-track">
                                            <motion.div
                                                className="skill-fill"
                                                style={{ background: s.c }}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${s.v}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                                            />
                                        </div>
                                        <span className="skill-val">{s.v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Card glow effect */}
                        <div className="card-glow" />
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="scroll-hint"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="scroll-hint-line" />
                <span>Scroll</span>
            </motion.div>
        </section>
    );
};

export default Hero;
