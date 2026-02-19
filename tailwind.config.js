/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                void: "#0a0a0a",
                ember: "#ff4d00", // Last Oasis orange
                "cyber-pink": "#ff003c", // Glitch Pop Pink
                "paper-white": "#f5f5f7",
                ash: "#e5e5e5",
                "charcoal": "#1a1a1a",
                "dust": "#888888",
            },
            fontFamily: {
                brush: ['"Permanent Marker"', 'cursive'],
                tech: ['Rajdhani', 'sans-serif'],
                poster: ['Antonio', 'sans-serif'], // New Condensed Hero Font
                sans: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'noise': "url('/noise.png')", // We'll simulate this with CSS if image missing
                'grunge': "linear-gradient(to bottom, transparent, #0a0a0a), url('https://images.unsplash.com/photo-1542256844-3b957662c199?q=80&w=2000&auto=format&fit=crop')", // Placeholder rough texture
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
