import { Home, ScrollText, User, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileNav = () => {
    const navItems = [
        { icon: Home, label: 'Home', id: 'home' },
        { icon: ScrollText, label: 'Quests', id: 'quests' },
        { icon: User, label: 'Stats', id: 'stats' },
        { icon: Mail, label: 'Contact', id: 'contact' },
    ];

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
            <div className="glass-panel rounded-full px-6 py-3 flex justify-between items-center relative overflow-hidden">
                {/* Scanline effect specifically for the nav */}
                <div className="absolute inset-0 bg-cyan-500/5 pointer-events-none" />

                {navItems.map((item) => (
                    <motion.button
                        key={item.id}
                        whileTap={{ scale: 0.9 }}
                        className="flex flex-col items-center gap-1 text-cyan-400/70 hover:text-cyan-400 transition-colors"
                    >
                        <item.icon size={20} />
                        <span className="text-[10px] uppercase tracking-wider font-bold">{item.label}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default MobileNav;
