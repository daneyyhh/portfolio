export interface Product {
    id: string;
    name: string;
    subName: string;
    price: string;
    description: string;
    folderPath: string;
    themeColor: string;
    gradient: string;
    features: string[];
    stats: { label: string; val: string }[];
    section1: { title: string; subtitle: string };
    section2: { title: string; subtitle: string };
    section3: { title: string; subtitle: string };
    section4: { title: string; subtitle: string };
    detailsSection: { title: string; description: string; imageAlt: string };
    freshnessSection: { title: string; description: string };
    buyNowSection: {
        price: string;
        unit: string;
        processingParams: string[];
        deliveryPromise: string;
        returnPolicy: string;
    };
}

export const products: Product[] = [
    {
        id: "whitergb",
        name: "White RGB",
        subName: "Ultimate Precision.",
        price: "₹7,499",
        description: "Haptic Feedback - Adaptive Triggers - 100% Authentic Feel",
        folderPath: "/images/whitergb",
        themeColor: "#F5F5F5",
        gradient: "linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 100%)",
        features: ["Haptic Feedback", "Adaptive Triggers", "RGB Lighting"],
        stats: [{ label: "Latency", val: "0.1ms" }, { label: "Battery", val: "20h" }, { label: "Precision", val: "100%" }],
        section1: { title: "White RGB.", subtitle: "Ultimate Precision." },
        section2: { title: "Immersive control.", subtitle: "DualSense technology with customizable RGB for every game." },
        section3: { title: "Next-gen gaming boost.", subtitle: "Feel every explosion and trigger resistance." },
        section4: { title: "Engineered for pros.", subtitle: "" },
        detailsSection: {
            title: "Pro-Grade Engineering",
            description: "Built with authentic Sony-grade haptics and adaptive triggers. Hand-assembled with premium Japanese components for zero-compromise performance. It's not just a controller; it's an extension of your will.",
            imageAlt: "White RGB Details"
        },
        freshnessSection: {
            title: "Precision Calibrated",
            description: "Every unit undergoes 48-hour stress testing. Wireless tech tuned for sub-1ms latency. Custom firmware ensures compatibility with PS5, PC, and mobile."
        },
        buyNowSection: {
            price: "₹7,499",
            unit: "per controller",
            processingParams: ["Haptic Tech", "RGB Custom", "Pro Calibrated"],
            deliveryPromise: "Next-day delivery in metros. Anti-shock packaging.",
            returnPolicy: "30-Day Precision Guarantee. Test it, love it or return."
        }
    },
    {
        id: "blackpro",
        name: "Black Pro",
        subName: "Stealth Edition.",
        price: "₹8,999",
        description: "Matte Black - Hall Effect Sticks - Tournament Ready",
        folderPath: "/images/blackpro",
        themeColor: "#212121",
        gradient: "linear-gradient(135deg, #212121 0%, #424242 100%)",
        features: ["Hall Effect", "Matte Finish", "Pro Grips"],
        stats: [{ label: "Drift", val: "0%" }, { label: "Durability", val: "5yr+" }, { label: "Grip", val: "Pro" }],
        section1: { title: "Black Pro.", subtitle: "Stealth Edition." },
        section2: { title: "Unrivaled durability.", subtitle: "Hall effect sticks eliminate drift forever." },
        section3: { title: "Tournament dominance.", subtitle: "Designed for endless sessions without fatigue." },
        section4: { title: "Pro without limits.", subtitle: "" },
        detailsSection: {
            title: "Tournament Certified",
            description: "Hall effect sensors replace traditional pots—no drift, lifetime accuracy. Ergonomic grips molded from pro feedback. Matte black finish resists fingerprints and wear.",
            imageAlt: "Black Pro Details"
        },
        freshnessSection: {
            title: "Battle-Tested",
            description: "Survived 1M+ button presses in lab. Custom back paddles programmable via app. Zero-compromise build for esports warriors."
        },
        buyNowSection: {
            price: "₹8,999",
            unit: "per controller",
            processingParams: ["Hall Effect", "Drift Proof", "Esports Ready"],
            deliveryPromise: "Express shipping. Arrives tournament-ready.",
            returnPolicy: "Win your first match or full refund."
        }
    },
    // Add third product similarly for completeness
    {
        id: "pulseelite",
        name: "Pulse Elite",
        subName: "Sonic Superiority.",
        price: "₹12,999",
        description: "Planar Magnetic Drivers - AI Noise Rejection - Lightning Fast",
        folderPath: "/images/pulseelite",
        themeColor: "#1a1a2e",
        gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        features: ["Planar Magnetic", "AI Noise Cancel", "Lossless Audio"],
        stats: [{ label: "Fidelity", val: "Lossless" }, { label: "Battery", val: "30h" }, { label: "Drivers", val: "Planar" }],
        section1: { title: "Pulse Elite.", subtitle: "Sonic Superiority." },
        section2: { title: "Hear everything.", subtitle: "Planar magnetic drivers reproduce soundscapes with perfect accuracy." },
        section3: { title: "Command clearly.", subtitle: "AI-enhanced noise rejection ensures your voice is crystal clear." },
        section4: { title: "Audio evolved.", subtitle: "" },
        detailsSection: {
            title: "Audiophile Grade",
            description: "Inspired by studio monitors, the planar magnetic drivers deliver rich bass and ultra-accurate highs. The retractable boom mic uses AI to filter out background noise, making it perfect for competitive play.",
            imageAlt: "Pulse Elite Details"
        },
        freshnessSection: {
            title: "PlayStation Link",
            description: "Ultra-low latency connection with PlayStation Link technology. Seamlessly switch between PS5, PC, and mobile. Charging hanger included."
        },
        buyNowSection: {
            price: "₹12,999",
            unit: "per headset",
            processingParams: ["Planar Drivers", "AI Mic", "Link Tech"],
            deliveryPromise: "Free express shipping. Secure packaging.",
            returnPolicy: "14-Day Audio Satisfaction Guarantee."
        }
    }
];
