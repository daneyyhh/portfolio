import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Star, ExternalLink, Code2 } from 'lucide-react';
import { fetchGitHubProjects } from '../../utils/github';

const rarityColors = {
    Common: "border-gray-600 text-gray-400 bg-gray-900/50",
    Rare: "border-cyan-500 text-cyan-400 bg-cyan-900/20 shadow-[0_0_10px_rgba(6,182,212,0.2)]",
    Legendary: "border-yellow-500 text-yellow-400 bg-yellow-900/20 shadow-[0_0_15px_rgba(234,179,8,0.3)]",
};

const getRarity = (stars) => {
    if (stars > 10) return "Legendary";
    if (stars > 2) return "Rare";
    return "Common";
};

const QuestCard = ({ project }) => {
    const rarity = getRarity(project.stargazers_count);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`flex flex-col md:flex-row gap-6 p-4 rounded-lg border-2 ${rarityColors[rarity]} mb-6 transition-all hover:bg-black/40`}
        >
            {/* Left: Thumbnail / Image Placeholder */}
            <div className="w-full md:w-32 h-32 bg-black/60 rounded flex items-center justify-center border border-white/10 shrink-0">
                <Code2 className={`w-10 h-10 ${rarity === 'Legendary' ? 'text-yellow-500' : 'text-cyan-600'}`} />
            </div>

            {/* Right: Info */}
            <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold font-[Orbitron,sans-serif] text-white">
                        {project.name}
                    </h3>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 border rounded ${rarityColors[rarity]}`}>
                        {rarity}
                    </span>
                </div>

                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {project.description || "No mission instructions provided for this quest."}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {project.language && (
                        <span className="text-xs px-2 py-1 bg-gray-800 rounded text-cyan-200 border border-cyan-900">
                            {project.language}
                        </span>
                    )}
                    <span className="text-xs px-2 py-1 bg-gray-800 rounded text-gray-400 flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" /> {project.stargazers_count} XP
                    </span>
                </div>

                <div className="flex justify-end">
                    <a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center gap-1 text-cyan-500 hover:text-cyan-300 transition-colors font-bold tracking-wider"
                    >
                        VIEW QUEST <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    const filters = ['All', 'Games', 'Web', 'Tools'];

    useEffect(() => {
        const load = async () => {
            const data = await fetchGitHubProjects();
            setProjects(data);
            setFilteredProjects(data);
            setLoading(false);
        };
        load();
    }, []);

    useEffect(() => {
        if (filter === 'All') {
            setFilteredProjects(projects);
        } else {
            // Simple keyword matching for demo purposes
            setFilteredProjects(projects.filter(p =>
                (p.description + p.name + p.topics).toLowerCase().includes(filter.toLowerCase()) ||
                (filter === 'Web' && (p.language === 'JavaScript' || p.language === 'HTML'))
            ));
        }
    }, [filter, projects]);

    return (
        <section id="projects" className="min-h-screen py-20 bg-black relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-800 pb-6">
                    <div>
                        <h2 className="text-3xl font-[Orbitron,sans-serif] font-bold text-white flex items-center gap-3">
                            <span className="text-cyan-500">//</span> QUEST LOG
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">Select a mission to view details.</p>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 mt-4 md:mt-0">
                        {filters.map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border skew-x-[-10deg] ${filter === f
                                        ? "bg-cyan-600 border-cyan-500 text-white"
                                        : "bg-transparent border-gray-700 text-gray-400 hover:border-cyan-500 hover:text-cyan-400"
                                    }`}
                            >
                                <span className="block skew-x-[10deg]">{f}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-cyan-500 animate-pulse font-mono">
                        SYNCING QUEST DATA...
                    </div>
                ) : (
                    <motion.div layout>
                        <AnimatePresence>
                            {filteredProjects.map(p => (
                                <QuestCard key={p.id} project={p} />
                            ))}
                        </AnimatePresence>

                        {filteredProjects.length === 0 && (
                            <div className="text-center py-10 text-gray-500 italic">
                                No quests found in this category.
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Projects;
