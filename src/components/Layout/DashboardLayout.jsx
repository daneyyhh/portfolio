import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Hero from '../Sections/Hero';
import About from '../Sections/About';
import Projects from '../Sections/Projects';
import Contact from '../Sections/Contact';
import QuestLog from '../HUD/QuestLog';
import InventorySystem from '../HUD/InventorySystem';
import SystemTerminal from '../HUD/SystemTerminal';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

const DashboardLayout = () => {
    const [activePanel, setActivePanel] = React.useState(null); // 'quests' | 'inventory' | null

    const toggleQuests = () => setActivePanel(prev => prev === 'quests' ? null : 'quests');
    const toggleInventory = () => setActivePanel(prev => prev === 'inventory' ? null : 'inventory');
    const closePanel = () => setActivePanel(null);

    return (
        <div className="bg-void min-h-screen text-ash font-sans selection:bg-ember selection:text-white overflow-x-hidden">
            <Header onOpenQuests={toggleQuests} onOpenInventory={toggleInventory} />

            <main className="flex flex-col relative z-10">
                <Hero />
                <About />
                <Projects />
                <Contact />
            </main>

            <Footer />

            {/* HUD Overlays */}
            <AnimatePresence>
                {activePanel === 'quests' && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closePanel}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-void border-l border-cyan-900/50 z-50 shadow-2xl p-4 pt-24"
                        >
                            <button
                                onClick={closePanel}
                                className="absolute top-6 right-6 text-cyan-500 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <QuestLog />
                        </motion.div>
                    </>
                )}

                {activePanel === 'inventory' && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closePanel}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-void border-l border-cyan-900/50 z-50 shadow-2xl p-4 pt-24"
                        >
                            <button
                                onClick={closePanel}
                                className="absolute top-6 right-6 text-cyan-500 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <InventorySystem />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <SystemTerminal />
        </div>
    );
};

export default DashboardLayout;
