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
                brandRed: {
                    DEFAULT: "#FF1E27",
                    accent: "#FF1E27",
                    hover: "#E00208",
                    light: "#FF4D58",
                    glow: "rgba(255, 30, 39, 0.2)",
                },
                red: {
                    accent: "#FF1E27",
                    hover: "#E00208",
                    light: "#FF4D58",
                    glow: "rgba(255, 30, 39, 0.2)",
                },
                purple: {
                    accent: "#FF1E27",
                    light: "#FF4D58",
                    glow: "rgba(255, 30, 39, 0.2)",
                },
            },
            fontFamily: {
                syne: ['Syne', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
        },
    },
    plugins: [],
}
