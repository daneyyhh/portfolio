/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                dark: {
                    950: "#050507",
                    900: "#09090b",
                    850: "#0f0f13",
                    800: "#141419",
                    700: "#1e1e24",
                    border: "rgba(255, 255, 255, 0.08)",
                    borderHover: "rgba(204, 255, 0, 0.3)",
                },
                lime: {
                    accent: "#ccff00", // Signature Acid/Neon Lime
                    bright: "#b8ff00",
                    glow: "rgba(204, 255, 0, 0.15)",
                },
                purple: {
                    glow: "rgba(168, 85, 247, 0.2)",
                    accent: "#a855f7",
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                syne: ['Syne', 'sans-serif'],
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
                'dots-pattern': "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
            },
            animation: {
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "float": "float 6s ease-in-out infinite",
                "glow": "glow 2s ease-in-out infinite alternate",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                glow: {
                    "0%": { boxShadow: "0 0 10px rgba(204, 255, 0, 0.2)" },
                    "100%": { boxShadow: "0 0 25px rgba(204, 255, 0, 0.6)" },
                }
            }
        },
    },
    plugins: [],
}
