import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, Code2 } from 'lucide-react';
import { fetchGitHubProjects } from '../../utils/github';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
            const data = await fetchGitHubProjects();
            setProjects(data);
            setLoading(false);
        };
        loadProjects();
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section id="projects" className="py-20 bg-black relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-cyan-400 font-mono text-lg mb-2 tracking-widest uppercase">// Mission Log</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-white font-[Orbitron,sans-serif]">
                        DEPLOYED <span className="text-purple-500">PROJECTS</span>
                    </h3>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-cyan-500 font-mono animate-pulse">Syncing Mission Data...</div>
                    </div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {projects.map((repo) => (
                            <motion.div
                                key={repo.id}
                                variants={item}
                                whileHover={{ y: -5 }}
                                className="group relative bg-gray-900 border border-gray-800 rounded-lg overflow-hidden transition-all hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                            >
                                {/* Cartridge Top Label */}
                                <div className="absolute top-0 right-0 bg-gray-800 px-3 py-1 text-[10px] font-mono text-gray-400 uppercase rounded-bl-lg group-hover:bg-cyan-900 group-hover:text-cyan-200 transition-colors">
                                    {repo.language || 'Unknown'}
                                </div>

                                <div className="p-6 h-full flex flex-col">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-gray-800 rounded group-hover:bg-cyan-900/50 transition-colors">
                                            <Code2 className="w-6 h-6 text-gray-400 group-hover:text-cyan-400" />
                                        </div>
                                        <h4 className="text-xl font-bold text-white font-[Orbitron,sans-serif] truncate">
                                            {repo.name}
                                        </h4>
                                    </div>

                                    <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
                                        {repo.description || "No mission briefing available."}
                                    </p>

                                    <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-800 pt-4 mt-auto">
                                        <div className="flex gap-4">
                                            <span className="flex items-center gap-1 group-hover:text-yellow-400 transition-colors">
                                                <Star className="w-4 h-4" /> {repo.stargazers_count}
                                            </span>
                                            <span className="flex items-center gap-1 group-hover:text-purple-400 transition-colors">
                                                <GitFork className="w-4 h-4" /> {repo.forks_count}
                                            </span>
                                        </div>

                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-cyan-500 hover:text-cyan-300 transition-colors uppercase text-xs font-bold tracking-wider"
                                        >
                                            View Code <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>

                                {/* Scanline overlay for aesthetic */}
                                <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-0 group-hover:opacity-10 pointer-events-none mix-blend-overlay transition-opacity"></div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Projects;
