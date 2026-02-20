import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fivemProjects, unityProjects } from '../../data';

const tags = ['All', 'FiveM', 'Unity'];

const ProjectCard = ({ project, index }) => (
    <motion.article
        className="project-card"
        layout
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
        <div className="card-accent-bar" style={{ background: project.accent }} />
        <div className="project-card-inner">
            <div className="project-card-header">
                <span className="project-category">{project.category}</span>
                <span className="project-tag-badge">{project.tag}</span>
            </div>
            <h3 className="project-name">{project.name}</h3>
            <p className="project-desc">{project.description}</p>
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-cta"
            >
                {project.link.includes('unity.com') ? 'Play Now' : 'View Code'}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <div className="project-card-glow" style={{ background: project.accent }} />
        </div>
    </motion.article>
);

const Projects = () => {
    const [activeTag, setActiveTag] = useState('All');
    const allProjects = [...fivemProjects, ...unityProjects];
    const filtered = activeTag === 'All' ? allProjects
        : activeTag === 'FiveM' ? fivemProjects
            : unityProjects;

    return (
        <section id="projects" className="projects-section">
            <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
                <motion.div
                    className="section-eyebrow light"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <span className="eyebrow-line light" />
                    Chapter 03 — Projects
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
                        <span className="title-yellow">MISSIONS</span>
                    </motion.h2>

                    <motion.div
                        className="project-filters"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        {tags.map(t => (
                            <button
                                key={t}
                                className={`filter-pill ${activeTag === t ? 'active' : ''}`}
                                onClick={() => setActiveTag(t)}
                            >
                                {t}
                            </button>
                        ))}
                    </motion.div>
                </div>

                <motion.div className="projects-grid" layout>
                    <AnimatePresence mode="popLayout">
                        {filtered.map((p, i) => (
                            <ProjectCard key={p.id} project={p} index={i} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
            <div className="projects-bg-text" aria-hidden="true">MISSIONS</div>
        </section>
    );
};

export default Projects;
