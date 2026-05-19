import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const categorizedData = {
    projects: [
        {
            id: '01',
            title: 'FIVEM CHRONICLES',
            desc: 'Advanced LUA systems and optimizations for legendary roleplay servers.',
            tags: ['LUA', 'SQL'],
            img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80',
            type: 'SYSTEM_ARCHITECT'
        },
        {
            id: '02',
            title: 'ERP SYSTEM',
            desc: 'Custom enterprise resource planning system with modular admissions and transport management.',
            tags: ['REACT', 'POSTGRES'],
            img: 'https://cdn.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg',
            type: 'ENTERPRISE_LOGIC'
        },
        {
            id: '03',
            title: 'HAUNTED CODE',
            desc: 'A Unity horror experience written in C# with dynamic lighting systems.',
            tags: ['UNITY', 'C#'],
            img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
            type: 'IMMERSIVE_VFX'
        },
        {
            id: '04',
            title: 'BOT LEGACY',
            desc: 'The ultimate Discord automation tool with advanced permissions routing.',
            tags: ['NODE.JS', 'REDIS'],
            img: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=1200&q=80',
            type: 'AUTOMATION_CORE'
        },
        {
            id: '05',
            title: 'ECHOSPHERE',
            desc: 'Premium music streaming platform with immersive UI/UX systems.',
            tags: ['NEXT.JS', 'FRAMER'],
            img: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=1200&q=80',
            type: 'UX_ARCHITECTURE'
        }
    ],
    certificates: [
        {
            id: '01',
            title: 'ANDROID UI DESIGN',
            desc: 'Create the User Interface in Android Studio by Meta.',
            tags: ['META', 'ANDROID'],
            img: 'https://images.unsplash.com/photo-1607252656733-fd742268db41?auto=format&fit=crop&w=1200&q=80',
            type: 'COURSERA'
        },
        {
            id: '02',
            title: 'SCIKIT-LEARN ML',
            desc: 'Scikit-Learn For Machine Learning Classification Problems.',
            tags: ['ML', 'PYTHON'],
            img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80',
            type: 'COURSERA_PROJECT'
        },
        {
            id: '03',
            title: 'LEARN UI DESIGN',
            desc: 'UI Design methodologies and implementation by Scrimba.',
            tags: ['UI', 'DESIGN'],
            img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
            type: 'SCRIMBA'
        },
        {
            id: '04',
            title: 'JAVA PROGRAMMING',
            desc: 'Fundamentals of Java Programming by Board Infinity.',
            tags: ['JAVA', 'CORE'],
            img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
            type: 'BOARD_INFINITY'
        },
        {
            id: '05',
            title: 'PROFESSIONAL SUCCESS',
            desc: 'Collaborate Effectively for Professional Success by IBM.',
            tags: ['IBM', 'SOFT_SKILLS'],
            img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
            type: 'IBM'
        }
    ],
    tools: [
        {
            id: '01',
            title: 'REACT & NEXT.JS',
            desc: 'Modern frontend frameworks for high-performance interfaces.',
            tags: ['UI', 'UX'],
            img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
            type: 'FRONTEND'
        },
        {
            id: '02',
            title: 'NODE & PYTHON',
            desc: 'Backend architectures, REST APIs, and automation scripting.',
            tags: ['BACKEND', 'SCRIPTS'],
            img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
            type: 'BACKEND'
        },
        {
            id: '03',
            title: 'UNITY & C#',
            desc: 'Game engine logic and immersive 3D experiences.',
            tags: ['GAME', '3D'],
            img: 'https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&w=1200&q=80',
            type: 'GAME_DEV'
        },
        {
            id: '04',
            title: 'TAILWIND & GSAP',
            desc: 'Advanced styling, animations, and premium aesthetic systems.',
            tags: ['CSS', 'ANIMATION'],
            img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
            type: 'STYLING'
        },
        {
            id: '05',
            title: 'FIGMA',
            desc: 'Glassmorphism UI, vector layouts, and high-fidelity prototyping.',
            tags: ['DESIGN', 'PROTOTYPE'],
            img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
            type: 'UI_UX'
        }
    ]
};

const HorizontalProjectCard = ({ project }) => {
    return (
        <motion.div 
            className="relative flex-shrink-0 w-[80vw] md:w-[60vw] h-[60vh] md:h-[70vh] mr-20 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            viewport={{ once: true }}
        >
            {/* Project Number (Architect Style) */}
            <div className="absolute -top-20 left-0">
                <span className="font-bangers text-[8vw] text-spider-black/5 group-hover:text-spider-red/10 transition-colors duration-700">
                    {project.id}
                </span>
            </div>

            {/* Main Card Frame */}
            <div className="w-full h-full border border-spider-black/10 overflow-hidden relative bg-white">
                <div className="absolute inset-0 bg-spider-black opacity-0 group-hover:opacity-10 transition-opacity duration-700 z-10" />
                
                <img 
                    src={project.img} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-110 transition-all duration-1000 scale-105 group-hover:scale-100"
                />

                {/* Technical Overlay */}
                <div className="absolute inset-4 border border-white/20 z-20 pointer-events-none" />
                <div className="absolute top-8 left-8 z-30">
                    <div className="bg-spider-red text-spider-white px-3 py-1 font-mono text-[10px] font-black tracking-widest mb-2">
                        {project.type}
                    </div>
                </div>
            </div>

            {/* Content Bottom */}
            <div className="mt-8 flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="max-w-md">
                    <h3 className="font-bangers text-4xl md:text-6xl text-spider-black leading-none mb-4 group-hover:text-spider-red transition-colors">
                        {project.title}
                    </h3>
                    <p className="font-mono text-xs text-spider-black/60 leading-relaxed uppercase tracking-tighter">
                        {project.desc}
                    </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                        <span key={tag} className="font-mono text-[10px] font-black text-spider-black border border-spider-black/20 px-3 py-1">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const targetRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState('projects');
    const currentData = categorizedData[activeCategory];

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Dynamically calculate scroll end based on number of items
    // If 5 items -> -75%, If 3 items -> -66%, If 4 items -> -70%
    const getScrollEnd = (length) => {
        if (length <= 1) return "0%";
        if (length === 2) return "-50%";
        if (length === 3) return "-65%";
        if (length === 4) return "-72%";
        return "-75%";
    };

    const xEnd = getScrollEnd(currentData.length);
    const x = useTransform(scrollYProgress, [0, 1], ["0%", xEnd]);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        // Optional: Scroll back to the start of the section smoothly when changing categories
        if (targetRef.current) {
            window.scrollTo({
                top: targetRef.current.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="projects" ref={targetRef} className="relative h-[400vh] bg-[#fcfcfc] overflow-visible">
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                {/* Background Blueprint Grid */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
                    <div className="absolute inset-0 bg-grid" />
                    <div className="absolute top-1/4 left-0 w-full h-px bg-spider-red" />
                    <div className="absolute top-3/4 left-0 w-full h-px bg-spider-red" />
                    <div className="absolute left-1/4 top-0 w-px h-full bg-spider-red" />
                    <div className="absolute left-3/4 top-0 w-px h-full bg-spider-red" />
                </div>

                {/* Section Header */}
                <div className="absolute top-20 left-6 md:left-16 z-30">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-px bg-spider-red" />
                        <span className="font-mono text-[10px] font-black tracking-[0.5em] text-spider-red uppercase">
                            Architecture_Archive_2024
                        </span>
                    </div>
                    
                    <h2 className="font-bangers text-7xl md:text-[10rem] text-spider-black leading-[0.8] uppercase select-none">
                        {activeCategory === 'projects' && <>PROJ<br /><span className="text-spider-red">ECTS</span></>}
                        {activeCategory === 'certificates' && <>CERT<br /><span className="text-spider-red">IFICATES</span></>}
                        {activeCategory === 'tools' && <>TOO<br /><span className="text-spider-red">LS</span></>}
                    </h2>

                    {/* Category Tabs */}
                    <div className="mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-4">
                        {['projects', 'certificates', 'tools'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryClick(cat)}
                                className={`font-mono text-[10px] md:text-xs font-black px-4 py-2 border transition-all duration-300 uppercase tracking-widest ${
                                    activeCategory === cat 
                                    ? 'bg-spider-red text-white border-spider-red' 
                                    : 'bg-white/80 backdrop-blur-sm text-spider-black border-spider-black/20 hover:border-spider-black cursor-pointer'
                                }`}
                            >
                                {cat.replace('-', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Side Progress Text */}
                <div className="absolute right-12 bottom-12 z-20 hidden md:flex items-center gap-4 rotate-90 origin-right">
                    <span className="font-mono text-[10px] font-black text-spider-black/40 tracking-widest uppercase">
                        SCROLL_TO_EXPLORE_DATA_SET
                    </span>
                    <div className="w-16 h-[1px] bg-spider-black/20" />
                </div>

                {/* Horizontal Scroll Track */}
                <div className="relative z-10 px-6 md:px-16 mt-48 md:mt-0 pt-[20vh] md:pt-0">
                    <motion.div style={{ x }} className="flex">
                        <AnimatePresence mode="popLayout">
                            {currentData.map((project) => (
                                <HorizontalProjectCard key={`${activeCategory}-${project.id}`} project={project} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Bottom Border Accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-spider-black/5" />
            </div>
        </section>
    );
};

export default Projects;

