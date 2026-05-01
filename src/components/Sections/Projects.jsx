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
            className={`relative w-full max-w-5xl mx-auto mb-[-8rem] md:mb-[-12rem] transition-all duration-700 ${isActive ? 'z-50 scale-105' : 'z-10'}`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            initial={{ opacity: 0, y: 50, rotate: isEven ? -2 : 2 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
        >
            {/* Background Action Lines (Visible only when active) */}
            <AnimatePresence>
                {isActive && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 0.4, scale: 1.5 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 z-0 pointer-events-none overflow-visible"
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            {[...Array(36)].map((_, i) => (
                                <line 
                                    key={i} 
                                    x1="50" y1="50" 
                                    x2={50 + 200 * Math.cos(i * 10 * Math.PI / 180)} 
                                    y2={50 + 200 * Math.sin(i * 10 * Math.PI / 180)} 
                                    stroke="white" 
                                    strokeWidth="0.2" 
                                    strokeDasharray="2,4"
                                />
                            ))}
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`relative transition-all duration-700 ${isActive ? 'grayscale-0 brightness-110' : 'grayscale brightness-[0.2]'}`}>
                {/* Comic Shape (Aggressive Skew) */}
                <div 
                    className="relative border-[6px] border-spider-black shadow-[20px_20px_0px_#0A0A0A] overflow-hidden bg-spider-black"
                    style={{ 
                        clipPath: isEven ? 'polygon(0% 10%, 100% 0%, 90% 100%, 10% 90%)' : 'polygon(10% 0%, 100% 10%, 90% 90%, 0% 100%)',
                        height: 'clamp(400px, 60vh, 600px)'
                    }}
                >
                    <img 
                        src={project.img} 
                        alt={project.title} 
                        className={`w-full h-full object-cover transition-transform duration-[2000ms] ease-out ${isActive ? 'scale-125' : 'scale-100'}`}
                    />
                    
                    {/* Comic Effects Overlay */}
                    <div className="absolute inset-0 halftone-overlay opacity-40 mix-blend-soft-light pointer-events-none"></div>
                    <div className={`absolute inset-0 spider-scanline-move transition-opacity duration-700 ${isActive ? 'opacity-50' : 'opacity-10'}`}></div>

                    {/* Active VFX (Glitch Particles) */}
                    {isActive && (
                        <div className="absolute inset-0 z-20 pointer-events-none">
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: -50, x: Math.random() * 100 + "%", opacity: 0 }}
                                    animate={{ y: 600, opacity: [0, 1, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                    className="absolute w-2 h-8 bg-spider-yellow/40 blur-[1px]"
                                />
                            ))}
                        </div>
                    )}

                    {/* Accent Badge */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.div 
                                initial={{ x: -100, opacity: 0, rotate: -20 }}
                                animate={{ x: 20, opacity: 1, rotate: -5 }}
                                exit={{ x: -100, opacity: 0 }}
                                className="absolute top-12 left-0 z-30 pointer-events-none"
                            >
                                <div className="bg-spider-red border-4 border-spider-black px-6 py-2 shadow-[8px_8px_0px_#0A0A0A]">
                                    <span className="font-bangers text-3xl text-spider-white tracking-widest">{project.accent}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Content Box (Pop Style) */}
                <motion.div
                    className="absolute z-40 flex flex-col pointer-events-none"
                    style={{ 
                        top: '50%', 
                        ...(isEven ? { right: '15%' } : { left: '15%' }),
                        transform: 'translateY(-50%)',
                        maxWidth: '350px'
                    }}
                >
                    <motion.div
                        className="bg-spider-white border-4 border-spider-black p-6 shadow-[12px_12px_0px_#FFD600] pointer-events-auto"
                        animate={{ 
                            x: isActive ? (isEven ? -40 : 40) : 0,
                            scale: isActive ? 1.1 : 1,
                            rotate: isActive ? (isEven ? -2 : 2) : 0
                        }}
                    >
                        <h3 className="font-bangers text-4xl md:text-6xl text-spider-black leading-none mb-3">
                            {project.title}
                        </h3>
                        <p className="font-mono text-xs font-bold text-spider-black/90 leading-tight mb-6 uppercase tracking-tight">
                            {project.desc}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-[10px] font-black bg-spider-red text-spider-white px-2 py-0.5 uppercase">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-bangers text-2xl text-spider-red hover:text-spider-black transition-colors"
                        >
                            LAUNCH_MODULE // <span className="text-sm">→</span>
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};
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
