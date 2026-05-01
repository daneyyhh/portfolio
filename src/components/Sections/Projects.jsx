import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projectData = [
    {
        id: 'fm-1',
        title: 'FiveM Chronicles',
        desc: 'Advanced LUA systems and optimizations for legendary roleplay servers.',
        tags: ['Lua', 'Node.js', 'SQL'],
        link: 'https://github.com/daneyyhh/fivem-resources',
        img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
        color: '#E8272A', // Miles Red
        accent: 'CRITICAL_DATA'
    },
    {
        id: 'un-1',
        title: 'Haunted Code',
        desc: 'A Unity horror experience written in C# with dynamic lighting.',
        tags: ['Unity', 'C#', '3D'],
        link: 'https://play.unity.com/en/games/aa0605eb-0e94-4d82-a4c3-6e1a8089744b/haunted-house',
        img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        color: '#FFD600', // Miles Yellow
        accent: 'THREAT_DETECTED'
    },
    {
        id: 'un-2',
        title: 'Sprite Engine',
        desc: 'High-octane arcade action systems and particle effects.',
        tags: ['Unity', 'C#'],
        link: 'https://play.unity.com/en/games/4d7cb2d6-141d-4a92-84f9-56f8f69d4bcf/spriteflight',
        img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
        color: '#00ffff', // Glitch Cyan
        accent: 'SYSTEM_UPGRADE'
    },
    {
        id: 'dc-1',
        title: 'Bot Legacy',
        desc: 'The ultimate Discord automation tool with advanced permissions routing.',
        tags: ['Discord.js', 'Redis', 'Express'],
        link: 'https://github.com/daneyyhh',
        img: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=800&q=80',
        color: '#E8272A',
        accent: 'ENCRYPTION_KEY'
    }
];

const ProjectPanel = ({ project, index, activeIndex, setActiveIndex }) => {
    const isActive = activeIndex === index;
    const isEven = index % 2 === 0;
    
    return (
        <motion.div
            className={`relative w-full max-w-4xl mx-auto mb-[-4rem] md:mb-[-6rem] transition-all duration-500 ${isActive ? 'z-50 scale-105' : 'z-10'}`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            initial={{ opacity: 0, x: isEven ? -100 : 100, rotate: isEven ? -5 : 5 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
        >
            <div className={`relative transition-all duration-500 ${isActive ? 'grayscale-0 brightness-110' : 'grayscale brightness-[0.3]'}`}>
                {/* Comic Shape (Irregular using Clip Path) */}
                <div 
                    className="relative border-4 border-spider-black shadow-[15px_15px_0px_#0A0A0A] overflow-hidden bg-spider-black"
                    style={{ 
                        clipPath: isEven ? 'polygon(0% 5%, 100% 0%, 95% 100%, 5% 95%)' : 'polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)',
                        height: 'clamp(300px, 50vh, 500px)'
                    }}
                >
                    <img 
                        src={project.img} 
                        alt={project.title} 
                        className={`w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'scale-110' : 'scale-100'}`}
                    />
                    
                    {/* Halftone & Scanlines */}
                    <div className="absolute inset-0 halftone-overlay opacity-30 pointer-events-none"></div>
                    <div className={`absolute inset-0 spider-scanline-move transition-opacity ${isActive ? 'opacity-40' : 'opacity-10'}`}></div>

                    {/* Accent Splash (Visible only when active) */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.div 
                                initial={{ scale: 0, opacity: 0, rotate: -20 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="absolute top-10 left-10 z-20 pointer-events-none"
                            >
                                <div 
                                    className="px-4 py-1 font-bangers text-2xl text-spider-black shadow-[4px_4px_0px_#0A0A0A] -rotate-6"
                                    style={{ backgroundColor: project.color }}
                                >
                                    {project.accent}!
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Content Overlay (Story style) */}
                <motion.div
                    className="absolute z-30 flex flex-col pointer-events-none"
                    style={{ 
                        top: '50%', 
                        ...(isEven ? { left: '10%' } : { right: '10%' }),
                        transform: 'translateY(-50%)',
                        maxWidth: '300px'
                    }}
                >
                    <motion.div
                        className="bg-spider-white border-2 border-spider-black p-4 shadow-[8px_8px_0px_#E8272A] pointer-events-auto"
                        animate={{ 
                            x: isActive ? (isEven ? 20 : -20) : 0,
                            rotate: isActive ? (isEven ? 2 : -2) : 0
                        }}
                    >
                        <h3 className="font-bangers text-3xl md:text-5xl text-spider-black leading-none mb-2">
                            {project.title}
                        </h3>
                        <p className="font-mono text-[10px] font-bold text-spider-black/80 leading-tight mb-4">
                            {project.desc}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-[8px] font-bold bg-spider-black text-spider-white px-1 uppercase tracking-tighter">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block font-bangers text-xl text-spider-red hover:text-spider-black transition-colors"
                        >
                            ACCESS_LINK //
                        </a>
                    </motion.div>
                </motion.div>

                {/* Impact Lines (Visible only when active) */}
                {isActive && (
                    <div className="absolute inset-0 pointer-events-none z-0">
                        <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                            {[...Array(8)].map((_, i) => (
                                <line 
                                    key={i} 
                                    x1="50" y1="50" 
                                    x2={50 + 100 * Math.cos(i * 45 * Math.PI / 180)} 
                                    y2={50 + 100 * Math.sin(i * 45 * Math.PI / 180)} 
                                    stroke="white" 
                                    strokeWidth="0.5" 
                                />
                            ))}
                        </svg>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [activeIndex, setActiveIndex] = React.useState(null);

    return (
        <section id="projects" className="py-60 px-6 sm:px-12 relative bg-spider-black bg-grid halftone-overlay overflow-hidden">
            {/* Background Texture: Multi-Panel Effect */}
            <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
                <div className="absolute top-0 left-0 w-full h-full flex flex-wrap gap-4 p-4">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-[30%] h-[20%] border-2 border-white/20 rotate-12"></div>
                    ))}
                </div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-40 flex flex-col items-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-spider-yellow border-2 border-spider-black px-4 py-1 mb-6 rotate-[-1deg] shadow-[4px_4px_0px_#E8272A]"
                    >
                        <span className="font-mono text-xs font-bold text-spider-black tracking-[0.3em] uppercase">
                            Visual Evidence // Archive_42
                        </span>
                    </motion.div>
                    
                    <h2 className="font-bangers text-7xl md:text-9xl text-spider-white drop-shadow-[8px_8px_0px_#E8272A] leading-none text-center">
                        THE <span className="text-spider-yellow">PROJECTS</span>
                    </h2>
                </div>

                {/* Comic Storyboard Layout */}
                <div className="flex flex-col py-20">
                    {projectData.map((project, i) => (
                        <ProjectPanel 
                            key={project.id} 
                            project={project} 
                            index={i} 
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                        />
                    ))}
                </div>
            </div>

            {/* Bottom Border */}
            <div className="absolute bottom-0 left-0 w-full h-4 bg-spider-red halftone-overlay"></div>
        </section>
    );
};

export default Projects;
