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

const ProjectCard = ({ project, index, activeIndex, setActiveIndex }) => {
    const isActive = activeIndex === index;
    const rotate = index % 2 === 0 ? -2 : 2;
    
    return (
        <motion.div
            className={`relative transition-all duration-700 ${isActive ? 'z-50 scale-105' : 'z-10'}`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotate: rotate * 3 }}
            whileInView={{ opacity: 1, x: 0, rotate: rotate }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", damping: 15, stiffness: 60 }}
        >
            <div className={`relative transition-all ${isActive ? 'duration-200 scale-100 opacity-100 blur-0' : 'duration-300 scale-[0.98] opacity-90 blur-[1px]'}`}>
                {/* Panel Image (ComicScroll Style) */}
                <div
                    className="relative shadow-[12px_12px_0px_#0A0A0A] border-4 border-spider-black bg-spider-yellow overflow-hidden z-10"
                    style={{ width: "clamp(280px, 40vw, 550px)", height: "clamp(200px, 45vh, 400px)", transform: `rotate(${rotate}deg)` }}
                >
                    <img 
                        src={project.img} 
                        alt={project.title} 
                        className={`w-full h-full object-cover filter contrast-[1.15] saturate-[1.2] transition-transform duration-700 ${isActive ? 'scale-110' : 'scale-100'}`} 
                    />
                    <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none"></div>
                    <div className={`absolute inset-0 spider-scanline-move opacity-30 transition-opacity ${isActive ? 'opacity-50' : 'opacity-20'}`}></div>
                </div>

                {/* Caption Box (Exactly matching ComicScrollSection) */}
                <div
                    className="absolute z-20 bg-spider-white border-[3px] border-spider-black shadow-[6px_6px_0px_#E8272A] p-4 md:p-6 flex flex-col gap-2 transition-transform duration-300"
                    style={{ 
                        width: "clamp(180px, 28vw, 380px)", 
                        bottom: "-4vh", 
                        ...(index % 2 === 0 ? { right: "-5vw" } : { left: "-5vw" }), 
                        transform: `rotate(${-rotate * 1.5}deg) ${isActive ? 'scale(1.05)' : 'scale(1)'}` 
                    }}
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-bangers text-2xl md:text-4xl leading-[0.9] text-spider-black tracking-wide">
                            {project.title}
                        </h3>
                        <div className="bg-spider-black text-spider-yellow font-mono text-[0.5rem] tracking-widest px-2 py-0.5 font-bold uppercase rotate-[-5deg]">
                            PROJECT_{String(index + 1).padStart(2, '0')}
                        </div>
                    </div>
                    
                    <div className="w-10 h-1 bg-spider-yellow" />
                    
                    <p className="font-mono text-[0.6rem] md:text-xs font-bold text-spider-black/90 leading-tight">
                        {project.desc}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-1">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-[8px] font-bold text-spider-red border-b border-spider-black/20 uppercase tracking-tighter">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-2 font-bangers text-lg text-spider-black hover:text-spider-red transition-colors group"
                        onClick={(e) => e.stopPropagation()}
                    >
                        LAUNCH_DEPLOYMENT <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [activeIndex, setActiveIndex] = React.useState(null);

    return (
        <section id="projects" className="py-48 px-6 sm:px-12 relative bg-spider-black bg-grid halftone-overlay overflow-hidden">
            {/* HUD / Background Watermark */}
            <div className="absolute top-20 right-10 z-0 opacity-20 pointer-events-none select-none hidden md:block">
                <div className="flex flex-col items-end text-spider-white">
                    <h4 className="font-bangers text-4xl tracking-widest leading-none mb-1">
                        PROJECT DOSSIER
                    </h4>
                    <p className="font-mono text-[10px] text-spider-yellow uppercase font-bold tracking-[0.3em]">
                        CLASSIFIED DEPLOYMENTS
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-40 flex flex-col items-center text-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-spider-red border-2 border-spider-black px-6 py-2 mb-8 rotate-[-2deg] shadow-[8px_8px_0px_#FFD600]"
                    >
                        <span className="font-mono text-sm font-bold text-spider-white tracking-[0.4em] uppercase">
                            Visual evidence // System_Archive
                        </span>
                    </motion.div>
                    
                    <h2 className="font-bangers text-8xl md:text-[10rem] text-spider-white drop-shadow-[10px_10px_0px_#E8272A] leading-none">
                        THE <span className="text-spider-yellow">PROJECTS</span>
                    </h2>
                </div>

                <div className="flex flex-col gap-32 md:gap-48">
                    {projectData.map((project, i) => (
                        <div key={project.id} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'} w-full`}>
                            <ProjectCard 
                                project={project} 
                                index={i} 
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Transition */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-spider-red to-transparent z-20 opacity-30"></div>
        </section>
    );
};





export default Projects;

