import React from 'react';
import { motion } from 'framer-motion';

const stagger = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
});

/* Skills shown in the brand-logo grid (replacing sponsors) */
const skills = [
    { name: 'FiveM', icon: '🎮' },
    { name: 'Lua', icon: '🔧' },
    { name: 'Unity', icon: '🎯' },
    { name: 'C#', icon: '⚡' },
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Discord', icon: '💬' },
    { name: 'GitHub', icon: '🐙' },
    { name: 'JS', icon: '🌐' },
];

const Hero = () => (
    <section id="hero" className="hero-section hero-ignition">

        {/* ── Background white slash ── */}
        <div className="hero-white-slash" aria-hidden="true" />

        {/* ── Dot grid ── */}
        <div className="hero-dot-grid" aria-hidden="true" />

        {/* ── Scanlines ── */}
        <div className="scanlines" aria-hidden="true" />

        {/* ── Main hero grid ── */}
        <div className="hero-ignition-grid">

            {/* LEFT: Character art bleeds off edge */}
            <motion.div
                className="hero-char-col"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
            >
                <img
                    src="https://images.unsplash.com/photo-1535223289429-a8e95f0fd2ef?auto=format&fit=crop&w=800&q=90"
                    alt="Developer"
                    className="hero-char-full"
                />
                {/* Red glow behind character */}
                <div className="hero-char-glow" />
            </motion.div>

            {/* CENTER: Branding + skill grid */}
            <div className="hero-center-col">

                {/* Top mini-title */}
                <motion.div className="hero-mini-tag" {...stagger(0.2)}>
                    <span className="hero-mini-slash">/</span>
                    <span>DEV × CREATOR</span>
                </motion.div>

                {/* Main branding logo */}
                <motion.div className="hero-brand-logo" {...stagger(0.28)}>
                    <div className="hero-brand-icon">
                        {/* V-chevron */}
                        <svg viewBox="0 0 32 28" fill="none" width="32" height="28">
                            <path d="M0 0L16 28L32 0H24L16 16L8 0H0Z" fill="#ff4655" />
                        </svg>
                    </div>
                    <span className="hero-brand-name">REUBEN</span>
                </motion.div>

                {/* Repeated tagline rows (like "100 THIEVES X DEFEAT" rows) */}
                <motion.div className="hero-tagline-rows" {...stagger(0.34)}>
                    {['REUBEN × FIVEM', 'REUBEN × UNITY', 'REUBEN × REACT'].map(t => (
                        <div key={t} className="hero-tagline-row">{t}</div>
                    ))}
                </motion.div>

                {/* Skill icon grid (like the sponsor logo grid) */}
                <motion.div className="hero-skills-grid" {...stagger(0.42)}>
                    {skills.map((s, i) => (
                        <motion.div
                            key={s.name}
                            className="hero-skill-tile"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.44 + i * 0.045, duration: 0.4 }}
                            whileHover={{ scale: 1.08, borderColor: 'rgba(255,70,85,0.6)' }}
                        >
                            <span className="hero-skill-icon">{s.icon}</span>
                            <span className="hero-skill-name">{s.name}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA buttons */}
                <motion.div className="hero-cta-row" {...stagger(0.52)}>
                    <a href="#projects" className="btn-red">VIEW MISSIONS</a>
                    <a href="#about" className="btn-outline-dark">ABOUT ME</a>
                </motion.div>
            </div>

            {/* RIGHT: Giant vertical "REUBEN" text */}
            <motion.div
                className="hero-vertical-name-col"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
                aria-hidden="true"
            >
                {'REUBEN'.split('').map((letter, i) => (
                    <motion.span
                        key={i}
                        className="hero-vert-letter"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
                    >
                        {letter}
                    </motion.span>
                ))}
            </motion.div>

        </div>

        {/* Scroll hint */}
        <motion.div
            className="scroll-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
        >
            <div className="scroll-hint-line" />
            SCROLL
        </motion.div>

    </section>
);

export default Hero;
