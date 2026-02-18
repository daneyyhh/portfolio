/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#050505",
                "neon-cyan": "rgba(6, 182, 212, 1)", // cyan-500
                "neon-gold": "rgba(234, 179, 8, 1)", // yellow-500
            },
            fontFamily: {
                sans: ['Orbitron', 'Inter', 'sans-serif'],
                mono: ['"Share Tech Mono"', 'monospace'],
            },
            animation: {
                "spin-slow": "spin 3s linear infinite",
                "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "glitch": "glitch 1s linear infinite",
                "scanline": "scanline 8s linear infinite",
            },
            keyframes: {
                glitch: {
                    "0%, 100%": { transform: "translate(0)" },
                    "20%": { transform: "translate(-2px, 2px)" },
                    "40%": { transform: "translate(-2px, -2px)" },
                    "60%": { transform: "translate(2px, 2px)" },
                    "80%": { transform: "translate(2px, -2px)" },
                },
                scanline: {
                    "0%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(100%)" },
                }
            }
        },
    },
    plugins: [],
}
