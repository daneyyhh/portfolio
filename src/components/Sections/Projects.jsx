import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchGitHubProjects } from '../../utils/github';
import { Play, Code, ArrowRight } from 'lucide-react';

const manualProjects = [
    {
        id: 'manual-1',
        name: 'Haunted Game',
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
    },
    {
        id: 'manual-3',
        name: 'FiveM Resources',
        description: 'Server scripts & assets.',
        language: 'LUA',
        html_url: 'https://github.com/daneyyhh',
        homepage: false
    }
];

const ProjectCard = ({ project }) => (
    <motion.div
        layout
        className="group relative bg-carbon border border-steel overflow-hidden clip-card transition-all hover:bg-steel"
    >
        {/* Top Danger Bar */}
        <div className="h-1 w-full bg-steel group-hover:bg-neon-teal transition-colors"></div>

        <div className="p-6">
            <div className="flex justify-between items-start mb-4">
                <span className="font-speed text-2xl text-white uppercase tracking-wider">{project.name}</span>
                <span className="text-[10px] font-bold font-tech bg-void px-2 py-1 text-neon-teal border border-neon-teal/30">
                    {project.language || "DEV"}
                </span>
            </div>

            <p className="font-tech text-dust text-sm mb-6 line-clamp-2">
                {project.description || "Classified mission data."}
            </p>

            <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-speed text-xl text-racing-orange hover:gap-3 transition-all"
            >
                {project.homepage ? "PLAY NOW" : "ACCESS CODE"} <ArrowRight className="w-4 h-4" />
            </a>
        </div>

        {/* Bottom Stripes */}
        <div className="absolute bottom-0 left-0 w-full h-2 danger-stripes opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
        <section id="projects" className="py-24 bg-void relative">
            <div className="container mx-auto px-6">
                <div className="flex items-end justify-between mb-12 border-b border-steel pb-6">
                    <h2 className="font-speed text-6xl text-white italic">
                        ACTIVE <span className="text-transparent text-stroke">MISSIONS</span>
                    </h2>
                    <div className="hidden md:block font-tech text-neon-teal tracking-widest">
                        // SELECT TARGET
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
