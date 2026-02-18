import { motion } from 'framer-motion';
import { ExternalLink, Trophy, AlertTriangle, Star } from 'lucide-react';

const QuestCard = ({ quest }) => {
    const rarityColors = {
        Common: "border-gray-600 text-gray-400",
        Rare: "border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]",
        Legendary: "border-yellow-500 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)] animate-pulse-slow"
    };

    const bgGlow = {
        Common: "bg-gray-900/20",
        Rare: "bg-cyan-900/10",
        Legendary: "bg-yellow-900/10"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
            className={`relative border ${rarityColors[quest.rarity].split(' ')[0]} ${bgGlow[quest.rarity]} backdrop-blur-sm rounded-lg p-5 overflow-hidden group`}
        >
            {/* Rarity Tag */}
            <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] uppercase font-bold tracking-wider ${quest.rarity === 'Legendary' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-cyan-900/30 text-cyan-300'} rounded-bl-lg`}>
                {quest.rarity}
            </div>

            <div className="flex gap-4 items-start relative z-10">
                {/* Project Thumbnail */}
                <div className="w-24 h-24 rounded border border-gray-700 overflow-hidden flex-shrink-0">
                    <img src={quest.image} alt={quest.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">{quest.title}</h3>
                        <motion.a
                            href={quest.link}
                            target="_blank"
                            whileHover={{ rotate: 15 }}
                            className="text-gray-400 hover:text-white"
                        >
                            <ExternalLink size={16} />
                        </motion.a>
                    </div>

                    <p className="text-xs text-gray-400 font-mono mb-3 line-clamp-2">{quest.description}</p>

                    {/* Loot / Tech Stack */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {quest.loot.map((tech, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 bg-black/50 border border-gray-700 rounded text-gray-300 font-mono">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Status Indicator inside card */}
            <div className="mt-4 flex justify-between items-center text-[10px] font-mono text-gray-500 border-t border-gray-800/50 pt-2">
                <span>QUEST ID: #{quest.id.toString().padStart(4, '0')}</span>
                <span className={quest.status === 'COMPLETE' ? 'text-green-500' : 'text-yellow-500'}>
                    [{quest.status}]
                </span>
            </div>
        </motion.div>
    );
};

export default QuestCard;
