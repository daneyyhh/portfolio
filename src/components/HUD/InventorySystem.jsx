import { inventory } from '../../data';
import { motion } from 'framer-motion';

const InventorySystem = () => {
    return (
        <div className="glass-panel p-6 h-full rounded-lg flex flex-col gap-6 overflow-hidden">
            <h3 className="text-lg font-bold tracking-widest text-cyan-100 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                INVENTORY
            </h3>

            <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                {inventory.map((category, idx) => (
                    <div key={idx}>
                        <h4 className="text-xs font-bold text-cyan-600 mb-2 uppercase tracking-wider">
                            {category.category}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            {category.items.map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.05, borderColor: "rgba(6, 182, 212, 0.8)" }}
                                    className="bg-black/40 border border-gray-800 p-2 rounded text-xs text-gray-300 font-mono text-center cursor-default hover:bg-cyan-900/10 transition-colors"
                                >
                                    {item}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Decorative Capacity Bar */}
            <div className="mt-auto pt-4 border-t border-gray-800">
                <div className="flex justify-between text-[10px] text-gray-500 font-mono mb-1">
                    <span>CAPACITY</span>
                    <span>42%</span>
                </div>
                <div className="flex gap-0.5 h-2">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className={`flex-1 rounded-sm ${i < 8 ? 'bg-cyan-600' : 'bg-gray-900'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InventorySystem;
