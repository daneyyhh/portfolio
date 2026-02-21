import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fivemProjects, unityProjects } from '../../data';

// ── Project config with images + ability icons ──────────────────
const projectData = [
    {
        id: 'fm-1',
        name: 'FIVEM\nRESOURCES',
        shortName: 'FIVEM',
        description: 'A complete suite of custom FiveM server scripts — jobs, vehicles, HUD, gangs, events, and much more. Battle-tested on live servers.',
        category: 'FiveM · Lua',
        tag: 'GAME MOD',
        link: 'https://github.com/daneyyhh/fivem-resources',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
        color: '#ff4655',
        abilities: ['⚡', '🎮', '🔧', '🌐'],
        abilityLabels: ['Scripts', 'Gameplay', 'Systems', 'Online'],
        basic: { name: 'Custom HUD', desc: 'Fully custom HUD overlays for immersive GTA roleplay servers.' },
        signature: { name: 'Gang System', desc: 'Dynamic gang territory control with real-time battles.' },
        ultimate: { name: 'Live Events', desc: 'Server-wide timed events driving player engagement 24/7.' },
    },
    {
        id: 'un-1',
        name: 'HAUNTED\nHOUSE',
        shortName: 'HAUNTED',
        description: 'A survival horror experience built in Unity. Navigate dark corridors, solve puzzles, and survive the terror lurking in every shadow.',
        category: 'Unity · C#',
        tag: 'HORROR GAME',
        link: 'https://play.unity.com/en/games/aa0605eb-0e94-4d82-a4c3-6e1a8089744b/haunted-house',
        image: 'https://images.unsplash.com/photo-1604076913837-52ab5629fde9?auto=format&fit=crop&w=600&q=80',
        color: '#a855f7',
        abilities: ['👻', '🔦', '🗝️', '💀'],
        abilityLabels: ['Horror', 'Explore', 'Puzzle', 'Survive'],
        basic: { name: 'Flashlight', desc: 'Dynamic lighting system casting real-time shadows through corridors.' },
        signature: { name: 'Puzzle Lock', desc: 'Environmental puzzles gate progress through the haunted mansion.' },
        ultimate: { name: 'Final Boss', desc: 'A climactic encounter at the heart of the haunted estate.' },
    },
    {
        id: 'un-2',
        name: 'SPRITE\nFLIGHT',
        shortName: 'SPRITE',
        description: 'Arcade flight action built in Unity. Dodge incoming fire, master tight manoeuvres, and rack up the highest score possible.',
        category: 'Unity · C#',
        tag: 'ARCADE GAME',
        link: 'https://play.unity.com/en/games/4d7cb2d6-141d-4a92-84f9-56f8f69d4bcf/spriteflight',
        image: 'https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?auto=format&fit=crop&w=600&q=80',
        color: '#22d3ee',
        abilities: ['✈️', '💥', '🏆', '⭐'],
        abilityLabels: ['Fly', 'Combat', 'Score', 'Stars'],
        basic: { name: 'Dodge Roll', desc: 'Barrel roll evasion mechanic to avoid incoming projectiles.' },
        signature: { name: 'Burst Fire', desc: 'Charge up rapid-fire bursts to shred enemy fighters.' },
        ultimate: { name: 'Hyperdrive', desc: 'Warp into overdrive — time slows, score multiplier maxes out.' },
    },
    {
        id: 'dc-1',
        name: 'DISCORD\nBOTS',
        shortName: 'DISCORD',
        description: 'Full-featured Discord bots managing esports communities — moderation, stats tracking, event scheduling, and live game integrations.',
        category: 'Node.js · JS',
        tag: 'BOT SUITE',
        link: 'https://github.com/daneyyhh',
        image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=600&q=80',
        color: '#5865f2',
        abilities: ['🤖', '📊', '🛡️', '⚙️'],
        abilityLabels: ['Automate', 'Stats', 'Mod', 'Config'],
        basic: { name: 'AutoMod', desc: 'Real-time AI moderation keeping servers clean automatically.' },
        signature: { name: 'Leaderboard', desc: 'Live ranked leaderboards tracking esports performance.' },
        ultimate: { name: 'Event Mode', desc: 'Tournament scheduler broadcasts and manages entire events.' },
    },
];

// ── Ability bar at bottom of card ──────────────────────────────
const AbilityBar = ({ abilities, abilityLabels, color }) => (
    <div className="agent-ability-bar">
        {abilities.map((icon, i) => (
            <div key={i} className="ability-item" title={abilityLabels[i]}>
                <span className="ability-icon">{icon}</span>
            </div>
        ))}
    </div>
);

// ── Skill detail row (BASIC / SIGNATURE / ULTIMATE) ─────────────
const SkillRow = ({ project }) => (
    <div className="agent-skills-row">
        {[
            { tier: 'BASIC', data: project.basic },
            { tier: 'SIGNATURE', data: project.signature },
            { tier: 'ULTIMATE', data: project.ultimate },
        ].map(({ tier, data }) => (
            <div key={tier} className="agent-skill-card">
                <span className="skill-tier">{tier}</span>
                <div
                    className="skill-icon-circle"
                    style={{ background: `${project.color}22`, borderColor: `${project.color}55` }}
                >
                    <span style={{ color: project.color, fontSize: '1.1rem' }}>
                        {tier === 'BASIC' ? '◆' : tier === 'SIGNATURE' ? '⬡' : '♦'}
                    </span>
                </div>
                <h4 className="skill-name">{data.name}</h4>
                <p className="skill-desc">{data.desc}</p>
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="skill-arrow"
                    style={{ color: project.color }}
                >
                    ▶
                </a>
            </div>
        ))}
    </div>
);

// ── Agent Card ─────────────────────────────────────────────────
const AgentCard = ({ project, isActive, onClick, index }) => (
    <motion.div
        className={`agent-card ${isActive ? 'agent-card--active' : ''}`}
        onClick={onClick}
        layout
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ '--card-color': project.color }}
    >
        {/* Top red accent */}
        <div className="agent-card-top-bar" style={{ background: isActive ? project.color : 'rgba(255,255,255,0.08)' }} />

        {/* Background image */}
        <div className="agent-card-img-wrap">
            <img src={project.image} alt={project.name} className="agent-card-img" />
            <div className="agent-card-img-gradient" style={{
                background: `linear-gradient(to top, ${project.color}44 0%, transparent 50%, rgba(7,13,19,0.4) 100%)`
            }} />
        </div>

        {/* Vertical project name */}
        <div className="agent-card-name-vertical" style={{ color: isActive ? project.color : 'rgba(255,255,255,0.12)' }}>
            {project.shortName}
        </div>

        {/* Tag */}
        <div className="agent-card-tag" style={{ background: project.color }}>
            {project.tag}
        </div>

        {/* Bottom: abilities + hover info */}
        <div className="agent-card-bottom">
            <AbilityBar abilities={project.abilities} abilityLabels={project.abilityLabels} color={project.color} />
        </div>

        {/* Active indicator */}
        {isActive && (
            <motion.div
                className="agent-card-active-line"
                layoutId="activeCardLine"
                style={{ background: project.color }}
            />
        )}
    </motion.div>
);

// ── Main Projects Section ──────────────────────────────────────
const Projects = () => {
    const [activeId, setActiveId] = useState('fm-1');
    const activeProject = projectData.find(p => p.id === activeId);

    return (
        <section id="projects" className="projects-section">
            <div className="projects-agents-wrap">

                {/* ── Header row ── */}
                <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div
                        className="section-eyebrow light"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <span className="eyebrow-line light" />
                        Chapter 03 — Active Missions
                        <span className="eyebrow-line light" />
                    </motion.div>

                    <div className="projects-header">
                        <motion.h2
                            className="section-title on-dark"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            ACTIVE<br />
                            <span className="title-red">MISSIONS</span>
                        </motion.h2>

                        <motion.p
                            style={{ fontFamily: 'var(--font-sub)', fontSize: '1rem', color: 'var(--val-muted)', maxWidth: '400px', lineHeight: 1.7 }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            Select a project to review its capabilities, stack, and mission briefing.
                        </motion.p>
                    </div>
                </div>

                {/* ── Agent Cards Carousel ── */}
                <div className="agents-carousel-wrap">
                    {/* "MISSIONS" vertical text left */}
                    <div className="agents-vertical-label">MISSIONS</div>

                    {/* Cards row */}
                    <div className="agents-cards-row">
                        {projectData.map((project, i) => (
                            <AgentCard
                                key={project.id}
                                project={project}
                                isActive={activeId === project.id}
                                onClick={() => setActiveId(project.id)}
                                index={i}
                            />
                        ))}
                    </div>
                </div>

                {/* ── Skill Detail Row ── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeId}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35 }}
                        className="section-inner"
                        style={{ position: 'relative', zIndex: 2 }}
                    >
                        {/* Active project detail header */}
                        <div className="agent-detail-header">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--val-faint)', textTransform: 'uppercase' }}>
                                    {activeProject.category}
                                </span>
                                <h3 className="agent-detail-name" style={{ color: activeProject.color }}>
                                    {activeProject.name.replace('\n', ' ')}
                                </h3>
                                <p style={{ fontFamily: 'var(--font-sub)', fontSize: '0.9rem', color: 'var(--val-muted)', maxWidth: '520px', lineHeight: 1.65 }}>
                                    {activeProject.description}
                                </p>
                            </div>
                            <a
                                href={activeProject.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-red"
                                style={{ background: activeProject.color, flexShrink: 0, alignSelf: 'flex-start' }}
                            >
                                {activeProject.tag.includes('GAME') ? 'PLAY NOW' : 'VIEW CODE'}
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>

                        {/* Skill cards */}
                        <SkillRow project={activeProject} />
                    </motion.div>
                </AnimatePresence>

            </div>

            {/* Ghost bg text */}
            <div className="projects-bg-text" aria-hidden="true">MISSIONS</div>
        </section>
    );
};

export default Projects;
