import React from 'react';
import { motion } from 'framer-motion';

const projectData = [
    {
        id: 'fm-1',
        title: 'FiveM Chronicles',
        desc: 'Advanced LUA systems and optimizations for legendary roleplay servers.',
        tags: ['Lua', 'Node.js', 'SQL'],
        link: 'https://github.com/daneyyhh/fivem-resources',
        img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'un-1',
        title: 'Haunted Code',
        desc: 'A Unity horror experience written in C# with dynamic lighting.',
        tags: ['Unity', 'C#', '3D'],
        link: 'https://play.unity.com/en/games/aa0605eb-0e94-4d82-a4c3-6e1a8089744b/haunted-house',
        img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'un-2',
        title: 'Sprite Engine',
        desc: 'High-octane arcade action systems and particle effects.',
        tags: ['Unity', 'C#'],
        link: 'https://play.unity.com/en/games/4d7cb2d6-141d-4a92-84f9-56f8f69d4bcf/spriteflight',
        img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'dc-1',
        title: 'Bot Legacy',
        desc: 'The ultimate Discord automation tool with advanced permissions routing.',
        tags: ['Discord.js', 'Redis', 'Express'],
        link: 'https://github.com/daneyyhh',
        img: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=800&q=80'
    }
];

const ProjectCard = ({ project, index }) => (
    <motion.div
        className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: index * 0.1 }}
    >
        <div className="relative h-60 overflow-hidden">
            <div className="absolute inset-0 bg-indigo-500/20 mix-blend-overlay group-hover:bg-transparent transition-colors z-10 duration-500"></div>
            <img 
                src={project.img} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
            />
        </div>
        
        <div className="p-8">
            <h3 className="text-2xl font-outfit font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{project.title}</h3>
            <p className="text-gray-400 text-sm mb-6 min-h-[40px] leading-relaxed">{project.desc}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold px-3 py-1 bg-white/5 border border-white/10 rounded-full text-indigo-300">
                        {tag}
                    </span>
                ))}
            </div>
            
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-indigo-400 transition-colors"
                onClick={(e) => e.stopPropagation()}
            >
                View Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
        </div>
    </motion.div>
);

const Projects = () => {
    return (
        <section id="projects" className="py-24 px-6 sm:px-12 relative z-10 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <span className="text-sm text-indigo-400 font-semibold tracking-widest uppercase mb-3 block">Gallery Of Work</span>
                    <h2 className="text-4xl md:text-6xl font-outfit font-bold text-white max-w-2xl leading-tight">Featured <br /> <span className="text-gradient">Case Studies</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projectData.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
