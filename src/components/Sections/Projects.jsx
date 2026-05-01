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
    
    return (
        <motion.div
            className={`relative group cursor-pointer transition-all duration-500 ${isActive ? 'z-50 scale-105' : 'z-10 opacity-50 grayscale'}`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -5 : 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
                rotate: isActive ? 0 : (index % 2 === 0 ? -2 : 2),
                marginBottom: index % 2 === 0 ? '4rem' : '0'
            }}
        >
            {/* Speed Lines / Impact Background (Visible only when active) */}
            <AnimatePresence>
                {isActive && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 -z-20 pointer-events-none"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(232,39,42,0.2)_0%,transparent_70%)] blur-2xl"></div>
                        <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
                            {[...Array(12)].map((_, i) => (
                                <line 
                                    key={i} 
                                    x1="50" y1="50" 
                                    x2={50 + 50 * Math.cos(i * 30 * Math.PI / 180)} 
                                    y2={50 + 50 * Math.sin(i * 30 * Math.PI / 180)} 
                                    stroke="#E8272A" 
                                    strokeWidth="0.5" 
                                />
                            ))}
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Comic Panel Shadow */}
            <div className={`absolute inset-0 transition-all duration-300 -z-10 ${isActive ? 'bg-spider-yellow translate-x-6 translate-y-6' : 'bg-spider-black translate-x-3 translate-y-3'}`}></div>
            
            {/* Main Panel */}
            <div className={`bg-spider-white border-4 border-spider-black overflow-hidden relative shadow-[8px_8px_0px_#0A0A0A] transition-colors ${isActive ? 'border-spider-red' : 'border-spider-black'}`}>
                {/* Image Section */}
                <div className="relative h-[300px] md:h-[400px] overflow-hidden border-b-4 border-spider-black">
                    <img 
                        src={project.img} 
                        alt={project.title} 
                        className={`w-full h-full object-cover transition-all duration-700 ${isActive ? 'scale-110 contrast-125 saturate-150' : 'scale-100 contrast-100 saturate-50'}`}
                    />
                    
                    {/* Halftone & Scanlines */}
                    <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none"></div>
                    <div className={`absolute inset-0 spider-scanline-move transition-opacity ${isActive ? 'opacity-40' : 'opacity-10'}`}></div>

                    {/* Graffiti Tags (Bottom left of image) */}
                    <div className="absolute bottom-2 left-2 flex gap-1 items-end pointer-events-none">
                        <span className="font-bangers text-spider-red text-6xl opacity-20 -rotate-12 select-none">MILES</span>
                    </div>
                </div>
                
                {/* Content Overlay (Slide up on active) */}
                <motion.div 
                    className="p-6 bg-spider-white border-t-4 border-spider-black relative overflow-hidden"
                    animate={{ backgroundColor: isActive ? '#FFD600' : '#F5F0E8' }}
                >
                    <div className="relative z-10">
                        <h3 className="font-bangers text-4xl md:text-5xl text-spider-black mb-2 tracking-wide leading-none miles-glitch" data-text={project.title}>
                            {project.title}
                        </h3>
                        <p className={`font-mono text-[10px] md:text-xs font-bold text-spider-black transition-opacity ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                            {project.desc}
                        </p>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="bg-spider-black text-spider-yellow px-2 py-0.5 text-[8px] font-bold uppercase">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-6 inline-flex items-center gap-2 font-bangers text-xl text-spider-white bg-spider-red border-2 border-spider-black px-4 py-2 shadow-[4px_4px_0px_#0A0A0A] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            ACCESS_DATA //
                        </a>
                    </div>

                    {/* Background number watermark */}
                    <div className="absolute top-2 right-4 font-bangers text-8xl text-spider-black/5 select-none pointer-events-none">
                        {index + 1}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [activeIndex, setActiveIndex] = React.useState(null);

    return (
        <section id="projects" className="py-40 px-6 sm:px-12 relative bg-spider-black overflow-hidden">
            {/* Background Texture: Graffiti & Vibe */}
            <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
                <div className="absolute top-20 left-10 text-9xl font-bangers text-spider-white -rotate-12">BROOKLYN</div>
                <div className="absolute bottom-20 right-10 text-9xl font-bangers text-spider-red rotate-6">MULTIVERSE</div>
                <div className="absolute inset-0 bg-grid opacity-30"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-32 flex flex-col items-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-spider-yellow border-2 border-spider-black px-4 py-1 mb-6 rotate-[-1deg] shadow-[4px_4px_0px_#E8272A]"
                    >
                        <span className="font-mono text-xs font-bold text-spider-black tracking-[0.3em] uppercase">
                            Deployments // Subject_42
                        </span>
                    </motion.div>
                    
                    <h2 className="font-bangers text-7xl md:text-9xl text-spider-white drop-shadow-[8px_8px_0px_#E8272A] leading-none text-center">
                        THE <span className="text-spider-yellow">COLLECTION</span>
                    </h2>
                </div>

                {/* Storyboard Layout */}
                <div className="flex flex-col gap-12 md:gap-0 max-w-4xl mx-auto">
                    {projectData.map((project, i) => (
                        <div key={project.id} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'} w-full`}>
                            <div className="w-full md:w-[70%]">
                                <ProjectCard 
                                    project={project} 
                                    index={i} 
                                    activeIndex={activeIndex}
                                    setActiveIndex={setActiveIndex}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Border */}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-spider-red halftone-overlay"></div>
        </section>
    );
};



export default Projects;

