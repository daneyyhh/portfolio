import {
    Code, Terminal, Cpu, Globe, Database, Layout,
    Shield, Zap, Radio, Gamepad2, Layers
} from 'lucide-react';

export const playerStats = {
    username: "REUBX_DEV",
    level: 27,
    class: "Cyber-Architect",
    guild: "FullStack_Vanguard",
    status: "ONLINE",
    bio: "Constructing digital realities. Specializing in immersive front-end interfaces and robust back-end systems.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4", // Placeholder
    xp: 8450,
    nextLevelXp: 10000,
    stats: [
        { name: "Frontend", value: 92, max: 100, icon: Layout, color: "text-cyan-400" },
        { name: "Backend", value: 85, max: 100, icon: Database, color: "text-purple-400" },
        { name: "UI/UX", value: 88, max: 100, icon: Layers, color: "text-pink-400" },
        { name: "DevOps", value: 75, max: 100, icon: Terminal, color: "text-green-400" }
    ]
};

export const quests = [
    {
        id: 1,
        title: "Project: NEON_NEXUS",
        type: "Main Quest",
        rarity: "Legendary",
        description: "A high-fidelity dashboard for managing decentralized assets. Features real-time data visualization and holographic UI components.",
        loot: ["React", "Three.js", "Web3.js"],
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
        status: "COMPLETE",
        link: "#"
    },
    {
        id: 2,
        title: "Operation: VOID_CHAT",
        type: "Side Quest",
        rarity: "Rare",
        description: "Encrypted real-time messaging platform with self-destructing messages and zero-knowledge proof authentication.",
        loot: ["Socket.io", "Node.js", "Redis"],
        image: "https://images.unsplash.com/photo-1516245834210-c4c14278733f?auto=format&fit=crop&q=80&w=1000",
        status: "ACTIVE",
        link: "#"
    },
    {
        id: 3,
        title: "Task: SYNTH_WAVE",
        type: "Daily Bounty",
        rarity: "Common",
        description: "Audio-reactive visualizer for streaming services. Converts audio frequencies into geometric patterns.",
        loot: ["WebAudio API", "Canvas", "JS"],
        image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=1000",
        status: "COMPLETE",
        link: "#"
    }
];

export const inventory = [
    { category: "Weapons (Languages)", items: ["JavaScript (ES6+)", "TypeScript", "Python", "Rust"] },
    { category: "Armor (Frameworks)", items: ["React.js", "Next.js", "Vue.js", "TailwindCSS"] },
    { category: "Tools (DevOps)", items: ["Docker", "AWS", "Git", "Vercel"] },
    { category: "Artifacts (Design)", items: ["Figma", "Blender", "Adobe CC"] }
];
