import React from 'react';
import { motion } from 'framer-motion';

const projectData = [
    {
        id: 'fm-1',
        title: 'THE FIVE-M CHRONICLES',
        desc: 'Advanced LUA systems for legendary servers.',
        color: '#ffde00',
        link: 'https://github.com/daneyyhh/fivem-resources',
        img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'un-1',
        title: 'HAUNTED CODE',
        desc: 'A Unity horror experience written in C#.',
        color: '#ff0000',
        link: 'https://play.unity.com/en/games/aa0605eb-0e94-4d82-a4c3-6e1a8089744b/haunted-house',
        img: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'un-2',
        title: 'SPRITE ENGINE',
        desc: 'High-octane arcade action systems.',
        color: '#00ccff',
        link: 'https://play.unity.com/en/games/4d7cb2d6-141d-4a92-84f9-56f8f69d4bcf/spriteflight',
        img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'dc-1',
        title: 'BOT LEGACY',
        desc: 'The ultimate Discord automation tool.',
        color: '#ffffff',
        link: 'https://github.com/daneyyhh',
        img: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=600&q=80'
    }
];

const ProjectCard = ({ project, index }) => (
    <motion.div
        className="project-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
    >
        <div className="project-img-panel">
            <img src={project.img} alt={project.title} />
            <div className="caption-box" style={{ position: 'absolute', top: 5, left: 5, fontSize: '0.6rem', padding: '2px 8px' }}>
                CASE #{index + 100}
            </div>
            {/* Sticker Extra */}
            <div style={{
                position: 'absolute',
                bottom: -10,
                right: -10,
                background: '#ff0000',
                color: '#fff',
                fontFamily: 'var(--font-accent)',
                padding: '4px 12px',
                transform: 'rotate(-15deg)',
                border: '2px solid #000',
                fontSize: '0.8rem',
                zIndex: 10
            }}>
                TOP SECRET
            </div>
        </div>
        <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem', marginBottom: '10px' }}>{project.title}</h3>
        <p style={{ fontSize: '0.8rem', marginBottom: '20px', minHeight: '40px' }}>{project.desc}</p>
        <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-comic"
            style={{
                display: 'block',
                textAlign: 'center',
                fontSize: '0.9rem',
                width: '100%',
                padding: '12px',
                background: project.color === '#ffffff' ? 'var(--comic-accent)' : project.color
            }}
        >
            OPEN MISSION
        </a>
    </motion.div>
);

const Projects = () => {
    return (
        <section id="projects" className="projects-section">
            <div style={{ marginBottom: '60px' }}>
                <span className="caption-box">GALLERY OF WORK</span>
                <h2 className="section-title" data-text="MISSIONS">MISSIONS</h2>
            </div>

            <div className="projects-grid">
                {projectData.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
