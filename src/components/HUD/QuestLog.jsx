import { quests } from '../../data';
import QuestCard from './QuestCard';
import { motion } from 'framer-motion';

const QuestLog = () => {
    return (
        <div className="glass-panel p-6 h-full rounded-lg overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-6 border-b border-cyan-500/30 pb-2">
                <h2 className="text-xl font-bold tracking-widest text-cyan-100 flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                    QUEST LOG
                </h2>
                <span className="text-xs font-mono text-cyan-500/60">ACTIVE OBJECTIVES: {quests.length}</span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4">
                {quests.map((quest, index) => (
                    <motion.div
                        key={quest.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <QuestCard quest={quest} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default QuestLog;
