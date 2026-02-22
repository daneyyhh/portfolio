import React from 'react';
import { motion } from 'framer-motion';

const projectData = [
    {
        id: 'fm-1',
        name: 'FIVEM RESOURCES',
        description: 'Advanced server systems, scripts, and custom frameworks for the FiveM frontier.',
        category: 'LUA SYSTEMS',
        link: 'https://github.com/daneyyhh/fivem-resources',
    },
    {
        id: 'un-1',
        name: 'HAUNTED HOUSE',
        description: 'Survival horror experience in Unity. Navigate shadow and solve the void.',
        category: 'UNITY ENGINE',
        link: 'https://play.unity.com/en/games/aa0605eb-0e94-4d82-a4c3-6e1a8089744b/haunted-house',
    },
    {
        id: 'un-2',
        name: 'SPRITE FLIGHT',
        description: 'Fast-paced arcade action. Master the skies and claim your bounty.',
        category: 'C# PROJECT',
        link: 'https://play.unity.com/en/games/4d7cb2d6-141d-4a92-84f9-56f8f69d4bcf/spriteflight',
    },
    {
        id: 'dc-1',
        name: 'DISCORD BOTS',
        description: 'Automation and community management solutions for high-level operations.',
        category: 'NODE JS',
        link: 'https://github.com/daneyyhh',
    },
];

const QuestItem = ({ project, index }) => (
    <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="quest-item"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.8 }}
    >
        <div className="quest-category">{project.category}</div>
        <h3 className="quest-title">{project.name}</h3>
        <p className="quest-desc">{project.description}</p>
        <div className="quest-action" style={{ color: 'var(--tera-red)', fontSize: '1.2rem' }}>→</div>
    </motion.a>
);

const Projects = () => {
    return (
        <section id="projects" className="projects-section">
            <div className="section-inner">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <span className="section-label">CHAPTER III — MISSIONS</span>
                    <h2 className="section-title">ACTIVE <span style={{ color: 'var(--tera-red)' }}>QUESTS</span></h2>
                </motion.div>

                <div className="projects-grid">
                    {projectData.map((project, i) => (
                        <QuestItem key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
