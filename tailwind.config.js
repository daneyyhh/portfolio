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
                ivory: {
                    DEFAULT: "#F1F0EB",
                    soft: "#E4E2DC",
                    card: "#FAF9F5",
                },
                nearblack: "#111111",
                charcoal: "#555555",
                borderstone: "#C9C7C0",
                darkbg: "#0A0A0A",
                purple: {
                    accent: "#8B6DFF",
                    light: "#A78BFA",
                    glow: "rgba(139, 109, 255, 0.2)",
                },
            },
            fontFamily: {
                syne: ['Syne', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            backgroundImage: {
                'grid-editorial': "linear-gradient(to right, rgba(17, 17, 17, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(17, 17, 17, 0.05) 1px, transparent 1px)",
                'grid-dark': "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
            },
        },
    },
    plugins: [],
}
