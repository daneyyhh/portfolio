/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                void: "#050505", // Deep Black
                "acid-lime": "#ccff00", // Gamefy Primary
                "neon-blue": "#00f0ff", // Cyber Secondary
                carbon: "#111111",
                steel: "#222222",
                ash: "#e5e5e5",
            },
            fontFamily: {
                speed: ['Teko', 'sans-serif'], // Primary Headlines
                tech: ['Rajdhani', 'sans-serif'], // UI Text
                sans: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'speed-lines': "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 77, 0, 0.05) 10px, rgba(255, 77, 0, 0.05) 20px)",
                'grid-pattern': "linear-gradient(to right, #222 1px, transparent 1px), linear-gradient(to bottom, #222 1px, transparent 1px)",
            },
            animation: {
                "flicker": "flicker 3s linear infinite",
                "drift": "drift 20s linear infinite",
            },
            keyframes: {
                flicker: {
                    "0%, 100%": { opacity: 1 },
                    "50%": { opacity: 0.8 },
                },
                drift: {
                    "0%": { backgroundPosition: "0% 0%" },
                    "100%": { backgroundPosition: "100% 100%" },
                }
            }
        },
    },
    plugins: [],
}
