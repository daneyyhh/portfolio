import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Eye } from 'lucide-react';

const loreData = [
    {
        id: 1,
        title: "Optimizing Rendering Pipelines in Unity",
        excerpt: "A deep dive into reducing draw calls and managing batching for high-performance mobile games.",
        date: "2024-03-15",
        views: 1204,
        tag: "DEVLOG",
        color: "text-purple-400 border-purple-900"
    },
    {
        id: 2,
        title: "Building Scalable APIs with Node.js",
        excerpt: "Best practices for structuring your Express applications for long-term maintainability.",
        date: "2024-02-28",
        views: 890,
        tag: "TUTORIAL",
        color: "text-cyan-400 border-cyan-900"
    },
    {
        id: 3,
        title: "The Future of Web Gaming",
        excerpt: "Why WebGPU and WASM are changing the landscape of browser-based experiences.",
        date: "2024-01-10",
        views: 2300,
        tag: "OPINION",
        color: "text-yellow-400 border-yellow-900"
    }
];

const LoreCard = ({ item }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden flex flex-col hover:border-gray-600 transition-colors group"
    >
        {/* Thumbnail Placeholder */}
        <div className="h-40 bg-gray-900 flex items-center justify-center border-b border-gray-800 relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-tr from-transparent to-${item.color.split('-')[1]}-900/20 opacity-50`}></div>
            <BookOpen className={`w-8 h-8 ${item.color.split(' ')[0]}`} />
        </div>

        <div className="p-6 flex flex-col flex-1">
            <div className="flex justify-between items-center mb-3 text-xs font-mono">
                <span className={`px-2 py-0.5 border rounded ${item.color} uppercase`}>
                    {item.tag}
                </span>
                <span className="text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {item.date}
                </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 font-[Orbitron,sans-serif] group-hover:text-cyan-400 transition-colors">
                {item.title}
            </h3>

            <p className="text-sm text-gray-400 mb-6 flex-grow">
                {item.excerpt}
            </p>

            <div className="flex justify-between items-center pt-4 border-t border-gray-900 mt-auto">
                <span className="text-xs text-gray-600 flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {item.views} READS
                </span>
                <button className="text-xs font-bold text-cyan-600 hover:text-cyan-400 uppercase tracking-wider transition-colors">
                    READ LOG &gt;
                </button>
            </div>
        </div>
    </motion.div>
);

const Articles = () => {
    return (
        <section id="articles" className="min-h-screen py-20 bg-black relative flex items-center">
            <div className="container mx-auto px-6">
                <div className="mb-12">
                    <h2 className="text-3xl font-[Orbitron,sans-serif] font-bold text-white flex items-center gap-3">
                        <span className="text-cyan-500">//</span> LORE & PATCH NOTES
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">Knowledge base and development logs.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loreData.map(item => (
                        <LoreCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Articles;
