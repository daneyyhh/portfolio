import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchGitHubProjects } from '../../utils/github';
import { ArrowRight } from 'lucide-react';

const manualProjects = [
    {
        id: 'manual-1',
        name: 'Haunted House',
        description: 'Survival horror experience in Unity.',
        language: 'UNITY',
        html_url: 'https://play.unity.com/en/games/aa0605eb-0e94-4d82-a4c3-6e1a8089744b/haunted-house',
        homepage: true
    },
    {
        id: 'manual-2',
        name: 'Sprite Flight',
        description: 'Arcade flight action.',
        language: 'UNITY',
        html_url: 'https://play.unity.com/en/games/4d7cb2d6-141d-4a92-84f9-56f8f69d4bcf/spriteflight',
        homepage: true
    }
];

const ProjectCard = ({ project }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        className="group relative bg-carbon border border-steel overflow-hidden clip-card transition-all hover:border-acid-lime/50 h-full flex flex-col"
    >
        {/* Top Danger Bar */}
        <div className="h-1 w-full bg-steel group-hover:bg-acid-lime transition-colors"></div>

        <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
                <span className="font-speed text-2xl lg:text-3xl text-white uppercase tracking-wider">{project.name}</span>
                <span className="text-[10px] font-bold font-tech bg-void px-2 py-1 text-acid-lime border border-acid-lime/30 rounded-sm">
                    {project.language || "DEV"}
                </span>
            </div>

            <p className="font-tech text-dust text-sm mb-6 line-clamp-3">
                {project.description || "Classified mission data."}
            </p>

            <div className="mt-auto">
                <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-speed text-xl text-acid-lime hover:gap-3 transition-all group-hover:text-white"
                >
                    {project.homepage ? "PLAY NOW" : "ACCESS CODE"} <ArrowRight className="w-4 h-4" />
                </a>
            </div>
        </div>

        {/* Bottom Stripes Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-2 danger-stripes opacity-0 group-hover:opacity-100 transition-opacity"></div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
    </motion.div>
);

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const load = async () => {
            const githubData = await fetchGitHubProjects();
            setProjects([...manualProjects, ...githubData].slice(0, 9));
        };
        load();
    }, []);

    return (
        <section id="projects" className="py-24 bg-void relative min-h-screen">
            {/* Background Decoration */}
            <div className="absolute right-0 top-0 w-1/3 h-full bg-grid-pattern opacity-10 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 border-b border-steel pb-6 gap-4">
                    <h2 className="font-speed text-5xl md:text-6xl text-white italic">
                        ACTIVE <span className="text-transparent text-stroke">MISSIONS</span>
                    </h2>
                    <div className="font-tech text-acid-lime tracking-widest text-xs md:text-sm">
                        // SELECT TARGET TO INITIALIZE
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <AnimatePresence>
                        {projects.map((p) => (
                            <ProjectCard key={p.id} project={p} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Projects;
