import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchGitHubProjects } from '../../utils/github';
import { ArrowRight, Gamepad2, Server } from 'lucide-react';

const ProjectCard = ({ project }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        className="group relative bg-ash text-void p-1"
    >
        {/* Rough Edge Mask via Clip-Path */}
        <div className="absolute inset-0 bg-ash clip-rough z-0"></div>

        <div className="relative z-10 bg-ash p-6 h-full flex flex-col clip-rough">
            {/* Date / Tech Tag */}
            <span className="font-brush text-ember text-xl mb-2 -rotate-2">
                {project.language || "GAME"}
            </span>

            <h3 className="font-tech font-bold text-2xl uppercase tracking-tighter mb-4 group-hover:text-ember transition-colors">
                {project.name}
            </h3>

            <p className="font-sans text-sm text-charcoal flex-grow mb-6 line-clamp-3">
                {project.description || "Sector data corrupted. No description available."}
            </p>

            <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-tech font-bold text-sm tracking-widest uppercase hover:gap-4 transition-all"
            >
                {project.homepage ? "PLAY GAME" : "VIEW CODE"} <ArrowRight className="w-4 h-4 text-ember" />
            </a>

            {/* Ember Decor */}
            <div className="absolute bottom-2 right-2 w-2 h-2 bg-ember rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
    </motion.div>
);

const manualProjects = [
    {
        id: 'manual-1',
        name: 'Haunted Game',
        description: 'A spooky survival experience created in Unity. Explore the haunted house if you dare.',
        language: 'UNITY',
        html_url: 'https://play.unity.com/en/games/aa0605eb-0e94-4d82-a4c3-6e1a8089744b/haunted-house',
        homepage: true
    },
    {
        id: 'manual-2',
        name: 'Sprite Flight',
        description: 'High-flying arcade action. Dodge obstacles and collect points in this Unity 2D adventure.',
        language: 'UNITY',
        html_url: 'https://play.unity.com/en/games/4d7cb2d6-141d-4a92-84f9-56f8f69d4bcf/spriteflight',
        homepage: true
    },
    {
        id: 'manual-3',
        name: 'FiveM Resources',
        description: 'Custom scripts, assets, and server configurations for FiveM roleplay servers.',
        language: 'LUA',
        html_url: 'https://github.com/daneyyhh', // Fallback to profile as no specific link provided
        homepage: false
    }
];

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const githubData = await fetchGitHubProjects();
            // Combine manual projects with GitHub ones
            const combined = [...manualProjects, ...githubData].slice(0, 9);
            setProjects(combined);
            setLoading(false);
        };
        load();
    }, []);

    return (
        <section id="projects" className="min-h-screen py-24 bg-void relative">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="mb-16 text-center">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        className="text-ember font-tech tracking-[0.5em] uppercase text-sm mb-4"
                    >
                        NEWEST UPDATES
                    </motion.h2>
                    <motion.h1
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="text-5xl md:text-7xl font-brush text-ash text-stroke"
                    >
                        TERRITORIES <span className="text-ember text-stroke-0">CLAIMED</span>
                    </motion.h1>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <div className="col-span-full text-center text-dust font-tech animate-pulse">
                            SCANNING SECTOR FOR PROJECTS...
                        </div>
                    ) : (
                        <AnimatePresence>
                            {projects.map((p) => (
                                <ProjectCard key={p.id} project={p} />
                            ))}
                        </AnimatePresence>
                    )}
                </div>

                <div className="mt-12 text-center">
                    <a href="https://github.com/daneyyhh" target="_blank" className="inline-flex items-center gap-2 text-ember font-brush text-xl hover:text-white transition-colors">
                        READ MORE ON GITHUB <ArrowRight />
                    </a>
                </div>
            </div>

            {/* Paint Splatter Divider */}
            <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black via-black/80 to-transparent z-20"></div>
        </section>
    );
};

export default Projects;
