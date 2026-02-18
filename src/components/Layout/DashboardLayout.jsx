import { motion } from 'framer-motion';
import CharacterSheet from '../HUD/CharacterSheet';
import QuestLog from '../HUD/QuestLog';
import InventorySystem from '../HUD/InventorySystem';
import SystemTerminal from '../HUD/SystemTerminal';
import MobileNav from '../HUD/MobileNav';

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-background text-cyan-500 font-mono relative selection:bg-cyan-500/30 selection:text-cyan-100 pb-20 md:pb-8">
            {/* Ambient Background Effects */}
            <div className="scanlines"></div>
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] pointer-events-none"></div>

            {/* Main Content Container */}
            <main className="container mx-auto px-4 py-6 h-[calc(100vh-2rem)] flex flex-col gap-6 relative z-10">

                {/* Mobile Header */}
                <header className="md:hidden flex justify-between items-center mb-4 border-b border-cyan-900/50 pb-4">
                    <h1 className="text-2xl font-bold text-cyan-100 tracking-tighter">REUBX_DEV</h1>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-[10px] text-green-500 font-mono">ONLINE</span>
                    </div>
                </header>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">

                    {/* Left Column: Character Sheet (Hidden on mobile initially or stacked) */}
                    <div className="hidden lg:block lg:col-span-3 h-full">
                        <CharacterSheet />
                    </div>

                    {/* Center Column: Quest Log (Main Content) */}
                    <div className="lg:col-span-6 h-full overflow-hidden">
                        <QuestLog />
                    </div>

                    {/* Right Column: Inventory (Hidden on mobile initially) */}
                    <div className="hidden lg:block lg:col-span-3 h-full">
                        <InventorySystem />
                    </div>
                </div>

                {/* Mobile Specific Views (Simulated for single column) */}
                {/* In a real app, we'd use routing or state to switch views. For now, we stack QuestLog as primary. */}

            </main>

            <SystemTerminal />
            <MobileNav />
        </div>
    );
};

export default DashboardLayout;
