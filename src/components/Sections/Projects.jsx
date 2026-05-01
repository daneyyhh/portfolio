import React from 'react';
import { motion } from 'framer-motion';

const projectData = [
    {
        id: 'fm-1',
        title: 'FiveM Chronicles',
        desc: 'Advanced LUA systems and optimizations for legendary roleplay servers.',
        tags: ['Lua', 'Node.js', 'SQL'],
        link: 'https://github.com/daneyyhh/fivem-resources',
        img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
        rotate: -2
    },
    {
        id: 'un-1',
        title: 'Haunted Code',
        desc: 'A Unity horror experience written in C# with dynamic lighting.',
        tags: ['Unity', 'C#', '3D'],
        link: 'https://play.unity.com/en/games/aa0605eb-0e94-4d82-a4c3-6e1a8089744b/haunted-house',
        img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        rotate: 3
    },
    {
        id: 'un-2',
        title: 'Sprite Engine',
        desc: 'High-octane arcade action systems and particle effects.',
        tags: ['Unity', 'C#'],
        link: 'https://play.unity.com/en/games/4d7cb2d6-141d-4a92-84f9-56f8f69d4bcf/spriteflight',
        img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
        rotate: -1
    },
    {
        id: 'dc-1',
        title: 'Bot Legacy',
        desc: 'The ultimate Discord automation tool with advanced permissions routing.',
        tags: ['Discord.js', 'Redis', 'Express'],
        link: 'https://github.com/daneyyhh',
        img: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=800&q=80',
        rotate: 2
    }
];

const ProjectCard = ({ project, index }) => (
    <motion.div
        className="relative group cursor-pointer"
        initial={{ opacity: 0, y: 50, rotate: project.rotate * 2 }}
        whileInView={{ opacity: 1, y: 0, rotate: project.rotate }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
        {/* Comic Panel Shadow */}
        <div className="absolute inset-0 bg-spider-black translate-x-3 translate-y-3 -z-10"></div>
        
        {/* Main Panel */}
        <div className="bg-spider-white border-4 border-spider-black overflow-hidden relative">
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden border-b-4 border-spider-black spider-scanline">
                <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover filter contrast-125 saturate-150 grayscale-0.5 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none"></div>
                <div className="absolute inset-0 spider-scanline-move opacity-30 pointer-events-none"></div>
                
                {/* Tag Overlay */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                    {project.tags.map(tag => (
                        <span key={tag} className="bg-spider-yellow border-2 border-spider-black px-2 py-0.5 font-mono text-[10px] font-bold text-spider-black shadow-[2px_2px_0px_#0A0A0A] uppercase">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            
            {/* Content Section */}
            <div className="p-6 bg-spider-white">
                <h3 
                    className="font-bangers text-4xl text-spider-black mb-3 tracking-wide leading-none group-hover:text-spider-red transition-colors miles-glitch"
                    data-text={project.title}
                >
                    {project.title}
                </h3>
                <div className="w-10 h-1 bg-spider-yellow mb-4"></div>
                <p className="font-mono text-xs font-bold text-spider-black/80 leading-snug mb-6">
                    {project.desc}
                </p>
                
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-bangers text-xl text-spider-black bg-spider-yellow border-2 border-spider-black px-4 py-2 shadow-[4px_4px_0px_#0A0A0A] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                    onClick={(e) => e.stopPropagation()}
                >
                    ACCESS_FILE //
                </a>
            </div>

            {/* Corner Accent */}
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-spider-red border-t-4 border-l-4 border-spider-black flex items-center justify-center">
                <span className="text-spider-white font-bold text-[10px]">R</span>
            </div>
        </div>
    </motion.div>
);

const Projects = () => {
    return (
        <section id="projects" className="py-32 px-6 sm:px-12 relative bg-spider-red halftone-overlay overflow-hidden">
            {/* Background Watermark */}
            <div className="absolute top-20 left-0 w-full text-center pointer-events-none select-none z-0">
                <h2 className="font-bangers text-[20vw] text-spider-black opacity-[0.05] leading-none">
                    DEPLOYMENTS
                </h2>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-24 flex flex-col items-center text-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-spider-black border-2 border-spider-yellow px-4 py-1 mb-6 rotate-[-2deg] shadow-[6px_6px_0px_#FFD600]"
                    >
                        <span className="font-mono text-xs font-bold text-spider-yellow tracking-[0.3em] uppercase">
                            Visual evidence // Archive_04
                        </span>
                    </motion.div>
                    
                    <h2 
                        className="font-bangers text-7xl md:text-9xl text-spider-white drop-shadow-[8px_8px_0px_#0A0A0A] leading-none miles-glitch"
                        data-text="FEATURED PROJECTS"
                    >
                        FEATURED <span className="text-spider-yellow">PROJECTS</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
                    {projectData.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-spider-black shadow-[0_-4px_10px_rgba(0,0,0,0.3)]"></div>
        </section>
    );
};

export default Projects;

