import { motion } from 'framer-motion';
import { Shield, Zap, Activity, Award } from 'lucide-react';
import { playerStats } from '../../data';

const CharacterSheet = () => {
    return (
        <div className="glass-panel p-6 h-full rounded-lg relative overflow-hidden flex flex-col gap-6">
            {/* Header Profile */}
            <div className="flex items-center gap-4 border-b border-cyan-500/30 pb-4">
                <div className="relative">
                    <div className="w-16 h-16 rounded-full border-2 border-cyan-400 p-1">
                        <img src={playerStats.avatar} alt="Avatar" className="w-full h-full rounded-full bg-black/50" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border border-black animate-pulse"></div>
                </div>
                <div>
                    <h2 className="text-xl font-bold tracking-wider text-cyan-100">{playerStats.username}</h2>
                    <div className="flex flex-col text-xs text-cyan-400/80 font-mono">
                        <span>LVL {playerStats.level} {playerStats.class}</span>
                        <span>[{playerStats.guild}]</span>
                    </div>
                </div>
            </div>

            {/* XP Bar */}
            <div className="space-y-1">
                <div className="flex justify-between text-xs text-cyan-300">
                    <span>XP</span>
                    <span>{playerStats.xp} / {playerStats.nextLevelXp}</span>
                </div>
                <div className="h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-700">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(playerStats.xp / playerStats.nextLevelXp) * 100}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                    />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="space-y-4">
                <h3 className="text-sm uppercase tracking-widest text-gray-400 border-l-2 border-cyan-500 pl-2">Base Stats</h3>
                <div className="grid gap-3">
                    {playerStats.stats.map((stat, index) => (
                        <div key={index} className="group">
                            <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
                                    <stat.icon size={14} className={stat.color} />
                                    {stat.name}
                                </div>
                                <span className="text-xs font-mono text-cyan-500">{stat.value}</span>
                            </div>
                            <div className="h-1.5 bg-gray-800 rounded-sm overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${stat.value}%` }}
                                    viewport={{ once: true }}
                                    className={`h-full ${stat.color.replace('text', 'bg')} opacity-80 group-hover:opacity-100 transition-opacity`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bio / Status */}
            <div className="mt-auto p-3 bg-black/40 rounded border border-cyan-900/30">
                <p className="text-xs text-gray-400 font-mono leading-relaxed">
                    <span className="text-cyan-600">REQ:</span> {playerStats.bio}
                </p>
            </div>
        </div>
    );
};

export default CharacterSheet;
