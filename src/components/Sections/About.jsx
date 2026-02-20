import React from 'react';
import { motion } from 'framer-motion';
import { stats } from '../../data';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
});

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="section-inner">
                {/* Section label */}
                <motion.div {...fadeUp(0)} className="section-eyebrow">
                    <span className="eyebrow-line" />
                    CHAPTER 02
                    <span className="eyebrow-line" />
                </motion.div>

                <div className="about-grid">
                    {/* Left: Bio */}
                    <div className="about-text">
                        <motion.h2 {...fadeUp(0.05)} className="section-title">
                            ABOUT<br />
                            <span className="title-accent">ME</span>
                        </motion.h2>

                        <motion.div {...fadeUp(0.15)} className="about-bio-block">
                            <p className="about-bio">
                                A hardcore gamer and relentless game developer, grinding final-year BCA
                                at <strong>Yenepoya University</strong> to craft addictive Unity worlds fueled by C# fury.
                            </p>
                            <p className="about-bio">
                                From Haripad's battlegrounds, I dominate with AI chess engines,
                                FiveM mayhem servers, and Discord bots that rule esports empires 24/7.
                            </p>
                            <p className="about-bio">
                                Every raid in BGMI, Fortnite drop, or CoD clutch sharpens my code — I'm the
                                raid boss scripting immersive chaos and glitch-free 3D spectacles.
                            </p>
                        </motion.div>

                        <motion.div {...fadeUp(0.25)} className="about-tags">
                            {['Unity', 'C#', 'React', 'Lua', 'FiveM', 'Node.js', 'Game Design', 'JS'].map(t => (
                                <span key={t} className="about-tag">{t}</span>
                            ))}
                        </motion.div>

                        <motion.div {...fadeUp(0.3)} className="about-links">
                            <a
                                href="https://github.com/daneyyhh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="about-link-btn"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" /></svg>
                                GitHub
                            </a>
                            <a href="mailto:ftreuben1520@gmail.com" className="about-link-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                Email
                            </a>
                        </motion.div>
                    </div>

                    {/* Right: Stats grid */}
                    <div className="about-stats-grid">
                        {stats.map((s, i) => (
                            <motion.div
                                key={s.label}
                                className="stat-card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i + 0.2, duration: 0.5 }}
                                whileHover={{ scale: 1.06, y: -4 }}
                            >
                                <span className="stat-card-val">{s.value}</span>
                                <span className="stat-card-lbl">{s.label}</span>
                                <div className="stat-card-glow" />
                            </motion.div>
                        ))}

                        {/* Education card */}
                        <motion.div
                            className="stat-card edu-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <div className="edu-icon">🎓</div>
                            <div className="edu-info">
                                <span className="edu-deg">BCA Final Year</span>
                                <span className="edu-uni">Yenepoya University</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
