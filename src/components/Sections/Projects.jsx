import React from 'react';
import { motion } from 'framer-motion';

const projectData = [
    {
        id: 'fm-1',
        name: 'FIVEM RESOURCES',
        description: 'A complete suite of custom FiveM server scripts — jobs, vehicles, HUD, gangs, events, and much more. Battle-tested on the trail.',
        category: 'Lua · Systems',
        link: 'https://github.com/daneyyhh/fivem-resources',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 'un-1',
        name: 'HAUNTED HOUSE',
        description: 'A survival horror experience built in Unity. Navigate dark corridors, solve puzzles, and survive the terror lurking in every shadow.',
        category: 'Unity · C#',
        link: 'https://play.unity.com/en/games/aa0605eb-0e94-4d82-a4c3-6e1a8089744b/haunted-house',
        image: 'https://images.unsplash.com/photo-1604076913837-52ab5629fde9?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 'un-2',
        name: 'SPRITE FLIGHT',
        description: 'Arcade flight action built in Unity. Dodge incoming fire, master tight manoeuvres, and rack up the highest bounty possible.',
        category: 'Unity · C#',
        link: 'https://play.unity.com/en/games/4d7cb2d6-141d-4a92-84f9-56f8f69d4bcf/spriteflight',
        image: 'https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 'dc-1',
        name: 'DISCORD BOTS',
        description: 'Full-featured Discord bots managing esports communities — moderation, stats tracking, and live game integrations.',
        category: 'Node.js · JS',
        link: 'https://github.com/daneyyhh',
        image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=600&q=80',
    },
];

const ProjectCard = ({ project, index }) => (
    <motion.div
        className="rdr-project-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
    >
        <div
            className="project-card-image"
            style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="project-card-content">
            <span className="rdr-label" style={{ fontSize: '0.7rem', marginBottom: '10px', display: 'block' }}>REWARD: {project.category}</span>
            <h3 className="project-card-title">{project.name}</h3>
            <p className="project-card-desc">{project.description}</p>
            <div style={{ marginTop: '24px' }}>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-outline-rdr" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                    VIEW MISSION
                </a>
            </div>
        </div>
        {/* Distressed corner decoration */}
        <div className="hud-corner hud-tl" style={{ opacity: 0.3, width: 15, height: 15 }} />
        <div className="hud-corner hud-br" style={{ opacity: 0.3, width: 15, height: 15 }} />
    </motion.div>
);

const Projects = () => {
    return (
        <section id="projects" className="projects-section">
            <div className="section-inner">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <span className="section-label">CHAPTER THREE</span>
                    <h2 className="section-title">THE WANTED <span className="rdr-red">LIST</span></h2>
                </motion.div>

                <div className="projects-grid">
                    {projectData.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
